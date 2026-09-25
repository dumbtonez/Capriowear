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
// 8 styles, all "draft" (owner spec, 2026-09-25). All 8 carry PDP
// content and render as noindexed draft PDPs (BreadcrumbList only, out of
// the sitemap and the CollectionPage/ItemList), with their cards linking.
// See the styleCards comment below.
//
// No cricket GSM number is ever stated (owner spec) -- every fabric-weight
// reference here is deliberately worded as "tuned to your format/climate
// and confirmed on your sample," never a made-up figure.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows.
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/cricket";

const QUALITY_HEADING = "The color you approve, on every kit";
const SAMPLE_SUBLINE = "We confirm it all on your sample before the full roster is produced.";
const PROOF_AND_SAMPLE_SUBLINE = "We confirm it all on your digital proof and sample before the full roster is produced.";
const NAMES_NUMBERS_POINT = "Names and numbers dyed into the fiber, so they will not crack or peel";
const ROSTER_POINT = "The full roster produced in one run, same fabric roll and print batch, so every kit matches";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";

const SPEC_FIT = "Team cut or fitted, graded XS to 5XL, men's, women's and unisex blocks";
const SPEC_BRANDING = "Club crest, sponsor logos, manufacturer mark, woven and care labels, packaging";
const MATCH_JERSEY_SPEC_FABRIC =
  "Polyester interlock or pique body, micro-mesh or ultra-light mesh ventilation, Polyester/Spandex collar and cuffs";
const MATCH_JERSEY_SPEC_WEIGHT =
  "Pending, confirmed on your sample. Lighter mesh for hot-weather kit, heavier interlock for structure.";
const MATCH_JERSEY_SPEC_COLOR = "Full sublimation color range, Pantone matched, home and away colorways";
const MATCH_JERSEY_SPEC_CONSTRUCTION = "Flatlock and overlock seams, mesh inserts at the side and underarm optional";
const MATCH_JERSEY_FABRIC_PILLS = ["Polyester interlock", "Micro-mesh", "Ultra-light mesh", "Polyester/Spandex panels"];
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

const PENDING_WEIGHT = "Pending, confirmed on your sample.";
const TROUSER_FABRIC_PILLS = ["Polyester interlock", "Polyester/Spandex knit", "Double-knit", "Micro-mesh"];
const TROUSER_WAIST = "Elastic waistband with an internal drawcord, finished flat";
const TROUSER_LEG_AND_HEM =
  "Straight leg, full length. The hem is finished to your length, or left open on request so it can be taken up or let down as a player grows.";
