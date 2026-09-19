import { notFound } from 'next/navigation';
import { getCollection, getEntry, formatYearMonth, type WritingFrontmatter } from '@/lib/content';
import BackLink from '../../components/BackLink';
import ImageZoom from '../../components/ImageZoom';
import InstagramEmbed from '../../components/InstagramEmbed';
import SketchModal from '../../components/SketchModal';

export const dynamicParams = false;

/**
 * `output: export` refuses to build a dynamic route that generates no pages, so
 * a collection that's entirely drafts would fail the build rather than just
 * publish nothing. This stands one placeholder in when that happens; the page
 * itself 404s on it, so the only trace is an unreachable file in out/.
 */
const EMPTY_SLUG = '__none__';

export async function generateStaticParams() {
  const posts = await getCollection<WritingFrontmatter>('writing');
  if (posts.length === 0) return [{ slug: EMPTY_SLUG }];
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === EMPTY_SLUG) return {};
  const entry = await getEntry<WritingFrontmatter>('writing', slug);
  return { title: `${entry.data.title} — Jazeel` };
}

/**
 * Laid out like a project page for now — same measure, same header order, same
 * .article-grid, so every prose convention (bleed images, rail annotations,
 * frames) works in a post too. Kept as its own route rather than a shared one
 * so writing can drift away from it without touching the work pages.
 */
export default async function WritingPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === EMPTY_SLUG) notFound();
  const { data, contentHtml } = await getEntry<WritingFrontmatter>('writing', slug);

  return (
    <main className="py-16">
      <div className="max-w-measure mx-auto px-6">
        <BackLink href="/writing" label="Writing" />
      </div>

      <article>
        <header className="max-w-measure mx-auto px-6 mb-8">
          <h1 className="text-lg font-medium mb-2">{data.title}</h1>
          {data.description && (
            <p className="text-neutral-600 leading-relaxed mb-3">{data.description}</p>
          )}
          <p className="text-sm text-neutral-500">{formatYearMonth(data)}</p>
          {data.tags && data.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-3">
              {data.tags.map((tag) => (
                <li key={tag} className="tag">{tag}</li>
              ))}
            </ul>
          )}
        </header>

        {contentHtml && (
          <div
            className="prose article-grid text-neutral-700 mb-10"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}

        {contentHtml && <ImageZoom />}
        {contentHtml?.includes('sketch-thumb') && <SketchModal />}
        {contentHtml?.includes('instagram-media') && <InstagramEmbed />}
      </article>
    </main>
  );
}
