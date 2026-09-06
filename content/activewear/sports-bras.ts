// content/activewear/sports-bras.ts
// Second real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, confirming the shape already
// supports a new category with zero page-code changes (owner spec,
// 2026-09-02): no edits to app/activewear/[category]/page.tsx,
// app/activewear/[category]/[style]/page.tsx, app/sitemap.ts, or
// lib/schema.ts, only this file plus one line in ./categories.ts.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule Leggings' own styleCards already follow.
import type { Category } from "./types";

export const sportsBras: Category = {
  slug: "sports-bras",
  group: "Activewear",
  menuLabel: "Sports Bras",
  // Entity FAQ overrides (owner spec, 2026-09-02) -- "sports bra"
  // (singular) reads correctly in "a custom sports bra manufacturer",
  // while "sports bras" (plural) reads correctly in "private label sports
  // bras" -- the plain `menuLabel.toLowerCase()` fallback can only ever
  // supply one form, so this category needs both set explicitly (see
  // categoryEntityFaq()'s own comment in ./pdpShared.ts).
  manufacturerNoun: "Sports Bra",
  productNounPlural: "sports bras",
  entityExampleStyles: "high-impact, medium-support, and light-support styles",
  entityFabrics: "nylon or recycled polyester blends",
  h1: "Custom Sports Bra Manufacturer",
  // metaTitle deviates from the owner's own literal 3-segment request
  // ("Custom Sports Bra Manufacturer | Private Label and OEM |
  // Capriowear", 67 rendered chars) -- this exact shape ("...Manufacturer
  // | Private Label and OEM | Capriowear") was already tried and reverted
  // for Leggings (see that file's own comment on this same field, and the
  // 2026-08-30 decision log entry) for running well past Google's
  // ~600px/~60-char truncation point, and directly contradicts this same
  // request's own stated rule ("keep under ~60 chars"). Kept to the
  // shorter, already-established form instead -- "Private Label and OEM"
  // still appears, in the meta description below, which has real room for
  // it. Rendered title: "Custom Sports Bra Manufacturer | Capriowear", 44
  // chars.
  metaTitle: "Custom Sports Bra Manufacturer",
  // Owner's exact given copy, 159 chars -- entirely within Google's own
  // ~155-160 char truncation point, nothing essential past it.
  metaDescription:
    "Custom sports bra manufacturer for gym and activewear brands. High to light support, compression fabric, low MOQ. Capriowear.",
  // CategoryBanner's own checkmark row -- same 4 facts, same wording, as
  // Leggings' own (this is sitewide standing copy, not category-specific
  // marketing), matching the owner's own given fact strip exactly.
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 40+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Real Women/Men split, same as Leggings -- explicit, though also the
  // default (see this field's own comment in ./types.ts).
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  // Same "\n" + whitespace-pre-line line-break technique Leggings' own
  // fabricHeading already uses -- the owner's given H2 ("The fabrics
  // behind the big brands") is identical wording to Leggings', so the
  // same natural break point applies.
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon or polyamide + spandex (70 to 85% / 15 to 30%)",
      bestFor: "Everyday training, medium support",
      performance: "Soft hand, 4-way stretch, strong recovery, holds shape",
    },
    {
      fabric: "Polyester + spandex (72 to 89% / 11 to 28%)",
      bestFor: "High-impact, high-sweat training",
      performance: "Durable, quick-dry, moisture-wicking, firmer hold",
    },
    {
      fabric: "Recycled polyester + spandex",
      bestFor: "Sustainable lines",
      performance: "Same performance as virgin polyester, eco-positioning",
    },
    {
      fabric: "Cotton, modal and spandex (approx 55 to 60% / 20 to 25% / 15 to 20%)",
      bestFor: "Light support, lifestyle and lounge crossover",
      performance: "Soft hand, breathable, a less compressive hold",
    },
    {
      fabric: "Power-mesh (polyester or nylon open-knit)",
      bestFor: "Ventilation and structured support panels",
      performance: "Breathable, adds structure at side and back without bulk",
    },
  ],
  fabricNote: [
    { text: "Main synthetic knits run " },
    { text: "200 to 320 GSM", bold: true },
    { text: ". Power-mesh panels and cotton blends vary, confirmed per style. Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  // Short PDP-facing pill labels for the same 5 fabrics above, in the same
  // order -- same "shortened, not derived" pattern Leggings' own
  // fabricPills already establishes (see that field's own comment).
  fabricPills: ["Nylon spandex", "Polyester spandex", "Recycled polyester spandex", "Cotton modal spandex", "Power-mesh"],
  qualityHeading: "Support that holds, fit that lasts",
  qualitySubline: "We confirm support, cup retention and band recovery on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Support tier confirmed for hold, tested for bounce and movement",
    "Bands and straps hold their recovery after wear and wash, no dig, no ride-up",
    "Cups and cup pockets finished clean, no puckering",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Nylon, poly, recycled and cotton-blend knits, 200 to 320 GSM, power-mesh panels" },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, DTF" },
    {
      title: "Support and fit",
      body: "Encapsulation or compression, cup and band construction, strap configuration, graded XS to 5XL",
    },
    { title: "Branding", body: "Your logos by print, silicone, heat transfer or embroidery" },
    { title: "Labels", body: "Woven, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  // Same heading Leggings' own faqHeading already uses -- confirmed
  // intentional reuse, not an unfinished copy-paste, since every question
  // below it is genuinely sports-bra-specific. The entity question itself
  // is NOT stored here -- app/activewear/[category]/page.tsx builds it
  // per category via categoryEntityFaq() and prepends it at render time
  // (see that function's own comment in ./pdpShared.ts), so it can never
  // drift out of sync with what any style page under this category
  // generates.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom sports bras?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What fabric gives sports bras their compression?",
      a: "Nylon or polyamide with spandex and polyester with spandex, the blends used by leading brands, plus recycled polyester and cotton-blend options, with power-mesh panels for support and ventilation, in weights from 200 to 320 GSM.",
    },
    {
      q: "What is the difference between high and light support?",
      a: "High-impact, medium-support and light-support, built by encapsulation, compression or a combination.",
    },
    {
      q: "What is the difference between encapsulation and compression?",
      a: "Compression holds the chest against the body for a streamlined, flatter, medium-support feel; encapsulation shapes and supports each cup separately for higher, high-impact hold. We build either, or a combination, to your spec.",
    },
    {
      q: "What styles and features can you add?",
      a: "Racerback, scoop, crossback, strappy and caged, zip-front, high-neck, longline and bralette, with removable or sewn-in cups, convertible straps, adjustable straps, hook-and-eye or pull-on bands, and power-mesh panels.",
    },
    {
      q: "Can you match a specific fabric or a reference bra?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, color, print, support tier, cup and band construction, strap configuration, your logos, woven and care labels, hangtags and retail packaging, with Pantone color matching.",
    },
    {
      q: "Who makes private label sports bras for gym and activewear brands?",
      a: "Yes, all three, made under your brand.",
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
      a: "Send your tech pack, sketch or a reference bra by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // FinalCta's own h2/cta (owner: "Let's build your custom collection." /
  // "Request a Sample") already match content/home.ts's own shared
  // `finalCta.h2`/`finalCta.cta` verbatim -- app/activewear/[category]/
  // page.tsx reuses those directly, same as Leggings, so this file only
  // supplies the one genuinely category-specific line, `ctaSubline`.
  // Same for the compliance bar: content/home.ts's own `complianceTicker`
  // already opens with the exact 5 items given (NDA before tech pack,
  // Pre-shipment inspection, GSP+ Form A per container, AQL 2.5
  // inspection, ISO 9001 certified) -- shared sitewide, reused verbatim,
  // nothing to add here.
  // Owner spec, 2026-09-02: "on every PLP, our cta should have this
  // subline" -- the exact same closing-CTA subline is now used verbatim
  // on every category PLP (was its own per-category wording, e.g. "a
  // reference bra, we'll develop it with you").
  ctaReferenceNoun: "sports bra",
  // Every style is "draft" (owner spec) -- a real name and one-line spec,
  // no PDP content yet: shows on the grid as a non-clickable tile (no
  // hover image swap either, since no `images` array is set -- see
  // ProductCardMedia.tsx's own contract, which only ever activates hover
  // once a real `images[1]` exists), no generated route, excluded from
  // the sitemap and this category's own ItemList schema. Flip to
  // "published" once a style's real PDP content (description, FAQs,
  // specifications, gallery) exists, same as Leggings' own pilot styles.
  styleCards: [
    {
      status: "draft",
      slug: "high-impact-racerback",
      cardTitle: "Custom High-Impact Racerback Sports Bra",
      cardSubline: "Encapsulation, removable cups, high hold",
      image: "",
      imageAlt: "Custom high-impact racerback sports bra manufacturer",
      href: "/activewear/sports-bras/high-impact-racerback",
    },
    {
      status: "draft",
      slug: "zip-front",
      cardTitle: "Custom Zip-Front Sports Bra",
      cardSubline: "High support, front zip",
      image: "",
      imageAlt: "Custom zip-front sports bra manufacturer",
      href: "/activewear/sports-bras/zip-front",
    },
    {
      status: "draft",
      slug: "high-neck",
      cardTitle: "Custom High-Neck Sports Bra",
      cardSubline: "High support, full-coverage neckline",
      image: "",
      imageAlt: "Custom high-neck sports bra manufacturer",
      href: "/activewear/sports-bras/high-neck",
    },
    {
      status: "draft",
      slug: "racerback-scoop",
      cardTitle: "Custom Racerback Scoop Sports Bra",
      cardSubline: "Everyday racerback, removable pads",
      image: "",
      imageAlt: "Custom racerback scoop sports bra manufacturer",
      href: "/activewear/sports-bras/racerback-scoop",
    },
    {
      status: "draft",
      slug: "crossback-strappy",
      cardTitle: "Custom Crossback Strappy Sports Bra",
      cardSubline: "Convertible crossback straps",
      image: "",
      imageAlt: "Custom crossback strappy sports bra manufacturer",
      href: "/activewear/sports-bras/crossback-strappy",
    },
    {
      status: "draft",
      slug: "padded-training",
      cardTitle: "Custom Padded Training Bra",
      cardSubline: "Molded padded cups",
      image: "",
      imageAlt: "Custom padded training bra manufacturer",
      href: "/activewear/sports-bras/padded-training",
    },
    {
      status: "draft",
      slug: "longline",
      cardTitle: "Custom Longline Sports Bra",
      cardSubline: "Longline band, bra-tank crossover",
      image: "",
      imageAlt: "Custom longline sports bra manufacturer",
      href: "/activewear/sports-bras/longline",
    },
    {
      status: "draft",
      slug: "yoga",
      cardTitle: "Custom Yoga Pullover Bra",
      cardSubline: "Soft pullover, minimal structure",
      image: "",
      imageAlt: "Custom yoga pullover bra manufacturer",
      href: "/activewear/sports-bras/yoga",
    },
    {
      status: "draft",
      slug: "bralette",
      cardTitle: "Custom Bralette",
      cardSubline: "Everyday, minimal structure",
      image: "",
      imageAlt: "Custom bralette manufacturer",
      href: "/activewear/sports-bras/bralette",
    },
  ],
  // Sibling Tops-group categories from content/home.ts's own
  // activewearMegaMenu, same "real hrefs and labels, no PLACEHOLDER
  // prefix" pattern Leggings' own relatedLinks already establishes --
  // these become live the moment each one gets its own content file,
  // same as this category itself just did for Leggings' own
  // relatedLinks entry.
  relatedLinks: [
    { label: "Tank Tops", href: "/activewear/tank-tops" },
    { label: "T-Shirts", href: "/activewear/t-shirts" },
    { label: "Long-Sleeve Tops", href: "/activewear/long-sleeve-tops" },
    { label: "Leggings", href: "/activewear/leggings" },
  ],
};
