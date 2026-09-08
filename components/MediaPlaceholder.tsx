// components/MediaPlaceholder.tsx
// Labelled placeholder box standing in for photography and video until assets
// land.
//
// This is the shared section-level media primitive: pass `image` and it renders
// a real next/image in the same box, so every section that uses it swaps from
// placeholder to photography with no markup change. Card has its own private
// CardMedia with the same contract; this one is for the section media blocks
// (hero video, factory shots, service imagery).
//
// Aspect ratios are the three the wireframe uses: 16:9 for the hero video and
// service tiles, 4:5 for portrait product shots, 1:1 for square category tiles.
// Radius is lg or xl per the radii table ("Media and video blocks").
//
// `showLabel={false}` (used sitewide -- Hero, ProductGallery, InsideFactory,
// ServicesIntro, etc.) was always meant to keep `label` supplying the alt
// text while only hiding the VISIBLE caption (see e.g. ProductGallery.tsx's
// own header comment, "`label` still supplies the alt text") -- but the
// no-`image` placeholder path never actually implemented that: with no
// visible caption and no real `<Image alt>` yet, the box had no
// discoverable accessible name at all (a real bug, found live in Our
// Factory's sample-detail review, 2026-09-09). `role="img"`/`aria-label`
// on the placeholder fill closes that gap for every existing caller at
// once, without changing anything visible.
import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";

import { cx } from "./ui/cx";
import { media } from "./ui/styles";

export type MediaRatio =
  | "16:9"
  | "4:5"
  | "1:1"
  | "50:37"
  | "16:11"
  | "33:31"
  | "19:11"
  | "15:8"
  | "469:320"
  | "79:100"
  | "575:612"
  | "397:234"
  | "520:480"
  | "600:640"
  | "1280:640"
  | "730:644";
export type MediaRadius = "lg" | "xl" | "none";

export type MediaPlaceholderProps = {
  /** Shown inside the empty box, e.g. "Hero video, factory and product". */
  label: string;
  ratio?: MediaRatio;
  radius?: MediaRadius;
  /** Swaps the placeholder for real photography. `label` becomes the alt text. */
  image?: { src: string | StaticImageData; alt?: string };
  /** next/image sizes hint, only used when `image` is set. */
  imageSizes?: string;
  /** Rendered on top of the box, e.g. the hero play button. */
  overlay?: ReactNode;
  /**
   * Set false when the overlay already carries its own caption (e.g. the
   * hero's "Play Video" label under the play button) -- the placeholder's own
   * label would otherwise render a second, redundant caption. `label` still
   * supplies the image alt text either way. Default true.
   */
  showLabel?: boolean;
  /** Dark boxes on ink sections, e.g. the hero video and factory shots. */
  tone?: "light" | "dark";
  /**
   * Overrides the placeholder box's own `tone`-driven background colour
   * (owner, 2026-09-09, Our Factory's sample-detail panel: a placeholder
   * that needed the section's own `bg-ink` -- a third value neither `tone`
   * option maps to -- instead of `tone="dark"`'s `bg-ink-2`). Only affects
   * the no-`image` placeholder fill; has no effect once `image` is set.
   * A real, already-established token class (e.g. `"bg-ink"`), not a raw
   * hex -- this prop exists so a caller can reach that one nested div, not
   * to license arbitrary colours here.
   */
  placeholderClassName?: string;
  className?: string;
  /**
   * Inline style on the root box. Only for a value `ratio`'s fixed set can't
   * express, e.g. Inside the Factory's mobile carousel continuously
   * interpolating height as the user drags -- an explicit height here wins
   * over the `ratio` class automatically (a definite width plus a definite
   * height means the browser doesn't need `aspect-ratio` to resolve the
   * box's size at all), no class-conflict risk.
   */
  style?: CSSProperties;
};

export function MediaPlaceholder({
  label,
  ratio = "16:9",
  radius = "lg",
  image,
  imageSizes = "100vw",
  overlay,
  showLabel = true,
  tone = "light",
  placeholderClassName,
  className,
  style,
}: MediaPlaceholderProps) {
  return (
    <div className={cx(media.shell, media.ratio[ratio], media.radius[radius], className)} style={style}>
      {image ? (
        <Image
          src={image.src}
          alt={image.alt ?? label}
          fill
          sizes={imageSizes}
          className={media.imageFill}
        />
      ) : (
        <div
          role={showLabel ? undefined : "img"}
          aria-label={showLabel ? undefined : label}
          className={cx(
            media.placeholder,
            overlay ? media.placeholderWithOverlay : media.placeholderCentred,
            placeholderClassName ?? (tone === "dark" ? media.placeholderDark : media.placeholderLight),
          )}
        >
          {showLabel ? <span className={media.label}>{label}</span> : null}
        </div>
      )}
      {overlay ? <div className={media.overlay}>{overlay}</div> : null}
    </div>
  );
}
