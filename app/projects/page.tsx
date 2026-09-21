import { getCollection, sortByDate, formatYearMonth, type ProjectFrontmatter } from '@/lib/content';
import SiteHeader from '../components/SiteHeader';
import ProjectList, { type ProjectGroup } from '../components/ProjectList';

export const metadata = { title: 'Work — uhweb' };

export default async function ProjectsPage() {
  const projects = sortByDate(await getCollection<ProjectFrontmatter>('projects'));

  // Flattened here rather than in the component: ProjectList is a client
  // component, and lib/content reads the filesystem.
  const toItem = (project: (typeof projects)[number]) => ({
    slug: project.slug,
    title: project.data.title,
    description: project.data.description,
    image: project.data.image,
    date: formatYearMonth(project.data),
    draft: project.data.draft,
  });

  // Work leads: the page is read by people deciding whether to hire, and what
  // was made inside a job is what they came for. The labels share a metaphor
  // rather than splitting into work/personal, which would quietly make the
  // second list sound like a hobby bin. Glyphs get lighter as the work gets
  // less formal. Each group stays newest-first within itself; an empty one is
  // dropped rather than showing a heading over nothing.
  //
  // A typo in a category would file something under the wrong heading while the
  // page still looked fine, so an unknown value stops the build by name rather
  // than falling into the default — the same trade the frame colours make in
  // lib/content.ts.
  const SECTIONS = [
    ['work', '❖ Gets bread'],
    ['personal', '✧ The bread'],
    ['experiment', '◇ Half-baked'],
  ] as const;

  for (const { slug, data } of projects) {
    if (data.category && !SECTIONS.some(([key]) => key === data.category)) {
      throw new Error(
        `${slug}: unknown category "${data.category}" — expected one of ${SECTIONS.map(([key]) => key).join(', ')}`
      );
    }
  }

  const groups: ProjectGroup[] = SECTIONS.map(([key, label]) => ({
    label,
    items: projects.filter((p) => (p.data.category ?? 'personal') === key).map(toItem),
  })).filter((group) => group.items.length > 0);

  return (
    <main className="max-w-measure mx-auto px-6 py-16">
      <SiteHeader />

      <ProjectList groups={groups} />
    </main>
  );
}
