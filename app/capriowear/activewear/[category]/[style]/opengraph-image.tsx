// Re-exports the site's default OG image (app/opengraph-image.tsx), same as
// the PLP's own [category]/opengraph-image.tsx: dynamic segments don't
// inherit the root file convention, so PDPs rendered no og:image or
// twitter:image at all (Hoodies audit, 2026-09-24). Stays until real
// product photography exists.
export { default, size, contentType } from "../../../../opengraph-image";
