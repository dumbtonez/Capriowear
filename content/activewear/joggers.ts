// content/activewear/joggers.ts
// Joggers batch 1 of 6 (owner spec, 2026-09-26): the PLP is rebuilt as 16
// gendered SKUs (CAP-JOG-01 to 08 men's, 09 to 16 women's), replacing the 7
// legacy cards (including the old Wide-Leg Woven Jogger draft PDP, whose
// route now 404s). Every card carries a `gender`, so the All/Women/Men chip
// row filters (ActivewearListing.tsx), and every name carries "Men's" or
// "Women's": card = H1 minus " Manufacturer" = title = breadcrumb = alt =
// every pill that targets it.
//
// Batch 1 builds draft PDPs for the hero SKUs 01, 09 and 02, batch 2 for 10,
// 03 and 11, batch 3 for 05, 14 and 06. Drafts with PDP content render noindexed (BreadcrumbList only,
// out of the sitemap and the ItemList) and their cards link
// (`isDraftPdpReachable()`); the rest are card-only non-links until their
// batch. Pills carry a `slug`, so a
// pill for a card-only SKU falls back to the PLP. "How we customize" is set
// once for the category (6 tiles); key facts, spec subtitle and the
// operational FAQs are the shared PDP defaults (./pdpShared.ts).
//
// Category boundary: joggers are knit fleece or terry with a tapered leg
// and ribbed cuff; training joggers and track pants are woven. The PLP
// weight-tier table keeps its GSM ranges; PDPs never state a GSM figure.
import type { Category } from "./types";
import { faqGetStarted } from "./pdpShared";

const PLP = "/capriowear/activewear/joggers";

const CUSTOMIZATION_PILLS = ["Custom fabric", "Custom color & print", "Your fit", "Your branding", "Custom labels", "Custom packaging"];
const SAMPLE_SUBLINE = "We confirm it all on your sample before a single bulk piece is cut.";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";
const PENDING_WEIGHT = "Pending, confirmed on your sample.";

// Alt-only gallery (no photography yet): 6 frames, alt = the card name.
function gallery(alt: string) {
  return Array.from({ length: 6 }, () => ({ alt }));
}

