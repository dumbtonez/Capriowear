"use client";

// components/ScrollGrowVideo.tsx
// Shared "narrow-to-full-viewport" scroll-linked hero video block -- Hero.tsx
// (homepage) introduced this 2026-09-11 (owner reference: rejouice.com's
// Oura Ring case study video, whose actual quality was its container
// growing from a small starting size to near-full screen as you scroll, not
// a `transform: scale()` on a fixed-size box). Extracted here once
// OurFactoryHero.tsx needed the identical block ("apply it on other pages
// where it exist") -- same mechanism, not a second copy.
//
// Width goes to `window.innerWidth` and height to `window.innerHeight`, in
// real pixels, not percentages -- percentage width alone could never exceed
// its padded parent's own content box (`hero.videoWrap`'s `xl:px-20`), so
// this breaks out via the standard viewport-bleed technique
// (`position: relative; left: 50%; transform: translateX(-50%)`, centred
// against `<main>`, the nearest positioned ancestor, which spans the full
// viewport width with no side padding of its own).
//
// Desktop only (`xl:`, 1280px+) -- every real usage of this video block
// documents mobile as deliberately edge-to-edge, a real design difference,
// not a narrower variant of desktop's; shrinking it to a small starting box
// would contradict that. Below `xl:`, `box` stays `null` and the element
// renders through its own plain CSS classes (`hero.video`'s per-breakpoint
// fixed heights, full width), completely unaffected.
//
// Tied to `window.scrollY` directly, not this element's own
// `getBoundingClientRect()` -- both real usages sit inside the page's very
// first section, so "the first `GROW_DISTANCE`px of scroll" is a simpler,
// equally correct basis than tracking the element's viewport position, and
// avoids a per-scroll layout read entirely (no `getBoundingClientRect`
// calls in the hot path -- the same `mousemove`-triggered layout-thrash bug
// fixed on the chevron scroller earlier this session, avoided here from the
// start). Reversible on purpose (recomputed on every scroll tick, not
// latched) so scrolling back to the top shrinks the box back down, matching
// a real scroll-linked effect rather than a one-shot reveal.
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MediaPlaceholder, type MediaPlaceholderProps } from "@/components/MediaPlaceholder";
import { cx } from "@/components/ui/cx";
import { hero } from "@/components/ui/styles";

const GROW_DISTANCE = 500; // px of scroll to go from the start size to full viewport
const XL_BREAKPOINT = 1280;

function useScrollGrowBox(ref: React.RefObject<HTMLDivElement | null>) {
  const [box, setBox] = useState<{ width: number; height: number } | null>(null);
  const startSizeRef = useRef<{ width: number; height: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const measureStart = () => {
      const el = ref.current;
      if (!el || window.innerWidth < XL_BREAKPOINT) {
        startSizeRef.current = null;
        return;
      }
      // Measured from the box's own CSS-driven natural size (this
      // wrapper's own `xl:w-[75%]` class, and `hero.video`'s own
      // `xl:h-[650px]`) -- not a hardcoded number, so it stays correct if
      // either class ever changes. Re-measured on resize.
      startSizeRef.current = { width: el.offsetWidth, height: el.offsetHeight };
    };

    const update = () => {
      const start = startSizeRef.current;
      if (!start) {
        setBox(null);
        rafRef.current = null;
        return;
      }
      const progress = Math.min(Math.max(window.scrollY / GROW_DISTANCE, 0), 1);
      setBox({
        width: start.width + (window.innerWidth - start.width) * progress,
        height: start.height + (window.innerHeight - start.height) * progress,
      });
      rafRef.current = null;
    };
    const onScroll = () => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(update);
    };
    const onResize = () => {
      // Box may already carry an inline size from a previous measurement;
      // clear it first so the next `measureStart` reads the element's own
      // CSS-driven natural size again, not its last animated size.
      setBox(null);
      startSizeRef.current = null;
      requestAnimationFrame(() => {
        measureStart();
        update();
      });
    };

    measureStart();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `ref` is a stable object from useRef, not a reactive value
  }, []);

  return box;
}

export type ScrollGrowVideoProps = {
  label: string;
  /** The outer padded wrap token, e.g. `hero.videoWrap` or `ourFactoryHero.videoWrap`. */
  wrapClassName: string;
  /** Swaps the placeholder fill for a real photo behind the play button. `label` still supplies the alt text unless this sets its own. */
  image?: MediaPlaceholderProps["image"];
};

export function ScrollGrowVideo({ label, wrapClassName, image }: ScrollGrowVideoProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const videoBox = useScrollGrowBox(videoRef);

  return (
    <div className={wrapClassName}>
      <div
        ref={videoRef}
        className={cx(
          hero.video,
          "relative xl:w-[75%]",
          // Exactly one centering mechanism at a time -- `mx-auto` and the
          // `left-1/2 -translate-x-1/2` viewport-bleed technique both
          // centre the box, but stacking them fights the frame-by-frame
          // resize into a lopsided leftward creep instead of symmetric
          // growth (found live on the homepage instance). Before
          // `videoBox` is measured (or below `xl:`, where it's always
          // `null`): plain in-flow `mx-auto`. Once it's driving real pixel
          // sizes: `left-1/2 -translate-x-1/2` only.
          videoBox ? "left-1/2 -translate-x-1/2" : "mx-auto",
        )}
        style={videoBox ? { width: videoBox.width, height: videoBox.height } : undefined}
      >
        <MediaPlaceholder
          label={label}
          tone="dark"
          showLabel={false}
          radius="none"
          image={image}
          imageSizes="100vw"
          className="h-full w-full"
          overlay={
            <div className={hero.playWrap}>
              <span className={hero.playCircle}>
                <Play className={hero.playIcon} aria-hidden="true" fill="currentColor" />
              </span>
              <span className={hero.playLabel}>Play Video</span>
            </div>
          }
        />
      </div>
    </div>
  );
}
