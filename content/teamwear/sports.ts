// content/teamwear/sports.ts
// Registry of every real Teamwear sport PLP, keyed by slug -- the exact same
// pattern as content/activewear/categories.ts, read by app/teamwear/[sport]/
// page.tsx and app/teamwear/[sport]/[style]/page.tsx for both
// generateStaticParams and per-request lookup. Adding a sport is adding its
// file here, nothing else in either route.
import { baseball } from "./baseball";
import { basketball } from "./basketball";
import { cricket } from "./cricket";
import { cycling } from "./cycling";
import { fightWear } from "./fight-wear";
import { football } from "./football";
import { iceHockey } from "./ice-hockey";
import { rugby } from "./rugby";
import { soccer } from "./soccer";
import { volleyball } from "./volleyball";
import type { Category } from "../activewear/types";

export const sports: Record<string, Category> = {
  cricket,
  basketball,
  rugby,
  baseball,
  volleyball,
  soccer,
  football,
  "ice-hockey": iceHockey,
  cycling,
  "fight-wear": fightWear,
};
