// content/gear/boxing-and-mma/hub.ts
// Copy for the Boxing/MMA Landing Hub (/boxing-and-mma) -- see
// content/gear/lifting-gears/hub.ts's own comment for the full reasoning
// (same pattern, sibling division). Placeholder copy throughout.
import type { CategoryGroup } from "../../hubTypes";
import { SITE_URL } from "../../site";

export type { CategoryGroup, CategoryLink } from "../../hubTypes";

export const boxingMmaGroups: CategoryGroup[] = [
  {
    eyebrow: "BOXING & MMA",
    h2: "Placeholder heading",
    categories: [
      {
        label: "Boxing Gloves",
        descriptor: "Placeholder -- real copy is a later phase",
        href: "/boxing-and-mma/boxing-gloves",
      },
    ],
  },
];

export const boxingMmaHub = {
  metaTitle: "Custom Boxing & MMA Gear Manufacturer",
  metaDescription: "Placeholder meta description -- real copy is a later phase.",

  hero: {
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Boxing & MMA", href: "/boxing-and-mma" },
    ],
    h1: "Custom Boxing & MMA Gear Manufacturer",
    trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "Placeholder", "DDP to 20+ countries"],
  },

  faq: {
    eyebrow: "GOOD TO KNOW",
    h2: "Boxing & MMA FAQs,\nanswered",
    items: [{ q: "Placeholder question?", a: "Placeholder answer -- real copy is a later phase." }],
  },

  finalCta: {
    h2: "Let's build your custom collection",
    subline: "Placeholder subline -- real copy is a later phase.",
    cta: { label: "Request a Sample", href: "/request-a-sample" },
    complianceBar: ["NDA before tech pack", "Pre-shipment inspection", "AQL 2.5 inspection", "ISO 9001 certified"],
  },
};

export const BOXING_MMA_HUB_CANONICAL = `${SITE_URL}/boxing-and-mma`;
