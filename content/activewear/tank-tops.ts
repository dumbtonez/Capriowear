// content/activewear/tank-tops.ts
// Full PLP content replacement, 2026-09-22 (owner spec): a real 16-SKU,
// dual-gender catalog (8 men's, 8 women's) replaces the earlier 9-style
// test build. Every style stays "draft" (owner spec): each card shows on
// the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
//
// The gender chip row (All/Women/Men) actually filters the grid (site-wide
// capability, added for Shorts, 2026-09-22) via each card's own `gender`
// field -- see StyleCard.gender's own comment in ./types.ts and
// ActivewearListing.tsx. Two pairs of cards intentionally share a card
// name by design (gender-paired styles: Fitted, Ribbed) but use distinct,
// gender-disambiguated slugs (fitted-mens/fitted-womens,
// ribbed-mens/ribbed-womens) -- never collapsed to one shared slug.
import type { Category } from "./types";

export const tankTops: Category = {
  slug: "tank-tops",
  group: "Activewear",
  menuLabel: "Tank Tops",
  manufacturerNoun: "Tank Top",
  productNounPlural: "tank tops",
  entityExampleStyles:
    "oversized cut-off, fitted, relaxed, athletic, stringer, and racerback styles for men, and fitted, relaxed, cropped, racerback, shelf-bra, and halter styles for women",
  h1: "Custom Tank Top Manufacturer",
  metaTitle: "Custom Tank Top Manufacturer",
  // Meta description only re-targeted, 2026-09-22 (owner spec, SERP
  // check): "custom tank top manufacturer" (10/mo, low competition,
  // wrong intent, dominated by print-on-demand sites) -> "tank top
  // manufacturer" (260/mo, high competition, correct B2B intent,
  // dominated by real manufacturers), worked into this description's own
  // prose rather than the title tag or H1 -- both of those stay the
  // locked "Custom Tank Top Manufacturer" form untouched, same as every
  // other field on this page (owner explicit: title/H1/slug/every other
  // section unchanged, description only).
  metaDescription:
    "Custom tank top manufacturing for activewear and teamwear brands. Request samples, MOQs, and turnaround from a tank top manufacturer built for bulk orders, OEM, ODM, and private label, any fabric and color, DDP worldwide.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Cotton (jersey or heavyweight)",
      bestFor: "Oversized cut-off, relaxed, and streetwear styles",
      performance: "Soft hand, breathable, brushed or garment-washed finish available",
    },
    {
      fabric: "Cotton-poly blend",
      bestFor: "Everyday relaxed and casual training tanks",
      performance: "Durable, soft hand, easy-care",
    },
    {
      fabric: "Cotton-spandex or moisture-wicking polyester blend",
      bestFor: "Racerback and athletic performance tanks",
      performance: "Quick-dry, moisture-wicking, 4-way stretch",
    },
    {
      fabric: "Polyester-spandex, cotton/lyocell/elastane, or nylon-elastane blends",
      bestFor: "Fitted, stringer, and compression tanks",
      performance: "Soft hand, 4-way stretch, strong recovery",
    },
    {
      fabric: "Ribbed cotton or cotton-blend knit",
      bestFor: "Ribbed tanks, fitted layering",
      performance: "Fitted drape, requires pre-bulk testing for stretch recovery and shrinkage",
    },
  ],
  // Owner's exact given rule (owner spec, 2026-09-22): no GSM or
  // composition figure stated in this table, fabric weight confirmed per
  // SKU on sample.
  fabricNote: [
    {
      text: "No GSM or composition figure is stated here. Fabric weight is confirmed per SKU on your sample, not estimated. Swatches before every bulk run, and we can source or match a ",
    },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  fabricPills: [
    "Cotton",
    "Cotton-poly blend",
    "Cotton-spandex / moisture-wicking polyester",
    "Poly-spandex / nylon-elastane",
    "Ribbed knit",
  ],
  qualityHeading: "Fit that holds, seams that don't chafe",
  qualitySubline: "We confirm it all on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Seams reinforced and stress-tested",
    "Armhole depth and strap width checked for consistency at every size",
    "Rib-knit stretch recovery, shrinkage, and opacity tested before bulk",
    "Shelf bra and racerback construction checked for hold and fit stability",
    "Every run inspected to AQL 2.5",
    "Third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Cotton, cotton-poly, poly-spandex, nylon-elastane, and ribbed knit blends" },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, DTF" },
    {
      title: "Style and fit",
      body: "Armhole depth and shape, strap width, back construction, body length, graded XS to 5XL",
    },
    { title: "Branding", body: "Your logos by print, silicone, heat transfer, or embroidery" },
    { title: "Labels", body: "Woven, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom tank tops?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Which fabrics do you use for tank tops?",
      a: "Cotton, cotton-poly, poly-spandex, nylon-elastane, and ribbed knit blends, confirmed on your sample.",
    },
    {
      q: "What is the difference between a muscle tank, a stringer, and a standard racerback?",
      a: "Armhole depth and strap width, specifically. A standard tank uses a moderate armhole cut. A muscle tank uses a wider, deeper dropped armhole. A stringer uses the deepest, most extreme armhole cut paired with ultra-narrow straps. All three can be built on a racerback or straight-back construction.",
    },
    {
      q: "Can armhole depth and strap width be customized to a reference garment?",
      a: "Yes. Send a reference tank or tech pack and we match armhole depth, strap width, and back construction, confirmed on your sample.",
    },
    {
      q: "Do you offer a built-in shelf-bra or padded tank construction?",
      a: "Yes. A sewn-in shelf bra with adjustable straps and removable pads, confirmed for fit and support on your sample.",
    },
    {
      q: "Will a ribbed tank hold its shape, and will it twist?",
      a: "We test every ribbed-knit style for stretch recovery and twisting before bulk, and confirm results on your sample.",
    },
    {
      q: "Can you match a specific fabric or a reference tank?",
      a: "Yes. Send a swatch, reference, or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, color, print, armhole depth and shape, strap width, back construction, body length, your logos, woven and care labels, hangtags, and retail packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM, and private label tank tops?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, 20+ countries, DDP.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch, or a reference tank through our contact form. We come back within 24 hours with next steps, including a quote and sample timeline.",
    },
  ],
  ctaReferenceNoun: "tank top",
  // 16 styles, 8 men's (CAP-TNK-01 to 08) then 8 women's (CAP-TNK-09 to
  // 16), every one "draft" (owner spec, 2026-09-22): real name, one-line
  // spec, and a `gender` tag for the chip-row filter. Shows on the grid
  // as a non-clickable tile (no hover image swap either, since no
  // `images` array is set -- see ProductCardMedia.tsx's own contract),
  // no generated route, excluded from the sitemap and this category's
  // own ItemList schema. No PDP content built yet for any card -- do not
  // invent PDP-only fields (pdpTitle, pdpDescription, gallery, etc.) for
  // any card here.
  styleCards: [
    {
      status: "draft",
      slug: "oversized-cutoff",
      cardTitle: "Custom Oversized Cut-Off Tank",
      cardSubline: "Boxy, dropped-shoulder, wide raw-cut armhole",
      gender: "Men",
      image: "",
      imageAlt: "Custom oversized cut-off tank manufacturer",
      href: "/capriowear/activewear/tank-tops/oversized-cutoff",
    },
    {
      status: "draft",
      slug: "fitted-mens",
      cardTitle: "Custom Fitted Tank",
      cardSubline: "Close-fitting, standard neckline and armhole",
      gender: "Men",
      image: "",
      imageAlt: "Custom fitted tank manufacturer, men's",
      href: "/capriowear/activewear/tank-tops/fitted-mens",
    },
    {
      status: "draft",
      slug: "relaxed-mens",
      cardTitle: "Custom Relaxed Tank",
      cardSubline: "Softer, roomier fit, finished armhole",
      gender: "Men",
      image: "",
      imageAlt: "Custom relaxed tank manufacturer, men's",
      href: "/capriowear/activewear/tank-tops/relaxed-mens",
    },
    {
      status: "draft",
      slug: "athletic",
      cardTitle: "Custom Athletic Tank",
      cardSubline: "True-to-size training and running cut",
      gender: "Men",
      image: "",
      imageAlt: "Custom athletic tank manufacturer",
      href: "/capriowear/activewear/tank-tops/athletic",
      // Full PDP content for SKU 4 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 3. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "Athletic",
      sku: "CAP-TNK-04",
      pdpHeading: "Custom Athletic Tank Manufacturer",
      pdpDescription:
        "Men's true-to-size, performance training tank with a deep scoop neckline, custom and private label, in recycled polyester or moisture-wicking knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Athletic tank, front view" },
        { alt: "Athletic tank, neckline detail" },
        { alt: "Athletic tank, side profile" },
        { alt: "Athletic tank, fabric close-up" },
        { alt: "Athletic tank, worn on model" },
        { alt: "Athletic tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Athletic Tank Manufacturer",
      pdpMetaDescription:
        "Custom athletic tank manufacturer, OEM, ODM and private label, true-to-size training and running cut, deep scoop neckline, recycled polyester, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Recycled Polyester", "Poly-Spandex", "Cotton-Poly Blend", "Nylon-Elastane"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces (plus waist-inch sizing)" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the athletic tank made from?",
          a: "Recycled polyester or moisture-wicking knit, in the composition range typical of comparable performance training tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Fitted Tank?",
          a: "This uses a true-to-size cut, not a compression fit. Our Fitted Tank uses a closer, body-hugging compression construction.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Relaxed Tank", slug: "relaxed-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Racerback Singlet", slug: "racerback-singlet", href: "/capriowear/activewear/tank-tops" },
        { label: "Ribbed Tank", slug: "ribbed-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's true-to-size, performance training tank, deep scoop neckline (base type)",
        },
        {
          label: "Fabric",
          value: "Recycled polyester or moisture-wicking knit, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Athletic, true-to-size. Not fitted-compression, not oversized-boxy." },
        { label: "Armhole", value: "Standard armhole, finished edge" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Athletic tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "True-to-size fit checked for consistency across the size run",
        "Moisture-wicking performance checked before bulk",
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
            body: "Recycled polyester or moisture-wicking knit, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "stringer",
      cardTitle: "Custom Stringer Tank",
      cardSubline: "Narrow straps, deep-cut racerback armhole",
      gender: "Men",
      image: "",
      imageAlt: "Custom stringer tank manufacturer",
      href: "/capriowear/activewear/tank-tops/stringer",
      // Full PDP content for SKU 5 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 4. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". Real GSM figure
      // (165, attributed to "the confirmed range on comparable stringer
      // builds," not a brand name, per the brief). `images` are alt-only
      // placeholders: real product photography is needed before this can
      // go live. CTA is Request a Sample only.
      pdpTitle: "Stringer",
      sku: "CAP-TNK-05",
      pdpHeading: "Custom Stringer Tank Manufacturer",
      pdpDescription:
        "Men's stringer tank with narrow straps and a deep-cut racerback armhole, custom and private label, in cotton/lyocell/elastane jersey, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Stringer tank, front view" },
        { alt: "Stringer tank, armhole and strap detail" },
        { alt: "Stringer tank, side profile" },
        { alt: "Stringer tank, fabric close-up" },
        { alt: "Stringer tank, worn on model" },
        { alt: "Stringer tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Stringer Tank Manufacturer",
      pdpMetaDescription:
        "Custom stringer tank manufacturer, OEM, ODM and private label, narrow straps, deep-cut racerback armhole, cotton/lyocell/elastane jersey, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Cotton/Lyocell/Elastane", "Cotton", "Poly-Spandex", "Nylon-Elastane"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces (plus waist-inch sizing)" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the stringer tank made from?",
          a: "Cotton/lyocell/elastane jersey, in the composition range typical of comparable stringer tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "What is the difference between a stringer and your Racerback Singlet?",
          a: "Armhole depth and strap width. A stringer uses the deepest, most extreme armhole cut paired with ultra-narrow straps. Our Racerback Singlet uses a full racerback with a more moderate armhole and wider straps.",
        },
      ],
      relatedStyleTags: [
        { label: "Racerback Singlet", slug: "racerback-singlet", href: "/capriowear/activewear/tank-tops" },
        { label: "Muscle-Cut Tank", slug: "muscle-cut", href: "/capriowear/activewear/tank-tops" },
        { label: "Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Oversized Cut-Off Tank", slug: "oversized-cutoff", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's stringer tank, narrow straps, deep-cut racerback armhole (base type)",
        },
        {
          label: "Fabric",
          value: "Cotton/lyocell/elastane jersey, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "165 GSM. Final weight confirmed on your sample." },
        { label: "Fit", value: "Fitted. Deep-scooped stringer armholes, racerback (Y-back) construction." },
        { label: "Strap width", value: "Ultra-narrow, scales with armhole depth" },
        {
          label: "Armhole",
          value: "Confirmation needed on target market and exposure level before bulk, per standard stringer construction guidance",
        },
        { label: "Hem", value: "Straight, curved or raw-cut hem option available" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Stringer tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Armhole depth and strap width checked for consistency at every size",
        "Racerback construction checked for hold and fit stability",
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
            body: "Cotton/lyocell/elastane jersey, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "racerback-singlet",
      cardTitle: "Custom Racerback Singlet",
      cardSubline: "Fitted singlet, full racerback construction",
      gender: "Men",
      image: "",
      imageAlt: "Custom racerback singlet manufacturer",
      href: "/capriowear/activewear/tank-tops/racerback-singlet",
      // Full PDP content for SKU 6 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 5. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "Racerback Singlet",
      sku: "CAP-TNK-06",
      pdpHeading: "Custom Racerback Singlet Manufacturer",
      pdpDescription:
        "Men's fitted running and training singlet with a full racerback construction, custom and private label, in stretch compression knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Racerback singlet, front view" },
        { alt: "Racerback singlet, back construction detail" },
        { alt: "Racerback singlet, side profile" },
        { alt: "Racerback singlet, fabric close-up" },
        { alt: "Racerback singlet, worn on model" },
        { alt: "Racerback singlet, flat lay" },
      ],
      pdpMetaTitle: "Custom Racerback Singlet Manufacturer",
      pdpMetaDescription:
        "Custom racerback singlet manufacturer, OEM, ODM and private label, fitted running and training singlet, full racerback construction, stretch compression knit, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Poly-Spandex", "Nylon-Elastane", "Recycled Polyester", "Cotton-Lyocell-Elastane"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces (plus waist-inch sizing)" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the racerback singlet made from?",
          a: "Stretch compression knit, in the composition range typical of comparable running and training singlets. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "What is the difference between this and your Stringer Tank?",
          a: "Armhole depth and strap width. This uses a full racerback with a more moderate armhole and wider straps. Our Stringer Tank uses the deepest, most extreme armhole cut paired with ultra-narrow straps.",
        },
      ],
      relatedStyleTags: [
        { label: "Stringer Tank", slug: "stringer", href: "/capriowear/activewear/tank-tops" },
        { label: "Muscle-Cut Tank", slug: "muscle-cut", href: "/capriowear/activewear/tank-tops" },
        { label: "Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Athletic Tank", slug: "athletic", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's fitted running and training singlet, full racerback construction (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch compression knit, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, close-to-body. Full racerback, not a stringer's narrow strap." },
        { label: "Back construction", value: "Full racerback (Y-back)" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Racerback singlet, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Racerback construction checked for hold and fit stability",
        "Compression fit checked for consistent recovery across the size run",
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
            body: "Stretch compression knit, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "muscle-cut",
      cardTitle: "Custom Muscle-Cut Tank",
      cardSubline: "Wide dropped armhole, deeper than standard",
      gender: "Men",
      image: "",
      imageAlt: "Custom muscle-cut tank manufacturer",
      href: "/capriowear/activewear/tank-tops/muscle-cut",
      // Full PDP content for SKU 7 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 6. A construction-feature SKU, not a pure
      // silhouette one -- the "can also be layered onto other
      // silhouettes" framing is kept in the description and FAQ. Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed on
      // your sample."). `images` are alt-only placeholders: real product
      // photography is needed before this can go live. CTA is Request a
      // Sample only.
      pdpTitle: "Muscle-Cut",
      sku: "CAP-TNK-07",
      pdpHeading: "Custom Muscle-Cut Tank Manufacturer",
      pdpDescription:
        "Men's relaxed tank with a wide dropped armhole, ribbed collar, and raw-edge hem, custom and private label, in cotton-poly blend, made to your brand in Sialkot, Pakistan. The dropped-armhole detail sits between a standard tank armhole and a true stringer cut, and can also be layered onto other silhouettes on request.",
      images: [
        { alt: "Muscle-cut tank, front view" },
        { alt: "Muscle-cut tank, armhole and collar detail" },
        { alt: "Muscle-cut tank, side profile" },
        { alt: "Muscle-cut tank, fabric close-up" },
        { alt: "Muscle-cut tank, worn on model" },
        { alt: "Muscle-cut tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Muscle-Cut Tank Manufacturer",
      pdpMetaDescription:
        "Custom muscle-cut tank manufacturer, OEM, ODM and private label, wide dropped armhole, ribbed collar, raw-edge hem, cotton-poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Cotton-Poly Blend", "Cotton", "Poly-Spandex", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces (plus waist-inch sizing)" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the muscle-cut tank made from?",
          a: "Cotton-poly blend, in the composition range typical of comparable dropped-armhole tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Can I get this dropped-armhole cut on a different style, not this exact tank?",
          a: "Yes. The muscle-cut armhole is not tied to this one silhouette. We can build it into any other fitted or relaxed tank in the catalog, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Stringer Tank", slug: "stringer", href: "/capriowear/activewear/tank-tops" },
        { label: "Racerback Singlet", slug: "racerback-singlet", href: "/capriowear/activewear/tank-tops" },
        { label: "Oversized Cut-Off Tank", slug: "oversized-cutoff", href: "/capriowear/activewear/tank-tops" },
        { label: "Ribbed Tank", slug: "ribbed-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's relaxed tank, wide dropped armhole, ribbed collar, raw-edge hem (base type)",
        },
        {
          label: "Fabric",
          value: "Cotton-poly blend, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Fit",
          value: "Relaxed. Wide, dropped armhole, deeper than a standard tank armhole but shallower than a stringer cut.",
        },
        { label: "Collar", value: "Ribbed collar" },
        {
          label: "Hem",
          value: "Raw-edge, unfinished hem, a deliberate style choice. A finished hem option is also available.",
        },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Muscle-cut tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Armhole depth checked for consistency across the size run",
        "Raw-edge hem checked for clean, consistent edge finishing",
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
            body: "Cotton-poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "ribbed-mens",
      cardTitle: "Custom Ribbed Tank",
      cardSubline: "Ribbed-knit body fabric, fitted through the torso",
      gender: "Men",
      image: "",
      imageAlt: "Custom ribbed tank manufacturer, men's",
      href: "/capriowear/activewear/tank-tops/ribbed-mens",
      // Full PDP content for SKU 8 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 7. Card name "Ribbed Tank" is shared with
      // women's SKU 16 (not yet built) by design -- slug `ribbed-mens`
      // stays distinct from the future women's `ribbed-womens` slug, no
      // collision. Reachable by URL and a clickable PLP card via the
      // sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). Fabric row
      // states the real composition (95% Cotton / 5% Elastane) plainly,
      // with no "per the confirmed reference" attribution -- the brief's
      // own draft copy included that phrase, but it reads as the same
      // internal-sourcing leak already found and fixed once on Shorts
      // SKU 13 ("following the locked reference"), which this same
      // brief's own rules section explicitly bans; dropped it and stated
      // the composition plainly instead, same pattern as Shorts SKU 3/4's
      // own real GSM rows ("340 GSM. Final weight confirmed on your
      // sample.", no attribution). `images` are alt-only placeholders:
      // real product photography is needed before this can go live. CTA
      // is Request a Sample only.
      pdpTitle: "Ribbed",
      sku: "CAP-TNK-08",
      pdpHeading: "Custom Ribbed Tank Manufacturer",
      pdpDescription:
        "Men's fitted tank in a full-body ribbed knit, custom and private label, in cotton-elastane rib knit, lay-flat chafe-free side seams, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Ribbed tank, front view" },
        { alt: "Ribbed tank, rib knit detail" },
        { alt: "Ribbed tank, side profile" },
        { alt: "Ribbed tank, fabric close-up" },
        { alt: "Ribbed tank, worn on model" },
        { alt: "Ribbed tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Ribbed Tank Manufacturer",
      pdpMetaDescription:
        "Custom ribbed tank manufacturer, OEM, ODM and private label, full-body rib knit, fitted through the torso, cotton-elastane rib knit, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Cotton-Elastane Rib Knit", "Viscose-Elastane Rib Knit", "Cotton", "Poly-Spandex"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces (plus waist-inch sizing)" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "Will a ribbed tank hold its shape, and will it twist?",
          a: "We test every ribbed-knit style for stretch recovery and twisting before bulk, a known rib-knit defect where the tube of fabric spirals rather than sitting straight, and confirm results on your sample.",
        },
        {
          q: "Can I get this ribbed fabric on a different style, not this exact tank?",
          a: "Yes. Ribbed knit is not tied to this one silhouette. We can build it into other fitted styles in the catalog, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Oversized Cut-Off Tank", slug: "oversized-cutoff", href: "/capriowear/activewear/tank-tops" },
        { label: "Muscle-Cut Tank", slug: "muscle-cut", href: "/capriowear/activewear/tank-tops" },
        { label: "Athletic Tank", slug: "athletic", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's fitted tank, full-body ribbed knit (base type)",
        },
        {
          label: "Fabric",
          value: "Cotton-elastane rib knit, 95% Cotton / 5% Elastane. Final blend and weight confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted through the torso, standard neckline and armhole." },
        { label: "Seams", value: "Lay-flat, chafe-free side seams" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Ribbed tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Rib-knit stretch recovery, shrinkage, and twisting tested before bulk",
        "Side seams checked for lay-flat, chafe-free finishing",
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
            body: "Cotton-elastane rib knit, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "fitted-womens",
      cardTitle: "Custom Fitted Tank",
      cardSubline: "Close-fitting, standard neckline and back",
      gender: "Women",
      image: "",
      imageAlt: "Custom fitted tank manufacturer, women's",
      href: "/capriowear/activewear/tank-tops/fitted-womens",
      // Full PDP content for SKU 9 (owner spec, 2026-09-22), draft, the
      // first women's Tank Tops SKU. Card name "Fitted Tank" is shared
      // with men's SKU 2 by design -- slug `fitted-womens` stays distinct
      // from `fitted-mens`, no collision. No "(plus waist-inch sizing)"
      // qualifier on this women's SKU's key facts (men's-only). Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed on
      // your sample."). `images` are alt-only placeholders: real product
      // photography is needed before this can go live. CTA is Request a
      // Sample only.
      pdpTitle: "Fitted",
      sku: "CAP-TNK-09",
      pdpHeading: "Custom Fitted Tank Manufacturer",
      pdpDescription:
        "Women's close-fitting tank with a high scoop neckline and standard back, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Fitted tank, front view" },
        { alt: "Fitted tank, neckline detail" },
        { alt: "Fitted tank, side profile" },
        { alt: "Fitted tank, fabric close-up" },
        { alt: "Fitted tank, worn on model" },
        { alt: "Fitted tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Fitted Tank Manufacturer",
      pdpMetaDescription:
        "Custom fitted tank manufacturer, OEM, ODM and private label, close-fitting, high scoop neckline, standard back, stretch poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Poly-Spandex", "Nylon-Elastane", "Cotton-Poly Blend", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the fitted tank made from?",
          a: "Stretch poly blend, in the composition range typical of comparable fitted tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Racerback Tank?",
          a: "This uses a standard back construction, not a racerback. Our Racerback Tank uses a true racerback with mesh or pinhole paneling.",
        },
      ],
      relatedStyleTags: [
        { label: "Relaxed Tank", slug: "relaxed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Ribbed Tank", slug: "ribbed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's close-fitting tank, high scoop neckline, standard back (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, close-to-body. Not racerback, not shelf-bra." },
        { label: "Neckline", value: "High scoop" },
        { label: "Back", value: "Standard, not racerback" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Fitted tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Fitted silhouette checked for consistent recovery across the size run",
        "Neckline and armhole checked for chafe-free wear",
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
            body: "Stretch poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "relaxed-womens",
      cardTitle: "Custom Relaxed Tank",
      cardSubline: "Roomier, non-compression, finished armhole",
      gender: "Women",
      image: "",
      imageAlt: "Custom relaxed tank manufacturer, women's",
      href: "/capriowear/activewear/tank-tops/relaxed-womens",
      // Full PDP content for SKU 10 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 9. Card name "Relaxed Tank" is shared with
      // men's SKU 3 by design -- slug `relaxed-womens` stays distinct
      // from `relaxed-mens`, no collision. No "(plus waist-inch sizing)"
      // qualifier on this women's SKU's key facts (men's-only). Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed on
      // your sample."). `images` are alt-only placeholders: real product
      // photography is needed before this can go live. CTA is Request a
      // Sample only.
      pdpTitle: "Relaxed",
      sku: "CAP-TNK-10",
      pdpHeading: "Custom Relaxed Tank Manufacturer",
      pdpDescription:
        "Women's relaxed, non-compression tank with a standard finished neckline and armhole, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Relaxed tank, front view" },
        { alt: "Relaxed tank, neckline and armhole detail" },
        { alt: "Relaxed tank, side profile" },
        { alt: "Relaxed tank, fabric close-up" },
        { alt: "Relaxed tank, worn on model" },
        { alt: "Relaxed tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Relaxed Tank Manufacturer",
      pdpMetaDescription:
        "Custom relaxed tank manufacturer, OEM, ODM and private label, roomier non-compression fit, standard finished neckline and armhole, stretch poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Poly-Spandex", "Cotton-Poly Blend", "Nylon-Elastane", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the relaxed tank made from?",
          a: "Stretch poly blend, in the composition range typical of comparable relaxed tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Fitted Tank?",
          a: "This is a roomier, non-compression fit with a standard finished neckline and armhole. Our Fitted Tank is close-fitting and body-hugging.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Ribbed Tank", slug: "ribbed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's relaxed tank, standard finished neckline and armhole (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed, roomier, non-compression. Not fitted, not cropped." },
        { label: "Neckline", value: "Standard, finished" },
        { label: "Armhole", value: "Standard, finished, not cut-off" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Relaxed tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Relaxed fit checked for consistent drape across the size run",
        "Neckline and armhole checked for chafe-free wear",
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
            body: "Stretch poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "cropped-fitted",
      cardTitle: "Custom Cropped Fitted Tank",
      cardSubline: "Fitted, midriff-baring cropped length",
      gender: "Women",
      image: "",
      imageAlt: "Custom cropped fitted tank manufacturer",
      href: "/capriowear/activewear/tank-tops/cropped-fitted",
      // Full PDP content for SKU 11 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 10. Card name "Cropped Fitted Tank" is
      // deliberately distinct from a future "Cropped Tank" SKU (SKU 15,
      // cropped length as a cross-silhouette construction feature, not
      // yet built) -- do not merge these when SKU 15 lands, separate,
      // non-duplicate styles. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "Cropped Fitted",
      sku: "CAP-TNK-11",
      pdpHeading: "Custom Cropped Fitted Tank Manufacturer",
      pdpDescription:
        "Women's fitted tank with a cropped, midriff-baring hem, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Cropped fitted tank, front view" },
        { alt: "Cropped fitted tank, hem detail" },
        { alt: "Cropped fitted tank, side profile" },
        { alt: "Cropped fitted tank, fabric close-up" },
        { alt: "Cropped fitted tank, worn on model" },
        { alt: "Cropped fitted tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Cropped Fitted Tank Manufacturer",
      pdpMetaDescription:
        "Custom cropped fitted tank manufacturer, OEM, ODM and private label, close-fitting, midriff-baring cropped hem, stretch poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Poly-Spandex", "Nylon-Elastane", "Cotton-Poly Blend", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the cropped fitted tank made from?",
          a: "Stretch poly blend, in the composition range typical of comparable cropped tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from a regular cropped tank?",
          a: "This pairs a fitted, close-to-body silhouette with the cropped hem. A looser cropped-length cut is available separately on request.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Relaxed Tank", slug: "relaxed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Ribbed Tank", slug: "ribbed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's fitted tank, cropped midriff-baring hem (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, close-to-body. Cropped hem length." },
        { label: "Neckline", value: "Standard, finished" },
        { label: "Hem length", value: "Cropped, midriff-baring" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Cropped fitted tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Fitted silhouette checked for consistent recovery across the size run",
        "Hem length checked for consistency across the size run",
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
            body: "Stretch poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "racerback-womens",
      cardTitle: "Custom Racerback Tank",
      cardSubline: "Fitted, true racerback construction",
      gender: "Women",
      image: "",
      imageAlt: "Custom racerback tank manufacturer, women's",
      href: "/capriowear/activewear/tank-tops/racerback-womens",
      // Full PDP content for SKU 12 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 11. Card name "Racerback Tank" is a distinct
      // construction from the men's "Racerback Singlet" (SKU 6, a full
      // Y-back singlet cut) -- this is a fitted tank with racerback
      // strap construction, its own name and slug, no collision.
      // Reachable by URL and a clickable PLP card via the sitewide
      // draft-PDP rule (`isDraftPdpReachable()`): still noindex/nofollow,
      // out of the sitemap, no Product/FAQPage JSON-LD. Do not flip
      // `status` to "published". No GSM sourced (Weight stays "Pending,
      // confirmed on your sample."). `images` are alt-only placeholders:
      // real product photography is needed before this can go live. CTA
      // is Request a Sample only.
      pdpTitle: "Racerback",
      sku: "CAP-TNK-12",
      pdpHeading: "Custom Racerback Tank Manufacturer",
      pdpDescription:
        "Women's fitted tank with a true racerback and mesh paneling, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Racerback tank, front view" },
        { alt: "Racerback tank, back and mesh panel detail" },
        { alt: "Racerback tank, side profile" },
        { alt: "Racerback tank, fabric close-up" },
        { alt: "Racerback tank, worn on model" },
        { alt: "Racerback tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Racerback Tank Manufacturer",
      pdpMetaDescription:
        "Custom racerback tank manufacturer, OEM, ODM and private label, fitted silhouette, true racerback with mesh paneling, stretch poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Poly-Spandex", "Nylon-Elastane", "Mesh Panel Blend", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the racerback tank made from?",
          a: "Stretch poly blend with mesh back paneling, in the composition range typical of comparable racerback tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Does this have a built-in shelf bra?",
          a: "No. This is a standard racerback tank without a built-in bra. Our Shelf-Bra Tank covers that construction separately.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Relaxed Tank", slug: "relaxed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Ribbed Tank", slug: "ribbed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's fitted tank, true racerback with mesh paneling (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend with mesh back paneling, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, close-to-body." },
        { label: "Back construction", value: "True racerback, pinhole mesh paneling" },
        { label: "Neckline", value: "Standard, finished" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Racerback tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Racerback construction checked for hold and fit stability",
        "Fitted silhouette checked for consistent recovery across the size run",
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
            body: "Stretch poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "shelf-bra",
      cardTitle: "Custom Shelf-Bra Tank",
      cardSubline: "Built-in shelf bra, adjustable straps",
      gender: "Women",
      image: "",
      imageAlt: "Custom shelf-bra tank manufacturer",
      href: "/capriowear/activewear/tank-tops/shelf-bra",
      // Full PDP content for SKU 13 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 12. A Tank Tops category SKU (an integrated
      // bra built into a tank), deliberately kept distinct from the
      // Sports Bras category's own built-in products -- no cross-link
      // or content duplication with that category. Reachable by URL and
      // a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed
      // on your sample."). `images` are alt-only placeholders: real
      // product photography is needed before this can go live. CTA is
      // Request a Sample only.
      pdpTitle: "Shelf-Bra",
      sku: "CAP-TNK-13",
      pdpHeading: "Custom Shelf-Bra Tank Manufacturer",
      pdpDescription:
        "Women's tank with a built-in shelf bra, removable pads, and adjustable straps, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Shelf-bra tank, front view" },
        { alt: "Shelf-bra tank, built-in shelf bra detail" },
        { alt: "Shelf-bra tank, side profile" },
        { alt: "Shelf-bra tank, fabric close-up" },
        { alt: "Shelf-bra tank, worn on model" },
        { alt: "Shelf-bra tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Shelf-Bra Tank Manufacturer",
      pdpMetaDescription:
        "Custom shelf-bra tank manufacturer, OEM, ODM and private label, built-in shelf bra, removable pads, adjustable straps, stretch poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Poly-Spandex", "Nylon-Elastane", "Cotton-Poly Blend", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "Can I skip a separate sports bra with this tank?",
          a: "For light activity, many wearers do, though support level depends on your fabric and pad choice. For high-impact use, we recommend pairing with a dedicated sports bra from our Sports Bras category.",
        },
        {
          q: "Are the pads removable and can straps be adjusted?",
          a: "Yes. Pads are removable and straps are adjustable, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Halter Tank", slug: "halter", href: "/capriowear/activewear/tank-tops" },
        { label: "Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's tank, built-in shelf bra, adjustable straps (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted body, scoop neckline." },
        { label: "Support", value: "Built-in shelf bra with removable pads, adjustable back straps" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Shelf-bra tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Shelf bra and strap adjustment tested for support and hold",
        "Removable pad fit checked across the size run",
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
            body: "Stretch poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "halter",
      cardTitle: "Custom Halter Tank",
      cardSubline: "Halter-neck strap, ties or clips behind the neck",
      gender: "Women",
      image: "",
      imageAlt: "Custom halter tank manufacturer",
      href: "/capriowear/activewear/tank-tops/halter",
      // Full PDP content for SKU 14 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 13. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "Halter",
      sku: "CAP-TNK-14",
      pdpHeading: "Custom Halter Tank Manufacturer",
      pdpDescription:
        "Women's halter-neck tank with a deep scoop back, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Halter tank, front view" },
        { alt: "Halter tank, neckline and back detail" },
        { alt: "Halter tank, side profile" },
        { alt: "Halter tank, fabric close-up" },
        { alt: "Halter tank, worn on model" },
        { alt: "Halter tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Halter Tank Manufacturer",
      pdpMetaDescription:
        "Custom halter tank manufacturer, OEM, ODM and private label, halterneck front, deep scoop back, stretch poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Poly-Spandex", "Nylon-Elastane", "Cotton-Poly Blend", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the halter tank made from?",
          a: "Stretch poly blend, in the composition range typical of comparable halter tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How does the halter neckline close?",
          a: "Ties or clips behind the neck, confirmed on your sample. Both closures are available on request.",
        },
      ],
      relatedStyleTags: [
        { label: "Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Shelf-Bra Tank", slug: "shelf-bra", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's halter-neck tank, deep scoop back (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted through the body." },
        { label: "Neckline", value: "Halter, ties or clips behind the neck" },
        { label: "Back", value: "Deep scoop" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Halter tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Halter tie and neckline hardware tested for hold",
        "Back panel checked for chafe-free fit",
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
            body: "Stretch poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "cropped-length",
      cardTitle: "Custom Cropped Tank",
      cardSubline: "Cropped hem length, cross-silhouette construction feature",
      gender: "Women",
      image: "",
      imageAlt: "Custom cropped tank manufacturer, cross-silhouette",
      href: "/capriowear/activewear/tank-tops/cropped-length",
      // Full PDP content for SKU 15 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 14. Card name "Cropped Tank" is deliberately
      // distinct from SKU 11's "Cropped Fitted Tank" -- SKU 11 is a
      // fitted body with a cropped hem, this SKU is the cropped hem as
      // a standalone, layerable construction feature on a relaxed base.
      // Slugs `cropped-length` (this SKU) and `cropped-fitted` (SKU 11)
      // stay distinct, confirmed no collision. Reachable by URL and a
      // clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed
      // on your sample."). `images` are alt-only placeholders: real
      // product photography is needed before this can go live. CTA is
      // Request a Sample only.
      pdpTitle: "Cropped",
      sku: "CAP-TNK-15",
      pdpHeading: "Custom Cropped Tank Manufacturer",
      pdpDescription:
        "Women's relaxed tank with a cropped, midriff-baring hem, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan. The cropped hem length can also be layered onto other silhouettes on request.",
      images: [
        { alt: "Cropped tank, front view" },
        { alt: "Cropped tank, hem detail" },
        { alt: "Cropped tank, side profile" },
        { alt: "Cropped tank, fabric close-up" },
        { alt: "Cropped tank, worn on model" },
        { alt: "Cropped tank, flat lay" },
      ],
      pdpMetaTitle: "Custom Cropped Tank Manufacturer",
      pdpMetaDescription:
        "Custom cropped tank manufacturer, OEM, ODM and private label, relaxed fit, cropped midriff-baring hem, stretch poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Poly-Spandex", "Cotton-Poly Blend", "Nylon-Elastane", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "How is this different from your Cropped Fitted Tank?",
          a: "This uses a relaxed body with the cropped hem. Our Cropped Fitted Tank pairs the same cropped hem with a close-fitting, body-hugging silhouette.",
        },
        {
          q: "Can I get this cropped hem on a different style, not this exact tank?",
          a: "Yes. The cropped length is not tied to this one silhouette. We can build it into fitted or racerback styles in the catalog, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Relaxed Tank", slug: "relaxed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's relaxed tank, cropped midriff-baring hem (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, directional research range, pending confirmed spec on sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed. Cropped hem length." },
        { label: "Hem length", value: "Cropped, midriff-baring" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Cropped tank, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Hem length checked for consistency across the size run",
        "Relaxed fit checked for consistent drape",
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
            body: "Stretch poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "ribbed-womens",
      cardTitle: "Custom Ribbed Tank",
      cardSubline: "Ribbed-knit body fabric, contrast side panels",
      gender: "Women",
      image: "",
      imageAlt: "Custom ribbed tank manufacturer, women's",
      href: "/capriowear/activewear/tank-tops/ribbed-womens",
    },
  ],
  relatedLinks: [
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
    { label: "T-Shirts", href: "/capriowear/activewear/t-shirts" },
    { label: "Long-Sleeve Tops", href: "/capriowear/activewear/long-sleeve-tops" },
  ],
};
