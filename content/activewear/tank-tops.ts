// content/activewear/tank-tops.ts
// Fifth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every prior
// category (owner spec, 2026-09-02): no edits to app/activewear/
// [category]/page.tsx, app/activewear/[category]/[style]/page.tsx,
// app/sitemap.ts, or lib/schema.ts, only this file plus one line in
// ./categories.ts.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow. No
// `weightTiers` here (see FabricOptions.tsx's own comment) -- this
// category's own fabricNote covers its tank-specific GSM ranges as prose
// instead, since (unlike T-Shirts) there's no clean, single set of named
// weight tiers spanning the whole fabric range, just two per-construction
// GSM callouts folded into the note the owner's own copy already gives.
import type { Category } from "./types";

export const tankTops: Category = {
  slug: "tank-tops",
  group: "Activewear",
  menuLabel: "Tank Tops",
  // Entity FAQ overrides (owner spec, 2026-09-02) -- "Tank Top" (singular)
  // reads correctly in "a custom Tank Top manufacturer", "tank tops"
  // (plural) in "private label tank tops" -- see categoryEntityFaq()'s
  // own comment in ./pdpShared.ts.
  manufacturerNoun: "Tank Top",
  productNounPlural: "tank tops",
  entityExampleStyles: "racerback, stringer, muscle, and cropped styles",
  entityFabrics: "combed cotton, cotton-poly blends and performance polyester",
  h1: "Custom Tank Top Manufacturer",
  // metaTitle: owner's own given title is already the short 2-segment
  // form -- 41 rendered chars, comfortably under the ~60 char target, no
  // deviation needed.
  metaTitle: "Custom Tank Top Manufacturer",
  // Owner's exact given copy, 157 chars -- within Google's own ~155-160
  // char truncation point.
  metaDescription:
    "Custom tank top manufacturer, private label muscle tanks, stringers and racerback, built-in shelf bra, low MOQ. Capriowear.",
  // CategoryBanner's own checkmark row -- same 4 facts, same wording, as
  // every prior category's own.
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 40+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Real Women/Men split, same as every prior category -- explicit,
  // though also the default (see this field's own comment in ./types.ts).
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  // Same "\n" + whitespace-pre-line line-break technique every prior
  // category's own fabricHeading already uses -- identical H2 wording.
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Combed ring-spun cotton",
      bestFor: "Cotton and streetwear tanks, DTG and screen print",
      performance: "Soft hand, breathable, preshrunk to control shrink",
    },
    {
      fabric: "Cotton-poly blend (50/50, CVC)",
      bestFor: "Team and everyday basics",
      performance: "Less shrink, holds shape, durable",
    },
    {
      fabric: "Cotton-spandex or moisture-wicking poly blend",
      bestFor: "Racerback activewear tanks",
      performance: "4-way stretch, wicks moisture, holds fit (180 to 220 GSM)",
    },
    {
      fabric: "Polyester + spandex (90/10)",
      bestFor: "Stringer and training tanks",
      performance: "Snug knit, quick-dry, stretch (160 to 190 GSM)",
    },
    {
      fabric: "Tri-blend with spandex (88% poly / 9% rayon / 3% spandex)",
      bestFor: "Premium stringers and fitted tanks",
      performance: "Soft vintage hand with added stretch",
    },
    {
      fabric: "Ribbed cotton or blend knit",
      bestFor: "Fitted lifestyle tanks, layering",
      performance: "Rib texture and stretch, tested for recovery and opacity",
    },
    {
      fabric: "100% performance polyester",
      bestFor: "Athletic tanks, sublimation",
      performance: "Moisture-wicking, quick-dry, best for sublimation",
    },
  ],
  fabricNote: [
    { text: "Weights follow our t-shirt tiers (" },
    { text: "100 to 280+ GSM", bold: true },
    { text: "); tank-specific confirmed ranges are racerback " },
    { text: "180 to 220 GSM", bold: true },
    { text: " and stringer " },
    { text: "160 to 190 GSM", bold: true },
    { text: ". Burnout (semi-sheer) and acid-wash heavy cotton available as finishes. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 7 fabrics above, in the same
  // order -- same "shortened, not derived" pattern every prior category's
  // own fabricPills already establishes.
  fabricPills: [
    "Combed cotton",
    "Cotton-poly blend",
    "Cotton-spandex / moisture-wicking",
    "Poly-spandex",
    "Tri-blend spandex",
    "Ribbed knit",
    "Performance polyester",
  ],
  qualityHeading: "The cut you approve, at every size",
  qualitySubline: "We confirm armhole, strap and fabric recovery on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Armhole depth and strap width held proportional across the full size range",
    "Rib and stretch knits tested for recovery, no bagging",
    "Shrinkage and opacity tested after wash",
    "Rib-knit checked for twisting, so it sits straight, not spiraled",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Combed cotton, cotton-poly, tri-blend, ribbed, and performance polyester" },
    {
      title: "Cut and construction",
      body: "Armhole depth (standard, muscle, stringer), strap width, racerback (Y-back) or straight back, hem (straight, curved, raw)",
    },
    {
      title: "Fit and length",
      body: "Standard, cropped, oversized or longline, graded XS to 5XL, optional built-in shelf-bra or padding",
    },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, sublimation, screen, DTF, embroidery, front chest and lower back zones",
    },
    { title: "Labels", body: "Woven, printed or tear-away, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  // Same heading every prior category's own faqHeading already uses --
  // confirmed intentional reuse, since every question below it is
  // genuinely tank-top-specific. The entity question itself is NOT stored
  // here -- app/activewear/[category]/page.tsx builds it per category via
  // categoryEntityFaq() and prepends it at render time (see that
  // function's own comment in ./pdpShared.ts), so it can never drift out
  // of sync with what any style page under this category generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom tank tops?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a muscle tank, a stringer, and a racerback?",
      a: "It is mainly the armhole and back. A standard tank has a moderate armhole. A muscle tank has a wider, dropped armhole. A stringer has the deepest cut armhole with ultra-narrow straps and a Y-back. Racerback describes the back (straps converging between the shoulder blades) and can be paired with different armhole depths. We build all of these to your spec.",
    },
    {
      q: "What GSM weight do performance tanks use?",
      a: "Combed cotton and cotton-poly blends for basics, cotton-spandex or moisture-wicking poly for racerback activewear tanks (180 to 220 GSM), poly-spandex for stringers (160 to 190 GSM), plus tri-blend, ribbed and 100% performance polyester.",
    },
    {
      q: "Can you customize the armhole depth and strap width to a reference tank?",
      a: "Yes. Send a reference or tech pack and we match the armhole depth, strap width, and back construction, then confirm on your sample.",
    },
    {
      q: "Do you offer a built-in shelf-bra or padded tank?",
      a: "Yes. A sewn-in shelf-bra or sewn-in or removable pads can be built into the tank, a women's-specific construction. We build sewn-in support, not seamless bra-tanks.",
    },
    {
      q: "Do your ribbed tanks hold their shape?",
      a: "Yes. We test rib-knit for stretch recovery, shrinkage, opacity, and twisting before bulk, so it returns to shape and sits straight.",
    },
    {
      q: "Can you match a specific fabric or a reference tank?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, armhole and strap, back construction, length, hem, built-in support, color, print and embroidery, your logos, labels, hangtags and packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM and private label tank tops?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are tank tops sized?",
      a: "Alpha XS to 5XL, with armhole depth, strap width and body length graded proportionally at every size.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, 40+ countries. DDP to the US, UK, EU, Canada and Australia, with GSP+ 0% EU duty.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch or a reference tank by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // FinalCta's own h2/cta and the compliance bar's own items already match
  // content/home.ts's own shared finalCta/complianceTicker verbatim --
  // app/activewear/[category]/page.tsx reuses those directly, same as
  // every prior category, so this file only supplies ctaSubline.
  // Owner spec, 2026-09-02: "on every PLP, our cta should have this
  // subline" -- the exact same closing-CTA subline is now used verbatim
  // on every category PLP (was its own per-category wording, e.g. "a
  // reference tank, we'll develop it with you").
  ctaReferenceNoun: "tank",
  // Every style is "draft" (owner spec) -- a real name and one-line spec,
  // no PDP content yet: shows on the grid as a non-clickable tile (no
  // hover image swap either, since no `images` array is set -- see
  // ProductCardMedia.tsx's own contract, which only ever activates hover
  // once a real `images[1]` exists), no generated route, excluded from
  // the sitemap and this category's own ItemList schema. `imageAlt` is a
  // real, descriptive per-style alt (style name + key spec), not a bare
  // "image" placeholder -- ready for the moment real photography drops
  // into `image` with no separate alt-text pass, same convention every
  // prior category's own cards already follow. Flip to "published" once
  // a style's real PDP content (description, FAQs, specifications,
  // gallery) exists, same as every prior category's own pilot styles.
  styleCards: [
    {
      status: "draft",
      slug: "athletic",
      cardTitle: "Custom Classic Athletic Tank Top",
      cardSubline: "Standard armhole, straight or racerback",
      image: "",
      imageAlt: "Custom classic athletic tank top, standard armhole, straight or racerback",
      href: "/activewear/tank-tops/athletic",
    },
    {
      status: "draft",
      slug: "racerback",
      cardTitle: "Custom Racerback Tank Top",
      cardSubline: "Y-back, 180 to 220 GSM, stretch fit",
      image: "",
      imageAlt: "Custom racerback tank top, Y-back, 180 to 220 GSM stretch fit",
      href: "/activewear/tank-tops/racerback",
    },
    {
      status: "draft",
      slug: "stringer",
      cardTitle: "Custom Stringer Tank Top",
      cardSubline: "Deep-cut armhole, ultra-narrow strap",
      image: "",
      imageAlt: "Custom stringer tank top, deep-cut armhole, ultra-narrow strap",
      href: "/activewear/tank-tops/stringer",
    },
    {
      status: "draft",
      slug: "muscle",
      cardTitle: "Custom Muscle Tank Top",
      cardSubline: "Dropped armhole, wider than a tee",
      image: "",
      imageAlt: "Custom muscle tank top, dropped armhole, wider than a tee",
      href: "/activewear/tank-tops/muscle",
    },
    {
      status: "draft",
      slug: "cropped",
      cardTitle: "Custom Cropped Tank Top",
      cardSubline: "Shortened body length",
      image: "",
      imageAlt: "Custom cropped tank top, shortened body length",
      href: "/activewear/tank-tops/cropped",
    },
    {
      status: "draft",
      slug: "oversized",
      cardTitle: "Custom Oversized Tank Top",
      cardSubline: "Loose streetwear fit",
      image: "",
      imageAlt: "Custom oversized tank top, loose streetwear fit",
      href: "/activewear/tank-tops/oversized",
    },
    {
      status: "draft",
      slug: "ribbed",
      cardTitle: "Custom Ribbed Tank Top",
      cardSubline: "Rib-knit, fitted layering",
      image: "",
      imageAlt: "Custom ribbed tank top, rib-knit, fitted layering",
      href: "/activewear/tank-tops/ribbed",
    },
    {
      status: "draft",
      slug: "longline",
      cardTitle: "Custom Longline Tank Top",
      cardSubline: "Extended body length",
      image: "",
      imageAlt: "Custom longline tank top, extended body length",
      href: "/activewear/tank-tops/longline",
    },
    {
      status: "draft",
      slug: "shelf-bra",
      cardTitle: "Custom Shelf-Bra Tank Top",
      cardSubline: "Built-in support, women's",
      image: "",
      imageAlt: "Custom shelf-bra tank top, built-in support, women's",
      href: "/activewear/tank-tops/shelf-bra",
    },
  ],
  // Sibling Tops-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern every prior category's own relatedLinks already
  // establishes -- these become live the moment each one gets its own
  // content file.
  relatedLinks: [
    { label: "Sports Bras", href: "/activewear/sports-bras" },
    { label: "T-Shirts", href: "/activewear/t-shirts" },
    { label: "Long-Sleeve Tops", href: "/activewear/long-sleeve-tops" },
    { label: "Shorts", href: "/activewear/shorts" },
  ],
};
