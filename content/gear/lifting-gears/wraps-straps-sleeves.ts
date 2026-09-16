// content/gear/lifting-gears/wraps-straps-sleeves.ts
// Real content for the Wraps, Straps & Sleeves category PLP (owner brief,
// 2026-09-16) -- replaces the earlier "Wraps and Straps" placeholder nav
// entry (content/home.ts's own liftingGearsMegaMenu, renamed alongside this
// file). `status: "draft"` gates the whole page (noindex, excluded from
// sitemap.ts, no FAQPage/ItemList/CollectionPage schema -- see
// `Category.status`'s own comment) until the owner confirms it's sampled
// and the specs are real. Every style card is also `status: "draft"` with
// no `internalPreview` (unlike every Weight Lifting Belts style) -- none of
// the 10 PDPs exist yet, so every card renders non-clickable, no route
// generated, matching the belts PLP's own draft-card pattern.
//
// No `fabricOptions`/`fabricEyebrow`/`fabricHeading`/`fabricNote`/
// `fabricPills` -- this category has no single material-comparison table.
// Its spec info instead lives in `comparisonTable` (the "Three jobs, ten
// styles" table, rendered directly under the hero) and `specTables` (4
// standalone Spec/Options tables, rendered after the trust block) -- see
// both fields' own comments in content/activewear/types.ts.
import type { Category } from "../../activewear/types";

