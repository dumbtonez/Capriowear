// content/activewear/track-jackets.ts
// Rebuilt to the owner's locked 3-SKU catalog and copy (owner spec,
// 2026-09-24), replacing the 5 card-only test cards (none had a PDP route,
// so nothing needed removing). Unisex category: no All/Women/Men toggle,
// no `gender` field on any card, and every style name carries "Custom"
// (owner decision for this category), same single-gender template as
// Bodysuits and Jumpsuits.
//
// All 3 SKUs carry full draft PDP content, so their cards link (the
// sitewide `isDraftPdpReachable()` rule) and their pages render noindexed,
// with no sitemap entry and no Product/FAQPage JSON-LD. "How we customize"
// is set once for the category (6 track-jacket tiles), and each style
// carries "Custom color & print" customization chips. Key facts, spec
// subtitle and the operational FAQs are the shared PDP defaults
// (./pdpShared.ts). Related-style pills carry a `slug`, so each resolves
// to its sibling PDP.
//
// Explicit category boundary, carried into the fabric note and one FAQ
// answer: track jackets are knit; woven wind and rain shells belong to
// Jackets. Second category under the "OUTERWEAR & SUITS" mega-menu group
// (content/home.ts), after Jackets. No `weightTiers` block (owner spec).
import type { Category } from "./types";
import { faqGetStarted } from "./pdpShared";

const CUSTOMIZATION_PILLS = ["Custom fabric", "Custom color & print", "Your fit", "Your branding", "Custom labels", "Custom packaging"];

