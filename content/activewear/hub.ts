// content/activewear/hub.ts
// Copy for the Activewear Landing Hub (/activewear), Mohsin's own spec doc,
// 2026-09-11: a light browse/directory page one level above the 18 real
// Activewear category PLPs (17 in content/activewear/categories.ts, plus
// the standalone running-wear page) -- not another PLP itself. Unlike the
// Teamwear hub, every PDP under these categories is real/published, but
// this page still owns no products of its own. American spelling, no
// en/em dashes, no prices, period-clean headings, per house copy rules.
//
// Group structure below matches `activewearMegaMenu` (content/home.ts)
// exactly -- same 5 groups, same category order within each. If a
// category is ever added, removed, or regrouped in the mega menu, this
// array's own grouping must be updated to match, same "keep the group
// structure in sync with the mega menu, don't let the two drift apart"
// instruction the source doc itself gives. Not derived programmatically
// from `activewearMegaMenu`, since that array has no per-category
// descriptor field this hub's cards need.
import type { CategoryGroup } from "../hubTypes";
import { SITE_URL } from "../site";

export type { CategoryGroup, CategoryLink } from "../hubTypes";

export const categoryGroups: CategoryGroup[] = [
  {
    eyebrow: "TOPS",
    h2: "Everyday tops, built for performance",
    categories: [
      { label: "Sports Bras", descriptor: "High, medium and light support", href: "/activewear/sports-bras" },
      { label: "Tank Tops", descriptor: "Racerback to stringer cuts", href: "/activewear/tank-tops" },
      { label: "T-Shirts", descriptor: "Performance and everyday knits", href: "/activewear/t-shirts" },
      { label: "Long-Sleeve Tops", descriptor: "Fitted performance layers", href: "/activewear/long-sleeve-tops" },
      { label: "Hoodies", descriptor: "French terry to brushed fleece", href: "/activewear/hoodies" },
      { label: "Sweatshirts", descriptor: "Crewneck and half-zip fleece", href: "/activewear/sweatshirts" },
    ],
  },
  {
    eyebrow: "BOTTOMS",
    h2: "Leggings, shorts and everything between",
    categories: [
      { label: "Leggings", descriptor: "Compression to flare and scrunch", href: "/activewear/leggings" },
      { label: "Shorts", descriptor: "Training, running and lined styles", href: "/activewear/shorts" },
      {
        label: "Joggers & Track Pants",
        descriptor: "Fleece joggers to woven track pants",
        href: "/activewear/joggers-track-pants",
      },
    ],
  },
  {
    eyebrow: "SETS AND ONE-PIECES",
    h2: "Matched sets and one-piece builds",
    categories: [
      { label: "Yoga Sets", descriptor: "Cut and dyed together for a true match", href: "/activewear/yoga-sets" },
      { label: "Bodysuits", descriptor: "Fitted one-piece, hip-length closure", href: "/activewear/bodysuits" },
      { label: "Jumpsuits", descriptor: "Full-length and cropped unitards", href: "/activewear/jumpsuits" },
    ],
  },
  {
    eyebrow: "OUTERWEAR AND SUITS",
    h2: "Jackets, tracksuits and warm-up wear",
    categories: [
      { label: "Jackets", descriptor: "Woven shells, water-repellent to waterproof", href: "/activewear/jackets" },
      {
        label: "Track Jackets & Zip-Ups",
        descriptor: "Brushed tricot, full and quarter zip",
        href: "/activewear/track-jackets",
      },
      { label: "Tracksuits", descriptor: "Matched tricot warm-up sets", href: "/activewear/tracksuits" },
      {
        label: "Sweatsuits",
        descriptor: "Matched fleece hoodie and sweatpant sets",
        href: "/activewear/sweatsuits",
      },
      {
        label: "Running Wear",
        descriptor: "A curated running edit across categories",
        href: "/activewear/running-wear",
      },
    ],
  },
  {
    eyebrow: "BASE LAYERS",
    h2: "Compression and cold-weather layers",
    categories: [
      {
        label: "Compression & Base Layers",
        descriptor: "Documented mmHg, zonal panelling",
        href: "/activewear/compression-base-layers",
      },
    ],
  },
];

