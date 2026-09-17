# Capriowear Site Audit: Code Quality, SEO, AEO, GEO, Structured Data
**Date:** 2026-09-11
**Scope:** Full codebase (`/Users/mohsinkhan/capriowear-web`) + live deployment (`https://capriowear.vercel.app`)
**Status:** Audit only — nothing in this report has been fixed. This is the review artifact; fixes come next, in whatever order is chosen after review.

**Method note:** Live pages were fetched with `curl` (no JS execution) to confirm what a non-JS-executing AI crawler actually sees, cross-referenced against the source in this checkout. Where a finding involves in-progress work from a concurrent session (a `/teamwear` hub page was mid-build during this audit, uncommitted), it's called out explicitly rather than treated as this checkout's own gap.

**Known, already-tracked gap, not re-flagged below:** Product photography is placeholder/testing imagery sitewide. Not a finding.

---

## 1. Fact consistency audit

The single most important section: AI answer engines cross-reference facts across a site, and any inconsistency undermines trust in *all* of a site's claims, not just the inconsistent one.

### 🔴 CRITICAL — Certifications: three different, conflicting lists live simultaneously

This is the most serious finding in the whole audit. Three genuinely different certification/membership claims exist on the live site right now:

| Location | Exact claim |
|---|---|
| `content/services.ts:262` (Services FAQ) | "**ISO 9001, OEKO-TEX, BSCI, IMAC and SGS**" |
| `content/our-factory.ts:418` (Our Factory FAQ) | "**ISO 9001, OEKO-TEX, BSCI, IMAC and SGS**" |
| `content/download-catalog.ts:9` (comment, confirmed facts) | "ISO 9001/OEKO-TEX/BSCI/IMAC/SGS" |
| `content/home.ts:406-451` (visible logo grid, `certified.logos`) | ISO 9001, **ISO 45001, ISO 14001**, BSCI, IMAC, **WFSGI** — no OEKO-TEX, no SGS |
| `content/home.ts:603` (Homepage FAQ "What certifications do you hold?") | "We hold **ISO 9001, ISO 45001 and ISO 14001**, plus **CE** and **BSCI**... We are members of **PSGMEA, PRGMEA and WFSGI**..." — no OEKO-TEX, no SGS |

A visitor (or AI answer engine) reading the homepage gets a *materially different* certification and trade-membership story than one reading Services or Our Factory. OEKO-TEX and SGS — claimed as held certifications on three pages — go unmentioned on the homepage; ISO 45001/14001, CE, and three trade-association memberships appear *only* on the homepage and nowhere else on the site.

**Fix:** Get one confirmed, final list from Mohsin (this needs a real decision, not a guess) and make every occurrence above read identically — homepage logo grid, homepage FAQ, Services FAQ, Our Factory FAQ, Download Catalog comment, and the Organization schema (see Finding 5.1 below, which currently has *none* of this encoded at all).

### 🟡 LOW — Founding year: consistent now, but has drifted before

`content/site.ts:107`'s own comment documents that the site previously showed "Since 2000" / "25+ years" in places before a 2026-09-08 correction to 2009. Every live occurrence checked (`content/site.ts:114`, `content/home.ts:468`, footer copyright, and every page-doc's "confirmed facts" comment) now agrees on **2009**. No current inconsistency — flagging only because this fact has broken before and is worth a periodic re-check, not a one-time fix.

### 🟡 MEDIUM — Facility square footage: consistent now, but a past mobile/desktop mismatch is undocumented as resolved

Every live occurrence agrees on **75,000 sq ft** (`content/our-factory.ts:100,121,406`, `content/services.ts:234`, `content/home.ts:472,587`). However, `content/home.ts:464`'s own comment records a *prior* disagreement where mobile once showed "50,000 sq ft" against desktop's 75,000. The grep found no live "50,000" value, but this warrants a manual render check of the mobile Stats section specifically, since a stat that once forked by breakpoint is a specific, known failure mode for this codebase (confirmed elsewhere in this audit — see the reveal-mechanism history in `docs/05-plan.md`).