export const trackJackets: Category = {
  slug: "track-jackets",
  group: "Activewear",
  menuLabel: "Track Jackets & Zip-Ups",
  // Verbatim override pair (owner spec, 2026-09-24): bypasses
  // categoryEntityFaq()'s templated sentence entirely.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom track jacket manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label track jackets and zip-ups from fabric to packaging, including striped and raglan quarter-zip track tops and hooded color-block track jackets in polyester interlock and performance stretch knits, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  h1: "Custom Track Jacket Manufacturer",
  metaTitle: "Custom Track Jacket Manufacturer",
  metaDescription:
    "Custom track jacket manufacturer: private label quarter-zip track tops and hooded color-block track jackets in knit polyester, MOQ 50, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Unisex category: the All/Women/Men chip row does not render.
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester interlock",
      bestFor: "Hooded and full-zip track jackets",
      performance: "Smooth, stable double-knit face that holds color-blocking and print",
    },
    {
      fabric: "Performance stretch knit (Polyester/Spandex)",
      bestFor: "Quarter-zip training tops",
      performance: "Stretch and recovery for movement, quick-drying",
    },
    {
      fabric: "Brushed polyester tricot",
      bestFor: "Classic warm-up track jackets",
      performance: "Soft brushed interior with a smooth face",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainable team and brand programs",
      performance: "Recycled content in knit builds",
    },
    {
      fabric: "Mesh lining",
      bestFor: "Hoods and team jackets",
      performance: "Adds airflow and a clean inside finish",
    },
  ],
  fabricNote: [
    {
      text: "Track jackets are knit, built for stretch and comfort in training, warm-ups and travel, while woven wind and rain shells sit in our Jackets range. Fabric weight is confirmed on your sample. Swatches before every bulk run, and we can source or match a specific fabric or a Pantone color from your reference.",
    },
  ],
  fabricPills: ["Polyester interlock", "Performance stretch knit", "Brushed tricot", "Recycled polyester", "Mesh lining"],
  qualityHeading: "Cut clean, zips smooth, holds color",
  qualitySubline: "We check the knit, the zip and the color on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Fabric weight held consistent, batch to batch",
    "Shrinkage tested after wash, targeted under 5%, knit face checked for pilling",
    "Zips cycled and function-tested before bulk",
    "Stripes and color-block panels aligned at every size",
    "Colorfastness checked after wash, no bleed between colors",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Polyester interlock, performance stretch knit, brushed tricot, recycled polyester, mesh lining" },
    { title: "Zip and collar", body: "Quarter-zip or full-zip, stand, funnel or hooded, zipper garage" },
    { title: "Sleeve and cuff", body: "Set-in or raglan sleeves, ribbed or self-fabric cuffs, thumbholes on request" },
    { title: "Color and stripes", body: "Sleeve stripes, color-block panels and chevron yokes, Pantone matched" },
    { title: "Branding", body: "Sublimation, screen, heat transfer, embroidery, reflective trims" },
    { title: "Labels and packaging", body: "Woven or printed labels, hangtags, polybags or boxes" },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Entity question is NOT stored here -- see entityQuestion/entityAnswer
  // above; the route prepends it at render time. The remaining 16 below.
  faqs: [
    {
      q: "What is your MOQ for custom track jackets?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk, with team programs available.",
    },
    {
      q: "What is the difference between a track jacket and a windbreaker?",
      a: "A track jacket is knit, built for stretch and comfort in training, warm-ups and travel. A windbreaker is a woven shell built to block wind and light rain. We make both, track jackets here and windbreakers in our Jackets range.",
    },
    {
      q: "What is the difference between a quarter-zip track top and a full-zip track jacket?",
      a: "A quarter-zip track top pulls on over the head with a short zip at the neck, a lighter layer for training. A full-zip track jacket opens all the way down and layers over other kit as a warm-up. We make both, to your spec.",
    },
    {
      q: "What fabrics do you use for track jackets?",
      a: "Polyester interlock for a smooth, stable face that holds color-blocking and print, performance Polyester/Spandex knits for quarter-zip training tops, brushed tricot for a classic warm-up feel, and recycled polyester for sustainable lines, all confirmed on your sample.",
    },
    {
      q: "Can you add a zipper garage, thumbholes or reflective trims?",
      a: "Yes. A zipper garage at the collar, thumbhole cuffs, reflective trims and zip pockets can all be added to your spec and confirmed on your sample.",
    },
    {
      q: "Can you add sleeve stripes and color-blocking?",
      a: "Yes. Sleeve stripes, color-block panels and chevron yokes are cut and aligned to your artwork, Pantone matched, and checked for alignment at every size.",
    },
    {
      q: "Can you add team names, numbers and logos?",
      a: "Yes. Names, numbers and logos by sublimation, screen print, heat transfer or embroidery, placed to your spec across chest, sleeve and back.",
    },
    {
      q: "Can I order a matching pant?",
      a: "Yes. A track jacket can be paired with a matching pant as a set through our Tracksuits range, or ordered on its own here.",
    },
    {
      q: "Can you match a specific fabric or a reference track jacket?",
      a: "Yes. Send a swatch, reference garment, or tech pack and we source or develop to match, then share swatches and confirm on your sample before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric and weight, zip length, collar and hood, sleeves and cuffs, stripes and color-blocking, color with Pantone matching, your logos, labels, hangtags, and packaging.",
    },
    {
      q: "Do you offer OEM, ODM, and private label track jackets?",
      a: "Yes, all three. As a private label track jacket manufacturer, we make every style under your brand, with your labels and packaging.",
    },
    {
      q: "How are track jackets sized?",
      a: "Alpha XS to 5XL on a unisex block, with separate men's and women's cuts to your spec and mix-and-match sizing within a colorway for team orders.",
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
  ctaReferenceNoun: "track jacket",
  // "How we customize" for every Track Jackets PDP (owner spec,
  // 2026-09-24): 6 track-jacket tiles, overriding the shared 5-step
  // default. Same temporary factory photography as the shared default.
  pdpCustomizationSteps: {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    mobileHeading: "Your brand, applied in-house, no outsourcing",
    steps: [
      { title: "Print and artwork", body: "Sublimation, screen, DTF, heat transfer", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Print and artwork" } },
      { title: "Branding", body: "Embroidery, patches, reflective trims", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Branding" } },
      { title: "Fabric and weight", body: "Interlock or performance knit, any weight, sourced or matched to your reference", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Fabric and weight" } },
      { title: "Build", body: "Zip length, collar, hood, sleeves and cuffs to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Build" } },
      { title: "Color", body: "Stripes and color-block panels, Pantone matched", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" } },
      { title: "Trims and packaging", body: "Woven or printed labels, hangtags, retail-ready packaging", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Trims and packaging" } },
    ],
  },
  // 3 drafts, all with PDP content, SKU-number order (CAP-TJK-01 to 03).
  // Card and image alt text is the card name exactly.
  styleCards: [
    {
      status: "draft",
      slug: "striped-quarter-zip",
      cardTitle: "Custom Striped Quarter-Zip Track Top",
      cardSubline: "Quarter-zip, contrast sleeve stripes",
      image: "",
      imageAlt: "Custom Striped Quarter-Zip Track Top",
      href: "/capriowear/activewear/track-jackets/striped-quarter-zip",
      sku: "CAP-TJK-01",
      pdpHeading: "Custom Striped Quarter-Zip Track Top Manufacturer",
      pdpDescription:
        "Quarter-zip track top with contrast sleeve stripes, custom and private label, in a quick-drying performance stretch knit with a zip-neck collar, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Striped Quarter-Zip Track Top Manufacturer",
      pdpMetaDescription:
        "Custom striped quarter-zip track top manufacturer, private label, performance stretch knit, contrast sleeve stripes, MOQ from 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Striped Quarter-Zip Track Top" },
        { alt: "Custom Striped Quarter-Zip Track Top" },
        { alt: "Custom Striped Quarter-Zip Track Top" },
        { alt: "Custom Striped Quarter-Zip Track Top" },
        { alt: "Custom Striped Quarter-Zip Track Top" },
        { alt: "Custom Striped Quarter-Zip Track Top" },
      ],
      material: "Polyester performance stretch knit, blend confirmed on your sample.",
      pdpFabricPills: ["Performance Stretch Knit", "Polyester Interlock", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "How many sleeve stripes does the striped quarter-zip track top have?",
          a: "The striped quarter-zip track top is built with contrast sleeve stripes, 2 bold or 4 fine as standard. Stripe count, width, and color are set to your spec and Pantone matched.",
        },
        {
          q: "What fabric is the striped quarter-zip track top made from?",
          a: "The striped quarter-zip track top is built in a quick-drying polyester performance stretch knit that moves with training. The exact blend and weight are confirmed on your sample, and interlock or recycled polyester are options.",
        },
        {
          q: "Can the striped quarter-zip track top be made as a full-zip?",
          a: "Yes. The striped quarter-zip track top can move to a full-length zip with the same stripes and fabric, and a zipper garage at the collar on request.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Raglan Quarter-Zip Track Top", slug: "raglan-quarter-zip", href: "/capriowear/activewear/track-jackets" },
        { label: "Custom Hooded Color-Block Track Jacket", slug: "hooded-color-block", href: "/capriowear/activewear/track-jackets" },
        { label: "See All", href: "/capriowear/activewear/track-jackets" },
      ],
      specifications: [
        { label: "Style", value: "Quarter-zip track top with contrast sleeve stripes" },
        { label: "Fabric", value: "Polyester performance stretch knit, blend confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Unisex athletic fit, graded XS to 5XL" },
        { label: "Zip and collar", value: "Quarter-length zip, zip-neck collar" },
        { label: "Sleeve", value: "Set-in sleeves with contrast stripes, 2 bold or 4 fine, to your spec" },
        { label: "Cuffs and hem", value: "Self-fabric or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, heat transfer, embroidery, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Striped Quarter-Zip Track Top" },
      pdpQualityHeading: "Stripes that line up, stretch that holds",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Sleeve stripes aligned and consistent at every size",
        "Stretch and recovery tested before bulk",
        "Zip cycled and function-tested before bulk",
        "Shrinkage tested after wash, targeted under 5%",
        "Colorfastness checked after wash, no bleed into the stripes",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "raglan-quarter-zip",
      cardTitle: "Custom Raglan Quarter-Zip Track Top",
      cardSubline: "Quarter-zip, raglan sleeves",
      image: "",
      imageAlt: "Custom Raglan Quarter-Zip Track Top",
      href: "/capriowear/activewear/track-jackets/raglan-quarter-zip",
      sku: "CAP-TJK-02",
      pdpHeading: "Custom Raglan Quarter-Zip Track Top Manufacturer",
      pdpDescription:
        "Quarter-zip track top with raglan sleeves, custom and private label, in a smooth polyester knit with a zip-neck collar, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Raglan Quarter-Zip Track Top Manufacturer",
      pdpMetaDescription:
        "Custom raglan quarter-zip track top manufacturer, private label, raglan sleeves, smooth polyester knit, zip-neck collar, MOQ from 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Raglan Quarter-Zip Track Top" },
        { alt: "Custom Raglan Quarter-Zip Track Top" },
        { alt: "Custom Raglan Quarter-Zip Track Top" },
        { alt: "Custom Raglan Quarter-Zip Track Top" },
        { alt: "Custom Raglan Quarter-Zip Track Top" },
        { alt: "Custom Raglan Quarter-Zip Track Top" },
      ],
      material: "Polyester knit, blend confirmed on your sample.",
      pdpFabricPills: ["Polyester Knit", "Performance Stretch Knit", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "Why choose raglan sleeves on a quarter-zip track top?",
          a: "Raglan sleeves run in one piece from the collar to the cuff, so the raglan quarter-zip track top gives more freedom through the shoulder than a set-in sleeve, and the raglan seam frames contrast color panels well.",
        },
        {
          q: "What fabric is the raglan quarter-zip track top made from?",
          a: "The raglan quarter-zip track top is built in a smooth polyester knit that takes print and embroidery cleanly. The exact blend and weight are confirmed on your sample, and a stretch knit or recycled polyester is available.",
        },
        {
          q: "Can the raglan panels be a contrast color?",
          a: "Yes. On the raglan quarter-zip track top, the raglan sleeve panels can be cut in a contrast color, Pantone matched to your brand or team colors.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Striped Quarter-Zip Track Top", slug: "striped-quarter-zip", href: "/capriowear/activewear/track-jackets" },
        { label: "Custom Hooded Color-Block Track Jacket", slug: "hooded-color-block", href: "/capriowear/activewear/track-jackets" },
        { label: "See All", href: "/capriowear/activewear/track-jackets" },
      ],
      specifications: [
        { label: "Style", value: "Quarter-zip track top with raglan sleeves" },
        { label: "Fabric", value: "Polyester knit, blend confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Unisex athletic fit, graded XS to 5XL" },
        { label: "Zip and collar", value: "Quarter-length zip, zip-neck collar" },
        { label: "Sleeve", value: "Raglan sleeves for free shoulder movement, contrast raglan panels to your spec" },
        { label: "Cuffs and hem", value: "Self-fabric or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, heat transfer, embroidery, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Raglan Quarter-Zip Track Top" },
      pdpQualityHeading: "Raglan fit, color that holds",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Raglan seams stress-tested at the shoulder and underarm",
        "Fabric weight held consistent, batch to batch",
        "Zip cycled and function-tested before bulk",
        "Shrinkage tested after wash, targeted under 5%",
        "Colorfastness checked after wash, no bleed between panels",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "hooded-color-block",
      cardTitle: "Custom Hooded Color-Block Track Jacket",
      cardSubline: "Full-zip, hood, color-block panels",
      image: "",
      imageAlt: "Custom Hooded Color-Block Track Jacket",
      href: "/capriowear/activewear/track-jackets/hooded-color-block",
      sku: "CAP-TJK-03",
      pdpHeading: "Custom Hooded Color-Block Track Jacket Manufacturer",
      pdpDescription:
        "Hooded full-zip track jacket with color-block panels and a chevron yoke, custom and private label, in a 220 GSM polyester interlock knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Hooded Color-Block Track Jacket Manufacturer",
      pdpMetaDescription:
        "Custom hooded color-block track jacket manufacturer, private label, 220 GSM polyester interlock, chevron yoke, full zip, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Hooded Color-Block Track Jacket" },
        { alt: "Custom Hooded Color-Block Track Jacket" },
        { alt: "Custom Hooded Color-Block Track Jacket" },
        { alt: "Custom Hooded Color-Block Track Jacket" },
        { alt: "Custom Hooded Color-Block Track Jacket" },
        { alt: "Custom Hooded Color-Block Track Jacket" },
      ],
      material: "100% polyester interlock knit",
      pdpFabricPills: ["Polyester Interlock", "Performance Stretch Knit", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is polyester interlock, and why use it for the hooded color-block track jacket?",
          a: "Polyester interlock is a double-knit, smooth on both faces and more stable than a single jersey, so the hooded color-block track jacket holds crisp panel lines and takes print and embroidery cleanly. Its standard build is 220 GSM, confirmed on your sample.",
        },
        {
          q: "Can the color-block panels be matched to our team colors?",
          a: "Yes. The body panels and chevron yoke of the hooded color-block track jacket are cut in your team or brand colors with Pantone matching, and aligned across every size.",
        },
        {
          q: "Can the hooded color-block track jacket be made without a hood?",
          a: "Yes. The hooded color-block track jacket can move to a stand or funnel collar, and the hood can be lined with mesh on request.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Striped Quarter-Zip Track Top", slug: "striped-quarter-zip", href: "/capriowear/activewear/track-jackets" },
        { label: "Custom Raglan Quarter-Zip Track Top", slug: "raglan-quarter-zip", href: "/capriowear/activewear/track-jackets" },
        { label: "See All", href: "/capriowear/activewear/track-jackets" },
      ],
      specifications: [
        { label: "Style", value: "Hooded full-zip track jacket with color-block panels" },
        { label: "Fabric", value: "100% polyester interlock knit" },
        { label: "Weight", value: "220 GSM. Final weight confirmed on your sample." },
        { label: "Fit", value: "Unisex athletic fit, graded XS to 5XL" },
        { label: "Zip and hood", value: "Full-length zip, attached hood" },
        { label: "Panels", value: "Color-block body and chevron yoke, to your colors" },
        { label: "Pockets", value: "Side pockets, zip or open, to your spec" },
        { label: "Cuffs and hem", value: "Self-fabric or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, heat transfer, embroidery, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Hooded Color-Block Track Jacket" },
      pdpQualityHeading: "Color-blocked clean, panel to panel",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Color-block seams and chevron yoke aligned at every size",
        "GSM held consistent, batch to batch",
        "Zip cycled and function-tested before bulk",
        "Hood holds its shape after wash",
        "Colorfastness checked after wash, no bleed between panels",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, same L1 group first
  // (Outerwear & Suits, per activewearMegaMenu), then the closest pairings from other groups.
  relatedLinks: [
    { label: "Jackets", href: "/capriowear/activewear/jackets" },
    { label: "Tracksuits", href: "/capriowear/activewear/tracksuits" },
    { label: "Hoodies", href: "/capriowear/activewear/hoodies" },
    { label: "Running Wear", href: "/capriowear/activewear/running-wear" },
    { label: "Joggers", href: "/capriowear/activewear/joggers" },
  ],
};
