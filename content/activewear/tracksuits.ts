// content/activewear/tracksuits.ts
// Rebuilt to the owner's locked 2-SKU catalog and copy (owner spec,
// 2026-09-24), replacing the 7 test cards. Dual-gender category: one men's
// SKU (knit) and one women's SKU (woven), so the All/Women/Men toggle stays
// and each card carries a `gender` field. Always-gender naming: every style
// name carries "Men's"/"Women's", and the two names differ, so the slugs
// need no -mens/-womens suffix.
//
// Both SKUs carry full draft PDP content, so their cards link (the
// sitewide `isDraftPdpReachable()` rule) and their pages render noindexed,
// with no sitemap entry and no Product/FAQPage JSON-LD. "How we customize"
// is set once for the category (6 tracksuit-specific tiles), and each style
// carries "Custom color & print" customization chips. Key facts, spec
// subtitle and the
// operational FAQs are the shared PDP defaults (./pdpShared.ts).
//
// Explicit category boundary, carried into one FAQ answer: a tracksuit is
// the tricot/woven warm-up set; the fleece hoodie-and-sweatpant set is not
// this category. Third category under the "OUTERWEAR & SUITS" mega-menu
// group (content/home.ts). No `weightTiers` block (owner spec).
import type { Category } from "./types";
import { faqGetStarted } from "./pdpShared";

