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
  // Pinned so the entity FAQ's example-styles clause does not depend on the
  // first 4 cardTitles (categoryEntityFaq()'s fallback). "High-rise"
  // replaces "high-waisted" (owner spec, 2026-09-21, naming aligned with the
  // locked 11-SKU research); edit here once and the PLP and every PDP follow.
  entityExampleStyles: "high-rise compression, flare, V-back and crossover, and capri styles",
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
    "Custom leggings manufacturer, high-rise compression, squat-proof, flare and capri styles, low MOQ. Capriowear.",
  // Figma-confirmed real copy (node 502:3310, revised 2026-08-28), same
  // treatment as h1 -- not a placeholder. Replaces the earlier single
  // quickAnswer subline, dropped from this design entirely.
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
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
  // Women's-only line (owner spec, 2026-09-21): the All/Women/Men chip row
  // does not render at any breakpoint.
  showGenderFilter: false,
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
      fabric: "Nylon or Polyamide/Spandex (70 to 85% / 15 to 30%)",
      bestFor: "Gym, yoga, everyday compression",
      performance: "Soft hand, 4-way stretch, squat-proof, strong recovery",
    },
    {
      fabric: "Recycled Polyester/Spandex",
      bestFor: "Sustainable lines",
      performance: "Eco-positioning, moisture management, 4-way stretch",
    },
    {
      fabric: "Polyester/Spandex",
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
    { text: "Fabric weight " },
    { text: "confirmed on your sample", bold: true },
    { text: ". Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  // Figma-confirmed real copy (node 634:5034, 2026-09-01) -- short PDP pill
  // labels for the same 4 fabrics `fabricOptions` above describes in full,
  // same order.
  fabricPills: ["Nylon/Spandex", "Recycled Polyester/Spandex", "Polyester/Spandex", "Brushed / fleece-lined"],
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
    { title: "Fabric", body: "Nylon, poly and recycled blends, weight confirmed on your sample" },
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
      a: "Fabric weight is confirmed on your sample, not fixed to a single number. We build compression leggings in Nylon/Spandex or Polyester/Spandex 4-way stretch blends, plus Recycled Polyester/Spandex options, and confirm the weight that holds a true compression fit on your sample before bulk.",
    },
    {
      q: "What legging styles can you make?",
      a: "High-rise and mid-rise compression, flare in both rises, capri and cropped lengths, V-back and crossover waistband, structured wide and foldover waistbands, straight-leg, and a drawcord waistband build. Every style is fully customizable to your fabric, waistband and branding.",
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
      a: "Yes, 20+ countries. DDP to the US, UK, EU, Canada and Australia, with GSP+ 0% EU duty.",
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
      // 2026-09-01: first real PDP URL is "/capriowear/activewear/leggings/
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
      // "High-Waisted" renamed "High-Rise" (owner spec, 2026-09-21, naming
      // aligned with the locked 11-SKU research); slug, SKU and photo unchanged.
      cardTitle: "Custom High-Rise Compression Leggings",
      cardSubline: "4-way stretch, squat-proof, standard waistband",
      // Placeholder/QA photo (owner, 2026-09-07: "add a dummy product
      // image ... see how it would look across home, PLP, PDP, all
      // platforms") -- a real photo supplied for visual QA of the
      // placeholder/crop behavior, not final product photography (it's a
      // waistband detail shot of shorts, not these leggings). Swap for
      // real photography once available; see `images[0]`'s own comment
      // below for why only this one slot gets it.
      image: "/product-images/leggings-high-waisted-compression.png",
      imageAlt: "Custom high-rise compression leggings",
      href: "/capriowear/activewear/leggings/high-waisted-compression",
      // Figma-confirmed real copy (node 634:4952, PDP breadcrumb, 2026-08-31).
      pdpTitle: "High-Rise Compression",
      // Figma-confirmed real copy (node 634:4988 desktop / 638:2541 mobile,
      // PDP product info text block, 2026-08-31).
      sku: "CAP-LEG-01",
      pdpHeading: "Custom High-Rise Compression Leggings Manufacturer",
      pdpDescription:
        "High-rise compression leggings, custom and private label, in a squat-proof Nylon/Spandex or Polyester/Spandex 4-way stretch blend, full-length with a standard elastic waistband, made to your brand in Sialkot, Pakistan.",
      // Figma node 634:4961 (desktop) / 638:860 (mobile), 2026-08-31 -- 6
      // entries so the desktop rail's "show more" chevron (5 visible, 1
      // hidden) has something real to demonstrate.
      // 9, not 6 (owner, 2026-09-01: "add more thumbnails so it can cover
      // the case when you have more than 6 images") -- 6 only ever needed
      // one "show more" click to reach the rail's own end; this exercises
      // the rail scrolling across multiple clicks before it runs out.
      images: [
        // Only this first entry gets a real `src` (owner-supplied QA
        // photo, see `image`'s own comment above) -- the remaining 8 stay
        // alt-only placeholders, since only one real photo exists; this
        // is a deliberate "one real photo, rest still placeholder" state
        // for the visual check, not every slot silently filled with a
        // repeat of the same image. Two real photos now (owner,
        // 2026-09-07, added a second QA image) -- `images[1]` specifically
        // also lights up `ProductCardMedia`'s own desktop hover-swap on
        // the PLP card (it reads exactly `images[0]`/`images[1]`, never
        // further into the array), so this is the one other slot worth
        // filling; alt text describes what the photo actually shows
        // (worn, in motion), not a mismatched reuse of the original
        // "back view" placeholder label.
        { alt: "High-rise compression leggings, front view", src: "/product-images/leggings-high-waisted-compression.png" },
        {
          alt: "High-rise compression leggings, worn on model, in motion",
          src: "/product-images/leggings-high-waisted-compression-2.png",
        },
        { alt: "High-rise compression leggings, side profile" },
        { alt: "High-rise compression leggings, waistband detail" },
        { alt: "High-rise compression leggings, fabric close-up" },
        { alt: "High-rise compression leggings, worn on model" },
        { alt: "High-rise compression leggings, flat lay" },
        { alt: "High-rise compression leggings, pocket detail" },
        { alt: "High-rise compression leggings, stretch in motion" },
      ],
      // Now identical to `pdpHeading` minus the layout's " | Capriowear" suffix
      // (owner spec, 2026-09-21: "Custom High-Rise Compression Leggings
      // Manufacturer | Capriowear"); supersedes the 2026-09-04 shortened form.
      pdpMetaTitle: "Custom High-Rise Compression Leggings Manufacturer",
      // Trimmed from 202 chars (owner spec, 2026-09-04, QA audit fix) --
      // also drops "nylon or polyamide," redundant since polyamide is
      // nylon.
      pdpMetaDescription:
        "Custom high-rise compression leggings manufacturer, OEM, ODM and private label, squat-proof 4-way stretch Nylon/Spandex or Polyester/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      material: "Nylon/Spandex or Polyester/Spandex, 4-way stretch",
      faqs: [
        {
          q: "What fabric is the high-rise compression legging made from?",
          a: "A Nylon/Spandex or Polyester/Spandex 4-way stretch blend, in the composition range typical of comparable premium compression leggings. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Are these leggings squat-proof?",
          a: "Yes. Every High-Rise Compression run is opacity tested on the sample before bulk production, and we hold every production run to the same standard.",
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
        { label: "Custom Mid-Rise Compression Leggings", slug: "mid-rise-compression", href: "/capriowear/activewear/leggings" },
        { label: "Custom High-Rise Flare Leggings", slug: "flare", href: "/capriowear/activewear/leggings" },
        { label: "Custom V-Back / Crossover Leggings", slug: "v-back-crossover", href: "/capriowear/activewear/leggings" },
        { label: "Custom High-Rise Capri Leggings", slug: "capri", href: "/capriowear/activewear/leggings" },
        { label: "See All", href: "/capriowear/activewear/leggings" },
      ],
      // Figma-confirmed real copy (node 634:5092, "Specifications",
      // 2026-09-02) -- this style's own build datasheet.
      specifications: [
        { label: "Style", value: "High-rise compression legging (base type)" },
        // Fixed, owner report, 2026-09-02: "Fabric row says 'Sustainable
        // lines'. That is wrong, it is a 'best for' value that leaked from
        // the fabric table" -- was copy-pasted from `fabricOptions[1]`'s
        // own `bestFor` field (that row's real fabric is "Recycled
        // polyester + spandex", not this style's actual composition). Now
        // the real composition, matching `fabricOptions[0]`'s own `fabric`
        // field for this style's base fabric, plus the recycled option.
        {
          label: "Fabric",
          value:
            "Nylon/Spandex 70 to 85% / 15 to 30%, or Polyester/Spandex 72 to 89% / 11 to 28%. Directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample" },
        { label: "Stretch and support", value: "4-way stretch, squat-proof, compression hold" },
        { label: "Waistband", value: "High-rise, standard elastic waistband, no secondary waistband construction" },
        { label: "Construction", value: "Gusset, flatlock finishing, optional pockets and drawcord" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "High-rise compression leggings, construction detail" },
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
      slug: "mid-rise-compression",
      cardTitle: "Custom Mid-Rise Compression Leggings",
      cardSubline: "4-way stretch, squat-proof, mid-rise waistband",
      image: "",
      imageAlt: "Custom mid-rise compression leggings manufacturer, full-length, standard waistband",
      href: "/capriowear/activewear/leggings/mid-rise-compression",
      // Full PDP content for SKU 2 (owner spec, 2026-09-21), authored while
      // `status` stays "draft" and with NO `internalPreview`: the card
      // stays a non-clickable "Coming soon" tile and this route is not
      // generated (a direct hit 404s) until the owner flips it to
      // "published" -- same gate as every other draft. Facts here are only
      // those in the owner's SKU 2 spec: no GSM figure of any kind (weight
      // is "pending, confirmed on your sample"), the composition ranges
      // are labeled directional category research, never this product's
      // own confirmed spec, and the waistband is the standard mid-rise
      // elastic waistband only (wide / foldover / drawcord / V-back /
      // crossover belong to separate catalog SKUs). Needs real product
      // photography before it can go live: `images` are alt-only
      // placeholders.
      pdpTitle: "Mid-Rise Compression",
      sku: "CAP-LEG-02",
      pdpHeading: "Custom Mid-Rise Compression Leggings Manufacturer",
      pdpDescription:
        "Mid-rise compression leggings, custom and private label, in a squat-proof Nylon/Spandex or Polyester/Spandex 4-way stretch blend, full-length with a standard elastic waistband, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Mid-rise compression leggings, front view" },
        { alt: "Mid-rise compression leggings, side profile" },
        { alt: "Mid-rise compression leggings, waistband detail" },
        { alt: "Mid-rise compression leggings, fabric close-up" },
        { alt: "Mid-rise compression leggings, worn on model" },
        { alt: "Mid-rise compression leggings, flat lay" },
      ],
      pdpMetaTitle: "Custom Mid-Rise Compression Leggings Manufacturer",
      pdpMetaDescription:
        "Custom mid-rise compression leggings manufacturer, OEM, ODM and private label, squat-proof 4-way stretch Nylon/Spandex or Polyester/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      faqs: [
        {
          q: "What fabric is the mid-rise compression legging made from?",
          a: "A Nylon/Spandex or Polyester/Spandex 4-way stretch blend, in the composition range typical of comparable premium compression leggings. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Is this style squat-proof?",
          a: "Yes. We test opacity on your sample before bulk and confirm it holds under stretch and movement.",
        },
        {
          q: "How is this different from the high-rise version?",
          a: "Same construction and fabric family as our High-Rise Compression legging, just set at a mid-rise waistband. Both are separately validated, real styles, not a lesser variant of one another.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Compression", slug: "high-waisted-compression", href: "/capriowear/activewear/leggings/high-waisted-compression" },
        { label: "Flare", slug: "flare", href: "/capriowear/activewear/leggings" },
        { label: "V-Back / Crossover", slug: "v-back-crossover", href: "/capriowear/activewear/leggings" },
        { label: "Capri", slug: "capri", href: "/capriowear/activewear/leggings" },
        { label: "See All", href: "/capriowear/activewear/leggings" },
      ],
      specifications: [
        { label: "Style", value: "Mid-rise compression legging, full-length, standard elastic waistband (base type)" },
        {
          label: "Fabric",
          value:
            "Nylon/Spandex 70 to 85% / 15 to 30%, or Polyester/Spandex 72 to 89% / 11 to 28%. Directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample" },
        { label: "Stretch and support", value: "4-way stretch, squat-proof, compression hold" },
        { label: "Waistband", value: "Mid-rise, standard elastic waistband, no secondary waistband construction" },
        { label: "Construction", value: "Cut-and-sew, side or princess seams, not knit-to-shape; gusset and flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Mid-rise compression leggings, construction detail" },
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "flare",
      cardTitle: "Custom High-Rise Flare Leggings",
      cardSubline: "Flared leg from the knee, high-rise",
      image: "",
      imageAlt: "Custom high-rise flare leggings manufacturer, full-length",
      href: "/capriowear/activewear/leggings/flare",
      // Full PDP content for SKU 3 (owner spec, 2026-09-21), draft. Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`), still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Only facts from the SKU 3 spec:
      // no GSM figure of any kind (weight is "pending, confirmed on your
      // sample"), composition ranges labeled directional category research
      // and never this product's own confirmed spec, and the waistband is
      // the standard elastic waistband only (structured/wide, foldover,
      // drawcord and V-back/crossover belong to other SKUs). `images` are
      // alt-only placeholders: real product photography is needed before
      // this can go live.
      pdpTitle: "High-Rise Flare",
      sku: "CAP-LEG-03",
      pdpHeading: "Custom High-Rise Flare Leggings Manufacturer",
      pdpDescription:
        "High-rise flare leggings, custom and private label, in a squat-proof Nylon/Spandex or Polyester/Spandex 4-way stretch blend, flared leg opening from the knee, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "High-rise flare leggings, front view" },
        { alt: "High-rise flare leggings, side profile" },
        { alt: "High-rise flare leggings, flared leg opening" },
        { alt: "High-rise flare leggings, fabric close-up" },
        { alt: "High-rise flare leggings, worn on model" },
        { alt: "High-rise flare leggings, flat lay" },
      ],
      pdpMetaTitle: "Custom High-Rise Flare Leggings Manufacturer",
      pdpMetaDescription:
        "Custom high-rise flare leggings manufacturer, OEM, ODM and private label, squat-proof 4-way stretch Nylon/Spandex or Polyester/Spandex, flared leg from the knee, from 50 pieces, any fabric and color, DDP worldwide.",
      faqs: [
        {
          q: "What fabric is the high-rise flare legging made from?",
          a: "A Nylon/Spandex or Polyester/Spandex 4-way stretch blend, in the composition range typical of comparable premium compression leggings. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Is this style squat-proof through the fitted leg?",
          a: "Yes. We test opacity on your sample before bulk and confirm it holds under stretch and movement, from the waist through the flare.",
        },
        {
          q: "Can I adjust the flare width or where it starts on the leg?",
          a: "Yes. Flare width and the point where it opens from the leg are adjustable to your tech pack, confirmed on your sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Compression", slug: "high-waisted-compression", href: "/capriowear/activewear/leggings/high-waisted-compression" },
        { label: "Mid-Rise Compression", slug: "mid-rise-compression", href: "/capriowear/activewear/leggings" },
        { label: "V-Back / Crossover", slug: "v-back-crossover", href: "/capriowear/activewear/leggings" },
        { label: "Capri", slug: "capri", href: "/capriowear/activewear/leggings" },
        { label: "See All", href: "/capriowear/activewear/leggings" },
      ],
      specifications: [
        {
          label: "Style",
          value: "High-rise flare legging, full-length, standard elastic waistband, flared leg opening from the knee (base type)",
        },
        {
          label: "Fabric",
          value:
            "Nylon/Spandex 70 to 85% / 15 to 30%, or Polyester/Spandex 72 to 89% / 11 to 28%. Directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample" },
        { label: "Stretch and support", value: "4-way stretch, squat-proof, compression through the leg to the knee" },
        { label: "Waistband", value: "High-rise, standard elastic waistband, no secondary waistband construction" },
        {
          label: "Construction",
          value:
            "Cut-and-sew, flare achieved through pattern pieces from the knee to hem, side or princess seams above the flare, gusset and flatlock finishing available",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "High-rise flare leggings, construction detail" },
      pdpQualityPoints: [
        "Opacity tested, squat-proof",
        "Seams reinforced and stress-tested",
        "Flare panel seams checked for consistent drape across the size run",
        "Waistbands hold their recovery",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "structured-waistband",
      cardTitle: "Custom Structured Waistband Leggings",
      cardSubline: "Wide, structured waistband panel",
      image: "",
      imageAlt: "Custom high-rise compression leggings manufacturer, structured wide waistband",
      href: "/capriowear/activewear/leggings/structured-waistband",
      // Full PDP content for SKU 4 (owner spec, 2026-09-21), draft. Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`), still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Only facts from the SKU 4 spec:
      // no GSM figure of any kind (weight is "pending, confirmed on your
      // sample"), composition ranges labeled directional category research
      // and never this product's own confirmed spec. The wide, structured
      // waistband panel IS this SKU's differentiator (unlike SKU 1/2/3's
      // standard elastic band); foldover, drawcord and V-back/crossover
      // belong to other SKUs. `images` are alt-only placeholders: real
      // photography is needed before launch and must show the full-length
      // build, not the cropped locked-reference product.
      pdpTitle: "Structured Waistband",
      sku: "CAP-LEG-04",
      pdpHeading: "Custom Structured Waistband Leggings Manufacturer",
      pdpDescription:
        "High-rise compression leggings with a wide, structured waistband panel, custom and private label, in a squat-proof Nylon/Spandex or Polyester/Spandex 4-way stretch blend, full-length, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Structured waistband leggings, front view" },
        { alt: "Structured waistband leggings, side profile" },
        { alt: "Structured waistband leggings, wide waistband panel detail" },
        { alt: "Structured waistband leggings, fabric close-up" },
        { alt: "Structured waistband leggings, worn on model" },
        { alt: "Structured waistband leggings, flat lay" },
      ],
      pdpMetaTitle: "Custom Structured Waistband Leggings Manufacturer",
      pdpMetaDescription:
        "Custom structured wide waistband leggings manufacturer, OEM, ODM and private label, squat-proof 4-way stretch Nylon/Spandex or Polyester/Spandex, wide structured waistband panel, from 50 pieces, any fabric and color, DDP worldwide.",
      faqs: [
        {
          q: "What fabric is the structured waistband legging made from?",
          a: "A Nylon/Spandex or Polyester/Spandex 4-way stretch blend, in the composition range typical of comparable premium compression leggings. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "What makes this waistband different from your standard style?",
          a: "A wide, structured panel, bonded or two-piece construction, rather than a single standard elastic band. We confirm the panel width and construction on your sample before bulk.",
        },
        {
          q: "Is this style available in a cropped length too?",
          a: "Full-length is the standard build for this SKU. Cropped and capri lengths are separate styles in our catalog, and we can also build this waistband treatment at a cropped length on request.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Compression", slug: "high-waisted-compression", href: "/capriowear/activewear/leggings/high-waisted-compression" },
        { label: "Mid-Rise Compression", slug: "mid-rise-compression", href: "/capriowear/activewear/leggings" },
        { label: "Flare", slug: "flare", href: "/capriowear/activewear/leggings" },
        { label: "V-Back / Crossover", slug: "v-back-crossover", href: "/capriowear/activewear/leggings" },
        { label: "See All", href: "/capriowear/activewear/leggings" },
      ],
      specifications: [
        { label: "Style", value: "High-rise compression legging, full-length, wide structured waistband panel (base type)" },
        {
          label: "Fabric",
          value:
            "Nylon/Spandex 70 to 85% / 15 to 30%, or Polyester/Spandex 72 to 89% / 11 to 28%. Directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample" },
        {
          label: "Waistband",
          value: "Wide, structured or double-layered waistband panel, bonded or two-piece construction",
        },
        { label: "Stretch and support", value: "4-way stretch, squat-proof, compression hold" },
        {
          label: "Construction",
          value: "Cut-and-sew, side or princess seams, not knit-to-shape; full-length leg; gusset and flatlock finishing available",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Structured waistband leggings, construction detail" },
      pdpQualityPoints: [
        "Opacity tested, squat-proof",
        "Seams reinforced and stress-tested",
        "Waistband panel bonding checked for edge lift and roll after repeated wear",
        "Waistbands hold their recovery",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "capri",
      cardTitle: "Custom High-Rise Capri Leggings",
      cardSubline: "7/8 length, high-rise compression",
      image: "",
      imageAlt: "Custom high-rise capri and 7/8 length compression leggings manufacturer",
      href: "/capriowear/activewear/leggings/capri",
      // Full PDP content for SKU 5 (owner spec, 2026-09-21), draft. Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`), still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Only facts from the SKU 5 spec:
      // no GSM figure of any kind (weight is "pending, confirmed on your
      // sample"), composition is a directional research range pending
      // sample confirmation, and the waistband is the standard elastic
      // waistband only (SKU 4's structured wide panel and SKU 6's
      // V-back/crossover are separate). `images` are alt-only placeholders:
      // real product photography is needed before this can go live.
      pdpTitle: "High-Rise Capri",
      sku: "CAP-LEG-05",
      pdpHeading: "Custom High-Rise Capri Leggings Manufacturer",
      pdpDescription:
        "High-rise compression leggings, custom and private label, in a squat-proof Nylon/Spandex or Polyester/Spandex 4-way stretch blend, 7/8 or capri length ending at or just above the ankle, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "High-rise capri leggings, front view" },
        { alt: "High-rise capri leggings, side profile" },
        { alt: "High-rise capri leggings, 7/8 hem detail" },
        { alt: "High-rise capri leggings, fabric close-up" },
        { alt: "High-rise capri leggings, worn on model" },
        { alt: "High-rise capri leggings, flat lay" },
      ],
      pdpMetaTitle: "Custom High-Rise Capri Leggings Manufacturer",
      pdpMetaDescription:
        "Custom high-rise 7/8 or capri leggings manufacturer, OEM, ODM and private label, squat-proof 4-way stretch Nylon/Spandex or Polyester/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      faqs: [
        {
          q: "What fabric is the high-rise capri legging made from?",
          a: "A Nylon/Spandex or Polyester/Spandex 4-way stretch blend, in the composition range typical of comparable premium compression leggings. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "What's the exact length, 7/8 or capri?",
          a: "We build to your tech pack. Standard is 7/8, ending just above the ankle, and we can adjust to a shorter capri length or your own exact measurement on your sample.",
        },
        {
          q: "Is this available full-length too?",
          a: "Yes, as a separate style, our High-Rise Compression legging (full-length). This SKU is the 7/8 or capri version of the same core construction.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Compression", slug: "high-waisted-compression", href: "/capriowear/activewear/leggings" },
        { label: "Mid-Rise Compression", slug: "mid-rise-compression", href: "/capriowear/activewear/leggings" },
        { label: "Flare", slug: "flare", href: "/capriowear/activewear/leggings" },
        { label: "Structured Waistband", slug: "structured-waistband", href: "/capriowear/activewear/leggings" },
        { label: "See All", href: "/capriowear/activewear/leggings" },
      ],
      specifications: [
        { label: "Style", value: "High-rise compression legging, 7/8 or capri length, standard elastic waistband (base type)" },
        {
          label: "Fabric",
          value:
            "Nylon/Spandex 70 to 85% / 15 to 30%, or Polyester/Spandex 72 to 89% / 11 to 28%, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample" },
        { label: "Stretch and support", value: "4-way stretch, squat-proof, compression hold" },
        { label: "Waistband", value: "High-rise, standard elastic waistband, no secondary waistband construction" },
        {
          label: "Construction",
          value:
            "Cut-and-sew, side or princess seams, not knit-to-shape. 7/8 or capri length ending at or just above the ankle. Gusset and flatlock finishing available.",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "High-rise capri leggings, construction detail" },
      pdpQualityPoints: [
        "Opacity tested, squat-proof",
        "Seams reinforced and stress-tested",
        "Hem finish checked for roll and curl at the 7/8 length",
        "Waistbands hold their recovery",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin house, no outsourcing",
        mobileHeading: "Your brand, applied in\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "v-back-crossover",
      cardTitle: "Custom V-Back / Crossover Leggings",
      cardSubline: "V-back or crossover waistband seam",
      image: "",
      imageAlt: "Custom high-rise V-back and crossover waistband leggings manufacturer",
      href: "/capriowear/activewear/leggings/v-back-crossover",
      // Full PDP content for SKU 6 (owner spec, 2026-09-21), draft. Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`), still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Only facts from the SKU 6 spec:
      // no GSM figure of any kind (weight is "pending, confirmed on your
      // sample"), composition is a directional research range pending
      // sample confirmation. The V-back or crossover seam at the waistband
      // is this SKU's differentiator (distinct from the plain standard
      // elastic band on SKU 1/2/3/5 and SKU 4's structured wide panel).
      // `images` are alt-only placeholders: real product photography is
      // needed before this can go live.
      pdpTitle: "V-Back / Crossover",
      sku: "CAP-LEG-06",
      pdpHeading: "Custom V-Back / Crossover Leggings Manufacturer",
      pdpDescription:
        "High-rise compression leggings with a V-back or crossover waistband seam, custom and private label, in a squat-proof Nylon/Spandex or Polyester/Spandex 4-way stretch blend, full-length, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "V-back crossover leggings, front view" },
        { alt: "V-back crossover leggings, back view showing waistband seam" },
        { alt: "V-back crossover leggings, side profile" },
        { alt: "V-back crossover leggings, fabric close-up" },
        { alt: "V-back crossover leggings, worn on model" },
        { alt: "V-back crossover leggings, flat lay" },
      ],
      pdpMetaTitle: "Custom V-Back / Crossover Leggings Manufacturer",
      pdpMetaDescription:
        "Custom V-back or crossover waistband leggings manufacturer, OEM, ODM and private label, squat-proof 4-way stretch Nylon/Spandex or Polyester/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      faqs: [
        {
          q: "What fabric is the V-back or crossover legging made from?",
          a: "A Nylon/Spandex or Polyester/Spandex 4-way stretch blend, in the composition range typical of comparable premium compression leggings. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "What does the V-back or crossover waistband actually look like?",
          a: "A visible seam detail at the back of the waistband, either a V shape or a crossover, built into the cut-and-sew pattern rather than added afterward. We confirm the exact shape and seam placement on your sample.",
        },
        {
          q: "Is this the same base legging as your High-Rise Compression style?",
          a: "Same core silhouette and fabric family, with the V-back or crossover waistband seam as the distinguishing feature. Both are separately validated, real styles.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Compression", slug: "high-waisted-compression", href: "/capriowear/activewear/leggings" },
        { label: "Flare", slug: "flare", href: "/capriowear/activewear/leggings" },
        { label: "Structured Waistband", slug: "structured-waistband", href: "/capriowear/activewear/leggings" },
        { label: "Capri", slug: "capri", href: "/capriowear/activewear/leggings" },
        { label: "See All", href: "/capriowear/activewear/leggings" },
      ],
      specifications: [
        { label: "Style", value: "High-rise compression legging, full-length, V-back or crossover waistband seam (base type)" },
        {
          label: "Fabric",
          value:
            "Nylon/Spandex 70 to 85% / 15 to 30%, or Polyester/Spandex 72 to 89% / 11 to 28%, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample" },
        { label: "Stretch and support", value: "4-way stretch, squat-proof, compression hold" },
        { label: "Waistband", value: "High-rise, V-back or crossover seam detail at the waistband" },
        {
          label: "Construction",
          value:
            "Cut-and-sew, V-back or crossover seam achieved through pattern pieces at the waistband, side or princess seams through the leg, not knit-to-shape. Gusset and flatlock finishing available.",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "V-back crossover leggings, construction detail" },
      pdpQualityPoints: [
        "Opacity tested, squat-proof",
        "Seams reinforced and stress-tested",
        "Waistband seam checked for strength and lie flat under stretch",
        "Waistbands hold their recovery",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "foldover-waistband",
      cardTitle: "Custom Foldover Waistband Leggings",
      cardSubline: "Foldover waistband, two wearable rises",
      image: "",
      imageAlt: "Custom high-rise foldover waistband leggings manufacturer",
      href: "/capriowear/activewear/leggings/foldover-waistband",
      // Full PDP content for SKU 7 (owner spec, 2026-09-21), draft. Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`), still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Only facts from the SKU 7 spec:
      // no GSM figure of any kind (weight is "pending, confirmed on your
      // sample"), composition is a directional research range pending
      // sample confirmation. The foldover, doubled-fabric waistband panel,
      // wearable at two rise heights, is this SKU's differentiator
      // (distinct from the plain standard elastic band on SKU 1/2/3/5,
      // SKU 4's structured wide panel and SKU 6's V-back/crossover seam).
      // `images` are alt-only placeholders: real product photography is
      // needed before this can go live.
      pdpTitle: "Foldover Waistband",
      sku: "CAP-LEG-07",
      pdpHeading: "Custom Foldover Waistband Leggings Manufacturer",
      pdpDescription:
        "High-rise compression leggings with a foldover, adjustable waistband panel wearable at two rise heights, custom and private label, in a squat-proof Nylon/Spandex or Polyester/Spandex 4-way stretch blend, full-length, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Foldover waistband leggings, front view" },
        { alt: "Foldover waistband leggings, waistband folded down" },
        { alt: "Foldover waistband leggings, waistband unfolded high rise" },
        { alt: "Foldover waistband leggings, fabric close-up" },
        { alt: "Foldover waistband leggings, worn on model" },
        { alt: "Foldover waistband leggings, flat lay" },
      ],
      pdpMetaTitle: "Custom Foldover Waistband Leggings Manufacturer",
      pdpMetaDescription:
        "Custom foldover waistband leggings manufacturer, OEM, ODM and private label, squat-proof 4-way stretch Nylon/Spandex or Polyester/Spandex, wearable at two rise heights, from 50 pieces, any fabric and color, DDP worldwide.",
      faqs: [
        {
          q: "What fabric is the foldover waistband legging made from?",
          a: "A Nylon/Spandex or Polyester/Spandex 4-way stretch blend, in the composition range typical of comparable premium compression leggings. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How does the foldover waistband work?",
          a: "It's a doubled fabric panel that folds down or up, letting you wear it at two different rise heights on the same pair. We confirm the fold depth and hold on your sample.",
        },
        {
          q: "Is this the same base legging as your High-Rise Compression style?",
          a: "Same core silhouette and fabric family, with the foldover waistband panel as the distinguishing feature. Both are separately validated, real styles.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Compression", slug: "high-waisted-compression", href: "/capriowear/activewear/leggings" },
        { label: "V-Back / Crossover", slug: "v-back-crossover", href: "/capriowear/activewear/leggings" },
        { label: "Structured Waistband", slug: "structured-waistband", href: "/capriowear/activewear/leggings" },
        { label: "Capri", slug: "capri", href: "/capriowear/activewear/leggings" },
        { label: "See All", href: "/capriowear/activewear/leggings" },
      ],
      specifications: [
        { label: "Style", value: "High-rise compression legging, full-length, foldover adjustable waistband panel (base type)" },
        {
          label: "Fabric",
          value:
            "Nylon/Spandex 70 to 85% / 15 to 30%, or Polyester/Spandex 72 to 89% / 11 to 28%, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample" },
        { label: "Stretch and support", value: "4-way stretch, squat-proof, compression hold" },
        { label: "Waistband", value: "Foldover, doubled fabric panel, adjustable and wearable at two rise heights" },
        {
          label: "Construction",
          value:
            "Cut-and-sew, foldover waistband panel constructed as doubled fabric, side or princess seams through the leg, not knit-to-shape. Gusset and flatlock finishing available.",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Foldover waistband leggings, construction detail" },
      pdpQualityPoints: [
        "Opacity tested, squat-proof",
        "Seams reinforced and stress-tested",
        "Foldover panel checked for hold and recovery at both wearable heights",
        "Waistbands hold their recovery",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "mid-rise-capri",
      cardTitle: "Custom Mid-Rise Capri Leggings",
      cardSubline: "Cropped length, mid-rise compression",
      image: "",
      imageAlt: "Custom mid-rise capri and cropped length compression leggings manufacturer",
      href: "/capriowear/activewear/leggings/mid-rise-capri",
      // Full PDP content for SKU 8 (owner spec, 2026-09-21), draft. Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`), still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Only facts from the SKU 8 spec:
      // no GSM figure of any kind (weight is "pending, confirmed on your
      // sample"), composition is a directional research range pending
      // sample confirmation. Mid-rise, standard elastic waistband, capri or
      // cropped length ending mid-calf (distinct from SKU 2 full-length and
      // SKU 5 high-rise capri). `images` are alt-only placeholders: real
      // product photography is needed before this can go live.
      pdpTitle: "Mid-Rise Capri",
      sku: "CAP-LEG-08",
      pdpHeading: "Custom Mid-Rise Capri Leggings Manufacturer",
      pdpDescription:
        "Mid-rise compression leggings, custom and private label, in a squat-proof Nylon/Spandex or Polyester/Spandex 4-way stretch blend, capri or cropped length ending mid-calf, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Mid-rise capri leggings, front view" },
        { alt: "Mid-rise capri leggings, side profile" },
        { alt: "Mid-rise capri leggings, cropped hem detail" },
        { alt: "Mid-rise capri leggings, fabric close-up" },
        { alt: "Mid-rise capri leggings, worn on model" },
        { alt: "Mid-rise capri leggings, flat lay" },
      ],
      pdpMetaTitle: "Custom Mid-Rise Capri Leggings Manufacturer",
      pdpMetaDescription:
        "Custom mid-rise capri or cropped leggings manufacturer, OEM, ODM and private label, squat-proof 4-way stretch Nylon/Spandex or Polyester/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      faqs: [
        {
          q: "What fabric is the mid-rise capri legging made from?",
          a: "A Nylon/Spandex or Polyester/Spandex 4-way stretch blend, in the composition range typical of comparable premium compression leggings. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "What's the exact length on this style?",
          a: "We build to your tech pack. Standard is a cropped, capri length ending mid-calf, and we can adjust to your own exact measurement on your sample.",
        },
        {
          q: "How is this different from your other capri style?",
          a: "Our High-Rise Capri legging is set at a high-rise waistband; this style is mid-rise. Same construction family, different waistband height, both separately validated, real styles.",
        },
      ],
      relatedStyleTags: [
        { label: "Mid-Rise Compression", slug: "mid-rise-compression", href: "/capriowear/activewear/leggings" },
        { label: "High-Rise Compression", slug: "high-waisted-compression", href: "/capriowear/activewear/leggings" },
        { label: "Capri", slug: "capri", href: "/capriowear/activewear/leggings" },
        { label: "Structured Waistband", slug: "structured-waistband", href: "/capriowear/activewear/leggings" },
        { label: "See All", href: "/capriowear/activewear/leggings" },
      ],
      specifications: [
        { label: "Style", value: "Mid-rise compression legging, capri or cropped length, standard elastic waistband (base type)" },
        {
          label: "Fabric",
          value:
            "Nylon/Spandex 70 to 85% / 15 to 30%, or Polyester/Spandex 72 to 89% / 11 to 28%, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample" },
        { label: "Stretch and support", value: "4-way stretch, squat-proof, compression hold" },
        { label: "Waistband", value: "Mid-rise, standard elastic waistband, no secondary waistband construction" },
        {
          label: "Construction",
          value:
            "Cut-and-sew, side or princess seams, not knit-to-shape. Capri or cropped length ending mid-calf. Gusset and flatlock finishing available.",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Mid-rise capri leggings, construction detail" },
      pdpQualityPoints: [
        "Opacity tested, squat-proof",
        "Seams reinforced and stress-tested",
        "Hem finish checked for roll and curl at the cropped length",
        "Waistbands hold their recovery",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Nylon/Spandex or Polyester/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "straight-leg",
      cardTitle: "Custom Straight-Leg Leggings",
      cardSubline: "Straight, non-tapered leg, mid-rise",
      image: "",
      imageAlt: "Custom mid-rise straight-leg leggings manufacturer, full-length",
      href: "/capriowear/activewear/leggings/straight-leg",
    },
    {
      status: "draft",
      slug: "drawcord",
      cardTitle: "Custom Drawcord Waistband Leggings",
      cardSubline: "Exposed drawcord over the waistband",
      image: "",
      imageAlt: "Custom high-rise drawcord waistband leggings manufacturer, full-length",
      href: "/capriowear/activewear/leggings/drawcord",
    },
    {
      status: "draft",
      slug: "mid-rise-flare",
      cardTitle: "Custom Mid-Rise Flare Leggings",
      cardSubline: "Flared leg from the knee, mid-rise",
      image: "",
      imageAlt: "Custom mid-rise flare leggings manufacturer, full-length",
      href: "/capriowear/activewear/leggings/mid-rise-flare",
    },
    // Two design-forward, card-only drafts (owner spec, 2026-09-21), NOT
    // convergence-validated like the 11 styles above: each is a single-brand,
    // single-product reference (Nike/NikeSKIMS only), included as a judgment
    // call. No PDP content, no composition or GSM figure, and deliberately
    // left out of `entityExampleStyles` and the "What legging styles can you
    // make?" FAQ until they have cross-brand backing and a real PDP.
    {
      status: "draft",
      slug: "v-panel-capri",
      cardTitle: "Custom V-Panel Capri Leggings",
      cardSubline: "Double-layered V-panel, capri length",
      image: "",
      imageAlt: "Custom V-panel capri leggings manufacturer, double-layered V-panel, high-rise",
      href: "/capriowear/activewear/leggings/v-panel-capri",
    },
    {
      status: "draft",
      slug: "skirt-overlay",
      cardTitle: "Custom Skirt-Overlay Leggings",
      cardSubline: "Layered skirt overlay, mid-rise",
      image: "",
      imageAlt: "Custom skirt-overlay leggings manufacturer, layered skirt overlay, mid-rise",
      href: "/capriowear/activewear/leggings/skirt-overlay",
    },
  ],
  // Real hrefs and labels, matching content/home.ts's own activewearMegaMenu
  // exactly (owner request, 2026-08-30) -- no PLACEHOLDER prefix, since
  // this is now a real, rendered internal-linking row (RelatedCategories).
  relatedLinks: [
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
    { label: "Shorts", href: "/capriowear/activewear/shorts" },
    { label: "Joggers", href: "/capriowear/activewear/joggers" },
    { label: "Compression & Base Layers", href: "/capriowear/activewear/compression-base-layers" },
  ],
};
