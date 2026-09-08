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
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
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
      q: "How long do samples and bulk take, and how do I start?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days; bulk depends on quantity and customization, confirmed on your quote. To start, send your tech pack, sketch or a reference kit by email or WhatsApp and we reply within 24 hours.",
    },
  ],
  ctaReferenceNoun: "kit",
  // All 5 styles ship "draft" (owner spec): zero published at launch, so no
  // PDP routes generate, nothing enters the sitemap, and ItemList/
  // CollectionPage is omitted from the PLP entirely (see
  // app/teamwear/[sport]/page.tsx's own `publishedStyleCards` gate) -- same
  // pattern every prior Teamwear category ships with today. Full PDP content
  // is kept for the two hero styles (Game Jersey, Goalie Jersey) so either
  // can flip to "published" on its own once confirmed and sampled.
  styleCards: [
    {
      status: "draft",
      slug: "game-jersey",
      cardTitle: "Custom Ice Hockey Game Jersey",
      cardSubline: "Air-knit or pro-weight, fight strap, reinforced elbows",
      image: "",
      imageAlt: "Custom ice hockey game jersey, air-knit or pro-weight, fight strap, reinforced elbows",
      href: "/teamwear/ice-hockey/game-jersey",
      pdpTitle: "Game Jersey",
      sku: "CAP-HKY-01",
      pdpHeading: "Custom Hockey Jersey Manufacturer",
      pdpDescription:
        "Ice hockey game jersey, custom and private label, a durable polyester air-knit or pro-weight jersey cut loose to fit over pads, with reinforced elbows and an optional fight strap, sublimated or tackle twill, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Ice hockey game jersey, front view" },
        { alt: "Ice hockey game jersey, back view with name and number" },
        { alt: "Ice hockey game jersey, fight strap detail" },
        { alt: "Ice hockey game jersey, reinforced elbow detail" },
        { alt: "Ice hockey game jersey, crest and sponsor placement" },
        { alt: "Ice hockey game jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Hockey Jersey Manufacturer",
      pdpMetaDescription:
        "Custom hockey jersey manufacturer, air-knit or pro-weight, sublimation or tackle twill, fight strap, reinforced elbows, low MOQ. DDP worldwide.",
      material: "Polyester air-knit or pro-weight",
      faqs: [
        {
          q: "What is a fight strap, and do we need one?",
          a: "It is a fabric loop sewn inside the back of the jersey that anchors it to the pants so it cannot be pulled off. It is required in the NHL and optional in most other leagues, so we build it in or leave it out to match yours.",
        },
        {
          q: "What is the difference between air-knit and pro-weight?",
          a: "Air-knit is the lighter, more breathable game cut; pro-weight is heavier for maximum durability. Both take sublimation and tackle twill, and we confirm the weight on your sample.",
        },
        {
          q: "Can we choose sublimation or tackle twill?",
          a: "Yes. Both are available on the same base fabric, so you choose the classic sewn look of tackle twill or the crack-proof full-color of sublimation without changing the jersey build.",
        },
      ],
      relatedStyleTags: [
        { label: "Goalie Jersey", href: "/teamwear/ice-hockey/goalie-jersey" },
        { label: "Practice Jersey", href: "/teamwear/ice-hockey" },
        { label: "Base Layer", href: "/teamwear/ice-hockey" },
        { label: "See All", href: "/teamwear/ice-hockey" },
      ],
      specifications: [
        { label: "Style", value: "Ice hockey game jersey (base type)" },
        { label: "Fabric", value: "Polyester air-knit (lighter, breathable) or pro-weight (heavier, most durable)" },
        { label: "Weight", value: "Roughly 215 to 240 GSM by tier, confirmed on your sample" },
        { label: "Fit", value: "Loose pad-over cut, roomy body and sleeves to move over shoulder and elbow pads; drop-tail hem" },
        { label: "Collar", value: "Crew or v-collar standard; lace-up collar as a heritage option at a premium" },
        { label: "Reinforcement", value: "Double-layer elbows, reinforced shoulders and stress seams" },
        { label: "Fight strap", value: "Optional, snap-button tie-down to the pants; sewn in where your league requires or wants it" },
        { label: "Decoration", value: "Full-dye sublimation or tackle twill on the same base fabric; names, numbers and crests" },
        { label: "Color", value: "Full sublimation color range, Pantone matched; home and away colorways" },
        { label: "Sizing", value: "Graded XS to 5XL, youth and adult as distinct pattern blocks" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Ice hockey game jersey, construction detail" },
    },
    {
      status: "draft",
      slug: "goalie-jersey",
      cardTitle: "Custom Goalie Jersey",
      cardSubline: "Distinct oversized goalie-cut pattern",
      image: "",
      imageAlt: "Custom goalie jersey, distinct oversized goalie-cut pattern",
      href: "/teamwear/ice-hockey/goalie-jersey",
      pdpTitle: "Goalie Jersey",
      sku: "CAP-HKY-02",
      pdpHeading: "Custom Goalie Jersey Manufacturer",
      pdpDescription:
        "Ice hockey goalie jersey, custom and private label, a distinct oversized goalie-cut pattern with a wider body for the chest protector and roomier sleeves, in a durable polyester air-knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Goalie jersey, front view" },
        { alt: "Goalie jersey, back view with name and number" },
        { alt: "Goalie jersey, wider body detail" },
        { alt: "Goalie jersey, sleeve fit detail" },
        { alt: "Goalie jersey, crest and sponsor placement" },
        { alt: "Goalie jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Goalie Jersey Manufacturer",
      pdpMetaDescription:
        "Custom hockey goalie jersey manufacturer, distinct oversized goalie-cut pattern, durable air-knit, sublimation or tackle twill, low MOQ. DDP worldwide.",
      material: "Durable polyester air-knit or pro-weight",
      faqs: [
        {
          q: "How is a goalie jersey different from a player jersey?",
          a: "It is a distinct, larger pattern block, not a scaled-up player jersey. The body is wider to clear a chest protector and the sleeves are roomier for bulkier arm equipment.",
        },
        {
          q: "How is a goalie jersey sized?",
          a: "On its own larger goalie sizing scale rather than the player chart, and we confirm the fit on your sample.",
        },
        {
          q: "Can the goalie jersey match the rest of the team kit?",
          a: "Yes. It is produced in the same run and decorated with the same sublimation or tackle twill design, so it reads as part of the set.",
        },
      ],
      relatedStyleTags: [
        { label: "Game Jersey", href: "/teamwear/ice-hockey/game-jersey" },
        { label: "Practice Jersey", href: "/teamwear/ice-hockey" },
        { label: "Base Layer", href: "/teamwear/ice-hockey" },
        { label: "See All", href: "/teamwear/ice-hockey" },
      ],
      specifications: [
        { label: "Style", value: "Ice hockey goalie jersey (base type)" },
        { label: "Fabric", value: "Durable polyester air-knit or pro-weight" },
        { label: "Weight", value: "Roughly 215 to 240 GSM by tier, confirmed on your sample" },
        { label: "Fit", value: "A distinct, larger goalie pattern block, not a scaled-up player jersey; wider body for a chest protector and roomier sleeves for arm equipment" },
        { label: "Sizing", value: "Its own larger goalie sizing scale, confirmed on your sample" },
        { label: "Reinforcement", value: "Double-layer elbows, reinforced shoulders and stress seams" },
        { label: "Decoration", value: "Full-dye sublimation or tackle twill on the same base fabric; names, numbers and crests" },
        { label: "Color", value: "Full sublimation color range, Pantone matched; matched to the team kit" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Goalie jersey, construction detail" },
    },
    {
      status: "draft",
      slug: "practice-jersey",
      cardTitle: "Custom Ice Hockey Practice Jersey",
      cardSubline: "Lighter mesh, everyday training",
      image: "",
      imageAlt: "Custom ice hockey practice jersey, lighter mesh, everyday training",
      href: "/teamwear/ice-hockey/practice-jersey",
    },
    {
      status: "draft",
      slug: "base-layer",
      cardTitle: "Custom Ice Hockey Base Layer",
      cardSubline: "Close-fit under-kit layer",
      image: "",
      imageAlt: "Custom ice hockey base layer, close-fit under-kit layer",
      href: "/teamwear/ice-hockey/base-layer",
    },
    {
      status: "draft",
      slug: "team-jacket",
      cardTitle: "Custom Ice Hockey Team Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom ice hockey team jacket, zip warm-up, tricot or fleece",
      href: "/teamwear/ice-hockey/team-jacket",
    },
  ],
  // Only live pages (owner spec: "Never link an unbuilt PLP or unpublished
  // PDP") -- the live sibling Teamwear PLPs and real Activewear PLPs.
  relatedLinks: [
    { label: "Cricket", href: "/teamwear/cricket" },
    { label: "Basketball", href: "/teamwear/basketball" },
    { label: "Rugby", href: "/teamwear/rugby" },
    { label: "Baseball", href: "/teamwear/baseball" },
    { label: "Volleyball", href: "/teamwear/volleyball" },
    { label: "Soccer", href: "/teamwear/soccer" },
    { label: "Football", href: "/teamwear/football" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
    { label: "Track Jackets & Zip-Ups", href: "/activewear/track-jackets" },
  ],
};
