// content/activewear/leggings.ts
// First real category built on the Category shape (content/activewear/types.ts).
// h1, trustBullets, the fabric table (fabricEyebrow/fabricHeading/
// fabricOptions/fabricNote, node 579:5632, 2026-08-29), the trust points
// list (qualityHeading/qualitySubline/qualityPoints, node 579:5493,
// 2026-08-29), and the coverage grid (coverageEyebrow/coverageHeading/
// coverageItems, node 579:5580, 2026-08-29) are Figma-confirmed real copy
// -- everything else is marked PLACEHOLDER, not final copy, kept realistic
// in length and register so design/SEO review can proceed before the
// client supplies the real text. Spec facts and FAQ are wired into the
// page as later sections ship.
import type { Category } from "./types";

export const leggings: Category = {
  slug: "leggings",
  group: "Activewear",
  menuLabel: "Leggings",
  h1: "Custom Leggings Manufacturer",
  // Owner-supplied exact copy, 2026-08-30 (SEO/AEO/GEO finalization pass).
  // No "| Capriowear" suffix here -- unlike app/page.tsx (which sits at the
  // same route segment as the root layout's title template and so is used
  // verbatim), this page is a nested child segment, and the root layout's
  // `%s | Capriowear` template DOES apply to it automatically. Including
  // the suffix here doubled it ("...Manufacturer | Capriowear | Capriowear"),
  // confirmed live when this page was first built -- so the rendered
  // <title> here reads exactly "Custom Leggings Manufacturer | Private
  // Label and OEM | Capriowear" without repeating the suffix in this field.
  metaTitle: "Custom Leggings Manufacturer | Private Label and OEM",
  metaDescription:
    "Custom and private label leggings manufacturer in Sialkot, Pakistan. OEM and ODM from 50 pieces per style, nylon and recycled 4-way stretch fabrics, squat-proof, custom from fabric to packaging, samples in 10 to 14 days, DDP worldwide.",
  // Figma-confirmed real copy (node 502:3310, revised 2026-08-28), same
  // treatment as h1 -- not a placeholder. Replaces the earlier single
  // quickAnswer subline, dropped from this design entirely.
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 40+ countries"],
  // Figma-confirmed real copy (node 406:3137, 2026-08-28), same treatment
  // as h1/trustBullets above -- not a placeholder.
  gridSubline: "Every style, made to your brand spec.",
  // Owner request, 2026-08-30: "Change the subline under leggings heading
  // to 'Every style is available in custom fabrics & colors. Only for
  // mobile" -- replaces `gridSubline` below `xl` only (see
  // CategoryMetaStrip.tsx), picking up the "in custom fabrics & colors"
  // detail now that individual product tiles no longer show their own
  // subline on mobile (see StyleCard.cardSubline's own comment).
  gridSublineMobile: "Every style is available in custom fabrics & colors.",
  // Explicit, though it's also the default -- Leggings has a real Women/Men
  // split (owner, 2026-08-30: "this chips may come on some of the
  // categories but not applicable for all"), so this is written out rather
  // than left implicit.
  showGenderFilter: true,
  overview:
    "PLACEHOLDER: Capriowear manufactures custom leggings for activewear brands, from a first sketch or tech pack through to packaged, retail ready product. Every order runs through our own factory floor in Sialkot, Pakistan, with fabric sourcing, pattern grading, fit sampling, bulk production, printing and branding, quality control and packaging all handled in house, under one roof.",
  // Figma-confirmed real copy (node 579:5632, 2026-08-29), same treatment
  // as h1/trustBullets -- not a placeholder. Real content replaced the
  // earlier 3 PLACEHOLDER rows entirely; the shape also changed (see
  // FabricOption's own comment in types.ts) to match what this design
  // actually renders -- 3 cells per row, not 4.
  fabricEyebrow: "FABRIC OPTIONS",
  // Explicit line break (owner request, 2026-08-30: the first line should
  // read "The fabrics behind the", not "The fabrics behind" -- natural
  // text-wrap can't produce that split at this heading's own 54px size,
  // since "The fabrics behind the" is nearly as wide as the full sentence
  // (the whole line fits unwrapped from ~812px, wrapping without a break
  // only ever lands on "The fabrics behind" / "the big brands"). Rendered
  // via `whitespace-pre-line` on `fabricOptions.heading`.
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon or polyamide + elastane (70 to 85% / 15 to 30%)",
      bestFor: "Gym, yoga, everyday compression",
      performance: "Soft hand, 4-way stretch, squat-proof, strong recovery",
    },
    {
      fabric: "Recycled polyester + elastane",
      bestFor: "Sustainable lines",
      performance: "Eco-positioning, moisture management, 4-way stretch",
    },
    {
      fabric: "Polyester + elastane",
      bestFor: "Running, high-sweat training",
      performance: "Durable, quick-dry, moisture-wicking",
    },
    {
      fabric: "Brushed / fleece-lined",
      bestFor: "Cold-weather, thermal",
      performance: "Warmth, brushed-soft hand",
    },
  ],
  fabricNote: [
    { text: "Weights from " },
    { text: "300 to 500 GSM", bold: true },
    { text: ". Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  // Figma-confirmed real copy (node 579:5493, 2026-08-29), same treatment
  // as h1/trustBullets/fabricOptions -- not a placeholder.
  qualityHeading: "Built to pass the squat test",
  qualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
  qualityPoints: [
    "Opacity tested, squat-proof",
    "Seams reinforced and stress-tested",
    "Waistbands hold their recovery",
    "Every run inspected to AQL 2.5",
    "Third-party inspection welcome",
  ],
  // Owner update, 2026-08-30: was "WHAT WE COVER".
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Nylon, poly and recycled blends, 300 to 500 GSM" },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, DTF" },
    { title: "Style and fit", body: "Patterns, waistband, length, graded XS to 5XL." },
    { title: "Branding", body: "Your logos by print, silicone, heat transfer or embroidery" },
    { title: "Labels", body: "Woven, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  specQuickFacts: [
    { label: "PLACEHOLDER: Minimum order", value: "PLACEHOLDER: 50 pieces per style" },
    { label: "PLACEHOLDER: Sample lead time", value: "PLACEHOLDER: 10 to 14 days" },
    { label: "PLACEHOLDER: Sizing range", value: "PLACEHOLDER: XS to 3XL, custom grading available" },
    { label: "PLACEHOLDER: Waistband options", value: "PLACEHOLDER: High rise, mid rise, drawcord" },
    { label: "PLACEHOLDER: Decoration", value: "PLACEHOLDER: Sublimation, screen print, embroidery" },
  ],
  // Figma-confirmed real copy (node 579:5660 layout, node 579:5753 full
  // Q&A text, 2026-08-30), same treatment as h1/trustBullets/fabricOptions
  // -- not a placeholder. Reuses home.ts's own Faq/Accordion component
  // verbatim (owner request: "Use the same component used on home") --
  // faqHeading feeds Faq's `content.h2` prop, faqs feeds `content.items`,
  // no adapter needed since FaqEntry ({q, a}) already matches. The design
  // reuses the homepage's own "Top questions from B2B buyers" heading
  // verbatim rather than a leggings-specific one -- confirmed intentional,
  // not an unfinished copy-paste, since every question below it is
  // genuinely leggings-specific.
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    // Added as the first entry (owner request, 2026-08-30) so it's also
    // the first question in faqSchema()'s FAQPage output -- a general
    // "what does Capriowear make" entity-defining Q&A ahead of the more
    // specific leggings questions below it, good for AEO/GEO answer
    // engines looking for the broadest, most quotable framing first.
    {
      q: "What does Capriowear manufacture?",
      a: "Capriowear is a custom leggings manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label leggings from fabric to packaging, including high-waisted compression, flare, scrunch, and cropped styles in nylon or recycled polyester blends, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
    },
    {
      q: "What is your MOQ for custom leggings?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Which fabrics do you use for leggings?",
      a: "Nylon or polyamide with elastane, the 70 to 85% to 15 to 30% blend used by leading brands, plus recycled polyester options, in weights from 300 to 500 GSM.",
    },
    {
      q: "What legging styles can you make?",
      a: "High-waisted compression, flare and wide-leg, scrunch and ruched, V-back and crossover waistband, capri and cropped, pocket, biker and fleece-lined.",
    },
    {
      q: "Are your leggings squat-proof?",
      a: "Yes. We use tested squat-proof knits and confirm opacity on your sample before bulk.",
    },
    {
      q: "Can you match a specific fabric or a reference legging?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, color, print, style, waistband, your logos, woven and care labels, hangtags and retail packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM and private label leggings?",
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
    // The one question in the Figma reference (node 579:5753) with no
    // answer given -- reused verbatim from the homepage's own closing FAQ
    // CTA line (content/home.ts's faq items) rather than invent new copy
    // for the one genuine gap in an otherwise fully real Q&A set.
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch or idea by email or WhatsApp. We'll come back within 24 hours with next steps.",
    },
  ],
  // Figma-confirmed real copy (node 579:5710, 2026-08-30), same treatment
  // as h1/trustBullets/fabricOptions/qualityPoints/coverageItems -- not a
  // placeholder. Reuses home.ts's own FinalCta component/heading/button/
  // ticker verbatim (same "Let's build your custom collection" heading,
  // same "Request a Sample" button, same complianceTicker badges) -- only
  // this subline is category-specific.
  // Owner update, 2026-08-30.
  ctaSubline: "Share your tech pack, sketch or a reference legging. We'll come back within 24 hours with next steps.",
  // Placeholder cards so the grid renders at its real size, per owner
  // note (2026-08-28): every field here is placeholder, not real product
  // copy, until real style names and photography are supplied. No literal
  // "PLACEHOLDER:" prefix on cardTitle/cardSubline (owner request,
  // 2026-08-28) -- these two fields are the ones actually rendered on the
  // page today (ProductCard), unlike overview/fabricOptions/specQuickFacts/
  // faqs below, which keep the prefix since nothing renders them yet.
  // 9 entries (was 3) so the grid fills its real 3x3 size and pagination
  // has real, honest multiple pages to page through.
  //
  // imageAlt (2026-08-30, SEO/AEO/GEO finalization pass): keyword-aware
  // descriptive alt text per card, ready for the moment real photography
  // replaces the empty `image` string -- see the field's own comment on
  // StyleCard (types.ts) for why it's separate from cardTitle.
  styleCards: [
    {
      slug: "high-waist-leggings",
      cardTitle: "High Waist Leggings",
      cardSubline: "Available in custom fabrics & colors",
      image: "",
      imageAlt: "Custom high-waisted compression leggings",
      href: "/activewear/leggings/high-waist-leggings",
    },
    {
      slug: "pocket-leggings",
      cardTitle: "Pocket Leggings",
      cardSubline: "Available in custom fabrics & colors",
      image: "",
      imageAlt: "Custom pocket leggings for activewear brands",
      href: "/activewear/leggings/pocket-leggings",
    },
    {
      slug: "compression-leggings",
      cardTitle: "Compression Leggings",
      cardSubline: "Available in custom fabrics & colors",
      image: "",
      imageAlt: "Custom compression leggings, squat-proof fabric",
      href: "/activewear/leggings/compression-leggings",
    },
    {
      slug: "flare-leggings",
      cardTitle: "Flare Leggings",
      cardSubline: "Available in custom fabrics & colors",
      image: "",
      imageAlt: "Custom flare leggings manufacturer",
      href: "/activewear/leggings/flare-leggings",
    },
    {
      slug: "ribbed-leggings",
      cardTitle: "Ribbed Leggings",
      cardSubline: "Available in custom fabrics & colors",
      image: "",
      imageAlt: "Custom ribbed leggings for private label brands",
      href: "/activewear/leggings/ribbed-leggings",
    },
    {
      slug: "capri-leggings",
      cardTitle: "Capri Leggings",
      cardSubline: "Available in custom fabrics & colors",
      image: "",
      imageAlt: "Custom capri length leggings manufacturer",
      href: "/activewear/leggings/capri-leggings",
    },
    {
      slug: "mesh-panel-leggings",
      cardTitle: "Mesh Panel Leggings",
      cardSubline: "Available in custom fabrics & colors",
      image: "",
      imageAlt: "Custom mesh panel leggings with breathable fabric",
      href: "/activewear/leggings/mesh-panel-leggings",
    },
    {
      slug: "fleece-lined-leggings",
      cardTitle: "Fleece Lined Leggings",
      cardSubline: "Available in custom fabrics & colors",
      image: "",
      imageAlt: "Custom fleece-lined thermal leggings",
      href: "/activewear/leggings/fleece-lined-leggings",
    },
    {
      slug: "maternity-leggings",
      cardTitle: "Maternity Leggings",
      cardSubline: "Available in custom fabrics & colors",
      image: "",
      imageAlt: "Custom maternity leggings manufacturer",
      href: "/activewear/leggings/maternity-leggings",
    },
  ],
  // Real hrefs and labels, matching content/home.ts's own activewearMegaMenu
  // exactly (owner request, 2026-08-30) -- no PLACEHOLDER prefix, since
  // this is now a real, rendered internal-linking row (RelatedCategories).
  relatedLinks: [
    { label: "Sports Bras", href: "/activewear/sports-bras" },
    { label: "Shorts", href: "/activewear/shorts" },
    { label: "Joggers & Track Pants", href: "/activewear/joggers-track-pants" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
  ],
};
