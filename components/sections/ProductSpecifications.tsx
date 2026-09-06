// components/sections/ProductSpecifications.tsx
// The PDP's "Specifications" datasheet (Figma node 634:5092, "Content",
// 2026-09-02): heading + subline, an optional mobile-only image, then a
// label/value fact list (Style, Fabric, Weight, Stretch and support,
// Waistband, Construction, Branding). Per-style data
// (content/activewear/types.ts's own StyleCard.specifications) -- unlike
// most other PDP sections built so far, this one genuinely differs between
// styles in the same category (a different weight, waistband, or
// construction), so it only renders for a style that supplies rows, same
// "only the first real Figma frame gets real copy" pattern already used by
// ProductGallery/ProductRelatedStyles above it.
//
// Real <dl>/<dt>/<dd> markup, not styled divs -- same SEO/AEO reasoning
// already used for FabricOptions' own <table>: a real fact list renders as
// real semantic HTML, not a div grid dressed up to look like one. <dl> (not
// <table>) since this is genuinely label/value pairs, not a 3+ column grid.
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { productSpecifications } from "@/components/ui/styles";
import type { SpecFact } from "@/content/activewear/types";

export type ProductSpecificationsProps = {
  heading: string;
  subline: string;
  rows: SpecFact[];
  image?: { alt: string; src?: string };
};

export function ProductSpecifications({ heading, subline, rows, image }: ProductSpecificationsProps) {
  return (
    <section className={productSpecifications.section}>
      <div className={productSpecifications.headingBlock}>
        <h2 className={productSpecifications.heading}>{heading}</h2>
        <p className={productSpecifications.subline}>{subline}</p>
      </div>

      {image ? (
        <MediaPlaceholder
          label={image.alt}
          image={image.src ? { src: image.src, alt: image.alt } : undefined}
          ratio="1:1"
          radius="none"
          className={productSpecifications.image}
        />
      ) : null}

      <dl className={productSpecifications.list}>
        {rows.map((row) => (
          // key={row.label}: a static, presentational fact list -- never
          // reordered or edited by the user -- same reasoning as
          // ProductHighlights' own list.
          <div key={row.label} className={productSpecifications.row}>
            <dt className={productSpecifications.label}>{row.label}</dt>
            <dd className={productSpecifications.value}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
