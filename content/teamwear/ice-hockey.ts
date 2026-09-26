// content/teamwear/ice-hockey.ts
// Eighth Teamwear category, same `Category` shape as every prior Teamwear
// category (content/teamwear/*.ts) and every Activewear category
// (content/activewear/types.ts) -- a pure content/data drop: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts.
//
// PDP publish state (owner spec): every style ships "draft". Under the
// Teamwear draft-PDP rule (isDraftPdpReachable(), pdpShared.ts), 01 to 03
// carry PDP content (batch 1, 2026-09-26) and 04 and 05 follow in batch 2
// (2026-09-26), so all 5 render as noindexed draft PDPs (BreadcrumbList
// only, out of the sitemap and the CollectionPage/ItemList) with linking
// cards, and every style pill resolves to a real PDP. Publishing needs the roster confirmed, the style sampled and real
// photos (getPublishReadiness()).
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- socks are
// knitted goods and pants/breezers are padded goods whose shell-vs-insert
// construction isn't yet confirmed, both sourced, so neither is a style
// card here. Every card below is a genuinely cut-and-sew hockey jersey or
// layering piece.
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
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/ice-hockey";

const QUALITY_HEADING = "Built to last, over the pads";
const REINFORCED_POINT = "Reinforced elbows and shoulders, with reinforced stitching at the stress seams";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";
const PENDING_WEIGHT = "Pending, confirmed on your sample.";
const REINFORCEMENT_SPEC = "Double-layer elbows, reinforced shoulders, reinforced stitching at the stress seams";
const BRANDING = "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging";
const JERSEY_FABRIC_PILLS = ["Polyester air-knit", "Pro-weight polyester", "Reinforced elbows", "Recycled option"];

type Step = [title: string, body: string];
const FABRIC_STEP: Step = ["Fabric", "Air-knit or pro-weight polyester, sourced or matched to your reference"];
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

