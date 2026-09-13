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
import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type RefObject } from "react";

import { chevronScroller } from "@/components/ui/styles";
import { hasReducedMotionOverride, prefersReducedMotion } from "@/lib/motionPreference";

const CHEVRON_HALF = 40; // half of size-20 (80px) circle, to centre it on the cursor
const DOT_HALF = 3; // half of size-1.5 (6px) dot, to centre it on the cursor
// Drag/momentum tuning (Inside the Factory only, owner 2026-09-13,
// referencing native carousel/iOS feel) -- see `handlePointerUp`'s own
// comment below for the exact formulas these feed.
const DRAG_THRESHOLD_PX = 6; // movement past this before a pointerdown counts as a drag, not a click
const VELOCITY_WINDOW_MS = 120; // only the last N ms of movement counts toward release velocity -- an old, slow start to a since-accelerated flick shouldn't drag the average down
const RUBBER_BAND = 0.35; // fraction of past-the-edge drag distance that actually moves the reel, while still dragging
const FLING_PROJECTION_MS = 200; // "how long the finger's exit velocity gets to keep carrying it" -- distance = velocity(px/ms) * this
const MAX_FLING_CARDS = 1.5; // clamp: a flick can never skip more than 1.5 card-widths of extra travel past the release point
const SETTLE_DURATION_MIN_MS = 220;
const SETTLE_DURATION_MAX_MS = 520;
// Slope from release speed to settle duration -- see `handlePointerUp`.
// Calibrated live, 2026-09-13: a first pass at 260 floored out at the
// 220ms minimum for anything past ~1.15px/ms, which live-testing showed is
// itself a fairly modest, deliberate drag speed (a real fast flick lands
// well past 5px/ms) -- meaning nearly every realistic release would have
// hit the same minimum duration regardless of how it actually felt,
// defeating the "proportional to speed" goal entirely. 100 instead: a slow
// ~0.2px/ms drag lands near the 500ms ceiling, a ~3px/ms flick lands at
// the 220ms floor, with real separation across the range in between.
const SETTLE_DURATION_SPEED_FACTOR = 100;
const SETTLE_EASE = "cubic-bezier(0.22,1,0.36,1)"; // this codebase's own established "premium settle" curve, reused rather than inventing a second one
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

