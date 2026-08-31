// app/sitemap.ts
// Next's sitemap file convention -- served at /sitemap.xml. Lists only real,
// live routes; add an entry here the same time a new page ships, never
// ahead of it. SITE_URL is the real public URL (see content/site.ts), not
// this app's own internal routing root.
import type { MetadataRoute } from "next";

import { categories } from "@/content/activewear/categories";
import { SITE_URL } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
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
  ];
}
