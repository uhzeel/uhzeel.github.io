import Link from 'next/link';

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-sm text-neutral-400 hover:text-neutral-900 no-underline block mb-12">
      ← {label}
    </Link>
  );
}
