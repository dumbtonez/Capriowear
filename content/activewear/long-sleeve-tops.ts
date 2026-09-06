// content/activewear/long-sleeve-tops.ts
// Eighth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every prior
// category (owner spec, 2026-09-02): no edits to app/activewear/
// [category]/page.tsx, app/activewear/[category]/[style]/page.tsx,
// app/sitemap.ts, or lib/schema.ts, only this file plus one line in
// ./categories.ts.
//
// Third real use of `weightTiers` (see Hoodies' and Sweatshirts' own
// header comments for the first two) -- 3 tiers here, same count as
// Sweatshirts, matching this category's own given content (no
// ultra-heavyweight tier).
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave ("Share
// your tech pack, sketch or a reference long-sleeve, we'll develop it
// with you.") -- standing rule, owner spec, 2026-09-02 (see Sweatshirts'
// own header comment and the decision log entry of the same date):
// every category file uses Leggings' own ctaSubline verbatim, regardless
// of what a category's own brief supplies here.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const longSleeveTops: Category = {
  slug: "long-sleeve-tops",
  group: "Activewear",
  menuLabel: "Long-Sleeve Tops",
  // Entity FAQ overrides (owner spec, 2026-09-02) -- "Long-Sleeve Top"
  // (singular) reads correctly in "a custom Long-Sleeve Top
  // manufacturer", "long-sleeve tops" (plural) in "private label
  // long-sleeve tops" -- see categoryEntityFaq()'s own comment in
  // ./pdpShared.ts.
  manufacturerNoun: "Long-Sleeve Top",
  productNounPlural: "long-sleeve tops",
  entityExampleStyles: "crew, henley, quarter-zip, and performance styles",
  entityFabrics: "combed cotton, cotton blends and performance polyester",
  h1: "Custom Long-Sleeve Top Manufacturer",
  // metaTitle leads with "Performance Long Sleeve" (SEO/AEO refresh, owner
  // spec: "own performance long sleeve as the specific head term") -- H1
  // stays the broader "Long-Sleeve Top" (not in this pass's H1-change
  // list), same deliberate H1/title split already used elsewhere
  // (Teamwear/Rash Guards & Fight Wear's own metaTitle/h1 comment).
  metaTitle: "Custom Performance Long Sleeve Manufacturer",
  metaDescription:
    "Custom performance long sleeve manufacturer, thumbhole and compression styles, waffle and thermal knits, low MOQ. Capriowear.",
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
      bestFor: "Cotton and streetwear long-sleeves, screen print and DTG",
      performance: "Soft hand, breathable, preshrunk to control shrink",
    },
    {
      fabric: "Cotton-poly blend (50/50, CVC)",
      bestFor: "Everyday and team basics",
      performance: "Less shrink, holds shape, durable",
    },
    {
      fabric: "100% performance polyester",
      bestFor: "Athletic long-sleeves, sublimation",
      performance: "Moisture-wicking, quick-dry, holds color",
    },
    {
      fabric: "Performance poly-spandex (commonly 90/10)",
      bestFor: "Fitted athletic long-sleeves, quarter-zips",
      performance: "4-way stretch, moisture-wicking, full mobility",
    },
    {
      fabric: "Waffle or thermal knit (cotton or cotton-spandex)",
      bestFor: "Thermal long-sleeves and henleys, warmth",
      performance: "Honeycomb texture for warmth, stretch on spandex blends (fitted around 200 GSM)",
    },
    {
      fabric: "Brushed-back jersey",
      bestFor: "Added warmth without a full thermal build",
      performance: "Soft brushed interior, midweight warmth",
    },
    {
      fabric: "Tri-blend",
      bestFor: "Premium, soft vintage hand",
      performance: "Exceptionally soft, natural drape",
    },
  ],
  // Weight tiers as their own real, liftable table (FabricOptions.tsx's
  // own `weightTiers` prop) -- 3 tiers, same count as Sweatshirts,
  // matching this category's own given content (no ultra-heavyweight
  // tier).
  weightTiers: [
    {
      tier: "Lightweight",
      gsm: "100 to 155 GSM",
      bestFor: "Performance and layering long-sleeves, base layers, sublimation",
    },
    {
      tier: "Midweight",
      gsm: "150 to 190 GSM",
      bestFor: "Everyday cotton and blend long-sleeves, henleys",
    },
    {
      tier: "Heavyweight",
      gsm: "180 to 260+ GSM",
      bestFor: "Premium and streetwear, waffle and thermal knits",
    },
  ],
  fabricNote: [
    { text: "Weights follow our t-shirt tiers; waffle and thermal knits run heavier. " },
    { text: "Poly-spandex", bold: true },
    { text: " adds stretch for fitted athletic styles. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric or weight", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 7 fabrics above, in the same
  // order -- same "shortened, not derived" pattern every prior category's
  // own fabricPills already establishes.
  fabricPills: [
    "Combed cotton",
    "Cotton-poly blend",
    "Performance polyester",
    "Poly-spandex",
    "Waffle / thermal knit",
    "Brushed-back jersey",
    "Tri-blend",
  ],
  qualityHeading: "Every sleeve, the right length, every size",
  qualitySubline: "We confirm sleeve length, cuff and fabric on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Sleeve length graded proportional across the full size range",
    "Cuff and thumbhole placement consistent and comfortable at every size",
    "GSM and hand-feel held consistent, shrinkage tested after wash",
    "Waffle and thermal knits tested for shape retention and recovery",
    "Henley plackets lie flat, buttons securely attached",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Cotton, cotton-blend, tri-blend, performance polyester, poly-spandex, waffle and thermal knits",
    },
    { title: "Weight and fit", body: "Lightweight to heavyweight, fitted athletic, relaxed or oversized" },
    { title: "Neckline", body: "Crew, henley placket (2 to 5 buttons), mock neck or quarter-zip" },
    {
      title: "Cuff and sleeve",
      body: "Ribbed, hemmed or raw cuff, thumbholes, set-in, raglan or drop-shoulder sleeve, optional hood and articulated darts",
    },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, screen, DTG, DTF, sublimation (on poly), embroidery, plus sleeve and cuff placements",
    },
    { title: "Labels and packaging", body: "Woven, printed or tear-away labels, hangtags, retail-ready packaging" },
  ],
  // Same heading every prior category's own faqHeading already uses --
  // confirmed intentional reuse, since every question below it is
  // genuinely long-sleeve-specific. The entity question itself is NOT
  // stored here -- app/activewear/[category]/page.tsx builds it per
  // category via categoryEntityFaq() and prepends it at render time (see
  // that function's own comment in ./pdpShared.ts), so it can never drift
  // out of sync with what any style page under this category generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom long-sleeve tops?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a performance long-sleeve and a compression long-sleeve?",
      a: "A performance long-sleeve is a relaxed-to-fitted athletic top focused on moisture-wicking and mobility. A compression long-sleeve fits tight against the skin for muscle support, that is a base-layer product, see our Compression and Base Layers range. We make both, sorted by fit and intent.",
    },
    {
      q: "Which fabrics do you use, and which suits which?",
      a: "Combed cotton and cotton blends for cotton and streetwear long-sleeves, 100% performance polyester or poly-spandex for athletic and fitted styles, waffle or thermal knit for warmth, plus tri-blend and brushed-back options.",
    },
    {
      q: "Are thumbholes a standard feature or an add-on?",
      a: "Yes, thumbholes are a standard feature on our performance long-sleeves, not a special add, along with a fitted athletic cut and moisture-wicking fabric.",
    },
    {
      q: "What is a waffle or thermal knit long-sleeve?",
      a: "A honeycomb waffle or a brushed thermal knit adds warmth for cooler-weather training and everyday wear, available in cotton or cotton-spandex, and runs heavier than our standard long-sleeve fabrics.",
    },
    {
      q: "What neckline and cuff options can you make?",
      a: "Crew, henley placket (2 to 5 buttons), mock neck, or quarter-zip necklines, with ribbed, hemmed or raw cuffs and optional thumbholes.",
    },
    {
      q: "Can you match a specific fabric weight or a reference long-sleeve?",
      a: "Yes. Send a reference or tech pack and we match the fabric, weight, sleeve length and cuff, then confirm on your sample.",
    },
    {
      q: "What print and branding methods can you do?",
      a: "Screen print and DTG on cotton, sublimation on 100% polyester, plus embroidery, DTF and patches. Long-sleeves also allow sleeve prints and cuff branding, placements a tee cannot carry.",
    },
    {
      q: "What premium construction can you add?",
      a: "Articulated elbow and back darts for a contoured athletic fit, and dual-filament yarns for better moisture transport, both real upgrades over a basic long-sleeve.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, weight, fit, neckline, cuff, thumbholes, sleeve construction, hood, color, print and embroidery including sleeve and cuff placement, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label long-sleeve tops?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are long-sleeve tops sized?",
      a: "Alpha XS to 5XL, with sleeve length graded proportionally at every size, not just the sample size. Unisex, men's and women's differ by cut.",
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
      a: "Send your tech pack, sketch or a reference long-sleeve by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // FinalCta's own h2/cta and the compliance bar's own items already match
  // content/home.ts's own shared finalCta/complianceTicker verbatim --
  // app/activewear/[category]/page.tsx reuses those directly, same as
  // every prior category. ctaReferenceNoun swaps this category's own noun
  // into the shared subline template (buildCtaSubline(), ./pdpShared.ts) --
  // owner spec, 2026-09-04.
  ctaReferenceNoun: "long-sleeve top",
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
      slug: "crew",
      cardTitle: "Custom Crew Long-Sleeve Top",
      cardSubline: "Cotton jersey, full-length sleeve",
      image: "",
      imageAlt: "Custom crew long-sleeve top, cotton jersey, full-length sleeve",
      href: "/activewear/long-sleeve-tops/crew",
    },
    {
      status: "draft",
      slug: "performance",
      cardTitle: "Custom Performance Long-Sleeve Top",
      cardSubline: "Moisture-wicking, thumbholes",
      image: "",
      imageAlt: "Custom performance long-sleeve top, moisture-wicking, thumbholes",
      href: "/activewear/long-sleeve-tops/performance",
    },
    {
      status: "draft",
      slug: "henley",
      cardTitle: "Custom Henley Long-Sleeve Top",
      cardSubline: "Button placket neckline",
      image: "",
      imageAlt: "Custom henley long-sleeve top, button placket neckline",
      href: "/activewear/long-sleeve-tops/henley",
    },
    {
      status: "draft",
      slug: "quarter-zip",
      cardTitle: "Custom Quarter-Zip Long-Sleeve Top",
      cardSubline: "Mock neck, partial zip",
      image: "",
      imageAlt: "Custom quarter-zip long-sleeve top, mock neck, partial zip",
      href: "/activewear/long-sleeve-tops/quarter-zip",
    },
    {
      status: "draft",
      slug: "hooded",
      cardTitle: "Custom Hooded Long-Sleeve Top",
      cardSubline: "Long-sleeve tee with hood",
      image: "",
      imageAlt: "Custom hooded long-sleeve top, long-sleeve tee with hood",
      href: "/activewear/long-sleeve-tops/hooded",
    },
    {
      status: "draft",
      slug: "oversized",
      cardTitle: "Custom Oversized Long-Sleeve Top",
      cardSubline: "Loose streetwear fit",
      image: "",
      imageAlt: "Custom oversized long-sleeve top, loose streetwear fit",
      href: "/activewear/long-sleeve-tops/oversized",
    },
    {
      status: "draft",
      slug: "raglan",
      cardTitle: "Custom Raglan Long-Sleeve Top",
      cardSubline: "Raglan sleeve, flexible shoulder",
      image: "",
      imageAlt: "Custom raglan long-sleeve top, raglan sleeve, flexible shoulder",
      href: "/activewear/long-sleeve-tops/raglan",
    },
    {
      status: "draft",
      slug: "waffle",
      cardTitle: "Custom Waffle Thermal Long-Sleeve Top",
      cardSubline: "Honeycomb knit, warmth",
      image: "",
      imageAlt: "Custom waffle thermal long-sleeve top, honeycomb knit, warmth",
      href: "/activewear/long-sleeve-tops/waffle",
    },
  ],
  // Sibling Tops-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern every prior category's own relatedLinks already
  // establishes -- these become live the moment each one gets its own
  // content file.
  relatedLinks: [
    { label: "T-Shirts", href: "/activewear/t-shirts" },
    { label: "Hoodies", href: "/activewear/hoodies" },
    { label: "Sweatshirts", href: "/activewear/sweatshirts" },
    { label: "Tank Tops", href: "/activewear/tank-tops" },
  ],
};
