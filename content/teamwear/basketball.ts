// content/teamwear/basketball.ts
// Second Teamwear category, same `Category` shape as Cricket
// (content/teamwear/cricket.ts) and every Activewear category
// (content/activewear/types.ts) -- a pure content/data drop: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts. `group: "Teamwear"` is the
// only thing that marks this as a Teamwear category rather than an
// Activewear one.
//
// PDP publish state (owner spec, 2026-09-05): every style ships "draft".
// Zero published styles at launch means -- same as Cricket today -- the PLP
// stays live/indexed, every card renders non-clickable, no PDP routes
// generate, nothing is in the sitemap, and CollectionPage/ItemList is
// omitted from the PLP entirely (app/teamwear/[sport]/page.tsx already
// conditions that block on `publishedStyleCards.length > 0`, no page code
// change needed here). Flip a style to "published" per style, heroes first,
// once the team confirms it and it is sampled.
//
// Cut-and-sew scope (owner standing rule, 2026-09-05, set on Cricket) --
// socks and arm sleeves are knitted/circular-knit goods, typically sourced,
// not cut-and-sew, so neither is a style card here. Every card below is a
// genuinely cut-and-sew basketball piece.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape Cricket
// introduced -- no component or type change needed for this category.
//
// No basketball GSM number is ever stated (owner spec) -- every
// fabric-weight reference is worded as "tuned to your program/confirmed on
// your sample," never a made-up figure.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows.
import type { Category } from "../activewear/types";

