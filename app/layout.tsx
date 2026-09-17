import type { Metadata } from 'next';
import { Rethink_Sans } from 'next/font/google';
import './globals.css';

const rethinkSans = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'uhweb',
  description: 'Creative technologist based in India.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={rethinkSans.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
