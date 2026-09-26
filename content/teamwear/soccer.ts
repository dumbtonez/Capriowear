// content/teamwear/soccer.ts
// Sixth Teamwear category, same `Category` shape as Cricket/Basketball/Rugby/
// Baseball/Volleyball (content/teamwear/*.ts) and every Activewear category
// (content/activewear/types.ts) -- a pure content/data drop: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts.
//
// PDP publish state (owner spec): every style ships "draft". Under the
// Teamwear draft-PDP rule (isDraftPdpReachable(), pdpShared.ts), 01 to 03
// carry PDP content (batch 1, 2026-09-26) and render as noindexed draft PDPs
// (BreadcrumbList only, out of the sitemap and the CollectionPage/ItemList)
// with linking cards; 04 to 08 are card-only non-links until their own
// batch. Publishing needs the roster confirmed, the style sampled and real
// photos (getPublishReadiness()).
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- socks are
// knitted goods, typically sourced, so no sock card here. The goalkeeper
// kit (split into Goalkeeper Jersey and Goalkeeper Shorts, 2026-09-26) stays:
// both are cut-and-sew, the foam padding is a sourced insert sewn in during
// the same run (owner spec).
//
// Uses `structuredBlock` (type "decoration"), the same field/shape every
// prior Teamwear category uses -- no component or type change needed here.
//
// Punctuation rule (owner spec, site-wide sweep): headings, eyebrows, labels
// and short fact/chip lines carry no trailing period; periods stay only on
// real sentences (leads, FAQ answers, descriptions, the fabric footnote, the
// Specifications subtitle, the final-CTA subline). Written period-clean from
// the start here, not swept after the fact.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows. No GSM figures (owner spec): weights are
// "Pending, confirmed on your sample."
import type { Category, StyleCard } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/soccer";

const QUALITY_HEADING = "Three kits, matched across the program";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";
const PENDING_WEIGHT = "Pending, confirmed on your sample.";
const SIZING = "Graded XS to 5XL, men's, women's and youth blocks";

type Step = [title: string, body: string];
const COLOR_STEP: Step = ["Color", "Pantone, CMYK, RGB or hex matched, confirmed on your digital proof"];
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

// Card-only draft (a later batch adds the PDP content, then the card links).
function cardOnly(sku: string, slug: string, cardTitle: string, cardSubline: string): StyleCard {
  return { status: "draft", slug, cardTitle, cardSubline, image: "", imageAlt: cardTitle, href: `${PLP}/${slug}`, sku };
}

