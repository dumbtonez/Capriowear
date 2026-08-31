// components/sections/WhatWeCover.tsx
// The PLP's coverage grid (Figma node 579:5580, "Content", 2026-08-29):
// eyebrow + H2, then a 2-column, 6-item grid (Fabric, Color and print,
// Style and fit, Branding, Labels, Packaging), each a title + one-line
// body with its own bottom border. Same bespoke 1164px centred column
// (x=138 on a 1440 frame) as its sibling section FabricOptions.tsx, built
// the same session -- not container-p's own cap/side-padding, same
// "section gets its own custom width" precedent as categoryBanner's 685px
// column. Desktop only for now, same standing scope as
// CategoryBanner/CategoryFilters/ProductGrid/FabricOptions -- no mobile
// Figma frame exists yet.
//
// Every item gets its own bottom border and bottom padding, not a
// row-level border grouping two items at a time the way Figma's own export
// nests them -- functionally identical at the real 2-column width (each
// cell still reads as bordered-underneath, two per row), simpler to render
// as one flat list of 6 rather than 3 explicit row pairs.
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { TextReveal } from "@/components/TextReveal";
import { whatWeCover } from "@/components/ui/styles";
import type { CoverageItem } from "@/content/activewear/types";

export type WhatWeCoverProps = {
  eyebrow: string;
  heading: string;
  items: CoverageItem[];
};

export function WhatWeCover({ eyebrow, heading, items }: WhatWeCoverProps) {
  return (
    <section className={whatWeCover.section}>
      <div className={whatWeCover.headingBlock}>
        <p className={whatWeCover.eyebrow}>
          <TextReveal text={eyebrow} />
        </p>
        <h2 className={whatWeCover.heading}>
          <TextReveal as="span" text={heading} />
        </h2>
      </div>

      {/* Mobile-only artwork block (Figma node 590:1220, "Artwork") -- no
          equivalent frame exists on the desktop design (579:5580 has none),
          so this is hidden at xl rather than a shared/scaled asset. `heading`
          doubles as the alt text -- there's no separate copy field for it
          and the heading already describes exactly what the artwork would
          show once real photography lands. The px-5 inset lives on this
          wrapper, not on MediaPlaceholder's own root: that root IS the
          aspect-ratio/overflow-hidden box, so padding there pads the image
          content inward (rendering visibly smaller/off-ratio) instead of
          inseting the box from the viewport edge. */}
      <div className={whatWeCover.artworkWrap}>
        <MediaPlaceholder label={heading} ratio="16:11" radius="none" className={whatWeCover.artwork} />
      </div>

      {/* <ul>/<li>, not styled divs (SEO/AEO/GEO finalization pass,
          2026-08-30: "render... the fact lists as real HTML... lists, not
          images"). Same classes as before -- a tag swap, no layout
          change: <ul>/<li> carry no default display that would fight the
          existing CSS grid. */}
      <ul className={whatWeCover.grid}>
        {items.map((item) => (
          <li key={item.title} className={whatWeCover.item}>
            <p className={whatWeCover.itemTitle}>{item.title}</p>
            <p className={whatWeCover.itemBody}>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
