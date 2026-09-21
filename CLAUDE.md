# uhzeel.github.io

Personal site for Jazeel Ameen — portfolio, writing, and interactive experiments.

## What this site is

- **Portfolio** — projects from IIT Bombay, installation art, creative tech work
- **Writing** — thoughts, notes, things worth saying
- **Lab** — interactive tools, tiny machines, games, generative experiments

## Stack

- **Next.js 15** (App Router, static export) — the framework
- **Tailwind CSS v4** — styling utility classes. There's no `tailwind.config.ts`; the theme lives in an `@theme` block at the top of `app/globals.css`.
- **Markdown** (`gray-matter` + `marked`) — all content is written as `.md` files
- Deployed to **GitHub Pages** via GitHub Actions on every push to `master`
- Built output goes to `out/` — this is what GitHub Pages serves

## How content works

All content lives in `content/`. No HTML editing needed — just markdown files.

### Add a piece of writing
Create `content/writing/my-post-title.md`:
```md
---
title: "My Post Title"
year: 2026
month: 9                    # optional, 1-12 — refines ordering and display
description: "Optional one-liner shown in the list and under the title"
tags: [tag1, tag2]
featured: false             # optional — reserved, nothing reads it yet
draft: true                 # optional — hides it from the list AND skips building its page entirely
---

Write your post here in plain markdown.
```

Writing is dated by `year`/`month` rather than a full `date`, the same as projects,
so both collections sort through `sortByDate` and display through `formatYearMonth`
("Sep 2026"). It lives at `/writing/<slug>` — the "Writing" tab.

Post pages render through the same `.article-grid` as project pages, so every prose
convention below (bleed images, rail annotations, `:::frame` bands, click-to-zoom)
works in a post too. There's no `embed` field — an interactive piece is a project.

**The writing pages are a deliberate copy of the project pages, not a shared
component.** `app/writing/page.tsx`, `app/writing/[slug]/page.tsx` and
`app/components/WritingList.tsx` mirror their `projects` counterparts so the two
look alike for now; the duplication is there so writing can grow its own row and
header without unpicking a shared abstraction first. Don't merge them — if the
look should change in both places, change it in both places.

### Drafts

`draft: true` on a project or a post means: **visible under `next dev`, absent from
the built site.** The list marks it with a yellow `draft` pill (`.tag-draft`), and
`npm run build` filters it out of both the list and the exported pages. Hiding
drafts everywhere was worse — the page 404'd locally too, so a draft couldn't be
read at all while it was being written.

`output: export` refuses to build a dynamic route that generates zero pages, so a
collection that's *entirely* drafts would otherwise fail the build. `app/writing/[slug]/page.tsx`
stands in one `__none__` placeholder when that happens and 404s on it; the only
trace is an unreachable `out/writing/__none__/`. `app/projects/[slug]/page.tsx`
has no such guard — it always has published entries. Add the same thing there if
that ever stops being true.

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
category: work              # optional — work | personal | experiment; omit for personal
featured: true
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
- **`{{sketch <id> <size> <caption>}}`** puts a p5 sketch in the body as a
  thumbnail that opens the running sketch in a modal. Consecutive lines become
  one grid, the same rule images follow; a blank line starts a new one. The id
  is a p5 editor sketch id under `P5_USER` in `lib/content.ts` (`uhzeel`), and
  both URLs — the embed and the sketch's own page, which the caption links to —
  are derived from it. The caption runs to the closing braces and needs no
  quoting.

  **Nothing loads until it's clicked.** A p5 editor embed boots the entire
  editor app, so a grid of live tiles would load several of them before the
  reader asked for any. The tile is a `<button>`;
  `app/components/SketchModal.tsx` delegates the click, mounts the iframe then,
  and unmounts it on close, which stops the sketch.

  `<size>` is the canvas's natural width in px, and it's there because a p5
  sketch calls `createCanvas` with fixed numbers that the editor never scales —
  the modal builds the iframe at that size and scales the whole element to fit
  the viewport (`--fit`, measured in JS since it depends on the window). Omit it
  and the iframe fills the modal instead.

  The grid sits on the content track, not the wide one — a row of thumbnails
  reads as part of the paragraph it sits between rather than as a figure
  breaking out of the column. Tracks are fractions of the measure, so three
  sketches come out around 186px wide; `--ratio` on `.sketch-grid` (4/3) is the
  one knob for tile shape, and the still fills the tile with `object-fit: cover`
  rather than being stretched to it.

  The thumbnail is `/assets/<project-slug>/<slugified-caption>`, following the
  usual asset convention. The extension isn't written anywhere — `.png`, `.jpg`,
  `.jpeg`, `.webp`, `.gif` and `.avif` are tried in that order and the first one
  on disk wins, so a screenshot can stay a PNG without anything being declared.
  It's checked against `public/` at build time:
  no file yet means the tile renders as a "run sketch" card rather than a broken
  image, so a sketch can be written up before it's been captured. ~400px stills
  are plenty at that tile size. Note that dropping a file into `public/` doesn't
  re-render an open page under `next dev` — the image isn't a module dependency,
  so the render is cached. Save the markdown file to nudge it. Rename the caption and the derived path
  changes with it — the tile falls back to the card until the file is renamed
  too. `ImageZoom` skips images inside `.sketch-thumb`: the thumbnail isn't its
  own control, and clicking it must open the sketch, not zoom the still.
