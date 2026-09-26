// content/teamwear/football.ts
// Seventh Teamwear category (American football), same `Category` shape as
// every prior Teamwear category (content/teamwear/*.ts) and every Activewear
// category (content/activewear/types.ts) -- a pure content/data drop: no
// edits to app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/
// page.tsx, only this file plus one line in ./sports.ts.
//
// PDP publish state (owner spec): every style ships "draft". Zero published
// styles at launch means the PLP stays live/indexed, every card renders
// non-clickable, no PDP routes generate, nothing is in the sitemap, and
// CollectionPage/ItemList is omitted from the PLP entirely
// (app/teamwear/[sport]/page.tsx already conditions that block on
// `publishedStyleCards.length > 0`, no page code change needed here).
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- shoulder pads,
// helmets, the foam pad inserts, socks and gloves are molded protective gear
// or knitted goods, sourced, so none is a style card here. Game pants and
// the girdle stay: the shell and pockets are cut-and-sew, the foam pads are
// a sourced insert fitted during the same production run (owner spec).
//
// Uses `structuredBlock` (type "decoration"), the same field/shape every
// prior Teamwear category uses -- no component or type change needed here.
//
// No football jersey/pant GSM is ever stated as a hard number (owner spec --
// published football fabric weights vary widely) -- every fabric-weight
// reference is worded as "contact weight"/"heavier shell"/"confirmed on
// your sample," never a made-up figure.
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

