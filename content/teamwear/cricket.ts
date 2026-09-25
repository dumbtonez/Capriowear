// content/teamwear/cricket.ts
// First Teamwear category, on the exact same `Category` shape every
// Activewear category already uses (content/activewear/types.ts) -- a pure
// content/data drop, same pattern this project already follows: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts. `group: "Teamwear"` is the
// only thing that marks this as a Teamwear category rather than an
// Activewear one -- the shared route templates and every component they
// render are identical either way.
//
// Uses the new `structuredBlock` (type "decoration") field instead of
// `weightTiers`/`weightTiersHeaders` -- Cricket's own reusable block under
// the fabric table is a decoration/print-method breakdown, not a GSM or
// mmHg weight tier table. See StructuredBlock's own comment
// (content/activewear/types.ts).
//
// 8 styles, all "draft" (owner spec, 2026-09-25). 01 to 03 carry PDP
// content and render as noindexed draft PDPs (BreadcrumbList only, out of
// the sitemap and the CollectionPage/ItemList), with their cards linking;
// 04 to 08 are card-only non-links. See the styleCards comment below.
//
// No cricket GSM number is ever stated (owner spec) -- every fabric-weight
// reference here is deliberately worded as "tuned to your format/climate
// and confirmed on your sample," never a made-up figure.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows.
import type { Category, StyleCard } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/cricket";

const QUALITY_HEADING = "The color you approve, on every kit";
const PROOF_AND_SAMPLE_SUBLINE = "We confirm it all on your digital proof and sample before the full roster is produced.";
const NAMES_NUMBERS_POINT = "Names and numbers dyed into the fiber, so they will not crack or peel";
const ROSTER_POINT = "The full roster produced in one run, same fabric roll and print batch, so every kit matches";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";

const SPEC_FIT = "Team cut or fitted, graded XS to 5XL, men's, women's and unisex blocks";
const SPEC_BRANDING = "Club crest, sponsor logos, manufacturer mark, woven and care labels, packaging";
const MATCH_JERSEY_SPEC_FABRIC =
  "Polyester interlock or pique body, micro-mesh or ultra-light mesh ventilation, poly-spandex collar and cuffs";
const MATCH_JERSEY_SPEC_WEIGHT =
  "Pending, confirmed on your sample. Lighter mesh for hot-weather kit, heavier interlock for structure.";
const MATCH_JERSEY_SPEC_COLOR = "Full sublimation color range, Pantone matched, home and away colorways";
const MATCH_JERSEY_SPEC_CONSTRUCTION = "Flatlock and overlock seams, mesh inserts at the side and underarm optional";
const MATCH_JERSEY_FABRIC_PILLS = ["Polyester interlock", "Micro-mesh", "Ultra-light mesh", "Poly-spandex panels"];
const MATCH_JERSEY_CUSTOMIZATION_PILLS = ["Sublimated names & numbers", "Pantone color match", "Home & away kits", "Custom labels"];

type Step = [title: string, body: string];
const NAMES_AND_NUMBERS_STEP: Step = [
  "Names and numbers",
  "Built into the print file per player, or tackle twill and sublimation twill for a raised look",
];
const TRIMS_STEP: Step = ["Trims and finish", "Woven labels, size and care labels, hangtags"];
const PACKAGING_STEP: Step = ["Packaging", "Polybags, boxes, retail-ready to your spec"];
const MATCH_JERSEY_STEPS_TAIL: Step[] = [
  ["Branding", "Embroidered or sublimated crests, sponsor logos, manufacturer mark"],
  ["Fabric", "Any polyester knit and weight, sourced or matched to your reference"],
  ["Color", "Pantone, CMYK, RGB or hex matched, confirmed on your digital proof"],
  TRIMS_STEP,
  PACKAGING_STEP,
];

// Per-style "How we customize" carousel. Images are the shared factory
// test shots (same stand-ins every PDP carousel uses), cycled in order.
function customizeSteps(steps: Step[]) {
  return {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    steps: steps.map(([title, body], i) => ({
      title,
      body,
      image: { src: `/factory-test/inside-factory-${(i % 5) + 1}.jpg`, alt: title },
    })),
  };
}

