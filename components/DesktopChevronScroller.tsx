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
