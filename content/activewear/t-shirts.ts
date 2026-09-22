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
  // Updated to the real, locked 16-SKU catalog (owner spec, 2026-09-22,
  // T-Shirts SKU 1) -- was the pre-catalog placeholder list ("crew neck,
  // performance, oversized, and v-neck styles"). One field drives the
  // entity FAQ answer sitewide (categoryEntityFaq(), pdpShared.ts), so
  // this single edit keeps the PLP and every PDP byte-identical, same as
  // before.
  // Trailing comma is deliberate: `categoryEntityFaq()` concatenates this
  // directly with ` in ${entityFabrics}` below, no comma of its own (see
  // that function's own `fabricsClause` in ./pdpShared.ts) -- the given
  // sentence needs "...for women, in combed cotton...", not "...for
  // women in combed cotton...".
  entityExampleStyles:
    "fitted, oversized, relaxed, athletic, raglan-sleeve, dropped-shoulder, cropped, and curved-hem styles for men, and fitted, oversized, relaxed, athletic, dropped-shoulder, cropped, ringer, and v-neck styles for women,",
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
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
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
      a: "Yes, 20+ countries. DDP to the US, UK, EU, Canada and Australia, with GSP+ 0% EU duty.",
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
  // Replaced with the owner's final 16-SKU, dual-gender catalog (owner
  // spec, 2026-09-22) -- 8 men's (CAP-TEE-01 to 08), 8 women's (CAP-TEE-09
  // to 16), real gender-based filtering via `gender` (see StyleCard's own
  // comment in ./types.ts, the same mechanism Shorts/Tank Tops already
  // use). Six names repeat between the two genders (Fitted, Oversized,
  // Relaxed, Athletic, Dropped-Shoulder, Cropped) -- `cardTitle` stays
  // identical for each pair, `slug`/`href` get a "-mens"/"-womens" suffix
  // to avoid collision, same gender-scoped-slug pattern already
  // established on Tank Tops (`fitted-mens`/`fitted-womens`, etc.).
  // Raglan/Curved-Hem (men only) and Ringer/V-Neck (women only) have no
  // sibling on the other gender, so their slugs stay unsuffixed.
  styleCards: [
    {
      // Full PDP content for SKU 1 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 3/6/9. This SKU's own brief gave the entity
      // FAQ answer with the real 16-SKU style list (not the old
      // placeholder) -- updated `entityExampleStyles` at the top of this
      // file instead of overriding per-style, so the PLP and every PDP
      // stay byte-identical automatically, same mechanism as before.
      status: "draft",
      slug: "fitted-mens",
      cardTitle: "Custom Fitted T-Shirt",
      cardSubline: "Close-fitting compression cut, standard crew",
      image: "",
      imageAlt: "Custom fitted t-shirt manufacturer, men's",
      href: "/capriowear/activewear/t-shirts/fitted-mens",
      gender: "Men",
      sku: "CAP-TEE-01",
      pdpTitle: "Fitted",
      pdpHeading: "Custom Fitted T-Shirt Manufacturer",
      pdpDescription:
        "Men's close-fitting, compression-leaning tee with a standard crew neckline, custom and private label, in performance polyester, a poly-spandex blend, or combed cotton, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Fitted t-shirt, front view, men's" },
        { alt: "Fitted t-shirt, back view, men's" },
        { alt: "Fitted t-shirt, side profile, men's" },
        { alt: "Fitted t-shirt, fabric close-up, men's" },
        { alt: "Fitted t-shirt, worn on model, men's" },
        { alt: "Fitted t-shirt, flat lay, men's" },
      ],
      pdpMetaTitle: "Custom Fitted T-Shirt Manufacturer",
      pdpMetaDescription:
        "Custom fitted t-shirt manufacturer, OEM, ODM and private label, close-fitting compression cut, standard crew neckline, performance polyester or cotton blend, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Performance polyester, poly-spandex blend, or combed cotton",
      pdpFabricPills: ["Performance polyester", "Poly-spandex blend", "Combed cotton", "Cotton-poly blend"],
      pdpCustomizationPills: ["Your weight", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "What fabric is the fitted tee made from?",
          a: "Performance polyester or a poly-spandex blend for the compression-leaning build, or combed cotton for a softer fitted cotton version. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How close is the fit, and does it hold its shape?",
          a: "Close-fitting through the body and sleeve, built to hold its shape wash after wash. Stretch recovery is tested on your sample before bulk, especially on any poly-spandex build.",
        },
      ],
      relatedStyleTags: [
        { label: "Oversized", slug: "oversized-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Relaxed", slug: "relaxed-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Athletic", slug: "athletic-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Raglan", slug: "raglan", href: "/capriowear/activewear/t-shirts" },
        { label: "See All", href: "/capriowear/activewear/t-shirts" },
      ],
      specifications: [
        { label: "Style", value: "Men's fitted, compression-leaning tee, standard crew neckline (base type)" },
        { label: "Fabric", value: "Performance polyester, poly-spandex blend, or combed cotton, directional research range" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Close-fitting through the body, standard crew neckline" },
        { label: "Construction", value: "Cut-and-sew, side-seam or tubular body, double-needle stitched sleeves, hem and neck" },
        { label: "Branding", value: "Screen, DTG, DTF, sublimation on poly, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Fitted t-shirt, construction detail, men's" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "GSM held consistent, batch to batch",
        "Shrinkage tested after wash, preshrink status stated",
        "Print durability tested for your fabric and method",
        "Fit and stretch recovery checked across the size run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Screen, DTG, DTF, sublimation on polyester", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Embroidery, puff, silicone, heat transfer", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric and weight",
            body: "Any blend and GSM, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric and weight" },
          },
          {
            title: "Fit and build",
            body: "Neckline, fit, side-seam or tubular, taping and stitching to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit and build" },
          },
          {
            title: "Trims and finish",
            body: "Woven, printed or tear-away labels, care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 2 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1 above.
      status: "draft",
      slug: "oversized-mens",
      cardTitle: "Custom Oversized T-Shirt",
      cardSubline: "Boxy, dropped-shoulder streetwear fit",
      image: "",
      imageAlt: "Custom oversized t-shirt manufacturer, men's",
      href: "/capriowear/activewear/t-shirts/oversized-mens",
      gender: "Men",
      sku: "CAP-TEE-02",
      pdpTitle: "Oversized",
      pdpHeading: "Custom Oversized T-Shirt Manufacturer",
      pdpDescription:
        "Men's boxy, dropped-shoulder oversized tee, custom and private label, in combed cotton or a heavyweight cotton-poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Oversized t-shirt, front view, men's" },
        { alt: "Oversized t-shirt, shoulder detail, men's" },
        { alt: "Oversized t-shirt, back view, men's" },
        { alt: "Oversized t-shirt, fabric close-up, men's" },
        { alt: "Oversized t-shirt, worn on model, men's" },
        { alt: "Oversized t-shirt, flat lay, men's" },
      ],
      pdpMetaTitle: "Custom Oversized T-Shirt Manufacturer",
      pdpMetaDescription:
        "Custom oversized t-shirt manufacturer, OEM, ODM and private label, boxy dropped-shoulder streetwear fit, heavyweight cotton or cotton-poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Combed cotton or heavyweight cotton-poly blend",
      pdpFabricPills: ["Combed cotton", "Cotton-poly blend", "Tri-blend", "Recycled polyester"],
      pdpCustomizationPills: ["Your weight", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "What fabric is the oversized tee made from?",
          a: "Combed cotton or a heavyweight cotton-poly blend, weighted toward the heavier end of our GSM range for a structured streetwear drape. We confirm the exact blend and weight on your sample.",
        },
        {
          q: "How boxy is the fit, and can I adjust the proportions?",
          a: "Boxy through the body with a dropped-shoulder seam. Body width, length, and shoulder drop are all adjustable to your tech pack or reference garment.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted", slug: "fitted-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Relaxed", slug: "relaxed-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Dropped-Shoulder", slug: "dropped-shoulder-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Cropped", slug: "cropped-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "See All", href: "/capriowear/activewear/t-shirts" },
      ],
      specifications: [
        { label: "Style", value: "Men's boxy, oversized tee, dropped-shoulder construction (base type)" },
        { label: "Fabric", value: "Combed cotton or heavyweight cotton-poly blend, directional research range" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Oversized, boxy through the body" },
        { label: "Construction", value: "Cut-and-sew, dropped-shoulder seam, side-seam or tubular body, double-needle stitching" },
        { label: "Branding", value: "Screen, DTG, DTF, embroidery, puff, labels and packaging" },
      ],
      specificationsImage: { alt: "Oversized t-shirt, construction detail, men's" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "GSM held consistent, batch to batch",
        "Shrinkage tested after wash, preshrink status stated",
        "Print durability tested for your fabric and method",
        "Dropped-shoulder placement checked for consistency at every size",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Screen, DTG, DTF", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Embroidery, puff, silicone, heat transfer", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric and weight",
            body: "Any blend and GSM, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric and weight" },
          },
          {
            title: "Fit and build",
            body: "Dropped-shoulder placement, body length, side-seam or tubular, to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit and build" },
          },
          {
            title: "Trims and finish",
            body: "Woven, printed or tear-away labels, care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      // Full PDP content for SKU 3 (owner spec, 2026-09-22), draft.
      // Reachable by URL and a clickable PLP card via the sitewide
      // draft-PDP rule (`isDraftPdpReachable()`), still noindex/nofollow,
      // out of the sitemap, no Product/FAQPage JSON-LD. `pdpSpecHighlights`
      // left unset (owner-confirmed "DDP to 20+ countries" over the
      // brief's own "40+", matching the shared sitewide default and every
      // other page's own fact exactly, rather than a one-off inconsistent
      // claim). `pdpCustomizationPills` overridden to the brief's own
      // 4-pill set (narrower than the shared 6-pill default).
      slug: "relaxed-mens",
      cardTitle: "Custom Relaxed T-Shirt",
      cardSubline: "Softer, roomier everyday cut",
      image: "",
      imageAlt: "Custom relaxed t-shirt manufacturer, men's",
      href: "/capriowear/activewear/t-shirts/relaxed-mens",
      gender: "Men",
      sku: "CAP-TEE-03",
      pdpTitle: "Relaxed",
      pdpHeading: "Custom Relaxed T-Shirt Manufacturer",
      pdpDescription:
        "Men's softer, roomier everyday tee, custom and private label, in a 50/50 cotton-poly or CVC blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Relaxed t-shirt, front view" },
        { alt: "Relaxed t-shirt, back view" },
        { alt: "Relaxed t-shirt, side profile" },
        { alt: "Relaxed t-shirt, fabric close-up" },
        { alt: "Relaxed t-shirt, worn on model" },
        { alt: "Relaxed t-shirt, flat lay" },
      ],
      pdpMetaTitle: "Custom Relaxed T-Shirt Manufacturer",
      pdpMetaDescription:
        "Custom relaxed t-shirt manufacturer, OEM, ODM and private label, softer roomier everyday fit, cotton-poly or CVC blend, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "50/50 or CVC cotton-poly blend",
      pdpFabricPills: ["50/50 cotton-poly", "CVC cotton-poly", "Combed cotton", "Tri-blend"],
      pdpCustomizationPills: ["Your weight", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "What fabric is the relaxed tee made from?",
          a: "A 50/50 or CVC cotton-poly blend as the default, for less shrink and a durable everyday hand. Straight cotton or a tri-blend option is also available. We confirm the exact blend and weight on your sample.",
        },
        {
          q: "How does the fit compare to your Fitted and Oversized tees?",
          a: "Relaxed sits between the two: roomier through the body than the Fitted SKU, but not as boxy or dropped in the shoulder as the Oversized SKU. A true everyday fit.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted", slug: "fitted-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Oversized", slug: "oversized-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Athletic", slug: "athletic-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Dropped-Shoulder", slug: "dropped-shoulder-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "See All", href: "/capriowear/activewear/t-shirts" },
      ],
      specifications: [
        { label: "Style", value: "Men's relaxed, everyday tee (base type)" },
        { label: "Fabric", value: "50/50 or CVC cotton-poly blend, directional research range" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed, roomier through the body than the Fitted SKU, not as boxy as the Oversized SKU" },
        { label: "Construction", value: "Cut-and-sew, side-seam or tubular body, double-needle stitched sleeves, hem and neck" },
        { label: "Branding", value: "Screen, DTG, DTF, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Relaxed t-shirt, construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "GSM held consistent, batch to batch",
        "Shrinkage tested after wash, preshrink status stated",
        "Print durability tested for your fabric and method",
        "Collar and hem hold their shape after repeated washing",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Screen, DTG, DTF", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Embroidery, puff, silicone, heat transfer", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric and weight",
            body: "Any blend and GSM, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric and weight" },
          },
          {
            title: "Fit and build",
            body: "Body width, length, side-seam or tubular, to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit and build" },
          },
          {
            title: "Trims and finish",
            body: "Woven, printed or tear-away labels, care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 4 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1/2/3/6/9.
      status: "draft",
      slug: "athletic-mens",
      cardTitle: "Custom Athletic T-Shirt",
      cardSubline: "True-to-size training and running cut",
      image: "",
      imageAlt: "Custom athletic t-shirt manufacturer, men's",
      href: "/capriowear/activewear/t-shirts/athletic-mens",
      gender: "Men",
      sku: "CAP-TEE-04",
      pdpTitle: "Athletic",
      pdpHeading: "Custom Athletic T-Shirt Manufacturer",
      pdpDescription:
        "Men's true-to-size athletic and training tee, custom and private label, in 100% performance polyester, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Athletic t-shirt, front view, men's" },
        { alt: "Athletic t-shirt, back view, men's" },
        { alt: "Athletic t-shirt, side profile, men's" },
        { alt: "Athletic t-shirt, fabric close-up, men's" },
        { alt: "Athletic t-shirt, worn on model, men's" },
        { alt: "Athletic t-shirt, flat lay, men's" },
      ],
      pdpMetaTitle: "Custom Athletic T-Shirt Manufacturer",
      pdpMetaDescription:
        "Custom athletic t-shirt manufacturer, OEM, ODM and private label, true-to-size training and running cut, moisture-wicking performance polyester, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "100% performance polyester",
      pdpFabricPills: ["Performance polyester", "Recycled polyester", "Poly-spandex blend", "Cotton-poly blend"],
      pdpCustomizationPills: ["Your weight", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "What fabric is the athletic tee made from?",
          a: "100% performance polyester as the default, chosen for moisture-wicking and quick-dry performance. This is also the fabric that takes true sublimation printing. We confirm the exact weight on your sample.",
        },
        {
          q: "Is this the same as your Raglan or Curved-Hem tees?",
          a: "No. This is the base athletic-cut construction with a standard set-in sleeve. The Raglan tee uses a diagonal raglan seam and the Curved-Hem tee adds a curved, dropped hem; either construction detail can be applied to this athletic base fit on request.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted", slug: "fitted-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Raglan", slug: "raglan", href: "/capriowear/activewear/t-shirts" },
        { label: "Relaxed", slug: "relaxed-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Curved-Hem", slug: "curved-hem", href: "/capriowear/activewear/t-shirts" },
        { label: "See All", href: "/capriowear/activewear/t-shirts" },
      ],
      specifications: [
        { label: "Style", value: "Men's athletic, true-to-size training and running tee (base type)" },
        { label: "Fabric", value: "100% performance polyester, directional research range" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "True-to-size, athletic cut" },
        { label: "Construction", value: "Cut-and-sew, side-seam or tubular body, double-needle stitched sleeves, hem and neck" },
        { label: "Branding", value: "Sublimation, screen, DTF, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Athletic t-shirt, construction detail, men's" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "GSM held consistent, batch to batch",
        "Moisture-wicking performance tested for your exact fabric",
        "Print durability tested for your exact fabric and method",
        "Collar and hem hold their shape after repeated washing",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation on polyester, screen, DTF", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Embroidery, silicone, heat transfer", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric and weight",
            body: "Any blend and GSM, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric and weight" },
          },
          {
            title: "Fit and build",
            body: "Body width, length, side-seam or tubular, to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit and build" },
          },
          {
            title: "Trims and finish",
            body: "Woven, printed or tear-away labels, care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 5 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 4 above.
      status: "draft",
      slug: "raglan",
      cardTitle: "Custom Raglan T-Shirt",
      cardSubline: "Diagonal raglan sleeve construction",
      image: "",
      imageAlt: "Custom raglan t-shirt manufacturer",
      href: "/capriowear/activewear/t-shirts/raglan",
      gender: "Men",
      sku: "CAP-TEE-05",
      pdpTitle: "Raglan",
      pdpHeading: "Custom Raglan T-Shirt Manufacturer",
      pdpDescription:
        "Men's raglan-sleeve tee, one-piece sleeve extending to the collar with a diagonal seam, custom and private label, in performance polyester or a poly-spandex blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Raglan t-shirt, front view" },
        { alt: "Raglan t-shirt, sleeve seam detail" },
        { alt: "Raglan t-shirt, back view" },
        { alt: "Raglan t-shirt, fabric close-up" },
        { alt: "Raglan t-shirt, worn on model" },
        { alt: "Raglan t-shirt, flat lay" },
      ],
      pdpMetaTitle: "Custom Raglan T-Shirt Manufacturer",
      pdpMetaDescription:
        "Custom raglan t-shirt manufacturer, OEM, ODM and private label, diagonal raglan sleeve construction, performance polyester or poly-spandex blend, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Performance polyester or poly-spandex blend",
      pdpFabricPills: ["Performance polyester", "Poly-spandex blend", "Combed cotton", "Cotton-poly blend"],
      pdpCustomizationPills: ["Your weight", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "What is a raglan sleeve, and why choose it?",
          a: "The sleeve is cut in one piece that extends to the collar with a diagonal seam, instead of a standard set-in sleeve. It gives a slightly more relaxed range of motion at the shoulder and a distinct vintage-athletic look.",
        },
        {
          q: "What fabric is the raglan tee made from?",
          a: "Performance polyester or a poly-spandex blend as the default for the athletic construction, or a cotton-blend option is available. We confirm the exact blend and weight on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted", slug: "fitted-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Athletic", slug: "athletic-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Dropped-Shoulder", slug: "dropped-shoulder-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Relaxed", slug: "relaxed-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "See All", href: "/capriowear/activewear/t-shirts" },
      ],
      specifications: [
        { label: "Style", value: "Men's raglan-sleeve tee (base type)" },
        { label: "Fabric", value: "Performance polyester or poly-spandex blend, directional research range" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "True-to-size, raglan-sleeve construction" },
        { label: "Construction", value: "Cut-and-sew, one-piece raglan sleeve to collar, diagonal seam, double-needle stitching" },
        { label: "Branding", value: "Sublimation, screen, DTF, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Raglan t-shirt, construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "GSM held consistent, batch to batch",
        "Raglan seam checked for placement and finish consistency at every size",
        "Print durability tested for your fabric and method",
        "Shrinkage tested after wash, preshrink status stated",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation on polyester, screen, DTF", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Embroidery, silicone, heat transfer", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric and weight",
            body: "Any blend and GSM, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric and weight" },
          },
          {
            title: "Fit and build",
            body: "Raglan seam placement, body length, side-seam or tubular, to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit and build" },
          },
          {
            title: "Trims and finish",
            body: "Woven, printed or tear-away labels, care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      // Full PDP content for SKU 6 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 3.
      slug: "dropped-shoulder-mens",
      cardTitle: "Custom Dropped-Shoulder T-Shirt",
      cardSubline: "Dropped shoulder seam, streetwear staple",
      image: "",
      imageAlt: "Custom dropped-shoulder t-shirt manufacturer, men's",
      href: "/capriowear/activewear/t-shirts/dropped-shoulder-mens",
      gender: "Men",
      sku: "CAP-TEE-06",
      pdpTitle: "Dropped-Shoulder",
      pdpHeading: "Custom Dropped-Shoulder T-Shirt Manufacturer",
      pdpDescription:
        "Men's dropped-shoulder tee, seam sits below the natural shoulder line, custom and private label, in combed cotton or a cotton-poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Dropped-shoulder t-shirt, front view" },
        { alt: "Dropped-shoulder t-shirt, shoulder seam detail" },
        { alt: "Dropped-shoulder t-shirt, back view" },
        { alt: "Dropped-shoulder t-shirt, fabric close-up" },
        { alt: "Dropped-shoulder t-shirt, worn on model" },
        { alt: "Dropped-shoulder t-shirt, flat lay" },
      ],
      pdpMetaTitle: "Custom Dropped-Shoulder T-Shirt Manufacturer",
      pdpMetaDescription:
        "Custom dropped-shoulder t-shirt manufacturer, OEM, ODM and private label, streetwear-staple dropped shoulder seam, combed cotton or cotton-poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Combed cotton or cotton-poly blend",
      pdpFabricPills: ["Combed cotton", "Cotton-poly blend", "Tri-blend", "Recycled polyester"],
      pdpCustomizationPills: ["Your weight", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "How is this different from your Oversized T-Shirt?",
          a: "Related but distinct. This SKU is specified at a moderate shoulder drop on a relaxed, not fully boxy, body. Our Oversized T-Shirt combines a deeper shoulder drop with a fully boxy body. Both are adjustable to your tech pack.",
        },
        {
          q: "What fabric is the dropped-shoulder tee made from?",
          a: "Combed cotton or a cotton-poly blend as the default. We confirm the exact blend and weight on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Oversized", slug: "oversized-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Relaxed", slug: "relaxed-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "Raglan", slug: "raglan", href: "/capriowear/activewear/t-shirts" },
        { label: "Cropped", slug: "cropped-mens", href: "/capriowear/activewear/t-shirts" },
        { label: "See All", href: "/capriowear/activewear/t-shirts" },
      ],
      specifications: [
        { label: "Style", value: "Men's dropped-shoulder tee (base type)" },
        { label: "Fabric", value: "Combed cotton or cotton-poly blend, directional research range" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed through the body, moderate shoulder drop" },
        { label: "Construction", value: "Cut-and-sew, dropped-shoulder seam, side-seam or tubular body, double-needle stitching" },
        { label: "Branding", value: "Screen, DTG, DTF, embroidery, puff, labels and packaging" },
      ],
      specificationsImage: { alt: "Dropped-shoulder t-shirt, construction detail" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "GSM held consistent, batch to batch",
        "Shoulder-drop placement checked for consistency at every size",
        "Print durability tested for your fabric and method",
        "Shrinkage tested after wash, preshrink status stated",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Screen, DTG, DTF", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Embroidery, puff, silicone, heat transfer", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric and weight",
            body: "Any blend and GSM, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric and weight" },
          },
          {
            title: "Fit and build",
            body: "Shoulder-drop depth, body length, side-seam or tubular, to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit and build" },
          },
          {
            title: "Trims and finish",
            body: "Woven, printed or tear-away labels, care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "cropped-mens",
      cardTitle: "Custom Cropped T-Shirt",
      cardSubline: "Cropped body length",
      image: "",
      imageAlt: "Custom cropped t-shirt manufacturer, men's",
      href: "/capriowear/activewear/t-shirts/cropped-mens",
      gender: "Men",
      sku: "CAP-TEE-07",
    },
    {
      status: "draft",
      slug: "curved-hem",
      cardTitle: "Custom Curved-Hem T-Shirt",
      cardSubline: "Curved, dropped hem construction",
      image: "",
      imageAlt: "Custom curved-hem t-shirt manufacturer",
      href: "/capriowear/activewear/t-shirts/curved-hem",
      gender: "Men",
      sku: "CAP-TEE-08",
    },
    {
      status: "draft",
      // Full PDP content for SKU 9 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 3/6. Slug `fitted-womens` confirmed distinct
      // from men's `fitted-mens` (already live) -- no collision, same
      // gender-scoped-slug pattern already established on Tank Tops.
      slug: "fitted-womens",
      cardTitle: "Custom Fitted T-Shirt",
      cardSubline: "Close-fitting, standard crew neckline",
      image: "",
      imageAlt: "Custom fitted t-shirt manufacturer, women's",
      href: "/capriowear/activewear/t-shirts/fitted-womens",
      gender: "Women",
      sku: "CAP-TEE-09",
      pdpTitle: "Fitted",
      pdpHeading: "Custom Fitted T-Shirt Manufacturer",
      pdpDescription:
        "Women's close-fitting standard tee with a standard crew neckline, custom and private label, in combed cotton or a cotton-poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Fitted t-shirt, front view, women's" },
        { alt: "Fitted t-shirt, back view, women's" },
        { alt: "Fitted t-shirt, side profile, women's" },
        { alt: "Fitted t-shirt, fabric close-up" },
        { alt: "Fitted t-shirt, worn on model, women's" },
        { alt: "Fitted t-shirt, flat lay, women's" },
      ],
      pdpMetaTitle: "Custom Fitted T-Shirt Manufacturer",
      pdpMetaDescription:
        "Custom fitted t-shirt manufacturer, OEM, ODM and private label, close-fitting standard crew neckline, combed cotton or cotton-poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Combed cotton or cotton-poly blend",
      pdpFabricPills: ["Combed cotton", "Cotton-poly blend", "Tri-blend", "Performance polyester"],
      pdpCustomizationPills: ["Your weight", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "What fabric is the fitted tee made from?",
          a: "Combed cotton or a cotton-poly blend as the default, for a soft, tapered fitted cut. A performance polyester option is also available. We confirm the exact blend and weight on your sample.",
        },
        {
          q: "How does the women's cut differ from the men's Fitted tee?",
          a: "Same fabric options and construction quality, tapered through the waist rather than straight, a genuinely different pattern block, not just a scaled-down men's tee.",
        },
      ],
      relatedStyleTags: [
        { label: "Oversized", slug: "oversized-womens", href: "/capriowear/activewear/t-shirts" },
        { label: "Relaxed", slug: "relaxed-womens", href: "/capriowear/activewear/t-shirts" },
        { label: "Athletic", slug: "athletic-womens", href: "/capriowear/activewear/t-shirts" },
        { label: "Cropped", slug: "cropped-womens", href: "/capriowear/activewear/t-shirts" },
        { label: "See All", href: "/capriowear/activewear/t-shirts" },
      ],
      specifications: [
        { label: "Style", value: "Women's fitted tee, standard crew neckline (base type)" },
        { label: "Fabric", value: "Combed cotton or cotton-poly blend, directional research range" },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Close-fitting through the body, tapered cut" },
        { label: "Construction", value: "Cut-and-sew, side-seam or tubular body, double-needle stitched sleeves, hem and neck" },
        { label: "Branding", value: "Screen, DTG, DTF, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Fitted t-shirt, construction detail, women's" },
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "GSM held consistent, batch to batch",
        "Shrinkage tested after wash, preshrink status stated",
        "Print durability tested for your fabric and method",
        "Collar and hem hold their shape after repeated washing",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Screen, DTG, DTF", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Embroidery, puff, silicone, heat transfer", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric and weight",
            body: "Any blend and GSM, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric and weight" },
          },
          {
            title: "Fit and build",
            body: "Neckline, fit, side-seam or tubular, taping and stitching to your spec",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Fit and build" },
          },
          {
            title: "Trims and finish",
            body: "Woven, printed or tear-away labels, care labels, hangtags",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" },
          },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "oversized-womens",
      cardTitle: "Custom Oversized T-Shirt",
      cardSubline: "Boxy, dropped-shoulder oversized fit",
      image: "",
      imageAlt: "Custom oversized t-shirt manufacturer, women's",
      href: "/capriowear/activewear/t-shirts/oversized-womens",
      gender: "Women",
      sku: "CAP-TEE-10",
    },
    {
      status: "draft",
      slug: "relaxed-womens",
      cardTitle: "Custom Relaxed T-Shirt",
      cardSubline: "Roomier, non-fitted everyday cut",
      image: "",
      imageAlt: "Custom relaxed t-shirt manufacturer, women's",
      href: "/capriowear/activewear/t-shirts/relaxed-womens",
      gender: "Women",
      sku: "CAP-TEE-11",
    },
    {
      status: "draft",
      slug: "athletic-womens",
      cardTitle: "Custom Athletic T-Shirt",
      cardSubline: "True-to-size training cut",
      image: "",
      imageAlt: "Custom athletic t-shirt manufacturer, women's",
      href: "/capriowear/activewear/t-shirts/athletic-womens",
      gender: "Women",
      sku: "CAP-TEE-12",
    },
    {
      status: "draft",
      slug: "dropped-shoulder-womens",
      cardTitle: "Custom Dropped-Shoulder T-Shirt",
      cardSubline: "Dropped shoulder, oversized construction",
      image: "",
      imageAlt: "Custom dropped-shoulder t-shirt manufacturer, women's",
      href: "/capriowear/activewear/t-shirts/dropped-shoulder-womens",
      gender: "Women",
      sku: "CAP-TEE-13",
    },
    {
      status: "draft",
      slug: "cropped-womens",
      cardTitle: "Custom Cropped T-Shirt",
      cardSubline: "Cropped, baby-tee length",
      image: "",
      imageAlt: "Custom cropped t-shirt manufacturer, women's",
      href: "/capriowear/activewear/t-shirts/cropped-womens",
      gender: "Women",
      sku: "CAP-TEE-14",
    },
    {
      status: "draft",
      slug: "ringer",
      cardTitle: "Custom Ringer T-Shirt",
      cardSubline: "Contrast-color neckline and sleeve trim",
      image: "",
      imageAlt: "Custom ringer t-shirt manufacturer",
      href: "/capriowear/activewear/t-shirts/ringer",
      gender: "Women",
      sku: "CAP-TEE-15",
    },
    {
      status: "draft",
      slug: "v-neck",
      cardTitle: "Custom V-Neck T-Shirt",
      cardSubline: "V-neckline construction",
      image: "",
      imageAlt: "Custom v-neck t-shirt manufacturer",
      href: "/capriowear/activewear/t-shirts/v-neck",
      gender: "Women",
      sku: "CAP-TEE-16",
    },
  ],
  // Sibling Tops-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern every prior category's own relatedLinks already
  // establishes -- these become live the moment each one gets its own
  // content file.
  relatedLinks: [
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
    { label: "Tank Tops", href: "/capriowear/activewear/tank-tops" },
    { label: "Long-Sleeve Tops", href: "/capriowear/activewear/long-sleeve-tops" },
    { label: "Shorts", href: "/capriowear/activewear/shorts" },
  ],
};
