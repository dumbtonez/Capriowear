// content/teamwear/basketball.ts
// Second Teamwear category, same `Category` shape as Cricket
// (content/teamwear/cricket.ts) and every Activewear category
// (content/activewear/types.ts) -- a pure content/data drop: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts. `group: "Teamwear"` is the
// only thing that marks this as a Teamwear category rather than an
// Activewear one.
//
// Batch 1 (owner spec, 2026-09-25): PLP fixes (meta, 8 cards in SKU order,
// fabric note, customization Fabric item, trust bullet 2, 8 FAQs) and draft
// PDPs for CAP-BKB-01 to 03. The two legacy drafts at game-jersey and
// reversible-practice-jersey are replaced in full by SKUs 01 and 02 (same
// slugs). Cards 04 to 08 are card-only drafts: non-links, no route, until
// their PDP content lands and they switch to links automatically.
//
// Every style is "draft": noindexed, out of the sitemap and the
// CollectionPage/ItemList, BreadcrumbList only. `draftPdpsReachable` (same
// TEMPORARY opt-in as Cricket) lets the drafts with PDP content render and
// their cards link. No gender toggle: the Teamwear PLP template never
// renders it.
//
// Cut-and-sew scope (owner standing rule, 2026-09-05, set on Cricket) --
// socks and arm sleeves are knitted/circular-knit goods, typically sourced,
// not cut-and-sew, so neither is a style card here.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape Cricket
// introduced -- no component or type change needed for this category.
//
// No basketball GSM number is ever stated (owner spec) -- every
// fabric-weight reference is worded as "tuned to your program/confirmed on
// your sample," never a made-up figure.
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/basketball";

const QUALITY_HEADING = "The color you approve, on every kit";
const PROOF_AND_SAMPLE_SUBLINE = "We confirm it all on your digital proof and sample before the full roster is produced.";
const NAMES_NUMBERS_POINT = "Names and numbers dyed into the fiber, so they will not crack or peel";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";

const PENDING_WEIGHT = "Pending, confirmed on your sample.";
const NECKLINE = "Crew or V-neck, finished with a flat binding";

type Step = [title: string, body: string];
const TRIMS_STEP: Step = ["Trims and finish", "Woven labels, size and care labels, hangtags"];
const PACKAGING_STEP: Step = ["Packaging", "Polybags, boxes, retail-ready to your spec"];

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

