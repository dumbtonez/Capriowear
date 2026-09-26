// content/teamwear/fight-wear.ts
// Tenth and final Teamwear category, same `Category` shape as every other
// Teamwear category (content/teamwear/*.ts) and every Activewear category
// (content/activewear/types.ts) -- a pure content/data drop: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts.
//
// Batch 1 (owner spec, 2026-09-26): PLP fixes (5 cards with codes, 3-row
// fabric table and footnote, customization Fabric item, trust bullet 2, 8
// FAQs) and draft PDPs for CAP-FGT-01 to 03, on the pattern Ice Hockey
// used. Every style is "draft": 01 to 03 render as noindexed draft PDPs
// (BreadcrumbList only, out of the sitemap and the CollectionPage/ItemList)
// with linking cards; 04 and 05 are card-only non-links until their batch.
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- closures and
// grip bands (hook-and-loop, drawcord, elastic waistband, silicone grip
// liner) are sourced trims sewn into a shell we cut and sew in-house, not
// standalone products, so none is a style card here. Muay Thai shorts are
// not a spec'd build (owner spec), so they have no card and no fabric row.
// A no-gi grappling top is a naming variant of the rash guard, not a
// separate build.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape every
// other Teamwear category uses -- no component or type change needed here.
//
// No fabric-weight figure or fixed Spandex percentage is ever stated (owner
// spec): weights are "Pending, confirmed on your sample." and the Spandex
// share is confirmed on the sample. Closures are "hook-and-loop", never a
// brand name.
//
// Punctuation rule (owner spec, site-wide sweep): headings, eyebrows, labels
// and short fact/chip lines carry no trailing period; periods stay only on
// real sentences (leads, FAQ answers, descriptions, the fabric footnote, the
// Specifications subtitle, the final-CTA subline).
//
// American spelling, no en/em dashes, "Spandex" never "elastane"/"Lycra",
// blends with a slash ("Polyester/Spandex").
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/fight-wear";

const QUALITY_HEADING = "Built to hold up on the mat";
const GRAPHICS_POINT = "Full-dye graphics dyed into the fabric, so they will not crack or peel";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";
const PENDING_WEIGHT = "Pending, confirmed on your sample.";

type Step = [title: string, body: string];
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

// The long- and short-sleeve rash guards share one build, so they share the
// same "How we customize" tiles and quality block (owner spec).
const RASH_GUARD_STEPS = customizeSteps([
  ["Print and artwork", "Full-dye sublimation, unlimited colors and gradients in one file at one cost"],
  ["Compliance colors", "Rank and division colors built accurately into the print and confirmed on your proof"],
  ["Naming", "Gym branding and athlete-name fields, not numbers"],
  ["Fabric", "Sublimated Polyester/Spandex knit, sourced or matched to your reference"],
  ["Fit", "Skin-tight cut, sewn or bonded neckline, men's, women's or unisex block"],
  ["Trims and finish", "Silicone grip hem, optional lockdown loop, woven labels, size and care labels, hangtags"],
  PACKAGING_STEP,
]);
const RASH_GUARD_QUALITY_SUB = "We confirm the seams, the fit and the grip on your sample before the full order is produced.";
const RASH_GUARD_QUALITY_POINTS = [
  "Flatlock seams pull-tested for grip and mat-abrasion stress",
  "Skin-tight fit checked against the IBJJF coverage rule on your sample",
  "Silicone grip hem set so the rash guard stays down through a full range of motion",
  GRAPHICS_POINT,
  AQL_POINT,
];

