# uhzeel.github.io

Personal site for Jazeel Ameen — portfolio, blog, and interactive experiments.

## What this site is

- **Portfolio** — projects from IIT Bombay, installation art, creative tech work
- **Blog** — writing, thoughts, things worth saying
- **Lab** — interactive tools, tiny machines, games, generative experiments

## Stack

- **Next.js 15** (App Router, static export) — the framework
- **Tailwind CSS** — styling utility classes
- **Markdown** (`gray-matter` + `marked`) — all content is written as `.md` files
- Deployed to **GitHub Pages** via GitHub Actions on every push to `master`
- Built output goes to `out/` — this is what GitHub Pages serves

## How content works

All content lives in `content/`. No HTML editing needed — just markdown files.

### Add a blog post
Create `content/blog/my-post-title.md`:
```md
---
title: "My Post Title"
date: 2026-04-30
description: "Optional one-liner shown in listings"
tags: [tag1, tag2]
draft: true          # optional — hides it from the list AND skips building its page entirely
---

Write your post here in plain markdown.
```

**Important:** the first blog post also needs the route `app/blog/[slug]/page.tsx` restored — it was removed because Next.js won't build a dynamic route with zero pages. Ask Claude to add it when ready.

### Add a project
Create `content/projects/my-project.md`:
```md
---
title: "Project Name"
year: 2024
month: 3                    # optional, 1-12 — refines ordering/display within the same year
description: "One sentence shown in the project list"
tags: [art, interactive]
embed: /my-project/index.html   # optional — loads this URL in an iframe on the project page
featured: true
aiAssisted: true            # optional — shows the "written with AI" note above the body copy
draft: true                 # optional — hides it from the list AND skips building its page entirely
---

Write about the project here. Markdown supported.
```

Point `embed` at the `index.html` file, not the folder — `next dev` doesn't resolve directory indexes inside `public/`, so `/my-project/` 404s locally even though GitHub Pages serves it fine.

### Project page layout (bleed, full-bleed, annotations)

Project pages render markdown into a CSS grid (`.article-grid` in `app/globals.css`) whose centre track is the normal text measure, with wider tracks on either side. Nothing here needs a plugin — it's all plain markdown plus a few conventions:

- **A standalone image bleeds automatically.** `![alt](/assets/thing.png)` on its own line widens into the side tracks. No syntax needed.
- **Captions use markdown's native title slot.** `![alt](/assets/thing.png "The caption")` renders a `<figure>` with a `<figcaption>`. Leave the title empty (`""`) as a placeholder and no caption element is emitted.
- **Images on consecutive lines share a row.** Put two or three images on adjacent lines with no blank line between them and they become one `.figure-row`, sized equally and stacking below 640px. A blank line between images gives each its own row instead.
- **Annotations can hold images**, so a small reference shot can sit in the rail as a thumbnail instead of interrupting the body: `==phrase=={{![alt](/assets/thing.png)Caption text.}}`
- **`{{embed}}`** places the frontmatter `embed` iframe at that exact point in the body instead of after everything. It's substituted everywhere it appears, so don't write it literally in body copy. Omit it and the embed is appended at the end as before.
- **`:::frame <colour>` … `:::`** puts a tinted, edge-to-edge band behind whatever it contains — the home for UI mockups, where controls that deliberately overshoot the edge of the mock need a surface to overshoot onto. The colour is a Tailwind palette token (`stone-100`, `yellow-50`, `neutral-900`), resolved to a hex on the `--frame-bg` custom property at build time in `lib/content.ts`, because Tailwind never scans markdown and a utility class wouldn't survive the build. An unknown token fails the build with the offending name. The band carries a nested `.article-grid`, so its contents sit on the page's normal tracks and every convention above still applies inside one — a lone image bleeds, two on consecutive lines become a row, captions work.
- **Anything in a frame that isn't an image becomes supporting text in the rail beside the mockup**, vertically centred against it, rather than stacking underneath. `lib/content.ts` gathers all of it into a single `<aside class="frame-aside">`, because only one grid item can be pinned to the image's row. It takes full markdown. This is why the band is full-bleed in the first place: the gutter next to a `wide` image is empty, so the text costs the mockup no width. Below 1400px there isn't enough gutter to set text in and the aside folds under the image — the same trade annotations make at 960px. A `figcaption` still renders directly under the image, so a short label and a longer note can coexist. A frame with no image in it leaves its prose where it was written.
- **`{{point 62 18}}` at the head of a rail note** drops a numbered pin on the mockup — 62% across, 18% down — and puts the same number in front of the note. Percentages, not pixels, so a pin holds its spot as the image scales. Pins number themselves in the order they're written, so inserting one renumbers the rest. Only the frame's first image takes pins, and they wrap the `<img>` rather than the `<figure>` because a figure's height includes its caption, which would throw every vertical percentage off. There's deliberately no line drawn between pin and note: that's what keeps the pairing readable when the rail folds under the image below 1400px, where an arrow would have nothing sensible to point along. Pins are pink with a dark ring, and the pin on the mockup is the same object at the same size as the one in front of the note — pink because a pin has to win against arbitrary UI underneath it and nothing in the neutral-and-yellow palette does, the ring because the fill alone can't separate it from a light mockup. This is the one place the site steps outside neutrals and yellow. Pins are `pointer-events: none`, so a click still reaches the image and opens the zoom modal — which shows the bare image, without pins.
- **Every image in the body opens in a modal on click**, with no markup needed. `app/components/ImageZoom.tsx` delegates from the document rather than binding per image, since the body is injected with `dangerouslySetInnerHTML` and there's no React tree to hang handlers off. It also adds the tab stop and button role at runtime, so an image doesn't advertise itself as a control on a page where the JS hasn't loaded. The caption, if the figure has one, is carried into the modal.
- **`<figure class="full">`** (raw HTML in the markdown) goes edge-to-edge. `class="bleed"` on any element opts it into the wide track.
- **`==highlighted phrase=={{note body}}`** puts an annotation in the side rail, anchored to that phrase. The note body accepts markdown. Below 960px there's no rail, so notes fold back into the column. A bare `==highlight==` with no `{{...}}` just marks the text.

