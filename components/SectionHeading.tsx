// components/SectionHeading.tsx
// Eyebrow plus H2. Deliberately has no intro line: the copy rule for this
// component is eyebrow + heading only, nothing else.
//
// The heading sets no text colour of its own, so it inherits whatever the
// wrapping section sets (text-ink by default, text-paper inside a dark
// section), the same pattern Button's secondary variant uses. The eyebrow's
// colour follows the standing sitewide rule (owner call, 2026-08-24):
// #ABB5C0 on a dark section, #17191E on a light one -- callers state which
// via `eyebrowTone`, since (unlike the heading) that colour can't be
// inherited automatically.
import type { ReactNode } from "react";

import { Eyebrow } from "./Eyebrow";
import { cx } from "./ui/cx";
import { sectionHeading } from "./ui/styles";

export type SectionHeadingProps = {
  /** Short uppercase label shown above the heading, e.g. "WHAT WE MAKE". */
  eyebrow: ReactNode;
  /** The section's H2 text. */
  heading: ReactNode;
  /**
   * `dark` on a dark/black section, `light` on a light/white one -- see the
   * standing rule on Eyebrow.tsx. Required, not defaulted, so every caller
   * states which background it's on rather than inheriting a guess.
   */
  eyebrowTone: "dark" | "light";
  /**
   * Overrides the eyebrow's default Overline size -- see the same prop on
   * Eyebrow.tsx. What We Make's real mobile eyebrow is 16px, not the
   * default 20px, confirmed 2026-08-23 (the same value Hero's own mobile
   * eyebrow already uses).
   */
  eyebrowSize?: string;
  /**
   * "center" confirmed against real Figma 2026-08-23 (Certified & Compliant)
   * -- both the eyebrow and heading are centre-aligned there, unlike Trust
   * Signals and What We Make which are genuinely left-aligned. Default
   * "left" leaves every existing usage unchanged.
   */
  align?: "left" | "center";
  /**
   * Extra classes for the <h2> itself, e.g. a max-width to force Figma's
   * real wrap point. Certified & Compliant's real heading column is 812px
   * wide, wrapping its copy to exactly 2 lines -- unconstrained, it ran the
   * full container width and wrapped to only 1.
   */
  headingClassName?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  eyebrowTone,
  eyebrowSize,
  align = "left",
  headingClassName,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        sectionHeading.root,
        align === "center" && sectionHeading.alignCenter,
        className,
      )}
    >
      <Eyebrow tone={eyebrowTone} size={eyebrowSize}>
        {eyebrow}
      </Eyebrow>
      <h2 className={cx(sectionHeading.heading, headingClassName)}>{heading}</h2>
    </div>
  );
}