- **`{{embed}}`** places the frontmatter `embed` iframe at that exact point in the body instead of after everything. It's substituted everywhere it appears, so don't write it literally in body copy. Omit it and the embed is appended at the end as before.
- **`:::frame <colour>` … `:::`** puts a tinted, edge-to-edge band behind whatever it contains — the home for UI mockups, where controls that deliberately overshoot the edge of the mock need a surface to overshoot onto. The colour is a Tailwind palette token (`stone-100`, `yellow-50`, `neutral-900`), resolved to a colour value on the `--frame-bg` custom property at build time in `lib/content.ts` (v4's palette is OKLCH, so it's an `oklch()` string rather than a hex), because Tailwind never scans markdown and a utility class wouldn't survive the build. An unknown token fails the build with the offending name. The band carries a nested `.article-grid`, so its contents sit on the page's normal tracks and every convention above still applies inside one — a lone image bleeds, two on consecutive lines become a row, captions work.
- **`:::frame <colour> narrow`** holds the band to the width of the text column instead of running edge to edge — for an image that reads at body size rather than a mockup needing room to overshoot into. There's no nested `.article-grid` on a narrow frame, which is what stops anything inside reaching the wide track: `.bleed` and the lone-image rule both select on `.article-grid > *`, so with no grid they don't match. It's outset by its own horizontal padding — the band's content box aligns to the measure, not its border box — so the image inside lines up with the body copy while the tint hangs past it on both sides. Its corners are rounded (`0.75rem`, matching `.project-preview img`), which a full-bleed band can't be — it has no edge on screen. The outset is `--gutter`, the one width the grid guarantees is free. With no gutter to set text in, supporting text falls under the image in a `.frame-notes` block rather than into the rail; points still pair up with their notes. `narrow` is the only modifier, and an unrecognised one fails the build by name.
- **Anything in a frame that isn't an image becomes supporting text in the rail beside the mockup**, vertically centred against it, rather than stacking underneath. `lib/content.ts` gathers all of it into a single `<aside class="frame-aside">`, because only one grid item can be pinned to the image's row. It takes full markdown. This is why the band is full-bleed in the first place: the gutter next to a `wide` image is empty, so the text costs the mockup no width. Below 1400px there isn't enough gutter to set text in and the aside folds under the image — the same trade annotations make at 960px. A `figcaption` still renders directly under the image, so a short label and a longer note can coexist. A frame with no image in it leaves its prose where it was written.
- **`{{point 62 18}}` at the head of a frame note** marks a spot on the mockup — 62% across, 18% down — and puts the same number in front of the note. Percentages, not pixels, so a point holds its spot as the image scales. Points number themselves in the order they're written, so inserting one renumbers the rest. Only the frame's first image takes points, and they wrap the `<img>` rather than the `<figure>` because a figure's height includes its caption, which would throw every vertical percentage off.

  **The badge doesn't sit on the mockup.** A dot marks the spot, a dashed line runs from it out to whichever edge is nearer, and the number stands clear of the image — a badge sitting on the spot covers the very thing it points at, which on a dense UI screenshot is most of what there is to see. Which side a point leads to is decided in `lib/content.ts` from the x value (`< 50` goes left) rather than in CSS, since only the x value knows and it's a build-time constant. Each leader is one flex row stretched between the dot and the badge, so the dashed run needs no length of its own; `order` puts the badge outermost and `row-reverse` mirrors it for a point on the right half. There's deliberately no line drawn between the badge and its note — the number does that pairing, which is what frees the notes to sit anywhere. Points are pink, the one place the site steps outside neutrals and yellow, because a mark has to win against arbitrary UI underneath it and nothing in the palette does. They're `pointer-events: none`, so a click still reaches the image and opens the zoom modal — which shows the bare image, unmarked.

  **The rails are paid for by the image, not by the page**, and that's what makes them work at every width with no breakpoint and no folded fallback. `--pin-rail` (`clamp(2.25rem, 8vw, 3.5rem)`) is inset off the mockup on both sides; anything that took the room from outside the band instead — widening the band, or leaning on the grid's outer track — runs out of road somewhere around 720px and has to drop the badges back onto the image. A full-bleed frame wins the width back by raising `--wide` by exactly the inset (`.frame-pinned.full`), so its mockup stays at the same ~1020px it has without points; a narrow one has no track to widen, so its image really is a little narrower than the measure. Only a frame that has points pays anything — `lib/content.ts` adds `.frame-pinned` when it finds one.

  **A frame with points puts its notes under the image**, in the `.frame-notes` block a narrow frame always uses, rather than out in the `.frame-aside` rail. A numbered note reads as an item in a list against the marks, and a list belongs under the thing it enumerates. A frame whose supporting text has no points keeps the rail as before.

  **A note needs a blank line between it and the image** — on the next line down they share one paragraph, which stops the image becoming a figure and leaves nothing to mark. A `{{point}}` that reaches the rendered output takes the same split as drafts: under `next dev` it's marked in place as a `.point-orphan` with the reason on hover, since a half-written note is a normal state to be in and taking the page down mid-keystroke is worse than the braces it warns about; `npm run build` fails on it with the file's slug, where an unrendered marker would ship.
