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
  // `companyIdentity` sentence. Stays hand-locked rather than routed through
  // buildCaprioEntityAnswer() (content/activewear/pdpShared.ts, wired as the
  // automatic default for every other `group: "Gear"` category): this
  // exact wording -- "raw material to finished packaging" and "with low
  // minimums and full customization" -- is the brief's own locked text,
  // not the generic template's slightly different phrasing. Closes with
  // the standard "Capriowear is our sister division" sentence (owner spec,
  // 2026-09-16), same sentence buildCaprioEntityAnswer() appends.
  entityQuestion: "What does Caprio manufacture?",
  entityAnswer:
    "Caprio is a custom weight lifting belt manufacturer for gym equipment and fitness brands worldwide. We produce private label and OEM weight lifting belts from raw material to finished packaging, including lever belts, prong belts, nylon quick-lock belts, and dip belts in genuine leather, nylon webbing, and neoprene, with low minimums and full customization. Caprio is a lifting gear and boxing and MMA equipment manufacturer in Sialkot, Pakistan, established in 2009. Capriowear, our activewear and teamwear division, is built in the same facility.",
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
  // Gear override of the PDP's shared "operational" FAQ block (see
  // `Category.pdpFaqOperational`'s own comment) -- the shared block's own
  // wording ("mix sizes," "reference garment") is Activewear/Teamwear-
  // specific. Owner brief, 2026-09-16: "identical wording used on every
  // weight lifting belt PDP, reuse verbatim, do not reword per style" --
  // one category-level block, not copied per style.
  pdpFaqOperational: [
    {
      q: "What is the MOQ and can I mix thickness or colors?",
      a: "From 50 pieces per style. Mix thickness tiers and colors freely within the same order.",
    },
    {
      q: "Can you match a specific competition or federation thickness and width?",
      a: "Yes. Share your governing body's specification and we build and confirm your belt against it on sample.",
    },
    {
      q: "Will my design and spec sheet stay protected?",
      a: "Yes. NDA before any tech pack or spec sheet is shared.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch, or a reference belt by email or WhatsApp. We reply within 24 hours with next steps.",
    },
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
      // Flagship style, first of the 6 belt PDPs to build (owner brief,
      // 2026-09-15) -- the volume style buyers compare across every
      // competitor's catalog. `status: "draft"` for now: flip to
      // "published" once sampled and these specs are confirmed real.
      // `internalPreview: true` (owner, 2026-09-16) makes the PLP card
      // clickable and the PDP reachable for internal review only -- see
      // `StyleCard.internalPreview`'s own comment; noindex/nofollow,
      // sitemap exclusion, and Product/FAQPage schema all stay withheld
      // exactly as `status: "draft"` gates them. Remove this line (not
      // just flip `status`) once the real launch decision is made, so a
      // stale internal-preview flag can't linger past its purpose.
      status: "draft",
      internalPreview: true,
      slug: "lever-belt",
      cardTitle: "Custom Leather Lever Belt",
      cardSubline: "10mm and 13mm, 4in width, the flagship competition style",
      image: "",
      imageAlt: "Custom leather lever weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/lever-belt",
      pdpTitle: "Lever Belt",
      // Full 9-slot gallery, same convention as Capriowear's own PDPs
      // (e.g. content/activewear/leggings.ts) -- `ProductGallery` is the
      // same shared component either brand's PDP uses, so the thumbnail
      // rail, desktop hover-swap, mobile swipe track, and slide counter
      // all work identically here once there's more than one slide. No
      // real photography exists for this belt yet, so every slot stays
      // alt-only (no `src`): `ProductGallery` renders a captionless
      // placeholder box per slide instead of a broken image, same as
      // Leggings' own alt-only slots before its real photos existed. Swap
      // each `src` in as real photography lands, front/hero shot first.
      images: [
        { alt: "Custom leather lever weight lifting belt, front view" },
        { alt: "Custom leather lever weight lifting belt, worn on model, in use" },
        { alt: "Custom leather lever weight lifting belt, side profile" },
        { alt: "Custom leather lever weight lifting belt, lever buckle detail" },
        { alt: "Custom leather lever weight lifting belt, stitching detail" },
        { alt: "Custom leather lever weight lifting belt, leather grain close-up" },
        { alt: "Custom leather lever weight lifting belt, back view" },
        { alt: "Custom leather lever weight lifting belt, flat lay" },
        { alt: "Custom leather lever weight lifting belt, private label packaging" },
      ],
      pdpHeading: "Custom Powerlifting Lever Belt Manufacturer",
      pdpDescription:
        "A custom and private label leather lever belt, built in 10mm and 13mm thickness at 4in width, genuine leather with a quick-release lever buckle, our competition-adjacent, powerlifting-style build, made to your brand in Sialkot, Pakistan.",
      // "Powerlifting" appears here and in pdpMetaTitle/pdpMetaDescription
      // only (owner spec) -- the one belt style that actually competes on
      // that term. Never added to the PLP or the other 5 belt PDPs.
      pdpMetaTitle: "Custom Powerlifting Lever Belt Manufacturer",
      pdpMetaDescription:
        "Custom leather lever and powerlifting belt manufacturer, 10mm and 13mm, 4in width, private label. Full customization, low MOQ. Sialkot, Pakistan.",
      material: "Genuine leather, cowhide-based",
      // Per-style override (see `StyleCard.pdpFabricPills`'s own comment)
      // -- the category's own shared `fabricPills` lists every material
      // tier the whole Weight Lifting Belts line offers (leather/nylon/
      // neoprene), not this specific style's own build, which also
      // includes its width and buckle type (owner spec, 2026-09-16).
      pdpFabricPills: ["Genuine leather", "10mm or 13mm", "4in width", "Lever buckle"],
      // Per-style override (see `StyleCard.pdpCustomizationSteps`'s own
      // comment) -- this content was previously sitting at the category
      // level, wrongly labeled as shared across every belt style, when
      // "Lever as standard, prong on request" is this style's own content
      // only (found live on the Prong Belt PDP, owner spec, 2026-09-16).
      // Reuses the same 5 real "Inside the Factory" photos every PDP's
      // carousel uses -- one real factory, not a second photoshoot -- with
      // the brief's own 8 bullet points condensed into these 5 cards.
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          {
            title: "Material & thickness",
            body: "Genuine leather sourced to your reference, 10mm or 13mm thickness at 4in width as standard",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Material and thickness" },
          },
          {
            title: "Buckle",
            body: "Lever as standard, prong on request",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Buckle" },
          },
          {
            title: "Branding & color",
            body: "Embossed or debossed logo, woven or leather patch labels, black standard or custom colors matched to your spec",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding and color" },
          },
          {
            title: "Stitching & lining",
            body: "Thread color, stitch pattern, and lining material to your brief",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Stitching and lining" },
          },
          {
            title: "Trims & packaging",
            body: "Woven labels, size and care labels, hangtags, polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and packaging" },
          },
        ],
      },
      // Per-style override (see `StyleCard.pdpCustomizationPills`'s own
      // comment) -- the shared, sitewide pill set is generic apparel
      // capability tags ("Custom fabric," "Your fit"), not this belt's own
      // real customization options (owner spec, 2026-09-16).
      pdpCustomizationPills: ["Embossed or debossed logo", "Private label", "Color and stitching", "Custom labels"],
      // Per-style override (see `StyleCard.pdpQualityHeading`'s own
      // comment) -- the category's own shared `qualityPoints` states
      // "genuine leather, nylon, and neoprene," true across the whole
      // Weight Lifting Belts PLP but wrong here: the Lever Belt is genuine
      // leather only (owner spec, 2026-09-16, found live on this PDP).
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the thickness, the buckle action, and the stitching on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Thickness measured and confirmed against your 10mm or 13mm spec",
        "Lever buckle action tested for smooth, secure release under load",
        "Stitching checked for even tension around the full perimeter",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      // Per-style override (see `StyleCard.pdpSpecHighlights`'s own
      // comment) -- the shared 4-fact strip's "XS to 5XL sizes" doesn't
      // apply to a belt (no sizing chart on any Gear PDP, B2B buyers spec
      // against their own pattern/reference belt instead); thickness and
      // buckle type genuinely differ by belt style too.
      // "Lever buckle" swapped for "Samples in 10 to 14 days" (owner spec,
      // 2026-09-16) -- redundant with the page's own identity ("Custom
      // Powerlifting LEVER Belt Manufacturer" already says it), and the
      // real sample lead-time fact was missing from this strip entirely.
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "ruler", text: "10mm & 13mm thickness" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      specifications: [
        { label: "Style", value: "Leather lever belt (base type)" },
        { label: "Material", value: "Genuine leather, cowhide-based" },
        { label: "Thickness", value: "10mm or 13mm, confirmed on your sample" },
        { label: "Width", value: "4in" },
        { label: "Closure", value: "Quick-release lever buckle" },
        { label: "Lining", value: "Suede or leather backing, to your spec" },
        { label: "Stitching", value: "Multi-row reinforced stitching around the full perimeter" },
        { label: "Color", value: "Black standard, additional colors on request" },
        { label: "Fit", value: "Built to your pattern or a reference belt you send, confirmed on sample" },
        { label: "Branding", value: "Embossed or debossed logo, woven labels, hangtags, packaging" },
      ],
      // Prong/Nylon Quick-Lock/Dip belt PDPs aren't built yet (still bare
      // draft styleCards below) -- per `relatedStyleTags`'s own comment,
      // a tag with no matching published sibling PDP links to the parent
      // category PLP instead of an invented/404ing URL. Re-point each at
      // its own PDP href as soon as that style is published.
      relatedStyleTags: [
        { label: "Prong Belt", href: "/lifting-gears/weight-lifting-belts" },
        { label: "Nylon Quick-Lock Belt", href: "/lifting-gears/weight-lifting-belts" },
        { label: "Dip Belt", href: "/lifting-gears/weight-lifting-belts" },
        { label: "See All", href: "/lifting-gears/weight-lifting-belts" },
      ],
      faqs: [
        {
          q: "What is the difference between a 10mm and a 13mm belt?",
          a: "The 13mm belt is thicker and more rigid, built for maximum back support under a heavy competition lift. The 10mm belt is slightly more flexible, suited to everyday heavy training. We confirm both on sample so you can choose or offer both.",
        },
        {
          q: "Why a lever buckle instead of a prong?",
          a: "A lever gives a faster, more consistent release under load and holds a fixed size once set. A prong belt is more adjustable across a range of waist sizes on the same belt. We build both.",
        },
        {
          q: "Can I request a different leather grade or a non-leather version?",
          a: "Yes. Tell us your reference leather grade, or ask about our nylon and neoprene lines if you need a non-leather alternative.",
        },
      ],
    },
    {
      // Second of the 6 belt PDPs (owner brief, 2026-09-16). Same
      // `internalPreview` escape hatch as the Lever Belt -- see that
      // styleCard's own comment. `status: "draft"` until sampled specs are
      // confirmed real.
      status: "draft",
      internalPreview: true,
      slug: "prong-belt",
      sku: "CAP-BLT-02",
      cardTitle: "Custom Leather Prong Belt",
      cardSubline: "Single and double prong, 7mm to 10mm",
      image: "",
      imageAlt: "Custom leather prong weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/prong-belt",
      pdpTitle: "Prong Belt",
      images: [
        { alt: "Custom leather prong weight lifting belt, front view" },
        { alt: "Custom leather prong weight lifting belt, worn on model, in use" },
        { alt: "Custom leather prong weight lifting belt, side profile" },
        { alt: "Custom leather prong weight lifting belt, prong buckle detail" },
        { alt: "Custom leather prong weight lifting belt, stitching detail" },
        { alt: "Custom leather prong weight lifting belt, leather grain close-up" },
        { alt: "Custom leather prong weight lifting belt, back view" },
        { alt: "Custom leather prong weight lifting belt, flat lay" },
        { alt: "Custom leather prong weight lifting belt, private label packaging" },
      ],
      pdpHeading: "Custom Leather Prong Belt Manufacturer",
      pdpDescription:
        "A custom and private label leather prong belt, built in single and double prong at 7mm to 10mm thickness, genuine leather, adjustable across a waist range on one belt, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Leather Prong Belt Manufacturer",
      pdpMetaDescription:
        "Custom leather prong belt manufacturer, single and double prong, 7mm to 10mm, private label. Full customization, low MOQ. Sialkot, Pakistan.",
      material: "Genuine leather, cowhide-based",
      pdpFabricPills: ["Genuine leather", "7mm to 10mm", "Single or double prong", "4in width"],
      // Per-style override (see `StyleCard.pdpCustomizationSteps`'s own
      // comment) -- this style's own 7 "How we customize" bullets (owner
      // brief, 2026-09-16), not the Lever Belt's content that was
      // previously leaking onto every belt PDP via the category level.
      // Reuses the same 5 real "Inside the Factory" photos every PDP's
      // carousel uses; only 5 photo slots exist today, cycled for the 2
      // extra cards (`ProductCustomizeSteps`'s own `steps.map` has no fixed
      // card-count limit, so all 7 bullets render, verbatim).
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          {
            title: "Thickness and prong count",
            body: "7mm to 10mm, single or double prong, to your spec",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Thickness and prong count" },
          },
          {
            title: "Material",
            body: "Genuine leather, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Material" },
          },
          {
            title: "Branding",
            body: "Embossed or debossed logo, woven or leather patch labels",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Black standard, custom colors matched to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Color" },
          },
          {
            title: "Stitching and lining",
            body: "Thread color, stitch pattern, and lining material to your brief",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Stitching and lining" },
          },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Trims and finish" },
          },
          {
            title: "Packaging",
            body: "Polybags, boxes, retail-ready to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Packaging" },
          },
        ],
      },
      pdpCustomizationPills: ["Embossed or debossed logo", "Private label", "Color and stitching", "Custom labels"],
      // Per-style override, same pattern as the Lever Belt -- this style is
      // genuine leather only, never nylon or neoprene (owner spec,
      // 2026-09-16).
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the thickness, the prong action, and the stitching on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Thickness measured and confirmed against your 7mm to 10mm spec",
        "Prong and hole spacing tested for a secure, consistent fit across the adjustment range",
        "Stitching checked for even tension around the full perimeter",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "7mm to 10mm thickness" },
        { icon: "lock", text: "Single or double prong" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      specifications: [
        { label: "Style", value: "Leather prong belt (base type)" },
        { label: "Material", value: "Genuine leather, cowhide-based" },
        { label: "Thickness", value: "7mm to 10mm, confirmed on your sample" },
        { label: "Width", value: "4in" },
        { label: "Closure", value: "Single or double prong buckle" },
        { label: "Lining", value: "Suede or leather backing, to your spec" },
        { label: "Stitching", value: "Multi-row reinforced stitching around the full perimeter" },
        { label: "Color", value: "Black standard, additional colors on request" },
        { label: "Fit", value: "Adjustable across a waist range on one belt, confirmed on sample" },
        { label: "Branding", value: "Embossed or debossed logo, woven labels, hangtags, packaging" },
      ],
      relatedStyleTags: [
        { label: "Lever Belt", href: "/lifting-gears/weight-lifting-belts/lever-belt" },
        { label: "Nylon Quick-Lock Belt", href: "/lifting-gears/weight-lifting-belts" },
        { label: "Dip Belt", href: "/lifting-gears/weight-lifting-belts" },
        { label: "See All", href: "/lifting-gears/weight-lifting-belts" },
      ],
      faqs: [
        {
          q: "What is the difference between single and double prong?",
          a: "A double prong spreads the load across two points and is generally the stiffer, more supportive option; a single prong is simpler and slightly more flexible. We build both, and can advise based on your target thickness.",
        },
        {
          q: "Why choose a prong belt over a lever belt?",
          a: "A prong belt adjusts across a wider waist range on the same belt, useful for a broader size run with fewer SKUs. A lever belt is set to one fixed size and releases faster under load. Many buyers carry both.",
        },
        {
          q: "Can I request a different hole spacing or prong placement?",
          a: "Yes. Send your reference spec and we confirm hole count and spacing on your sample.",
        },
      ],
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
