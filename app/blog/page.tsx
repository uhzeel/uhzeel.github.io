import Link from 'next/link';
import { getCollection, type BlogFrontmatter } from '@/lib/content';
import SiteHeader from '../components/SiteHeader';

export const metadata = { title: 'Writing — uhweb' };

export default async function BlogPage() {
  const posts = (await getCollection<BlogFrontmatter>('blog')).sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  );

  return (
    <main className="max-w-prose mx-auto px-6 py-16">
      <SiteHeader />

      {posts.length === 0 ? (
        <p className="text-neutral-500">Nothing here yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex justify-between items-start gap-8 py-4 border-b border-neutral-100 text-neutral-900 no-underline group"
              >
                <div>
                  <p className="group-hover:text-neutral-600 transition-colors mb-1">{post.data.title}</p>
                  {post.data.description && (
                    <p className="text-sm text-neutral-500">{post.data.description}</p>
                  )}
                </div>
                <span className="text-xs text-neutral-400 shrink-0 pt-0.5">
                  {new Date(post.data.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' })}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
