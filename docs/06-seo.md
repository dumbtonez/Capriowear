# 06 · SEO and AEO

How this site wins on traditional search and on AI answer engines (AEO): structured data, per-page metadata, semantics, crawlability, internal linking. Added as a standing rule set 2026-08-25, applied to the homepage first.

---

## The one fact that shapes every URL here

Production is `www.capriosports.com`. This Next app is not the whole site — it's mounted at `/capriowear` (the landing page splits into "capriogear," the existing WordPress site, and "capriowear," this app). So every canonical/OG/sitemap URL must read `https://www.capriosports.com/capriowear...`, even though this app's own internal routing still starts at `/`.

That real public URL lives in exactly one place: `content/site.ts`'s `SITE_URL`. Never hand-type it, never assume Next's automatic relative-URL resolution (via `metadataBase`) gets it right for a per-page canonical — set `alternates.canonical` as an explicit absolute string built from `SITE_URL` on every page (see `app/page.tsx`).

## 1 · Structured data (JSON-LD)

Generated from the same content that renders the visible page, never hand-written a second time — if the markup and the visible copy could ever say different things, something is wrong.

- **Builders**: `lib/schema.ts` — `organizationSchema()`, `websiteSchema()`, `breadcrumbSchema(items)`, `faqSchema(items)`, `navigationSchema(links)`, `megaMenuSchema(name, href, groups)`, `collectionPageSchema(name, url, description, items)`. Each is a pure function reading from `content/site.ts` (or, for `breadcrumbSchema`/`faqSchema`/`navigationSchema`/`megaMenuSchema`/`collectionPageSchema`, from whatever a page already renders).
- **Rendering**: `components/JsonLd.tsx` — one prop, `data`, serializes it into a `<script type="application/ld+json">`. Never build the script tag by hand elsewhere.
- **Site-wide** (`app/layout.tsx`): `organizationSchema()` + `websiteSchema()`, once, on every page.
- **Every page**: `breadcrumbSchema([...])`, matching that page's real position in the site (the homepage's is a single-item `[{name: "Home", url: SITE_URL}]` — still valid, still worth having).
- **FAQPage**: only on a page that actually renders an FAQ section visibly. `app/page.tsx` now calls `faqSchema(home.faq.items)`, fed by the same array the visible Accordion reads.
- **Site navigation and mega menus**: `app/page.tsx` calls `navigationSchema(home.nav.links)` (the top-level nav, as `SiteNavigationElement` items) and `megaMenuSchema(label, href, group)` once per link that actually carries a `megaMenu` (Activewear, Teamwear & Uniforms today — Services and Our Factory have none yet, so are skipped). This is a deliberate exception to the "not-yet-built listing page" rule below: the nav and mega-menu content is real, already rendered on the homepage (desktop `Header.tsx` + mobile `MobileNav.tsx`), so it earns structured data now even though `/activewear` and `/teamwear` don't exist as pages yet — the `url` fields just point ahead to where those routes will land. Nested as `ItemList`-of-`ItemList`s so the real TOPS/BOTTOMS/etc. group hierarchy survives, not flattened.
- **Product / ItemList / CollectionPage**: every real category PLP (e.g. `/activewear/leggings`) gets its own `collectionPageSchema()` — a `CollectionPage` wrapping an `ItemList` of lightweight `Product` entities (name/url, plus image once real photography exists), fed by the exact same `styleCards` array `ProductGrid`/`ProductCard` render, in addition to (not instead of) the mega-menu schema above. No price/offer data on these `Product` entities — these are custom-manufactured styles with no fixed retail price, so this is valid structured data without being eligible for a price-carrying rich result. Not yet added for `/activewear`/`/teamwear` themselves, since those routes don't exist yet.
- **Entity naming for GEO**: `content/site.ts`'s `ORGANIZATION.description` is the one canonical sentence naming this business ("Capriowear, a custom activewear and teamwear manufacturer in Sialkot, Pakistan.") — feeds `organizationSchema()`'s `Organization.description` sitewide, and any page-level schema needing to name the entity (e.g. a `CollectionPage`'s own `description`) should build off this same sentence rather than wording it differently per page.

## 2 · Per-page metadata

Every page exports its own `metadata` (or `generateMetadata`) using the Next Metadata API — see `app/page.tsx` for the pattern:

```ts
export const metadata: Metadata = {
  title: "...",              // keyword form: "Custom [Product] Manufacturer"
  description: "...",
  alternates: { canonical: `${SITE_URL}${path}` }, // explicit absolute string, not left to metadataBase resolution
  openGraph: { title: "...", description: "...", url: `${SITE_URL}${path}` },
};
```

- **Default OG image**: `app/opengraph-image.tsx`, generated via `next/og`'s `ImageResponse` from the site's own design tokens (ink background, accent orange, the CAPRIOWEAR wordmark) — no real photography needed. Next auto-detects this file and generates the `og:image`/`twitter:image` metadata itself; **never** also set `openGraph.images`/`twitter.images` manually in the same segment's `metadata` object — the file-convention one wins and a manual entry just goes stale.
- **Page-specific OG image**: add a route-specific `opengraph-image.tsx` inside that page's own folder only where a custom image earns its keep (e.g. a category page might want its own hero shot once real photography exists) — not by default.
- **Favicon**: `app/favicon.ico` already exists (Next's file convention auto-injects the `<link>` tag) — no manual `metadata.icons` entry needed unless overriding it.

## 3 · Headings and semantics

- **Exactly one `<h1>` per page.** The homepage's is Hero's. A stray second `<h1>` was found and fixed in `app/page.tsx`'s "not built yet" placeholder block during the 2026-08-25 audit — it's now a styled `<p>`.
- **One `<main>` per page**, wrapping every real section (`app/page.tsx`); `<header>`/`<nav>` stay outside it, as siblings (already correct — `components/Header.tsx`).
- **Logical H2 → H3 order**: `SectionHeading` renders every section's own `<h2>`; sub-items inside a section (What We Make's categories, Trust Signals' entries) use `<h3>`, never skip a level.
- **Alt text**: real, descriptive, keyword-aware text on every real image — never "image1" or a bare filename. Not yet applicable across most of the homepage: no real photography renders anywhere yet (`MediaPlaceholder` boxes only), so there's no alt text to write until real images land. `public/logos/*` (client and certification logos) already have descriptive alt via their own labels.

## 4 · FAQ copy for AI

Every FAQ answer is answer-first and self-contained: the question and its own answer should be fully quotable by an AI tool with no need to read anything else on the page. No "see above," no answers that only make sense next to a neighbouring question. Applies to `content/home.ts.faq` once that section is built, and to any future FAQ content.

## 5 · Crawlability

- `app/sitemap.ts` — Next's sitemap file convention, served at `/sitemap.xml`. Lists only real, live routes; add an entry the same time a page ships, never ahead of it.
- `app/robots.ts` — served at `/robots.txt`. Disallows `/styleguide` (internal QA surface, not for search engines or AI crawlers), points at the sitemap.
- Clean URLs: already true, App Router file-based routing.
- Fast, mobile-first, Core Web Vitals: already this project's practice (the Playwright viewport suite, `tests/screenshots.spec.ts`, checks every target viewport before anything is called done) — no new process needed, just keep doing it.

## 6 · Internal linking in body copy

Link related categories/products to each other from inside actual body copy, not just the nav — a category page's intro paragraph linking to a sibling category, a product description linking to a related product. The homepage's current copy is short marketing blurbs, not long-form editorial text, so there's no natural, non-forced place to add this today. Apply it once a page has real body copy to link from (category pages, guides) — don't pad copy just to create a link.

## Per-page checklist, for every new page from here

1. `metadata` export: title, description, canonical (`SITE_URL` + this page's path), OpenGraph.
2. `breadcrumbSchema([...])` matching the page's real nav position, rendered via `JsonLd`.
3. `faqSchema(...)` if (and only if) the page renders a real FAQ section.
4. Exactly one `<h1>`, one `<main>`, correct H2/H3 order.
5. Real, descriptive alt text on every real image.
6. Add the route to `app/sitemap.ts` the same time the page ships.
7. Internal links in body copy to genuinely related pages, once there's body copy to put them in.
