// content/activewear/running-wear.ts
// A curated collection page (owner spec, 2026-09-03) -- NOT a standard
// product category: see `CuratedCollection`'s own comment in ./types.ts
// for why this is a genuinely different shape, not a `Category` variant.
// This page owns no products; every card below cross-links to an
// EXISTING, already-published category PLP (Shorts, Long-Sleeve Tops,
// T-Shirts, Compression & Base Layers, Jackets), so nothing here 404s and
// nothing generates a new PDP route under /activewear/running-wear. Once
// a running-specific style publishes on its own real category (e.g. a
// running short under Shorts), that one card can be re-pointed from the
// category PLP to that style's own real PDP -- a content-only change,
// same as flipping any `StyleCard.status`.
//
// Rendered by its own static route, app/activewear/running-wear/page.tsx
// -- deliberately NOT added to content/activewear/categories.ts (that
// registry drives both the shared [category] PLP template's
// CollectionPage/ItemList schema and the [category]/[style] PDP route
// generator, neither of which this page should ever produce). Fifth
// category-shaped page under the "OUTWEAR & SUITS" mega-menu group
// (content/home.ts), after Jackets, Track Jackets & Zip-Ups, Tracksuits
// and Sweatsuits -- the group's own mega-menu href already points to
// /activewear/running-wear (no fix needed, confirmed before writing this
// file, after the Track Jackets & Zip-Ups mega-menu mismatch found
// 2026-09-03).
//
// No fabric options table, no weight tiers -- this brief's own section
// list omits FabricOptions entirely (unlike every real category so far):
// this page has no fabric of its own, only an edit across other
// categories' fabrics, so app/activewear/running-wear/page.tsx never
// renders that section for it.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-page line this brief's own copy gave ("Share your
// tech pack, sketch or a reference. We'll come back within 24 hours with
// next steps.") -- standing rule, owner spec, 2026-09-02 (see every
// category since Sweatshirts' own header comment and the decision log
// entries of that date): every Activewear page under FinalCta uses
// Leggings' own ctaSubline verbatim, regardless of what a given brief
// supplies here.
import type { CuratedCollection } from "./types";

