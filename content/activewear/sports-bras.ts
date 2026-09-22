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
  // All 15 styles stay "draft" (owner spec) -- flip to "published" only
  // once sampled, photographed, and confirmed real, same rule every other
  // category's draft cards already follow. No `gender` field on any card
  // (women's-only category, nothing to filter). SKU 1 (CAP-SPB-01) through
  // SKU 9 (CAP-SPB-09) got full PDP content 2026-09-22 (owner spec) --
  // reachable by URL and a clickable PLP card via `isDraftPdpReachable()`,
  // still noindex/nofollow, out of the sitemap, no Product/FAQPage
  // JSON-LD. The other 6 cards are card-only, no PDP content.
  styleCards: [
    {
      // Full PDP content for SKU 1 (owner spec, 2026-09-22), draft.
      // Reachable by URL and a clickable PLP card via the sitewide
      // draft-PDP rule (`isDraftPdpReachable()`): still noindex/nofollow,
      // out of the sitemap, no Product/FAQPage JSON-LD. Do not flip
      // `status` to "published" until sampled and photographed. `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. Desktop CTA row is the shared,
      // hardcoded primary+secondary pair every PDP renders (ProductCtas,
      // home.nav.cta/secondaryCta) -- same as Leggings and every built
      // Shorts SKU, no per-style override exists or was added here.
      status: "draft",
      slug: "high-support-full-coverage",
      cardTitle: "Custom High-Support Sports Bra",
      cardSubline: "High support, full coverage, back hook-and-eye or wide racerback",
      image: "",
      imageAlt: "Custom high-support full-coverage sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/high-support-full-coverage",
      sku: "CAP-SPB-01",
      pdpTitle: "High Support",
      pdpHeading: "Custom High-Support Sports Bra Manufacturer",
      pdpDescription:
        "High-support, full-coverage sports bra, custom and private label, in a Polyester/Spandex blend, 87% / 13%, closed with a back hook-and-eye or wide pull-over racerback, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "High-support sports bra, front view" },
        { alt: "High-support sports bra, back closure detail" },
        { alt: "High-support sports bra, side profile" },
        { alt: "High-support sports bra, fabric close-up" },
        { alt: "High-support sports bra, worn on model" },
        { alt: "High-support sports bra, flat lay" },
      ],
      pdpMetaTitle: "Custom High-Support Sports Bra Manufacturer",
      pdpMetaDescription:
        "Custom high-support, full-coverage sports bra manufacturer, OEM, ODM and private label, back hook-and-eye or wide racerback, Polyester/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Polyester/Spandex, 87% / 13%",
      pdpFabricPills: ["Nylon/Spandex", "Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What fabric is the high-support sports bra made from?",
          a: "A Polyester/Spandex blend, 87% / 13%, matching the composition typical of comparable high-support builds from leading brands. We confirm the exact weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your medium-support sports bra?",
          a: "This is a high-support, full-coverage build with a wide compression band and a back hook-and-eye or wide racerback closure. Our medium-support sports bra uses a standard band and a simpler pull-over racerback or crossback closure, for lower-impact use.",
        },
      ],
      relatedStyleTags: [
        { label: "Medium-Support Sports Bra", slug: "medium-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Wide-Band Sports Bra", slug: "wide-band", href: "/capriowear/activewear/sports-bras" },
        { label: "Hook-and-Eye Sports Bra", slug: "hook-and-eye", href: "/capriowear/activewear/sports-bras" },
        { label: "Crossback Sports Bra", slug: "crossback", href: "/capriowear/activewear/sports-bras" },
        { label: "See All", href: "/capriowear/activewear/sports-bras" },
      ],
      specifications: [
        { label: "Style", value: "High support, full coverage sports bra (base type)" },
        { label: "Fabric", value: "Polyester/Spandex, 87% / 13%. Final composition confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Support and coverage", value: "High support, full coverage, not compression-only, not cutout or minimal" },
        { label: "Closure", value: "Back hook-and-eye, or wide pull-over racerback as an alternative" },
        { label: "Band", value: "Wide, structured compression band" },
        { label: "Padding", value: "Molded, fixed cups" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape; flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "High-support sports bra, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Band checked for recovery under repeated wear",
        "Back hook-and-eye closure checked for hold under movement",
        "Molded cups checked for consistent shape across the size run",
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
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 2 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1 above.
      status: "draft",
      slug: "medium-support-full-coverage",
      cardTitle: "Custom Medium-Support Sports Bra",
      cardSubline: "Medium support, full coverage, racerback or crossback",
      image: "",
      imageAlt: "Custom medium-support full-coverage sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/medium-support-full-coverage",
      sku: "CAP-SPB-02",
      pdpTitle: "Medium Support",
      pdpHeading: "Custom Medium-Support Sports Bra Manufacturer",
      pdpDescription:
        "Medium-support, full-coverage sports bra, custom and private label, in a recycled polyester blend, pull-over racerback closure, sewn-in fixed padding, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Medium-support sports bra, front view" },
        { alt: "Medium-support sports bra, back racerback detail" },
        { alt: "Medium-support sports bra, side profile" },
        { alt: "Medium-support sports bra, fabric close-up" },
        { alt: "Medium-support sports bra, worn on model" },
        { alt: "Medium-support sports bra, flat lay" },
      ],
      pdpMetaTitle: "Custom Medium-Support Sports Bra Manufacturer",
      pdpMetaDescription:
        "Custom medium-support, full-coverage sports bra manufacturer, OEM, ODM and private label, racerback or crossback, recycled polyester blend, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Recycled polyester blend",
      pdpFabricPills: ["Nylon/Spandex", "Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What fabric is the medium-support sports bra made from?",
          a: "A recycled polyester blend. We confirm the exact composition and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your high-support sports bra?",
          a: "This is a medium-support, full-coverage build with a standard band and a pull-over racerback closure, for everyday and moderate-impact training. Our high-support sports bra uses a wider compression band and a back hook-and-eye closure for higher-impact use.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Support Sports Bra", slug: "high-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Low-Support Sports Bra", slug: "low-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Racerback Sports Bra", slug: "racerback", href: "/capriowear/activewear/sports-bras" },
        { label: "Medium-Support Cutout Sports Bra", slug: "medium-support-cutout", href: "/capriowear/activewear/sports-bras" },
        { label: "See All", href: "/capriowear/activewear/sports-bras" },
      ],
      specifications: [
        { label: "Style", value: "Medium support, full coverage sports bra (base type)" },
        { label: "Fabric", value: "Recycled polyester blend, exact composition pending confirmation on sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Support and coverage", value: "Medium support, full coverage, not high-impact, not cutout" },
        { label: "Closure", value: "Pull-over racerback" },
        { label: "Band", value: "Standard band" },
        { label: "Padding", value: "Sewn-in, fixed" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape; flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Medium-support sports bra, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Band checked for recovery under repeated wear",
        "Racerback closure checked for hold under movement",
        "Sewn-in padding checked for consistent shape across the size run",
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
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 3 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1/2 above.
      status: "draft",
      slug: "low-support-full-coverage",
      cardTitle: "Custom Low-Support Sports Bra",
      cardSubline: "Low support, full coverage, everyday and low-impact wear",
      image: "",
      imageAlt: "Custom low-support full-coverage sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/low-support-full-coverage",
      sku: "CAP-SPB-03",
      pdpTitle: "Low Support",
      pdpHeading: "Custom Low-Support Sports Bra Manufacturer",
      pdpDescription:
        "Low-support, full-coverage sports bra, custom and private label, in a Polyester/Spandex blend, 80% / 20%, non-padded, single-lined construction, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Low-support sports bra, front view" },
        { alt: "Low-support sports bra, back view" },
        { alt: "Low-support sports bra, side profile" },
        { alt: "Low-support sports bra, fabric close-up" },
        { alt: "Low-support sports bra, worn on model" },
        { alt: "Low-support sports bra, flat lay" },
      ],
      pdpMetaTitle: "Custom Low-Support Sports Bra Manufacturer",
      pdpMetaDescription:
        "Custom low-support, full-coverage sports bra manufacturer, OEM, ODM and private label, everyday and low-impact wear, Polyester/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Polyester/Spandex, 80% / 20%",
      pdpFabricPills: ["Nylon/Spandex", "Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What fabric is the low-support sports bra made from?",
          a: "A Polyester/Spandex blend, 80% / 20%, matching the composition typical of comparable everyday-support bras from leading brands. We confirm the exact weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Is this bra padded?",
          a: "No. This is a non-padded, single-lined construction. If you want padding, our medium- and high-support sports bras use sewn-in or molded, fixed cups, and our construction-feature SKUs include a removable pad-pocket option that can be applied to most silhouettes.",
        },
      ],
      relatedStyleTags: [
        { label: "Medium-Support Sports Bra", slug: "medium-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Minimal-Coverage Sports Bra", slug: "minimal-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Low-Support Cutout Sports Bra", slug: "low-support-cutout", href: "/capriowear/activewear/sports-bras" },
        { label: "See All", href: "/capriowear/activewear/sports-bras" },
      ],
      specifications: [
        { label: "Style", value: "Low support, full coverage sports bra (base type)" },
        { label: "Fabric", value: "Polyester/Spandex, 80% / 20%. Final composition confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Support and coverage", value: "Low support, full coverage, everyday and low-impact wear" },
        { label: "Closure", value: "Pull-over" },
        { label: "Band", value: "Standard band" },
        { label: "Padding", value: "None, single-lined construction" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape; flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Low-support sports bra, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Band checked for recovery under repeated wear",
        "Lining checked for consistent opacity and coverage across the size run",
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
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 4 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1/2/3 above. No blend name in the Fabric row --
      // the locked reference doesn't disclose composition, none estimated.
      status: "draft",
      slug: "medium-support-cutout",
      cardTitle: "Custom Medium-Support Cutout Sports Bra",
      cardSubline: "Medium support, front or back cutout detail",
      image: "",
      imageAlt: "Custom medium-support cutout sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/medium-support-cutout",
      sku: "CAP-SPB-04",
      pdpTitle: "Medium Support Cutout",
      pdpHeading: "Custom Medium-Support Cutout Sports Bra Manufacturer",
      pdpDescription:
        "Medium-support sports bra with a front or back cutout detail, custom and private label, pull-over racerback closure, removable padding, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Medium-support cutout sports bra, front view" },
        { alt: "Medium-support cutout sports bra, cutout detail" },
        { alt: "Medium-support cutout sports bra, back view" },
        { alt: "Medium-support cutout sports bra, fabric close-up" },
        { alt: "Medium-support cutout sports bra, worn on model" },
        { alt: "Medium-support cutout sports bra, flat lay" },
      ],
      pdpMetaTitle: "Custom Medium-Support Cutout Sports Bra Manufacturer",
      pdpMetaDescription:
        "Custom medium-support sports bra manufacturer with a front or back cutout detail, OEM, ODM and private label, removable padding, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Nylon/Spandex", "Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What fabric is the medium-support cutout sports bra made from?",
          a: "We confirm the exact composition and weight on your sample, matched to your reference if you have one. Standard offering runs Nylon/Spandex or Polyester/Spandex blends.",
        },
        {
          q: "How is this different from your medium-support sports bra?",
          a: "This is a medium-support build with a front or back cutout detail and removable padding. Our plain medium-support sports bra uses full coverage with no cutout and sewn-in fixed padding.",
        },
      ],
      relatedStyleTags: [
        { label: "Medium-Support Sports Bra", slug: "medium-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Minimal-Coverage Sports Bra", slug: "minimal-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Low-Support Cutout Sports Bra", slug: "low-support-cutout", href: "/capriowear/activewear/sports-bras" },
        { label: "Removable-Pad Sports Bra", slug: "removable-padding", href: "/capriowear/activewear/sports-bras" },
        { label: "See All", href: "/capriowear/activewear/sports-bras" },
      ],
      specifications: [
        { label: "Style", value: "Medium support, cutout coverage sports bra (base type)" },
        { label: "Fabric", value: "Composition pending confirmation on sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Support and coverage", value: "Medium support, front or back cutout coverage, not full coverage or minimal" },
        { label: "Closure", value: "Pull-over racerback" },
        { label: "Band", value: "Standard band" },
        { label: "Padding", value: "Removable, foam insert" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape; flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Medium-support cutout sports bra, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Band checked for recovery under repeated wear",
        "Cutout edges checked for a clean, snag-free finish",
        "Removable pad pocket checked for a secure, snag-free fit",
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
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 5 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1 to 4 above. No blend name in the Fabric row --
      // the locked reference doesn't disclose composition, none estimated.
      status: "draft",
      slug: "minimal-coverage",
      cardTitle: "Custom Minimal-Coverage Sports Bra",
      cardSubline: "Low support, bralette-style minimal coverage",
      image: "",
      imageAlt: "Custom minimal-coverage sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/minimal-coverage",
      sku: "CAP-SPB-05",
      pdpTitle: "Minimal Coverage",
      pdpHeading: "Custom Minimal-Coverage Sports Bra Manufacturer",
      pdpDescription:
        "Low-support, minimal-coverage sports bra, bralette-style, custom and private label, single-strap silhouette, removable padding, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Minimal-coverage sports bra, front view" },
        { alt: "Minimal-coverage sports bra, strap detail" },
        { alt: "Minimal-coverage sports bra, back view" },
        { alt: "Minimal-coverage sports bra, fabric close-up" },
        { alt: "Minimal-coverage sports bra, worn on model" },
        { alt: "Minimal-coverage sports bra, flat lay" },
      ],
      pdpMetaTitle: "Custom Minimal-Coverage Sports Bra Manufacturer",
      pdpMetaDescription:
        "Custom minimal-coverage sports bra manufacturer, bralette-style, low-impact and layering wear, OEM, ODM and private label, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Nylon/Spandex", "Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What fabric is the minimal-coverage sports bra made from?",
          a: "We confirm the exact composition and weight on your sample, matched to your reference if you have one. Standard offering runs Nylon/Spandex or Polyester/Spandex blends.",
        },
        {
          q: "Is this style meant for high-impact training?",
          a: "No. This is a low-support, minimal-coverage build meant for low-impact use or layering. For higher-impact training, our medium- and high-support sports bras use a wider band and more structured closure.",
        },
      ],
      relatedStyleTags: [
        { label: "Low-Support Sports Bra", slug: "low-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Low-Support Cutout Sports Bra", slug: "low-support-cutout", href: "/capriowear/activewear/sports-bras" },
        { label: "Removable-Pad Sports Bra", slug: "removable-padding", href: "/capriowear/activewear/sports-bras" },
        { label: "See All", href: "/capriowear/activewear/sports-bras" },
      ],
      specifications: [
        { label: "Style", value: "Low support, minimal coverage sports bra (base type)" },
        { label: "Fabric", value: "Composition pending confirmation on sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Support and coverage", value: "Low support, minimal bralette-style coverage, for low-impact use or layering" },
        { label: "Closure", value: "Pull-over" },
        { label: "Band", value: "Narrow band" },
        { label: "Padding", value: "Removable, foam insert" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape; flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Minimal-coverage sports bra, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Band checked for recovery under repeated wear",
        "Removable pad pocket checked for a secure, snag-free fit",
        "Straps checked for hold under movement",
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
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 6 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1 to 5 above. No blend name in the Fabric row --
      // the locked reference doesn't disclose composition, none estimated.
      status: "draft",
      slug: "low-support-cutout",
      cardTitle: "Custom Low-Support Cutout Sports Bra",
      cardSubline: "Low support, cutout coverage between full and minimal",
      image: "",
      imageAlt: "Custom low-support cutout sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/low-support-cutout",
      sku: "CAP-SPB-06",
      pdpTitle: "Low Support Cutout",
      pdpHeading: "Custom Low-Support Cutout Sports Bra Manufacturer",
      pdpDescription:
        "Low-support sports bra with a V-neck cutout detail, custom and private label, adjustable straps, removable padding, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Low-support cutout sports bra, front view" },
        { alt: "Low-support cutout sports bra, V-neck cutout detail" },
        { alt: "Low-support cutout sports bra, back view" },
        { alt: "Low-support cutout sports bra, fabric close-up" },
        { alt: "Low-support cutout sports bra, worn on model" },
        { alt: "Low-support cutout sports bra, flat lay" },
      ],
      pdpMetaTitle: "Custom Low-Support Cutout Sports Bra Manufacturer",
      pdpMetaDescription:
        "Custom low-support sports bra manufacturer with a V-neck cutout detail, OEM, ODM and private label, adjustable straps, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Nylon/Spandex", "Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What fabric is the low-support cutout sports bra made from?",
          a: "We confirm the exact composition and weight on your sample, matched to your reference if you have one. Standard offering runs Nylon/Spandex or Polyester/Spandex blends.",
        },
        {
          q: "How is this different from your minimal-coverage sports bra?",
          a: "This is a low-support build with a defined V-neck cutout and standard band, offering more coverage than our bralette-style minimal-coverage sports bra, which uses a narrower band and single-strap silhouette.",
        },
      ],
      relatedStyleTags: [
        { label: "Low-Support Sports Bra", slug: "low-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Minimal-Coverage Sports Bra", slug: "minimal-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Medium-Support Cutout Sports Bra", slug: "medium-support-cutout", href: "/capriowear/activewear/sports-bras" },
        { label: "See All", href: "/capriowear/activewear/sports-bras" },
      ],
      specifications: [
        { label: "Style", value: "Low support, cutout coverage sports bra (base type)" },
        { label: "Fabric", value: "Composition pending confirmation on sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Support and coverage", value: "Low support, cutout coverage, between full coverage and minimal" },
        { label: "Closure", value: "Pull-over" },
        { label: "Band", value: "Standard band" },
        { label: "Padding", value: "Removable, foam insert" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape; flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Low-support cutout sports bra, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Band checked for recovery under repeated wear",
        "Cutout edges checked for a clean, snag-free finish",
        "Adjustable straps checked for hold under movement",
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
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 7 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1 to 6 above. No blend name in the Fabric row --
      // the locked reference doesn't disclose composition, none estimated.
      status: "draft",
      slug: "hook-and-eye",
      cardTitle: "Custom Hook-and-Eye Sports Bra",
      cardSubline: "Back hook-and-eye closure, most common on high-support builds",
      image: "",
      imageAlt: "Custom hook-and-eye sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/hook-and-eye",
      sku: "CAP-SPB-07",
      pdpTitle: "Hook-and-Eye",
      pdpHeading: "Custom Hook-and-Eye Sports Bra Manufacturer",
      pdpDescription:
        "High-support sports bra with a back hook-and-eye closure, custom and private label, wide compression band, molded padding, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Hook-and-eye sports bra, front view" },
        { alt: "Hook-and-eye sports bra, back closure detail" },
        { alt: "Hook-and-eye sports bra, side profile" },
        { alt: "Hook-and-eye sports bra, fabric close-up" },
        { alt: "Hook-and-eye sports bra, worn on model" },
        { alt: "Hook-and-eye sports bra, flat lay" },
      ],
      pdpMetaTitle: "Custom Hook-and-Eye Sports Bra Manufacturer",
      pdpMetaDescription:
        "Custom hook-and-eye sports bra manufacturer, back closure for high-support builds, OEM, ODM and private label, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Nylon/Spandex", "Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What fabric is the hook-and-eye sports bra made from?",
          a: "We confirm the exact composition and weight on your sample, matched to your reference if you have one. Standard offering runs Nylon/Spandex or Polyester/Spandex blends.",
        },
        {
          q: "Can the hook-and-eye closure be applied to other silhouettes?",
          a: "Yes. It's a construction feature we can apply to most support levels and coverages in the catalog, not only this base build, useful anywhere a pull-over band would limit adjustability.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Support Sports Bra", slug: "high-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Wide-Band Sports Bra", slug: "wide-band", href: "/capriowear/activewear/sports-bras" },
        { label: "Crossback Sports Bra", slug: "crossback", href: "/capriowear/activewear/sports-bras" },
        { label: "See All", href: "/capriowear/activewear/sports-bras" },
      ],
      specifications: [
        { label: "Style", value: "High support sports bra with back hook-and-eye closure (construction-feature base type)" },
        { label: "Fabric", value: "Composition pending confirmation on sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Support and coverage", value: "High support, full coverage" },
        { label: "Closure", value: "Back hook-and-eye" },
        { label: "Band", value: "Wide, structured compression band" },
        { label: "Padding", value: "Molded, fixed cups" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape; flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Hook-and-eye sports bra, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Band checked for recovery under repeated wear",
        "Hook-and-eye closure checked for hold under movement across the size run",
        "Molded cups checked for consistent shape",
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
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 8 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1 to 7 above. No blend name in the Fabric row --
      // the locked reference doesn't disclose composition, none estimated.
      // Note (owner): shares its locked reference product with SKU 9, but
      // is a distinct construction-feature SKU (padding, not straps) --
      // copy kept differentiated, not merged or treated as a duplicate.
      status: "draft",
      slug: "removable-padding",
      cardTitle: "Custom Removable-Pad Sports Bra",
      cardSubline: "Internal pad pocket, removable and adjustable padding",
      image: "",
      imageAlt: "Custom removable-pad sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/removable-padding",
      sku: "CAP-SPB-08",
      pdpTitle: "Removable Padding",
      pdpHeading: "Custom Removable-Pad Sports Bra Manufacturer",
      pdpDescription:
        "Medium-support sports bra with an internal removable pad pocket, custom and private label, crossback closure, standard band, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Removable-pad sports bra, front view" },
        { alt: "Removable-pad sports bra, pad pocket detail" },
        { alt: "Removable-pad sports bra, back crossback detail" },
        { alt: "Removable-pad sports bra, fabric close-up" },
        { alt: "Removable-pad sports bra, worn on model" },
        { alt: "Removable-pad sports bra, flat lay" },
      ],
      pdpMetaTitle: "Custom Removable-Pad Sports Bra Manufacturer",
      pdpMetaDescription:
        "Custom removable-pad sports bra manufacturer, internal pad pocket with adjustable foam insert, OEM, ODM and private label, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Nylon/Spandex", "Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What fabric is the removable-pad sports bra made from?",
          a: "We confirm the exact composition and weight on your sample, matched to your reference if you have one. Standard offering runs Nylon/Spandex or Polyester/Spandex blends.",
        },
        {
          q: "Can the removable-pad pocket be applied to other silhouettes?",
          a: "Yes. It's a construction feature we can apply to most support levels and coverages in the catalog, not only this base build, labeled Right/Left for a consistent fit.",
        },
      ],
      relatedStyleTags: [
        { label: "Medium-Support Sports Bra", slug: "medium-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Crossback Sports Bra", slug: "crossback", href: "/capriowear/activewear/sports-bras" },
        { label: "Medium-Support Cutout Sports Bra", slug: "medium-support-cutout", href: "/capriowear/activewear/sports-bras" },
        { label: "See All", href: "/capriowear/activewear/sports-bras" },
      ],
      specifications: [
        { label: "Style", value: "Medium support sports bra with removable pad pocket (construction-feature base type)" },
        { label: "Fabric", value: "Composition pending confirmation on sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Support and coverage", value: "Medium support, full coverage" },
        { label: "Closure", value: "Crossback" },
        { label: "Band", value: "Standard band" },
        { label: "Padding", value: "Removable, foam insert, labeled Right/Left" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape; flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Removable-pad sports bra, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Band checked for recovery under repeated wear",
        "Removable pad pocket checked for a secure, snag-free fit and correct Right/Left orientation",
        "Crossback closure checked for hold under movement",
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
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 9 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1 to 8 above. No blend name in the Fabric row --
      // the locked reference doesn't disclose composition, none estimated.
      // Note (owner): shares its locked reference product with SKU 8, but
      // is a distinct construction-feature SKU (straps, not padding) --
      // copy kept differentiated, not merged or treated as a duplicate.
      status: "draft",
      slug: "crossback",
      cardTitle: "Custom Crossback Sports Bra",
      cardSubline: "Crossed straps at the back, often with a keyhole cutout",
      image: "",
      imageAlt: "Custom crossback sports bra manufacturer",
      href: "/capriowear/activewear/sports-bras/crossback",
      sku: "CAP-SPB-09",
      pdpTitle: "Crossback",
      pdpHeading: "Custom Crossback Sports Bra Manufacturer",
      pdpDescription:
        "Medium-support sports bra with crossed straps and a keyhole cutout at the back, custom and private label, removable padding, standard band, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Crossback sports bra, front view" },
        { alt: "Crossback sports bra, back keyhole cutout detail" },
        { alt: "Crossback sports bra, side profile" },
        { alt: "Crossback sports bra, fabric close-up" },
        { alt: "Crossback sports bra, worn on model" },
        { alt: "Crossback sports bra, flat lay" },
      ],
      pdpMetaTitle: "Custom Crossback Sports Bra Manufacturer",
      pdpMetaDescription:
        "Custom crossback sports bra manufacturer, crossed straps with keyhole cutout, OEM, ODM and private label, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Nylon/Spandex", "Polyamide/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What fabric is the crossback sports bra made from?",
          a: "We confirm the exact composition and weight on your sample, matched to your reference if you have one. Standard offering runs Nylon/Spandex or Polyester/Spandex blends.",
        },
        {
          q: "How is a crossback different from a racerback?",
          a: "A crossback uses two straps that cross at the back, often with a keyhole cutout at the crossing point. A racerback uses a single fixed panel with no crossing straps. We offer both as separate construction options.",
        },
      ],
      relatedStyleTags: [
        { label: "Medium-Support Sports Bra", slug: "medium-support-full-coverage", href: "/capriowear/activewear/sports-bras" },
        { label: "Removable-Pad Sports Bra", slug: "removable-padding", href: "/capriowear/activewear/sports-bras" },
        { label: "Racerback Sports Bra", slug: "racerback", href: "/capriowear/activewear/sports-bras" },
        { label: "See All", href: "/capriowear/activewear/sports-bras" },
      ],
      specifications: [
        { label: "Style", value: "Medium support sports bra with crossback straps (construction-feature base type)" },
        { label: "Fabric", value: "Composition pending confirmation on sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Support and coverage", value: "Medium support, full coverage" },
        { label: "Closure", value: "Pull-over, crossed straps with keyhole cutout" },
        { label: "Band", value: "Standard band" },
        { label: "Padding", value: "Removable, foam insert" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape; flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Crossback sports bra, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Band checked for recovery under repeated wear",
        "Crossback straps and keyhole cutout checked for hold under movement",
        "Removable pad pocket checked for a secure, snag-free fit",
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
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
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
