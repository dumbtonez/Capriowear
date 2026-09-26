// content/teamwear/baseball.ts
// Fourth Teamwear category (serves baseball and softball), same `Category`
// shape as Cricket/Basketball/Rugby (content/teamwear/{cricket,basketball,
// rugby}.ts) and every Activewear category (content/activewear/types.ts) --
// a pure content/data drop: no edits to app/teamwear/[sport]/page.tsx or
// app/teamwear/[sport]/[style]/page.tsx, only this file plus one line in
// ./sports.ts.
//
// PDP publish state (owner spec): every style ships "draft". Baseball opts
// into the Teamwear draft-PDP rule (`draftPdpsReachable`, TEMPORARY, see
// content/activewear/types.ts): all 7 styles carry PDP content (batches 1 to 3,
// 2026-09-26) and render as noindexed draft PDPs (BreadcrumbList only, out
// of the sitemap and the CollectionPage/ItemList) with linking cards. Publishing needs the
// roster confirmed, the style sampled and real photos (getPublishReadiness()).
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- caps (structured
// headwear), belts (accessory) and socks/stirrups (knitted goods) are all
// typically sourced, not cut-and-sew, so none is a style card here. Every
// card below is a genuinely cut-and-sew baseball/softball piece.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape Cricket
// introduced -- no component or type change needed for this category.
//
// No baseball GSM number is ever stated (owner spec) -- every fabric-weight
// reference is worded as "tuned to your program/confirmed on your sample,"
// never a made-up figure.
//
// Punctuation rule (owner spec, site-wide sweep): headings, eyebrows, labels
// and short fact/chip lines carry no trailing period; periods stay only on
// real sentences (leads, FAQ answers, descriptions, the fabric footnote, the
// Specifications subtitle, the final-CTA subline). Written period-clean from
// the start here, not swept after the fact.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows.
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/baseball";

const QUALITY_HEADING = "Built to take the slide";
const NAMES_NUMBERS_POINT = "Names and numbers dyed into the fiber, so they will not crack or peel";
const PROOF_POINT = "Digital proof and Pantone match approved before we cut";
const ROSTER_POINT = "The full roster produced in one run, same fabric roll and print batch, so every kit matches";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";

const PENDING_WEIGHT = "Pending, confirmed on your sample.";
const JERSEY_FIT = "Baseball cut or a fitted softball cut, graded XS to 5XL, men's, women's and youth blocks";
const JERSEY_COLOR = "Full sublimation color range, Pantone matched, home and away colorways";
const JERSEY_BRANDING = "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging";

const PANTS_FABRIC = "100% polyester double-knit with a soil-release finish";
const PANTS_KNEE = "Optional reinforced double-layer knee for sliding and fielding";
const PANTS_DECORATION = "Full-dye sublimation, team colors and piping, Pantone matched";
const PANTS_SIZING = "Graded XS to 5XL, men's, women's and youth blocks, with a softball women's-specific block available";
const PANTS_BRANDING = "Team logo, manufacturer mark, woven and care labels, packaging";
const PANTS_CUSTOMIZATION_PILLS = ["Reinforced knee", "Belt-loop or elastic waist", "Team colors", "Custom labels"];
const PANTS_KNEE_POINT = "Reinforced knee option, built for sliding and fielding";
const PANTS_INSEAM_POINT = "Inseam and waist graded and checked across the full size run";
const PAIR_ROSTER_POINT = "The full roster produced in one run, same fabric roll, so every pair matches";

type Step = [title: string, body: string];
const NAMES_AND_NUMBERS_STEP: Step = ["Names and numbers", "Built into the print file, or tackle twill for a raised pro-style look"];
const COLOR_STEP: Step = ["Color", "Pantone, CMYK, RGB or hex matched, confirmed on your digital proof"];
const TRIMS_STEP: Step = ["Trims and finish", "Woven labels, size and care labels, hangtags"];
const PACKAGING_STEP: Step = ["Packaging", "Polybags, boxes, retail-ready to your spec"];
const PANTS_WAISTBAND_STEP: Step = ["Waistband", "Pro-style tunnel belt loops and zipper fly, or a gripper elastic waistband"];
const PANTS_PRINT_STEP: Step = ["Print and artwork", "Full-dye sublimation, team colors and piping"];
const PANTS_FABRIC_STEP: Step = [
  "Fabric",
  "Firm polyester double-knit with a soil-release finish, sourced or matched to your reference",
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

export const baseball: Category = {
  slug: "baseball",
  group: "Teamwear",
  menuLabel: "Baseball",
  manufacturerNoun: "Baseball Uniform",
  productNounPlural: "baseball and softball uniforms and kits",
  entityExampleStyles: "button-front jerseys, pullover jerseys, pants, and warm-ups",
  entityFabrics: "polyester mesh and double-knit",
  h1: "Custom Baseball Uniform Manufacturer",
  metaTitle: "Custom Baseball Uniform Manufacturer",
  metaDescription:
    "Custom baseball and softball uniform manufacturer: button-front jerseys, double-knit pants and warm-ups, sublimated, MOQ 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester mesh or microfiber",
      bestFor: "Game and batting-practice jerseys",
      performance: "Lightweight, breathable, prints cleanly",
    },
    {
      fabric: "Polyester double-knit",
      bestFor: "Baseball and softball pants",
      performance: "Firm and structured, holds up to sliding",
    },
    {
      fabric: "Polyester/Spandex knit",
      bestFor: "Sliding shorts",
      performance: "Close fit, moisture-wicking",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainability-positioned programs",
      performance: "Print result confirmed on your sample",
    },
  ],
  // Segment run (owner spec: highlight one small, important phrase,
  // semibold, not the whole note) -- same standing rule as Cricket/
  // Basketball's own fabric footnote.
  fabricNote: [
    { text: "Polyester-based for full-color sublimation. Pants use a firm double-knit with a soil-release finish, and final weights are tuned to your program and " },
    { text: "confirmed on your sample", bold: true },
    { text: ". Swatches before every bulk run." },
  ],
  fabricPills: ["Polyester mesh", "Microfiber", "Double-knit", "Polyester/Spandex", "Recycled option"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Jersey and pant graphics, names, numbers, logos, even the button placket",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn pro-style numbers and lettering",
        notes: "Raised, classic varsity look",
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
    // Segment array, not a plain string (owner spec: highlight one small,
    // important phrase, semibold, not the whole sentence -- same standing
    // rule as Cricket/Basketball's own decoration note).
    note: [
      { text: "A button-front jersey still takes full sublimation, placket included, so " },
      { text: "the classic look does not limit your design", bold: true },
      { text: ". Buttons are dyed to match rather than sublimated." },
    ],
  },
  qualityHeading: "Built to take the slide",
  qualitySubline:
    "We confirm the fabric, the knee reinforcement, the color and the fit on your sample before the full roster is produced.",
  qualityPoints: [
    "Double-knit pants and the reinforced knee option, built for sliding and fielding",
    "Names and numbers sublimated into the fiber, so they will not crack or peel",
    "Digital proof and Pantone match approved before we cut",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Lightweight jersey knits, firm polyester double-knit pants, Polyester/Spandex sliding shorts",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, names and numbers in the print, Pantone color matching, home and away kits",
    },
    {
      title: "Decoration",
      body: "Sublimation including the button placket, tackle twill pro numbers, embroidered crests",
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
      q: "What is your MOQ for custom baseball kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a button-front and a pullover jersey, and does the placket limit sublimation?",
      a: "Both are available. A button-front jersey has a full-button or two-button placket for the classic pro look, with dyed-to-match buttons; a pullover is simpler and often lower cost. Either way the whole jersey, placket included, takes full-dye sublimation, so the button front does not limit your design.",
    },
    {
      q: "Should we order full-length or knicker pants, and is the reinforced knee standard?",
      a: "Both lengths are built on the same double-knit platform: full-length pants drape over the cleat, and knicker pants end at the knee and are worn with stirrup or sanitary socks. The reinforced knee is an option on either length, an added double-layer knee panel for sliding and fielding durability, confirmed on your sample.",
    },
    {
      q: "Do baseball and softball use different fabric?",
      a: "Same polyester sublimation fabric family. The difference is the cut: softball jerseys run more fitted and are usually pullovers, and softball pants use a women's-specific block.",
    },
    {
      q: "What numbering and uniform rules apply?",
      a: "They vary by league. Little League, high school and travel ball differ on number size, placement and design freedom, and some leagues require a shoulder patch sewn or ironed on rather than printed. Tell us your league and we build to its current rules, confirmed on your proof.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // TEMPORARY (owner, 2026-09-26): opts Baseball into the draft-PDP rule so
  // the batch-1 drafts get noindexed pages and their cards link. See the
  // field's own comment in content/activewear/types.ts.
  draftPdpsReachable: true,
  // 7 drafts, SKU order (CAP-BSB-01 to 07), owner spec 2026-09-26. Card
  // title = H1 minus " Manufacturer" = title-tag name = breadcrumb = alt =
  // every pill label that targets it. All 7 carry PDP content (batches 1 to
  // 3; 01 and 02 replaced the two legacy drafts entirely).
  styleCards: [
    {
      status: "draft",
      slug: "button-front-jersey",
      cardTitle: "Custom Button-Front Baseball Jersey",
      cardSubline: "Full-button or two-button placket, fully sublimated",
      image: "",
      imageAlt: "Custom Button-Front Baseball Jersey",
      href: `${PLP}/button-front-jersey`,
      sku: "CAP-BSB-01",
      pdpHeading: "Custom Button-Front Baseball Jersey Manufacturer",
      pdpMetaTitle: "Custom Button-Front Baseball Jersey Manufacturer",
      pdpDescription:
        "Button-front baseball jersey, custom and private label, with a full-button or two-button placket and dyed-to-match buttons, fully sublimated including the placket, in a lightweight polyester knit, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Button-Front Baseball Jersey"),
      pdpMetaDescription:
        "Custom button-front baseball jersey manufacturer: full-button or two-button placket, fully sublimated, dyed-to-match buttons, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight 100% polyester, mesh, microfiber or interlock",
      pdpFabricPills: ["Lightweight polyester", "Mesh or microfiber", "Polyester interlock", "Recycled option"],
      pdpCustomizationPills: ["Sublimated placket", "Names & numbers", "Home & away kits", "Custom labels"],
      faqs: [
        {
          q: "Does the placket limit sublimation on the button-front baseball jersey?",
          a: "No. The whole button-front baseball jersey, placket included, takes full-dye sublimation, and the buttons are dyed to match, so the classic button-front look carries unlimited-color graphics.",
        },
        {
          q: "Can the button-front baseball jersey be full-button or two-button, with set-in or raglan sleeves?",
          a: "Yes. A full-button placket runs the length of the jersey, a two-button placket sits at the collar, and set-in or raglan sleeves are both available, all to your spec.",
        },
        {
          q: "Is the button-front baseball jersey available in a softball cut?",
          a: "Yes. A fitted softball cut is built on the same platform and graded across the full size run. A jersey with no placket is its own style, the Custom Pullover Baseball Jersey.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Baseball Pants", slug: "double-knit-pants", href: PLP },
        { label: "Custom Pullover Baseball Jersey", slug: "pullover-jersey", href: PLP },
        { label: "Custom Batting-Practice Jersey", slug: "batting-practice-jersey", href: PLP },
        { label: "Custom Knicker Baseball Pants", slug: "knicker-pants", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Button-front baseball jersey (base type)" },
        { label: "Fabric", value: "Lightweight 100% polyester, mesh, microfiber or interlock" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Placket", value: "Full-button or two-button placket, dyed-to-match buttons" },
        { label: "Sleeve", value: "Set-in or raglan, your choice" },
        { label: "Hem", value: "Curved shirttail hem, cut to stay tucked" },
        {
          label: "Decoration",
          value: "Full-dye sublimation across the whole jersey, placket included; tackle twill numbers optional",
        },
        { label: "Color", value: JERSEY_COLOR },
        { label: "Fit", value: JERSEY_FIT },
        { label: "Branding", value: JERSEY_BRANDING },
      ],
      specificationsImage: { alt: "Custom Button-Front Baseball Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation across the whole jersey, placket included, dyed-to-match buttons"],
        NAMES_AND_NUMBERS_STEP,
        ["Construction", "Full-button or two-button placket, set-in or raglan sleeve, curved shirttail hem"],
        ["Fabric", "Any lightweight polyester knit, sourced or matched to your reference"],
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: "We confirm the fabric, the placket, the color and the fit on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Placket finished clean, with buttons dyed to match the design",
        NAMES_NUMBERS_POINT,
        PROOF_POINT,
        ROSTER_POINT,
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "double-knit-pants",
      cardTitle: "Custom Baseball Pants",
      cardSubline: "Double-knit, reinforced knee option",
      image: "",
      imageAlt: "Custom Baseball Pants",
      href: `${PLP}/double-knit-pants`,
      sku: "CAP-BSB-02",
      pdpHeading: "Custom Baseball Pants Manufacturer",
      pdpMetaTitle: "Custom Baseball Pants Manufacturer",
      pdpDescription:
        "Full-length baseball pants, custom and private label, in a firm 100% polyester double-knit with a soil-release finish, pro-style tunnel belt loops, a zipper fly and an optional reinforced knee, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Baseball Pants"),
      pdpMetaDescription:
        "Custom baseball pants manufacturer: full-length 100% polyester double-knit, reinforced knee option, pro-style belt loops, MOQ 50, DDP to 20+ countries.",
      material: PANTS_FABRIC,
      pdpFabricPills: ["Polyester double-knit", "Soil-release finish", "Reinforced knee option", "Tunnel belt loops"],
      pdpCustomizationPills: PANTS_CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "Is the reinforced knee standard on the custom baseball pants?",
          a: "It is an option. An added double-layer knee panel gives the custom baseball pants extra sliding and fielding durability where a team wants it, confirmed on your sample.",
        },
        {
          q: "What waistband do the custom baseball pants use?",
          a: "Pro-style tunnel belt loops and a zipper fly as standard, or a gripper elastic waistband on request. The waistband is confirmed on your sample before bulk.",
        },
        {
          q: "Do you make the custom baseball pants in a softball cut?",
          a: "Yes. The softball cut uses a women's-specific block that runs trimmer through the hip and thigh, in full length. The knee-length cut is its own style, the Custom Knicker Baseball Pants.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Knicker Baseball Pants", slug: "knicker-pants", href: PLP },
        { label: "Custom Button-Front Baseball Jersey", slug: "button-front-jersey", href: PLP },
        { label: "Custom Sliding Shorts", slug: "sliding-shorts", href: PLP },
        { label: "Custom Pullover Baseball Jersey", slug: "pullover-jersey", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Full-length baseball pants, double-knit (base type)" },
        { label: "Fabric", value: PANTS_FABRIC },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Silhouette", value: "Full length, draping over the cleat. The knee-length cut is its own style (CAP-BSB-04)." },
        { label: "Knee", value: PANTS_KNEE },
        {
          label: "Waistband",
          value: "Pro-style tunnel belt loops and a zipper fly as standard, or a gripper elastic waistband on request",
        },
        { label: "Pockets", value: "Back welt pockets" },
        { label: "Decoration and color", value: PANTS_DECORATION },
        { label: "Sizing", value: PANTS_SIZING },
        { label: "Branding", value: PANTS_BRANDING },
      ],
      specificationsImage: { alt: "Custom Baseball Pants" },
      pdpCustomizationSteps: customizeSteps([
        ["Construction", "Full length, optional reinforced double-layer knee"],
        PANTS_WAISTBAND_STEP,
        PANTS_PRINT_STEP,
        PANTS_FABRIC_STEP,
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fabric, the knee reinforcement and the waistband on your sample before the full roster is produced.",
      pdpQualityPoints: [
        PANTS_KNEE_POINT,
        "Double-knit and soil-release finish confirmed on your sample",
        PANTS_INSEAM_POINT,
        PAIR_ROSTER_POINT,
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "pullover-jersey",
      cardTitle: "Custom Pullover Baseball Jersey",
      cardSubline: "V-neck or crew, no placket",
      image: "",
      imageAlt: "Custom Pullover Baseball Jersey",
      href: `${PLP}/pullover-jersey`,
      sku: "CAP-BSB-03",
      pdpHeading: "Custom Pullover Baseball Jersey Manufacturer",
      pdpMetaTitle: "Custom Pullover Baseball Jersey Manufacturer",
      pdpDescription:
        "Pullover baseball jersey, custom and private label, a V-neck or crew jersey with no button placket, fully sublimated, the common softball style and a simpler baseball option, in a lightweight polyester mesh, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Pullover Baseball Jersey"),
      pdpMetaDescription:
        "Custom pullover baseball jersey manufacturer: V-neck or crew polyester mesh jerseys for baseball and softball, fully sublimated, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight 100% polyester mesh, flatback mesh or microfiber",
      pdpFabricPills: ["Polyester mesh", "Flatback mesh", "Microfiber", "Recycled option"],
      pdpCustomizationPills: ["V-neck or crew", "Names & numbers", "Softball fitted cut", "Custom labels"],
      faqs: [
        {
          q: "How is the pullover baseball jersey different from the button-front baseball jersey?",
          a: "The pullover baseball jersey has no button placket and pulls on over the head, with a V-neck or crew collar. It is the simpler build, common in softball and as a lower-cost baseball option, with the same full-dye sublimation and colors as the button-front baseball jersey.",
        },
        {
          q: "Is the pullover baseball jersey made in a fitted softball cut?",
          a: "Yes. The pullover baseball jersey is built in a baseball cut or a fitted softball cut, graded across the full size run, with men's, women's and youth blocks.",
        },
        {
          q: "What collar options are there on the pullover baseball jersey?",
          a: "A V-neck or crew collar in a rib knit, in your team color or a contrast trim color, finished flat and confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Button-Front Baseball Jersey", slug: "button-front-jersey", href: PLP },
        { label: "Custom Batting-Practice Jersey", slug: "batting-practice-jersey", href: PLP },
        { label: "Custom Baseball Pants", slug: "double-knit-pants", href: PLP },
        { label: "Custom Sliding Shorts", slug: "sliding-shorts", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Pullover baseball jersey, no placket (base type)" },
        { label: "Fabric", value: "Lightweight 100% polyester mesh, flatback mesh or microfiber" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Neck", value: "V-neck or crew with a rib-knit collar" },
        { label: "Sleeve", value: "Set-in or raglan, your choice" },
        { label: "Hem", value: "Straight or curved hem, to your spec" },
        { label: "Decoration", value: "Full-dye sublimation across the whole jersey; tackle twill numbers optional" },
        { label: "Color", value: JERSEY_COLOR },
        { label: "Fit", value: JERSEY_FIT },
        { label: "Branding", value: JERSEY_BRANDING },
      ],
      specificationsImage: { alt: "Custom Pullover Baseball Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation across the whole jersey, unlimited colors at one cost"],
        NAMES_AND_NUMBERS_STEP,
        ["Construction", "V-neck or crew, set-in or raglan sleeve, straight or curved hem"],
        ["Fabric", "Any lightweight polyester mesh or knit, sourced or matched to your reference"],
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: "We confirm the fabric, the collar, the color and the fit on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Rib-knit collar finished flat, with the collar color matched to the design",
        NAMES_NUMBERS_POINT,
        PROOF_POINT,
        ROSTER_POINT,
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "knicker-pants",
      cardTitle: "Custom Knicker Baseball Pants",
      cardSubline: "Knee-length, worn with stirrup socks",
      image: "",
      imageAlt: "Custom Knicker Baseball Pants",
      href: `${PLP}/knicker-pants`,
      sku: "CAP-BSB-04",
      pdpHeading: "Custom Knicker Baseball Pants Manufacturer",
      pdpMetaTitle: "Custom Knicker Baseball Pants Manufacturer",
      pdpDescription:
        "Knicker baseball pants, custom and private label, knee-length in a firm 100% polyester double-knit with a soil-release finish and a covered elastic knee cuff, pro-style tunnel belt loops, a zipper fly and an optional reinforced knee, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Knicker Baseball Pants"),
      pdpMetaDescription:
        "Custom knicker baseball pants manufacturer: knee-length 100% polyester double-knit, elastic knee cuff, reinforced knee option, MOQ 50, DDP to 20+ countries.",
      material: PANTS_FABRIC,
      pdpFabricPills: ["Polyester double-knit", "Soil-release finish", "Elastic knee cuff", "Reinforced knee option"],
      pdpCustomizationPills: PANTS_CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "How do the knicker baseball pants differ from the full-length custom baseball pants?",
          a: "The knicker baseball pants use the same double-knit platform but end just below the knee with a covered elastic cuff, and are worn with stirrup or sanitary socks. The full-length cut drapes over the cleat and is its own style, the Custom Baseball Pants.",
        },
        {
          q: "Is the reinforced knee available on the knicker baseball pants?",
          a: "Yes, as an option. An added double-layer knee panel gives the knicker baseball pants extra sliding and fielding durability, confirmed on your sample.",
        },
        {
          q: "Do you make the knicker baseball pants in a softball cut?",
          a: "Yes. The softball cut uses a women's-specific block that runs trimmer through the hip and thigh, graded across the full size run.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Baseball Pants", slug: "double-knit-pants", href: PLP },
        { label: "Custom Sliding Shorts", slug: "sliding-shorts", href: PLP },
        { label: "Custom Button-Front Baseball Jersey", slug: "button-front-jersey", href: PLP },
        { label: "Custom Pullover Baseball Jersey", slug: "pullover-jersey", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Knicker baseball pants, double-knit (base type)" },
        { label: "Fabric", value: PANTS_FABRIC },
        { label: "Weight", value: PENDING_WEIGHT },
        {
          label: "Silhouette",
          value: "Knee length, ending just below the knee. The full-length cut is its own style (CAP-BSB-02).",
        },
        { label: "Leg opening", value: "Covered elastic cuff at the knee, worn with stirrup or sanitary socks" },
        { label: "Knee", value: PANTS_KNEE },
        {
          label: "Waistband",
          value:
            "Pro-style tunnel belt loops and a zipper fly as standard, or a gripper elastic waistband on request, with back welt pockets",
        },
        { label: "Decoration and color", value: PANTS_DECORATION },
        { label: "Sizing", value: PANTS_SIZING },
        { label: "Branding", value: PANTS_BRANDING },
      ],
      specificationsImage: { alt: "Custom Knicker Baseball Pants" },
      pdpCustomizationSteps: customizeSteps([
        ["Construction", "Knee length with a covered elastic cuff, optional reinforced double-layer knee"],
        PANTS_WAISTBAND_STEP,
        PANTS_PRINT_STEP,
        PANTS_FABRIC_STEP,
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: "We confirm the fabric, the knee cuff and the waistband on your sample before the full roster is produced.",
      pdpQualityPoints: [
        PANTS_KNEE_POINT,
        "Elastic cuff set to sit just below the knee and stay in place",
        PANTS_INSEAM_POINT,
        PAIR_ROSTER_POINT,
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "batting-practice-jersey",
      cardTitle: "Custom Batting-Practice Jersey",
      cardSubline: "Lightweight practice top",
      image: "",
      imageAlt: "Custom Batting-Practice Jersey",
      href: `${PLP}/batting-practice-jersey`,
      sku: "CAP-BSB-05",
      pdpHeading: "Custom Batting-Practice Jersey Manufacturer",
      pdpMetaTitle: "Custom Batting-Practice Jersey Manufacturer",
      pdpDescription:
        "Batting-practice jersey, custom and private label, a lightweight practice top in polyester mesh with a two-button placket or a pullover neck, fully sublimated in your team colors, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Batting-Practice Jersey"),
      pdpMetaDescription:
        "Custom batting-practice jersey manufacturer: lightweight polyester mesh practice tops, two-button or pullover, fully sublimated, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight 100% polyester mesh, flatback mesh or microfiber",
      pdpFabricPills: ["Lightweight polyester mesh", "Flatback mesh", "Microfiber", "Recycled option"],
      pdpCustomizationPills: ["Two-button or pullover", "Names & numbers", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "How is the batting-practice jersey different from a game jersey?",
          a: "The batting-practice jersey is a lighter, simpler top worn for batting practice, warm-ups and training, often in a different design from the game kit. It is built on the same polyester mesh platform, so it takes the same full-dye sublimation and Pantone colors.",
        },
        {
          q: "Does the batting-practice jersey come with a two-button placket or a pullover neck?",
          a: "Both. The batting-practice jersey is built with a two-button placket and rib-knit collar, or as a V-neck or crew pullover, chosen per team and confirmed on your sample.",
        },
        {
          q: "Can the batting-practice jersey match our game kit colors?",
          a: "Yes. The batting-practice jersey is sublimated to the same Pantone colors as your game kit, with names and numbers added or left off as your program prefers.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Pullover Baseball Jersey", slug: "pullover-jersey", href: PLP },
        { label: "Custom Button-Front Baseball Jersey", slug: "button-front-jersey", href: PLP },
        { label: "Custom Baseball Warm-Up Jacket", slug: "warm-up-jacket", href: PLP },
        { label: "Custom Baseball Pants", slug: "double-knit-pants", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Batting-practice jersey, lightweight practice top (base type)" },
        { label: "Fabric", value: "Lightweight 100% polyester mesh, flatback mesh or microfiber" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Neck", value: "Two-button placket with a rib-knit collar, or a V-neck or crew pullover" },
        { label: "Sleeve", value: "Short sleeve, set-in or raglan" },
        { label: "Hem", value: "Straight hem, to your spec" },
        { label: "Decoration", value: "Full-dye sublimation across the whole jersey, names and numbers optional" },
        { label: "Color", value: "Full sublimation color range, Pantone matched to your game kit" },
        { label: "Fit", value: JERSEY_FIT },
        { label: "Branding", value: JERSEY_BRANDING },
      ],
      specificationsImage: { alt: "Custom Batting-Practice Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation across the whole jersey, a practice design or a match to your game kit"],
        ["Names and numbers", "Built into the print file, or left off for a shared practice set"],
        ["Construction", "Two-button placket or pullover neck, set-in or raglan sleeve"],
        ["Fabric", "Any lightweight polyester mesh or knit, sourced or matched to your reference"],
        COLOR_STEP,
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: "Matched to your game kit",
      pdpQualitySubline: "We confirm the fabric, the neck, the color and the fit on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Mesh weight and hand confirmed on your sample before bulk",
        NAMES_NUMBERS_POINT,
        PROOF_POINT,
        "The full roster produced in one run, same fabric roll and print batch, so every jersey matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "sliding-shorts",
      cardTitle: "Custom Sliding Shorts",
      cardSubline: "Padded slide protection under the pant",
      image: "",
      imageAlt: "Custom Sliding Shorts",
      href: `${PLP}/sliding-shorts`,
      sku: "CAP-BSB-06",
      pdpHeading: "Custom Sliding Shorts Manufacturer",
      pdpMetaTitle: "Custom Sliding Shorts Manufacturer",
      pdpDescription:
        "Sliding shorts, custom and private label, a close-fitting Polyester/Spandex short worn under the pant with quilted foam padding at the hips for slide protection, the shell cut and sewn to your brand in Sialkot, Pakistan, with the pad sourced to your spec.",
      images: gallery("Custom Sliding Shorts"),
      pdpMetaDescription:
        "Custom sliding shorts manufacturer: Polyester/Spandex compression shorts with foam hip padding for baseball and softball, MOQ 50, DDP to 20+ countries.",
      material: "Polyester/Spandex knit with quilted foam hip pads",
      pdpFabricPills: ["Polyester/Spandex knit", "Quilted foam hip pads", "Moisture-wicking", "Elastic waistband"],
      pdpCustomizationPills: ["Pad placement", "Team colors", "Printed logo", "Custom labels"],
      faqs: [
        {
          q: "What padding do the custom sliding shorts use?",
          a: "The custom sliding shorts use quilted foam pads at the hips, sourced to your spec and sewn into the Polyester/Spandex shell in-house. Pad placement is confirmed on your sample before bulk.",
        },
        {
          q: "Are the custom sliding shorts worn under the baseball pants?",
          a: "Yes. The custom sliding shorts are a close-fitting layer worn under the Custom Baseball Pants or the Custom Knicker Baseball Pants, protecting the hips on slides.",
        },
        {
          q: "Do you make the custom sliding shorts for softball?",
          a: "Yes. The custom sliding shorts are graded across men's, women's and youth blocks, so one order can cover baseball and softball rosters.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Baseball Pants", slug: "double-knit-pants", href: PLP },
        { label: "Custom Knicker Baseball Pants", slug: "knicker-pants", href: PLP },
        { label: "Custom Button-Front Baseball Jersey", slug: "button-front-jersey", href: PLP },
        { label: "Custom Baseball Warm-Up Jacket", slug: "warm-up-jacket", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Padded sliding shorts, worn under the pant (base type)" },
        { label: "Fabric", value: "Polyester/Spandex knit, moisture-wicking" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Padding", value: "Quilted foam pads at the hips, sourced to your spec and sewn in-house" },
        {
          label: "Fit",
          value: "Close compression fit through the hip and thigh, graded XS to 5XL, men's, women's and youth blocks",
        },
        { label: "Inseam", value: "Set to your spec, sitting under the pant leg" },
        { label: "Waistband", value: "Wide elastic waistband" },
        { label: "Color", value: "Solid team colors, Pantone matched" },
        { label: "Decoration", value: "Printed logo on the leg or waistband" },
        { label: "Branding", value: PANTS_BRANDING },
      ],
      specificationsImage: { alt: "Custom Sliding Shorts" },
      pdpCustomizationSteps: customizeSteps([
        ["Padding", "Foam hip pads, placement and thickness sourced to your spec"],
        ["Fit and length", "Compression fit, inseam set to your spec"],
        ["Color", "Solid team colors, Pantone matched"],
        ["Decoration", "Printed logo on the leg or waistband"],
        ["Fabric", "Polyester/Spandex knit, sourced or matched to your reference"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: "We confirm the fabric, the pad placement and the fit on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Pad placement at the hips confirmed on your sample before bulk",
        "Pads sewn in flat and checked so they stay in place",
        "Waistband and stretch recovery checked across the full size run",
        "The full roster produced in one run, same fabric lot, so every pair matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "warm-up-jacket",
      cardTitle: "Custom Baseball Warm-Up Jacket",
      cardSubline: "Dugout zip jacket, tricot or stretch woven",
      image: "",
      imageAlt: "Custom Baseball Warm-Up Jacket",
      href: `${PLP}/warm-up-jacket`,
      sku: "CAP-BSB-07",
      pdpHeading: "Custom Baseball Warm-Up Jacket Manufacturer",
      pdpMetaTitle: "Custom Baseball Warm-Up Jacket Manufacturer",
      pdpDescription:
        "Baseball warm-up jacket, custom and private label, a dugout zip layer in brushed-back polyester tricot or a Polyester/Spandex stretch woven, full-zip or quarter-zip with an embroidered crest, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Baseball Warm-Up Jacket"),
      pdpMetaDescription:
        "Custom baseball warm-up jacket manufacturer: tricot or stretch woven dugout jackets, full-zip or quarter-zip, embroidered crest, MOQ 50, DDP to 20+ countries.",
      material: "Brushed-back polyester tricot or Polyester/Spandex stretch woven",
      pdpFabricPills: ["Polyester tricot", "Brushed back", "Polyester/Spandex stretch woven", "Recycled option"],
      pdpCustomizationPills: ["Full-zip or quarter-zip", "Embroidered crest", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "Is the baseball warm-up jacket made in tricot or stretch woven?",
          a: "Both. The baseball warm-up jacket is built in brushed-back polyester tricot, the classic track-style build, or in a Polyester/Spandex stretch woven with a smoother face and added stretch. The fabric is chosen per program and confirmed on your sample.",
        },
        {
          q: "Does the baseball warm-up jacket come in full-zip or quarter-zip?",
          a: "Both. The baseball warm-up jacket is built as a full-zip with a stand collar or as a quarter-zip pullover, with set-in or raglan sleeves, all to your spec.",
        },
        {
          q: "How is the team crest applied to the baseball warm-up jacket?",
          a: "The crest is embroidered onto the baseball warm-up jacket in thread matched to your Pantone colors, with team marks printed. Sublimated panels are available on the tricot build. Placement and size are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Batting-Practice Jersey", slug: "batting-practice-jersey", href: PLP },
        { label: "Custom Button-Front Baseball Jersey", slug: "button-front-jersey", href: PLP },
        { label: "Custom Pullover Baseball Jersey", slug: "pullover-jersey", href: PLP },
        { label: "Custom Baseball Pants", slug: "double-knit-pants", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Baseball warm-up jacket, dugout zip layer (base type)" },
        { label: "Fabric", value: "Polyester tricot with a brushed back, or a Polyester/Spandex stretch woven" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Zip and collar", value: "Full-zip or quarter-zip, with a stand collar" },
        { label: "Sleeve", value: "Long sleeve, set-in or raglan" },
        { label: "Hem and pockets", value: "Drawcord hem with toggles, zip or seam side pockets" },
        { label: "Decoration", value: "Embroidered crest and printed team marks, with sublimated panels on tricot" },
        { label: "Color", value: "Solid team colors, contrast panels and piping, Pantone matched to your kit" },
        { label: "Fit", value: "Team cut, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: JERSEY_BRANDING },
      ],
      specificationsImage: { alt: "Custom Baseball Warm-Up Jacket" },
      pdpCustomizationSteps: customizeSteps([
        ["Fabric and build", "Polyester tricot or Polyester/Spandex stretch woven, full-zip or quarter-zip"],
        ["Construction", "Stand collar, set-in or raglan sleeve, drawcord hem, zip or seam pockets"],
        ["Color", "Solid team colors, contrast panels and piping, Pantone matched"],
        ["Decoration", "Embroidered crest, printed team marks, sublimated panels on tricot"],
        ["Fit", "Team cut, graded across the full size run"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: "Built for the dugout",
      pdpQualitySubline: "We confirm the fabric, the zip, the color and the fit on your sample before the full roster is produced.",
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
    { label: "Cricket", href: "/capriowear/teamwear/cricket" },
    { label: "Football", href: "/capriowear/teamwear/football" },
    { label: "Basketball", href: "/capriowear/teamwear/basketball" },
    { label: "Soccer", href: "/capriowear/teamwear/soccer" },
    { label: "Ice Hockey", href: "/capriowear/teamwear/ice-hockey" },
  ],
};
