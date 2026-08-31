// components/sections/RelatedCategories.tsx
// Internal-linking row for the Activewear PLP template (SEO/AEO rule 6,
// docs/06-seo.md: "link related pages inside body copy, not just the
// nav") -- links to sibling Activewear sub-categories from real, visible
// body content, not just the header/mega-menu/left-panel nav that already
// link to them. No Figma frame exists for this row yet, so it's a plain,
// minimal heading + link row built from existing tokens/components
// (Button's own secondary/outline variant) rather than an invented visual
// design.
import { Button } from "@/components/Button";
import { relatedCategories } from "@/components/ui/styles";
import type { RelatedLink } from "@/content/activewear/types";

export type RelatedCategoriesProps = {
  links: RelatedLink[];
};

export function RelatedCategories({ links }: RelatedCategoriesProps) {
  return (
    <section className={relatedCategories.section} aria-labelledby="related-categories-heading">
      <h2 id="related-categories-heading" className={relatedCategories.heading}>
        Explore more Activewear categories
      </h2>
      <ul className={relatedCategories.list}>
        {links.map((link) => (
          <li key={link.href}>
            <Button href={link.href} variant="secondary">
              {link.label}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
