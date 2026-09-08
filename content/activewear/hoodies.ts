// content/activewear/hoodies.ts
// Sixth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every prior
// category (owner spec, 2026-09-02): no edits to app/activewear/
// [category]/page.tsx, app/activewear/[category]/[style]/page.tsx,
// app/sitemap.ts, or lib/schema.ts, only this file plus one line in
// ./categories.ts.
//
// First real second use of `weightTiers` (FabricOptions.tsx's own
// optional secondary table, added for T-Shirts) -- Hoodies genuinely has
// the same shape of data T-Shirts did (a clean, named-tier breakdown
// spanning the whole fabric range), unlike Tank Tops, which only had two
// per-construction GSM callouts and stayed prose. Confirms the block is
// reusable across categories, not a one-off built only for T-Shirts.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const hoodies: Category = {
  slug: "hoodies",
  group: "Activewear",
  menuLabel: "Hoodies",
  // Entity FAQ overrides (owner spec, 2026-09-02) -- "Hoodie" (singular)
  // reads correctly in "a custom Hoodie manufacturer", "hoodies" (plural)
  // in "private label hoodies" -- see categoryEntityFaq()'s own comment
  // in ./pdpShared.ts.
  manufacturerNoun: "Hoodie",
  productNounPlural: "hoodies",
  entityExampleStyles: "pullover, full-zip, oversized, and cropped styles",
  entityFabrics: "French terry and brushed fleece",
  h1: "Custom Hoodie Manufacturer",
  // metaTitle: owner's own given title is already the short 2-segment
  // form -- 39 rendered chars, comfortably under the ~60 char target, no
  // deviation needed.
  metaTitle: "Custom Hoodie Manufacturer",
  // Trimmed to 134 chars (owner spec, 2026-09-04, QA audit fix) -- the
  // prior 172-char version ran past the ~165 char flag line.
  metaDescription:
    "Custom hoodie manufacturer, heavyweight 400 to 500 GSM French terry or brushed fleece, garment-dye finish, low MOQ. Capriowear.",
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
      fabric: "French terry (loopback, unbrushed)",
      bestFor: "Structured, breathable hoodies, screen print and DTG",
      performance: "Smooth face, looped interior, breathes, resists pilling, holds its shape",
    },
    {
      fabric: "Brushed fleece",
      bestFor: "Warmer, plusher classic hoodie feel, embroidery",
      performance: "Napped soft interior, warmer at the same weight, a fuller hand for dimensional embroidery",
    },
    {
      fabric: "Cotton-poly blend (commonly 80/20)",
      bestFor: "Retail, promo and uniform programs",
      performance: "Balances cost, shrink control and embroidery stability",
    },
    {
      fabric: "100% cotton, compacted",
      bestFor: "Premium retail and streetwear",
      performance: "Softer hand, compacted for shrink control",
    },
    {
      fabric: "Recycled fiber blend",
      bestFor: "Sustainable lines",
      performance: "Comparable to standard cotton-poly, eco-positioning",
    },
  ],
  // Weight tiers as their own real, liftable table (FabricOptions.tsx's
  // own `weightTiers` prop) -- see this file's own header comment for why
  // this category uses it, unlike Tank Tops.
  weightTiers: [
    {
      tier: "Lightweight",
      gsm: "240 to 320 GSM",
      bestFor: "Layering, spring and fall drops, promo and uniform programs",
    },
    {
      tier: "Midweight",
      gsm: "300 to 400 GSM",
      bestFor: "The most common band for retail brands, everyday hoodies",
    },
    {
      tier: "Heavyweight",
      gsm: "400 to 500 GSM",
      bestFor: "Premium streetwear, drop-shoulder cuts, dimensional embroidery",
    },
    {
      tier: "Ultra-heavyweight",
      gsm: "500 to 650+ GSM",
      bestFor: "Luxury basics, cold-climate and statement pieces",
    },
  ],
  fabricNote: [
    { text: "Ribbed cuffs and waistband carry " },
    { text: "5 to 8% spandex", bold: true },
    { text: " for recovery. Garment-dye finish available as a premium option. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric or GSM", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 5 fabrics above, in the same
  // order -- same "shortened, not derived" pattern every prior category's
  // own fabricPills already establishes.
  fabricPills: ["French terry", "Brushed fleece", "Cotton-poly blend", "Compacted cotton", "Recycled blend"],
  qualityHeading: "The weight you approve, wash after wash",
  qualitySubline: "We confirm GSM, shrinkage and rib recovery on your sample before a single bulk piece is cut",
  qualityPoints: [
    "GSM held consistent, batch to batch, not just on the approved sample",
    "Shrinkage tested after wash, targeted under 5%",
    "Brushed fleece checked for pilling",
    "Cuff and hem ribbing hold their recovery, no bagging",
    "Kangaroo pocket corners bar-tacked and stress-tested",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "French terry or brushed fleece, cotton, cotton-poly and recycled blends" },
    { title: "Weight and fit", body: "Lightweight to ultra-heavyweight, 240 to 650+ GSM, regular, oversized or cropped" },
    {
      title: "Construction",
      body: "Single or double-layer hood, kangaroo, pouch, hidden-zip or no pocket, set-in or drop-shoulder sleeve, ribbed cuffs and hem",
    },
    {
      title: "Hardware and finish",
      body: "Flat drawcord, metal or plastic eyelets and aglets, zip type, standard or garment-dye",
    },
    { title: "Color and print", body: "Custom colors with Pantone matching, screen, DTG, DTF, embroidery, puff, patches" },
    { title: "Labels and packaging", body: "Woven, printed or tear-away labels, hangtags, retail-ready packaging" },
  ],
  // Same heading every prior category's own faqHeading already uses --
  // confirmed intentional reuse, since every question below it is
  // genuinely hoodie-specific. The entity question itself is NOT stored
  // here -- app/activewear/[category]/page.tsx builds it per category via
  // categoryEntityFaq() and prepends it at render time (see that
  // function's own comment in ./pdpShared.ts), so it can never drift out
  // of sync with what any style page under this category generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom hoodies?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between French terry and brushed fleece?",
      a: "French terry has a smooth face and a looped interior, breathable, resists pilling, and takes screen print crisply. Brushed fleece is napped on the inside for a warmer, plusher hand and a fuller finish for embroidery. Both come in the same GSM weight tiers.",
    },
    {
      q: "What GSM counts as a heavyweight hoodie?",
      a: "Lightweight 240 to 320 GSM for layering and promo, midweight 300 to 400 GSM for everyday retail hoodies, heavyweight 400 to 500 GSM for premium streetwear, and ultra-heavyweight 500 to 650+ GSM for statement pieces.",
    },
    {
      q: "Can you match a specific GSM or a reference hoodie?",
      a: "Yes. Send a reference or tech pack and we match the fabric construction, GSM and hand-feel, then confirm on your sample.",
    },
    {
      q: "What hood and pocket options can you make?",
      a: "Single or double-layer hoods (double-layer holds its shape better and reads premium), kangaroo, pouch, hidden-zip or no pocket, with bar-tacked corners at stress points.",
    },
    {
      q: "Do you offer a garment-dyed finish and premium hardware?",
      a: "Yes. A garment-dye finish is available as a premium option, along with metal or plastic eyelets and aglets on the drawcord, your choice of zip type, and a double-layer hood for a more structured, premium build.",
    },
    {
      q: "What print and branding methods can you do on fleece?",
      a: "Embroidery, puff, screen print, DTG, DTF, and patches. Brushed fleece gives embroidery a fuller finish; French terry takes screen print more crisply. Heavier weights hold embroidery best, below about 280 GSM embroidery can pucker.",
    },
    {
      q: "Will my hoodies shrink or pill?",
      a: "We test shrinkage after wash, targeting under 5%, and check brushed fleece for pilling, before bulk. Ribbing is spandex-reinforced to hold its recovery.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, weight, fit, hood, pocket, hardware, drawcord, cuffs, color and finish (including garment-dye), print and embroidery, your logos, labels, hangtags and packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM and private label hoodies?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are hoodies sized?",
      a: "Alpha XS to 5XL. Unisex, men's and women's fits use the same size range with a different cut, unisex is boxier, women's is tapered, cropped leans women's and lifestyle.",
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
      a: "Send your tech pack, sketch or a reference hoodie by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // FinalCta's own h2/cta and the compliance bar's own items already match
  // content/home.ts's own shared finalCta/complianceTicker verbatim --
  // app/activewear/[category]/page.tsx reuses those directly, same as
  // every prior category. ctaSubline itself is the same standing line
  // every category uses verbatim (owner spec, 2026-09-02: "I told you to
  // use the same cta subline that you used in leggings, it should be
  // every page next you build") -- Leggings' own original wording,
  // unchanged, not a per-category rewrite.
  ctaReferenceNoun: "hoodie",
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
      slug: "pullover",
      cardTitle: "Custom Pullover Hoodie",
      cardSubline: "Kangaroo pocket, French terry or brushed fleece",
      image: "",
      imageAlt: "Custom pullover hoodie, kangaroo pocket, French terry or brushed fleece",
      href: "/activewear/hoodies/pullover",
    },
    {
      status: "draft",
      slug: "oversized",
      cardTitle: "Custom Oversized Boxy Hoodie",
      cardSubline: "Heavyweight 400+ GSM, structured fit",
      image: "",
      imageAlt: "Custom oversized boxy hoodie, heavyweight 400+ GSM structured fit",
      href: "/activewear/hoodies/oversized",
    },
    {
      status: "draft",
      slug: "full-zip",
      cardTitle: "Custom Full-Zip Hoodie",
      cardSubline: "Front zip, metal or molded hardware",
      image: "",
      imageAlt: "Custom full-zip hoodie, front zip, metal or molded hardware",
      href: "/activewear/hoodies/full-zip",
    },
    {
      status: "draft",
      slug: "cropped",
      cardTitle: "Custom Cropped Hoodie",
      cardSubline: "Shortened body length",
      image: "",
      imageAlt: "Custom cropped hoodie, shortened body length",
      href: "/activewear/hoodies/cropped",
    },
    {
      status: "draft",
      slug: "quarter-zip",
      cardTitle: "Custom Quarter-Zip Hoodie",
      cardSubline: "Partial zip, lighter hood",
      image: "",
      imageAlt: "Custom quarter-zip hoodie, partial zip, lighter hood",
      href: "/activewear/hoodies/quarter-zip",
    },
    {
      status: "draft",
      slug: "stringless",
      cardTitle: "Custom Stringless Hoodie",
      cardSubline: "Clean front, no drawcord or pocket",
      image: "",
      imageAlt: "Custom stringless hoodie, clean front, no drawcord or pocket",
      href: "/activewear/hoodies/stringless",
    },
  ],
  // Sibling Tops-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern every prior category's own relatedLinks already
  // establishes -- these become live the moment each one gets its own
  // content file.
  relatedLinks: [
    { label: "Sweatshirts", href: "/activewear/sweatshirts" },
    { label: "T-Shirts", href: "/activewear/t-shirts" },
    { label: "Long-Sleeve Tops", href: "/activewear/long-sleeve-tops" },
    { label: "Tank Tops", href: "/activewear/tank-tops" },
  ],
};
