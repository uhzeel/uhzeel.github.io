'use client';

import { useEffect, useRef } from 'react';

// Tune the centre offset (pixels from viewport centre)
const OFFSET_X = 0;
const OFFSET_Y = 0;

// Visual tuning
const STROKE_GREY = 60;   // 0=black, 255=white
const STROKE_ALPHA = 50;  // 0=invisible, 255=opaque
const STROKE_WEIGHT = 2;
const TRAIL_ALPHA = 6;   // lower = longer trails
const RADIUS = 200;      // distance from centre to points (pixels)

export default function P5Background() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let instance: { remove: () => void } | null = null;

    import('p5').then((mod) => {
      const p5 = mod.default;

      instance = new p5((p: InstanceType<typeof import('p5')['default']>) => {
        p.setup = () => {
          const cnv = p.createCanvas(p.windowWidth, p.windowHeight);
          cnv.parent(containerRef.current!);
          cnv.style('display', 'block');
          p.noFill();
        };

        p.draw = () => {
          p.background(255, TRAIL_ALPHA);
          p.translate(p.width / 2 + OFFSET_X, p.height / 2 + OFFSET_Y);
          p.stroke(STROKE_GREY, STROKE_ALPHA);
          p.strokeWeight(STROKE_WEIGHT);

          const theta = -p.frameCount / 100;
          const r = RADIUS;

          p.point(r * p.cos(theta), r * p.sin(theta));
          p.point(-r * p.cos(theta), r * p.tan(theta));
          p.point(r * p.tan(theta), r * p.cos(theta));
          p.point(-r * p.tan(theta), -r * p.tan(theta));
          p.point(-r * p.tan(theta - p.PI / 2), r * p.tan(theta - p.PI / 2));
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      });
    });

    return () => {
      instance?.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