export const activewearHub = {
  // Renders as "%s | Capriowear" via the root layout's title template
  // (same convention as content/services.ts and content/teamwear/hub.ts)
  // -- the doc's own exact tag ("Custom Activewear Manufacturer |
  // Capriowear," 54 chars) is this string plus that template's own
  // suffix, not stored with the suffix baked in.
  metaTitle: "Custom Activewear Manufacturer",
  metaDescription:
    "Custom activewear manufacturer in Sialkot, Pakistan. Private label and OEM from fabric to packaging across 18 categories, low MOQ, samples in 10 to 14 days.",

  // Hero is `CategoryBanner` alone (breadcrumb, H1, fact strip) -- lesson
  // carried over from the Teamwear hub build (owner feedback there:
  // "remove this from banner, use the same banner style height spacing
  // that we have for plp"). No subline/CTA row in the banner itself.
  hero: {
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Activewear", href: "/activewear" },
    ],
    h1: "Custom Activewear Manufacturer",
    trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "18 categories", "DDP to 20+ countries"],
  },

  overview: {
    eyebrow: "WHY CAPRIOWEAR",
    h2: "One factory, every activewear category your brand needs",
    // Segment array, matching the Teamwear hub's own `overview.lead` shape
    // (owner request, 2026-09-11: "why capriowear, use the same style used
    // on teamwear") -- same `string | { bold: string }` pattern
    // `content/home.ts`'s own `trustStrip[].body` already uses.
    lead: [
      "Capriowear manufactures custom and private label activewear across ",
      { bold: "18 categories" },
      ", from leggings and sports bras to jackets and matched sets, made to your spec from sample to bulk in ",
      { bold: "our own cut-and-sew facility in Sialkot, Pakistan" },
      ".",
    ],
    // Title+body pairs, matching the Teamwear hub's own `CapabilityCard`
    // differentiators (owner: "use the same style used on teamwear") --
    // the source doc's own two prose lines split into a short title plus
    // that same sentence as the body, not reworded.
    differentiators: [
      {
        title: "Fabric to finished packaging, one factory",
        body: "One factory, from fabric to finished packaging, not a trading agent placing your order elsewhere.",
      },
      {
        title: "Same fabric platforms, without the minimums",
        body: "Built on the same fabric platforms leading activewear brands use, without their minimums.",
      },
    ],
  },

  trust: {
    eyebrow: "AUDITED, NOT JUST PROMISED",
    heading: "Certified and inspected, category after category",
    subline: "Every certification below applies across all 18 categories.",
    points: [
      "ISO 9001, ISO 45001, ISO 14001, BSCI, IMAC and SGS certified",
      "Every run inspected to AQL 2.5, in-line and pre-shipment",
      "NDA signed before any tech pack",
    ],
  },

  faq: {
    eyebrow: "GOOD TO KNOW",
    h2: "Activewear manufacturing, answered",
    items: [
      {
        q: "What activewear categories does Capriowear manufacture?",
        a: "18 categories across tops, bottoms, sets and one-pieces, outerwear and suits, and base layers, from leggings and sports bras to jackets, tracksuits and compression wear, all made in-house in Sialkot, Pakistan.",
      },
      {
        q: "Can I order across multiple categories in one order?",
        a: "Yes. Many brands launch or reorder across several categories at once, for example leggings, sports bras and a jacket in the same production run, each still built to its own spec.",
      },
      {
        q: "What is the minimum order quantity?",
        a: "From 50 pieces per style, across every category, scaling to full bulk.",
      },
      {
        q: "Do you offer OEM, ODM and private label manufacturing?",
        a: "Yes, all three, across the entire activewear range, made under your brand.",
      },
      {
        q: "How long do samples take?",
        a: "Samples in 10 to 14 days, regardless of category.",
      },
      {
        q: "Will my designs stay confidential?",
        a: "Yes. We sign an NDA before any tech pack is shared.",
      },
      {
        q: "How do I get started?",
        a: "Pick the category closest to what you need, or send your tech pack, sketch or reference directly, and we will reply within 24 hours with next steps.",
      },
    ],
  },

  finalCta: {
    h2: "Let's build your custom collection",
    subline: "Share your tech pack, sketch or a reference. We'll come back within 24 hours with next steps.",
    cta: { label: "Request a Sample", href: "/request-a-sample" },
    crossLinks: [
      { label: "Teamwear", href: "/teamwear" },
      { label: "Our Factory", href: "/our-factory" },
      { label: "Services", href: "/services" },
    ],
    complianceBar: [
      "NDA before tech pack",
      "Pre-shipment inspection",
      "GSP+ Form A per container",
      "AQL 2.5 inspection",
      "ISO 9001 certified",
    ],
  },
};

export const ACTIVEWEAR_HUB_CANONICAL = `${SITE_URL}/activewear`;