export const basketball: Category = {
  slug: "basketball",
  group: "Teamwear",
  menuLabel: "Basketball",
  manufacturerNoun: "Basketball Uniform",
  productNounPlural: "basketball uniforms and kits",
  entityExampleStyles: "game jerseys, reversible practice jerseys, shorts, and warm-ups",
  entityFabrics: "polyester micro-mesh and interlock knits",
  h1: "Custom Basketball Uniform Manufacturer",
  metaTitle: "Custom Basketball Uniform Manufacturer",
  metaDescription:
    "Custom basketball uniform manufacturer, private label. Sublimated game and reversible practice jerseys, shorts and warm-ups, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  // Trimmed to 4 rows (owner spec, 2026-09-06, "leaner for mobile and a
  // buyer skim") -- was 7. PDP-level fabric detail (specifications, chips)
  // is unchanged; only this PLP-level table is shorter.
  fabricOptions: [
    {
      fabric: "Polyester micro-mesh or microfiber",
      bestFor: "Game jerseys",
      performance: "Lightweight, breathable, prints cleanly",
    },
    {
      fabric: "Polyester interlock or pique",
      bestFor: "Shorts and structured pieces",
      performance: "Durable, holds shape",
    },
    {
      fabric: "Two-layer reversible mesh",
      bestFor: "Reversible practice jerseys",
      performance: "Two colorways in one garment",
    },
    {
      fabric: "Tricot or fleece",
      bestFor: "Shooting shirts and warm-ups",
      performance: "Warm-up layers",
    },
  ],
  // Split into a segment run (owner spec, 2026-09-06: highlight one small,
  // important phrase, semibold, not the whole note) -- was one plain
  // segment.
  fabricNote: [
    { text: "Polyester-based for full-color sublimation. Game kit runs light and breathable; reversibles are two layers so they weigh more; weight is tuned to your program and " },
    { text: "confirmed on your sample", bold: true },
    { text: ". Poly-spandex trims and recycled polyester available. Swatches before every bulk run." },
  ],
  fabricPills: ["Micro-mesh", "Microfiber", "Interlock", "Two-layer reversible mesh", "Poly-spandex panels", "Tricot/fleece"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    // Trimmed to 4 rows (owner spec, 2026-09-06) -- was 5.
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Graphics, fades, names, numbers, sponsor logos",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn numbers and lettering",
        notes: "Raised, classic look, a premium option",
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
    // Segment array, not a plain string (owner spec, 2026-09-06: highlight
    // one small, important phrase, semibold, not the whole sentence).
    note: [
      { text: "Methods combine on one kit: a sublimated body with fade graphics, sublimated numbers, and an embroidered crest is " },
      { text: "a common premium build", bold: true },
      { text: "." },
    ],
  },
  qualityHeading: "The color you approve, on every kit",
  qualitySubline:
    "We confirm the color, the print, the numbering and the fit on your digital proof and your sample before the full roster is produced.",
  // Trimmed to 4 bullets (owner spec, 2026-09-06) -- was 6.
  qualityPoints: [
    "Digital proof and Pantone match approved before we cut",
    "Names and numbers sublimated into the fiber, they will not crack, peel or fade",
    "Reversible jerseys, each side its own colorway, name and number, checked to match",
    "The full roster produced in one run and inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  // Trimmed to 4 bullets (owner spec, 2026-09-06) -- was 6.
  coverageItems: [
    {
      title: "Fabric",
      body: "Polyester micro-mesh and interlock, poly-spandex trims, tricot or fleece warm-ups",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, fades and gradients, names and numbers in the print, Pantone matching, home and away",
    },
    {
      title: "Decoration",
      body: "Tackle twill, sublimation twill patches, embroidered crests",
    },
    {
      title: "Finishing",
      body: "Your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Trimmed to 7 questions (owner spec, 2026-09-06, "leaner for mobile and
  // a buyer skim") -- was 15. Plus the auto-built entity question
  // (categoryEntityFaq(), from entityExampleStyles above, unchanged), 8
  // total, matching the owner's own numbered list exactly.
  faqs: [
    {
      q: "What is your MOQ for custom basketball kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Can a reversible practice jersey have a different colorway on each side?",
      a: "As two full jersey layers, each with its own colorway, name and number, sewn together as one garment you can wear either side out. Each side is sublimated as its own panel before the two are joined. Being two layers, it weighs a little more and breathes a little less than a single-layer jersey, the honest trade-off for two kits in one.",
    },
    {
      q: "How are names and numbers applied?",
      a: "They are built into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Tackle twill and sublimation twill are available for a raised look.",
    },
    {
      q: "What numbers are legal under NFHS and NCAA rules?",
      a: "US high school and college rules (NFHS and NCAA) allow only digits 0 to 5, so 6, 7, 8 and 9 are not legal there, and a team cannot use both 0 and 00. Other bodies such as FIBA differ. Tell us your competition and we set the numbering, size and placement to its rules and confirm it on your proof.",
    },
    {
      q: "Is the game jersey a different weight than the practice jersey?",
      a: "Yes. Lightweight micro-mesh and microfiber build the game jersey, a two-layer mesh builds the heavier reversible practice jersey, and interlock or pique covers shorts, with a recycled option. Weight is tuned to your program and confirmed on the sample.",
    },
    {
      q: "Can you match socks and arm sleeves to the kit?",
      a: "Socks and arm sleeves are knitted, sourced goods rather than cut-and-sew, so they aren't a style on this page, but we can coordinate their colors to match your jersey and shorts order.",
    },
    {
      q: "Can you match our team colors and produce home and away kits?",
      a: "Yes. Send Pantone, CMYK, RGB or hex values and we match production dye to them, and both colorways are planned into one order so they match.",
    },
    {
      q: "How long do samples and bulk take, and how do I start?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days; bulk depends on quantity and customization, confirmed on your quote. To start, send your tech pack, sketch or a reference kit by email or WhatsApp and we reply within 24 hours.",
    },
  ],
  ctaReferenceNoun: "kit",
  // All 7 styles ship "draft" (owner spec, 2026-09-05): zero published at
  // launch, so no PDP routes generate, nothing enters the sitemap, and
  // ItemList/CollectionPage is omitted from the PLP entirely (see
  // app/teamwear/[sport]/page.tsx's own `publishedStyleCards` gate) -- same
  // pattern Cricket ships with today. Full PDP content is kept for the two
  // hero styles (Game Jersey, Reversible Practice Jersey) so either can flip
  // to "published" on its own once confirmed and sampled.
  styleCards: [
    {
      status: "draft",
      slug: "game-jersey",
      cardTitle: "Custom Basketball Game Jersey",
      cardSubline: "Sleeveless sublimated, crew or V-neck",
      image: "",
      imageAlt: "Custom basketball game jersey, sleeveless sublimated, crew or V-neck",
      href: "/teamwear/basketball/game-jersey",
      pdpTitle: "Game Jersey",
      sku: "CAP-BKB-01",
      pdpHeading: "Custom Basketball Jersey Manufacturer",
      pdpDescription:
        "Sublimated basketball game jersey, custom and private label, sleeveless with a wide armhole and a crew or V-neck, names and numbers built into the print, in a lightweight polyester micro-mesh, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Basketball game jersey, front view" },
        { alt: "Basketball game jersey, back view with name and number" },
        { alt: "Basketball game jersey, side profile" },
        { alt: "Basketball game jersey, armhole and neckline detail" },
        { alt: "Basketball game jersey, sponsor logo placement" },
        { alt: "Basketball game jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Basketball Jersey Manufacturer",
      pdpMetaDescription:
        "Custom basketball jersey manufacturer, full-dye sublimated, sleeveless crew or V-neck, team colors and numbers, youth and adult sizing, low MOQ. DDP worldwide.",
      material: "Lightweight polyester micro-mesh or microfiber, poly-spandex trims",
      faqs: [
        {
          q: "What neckline and armhole options are there?",
          a: "Crew is standard, V-neck is optional. The armhole is cut wide and deep for shooting range, with a bound or ribbed finish kept within your competition's trim rules.",
        },
        {
          q: "What is a drop-tail hem?",
          a: "The back panel runs longer than the front so the lower back stays covered in a defensive stance. It is an option, built to your spec.",
        },
        {
          q: "What jersey numbers can we use?",
          a: "Whatever your competition allows. US high school and college rules (NFHS, NCAA) permit only digits 0 to 5; other bodies differ. Tell us your league and we set the numbering to its rules.",
        },
      ],
      // Related-styles chips point up to the Basketball PLP while every
      // sibling style stays draft (owner spec) -- no dead links to a PDP
      // that doesn't exist yet.
      relatedStyleTags: [
        { label: "Basketball Shorts", href: "/teamwear/basketball" },
        { label: "Reversible Practice Jersey", href: "/teamwear/basketball" },
        { label: "Shooting Shirt", href: "/teamwear/basketball" },
        { label: "Scrimmage Vest", href: "/teamwear/basketball" },
        { label: "See All", href: "/teamwear/basketball" },
      ],
      specifications: [
        { label: "Style", value: "Basketball game jersey, sleeveless (base type)" },
        { label: "Fabric", value: "Lightweight polyester micro-mesh or microfiber body, poly-spandex trims" },
        {
          label: "Weight",
          value: "Tuned to your program, confirmed on your sample; the lighter, breathable end of our sublimation range",
        },
        { label: "Neckline", value: "Crew standard, V-neck optional" },
        {
          label: "Armhole",
          value: "Wide, deep cut for shooting range; bound or ribbed finish, kept within your competition's trim rules",
        },
        {
          label: "Hem",
          value: "Drop-tail option, back panel runs longer than the front for coverage in a defensive stance",
        },
        {
          label: "Decoration",
          value: "Full-dye sublimation, names, numbers and sponsor logos in the print; tackle twill or sublimation twill optional",
        },
        { label: "Color", value: "Full sublimation color range including fades and gradients, Pantone matched, home and away colorways" },
        { label: "Fit", value: "Team cut or fitted, graded XS to 5XL, men's, women's and youth blocks" },
        {
          label: "Construction",
          value: "Flatlock and overlock seams, mesh side panels optional and kept within competition width rules",
        },
        { label: "Branding", value: "Team logo, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Basketball game jersey, construction detail" },
    },
    {
      status: "draft",
      slug: "shorts",
      cardTitle: "Custom Basketball Shorts",
      cardSubline: "Longer inseam, mesh side panels, drawcord waist",
      image: "",
      imageAlt: "Custom basketball shorts, longer inseam, mesh side panels",
      href: "/teamwear/basketball/shorts",
    },
    {
      status: "draft",
      slug: "reversible-practice-jersey",
      cardTitle: "Custom Reversible Practice Jersey",
      cardSubline: "Two layers, a colorway on each side",
      image: "",
      imageAlt: "Custom reversible basketball practice jersey, two layers, a colorway on each side",
      href: "/teamwear/basketball/reversible-practice-jersey",
      pdpTitle: "Reversible Practice Jersey",
      sku: "CAP-BKB-02",
      pdpHeading: "Custom Reversible Basketball Jersey Manufacturer",
      pdpDescription:
        "Reversible basketball practice jersey, custom and private label, built as two sublimated mesh layers joined as one garment, with a full colorway, name and number on each side, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Reversible basketball practice jersey, side one" },
        { alt: "Reversible basketball practice jersey, side two" },
        { alt: "Reversible basketball practice jersey, join seam detail" },
        { alt: "Reversible basketball practice jersey, name and number detail" },
        { alt: "Reversible basketball practice jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Reversible Basketball Jersey",
      pdpMetaDescription:
        "Custom reversible basketball jersey manufacturer. Two sublimated layers, a colorway, name and number on each side, low MOQ, full customization. DDP worldwide.",
      material: "Two full layers of lightweight polyester mesh or microfiber, joined as one garment",
      faqs: [
        {
          q: "How is a reversible jersey built?",
          a: "As two full mesh layers, each with its own complete colorway, name and number, sewn together as one garment you can wear either side out. Each side is sublimated as its own panel first, then the two are joined.",
        },
        {
          q: "Does a reversible jersey weigh more or breathe less than a normal jersey?",
          a: "Yes, a little, because it is two layers instead of one. That is the honest trade-off for getting two full kits in a single garment. We confirm the hand and weight on your sample.",
        },
        {
          q: "Can each side have a different color, name and number?",
          a: "Yes. Each side is its own print file, so each face can carry a fully independent colorway, name and number.",
        },
      ],
      relatedStyleTags: [
        { label: "Game Jersey", href: "/teamwear/basketball" },
        { label: "Basketball Shorts", href: "/teamwear/basketball" },
        { label: "Scrimmage Vest", href: "/teamwear/basketball" },
        { label: "Shooting Shirt", href: "/teamwear/basketball" },
        { label: "See All", href: "/teamwear/basketball" },
      ],
      specifications: [
        { label: "Style", value: "Reversible basketball practice jersey, sleeveless (base type)" },
        { label: "Fabric", value: "Two full layers of lightweight polyester mesh or microfiber, joined as one garment" },
        {
          label: "Weight",
          value:
            "Two layers, so heavier and less breathable than a single-layer game jersey, the trade-off for two kits in one; exact weight tuned and confirmed on your sample",
        },
        {
          label: "Construction",
          value: "Each side sublimated as its own panel, then the two layers are joined as one reversible garment; the exact join is confirmed on your sample",
        },
        { label: "Neckline", value: "Crew standard, V-neck optional" },
        { label: "Decoration", value: "Full-dye sublimation, an independent colorway, name and number on each side" },
        { label: "Color", value: "Two colorways in one garment, both Pantone matched" },
        { label: "Fit", value: "Team cut, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team logo, sponsor logos, manufacturer mark, on either or both sides" },
      ],
      specificationsImage: { alt: "Reversible basketball practice jersey, construction detail" },
    },
    {
      status: "draft",
      slug: "shooting-shirt",
      cardTitle: "Custom Basketball Shooting Shirt",
      cardSubline: "Warm-up top on the fleece platform",
      image: "",
      imageAlt: "Custom basketball shooting shirt, warm-up top on the fleece platform",
      href: "/teamwear/basketball/shooting-shirt",
    },
    {
      status: "draft",
      slug: "scrimmage-vest",
      cardTitle: "Custom Basketball Scrimmage Vest",
      cardSubline: "Mesh training pinnie",
      image: "",
      imageAlt: "Custom basketball scrimmage vest, mesh training pinnie",
      href: "/teamwear/basketball/scrimmage-vest",
    },
    {
      status: "draft",
      slug: "warm-up-jacket",
      cardTitle: "Custom Basketball Warm-Up Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom basketball warm-up jacket, zip warm-up, tricot or fleece",
      href: "/teamwear/basketball/warm-up-jacket",
    },
    {
      status: "draft",
      slug: "warm-up-pants",
      cardTitle: "Custom Basketball Warm-Up Pants",
      cardSubline: "Straight or tapered, tricot or fleece",
      image: "",
      imageAlt: "Custom basketball warm-up pants, straight or tapered, tricot or fleece",
      href: "/teamwear/basketball/warm-up-pants",
    },
  ],
  // Only live pages (owner spec: "Never link an unbuilt PLP or an
  // unpublished PDP") -- no `/teamwear` index route exists yet (only the
  // dynamic `/teamwear/[sport]` family), so the Teamwear "parent" isn't a
  // real page to link; the live Cricket PLP and real Activewear PLPs are.
  // Add more sibling sport PLPs here as they publish.
  relatedLinks: [
    { label: "Cricket", href: "/teamwear/cricket" },
    { label: "Tracksuits", href: "/activewear/tracksuits" },
    { label: "T-Shirts", href: "/activewear/t-shirts" },
  ],
};
