// app/robots.ts
// Next's robots file convention -- served at /robots.txt. /styleguide is the
// internal QA surface (see CLAUDE.md), not for search engines or AI
// crawlers, so it's disallowed here rather than left to be indexed by
// accident.
//
// Gated by ALLOW_INDEXING (SEO/metadata audit, 2026-09-06) -- see that
// constant's own comment (content/site.ts). While off (the default, every
// environment until real launch), this disallows every path for every
// agent and omits the sitemap reference entirely, so nothing here points a
// crawler at a site that's also sitewide noindexed via app/layout.tsx's own
// `robots` metadata. Once flipped on, this reverts to the exact prior
// behavior (styleguide disallowed, everything else allowed, sitemap
// referenced) -- one env var flips both this file and the sitewide meta tag
// together, never independently.
import type { MetadataRoute } from "next";

import { ALLOW_INDEXING, SITE_URL } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/styleguide",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
