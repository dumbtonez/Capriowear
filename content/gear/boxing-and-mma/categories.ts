// content/gear/boxing-and-mma/categories.ts
// Registry for the Boxing/MMA hub's own category PLPs -- see
// content/gear/lifting-gears/categories.ts's own comment for the full
// reasoning (same pattern, sibling division).
import type { Category } from "../../activewear/types";
import { boxingGloves } from "./boxing-gloves";

export const boxingMmaCategories: Record<string, Category> = {
  "boxing-gloves": boxingGloves,
};
