// components/Chip.tsx
// Category pill. Radius is pill, per the radii table ("Buttons, tags"). Used
// for filter and category rows on the category pages and for dense label rows.
//
// Renders as a Link when `href` is given, a <button> when `onClick` is given,
// and a plain <span> when it is only a label. The interactive forms carry the
// 44px tap target; the static label does not, since a non-interactive pill is
// not a tap target and forcing 44px on it would break the dense rows in the
// wireframe.
import Link from "next/link";
import type { ReactNode } from "react";

import { cx } from "./ui/cx";
import { chip } from "./ui/styles";

export type ChipProps = {
  children: ReactNode;
  /** Filled accent treatment for the selected chip in a filter row. */
  active?: boolean;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function Chip({ children, active = false, href, onClick, className }: ChipProps) {
  const isInteractive = Boolean(href || onClick);
  const classes = cx(
    chip.base,
    isInteractive ? chip.interactive : chip.static,
    active ? chip.active : chip.inactive,
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-current={active ? "page" : undefined}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes} aria-pressed={active}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