export const joggers: Category = {
  slug: "joggers",
  group: "Activewear",
  menuLabel: "Joggers",
  // Verbatim override pair (owner spec, 2026-09-26): bypasses
  // categoryEntityFaq()'s templated sentence entirely.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom joggers manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label joggers and track pants from fabric to packaging, including cuffed fleece joggers, cargo joggers, sweatpants, training joggers and woven track pants for men and women in French terry, brushed fleece and woven polyester, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  h1: "Custom Joggers Manufacturer",
  metaTitle: "Custom Joggers Manufacturer",
  metaDescription:
    "Custom joggers manufacturer: men's and women's fleece, cargo and training joggers, sweatpants and track pants, private label, MOQ 50, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Men's and women's SKUs: the All/Women/Men chip row filters by `gender`.
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "French terry (loopback)",
      bestFor: "Cuffed joggers and sweatpants, the default jogger fabric",
      performance: "Smooth face, looped interior, breathes and holds shape",
    },
    {
      fabric: "Brushed fleece",
      bestFor: "Warmer joggers and sweatpants",
      performance: "Napped soft interior for warmth",
    },
    {
      fabric: "Heavyweight cotton fleece",
      bestFor: "Wide-leg, barrel and cargo joggers",
      performance: "Structured, substantial, takes garment-dye",
    },
    {
      fabric: "Double-knit fleece",
      bestFor: "Slim tapered joggers",
      performance: "Smooth face, clean structured line",
    },
    {
      fabric: "Polyester/Spandex stretch woven",
      bestFor: "Training and cargo joggers",
      performance: "Lightweight stretch, quick-dry",
    },
    {
      fabric: "Lightweight polyester woven or mesh",
      bestFor: "Track pants and mesh training pants",
      performance: "Light shell, quick-dry, takes sublimation",
    },
  ],
  // Weight tiers as their own real, liftable table (FabricOptions.tsx's
  // own `weightTiers` prop).
  weightTiers: [
    {
      tier: "Lightweight jogger",
      gsm: "240 to 300 GSM",
      bestFor: "Cotton-poly or lighter terry, everyday casual",
    },
    {
      tier: "Midweight jogger",
      gsm: "260 to 340 GSM",
      bestFor: "French terry, the standard jogger band",
    },
    {
      tier: "Heavyweight jogger",
      gsm: "380 to 400+ GSM",
      bestFor: "Streetwear, wide-leg and flared",
    },
  ],
  fabricNote: [
    {
      text: "Joggers are knit fleece or terry with a tapered leg and ribbed cuff; training joggers and track pants are woven. Weights are tuned to the style and confirmed on your sample. Garment-dye is available for cotton fleece. Swatches before every bulk run, and we can source or match a specific fabric from your reference.",
    },
  ],
  fabricPills: ["French terry", "Brushed fleece", "Heavyweight fleece", "Double-knit fleece", "Polyester/Spandex woven", "Polyester woven or mesh"],
  qualityHeading: "The taper you approve, at every size",
  qualitySubline: "We confirm the taper, cuff and fabric on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Thigh, knee and calf width graded proportional across the full size range",
    "Ankle cuff rib holds its gathered shape, no sagging",
    "Gusset seam stress-tested at the crotch",
    "Fabric weight held to your approved sample, shrinkage tested after wash, brushed fleece checked for pilling",
    AQL_POINT,
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "French terry, brushed fleece, double-knit fleece, Polyester/Spandex stretch woven, lightweight polyester woven and mesh",
    },
    {
      title: "Detailing",
      body: "Contrast piping, paneling or color-blocking to your spec",
    },
    { title: "Weight and fit", body: "240 to 400+ GSM fleece, tapered, slim, wide-leg or straight" },
    { title: "Hem and cuff", body: "Ribbed or elastic ankle cuff, open hem, ankle zip, snap or adjustable toggle" },
    {
      title: "Waistband and pockets",
      body: "Elastic, drawcord or tunnel waistband, side, back, cargo, zip or mesh pockets, gusset",
    },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, screen, DTG, DTF, embroidery, garment-dye",
    },
    { title: "Labels and packaging", body: "Woven, printed or tear-away labels, hangtags, retail-ready packaging" },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Entity question is NOT stored here -- see entityQuestion/entityAnswer
  // above; the route prepends it at render time. The remaining 16 below.
  faqs: [
    {
      q: "What is your MOQ for custom joggers?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What joggers and track pants can you make?",
      a: "Men's and women's cuffed fleece joggers, cargo joggers, sweatpants, wide-leg joggers, training joggers and woven track pants, plus a men's slim tapered jogger and mesh training pant, and a women's barrel jogger and lightweight jogger, all custom to your brand.",
    },
    {
      q: "What is the difference between a jogger, a sweatpant and a track pant?",
      a: "A jogger is knit fleece or terry with a tapered leg and a ribbed ankle cuff. A sweatpant is heavier fleece with a straighter leg and an open or elastic hem. A track pant is a lightweight woven with an open hem or ankle zip. We make all three.",
    },
    {
      q: "What fabric and weight are your joggers made from?",
      a: "French terry and brushed fleece from lightweight to heavyweight, a double-knit fleece for slim styles, and a Polyester/Spandex stretch woven or lightweight polyester woven for training joggers and track pants. Weight is confirmed on your sample.",
    },
    {
      q: "Can you customize the taper and leg width?",
      a: "Yes. We cut slim, tapered, straight, wide-leg or barrel legs, and grade the taper so it holds at every size, confirmed on your sample.",
    },
    {
      q: "What cuff and hem options do you offer?",
      a: "Ribbed ankle cuffs, elastic cuffs, open hems, ankle zips, snap openings and adjustable toggles, chosen per style and confirmed on your sample.",
    },
    {
      q: "What pocket and waistband options do you offer?",
      a: "Elastic, drawcord or tunnel waistbands, and side, back, zip, cargo or mesh pockets, to your spec.",
    },
    {
      q: "Can you match a specific fabric or a reference pant?",
      a: "Yes. Send a swatch, reference garment or tech pack and we source or develop the fabric and pattern to match, confirmed on your sample before bulk.",
    },
    {
      q: "What print and branding methods can you do?",
      a: "Screen print, DTG, DTF, embroidery and heat transfer on fleece and terry, sublimation on polyester track pants, and garment-dye for premium fleece.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric and weight, leg shape and taper, cuff and hem, waistband and pockets, color with Pantone matching, print and embroidery, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label joggers?",
      a: "Yes, all three. As a private label joggers manufacturer, we make every style under your brand, with your labels and packaging.",
    },
    {
      q: "How are joggers sized?",
      a: "Alpha XS to 5XL on separate men's and women's blocks, with rise and inseam to your spec, and the taper fit-tested across the size run.",
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
  ctaReferenceNoun: "garment",
  // "How we customize" for every Joggers PDP (owner spec, 2026-09-26): 6
  // tiles, overriding the shared 5-step default. Same temporary factory
  // photography as the shared default.
  pdpCustomizationSteps: {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    steps: [
      { title: "Print and artwork", body: "Screen print, DTG, DTF, embroidery and heat transfer, sublimation on polyester", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Print and artwork" } },
      { title: "Fabric and weight", body: "French terry, fleece or woven, sourced or matched to your reference", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Fabric and weight" } },
      { title: "Fit and leg", body: "Taper, leg width, rise and inseam to your spec", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Fit and leg" } },
      { title: "Hem and waist", body: "Cuff, hem, waistband and drawcord to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Hem and waist" } },
      { title: "Color", body: "Pantone matched colors, garment-dye on cotton fleece", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" } },
      { title: "Trims and packaging", body: "Woven or tear-away labels, hangtags, retail-ready packaging", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Trims and packaging" } },
    ],
  },
  // 16 drafts, SKU order: CAP-JOG-01 to 08 men's, 09 to 16 women's.
  styleCards: [
    {
      status: "draft",
      slug: "cuffed-fleece-jogger-mens",
      gender: "Men",
      cardTitle: "Men's Cuffed Fleece Jogger",
      cardSubline: "Tapered leg, ribbed ankle cuff, fleece or French terry",
      image: "",
      imageAlt: "Men's Cuffed Fleece Jogger",
      href: `${PLP}/cuffed-fleece-jogger-mens`,
      sku: "CAP-JOG-01",
      pdpHeading: "Men's Cuffed Fleece Jogger Manufacturer",
      pdpMetaTitle: "Men's Cuffed Fleece Jogger Manufacturer",
      pdpDescription:
        "Men's cuffed fleece jogger, custom and private label, a tapered French terry or brushed fleece jogger with a ribbed ankle cuff and drawcord waist, made to your brand in Sialkot, Pakistan.",
      images: gallery("Men's Cuffed Fleece Jogger"),
      pdpMetaDescription:
        "Men's cuffed fleece jogger manufacturer: French terry or brushed fleece, tapered leg, ribbed ankle cuff, private label, MOQ 50 pieces, DDP to 20+ countries.",
      material: "French terry or brushed Cotton/Polyester fleece",
      pdpFabricPills: ["French terry", "Brushed fleece", "Cotton/Polyester fleece", "Recycled Cotton/Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What fabric is the men's cuffed fleece jogger made from?",
          a: "The men's cuffed fleece jogger is made in French terry or brushed Cotton/Polyester fleece. The exact blend and weight are confirmed on your sample, and recycled Cotton/Polyester is an option.",
        },
        {
          q: "How tapered is the men's cuffed fleece jogger?",
          a: "The men's cuffed fleece jogger has a tapered leg that narrows to a ribbed ankle cuff. The taper is set to your spec and graded so it holds at every size.",
        },
        {
          q: "Can the men's cuffed fleece jogger match our hoodies?",
          a: "Yes. The men's cuffed fleece jogger can be cut from the same fleece and dyed to the same Pantone as your hoodies or sweatshirts, so the set matches.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Slim Tapered Jogger", slug: "slim-tapered-jogger", href: PLP },
        { label: "Men's Cargo Jogger", slug: "cargo-jogger-mens", href: PLP },
        { label: "Men's Sweatpant", slug: "sweatpant-mens", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Men's cuffed fleece jogger" },
        { label: "Fabric", value: "French terry or brushed Cotton/Polyester fleece" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Tapered leg, men's block, graded XS to 5XL" },
        { label: "Cuff", value: "Ribbed ankle cuff" },
        { label: "Waistband", value: "Elastic waistband with an external drawcord" },
        { label: "Pockets", value: "Side pockets, back or zip pocket optional" },
        { label: "Gusset", value: "Crotch gusset for freedom of movement" },
        { label: "Construction", value: "Cut-and-sew, flatlock or overlock seams to your spec" },
        { label: "Branding", value: "Screen print, embroidery, DTF or heat transfer, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Men's Cuffed Fleece Jogger" },
      pdpQualityHeading: "The taper you approve, at every size",
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Taper graded proportionally across the full size run",
        "Ankle cuff rib checked to hold its shape after wash",
        "Shrinkage tested after wash",
        "Brushed fleece checked for pilling",
        "Gusset seam checked through movement",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "woven-track-pant-mens",
      gender: "Men",
      cardTitle: "Men's Woven Track Pant",
      cardSubline: "Lightweight woven, straight leg, open hem",
      image: "",
      imageAlt: "Men's Woven Track Pant",
      href: `${PLP}/woven-track-pant-mens`,
      sku: "CAP-JOG-02",
      pdpHeading: "Men's Woven Track Pant Manufacturer",
      pdpMetaTitle: "Men's Woven Track Pant Manufacturer",
      pdpDescription:
        "Men's woven track pant, custom and private label, a lightweight polyester woven pant with a straight leg, an open hem or ankle zip and an elastic drawcord waist, made to your brand in Sialkot, Pakistan.",
      images: gallery("Men's Woven Track Pant"),
      pdpMetaDescription:
        "Men's woven track pant manufacturer: lightweight polyester woven, straight leg, open hem or ankle zip, elastic waist, MOQ 50 pieces, DDP to 20+ countries.",
      material: "Lightweight polyester woven",
      pdpFabricPills: ["Polyester woven", "Recycled polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the men's woven track pant made from?",
          a: "The men's woven track pant is made in a lightweight polyester woven. The fabric and weight are confirmed on your sample, and recycled polyester is an option.",
        },
        {
          q: "Can the men's woven track pant have ankle zips?",
          a: "Yes. The men's woven track pant comes with an open hem as standard, and ankle zips can be added so it goes on and off over shoes.",
        },
        {
          q: "How is the men's woven track pant different from a jogger?",
          a: "The men's woven track pant is a lightweight woven with a straight leg and open hem. A jogger is knit fleece or terry with a tapered leg and a ribbed cuff.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Training Jogger", slug: "training-jogger-mens", href: PLP },
        { label: "Men's Mesh Training Pant", slug: "mesh-training-pant", href: PLP },
        { label: "Men's Cuffed Fleece Jogger", slug: "cuffed-fleece-jogger-mens", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Men's woven track pant" },
        { label: "Fabric", value: "Lightweight polyester woven, blend confirmed on your sample" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Straight or relaxed leg, men's block, graded XS to 5XL" },
        { label: "Hem", value: "Open hem, ankle zip optional" },
        { label: "Waistband", value: "Elastic waistband with a drawcord" },
        { label: "Lining", value: "Mesh lining optional" },
        { label: "Pockets", value: "Side pockets, zip pockets optional" },
        { label: "Detailing", value: "Side stripes, piping or color-blocking to your spec" },
        { label: "Branding", value: "Sublimation, screen print, embroidery or heat transfer, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Men's Woven Track Pant" },
      pdpQualityHeading: "Light, clean and built to move",
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Leg width and hem checked at every size",
        "Ankle zips function-tested before bulk",
        "Seams checked through movement",
        "Color matched across panels and stripes",
        "Shrinkage tested after wash",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "cargo-jogger-mens",
      gender: "Men",
      cardTitle: "Men's Cargo Jogger",
      cardSubline: "Cargo pockets, tapered leg, elastic cuff",
      image: "",
      imageAlt: "Men's Cargo Jogger",
      href: `${PLP}/cargo-jogger-mens`,
      sku: "CAP-JOG-03",
      pdpHeading: "Men's Cargo Jogger Manufacturer",
      pdpMetaTitle: "Men's Cargo Jogger Manufacturer",
      pdpDescription:
        "Men's cargo jogger, custom and private label, a tapered jogger with cargo pockets on each leg and an elastic cuff, in heavyweight fleece or a Polyester/Spandex stretch woven, made to your brand in Sialkot, Pakistan.",
      images: gallery("Men's Cargo Jogger"),
      pdpMetaDescription:
        "Men's cargo jogger manufacturer: heavyweight fleece or stretch woven, cargo pockets, tapered leg, elastic cuff, private label, MOQ 50, DDP to 20+ countries.",
      material: "Heavyweight cotton fleece or Polyester/Spandex stretch woven",
      pdpFabricPills: ["Heavyweight cotton fleece", "Polyester/Spandex stretch woven", "Cotton/Polyester fleece"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What fabrics can the men's cargo jogger be made in?",
          a: "The men's cargo jogger is made in heavyweight cotton fleece for a streetwear look or a Polyester/Spandex stretch woven for training, confirmed on your sample.",
        },
        {
          q: "What cargo pocket options are there on the men's cargo jogger?",
          a: "The men's cargo jogger has a cargo pocket on each leg, open or with a flap and snap, placed and sized to your spec.",
        },
        {
          q: "Can the men's cargo jogger have an open hem instead of a cuff?",
          a: "Yes. The men's cargo jogger comes with an elastic or ribbed cuff as standard, and an open or toggle hem can be cut to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Cuffed Fleece Jogger", slug: "cuffed-fleece-jogger-mens", href: PLP },
        { label: "Men's Training Jogger", slug: "training-jogger-mens", href: PLP },
        { label: "Men's Wide-Leg Jogger", slug: "wide-leg-jogger-mens", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Men's cargo jogger" },
        { label: "Fabric", value: "Heavyweight cotton fleece or Polyester/Spandex stretch woven" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Tapered leg, relaxed or regular, men's block, graded XS to 5XL" },
        { label: "Cargo pockets", value: "Cargo pocket on each leg, flap and snap or open, to your spec" },
        { label: "Cuff", value: "Elastic or ribbed ankle cuff" },
        { label: "Waistband", value: "Elastic waistband with a drawcord" },
        { label: "Pockets", value: "Side pockets, back pocket optional" },
        { label: "Construction", value: "Cut-and-sew, bar-tacked pocket corners" },
        { label: "Branding", value: "Screen print, embroidery or heat transfer, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Men's Cargo Jogger" },
      pdpQualityHeading: "Pockets that hold their shape",
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Cargo pocket placement checked at every size",
        "Pocket corners bar-tacked and load-tested",
        "Snaps function-tested before bulk",
        "Taper graded proportionally across the size run",
        "Shrinkage tested after wash",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "slim-tapered-jogger",
      gender: "Men",
      cardTitle: "Men's Slim Tapered Jogger",
      cardSubline: "Double-knit fleece, slim taper, zip pockets",
      image: "",
      imageAlt: "Men's Slim Tapered Jogger",
      href: `${PLP}/slim-tapered-jogger`,
      sku: "CAP-JOG-04",
    },
    {
      status: "draft",
      slug: "sweatpant-mens",
      gender: "Men",
      cardTitle: "Men's Sweatpant",
      cardSubline: "Heavier fleece, straight leg",
      image: "",
      imageAlt: "Men's Sweatpant",
      href: `${PLP}/sweatpant-mens`,
      sku: "CAP-JOG-05",
      pdpHeading: "Men's Sweatpant Manufacturer",
      pdpMetaTitle: "Men's Sweatpant Manufacturer",
      pdpDescription:
        "Men's sweatpant, custom and private label, a straight-leg sweatpant in a heavier brushed fleece or French terry, with an open or elastic hem and a drawcord waist, made to your brand in Sialkot, Pakistan.",
      images: gallery("Men's Sweatpant"),
      pdpMetaDescription:
        "Men's sweatpant manufacturer: heavier brushed fleece or French terry, straight leg, open or elastic hem, drawcord waist, MOQ 50, DDP to 20+ countries.",
      material: "Brushed Cotton/Polyester fleece, French terry or heavyweight cotton fleece",
      pdpFabricPills: ["Brushed fleece", "French terry", "Heavyweight cotton fleece"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the difference between the men's sweatpant and a jogger?",
          a: "The men's sweatpant has a straighter leg and an open or elastic hem in a heavier fleece. A jogger tapers to a ribbed ankle cuff.",
        },
        {
          q: "What fabrics can the men's sweatpant be made in?",
          a: "The men's sweatpant is made in brushed Cotton/Polyester fleece, French terry or a heavyweight cotton fleece, with weight confirmed on your sample.",
        },
        {
          q: "Can the men's sweatpant be garment-dyed?",
          a: "Yes. The men's sweatpant can be garment-dyed on cotton fleece for a softer, lived-in color, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Cuffed Fleece Jogger", slug: "cuffed-fleece-jogger-mens", href: PLP },
        { label: "Men's Wide-Leg Jogger", slug: "wide-leg-jogger-mens", href: PLP },
        { label: "Men's Cargo Jogger", slug: "cargo-jogger-mens", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Men's straight-leg sweatpant" },
        { label: "Fabric", value: "Brushed Cotton/Polyester fleece, French terry or heavyweight cotton fleece" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Straight or regular leg, men's block, graded XS to 5XL" },
        { label: "Hem", value: "Open hem or elastic hem, to your spec" },
        { label: "Waistband", value: "Elastic waistband with a drawcord" },
        { label: "Pockets", value: "Side pockets, back pocket optional" },
        { label: "Gusset", value: "Crotch gusset optional" },
        { label: "Finish", value: "Garment-dye available for premium fleece" },
        { label: "Branding", value: "Screen print, embroidery, DTF or heat transfer, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Men's Sweatpant" },
      pdpQualityHeading: "Heavier fleece, a straight clean leg",
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Leg width graded proportionally across the size run",
        "Shrinkage tested after wash",
        "Brushed fleece checked for pilling",
        "Hem finish checked for a straight, even drop",
        "Color matched to your approved sample",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "training-jogger-mens",
      gender: "Men",
      cardTitle: "Men's Training Jogger",
      cardSubline: "Stretch woven, tapered, zip pockets",
      image: "",
      imageAlt: "Men's Training Jogger",
      href: `${PLP}/training-jogger-mens`,
      sku: "CAP-JOG-06",
      pdpHeading: "Men's Training Jogger Manufacturer",
      pdpMetaTitle: "Men's Training Jogger Manufacturer",
      pdpDescription:
        "Men's training jogger, custom and private label, a lightweight Polyester/Spandex stretch woven jogger with a tapered leg, zip pockets and an elastic or adjustable cuff, made to your brand in Sialkot, Pakistan.",
      images: gallery("Men's Training Jogger"),
      pdpMetaDescription:
        "Men's training jogger manufacturer: Polyester/Spandex stretch woven, tapered leg, zip pockets, elastic or adjustable cuff, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight Polyester/Spandex stretch woven",
      pdpFabricPills: ["Polyester/Spandex stretch woven", "Recycled Polyester/Spandex"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the men's training jogger made from?",
          a: "The men's training jogger is made in a lightweight Polyester/Spandex stretch woven. The blend and weight are confirmed on your sample, and recycled Polyester/Spandex is an option.",
        },
        {
          q: "What cuff options are there on the men's training jogger?",
          a: "The men's training jogger comes with an elastic cuff or an adjustable toggle cuff that tightens at the ankle, chosen per style.",
        },
        {
          q: "How is the men's training jogger different from the woven track pant?",
          a: "The men's training jogger is a stretch woven with a tapered leg and a cuff for training. The woven track pant is a lighter, straighter leg with an open hem.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Woven Track Pant", slug: "woven-track-pant-mens", href: PLP },
        { label: "Men's Slim Tapered Jogger", slug: "slim-tapered-jogger", href: PLP },
        { label: "Men's Cargo Jogger", slug: "cargo-jogger-mens", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Men's training jogger" },
        { label: "Fabric", value: "Lightweight Polyester/Spandex stretch woven, recycled Polyester/Spandex available" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Tapered leg, men's block, graded XS to 5XL" },
        { label: "Cuff", value: "Elastic cuff or adjustable toggle cuff" },
        { label: "Waistband", value: "Elastic waistband with an internal drawcord" },
        { label: "Pockets", value: "Zip side pockets, zip back pocket optional" },
        { label: "Ventilation", value: "Perforated or mesh panels optional" },
        { label: "Construction", value: "Cut-and-sew, gusset to your spec" },
        { label: "Branding", value: "Heat transfer, silicone logos, reflective prints or embroidery, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Men's Training Jogger" },
      pdpQualityHeading: "Stretch that moves with every rep",
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Stretch and recovery checked after repeated wear and wash",
        "Zips function-tested before bulk",
        "Taper graded proportionally across the size run",
        "Gusset and inseam checked through movement",
        "Adjustable cuff checked for hold",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "wide-leg-jogger-mens",
      gender: "Men",
      cardTitle: "Men's Wide-Leg Jogger",
      cardSubline: "Heavyweight fleece, relaxed wide leg",
      image: "",
      imageAlt: "Men's Wide-Leg Jogger",
      href: `${PLP}/wide-leg-jogger-mens`,
      sku: "CAP-JOG-07",
    },
    {
      status: "draft",
      slug: "mesh-training-pant",
      gender: "Men",
      cardTitle: "Men's Mesh Training Pant",
      cardSubline: "Breathable mesh, loose fit, drawcord waist",
      image: "",
      imageAlt: "Men's Mesh Training Pant",
      href: `${PLP}/mesh-training-pant`,
      sku: "CAP-JOG-08",
    },
    {
      status: "draft",
      slug: "cuffed-fleece-jogger-womens",
      gender: "Women",
      cardTitle: "Women's Cuffed Fleece Jogger",
      cardSubline: "Tapered leg, ribbed ankle cuff, fleece or French terry",
      image: "",
      imageAlt: "Women's Cuffed Fleece Jogger",
      href: `${PLP}/cuffed-fleece-jogger-womens`,
      sku: "CAP-JOG-09",
      pdpHeading: "Women's Cuffed Fleece Jogger Manufacturer",
      pdpMetaTitle: "Women's Cuffed Fleece Jogger Manufacturer",
      pdpDescription:
        "Women's cuffed fleece jogger, custom and private label, a tapered French terry or brushed fleece jogger with a ribbed ankle cuff and drawcord waist, made to your brand in Sialkot, Pakistan.",
      images: gallery("Women's Cuffed Fleece Jogger"),
      pdpMetaDescription:
        "Women's cuffed fleece jogger manufacturer: French terry or brushed fleece, tapered leg, ribbed ankle cuff, private label, MOQ 50 pieces, DDP to 20+ countries.",
      material: "French terry or brushed Cotton/Polyester fleece",
      pdpFabricPills: ["French terry", "Brushed fleece", "Cotton/Polyester fleece", "Recycled Cotton/Polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What fabric is the women's cuffed fleece jogger made from?",
          a: "The women's cuffed fleece jogger is made in French terry or brushed Cotton/Polyester fleece. The exact blend and weight are confirmed on your sample, and recycled Cotton/Polyester is an option.",
        },
        {
          q: "Can the women's cuffed fleece jogger be made in a high rise?",
          a: "Yes. The women's cuffed fleece jogger is made in a mid rise as standard, and a high rise can be cut to your spec.",
        },
        {
          q: "Can the women's cuffed fleece jogger be made oversized?",
          a: "Yes. The women's cuffed fleece jogger comes in a regular or oversized fit, both tapering to a ribbed cuff, graded across the full size run.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Sweatpant", slug: "sweatpant-womens", href: PLP },
        { label: "Women's Cargo Jogger", slug: "cargo-jogger-womens", href: PLP },
        { label: "Women's Wide-Leg Jogger", slug: "wide-leg-jogger-womens", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Women's cuffed fleece jogger" },
        { label: "Fabric", value: "French terry or brushed Cotton/Polyester fleece" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Tapered leg, regular or oversized, women's block, graded XS to 5XL" },
        { label: "Rise", value: "Mid or high rise, to your spec" },
        { label: "Cuff", value: "Ribbed ankle cuff" },
        { label: "Waistband", value: "Elastic waistband with a drawcord" },
        { label: "Pockets", value: "Side pockets, back patch pocket optional" },
        { label: "Construction", value: "Cut-and-sew, flatlock or overlock seams to your spec" },
        { label: "Branding", value: "Screen print, embroidery, DTF or heat transfer, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Women's Cuffed Fleece Jogger" },
      pdpQualityHeading: "The taper you approve, at every size",
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Taper graded proportionally across the full size run",
        "Ankle cuff rib checked to hold its shape after wash",
        "Shrinkage tested after wash",
        "Brushed fleece checked for pilling",
        "Rise and waistband checked for hold",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "woven-track-pant-womens",
      gender: "Women",
      cardTitle: "Women's Woven Track Pant",
      cardSubline: "Lightweight woven, relaxed leg, adjustable hem",
      image: "",
      imageAlt: "Women's Woven Track Pant",
      href: `${PLP}/woven-track-pant-womens`,
      sku: "CAP-JOG-10",
      pdpHeading: "Women's Woven Track Pant Manufacturer",
      pdpMetaTitle: "Women's Woven Track Pant Manufacturer",
      pdpDescription:
        "Women's woven track pant, custom and private label, a lightweight polyester woven pant with a relaxed leg, an adjustable toggle or open hem and an elastic drawcord waist, made to your brand in Sialkot, Pakistan.",
      images: gallery("Women's Woven Track Pant"),
      pdpMetaDescription:
        "Women's woven track pant manufacturer: lightweight polyester woven, relaxed leg, adjustable toggle or open hem, elastic waist, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight polyester woven",
      pdpFabricPills: ["Polyester woven", "Recycled polyester"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the women's woven track pant made from?",
          a: "The women's woven track pant is made in a lightweight polyester woven. The weight is confirmed on your sample, and recycled polyester is an option.",
        },
        {
          q: "What hem options are there on the women's woven track pant?",
          a: "The women's woven track pant comes with an adjustable toggle hem or an open hem, so the leg can be worn straight or gathered at the ankle.",
        },
        {
          q: "Can the women's woven track pant match a track jacket?",
          a: "Yes. The women's woven track pant can be cut from the same woven and matched in color and stripes to a track jacket from our Track Jackets range.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Training Jogger", slug: "training-jogger-womens", href: PLP },
        { label: "Women's Wide-Leg Jogger", slug: "wide-leg-jogger-womens", href: PLP },
        { label: "Women's Cuffed Fleece Jogger", slug: "cuffed-fleece-jogger-womens", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Women's woven track pant" },
        { label: "Fabric", value: "Lightweight polyester woven, recycled polyester available" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Relaxed or oversized leg, women's block, graded XS to 5XL" },
        { label: "Hem", value: "Adjustable toggle hem or open hem" },
        { label: "Waistband", value: "Elastic waistband with an adjustable drawcord" },
        { label: "Lining", value: "Mesh lining optional" },
        { label: "Pockets", value: "Side pockets, zip pockets optional" },
        { label: "Detailing", value: "Side stripes, piping or color-blocking to your spec" },
        { label: "Branding", value: "Sublimation, screen print, embroidery or heat transfer, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Women's Woven Track Pant" },
      pdpQualityHeading: "Light, clean and built to move",
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Leg width and hem checked at every size",
        "Toggles function-tested before bulk",
        "Seams checked through movement",
        "Color matched across panels and stripes",
        "Shrinkage tested after wash",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "cargo-jogger-womens",
      gender: "Women",
      cardTitle: "Women's Cargo Jogger",
      cardSubline: "Cargo pockets, relaxed fit, adjustable ankle",
      image: "",
      imageAlt: "Women's Cargo Jogger",
      href: `${PLP}/cargo-jogger-womens`,
      sku: "CAP-JOG-11",
      pdpHeading: "Women's Cargo Jogger Manufacturer",
      pdpMetaTitle: "Women's Cargo Jogger Manufacturer",
      pdpDescription:
        "Women's cargo jogger, custom and private label, a relaxed jogger with cargo pockets on each leg and an adjustable or cuffed ankle, in French terry or a Polyester/Spandex stretch woven, made to your brand in Sialkot, Pakistan.",
      images: gallery("Women's Cargo Jogger"),
      pdpMetaDescription:
        "Women's cargo jogger manufacturer: French terry or stretch woven, cargo pockets, relaxed fit, adjustable or cuffed ankle, MOQ 50, DDP to 20+ countries.",
      material: "French terry or Polyester/Spandex stretch woven",
      pdpFabricPills: ["French terry", "Polyester/Spandex stretch woven", "Cotton/Polyester fleece"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What fabrics can the women's cargo jogger be made in?",
          a: "The women's cargo jogger is made in French terry for a relaxed lounge fit or a Polyester/Spandex stretch woven for training, confirmed on your sample.",
        },
        {
          q: "Can the women's cargo jogger have an adjustable ankle?",
          a: "Yes. The women's cargo jogger can have an adjustable toggle ankle, so it wears gathered or loose, or a fixed elastic cuff.",
        },
        {
          q: "Can the women's cargo jogger be made in a high rise?",
          a: "Yes. The women's cargo jogger is made in a mid rise as standard, and a high rise can be cut to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Cuffed Fleece Jogger", slug: "cuffed-fleece-jogger-womens", href: PLP },
        { label: "Women's Training Jogger", slug: "training-jogger-womens", href: PLP },
        { label: "Women's Wide-Leg Jogger", slug: "wide-leg-jogger-womens", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Women's cargo jogger" },
        { label: "Fabric", value: "French terry or Polyester/Spandex stretch woven" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Relaxed or oversized, women's block, graded XS to 5XL" },
        { label: "Cargo pockets", value: "Cargo pocket on each leg, flap and snap or open, to your spec" },
        { label: "Ankle", value: "Adjustable toggle ankle or elastic cuff" },
        { label: "Waistband", value: "Elastic waistband with a drawcord" },
        { label: "Rise", value: "Mid or high rise, to your spec" },
        { label: "Construction", value: "Cut-and-sew, bar-tacked pocket corners" },
        { label: "Branding", value: "Screen print, embroidery or heat transfer, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Women's Cargo Jogger" },
      pdpQualityHeading: "Pockets that hold their shape",
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Cargo pocket placement checked at every size",
        "Pocket corners bar-tacked and load-tested",
        "Toggles and snaps function-tested before bulk",
        "Shrinkage tested after wash",
        "Rise and waistband checked for hold",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "wide-leg-jogger-womens",
      gender: "Women",
      cardTitle: "Women's Wide-Leg Jogger",
      cardSubline: "High rise, wide leg, snap or open hem",
      image: "",
      imageAlt: "Women's Wide-Leg Jogger",
      href: `${PLP}/wide-leg-jogger-womens`,
      sku: "CAP-JOG-12",
    },
    {
      status: "draft",
      slug: "barrel-jogger",
      gender: "Women",
      cardTitle: "Women's Barrel Jogger",
      cardSubline: "Curved barrel leg, heavyweight terry",
      image: "",
      imageAlt: "Women's Barrel Jogger",
      href: `${PLP}/barrel-jogger`,
      sku: "CAP-JOG-13",
    },
    {
      status: "draft",
      slug: "sweatpant-womens",
      gender: "Women",
      cardTitle: "Women's Sweatpant",
      cardSubline: "French terry, relaxed straight leg",
      image: "",
      imageAlt: "Women's Sweatpant",
      href: `${PLP}/sweatpant-womens`,
      sku: "CAP-JOG-14",
      pdpHeading: "Women's Sweatpant Manufacturer",
      pdpMetaTitle: "Women's Sweatpant Manufacturer",
      pdpDescription:
        "Women's sweatpant, custom and private label, a relaxed straight-leg sweatpant in French terry or brushed fleece with an open hem and drawcord waist, made to your brand in Sialkot, Pakistan.",
      images: gallery("Women's Sweatpant"),
      pdpMetaDescription:
        "Women's sweatpant manufacturer: French terry or brushed fleece, relaxed straight leg, open hem, drawcord waist, private label, MOQ 50, DDP to 20+ countries.",
      material: "French terry or brushed Cotton/Polyester fleece",
      pdpFabricPills: ["French terry", "Brushed fleece", "Cotton/Polyester fleece"],
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the difference between the women's sweatpant and a jogger?",
          a: "The women's sweatpant has a relaxed straight leg and an open hem. A jogger tapers to a ribbed ankle cuff.",
        },
        {
          q: "What fabric is the women's sweatpant made from?",
          a: "The women's sweatpant is made in French terry or brushed Cotton/Polyester fleece, with weight confirmed on your sample.",
        },
        {
          q: "Can the women's sweatpant be made oversized?",
          a: "Yes. The women's sweatpant comes in a regular or oversized fit, with a mid or high rise to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Cuffed Fleece Jogger", slug: "cuffed-fleece-jogger-womens", href: PLP },
        { label: "Women's Wide-Leg Jogger", slug: "wide-leg-jogger-womens", href: PLP },
        { label: "Women's Barrel Jogger", slug: "barrel-jogger", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Women's straight-leg sweatpant" },
        { label: "Fabric", value: "French terry or brushed Cotton/Polyester fleece" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Relaxed straight leg, regular or oversized, women's block, graded XS to 5XL" },
        { label: "Hem", value: "Open hem, elastic hem optional" },
        { label: "Waistband", value: "Elastic waistband with a drawcord" },
        { label: "Rise", value: "Mid or high rise, to your spec" },
        { label: "Pockets", value: "Side pockets, back pocket optional" },
        { label: "Finish", value: "Garment-dye available for premium fleece" },
        { label: "Branding", value: "Screen print, embroidery, DTF or heat transfer, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Women's Sweatpant" },
      pdpQualityHeading: "Heavier fleece, a straight clean leg",
      pdpQualitySubline: SAMPLE_SUBLINE,
      pdpQualityPoints: [
        "Leg width graded proportionally across the size run",
        "Shrinkage tested after wash",
        "Brushed fleece checked for pilling",
        "Hem finish checked for a straight, even drop",
        "Rise and waistband checked for hold",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "training-jogger-womens",
      gender: "Women",
      cardTitle: "Women's Training Jogger",
      cardSubline: "Stretch woven, high rise, tapered",
      image: "",
      imageAlt: "Women's Training Jogger",
      href: `${PLP}/training-jogger-womens`,
      sku: "CAP-JOG-15",
    },
    {
      status: "draft",
      slug: "lightweight-jogger",
      gender: "Women",
      cardTitle: "Women's Lightweight Jogger",
      cardSubline: "Soft lightweight knit, relaxed drawcord fit",
      image: "",
      imageAlt: "Women's Lightweight Jogger",
      href: `${PLP}/lightweight-jogger`,
      sku: "CAP-JOG-16",
    },
  ],
  relatedLinks: [
    { label: "Leggings", href: "/capriowear/activewear/leggings" },
    { label: "Shorts", href: "/capriowear/activewear/shorts" },
    { label: "Hoodies", href: "/capriowear/activewear/hoodies" },
    { label: "Track Jackets & Zip-Ups", href: "/capriowear/activewear/track-jackets" },
    { label: "Tracksuits", href: "/capriowear/activewear/tracksuits" },
  ],
};
