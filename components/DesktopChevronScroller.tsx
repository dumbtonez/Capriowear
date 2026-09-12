"use client";

// components/DesktopChevronScroller.tsx
// Shared floating cursor-tracking chevron for a horizontally scrollable
// desktop card row -- the exact mechanism How It Works introduced
// (2026-08-25) and Inside the Factory/Exhibitions each then copy-pasted
// verbatim with only their own card pitch changed. Extracted here 2026-08-26
// so the one remaining smoothness problem (see below) gets fixed once, not
// three times, and any future tuning stays in one place.
//
// Why a requestAnimationFrame loop, not a CSS transition on `transform`:
// the previous version wrote the cursor's raw position straight to the
// chevron's `style.transform` on every `mousemove` and relied on
// `transition-all` to ease between samples. That's the actual ceiling on
// how smooth this can ever look -- `mousemove` fires at an uneven,
// browser-decided rate (bursty under fast movement, sparse under slow), and
// a CSS transition re-eases from scratch every time its target changes
// mid-flight, which reads as a subtle stutter/rubber-band on quick or
// reversing motion rather than one continuous glide. A rAF loop decouples
// the chevron's rendered position entirely from the event rate: every
// animation frame it eases its current position a fixed *fraction* of the
// remaining distance toward wherever the cursor last was (exponential
// smoothing), so the motion is exactly as continuous as the display's own
// refresh rate, never bursty, and never restarts an easing curve mid-move.
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent, type RefObject } from "react";

import { chevronScroller } from "@/components/ui/styles";

const CHEVRON_HALF = 40; // half of size-20 (80px) circle, to centre it on the cursor
const DOT_HALF = 3; // half of size-1.5 (6px) dot, to centre it on the cursor
// Fraction of the remaining distance closed per 60fps-equivalent frame --
// tuned by feel. Lowered 0.35 -> 0.22 (owner, 2026-09-10: "this chvron
// component when you hover on the section is very tight not smooth... how
// can we make it very light, smooth" -- referencing studio-size.com's own
// featured-work drag element as the target feel) -- a smaller fraction
// closes less of the remaining distance each frame, so the circle trails
// the cursor with a longer, softer glide instead of nearly snapping to it.
// Pushed to 0.14 (owner: "is that the max smoothness you can make?" ->
// "go ahead"), then reverted (owner, same turn: "go back to previous this
// is too slow") -- 0.14 confirmed the "disconnected/laggy" floor this
// comment already predicted; back to 0.22.
const SMOOTHING = 0.22;

