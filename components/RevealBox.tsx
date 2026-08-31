// components/RevealBox.tsx
// Generic "reveal once it's in view" wrapper for non-text content -- built
// for Hero's video block, referencing cuberto.com's own hero media reveal
// (2026-08-27): inspected live via getComputedStyle, its resting state is
// `opacity: 1; transform: translate(0,0); clip-path: inset(0% round 2rem)`,
// i.e. the box animates in from a smaller, inward `clip-path` inset rather
// than a plain fade -- that's the specific quality that reads as considered
// rather than generic. Capriowear's own video block keeps its existing
// square corners (radius="none", a confirmed Figma call, unrelated to this
// reveal), so the clip-path here animates inset only, no rounding.
//
// Shares its trigger with TextReveal's own scroll-reveal via the extracted
// useRevealOnView hook (components/TextReveal.tsx) -- one implementation,
// not two copies of the same IntersectionObserver logic.
"use client";

import type { CSSProperties, ReactNode } from "react";

import { useRevealOnView } from "./TextReveal";
import { cx } from "./ui/cx";

export type RevealBoxProps = {
  children: ReactNode;
  className?: string;
  /**
   * Inline style, e.g. `{ transitionDelay: "150ms" }` to stagger several
   * RevealBox instances relative to each other. An inline value overrides
   * the CSS class's own `transition-delay` for that one instance, same as
   * any inline style beating a stylesheet rule.
   */
  style?: CSSProperties;
};

export function RevealBox({ children, className, style }: RevealBoxProps) {
  const { ref, active } = useRevealOnView<HTMLDivElement>();

  return (
    <div ref={ref} className={cx("reveal-box", active && "reveal-box-active", className)} style={style}>
      {children}
    </div>
  );
}
