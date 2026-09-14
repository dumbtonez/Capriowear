// content/gear/lifting-gears/weight-lifting-belts.ts
// Phase 1 scaffolding stub (schema/routing wiring only, no real copy) --
// proves the Gear division's Lifting Gears hub can hold a real category on
// the exact same `Category` shape every Activewear/Teamwear category
// already uses (content/activewear/types.ts), same pattern Teamwear's own
// addition followed: only `group: "Gear"` marks this as a Gear category,
// no type change. Every string below is placeholder copy, and the one
// style card is "draft" so it renders no PDP route, no sitemap entry, and
// no CollectionPage/ItemList/Product schema -- see StyleCard's own comment
// for what "draft" guarantees. Real copy is a later phase.
import type { Category } from "../../activewear/types";

export const weightLiftingBelts: Category = {
  slug: "weight-lifting-belts",
  group: "Gear",
  menuLabel: "Weight Lifting Belts",
  manufacturerNoun: "Weight Lifting Belt",
  productNounPlural: "weight lifting belts",
  entityExampleStyles: "placeholder styles pending Phase 4 content",
  entityFabrics: "placeholder materials pending Phase 4 content",
  h1: "Custom Weight Lifting Belt Manufacturer (placeholder)",
  metaTitle: "Custom Weight Lifting Belt Manufacturer",
  metaDescription: "Placeholder meta description -- real copy is a later phase.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 20+ countries"],
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
  ctaReferenceNoun: "belt",
  styleCards: [
    {
      status: "draft",
      slug: "placeholder-style",
      cardTitle: "Placeholder Style",
      cardSubline: "Placeholder -- real copy is a later phase",
      image: "",
      imageAlt: "Placeholder weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/placeholder-style",
    },
  ],
  relatedLinks: [],
};
