// components/sections/ProductRelatedStyles.tsx
// The PDP's "Related styles" pill/tag row (Figma node 634:5070 desktop /
// 643:2660 mobile, "Browse More", 2026-09-01) -- a border-top divider, then
// a heading and a wrapped row of pill tags, each with a trailing chevron.
// Identical copy, type sizes and spacing at both breakpoints; the only
// difference is mobile's own 20px inset, supplied by the caller (same
// "page-level margin is the caller's concern" pattern as ProductInfo).
//
// Not the same thing as the page's separate, plain "Related styles" block
// further down (sibling PDP links + a back-link to the parent PLP, SEO
// rule 6's crawl-loop requirement) -- this is Figma-designed browsing-by-
// attribute copy, not a second list of the same sibling-PDP links.
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cx } from "@/components/ui/cx";
import { productRelatedStyles } from "@/components/ui/styles";

export type ProductRelatedStylesTag = {
  label: string;
  href: string;
};

export type ProductRelatedStylesProps = {
  heading?: string;
  tags: ProductRelatedStylesTag[];
  /**
   * Extra classes on the root, e.g. `hidden xl:block` / `block xl:hidden` --
   * owner spec, 2026-09-02: this section renders in two different places
   * depending on breakpoint (see `app/activewear/[category]/[style]/
   * page.tsx`'s own comment), so each of the two instances needs to hide
   * itself at the breakpoint the other one owns.
   */
  className?: string;
  /**
   * `"default"` (its original position, inside the gallery/info row's own
   * text column): border-top divider + 32px inset. `"none"` (the mobile-only
   * instance placed after `TrustPoints`, owner correction 2026-09-02:
   * "remove the top separator and space should be 72px from the top"): no
   * divider, a plain 72px top gap instead -- this project's standing mobile
   * inter-section gap.
   */
  topRule?: "default" | "none";
};

export function ProductRelatedStyles({
  heading = "Related styles",
  tags,
  className,
  topRule = "default",
}: ProductRelatedStylesProps) {
  return (
    <div
      className={cx(
        productRelatedStyles.root,
        topRule === "none" ? productRelatedStyles.topRuleNone : productRelatedStyles.topRuleDefault,
        className,
      )}
    >
      <p className={productRelatedStyles.heading}>{heading}</p>
      <ul className={productRelatedStyles.list}>
        {tags.map((tag) => (
          <li key={tag.label}>
            <Link href={tag.href} className={productRelatedStyles.chip}>
              {tag.label}
              <ChevronRight className={productRelatedStyles.chipIcon} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
