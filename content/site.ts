// content/site.ts
// Single source of truth for site-wide SEO/AEO facts: the production URL,
// organization identity, and default metadata. Every canonical URL, every
// piece of structured data, and the default page title/description reads
// from here -- never hand-typed a second time elsewhere. See docs/06-seo.md.
//
// SITE_URL is the real public URL, not this app's own internal routing root.
// This Next app is mounted at /capriowear on www.capriosports.com (the
// parent domain splits into "capriogear", the existing WordPress site, and
// "capriowear", this app) -- so every canonical/OG/sitemap URL must read
// https://www.capriosports.com/capriowear..., even though every route inside
// this app itself still starts at "/". Confirmed by the owner, 2026-08-25.
export const SITE_URL = "https://www.capriosports.com/capriowear";

export const SITE_NAME = "Capriowear";

// Owner-supplied exact copy (2026-08-26) -- title tag, meta description.
export const DEFAULT_TITLE = "Custom Activewear & Teamwear Manufacturer in Pakistan | Capriowear";

export const DEFAULT_DESCRIPTION =
  "Custom activewear and teamwear manufacturer in Sialkot, Pakistan. OEM, ODM and private label, low MOQ from 50 pieces, samples in 10 to 14 days, DDP worldwide.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

// Organization identity, feeding schema.org Organization/LocalBusiness
// structured data (lib/schema.ts) -- the same facts that render as visible
// copy elsewhere on the site (e.g. content/home.ts's "BASED IN SIALKOT,
// PAKISTAN" eyebrow), not a second, independently-maintained copy of them.
export const ORGANIZATION = {
  name: "Capriowear",
  legalName: "Caprio Sports",
  // Canonical entity description (owner-supplied exact wording, 2026-08-30,
  // GEO finalization pass) -- feeds organizationSchema()'s Organization.
  // description sitewide, so every page's structured data names this
  // entity the same way rather than a differently-worded description per
  // page. Reused verbatim wherever a page's own schema needs to name the
  // entity (e.g. the Leggings PLP's CollectionPage description).
  description: "Capriowear, a custom activewear and teamwear manufacturer in Sialkot, Pakistan.",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image`,
  address: {
    addressLocality: "Sialkot",
    addressCountry: "PK",
  },
  // Only real, live profiles go here. Facebook will be added the moment the
  // owner has it -- never a placeholder URL. LinkedIn added 2026-08-26.
  sameAs: ["https://www.instagram.com/capriowear", "https://www.linkedin.com/company/capriowear"],
};
