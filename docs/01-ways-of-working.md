# 01 · Ways of working

How Claude and the project owner work together. Claude follows these without being reminded, and updates this file when the way we work changes.

**Context that shapes all of it:** the owner is not a developer. Every choice put to them has to be explained in terms of consequences, not implementation. Every question has to come with a recommendation.

---

## 1. Plan before code

Every new task starts in plan mode.

1. Claude reads [05-plan.md](05-plan.md) to see where the project stopped.
2. Claude explores whatever the task touches, and asks any questions it needs answered.
3. Claude presents a plan and waits for approval.
4. Only then does it write code.
5. When the work is done, Claude writes the outcome into [05-plan.md](05-plan.md).

Exceptions, where Claude just does the thing: typo fixes, copy changes, a one-line correction, or a question that only needs an answer.

## 2. Default to the recommendation, ask only when genuinely stuck

**Updated 2026-08-22, by the owner:** Claude no longer stops to ask by default. When it has a clear recommendation, it takes it, does the work, and reports what it did and why — the owner redirects afterward if they want something different.

Claude still asks, using AskUserQuestion, when any of these are true:

- **No confident recommendation exists** — the trade-offs are genuinely close, or Claude is missing information only the owner has (a business fact, a preference, an asset that does not exist yet).
- **The decision is irreversible or expensive to undo** — e.g. it reshapes the design system, deletes something, or would need redoing a lot of work if wrong.
- **The consequence is surprising** — a recommendation that quietly changes something else the owner is likely to notice or care about (a required viewport starts behaving differently, a page most buyers see changes shape). Surface it plainly, act on the recommendation, and flag what changed — asking first is reserved for cases in the two bullets above, not for every surprising-but-clearly-correct call.

When Claude does act without asking, it still explains the decision in plain English afterward: what it did, the trade-off, and why it was the obvious call. This is the same explanation a question would have carried, just delivered as a report instead of a gate.

When Claude does ask, the same standard as before applies:

- The recommended option comes **first** and is marked **(Recommended)**.
- The trade-off is in plain English: what it means for cost, speed, flexibility, or future work.
- No unexplained jargon. "This means restyling every button becomes one edit instead of thirteen" beats "this centralises the variant recipes".

## 3. Component changes: decide by the rule, ask only when it does not resolve cleanly

Before changing any existing component, Claude applies this rule itself rather than asking by default: if the change is a *variant* of the same idea, update the existing component and add a variant; if it is a genuinely different thing that happens to look similar, make a new component. Duplicating a component to avoid the decision is never the outcome.

Claude asks only when the rule does not clearly resolve — e.g. a change that could reasonably go either way, or one that would affect many places the component is already used in ways the owner may not expect. When it does ask, it states what else the change would affect ("Button is used in 6 places, including the header CTA and the hero") alongside the recommendation.

When Claude decides on its own, it says so and names what was affected, the same way it would have framed the question.

## 4. Styling only through tokens and recipes

Three layers, described fully in [02-design-system.md](02-design-system.md):

1. **Tokens** — the `@theme` block in `app/globals.css`. Raw values.
2. **Recipes** — `components/ui/styles.ts`. Named looks built from tokens.
3. **Components** — structure, behaviour, accessibility. No appearance decisions.

No raw hex or pixel value ever goes into a component. If a design calls for a value the tokens do not have, Claude stops and asks before inventing one. This applies to values read out of Figma too: map onto existing tokens, never create silently.

## 5. Build once, reuse everywhere

Page sections are composed from components in the registry. If a section needs something that does not exist yet, that is a component to build (see rule 3), not markup to write inline. Every component is rendered in `/styleguide` so it can be checked in isolation.

## 6. Docs update as part of the task

A task is not finished until:

- [03-component-library.md](03-component-library.md) reflects any component added or changed.
- [05-plan.md](05-plan.md) has an entry for what was done and what is still open.
- Any other affected doc is updated.

Claude does this as part of the work, without being asked. If a rule in this file turns out to be wrong or missing, Claude updates this file too and says so.

## 7. Model and effort policy

Claude recommends a model and effort level at the start of each task, and prefers the cheapest option that will do the job well. The owner can always override.

| Kind of task | Model | Effort |
|---|---|---|
| Copy edits, doc updates, renames, small config changes | Haiku 4.5 | low |
| One component built or tweaked, a bug fix, a single-file change | Sonnet 5 | medium |
| A page section composed from components that already exist | Sonnet 5 | high |
| Design system changes, architecture, refactors across many files, anything where a wrong call is expensive to undo | Opus 5 | high |

Habits that actually save tokens, and that Claude applies by default:

- Reuse the Playwright screenshot loop instead of checking viewports by hand.
- Keep `CLAUDE.md` short, since it is loaded every single session.
- Batch verification into one run at the end rather than after every file.
- Never re-read a file just written; never re-derive something already established in the conversation.
- Use `/fast` when iterating on Opus and speed matters more than depth.
- Do not spawn subagents unless the owner asks for one. Each starts cold and re-reads context that is already here.

## 8. Skills

Claude adopts a skill when a task calls for it, and says which and why. Relevant to this project:

| Skill | Use it for |
|---|---|
| `design:accessibility-review` | A WCAG audit before launch, and after the homepage is complete |
| `code-review` | Any large batch of new code, before it is considered done |
| `design:ux-copy` | Reviewing microcopy, button labels, empty and error states |
| `artifact-design` | If the owner wants a doc published as a shareable web page |

## 9. Verification is shown, not claimed

If Claude says something works, it ran it. Screenshot diffs, test output and build results get reported honestly, including failures. "It should work" is not a status.

## 10. Multiple sessions, multiple dev servers

**Added 2026-09-07, after a real mix-up:** several Claude sessions can run at once, often each in its own git worktree. Each can start its own `next dev` server. `localhost:3000` is only ever "the" preview by coincidence — if two servers are alive, whichever claimed port 3000 first wins it, and everyone else is silently looking at a different server (possibly a different worktree, a different commit, even uncommitted work from another session).

`.claude/launch.json`'s dev config has `autoPort: true`, so each session's own server picks a free port automatically instead of colliding on 3000. Because of this:

- Claude always states the exact `localhost:PORT` URL it verified a change on — never assumes or implies port 3000.
- The owner checks whatever URL Claude just gave, not habit/muscle-memory `:3000`, especially when more than one Claude session is active.
- If something "isn't showing up" after a fix, the first thing to check is whether the browser is pointed at the same port the fix was verified on.