export function useDesktopChevronScroller(cardPitch: number) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  // Own clamp (DOT_HALF, not CHEVRON_HALF) -- the dot is much smaller than
  // the ring, so clamping it to the ring's own 40px-from-edge margin would
  // strand it that far from the real cursor near the row's edges for no
  // reason; it only needs to stay fully inside the clipped wrap.
  const dotTargetRef = useRef({ x: 0, y: 0 });
  const directionRef = useRef<1 | -1>(1);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  // Cached on `handleMouseEnter`/resize, NOT read on every `mousemove`
  // (owner, same turn: "when you scroll up and down, it sticks there for
  // one scroll and scrolls down on the second attempt" -- `getBoundingClientRect()`
  // forces a synchronous layout recalculation, and it was being called on
  // every single mousemove sample while hovering this row; that layout
  // thrash on the main thread is exactly what a scroll gesture starting
  // mid-hover would contend with, reading as the first wheel tick being
  // "stuck" until the thread caught up). A mouse move never changes this
  // element's own layout, so one measurement per hover session is enough.
  const wrapRectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const applyTransform = () => {
    const chevron = chevronRef.current;
    if (!chevron) return;
    chevron.style.transform = `translate(${currentRef.current.x - CHEVRON_HALF}px, ${currentRef.current.y - CHEVRON_HALF}px)`;
  };

  // Written directly from `dotTargetRef` on every event, not from the rAF
  // loop -- the dot has no lag at all, on purpose (see `chevronScroller.
  // dot`'s own comment).
  const applyDotTransform = () => {
    const dot = dotRef.current;
    if (!dot) return;
    dot.style.transform = `translate(${dotTargetRef.current.x - DOT_HALF}px, ${dotTargetRef.current.y - DOT_HALF}px)`;
  };

  const measureWrap = () => {
    const wrap = wrapRef.current;
    if (!wrap) return null;
    const rect = wrap.getBoundingClientRect();
    wrapRectRef.current = { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
    return wrapRectRef.current;
  };

  const setTargetFromEvent = (event: MouseEvent<HTMLDivElement>) => {
    const rect = wrapRectRef.current ?? measureWrap();
    if (!rect) return;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Clamped, not the raw cursor position -- the wrap clips overflow, so
    // without this the circle gets hard-cut the instant its centre comes
    // within half its own size of any edge.
    targetRef.current = {
      x: Math.min(Math.max(x, CHEVRON_HALF), rect.width - CHEVRON_HALF),
      y: Math.min(Math.max(y, CHEVRON_HALF), rect.height - CHEVRON_HALF),
    };
    dotTargetRef.current = {
      x: Math.min(Math.max(x, DOT_HALF), rect.width - DOT_HALF),
      y: Math.min(Math.max(y, DOT_HALF), rect.height - DOT_HALF),
    };
    applyDotTransform();
    let nextDirection: 1 | -1 = x < rect.width / 2 ? -1 : 1;
    // Owner, 2026-09-10: "the chevron on this section should not show
    // backward icon since user can not go to left, untill he slides to the
    // right" -- at the very start of the row there's nowhere left to
    // scroll back to, so the cursor-side check above is overridden to
    // forward-only until a real forward scroll (`handleClick`/native
    // scroll-snap) moves `scrollLeft` off 0. `> 1`, not `> 0`, absorbs
    // sub-pixel scroll positions some browsers report at rest.
    if (nextDirection === -1 && (trackRef.current?.scrollLeft ?? 0) <= 1) {
      nextDirection = 1;
    }
    if (nextDirection !== directionRef.current) {
      directionRef.current = nextDirection;
      setDirection(nextDirection);
    }
  };

  const tick = (time: number) => {
    const last = lastTimeRef.current ?? time;
    const dt = time - last;
    lastTimeRef.current = time;
    // Frame-rate-independent exponential smoothing: converges at the same
    // real-world speed on a 144Hz display as a 60Hz one, instead of a flat
    // per-frame factor that would visibly trail faster the higher the
    // refresh rate.
    const t = 1 - (1 - SMOOTHING) ** (dt / (1000 / 60));
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * t;
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * t;
    applyTransform();
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleMouseMove = setTargetFromEvent;

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    measureWrap();
    setTargetFromEvent(event);
    // Seed current = target immediately, before the loop starts -- without
    // this the circle eases in from wherever it was left last time (or its
    // 0,0 default) and visibly glides across the row on entry instead of
    // fading in already at the cursor.
    currentRef.current = { ...targetRef.current };
    applyTransform();
    if (chevronRef.current) chevronRef.current.style.opacity = "1";
    if (dotRef.current) dotRef.current.style.opacity = "1";
    lastTimeRef.current = null;
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
  };

  // Tried keeping the rAF loop alive past the leave event so the circle
  // would keep gliding toward the exit point while it faded (owner,
  // 2026-09-10: "the chevron exit from the section is jerky, can we make
  // it smooth too?") -- reverted the same turn ("that's even worse now,
  // let's revert it back"). Back to the plain instant stop.
  const handleMouseLeave = () => {
    if (chevronRef.current) chevronRef.current.style.opacity = "0";
    if (dotRef.current) dotRef.current.style.opacity = "0";
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const handleClick = () => {
    trackRef.current?.scrollBy({ left: directionRef.current * cardPitch, behavior: "smooth" });
  };

  // Stop a stray rAF loop if the component unmounts mid-hover.
  useEffect(() => () => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
  }, []);

  // Drops the cached rect on resize so the next `mouseenter` re-measures --
  // covers the (rare) case of a viewport resize while this row's own
  // position/size changed. Doesn't re-measure immediately: nothing reads
  // `wrapRectRef` again until the next real hover, so there's nothing to
  // keep in sync while the cursor isn't over the row anyway.
  useEffect(() => {
    const onResize = () => {
      wrapRectRef.current = null;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Owner, 2026-09-08: "when you scroll over the images and scroll down, it
  // slides the images a little, that should not be the behavior, user can
  // only scroll by clicking as it was before." A plain vertical trackpad
  // gesture always carries a little diagonal noise, and on an x-scrollable
  // track that noise's horizontal component natively scrolls it -- with
  // `snap-x snap-mandatory` on top, even that tiny nudge is enough to snap
  // the whole row to the next/previous card once the gesture ends.
  //
  // First fix attempted here was a JS `wheel` listener: intercept any
  // vertical-dominant gesture, `preventDefault()`, and replay it onto the
  // page manually. Abandoned after two passes (one using `scrollBy`, a
  // second correcting it to a direct `scrollTop` write once `scrollBy`'s
  // `behavior: "auto"` turned out to still defer to `<html>`'s sitewide
  // `scroll-behavior: smooth`, per spec) -- even the corrected version
  // still read as "stuck", confirmed live: manually replaying a wheel
  // gesture in JS can approximate native scrolling but can't reproduce a
  // trackpad's real momentum/deceleration curve, so any JS-driven
  // replacement for the browser's own scroll handling is inherently a
  // worse, laggier version of it, not a neutral stand-in.
  //
  // Real fix: don't intercept the gesture at all -- remove the track's own
  // ability to respond to it. `insideFactory.desktopRow`/`howItWorks.
  // desktopRow`/`exhibitions.desktopRow`/`productCustomizeSteps.desktopRow`
  // switched from `overflow-x-auto` to `overflow-x-hidden` (see each
  // token's own comment in styles.ts): an `overflow: hidden` element is
  // still a real scroll container (CSS Scroll Snap and a plain `scrollLeft`/
  // `scrollBy` write both still work on it, which is exactly what
  // `handleClick` below already uses), it just no longer responds to wheel,
  // trackpad, or click-drag input -- so the horizontal noise this section
  // never wanted has nothing left to act on, and the page's own vertical
  // scroll passes straight through untouched, at full native speed, with
  // zero JS in the loop. "user can only scroll by clicking" is now
  // literally true, not just intended.
  return {
    wrapRef,
    trackRef,
    chevronRef,
    dotRef,
    direction,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
}

export function DesktopChevron({
  chevronRef,
  dotRef,
  direction,
}: {
  chevronRef: RefObject<HTMLDivElement | null>;
  dotRef: RefObject<HTMLDivElement | null>;
  direction: 1 | -1;
}) {
  return (
    <>
      {/* Instant-follow dot, see `chevronScroller.dot`'s own comment --
          rendered as a sibling, not nested inside the ring, since the two
          move independently (the dot has no lag, the ring does). */}
      <div ref={dotRef} className={chevronScroller.dot} />
      <div ref={chevronRef} className={chevronScroller.circle}>
        {direction === -1 ? (
          <ChevronLeft className={chevronScroller.icon} aria-hidden="true" />
        ) : (
          <ChevronRight className={chevronScroller.icon} aria-hidden="true" />
        )}
      </div>
    </>
  );
}
