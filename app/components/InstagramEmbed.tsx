'use client';

import Script from 'next/script';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

/**
 * Loads Instagram's embed.js, which upgrades any `.instagram-media` blockquote
 * on the page into the real post. The script tag can't live in the markdown:
 * the body is injected with dangerouslySetInnerHTML, and scripts inserted that
 * way never execute.
 *
 * onReady rather than onLoad because embed.js only scans the document once, on
 * load — arriving at a second project page through client-side navigation needs
 * the explicit re-scan.
 */
export default function InstagramEmbed() {
  return (
    <Script
      src="https://www.instagram.com/embed.js"
      strategy="afterInteractive"
      onReady={() => window.instgrm?.Embeds.process()}
    />
  );
}
