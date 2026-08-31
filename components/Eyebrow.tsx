// components/Eyebrow.tsx
// The uppercase label that sits above an H2. SectionHeading renders one
// internally; this component is for the cases the wireframe uses an eyebrow on
// its own, e.g. the "PRODUCING FOR BRANDS WORLDWIDE" label above the logo row
// and the ticker labels.
//
// Colour is a required prop, not a default: `dark`/`light` for an eyebrow
// paired with a heading follows a standing sitewide rule (owner call,
// 2026-08-24) -- #ABB5C0 on any dark section, #17191E on any light one, no
// exceptions -- so every caller states which background it's on rather than
// silently inheriting a guess. `muted` is for a standalone label, not paired
// with a heading (see the `eyebrow` recipe in components/ui/styles.ts).
import type { ElementType, ReactNode } from "react";

import { cx } from "./ui/cx";
import { eyebrow } from "./ui/styles";

export type EyebrowTone = "dark" | "light" | "muted";

export type EyebrowProps = {
  children: ReactNode;
  /**
   * `dark`/`light` for an eyebrow paired with a heading (standing rule,
   * owner call 2026-08-24, applies everywhere: #ABB5C0 on any dark/black
   * section, #17191E on any light/white section) -- replaces an earlier
   * unconfirmed default of accent-orange. `muted` is unrelated: a
   * standalone label not paired with a heading (e.g. above a logo row or a
   * ticker), dimmed to whatever colour the section already sets.
   */
  tone: EyebrowTone;
  /** Defaults to <p>. Use "span" when nesting inside other text. */
  as?: ElementType;
  /**
   * Overrides the default Overline size. Only for a confirmed real-design
   * difference (e.g. the Hero eyebrow is smaller on its real mobile design
   * than the desktop Overline token) -- not a place to eyeball a size.
   */
  size?: string;
  className?: string;
};

export function Eyebrow({
  children,
  tone,
  as: Tag = "p",
  size = eyebrow.size,
  className,
}: EyebrowProps) {
  return <Tag className={cx(eyebrow.base, size, eyebrow[tone], className)}>{children}</Tag>;
}