export const tracksuits: Category = {
  slug: "tracksuits",
  group: "Activewear",
  menuLabel: "Tracksuits",
  // Verbatim override pair (owner spec, 2026-09-24): bypasses
  // categoryEntityFaq()'s templated sentence entirely.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom tracksuit manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label tracksuits from fabric to packaging, including matched full-zip jacket and tapered pant sets for men in polyester knit and for women in woven polyester, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  h1: "Custom Tracksuit Manufacturer",
  metaTitle: "Custom Tracksuit Manufacturer",
  metaDescription:
    "Custom tracksuit manufacturer: private label men's knit and women's woven tracksuits, matched jacket and pant, team colors, MOQ 50, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester knit (tricot or interlock)",
      bestFor: "Men's and team training tracksuits",
      performance: "Soft, breathable, holds color-blocking and sublimation",
    },
    {
      fabric: "Woven polyester",
      bestFor: "Lightweight warm-up tracksuits",
      performance: "Smooth, lightweight shell that holds a crisp line",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainable team and brand programs",
      performance: "Recycled content in knit or woven builds",
    },
    {
      fabric: "Polyester/Spandex knit",
      bestFor: "Tracksuits that need extra stretch",
      performance: "Added stretch and recovery for high-movement training",
    },
    {
      fabric: "Mesh lining",
      bestFor: "Jacket lining",
      performance: "Adds airflow and a clean inside finish",
    },
  ],
  fabricNote: [
    {
      text: "The jacket and pant are cut from the same fabric, weight and finish so the set matches. Tracksuit shells are commonly 100% polyester, knit or woven, with stretch added only where a program needs it. Fabric weight is confirmed on your sample. Swatches before every bulk run, and we can source or match a specific fabric or a Pantone color from your reference.",
    },
  ],
  fabricPills: ["Polyester knit", "Woven polyester", "Recycled polyester", "Polyester/Spandex", "Mesh lining"],
  qualityHeading: "Matched top to bottom, across the roster",
  qualitySubline: "We cut and dye the jacket and pant together and confirm the match on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Jacket and pant cut and dyed from the same lot, no mismatched shades",
    "Pantone color matched to your brand or team color",
    "Stripes, piping and trims aligned between the two pieces",
    "Sizing consistent across a full size run, so every jacket-and-pant pairing matches",
    "Zippers and hardware function-tested",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Polyester knit or woven, recycled polyester, Polyester/Spandex for stretch, mesh lining" },
    { title: "Matching", body: "Cut and dyed together, Pantone color match, coordinated stripes, piping and color-blocks" },
    { title: "Jacket", body: "Stand or funnel collar, full-zip or quarter-zip, set-in or raglan sleeves, zip pockets" },
    { title: "Pant", body: "Tapered leg, elastic waistband and drawcord, cuffed, open or ankle-zip hem, zip pockets" },
    { title: "Branding", body: "Sublimation, embroidery, heat transfer, tackle twill names and numbers, matched placement across both pieces" },
    { title: "Labels and packaging", body: "Woven or tear-away labels, hangtags, set or separates packaging" },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Entity question is NOT stored here -- see entityQuestion/entityAnswer
  // above; the route prepends it at render time. The remaining 16 below.
  faqs: [
    {
      q: "What is your MOQ for custom tracksuits?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk, with team programs available.",
    },
    {
      q: "What is the difference between a tracksuit and a sweatsuit?",
      a: "A tracksuit is a tricot or woven warm-up set, lightweight, breathable and athletic. A sweatsuit is a fleece set, a hoodie or crewneck with a sweatpant, relaxed and built for warmth. We make fleece sets as coordinated hoodie and sweatpant separates.",
    },
    {
      q: "Are the jacket and pant dyed together for an exact color match?",
      a: "We cut and dye the jacket and pant together from the same production lot, and Pantone-match to your brand or team color, so the set is one true color, not two close shades.",
    },
    {
      q: "Can the jacket and pant be sized separately in one order?",
      a: "Yes. Jacket and pant sizes are chosen independently within a set, since bodies don't scale the same top and bottom, and the fabric, color and detailing stay consistent across both.",
    },
    {
      q: "What fabric are tracksuits made from?",
      a: "Most tracksuits are made from 100% polyester, either a knit such as tricot or interlock for a soft, breathable feel, or a woven polyester for a smooth, lightweight shell. We build men's tracksuits in knit and women's in woven as standard, add Polyester/Spandex where a program needs stretch, and confirm the fabric on your sample.",
    },
    {
      q: "Can you color-match retro stripes and piping exactly?",
      a: "Yes. Coordinated side stripes, piping and contrast panels are core to a tracksuit, aligned across the jacket and pant to your artwork.",
    },
    {
      q: "Can you add player names and numbers?",
      a: "Yes. Names and numbers by tackle twill or sublimation, a standard teamwear service across both pieces.",
    },
    {
      q: "Can I approve a mockup before production?",
      a: "Yes. We share a digital mockup or rendering for your approval before we cut a single piece.",
    },
    {
      q: "Can I order the jacket or pant on its own?",
      a: "Yes. A tracksuit is made as a matched set, and the same jacket and pant can also be ordered as separates through our Track Jackets & Zip-Ups and Joggers ranges.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric and weight, color and Pantone match, stripes, piping and color-blocking, collar, jacket closure, pant taper and hem, lining, names and numbers, branding across both pieces, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM, and private label tracksuits?",
      a: "Yes, all three. As a private label tracksuit manufacturer, we make every style under your brand, with your labels and packaging.",
    },
    {
      q: "How are tracksuits sized?",
      a: "Alpha XS to 5XL, with separate men's and women's pattern blocks and mix-and-match jacket and pant sizing for team roster orders.",
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
  ctaReferenceNoun: "tracksuit",
  // "How we customize" for every Tracksuits PDP (owner spec, 2026-09-24):
  // 6 tracksuit-specific tiles, overriding the shared 5-step default. Same
  // temporary factory photography as the shared default.
  pdpCustomizationSteps: {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    mobileHeading: "Your brand, applied in-house, no outsourcing",
    steps: [
      { title: "Print and artwork", body: "Sublimation, screen, DTF, heat transfer", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Print and artwork" } },
      { title: "Branding", body: "Embroidery, tackle twill, names and numbers", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Branding" } },
      { title: "Fabric and weight", body: "Polyester knit or woven, any weight, sourced or matched to your reference", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Fabric and weight" } },
      { title: "Build", body: "Collar, zip, pockets, pant taper and hem to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Build" } },
      { title: "Matching", body: "Jacket and pant cut and dyed together, Pantone matched", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Matching" } },
      { title: "Trims and packaging", body: "Woven or tear-away labels, hangtags, set or separates packaging", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Trims and packaging" } },
    ],
  },
  // 2 SKUs, SKU-number order: CAP-TSU-01 men's, CAP-TSU-02 women's. Card
  // alt is the card title; PDP gallery alts add ", men's"/", women's".
  styleCards: [
    {
      status: "draft",
      slug: "full-zip-knit",
      gender: "Men",
      cardTitle: "Men's Full-Zip Knit Tracksuit",
      cardSubline: "Stand collar, color-blocked jacket, tapered pant",
      image: "",
      imageAlt: "Men's Full-Zip Knit Tracksuit",
      href: "/capriowear/activewear/tracksuits/full-zip-knit",
      sku: "CAP-TSU-01",
      pdpHeading: "Men's Full-Zip Knit Tracksuit Manufacturer",
      pdpDescription:
        "Men's full-zip knit tracksuit, custom and private label, a stand-collar track jacket and matching tapered pant cut and dyed together in 100% polyester knit, with coordinated color-blocking, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Men's Full-Zip Knit Tracksuit Manufacturer",
      pdpMetaDescription:
        "Men's full-zip knit tracksuit manufacturer, private label, stand-collar jacket and tapered pant, matched color-blocking, MOQ from 50, DDP to 20+ countries.",
      images: [
        { alt: "Men's Full-Zip Knit Tracksuit, men's" },
        { alt: "Men's Full-Zip Knit Tracksuit, men's" },
        { alt: "Men's Full-Zip Knit Tracksuit, men's" },
        { alt: "Men's Full-Zip Knit Tracksuit, men's" },
        { alt: "Men's Full-Zip Knit Tracksuit, men's" },
        { alt: "Men's Full-Zip Knit Tracksuit, men's" },
      ],
      material: "100% polyester knit, the same fabric across jacket and pant",
      pdpFabricPills: ["Polyester Knit", "Interlock", "Recycled Polyester", "Polyester/Spandex"],
      pdpCustomizationPills: ["Custom fabric", "Custom color & print", "Your fit", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "What fabric is the men's full-zip knit tracksuit made from?",
          a: "The men's full-zip knit tracksuit is built in a 100% polyester knit, soft and breathable, with the same fabric across the jacket and pant so the set matches. Tricot, interlock, or recycled polyester are options, and the fabric and weight are confirmed on your sample.",
        },
        {
          q: "Can the men's full-zip knit tracksuit be made in team colors?",
          a: "Yes. The color-blocked jacket and matching pant panels of the men's full-zip knit tracksuit are cut and dyed to your team or brand colors with Pantone matching, and names and numbers can be added by tackle twill or sublimation.",
        },
        {
          q: "What pant finishes are available on the men's full-zip knit tracksuit?",
          a: "The standard pant on the men's full-zip knit tracksuit has a tapered leg, an elastic waistband with an internal drawcord, and a color-blocked ankle panel. Ankle zips, cuffed hems, and zip pockets are available to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Full-Zip Woven Tracksuit", slug: "full-zip-woven", href: "/capriowear/activewear/tracksuits" },
        { label: "See All", href: "/capriowear/activewear/tracksuits" },
      ],
      specifications: [
        { label: "Style", value: "Men's full-zip tracksuit, matched jacket and pant" },
        { label: "Fabric", value: "100% polyester knit, the same fabric across jacket and pant" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Athletic, streamlined through the body and leg" },
        { label: "Jacket", value: "Stand collar, full zip, zip hand pockets, color-blocked panels" },
        { label: "Pant", value: "Tapered leg, elastic waistband with internal drawcord, color-blocked ankle panel" },
        { label: "Hem", value: "Cuffed, open or ankle-zip, to your spec" },
        { label: "Matching", value: "Cut and dyed together from one lot, Pantone color matched" },
        { label: "Construction", value: "Cut-and-sew, coverstitch or flatlock seams" },
        { label: "Branding", value: "Sublimation, embroidery, heat transfer, tackle twill names and numbers, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Men's Full-Zip Knit Tracksuit, men's" },
      pdpQualityHeading: "Matched top to bottom, wash after wash",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Jacket and pant cut and dyed from the same lot, no mismatched shades",
        "Color-block panels aligned between jacket and pant",
        "Zips cycled and function-tested before bulk",
        "Waistband and drawcord hold their recovery",
        "Colorfastness checked after wash, no bleed between color-blocks",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "full-zip-woven",
      gender: "Women",
      cardTitle: "Women's Full-Zip Woven Tracksuit",
      cardSubline: "Stand collar, side stripe, tapered pant",
      image: "",
      imageAlt: "Women's Full-Zip Woven Tracksuit",
      href: "/capriowear/activewear/tracksuits/full-zip-woven",
      sku: "CAP-TSU-02",
      pdpHeading: "Women's Full-Zip Woven Tracksuit Manufacturer",
      pdpDescription:
        "Women's full-zip woven tracksuit, custom and private label, a stand-collar track jacket and matching tapered pant cut on a women's pattern block in 100% woven polyester, with a contrast side stripe, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Women's Full-Zip Woven Tracksuit Manufacturer",
      pdpMetaDescription:
        "Women's full-zip woven tracksuit manufacturer, private label, stand-collar jacket, tapered pant, contrast side stripe, MOQ from 50, DDP to 20+ countries.",
      images: [
        { alt: "Women's Full-Zip Woven Tracksuit, women's" },
        { alt: "Women's Full-Zip Woven Tracksuit, women's" },
        { alt: "Women's Full-Zip Woven Tracksuit, women's" },
        { alt: "Women's Full-Zip Woven Tracksuit, women's" },
        { alt: "Women's Full-Zip Woven Tracksuit, women's" },
        { alt: "Women's Full-Zip Woven Tracksuit, women's" },
      ],
      material: "100% woven polyester, the same fabric across jacket and pant",
      pdpFabricPills: ["Woven Polyester", "Recycled Polyester", "Polyester Knit", "Polyester/Spandex"],
      pdpCustomizationPills: ["Custom fabric", "Custom color & print", "Your fit", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "Why is the women's full-zip woven tracksuit built in woven polyester?",
          a: "The women's full-zip woven tracksuit uses a 100% woven polyester for a smooth, lightweight shell that holds a crisp line, while the men's version uses a softer knit. A knit or Polyester/Spandex build is available on request, confirmed on your sample.",
        },
        {
          q: "How does the Women's Full-Zip Woven Tracksuit differ from the Men's Full-Zip Knit Tracksuit?",
          a: "The Women's Full-Zip Woven Tracksuit is cut on a separate women's pattern block in woven polyester with a contrast side stripe. The Men's Full-Zip Knit Tracksuit is built in polyester knit with color-blocked panels. Both pair a stand-collar full-zip jacket with a matching tapered pant.",
        },
        {
          q: "Can the side stripe on the women's full-zip woven tracksuit match our brand colors?",
          a: "Yes. On the women's full-zip woven tracksuit, the contrast side stripe runs from jacket to pant and is Pantone matched to your brand or team colors, aligned across both pieces on your sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Full-Zip Knit Tracksuit", slug: "full-zip-knit", href: "/capriowear/activewear/tracksuits" },
        { label: "See All", href: "/capriowear/activewear/tracksuits" },
      ],
      specifications: [
        { label: "Style", value: "Women's full-zip tracksuit, matched jacket and pant" },
        { label: "Fabric", value: "100% woven polyester, the same fabric across jacket and pant" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Cut on a women's pattern block, streamlined through the body and leg" },
        { label: "Jacket", value: "Stand collar, full zip, contrast side stripe" },
        { label: "Pant", value: "Tapered leg, elastic waistband with drawcord, matching side stripe" },
        { label: "Hem", value: "Cuffed, open or ankle-zip, to your spec" },
        { label: "Matching", value: "Cut and dyed together from one lot, Pantone color matched" },
        { label: "Construction", value: "Cut-and-sew, coverstitch or flatlock seams" },
        { label: "Branding", value: "Sublimation, embroidery, heat transfer, tackle twill names and numbers, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Women's Full-Zip Woven Tracksuit, women's" },
      pdpQualityHeading: "Matched top to bottom, stripe to stripe",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Jacket and pant cut and dyed from the same lot, no mismatched shades",
        "Side stripes aligned from jacket to pant",
        "Woven seams checked for puckering and slippage",
        "Zips cycled and function-tested before bulk",
        "Colorfastness checked after wash, no bleed into the stripe",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, same L1 group first
  // (Outerwear & Suits, per activewearMegaMenu), then the closest pairings from other groups.
  relatedLinks: [
    { label: "Track Jackets & Zip-Ups", href: "/capriowear/activewear/track-jackets" },
    { label: "Hoodies", href: "/capriowear/activewear/hoodies" },
    { label: "Jackets", href: "/capriowear/activewear/jackets" },
    { label: "Running Wear", href: "/capriowear/activewear/running-wear" },
    { label: "Joggers", href: "/capriowear/activewear/joggers" },
  ],
};
