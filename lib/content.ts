import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import colors from 'tailwindcss/colors';

const contentDir = path.join(process.cwd(), 'content');
const publicDir = path.join(process.cwd(), 'public');

export type Collection = 'projects' | 'writing';

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
  /** set true to hide from the list and exclude from the build entirely */
  draft?: boolean;
}

/**
 * Writing dates the same way projects do — `year` plus an optional `month` —
 * rather than a full `date`, so the two collections sort and display through
 * the same `sortByDate`/`formatYearMonth`. A day-level date has nowhere to show
 * up in a list that reads "Sep 2026".
 */
export interface WritingFrontmatter {
  title: string;
  year: number;
  /** 1-12, optional — refines sort order and date display within the same year */
  month?: number;
  /** one-liner under the title in the list; optional, unlike a project's */
  description?: string;
  tags?: string[];
  /** nothing reads this yet — reserved for pulling a post out on the home page */
  featured?: boolean;
  /** set true to hide from the list and exclude from the build entirely */
  draft?: boolean;
}

export type Frontmatter = ProjectFrontmatter | WritingFrontmatter;

export interface Entry<T = Frontmatter> {
  slug: string;
  data: T;
  contentHtml: string;
  /** true if the markdown placed the embed inline via {{embed}} — page shouldn't also render it at the end */
  embedInline: boolean;
}

/** Marker authors can drop into a project's markdown body to position the iframe embed inline, e.g. between two paragraphs. */
const EMBED_MARKER = '{{embed}}';
/** Splits the body on the marker, keeping it as its own piece. */
const MARKER_SPLIT_RE = /(\{\{embed\}\})/;

/** ==highlighted text=={{note body}} — the note is anchored to that phrase and rendered in the side rail. */
const ANNOTATION_RE = /==([^=\n]+)==\{\{([\s\S]+?)\}\}/g;
/** A bare ==highlight== with no note attached. */
const HIGHLIGHT_RE = /==([^=\n]+)==/g;
/** An image anywhere in a note body makes it a rail thumbnail, whatever its length. */
const NOTE_IMAGE_RE = /!\[[^\]]*\]\([^)]*\)/;

/**
 * Past this many characters of visible text, a note is taller than the paragraph
 * it hangs off and collides with whatever follows — notes are out of flow, so
 * they don't stack. The rail is 10rem at 14px type, roughly 22 characters a line,
 * so this is about 13 lines. Over it, the note folds into the column at every
 * width instead (`.annotation.inline` in globals.css).
 */
const INLINE_NOTE_CHARS = 280;

/** What the reader actually sees, so a long href doesn't count toward rail height. */
function noteTextLength(note: string): number {
  return note
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim().length;
}