Annotations are absolutely positioned rather than occupying a grid track (a grid row can only align to whole blocks, not to a phrase mid-paragraph) and deliberately specify no `top`, so they inherit their static position — the line the highlight falls on — without adding height to the paragraph. A float can't be used here: grid items contain their floats, which made the body copy open up a gap the size of the note. The cost of being out of flow is that notes don't stack, so two anchored within a few lines of each other will overlap, as will a note landing beside a bleed image.

`content/projects/sandbox.md` ("Prose Sandbox") is a deliberately published page that exercises every one of these elements at once and links to its own markdown source on GitHub — it's the reference for this system, not a leftover test fixture. Keep it working when the layout changes.

Sizing lives in three custom properties on `.article-grid`: `--gutter`, `--measure` and `--wide` (how far past the measure a bleed element reaches on each side, 8rem by default). `.frame` raises `--wide` to 16rem, which is the knob for mockup width. Note that `html` is `font-size: 14px`, so `1rem` is 14px and Tailwind's `px-6` is 21px, not 24px.

Projects sort newest-first by `year` (and `month`, if set) — there's no manual `order` field anymore. Ties (same year, no month) break alphabetically by title. `year`/`month` display as "2024" or "Mar 2024" depending on whether `month` is set (see `formatYearMonth` in `lib/content.ts`).

The Work page (`/projects`, the "Work" tab) is one flat, newest-first list. There used to be a `category: work | project` field splitting it into Work/Projects subsections; it was removed since every entry was a `project`. Reintroduce it if paid-employment entries ever need separating.

A project page's header runs title → description → date → tags, with tags as pills (`.tag` in `globals.css`). `aiAssisted: true` in the frontmatter renders the AI-assistance note (`.ai-note`) between the header and the body; the wording lives in `app/projects/[slug]/page.tsx`, not in the markdown.

### Add a standalone interactive tool / experiment
Drop the entire self-contained app (HTML + JS) into `public/my-tool/`. It becomes available at `uhzeel.github.io/my-tool/` with no framework overhead — completely isolated. Then add a project markdown file pointing to it with `embed: /my-tool/index.html`.

This is how the existing experiments work:
- `public/threeone/` → gaussian splats
- `public/atyourservice/` → "at your service" chatbot
- `public/takemelightly0/` → "take me lightly" Unity export
- `public/p5/` → p5.js generative sketch

