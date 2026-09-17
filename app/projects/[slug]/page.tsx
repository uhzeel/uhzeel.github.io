import { getCollection, getEntry, formatYearMonth, type ProjectFrontmatter } from '@/lib/content';
import BackLink from '../../components/BackLink';

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
      <div className="max-w-prose mx-auto px-6">
        <BackLink href="/projects" label="Work" />
      </div>

      <article>
        <header className="max-w-prose mx-auto px-6 mb-8">
          <h1 className="text-lg font-medium mb-2">{data.title}</h1>
          <p className="text-[#555] leading-relaxed mb-3">{data.description}</p>
          <p className="text-sm text-[#888]">{formatYearMonth(data)}</p>
          {data.tags && data.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-3">
              {data.tags.map((tag) => (
                <li key={tag} className="tag">{tag}</li>
              ))}
            </ul>
          )}
        </header>

        {data.aiAssisted && (
          <aside className="max-w-prose mx-auto px-6 mb-8">
            <p className="ai-note">
              AI-assisted draft from archive material — a rewrite is owed.
            </p>
          </aside>
        )}

        {contentHtml && (
          <div
            className="prose article-grid text-[#333] mb-10"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}

        {data.embed && !embedInline && (
          <div className="article-grid mb-10">
            <div className="bleed embed-frame">
              <iframe src={data.embed} title={data.title} allow="fullscreen" loading="lazy" />
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
