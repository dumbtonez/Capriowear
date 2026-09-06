// content/activewear/track-jackets.ts
// Thirteenth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every category
// before it (owner spec, 2026-09-03): no edits to app/activewear/
// [category]/[style]/page.tsx, app/sitemap.ts, or lib/schema.ts, only this
// file plus one line in ./categories.ts. Second category under the
// "OUTWEAR & SUITS" mega-menu group (content/home.ts), after Jackets.
//
// No `weightTiers` block (owner spec, 2026-09-03) -- track jackets are a
// knit, not weight- or weather-driven the way Jackets' own water
// performance table or T-Shirts'/Hoodies' own GSM tiers are; the field is
// simply omitted, same as Leggings/Sports Bras/Shorts/Tank Tops/Yoga Sets.
// Explicit category boundary, carried into the fabric note and one FAQ
// answer below: track jackets are knit (brushed tricot), not woven, and
// not marketed on weather performance (that's Jackets' own range);
// fleece zip-ups belong to Hoodies, not here.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave ("Share
// your tech pack, sketch or a reference track jacket, we'll develop it
// with you.") -- standing rule, owner spec, 2026-09-02 (see every category
// since Sweatshirts' own header comment and the decision log entries of
// that date): every category file uses Leggings' own ctaSubline verbatim,
// regardless of what a category's own brief supplies here.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const trackJackets: Category = {
  slug: "track-jackets",
  group: "Activewear",
  menuLabel: "Track Jackets & Zip-Ups",
  // Entity FAQ overrides (owner's exact given values, 2026-09-03).
  manufacturerNoun: "Track Jacket",
  productNounPlural: "track jackets",
  entityExampleStyles: "classic tricot, funnel-neck, quarter-zip, and mesh-lined styles",
  entityFabrics: "brushed polyester tricot",
  h1: "Custom Track Jacket Manufacturer",
  metaTitle: "Custom Track Jacket Manufacturer",
  // Owner's exact given copy, 158 chars -- within Google's own ~155-160
  // char truncation point.
  metaDescription:
    "Custom track jacket manufacturer, brushed polyester tricot, funnel neck, quarter-zip, mesh-lined styles, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 40+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Brushed polyester tricot",
      bestFor: "The classic track jacket, warm-ups and athleisure",
      performance: "Soft brushed interior, light stretch, smooth face for print, comfortable against skin",
    },
    {
      fabric: "Tricot with mesh lining",
      bestFor: "Teamwear and higher-exertion track jackets",
      performance: "Ventilated mesh lining for breathability",
    },
    {
      fabric: "Poly-spandex tricot",
      bestFor: "A stretchier, more fitted track jacket",
      performance: "Added stretch and recovery for a closer fit",
    },
  ],
  fabricNote: [
    {
      text: "Track jackets are knit and built for stretch and comfort, not weather resistance (for wind and rain shells, see our ",
    },
    { text: "Jackets", bold: true },
    { text: " range). Swatches before every bulk run, and we can source or match a specific fabric or a reference track jacket." },
  ],
  fabricPills: ["Brushed tricot", "Mesh-lined tricot", "Poly-spandex tricot"],
  qualityHeading: "Cut clean, zips smooth, holds color",
  qualitySubline: "We confirm the fabric, zip and finish on your sample before a single bulk piece is cut",
  qualityPoints: [
    "GSM and hand-feel held consistent, batch to batch",
    "Zippers function-tested for smooth, durable operation",
    "Colorfastness tested, no bleeding on stripes or color-blocks",
    "Brushed tricot checked for pilling, shrinkage tested after wash",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Brushed polyester tricot, single-layer or mesh-lined" },
    {
      title: "Collar and zip",
      body: "Cadet, funnel-neck or stand collar, full-zip or quarter-zip, reverse-coil or standard zipper",
    },
    { title: "Fit and finish", body: "Regular or slim, ribbed or open cuffs, hem drawcord with toggles" },
    { title: "Details", body: "Side-stripe or color-block panels, zip side pockets" },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, sublimation, screen, heat transfer, embroidery",
    },
    { title: "Labels and packaging", body: "Woven, printed or tear-away labels, hangtags, retail-ready packaging" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom track jackets?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a track jacket and a windbreaker?",
      a: "A track jacket is knit (brushed tricot), built for stretch, comfort and athleisure, not weather protection. A jacket is a woven shell built to block wind and rain, see our Jackets range. We make both.",
    },
    {
      q: "What material is a tricot track jacket made from?",
      a: "Brushed polyester tricot for the classic track jacket, tricot with a mesh lining for ventilation, and a poly-spandex tricot for a stretchier fitted version.",
    },
    {
      q: "What collar and zip options can you make?",
      a: "A cadet, funnel-neck or stand collar, with a full-zip or quarter-zip, and coil or reverse-coil zippers.",
    },
    {
      q: "Can you do retro stripes or color-blocking?",
      a: "Yes. Side stripes and color-blocked panels are set to your artwork, with colorfastness tested so colors do not bleed.",
    },
    {
      q: "Can I get a mesh-lined version for teams?",
      a: "Yes. A ventilated mesh lining suits teamwear and higher-exertion use, with your branding across the panels.",
    },
    {
      q: "Can you match a specific reference track jacket?",
      a: "Yes. Send a reference or tech pack and we match the fabric, collar, zip and detailing, then confirm on your sample.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, collar, zip, cuffs, hem, pockets, stripes and panels, color, print and embroidery, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label track jackets?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are track jackets sized?",
      a: "Alpha XS to 5XL, women's, men's and unisex by cut, a simple single-layer knit fit.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, 40+ countries. DDP to the US, UK, EU, Canada and Australia, with GSP+ 0% EU duty.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch or a reference track jacket by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // Standing CTA subline, same as every category (owner spec, 2026-09-02) --
  // see this file's own header comment for why this differs from the
  // brief's own given per-category line.
  ctaReferenceNoun: "track jacket",
  // Every style is "draft" (owner spec) -- a real name and one-line spec,
  // no PDP content yet. cardTitle form is "Custom [Style]" here, matching
  // the owner's own given titles exactly.
  styleCards: [
    {
      status: "draft",
      slug: "tricot",
      cardTitle: "Custom Tricot Track Jacket",
      cardSubline: "Brushed polyester tricot, full zip",
      image: "",
      imageAlt: "Custom tricot track jacket, brushed polyester tricot, full zip",
      href: "/activewear/track-jackets/tricot",
    },
    {
      status: "draft",
      slug: "funnel-neck",
      cardTitle: "Custom Funnel-Neck Zip-Up",
      cardSubline: "Standing collar, full zip",
      image: "",
      imageAlt: "Custom funnel-neck zip-up track jacket, standing collar, full zip",
      href: "/activewear/track-jackets/funnel-neck",
    },
    {
      status: "draft",
      slug: "retro-striped",
      cardTitle: "Custom Retro Striped Track Jacket",
      cardSubline: "Side-stripe heritage styling",
      image: "",
      imageAlt: "Custom retro striped track jacket, side-stripe heritage styling",
      href: "/activewear/track-jackets/retro-striped",
    },
    {
      status: "draft",
      slug: "quarter-zip",
      cardTitle: "Custom Quarter-Zip Track Top",
      cardSubline: "Partial zip, pullover",
      image: "",
      imageAlt: "Custom quarter-zip track top, partial zip, pullover",
      href: "/activewear/track-jackets/quarter-zip",
    },
    {
      status: "draft",
      slug: "mesh-lined",
      cardTitle: "Custom Mesh-Lined Track Jacket",
      cardSubline: "Ventilated mesh lining, teamwear",
      image: "",
      imageAlt: "Custom mesh-lined track jacket, ventilated mesh lining, teamwear",
      href: "/activewear/track-jackets/mesh-lined",
    },
  ],
  // Sibling Outwear & Suits-group categories from content/home.ts's own
  // activewearMegaMenu -- Tracksuits, Sweatsuits and Running Wear don't
  // have their own content files yet, so linking to real, built categories
  // instead (same "only real hrefs, no invented placeholder pages" rule
  // every prior category's own relatedLinks already follows).
  relatedLinks: [
    { label: "Jackets", href: "/activewear/jackets" },
    { label: "Hoodies", href: "/activewear/hoodies" },
    { label: "Sweatshirts", href: "/activewear/sweatshirts" },
    { label: "Joggers & Track Pants", href: "/activewear/joggers-track-pants" },
  ],
};