## Asset storage (`public/assets/`)

Assets are filed per project, in a folder named after the project's slug, so an asset's owner is obvious from its path. These live at `/assets/<slug>/<filename>` when deployed.

```
public/assets/
  Jazeel - September 2026.pdf   ← current CV, linked from the home page (not project-scoped, stays at root)
  at-your-service/
    report0707.pdf              ← B.Des project report, linked from the project page
    report/                     ← 31 images extracted from that PDF
    elizax.png
  take-me-lightly/wli.png       ← Wretched Light Industry logo, used as the project thumbnail
  p5-sketch/p5sketches.txt
  sandbox/placeholder-wide.svg
  unsorted/                     ← owner unknown; file it under a slug when that changes
    jazeel12pm.pdf              ← superseded CV, no longer linked anywhere
    trapped.gif
```

When adding a project asset, make the folder if it doesn't exist and reference it as `/assets/<slug>/<file>`. When building out project pages, check the project's folder and `unsorted/` first — there may be material already waiting.

**Watch the weight.** Git keeps every blob forever, so compress images *before* the first commit. `sips` ships with macOS and is enough: `sips -Z 2400 -s format jpeg -s formatOptions 85 in.jpg --out out.jpg`. Photographs belong in JPEG; keep PNG only for screenshots, diagrams and anything with crisp text, where JPEG rings around the edges.

The extracted report images went 25 MB → 7 MB this way (four 6000×3368 photos resampled to 2400px, two photographic PNGs moved to JPEG). The originals all still live inside `report0707.pdf`, so re-extracting at full resolution is always possible — which also means that 25 MB PDF, not the images, is now the biggest thing in the repo.

## Key files

| File | What it does |
|------|-------------|
| `app/layout.tsx` | Font and body wrapper — no shared nav, each page manages its own |
| `app/page.tsx` | Home page (currently WIP page with bio and Flo Labs context) |
| `app/projects/page.tsx` | Projects list |
| `app/projects/[slug]/page.tsx` | Individual project page |
| `app/blog/page.tsx` | Blog listing |
| `lib/content.ts` | Reads markdown files, parses frontmatter, returns data to pages |
| `next.config.ts` | `output: 'export'` and `trailingSlash: true` — required for GitHub Pages |
| `.github/workflows/deploy.yml` | Builds and deploys to GitHub Pages on push to master |
| `tailwind.config.ts` | Font (Rethink Sans) and max-width |

## Design

- Font: **Rethink Sans** (Google Fonts, sans-serif)
- Background: white `#fff`
- Colour comes from the Tailwind palette only — there are no hex literals left in the codebase.
  Text is the `neutral` scale (`neutral-900` near-black, `neutral-700`/`600` body, `neutral-500`/`400`
  muted), borders are `neutral-100` (list dividers) and `neutral-200` (rules, blockquotes, pills),
  and the warm accents — the `mark` highlight and the `.ai-note` — are `yellow-100`/`yellow-50`/`yellow-700`.
  In `className` use the utility (`text-neutral-500`), never `text-[#888]`. `app/globals.css` styles
  markdown-generated HTML that carries no classes, so it reaches the same palette through Tailwind's
  `theme()` function (`color: theme('colors.neutral.500')`) — add colour there the same way.
- No sticky/fixed header — `app/components/SiteHeader.tsx` renders inline at the top of every page (name + role, Work/Writing nav with active-state highlighting), replacing the old per-page "← Jazeel Ameen" back-link
- Layout: single column, max 620px wide

## Running locally

```bash
npm run dev       # dev server at http://localhost:3000
npm run build     # build static site to out/
```

## Deploying

Push to `master` — GitHub Actions handles the rest. One-time setup needed in GitHub repo settings: **Settings → Pages → Source → GitHub Actions**.

## Things to build next

- **Terminal interface** at `/terminal` — interactive shell to discover projects via typed commands (`ls`, `open gaussian-splats`, etc.). Jazeel was very excited about this idea.
- **Lab / Tools section** — a third content type for interactive experiments distinct from art projects
- `app/blog/[slug]/page.tsx` — needs to be created when writing the first blog post
- Full portfolio content — Jazeel isn't ready yet, home page is currently a WIP page

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
