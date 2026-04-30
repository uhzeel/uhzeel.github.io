import Link from 'next/link';
import { getCollection, type BlogFrontmatter } from '@/lib/content';

export const metadata = { title: 'Writing — Jazeel' };

export default async function BlogPage() {
  const posts = (await getCollection<BlogFrontmatter>('blog')).sort(
    (a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf()
  );

  return (
    <main className="max-w-prose mx-auto px-6 py-16">
      <Link href="/" className="text-sm text-[#999] hover:text-[#111] no-underline block mb-12">
        ← Jazeel Ameen
      </Link>

      <p className="text-xs uppercase tracking-widest text-[#999] mb-8">Writing</p>

      {posts.length === 0 ? (
        <p className="text-[#888]">Nothing here yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="flex justify-between items-start gap-8 py-4 border-b border-[#f0f0f0] text-[#111] no-underline group"
              >
                <div>
                  <p className="group-hover:text-[#555] transition-colors mb-1">{post.data.title}</p>
                  {post.data.description && (
                    <p className="text-sm text-[#888]">{post.data.description}</p>
                  )}
                </div>
                <span className="text-xs text-[#bbb] shrink-0 pt-0.5">
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
