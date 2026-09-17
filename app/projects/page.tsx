import Link from 'next/link';
import { getCollection, sortByDate, formatYearMonth, type Entry, type ProjectFrontmatter } from '@/lib/content';
import SiteHeader from '../components/SiteHeader';

export const metadata = { title: 'Work — uhweb' };

function ProjectList({ items }: { items: Entry<ProjectFrontmatter>[] }) {
  return (
    <ul className="space-y-2">
      {items.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/projects/${project.slug}`}
            className="flex justify-between items-start gap-8 -mx-3 px-3 py-4 rounded-md border border-transparent text-neutral-900 no-underline hover:border-neutral-200 hover:bg-white"
          >
            <div className="flex items-start gap-4 min-w-0">
              {project.data.image && (
                <img
                  src={project.data.image}
                  alt=""
                  className="w-16 h-16 object-cover shrink-0 rounded-sm"
                />
              )}
              <div>
                <p className="mb-1">{project.data.title}</p>
                <p className="text-sm text-neutral-500">{project.data.description}</p>
              </div>
            </div>
            <span className="text-xs text-neutral-400 shrink-0 pt-0.5">{formatYearMonth(project.data)}</span>
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