**Fix:** Manually render the homepage Stats section at a real mobile viewport and confirm it reads 75,000 sq ft, not a stale breakpoint-specific value.

### ⚪ Missing facts (not inconsistencies, but the audit brief expected them)

- **Workforce size**: not stated anywhere in the codebase. No conflict, just absent.
- **Number of machines**: not stated anywhere. Same.

These aren't bugs, but if either is a real, sourceable fact, adding it once (in a single content source, e.g. `content/our-factory.ts`) would strengthen the trust-signal density AI answer engines look for.

### 🟢 Consistent facts (no action needed)

The following were checked exhaustively (30+ content files, every activewear/teamwear category, every FAQ) and found **fully consistent** everywhere they appear:

- **MOQ**: "50 pieces" per style — uniform across every category file, PDP shared copy, and page-level content.
- **Sample lead time**: "10 to 14 days" — uniform across ~30 files with zero deviation.
- **Reply-time promise**: "24 hours" for sales inquiries — uniform, mostly centralized through `content/activewear/pdpShared.ts`'s `buildCtaSubline()` helper (a real single-source-of-truth pattern worth reusing elsewhere). The Privacy Policy's separate "respond within a reasonable time" language is a different promise for legal data requests, not a conflict.
- **Export countries**: "20+" (or "over 20") everywhere. One code *comment* in `components/ui/styles.ts:5653` illustrates a hypothetical "40+ countries" string as an example, not live copy — confirmed no live instance of that number.
- **Monthly production capacity**: "100,000+" — consistent across `content/our-factory.ts`, `content/services.ts`, `content/home.ts`.
- **AQL inspection level**: "AQL 2.5" — consistent across ~29 files.
- **GSP+ EU duty claim**: "GSP+ 0%" duty into the EU — consistent everywhere (minor wording variance — "EU duty" vs "duty into the EU" — but the substantive 0% figure never varies).

---

## 2. SEO audit

### 🔴 CRITICAL — Three pages ship a doubled `"| Capriowear | Capriowear"` title tag, live, right now

`app/layout.tsx`'s root metadata template (`title: { template: "%s | Capriowear" }`) automatically appends the brand suffix to every page's title string. Three pages' own `metaTitle` values *also* hardcode that same suffix, so the live `<title>` tag is doubled:

| Page | Content source | Live `<title>` (confirmed via curl) |
|---|---|---|
| `/our-factory` | `content/our-factory.ts:98` | `"Our Factory in Sialkot, Pakistan \| Capriowear \| Capriowear"` |
| `/privacy-policy` | `content/privacy-policy.ts` | `"Privacy Policy \| Capriowear \| Capriowear"` |
| `/download-catalog` | `content/download-catalog.ts` | `"Download the Catalog \| Capriowear Custom Manufacturing \| Capriowear"` (70 chars — also over budget, and the real brand mention likely truncates out of the SERP snippet) |

**Fix:**
1. In `content/our-factory.ts:98` and `content/privacy-policy.ts`, drop the trailing `" | Capriowear"` from `metaTitle`, matching every other page's pattern (a bare string, template supplies the suffix once).
2. In `content/download-catalog.ts`, reword to remove the mid-string "Capriowear" too (e.g. `"Download the Catalog | Custom Manufacturing Guide"`).
3. All three pages' `openGraph.title`/`twitter.title` currently pass the raw (now-doubled) string directly rather than through the title template (OG/Twitter tags aren't governed by Next's `title.template`) — after fixing the content strings, explicitly build these as `` `${metaTitle} | ${SITE_NAME}` ``, the same pattern `request-a-sample`/`services`/the activewear PLP template already use correctly.

### 🟠 HIGH — `/activewear` and `/teamwear` hub pages don't exist; nav links to them 404

