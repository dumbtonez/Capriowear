// content/gear/lifting-gears/weight-lifting-gloves-and-grips.ts
// Real content for the Gloves & Grips category PLP (owner brief,
// 2026-09-21). Registry key and URL segment are `weight-lifting-gloves-and-
// grips`, matching the pre-existing nav stub in content/home.ts's own
// `liftingGearsMegaMenu` exactly -- deliberately not the shorter
// `gloves-grips`. `status: "draft"` gates the whole page (noindex, excluded
// from sitemap.ts, no FAQPage/ItemList/CollectionPage schema -- see
// `Category.status`'s own comment). All five style cards are `status:
// "draft"` with no `internalPreview`: none of the five PDPs exist yet, so
// every card renders non-clickable and no PDP route is generated, same as
// the Wraps, Straps & Sleeves PLP's own pre-PDP state.
//
// Scope, deliberately five styles only: Weightlifting Hooks already live
// under Wraps, Straps & Sleeves (Lifting Hook, CAP-WRP-05) and are not
// duplicated here; Palm Protectors, Arm Blasters, Head Harness, and Ab
// Slings are real adjacent accessories whose category placement is
// undecided, so none is added.
//
// Content discipline (owner brief): no padding thickness number, no
// leather grade claim, no branded "air flex" term, no sizing chart, no
// federation/competition-approval claim. No `fabricOptions` -- like Wraps,
// Straps & Sleeves, this category's spec info lives in `comparisonTable`
// and `specTables`.
import type { Category } from "../../activewear/types";

