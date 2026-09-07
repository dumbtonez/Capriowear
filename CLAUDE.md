# Capriowear

Marketing website for **Capriowear**, the activewear and teamwear division of Caprio Sports, a Sialkot, Pakistan manufacturer. Premium, editorial, performance feel. B2B audience: brands, teamwear suppliers, sourcing agents.

This file is read at the start of every session, so it stays short. It is the rules and the index. The detail lives in `/docs`.

---

## Knowledge base

Read the file the task needs. Do not guess at anything these files already answer.

| File | What it holds | Read it when |
|---|---|---|
| [docs/01-ways-of-working.md](docs/01-ways-of-working.md) | How Claude and the owner work together: plan-first, recommendations, model and effort policy | Start of any task |
| [docs/02-design-system.md](docs/02-design-system.md) | Tokens, type scale, spacing, breakpoints, and how the style library works | Any styling or layout work |
| [docs/03-component-library.md](docs/03-component-library.md) | Every component: variants, props, where it is used, status | Any component work |
| [docs/04-product.md](docs/04-product.md) | The business, audience, offer, page inventory, copy rules, open questions | Any copy or content work |
| [docs/05-plan.md](docs/05-plan.md) | Phase plan, status log, decision log | Start of any task, and again when finishing one |
| [docs/06-seo.md](docs/06-seo.md) | SEO/AEO reference: site config, schema builders, per-page checklist | Any new page, or any change to metadata/structured data |

Raw source material (final copy, wireframes) is in `docs/source/`. The wireframes are the layout source of truth; the copy file is the copy source of truth.

---

## The rules, in brief

The full versions are in [docs/01-ways-of-working.md](docs/01-ways-of-working.md). These are non-negotiable:

1. **Plan before code.** Every new task starts in plan mode. Present the plan, get approval, then build.
2. **Default to the recommendation and act on it.** Ask, using AskUserQuestion, only when there is no confident recommendation, the decision is hard to undo, or the consequence is one the owner is likely to want a say in. Otherwise: decide, do the work, and explain the choice afterward. The owner redirects if they want something different.
3. **Component changes follow a rule, not a standing question:** a variant of the same idea updates the existing component; a genuinely different thing gets a new one. Claude only asks when that rule does not clearly resolve, and always says what else a change affects.
4. **Styling only through tokens and recipes.** No raw hex or px in a component, ever. Appearance lives in `components/ui/styles.ts`; tokens live in the `@theme` block of `app/globals.css`. If a design needs a value that does not exist, stop and ask before inventing a token. **Typography is the one deliberate exception:** the type scale is copied from Figma exactly (sizes, weights, letter-spacing), by explicit owner request. Colour, spacing and radius are not — Figma's values there still differ from ours and stay that way unless asked. See [docs/02-design-system.md](docs/02-design-system.md).
5. **Build once, reuse everywhere.** Compose sections from existing components. No one-off markup.
6. **Docs update as part of the task, not after it.** A task is not done until the component registry, the plan log and any affected doc reflect what changed. Do this without being asked.
7. **Recommend a model and effort level** at the start of every task, and prefer the cheapest one that will do the job well.

---

## SEO and AEO

Non-negotiable on every page from here on, homepage included. Full detail and the exact file locations in [docs/06-seo.md](docs/06-seo.md).

1. **Structured data (JSON-LD) is generated from the same content that renders the visible page, never hand-written a second time.** Organization + WebSite site-wide; BreadcrumbList on every page; FAQPage on any page that actually renders an FAQ; Product/ItemList/CollectionPage on listing pages. Builders live in `lib/schema.ts`, rendered via `components/JsonLd.tsx`.
2. **Every page gets its own metadata** via the Next Metadata API: unique title ("Custom [Product] Manufacturer" keyword form), description, canonical URL, OpenGraph and Twitter tags. Site-wide default OG image and favicon; a page-specific OG image only where it earns its keep.
3. **Exactly one `<h1>` per page**, logical H2 → H3 order, semantic landmarks (`header`/`nav`/`main`/`section`/`footer`), descriptive keyword-aware alt text on every real image (never "image1").
4. **FAQ answers are answer-first and self-contained** — quotable as a single Q&A by an AI tool, with no need to read the rest of the page.
5. **Crawlability**: `app/sitemap.ts` and `app/robots.ts` stay current with every real route added; clean URLs; fast, mobile-first, Core Web Vitals in mind (the existing Playwright viewport suite already covers this).
6. **Link related pages inside body copy**, not just the nav — once a page has real body copy to link from.

