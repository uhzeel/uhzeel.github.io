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
description: "One sentence shown in the project list"
tags: [art, interactive]
embed: /my-project/        # optional — loads this URL in an iframe on the project page
order: 6                   # controls sort order in listings
featured: true
---

Write about the project here. Markdown supported.
```

### Add a standalone interactive tool / experiment
Drop the entire self-contained app (HTML + JS) into `public/my-tool/`. It becomes available at `uhzeel.github.io/my-tool/` with no framework overhead — completely isolated. Then add a project markdown file pointing to it with `embed: /my-tool/`.

This is how the existing experiments work:
- `public/threeone/` → gaussian splats
- `public/atyourservice/` → "at your service" chatbot
- `public/takemelightly0/` → "take me lightly" Unity export
- `public/p5/` → p5.js generative sketch

## Asset storage (`public/assets/`)

`public/assets/` is a holding folder for files not yet wired up to the site — raw material and fodder for future work. Jazeel was using the old site root as a dumping ground for things to revisit. These live at `/assets/filename` when deployed.

Current contents and what they might be for:
- `jazeel12pm.pdf` — CV, actively linked from the home page
- `report0707.pdf` — writeup explaining the "at your service" project (was linked in the old site)
- `wli.png` — Wretched Light Industries logo/asset (installation art work)
- `elizax.png` — image likely related to the "at your service" Eliza chatbot piece
- `trapped.gif` — unknown, possibly a project asset or animation
- `p5sketches.txt` — notes or code snippets for p5.js sketches

When building out project pages, check here first — there may be assets already waiting.

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
| `tailwind.config.ts` | Font (Inter) and max-width |

## Design

- Font: **Inter** (Google Fonts, sans-serif)
- Background: white `#fff`
- Text: near-black `#111`, muted `#444`–`#999`
- No sticky header — each page has its own minimal back-link
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
