// content/teamwear/football.ts
// Teamwear category (American football), same `Category` shape as every
// other Teamwear category (content/teamwear/*.ts) and every Activewear
// category (content/activewear/types.ts) -- a pure content/data drop: no
// edits to app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/
// page.tsx, only this file plus one line in ./sports.ts.
//
// Batch 1 (owner spec, 2026-09-26): PLP fixes (meta, 6 cards in SKU order,
// fabric table and note, customization Fabric item, trust bullet 3, 8 FAQs)
// and draft PDPs for CAP-FBL-01 to 03, on the slugs of the two legacy
// drafts (game-jersey, integrated-pad-pants), whose content was removed in
// c71a68d. Cards 04 to 06 are card-only drafts: non-links, no route, until
// their PDP content lands and they switch to links automatically.
//
// Naming (owner spec): every style name starts "Custom American Football"
// (in Europe "football" means soccer), one exact name per style across the
// card, H1 minus " Manufacturer", title, breadcrumb, gallery alt and pills.
// The entity answer is a verbatim override so "American" keeps its capital
// (the templated sentence lowercases the manufacturer noun).
//
// Every style is "draft": noindexed, out of the sitemap and the
// CollectionPage/ItemList, BreadcrumbList only. Drafts with PDP content are
// reachable under the Teamwear default. No gender toggle: the Teamwear PLP
// template never renders it.
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- shoulder pads,
// helmets, the foam pad inserts, socks and gloves are molded protective gear
// or knitted goods, sourced, so none is a style card here. Game pants and
// the girdle stay: the shell and pockets are cut-and-sew, the foam pads are
// a sourced insert fitted during the same production run (owner spec).
//
// Uses `structuredBlock` (type "decoration"), the same field/shape every
// other Teamwear category uses. No fabric-weight figure is ever stated
// (owner spec): weights read "contact weight", "heavier shell" or
// "confirmed on your sample".
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/football";

const QUALITY_HEADING = "Built to fit over the pads";
const NAMES_NUMBERS_POINT = "Names and numbers dyed into the fiber, so they will not crack or peel";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";

const PENDING_WEIGHT = "Pending, confirmed on your sample.";
const SIZING = "Graded XS to 5XL, youth and adult blocks";

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

