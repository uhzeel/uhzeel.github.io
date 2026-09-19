---
title: "*sortment Quests · The secretive colleague..."
year: 2026
month: 8
description: ...posing as an open book.
tags: [nomenclature, simplify, agents]
featured: false
---

>Jazeel is typing, but invites you to peruse drafts.

## Context

We set out to create a surface where Sortment's Assistant could be expected to self-direct an elaborate sequence of long-running tasks, oriented by a goal given to it.

### The Naming Ritual

We built the first version as 'Projects'. You'd submit a prompt worthy of what you thought was a 'Project' and hope for the best.

It needed a name that stood out and could be marketed as a standout feature. 

After some deliberation, we settled on 'Quests'. The analogy that came with it had us picturing adventurers going out, getting distracted, splitting up work, and setting off on their own sidequests – all of which are attributes that our hallucinating LLMs are capable of. It also carried the idea of creating a plan up front, scouting the terrain, and putting themselves out there. Plans fail and things get sidetracked, but there is always something to learn.

---

## Problem 1 · A way to check-in from HQ

Hand an LLM a long-running task and the first thing that comes up is transparency — how much of what it's doing does ==the human operator=={{Controversial, and worth talking about: how shared should accountability be? Does it depend on the context? Is this something agreed upon with model providers, or with the service provider who 'owns' the harness? Or the person championing the use of such hazy tools? Maybe the rules from pre-LLM software still carry over — these are tools, and it's your ability as an operator that determines what goes in and comes out, and what breaks and devastates someone. Read ["at your service"](/projects/at-your-service/) to get thinking about these displacements of expectations.}} get to see, and when?

### Teach an LLM to fish in the Mariana Trench... and it shall forget to purchase a boat

Scrapping a vibe-coded kanban interface, forcing a linear flow of tasks felt like a good way to anchor 'progress'.

This also allowed Quest to reveal what was next in mind, along with restrospectively cancelled plans. And most importantly, this gave operators a way to see its current location in the form of a 'running' step - situational awareness, as they say in the good ol' double-diamond days.

:::frame taupe-100
![Quest Plan](/assets/sortment/plan-v1.png "The first version of the Quest Plan: broken into steps, and nested substeps - each with its own status and textual slop.")
:::

**We unleashed this as an experiment** – to observe how content would sit, how/if users would tweak the language, expectations on how it should structure itself, and also what configurations the LLM would settle on for these roadmaps.

It was this eager, finish-line-hungry machine that wanted to wrap things up fast and fire up whatever tools it had in its arsenal with no regard for magnitude of scope.

The depth of nesting seemed to feed only our desires to see faux intelligence being flaunted around; we need to snap out of the collective trance that is this LLM-master-race-omg-my-computer-can-talk-nerdy-to-me.

There were also clear information display issues that stood out: 
- Showing the step's objective in the primary real-estate long after its completion; coming back to a step meant pushing through the recap everytime + varying height allocations had you searching for what mattered.
- Sub-steps sounding awefully similar to each other and their parent steps + summaries repeating or expanding on the title, adding much more friction to how you scan the list of steps on the left; reading it meant inviting yourself to the Quests' brain fog.
- Technical approach to executions + very 'FYI, guys calc is short for calculator, in case you're new to the stream' energy + Quest ops overexplained to an operator who just wants some grounding first - too much transparency?

The 'magic' of Quests just wouldn't magic, and we set out to trim the fat.

---

## The Tuning

### Nomenclature

Internally, we **renamed the parent steps to Milestones**, and force the LLM to output only one level of nested 'steps'. This was done to increase the gravity on these parent steps, dress it up as the 'reporting centre' for the sub-goal that the Quest has identified for it.

**Milestones are questions.** A milestone names the open question the phase resolves — interrogative, because the phase exists to answer it. "What apps do we target, and how?" not "Phase 2: Re-Engagement Hypothesis." No "Phase N" prefixes, no numbering.

**Milestones speak as the team ("we").** First-person-plural — "what we target," "what we'll plan against." The milestone is the human spine of the plan; it reads like a question a PM would write on a whiteboard, not the agent reporting.

**Executions are imperatives, and are usually sub-steps.** A sub-step names the action being taken — verb-led. "Define target channels," "Draft value-prop per app," "Create the prioritized opportunity set." Question at the milestone, verb at the step: that grammatical contrast reinforces the gravity that milestones have without relying just on indentation.

**Live-state verb forms.** In-progress steps read as present-progressive actions — "Creating prioritized opportunity set…", "Crunching…", "Waiting for input"

:::frame taupe-100
![Quest Plan](/assets/sortment/plan-vX.png "Dissolving borders, constraining widths, stricter language rules, and a well-formatted forward-looking information pane.")

{{point 12 55}} **Collapsable steps.** Milestones first.

{{point 90 40}} **What's going on right now?** Outcome-first + Expose current sub-agent title.

{{point 70 55}} **Synthesis** as of this moment - a living report.


:::

### Structure

:::frame taupe-100 narrow
![A step waiting for input](/assets/sortment/step-waiting-for-input.png "A step waiting for input.")
:::

**Inputs as a pending-only carousel.** Pending inputs float to the top (loud), resolved ones sink into a collapsed strip (quiet).

:::frame taupe-100 narrow
![A completed milestone](/assets/sortment/step-completed.png "A completed milestone.")
:::

**Findings restructured to bold-lead + bullets.** Outcome summaries went from flat paragraphs to a lead line with key phrases bolded (not the whole sentence) and findings carrying their "so-what."

**Objective demoted, outcome promoted.** The step's objective used to lead. Now, the live finding leads ("125K revoked merchants in play…"), and Objective sits at the bottom along with Your responses.

:::frame taupe-100 narrow
![Sequence of steps, halted while waiting for approval to proceed.](/assets/sortment/approval-breakpoint.png "Collapsed steps, and an inline approval sitting between two milestones.")
:::

**Nesting collapsed.** Milestone → step, and nothing below that. The old 2.1.1-under-2.1-under-Phase-2 depth is gone, and the steps that remain sit behind a "Show steps" toggle rather than arriving pre-indented. The plan now reads as milestone, and can be expected to present synthesized reports at each.

**An inline approval breakpoint.** The Quest can stop between milestones and ask "Good to keep going?" — as a row in the plan. *I have notes* lets the operator correct the route before the proceeding. This is the Quest roping in its operator when the road ahead stops resembling the one that was agreed upon.

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

---
---
---

