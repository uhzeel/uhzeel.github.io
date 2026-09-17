import Link from 'next/link';
import { getCollection, sortByDate, formatYearMonth, type Entry, type ProjectFrontmatter } from '@/lib/content';
import SiteHeader from '../components/SiteHeader';

export const metadata = { title: 'Work — uhweb' };

function ProjectList({ items }: { items: Entry<ProjectFrontmatter>[] }) {
  return (
    <ul>
      {items.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="flex justify-between items-start gap-8 py-4 border-b border-[#f0f0f0] text-[#111] no-underline group"
          >
            <div className="flex items-start gap-4 min-w-0">
              {project.data.image && (
                <img
                  src={project.data.image}
                  alt=""
                  className="w-12 h-12 object-cover shrink-0 rounded-sm border border-[#f0f0f0]"
                />
              )}
              <div>
                <p className="group-hover:text-[#555] transition-colors mb-1">{project.data.title}</p>
                <p className="text-sm text-[#888]">{project.data.description}</p>
              </div>
            </div>
            <span className="text-xs text-[#bbb] shrink-0 pt-0.5">{formatYearMonth(project.data)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectsPage() {
  const projects = sortByDate(await getCollection<ProjectFrontmatter>('projects'));

  return (
    <main className="max-w-prose mx-auto px-6 py-16">
      <SiteHeader />

      <ProjectList items={projects} />
    </main>
  );
}
