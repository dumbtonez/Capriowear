// content/activewear/running-wear.ts
// A curated collection page (owner spec, 2026-09-03) -- NOT a standard
// product category: see `CuratedCollection`'s own comment in ./types.ts
// for why this is a genuinely different shape, not a `Category` variant.
// This page owns no products; every card below cross-links to an
// EXISTING page in another category (a real PDP for 15 of the 16, the
// Compression & Base Layers PLP for the last), so nothing here 404s and
// nothing generates a new PDP route under /activewear/running-wear.
// Rebuilt from the refreshed content, owner spec, 2026-09-25: 16 cards,
// each with a real `gender` ("Men"/"Women"; unisex cards leave it unset so
// they show under every chip), so the All/Women/Men row actually filters
// via ActivewearListing.
//
// Rendered by its own static route, app/activewear/running-wear/page.tsx
// -- deliberately NOT added to content/activewear/categories.ts (that
// registry drives both the shared [category] PLP template's
// CollectionPage/ItemList schema and the [category]/[style] PDP route
// generator, neither of which this page should ever produce). Fifth
// category-shaped page under the "OUTERWEAR & SUITS" mega-menu group
// (content/home.ts), after Jackets, Track Jackets & Zip-Ups, Tracksuits
// and Sweatsuits -- the group's own mega-menu href already points to
// /activewear/running-wear (no fix needed, confirmed before writing this
// file, after the Track Jackets & Zip-Ups mega-menu mismatch found
// 2026-09-03).
//
// Fabric options table added 2026-09-25 (owner spec), no weight tiers:
// it renders ahead of Customization, same order as every category PLP.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-page line this brief's own copy gave ("Share your
// tech pack, sketch or a reference. We'll come back within 24 hours with
// next steps.") -- standing rule, owner spec, 2026-09-02 (see every
// category since Sweatshirts' own header comment and the decision log
// entries of that date): every Activewear page under FinalCta uses
// Leggings' own ctaSubline verbatim, regardless of what a given brief
// supplies here.
import type { CuratedCollection, StyleCard } from "./types";
import { faqGetStarted } from "./pdpShared";

// Every card is "published": a real crawlable link to a live page in
// another category (see this file's own header comment). Alt text is the
// card title (owner spec, 2026-09-25).
function card(
  slug: string,
  cardTitle: string,
  gender: StyleCard["gender"],
  href: string,
  cardSubline: string,
): StyleCard {
  return { status: "published", slug, cardTitle, cardSubline, image: "", imageAlt: cardTitle, href, gender };
}

