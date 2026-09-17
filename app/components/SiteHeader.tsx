'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'About' },
  { href: '/projects', label: 'Work' },
  { href: '/blog', label: 'Writing' },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="mb-12">
      <div className="mb-6">
        <img
          src="/assets/trapped.gif"
          alt=""
          aria-hidden="true"
          width={128}
          height={106}
          className="h-10 w-auto mb-2"
        />
        <Link href="/" className="font-medium text-[#111] no-underline hover:text-[#555] block">
          Jazeel Ameen
        </Link>
        <p className="text-md text-[#999]">
          Product & Design at{' '}
          <a
            href="https://sortment.com"
            target="_blank"
            rel="noopener"
            className="hover:text-[#555]"
          >
            Sortment
          </a>
        </p>
      </div>

      <nav className="flex gap-6 text-sm border-b border-[#f0f0f0]">
        {NAV.map((item) => {
          const active =
            item.href === '/' ? pathname === '/' : pathname?.startsWith(`${item.href}/`) || pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`no-underline pb-3 border-b-2 -mb-px transition-colors ${
                active
                  ? 'text-[#111] border-[#111]'
                  : 'text-[#999] border-transparent hover:text-[#555]'
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