export const football: Category = {
  slug: "football",
  group: "Teamwear",
  menuLabel: "Football",
  manufacturerNoun: "Football Uniform",
  productNounPlural: "football uniforms and kits",
  entityExampleStyles: "game jerseys, practice jerseys, integrated-pad pants, and girdles",
  entityFabrics: "contact-weight polyester and poly-spandex knits",
  h1: "Custom American Football Uniform Manufacturer",
  metaTitle: "Custom American Football Uniform Manufacturer",
  metaDescription:
    "Custom American football uniform manufacturer. Pro-cut jerseys over pads, integrated pad pocket pants, NFHS legal numbers, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Contact-weight polyester with spandex",
      bestFor: "Game jerseys",
      performance: "Durable, holds a close fit over pads",
    },
    {
      fabric: "Open mesh or breathable polyester",
      bestFor: "Practice jerseys",
      performance: "Lighter, high airflow, wash-durable",
    },
    {
      fabric: "Heavier poly-spandex shell",
      bestFor: "Pad-pocket pants and girdles",
      performance: "Tough, stretches over inserted pads",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainability-positioned programs",
      performance: "Same print and performance as virgin polyester",
    },
  ],
  fabricNote: [
    { text: "Polyester-based for full-color sublimation. Game jerseys run at a contact weight and pants at a heavier shell weight, with final weights tuned to your program and " },
    { text: "confirmed on your sample", bold: true },
    { text: ", since published football weights vary widely. Swatches before every bulk run." },
  ],
  fabricPills: ["Contact-weight polyester", "Open mesh", "Heavier poly-spandex shell", "Recycled option"],
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
  qualityHeading: "Built to fit over the pads",
  qualitySubline:
    "We confirm the fit over your pads, the print and the durability on your sample before the full roster is produced.",
  qualityPoints: [
    "Game jersey cut to fit over the shoulder pads, still fully sublimated",
    "Pants and girdle sewn with pad pockets, foam inserts fitted to spec",
    "Names and numbers sublimated into the fiber, they will not crack, peel or fade",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Contact-weight polyester and poly-spandex game knits, lighter practice mesh, heavier pad-pocket pant shell",
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
  faqs: [
    {
      q: "What is your MOQ for custom football kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Is the jersey sublimated and still tight over the shoulder pads?",
      a: "The game jersey is cut close in a pro-cut fit that sits over shoulder pads and gives a tackler less loose fabric to grab. That tight fit does not limit decoration, the jersey still takes full-dye sublimation across the whole design.",
    },
    {
      q: "Are pad pockets built into the pants?",
      a: "Yes. Game pants and the integrated girdle are sewn with built-in pockets for a seven-pad set, two thigh, two knee, two hip and one tailbone. We make the shell and the pockets; the foam pads themselves are a sourced insert fitted to spec.",
    },
    {
      q: "Are pads, helmets and socks made in-house?",
      a: "No. Shoulder pads, helmets, the foam pad inserts, socks and gloves are molded or knitted goods we source, not cut-and-sew. We make the jerseys, pants, girdle shell and base layers in-house and fit the sourced pads into them.",
    },
    {
      q: "How are names and numbers applied?",
      a: "They are built into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Tackle twill numbers and heat-applied badges are available where you want a raised or friction-free finish.",
    },
    {
      q: "What is the difference between NFHS and NCAA numbering rules?",
      a: "They vary by competition. NFHS and NCAA differ on number size and placement, and on jersey color, for example NFHS requires the visiting jersey to be white and the home jersey a contrasting dark. Tell us your league and we build to its current rules, confirmed on your proof.",
    },
    {
      q: "Is the girdle sold separately from the pants?",
      a: "Yes. The girdle is a separate compression base layer with its own built-in pad pockets, worn underneath the pants; a team can order the pants, the girdle, or both together in the same run.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days; bulk depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // All 6 styles ship "draft" and are card-only for now: no PDP entry, so no
  // route, and each card renders as a non-link. The two legacy draft PDPs
  // (unaudited copy) were removed on 2026-09-26 when the Teamwear draft-PDP
  // rule became the default; this sport's rebuild adds real PDP content per
  // style, and each card links as soon as its PDP entry exists.
  styleCards: [
    {
      status: "draft",
      slug: "game-jersey",
      cardTitle: "Custom Football Game Jersey",
      cardSubline: "Pro-cut fit over pads, fully sublimated",
      image: "",
      imageAlt: "Custom football game jersey, pro-cut fit over pads, fully sublimated",
      href: "/capriowear/teamwear/football/game-jersey",
      sku: "CAP-FBL-01",
    },
    {
      status: "draft",
      slug: "integrated-pad-pants",
      cardTitle: "Custom Football Pants",
      cardSubline: "Integrated pad pockets, heavier stretch shell",
      image: "",
      imageAlt: "Custom football pants, integrated pad pockets, heavier stretch shell",
      href: "/capriowear/teamwear/football/integrated-pad-pants",
      sku: "CAP-FBL-02",
    },
    {
      status: "draft",
      slug: "practice-jersey",
      cardTitle: "Custom Football Practice Jersey",
      cardSubline: "Lighter mesh, looser training cut",
      image: "",
      imageAlt: "Custom football practice jersey, lighter mesh, looser training cut",
      href: "/capriowear/teamwear/football/practice-jersey",
    },
    {
      status: "draft",
      slug: "girdle",
      cardTitle: "Custom Football Girdle",
      cardSubline: "Compression base with built-in pad pockets",
      image: "",
      imageAlt: "Custom football girdle, compression base with built-in pad pockets",
      href: "/capriowear/teamwear/football/girdle",
    },
    {
      status: "draft",
      slug: "base-layer",
      cardTitle: "Custom Football Base Layer",
      cardSubline: "Close-fit under-kit layer",
      image: "",
      imageAlt: "Custom football base layer, close-fit under-kit layer",
      href: "/capriowear/teamwear/football/base-layer",
    },
    {
      status: "draft",
      slug: "sideline-jacket",
      cardTitle: "Custom Football Sideline Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom football sideline jacket, zip warm-up, tricot or fleece",
      href: "/capriowear/teamwear/football/sideline-jacket",
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, Teamwear sports only,
  // closest sports first.
  relatedLinks: [
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
    { label: "Soccer", href: "/capriowear/teamwear/soccer" },
    { label: "Ice Hockey", href: "/capriowear/teamwear/ice-hockey" },
    { label: "Baseball", href: "/capriowear/teamwear/baseball" },
    { label: "Rash Guards & Fight Wear", href: "/capriowear/teamwear/fight-wear" },
  ],
};