- **Every image in the body opens in a modal on click**, with no markup needed. `app/components/ImageZoom.tsx` delegates from the document rather than binding per image, since the body is injected with `dangerouslySetInnerHTML` and there's no React tree to hang handlers off. It also adds the tab stop and button role at runtime, so an image doesn't advertise itself as a control on a page where the JS hasn't loaded. The caption, if the figure has one, is carried into the modal.
- **`<figure class="full">`** (raw HTML in the markdown) goes edge-to-edge. `class="bleed"` on any element opts it into the wide track.
- **`==highlighted phrase=={{note body}}`** puts an annotation in the side rail, anchored to that phrase. The note body accepts markdown. Below 960px there's no rail, so a note becomes a full-width float in the column: the sentence finishes its line past the highlight, the note drops below that line, and the paragraph resumes under it. A bare `==highlight==` with no `{{...}}` just marks the text.
- **A note over ~280 characters folds into the column at every width**, taking that same full-width float instead of the rail. Nothing in the markdown marks it — `lib/content.ts` measures the note at build time (`INLINE_NOTE_CHARS`) and adds `.inline`. The rail is 10rem at 14px type, about 22 characters a line, so past the threshold a note is taller than the paragraph it hangs off and, since notes don't stack, collides with whatever follows. The count is of visible text, so a long href doesn't trip it, and a note containing an image is exempt — a margin thumbnail is the whole point of that form. Existing notes run 98–163 characters, well clear.

Annotations are absolutely positioned rather than occupying a grid track (a grid row can only align to whole blocks, not to a phrase mid-paragraph) and deliberately specify no `top`, so they inherit their static position — the line the highlight falls on — without adding height to the paragraph. A float can't be used here: grid items contain their floats, which made the body copy open up a gap the size of the note. (Below 960px a float is exactly right, and for a second reason: a block there would close the line the highlight sits on, cutting the sentence in half — see the max-width: 960px rule.) The cost of being out of flow is that notes don't stack, so two anchored within a few lines of each other will overlap, as will a note landing beside a bleed image.

`content/projects/sandbox.md` ("Prose Sandbox") is a deliberately published page that exercises every one of these elements at once and links to its own markdown source on GitHub — it's the reference for this system, not a leftover test fixture. Keep it working when the layout changes.

Sizing lives in three custom properties on `.article-grid`: `--gutter`, `--measure` and `--wide` (how far past the measure a bleed element reaches on each side, 8rem by default). `.frame` raises `--wide` to 16rem, which is the knob for mockup width. Note that `html` is `font-size: 14px`, so `1rem` is 14px and Tailwind's `px-6` is 21px, not 24px.

Projects sort newest-first by `year` (and `month`, if set) — there's no manual `order` field anymore. Ties (same year, no month) break alphabetically by title. `year`/`month` display as "2024" or "Mar 2024" depending on whether `month` is set (see `formatYearMonth` in `lib/content.ts`).

The Work page (`/projects`, the "Work" tab) is split into three labelled sections,
in this order, each newest-first within itself:

| `category` | Heading | What goes there |
|---|---|---|
| `work` | ❖ Gets bread | Made inside a job — there was a product and a team on the other end |
| `personal` (the default) | ✧ The bread | The self-directed body of work |
| `experiment` | ◇ Half-baked | Testbeds and tinkering |

Omitting `category` means `personal`, so only an entry that belongs elsewhere carries
the line. A group with nothing in it isn't rendered at all, heading included. An
unknown `category` value **fails the build**, naming the slug and the bad value —
with three sections a typo is easy, and it would otherwise fall into the default and
file something under the wrong heading while the page still looked fine. The list of
sections is `SECTIONS` in `app/projects/page.tsx`; it's the single place the keys,
the headings and the order are declared.

