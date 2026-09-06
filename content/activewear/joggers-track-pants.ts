// content/activewear/joggers-track-pants.ts
// Ninth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every prior
// category (owner spec, 2026-09-02): no edits to app/activewear/
// [category]/page.tsx, app/activewear/[category]/[style]/page.tsx,
// app/sitemap.ts, or lib/schema.ts, only this file plus one line in
// ./categories.ts.
//
// Fourth real use of `weightTiers` (see Hoodies', Sweatshirts', and
// Long-Sleeve Tops' own header comments for the prior three) -- 3 tiers,
// scoped to fleece joggers only per this category's own given content
// (woven track pants run lighter and aren't part of the same tiered
// breakdown -- covered in `fabricNote` prose instead, same "only a real
// named-tier breakdown gets the table" rule Tank Tops' own header comment
// already established).
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

export const joggersTrackPants: Category = {
  slug: "joggers-track-pants",
  group: "Activewear",
  menuLabel: "Joggers & Track Pants",
  // Entity FAQ overrides (owner spec, 2026-09-02) -- "Joggers and Track
  // Pants" already reads correctly as both the manufacturer noun and the
  // product plural (it's a compound category name, already plural), so
  // `manufacturerNoun`/`productNounPlural` are identical here, matching
  // the owner's own given field values exactly rather than relying on the
  // `menuLabel` fallback (which would render the "&" literally instead of
  // "and") -- see categoryEntityFaq()'s own comment in ./pdpShared.ts.
  manufacturerNoun: "Joggers and Track Pants",
  productNounPlural: "joggers and track pants",
  entityExampleStyles: "cuffed jogger, open-hem, cargo, and woven track pant styles",
  entityFabrics: "French terry, brushed fleece and woven tricot",
  h1: "Custom Joggers and Track Pants Manufacturer",
  // metaTitle: owner's own given title is already the short 2-segment
  // form -- 56 rendered chars, under the ~60 char target, no deviation
  // needed (this category's own compound name runs naturally longer than
  // most single-word categories, but still fits).
  metaTitle: "Custom Joggers and Track Pants Manufacturer",
  // Trimmed to 132 chars (owner spec, 2026-09-04, QA audit fix) -- the
  // prior 165-char version sat right at the ~165 char flag line.
  metaDescription:
    "Custom joggers manufacturer and track pants manufacturer, fleece jogger or tricot track pant, tapered fit, ankle zip, low MOQ. Capriowear.",
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
    {
      fabric: "Polyester tricot (woven)",
      bestFor: "Woven track pants and warm-ups",
      performance: "Lightweight, slick, quick-dry, the classic track fabric",
    },
    {
      fabric: "Poly-spandex woven",
      bestFor: "Technical stretch track pants",
      performance: "Woven shell with built-in stretch and mobility",
    },
  ],
  // Weight tiers as their own real, liftable table (FabricOptions.tsx's
  // own `weightTiers` prop) -- scoped to fleece joggers only, matching
  // this category's own given content (woven track pants run lighter and
  // aren't part of the same tiered breakdown, covered in `fabricNote`
  // instead).
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
    { text: "Joggers are knit fleece with a tapered leg and ribbed cuff; track pants are woven with a straight leg and open hem or ankle zip. Tricot runs light (confirmed with the mill per program). Garment-dye available for premium fleece. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 6 fabrics above, in the same
  // order -- same "shortened, not derived" pattern every prior category's
  // own fabricPills already establishes.
  fabricPills: [
    "French terry",
    "Brushed fleece",
    "Cotton-poly blend",
    "Heavyweight fleece",
    "Polyester tricot",
    "Poly-spandex woven",
  ],
  qualityHeading: "The taper you approve, at every size",
  qualitySubline: "We confirm the taper, cuff and fabric on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Thigh, knee and calf width graded proportional across the full size range",
    "Ankle cuff rib holds its gathered shape, no sagging",
    "Gusset seam stress-tested at the crotch",
    "Track pant ankle zips tested for function and durability",
    "GSM consistent, shrinkage tested after wash, brushed fleece checked for pilling",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "French terry, brushed fleece, cotton-poly (joggers), or polyester tricot, nylon, poly-spandex woven (track pants)",
    },
    { title: "Weight and fit", body: "240 to 400+ GSM fleece, tapered, slim, wide-leg or straight" },
    { title: "Hem and cuff", body: "Ribbed ankle cuff, open hem, or ankle zip" },
    {
      title: "Waistband and pockets",
      body: "Elastic, drawcord or tunnel waistband, side, back, cargo, zip or mesh pockets, gusset",
    },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, screen, DTG, DTF, embroidery, sublimation on woven track pants, garment-dye",
    },
    { title: "Labels and packaging", body: "Woven, printed or tear-away labels, hangtags, retail-ready packaging" },
  ],
  // Same heading every prior category's own faqHeading already uses --
  // confirmed intentional reuse, since every question below it is
  // genuinely jogger/track-pant-specific. The entity question itself is
  // NOT stored here -- app/activewear/[category]/page.tsx builds it per
  // category via categoryEntityFaq() and prepends it at render time (see
  // that function's own comment in ./pdpShared.ts), so it can never drift
  // out of sync with what any style page under this category generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom joggers and track pants?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a fleece jogger and a tricot track pant?",
      a: "A jogger is knit fleece or French terry with a tapered leg and a ribbed ankle cuff, for athleisure. A track pant is woven tricot or nylon with a straight leg and an open hem or ankle zip, for athletic warm-ups. A sweatpant is heavier knit fleece with a straight leg, for warmth and lounge. We make all three.",
    },
    {
      q: "Is a track pant woven or knit fabric?",
      a: "French terry (260 to 340 GSM), brushed fleece (280 to 380 GSM), cotton-poly (240 to 300 GSM) and heavyweight fleece (up to 400+ GSM) for joggers and sweatpants, and lightweight polyester tricot or poly-spandex woven for track pants.",
    },
    {
      q: "Can you customize the taper and leg width?",
      a: "Yes. Thigh, knee and calf width are set to your tech pack, from slim tapered to wide-leg or flared, and graded proportionally across sizes.",
    },
    {
      q: "Do track pants come with an ankle zip?",
      a: "A ribbed ankle cuff for a gathered jogger, or an open hem or ankle zip for a straight-leg track pant.",
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
      a: "Screen, DTG, DTF and embroidery on fleece, sublimation on woven track pants, plus garment-dye for premium fleece.",
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
      q: "How are joggers and track pants sized?",
      a: "Alpha XS to 5XL, and men's can also be graded by waist inch. Taper and leg width are graded proportionally at every size.",
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
  //
  // cardTitle form is "Custom [Style]" here, not "Custom [Style]
  // [Category]" (unlike every prior category) -- the owner's own given
  // titles ("Custom Classic Cuffed Jogger", "Custom Woven Track Pant",
  // etc.) already name the specific garment type per card (jogger vs.
  // track pant vs. sweatpant), since this category covers more than one
  // garment shape; appending a shared category suffix would be redundant
  // on cards that already say "Jogger" or "Track Pant" in their own name.
  styleCards: [
    {
      status: "draft",
      slug: "cuffed-jogger",
      cardTitle: "Custom Classic Cuffed Jogger",
      cardSubline: "Tapered leg, ribbed ankle cuff",
      image: "",
      imageAlt: "Custom classic cuffed jogger, tapered leg, ribbed ankle cuff",
      href: "/activewear/joggers-track-pants/cuffed-jogger",
    },
    {
      status: "draft",
      slug: "track-pant",
      cardTitle: "Custom Woven Track Pant",
      cardSubline: "Tricot shell, open hem or ankle zip",
      image: "",
      imageAlt: "Custom woven track pant, tricot shell, open hem or ankle zip",
      href: "/activewear/joggers-track-pants/track-pant",
    },
    {
      status: "draft",
      slug: "open-hem",
      cardTitle: "Custom Open-Hem Jogger",
      cardSubline: "Jogger taper, straight hem",
      image: "",
      imageAlt: "Custom open-hem jogger, jogger taper, straight hem",
      href: "/activewear/joggers-track-pants/open-hem",
    },
    {
      status: "draft",
      slug: "cargo",
      cardTitle: "Custom Cargo Jogger",
      cardSubline: "Cargo pockets, utility fit",
      image: "",
      imageAlt: "Custom cargo jogger, cargo pockets, utility fit",
      href: "/activewear/joggers-track-pants/cargo",
    },
    {
      status: "draft",
      slug: "slim",
      cardTitle: "Custom Slim Tapered Jogger",
      cardSubline: "Closer cut through the leg",
      image: "",
      imageAlt: "Custom slim tapered jogger, closer cut through the leg",
      href: "/activewear/joggers-track-pants/slim",
    },
    {
      status: "draft",
      slug: "wide-leg",
      cardTitle: "Custom Wide-Leg Jogger",
      cardSubline: "Loose or flared, heavyweight fleece",
      image: "",
      imageAlt: "Custom wide-leg jogger, loose or flared, heavyweight fleece",
      href: "/activewear/joggers-track-pants/wide-leg",
    },
    {
      status: "draft",
      slug: "sweatpant",
      cardTitle: "Custom Sweatpant",
      cardSubline: "Heavier fleece, straight leg",
      image: "",
      imageAlt: "Custom sweatpant, heavier fleece, straight leg",
      href: "/activewear/joggers-track-pants/sweatpant",
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
    { label: "Sports Bras", href: "/activewear/sports-bras" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
  ],
};
