// components/Breadcrumb.tsx
// The visible counterpart to lib/schema.ts's breadcrumbSchema() -- same
// {label, href} shape, rendered on the page instead of only in JSON-LD.
// Figma node 406:3078 ("Caprio Website" file), a foundational component
// built ahead of the inner pages that will use it (category/product pages
// aren't built yet) -- not wired into the homepage, whose own breadcrumb is
// a single "Home" crumb with no arrows to show.
import Link from "next/link";

import { BreadcrumbArrowIcon } from "@/components/icons/BreadcrumbArrowIcon";
import { breadcrumb } from "@/components/ui/styles";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type BreadcrumbProps = {
  items: BreadcrumbItem[];
  /** "dark" for use on an ink/black background (e.g. CategoryBanner) -- the current-page item needs a lighter colour than `tone="light"`'s near-black text-ink, which is invisible there. Default "light". */
  tone?: "light" | "dark";
};

export function Breadcrumb({ items, tone = "light" }: BreadcrumbProps) {
  const lastIndex = items.length - 1;

  return (
    <nav aria-label="Breadcrumb" className={breadcrumb.nav}>
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
