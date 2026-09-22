// components/sections/ActivewearListing.tsx
// Thin client wrapper around CategoryMetaStrip + the CategoryFilters/
// ProductGrid row (owner spec, Shorts, 2026-09-22): the All/Women/Men chip
// row must actually filter the grid, not just restyle itself. Those two
// pieces are mounted as server-rendered siblings by app/capriowear/
// activewear/[category]/page.tsx with no shared parent state, so the
// `activeGender` selection has to live here, one level up from both.
// Renders in the exact same DOM positions the page used to mount them in
// directly -- this is a pure state-lifting refactor, no markup/layout
// change.
"use client";

import { useState } from "react";

import { CategoryFilters } from "@/components/sections/CategoryFilters";
import { CategoryMetaStrip } from "@/components/sections/CategoryMetaStrip";
import { ProductGrid } from "@/components/sections/ProductGrid";
import type { StyleCard } from "@/content/activewear/types";

export type ActivewearListingProps = {
  slug: string;
  categoryLabel: string;
  categorySubline: string;
  categorySublineMobile: string;
  showGenderFilter?: boolean;
  defaultChip?: string;
  cards: StyleCard[];
};

export function ActivewearListing({
  slug,
  categoryLabel,
  categorySubline,
  categorySublineMobile,
  showGenderFilter,
  defaultChip = "All",
  cards,
}: ActivewearListingProps) {
  const [activeGender, setActiveGender] = useState(defaultChip);

  // A card with no `gender` set (every category built before Shorts) shows
  // under every chip -- see `StyleCard.gender`'s own comment. This keeps
  // every other category's grid identical to its pre-refactor behavior.
  const filteredCards = cards.filter(
    (card) => activeGender === "All" || !card.gender || card.gender === activeGender,
  );

  return (
    <>
      <CategoryMetaStrip
        categoryLabel={categoryLabel}
        categorySubline={categorySubline}
        categorySublineMobile={categorySublineMobile}
        showGenderFilter={showGenderFilter}
        activeChip={activeGender}
        onChipChange={setActiveGender}
      />
      <div id="plp-listing" className="flex flex-col gap-8 max-xl:pb-6 xl:pb-14 xl:flex-row xl:gap-12">
        <CategoryFilters activeSlug={slug} />
        {/* keyed on slug + the active filter: resets ProductGrid's own page
            state on either a category change (pre-existing behavior) or a
            gender-filter change (new -- otherwise a stale page index could
            point past the end of a shorter filtered list). */}
        <ProductGrid key={`${slug}-${activeGender}`} cards={filteredCards} />
      </div>
    </>
  );
}
