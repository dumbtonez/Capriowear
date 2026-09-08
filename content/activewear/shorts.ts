// content/activewear/shorts.ts
// Third real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same as Sports Bras before it
// (owner spec, 2026-09-02): no edits to app/activewear/[category]/
// page.tsx, app/activewear/[category]/[style]/page.tsx, app/sitemap.ts,
// or lib/schema.ts, only this file plus one line in ./categories.ts.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule Leggings' and Sports Bras' own styleCards already follow.
import type { Category } from "./types";

export const shorts: Category = {
  slug: "shorts",
  group: "Activewear",
  menuLabel: "Shorts",
  // Entity FAQ overrides (owner spec, 2026-09-02) -- "shorts" is the same
  // word singular or plural, so `manufacturerNoun`/`productNounPlural`
  // aren't strictly required here the way Sports Bras' were (see that
  // category's own comment on this field, and categoryEntityFaq()'s own
  // comment in ./pdpShared.ts) -- set explicitly anyway, matching the
  // owner's own given field values exactly rather than relying on the
  // `menuLabel.toLowerCase()` fallback silently producing the same result.
  manufacturerNoun: "Shorts",
  productNounPlural: "shorts",
  entityExampleStyles: "biker, 2-in-1 lined, running, and training styles",
  entityFabrics: "nylon, polyester and recycled blends",
  h1: "Custom Shorts Manufacturer",
  // metaTitle: standard 2-segment form, same as every other category
  // (owner correction, 2026-09-02 -- the earlier 3-segment "...| Private
  // Label and OEM | Capriowear" was the only title on the site not
  // matching this pattern). "Private Label and OEM" stays in the meta
  // description below.
  metaTitle: "Custom Shorts Manufacturer",
  // Owner's exact given copy, 157 chars -- within Google's own ~155-160
  // char truncation point.
  metaDescription:
    "Custom activewear shorts manufacturer, 2-in-1 lined, high-waisted biker and mesh styles, low MOQ. Capriowear.",
  // CategoryBanner's own checkmark row -- same 4 facts, same wording, as
  // Leggings' and Sports Bras' own (sitewide standing copy, not
  // category-specific marketing).
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Real Women/Men split, same as Leggings and Sports Bras -- explicit,
  // though also the default (see this field's own comment in ./types.ts).
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  // Same "\n" + whitespace-pre-line line-break technique Leggings' and
  // Sports Bras' own fabricHeading already use -- identical H2 wording.
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon or polyester + spandex (74 to 85% / 15 to 26%)",
      bestFor: "Biker and compression shorts, 4-way stretch base",
      performance: "Soft hand, strong recovery, flatlock-seam compatible",
    },
    {
      fabric: "Polyester + spandex (80 to 92% / 8 to 20%)",
      bestFor: "Liner and brief fabric for 2-in-1 shorts, base-layer shorts",
      performance: "Snug, quick-dry, moisture-wicking, mesh option for ventilation",
    },
    {
      fabric: "Polyester woven shell (100%)",
      bestFor: "Running and split shorts outer layer, lightweight gym shorts",
      performance: "Quick-dry, packable, low-friction against skin",
    },
    {
      fabric: "Cotton-poly French terry or brushed fleece",
      bestFor: "Sweat and fleece shorts, lounge crossover",
      performance: "Soft, dense hand, warmth over performance",
    },
    {
      fabric: "Mesh (polyester or nylon)",
      bestFor: "Liner ventilation and side panels",
      performance: "Breathable, low-bulk",
    },
  ],
  fabricNote: [
    { text: "Compression knits run " },
    { text: "200 to 320 GSM", bold: true },
    { text: ". Woven shells are lighter; fleece and terry shorts run heavier, confirmed per style with the mill. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 5 fabrics above, in the same
  // order -- same "shortened, not derived" pattern Leggings' and Sports
  // Bras' own fabricPills already establish.
  fabricPills: ["Nylon spandex", "Polyester spandex liner", "Polyester woven shell", "French terry / fleece", "Mesh"],
  qualityHeading: "Fit that holds, seams that don't chafe",
  qualitySubline: "We confirm the liner, seams and recovery on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Flatlock seams tested, no rub at the inner thigh or liner",
    "Liner holds its retention and stretch after repeated washes",
    "Waistbands hold their recovery, no roll, no dig",
    "Opacity confirmed on compressive styles, squat-proof",
    "Consistent sizing across the bulk run, not just the sample",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Nylon, polyester, recycled and fleece knits, and woven shells" },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, DTF" },
    {
      title: "Fit and build",
      body: "Inseam length, liner (with or without, liner fabric), waistband, side splits, gusset, pockets, graded XS to 5XL (waist-inch available for men's)",
    },
    { title: "Branding", body: "Your logos by print, silicone, heat transfer or embroidery" },
    { title: "Labels", body: "Woven, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  // Same heading Leggings' and Sports Bras' own faqHeading already use --
  // confirmed intentional reuse, since every question below it is
  // genuinely shorts-specific. The entity question itself is NOT stored
  // here -- app/activewear/[category]/page.tsx builds it per category via
  // categoryEntityFaq() and prepends it at render time (see that
  // function's own comment in ./pdpShared.ts), so it can never drift out
  // of sync with what any style page under this category generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom shorts?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Which fabrics do you use for shorts?",
      a: "Nylon or polyester with spandex for compression and biker styles, a lighter polyester or mesh for liners, 100% polyester woven shells for running and gym shorts, and cotton-poly fleece for sweat shorts. Compression knits run 200 to 320 GSM.",
    },
    {
      q: "What is a 2-in-1 lined short?",
      a: "A 2-in-1 short pairs an outer short with a built-in compression brief liner, made for both men's and women's lines.",
    },
    {
      q: "What fabric goes into a high-waisted biker short?",
      a: "Both a biker short and a compression short are single-layer and compressive. A biker short is the high-waisted women's style, roughly 3 to 5 inch inseam, built in the same nylon or polyester spandex compression knit; a compression short is a snug base short worn alone or under looser shorts. We build both.",
    },
    {
      q: "What inseam lengths can you make?",
      a: "Roughly 2 to 3 inch for racing and compression, 3 to 5 inch for biker, 5 to 7 inch for general training, and 7 to 9 inch for a longer casual fit. Inseam is customizable per style.",
    },
    {
      q: "Can you add a liner, pockets, or a drawcord?",
      a: "Yes. A built-in brief liner, side or zip pockets, a hidden waistband pocket, and a drawcord are all made to your tech pack.",
    },
    {
      q: "Can you match a specific fabric or a reference short?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, color, print, inseam, liner, waistband, pockets, your logos, woven and care labels, hangtags and retail packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM and private label shorts?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "Is men's shorts sizing different from women's?",
      a: "Alpha XS to 5XL by default, and men's shorts can also be graded by waist inch, roughly 28 to 40.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, 20+ countries. DDP to the US, UK, EU, Canada and Australia, with GSP+ 0% EU duty.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch or a reference short by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // FinalCta's own h2/cta and the compliance bar's own items already match
  // content/home.ts's own shared finalCta/complianceTicker verbatim --
  // app/activewear/[category]/page.tsx reuses those directly, same as
  // Leggings and Sports Bras, so this file only supplies ctaSubline.
  // Owner spec, 2026-09-02: "on every PLP, our cta should have this
  // subline" -- the exact same closing-CTA subline is now used verbatim
  // on every category PLP (was its own per-category wording, e.g. "a
  // reference short, we'll develop it with you").
  ctaReferenceNoun: "pair of shorts",
  // Every style is "draft" (owner spec) -- a real name and one-line spec,
  // no PDP content yet: shows on the grid as a non-clickable tile (no
  // hover image swap either, since no `images` array is set -- see
  // ProductCardMedia.tsx's own contract, which only ever activates hover
  // once a real `images[1]` exists), no generated route, excluded from
  // the sitemap and this category's own ItemList schema. Flip to
  // "published" once a style's real PDP content (description, FAQs,
  // specifications, gallery) exists, same as Leggings' and Sports Bras'
  // own pilot styles.
  styleCards: [
    {
      status: "draft",
      slug: "high-waisted-biker",
      cardTitle: "Custom High-Waisted Biker Shorts",
      cardSubline: "Women's, 3 to 5 inch, compressive",
      image: "",
      imageAlt: "Custom high-waisted biker shorts manufacturer",
      href: "/activewear/shorts/high-waisted-biker",
    },
    {
      status: "draft",
      slug: "2-in-1-lined",
      cardTitle: "Custom 2-in-1 Lined Shorts",
      cardSubline: "Outer short with built-in brief liner",
      image: "",
      imageAlt: "Custom 2-in-1 lined shorts manufacturer",
      href: "/activewear/shorts/2-in-1-lined",
    },
    {
      status: "draft",
      slug: "running-split",
      cardTitle: "Custom Running Split Shorts",
      cardSubline: "Lightweight woven shell, side splits",
      image: "",
      imageAlt: "Custom running split shorts manufacturer",
      href: "/activewear/shorts/running-split",
    },
    {
      status: "draft",
      slug: "compression",
      cardTitle: "Custom Compression Shorts",
      cardSubline: "Snug single-layer base short",
      image: "",
      imageAlt: "Custom compression shorts manufacturer",
      href: "/activewear/shorts/compression",
    },
    {
      status: "draft",
      slug: "gym-training",
      cardTitle: "Custom Gym Training Shorts",
      cardSubline: "5 to 9 inch, looser training fit",
      image: "",
      imageAlt: "Custom gym training shorts manufacturer",
      href: "/activewear/shorts/gym-training",
    },
    {
      status: "draft",
      slug: "fleece",
      cardTitle: "Custom Fleece Shorts",
      cardSubline: "French terry or brushed fleece, drawcord",
      image: "",
      imageAlt: "Custom fleece shorts manufacturer",
      href: "/activewear/shorts/fleece",
    },
  ],
  // Sibling Bottoms-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern Leggings' and Sports Bras' own relatedLinks already
  // establish -- these become live the moment each one gets its own
  // content file.
  relatedLinks: [
    { label: "Leggings", href: "/activewear/leggings" },
    { label: "Joggers & Track Pants", href: "/activewear/joggers-track-pants" },
    { label: "Sports Bras", href: "/activewear/sports-bras" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
  ],
};
