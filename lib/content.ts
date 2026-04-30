import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const contentDir = path.join(process.cwd(), 'content');

export type Collection = 'projects' | 'blog';

export interface ProjectFrontmatter {
  title: string;
  year: number;
  description: string;
  tags?: string[];
  embed?: string;
  featured?: boolean;
  order?: number;
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

export type Frontmatter = ProjectFrontmatter | BlogFrontmatter;

export interface Entry<T = Frontmatter> {
  slug: string;
  data: T;
  contentHtml: string;
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
  const contentHtml = await marked(content);
  return {
    slug,
    data: data as T,
    contentHtml,
  };
}

export async function getCollection<T = Frontmatter>(
  collection: Collection
): Promise<Entry<T>[]> {
  const slugs = getSlugs(collection);
  return Promise.all(slugs.map((slug) => getEntry<T>(collection, slug)));
}
