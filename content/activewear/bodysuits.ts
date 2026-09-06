// content/activewear/bodysuits.ts
// Sixteenth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every category
// before it (owner spec, 2026-09-03): no edits to app/activewear/
// [category]/[style]/page.tsx, app/sitemap.ts, or lib/schema.ts. Two real
// authorized component changes, both small and backward-compatible, not
// workarounds:
// 1. `Category.defaultGenderFilter` (new, optional) -- CategoryMetaStrip's
//    own All/Women/Men chip row now starts on whichever chip a category
//    names ("Women" here, owner spec: "default Women, women's-led
//    category"), defaulting to "All" (every prior category's own actual
//    behavior, unchanged) when omitted. Purely the chip row's own initial
//    visual state -- these chips don't filter `styleCards` today (no
//    per-style gender field exists), so this has no effect on which cards
//    render, only which chip looks active on load.
// 2. This category also confirms the second real Leggings-pilot-style PDP
//    build (two published styles, Tank + Long-Sleeve, per owner spec:
//    "publish tank + long-sleeve first") -- no template change needed for
//    that, StyleCard already supports any number of "published" entries.
//
// First category under the "SETS & ONE PIECES" mega-menu group
// (content/home.ts) with real content -- Yoga Sets was first into that
// group overall; this is the second. That group's own mega-menu href for
// Bodysuits already points to /activewear/bodysuits (confirmed before
// writing this file, same check every category since the Track Jackets &
// Zip-Ups mega-menu mismatch, 2026-09-03).
//
// No `weightTiers` block (owner spec, 2026-09-03: "does NOT use the
// reusable weight-tiers / mmHg / water-performance block, bodysuits are
// not weight-tier driven") -- field simply omitted, same as Leggings/
// Sports Bras/Shorts/Tank Tops/Yoga Sets/Track Jackets & Zip-Ups.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave ("Share
// your tech pack, sketch or a reference bodysuit. We'll come back within
// 24 hours with next steps.") -- standing rule, owner spec, 2026-09-02
// (see every category since Sweatshirts' own header comment and the
// decision log entries of that date): every category file uses Leggings'
// own ctaSubline verbatim, regardless of what a category's own brief
// supplies here.
//
// American spelling and no en/em dashes confirmed throughout, per this
// brief's own explicit rule -- "colour"/"–"/"—" audited out at write time,
// same standing sitewide rule every category follows.
import type { Category } from "./types";

