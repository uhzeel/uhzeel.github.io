---
title: "Prose Sandbox"
year: 2026
month: 9
description: A living reference for how pages here are put together — text measure, bleed widths, full-bleed images and side annotations.
tags: [sandbox]
featured: false
---

Body copy sits in the content column, at the same measure the rest of the site uses. This paragraph is here to give the eye something to compare the wider elements against, and to check that **bold**, *italic*, `inline code` and [links](/projects/) all still behave the way they did before the grid went in.

<a href="https://github.com/uhzeel/uhzeel.github.io/blob/master/content/projects/sandbox.md" target="_blank" rel="noopener">Read the markdown behind this page ↗</a> — every element below is plain markdown plus a couple of conventions, and the source is the quickest way to see which is which.

![Placeholder](/assets/sandbox/placeholder-wide.svg)

A standalone image drops into the wide track on its own — no syntax needed. It runs past the text on both sides but keeps a gutter, and below roughly 650px of viewport it collapses back to exactly the text width.

## Annotations

Notes anchor to ==a highlighted phrase=={{This note is anchored to the highlight on the left. It sits in the rail beside the line where the highlight appears, and it folds back into the column below 960px.}} inside the paragraph, and the note itself sits out in the side rail, aligned to roughly the line the highlight falls on. Hovering the highlight darkens its note.

Notes can carry an image as well as text — ==this phrase=={{![Placeholder](/assets/sandbox/placeholder-wide.svg)A thumbnail sitting in the margin, for a reference shot that shouldn't interrupt the reading.}} has a thumbnail pinned beside it in the rail, which is a good home for supporting material that would break the flow if it were full width.

Because the note is out of flow, it never pushes the body copy around — the paragraph keeps its natural height whether the note is two lines or ten. The trade is that notes don't stack: two anchored within a few lines of each other will overlap, so space them out.

A ==bare highlight== with no note attached is also fine. And here is a second note, ==far enough down=={{Anchored to a phrase in a later paragraph, so it clears the one above it without needing to stack.}} that it clears the one above.

## Heading level two

Spacing above and below headings should look untouched. Grid items don't collapse their margins, so the values in `globals.css` were rebalanced to compensate — if headings start drifting apart, that's the thing to look at.

### Heading level three

- First list item, sitting in the content column
- Second item, long enough to wrap onto a second line so the hanging indent and leading are visible next to the paragraphs above
- Third item

1. Ordered item one
2. Ordered item two

> A blockquote, for pull quotes and asides that still belong in the main column.

## Embeds

Interactive pieces can be dropped straight into the page as an iframe, sized to the same wide track as the image above. They can also just be linked, which is usually the better call — something like <a href="/p5/index.html" target="_blank" rel="noopener">this p5 sketch ↗</a> reads far better fullscreen than boxed into a 16:9 frame partway down a column of text.

<figure class="full">
  <img src="/assets/sandbox/placeholder-wide.svg" alt="Placeholder" />
  <figcaption>Full-bleed: edge to edge, no gutter. Worth using sparingly — probably a hero, not a body image.</figcaption>
</figure>

---

A closing paragraph, back in the content column, to confirm the flow resumes cleanly after a full-bleed element and a horizontal rule.
