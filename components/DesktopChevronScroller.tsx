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
// Fraction of the remaining distance closed per 60fps-equivalent frame --
// tuned by feel (0.35 reads as a tight, responsive trail; higher values
// approach an instant snap, lower values read as sluggish/laggy).
const SMOOTHING = 0.35;

export function useDesktopChevronScroller(cardPitch: number) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const directionRef = useRef<1 | -1>(1);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const applyTransform = () => {
    const chevron = chevronRef.current;
    if (!chevron) return;
    chevron.style.transform = `translate(${currentRef.current.x - CHEVRON_HALF}px, ${currentRef.current.y - CHEVRON_HALF}px)`;
  };

  const setTargetFromEvent = (event: MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // Clamped, not the raw cursor position -- the wrap clips overflow, so
    // without this the circle gets hard-cut the instant its centre comes
    // within half its own size of any edge.
    targetRef.current = {
      x: Math.min(Math.max(x, CHEVRON_HALF), rect.width - CHEVRON_HALF),
      y: Math.min(Math.max(y, CHEVRON_HALF), rect.height - CHEVRON_HALF),
    };
    const nextDirection = x < rect.width / 2 ? -1 : 1;
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
    setTargetFromEvent(event);
    // Seed current = target immediately, before the loop starts -- without
    // this the circle eases in from wherever it was left last time (or its
    // 0,0 default) and visibly glides across the row on entry instead of
    // fading in already at the cursor.
    currentRef.current = { ...targetRef.current };
    applyTransform();
    if (chevronRef.current) chevronRef.current.style.opacity = "1";
    lastTimeRef.current = null;
    if (rafRef.current === null) rafRef.current = requestAnimationFrame(tick);
  };

  const handleMouseLeave = () => {
    if (chevronRef.current) chevronRef.current.style.opacity = "0";
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
    direction,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
  };
}

export function DesktopChevron({
  chevronRef,
  direction,
}: {
  chevronRef: RefObject<HTMLDivElement | null>;
  direction: 1 | -1;
}) {
  return (
    <div ref={chevronRef} className={chevronScroller.circle}>
      {direction === -1 ? (
        <ChevronLeft className={chevronScroller.icon} aria-hidden="true" />
      ) : (
        <ChevronRight className={chevronScroller.icon} aria-hidden="true" />
      )}
    </div>
  );
}
