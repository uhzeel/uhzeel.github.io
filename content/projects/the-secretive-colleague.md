---
title: "Sortment Quests · The secretive colleague posing as an open book"
year: 2026
month: 8
description: Designing how a self-regulating plan presents itself and keeps you in the loop
tags: [Slop-tech, LLMs, Product Design]
featured: true
category: work
image: /assets/sortment/approval-breakpoint.png
---

<!-- ===================================================================
     STRUCTURE: the lifecycle of one Quest. Sections run
       Context → the v1 we shipped → asking for one → reading the plan
       → watching it run → stepping in → where it landed → accountability.
     Every section below opens with what went wrong and then shows the
     change. Nothing here is rewritten — only moved. Three headings are
     mine and are marked [HEADING — MINE]; rename them.
     =================================================================== -->

## Context

Sortment was shaping up into a decent base of foundational primitives that enabled marketers to build targeted comms. In parallel, we complemented these creation workflows with LLMs, in the form of an ==AI Assistant=={{
When it comes to preserving context for doing similar kinds of work: chats could be resumed, long-running tasks could be scheduled to run automatically (essentially start new chats with a pre-seeded prompt, on a schedule) – all while they contributed to the workspace's Knowledge Base.}}.

The information exchange model with the Assistant was: one prompt in, and response artefacts that are output against that. This involved manual stitching done by the user, to 'continue' work, or build on top of it.

We wanted to create a surface where Sortment's Assistant could be expected to self-direct an elaborate sequence of long-running tasks, oriented by a goal given to it.

Conceptually, the experience would have to feel like a collection of related activities, foldered/walled in to share context, and strive to refine efforts against a shared goal of the workers it spawns and manages.

<!-- TODO: two or three sentences of what a Quest actually is for a reader
     who has never seen Sortment. What does the operator type, what
     appears, how long does it run, what does it touch? Everything after
     this point assumes it and currently never says it. -->

---

### The Naming Ritual

We built the first version of this composition as 'Projects'. You'd submit a prompt worthy of what you thought was a 'Project' and hope for the best.

It needed a name that stood out and could be marketed as a standout feature. 

After some deliberation, we settled on 'Quests'. The analogy that came with it had us picturing adventurers going out, getting distracted, splitting up work, and setting off on their own sidequests – all of which are attributes that our hallucinating LLMs are capable of. 

It also carried the idea of [adventurers] creating a plan up front, scouting the terrain, and putting themselves out there. Plans fail and things get sidetracked, but there is always something to learn.

I treated this metaphor to line how the design architecture plays out from here.

<!-- TODO: one line making the metaphor the design brief, so the later
     sections can call back to it for free. Distracted → the rabbitholes
     in "Raise the bar". Splitting up → nesting. Scouting the terrain →
     the preliminary study. Plans fail → the approval breakpoint.
     NOTE: the "herding our brave adventurers" line above is also a
     candidate opener for "Stepping in" — it works in either place, but
     only one. -->

---

<!-- We're dealing with machinery with the ability to spawn tasks of its own that cascade in sequence, resolve async or have them wait on each other.  -->

We limit the experience to having the human user kick things off (input the ask) – and then have them inherit some of the burden of herding our brave adventurers (monitoring & course corrections).

<!-- SECTION: the v1 artifact. Shared "before" for the four sections that
     follow, which is why it sits ahead of them rather than being split up.
     Ends on the failure, not on what was built. -->

---


## Launching a Quest

We reduced scope to avoid building UI for untested waters, we kept things flexible by relying on toolcalls from the Assistant to create the Quest mechanisms. 

Users would discuss a goal with the Assistant, and then approve the creation of a Quest – this is either explicitly asked, or floated as a suggestion by Assistant as it picks up signals worthy of a Quest.

<!-- PLACEHOLDER SKELETON — copy this anywhere an image is still to come.
     Swap the src for the real file and drop "To come: " from the caption.
       :::frame taupe-100 narrow            <- narrow for a single shot read at body size
       ![Image coming](/assets/placeholder.svg "To come: <what it will show>")
       :::
     Bare (no frame) also works and bleeds into the wide track on its own:
       ![Image coming](/assets/placeholder.svg "To come: <what it will show>") -->

:::frame taupe-100
![Image coming](/assets/placeholder.svg "To come: the chat exchange where a Quest gets suggested and approved.")
:::

### Setting a higher bar on user requests

Watching the first few Quests wander around too much or getting their heads stuck in very specific rabbitholes, meant there was too much drift and plots being lost –  plots that were never clear to begin with.

Quests were eager, finish-line-hungry machines that wanted to wrap things up fast and fire up whatever tools they had in their arsenals – with no hesitation when facing vague unsizeable scopes.

> Generic product-side guardrails weren't going to be enough: my goal was to cater to personalised interests of users, which meant also holding them accountable for lazy querying — a behaviour we should consider when designing in this era.

When requesting Quests, we tightened acceptance criteria by:
- negotiating output expectations earlier instead of being surprised by how the Quest played out
- drawing a scaffolding of a plan that is verified before having to wait to see the actual payload get rendered on the UI.

Also get some work done in advance:
- trying to some analysis directly in chat without offloading the same mundane task to a Milestone
- conducting a preliminary study on existing analyses or entities that are already present in the workspace that feed this new Quests' directives, 

:::frame taupe-100
![Image coming](/assets/placeholder.svg "To come: transcript of the negotiation — a lazy request and what the Assistant asks back")
:::

---

## Revealing sequence

Scrapping a ==vibe-coded kanban interface=={{This isn't some OpenClaw-like machine – the aesthetic was giving 'workaholic'.}}, I forced a linear list of tasks to anchor 'progress'.

The kanban didn't demonstrate sequence, and how things can **course-correct** based on discoveries that happen in-flight. 

We unleashed this as an **experiment** – to observe how content would sit, how/if users would tweak the language, expectations on how it should structure itself, and also what configurations the LLM would settle on for these roadmaps.

:::frame taupe-100
![Quest Plan](/assets/sortment/plan-v1.png "The first version of the Quest Plan: broken into steps, and nested substeps - each with its own status and textual slop.")

{{point 90 50}} Slop-gen (Illustrative)

:::

The plan allowed a Quest to reveal what was next in mind, along with restrospectively cancelled plans. And more importantly, this gave operators a way to see its **current situation** in the form of a 'running' step.

<!-- Retired heading: "### Observations". Its three bullets and the
     nesting paragraph now open the sections they each motivate.
     TODO: consider cropping plan-v1.png into three detail shots so each
     failure section can open with its own evidence instead of asking the
     reader to scroll back up to this one. -->

---

<!-- SECTION: intake. First in the lifecycle, last thing you actually fixed.
     TODO: rename — drop "Problem 2", it is no longer second. State the
     failure: the bar for accepting a request was on the floor.
     TODO: one line buying back the chronology you are giving up here —
     that this was the last thing fixed and should have been the first. -->

<!-- SECTION [HEADING — MINE]: rename to the failure. Something like
     "Everything sounded the same". -->

## Reading the plan

The depth of nesting seemed to feed only our desires to see faux intelligence being flaunted around; we need to **snap out of the collective trance** that is this LLM-master-race-omg-my-computer-can-talk-nerdy-to-me.

:::frame taupe-100
![Image coming](/assets/placeholder.svg "To come: Zoom in on brain fog.")
:::

Sub-steps sounding awefully similar to each other and their parent steps + summaries repeating or expanding on the title, adding much more friction to how you scan the list of steps on the left; reading it meant inviting yourself to the Quests' brain fog.

Internally, we **renamed the parent steps to Milestones**, and force the LLM to output only one level of nested 'steps'. This was done to increase the gravity on these parent steps, dress it up as the 'reporting centre' for the sub-goal that the Quest has identified for it.

**Milestones are questions.** A milestone names the open question the phase resolves — interrogative, because the phase exists to answer it. First-person-plural — "What apps do we target, and how?" not "Phase 2: Re-Engagement Hypothesis." No "Phase N" prefixes, no numbering.

**Executions are imperatives, and are usually sub-steps.** A sub-step names the action being taken — verb-led. "Define target channels," "Draft value-prop per app," "Create the prioritized opportunity set." Question at the milestone, verb at the step: this grammatical contrast reinforces the gravity that milestones have without relying just on indentation.

**Nesting collapsed.** Milestone → step, and nothing below that. The old 2.1.1-under-2.1-under-Phase-2 depth is gone, and the steps that remain sit behind a "Show steps" toggle rather than arriving pre-indented. The plan now reads as milestone, and can be expected to present synthesized reports at each.

---

<!-- SECTION [HEADING — MINE]: rename to the failure. Something like
     "It kept telling you what it set out to do". -->

## Watching it run

- Showing the step's objective in the primary real-estate long after its completion; coming back to a step meant pushing through the recap everytime + varying height allocations had you searching for what mattered.
- Technical approach to executions + very 'FYI, guys calc is short for calculator, in case you're new to the stream' energy + Quest ops overexplained to an operator who just wants some grounding first - too much transparency?

:::frame taupe-100 narrow
![Quest Statuses](/assets/sortment/quest-status.png "Statuses that reveal more.")
:::

**Live-state verb forms.** In-progress steps read as present-progressive actions — "Creating prioritized opportunity set…", "Crunching…", "Waiting for input"

:::frame taupe-100 narrow
![A completed milestone](/assets/sortment/step-completed.png "A completed milestone, with its objective and captured inputs.")
:::

**Findings restructured to bold-lead + bullets.** Outcome summaries went from flat paragraphs to a lead line with key phrases bolded (not the whole sentence) and findings carrying their "so-what."

**Objective demoted, outcome promoted.** The step's objective used to lead. Now, the live finding leads ("125K revoked merchants in play…"), and Objective sits at the bottom along with Your responses.

---

<!-- SECTION [HEADING — MINE]: rename to the failure. Something like
     "It never asked". -->

## Stepping in

<!-- TODO: this section has the two best screenshots and no stated failure
     to open on. The v1 ran to completion without ever stopping — say that,
     and say what it cost, before the two fixes below. -->

:::frame taupe-100 narrow
![Sequence of steps, halted while waiting for approval to proceed.](/assets/sortment/approval-breakpoint.png "Collapsed steps, and an inline approval sitting between two milestones.")

:::

**An inline approval breakpoint.** The Quest can stop between milestones and ask "Good to keep going?" — as a row in the plan. *I have notes* lets the operator correct the route before the proceeding. This is the Quest roping in its operator when the road ahead stops resembling the one that was agreed upon.

:::frame taupe-100 narrow
![A step waiting for input](/assets/sortment/step-waiting-for-input.png "A step waiting for input.")
:::

**Inputs as a pending-only carousel.** Pending inputs float to the top (loud), resolved ones sink into a collapsed strip (quiet).

---

<!-- Retired headings: "## Problem 1 · A way to check-in from HQ",
     "## Tuning: Nomenclature", "## Tuning: Structure". -->

<!-- SECTION [HEADING — MINE]: the after-shot, answering plan-v1. -->

## Where it landed

:::frame taupe-100
![Quest Plan](/assets/sortment/plan-vX.png "Dissolving borders, constraining widths, stricter language rules, and a well-formatted forward-looking information pane.")

{{point 1 15.5}} **New statuses** that reveal something more current.

{{point 6.5 36.5}} **Scannable outputs.** Access detailed reports without needing to navigate.

{{point 6 56}} **Collapsable steps.** Milestones first.

{{point 98 37}} **What's going on right now?** Outcome-first + Expose current sub-agent title.

{{point 97 53}} **Synthesis** as of this moment - a living report.

:::

---

<!-- CODA: this passage opened the old "Problem 1", before the reader knew
     what the machinery did — which is what the segue line at the end of it
     was noticing. It lands here instead, after they have watched a thing
     plan, drift, and stop to ask permission.
     TODO: heading is mine, rename.
     TODO: "Did I really need that segue?" was a segue out of this passage
     and into the v1 build. There is nothing after it now. Cut it, or turn
     it into whatever the piece wants to end on. -->

## Accountability when working with autonomous systems

You can't be accountable for what you can't see. So who carries accountability in a hazy human-machine contract like this one — the model provider, the service that "owns" the harness, or whoever championed the tool in the first place?

The pre-LLM answer is that these are ==inanimate tools=={{[*at your service*](/projects/at-your-service/), a 2019 installation of mine, explores this from the other end — a machine that performs responsibility without holding any.}}: your skill as an operator decides what goes in, what comes out, what breaks, and who it hurts. The other answer is to plead "production for use," like Earl Williams in *His Girl Friday*, coached to blame the gun for having been made to be used.

Did I really need this segue?
