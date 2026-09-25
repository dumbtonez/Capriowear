// content/activewear/jackets.ts
// Rebuilt to the owner's locked 12-SKU catalog and copy (owner spec,
// 2026-09-24), replacing the 7 card-only test cards (none had a PDP route,
// so nothing needed removing). Unisex category: no All/Women/Men toggle,
// no `gender` field on any card, and every style name carries "Custom"
// (owner decision), same pattern as Track Jackets & Zip-Ups.
//
// PDP batch 1 (owner spec, 2026-09-24): SKUs 1 to 3 carry full draft PDP
// content, so their cards link (the sitewide `isDraftPdpReachable()` rule)
// and their pages render noindexed, with no sitemap entry and no
// Product/FAQPage JSON-LD. Batches 2 to 4 (owner spec, 2026-09-24 to
// 2026-09-25) add SKUs 4 to 6, 7 to 9 and 10 to 12 the same way, so all
// 12 cards now link. "How we
// customize" is set once for the category (6 jacket tiles); key facts,
// spec subtitle and the operational FAQs are the shared PDP defaults
// (./pdpShared.ts).
//
// Water performance, not GSM weight tiers: reuses the `weightTiers` table
// with its own `weightTiersHeaders` override (Level / How it's built /
// Use). Only the third row describes a waterproof build, and no SKU makes
// a waterproof claim. Explicit category boundary, carried into the fabric
// note and one FAQ answer: jackets are woven shells, quilted and fleece
// builds; knit track jackets belong to Track Jackets & Zip-Ups. First
// category under the "OUTERWEAR & SUITS" mega-menu group (content/home.ts).
import type { Category } from "./types";
import { faqGetStarted } from "./pdpShared";

const CUSTOMIZATION_PILLS = ["Custom fabric", "Custom color & print", "Your fit", "Your branding", "Custom labels", "Custom packaging"];
const PLP = "/capriowear/activewear/jackets";