export const wrapsStrapsSleeves: Category = {
  slug: "wraps-straps-sleeves",
  group: "Gear",
  status: "draft",
  menuLabel: "Wraps, Straps & Sleeves",
  manufacturerNoun: "Wraps, Straps & Sleeves",
  productNounPlural: "wraps, straps, and sleeves",
  entityExampleStyles: "wrist wraps, knee wraps, lifting straps, lifting hooks, and knee sleeves",
  entityFabrics: "cotton elastic, nylon webbing, genuine leather, and neoprene",
  // Verbatim override (see `Category.entityQuestion`/`entityAnswer`'s own
  // comment) -- same reasoning as Weight Lifting Belts' own locked entity
  // answer: the Gear division's identity sentence is hand-authored, not
  // routed through the generic Activewear/Teamwear template.
  entityQuestion: "What does Caprio manufacture?",
  entityAnswer:
    "Caprio is a custom wraps, straps, and sleeves manufacturer for gym equipment and fitness brands worldwide. We produce private label and OEM wrist wraps, knee wraps, lifting straps, lifting hooks, and knee sleeves from raw material to finished packaging, in cotton elastic, nylon webbing, genuine leather, and neoprene, with low minimums and full customization. Caprio is a lifting gear and boxing and MMA equipment manufacturer in Sialkot, Pakistan, established in 2009. Capriowear, our activewear and teamwear division, is built in the same facility.",
  h1: "Custom Wraps, Straps & Sleeves Manufacturer",
  metaTitle: "Custom Wraps, Straps & Sleeves Manufacturer",
  metaDescription:
    "Custom wrist wraps, lifting straps, hooks, and knee sleeves manufacturer, private label and wholesale. Length, stiffness, and thickness built to your spec. Sialkot, Pakistan.",
  trustBullets: ["MOQ from 50 pieces", "Ten styles, one factory", "Length, stiffness and thickness built to your spec", "DDP to 20+ countries"],
  showGenderFilter: false,
  gridSubline: "Every style, every spec stated up front.",
  gridSublineMobile: "Every style, every spec stated up front.",
  comparisonTable: {
    eyebrow: "KNOW YOUR CATEGORY",
    heading: "Three jobs, ten styles",
    headers: ["", "Wraps", "Straps and hooks", "Sleeves"],
    rows: [
      {
        label: "What it does",
        values: [
          "Compresses the joint for extra support under load",
          "Extends grip so straps or hooks hold the bar, not your hands",
          "Provides constant compression and warmth through a full range of motion",
        ],
      },
      {
        label: "Key spec",
        values: ["Length and stiffness", "Material and length (straps), grip style (hooks)", "Thickness in millimeters"],
      },
      {
        label: "Competition use",
        values: [
          "Wrist wraps and knee wraps have IPF dimension limits (Equipped only for knee wraps)",
          "Not permitted in powerlifting competition",
          "Knee sleeves have an IPF thickness and length limit",
        ],
      },
    ],
  },
  qualityHeading: "A real spec sheet, not a size letter",
  qualitySubline:
    "Most manufacturers in this category title every SKU the same way and describe wraps and straps without a single number. We publish length, width, stiffness, and thickness on every style, and confirm it on your sample before bulk.",
  qualityPoints: [
    "Length, width, stiffness, and thickness stated on every style, not hidden behind an enquiry form",
    "Cotton elastic, nylon webbing, genuine leather, and neoprene, built to the spec you choose",
    "Digital proof and sample approved before we cut your production run",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From raw material to finished packaging",
  coverageItems: [
    {
      title: "Length and stiffness",
      body: "Length and stiffness (wraps), material and padding (straps), grip and coating (hooks), or thickness (sleeves), built to your spec",
    },
    { title: "Material", body: "Cotton elastic, nylon webbing, genuine leather, or neoprene, matched to your reference" },
    { title: "Branding", body: "Embroidery, screen print, sublimation, woven labels, and private label" },
    { title: "Finishing", body: "Your labels, hangtags, and retail-ready packaging" },
  ],
  specTables: [
    {
      eyebrow: "WRAP SPECS",
      heading: "Length and stiffness, chosen independently",
      rows: [
        { label: "Length", value: "12in, 18in, 24in, 36in (wrist and elbow), up to 2m (knee, Equipped-only competition length)" },
        { label: "Width", value: "3in standard" },
        { label: "Stiffness", value: "Flexible, medium, stiff, chosen independently of length" },
        { label: "Material", value: "Cotton elastic, or cotton and rubber blend" },
        { label: "Closure", value: "Thumb loop, hook and loop" },
      ],
    },
    {
      eyebrow: "STRAP SPECS",
      heading: "Material first, then length and padding",
      rows: [
        { label: "Material", value: "Cotton webbing, nylon webbing, or genuine leather" },
        { label: "Length", value: "18in to 24in (lifting straps), adjustable cuff (ankle straps)" },
        { label: "Width", value: "1in to 1.5in" },
        { label: "Padding", value: "Neoprene pad, optional, thickness to your spec" },
      ],
    },
    {
      eyebrow: "HOOK SPECS",
      heading: "Built for heavy pulls, no re-gripping",
      rows: [
        { label: "Wrist strap", value: "Cotton or nylon webbing, padded option" },
        { label: "Hook", value: "Steel, coated or uncoated, to your spec" },
        { label: "Attachment", value: "Fixed or swivel hook" },
      ],
    },
    {
      eyebrow: "SLEEVE SPECS",
      heading: "Thickness, stated in millimeters, not a size letter alone",
      rows: [
        { label: "Thickness", value: "3mm, 5mm, 7mm" },
        { label: "Material", value: "Neoprene" },
        { label: "Construction", value: "Continuous cylinder, bound edges" },
        { label: "Sizing", value: "Measured by knee or elbow circumference, confirmed on sample" },
      ],
    },
  ],
  // Reference note, not a certification claim (owner spec, 2026-09-16) --
  // shared across all 4 specTables above, rendered once after the last one.
  specTablesNote: [
    {
      text: "The IPF caps wrist wraps at 1m by 8cm, knee wraps at 2m by 8cm (Equipped competitions only), and knee sleeves at 7mm by 30cm. Caprio builds to these dimensions on request. Federation approval requires the brand's own registration with the governing body, not the factory's.",
    },
  ],
  // Verbatim PDP shared block (owner spec, 2026-09-16, Wrist Wraps: "this
  // exact block will be reused verbatim on every Wraps, Straps & Sleeves
  // PDP") -- category-level, same mechanism Weight Lifting Belts' own
  // `pdpFaqOperational` already established, not a per-style copy. Narrower
  // than the PLP's own `faqs` array below (no competition-dimensions Q here
  // -- that's a per-style FAQ instead, since the answer genuinely varies by
  // style's own federation limit, e.g. Wrist Wraps' own 1m by 8cm).
  pdpFaqOperational: [
    {
      q: "What is the MOQ and can I mix lengths or colors?",
      a: "From 50 pieces per style. Mix lengths, stiffness, and colors within the same order.",
    },
    {
      q: "Will my design and spec sheet stay protected?",
      a: "Yes. NDA before any tech pack or spec sheet is shared.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch, or a reference piece by email or WhatsApp. We reply within 24 hours with next steps.",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ, and can I mix lengths, materials, or thicknesses in one run?",
      a: "From 50 pieces per style. Mix lengths, stiffness, materials, and thicknesses across styles within the same order, scaling to full bulk.",
    },
    {
      q: "What is the difference between a wrist wrap and a lifting strap?",
      a: "A wrist wrap compresses and supports the wrist joint under load. A lifting strap wraps around the bar and your wrist to extend your grip, so your hands do not fail before the target muscle does. They solve different problems and most gyms stock both.",
    },
    {
      q: "What is the difference between a lifting strap and a lifting hook?",
      a: "Both extend your grip on a pull. A strap wraps around the bar and locks under tension. A hook uses a rigid or semi-rigid hook that catches the bar directly, so there is no wrapping or re-gripping between reps.",
    },
    {
      q: "Are lifting straps or hooks allowed in powerlifting competition?",
      a: "No. Neither is permitted in powerlifting competition under any federation. Wrist wraps and knee sleeves are permitted within their published dimension limits.",
    },
    {
      q: "Can you build to competition dimensions?",
      a: "Yes. We build wrist wraps, knee wraps, and knee sleeves to the published dimension limits of major federations on request. Note that federation approval is a registration the brand holds with the governing body, not something the factory can certify on your behalf.",
    },
    {
      q: "What stiffness options do you offer on wrist wraps?",
      a: "Flexible, medium, and stiff, available across our full length range as an independent choice, not tied to a single length.",
    },
    {
      q: "Will my design and spec sheet stay protected?",
      a: "Yes. NDA before any tech pack or spec sheet is shared.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch, or a reference piece by email or WhatsApp. We reply within 24 hours with next steps.",
    },
  ],
  ctaReferenceNoun: "piece",
  styleCards: [
    {
      // First of the 10 Wraps, Straps & Sleeves PDPs (owner brief,
      // 2026-09-16) -- "the recommended style to publish first since it's
      // the most comparable across every competitor catalog checked." Same
      // `internalPreview` escape hatch as the belt PDPs -- see Lever Belt
      // styleCard's own comment (content/gear/lifting-gears/weight-lifting-
      // belts.ts). `status: "draft"` until sampled specs are confirmed real.
      status: "draft",
      internalPreview: true,
      slug: "wrist-wraps",
      sku: "CAP-WRP-01",
      cardTitle: "Custom Wrist Wraps",
      cardSubline: "Length and stiffness built to your spec, flexible to stiff",
      image: "",
      imageAlt: "Custom wrist wraps",
      href: "/lifting-gears/wraps-straps-sleeves/wrist-wraps",
      pdpTitle: "Wrist Wraps",
      images: [
        { alt: "Custom wrist wraps, front view" },
        { alt: "Custom wrist wraps, worn on model, in use" },
        { alt: "Custom wrist wraps, thumb loop detail" },
        { alt: "Custom wrist wraps, hook-and-loop closure detail" },
        { alt: "Custom wrist wraps, stitching detail" },
        { alt: "Custom wrist wraps, material close-up" },
        { alt: "Custom wrist wraps, rolled, flat lay" },
        { alt: "Custom wrist wraps, color range" },
        { alt: "Custom wrist wraps, private label packaging" },
      ],
      pdpHeading: "Custom Wrist Wraps Manufacturer",
      pdpDescription:
        "A custom and private label wrist wrap, cotton elastic construction with a thumb loop, length and stiffness built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Wrist Wraps Manufacturer",
      pdpMetaDescription: "Custom wrist wraps manufacturer, length and stiffness built to your spec. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Cotton elastic",
      pdpFabricPills: ["Cotton elastic", "Thumb loop", "Hook-and-loop closure", "3in width"],
      pdpCustomizationPills: ["Length", "Stiffness", "Color", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline: "We confirm the length, the stiffness, and the stitching on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Length and width checked against your spec",
        "Stiffness confirmed against your reference sample or stated tier",
        "Thumb loop and stitching tested under tension",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "Length 12in to 36in" },
        { icon: "arrowDownAZ", text: "Flexible, medium or stiff" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          {
            title: "Length",
            body: "12in to 36in, built to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Length" },
          },
          {
            title: "Stiffness",
            body: "Flexible, medium, or stiff, matched to your reference sample",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Stiffness" },
          },
          {
            title: "Material",
            body: "Cotton elastic, or cotton and rubber blend",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Material" },
          },
          {
            title: "Branding",
            body: "Woven label, printed logo, custom colorway",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" },
          },
          {
            title: "Trims and finish",
            body: "Woven labels, hangtags",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Trims and finish" },
          },
          {
            title: "Packaging",
            body: "Polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Packaging" },
          },
        ],
      },
      specifications: [
        { label: "Style", value: "Wrist wrap (base type)" },
        { label: "Material", value: "Cotton elastic, or cotton and rubber blend, your choice" },
        { label: "Length", value: "12in, 18in, 24in, or 36in, built to your spec" },
        { label: "Width", value: "3in standard" },
        { label: "Stiffness", value: "Flexible, medium, or stiff, chosen independently of length" },
        { label: "Closure", value: "Thumb loop, hook-and-loop" },
        { label: "Color", value: "Full color range" },
        { label: "Branding", value: "Woven or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment (weight-lifting-belts.ts) -- a
      // tag with no matching reachable sibling PDP links to the parent
      // category PLP instead of an invented/404ing URL. Wrist Wraps is the
      // first PDP in this category, so all 3 re-point at the PLP for now;
      // re-point each at its own PDP href as soon as that style is built.
      relatedStyleTags: [
        { label: "Knee Wraps", href: "/lifting-gears/wraps-straps-sleeves" },
        { label: "Elbow Wraps", href: "/lifting-gears/wraps-straps-sleeves" },
        { label: "Knee Sleeves", href: "/lifting-gears/wraps-straps-sleeves" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      faqs: [
        {
          q: "What length should I choose?",
          a: "Shorter wraps, 12in to 18in, suit lifters who want more mobility and a faster wrap. Longer wraps, 24in to 36in, suit max-effort work where more turns and tighter compression matter. Tell us your athlete profile and we recommend a length, or supply your own spec.",
        },
        {
          q: "What is the difference between the stiffness tiers?",
          a: "Flexible wraps flex with the wrist for general training. Stiff wraps hold their wrap and add near-rigid support for max-effort lifts. Medium sits between the two.",
        },
        {
          q: "Can you build to competition dimensions?",
          a: "Yes, up to 1m by 8cm, the IPF limit. Federation approval is a registration your brand holds with the governing body, not something the factory can certify on your behalf.",
        },
      ],
    },
    {
      status: "draft",
      slug: "knee-wraps",
      cardTitle: "Custom Knee Wraps",
      cardSubline: "Competition-length and training-length, single or double color",
      image: "",
      imageAlt: "Custom knee wraps",
      href: "/lifting-gears/wraps-straps-sleeves/knee-wraps",
    },
    {
      status: "draft",
      slug: "elbow-wraps",
      cardTitle: "Custom Elbow Wraps",
      cardSubline: "Same construction as our knee wraps, sized for the elbow",
      image: "",
      imageAlt: "Custom elbow wraps",
      href: "/lifting-gears/wraps-straps-sleeves/elbow-wraps",
    },
    {
      status: "draft",
      slug: "ankle-straps",
      cardTitle: "Custom Ankle Straps",
      cardSubline: "Adjustable cuff for cable and resistance work",
      image: "",
      imageAlt: "Custom ankle straps",
      href: "/lifting-gears/wraps-straps-sleeves/ankle-straps",
    },
    {
      status: "draft",
      slug: "lifting-hook",
      cardTitle: "Custom Lifting Hook",
      cardSubline: "Wrist strap and hook, no re-gripping on heavy pulls",
      image: "",
      imageAlt: "Custom lifting hook",
      href: "/lifting-gears/wraps-straps-sleeves/lifting-hook",
    },
    {
      status: "draft",
      slug: "cotton-lifting-straps",
      cardTitle: "Custom Cotton Lifting Straps",
      cardSubline: "Heavy-duty cotton webbing, padded or unpadded",
      image: "",
      imageAlt: "Custom cotton lifting straps",
      href: "/lifting-gears/wraps-straps-sleeves/cotton-lifting-straps",
    },
    {
      status: "draft",
      slug: "nylon-lifting-straps",
      cardTitle: "Custom Nylon Lifting Straps",
      cardSubline: "Nylon webbing, lighter weight, wider color range",
      image: "",
      imageAlt: "Custom nylon lifting straps",
      href: "/lifting-gears/wraps-straps-sleeves/nylon-lifting-straps",
    },
    {
      status: "draft",
      slug: "leather-lifting-straps",
      cardTitle: "Custom Leather Lifting Straps",
      cardSubline: "Genuine leather, the durable, no-stretch option",
      image: "",
      imageAlt: "Custom leather lifting straps",
      href: "/lifting-gears/wraps-straps-sleeves/leather-lifting-straps",
    },
    {
      status: "draft",
      slug: "knee-sleeves",
      cardTitle: "Custom Knee Sleeves",
      cardSubline: "3mm to 7mm neoprene, training to competition thickness",
      image: "",
      imageAlt: "Custom knee sleeves",
      href: "/lifting-gears/wraps-straps-sleeves/knee-sleeves",
    },
    {
      status: "draft",
      slug: "elbow-sleeves",
      cardTitle: "Custom Elbow Sleeves",
      cardSubline: "5mm neoprene, matched construction to the knee sleeve line",
      image: "",
      imageAlt: "Custom elbow sleeves",
      href: "/lifting-gears/wraps-straps-sleeves/elbow-sleeves",
    },
  ],
  relatedLinks: [
    { label: "Lifting Gear", href: "/lifting-gears" },
    { label: "Weight Lifting Belts", href: "/lifting-gears/weight-lifting-belts" },
    { label: "Boxing and MMA", href: "/boxing-and-mma" },
  ],
};