export const iceHockey: Category = {
  slug: "ice-hockey",
  group: "Teamwear",
  menuLabel: "Ice Hockey",
  manufacturerNoun: "Ice Hockey Jersey",
  productNounPlural: "hockey jerseys and uniforms",
  entityExampleStyles: "game jerseys, practice jerseys, goalie jerseys, and base layers",
  entityFabrics: "durable polyester air-knit and mesh",
  h1: "Custom Ice Hockey Jersey Manufacturer",
  metaTitle: "Custom Ice Hockey Jersey Manufacturer",
  metaDescription:
    "Custom ice hockey jersey manufacturer: air-knit and pro-weight game, goalie and practice jerseys, fight strap option, sublimated, MOQ 50, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester air-knit",
      bestFor: "Game jerseys, breathable game cut",
      performance: "Lighter, open knit, prints cleanly",
    },
    {
      fabric: "Polyester pro-weight",
      bestFor: "Game jerseys, maximum durability",
      performance: "Heavier and denser, built for durability",
    },
    {
      fabric: "Open mesh polyester",
      bestFor: "Practice jerseys",
      performance: "Lighter, high airflow, wash-durable",
    },
    {
      fabric: "Polyester/Spandex knit",
      bestFor: "Base layers under the kit",
      performance: "Close fit, moisture-wicking",
    },
  ],
  fabricNote: [
    { text: "Polyester-based for full-color sublimation. Air-knit runs lighter for breathability and pro-weight heavier for durability, with final weight " },
    { text: "confirmed on your sample", bold: true },
    { text: ". Recycled polyester available. Swatches before every bulk run." },
  ],
  fabricPills: ["Air-knit", "Pro-weight", "Open mesh", "Polyester/Spandex"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Whole-jersey graphics, names, numbers, logos",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn crests, numbers and name bars",
        notes: "Raised, classic hockey look",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and name bars",
        notes: "Raised, full-color",
      },
      {
        method: "Embroidery",
        bestFor: "Crests, badges, sponsor marks",
        notes: "Raised, premium texture",
      },
    ],
    note: [
      { text: "Tackle twill and sublimation are decoration methods on the same base fabric, not different jerseys, so " },
      { text: "you choose the look without changing the build", bold: true },
      { text: "." },
    ],
  },
  qualityHeading: "Built to last, over the pads",
  qualitySubline:
    "We confirm the fabric weight, the reinforcement and the fit over your pads on your sample before the full roster is produced.",
  qualityPoints: [
    REINFORCED_POINT,
    "Fight strap sewn in where your league requires or wants it",
    "Names and numbers sublimated in, or tackle twill sewn on, both built to last",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Durable polyester air-knit and pro-weight jersey knits, lighter practice mesh, Polyester/Spandex base-layer knits",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, names and numbers in the print, Pantone color matching, home and away kits",
    },
    {
      title: "Decoration",
      body: "Sublimation or tackle twill crests and numbers, embroidered patches",
    },
    {
      title: "Construction and finishing",
      body: "Fight strap, reinforced elbows and shoulders, lace-up or crew collar, your woven and care labels and packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // 7 questions plus the auto-built entity question first (categoryEntityFaq(),
  // from manufacturerNoun/productNounPlural/entityExampleStyles/entityFabrics
  // above), 8 total (owner spec, 2026-09-26).
  faqs: [
    {
      q: "What is your MOQ for custom hockey kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is a fight strap, and is it required?",
      a: "A fight strap is a fabric loop sewn inside the back of the jersey that anchors it to the pants so it cannot be pulled off. It is required in the NHL; other leagues set their own rules, so we sew it in or leave it out to match yours.",
    },
    {
      q: "What fabric and decoration choices are there?",
      a: "Air-knit is the lighter, more breathable game cut; pro-weight is heavier for maximum durability, with weight confirmed on your sample. Both take full sublimation, which dyes the whole design into the fabric so nothing cracks or peels, or tackle twill, the classic sewn-on look, on the same base fabric. You pick the tier and the look, the build stays the same.",
    },
    {
      q: "Why is the jersey cut loose, and how is a goalie jersey different?",
      a: "The game jersey is cut roomy to move over shoulder and elbow pads. The goalie jersey is a distinct, larger pattern block, not a scaled-up player jersey, with a wider body for a chest protector and roomier sleeves, on its own sizing scale.",
    },
    {
      q: "What numbering and patch rules apply?",
      a: "They vary by league. Number size, the name bar and captain patches differ across the NHL, USA Hockey, IIHF and junior leagues. Tell us your league and we build the numbering and patches to its current rules, confirmed on your proof.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // 5 drafts, SKU order (CAP-HKY-01 to 05), owner spec 2026-09-26. Card
  // title = H1 minus " Manufacturer" = title-tag name = breadcrumb = alt =
  // every pill label that targets it. All 5 carry PDP content (batches 1
  // and 2).
  styleCards: [
    {
      status: "draft",
      slug: "game-jersey",
      cardTitle: "Custom Ice Hockey Game Jersey",
      cardSubline: "Air-knit or pro-weight, fight strap, reinforced elbows",
      image: "",
      imageAlt: "Custom Ice Hockey Game Jersey",
      href: `${PLP}/game-jersey`,
      sku: "CAP-HKY-01",
      pdpHeading: "Custom Ice Hockey Game Jersey Manufacturer",
      pdpMetaTitle: "Custom Ice Hockey Game Jersey Manufacturer",
      pdpDescription:
        "Ice hockey game jersey, custom and private label, a durable polyester air-knit or pro-weight jersey cut loose to fit over pads, with reinforced elbows and an optional fight strap, sublimated or tackle twill, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Ice Hockey Game Jersey"),
      pdpMetaDescription:
        "Custom ice hockey game jersey manufacturer: air-knit or pro-weight, fight strap, reinforced elbows, sublimation or tackle twill, MOQ 50, DDP to 20+ countries.",
      material: "Polyester air-knit or pro-weight",
      pdpFabricPills: JERSEY_FABRIC_PILLS,
      pdpCustomizationPills: ["Fight strap", "Lace-up or crew collar", "Sublimated or tackle twill", "Custom labels"],
      faqs: [
        {
          q: "What is a fight strap on the ice hockey game jersey, and do we need one?",
          a: "It is a fabric loop sewn inside the back of the ice hockey game jersey that anchors it to the pants so it cannot be pulled off. It is required in the NHL; other leagues set their own rules, so we build it in or leave it out to match yours.",
        },
        {
          q: "What is the difference between air-knit and pro-weight on the ice hockey game jersey?",
          a: "Air-knit is the lighter, more breathable game cut; pro-weight is heavier for maximum durability. Both take sublimation and tackle twill, and we confirm the weight on your sample.",
        },
        {
          q: "Can the ice hockey game jersey be sublimated or tackle twill?",
          a: "Yes. Both are available on the same base fabric, so you choose the classic sewn look of tackle twill or full-color sublimation that will not crack or peel, without changing the jersey build.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Ice Hockey Goalie Jersey", slug: "goalie-jersey", href: PLP },
        { label: "Custom Ice Hockey Practice Jersey", slug: "practice-jersey", href: PLP },
        { label: "Custom Ice Hockey Base Layer", slug: "base-layer", href: PLP },
        { label: "Custom Ice Hockey Team Jacket", slug: "team-jacket", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Ice hockey game jersey (base type)" },
        { label: "Fabric", value: "Polyester air-knit (lighter, breathable) or pro-weight (heavier, most durable)" },
        { label: "Weight", value: PENDING_WEIGHT },
        {
          label: "Fit",
          value:
            "Loose pad-over cut, roomy body and sleeves to move over shoulder and elbow pads, with a drop-tail hem",
        },
        { label: "Collar", value: "Crew or V-neck standard, with a lace-up collar as a heritage option" },
        { label: "Reinforcement", value: REINFORCEMENT_SPEC },
        {
          label: "Fight strap",
          value: "Optional snap tie-down to the pants, sewn in where your league requires or wants it",
        },
        {
          label: "Decoration and color",
          value:
            "Full-dye sublimation or tackle twill on the same base fabric, Pantone matched, home and away colorways",
        },
        { label: "Sizing", value: "Graded XS to 5XL, youth and adult as distinct pattern blocks" },
        { label: "Branding", value: BRANDING },
      ],
      specificationsImage: { alt: "Custom Ice Hockey Game Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Decoration", "Full-dye sublimation or tackle twill crests, numbers and name bar, on the same base fabric"],
        ["Construction", "Fight strap, reinforced elbows and shoulders, crew or lace-up collar, drop-tail hem"],
        FABRIC_STEP,
        ["Names and numbers", "Sublimated into the print file, or sewn tackle twill for the classic look"],
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fabric weight, the reinforcement and the fit over your pads on your sample before the full roster is produced.",
      pdpQualityPoints: [
        REINFORCED_POINT,
        "Fight strap sewn in and anchored to the pants where wanted",
        "Names and numbers sublimated in or tackle twill sewn on, both built to last",
        "The full roster produced in one run, same fabric roll and print batch, so every jersey matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "goalie-jersey",
      cardTitle: "Custom Ice Hockey Goalie Jersey",
      cardSubline: "Distinct oversized goalie-cut pattern",
      image: "",
      imageAlt: "Custom Ice Hockey Goalie Jersey",
      href: `${PLP}/goalie-jersey`,
      sku: "CAP-HKY-02",
      pdpHeading: "Custom Ice Hockey Goalie Jersey Manufacturer",
      pdpMetaTitle: "Custom Ice Hockey Goalie Jersey Manufacturer",
      pdpDescription:
        "Ice hockey goalie jersey, custom and private label, a distinct oversized goalie-cut pattern with a wider body for the chest protector and roomier sleeves, in a durable polyester air-knit or pro-weight, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Ice Hockey Goalie Jersey"),
      pdpMetaDescription:
        "Custom ice hockey goalie jersey manufacturer: a distinct goalie-cut pattern, wider body and roomier sleeves over the gear, MOQ 50, DDP to 20+ countries.",
      material: "Durable polyester air-knit or pro-weight",
      // Goalie jerseys run on their own sizing scale, not the XS to 5XL player
      // chart: the third key fact is "Goalie sizing" (owner spec).
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "Goalie sizing" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      pdpFabricPills: JERSEY_FABRIC_PILLS,
      pdpCustomizationPills: ["Goalie sizing", "Fight strap", "Sublimated or tackle twill", "Custom labels"],
      faqs: [
        {
          q: "How is the ice hockey goalie jersey different from a player jersey?",
          a: "The ice hockey goalie jersey is a distinct, larger pattern block, not a scaled-up player jersey. The body is wider to clear a chest protector, the sleeves are roomier for bulkier arm equipment, and the back hem runs longer.",
        },
        {
          q: "How is the ice hockey goalie jersey sized?",
          a: "On its own larger goalie sizing scale rather than the player chart, and we confirm the fit on your sample.",
        },
        {
          q: "Can the ice hockey goalie jersey match the rest of the team kit?",
          a: "Yes. The ice hockey goalie jersey is produced in the same run and decorated with the same sublimation or tackle twill design, so it reads as part of the set.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Ice Hockey Game Jersey", slug: "game-jersey", href: PLP },
        { label: "Custom Ice Hockey Practice Jersey", slug: "practice-jersey", href: PLP },
        { label: "Custom Ice Hockey Base Layer", slug: "base-layer", href: PLP },
        { label: "Custom Ice Hockey Team Jacket", slug: "team-jacket", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Ice hockey goalie jersey (base type)" },
        { label: "Fabric", value: "Durable polyester air-knit or pro-weight" },
        { label: "Weight", value: PENDING_WEIGHT },
        {
          label: "Fit",
          value:
            "A distinct, larger goalie pattern block, not a scaled-up player jersey, with a wider body for a chest protector and roomier sleeves for arm equipment",
        },
        { label: "Hem", value: "Longer back hem, cut to sit over the pants" },
        { label: "Sizing", value: "Its own larger goalie sizing scale, confirmed on your sample" },
        { label: "Reinforcement", value: REINFORCEMENT_SPEC },
        { label: "Fight strap", value: "Optional, sewn in where your league requires or wants it" },
        {
          label: "Decoration and color",
          value: "Full-dye sublimation or tackle twill on the same base fabric, Pantone matched to the team kit",
        },
        { label: "Branding", value: BRANDING },
      ],
      specificationsImage: { alt: "Custom Ice Hockey Goalie Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Pattern", "A distinct goalie block with a wider body and roomier sleeves for the equipment"],
        ["Decoration", "Full-dye sublimation or tackle twill, matched to the team kit"],
        ["Construction", "Reinforced elbows and shoulders, longer back hem, optional fight strap"],
        FABRIC_STEP,
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the goalie pattern, the reinforcement and the fit over the equipment on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Goalie block sized on its own scale, with a wider body and roomier sleeves for the gear",
        REINFORCED_POINT,
        "Sublimated or tackle twill decoration matched to the team kit",
        "Produced in the same run as the team, so the goalie jersey matches the set",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "practice-jersey",
      cardTitle: "Custom Ice Hockey Practice Jersey",
      cardSubline: "Lighter mesh, everyday training",
      image: "",
      imageAlt: "Custom Ice Hockey Practice Jersey",
      href: `${PLP}/practice-jersey`,
      sku: "CAP-HKY-03",
      pdpHeading: "Custom Ice Hockey Practice Jersey Manufacturer",
      pdpMetaTitle: "Custom Ice Hockey Practice Jersey Manufacturer",
      pdpDescription:
        "Ice hockey practice jersey, custom and private label, a lighter polyester mesh jersey in the same pad-over cut as the game jersey, for everyday training, in solid line colors or fully sublimated, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Ice Hockey Practice Jersey"),
      pdpMetaDescription:
        "Custom ice hockey practice jersey manufacturer: lighter polyester mesh jerseys, pad-over cut, solid line colors or sublimated, MOQ 50, DDP to 20+ countries.",
      material: "Lighter open polyester mesh or double knit",
      pdpFabricPills: ["Open polyester mesh", "Polyester double knit", "Mesh ventilation panels", "Recycled option"],
      pdpCustomizationPills: ["Solid or sublimated", "Line colors", "Numbers optional", "Custom labels"],
      faqs: [
        {
          q: "How is the ice hockey practice jersey different from the game jersey?",
          a: "The ice hockey practice jersey uses a lighter, more open polyester mesh for everyday training, in the same pad-over cut as the Custom Ice Hockey Game Jersey, with simpler decoration and no fight strap.",
        },
        {
          q: "Can we order ice hockey practice jerseys in a different color for each line?",
          a: "Yes. The ice hockey practice jersey is made in solid colors per line group, or fully sublimated, in the same order, Pantone matched and confirmed on your proof.",
        },
        {
          q: "Is the ice hockey practice jersey available in a goalie cut?",
          a: "Yes. The ice hockey practice jersey is available in a goalie cut on request, built on the larger goalie pattern block.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Ice Hockey Game Jersey", slug: "game-jersey", href: PLP },
        { label: "Custom Ice Hockey Goalie Jersey", slug: "goalie-jersey", href: PLP },
        { label: "Custom Ice Hockey Base Layer", slug: "base-layer", href: PLP },
        { label: "Custom Ice Hockey Team Jacket", slug: "team-jacket", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Ice hockey practice jersey, everyday training (base type)" },
        { label: "Fabric", value: "Lighter open polyester mesh or double knit, with mesh ventilation panels" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Pad-over cut, roomy body and sleeves, matched to the game jersey" },
        { label: "Collar", value: "Crew or V-neck" },
        { label: "Reinforcement", value: "Reinforced elbows and shoulders" },
        { label: "Decoration", value: "Solid colors, or full-dye sublimation, with numbers or crest optional" },
        {
          label: "Color",
          value: "Solid colors per line group, or the full sublimation color range, Pantone matched",
        },
        { label: "Sizing", value: "Graded XS to 5XL, youth and adult blocks, with a goalie cut on request" },
        { label: "Branding", value: "Team crest, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Ice Hockey Practice Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Solid colors or full-dye sublimation"],
        ["Numbers and crest", "Optional, built into the print file"],
        ["Construction", "Pad-over cut, crew or V-neck, reinforced elbows and shoulders, goalie cut on request"],
        ["Fabric", "Lighter polyester mesh or double knit, sourced or matched to your reference"],
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the mesh, the fit over your pads and the color on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Mesh weight and hand confirmed on your sample before bulk",
        "Reinforced elbows and shoulders, checked across the size run",
        "Line colors Pantone matched and approved on your proof",
        "The full roster produced in one run, same fabric lot, so every jersey matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "base-layer",
      cardTitle: "Custom Ice Hockey Base Layer",
      cardSubline: "Close-fit under-kit layer",
      image: "",
      imageAlt: "Custom Ice Hockey Base Layer",
      href: `${PLP}/base-layer`,
      sku: "CAP-HKY-04",
      pdpHeading: "Custom Ice Hockey Base Layer Manufacturer",
      pdpMetaTitle: "Custom Ice Hockey Base Layer Manufacturer",
      pdpDescription:
        "Ice hockey base layer, custom and private label, a close-fit Polyester/Spandex top worn under the pads, in long or short sleeve, with a brushed interior and a silicone sleeve grip as options, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Ice Hockey Base Layer"),
      pdpMetaDescription:
        "Custom ice hockey base layer manufacturer: close-fit Polyester/Spandex tops worn under the pads, brushed interior option, MOQ 50, DDP to 20+ countries.",
      material: "Polyester/Spandex knit",
      pdpFabricPills: ["Polyester/Spandex knit", "Brushed interior option", "Mesh panels", "Recycled option"],
      pdpCustomizationPills: ["Long or short sleeve", "Silicone sleeve grip", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "What is the ice hockey base layer made from?",
          a: "The ice hockey base layer is a Polyester/Spandex knit with four-way stretch for a close fit under the pads, with a brushed interior available for colder rinks. The Spandex share is set to the fit you want and confirmed on your sample.",
        },
        {
          q: "Can the ice hockey base layer help keep pads in place?",
          a: "A silicone grip print at the sleeve is available on the ice hockey base layer, to help hold elbow pads in place. Placement is confirmed on your sample.",
        },
        {
          q: "Does the ice hockey base layer come in long and short sleeve?",
          a: "Both. The ice hockey base layer is built in long or short sleeve, with a crew or mock neck, in solid team colors, to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Ice Hockey Game Jersey", slug: "game-jersey", href: PLP },
        { label: "Custom Ice Hockey Practice Jersey", slug: "practice-jersey", href: PLP },
        { label: "Custom Ice Hockey Goalie Jersey", slug: "goalie-jersey", href: PLP },
        { label: "Custom Ice Hockey Team Jacket", slug: "team-jacket", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Ice hockey base layer, close-fit top worn under the pads (base type)" },
        { label: "Fabric", value: "Polyester/Spandex knit, with a brushed interior optional" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Close compression fit under shoulder and elbow pads" },
        { label: "Sleeve", value: "Long or short sleeve, with a silicone grip print at the sleeve optional to help hold pads in place" },
        { label: "Neck", value: "Crew or mock neck" },
        { label: "Ventilation", value: "Mesh panels at the underarm and back optional" },
        { label: "Color", value: "Solid team colors, Pantone matched" },
        { label: "Sizing", value: "Graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team logo, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Ice Hockey Base Layer" },
      pdpCustomizationSteps: customizeSteps([
        ["Fit", "Close compression fit, long or short sleeve"],
        ["Neck", "Crew or mock neck"],
        ["Grip and panels", "Silicone sleeve grip and mesh panels, both optional"],
        ["Fabric", "Polyester/Spandex knit, brushed interior optional, sourced or matched to your reference"],
        ["Color", "Solid team colors, Pantone matched and confirmed on your sample"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: "Close fit, under the pads",
      pdpQualitySubline:
        "We confirm the fabric, the fit under your pads and the color on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Stretch and recovery checked on your sample before bulk",
        "Fit under shoulder and elbow pads confirmed on your sample",
        "Fit graded and checked across the full size run",
        "The full roster produced in one run, same fabric lot, so every layer matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "team-jacket",
      cardTitle: "Custom Ice Hockey Team Jacket",
      cardSubline: "Zip warm-up, tricot or stretch woven",
      image: "",
      imageAlt: "Custom Ice Hockey Team Jacket",
      href: `${PLP}/team-jacket`,
      sku: "CAP-HKY-05",
      pdpHeading: "Custom Ice Hockey Team Jacket Manufacturer",
      pdpMetaTitle: "Custom Ice Hockey Team Jacket Manufacturer",
      pdpDescription:
        "Ice hockey team jacket, custom and private label, a zip warm-up jacket in brushed-back polyester tricot or a Polyester/Spandex stretch woven, full-zip or quarter-zip, for the bench, warm-ups and travel, with an embroidered crest, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Ice Hockey Team Jacket"),
      pdpMetaDescription:
        "Custom ice hockey team jacket manufacturer: tricot or stretch woven zip jackets for the bench and travel, embroidered crest, MOQ 50, DDP to 20+ countries.",
      material: "Polyester tricot with a brushed back, or a Polyester/Spandex stretch woven",
      pdpFabricPills: ["Polyester tricot", "Brushed back", "Polyester/Spandex stretch woven", "Recycled option"],
      pdpCustomizationPills: ["Full-zip or quarter-zip", "Embroidered crest", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "Is the ice hockey team jacket made in tricot or stretch woven?",
          a: "Both. The ice hockey team jacket is built in brushed-back polyester tricot, the classic track-style build, or in a Polyester/Spandex stretch woven with a smoother face and added stretch. The fabric is chosen per program and confirmed on your sample.",
        },
        {
          q: "Does the ice hockey team jacket come in full-zip or quarter-zip?",
          a: "Both. The ice hockey team jacket is built as a full-zip with a stand collar or as a quarter-zip pullover, with set-in or raglan sleeves, all to your spec.",
        },
        {
          q: "How is the team crest applied to the ice hockey team jacket?",
          a: "The crest is embroidered onto the ice hockey team jacket in thread matched to your Pantone colors, with team marks printed. Sublimated panels are available on the tricot build. Placement and size are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Ice Hockey Game Jersey", slug: "game-jersey", href: PLP },
        { label: "Custom Ice Hockey Practice Jersey", slug: "practice-jersey", href: PLP },
        { label: "Custom Ice Hockey Base Layer", slug: "base-layer", href: PLP },
        { label: "Custom Ice Hockey Goalie Jersey", slug: "goalie-jersey", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Ice hockey team jacket, zip warm-up layer (base type)" },
        { label: "Fabric", value: "Polyester tricot with a brushed back, or a Polyester/Spandex stretch woven" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Zip and collar", value: "Full-zip or quarter-zip, with a stand collar" },
        { label: "Sleeve", value: "Long sleeve, set-in or raglan" },
        { label: "Hem and pockets", value: "Drawcord hem with toggles, zip or seam side pockets" },
        { label: "Decoration", value: "Embroidered crest and printed team marks, with sublimated panels on tricot" },
        { label: "Color", value: "Solid team colors, contrast panels and piping, Pantone matched to your kit" },
        { label: "Fit", value: "Team cut, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Ice Hockey Team Jacket" },
      pdpCustomizationSteps: customizeSteps([
        ["Fabric and build", "Polyester tricot or Polyester/Spandex stretch woven, full-zip or quarter-zip"],
        ["Construction", "Stand collar, set-in or raglan sleeve, drawcord hem, zip or seam pockets"],
        ["Color", "Solid team colors, contrast panels and piping, Pantone matched"],
        ["Decoration", "Embroidered crest, printed team marks, sublimated panels on tricot"],
        ["Fit", "Team cut, graded across the full size run"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: "Built for the rink",
      pdpQualitySubline:
        "We confirm the fabric, the zip, the color and the fit on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Jacket color Pantone matched to your kit and approved on the sample before we cut",
        "Crest embroidery finished clean and flat, with no puckering",
        "Zip, pockets and hem checked for a flat, even finish across the size run",
        "The full roster produced in one run, same fabric lot, so every jacket matches",
        AQL_POINT,
      ],
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, Teamwear sports only,
  // closest sports first.
  relatedLinks: [
    { label: "Football", href: "/capriowear/teamwear/football" },
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
    { label: "Basketball", href: "/capriowear/teamwear/basketball" },
    { label: "Baseball", href: "/capriowear/teamwear/baseball" },
    { label: "Soccer", href: "/capriowear/teamwear/soccer" },
  ],
};