Work leads because the page is read by people deciding whether to hire. The headings
share a metaphor rather than splitting into Work/Personal, which quietly makes the
second list sound like a hobby bin — the job work is no less the author's for having
had a brief attached. The glyphs get lighter as the work gets less formal. Note the
line isn't paid/unpaid: *take me lightly* was funded by Creative Scotland and still
sits under ✧.

The groups are sections inside one `ProjectList` rather than one component each.
Everything that makes the list navigable is global: the arrow keys listen on the
window, so two mounted lists would both answer an ArrowDown and fight over focus,
and there's a single preview panel for the page. Rows carry an index that runs
across the groups, which is also the tab order. The `<ul>`s are deliberately
unpositioned so a row's `offsetTop` measures against the wrapper the panel is
positioned in, and stays comparable from one group to the next.

A project page's header is just title → description. The date and tags moved to a
`<footer>` under the body and the embed, behind a `border-t` rule: they're metadata
about the piece rather than part of it, and in the header the reader got past four
things before reaching the first sentence. Tags are set as plain prose there —
`"Filed under"` as a small label, then the tags joined with commas — because a pill
reads as something you can press and there's no tag index to land on.

The writing post page still carries the old header (date and tags as `.tag` pills),
which is the one place `.tag` is used now. Writing is a deliberate copy, not a shared
component, so bring it across by hand if the same change should apply there.

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
| `app/writing/page.tsx` | Writing listing (mirrors `app/projects/page.tsx`, deliberately separate) |
| `app/writing/[slug]/page.tsx` | Individual post |
| `lib/content.ts` | Reads markdown files, parses frontmatter, returns data to pages |
| `app/components/SketchModal.tsx` | Click-to-run for `{{sketch}}` tiles — mounts the sketch iframe only while the modal is open |
| `next.config.ts` | `output: 'export'` and `trailingSlash: true` — required for GitHub Pages |
| `.github/workflows/deploy.yml` | Builds and deploys to GitHub Pages on push to master |
| `app/globals.css` (`@theme` block) | Font (Rethink Sans, via `--font-rethink`) and `--container-measure`, the 620px measure. Replaces the old `tailwind.config.ts`. |

## Design

- Font: **Rethink Sans** (Google Fonts, sans-serif), one family for everything.
  A serif for body copy was tried and reverted — it read badly against the rest
  of the site. If it comes up again, the pairing to try is Alegreya + Alegreya
  Sans rather than a serif dropped into the existing sans.
- **1rem (14px) is the floor for anything meant to be read.** The site used to
  run text down to 0.7rem (≈10px). Tag pills, zoom captions, sketch captions,
  the "run sketch" affordance, list descriptions, dates and page footers are all
  at 14px now, and `text-sm`/`text-xs` don't appear in any component. Because
  prose sits at the root size, an `em` fraction inside `.prose` lands under the
  floor, so `figcaption`, `code` and `.point-orphan` are all at `1em`/`1rem` —
  inline code is optically a touch large as a result, which is the trade.
  Two things sit below the floor on purpose, and each says why at its own rule:
  `.pin` (0.75rem — a numeral in a disc, and the disc is sized off it, so
  raising it forces `--pin-rail` wider and costs every pinned mockup width) and
  `.tag-draft` (0.7rem — an uppercase micro-label that never ships).
- Background: white `#fff`
- Colour comes from the Tailwind palette only — there are no hex literals left in the codebase.
  Text is the `neutral` scale (`neutral-900` near-black, `neutral-700`/`600` body, `neutral-500`/`400`
  muted), borders are `neutral-100` (list dividers) and `neutral-200` (rules, blockquotes, pills),
  and the warm accent — the `mark` highlight — is `yellow-100`.
  In `className` use the utility (`text-neutral-500`), never `text-[#888]`. `app/globals.css` styles
  markdown-generated HTML that carries no classes, so it reaches the same palette through Tailwind's
  theme variables (`color: var(--color-neutral-500)`) — add colour there the same way. The v3
  `theme('colors.neutral.500')` form is gone.

  The palette includes v4's four newer neutrals — `taupe`, `mauve`, `mist`, `olive` — alongside the
  original 22 hues, in `:::frame` blocks as well as utilities.
- No sticky/fixed header — `app/components/SiteHeader.tsx` renders inline at the top of every page (name + role, Work/Writing nav with active-state highlighting), replacing the old per-page "← Jazeel Ameen" back-link
- Layout: single column, max 620px wide — the `max-w-measure` utility, backed by `--container-measure`.
  Not `max-w-prose`: v4 hardcodes that to `65ch` and a theme variable can't override it, so the measure
  would silently change.

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
- Full portfolio content — Jazeel isn't ready yet, home page is currently a WIP page

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
