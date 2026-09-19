'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface WritingListItem {
  slug: string;
  title: string;
  description?: string;
  date: string;
  /** true only under `next dev` — drafts aren't in the built site at all */
  draft?: boolean;
}

/**
 * The writing list. Deliberately a separate component from ProjectList rather
 * than a shared one: the two are styled alike for now, but writing is expected
 * to grow its own row (excerpt, reading time, series) and a shared component
 * would have to be unpicked first.
 *
 * Same row treatment as the work list — rounded border on the active row, hover
 * and keyboard focus feeding one `active` index — minus the image preview, since
 * posts carry no thumbnail.
 */
export default function WritingList({ items }: { items: WritingListItem[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const links = useCallback(
    () => Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
    []
  );

  // Focus does the selecting, so tabbing in and arrowing down land in the same state.
  const move = useCallback(
    (delta: number) => {
      const all = links();
      if (all.length === 0) return;
      const from = active ?? (delta > 0 ? -1 : 0);
      all[Math.min(all.length - 1, Math.max(0, from + delta))].focus();
    },
    [active, links]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? '')) return;

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        move(event.key === 'ArrowDown' ? 1 : -1);
      } else if (event.key === 'Escape' && active !== null) {
        (document.activeElement as HTMLElement | null)?.blur();
        setActive(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, move]);

  if (items.length === 0) return <p className="text-neutral-500">Nothing here yet.</p>;

  return (
    <ul
      ref={listRef}
      className="relative space-y-0 -my-4"
      onMouseLeave={() => {
        // Fall back to whatever still holds focus, so moving the mouse away
        // doesn't clear a selection the keyboard made.
        const focused = links().indexOf(document.activeElement as HTMLAnchorElement);
        setActive(focused === -1 ? null : focused);
      }}
    >
      {items.map((post, index) => (
        <li key={post.slug} onMouseEnter={() => setActive(index)}>
          <Link
            href={`/writing/${post.slug}`}
            onFocus={() => setActive(index)}
            className={`flex justify-between items-start gap-8 -mx-4 p-4 rounded-3xl border text-neutral-900 no-underline outline-hidden transition-colors ${
              active === index ? 'border-neutral-200 bg-white' : 'border-transparent'
            }`}
          >
            <div className="min-w-0">
              <p className="mb-1 text-neutral-900 font-medium">
                {post.title}
                {post.draft && <span className="tag-draft ml-2 align-middle">draft</span>}
              </p>
              {post.description && <p className="text-sm text-neutral-500">{post.description}</p>}
            </div>
            <span className="text-sm text-neutral-400 shrink-0 pt-0.5">{post.date}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
