// components/Breadcrumb.tsx
// The visible counterpart to lib/schema.ts's breadcrumbSchema() -- same
// {label, href} shape, rendered on the page instead of only in JSON-LD.
// Figma node 406:3078 ("Caprio Website" file), a foundational component
// built ahead of the inner pages that will use it (category/product pages
// aren't built yet) -- not wired into the homepage, whose own breadcrumb is
// a single "Home" crumb with no arrows to show.
import Link from "next/link";

import { BreadcrumbArrowIcon } from "@/components/icons/BreadcrumbArrowIcon";
import { cx } from "@/components/ui/cx";
import { breadcrumb } from "@/components/ui/styles";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** "dark" for use on an ink/black background (e.g. CategoryBanner) -- the current-page item needs a lighter colour than `tone="light"`'s near-black text-ink, which is invisible there. Default "light". */
  tone?: "light" | "dark";
  /**
   * Extra classes merged onto the `<nav>` -- e.g. a call site's own
   * vertical padding, or a CSS-only mobile-hide (PDP, 2026-08-31: "hide
   * the breadcrumb visually on mobile only... never conditionally render
   * it out of the DOM"). The trail itself always renders regardless of
   * this className -- only visibility/spacing should ever be overridden
   * here, never the markup.
   */
  className?: string;
};

export function Breadcrumb({ items, tone = "light", className }: BreadcrumbProps) {
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className={cx(breadcrumb.nav, className)}>
      <ol className={breadcrumb.list}>
        {items.map((item, index) => {
          const isLast = index === lastIndex;

          return (
            <li key={item.href} className={breadcrumb.item}>
              {isLast ? (
                <span aria-current="page" className={tone === "dark" ? breadcrumb.currentDark : breadcrumb.current}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={tone === "dark" ? breadcrumb.linkDark : breadcrumb.link}>
                  {item.label}
                </Link>
              )}
              {!isLast ? <BreadcrumbArrowIcon className={breadcrumb.arrow} /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
