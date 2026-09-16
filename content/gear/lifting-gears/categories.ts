// content/gear/lifting-gears/categories.ts
// Registry for the Lifting Gears hub's own category PLPs, same
// `Record<string, Category>` shape and role as content/teamwear/sports.ts --
// app/lifting-gears/[category]/page.tsx reads this directly. Adding a real
// Lifting Gears category later is adding its own content file here plus one
// line in this registry, same pattern every other division already follows.
import type { Category } from "../../activewear/types";
import { weightLiftingBelts } from "./weight-lifting-belts";
import { wrapsStrapsSleeves } from "./wraps-straps-sleeves";

export const liftingGearsCategories: Record<string, Category> = {
  "weight-lifting-belts": weightLiftingBelts,
  "wraps-straps-sleeves": wrapsStrapsSleeves,
};