export const runningWear: CuratedCollection = {
  slug: "running-wear",
  menuLabel: "Running Wear",
  // Entity FAQ overrides (owner's exact given values, 2026-09-03).
  manufacturerNoun: "Running Wear",
  productNounPlural: "running wear",
  entityExampleStyles: "running shorts, tights, tops, and jackets",
  entityFabrics: "moisture-wicking polyester and nylon spandex",
  h1: "Custom Running Wear Manufacturer",
  metaTitle: "Custom Running Wear Manufacturer",
  // Owner's exact given copy, 159 chars -- within Google's own ~155-160
  // char truncation point.
  metaDescription:
    "Custom running apparel manufacturer, lightweight running jackets, split running shorts, reflective trims, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "The running edit, built to your brand spec",
  gridSublineMobile: "The running edit, built to your brand spec",
  showGenderFilter: true,
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Moisture-wicking polyester, nylon spandex, and lightweight woven shells" },
    { title: "Fit and build", body: "Fitted or relaxed, split hems, liners, thumbholes, packable shells" },
    { title: "Performance", body: "Moisture-wicking, quick-dry, reflective trims and prints for low light" },
    { title: "Branding", body: "Sublimation, screen, heat transfer, reflective, embroidery" },
    { title: "Color and print", body: "Custom colors with Pantone matching, paneling and color-blocking" },
    { title: "Labels and packaging", body: "Woven or tear-away labels, hangtags, retail-ready packaging" },
  ],
  qualityHeading: "Built for the miles",
  qualitySubline: "We confirm the wicking, seams and finish on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Moisture-wicking and quick-dry confirmed on the fabric",
    "Flatlock seams tested, no chafe over distance",
    "Reflective trims and prints checked for placement and durability",
    "Fit and recovery hold after repeated wear and wash",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What running wear can you make?",
      a: "Running split and 2-in-1 lined shorts, compression tights and tops, moisture-wicking performance tees and long-sleeves, and lightweight windbreakers and vests, all custom to your brand.",
    },
    {
      q: "What is your MOQ for custom running wear?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What makes a jacket suitable for running?",
      a: "A lightweight woven shell that packs down small, moisture-wicking polyester and poly-spandex for tops, tights and lined shorts, and compression knits for base layers.",
    },
    {
      q: "Can you add reflective detailing for low-light visibility?",
      a: "Yes. Reflective trims, piping and prints are added for visibility, placed to your spec.",
    },
    {
      q: "Is the fabric lightweight and moisture-wicking, chafe-free?",
      a: "Yes. Moisture-wicking fabrics with flatlock seams, tested for chafe over distance, are standard on our running styles.",
    },
    {
      q: "Can you match a specific fabric or a reference garment?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match, then confirm on your sample.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, fit, liner, reflective details, color, print and embroidery, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label running wear?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How is running wear sized?",
      a: "Alpha XS to 5XL, and men's bottoms can also be graded by waist inch. Women's, men's and unisex by cut.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, 20+ countries. DDP to the US, UK, EU, Canada and Australia, with GSP+ 0% EU duty.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch or a reference by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // Standing CTA subline, same as every category (owner spec, 2026-09-02) --
  // see this file's own header comment for why this differs from the
  // brief's own given per-page line.
  // No noun (owner spec, 2026-09-04) -- buildCtaSubline() (./pdpShared.ts)
  // drops the "a reference [X]" clause's bracket entirely when this is
  // omitted, rendering "a reference." verbatim, the owner's own exact
  // given form for this one page.
  // Every card is "published" and clickable -- these are real cross-links
  // to existing, already-live category PLPs, not draft styles waiting on
  // content (see this file's own header comment and CuratedCollection's
  // own comment in ./types.ts for why `status: "published"` is correct
  // here, not a contradiction of the usual "draft until real PDP content
  // exists" rule).
  cards: [
    {
      status: "published",
      slug: "running-split-shorts",
      cardTitle: "Running Split Shorts",
      cardSubline: "Lightweight woven shell, side splits",
      image: "",
      imageAlt: "Custom running split shorts, lightweight woven shell, side splits",
      href: "/activewear/shorts",
    },
    {
      status: "published",
      slug: "2-in-1-lined-shorts",
      cardTitle: "2-in-1 Lined Shorts",
      cardSubline: "Outer short with built-in liner",
      image: "",
      imageAlt: "Custom 2-in-1 lined running shorts, outer short with built-in liner",
      href: "/activewear/shorts",
    },
    {
      status: "published",
      slug: "performance-long-sleeve",
      cardTitle: "Performance Long-Sleeve",
      cardSubline: "Moisture-wicking, thumbholes",
      image: "",
      imageAlt: "Custom performance long-sleeve running top, moisture-wicking, thumbholes",
      href: "/activewear/long-sleeve-tops",
    },
    {
      status: "published",
      slug: "performance-tee",
      cardTitle: "Performance Tee",
      cardSubline: "Moisture-wicking poly, athletic cut",
      image: "",
      imageAlt: "Custom performance running tee, moisture-wicking poly, athletic cut",
      href: "/activewear/t-shirts",
    },
    {
      status: "published",
      slug: "compression-tights",
      cardTitle: "Compression Tights",
      cardSubline: "Documented mmHg, base-layer fit",
      image: "",
      imageAlt: "Custom running compression tights, documented mmHg, base-layer fit",
      href: "/activewear/compression-base-layers",
    },
    {
      status: "published",
      slug: "compression-top",
      cardTitle: "Compression Top",
      cardSubline: "Second-skin, moisture-wicking",
      image: "",
      imageAlt: "Custom running compression top, second-skin, moisture-wicking",
      href: "/activewear/compression-base-layers",
    },
    {
      status: "published",
      slug: "windbreaker-jacket",
      cardTitle: "Windbreaker Jacket",
      cardSubline: "Lightweight woven shell, DWR, packable",
      image: "",
      imageAlt: "Custom running windbreaker jacket, lightweight woven shell, DWR, packable",
      href: "/activewear/jackets",
    },
    {
      status: "published",
      slug: "running-vest-gilet",
      cardTitle: "Running Vest / Gilet",
      cardSubline: "Sleeveless shell for layering",
      image: "",
      imageAlt: "Custom running vest or gilet, sleeveless shell for layering",
      href: "/activewear/jackets",
    },
  ],
};
