// components/sections/DivisionCards.tsx
// Capriosports homepage, division switcher band -- 2026-09-15, real Figma
// design (node 981:1208) confirmed via screenshot once the Dev Mode MCP
// connection couldn't be reached. 3 cards (Lifting Gear, Caprio Boxing &
// MMA, Capriowear), each a whole-card link to its own real division page.
//
// This started as 5 selectable variants (`scrim`/`merge`/`box`/`flat`/
// `stack`), each an owner-requested try at the same "text over/under a
// photo" problem -- see git history (components/ui/styles.ts's own
// `divisionCards` export, and this file's own history) for the earlier
// `scrim`/`merge`/`box`/`flat` geometries if any of them are ever wanted
// again. Owner, 2026-09-16, once `stack` was confirmed as the real
// shipped design: "delete all and keep the one we just have now" -- the
// `variant` prop and the other 4 geometries were removed entirely, not
// just left unused, since none of them were still needed once `stack`
// was picked.
//
// A 3-photo fanned stack (Figma node 1021:143/1021:168's own exact size/
// rotation/offsets) that fans out further on `group-hover`, using dummy
// placehold.co photos (see `stackImages`' own comment in content/
// capriosports/home.ts) rather than real product photography this site
// doesn't have wired up yet. Card is edge-to-edge (full-bleed, no
// `container-p` inset) on real mobile only -- see `divisionCards.
// cardStack`'s own comment in components/ui/styles.ts for the full
// reasoning on every sizing/spacing/colour decision below it.
import Link from "next/link";

import { NextArrowIcon } from "@/components/icons/NextArrowIcon";
import { cx } from "@/components/ui/cx";
import { divisionCards } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";

type DivisionCategory = (typeof capriosportsHome.divisions.categories)[number] & {
  /** A shorter, single-line rewrite of `descriptor` -- see that field's own comment in content/capriosports/home.ts. */
  descriptorShort?: string;
  /** Dummy placeholder photos -- see that field's own comment in content/capriosports/home.ts. */
  stackImages?: { src: string; alt: string }[];
};

export type DivisionCardsProps = {
  categories: DivisionCategory[];
};

export function DivisionCards({ categories }: DivisionCardsProps) {
  return (
    <section className={divisionCards.section}>
      <div className={divisionCards.gridStack}>
        {categories.map((category) => (
          <Link key={category.href} href={category.href} className={divisionCards.cardStack}>
            <div className={divisionCards.stackImageWrap} aria-hidden="true">
              <div className={divisionCards.stackGroup}>
                {(
                  [
                    { cls: divisionCards.stackPanelBack, image: category.stackImages?.[0] },
                    { cls: divisionCards.stackPanelMid, image: category.stackImages?.[1] },
                    { cls: divisionCards.stackPanelFront, image: category.stackImages?.[2] },
                  ] as const
                ).map(({ cls, image }, i) =>
                  image ? (
                    // Dummy placeholder photos (owner: "add some dummy
                    // fitness products"), not real product photography --
                    // plain <img>, not next/image, since these are
                    // temporary placehold.co placeholders on an external
                    // domain not worth wiring into next.config.ts's
                    // image `remotePatterns` for a trial variant.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={image.src} alt={image.alt} className={cx(cls, divisionCards.stackPanelImage)} />
                  ) : (
                    <div key={i} className={cls} />
                  ),
                )}
              </div>
            </div>
            <div className={divisionCards.textStack}>
              <p className={divisionCards.titleStack}>{category.label}</p>
              <p className={divisionCards.descriptorStack}>{category.descriptorShort ?? category.descriptor}</p>
              {"linkLabel" in category && category.linkLabel ? (
                <span className={divisionCards.linkStack}>
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
