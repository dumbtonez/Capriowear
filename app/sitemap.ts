// app/sitemap.ts
// Next's sitemap file convention -- served at /sitemap.xml. Lists only real,
// live routes; add an entry here the same time a new page ships, never
// ahead of it. SITE_URL is the real public URL (see content/site.ts), not
// this app's own internal routing root.
import type { MetadataRoute } from "next";

import { categories } from "@/content/activewear/categories";
import { SITE_URL } from "@/content/site";
import { sports } from "@/content/teamwear/sports";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // /services (owner brief, 2026-09-07): a real, standalone page being
    // built section by section, not part of any registry loop below --
    // same hand-added pattern as Running Wear just below.
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // /our-factory (owner brief, 2026-09-08): a real, standalone page being
    // built section by section, same hand-added pattern as /services above.
    {
      url: `${SITE_URL}/our-factory`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // /request-a-sample (2026-09-10): the conversion point every CTA on
    // the site points to -- was missing from this file entirely until
    // noticed while adding /download-catalog below; added now rather than
    // left, same "add it the moment it's noticed" rule this file's own
    // header comment states.
    {
      url: `${SITE_URL}/request-a-sample`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // /download-catalog (2026-09-10): Pillar 5's other lead-gen page,
    // same hand-added pattern as /request-a-sample above.
    {
      url: `${SITE_URL}/download-catalog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // /privacy-policy (2026-09-10): kept indexable now that it carries
    // real content, not the earlier noindex stub (doc: "legitimate page
    // visitors and reviewers will want to find") -- low priority/rare
    // change frequency, since accuracy matters here, not ranking.
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // /teamwear (2026-09-11): the Teamwear Landing Hub, a browse/directory
    // page one level above the sport PLPs enumerated below -- hand-added
    // the same way /services and /our-factory are, since it isn't itself
    // part of the `sports` registry loop.
    {
      url: `${SITE_URL}/teamwear`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // /activewear (2026-09-11): the Activewear Landing Hub, a browse/
    // directory page one level above the category PLPs enumerated below --
    // hand-added the same way /teamwear is, since it isn't itself part of
    // the `categories` registry loop.
    {
      url: `${SITE_URL}/activewear`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Running Wear (owner spec, 2026-09-03): a real, indexable curated
    // collection page, but NOT in the `categories` registry (see
    // CuratedCollection's own comment, content/activewear/types.ts) -- so
    // it needs its own hand-added entry here rather than falling out of
    // the category loop below automatically. It owns no PDPs of its own,
    // so it never appears in the PDP loop either.
    {
      url: `${SITE_URL}/activewear/running-wear`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Every real Activewear PLP category, read from the same registry
    // app/activewear/[category]/page.tsx itself reads from -- a new
    // category file added to that registry is in the sitemap automatically,
    // never a second, hand-typed list of routes to keep in sync.
    ...Object.values(categories).map((category) => ({
      url: `${SITE_URL}/activewear/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    // Every real Activewear PDP, read from the same `styleCards` arrays
    // app/activewear/[category]/[style]/page.tsx's own generateStaticParams
    // reads from -- a new style entry added to a category file is in the
    // sitemap automatically, same "one registry, never a second list"
    // rule as the category enumeration above. Published styles only (owner
    // spec, 2026-09-02, Leggings PLP pilot): a draft style has no real PDP
    // content and no generated route (that page's own `generateStaticParams`
    // filters the same way), so it must not appear here either -- listing
    // an unpublished, non-existent route would be a sitemap lying about
    // what's actually live.
    ...Object.values(categories).flatMap((category) =>
      category.styleCards
        .filter((card) => card.status === "published")
        .map((card) => ({
          url: `${SITE_URL}${card.href}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
    ),
    // Every real Teamwear sport PLP + PDP, same "one registry, never a
    // second hand-typed list" rule as the Activewear enumeration above --
    // read from content/teamwear/sports.ts, the same registry
    // app/teamwear/[sport]/page.tsx itself reads from. A new sport (or a
    // new published style within one) is in the sitemap automatically.
    ...Object.values(sports).map((sport) => ({
      url: `${SITE_URL}/teamwear/${sport.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...Object.values(sports).flatMap((sport) =>
      sport.styleCards
        .filter((card) => card.status === "published")
        .map((card) => ({
          url: `${SITE_URL}${card.href}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.7,
        })),
    ),
  ];
}
