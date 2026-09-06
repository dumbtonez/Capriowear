// components/sections/CategoryMetaStrip.tsx
// The Activewear PLP's title + gender filter chip row (Figma node 406:3181/
// 517:4733, "Content", re-checked 2026-08-29). Split out of ProductGrid.tsx
// on 2026-08-28 as a full-width sibling above the filters+grid row -- that
// was right for the chip row (its own right edge matches the grid's right
// edge either way, since Figma's title row spans exactly the grid's own
// width from x=380 to the container's right edge), but wrong for the TEXT:
// owner report 2026-08-29 ("Leggings heading should be on top of product
// grid, not above the filters") plus a re-check of the current file confirm
// "Leggings / Every style..." starts at the SAME x as the product grid
// (x=380 -- 252px sidebar + 48px gap past the container's left edge), with
// nothing above the "Categories" panel. `text` carries that indent at xl;
// `chipRow` needs no change, since both layouts share the same right edge.
// Rendered by app/activewear/[category]/page.tsx directly.
"use client";

import { useState } from "react";

import { cx } from "@/components/ui/cx";
import { categoryMetaStrip } from "@/components/ui/styles";

export type CategoryMetaStripProps = {
  categoryLabel: string;
  categorySubline: string;
  /**
   * Real mobile-only variant of `categorySubline` (owner request,
   * 2026-08-30) -- see `Category.gridSublineMobile`'s own comment.
   */
  categorySublineMobile: string;
  /**
   * Whether the All/Women/Men chip row renders at all -- see
   * `Category.showGenderFilter`'s own comment (not every category has a
   * gender split). Defaults to `true`: every category built so far uses
   * the chips, so a category file that hasn't set this explicitly renders
   * exactly as before.
   */
  showGenderFilter?: boolean;
  /**
   * Which chip starts active (owner spec, 2026-09-03, Bodysuits: "default
   * Women, women's-led category") -- see `Category.defaultGenderFilter`'s
   * own comment. Defaults to "All", every category's own prior behavior.
   */
  defaultChip?: string;
};

const FILTER_CHIPS = ["All", "Women", "Men"];

export function CategoryMetaStrip({
  categoryLabel,
  categorySubline,
  categorySublineMobile,
  showGenderFilter = true,
  defaultChip = "All",
}: CategoryMetaStripProps) {
  const [activeChip, setActiveChip] = useState(defaultChip);

  return (
    // id targeted by ProductGrid.tsx's own pagination scroll-to-top --
    // owner spec, 2026-09-03: "it should land me ... on top of the title
    // where it says sports bras" -- the actual section landmark the owner
    // means is THIS title block, not the grid of cards below it (a first,
    // wrong attempt scrolled to the grid's own container instead, which
    // left this title scrolled out of view above the fold -- see that
    // file's own comment for the full history).
    <div id="plp-title" className={categoryMetaStrip.root}>
      <div className={categoryMetaStrip.text}>
        {/* h2, not p (SEO/AEO finalization pass, 2026-08-30): this is the
            product grid section's own real title -- every other section on
            this page (WhatWeCover, TrustPoints, FabricOptions, Faq) already
            has its own <h2>, so this text staying a plain paragraph was a
            real gap in the page's heading outline, not a deliberate
            styling choice. className unchanged, so nothing visual moves. */}
        <h2 className={categoryMetaStrip.title}>{categoryLabel}</h2>
        {/* Two elements, one per breakpoint, not a CSS truncation of one
            string -- mobile's copy says something genuinely different
            (folds in "in custom fabrics & colors"), same pattern as
            ProductCard's own subline split. */}
        <p className={cx(categoryMetaStrip.subline, "xl:hidden")}>{categorySublineMobile}</p>
        <p className={cx(categoryMetaStrip.subline, "max-xl:hidden")}>{categorySubline}</p>
      </div>
      {/* Below the title, not above it, and with no separator under it --
          owner correction, 2026-08-30 (a same-day earlier pass had this
          above the title with its own border-b; both reverted). Plain DOM
          order (this after `text` above) is enough on its own now that
          `root`/`chipRow` no longer carry `order`/`border` overrides -- see
          their own comments in components/ui/styles.ts. Conditionally
          rendered: not every category has a gender split. */}
      {showGenderFilter && (
        <div className={categoryMetaStrip.chipRow}>
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveChip(chip)}
              className={chip === activeChip ? categoryMetaStrip.chipActive : categoryMetaStrip.chip}
            >
              {chip}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
