// content/activewear/categories.ts
// Registry of every real Activewear category PLP, keyed by slug -- the
// single place app/activewear/[category]/page.tsx reads from for both
// generateStaticParams (which categories exist) and per-request lookup
// (which one matches the current URL). Adding a category is adding its
// file here, nothing else in the route.
import { bodysuits } from "./bodysuits";
import { compressionBaseLayers } from "./compression-base-layers";
import { hoodies } from "./hoodies";
import { jackets } from "./jackets";
import { joggers } from "./joggers";
import { jumpsuits } from "./jumpsuits";
import { leggings } from "./leggings";
import { longSleeveTops } from "./long-sleeve-tops";
import { shorts } from "./shorts";
import { sportsBras } from "./sports-bras";
import { sweatshirts } from "./sweatshirts";
import { tankTops } from "./tank-tops";
import { tShirts } from "./t-shirts";
import { trackJackets } from "./track-jackets";
import { tracksuits } from "./tracksuits";
import type { Category } from "./types";

export const categories: Record<string, Category> = {
  leggings,
  "sports-bras": sportsBras,
  shorts,
  "t-shirts": tShirts,
  "tank-tops": tankTops,
  hoodies,
  jackets,
  sweatshirts,
  "long-sleeve-tops": longSleeveTops,
  joggers,
  "compression-base-layers": compressionBaseLayers,
  "track-jackets": trackJackets,
  tracksuits,
  bodysuits,
  jumpsuits,
};
