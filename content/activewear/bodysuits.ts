// content/activewear/bodysuits.ts
// Rewritten to the owner's final, locked 9-SKU catalog and copy (owner
// spec, 2026-09-24) -- replaces the 2026-09-03 test version entirely,
// including its two test PDPs (tank, long-sleeve); SKU 1 and SKU 5 now
// reuse those slugs with new content. Single-gender (no gender field, no toggle),
// same as Leggings and Sports Bras.
//
// Every card is "draft": out of the sitemap and CollectionPage/ItemList. A
// card links once its PDP content (`pdpHeading` + `specifications`) exists,
// via the sitewide `isDraftPdpReachable()` rule, same as Hoodies. Grid order
// is SKU-number order, 1 to 9.
//
// PDP batches 1 to 3 (owner spec, 2026-09-24): all 9 SKUs carry full
// draft PDP content, so every card links and every page renders noindexed,
// with no sitemap entry and no Product/FAQPage JSON-LD. Key facts,
// customization chips, spec subtitle and the operational FAQs are the
// shared PDP defaults (./pdpShared.ts); "How we customize" is set once
// below for the whole category. Related-style pills carry a `slug`, so
// each resolves to its sibling's PDP through resolveRelatedStyleTags().
//
// No `weightTiers` block (owner spec): bodysuits are not weight-tier
// driven.
import type { Category } from "./types";
import { faqGetStarted } from "./pdpShared";

