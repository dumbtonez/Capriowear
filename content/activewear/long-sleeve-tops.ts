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
// The PLP itself goes live; every style is "draft" (owner spec), excluded
// from app/sitemap.ts and this category's own CollectionPage/ItemList
// schema (omitted entirely while zero styles are published). Card-only
// drafts are non-clickable with no route; drafts with PDP content (SKU 1-4)
// render noindexed via isDraftPdpReachable() -- see styleCards below. Flip a style to
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
  // SKU 1-4 carry full PDP content (2026-09-23 build brief), so they render
  // as reachable drafts (noindex, no Product/FAQPage schema, not in the
  // sitemap) and their PLP cards link; SKU 5-8 are still card-only. Their
  // related-style chips name only SKU 1-4 slugs, so nothing links to an
  // unbuilt page.
  styleCards: [
    {
      status: "draft",
      slug: "crew",
      sku: "CAP-LSL-01",
      cardTitle: "Custom Crew Long-Sleeve Tee",
      cardSubline: "Standard crew neckline, cotton or cotton-blend jersey",
      image: "",
      imageAlt: "Custom crew long-sleeve tee, standard crew neckline, cotton or cotton-blend jersey",
      href: "/capriowear/activewear/long-sleeve-tops/crew",
      pdpTitle: "Crew",
      pdpHeading: "Custom Crew Long-Sleeve Tee Manufacturer",
      pdpDescription:
        "Relaxed-to-oversized crew-neck long-sleeve tee, custom and private label, in cotton or cotton-blend jersey, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Custom crew long-sleeve tee, front view" },
        { alt: "Custom crew long-sleeve tee, back view" },
        { alt: "Custom crew long-sleeve tee, side profile" },
        { alt: "Custom crew long-sleeve tee, ribbed cuff close-up" },
        { alt: "Custom crew long-sleeve tee, worn on model" },
        { alt: "Custom crew long-sleeve tee, flat lay" },
      ],
      pdpMetaTitle: "Custom Crew Long-Sleeve Tee Manufacturer",
      pdpMetaDescription:
        "Custom crew long-sleeve tee manufacturer, OEM, ODM and private label, cotton and cotton-blend jersey, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Cotton or cotton-blend jersey",
      pdpFabricPills: ["Cotton Jersey", "Cotton-Poly Blend", "Brushed-Back Jersey"],
      faqs: [
        {
          q: "What fabric is the crew long-sleeve tee made from?",
          a: "Cotton or cotton-blend jersey, the direct long-sleeve extension of our standard tee fabric platform. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Is this a standard crew neckline, or can it be customized?",
          a: "Built as a relaxed-to-oversized crew as standard, but fit, neckline, cuff, and sleeve construction can all be customized to your reference garment, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted Performance Long-Sleeve", slug: "fitted-performance", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Henley Long-Sleeve", slug: "henley", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Quarter-Zip Long-Sleeve", slug: "quarter-zip", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Crew long-sleeve tee, standard crew neckline (base type)" },
        {
          label: "Fabric",
          value: "Cotton or cotton-blend jersey, the direct long-sleeve extension of our tee fabric platform. Pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed to oversized, confirmed as the dominant fit pattern across the brand panel" },
        { label: "Cuff", value: "Ribbed knit, standard finish" },
        { label: "Sleeve construction", value: "Set-in sleeve, standard" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        {
          label: "Branding",
          value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging, including sleeve and cuff placement",
        },
      ],
      specificationsImage: { alt: "Custom crew long-sleeve tee, construction detail" },
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
      sku: "CAP-LSL-02",
      cardTitle: "Custom Fitted Performance Long-Sleeve",
      cardSubline: "Moisture-wicking poly-spandex, athletic cut, thumbholes standard",
      image: "",
      imageAlt: "Custom fitted performance long-sleeve, moisture-wicking poly-spandex, athletic cut with thumbholes",
      href: "/capriowear/activewear/long-sleeve-tops/fitted-performance",
      pdpTitle: "Fitted Performance",
      pdpHeading: "Custom Fitted Performance Long-Sleeve Manufacturer",
      pdpDescription:
        "Fitted, moisture-wicking long-sleeve in performance poly-spandex, with standard thumbholes, custom and private label, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Custom fitted performance long-sleeve, front view" },
        { alt: "Custom fitted performance long-sleeve, back view" },
        { alt: "Custom fitted performance long-sleeve, side profile" },
        { alt: "Custom fitted performance long-sleeve, thumbhole cuff close-up" },
        { alt: "Custom fitted performance long-sleeve, worn on model" },
        { alt: "Custom fitted performance long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Custom Fitted Performance Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Custom fitted performance long-sleeve manufacturer, OEM, ODM and private label, moisture-wicking poly-spandex, thumbholes standard, from 50 pieces, any fabric and color, DDP worldwide.",
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
        { label: "Crew Long-Sleeve Tee", slug: "crew", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Henley Long-Sleeve", slug: "henley", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Quarter-Zip Long-Sleeve", slug: "quarter-zip", href: "/capriowear/activewear/long-sleeve-tops" },
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
      specificationsImage: { alt: "Custom fitted performance long-sleeve, construction detail" },
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
      sku: "CAP-LSL-03",
      cardTitle: "Custom Henley Long-Sleeve",
      cardSubline: "Collarless neckline, 2 to 5 button placket",
      image: "",
      imageAlt: "Custom henley long-sleeve, collarless neckline with a 2 to 5 button placket",
      href: "/capriowear/activewear/long-sleeve-tops/henley",
      // Kept distinct from SKU 8, Waffle Thermal (owner note, 2026-09-23):
      // this style covers henley construction across its two fabric routes
      // (jersey or heavier waffle knit); SKU 8 will cover waffle/thermal knit
      // as its own feature across several necklines. Different slugs, no
      // collision, not to be merged.
      pdpTitle: "Henley",
      pdpHeading: "Custom Henley Long-Sleeve Manufacturer",
      pdpDescription:
        "Collarless henley long-sleeve with a 2 to 5 button placket, custom and private label, in cotton jersey or waffle knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Custom henley long-sleeve, front view" },
        { alt: "Custom henley long-sleeve, back view" },
        { alt: "Custom henley long-sleeve, side profile" },
        { alt: "Custom henley long-sleeve, button placket close-up" },
        { alt: "Custom henley long-sleeve, worn on model" },
        { alt: "Custom henley long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Custom Henley Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Custom henley long-sleeve manufacturer, OEM, ODM and private label, 2 to 5 button placket, cotton or waffle knit, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Cotton or cotton-blend jersey, or heavier 100% cotton waffle knit",
      pdpFabricPills: ["Cotton Jersey", "Cotton-Poly Blend", "Waffle/Thermal Knit (Heavier 100% Cotton)"],
      faqs: [
        {
          q: "How many buttons does the henley placket have?",
          a: "Anywhere from 2 to 5, depending on your positioning. We build to your spec.",
        },
        {
          q: "Can this be built in a heavier waffle-knit fabric instead of jersey?",
          a: "Yes. Both a lighter cotton jersey build and a heavier 100% cotton waffle-knit build are available, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Crew Long-Sleeve Tee", slug: "crew", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Fitted Performance Long-Sleeve", slug: "fitted-performance", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Quarter-Zip Long-Sleeve", slug: "quarter-zip", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "See All", href: "/capriowear/activewear/long-sleeve-tops" },
      ],
      specifications: [
        { label: "Style", value: "Henley long-sleeve, collarless neckline with button placket (base type)" },
        {
          label: "Fabric",
          value: "Cotton or cotton-blend jersey for a lighter build, or heavier 100% cotton waffle knit for a streetwear/workwear positioning. Pending confirmed spec on sample.",
        },
        {
          label: "Weight",
          value: "Pending, confirmed on your sample. Heavier waffle-knit henleys are described as heavyweight, with no confirmed GSM ceiling.",
        },
        { label: "Fit", value: "Standard, true to size" },
        { label: "Placket", value: "2 to 5 buttons, count varies by positioning, built to your spec" },
        {
          label: "Cuff",
          value: "Ribbed cuff standard; raw or unfinished edge available as a streetwear/heritage option on heavier waffle builds",
        },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        {
          label: "Branding",
          value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging. Chest-center or back placement recommended over near-collar graphics.",
        },
      ],
      specificationsImage: { alt: "Custom henley long-sleeve, placket construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Buttons securely attached, placket checked to lie flat without gapping or puckering",
        "Waffle-knit builds checked for shape retention and stretch recovery after wash",
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
            body: "Cotton jersey or waffle knit, any weight, sourced or matched to your reference",
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
      sku: "CAP-LSL-04",
      cardTitle: "Custom Quarter-Zip Long-Sleeve",
      cardSubline: "Partial front zip, standing mock collar",
      image: "",
      imageAlt: "Custom quarter-zip long-sleeve, partial front zip with a standing mock collar",
      href: "/capriowear/activewear/long-sleeve-tops/quarter-zip",
      pdpTitle: "Quarter-Zip",
      pdpHeading: "Custom Quarter-Zip Long-Sleeve Manufacturer",
      pdpDescription:
        "Partial front-zip long-sleeve with a standing mock collar, custom and private label, in performance poly-spandex, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Custom quarter-zip long-sleeve, front view" },
        { alt: "Custom quarter-zip long-sleeve, back view" },
        { alt: "Custom quarter-zip long-sleeve, side profile" },
        { alt: "Custom quarter-zip long-sleeve, mock collar and zip garage close-up" },
        { alt: "Custom quarter-zip long-sleeve, worn on model" },
        { alt: "Custom quarter-zip long-sleeve, flat lay" },
      ],
      pdpMetaTitle: "Custom Quarter-Zip Long-Sleeve Manufacturer",
      pdpMetaDescription:
        "Custom quarter-zip long-sleeve manufacturer, OEM, ODM and private label, mock-neck construction, performance poly-spandex, from 50 pieces, any fabric and color, DDP worldwide.",
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
        { label: "Crew Long-Sleeve Tee", slug: "crew", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Fitted Performance Long-Sleeve", slug: "fitted-performance", href: "/capriowear/activewear/long-sleeve-tops" },
        { label: "Henley Long-Sleeve", slug: "henley", href: "/capriowear/activewear/long-sleeve-tops" },
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
      specificationsImage: { alt: "Custom quarter-zip long-sleeve, zip construction detail" },
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
