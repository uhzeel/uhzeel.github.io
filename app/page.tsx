export default function Home() {
  return (
    <main className="max-w-prose mx-auto px-6 py-16">

      <p className="font-medium mt-4 mb-8">Jazeel wuz here</p>

      <div className="text-[#444] leading-relaxed space-y-4 mb-10">
        <p>
          I enjoy crafting complex, scalable systems — from small toys to big machines,
          and the occasional tiny digital snack.
        </p>
        <p>
          Currently leading design at{' '}
          <del>Flo Labs, where we built Shopflo and</del>
          <sup className="text-xs text-[#bbb] ml-0.5 cursor-default" title="Shopflo was recently acquired by Pine Labs. I've exited to focus on Sortment's success.">1</sup>
          {' '}
          <a href="https://sortment.com" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-[#111]">Sortment</a>
          {' '}— an agentic customer engagement platform for lifecycle marketers,
          native to the data warehouse.
          Founding designer on both. Have experienced the 0→1 journey twice now —
          exciting, exhausting, and wildly rewarding.
        </p>
        <p>
          If looking for an updated portfolio, just give up — I've been neck deep in building
          for the last 4 years. This site is a work in progress. Maybe some day.
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
        <a href="/assets/jazeel12pm.pdf" target="_blank" rel="noopener" className="hover:text-[#111]">cv</a>
      </p>

      <p className="text-xs text-[#bbb] mt-8 pt-8 border-t border-[#f0f0f0] flex gap-1.5">
        <sup className="shrink-0">1</sup>
        <span>Shopflo was recently acquired by Pine Labs. I've exited with the founders and a sharp team to focus on Sortment's success.</span>
      </p>

    </main>
  );
}