export const basketball: Category = {
  slug: "basketball",
  group: "Teamwear",
  menuLabel: "Basketball",
  // Entity FAQ (PLP FAQ 1 and FAQ 1 on every PDP) is built by
  // categoryEntityFaq() from these four fields.
  manufacturerNoun: "Basketball Uniform",
  productNounPlural: "basketball uniforms and kits",
  entityExampleStyles: "game and reversible practice jerseys, shorts, shooting shirts and warm-ups",
  entityFabrics: "polyester micro-mesh, interlock, tricot and fleece",
  h1: "Custom Basketball Uniform Manufacturer",
  metaTitle: "Custom Basketball Uniform Manufacturer",
  metaDescription:
    "Custom basketball uniform manufacturer: private label sublimated game and reversible jerseys, shorts and warm-ups, MOQ 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Teamwear has no gender split (owner spec, 2026-09-25).
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  // Trimmed to 4 rows (owner spec, 2026-09-06, "leaner for mobile and a
  // buyer skim") -- was 7.
  fabricOptions: [
    {
      fabric: "Polyester micro-mesh or microfiber",
      bestFor: "Game jerseys",
      performance: "Lightweight, breathable, prints cleanly",
    },
    {
      fabric: "Polyester interlock or pique",
      bestFor: "Shorts and structured pieces",
      performance: "Durable, holds shape",
    },
    {
      fabric: "Two-layer reversible mesh",
      bestFor: "Reversible practice jerseys",
      performance: "Two colorways in one garment",
    },
    {
      fabric: "Tricot or fleece",
      bestFor: "Shooting shirts and warm-ups",
      performance: "Warm-up layers",
    },
  ],
  fabricNote: [
    {
      text: "Polyester-based for full-color sublimation. Game jerseys run light and breathable, and reversible jerseys are two layers, so they weigh more. Weight is tuned to your program and confirmed on your sample. Polyester/Spandex trims and recycled polyester available. Swatches before every bulk run.",
    },
  ],
  fabricPills: ["Micro-mesh", "Microfiber", "Interlock", "Two-layer reversible mesh", "Polyester/Spandex panels", "Tricot/fleece"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    // Trimmed to 4 rows (owner spec, 2026-09-06) -- was 5.
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Graphics, fades, names, numbers, sponsor logos",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn numbers and lettering",
        notes: "Raised, classic look, a premium option",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and number bars",
        notes: "Raised, full-color",
      },
      {
        method: "Embroidery",
        bestFor: "Crests, badges, sponsor marks",
        notes: "Raised, premium texture",
      },
    ],
    // Segment array, not a plain string (owner spec, 2026-09-06: highlight
    // one small, important phrase, semibold, not the whole sentence).
    note: [
      { text: "Methods combine on one kit: a sublimated body with fade graphics, sublimated numbers, and an embroidered crest is " },
      { text: "a common premium build", bold: true },
      { text: "." },
    ],
  },
  qualityHeading: QUALITY_HEADING,
  qualitySubline:
    "We confirm the color, the print, the numbering and the fit on your digital proof and your sample before the full roster is produced.",
  qualityPoints: [
    "Digital proof and Pantone match approved before we cut",
    "Names and numbers sublimated into the fiber, so they will not crack or peel",
    "Reversible jerseys, each side its own colorway, name and number, checked to match",
    "The full roster produced in one run and inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Polyester micro-mesh and interlock, Polyester/Spandex trims, tricot or fleece warm-ups",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, fades and gradients, names and numbers in the print, Pantone matching, home and away",
    },
    {
      title: "Decoration",
      body: "Tackle twill, sublimation twill patches, embroidered crests",
    },
    {
      title: "Finishing",
      body: "Your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // 8 FAQs (owner spec, 2026-09-25): the entity question is prepended at
  // render time by categoryEntityFaq(), then these 7.
  faqs: [
    {
      q: "What is your MOQ for custom basketball kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "How is a reversible basketball practice jersey built?",
      a: "A reversible basketball practice jersey is built as two full mesh layers, each sublimated with its own colorway, name and number, then joined into one garment that can be worn either side out. Two layers weigh a little more and breathe a little less than a single-layer jersey, which is the trade-off for two kits in one.",
    },
    {
      q: "How are names and numbers applied?",
      a: "Names and numbers are built into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Tackle twill and sublimation twill are available for a raised look.",
    },
    {
      q: "Which jersey numbers can we use?",
      a: "Jersey numbering rules differ by governing body and change between seasons, including which digits are allowed and the size and placement of numbers. Tell us your competition and we set the numbering to its current rules and confirm it on your digital proof before we cut.",
    },
    {
      q: "Which fabrics do you use, and how is weight decided?",
      a: "We build basketball game jerseys in lightweight polyester micro-mesh or microfiber, shorts in polyester interlock or pique, reversible jerseys in a two-layer mesh and warm-ups in tricot or fleece, with a recycled polyester option. Weight is tuned to your program and confirmed on your sample.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // TEMPORARY (owner, 2026-09-25): opts Basketball into the draft-PDP rule,
  // same as Cricket, so the drafts with PDP content get noindexed pages and
  // their cards link. See the field's own comment in
  // content/activewear/types.ts.
  draftPdpsReachable: true,
  // 8 drafts, SKU order (CAP-BKB-01 to 08). Card title = H1 minus
  // " Manufacturer" = title-tag name = breadcrumb = alt = every pill label
  // that targets it. Pills carry a `slug`, so a pill for a card-only SKU
  // falls back to the PLP and switches to its PDP by itself.
  styleCards: [
    {
      status: "draft",
      slug: "game-jersey",
      cardTitle: "Custom Basketball Game Jersey",
      cardSubline: "Sleeveless sublimated, crew or V-neck",
      image: "",
      imageAlt: "Custom Basketball Game Jersey",
      href: `${PLP}/game-jersey`,
      sku: "CAP-BKB-01",
      pdpHeading: "Custom Basketball Game Jersey Manufacturer",
      pdpMetaTitle: "Custom Basketball Game Jersey Manufacturer",
      pdpDescription:
        "Sleeveless basketball game jersey, custom and private label, full-dye sublimated with names, numbers and sponsor logos built into the print, in a lightweight polyester micro-mesh, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Basketball Game Jersey"),
      pdpMetaDescription:
        "Custom basketball game jersey manufacturer: sleeveless sublimated jerseys, names and numbers in the print, crew or V-neck, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight polyester micro-mesh or microfiber body, Polyester/Spandex trims",
      pdpFabricPills: ["Micro-mesh", "Microfiber", "Polyester interlock", "Polyester/Spandex trim"],
      pdpCustomizationPills: ["Sublimated names & numbers", "Pantone color match", "Home & away kits", "Custom labels"],
      faqs: [
        {
          q: "What neckline and armhole options are there on the basketball game jersey?",
          a: "The basketball game jersey is built with a crew or V-neck finished in a flat binding, and a wide, deep armhole for a full shooting range with a bound or ribbed finish, all set to your spec and confirmed on your sample.",
        },
        {
          q: "What is a drop-tail hem on a basketball game jersey?",
          a: "A drop-tail hem cuts the back panel of the basketball game jersey longer than the front, so the jersey stays tucked and the lower back stays covered through play. It is an option, built to your spec.",
        },
        {
          q: "Can you produce home and away basketball game jerseys in one order?",
          a: "Yes. Home and away basketball game jerseys are planned into one order and share the same print files, sizing and roster, so both colorways match as a set.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Reversible Basketball Practice Jersey", slug: "reversible-practice-jersey", href: PLP },
        { label: "Custom Basketball Shorts", slug: "shorts", href: PLP },
        { label: "Custom Sleeved Basketball Jersey", slug: "sleeved-jersey", href: PLP },
        { label: "Custom Basketball Shooting Shirt", slug: "shooting-shirt", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Basketball game jersey, sleeveless (base type)" },
        { label: "Fabric", value: "Lightweight polyester micro-mesh or microfiber body, Polyester/Spandex trims" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Neckline", value: NECKLINE },
        { label: "Armhole", value: "Cut wide and deep for a full shooting range, with a bound or ribbed finish" },
        { label: "Hem", value: "Straight hem, or a drop-tail with a longer back panel, to your spec" },
        {
          label: "Decoration and color",
          value:
            "Full-dye sublimation in any color range, including fades and gradients, Pantone matched, with names, numbers and sponsor logos in the print. Tackle twill or sublimation twill optional.",
        },
        { label: "Fit", value: "Team cut or fitted, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Construction", value: "Flatlock or overlock seams, mesh side panels optional" },
        { label: "Branding", value: "Team crest, sponsor logos, jock tag at the hem, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Basketball Game Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation, unlimited colors, fades and gradients in one file at one cost"],
        [
          "Names and numbers",
          "Built into the print file per player, or tackle twill and sublimation twill for a raised look",
        ],
        ["Branding", "Embroidered or sublimated crests, sponsor logos, jock tag"],
        ["Fabric", "Any polyester knit and weight, sourced or matched to your reference"],
        ["Color", "Pantone, CMYK, RGB or hex matched, confirmed on your digital proof"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: PROOF_AND_SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Digital proof and Pantone match approved before we cut",
        NAMES_NUMBERS_POINT,
        "Numbering size and placement set to your competition's rules and confirmed on your proof",
        "The full roster produced in one run, same fabric roll and print batch, so every kit matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "reversible-practice-jersey",
      cardTitle: "Custom Reversible Basketball Practice Jersey",
      cardSubline: "Two layers, a colorway on each side",
      image: "",
      imageAlt: "Custom Reversible Basketball Practice Jersey",
      href: `${PLP}/reversible-practice-jersey`,
      sku: "CAP-BKB-02",
      pdpHeading: "Custom Reversible Basketball Practice Jersey Manufacturer",
      pdpMetaTitle: "Custom Reversible Basketball Practice Jersey Manufacturer",
      pdpDescription:
        "Reversible basketball practice jersey, custom and private label, built as two sublimated polyester mesh layers joined into one garment, with its own colorway, name and number on each side, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Reversible Basketball Practice Jersey"),
      pdpMetaDescription:
        "Custom reversible basketball practice jersey manufacturer: two sublimated mesh layers, a colorway and number on each side, MOQ 50, DDP to 20+ countries.",
      material: "Two full layers of lightweight polyester micro-mesh or tricot mesh",
      pdpFabricPills: ["Two-layer mesh", "Micro-mesh", "Tricot mesh", "Polyester/Spandex trim"],
      pdpCustomizationPills: ["Two colorways in one", "Numbers on each side", "Pantone color match", "Custom labels"],
      faqs: [
        {
          q: "How is the reversible basketball practice jersey built?",
          a: "The reversible basketball practice jersey is built as two full mesh layers, each sublimated with its own colorway, name and number, then joined into one garment that can be worn either side out. The join is confirmed on your sample before bulk.",
        },
        {
          q: "Does the reversible basketball practice jersey weigh more than a single-layer jersey?",
          a: "Yes. The reversible basketball practice jersey is two layers of mesh, so it weighs a little more and breathes a little less than a single-layer game jersey. That is the trade-off for two full kits in one garment, and the weight is confirmed on your sample.",
        },
        {
          q: "Can each side of the reversible basketball practice jersey carry a different name and number?",
          a: "Yes. Each side of the reversible basketball practice jersey is its own print file, so each face can carry a fully independent colorway, name and number.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Basketball Game Jersey", slug: "game-jersey", href: PLP },
        { label: "Custom Basketball Scrimmage Vest", slug: "scrimmage-vest", href: PLP },
        { label: "Custom Basketball Shorts", slug: "shorts", href: PLP },
        { label: "Custom Basketball Shooting Shirt", slug: "shooting-shirt", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Reversible basketball practice jersey, sleeveless (base type)" },
        { label: "Fabric", value: "Two full layers of lightweight polyester micro-mesh or tricot mesh" },
        { label: "Weight", value: "Pending, confirmed on your sample. Two layers weigh more than a single-layer jersey." },
        {
          label: "Construction",
          value:
            "Each side sublimated as its own panel, then the two layers joined into one reversible garment. The join is confirmed on your sample.",
        },
        { label: "Neckline", value: NECKLINE },
        { label: "Armhole", value: "Wide, bound armhole for a full range of movement" },
        { label: "Decoration", value: "Full-dye sublimation, with an independent colorway, name and number on each side" },
        { label: "Color", value: "Two colorways in one garment, both Pantone matched" },
        { label: "Fit", value: "Team cut, graded XS to 5XL, men's, women's and youth blocks" },
        {
          label: "Branding",
          value: "Team crest, sponsor logos and manufacturer mark on either or both sides, woven and care labels, packaging",
        },
      ],
      specificationsImage: { alt: "Custom Reversible Basketball Practice Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Two colorways in one", "Each side its own full-dye design, colorway, name and number"],
        ["Print and artwork", "Full-dye sublimation, unlimited colors, each side its own print file"],
        ["Branding", "Embroidered or sublimated crests and sponsor marks on either or both sides"],
        ["Fabric", "Lightweight polyester mesh, sourced or matched to your reference"],
        ["Color", "Pantone, CMYK, RGB or hex matched on both sides, confirmed on your digital proof"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: PROOF_AND_SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Both colorways Pantone matched and approved on your proof before we cut",
        "Both sides checked so names and numbers sit true on each face",
        NAMES_NUMBERS_POINT,
        "The full roster produced in one run, same fabric roll and print batch, so every jersey matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "shorts",
      cardTitle: "Custom Basketball Shorts",
      cardSubline: "Longer inseam, mesh side panels, drawcord waist",
      image: "",
      imageAlt: "Custom Basketball Shorts",
      href: `${PLP}/shorts`,
      sku: "CAP-BKB-03",
      pdpHeading: "Custom Basketball Shorts Manufacturer",
      pdpMetaTitle: "Custom Basketball Shorts Manufacturer",
      pdpDescription:
        "Basketball shorts, custom and private label, full-dye sublimated to match your game jersey, with a longer inseam, mesh side panels and an elastic drawcord waist, in a polyester interlock or micro-mesh knit, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Basketball Shorts"),
      pdpMetaDescription:
        "Custom basketball shorts manufacturer: sublimated shorts with a longer inseam, mesh side panels and drawcord waist, MOQ 50 pieces, DDP to 20+ countries.",
      material: "Polyester interlock, pique or micro-mesh body, with mesh side panels",
      pdpFabricPills: ["Polyester interlock", "Pique", "Micro-mesh", "Polyester/Spandex trim"],
      pdpCustomizationPills: ["Matched to your jersey", "Inseam to length", "Liner optional", "Custom labels"],
      faqs: [
        {
          q: "Can the basketball shorts be matched to our game jersey?",
          a: "Yes. The basketball shorts are sublimated from the same print files and Pantone values as your game jersey, and both are confirmed together on your proof and sample before bulk.",
        },
        {
          q: "What inseam do the basketball shorts have?",
          a: "The basketball shorts are cut with a longer inseam, set to your spec and graded across the size run. The inseam is confirmed on your sample before bulk.",
        },
        {
          q: "Do the basketball shorts come with a liner?",
          a: "The basketball shorts are built with or without an inner brief liner, chosen per program and confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Basketball Game Jersey", slug: "game-jersey", href: PLP },
        { label: "Custom Reversible Basketball Practice Jersey", slug: "reversible-practice-jersey", href: PLP },
        { label: "Custom Basketball Warm-Up Pants", slug: "warm-up-pants", href: PLP },
        { label: "Custom Basketball Shooting Shirt", slug: "shooting-shirt", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Basketball shorts (base type)" },
        { label: "Fabric", value: "Polyester interlock, pique or micro-mesh body, with mesh side panels" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Waist", value: "Elastic waistband with an internal drawcord, finished flat" },
        { label: "Inseam", value: "Longer basketball inseam, set to your spec and graded across the size run" },
        { label: "Side panels", value: "Mesh side panels for airflow, sized to your design" },
        { label: "Liner", value: "With or without an inner brief liner, to your spec" },
        {
          label: "Decoration and color",
          value: "Full-dye sublimation, Pantone matched to your game jersey, with numbers, crest and sponsor logos in the print",
        },
        { label: "Fit", value: "Team cut, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Basketball Shorts" },
      pdpCustomizationSteps: customizeSteps([
        ["Color and print", "Full-dye sublimation matched to your game jersey, Pantone matched"],
        ["Fabric", "Polyester interlock, pique or micro-mesh, sourced or matched to your reference"],
        ["Waist and fit", "Elastic drawcord waist, team cut, graded across the full size run"],
        ["Inseam and panels", "Inseam to your length, mesh side panels to your design"],
        ["Branding", "Sublimated numbers, crest and sponsor marks"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: PROOF_AND_SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Shorts color matched to your game jersey and approved on the proof before we cut",
        "Inseam graded and checked across the full size run",
        "Waistband and drawcord checked for a flat, secure finish",
        "The full roster produced in one run, same fabric roll and print batch, so every pair matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "sleeved-jersey",
      cardTitle: "Custom Sleeved Basketball Jersey",
      cardSubline: "Set-in sleeves, sublimated mesh",
      image: "",
      imageAlt: "Custom Sleeved Basketball Jersey",
      href: `${PLP}/sleeved-jersey`,
      sku: "CAP-BKB-04",
    },
    {
      status: "draft",
      slug: "shooting-shirt",
      cardTitle: "Custom Basketball Shooting Shirt",
      cardSubline: "Warm-up top on the fleece platform",
      image: "",
      imageAlt: "Custom Basketball Shooting Shirt",
      href: `${PLP}/shooting-shirt`,
      sku: "CAP-BKB-05",
    },
    {
      status: "draft",
      slug: "scrimmage-vest",
      cardTitle: "Custom Basketball Scrimmage Vest",
      cardSubline: "Mesh training pinnie",
      image: "",
      imageAlt: "Custom Basketball Scrimmage Vest",
      href: `${PLP}/scrimmage-vest`,
      sku: "CAP-BKB-06",
    },
    {
      status: "draft",
      slug: "warm-up-jacket",
      cardTitle: "Custom Basketball Warm-Up Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom Basketball Warm-Up Jacket",
      href: `${PLP}/warm-up-jacket`,
      sku: "CAP-BKB-07",
    },
    {
      status: "draft",
      slug: "warm-up-pants",
      cardTitle: "Custom Basketball Warm-Up Pants",
      cardSubline: "Straight or tapered, tricot or fleece",
      image: "",
      imageAlt: "Custom Basketball Warm-Up Pants",
      href: `${PLP}/warm-up-pants`,
      sku: "CAP-BKB-08",
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, Teamwear sports only,
  // closest sports first.
  relatedLinks: [
    { label: "Volleyball", href: "/capriowear/teamwear/volleyball" },
    { label: "Soccer", href: "/capriowear/teamwear/soccer" },
    { label: "Football", href: "/capriowear/teamwear/football" },
    { label: "Baseball", href: "/capriowear/teamwear/baseball" },
    { label: "Ice Hockey", href: "/capriowear/teamwear/ice-hockey" },
  ],
};
