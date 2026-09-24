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
// Product/FAQPage JSON-LD. SKUs 4 to 12 are card-only drafts: non-clickable,
// no route, until their PDP content lands in a later batch. "How we
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
    "Capriowear is a custom jacket manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label jackets from fabric to packaging, including softshell, windbreaker, quilted puffer, hybrid, bench and fleece jackets in woven, quilted and fleece builds, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
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
      performance: "Wind-resistant stretch woven, lightweight 125 GSM up to structured 320 GSM",
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
      bestFor: "Blocks wind by weave density, standard on every jacket shell",
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
      text: "Jackets here are woven shells, quilted and fleece builds, while knit track jackets and zip-ups sit in our Track Jackets & Zip-Ups range. Fabric weight is confirmed on your sample. Swatches before every bulk run, and we can source or match a specific fabric or a Pantone color from your reference.",
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
    { title: "Water and wind", body: "Wind-resistant shells as standard, DWR water-repellent finish on request" },
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
      a: "A softshell is a stretch woven with more body, built for training and sideline wear in cool weather. A windbreaker is a light, thin woven shell built to cut wind on the move. We make both, to your spec.",
    },
    {
      q: "What is the difference between water-resistant and waterproof?",
      a: "Our standard jacket shells are wind-resistant, and a DWR finish can be added so light rain beads off. A jacket is only called waterproof when it is built with a coated or laminated shell and taped seams and tested to a stated hydrostatic head rating, confirmed on your sample.",
    },
    {
      q: "What is the difference between a jacket and a track jacket?",
      a: "A jacket here is a woven shell, quilted or fleece build for weather and warmth. A track jacket is knit, built for stretch and comfort in training and warm-ups, and sits in our Track Jackets & Zip-Ups range. We make both.",
    },
    {
      q: "What fabrics do you use for jackets?",
      a: "Polyester/Spandex softshell and stretch wovens, lightweight polyester microfiber, quilted polyester shells with synthetic fill, and polar and sherpa fleece, each confirmed on your sample.",
    },
    {
      q: "What insulation do your quilted jackets use?",
      a: "Synthetic fill, specified by gram weight and held in place by stitch-through quilting, in a fully quilted body or a vest-front hybrid with softshell sleeves. The fill weight is confirmed on your sample.",
    },
    {
      q: "What hardware and construction can you add?",
      a: "Full or half zips, a zipper garage at the collar, fixed or drawcord hoods, mesh hood linings, ribbed, elastic or self-fabric cuffs, hem drawcords, and zip or open pockets, all to your spec.",
    },
    {
      q: "Can you add team names, numbers and logos?",
      a: "Yes. Names, numbers and logos by embroidery, screen print, heat transfer or patches, placed to your spec across chest, sleeve and back, with reflective trims on request.",
    },
    {
      q: "Can you match a specific fabric or a reference jacket?",
      a: "Yes. Send a swatch, reference garment, or tech pack and we source or develop to match, then share swatches and confirm on your sample before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: shell fabric and weight, water-repellent finish, insulation, zip, hood, collar, cuffs and pockets, color-blocking and stripes with Pantone matching, your logos, labels, hangtags, and packaging.",
    },
    {
      q: "Do you offer OEM, ODM, and private label jackets?",
      a: "Yes, all three. As a private label jacket manufacturer, we make every style under your brand, with your labels and packaging.",
    },
    {
      q: "How are jackets sized?",
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
  ctaReferenceNoun: "jacket",
  // "How we customize" for every Jackets PDP (owner spec, 2026-09-24): 6
  // jacket tiles, overriding the shared 5-step default. Same temporary
  // factory photography as the shared default.
  pdpCustomizationSteps: {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
    steps: [
      { title: "Print and artwork", body: "Screen, heat transfer, DTF", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Print and artwork" } },
      { title: "Branding", body: "Embroidery, patches, reflective trims", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Branding" } },
      { title: "Fabric and weight", body: "Shell fabric and weight, sourced or matched to your reference", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Fabric and weight" } },
      { title: "Build", body: "Zip, hood, collar, cuffs and pockets to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Build" } },
      { title: "Color", body: "Color-blocking and contrast panels, Pantone matched", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" } },
      { title: "Trims and packaging", body: "Woven or printed labels, hangtags, retail-ready packaging", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Trims and packaging" } },
    ],
  },
  // 12 drafts, SKU-number order (CAP-JKT-01 to 12). SKUs 1 to 3 carry PDP
  // content; 4 to 12 are card-only. Card and image alt text is the card
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
          a: "Cycling, running and outdoor training lines. The stretch-woven performance jacket is a fitted full-zip layer with a chest zip pocket, and its stretch woven moves through the shoulders and arms.",
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
