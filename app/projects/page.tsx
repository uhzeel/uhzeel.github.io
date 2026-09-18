import { getCollection, sortByDate, formatYearMonth, type ProjectFrontmatter } from '@/lib/content';
import SiteHeader from '../components/SiteHeader';
import ProjectList from '../components/ProjectList';

export const metadata = { title: 'Work — uhweb' };

export default async function ProjectsPage() {
  const projects = sortByDate(await getCollection<ProjectFrontmatter>('projects'));

  // Flattened here rather than in the component: ProjectList is a client
  // component, and lib/content reads the filesystem.
  const items = projects.map((project) => ({
    slug: project.slug,
    title: project.data.title,
    description: project.data.description,
    image: project.data.image,
    date: formatYearMonth(project.data),
  }));

  return (
    <main className="max-w-prose mx-auto px-6 py-16">
      <SiteHeader />

      <ProjectList items={items} />
    </main>
  );
}
