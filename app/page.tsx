import P5BackgroundLoader from './components/P5BackgroundLoader';
import SiteHeader from './components/SiteHeader';

export default function Home() {
  return (
    <>
      <P5BackgroundLoader />
      <main className="relative z-10 max-w-prose mx-auto px-6 py-16">

      <SiteHeader />

      <div className="text-neutral-700 leading-relaxed space-y-4 mb-10">
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
          {'  '}
          <a href="https://sortment.com" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-neutral-900">Sortment</a>
          {' '}— an agentic customer engagement platform for lifecycle marketers,
          native to the data warehouse.
          Founding designer on both. Have experienced the 0→1 journey twice now —
          exciting, exhausting, and wildly rewarding.
        </p>
        <p>
          I don't really have a shareable static portfolio — 
          been neck deep in building for the last 4 years, so any '<a href="/projects" rel="noopener" className="underline underline-offset-2 hover:text-neutral-900">projects</a>' you find are still being written out as and when I find time - with no regard for curation, I'm just pushing everything to main haha. 
        </p>
        <p>This site acts as a placeholder, and a way to reach me. 
          If you want to see more of my work, or just chat about building products, feel free to reach out.
        </p>
      </div>

      <div className="space-y-2 mb-12">
        <p className="text-neutral-500 text-sm">
          ↳ Live demo of Sortment:{' '}
          <a href="https://demo.sortment.com" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-neutral-900">
            demo.sortment.com
          </a>
          <span className="text-neutral-400"> (use <span title="jazeel@sortment.com" className="cursor-help">my email</span> to get inside)</span>
        </p>
      </div>

      <p className="text-sm text-neutral-400">
        <a href="https://www.linkedin.com/in/uhzeel/" target="_blank" rel="noopener" className="hover:text-neutral-900">linkedin</a>
        {' · '}
        <a href="mailto:jazeel.ameen@gmail.com" className="hover:text-neutral-900">email</a>
        {' · '}
        <a href="/assets/Jazeel - September 2026.pdf" target="_blank" rel="noopener" className="hover:text-neutral-900">cv</a>
      </p>

    </main>
    </>
  );
}
