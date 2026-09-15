// app/sitemap.ts
// Next's sitemap file convention -- served at /sitemap.xml. Lists only real,
// live routes; add an entry here the same time a new page ships, never
// ahead of it. SITE_URL is the bare production domain (see content/site.ts)
// -- Capriowear's own "/capriowear" segment, Gear's "/lifting-gears"/
// "/boxing-and-mma", and the Capriosports parent site's own root paths are
// all added explicitly per-entry below, not baked into SITE_URL itself.
import type { MetadataRoute } from "next";

import { categories } from "@/content/activewear/categories";
import { boxingMmaCategories } from "@/content/gear/boxing-and-mma/categories";
import { liftingGearsCategories } from "@/content/gear/lifting-gears/categories";
import { SITE_URL } from "@/content/site";
import { sports } from "@/content/teamwear/sports";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Capriosports parent-site homepage (2026-09-14 routing restructure):
    // this URL used to be Capriowear's own homepage before Capriowear's
    // routes moved to /capriowear -- see the /capriowear entry just below.
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Capriosports parent-site stub pages (2026-09-14, placeholder content
    // only -- see app/contact/page.tsx etc.). /services, /our-factory,
    // /privacy-policy, /request-a-sample deliberately do NOT get a stub
    // here: those exact paths already 308-redirect to Capriowear's real
    // pages (next.config.ts's redirects()), and a redirect and a sitemap
    // entry can't both claim the same URL -- see docs/05-plan.md's decision
    // log for the open IA question this leaves flagged.
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/responsible-manufacturing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/our-people`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/who-we-are`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // /capriowear (2026-09-14 routing restructure): Capriowear's own real
    // homepage, moved here from the bare domain -- see content/site.ts's
    // own comment on SITE_URL.
    {
      url: `${SITE_URL}/capriowear`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // /capriowear/services (owner brief, 2026-09-07; moved under /capriowear
    // 2026-09-14): a real, standalone page being built section by section,
    // not part of any registry loop below -- same hand-added pattern as
    // Running Wear just below.
    {
      url: `${SITE_URL}/capriowear/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // /capriowear/our-factory (owner brief, 2026-09-08; moved 2026-09-14):
    // a real, standalone page being built section by section, same
    // hand-added pattern as /capriowear/services above.
    {
      url: `${SITE_URL}/capriowear/our-factory`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // /capriowear/request-a-sample (2026-09-10; moved 2026-09-14): the
    // conversion point every Capriowear CTA points to -- was missing from
    // this file entirely until noticed while adding /download-catalog
    // below; added now rather than left, same "add it the moment it's
    // noticed" rule this file's own header comment states.
    {
      url: `${SITE_URL}/capriowear/request-a-sample`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // /capriowear/download-catalog (2026-09-10; moved 2026-09-14): Pillar
    // 5's other lead-gen page, same hand-added pattern as
    // /capriowear/request-a-sample above.
    {
      url: `${SITE_URL}/capriowear/download-catalog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // /capriowear/privacy-policy (2026-09-10; moved 2026-09-14): kept
    // indexable now that it carries real content, not the earlier noindex
    // stub (doc: "legitimate page visitors and reviewers will want to
    // find") -- low priority/rare change frequency, since accuracy matters
    // here, not ranking.
    {
      url: `${SITE_URL}/capriowear/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // /capriowear/terms-of-service (2026-09-13; moved 2026-09-14): same
    // treatment as /capriowear/privacy-policy above -- indexable, low
    // priority, rare change frequency.
    {
      url: `${SITE_URL}/capriowear/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    // /capriowear/teamwear (2026-09-11; moved 2026-09-14): the Teamwear
    // Landing Hub, a browse/directory page one level above the sport PLPs
    // enumerated below -- hand-added the same way /capriowear/services and
    // /capriowear/our-factory are, since it isn't itself part of the
    // `sports` registry loop.
    {
      url: `${SITE_URL}/capriowear/teamwear`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // /capriowear/activewear (2026-09-11; moved 2026-09-14): the Activewear
    // Landing Hub, a browse/directory page one level above the category
    // PLPs enumerated below -- hand-added the same way
    // /capriowear/teamwear is, since it isn't itself part of the
    // `categories` registry loop.
    {
      url: `${SITE_URL}/capriowear/activewear`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Running Wear (owner spec, 2026-09-03; moved 2026-09-14): a real,
    // indexable curated collection page, but NOT in the `categories`
    // registry (see CuratedCollection's own comment,
    // content/activewear/types.ts) -- so it needs its own hand-added entry
    // here rather than falling out of the category loop below
    // automatically. It owns no PDPs of its own, so it never appears in the
    // PDP loop either.
    {
      url: `${SITE_URL}/capriowear/activewear/running-wear`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Every real Activewear PLP category, read from the same registry
    // app/capriowear/activewear/[category]/page.tsx itself reads from -- a
    // new category file added to that registry is in the sitemap
    // automatically, never a second, hand-typed list of routes to keep in
    // sync.
    ...Object.values(categories).map((category) => ({
      url: `${SITE_URL}/capriowear/activewear/${category.slug}`,
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
    // app/capriowear/teamwear/[sport]/page.tsx itself reads from. A new
    // sport (or a new published style within one) is in the sitemap
    // automatically.
    ...Object.values(sports).map((sport) => ({
      url: `${SITE_URL}/capriowear/teamwear/${sport.slug}`,
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
    // /lifting-gears and /boxing-and-mma (Phase 1 scaffolding): the Gear
    // division's two hub landing pages, hand-added the same way /teamwear
    // and /activewear are above, since neither is itself part of a
    // `categories` registry loop.
    {
      url: `${SITE_URL}/lifting-gears`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/boxing-and-mma`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Every real Lifting Gears / Boxing & MMA category PLP + PDP, same
    // "one registry, never a second hand-typed list" rule as Activewear/
    // Teamwear above. Lifting Gears categories additionally filter out a
    // `status: "draft"` category entirely (owner spec, 2026-09-15,
    // Weight Lifting Belts) -- a stronger gate than the Activewear/Teamwear
    // registries above, which have no category-level `status` at all and
    // always list their PLP once it has real copy.
    ...Object.values(liftingGearsCategories)
      .filter((category) => category.status !== "draft")
      .map((category) => ({
        url: `${SITE_URL}/lifting-gears/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ...Object.values(liftingGearsCategories)
      .filter((category) => category.status !== "draft")
      .flatMap((category) =>
        category.styleCards
          .filter((card) => card.status === "published")
          .map((card) => ({
            url: `${SITE_URL}${card.href}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
          })),
      ),
    ...Object.values(boxingMmaCategories).map((category) => ({
      url: `${SITE_URL}/boxing-and-mma/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...Object.values(boxingMmaCategories).flatMap((category) =>
      category.styleCards
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
