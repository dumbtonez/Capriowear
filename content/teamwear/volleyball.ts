// content/teamwear/volleyball.ts
// Fifth Teamwear category, same `Category` shape as Cricket/Basketball/
// Rugby/Baseball (content/teamwear/{cricket,basketball,rugby,baseball}.ts)
// and every Activewear category (content/activewear/types.ts) -- a pure
// content/data drop: no edits to app/teamwear/[sport]/page.tsx or
// app/teamwear/[sport]/[style]/page.tsx, only this file plus one line in
// ./sports.ts.
//
// PDP publish state (owner spec): every style ships "draft". Zero published
// styles at launch means the PLP stays live/indexed, every card renders
// non-clickable, no PDP routes generate, nothing is in the sitemap, and
// CollectionPage/ItemList is omitted from the PLP entirely
// (app/teamwear/[sport]/page.tsx already conditions that block on
// `publishedStyleCards.length > 0`, no page code change needed here). Flip a
// style to "published" per style, heroes first, once the team confirms it
// and it is sampled.
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- socks (knitted
// goods) and knee pads (molded foam) are typically sourced, not cut-and-sew,
// so neither is a style card here. Every card below is a genuinely
// cut-and-sew volleyball piece.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape Cricket
// introduced -- no component or type change needed for this category.
//
// No volleyball GSM or inseam number is ever stated (owner spec) -- every
// fabric-weight or fit reference is worded as "tuned/confirmed on your
// sample," never a made-up figure.
//
// Punctuation rule (owner spec, site-wide sweep): headings, eyebrows, labels
// and short fact/chip lines carry no trailing period; periods stay only on
// real sentences (leads, FAQ answers, descriptions, the fabric footnote, the
// Specifications subtitle, the final-CTA subline). Written period-clean from
// the start here, not swept after the fact.
//
// Highlight rule (owner spec, applied since Cricket/Basketball, standing for
// every sport since): the decoration structured block's own note and the
// main fabric table's own footnote each bold exactly one short, genuinely
// important phrase (`NoteSegment[]`, not a plain string) -- not the whole
// sentence. Written in from the start here, not swept after the fact.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows.
import type { Category } from "../activewear/types";

export const volleyball: Category = {
  slug: "volleyball",
  group: "Teamwear",
  menuLabel: "Volleyball",
  manufacturerNoun: "Volleyball Uniform",
  productNounPlural: "volleyball uniforms and kits",
  entityExampleStyles: "indoor jerseys, libero jerseys, fitted shorts, and warm-ups",
  entityFabrics: "polyester mesh and poly-spandex knits",
  h1: "Custom Volleyball Uniform Manufacturer",
  metaTitle: "Custom Volleyball Uniform Manufacturer",
  metaDescription:
    "Custom volleyball uniform manufacturer. Indoor and beach jerseys, libero jerseys, women's fitted shorts, sublimated, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester mesh or microfiber",
      bestFor: "Indoor and libero jerseys",
      performance: "Lightweight, breathable, prints cleanly",
    },
    {
      fabric: "Poly-spandex",
      bestFor: "Women's fitted shorts and briefs",
      performance: "Four-way stretch, close fit",
    },
    {
      fabric: "Cationic-dyeable polyester",
      bestFor: "Deep or saturated colorways",
      performance: "Takes richer, deeper color",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainability-positioned programs",
      performance: "Same print and performance as virgin polyester",
    },
  ],
  fabricNote: [
    { text: "Polyester-based for full-color sublimation. Jersey and short weights are tuned to your program and " },
    { text: "confirmed on your sample", bold: true },
    {
      text: ". For deep or saturated team colors we can use cationic-dyeable polyester, and where a design layers a heat-applied element over a dark base we confirm color-holding on your sample. Swatches before every bulk run.",
    },
  ],
  fabricPills: ["Polyester mesh", "Microfiber", "Poly-spandex", "Cationic-dyeable polyester", "Recycled option"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Jersey and short graphics, names, numbers, logos",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and name or number bars",
        notes: "Raised, full-color",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn numbers on jerseys",
        notes: "Raised, classic look",
      },
      {
        method: "Embroidery",
        bestFor: "Crests, badges, sponsor marks",
        notes: "Raised, premium texture",
      },
    ],
    note: [
      { text: "Numbers stay " },
      { text: "a solid contrasting color", bold: true },
      { text: " for legibility, even over a busy sublimated design." },
    ],
  },
  qualityHeading: "Court-legal, matched across the roster",
  qualitySubline:
    "We confirm the libero contrast, the numbering, the color and the fit on your proof and sample before the full roster is produced.",
  qualityPoints: [
    "Libero jersey checked for legal contrast and confirmed before we cut",
    "Numbering size and placement set to your governing body's rules",
    "Names and numbers sublimated into the fiber, they will not crack, peel or fade",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Lightweight polyester jersey knits, fitted poly-spandex shorts, cationic-dyeable polyester for deep colors",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, names and numbers in the print, Pantone color matching, home and away kits",
    },
    {
      title: "Decoration",
      body: "Sublimation, embroidered crests, sublimated numbers kept legible on busy designs",
    },
    {
      title: "Finishing",
      body: "Your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom volleyball kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Is the libero jersey a different construction, or just a different color?",
      a: "The libero jersey is the same jersey platform in a required contrasting color, produced in the same roster order and the same run, not a separate purchase. We check the color for legal contrast and confirm it before bulk.",
    },
    {
      q: "What colors count as contrasting for a libero jersey?",
      a: "The libero top must clearly contrast with the team's predominant color. Two darks, like purple and black, or two lights, like white and yellow, can read as too similar, so we help you pick a compliant pairing, and where you have more than one libero, a different color for each. Rules vary by governing body, so we confirm against yours.",
    },
    {
      q: "What does cationic-dyeable polyester do?",
      a: "It is a modified polyester that takes deeper, richer color than standard polyester, useful for dark or saturated team colorways. Where a design layers a heat-applied element over a dark base, we confirm color-holding on your sample.",
    },
    {
      q: "How are names and numbers applied?",
      a: "They are built into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Numbers stay a solid contrasting color so they read clearly even over a busy design.",
    },
    {
      q: "Can indoor and beach volleyball uniforms come from the same order?",
      a: "Yes. Indoor jerseys, libero jerseys and beach volleyball uniforms are all built on the same cut-and-sew platform, so they can be planned into one program and ship together.",
    },
    {
      q: "What numbering and uniform rules apply?",
      a: "They vary by governing body, NFHS, USA Volleyball, FIVB and NCAA differ on number size, placement and libero contrast, and a jersey must be long enough to stay tucked or hang past the waistband. Tell us your competition and we build to its current rules, confirmed on your proof.",
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
  // pattern Cricket/Basketball/Rugby/Baseball ship with today. Full PDP
  // content is kept for the two hero styles (Volleyball Jersey, Women's
  // Volleyball Shorts) so either can flip to "published" on its own once
  // confirmed and sampled.
  styleCards: [
    {
      status: "draft",
      slug: "indoor-jersey",
      cardTitle: "Custom Volleyball Jersey",
      cardSubline: "Close-fit, short or long sleeve, fully sublimated",
      image: "",
      imageAlt: "Custom volleyball jersey, close-fit, short or long sleeve, fully sublimated",
      href: "/teamwear/volleyball/indoor-jersey",
      pdpTitle: "Volleyball Jersey",
      sku: "CAP-VOL-01",
      pdpHeading: "Custom Volleyball Jersey Manufacturer",
      pdpDescription:
        "Indoor volleyball jersey, custom and private label, a close-fitting cut in lightweight polyester mesh, full-dye sublimated with names and numbers in the print, and available as a legal contrasting libero jersey, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Volleyball jersey, front view" },
        { alt: "Volleyball jersey, back view with name and number" },
        { alt: "Volleyball jersey, sleeve detail" },
        { alt: "Volleyball jersey, libero contrast colorway" },
        { alt: "Volleyball jersey, sponsor logo placement" },
        { alt: "Volleyball jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Volleyball Jersey Manufacturer",
      pdpMetaDescription:
        "Custom volleyball jersey manufacturer, indoor and libero, full-dye sublimated, names and numbers in the print, short or long sleeve, low MOQ. DDP worldwide.",
      material: "Lightweight polyester mesh or microfiber",
      faqs: [
        {
          q: "How is the libero jersey made and ordered?",
          a: "It is the same jersey platform in a required contrasting color, produced in the same roster order and run. We check the color for legal contrast and confirm it before bulk, so it is not a separate purchase or a special build.",
        },
        {
          q: "Does the jersey need to be a certain length?",
          a: "Yes. Competition rules require the top to stay tucked or hang past the waistband and prohibit a bare midriff, so we build the length to meet the rule rather than leave it to chance.",
        },
        {
          q: "Can we have short and long sleeve in the same order?",
          a: "Yes. Both are the same construction and can be mixed across a roster in one run.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Volleyball Shorts", href: "/teamwear/volleyball/fitted-shorts" },
        { label: "Libero Jersey", href: "/teamwear/volleyball" },
        { label: "Men's Shorts", href: "/teamwear/volleyball" },
        { label: "See All", href: "/teamwear/volleyball" },
      ],
      specifications: [
        { label: "Style", value: "Indoor volleyball jersey (base type)" },
        { label: "Fabric", value: "Lightweight polyester mesh or microfiber" },
        { label: "Weight", value: "Tuned to your program, confirmed on your sample" },
        { label: "Sleeve", value: "Short or long, same construction" },
        { label: "Fit", value: "Close-fitting for unrestricted spiking and blocking" },
        { label: "Length", value: "Built to stay tucked or hang past the waistband, per competition rules" },
        {
          label: "Decoration",
          value: "Full-dye sublimation, names and numbers in the print; numbers kept a solid contrasting color",
        },
        { label: "Color", value: "Full sublimation color range, Pantone matched; contrasting libero colorway available" },
        { label: "Fit and sizing", value: "Graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Volleyball jersey, construction detail" },
    },
    {
      status: "draft",
      slug: "fitted-shorts",
      cardTitle: "Custom Women's Volleyball Shorts",
      cardSubline: "Fitted poly-spandex, four-way stretch",
      image: "",
      imageAlt: "Custom women's volleyball shorts, fitted poly-spandex, four-way stretch",
      href: "/teamwear/volleyball/fitted-shorts",
      pdpTitle: "Women's Volleyball Shorts",
      sku: "CAP-VOL-02",
      pdpHeading: "Custom Volleyball Shorts Manufacturer",
      pdpDescription:
        "Fitted volleyball shorts, custom and private label, a close-fitting poly-spandex short or brief with a wide stretch waistband and four-way stretch, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Volleyball shorts, front view" },
        { alt: "Volleyball shorts, back view" },
        { alt: "Volleyball shorts, waistband detail" },
        { alt: "Volleyball shorts, side seam detail" },
        { alt: "Volleyball shorts, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Volleyball Shorts Manufacturer",
      pdpMetaDescription:
        "Custom volleyball shorts manufacturer, fitted poly-spandex women's shorts and briefs, four-way stretch, sublimated, low MOQ. DDP worldwide.",
      material: "Poly-spandex, four-way stretch",
      faqs: [
        {
          q: "What rise and length options are there?",
          a: "Multiple rise and coverage options are available, from a shorter brief to a longer fitted short, confirmed on your sample. We do not lock you to one inseam.",
        },
        {
          q: "Can players wear different short styles on one team?",
          a: "Bottoms can vary in style across teammates as long as they share the same color, so we hold one team color across every short even if the cut differs.",
        },
        {
          q: "Do you make a men's short too?",
          a: "Yes. The men's short is a looser athletic cut on the same platform, in the same team color.",
        },
      ],
      relatedStyleTags: [
        { label: "Volleyball Jersey", href: "/teamwear/volleyball/indoor-jersey" },
        { label: "Libero Jersey", href: "/teamwear/volleyball" },
        { label: "Men's Shorts", href: "/teamwear/volleyball" },
        { label: "See All", href: "/teamwear/volleyball" },
      ],
      specifications: [
        { label: "Style", value: "Women's fitted volleyball short or brief (base type)" },
        { label: "Fabric", value: "Poly-spandex, four-way stretch" },
        { label: "Weight", value: "Tuned to your program, confirmed on your sample" },
        { label: "Rise and length", value: "Multiple rise and coverage options, confirmed on your sample" },
        { label: "Waistband", value: "Wide stretch waistband" },
        { label: "Decoration", value: "Full-dye sublimation, team colors and side detail" },
        { label: "Color", value: "Full sublimation color range, Pantone matched; same short color across the team" },
        { label: "Sizing", value: "Women's block, graded XS to 5XL; looser men's short available" },
        { label: "Branding", value: "Team logo, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Volleyball shorts, construction detail" },
    },
    {
      status: "draft",
      slug: "libero-jersey",
      cardTitle: "Custom Libero Jersey",
      cardSubline: "Legal contrast colorway of the team jersey",
      image: "",
      imageAlt: "Custom libero jersey, legal contrast colorway of the team jersey",
      href: "/teamwear/volleyball/libero-jersey",
    },
    {
      status: "draft",
      slug: "mens-shorts",
      cardTitle: "Custom Men's Volleyball Shorts",
      cardSubline: "Looser athletic cut",
      image: "",
      imageAlt: "Custom men's volleyball shorts, looser athletic cut",
      href: "/teamwear/volleyball/mens-shorts",
    },
    {
      status: "draft",
      slug: "beach-uniform",
      cardTitle: "Custom Beach Volleyball Uniform",
      cardSubline: "Tank and brief, or two-piece",
      image: "",
      imageAlt: "Custom beach volleyball uniform, tank and brief, or two-piece",
      href: "/teamwear/volleyball/beach-uniform",
    },
    {
      status: "draft",
      slug: "warm-up-jacket",
      cardTitle: "Custom Volleyball Warm-Up Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom volleyball warm-up jacket, zip warm-up, tricot or fleece",
      href: "/teamwear/volleyball/warm-up-jacket",
    },
    {
      status: "draft",
      slug: "warm-up-pants",
      cardTitle: "Custom Volleyball Warm-Up Pants",
      cardSubline: "Straight or tapered, tricot or fleece",
      image: "",
      imageAlt: "Custom volleyball warm-up pants, straight or tapered, tricot or fleece",
      href: "/teamwear/volleyball/warm-up-pants",
    },
  ],
  // Only live pages (owner spec: "Never link an unbuilt PLP or unpublished
  // PDP") -- no `/teamwear` index route exists yet, so the Cricket,
  // Basketball, Rugby and Baseball PLPs and real Activewear PLPs are linked
  // instead. Add more sibling sport PLPs here as they publish.
  relatedLinks: [
    { label: "Cricket", href: "/teamwear/cricket" },
    { label: "Basketball", href: "/teamwear/basketball" },
    { label: "Rugby", href: "/teamwear/rugby" },
    { label: "Baseball", href: "/teamwear/baseball" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
    { label: "Track Jackets & Zip-Ups", href: "/activewear/track-jackets" },
  ],
};
