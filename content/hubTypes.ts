// content/hubTypes.ts
// Shared shape for both hub pages' grouped category/sport grids
// (Activewear's 5 mega-menu groups, Teamwear's 2) -- one definition so
// `CategoryLinkGrid.tsx` and both `content/*/hub.ts` files never drift
// into two slightly different shapes for the same idea.
export type CategoryLink = {
  label: string;
  descriptor: string;
  href: string;
};

export type CategoryGroup = {
  eyebrow: string;
  h2: string;
  categories: CategoryLink[];
};
