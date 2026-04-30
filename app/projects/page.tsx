import Link from 'next/link';
import { getCollection, type ProjectFrontmatter } from '@/lib/content';

export const metadata = { title: 'Work — Jazeel' };

export default async function ProjectsPage() {
  const projects = (await getCollection<ProjectFrontmatter>('projects')).sort(
    (a, b) => (a.data.order ?? 99) - (b.data.order ?? 99)
  );

  return (
    <main className="max-w-prose mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-[#999] hover:text-[#111] no-underline block mb-12">
        ← Jazeel Ameen
      </Link>

      <p className="text-xs uppercase tracking-widest text-[#999] mb-8">Work</p>

      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="flex justify-between items-start gap-8 py-4 border-b border-[#f0f0f0] text-[#111] no-underline group"
            >
              <div>
                <p className="group-hover:text-[#555] transition-colors mb-1">{project.data.title}</p>
                <p className="text-sm text-[#888]">{project.data.description}</p>
              </div>
              <span className="text-xs text-[#bbb] shrink-0 pt-0.5">{project.data.year}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
