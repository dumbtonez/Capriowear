// content/gear/boxing-and-mma/boxing-gloves.ts
// Phase 1 scaffolding stub -- see content/gear/lifting-gears/weight-lifting-belts.ts's
// own header comment for the full reasoning (same pattern, sibling division).
import type { Category } from "../../activewear/types";

export const boxingGloves: Category = {
  slug: "boxing-gloves",
  group: "Gear",
  menuLabel: "Boxing Gloves",
  manufacturerNoun: "Boxing Glove",
  productNounPlural: "boxing gloves",
  entityExampleStyles: "placeholder styles pending Phase 4 content",
  entityFabrics: "placeholder materials pending Phase 4 content",
  h1: "Custom Boxing Glove Manufacturer (placeholder)",
  metaTitle: "Custom Boxing Glove Manufacturer",
  metaDescription: "Placeholder meta description -- real copy is a later phase.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 20+ countries"],
  // No All/Women/Men gender filter on any Capriosports Gear PLP (owner
  // spec, 2026-09-15) -- see weight-lifting-belts.ts's own comment.
  showGenderFilter: false,
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style, made to your brand spec",
  fabricEyebrow: "OPTIONS",
  fabricHeading: "Placeholder heading",
  fabricOptions: [{ fabric: "Placeholder", bestFor: "Placeholder", performance: "Placeholder" }],
  fabricNote: [{ text: "Placeholder note -- real copy is a later phase." }],
  fabricPills: ["Placeholder"],
  qualityHeading: "Placeholder heading",
  qualitySubline: "Placeholder subline.",
  qualityPoints: ["Placeholder", "Placeholder", "Placeholder", "Placeholder"],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "Placeholder heading",
  coverageItems: [{ title: "Placeholder", body: "Placeholder" }],
  faqHeading: "Top questions from B2B buyers",
  faqs: [{ q: "Placeholder question?", a: "Placeholder answer -- real copy is a later phase." }],
  ctaReferenceNoun: "glove",
  styleCards: [
    {
      status: "draft",
      slug: "placeholder-style",
      cardTitle: "Placeholder Style",
      cardSubline: "Placeholder -- real copy is a later phase",
      image: "",
      imageAlt: "Placeholder boxing glove",
      href: "/boxing-and-mma/boxing-gloves/placeholder-style",
    },
  ],
  relatedLinks: [],
};
