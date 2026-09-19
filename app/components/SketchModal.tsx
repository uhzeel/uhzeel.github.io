'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface Sketch {
  url: string;
  title: string;
  href: string;
  /** the canvas's natural width in px, when the frontmatter gave one */
  size: number | null;
}

/**
 * Click-to-run for the sketch grid.
 *
 * The iframe is mounted only while the modal is open, which is the whole point
 * of the thumbnails: a p5 editor embed boots the entire editor app, so a page
 * of live tiles would load several of them before anyone asked. Closing
 * unmounts the iframe and the sketch stops.
 *
 * Delegated from the document for the same reason as ImageZoom — the body is
 * injected with dangerouslySetInnerHTML, so there's no React tree to attach to.
 * Only the button needs handling here; being a real <button>, it answers Enter
 * and Space by itself.
 */
export default function SketchModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [sketch, setSketch] = useState<Sketch | null>(null);
  const [fit, setFit] = useState(1);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement | null)?.closest<HTMLElement>('.sketch-thumb');
      if (!button) return;
      const url = button.dataset.embed;
      if (!url) return;
      const size = Number(button.dataset.size);
      setSketch({
        url,
        title: button.dataset.title ?? '',
        href: button.dataset.href ?? '',
        size: Number.isFinite(size) && size > 0 ? size : null,
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // A fixed-size canvas can't reflow, so the whole iframe is scaled instead —
  // the same trade the tiles make, except the factor depends on the viewport
  // and so has to be measured rather than written in CSS.
  //
  // Deliberately not capped at 1: a 300px sketch shown at 300px would be a
  // stamp in the middle of a full-screen backdrop. These scale up to nearly
  // fill the window, which costs sharpness — the canvas is rastered at its own
  // size and magnified — but a sketch you can see beats a crisp thumbnail.
  useEffect(() => {
    const size = sketch?.size;
    if (!size) return;
    const measure = () => {
      const room = Math.min(window.innerWidth - 32, window.innerHeight - 112);
      setFit(room / size);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [sketch?.size]);

  // showModal() rather than an open attribute: it brings the top layer, the
  // focus trap and Escape-to-close with it.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (sketch && !dialog.open) dialog.showModal();
    if (!sketch && dialog.open) dialog.close();
  }, [sketch]);

  const close = useCallback(() => setSketch(null), []);

  return (
    <dialog
      ref={dialogRef}
      className="zoom"
      onClose={close}
      onClick={(event) => {
        // Anything outside the sketch itself dismisses.
        if (event.target === dialogRef.current) close();
      }}
    >
      {sketch && (
        <div className="zoom-inner">
          <button type="button" className="zoom-close" onClick={close} aria-label="Close sketch">
            ×
          </button>

          <div
            className="sketch-stage"
            style={
              sketch.size
                ? {
                    width: sketch.size * fit,
                    height: sketch.size * fit,
                    ['--size' as string]: sketch.size,
                    ['--fit' as string]: fit,
                  }
                : undefined
            }
          >
            <iframe src={sketch.url} title={sketch.title || 'p5 sketch'} allow="fullscreen" />
          </div>

          {sketch.title && (
            <p className="zoom-caption">
              {sketch.href ? (
                <a href={sketch.href} target="_blank" rel="noopener">
                  {sketch.title}
                </a>
              ) : (
                sketch.title
              )}
            </p>
          )}
        </div>
      )}
    </dialog>
  );
}
