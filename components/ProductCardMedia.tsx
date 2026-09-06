// components/ProductCardMedia.tsx
// The PLP grid tile's own image box (ProductCard.tsx) -- desktop hover
// image swap (owner spec, 2026-09-02), scoped for performance:
//
// - Reads ONLY `images[0]` (default) and `images[1]` (hover) off a
//   StyleCard -- never the rest of that style's own gallery array (that
//   full set belongs to the PDP's own ProductGallery, a completely
//   separate render). Every prop this component takes is exactly those
//   two entries, nothing more, so there is no way to accidentally widen
//   this to the whole array later.
// - No `images[1]` (or no `src` on it) -- renders `images[0]` alone,
//   no hover behavior, no second <Image> ever mounted. Same for
//   `images[0]` itself: no real `src` yet falls through to the sitewide
//   empty-state placeholder (matching MediaPlaceholder's own look, not a
//   second placeholder design), same as before any real photography
//   exists.
// - Desktop/hover only, gated by an actual capability check
//   (`matchMedia("(hover: hover) and (pointer: fine)")`), not just a
//   breakpoint -- a touch device that happens to be wide (most tablets)
//   must never mount the second image. Checked once on mount, client-side
//   only (no SSR guess).
// - The hover image is only ever mounted once this specific card has
//   scrolled near the viewport (IntersectionObserver, `rootMargin: "200px"`
//   so it's ready an instant before hover, not loaded the moment the page
//   opens) AND hover is possible -- a card still below the fold, or on a
//   touch device, never requests `images[1]` at all.
// - The cross-fade itself is pure CSS (`group-hover:opacity-0`/`opacity-100`
//   with a 175ms `transition-opacity`, inside the [150, 200]ms range asked
//   for) -- no JS-driven hover state, so fade-in and fade-back-out on
//   mouse-out both come for free from the same rule, and there's nothing
//   to get out of sync.
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cx } from "@/components/ui/cx";
import { media } from "@/components/ui/styles";

export type ProductCardImage = { alt: string; src?: string };

export type ProductCardMediaProps = {
  /** Fallback alt text and the empty-state placeholder's own label. */
  label: string;
  /** `images[0]` off the StyleCard -- the default, always-shown image. */
  primary?: ProductCardImage;
  /** `images[1]` off the StyleCard -- desktop-hover only, loaded lazily. */
  hover?: ProductCardImage;
  className?: string;
};

// Matches the grid's own real column counts (2 mobile, 3 desktop at xl) --
// a card is never wider than roughly a third of the viewport at xl, half
// below it, so next/image never fetches a full-viewport-width image for a
// box this small.
const SIZES = "(min-width: 1280px) 33vw, 50vw";

export function ProductCardMedia({ label, primary, hover, className }: ProductCardMediaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  // Lazy initializer, not `useEffect` + `setState` (a lint error --
  // `react-hooks/set-state-in-effect`: setting state synchronously inside
  // an effect body causes a cascading extra render) -- this only ever
  // needs to run once, reading a capability that can't change mid-session
  // (a device's hover/pointer capability), so there's no real "effect" to
  // synchronize here, just an initial value. `typeof window` guard keeps
  // this safe under SSR, where `matchMedia` doesn't exist at all.
  const [canHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  const showHover = canHover && inView && Boolean(hover?.src);

  if (!primary?.src) {
    // No label text (owner, 2026-09-02: "Remove the placeholder texts for
    // all PLPs, just have a image placeholder container") -- an empty
    // placeholder box, same shell/ratio/tone as before, just no `label`
    // span rendered inside it.
    return (
      <div ref={rootRef} className={cx(media.shell, media.ratio["79:100"], media.radius.none, className)}>
        <div className={cx(media.placeholder, media.placeholderCentred, media.placeholderLight)} />
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={cx(media.shell, media.ratio["79:100"], media.radius.none, showHover && "group", className)}
    >
      <Image
        src={primary.src}
        alt={primary.alt || label}
        fill
        sizes={SIZES}
        loading="lazy"
        className={cx(media.imageFill, showHover && "transition-opacity duration-[175ms] group-hover:opacity-0")}
      />
      {showHover ? (
        <Image
          src={hover!.src!}
          alt={hover!.alt || label}
          fill
          sizes={SIZES}
          loading="lazy"
          className={cx(media.imageFill, "opacity-0 transition-opacity duration-[175ms] group-hover:opacity-100")}
        />
      ) : null}
    </div>
  );
}
