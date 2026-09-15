// components/CapriosportsWordmark.tsx
// Plain text wordmark for Capriosports, the parent site -- 2026-09-15,
// Capriosports homepage rebuild's footer fix. No dedicated Capriosports
// logo asset exists anywhere in this codebase yet
// (content/capriosports/organization.ts's own comment confirms this), so
// this renders real, semantic text rather than fabricating a graphic mark.
// Swap this for a real `<Logo>`-style SVG the moment a real Capriosports
// mark exists -- same call sites (Footer's `brandMark` prop), no other
// code change needed.
import type { HTMLAttributes } from "react";

import { cx } from "./ui/cx";

export function CapriosportsWordmark({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  // No default text-size class here -- the caller's own `className` is the
  // only size source (e.g. Footer's desktop `text-h5` vs. mobile
  // `text-body-lg`), so there's never a second competing size utility in
  // the same class string fighting for cascade order (the same class of
  // bug CardMedia's own radius prop comment documents).
  return (
    <span className={cx("font-bold uppercase tracking-wide text-paper", className)} {...props}>
      Capriosports
    </span>
  );
}
