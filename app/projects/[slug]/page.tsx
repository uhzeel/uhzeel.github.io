import Link from 'next/link';
import { getSlugs, getEntry, type ProjectFrontmatter } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getSlugs('projects').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getEntry<ProjectFrontmatter>('projects', slug);
  return { title: `${entry.data.title} — Jazeel` };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data, contentHtml } = await getEntry<ProjectFrontmatter>('projects', slug);

  return (
    <main className="max-w-prose mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-[#999] hover:text-[#111] no-underline block mb-12">
        ← Jazeel Ameen
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-lg font-medium mb-2">{data.title}</h1>
          <div className="flex items-center gap-3 flex-wrap mb-3">
            <span className="text-sm text-[#888]">{data.year}</span>
            {data.tags?.map((tag) => (
              <span key={tag} className="text-xs text-[#aaa]">{tag}</span>
            ))}
          </div>
          <p className="text-[#555] leading-relaxed">{data.description}</p>
        </header>

        {contentHtml && (
          <div className="prose text-[#333] mb-10" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        )}

        {data.embed && (
          <div className="overflow-hidden border border-[#e8e8e8] bg-[#111]" style={{ aspectRatio: '16/9' }}>
            <iframe
              src={data.embed}
              title={data.title}
              className="w-full h-full border-0 block"
              allow="fullscreen"
              loading="lazy"
            />
          </div>
        )}
      </article>
    </main>
  );
}
