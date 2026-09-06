// components/sections/ProductCategoryLinks.tsx
// Plain crawl-loop links at the foot of every PDP (SEO audit, 2026-09-02,
// rule 6): a real, always-crawlable "Back to all [Category]" link plus
// links to any other published sibling styles in the same category.
// Fills a gap the breadcrumb alone doesn't cover -- the breadcrumb's own
// upward link is CSS-hidden below `md` (owner spec, 2026-08-31), so a
// mobile visitor/crawler had no visible link back to the parent category
// at all before this. No Figma frame for this block -- see
// productCategoryLinks' own recipe comment.
//
// Siblings list is built from the category's own real `styleCards`
// (published only -- a draft style has no PDP route, so linking to one
// would be a dead link), not invented copy. Renders nothing extra when
// there are no siblings yet (single-style categories, e.g. Leggings today)
// -- the back-link alone still renders.
import Link from "next/link";

import { productCategoryLinks } from "@/components/ui/styles";

export type ProductCategoryLinksProps = {
  categoryLabel: string;
  categoryHref: string;
  siblings: { label: string; href: string }[];
};

export function ProductCategoryLinks({ categoryLabel, categoryHref, siblings }: ProductCategoryLinksProps) {
  return (
    <nav aria-label="Category" className={productCategoryLinks.root}>
      <Link href={categoryHref} className={productCategoryLinks.backLink}>
        Back to all {categoryLabel}
      </Link>
      {siblings.length ? (
        <div>
          <p className={productCategoryLinks.siblingsHeading}>More {categoryLabel}</p>
          <ul className={productCategoryLinks.siblingsList}>
            {siblings.map((sibling) => (
              <li key={sibling.href}>
                <Link href={sibling.href} className={productCategoryLinks.siblingLink}>
                  {sibling.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