function applyAnnotations(markdown: string): string {
  // Odd indices are fenced code blocks, which must pass through untouched.
  return markdown
    .split(/(```[\s\S]*?```)/g)
    .map((chunk, i) =>
      i % 2 === 1
        ? chunk
        : chunk
            .replace(ANNOTATION_RE, (_, text, note) => {
              const body = (note as string).trim();
              const inline =
                !NOTE_IMAGE_RE.test(body) && noteTextLength(body) > INLINE_NOTE_CHARS;
              return `<mark>${text}</mark><span class="annotation${
                inline ? ' inline' : ''
              }">${body}</span>`;
            })
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
 * A trailing `narrow` (`:::frame stone-100 narrow`) keeps the band at the width
 * of the text column instead, for an image that shouldn't bleed at all.
 */
const FRAME_RE = /^:::frame[ \t]+([^\n]+?)[ \t]*\r?\n([\s\S]*?)\r?\n:::[ \t]*$/gm;

interface Segment {
  /** the Tailwind colour token, when this run of markdown came from a :::frame block */
  frame?: string;
  /** `narrow` on the opening line — band at the text measure rather than full bleed */
  narrow?: boolean;
  markdown: string;
}

function splitFrames(markdown: string): Segment[] {
  const segments: Segment[] = [];
  let cursor = 0;
  for (const match of markdown.matchAll(FRAME_RE)) {
    segments.push({ markdown: markdown.slice(cursor, match.index) });
    const [colour, ...modifiers] = match[1].split(/[ \t]+/);
    const unknown = modifiers.find((m) => m !== 'narrow');
    if (unknown) {
      throw new Error(
        `Unknown :::frame modifier "${unknown}" \u2014 the only one is "narrow".`
      );
    }
    segments.push({
      frame: colour,
      narrow: modifiers.includes('narrow'),
      markdown: match[2],
    });
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

/** Whose p5 editor account the bare ids in {{sketch}} belong to. */
const P5_USER = 'uhzeel';

/**
 * `{{sketch abvLra5Ou 400 shame on you scrolling diamond}}` — one tile in a
 * sketch grid: the editor id, the canvas's natural width in px, then the
 * caption, which runs to the closing braces and needs no quoting.
 */
const SKETCH_RE = /\{\{sketch\s+([A-Za-z0-9_-]+)(?:\s+(\d+))?\s*([^}]*?)\s*\}\}/g;

/**
 * What a thumbnail may be saved as, in the order they're tried. A screenshot is
 * usually a PNG and a photograph a JPEG, and which one a sketch got shouldn't
 * have to be written down anywhere — the name is derived from the caption, so
 * the extension is found rather than declared.
 */
const THUMB_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'];

/** A thumbnail is filed under the project, named after the sketch. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * One tile: a button carrying everything the modal needs.
 *
 * Deliberately not a live iframe. Every p5 editor embed boots the whole editor
 * app, so a grid of them would load several before the reader has asked for
 * any; app/components/SketchModal.tsx mounts the iframe only on click. `size`
 * travels with it because a p5 canvas is created at fixed pixel dimensions and
 * the editor never scales it, so the modal has to scale the iframe itself.
 */
function renderSketch(id: string, size: string | undefined, title: string, projectSlug: string): string {
  const embed = `https://editor.p5js.org/${P5_USER}/embed/${id}`;
  const href = `https://editor.p5js.org/${P5_USER}/sketches/${id}`;
  // A thumbnail that isn't on disk yet falls back to a card rather than a
  // broken image, so a sketch can be written up before it's been captured.
  const base = title ? `/assets/${projectSlug}/${slugify(title)}` : '';
  const thumb = base
    ? THUMB_EXTENSIONS.map((ext) => base + ext).find((rel) =>
        fs.existsSync(path.join(publicDir, rel))
      )
    : undefined;
  // The still is decorative — the caption underneath names the sketch, and the
  // button carries the accessible name.
  const face = thumb
    ? `<img src="${escapeHtmlAttr(thumb)}" alt="" loading="lazy">`
    : '<span class="sketch-run">run sketch</span>';
  const caption = title
    ? `<figcaption><a href="${escapeHtmlAttr(href)}" target="_blank" rel="noopener">${title}</a></figcaption>`
    : '';
  return (
    `<figure class="sketch">` +
    `<button type="button" class="sketch-thumb" aria-haspopup="dialog" data-embed="${escapeHtmlAttr(embed)}"` +
    `${size ? ` data-size="${size}"` : ''} data-title="${escapeHtmlAttr(title)}" data-href="${escapeHtmlAttr(href)}">` +
    `${face}<span class="sr-only">Run ${escapeHtmlAttr(title || 'sketch')}</span></button>` +
    `${caption}</figure>`
  );
}

/**
 * Turns a paragraph of nothing but {{sketch}} markers into a grid — the same
 * rule images follow, where consecutive lines share a row and a blank line
 * starts a new one. Written against the rendered HTML rather than the markdown
 * for that reason: marked has already decided what a paragraph is.
 */
function renderSketches(html: string, projectSlug: string): string {
  return html.replace(/<p>([\s\S]*?)<\/p>/g, (whole, inner: string) => {
    const markers = inner.match(SKETCH_RE);
    if (!markers) return whole;
    const leftover = inner.replace(SKETCH_RE, '').replace(/<br\s*\/?>/g, '').trim();
    // A marker mid-sentence stays where it is; this is for a paragraph of them.
    if (leftover) return whole;

    const tiles = markers
      .map((marker) => {
        const [, id, size, title] = new RegExp(SKETCH_RE.source).exec(marker) as RegExpExecArray;
        return renderSketch(id, size, title, projectSlug);
      })
      .join('');
    return `<div class="sketch-grid">${tiles}</div>`;
  });
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
    const pieces = await Promise.all(
      markdown.split(MARKER_SPLIT_RE).map((piece) => {
        // A marker with nothing behind it drops out rather than printing itself.
        if (piece === EMBED_MARKER) return embedHtml;
        return marked(piece);
      })
    );
    return renderSketches(renderFigures(pieces.join('')), slug);
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
          // A narrow band has no gutter to set text in, so notes fall under the
          // image the way the rail does on a small screen. Pins still pair up.
          inner = segment.narrow
            ? `${pinned.media}<div class="frame-notes">${pinned.aside}</div>`
            : `${pinned.media}<aside class="frame-aside">${pinned.aside}</aside>`;
        }
        // A full-bleed frame carries a nested article-grid, which keeps the
        // mockup on the same tracks as the rest of the page while the band runs
        // edge to edge. A narrow one is a plain block on the content track —
        // without the grid there's no wide track for an image to escape into.
        const shell = segment.narrow ? 'frame frame-narrow' : 'frame full article-grid';
        return `<section class="${shell}" style="--frame-bg:${frameBackground(segment.frame)}">${inner}</section>`;
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

/**
 * Drafts are readable under `next dev` and dropped from the production export.
 * Hiding them everywhere meant a draft couldn't be looked at at all — its page
 * 404s locally too — and a collection whose entries were all drafts failed the
 * build outright, since `output: export` needs a dynamic route to generate at
 * least one page. In dev the list marks them; in the built site they don't
 * exist. Read via a variable so the bundler can't fold this to a constant and
 * tree-shake the branch away.
 */
const SHOW_DRAFTS = process.env['NODE_ENV'] === 'development';

export async function getCollection<T extends { draft?: boolean } = Frontmatter>(
  collection: Collection
): Promise<Entry<T>[]> {
  const slugs = getSlugs(collection);
  const entries = await Promise.all(slugs.map((slug) => getEntry<T>(collection, slug)));
  return entries.filter((entry) => SHOW_DRAFTS || !entry.data.draft);
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
