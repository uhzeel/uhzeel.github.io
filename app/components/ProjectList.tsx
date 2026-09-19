'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface ProjectListItem {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  /** true only under `next dev` — drafts aren't in the built site at all */
  draft?: boolean;
}

/**
 * The work list, with a preview panel parked outside the 620px column.
 *
 * Hover and keyboard focus feed the same `active` index, so arrowing down the
 * list shows the same image a pointer would. The panel is absolutely positioned
 * against the <ul> and slides to the active row's `offsetTop`, which keeps it
 * aligned as the page scrolls without any scroll listener. Every image is
 * mounted and cross-faded rather than swapped in on hover — a freshly appended
 * <img> would flash a frame of nothing while it decoded.
 *
 * Below 1180px there's no room beside the measure, so globals.css hides the
 * panel and shows the inline thumbnail instead.
 */
export default function ProjectList({ items }: { items: ProjectListItem[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);

  const links = useCallback(
    () => Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? []),
    []
  );

  const activate = useCallback((index: number | null) => {
    setActive(index);
    if (index === null) return;
    const row = listRef.current?.children[index] as HTMLElement | undefined;
    if (row) setOffset(row.offsetTop);
  }, []);

  // Focus does the selecting — the focus handler is what sets `active`, so a
  // Tab into the list and an ArrowDown end up in exactly the same state.
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
        activate(null);
      }
    };
    // On window rather than the list: the point is to land on the page and
    // start arrowing without having to Tab into the list first. Enter needs no
    // handling — the focused row is an anchor.
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active, activate, move]);

  return (
    <div className="relative">
      <ul
        ref={listRef}
        className="relative space-y-0 -my-4"
        onMouseLeave={() => {
          // Falling back to whatever still holds focus, so moving the mouse away
          // doesn't clear a selection the keyboard made.
          const focused = links().indexOf(document.activeElement as HTMLAnchorElement);
          activate(focused === -1 ? null : focused);
        }}
      >
        {items.map((project, index) => (
          <li key={project.slug} onMouseEnter={() => activate(index)}>
            <Link
              href={`/projects/${project.slug}`}
              onFocus={() => activate(index)}
              className={`flex justify-between items-start gap-8 -mx-4 p-4 rounded-3xl border text-neutral-900 no-underline outline-hidden transition-colors ${
                active === index ? 'border-neutral-200 bg-white' : 'border-transparent'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                {project.image && (
                  <img
                    src={project.image}
                    alt=""
                    className="project-thumb w-16 h-16 object-cover shrink-0 rounded-lg"
                  />
                )}
                <div>
                  <p className="mb-1 text-neutral-900 font-medium">
                    {project.title}
                    {project.draft && <span className="tag-draft ml-2 align-middle">draft</span>}
                  </p>
                  <p className="text-sm text-neutral-500">{project.description}</p>
                </div>
              </div>
              <span className="text-sm text-neutral-400 shrink-0 pt-0.5">{project.date}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        className="project-preview"
        aria-hidden="true"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {items.map(
          (project, index) =>
            project.image && (
              <img
                key={project.slug}
                src={project.image}
                alt=""
                className={active === index ? 'is-active' : undefined}
              />
            )
        )}
      </div>
    </div>
  );
}
