// content/hubTypes.ts
// Shared shape for both hub pages' grouped category/sport grids
// (Activewear's 5 mega-menu groups, Teamwear's 2) -- one definition so
// `CategoryLinkGrid.tsx` and both `content/*/hub.ts` files never drift
// into two slightly different shapes for the same idea.
export type CategoryLink = {
  label: string;
  descriptor: string;
  href: string;
  /**
   * Explicit thumbnail, bypassing `CategoryLinkGrid`'s own `hubThumbnail`
   * slug-lookup convention -- added 2026-09-15 for the Capriosports
   * homepage's own division-switcher band, whose 3 cards (Lifting Gear,
   * Boxing & MMA, Capriowear) don't share one real division folder the
   * way every other `CategoryLinkGrid` group's cards do. Optional; every
   * existing Activewear/Teamwear hub usage omits this and keeps resolving
   * its thumbnail via `hubThumbnail(division, slug, label)` exactly as
   * before.
   */
  image?: { src: string; alt: string };
};

export type CategoryGroup = {
  eyebrow: string;
  h2: string;
  categories: CategoryLink[];
};