export const bodysuits: Category = {
  slug: "bodysuits",
  group: "Activewear",
  menuLabel: "Bodysuits",
  // Verbatim override pair (owner spec, 2026-09-24), same as Sports Bras:
  // bypasses categoryEntityFaq()'s templated sentence entirely.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom bodysuit manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label athletic bodysuits from fabric to packaging, including hip-ending tank, long-sleeve, and ribbed styles and short-leg bodysuits in sleeveless, long-sleeve, open-back, corset-detail, crossback, and double-layer running builds, in Nylon/Spandex and Polyester/Spandex knits, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  // "Athletic" qualifier stays in the H1 and title (the bare term draws
  // shapewear intent). No "| Capriowear" suffix: the root layout's title
  // template adds it.
  h1: "Custom Athletic Bodysuit Manufacturer",
  metaTitle: "Custom Athletic Bodysuit Manufacturer",
  metaDescription:
    "Custom athletic bodysuit manufacturer: private label hip-ending and short-leg bodysuits in Nylon/Spandex and Polyester/Spandex, MOQ 50, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Single-gender (no gender field, no toggle): the All/Women/Men chip row does not render.
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon/Spandex (72 to 78% / 22 to 28%)",
      bestFor: "Smooth second-skin and sculpting bodysuits",
      performance: "Soft hand, 4-way stretch, strong recovery",
    },
    {
      fabric: "Polyester/Spandex (68 to 89% / 11 to 32%)",
      bestFor: "Training, short-leg, and print-ready bodysuits",
      performance: "Moisture-wicking, quick-dry, holds sublimation",
    },
    {
      fabric: "Recycled Polyester/Spandex",
      bestFor: "Sustainable lines",
      performance: "Eco-positioning, moisture management",
    },
    {
      fabric: "Ribbed knit (Modal/Spandex)",
      bestFor: "Textured, rib-knit bodysuits",
      performance: "Structured stretch, soft rib texture",
    },
    {
      fabric: "Power mesh",
      bestFor: "Support and ventilation panels",
      performance: "Adds structure and airflow in targeted zones",
    },
  ],
  fabricNote: [
    {
      text: "Fabric weight and composition are confirmed on your sample, and matte or shine finish is chosen at swatch stage. Swatches before every bulk run, and we can source or match a specific fabric or reference garment.",
    },
  ],
  fabricPills: ["Nylon/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex", "Ribbed knit", "Power mesh"],
  qualityHeading: "A closure that holds, a fit that stays put",
  qualitySubline: "We test the closure, the gusset, and the fit on your sample before a single bulk piece is cut.",
  qualityPoints: [
    "Snap, hook, and zip closures cycled before bulk, pull-on styles checked for ease of entry",
    "Gusset seam tested under stretch, the highest-stress point on a one-piece",
    "Torso length graded and checked across every size, not just the sample",
    "Opacity confirmed under real stretch and movement, not only at rest",
    "Shelf bra pad placement and support checked on the sample and after wash testing",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Nylon/Spandex, Polyester/Spandex, recycled blends, ribbed knit, and power mesh support panels",
    },
    {
      title: "Silhouette and fit",
      body: "Hip-ending or short-leg, sleeveless, cap, or long sleeve, scoop, square, V, or mock neck, full or thong-cut back",
    },
    {
      title: "Closure and support",
      body: "Snap-button gusset, sewn gusset, hook-and-snap, front zip, or step-in pull-on with no crotch closure, built-in shelf bra with removable pads or no support",
    },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, heat transfer, embroidery" },
    { title: "Labels", body: "Woven, printed, or tear-away labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Entity question is NOT stored here -- see entityQuestion/entityAnswer
  // above; the route prepends it at render time. The remaining 15 below.
  faqs: [
    {
      q: "What is your MOQ for custom bodysuits?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a bodysuit and a jumpsuit?",
      a: "A bodysuit ends at the hip, or at a short bike-short-length leg a few inches down the thigh. A jumpsuit or unitard continues into full or cropped leg coverage. Capriowear makes both.",
    },
    {
      q: "What is a short-leg bodysuit?",
      a: "A short-leg bodysuit is a one-piece with a built-in bike-short leg of a few inches instead of a hip-ending brief cut, and it is built as a step-in, pull-on garment with no crotch closure. It removes the gap and waistband ride-up between a separate top and shorts, and a double-layer version adds a loose outer short over a fitted inner short for running lines.",
    },
    {
      q: "What closure options do you offer on bodysuits?",
      a: "Closure is set per style: a snap-button gusset, a snap-fastened panel at the crotch, on hip-ending styles; a fully sewn gusset for simpler builds; a hook-and-snap combination; a front zip; or a step-in, pull-on build with no crotch closure on short-leg styles. Every closure is cycled open and closed on your sample before bulk, and pull-on styles are checked for ease of entry across the size run.",
    },
    {
      q: "Can you build a shelf bra into a bodysuit?",
      a: "Yes. A shelf bra, an elastic underband with a lining layer sewn into the front body, can be built in with removable pads and adjustable straps, from medium to high support, or the bodysuit can be left plain to wear with a separate sports bra.",
    },
    {
      q: "Which fabrics do you use for bodysuits?",
      a: "Nylon/Spandex and Polyester/Spandex knits for the body, recycled Polyester/Spandex for sustainable lines, ribbed knit for textured styles, and power mesh for support and ventilation panels, all confirmed on your sample.",
    },
    {
      q: "How do you check opacity on a bodysuit?",
      a: "We check bodysuit opacity on your sample under real stretch and movement, not only at rest, and move to a heavier knit or a lined panel where a color needs it.",
    },
    {
      q: "How are bodysuits sized?",
      a: "Alpha XS to 5XL. Torso length is graded and checked across every size, because on a one-piece garment a torso that runs short or long changes the fit of the whole bodysuit.",
    },
    {
      q: "Can you match a specific fabric or a reference bodysuit?",
      a: "Yes. Send a swatch, reference garment, or tech pack and we source or develop to match, then share swatches and confirm on your sample before bulk.",
    },
    {
      q: "What can I customize on a bodysuit?",
      a: "Everything from fabric to packaging: fabric and finish, silhouette, leg length, sleeve, neckline, back coverage, closure, shelf bra, color, print, your logos, labels, hangtags, and packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM, and private label bodysuits?",
      a: "Yes, all three. As a private label bodysuit manufacturer, we make every style under your brand, with your labels and packaging.",
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
  ctaReferenceNoun: "bodysuit",
  // "How we customize" for every Bodysuits PDP (owner spec, 2026-09-24):
  // 6 steps incl. Build, overriding the shared 5-step default. Same
  // temporary factory photography as the shared default.
  pdpCustomizationSteps: {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    steps: [
      { title: "Fabric and material", body: "Any blend and weight, sourced or matched to your reference", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric and material" } },
      { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
      { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
      { title: "Build", body: "Silhouette, leg length, neckline, back, closure, and shelf bra to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Build" } },
      { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" } },
      { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
    ],
  },
  // 9 drafts, all with full PDP content, SKU-number order (see header comment). Alt text is
  // the card name exactly.
  styleCards: [
    {
      status: "draft",
      slug: "tank",
      cardTitle: "Custom Tank Bodysuit",
      cardSubline: "Hip-ending, wide tank straps, scoop neck",
      image: "",
      imageAlt: "Custom Tank Bodysuit",
      href: "/capriowear/activewear/bodysuits/tank",
      sku: "CAP-BOD-01",
      pdpHeading: "Custom Tank Bodysuit Manufacturer",
      pdpDescription:
        "Hip-ending tank bodysuit with a scoop neck and wide straps, custom and private label, in a moisture-wicking Polyester/Spandex knit with a snap-button gusset, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Tank Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom tank bodysuit manufacturer, private label, hip-ending cut, scoop neck, wide straps, snap gusset, optional shelf bra, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Tank Bodysuit" },
        { alt: "Custom Tank Bodysuit" },
        { alt: "Custom Tank Bodysuit" },
        { alt: "Custom Tank Bodysuit" },
        { alt: "Custom Tank Bodysuit" },
        { alt: "Custom Tank Bodysuit" },
      ],
      material: "Polyester/Spandex or recycled Polyester/Spandex 4-way stretch knit, Nylon/Spandex on request",
      pdpFabricPills: ["Polyester/Spandex", "Recycled Polyester/Spandex", "Nylon/Spandex"],
      faqs: [
        {
          q: "What fabric do you build the tank bodysuit in?",
          a: "A moisture-wicking Polyester/Spandex 4-way stretch knit as the base, recycled Polyester/Spandex for sustainable lines, or Nylon/Spandex for a softer hand. The exact blend and weight of the tank bodysuit are confirmed on your sample, matched to your reference if you have one.",
        },
        {
          q: "What closure do you use on the tank bodysuit?",
          a: "A snap-button gusset as standard, which opens at the crotch, or a fully sewn gusset for a simpler build. The closure is cycled open and closed on your sample before bulk.",
        },
        {
          q: "Can the tank bodysuit be built with a shelf bra?",
          a: "Yes. The tank bodysuit can be built plain, to wear with a separate sports bra, or with a built-in shelf bra with removable pads and adjustable straps, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Long-Sleeve Bodysuit", slug: "long-sleeve", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Ribbed Bodysuit", slug: "ribbed", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Sleeveless Short-Leg Bodysuit", slug: "sleeveless-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Crossback Short-Leg Bodysuit", slug: "crossback-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "See All", href: "/capriowear/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Style", value: "Hip-ending tank bodysuit" },
        { label: "Fabric", value: "Polyester/Spandex or recycled Polyester/Spandex 4-way stretch knit, Nylon/Spandex on request, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Silhouette", value: "Hip-ending, standard or high-cut leg opening" },
        { label: "Neckline and straps", value: "Scoop neck, wide tank straps" },
        { label: "Back", value: "Full back, thong-cut on request" },
        { label: "Closure", value: "Snap-button gusset as standard, sewn gusset on request" },
        { label: "Support", value: "Plain, or built-in shelf bra with removable pads" },
        { label: "Construction", value: "Cut-and-sew, 4-way stretch, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Tank Bodysuit" },
      pdpQualityHeading: "A closure that holds, a fit that stays put",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Snap gusset cycled open and closed before bulk",
        "Gusset seam tested under stretch, the highest-stress point on a one-piece",
        "Torso length graded and checked across every size",
        "Opacity confirmed under real stretch and movement",
        "Strap and neckline edges hold their recovery",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "sleeveless-short-leg",
      cardTitle: "Custom Sleeveless Short-Leg Bodysuit",
      cardSubline: "Built-in bike-short leg, thin straps, scoop neck",
      image: "",
      imageAlt: "Custom Sleeveless Short-Leg Bodysuit",
      href: "/capriowear/activewear/bodysuits/sleeveless-short-leg",
      sku: "CAP-BOD-02",
      pdpHeading: "Custom Sleeveless Short-Leg Bodysuit Manufacturer",
      pdpDescription:
        "Sleeveless short-leg bodysuit with a built-in bike-short leg, thin straps and a scoop neck, custom and private label, in a 4-way stretch Polyester/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Sleeveless Short-Leg Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom sleeveless short-leg bodysuit manufacturer, private label, built-in bike-short leg, scoop neck, Polyester/Spandex knit, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Sleeveless Short-Leg Bodysuit" },
        { alt: "Custom Sleeveless Short-Leg Bodysuit" },
        { alt: "Custom Sleeveless Short-Leg Bodysuit" },
        { alt: "Custom Sleeveless Short-Leg Bodysuit" },
        { alt: "Custom Sleeveless Short-Leg Bodysuit" },
        { alt: "Custom Sleeveless Short-Leg Bodysuit" },
      ],
      material: "Polyester/Spandex 4-way stretch knit, commonly around 82% / 18%",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "How long is the leg on the sleeveless short-leg bodysuit?",
          a: "The sleeveless short-leg bodysuit has a built-in bike-short leg that ends a few inches down the thigh. The inseam is set to your spec and graded across the size run, confirmed on your sample.",
        },
        {
          q: "How does a sleeveless short-leg bodysuit go on without a crotch closure?",
          a: "The sleeveless short-leg bodysuit is a step-in, pull-on build. The 4-way stretch body and straps let it go on over the shoulders, so it needs no crotch closure, and we check ease of entry across the size run on your sample.",
        },
        {
          q: "What fabric do you build the sleeveless short-leg bodysuit in?",
          a: "A Polyester/Spandex 4-way stretch knit, commonly around 82% Polyester and 18% Spandex, for compression hold and quick drying. The exact blend and weight of the sleeveless short-leg bodysuit are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Tank Bodysuit", slug: "tank", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Long-Sleeve Short-Leg Bodysuit", slug: "long-sleeve-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Crossback Short-Leg Bodysuit", slug: "crossback-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Double-Layer Short-Leg Bodysuit", slug: "double-layer-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "See All", href: "/capriowear/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Style", value: "Sleeveless short-leg bodysuit" },
        { label: "Fabric", value: "Polyester/Spandex 4-way stretch knit, commonly around 82% / 18%, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Silhouette", value: "Built-in bike-short leg, inseam to your spec" },
        { label: "Neckline and straps", value: "Scoop neck, thin straps" },
        { label: "Entry", value: "Step-in, pull-on, no crotch closure" },
        { label: "Support", value: "Plain, or built-in shelf bra with removable pads" },
        { label: "Construction", value: "Cut-and-sew, gusseted seat, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Sleeveless Short-Leg Bodysuit" },
      pdpQualityHeading: "A fit that stays put, rep after rep",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Leg hem checked for roll and ride-up under movement",
        "Seat opacity confirmed under squat-depth stretch",
        "Torso length graded and checked across every size",
        "Seat and crotch seams stress-tested",
        "Ease of entry checked across the size run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "long-sleeve-short-leg",
      cardTitle: "Custom Long-Sleeve Short-Leg Bodysuit",
      cardSubline: "Built-in bike-short leg, long sleeve, deep-V open back",
      image: "",
      imageAlt: "Custom Long-Sleeve Short-Leg Bodysuit",
      href: "/capriowear/activewear/bodysuits/long-sleeve-short-leg",
      sku: "CAP-BOD-03",
      pdpHeading: "Custom Long-Sleeve Short-Leg Bodysuit Manufacturer",
      pdpDescription:
        "Long-sleeve short-leg bodysuit with a built-in bike-short leg and a deep-V open back, custom and private label, in a soft 4-way stretch Nylon/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Long-Sleeve Short-Leg Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom long-sleeve short-leg bodysuit manufacturer, private label, built-in bike-short leg, deep-V open back, Nylon/Spandex knit, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Long-Sleeve Short-Leg Bodysuit" },
        { alt: "Custom Long-Sleeve Short-Leg Bodysuit" },
        { alt: "Custom Long-Sleeve Short-Leg Bodysuit" },
        { alt: "Custom Long-Sleeve Short-Leg Bodysuit" },
        { alt: "Custom Long-Sleeve Short-Leg Bodysuit" },
        { alt: "Custom Long-Sleeve Short-Leg Bodysuit" },
      ],
      material: "Nylon/Spandex 4-way stretch knit, commonly around 78% / 22%",
      pdpFabricPills: ["Nylon/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "How is the long-sleeve short-leg bodysuit different from the sleeveless short-leg bodysuit?",
          a: "The long-sleeve short-leg bodysuit adds full-length sleeves and a deep-V open back to the same built-in bike-short leg, for cooler-weather training and layering. The sleeveless short-leg bodysuit keeps thin straps and a scoop neck.",
        },
        {
          q: "Which fabric works best for a long-sleeve short-leg bodysuit?",
          a: "A Nylon/Spandex knit, commonly around 78% Nylon and 22% Spandex, for a soft, sculpting hand and strong recovery through the sleeves and seat. Opacity of the long-sleeve short-leg bodysuit is confirmed under stretch in your chosen colors on your sample.",
        },
        {
          q: "Can you add a seat scrunch to the long-sleeve short-leg bodysuit?",
          a: "Yes. A light scrunch can be sewn into the back seat seam of the long-sleeve short-leg bodysuit, or left out for a smooth finish, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Sleeveless Short-Leg Bodysuit", slug: "sleeveless-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Open-Back Short-Leg Bodysuit", slug: "open-back-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Long-Sleeve Bodysuit", slug: "long-sleeve", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Corset-Detail Short-Leg Bodysuit", slug: "corset-detail-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "See All", href: "/capriowear/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Style", value: "Long-sleeve short-leg bodysuit" },
        { label: "Fabric", value: "Nylon/Spandex 4-way stretch knit, commonly around 78% / 22%, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Silhouette", value: "Built-in bike-short leg, inseam to your spec" },
        { label: "Sleeve", value: "Long sleeve, thumbholes on request" },
        { label: "Neckline and back", value: "Scoop front, deep-V open back" },
        { label: "Seat detail", value: "Light seat scrunch, or smooth, to your spec" },
        { label: "Entry", value: "Step-in, pull-on, no crotch closure" },
        { label: "Construction", value: "Cut-and-sew, gusseted seat, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Long-Sleeve Short-Leg Bodysuit" },
      pdpQualityHeading: "A fit that stays put, rep after rep",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Leg hem checked for roll and ride-up under movement",
        "Seat opacity confirmed under squat-depth stretch, light and dark colors",
        "Sleeve and underarm seams stress-tested through full range of motion",
        "Open-back edges hold their recovery",
        "Torso length graded and checked across every size",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "open-back-short-leg",
      cardTitle: "Custom Open-Back Short-Leg Bodysuit",
      cardSubline: "Mock neck, quarter-zip front, cap sleeve, back cutout",
      image: "",
      imageAlt: "Custom Open-Back Short-Leg Bodysuit",
      href: "/capriowear/activewear/bodysuits/open-back-short-leg",
      sku: "CAP-BOD-04",
      pdpHeading: "Custom Open-Back Short-Leg Bodysuit Manufacturer",
      pdpDescription:
        "Open-back short-leg bodysuit with a mock neck, quarter-zip front, cap sleeves and a back cutout, custom and private label, in a high-stretch Polyester/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Open-Back Short-Leg Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom open-back short-leg bodysuit manufacturer, private label, mock neck, quarter-zip front, back cutout, bike-short leg, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Open-Back Short-Leg Bodysuit" },
        { alt: "Custom Open-Back Short-Leg Bodysuit" },
        { alt: "Custom Open-Back Short-Leg Bodysuit" },
        { alt: "Custom Open-Back Short-Leg Bodysuit" },
        { alt: "Custom Open-Back Short-Leg Bodysuit" },
        { alt: "Custom Open-Back Short-Leg Bodysuit" },
      ],
      material: "Polyester/Spandex high-stretch knit, commonly around 68% / 32%",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What does the front zip do on the open-back short-leg bodysuit?",
          a: "The open-back short-leg bodysuit has a quarter-zip front at a mock neck, which makes the style easier to step into and adds ventilation at the neck. Zip type, length and puller are specified to your brief.",
        },
        {
          q: "Can you change the back cutout on the open-back short-leg bodysuit?",
          a: "Yes. The back cutout on the open-back short-leg bodysuit is cut to your pattern in any shape or size, with the edges bound or turned and checked for stretch recovery on your sample.",
        },
        {
          q: "What fabric do you use for the open-back short-leg bodysuit?",
          a: "A high-stretch Polyester/Spandex knit, commonly around 68% Polyester and 32% Spandex, which holds the cutout edges and mock neck close to the body. The exact blend and weight of the open-back short-leg bodysuit are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Sleeveless Short-Leg Bodysuit", slug: "sleeveless-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Long-Sleeve Short-Leg Bodysuit", slug: "long-sleeve-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Corset-Detail Short-Leg Bodysuit", slug: "corset-detail-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Crossback Short-Leg Bodysuit", slug: "crossback-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "See All", href: "/capriowear/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Style", value: "Open-back short-leg bodysuit" },
        { label: "Fabric", value: "Polyester/Spandex high-stretch knit, commonly around 68% / 32%, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Silhouette", value: "Built-in bike-short leg, inseam to your spec" },
        { label: "Sleeve", value: "Cap sleeve" },
        { label: "Neckline", value: "Mock neck with quarter-zip front" },
        { label: "Back", value: "Open-back cutout, shape and size to your pattern" },
        { label: "Closure", value: "Quarter-zip front, zip type and puller to your spec" },
        { label: "Entry", value: "Quarter-zip front, step-in, no crotch closure" },
        { label: "Construction", value: "Cut-and-sew, bound or turned cutout edges, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Open-Back Short-Leg Bodysuit" },
      pdpQualityHeading: "Cutouts and zips that hold their shape",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Cutout edges checked for stretch recovery, no rolling or gaping",
        "Front zip tested open and closed under stretch, lies flat at the neck",
        "Seat opacity confirmed under squat-depth stretch",
        "Torso length graded and checked across every size",
        "Leg hem checked for roll and ride-up under movement",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "long-sleeve",
      cardTitle: "Custom Long-Sleeve Bodysuit",
      cardSubline: "Hip-ending, long sleeve, scoop neck",
      image: "",
      imageAlt: "Custom Long-Sleeve Bodysuit",
      href: "/capriowear/activewear/bodysuits/long-sleeve",
      sku: "CAP-BOD-05",
      pdpHeading: "Custom Long-Sleeve Bodysuit Manufacturer",
      pdpDescription:
        "Hip-ending long-sleeve bodysuit with a scoop neck and a snap-button gusset, custom and private label, in a smooth Polyester/Spandex knit, built as a base layer or standalone piece, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Long-Sleeve Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom long-sleeve bodysuit manufacturer, private label, hip-ending cut, scoop neck, snap gusset, thong-cut or full back, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Long-Sleeve Bodysuit" },
        { alt: "Custom Long-Sleeve Bodysuit" },
        { alt: "Custom Long-Sleeve Bodysuit" },
        { alt: "Custom Long-Sleeve Bodysuit" },
        { alt: "Custom Long-Sleeve Bodysuit" },
        { alt: "Custom Long-Sleeve Bodysuit" },
      ],
      material: "Polyester/Spandex 4-way stretch knit, commonly around 89% / 11%",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "How is the long-sleeve bodysuit different from the long-sleeve short-leg bodysuit?",
          a: "The long-sleeve bodysuit ends at the hip with a snap-button gusset, so it can be specified as a base layer under shorts, joggers or leggings or as a standalone piece. The long-sleeve short-leg bodysuit has a built-in bike-short leg and a deep-V open back, so it needs no separate bottom.",
        },
        {
          q: "Can the long-sleeve bodysuit be built with a full back instead of a thong cut?",
          a: "Yes. The long-sleeve bodysuit is built with a thong-cut or full back to your spec, and the leg opening can be cut standard or high, confirmed on your sample.",
        },
        {
          q: "What fabric do you build the long-sleeve bodysuit in?",
          a: "A smooth Polyester/Spandex 4-way stretch knit, commonly around 89% Polyester and 11% Spandex, which layers cleanly under other garments. The exact blend and weight of the long-sleeve bodysuit are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Tank Bodysuit", slug: "tank", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Long-Sleeve Short-Leg Bodysuit", slug: "long-sleeve-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Ribbed Bodysuit", slug: "ribbed", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Sleeveless Short-Leg Bodysuit", slug: "sleeveless-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "See All", href: "/capriowear/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Style", value: "Hip-ending long-sleeve bodysuit" },
        { label: "Fabric", value: "Polyester/Spandex 4-way stretch knit, commonly around 89% / 11%, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Silhouette", value: "Hip-ending, standard or high-cut leg opening" },
        { label: "Sleeve", value: "Long sleeve, thumbholes on request" },
        { label: "Neckline", value: "Scoop neck, crew or mock on request" },
        { label: "Back", value: "Thong-cut or full back, to your spec" },
        { label: "Closure", value: "Snap-button gusset as standard, sewn gusset on request" },
        { label: "Construction", value: "Cut-and-sew, 4-way stretch, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Long-Sleeve Bodysuit" },
      pdpQualityHeading: "A closure that holds, a fit that stays put",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Snap gusset cycled open and closed before bulk",
        "Gusset seam tested under stretch, the highest-stress point on a one-piece",
        "Sleeve and underarm seams stress-tested through full range of motion",
        "Torso length graded and checked across every size",
        "Opacity confirmed under real stretch and movement",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "corset-detail-short-leg",
      cardTitle: "Custom Corset-Detail Short-Leg Bodysuit",
      cardSubline: "Boned corset waist, built-in bike-short leg",
      image: "",
      imageAlt: "Custom Corset-Detail Short-Leg Bodysuit",
      href: "/capriowear/activewear/bodysuits/corset-detail-short-leg",
      sku: "CAP-BOD-06",
      pdpHeading: "Custom Corset-Detail Short-Leg Bodysuit Manufacturer",
      pdpDescription:
        "Short-leg bodysuit with corset-style boning channels at the waist, thin straps and a scoop neck, custom and private label, in a matte, sculpting Nylon/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Corset-Detail Short-Leg Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom corset-detail short-leg bodysuit manufacturer, private label, boned waist, matte Nylon/Spandex, bike-short leg, scoop neck, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Corset-Detail Short-Leg Bodysuit" },
        { alt: "Custom Corset-Detail Short-Leg Bodysuit" },
        { alt: "Custom Corset-Detail Short-Leg Bodysuit" },
        { alt: "Custom Corset-Detail Short-Leg Bodysuit" },
        { alt: "Custom Corset-Detail Short-Leg Bodysuit" },
        { alt: "Custom Corset-Detail Short-Leg Bodysuit" },
      ],
      material: "Matte Nylon/Spandex sculpting knit, commonly around 72 to 76% / 24 to 28%",
      pdpFabricPills: ["Nylon/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "How is the corset detail built on the corset-detail short-leg bodysuit?",
          a: "The corset-detail short-leg bodysuit has flexible boning sewn into covered channels at the waist, which shapes the waistline while the knit keeps its stretch. Boning count, length and placement are set to your spec and confirmed on your sample.",
        },
        {
          q: "How do you test the boning on the corset-detail short-leg bodysuit?",
          a: "We test the boning on the corset-detail short-leg bodysuit for flex, recovery and poke-through through bending and squatting on your sample before bulk, with every boning channel closed and covered at both ends.",
        },
        {
          q: "What fabric do you build the corset-detail short-leg bodysuit in?",
          a: "A matte, sculpting Nylon/Spandex knit, commonly around 72 to 76% Nylon with the balance Spandex, which gives the corset-detail short-leg bodysuit a smooth finish and firm hold. The exact blend and weight are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Sleeveless Short-Leg Bodysuit", slug: "sleeveless-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Long-Sleeve Short-Leg Bodysuit", slug: "long-sleeve-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Open-Back Short-Leg Bodysuit", slug: "open-back-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Crossback Short-Leg Bodysuit", slug: "crossback-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "See All", href: "/capriowear/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Style", value: "Corset-detail short-leg bodysuit" },
        { label: "Fabric", value: "Matte Nylon/Spandex sculpting knit, commonly around 72 to 76% / 24 to 28%, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Silhouette", value: "Built-in bike-short leg, around 3 inch inseam or to your spec" },
        { label: "Waist", value: "Sewn boning channels at the waist, flexible boning, count and placement to your spec" },
        { label: "Neckline and straps", value: "Scoop neck, thin straps" },
        { label: "Entry", value: "Step-in, pull-on, no crotch closure" },
        { label: "Construction", value: "Cut-and-sew, gusseted seat, covered boning channels, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Corset-Detail Short-Leg Bodysuit" },
      pdpQualityHeading: "Structure that stays in place",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Boning channels checked for secure, covered ends with no poke-through",
        "Boning tested for flex and recovery through bending and squatting",
        "Seat opacity confirmed under squat-depth stretch",
        "Leg hem checked for roll and ride-up under movement",
        "Torso length graded and checked across every size",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "crossback-short-leg",
      cardTitle: "Custom Crossback Short-Leg Bodysuit",
      cardSubline: "Crossover straps, built-in shelf bra, removable pads",
      image: "",
      imageAlt: "Custom Crossback Short-Leg Bodysuit",
      href: "/capriowear/activewear/bodysuits/crossback-short-leg",
      sku: "CAP-BOD-07",
      pdpHeading: "Custom Crossback Short-Leg Bodysuit Manufacturer",
      pdpDescription:
        "Crossback short-leg bodysuit with thin straps crossing to an open back and a 2-layer shelf bra with removable pads, custom and private label, in a soft Nylon/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Crossback Short-Leg Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom crossback short-leg bodysuit manufacturer, private label, 2-layer shelf bra, removable pads, open back, Nylon/Spandex, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Crossback Short-Leg Bodysuit" },
        { alt: "Custom Crossback Short-Leg Bodysuit" },
        { alt: "Custom Crossback Short-Leg Bodysuit" },
        { alt: "Custom Crossback Short-Leg Bodysuit" },
        { alt: "Custom Crossback Short-Leg Bodysuit" },
        { alt: "Custom Crossback Short-Leg Bodysuit" },
      ],
      material: "Nylon/Spandex 4-way stretch knit, commonly around 78% / 22%",
      pdpFabricPills: ["Nylon/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "How is the shelf bra built into the crossback short-leg bodysuit?",
          a: "The crossback short-leg bodysuit has a 2-layer shelf bra sewn into the front body, with an elastic underband and pockets for removable pads. Band tension, cup shape and support level are set to your spec and checked across the size run on your sample.",
        },
        {
          q: "Can the strap layout on the crossback short-leg bodysuit be changed?",
          a: "Yes. The crossback short-leg bodysuit ships with thin straps crossing once at the upper back, and strap width, crossover point and back depth can all be adjusted to your pattern, confirmed on your sample.",
        },
        {
          q: "What fabric do you build the crossback short-leg bodysuit in?",
          a: "A soft Nylon/Spandex 4-way stretch knit, commonly around 78% Nylon and 22% Spandex, which holds the shelf bra and open back close to the body. The exact blend and weight of the crossback short-leg bodysuit are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Sleeveless Short-Leg Bodysuit", slug: "sleeveless-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Double-Layer Short-Leg Bodysuit", slug: "double-layer-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Open-Back Short-Leg Bodysuit", slug: "open-back-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Corset-Detail Short-Leg Bodysuit", slug: "corset-detail-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "See All", href: "/capriowear/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Style", value: "Crossback short-leg bodysuit with built-in shelf bra" },
        { label: "Fabric", value: "Nylon/Spandex 4-way stretch knit, commonly around 78% / 22%, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Silhouette", value: "Built-in bike-short leg, around 6 inch inseam or to your spec" },
        { label: "Straps and back", value: "Thin straps crossing once at the upper back, deep open scoop back" },
        { label: "Support", value: "Built-in 2-layer shelf bra with removable pads" },
        { label: "Neckline", value: "Scoop neck" },
        { label: "Entry", value: "Step-in, pull-on, no crotch closure" },
        { label: "Construction", value: "Cut-and-sew, gusseted seat, bound strap and back edges, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Crossback Short-Leg Bodysuit" },
      pdpQualityHeading: "Support that holds, straps that stay put",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Shelf bra band checked for recovery and hold under movement",
        "Cup pockets checked for a secure, snag-free fit and correct pad placement across the size run",
        "Strap crossover point and anchors stress-tested",
        "Open-back edges hold their recovery, no rolling",
        "Seat opacity confirmed under squat-depth stretch",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "ribbed",
      cardTitle: "Custom Ribbed Bodysuit",
      cardSubline: "Ribbed knit, square neck, snap gusset",
      image: "",
      imageAlt: "Custom Ribbed Bodysuit",
      href: "/capriowear/activewear/bodysuits/ribbed",
      sku: "CAP-BOD-08",
      pdpHeading: "Custom Ribbed Bodysuit Manufacturer",
      pdpDescription:
        "Hip-ending ribbed bodysuit in a double-layer rib knit with a square neckline, wide straps and a snap-button gusset, custom and private label, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Ribbed Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom ribbed bodysuit manufacturer, private label, double-layer Modal/Spandex rib, square neck, wide straps, snap gusset, MOQ from 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Ribbed Bodysuit" },
        { alt: "Custom Ribbed Bodysuit" },
        { alt: "Custom Ribbed Bodysuit" },
        { alt: "Custom Ribbed Bodysuit" },
        { alt: "Custom Ribbed Bodysuit" },
        { alt: "Custom Ribbed Bodysuit" },
      ],
      material: "Double-layer rib knit, Modal/Spandex commonly around 89% / 11%, or Polyester/Spandex rib",
      pdpFabricPills: ["Modal/Spandex Rib", "Polyester/Spandex Rib", "Nylon/Spandex"],
      faqs: [
        {
          q: "What rib fabric do you use for the ribbed bodysuit?",
          a: "The ribbed bodysuit is built in a double-layer rib knit, commonly Modal/Spandex at around 89% Modal and 11% Spandex for a soft hand, or a Polyester/Spandex rib for a quicker-drying, more colorfast build. Rib width, blend and weight are confirmed on your sample.",
        },
        {
          q: "Why build the ribbed bodysuit double-layer?",
          a: "A double layer gives the ribbed bodysuit full opacity and a smoother fit without a separate lining, while the rib keeps its stretch. We confirm opacity under stretch on your sample in your chosen colors.",
        },
        {
          q: "What closure do you use on the ribbed bodysuit?",
          a: "A snap-button gusset as standard, which opens at the crotch, or a fully sewn gusset for a simpler build. The closure is cycled open and closed on your sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Tank Bodysuit", slug: "tank", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Long-Sleeve Bodysuit", slug: "long-sleeve", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Sleeveless Short-Leg Bodysuit", slug: "sleeveless-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Crossback Short-Leg Bodysuit", slug: "crossback-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "See All", href: "/capriowear/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Style", value: "Hip-ending ribbed bodysuit" },
        { label: "Fabric", value: "Double-layer rib knit, Modal/Spandex commonly around 89% / 11%, or Polyester/Spandex rib, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Silhouette", value: "Hip-ending, standard or high-cut leg opening" },
        { label: "Neckline and straps", value: "Square neck, wide straps" },
        { label: "Back", value: "Thong-cut or full back, to your spec" },
        { label: "Closure", value: "Snap-button gusset as standard, sewn gusset on request" },
        { label: "Construction", value: "Cut-and-sew, double-layer rib body, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Ribbed Bodysuit" },
      pdpQualityHeading: "A rib that holds its shape, a closure that holds",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Rib knit checked for recovery, no bagging at the seat or neckline",
        "Double-layer body checked for opacity under stretch",
        "Snap gusset cycled open and closed before bulk",
        "Gusset seam tested under stretch, the highest-stress point on a one-piece",
        "Torso length graded and checked across every size",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "double-layer-short-leg",
      cardTitle: "Custom Double-Layer Short-Leg Bodysuit",
      cardSubline: "Running build, loose outer short over fitted inner short",
      image: "",
      imageAlt: "Custom Double-Layer Short-Leg Bodysuit",
      href: "/capriowear/activewear/bodysuits/double-layer-short-leg",
      sku: "CAP-BOD-09",
      pdpHeading: "Custom Double-Layer Short-Leg Bodysuit Manufacturer",
      pdpDescription:
        "Running bodysuit with a loose outer short over a fitted inner short, a hidden zip pocket in the waistband and a shelf bra with removable pads, custom and private label, in a lightweight Polyester/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Double-Layer Short-Leg Bodysuit Manufacturer",
      pdpMetaDescription:
        "Custom double-layer short-leg bodysuit manufacturer, private label running build, 123 GSM, zip pocket, shelf bra, outer short, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Double-Layer Short-Leg Bodysuit" },
        { alt: "Custom Double-Layer Short-Leg Bodysuit" },
        { alt: "Custom Double-Layer Short-Leg Bodysuit" },
        { alt: "Custom Double-Layer Short-Leg Bodysuit" },
        { alt: "Custom Double-Layer Short-Leg Bodysuit" },
        { alt: "Custom Double-Layer Short-Leg Bodysuit" },
      ],
      material: "Lightweight Polyester/Spandex 4-way stretch knit, commonly around 87% / 13%",
      pdpFabricPills: ["Polyester/Spandex", "Recycled Polyester/Spandex", "Nylon/Spandex"],
      faqs: [
        {
          q: "How is the double-layer short-leg bodysuit built?",
          a: "The double-layer short-leg bodysuit joins a fitted inner short, around a 3 inch inseam, and a loose outer short, around a 2 inch inseam, to one body at the waist seam. Both inseams, the outer short's cut and the split at the hem are set to your spec and confirmed on your sample.",
        },
        {
          q: "What pockets can you put on the double-layer short-leg bodysuit?",
          a: "The double-layer short-leg bodysuit carries a hidden zipped pocket in the waistband and a pocket in the inner short as standard. Pocket size, placement and zip type can be changed to your brief, and every loaded pocket is checked on your sample.",
        },
        {
          q: "What fabric weight is the double-layer short-leg bodysuit built in?",
          a: "The double-layer short-leg bodysuit is built in a lightweight Polyester/Spandex knit at 123 GSM, commonly around 87% Polyester and 13% Spandex, for a running build that dries quickly. The final weight is confirmed on your sample.",
        },
        {
          q: "Can the double-layer short-leg bodysuit sit in a running line?",
          a: "Yes. The double-layer short-leg bodysuit is built for running programs, with reflective print available for low-light visibility, and it sits alongside the shorts, tops and layers in our Running Wear range.",
          link: { text: "Running Wear range", href: "/capriowear/activewear/running-wear" },
        },
      ],
      relatedStyleTags: [
        { label: "Custom Sleeveless Short-Leg Bodysuit", slug: "sleeveless-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Crossback Short-Leg Bodysuit", slug: "crossback-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Long-Sleeve Short-Leg Bodysuit", slug: "long-sleeve-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "Custom Corset-Detail Short-Leg Bodysuit", slug: "corset-detail-short-leg", href: "/capriowear/activewear/bodysuits" },
        { label: "See All", href: "/capriowear/activewear/bodysuits" },
      ],
      specifications: [
        { label: "Style", value: "Double-layer short-leg running bodysuit" },
        { label: "Fabric", value: "Lightweight Polyester/Spandex 4-way stretch knit, commonly around 87% / 13%, confirmed on your sample." },
        { label: "Weight", value: "123 GSM. Final weight confirmed on your sample." },
        { label: "Silhouette", value: "Fitted inner short around 3 inch inseam, loose outer short around 2 inch inseam, to your spec" },
        { label: "Straps and back", value: "Thin adjustable straps crossing into a back panel with a keyhole cutout" },
        { label: "Support", value: "Built-in shelf bra with removable pads" },
        { label: "Pockets", value: "Hidden zipped pocket in the waistband, pocket in the inner short" },
        { label: "Entry", value: "Step-in, pull-on, no crotch closure" },
        { label: "Construction", value: "Cut-and-sew, inner and outer short joined at the waist seam, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, reflective print, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Double-Layer Short-Leg Bodysuit" },
      pdpQualityHeading: "Built for the miles, checked before bulk",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Inner and outer short checked for leg-hem roll and ride-up at running stride",
        "Zipped waistband pocket tested open and closed with a loaded pocket",
        "Strap adjusters and crossover anchors stress-tested",
        "Shelf bra pad pockets checked for a secure, snag-free fit across the size run",
        "GSM held consistent, batch to batch",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
  ],
  // "You may also be interested in" (owner spec, 2026-09-24): exact list
  // and order, 5 links (sitewide max, 2026-09-23), all real built pages.
  relatedLinks: [
    { label: "Jumpsuits", href: "/capriowear/activewear/jumpsuits" },
    { label: "Leggings", href: "/capriowear/activewear/leggings" },
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
    { label: "Shorts", href: "/capriowear/activewear/shorts" },
    { label: "Running Wear", href: "/capriowear/activewear/running-wear" },
  ],
};
