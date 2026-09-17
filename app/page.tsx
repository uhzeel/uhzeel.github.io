import P5BackgroundLoader from './components/P5BackgroundLoader';
import SiteHeader from './components/SiteHeader';

export default function Home() {
  return (
    <>
      <P5BackgroundLoader />
      <main className="relative z-10 max-w-prose mx-auto px-6 py-16">

      <SiteHeader />

      <div className="text-[#444] leading-relaxed space-y-4 mb-10">
        <p>
          I enjoy crafting complex, scalable systems — from small toys to big machines,
          and the occasional tiny digital snack.
        </p>
        {/* `relative` is the annotation's containing block — see .annotation in globals.css. */}
        <p className="relative">
          Currently leading design at{' '}
          <mark><del>Flo Labs, where we built Shopflo and</del></mark>
          <span className="annotation">
            Shopflo was recently acquired by Pine Labs. I&apos;ve exited with the founders
            and a sharp team to focus on Sortment&apos;s success.
          </span>
          {' '}
          <a href="https://sortment.com" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#111]">Sortment</a>
          {' '}— an agentic customer engagement platform for lifecycle marketers,
          native to the data warehouse.
          Founding designer on both. Have experienced the 0→1 journey twice now —
          exciting, exhausting, and wildly rewarding.
        </p>
        <p>
          I don't really have a shareable static portfolio — 
          been neck deep in building for the last 4 years. 
          This site acts as a placeholder tombstone, and a way to reach me. 
          If you want to see more of my work, or just chat about building products, feel free to reach out.
        </p>
      </div>

      <div className="space-y-2 mb-12">
        <p className="text-[#888] text-sm">
          ↳ Live demo of Sortment:{' '}
          <a href="https://demo.sortment.com" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#111]">
            demo.sortment.com
          </a>
          <span className="text-[#bbb]"> (use <span title="jazeel@sortment.com" className="cursor-help">my email</span> to get inside)</span>
        </p>
      </div>

      <p className="text-sm text-[#999]">
        <a href="https://www.linkedin.com/in/uhzeel/" target="_blank" rel="noopener" className="hover:text-[#111]">linkedin</a>
        {' · '}
        <a href="mailto:jazeel.ameen@gmail.com" className="hover:text-[#111]">email</a>
        {' · '}
        <a href="/assets/Jazeel - September 2026.pdf" target="_blank" rel="noopener" className="hover:text-[#111]">cv</a>
      </p>

    </main>
    </>
  );
}
