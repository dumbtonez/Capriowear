// components/ScrollSpotlightList.tsx
// A vertical text list where the line nearest the viewport's centre
// brightens to white, fading back as it scrolls past -- one line "in
// focus" at a time, not a group dim. First built for Final CTA's mobile
// compliance list (2026-08-25, reference: studio-size.com's services list),
// now reused for Hero's mobile "Fully Custom Offerings" list too -- the
// same interaction, not a new one-off.
//
// Client component: a scroll-position-driven visual state has no static-CSS
// equivalent. Colour is written straight to each item's DOM `style.color`
// via refs, bypassing React state so a fast scroll never waits on a
// re-render -- same pattern as InsideFactory's carousel, but simpler and
// with no reflow risk, since this only ever touches `color`, never a
// layout-affecting property like height.
//
// Recalculated via a persistent `requestAnimationFrame` loop, not a `scroll`
// event listener (corrected 2026-08-25: reported as not animating at all on
// a real Samsung device/large mobile viewport). Some mobile browsers batch
// or throttle `scroll` events during momentum/fling scrolling far more
// coarsely than desktop Chrome, which this component's own testing can't
// reproduce -- a self-scheduling rAF loop recalculates every animation
// frame regardless of whether or how often `scroll` fires, removing that
// whole class of cross-browser inconsistency. Negligible cost: a handful of
// `getBoundingClientRect` reads per frame, only while this list is mounted.
//
// Falloff is normalized by the list's own row spacing (measured live between
// two consecutive items' centres), not the viewport height -- normalizing by
// the viewport faded 3-4 lines at once, reading as the whole list dimming
// together rather than a single spotlighted line.
"use client";

import { useEffect, useRef } from "react";

export type ScrollSpotlightListProps = {
  items: string[];
  listClassName: string;
  itemClassName: string;
  restColor?: string;
  focusColor?: string;
};

function lerpChannel(from: number, to: number, t: number) {
  return Math.round(from + (to - from) * t);
}

function lerpColor(from: [number, number, number], to: [number, number, number], t: number) {
  return `rgb(${lerpChannel(from[0], to[0], t)}, ${lerpChannel(from[1], to[1], t)}, ${lerpChannel(from[2], to[2], t)})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function ScrollSpotlightList({
  items,
  listClassName,
  itemClassName,
  restColor = "#838D97",
  focusColor = "#FFFFFF",
}: ScrollSpotlightListProps) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const restRgb = hexToRgb(restColor);
  const focusRgb = hexToRgb(focusColor);

  useEffect(() => {
    let rafId: number;
    const update = () => {
      const viewportCenter = window.innerHeight / 2;
      const refs = itemRefs.current;
      const first = refs[0];
      const second = refs[1];
      const rowSpacing =
        first && second
          ? Math.abs(
              second.getBoundingClientRect().top +
                second.getBoundingClientRect().height / 2 -
                (first.getBoundingClientRect().top + first.getBoundingClientRect().height / 2),
            )
          : 60;
      const falloff = rowSpacing / 2;
      refs.forEach((item) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.min(Math.abs(itemCenter - viewportCenter) / falloff, 1);
        item.style.color = lerpColor(focusRgb, restRgb, distance);
      });
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restColor/focusColor are effectively static per instance
  }, []);

  return (
    <ul className={listClassName}>
      {items.map((item, i) => (
        <li
          key={item}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className={itemClassName}
          style={{ color: i === 0 ? focusColor : restColor }}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