export function useDesktopChevronScroller(
  cardPitch: number,
  // Default false: every existing caller (How It Works, Exhibitions, Trust
  // Signals, Product Customize Steps, Our Factory Team) keeps clamping to
  // the row's real start/end, unchanged. `true` wraps instead of clamping --
  // Inside the Factory's own owner request, 2026-09-12 (referencing Apple's
  // "Take a closer look" carousel, which loops the same way): a forward
  // click at the last card jumps back to the first, and a backward click at
  // the first jumps to the last, rather than doing nothing.
  loop = false,
  // Opt-in real click-and-drag / touch-swipe with velocity-based momentum
  // (Inside the Factory only, owner 2026-09-13 -- "build real pointer-drag
  // with velocity/momentum ... not just a duration tweak"). `enabled:
  // false`/omitted (every other caller) keeps the row click-only, exactly
  // as before -- this whole block of state and the pointer handlers below
  // are inert until a caller opts in. `cardCount` is needed only here (not
  // by `handleClick`'s own clamp/wrap, which never needed to know how many
  // stops there are, only the current/max offset) because settling to the
  // "nearest slide" after a fling has to snap to one of the row's real
  // stop positions, which -- like `handleClick`'s own last-card jump --
  // are `min(index * cardPitch, maxOffset)`, not an even multiple of
  // `cardPitch` all the way to the end.
  drag: { enabled: boolean; cardCount: number } = { enabled: false, cardCount: 0 },
) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
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
  // Current horizontal offset (px, 0 = start), the transform-based
  // replacement for reading a real `scrollLeft` -- see `handleClick`'s own
  // comment below for why this row no longer scrolls at all.
  const offsetRef = useRef(0);
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
  // Which card is currently front-and-centre, 0-based -- Inside the
  // Factory's own new pill/dot progress indicator (owner, 2026-09-12,
  // referencing apple.com/ae/macbook-pro's own segmented control). Derived
  // from `offsetRef` (a plain round-to-nearest-card, since every click
  // always moves exactly one `cardPitch`) rather than kept as the source of
  // truth itself -- `offsetRef`, not this, is what every existing caller's
  // clamp/wrap math already depends on. Every other caller of this hook
  // ignores the returned value, so this is additive, not a behaviour change.
  const [activeIndex, setActiveIndex] = useState(0);

  // --- Drag/momentum state (inert unless `drag.enabled`) ---
  // `pointerDownRef`: a pointer is currently down, but may still turn out
  // to be a plain click (see `DRAG_THRESHOLD_PX`). `isDraggingRef`: it has
  // crossed that threshold and is now a real drag -- from here on, clicks
  // are suppressed and the reel tracks the pointer 1:1.
  const pointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  // Rolling buffer of recent {x, t} samples, pruned to `VELOCITY_WINDOW_MS`
  // on every move -- release velocity is measured from only this recent
  // window, not the whole gesture, so a slow start to a since-accelerated
  // flick doesn't drag the average down (and vice versa).
  const pointerSamplesRef = useRef<{ x: number; t: number }[]>([]);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (!drag.enabled) return;
    reducedMotionRef.current = prefersReducedMotion();
    // The `?reduceMotion=1`/`=0` diagnostic override (lib/motionPreference.ts)
    // pins this for the whole page load -- skip the live OS-level listener
    // entirely while it's active, so a real reduce-motion toggle firing
    // mid-test can't silently overwrite a deliberately-forced test value.
    if (hasReducedMotionOverride()) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      reducedMotionRef.current = query.matches;
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [drag.enabled]);

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
    // forward-only until a real forward scroll (`handleClick`) moves
    // `offsetRef` off 0. `> 1`, not `> 0`, absorbs float rounding.
    // Looping rows have no real "start" to strand the cursor-side check
    // against -- a backward click at offset 0 is a valid wrap to the last
    // card, so this forward-only override only applies to non-looping rows.
    if (!loop && nextDirection === -1 && offsetRef.current <= 1) {
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

  // Moves the inner `reelRef` row via `transform: translateX`, not
  // `scrollLeft`/`scrollBy` on `trackRef` -- see this hook's own trailing
  // comment for why (owner report, 2026-09-12: "scrolling down while the
  // cursor is over the image area gets stuck, requiring a second scroll
  // gesture"). `trackRef` is now purely the clipping wrap: `clientWidth`
  // (its own visible width, unaffected by `overflow: clip`) and the reel's
  // real rendered width (`getBoundingClientRect().width` -- NOT
  // `scrollWidth`, which a non-scrolling `overflow: visible` element like
  // the reel doesn't reliably report) are all this needs to clamp the
  // offset to the real start/end of the row.
  const handleClick = () => {
    // A drag in progress owns the reel's position; a click that lands here
    // mid-drag (shouldn't normally happen, since `handlePointerUp` is what
    // calls this for a *non*-drag release, but guards regardless) must not
    // also nudge it by a card.
    if (isDraggingRef.current) return;
    const track = trackRef.current;
    const reel = reelRef.current;
    if (!track || !reel) return;
    const maxOffset = Math.max(0, reel.getBoundingClientRect().width - track.clientWidth);
    // `> 1`/`< 1` (not `>=`/`<=` maxOffset/0) absorb the same float rounding
    // `setTargetFromEvent`'s own start-of-row check already accounts for.
    if (loop && directionRef.current === 1 && offsetRef.current > maxOffset - 1) {
      offsetRef.current = 0;
    } else if (loop && directionRef.current === -1 && offsetRef.current < 1) {
      offsetRef.current = maxOffset;
    } else {
      offsetRef.current = Math.min(Math.max(offsetRef.current + directionRef.current * cardPitch, 0), maxOffset);
    }
    setActiveIndex(Math.round(offsetRef.current / cardPitch));
    reel.style.transition = "";
    reel.style.transform = `translateX(${-offsetRef.current}px)`;
  };

  // --- Drag/momentum handlers (only wired up by a caller that opts in) ---

  const getMaxOffset = () => {
    const track = trackRef.current;
    const reel = reelRef.current;
    if (!track || !reel) return 0;
    return Math.max(0, reel.getBoundingClientRect().width - track.clientWidth);
  };

  // The row's real stop positions -- `min(index * cardPitch, maxOffset)`,
  // same shape as `handleClick`'s own last-card jump above: the final stop
  // is a shorter hop so the filmstrip's right edge always lands flush,
  // rather than every stop being an even multiple of `cardPitch`.
  const getSnapPositions = (maxOffset: number) =>
    Array.from({ length: Math.max(1, drag.cardCount) }, (_, i) => Math.min(i * cardPitch, maxOffset));

  // Interrupts whatever the reel is currently doing (mid `handleClick`
  // transition or mid momentum-settle) and freezes it at its real,
  // currently-rendered position, in sync with `offsetRef` -- so a new drag
  // starting mid-animation begins from where the reel visually is, not
  // from a stale pre-animation value (which would otherwise make the reel
  // visibly jump the instant the new drag starts).
  const freezeReelAtCurrentVisualOffset = () => {
    const reel = reelRef.current;
    if (!reel) return;
    const computed = getComputedStyle(reel).transform;
    let visualOffset = offsetRef.current;
    if (computed && computed !== "none") {
      const match = computed.match(/matrix\(1, 0, 0, 1, (-?\d+\.?\d*)/);
      if (match) visualOffset = -Number(match[1]);
    }
    reel.style.transition = "none";
    reel.style.transform = `translateX(${-visualOffset}px)`;
    offsetRef.current = visualOffset;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.enabled) return;
    freezeReelAtCurrentVisualOffset();
    pointerDownRef.current = true;
    isDraggingRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    pointerSamplesRef.current = [{ x: event.clientX, t: event.timeStamp }];
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMoveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.enabled || !pointerDownRef.current) return;
    const dx = event.clientX - dragStartXRef.current;
    if (!isDraggingRef.current) {
      if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
      isDraggingRef.current = true;
    }
    pointerSamplesRef.current.push({ x: event.clientX, t: event.timeStamp });
    const cutoff = event.timeStamp - VELOCITY_WINDOW_MS;
    while (pointerSamplesRef.current.length > 2 && pointerSamplesRef.current[0].t < cutoff) {
      pointerSamplesRef.current.shift();
    }
    const reel = reelRef.current;
    if (!reel) return;
    const maxOffset = getMaxOffset();
    // Content follows the finger 1:1: dragging left (dx negative) reveals
    // later cards, i.e. increases the offset. No transition here at all --
    // direct 1:1 tracking is what makes a drag feel connected to the hand,
    // exactly the behaviour a fixed-duration CSS transition can't give.
    let next = dragStartOffsetRef.current - dx;
    // Soft rubber-band past either edge (same idea as iOS's own overscroll)
    // rather than a hard clamp -- `loop` rows can still fling-wrap on
    // release (see `handlePointerUp`), so this is just the *live* drag
    // feel at the edges, not a final answer about whether it wraps.
    if (next < 0) next *= RUBBER_BAND;
    else if (next > maxOffset) next = maxOffset + (next - maxOffset) * RUBBER_BAND;
    reel.style.transition = "none";
    reel.style.transform = `translateX(${-next}px)`;
  };

  // Shared by a real release and a cancelled gesture (`handlePointerCancel`)
  // -- a cancel has no velocity to speak of, so it settles as if released
  // at rest (`overrideVelocity = 0`), same nearest-slide snap either way.
  const settleDragRelease = (overrideVelocity?: number) => {
    const reel = reelRef.current;
    if (!reel) return;
    const maxOffset = getMaxOffset();
    const samples = pointerSamplesRef.current;
    const first = samples[0];
    const last = samples[samples.length - 1];
    // Pointer velocity, px/ms, positive = finger moved right. Converted to
    // "content velocity" (negated) since content moves opposite the
    // finger's own direction -- see `handlePointerMoveDrag`'s own mapping.
    const dt = Math.max(1, last.t - first.t);
    const pointerVelocity = overrideVelocity ?? (last.x - first.x) / dt;
    const contentVelocity = -pointerVelocity;
    const currentOffsetRaw = dragStartOffsetRef.current - (last.x - dragStartXRef.current);
    // The rubber-banded value actually on screen right now (not the
    // uncapped raw drag distance) is the real starting point for the fling
    // projection below -- flinging further past an edge already being
    // resisted shouldn't get a free pass around that resistance.
    const currentOffset =
      currentOffsetRaw < 0
        ? currentOffsetRaw * RUBBER_BAND
        : currentOffsetRaw > maxOffset
          ? maxOffset + (currentOffsetRaw - maxOffset) * RUBBER_BAND
          : currentOffsetRaw;

    const reduced = reducedMotionRef.current;
    const maxFling = cardPitch * MAX_FLING_CARDS;
    // "How far the finger's exit speed keeps carrying it" -- distance =
    // velocity(px/ms) x an assumed short coast window, clamped so a very
    // fast flick still can't skip more than `MAX_FLING_CARDS` extra.
    const flingDistance = reduced
      ? 0
      : Math.max(-maxFling, Math.min(maxFling, contentVelocity * FLING_PROJECTION_MS));
    const projected = currentOffset + flingDistance;

    const snapPositions = getSnapPositions(maxOffset);
    let target: number;
    if (loop && projected < -cardPitch * 0.4) {
      target = maxOffset; // flung backward past the start -- wrap to the last stop
    } else if (loop && projected > maxOffset + cardPitch * 0.4) {
      target = 0; // flung forward past the end -- wrap to the first stop
    } else {
      target = snapPositions.reduce((closest, pos) =>
        Math.abs(pos - projected) < Math.abs(closest - projected) ? pos : closest,
      );
    }

    // Settle duration scales DOWN as release speed scales up -- a fast
    // flick that still took the same fixed ~500ms to finish would read as
    // sluggish; a slow deliberate drag settling in ~220ms would read as
    // abrupt. See `SETTLE_DURATION_SPEED_FACTOR`'s own comment for the
    // calibration -- each 1px/ms of release speed shaves that many ms off
    // the settle, floored/ceilinged to a 220-520ms range either way.
    const speed = Math.abs(contentVelocity);
    const duration = reduced
      ? 0
      : Math.max(SETTLE_DURATION_MIN_MS, SETTLE_DURATION_MAX_MS - speed * SETTLE_DURATION_SPEED_FACTOR);

    offsetRef.current = target;
    setActiveIndex(Math.round(Math.min(target, maxOffset) / cardPitch));
    reel.style.transition = duration > 0 ? `transform ${duration}ms ${SETTLE_EASE}` : "none";
    reel.style.transform = `translateX(${-target}px)`;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.enabled) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pointerDownRef.current = false;
    if (!isDraggingRef.current) {
      // Never crossed the drag threshold -- a plain click, same one-card
      // advance as before (direction already tracked by the existing
      // cursor-position logic in `setTargetFromEvent`).
      handleClick();
      return;
    }
    settleDragRelease();
    isDraggingRef.current = false;
  };

  const handlePointerCancel = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.enabled) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    pointerDownRef.current = false;
    if (isDraggingRef.current) settleDragRelease(0);
    isDraggingRef.current = false;
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
  // First real fix: don't intercept the gesture at all -- remove the
  // track's own ability to respond to it. Every row using this hook
  // switched from `overflow-x-auto` to `overflow-x-hidden` (see each
  // token's own comment in styles.ts), on the reasoning that an
  // `overflow: hidden` element still lets a plain `scrollLeft`/`scrollBy`
  // write move it (exactly what `handleClick` used to do) while no longer
  // responding to wheel/trackpad/click-drag input at all.
  //
  // That reasoning had a real gap, found live, 2026-09-12 (owner: "gets
  // stuck, requiring a second scroll gesture to pass through it," after
  // `snap-x`/`snap-mandatory` removal and a `scroll-smooth` class had
  // already both been tried and hadn't fully fixed it -- see the removed
  // `insideFactory.desktopRow` comment history in git blame for both
  // attempts): `overflow: hidden` on an element whose content genuinely
  // overflows still makes it a real CSS "scroll container" by spec --
  // hidden UI/input handling, not hidden EXISTENCE -- so it's still a
  // candidate the browser's wheel-to-scroll-target resolution can hit-test
  // and briefly claim before chaining the gesture up to the page, in at
  // least some engines. That claim-then-release is exactly one lost wheel
  // tick: the page doesn't move on the first gesture, then scrolls normally
  // on the second once the browser has resolved that this element has
  // nothing to actually do with the vertical delta. Neither the earlier
  // `scroll-smooth` addition nor removing `snap-x` touches this at all --
  // `scroll-behavior` and Scroll Snap only govern scrolls the browser
  // itself performs (JS `scrollTo`/`scrollBy`/anchor jumps, or snapping
  // after a real scroll), never whether an element gets hit-tested as a
  // scroll target for an incoming wheel event in the first place.
  //
  // Real fix: stop being a scroll container at all, not just a
  // hard-to-scroll one. `trackRef` is now `overflow: clip` (every row's own
  // `desktopRow`/`galleryRow` token in styles.ts), which the spec defines
  // as never creating a scrollable overflow region in the first place --
  // guaranteed never hit-tested for wheel routing, unlike `hidden`. That
  // also means a plain `scrollLeft`/`scrollBy` write on it does nothing any
  // more (there's no scroll box left to move), so the actual card
  // progression moved to a `transform: translateX` on a new inner `reelRef`
  // row instead (`handleClick`'s own comment above) -- a transform never
  // interacts with scroll routing, snap, or `scroll-behavior` at all, on
  // either the reel or any ancestor, so there's nothing left here for a
  // vertical gesture to ever contend with, every time, not just usually.
  return {
    wrapRef,
    trackRef,
    reelRef,
    chevronRef,
    dotRef,
    direction,
    activeIndex,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handlePointerDown,
    handlePointerMoveDrag,
    handlePointerUp,
    handlePointerCancel,
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
