// content/gear/lifting-gears/hub.ts
// Copy for the Lifting Gears Landing Hub (/lifting-gears), same role and
// shape as content/teamwear/hub.ts -- a light browse/directory page one
// level above the real category PLPs (./categories.ts), not a PLP itself.
// Phase 1 scaffolding stub: placeholder copy throughout, proves the routing/
// schema wiring only. Real copy is a later phase.
import type { CategoryGroup } from "../../hubTypes";
import { SITE_URL } from "../../site";

export type { CategoryGroup, CategoryLink } from "../../hubTypes";

export const liftingGearsGroups: CategoryGroup[] = [
  {
    eyebrow: "LIFTING GEARS",
    h2: "Placeholder heading",
    categories: [
      {
        label: "Weight Lifting Belts",
        descriptor: "Placeholder -- real copy is a later phase",
        href: "/lifting-gears/weight-lifting-belts",
      },
      // Category itself stays `status: "draft"` (content/gear/lifting-
      // gears/wraps-straps-sleeves.ts) -- this hub list has no draft
      // gating of its own, so adding this card only makes it visible and
      // clickable HERE, for internal review (owner request, 2026-09-16).
      // The PLP and every style card stay noindexed, excluded from
      // sitemap.ts, and without Product/FAQPage/CollectionPage schema
      // until the owner flips that category's own `status` to
      // "published".
      {
        label: "Gloves & Grips",
        descriptor: "Training gloves, grip pads, and finger-hole grips, five styles, one factory",
        href: "/lifting-gears/weight-lifting-gloves-and-grips",
      },
      {
        label: "Wraps, Straps & Sleeves",
        descriptor: "Wrist wraps, knee wraps, lifting straps, hooks, and knee sleeves, ten styles, one factory",
        href: "/lifting-gears/wraps-straps-sleeves",
      },
    ],
  },
];

export const liftingGearsHub = {
  metaTitle: "Custom Lifting Gear Manufacturer",
  metaDescription: "Placeholder meta description -- real copy is a later phase.",

  hero: {
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Lifting Gears", href: "/lifting-gears" },
    ],
    h1: "Custom Lifting Gear Manufacturer",
    trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "Placeholder", "DDP to 20+ countries"],
  },

  faq: {
    eyebrow: "GOOD TO KNOW",
    h2: "Lifting Gear FAQs,\nanswered",
    items: [{ q: "Placeholder question?", a: "Placeholder answer -- real copy is a later phase." }],
  },

  finalCta: {
    h2: "Let's build your custom collection",
    subline: "Placeholder subline -- real copy is a later phase.",
    cta: { label: "Request a Sample", href: "/request-a-sample" },
    complianceBar: ["NDA before tech pack", "Pre-shipment inspection", "AQL 2.5 inspection", "ISO 9001 certified"],
  },
};

export const LIFTING_GEARS_HUB_CANONICAL = `${SITE_URL}/lifting-gears`;
