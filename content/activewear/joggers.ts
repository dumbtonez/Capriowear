// content/activewear/joggers.ts
// Ninth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every prior
// category (owner spec, 2026-09-02): no edits to app/activewear/
// [category]/page.tsx, app/activewear/[category]/[style]/page.tsx,
// app/sitemap.ts, or lib/schema.ts, only this file plus one line in
// ./categories.ts.
//
// Renamed from "Joggers & Track Pants" to "Joggers" (owner spec,
// 2026-09-18): track pants removed as a product line entirely -- the
// woven track-pant style card, its two woven fabric rows, its
// ankle-zip trust bullet and every FAQ mention were dropped. Old slug
// "joggers-track-pants" now 301s to this category via next.config.ts
// (see decision log, docs/05-plan.md).
//
// Fourth real use of `weightTiers` (see Hoodies', Sweatshirts', and
// Long-Sleeve Tops' own header comments for the prior three) -- 3 tiers,
// scoped to fleece joggers, same "only a real named-tier breakdown gets
// the table" rule Tank Tops' own header comment already established.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave ("Share
// your tech pack, sketch or a reference pant, we'll develop it with
// you.") -- standing rule, owner spec, 2026-09-02 (see Sweatshirts' and
// Long-Sleeve Tops' own header comments and the decision log entries of
// the same date): every category file uses Leggings' own ctaSubline
// verbatim, regardless of what a category's own brief supplies here.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const joggers: Category = {
  slug: "joggers",
  group: "Activewear",
  menuLabel: "Joggers",
  manufacturerNoun: "Joggers",
  productNounPlural: "joggers",
  entityExampleStyles: "cuffed, open-hem, cargo, slim-tapered, and wide-leg styles",
  entityFabrics: "French terry, brushed fleece and heavyweight cotton fleece",
  h1: "Custom Joggers Manufacturer",
  metaTitle: "Custom Joggers Manufacturer",
  // Trimmed to fit the ~165 char flag line (owner spec, 2026-09-04, QA
  // audit fix precedent) after the 2026-09-18 track-pants removal.
  metaDescription: "Custom joggers manufacturer, fleece jogger, tapered fit, ribbed cuff, low MOQ. Capriowear.",
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
      fabric: "French terry (loopback)",
      bestFor: "The default jogger fabric, breathable with light stretch",
      performance: "Smooth face, looped interior, breathes, holds shape (260 to 340 GSM)",
    },
    {
      fabric: "Brushed fleece",
      bestFor: "Warmer, cozier joggers near a sweatpant feel",
      performance: "Napped soft interior, warmth (280 to 380 GSM)",
    },
    {
      fabric: "Cotton-poly blend",
      bestFor: "Lightweight everyday joggers",
      performance: "Balanced cost and shrink control (240 to 300 GSM)",
    },
    {
      fabric: "Heavyweight cotton fleece",
      bestFor: "Premium and streetwear joggers, wide-leg",
      performance: "Structured, substantial (up to 400+ GSM)",
    },
    // Added with the Wide-Leg Woven Jogger draft style below (owner spec,
    // 2026-09-18): the category's first non-fleece row -- a lightweight
    // woven shell, not knit. Weight is confirmed against that style's own
    // real reference; exact weave (plain vs. tricot) isn't, so "quick-dry"
    // and the GSM figure are the only performance claims made here.
    {
      fabric: "Polyester (lightweight woven)",
      bestFor: "Wide-leg, open-hem joggers, everyday athletic wear",
      performance: "Lightweight shell, quick-dry (110 GSM; weave confirmed on sample)",
    },
  ],
  // Weight tiers as their own real, liftable table (FabricOptions.tsx's
  // own `weightTiers` prop).
  weightTiers: [
    {
      tier: "Lightweight jogger",
      gsm: "240 to 300 GSM",
      bestFor: "Cotton-poly or lighter terry, everyday casual",
    },
    {
      tier: "Midweight jogger",
      gsm: "260 to 340 GSM",
      bestFor: "French terry, the standard jogger band",
    },
    {
      tier: "Heavyweight jogger",
      gsm: "380 to 400+ GSM",
      bestFor: "Streetwear, wide-leg and flared",
    },
  ],
  fabricNote: [
    { text: "Joggers are knit fleece with a tapered leg and ribbed cuff, from lightweight cotton-poly to heavyweight cotton fleece. Garment-dye available for premium fleece. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 4 fabrics above, in the same
  // order -- same "shortened, not derived" pattern every prior category's
  // own fabricPills already establishes.
  fabricPills: ["French terry", "Brushed fleece", "Cotton-poly blend", "Heavyweight fleece"],
  qualityHeading: "The taper you approve, at every size",
  qualitySubline: "We confirm the taper, cuff and fabric on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Thigh, knee and calf width graded proportional across the full size range",
    "Ankle cuff rib holds its gathered shape, no sagging",
    "Gusset seam stress-tested at the crotch",
    "GSM consistent, shrinkage tested after wash, brushed fleece checked for pilling",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "French terry, brushed fleece, cotton-poly, lightweight polyester, polyester tricot or poly-spandex woven",
    },
    {
      title: "Detailing",
      body: "Contrast piping, paneling or color-blocking to your spec",
    },
    { title: "Weight and fit", body: "240 to 400+ GSM fleece, tapered, slim, wide-leg or straight" },
    { title: "Hem and cuff", body: "Ribbed ankle cuff or open hem" },
    {
      title: "Waistband and pockets",
      body: "Elastic, drawcord or tunnel waistband, side, back, cargo, zip or mesh pockets, gusset",
    },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, screen, DTG, DTF, embroidery, garment-dye",
    },
    { title: "Labels and packaging", body: "Woven, printed or tear-away labels, hangtags, retail-ready packaging" },
  ],
  // Same heading every prior category's own faqHeading already uses --
  // confirmed intentional reuse, since every question below it is
  // genuinely jogger-specific. The entity question itself is NOT stored
  // here -- app/activewear/[category]/page.tsx builds it per category via
  // categoryEntityFaq() and prepends it at render time (see that
  // function's own comment in ./pdpShared.ts), so it can never drift out
  // of sync with what any style page under this category generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom joggers?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a jogger and a sweatpant?",
      a: "A jogger is knit fleece or French terry with a tapered leg and a ribbed ankle cuff, for athleisure. A sweatpant is heavier knit fleece with a straight leg, for warmth and lounge. We make both, as a joggers manufacturer serving activewear and teamwear brands worldwide.",
    },
    {
      q: "What fabric and weight are your joggers made from?",
      a: "French terry (260 to 340 GSM), brushed fleece (280 to 380 GSM), cotton-poly (240 to 300 GSM) and heavyweight fleece (up to 400+ GSM).",
    },
    {
      q: "Can you customize the taper and leg width?",
      a: "Yes. Thigh, knee and calf width are set to your tech pack, from slim tapered to wide-leg or flared, and graded proportionally across sizes.",
    },
    {
      q: "What pocket and waistband options do you offer?",
      a: "Side, back, cargo, zip or lightweight mesh pockets, and an elastic, drawcord or tunnel waistband, with an optional gusset for movement.",
    },
    {
      q: "Can you match a specific fabric or a reference pant?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What print and branding methods can you do?",
      a: "Screen, DTG, DTF and embroidery on fleece, plus garment-dye for premium fleece.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, weight, fit, taper, cuff or hem, waistband, pockets, gusset, color and finish, print and embroidery, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are joggers sized?",
      a: "Alpha XS to 5XL, and men's can also be graded by waist inch. Taper and leg width are graded proportionally at every size.",
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
      a: "Send your tech pack, sketch or a reference pant by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // FinalCta's own h2/cta and the compliance bar's own items already match
  // content/home.ts's own shared finalCta/complianceTicker verbatim --
  // app/activewear/[category]/page.tsx reuses those directly, same as
  // every prior category. ctaReferenceNoun swaps this category's own noun
  // into the shared subline template (buildCtaSubline(), ./pdpShared.ts) --
  // owner spec, 2026-09-04.
  ctaReferenceNoun: "jogger",
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
      slug: "cuffed-jogger",
      cardTitle: "Custom Classic Cuffed Jogger",
      cardSubline: "Tapered leg, ribbed ankle cuff",
      image: "",
      imageAlt: "Custom classic cuffed jogger, tapered leg, ribbed ankle cuff",
      href: "/capriowear/activewear/joggers/cuffed-jogger",
    },
    {
      status: "draft",
      slug: "open-hem",
      cardTitle: "Custom Open-Hem Jogger",
      cardSubline: "Jogger taper, straight hem",
      image: "",
      imageAlt: "Custom open-hem jogger, jogger taper, straight hem",
      href: "/capriowear/activewear/joggers/open-hem",
    },
    // Sourced from a real reference product (owner spec, 2026-09-18): a
    // youngla.com wide-leg woven pant. No reference product name or
    // numbering appears anywhere below -- that's the reference's own
    // proprietary naming, not a generic industry term. Only facts stated
    // in the reference's own text or visually confirmed in its photos are
    // stated as fact here (composition, weight, fit, waistband being
    // adjustable, the contrast piping, the open hem); the reference never
    // says "woven" outright (it says "lightweight construction") and never
    // states an exact waistband mechanism, pocket count/placement, or seam
    // type, so those stay framed as customizable/sample-confirmed rather
    // than locked specs, both in `specifications` and `faqs` below. Full
    // PDP content authored now even though `status` stays "draft" (owner
    // spec) -- unlike this category's other 5 cards (card-only, no PDP
    // content yet), this one's ready to flip to "published" once real
    // photography and a confirmed sample exist.
    //
    // `internalPreview: true` (owner spec, 2026-09-18) -- the same
    // owner-only escape hatch already used on 5 Gear/Weight Lifting Belts
    // styles (see `StyleCard.internalPreview`'s own comment): the PLP card
    // becomes a real clickable link and the PDP route renders for internal
    // review, but every other "draft" gate stays exactly as `status`'s own
    // comment describes -- noindex/nofollow, excluded from app/sitemap.ts,
    // Product/FAQPage JSON-LD withheld. No other card in this file carries
    // this flag. Remove it (leaving `status: "draft"`, or flip to
    // "published") once this style is ready for real launch.
    {
      status: "draft",
      internalPreview: true,
      slug: "wide-leg-woven-jogger",
      cardTitle: "Custom Wide-Leg Woven Jogger",
      cardSubline: "Lightweight woven, 110 GSM, adjustable waist",
      image: "",
      imageAlt: "Custom wide-leg woven jogger with adjustable waistband and open hem",
      href: "/capriowear/activewear/joggers/wide-leg-woven-jogger",
      pdpTitle: "Wide-Leg Woven Jogger",
      sku: "CAP-JOG-01",
      pdpHeading: "Custom Wide-Leg Woven Jogger Manufacturer",
      pdpDescription:
        "Wide-leg woven jogger, custom and private label, in a lightweight 100% polyester shell at 110 GSM with an adjustable waistband and open hem, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Wide-Leg Woven Jogger Manufacturer",
      pdpMetaDescription:
        "Custom wide-leg woven jogger manufacturer, 100% polyester, lightweight 110 GSM, adjustable waist, open hem, low MOQ, full customization. DDP worldwide.",
      material: "100% polyester, lightweight construction",
      // Offered fabric options for this style, not claims about the
      // reference itself -- only "Lightweight polyester (110 GSM)" is a
      // confirmed fact; tricot and poly-spandex are customization options.
      pdpFabricPills: ["Lightweight polyester (110 GSM)", "Polyester tricot", "Poly-spandex woven"],
      pdpCustomizationPills: ["Your fit", "Your branding", "Custom labels", "Custom packaging"],
      faqs: [
        {
          q: "What fabric and weight is the wide-leg woven jogger?",
          a: "100% polyester in a lightweight construction at 110 GSM. The exact weave and hand are confirmed and matched on your first sample.",
        },
        {
          q: "Can I customize the leg, hem, waistband, and pockets?",
          a: "Yes. Wide-leg width, an open hem or ankle zip, waistband mechanism, and pocket placement are all made to your tech pack.",
        },
        {
          q: "What's the difference between this and your fleece joggers?",
          a: "The wide-leg woven jogger uses a lightweight polyester shell with a loose leg and open hem. Our fleece joggers use knit fabric with a tapered leg and ribbed cuff. We make both.",
        },
      ],
      relatedStyleTags: [
        { label: "Cuffed Jogger", href: "/capriowear/activewear/joggers/cuffed-jogger" },
        { label: "Open-Hem", href: "/capriowear/activewear/joggers/open-hem" },
        { label: "Cargo", href: "/capriowear/activewear/joggers/cargo" },
        { label: "Slim", href: "/capriowear/activewear/joggers/slim" },
        { label: "Wide-Leg", href: "/capriowear/activewear/joggers/wide-leg" },
        { label: "See All", href: "/capriowear/activewear/joggers" },
      ],
      specifications: [
        { label: "Style", value: "Wide-leg woven jogger, loose fit (base type)" },
        { label: "Fabric", value: "100% polyester, lightweight construction" },
        { label: "Weight", value: "110 GSM" },
        { label: "Leg", value: "Wide-leg, loose fit; thigh, knee and calf width to your spec" },
        { label: "Hem", value: "Open hem, no cuff; ankle zip available on request" },
        { label: "Waistband", value: "Adjustable elastic waistband; exact mechanism (drawcord or tunnel) confirmed on your sample" },
        { label: "Detailing", value: "Contrast piping running through the leg, to your color and placement" },
        {
          label: "Weave, pockets and construction",
          value: "Not shown on the reference build; fabric weave, pocket placement and seam type confirmed against your tech pack and sample",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, embroidery, custom labels and packaging" },
      ],
      pdpQualityHeading: "The fit you approve, at every size",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut",
      pdpQualityPoints: [
        "Wide-leg width graded proportional across the size range",
        "Open hem finish clean and consistent, no fraying",
        "Piping placement and stitching checked for durability",
        "GSM and hand confirmed against your sample before bulk cut",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "cargo",
      cardTitle: "Custom Cargo Jogger",
      cardSubline: "Cargo pockets, utility fit",
      image: "",
      imageAlt: "Custom cargo jogger, cargo pockets, utility fit",
      href: "/capriowear/activewear/joggers/cargo",
    },
    {
      status: "draft",
      slug: "slim",
      cardTitle: "Custom Slim Tapered Jogger",
      cardSubline: "Closer cut through the leg",
      image: "",
      imageAlt: "Custom slim tapered jogger, closer cut through the leg",
      href: "/capriowear/activewear/joggers/slim",
    },
    {
      status: "draft",
      slug: "wide-leg",
      cardTitle: "Custom Wide-Leg Jogger",
      cardSubline: "Loose or flared, heavyweight fleece",
      image: "",
      imageAlt: "Custom wide-leg jogger, loose or flared, heavyweight fleece",
      href: "/capriowear/activewear/joggers/wide-leg",
    },
    {
      status: "draft",
      slug: "sweatpant",
      cardTitle: "Custom Sweatpant",
      cardSubline: "Heavier fleece, straight leg",
      image: "",
      imageAlt: "Custom sweatpant, heavier fleece, straight leg",
      href: "/capriowear/activewear/joggers/sweatpant",
    },
  ],
  // Sibling Bottoms-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern every prior category's own relatedLinks already
  // establishes -- these become live the moment each one gets its own
  // content file.
  relatedLinks: [
    { label: "Leggings", href: "/capriowear/activewear/leggings" },
    { label: "Shorts", href: "/capriowear/activewear/shorts" },
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
    { label: "Compression & Base Layers", href: "/capriowear/activewear/compression-base-layers" },
  ],
};