export const fightWear: Category = {
  slug: "fight-wear",
  group: "Teamwear",
  menuLabel: "Rash Guards & Fight Wear",
  // "and", not "&" (owner spec, 2026-09-06): this feeds the auto-built
  // entity-FAQ sentence's lowercase inline noun ("a custom rash guard and
  // fight wear manufacturer"), where an ampersand read oddly verbatim in
  // prose. `h1`/`menuLabel` below are separate, explicit fields -- neither
  // derives from this one -- so they keep the "&" form ("Rash Guards &
  // Fight Wear" / "Custom Rash Guard & Fight Wear Manufacturer")
  // unaffected by this change.
  manufacturerNoun: "Rash Guard and Fight Wear",
  productNounPlural: "rash guards and fight wear",
  entityExampleStyles: "rash guards, fight shorts, grappling spats, and compression tops",
  entityFabrics: "sublimated Polyester/Spandex knits",
  // Combat-sports-specific audience (owner spec, 2026-09-06) -- this
  // category's real buyers are combat-sports brands and academies, not the
  // generic activewear/teamwear-brand audience `categoryEntityFaq()`'s own
  // default clause names. See that function's own comment
  // (content/activewear/pdpShared.ts) and `Category.audienceClause`'s own
  // comment (content/activewear/types.ts).
  audienceClause: "for combat-sports brands, academies and teamwear suppliers worldwide",
  // H1 and metaTitle are deliberately different strings here (owner spec):
  // the on-page H1 is the broader category name, the title tag leads with
  // the higher-search-volume "BJJ" term to avoid a generic "uniform/kit"
  // collision, with "MMA" carried in the meta as the secondary term.
  h1: "Custom Rash Guard & Fight Wear Manufacturer",
  metaTitle: "Custom BJJ Rash Guard Manufacturer",
  metaDescription:
    "Custom BJJ and MMA rash guard manufacturer: sublimated rash guards, fight shorts and spats built to your competition's rules, MOQ 50, DDP to 20+ countries.",
  // Teamwear has no gender split (owner spec, 2026-09-25).
  showGenderFilter: false,
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Sublimated Polyester/Spandex rash guard knit",
      bestFor: "Rash guards, no-gi tops",
      performance: "Stretch, holds a full-color print, weight confirmed on your sample",
    },
    {
      fabric: "Sublimated compression knit",
      bestFor: "Grappling spats, compression tops",
      performance: "Close compression fit, full range of motion",
    },
    {
      fabric: "Woven polyester or Polyester/Spandex shell",
      bestFor: "MMA fight shorts",
      performance: "Light, durable, prints cleanly, cut for kicks and ground work",
    },
  ],
  fabricNote: [
    {
      text: "Polyester and Polyester/Spandex based, and every knit and shell takes full-color sublimation. Weights are tuned to the discipline and confirmed on your sample. Closures and grip bands are trims we source and sew into a shell we cut and sew in-house. Swatches before every bulk run.",
    },
  ],
  fabricPills: ["Rash guard knit", "Compression knit", "Woven shell"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Whole-garment graphics, gradients, rank and division colors, gym and athlete names",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and name bars",
        notes: "Raised, full-color",
      },
      {
        method: "Embroidery",
        bestFor: "Small crests and sponsor marks",
        notes: "Raised, premium texture",
      },
      {
        method: "Heat-transfer vinyl",
        bestFor: "Athlete names over a printed design",
        notes: "Applied per athlete without re-printing the whole design",
      },
    ],
    note: [
      { text: "Fight wear uses full sublimation the most, because " },
      { text: "rank and division colors have to be built accurately into the print", bold: true },
      { text: " and carried across a matched rash guard and short set." },
    ],
  },
  qualityHeading: QUALITY_HEADING,
  qualitySubline: "We confirm the seams, the fit and the grip on your sample before the full order is produced.",
  qualityPoints: [
    "Flatlock seams pull-tested for grip and mat-abrasion stress",
    GRAPHICS_POINT,
    "Shell cut and sewn in-house, closures and grip bands sourced and set to hold through a full range of motion",
    AQL_POINT,
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Sublimated Polyester/Spandex rash guard and compression knits, woven polyester or Polyester/Spandex short shells",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, unlimited colors and gradients, Pantone matching, rank and division colors built into the print",
    },
    {
      title: "Naming and fit",
      body: "Gym and athlete name built into the design, men's, women's or unisex pattern blocks, silicone grip hems",
    },
    {
      title: "Finishing",
      body: "Concealed short closures, your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // 8 FAQs (owner spec, 2026-09-26): the entity question is prepended at
  // render time by categoryEntityFaq() (with audienceClause above), then
  // these 7.
  faqs: [
    {
      q: "What is your MOQ for custom rash guards and fight wear?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Are your rash guards and fight shorts competition-legal?",
      a: "Yes, to the rules we build to. For IBJJF no-gi, a rash guard must be skin-tight, cover the torso to the shorts waistband, and carry at least 10 percent of the athlete's rank color or be fully that color, within black, white, or black and white; we build those colors into the sublimation print and confirm them on your proof. For amateur MMA, fight shorts can have no exposed hook-and-loop, pockets or zippers, so we build a concealed closure and keep the hem above the knee.",
    },
    {
      q: "How does personalization work here, names or numbers?",
      a: "Gym and athlete name, not numbers. Fight wear is named by gym and athlete, so we build gym branding and athlete-name fields into the design rather than a squad number.",
    },
    {
      q: "What makes the seams durable enough for daily mat use?",
      a: "Flatlock seams. They sit flat to resist chafing and mat abrasion where the garment is gripped and dragged, and we pull-test them on your sample before bulk.",
    },
    {
      q: "Which fabrics do you use, and are they sublimation-ready?",
      a: "A sublimated Polyester/Spandex knit for rash guards and compression tops, a sublimated compression knit for spats, and a woven polyester or Polyester/Spandex shell for fight shorts. All take full-color sublimation; weights are confirmed on your sample.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "rash guard",
  // 5 drafts, SKU order (CAP-FGT-01 to 05), owner spec 2026-09-26. Card
  // title = H1 minus " Manufacturer" = title-tag name = breadcrumb = alt =
  // every pill label that targets it. 01 to 03 carry PDP content (batch 1);
  // 04 and 05 are card-only non-links until their own batch. Pills carry a
  // `slug`, so a pill for a card-only style falls back to the PLP.
  styleCards: [
    {
      status: "draft",
      slug: "long-sleeve-rash-guard",
      cardTitle: "Custom Long-Sleeve Rash Guard",
      cardSubline: "Sublimated flatlock rash guard, silicone grip hem",
      image: "",
      imageAlt: "Custom Long-Sleeve Rash Guard",
      href: `${PLP}/long-sleeve-rash-guard`,
      sku: "CAP-FGT-01",
      pdpHeading: "Custom Long-Sleeve Rash Guard Manufacturer",
      pdpMetaTitle: "Custom Long-Sleeve Rash Guard Manufacturer",
      pdpDescription:
        "Long-sleeve rash guard, custom and private label, a skin-tight full-dye sublimated Polyester/Spandex knit with flatlock seams and a silicone grip hem, built to the IBJJF no-gi uniform rules, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Long-Sleeve Rash Guard"),
      pdpMetaDescription:
        "Custom long-sleeve rash guard manufacturer: sublimated Polyester/Spandex BJJ rash guards, IBJJF no-gi build, flatlock seams, MOQ 50, DDP to 20+ countries.",
      material: "Sublimated Polyester/Spandex knit",
      pdpFabricPills: ["Polyester/Spandex knit", "Flatlock seams", "Silicone grip hem", "Bonded neckline option"],
      pdpCustomizationPills: ["Rank & division colors", "Gym & athlete name", "Men's, women's or unisex", "Custom labels"],
      faqs: [
        {
          q: "Is the long-sleeve rash guard legal for IBJJF no-gi?",
          a: "Yes. We build the long-sleeve rash guard skin-tight and long enough to reach the shorts waistband, with at least 10 percent of the athlete's rank color or fully that color, within the black, white, or black and white colors the IBJJF allows. We confirm the colors on your proof.",
        },
        {
          q: "How is the rank color built into a custom long-sleeve rash guard?",
          a: "We build the required rank or division color into the sublimation print as part of the artwork, so the compliance color is dyed into the fabric rather than added on. You approve it on the digital proof.",
        },
        {
          q: "Can the long-sleeve rash guard be worn under a gi?",
          a: "Yes. The long-sleeve rash guard works as standalone no-gi wear and as a close-fit layer under a gi, where it wicks sweat and protects the gi fabric.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom MMA Fight Shorts", slug: "fight-shorts", href: PLP },
        { label: "Custom Short-Sleeve Rash Guard", slug: "short-sleeve-rash-guard", href: PLP },
        { label: "Custom Grappling Spats", slug: "spats", href: PLP },
        { label: "Custom Compression Top", slug: "compression-top", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Long-sleeve rash guard (base type)" },
        { label: "Fabric", value: "Sublimated Polyester/Spandex knit, with the Spandex share confirmed on your sample" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Skin-tight, long enough to cover the torso to the shorts waistband" },
        { label: "Seams", value: "Flatlock seams, flat to the skin where the garment is gripped and dragged" },
        { label: "Neckline", value: "Sewn rib collar, or a bonded neckline on request" },
        { label: "Hem", value: "Silicone grip band to keep the rash guard down, with a lockdown loop to the shorts optional" },
        { label: "Colors", value: "Full-dye sublimation, rank and division colors built into the print" },
        { label: "Sizing", value: "Graded XS to 5XL, men's, women's and unisex blocks" },
        { label: "Branding", value: "Gym and athlete name, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Long-Sleeve Rash Guard" },
      pdpCustomizationSteps: RASH_GUARD_STEPS,
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: RASH_GUARD_QUALITY_SUB,
      pdpQualityPoints: RASH_GUARD_QUALITY_POINTS,
    },
    {
      status: "draft",
      slug: "fight-shorts",
      cardTitle: "Custom MMA Fight Shorts",
      cardSubline: "Woven shell, concealed closure, gusset for full range",
      image: "",
      imageAlt: "Custom MMA Fight Shorts",
      href: `${PLP}/fight-shorts`,
      sku: "CAP-FGT-02",
      pdpHeading: "Custom MMA Fight Shorts Manufacturer",
      pdpMetaTitle: "Custom MMA Fight Shorts Manufacturer",
      pdpDescription:
        "MMA fight shorts, custom and private label, a woven polyester or Polyester/Spandex shell with a concealed hook-and-loop and drawcord closure, a stretch crotch gusset and side slits for kicks and ground work, sublimated and made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom MMA Fight Shorts"),
      pdpMetaDescription:
        "Custom MMA fight shorts manufacturer: woven shell, concealed hook-and-loop and drawcord closure, stretch gusset, side slits, MOQ 50, DDP to 20+ countries.",
      material: "Woven polyester or Polyester/Spandex shell",
      pdpFabricPills: ["Woven polyester shell", "Stretch gusset", "Side slits", "Silicone grip waistband"],
      pdpCustomizationPills: ["Sublimated graphics", "Gym & athlete name", "Inseam length", "Custom labels"],
      faqs: [
        {
          q: "Are the MMA fight shorts legal for sanctioned amateur MMA?",
          a: "Yes. We build the MMA fight shorts with a concealed closure and no exposed hook-and-loop, pockets or zippers, and keep the hem above the knee, to the amateur MMA rule. We confirm the build on your sample.",
        },
        {
          q: "What are the gusset and side slits on the MMA fight shorts for?",
          a: "A stretch crotch gusset and side slits let the leg move freely for kicks, takedowns and ground work, without the seams binding or tearing.",
        },
        {
          q: "Is the closure on the MMA fight shorts made in-house or sourced?",
          a: "The shell is cut and sewn in-house. The hook-and-loop, drawcord and any grip band are trims we source and sew into the shell, set to hold through a full range of motion.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Long-Sleeve Rash Guard", slug: "long-sleeve-rash-guard", href: PLP },
        { label: "Custom Grappling Spats", slug: "spats", href: PLP },
        { label: "Custom Compression Top", slug: "compression-top", href: PLP },
        { label: "Custom Short-Sleeve Rash Guard", slug: "short-sleeve-rash-guard", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "MMA fight shorts (base type)" },
        { label: "Fabric", value: "Woven polyester or Polyester/Spandex shell, with a stretch knit gusset" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Closure", value: "Hook-and-loop fly with an internal drawcord, concealed with no exposed hardware" },
        { label: "Gusset and side", value: "Stretch crotch gusset and side slits for full-range kicks and ground work" },
        { label: "Waistband", value: "Elastic waistband, with an optional silicone grip lining to stop ride-up" },
        { label: "Length", value: "Above the knee, inseam to your spec" },
        { label: "Decoration", value: "Full-dye sublimation, matched to the rash guard" },
        { label: "Sizing", value: "Graded XS to 5XL, with a waist and length per size" },
        { label: "Branding", value: "Gym and athlete name, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom MMA Fight Shorts" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation, matched to the rash guard"],
        ["Compliance", "Concealed closure and no exposed hardware, hem above the knee, to the amateur MMA rule"],
        ["Naming", "Gym branding and athlete-name fields"],
        ["Construction", "Stretch gusset and side slits for full range of motion, inseam to your spec"],
        ["Fabric", "Woven polyester or Polyester/Spandex shell, sourced or matched to your reference"],
        ["Trims and finish", "Hook-and-loop and drawcord closure, optional silicone grip waistband, woven and care labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the closure, the gusset and the fit on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Concealed closure checked for the no-exposed-hardware rule",
        "Gusset and side-slit seams pull-tested under a full-range leg extension",
        "Waistband and grip lining set to hold through grappling movement",
        "Full-dye color Pantone matched to the rash guard",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "short-sleeve-rash-guard",
      cardTitle: "Custom Short-Sleeve Rash Guard",
      cardSubline: "Same build, shorter sleeve",
      image: "",
      imageAlt: "Custom Short-Sleeve Rash Guard",
      href: `${PLP}/short-sleeve-rash-guard`,
      sku: "CAP-FGT-03",
      pdpHeading: "Custom Short-Sleeve Rash Guard Manufacturer",
      pdpMetaTitle: "Custom Short-Sleeve Rash Guard Manufacturer",
      pdpDescription:
        "Short-sleeve rash guard, custom and private label, the same skin-tight full-dye sublimated Polyester/Spandex build as our long-sleeve rash guard with a shorter sleeve, flatlock seams and a silicone grip hem, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Short-Sleeve Rash Guard"),
      pdpMetaDescription:
        "Custom short-sleeve rash guard manufacturer: sublimated Polyester/Spandex BJJ rash guards, IBJJF no-gi build, flatlock seams, MOQ 50, DDP to 20+ countries.",
      material: "Sublimated Polyester/Spandex knit",
      pdpFabricPills: ["Polyester/Spandex knit", "Flatlock seams", "Silicone grip hem", "Bonded neckline option"],
      pdpCustomizationPills: ["Rank & division colors", "Gym & athlete name", "Men's, women's or unisex", "Custom labels"],
      faqs: [
        {
          q: "Is the short-sleeve rash guard legal for IBJJF no-gi?",
          a: "Yes. We build the short-sleeve rash guard skin-tight and long enough to reach the shorts waistband, with at least 10 percent of the athlete's rank color or fully that color, within the black, white, or black and white colors the IBJJF allows. We confirm the colors on your proof.",
        },
        {
          q: "How does the short-sleeve rash guard differ from the long-sleeve?",
          a: "Only the sleeve. The short-sleeve rash guard uses the same knit, seams, grip hem and fit as the Custom Long-Sleeve Rash Guard, for warmer training and a lighter feel.",
        },
        {
          q: "Can the short-sleeve rash guard match the fight shorts?",
          a: "Yes. The short-sleeve rash guard is sublimated in the same design and Pantone colors as the Custom MMA Fight Shorts, so the gym set matches.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Long-Sleeve Rash Guard", slug: "long-sleeve-rash-guard", href: PLP },
        { label: "Custom MMA Fight Shorts", slug: "fight-shorts", href: PLP },
        { label: "Custom Grappling Spats", slug: "spats", href: PLP },
        { label: "Custom Compression Top", slug: "compression-top", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Short-sleeve rash guard (base type)" },
        { label: "Fabric", value: "Sublimated Polyester/Spandex knit, with the Spandex share confirmed on your sample" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Skin-tight, long enough to cover the torso to the shorts waistband" },
        { label: "Seams", value: "Flatlock seams, flat to the skin where the garment is gripped and dragged" },
        { label: "Neckline", value: "Sewn rib collar, or a bonded neckline on request" },
        { label: "Hem", value: "Silicone grip band to keep the rash guard down, with a lockdown loop to the shorts optional" },
        { label: "Colors", value: "Full-dye sublimation, rank and division colors built into the print" },
        { label: "Sizing", value: "Graded XS to 5XL, men's, women's and unisex blocks" },
        { label: "Branding", value: "Gym and athlete name, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Short-Sleeve Rash Guard" },
      pdpCustomizationSteps: RASH_GUARD_STEPS,
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: RASH_GUARD_QUALITY_SUB,
      pdpQualityPoints: RASH_GUARD_QUALITY_POINTS,
    },
    {
      status: "draft",
      slug: "spats",
      cardTitle: "Custom Grappling Spats",
      cardSubline: "Full-leg sublimated compression, flatlock seams",
      image: "",
      imageAlt: "Custom Grappling Spats",
      href: `${PLP}/spats`,
      sku: "CAP-FGT-04",
    },
    {
      status: "draft",
      slug: "compression-top",
      cardTitle: "Custom Compression Top",
      cardSubline: "No-gi base-layer top, same knit as the rash guard",
      image: "",
      imageAlt: "Custom Compression Top",
      href: `${PLP}/compression-top`,
      sku: "CAP-FGT-05",
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, Teamwear sports only,
  // closest sports first.
  relatedLinks: [
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
    { label: "Cycling", href: "/capriowear/teamwear/cycling" },
    { label: "Football", href: "/capriowear/teamwear/football" },
    { label: "Ice Hockey", href: "/capriowear/teamwear/ice-hockey" },
    { label: "Volleyball", href: "/capriowear/teamwear/volleyball" },
  ],
};
