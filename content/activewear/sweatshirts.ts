// content/activewear/sweatshirts.ts
// Seventh real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every prior
// category (owner spec, 2026-09-02): no edits to app/activewear/
// [category]/page.tsx, app/activewear/[category]/[style]/page.tsx,
// app/sitemap.ts, or lib/schema.ts, only this file plus one line in
// ./categories.ts.
//
// Second real use of `weightTiers` (see Hoodies' own header comment for
// the first) -- Sweatshirts has the same shape of data (a clean,
// named-tier breakdown), just 3 tiers here, not 4 (this brief's own given
// content has no ultra-heavyweight tier for crewnecks the way Hoodies
// does).
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave
// ("Share your tech pack, sketch or a reference sweatshirt, we'll
// develop it with you.") -- owner correction, same day: "I told you to
// use the same cta subline that you used in leggings, it should be every
// page next you build," applied retroactively to every prior category's
// own file at the same time this one was built (see the decision log
// entry, 2026-09-02).
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const sweatshirts: Category = {
  slug: "sweatshirts",
  group: "Activewear",
  menuLabel: "Sweatshirts",
  // Entity FAQ overrides (owner spec, 2026-09-02) -- "Sweatshirt"
  // (singular) reads correctly in "a custom Sweatshirt manufacturer",
  // "sweatshirts" (plural) in "private label sweatshirts" -- see
  // categoryEntityFaq()'s own comment in ./pdpShared.ts.
  manufacturerNoun: "Sweatshirt",
  productNounPlural: "sweatshirts",
  entityExampleStyles: "crewneck, half-zip, oversized, and cropped styles",
  entityFabrics: "French terry and brushed fleece",
  h1: "Custom Sweatshirt Manufacturer",
  // metaTitle leads with "Crewneck Sweatshirt" (SEO/AEO refresh, owner
  // spec: "own crewneck sweatshirt manufacturer as its own head term") --
  // H1 stays the broader "Sweatshirt" (not in this pass's H1-change list),
  // same deliberate H1/title split as Long-Sleeve Tops' own metaTitle.
  metaTitle: "Custom Crewneck Sweatshirt Manufacturer",
  metaDescription:
    "Custom crewneck sweatshirt manufacturer, half-zip and quarter-zip, ribbed collar, French terry or brushed fleece, low MOQ. Capriowear.",
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
      bestFor: "Structured, breathable crewnecks, screen print and DTG",
      performance: "Smooth face, looped interior, breathes, resists pilling, holds its shape",
    },
    {
      fabric: "Brushed fleece",
      bestFor: "Warmer, plusher crewneck feel, embroidery",
      performance: "Napped soft interior, warmer at the same weight, a fuller hand for dimensional embroidery",
    },
    {
      fabric: "Cotton-poly blend (commonly 80/20)",
      bestFor: "Retail, promo, collegiate and corporate programs",
      performance: "Balances cost, shrink control and embroidery stability",
    },
    {
      fabric: "100% cotton, compacted",
      bestFor: "Premium retail and streetwear",
      performance: "Softer hand, compacted for shrink control",
    },
    {
      fabric: "Tri-blend fleece (poly / combed cotton / rayon)",
      bestFor: "Premium, soft vintage hand",
      performance: "Exceptionally soft, lighter drape",
    },
    {
      fabric: "Recycled fiber blend",
      bestFor: "Sustainable lines",
      performance: "Comparable to standard cotton-poly, eco-positioning",
    },
  ],
  // Weight tiers as their own real, liftable table (FabricOptions.tsx's
  // own `weightTiers` prop) -- only 3 tiers here, not 4: this category's
  // own given content has no ultra-heavyweight crewneck tier the way
  // Hoodies does.
  weightTiers: [
    {
      tier: "Lightweight",
      gsm: "250 to 300 GSM",
      bestFor: "Layering, spring and fall, promo and uniform programs",
    },
    {
      tier: "Midweight",
      gsm: "300 to 350 GSM",
      bestFor: "The most common crewneck band, everyday retail and team programs",
    },
    {
      tier: "Heavyweight",
      gsm: "400 to 475+ GSM",
      bestFor: "Premium and streetwear, a durable, substantial feel",
    },
  ],
  fabricNote: [
    { text: "Crewnecks run about a step lighter than hoodies (no hood or pocket), so the same feel lands at a lower GSM. Ribbed collar, cuffs and waistband carry " },
    { text: "spandex", bold: true },
    { text: " for recovery and a flat, non-curling collar. Garment-dye available. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric or GSM", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 6 fabrics above, in the same
  // order -- same "shortened, not derived" pattern every prior category's
  // own fabricPills already establishes.
  fabricPills: [
    "French terry",
    "Brushed fleece",
    "Cotton-poly blend",
    "Compacted cotton",
    "Tri-blend fleece",
    "Recycled blend",
  ],
  qualityHeading: "A flat collar, the weight you approve",
  qualitySubline: "We confirm the collar, GSM and shrinkage on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Ribbed collar lies flat and holds its recovery, no curling",
    "Spandex-reinforced collar, cuffs and hem, confirmed content",
    "GSM held consistent, batch to batch, not just on the sample",
    "Shrinkage tested after wash, targeted under 5%, brushed fleece checked for pilling",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "French terry or brushed fleece, cotton, cotton-poly and recycled blends" },
    { title: "Weight and fit", body: "250 to 475+ GSM, regular, oversized, cropped or longline" },
    {
      title: "Neckline and zip",
      body: "Crew, mock or cowl neckline; no zip, quarter-zip, half-zip or zip-up",
    },
    {
      title: "Construction",
      body: "Set-in, raglan or drop-shoulder sleeve, optional V-stitch sweat-guard, ribbed collar, cuffs and hem, side-seam or tubular body",
    },
    { title: "Color and print", body: "Custom colors with Pantone matching, screen, DTG, DTF, embroidery, puff, patches" },
    { title: "Labels and packaging", body: "Woven, printed or tear-away labels, hangtags, retail-ready packaging" },
  ],
  // Same heading every prior category's own faqHeading already uses --
  // confirmed intentional reuse, since every question below it is
  // genuinely sweatshirt-specific. The entity question itself is NOT
  // stored here -- app/activewear/[category]/page.tsx builds it per
  // category via categoryEntityFaq() and prepends it at render time (see
  // that function's own comment in ./pdpShared.ts), so it can never drift
  // out of sync with what any style page under this category generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom sweatshirts?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a crewneck sweatshirt and a hoodie?",
      a: "A crewneck is the same fleece body and sleeve as a hoodie, without the hood, drawcord and kangaroo pocket, keeping the round ribbed collar. It uses less fabric and simpler construction, so it is often the more cost-efficient first SKU. Many brands start with a midweight crewneck in core colors, then add hoodies in the best sellers.",
    },
    {
      q: "What is the standard GSM for a crewneck sweatshirt?",
      a: "Lightweight 250 to 300 GSM, midweight 300 to 350 GSM (the standard band), and heavyweight 400 to 475+ GSM. Crewnecks run about a step lighter than hoodies at the same feel.",
    },
    {
      q: "How do you keep the collar from curling?",
      a: "The ribbed crew collar is fully exposed, so we build spandex into the collar rib and test its recovery, so it lies flat and does not curl after washing.",
    },
    {
      q: "Do you make half-zip and quarter-zip sweatshirts?",
      a: "Yes. Half-zip and quarter-zip crewnecks with a standing collar, a fast-growing style for collegiate and corporate programs.",
    },
    {
      q: "Can you match a specific GSM or a reference sweatshirt?",
      a: "Yes. Send a reference or tech pack and we match the fabric, GSM and hand-feel, then confirm on your sample.",
    },
    {
      q: "What print and branding methods can you do?",
      a: "Screen print and DTG on French terry, embroidery and puff on brushed fleece and heavier weights, plus DTF and patches. With no hood or front pocket, the chest and full back are open zones for large prints.",
    },
    {
      q: "Will my sweatshirts shrink or pill?",
      a: "We test shrinkage after wash, targeting under 5%, and check brushed fleece for pilling, before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, weight, fit, neckline, zip, sleeve construction, collar and cuffs, color and finish (including garment-dye), print and embroidery, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label sweatshirts?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are sweatshirts sized?",
      a: "Alpha XS to 5XL. Unisex, men's and women's fits use the same size range with a different cut, unisex is boxier, women's is tapered.",
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
      a: "Send your tech pack, sketch or a reference sweatshirt by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // FinalCta's own h2/cta and the compliance bar's own items already match
  // content/home.ts's own shared finalCta/complianceTicker verbatim --
  // app/activewear/[category]/page.tsx reuses those directly, same as
  // every prior category. ctaReferenceNoun swaps this category's own noun
  // into the shared subline template (buildCtaSubline(), ./pdpShared.ts) --
  // owner spec, 2026-09-04.
  ctaReferenceNoun: "sweatshirt",
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
      slug: "crewneck",
      cardTitle: "Custom Classic Crewneck Sweatshirt",
      cardSubline: "Round rib collar, no hood",
      image: "",
      imageAlt: "Custom classic crewneck sweatshirt, round rib collar, no hood",
      href: "/activewear/sweatshirts/crewneck",
    },
    {
      status: "draft",
      slug: "half-zip",
      cardTitle: "Custom Half-Zip Sweatshirt",
      cardSubline: "Standing collar, partial zip",
      image: "",
      imageAlt: "Custom half-zip sweatshirt, standing collar, partial zip",
      href: "/activewear/sweatshirts/half-zip",
    },
    {
      status: "draft",
      slug: "quarter-zip",
      cardTitle: "Custom Quarter-Zip Sweatshirt",
      cardSubline: "Short zip, raised collar",
      image: "",
      imageAlt: "Custom quarter-zip sweatshirt, short zip, raised collar",
      href: "/activewear/sweatshirts/quarter-zip",
    },
    {
      status: "draft",
      slug: "oversized",
      cardTitle: "Custom Oversized Boxy Sweatshirt",
      cardSubline: "Heavyweight, structured fit",
      image: "",
      imageAlt: "Custom oversized boxy sweatshirt, heavyweight, structured fit",
      href: "/activewear/sweatshirts/oversized",
    },
    {
      status: "draft",
      slug: "cropped",
      cardTitle: "Custom Cropped Sweatshirt",
      cardSubline: "Shortened body length",
      image: "",
      imageAlt: "Custom cropped sweatshirt, shortened body length",
      href: "/activewear/sweatshirts/cropped",
    },
    {
      status: "draft",
      slug: "raglan",
      cardTitle: "Custom Raglan Sweatshirt",
      cardSubline: "Raglan sleeve, athletic build",
      image: "",
      imageAlt: "Custom raglan sweatshirt, raglan sleeve, athletic build",
      href: "/activewear/sweatshirts/raglan",
    },
    {
      status: "draft",
      slug: "longline",
      cardTitle: "Custom Longline Sweatshirt",
      cardSubline: "Extended hem length",
      image: "",
      imageAlt: "Custom longline sweatshirt, extended hem length",
      href: "/activewear/sweatshirts/longline",
    },
    {
      status: "draft",
      slug: "mock-neck",
      cardTitle: "Custom Mock-Neck Sweatshirt",
      cardSubline: "Short standing collar",
      image: "",
      imageAlt: "Custom mock-neck sweatshirt, short standing collar",
      href: "/activewear/sweatshirts/mock-neck",
    },
  ],
  // Sibling Tops-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern every prior category's own relatedLinks already
  // establishes -- these become live the moment each one gets its own
  // content file.
  relatedLinks: [
    { label: "Hoodies", href: "/activewear/hoodies" },
    { label: "T-Shirts", href: "/activewear/t-shirts" },
    { label: "Long-Sleeve Tops", href: "/activewear/long-sleeve-tops" },
    { label: "Tank Tops", href: "/activewear/tank-tops" },
  ],
};
