// content/activewear/compression-base-layers.ts
// Tenth real category built on the Category shape (content/activewear/
// types.ts) -- a content/data drop, plus one small, backward-compatible
// component change (owner spec, 2026-09-02): `FabricOptions.tsx`'s own
// `weightTiers` table gained an optional `weightTiersHeaders` prop
// (`Category.weightTiersHeaders`), so its 3 column headers can be
// relabeled per category instead of hardcoded "Tier"/"GSM"/"Best for".
// The underlying `WeightTier` data shape is reused as-is, not extended --
// this category's own table sets `weightTiersHeaders` to `{tier: "Level",
// value: "mmHg", bestFor: "Used for"}` and stores "Light"/"Medium"/"Firm"
// in each row's own `tier` field, the mmHg range in `gsm`. Every prior
// category using `weightTiers` (Hoodies, Sweatshirts, Long-Sleeve Tops,
// Joggers & Track Pants) omits this new prop, so their own "Tier"/"GSM"/
// "Best for" headers render exactly as before -- confirmed unchanged.
//
// Otherwise the same pure content/data-drop pattern as every prior
// category: no edits to app/activewear/[category]/[style]/page.tsx,
// app/sitemap.ts, or lib/schema.ts, only this file, one small addition to
// FabricOptions.tsx/app/activewear/[category]/page.tsx/types.ts (the
// weightTiersHeaders wiring above), and one line in ./categories.ts.
//
// American spelling correction, flagged: the owner's own brief used
// "panelling"/"panelled" (British spelling) in several places, which
// conflicts with this same brief's own "American spelling" rule --
// written here as "paneling"/"paneled" throughout instead.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave ("Share
// your tech pack, target mmHg or a reference garment, we'll develop it
// with you.") -- standing rule, owner spec, 2026-09-02 (see Sweatshirts',
// Long-Sleeve Tops', and Joggers & Track Pants' own header comments and
// the decision log entries of the same date): every category file uses
// Leggings' own ctaSubline verbatim, regardless of what a category's own
// brief supplies here.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const compressionBaseLayers: Category = {
  slug: "compression-base-layers",
  group: "Activewear",
  menuLabel: "Compression & Base Layers",
  // Entity FAQ overrides (owner spec, 2026-09-02) -- "Compression and Base
  // Layer" (singular) reads correctly as the manufacturer noun, while
  // "compression and base layers" (plural) reads correctly as the product
  // plural -- see categoryEntityFaq()'s own comment in ./pdpShared.ts.
  manufacturerNoun: "Compression and Base Layer",
  productNounPlural: "compression and base layers",
  entityExampleStyles: "compression top, tights, shorts, and base-layer set styles",
  entityFabrics: "nylon and polyester spandex knits",
  h1: "Custom Compression and Base Layer Manufacturer",
  // metaTitle: owner's own given title is already the short 2-segment
  // form -- 59 rendered chars, right at the edge of the ~60 char target
  // but within it, no deviation needed.
  metaTitle: "Custom Compression and Base Layer Manufacturer",
  // Owner's exact given copy (spelling-corrected, see this file's own
  // header comment), 164 chars -- past Google's own ~155-160 char desktop
  // truncation point (same call as several recent categories' own
  // metaDescription: nothing essential sits past that point either way),
  // but within this project's own documented AEO allowance (up to ~270
  // chars) -- kept close to verbatim, not trimmed.
  metaDescription:
    "Custom compression and base layer manufacturer, documented mmHg, graduated zonal paneling, cut-and-sew, low MOQ. Capriowear.",
  // CategoryBanner's own checkmark row -- same 4 facts, same wording, as
  // every prior category's own.
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Real Women/Men split, same as every prior category -- explicit,
  // though also the default (see this field's own comment in ./types.ts).
  showGenderFilter: true,
  // Owner's own given H2 for this category is different from every prior
  // one ("Engineered for real compression," not "The fabrics behind the
  // big brands") -- kept as given, a genuine content difference, not a
  // copy-paste miss.
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "Engineered for\nreal compression",
  fabricOptions: [
    {
      fabric: "Nylon or polyester spandex compression knit",
      bestFor: "True compression garments, all support levels",
      performance: "Smooth, durable, abrasion-resistant, 10 to 30% spandex sets the compression level",
    },
    {
      fabric: "Polyester-spandex moisture-management jersey",
      bestFor: "Warm-weather base layers, summer compression tops",
      performance: "Moisture-wicking, anti-microbial and UPF options (90/10 example, around 200 GSM)",
    },
    {
      fabric: "Thermal fleece-back poly-spandex",
      bestFor: "Cold-weather tights and tops",
      performance: "Warmth with stretch, smooth face for layering (88/12 example, around 272 GSM)",
    },
    {
      fabric: "Grid fleece (brushed grid backing)",
      bestFor: "Cold-weather base layers, outdoor",
      performance: "Traps heat with airflow, less bulk, 4-way stretch (92 to 95% poly, 5 to 8% spandex)",
    },
    {
      fabric: "Recycled polyester-spandex",
      bestFor: "Sustainable base-layer lines",
      performance: "Comparable performance, eco-positioning",
    },
  ],
  // Compression levels, not weight tiers -- reuses the same `weightTiers`
  // table (`WeightTier`'s own generic `{tier, gsm, bestFor}` shape) with
  // relabeled headers via `weightTiersHeaders` below. `tier` holds
  // "Light"/"Medium"/"Firm", `gsm` holds the mmHg range.
  weightTiers: [
    {
      tier: "Light",
      gsm: "8 to 15 mmHg (about 10 to 15% spandex)",
      bestFor: "Everyday wear, recovery, all-day comfort",
    },
    {
      tier: "Medium",
      gsm: "15 to 20 mmHg (about 15 to 20% spandex)",
      bestFor: "The athletic training and competition band",
    },
    {
      tier: "Firm",
      gsm: "20 to 30 mmHg (about 20 to 30% spandex)",
      bestFor: "Serious recovery and heavy training",
    },
  ],
  weightTiersHeaders: { tier: "Level", value: "mmHg", bestFor: "Used for" },
  fabricNote: [
    { text: "Compression level is set by spandex content and knit tension, confirmed by " },
    { text: "mmHg testing", bold: true },
    { text: ", not by fabric alone. Cut-and-sew lets us build zonal, paneled compression, different tensions in different zones, in a way a single-layer circular-knit construction cannot easily match. Medical-grade 30+ mmHg is a separate, regulated category we do not offer. Swatches before every bulk run, and we can source or match a specific fabric or a target " },
    { text: "mmHg", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 5 fabrics above, in the same
  // order -- same "shortened, not derived" pattern every prior category's
  // own fabricPills already establishes.
  fabricPills: [
    "Nylon spandex compression",
    "Polyester spandex jersey",
    "Thermal fleece-back",
    "Grid fleece",
    "Recycled poly-spandex",
  ],
  qualityHeading: "The pressure you approve, wash after wash",
  qualitySubline: "We confirm compression, seams and fit on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Compression tested to your target mmHg, with post-wash retention checked",
    "Spandex content confirmed to the compression tier",
    "Flatlock or covered seams, chafe-tested through movement",
    "Opacity confirmed at the target weight",
    "Panels matched in stretch and shrinkage, no tourniquet effect at the seams",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Nylon or polyester spandex compression knit, moisture-management jersey, thermal fleece-back, grid fleece",
    },
    { title: "Compression level", body: "Light, medium or firm, specified by target mmHg" },
    {
      title: "Construction and paneling",
      body: "Flatlock or covered seams, mesh ventilation zones, graduated tension, gusset",
    },
    {
      title: "Fit and length",
      body: "Second-skin top, tights or shorts, crew or mock neck, optional access fly on bottoms",
    },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, sublimation on poly, screen, heat transfer, reflective options",
    },
    { title: "Labels and packaging", body: "Woven, printed or tear-away labels, hangtags, retail-ready packaging" },
  ],
  // Same heading every prior category's own faqHeading already uses --
  // confirmed intentional reuse, since every question below it is
  // genuinely compression/base-layer-specific. The entity question itself
  // is NOT stored here -- app/activewear/[category]/page.tsx builds it
  // per category via categoryEntityFaq() and prepends it at render time
  // (see that function's own comment in ./pdpShared.ts), so it can never
  // drift out of sync with what any style page under this category
  // generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom compression and base layers?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What does mmHg mean on a compression garment?",
      a: "mmHg (millimeters of mercury) is the unit used to measure the pressure a compression garment actually applies, the same unit used in medical compression. A documented mmHg figure is what separates true compression from activewear that just looks tight.",
    },
    {
      q: "What is the difference between true compression and a fitted performance top or fashion legging?",
      a: "True compression delivers a documented, measurable pressure (mmHg) with appropriate spandex content and a graduated knit structure. A fitted performance top or a compressive-looking legging is stretchy activewear, it looks tight but is not engineered to a pressure output. We build both, and we are precise about which is which.",
    },
    {
      q: "What do light, medium and firm mmHg tiers mean?",
      a: "Light 8 to 15 mmHg for everyday and recovery, medium 15 to 20 mmHg for training, and firm 20 to 30 mmHg for serious recovery and heavy training. Level is set by spandex content and knit tension and confirmed by mmHg testing.",
    },
    {
      q: "Is 20 to 30 mmHg medical grade?",
      a: "No. Medical-grade compression starts above 30 mmHg and is a separate, regulated category we do not offer. Our firm tier tops out at 20 to 30 mmHg for serious recovery and heavy training.",
    },
    {
      q: "Do you make seamless compression?",
      a: "No, seamless (circular-knit) compression, common for socks and sleeves, is outside our cut-and-sew scope. That is not a limitation for garments: cut-and-sew is what lets us build zonal, paneled compression, different tensions and mesh zones in different body areas.",
    },
    {
      q: "Which fabrics do you use for cold versus warm weather?",
      a: "Lightweight moisture-management poly-spandex jersey for warm-weather base layers, and thermal fleece-back or grid fleece for cold-weather tops and tights.",
    },
    {
      q: "Can you match a target mmHg or a reference compression garment?",
      a: "Yes. Send your target pressure or a reference and we develop the fabric, spandex content and knit tension to match, then test and confirm on your sample.",
    },
    {
      q: "What is zonal paneling, and how is it different from graduated compression?",
      a: "Graduated compression varies pressure along the length of a garment, tightest at the extremity and easing toward the core. Zonal paneling varies it by body area instead, different tension panels plus mesh ventilation at high-heat zones, flatlock or covered seams, gussets, and an access fly on thermal bottoms. We build either, or both together.",
    },
    {
      q: "How do you keep the seams chafe-free?",
      a: "Flatlock or covered seams, tested for chafe during movement, with a thin seam lining on high-compression garments to prevent pressure concentration at the seam.",
    },
    {
      q: "Can you show that compression holds after washing?",
      a: "Yes. We check post-wash compression retention on the sample, not just day-one pressure, since compression is a performance claim that must last.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: compression level, fabric warmth, paneling and zones, seam type, sleeve and leg length, neckline, fly, color, print and reflective branding, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are compression and base layers sized?",
      a: "Alpha XS to 5XL. Fit is more size-critical here than in any other category, because the pressure output depends on correct fit, so we grade precisely and fit-test at multiple sizes across the run.",
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
      a: "Send your tech pack, sketch, target mmHg or a reference garment by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // FinalCta's own h2/cta and the compliance bar's own items already match
  // content/home.ts's own shared finalCta/complianceTicker verbatim --
  // app/activewear/[category]/page.tsx reuses those directly, same as
  // every prior category. ctaReferenceNoun swaps this category's own noun
  // into the shared subline template (buildCtaSubline(), ./pdpShared.ts) --
  // owner spec, 2026-09-04.
  ctaReferenceNoun: "compression piece",
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
  //
  // cardTitle form is "Custom [Style]" here, not "Custom [Style]
  // [Category]" (same reasoning as Joggers & Track Pants) -- the owner's
  // own given titles already name the specific garment type per card
  // (top, tights, shorts, set), since this category covers more than one
  // garment shape.
  styleCards: [
    {
      status: "draft",
      slug: "compression-top",
      cardTitle: "Custom Compression Top",
      cardSubline: "Second-skin, short or long sleeve",
      image: "",
      imageAlt: "Custom compression top, second-skin, short or long sleeve",
      href: "/activewear/compression-base-layers/compression-top",
    },
    {
      status: "draft",
      slug: "compression-tights",
      cardTitle: "Custom Compression Tights",
      cardSubline: "Documented mmHg, base-layer fit",
      image: "",
      imageAlt: "Custom compression tights, documented mmHg, base-layer fit",
      href: "/activewear/compression-base-layers/compression-tights",
    },
    {
      status: "draft",
      slug: "compression-shorts",
      cardTitle: "Custom Compression Shorts",
      cardSubline: "Second-skin hip and thigh support",
      image: "",
      imageAlt: "Custom compression shorts, second-skin hip and thigh support",
      href: "/activewear/compression-base-layers/compression-shorts",
    },
    {
      status: "draft",
      slug: "mock-neck",
      cardTitle: "Custom Mock-Neck Base Layer",
      cardSubline: "Standing collar, cold-weather",
      image: "",
      imageAlt: "Custom mock-neck base layer, standing collar, cold-weather",
      href: "/activewear/compression-base-layers/mock-neck",
    },
    {
      status: "draft",
      slug: "base-layer-set",
      cardTitle: "Custom Base-Layer Set",
      cardSubline: "Matched top and bottom",
      image: "",
      imageAlt: "Custom base-layer set, matched top and bottom",
      href: "/activewear/compression-base-layers/base-layer-set",
    },
    {
      status: "draft",
      slug: "thermal",
      cardTitle: "Custom Thermal Base Layer",
      cardSubline: "Grid or fleece-back, cold-weather",
      image: "",
      imageAlt: "Custom thermal base layer, grid or fleece-back, cold-weather",
      href: "/activewear/compression-base-layers/thermal",
    },
  ],
  // Sibling Bottoms-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern every prior category's own relatedLinks already
  // establishes -- these become live the moment each one gets its own
  // content file.
  relatedLinks: [
    { label: "Leggings", href: "/activewear/leggings" },
    { label: "Shorts", href: "/activewear/shorts" },
    { label: "Joggers & Track Pants", href: "/activewear/joggers-track-pants" },
    { label: "Sports Bras", href: "/activewear/sports-bras" },
  ],
};