`content/home.ts:128-129` has top-level nav entries `{ label: "Activewear", href: "/activewear" }` and `{ label: "Teamwear & Uniforms", href: "/teamwear" }`. Confirmed live: both return `404`. Only the dynamic children (`/activewear/<category>`, `/teamwear/<sport>`) resolve. See Section 7 for the full linking finding — a `/teamwear` hub was found built locally but **uncommitted**; no `/activewear` hub exists yet at all.

### Per-page results (everything else)

| Page | Title | Description | Canonical | OG/Twitter | H1 | URL |
|---|---|---|---|---|---|---|
| Homepage (`app/page.tsx`) | PASS (66 chars incl. brand, owner-approved exact copy) | PASS (147 chars, front-loaded) | PASS | PASS, but **no `twitter` block at all** (🟡 MEDIUM — every other page sets one; add for consistency, reusing the same OG title/description vars) | PASS, exactly 1 | PASS |
| `/services` | PASS | PASS (161 chars — 🟢 LOW, trim ~6 chars to fully clear 155) | PASS | PASS, shared vars, no drift | PASS | PASS |
| `/our-factory` | 🔴 see above | PASS | PASS | 🔴 see above | PASS | PASS |
| `/request-a-sample` | PASS | PASS (153 chars) | PASS | PASS, brand suffix built explicitly and correctly | PASS | PASS |
| `/download-catalog` | 🟠 see above | PASS | PASS | 🟠 see above | PASS | PASS |
| `/privacy-policy` | 🔴 see above | PASS (103 chars — a bit short, fine for a legal page) | PASS | 🔴 see above | PASS | PASS (correctly has no FAQ, correctly has no faqSchema call) |
| Activewear PLP template (17 instances) | PASS, unique per category (spot-checked leggings vs. sports-bras — genuinely different) | PASS, unique | PASS | PASS, shared vars | PASS ("Custom [Category] Manufacturer" form confirmed) | PASS |
| Activewear PDP template (published styles only) | PASS, unique (confirmed live: "Custom Compression Leggings Manufacturer") | PASS | PASS — confirmed live using the real production domain (`capriosports.com/capriowear/...`), not this app's internal root | PASS, image correctly omitted where no real photo exists | PASS | PASS, drafts correctly 404 (`dynamicParams = false`) rather than serving thin pages |
| Teamwear PLP/PDP templates | Same logic as activewear, confirmed via code + spot-check (cricket, basketball) | PASS | PASS | PASS | PASS | PASS |
| `/activewear/running-wear` (curated, non-registry) | PASS | PASS | PASS, own canonical | — | PASS | PASS, correctly hand-added to sitemap since outside the registry loop |

### 🟡 MEDIUM — No `basePath` configured in `next.config.ts`

Every canonical/OG/sitemap URL is a hand-built absolute string via `SITE_URL` (a correct workaround, and consistent with the documented plan that a reverse-proxy at the real `capriosports.com` layer handles the `/capriowear` mount at launch). Not a functional bug today, but worth a pre-launch confirmation that the reverse-proxy assumption is actually true and not just baked into content strings with nothing enforcing it.

### Indexing gate and sitemap — confirmed correct

- `noindex, nofollow` is present sitewide right now (confirmed via curl), `robots.txt` disallows `/` entirely, gated by `NEXT_PUBLIC_ALLOW_INDEXING` (unset = off). Correct, deliberate pre-launch state — see Section 4 for the launch-day risk this creates.
- `/sitemap.xml` confirmed live: every real route present (home, services, our-factory, request-a-sample, download-catalog, privacy-policy, running-wear, all checked category PLPs), draft PDPs correctly excluded.

---

## 3. AEO audit

### 🟢 FAQ schema / visible-content parity — clean across the entire site

Every page with a visible FAQ was checked (homepage, services, our-factory, request-a-sample, download-catalog, every activewear PLP/PDP, every teamwear PLP/PDP, running-wear) and every single one calls `faqSchema()` on the *exact same array* that feeds the visible `Faq`/`Accordion` component — no separately hand-typed schema list found anywhere, no drift. `/privacy-policy` correctly has no FAQ and correctly makes no `faqSchema()` call. This is a well-enforced pattern; no fix needed.

