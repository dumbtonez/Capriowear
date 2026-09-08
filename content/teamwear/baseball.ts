// content/teamwear/baseball.ts
// Fourth Teamwear category (serves baseball and softball), same `Category`
// shape as Cricket/Basketball/Rugby (content/teamwear/{cricket,basketball,
// rugby}.ts) and every Activewear category (content/activewear/types.ts) --
// a pure content/data drop: no edits to app/teamwear/[sport]/page.tsx or
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
    "Custom baseball and softball uniform manufacturer. Button-front jerseys, double-knit pants with piping, softball women's fit, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
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
      fabric: "Poly-spandex knit",
      bestFor: "Sliding shorts and base layers",
      performance: "Close fit, moisture-wicking",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainability-positioned programs",
      performance: "Same print and performance as virgin polyester",
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
  fabricPills: ["Polyester mesh", "Microfiber", "Double-knit", "Poly-spandex", "Recycled option"],
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
      { text: "A button-front jersey still takes full sublimation, placket and all, so " },
      { text: "the classic look does not limit your design", bold: true },
      { text: "." },
    ],
  },
  qualityHeading: "Built to take the slide",
  qualitySubline:
    "We confirm the fabric, the knee reinforcement, the color and the fit on your sample before the full roster is produced.",
  qualityPoints: [
    "Double-knit pants and the reinforced knee option, built for sliding and fielding",
    "Names and numbers sublimated into the fiber, they will not crack, peel or fade",
    "Digital proof and Pantone match approved before we cut",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Lightweight jersey knits, firm polyester double-knit pants, poly-spandex base layers",
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
  faqs: [
    {
      q: "What is your MOQ for custom baseball kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a button-front and a pullover jersey, and does the placket limit sublimation?",
      a: "Both are available. A button-front jersey has a full-button or two-button placket for the classic pro look; a pullover is simpler and often lower cost. Either way the whole jersey, placket included, takes full-dye sublimation, so the button front does not limit your design.",
    },
    {
      q: "Should we order full-length or knicker pants?",
      a: "Both, on the same double-knit platform. Full-length pants drape over the cleat; knicker pants end at the knee and are worn with stirrup or sanitary socks, so the choice also sets which socks the team needs.",
    },
    {
      q: "Is the reinforced knee standard or an upgrade?",
      a: "It is an option. An added double-layer knee panel gives sliding and fielding durability where a team wants it, confirmed on your sample.",
    },
    {
      q: "What is the difference between softball and baseball fit?",
      a: "Same polyester sublimation fabric family. The difference is the cut, softball jerseys run more fitted and are usually pullovers, and softball pants use a women's-specific block and add a mid-thigh option that pitchers favor.",
    },
    {
      q: "Are caps and belts included with the uniform?",
      a: "Caps and belts are separate accessory items we source rather than cut-and-sew, so they aren't a style on this page, but we can coordinate them to your team colors alongside the jersey and pants order.",
    },
    {
      q: "What numbering and uniform rules apply?",
      a: "They vary by league. Little League, high school and travel ball differ on number size, placement and design freedom, and some leagues require a shoulder patch sewn or ironed on rather than printed. Tell us your league and we build to its current rules, confirmed on your proof.",
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
  // pattern Cricket/Basketball/Rugby ship with today. Full PDP content is
  // kept for the two hero styles (Button-Front Jersey, Baseball Pants) so
  // either can flip to "published" on its own once confirmed and sampled.
  styleCards: [
    {
      status: "draft",
      slug: "button-front-jersey",
      cardTitle: "Custom Button-Front Baseball Jersey",
      cardSubline: "Full-button or two-button placket, fully sublimated",
      image: "",
      imageAlt: "Custom button-front baseball jersey, full-button or two-button placket, fully sublimated",
      href: "/teamwear/baseball/button-front-jersey",
      pdpTitle: "Button-Front Jersey",
      sku: "CAP-BSB-01",
      pdpHeading: "Custom Baseball Jersey Manufacturer",
      pdpDescription:
        "Button-front baseball jersey, custom and private label, a full-button or two-button placket with dyed-to-match buttons, fully sublimated including the placket, in a lightweight polyester knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Button-front baseball jersey, front view" },
        { alt: "Button-front baseball jersey, back view with name and number" },
        { alt: "Button-front baseball jersey, placket and button detail" },
        { alt: "Button-front baseball jersey, sleeve detail" },
        { alt: "Button-front baseball jersey, sponsor logo placement" },
        { alt: "Button-front baseball jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Baseball Jersey Manufacturer",
      pdpMetaDescription:
        "Custom button-front baseball jersey manufacturer, full-button or two-button placket, fully sublimated including the placket, low MOQ. DDP worldwide.",
      material: "Lightweight 100% polyester, mesh or microfiber",
      faqs: [
        {
          q: "Does the button placket limit the design or sublimation?",
          a: "No. The whole jersey, placket and buttons included, takes full-dye sublimation, so you get the classic button-front look with unlimited-color graphics.",
        },
        {
          q: "Can I choose full-button or two-button, and set-in or raglan sleeves?",
          a: "Yes. A full-button placket runs the length of the jersey, a two-button placket sits at the collar, and either set-in or raglan sleeves are available, all to your spec.",
        },
        {
          q: "Do you make a matching pullover version and softball cut?",
          a: "Yes. A pullover jersey and a fitted softball cut are both available on the same platform.",
        },
      ],
      relatedStyleTags: [
        { label: "Baseball Pants", href: "/teamwear/baseball/double-knit-pants" },
        { label: "Pullover Jersey", href: "/teamwear/baseball" },
        { label: "Batting-Practice Jersey", href: "/teamwear/baseball" },
        { label: "See All", href: "/teamwear/baseball" },
      ],
      specifications: [
        { label: "Style", value: "Button-front baseball jersey (base type)" },
        { label: "Fabric", value: "Lightweight 100% polyester, mesh or microfiber" },
        { label: "Weight", value: "Tuned to your program, confirmed on your sample" },
        { label: "Placket", value: "Full-button or two-button placket, dyed-to-match buttons" },
        { label: "Sleeve", value: "Set-in or raglan, your choice" },
        {
          label: "Decoration",
          value: "Full-dye sublimation across the whole jersey, placket included; tackle twill numbers optional",
        },
        { label: "Color", value: "Full sublimation color range, Pantone matched, home and away colorways" },
        { label: "Fit", value: "Baseball looser cut or a fitted softball cut, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Button-front baseball jersey, construction detail" },
    },
    {
      status: "draft",
      slug: "double-knit-pants",
      cardTitle: "Custom Baseball Pants",
      cardSubline: "Double-knit, reinforced knee option, full-length or knicker",
      image: "",
      imageAlt: "Custom double-knit baseball pants, reinforced knee option, full-length or knicker",
      href: "/teamwear/baseball/double-knit-pants",
      pdpTitle: "Baseball Pants",
      sku: "CAP-BSB-02",
      pdpHeading: "Custom Baseball Pants Manufacturer",
      pdpDescription:
        "Double-knit baseball pants, custom and private label, a firm 100% polyester double-knit with a soil-release finish, pro-style tunnel belt loops and a zipper fly, in full-length or knicker, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Baseball pants, front view" },
        { alt: "Baseball pants, back view" },
        { alt: "Baseball pants, reinforced knee detail" },
        { alt: "Baseball pants, waistband and belt loop detail" },
        { alt: "Baseball pants, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Baseball Pants Manufacturer",
      pdpMetaDescription:
        "Custom baseball pants manufacturer, 100% polyester double-knit with piping, reinforced knee option, full-length or knicker, low MOQ. DDP worldwide.",
      material: "100% polyester double-knit with a soil-release finish",
      faqs: [
        {
          q: "Should we order full-length or knicker pants?",
          a: "Full-length pants drape over the cleat and are the standard baseball choice; knicker pants end at the knee and are worn with stirrup or sanitary socks. The choice also sets which socks the team needs.",
        },
        {
          q: "Is the reinforced knee standard or an upgrade?",
          a: "It is an option. An added double-layer knee panel gives extra sliding and fielding durability where you want it, confirmed on your sample.",
        },
        {
          q: "Do you make a softball-cut pant?",
          a: "Yes. Softball uses a women's-specific block that runs trimmer through the hip and thigh, with full-length, knicker and mid-thigh options.",
        },
      ],
      relatedStyleTags: [
        { label: "Knicker Pants", href: "/teamwear/baseball" },
        { label: "Button-Front Jersey", href: "/teamwear/baseball/button-front-jersey" },
        { label: "Sliding Shorts", href: "/teamwear/baseball" },
        { label: "See All", href: "/teamwear/baseball" },
      ],
      specifications: [
        { label: "Style", value: "Baseball pants, double-knit (base type)" },
        { label: "Fabric", value: "100% polyester double-knit with a soil-release finish" },
        { label: "Weight", value: "Firm double-knit, weight tuned to your program and confirmed on your sample" },
        { label: "Silhouette", value: "Full-length over the cleat, or knicker at the knee worn with stirrup socks" },
        { label: "Knee", value: "Optional reinforced double-layer knee for sliding and fielding" },
        { label: "Waistband", value: "Pro-style tunnel belt loops, zipper fly, back welt pockets" },
        { label: "Decoration", value: "Full-dye sublimation, team colors and piping; flat so nothing snags" },
        { label: "Color", value: "Full sublimation color range, Pantone matched" },
        { label: "Sizing", value: "Graded XS to 5XL, men's, women's and youth blocks; softball women's-specific block available" },
        { label: "Branding", value: "Team logo, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Baseball pants, construction detail" },
    },
    {
      status: "draft",
      slug: "pullover-jersey",
      cardTitle: "Custom Pullover Baseball Jersey",
      cardSubline: "Simpler placket, common softball style",
      image: "",
      imageAlt: "Custom pullover baseball jersey, simpler placket, common softball style",
      href: "/teamwear/baseball/pullover-jersey",
    },
    {
      status: "draft",
      slug: "knicker-pants",
      cardTitle: "Custom Knicker Baseball Pants",
      cardSubline: "Knee-length, worn with stirrup socks",
      image: "",
      imageAlt: "Custom knicker baseball pants, knee-length, worn with stirrup socks",
      href: "/teamwear/baseball/knicker-pants",
    },
    {
      status: "draft",
      slug: "batting-practice-jersey",
      cardTitle: "Custom Batting-Practice Jersey",
      cardSubline: "Lightweight practice top",
      image: "",
      imageAlt: "Custom batting-practice jersey, lightweight practice top",
      href: "/teamwear/baseball/batting-practice-jersey",
    },
    {
      status: "draft",
      slug: "sliding-shorts",
      cardTitle: "Custom Sliding Shorts",
      cardSubline: "Padded slide protection under the pant",
      image: "",
      imageAlt: "Custom sliding shorts, padded slide protection under the pant",
      href: "/teamwear/baseball/sliding-shorts",
    },
    {
      status: "draft",
      slug: "warm-up-jacket",
      cardTitle: "Custom Baseball Warm-Up Jacket",
      cardSubline: "Dugout zip jacket, tricot or fleece",
      image: "",
      imageAlt: "Custom baseball warm-up jacket, dugout zip jacket, tricot or fleece",
      href: "/teamwear/baseball/warm-up-jacket",
    },
  ],
  // Only live pages (owner spec: "Never link an unbuilt PLP or unpublished
  // PDP") -- no `/teamwear` index route exists yet, so the Cricket,
  // Basketball and Rugby PLPs and real Activewear PLPs are linked instead.
  // Add more sibling sport PLPs here as they publish.
  relatedLinks: [
    { label: "Cricket", href: "/teamwear/cricket" },
    { label: "Basketball", href: "/teamwear/basketball" },
    { label: "Rugby", href: "/teamwear/rugby" },
    { label: "T-Shirts", href: "/activewear/t-shirts" },
    { label: "Track Jackets & Zip-Ups", href: "/activewear/track-jackets" },
  ],
};
