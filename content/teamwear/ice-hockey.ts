// content/teamwear/ice-hockey.ts
// Eighth Teamwear category, same `Category` shape as every prior Teamwear
// category (content/teamwear/*.ts) and every Activewear category
// (content/activewear/types.ts) -- a pure content/data drop: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts.
//
// PDP publish state (owner spec): every style ships "draft". Zero published
// styles at launch means the PLP stays live/indexed, every card renders
// non-clickable, no PDP routes generate, nothing is in the sitemap, and
// CollectionPage/ItemList is omitted from the PLP entirely
// (app/teamwear/[sport]/page.tsx already conditions that block on
// `publishedStyleCards.length > 0`, no page code change needed here).
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
// every category follows. GSM figures (roughly 215 to 240) are reference
// points tied to sample confirmation, not hardened claims.
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

export const iceHockey: Category = {
  slug: "ice-hockey",
  group: "Teamwear",
  menuLabel: "Ice Hockey",
  manufacturerNoun: "Ice Hockey Uniform",
  productNounPlural: "hockey uniforms and jerseys",
  entityExampleStyles: "game jerseys, practice jerseys, goalie jerseys, and base layers",
  entityFabrics: "durable polyester air-knit and mesh",
  h1: "Custom Ice Hockey Jersey Manufacturer",
  metaTitle: "Custom Ice Hockey Jersey Manufacturer",
  metaDescription:
    "Custom ice hockey jersey manufacturer. Air-knit jerseys, fight strap, goalie cut, sublimated over pads. Kits and uniforms, low MOQ. Capriowear.",
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
      performance: "Heavier, densest, longest-lasting",
    },
    {
      fabric: "Open mesh polyester",
      bestFor: "Practice jerseys",
      performance: "Lighter, high airflow, wash-durable",
    },
    {
      fabric: "Poly-spandex knit",
      bestFor: "Base layers under the kit",
      performance: "Close fit, moisture-wicking",
    },
  ],
  fabricNote: [
    { text: "Polyester-based for full-color sublimation. Air-knit runs lighter for breathability and pro-weight heavier for durability, " },
    { text: "roughly 215 to 240 GSM", bold: true },
    { text: ", with final weight confirmed on your sample. Recycled polyester available. Swatches before every bulk run." },
  ],
  fabricPills: ["Air-knit", "Pro-weight", "Open mesh", "Poly-spandex"],
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
    "Reinforced elbows and shoulders, double-needle stitched at the stress seams",
    "Fight strap sewn in where your league requires or wants it",
    "Names and numbers sublimated in, or tackle twill sewn on, both built to last",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Durable polyester air-knit and pro-weight jersey knits, lighter practice mesh, base-layer knits",
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
  faqs: [
    {
      q: "What is your MOQ for custom hockey kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is a fight strap, and can it be built in?",
      a: "A fight strap is a fabric loop sewn inside the back of the jersey that anchors it to the pants so it cannot be pulled off. It is required in the NHL and optional in most other leagues, so we sew it in or leave it out to match your league.",
    },
    {
      q: "What is the difference between air-knit and pro-weight jerseys?",
      a: "Air-knit is the lighter, more breathable game cut; pro-weight is heavier for maximum durability. They run roughly 215 to 240 GSM, confirmed on your sample, and both take full sublimation and tackle twill.",
    },
    {
      q: "Is a sublimated jersey durable enough for contact?",
      a: "Yes. The design is dyed into the fiber itself, not printed on top, so it will not crack, peel or fade under contact, and reinforced elbows and shoulders with double-needle stitching hold up at the stress points a hockey jersey takes the most.",
    },
    {
      q: "Can tackle twill and sublimation be combined on the same jersey?",
      a: "Both are available on the same base fabric. Sublimation dyes the whole design into the fabric so nothing cracks or peels; tackle twill is the classic sewn-on look. You pick the look, the build stays the same.",
    },
    {
      q: "What is the difference between a goalie cut and a player cut?",
      a: "The game jersey is cut roomy to move over shoulder and elbow pads. The goalie jersey is a distinct, larger pattern block, not a scaled-up player jersey, with a wider body for a chest protector and roomier sleeves, on its own sizing scale.",
    },
    {
      q: "What numbering and patch rules apply?",
      a: "They vary by league. Number size, the name bar and captain patches differ across the NHL, USA Hockey, IIHF and junior leagues. Tell us your league and we build the numbering and patches to its current rules, confirmed on your proof.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days; bulk depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // All 5 styles ship "draft" and are card-only for now: no PDP entry, so no
  // route, and each card renders as a non-link. The two legacy draft PDPs
  // (unaudited copy) were removed on 2026-09-26 when the Teamwear draft-PDP
  // rule became the default; this sport's rebuild adds real PDP content per
  // style, and each card links as soon as its PDP entry exists.
  styleCards: [
    {
      status: "draft",
      slug: "game-jersey",
      cardTitle: "Custom Ice Hockey Game Jersey",
      cardSubline: "Air-knit or pro-weight, fight strap, reinforced elbows",
      image: "",
      imageAlt: "Custom ice hockey game jersey, air-knit or pro-weight, fight strap, reinforced elbows",
      href: "/capriowear/teamwear/ice-hockey/game-jersey",
      sku: "CAP-HKY-01",
    },
    {
      status: "draft",
      slug: "goalie-jersey",
      cardTitle: "Custom Goalie Jersey",
      cardSubline: "Distinct oversized goalie-cut pattern",
      image: "",
      imageAlt: "Custom goalie jersey, distinct oversized goalie-cut pattern",
      href: "/capriowear/teamwear/ice-hockey/goalie-jersey",
      sku: "CAP-HKY-02",
    },
    {
      status: "draft",
      slug: "practice-jersey",
      cardTitle: "Custom Ice Hockey Practice Jersey",
      cardSubline: "Lighter mesh, everyday training",
      image: "",
      imageAlt: "Custom ice hockey practice jersey, lighter mesh, everyday training",
      href: "/capriowear/teamwear/ice-hockey/practice-jersey",
    },
    {
      status: "draft",
      slug: "base-layer",
      cardTitle: "Custom Ice Hockey Base Layer",
      cardSubline: "Close-fit under-kit layer",
      image: "",
      imageAlt: "Custom ice hockey base layer, close-fit under-kit layer",
      href: "/capriowear/teamwear/ice-hockey/base-layer",
    },
    {
      status: "draft",
      slug: "team-jacket",
      cardTitle: "Custom Ice Hockey Team Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom ice hockey team jacket, zip warm-up, tricot or fleece",
      href: "/capriowear/teamwear/ice-hockey/team-jacket",
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, Teamwear sports only,
  // closest sports first.
  relatedLinks: [
    { label: "Football", href: "/capriowear/teamwear/football" },
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
    { label: "Basketball", href: "/capriowear/teamwear/basketball" },
    { label: "Baseball", href: "/capriowear/teamwear/baseball" },
    { label: "Rash Guards & Fight Wear", href: "/capriowear/teamwear/fight-wear" },
  ],
};
