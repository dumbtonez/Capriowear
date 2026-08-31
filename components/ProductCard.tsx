// components/ProductCard.tsx
// One PLP grid tile (Figma node 406:3137, "Product Tile"; mobile node
// 590:1173). Reuses MediaPlaceholder for the image box rather than a new
// placeholder markup -- this project's own "build once, reuse everywhere"
// rule.
import Link from "next/link";

import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { cx } from "@/components/ui/cx";
import { productCard } from "@/components/ui/styles";
import type { StyleCard } from "@/content/activewear/types";

export function ProductCard({ cardTitle, cardSubline, image, imageAlt, href }: StyleCard) {
  return (
    <Link href={href} className={productCard.root}>
      {/* showLabel={false} (owner report, 2026-08-30: "follow ... all the
          design elements" comparing against node 590:1173) -- neither the
          desktop nor mobile Figma frame ever shows a text label inside this
          box, real or placeholder; the tile's own title already renders
          right below it (the <h3> two lines down), so the overlay label
          was a redundant, un-designed artifact of MediaPlaceholder's
          general-purpose default, not a real design element to match.
          `label` still supplies the alt text once a real image lands. */}
      <MediaPlaceholder
        label={cardTitle}
        ratio="79:100"
        radius="none"
        showLabel={false}
        className={productCard.image}
        image={image ? { src: image, alt: imageAlt } : undefined}
      />
      <div className={productCard.text}>
        {/* h3, not p (SEO/AEO finalization pass, 2026-08-30): a product
            tile title is a sub-item under the grid's own <h2>
            (CategoryMetaStrip), the same "h2 section -> h3 sub-item"
            pattern already used for WhatWeMake's category tiles and Trust
            Signals' entries. className unchanged, so nothing visual moves. */}
        <h3 className={productCard.title}>{cardTitle}</h3>
        {/* Desktop only (owner request, 2026-08-30: "Remove ... from the
            product tile only in mobile") -- the "in custom fabrics &
            colors" detail this line carried on mobile moved up to
            CategoryMetaStrip's own subline instead, said once above the
            whole grid rather than repeated on every tile. */}
        <p className={cx(productCard.subline, "max-xl:hidden")}>{cardSubline}</p>
      </div>
    </Link>
  );
}