Canonical/OG/sitemap URLs use `content/site.ts`'s `SITE_URL`, not this app's own internal routing root — this app is mounted at `/capriowear` on `www.capriosports.com`, not served at `/`.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · `next/font` (Figtree) · lucide-react · Playwright for screenshot QA · deploys to Vercel.

No CMS. Content lives in typed files in `/content`, so a page is content plus components and other pages reuse the same components with different data.

## Where things live

```
app/globals.css          design tokens (@theme) + the few things utilities cannot express
app/styleguide/          every component rendered in isolation, for QA
components/ui/styles.ts  THE STYLE LIBRARY: every class string that describes appearance
components/ui/cx.ts      class-name joiner
components/*.tsx         components: structure, behaviour, accessibility. No appearance decisions
content/*.ts             all copy, typed
content/site.ts          SEO/AEO config: SITE_URL, organization identity, default metadata
lib/schema.ts            schema.org JSON-LD builders, fed by content -- never hand-typed elsewhere
docs/                    the knowledge base above
tests/screenshots.spec.ts  screenshot + overflow QA across all target viewports
```

## Definition of done, per piece of work

1. Matches the wireframe at every target viewport in [docs/02-design-system.md](docs/02-design-system.md).
2. Uses only tokens and recipes, no raw values.
3. No horizontal scroll, no overflow, no layout shift.
4. Reuses existing components rather than repeating markup.
5. `npm run build`, `npx tsc --noEmit` and `npx eslint .` all clean.
6. `npx playwright test tests/screenshots.spec.ts` passes at all viewports.
7. The knowledge base has been updated to match.

## Git workflow
- Commit your work at the end of every task, without being asked. A task is not complete until its changes are committed.
- Before committing, run `git status --short` and make sure only intended files are staged.
- Write a clear, specific commit message describing what changed (e.g. "Add fight-wear teamwear category: PLP + 2 draft PDPs").
- After committing, show `git log --oneline -3` so I can confirm it landed.
- Never run `git clean`, `git reset --hard`, or `git checkout -- .` on uncommitted work without asking first — these destroy uncommitted changes.
- If we're on the `main` branch and about to start a sizable piece of work, offer to create a branch first.

## Multi-machine sync
- This project is worked on from more than one computer. GitHub (origin/main) is the single source of truth; the machines sync only through it.
- At the START of every session, run `git pull origin main` before making any changes, so this machine has the latest.
- At the END of every session — and always before I switch to another computer — make sure everything is committed, confirm `npm run build` passes, then run `git push origin main`. Never leave a session with unpushed commits.
- If `git pull` reports a conflict, stop and tell me. Do not force-push or discard anything.

## Deployment (Vercel)
- This project deploys to Vercel. Vercel runs `next build` on every deploy, and type errors block production builds (unlike `npm run dev`, which ignores them).
- Before pushing, always run `npm run build` locally and confirm it passes. Never push a commit that fails `npm run build` — it will produce a failed Vercel deploy.
- Pushing to `main` triggers a production deploy. Pushing any other branch creates a Vercel preview deploy (a separate test URL that does not affect the live site).
- Canonical URLs, sitemap.xml, and Open Graph URLs must use the real production domain, not localhost. Confirm the site base URL comes from an environment variable (e.g. NEXT_PUBLIC_SITE_URL) set in Vercel, not a hardcoded value.
- Do not change vercel config, basePath, or environment handling without flagging it to me first — those affect the live deployment.

## Multi-machine sync
- This project is worked on from more than one computer. GitHub (origin/main) is the single source of truth; the machines sync only through it.
- At the START of every session, run `git pull origin main` before making any changes, so this machine has the latest.
- At the END of every session — and always before I switch to another computer — make sure everything is committed, confirm `npm run build` passes, then run `git push origin main`. Never leave a session with unpushed commits.
- If `git pull` reports a conflict, stop and tell me. Do not force-push or discard anything.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
