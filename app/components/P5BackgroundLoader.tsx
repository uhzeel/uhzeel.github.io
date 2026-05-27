'use client';

import dynamic from 'next/dynamic';

const P5Background = dynamic(() => import('./P5Background'), { ssr: false });

export default function P5BackgroundLoader() {
  return <P5Background />;
}
