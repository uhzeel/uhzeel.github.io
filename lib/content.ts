import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import colors from 'tailwindcss/colors';

const contentDir = path.join(process.cwd(), 'content');

export type Collection = 'projects' | 'blog';

export interface ProjectFrontmatter {
  title: string;
  year: number;
  /** 1-12, optional — refines sort order and date display within the same year */
  month?: number;
  description: string;
  tags?: string[];
  embed?: string;
  /** path under /public, e.g. "/assets/take-me-lightly/wli.png" — shown as a thumbnail in the list and on the project page */
  image?: string;
  featured?: boolean;
  /** set true to show the AI-assistance note above the body copy */
  aiAssisted?: boolean;
  /** set true to hide from the list and exclude from the build entirely */
  draft?: boolean;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  /** set true to hide from the list and exclude from the build entirely */
  draft?: boolean;
}

export type Frontmatter = ProjectFrontmatter | BlogFrontmatter;

export interface Entry<T = Frontmatter> {
  slug: string;
  data: T;
  contentHtml: string;
  /** true if the markdown placed the embed inline via {{embed}} — page shouldn't also render it at the end */
  embedInline: boolean;
}

/** Marker authors can drop into a project's markdown body to position the iframe embed inline, e.g. between two paragraphs. */
const EMBED_MARKER = '{{embed}}';

/** ==highlighted text=={{note body}} — the note is anchored to that phrase and rendered in the side rail. */
const ANNOTATION_RE = /==([^=\n]+)==\{\{([\s\S]+?)\}\}/g;
/** A bare ==highlight== with no note attached. */
const HIGHLIGHT_RE = /==([^=\n]+)==/g;

function applyAnnotations(markdown: string): string {
  // Odd indices are fenced code blocks, which must pass through untouched.
  return markdown
    .split(/(```[\s\S]*?```)/g)
    .map((chunk, i) =>
      i % 2 === 1
        ? chunk
        : chunk
            .replace(
              ANNOTATION_RE,
              (_, text, note) =>
                `<mark>${text}</mark><span class="annotation">${note.trim()}</span>`
            )
            .replace(HIGHLIGHT_RE, (_, text) => `<mark>${text}</mark>`)
    )
    .join('');
}

/**
 * Turns a paragraph of nothing but images into a figure row. The markdown title
 * — `![alt](src "caption")` — becomes the figcaption, and images on consecutive
 * lines share a row rather than stacking.
 */
function renderFigures(html: string): string {
  return html.replace(/<p>([\s\S]*?)<\/p>/g, (whole, inner: string) => {
    const imgs = inner.match(/<img\b[^>]*>/g);
    if (!imgs) return whole;
    const leftover = inner.replace(/<img\b[^>]*>/g, '').replace(/<br\s*\/?>/g, '').trim();
    if (leftover) return whole;

    const figures = imgs
      .map((img) => {
        const title = img.match(/\stitle="([^"]*)"/);
        const stripped = img.replace(/\stitle="[^"]*"/, '');
        const caption = title ? `<figcaption>${title[1]}</figcaption>` : '';
        return `<figure>${stripped}${caption}</figure>`;
      })
      .join('');
    // A lone image stays a plain figure so it shrinks to the image's own width,
    // keeping its caption the same width rather than the whole bleed track.
    return imgs.length === 1
      ? figures.replace('<figure>', '<figure class="bleed">')
      : `<div class="figure-row bleed">${figures}</div>`;
  });
}

/**
 * `:::frame stone-100` … `:::` — wraps mockups in a tinted, full-width band, so
 * UI that deliberately runs past the edge of a mock has somewhere to run to.
 */
const FRAME_RE = /^:::frame[ \t]+(\S+)[ \t]*\r?\n([\s\S]*?)\r?\n:::[ \t]*$/gm;

interface Segment {
  /** the Tailwind colour token, when this run of markdown came from a :::frame block */
  frame?: string;
  markdown: string;
}

function splitFrames(markdown: string): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;
  for (const match of markdown.matchAll(FRAME_RE)) {
    segments.push({ markdown: markdown.slice(cursor, match.index) });
    segments.push({ frame: match[1], markdown: match[2] });
    cursor = match.index + match[0].length;
  }
  segments.push({ markdown: markdown.slice(cursor) });
  return segments;
}

/**
 * Resolves a palette token like `stone-100` to its hex value at build time, so
 * frame colours stay inside the Tailwind palette without globals.css having to
 * enumerate every one of them. Tailwind never scans markdown, so a utility class
 * wouldn't survive the build.
 */
/** The two shapes renderFigures leaves behind for a run of images. */
const FRAME_MEDIA_RE =
  /<figure class="bleed">[\s\S]*?<\/figure>|<div class="figure-row bleed">[\s\S]*?<\/div>/g;

/**
 * Inside a frame, anything that isn't an image is supporting text, and it reads
 * better beside the mockup than under it — the band is full-bleed, so the gutter
 * next to the image is empty anyway. Pulling it into one <aside> keeps it to a
 * single grid item, which is what lets it sit in the same row as the image
 * rather than below it.
 */
function splitFrameAside(html: string): { media: string; aside: string } {
  const media: string[] = [];
  const rest = html.replace(FRAME_MEDIA_RE, (block) => {
    media.push(block);
    return '';
  });
  return { media: media.join(''), aside: rest.trim() };
}

