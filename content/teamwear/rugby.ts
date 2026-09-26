// content/teamwear/rugby.ts
// Third Teamwear category, same `Category` shape as Cricket/Basketball
// (content/teamwear/cricket.ts, content/teamwear/basketball.ts) and every
// Activewear category (content/activewear/types.ts) -- a pure content/data
// drop: no edits to app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/
// [style]/page.tsx, only this file plus one line in ./sports.ts.
//
// Batch 1 (owner spec, 2026-09-26): PLP fixes (meta, 7 cards in SKU order,
// fabric table and note, customization Fabric item, trust bullet 2, 8 FAQs)
// and draft PDPs for CAP-RGB-01 to 03. The two legacy drafts at
// match-jersey and reinforced-shorts are replaced in full by SKUs 01 and 02
// (same slugs). Cards 04 to 07 are card-only drafts: non-links, no route,
// until their PDP content lands and they switch to links automatically.
//
// Every style is "draft": noindexed, out of the sitemap and the
// CollectionPage/ItemList, BreadcrumbList only. `draftPdpsReachable` (same
// TEMPORARY opt-in as Cricket and Basketball) lets the drafts with PDP
// content render and their cards link. No gender toggle: the Teamwear PLP
// template never renders it.
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- socks, scrum
// caps/headguards and body protection are knitted or specialized foam
// goods, typically sourced, not cut-and-sew, so none is a style card here.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape Cricket
// introduced -- no component or type change needed for this category.
//
// No fabric-weight figure is ever stated (owner spec) -- every weight
// reference is worded as "tuned to your grade of play/confirmed on your
// sample". No grip panels or silicone print offered or claimed anywhere
// (owner spec: legality unconfirmed).
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/rugby";

const QUALITY_HEADING = "Built to hold through the season";
const SEAMS_SUB = "We confirm the fabric, the seams, the color and the fit on your sample before the full roster is produced.";
const NAMES_NUMBERS_POINT = "Names and numbers dyed into the fiber, so they will not crack or peel";
const PROOF_POINT = "Digital proof and Pantone match approved before we cut";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";

const PENDING_WEIGHT = "Pending, confirmed on your sample.";
const SIZING = "Graded XS to 5XL, men's, women's and youth blocks";

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

