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
  metaDescription:
    "Custom tank top manufacturer, OEM, ODM and private label, athletic to oversized cut-off to stringer to racerback, built-in shelf bra builds, from 50 pieces, any fabric and color, DDP worldwide.",
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
    },
    {
      status: "draft",
      slug: "cropped-fitted",
      cardTitle: "Custom Cropped Tank",
      cardSubline: "Fitted, midriff-baring cropped length",
      gender: "Women",
      image: "",
      imageAlt: "Custom cropped tank manufacturer",
      href: "/capriowear/activewear/tank-tops/cropped-fitted",
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
    },
    {
      status: "draft",
      slug: "cropped-length",
      cardTitle: "Custom Cropped Length Tank",
      cardSubline: "Cropped hem length, cross-silhouette construction feature",
      gender: "Women",
      image: "",
      imageAlt: "Custom cropped length tank manufacturer",
      href: "/capriowear/activewear/tank-tops/cropped-length",
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