/** `{{point 62 18}}` at the head of a rail note — 62% across the mockup, 18% down. */
const POINT_RE = /\{\{point\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\}\}\s*/g;

/**
 * Numbers each `{{point}}` in document order, drops a matching pin on the
 * mockup and leaves the number in front of the note. Percentages rather than
 * pixels, so a pin holds its spot as the image scales between the wide track
 * and a phone — and unlike a drawn arrow, the pairing survives the rail folding
 * underneath the image below 1200px.
 *
 * The pins wrap the image rather than the figure because a figure's height
 * includes its caption, which would throw every vertical percentage off.
 */
function applyFramePins(media: string, aside: string): { media: string; aside: string } {
  const points: Array<{ x: string; y: string }> = [];
  const numbered = aside.replace(POINT_RE, (_, x: string, y: string) => {
    points.push({ x, y });
    return `<span class="pin">${points.length}</span>`;
  });
  if (points.length === 0) return { media, aside };

  const pins = points
    .map(
      ({ x, y }, i) =>
        `<span class="pin pin-on-image" style="left:${x}%;top:${y}%">${i + 1}</span>`
    )
    .join('');
  // Only the first image in a frame takes pins — the mockup being annotated.
  return { media: media.replace(/<img\b[^>]*>/, (img) => `<span class="pin-target">${img}${pins}</span>`), aside: numbered };
}

function frameBackground(token: string): string {
  const palette = colors as unknown as Record<string, string | Record<string, string>>;
  const shade = token.match(/^([a-z]+)-(\d{2,3})$/);
  const entry = shade ? palette[shade[1]] : palette[token];
  const value = shade && typeof entry === 'object' ? entry[shade[2]] : entry;
  if (typeof value !== 'string') {
    throw new Error(
      `Unknown :::frame colour "${token}" \u2014 expected a Tailwind palette token such as "stone-100".`
    );
  }
  return value;
}

function escapeHtmlAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function renderEmbedHtml(embed: string, title: string): string {
  return `<div class="bleed embed-frame"><iframe src="${escapeHtmlAttr(embed)}" title="${escapeHtmlAttr(title)}" allow="fullscreen" loading="lazy"></iframe></div>`;
}

export function getSlugs(collection: Collection): string[] {
  const dir = path.join(contentDir, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export async function getEntry<T = Frontmatter>(
  collection: Collection,
  slug: string
): Promise<Entry<T>> {
  const filePath = path.join(contentDir, collection, `${slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const frontmatter = data as T;
  const embed = (frontmatter as { embed?: string }).embed;

  const body = applyAnnotations(content);
  const embedInline = Boolean(embed) && body.includes(EMBED_MARKER);
  const embedHtml = embedInline
    ? renderEmbedHtml(embed as string, (frontmatter as { title: string }).title)
    : '';

  /** One run of markdown, with the iframe substituted wherever the marker appears. */
  const renderRun = async (markdown: string): Promise<string> => {
    const parts = embedInline ? markdown.split(EMBED_MARKER) : [markdown];
    const html = await Promise.all(parts.map((part) => marked(part)));
    return renderFigures(html.join(embedHtml));
  };

  // Frames are split out of the markdown rather than matched in the rendered
  // HTML because their contents have to go through marked themselves — a frame
  // holding two images on consecutive lines should still become a figure row.
  const contentHtml = (
    await Promise.all(
      splitFrames(body).map(async (segment) => {
        const html = await renderRun(segment.markdown);
        if (!segment.frame) return html;
        const { media, aside } = splitFrameAside(html);
        // With no image to sit beside, prose has no rail to go in and stays put.
        let inner = html;
        if (media && aside) {
          const pinned = applyFramePins(media, aside);
          inner = `${pinned.media}<aside class="frame-aside">${pinned.aside}</aside>`;
        }
        // The nested article-grid keeps the mockup on the same tracks as the
        // rest of the page while the band itself runs edge to edge.
        return `<section class="frame full article-grid" style="--frame-bg:${frameBackground(segment.frame)}">${inner}</section>`;
      })
    )
  ).join('');

  return {
    slug,
    data: frontmatter,
    contentHtml,
    embedInline,
  };
}

export async function getCollection<T extends { draft?: boolean } = Frontmatter>(
  collection: Collection
): Promise<Entry<T>[]> {
  const slugs = getSlugs(collection);
  const entries = await Promise.all(slugs.map((slug) => getEntry<T>(collection, slug)));
  return entries.filter((entry) => !entry.data.draft);
}

/** Sorts newest-first by year (and month, when given); ties break alphabetically by title. */
export function sortByDate<T extends { title: string; year: number; month?: number }>(
  entries: Entry<T>[]
): Entry<T>[] {
  return [...entries].sort((a, b) => {
    const aKey = a.data.year * 12 + (a.data.month ?? 0);
    const bKey = b.data.year * 12 + (b.data.month ?? 0);
    return bKey - aKey || a.data.title.localeCompare(b.data.title);
  });
}

/** e.g. "2024", or "Mar 2024" when a month is set. */
export function formatYearMonth({ year, month }: { year: number; month?: number }): string {
  if (!month) return String(year);
  return new Date(year, month - 1).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' });
}