export const runningWear: CuratedCollection = {
  slug: "running-wear",
  menuLabel: "Running Wear",
  // Entity FAQ overrides (owner spec, 2026-09-25).
  manufacturerNoun: "Running Wear",
  productNounPlural: "running wear",
  entityExampleStyles: "running shorts, tees, singlets, tights, sports bras, and jackets",
  entityFabrics: "moisture-wicking polyester and Polyester/Spandex knits",
  h1: "Custom Running Wear Manufacturer",
  metaTitle: "Custom Running Wear Manufacturer",
  // Owner's exact given copy, 150 chars.
  metaDescription:
    "Custom running wear manufacturer: private label running shorts, tees, singlets, tights, sports bras and running jackets, MOQ 50, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "The running edit, built to your brand spec",
  gridSublineMobile: "The running edit, built to your brand spec",
  showGenderFilter: true,
  // Fabric options (owner spec, 2026-09-25), rendered ahead of
  // Customization, same order as every category PLP.
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the big brands",
  fabricOptions: [
    {
      fabric: "Moisture-wicking polyester knit",
      bestFor: "Running tees, singlets and tanks",
      performance: "Light and quick-drying, moves sweat off the skin",
    },
    {
      fabric: "Performance stretch knit (Polyester/Spandex)",
      bestFor: "Long-sleeves, lined shorts and biker shorts",
      performance: "Stretch and recovery for movement, quick-drying",
    },
    {
      fabric: "Compression knit (Nylon/Spandex)",
      bestFor: "Leggings, compression tights and sports bras",
      performance: "Firm compression and recovery, opacity checked on your sample",
    },
    {
      fabric: "Lightweight woven shell (polyester microfiber)",
      bestFor: "Running jackets and short shells",
      performance: "Light, wind-resistant woven face, DWR finish on request",
    },
    {
      fabric: "Mesh",
      bestFor: "Vent panels, liners and hood linings",
      performance: "Adds airflow at the underarm, back and hood",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainable running lines",
      performance: "Recycled content in knit and woven builds",
    },
  ],
  // Same bold runs as every category's own fabricNote (Leggings' pattern).
  fabricNote: [
    { text: "Running fabric weight is " },
    { text: "confirmed on your sample", bold: true },
    { text: ". Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " or a " },
    { text: "Pantone color", bold: true },
    { text: " from your reference." },
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Moisture-wicking polyester, Polyester/Spandex and Nylon/Spandex knits, lightweight woven shells" },
    { title: "Fit and build", body: "Fitted or relaxed, liners, zip pockets, thumbholes, mesh panels" },
    { title: "Performance", body: "Moisture-wicking, quick-dry, reflective trims and prints for low light" },
    { title: "Branding", body: "Sublimation, screen, heat transfer, reflective, embroidery" },
    { title: "Color and print", body: "Custom colors with Pantone matching, paneling and color-blocking" },
    { title: "Labels and packaging", body: "Woven or tear-away labels, hangtags, retail-ready packaging" },
  ],
  qualityHeading: "Built for the miles",
  qualitySubline: "We confirm the wicking, seams and finish on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Moisture-wicking and quick-dry confirmed on the fabric",
    "Flatlock seams checked at stress points for a flat, low-friction finish",
    "Reflective trims and prints checked for placement and adhesion after wash",
    "Fit and recovery hold after repeated wear and wash",
    "Colorfastness checked after wash, no bleed between panels",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  faqHeading: "Top questions from B2B buyers",
  // Entity question ("What does Capriowear manufacture?") is prepended by
  // the page via categoryEntityFaq(), built from the entity fields above.
  faqs: [
    {
      q: "What running wear can you make?",
      a: "Athletic, 2-in-1, biker and zip-pocket shorts, athletic tees, singlets and racerback tanks, fitted performance long-sleeves, compression leggings and tights, high-support sports bras, and lightweight running jackets and quarter-zips, all custom to your brand.",
    },
    {
      q: "What is your MOQ for custom running wear?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Which fabrics do you use for running wear?",
      a: "Moisture-wicking polyester and Polyester/Spandex knits for tees, singlets, bras, tights and lined shorts, Nylon/Spandex for compression pieces, and lightweight woven shells for running jackets, all confirmed on your sample.",
    },
    {
      q: "What makes a jacket suitable for running?",
      a: "A lightweight woven shell with a wind-resistant face, a mesh-lined hood or vents for airflow, and reflective details for low light. A DWR finish can be added so light rain beads off.",
    },
    {
      q: "Can you add reflective details for low light?",
      a: "Yes. Reflective trims, piping and prints are added for visibility, placed to your spec and checked for adhesion after wash.",
    },
    {
      q: "Can you build running styles to reduce chafing?",
      a: "Yes. Moisture-wicking fabrics and flatlock seams are standard on our running styles, and seam placement is checked on your sample before bulk.",
    },
    {
      q: "Can you match a specific fabric or a reference garment?",
      a: "Yes. Send a swatch, reference garment, or tech pack and we source or develop to match, then confirm on your sample before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric and weight, fit, liners and pockets, reflective details, color with Pantone matching, print and embroidery, your logos, labels, hangtags, and packaging.",
    },
    {
      q: "Do you offer OEM, ODM, and private label running wear?",
      a: "Yes, all three. As a private label running wear manufacturer, we make every style under your brand, with your labels and packaging.",
    },
    {
      q: "How is running wear sized?",
      a: "Alpha XS to 5XL, with men's, women's and unisex cuts, and men's shorts can also be graded by waist inch.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, DDP to 20+ countries, including the US, UK, EU, Canada, and Australia, with GSP+ 0% EU duty.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    faqGetStarted,
  ],
  // No ctaReferenceNoun (owner spec, 2026-09-04) -- buildCtaSubline()
  // (./pdpShared.ts) drops the "[X]" clause entirely when this is unset.
  cards: [
    card("mens-athletic-shorts", "Men's Athletic Shorts", "Men", "/capriowear/activewear/shorts/athletic-regular", "Standard athletic fit, 5 to 7 inch inseam, drawcord waistband"),
    card("mens-2-in-1-shorts", "Men's 2-in-1 Shorts", "Men", "/capriowear/activewear/shorts/2-in-1", "Outer shell over a built-in fitted liner, mid-length inseam"),
    card("mens-athletic-t-shirt", "Men's Athletic T-Shirt", "Men", "/capriowear/activewear/t-shirts/athletic-mens", "True-to-size training and running cut"),
    card("mens-racerback-singlet", "Men's Racerback Singlet", "Men", "/capriowear/activewear/tank-tops/racerback-singlet", "Fitted singlet, full racerback construction"),
    card("mens-fitted-performance-long-sleeve", "Men's Fitted Performance Long-Sleeve", "Men", "/capriowear/activewear/long-sleeve-tops/fitted-performance", "Moisture-wicking Polyester/Spandex, athletic cut, thumbholes"),
    card("womens-high-rise-biker-shorts", "Women's High-Rise Biker Shorts", "Women", "/capriowear/activewear/shorts/high-rise-biker", "High-rise, fitted bike-short, 5 to 7 inch inseam"),
    card("womens-zip-pocket-shorts", "Women's Zip-Pocket Shorts", "Women", "/capriowear/activewear/shorts/zip-pocket", "Discreet zip pocket for a phone or keys"),
    card("womens-athletic-t-shirt", "Women's Athletic T-Shirt", "Women", "/capriowear/activewear/t-shirts/athletic-womens", "True-to-size training cut"),
    card("womens-racerback-tank", "Women's Racerback Tank", "Women", "/capriowear/activewear/tank-tops/racerback-womens", "Fitted, true racerback construction"),
    card("womens-fitted-performance-long-sleeve", "Women's Fitted Performance Long-Sleeve", "Women", "/capriowear/activewear/long-sleeve-tops/fitted-performance-womens", "Thumbholes and mesh underarm panels, moisture-wicking"),
    card("high-rise-compression-leggings", "Custom High-Rise Compression Leggings", "Women", "/capriowear/activewear/leggings/high-waisted-compression", "4-way stretch, squat-proof, high-rise"),
    card("high-support-sports-bra", "Custom High-Support Sports Bra", "Women", "/capriowear/activewear/sports-bras/high-support-full-coverage", "High support, full coverage, wide racerback option"),
    // Unisex: no `gender`, so these show under every chip.
    card("hooded-running-windbreaker", "Custom Hooded Running Windbreaker", undefined, "/capriowear/activewear/jackets/hooded-running-windbreaker", "Hooded, lightweight, mesh-lined hood"),
    card("stretch-woven-performance-jacket", "Custom Stretch-Woven Performance Jacket", undefined, "/capriowear/activewear/jackets/stretch-woven-performance", "Full-zip stretch woven, reflective trims"),
    card("striped-quarter-zip-track-top", "Custom Striped Quarter-Zip Track Top", undefined, "/capriowear/activewear/track-jackets/striped-quarter-zip", "Quarter-zip, contrast sleeve stripes"),
    card("compression-tights", "Custom Compression Tights", undefined, "/capriowear/activewear/compression-base-layers", "Second-skin base-layer fit"),
  ],
};
