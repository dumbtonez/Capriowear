// content/teamwear/rugby.ts
// Third Teamwear category, same `Category` shape as Cricket/Basketball
// (content/teamwear/cricket.ts, content/teamwear/basketball.ts) and every
// Activewear category (content/activewear/types.ts) -- a pure content/data
// drop: no edits to app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/
// [style]/page.tsx, only this file plus one line in ./sports.ts.
//
// PDP publish state (owner spec, 2026-09-06): every style ships "draft".
// Zero published styles at launch means the PLP stays live/indexed, every
// card renders non-clickable, no PDP routes generate, nothing is in the
// sitemap, and CollectionPage/ItemList is omitted from the PLP entirely
// (app/teamwear/[sport]/page.tsx already conditions that block on
// `publishedStyleCards.length > 0`, no page code change needed here). Flip a
// style to "published" per style, heroes first, once the team confirms it
// and it is sampled.
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- socks, scrum
// caps/headguards and padded body protection are knitted or specialized
// foam goods, typically sourced, not cut-and-sew, so none is a style card
// here. Every card below is a genuinely cut-and-sew rugby piece.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape Cricket
// introduced -- no component or type change needed for this category.
//
// No rugby GSM number is ever stated (owner spec) -- every fabric-weight
// reference is worded as "tuned to your grade of play/confirmed on your
// sample," never a made-up figure. No grip panels or silicone-print offered
// or claimed anywhere (owner spec: legality unconfirmed).
//
// Punctuation rule (owner spec, 2026-09-06, site-wide sweep): headings,
// eyebrows, labels and short fact/chip lines carry no trailing period;
// periods stay only on real sentences (leads, FAQ answers, descriptions,
// the fabric footnote, the Specifications subtitle, the final-CTA subline).
// Written period-clean from the start here, not swept after the fact.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows.
import type { Category } from "../activewear/types";