export const bodysuits: Category = {
  slug: "bodysuits",
  group: "Activewear",
  menuLabel: "Bodysuits",
  // Entity FAQ overrides (owner's exact given values, 2026-09-03).
  manufacturerNoun: "Bodysuit",
  productNounPlural: "bodysuits",
  entityExampleStyles: "tank, long-sleeve, and racerback bodysuits",
  entityFabrics: "nylon spandex and poly spandex knits",
  // H1/title lead with "Athletic Bodysuit" (SEO/AEO refresh, owner spec:
  // "the bare term draws shapewear/dancewear intent; the athletic
  // qualifier must be in the H1 and title, not just body copy").
  h1: "Custom Athletic Bodysuit Manufacturer",
  metaTitle: "Custom Athletic Bodysuit Manufacturer",
  metaDescription:
    "Custom athletic bodysuit manufacturer, tank, long-sleeve and racerback styles, snap gusset, built-in shelf bra, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 40+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  // Women's-led category (owner spec, 2026-09-03) -- see this file's own
  // header comment and Category.defaultGenderFilter's own comment.
  defaultGenderFilter: "Women",
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon spandex knit",
      bestFor: "Soft, matte second-skin bodysuits",
      performance: "Four-way stretch, strong recovery, smooth opaque hand",
    },
    {
      fabric: "Poly spandex knit",
      bestFor: "Moisture-wicking and print-ready bodysuits",
      performance: "Quick-dry, colorfast, holds sublimation and bright color",
    },
    {
      fabric: "Ribbed knit",
      bestFor: "Textured body or contrast panels",
      performance: "Structured stretch, cotton-adjacent look, holds shape",
    },
    {
      fabric: "Power mesh",
      bestFor: "Support and ventilation panels",
      performance: "Adds structure without underwire, breathable",
    },
  ],
  fabricNote: [
    {
      text: "Body panels run nylon or poly spandex, commonly 70 to 85% face fiber with 15 to 30% spandex for four-way stretch and recovery, in a matte or shine finish. Ribbed knit and power mesh are used for full bodies or contrast and support panels. Seamless and circular-knit bodysuits exist in the market but sit outside our cut-and-sew scope. Swatches before every bulk run, and we can source or match a specific knit, finish or reference garment, confirmed on your sample.",
    },
  ],
  fabricPills: ["Nylon spandex", "Poly spandex", "Ribbed knit", "Power mesh"],
  qualityHeading: "A closure that holds, a fit that stays put",
  qualitySubline: "We test the closure, the gusset and the fit on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Snap or hook closure cycled open and closed, built to hold past 500 uses",
    "Gusset seam tested under stretch, the highest-stress point on a one-piece",
    "Torso length graded and checked across every size, not just the sample",
    "Opacity confirmed under real stretch and movement, not only at rest",
    "Shelf bra pads sit true and support holds through wear and wash",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Nylon or poly spandex knits, ribbed knit, power mesh support panels, matte or shine finish",
    },
    { title: "Fit and neckline", body: "Fitted second-skin cut, scoop, square, V, mock or crew neckline" },
    { title: "Back and leg", body: "Full-back, low-back or strappy-back, standard or higher-cut leg opening" },
    { title: "Closure", body: "Snap-button gusset, sewn gusset, or hook-and-snap" },
    {
      title: "Support",
      body: "Built-in shelf bra with removable pads and adjustable straps, or no support",
    },
    { title: "Sleeve", body: "Sleeveless, short, or long sleeve, thumbholes optional" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom bodysuits?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a bodysuit and a jumpsuit?",
      a: "A bodysuit is a fitted one-piece that ends at the hip with a crotch closure. A jumpsuit or unitard continues into full or cropped leg coverage. We make both.",
    },
    {
      q: "What closure options do you offer?",
      a: "A snap-button gusset is our standard, so the piece is worn and removed without fully undressing. We also build a fully sewn gusset for simpler styles, or a hook-and-snap combination.",
    },
    {
      q: "Do your bodysuits come with a built-in bra?",
      a: "They can. A built-in shelf bra with removable pads and adjustable straps is a common option, from medium to high support, or the body can be left plain to wear with a separate bra.",
    },
    {
      q: "Which fabrics do you use for bodysuits?",
      a: "Nylon or poly spandex knits for the body, with ribbed knit or power mesh for texture and support panels, in a matte or shine finish.",
    },
    {
      q: "Will the fabric show through when stretched?",
      a: "We confirm opacity under real stretch and movement on your sample before bulk, and can move to a higher weight or a lined panel where a color or fabric needs it.",
    },
    {
      q: "What back and leg options are there?",
      a: "Full-back, low-back or strappy-back, with a standard or higher-cut leg opening, to your spec.",
    },
    {
      q: "Can you match a specific fabric or a reference garment?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match, then confirm on your sample.",
    },
    {
      q: "What can I customize?",
      a: "Fabric and finish, neckline, back, leg cut, sleeve, gusset closure, built-in bra, color and print, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label bodysuits?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are bodysuits sized?",
      a: "Alpha XS to 5XL, women's-led, with men's and unisex cuts by fit block. Torso length is graded and checked across the full size range.",
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
      a: "Send your tech pack, sketch or a reference bodysuit by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // Standing CTA subline, same as every category (owner spec, 2026-09-02) --
  // see this file's own header comment for why this differs from the
  // brief's own given per-category line.
  ctaReferenceNoun: "bodysuit",
  // Tank and Long-Sleeve published first (owner spec, 2026-09-03), same
  // Leggings-pilot pattern (one or more real PDPs, the rest "draft" -- a
  // real name and one-line spec, no PDP content yet, no generated route,
  // excluded from sitemap/ItemList). cardTitle form is "Custom [Style]",
  // matching the owner's own given titles exactly.
  styleCards: [
    {
      status: "published",
      slug: "tank",
      cardTitle: "Custom Tank Bodysuit",
      cardSubline: "Sleeveless, full-back, built-in shelf bra",
      image: "",
      imageAlt: "Custom tank bodysuit, sleeveless, full-back, built-in shelf bra",
      href: "/activewear/bodysuits/tank",
      pdpTitle: "Tank",
      sku: "CAP-BOD-01",
      pdpHeading: "Custom Tank Bodysuit Manufacturer",
      pdpDescription:
        "Sleeveless full-back bodysuit with a snap gusset and built-in shelf bra, custom and private label, in nylon or poly spandex, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Tank bodysuit, front view" },
        { alt: "Tank bodysuit, back view" },
        { alt: "Tank bodysuit, side profile" },
        { alt: "Tank bodysuit, gusset closure detail" },
        { alt: "Tank bodysuit, shelf bra interior detail" },
        { alt: "Tank bodysuit, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Athletic Tank Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom athletic tank bodysuit manufacturer, nylon or poly spandex, snap gusset, built-in shelf bra, low MOQ. DDP worldwide.",
      material: "Nylon or poly spandex knit, 70 to 85% face fiber, 15 to 30% spandex",
      faqs: [
        {
          q: "Does the tank bodysuit come with a built-in bra?",
          a: "Yes, a built-in shelf bra with removable pads and adjustable straps is standard on this style, and can be built from medium to high support or left out.",
        },
        {
          q: "How does the closure work?",
          a: "A snap-button gusset lets the piece be worn and taken off without fully undressing, cycled and tested to hold past 500 uses.",
        },
        {
          q: "Will it show through when stretched?",
          a: "We confirm opacity under real stretch and movement on your sample, and can move to a higher weight or lined panel where a color needs it.",
        },
      ],
      relatedStyleTags: [
        { label: "Long-Sleeve", href: "/activewear/bodysuits/long-sleeve" },
        { label: "Short-Sleeve", href: "/activewear/bodysuits" },
        { label: "Racerback", href: "/activewear/bodysuits" },
        { label: "Square-Neck", href: "/activewear/bodysuits" },
        { label: "Open-Back", href: "/activewear/bodysuits" },
        { label: "See All", href: "/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Composition", value: "One-piece bodysuit, ends at hip with crotch closure (base type)" },
        { label: "Fabric", value: "Nylon or poly spandex knit, commonly 70 to 85% face fiber, 15 to 30% spandex" },
        { label: "Finish", value: "Matte or shine" },
        { label: "Closure", value: "Snap-button gusset (standard), sewn or hook-and-snap on request" },
        { label: "Support", value: "Built-in shelf bra, removable pads, adjustable straps, or none" },
        { label: "Back and leg", value: "Full-back (base), low or strappy-back, standard or high-cut leg" },
        { label: "Neckline", value: "Scoop (base), square, V, mock or crew" },
        { label: "Branding", value: "Sublimation, screen, heat transfer, embroidery, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Tank bodysuit, construction detail" },
    },
    {
      status: "published",
      slug: "long-sleeve",
      cardTitle: "Custom Long-Sleeve Bodysuit",
      cardSubline: "Full sleeve, thumbholes optional",
      image: "",
      imageAlt: "Custom long-sleeve bodysuit, full sleeve, thumbholes optional",
      href: "/activewear/bodysuits/long-sleeve",
      pdpTitle: "Long-Sleeve",
      sku: "CAP-BOD-02",
      pdpHeading: "Custom Long-Sleeve Bodysuit Manufacturer",
      pdpDescription:
        "Full-sleeve bodysuit with a snap gusset and optional thumbholes, custom and private label, in nylon or poly spandex, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Long-sleeve bodysuit, front view" },
        { alt: "Long-sleeve bodysuit, back view" },
        { alt: "Long-sleeve bodysuit, side profile" },
        { alt: "Long-sleeve bodysuit, thumbhole detail" },
        { alt: "Long-sleeve bodysuit, gusset closure detail" },
        { alt: "Long-sleeve bodysuit, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Long-Sleeve Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom athletic long-sleeve bodysuit manufacturer, nylon or poly spandex, snap gusset, optional thumbholes, low MOQ. DDP worldwide.",
      material: "Nylon or poly spandex knit, 70 to 85% face fiber, 15 to 30% spandex",
      faqs: [
        {
          q: "Does the long-sleeve bodysuit come with thumbholes?",
          a: "Thumbholes are optional on this style, built into the cuff on request, along with a standard or ribbed cuff finish.",
        },
        {
          q: "Does it come with a built-in bra?",
          a: "Yes, a built-in shelf bra with removable pads and adjustable straps is available on this style, from medium to high support, or it can be left out.",
        },
        {
          q: "How does the closure work?",
          a: "A snap-button gusset lets the piece be worn and taken off without fully undressing, cycled and tested to hold past 500 uses.",
        },
      ],
      relatedStyleTags: [
        { label: "Tank", href: "/activewear/bodysuits/tank" },
        { label: "Short-Sleeve", href: "/activewear/bodysuits" },
        { label: "Mock-Neck", href: "/activewear/bodysuits" },
        { label: "Ribbed", href: "/activewear/bodysuits" },
        { label: "Open-Back", href: "/activewear/bodysuits" },
        { label: "See All", href: "/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Composition", value: "One-piece bodysuit, ends at hip with crotch closure (base type)" },
        { label: "Fabric", value: "Nylon or poly spandex knit, commonly 70 to 85% face fiber, 15 to 30% spandex" },
        { label: "Finish", value: "Matte or shine" },
        { label: "Closure", value: "Snap-button gusset (standard), sewn or hook-and-snap on request" },
        { label: "Support", value: "Built-in shelf bra, removable pads, adjustable straps, or none" },
        { label: "Back and leg", value: "Full-back (base), low or strappy-back, standard or high-cut leg" },
        { label: "Neckline", value: "Scoop (base), square, V, mock or crew" },
        { label: "Sleeve", value: "Full long sleeve, thumbholes optional, standard or ribbed cuff" },
        { label: "Branding", value: "Sublimation, screen, heat transfer, embroidery, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Long-sleeve bodysuit, construction detail" },
    },
    {
      status: "draft",
      slug: "short-sleeve",
      cardTitle: "Custom Short-Sleeve Bodysuit",
      cardSubline: "Cap sleeve, snap gusset",
      image: "",
      imageAlt: "Custom short-sleeve bodysuit, cap sleeve, snap gusset",
      href: "/activewear/bodysuits/short-sleeve",
    },
    {
      status: "draft",
      slug: "racerback",
      cardTitle: "Custom Racerback Bodysuit",
      cardSubline: "Narrow racerback straps, shelf bra",
      image: "",
      imageAlt: "Custom racerback bodysuit, narrow racerback straps, shelf bra",
      href: "/activewear/bodysuits/racerback",
    },
    {
      status: "draft",
      slug: "square-neck",
      cardTitle: "Custom Square-Neck Bodysuit",
      cardSubline: "Square neckline, snap gusset",
      image: "",
      imageAlt: "Custom square-neck bodysuit, square neckline, snap gusset",
      href: "/activewear/bodysuits/square-neck",
    },
    {
      status: "draft",
      slug: "mock-neck",
      cardTitle: "Custom Mock-Neck Bodysuit",
      cardSubline: "Mock neck, long or short sleeve",
      image: "",
      imageAlt: "Custom mock-neck bodysuit, mock neck, long or short sleeve",
      href: "/activewear/bodysuits/mock-neck",
    },
    {
      status: "draft",
      slug: "open-back",
      cardTitle: "Custom Open-Back Bodysuit",
      cardSubline: "Low or strappy back detailing",
      image: "",
      imageAlt: "Custom open-back bodysuit, low or strappy back detailing",
      href: "/activewear/bodysuits/open-back",
    },
    {
      status: "draft",
      slug: "ribbed",
      cardTitle: "Custom Ribbed Bodysuit",
      cardSubline: "Ribbed knit, textured body",
      image: "",
      imageAlt: "Custom ribbed bodysuit, ribbed knit, textured body",
      href: "/activewear/bodysuits/ribbed",
    },
  ],
  // Owner's exact given related set, 2026-09-03.
  relatedLinks: [
    { label: "Leggings", href: "/activewear/leggings" },
    { label: "Sports Bras", href: "/activewear/sports-bras" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
    { label: "Yoga Sets", href: "/activewear/yoga-sets" },
  ],
};
