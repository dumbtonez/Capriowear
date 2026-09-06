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
