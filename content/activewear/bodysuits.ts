// content/activewear/bodysuits.ts
// Rewritten to the owner's final, locked 9-SKU catalog and copy (owner
// spec, 2026-09-24) -- replaces the 2026-09-03 test version entirely,
// including its two test PDPs (tank, long-sleeve), which are removed so
// both routes 404 until SKU 1 and SKU 5 ship real PDPs under those same
// slugs. Women's-only category, same as Leggings and Sports Bras: no
// gender toggle, no `gender` field on any card.
//
// Every card is a card-only "draft" (name, spec line, no PDP content), so
// each renders non-clickable, gets no route, and stays out of the sitemap
// and CollectionPage/ItemList. A card becomes a link automatically the
// moment its PDP content (`pdpHeading` + `specifications`) is added, via
// the sitewide `isDraftPdpReachable()` rule, same as Hoodies. Grid order
// is SKU-number order, 1 to 9.
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
    "Custom athletic bodysuit manufacturer: private label tank, long-sleeve and short-leg bodysuits in Nylon/Spandex knits, MOQ from 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Women's-only category: the All/Women/Men chip row does not render.
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon/Spandex (75 to 78% / 22 to 25%)",
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
    "Snap, hook, and zip closures cycled open and closed before bulk",
    "Gusset seam tested under stretch, the highest-stress point on a one-piece",
    "Torso length graded and checked across every size, not just the sample",
    "Opacity confirmed under real stretch and movement, not only at rest",
    "Shelf bra pads sit true, and support holds through wear and wash",
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
      body: "Snap-button gusset, sewn gusset, hook-and-snap, or front zip, built-in shelf bra with removable pads or no support",
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
      a: "A short-leg bodysuit is a one-piece with a built-in bike-short leg of a few inches instead of a hip-ending brief cut. It removes the gap and waistband ride-up between a separate top and shorts, and it gives a training line a one-piece that works as a standalone piece, not only as a base layer.",
    },
    {
      q: "What closure options do you offer on bodysuits?",
      a: "Closure is set per style: a snap-button gusset for easy on and off, a fully sewn gusset for simpler builds, a hook-and-snap combination, or a front zip. Every closure is cycled open and closed on your sample before bulk.",
    },
    {
      q: "Can you build a shelf bra into a bodysuit?",
      a: "Yes. A shelf bra with removable pads and adjustable straps can be built in, from medium to high support, or the bodysuit can be left plain to wear with a separate sports bra.",
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
      q: "What can I customize?",
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
  // 9 card-only drafts, SKU-number order (see header comment). Alt text is
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
    },
    {
      status: "draft",
      slug: "crossback-short-leg",
      cardTitle: "Custom Crossback Short-Leg Bodysuit",
      cardSubline: "Crossover straps, built-in shelf bra, removable cups",
      image: "",
      imageAlt: "Custom Crossback Short-Leg Bodysuit",
      href: "/capriowear/activewear/bodysuits/crossback-short-leg",
      sku: "CAP-BOD-07",
    },
    {
      status: "draft",
      slug: "ribbed",
      cardTitle: "Custom Ribbed Bodysuit",
      cardSubline: "Ribbed knit, square neck, snap closure",
      image: "",
      imageAlt: "Custom Ribbed Bodysuit",
      href: "/capriowear/activewear/bodysuits/ribbed",
      sku: "CAP-BOD-08",
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
    },
  ],
  // "You may also be interested in" (owner spec, 2026-09-24): exact list
  // and order, 6 links, all real built pages.
  relatedLinks: [
    { label: "Jumpsuits", href: "/capriowear/activewear/jumpsuits" },
    { label: "Leggings", href: "/capriowear/activewear/leggings" },
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
    { label: "Shorts", href: "/capriowear/activewear/shorts" },
    { label: "Running Wear", href: "/capriowear/activewear/running-wear" },
    { label: "Compression & Base Layers", href: "/capriowear/activewear/compression-base-layers" },
  ],
};