### 🟢 Entity-first answers — structurally consistent by design, no fix needed

`categoryEntityFaq()` (`content/activewear/pdpShared.ts:30-88`) is a single shared function called identically from every category PLP, every PDP, every teamwear sport PLP/PDP, and running-wear (via a type-shim, not a second hand-typed sentence). The sentence shape is byte-identical everywhere; only four override fields vary per category to correct real English singular/plural mismatches (e.g. "sports bra" vs "sports bras"). No category or sport is missing this entity answer, and no divergent wording shape was found.

### 🟢 LOW — Two FAQ answers open with a bare "Yes." before restating context

`content/activewear/pdpShared.ts:207-208` and `:211-212` (the shared PDP operational FAQ, "Do you ship worldwide, and who handles duties?" and "Will you sign an NDA before I share my designs?") both start their answer with "Yes." before the real content. Both do go on to restate full context in the same sentence, so the complete `a` string is still quotable standalone — this is cosmetic polish, not a functional AEO break.

**Fix:** Reword to drop the leading "Yes.", e.g. "We ship DDP to over 20 countries, meaning duties and import taxes are included in your landed cost quote..."

---

## 4. GEO audit

### 🔴 CRITICAL (process risk, not a code bug) — Remember to flip `NEXT_PUBLIC_ALLOW_INDEXING=true` at launch

Confirmed via live curl: `robots.txt` currently disallows `/` entirely, and every page carries `<meta name="robots" content="noindex, nofollow">`. This is correct, deliberate, pre-launch behavior, gated by one env var (`content/site.ts:37`). The risk isn't the code — it's that every fix in this report ships invisibly to every crawler until someone remembers to flip this in Vercel at real launch.

**Fix:** Add a launch-day checklist item in `docs/05-plan.md` (or wherever the launch punchlist lives) to flip `NEXT_PUBLIC_ALLOW_INDEXING=true`. Consider a pre-deploy check that fails a "launched" build if this var is still unset.

### 🟢 HIGH (positive finding) — Server-rendering confirmed fully correct for non-JS crawlers

Raw `curl` output (no JS execution) on the homepage, `/services`, and `/request-a-sample` all contain the complete visible text and full JSON-LD blocks — confirmed by grepping the raw HTML for the actual rendered H1 text and counting `<script type="application/ld+json">` blocks (6 on the homepage: BreadcrumbList, FAQPage, sitewide nav ItemList, Activewear categories ItemList, Teamwear categories ItemList, Organization). The live Vercel deployment is publicly reachable with no preview-protection wall in the way. **This means once indexing is turned on, crawlers — including non-JS AI crawlers — will see complete, correct content immediately.** No SSR/hydration gap exists.

### 🟡 MEDIUM — `robots.txt`'s "on" state uses one wildcard rule; no AI-crawler-specific blocking exists (confirmed, not just assumed)

Reading `app/robots.ts`'s indexing-on branch: a single `{ userAgent: "*", allow: "/", disallow: "/styleguide" }` rule, no per-crawler rules. Confirmed via grep: GPTBot, ClaudeBot, PerplexityBot, Google-Extended, anthropic-ai, and CCBot are named nowhere in the codebase. **No incidental blocking risk exists today** — this is good news, not a problem, but flagged because the audit specifically asked to confirm rather than assume it. If the owner later wants to selectively allow/block a specific AI crawler, the current single-rule structure would need per-user-agent rule objects added at that time — not needed now.

### 🟢 LOW (recommendation, no action needed yet) — No `llms.txt` exists

Checked `public/` and `app/` for any `llms.txt` route or static file — none exists. Recommended as a future task once content is finalized and indexing is on: a `public/llms.txt` (static) or `app/llms.txt/route.ts` (generated from the same `content/site.ts`/registries other SEO surfaces already use) summarizing the site's purpose and key pages for AI crawlers that look for this emerging convention.

