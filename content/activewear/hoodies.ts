// content/activewear/hoodies.ts
// Hoodies PLP, rebuilt from the owner's final content brief (2026-09-24):
// 16 draft SKUs (CAP-HOO-01 to 16), 1 to 8 men's and 9 to 16 women's, in
// SKU order. Replaces the earlier 6-card test version entirely; its old
// slugs (pullover, oversized, full-zip, cropped, quarter-zip, stringless)
// stay 404 with no redirects. Same locked PLP template and data shape as
// Sweatshirts and Tank Tops.
//
// Every style is "draft" with no PDP content, so each card is a
// non-clickable tile, with no route, no sitemap entry and no ItemList
// entry. A card becomes a link on its own once its PDP content lands
// here (isDraftPdpReachable(), ./pdpShared.ts).
import type { Category } from "./types";
import { faqGetStarted } from "./pdpShared";

export const hoodies: Category = {
  slug: "hoodies",
  group: "Activewear",
  menuLabel: "Hoodies",
  // Entity FAQ parts (categoryEntityFaq(), ./pdpShared.ts). No
  // `entityFabrics`: the brief's entity answer names styles only.
  manufacturerNoun: "Hoodie",
  productNounPlural: "hoodies",
  entityExampleStyles:
    "oversized, full-zip, regular-fit, technical performance, quarter-zip, and heavyweight styles for men, and oversized, full-zip, regular-fit, technical performance, quarter-zip, and cropped styles for women",
  h1: "Custom Hoodie Manufacturer",
  metaTitle: "Custom Hoodie Manufacturer",
  // 161 chars, owner-confirmed as written (soft 150 to 160 target).
  metaDescription:
    "Custom hoodie manufacturer: private label pullover, full-zip and heavyweight hoodies in French terry or brushed fleece, MOQ from 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  // Same sitewide H2 wording and "\n" line break as every category.
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "French terry (loopback, unbrushed)",
      bestFor: "Structured, breathable hoodies, screen print and DTG",
      performance: "Smooth face, looped interior, breathes, resists pilling, holds its shape",
    },
    {
      fabric: "Brushed fleece",
      bestFor: "Warmer, plusher classic hoodie feel, embroidery",
      performance: "Napped soft interior, warmer at the same weight, a fuller hand for dimensional embroidery",
    },
    {
      fabric: "Cotton/Polyester blend (commonly 80/20)",
      bestFor: "Retail, promo, and uniform programs",
      performance: "Balances cost, shrink control, and embroidery stability",
    },
    {
      fabric: "100% cotton, compacted",
      bestFor: "Premium retail and heavyweight streetwear",
      performance: "Softer hand, compacted for shrink control",
    },
    {
      fabric: "Technical performance knit (Polyester/Spandex)",
      bestFor: "Training and performance hoodies",
      performance: "Sweat-wicking, 4-way stretch, fast-drying",
    },
    {
      fabric: "Polyester/Modal stretch",
      bestFor: "Lounge and soft-hand styles",
      performance: "Soft, stretchy, drapes close to the body",
    },
    {
      fabric: "Recycled fiber blend",
      bestFor: "Sustainable lines",
      performance: "Comparable to standard cotton-poly, eco-positioning",
    },
  ],
  weightTiers: [
    {
      tier: "Lightweight",
      gsm: "240 to 320 GSM",
      bestFor: "Layering, spring and fall, promo and uniform programs",
    },
    {
      tier: "Midweight",
      gsm: "300 to 400 GSM",
      bestFor: "The most common band, everyday retail hoodies",
    },
    {
      tier: "Heavyweight",
      gsm: "400 to 500 GSM",
      bestFor: "Premium streetwear, drop-shoulder cuts, dimensional embroidery",
    },
    {
      tier: "Ultra-heavyweight",
      gsm: "500 to 650+ GSM",
      bestFor: "Luxury basics, cold-climate and statement pieces",
    },
  ],
  fabricNote: [
    { text: "Ribbed cuffs and hem carry " },
    { text: "5 to 8% Spandex", bold: true },
    { text: " for recovery. Garment-dye is available as a premium finish. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric or GSM", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the 7 fabrics above, same order.
  fabricPills: [
    "French terry",
    "Brushed fleece",
    "Cotton/Polyester blend",
    "Compacted cotton",
    "Performance knit",
    "Polyester/Modal stretch",
    "Recycled blend",
  ],
  // No eyebrow on the trust block (TrustPoints takes none).
  qualityHeading: "The weight you approve, wash after wash",
  qualitySubline: "We confirm GSM, shrinkage, and rib recovery on your sample before a single bulk piece is cut",
  qualityPoints: [
    "GSM held consistent, batch to batch, not just on the sample",
    "Shrinkage tested after wash, targeted under 5%, brushed fleece checked for pilling",
    "Cuff and hem ribbing hold their recovery, no bagging",
    "Kangaroo pocket corners bar-tacked and stress-tested",
    "Hood holds its shape after the drawcord is pulled and washed",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "French terry, brushed fleece, cotton-poly, technical performance knit, and recycled blends" },
    { title: "Weight and fit", body: "240 to 650+ GSM, regular, oversized, loose, or cropped" },
    {
      title: "Hood, pocket, and hardware",
      body: "Single or double-layer hood, kangaroo, pouch, or hidden-zip pocket, metal or molded zips, eyelets, and aglets",
    },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, garment-dye, screen, DTG, DTF, embroidery, puff, patches",
    },
    { title: "Labels", body: "Woven, printed, or tear-away labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  // Same sitewide FAQ heading. The entity question (FAQ 1) is built by
  // categoryEntityFaq() from the entity fields above and prepended at
  // render time; the last entry is the shared, locked get-started Q&A.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom hoodies?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between French terry and brushed fleece?",
      a: "French terry has a smooth face and a looped interior. It breathes, resists pilling, and takes screen print crisply. Brushed fleece starts as French terry, then the interior is brushed into a soft pile, giving a warmer, plusher hand and a fuller finish for embroidery. Both come in the same GSM weight tiers.",
    },
    {
      q: "What fabric weights (GSM) do you offer for hoodies?",
      a: "Lightweight 240 to 320 GSM for layering and promo, midweight 300 to 400 GSM for everyday retail hoodies, heavyweight 400 to 500 GSM for premium streetwear, and ultra-heavyweight 500 to 650+ GSM for statement pieces.",
    },
    {
      q: "Are you a heavyweight hoodie manufacturer?",
      a: "Yes. We cut heavyweight hoodies from 400 GSM up to 650+ GSM in 100% cotton or cotton-rich fleece, with drop-shoulder or loose-fit patterns that suit the heavier fabric. Heavyweight fleece also holds dimensional embroidery and puff print best.",
    },
    {
      q: "Can you match a specific GSM or a reference hoodie?",
      a: "Yes. Send a reference or tech pack and we match the fabric construction, GSM, and hand-feel, then confirm on your sample.",
    },
    {
      q: "What hood and pocket options can you make?",
      a: "Single or double-layer hoods, with a double-layer hood holding its shape when the drawcord is pulled. Pockets can be kangaroo, pouch, hidden-zip, or none, with bar-tacked corners at the stress points.",
    },
    {
      q: "What print and branding methods work on fleece?",
      a: "Screen print and DTG on French terry, embroidery and puff on brushed fleece and heavier weights, plus DTF and patches. Below about 280 GSM, embroidery can pucker, so heavier fleece suits embroidery-led designs.",
    },
    {
      q: "Will my hoodies shrink or pill?",
      a: "We test shrinkage after wash, targeting under 5 percent, and check brushed fleece for pilling, before bulk. Cuff and hem ribbing carry Spandex to hold their recovery.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, weight, fit, hood, pocket, zip and drawcord hardware, cuffs, color and finish (including garment-dye), print and embroidery, your logos, labels, hangtags, and packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM, and private label hoodies?",
      a: "Yes, all three. As a private label hoodie manufacturer, we make every style under your brand, with your labels and packaging.",
    },
    {
      q: "How are hoodies sized?",
      a: "Alpha XS to 5XL. Men's and women's hoodies use the same size range with a different cut, men's straighter through the body, women's tapered.",
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
  ctaReferenceNoun: "hoodie",
  // SKU order 1 to 16, never reordered. All card-only drafts: no
  // pdpHeading/specifications yet, so none is a link until its PDP lands.
  styleCards: [
    {
      status: "draft",
      sku: "CAP-HOO-01",
      slug: "oversized-brushed-fleece-mens",
      gender: "Men",
      cardTitle: "Men's Oversized Brushed Fleece Pullover Hoodie",
      cardSubline: "Roomy oversized fit, brushed fleece, kangaroo pocket",
      image: "",
      imageAlt: "Men's Oversized Brushed Fleece Pullover Hoodie, men's",
      href: "/capriowear/activewear/hoodies/oversized-brushed-fleece-mens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-02",
      slug: "full-zip-fleece-mens",
      gender: "Men",
      cardTitle: "Men's Full-Zip Fleece Hoodie",
      cardSubline: "Full front zip, hand pockets, light stretch fleece",
      image: "",
      imageAlt: "Men's Full-Zip Fleece Hoodie, men's",
      href: "/capriowear/activewear/hoodies/full-zip-fleece-mens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-03",
      slug: "regular-fit-brushed-fleece-mens",
      gender: "Men",
      cardTitle: "Men's Regular-Fit Brushed Fleece Pullover Hoodie",
      cardSubline: "Standard fit, cotton-blend brushed fleece, kangaroo pocket",
      image: "",
      imageAlt: "Men's Regular-Fit Brushed Fleece Pullover Hoodie, men's",
      href: "/capriowear/activewear/hoodies/regular-fit-brushed-fleece-mens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-04",
      slug: "technical-performance-mens",
      gender: "Men",
      cardTitle: "Men's Technical Performance Pullover Hoodie",
      cardSubline: "Sweat-wicking performance knit, underarm panels",
      image: "",
      imageAlt: "Men's Technical Performance Pullover Hoodie, men's",
      href: "/capriowear/activewear/hoodies/technical-performance-mens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-05",
      slug: "quarter-zip-mens",
      gender: "Men",
      cardTitle: "Men's Quarter-Zip Fleece Hoodie",
      cardSubline: "Quarter-zip neck, adjustable hood, front pouch pocket",
      image: "",
      imageAlt: "Men's Quarter-Zip Fleece Hoodie, men's",
      href: "/capriowear/activewear/hoodies/quarter-zip-mens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-06",
      slug: "premium-technical-fleece",
      gender: "Men",
      cardTitle: "Men's Premium Technical Fleece Full-Zip Hoodie",
      cardSubline: "Full zip, smooth-faced technical fleece, articulated seams",
      image: "",
      imageAlt: "Men's Premium Technical Fleece Full-Zip Hoodie, men's",
      href: "/capriowear/activewear/hoodies/premium-technical-fleece",
    },
    {
      status: "draft",
      sku: "CAP-HOO-07",
      slug: "lightweight-stretch-performance",
      gender: "Men",
      cardTitle: "Men's Lightweight Stretch Performance Hoodie",
      cardSubline: "Lightweight stretch fabric, fast-drying finish",
      image: "",
      imageAlt: "Men's Lightweight Stretch Performance Hoodie, men's",
      href: "/capriowear/activewear/hoodies/lightweight-stretch-performance",
    },
    {
      status: "draft",
      sku: "CAP-HOO-08",
      slug: "heavyweight-loose-fit",
      gender: "Men",
      cardTitle: "Men's Heavyweight Loose-Fit Hoodie",
      cardSubline: "Loose fit, heavyweight cotton, kangaroo pocket",
      image: "",
      imageAlt: "Men's Heavyweight Loose-Fit Hoodie, men's",
      href: "/capriowear/activewear/hoodies/heavyweight-loose-fit",
    },
    {
      status: "draft",
      sku: "CAP-HOO-09",
      slug: "oversized-brushed-fleece-womens",
      gender: "Women",
      cardTitle: "Women's Oversized Brushed Fleece Pullover Hoodie",
      cardSubline: "Roomy oversized fit, brushed fleece, kangaroo pocket",
      image: "",
      imageAlt: "Women's Oversized Brushed Fleece Pullover Hoodie, women's",
      href: "/capriowear/activewear/hoodies/oversized-brushed-fleece-womens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-10",
      slug: "full-zip-fleece-womens",
      gender: "Women",
      cardTitle: "Women's Full-Zip Fleece Hoodie",
      cardSubline: "Boxy full-zip fit, soft brushed fleece",
      image: "",
      imageAlt: "Women's Full-Zip Fleece Hoodie, women's",
      href: "/capriowear/activewear/hoodies/full-zip-fleece-womens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-11",
      slug: "regular-fit-brushed-fleece-womens",
      gender: "Women",
      cardTitle: "Women's Regular-Fit Brushed Fleece Pullover Hoodie",
      cardSubline: "Standard fit, cotton-blend brushed fleece, kangaroo pocket",
      image: "",
      imageAlt: "Women's Regular-Fit Brushed Fleece Pullover Hoodie, women's",
      href: "/capriowear/activewear/hoodies/regular-fit-brushed-fleece-womens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-12",
      slug: "technical-performance-womens",
      gender: "Women",
      cardTitle: "Women's Technical Performance Pullover Hoodie",
      cardSubline: "Heat-retaining performance interior, streamlined fit",
      image: "",
      imageAlt: "Women's Technical Performance Pullover Hoodie, women's",
      href: "/capriowear/activewear/hoodies/technical-performance-womens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-13",
      slug: "quarter-zip-womens",
      gender: "Women",
      cardTitle: "Women's Quarter-Zip Fleece Hoodie",
      cardSubline: "Half-zip neck, low-shed brushed fleece",
      image: "",
      imageAlt: "Women's Quarter-Zip Fleece Hoodie, women's",
      href: "/capriowear/activewear/hoodies/quarter-zip-womens",
    },
    {
      status: "draft",
      sku: "CAP-HOO-14",
      slug: "oversized-cropped",
      gender: "Women",
      cardTitle: "Women's Oversized Cropped Pullover Hoodie",
      cardSubline: "Oversized fit, shortened cropped body length",
      image: "",
      imageAlt: "Women's Oversized Cropped Pullover Hoodie, women's",
      href: "/capriowear/activewear/hoodies/oversized-cropped",
    },
    {
      status: "draft",
      sku: "CAP-HOO-15",
      slug: "soft-stretch-lounge",
      gender: "Women",
      cardTitle: "Women's Soft-Stretch Lounge Hoodie",
      cardSubline: "Soft Polyester/Modal stretch fabric, relaxed fit",
      image: "",
      imageAlt: "Women's Soft-Stretch Lounge Hoodie, women's",
      href: "/capriowear/activewear/hoodies/soft-stretch-lounge",
    },
    {
      status: "draft",
      sku: "CAP-HOO-16",
      slug: "heavyweight-oversized",
      gender: "Women",
      cardTitle: "Women's Heavyweight Oversized Hoodie",
      cardSubline: "Oversized fit, heavyweight fleece",
      image: "",
      imageAlt: "Women's Heavyweight Oversized Hoodie, women's",
      href: "/capriowear/activewear/hoodies/heavyweight-oversized",
    },
  ],
  // "You may also be interested in": owner-specified set for this rebuild.
  relatedLinks: [
    { label: "Sweatshirts", href: "/capriowear/activewear/sweatshirts" },
    { label: "Joggers", href: "/capriowear/activewear/joggers" },
    { label: "Long-Sleeve Tops", href: "/capriowear/activewear/long-sleeve-tops" },
    { label: "T-Shirts", href: "/capriowear/activewear/t-shirts" },
    { label: "Jackets", href: "/capriowear/activewear/jackets" },
  ],
};