export const football: Category = {
  slug: "football",
  group: "Teamwear",
  menuLabel: "Football",
  // Verbatim override pair (PLP FAQ 1 and FAQ 1 on every PDP): keeps the
  // capital A in "American", which categoryEntityFaq()'s templated
  // sentence would lowercase.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom American football uniform manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label American football uniforms and kits from fabric to packaging, including game jerseys, practice jerseys, pad-pocket pants and girdles in contact-weight polyester and Polyester/Spandex knits, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  h1: "Custom American Football Uniform Manufacturer",
  metaTitle: "Custom American Football Uniform Manufacturer",
  metaDescription:
    "Custom American football uniform manufacturer: pro-cut game jerseys over pads, pad-pocket pants and girdles, practice kit, MOQ 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Teamwear has no gender split (owner spec, 2026-09-25).
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Contact-weight polyester or Polyester/Spandex",
      bestFor: "Game jerseys",
      performance: "Durable, holds a close fit over pads",
    },
    {
      fabric: "Open mesh or breathable polyester",
      bestFor: "Practice jerseys",
      performance: "Lighter, high airflow, wash-durable",
    },
    {
      fabric: "Heavier Polyester/Spandex shell",
      bestFor: "Pad-pocket pants and girdles",
      performance: "Tough, stretches over inserted pads",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainability-positioned programs",
      performance: "Print result confirmed on your sample",
    },
  ],
  fabricNote: [
    {
      text: "Polyester-based for full-color sublimation. Game jerseys run at a contact weight and pants at a heavier shell weight, with final weights tuned to your program and confirmed on your sample. Swatches before every bulk run.",
    },
  ],
  fabricPills: ["Contact-weight polyester", "Open mesh", "Heavier Polyester/Spandex shell", "Recycled option"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Jersey and pant graphics, names, numbers, logos",
        notes: "Dyed into the fiber, will not crack or peel, works the same on a tight pad-fit jersey",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn pro-style numbers and lettering",
        notes: "Raised, classic varsity look",
      },
      {
        method: "Embroidery",
        bestFor: "Crests, badges, sponsor marks",
        notes: "Raised, premium texture",
      },
      {
        method: "Heat-applied badge",
        bestFor: "Badges that sit under the shoulder pads",
        notes: "Bonded flat to reduce interior friction against the pads",
      },
    ],
    note: [
      { text: "A tight pad-fit jersey still takes full sublimation, so " },
      { text: "the fit does not limit your design", bold: true },
      { text: "." },
    ],
  },
  qualityHeading: QUALITY_HEADING,
  qualitySubline:
    "We confirm the fit over your pads, the print and the durability on your sample before the full roster is produced.",
  qualityPoints: [
    "Game jersey cut to fit over the shoulder pads, still fully sublimated",
    "Pants and girdle sewn with pad pockets, foam inserts fitted to spec",
    "Names and numbers sublimated into the fiber, so they will not crack or peel",
    AQL_POINT,
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Contact-weight polyester and Polyester/Spandex game knits, lighter practice mesh, heavier pad-pocket pant shell",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, names and numbers in the print, Pantone color matching, home and away kits",
    },
    {
      title: "Decoration",
      body: "Sublimation, tackle twill numbers, embroidered or heat-applied badges",
    },
    {
      title: "Finishing",
      body: "Your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // 8 FAQs (owner spec, 2026-09-26): the entity question is prepended at
  // render time from entityQuestion/entityAnswer, then these 7.
  faqs: [
    {
      q: "What is your MOQ for custom American football kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "How does the game jersey fit over the pads, and does it still sublimate?",
      a: "The game jersey is cut close in a pro-cut fit that sits over shoulder pads, with an elevated armhole for pad bulk and a hem set to stay in place under the pads. That fit does not limit decoration; the jersey still takes full-dye sublimation across the whole design.",
    },
    {
      q: "Do the pants and girdle come with pads, and are the pads made in-house?",
      a: "Pads are optional. The pants are sewn with pockets for a seven-pad set: two thigh, two knee, two hip and one tailbone. The girdle has pockets for its own five-pad set: two hip, two thigh and one tailbone. We make the shells and pockets in-house; the foam pads, along with shoulder pads, helmets, socks and gloves, are sourced and fitted to spec.",
    },
    {
      q: "How are names and numbers applied?",
      a: "Names and numbers are built into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Tackle twill numbers and heat-applied badges are available where you want a raised look or a flat finish under the pads.",
    },
    {
      q: "What numbering and uniform rules apply?",
      a: "Rules vary by competition, from US school and college football to European leagues and national federations, including number size and placement and home and away jersey colors. Tell us your competition and we build to its current rules, confirmed on your proof.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // 6 drafts, SKU order (CAP-FBL-01 to 06). Card title = H1 minus
  // " Manufacturer" = title-tag name = breadcrumb = alt = every pill label
  // that targets it. Pills carry a `slug`, so a pill for a card-only SKU
  // falls back to the PLP and switches to its PDP by itself.
  styleCards: [
    {
      status: "draft",
      slug: "game-jersey",
      cardTitle: "Custom American Football Game Jersey",
      cardSubline: "Pro-cut fit over pads, fully sublimated",
      image: "",
      imageAlt: "Custom American Football Game Jersey",
      href: `${PLP}/game-jersey`,
      sku: "CAP-FBL-01",
      pdpHeading: "Custom American Football Game Jersey Manufacturer",
      pdpMetaTitle: "Custom American Football Game Jersey Manufacturer",
      pdpDescription:
        "American football game jersey, custom and private label, a pro-cut contact-weight polyester jersey that sits close over shoulder pads, full-dye sublimated with names and numbers in the print, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom American Football Game Jersey"),
      pdpMetaDescription:
        "Custom American football game jersey manufacturer: pro-cut fit over pads, fully sublimated, tackle twill option, bar-tacked, MOQ 50, DDP to 20+ countries.",
      material: "Contact-weight polyester or Polyester/Spandex knit",
      pdpFabricPills: ["Contact-weight polyester", "Polyester/Spandex knit", "Mesh side panels", "Recycled polyester"],
      pdpCustomizationPills: ["Sublimated names & numbers", "Tackle twill numbers", "Home & away kits", "Custom labels"],
      faqs: [
        {
          q: "Does the pro-cut fit on the American football game jersey limit the sublimated design?",
          a: "No. The American football game jersey takes full-dye sublimation across the whole body, so the pro-cut fit over the pads puts no limit on colors or graphics.",
        },
        {
          q: "Can the American football game jersey have tackle twill numbers instead of printed ones?",
          a: "Yes. The American football game jersey can carry sublimated names and numbers in the print, or sewn tackle twill numbers for a raised pro-style look, chosen per program and confirmed on your proof.",
        },
        {
          q: "Will the American football game jersey stay in place over the pads?",
          a: "The American football game jersey is cut to sit close over the shoulder pads, with the body length and hem set to stay in place under the pads, and the fit is checked over pads on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom American Football Pants", slug: "integrated-pad-pants", href: PLP },
        { label: "Custom American Football Practice Jersey", slug: "practice-jersey", href: PLP },
        { label: "Custom American Football Girdle", slug: "girdle", href: PLP },
        { label: "Custom American Football Base Layer", slug: "base-layer", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "American football game jersey, pro-cut (base type)" },
        { label: "Fabric", value: "Contact-weight polyester or Polyester/Spandex knit, with mesh or stretch side panels optional" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Pro-cut, sized to sit close over shoulder pads, with an elevated armhole for pad bulk" },
        { label: "Sleeve", value: "Short sleeve cut to sit over the shoulder pads" },
        { label: "Length and hem", value: "Body length and hem set to stay in place under the pads, confirmed on your sample" },
        { label: "Reinforcement", value: "Bar-tacked at the stress points" },
        { label: "Decoration and color", value: "Full-dye sublimation, Pantone matched, with names and numbers in the print; tackle twill numbers or heat-applied badges optional" },
        { label: "Sizing", value: SIZING },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, hangtags, packaging" },
      ],
      specificationsImage: { alt: "Custom American Football Game Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation across the whole jersey, Pantone matched; the pro-cut fit does not limit the design"],
        ["Names and numbers", "Built into the print file, or tackle twill for a raised pro-style look"],
        ["Badges", "Embroidered, or heat-applied to sit flat under the shoulder pads"],
        ["Fit", "Pro-cut over pads, sized to your players' pad setup"],
        ["Fabric", "Contact-weight polyester or Polyester/Spandex, sourced or matched to your reference"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fit over your pads, the print and the seams on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Pro-cut fit checked over the pads on your sample",
        NAMES_NUMBERS_POINT,
        "Stress points bar-tacked and seams checked before bulk",
        "The full roster produced in one run, same fabric roll and print batch, so every kit matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "integrated-pad-pants",
      cardTitle: "Custom American Football Pants",
      cardSubline: "Integrated pockets for a seven-pad set",
      image: "",
      imageAlt: "Custom American Football Pants",
      href: `${PLP}/integrated-pad-pants`,
      sku: "CAP-FBL-02",
      pdpHeading: "Custom American Football Pants Manufacturer",
      pdpMetaTitle: "Custom American Football Pants Manufacturer",
      pdpDescription:
        "American football game pants, custom and private label, a heavier Polyester/Spandex stretch shell sewn with integrated pockets for a seven-pad set, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom American Football Pants"),
      pdpMetaDescription:
        "Custom American football pants manufacturer: stretch shell with integrated pockets for a seven-pad set, lace-up or belted, MOQ 50, DDP to 20+ countries.",
      material: "Heavier Polyester/Spandex stretch shell",
      pdpFabricPills: ["Polyester/Spandex", "Heavier stretch shell", "Recycled polyester"],
      pdpCustomizationPills: ["Seven-pad pockets", "Lace-up or belted", "Team colors & stripes", "Custom labels"],
      faqs: [
        {
          q: "Do the American football pants come with the pads?",
          a: "Pads are optional. The American football pants are sewn with pockets for a seven-pad set, two thigh, two knee, two hip and one tailbone, and you can order them with the foam pads fitted to spec or without.",
        },
        {
          q: "What closure options are there on the American football pants?",
          a: "The American football pants come with a lace-up front, waist snaps and a belt, or a simpler integrated elastic belt, built to your spec and confirmed on your sample.",
        },
        {
          q: "What is the difference between the American football pants and the girdle?",
          a: "The American football pants are the outer game garment; the American football girdle is a compression layer worn underneath with its own five-pad pockets for hip, thigh and tailbone. Teams using a girdle often pair it with pants that hold the knee pads only, and we build either setup to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom American Football Game Jersey", slug: "game-jersey", href: PLP },
        { label: "Custom American Football Girdle", slug: "girdle", href: PLP },
        { label: "Custom American Football Practice Jersey", slug: "practice-jersey", href: PLP },
        { label: "Custom American Football Base Layer", slug: "base-layer", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "American football game pants, integrated pad pockets (base type)" },
        { label: "Fabric", value: "Heavier Polyester/Spandex stretch shell" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Pad pockets", value: "Built-in pockets for a seven-pad set, two thigh, two knee, two hip and one tailbone, or knee pockets only for teams wearing a girdle" },
        { label: "Pads", value: "Foam pads are a sourced insert, fitted to spec or left out, your choice" },
        { label: "Closure", value: "Lace-up front with waist snaps and a belt, or an integrated elastic belt" },
        { label: "Fit", value: "Sized to fit snugly over the inserted pads, finishing below the knee" },
        { label: "Decoration and color", value: "Full-dye sublimation or a solid team color, with stripes and logos, Pantone matched to your game jersey" },
        { label: "Sizing", value: SIZING },
        { label: "Branding", value: "Team logo, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom American Football Pants" },
      pdpCustomizationSteps: customizeSteps([
        ["Construction", "Integrated pockets for a seven-pad set, or knee pockets only, pads fitted to spec or left out"],
        ["Closure", "Lace-up front with a belt, or an integrated elastic belt"],
        ["Print and artwork", "Full-dye sublimation or a solid team color, with stripes and logos"],
        ["Fabric", "Heavier Polyester/Spandex stretch shell, sourced or matched to your reference"],
        ["Color", "Pantone, CMYK, RGB or hex matched to your game jersey, confirmed on your digital proof"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the shell, the pad pockets and the closure on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Pad pockets sewn to hold the pad set, pads fitted to spec",
        "Shell sized to fit snugly over the inserted pads",
        "Pant color matched to your game jersey and approved on the sample before we cut",
        "The full roster produced in one run, same fabric lot, so every pair matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "practice-jersey",
      cardTitle: "Custom American Football Practice Jersey",
      cardSubline: "Lighter mesh, looser training cut",
      image: "",
      imageAlt: "Custom American Football Practice Jersey",
      href: `${PLP}/practice-jersey`,
      sku: "CAP-FBL-03",
      pdpHeading: "Custom American Football Practice Jersey Manufacturer",
      pdpMetaTitle: "Custom American Football Practice Jersey Manufacturer",
      pdpDescription:
        "American football practice jersey, custom and private label, a lighter open-mesh polyester jersey in a looser training cut that sits over the pads, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom American Football Practice Jersey"),
      pdpMetaDescription:
        "Custom American football practice jersey manufacturer: lighter open mesh, looser training cut over pads, solid or sublimated, MOQ 50, DDP to 20+ countries.",
      material: "Lighter open polyester mesh or breathable polyester knit",
      pdpFabricPills: ["Open polyester mesh", "Breathable polyester knit", "Recycled polyester"],
      pdpCustomizationPills: ["Solid or sublimated", "Position-group colors", "Printed numbers", "Custom labels"],
      faqs: [
        {
          q: "How is the American football practice jersey different from the game jersey?",
          a: "The American football practice jersey is a lighter, more open mesh in a looser training cut, while the game jersey is a pro-cut, contact-weight build made to match your uniform on game day.",
        },
        {
          q: "Can the American football practice jersey be made in different colors by position group?",
          a: "Yes. The American football practice jersey can be made in several solid colors across one roster order, so position groups or offense and defense wear different colors, all produced in the same run.",
        },
        {
          q: "Can the American football practice jersey be sublimated like the game jersey?",
          a: "Yes. The American football practice jersey can be a solid color with printed numbers or fully sublimated, and both are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom American Football Game Jersey", slug: "game-jersey", href: PLP },
        { label: "Custom American Football Pants", slug: "integrated-pad-pants", href: PLP },
        { label: "Custom American Football Base Layer", slug: "base-layer", href: PLP },
        { label: "Custom American Football Sideline Jacket", slug: "sideline-jacket", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "American football practice jersey, training cut (base type)" },
        { label: "Fabric", value: "Lighter open polyester mesh or breathable polyester knit" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Looser training cut that sits over the shoulder pads" },
        { label: "Sleeve", value: "Short sleeve cut to sit over the shoulder pads" },
        { label: "Length and hem", value: "Body length set to your spec, confirmed on your sample" },
        { label: "Reinforcement", value: "Bar-tacked at the stress points for daily training contact" },
        { label: "Decoration and color", value: "Solid color, full-dye sublimation or printed numbers, Pantone matched" },
        { label: "Sizing", value: SIZING },
        { label: "Branding", value: "Team crest, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom American Football Practice Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Color", "Solid team colors, or separate colors by position group, Pantone matched"],
        ["Print and artwork", "Full-dye sublimation where you want a full design"],
        ["Numbers", "Printed or sublimated numbers, placed to your spec"],
        ["Fit", "Looser training cut over pads, to your spec"],
        ["Fabric", "Lighter open polyester mesh, sourced or matched to your reference"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fit over your pads, the mesh and the color on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Training cut checked over the pads on your sample",
        "Stress points bar-tacked for daily contact",
        "Colors held across the roster, including position-group colors",
        "The full roster produced in one run, same fabric lot, so every jersey matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "girdle",
      cardTitle: "Custom American Football Girdle",
      cardSubline: "Compression base with five-pad pockets",
      image: "",
      imageAlt: "Custom American Football Girdle",
      href: `${PLP}/girdle`,
      sku: "CAP-FBL-04",
    },
    {
      status: "draft",
      slug: "base-layer",
      cardTitle: "Custom American Football Base Layer",
      cardSubline: "Close-fit layer under the pads",
      image: "",
      imageAlt: "Custom American Football Base Layer",
      href: `${PLP}/base-layer`,
      sku: "CAP-FBL-05",
    },
    {
      status: "draft",
      slug: "sideline-jacket",
      cardTitle: "Custom American Football Sideline Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom American Football Sideline Jacket",
      href: `${PLP}/sideline-jacket`,
      sku: "CAP-FBL-06",
    },
  ],
  relatedLinks: [
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
    { label: "Soccer", href: "/capriowear/teamwear/soccer" },
    { label: "Ice Hockey", href: "/capriowear/teamwear/ice-hockey" },
    { label: "Baseball", href: "/capriowear/teamwear/baseball" },
    { label: "Rash Guards & Fight Wear", href: "/capriowear/teamwear/fight-wear" },
  ],
};
