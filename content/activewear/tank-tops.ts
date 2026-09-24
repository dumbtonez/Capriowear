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
import { faqGetStarted } from "./pdpShared";

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
    "Custom tank top manufacturer for activewear and teamwear brands, OEM, ODM and private label, samples in 10 to 14 days, from 50 pieces, any color, DDP worldwide.",
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
      fabric: "Cotton/Poly blend",
      bestFor: "Everyday relaxed and casual training tanks",
      performance: "Durable, soft hand, easy-care",
    },
    {
      fabric: "Cotton/Spandex or moisture-wicking polyester blend",
      bestFor: "Racerback and athletic performance tanks",
      performance: "Quick-dry, moisture-wicking, 4-way stretch",
    },
    {
      fabric: "Polyester/Spandex, Cotton/Lyocell/Spandex, or Nylon/Spandex blends",
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
    "Cotton/Poly blend",
    "Cotton/Spandex or moisture-wicking polyester",
    "Poly/Spandex or Nylon/Spandex",
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
    { title: "Fabric", body: "Cotton, Cotton/Poly, Poly/Spandex, Nylon/Spandex, and ribbed knit blends" },
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
      a: "Cotton, Cotton/Poly, Poly/Spandex, Nylon/Spandex, and ribbed knit blends, confirmed on your sample.",
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
    faqGetStarted,
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
      // Full PDP content for SKU 1 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 4 to 16. The only tank besides SKU 5 with a
      // real stated GSM (260, attributed to a confirmed comparable-range,
      // not a specific competitor product, per the owner's own no-brand-
      // attribution note).
      status: "draft",
      slug: "oversized-cutoff",
      cardTitle: "Men's Oversized Cut-Off Tank",
      cardSubline: "Boxy, dropped-shoulder, wide raw-cut armhole",
      gender: "Men",
      image: "",
      imageAlt: "Men's oversized cut-off tank manufacturer",
      href: "/capriowear/activewear/tank-tops/oversized-cutoff",
      sku: "CAP-TNK-01",
      pdpTitle: "Men's Oversized Cut-Off",
      pdpHeading: "Men's Oversized Cut-Off Tank Manufacturer",
      pdpDescription:
        "Men's oversized, boxy tank with a dropped shoulder and wide raw-cut armhole, custom and private label, in cotton or cotton-blend jersey, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Oversized cut-off tank, front view, men's" },
        { alt: "Oversized cut-off tank, armhole detail, men's" },
        { alt: "Oversized cut-off tank, back view, men's" },
        { alt: "Oversized cut-off tank, fabric close-up, men's" },
        { alt: "Oversized cut-off tank, worn on model, men's" },
        { alt: "Oversized cut-off tank, flat lay, men's" },
      ],
      pdpMetaTitle: "Men's Oversized Cut-Off Tank Manufacturer",
      pdpMetaDescription:
        "Men's oversized cut-off tank manufacturer, private label, boxy dropped-shoulder fit, wide raw-cut armhole, cotton-blend jersey, from 50 pieces, DDP worldwide.",
      material: "Cotton or cotton-blend jersey, 260 GSM",
      pdpFabricPills: ["Cotton", "Cotton/Poly Blend", "Recycled Polyester", "Ribbed Cotton Knit"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the oversized cut-off tank made from?",
          a: "Cotton or cotton-blend jersey, in the composition range typical of comparable oversized cut-off tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Can I get a raw, unfinished armhole and hem, or a finished edge?",
          a: "Both. Raw-cut is a deliberate style choice on this construction, and we can also build a finished bound or hemmed edge if you prefer, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Relaxed Tank", slug: "relaxed-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Muscle-Cut Tank", slug: "muscle-cut", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Stringer Tank", slug: "stringer", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        { label: "Style", value: "Men's oversized, boxy tank, dropped shoulder, wide raw-cut armhole (base type)" },
        { label: "Fabric", value: "Cotton or cotton-blend jersey, confirmed on your sample." },
        { label: "Weight", value: "260 GSM, per the confirmed range on comparable cotton cut-off builds. Final weight confirmed on your sample." },
        { label: "Fit", value: "Oversized, boxy, dropped-shoulder seam. Not fitted, not compression." },
        { label: "Armhole", value: "Wide raw-cut or cut-off armhole, unfinished edge option available" },
        { label: "Hem", value: "Straight, raw-cut edge option available" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Oversized cut-off tank, construction detail, men's" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Armhole width and dropped-shoulder placement checked for consistency across the size run",
        "Raw-cut hem checked for clean, consistent edge finishing",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Cotton or cotton-blend jersey, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 2 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1 above. Slug `fitted-mens` confirmed distinct
      // from women's `fitted-womens` (already live) -- no collision.
      status: "draft",
      slug: "fitted-mens",
      cardTitle: "Men's Fitted Tank",
      cardSubline: "Close-fitting, standard neckline and armhole",
      gender: "Men",
      image: "",
      imageAlt: "Men's fitted tank manufacturer",
      href: "/capriowear/activewear/tank-tops/fitted-mens",
      sku: "CAP-TNK-02",
      pdpTitle: "Men's Fitted",
      pdpHeading: "Men's Fitted Tank Manufacturer",
      pdpDescription:
        "Men's close-fitting, compression tank with a standard neckline and armhole, custom and private label, in Poly/Spandex, Nylon/Spandex, or fitted cotton, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Fitted tank, front view, men's" },
        { alt: "Fitted tank, armhole detail, men's" },
        { alt: "Fitted tank, back view, men's" },
        { alt: "Fitted tank, fabric close-up, men's" },
        { alt: "Fitted tank, worn on model, men's" },
        { alt: "Fitted tank, flat lay, men's" },
      ],
      pdpMetaTitle: "Men's Fitted Tank Manufacturer",
      pdpMetaDescription:
        "Men's fitted tank manufacturer, private label, close-fitting compression build, Polyester/Spandex or Nylon/Spandex, any color, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Poly/Spandex", "Nylon/Spandex", "Cotton", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the fitted tank made from?",
          a: "Poly/Spandex, Nylon/Spandex, or fitted cotton, in the composition range typical of comparable compression tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Athletic Tank?",
          a: "This uses a closer, compression-level fit through the body. Our Athletic Tank uses a true-to-size, less body-hugging cut for general training and running use.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Oversized Cut-Off Tank", slug: "oversized-cutoff", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Athletic Tank", slug: "athletic", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Muscle-Cut Tank", slug: "muscle-cut", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Ribbed Tank", slug: "ribbed-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        { label: "Style", value: "Men's close-fitting, compression tank, standard neckline and armhole (base type)" },
        { label: "Fabric", value: "Poly/Spandex, Nylon/Spandex, or fitted cotton, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, compression fit, not oversized, not relaxed. A close-to-body silhouette through the torso." },
        { label: "Armhole", value: "Standard armhole, finished edge" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Fitted tank, construction detail, men's" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Compression fit checked for consistent recovery across the size run",
        "Armhole and neckline checked for chafe-free wear",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Poly/Spandex, Nylon/Spandex, or fitted cotton, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      // Full PDP content for SKU 3 (owner spec, 2026-09-22), draft, same
      // shape/rules as SKU 1/2 above. Slug `relaxed-mens` confirmed
      // distinct from women's `relaxed-womens` (already live) -- no
      // collision.
      status: "draft",
      slug: "relaxed-mens",
      cardTitle: "Men's Relaxed Tank",
      cardSubline: "Softer, roomier fit, finished armhole",
      gender: "Men",
      image: "",
      imageAlt: "Men's relaxed tank manufacturer",
      href: "/capriowear/activewear/tank-tops/relaxed-mens",
      sku: "CAP-TNK-03",
      pdpTitle: "Men's Relaxed",
      pdpHeading: "Men's Relaxed Tank Manufacturer",
      pdpDescription:
        "Men's relaxed, softer-fit tank with a standard finished armhole and neckline, custom and private label, in recycled polyester or cotton jersey, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Relaxed tank, front view, men's" },
        { alt: "Relaxed tank, armhole detail, men's" },
        { alt: "Relaxed tank, back view, men's" },
        { alt: "Relaxed tank, fabric close-up, men's" },
        { alt: "Relaxed tank, worn on model, men's" },
        { alt: "Relaxed tank, flat lay, men's" },
      ],
      pdpMetaTitle: "Men's Relaxed Tank Manufacturer",
      pdpMetaDescription:
        "Men's relaxed tank manufacturer, private label, softer roomier fit, finished armhole, recycled polyester or cotton jersey, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Recycled Polyester", "Cotton", "Cotton/Poly Blend", "Poly/Spandex"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the relaxed tank made from?",
          a: "Recycled polyester or cotton jersey, in the composition range typical of comparable relaxed tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Oversized Cut-Off Tank?",
          a: "This uses a standard, finished armhole and neckline in a softer relaxed fit. Our Oversized Cut-Off Tank uses a boxier, dropped-shoulder cut with a wide raw-cut armhole.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Oversized Cut-Off Tank", slug: "oversized-cutoff", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Athletic Tank", slug: "athletic", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Ribbed Tank", slug: "ribbed-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        { label: "Style", value: "Men's relaxed, softer fit tank, standard finished armhole and neckline (base type)" },
        { label: "Fabric", value: "Recycled polyester or cotton jersey, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed, softer through the body. Not oversized-boxy, not fitted-compression." },
        { label: "Armhole", value: "Standard, finished edge, not raw-cut" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Relaxed tank, construction detail, men's" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Relaxed fit checked for consistent drape across the size run",
        "Armhole and neckline checked for chafe-free wear",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Recycled polyester or cotton jersey, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "athletic",
      cardTitle: "Men's Athletic Tank",
      cardSubline: "True-to-size training and running cut",
      gender: "Men",
      image: "",
      imageAlt: "Men's athletic tank manufacturer",
      href: "/capriowear/activewear/tank-tops/athletic",
      // Full PDP content for SKU 4 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 3. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "Men's Athletic",
      sku: "CAP-TNK-04",
      pdpHeading: "Men's Athletic Tank Manufacturer",
      pdpDescription:
        "Men's true-to-size, performance training tank with a deep scoop neckline, custom and private label, in recycled polyester or moisture-wicking knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Athletic tank, front view, men's" },
        { alt: "Athletic tank, neckline detail, men's" },
        { alt: "Athletic tank, side profile, men's" },
        { alt: "Athletic tank, fabric close-up, men's" },
        { alt: "Athletic tank, worn on model, men's" },
        { alt: "Athletic tank, flat lay, men's" },
      ],
      pdpMetaTitle: "Men's Athletic Tank Manufacturer",
      pdpMetaDescription:
        "Men's athletic tank manufacturer, private label, true-to-size training and running cut, deep scoop neckline, recycled polyester, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Recycled Polyester", "Poly/Spandex", "Cotton/Poly Blend", "Nylon/Spandex"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
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
        { label: "Men's Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Relaxed Tank", slug: "relaxed-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Racerback Singlet", slug: "racerback-singlet", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Ribbed Tank", slug: "ribbed-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's true-to-size, performance training tank, deep scoop neckline (base type)",
        },
        {
          label: "Fabric",
          value: "Recycled polyester or moisture-wicking knit, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Athletic, true-to-size. Not fitted-compression, not oversized-boxy." },
        { label: "Armhole", value: "Standard armhole, finished edge" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Athletic tank, construction detail, men's" },
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
      cardTitle: "Men's Stringer Tank",
      cardSubline: "Narrow straps, deep-cut racerback armhole",
      gender: "Men",
      image: "",
      imageAlt: "Men's stringer tank manufacturer",
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
      pdpTitle: "Men's Stringer",
      sku: "CAP-TNK-05",
      pdpHeading: "Men's Stringer Tank Manufacturer",
      pdpDescription:
        "Men's stringer tank with narrow straps and a deep-cut racerback armhole, custom and private label, in Cotton/Lyocell/Spandex jersey, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Stringer tank, front view, men's" },
        { alt: "Stringer tank, armhole and strap detail, men's" },
        { alt: "Stringer tank, side profile, men's" },
        { alt: "Stringer tank, fabric close-up, men's" },
        { alt: "Stringer tank, worn on model, men's" },
        { alt: "Stringer tank, flat lay, men's" },
      ],
      pdpMetaTitle: "Men's Stringer Tank Manufacturer",
      pdpMetaDescription:
        "Men's stringer tank manufacturer, private label, narrow straps, deep-cut racerback armhole, cotton/lyocell/spandex jersey, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Cotton/Lyocell/Spandex", "Cotton", "Poly/Spandex", "Nylon/Spandex"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the stringer tank made from?",
          a: "Cotton/Lyocell/Spandex jersey, in the composition range typical of comparable stringer tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "What is the difference between a stringer and your Racerback Singlet?",
          a: "Armhole depth and strap width. A stringer uses the deepest, most extreme armhole cut paired with ultra-narrow straps. Our Racerback Singlet uses a full racerback with a more moderate armhole and wider straps.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Racerback Singlet", slug: "racerback-singlet", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Muscle-Cut Tank", slug: "muscle-cut", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Oversized Cut-Off Tank", slug: "oversized-cutoff", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's stringer tank, narrow straps, deep-cut racerback armhole (base type)",
        },
        {
          label: "Fabric",
          value: "Cotton/Lyocell/Spandex jersey, confirmed on your sample.",
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
      specificationsImage: { alt: "Stringer tank, construction detail, men's" },
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
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Cotton/Lyocell/Spandex jersey, any weight, sourced or matched to your reference",
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
      cardTitle: "Men's Racerback Singlet",
      cardSubline: "Fitted singlet, full racerback construction",
      gender: "Men",
      image: "",
      imageAlt: "Men's racerback singlet manufacturer",
      href: "/capriowear/activewear/tank-tops/racerback-singlet",
      // Full PDP content for SKU 6 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 5. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "Men's Racerback Singlet",
      sku: "CAP-TNK-06",
      pdpHeading: "Men's Racerback Singlet Manufacturer",
      pdpDescription:
        "Men's fitted running and training singlet with a full racerback construction, custom and private label, in stretch compression knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Racerback singlet, front view, men's" },
        { alt: "Racerback singlet, back construction detail, men's" },
        { alt: "Racerback singlet, side profile, men's" },
        { alt: "Racerback singlet, fabric close-up, men's" },
        { alt: "Racerback singlet, worn on model, men's" },
        { alt: "Racerback singlet, flat lay, men's" },
      ],
      pdpMetaTitle: "Men's Racerback Singlet Manufacturer",
      pdpMetaDescription:
        "Men's racerback singlet manufacturer, private label, fitted running and training cut, full racerback, compression knit, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Poly/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton/Lyocell/Spandex"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
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
        { label: "Men's Stringer Tank", slug: "stringer", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Muscle-Cut Tank", slug: "muscle-cut", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Athletic Tank", slug: "athletic", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's fitted running and training singlet, full racerback construction (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch compression knit, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, close-to-body. Full racerback, not a stringer's narrow strap." },
        { label: "Back construction", value: "Full racerback (Y-back)" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Racerback singlet, construction detail, men's" },
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
      cardTitle: "Men's Muscle-Cut Tank",
      cardSubline: "Wide dropped armhole, deeper than standard",
      gender: "Men",
      image: "",
      imageAlt: "Men's muscle-cut tank manufacturer",
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
      pdpTitle: "Men's Muscle-Cut",
      sku: "CAP-TNK-07",
      pdpHeading: "Men's Muscle-Cut Tank Manufacturer",
      pdpDescription:
        "Men's relaxed tank with a wide dropped armhole, ribbed collar, and raw-edge hem, custom and private label, in Cotton/Poly blend, made to your brand in Sialkot, Pakistan. The dropped-armhole detail sits between a standard tank armhole and a true stringer cut, and can also be layered onto other silhouettes on request.",
      images: [
        { alt: "Muscle-cut tank, front view, men's" },
        { alt: "Muscle-cut tank, armhole and collar detail, men's" },
        { alt: "Muscle-cut tank, side profile, men's" },
        { alt: "Muscle-cut tank, fabric close-up, men's" },
        { alt: "Muscle-cut tank, worn on model, men's" },
        { alt: "Muscle-cut tank, flat lay, men's" },
      ],
      pdpMetaTitle: "Men's Muscle-Cut Tank Manufacturer",
      pdpMetaDescription:
        "Men's muscle-cut tank manufacturer, private label, wide dropped armhole, ribbed collar, raw-edge hem, Cotton/Poly blend, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Cotton/Poly Blend", "Cotton", "Poly/Spandex", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the muscle-cut tank made from?",
          a: "Cotton/Poly blend, in the composition range typical of comparable dropped-armhole tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Can I get this dropped-armhole cut on a different style, not this exact tank?",
          a: "Yes. The muscle-cut armhole is not tied to this one silhouette. We can build it into any other fitted or relaxed tank in the catalog, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Men's Stringer Tank", slug: "stringer", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Racerback Singlet", slug: "racerback-singlet", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Oversized Cut-Off Tank", slug: "oversized-cutoff", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Ribbed Tank", slug: "ribbed-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's relaxed tank, wide dropped armhole, ribbed collar, raw-edge hem (base type)",
        },
        {
          label: "Fabric",
          value: "Cotton/Poly blend, confirmed on your sample.",
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
      specificationsImage: { alt: "Muscle-cut tank, construction detail, men's" },
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
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Cotton/Poly blend, any weight, sourced or matched to your reference",
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
      cardTitle: "Men's Ribbed Tank",
      cardSubline: "Ribbed-knit body fabric, fitted through the torso",
      gender: "Men",
      image: "",
      imageAlt: "Men's ribbed tank manufacturer",
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
      // states the real composition (95% Cotton / 5% Spandex) plainly,
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
      pdpTitle: "Men's Ribbed",
      sku: "CAP-TNK-08",
      pdpHeading: "Men's Ribbed Tank Manufacturer",
      pdpDescription:
        "Men's fitted tank in a full-body ribbed knit, custom and private label, in Cotton/Spandex rib knit, lay-flat chafe-free side seams, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Ribbed tank, front view, men's" },
        { alt: "Ribbed tank, rib knit detail, men's" },
        { alt: "Ribbed tank, side profile, men's" },
        { alt: "Ribbed tank, fabric close-up, men's" },
        { alt: "Ribbed tank, worn on model, men's" },
        { alt: "Ribbed tank, flat lay, men's" },
      ],
      pdpMetaTitle: "Men's Ribbed Tank Manufacturer",
      pdpMetaDescription:
        "Men's ribbed tank manufacturer, private label, full-body rib knit, fitted through the torso, Cotton/Spandex rib, any color, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Cotton/Spandex Rib Knit", "Viscose/Spandex Rib Knit", "Cotton", "Poly/Spandex"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
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
        { label: "Men's Fitted Tank", slug: "fitted-mens", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Oversized Cut-Off Tank", slug: "oversized-cutoff", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Muscle-Cut Tank", slug: "muscle-cut", href: "/capriowear/activewear/tank-tops" },
        { label: "Men's Athletic Tank", slug: "athletic", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's fitted tank, full-body ribbed knit (base type)",
        },
        {
          label: "Fabric",
          value: "Cotton/Spandex rib knit, 95% Cotton / 5% Spandex. Final blend and weight confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted through the torso, standard neckline and armhole." },
        { label: "Seams", value: "Lay-flat, chafe-free side seams" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Ribbed tank, construction detail, men's" },
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
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Cotton/Spandex rib knit, any weight, sourced or matched to your reference",
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
      cardTitle: "Women's Fitted Tank",
      cardSubline: "Close-fitting, standard neckline and back",
      gender: "Women",
      image: "",
      imageAlt: "Women's fitted tank manufacturer",
      href: "/capriowear/activewear/tank-tops/fitted-womens",
      // Full PDP content for SKU 9 (owner spec, 2026-09-22), draft, the
      // first women's Tank Tops SKU. Card name "Fitted Tank" is shared
      // with men's SKU 2 by design -- slug `fitted-womens` stays distinct
      // from `fitted-mens`, no collision. Key facts read plain "MOQ from 50
      // pieces", same as men's (tops never take waist-inch sizing). Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed on
      // your sample."). `images` are alt-only placeholders: real product
      // photography is needed before this can go live. CTA is Request a
      // Sample only.
      pdpTitle: "Women's Fitted",
      sku: "CAP-TNK-09",
      pdpHeading: "Women's Fitted Tank Manufacturer",
      pdpDescription:
        "Women's close-fitting tank with a high scoop neckline and standard back, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Fitted tank, front view, women's" },
        { alt: "Fitted tank, neckline detail, women's" },
        { alt: "Fitted tank, side profile, women's" },
        { alt: "Fitted tank, fabric close-up, women's" },
        { alt: "Fitted tank, worn on model, women's" },
        { alt: "Fitted tank, flat lay, women's" },
      ],
      pdpMetaTitle: "Women's Fitted Tank Manufacturer",
      pdpMetaDescription:
        "Women's fitted tank manufacturer, private label, close-fitting, high scoop neckline, stretch Polyester/Spandex, any color, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Poly/Spandex", "Nylon/Spandex", "Cotton/Poly Blend", "Recycled Polyester"],
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
        { label: "Women's Relaxed Tank", slug: "relaxed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Ribbed Tank", slug: "ribbed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's close-fitting tank, high scoop neckline, standard back (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, close-to-body. Not racerback, not shelf-bra." },
        { label: "Neckline", value: "High scoop" },
        { label: "Back", value: "Standard, not racerback" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Fitted tank, construction detail, women's" },
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
      cardTitle: "Women's Relaxed Tank",
      cardSubline: "Roomier, non-compression, finished armhole",
      gender: "Women",
      image: "",
      imageAlt: "Women's relaxed tank manufacturer",
      href: "/capriowear/activewear/tank-tops/relaxed-womens",
      // Full PDP content for SKU 10 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 9. Card name "Relaxed Tank" is shared with
      // men's SKU 3 by design -- slug `relaxed-womens` stays distinct
      // from `relaxed-mens`, no collision. Key facts read plain "MOQ from 50
      // pieces", same as men's (tops never take waist-inch sizing). Reachable
      // by URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed on
      // your sample."). `images` are alt-only placeholders: real product
      // photography is needed before this can go live. CTA is Request a
      // Sample only.
      pdpTitle: "Women's Relaxed",
      sku: "CAP-TNK-10",
      pdpHeading: "Women's Relaxed Tank Manufacturer",
      pdpDescription:
        "Women's relaxed, non-compression tank with a standard finished neckline and armhole, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Relaxed tank, front view, women's" },
        { alt: "Relaxed tank, neckline and armhole detail, women's" },
        { alt: "Relaxed tank, side profile, women's" },
        { alt: "Relaxed tank, fabric close-up, women's" },
        { alt: "Relaxed tank, worn on model, women's" },
        { alt: "Relaxed tank, flat lay, women's" },
      ],
      pdpMetaTitle: "Women's Relaxed Tank Manufacturer",
      pdpMetaDescription:
        "Women's relaxed tank manufacturer, private label, roomier non-compression fit, finished neckline, stretch poly blend, any color, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Poly/Spandex", "Cotton/Poly Blend", "Nylon/Spandex", "Recycled Polyester"],
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
        { label: "Women's Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Ribbed Tank", slug: "ribbed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's relaxed tank, standard finished neckline and armhole (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed, roomier, non-compression. Not fitted, not cropped." },
        { label: "Neckline", value: "Standard, finished" },
        { label: "Armhole", value: "Standard, finished, not cut-off" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Relaxed tank, construction detail, women's" },
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
      cardTitle: "Women's Cropped Fitted Tank",
      cardSubline: "Fitted, midriff-baring cropped length",
      gender: "Women",
      image: "",
      imageAlt: "Women's cropped fitted tank manufacturer",
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
      pdpTitle: "Women's Cropped Fitted",
      sku: "CAP-TNK-11",
      pdpHeading: "Women's Cropped Fitted Tank Manufacturer",
      pdpDescription:
        "Women's fitted tank with a cropped, midriff-baring hem, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Cropped fitted tank, front view, women's" },
        { alt: "Cropped fitted tank, hem detail, women's" },
        { alt: "Cropped fitted tank, side profile, women's" },
        { alt: "Cropped fitted tank, fabric close-up, women's" },
        { alt: "Cropped fitted tank, worn on model, women's" },
        { alt: "Cropped fitted tank, flat lay, women's" },
      ],
      pdpMetaTitle: "Women's Cropped Fitted Tank Manufacturer",
      pdpMetaDescription:
        "Women's cropped fitted tank manufacturer, private label, close-fitting, midriff-baring cropped hem, stretch poly blend, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Poly/Spandex", "Nylon/Spandex", "Cotton/Poly Blend", "Recycled Polyester"],
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
        { label: "Women's Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Relaxed Tank", slug: "relaxed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Ribbed Tank", slug: "ribbed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's fitted tank, cropped midriff-baring hem (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, close-to-body. Cropped hem length." },
        { label: "Neckline", value: "Standard, finished" },
        { label: "Hem length", value: "Cropped, midriff-baring" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Cropped fitted tank, construction detail, women's" },
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
      cardTitle: "Women's Racerback Tank",
      cardSubline: "Fitted, true racerback construction",
      gender: "Women",
      image: "",
      imageAlt: "Women's racerback tank manufacturer",
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
      pdpTitle: "Women's Racerback",
      sku: "CAP-TNK-12",
      pdpHeading: "Women's Racerback Tank Manufacturer",
      pdpDescription:
        "Women's fitted tank with a true racerback and mesh paneling, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Racerback tank, front view, women's" },
        { alt: "Racerback tank, back and mesh panel detail, women's" },
        { alt: "Racerback tank, side profile, women's" },
        { alt: "Racerback tank, fabric close-up, women's" },
        { alt: "Racerback tank, worn on model, women's" },
        { alt: "Racerback tank, flat lay, women's" },
      ],
      pdpMetaTitle: "Women's Racerback Tank Manufacturer",
      pdpMetaDescription:
        "Women's racerback tank manufacturer, private label, fitted silhouette, racerback with mesh paneling, stretch poly blend, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Poly/Spandex", "Nylon/Spandex", "Mesh Panel Blend", "Recycled Polyester"],
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
        { label: "Women's Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Relaxed Tank", slug: "relaxed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Ribbed Tank", slug: "ribbed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's fitted tank, true racerback with mesh paneling (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend with mesh back paneling, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, close-to-body." },
        { label: "Back construction", value: "True racerback, pinhole mesh paneling" },
        { label: "Neckline", value: "Standard, finished" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Racerback tank, construction detail, women's" },
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
      cardTitle: "Women's Shelf-Bra Tank",
      cardSubline: "Built-in shelf bra, adjustable straps",
      gender: "Women",
      image: "",
      imageAlt: "Women's shelf-bra tank manufacturer",
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
      pdpTitle: "Women's Shelf-Bra",
      sku: "CAP-TNK-13",
      pdpHeading: "Women's Shelf-Bra Tank Manufacturer",
      pdpDescription:
        "Women's tank with a built-in shelf bra, removable pads, and adjustable straps, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Shelf-bra tank, front view, women's" },
        { alt: "Shelf-bra tank, built-in shelf bra detail, women's" },
        { alt: "Shelf-bra tank, side profile, women's" },
        { alt: "Shelf-bra tank, fabric close-up, women's" },
        { alt: "Shelf-bra tank, worn on model, women's" },
        { alt: "Shelf-bra tank, flat lay, women's" },
      ],
      pdpMetaTitle: "Women's Shelf-Bra Tank Manufacturer",
      pdpMetaDescription:
        "Women's shelf-bra tank manufacturer, private label, built-in shelf bra, removable pads, adjustable straps, stretch poly blend, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Poly/Spandex", "Nylon/Spandex", "Cotton/Poly Blend", "Recycled Polyester"],
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
        { label: "Women's Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Halter Tank", slug: "halter", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's tank, built-in shelf bra, adjustable straps (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted body, scoop neckline." },
        { label: "Support", value: "Built-in shelf bra with removable pads, adjustable back straps" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Shelf-bra tank, construction detail, women's" },
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
      cardTitle: "Women's Halter Tank",
      cardSubline: "Halter-neck strap, ties or clips behind the neck",
      gender: "Women",
      image: "",
      imageAlt: "Women's halter tank manufacturer",
      href: "/capriowear/activewear/tank-tops/halter",
      // Full PDP content for SKU 14 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 13. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "Women's Halter",
      sku: "CAP-TNK-14",
      pdpHeading: "Women's Halter Tank Manufacturer",
      pdpDescription:
        "Women's halter-neck tank with a deep scoop back, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Halter tank, front view, women's" },
        { alt: "Halter tank, neckline and back detail, women's" },
        { alt: "Halter tank, side profile, women's" },
        { alt: "Halter tank, fabric close-up, women's" },
        { alt: "Halter tank, worn on model, women's" },
        { alt: "Halter tank, flat lay, women's" },
      ],
      pdpMetaTitle: "Women's Halter Tank Manufacturer",
      pdpMetaDescription:
        "Women's halter tank manufacturer, private label, halterneck front, deep scoop back, stretch Polyester/Spandex, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Poly/Spandex", "Nylon/Spandex", "Cotton/Poly Blend", "Recycled Polyester"],
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
        { label: "Women's Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Shelf-Bra Tank", slug: "shelf-bra", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's halter-neck tank, deep scoop back (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted through the body." },
        { label: "Neckline", value: "Halter, ties or clips behind the neck" },
        { label: "Back", value: "Deep scoop" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Halter tank, construction detail, women's" },
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
      cardTitle: "Women's Cropped Tank",
      cardSubline: "Cropped hem length, cross-silhouette construction feature",
      gender: "Women",
      image: "",
      imageAlt: "Women's cropped tank manufacturer, cross-silhouette",
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
      pdpTitle: "Women's Cropped",
      sku: "CAP-TNK-15",
      pdpHeading: "Women's Cropped Tank Manufacturer",
      pdpDescription:
        "Women's relaxed tank with a cropped, midriff-baring hem, custom and private label, in stretch poly blend, made to your brand in Sialkot, Pakistan. The cropped hem length can also be layered onto other silhouettes on request.",
      images: [
        { alt: "Cropped tank, front view, women's" },
        { alt: "Cropped tank, hem detail, women's" },
        { alt: "Cropped tank, side profile, women's" },
        { alt: "Cropped tank, fabric close-up, women's" },
        { alt: "Cropped tank, worn on model, women's" },
        { alt: "Cropped tank, flat lay, women's" },
      ],
      pdpMetaTitle: "Women's Cropped Tank Manufacturer",
      pdpMetaDescription:
        "Women's cropped tank manufacturer, private label, relaxed fit, cropped midriff-baring hem, stretch poly blend, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Poly/Spandex", "Cotton/Poly Blend", "Nylon/Spandex", "Recycled Polyester"],
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
        { label: "Women's Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Relaxed Tank", slug: "relaxed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's relaxed tank, cropped midriff-baring hem (base type)",
        },
        {
          label: "Fabric",
          value: "Stretch poly blend, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed. Cropped hem length." },
        { label: "Hem length", value: "Cropped, midriff-baring" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Cropped tank, construction detail, women's" },
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
      cardTitle: "Women's Ribbed Tank",
      cardSubline: "Ribbed-knit body fabric, contrast side panels",
      gender: "Women",
      image: "",
      imageAlt: "Women's ribbed tank manufacturer",
      href: "/capriowear/activewear/tank-tops/ribbed-womens",
      // Full PDP content for SKU 16 (owner spec, 2026-09-22), draft, the
      // final SKU of the 16-SKU Tank Tops catalog. Card name "Ribbed
      // Tank" is shared with men's SKU 8 by design -- slug
      // `ribbed-womens` stays distinct from `ribbed-mens`, no collision.
      // Key facts read plain "MOQ from 50 pieces", same as men's (tops
      // never take waist-inch sizing). Reachable by URL and a clickable PLP
      // card via the sitewide draft-PDP rule (`isDraftPdpReachable()`):
      // still noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "Women's Ribbed",
      sku: "CAP-TNK-16",
      pdpHeading: "Women's Ribbed Tank Manufacturer",
      pdpDescription:
        "Women's fitted tank with ribbed-knit color-blocked side panels, custom and private label, in Poly/Spandex blend, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Ribbed tank, front view, women's" },
        { alt: "Ribbed tank, side panel detail, women's" },
        { alt: "Ribbed tank, side profile, women's" },
        { alt: "Ribbed tank, fabric close-up, women's" },
        { alt: "Ribbed tank, worn on model, women's" },
        { alt: "Ribbed tank, flat lay, women's" },
      ],
      pdpMetaTitle: "Women's Ribbed Tank Manufacturer",
      pdpMetaDescription:
        "Women's ribbed tank manufacturer, private label, ribbed knit with color-blocked side panels, Poly/Spandex body, any color, from 50 pieces, DDP worldwide.",
      pdpFabricPills: ["Cotton/Spandex Rib Knit", "Viscose/Spandex Rib Knit", "Poly/Spandex", "Nylon/Spandex"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the ribbed tank made from?",
          a: "A Poly/Spandex body with ribbed-knit color-blocked side panels, in the composition range typical of comparable ribbed tanks. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Can the ribbed panel be a solid color instead of color-blocked?",
          a: "Yes. Panel placement and color are fully customizable, including a solid-color or tonal option, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Women's Fitted Tank", slug: "fitted-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Relaxed Tank", slug: "relaxed-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Cropped Fitted Tank", slug: "cropped-fitted", href: "/capriowear/activewear/tank-tops" },
        { label: "Women's Racerback Tank", slug: "racerback-womens", href: "/capriowear/activewear/tank-tops" },
        { label: "See All", href: "/capriowear/activewear/tank-tops" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's fitted tank, ribbed-knit color-blocked side panels (base type)",
        },
        {
          label: "Fabric",
          value:
            "Poly/Spandex body with Cotton/Spandex or Viscose/Spandex rib knit side panels, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, close-to-body." },
        { label: "Panel detail", value: "Ribbed-knit color-blocked side panels" },
        { label: "Neckline", value: "Standard, finished" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Ribbed tank, construction detail, women's" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Rib-knit panel stretch recovery, shrinkage, and color-block alignment tested before bulk",
        "Fitted silhouette checked for consistent recovery across the size run",
        "Every run inspected to AQL 2.5",
        "Third-party inspection welcome",
      ],
      pdpCustomizationSteps: {
        eyebrow: "HOW WE CUSTOMIZE",
        heading: "Your brand, applied\nin-house, no outsourcing",
        steps: [
          { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
          { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
          {
            title: "Fabric",
            body: "Poly/Spandex body with ribbed-knit panels, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, same L1 group first
  // (Tops, per activewearMegaMenu), then the closest pairings from other groups.
  relatedLinks: [
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
    { label: "T-Shirts", href: "/capriowear/activewear/t-shirts" },
    { label: "Long-Sleeve Tops", href: "/capriowear/activewear/long-sleeve-tops" },
    { label: "Hoodies", href: "/capriowear/activewear/hoodies" },
    { label: "Sweatshirts", href: "/capriowear/activewear/sweatshirts" },
  ],
};
