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

export interface ProjectGroup {
  label: string;
  items: ProjectListItem[];
}

/**
 * The work list, split into labelled groups, with a preview panel parked
 * outside the 620px column.
 *
 * The groups are sections inside one component rather than one <ProjectList>
 * each, because everything that makes the list navigable is global: the arrow
 * keys listen on the window, so two mounted lists would both answer an
 * ArrowDown and fight over focus, and there's one preview panel for the page.
 * Rows carry an index that runs across the groups, which is also the tab order.
 *
 * Hover and keyboard focus feed the same `active` index, so arrowing down the
 * list shows the same image a pointer would. The panel is absolutely positioned
 * against the wrapper and slides to the active row's `offsetTop`, which keeps
 * it aligned as the page scrolls without any scroll listener. The <ul>s are
 * deliberately not positioned, so a row's offsetTop is measured against that
 * same wrapper and stays comparable across groups. Every image is mounted and
 * cross-faded rather than swapped in on hover — a freshly appended <img> would
 * flash a frame of nothing while it decoded.
 *
 * The image gets three treatments by width. At 1180px and up it's the preview
 * panel out beside the measure, and globals.css hides the inline copy. Between
 * 640 and 1180 there's no room beside the column, so the inline copy shows as a
 * 64px square next to the text. Below 640 the row stacks and that same <img>
 * runs full width above the title at its natural aspect.
 */
export default function ProjectList({ groups }: { groups: ProjectGroup[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);

  const links = useCallback(
    () => Array.from(wrapRef.current?.querySelectorAll<HTMLAnchorElement>('li a') ?? []),
    []
  );

  const activate = useCallback(
    (index: number | null) => {
      setActive(index);
      if (index === null) return;
      const row = links()[index];
      if (row) setOffset(row.offsetTop);
    },
    [links]
  );

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

  // Where each group starts in the flat index the panel and arrow keys count in.
  const starts: number[] = [];
  groups.reduce((n, group) => (starts.push(n), n + group.items.length), 0);
  const all = groups.flatMap((group) => group.items);

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseLeave={() => {
        // Falling back to whatever still holds focus, so moving the mouse away
        // doesn't clear a selection the keyboard made.
        const focused = links().indexOf(document.activeElement as HTMLAnchorElement);
        activate(focused === -1 ? null : focused);
      }}
    >
      {groups.map((group, groupIndex) => (
        <section key={group.label} className="mt-12 first:mt-0">
          <h2 className="mb-6 text-base text-neutral-400">{group.label}</h2>

          <ul className="space-y-0 -my-4">
            {group.items.map((project, itemIndex) => {
              const index = starts[groupIndex] + itemIndex;
              return (
                <li key={project.slug} onMouseEnter={() => activate(index)}>
                  <Link
                    href={`/projects/${project.slug}`}
                    onFocus={() => activate(index)}
                    className={`flex justify-between items-start gap-8 -mx-4 p-4 rounded-3xl border text-neutral-900 no-underline outline-hidden transition-colors ${
                      active === index ? 'border-neutral-200 bg-white' : 'border-transparent'
                    }`}
                  >
                    {/* Below 640px the row stacks and the image runs the full
                        width above the title, at its natural aspect — the same
                        treatment the preview panel gives it at the other end of
                        the scale. A 64px square is a thumbnail you squint at on
                        a phone; there's width going spare there, so it may as
                        well be spent on the one thing that says what the piece
                        looks like. `w-full` on the wrapper only below `sm`, so
                        the row above it is untouched. */}
                    <div className="flex flex-col sm:flex-row items-start gap-3 min-w-0 w-full sm:w-auto">
                      {project.image && (
                        <img
                          src={project.image}
                          alt=""
                          className="project-thumb w-full h-auto sm:w-16 sm:h-16 object-cover shrink-0 rounded-xl sm:rounded-lg bg-taupe-100 p-2 sm:p-1.5"
                        />
                      )}
                      <div>
                        <p className="mb-1 text-neutral-900 font-medium">
                          {project.title}
                          {project.draft && <span className="tag-draft ml-2 align-middle">draft</span>}
                        </p>
                        <p className="text-md text-neutral-500">{project.description}</p>
                      </div>
                    </div>
                    {/* <span className="text-sm text-neutral-400 shrink-0 pt-0.5">{project.date}</span> */}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <div
        className="project-preview"
        aria-hidden="true"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {all.map(
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
