// app/robots.ts
// Next's robots file convention -- served at /robots.txt. /styleguide is the
// internal QA surface (see CLAUDE.md), not for search engines or AI
// crawlers, so it's disallowed here rather than left to be indexed by
// accident.
import type { MetadataRoute } from "next";

import { SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/styleguide",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
