// components/ParallaxMedia.tsx
// A MediaPlaceholder-shaped box whose image content drifts vertically as
// the page scrolls -- the "What We Make" process gallery's own animated
// treatment (/our-factory, owner brief, 2026-09-08: "on the images we will
// have parallax animation", referencing wmf-coffeemachines.com's "For full
// taste, in a fast pace" gallery). Framer Motion's scroll-linked
// `useScroll`/`useTransform` drives an inner layer that's taller than its
// own clipping box and translates within it -- MediaPlaceholder itself has
// no such inner layer to animate (its placeholder/image fills the box
// exactly), so this is a sibling primitive, not a MediaPlaceholder prop:
// reuses the same `media` shell/ratio/radius/placeholder tokens directly
// rather than re-describing the same box a second way.
//
// Motion is layered on top of a static, crawlable box: with JS disabled or
// before hydration, the image renders in its resting position via a plain
// CSS transform, same content either way. `useReducedMotion` collapses the
// scroll range to 0 (owner brief, page-wide rule: "honor prefers-reduced-
// motion, parallax/reveals off, static shown") -- the sitewide
// `@media (prefers-reduced-motion: reduce)` rule in globals.css only
// disables CSS transitions/animations, not a motion value driven directly
// by scroll position, so this needs its own explicit check.
"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";

import { cx } from "./ui/cx";
import type { MediaRadius, MediaRatio } from "./MediaPlaceholder";
import { media } from "./ui/styles";

export type ParallaxMediaProps = {
  /** Shown inside the empty box; becomes the image alt text once real photography lands. */
  label: string;
  ratio?: MediaRatio;
  radius?: MediaRadius;
  image?: { src: string | StaticImageData; alt?: string };
  imageSizes?: string;
  className?: string;
  /**
   * How far the inner layer drifts, as a percentage of the box's own
   * height in each direction. Owner brief: "subtle (~10-15%)" -- 12
   * splits that range, applied here rather than per-call so every image
   * in this gallery moves at the same rate.
   */
  range?: number;
};

export function ParallaxMedia({
  label,
  ratio = "16:9",
  radius = "none",
  image,
  imageSizes = "50vw",
  className,
  range = 12,
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : [`-${range}%`, `${range}%`]);

  return (
    <div ref={ref} className={cx(media.shell, media.ratio[ratio], media.radius[radius], className)}>
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[15%] h-[130%]">
        {image ? (
          <Image src={image.src} alt={image.alt ?? label} fill sizes={imageSizes} className={media.imageFill} />
        ) : (
          <div className={cx(media.placeholder, media.placeholderCentred, media.placeholderLight, "h-full")}>
            <span className={media.label}>{label}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