---

## 5. Structured data audit

### 🟠 HIGH — Certifications are claimed sitewide but encoded nowhere in Organization schema

`organizationSchema()` (`lib/schema.ts:17-36`) has no `hasCredential`, `award`, or any other property representing any certification — not even a single agreed-upon one. The site's own most-repeated trust claim (certifications) is invisible to any structured-data parser reading only the JSON-LD. This compounds Finding 1.1 (the certifications don't even agree with each other yet) — fixing both together makes sense: settle the one true list, then encode it via `Organization.hasCredential` (`EducationalOccupationalCredential`), the standard schema.org property for exactly this.

### 🟡 MEDIUM — `Organization.address` is a partial `PostalAddress` (locality + country only)

`content/site.ts:117-120` provides only `addressLocality: "Sialkot"` and `addressCountry: "PK"` — no `streetAddress` or postal code. Valid schema.org, but thin. If a full postal address is available, adding it strengthens NAP (name/address/phone) consistency signals for local search and AI answer engines.

### 🟢 Structured data validity — clean

All JSON-LD extracted from live pages parses as syntactically valid JSON (no trailing commas, balanced brackets) — confirmed on the homepage's Organization block and others.

### 🟢 BreadcrumbList — matches visible trail everywhere checked, no hand-typed duplicates found

Confirmed e.g. `app/teamwear/[sport]/page.tsx:100-104` feeds the exact same label/URL pairs to both the visible breadcrumb and the schema.

### 🟢 Organization schema — correctly sitewide once, not duplicated per-page

Rendered once at the layout level; confirmed no second Organization block appears when checking `/services` or `/request-a-sample`'s own JSON-LD output.

### 🟡 MEDIUM — Product schema *does* exist (deliberately) — flagging for an explicit sign-off, not a bug

The audit brief's starting assumption was "no Product/Offer schema exists, by design." In fact, `productSchema()` (`lib/schema.ts:182`) is used on both PDP types, and `collectionPageSchema()` nests lightweight `Product` entries inside each PLP's `ItemList`. This looks like a deliberate, well-considered choice, not an oversight — the code's own comment explicitly states no `Offer`/price field is included, since this is a made-to-order B2B product with no public price, and confirms no `Offer`/`AggregateOffer`/price field exists anywhere in the schema code. A `Product` without an `Offer` is valid schema.org, just ineligible for price-carrying rich results. **Recommendation:** since this contradicts the audit's original premise, get an explicit sign-off from Mohsin that this is intentional (it appears correct and considered) rather than silently leaving the premise unresolved.

### 🟢 CollectionPage/ItemList correctly omitted for unpublished PLPs — best-practice implementation found

