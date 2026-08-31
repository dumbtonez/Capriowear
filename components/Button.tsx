// components/Button.tsx
// Pill button per docs/03-component-library.md. Two variants: primary (solid
// accent) and secondary (outline). Renders as a Next.js Link when `href` is
// given, otherwise a native <button>, so the same styles cover CTAs and future
// in-page controls.
//
// Figma reference: Buttons frame (node 288:274). Every value maps onto an
// existing token. The frame's fixed 54px height and 24px line-height have no
// matching spacing/type token, so height is left to fall out of the token-based
// padding instead of hardcoding an unmapped value; the min-h-11 in the recipe
// enforces the 44px tap target floor.
//
// Styling lives in components/ui/styles.ts (`button`). Nothing here decides
// appearance.
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "./ui/cx";
import { button } from "./ui/styles";

export type ButtonVariant = "primary" | "secondary";

type Shared = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type AsLink = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type AsButton = Shared &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = AsLink | AsButton;

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const classes = cx(button.base, button[variant], className);

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as AsButton;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