export const weightLiftingGlovesAndGrips: Category = {
  slug: "weight-lifting-gloves-and-grips",
  group: "Gear",
  status: "draft",
  menuLabel: "Gloves & Grips",
  manufacturerNoun: "Gloves & Grips",
  productNounPlural: "gloves and grips",
  entityExampleStyles: "fingerless training gloves, full-finger gloves, grip pads, and finger-hole hand grips",
  entityFabrics: "genuine leather, synthetic leather, neoprene, and breathable mesh",
  entityQuestion: "What does Caprio manufacture?",
  entityAnswer:
    "Caprio is a custom gloves and grips manufacturer for gym equipment and fitness brands worldwide. We produce private label and OEM fingerless training gloves, full-finger gloves, grip pads, and finger-hole hand grips from raw material to finished packaging, in genuine leather, synthetic leather, neoprene, and breathable mesh, with low minimums and full customization. Caprio is a lifting gear and boxing and MMA equipment manufacturer in Sialkot, Pakistan, established in 2009. Capriowear, our activewear and teamwear division, is built in the same facility.",
  h1: "Custom Gloves & Grips Manufacturer",
  metaTitle: "Custom Gloves & Grips Manufacturer",
  metaDescription:
    "Custom training gloves, grip pads, and finger-hole grips manufacturer, private label and wholesale. Material and hole count built to your spec. Sialkot, Pakistan.",
  trustBullets: [
    "MOQ from 50 pieces",
    "Five styles, one factory",
    "Material and hole count built to your spec",
    "DDP to 20+ countries",
  ],
  showGenderFilter: false,
  gridSubline: "Every style, every spec stated up front",
  gridSublineMobile: "Every style, every spec stated up front",
  comparisonTable: {
    eyebrow: "KNOW YOUR CATEGORY",
    heading: "Three ways to protect your grip",
    headers: ["", "Gloves", "Grip pads", "Finger-hole grips"],
    rows: [
      {
        label: "What it does",
        values: [
          "Covers the palm and back of hand for general training",
          "Covers the palm only, a lighter alternative to a full glove",
          "Protects the palm during gymnastics-style pulling movements (pull-ups, muscle-ups)",
        ],
      },
      {
        label: "Key spec",
        values: [
          "Finger coverage (fingerless or full-finger) and palm material",
          "Palm material and closure",
          "Hole count (2-hole or 3-hole) and material",
        ],
      },
      {
        label: "Competition use",
        values: ["Not regulated by any federation", "Not regulated by any federation", "Not regulated by any federation"],
      },
    ],
  },
  qualityHeading: "A real spec sheet, not a letter size alone",
  qualitySubline:
    "Most manufacturers in this category title every SKU identically and size by generic S to XL letters alone. We state material, finger coverage or hole count, and hand measurement guidance on every style, and confirm fit on your sample before bulk.",
  qualityPoints: [
    "Material and construction stated on every style, not hidden behind an enquiry form",
    "Genuine leather, synthetic leather, neoprene, and breathable mesh, built to the spec you choose",
    "Digital proof and sample approved before we cut your production run",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From raw material to finished packaging",
  coverageItems: [
    { title: "Finger coverage or hole count", body: "Finger coverage (gloves), or hole count (grips), built to your spec" },
    {
      title: "Material",
      body: "Genuine leather, synthetic leather, neoprene, or breathable mesh, matched to your reference",
    },
    { title: "Branding", body: "Embroidery, screen print, silicone print, woven labels, and private label" },
    { title: "Finishing", body: "Your labels, hangtags, and retail-ready packaging" },
  ],
  specTables: [
    {
      eyebrow: "GLOVE SPECS",
      heading: "Finger coverage and palm material, chosen independently",
      rows: [
        { label: "Finger coverage", value: "Fingerless (half-finger) or full-finger" },
        { label: "Palm material", value: "Genuine leather, synthetic leather, or neoprene with mesh" },
        { label: "Back of hand", value: "Breathable mesh" },
        { label: "Closure", value: "Hook-and-loop wrist strap" },
        { label: "Sizing", value: "S, M, L, XL, confirmed against your reference hand measurement on sample" },
      ],
    },
    {
      eyebrow: "GRIP PAD SPECS",
      heading: "A lighter alternative to a full glove",
      rows: [
        { label: "Coverage", value: "Palm only, no fingers or back-of-hand panel" },
        { label: "Material", value: "Neoprene, or genuine or synthetic leather" },
        { label: "Closure", value: "Hook-and-loop wrist strap" },
        { label: "Sizing", value: "S, M, L, XL, confirmed against your reference hand measurement on sample" },
      ],
    },
    {
      eyebrow: "GRIP SPECS",
      heading: "Built for pulling movements, not general training",
      rows: [
        { label: "Hole count", value: "2-hole or 3-hole" },
        { label: "Material", value: "Genuine leather, or a synthetic alternative" },
        { label: "Closure", value: "Wrist strap and buckle" },
        {
          label: "Sizing",
          value: "Measured from the wrist crease to the base of the middle finger, hand flat and straight, confirmed on sample",
        },
      ],
    },
  ],
  specTablesNote: [
    {
      text: "No governing body certifies or regulates gloves or grips in powerlifting or weightlifting competition. Caprio does not make a federation-approval claim on any style in this category.",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ, and can I mix finger coverage or materials in one run?",
      a: "From 50 pieces per style. Mix finger coverage, hole counts, and materials across styles within the same order, scaling to full bulk.",
    },
    {
      q: "What is the difference between a glove and a grip pad?",
      a: "A glove covers the full hand, palm and back, with fingers either fully or partially covered. A grip pad covers the palm only, with no finger or back-of-hand panel, a lighter option for lifters who find gloves bulky.",
    },
    {
      q: "What is the difference between a grip pad and a finger-hole grip?",
      a: "A grip pad is worn like a fingerless glove, strapped over the palm. A finger-hole grip has two or three holes the fingers pass through, and is built specifically for gymnastics-style pulling movements like pull-ups and muscle-ups, not general lifting.",
    },
    {
      q: "Is there a competition-legal glove or grip?",
      a: "No governing body regulates gloves or grips in powerlifting or weightlifting competition, so there is no dimension or construction standard to build to, unlike our wraps, straps, and sleeves.",
    },
    {
      q: "How should I measure hand size for grips?",
      a: "Measure from the wrist crease to the base of the middle finger with the hand flat and straight. Send us that measurement with your tech pack and we confirm fit on your sample.",
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
  // Shared PDP FAQ block for every Gloves & Grips PDP (rendered after the
  // entity answer and the style's own `faqs`) -- same mechanism as
  // Wraps, Straps & Sleeves' own `pdpFaqOperational`.
  pdpFaqOperational: [
    {
      q: "What is your MOQ, and can I mix finger coverage or materials?",
      a: "From 50 pieces per style. Mix finger coverage, hole counts, and materials across styles within the same order.",
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
      status: "draft",
      slug: "fingerless-training-gloves",
      cardTitle: "Custom Fingerless Training Gloves",
      cardSubline: "Half-finger coverage, padded palm, built to your spec",
      image: "",
      imageAlt: "Custom fingerless training gloves",
      href: "/lifting-gears/weight-lifting-gloves-and-grips/fingerless-training-gloves",
    },
    {
      // First Gloves & Grips PDP built (owner brief, 2026-09-21). Fingerless
      // Training Gloves, Grip Pads and Finger-Hole Hand Grips have no PDP
      // yet, so their related-style tags point at the category PLP, per
      // `relatedStyleTags`' own comment (weight-lifting-belts.ts). Same
      // `internalPreview` escape hatch as every other Gear PDP: reachable by
      // direct URL, noindexed, out of the sitemap, no Product/FAQPage
      // schema. `status: "draft"` until palm material, padding, and closure
      // construction are confirmed against a real factory sample.
      status: "draft",
      internalPreview: true,
      slug: "full-finger-gloves",
      sku: "CAP-GLV-02",
      cardTitle: "Custom Full-Finger Gloves",
      cardSubline: "Full coverage with knuckle protection, for CrossFit-style training",
      image: "",
      imageAlt: "Custom full-finger gloves",
      href: "/lifting-gears/weight-lifting-gloves-and-grips/full-finger-gloves",
      pdpTitle: "Full-Finger Gloves",
      images: [
        { alt: "Custom full-finger training glove, front view" },
        { alt: "Custom full-finger training glove, worn on model, in use" },
        { alt: "Custom full-finger training glove, knuckle protection detail" },
        { alt: "Custom full-finger training glove, palm, anti-slip finish" },
        { alt: "Custom full-finger training glove, breathable mesh back detail" },
        { alt: "Custom full-finger training glove, double wrist strap closure detail" },
        { alt: "Custom full-finger training glove, stitching detail" },
        { alt: "Custom full-finger training glove, color range" },
        { alt: "Custom full-finger training glove, private label packaging" },
      ],
      pdpHeading: "Custom Full-Finger Gloves Manufacturer",
      pdpDescription:
        "A custom and private label full-finger training glove, knuckle protection and an anti-slip palm, built to your spec, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Full-Finger Gloves Manufacturer",
      pdpMetaDescription:
        "Custom full-finger training gloves manufacturer, knuckle protection, double wrist strap. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Genuine or synthetic leather, or synthetic suede (amara), with breathable mesh back",
      pdpFabricPills: ["Genuine or synthetic leather", "Synthetic suede (amara) option", "Breathable mesh back"],
      pdpCustomizationPills: ["Palm material", "Knuckle protection", "Branding", "Private label"],
      pdpQualityHeading: "A real spec sheet, not a letter size alone",
      pdpQualitySubline:
        "We confirm the palm material, the knuckle protection, and the stitching on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Palm material and stitching checked against your spec",
        "Knuckle protection checked for coverage and flexibility",
        "Double wrist strap closure tested under repeated use",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "Full finger and knuckle coverage" },
        { icon: "lock", text: "Double wrist strap closure" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          {
            title: "Palm material",
            body: "Genuine leather, synthetic leather, or synthetic suede, matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Palm material" },
          },
          {
            title: "Knuckle protection",
            body: "Coverage and material matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Knuckle protection" },
          },
          {
            title: "Padding",
            body: "Placement and density matched to your reference sample",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Padding" },
          },
          {
            title: "Branding",
            body: "Embroidery, screen print, silicone print, custom colorway",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" },
          },
          {
            title: "Packaging",
            body: "Polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" },
          },
        ],
      },
      specifications: [
        { label: "Style", value: "Full-finger training glove (base type)" },
        { label: "Finger coverage", value: "Full, all fingers and knuckles covered" },
        {
          label: "Palm material",
          value: "Genuine leather, synthetic leather, or synthetic suede (amara), or your reference material",
        },
        { label: "Palm treatment", value: "Anti-slip finish" },
        { label: "Knuckle protection", value: "Included, positioned for CrossFit-style training" },
        { label: "Back of hand", value: "Breathable mesh" },
        {
          label: "Padding",
          value: "Included at the palm, thickness confirmed on sample, no industry-standard figure exists",
        },
        { label: "Closure", value: "Double hook-and-loop wrist strap" },
        { label: "Color", value: "Full color range" },
        { label: "Branding", value: "Embroidery, screen print, silicone print, custom labels, packaging" },
      ],
      relatedStyleTags: [
        { label: "Fingerless Training Gloves", href: "/lifting-gears/weight-lifting-gloves-and-grips" },
        { label: "Grip Pads", href: "/lifting-gears/weight-lifting-gloves-and-grips" },
        { label: "Finger-Hole Hand Grips", href: "/lifting-gears/weight-lifting-gloves-and-grips" },
        { label: "See All", href: "/lifting-gears/weight-lifting-gloves-and-grips" },
      ],
      faqs: [
        {
          q: "What is the difference between full-finger and fingerless gloves?",
          a: "Full-finger gloves cover the entire hand including knuckle protection, more commonly used for CrossFit-style training. Fingerless gloves leave the fingers exposed for grip feel and ventilation, the more common style for general weightlifting. We build both, tell us your use case.",
        },
        {
          q: "Why a double wrist strap instead of one?",
          a: "A double hook-and-loop strap gives a more secure, adjustable fit for the heavier coverage of a full-finger glove. Tell us if your brand wants a single-strap version instead.",
        },
        {
          q: "Is there a padding thickness spec?",
          a: "No manufacturer in this category publishes a padding thickness figure, including us at this stage. Padding placement and density are confirmed together on your sample.",
        },
        {
          q: "Is there a competition-legal training glove?",
          a: "No governing body regulates gloves in powerlifting or weightlifting, so there is no dimension or construction standard to build to.",
        },
      ],
    },
    {
      status: "draft",
      slug: "womens-training-gloves",
      cardTitle: "Custom Women's Training Gloves",
      cardSubline: "A narrower fit and palette built for a women's line",
      image: "",
      imageAlt: "Custom women's training gloves",
      href: "/lifting-gears/weight-lifting-gloves-and-grips/womens-training-gloves",
    },
    {
      status: "draft",
      slug: "grip-pads",
      cardTitle: "Custom Grip Pads",
      cardSubline: "Palm-only protection, a lighter alternative to a full glove",
      image: "",
      imageAlt: "Custom grip pads",
      href: "/lifting-gears/weight-lifting-gloves-and-grips/grip-pads",
    },
    {
      status: "draft",
      slug: "finger-hole-hand-grips",
      cardTitle: "Custom Finger-Hole Hand Grips",
      cardSubline: "2-hole or 3-hole, for gymnastics-style pulling movements",
      image: "",
      imageAlt: "Custom finger-hole hand grips",
      href: "/lifting-gears/weight-lifting-gloves-and-grips/finger-hole-hand-grips",
    },
  ],
  relatedLinks: [
    { label: "Lifting Gear", href: "/lifting-gears" },
    { label: "Weight Lifting Belts", href: "/lifting-gears/weight-lifting-belts" },
    { label: "Wraps, Straps & Sleeves", href: "/lifting-gears/wraps-straps-sleeves" },
    { label: "Boxing and MMA", href: "/boxing-and-mma" },
  ],
};
