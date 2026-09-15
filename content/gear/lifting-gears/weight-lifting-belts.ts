// content/gear/lifting-gears/weight-lifting-belts.ts
// Real content for the Weight Lifting Belts category PLP (owner brief,
// 2026-09-15) -- replaces the Phase 1 placeholder stub. Every visible
// string uses "Caprio" (naming rule, locked 2026-09-15: "Capriosports" is
// schema/metadata/domain only). `status: "draft"` gates the whole page
// (noindex, excluded from sitemap.ts, no FAQPage/CollectionPage schema --
// see `Category.status`'s own comment) until the owner confirms it's
// sampled and the specs are real. Every style card is also `status:
// "draft"` (no PDP content exists yet) -- non-clickable cards, no
// generated route.
import type { Category } from "../../activewear/types";

export const weightLiftingBelts: Category = {
  slug: "weight-lifting-belts",
  group: "Gear",
  status: "draft",
  menuLabel: "Weight Lifting Belts",
  manufacturerNoun: "Weight Lifting Belt",
  productNounPlural: "weight lifting belts",
  entityExampleStyles: "lever belts, prong belts, nylon quick-lock belts, and dip belts",
  entityFabrics: "genuine leather, nylon webbing, and neoprene",
  // Verbatim override (see `Category.entityQuestion`/`entityAnswer`'s own
  // comment) -- the brief's own locked "Assembled entity answer", ending in
  // the Caprio/Sialkot/2009 identity line rather than Capriowear's own
  // `companyIdentity` sentence.
  entityQuestion: "What does Caprio manufacture?",
  entityAnswer:
    "Caprio is a custom weight lifting belt manufacturer for gym equipment and fitness brands worldwide. We produce private label and OEM weight lifting belts from raw material to finished packaging, including lever belts, prong belts, nylon quick-lock belts, and dip belts in genuine leather, nylon webbing, and neoprene, with low minimums and full customization. Caprio is a lifting gear and boxing and MMA equipment manufacturer in Sialkot, Pakistan, established in 2009.",
  h1: "Custom Weight Lifting Belts Manufacturer",
  metaTitle: "Custom Weight Lifting Belts Manufacturer",
  metaDescription:
    "Custom weight lifting belts manufacturer, private label and wholesale. Lever, powerlifting, prong, nylon and dip belts, low MOQ. Sialkot, Pakistan.",
  trustBullets: ["MOQ from 50 pieces", "10mm & 13mm thickness tiers", "OEM, ODM & Private label", "DDP to 20+ countries"],
  // No All/Women/Men gender filter on any Capriosports Gear PLP (owner
  // spec, 2026-09-15) -- a B2B gym-equipment buyer, unlike Capriowear's own
  // Activewear/Teamwear categories, has no gender split to filter by.
  showGenderFilter: false,
  gridSubline: "Every style, every thickness tier, made to your brand spec",
  gridSublineMobile: "Every style, every thickness tier, made to your brand spec",
  fabricEyebrow: "MATERIAL OPTIONS",
  fabricHeading: "The material behind every belt tier",
  fabricOptions: [
    {
      fabric: "Genuine leather, 10mm",
      bestFor: "Lever and prong belts, everyday heavy training",
      performance: "The standard competition-adjacent thickness",
    },
    {
      fabric: "Genuine leather, 13mm",
      bestFor: "Lever belts, maximum-rigidity competition use",
      performance: "The thickest, most rigid tier we build",
    },
    {
      fabric: "Nylon webbing",
      bestFor: "Quick-lock and self-locking belts",
      performance: "Lighter, wider adjustable range, roller or Velcro closure",
    },
    {
      fabric: "Neoprene",
      bestFor: "Padded belts",
      performance: "A softer, padded comfort tier, hook-and-loop closure",
    },
  ],
  fabricOptionsHeaders: { fabric: "Material", bestFor: "Best for", performance: "Notes" },
  fabricNote: [
    {
      text: "Width runs 4in on the lever and prong line and up to 6in on the nylon and neoprene lines. Final thickness and width are confirmed on your sample, since belt specs vary by market and by governing body.",
    },
  ],
  fabricPills: ["Genuine leather, 10mm", "Genuine leather, 13mm", "Nylon webbing", "Neoprene"],
  qualityHeading: "A real spec sheet, not a size letter",
  qualitySubline:
    "Most belt manufacturers list a belt by material and a letter size alone. We publish the thickness, the width, and the material on every style, and confirm it on your sample before bulk.",
  qualityPoints: [
    "Thickness and width stated on every style, not hidden behind an enquiry form",
    "Genuine leather, nylon, and neoprene, built to the tier you specify",
    "Digital proof and sample approved before we cut your production run",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From raw material to finished packaging",
  coverageItems: [
    { title: "Thickness and width", body: "10mm and 13mm leather, 4in and 6in width, built to your spec" },
    { title: "Material", body: "Genuine leather, nylon webbing, or neoprene, matched to your reference" },
    { title: "Branding", body: "Embossing, debossing, embroidery, woven labels, and private label" },
    { title: "Finishing", body: "Your labels, hangtags, and retail-ready packaging" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom weight lifting belts, and can I order multiple thicknesses in one run?",
      a: "From 50 pieces per style. You can mix thickness tiers and colors across styles within the same order, scaling to full bulk.",
    },
    {
      q: "What thickness and width do you manufacture, and can you match a specific competition or federation spec?",
      a: "We build 10mm and 13mm leather at 4in width as standard, plus wider nylon and neoprene tiers. If your market has a specific governing-body thickness or width limit, share the specification and we build and confirm your belt against it on sample.",
    },
    {
      q: "What leather do you use, and can I request a different grade?",
      a: "Genuine leather as standard, cowhide-based. If your program needs a specific grade, tanning method, or a synthetic alternative, tell us your reference and we source and confirm it on your sample.",
    },
    {
      q: "How do you handle sizing for a private label order?",
      a: "We build to your own pattern or a reference belt you send, so every reorder stays consistent with your existing size run rather than a generic default.",
    },
    {
      q: "What branding and customization can you apply to the belt itself?",
      a: "Embossing, debossing, embroidery, woven labels, and full private label, on leather, nylon, and neoprene alike. Send your logo and we confirm the method and placement on your sample.",
    },
    {
      q: "Will my belt design and spec sheet stay protected?",
      a: "Yes. We sign an NDA before any tech pack or spec sheet is shared, and every belt is produced entirely under your brand.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch, or a reference belt by email or WhatsApp. We reply within 24 hours with next steps.",
    },
  ],
  ctaReferenceNoun: "belt",
  styleCards: [
    {
      status: "draft",
      slug: "lever-belt",
      cardTitle: "Custom Leather Lever Belt",
      cardSubline: "10mm and 13mm, 4in width, the flagship competition style",
      image: "",
      imageAlt: "Custom leather lever weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/lever-belt",
    },
    {
      status: "draft",
      slug: "prong-belt",
      cardTitle: "Custom Leather Prong Belt",
      cardSubline: "Single and double prong, 7mm to 10mm",
      image: "",
      imageAlt: "Custom leather prong weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/prong-belt",
    },
    {
      status: "draft",
      slug: "nylon-quick-lock-belt",
      cardTitle: "Custom Nylon Quick-Lock Belt",
      cardSubline: "Self-locking roller buckle, adjustable",
      image: "",
      imageAlt: "Custom nylon quick-lock weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/nylon-quick-lock-belt",
    },
    {
      status: "draft",
      slug: "dip-belt",
      cardTitle: "Custom Dip Belt",
      cardSubline: "Leather or nylon pad with a steel chain, for weighted pull-ups and dips",
      image: "",
      imageAlt: "Custom dip belt with steel chain",
      href: "/lifting-gears/weight-lifting-belts/dip-belt",
    },
    {
      status: "draft",
      slug: "neoprene-padded-belt",
      cardTitle: "Custom Neoprene Padded Belt",
      cardSubline: "Padded comfort tier, hook-and-loop closure",
      image: "",
      imageAlt: "Custom neoprene padded weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/neoprene-padded-belt",
    },
    {
      status: "draft",
      slug: "womens-belt",
      cardTitle: "Custom Women's Weight Lifting Belt",
      cardSubline: "A narrower run and taper built for a women's fit",
      image: "",
      imageAlt: "Custom women's weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/womens-belt",
    },
  ],
  relatedLinks: [
    { label: "Lifting Gear", href: "/lifting-gears" },
    { label: "Boxing and MMA", href: "/boxing-and-mma" },
  ],
};