// Alt-only gallery (no photography yet): 6 frames, alt = the card name.
function gallery(alt: string) {
  return Array.from({ length: 6 }, () => ({ alt }));
}

// Card-only draft (a later batch adds the PDP content, then the card links).
function cardOnly(sku: string, slug: string, cardTitle: string, cardSubline: string): StyleCard {
  return { status: "draft", slug, cardTitle, cardSubline, image: "", imageAlt: cardTitle, href: `${PLP}/${slug}`, sku };
}

export const cricket: Category = {
  slug: "cricket",
  group: "Teamwear",
  menuLabel: "Cricket",
  manufacturerNoun: "Cricket Uniform",
  productNounPlural: "cricket uniforms and kits",
  // "Trousers", not "sleeveless sweaters" (owner spec, 2026-09-05,
  // cut-and-sew scope filter): a knitted sweater/slipover is a typically-
  // sourced item, not something this entity sentence should claim as
  // manufactured. "Training tees" added (owner spec, 2026-09-06, PLP
  // content trim) to match the trimmed entity-FAQ answer's own given copy.
  entityExampleStyles: "colored match jerseys, traditional whites, trousers, training tees, fleece pullovers and caps",
  entityFabrics: "polyester interlock, pique, micro-mesh and fleece",
  h1: "Custom Cricket Uniform Manufacturer",
  metaTitle: "Custom Cricket Uniform Manufacturer",
  metaDescription:
    "Custom cricket uniform manufacturer: private label sublimated match kit, traditional whites, trousers and training wear, MOQ 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Teamwear has no gender split (owner spec, 2026-09-25).
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  // Trimmed to 4 rows (owner spec, 2026-09-06, "leaner for mobile and a
  // buyer skim") -- was 6. PDP-level fabric detail (specifications, chips)
  // is unchanged; only this PLP-level table is shorter.
  fabricOptions: [
    {
      fabric: "Polyester interlock or pique",
      bestFor: "Match jerseys, whites, trousers",
      performance: "Smooth, even print, durable",
    },
    {
      fabric: "Micro-mesh or bird's-eye",
      bestFor: "Ventilation and training",
      performance: "Breathable, prints cleanly",
    },
    {
      fabric: "Ultra-light mesh",
      bestFor: "Hot-weather match kit",
      performance: "Lightest hand, highest airflow",
    },
    {
      fabric: "Poly-spandex",
      bestFor: "Collars and fitted trims",
      performance: "Stretch, holds a flat collar",
    },
  ],
  // Split into a segment run (owner spec, 2026-09-06: highlight one small,
  // important phrase, semibold, not the whole note) -- was one plain
  // segment.
  fabricNote: [
    {
      text: "Polyester-based for full-color sublimation, with whites built in white or near-white polyester. Brushed polyester fleece for the fleece pullover. Weight tuned to your format and climate and ",
    },
    { text: "confirmed on your sample", bold: true },
    { text: ". Recycled polyester available. Swatches before every bulk run." },
  ],
  fabricPills: ["Polyester interlock", "Pique", "Micro-mesh", "Ultra-light mesh", "Poly-spandex panels", "Recycled polyester"],
  // Decoration structured block (owner spec, 2026-09-05) -- see
  // StructuredBlock's own comment. Replaces the weightTiers table this
  // reusable block otherwise renders for a GSM/mmHg-driven category.
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    // Trimmed to 4 rows (owner spec, 2026-09-06) -- was 5.
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Graphics, names, numbers, sponsor logos",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn numbers and lettering",
        notes: "Raised, classic look, a premium option",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and name or number bars",
        notes: "Raised, full-color",
      },
      {
        method: "Embroidery",
        bestFor: "Crests, badges, sponsor marks, caps",
        notes: "Raised, premium texture",
      },
    ],
    // Segment array, not a plain string (owner spec, 2026-09-06: highlight
    // one small, important phrase, semibold, not the whole sentence).
    note: [
      { text: "Methods combine on one kit: a sublimated body with an embroidered crest and sublimated names and numbers is " },
      { text: "a common premium build", bold: true },
      { text: "." },
    ],
  },
  qualityHeading: "The color you approve, on every kit",
  qualitySubline:
    "We confirm the color, the print, and the fit on your digital proof and your sample before the full roster is produced.",
  // Trimmed to 4 bullets (owner spec, 2026-09-06) -- was 5.
  qualityPoints: [
    "Digital proof and Pantone match approved before we cut",
    "Names and numbers sublimated into the fiber, so they will not crack or peel",
    "The full roster produced in one run, same fabric roll and print batch, so every kit matches",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  // Trimmed to 4 bullets (owner spec, 2026-09-06) -- was 6.
  coverageItems: [
    {
      title: "Fabric",
      body: "Polyester interlock, pique and micro-mesh, poly-spandex collars, brushed fleece for off-field layers",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, names and numbers in the print, Pantone color matching, home and away kits",
    },
    {
      title: "Decoration",
      body: "Tackle twill, sublimation twill patches, embroidered crests on shirts and caps",
    },
    {
      title: "Finishing",
      body: "Your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Trimmed to 7 questions (owner spec, 2026-09-06, "leaner for mobile and
  // a buyer skim") -- was 15. Plus the auto-built entity question
  // (categoryEntityFaq(), from entityExampleStyles above), 8 total, matching
  // the owner's own numbered list exactly.
  // 7 questions plus the auto-built entity question first (categoryEntityFaq(),
  // from entityExampleStyles/entityFabrics above), 8 total (owner spec,
  // 2026-09-25). The whites-shirt collar question moved to that PDP.
  faqs: [
    {
      q: "What is your MOQ for custom cricket kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between cricket whites and colored match kit?",
      a: "Whites are the traditional kit for multi-day and club cricket: a white or near-white body with contrast trim in team colors. Colored match kit is fully sublimated in team colors for T20 and one-day formats. Capriowear makes both on the same polyester platform.",
    },
    {
      q: "How are names and numbers applied?",
      a: "They are built into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Tackle twill and sublimation twill are available for a raised look.",
    },
    {
      q: "Which fabrics do you use, and how is weight decided?",
      a: "Polyester interlock and pique for the body, micro-mesh for ventilation, ultra-light mesh for hot-weather kit, poly-spandex for collars and brushed fleece for off-field layers, with a recycled option. Weight is tuned to your format and climate and confirmed on the sample.",
    },
    {
      q: "Can a club or academy order whites and colored kit in one order?",
      a: "Yes. Whites, colored match kit and training wear are planned into one order, with Pantone, CMYK, RGB or hex values matched in production dye and trim, so every piece matches across the program.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // TEMPORARY (owner, 2026-09-25): opts Cricket into the draft-PDP rule so
  // the batch-1 drafts get noindexed pages and their cards link. See the
  // field's own comment in content/activewear/types.ts.
  draftPdpsReachable: true,
  // 8 drafts, SKU order (CAP-CRK-01 to 08), owner spec 2026-09-25. Card
  // title = H1 minus " Manufacturer" = title-tag name = breadcrumb = alt =
  // every pill label that targets it. 01 to 03 carry PDP content (batch 1,
  // reachable noindexed drafts via `draftPdpsReachable`); 04 to 08 are
  // card-only non-links until their own batch. Nothing publishes until the
  // roster is confirmed, the style sampled and real photos exist
  // (getPublishReadiness()). Fleece Pullover and Cap re-added by the owner
  // (2026-09-25), superseding the 2026-09-05 headwear removal.
  styleCards: [
    {
      status: "draft",
      slug: "colored-match-jersey-short-sleeve",
      cardTitle: "Custom Short-Sleeve Cricket Match Jersey",
      cardSubline: "Full-dye sublimated, names and numbers in the print",
      image: "",
      imageAlt: "Custom Short-Sleeve Cricket Match Jersey",
      href: `${PLP}/colored-match-jersey-short-sleeve`,
      sku: "CAP-CRK-01",
      pdpHeading: "Custom Short-Sleeve Cricket Match Jersey Manufacturer",
      pdpMetaTitle: "Custom Short-Sleeve Cricket Match Jersey Manufacturer",
      pdpDescription:
        "Colored cricket match jersey, custom and private label, full-dye sublimated with names, numbers and sponsor logos built into the print, in a polyester interlock or micro-mesh knit, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Short-Sleeve Cricket Match Jersey"),
      pdpMetaDescription:
        "Custom cricket match jersey manufacturer: sublimated short-sleeve jerseys, names and numbers in the print, Pantone matched, MOQ 50, DDP to 20+ countries.",
      material: "Polyester interlock or pique, micro-mesh or ultra-light mesh ventilation",
      pdpFabricPills: MATCH_JERSEY_FABRIC_PILLS,
      pdpCustomizationPills: MATCH_JERSEY_CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "How are names and numbers applied to the short-sleeve cricket match jersey?",
          a: "They are composited into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Tackle twill or sublimation twill is available for a raised, sewn look.",
        },
        {
          q: "Can you produce home and away short-sleeve cricket match jerseys together?",
          a: "Yes. Both colorways are planned into one order and share the same print files, sizing and roster, so they match as a set.",
        },
        {
          q: "Can you match our exact team and sponsor colors on the cricket match jersey?",
          a: "Yes. Send Pantone, CMYK, RGB or hex values and we match production dye to them, confirmed on your proof and sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Long-Sleeve Cricket Match Jersey", slug: "colored-match-jersey-long-sleeve", href: PLP },
        { label: "Custom Colored Cricket Trousers", slug: "colored-trousers", href: PLP },
        { label: "Custom Cricket Whites Shirt", slug: "whites-shirt", href: PLP },
        { label: "Custom Cricket Training Tee", slug: "training-tee", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Colored cricket match jersey, short sleeve (base type)" },
        { label: "Fabric", value: MATCH_JERSEY_SPEC_FABRIC },
        { label: "Weight", value: MATCH_JERSEY_SPEC_WEIGHT },
        { label: "Collar", value: "Crew or polo, your choice, with a flat, non-curling finish" },
        { label: "Sleeve", value: "Short sleeve. The long-sleeve build is its own style (CAP-CRK-03)." },
        {
          label: "Decoration",
          value: "Full-dye sublimation, with names, numbers and sponsor logos in the print. Tackle twill or sublimation twill optional.",
        },
        { label: "Color", value: MATCH_JERSEY_SPEC_COLOR },
        { label: "Fit", value: SPEC_FIT },
        { label: "Construction", value: MATCH_JERSEY_SPEC_CONSTRUCTION },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Short-Sleeve Cricket Match Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation, unlimited colors and gradients in one file at one cost"],
        NAMES_AND_NUMBERS_STEP,
        ...MATCH_JERSEY_STEPS_TAIL,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: PROOF_AND_SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Digital proof and Pantone match approved before we cut",
        NAMES_NUMBERS_POINT,
        ROSTER_POINT,
        "Sizing held consistent across the run, with custom measurements for hard-to-fit players",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "whites-shirt",
      cardTitle: "Custom Cricket Whites Shirt",
      cardSubline: "Polo collar, contrast trim, short or long sleeve",
      image: "",
      imageAlt: "Custom Cricket Whites Shirt",
      href: `${PLP}/whites-shirt`,
      sku: "CAP-CRK-02",
      pdpHeading: "Custom Cricket Whites Shirt Manufacturer",
      pdpMetaTitle: "Custom Cricket Whites Shirt Manufacturer",
      pdpDescription:
        "Traditional cricket whites shirt, custom and private label, with a polo collar, buttoned placket and contrast trim, in a breathable polyester interlock or pique knit, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cricket Whites Shirt"),
      pdpMetaDescription:
        "Custom cricket whites shirt manufacturer: polyester interlock or pique, polo collar, contrast trim and embroidered crest, MOQ 50 pieces, DDP to 20+ countries.",
      material: "Polyester interlock or pique, micro-mesh ventilation inserts optional",
      pdpFabricPills: ["Polyester interlock", "Pique", "Micro-mesh", "Poly-spandex collar"],
      pdpCustomizationPills: ["Contrast trim", "Embroidered crest", "Short or long sleeve", "Custom labels"],
      faqs: [
        {
          q: "What collar options are there on the cricket whites shirt?",
          a: "A polo collar with a two or three button placket is the traditional standard, and we also build a crew neck. On long sleeve, a one-piece collar with a back stand adds sun cover at the neck. Every collar is finished flat so it does not curl.",
        },
        {
          q: "Can we add contrast trim and a club crest to the cricket whites shirt?",
          a: "Yes. We add a contrast collar, placket and tipping in your team color, with an embroidered or sublimated crest and sponsor marks.",
        },
        {
          q: "Do you make matching whites trousers for the cricket whites shirt?",
          a: "Yes. They are made as part of the same kit and produced together, so the whites match across pieces.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Cricket Whites Trousers", slug: "whites-trousers", href: PLP },
        { label: "Custom Short-Sleeve Cricket Match Jersey", slug: "colored-match-jersey-short-sleeve", href: PLP },
        { label: "Custom Cricket Training Tee", slug: "training-tee", href: PLP },
        { label: "Custom Cricket Fleece Pullover", slug: "fleece-pullover", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Traditional cricket whites shirt (base type)" },
        { label: "Fabric", value: "Polyester interlock or pique body, micro-mesh ventilation inserts optional" },
        { label: "Weight", value: "Pending, confirmed on your sample. Built breathable for match-day heat." },
        {
          label: "Collar",
          value:
            "Polo collar with a two or three button placket. Crew-neck alternative. On long sleeve, a one-piece collar with a back stand for extra sun cover.",
        },
        { label: "Sleeve", value: "Short sleeve or long sleeve, same construction" },
        {
          label: "Color",
          value: "White or near-white body, with contrast collar, placket and trim in your team color, Pantone matched",
        },
        { label: "Decoration", value: "Embroidered or sublimated crest and sponsor marks, contrast tipping and piping" },
        { label: "Fit", value: SPEC_FIT },
        { label: "Construction", value: "Flatlock and overlock seams, side vents optional, flat non-curling collar" },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Cricket Whites Shirt" },
      pdpCustomizationSteps: customizeSteps([
        ["Collar and trim", "Contrast collar, placket and tipping in your team color, Pantone matched"],
        ["Decoration", "Embroidered crest and sponsor marks, or sublimated marks on a white body"],
        ["Fabric", "Breathable polyester interlock or pique, any weight, sourced or matched to your reference"],
        ["Fit and construction", "Polo, crew or one-piece stand collar, short or long sleeve, side vents"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: "We confirm it all on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Contrast trim and crest color Pantone matched and approved before we cut",
        "Crest and trim finished clean and flat, with no puckering",
        "The full roster produced in one run, same fabric roll, so every shirt matches",
        "Sizing held consistent across the run, with custom measurements for hard-to-fit players",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "colored-match-jersey-long-sleeve",
      cardTitle: "Custom Long-Sleeve Cricket Match Jersey",
      cardSubline: "Full-dye sublimated, long sleeve for sun cover",
      image: "",
      imageAlt: "Custom Long-Sleeve Cricket Match Jersey",
      href: `${PLP}/colored-match-jersey-long-sleeve`,
      sku: "CAP-CRK-03",
      pdpHeading: "Custom Long-Sleeve Cricket Match Jersey Manufacturer",
      pdpMetaTitle: "Custom Long-Sleeve Cricket Match Jersey Manufacturer",
      pdpDescription:
        "Long-sleeve colored cricket match jersey, custom and private label, full-dye sublimated with names, numbers and sponsor logos built into the print, in a polyester interlock or micro-mesh knit, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Long-Sleeve Cricket Match Jersey"),
      pdpMetaDescription:
        "Custom cricket match jersey manufacturer: sublimated long-sleeve jerseys for sun cover, names and numbers in the print, MOQ 50 pieces, DDP to 20+ countries.",
      material: "Polyester interlock or pique, micro-mesh or ultra-light mesh ventilation",
      pdpFabricPills: MATCH_JERSEY_FABRIC_PILLS,
      pdpCustomizationPills: MATCH_JERSEY_CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "Why add the long-sleeve cricket match jersey to a kit?",
          a: "The long-sleeve cricket match jersey gives players sun cover through long sessions and cooler conditions, in the same sublimated construction, print file and colors as the short-sleeve cricket match jersey, so a club can offer both in one kit.",
        },
        {
          q: "Can the long-sleeve and short-sleeve cricket match jerseys be produced in one run?",
          a: "Yes. The long-sleeve and short-sleeve cricket match jerseys share the same print files, fabric and roster, so they are produced together and match in color across the set.",
        },
        {
          q: "Can sleeve graphics be printed on the long-sleeve cricket match jersey?",
          a: "Yes. The sleeves are sublimated in the same print file as the body, so sponsor marks, stripes and team graphics run onto the sleeves at no added cost, with alignment checked on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Short-Sleeve Cricket Match Jersey", slug: "colored-match-jersey-short-sleeve", href: PLP },
        { label: "Custom Colored Cricket Trousers", slug: "colored-trousers", href: PLP },
        { label: "Custom Cricket Whites Shirt", slug: "whites-shirt", href: PLP },
        { label: "Custom Cricket Training Tee", slug: "training-tee", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Colored cricket match jersey, long sleeve (base type)" },
        { label: "Fabric", value: MATCH_JERSEY_SPEC_FABRIC },
        { label: "Weight", value: MATCH_JERSEY_SPEC_WEIGHT },
        { label: "Collar", value: "Crew or polo, your choice, with a flat, non-curling finish" },
        {
          label: "Sleeve",
          value: "Long sleeve for sun cover, with a cuff finish to your spec. The short-sleeve build is its own style (CAP-CRK-01).",
        },
        {
          label: "Decoration",
          value:
            "Full-dye sublimation, with names, numbers and sponsor logos in the print, including sleeve graphics. Tackle twill or sublimation twill optional.",
        },
        { label: "Color", value: MATCH_JERSEY_SPEC_COLOR },
        { label: "Fit", value: SPEC_FIT },
        { label: "Construction", value: MATCH_JERSEY_SPEC_CONSTRUCTION },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Long-Sleeve Cricket Match Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation across the body and sleeves, unlimited colors and gradients in one file at one cost"],
        NAMES_AND_NUMBERS_STEP,
        ...MATCH_JERSEY_STEPS_TAIL,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: PROOF_AND_SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Digital proof and Pantone match approved before we cut",
        NAMES_NUMBERS_POINT,
        "Sleeve and body print aligned across seams and checked on your sample",
        ROSTER_POINT,
        AQL_POINT,
      ],
    },
    cardOnly("CAP-CRK-04", "colored-trousers", "Custom Colored Cricket Trousers", "Sublimated or solid, elastic drawcord waist"),
    cardOnly("CAP-CRK-05", "whites-trousers", "Custom Cricket Whites Trousers", "Traditional whites, elastic drawcord waist"),
    cardOnly("CAP-CRK-06", "training-tee", "Custom Cricket Training Tee", "Lightweight sublimated practice shirt"),
    cardOnly("CAP-CRK-07", "fleece-pullover", "Custom Cricket Fleece Pullover", "Brushed fleece, off-field and warm-up layer"),
    cardOnly("CAP-CRK-08", "cap", "Custom Cricket Cap", "Paneled cap, embroidered crest"),
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, Teamwear sports only,
  // closest sports first.
  relatedLinks: [
    { label: "Baseball", href: "/capriowear/teamwear/baseball" },
    { label: "Soccer", href: "/capriowear/teamwear/soccer" },
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
    { label: "Football", href: "/capriowear/teamwear/football" },
    { label: "Basketball", href: "/capriowear/teamwear/basketball" },
  ],
};
