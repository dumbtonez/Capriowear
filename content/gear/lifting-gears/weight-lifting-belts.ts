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
import { faqGetStarted } from "../../getStarted";

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
  trustBullets: ["MOQ from 50 pieces", "Six belt styles, one factory", "OEM, ODM & Private label", "DDP to 20+ countries"],
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
      fabric: "Genuine leather, 7mm to 10mm",
      bestFor: "Lever and prong belts, lifters who want more mobility and faster bracing feedback",
      performance: "The lighter end of our thickness range",
    },
    {
      fabric: "Genuine leather, 10mm to 13mm",
      bestFor: "Lever belts, maximum-rigidity competition use",
      performance: "The thickest, most rigid end of our range",
    },
    {
      fabric: "Nylon webbing",
      bestFor: "Quick-lock and self-locking belts",
      performance: "Lighter, wider adjustable range, self-locking roller buckle",
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
  fabricPills: ["Genuine leather, 7mm to 10mm", "Genuine leather, 10mm to 13mm", "Nylon webbing", "Neoprene"],
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
    { title: "Thickness and width", body: "7mm to 13mm leather at 4in width, up to 6in width on nylon and neoprene, built to your spec" },
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
    faqGetStarted,
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom weight lifting belts, and can I order multiple thicknesses in one run?",
      a: "From 50 pieces per style. You can mix thickness tiers and colors across styles within the same order, scaling to full bulk.",
    },
    {
      q: "What thickness and width do you manufacture, and can you match a specific competition or federation spec?",
      a: "We build 7mm to 13mm leather at 4in width as standard, plus wider nylon and neoprene tiers. If your market has a specific governing body thickness or width limit, share the specification and we build and confirm your belt against it on sample.",
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
    faqGetStarted,
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
      cardSubline: "7mm to 13mm, 4in width, the flagship competition style",
      image: "",
      imageAlt: "Custom leather lever weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/lever-belt",
      pdpTitle: "Lever Belt",
      sku: "CAP-BLT-01",
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
        "Genuine leather lever belt built for one-motion bracing under max load. Available in 7mm to 13mm thickness, sized and stitched to your spec, with your branding on the lever itself.",
      // "Powerlifting" appears here and in pdpMetaDescription only (owner
      // spec) -- the one belt style that actually competes on that term.
      // Never added to the PLP or the other 5 belt PDPs.
      // No "| Caprio"/"| Capriosports" suffix baked into this string --
      // the root layout's title template (`%s | Capriosports`, see
      // app/layout.tsx) already appends " | Capriosports" to every page's
      // title automatically; the owner's given string ended in "| Caprio"
      // literally, which would have doubled up into "...| Caprio |
      // Capriosports" and also broken the sitewide naming rule that
      // "Capriosports" (not "Caprio") is the metadata-register name
      // (content/capriosports/organization.ts). Dropped the suffix here so
      // the template's own "| Capriosports" is the only one that renders.
      pdpMetaTitle: "Lever Belt | 7mm to 13mm Leather Powerlifting Belt",
      // "MOQ from [X]" in the brief -- filled in as 50, matching this
      // style's own already-published MOQ everywhere else on the page
      // (pdpSpecHighlights, entityAnswer, category-wide trustBullets).
      pdpMetaDescription:
        "Custom lever belts in 7mm to 13mm leather, private-label ready. Quick-release buckle, your branding, MOQ from 50. Samples in 10 to 14 days.",
      material: "Genuine leather, cowhide-based",
      // Per-style override (see `StyleCard.pdpFabricPills`'s own comment)
      // -- the category's own shared `fabricPills` lists every material
      // tier the whole Weight Lifting Belts line offers (leather/nylon/
      // neoprene), not this specific style's own build, which also
      // includes its width and buckle type (owner spec, 2026-09-16).
      pdpFabricPills: ["Genuine Leather (7mm to 13mm)", "4in width", "Lever buckle"],
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
            body: "Choose your thickness across the 7mm to 13mm range, buckle finish, and branding placement. We build to your spec sheet, not a fixed catalog size.",
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
        "Every lever belt is genuine leather only, tested for stitch and rivet strength at your specified thickness (7mm to 13mm) before it ships",
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
        { icon: "ruler", text: "Genuine leather, 7mm to 13mm thickness" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      specifications: [
        { label: "Style", value: "Leather lever belt (base type)" },
        { label: "Material", value: "Genuine leather, cowhide-based" },
        { label: "Thickness", value: "7mm to 13mm (specify tier)" },
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
      // a tag with no matching reachable sibling PDP links to the parent
      // category PLP instead of an invented/404ing URL. Prong Belt is now
      // built (draft + internalPreview, same as this style) so it's
      // re-pointed at its own PDP; re-point the rest as each is built.
      relatedStyleTags: [
        { label: "Prong Belt", href: "/lifting-gears/weight-lifting-belts/prong-belt" },
        { label: "Nylon Quick-Lock Belt", href: "/lifting-gears/weight-lifting-belts/nylon-quick-lock-belt" },
        { label: "Dip Belt", href: "/lifting-gears/weight-lifting-belts/dip-belt" },
        { label: "See All", href: "/lifting-gears/weight-lifting-belts" },
      ],
      faqs: [
        {
          q: "What thickness should I choose across the 7mm to 13mm range?",
          a: "Thinner belts (7mm to 10mm) suit lifters who want more mobility and faster bracing feedback; thicker belts (10mm to 13mm) suit max-effort squat and deadlift work where rigidity matters most. Tell us your athlete profile and we'll recommend a tier, or supply your own spec.",
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
      cardSubline: "Single and double prong, 7mm to 13mm",
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
        "Genuine leather prong belt in the classic powerlifting silhouette, built in 7mm to 13mm thickness and stitched to your spec, with your branding on the buckle or leather.",
      pdpMetaTitle: "Custom Leather Prong Belt Manufacturer",
      // "MOQ from [X]" in the brief -- filled in as 50, matching this
      // style's own already-published MOQ everywhere else on the page
      // (pdpSpecHighlights, entityAnswer, category-wide trustBullets) --
      // same fill applied to the Lever Belt's own meta description.
      pdpMetaDescription:
        "Custom prong belts in 7mm to 13mm leather, private-label ready. Classic single/double-prong buckle, your branding, MOQ from 50. Samples in 10 to 14 days.",
      material: "Genuine leather, cowhide-based",
      pdpFabricPills: ["Genuine Leather (7mm to 13mm)", "Single or double prong", "4in width"],
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
            body: "Choose your thickness across the 7mm to 13mm range, prong style (single or double), and branding, built to your spec sheet, not a fixed catalog size.",
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
        "Every prong belt is genuine leather only, tested for stitch and prong-hole strength at your specified thickness (7mm to 13mm) before it ships",
        "Prong and hole spacing tested for a secure, consistent fit across the adjustment range",
        "Stitching checked for even tension around the full perimeter",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "Genuine leather, 7mm to 13mm thickness" },
        { icon: "lock", text: "Single or double prong" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      specifications: [
        { label: "Style", value: "Leather prong belt (base type)" },
        { label: "Material", value: "Genuine leather, cowhide-based" },
        { label: "Thickness", value: "7mm to 13mm (specify tier)" },
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
        { label: "Nylon Quick-Lock Belt", href: "/lifting-gears/weight-lifting-belts/nylon-quick-lock-belt" },
        { label: "Dip Belt", href: "/lifting-gears/weight-lifting-belts/dip-belt" },
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
      // Third of the 6 belt PDPs (owner brief, 2026-09-16). Same
      // `internalPreview` escape hatch as the Lever/Prong Belts -- see
      // Lever Belt styleCard's own comment. `status: "draft"` until
      // sampled specs are confirmed real.
      status: "draft",
      internalPreview: true,
      slug: "nylon-quick-lock-belt",
      sku: "CAP-BLT-03",
      cardTitle: "Custom Nylon Quick-Lock Belt",
      cardSubline: "Self-locking roller buckle, adjustable",
      image: "",
      imageAlt: "Custom nylon quick-lock weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/nylon-quick-lock-belt",
      pdpTitle: "Nylon Quick-Lock Belt",
      images: [
        { alt: "Custom nylon quick-lock weight lifting belt, front view" },
        { alt: "Custom nylon quick-lock weight lifting belt, worn on model, in use" },
        { alt: "Custom nylon quick-lock weight lifting belt, side profile" },
        { alt: "Custom nylon quick-lock weight lifting belt, roller buckle detail" },
        { alt: "Custom nylon quick-lock weight lifting belt, stitching detail" },
        { alt: "Custom nylon quick-lock weight lifting belt, webbing close-up" },
        { alt: "Custom nylon quick-lock weight lifting belt, back view" },
        { alt: "Custom nylon quick-lock weight lifting belt, flat lay" },
        { alt: "Custom nylon quick-lock weight lifting belt, private label packaging" },
      ],
      pdpHeading: "Custom Nylon Weight Lifting Belt Manufacturer",
      pdpDescription:
        "A custom and private label nylon weight lifting belt with a self-locking roller buckle, built in reinforced nylon webbing, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Nylon Weight Lifting Belt Manufacturer",
      pdpMetaDescription:
        "Custom nylon quick-lock weight lifting belt manufacturer, self-locking roller buckle, private label, low MOQ. Sialkot, Pakistan.",
      material: "Reinforced nylon webbing",
      pdpFabricPills: ["Reinforced nylon webbing", "Self-locking roller buckle", "4in to 6in width", "Machine washable"],
      // Per-style override (see `StyleCard.pdpFaqOperational`'s own
      // comment) -- only the MOQ question's wording changes ("mix colors,"
      // not "mix thickness or colors": this style has no thickness tiers),
      // the other 3 questions stay identical to the category-level block
      // (owner spec, 2026-09-16).
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix colors in one run?",
          a: "From 50 pieces per style. Mix colors freely within the same order.",
        },
        {
          q: "Can you match a specific competition or federation width?",
          a: "Yes. Share your governing body's specification and we build and confirm your belt against it on sample.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      pdpCustomizationPills: ["Color", "Logo patch or print", "Private label", "Custom labels"],
      // Per-style override -- this style is nylon webbing only, never
      // leather or neoprene (owner spec, 2026-09-16).
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the buckle action, the webbing tension, and the fit range on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Roller buckle tested for smooth lock and one-hand release under load",
        "Webbing checked for even tension and stitch integrity at the buckle anchor",
        "Fit range confirmed against the spec you send",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "ruler", text: "4in to 6in width" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      // Per-style override (see `StyleCard.pdpCustomizationSteps`'s own
      // comment) -- this style's own 7 "How we customize" bullets (owner
      // brief, 2026-09-16), never the Lever Belt's leather-specific
      // content that was previously leaking onto every belt PDP via the
      // category level.
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          {
            title: "Buckle",
            body: "Self-locking roller as standard, alternative hardware on request",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Buckle" },
          },
          {
            title: "Width",
            body: "4in to 6in, to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Width" },
          },
          {
            title: "Material",
            body: "Nylon webbing weight and weave matched to your reference",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Material" },
          },
          {
            title: "Branding",
            body: "Woven or printed logo patch, full color print on request",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" },
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
      specifications: [
        { label: "Style", value: "Nylon quick-lock belt (base type)" },
        { label: "Material", value: "Reinforced nylon webbing" },
        { label: "Width", value: "4in to 6in" },
        { label: "Closure", value: "Self-locking roller buckle, one-hand tightening" },
        { label: "Backing", value: "Foam-core or padded interior, to your spec" },
        { label: "Color", value: "Full color range, logo patch or printed branding" },
        { label: "Fit", value: "Adjustable range built to your spec, confirmed on sample" },
        { label: "Branding", value: "Woven or printed logo patch, custom labels, packaging" },
      ],
      relatedStyleTags: [
        { label: "Lever Belt", href: "/lifting-gears/weight-lifting-belts/lever-belt" },
        { label: "Prong Belt", href: "/lifting-gears/weight-lifting-belts/prong-belt" },
        { label: "Dip Belt", href: "/lifting-gears/weight-lifting-belts/dip-belt" },
        { label: "See All", href: "/lifting-gears/weight-lifting-belts" },
      ],
      faqs: [
        {
          q: "How is a nylon quick-lock belt different from a leather lever belt?",
          a: "The nylon belt uses a self-locking roller buckle that adjusts across a wide range on one belt, so it suits a broader size spread with fewer SKUs. The leather lever belt is set to one fixed size and built for maximum rigidity. Many buyers carry both.",
        },
        {
          q: "Can the nylon belt take a full-color print, not just a logo patch?",
          a: "Yes. We can print across the webbing itself in addition to a woven or printed patch, confirmed on your digital proof.",
        },
        {
          q: "Is the nylon belt washable?",
          a: "Yes. Nylon webbing and a foam-core backing hold up to regular washing better than a leather belt, worth noting for gym or team-issue programs.",
        },
      ],
    },
    {
      // Fourth of the 6 belt PDPs (owner brief, 2026-09-16). Same
      // `internalPreview` escape hatch as the Lever/Prong/Nylon Belts --
      // see Lever Belt styleCard's own comment. `status: "draft"` until
      // sampled specs are confirmed real; not linked from the PLP card
      // while draft (internalPreview only reopens the click, nothing else).
      status: "draft",
      internalPreview: true,
      slug: "dip-belt",
      sku: "CAP-BLT-04",
      cardTitle: "Custom Dip Belt",
      cardSubline: "Leather or nylon pad with a steel chain, for weighted pull-ups and dips",
      image: "",
      imageAlt: "Custom dip belt with steel chain",
      href: "/lifting-gears/weight-lifting-belts/dip-belt",
      pdpTitle: "Dip Belt",
      images: [
        { alt: "Custom dip belt with steel chain, front view" },
        { alt: "Custom dip belt with steel chain, worn on model, in use" },
        { alt: "Custom dip belt with steel chain, side profile" },
        { alt: "Custom dip belt with steel chain, chain and attachment detail" },
        { alt: "Custom dip belt with steel chain, stitching detail" },
        { alt: "Custom dip belt with steel chain, pad material close-up" },
        { alt: "Custom dip belt with steel chain, back view" },
        { alt: "Custom dip belt with steel chain, flat lay" },
        { alt: "Custom dip belt with steel chain, private label packaging" },
      ],
      pdpHeading: "Custom Dip Belt Manufacturer",
      pdpDescription:
        "A custom and private label dip belt, a leather or nylon waist pad paired with a steel chain, built for weighted pull-ups, dips, and loaded carries, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Dip Belt Manufacturer",
      pdpMetaDescription:
        "Custom dip belt manufacturer, leather or nylon pad with a steel chain, for weighted pull-ups and dips. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Leather or nylon, your choice",
      pdpFabricPills: ["Leather or nylon pad", "Steel chain", "Padded backing", "Clip or carabiner attachment"],
      pdpCustomizationPills: ["Embossed or printed logo", "Private label", "Chain length", "Custom labels"],
      // Per-style override -- this style is leather or nylon only, never
      // neoprene or the PLP's own "genuine leather, nylon, and neoprene"
      // category-wide claim (owner spec, 2026-09-16).
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the pad comfort, the chain strength, and the attachment hardware on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Chain and attachment hardware tested under load",
        "Pad checked for comfort and stability against the hip under a loaded chain",
        "Stitching and edge finishing checked around the full pad",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "arrowDownAZ", text: "Leather or nylon pad" },
        { icon: "lock", text: "Steel chain included" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      // Per-style override (see `StyleCard.pdpCustomizationSteps`'s own
      // comment) -- this style's own 7 "How we customize" bullets (owner
      // brief, 2026-09-16), never a shared/generic default.
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          {
            title: "Pad material",
            body: "Leather or nylon, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Pad material" },
          },
          {
            title: "Chain length and gauge",
            body: "Built to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Chain length and gauge" },
          },
          {
            title: "Attachment hardware",
            body: "Clip or carabiner, to your spec",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Attachment hardware" },
          },
          {
            title: "Branding",
            body: "Embossed or printed logo, woven or leather patch labels",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Black standard, custom colors matched to your spec",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" },
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
      specifications: [
        { label: "Style", value: "Dip belt (base type)" },
        { label: "Pad material", value: "Leather or nylon, your choice" },
        { label: "Chain", value: "Steel chain, length built to your spec" },
        { label: "Backing", value: "Padded interior for comfort under load" },
        { label: "Attachment", value: "Clip or carabiner, to your spec" },
        { label: "Color", value: "Black standard, additional colors on request" },
        { label: "Use case", value: "Weighted pull-ups, dips, and loaded carries, not a waist-support lifting belt" },
        { label: "Branding", value: "Embossed or printed logo, woven labels, hangtags, packaging" },
      ],
      relatedStyleTags: [
        { label: "Lever Belt", href: "/lifting-gears/weight-lifting-belts/lever-belt" },
        { label: "Prong Belt", href: "/lifting-gears/weight-lifting-belts/prong-belt" },
        { label: "Nylon Quick-Lock Belt", href: "/lifting-gears/weight-lifting-belts/nylon-quick-lock-belt" },
        { label: "See All", href: "/lifting-gears/weight-lifting-belts" },
      ],
      // Per-style override (see `StyleCard.pdpFaqOperational`'s own
      // comment) -- this style's own operational FAQ wording ("mix pad
      // materials or chain lengths," "chain gauge or load rating") doesn't
      // fit the category-level block's leather-belt-specific phrasing
      // ("mix thickness or colors") -- owner brief, 2026-09-16.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix pad materials or chain lengths?",
          a: "From 50 pieces per style. Mix pad materials, colors, and chain lengths within the same order.",
        },
        {
          q: "Can you match a specific chain gauge or load rating?",
          a: "Share your reference and we source and confirm chain strength on your sample.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "Is a dip belt the same as a weight lifting belt?",
          a: "No. A dip belt is a waist pad and chain for adding weight to pull-ups, dips, and carries. A weight lifting belt supports the core under a barbell lift like a squat or deadlift. They serve different exercises and most gyms stock both.",
        },
        {
          q: "Can the chain be swapped for a strap?",
          a: "Yes. Some buyers prefer a webbing strap over a steel chain for a lighter, quieter build. Tell us your preference and we build to it.",
        },
        {
          q: "What pad material holds up best under repeated loading?",
          a: "Leather is the more durable option for heavy, frequent use; nylon is lighter and often preferred for a lower price point. We build both to the same construction standard.",
        },
      ],
    },
    {
      // Fifth of the 6 belt PDPs (owner brief, 2026-09-16). Same
      // `internalPreview` escape hatch as the other 4 built belts -- see
      // Lever Belt styleCard's own comment. `status: "draft"` until
      // sampled specs are confirmed real.
      status: "draft",
      internalPreview: true,
      slug: "neoprene-padded-belt",
      sku: "CAP-BLT-05",
      cardTitle: "Custom Neoprene Padded Belt",
      cardSubline: "Padded comfort tier, hook-and-loop closure",
      image: "",
      imageAlt: "Custom neoprene padded weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/neoprene-padded-belt",
      pdpTitle: "Neoprene Padded Belt",
      images: [
        { alt: "Custom neoprene padded weight lifting belt, front view" },
        { alt: "Custom neoprene padded weight lifting belt, worn on model, in use" },
        { alt: "Custom neoprene padded weight lifting belt, side profile" },
        { alt: "Custom neoprene padded weight lifting belt, hook-and-loop closure detail" },
        { alt: "Custom neoprene padded weight lifting belt, stitching detail" },
        { alt: "Custom neoprene padded weight lifting belt, material close-up" },
        { alt: "Custom neoprene padded weight lifting belt, back view" },
        { alt: "Custom neoprene padded weight lifting belt, flat lay" },
        { alt: "Custom neoprene padded weight lifting belt, private label packaging" },
      ],
      pdpHeading: "Custom Neoprene Lifting Belt Manufacturer",
      pdpDescription:
        "A custom and private label neoprene padded weight lifting belt with a hook-and-loop closure, a softer comfort tier for everyday training, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Neoprene Lifting Belt Manufacturer",
      pdpMetaDescription:
        "Custom neoprene lifting belt manufacturer, padded shell, hook-and-loop closure, private label, low MOQ. Sialkot, Pakistan.",
      material: "Neoprene, padded shell",
      pdpFabricPills: ["Neoprene", "Hook-and-loop closure", "Padded interior", "Machine washable"],
      pdpCustomizationPills: ["Color", "Logo patch or print", "Private label", "Custom labels"],
      // Per-style override -- this style is neoprene and hook-and-loop
      // only, never leather or nylon webbing, never the PLP's own "genuine
      // leather, nylon, and neoprene" category-wide claim (owner spec,
      // 2026-09-16).
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the closure, the padding, and the fit range on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Hook-and-loop closure tested for hold and consistent adjustment",
        "Padding checked for comfort and even density across the belt",
        "Fit range confirmed against the spec you send",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "lock", text: "Hook-and-loop closure" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      // Per-style override (see `StyleCard.pdpCustomizationSteps`'s own
      // comment) -- this style's own 7 "How we customize" bullets (owner
      // brief, 2026-09-16), never a shared/generic default.
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          {
            title: "Closure",
            body: "Hook-and-loop as standard, alternative hardware on request",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Closure" },
          },
          {
            title: "Width",
            body: "4in to 6in, to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Width" },
          },
          {
            title: "Padding",
            body: "Thickness and density matched to your reference",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Padding" },
          },
          {
            title: "Material",
            body: "Neoprene weight and finish matched to your reference",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Material" },
          },
          {
            title: "Branding",
            body: "Woven or printed logo patch, full color print on request",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" },
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
      specifications: [
        { label: "Style", value: "Neoprene padded belt (base type)" },
        { label: "Material", value: "Neoprene, padded shell" },
        { label: "Width", value: "4in to 6in" },
        { label: "Closure", value: "Hook-and-loop, adjustable" },
        { label: "Backing", value: "Padded interior for comfort" },
        { label: "Color", value: "Full color range, logo patch or printed branding" },
        { label: "Fit", value: "Adjustable range built to your spec, confirmed on sample" },
        { label: "Positioning", value: "A comfort-focused everyday tier, not a competition-grade belt" },
        { label: "Branding", value: "Woven or printed logo patch, custom labels, packaging" },
      ],
      relatedStyleTags: [
        { label: "Lever Belt", href: "/lifting-gears/weight-lifting-belts/lever-belt" },
        { label: "Nylon Quick-Lock Belt", href: "/lifting-gears/weight-lifting-belts/nylon-quick-lock-belt" },
        { label: "Dip Belt", href: "/lifting-gears/weight-lifting-belts/dip-belt" },
        { label: "See All", href: "/lifting-gears/weight-lifting-belts" },
      ],
      // Per-style override (see `StyleCard.pdpFaqOperational`'s own
      // comment) -- this style's own operational FAQ wording ("mix colors
      // in one run," "built to a competition standard") doesn't fit the
      // category-level block's leather-belt-specific phrasing ("mix
      // thickness or colors," federation thickness/width matching) --
      // same pattern as the Nylon Quick-Lock Belt's own override, owner
      // brief 2026-09-16.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix colors in one run?",
          a: "From 50 pieces per style. Mix colors freely within the same order.",
        },
        {
          q: "Is the neoprene belt built to a competition standard?",
          a: "No. It is a comfort-focused everyday tier. For a competition-adjacent build, see our leather lever or prong belts.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "Who is the neoprene belt best suited for?",
          a: "Everyday gym-goers and general fitness programs that want core support and comfort without the rigidity of a competition belt. It is a lighter, softer alternative to leather or nylon.",
        },
        {
          q: "Is the neoprene belt washable?",
          a: "Yes. Neoprene holds up well to regular washing, a practical advantage for gym rental or team-issue programs.",
        },
        {
          q: "Can the padding be made firmer for more support?",
          a: "Yes. We can increase padding density or add an internal support panel to your spec, confirmed on sample.",
        },
      ],
    },
    {
      // Sixth and final of the 6 belt PDPs (owner brief, 2026-09-16). Same
      // `internalPreview` escape hatch as the other 5 built belts -- see
      // Lever Belt styleCard's own comment. `status: "draft"` until
      // sampled specs are confirmed real.
      status: "draft",
      internalPreview: true,
      slug: "womens-belt",
      sku: "CAP-BLT-06",
      cardTitle: "Custom Women's Weight Lifting Belt",
      cardSubline: "A narrower run and taper built for a women's fit",
      image: "",
      imageAlt: "Custom women's weight lifting belt",
      href: "/lifting-gears/weight-lifting-belts/womens-belt",
      pdpTitle: "Women's Belt",
      images: [
        { alt: "Custom women's weight lifting belt, front view" },
        { alt: "Custom women's weight lifting belt, worn on model, in use" },
        { alt: "Custom women's weight lifting belt, side profile" },
        { alt: "Custom women's weight lifting belt, buckle detail" },
        { alt: "Custom women's weight lifting belt, stitching detail" },
        { alt: "Custom women's weight lifting belt, material close-up" },
        { alt: "Custom women's weight lifting belt, back view" },
        { alt: "Custom women's weight lifting belt, flat lay" },
        { alt: "Custom women's weight lifting belt, private label packaging" },
      ],
      pdpHeading: "Custom Women's Weight Lifting Belt Manufacturer",
      pdpDescription:
        "A custom and private label weight lifting belt built on a tapered cut and a narrower size run for a women's fit, in leather or nylon, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Women's Weight Lifting Belt Manufacturer",
      pdpMetaDescription:
        "Custom women's weight lifting belt manufacturer, tapered fit, narrower run, leather or nylon. Private label, low MOQ. Sialkot, Pakistan.",
      material: "Genuine leather or nylon webbing",
      pdpFabricPills: [
        "Genuine leather or nylon webbing",
        "Tapered cut",
        "Narrower size run",
        "Lever, prong, or self-locking buckle",
      ],
      pdpCustomizationPills: ["Embossed or printed logo", "Private label", "Color", "Custom labels"],
      pdpQualityHeading: "A real spec sheet, not a size letter",
      pdpQualitySubline:
        "We confirm the taper, the fit range, and the buckle action on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Taper and front width checked against your reference or pattern",
        "Buckle action tested for smooth, secure operation",
        "Fit range confirmed against the spec you send",
        "Digital proof and sample approved before we cut your production run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "ruler", text: "Tapered fit" },
        { icon: "arrowDownAZ", text: "Leather or nylon build" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          {
            title: "Cut",
            body: "Taper and front width matched to your reference or pattern",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Cut" },
          },
          {
            title: "Material, width, and buckle",
            body: "Leather at 4in or nylon up to 6in, lever, prong, or self-locking, to your spec",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Material, width, and buckle" },
          },
          {
            title: "Branding",
            body: "Embossed, debossed, or printed logo, woven or leather patch labels",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" },
          },
          {
            title: "Color",
            body: "Full color range, matched to your brand palette",
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
      specifications: [
        { label: "Style", value: "Women's weight lifting belt (base type)" },
        { label: "Material", value: "Genuine leather or nylon webbing, your choice" },
        { label: "Width", value: "4in on the leather build, up to 6in on the nylon build" },
        { label: "Cut", value: "Tapered, narrower at the front, built for a women's fit" },
        { label: "Closure", value: "Lever, prong, or self-locking buckle, to your spec" },
        { label: "Fit", value: "A narrower size run than the unisex line, built to your pattern or a reference belt" },
        { label: "Color", value: "Full color range, including finishes beyond the standard black line" },
        { label: "Branding", value: "Embossed, debossed, or printed logo, woven labels, hangtags, packaging" },
      ],
      relatedStyleTags: [
        { label: "Lever Belt", href: "/lifting-gears/weight-lifting-belts/lever-belt" },
        { label: "Prong Belt", href: "/lifting-gears/weight-lifting-belts/prong-belt" },
        { label: "Nylon Quick-Lock Belt", href: "/lifting-gears/weight-lifting-belts/nylon-quick-lock-belt" },
        { label: "See All", href: "/lifting-gears/weight-lifting-belts" },
      ],
      // Per-style override (see `StyleCard.pdpFaqOperational`'s own
      // comment) -- this style's own operational FAQ wording ("mix
      // materials or colors," "federation spec for a women's belt")
      // doesn't fit the category-level block's leather-belt-specific
      // phrasing ("mix thickness or colors," federation thickness/width
      // matching), owner brief 2026-09-16.
      pdpFaqOperational: [
        {
          q: "What is the MOQ and can I mix materials or colors?",
          a: "From 50 pieces per style. Mix leather and nylon builds, colors, and buckle types within the same order.",
        },
        {
          q: "Can you match a specific competition or federation spec for a women's belt?",
          a: "Yes. Share your governing body's specification and we build and confirm the belt against it on sample.",
        },
        {
          q: "Will my design and spec sheet stay protected?",
          a: "Yes. NDA before any tech pack or spec sheet is shared.",
        },
        faqGetStarted,
      ],
      faqs: [
        {
          q: "How is the women's belt different from the unisex line beyond sizing?",
          a: "The cut is tapered, narrower at the front, rather than a straight-width belt scaled down. This is a construction difference, not just a smaller version of the same pattern.",
        },
        {
          q: "Can I offer the women's belt in the same buckle types as the rest of the line?",
          a: "Yes. We build it in lever, prong, or self-locking nylon, matching whichever buckle system the rest of your catalog uses.",
        },
        {
          q: "Is this belt built to a lower thickness than the men's line by default?",
          a: "No. Thickness and width are set by your spec, the same as any other style. The difference here is the cut and the size run, not a reduced construction standard.",
        },
      ],
    },
  ],
  relatedLinks: [
    { label: "Lifting Gear", href: "/lifting-gears" },
    { label: "Boxing and MMA", href: "/boxing-and-mma" },
  ],
};
