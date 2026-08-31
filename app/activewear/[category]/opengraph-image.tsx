// app/activewear/[category]/opengraph-image.tsx
// Re-exports the site's own default OG image verbatim (app/opengraph-
// image.tsx) -- not a new, category-specific design. Needed because this
// route's own dynamic [category] segment does not pick up the root
// opengraph-image.tsx file convention automatically (confirmed live,
// 2026-08-30: og:image/twitter:image were entirely absent from this
// route's rendered <head>, while a plain top-level route like /styleguide
// gets the root file's image with no changes needed). Re-exporting the
// exact same generator here, rather than duplicating its JSX, means this
// route can never visually drift from the sitewide default.
export { default, size, contentType } from "../../opengraph-image";
