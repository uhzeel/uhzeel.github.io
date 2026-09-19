import { getCollection, sortByDate, formatYearMonth, type WritingFrontmatter } from '@/lib/content';
import SiteHeader from '../components/SiteHeader';
import WritingList from '../components/WritingList';

export const metadata = { title: 'Writing — uhweb' };

export default async function WritingPage() {
  const posts = sortByDate(await getCollection<WritingFrontmatter>('writing'));

  // Flattened here rather than in the component: WritingList is a client
  // component, and lib/content reads the filesystem.
  const items = posts.map((post) => ({
    slug: post.slug,
    title: post.data.title,
    description: post.data.description,
    date: formatYearMonth(post.data),
    draft: post.data.draft,
  }));

  return (
    <main className="max-w-measure mx-auto px-6 py-16">
      <SiteHeader />

      <WritingList items={items} />
    </main>
  );
}
