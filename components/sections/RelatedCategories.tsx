// components/sections/RelatedCategories.tsx
// Internal-linking row for the category PLP templates (SEO/AEO rule 6,
// docs/06-seo.md: "link related pages inside body copy, not just the
// nav") -- links to sibling categories from real, visible body content,
// not just the header/mega-menu/left-panel nav that already link to them.
// No Figma frame exists for this row yet, so it's a plain, minimal
// heading + link row built from existing tokens/components (Button's own
// secondary/outline variant) rather than an invented visual design.
//
// Back on the live PLPs (owner, 2026-09-23, T-Shirts audit follow-up:
// "render relatedLinks on the PLP") after its 2026-08-30 removal, on the
// Activewear, Teamwear and Gear PLP templates. The heading is now generic
// ("You may also be interested in", the owner's own suggested wording)
// since some lists cross groups (e.g. Soccer links to Compression & Base
// Layers). Renders nothing for an empty list (some Gear categories have
// `relatedLinks: []`), so no orphan heading ever shows.
import { Button } from "@/components/Button";
import { cx } from "@/components/ui/cx";
import { relatedCategories } from "@/components/ui/styles";
import type { RelatedLink } from "@/content/activewear/types";

export type RelatedCategoriesProps = {
  links: RelatedLink[];
  heading?: string;
  /** The section above has no desktop bottom padding (Lifting Gear's SpecTables), so this row supplies the 120px gap itself. */
  afterFlushSection?: boolean;
};

export function RelatedCategories({
  links,
  heading = "You may also be interested in",
  afterFlushSection = false,
}: RelatedCategoriesProps) {
  if (links.length === 0) return null;

  return (
    <section
      className={cx(relatedCategories.section, afterFlushSection && relatedCategories.afterFlushSection)}
      aria-labelledby="related-categories-heading">
      <h2 id="related-categories-heading" className={relatedCategories.heading}>
        {heading}
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
