// content/activewear/long-sleeve-tops.ts
// Long-Sleeve Tops PLP, a pure content/data drop on the shared Category
// shape (content/activewear/types.ts) -- no edits to the [category] route,
// app/sitemap.ts or lib/schema.ts. Rebuilt 2026-09-23 from the owner's
// capriowear-longsleeve-plp-content.md brief, same Tank Tops PLP pattern
// (title/meta/hero/fabric/customization/trust/FAQ), minus the gender split:
//
// Gender toggle (owner spec, 2026-09-23, after the brand-convergence pass):
// All / Women / Men, "All" by default, same ActivewearListing filter as
// T-Shirts. Every card carries `gender`: 6 men's (Crew, Fitted
// Performance, Henley, Quarter-Zip, Fitted Raglan, Mock Neck) and 4
// women's (CAP-LSL-11 to 14).
//
// No `weightTiers` table any more (the 2026-09-02 build had one): the brief
// states no GSM or composition beyond what the fabric table itself lists,
// so the old tier ranges were dropped rather than kept as unsourced claims.
//
// The PLP itself goes live; every style is "draft" (owner spec), excluded
// from app/sitemap.ts and this category's own CollectionPage/ItemList
// schema (omitted entirely while zero styles are published). Card-only
// drafts are non-clickable with no route; drafts with PDP content (SKU 1-4)
// render noindexed via isDraftPdpReachable() -- see styleCards below. Flip a style to
// "published" only once its PDP is sampled, photographed and built.
import { companyIdentity } from "../site";
import type { Category } from "./types";
import { faqGetStarted } from "./pdpShared";

