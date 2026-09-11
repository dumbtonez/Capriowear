// components/ProductCard.tsx
// One PLP grid tile (Figma node 406:3137, "Product Tile"; mobile node
// 590:1173). Reuses MediaPlaceholder for the image box rather than a new
// placeholder markup -- this project's own "build once, reuse everywhere"
// rule.
//
// Published vs draft (owner spec, 2026-09-02, Leggings PLP pilot): a
// "published" card links to its real PDP via `next/link` (root-relative
// `href`, so `basePath` rewrites it automatically once added -- same rule
// Footer.tsx's own header comment states for every internal link
// sitewide). A "draft" card (a style with no real PDP content yet)
// renders the exact same visual tile but as a plain, non-interactive
// `<div>` instead -- never a link to a route that doesn't exist (no
// route is even generated for a draft slug, see `app/activewear/
// [category]/[style]/page.tsx`'s own `generateStaticParams`).
//
// "Coming soon" removed from the rendered card, same day (owner: "Remove
// coming soon on both platforms, only from the front end and keep it in
// the backend. Anything which is in draft just don't make it clickable")
// -- `status` itself, the non-clickable `<div>`/`aria-disabled` treatment,
// and every route/sitemap/schema filter that reads it are all unchanged;
// only the visible label is gone. A draft card is now visually identical
// to a published one except for not being a link (no pointer cursor, no
// `href`) -- that alone is the signal it isn't clickable.
//
// Desktop hover image swap (owner spec, 2026-09-02) -- the image box is
// now `ProductCardMedia`, not `MediaPlaceholder` directly: it reads only
// `images[0]`/`images[1]` off the card (never the rest of that style's own
// gallery array -- see that component's own header comment for the full
// performance contract), cross-fading between them on desktop hover.
// Falls back to the older flat `image`/`imageAlt` field as `images[0]`
// for a card that hasn't been given a real `images` array yet -- same
// "no real photo yet" empty-state placeholder either way.
import Link from "next/link";

import { ProductCardMedia } from "@/components/ProductCardMedia";
import { cx } from "@/components/ui/cx";
import { card, productCard } from "@/components/ui/styles";
import type { StyleCard } from "@/content/activewear/types";

export type ProductCardProps = StyleCard & {
  /**
   * Full replacement (not appended) for the title's own class string --
   * same "replace the whole string, don't layer a second font-size class
   * on top" convention `CapabilityCard`'s own `titleClassName` already
   * uses (two competing `text-*` utilities aren't guaranteed to cascade
   * predictably). Added 2026-09-11 for the Teamwear hub's own sport
   * cards, owner feedback: "make tht product titles 22px" -- every real
   * PLP grid usage omits this and keeps the shared `productCard.title`
   * size (18px desktop), unaffected.
   */
  titleClassName?: string;
  /**
   * Adds the same shadow "card lift" hover already used by `Card`'s own
   * `mediaHover` (What We Make's tiles) -- `group` on the root, `card.
   * mediaHover` on the media. Added 2026-09-11 for the Teamwear hub's
   * sport cards, owner feedback: "add hover animation on products."
   * Optional, off by default -- every real PLP grid usage is unaffected.
   */
  hoverLift?: boolean;
  /**
   * Wraps the media in the same one-time "zoom and settle" scroll reveal
   * `ParallaxMedia.tsx` uses on the Our Factory page (scale-[1.12] ->
   * scale-100 once in view), applied here via `ProductCardMedia`'s own
   * `parallax` prop rather than swapping in `ParallaxMedia` itself, since
   * this card's dual-image hover cross-fade lives only in
   * `ProductCardMedia`. Added 2026-09-11, owner feedback: "add the
   * parallax effect that we created for factory page, use that on
   * images." Optional, off by default -- every real PLP grid usage is
   * unaffected.
   */
  parallax?: boolean;
};

export function ProductCard({
  status,
  cardTitle,
  cardSubline,
  image,
  imageAlt,
  images,
  href,
  titleClassName,
  hoverLift,
  parallax,
}: ProductCardProps) {
  const published = status === "published";
  const primary = images?.[0] ?? (image ? { alt: imageAlt, src: image } : undefined);
  const hover = images?.[1];

  const media = (
    <ProductCardMedia
      label={cardTitle}
      primary={primary}
      hover={hover}
      parallax={parallax}
      className={cx(productCard.image, !published && productCard.draftImage, hoverLift && card.mediaHover)}
    />
  );

  const body = (
    <div className={productCard.text}>
      {/* h3, not p (SEO/AEO finalization pass, 2026-08-30): a product
          tile title is a sub-item under the grid's own <h2>
          (CategoryMetaStrip), the same "h2 section -> h3 sub-item"
          pattern already used for WhatWeMake's category tiles and Trust
          Signals' entries. className unchanged, so nothing visual moves. */}
      <h3 className={titleClassName ?? productCard.title}>{cardTitle}</h3>
      {/* Now shown at every breakpoint (owner correction, 2026-09-02:
          "mobile does not have subline that shows on the desktop") -- was
          `max-xl:hidden` from an earlier, unrelated era of this card's
          copy (owner request, 2026-08-30: "Remove ... from the product
          tile only in mobile"), when this line carried the repeated "in
          custom fabrics & colors" detail (folded into CategoryMetaStrip's
          own subline instead, said once above the whole grid). The card
          format rewrite (2026-09-02) replaced that with each style's own
          one-line distinguishing spec, which the owner wants visible on
          mobile too -- there's no longer a duplicate-copy reason to hide it. */}
      <p className={productCard.subline}>{cardSubline}</p>
      {/* No MOQ line, no "View style" button/CTA (owner spec, 2026-09-02,
          Leggings PLP card format rewrite) -- a published card's own
          `<Link>` wrapper (normal pointer/hover) is enough to signal it's
          clickable. No "Coming soon" label either any more (owner, same
          day: "Remove coming soon on both platforms... keep it in the
          backend") -- a draft card's own non-clickable `<div>` (no `href`,
          no pointer cursor) is the only signal now; see this file's own
          header comment. */}
    </div>
  );

  if (published) {
    return (
      <Link href={href} className={cx(productCard.root, hoverLift && "group")}>
        {media}
        {body}
      </Link>
    );
  }

  return (
    <div className={cx(productCard.root, productCard.rootDraft, hoverLift && "group")} aria-disabled="true">
      {media}
      {body}
    </div>
  );
}
