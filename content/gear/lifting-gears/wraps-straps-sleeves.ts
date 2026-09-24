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
import { faqGetStarted } from "../../getStarted";

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
    faqGetStarted,
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
    faqGetStarted,
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
      // category PLP instead of an invented/404ing URL. Knee Wraps, Elbow
      // Wraps, and Knee Sleeves are all built, re-pointed at their own
      // PDPs.
      relatedStyleTags: [
        { label: "Knee Wraps", href: "/lifting-gears/wraps-straps-sleeves/knee-wraps" },
        { label: "Elbow Wraps", href: "/lifting-gears/wraps-straps-sleeves/elbow-wraps" },
        { label: "Knee Sleeves", href: "/lifting-gears/wraps-straps-sleeves/knee-sleeves" },
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
      // Second of the 10 Wraps, Straps & Sleeves PDPs (owner brief,
      // 2026-09-17), same pattern as Wrist Wraps/Elbow Wraps -- see Wrist
      // Wraps' own styleCard comment. `status: "draft"` until sampled
      // specs (length, stiffness tiers, stitching) are confirmed real
      // against a factory sample.
      //
      // Product distinction (owner spec, 2026-09-17) -- a knee wrap is
      // cotton elastic construction sized up from a wrist wrap for the
      // knee joint, closing with hook-and-loop at both ends of the wrap.
      // No thumb loop -- that's a wrist-specific feature to anchor the
      // wrap before it goes around the wrist, and there's no thumb to
      // loop through at the knee -- and no nylon webbing, leather, or
      // neoprene sleeve material language anywhere on this style; those
      // belong to the strap/hook/sleeve styles, not this one.
      status: "draft",
      internalPreview: true,
      slug: "knee-wraps",
      sku: "CAP-WRP-02",
      cardTitle: "Custom Knee Wraps",
      cardSubline: "Competition-length and training-length, single or double color",
      image: "",
      imageAlt: "Custom knee wraps",
      href: "/lifting-gears/wraps-straps-sleeves/knee-wraps",
      pdpTitle: "Knee Wraps",
      images: [
        { alt: "Custom knee wrap, front view" },
        { alt: "Custom knee wrap, worn on model, in use" },
        { alt: "Custom knee wrap, hook-and-loop closure detail, wrap start" },
        { alt: "Custom knee wrap, hook-and-loop closure detail, wrap end" },
        { alt: "Custom knee wrap, stitching detail" },
        { alt: "Custom knee wrap, cotton elastic material close-up" },
        { alt: "Custom knee wrap, rolled, flat lay" },
        { alt: "Custom knee wrap, color range" },
        { alt: "Custom knee wrap, private label packaging" },
      ],
      pdpHeading: "Custom Knee Wraps Manufacturer",
      pdpDescription:
        "A custom and private label knee wrap, cotton elastic construction with a hook-and-loop closure, training and competition length built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Knee Wraps Manufacturer",
      pdpMetaDescription:
        "Custom knee wraps manufacturer, training and competition length, built to your spec. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Cotton elastic",
      pdpFabricPills: ["Cotton elastic", "Hook-and-loop closure", "3in width"],
      pdpCustomizationPills: ["Length", "Stiffness", "Color", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the length, the stiffness, and the stitching on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Length and width checked against your spec",
        "Stiffness confirmed against your reference sample or stated tier",
        "Hook-and-loop closure and stitching tested under tension",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "Length up to 2m" },
        { icon: "arrowDownAZ", text: "Flexible, medium or stiff" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          {
            title: "Length",
            body: "Training length, or up to 2m competition length, built to your spec",
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
            title: "Color",
            body: "Single or double color, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Color" },
          },
          {
            title: "Branding",
            body: "Woven label, printed logo, custom colorway",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Branding" },
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
        { label: "Style", value: "Knee wrap (base type)" },
        { label: "Material", value: "Cotton elastic, or cotton and rubber blend, your choice" },
        {
          label: "Length",
          value: "Training length, or up to 2m for Equipped-only competition length, built to your spec",
        },
        { label: "Width", value: "3in standard" },
        { label: "Stiffness", value: "Flexible, medium, or stiff, chosen independently of length" },
        { label: "Closure", value: "Hook-and-loop" },
        { label: "Color", value: "Single color or double color, full range" },
        { label: "Branding", value: "Woven or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment -- a tag with no matching
      // reachable sibling PDP links to the parent category PLP instead of
      // an invented/404ing URL. Wrist Wraps, Elbow Wraps, and Knee
      // Sleeves are all built, re-pointed at their own PDPs.
      relatedStyleTags: [
        { label: "Wrist Wraps", href: "/lifting-gears/wraps-straps-sleeves/wrist-wraps" },
        { label: "Elbow Wraps", href: "/lifting-gears/wraps-straps-sleeves/elbow-wraps" },
        { label: "Knee Sleeves", href: "/lifting-gears/wraps-straps-sleeves/knee-sleeves" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      faqs: [
        {
          q: "What is the difference between training length and competition length?",
          a: "Training length suits everyday gym use where speed of wrapping matters more than maximum compression. Competition length, up to 2m, gives lifters more turns and tighter compression for max-effort attempts, and matches the length range used in Equipped divisions.",
        },
        {
          q: "What is the difference between the stiffness tiers?",
          a: "Flexible wraps flex with the knee for general training. Stiff wraps hold their wrap and add near-rigid support for max-effort squats. Medium sits between the two.",
        },
        {
          q: "Can you build to competition dimensions?",
          a: "Yes, up to 2m by 8cm, the IPF limit for Equipped competition. Federation approval is a registration your brand holds with the governing body, not something the factory can certify on your behalf.",
        },
        {
          q: "Can I order single color and double color in the same run?",
          a: "Yes. Mix single color and double color wraps within the same order.",
        },
      ],
    },
    {
      // Third of the 10 Wraps, Straps & Sleeves PDPs (owner brief,
      // 2026-09-16), same pattern as Wrist Wraps -- see that styleCard's
      // own comment. `status: "draft"` until sampled specs are confirmed
      // real.
      status: "draft",
      internalPreview: true,
      slug: "elbow-wraps",
      sku: "CAP-WRP-03",
      cardTitle: "Custom Elbow Wraps",
      cardSubline: "Same construction as our knee wraps, sized for the elbow",
      image: "",
      imageAlt: "Custom elbow wraps",
      href: "/lifting-gears/wraps-straps-sleeves/elbow-wraps",
      pdpTitle: "Elbow Wraps",
      images: [
        { alt: "Custom elbow wraps, front view" },
        { alt: "Custom elbow wraps, worn on model, in use" },
        { alt: "Custom elbow wraps, hook-and-loop closure detail" },
        { alt: "Custom elbow wraps, hook-and-loop closure detail" },
        { alt: "Custom elbow wraps, stitching detail" },
        { alt: "Custom elbow wraps, material close-up" },
        { alt: "Custom elbow wraps, rolled, flat lay" },
        { alt: "Custom elbow wraps, color range" },
        { alt: "Custom elbow wraps, private label packaging" },
      ],
      pdpHeading: "Custom Elbow Wraps Manufacturer",
      pdpDescription:
        "A custom and private label elbow wrap, cotton elastic construction with a hook-and-loop closure, length and stiffness built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Elbow Wraps Manufacturer",
      pdpMetaDescription: "Custom elbow wraps manufacturer, length and stiffness built to your spec. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Cotton elastic",
      pdpFabricPills: ["Cotton elastic", "Hook-and-loop closure", "3in width"],
      pdpCustomizationPills: ["Length", "Stiffness", "Color", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline: "We confirm the length, the stiffness, and the stitching on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Length and width checked against your spec",
        "Stiffness confirmed against your reference sample or stated tier",
        "Hook-and-loop closure and stitching tested under tension",
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
        { label: "Style", value: "Elbow wrap (base type)" },
        { label: "Material", value: "Cotton elastic, or cotton and rubber blend, your choice" },
        { label: "Length", value: "12in, 18in, 24in, or 36in, built to your spec" },
        { label: "Width", value: "3in standard" },
        { label: "Stiffness", value: "Flexible, medium, or stiff, chosen independently of length" },
        { label: "Closure", value: "Hook-and-loop" },
        { label: "Color", value: "Full color range" },
        { label: "Branding", value: "Woven or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment (weight-lifting-belts.ts) -- a
      // tag with no matching reachable sibling PDP links to the parent
      // category PLP instead of an invented/404ing URL. Wrist Wraps, Knee
      // Wraps, and Knee Sleeves are all built, re-pointed at their own
      // PDPs.
      relatedStyleTags: [
        { label: "Wrist Wraps", href: "/lifting-gears/wraps-straps-sleeves/wrist-wraps" },
        { label: "Knee Wraps", href: "/lifting-gears/wraps-straps-sleeves/knee-wraps" },
        { label: "Knee Sleeves", href: "/lifting-gears/wraps-straps-sleeves/knee-sleeves" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      faqs: [
        {
          q: "What length should I choose?",
          a: "Shorter wraps, 12in to 18in, suit lifters who want more mobility and a faster wrap. Longer wraps, 24in to 36in, suit heavier pressing work where more turns and tighter compression matter. Tell us your athlete profile and we recommend a length, or supply your own spec.",
        },
        {
          q: "What is the difference between the stiffness tiers?",
          a: "Flexible wraps flex with the elbow for general training. Stiff wraps hold their wrap and add near-rigid support for heavy pressing work. Medium sits between the two.",
        },
        {
          q: "Are elbow wraps used in competition?",
          a: "Elbow wraps are not part of the standard powerlifting equipment list the way wrist wraps and knee wraps are, so there is no published federation dimension limit for them. We build them primarily for training support, matched to your spec.",
        },
      ],
    },
    {
      // Fourth of the 10 Wraps, Straps & Sleeves PDPs (owner brief,
      // 2026-09-17), same pattern as Wrist Wraps/Elbow Wraps/Lifting
      // Hook -- see Wrist Wraps' own styleCard comment. `status: "draft"`
      // until sampled specs (cuff width, padding, D-ring attachment) are
      // confirmed real against a factory sample.
      //
      // Product distinction (owner spec, 2026-09-17) -- an ankle strap is
      // a padded cuff (nylon webbing shell, neoprene padded interior)
      // that wraps around the ankle and clips to a cable machine
      // attachment via a metal D-ring, for cable kickbacks, hip
      // abduction, and leg extension work. It is NOT a lifting strap
      // (wraps around the wrist and bar to extend grip on a pull) and NOT
      // a wrap (compresses a joint for support under load) -- no thumb
      // loop language, no hook-and-loop-versus-buckle-for-a-bar language,
      // no wrap-style stiffness tiers anywhere on this style. Cuff width
      // is 2in to 3in, deliberately wider than a lifting strap's 1in to
      // 1.5in, since this cuff sits under constant pull against the ankle
      // joint through a full set and needs comfort and load spread a
      // narrow bar-wrapping strap does not -- never reuse the lifting
      // strap's narrower width here.
      status: "draft",
      internalPreview: true,
      slug: "ankle-straps",
      sku: "CAP-WRP-04",
      cardTitle: "Custom Ankle Straps",
      cardSubline: "Adjustable cuff for cable and resistance work",
      image: "",
      imageAlt: "Custom ankle straps",
      href: "/lifting-gears/wraps-straps-sleeves/ankle-straps",
      pdpTitle: "Ankle Straps",
      images: [
        { alt: "Custom ankle strap, nylon and neoprene cable cuff with D-ring attachment, front view" },
        { alt: "Custom ankle strap, worn on model, clipped to a cable machine attachment, in use" },
        { alt: "Custom ankle strap, metal D-ring attachment detail" },
        { alt: "Custom ankle strap, hook-and-loop closure detail" },
        { alt: "Custom ankle strap, neoprene padded interior close-up" },
        { alt: "Custom ankle strap, nylon webbing shell material close-up" },
        { alt: "Custom ankle strap, stitching detail" },
        { alt: "Custom ankle strap, color range" },
        { alt: "Custom ankle strap, private label packaging" },
      ],
      pdpHeading: "Custom Ankle Straps Manufacturer",
      pdpDescription:
        "A custom and private label ankle strap, a padded cuff with a D-ring attachment for cable machine work, built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Ankle Straps Manufacturer",
      pdpMetaDescription:
        "Custom ankle straps manufacturer, padded cable cuff, adjustable, built to your spec. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Nylon webbing shell, neoprene padded interior",
      pdpFabricPills: ["Nylon webbing shell", "Neoprene padded interior", "D-ring attachment", "Hook-and-loop closure"],
      pdpCustomizationPills: ["Cuff width", "Padding thickness", "Color", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the cuff width, the padding, and the D-ring attachment on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Cuff width and closure checked against your spec",
        "Padding checked for comfort and even density under constant pull",
        "D-ring and attachment stitching tested under load",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "2in to 3in cuff width" },
        { icon: "lock", text: "Padded neoprene interior" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          {
            title: "Cuff width",
            body: "2in to 3in, built to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Cuff width" },
          },
          {
            title: "Padding",
            body: "Thickness and density matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Padding" },
          },
          {
            title: "Shell material",
            body: "Nylon webbing weight and finish matched to your reference",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Shell material" },
          },
          {
            title: "Attachment",
            body: "D-ring size and placement to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Attachment" },
          },
          {
            title: "Branding",
            body: "Woven label, printed logo, custom colorway",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Color" },
          },
          {
            title: "Packaging",
            body: "Polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Packaging" },
          },
        ],
      },
      specifications: [
        { label: "Style", value: "Ankle strap (base type)" },
        { label: "Shell material", value: "Nylon webbing, or your reference material" },
        { label: "Padding", value: "Neoprene interior for comfort under constant pull" },
        { label: "Cuff width", value: "2in to 3in, built to your spec" },
        { label: "Closure", value: "Hook-and-loop, adjustable" },
        { label: "Attachment", value: "Metal D-ring, for cable machine clip attachment" },
        { label: "Color", value: "Full color range" },
        { label: "Branding", value: "Woven or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment -- a tag with no matching
      // reachable sibling PDP links to the parent category PLP instead of
      // an invented/404ing URL. Lifting Hook, Cotton Lifting Straps, and
      // Knee Sleeves are all built, re-pointed at their own PDPs.
      relatedStyleTags: [
        { label: "Lifting Hook", href: "/lifting-gears/wraps-straps-sleeves/lifting-hook" },
        { label: "Cotton Lifting Straps", href: "/lifting-gears/wraps-straps-sleeves/cotton-lifting-straps" },
        { label: "Knee Sleeves", href: "/lifting-gears/wraps-straps-sleeves/knee-sleeves" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      // Verbatim PDP shared block override (owner spec, 2026-09-17) --
      // this style's own operational FAQ wording ("mix widths or
      // colors") doesn't fit the category's default wrap-specific block
      // ("mix lengths or colors"), same per-style-override pattern
      // Lifting Hook's own build already established.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix widths or colors?",
          a: "From 50 pieces per style. Mix cuff widths and colors within the same order.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "What is an ankle strap used for?",
          a: "Cable machine work, cable kickbacks, hip abduction, and leg extension exercises, where the strap clips to a cable attachment rather than a barbell. It is not a lifting strap or a wrap.",
        },
        {
          q: "Why is the cuff wider than a lifting strap?",
          a: "An ankle strap sits under constant pull against the ankle joint through a full set, so it is built wider than a lifting strap for comfort and to spread the load, rather than the narrow build a lifting strap uses to wrap around a bar.",
        },
        {
          q: "Can the D-ring be swapped for a different attachment?",
          a: "Yes. Tell us your preferred hardware, D-ring, carabiner loop, or a different fitting, and we confirm it on your sample.",
        },
      ],
    },
    {
      // Fifth of the 10 Wraps, Straps & Sleeves PDPs (owner brief,
      // 2026-09-17), same pattern as Wrist Wraps/Elbow Wraps -- see Wrist
      // Wraps' own styleCard comment. `status: "draft"` until sampled
      // specs (hook coating, attachment types) are confirmed real.
      //
      // Product distinction (owner spec, 2026-09-17) -- a lifting hook is
      // genuinely NOT a lifting strap or a wrap: it's a wrist strap with a
      // rigid/semi-rigid steel hook that catches the bar directly, so
      // there's no re-gripping between reps (a strap must be unwrapped and
      // rewrapped each set; a wrap never touches the bar at all). No thumb
      // loop language, stiffness tiers, or "wraps around the bar" phrasing
      // anywhere on this style -- those belong to the wrap/strap styles,
      // not this one.
      status: "draft",
      internalPreview: true,
      slug: "lifting-hook",
      sku: "CAP-WRP-05",
      cardTitle: "Custom Lifting Hook",
      cardSubline: "Wrist strap and hook, no re-gripping on heavy pulls",
      image: "",
      imageAlt: "Custom lifting hook",
      href: "/lifting-gears/wraps-straps-sleeves/lifting-hook",
      pdpTitle: "Lifting Hook",
      images: [
        { alt: "Custom lifting hook, cotton webbing wrist strap with steel hook, front view" },
        { alt: "Custom lifting hook, worn on model, hooked onto the bar, in use" },
        { alt: "Custom lifting hook, steel hook attachment detail" },
        { alt: "Custom lifting hook, hook-and-loop wrist strap closure detail" },
        { alt: "Custom lifting hook, padded wrist strap detail" },
        { alt: "Custom lifting hook, webbing material close-up" },
        { alt: "Custom lifting hook, flat lay" },
        { alt: "Custom lifting hook, color range" },
        { alt: "Custom lifting hook, private label packaging" },
      ],
      pdpHeading: "Custom Lifting Hook Manufacturer",
      pdpDescription:
        "A custom and private label lifting hook, a wrist strap with a steel hook attachment for heavy pulls, built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Lifting Hook Manufacturer",
      pdpMetaDescription:
        "Custom lifting hook manufacturer, wrist strap and steel hook, fixed or swivel, no re-gripping on heavy pulls. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Cotton or nylon webbing strap, steel hook",
      pdpFabricPills: ["Cotton or nylon webbing strap", "Steel hook", "Padded option", "Hook-and-loop closure"],
      pdpCustomizationPills: ["Webbing material", "Hook coating", "Attachment type", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the strap material, the hook coating, and the attachment type on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Strap stitching and closure checked against your spec",
        "Hook weld and coating tested under load",
        "Fixed and swivel attachments checked for smooth, secure engagement on the bar",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "lock", text: "Fixed or swivel hook" },
        { icon: "arrowDownAZ", text: "Coated or uncoated steel" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          {
            title: "Strap material",
            body: "Cotton or nylon webbing, matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Strap material" },
          },
          {
            title: "Padding",
            body: "Optional, thickness and density matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Padding" },
          },
          {
            title: "Hook coating",
            body: "Coated or uncoated steel, to your spec",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Hook coating" },
          },
          {
            title: "Attachment",
            body: "Fixed or swivel hook, to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Attachment" },
          },
          {
            title: "Branding",
            body: "Woven label, printed logo, custom colorway",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Color" },
          },
          {
            title: "Packaging",
            body: "Polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Packaging" },
          },
        ],
      },
      specifications: [
        { label: "Style", value: "Lifting hook (base type)" },
        { label: "Strap material", value: "Cotton or nylon webbing, or your reference material" },
        { label: "Padding", value: "Optional padded wrist strap, thickness to your spec" },
        { label: "Hook material", value: "Steel" },
        { label: "Hook coating", value: "Coated or uncoated, to your spec" },
        { label: "Attachment", value: "Fixed or swivel hook" },
        { label: "Closure", value: "Hook-and-loop wrist strap, adjustable" },
        { label: "Color", value: "Full color range" },
        { label: "Branding", value: "Woven or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment (weight-lifting-belts.ts) -- a
      // tag with no matching reachable sibling PDP links to the parent
      // category PLP instead of an invented/404ing URL. Ankle Straps,
      // Cotton Lifting Straps, and Nylon Lifting Straps are all built,
      // re-pointed at their own PDPs.
      relatedStyleTags: [
        { label: "Cotton Lifting Straps", href: "/lifting-gears/wraps-straps-sleeves/cotton-lifting-straps" },
        { label: "Nylon Lifting Straps", href: "/lifting-gears/wraps-straps-sleeves/nylon-lifting-straps" },
        { label: "Ankle Straps", href: "/lifting-gears/wraps-straps-sleeves/ankle-straps" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      // Verbatim PDP shared block override (owner spec, 2026-09-17) --
      // this style's own operational FAQ wording ("mix strap materials,
      // hook coatings, and attachment types") doesn't fit the category's
      // default wrap-specific block ("mix lengths or colors"), same
      // per-style-override pattern Weight Lifting Belts' own Nylon/Dip/
      // Neoprene belts already established.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix straps or hook types?",
          a: "From 50 pieces per style. Mix strap materials, hook coatings, and attachment types within the same order.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "What is a lifting hook used for?",
          a: "Heavy pulls, deadlifts, shrugs, and rack pulls, where a lifter's grip would otherwise fail before the target muscle. The hook stays engaged on the bar, so there is no re-gripping between reps.",
        },
        {
          q: "What is the difference between a lifting hook and a lifting strap?",
          a: "Both extend your grip on a pull. A strap wraps around the bar and locks under tension, and must be unwrapped and rewrapped between sets. A hook uses a rigid or semi-rigid hook that catches the bar directly, so there is no wrapping or re-gripping at all.",
        },
        {
          q: "What is the difference between a fixed and a swivel hook?",
          a: "A fixed hook is set at one angle. A swivel hook rotates on the wrist strap, which some lifters prefer for a more natural bar path on certain pulls. Tell us your preference and we confirm it on your sample.",
        },
        {
          q: "Is a lifting hook allowed in powerlifting competition?",
          a: "No. Lifting hooks are not permitted in powerlifting competition under any federation.",
        },
      ],
    },
    {
      // Sixth of the 10 Wraps, Straps & Sleeves PDPs (owner brief,
      // 2026-09-17), same pattern as Wrist Wraps/Elbow Wraps/Lifting
      // Hook/Knee Wraps/Ankle Straps -- see Wrist Wraps' own styleCard
      // comment. `status: "draft"` until sampled specs (length, width,
      // padding options) are confirmed real against a factory sample.
      //
      // Product distinction (owner spec, 2026-09-17) -- a lifting strap
      // is a length of webbing looped around the wrist, then wrapped
      // around the bar and pulled tight so the wrap itself locks under
      // tension. It is NOT a wrap (compresses a joint for support, never
      // touches the bar) and NOT a lifting hook (a rigid steel hook
      // catches the bar directly, no wrapping or re-gripping needed).
      // Critically, no hook-and-loop closure and no thumb loop -- it
      // self-locks by wrap tension alone -- so none of the wrap family's
      // hook-and-loop/thumb-loop language belongs here. No GSM or weave
      // weight figure exists for cotton webbing anywhere in the
      // competitive research, so none is stated here.
      status: "draft",
      internalPreview: true,
      slug: "cotton-lifting-straps",
      sku: "CAP-WRP-06",
      cardTitle: "Custom Cotton Lifting Straps",
      cardSubline: "Heavy-duty cotton webbing, padded or unpadded",
      image: "",
      imageAlt: "Custom cotton lifting straps",
      href: "/lifting-gears/wraps-straps-sleeves/cotton-lifting-straps",
      pdpTitle: "Cotton Lifting Straps",
      images: [
        { alt: "Custom cotton lifting strap, front view" },
        { alt: "Custom cotton lifting strap, worn on model, wrapped around the bar, in use" },
        { alt: "Custom cotton lifting strap, padded wrist" },
        { alt: "Custom cotton lifting strap, unpadded wrist" },
        { alt: "Custom cotton lifting strap, stitching detail" },
        { alt: "Custom cotton lifting strap, cotton webbing material close-up" },
        { alt: "Custom cotton lifting strap, rolled, flat lay" },
        { alt: "Custom cotton lifting strap, color range" },
        { alt: "Custom cotton lifting strap, private label packaging" },
      ],
      pdpHeading: "Custom Cotton Lifting Straps Manufacturer",
      pdpDescription:
        "A custom and private label cotton lifting strap, heavy-duty cotton webbing, padded or unpadded, built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Cotton Lifting Straps Manufacturer",
      pdpMetaDescription:
        "Custom cotton lifting straps manufacturer, padded or unpadded, 18in to 24in. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Heavy-duty cotton webbing",
      pdpFabricPills: ["Cotton webbing", "Neoprene pad, optional", "No hardware closure"],
      pdpCustomizationPills: ["Length", "Width", "Padding", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the length, the width, and the stitching on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Length and width checked against your spec",
        "Webbing tested for bar grip and stitch strength under load",
        "Padding, where specified, checked for placement and even density",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "18in to 24in length" },
        { icon: "lock", text: "Padded or unpadded" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          {
            title: "Length",
            body: "18in to 24in, built to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Length" },
          },
          {
            title: "Width",
            body: "1in to 1.5in, matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Width" },
          },
          {
            title: "Padding",
            body: "Optional neoprene pad, thickness and placement to your spec",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Padding" },
          },
          {
            title: "Material",
            body: "Heavy-duty cotton webbing, weight matched to your reference sample",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Material" },
          },
          {
            title: "Branding",
            body: "Woven label, printed logo, custom colorway",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Color" },
          },
          {
            title: "Packaging",
            body: "Polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Packaging" },
          },
        ],
      },
      specifications: [
        { label: "Style", value: "Lifting strap (base type)" },
        { label: "Material", value: "Heavy-duty cotton webbing, or your reference material" },
        { label: "Length", value: "18in to 24in, built to your spec" },
        { label: "Width", value: "1in to 1.5in" },
        { label: "Padding", value: "Optional neoprene pad at the wrist, thickness to your spec" },
        { label: "Closure", value: "None, wraps and locks under tension around the bar" },
        { label: "Color", value: "Full color range" },
        { label: "Branding", value: "Woven or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment -- a tag with no matching
      // reachable sibling PDP links to the parent category PLP instead of
      // an invented/404ing URL. Lifting Hook, Ankle Straps, and Nylon
      // Lifting Straps are all built, re-pointed at their own PDPs.
      relatedStyleTags: [
        { label: "Lifting Hook", href: "/lifting-gears/wraps-straps-sleeves/lifting-hook" },
        { label: "Ankle Straps", href: "/lifting-gears/wraps-straps-sleeves/ankle-straps" },
        { label: "Nylon Lifting Straps", href: "/lifting-gears/wraps-straps-sleeves/nylon-lifting-straps" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      // Verbatim PDP shared block override (owner spec, 2026-09-17) --
      // this style's own operational FAQ wording ("mix lengths or
      // padding") doesn't fit the category's default wrap-specific block
      // ("mix lengths or colors"), same per-style-override pattern
      // Lifting Hook/Ankle Straps' own builds already established.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix lengths or padding?",
          a: "From 50 pieces per style. Mix lengths, widths, and padded or unpadded straps within the same order.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "How does a lifting strap work if it has no closure?",
          a: "The strap loops around your wrist, then wraps around the bar and is pulled tight. The wrap itself locks under tension as you grip the bar, no hook-and-loop or buckle needed.",
        },
        {
          q: "What is the difference between a lifting strap and a lifting hook?",
          a: "Both extend your grip on a pull. A strap wraps around the bar and locks under tension, and must be unwrapped and rewrapped between sets. A hook uses a rigid or semi-rigid hook that catches the bar directly, so there is no wrapping or re-gripping at all.",
        },
        {
          q: "Why choose cotton over nylon?",
          a: "Cotton webbing grips the bar with more bite and less stretch than nylon, which many lifters prefer for maximum-effort pulls. Nylon is lighter and available in a wider color range. We build both, so this comes down to your brand's preference.",
        },
        {
          q: "Are lifting straps allowed in powerlifting competition?",
          a: "No. Lifting straps are not permitted in powerlifting competition under any federation.",
        },
      ],
    },
    {
      // Seventh of the 10 Wraps, Straps & Sleeves PDPs (owner brief,
      // 2026-09-17), same pattern as Wrist Wraps/Elbow Wraps/Lifting
      // Hook/Knee Wraps/Ankle Straps/Cotton Lifting Straps -- see Wrist
      // Wraps' own styleCard comment. `status: "draft"` until sampled
      // specs (length, width, padding options) are confirmed real against
      // a factory sample.
      //
      // Product distinction (owner spec, 2026-09-17) -- a lifting strap
      // is a length of nylon webbing looped around the wrist, then
      // wrapped around the bar and pulled tight so the wrap itself locks
      // under tension -- identical mechanism to Cotton Lifting Straps,
      // only the material differs. It is NOT a wrap (compresses a joint
      // for support, never touches the bar) and NOT a lifting hook (a
      // rigid steel hook catches the bar directly, no wrapping or
      // re-gripping needed). No hook-and-loop closure, no thumb loop --
      // it self-locks by wrap tension alone. No GSM or weight figure
      // exists for nylon webbing anywhere in the competitive research, so
      // none is stated here.
      status: "draft",
      internalPreview: true,
      slug: "nylon-lifting-straps",
      sku: "CAP-WRP-07",
      cardTitle: "Custom Nylon Lifting Straps",
      cardSubline: "Nylon webbing, lighter weight, wider color range",
      image: "",
      imageAlt: "Custom nylon lifting straps",
      href: "/lifting-gears/wraps-straps-sleeves/nylon-lifting-straps",
      pdpTitle: "Nylon Lifting Straps",
      images: [
        { alt: "Custom nylon lifting strap, front view" },
        { alt: "Custom nylon lifting strap, worn on model, wrapped around the bar, in use" },
        { alt: "Custom nylon lifting strap, padded wrist" },
        { alt: "Custom nylon lifting strap, unpadded wrist" },
        { alt: "Custom nylon lifting strap, stitching detail" },
        { alt: "Custom nylon lifting strap, nylon webbing material close-up" },
        { alt: "Custom nylon lifting strap, rolled, flat lay" },
        { alt: "Custom nylon lifting strap, wide color range" },
        { alt: "Custom nylon lifting strap, private label packaging" },
      ],
      pdpHeading: "Custom Nylon Lifting Straps Manufacturer",
      pdpDescription:
        "A custom and private label nylon lifting strap, lightweight webbing in a wide color range, padded or unpadded, built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Nylon Lifting Straps Manufacturer",
      pdpMetaDescription:
        "Custom nylon lifting straps manufacturer, lightweight webbing, wide color range, 18in to 24in. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Nylon webbing",
      pdpFabricPills: ["Nylon webbing", "Neoprene pad, optional", "No hardware closure"],
      pdpCustomizationPills: ["Length", "Width", "Padding", "Color", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the length, the width, and the stitching on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Length and width checked against your spec",
        "Webbing tested for bar grip and stitch strength under load",
        "Padding, where specified, checked for placement and even density",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "18in to 24in length" },
        { icon: "arrowDownAZ", text: "Wide color range" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          {
            title: "Length",
            body: "18in to 24in, built to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Length" },
          },
          {
            title: "Width",
            body: "1in to 1.5in, matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Width" },
          },
          {
            title: "Padding",
            body: "Optional neoprene pad, thickness and placement to your spec",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Padding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Color" },
          },
          {
            title: "Branding",
            body: "Woven label, printed logo, custom colorway",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Branding" },
          },
          {
            title: "Packaging",
            body: "Polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" },
          },
        ],
      },
      specifications: [
        { label: "Style", value: "Lifting strap (base type)" },
        { label: "Material", value: "Nylon webbing, or your reference material" },
        { label: "Length", value: "18in to 24in, built to your spec" },
        { label: "Width", value: "1in to 1.5in" },
        { label: "Padding", value: "Optional neoprene pad at the wrist, thickness to your spec" },
        { label: "Closure", value: "None, wraps and locks under tension around the bar" },
        { label: "Color", value: "Full color range, wider than cotton or leather" },
        { label: "Branding", value: "Woven or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment -- a tag with no matching
      // reachable sibling PDP links to the parent category PLP instead of
      // an invented/404ing URL. Cotton Lifting Straps, Leather Lifting
      // Straps, and Lifting Hook are all now built, re-pointed at their
      // own PDPs.
      relatedStyleTags: [
        { label: "Cotton Lifting Straps", href: "/lifting-gears/wraps-straps-sleeves/cotton-lifting-straps" },
        { label: "Leather Lifting Straps", href: "/lifting-gears/wraps-straps-sleeves/leather-lifting-straps" },
        { label: "Lifting Hook", href: "/lifting-gears/wraps-straps-sleeves/lifting-hook" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      // Verbatim PDP shared block override (owner spec, 2026-09-17) --
      // this style's own operational FAQ wording ("mix lengths or
      // padding") doesn't fit the category's default wrap-specific block
      // ("mix lengths or colors"), same per-style-override pattern
      // Cotton Lifting Straps' own build already established.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix lengths or padding?",
          a: "From 50 pieces per style. Mix lengths, widths, and padded or unpadded straps within the same order.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "How does a lifting strap work if it has no closure?",
          a: "The strap loops around your wrist, then wraps around the bar and is pulled tight. The wrap itself locks under tension as you grip the bar, no hook-and-loop or buckle needed.",
        },
        {
          q: "Why choose nylon over cotton?",
          a: "Nylon is lighter, does not absorb sweat the way cotton does, and is available in a wider range of colors for branding. Cotton grips the bar with slightly more bite and less stretch. We build both, so this comes down to your brand's preference and use case.",
        },
        {
          q: "Can I get nylon straps in a specific brand color?",
          a: "Yes. Nylon webbing takes color well and is available across a full range, send your Pantone or a reference swatch and we match it on your sample.",
        },
        {
          q: "Are lifting straps allowed in powerlifting competition?",
          a: "No. Lifting straps are not permitted in powerlifting competition under any federation.",
        },
      ],
    },
    {
      // Eighth of the 10 Wraps, Straps & Sleeves PDPs (owner brief,
      // 2026-09-17), last of the 3 lifting strap materials (cotton,
      // nylon, leather) -- same pattern as those two, see Cotton Lifting
      // Straps' own styleCard comment. `status: "draft"` until sampled
      // specs (length, width, leather grade) are confirmed real against a
      // factory sample.
      //
      // Product distinction (owner spec, 2026-09-17) -- a lifting strap
      // is a length of material looped around the wrist, then wrapped
      // around the bar and pulled tight so the wrap itself locks under
      // tension -- identical mechanism to Cotton/Nylon Lifting Straps,
      // only the material differs. It is NOT a wrap (compresses a joint
      // for support, never touches the bar) and NOT a lifting hook (a
      // rigid steel hook catches the bar directly, no wrapping or
      // re-gripping needed). No hook-and-loop closure, no thumb loop --
      // it self-locks by wrap tension alone. No leather grade or tanning
      // method invented (no "full-grain"/"top-grain" claim) -- no
      // manufacturer in the competitive research states one, same
      // discipline already applied to cotton's GSM and nylon's weight.
      // Suede is a real, research-grounded finish option (Dark Iron
      // Fitness, Rogue, elitefts all sell leather/suede straps), not
      // invented.
      status: "draft",
      internalPreview: true,
      slug: "leather-lifting-straps",
      sku: "CAP-WRP-08",
      cardTitle: "Custom Leather Lifting Straps",
      cardSubline: "Genuine leather, the durable, no-stretch option",
      image: "",
      imageAlt: "Custom leather lifting straps",
      href: "/lifting-gears/wraps-straps-sleeves/leather-lifting-straps",
      pdpTitle: "Leather Lifting Straps",
      images: [
        { alt: "Custom leather lifting strap, front view" },
        { alt: "Custom leather lifting strap, worn on model, wrapped around the bar, in use" },
        { alt: "Custom leather lifting strap, smooth finish" },
        { alt: "Custom leather lifting strap, suede finish" },
        { alt: "Custom leather lifting strap, stitching detail" },
        { alt: "Custom leather lifting strap, genuine leather material close-up" },
        { alt: "Custom leather lifting strap, rolled, flat lay" },
        { alt: "Custom leather lifting strap, natural and dyed color range" },
        { alt: "Custom leather lifting strap, private label packaging" },
      ],
      pdpHeading: "Custom Leather Lifting Straps Manufacturer",
      pdpDescription:
        "A custom and private label leather lifting strap, genuine leather with a smooth or suede finish, durable and no-stretch, built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Leather Lifting Straps Manufacturer",
      pdpMetaDescription:
        "Custom leather lifting straps manufacturer, durable, no-stretch, smooth or suede finish. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Genuine leather",
      pdpFabricPills: ["Genuine leather", "Smooth or suede finish", "No hardware closure"],
      pdpCustomizationPills: ["Length", "Width", "Finish", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the length, the width, and the stitching on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Length and width checked against your spec",
        "Leather checked for consistent finish and even thickness across the run",
        "Stitching tested under load, since a leather strap sees no stretch to absorb tension the way webbing does",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "18in to 24in length" },
        { icon: "lock", text: "No-stretch construction" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          {
            title: "Length",
            body: "18in to 24in, built to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Length" },
          },
          {
            title: "Width",
            body: "1in to 1.5in, matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Width" },
          },
          {
            title: "Finish",
            body: "Smooth or suede leather, to your spec",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Finish" },
          },
          {
            title: "Color",
            body: "Natural tones or dyed, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Color" },
          },
          {
            title: "Branding",
            body: "Debossed logo, stamped mark, or printed branding, custom colorway",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Branding" },
          },
          {
            title: "Packaging",
            body: "Polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" },
          },
        ],
      },
      specifications: [
        { label: "Style", value: "Lifting strap (base type)" },
        { label: "Material", value: "Genuine leather, or your reference material" },
        { label: "Finish", value: "Smooth or suede, to your spec" },
        { label: "Length", value: "18in to 24in, built to your spec" },
        { label: "Width", value: "1in to 1.5in" },
        { label: "Closure", value: "None, wraps and locks under tension around the bar" },
        { label: "Stretch", value: "No stretch under tension, unlike cotton or nylon webbing" },
        { label: "Color", value: "Natural leather tones, or dyed to your spec" },
        { label: "Branding", value: "Debossed, stamped, or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment -- a tag with no matching
      // reachable sibling PDP links to the parent category PLP instead of
      // an invented/404ing URL. Cotton Lifting Straps, Nylon Lifting
      // Straps, and Lifting Hook are all built, re-pointed at their own
      // PDPs -- confirmed both sibling strap PDPs are live before wiring
      // these links.
      relatedStyleTags: [
        { label: "Cotton Lifting Straps", href: "/lifting-gears/wraps-straps-sleeves/cotton-lifting-straps" },
        { label: "Nylon Lifting Straps", href: "/lifting-gears/wraps-straps-sleeves/nylon-lifting-straps" },
        { label: "Lifting Hook", href: "/lifting-gears/wraps-straps-sleeves/lifting-hook" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      // Verbatim PDP shared block override (owner spec, 2026-09-17) --
      // this style's own operational FAQ wording ("mix finishes or
      // lengths") doesn't fit the category's default wrap-specific block
      // ("mix lengths or colors"), same per-style-override pattern
      // Cotton/Nylon Lifting Straps' own builds already established.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix finishes or lengths?",
          a: "From 50 pieces per style. Mix smooth and suede finishes, and lengths, within the same order.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "How does a lifting strap work if it has no closure?",
          a: "The strap loops around your wrist, then wraps around the bar and is pulled tight. The wrap itself locks under tension as you grip the bar, no hook-and-loop or buckle needed.",
        },
        {
          q: "Why choose leather over cotton or nylon?",
          a: "Leather does not stretch under tension the way webbing can, so it holds its wrap tighter for longer and tends to outlast cotton or nylon under heavy repeated use. Cotton and nylon are lighter and more affordable at volume. We build all three, so this comes down to your brand's positioning and price point.",
        },
        {
          q: "What is the difference between the smooth and suede finish?",
          a: "Smooth leather has a polished, uniform surface. Suede has a napped, textured surface. Both are genuine leather, the finish is a surface treatment, not a different material.",
        },
        {
          q: "Are lifting straps allowed in powerlifting competition?",
          a: "No. Lifting straps are not permitted in powerlifting competition under any federation.",
        },
      ],
    },
    {
      // Ninth of the 10 Wraps, Straps & Sleeves PDPs (owner brief,
      // 2026-09-17), same pattern as every other built PDP in this
      // category -- see Wrist Wraps' own styleCard comment. `status:
      // "draft"` until sampled specs (thickness range, neoprene vs. SBR
      // options, seam construction) are confirmed real against a factory
      // sample.
      //
      // Product distinction (owner spec, 2026-09-17) -- the biggest
      // construction difference in this whole category: a knee sleeve is
      // a continuous neoprene cylinder, pulled on over the knee, with NO
      // closure hardware of any kind. No hook-and-loop, no strapping, no
      // drawstring, no thumb loop -- unlike every other style here (wraps
      // close with hook-and-loop, ankle straps close with hook-and-loop
      // and a D-ring, lifting straps self-lock by wrap tension). Sized by
      // thickness in mm, not length -- no manufacturer in the competitive
      // research publishes a sleeve length figure, so none is stated
      // here, and no sizing/circumference chart either, per the sitewide
      // no-sizing-chart rule (holds here even though this product type is
      // typically sold by circumference elsewhere).
      status: "draft",
      internalPreview: true,
      slug: "knee-sleeves",
      sku: "CAP-WRP-09",
      cardTitle: "Custom Knee Sleeves",
      cardSubline: "3mm to 7mm neoprene, training to competition thickness",
      image: "",
      imageAlt: "Custom knee sleeves",
      href: "/lifting-gears/wraps-straps-sleeves/knee-sleeves",
      pdpTitle: "Knee Sleeves",
      images: [
        { alt: "Custom knee sleeve, 7mm neoprene, front view" },
        { alt: "Custom knee sleeve, worn on model, in use" },
        { alt: "Custom knee sleeve, pull-on construction, no closure hardware" },
        { alt: "Custom knee sleeve, seam detail" },
        { alt: "Custom knee sleeve, bound edge detail" },
        { alt: "Custom knee sleeve, neoprene material close-up" },
        { alt: "Custom knee sleeve, flat lay" },
        { alt: "Custom knee sleeve, color range" },
        { alt: "Custom knee sleeve, private label packaging" },
      ],
      pdpHeading: "Custom Knee Sleeves Manufacturer",
      pdpDescription:
        "A custom and private label knee sleeve, a continuous neoprene cylinder in 3mm to 9mm thickness, built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Knee Sleeves Manufacturer",
      pdpMetaDescription:
        "Custom knee sleeves manufacturer, 3mm to 9mm neoprene, competition dimensions available. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Neoprene, or SBR neoprene blend",
      pdpFabricPills: ["Neoprene or SBR", "Continuous cylinder", "No closure hardware"],
      pdpCustomizationPills: ["Thickness", "Material", "Seam construction", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the thickness, the seam construction, and the fit on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Thickness checked against your spec at multiple points on the sleeve",
        "Neoprene or SBR material confirmed against your reference",
        "Seam and edge construction checked for durability under repeated pull-on use",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "3mm to 9mm thickness" },
        { icon: "lock", text: "Competition dimension available" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          {
            title: "Thickness",
            body: "3mm, 5mm, 7mm, or 9mm, built to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Thickness" },
          },
          {
            title: "Material",
            body: "Neoprene or SBR neoprene blend, matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Material" },
          },
          {
            title: "Seam construction",
            body: "Single seam or bound edge, to your spec",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Seam construction" },
          },
          {
            title: "Fit",
            body: "Sized to your reference piece or sample, no generic size chart",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit" },
          },
          {
            title: "Branding",
            body: "Woven label, printed logo, custom colorway",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Color" },
          },
          {
            title: "Packaging",
            body: "Polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Packaging" },
          },
        ],
      },
      specifications: [
        { label: "Style", value: "Knee sleeve (base type)" },
        { label: "Material", value: "Neoprene, or SBR neoprene blend, your choice" },
        { label: "Thickness", value: "3mm, 5mm, 7mm, or 9mm (9mm is training-only, exceeds competition maximum)" },
        { label: "Construction", value: "Continuous cylinder, pull-on, no closure hardware" },
        { label: "Seam", value: "Single seam or bound edge, to your spec" },
        { label: "Length", value: "Built to your reference, sized to fit the knee" },
        { label: "Color", value: "Full color range" },
        { label: "Branding", value: "Woven or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment -- a tag with no matching
      // reachable sibling PDP links to the parent category PLP instead of
      // an invented/404ing URL. Elbow Sleeves, Knee Wraps, and Ankle
      // Straps are all now built, re-pointed at their own PDPs -- the
      // category's own last PDP to ship, so every related-style link
      // across the whole category can now be real.
      relatedStyleTags: [
        { label: "Elbow Sleeves", href: "/lifting-gears/wraps-straps-sleeves/elbow-sleeves" },
        { label: "Knee Wraps", href: "/lifting-gears/wraps-straps-sleeves/knee-wraps" },
        { label: "Ankle Straps", href: "/lifting-gears/wraps-straps-sleeves/ankle-straps" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      // Verbatim PDP shared block override (owner spec, 2026-09-17) --
      // this style's own operational FAQ wording ("mix thicknesses")
      // doesn't fit the category's default wrap-specific block ("mix
      // lengths or colors"), same per-style-override pattern every other
      // built PDP in this category already established.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix thicknesses?",
          a: "From 50 pieces per style. Mix thicknesses and colors within the same order.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "What is the difference between a knee sleeve and a knee wrap?",
          a: "A sleeve is a continuous neoprene cylinder that pulls on, with no closure hardware at all. A wrap is a length of elastic material that wraps around the knee and closes with hook-and-loop, letting the lifter control compression by how tightly they wrap it.",
        },
        {
          q: "What thickness should I choose?",
          a: "3mm suits light support and mobility work. 5mm is a common middle ground for general training. 7mm is the maximum thickness permitted in IPF competition and gives the most support. 9mm is a training-only option for lifters who want maximum compression outside of competition.",
        },
        {
          q: "Can you build to competition dimensions?",
          a: "Yes, 7mm thick, up to 30cm, single-ply neoprene or neoprene plus a single non-supportive fabric layer, continuous cylinder, no strapping, hook-and-loop, drawstrings, or padding. Federation approval is a registration your brand holds with the governing body, not something the factory can certify on your behalf.",
        },
        {
          q: "What is the difference between neoprene and SBR?",
          a: "Both are synthetic rubber-based materials used in knee sleeves. SBR is a specific type sometimes blended with neoprene for a different feel and cost point. Tell us your preference and we confirm it on your sample.",
        },
      ],
    },
    {
      // Tenth and final of the 10 Wraps, Straps & Sleeves PDPs (owner
      // brief, 2026-09-17), same pattern as every other built PDP in this
      // category -- see Wrist Wraps' own styleCard comment. `status:
      // "draft"` until sampled specs (thickness range, neoprene vs. SBR
      // options, seam construction) are confirmed real against a factory
      // sample.
      //
      // Product distinction (owner spec, 2026-09-17) -- identical
      // construction to Knee Sleeves, only the joint differs: a
      // continuous neoprene cylinder, pulled on over the elbow, with NO
      // closure hardware of any kind. No hook-and-loop, no strapping, no
      // drawstring, no thumb loop. Thickness range matches Knee Sleeves
      // exactly (3mm/5mm/7mm/9mm, 9mm training-only). The IPF's published
      // competition dimension (7mm, 30cm, single-ply neoprene, continuous
      // cylinder, no strapping/padding) is specific to knee sleeves in
      // the research -- no equivalent published elbow sleeve competition
      // standard exists, so this page states real construction and
      // thickness honestly and does NOT claim a competition-legal
      // dimension for elbow sleeves specifically (a per-style FAQ answer
      // says so plainly, rather than silently omitting the question). No
      // sizing/circumference chart, per the sitewide no-sizing-chart rule
      // (holds here even though this product type is typically sold by
      // circumference elsewhere, same as Knee Sleeves). Pair packing and
      // bundling with Knee Sleeves/wraps offered as a real,
      // research-backed wholesale recommendation, not invented.
      status: "draft",
      internalPreview: true,
      slug: "elbow-sleeves",
      sku: "CAP-WRP-10",
      cardTitle: "Custom Elbow Sleeves",
      cardSubline: "5mm neoprene, matched construction to the knee sleeve line",
      image: "",
      imageAlt: "Custom elbow sleeves",
      href: "/lifting-gears/wraps-straps-sleeves/elbow-sleeves",
      pdpTitle: "Elbow Sleeves",
      images: [
        { alt: "Custom elbow sleeve, 7mm neoprene, front view" },
        { alt: "Custom elbow sleeve, worn on model, in use" },
        { alt: "Custom elbow sleeve, pull-on construction, no closure hardware" },
        { alt: "Custom elbow sleeve, seam detail" },
        { alt: "Custom elbow sleeve, bound edge detail" },
        { alt: "Custom elbow sleeve, neoprene material close-up" },
        { alt: "Custom elbow sleeve, flat lay" },
        { alt: "Custom elbow sleeve, color range" },
        { alt: "Custom elbow sleeve, private label packaging" },
      ],
      pdpHeading: "Custom Elbow Sleeves Manufacturer",
      pdpDescription:
        "A custom and private label elbow sleeve, a continuous neoprene cylinder in 3mm to 9mm thickness, matched construction to our knee sleeve line, built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Elbow Sleeves Manufacturer",
      pdpMetaDescription:
        "Custom elbow sleeves manufacturer, 3mm to 9mm neoprene, matched construction to our knee sleeve line. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Neoprene, or SBR neoprene blend",
      pdpFabricPills: ["Neoprene or SBR", "Continuous cylinder", "No closure hardware"],
      pdpCustomizationPills: ["Thickness", "Material", "Seam construction", "Pair packing", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the thickness, the seam construction, and the fit on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Thickness checked against your spec at multiple points on the sleeve",
        "Neoprene or SBR material confirmed against your reference",
        "Seam and edge construction checked for durability under repeated pull-on use",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "3mm to 9mm thickness" },
        { icon: "lock", text: "Pair packing available" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          {
            title: "Thickness",
            body: "3mm, 5mm, 7mm, or 9mm, built to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Thickness" },
          },
          {
            title: "Material",
            body: "Neoprene or SBR neoprene blend, matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Material" },
          },
          {
            title: "Seam construction",
            body: "Single seam or bound edge, to your spec",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Seam construction" },
          },
          {
            title: "Fit",
            body: "Sized to your reference piece or sample, no generic size chart",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit" },
          },
          {
            title: "Packaging",
            body: "Pair packing, or bundled with Knee Sleeves and wraps, polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" },
          },
          {
            title: "Branding",
            body: "Woven label, printed logo, custom colorway",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Color" },
          },
        ],
      },
      specifications: [
        { label: "Style", value: "Elbow sleeve (base type)" },
        { label: "Material", value: "Neoprene, or SBR neoprene blend, your choice" },
        { label: "Thickness", value: "3mm, 5mm, 7mm, or 9mm (9mm is training-only, exceeds competition maximum)" },
        { label: "Construction", value: "Continuous cylinder, pull-on, no closure hardware" },
        { label: "Seam", value: "Single seam or bound edge, to your spec" },
        { label: "Length", value: "Built to your reference, sized to fit the elbow" },
        { label: "Color", value: "Full color range" },
        { label: "Branding", value: "Woven or printed logo, custom labels, packaging" },
      ],
      // Per `relatedStyleTags`' own comment -- a tag with no matching
      // reachable sibling PDP links to the parent category PLP instead of
      // an invented/404ing URL. Knee Sleeves, Elbow Wraps, and Lifting
      // Hook are all confirmed built, re-pointed at their own PDPs -- the
      // last PDP in the category, so no PLP fallback needed.
      relatedStyleTags: [
        { label: "Knee Sleeves", href: "/lifting-gears/wraps-straps-sleeves/knee-sleeves" },
        { label: "Elbow Wraps", href: "/lifting-gears/wraps-straps-sleeves/elbow-wraps" },
        { label: "Lifting Hook", href: "/lifting-gears/wraps-straps-sleeves/lifting-hook" },
        { label: "See All", href: "/lifting-gears/wraps-straps-sleeves" },
      ],
      // Verbatim PDP shared block override (owner spec, 2026-09-17) --
      // this style's own operational FAQ wording ("bundle with other
      // styles," "pair packing") doesn't fit the category's default
      // wrap-specific block ("mix lengths or colors"), same
      // per-style-override pattern every other built PDP in this category
      // already established.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I bundle with other styles?",
          a: "From 50 pieces per style. Bundle elbow sleeves with knee sleeves or wraps in the same order, and pair packing is available.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "What is the difference between an elbow sleeve and an elbow wrap?",
          a: "A sleeve is a continuous neoprene cylinder that pulls on, with no closure hardware at all. A wrap is a length of elastic material that wraps around the elbow and closes with hook-and-loop, letting the lifter control compression by how tightly they wrap it.",
        },
        {
          q: "What thickness should I choose?",
          a: "3mm suits light support and mobility work. 5mm is a common middle ground for general training. 7mm gives the most support and matches the maximum used in knee sleeve competition standards. 9mm is a training-only option for lifters who want maximum compression.",
        },
        {
          q: "What is the difference between neoprene and SBR?",
          a: "Both are synthetic rubber-based materials used in sleeves. SBR is a specific type sometimes blended with neoprene for a different feel and cost point. Tell us your preference and we confirm it on your sample.",
        },
        {
          q: "Is there a competition-legal elbow sleeve dimension?",
          a: "We did not find a published competition standard specific to elbow sleeves the way one exists for knee sleeves. If your brand needs a specific federation spec, tell us the standard and we build to it.",
        },
      ],
    },
  ],
  relatedLinks: [
    { label: "Lifting Gear", href: "/lifting-gears" },
    { label: "Weight Lifting Belts", href: "/lifting-gears/weight-lifting-belts" },
    { label: "Boxing and MMA", href: "/boxing-and-mma" },
  ],
};
