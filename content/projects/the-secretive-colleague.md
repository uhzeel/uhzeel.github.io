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

## Context

We set out to create a surface where Sortment's Assistant could be expected to self-direct an elaborate sequence of long-running tasks, oriented by a goal given to it.

### The Naming Ritual

We built the first version as 'Projects'. You'd submit a prompt worthy of what you thought was a 'Project' and hope for the best.

It needed a name that stood out and could be marketed as a standout feature. 

After some deliberation, we settled on 'Quests'. The analogy that came with it had us picturing adventurers going out, getting distracted, splitting up work, and setting off on their own sidequests – all of which are attributes that our hallucinating LLMs are capable of. It also carried the idea of creating a plan up front, scouting the terrain, and putting themselves out there. Plans fail and things get sidetracked, but there is always something to learn.

---

## Problem 1 · A way to check-in from HQ

We're dealing with machinery with the ability to spawn tasks of its own that cascade in sequence, resolve async or have them wait on each other. 

Sticking to the classical method, we start by having the human kick things off –  and then have them inherit some of the burden of herding our brave adventurers.

You can't be accountable for what you can't see. So who carries accountability in a hazy human-machine contract like this one — the model provider, the service that "owns" the harness, or whoever championed the tool in the first place?

The pre-LLM answer is that these are ==inanimate tools=={{[*at your service*](/projects/at-your-service/), a 2019 installation of mine, explores this from the other end — a machine that performs responsibility without holding any.}}: your skill as an operator decides what goes in, what comes out, what breaks, and who it hurts. The other answer is to plead "production for use," like Earl Williams in *His Girl Friday*, coached to blame the gun for having been made to be used.

Did I really need that segue?

### Teach an LLM to fish in the Mariana Trench... and it shall forget to purchase a boat

Scrapping a vibe-coded kanban interface, forcing a linear flow of tasks felt like a good way to anchor 'progress'.

This also allowed a Quest to reveal what was next in mind, along with restrospectively cancelled plans. And more importantly, this gave operators a way to see its current location in the form of a 'running' step - situational awareness, like they used to say in the good ol' double-diamond days.

:::frame taupe-100
![Quest Plan](/assets/sortment/plan-v1.png "The first version of the Quest Plan: broken into steps, and nested substeps - each with its own status and textual slop.")

{{point 90 50}} Slop (Illustrative)

:::

**We unleashed this as an experiment** – to observe how content would sit, how/if users would tweak the language, expectations on how it should structure itself, and also what configurations the LLM would settle on for these roadmaps.

### Observations

It was this eager, finish-line-hungry machine that wanted to wrap things up fast and fire up whatever tools it had in its arsenal with no regard for magnitude of scope.

The depth of nesting seemed to feed only our desires to see faux intelligence being flaunted around; we need to snap out of the collective trance that is this LLM-master-race-omg-my-computer-can-talk-nerdy-to-me.

There were also clear information display issues that stood out: 
- Showing the step's objective in the primary real-estate long after its completion; coming back to a step meant pushing through the recap everytime + varying height allocations had you searching for what mattered.
- Sub-steps sounding awefully similar to each other and their parent steps + summaries repeating or expanding on the title, adding much more friction to how you scan the list of steps on the left; reading it meant inviting yourself to the Quests' brain fog.
- Technical approach to executions + very 'FYI, guys calc is short for calculator, in case you're new to the stream' energy + Quest ops overexplained to an operator who just wants some grounding first - too much transparency?

The magic of Quests just wouldn't... magic, and so we set out to trim the fat.

---

## Tuning: Nomenclature

Internally, we **renamed the parent steps to Milestones**, and force the LLM to output only one level of nested 'steps'. This was done to increase the gravity on these parent steps, dress it up as the 'reporting centre' for the sub-goal that the Quest has identified for it.

**Milestones are questions.** A milestone names the open question the phase resolves — interrogative, because the phase exists to answer it. First-person-plural — "What apps do we target, and how?" not "Phase 2: Re-Engagement Hypothesis." No "Phase N" prefixes, no numbering.

**Executions are imperatives, and are usually sub-steps.** A sub-step names the action being taken — verb-led. "Define target channels," "Draft value-prop per app," "Create the prioritized opportunity set." Question at the milestone, verb at the step: this grammatical contrast reinforces the gravity that milestones have without relying just on indentation.

:::frame taupe-100 narrow
![Quest Statuses](/assets/sortment/quest-status.png "Statuses that reveal more.")
:::

**Live-state verb forms.** In-progress steps read as present-progressive actions — "Creating prioritized opportunity set…", "Crunching…", "Waiting for input"

---

## Tuning: Structure

**Nesting collapsed.** Milestone → step, and nothing below that. The old 2.1.1-under-2.1-under-Phase-2 depth is gone, and the steps that remain sit behind a "Show steps" toggle rather than arriving pre-indented. The plan now reads as milestone, and can be expected to present synthesized reports at each.

:::frame taupe-100 narrow
![Sequence of steps, halted while waiting for approval to proceed.](/assets/sortment/approval-breakpoint.png "Collapsed steps, and an inline approval sitting between two milestones.")

:::

**An inline approval breakpoint.** The Quest can stop between milestones and ask "Good to keep going?" — as a row in the plan. *I have notes* lets the operator correct the route before the proceeding. This is the Quest roping in its operator when the road ahead stops resembling the one that was agreed upon.

:::frame taupe-100 narrow
![A step waiting for input](/assets/sortment/step-waiting-for-input.png "A step waiting for input.")
:::

**Inputs as a pending-only carousel.** Pending inputs float to the top (loud), resolved ones sink into a collapsed strip (quiet).

:::frame taupe-100 narrow
![A completed milestone](/assets/sortment/step-completed.png "A completed milestone, with its objective and captured inputs.")
:::

**Findings restructured to bold-lead + bullets.** Outcome summaries went from flat paragraphs to a lead line with key phrases bolded (not the whole sentence) and findings carrying their "so-what."

**Objective demoted, outcome promoted.** The step's objective used to lead. Now, the live finding leads ("125K revoked merchants in play…"), and Objective sits at the bottom along with Your responses.

:::frame taupe-100
![Quest Plan](/assets/sortment/plan-vX.png "Dissolving borders, constraining widths, stricter language rules, and a well-formatted forward-looking information pane.")

{{point 1 15.5}} **New statuses** that reveal something more current.

{{point 6.5 36.5}} **Scannable outputs.** Access detailed reports without needing to navigate.

{{point 6 56}} **Collapsable steps.** Milestones first.

{{point 98 37}} **What's going on right now?** Outcome-first + Expose current sub-agent title.

{{point 97 53}} **Synthesis** as of this moment - a living report.

:::

---

## Problem 2 · The very low bar on accepting a user's request to launch a Quest

### Observed LLM behaviour

Watching Quests wander around too much or getting its head stuck in very specific rabbitholes, meant that we were drifting too much and losing the plot –  a plot that was never clear to begin with.

Generic product-side guardrails weren't going to be enough, because the goal is to cater to personalised interests and to hold users accountable for lazy querying — the kind I'm sure we've all started noticing in people who lean on LLM outputs to get anything done.

Conversation design intervention was required here.

### Solution · Raise the bar, of course

When requesting Quests, tighten acceptance criteria by:
- trying to some analysis directly in chat without offloading the same mundane task to a Milestone
- negotiating what kind of outputs one should expect instead of leaving things very open ended, 
- conducting a preliminary study on existing analyses or entities that are already present in the workspace that feed this new Quests' directives, 
- drawing a scaffolding of a plan that is verified before having to wait to see the actual payload get rendered on the UI.

