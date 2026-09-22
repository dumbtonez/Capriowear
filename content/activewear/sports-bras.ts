// content/activewear/sports-bras.ts
// Rewritten to the owner's final, locked 15-SKU catalog and copy (owner
// spec, 2026-09-22) -- replaces the 2026-09-02 pilot's 9-card placeholder
// content entirely. Women's-only category, same as Leggings: no gender
// toggle, no `gender` field on any card. Every style stays "draft" (owner
// spec, explicit): each card shows on the grid, non-clickable, no PDP
// route generated, excluded from the sitemap and this category's own
// CollectionPage/ItemList schema, same rule every other category's draft
// cards already follow. The category keeps its plural name ("Sports
// Bras") everywhere except h1/metaTitle/metaDescription, which use the
// singular attributive form ("Sports Bra") to match the one confirmed
// keyword -- see `entityQuestion`/`entityAnswer` and `h1`/`metaTitle`
// below.
import type { Category } from "./types";

export const sportsBras: Category = {
  slug: "sports-bras",
  group: "Activewear",
  menuLabel: "Sports Bras",
  // Verbatim override pair (owner spec, 2026-09-22) -- bypasses
  // categoryEntityFaq()'s templated sentence entirely (see that
  // function's own comment in ./pdpShared.ts: this branch fires first
  // when both fields are set), since the owner's exact given wording,
  // including the closing Caprio Sports/Sialkot sentence, can't be
  // reproduced by the template's fixed clause shape.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom sports bra manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label sports bras from fabric to packaging, including high, medium, and low support, full coverage, cutout, and minimal or cage-back styles, in Nylon/Spandex, Polyester/Spandex, and recycled blends, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  // Singular attributive form ("Sports Bra"), matching the one confirmed
  // keyword -- the category itself stays plural everywhere else (menuLabel,
  // breadcrumb, URL slug, the listing heading below).
  h1: "Custom Sports Bra Manufacturer",
  // No "| Capriowear" suffix -- the root layout's own title template adds
  // it (see every other category's own metaTitle comment for why).
  metaTitle: "Custom Sports Bra Manufacturer",
  metaDescription:
    "Custom sports bra manufacturer, OEM, ODM and private label, high to low support, full coverage to cutout and cage-back, removable padding, wholesale sports bras from 50 pieces, any fabric and color, DDP worldwide.",
  // Owner correction, 2026-09-22: "remove the subline on the hero banner ...
  // banner should be same as leggings" -- no heroSubline set, same
  // 2-child (h1 + trustBullets) banner every other category renders, same
  // trust-bullet spacing as Leggings.
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  // The listing section heading is "Sports Bras" (menuLabel, rendered
  // separately by CategoryMetaStrip) + this subline.
  gridSubline: "every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Women's-only category (owner spec, 2026-09-22, same as Leggings): the
  // All/Women/Men chip row does not render at any breakpoint.
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon/Spandex or Polyamide/Spandex (70 to 91% / 9 to 30%)",
      bestFor: "Full-coverage, cutout, and everyday styles",
      performance: "Soft hand, 4-way stretch, strong recovery",
    },
    {
      fabric: "Polyester/Spandex (76 to 89% / 11 to 24%)",
      bestFor: "High-support, racerback, and crossback builds",
      performance: "Durable, quick-dry, moisture-wicking",
    },
    {
      fabric: "Recycled Polyester/Spandex",
      bestFor: "Sustainable lines",
      performance: "Eco-positioning, moisture management",
    },
  ],
  fabricNote: [
    {
      text: "No GSM or composition figure is stated here. Fabric weight is confirmed on your sample; where a locked reference states a composition percentage, it's on that SKU's own specification table, not here. Swatches before every bulk run, and we can source or match a ",
    },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  fabricPills: ["Nylon/Spandex or Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
  qualityHeading: "Support that holds, fit that lasts.",
  qualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
  qualityPoints: [
    "Seams reinforced and stress-tested",
    "Bands checked for recovery under repeated wear",
    "Removable pad pockets checked for a secure, snag-free fit",
    "Closures, hook-and-eye, crossback, and cage-back, checked for hold under movement",
    "Every run inspected to AQL 2.5",
    "Third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Nylon/Spandex, Polyamide/Spandex, Polyester/Spandex, and recycled polyester blends" },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, DTF" },
    { title: "Style and fit", body: "Support level, coverage, band width, strap style, graded XS to 5XL" },
    { title: "Branding", body: "Your logos by print, silicone, heat transfer, or embroidery" },
    { title: "Labels", body: "Woven, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Entity question ("What does Capriowear manufacture?") is NOT stored
  // here -- see entityQuestion/entityAnswer above; the route prepends it
  // at render time. The remaining 12 questions below.
  faqs: [
    {
      q: "What is your MOQ for custom sports bras?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Which fabrics do you use for sports bras?",
      a: "Nylon/Spandex or Polyamide/Spandex, and Polyester/Spandex, the blends used by leading brands, plus recycled polyester options, confirmed on your sample.",
    },
    {
      q: "What sports bra styles can you make?",
      a: "High, medium, and low support in full coverage, cutout, and minimal or cage-back coverage, plus construction options including back hook-and-eye closure, crossback and racerback straps, a wide compression band, and removable padding.",
    },
    {
      q: "Do you supply wholesale sports bras?",
      a: "Yes. Wholesale and private label sports bras from 50 pieces per style, scaling to full bulk for larger wholesale orders, with the same customization on every run regardless of order size.",
    },
    {
      q: "Can you build a removable-pad sports bra?",
      a: "Yes. An internal pad pocket with a removable foam insert, checked for a secure, snag-free fit on your sample before bulk.",
    },
    {
      q: "Can you match a specific fabric or a reference sports bra?",
      a: "Yes. Send a swatch, reference, or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, color, print, support level, coverage, band width, strap style, your logos, woven and care labels, hangtags, and retail packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM, and private label sports bras?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, 20+ countries, DDP.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch, or a reference sports bra through our contact form. We come back within 24 hours with next steps, including a quote and sample timeline.",
    },
  ],
  ctaReferenceNoun: "sports bra",
  // All 15 styles are "draft" (owner spec, explicit under Schema: "all 15
  // cards draft") -- each shows on the grid as a non-clickable "Coming
  // soon" tile, no generated route, excluded from the sitemap and this
  // category's own ItemList schema, same rule every other category's
  // draft cards already follow. No `gender` field on any card (women's-
  // only category, nothing to filter). No PDP content authored yet for
  // any card -- SKUs 1-3's "PDP built, mark clickable once live" note in
  // the brief is guidance for a later task once that real PDP content
  // exists, not something to invent now.
  styleCards: [
    {
      status: "draft",
      slug: "high-support-full-coverage",
      cardTitle: "Custom High-Support Sports Bra",
      cardSubline: "High support, full coverage, back hook-and-eye or wide racerback",
      image: "",
      imageAlt: "Custom high-support full-coverage sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/high-support-full-coverage",
      sku: "CAP-SPB-01",
    },
    {
      status: "draft",
      slug: "medium-support-full-coverage",
      cardTitle: "Custom Medium-Support Sports Bra",
      cardSubline: "Medium support, full coverage, racerback or crossback",
      image: "",
      imageAlt: "Custom medium-support full-coverage sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/medium-support-full-coverage",
      sku: "CAP-SPB-02",
    },
    {
      status: "draft",
      slug: "low-support-full-coverage",
      cardTitle: "Custom Low-Support Sports Bra",
      cardSubline: "Low support, full coverage, everyday and low-impact wear",
      image: "",
      imageAlt: "Custom low-support full-coverage sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/low-support-full-coverage",
      sku: "CAP-SPB-03",
    },
    {
      status: "draft",
      slug: "medium-support-cutout",
      cardTitle: "Custom Medium-Support Cutout Sports Bra",
      cardSubline: "Medium support, front or back cutout detail",
      image: "",
      imageAlt: "Custom medium-support cutout sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/medium-support-cutout",
    },
    {
      status: "draft",
      slug: "minimal-coverage",
      cardTitle: "Custom Minimal-Coverage Sports Bra",
      cardSubline: "Low support, bralette-style minimal coverage",
      image: "",
      imageAlt: "Custom minimal-coverage sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/minimal-coverage",
    },
    {
      status: "draft",
      slug: "low-support-cutout",
      cardTitle: "Custom Low-Support Cutout Sports Bra",
      cardSubline: "Low support, cutout coverage between full and minimal",
      image: "",
      imageAlt: "Custom low-support cutout sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/low-support-cutout",
    },
    {
      status: "draft",
      slug: "hook-and-eye",
      cardTitle: "Custom Hook-and-Eye Sports Bra",
      cardSubline: "Back hook-and-eye closure, most common on high-support builds",
      image: "",
      imageAlt: "Custom hook-and-eye sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/hook-and-eye",
    },
    {
      status: "draft",
      slug: "removable-padding",
      cardTitle: "Custom Removable-Pad Sports Bra",
      cardSubline: "Internal pad pocket, removable and adjustable padding",
      image: "",
      imageAlt: "Custom removable-pad sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/removable-padding",
    },
    {
      status: "draft",
      slug: "crossback",
      cardTitle: "Custom Crossback Sports Bra",
      cardSubline: "Crossed straps at the back, often with a keyhole cutout",
      image: "",
      imageAlt: "Custom crossback sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/crossback",
    },
    {
      status: "draft",
      slug: "wide-band",
      cardTitle: "Custom Wide-Band Sports Bra",
      cardSubline: "Wide structured compression band, most common on high-support builds",
      image: "",
      imageAlt: "Custom wide-band sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/wide-band",
    },
    {
      status: "draft",
      slug: "cage-back",
      cardTitle: "Custom Cage-Back Sports Bra",
      cardSubline: "Multi-strap cage or crisscross back detail",
      image: "",
      imageAlt: "Custom cage-back sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/cage-back",
    },
    {
      status: "draft",
      slug: "racerback",
      cardTitle: "Custom Racerback Sports Bra",
      cardSubline: "Fixed wide racerback panel",
      image: "",
      imageAlt: "Custom racerback sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/racerback",
    },
    {
      status: "draft",
      slug: "plunge-convertible",
      cardTitle: "Custom Plunge Convertible Sports Bra",
      cardSubline: "Deep plunge front, medium support, convertible straps",
      image: "",
      imageAlt: "Custom plunge convertible sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/plunge-convertible",
    },
    {
      status: "draft",
      slug: "high-support-cutout",
      cardTitle: "Custom High-Support Cutout Sports Bra",
      cardSubline: "High support paired with a front cutout detail",
      image: "",
      imageAlt: "Custom high-support cutout sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/high-support-cutout",
    },
    {
      status: "draft",
      slug: "twist-front",
      cardTitle: "Custom Twist-Front Sports Bra",
      cardSubline: "Twist or knot detail at the front bust, medium support",
      image: "",
      imageAlt: "Custom twist-front sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/twist-front",
    },
  ],
  relatedLinks: [
    { label: "Leggings", href: "/capriowear/activewear/leggings" },
    { label: "Tank Tops", href: "/capriowear/activewear/tank-tops" },
    { label: "T-Shirts", href: "/capriowear/activewear/t-shirts" },
    { label: "Yoga Sets", href: "/capriowear/activewear/yoga-sets" },
  ],
};
