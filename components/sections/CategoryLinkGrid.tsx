// components/sections/CategoryLinkGrid.tsx
// Grouped category/sport-grid section, shared by both hub pages -- one
// instance per mega-menu group (Activewear's 5: Tops, Bottoms, Sets &
// One-Pieces, Outerwear & Suits, Base Layers; Teamwear's 2: Uniforms,
// Others -- owner: "teamwear should have 2 categories uniforms and others
// as we used in mega menu"). Renders that group's own eyebrow + H2
// (SectionHeading, TextReveal -- same sitewide pattern every other section
// heading uses), then a grid of the shared `CategoryCard`
// (components/CategoryCard.tsx), each linking straight to its real
// category/sport PLP.
import { CategoryCard } from "@/components/CategoryCard";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { categoryLinkGrid } from "@/components/ui/styles";
import type { CategoryGroup } from "@/content/hubTypes";
import { hubThumbnail } from "@/lib/hubThumbnails";

export type CategoryLinkGridProps = {
  group: CategoryGroup;
  /** Which `public/images/hub-thumbnails/<division>/` folder this group's cards resolve their thumbnails from. */
  division: "activewear" | "teamwear";
};

export function CategoryLinkGrid({ group, division }: CategoryLinkGridProps) {
  return (
    <div className={categoryLinkGrid.group}>
      <SectionHeading
        eyebrow={<TextReveal text={group.eyebrow} />}
        heading={<TextReveal as="span" text={group.h2} />}
        eyebrowTone="light"
        eyebrowSize={categoryLinkGrid.groupEyebrowSize}
        gap={categoryLinkGrid.groupHeadingGap}
        headingSize={categoryLinkGrid.groupHeadingSize}
      />
      <div className={categoryLinkGrid.grid}>
        {group.categories.map((category) => {
          const slug = category.href.split("/").pop() ?? category.href;
          return (
            <CategoryCard
              key={category.href}
              label={category.label}
              descriptor={category.descriptor}
              href={category.href}
              image={hubThumbnail(division, slug, category.label)}
            />
          );
        })}
      </div>
    </div>
  );
}
