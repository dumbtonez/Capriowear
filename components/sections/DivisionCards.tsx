// components/sections/DivisionCards.tsx
// Capriosports homepage, division switcher band -- 2026-09-15, real Figma
// design (node 981:1208) confirmed via screenshot once the Dev Mode MCP
// connection couldn't be reached. 3 full-bleed photo cards (Lifting Gear,
// Caprio Boxing & MMA, Capriowear), each a whole-card link to its own real
// division page, with a soft bottom gradient scrim and the title+
// descriptor overlaid directly on the image -- see `divisionCards` in
// components/ui/styles.ts for the full reasoning on why this is a new,
// small component rather than a reuse of `CategoryLinkGrid`/`CategoryCard`
// (a genuinely different, small-thumbnail-beside-text pattern, kept
// untouched for the real Activewear/Teamwear hub grids it was built for).
import Image from "next/image";
import Link from "next/link";

import { NextArrowIcon } from "@/components/icons/NextArrowIcon";
import { cx } from "@/components/ui/cx";
import { divisionCards } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";

export type DivisionCardsProps = {
  categories: typeof capriosportsHome.divisions.categories;
  /**
   * EXPERIMENTAL variants, all owner-requested tries at the same "text
   * over a photo" problem -- default `"scrim"` is the real shipped
   * version. None of these delete each other; each stays selectable.
   * - `"scrim"` (default): an opaque gradient overlay on top of the full-
   *   bleed photo, text floating over it.
   * - `"merge"` (2026-09-15, "just for experiment... how will that look?"):
   *   masks the photo itself to transparent near the bottom so the card's
   *   own dark background shows through and it reads as dissolving into
   *   the section behind it, rather than a hard rectangular edge. Reverted
   *   from default after owner feedback ("too dark... don't merge it in
   *   the background") -- kept as a selectable option, not deleted.
   * - `"box"` (2026-09-15, owner screenshot reference): the photo itself
   *   shrinks to a fixed-ratio top portion (not full-bleed), with a real
   *   solid `bg-ink` box below it (not an overlay) holding the text --
   *   a hard photo/box seam, no gradient at all.
   */
  variant?: "scrim" | "merge" | "box";
};

export function DivisionCards({ categories, variant = "scrim" }: DivisionCardsProps) {
  return (
    <section className={divisionCards.section}>
      <div className={divisionCards.grid}>
        {categories.map((category) => (
          <Link key={category.href} href={category.href} className={variant === "box" ? divisionCards.cardBox : divisionCards.card}>
            <div className={variant === "box" ? divisionCards.boxImageWrap : divisionCards.fullBleedImageWrap}>
              <Image
                src={category.image.src}
                alt={category.image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 320px"
                className={cx(divisionCards.image, variant === "merge" && divisionCards.imageMerge)}
              />
              {variant === "scrim" ? <div className={divisionCards.scrim} aria-hidden="true" /> : null}
            </div>
            <div className={variant === "box" ? divisionCards.textBox : divisionCards.textWrap}>
              <p className={divisionCards.title}>{category.label}</p>
              <p className={divisionCards.descriptor}>{category.descriptor}</p>
              {"linkLabel" in category && category.linkLabel ? (
                <span className={divisionCards.link}>
                  {category.linkLabel}
                  <NextArrowIcon
                    className={"linkAnimated" in category && category.linkAnimated ? divisionCards.linkIconAnimated : divisionCards.linkIcon}
                    aria-hidden="true"
                  />
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