Both the activewear and teamwear PLP templates gate the entire `CollectionPage`/`ItemList` JSON-LD block behind "at least one published style exists," with an explicit code comment recording a real incident this protected against (Cricket's styles being reverted to draft after this was built). The visible product grid still shows draft cards as "Coming soon," so schema and visible content are correctly decoupled — schema never describes a product that doesn't actually exist. No fix needed.

---

## 6. Code quality and architecture

### 🟠 HIGH — Broken link discovered as a side effect: see Section 7 (soft-404), not repeated here.

### 🟡 MEDIUM — `npx eslint .` crashes with a stack overflow when run from the project root

Root cause: `.claude/worktrees/` contains multiple full nested copies of this repo (other concurrent sessions' worktrees), and ESLint's flat-config file walking recurses into them pathologically, overflowing the call stack. Confirmed workaround: `npx eslint app components content lib` (scoped, excluding `.claude/`) runs clean with zero errors or warnings.

**Fix:** Add `.claude/**` to the ESLint flat config's `ignores` array. This matters because "run `npx eslint .`" is literally step 5 of `CLAUDE.md`'s own Definition of Done, and it currently cannot be run as written from the repo root.

### 🟡 MEDIUM — In-progress uncommitted work: a Teamwear hub page exists locally but isn't deployed

`app/teamwear/page.tsx` and `components/sections/SportGrid.tsx` exist in this checkout (confirmed `npm run build` now produces a real `○ /teamwear` static route) but are untracked in git and not on the live deployment (`curl` confirms live 404). This directly explains half of the Section 2/7 broken-nav-link finding. No equivalent `/activewear` hub exists yet, even locally.

**Fix:** Decide whether to finish/commit this WIP as part of resolving the nav 404s, or confirm it's intentionally being built in a separate session and just needs to land.

### 🟡 MEDIUM — One genuinely dead file: `components/sections/ProductCategoryLinks.tsx`

Grepped across `app`, `content`, and `components` — no `page.tsx` or other component imports it anywhere. Its own header comment says "(PDP)," suggesting it was meant for the PDP template's sibling-category links but was never wired in.

**Fix:** Either wire it into the PDP template where it was intended, or delete it along with its corresponding recipe block in `components/ui/styles.ts` (`/* --- ProductCategoryLinks (PDP) --- */`).

### 🟢 Metadata sourced correctly from visible content everywhere checked

Spot-checked `/services`, `/our-factory`, and the activewear PLP template — all read title/description straight from the same content object that renders the visible copy, no second hand-typed string found anywhere.

### 🟢 PLP template consistency — no drift between activewear and teamwear

Both families share an identical composition pattern (breadcrumb schema → conditional CollectionPage schema → meta strip → filters + grid). No inconsistency found.

### 🟢 `RevealMain.tsx` — confirmed fully and correctly deleted

No file exists at that path outside unrelated worktree copies. The two remaining references are historical comments explicitly noting "(deleted)" — accurate documentation, not stale dead references.

### 🟢 `npx tsc --noEmit` and `npm run build` — both clean

(After clearing a stale `.next` Turbopack cache that briefly produced a phantom type error unrelated to any file actually on disk — a known, previously-documented failure mode for this project; not a real bug, just worth remembering "if a build error doesn't match what's in the file, `rm -rf .next` first.")

### 🟢 `app/sitemap.ts` — correctly filters unpublished routes

Both PDP loops filter on `status === "published"` before mapping to sitemap entries, with an explicit comment recording the reasoning. No draft route found in the sitemap.

---

## 7. Internal linking and site structure

### 🔴 CRITICAL — Soft-404: `/teamwear/basketball-uniforms` returns HTTP 200 with a "not found" body

`content/home.ts:381` (homepage "What We Make" tiles) links to `/teamwear/basketball-uniforms`, but the real registered slug (`content/teamwear/sports.ts:21`) is `basketball` (`/teamwear/basketball`, confirmed live and correct). The wrong URL doesn't 404 cleanly — it returns **`HTTP/1.1 200 OK`** with a "This page could not be found" body. This is worse for SEO/AEO than a real 404: crawlers may treat a 200 response as legitimate, indexable content. A genuinely nonexistent path was confirmed to correctly return a real 404, so this specific URL's behavior is anomalous — possibly a stale cache entry from before the slug was renamed.

**Fix:** Change `content/home.ts:381` to `href: "/teamwear/basketball"`. Separately, investigate why that exact stale path serves 200 — may need a targeted Vercel cache purge once the link itself is fixed.

### 🟠 HIGH — Nav links to `/activewear` and `/teamwear` hub pages, neither is live

Covered fully in Section 2. Repeating here because it's fundamentally a linking-structure issue: these are real, clickable top-level nav labels (not just mega-menu hover targets), so every visitor or crawler clicking either one lands on a 404 today.

**Fix:** Ship the (already-built-but-uncommitted) `/teamwear` hub, and build the missing `/activewear` hub before launch — or, as a cheaper interim fix, point the top-level nav `href` at the first real child page until the hub exists, so the label isn't a dead click in the meantime.

### 🟡 MEDIUM — Broken link: `/our-story` doesn't exist

`content/home.ts:156` (mobile nav) links to `/our-story` — confirmed a genuine, real 404 (no directory exists at `app/our-story`).

**Fix:** Either build the page (check `docs/04-product.md`/`docs/05-plan.md` for whether this was ever planned) or remove the link from the mobile nav until it exists.

### 🟢 Mega-menu ↔ registry parity — clean, no drift found

`activewearMegaMenu` matches all 17 real category entries (16 registry keys + the intentionally-hand-added `running-wear` curated collection) exactly, correctly grouped. `teamwearMegaMenu` matches all 10 real sport entries exactly. No extra or missing items in either direction.

---

## 8. Performance and accessibility

Lighter pass, as requested — only clear issues flagged, and none of significant severity were found.

### 🟢 Font loading — correct, non-render-blocking

`app/layout.tsx` uses `next/font/google` (self-hosted, non-blocking). No plain `<link>` tag pulling from `fonts.googleapis.com` directly anywhere.

### 🟢 Alt text — descriptive, not generic or empty

`MediaPlaceholder.tsx` and `ProductCardMedia.tsx` both fall back to the semantic product/category `label` when no explicit `alt` is supplied, rather than a literal `"image"` string or empty `alt=""`. No generic or empty alt text found in either file.

### 🟢 ARIA correctness — Accordion and segmented control both textbook-correct

- `Accordion.tsx`: `aria-expanded`, `aria-controls` on the trigger; `role="region"`, `aria-labelledby`, `aria-hidden` on the panel; decorative icons correctly `aria-hidden="true"`.
- `RequestSampleForm.tsx`'s "interested in" segmented control: `role="radiogroup"` + `aria-label` on the wrapper, `role="radio"` + `aria-checked` on each option — the correct accessible pattern for a pill/segmented control, not an unlabeled button group.

---

## Prioritized punch list — fix these first for the biggest AI-agent and search visibility gain

1. **🔴 Settle and unify the certifications list** (Section 1.1 + 5.1). Three conflicting lists exist right now across homepage vs. Services/Our Factory/Download Catalog. This is the single highest-leverage fix — it's exactly the kind of checkable claim an AI answer engine or a buyer's compliance team will quote, and right now the site contradicts itself. Fix the content everywhere it appears, then encode the final list in `Organization.hasCredential` (currently absent entirely).
2. **🔴 Fix the doubled `"| Capriowear | Capriowear"` titles** on `/our-factory`, `/privacy-policy`, and `/download-catalog` (Section 2). Live, in production, right now — a trivial content-string fix in each page's own `metaTitle`, plus fixing the OG/Twitter title construction on all three.
3. **🔴 Fix the soft-404** at `/teamwear/basketball-uniforms` → should link to `/teamwear/basketball` (Section 7). A one-line content fix; also worth a cache-purge check.
4. **🟠 Resolve the `/activewear` and `/teamwear` nav 404s** — ship the already-built teamwear hub, build the missing activewear hub (or point the nav at a real interim page) (Sections 2 & 7).
5. **🟠 Fix the real 404** at `/our-story` (Section 7) — build or unlink.
6. **🔴 Add a launch-day checklist item to flip `NEXT_PUBLIC_ALLOW_INDEXING=true`** (Section 4) — every other fix in this report ships invisible to every crawler until this happens.
7. **🟡 Fix `npx eslint .`'s stack overflow** by excluding `.claude/**` in the flat config (Section 6) — currently blocks a step in the project's own Definition of Done.
8. **🟡 Get explicit sign-off on the Product-schema-without-Offer decision** (Section 5) — it looks correct and deliberate, but it contradicted this audit's starting assumption, so it's worth a conscious confirmation rather than an implicit one.
9. **🟡 Decide the fate of `ProductCategoryLinks.tsx`** (Section 6) — wire it into the PDP template it was built for, or delete it.
10. **🟢 Add a `twitter` metadata block to the homepage** (Section 2) for consistency with every other page, and consider `llms.txt` once content is finalized and indexing is turned on (Section 4).