export const rugby: Category = {
  slug: "rugby",
  group: "Teamwear",
  menuLabel: "Rugby",
  manufacturerNoun: "Rugby Uniform",
  productNounPlural: "rugby uniforms and kits",
  entityExampleStyles: "match jerseys, training jerseys, shorts, and base layers",
  entityFabrics: "polyester and poly-spandex knits",
  h1: "Custom Rugby Jersey Manufacturer",
  metaTitle: "Custom Rugby Jersey Manufacturer",
  metaDescription:
    "Custom rugby jersey manufacturer. Bodyfit, grab-resistant jerseys, reinforced shorts, sponsor branding, sublimated kits, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 40+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester with spandex",
      bestFor: "Bodyfit match jerseys",
      performance: "Stretch and recovery, holds a close fit in contact",
    },
    {
      fabric: "Polyester or poly-cotton",
      bestFor: "Training jerseys",
      performance: "Durable and comfortable for everyday training",
    },
    {
      fabric: "Heavier woven shell",
      bestFor: "Reinforced rugby shorts",
      performance: "Denser and tougher, built for scrums and tackles",
    },
    {
      fabric: "Poly-spandex knit",
      bestFor: "Base layers under the kit",
      performance: "Close fit, moisture-wicking",
    },
  ],
  // Segment run (owner spec: highlight one small, important phrase,
  // semibold, not the whole note) -- same standing rule as Cricket/
  // Basketball's own fabric footnote.
  fabricNote: [
    { text: "Polyester-based for full-color sublimation. Rugby runs heavier and denser than most kit for contact durability, so final weight and reinforcement are tuned to your grade of play and " },
    { text: "confirmed on your sample", bold: true },
    { text: ". Recycled polyester available. Swatches before every bulk run." },
  ],
  fabricPills: ["Polyester spandex", "Poly-cotton", "Heavier woven shell", "Poly-spandex knit", "Recycled option"],
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
  qualityHeading: "Built to hold through the season",
  qualitySubline:
    "We confirm the fabric, the seams, the color and the fit on your sample before the full roster is produced.",
  qualityPoints: [
    "Reinforced seams at shoulder, collar and side, built for tackling and rucking",
    "Names and numbers sublimated into the fiber, they will not crack, peel or fade",
    "Digital proof and Pantone match approved before we cut",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Polyester and poly-spandex match knits, heavier reinforced short fabric, training and base-layer knits",
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
  faqs: [
    {
      q: "What is your MOQ for custom rugby kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What makes a rugby jersey grab resistant?",
      a: "A close bodyfit cut leaves less loose fabric to grip, and the shoulder, collar and side seams are reinforced with double or triple stitching to resist pulling and tearing in contact. The bodyfit cut is built into the pattern, not the print, so it doesn't affect how the jersey sublimates.",
    },
    {
      q: "Are rugby shorts made from a different fabric?",
      a: "Yes. Rugby shorts use a heavier, denser woven-shell fabric with a reinforced waistband and reinforced seams, built to survive scrums and tackles, tougher than a standard sublimated short.",
    },
    {
      q: "Why is there no tackle twill on rugby shorts?",
      a: "Raised, sewn-on tackle twill can snag during contact, so shorts are decorated with flat, full-dye sublimation instead. The jersey can still take tackle twill for a classic look, since it doesn't see the same scrum and ruck contact.",
    },
    {
      q: "Can scrum caps and padding be ordered alongside the kit?",
      a: "Scrum caps and padded protection are specialized, molded or foam goods we source rather than cut-and-sew, so they aren't a style on this page, but we can coordinate them to your team colors alongside the jersey and shorts order.",
    },
    {
      q: "Do you build to World Rugby and competition kit rules?",
      a: "Tell us your union and competition and we build the jersey, shorts, numbering and any padding to its current rules, confirmed on your proof. Kit rules vary by competition and change between seasons, so we work to the regulation you play under rather than a fixed assumption.",
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
  // All 6 styles ship "draft" (owner spec): zero published at launch, so no
  // PDP routes generate, nothing enters the sitemap, and ItemList/
  // CollectionPage is omitted from the PLP entirely (see
  // app/teamwear/[sport]/page.tsx's own `publishedStyleCards` gate) -- same
  // pattern Cricket/Basketball ship with today. Full PDP content is kept for
  // the two hero styles (Match Jersey, Reinforced Shorts) so either can flip
  // to "published" on its own once confirmed and sampled.
  styleCards: [
    {
      status: "draft",
      slug: "match-jersey",
      cardTitle: "Custom Rugby Match Jersey",
      cardSubline: "Bodyfit grab-resistant cut, reinforced seams",
      image: "",
      imageAlt: "Custom rugby match jersey, bodyfit grab-resistant cut, reinforced seams",
      href: "/teamwear/rugby/match-jersey",
      pdpTitle: "Match Jersey",
      sku: "CAP-RGB-01",
      pdpHeading: "Custom Rugby Jersey Manufacturer",
      pdpDescription:
        "Bodyfit rugby match jersey, custom and private label, a close grab-resistant cut with reinforced shoulder, collar and side seams, full-dye sublimated in a polyester spandex knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Rugby match jersey, front view" },
        { alt: "Rugby match jersey, back view with name and number" },
        { alt: "Rugby match jersey, side profile" },
        { alt: "Rugby match jersey, collar and shoulder seam detail" },
        { alt: "Rugby match jersey, sponsor logo placement" },
        { alt: "Rugby match jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Rugby Jersey Manufacturer",
      pdpMetaDescription:
        "Custom rugby jersey manufacturer, bodyfit grab-resistant cut, reinforced seams, sponsor and club branding, full-dye sublimated, low MOQ. DDP worldwide.",
      material: "Polyester with spandex, bodyfit stretch-recovery knit",
      faqs: [
        {
          q: "How is the jersey built to resist grabbing in a tackle?",
          a: "A close bodyfit cut leaves less loose fabric to grip, and the collar, shoulder and side seams are reinforced with double or triple stitching to resist pulling and tearing.",
        },
        {
          q: "Do you build the jersey to World Rugby and competition rules?",
          a: "Tell us your union and competition and we build it to the current rules, including numbering and placement, confirmed on your proof. We work to the regulation you play under rather than a fixed assumption.",
        },
        {
          q: "Can you produce a home and an away jersey together?",
          a: "Yes. Both colorways are planned into one order and share the same print files, sizing and roster, so they match as a set.",
        },
      ],
      relatedStyleTags: [
        { label: "Reinforced Rugby Shorts", href: "/teamwear/rugby" },
        { label: "Training Jersey", href: "/teamwear/rugby" },
        { label: "Base Layer", href: "/teamwear/rugby" },
        { label: "See All", href: "/teamwear/rugby" },
      ],
      specifications: [
        { label: "Style", value: "Rugby match jersey, bodyfit (base type)" },
        { label: "Fabric", value: "Polyester with spandex, bodyfit stretch-recovery knit" },
        {
          label: "Weight",
          value: "Tuned to your grade of play, confirmed on your sample; rugby runs heavier for contact durability",
        },
        { label: "Fit", value: "Close bodyfit cut, less loose fabric to grip in a tackle" },
        { label: "Collar and seams", value: "Reinforced collar, shoulder and side seams, double or triple stitched" },
        {
          label: "Decoration",
          value: "Full-dye sublimation, names, numbers and sponsor logos in the print; tackle twill optional on the jersey",
        },
        { label: "Color", value: "Full sublimation color range, Pantone matched, home and away colorways" },
        { label: "Sizing", value: "Graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Rugby match jersey, construction detail" },
    },
    {
      status: "draft",
      slug: "reinforced-shorts",
      cardTitle: "Custom Reinforced Rugby Shorts",
      cardSubline: "Heavier woven shell, reinforced waistband and seams",
      image: "",
      imageAlt: "Custom reinforced rugby shorts, heavier woven shell, reinforced waistband and seams",
      href: "/teamwear/rugby/reinforced-shorts",
      pdpTitle: "Reinforced Shorts",
      sku: "CAP-RGB-02",
      pdpHeading: "Custom Rugby Shorts Manufacturer",
      pdpDescription:
        "Reinforced rugby shorts, custom and private label, a heavier woven-shell fabric with a reinforced waistband and reinforced seams, built to survive scrums, tackles and rucks, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Reinforced rugby shorts, front view" },
        { alt: "Reinforced rugby shorts, back view" },
        { alt: "Reinforced rugby shorts, waistband detail" },
        { alt: "Reinforced rugby shorts, reinforced seam detail" },
        { alt: "Reinforced rugby shorts, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Rugby Shorts Manufacturer",
      pdpMetaDescription:
        "Custom rugby shorts manufacturer, heavier woven-shell fabric, reinforced waistband and seams, sublimated, built for scrums and tackles, low MOQ. DDP worldwide.",
      material: "Heavier, denser woven-shell fabric, tougher than a standard sublimated short",
      faqs: [
        {
          q: "Why are rugby shorts a heavier fabric than other shorts?",
          a: "Because they take the most contact of any garment in the kit. A denser woven-shell fabric with a reinforced waistband and seams survives scrums, tackles and rucks that would wear out a standard sublimated short.",
        },
        {
          q: "Why do you keep tackle twill off the shorts?",
          a: "Raised, sewn-on lettering can snag during contact, so we decorate shorts with flat, full-dye sublimation instead, which lies flush with the fabric.",
        },
        {
          q: "Will they hold up over a full season?",
          a: "That is what the reinforced waistband and seams are for, and we confirm the fabric and construction on your sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "Match Jersey", href: "/teamwear/rugby/match-jersey" },
        { label: "Training Jersey", href: "/teamwear/rugby" },
        { label: "Base Layer", href: "/teamwear/rugby" },
        { label: "See All", href: "/teamwear/rugby" },
      ],
      specifications: [
        { label: "Style", value: "Reinforced rugby shorts (base type)" },
        { label: "Fabric", value: "Heavier, denser woven-shell fabric, tougher than a standard sublimated short" },
        { label: "Weight", value: "Tuned to your grade of play, confirmed on your sample; built heavier for contact" },
        { label: "Waistband", value: "Elastic with a drawstring, reinforced" },
        { label: "Seams", value: "Reinforced seam construction, built for scrums and tackles" },
        {
          label: "Decoration",
          value: "Full-dye sublimation; raised tackle twill kept off shorts, since it can snag in contact",
        },
        { label: "Color", value: "Full sublimation color range, Pantone matched, home and away colorways" },
        { label: "Sizing", value: "Graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Reinforced rugby shorts, construction detail" },
    },
    {
      status: "draft",
      slug: "training-jersey",
      cardTitle: "Custom Rugby Training Jersey",
      cardSubline: "Looser cut, durable everyday fabric",
      image: "",
      imageAlt: "Custom rugby training jersey, looser cut, durable everyday fabric",
      href: "/teamwear/rugby/training-jersey",
    },
    {
      status: "draft",
      slug: "base-layer",
      cardTitle: "Custom Rugby Base Layer",
      cardSubline: "Close-fit poly-spandex under-kit layer",
      image: "",
      imageAlt: "Custom rugby base layer, close-fit poly-spandex under-kit layer",
      href: "/teamwear/rugby/base-layer",
    },
    {
      status: "draft",
      slug: "warm-up-jacket",
      cardTitle: "Custom Rugby Warm-Up Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom rugby warm-up jacket, zip warm-up, tricot or fleece",
      href: "/teamwear/rugby/warm-up-jacket",
    },
    {
      status: "draft",
      slug: "warm-up-pants",
      cardTitle: "Custom Rugby Warm-Up Pants",
      cardSubline: "Straight or tapered, tricot or fleece",
      image: "",
      imageAlt: "Custom rugby warm-up pants, straight or tapered, tricot or fleece",
      href: "/teamwear/rugby/warm-up-pants",
    },
  ],
  // Only live pages (owner spec: "Never link an unbuilt PLP or unpublished
  // PDP") -- no `/teamwear` index route exists yet, so the Cricket and
  // Basketball PLPs and real Activewear PLPs are linked instead. Add more
  // sibling sport PLPs here as they publish.
  relatedLinks: [
    { label: "Cricket", href: "/teamwear/cricket" },
    { label: "Basketball", href: "/teamwear/basketball" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
    { label: "Track Jackets & Zip-Ups", href: "/activewear/track-jackets" },
  ],
};
