// content/teamwear/soccer.ts
// Sixth Teamwear category, same `Category` shape as Cricket/Basketball/Rugby/
// Baseball/Volleyball (content/teamwear/*.ts) and every Activewear category
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
// knitted goods, typically sourced, so no sock card here. The Goalkeeper
// Kit stays: the jersey and shorts are cut-and-sew, the foam padding is a
// sourced insert assembled in-house during the same run (owner spec).
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
// every category follows. GSM figures worded as "roughly"/"confirmed on your
// sample" reference points, never hardened claims.
import type { Category } from "../activewear/types";

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
    "Custom soccer uniform manufacturer. Sublimated jerseys with names and numbers, goalkeeper kits, home and away kits, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
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
      fabric: "Poly-spandex",
      bestFor: "Fitted panels and stretch zones",
      performance: "Four-way stretch",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainability-positioned programs",
      performance: "Same print and performance as virgin polyester",
    },
  ],
  fabricNote: [
    { text: "Polyester-based for full-color sublimation. Match jerseys sit at the lightest end of our range, roughly 135 to 165 GSM, and shorts around 180 GSM interlock, with final weights tuned to your program and " },
    { text: "confirmed on your sample", bold: true },
    { text: ". Swatches before every bulk run." },
  ],
  fabricPills: ["Lightweight microfiber", "Mesh", "Interlock", "Poly-spandex", "Recycled option"],
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
        bestFor: "Roster names and numbers over a printed design",
        notes: "Applied per player without re-printing the whole design",
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
    "Names and numbers sublimated into the fiber, they will not crack, peel or fade",
    "Numbering, names and badge zones set to your competition's rules",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Lightweight polyester microfiber and mesh jerseys, polyester interlock shorts, poly-spandex where stretch is needed",
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
  faqs: [
    {
      q: "What is your MOQ for a sublimated soccer kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "How are home, away and third colorways made in one order?",
      a: "Yes. A home, away and third kit program is produced in one coordinated roster order and run, so the kits match and share the same sizing and roster data.",
    },
    {
      q: "Is the goalkeeper kit made in-house, in the same order?",
      a: "The goalkeeper jersey and shorts are cut-and-sew in-house. The padding is a sourced foam, cut and inserted during the same production run, so the garment is made here and the padding is inserted to spec. The GK kit is produced in a color that stands apart from both teams and the officials, as the rules require.",
    },
    {
      q: "What is the difference between a player-issue and a replica fit?",
      a: "A player-issue athletic fit runs closer with engineered ventilation panels; a replica stadium fit runs a little looser on a slightly heavier knit that holds up to frequent washing. We build either to your spec.",
    },
    {
      q: "How are player names and numbers built into the print?",
      a: "They are built into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. A contrasting number zone keeps numbers legible on a busy design.",
    },
    {
      q: "What badge, sponsor and numbering rules apply?",
      a: "They vary by competition. FIFA and the leagues set their own number sizes, name heights, reserved sleeve badge zones and color limits. Tell us your competition and we lay out the numbering, names and badges to its current rules, confirmed on your proof.",
    },
    {
      q: "How long do samples and bulk take, and how do I start?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days; bulk depends on quantity and customization, confirmed on your quote. To start, send your tech pack, sketch or a reference kit by email or WhatsApp and we reply within 24 hours.",
    },
  ],
  ctaReferenceNoun: "kit",
  // All 7 styles ship "draft" (owner spec): zero published at launch, so no
  // PDP routes generate, nothing enters the sitemap, and ItemList/
  // CollectionPage is omitted from the PLP entirely (see
  // app/teamwear/[sport]/page.tsx's own `publishedStyleCards` gate) -- same
  // pattern every prior Teamwear category ships with today. Full PDP content
  // is kept for the two hero styles (Match Jersey, Soccer Shorts) so either
  // can flip to "published" on its own once confirmed and sampled.
  styleCards: [
    {
      status: "draft",
      slug: "match-jersey",
      cardTitle: "Custom Soccer Match Jersey",
      cardSubline: "Lightweight sublimated, player-issue or replica fit",
      image: "",
      imageAlt: "Custom soccer match jersey, lightweight sublimated, player-issue or replica fit",
      href: "/teamwear/soccer/match-jersey",
      pdpTitle: "Match Jersey",
      sku: "CAP-SOC-01",
      pdpHeading: "Custom Soccer Jersey Manufacturer",
      pdpDescription:
        "Soccer match jersey, custom and private label, a lightweight full-dye sublimated jersey in polyester microfiber or mesh, in a player-issue athletic fit or a replica stadium fit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Soccer match jersey, front view" },
        { alt: "Soccer match jersey, back view with name and number" },
        { alt: "Soccer match jersey, ventilation panel detail" },
        { alt: "Soccer match jersey, crest and sponsor placement" },
        { alt: "Soccer match jersey, sleeve detail" },
        { alt: "Soccer match jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Soccer Jersey Manufacturer",
      pdpMetaDescription:
        "Custom soccer jersey manufacturer, lightweight sublimated, player names and numbers in the print, player-issue or replica fit, low MOQ. DDP worldwide.",
      material: "Lightweight polyester microfiber or mesh",
      faqs: [
        {
          q: "What is the difference between a player-issue and a replica jersey?",
          a: "A player-issue fit runs closer, with engineered or bonded ventilation panels and a slightly higher hem; a replica fit runs a little looser on a slightly heavier knit that holds up to frequent washing. We build either to your spec.",
        },
        {
          q: "Can you produce home, away and third kits together?",
          a: "Yes. All three are planned into one program and share the same print files, sizing and roster, so they match as a set.",
        },
        {
          q: "How do you keep numbers legible on a busy design?",
          a: "We can set the number in a contrasting number zone, so it stays clearly readable even over a full-color sublimated jersey, in line with competition legibility rules.",
        },
      ],
      relatedStyleTags: [
        { label: "Soccer Shorts", href: "/teamwear/soccer/shorts" },
        { label: "Goalkeeper Kit", href: "/teamwear/soccer" },
        { label: "Training Top", href: "/teamwear/soccer" },
        { label: "See All", href: "/teamwear/soccer" },
      ],
      specifications: [
        { label: "Style", value: "Soccer match jersey (base type)" },
        { label: "Fabric", value: "Lightweight polyester microfiber or mesh" },
        { label: "Weight", value: "The lightest end of our range, roughly 135 to 165 GSM, confirmed on your sample" },
        { label: "Fit", value: "Player-issue athletic fit or replica stadium fit" },
        { label: "Ventilation", value: "Engineered or bonded ventilation panels on the player-issue fit; mesh panels on the replica fit" },
        { label: "Sleeve", value: "Short or long; set-in or raglan, your choice" },
        { label: "Decoration", value: "Full-dye sublimation, names and numbers in the print; a contrasting number zone for legibility" },
        { label: "Color", value: "Full sublimation color range, Pantone matched; home, away and third colorways" },
        { label: "Badge zones", value: "Crest, sponsor and manufacturer marks laid out to your competition's rules" },
        { label: "Fit and sizing", value: "Graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Club crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Soccer match jersey, construction detail" },
    },
    {
      status: "draft",
      slug: "shorts",
      cardTitle: "Custom Soccer Shorts",
      cardSubline: "Sublimated interlock, mesh ventilation, drawcord waist",
      image: "",
      imageAlt: "Custom soccer shorts, sublimated interlock, mesh ventilation, drawcord waist",
      href: "/teamwear/soccer/shorts",
      pdpTitle: "Soccer Shorts",
      sku: "CAP-SOC-02",
      pdpHeading: "Custom Soccer Shorts Manufacturer",
      pdpDescription:
        "Soccer shorts, custom and private label, a sublimated polyester interlock short with mesh side or inner ventilation and an elastic drawcord waist, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Soccer shorts, front view" },
        { alt: "Soccer shorts, back view" },
        { alt: "Soccer shorts, side mesh panel detail" },
        { alt: "Soccer shorts, waistband and drawcord detail" },
        { alt: "Soccer shorts, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Soccer Shorts Manufacturer",
      pdpMetaDescription:
        "Custom soccer shorts manufacturer, sublimated polyester interlock, matched to your home and away kit, mesh ventilation, low MOQ. DDP worldwide.",
      material: "Polyester interlock with mesh ventilation panels",
      faqs: [
        {
          q: "What inseam length are soccer shorts?",
          a: "They sit above the knee, and we cut the inseam to your spec rather than lock you to one length, since it varies by preference and player height.",
        },
        {
          q: "Do the shorts include an inner brief?",
          a: "That is your choice. We build them with or without an inner brief or compression liner to your spec.",
        },
        {
          q: "Will the shorts match the jersey program?",
          a: "Yes. Shorts are produced in the same run and color-matched to the home, away and third jerseys so the kit reads as a set.",
        },
      ],
      relatedStyleTags: [
        { label: "Soccer Match Jersey", href: "/teamwear/soccer/match-jersey" },
        { label: "Goalkeeper Kit", href: "/teamwear/soccer" },
        { label: "Training Top", href: "/teamwear/soccer" },
        { label: "See All", href: "/teamwear/soccer" },
      ],
      specifications: [
        { label: "Style", value: "Soccer shorts (base type)" },
        { label: "Fabric", value: "Polyester interlock, around 180 GSM, confirmed on your sample" },
        { label: "Ventilation", value: "Mesh side panels or inner lining" },
        { label: "Length", value: "Above the knee, inseam to your spec" },
        { label: "Waistband", value: "Elastic with a flat internal drawcord" },
        { label: "Liner", value: "Optional inner brief, with or without, to your spec" },
        { label: "Decoration", value: "Full-dye sublimation, team colors and side detail" },
        { label: "Color", value: "Full sublimation color range, Pantone matched; matched to the jersey program" },
        { label: "Sizing", value: "Graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team logo, sponsor marks, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Soccer shorts, construction detail" },
    },
    {
      status: "draft",
      slug: "goalkeeper-kit",
      cardTitle: "Custom Goalkeeper Kit",
      cardSubline: "Long-sleeve padded jersey and shorts, distinct color",
      image: "",
      imageAlt: "Custom goalkeeper kit, long-sleeve padded jersey and shorts, distinct color",
      href: "/teamwear/soccer/goalkeeper-kit",
    },
    {
      status: "draft",
      slug: "training-top",
      cardTitle: "Custom Soccer Training Top",
      cardSubline: "Lighter training and warm-up jersey",
      image: "",
      imageAlt: "Custom soccer training top, lighter training and warm-up jersey",
      href: "/teamwear/soccer/training-top",
    },
    {
      status: "draft",
      slug: "presentation-jacket",
      cardTitle: "Custom Soccer Presentation Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom soccer presentation jacket, zip warm-up, tricot or fleece",
      href: "/teamwear/soccer/presentation-jacket",
    },
    {
      status: "draft",
      slug: "training-bibs",
      cardTitle: "Custom Training Bibs",
      cardSubline: "Mesh scrimmage pinnies, numbered",
      image: "",
      imageAlt: "Custom training bibs, mesh scrimmage pinnies, numbered",
      href: "/teamwear/soccer/training-bibs",
    },
    {
      status: "draft",
      slug: "base-layer",
      cardTitle: "Custom Soccer Base Layer",
      cardSubline: "Close-fit under-kit layer",
      image: "",
      imageAlt: "Custom soccer base layer, close-fit under-kit layer",
      href: "/teamwear/soccer/base-layer",
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
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
    { label: "T-Shirts", href: "/activewear/t-shirts" },
  ],
};