export const soccer: Category = {
  slug: "soccer",
  group: "Teamwear",
  menuLabel: "Soccer",
  manufacturerNoun: "Soccer Uniform",
  productNounPlural: "soccer uniforms and kits",
  entityExampleStyles: "match jerseys, goalkeeper kits, shorts, and training tops",
  entityFabrics: "lightweight polyester microfiber and mesh",
  h1: "Custom Soccer Uniform Manufacturer",
  metaTitle: "Custom Soccer Uniform Manufacturer",
  metaDescription:
    "Custom soccer uniform manufacturer: sublimated soccer jerseys, shorts and goalkeeper kits, home, away and third kits, MOQ 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Lightweight polyester microfiber or mesh",
      bestFor: "Match jerseys",
      performance: "Very light, high airflow, prints cleanly",
    },
    {
      fabric: "Polyester interlock",
      bestFor: "Shorts",
      performance: "Smooth, durable, full sublimation",
    },
    {
      fabric: "Polyester/Spandex",
      bestFor: "Base layers, collars and cuffs",
      performance: "Four-way stretch, kept out of the match jersey body",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainability-positioned programs",
      performance: "Print result confirmed on your sample",
    },
  ],
  fabricNote: [
    {
      text: "Polyester-based for full-color sublimation. Match jerseys sit at the lightest end of our range and shorts are a smooth polyester interlock, with final weights tuned to your program and ",
    },
    { text: "confirmed on your sample", bold: true },
    { text: ". Swatches before every bulk run." },
  ],
  fabricPills: ["Lightweight microfiber", "Mesh", "Interlock", "Polyester/Spandex", "Recycled option"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Jersey and short graphics, names, numbers, sponsor logos",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Woven or embroidered crest",
        bestFor: "Club crest and badges",
        notes: "Raised, premium finish for the club mark",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and name or number bars",
        notes: "Raised, full-color",
      },
      {
        method: "Heat-transfer vinyl",
        bestFor: "Roster names and numbers applied per player over a printed design",
        notes: "Applied without re-printing the whole design; not a sublimated finish",
      },
    ],
    note: [
      { text: "A number zone in " },
      { text: "a solid contrasting color", bold: true },
      { text: " keeps numbers legible even on a busy sublimated jersey." },
    ],
  },
  qualityHeading: "Three kits, matched across the program",
  qualitySubline:
    "We confirm the color, the print, the numbering and the fit on your proof and sample before the full program is produced.",
  qualityPoints: [
    "Home, away and third kits produced in one program, matched across the run",
    "Names and numbers sublimated into the fiber, so they will not crack or peel",
    "Numbering, names and badge zones set to your competition's rules",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Lightweight polyester microfiber and mesh jerseys, polyester interlock shorts, Polyester/Spandex base layers and trim",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, names and numbers in the print, Pantone color matching, home, away and third kits",
    },
    {
      title: "Decoration",
      body: "Sublimation, woven or embroidered crests, engineered ventilation panels on player-issue jerseys",
    },
    {
      title: "Finishing",
      body: "Your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // 7 questions plus the auto-built entity question first (categoryEntityFaq(),
  // from entityExampleStyles/entityFabrics above), 8 total (owner spec,
  // 2026-09-26).
  faqs: [
    {
      q: "What is your MOQ for custom soccer kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Can home, away and third kits be produced together, and is the goalkeeper kit made in-house?",
      a: "Yes to both. A home, away and third kit program is produced in one coordinated roster order and run, so the kits match and share the same sizing and roster data. The goalkeeper jersey and shorts are cut-and-sew in-house; the padding is a sourced foam, cut and inserted during the same production run, in a color that stands apart from both teams and the officials, as the rules require.",
    },
    {
      q: "What is the difference between a player-issue, replica and slim fit?",
      a: "A player-issue athletic fit runs closer, with engineered ventilation panels; a replica fit runs a little looser and more relaxed; and a slim tailored fit is cut trimmer through the body and sleeve. We build any of the three to your spec, with weight confirmed on your sample.",
    },
    {
      q: "How are names and numbers applied?",
      a: "Sublimated names and numbers are built into the same print file as the design and dyed into the fabric in one pass, so there is nothing to peel. Heat-transfer vinyl is also available for roster names applied per player over a printed design. A contrasting number zone keeps numbers legible on a busy design.",
    },
    {
      q: "What badge, sponsor and numbering rules apply?",
      a: "They vary by competition. FIFA and the leagues set their own number sizes, name heights, reserved sleeve badge zones and color limits. Tell us your competition and we lay out the numbering, names and badges to its current rules, confirmed on your proof.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // 8 drafts, SKU order (CAP-SOC-01 to 08), owner spec 2026-09-26. Card
  // title = H1 minus " Manufacturer" = title-tag name = breadcrumb = alt =
  // every pill label that targets it. The old Goalkeeper Kit card is split
  // into Goalkeeper Jersey (03) and Goalkeeper Shorts (04). 01 to 03 carry
  // PDP content (batch 1); 04 to 08 are card-only non-links until their own
  // batch.
  styleCards: [
    {
      status: "draft",
      slug: "match-jersey",
      cardTitle: "Custom Soccer Match Jersey",
      cardSubline: "Lightweight sublimated, player-issue or replica fit",
      image: "",
      imageAlt: "Custom Soccer Match Jersey",
      href: `${PLP}/match-jersey`,
      sku: "CAP-SOC-01",
      pdpHeading: "Custom Soccer Match Jersey Manufacturer",
      pdpMetaTitle: "Custom Soccer Match Jersey Manufacturer",
      pdpDescription:
        "Soccer match jersey, custom and private label, a lightweight full-dye sublimated jersey in polyester microfiber, interlock or mesh, in a player-issue, replica or slim tailored fit, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Soccer Match Jersey"),
      pdpMetaDescription:
        "Custom soccer match jersey manufacturer: lightweight sublimated jerseys, player-issue, replica or slim fit, home, away and third, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight polyester microfiber, interlock or mesh",
      pdpFabricPills: ["Lightweight microfiber", "Polyester interlock", "Mesh ventilation", "Recycled option"],
      pdpCustomizationPills: ["Sublimated names & numbers", "Number zone", "Home, away & third", "Custom labels"],
      faqs: [
        {
          q: "What is the difference between a player-issue, replica and slim soccer match jersey?",
          a: "The player-issue soccer match jersey runs closer, with engineered or bonded ventilation panels; the replica fit runs a little looser and more relaxed; and the slim tailored fit is cut trimmer through the body and sleeve. We build any of the three to your spec, with weight confirmed on your sample.",
        },
        {
          q: "Can the soccer match jersey be produced as home, away and third kits together?",
          a: "Yes. All three are planned into one program and share the same print files, sizing and roster, so the soccer match jerseys match as a set.",
        },
        {
          q: "How do you keep numbers legible on a sublimated soccer match jersey?",
          a: "We set the number in a contrasting number zone, so it stays clearly readable over a full-color sublimated design, in line with your competition's legibility rules.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Soccer Shorts", slug: "shorts", href: PLP },
        { label: "Custom Goalkeeper Jersey", slug: "goalkeeper-jersey", href: PLP },
        { label: "Custom Soccer Training Top", slug: "training-top", href: PLP },
        { label: "Custom Soccer Base Layer", slug: "base-layer", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Soccer match jersey (base type)" },
        {
          label: "Fabric",
          value: "Lightweight polyester microfiber, interlock or mesh, with Polyester/Spandex trim at the collar and cuffs only",
        },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Player-issue athletic, replica or slim tailored fit" },
        {
          label: "Ventilation",
          value: "Engineered or bonded ventilation panels on the player-issue fit; mesh panels on the replica fit",
        },
        { label: "Neck and sleeve", value: "V-neck or crew collar; short or long sleeve, set-in or raglan" },
        {
          label: "Decoration",
          value: "Full-dye sublimation, names and numbers in the print, with a contrasting number zone for legibility",
        },
        { label: "Color", value: "Full sublimation color range, Pantone matched, home, away and third colorways" },
        { label: "Sizing", value: SIZING },
        {
          label: "Branding",
          value:
            "Club crest, sponsor and manufacturer marks laid out to your competition's badge rules, woven and care labels, packaging",
        },
      ],
      specificationsImage: { alt: "Custom Soccer Match Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation, unlimited colors in one file, with a woven, embroidered or sublimated crest"],
        ["Names and numbers", "Built into the print file, with a contrasting number zone for legibility"],
        ["Fit", "Player-issue athletic, replica or slim tailored fit, to your spec"],
        [
          "Fabric",
          "Lightweight polyester microfiber, interlock or mesh, sourced or matched to your reference; Polyester/Spandex at collars and cuffs only",
        ],
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the color, the numbering, the badge layout and the fit on your proof and sample before the full program is produced.",
      pdpQualityPoints: [
        "Home, away and third colorways matched across the program",
        "Numbering, names and badge zones set to your competition's rules",
        "Names and numbers dyed into the fiber, so they will not crack or peel",
        "The full roster produced in one run, same fabric roll and print batch, so every kit matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "shorts",
      cardTitle: "Custom Soccer Shorts",
      cardSubline: "Sublimated interlock, mesh ventilation, drawcord waist",
      image: "",
      imageAlt: "Custom Soccer Shorts",
      href: `${PLP}/shorts`,
      sku: "CAP-SOC-02",
      pdpHeading: "Custom Soccer Shorts Manufacturer",
      pdpMetaTitle: "Custom Soccer Shorts Manufacturer",
      pdpDescription:
        "Soccer shorts, custom and private label, a sublimated polyester interlock short with mesh side or inner ventilation and an elastic drawcord waist, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Soccer Shorts"),
      pdpMetaDescription:
        "Custom soccer shorts manufacturer: sublimated polyester interlock, mesh ventilation, drawcord waist, optional inner brief, MOQ 50, DDP to 20+ countries.",
      material: "Polyester interlock with mesh ventilation",
      pdpFabricPills: ["Polyester interlock", "Mesh ventilation", "Elastic drawcord", "Recycled option"],
      pdpCustomizationPills: ["Inseam length", "With or without inner brief", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "What inseam length are the custom soccer shorts?",
          a: "The custom soccer shorts sit above the knee, and we cut the inseam to your spec rather than lock you to one length, since it varies by preference and player height.",
        },
        {
          q: "Do the custom soccer shorts include an inner brief?",
          a: "That is your choice. We build the custom soccer shorts with or without an inner brief or compression liner, to your spec.",
        },
        {
          q: "Will the custom soccer shorts match the jersey program?",
          a: "Yes. The custom soccer shorts are produced in the same run and color-matched to the home, away and third jerseys, so the kit reads as a set.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Soccer Match Jersey", slug: "match-jersey", href: PLP },
        { label: "Custom Goalkeeper Shorts", slug: "goalkeeper-shorts", href: PLP },
        { label: "Custom Soccer Training Top", slug: "training-top", href: PLP },
        { label: "Custom Soccer Base Layer", slug: "base-layer", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Soccer shorts (base type)" },
        { label: "Fabric", value: "Polyester interlock" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Ventilation", value: "Mesh side panels or inner lining" },
        { label: "Length", value: "Above the knee, inseam to your spec" },
        { label: "Waistband", value: "Elastic with a flat internal drawcord" },
        { label: "Liner", value: "Optional inner brief, with or without, to your spec" },
        {
          label: "Decoration and color",
          value: "Full-dye sublimation, team colors and side detail, Pantone matched to the jersey program",
        },
        { label: "Sizing", value: SIZING },
        { label: "Branding", value: "Team logo, sponsor marks, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Soccer Shorts" },
      pdpCustomizationSteps: customizeSteps([
        ["Fit", "Inseam length to your spec, elastic drawcord waist"],
        ["Liner", "With or without an inner brief or compression liner"],
        ["Print and artwork", "Full-dye sublimation, team colors and side detail"],
        ["Fabric", "Polyester interlock with mesh ventilation, sourced or matched to your reference"],
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: "We confirm the fabric, the fit and the color on your sample before the full program is produced.",
      pdpQualityPoints: [
        "Inseam, waistband and liner confirmed on your sample",
        "Shorts color matched to the jersey program across the run",
        "Sublimated color Pantone matched and approved before we cut",
        "The full roster produced in one run, same fabric roll and print batch, so every pair matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "goalkeeper-jersey",
      cardTitle: "Custom Goalkeeper Jersey",
      cardSubline: "Long-sleeve padded jersey, distinct color",
      image: "",
      imageAlt: "Custom Goalkeeper Jersey",
      href: `${PLP}/goalkeeper-jersey`,
      sku: "CAP-SOC-03",
      pdpHeading: "Custom Goalkeeper Jersey Manufacturer",
      pdpMetaTitle: "Custom Goalkeeper Jersey Manufacturer",
      pdpDescription:
        "Goalkeeper jersey, custom and private label, a long-sleeve polyester jersey with foam elbow padding, sublimated in a color distinct from both teams, the jersey cut and sewn to your brand in Sialkot, Pakistan, with the padding sourced to your spec.",
      images: gallery("Custom Goalkeeper Jersey"),
      pdpMetaDescription:
        "Custom goalkeeper jersey manufacturer: long-sleeve soccer keeper jerseys with foam elbow pads, sublimated in a distinct color, MOQ 50, DDP to 20+ countries.",
      material: "Polyester interlock or microfiber with mesh ventilation inserts and sourced foam elbow pads",
      pdpFabricPills: ["Polyester interlock", "Mesh ventilation inserts", "Foam elbow pads", "Rib-knit cuffs"],
      pdpCustomizationPills: ["Distinct keeper colorway", "Names & numbers", "Pad placement", "Custom labels"],
      faqs: [
        {
          q: "Why does the goalkeeper jersey need a different color?",
          a: "Competition rules require the goalkeeper to wear a color that stands apart from both teams and the match officials, so the goalkeeper jersey is planned as its own colorway in your program and checked on your proof.",
        },
        {
          q: "How is the padding built into the goalkeeper jersey?",
          a: "The goalkeeper jersey is cut and sewn in-house, and the foam pads are a sourced insert sewn in during the same run. Elbow pads are standard, with shoulder and forearm padding optional, confirmed on your sample.",
        },
        {
          q: "Can the goalkeeper jersey be produced with the rest of the kit?",
          a: "Yes. The goalkeeper jersey is planned into the same program as the outfield kits, with the Custom Goalkeeper Shorts in the matching keeper colorway, so sizing and roster data stay consistent.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Goalkeeper Shorts", slug: "goalkeeper-shorts", href: PLP },
        { label: "Custom Soccer Match Jersey", slug: "match-jersey", href: PLP },
        { label: "Custom Soccer Shorts", slug: "shorts", href: PLP },
        { label: "Custom Soccer Base Layer", slug: "base-layer", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Goalkeeper jersey, long sleeve with padding (base type)" },
        { label: "Fabric", value: "Polyester interlock or microfiber, with mesh ventilation inserts" },
        { label: "Weight", value: PENDING_WEIGHT },
        {
          label: "Padding",
          value:
            "Foam elbow pads as standard, with shoulder and forearm padding optional, sourced to your spec and sewn in-house",
        },
        { label: "Sleeve", value: "Long sleeve with rib-knit cuffs" },
        { label: "Collar", value: "Rib-knit collar, crew or V-neck" },
        { label: "Decoration", value: "Full-dye sublimation, names and numbers in the print" },
        { label: "Color", value: "A keeper colorway distinct from both teams and the officials, Pantone matched" },
        { label: "Sizing", value: SIZING },
        { label: "Branding", value: "Club crest, sponsor and manufacturer marks, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Goalkeeper Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Padding", "Elbow pads as standard, shoulder and forearm padding optional, placement to your spec"],
        ["Print and artwork", "Full-dye sublimation in a distinct keeper colorway"],
        ["Names and numbers", "Built into the print file"],
        ["Fabric", "Polyester interlock or microfiber with mesh inserts, sourced or matched to your reference"],
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: "A keeper kit that stands apart",
      pdpQualitySubline:
        "We confirm the fabric, the pad placement, the color and the fit on your sample before the full program is produced.",
      pdpQualityPoints: [
        "Keeper colorway checked against both team kits and approved on your proof",
        "Pad placement at the elbows confirmed on your sample before bulk",
        "Pads sewn in flat and checked so they stay in place",
        "Produced in the same run as the outfield kits, so sizing and roster data match",
        AQL_POINT,
      ],
    },
    cardOnly("CAP-SOC-04", "goalkeeper-shorts", "Custom Goalkeeper Shorts", "Padded shorts, distinct color"),
    cardOnly("CAP-SOC-05", "training-top", "Custom Soccer Training Top", "Lighter training and warm-up jersey"),
    cardOnly("CAP-SOC-06", "presentation-jacket", "Custom Soccer Presentation Jacket", "Zip warm-up, tricot or stretch woven"),
    cardOnly("CAP-SOC-07", "training-bibs", "Custom Training Bibs", "Mesh scrimmage pinnies, numbered"),
    cardOnly("CAP-SOC-08", "base-layer", "Custom Soccer Base Layer", "Close-fit under-kit layer"),
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, Teamwear sports only,
  // closest sports first.
  relatedLinks: [
    { label: "Football", href: "/capriowear/teamwear/football" },
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
    { label: "Basketball", href: "/capriowear/teamwear/basketball" },
    { label: "Cricket", href: "/capriowear/teamwear/cricket" },
    { label: "Cycling", href: "/capriowear/teamwear/cycling" },
  ],
};
