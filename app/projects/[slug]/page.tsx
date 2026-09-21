import { getCollection, getEntry, formatYearMonth, type ProjectFrontmatter } from '@/lib/content';
import BackLink from '../../components/BackLink';
import ImageZoom from '../../components/ImageZoom';
import InstagramEmbed from '../../components/InstagramEmbed';
import SketchModal from '../../components/SketchModal';

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getCollection<ProjectFrontmatter>('projects');
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntry<ProjectFrontmatter>('projects', slug);
  return { title: `${entry.data.title} — Jazeel` };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data, contentHtml, embedInline } = await getEntry<ProjectFrontmatter>('projects', slug);

  return (
    <main className="py-16">
      <div className="max-w-measure mx-auto px-6">
        <BackLink href="/projects" label="uhweb/work" />
      </div>

      <article>
        {/* Title and description only. The date and tags are metadata about the
            piece rather than part of it, and in the header they made the reader
            get past four things before the first sentence — they now sit in the
            footer, which is also where someone goes looking once they've read
            it. */}
        <header className="max-w-measure mx-auto px-6 mb-8 border-b border-neutral-200 pb-8">
          <h1 className="text-lg font-medium mb-2">{data.title}</h1>
          <p className="text-neutral-600 leading-relaxed">{data.description}</p>
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

        {data.embed && !embedInline && (
          <div className="article-grid mb-10">
            <div className="bleed embed-frame">
              <iframe src={data.embed} title={data.title} allow="fullscreen" loading="lazy" />
            </div>
          </div>
        )}

        {/* Tags are set as plain prose, not pills: a pill reads as something you
            can press, and these don't go anywhere — there's no tag index to
            land on. */}
        <footer className="max-w-measure mx-auto px-6 mt-14 border-t border-neutral-200 pt-6 text-base">
          <p className="text-neutral-500">{formatYearMonth(data)}</p>
          {data.tags && data.tags.length > 0 && (
            <div className="mt-5">
              <h2 className="text-neutral-400 mb-1">Filed under</h2>
              <p className="text-neutral-600">{data.tags.join(', ')}</p>
            </div>
          )}
        </footer>
      </article>
    </main>
  );
}
