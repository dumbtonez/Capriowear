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
//
// Scale and maintenance (owner spec, 2026-09-01): to add a new style PDP
// to this category, add one entry to `styleCards` below (slug + the
// fields it needs -- see StyleCard's own comments in ./types.ts for which
// are required vs. optional-with-fallback). To add a whole new Activewear
// category, add its own content file of this same `Category` shape and
// register it in ./categories.ts. Neither ever touches
// app/activewear/[category]/page.tsx or app/activewear/[category]/
// [style]/page.tsx -- no new routes, no new schema code, no new metadata
// code for either case.
import type { Category } from "./types";

export const leggings: Category = {
  slug: "leggings",
  group: "Activewear",
  menuLabel: "Leggings",
  h1: "Custom Leggings Manufacturer",
  // No "| Capriowear" suffix here -- unlike app/page.tsx (which sits at the
  // same route segment as the root layout's title template and so is used
  // verbatim), this page is a nested child segment, and the root layout's
  // `%s | Capriowear` template DOES apply to it automatically. Including
  // the suffix here doubles it.
  //
  // Shortened to the single-pipe form (owner request, 2026-08-30, Google
  // display-limit rules: "Custom [Style/Category] Manufacturer |
  // Capriowear", target ~50-60 chars, never let the title exceed ~65 where
  // the keyword itself gets cut) -- was "Custom Leggings Manufacturer |
  // Private Label and OEM", which rendered as a THREE-segment, 78-char
  // title ("...Manufacturer | Private Label and OEM | Capriowear") once
  // the layout's own " | Capriowear" suffix appended, well past Google's
  // ~600px/~60-char truncation point. "Private Label and OEM" already
  // lives in `metaDescription` below (front-loaded, well inside its own
  // first 155 chars) -- dropping it from the title loses nothing essential.
  // Rendered title is now "Custom Leggings Manufacturer | Capriowear", 42
  // chars.
  metaTitle: "Custom Leggings Manufacturer",
  // Trimmed to ~155-160 chars for a clean SERP snippet (owner request,
  // 2026-09-02) -- the earlier 235-char version ran well past Google's
  // truncation point even though it fit this project's own ~270-char AEO
  // allowance. Owner's exact given copy.
  metaDescription:
    "Custom leggings manufacturer, high-waisted compression, squat-proof, scrunch and pocket styles, 300 to 500 GSM, low MOQ. Capriowear.",
  // Figma-confirmed real copy (node 502:3310, revised 2026-08-28), same
  // treatment as h1 -- not a placeholder. Replaces the earlier single
  // quickAnswer subline, dropped from this design entirely.
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 40+ countries"],
  // Figma-confirmed real copy (node 406:3137, 2026-08-28), same treatment
  // as h1/trustBullets above -- not a placeholder.
  gridSubline: "Every style, made to your brand spec",
  // Owner request, 2026-08-30: "Change the subline under leggings heading
  // to 'Every style is available in custom fabrics & colors. Only for
  // mobile" -- replaces `gridSubline` below `xl` only (see
  // CategoryMetaStrip.tsx), picking up the "in custom fabrics & colors"
  // detail now that individual product tiles no longer show their own
  // subline on mobile (see StyleCard.cardSubline's own comment).
  gridSublineMobile: "Every style is available in custom fabrics & colors",
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
      fabric: "Nylon or polyamide + spandex (70 to 85% / 15 to 30%)",
      bestFor: "Gym, yoga, everyday compression",
      performance: "Soft hand, 4-way stretch, squat-proof, strong recovery",
    },
    {
      fabric: "Recycled polyester + spandex",
      bestFor: "Sustainable lines",
      performance: "Eco-positioning, moisture management, 4-way stretch",
    },
    {
      fabric: "Polyester + spandex",
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
  // Figma-confirmed real copy (node 634:5034, 2026-09-01) -- short PDP pill
  // labels for the same 4 fabrics `fabricOptions` above describes in full,
  // same order.
  fabricPills: ["Nylon spandex", "Recycled polyester spandex", "Polyester spandex", "Brushed / fleece-lined"],
  // Figma-confirmed real copy (node 579:5493, 2026-08-29), same treatment
  // as h1/trustBullets/fabricOptions -- not a placeholder.
  qualityHeading: "Built to pass the squat test",
  qualitySubline: "We confirm it all on your sample before a single bulk piece is cut",
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
  // The entity-defining "What does Capriowear manufacture?" Q&A used to be
  // hand-typed as this array's own first entry -- moved out (entity-intro
  // spec, 2026-09-01): app/activewear/[category]/page.tsx now builds it per
  // category via categoryEntityFaq() and prepends it at render time, so it
  // can never drift out of sync with the same answer any other category
  // (or a PDP under this one) generates. This array holds only the
  // genuinely leggings-specific questions below.
  faqs: [
    {
      q: "What is your MOQ for custom leggings?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the ideal GSM for compression leggings?",
      a: "Nylon or polyamide with spandex, the 70 to 85% to 15 to 30% blend used by leading brands, plus recycled polyester options, in weights from 300 to 500 GSM, the range that holds a true compression fit.",
    },
    {
      q: "What is a scrunch legging, and what other styles can you make?",
      a: "High-waisted compression, flare and wide-leg, scrunch and ruched (a center-seam construction that shapes and lifts), V-back and crossover waistband, capri and cropped, pocket, biker and fleece-lined.",
    },
    {
      q: "What makes leggings squat proof?",
      a: "A tested squat-proof knit dense enough to stay opaque under stretch, confirmed on your sample before bulk.",
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
  ctaReferenceNoun: "legging",
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
      // Slug/href renamed from "high-waist-leggings" (owner spec,
      // 2026-09-01: first real PDP URL is "/activewear/leggings/
      // high-waisted-compression") -- safe now, before any PDP was ever
      // live at the old slug (confirmed via grep: nothing else in the
      // codebase referenced this href directly). Renaming a slug after a
      // PDP has actually shipped would need a 301 redirect instead; this
      // is the one-time window where a plain rename is correct.
      // Leggings PLP pilot (owner spec, 2026-09-02): the only published
      // style today -- see StyleCard.status's own comment.
      status: "published",
      slug: "high-waisted-compression",
      // cardTitle/cardSubline corrected to the owner's own exact PLP card
      // rewrite spec, 2026-09-02: title form "Custom [Style] Leggings"
      // (was the shorter "High-Waisted Compression", matching pdpTitle
      // instead of this card format's own required full form), one
      // distinguishing spec line "Squat-proof compression, 4-way stretch"
      // (was "Squat-proof, 4-way stretch, compression hold", close but not
      // the exact given wording).
      cardTitle: "Custom High-Waisted Compression Leggings",
      cardSubline: "Squat-proof compression, 4-way stretch",
      image: "",
      imageAlt: "Custom high-waisted compression leggings",
      href: "/activewear/leggings/high-waisted-compression",
      // Figma-confirmed real copy (node 634:4952, PDP breadcrumb, 2026-08-31).
      pdpTitle: "High-Waisted Compression",
      // Figma-confirmed real copy (node 634:4988 desktop / 638:2541 mobile,
      // PDP product info text block, 2026-08-31).
      sku: "CAP-LEG-01",
      pdpHeading: "Custom High-Waisted Compression Leggings Manufacturer",
      pdpDescription:
        "High-waisted compression leggings, custom and private label, a squat-proof 70 to 85% nylon or polyamide and 15 to 30% spandex blend, made to your brand in Sialkot, Pakistan.",
      // Figma node 634:4961 (desktop) / 638:860 (mobile), 2026-08-31 -- 6
      // entries so the desktop rail's "show more" chevron (5 visible, 1
      // hidden) has something real to demonstrate.
      // 9, not 6 (owner, 2026-09-01: "add more thumbnails so it can cover
      // the case when you have more than 6 images") -- 6 only ever needed
      // one "show more" click to reach the rail's own end; this exercises
      // the rail scrolling across multiple clicks before it runs out.
      images: [
        { alt: "High-waisted compression leggings, front view" },
        { alt: "High-waisted compression leggings, back view" },
        { alt: "High-waisted compression leggings, side profile" },
        { alt: "High-waisted compression leggings, waistband detail" },
        { alt: "High-waisted compression leggings, fabric close-up" },
        { alt: "High-waisted compression leggings, worn on model" },
        { alt: "High-waisted compression leggings, flat lay" },
        { alt: "High-waisted compression leggings, pocket detail" },
        { alt: "High-waisted compression leggings, stretch in motion" },
      ],
      // Shortened title tag (owner spec, 2026-09-04, QA audit fix): the
      // prior form ("Custom High-Waisted Compression Leggings Manufacturer
      // | Capriowear") ran 66 rendered chars, over the ~60 char target --
      // deliberately DIFFERENT from `pdpHeading`/the H1 now (both of which
      // stay unchanged, "Custom High-Waisted Compression Leggings
      // Manufacturer"), a genuine exception to this field's usual "same as
      // pdpHeading" rule, made explicitly to fix the title length without
      // touching the on-page H1 or the slug.
      pdpMetaTitle: "Custom Compression Leggings Manufacturer",
      // Trimmed from 202 chars (owner spec, 2026-09-04, QA audit fix) --
      // also drops "nylon or polyamide," redundant since polyamide is
      // nylon.
      pdpMetaDescription:
        "Custom high-waisted compression leggings manufacturer, squat-proof four-way stretch nylon and spandex, from 50 pieces, samples in 10 to 14 days. Capriowear.",
      material: "70 to 85% nylon or polyamide, 15 to 30% spandex, 4-way stretch",
      faqs: [
        {
          q: "Are these leggings squat-proof?",
          a: "Yes. Every High-Waisted Compression run is opacity tested on the sample before bulk production, and we hold every production run to the same standard.",
        },
        {
          q: "Can I customize the waistband height and compression level?",
          a: "Yes. Waistband height, compression level, and fabric weight are all adjustable to your spec, and we confirm the final combination on your sample before cutting bulk.",
        },
        {
          q: "What colors and prints are available?",
          a: "Any color you specify, matched to Pantone, plus sublimation, screen, and DTF printing. We can also match a specific fabric from your own reference sample.",
        },
      ],
      // Figma-confirmed real copy (node 634:5070 desktop / 643:2660 mobile,
      // "Browse More", 2026-09-01). Owner correction, 2026-09-01: "related
      // styles should be linked and take user to the relevant page" -- each
      // tag points at its own real sibling PDP wherever one exists.
      //
      // All five point at the parent PLP as of the Leggings PLP pilot
      // (owner spec, 2026-09-02) -- every other style in this category
      // (including Flare / Wide-Leg and Capri / Cropped, which used to
      // link straight to `flare-leggings`/`capri-leggings` before this
      // pilot) is now "draft," with no generated route, so a direct
      // per-style link here would be a dead link (the one rule this pilot
      // is explicit about: "does NOT link anywhere yet... Do not 404").
      // Re-point each tag at its own real sibling PDP the moment that
      // style's own status flips to "published."
      relatedStyleTags: [
        { label: "Flare & Wide-Leg", href: "/activewear/leggings" },
        { label: "Scrunch & Ruched", href: "/activewear/leggings" },
        { label: "V-Back & Crossover", href: "/activewear/leggings" },
        { label: "Capri & Cropped", href: "/activewear/leggings" },
        { label: "See All", href: "/activewear/leggings" },
      ],
      // Figma-confirmed real copy (node 634:5092, "Specifications",
      // 2026-09-02) -- this style's own build datasheet.
      specifications: [
        { label: "Style", value: "High-waisted compression legging (base type)" },
        // Fixed, owner report, 2026-09-02: "Fabric row says 'Sustainable
        // lines'. That is wrong, it is a 'best for' value that leaked from
        // the fabric table" -- was copy-pasted from `fabricOptions[1]`'s
        // own `bestFor` field (that row's real fabric is "Recycled
        // polyester + spandex", not this style's actual composition). Now
        // the real composition, matching `fabricOptions[0]`'s own `fabric`
        // field for this style's base fabric, plus the recycled option.
        { label: "Fabric", value: "Nylon or polyamide with spandex, 70 to 85% / 15 to 30%, recycled polyester option" },
        { label: "Weight", value: "300 to 500 GSM" },
        { label: "Stretch and support", value: "4-way stretch, squat-proof, compression hold" },
        { label: "Waistband", value: "High-rise; plain, wide, or V-back / crossover" },
        { label: "Construction", value: "Gusset, flatlock finishing, optional pockets and drawcord" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "High-waisted compression leggings, construction detail" },
    },
    // The remaining 7 cards (owner spec, 2026-09-02, Leggings PLP pilot)
    // are all "draft": a real style name and one-line spec, but no PDP
    // content yet (no pdpDescription/faqs/specifications/images) -- each
    // renders on the grid as a non-clickable "Coming soon" tile
    // (ProductCard.tsx), gets no generated route (this page's own
    // generateStaticParams filters to "published" only), and is excluded
    // from both the sitemap and this file's own relatedStyleTags/ItemList
    // schema. Slugs here are NOT yet permanent -- treat each one as
    // provisional until its own status flips to "published" (see
    // StyleCard.slug's own comment); replaced the previous 8 fully
    // placeholder cards (pocket-leggings/compression-leggings/flare-
    // leggings/ribbed-leggings/capri-leggings/mesh-panel-leggings/fleece-
    // lined-leggings/maternity-leggings), none of which were ever real
    // PDP destinations either.
    //
    // cardTitle corrected to the owner's own exact "Custom [Style]
    // Leggings" card-format spec, 2026-09-02 (was the shorter style name
    // alone, e.g. "Flare / Wide-Leg") -- cardSubline values already
    // matched the given spec lines exactly, unchanged.
    {
      status: "draft",
      slug: "flare-wide-leg",
      cardTitle: "Custom Flare / Wide-Leg Leggings",
      cardSubline: "High-rise flare, studio to street",
      image: "",
      imageAlt: "Custom flare and wide-leg leggings manufacturer",
      href: "/activewear/leggings/flare-wide-leg",
    },
    {
      status: "draft",
      slug: "scrunch-ruched",
      cardTitle: "Custom Scrunch / Ruched Leggings",
      cardSubline: "Center-seam scrunch, shaping back",
      image: "",
      imageAlt: "Custom scrunch and ruched leggings manufacturer",
      href: "/activewear/leggings/scrunch-ruched",
    },
    {
      status: "draft",
      slug: "v-back-crossover",
      cardTitle: "Custom V-Back / Crossover Leggings",
      cardSubline: "Contoured V-back waistband",
      image: "",
      imageAlt: "Custom V-back and crossover waistband leggings manufacturer",
      href: "/activewear/leggings/v-back-crossover",
    },
    {
      status: "draft",
      slug: "capri-cropped",
      cardTitle: "Custom Capri / Cropped Leggings",
      cardSubline: "Cropped length, squat-proof",
      image: "",
      imageAlt: "Custom capri and cropped length leggings manufacturer",
      href: "/activewear/leggings/capri-cropped",
    },
    {
      status: "draft",
      slug: "pocket",
      cardTitle: "Custom Pocket Leggings",
      cardSubline: "Side and waistband pockets",
      image: "",
      imageAlt: "Custom pocket leggings manufacturer",
      href: "/activewear/leggings/pocket",
    },
    {
      status: "draft",
      slug: "biker",
      cardTitle: "Custom Biker / Short Leggings",
      cardSubline: "Compression short, 5 to 9 inch inseam",
      image: "",
      imageAlt: "Custom biker short and compression short manufacturer",
      href: "/activewear/leggings/biker",
    },
    {
      status: "draft",
      slug: "fleece-lined",
      // "Custom Fleece-Lined Leggings" (owner's exact given title) -- was
      // "Fleece-Lined / Thermal", an extra qualifier not in the given spec.
      cardTitle: "Custom Fleece-Lined Leggings",
      cardSubline: "Brushed thermal, cold-weather",
      image: "",
      imageAlt: "Custom fleece-lined thermal leggings manufacturer",
      href: "/activewear/leggings/fleece-lined",
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
