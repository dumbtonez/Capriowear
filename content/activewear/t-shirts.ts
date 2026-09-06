// content/activewear/t-shirts.ts
// Fourth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same as Sports Bras and Shorts
// before it (owner spec, 2026-09-02): no edits to app/activewear/
// [category]/page.tsx, app/activewear/[category]/[style]/page.tsx,
// app/sitemap.ts, or lib/schema.ts, only this file plus one line in
// ./categories.ts.
//
// Weight tiers render as their own real, liftable table -- FabricOptions.tsx
// gained an optional `weightTiers` prop the same day this category shipped
// (owner follow-up, after this file's first pass folded the 4 tiers into
// `fabricNote` as prose instead, since a second table wasn't in that
// first pass's own "no new page code" scope). Backward-compatible: every
// prior category (Leggings, Sports Bras, Shorts) simply has no
// `weightTiers` field, so nothing extra renders for them.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const tShirts: Category = {
  slug: "t-shirts",
  group: "Activewear",
  menuLabel: "T-Shirts",
  // Entity FAQ overrides (owner spec, 2026-09-02) -- "T-Shirt" (singular)
  // reads correctly in "a custom T-Shirt manufacturer", "t-shirts"
  // (plural, lowercase) in "private label t-shirts" -- see
  // categoryEntityFaq()'s own comment in ./pdpShared.ts.
  manufacturerNoun: "T-Shirt",
  productNounPlural: "t-shirts",
  entityExampleStyles: "crew neck, performance, oversized, and v-neck styles",
  entityFabrics: "combed cotton, cotton blends and performance polyester",
  h1: "Custom T-Shirt Manufacturer",
  // metaTitle: the owner's own request this time is already the short
  // 2-segment form ("Custom T-Shirt Manufacturer | Capriowear") -- 42
  // rendered chars, comfortably under the ~60 char target, no deviation
  // needed (unlike Leggings/Sports Bras/Shorts, whose own requested
  // titles each needed a call on the 3-segment "| Private Label and OEM"
  // form).
  metaTitle: "Custom T-Shirt Manufacturer",
  // Owner's exact given copy, 158 chars -- within Google's own ~155-160
  // char truncation point.
  metaDescription:
    "Custom t-shirt manufacturer, cotton to heavyweight performance tees, 100 to 280+ GSM, low minimum order. Capriowear.",
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
      fabric: "100% combed ring-spun cotton",
      bestFor: "Cotton and streetwear basics, DTG and screen print",
      performance: "Soft hand, breathable, takes water-based inks well, preshrunk to control shrink",
    },
    {
      fabric: "Supima or Pima cotton (extra-long-staple)",
      bestFor: "Premium cotton basics",
      performance: "Smoother, more structured hand than standard cotton",
    },
    {
      fabric: "50/50 cotton-polyester",
      bestFor: "Team and organization basics, everyday retail",
      performance: "Less shrink than cotton, holds shape, more durable",
    },
    {
      fabric: "CVC cotton-poly (60/40 up to 90/10)",
      bestFor: "A cotton feel with better shrink control",
      performance: "Softer than 50/50, poly reduces shrink and adds durability",
    },
    {
      fabric: "Tri-blend (50% polyester / 25% combed cotton / 25% rayon)",
      bestFor: "Premium fashion basics, vintage heather look",
      performance: "Exceptionally soft, natural drape, lighter, needs decorator care when printing",
    },
    {
      fabric: "100% performance polyester",
      bestFor: "Training and athletic tees",
      performance: "Moisture-wicking, quick-dry, holds color, best for sublimation",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainable performance lines",
      performance: "Same performance as virgin polyester",
    },
  ],
  // Weight tiers now their own real table (FabricOptions.tsx's own
  // `weightTiers` prop, added 2026-09-02 specifically for this category --
  // see that component's own header comment) instead of folded into this
  // note as prose -- this is back to the owner's own given closing "Note:"
  // sentence alone.
  weightTiers: [
    {
      tier: "Lightweight",
      gsm: "100 to 155 GSM",
      bestFor: "Performance and hot-climate tees, sublimation, simple prints",
    },
    {
      tier: "Midweight",
      gsm: "150 to 190 GSM",
      bestFor: "Retail basics and brand merch, most screen and DTG work",
    },
    {
      tier: "Heavyweight",
      gsm: "180 to 260 GSM",
      bestFor: "Premium and streetwear lines, embroidery, structured boxy fits",
    },
    {
      tier: "Ultra-heavyweight",
      gsm: "280+ GSM",
      bestFor: "Top-tier structured, oversized streetwear",
    },
  ],
  fabricNote: [
    { text: "GSM confirmed per style with the mill; preshrink status stated on the sample. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric or weight", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 7 fabrics above, in the same
  // order -- same "shortened, not derived" pattern every prior category's
  // own fabricPills already establishes.
  fabricPills: [
    "Combed cotton",
    "Supima cotton",
    "50/50 cotton-poly",
    "CVC cotton-poly",
    "Tri-blend",
    "Performance polyester",
    "Recycled polyester",
  ],
  qualityHeading: "The weight you approve is the weight you get",
  qualitySubline: "We confirm GSM, shrinkage and print on your sample before a single bulk piece is cut",
  qualityPoints: [
    "GSM held consistent, batch to batch, not just on the approved sample",
    "Shrinkage tested after wash, preshrink status stated up front",
    "Print durability tested for your exact fabric and method",
    "Collar and hem hold their shape after repeated washing",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Combed cotton, cotton blends, tri-blend, and performance polyester" },
    { title: "Weight", body: "Lightweight to ultra-heavyweight, 100 to 280+ GSM" },
    {
      title: "Fit and build",
      body: "Crew or V-neck, slim to oversized, set-in, raglan or drop-shoulder, side-seam or tubular body, graded XS to 5XL",
    },
    {
      title: "Print and branding",
      body: "Screen, DTG, DTF, sublimation (on poly), embroidery, puff, with Pantone color matching",
    },
    { title: "Labels", body: "Woven, printed or tear-away, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  // Same heading every prior category's own faqHeading already uses --
  // confirmed intentional reuse, since every question below it is
  // genuinely t-shirt-specific. The entity question itself is NOT stored
  // here -- app/activewear/[category]/page.tsx builds it per category via
  // categoryEntityFaq() and prepends it at render time (see that
  // function's own comment in ./pdpShared.ts), so it can never drift out
  // of sync with what any style page under this category generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom t-shirts?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What GSM suits streetwear versus performance tees?",
      a: "Lightweight 100 to 155 GSM for performance and hot-climate tees, midweight 150 to 190 GSM for retail basics and merch, heavyweight 180 to 260 GSM for premium and streetwear lines, and ultra-heavyweight 280+ GSM for structured oversized tees.",
    },
    {
      q: "Which fabrics do you use, and which suits which use?",
      a: "Combed ring-spun cotton and Supima for cotton basics, 50/50 and CVC cotton-poly blends for team and retail basics, tri-blend for a soft vintage look, and 100% performance polyester for moisture-wicking athletic tees, plus recycled options.",
    },
    {
      q: "What is the difference between cotton, a cotton-poly blend, and performance polyester?",
      a: "Cotton is the softest natural hand and takes water-based prints best; a cotton-poly blend shrinks less and holds shape; performance polyester wicks moisture, dries fast, and is the only fabric that takes true sublimation printing.",
    },
    {
      q: "What print and branding methods can you do?",
      a: "Screen print, DTG and DTF, sublimation on polyester, embroidery, and puff, plus woven, printed and tear-away labels. Cotton takes the widest range of methods; sublimation is for polyester only.",
    },
    {
      q: "What is the difference between a side-seam and a tubular tee?",
      a: "A tubular body is knit without side seams, cheaper and less structured; a side-seamed body drapes more tailored and reads more premium. We build to whichever you specify, so construction stays consistent across your whole run.",
    },
    {
      q: "Can you match an exact GSM or a reference tee?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match the fabric, GSM and hand-feel, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, weight, fit, neckline, sleeve, construction, color, print and embroidery, your logos, woven and care labels, hangtags and retail packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM and private label t-shirts?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are t-shirts sized?",
      a: "Alpha XS to 5XL. Unisex, men's and women's fits use the same size range with a different cut, unisex is straighter and boxier, women's is tapered.",
    },
    {
      q: "Will my tees shrink?",
      a: "We state preshrink status up front and test shrinkage on your sample before bulk, so what you approve is what arrives.",
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
      a: "Send your tech pack, sketch or a reference tee by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // FinalCta's own h2/cta and the compliance bar's own items already match
  // content/home.ts's own shared finalCta/complianceTicker verbatim --
  // app/activewear/[category]/page.tsx reuses those directly, same as
  // every prior category, so this file only supplies ctaSubline.
  // Owner spec, 2026-09-02: "on every PLP, our cta should have this
  // subline" -- the exact same closing-CTA subline is now used verbatim
  // on every category PLP (was its own per-category wording, e.g. "a
  // reference tee, we'll develop it with you").
  ctaReferenceNoun: "tee",
  // Every style is "draft" (owner spec) -- a real name and one-line spec,
  // no PDP content yet: shows on the grid as a non-clickable tile (no
  // hover image swap either, since no `images` array is set -- see
  // ProductCardMedia.tsx's own contract, which only ever activates hover
  // once a real `images[1]` exists), no generated route, excluded from
  // the sitemap and this category's own ItemList schema. Flip to
  // "published" once a style's real PDP content (description, FAQs,
  // specifications, gallery) exists, same as every prior category's own
  // pilot styles.
  styleCards: [
    {
      status: "draft",
      slug: "crew-neck",
      cardTitle: "Custom Crew Neck T-Shirt",
      cardSubline: "Universal crew, cotton or performance",
      image: "",
      imageAlt: "Custom crew neck t-shirt manufacturer",
      href: "/activewear/t-shirts/crew-neck",
    },
    {
      status: "draft",
      slug: "performance",
      cardTitle: "Custom Performance T-Shirt",
      cardSubline: "Moisture-wicking poly, athletic cut",
      image: "",
      imageAlt: "Custom performance t-shirt manufacturer",
      href: "/activewear/t-shirts/performance",
    },
    {
      status: "draft",
      slug: "oversized",
      cardTitle: "Custom Oversized Boxy T-Shirt",
      cardSubline: "Heavyweight, structured streetwear fit",
      image: "",
      imageAlt: "Custom oversized boxy t-shirt manufacturer",
      href: "/activewear/t-shirts/oversized",
    },
    {
      status: "draft",
      slug: "v-neck",
      cardTitle: "Custom V-Neck T-Shirt",
      cardSubline: "V-neckline, cotton or blend",
      image: "",
      imageAlt: "Custom v-neck t-shirt manufacturer",
      href: "/activewear/t-shirts/v-neck",
    },
    {
      status: "draft",
      slug: "slim-fit",
      cardTitle: "Custom Slim-Fit T-Shirt",
      cardSubline: "Closer cut through the body",
      image: "",
      imageAlt: "Custom slim-fit t-shirt manufacturer",
      href: "/activewear/t-shirts/slim-fit",
    },
    {
      status: "draft",
      slug: "drop-shoulder",
      cardTitle: "Custom Drop-Shoulder T-Shirt",
      cardSubline: "Dropped shoulder, streetwear staple",
      image: "",
      imageAlt: "Custom drop-shoulder t-shirt manufacturer",
      href: "/activewear/t-shirts/drop-shoulder",
    },
    {
      status: "draft",
      slug: "raglan",
      cardTitle: "Custom Raglan T-Shirt",
      cardSubline: "Diagonal raglan sleeve, vintage-athletic",
      image: "",
      imageAlt: "Custom raglan t-shirt manufacturer",
      href: "/activewear/t-shirts/raglan",
    },
    {
      status: "draft",
      slug: "pocket",
      cardTitle: "Custom Pocket T-Shirt",
      cardSubline: "Chest pocket detail",
      image: "",
      imageAlt: "Custom pocket t-shirt manufacturer",
      href: "/activewear/t-shirts/pocket",
    },
    {
      status: "draft",
      slug: "longline",
      cardTitle: "Custom Longline T-Shirt",
      cardSubline: "Extended body length",
      image: "",
      imageAlt: "Custom longline t-shirt manufacturer",
      href: "/activewear/t-shirts/longline",
    },
  ],
  // Sibling Tops-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern every prior category's own relatedLinks already
  // establishes -- these become live the moment each one gets its own
  // content file.
  relatedLinks: [
    { label: "Sports Bras", href: "/activewear/sports-bras" },
    { label: "Tank Tops", href: "/activewear/tank-tops" },
    { label: "Long-Sleeve Tops", href: "/activewear/long-sleeve-tops" },
    { label: "Shorts", href: "/activewear/shorts" },
  ],
};
