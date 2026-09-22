// content/activewear/shorts.ts
// Third real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same as Sports Bras before it
// (owner spec, 2026-09-02): no edits to app/activewear/[category]/
// page.tsx, app/activewear/[category]/[style]/page.tsx, app/sitemap.ts,
// or lib/schema.ts, only this file plus one line in ./categories.ts.
//
// Full PLP content replacement, 2026-09-22 (owner spec): a real 14-SKU,
// dual-gender catalog (7 men's, 7 women's) replaces the earlier 6-style
// test build. Every style stays "draft" for now: each card shows on the
// grid, non-clickable, no PDP route generated (app/activewear/[category]/
// [style]/page.tsx's own generateStaticParams filters to "published" only,
// plus dynamicParams = false), excluded from app/sitemap.ts and this
// category's own CollectionPage/ItemList schema. Only SKU 1 (Custom
// Athletic Shorts, CAP-SHO-01) has real PDP content ready to wire up, in a
// later pass -- its card stays non-clickable ("draft") in this pass too,
// same rule Leggings' and Sports Bras' own styleCards already follow.
//
// The gender chip row (All/Women/Men) now actually filters the grid
// (owner spec, 2026-09-22) via each card's own `gender` field -- see
// StyleCard.gender's own comment in ./types.ts and ActivewearListing.tsx.
import type { Category } from "./types";

