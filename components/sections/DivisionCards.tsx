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

// `image` widened to optional here, not read off `capriosportsHome`
// directly -- the content itself dropped `image` from every category
// entirely (2026-09-15, owner: "remove the images, dont use images for
// any section"), so the real shipped `"flat"` variant needs none; the
// unused `"scrim"`/`"merge"`/`"box"` variants below still reference it,
// so it stays a real (optional) field on this component's own prop type
// rather than being deleted outright.
type DivisionCategory = (typeof capriosportsHome.divisions.categories)[number] & {
  image?: { src: string; alt: string };
  /** `stack` variant only -- see that field's own comment in content/capriosports/home.ts. */
  descriptorShort?: string;
  /** `stack` variant only, dummy placeholder photos -- see that field's own comment in content/capriosports/home.ts. */
  stackImages?: { src: string; alt: string }[];
};

export type DivisionCardsProps = {
  categories: DivisionCategory[];
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
   * - `"flat"` (2026-09-15, owner: "remove the images from the cards, use
   *   a light black background instead that can be seen on the black
   *   background") -- no photo at all, the whole card is one solid
   *   `bg-ink-2` block (the same "secondary dark surface on an ink
   *   section" token `card`/`cardBox` already use, so it's visible as its
   *   own container against the section's `bg-ink`) holding just the
   *   title/descriptor/link, full height.
   * - `"stack"` (2026-09-16, owner: "try this new style... on hover the
   *   following animation will happen," a shopify.design case-study card
   *   reference; sizing/positions since corrected to the owner's own
   *   Figma reference, node 1021:143/1021:168) -- same solid `flat`-style
   *   card shell, but the placeholder area holds a 3-photo fanned stack at
   *   Figma's own exact size/rotation/offsets, which fans out further on
   *   hover. Card is edge-to-edge (full-bleed, no `container-p` inset) on
   *   real mobile only (owner: "on mobile, use edge to edge cards and
   *   adjust the height that looks balanced" -- height is `h-auto`, not a
   *   literal copy of Figma's own single-card-export frame height, since
   *   that number came from an ambiguous multi-card Figma export, not a
   *   real intended card height). Tablet/desktop keep the existing
   *   aspect-based sizing, unchanged. See `divisionCards.cardStack`'s own
   *   comment in components/ui/styles.ts for the full reasoning.
   *   Additive -- `flat` is untouched.
   */
  variant?: "scrim" | "merge" | "box" | "flat" | "stack";
};

export function DivisionCards({ categories, variant = "scrim" }: DivisionCardsProps) {
  return (
    <section className={divisionCards.section}>
      <div className={variant === "stack" ? divisionCards.gridStack : divisionCards.grid}>
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className={
              variant === "stack"
                ? divisionCards.cardStack
                : variant === "flat"
                  ? divisionCards.cardFlat
                  : variant === "box"
                    ? divisionCards.cardBox
                    : divisionCards.card
            }
          >
            {variant === "stack" ? (
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
            ) : variant === "flat" || !category.image ? (
              <div className={variant === "box" ? divisionCards.boxImageWrap : divisionCards.imageFlatWrap} aria-hidden="true" />
            ) : (
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
            )}
            <div
              className={
                variant === "stack"
                  ? divisionCards.textStack
                  : variant === "flat"
                    ? divisionCards.textFlat
                    : variant === "box"
                      ? divisionCards.textBox
                      : divisionCards.textWrap
              }
            >
              <p className={variant === "stack" ? divisionCards.titleStack : divisionCards.title}>{category.label}</p>
              <p className={variant === "stack" ? divisionCards.descriptorStack : divisionCards.descriptor}>
                {variant === "stack" ? category.descriptorShort ?? category.descriptor : category.descriptor}
              </p>
              {"linkLabel" in category && category.linkLabel ? (
                <span className={variant === "stack" ? divisionCards.linkStack : divisionCards.link}>
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
