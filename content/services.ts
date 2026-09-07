// content/services.ts
// The /services page, built section by section from Figma (owner brief,
// 2026-09-07). Each section's content lives here, typed, same pattern as
// content/home.ts -- a page is content plus components, other pages reuse
// the same components with different data.
//
// metaTitle/metaDescription are a first draft, not owner-confirmed copy --
// no meta title/description has been given yet for this page. Follows the
// sitewide "Custom [Product] Manufacturer" keyword form (docs/06-seo.md)
// and the same bare-string-plus-root-template shape every other page's
// title already uses (SITE_NAME's own "%s | Capriowear" template, see
// app/layout.tsx) -- flagged here so it's swapped for real copy once given,
// not silently treated as final.

export const services = {
  // TODO(owner copy): metaTitle/metaDescription are placeholders -- confirm
  // real SEO copy for this page.
  metaTitle: "Custom Manufacturing Services",
  metaDescription:
    "OEM, ODM and private label activewear and teamwear manufacturing services, from fabric sourcing to retail-ready packaging, factory-direct from Sialkot, Pakistan.",

  // Section 1: Hero. Figma desktop node 729:139. Copy is the design's own
  // real headline (not a placeholder) -- no separate copy doc entry exists
  // for this page yet, so this is read directly off the Figma text layer.
  hero: {
    h1: "Custom activewear and teamwear, from fabric to packaging",
    ctaPrimary: { label: "Request a Sample", href: "/request-a-sample" },
    ctaSecondary: { label: "Download Catalog", href: "/catalog" },
  },
} as const;
