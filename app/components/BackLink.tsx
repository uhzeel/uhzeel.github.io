import Link from 'next/link';

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-base text-neutral-400 hover:text-neutral-900 no-underline block mb-6">
      ↑ {label}
    </Link>
  );
}
