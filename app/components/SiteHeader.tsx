'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'About' },
  { href: '/projects', label: 'Work' },
  { href: '/writing', label: 'Writing' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="mb-12">
      {/* The gif's height is set in CSS, not by the height attribute — an
          attribute is only an aspect-ratio hint and loses to any CSS height. */}
      <div className="flex items-stretch gap-8 border-b border-neutral-200">
        <img
          src="/assets/trapped-slow4x.gif"
          alt=""
          aria-hidden="true"
          
          className="h-[84px] w-auto shrink-0 object-contain select-none"
        />

        <div className="py-6">
          <Link href="/" className="font-medium text-neutral-900 no-underline hover:text-neutral-600 block">
            Jazeel Ameen
          </Link>
          <p className="text-md text-neutral-600">
            Product & Design ·{' '}
            <a
              href="https://sortment.com"
              target="_blank"
              rel="noopener"
              className="underline decoration-neutral-300 hover:text-neutral-900 hover:decoration-neutral-900 transition-colors"
            >
              Sortment
            </a>
          </p>
        </div>
      </div>

      <nav className="flex text-md border-b border-neutral-200">
        {NAV.map((item) => {
          const active =
            item.href === '/' ? pathname === '/' : pathname?.startsWith(`${item.href}/`) || pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`no-underline px-4 py-3 border-b-2 -mb-px transition-colors ${
                active
                  ? 'text-neutral-900 font-medium bg-neutral-100'
                  : 'text-neutral-400 border-transparent hover:text-neutral-600'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
