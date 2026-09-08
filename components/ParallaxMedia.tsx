// components/ParallaxMedia.tsx
// A MediaPlaceholder-shaped box whose image settles into place with a
// slight zoom-and-drift as it scrolls into view -- the "What We Make"
// process gallery's own animated treatment (/our-factory, owner brief,
// 2026-09-08: "on the images we will have parallax animation", referencing
// wmf-coffeemachines.com's "For full taste, in a fast pace" gallery).
//
// Corrected 2026-09-08 after inspecting that reference site's own live DOM:
// its image transforms (`translate3d(...) scale(1.2, 1.2)`) do NOT change
// value across a scroll delta (confirmed by reading the same element's
// inline transform before and after a 2000px `scrollTo`, twice, byte-
// identical both times) -- it is NOT a continuous scroll-linked drift.
// It is a one-time "settle" reveal: each image starts scaled up and
// slightly offset, transitions to rest once it scrolls into view, and
// stays there. The first build of this component used Framer Motion's
// `useScroll`/`useTransform` for a true continuous drift, which is why it
// read differently from the reference -- replaced here with the same
// `useRevealOnView` IntersectionObserver hook TextReveal/RevealBox already
// use elsewhere on this site (one shared "reveal once it's in view"
// primitive, not a second scroll-tracking mechanism), driving a plain CSS
// transition instead. Framer Motion is no longer a dependency of this
// component (removed from package.json in the same change).
//
// Motion is layered on top of a static, crawlable box: the image/label is
// in the initial markup either way, only the resting transform value
// differs pre/post reveal. `prefers-reduced-motion` is handled by the
// sitewide `@media (prefers-reduced-motion: reduce)` rule in globals.css,
// which collapses `transition-duration` to ~0 -- the box still ends at
// its correct resting position, just without the animated settle, no
// separate check needed here (unlike the old scroll-linked version, a
// plain CSS transition IS covered by that sitewide rule).
"use client";

import Image, { type StaticImageData } from "next/image";

import type { MediaRadius, MediaRatio } from "./MediaPlaceholder";
import { useRevealOnView } from "./TextReveal";
import { cx } from "./ui/cx";
import { media } from "./ui/styles";

export type ParallaxMediaProps = {
  /** Always becomes the image alt text. Also shown as the placeholder's own visible overlay text, unless `showLabel` is false. */
  label: string;
  ratio?: MediaRatio;
  radius?: MediaRadius;
  image?: { src: string | StaticImageData; alt?: string };
  imageSizes?: string;
  /** Set false for a bare placeholder box with no visible caption text. `label` still supplies the image alt text either way. Default true. */
  showLabel?: boolean;
  className?: string;
};

export function ParallaxMedia({
  label,
  ratio = "16:9",
  radius = "none",
  image,
  imageSizes = "50vw",
  showLabel = true,
  className,
}: ParallaxMediaProps) {
  const { ref, active } = useRevealOnView<HTMLDivElement>();

  return (
    <div ref={ref} className={cx(media.shell, media.ratio[ratio], media.radius[radius], className)}>
      <div
        className={cx(
          "absolute inset-0 transition-transform duration-[1400ms] ease-out",
          active ? "scale-100 translate-y-0" : "scale-[1.12] translate-y-[3%]",
        )}
      >
        {image ? (
          <Image src={image.src} alt={image.alt ?? label} fill sizes={imageSizes} className={media.imageFill} />
        ) : (
          <div className={cx(media.placeholder, media.placeholderCentred, media.placeholderLight, "h-full")}>
            {showLabel ? <span className={media.label}>{label}</span> : null}
          </div>
        )}
      </div>
    </div>
  );
}
