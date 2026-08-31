// content/activewear/categories.ts
// Registry of every real Activewear category PLP, keyed by slug -- the
// single place app/activewear/[category]/page.tsx reads from for both
// generateStaticParams (which categories exist) and per-request lookup
// (which one matches the current URL). Adding a category is adding its
// file here, nothing else in the route.
import { leggings } from "./leggings";
import type { Category } from "./types";

export const categories: Record<string, Category> = {
  leggings,
};