export const longSleeveTops: Category = {
  slug: "long-sleeve-tops",
  group: "Activewear",
  menuLabel: "Long-Sleeve Tops",
  // Entity FAQ: verbatim override (owner, 2026-09-23), shown identically on
  // the PLP and every PDP via categoryEntityFaq() (./pdpShared.ts). The
  // brand-convergence research superseded the original 8-style list, and the
  // new wording ("across men's and women's lines", no "with low minimums and
  // full customization") is a sentence the template can't build, so
  // entityQuestion/entityAnswer replace it. companyIdentity is still
  // imported, never retyped. manufacturerNoun/productNounPlural are kept for
  // shape parity, the template no longer reads them for this category.
  manufacturerNoun: "Long Sleeve Shirt",
  productNounPlural: "long-sleeve tops",
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer: `Capriowear is a custom long sleeve shirt manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label long-sleeve tops from fabric to packaging, across men's and women's lines, including crew, fitted performance, henley, and quarter-zip styles, with additional men's and women's styles available on request. ${companyIdentity}`,
  h1: "Custom Long Sleeve Shirt Manufacturer",
  metaTitle: "Custom Long Sleeve Shirt Manufacturer",
  metaDescription:
    "Custom long sleeve shirt manufacturing for activewear and teamwear brands. Request samples, MOQs, and turnaround from a long sleeve apparel manufacturer built for bulk orders, OEM, ODM, and private label, any fabric and color, DDP worldwide.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  // Rebuilt 2026-09-23 (owner) to the current 10-style range; rows tied
  // to retired styles (Hooded, Waffle Thermal) removed.
  fabricOptions: [
    {
      fabric: "Cotton or cotton-blend jersey",
      bestFor: "Crew long-sleeve tee, henley, both genders",
      performance: "Soft hand, breathable, the direct long-sleeve extension of our tee fabric platform",
    },
    {
      fabric: "Heavier thermal cotton (190 GSM reference)",
      bestFor: "Streetwear and workwear henleys",
      performance: "100% cotton, sourced weight, pending confirmed on your sample for other builds",
    },
    {
      fabric: "Stretch tri-blend or waffle-knit",
      bestFor: "Fitted raglan long-sleeve",
      performance: "46% cotton / 46% lyocell / 8% elastane, 165 GSM on the tri-blend route, or a waffle-knit alternate",
    },
    {
      fabric: "Performance poly-spandex",
      bestFor: "Fitted performance long-sleeves, quarter-zip pullovers, both genders",
      performance: "Four-way stretch, moisture-wicking, lightweight",
    },
    {
      fabric: "Performance poly (recycled)",
      bestFor: "Fitted cropped long-sleeve, women's",
      performance: "At least 75% recycled polyester on our reference, jacquard elastic hem finishing",
    },
    {
      fabric: "Lightweight stretch cotton knit",
      bestFor: "Midi-length long-sleeve, women's",
      performance: "Pending, confirmed on your sample",
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
    "Heavier thermal cotton",
    "Stretch tri-blend or waffle-knit",
    "Performance poly-spandex",
    "Recycled performance poly",
    "Lightweight stretch cotton knit",
  ],
  // The brief's "TESTED BEFORE BULK" eyebrow isn't rendered: TrustPoints has
  // no eyebrow by design (see its own header comment), same as Tank Tops.
  qualityHeading: "Sleeve length that holds, cuffs that stay in place",
  qualitySubline: "We confirm it all on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Sleeve length graded proportionally across the full size run",
    "Cuff and thumbhole placement checked across sizes",
    "Thermal cotton and waffle-knit shape retention and stretch recovery tested after wash",
    "Henley plackets checked for secure buttons and flat lie, no gapping",
    "Every run inspected to AQL 2.5",
    "Third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  // Owner-locked 6-item copy (2026-09-23, rebuilt for the current range),
  // verbatim apart from the leading capital each body takes on every
  // category. The brief's "Explore full
  // customization" link isn't rendered: WhatWeCover has no link slot.
  coverageItems: [
    { title: "Fabric", body: "Cotton, cotton-blend, thermal cotton, stretch tri-blend, performance poly, poly-spandex" },
    {
      title: "Fit and neckline",
      body: "Fitted athletic, relaxed, or oversized; crew, henley placket with button count, mock neck, or quarter-zip",
    },
    {
      title: "Sleeve, cuff, and construction",
      body: "Set-in, raglan, or drop-shoulder sleeve; ribbed, hemmed, thumbhole, or elastic-band cuff",
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
      a: "Cotton and cotton-blend jersey, heavier thermal cotton, stretch tri-blend, performance poly-spandex, recycled performance poly, and lightweight stretch cotton knit, confirmed on your sample.",
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
      a: "Fabric, fit, neckline, cuff type, sleeve construction, articulated darts, color, print/embroidery placement (incl. sleeve and cuff), logos, labels, hangtags, packaging.",
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
    faqGetStarted,
  ],
  ctaReferenceNoun: "long-sleeve top",
  // 10 styles, all draft (owner spec). Card title carries "Men's" or
  // "Women's" (always-gender rule); pdpHeading is the card title +
  // " Manufacturer" (card-title rule). Slugs are
  // not-yet-final while draft -- they become permanent URLs only on publish.
  // SKU 1-4 carry full PDP content (2026-09-23 build brief), so they render
  // as reachable drafts (noindex, no Product/FAQPage schema, not in the
  // sitemap) and their PLP cards link, as do SKU 7 (Fitted Raglan) and
  // SKU 10 (Mock Neck), built 2026-09-23. Related-style chips name only
  // built slugs, so nothing links to an unbuilt page. SKU 9 (Compression
  // Long-Sleeve) was removed from this category entirely (owner, 2026-09-23):
  // no card, no PDP, and CAP-LSL-09 is retired, never to be reused.
  //
  // SKU 5 (Hooded), 6 (Oversized) and 8 (Waffle Thermal) were removed
  // (owner, 2026-09-23, brand-convergence research): Hooded and Waffle
  // Thermal are not in the confirmed shortlist, and Oversized is folded into
  // Crew's relaxed-to-oversized fit. The grid stays at 5 on purpose -- don't
  // backfill placeholder cards. The remaining confirmed men's styles
  // (Compression Thumbholes, Mock Neck) and the women's line are added with
  // the gender-toggle rebuild. SKU codes are not renumbered.
  styleCards: [
    {
      status: "draft",
      slug: "crew",
      gender: "Men",
      sku: "CAP-LSL-01",
      cardTitle: "Men's Crew Long-Sleeve Tee",
      cardSubline: "Standard crew neckline, cotton or cotton-blend jersey",
      image: "",
      imageAlt: "Men's crew long-sleeve tee, standard crew neckline, cotton or cotton-blend jersey",
      href: "/capriowear/activewear/long-sleeve-tops/crew",
      pdpTitle: "Men's Crew",
      pdpHeading: "Men's Crew Long-Sleeve Tee Manufacturer",
      pdpDescription:
        "Relaxed-to-oversized crew-neck long-sleeve tee, custom and private label, in cotton or cotton-blend jersey, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Men's crew long-sleeve tee, front view" },
        { alt: "Men's crew long-sleeve tee, back view" },
        { alt: "Men's crew long-sleeve tee, side profile" },
        { alt: "Men's crew long-sleeve tee, ribbed cuff close-up" },
        { alt: "Men's crew long-sleeve tee, worn on model" },
        { alt: "Men's crew long-sleeve tee, flat lay" },
      ],
      pdpMetaTitle: "Men's Crew Long-Sleeve Tee Manufacturer",
      pdpMetaDescription:
        "Men's crew long-sleeve tee manufacturer, OEM, ODM and private label, cotton and cotton-blend jersey, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Cotton or cotton-blend jersey",
      pdpFabricPills: ["Cotton Jersey", "Cotton-Poly Blend", "Brushed-Back Jersey"],
      // Shared six (pdpCustomizationPills, ./pdpShared.ts) plus this style's
      // ribbed-collar option (owner, 2026-09-23). Retyped here because the
      // override replaces the shared list rather than extending it.
      pdpCustomizationPills: [
        "Custom fabric",
        "Custom color & design",
        "Your fit",
        "Your branding",
        "Custom labels",
        "Custom packaging",
        "Ribbed-collar finish option",
      ],
      faqs: [
        {
          q: "What fabric is the crew long-sleeve tee made from?",
          a: "Cotton or cotton-blend jersey, the direct long-sleeve extension of our standard tee fabric platform. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Is this a standard crew neckline, or can it be customized?",
          a: "Built as a relaxed-to-oversized crew as standard, but fit, neckline, cuff, and sleeve construction can all be customized to your reference garment, confirmed on your sample.",
        },
        {
          q: "Can I get this with a ribbed collar instead of a standard crew neckline?",
          a: "Yes. A ribbed-collar finish is available as an option on the same body and fabric, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Fitted Performance Long-Sleeve", slug: "fitted-performance", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Henley Long-Sleeve", slug: "henley", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Quarter-Zip Long-Sleeve", slug: "quarter-zip", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Crew long-sleeve tee, standard crew neckline (base type)" },
        {
          label: "Fabric",
          value: "Cotton or cotton-blend jersey, the direct long-sleeve extension of our tee fabric platform. Pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed to oversized" },
        {
          label: "Collar",
          value: "Standard crew neckline, or a ribbed-collar finish available as an option on the same body and fabric",
        },
        { label: "Cuff", value: "Ribbed knit, standard finish" },
        { label: "Sleeve construction", value: "Set-in sleeve, standard" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        {
          label: "Branding",
          value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging, including sleeve and cuff placement",
        },
      ],
      specificationsImage: { alt: "Men's crew long-sleeve tee, construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Sleeve length graded proportionally across the full size run",
        "Cuff consistency checked across sizes",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          {
            title: "Branding",
            body: "Silicone, heat transfer, embroidery, sleeve and cuff placement available",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" },
          },
          {
            title: "Fabric",
            body: "Cotton or cotton-blend jersey, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          {
            title: "Collar",
            body: "Standard crew as our base build, or a ribbed-collar finish available on request",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Collar" },
          },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "fitted-performance",
      gender: "Men",
      sku: "CAP-LSL-02",
      cardTitle: "Men's Fitted Performance Long-Sleeve",
      cardSubline: "Moisture-wicking poly-spandex, athletic cut, thumbholes standard",
      image: "",
      imageAlt: "Men's fitted performance long-sleeve, moisture-wicking poly-spandex, athletic cut with thumbholes",
      href: "/capriowear/activewear/long-sleeve-tops/fitted-performance",
      // Gendered (owner, 2026-09-23): Women's Fitted Performance (CAP-LSL-11)
      // makes this a cross-gender pair, so both sides carry "Men's"/"Women's"
      // per the 2026-09-22 convention. URL unchanged.
      pdpTitle: "Men's Fitted Performance",
      pdpHeading: "Men's Fitted Performance Long-Sleeve Manufacturer",
      pdpDescription:
        "Fitted, moisture-wicking long-sleeve in performance poly-spandex, with standard thumbholes, custom and private label, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Men's fitted performance long-sleeve, front view" },
        { alt: "Men's fitted performance long-sleeve, back view" },
        { alt: "Men's fitted performance long-sleeve, side profile" },
        { alt: "Men's fitted performance long-sleeve, thumbhole cuff close-up" },
        { alt: "Men's fitted performance long-sleeve, worn on model" },
        { alt: "Men's fitted performance long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Men's Fitted Performance Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Men's fitted performance long-sleeve manufacturer, OEM, ODM and private label, moisture-wicking poly-spandex, thumbholes standard, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Performance poly-spandex (90% polyester / 10% spandex) or 100% performance polyester",
      pdpFabricPills: ["Performance Poly-Spandex (90/10)", "100% Performance Polyester"],
      faqs: [
        {
          q: "Do thumbholes come standard on this style?",
          a: "Yes. Thumbholes are a standard feature on our fitted performance long-sleeve, not a special order, confirmed on your sample.",
        },
        {
          q: "What is the difference between this and a compression long-sleeve?",
          a: "Fit intent, specifically. This is a more relaxed athletic fit built for moisture-wicking and mobility, even with spandex content. A true compression long-sleeve sits tight against the skin for muscle support and blood flow, and belongs to our Compression and Base Layers line.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Crew Long-Sleeve Tee", slug: "crew", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Henley Long-Sleeve", slug: "henley", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Quarter-Zip Long-Sleeve", slug: "quarter-zip", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Fitted athletic/performance long-sleeve, thumbholes standard (base type)" },
        {
          label: "Fabric",
          value: "Performance poly-spandex, 90% polyester/10% spandex confirmed reference composition, or 100% performance polyester for a non-stretch option. Pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, athletic cut" },
        { label: "Cuff", value: "Thumbholes standard, hemmed cuff" },
        { label: "Sleeve construction", value: "Set-in standard, raglan available for improved shoulder flexibility" },
        {
          label: "Construction upgrades",
          value: "Articulated elbow and back darts, dual filament yarn construction, both available as premium-tier upgrades",
        },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        {
          label: "Branding",
          value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging, including sleeve and cuff placement",
        },
      ],
      specificationsImage: { alt: "Men's fitted performance long-sleeve, construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Thumbhole placement checked for comfort and consistency across sizes",
        "Moisture-wicking performance and stretch recovery tested before bulk",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          {
            title: "Branding",
            body: "Silicone, heat transfer, embroidery, sleeve and cuff placement available",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" },
          },
          {
            title: "Fabric",
            body: "Performance poly-spandex or 100% performance polyester, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          {
            title: "Construction upgrades",
            body: "Articulated elbow and back darts, dual filament yarn construction, on request",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Construction upgrades" },
          },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "henley",
      gender: "Men",
      sku: "CAP-LSL-03",
      cardTitle: "Men's Henley Long-Sleeve",
      cardSubline: "Collarless neckline, 2 to 5 button placket",
      image: "",
      imageAlt: "Men's henley long-sleeve, collarless neckline with a 2 to 5 button placket",
      href: "/capriowear/activewear/long-sleeve-tops/henley",
      // Covers henley construction across its two fabric routes (jersey or
      // heavier 100% cotton thermal weight, 190 GSM reference, 2026-09-23). The separate Waffle Thermal style (SKU 8) this
      // was kept distinct from was removed, 2026-09-23 -- see styleCards'
      // own comment.
      pdpTitle: "Men's Henley",
      pdpHeading: "Men's Henley Long-Sleeve Manufacturer",
      pdpDescription:
        "Collarless henley long-sleeve with a 2 to 5 button placket, custom and private label, in cotton jersey or heavier thermal cotton, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Men's henley long-sleeve, front view" },
        { alt: "Men's henley long-sleeve, back view" },
        { alt: "Men's henley long-sleeve, side profile" },
        { alt: "Men's henley long-sleeve, button placket close-up" },
        { alt: "Men's henley long-sleeve, worn on model" },
        { alt: "Men's henley long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Men's Henley Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Men's henley long-sleeve manufacturer, OEM, ODM and private label, 2 to 5 button placket, cotton or heavier thermal cotton, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Cotton or cotton-blend jersey, or heavier 100% cotton thermal weight",
      pdpFabricPills: ["Cotton Jersey", "Cotton-Poly Blend", "Heavier Thermal Cotton (190 GSM Reference)"],
      faqs: [
        {
          q: "How many buttons does the henley placket have?",
          a: "Anywhere from 2 to 5, depending on your positioning. We build to your spec.",
        },
        {
          q: "What's the difference between the two fabric routes?",
          a: "A lighter cotton or cotton-blend jersey for an everyday build, or a heavier 100% cotton thermal weight (190 GSM on our reference) for a streetwear or workwear-positioned henley. Both are available, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Crew Long-Sleeve Tee", slug: "crew", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Fitted Performance Long-Sleeve", slug: "fitted-performance", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Quarter-Zip Long-Sleeve", slug: "quarter-zip", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Henley long-sleeve, collarless neckline with button placket (base type)" },
        {
          label: "Fabric",
          value: "Cotton or cotton-blend jersey for a lighter build, or 100% cotton thermal weight for a streetwear/workwear positioning",
        },
        {
          label: "Weight",
          value: "190 GSM on the thermal reference; lighter jersey route pending confirmed spec on sample.",
        },
        { label: "Fit", value: "Standard, true to size" },
        { label: "Placket", value: "2 to 5 buttons, count varies by positioning, built to your spec" },
        {
          label: "Cuff",
          value: "Ribbed cuff standard; raw or unfinished edge available as a streetwear/heritage option on heavier thermal builds",
        },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        {
          label: "Branding",
          value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging. Chest-center or back placement recommended over near-collar graphics.",
        },
      ],
      specificationsImage: { alt: "Men's henley long-sleeve, placket construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Buttons securely attached, placket checked to lie flat without gapping or puckering",
        "Heavier cotton builds checked for shape retention after wash",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          {
            title: "Print and artwork",
            body: "Sublimation, screen, DTF, DTG, chest or back placement recommended near the placket",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" },
          },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Cotton jersey or heavier thermal cotton, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Placket", body: "2 to 5 button count, built to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Placket" } },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "quarter-zip",
      gender: "Men",
      sku: "CAP-LSL-04",
      cardTitle: "Men's Quarter-Zip Long-Sleeve",
      cardSubline: "Partial front zip, standing mock collar",
      image: "",
      imageAlt: "Men's quarter-zip long-sleeve, partial front zip with a standing mock collar",
      href: "/capriowear/activewear/long-sleeve-tops/quarter-zip",
      pdpTitle: "Men's Quarter-Zip",
      pdpHeading: "Men's Quarter-Zip Long-Sleeve Manufacturer",
      pdpDescription:
        "Partial front-zip long-sleeve with a standing mock collar, custom and private label, in performance poly-spandex, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Men's quarter-zip long-sleeve, front view" },
        { alt: "Men's quarter-zip long-sleeve, back view" },
        { alt: "Men's quarter-zip long-sleeve, side profile" },
        { alt: "Men's quarter-zip long-sleeve, mock collar and zip garage close-up" },
        { alt: "Men's quarter-zip long-sleeve, worn on model" },
        { alt: "Men's quarter-zip long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Men's Quarter-Zip Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Men's quarter-zip long-sleeve manufacturer, OEM, ODM and private label, mock-neck construction, performance poly-spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Performance poly-spandex or 100% performance polyester",
      pdpFabricPills: ["Performance Poly-Spandex (90/10)", "100% Performance Polyester"],
      faqs: [
        {
          q: 'What does the "garage" at the zipper mean?',
          a: "It's a small fabric flap at the top of the zip that covers the pull, so it doesn't rest against your skin at the chin. Confirmed on your sample.",
        },
        {
          q: "Is this style used for golf or training programs?",
          a: "Yes. Quarter-zip/mock-neck long-sleeves are a common choice for golf and training-crossover programs, often paired with UPF 50+ sun protection.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Crew Long-Sleeve Tee", slug: "crew", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Fitted Performance Long-Sleeve", slug: "fitted-performance", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Henley Long-Sleeve", slug: "henley", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Quarter-zip / mock-neck long-sleeve, partial front zip (base type)" },
        {
          label: "Fabric",
          value: "Performance poly-spandex, shares its fabric family with our fitted performance long-sleeve, or 100% performance polyester for a non-stretch option. Pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted through the body, standing mock collar" },
        { label: "Zip", value: 'Partial front zip with a "garage" detail at the chin for comfort against the skin' },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Men's quarter-zip long-sleeve, zip construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Zip pull and garage detail tested for smooth operation and comfort at the chin",
        "Moisture-wicking performance and stretch recovery tested before bulk",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Performance poly-spandex or 100% performance polyester, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          {
            title: "Zip",
            body: "Pull and garage detail in your color or hardware finish",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Zip" },
          },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "raglan",
      gender: "Men",
      sku: "CAP-LSL-07",
      cardTitle: "Men's Fitted Raglan Long-Sleeve",
      cardSubline: "Fitted raglan sleeve, stretch blend fabric, improved shoulder flexibility",
      image: "",
      imageAlt: "Men's raglan long-sleeve, fitted raglan sleeve in a stretch blend fabric for shoulder flexibility",
      href: "/capriowear/activewear/long-sleeve-tops/raglan",
      pdpTitle: "Men's Fitted Raglan",
      pdpHeading: "Men's Fitted Raglan Long-Sleeve Manufacturer",
      pdpDescription:
        "Fitted long-sleeve with raglan sleeve construction for improved shoulder flexibility, custom and private label, in a stretch tri-blend or waffle-knit fabric, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Men's fitted raglan long-sleeve, front view" },
        { alt: "Men's fitted raglan long-sleeve, back view" },
        { alt: "Men's fitted raglan long-sleeve, side profile" },
        { alt: "Men's fitted raglan long-sleeve, raglan shoulder seam close-up" },
        { alt: "Men's fitted raglan long-sleeve, worn on model" },
        { alt: "Men's fitted raglan long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Men's Fitted Raglan Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Men's fitted raglan long-sleeve manufacturer, OEM, ODM and private label, stretch tri-blend fabric, improved shoulder flexibility, from 50 pieces, DDP worldwide.",
      material: "Stretch tri-blend (cotton, lyocell, elastane) or waffle-knit blend",
      pdpFabricPills: ["Stretch Tri-Blend (Cotton/Lyocell/Elastane)", "Waffle-Knit Blend"],
      faqs: [
        {
          q: "What is raglan sleeve construction, and why does it matter?",
          a: "The sleeve is cut as one piece with the shoulder, joined by a diagonal seam running from the underarm to the collar instead of a standard set-in seam. This gives more shoulder flexibility and range of motion, which is why it's common in performance-focused long-sleeves.",
        },
        {
          q: "What fabric is this style made from?",
          a: "A stretch tri-blend (cotton, lyocell, and elastane) as our reference composition, or a waffle-knit blend as an alternate route. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Fitted Performance Long-Sleeve", slug: "fitted-performance", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Mock Neck Long-Sleeve", slug: "mock-neck", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Crew Long-Sleeve Tee", slug: "crew", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      // Weight/Fabric rows: owner's final wording (2026-09-23), no internal
      // sourcing language, sample caveat as its own sentence.
      specifications: [
        { label: "Style", value: "Fitted raglan-sleeve long-sleeve, diagonal underarm-to-collar seam (base type)" },
        {
          label: "Fabric",
          value: "Stretch tri-blend, 46% cotton / 46% lyocell / 8% elastane, or waffle-knit blend as an alternate route. Final composition confirmed on your sample.",
        },
        { label: "Weight", value: "165 GSM. Final weight confirmed on your sample." },
        { label: "Fit", value: "Fitted, athletic cut" },
        {
          label: "Sleeve construction",
          value: "Raglan, one-piece with the shoulder, diagonal seam from underarm to collar for improved flexibility",
        },
        { label: "Cuff", value: "Hemmed, ribbed cuff available on request" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        {
          label: "Branding",
          value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging, including sleeve and cuff placement",
        },
      ],
      specificationsImage: { alt: "Men's fitted raglan long-sleeve, raglan seam construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested, raglan seam checked for range-of-motion flexibility",
        "Sleeve length graded proportionally across the full size run",
        "Stretch recovery tested before bulk",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          {
            title: "Branding",
            body: "Silicone, heat transfer, embroidery, sleeve and cuff placement available",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" },
          },
          {
            title: "Fabric",
            body: "Stretch tri-blend or waffle-knit, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          {
            title: "Sleeve construction",
            body: "Raglan as standard, set-in available on request",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Sleeve construction" },
          },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "mock-neck",
      gender: "Men",
      sku: "CAP-LSL-10",
      cardTitle: "Men's Mock Neck Long-Sleeve",
      cardSubline: "Standing mock collar, no front zip",
      image: "",
      imageAlt: "Men's mock neck long-sleeve, standing mock collar with no front zip",
      href: "/capriowear/activewear/long-sleeve-tops/mock-neck",
      pdpTitle: "Men's Mock Neck",
      pdpHeading: "Men's Mock Neck Long-Sleeve Manufacturer",
      pdpDescription:
        "Long-sleeve with a standing mock collar and no front zip, custom and private label, in moisture-wicking cotton construction, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Men's mock neck long-sleeve, front view" },
        { alt: "Men's mock neck long-sleeve, back view" },
        { alt: "Men's mock neck long-sleeve, side profile" },
        { alt: "Men's mock neck long-sleeve, standing collar close-up" },
        { alt: "Men's mock neck long-sleeve, worn on model" },
        { alt: "Men's mock neck long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Men's Mock Neck Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Men's mock neck long-sleeve manufacturer, OEM, ODM and private label, standing collar, moisture-wicking cotton construction, from 50 pieces, DDP worldwide.",
      material: "Cotton or cotton-blend",
      // Cotton only (owner, 2026-09-23: corrected research supports no
      // poly-spandex route for this SKU). "Dri-FIT" in the brief swapped for
      // "moisture-wicking cotton" in the description/meta (Nike trademark,
      // and a polyester technology), owner call.
      pdpFabricPills: ["Cotton or Cotton-Blend"],
      faqs: [
        {
          q: "What's the difference between this and the Quarter-Zip Long-Sleeve?",
          a: 'Both share a standing mock collar, but this style has no front zip, a clean pull-on construction. The Quarter-Zip adds a partial front zip with a "garage" detail at the chin.',
        },
        {
          q: "Is this style used for golf or training programs?",
          a: "Yes. Mock neck long-sleeves show up consistently in golf and training-crossover product lines, built here in cotton or cotton-blend.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Quarter-Zip Long-Sleeve", slug: "quarter-zip", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Fitted Performance Long-Sleeve", slug: "fitted-performance", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Fitted Raglan Long-Sleeve", slug: "raglan", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Mock neck long-sleeve, standing collar, no front zip (base type)" },
        {
          label: "Fabric",
          value: "Cotton or cotton-blend, golf/training-crossover positioning. Pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted through the body, standing mock collar" },
        {
          label: "Neckline",
          value: "Mock neck, no zip (distinct from our Quarter-Zip Long-Sleeve, which shares the mock collar but adds a partial front zip)",
        },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Men's mock neck long-sleeve, collar construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Mock collar height and stretch recovery checked for consistency across sizes",
        "Shrinkage and shape retention checked after wash",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Cotton or cotton-blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Collar", body: "Mock neck height and finish built to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Collar" } },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "fitted-performance-womens",
      gender: "Women",
      sku: "CAP-LSL-11",
      cardTitle: "Women's Fitted Performance Long-Sleeve",
      cardSubline: "Thumbholes and mesh underarm panels, moisture-wicking poly-spandex",
      image: "",
      imageAlt: "Women's fitted performance long-sleeve with thumbholes and mesh underarm panels, moisture-wicking poly-spandex",
      href: "/capriowear/activewear/long-sleeve-tops/fitted-performance-womens",
      pdpTitle: "Women's Fitted Performance",
      pdpHeading: "Women's Fitted Performance Long-Sleeve Manufacturer",
      pdpDescription:
        "Fitted performance long-sleeve with thumbholes and mesh underarm panels, custom and private label, in moisture-wicking poly-spandex, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Women's fitted performance long-sleeve, front view" },
        { alt: "Women's fitted performance long-sleeve, back view" },
        { alt: "Women's fitted performance long-sleeve, side profile" },
        { alt: "Women's fitted performance long-sleeve, thumbhole cuff close-up" },
        { alt: "Women's fitted performance long-sleeve, worn on model" },
        { alt: "Women's fitted performance long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Women's Fitted Performance Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Women's fitted performance long-sleeve manufacturer, OEM, ODM and private label, moisture-wicking poly-spandex, thumbholes standard, 50 pieces, DDP worldwide.",
      material: "Performance poly-spandex with poly-spandex mesh panels",
      pdpFabricPills: ["Performance Poly-Spandex", "Poly-Spandex Mesh Panels"],
      faqs: [
        {
          q: "Are thumbholes standard on this style?",
          a: "Yes. Thumbholes are built in as standard on our women's fitted performance long-sleeve, not a special order, confirmed on your sample.",
        },
        {
          // "a performance fabric platform", not the brief's "the same
          // performance poly-spandex fabric platform": Fitted Cropped's fabric
          // has no spandex (owner call, 2026-09-23).
          q: "How does this differ from your Fitted Cropped Long-Sleeve?",
          a: "Both share a performance fabric platform, but this style runs full length with mesh underarm panels, while the Fitted Cropped style is a shorter, cropped-length cut with an elastic hem band.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Fitted Cropped Long-Sleeve", slug: "fitted-cropped", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Women's Oversized Crew Long-Sleeve", slug: "crew-womens", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Fitted Performance Long-Sleeve", slug: "fitted-performance", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Fitted performance crew long-sleeve, thumbholes and mesh underarm panels (base type)" },
        { label: "Fabric", value: "Performance poly-spandex, moisture-wicking, four-way stretch. Pending confirmed spec on sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, athletic cut" },
        { label: "Cuff", value: "Thumbhole cuff standard" },
        { label: "Sleeve construction", value: "Set-in sleeve with mesh underarm panels for breathability" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        {
          label: "Branding",
          value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging, including sleeve and cuff placement",
        },
      ],
      specificationsImage: { alt: "Women's fitted performance long-sleeve, mesh underarm panel detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Stretch recovery tested before bulk",
        "Thumbhole cuffs checked for consistent placement across sizes",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          {
            title: "Branding",
            body: "Silicone, heat transfer, embroidery, sleeve and cuff placement available",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" },
          },
          {
            title: "Fabric",
            body: "Performance poly-spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          {
            title: "Mesh panels",
            body: "Placement and density built to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Mesh panels" },
          },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "fitted-cropped",
      gender: "Women",
      sku: "CAP-LSL-12",
      cardTitle: "Women's Fitted Cropped Long-Sleeve",
      cardSubline: "Jacquard elastic hem band, performance poly",
      image: "",
      imageAlt: "Women's fitted cropped long-sleeve with a jacquard elastic hem band, performance poly",
      href: "/capriowear/activewear/long-sleeve-tops/fitted-cropped",
      pdpTitle: "Women's Fitted Cropped",
      pdpHeading: "Women's Fitted Cropped Long-Sleeve Manufacturer",
      pdpDescription:
        "Fitted cropped long-sleeve with a jacquard elastic hem band, custom and private label, in performance poly, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Women's fitted cropped long-sleeve, front view" },
        { alt: "Women's fitted cropped long-sleeve, back view" },
        { alt: "Women's fitted cropped long-sleeve, side profile" },
        { alt: "Women's fitted cropped long-sleeve, jacquard elastic hem band close-up" },
        { alt: "Women's fitted cropped long-sleeve, worn on model" },
        { alt: "Women's fitted cropped long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Women's Fitted Cropped Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Women's fitted cropped long-sleeve manufacturer, OEM, ODM and private label, jacquard elastic hem band, performance poly, from 50 pieces, DDP worldwide.",
      material: "Performance poly, at least 75% recycled polyester",
      pdpFabricPills: ["Performance Poly (≥75% Recycled)"],
      faqs: [
        {
          q: "What makes the hem band different from a standard hem?",
          a: "A jacquard elastic band built into the crop line, not just a folded or raw-edge hem. It holds its shape and sits flat against the body, confirmed on your sample.",
        },
        {
          q: "How does this differ from your Women's Fitted Performance Long-Sleeve?",
          a: "Both share a fitted, body-hugging cut in performance poly, but this style is cropped in length with an elastic hem band, while the Fitted Performance style runs full length with thumbholes and mesh underarm panels.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Fitted Performance Long-Sleeve", slug: "fitted-performance-womens", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Women's Oversized Crew Long-Sleeve", slug: "crew-womens", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Women's Midi-Length Long-Sleeve", slug: "midi-length", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Fitted cropped long-sleeve, body-hugging fit (base type)" },
        {
          label: "Fabric",
          value: "Performance poly, at least 75% recycled polyester on our reference. Final composition confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Body-hugging, cropped length" },
        { label: "Hem", value: "Jacquard elastic hem band at the crop line" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Women's fitted cropped long-sleeve, hem band construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Elastic hem band stretch recovery tested before bulk",
        "Crop length graded proportionally across the full size run",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Performance poly, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Hem", body: "Elastic band width and finish built to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Hem" } },
          { title: "Crop length", body: "Built to your reference length", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Crop length" } },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "crew-womens",
      gender: "Women",
      sku: "CAP-LSL-13",
      cardTitle: "Women's Oversized Crew Long-Sleeve",
      cardSubline: "Oversized crew neckline, 100% cotton",
      image: "",
      imageAlt: "Women's oversized crew long-sleeve, standard crew neckline, 100% cotton",
      href: "/capriowear/activewear/long-sleeve-tops/crew-womens",
      pdpTitle: "Women's Oversized Crew",
      pdpHeading: "Women's Oversized Crew Long-Sleeve Manufacturer",
      pdpDescription: "Oversized crew-neck long-sleeve, custom and private label, in 100% cotton, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Women's oversized crew long-sleeve, front view" },
        { alt: "Women's oversized crew long-sleeve, back view" },
        { alt: "Women's oversized crew long-sleeve, side profile" },
        { alt: "Women's oversized crew long-sleeve, ribbed cuff close-up" },
        { alt: "Women's oversized crew long-sleeve, worn on model" },
        { alt: "Women's oversized crew long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Women's Oversized Crew Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Women's oversized crew long-sleeve manufacturer, OEM, ODM and private label, 100% cotton, relaxed fit, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "100% cotton or cotton-poly blend",
      pdpFabricPills: ["100% Cotton", "Cotton-Poly Blend"],
      faqs: [
        {
          q: "What fabric is this style made from?",
          a: "100% cotton on our reference, or a cotton-poly blend if you prefer a lighter hand. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Is this a standard oversized fit, or can it be customized?",
          a: "Built as an oversized crew as standard, but fit, neckline, cuff, and sleeve construction can all be customized to your reference garment, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Fitted Performance Long-Sleeve", slug: "fitted-performance-womens", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Women's Midi-Length Long-Sleeve", slug: "midi-length", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Men's Crew Long-Sleeve Tee", slug: "crew", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Oversized crew long-sleeve, standard crew neckline (base type)" },
        {
          label: "Fabric",
          value: "100% cotton on our reference, or cotton-poly blend. Final composition confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        // "Oversized" only: the brief's research clause dropped, same as the
        // men's Crew Fit row (owner call, 2026-09-23).
        { label: "Fit", value: "Oversized" },
        { label: "Cuff", value: "Ribbed knit, standard finish" },
        { label: "Sleeve construction", value: "Set-in sleeve, standard, dropped shoulder available on request" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        {
          label: "Branding",
          value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging, including sleeve and cuff placement",
        },
      ],
      specificationsImage: { alt: "Women's oversized crew long-sleeve, construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Sleeve length graded proportionally across the full size run",
        "Cuff consistency checked across sizes",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          {
            title: "Branding",
            body: "Silicone, heat transfer, embroidery, sleeve and cuff placement available",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" },
          },
          {
            title: "Fabric",
            body: "100% cotton or cotton-poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          {
            title: "Fit",
            body: "Oversized as our base build, relaxed or true-to-size available on request",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit" },
          },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "midi-length",
      gender: "Women",
      sku: "CAP-LSL-14",
      cardTitle: "Women's Midi-Length Long-Sleeve",
      cardSubline: "Between full-length and cropped, lightweight stretch cotton knit",
      image: "",
      imageAlt: "Women's midi-length long-sleeve, between full-length and cropped, lightweight stretch cotton knit",
      href: "/capriowear/activewear/long-sleeve-tops/midi-length",
      pdpTitle: "Women's Midi-Length",
      pdpHeading: "Women's Midi-Length Long-Sleeve Manufacturer",
      pdpDescription:
        "Midi-length long-sleeve between a full-length top and a cropped style, custom and private label, in a lightweight stretch cotton knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Women's midi-length long-sleeve, front view" },
        { alt: "Women's midi-length long-sleeve, back view" },
        { alt: "Women's midi-length long-sleeve, side profile" },
        { alt: "Women's midi-length long-sleeve, hem length close-up" },
        { alt: "Women's midi-length long-sleeve, worn on model" },
        { alt: "Women's midi-length long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Women's Midi-Length Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Women's midi-length long-sleeve manufacturer, OEM, ODM and private label, lightweight stretch cotton knit, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Lightweight stretch cotton knit",
      pdpFabricPills: ["Lightweight Stretch Cotton Knit"],
      faqs: [
        {
          q: 'What does "midi-length" mean on this style?',
          a: "It sits between a full-length long-sleeve and a fully cropped top, a length option distinct from both. We confirm the exact length on your sample, matched to your reference if you have one.",
        },
        {
          q: "Is this a body-hugging fit or a relaxed fit?",
          a: "Our reference construction is body fit, but a relaxed midi silhouette is also available. Tell us your preference and we confirm the fit on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Fitted Cropped Long-Sleeve", slug: "fitted-cropped", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Women's Oversized Crew Long-Sleeve", slug: "crew-womens", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Women's Fitted Performance Long-Sleeve", slug: "fitted-performance-womens", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Midi-length long-sleeve, sits between full-length and cropped (base type)" },
        { label: "Fabric", value: "Lightweight stretch cotton knit. Pending confirmed spec on sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Body fit on our reference; a relaxed midi fit is also available, confirmed on your sample" },
        { label: "Length", value: "Midi, between a full-length long-sleeve and a fully cropped style" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Women's midi-length long-sleeve, construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Midi length graded proportionally across the full size run",
        "Stretch recovery tested before bulk",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Lightweight stretch cotton knit, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          {
            title: "Fit and length",
            body: "Body fit or relaxed, exact midi length built to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit and length" },
          },
          {
            title: "Trims and finish",
            body: "Woven labels, size and care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, same L1 group first
  // (Tops, per activewearMegaMenu), then the closest pairings from other groups.
  relatedLinks: [
    { label: "T-Shirts", href: "/capriowear/activewear/t-shirts" },
    { label: "Tank Tops", href: "/capriowear/activewear/tank-tops" },
    { label: "Hoodies", href: "/capriowear/activewear/hoodies" },
    { label: "Sweatshirts", href: "/capriowear/activewear/sweatshirts" },
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
  ],
};