const TROUSER_VENTILATION = "Mesh panels at the inside leg and the internal back yoke";
const TEAM_CUT_FIT = "Team cut, graded XS to 5XL, men's, women's and unisex blocks";
const TROUSER_CONSTRUCTION = "Flatlock and overlock seams, side pockets optional";
const TROUSER_FABRIC_STEP: Step = [
  "Fabric",
  "Polyester interlock, Polyester/Spandex stretch knit or double-knit, sourced or matched to your reference",
];
const TROUSER_WAIST_STEP: Step = ["Waist and fit", "Elastic drawcord waist, team cut, graded across the full size run"];
const TROUSER_HEM_STEP: Step = ["Hem and length", "Finished to your inseam, or left open for alteration"];
const INSEAM_POINT = "Inseam and hem length graded and checked across the full size run";

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
      fabric: "Polyester/Spandex",
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
  fabricPills: ["Polyester interlock", "Pique", "Micro-mesh", "Ultra-light mesh", "Polyester/Spandex panels", "Recycled polyester"],
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
      body: "Polyester interlock, pique and micro-mesh, Polyester/Spandex collars, brushed fleece for off-field layers",
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
      a: "Polyester interlock and pique for the body, micro-mesh for ventilation, ultra-light mesh for hot-weather kit, Polyester/Spandex for collars and brushed fleece for off-field layers, with a recycled option. Weight is tuned to your format and climate and confirmed on the sample.",
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
  // every pill label that targets it. All 8 carry PDP content (batches 1
  // to 3), rendered as reachable noindexed drafts via `draftPdpsReachable`. Nothing publishes until the
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
      pdpFabricPills: ["Polyester interlock", "Pique", "Micro-mesh", "Polyester/Spandex collar"],
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
      pdpQualitySubline: SAMPLE_SUBLINE,
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
    {
      status: "draft",
      slug: "colored-trousers",
      cardTitle: "Custom Colored Cricket Trousers",
      cardSubline: "Sublimated or solid, elastic drawcord waist",
      image: "",
      imageAlt: "Custom Colored Cricket Trousers",
      href: `${PLP}/colored-trousers`,
      sku: "CAP-CRK-04",
      pdpHeading: "Custom Colored Cricket Trousers Manufacturer",
      pdpMetaTitle: "Custom Colored Cricket Trousers Manufacturer",
      pdpDescription:
        "Colored cricket match trousers, custom and private label, sublimated or solid in your team colors, with an elastic drawcord waist, a straight leg and mesh ventilation, in a stretch polyester knit, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Colored Cricket Trousers"),
      pdpMetaDescription:
        "Custom cricket trousers manufacturer: sublimated or solid colored match trousers, elastic drawcord waist, mesh ventilation, MOQ 50, DDP to 20+ countries.",
      material: "Polyester interlock, Polyester/Spandex stretch knit or double-knit",
      pdpFabricPills: TROUSER_FABRIC_PILLS,
      pdpCustomizationPills: ["Sublimated or solid color", "Matched to your jersey", "Hem to length", "Custom labels"],
      faqs: [
        {
          q: "Can the colored cricket trousers be matched to our match jersey?",
          a: "Yes. The colored cricket trousers are sublimated from the same print files or dyed to the same Pantone values as your match jersey, and both are confirmed together on your sample before bulk.",
        },
        {
          q: "How is the hem finished on the colored cricket trousers?",
          a: "The colored cricket trousers are hemmed to the inseam you specify, or the hem is left open on request so it can be taken up or let down as a player grows. Inseam is graded across the size run and confirmed on your sample.",
        },
        {
          q: "Where is the ventilation on the colored cricket trousers?",
          a: "The colored cricket trousers carry mesh panels at the inside leg and the internal back yoke, where heat builds during long fielding sessions. Panel size and placement are set to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Short-Sleeve Cricket Match Jersey", slug: "colored-match-jersey-short-sleeve", href: PLP },
        { label: "Custom Long-Sleeve Cricket Match Jersey", slug: "colored-match-jersey-long-sleeve", href: PLP },
        { label: "Custom Cricket Whites Trousers", slug: "whites-trousers", href: PLP },
        { label: "Custom Cricket Training Tee", slug: "training-tee", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Colored cricket match trousers, straight leg (base type)" },
        {
          label: "Fabric",
          value:
            "Polyester interlock or a Polyester/Spandex stretch knit, double-knit for more structure. Spandex in the knit gives stretch through fielding movement.",
        },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Waist", value: TROUSER_WAIST },
        { label: "Leg and hem", value: TROUSER_LEG_AND_HEM },
        { label: "Ventilation", value: TROUSER_VENTILATION },
        {
          label: "Color and decoration",
          value:
            "Sublimated or solid in your team colors, Pantone matched to the colored match jersey, with sublimated or embroidered crest and sponsor marks",
        },
        { label: "Fit", value: TEAM_CUT_FIT },
        { label: "Construction", value: TROUSER_CONSTRUCTION },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Colored Cricket Trousers" },
      pdpCustomizationSteps: customizeSteps([
        ["Color and print", "Sublimated designs or solid team colors, Pantone matched to your match jersey"],
        TROUSER_FABRIC_STEP,
        TROUSER_WAIST_STEP,
        TROUSER_HEM_STEP,
        ["Branding", "Sublimated or embroidered crest, sponsor marks, manufacturer mark"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: PROOF_AND_SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Trouser color matched to your match jersey and approved on the sample before we cut",
        INSEAM_POINT,
        "Crotch and inside-leg seams checked under stretch on your sample",
        "The full roster produced in one run, same fabric roll and print batch, so every pair matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "whites-trousers",
      cardTitle: "Custom Cricket Whites Trousers",
      cardSubline: "Traditional whites, elastic drawcord waist",
      image: "",
      imageAlt: "Custom Cricket Whites Trousers",
      href: `${PLP}/whites-trousers`,
      sku: "CAP-CRK-05",
      pdpHeading: "Custom Cricket Whites Trousers Manufacturer",
      pdpMetaTitle: "Custom Cricket Whites Trousers Manufacturer",
      pdpDescription:
        "Traditional cricket whites trousers, custom and private label, in a white or near-white polyester knit with an elastic drawcord waist, a straight leg and mesh ventilation, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cricket Whites Trousers"),
      pdpMetaDescription:
        "Custom cricket whites trousers manufacturer: white polyester knit, elastic drawcord waist, mesh ventilation, hem to length, MOQ 50, DDP to 20+ countries.",
      material: "White or near-white polyester interlock, Polyester/Spandex stretch knit or double-knit",
      pdpFabricPills: TROUSER_FABRIC_PILLS,
      pdpCustomizationPills: ["White or near-white", "Matched to your whites shirt", "Hem to length", "Custom labels"],
      faqs: [
        {
          q: "Do the cricket whites trousers match the cricket whites shirt?",
          a: "Yes. The cricket whites trousers are cut from a white or near-white knit matched to your whites shirt, and both are produced together so the shade matches across the kit.",
        },
        {
          q: "How do you check opacity on the cricket whites trousers?",
          a: "We check opacity on the cricket whites trousers under stretch on your sample, not only at rest, and move to a heavier or denser white knit where it needs more coverage.",
        },
        {
          q: "How is the hem finished on the cricket whites trousers?",
          a: "The cricket whites trousers are hemmed to the inseam you specify, or the hem is left open on request so it can be taken up or let down as a player grows. Inseam is graded across the size run and confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Cricket Whites Shirt", slug: "whites-shirt", href: PLP },
        { label: "Custom Colored Cricket Trousers", slug: "colored-trousers", href: PLP },
        { label: "Custom Cricket Training Tee", slug: "training-tee", href: PLP },
        { label: "Custom Cricket Fleece Pullover", slug: "fleece-pullover", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Traditional cricket whites trousers, straight leg (base type)" },
        {
          label: "Fabric",
          value:
            "White or near-white polyester interlock or Polyester/Spandex stretch knit, double-knit for more structure. Spandex in the knit gives stretch through fielding movement.",
        },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Waist", value: TROUSER_WAIST },
        { label: "Leg and hem", value: TROUSER_LEG_AND_HEM },
        { label: "Ventilation", value: TROUSER_VENTILATION },
        {
          label: "Color and decoration",
          value: "White or near-white body matched to your whites shirt, with an embroidered crest or sponsor marks optional",
        },
        { label: "Fit", value: TEAM_CUT_FIT },
        { label: "Construction", value: TROUSER_CONSTRUCTION },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Cricket Whites Trousers" },
      pdpCustomizationSteps: customizeSteps([
        ["White shade", "White or near-white, matched to your whites shirt"],
        TROUSER_FABRIC_STEP,
        TROUSER_WAIST_STEP,
        TROUSER_HEM_STEP,
        ["Branding", "Embroidered crest, sponsor marks, manufacturer mark"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "White shade matched to your whites shirt and approved on the sample before we cut",
        "Opacity checked under stretch on your sample",
        INSEAM_POINT,
        "The full roster produced in one run, same fabric roll, so every pair matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "training-tee",
      cardTitle: "Custom Cricket Training Tee",
      cardSubline: "Lightweight sublimated practice shirt",
      image: "",
      imageAlt: "Custom Cricket Training Tee",
      href: `${PLP}/training-tee`,
      sku: "CAP-CRK-06",
      pdpHeading: "Custom Cricket Training Tee Manufacturer",
      pdpMetaTitle: "Custom Cricket Training Tee Manufacturer",
      pdpDescription:
        "Lightweight cricket training tee, custom and private label, full-dye sublimated in your club colors with crest and squad details in the print, in a breathable micro-mesh or bird's-eye polyester, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cricket Training Tee"),
      pdpMetaDescription:
        "Custom cricket training tee manufacturer: lightweight sublimated practice shirts in micro-mesh polyester, club colors and crests, MOQ 50, DDP to 20+ countries.",
      material: "Micro-mesh or bird's-eye polyester, ultra-light mesh or polyester interlock",
      pdpFabricPills: ["Micro-mesh", "Bird's-eye", "Ultra-light mesh", "Polyester interlock"],
      pdpCustomizationPills: ["Sublimated club colors", "Squad numbers or initials", "Pantone color match", "Custom labels"],
      faqs: [
        {
          q: "How is the cricket training tee different from the cricket match jersey?",
          a: "The cricket training tee is a lighter, simpler practice build: a crew neck, a lightweight mesh body and no match-day collar or trim. It is sublimated in the same colors as your match kit, so training and match wear read as one program.",
        },
        {
          q: "Can squad numbers or initials go on the cricket training tee?",
          a: "Yes. Numbers, initials or player names are built into the same print file as the design and dyed into the fabric, so they add no cost or weight and will not peel.",
        },
        {
          q: "What fabric is the cricket training tee built in?",
          a: "The cricket training tee is built in micro-mesh or bird's-eye polyester for airflow, ultra-light mesh for hot-weather sessions, or polyester interlock for a smoother print face. Weight is confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Short-Sleeve Cricket Match Jersey", slug: "colored-match-jersey-short-sleeve", href: PLP },
        { label: "Custom Colored Cricket Trousers", slug: "colored-trousers", href: PLP },
        { label: "Custom Cricket Fleece Pullover", slug: "fleece-pullover", href: PLP },
        { label: "Custom Cricket Cap", slug: "cap", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Cricket training tee, crew neck, short sleeve (base type)" },
        {
          label: "Fabric",
          value:
            "Micro-mesh or bird's-eye polyester, ultra-light mesh for hot-weather sessions, polyester interlock for a smoother print face",
        },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Neck", value: "Crew neck with a flat, non-curling rib or self-fabric finish" },
        { label: "Sleeve", value: "Short sleeve, set-in" },
        {
          label: "Decoration",
          value: "Full-dye sublimation, with club crest, sponsor marks and squad numbers or initials in the print",
        },
        { label: "Color", value: "Full sublimation color range, Pantone matched to your match kit" },
        { label: "Fit", value: SPEC_FIT },
        { label: "Construction", value: "Flatlock and overlock seams" },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Cricket Training Tee" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation, unlimited colors and gradients in one file at one cost"],
        ["Squad details", "Numbers, initials or player names built into the print file"],
        ["Branding", "Sublimated or embroidered crest, sponsor marks, manufacturer mark"],
        ["Fabric", "Micro-mesh, bird's-eye or polyester interlock, sourced or matched to your reference"],
        ["Color", "Pantone, CMYK, RGB or hex matched to your match kit, confirmed on your digital proof"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: PROOF_AND_SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Digital proof and Pantone match approved before we cut",
        "Numbers and initials dyed into the fiber, so they will not crack or peel",
        "Color matched to your match kit, so training and match wear read as one program",
        "The full roster produced in one run, same fabric roll and print batch, so every tee matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "fleece-pullover",
      cardTitle: "Custom Cricket Fleece Pullover",
      cardSubline: "Brushed fleece, off-field and warm-up layer",
      image: "",
      imageAlt: "Custom Cricket Fleece Pullover",
      href: `${PLP}/fleece-pullover`,
      sku: "CAP-CRK-07",
      pdpHeading: "Custom Cricket Fleece Pullover Manufacturer",
      pdpMetaTitle: "Custom Cricket Fleece Pullover Manufacturer",
      pdpDescription:
        "Cricket fleece pullover, custom and private label, an off-field and warm-up layer in brushed polyester fleece with a crew or quarter-zip neck and an embroidered club crest, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cricket Fleece Pullover"),
      pdpMetaDescription:
        "Custom cricket fleece pullover manufacturer: brushed polyester fleece off-field layers, crew or quarter-zip, embroidered crest, MOQ 50, DDP to 20+ countries.",
      material: "Brushed-back polyester fleece or recycled polyester fleece, rib-knit trims",
      pdpFabricPills: ["Brushed polyester fleece", "Rib-knit trims", "Recycled polyester fleece", "Polyester/Spandex rib"],
      pdpCustomizationPills: ["Crew or quarter-zip", "Embroidered crest", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "Why make the cricket fleece pullover instead of a knitted cricket sweater?",
          a: "The cricket fleece pullover is cut and sewn on the same line as the rest of the kit, so it is colored, branded and delivered with the match and training wear in one order. Capriowear does not make knitted sweaters; the fleece pullover is our off-field layer.",
        },
        {
          q: "Does the cricket fleece pullover come with a crew or quarter-zip neck?",
          a: "Both. The cricket fleece pullover is built with a crew neck or a quarter-zip with a stand collar and covered zip, chosen per club and confirmed on your sample.",
        },
        {
          q: "How is the club crest applied to the cricket fleece pullover?",
          a: "The club crest is embroidered onto the cricket fleece pullover in thread matched to your Pantone colors, with sponsor marks embroidered or printed. Placement and size are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Cricket Whites Shirt", slug: "whites-shirt", href: PLP },
        { label: "Custom Cricket Training Tee", slug: "training-tee", href: PLP },
        { label: "Custom Cricket Cap", slug: "cap", href: PLP },
        { label: "Custom Short-Sleeve Cricket Match Jersey", slug: "colored-match-jersey-short-sleeve", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Cricket fleece pullover, off-field and warm-up layer (base type)" },
        {
          label: "Fabric",
          value: "Brushed-back polyester fleece, recycled polyester fleece available, with rib-knit cuffs and hem",
        },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Neck", value: "Crew neck, or a quarter-zip with a stand collar and a covered zip" },
        { label: "Sleeve", value: "Long sleeve, set-in or raglan, with rib cuffs" },
        { label: "Hem", value: "Rib-knit waistband, finished flat" },
        { label: "Color", value: "Solid team colors, Pantone matched to your kit, with contrast trim optional" },
        { label: "Decoration", value: "Embroidered club crest and sponsor marks, with printed marks optional" },
        { label: "Fit", value: TEAM_CUT_FIT },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Cricket Fleece Pullover" },
      pdpCustomizationSteps: customizeSteps([
        ["Neck and build", "Crew neck or quarter-zip, set-in or raglan sleeve"],
        ["Color", "Solid team colors and contrast trim, Pantone matched to your kit"],
        ["Decoration", "Embroidered crest and sponsor marks, printed marks on request"],
        ["Fabric", "Brushed polyester fleece or recycled polyester fleece, sourced or matched to your reference"],
        ["Fit", "Team cut, graded across the full size run"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Fleece color Pantone matched to your kit and approved on the sample before we cut",
        "Crest embroidery finished clean and flat, with no puckering on the fleece face",
        "Zip, cuffs and hem checked for a flat, even finish across the size run",
        "The full roster produced in one run, same fabric lot, so every pullover matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "cap",
      cardTitle: "Custom Cricket Cap",
      cardSubline: "Paneled cap, embroidered crest",
      image: "",
      imageAlt: "Custom Cricket Cap",
      href: `${PLP}/cap`,
      sku: "CAP-CRK-08",
      pdpHeading: "Custom Cricket Cap Manufacturer",
      pdpMetaTitle: "Custom Cricket Cap Manufacturer",
      pdpDescription:
        "Cricket cap, custom and private label, cut and sewn from fabric panels in your team colors with an embroidered club crest, a peak and an adjustable or fitted closure, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cricket Cap"),
      pdpMetaDescription:
        "Custom cricket cap manufacturer: paneled cut-and-sew caps with an embroidered crest, team colors, adjustable or fitted closure, MOQ 50, DDP to 20+ countries.",
      material: "Polyester twill or performance polyester, cotton twill on request, mesh panels optional",
      // No clothing size range on a cap: the third key fact is its closure
      // sizing instead of the shared "XS to 5XL sizes" (owner spec).
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "Adjustable or fitted sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpFabricPills: ["Polyester twill", "Performance polyester", "Cotton twill", "Mesh panels"],
      pdpCustomizationPills: ["Embroidered crest", "Team colors", "Adjustable or fitted", "Custom labels"],
      faqs: [
        {
          q: "How is the cricket cap constructed?",
          a: "The cricket cap is cut and sewn from fabric panels into a structured or unstructured crown, with sewn eyelets, an inner sweatband and a pre-curved or flat peak. The build is confirmed on your sample before bulk.",
        },
        {
          q: "What closure options are there on the cricket cap?",
          a: "The cricket cap is built with an adjustable strap, a snapback or fitted sizes, chosen to suit your squad and confirmed on your sample.",
        },
        {
          q: "Can the cricket cap match our kit colors?",
          a: "Yes. The cricket cap panels are cut from fabric dyed to your Pantone colors, and the crest is embroidered in thread matched to the same colors, so the cap matches the rest of the kit.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Cricket Fleece Pullover", slug: "fleece-pullover", href: PLP },
        { label: "Custom Short-Sleeve Cricket Match Jersey", slug: "colored-match-jersey-short-sleeve", href: PLP },
        { label: "Custom Cricket Whites Shirt", slug: "whites-shirt", href: PLP },
        { label: "Custom Cricket Training Tee", slug: "training-tee", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Cricket cap, paneled crown with a peak (base type)" },
        {
          label: "Fabric",
          value: "Polyester twill or performance polyester, with cotton twill on request and mesh panels optional",
        },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Crown", value: "Cut-and-sew fabric panels, structured or unstructured, with sewn eyelets" },
        { label: "Peak", value: "Pre-curved or flat peak, to your spec" },
        { label: "Closure", value: "Adjustable strap, snapback or fitted sizes" },
        { label: "Sweatband", value: "Inner sweatband, finished flat" },
        { label: "Decoration", value: "Embroidered club crest on the front panel, with side or back marks optional" },
        { label: "Color", value: "Solid team colors, Pantone matched to your kit, with a contrast peak or trim optional" },
        { label: "Branding", value: "Club crest, sponsor marks, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Cricket Cap" },
      pdpCustomizationSteps: customizeSteps([
        ["Crown and peak", "Structured or unstructured crown, pre-curved or flat peak"],
        ["Closure", "Adjustable strap, snapback or fitted sizes"],
        ["Color", "Solid team colors, contrast peak or trim, Pantone matched to your kit"],
        ["Decoration", "Embroidered front crest, side and back marks"],
        ["Fabric", "Polyester twill, performance polyester or cotton twill, with mesh panels optional"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Cap color Pantone matched to your kit and approved on the sample before we cut",
        "Crest embroidery checked for clean, even stitching on the front panel",
        "Panel seams, eyelets and peak shape checked for consistency across the run",
        "Closure and fit checked across every size you order",
        AQL_POINT,
      ],
    },
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
