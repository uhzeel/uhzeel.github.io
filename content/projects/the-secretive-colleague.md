---
title: "Sortment Quests · The secretive colleague..."
year: 2026
month: 8
description: ...posing as an open book.
tags: [nomenclature, simplify, agents]
featured: false
---
## Context

We set out to create a surface where Sortment's Assistant could be expected to self-direct an elaborate sequence of long-running tasks, oriented by a goal given to it.

### The Naming Ritual

We built the first version as 'Projects'. You'd submit a prompt worthy of what you thought was a 'Project' and hope for the best.

It needed a name that stood out and could be marketed as a standout feature. 

After some deliberation, we settled on 'Quests'. The analogy that came with it had us picturing adventurers going out, getting distracted, splitting up work, and setting off on their own sidequests – all of which are attributes that our hallucinating LLMs are capable of. It also carried the idea of creating a plan up front, scouting the terrain, and putting themselves out there. Plans fail and things get sidetracked, but there is always something to learn.

## Problem 1 · A way to check-in from HQ

### Observations

To be transparent with users, the quest-givers, we designed a checklist of sorts to show progress. It also revealed what the Quest had in mind as next steps, along with steps that it chose to cancel based on what it found. Using this framework, we could also show where the Quest is currently at.

:::frame stone-100
![Quest Plan](/assets/sortment/plan-v1.png "The first version of the Quest Plan: broken into steps, and nested substeps - each with a status.")
:::

**We unleashed this as an experiment** – to observe how content would sit, how users would tweak the language, the ways they would ask it to structure itself, and also what configuration the LLM would find works for it in creating Quests' roadmaps.

It became this eager, finish-line-hungry machine that wanted to wrap things up fast and fire up whatever tools it had in its arsenal with no regard for magnitude of scope.

The depth of nesting seemed to feed only our desires to see faux intelligence being flaunted around; we need to snap out of the collective trance that is the LLM-master-race.

There were clear redundancies that could be trimmed: 
- Showing the step's objective as a primary long after its completion
- Sub-steps sounding awefully to each other and its parent step
- Summaries repeating or expanding on the title, adding much more friction to how you scan the list of steps on the left.

>Jazeel is typing... Frantically!

fast-forward to now.

>snippets of UI, some logic diagrams?

## The Tuning (or, the Solutions)

### Nomenclature

Internally, we **renamed the parent steps to Milestones**, and force the LLM to output only one level of nested 'steps'. This was done to create a higher gravity on these parent steps, as the 'reporting centre' for the sub-goal that the Quest has identified for itself.

**Milestones are questions.** A milestone names the open question the phase resolves — interrogative, because the phase exists to answer it. "What apps do we target, and how?" not "Phase 2: Re-Engagement Hypothesis." No "Phase N" prefixes, no numbering.

**Milestones speak as the team ("we").** First-person-plural — "what we target," "what we'll plan against." The milestone is the human spine of the plan; it reads like a question a PM would write on a whiteboard, not the agent reporting.

**Sub-steps are imperatives.** A sub-step names the action being taken — verb-led. "Define target channels," "Draft value-prop per app," "Create the prioritized opportunity set." Question at the milestone, verb at the step: that grammatical contrast reinforces the gravity that milestones have without relying just on indentation.

**The collapsed reasoning strip** houses answered responses. Dropped words like 'Clarifications' and 'Input needed' to rely just on 'Waiting for input' + 'Your responses'.

**Live-state verb forms.** In-progress steps read as present-progressive actions — "Creating prioritized opportunity set…", "Crunching…" — not "In Progress" parentheticals.

:::frame stone-100
![Quest Plan](/assets/sortment/plan-vX.png "Simplified.")


{{point 90 40}} **What's going on right now?** Outcome-first + Expose current sub-agent title.

{{point 12 55}} **Collapsable steps.** Milestones first.
:::

### Structure

**Objective demoted, outcome promoted.** The step's objective used to lead. Now, the live finding leads ("125K revoked merchants in play…"), and Objective sits at the bottom along with Your responses.

**Findings restructured to bold-lead + bullets.** Outcome summaries went from flat paragraphs to a lead line with key phrases bolded (not the whole sentence) and findings carrying their "so-what."

**Artifacts as shown attached.** While detailed findings get housed in reports/outputs ("Target Shortlist · Draft").

**Inputs as a pending-only carousel.** Pending inputs float to the top (loud), resolved ones sink into a collapsed strip (quiet).

**Nesting collapsed.** The old sub-sub-task depth (2.1.1 under 2.1 under Phase 2) flattened to a shallower step → sub-step hierarchy with "Show steps / Hide steps" toggles rather than permanent deep indentation.

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