export const rugby: Category = {
  slug: "rugby",
  group: "Teamwear",
  menuLabel: "Rugby",
  // Entity FAQ (PLP FAQ 1 and FAQ 1 on every PDP) is built by
  // categoryEntityFaq() from these four fields.
  manufacturerNoun: "Rugby Uniform",
  productNounPlural: "rugby uniforms and kits",
  entityExampleStyles: "match, training and heritage jerseys, shorts, base layers and warm-ups",
  entityFabrics: "polyester, Polyester/Spandex and cotton-rich fabrics",
  // H1 and title keep the SERP-checked "rugby jersey manufacturer" keyword.
  h1: "Custom Rugby Jersey Manufacturer",
  metaTitle: "Custom Rugby Jersey Manufacturer",
  metaDescription:
    "Custom rugby jersey manufacturer: bodyfit grab-resistant match jerseys, reinforced shorts and training kit, sublimated, MOQ 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Teamwear has no gender split (owner spec, 2026-09-25).
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester/Spandex match knit",
      bestFor: "Bodyfit match jerseys",
      performance: "Stretch and recovery, holds a close fit in contact",
    },
    {
      fabric: "Polyester, cotton or Cotton/Polyester",
      bestFor: "Training and heritage jerseys",
      performance:
        "Durable for everyday wear; cotton and Cotton/Polyester builds are decorated by embroidery or print, not sublimation",
    },
    {
      fabric: "Heavier woven polyester shell",
      bestFor: "Reinforced rugby shorts",
      performance: "Denser and tougher, built for scrums and tackles",
    },
    {
      fabric: "Polyester/Spandex base-layer knit",
      bestFor: "Base layers under the kit",
      performance: "Close fit, moisture-wicking",
    },
  ],
  fabricNote: [
    {
      text: "Polyester-based for full-color sublimation, with cotton-rich heritage jerseys decorated by embroidery or print. Rugby runs heavier and denser than most kit for contact durability, so final weight and reinforcement are tuned to your grade of play and confirmed on your sample. Recycled polyester available. Swatches before every bulk run.",
    },
  ],
  fabricPills: ["Polyester/Spandex match knit", "Cotton/Polyester", "Heavier woven shell", "Polyester/Spandex base-layer knit", "Recycled option"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Jersey and short graphics, names, numbers, logos",
        notes: "Dyed into the fiber, will not crack or peel, and lies flat so nothing snags in contact",
      },
      {
        method: "Embroidery",
        bestFor: "Crests, badges, sponsor marks",
        notes: "Raised, premium texture",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn numbers on jerseys",
        notes: "Raised, classic look, kept off shorts where it can snag",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and name bars",
        notes: "Raised, full-color",
      },
    ],
    // Segment array, not a plain string (owner spec: highlight one small,
    // important phrase, semibold, not the whole sentence -- same standing
    // rule as Cricket/Basketball's own decoration note).
    note: [
      { text: "On rugby shorts we recommend " },
      { text: "sublimation over raised lettering", bold: true },
      { text: ", since sewn-on twill can snag during contact." },
    ],
  },
  qualityHeading: QUALITY_HEADING,
  qualitySubline: SEAMS_SUB,
  qualityPoints: [
    "Reinforced seams at shoulder, collar and side, built for tackling and rucking",
    "Names and numbers sublimated into the fiber, so they will not crack or peel",
    PROOF_POINT,
    AQL_POINT,
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Polyester/Spandex match knits, heavier woven short fabric, training, heritage and base-layer fabrics",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, names and numbers in the print, Pantone color matching, home and away kits",
    },
    {
      title: "Decoration",
      body: "Sublimation, embroidered crests, tackle twill on jerseys",
    },
    {
      title: "Finishing",
      body: "Your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // 8 FAQs (owner spec, 2026-09-26): the entity question is prepended at
  // render time by categoryEntityFaq(), then these 7.
  faqs: [
    {
      q: "What is your MOQ for custom rugby kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What makes a rugby jersey grab resistant?",
      a: "A rugby jersey resists grabbing through a close bodyfit cut that leaves less loose fabric to grip, with the shoulder, collar and side seams double or triple stitched to resist pulling and tearing in contact.",
    },
    {
      q: "Are rugby shorts made from a different fabric?",
      a: "Yes. Rugby shorts use a heavier, denser woven polyester shell with a reinforced waistband and reinforced seams, built for scrums and tackles and tougher than a standard sublimated short.",
    },
    {
      q: "What is the difference between a heritage rugby jersey and a match jersey?",
      a: "A heritage rugby jersey is a traditional cotton or Cotton/Polyester build with a twill collar, rubber buttons and rib-knit cuffs, made for club socials, tours and supporter wear and decorated by embroidery or print. A match jersey is a bodyfit Polyester/Spandex knit, sublimated and built for contact.",
    },
    {
      q: "Do you build to World Rugby and competition kit rules?",
      a: "Yes. Tell us your union and competition and we build the jersey, shorts and numbering to its current rules, confirmed on your proof. Kit rules vary by competition and change between seasons, so we work to the regulation you play under rather than a fixed assumption.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // TEMPORARY (owner, 2026-09-26): opts Rugby into the draft-PDP rule, same
  // as Cricket and Basketball, so the drafts with PDP content get noindexed
  // pages and their cards link. See the field's own comment in
  // content/activewear/types.ts.
  draftPdpsReachable: true,
  // 7 drafts, SKU order (CAP-RGB-01 to 07). Card title = H1 minus
  // " Manufacturer" = title-tag name = breadcrumb = alt = every pill label
  // that targets it. Pills carry a `slug`, so a pill for a card-only SKU
  // falls back to the PLP and switches to its PDP by itself.
  styleCards: [
    {
      status: "draft",
      slug: "match-jersey",
      cardTitle: "Custom Rugby Match Jersey",
      cardSubline: "Bodyfit grab-resistant cut, reinforced seams",
      image: "",
      imageAlt: "Custom Rugby Match Jersey",
      href: `${PLP}/match-jersey`,
      sku: "CAP-RGB-01",
      pdpHeading: "Custom Rugby Match Jersey Manufacturer",
      pdpMetaTitle: "Custom Rugby Match Jersey Manufacturer",
      pdpDescription:
        "Bodyfit rugby match jersey, custom and private label, a close grab-resistant cut with reinforced shoulder, collar and side seams, full-dye sublimated in a Polyester/Spandex knit, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Rugby Match Jersey"),
      pdpMetaDescription:
        "Custom rugby match jersey manufacturer: bodyfit grab-resistant cut, reinforced seams, names and numbers sublimated, MOQ 50 pieces, DDP to 20+ countries.",
      material: "Polyester/Spandex stretch knit, or polyester interlock or eyelet polyester",
      pdpFabricPills: ["Polyester/Spandex knit", "Polyester interlock", "Eyelet polyester", "Recycled polyester"],
      pdpCustomizationPills: ["Sublimated names & numbers", "Forward or back fit", "Home & away kits", "Custom labels"],
      faqs: [
        {
          q: "How is the rugby match jersey built to resist grabbing in a tackle?",
          a: "The rugby match jersey uses a close bodyfit cut that leaves less loose fabric to grip, with collar, shoulder and side seams double or triple stitched to resist pulling and tearing in contact.",
        },
        {
          q: "Can the rugby match jersey be cut differently for forwards and backs?",
          a: "Yes. The rugby match jersey is available tuned for forwards, with a tighter torso for contact, or for backs, with more shoulder freedom for running, in the same fabric and print so the squad still matches.",
        },
        {
          q: "Can you produce home and away rugby match jerseys in one order?",
          a: "Yes. Home and away rugby match jerseys are planned into one order and share the same print files, sizing and roster, so both colorways match as a set.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Reinforced Rugby Shorts", slug: "reinforced-shorts", href: PLP },
        { label: "Custom Rugby Training Jersey", slug: "training-jersey", href: PLP },
        { label: "Custom Rugby Base Layer", slug: "base-layer", href: PLP },
        { label: "Custom Heritage Rugby Jersey", slug: "heritage-jersey", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Rugby match jersey, bodyfit (base type)" },
        { label: "Fabric", value: "Polyester/Spandex stretch knit, or polyester interlock or eyelet polyester for a firmer hand" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Close bodyfit cut that leaves less loose fabric to grip, available tuned for forwards or backs" },
        { label: "Collar", value: "Reinforced collar, style set to your spec" },
        { label: "Seams", value: "Shoulder, collar and side seams double or triple stitched, with bar tacks at stress points" },
        { label: "Decoration", value: "Full-dye sublimation, with names, numbers and sponsor logos in the print. Tackle twill optional on the jersey." },
        { label: "Color", value: "Full sublimation color range, Pantone matched, home and away colorways" },
        { label: "Sizing", value: SIZING },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Rugby Match Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation, unlimited colors in one file at one cost"],
        ["Names and numbers", "Built into the print file per player, or tackle twill on the jersey for a raised look"],
        ["Construction", "Bodyfit cut tuned for forwards or backs, reinforced collar, shoulder and side seams"],
        ["Fabric", "Polyester/Spandex knit, interlock or eyelet polyester, sourced or matched to your reference"],
        ["Color", "Pantone, CMYK, RGB or hex matched, confirmed on your digital proof"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: SEAMS_SUB,
      pdpQualityPoints: [
        "Collar, shoulder and side seams double or triple stitched and checked on your sample",
        NAMES_NUMBERS_POINT,
        PROOF_POINT,
        "The full roster produced in one run, same fabric roll and print batch, so every kit matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "reinforced-shorts",
      cardTitle: "Custom Reinforced Rugby Shorts",
      cardSubline: "Heavier woven shell, reinforced waistband and seams",
      image: "",
      imageAlt: "Custom Reinforced Rugby Shorts",
      href: `${PLP}/reinforced-shorts`,
      sku: "CAP-RGB-02",
      pdpHeading: "Custom Reinforced Rugby Shorts Manufacturer",
      pdpMetaTitle: "Custom Reinforced Rugby Shorts Manufacturer",
      pdpDescription:
        "Reinforced rugby shorts, custom and private label, in a heavier woven polyester shell with a reinforced waistband, reinforced seams and a stretch gusset, built for scrums, tackles and rucks, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Reinforced Rugby Shorts"),
      pdpMetaDescription:
        "Custom reinforced rugby shorts manufacturer: heavier woven shell, reinforced waistband and seams, stretch gusset, sublimated, MOQ 50, DDP to 20+ countries.",
      material: "Heavier, denser woven polyester shell",
      pdpFabricPills: ["Woven polyester", "Polyester twill", "Polyester/Spandex gusset", "Recycled polyester"],
      pdpCustomizationPills: ["Reinforced waistband", "Sublimated branding", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "Why are reinforced rugby shorts made in a heavier fabric?",
          a: "Reinforced rugby shorts take more contact than any other piece of kit, so they are cut from a heavier, denser woven polyester shell with a reinforced waistband and seams that stand up to scrums, tackles and rucks.",
        },
        {
          q: "Why is tackle twill kept off the reinforced rugby shorts?",
          a: "Raised, sewn-on lettering can snag during contact, so the reinforced rugby shorts are decorated with flat, full-dye sublimation, which lies flush with the fabric.",
        },
        {
          q: "Do the reinforced rugby shorts have a gusset?",
          a: "Yes. The reinforced rugby shorts carry a stretch Polyester/Spandex gusset for leg movement in the scrum and at pace, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Rugby Match Jersey", slug: "match-jersey", href: PLP },
        { label: "Custom Rugby Training Jersey", slug: "training-jersey", href: PLP },
        { label: "Custom Rugby Base Layer", slug: "base-layer", href: PLP },
        { label: "Custom Rugby Warm-Up Pants", slug: "warm-up-pants", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Reinforced rugby shorts (base type)" },
        { label: "Fabric", value: "Heavier, denser woven polyester shell" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Waistband", value: "Elastic waistband with a drawcord, reinforced and finished flat" },
        { label: "Gusset", value: "Stretch Polyester/Spandex gusset for leg movement" },
        { label: "Seams", value: "Reinforced seams with bar tacks at stress points" },
        { label: "Pockets", value: "Internal mouthguard pocket, optional" },
        { label: "Decoration", value: "Full-dye sublimation. Raised tackle twill is kept off shorts, since it can snag in contact." },
        { label: "Sizing", value: SIZING },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Reinforced Rugby Shorts" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation, unlimited colors, kept flat so nothing snags in contact"],
        ["Construction", "Reinforced waistband, seams and stretch gusset, built for scrummaging"],
        ["Pockets", "Internal mouthguard pocket on request"],
        ["Fabric", "Heavier woven polyester shell, sourced or matched to your reference"],
        ["Color", "Pantone, CMYK, RGB or hex matched, confirmed on your digital proof"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: "We confirm the fabric, the seams and the waistband on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Waistband, seams and gusset checked on your sample for a secure, reinforced finish",
        "Sublimated branding lies flat, nothing to snag or peel",
        PROOF_POINT,
        "The full roster produced in one run, same fabric roll and print batch, so every pair matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "training-jersey",
      cardTitle: "Custom Rugby Training Jersey",
      cardSubline: "Looser cut, durable everyday fabric",
      image: "",
      imageAlt: "Custom Rugby Training Jersey",
      href: `${PLP}/training-jersey`,
      sku: "CAP-RGB-03",
      pdpHeading: "Custom Rugby Training Jersey Manufacturer",
      pdpMetaTitle: "Custom Rugby Training Jersey Manufacturer",
      pdpDescription:
        "Rugby training jersey, custom and private label, a looser-cut practice jersey in a durable polyester knit or a Cotton/Polyester blend, sublimated or embroidered in your club colors, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Rugby Training Jersey"),
      pdpMetaDescription:
        "Custom rugby training jersey manufacturer: looser-cut jerseys in polyester or Cotton/Polyester, sublimated or embroidered, MOQ 50, DDP to 20+ countries.",
      material: "Polyester pique or interlock, or a Cotton/Polyester blend",
      pdpFabricPills: ["Polyester pique", "Polyester interlock", "Cotton/Polyester", "Recycled polyester"],
      pdpCustomizationPills: ["Sublimated or embroidered", "Crew or polo collar", "Club colors", "Custom labels"],
      faqs: [
        {
          q: "How is the rugby training jersey different from the rugby match jersey?",
          a: "The rugby training jersey is a looser cut for everyday training, in a durable polyester or Cotton/Polyester fabric, while the rugby match jersey is a bodyfit, grab-resistant Polyester/Spandex build for game day.",
        },
        {
          q: "Can the rugby training jersey be sublimated?",
          a: "The rugby training jersey is fully sublimated when it is made in polyester. In a Cotton/Polyester blend, it is decorated by embroidery or print, since cotton does not take full sublimation.",
        },
        {
          q: "Can the rugby training jersey have a polo collar?",
          a: "Yes. The rugby training jersey is made with a crew neck or a polo collar with a one-button placket, chosen per club and confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Rugby Match Jersey", slug: "match-jersey", href: PLP },
        { label: "Custom Heritage Rugby Jersey", slug: "heritage-jersey", href: PLP },
        { label: "Custom Reinforced Rugby Shorts", slug: "reinforced-shorts", href: PLP },
        { label: "Custom Rugby Warm-Up Jacket", slug: "warm-up-jacket", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Rugby training jersey, looser cut (base type)" },
        { label: "Fabric", value: "Polyester pique or interlock, or a Cotton/Polyester blend" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Looser than the match jersey, for everyday training" },
        { label: "Collar", value: "Crew neck, or a polo collar with a one-button placket" },
        { label: "Seams", value: "Reinforced side vents and shoulder seams" },
        { label: "Decoration", value: "Full-dye sublimation on polyester; embroidery or print on Cotton/Polyester" },
        { label: "Color", value: "Club colors, Pantone matched to your match kit" },
        { label: "Sizing", value: SIZING },
        { label: "Branding", value: "Club crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Rugby Training Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Fabric", "Polyester pique or interlock, or Cotton/Polyester, sourced or matched to your reference"],
        ["Decoration", "Sublimation on polyester, embroidery or print on Cotton/Polyester"],
        ["Collar and fit", "Crew neck or polo collar, looser training cut"],
        ["Color", "Club colors, Pantone matched to your match kit"],
        ["Branding", "Club crest, sponsor marks, manufacturer mark"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: SEAMS_SUB,
      pdpQualityPoints: [
        "Club colors Pantone matched to your match kit and approved on the sample before we cut",
        "Embroidery and print checked for a clean, flat finish",
        "Side vents and shoulder seams checked on your sample",
        "The full roster produced in one run, same fabric lot, so every jersey matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "heritage-jersey",
      cardTitle: "Custom Heritage Rugby Jersey",
      cardSubline: "Cotton-rich, twill collar, rubber buttons",
      image: "",
      imageAlt: "Custom Heritage Rugby Jersey",
      href: `${PLP}/heritage-jersey`,
      sku: "CAP-RGB-04",
    },
    {
      status: "draft",
      slug: "base-layer",
      cardTitle: "Custom Rugby Base Layer",
      cardSubline: "Close-fit Polyester/Spandex under-kit layer",
      image: "",
      imageAlt: "Custom Rugby Base Layer",
      href: `${PLP}/base-layer`,
      sku: "CAP-RGB-05",
    },
    {
      status: "draft",
      slug: "warm-up-jacket",
      cardTitle: "Custom Rugby Warm-Up Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom Rugby Warm-Up Jacket",
      href: `${PLP}/warm-up-jacket`,
      sku: "CAP-RGB-06",
    },
    {
      status: "draft",
      slug: "warm-up-pants",
      cardTitle: "Custom Rugby Warm-Up Pants",
      cardSubline: "Straight or tapered, tricot or fleece",
      image: "",
      imageAlt: "Custom Rugby Warm-Up Pants",
      href: `${PLP}/warm-up-pants`,
      sku: "CAP-RGB-07",
    },
  ],
  relatedLinks: [
    { label: "Football", href: "/capriowear/teamwear/football" },
    { label: "Soccer", href: "/capriowear/teamwear/soccer" },
    { label: "Ice Hockey", href: "/capriowear/teamwear/ice-hockey" },
    { label: "Cricket", href: "/capriowear/teamwear/cricket" },
    { label: "Rash Guards & Fight Wear", href: "/capriowear/teamwear/fight-wear" },
  ],
};
