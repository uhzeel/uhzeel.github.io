'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface Zoomed {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Click-to-zoom for every image in the article body.
 *
 * The body is injected with dangerouslySetInnerHTML, so there's no React tree to
 * hang handlers off — one delegated listener on the document covers every image,
 * including the thumbnails inside side-rail annotations, and keeps working if
 * the markup changes. The tab stop and button role are applied at runtime for
 * the same reason, and because an image that can't respond shouldn't advertise
 * itself as a control.
 */
export default function ImageZoom() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState<Zoomed | null>(null);

  const open = useCallback((img: HTMLImageElement) => {
    const caption = img.closest('figure')?.querySelector('figcaption');
    setZoomed({
      src: img.currentSrc || img.src,
      alt: img.alt,
      caption: caption?.textContent?.trim() ?? '',
    });
  }, []);

  useEffect(() => {
    document.querySelectorAll<HTMLImageElement>('.prose img').forEach((img) => {
      img.tabIndex = 0;
      img.setAttribute('role', 'button');
      img.setAttribute('aria-haspopup', 'dialog');
    });

    const imageFrom = (event: Event) => {
      const target = event.target;
      return target instanceof HTMLImageElement && target.closest('.prose') ? target : null;
    };

    const onClick = (event: MouseEvent) => {
      const img = imageFrom(event);
      if (img) open(img);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const img = imageFrom(event);
      if (!img) return;
      event.preventDefault();
      open(img);
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // showModal() rather than an open attribute: it brings the top layer, the
  // focus trap and Escape-to-close with it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (zoomed && !dialog.open) dialog.showModal();
    if (!zoomed && dialog.open) dialog.close();
  }, [zoomed]);

  const close = () => setZoomed(null);

  return (
    <dialog
      ref={dialogRef}
      className="zoom"
      onClose={close}
      onClick={(event) => {
        // Anything outside the image itself dismisses.
        if (event.target === dialogRef.current) close();
      }}
    >
      {zoomed && (
        <div className="zoom-inner">
          <button type="button" className="zoom-close" onClick={close} aria-label="Close image">
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoomed.src} alt={zoomed.alt} onClick={close} />
          {zoomed.caption && <p className="zoom-caption">{zoomed.caption}</p>}
        </div>
      )}
    </dialog>
  );
}