export const shorts: Category = {
  slug: "shorts",
  group: "Activewear",
  menuLabel: "Shorts",
  manufacturerNoun: "Shorts",
  productNounPlural: "shorts",
  entityExampleStyles: "athletic, fitted, relaxed, baggy, and high-rise and mid-rise biker styles",
  entityFabrics: "Polyester/Spandex, Nylon/Spandex, and recycled blends",
  // Owner's exact given entity Q&A (owner spec, 2026-09-22) -- overrides
  // categoryEntityFaq()'s own templated fallback sentence entirely (see
  // that function's own comment in ./pdpShared.ts: "bypasses" once both
  // entityQuestion and entityAnswer are set), so this renders verbatim as
  // the FAQ's first entry rather than the manufacturerNoun/
  // productNounPlural/entityExampleStyles/entityFabrics fields above being
  // assembled into a sentence. Those fields are still set above for
  // consistency with every other category file, even though they're
  // unused while this override is in place.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom shorts manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label shorts from fabric to packaging, including athletic, fitted, relaxed, baggy, high-rise and mid-rise biker, and 2-in-1 lined styles for men and women, in Polyester/Spandex, Nylon/Spandex, and recycled blends, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  h1: "Custom Shorts Manufacturer",
  metaTitle: "Custom Shorts Manufacturer",
  metaDescription:
    "Custom shorts manufacturer, OEM, ODM and private label, athletic to relaxed to baggy, 2-in-1 lined and zip-pocket builds, from 50 pieces, any fabric and color, DDP worldwide.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester/Spandex (cut-and-sew jersey knit or lightweight woven)",
      bestFor: "Training, running, athletic-regular styles",
      performance: "Quick-dry, moisture-wicking, 4-way stretch",
    },
    {
      fabric: "Nylon/Spandex",
      bestFor: "Compression and fitted biker styles",
      performance: "Soft hand, 4-way stretch, strong recovery",
    },
    {
      fabric: "Recycled Polyester",
      bestFor: "Sustainable lines",
      performance: "Eco-positioning, moisture management",
    },
    {
      fabric: "Cotton fleece (cotton or cotton/poly blend)",
      bestFor: "Relaxed, baggy, and sweatshort styles",
      performance: "Soft hand, warmth, brushed finish",
    },
  ],
  // Owner's exact given sentence (owner spec, 2026-09-22): no GSM or
  // composition figure at this category/fabric-table level, unlike the
  // earlier test copy's own "200 to 320 GSM" line -- only per-SKU, once a
  // style's real PDP content exists.
  fabricNote: [
    {
      text: "Fabric weight is set by Capriowear's own engineering and confirmed on your sample, not estimated or copied from competitor data. Swatches before every bulk run, and we can source or match a specific fabric from your reference.",
    },
  ],
  fabricPills: ["Polyester spandex", "Nylon spandex", "Recycled polyester", "Cotton fleece"],
  qualityHeading: "Fit that holds, seams that don't chafe",
  qualitySubline: "We confirm it all on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Seams reinforced and stress-tested",
    "Drawcords, eyelets, and zip pockets checked for secure anchoring",
    "Waistbands hold their recovery",
    "Liner and shell layers checked for consistent fit on 2-in-1 builds",
    "Every run inspected to AQL 2.5",
    "Third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOM FROM FABRIC TO PACKAGING",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Polyester/Spandex, Nylon/Spandex, recycled polyester, and cotton fleece blends" },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, DTF" },
    {
      title: "Style and fit",
      body: "Inseam length, rise, fit, waistband and closure, graded XS to 5XL (plus waist-inch sizing for men's)",
    },
    { title: "Branding", body: "Your logos by print, silicone, heat transfer, or embroidery" },
    { title: "Labels", body: "Woven, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom shorts?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Which fabrics do you use for shorts?",
      a: "Polyester/Spandex or Nylon/Spandex cut-and-sew knits and wovens, recycled polyester, and cotton fleece blends, confirmed on your sample.",
    },
    {
      q: "What shorts styles can you make?",
      a: "Athletic-regular, fitted, relaxed, and baggy fits at multiple inseam lengths for men, and high-rise and mid-rise fitted biker and relaxed styles for women, plus 2-in-1 shell-and-liner builds and a zip-pocket construction option.",
    },
    {
      q: "Can you build a 2-in-1 shell-and-liner short?",
      a: "Yes. A looser outer shell over a built-in fitted liner, confirmed for fit and layer alignment on your sample before bulk.",
    },
    {
      q: "Can you add a secure zip pocket?",
      a: "Yes. A discreet zip pocket at the waistband or outer thigh, layered onto any silhouette in the catalog.",
    },
    {
      q: "Can you match a specific fabric or a reference short?",
      a: "Yes. Send a swatch, reference, or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, color, print, inseam length, rise, fit, waistband and closure, your logos, woven and care labels, hangtags, and retail packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM, and private label shorts?",
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
      a: "Send your tech pack, sketch, or a reference short through our contact form. We come back within 24 hours with next steps, including a quote and sample timeline.",
    },
  ],
  ctaReferenceNoun: "pair of shorts",
  // 14 styles, 7 men's (CAP-SHO-01 to 07) then 7 women's (CAP-SHO-08 to
  // 14), every one "draft" (owner spec, 2026-09-22): real name, one-line
  // spec, and a `gender` tag for the chip-row filter, no PDP content yet.
  // Shows on the grid as a non-clickable tile (no hover image swap either,
  // since no `images` array is set -- see ProductCardMedia.tsx's own
  // contract), no generated route, excluded from the sitemap and this
  // category's own ItemList schema. SKU 1 additionally carries its real
  // `sku` code ahead of its own PDP content hand-off in a later pass, but
  // stays "draft" (non-clickable) in this pass -- do not flip it, and do
  // not invent PDP-only fields (pdpTitle, pdpDescription, gallery, etc.)
  // for it or any other card here.
  styleCards: [
    {
      status: "draft",
      slug: "athletic-regular",
      sku: "CAP-SHO-01",
      cardTitle: "Custom Athletic Shorts",
      cardSubline: "Standard athletic fit, 5 to 7 inch inseam, drawcord waistband",
      gender: "Men",
      image: "",
      imageAlt: "Custom athletic shorts manufacturer",
      href: "/capriowear/activewear/shorts/athletic-regular",
    },
    {
      status: "draft",
      slug: "fitted-training",
      cardTitle: "Custom Fitted Training Shorts",
      cardSubline: "Closer training fit, 5 to 7 inch inseam",
      gender: "Men",
      image: "",
      imageAlt: "Custom fitted training shorts manufacturer",
      href: "/capriowear/activewear/shorts/fitted-training",
    },
    {
      status: "draft",
      slug: "relaxed-mid",
      cardTitle: "Custom Relaxed Shorts",
      cardSubline: "Roomier relaxed cut, 5 to 7 inch inseam",
      gender: "Men",
      image: "",
      imageAlt: "Custom relaxed shorts manufacturer",
      href: "/capriowear/activewear/shorts/relaxed-mid",
    },
    {
      status: "draft",
      slug: "baggy",
      cardTitle: "Custom Baggy Shorts",
      cardSubline: "Below-knee, wide-leg streetwear silhouette",
      gender: "Men",
      image: "",
      imageAlt: "Custom baggy shorts manufacturer",
      href: "/capriowear/activewear/shorts/baggy",
    },
    {
      status: "draft",
      slug: "2-in-1",
      cardTitle: "Custom 2-in-1 Shorts",
      cardSubline: "Outer shell over a built-in fitted liner, mid-length inseam",
      gender: "Men",
      image: "",
      imageAlt: "Custom 2-in-1 shorts manufacturer",
      href: "/capriowear/activewear/shorts/2-in-1",
    },
    {
      status: "draft",
      slug: "relaxed-long",
      cardTitle: "Custom Relaxed Long Shorts",
      cardSubline: "Roomier relaxed cut, 8 inch or below-knee",
      gender: "Men",
      image: "",
      imageAlt: "Custom relaxed long shorts manufacturer",
      href: "/capriowear/activewear/shorts/relaxed-long",
    },
    {
      status: "draft",
      slug: "fitted-long",
      cardTitle: "Custom Fitted Long Shorts",
      cardSubline: "Fitted baselayer cut, 8 inch or below-knee",
      gender: "Men",
      image: "",
      imageAlt: "Custom fitted long shorts manufacturer",
      href: "/capriowear/activewear/shorts/fitted-long",
    },
    {
      status: "draft",
      slug: "high-rise-biker",
      cardTitle: "Custom High-Rise Biker Shorts",
      cardSubline: "High-rise, fitted bike-short, 5 to 7 inch inseam",
      gender: "Women",
      image: "",
      imageAlt: "Custom high-rise biker shorts manufacturer",
      href: "/capriowear/activewear/shorts/high-rise-biker",
    },
    {
      status: "draft",
      slug: "mid-rise-biker",
      cardTitle: "Custom Mid-Rise Biker Shorts",
      cardSubline: "Mid-rise, fitted bike-short, 5 to 7 inch inseam",
      gender: "Women",
      image: "",
      imageAlt: "Custom mid-rise biker shorts manufacturer",
      href: "/capriowear/activewear/shorts/mid-rise-biker",
    },
    {
      status: "draft",
      slug: "high-rise-short",
      cardTitle: "Custom High-Rise Short Shorts",
      cardSubline: "High-rise, fitted, 4 inch or under",
      gender: "Women",
      image: "",
      imageAlt: "Custom high-rise short shorts manufacturer",
      href: "/capriowear/activewear/shorts/high-rise-short",
    },
    {
      status: "draft",
      slug: "zip-pocket",
      cardTitle: "Custom Zip-Pocket Shorts",
      cardSubline: "Discreet zip pocket, layered onto any silhouette",
      gender: "Women",
      image: "",
      imageAlt: "Custom zip-pocket shorts manufacturer",
      href: "/capriowear/activewear/shorts/zip-pocket",
    },
    {
      status: "draft",
      slug: "mid-rise-relaxed",
      cardTitle: "Custom Mid-Rise Relaxed Shorts",
      cardSubline: "Roomy, relaxed mid-rise cut",
      gender: "Women",
      image: "",
      imageAlt: "Custom mid-rise relaxed shorts manufacturer",
      href: "/capriowear/activewear/shorts/mid-rise-relaxed",
    },
    {
      status: "draft",
      slug: "mid-rise-short",
      cardTitle: "Custom Mid-Rise Short Shorts",
      cardSubline: "Short, fitted mid-rise cut, 4 inch or under",
      gender: "Women",
      image: "",
      imageAlt: "Custom mid-rise short shorts manufacturer",
      href: "/capriowear/activewear/shorts/mid-rise-short",
    },
    {
      status: "draft",
      slug: "relaxed-short",
      cardTitle: "Custom Mid-Rise Sweat Shorts",
      cardSubline: "Relaxed sweatshort, short inseam",
      gender: "Women",
      image: "",
      imageAlt: "Custom mid-rise sweat shorts manufacturer",
      href: "/capriowear/activewear/shorts/relaxed-short",
    },
  ],
  relatedLinks: [
    { label: "Leggings", href: "/capriowear/activewear/leggings" },
    { label: "Joggers & Track Pants", href: "/capriowear/activewear/joggers" },
    { label: "Compression & Base Layers", href: "/capriowear/activewear/compression-base-layers" },
  ],
};