export const jackets: Category = {
  slug: "jackets",
  group: "Activewear",
  menuLabel: "Jackets",
  // Verbatim override pair (owner spec, 2026-09-24): bypasses
  // categoryEntityFaq()'s templated sentence entirely.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom jacket manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label jackets from fabric to packaging, including softshell, windbreaker, performance, quilted puffer, hybrid, bench and fleece jackets in woven, quilted and fleece builds, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  h1: "Custom Jacket Manufacturer",
  // SERP-verified primary "jacket manufacturer" (owner spec, 2026-09-24).
  metaTitle: "Custom Jacket Manufacturer",
  metaDescription:
    "Custom jacket manufacturer: private label softshell, windbreaker, quilted puffer, hybrid and fleece jackets for brands and teams, MOQ 50, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Unisex category: the All/Women/Men chip row does not render.
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Softshell (Polyester/Spandex or polyester)",
      bestFor: "Hooded softshell and hybrid sleeves",
      performance: "Wind-resistant woven, often with stretch, lightweight 125 GSM up to structured 320 GSM",
    },
    {
      fabric: "Performance stretch woven (Polyester/Spandex)",
      bestFor: "Performance and cycling-style jackets",
      performance: "Stretch and recovery for movement, quick-drying",
    },
    {
      fabric: "Polyester microfiber",
      bestFor: "Running windbreakers and lightweight jackets",
      performance: "Light, smooth, wind-resistant woven face",
    },
    {
      fabric: "Quilted polyester shell",
      bestFor: "Puffer, bench and hybrid jackets",
      performance: "Stitch-through quilting holds synthetic fill in place",
    },
    {
      fabric: "Polar and sherpa fleece (polyester)",
      bestFor: "Fleece full-zip jackets",
      performance: "Brushed or high-pile face for warmth, quick-drying",
    },
    {
      fabric: "Mesh lining",
      bestFor: "Hoods and running jackets",
      performance: "Adds airflow and a clean inside finish",
    },
  ],
  // Water performance, not weight tiers -- Level / How it's built / Use,
  // via weightTiersHeaders below.
  weightTiers: [
    {
      tier: "Wind-resistant",
      gsm: "A tightly woven shell or softshell face",
      bestFor: "Blocks wind by weave density, standard on every woven shell",
    },
    {
      tier: "Water-repellent",
      gsm: "DWR surface finish",
      bestFor: "Beads off light rain and spray, not sustained rain, added on request",
    },
    {
      tier: "Waterproof",
      gsm: "Coated or laminated shell plus taped seams",
      bestFor: "Only claimed when built and tested to a stated hydrostatic head rating, confirmed on your sample",
    },
  ],
  weightTiersHeaders: { tier: "Level", value: "How it's built", bestFor: "Use" },
  fabricNote: [
    {
      text: "Jackets here are woven shells, quilted and fleece builds, while smooth-face knit track jackets and zip-ups sit in our Track Jackets & Zip-Ups range. Fabric weight is confirmed on your sample. Swatches before every bulk run, and we can source or match a specific fabric or a Pantone color from your reference.",
    },
  ],
  fabricPills: ["Softshell", "Stretch woven", "Polyester microfiber", "Quilted shell", "Polar and sherpa fleece", "Mesh lining"],
  qualityHeading: "Cut clean, zipped smooth, built to last",
  qualitySubline: "We check the shell, the seams and the hardware on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Fabric weight and shell finish held consistent, batch to batch",
    "Seams and stress points checked on every panel, including hoods and pockets",
    "Zips cycled and function-tested before bulk",
    "Quilted jackets: stitch lines checked so insulation stays put after wash",
    "Shrinkage and colorfastness checked after wash, fleece checked for pilling",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Shell and fabric", body: "Softshell, stretch woven, microfiber, quilted shells, polar or sherpa fleece, by weight" },
    { title: "Water and wind", body: "Wind-resistant woven shells as standard, DWR water-repellent finish on request" },
    {
      title: "Insulation and quilting",
      body: "Synthetic fill by gram weight, stitch-through quilting, full quilted body or vest-front hybrid",
    },
    {
      title: "Hardware and build",
      body: "Full or half zip, hood, collar, cuffs, hem drawcord, zip pockets, zipper garage",
    },
    {
      title: "Color and print",
      body: "Pantone matched colors, color-blocking, chevron and sleeve stripes, embroidery, heat transfer, reflective trims",
    },
    { title: "Labels and packaging", body: "Woven or printed labels, hangtags, polybags or boxes" },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Entity question is NOT stored here -- see entityQuestion/entityAnswer
  // above; the route prepends it at render time. The remaining 16 below.
  faqs: [
    {
      q: "What is your MOQ for custom jackets?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk, with team programs available.",
    },
    {
      q: "What is the difference between a softshell and a windbreaker?",
      a: "A softshell is a woven with more body, often with stretch, built for training and sideline wear in cool weather. A windbreaker is a light, thin woven shell built to cut wind on the move. We make both, to your spec.",
    },
    {
      q: "What is the difference between water-resistant and waterproof?",
      a: "Our woven jacket shells are wind-resistant, and a DWR finish can be added so light rain beads off. A jacket is only called waterproof when it is built with a coated or laminated shell and taped seams and tested to a stated hydrostatic head rating, confirmed on your sample.",
    },
    {
      q: "What is the difference between a jacket and a track jacket?",
      a: "A jacket here is a woven shell, a quilted build or a fleece, made for weather and warmth. A track jacket is a smooth-face knit, such as interlock or tricot, built for stretch and comfort in training and warm-ups, and sits in our Track Jackets & Zip-Ups range. We make both.",
    },
    {
      q: "What fabrics do you use for jackets?",
      a: "Our jackets are made in polyester and Polyester/Spandex softshells, stretch and plain polyester wovens, lightweight polyester microfiber, quilted polyester shells with synthetic fill, and polar and sherpa fleece, each confirmed on your sample.",
    },
    {
      q: "What insulation do your quilted jackets use?",
      a: "Our quilted jackets use synthetic fill, specified by gram weight and held in place by stitch-through quilting, in a fully quilted body or a vest-front hybrid with softshell sleeves. The fill weight is confirmed on your sample.",
    },
    {
      q: "What hardware and construction can you add?",
      a: "We can add full or half zips, a zipper garage at the collar, fixed or drawcord hoods, mesh hood linings, ribbed, elastic or self-fabric cuffs, hem drawcords, and zip or open pockets, all to your spec.",
    },
    {
      q: "Can you add team names, numbers and logos to jackets?",
      a: "Yes. Names, numbers and logos by embroidery, screen print, heat transfer or patches, placed to your spec across chest, sleeve and back, with reflective trims on request.",
    },
    {
      q: "Can you match a specific fabric or a reference jacket?",
      a: "Yes. Send a swatch, reference garment, or tech pack and we source or develop to match, then share swatches and confirm on your sample before bulk.",
    },
    {
      q: "What can I customize on a jacket?",
      a: "Everything from fabric to packaging: shell fabric and weight, water-repellent finish, insulation, zip, hood, collar, cuffs and pockets, color-blocking and stripes with Pantone matching, your logos, labels, hangtags, and packaging.",
    },
    {
      q: "Do you offer OEM, ODM, and private label jackets?",
      a: "Yes, all three. As a private label jacket manufacturer, we make every style under your brand, with your labels and packaging.",
    },
    {
      q: "How are jackets sized?",
      a: "Our jackets are sized Alpha XS to 5XL on a unisex block, with separate men's and women's cuts to your spec and mix-and-match sizing within a colorway for team orders.",
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
  ctaReferenceNoun: "jacket",
  // "How we customize" for every Jackets PDP (owner spec, 2026-09-24): 6
  // jacket tiles, overriding the shared 5-step default. Same temporary
  // factory photography as the shared default.
  pdpCustomizationSteps: {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    steps: [
      { title: "Print and artwork", body: "Screen, heat transfer, DTF", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Print and artwork" } },
      { title: "Branding", body: "Embroidery, patches, reflective trims", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Branding" } },
      { title: "Fabric and weight", body: "Shell fabric and weight, sourced or matched to your reference", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Fabric and weight" } },
      { title: "Build", body: "Zip, hood, collar, cuffs and pockets to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Build" } },
      { title: "Color", body: "Color-blocking and contrast panels, Pantone matched", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" } },
      { title: "Trims and packaging", body: "Woven or printed labels, hangtags, retail-ready packaging", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Trims and packaging" } },
    ],
  },
  // 12 drafts, SKU-number order (CAP-JKT-01 to 12). All 12 carry PDP
  // content. Card and image alt text is the card
  // name exactly.
  styleCards: [
    {
      status: "draft",
      slug: "lightweight-hooded-softshell",
      cardTitle: "Custom Lightweight Hooded Softshell Jacket",
      cardSubline: "Hooded softshell, Polyester/Spandex",
      image: "",
      imageAlt: "Custom Lightweight Hooded Softshell Jacket",
      href: `${PLP}/lightweight-hooded-softshell`,
      sku: "CAP-JKT-01",
      pdpHeading: "Custom Lightweight Hooded Softshell Jacket Manufacturer",
      pdpDescription:
        "Lightweight hooded softshell jacket, custom and private label, in a Polyester/Spandex stretch woven shell with a full-length zip and attached hood, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Lightweight Hooded Softshell Jacket Manufacturer",
      pdpMetaDescription:
        "Custom lightweight hooded softshell jacket manufacturer, private label, Polyester/Spandex stretch shell, drawcord hood, MOQ from 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Lightweight Hooded Softshell Jacket" },
        { alt: "Custom Lightweight Hooded Softshell Jacket" },
        { alt: "Custom Lightweight Hooded Softshell Jacket" },
        { alt: "Custom Lightweight Hooded Softshell Jacket" },
        { alt: "Custom Lightweight Hooded Softshell Jacket" },
        { alt: "Custom Lightweight Hooded Softshell Jacket" },
      ],
      material: "Polyester/Spandex stretch woven softshell (97/3)",
      pdpFabricPills: ["Polyester/Spandex Softshell", "Brushed-Back Softshell", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the lightweight hooded softshell jacket made from?",
          a: "The lightweight hooded softshell jacket is built in a Polyester/Spandex stretch woven, 97% polyester and 3% Spandex, at 125 to 150 GSM. The final weight is confirmed on your sample, and recycled polyester is an option.",
        },
        {
          q: "Is the lightweight hooded softshell jacket waterproof?",
          a: "No. The lightweight hooded softshell jacket is a wind-resistant stretch shell. A DWR finish can be added so light rain beads off, but it is not built or sold as a waterproof jacket.",
        },
        {
          q: "What is the difference between the lightweight and heavyweight hooded softshell jackets?",
          a: "The lightweight hooded softshell jacket is a 125 to 150 GSM stretch shell for layering and training. The heavyweight hooded softshell jacket is a 320 GSM polyester softshell with more structure and warmth for cooler-weather outerwear.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Heavyweight Hooded Softshell Jacket", slug: "heavyweight-hooded-softshell", href: PLP },
        { label: "Custom Stretch-Woven Performance Jacket", slug: "stretch-woven-performance", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Hooded full-zip softshell jacket" },
        { label: "Fabric", value: "Polyester/Spandex stretch woven softshell (97/3)" },
        { label: "Weight", value: "125 to 150 GSM. Final weight confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit, graded XS to 5XL" },
        { label: "Zip and hood", value: "Full-length zip, attached hood, drawcord to your spec" },
        { label: "Panels and trims", value: "Contrast sleeve panels and colored zip pulls, to your spec" },
        { label: "Pockets", value: "Zip hand pockets, to your spec" },
        { label: "Finish", value: "Wind-resistant shell, DWR water-repellent finish on request" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Lightweight Hooded Softshell Jacket" },
      pdpQualityHeading: "Light shell, stretch that holds",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Stretch and recovery tested before bulk",
        "Fabric weight held consistent, batch to batch",
        "Zip cycled and function-tested before bulk",
        "Water-repellent finish checked on your sample when specified",
        "Colorfastness checked after wash, no bleed into contrast panels",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "heavyweight-hooded-softshell",
      cardTitle: "Custom Heavyweight Hooded Softshell Jacket",
      cardSubline: "Hooded softshell, 320 GSM",
      image: "",
      imageAlt: "Custom Heavyweight Hooded Softshell Jacket",
      href: `${PLP}/heavyweight-hooded-softshell`,
      sku: "CAP-JKT-02",
      pdpHeading: "Custom Heavyweight Hooded Softshell Jacket Manufacturer",
      pdpDescription:
        "Heavyweight hooded softshell jacket with a chest zip pocket and two zip hand pockets, custom and private label, in a 320 GSM polyester softshell, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Heavyweight Hooded Softshell Jacket Manufacturer",
      pdpMetaDescription:
        "Custom heavyweight hooded softshell jacket manufacturer, private label, 320 GSM polyester softshell, chest and hand zip pockets, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Heavyweight Hooded Softshell Jacket" },
        { alt: "Custom Heavyweight Hooded Softshell Jacket" },
        { alt: "Custom Heavyweight Hooded Softshell Jacket" },
        { alt: "Custom Heavyweight Hooded Softshell Jacket" },
        { alt: "Custom Heavyweight Hooded Softshell Jacket" },
        { alt: "Custom Heavyweight Hooded Softshell Jacket" },
      ],
      material: "100% polyester softshell",
      pdpFabricPills: ["Polyester Softshell", "Polyester/Spandex Softshell", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "How heavy is the heavyweight hooded softshell jacket?",
          a: "The heavyweight hooded softshell jacket is built at 320 GSM in 100% polyester softshell, heavier and more structured than a lightweight stretch shell. The final weight is confirmed on your sample.",
        },
        {
          q: "How many pockets does the heavyweight hooded softshell jacket have?",
          a: "The heavyweight hooded softshell jacket has a chest zip pocket and two zip hand pockets as standard. Pocket count, placement and zip finish can be changed to your spec.",
        },
        {
          q: "Can the heavyweight hooded softshell jacket be made water-repellent?",
          a: "Yes. A DWR finish can be added to the heavyweight hooded softshell jacket so light rain and spray bead off. It is a wind-resistant, water-repellent shell, not a waterproof jacket.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Lightweight Hooded Softshell Jacket", slug: "lightweight-hooded-softshell", href: PLP },
        { label: "Custom Stretch-Woven Performance Jacket", slug: "stretch-woven-performance", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Hooded full-zip softshell jacket" },
        { label: "Fabric", value: "100% polyester softshell" },
        { label: "Weight", value: "320 GSM. Final weight confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit, graded XS to 5XL" },
        { label: "Zip and hood", value: "Full-length zip, attached hood" },
        { label: "Pockets", value: "Chest zip pocket and two zip hand pockets" },
        { label: "Finish", value: "Wind-resistant shell, DWR water-repellent finish on request" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Heavyweight Hooded Softshell Jacket" },
      pdpQualityHeading: "Structured shell, zips that last",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "GSM held consistent, batch to batch",
        "Main and pocket zips cycled and function-tested before bulk",
        "Seams and pocket corners checked at stress points",
        "Hood holds its shape after wash",
        "Colorfastness checked after wash",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "stretch-woven-performance",
      cardTitle: "Custom Stretch-Woven Performance Jacket",
      cardSubline: "Full-zip stretch woven, reflective trims",
      image: "",
      imageAlt: "Custom Stretch-Woven Performance Jacket",
      href: `${PLP}/stretch-woven-performance`,
      sku: "CAP-JKT-03",
      pdpHeading: "Custom Stretch-Woven Performance Jacket Manufacturer",
      pdpDescription:
        "Full-zip stretch-woven performance jacket with reflective forearm stripes and a chest zip pocket, custom and private label, in a 240 GSM Polyester/Spandex woven, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Stretch-Woven Performance Jacket Manufacturer",
      pdpMetaDescription:
        "Custom stretch-woven performance jacket manufacturer, private label, 240 GSM Polyester/Spandex, reflective trims, full zip, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Stretch-Woven Performance Jacket" },
        { alt: "Custom Stretch-Woven Performance Jacket" },
        { alt: "Custom Stretch-Woven Performance Jacket" },
        { alt: "Custom Stretch-Woven Performance Jacket" },
        { alt: "Custom Stretch-Woven Performance Jacket" },
        { alt: "Custom Stretch-Woven Performance Jacket" },
      ],
      material: "Polyester/Spandex stretch woven (90/10)",
      pdpFabricPills: ["Polyester/Spandex Stretch Woven", "Polyester/Spandex Softshell", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the stretch-woven performance jacket made from?",
          a: "The stretch-woven performance jacket is built in a 240 GSM Polyester/Spandex woven, 90% polyester and 10% Spandex, for stretch and recovery through the shoulders and arms. The final weight is confirmed on your sample.",
        },
        {
          q: "Can you add reflective trims to the stretch-woven performance jacket?",
          a: "Yes. The stretch-woven performance jacket carries reflective forearm stripes as standard, and reflective trims can be moved or added across the chest, back or sleeves to your spec.",
        },
        {
          q: "Which programs is the stretch-woven performance jacket suited to?",
          a: "The stretch-woven performance jacket suits cycling, running and outdoor training lines. It is a fitted full-zip layer with a chest zip pocket, in a stretch woven that moves through the shoulders and arms.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Lightweight Hooded Softshell Jacket", slug: "lightweight-hooded-softshell", href: PLP },
        { label: "Custom Heavyweight Hooded Softshell Jacket", slug: "heavyweight-hooded-softshell", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Full-zip stretch-woven performance jacket" },
        { label: "Fabric", value: "Polyester/Spandex stretch woven (90/10)" },
        { label: "Weight", value: "240 GSM. Final weight confirmed on your sample." },
        { label: "Fit", value: "Unisex athletic fit, graded XS to 5XL" },
        { label: "Zip and collar", value: "Full-length zip, collar to your spec" },
        { label: "Reflective", value: "Reflective forearm stripes, placement to your spec" },
        { label: "Pockets", value: "Chest zip pocket" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Stretch-Woven Performance Jacket" },
      pdpQualityHeading: "Stretch that moves, trims that stay put",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Stretch and recovery tested before bulk",
        "Reflective trims checked for adhesion after wash",
        "Zip cycled and function-tested before bulk",
        "GSM held consistent, batch to batch",
        "Colorfastness checked after wash",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "hooded-running-windbreaker",
      cardTitle: "Custom Hooded Running Windbreaker",
      cardSubline: "Hooded, lightweight, mesh-lined hood",
      image: "",
      imageAlt: "Custom Hooded Running Windbreaker",
      href: `${PLP}/hooded-running-windbreaker`,
      sku: "CAP-JKT-04",
      pdpHeading: "Custom Hooded Running Windbreaker Manufacturer",
      pdpDescription:
        "Hooded running windbreaker with color-block panels, a diagonal contrast stripe and a mesh-lined hood, custom and private label, in a 130 GSM polyester microfiber, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Hooded Running Windbreaker Manufacturer",
      pdpMetaDescription:
        "Custom hooded running windbreaker manufacturer, private label, 130 GSM polyester microfiber, mesh-lined hood, color-block panels, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Hooded Running Windbreaker" },
        { alt: "Custom Hooded Running Windbreaker" },
        { alt: "Custom Hooded Running Windbreaker" },
        { alt: "Custom Hooded Running Windbreaker" },
        { alt: "Custom Hooded Running Windbreaker" },
        { alt: "Custom Hooded Running Windbreaker" },
      ],
      material: "100% polyester microfiber woven",
      pdpFabricPills: ["Polyester Microfiber", "Recycled Polyester", "Polyester/Spandex Stretch Woven"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the hooded running windbreaker made from?",
          a: "The hooded running windbreaker is built in a 130 GSM polyester microfiber woven, light and smooth with a wind-resistant face. The final weight is confirmed on your sample, and recycled polyester is an option.",
        },
        {
          q: "Why does the hooded running windbreaker have a mesh-lined hood?",
          a: "The mesh lining adds airflow inside the hood and gives the hooded running windbreaker a clean inside finish. It can be removed or swapped for a self-fabric lining to your spec.",
        },
        {
          q: "Can the color-block panels be matched to our brand colors?",
          a: "Yes. The body panels and diagonal stripe of the hooded running windbreaker are cut in your brand or team colors with Pantone matching, and aligned across every size.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Quilted Bench Jacket", slug: "quilted-bench-jacket", href: PLP },
        { label: "Custom Quilted Puffer Jacket", slug: "quilted-puffer", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Hooded running windbreaker with color-block panels" },
        { label: "Fabric", value: "100% polyester microfiber woven" },
        { label: "Weight", value: "130 GSM. Final weight confirmed on your sample." },
        { label: "Fit", value: "Unisex athletic fit, graded XS to 5XL" },
        { label: "Zip and hood", value: "Front zip, attached hood with mesh lining" },
        { label: "Panels", value: "Color-block body with a diagonal contrast stripe, to your colors" },
        { label: "Finish", value: "Wind-resistant shell, DWR water-repellent finish on request" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Hooded Running Windbreaker" },
      pdpQualityHeading: "Light shell, clean panel lines",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Color-block seams and contrast stripe aligned at every size",
        "Fabric weight held consistent, batch to batch",
        "Zip cycled and function-tested before bulk",
        "Mesh hood lining checked for a clean, secure finish",
        "Colorfastness checked after wash, no bleed between panels",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "quilted-bench-jacket",
      cardTitle: "Custom Quilted Bench Jacket",
      cardSubline: "Quilted, hooded, ribbed cuffs",
      image: "",
      imageAlt: "Custom Quilted Bench Jacket",
      href: `${PLP}/quilted-bench-jacket`,
      sku: "CAP-JKT-05",
      pdpHeading: "Custom Quilted Bench Jacket Manufacturer",
      pdpDescription:
        "Short sideline bench jacket for teams and clubs, with a hood, ribbed cuffs and synthetic fill, custom and private label, in a matte quilted polyester shell, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Quilted Bench Jacket Manufacturer",
      pdpMetaDescription:
        "Custom quilted bench jacket manufacturer: short sideline coat for teams and clubs, matte quilted shell, synthetic fill, hood, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Quilted Bench Jacket" },
        { alt: "Custom Quilted Bench Jacket" },
        { alt: "Custom Quilted Bench Jacket" },
        { alt: "Custom Quilted Bench Jacket" },
        { alt: "Custom Quilted Bench Jacket" },
        { alt: "Custom Quilted Bench Jacket" },
      ],
      material: "Polyester shell, matte finish",
      pdpFabricPills: ["Matte Polyester Shell", "Glossy Polyester Shell", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is a quilted bench jacket used for?",
          a: "The quilted bench jacket is worn by teams and clubs on the sideline and bench between play. It is a short, hooded layer with synthetic fill, stitch-through quilting and ribbed cuffs, built to go on over kit.",
        },
        {
          q: "What insulation does the quilted bench jacket use?",
          a: "The quilted bench jacket uses synthetic fill held in place by stitch-through quilting. The fill weight is set to your spec and confirmed on your sample.",
        },
        {
          q: "Can you add team crests and names to the quilted bench jacket?",
          a: "Yes. Crests, names and sponsor logos can be embroidered or heat-transferred on the chest, sleeve and back of the quilted bench jacket, placed to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Hooded Running Windbreaker", slug: "hooded-running-windbreaker", href: PLP },
        { label: "Custom Quilted Puffer Jacket", slug: "quilted-puffer", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Short hooded quilted bench jacket" },
        { label: "Fabric", value: "Polyester shell, matte finish" },
        { label: "Insulation", value: "Synthetic fill, gram weight confirmed on your sample" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit with room to layer over kit, graded XS to 5XL" },
        { label: "Zip and hood", value: "Front zip, attached hood" },
        { label: "Quilting", value: "Stitch-through quilting" },
        { label: "Cuffs and hem", value: "Ribbed cuffs, hem to your spec" },
        { label: "Finish", value: "DWR water-repellent finish on request" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Quilted Bench Jacket" },
      pdpQualityHeading: "Quilted flat, fill that stays put",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Quilting lines checked so fill stays put after wash",
        "Stitch-through seams checked for fill leakage",
        "Zip cycled and function-tested before bulk",
        "Ribbed cuffs checked for recovery after wash",
        "Colorfastness checked after wash",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "quilted-puffer",
      cardTitle: "Custom Quilted Puffer Jacket",
      cardSubline: "Quilted, hooded, glossy finish",
      image: "",
      imageAlt: "Custom Quilted Puffer Jacket",
      href: `${PLP}/quilted-puffer`,
      sku: "CAP-JKT-06",
      pdpHeading: "Custom Quilted Puffer Jacket Manufacturer",
      pdpDescription:
        "Glossy hooded puffer jacket for outerwear and streetwear lines, with stitch-through quilting and ribbed cuffs, custom and private label, in a quilted polyester shell with synthetic fill, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Quilted Puffer Jacket Manufacturer",
      pdpMetaDescription:
        "Custom quilted puffer jacket manufacturer: glossy hooded puffer for outerwear and streetwear lines, synthetic fill, ribbed cuffs, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Quilted Puffer Jacket" },
        { alt: "Custom Quilted Puffer Jacket" },
        { alt: "Custom Quilted Puffer Jacket" },
        { alt: "Custom Quilted Puffer Jacket" },
        { alt: "Custom Quilted Puffer Jacket" },
        { alt: "Custom Quilted Puffer Jacket" },
      ],
      material: "Polyester shell, glossy finish",
      pdpFabricPills: ["Glossy Polyester Shell", "Matte Polyester Shell", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the difference between the quilted puffer jacket and the chevron-stripe quilted puffer jacket?",
          a: "The quilted puffer jacket is a clean hooded puffer with a glossy shell. The chevron-stripe quilted puffer jacket has a matte shell and a chevron stripe on the sleeve. Both share the same quilted, synthetic-fill build.",
        },
        {
          q: "What insulation does the quilted puffer jacket use?",
          a: "The quilted puffer jacket uses synthetic fill held in place by stitch-through quilting. The fill weight is set to your spec and confirmed on your sample.",
        },
        {
          q: "Can the quilted puffer jacket be made in a matte finish?",
          a: "Yes. The quilted puffer jacket can move from a glossy to a matte polyester shell, in any Pantone matched color, with the same quilting and fill.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Hooded Running Windbreaker", slug: "hooded-running-windbreaker", href: PLP },
        { label: "Custom Quilted Bench Jacket", slug: "quilted-bench-jacket", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Hooded quilted puffer jacket" },
        { label: "Fabric", value: "Polyester shell, glossy finish" },
        { label: "Insulation", value: "Synthetic fill, gram weight confirmed on your sample" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit, graded XS to 5XL" },
        { label: "Zip and hood", value: "Front zip, attached hood" },
        { label: "Quilting", value: "Stitch-through quilting" },
        { label: "Cuffs and hem", value: "Ribbed cuffs, hem to your spec" },
        { label: "Finish", value: "DWR water-repellent finish on request" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Quilted Puffer Jacket" },
      pdpQualityHeading: "Glossy shell, fill that stays put",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Shell finish checked for an even gloss across panels",
        "Quilting lines checked so fill stays put after wash",
        "Stitch-through seams checked for fill leakage",
        "Zip cycled and function-tested before bulk",
        "Colorfastness checked after wash",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "chevron-quilted-puffer",
      cardTitle: "Custom Chevron-Stripe Quilted Puffer Jacket",
      cardSubline: "Quilted, hooded, chevron sleeve stripe",
      image: "",
      imageAlt: "Custom Chevron-Stripe Quilted Puffer Jacket",
      href: `${PLP}/chevron-quilted-puffer`,
      sku: "CAP-JKT-07",
      pdpHeading: "Custom Chevron-Stripe Quilted Puffer Jacket Manufacturer",
      pdpDescription:
        "Team-style puffer with a chevron stripe across the sleeve, a hood and a matte shell, custom and private label, in a quilted polyester shell with synthetic fill, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Chevron-Stripe Quilted Puffer Jacket Manufacturer",
      pdpMetaDescription:
        "Custom chevron-stripe quilted puffer jacket manufacturer, private label, matte quilted polyester shell, chevron sleeve stripe, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Chevron-Stripe Quilted Puffer Jacket" },
        { alt: "Custom Chevron-Stripe Quilted Puffer Jacket" },
        { alt: "Custom Chevron-Stripe Quilted Puffer Jacket" },
        { alt: "Custom Chevron-Stripe Quilted Puffer Jacket" },
        { alt: "Custom Chevron-Stripe Quilted Puffer Jacket" },
        { alt: "Custom Chevron-Stripe Quilted Puffer Jacket" },
      ],
      material: "Polyester shell, matte finish",
      pdpFabricPills: ["Matte Polyester Shell", "Glossy Polyester Shell", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the difference between the chevron-stripe quilted puffer jacket and the quilted puffer jacket?",
          a: "The chevron-stripe quilted puffer jacket has a matte shell and a chevron stripe on the sleeve. The quilted puffer jacket is a clean hooded puffer with a glossy shell. Both share the same quilted, synthetic-fill build.",
        },
        {
          q: "Can the chevron stripe be matched to our team colors?",
          a: "Yes. The chevron stripe on the chevron-stripe quilted puffer jacket is cut in your team or brand colors with Pantone matching, and its width and placement are set to your spec.",
        },
        {
          q: "What insulation does the chevron-stripe quilted puffer jacket use?",
          a: "The chevron-stripe quilted puffer jacket uses synthetic fill held in place by stitch-through quilting. The fill weight is set to your spec and confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Polar Fleece Full-Zip Jacket", slug: "polar-fleece-full-zip", href: PLP },
        { label: "Custom Quilted Hybrid Jacket", slug: "quilted-hybrid", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Hooded quilted puffer jacket with a chevron sleeve stripe" },
        { label: "Fabric", value: "Polyester shell, matte finish" },
        { label: "Insulation", value: "Synthetic fill, gram weight confirmed on your sample" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit, graded XS to 5XL" },
        { label: "Zip and hood", value: "Front zip, attached hood" },
        { label: "Quilting", value: "Stitch-through quilting" },
        { label: "Sleeve stripe", value: "Chevron stripe on the sleeve, color and placement to your spec" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Finish", value: "DWR water-repellent finish on request" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Chevron-Stripe Quilted Puffer Jacket" },
      pdpQualityHeading: "Stripes that line up, fill that stays put",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Chevron stripe aligned and consistent at every size",
        "Quilting lines checked so fill stays put after wash",
        "Stitch-through seams checked for fill leakage",
        "Zip cycled and function-tested before bulk",
        "Colorfastness checked after wash, no bleed into the stripe",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "polar-fleece-full-zip",
      cardTitle: "Custom Polar Fleece Full-Zip Jacket",
      cardSubline: "Full-zip polar fleece, contrast yoke",
      image: "",
      imageAlt: "Custom Polar Fleece Full-Zip Jacket",
      href: `${PLP}/polar-fleece-full-zip`,
      sku: "CAP-JKT-08",
      pdpHeading: "Custom Polar Fleece Full-Zip Jacket Manufacturer",
      pdpDescription:
        "Full-zip polar fleece jacket with a contrast woven yoke panel, custom and private label, in a brushed polyester polar fleece, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Polar Fleece Full-Zip Jacket Manufacturer",
      pdpMetaDescription:
        "Custom polar fleece full-zip jacket manufacturer, private label, polyester polar fleece, contrast woven yoke panel, full zip, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Polar Fleece Full-Zip Jacket" },
        { alt: "Custom Polar Fleece Full-Zip Jacket" },
        { alt: "Custom Polar Fleece Full-Zip Jacket" },
        { alt: "Custom Polar Fleece Full-Zip Jacket" },
        { alt: "Custom Polar Fleece Full-Zip Jacket" },
        { alt: "Custom Polar Fleece Full-Zip Jacket" },
      ],
      material: "100% polyester polar fleece",
      pdpFabricPills: ["Polyester Polar Fleece", "Sherpa Fleece", "Recycled Polyester Fleece"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the polar fleece full-zip jacket made from?",
          a: "The polar fleece full-zip jacket is built in 100% polyester polar fleece, brushed for warmth and quick to dry. The weight is set to your spec and confirmed on your sample, and recycled polyester fleece is an option.",
        },
        {
          q: "Why does the polar fleece full-zip jacket have a woven yoke?",
          a: "The contrast woven yoke adds a harder-wearing panel across the shoulders of the polar fleece full-zip jacket and gives a clean surface for color-blocking or a logo.",
        },
        {
          q: "Can the polar fleece full-zip jacket be made with a hood?",
          a: "Yes. The polar fleece full-zip jacket can take an attached hood, or move to a half zip, to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Chevron-Stripe Quilted Puffer Jacket", slug: "chevron-quilted-puffer", href: PLP },
        { label: "Custom Quilted Hybrid Jacket", slug: "quilted-hybrid", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Full-zip polar fleece jacket, no hood" },
        { label: "Fabric", value: "100% polyester polar fleece" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit, graded XS to 5XL" },
        { label: "Zip and collar", value: "Full-length zip, collar to your spec" },
        { label: "Yoke", value: "Contrast woven yoke panel across the shoulders" },
        { label: "Pockets", value: "Zip or open hand pockets, to your spec" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Polar Fleece Full-Zip Jacket" },
      pdpQualityHeading: "Soft fleece, clean panel lines",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Fleece face checked for pilling after wash",
        "Fabric weight held consistent, batch to batch",
        "Woven yoke seams checked at the shoulder",
        "Zip cycled and function-tested before bulk",
        "Shrinkage tested after wash, targeted under 5%",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "quilted-hybrid",
      cardTitle: "Custom Quilted Hybrid Jacket",
      cardSubline: "Quilted front, softshell sleeves",
      image: "",
      imageAlt: "Custom Quilted Hybrid Jacket",
      href: `${PLP}/quilted-hybrid`,
      sku: "CAP-JKT-09",
      pdpHeading: "Custom Quilted Hybrid Jacket Manufacturer",
      pdpDescription:
        "Hybrid jacket with a quilted front, softshell sleeves and a stand collar, custom and private label, in a quilted polyester front with synthetic fill, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Quilted Hybrid Jacket Manufacturer",
      pdpMetaDescription:
        "Custom quilted hybrid jacket manufacturer, private label, quilted front with synthetic fill, softshell sleeves, stand collar, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Quilted Hybrid Jacket" },
        { alt: "Custom Quilted Hybrid Jacket" },
        { alt: "Custom Quilted Hybrid Jacket" },
        { alt: "Custom Quilted Hybrid Jacket" },
        { alt: "Custom Quilted Hybrid Jacket" },
        { alt: "Custom Quilted Hybrid Jacket" },
      ],
      material: "Quilted polyester front panels with synthetic fill, softshell sleeves",
      pdpFabricPills: ["Quilted Polyester Shell", "Polyester/Spandex Softshell", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is a quilted hybrid jacket?",
          a: "A quilted hybrid jacket pairs an insulated, quilted front with softshell sleeves. The quilted hybrid jacket puts synthetic fill across the core and keeps the sleeves in a lighter, flexible softshell for training and sideline wear.",
        },
        {
          q: "What is the quilted hybrid jacket made from?",
          a: "The quilted hybrid jacket has quilted polyester front panels with synthetic fill and softshell sleeves. The fill weight and the softshell are confirmed on your sample.",
        },
        {
          q: "Can the body and sleeves of the quilted hybrid jacket be different colors?",
          a: "Yes. The quilted front and softshell sleeves of the quilted hybrid jacket can be cut in different colors, Pantone matched to your brand or team colors.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Chevron-Stripe Quilted Puffer Jacket", slug: "chevron-quilted-puffer", href: PLP },
        { label: "Custom Polar Fleece Full-Zip Jacket", slug: "polar-fleece-full-zip", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Hybrid jacket with a quilted front and softshell sleeves" },
        { label: "Body", value: "Quilted polyester front panels with synthetic fill" },
        { label: "Sleeves", value: "Softshell sleeves for freedom of movement" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit, graded XS to 5XL" },
        { label: "Zip and collar", value: "Front zip, stand collar" },
        { label: "Quilting", value: "Stitch-through quilting" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Finish", value: "DWR water-repellent finish on request" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Quilted Hybrid Jacket" },
      pdpQualityHeading: "Warm core, free arms",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Quilting lines checked so fill stays put after wash",
        "Seams between quilted and softshell panels checked at stress points",
        "Zip cycled and function-tested before bulk",
        "Softshell sleeves checked for stretch and recovery",
        "Colorfastness checked after wash, no bleed between panels",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "lightweight-performance",
      cardTitle: "Custom Lightweight Performance Jacket",
      cardSubline: "Notched collar, angled chest zip pocket",
      image: "",
      imageAlt: "Custom Lightweight Performance Jacket",
      href: `${PLP}/lightweight-performance`,
      sku: "CAP-JKT-10",
      pdpHeading: "Custom Lightweight Performance Jacket Manufacturer",
      pdpDescription:
        "Lightweight performance jacket with a notched collar, an angled chest zip pocket and contrast trim, custom and private label, in a light polyester woven, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Lightweight Performance Jacket Manufacturer",
      pdpMetaDescription:
        "Custom lightweight performance jacket manufacturer, private label, light polyester woven, notched collar, angled chest zip pocket, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Lightweight Performance Jacket" },
        { alt: "Custom Lightweight Performance Jacket" },
        { alt: "Custom Lightweight Performance Jacket" },
        { alt: "Custom Lightweight Performance Jacket" },
        { alt: "Custom Lightweight Performance Jacket" },
        { alt: "Custom Lightweight Performance Jacket" },
      ],
      material: "Lightweight polyester woven, blend confirmed on your sample.",
      pdpFabricPills: ["Polyester Woven", "Polyester/Spandex Stretch Woven", "Recycled Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the lightweight performance jacket made from?",
          a: "The lightweight performance jacket is built in a light polyester woven with a wind-resistant face. The exact blend and weight are confirmed on your sample, and a stretch woven or recycled polyester is available.",
        },
        {
          q: "Why does the lightweight performance jacket have a notched collar?",
          a: "The notched collar gives the lightweight performance jacket a lapel-style collar in place of a standard stand collar, a build used for travel, coaching staff and off-field team wear.",
        },
        {
          q: "Can the trim colors on the lightweight performance jacket be changed?",
          a: "Yes. The zip and edge trims on the lightweight performance jacket can be cut in any Pantone matched color to contrast with or match your main shell.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Sherpa Fleece Full-Zip Jacket", slug: "sherpa-fleece-full-zip", href: PLP },
        { label: "Custom Hooded Half-Zip Jacket", slug: "hooded-half-zip", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Lightweight performance jacket with a notched collar" },
        { label: "Fabric", value: "Lightweight polyester woven, blend confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit, graded XS to 5XL" },
        { label: "Zip and collar", value: "Front zip, notched collar" },
        { label: "Pockets", value: "Angled chest zip pocket" },
        { label: "Trim", value: "Contrast zip and edge trim, to your colors" },
        { label: "Finish", value: "Wind-resistant shell, DWR water-repellent finish on request" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Lightweight Performance Jacket" },
      pdpQualityHeading: "Light build, sharp details",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Collar shape and angled pocket checked at every size",
        "Fabric weight held consistent, batch to batch",
        "Zips cycled and function-tested before bulk",
        "Contrast trims checked for colorfastness after wash",
        "Shrinkage tested after wash, targeted under 5%",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "sherpa-fleece-full-zip",
      cardTitle: "Custom Sherpa Fleece Full-Zip Jacket",
      cardSubline: "Full-zip sherpa fleece, stand collar",
      image: "",
      imageAlt: "Custom Sherpa Fleece Full-Zip Jacket",
      href: `${PLP}/sherpa-fleece-full-zip`,
      sku: "CAP-JKT-11",
      pdpHeading: "Custom Sherpa Fleece Full-Zip Jacket Manufacturer",
      pdpDescription:
        "Full-zip sherpa fleece jacket with a stand collar and drawcord toggle, custom and private label, in a high-pile polyester sherpa fleece, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Sherpa Fleece Full-Zip Jacket Manufacturer",
      pdpMetaDescription:
        "Custom sherpa fleece full-zip jacket manufacturer, private label, polyester sherpa fleece, stand collar with drawcord toggle, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Sherpa Fleece Full-Zip Jacket" },
        { alt: "Custom Sherpa Fleece Full-Zip Jacket" },
        { alt: "Custom Sherpa Fleece Full-Zip Jacket" },
        { alt: "Custom Sherpa Fleece Full-Zip Jacket" },
        { alt: "Custom Sherpa Fleece Full-Zip Jacket" },
        { alt: "Custom Sherpa Fleece Full-Zip Jacket" },
      ],
      material: "100% polyester sherpa fleece",
      pdpFabricPills: ["Polyester Sherpa Fleece", "Polyester Polar Fleece", "Recycled Polyester Fleece"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the difference between sherpa fleece and polar fleece?",
          a: "Sherpa fleece has a deep, high-pile face made to look like shearling, while polar fleece is brushed flat on both sides. The sherpa fleece full-zip jacket uses the high-pile face for more bulk and texture, and the polar fleece full-zip jacket is lighter and smoother.",
        },
        {
          q: "What is the sherpa fleece full-zip jacket made from?",
          a: "The sherpa fleece full-zip jacket is built in 100% polyester sherpa fleece. The weight is set to your spec and confirmed on your sample, and recycled polyester fleece is an option.",
        },
        {
          q: "Can you put a logo on the sherpa fleece full-zip jacket?",
          a: "Yes. Embroidery and woven patches sit well on the high pile of the sherpa fleece full-zip jacket, and a smooth contrast panel can be added at the chest for a cleaner logo placement.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Lightweight Performance Jacket", slug: "lightweight-performance", href: PLP },
        { label: "Custom Hooded Half-Zip Jacket", slug: "hooded-half-zip", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Full-zip sherpa fleece jacket, no hood" },
        { label: "Fabric", value: "100% polyester sherpa fleece" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit, graded XS to 5XL" },
        { label: "Zip and collar", value: "Full-length zip, stand collar with drawcord toggle" },
        { label: "Pockets", value: "Zip or open hand pockets, to your spec" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Sherpa Fleece Full-Zip Jacket" },
      pdpQualityHeading: "High-pile warmth, clean finish",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Pile checked for shedding and matting after wash",
        "Fabric weight held consistent, batch to batch",
        "Collar drawcord and toggle checked for a secure fixing",
        "Zip cycled and function-tested before bulk",
        "Shrinkage tested after wash, targeted under 5%",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "hooded-half-zip",
      cardTitle: "Custom Hooded Half-Zip Jacket",
      cardSubline: "Half-zip, hooded, mesh-lined hood",
      image: "",
      imageAlt: "Custom Hooded Half-Zip Jacket",
      href: `${PLP}/hooded-half-zip`,
      sku: "CAP-JKT-12",
      pdpHeading: "Custom Hooded Half-Zip Jacket Manufacturer",
      pdpDescription:
        "Hooded half-zip pullover jacket with a mesh-lined hood and taped zip pockets, custom and private label, in a 240 GSM polyester, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Hooded Half-Zip Jacket Manufacturer",
      pdpMetaDescription:
        "Custom hooded half-zip jacket manufacturer, private label, 240 GSM polyester, mesh-lined hood, taped zip pockets, pullover build, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Hooded Half-Zip Jacket" },
        { alt: "Custom Hooded Half-Zip Jacket" },
        { alt: "Custom Hooded Half-Zip Jacket" },
        { alt: "Custom Hooded Half-Zip Jacket" },
        { alt: "Custom Hooded Half-Zip Jacket" },
        { alt: "Custom Hooded Half-Zip Jacket" },
      ],
      material: "100% polyester",
      pdpFabricPills: ["Polyester", "Recycled Polyester", "Polyester/Spandex"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the difference between a half-zip jacket and a full-zip jacket?",
          a: "A half-zip jacket pulls on over the head with a zip to mid-chest, a lighter, simpler layer for training and travel. The hooded half-zip jacket adds a hood and zip pockets. A full-zip jacket opens full length. We make both.",
        },
        {
          q: "What is the hooded half-zip jacket made from?",
          a: "The hooded half-zip jacket is built in 240 GSM polyester with a mesh-lined hood. The final weight is confirmed on your sample, and recycled polyester is an option.",
        },
        {
          q: "Why are the zip pockets on the hooded half-zip jacket taped?",
          a: "The taped edges give the zip pockets on the hooded half-zip jacket a clean, durable finish and stop the pocket openings from fraying. They are a finishing detail, set to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Lightweight Performance Jacket", slug: "lightweight-performance", href: PLP },
        { label: "Custom Sherpa Fleece Full-Zip Jacket", slug: "sherpa-fleece-full-zip", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Hooded half-zip pullover jacket" },
        { label: "Fabric", value: "100% polyester" },
        { label: "Weight", value: "240 GSM. Final weight confirmed on your sample." },
        { label: "Fit", value: "Unisex regular fit, graded XS to 5XL" },
        { label: "Zip and hood", value: "Half-length zip, attached hood with mesh lining" },
        { label: "Pockets", value: "Zip pockets with taped edges" },
        { label: "Cuffs and hem", value: "Self-fabric, elastic or ribbed, to your spec" },
        { label: "Construction", value: "Cut-and-sew, clean-finished seams" },
        { label: "Branding", value: "Embroidery, screen, heat transfer, patches, reflective trims, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Hooded Half-Zip Jacket" },
      pdpQualityHeading: "Pull-on build, pockets that hold",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Taped pocket edges checked for a clean, secure finish after wash",
        "GSM held consistent, batch to batch",
        "Zips cycled and function-tested before bulk",
        "Mesh hood lining checked for a clean, secure finish",
        "Colorfastness checked after wash",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, same L1 group first
  // (Outerwear & Suits, per activewearMegaMenu), then the closest pairings from other groups.
  relatedLinks: [
    { label: "Track Jackets & Zip-Ups", href: "/capriowear/activewear/track-jackets" },
    { label: "Tracksuits", href: "/capriowear/activewear/tracksuits" },
    { label: "Sweatshirts", href: "/capriowear/activewear/sweatshirts" },
    { label: "Running Wear", href: "/capriowear/activewear/running-wear" },
    { label: "Hoodies", href: "/capriowear/activewear/hoodies" },
  ],
};
