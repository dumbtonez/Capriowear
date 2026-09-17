// components/GlobalReachStage.tsx
// Thin client wrapper for the homepage "Global Reach" map
// (components/sections/GlobalReach.tsx, a Server Component -- the SVG
// markup itself, including the projected land path and route data, is
// computed server-side via lib/geo/* and never ships d3-geo/topojson-
// client to the browser). This is the only client JS the section needs:
// reuses the existing `useRevealOnView` hook (components/TextReveal.tsx,
// already backing RevealBox/TextReveal) to add a single `gr-inview`
// class once the stage scrolls into view, which is what actually arms
// every animation defined in app/globals.css (all scoped under
// `.gr-inview` ancestor selectors) -- nothing draws, flows, or moves
// before that.
"use client";

import type { ReactNode } from "react";

import { useRevealOnView } from "./TextReveal";
import { cx } from "./ui/cx";

export function GlobalReachStage({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, active } = useRevealOnView<HTMLDivElement>(0.2);

  return (
    <div ref={ref} className={cx(className, active && "gr-inview")}>
      {children}
    </div>
  );
}
