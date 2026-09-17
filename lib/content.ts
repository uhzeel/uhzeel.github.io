import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

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

  let contentHtml: string;
  let embedInline = false;
  if (embed && body.includes(EMBED_MARKER)) {
    const parts = body.split(EMBED_MARKER);
    const htmlParts = await Promise.all(parts.map((part) => marked(part)));
    contentHtml = htmlParts.join(renderEmbedHtml(embed, (frontmatter as { title: string }).title));
    embedInline = true;
  } else {
    contentHtml = await marked(body);
  }
  contentHtml = renderFigures(contentHtml);

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
