// content/activewear/long-sleeve-tops.ts
// Long-Sleeve Tops PLP, a pure content/data drop on the shared Category
// shape (content/activewear/types.ts) -- no edits to the [category] route,
// app/sitemap.ts or lib/schema.ts. Rebuilt 2026-09-23 from the owner's
// capriowear-longsleeve-plp-content.md brief, same Tank Tops PLP pattern
// (title/meta/hero/fabric/customization/trust/FAQ), minus the gender split:
//
// No gender toggle (owner spec, 2026-09-23): unlike T-Shirts and Tank Tops,
// this category has had no brand-convergence research pass, so there is
// no men's/women's SKU split yet. `showGenderFilter: false` and no card
// carries a `gender` field. Add both only once that research exists.
//
// No `weightTiers` table any more (the 2026-09-02 build had one): the brief
// states no GSM or composition beyond what the fabric table itself lists,
// so the old tier ranges were dropped rather than kept as unsourced claims.
//
// The PLP itself goes live; every style is "draft" (owner spec): each card
// shows on the grid, non-clickable, no PDP route generated, excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema
// (omitted entirely while zero styles are published). Flip a style to
// "published" only once its PDP is sampled, photographed and built.
import type { Category } from "./types";

export const longSleeveTops: Category = {
  slug: "long-sleeve-tops",
  group: "Activewear",
  menuLabel: "Long-Sleeve Tops",
  // Entity FAQ fields -- with these, categoryEntityFaq() (./pdpShared.ts)
  // renders the brief's own entity answer word for word: "a custom long
  // sleeve shirt manufacturer", "private label long-sleeve tops", then the
  // 8 styles, then companyIdentity. No entityFabrics (the brief's answer
  // has no fabrics clause).
  manufacturerNoun: "Long Sleeve Shirt",
  productNounPlural: "long-sleeve tops",
  entityExampleStyles:
    "crew, fitted performance, henley, quarter-zip, hooded, oversized, raglan, and waffle thermal styles",
  h1: "Custom Long Sleeve Shirt Manufacturer",
  metaTitle: "Custom Long Sleeve Shirt Manufacturer",
  metaDescription:
    "Custom long sleeve shirt manufacturing for activewear and teamwear brands. Request samples, MOQs, and turnaround from a long sleeve apparel manufacturer built for bulk orders, OEM, ODM, and private label, any fabric and color, DDP worldwide.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Cotton or cotton-blend jersey",
      bestFor: "Crew long-sleeve tee, henley",
      performance: "Soft hand, breathable",
    },
    {
      fabric: "Waffle/thermal knit, cotton-spandex (96% cotton / 4% spandex)",
      bestFor: "Fitted athletic thermal long-sleeve with thumbholes",
      performance: "6 oz, ~203 GSM, honeycomb texture, stretch recovery",
    },
    {
      fabric: "Waffle/thermal knit, heavier 100% cotton",
      bestFor: "Streetwear/workwear henleys, cold-weather wear",
      performance: "Heavyweight, GSM pending, confirmed on sample",
    },
    {
      fabric: "Brushed-back jersey",
      bestFor: "Warmth without full waffle construction",
      performance: "Pending, confirmed on sample",
    },
    {
      fabric: "Performance poly-spandex (90% polyester / 10% spandex)",
      bestFor: "Fitted athletic long-sleeves, quarter-zip pullovers",
      performance: "Four-way stretch, moisture-wicking, lightweight",
    },
    {
      fabric: "Modal or similar smooth-handfeel blends",
      bestFor: "Hooded henley hybrid programs",
      performance: "Pending, confirmed on sample",
    },
  ],
  fabricNote: [
    {
      text: "No GSM or composition figure beyond the table above is stated here. Fabric weight is confirmed per style on your sample, not estimated. ",
    },
    { text: "Swatches before every bulk run", bold: true },
    { text: ", and we can source or match a specific fabric from your reference." },
  ],
  // Short PDP-facing pill labels for the same 6 fabrics above, same order.
  fabricPills: [
    "Cotton jersey",
    "Waffle knit, cotton-spandex",
    "Heavyweight cotton waffle",
    "Brushed-back jersey",
    "Poly-spandex",
    "Modal blend",
  ],
  // The brief's "TESTED BEFORE BULK" eyebrow isn't rendered: TrustPoints has
  // no eyebrow by design (see its own header comment), same as Tank Tops.
  qualityHeading: "Sleeve length that holds, cuffs that stay in place",
  qualitySubline: "We confirm it all on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Sleeve length graded proportionally across the full size run",
    "Cuff and thumbhole placement checked across sizes",
    "Waffle/thermal shape retention and stretch recovery tested after wash",
    "Henley plackets checked for secure buttons and flat lie, no gapping",
    "Every run inspected to AQL 2.5",
    "Third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  // Owner-locked 6-item copy (2026-09-23), verbatim apart from the leading
  // capital each body takes on every category. The brief's "Explore full
  // customization" link isn't rendered: WhatWeCover has no link slot.
  coverageItems: [
    { title: "Fabric", body: "Cotton, cotton-blend, waffle/thermal, performance poly, poly-spandex" },
    {
      title: "Fit and neckline",
      body: "Fitted athletic, relaxed, or oversized; crew, henley placket with button count, mock neck, or quarter-zip",
    },
    {
      title: "Sleeve, cuff, and construction",
      body: "Set-in, raglan, or drop-shoulder sleeve; ribbed, hemmed, raw-edge, or thumbhole cuff; hood (hooded henley hybrid) and articulated elbow/back darts as upgrades",
    },
    {
      title: "Branding",
      body: "Your logos by print, silicone, heat transfer, or embroidery, including sleeve and cuff placement",
    },
    { title: "Labels", body: "Woven, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  // Entity question is prepended at render time by categoryEntityFaq(), not
  // stored here -- see the entity fields above.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom long-sleeve tops?",
      a: "From 50 pieces per style, mix sizes freely within a colorway.",
    },
    {
      q: "Which fabrics do you use for long-sleeve tops?",
      a: "Cotton and cotton-blend jersey, waffle/thermal knit, performance poly-spandex, and modal blends, confirmed on your sample.",
    },
    {
      q: "What is the difference between a performance long-sleeve and a compression long-sleeve?",
      a: "Fit intent. Compression sits tight against the skin for muscle support and blood flow (our Compression and Base Layers line). Performance is a more relaxed athletic fit for moisture-wicking and mobility, even with spandex content. We can help place your concept in the right category.",
    },
    {
      q: "Do you offer thumbholes as standard?",
      a: "Yes, standard on our fitted performance long-sleeve, not a special order.",
    },
    {
      q: "Can sleeve length and cuff style be customized to a reference garment?",
      a: "Yes, send a reference or tech pack.",
    },
    {
      q: "How many buttons does the henley placket have?",
      a: "2 to 5, depending on your positioning.",
    },
    {
      q: "Can you match a specific fabric weight or reference garment?",
      a: "Yes, swatches shared before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Fabric, fit, neckline, cuff type, sleeve construction, hood, articulated darts, color, print/embroidery placement (incl. sleeve and cuff), logos, labels, hangtags, packaging.",
    },
    {
      q: "Do you offer OEM, ODM, and private label long-sleeve tops?",
      a: "Yes, all three.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples 10 to 14 days; bulk lead time confirmed on quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, 20+ countries, DDP.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes, NDA before any tech pack.",
    },
    {
      q: "How do I get started?",
      a: "Tech pack, sketch, or reference top via contact form, response within 24 hours.",
    },
  ],
  ctaReferenceNoun: "long-sleeve top",
  // 8 styles, all draft (owner spec). Card title carries "Custom"; pdpHeading
  // is the card title + " Manufacturer" (card-title rule). Slugs are
  // not-yet-final while draft -- they become permanent URLs only on publish.
  styleCards: [
    {
      status: "draft",
      slug: "crew",
      sku: "CAP-LSL-01",
      cardTitle: "Custom Crew Long-Sleeve Tee",
      pdpHeading: "Custom Crew Long-Sleeve Tee Manufacturer",
      cardSubline: "Standard crew neckline, cotton or cotton-blend jersey",
      image: "",
      imageAlt: "Custom crew long-sleeve tee, standard crew neckline, cotton or cotton-blend jersey",
      href: "/capriowear/activewear/long-sleeve-tops/crew",
    },
    {
      status: "draft",
      slug: "fitted-performance",
      sku: "CAP-LSL-02",
      cardTitle: "Custom Fitted Performance Long-Sleeve",
      pdpHeading: "Custom Fitted Performance Long-Sleeve Manufacturer",
      cardSubline: "Moisture-wicking poly-spandex, athletic cut, thumbholes standard",
      image: "",
      imageAlt: "Custom fitted performance long-sleeve, moisture-wicking poly-spandex, athletic cut with thumbholes",
      href: "/capriowear/activewear/long-sleeve-tops/fitted-performance",
    },
    {
      status: "draft",
      slug: "henley",
      sku: "CAP-LSL-03",
      cardTitle: "Custom Henley Long-Sleeve",
      pdpHeading: "Custom Henley Long-Sleeve Manufacturer",
      cardSubline: "Collarless neckline, 2 to 5 button placket",
      image: "",
      imageAlt: "Custom henley long-sleeve, collarless neckline with a 2 to 5 button placket",
      href: "/capriowear/activewear/long-sleeve-tops/henley",
    },
    {
      status: "draft",
      slug: "quarter-zip",
      sku: "CAP-LSL-04",
      cardTitle: "Custom Quarter-Zip Long-Sleeve",
      pdpHeading: "Custom Quarter-Zip Long-Sleeve Manufacturer",
      cardSubline: "Partial front zip, standing mock collar",
      image: "",
      imageAlt: "Custom quarter-zip long-sleeve, partial front zip with a standing mock collar",
      href: "/capriowear/activewear/long-sleeve-tops/quarter-zip",
    },
    {
      status: "draft",
      slug: "hooded",
      sku: "CAP-LSL-05",
      cardTitle: "Custom Hooded Long-Sleeve Tee",
      pdpHeading: "Custom Hooded Long-Sleeve Tee Manufacturer",
      cardSubline: "Henley or crew long-sleeve with an attached hood",
      image: "",
      imageAlt: "Custom hooded long-sleeve tee, henley or crew long-sleeve with an attached hood",
      href: "/capriowear/activewear/long-sleeve-tops/hooded",
    },
    {
      status: "draft",
      slug: "oversized",
      sku: "CAP-LSL-06",
      cardTitle: "Custom Oversized Long-Sleeve",
      pdpHeading: "Custom Oversized Long-Sleeve Manufacturer",
      cardSubline: "Loose, boxy streetwear fit",
      image: "",
      imageAlt: "Custom oversized long-sleeve, loose boxy streetwear fit",
      href: "/capriowear/activewear/long-sleeve-tops/oversized",
    },
    {
      status: "draft",
      slug: "raglan",
      sku: "CAP-LSL-07",
      cardTitle: "Custom Raglan Long-Sleeve",
      pdpHeading: "Custom Raglan Long-Sleeve Manufacturer",
      cardSubline: "Diagonal raglan sleeve, improved shoulder flexibility",
      image: "",
      imageAlt: "Custom raglan long-sleeve, diagonal raglan sleeve for shoulder flexibility",
      href: "/capriowear/activewear/long-sleeve-tops/raglan",
    },
    {
      status: "draft",
      slug: "waffle-thermal",
      sku: "CAP-LSL-08",
      cardTitle: "Custom Waffle Thermal Long-Sleeve",
      pdpHeading: "Custom Waffle Thermal Long-Sleeve Manufacturer",
      cardSubline: "Honeycomb-textured knit, fitted or heavyweight",
      image: "",
      imageAlt: "Custom waffle thermal long-sleeve, honeycomb-textured knit, fitted or heavyweight",
      href: "/capriowear/activewear/long-sleeve-tops/waffle-thermal",
    },
  ],
  relatedLinks: [
    { label: "T-Shirts", href: "/capriowear/activewear/t-shirts" },
    { label: "Tank Tops", href: "/capriowear/activewear/tank-tops" },
    { label: "Hoodies", href: "/capriowear/activewear/hoodies" },
  ],
};
