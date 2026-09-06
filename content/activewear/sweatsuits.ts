// content/activewear/sweatsuits.ts
// Fifteenth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every category
// before it (owner spec, 2026-09-03): no edits to app/activewear/
// [category]/[style]/page.tsx, app/sitemap.ts, or lib/schema.ts, only this
// file plus one line in ./categories.ts. Fourth category under the
// "OUTWEAR & SUITS" mega-menu group (content/home.ts), after Jackets,
// Track Jackets & Zip-Ups and Tracksuits.
//
// Uses the reusable `weightTiers` block for fleece GSM (owner spec,
// 2026-09-03), the default "Tier"/"GSM"/"Best for" headers -- no
// `weightTiersHeaders` override needed, same shape T-Shirts/Hoodies/
// Sweatshirts/Long-Sleeve Tops/Joggers & Track Pants already use.
// Explicit category boundary, carried into the fabric note and one FAQ
// answer below: a sweatsuit is the fleece set (French terry or brushed
// fleece); the tricot/woven warm-up set is Tracksuits, a separate
// category, not this one.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave ("Share
// your tech pack, sketch or a reference sweatsuit. We'll come back within
// 24 hours with next steps.") -- standing rule, owner spec, 2026-09-02
// (see every category since Sweatshirts' own header comment and the
// decision log entries of that date): every category file uses Leggings'
// own ctaSubline verbatim, regardless of what a category's own brief
// supplies here.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const sweatsuits: Category = {
  slug: "sweatsuits",
  group: "Activewear",
  menuLabel: "Sweatsuits",
  // Entity FAQ overrides (owner's exact given values, 2026-09-03).
  manufacturerNoun: "Sweatsuit",
  productNounPlural: "sweatsuits",
  entityExampleStyles: "hoodie and sweatpant, crewneck and sweatpant, and oversized set styles",
  entityFabrics: "French terry and brushed fleece",
  h1: "Custom Sweatsuit Manufacturer",
  metaTitle: "Custom Sweatsuit Manufacturer",
  // Owner's exact given copy, 161 chars -- within this project's own
  // documented AEO allowance, essentials front-loaded in the first ~155.
  metaDescription:
    "Custom sweatsuit manufacturer, matching fleece set, hoodie and sweatpant dyed together from one lot, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 40+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "French terry (loopback, unbrushed)",
      bestFor: "Lighter, structured sweatsuits",
      performance: "Smooth face, looped interior, breathes, resists pilling",
    },
    {
      fabric: "Brushed fleece",
      bestFor: "Warmer, plusher classic sweatsuits",
      performance: "Napped soft interior, warmer at the same weight",
    },
    {
      fabric: "Cotton-poly blend (commonly 80/20)",
      bestFor: "Retail, promo and team programs",
      performance: "Balances cost, shrink control and print stability",
    },
    {
      fabric: "100% cotton, compacted",
      bestFor: "Premium retail and streetwear sets",
      performance: "Softer hand, compacted for shrink control",
    },
    {
      fabric: "Recycled fiber blend",
      bestFor: "Sustainable lines",
      performance: "Comparable to cotton-poly, eco-positioning",
    },
  ],
  weightTiers: [
    {
      tier: "Lightweight",
      gsm: "240 to 320 GSM",
      bestFor: "Spring and fall sets, promo and team programs",
    },
    {
      tier: "Midweight",
      gsm: "300 to 400 GSM",
      bestFor: "The most common band, everyday retail sweatsuits",
    },
    {
      tier: "Heavyweight",
      gsm: "400 to 500+ GSM",
      bestFor: "Premium streetwear, structured oversized sets",
    },
  ],
  fabricNote: [
    {
      text: "Both pieces share the same fleece, GSM and ribbing so the set truly matches. Sweatsuits are the fleece set; for the tricot/woven warm-up set see our ",
    },
    { text: "Tracksuits", bold: true },
    { text: " range. Ribbing carries " },
    { text: "5 to 8% spandex", bold: true },
    { text: " for recovery. Garment-dye available. Swatches before every bulk run, and we can source or match a specific fleece or GSM from your reference." },
  ],
  fabricPills: ["French terry", "Brushed fleece", "Cotton-poly blend", "100% cotton", "Recycled fiber blend"],
  qualityHeading: "Matched fleece, top to bottom",
  qualitySubline: "We cut and dye the top and bottom together and confirm the match on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Top and bottom cut and dyed from the same lot, no mismatched shades",
    "Same fleece, GSM and ribbing across both pieces",
    "Shrinkage tested after wash, targeted under 5%, brushed fleece checked for pilling",
    "Ribbing holds its recovery at cuffs, hem and waistband",
    "Sizing consistent across the run, every top-and-bottom pairing matches",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "French terry or brushed fleece, cotton, cotton-poly and recycled blends, one fleece across both pieces",
    },
    { title: "Weight and fit", body: "Lightweight to heavyweight, 240 to 650+ GSM, regular, oversized or cropped" },
    {
      title: "Top",
      body: "Pullover hoodie, zip hoodie or crewneck, single or double-layer hood, kangaroo pocket",
    },
    { title: "Bottom", body: "Matched sweatpant (straight or tapered), cuffed or open hem, or fleece shorts" },
    { title: "Matching", body: "Cut and dyed together, coordinated ribbing, drawcord and trims" },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, screen, DTG, DTF, embroidery, puff, patches, garment-dye",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom sweatsuits?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a sweatsuit and a tracksuit?",
      a: "A sweatsuit is a fleece set, a hoodie or crewneck with a sweatpant, relaxed and built for warmth. A tracksuit is a tricot or woven warm-up set, lightweight and athletic, see our Tracksuits range. We make both.",
    },
    {
      q: "Are the top and bottom dyed together for an exact match?",
      a: "We cut and dye the top and bottom together from the same fleece and lot, so they are one true color with matched GSM and ribbing, not two close pieces.",
    },
    {
      q: "Can pieces be sized separately?",
      a: "Yes. A top size and a bottom size are chosen independently within the set, while the fleece, color and ribbing stay consistent.",
    },
    {
      q: "What GSM fleece is used for a matching set?",
      a: "French terry or brushed fleece, cotton and cotton-poly blends, from lightweight 240 GSM to heavyweight 500+ GSM. Crewneck sets can run a touch lighter than hoodie sets.",
    },
    {
      q: "What set compositions can you build?",
      a: "Hoodie and sweatpant, crewneck and sweatpant, zip-hoodie and sweatpant, oversized, cropped, and hoodie-or-crewneck with fleece shorts.",
    },
    {
      q: "What can I customize?",
      a: "Fleece and weight, fit, hood and pocket, sweatpant cut and hem, matched ribbing and drawcord, color and finish (including garment-dye), print and embroidery, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Can you match a specific fleece or a reference sweatsuit?",
      a: "Yes. Send a reference or tech pack and we match the fleece, GSM and hand, cut and dyed together, then confirm on your sample.",
    },
    {
      q: "Do you offer OEM, ODM and private label sweatsuits?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are sweatsuits sized?",
      a: "Alpha XS to 5XL, with mix-and-match top and bottom sizing, women's, men's and unisex by cut.",
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
      a: "Send your tech pack, sketch or a reference sweatsuit by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // Standing CTA subline, same as every category (owner spec, 2026-09-02) --
  // see this file's own header comment for why this differs from the
  // brief's own given per-category line.
  ctaReferenceNoun: "sweatsuit",
  // Every style is "draft" (owner spec) -- a real name and one-line spec,
  // no PDP content yet. cardTitle form is "Custom [Style]" here, matching
  // the owner's own given titles exactly.
  styleCards: [
    {
      status: "draft",
      slug: "hoodie-sweatpant",
      cardTitle: "Custom Hoodie and Sweatpant Set",
      cardSubline: "Pullover hoodie and matched sweatpant",
      image: "",
      imageAlt: "Custom hoodie and sweatpant set, pullover hoodie and matched sweatpant",
      href: "/activewear/sweatsuits/hoodie-sweatpant",
    },
    {
      status: "draft",
      slug: "crewneck-sweatpant",
      cardTitle: "Custom Crewneck and Sweatpant Set",
      cardSubline: "Crewneck and matched sweatpant",
      image: "",
      imageAlt: "Custom crewneck and sweatpant set, crewneck and matched sweatpant",
      href: "/activewear/sweatsuits/crewneck-sweatpant",
    },
    {
      status: "draft",
      slug: "zip-hoodie",
      cardTitle: "Custom Zip-Hoodie and Sweatpant Set",
      cardSubline: "Full-zip hoodie and matched sweatpant",
      image: "",
      imageAlt: "Custom zip-hoodie and sweatpant set, full-zip hoodie and matched sweatpant",
      href: "/activewear/sweatsuits/zip-hoodie",
    },
    {
      status: "draft",
      slug: "oversized",
      cardTitle: "Custom Oversized Sweatsuit",
      cardSubline: "Boxy heavyweight fleece set",
      image: "",
      imageAlt: "Custom oversized sweatsuit, boxy heavyweight fleece set",
      href: "/activewear/sweatsuits/oversized",
    },
    {
      status: "draft",
      slug: "cropped",
      cardTitle: "Custom Cropped Sweatsuit",
      cardSubline: "Cropped hoodie and jogger, women's",
      image: "",
      imageAlt: "Custom cropped sweatsuit, cropped hoodie and jogger, women's",
      href: "/activewear/sweatsuits/cropped",
    },
    {
      status: "draft",
      slug: "shorts-set",
      cardTitle: "Custom Shorts Sweatsuit Set",
      cardSubline: "Hoodie or crewneck with fleece shorts",
      image: "",
      imageAlt: "Custom shorts sweatsuit set, hoodie or crewneck with fleece shorts",
      href: "/activewear/sweatsuits/shorts-set",
    },
  ],
  // Sibling Outwear & Suits-group category from content/home.ts's own
  // activewearMegaMenu -- Running Wear doesn't have its own content file
  // yet, so linking to real, built categories instead (same "only real
  // hrefs, no invented placeholder pages" rule every prior category's own
  // relatedLinks already follows).
  relatedLinks: [
    { label: "Tracksuits", href: "/activewear/tracksuits" },
    { label: "Hoodies", href: "/activewear/hoodies" },
    { label: "Sweatshirts", href: "/activewear/sweatshirts" },
    { label: "Joggers & Track Pants", href: "/activewear/joggers-track-pants" },
  ],
};
