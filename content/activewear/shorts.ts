// content/activewear/shorts.ts
// Third real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same as Sports Bras before it
// (owner spec, 2026-09-02): no edits to app/activewear/[category]/
// page.tsx, app/activewear/[category]/[style]/page.tsx, app/sitemap.ts,
// or lib/schema.ts, only this file plus one line in ./categories.ts.
//
// Full PLP content replacement, 2026-09-22 (owner spec): a real 14-SKU,
// dual-gender catalog (7 men's, 7 women's) replaces the earlier 6-style
// test build. Every style stays "draft" for now: each card shows on the
// grid, non-clickable, no PDP route generated (app/activewear/[category]/
// [style]/page.tsx's own generateStaticParams filters to "published" only,
// plus dynamicParams = false), excluded from app/sitemap.ts and this
// category's own CollectionPage/ItemList schema. Only SKU 1 (Custom
// Athletic Shorts, CAP-SHO-01) has real PDP content ready to wire up, in a
// later pass -- its card stays non-clickable ("draft") in this pass too,
// same rule Leggings' and Sports Bras' own styleCards already follow.
//
// The gender chip row (All/Women/Men) now actually filters the grid
// (owner spec, 2026-09-22) via each card's own `gender` field -- see
// StyleCard.gender's own comment in ./types.ts and ActivewearListing.tsx.
import type { Category } from "./types";

export const shorts: Category = {
  slug: "shorts",
  group: "Activewear",
  menuLabel: "Shorts",
  manufacturerNoun: "Shorts",
  productNounPlural: "shorts",
  entityExampleStyles: "athletic, fitted, relaxed, baggy, and high-rise and mid-rise biker styles",
  entityFabrics: "Polyester/Spandex, Nylon/Spandex, and recycled blends",
  // Owner's exact given entity Q&A (owner spec, 2026-09-22) -- overrides
  // categoryEntityFaq()'s own templated fallback sentence entirely (see
  // that function's own comment in ./pdpShared.ts: "bypasses" once both
  // entityQuestion and entityAnswer are set), so this renders verbatim as
  // the FAQ's first entry rather than the manufacturerNoun/
  // productNounPlural/entityExampleStyles/entityFabrics fields above being
  // assembled into a sentence. Those fields are still set above for
  // consistency with every other category file, even though they're
  // unused while this override is in place.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom shorts manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label shorts from fabric to packaging, including athletic, fitted, relaxed, baggy, high-rise and mid-rise biker, and 2-in-1 lined styles for men and women, in Polyester/Spandex, Nylon/Spandex, and recycled blends, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  h1: "Custom Shorts Manufacturer",
  metaTitle: "Custom Shorts Manufacturer",
  metaDescription:
    "Custom shorts manufacturer, OEM, ODM and private label, athletic to relaxed to baggy, 2-in-1 lined and zip-pocket builds, from 50 pieces, any fabric and color, DDP worldwide.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester/Spandex (cut-and-sew jersey knit or lightweight woven)",
      bestFor: "Training, running, athletic-regular styles",
      performance: "Quick-dry, moisture-wicking, 4-way stretch",
    },
    {
      fabric: "Nylon/Spandex",
      bestFor: "Compression and fitted biker styles",
      performance: "Soft hand, 4-way stretch, strong recovery",
    },
    {
      fabric: "Recycled Polyester",
      bestFor: "Sustainable lines",
      performance: "Eco-positioning, moisture management",
    },
    {
      fabric: "Cotton fleece (cotton or cotton/poly blend)",
      bestFor: "Relaxed, baggy, and sweatshort styles",
      performance: "Soft hand, warmth, brushed finish",
    },
  ],
  // Owner's exact given sentence (owner spec, 2026-09-22): no GSM or
  // composition figure at this category/fabric-table level, unlike the
  // earlier test copy's own "200 to 320 GSM" line -- only per-SKU, once a
  // style's real PDP content exists.
  fabricNote: [
    {
      text: "Fabric weight is confirmed on your sample. Swatches before every bulk run, and we can source or match a specific fabric from your reference.",
    },
  ],
  fabricPills: ["Polyester spandex", "Nylon spandex", "Recycled polyester", "Cotton fleece"],
  qualityHeading: "Fit that holds, seams that don't chafe",
  qualitySubline: "We confirm it all on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Seams reinforced and stress-tested",
    "Drawcords, eyelets, and zip pockets checked for secure anchoring",
    "Waistbands hold their recovery",
    "Liner and shell layers checked for consistent fit on 2-in-1 builds",
    "Every run inspected to AQL 2.5",
    "Third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Polyester/Spandex, Nylon/Spandex, recycled polyester, and cotton fleece blends" },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, DTF" },
    {
      title: "Style and fit",
      body: "Inseam length, rise, fit, waistband and closure, graded XS to 5XL (plus waist-inch sizing for men's)",
    },
    { title: "Branding", body: "Your logos by print, silicone, heat transfer, or embroidery" },
    { title: "Labels", body: "Woven, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom shorts?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Which fabrics do you use for shorts?",
      a: "Polyester/Spandex or Nylon/Spandex cut-and-sew knits and wovens, recycled polyester, and cotton fleece blends, confirmed on your sample.",
    },
    {
      q: "What shorts styles can you make?",
      a: "Athletic-regular, fitted, relaxed, and baggy fits at multiple inseam lengths for men, and high-rise and mid-rise fitted biker and relaxed styles for women, plus 2-in-1 shell-and-liner builds and a zip-pocket construction option.",
    },
    {
      q: "Can you build a 2-in-1 shell-and-liner short?",
      a: "Yes. A looser outer shell over a built-in fitted liner, confirmed for fit and layer alignment on your sample before bulk.",
    },
    {
      q: "Can you add a secure zip pocket?",
      a: "Yes. A discreet zip pocket at the waistband or outer thigh, layered onto any silhouette in the catalog.",
    },
    {
      q: "Can you match a specific fabric or a reference short?",
      a: "Yes. Send a swatch, reference, or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, color, print, inseam length, rise, fit, waistband and closure, your logos, woven and care labels, hangtags, and retail packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM, and private label shorts?",
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
      a: "Send your tech pack, sketch, or a reference short through our contact form. We come back within 24 hours with next steps, including a quote and sample timeline.",
    },
  ],
  ctaReferenceNoun: "pair of shorts",
  // 14 styles, 7 men's (CAP-SHO-01 to 07) then 7 women's (CAP-SHO-08 to
  // 14), every one "draft" (owner spec, 2026-09-22): real name, one-line
  // spec, and a `gender` tag for the chip-row filter. Shows on the grid as
  // a non-clickable tile (no hover image swap either, since no `images`
  // array is set -- see ProductCardMedia.tsx's own contract), no
  // generated route, excluded from the sitemap and this category's own
  // ItemList schema. Only SKU 1 has real PDP content (below) -- do not
  // flip any status to "published", and do not invent PDP-only fields
  // (pdpTitle, pdpDescription, gallery, etc.) for any other card here.
  styleCards: [
    {
      status: "draft",
      slug: "athletic-regular",
      sku: "CAP-SHO-01",
      cardTitle: "Custom Athletic Shorts",
      cardSubline: "Standard athletic fit, 5 to 7 inch inseam, drawcord waistband",
      gender: "Men",
      image: "",
      imageAlt: "Custom athletic shorts manufacturer",
      href: "/capriowear/activewear/shorts/athletic-regular",
      // Full PDP content for SKU 1 (owner spec, 2026-09-22), draft.
      // Reachable by URL and a clickable PLP card via the sitewide
      // draft-PDP rule (`isDraftPdpReachable()`, gated on `pdpHeading` +
      // `specifications` both being set): still noindex/nofollow, out of
      // the sitemap, no Product/FAQPage JSON-LD -- BreadcrumbList only.
      // Do not flip `status` to "published". No GSM or composition
      // figure of any kind (weight and fabric composition are both
      // "pending, confirmed on your sample"). `images` are alt-only
      // placeholders: real product photography is needed before this can
      // go live. `pdpFabricPills`/`pdpSpecHighlights` override the
      // category-level defaults with this style's own exact given
      // wording (slash fabric names, waist-inch sizing note) rather than
      // editing the shared `fabricPills`/`pdpSpecHighlights` every future
      // SKU on this category will also fall back to.
      pdpTitle: "Athletic/Regular",
      pdpHeading: "Custom Athletic Shorts Manufacturer",
      pdpDescription:
        "Men's athletic-regular fit shorts, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, 5 to 7 inch inseam, elastic waistband with drawcord, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Athletic shorts, front view" },
        { alt: "Athletic shorts, waistband and drawcord detail" },
        { alt: "Athletic shorts, side profile" },
        { alt: "Athletic shorts, fabric close-up" },
        { alt: "Athletic shorts, worn on model" },
        { alt: "Athletic shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Athletic Shorts Manufacturer",
      pdpMetaDescription:
        "Custom athletic-regular fit shorts manufacturer, OEM, ODM and private label, 5 to 7 inch inseam, elastic waistband with drawcord, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes (plus waist-inch sizing)" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the athletic-regular short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, in the composition range typical of comparable athletic training shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your fitted training short?",
          a: "This is a standard athletic-regular cut, not a close-to-body compression fit. It sits between our Fitted Training Shorts and our Relaxed Shorts in how close it sits to the leg.",
        },
      ],
      relatedStyleTags: [
        { label: "Fitted Training Shorts", slug: "fitted-training", href: "/capriowear/activewear/shorts" },
        { label: "Relaxed Shorts", slug: "relaxed-mid", href: "/capriowear/activewear/shorts" },
        { label: "Baggy Shorts", slug: "baggy", href: "/capriowear/activewear/shorts" },
        { label: "2-in-1 Shorts", slug: "2-in-1", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's athletic-regular fit short, not compression, not baggy, 5 to 7 inch inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Stretch and support", value: "Athletic-regular fit, not compression, not baggy. A standard mid-weight training and running short." },
        { label: "Waistband", value: "Standard elastic waistband with drawcord closure, side vent or split at the hem" },
        {
          label: "Construction",
          value: "Cut-and-sew, elastic waistband with drawcord, side vent detail, not knit-to-shape, flatlock finishing available",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Athletic shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Drawcord and eyelets checked for secure anchoring and pull strength",
        "Side vents checked for consistent finish across the size run",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "fitted-training",
      cardTitle: "Custom Fitted Training Shorts",
      cardSubline: "Closer training fit, 5 to 7 inch inseam",
      gender: "Men",
      image: "",
      imageAlt: "Custom fitted training shorts manufacturer",
      href: "/capriowear/activewear/shorts/fitted-training",
      // Full PDP content for SKU 2 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1. Reachable by URL and a clickable PLP card via the
      // sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage JSON-LD.
      // Do not flip `status` to "published". No GSM or composition
      // figure of any kind. `images` are alt-only placeholders: real
      // product photography is needed before this can go live.
      // `pdpFabricPills`/`pdpSpecHighlights` overrides match SKU 1's own.
      pdpTitle: "Fitted Training",
      sku: "CAP-SHO-02",
      pdpHeading: "Custom Fitted Training Shorts Manufacturer",
      pdpDescription:
        "Men's fitted athletic shorts, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, 5 to 7 inch inseam, a closer training fit than our Athletic short, elastic waistband with drawcord, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Fitted training shorts, front view" },
        { alt: "Fitted training shorts, waistband and drawcord detail" },
        { alt: "Fitted training shorts, side profile" },
        { alt: "Fitted training shorts, fabric close-up" },
        { alt: "Fitted training shorts, worn on model" },
        { alt: "Fitted training shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Fitted Training Shorts Manufacturer",
      pdpMetaDescription:
        "Custom fitted training shorts manufacturer, OEM, ODM and private label, 5 to 7 inch inseam, closer athletic fit, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes (plus waist-inch sizing)" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the fitted training short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, in the composition range typical of comparable fitted training shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Athletic short?",
          a: "This is a closer, more fitted cut through the leg and seat, at the same 5 to 7 inch inseam as our Athletic short. It sits between that standard athletic-regular fit and a closer compression build.",
        },
      ],
      relatedStyleTags: [
        { label: "Athletic Shorts", slug: "athletic-regular", href: "/capriowear/activewear/shorts" },
        { label: "Relaxed Shorts", slug: "relaxed-mid", href: "/capriowear/activewear/shorts" },
        { label: "Baggy Shorts", slug: "baggy", href: "/capriowear/activewear/shorts" },
        { label: "2-in-1 Shorts", slug: "2-in-1", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value:
            "Men's fitted athletic short, closer cut than our Athletic-Regular style, not compression, not baggy, 5 to 7 inch inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        // Weight row wording simplified sitewide (owner correction,
        // 2026-09-22, applied first on SKU 1): "Pending, confirmed on
        // your sample." only, not the longer disclaimer version.
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Closer, fitted athletic cut, not a compression fit. Sits between our Athletic short and a closer-still compression build.",
        },
        { label: "Waistband", value: "Standard elastic waistband with drawcord closure, side vent or split at the hem" },
        {
          label: "Construction",
          value: "Cut-and-sew, elastic waistband with drawcord, side vent detail, not knit-to-shape, flatlock finishing available",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Fitted training shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Drawcord and eyelets checked for secure anchoring and pull strength",
        "Side vents checked for consistent finish across the size run",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "relaxed-mid",
      cardTitle: "Custom Relaxed Shorts",
      cardSubline: "Roomier relaxed cut, 5 to 7 inch inseam",
      gender: "Men",
      image: "",
      imageAlt: "Custom relaxed shorts manufacturer",
      href: "/capriowear/activewear/shorts/relaxed-mid",
      // Full PDP content for SKU 3 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1/2. Reachable by URL and a clickable PLP card via
      // the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage JSON-LD.
      // Do not flip `status` to "published". First Shorts SKU with a real
      // GSM figure (340, attributed to the locked YoungLA reference, not
      // invented) -- unlike SKU 1/2's "pending" Polyester/Spandex or
      // Nylon/Spandex builds, this style is cotton fleece. `images` are
      // alt-only placeholders: real product photography is needed before
      // this can go live. CTA is Request a Sample only (no secondary
      // Download Catalog button), same as SKU 1/2.
      pdpTitle: "Relaxed",
      sku: "CAP-SHO-03",
      pdpHeading: "Custom Relaxed Shorts Manufacturer",
      pdpDescription:
        "Men's relaxed, roomier fit shorts, custom and private label, in a cotton fleece cut-and-sew construction, 5 to 7 inch inseam, elastic waistband with drawcord, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Relaxed shorts, front view" },
        { alt: "Relaxed shorts, waistband and drawcord detail" },
        { alt: "Relaxed shorts, side profile" },
        { alt: "Relaxed shorts, fabric close-up" },
        { alt: "Relaxed shorts, worn on model" },
        { alt: "Relaxed shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Relaxed Shorts Manufacturer",
      pdpMetaDescription:
        "Custom relaxed fit shorts manufacturer, OEM, ODM and private label, 5 to 7 inch inseam, roomier cut, cotton fleece, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes (plus waist-inch sizing)" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the relaxed short made from?",
          a: "A cotton fleece, cotton or cotton/poly blend, in a soft-hand, brushed-finish construction. Our locked sampling reference runs 340 GSM, and we confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Athletic and Fitted Training shorts?",
          a: "This is a roomier, relaxed cut, not a close-to-body athletic or fitted fit. It's built in a soft cotton fleece rather than a performance jersey knit.",
        },
      ],
      relatedStyleTags: [
        { label: "Athletic Shorts", slug: "athletic-regular", href: "/capriowear/activewear/shorts" },
        { label: "Fitted Training Shorts", slug: "fitted-training", href: "/capriowear/activewear/shorts" },
        { label: "Baggy Shorts", slug: "baggy", href: "/capriowear/activewear/shorts" },
        { label: "Relaxed Long Shorts", slug: "relaxed-long", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's relaxed, roomier fit short, not fitted, not baggy, 5 to 7 inch inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cotton fleece, cotton or cotton/poly blend, cut-and-sew construction, confirmed on your sample.",
        },
        {
          label: "Weight",
          value: "340 GSM. Final weight confirmed on your sample.",
        },
        {
          label: "Stretch and support",
          value: "Relaxed, roomier cut, not compression, not baggy. A soft-hand, brushed-finish everyday short.",
        },
        { label: "Waistband", value: "Standard elastic waistband with drawcord closure" },
        {
          label: "Construction",
          value: "Cut-and-sew, elastic waistband with drawcord, not knit-to-shape, flatlock finishing available",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Relaxed shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Drawcord and eyelets checked for secure anchoring and pull strength",
        "Waistbands hold their recovery",
        "Fleece brushed finish checked for consistency across the size run",
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
            body: "Cotton fleece or a Polyester/Spandex or Nylon/Spandex blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "baggy",
      cardTitle: "Custom Baggy Shorts",
      cardSubline: "Below-knee, wide-leg streetwear silhouette",
      gender: "Men",
      image: "",
      imageAlt: "Custom baggy shorts manufacturer",
      href: "/capriowear/activewear/shorts/baggy",
      // Full PDP content for SKU 4 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1/2/3. Reachable by URL and a clickable PLP card via
      // the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage JSON-LD.
      // Do not flip `status` to "published". Real GSM figure (460,
      // attributed to the locked YoungLA reference, not invented), same
      // cotton fleece family as SKU 3, heavier weight for the baggy
      // streetwear silhouette. `images` are alt-only placeholders: real
      // product photography is needed before this can go live. CTA is
      // Request a Sample only (no secondary Download Catalog button),
      // same as SKU 1/2/3.
      pdpTitle: "Baggy",
      sku: "CAP-SHO-04",
      pdpHeading: "Custom Baggy Shorts Manufacturer",
      pdpDescription:
        "Men's baggy, below-knee wide-leg shorts, custom and private label, in a heavyweight cotton fleece cut-and-sew construction, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Baggy shorts, front view" },
        { alt: "Baggy shorts, waistband and drawcord detail" },
        { alt: "Baggy shorts, side profile" },
        { alt: "Baggy shorts, fabric close-up" },
        { alt: "Baggy shorts, worn on model" },
        { alt: "Baggy shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Baggy Shorts Manufacturer",
      pdpMetaDescription:
        "Custom baggy shorts manufacturer, OEM, ODM and private label, below-knee wide-leg streetwear silhouette, heavyweight cotton fleece, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes (plus waist-inch sizing)" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the baggy short made from?",
          a: "A heavyweight cotton fleece, cotton or cotton/poly blend. Our locked sampling reference runs 460 GSM, and we confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How wide is the leg opening, and can it be adjusted?",
          a: "The below-knee, wide-leg cut is fully adjustable to your tech pack, we confirm the exact leg width and length on your sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "Relaxed Shorts", slug: "relaxed-mid", href: "/capriowear/activewear/shorts" },
        { label: "Relaxed Long Shorts", slug: "relaxed-long", href: "/capriowear/activewear/shorts" },
        { label: "Fitted Long Shorts", slug: "fitted-long", href: "/capriowear/activewear/shorts" },
        { label: "2-in-1 Shorts", slug: "2-in-1", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's baggy, oversized fit short, below-knee, wide-leg streetwear silhouette (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cotton fleece, cotton or cotton/poly blend, cut-and-sew construction, confirmed on your sample.",
        },
        {
          label: "Weight",
          value: "460 GSM. Final weight confirmed on your sample.",
        },
        {
          label: "Stretch and support",
          value: "Baggy, oversized fit, not compression, not fitted. A heavyweight streetwear short, not intended for close-fit training use.",
        },
        { label: "Waistband", value: "Standard elastic waistband with drawcord closure" },
        {
          label: "Construction",
          value: "Cut-and-sew, elastic waistband with drawcord, wide-leg pattern, not knit-to-shape, flatlock finishing available",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Baggy shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Drawcord and eyelets checked for secure anchoring and pull strength",
        "Waistbands hold their recovery",
        "Fleece weight and brushed finish checked for consistency across the size run",
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
            body: "Cotton fleece or a Polyester/Spandex or Nylon/Spandex blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "2-in-1",
      cardTitle: "Custom 2-in-1 Shorts",
      cardSubline: "Outer shell over a built-in fitted liner, mid-length inseam",
      gender: "Men",
      image: "",
      imageAlt: "Custom 2-in-1 shorts manufacturer",
      href: "/capriowear/activewear/shorts/2-in-1",
      // Full PDP content for SKU 5 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 4. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "2-in-1",
      sku: "CAP-SHO-05",
      pdpHeading: "Custom 2-in-1 Shorts Manufacturer",
      pdpDescription:
        "Men's 2-in-1 shorts, a looser outer shell over a built-in fitted liner, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew construction, mid-length inseam, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "2-in-1 shorts, front view" },
        { alt: "2-in-1 shorts, liner and shell detail" },
        { alt: "2-in-1 shorts, side profile" },
        { alt: "2-in-1 shorts, fabric close-up" },
        { alt: "2-in-1 shorts, worn on model" },
        { alt: "2-in-1 shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom 2-in-1 Shorts Manufacturer",
      pdpMetaDescription:
        "Custom 2-in-1 shorts manufacturer, OEM, ODM and private label, outer shell over a built-in fitted liner, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes (plus waist-inch sizing)" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the 2-in-1 short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew construction for both the outer shell and the fitted liner, in the composition range typical of comparable 2-in-1 training shorts. We confirm the exact blend and weight for each layer on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is the liner attached, can I change how fitted it is?",
          a: "The liner is built into the shell at the waistband, not a separate garment. Liner fit (looser or more compressive) is adjustable to your tech pack, confirmed for alignment and comfort on your sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "Athletic Shorts", slug: "athletic-regular", href: "/capriowear/activewear/shorts" },
        { label: "Fitted Training Shorts", slug: "fitted-training", href: "/capriowear/activewear/shorts" },
        { label: "Relaxed Shorts", slug: "relaxed-mid", href: "/capriowear/activewear/shorts" },
        { label: "Relaxed Long Shorts", slug: "relaxed-long", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's 2-in-1 short, looser outer shell over a built-in fitted liner, mid-length inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Two-layer construction, outer shell and liner both in cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Fitted compression liner under a looser, non-compression outer shell. Liner and shell fit checked together, not as separate garments.",
        },
        { label: "Waistband", value: "Standard elastic waistband with drawcord closure, shared by both layers" },
        {
          label: "Construction",
          value: "Cut-and-sew, two-layer build (outer shell plus attached fitted liner), elastic waistband with drawcord, not knit-to-shape, flatlock finishing available",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "2-in-1 shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Liner and shell layers checked for consistent fit and alignment together, not separately",
        "Drawcord and eyelets checked for secure anchoring and pull strength",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference, shell and liner independently specced",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "relaxed-long",
      cardTitle: "Custom Relaxed Long Shorts",
      cardSubline: "Roomier relaxed cut, 8 inch or below-knee",
      gender: "Men",
      image: "",
      imageAlt: "Custom relaxed long shorts manufacturer",
      href: "/capriowear/activewear/shorts/relaxed-long",
      // Full PDP content for SKU 6 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 5. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      pdpTitle: "Relaxed Long",
      sku: "CAP-SHO-06",
      pdpHeading: "Custom Relaxed Long Shorts Manufacturer",
      pdpDescription:
        "Men's relaxed, roomier fit shorts, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, 8 inch or below-knee inseam, elastic waistband with drawcord, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Relaxed long shorts, front view" },
        { alt: "Relaxed long shorts, waistband and drawcord detail" },
        { alt: "Relaxed long shorts, side profile" },
        { alt: "Relaxed long shorts, fabric close-up" },
        { alt: "Relaxed long shorts, worn on model" },
        { alt: "Relaxed long shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Relaxed Long Shorts Manufacturer",
      pdpMetaDescription:
        "Custom relaxed long shorts manufacturer, OEM, ODM and private label, 8 inch or below-knee inseam, roomier cut, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes (plus waist-inch sizing)" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the relaxed long short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, in the composition range typical of comparable relaxed training shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Relaxed and Baggy shorts?",
          a: "This shares the same roomier, relaxed cut as our shorter Relaxed short, just at an 8 inch or below-knee inseam. It's a lighter jersey knit build, not the heavier cotton fleece used on our Baggy short.",
        },
      ],
      relatedStyleTags: [
        { label: "Relaxed Shorts", slug: "relaxed-mid", href: "/capriowear/activewear/shorts" },
        { label: "Baggy Shorts", slug: "baggy", href: "/capriowear/activewear/shorts" },
        { label: "Fitted Long Shorts", slug: "fitted-long", href: "/capriowear/activewear/shorts" },
        { label: "2-in-1 Shorts", slug: "2-in-1", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's relaxed, roomier fit short, not fitted, not baggy, 8 inch or below-knee inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Relaxed, roomier cut, not compression, not baggy. A standard mid-weight everyday short at the longer inseam length.",
        },
        { label: "Waistband", value: "Standard elastic waistband with drawcord closure" },
        {
          label: "Construction",
          value: "Cut-and-sew, elastic waistband with drawcord, not knit-to-shape, flatlock finishing available",
        },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Relaxed long shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Drawcord and eyelets checked for secure anchoring and pull strength",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "fitted-long",
      cardTitle: "Custom Fitted Long Shorts",
      cardSubline: "Fitted baselayer cut, 8 inch or below-knee",
      gender: "Men",
      image: "",
      imageAlt: "Custom fitted long shorts manufacturer",
      href: "/capriowear/activewear/shorts/fitted-long",
      // Full PDP content for SKU 7 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 6, last SKU of the men's line. Reachable by
      // URL and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed
      // on your sample."). `images` are alt-only placeholders: real
      // product photography is needed before this can go live. CTA is
      // Request a Sample only.
      pdpTitle: "Fitted Long",
      sku: "CAP-SHO-07",
      pdpHeading: "Custom Fitted Long Shorts Manufacturer",
      pdpDescription:
        "Men's fitted, close-to-body compression shorts, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, 8 inch or below-knee inseam, drop-in pocket, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Fitted long shorts, front view" },
        { alt: "Fitted long shorts, drop-in pocket detail" },
        { alt: "Fitted long shorts, side profile" },
        { alt: "Fitted long shorts, fabric close-up" },
        { alt: "Fitted long shorts, worn on model" },
        { alt: "Fitted long shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Fitted Long Shorts Manufacturer",
      pdpMetaDescription:
        "Custom fitted long shorts manufacturer, OEM, ODM and private label, 8 inch or below-knee compression baselayer, drop-in pocket, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes (plus waist-inch sizing)" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the fitted long short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, in the composition range typical of comparable fitted compression shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Relaxed Long short?",
          a: "This is a fitted, close-to-body compression cut, worn standalone or as a baselayer, not the roomier relaxed fit of our Relaxed Long short at the same inseam length.",
        },
      ],
      relatedStyleTags: [
        { label: "Relaxed Long Shorts", slug: "relaxed-long", href: "/capriowear/activewear/shorts" },
        { label: "Baggy Shorts", slug: "baggy", href: "/capriowear/activewear/shorts" },
        { label: "Fitted Training Shorts", slug: "fitted-training", href: "/capriowear/activewear/shorts" },
        { label: "2-in-1 Shorts", slug: "2-in-1", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Men's fitted, close-to-body compression short, worn standalone or as a baselayer, 8 inch or below-knee inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Fitted, close-to-body compression fit, not relaxed, not baggy. Built for standalone wear or as a baselayer under a team uniform.",
        },
        { label: "Pocket", value: "Drop-in pocket, practical placement for secure everyday carry" },
        { label: "Waistband", value: "Standard elastic waistband, drawcord optional" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Fitted long shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Compression fit checked for consistent recovery across the size run",
        "Drop-in pocket checked for secure hold during movement",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "high-rise-biker",
      cardTitle: "Custom High-Rise Biker Shorts",
      cardSubline: "High-rise, fitted bike-short, 5 to 7 inch inseam",
      gender: "Women",
      image: "",
      imageAlt: "Custom high-rise biker shorts manufacturer",
      href: "/capriowear/activewear/shorts/high-rise-biker",
      // Full PDP content for SKU 8 (owner spec, 2026-09-22), draft, first
      // SKU of the women's line. Reachable by URL and a clickable PLP
      // card via the sitewide draft-PDP rule (`isDraftPdpReachable()`):
      // still noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      // `pdpSpecHighlights` drops the "(plus waist-inch sizing)"
      // qualifier the men's SKUs use -- that addition is men's-only per
      // the PLP customization strip, not a general sizing note.
      pdpTitle: "High-Rise Biker",
      sku: "CAP-SHO-08",
      pdpHeading: "Custom High-Rise Biker Shorts Manufacturer",
      pdpDescription:
        "Women's high-rise, fitted bike-short, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, 5 to 7 inch inseam, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "High-rise biker shorts, front view" },
        { alt: "High-rise biker shorts, waistband detail" },
        { alt: "High-rise biker shorts, side profile" },
        { alt: "High-rise biker shorts, fabric close-up" },
        { alt: "High-rise biker shorts, worn on model" },
        { alt: "High-rise biker shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom High-Rise Biker Shorts Manufacturer",
      pdpMetaDescription:
        "Custom high-rise biker shorts manufacturer, OEM, ODM and private label, fitted bike-short, 5 to 7 inch inseam, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the high-rise biker short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, in the composition range typical of comparable fitted biker shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Mid-Rise Biker short?",
          a: "This is a high-rise waistband at the same 5 to 7 inch inseam and fitted, compression cut. Our Mid-Rise Biker short uses a lower waistband at the same length and fit.",
        },
      ],
      relatedStyleTags: [
        { label: "Mid-Rise Biker Shorts", slug: "mid-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "High-Rise Mini Shorts", slug: "high-rise-mini", href: "/capriowear/activewear/shorts" },
        { label: "Zip-Pocket Shorts", slug: "zip-pocket", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Relaxed Shorts", slug: "mid-rise-relaxed", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's high-rise, fitted bike-short, 5 to 7 inch inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Fitted, compression bike-short fit, not relaxed, not loose. A close-to-body silhouette built to hold through movement.",
        },
        { label: "Waistband", value: "High-rise elastic waistband, wide enough for a comfortable compression hold" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "High-rise biker shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Compression fit checked for consistent recovery across the size run",
        "High-rise waistband checked for hold and no roll-down under movement",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "mid-rise-biker",
      cardTitle: "Custom Mid-Rise Biker Shorts",
      cardSubline: "Mid-rise, fitted bike-short, 5 to 7 inch inseam",
      gender: "Women",
      image: "",
      imageAlt: "Custom mid-rise biker shorts manufacturer",
      href: "/capriowear/activewear/shorts/mid-rise-biker",
      // Full PDP content for SKU 9 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 8. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      // `pdpSpecHighlights` drops the "(plus waist-inch sizing)"
      // qualifier the men's SKUs use -- women's-only, same as SKU 8.
      pdpTitle: "Mid-Rise Biker",
      sku: "CAP-SHO-09",
      pdpHeading: "Custom Mid-Rise Biker Shorts Manufacturer",
      pdpDescription:
        "Women's mid-rise, fitted bike-short, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, 5 to 7 inch inseam, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Mid-rise biker shorts, front view" },
        { alt: "Mid-rise biker shorts, waistband detail" },
        { alt: "Mid-rise biker shorts, side profile" },
        { alt: "Mid-rise biker shorts, fabric close-up" },
        { alt: "Mid-rise biker shorts, worn on model" },
        { alt: "Mid-rise biker shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Mid-Rise Biker Shorts Manufacturer",
      pdpMetaDescription:
        "Custom mid-rise biker shorts manufacturer, OEM, ODM and private label, fitted bike-short, 5 to 7 inch inseam, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the mid-rise biker short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, in the composition range typical of comparable fitted biker shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your High-Rise Biker short?",
          a: "This uses a mid-rise waistband at the same 5 to 7 inch inseam and fitted, compression cut. Our High-Rise Biker short uses a taller waistband at the same length and fit.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Biker Shorts", slug: "high-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "High-Rise Mini Shorts", slug: "high-rise-mini", href: "/capriowear/activewear/shorts" },
        { label: "Zip-Pocket Shorts", slug: "zip-pocket", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Relaxed Shorts", slug: "mid-rise-relaxed", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's mid-rise, fitted bike-short, 5 to 7 inch inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Fitted, compression bike-short fit, not relaxed, not loose. A close-to-body silhouette built to hold through movement.",
        },
        { label: "Waistband", value: "Mid-rise elastic waistband" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Mid-rise biker shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Compression fit checked for consistent recovery across the size run",
        "Mid-rise waistband checked for hold and no roll-down under movement",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "high-rise-mini",
      cardTitle: "Custom High-Rise Mini Shorts",
      cardSubline: "High-rise, fitted, 4 inch or under",
      gender: "Women",
      image: "",
      imageAlt: "Custom high-rise mini shorts manufacturer",
      href: "/capriowear/activewear/shorts/high-rise-mini",
      // Full PDP content for SKU 10 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 9. Reachable by URL and a clickable PLP card
      // via the sitewide draft-PDP rule (`isDraftPdpReachable()`): still
      // noindex/nofollow, out of the sitemap, no Product/FAQPage
      // JSON-LD. Do not flip `status` to "published". No GSM sourced
      // (Weight stays "Pending, confirmed on your sample."). `images`
      // are alt-only placeholders: real product photography is needed
      // before this can go live. CTA is Request a Sample only.
      // `pdpSpecHighlights` drops the "(plus waist-inch sizing)"
      // qualifier the men's SKUs use -- women's-only, same as SKU 8/9.
      pdpTitle: "High-Rise Mini",
      sku: "CAP-SHO-10",
      pdpHeading: "Custom High-Rise Mini Shorts Manufacturer",
      pdpDescription:
        "Women's high-rise, fitted short, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, 4 inch or under inseam, side pocket, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "High-rise mini shorts, front view" },
        { alt: "High-rise mini shorts, side pocket detail" },
        { alt: "High-rise mini shorts, side profile" },
        { alt: "High-rise mini shorts, fabric close-up" },
        { alt: "High-rise mini shorts, worn on model" },
        { alt: "High-rise mini shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom High-Rise Mini Shorts Manufacturer",
      pdpMetaDescription:
        "Custom high-rise mini shorts manufacturer, OEM, ODM and private label, fitted, 4 inch or under inseam, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the high-rise mini short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, in the composition range typical of comparable fitted compression shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your High-Rise Biker short?",
          a: "Same high-rise, fitted compression construction, at a shorter 4 inch or under inseam instead of the 5 to 7 inch length used on our Biker short.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Biker Shorts", slug: "high-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Biker Shorts", slug: "mid-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Mini Shorts", slug: "mid-rise-mini", href: "/capriowear/activewear/shorts" },
        { label: "Zip-Pocket Shorts", slug: "zip-pocket", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's high-rise, fitted short, 4 inch or under inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Fitted, compression fit, not relaxed, not loose. A close-to-body silhouette at the shortest inseam length in the catalog.",
        },
        { label: "Pocket", value: "Side pocket, practical placement for secure everyday carry" },
        { label: "Waistband", value: "High-rise elastic waistband, wide enough for a comfortable compression hold" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "High-rise mini shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Compression fit checked for consistent recovery across the size run",
        "High-rise waistband checked for hold and no roll-down under movement",
        "Side pocket checked for secure hold during movement",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "zip-pocket",
      cardTitle: "Custom Zip-Pocket Shorts",
      cardSubline: "Discreet zip pocket, layered onto any silhouette",
      gender: "Women",
      image: "",
      imageAlt: "Custom zip-pocket shorts manufacturer",
      href: "/capriowear/activewear/shorts/zip-pocket",
      // Full PDP content for SKU 11 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 10. A construction-feature SKU, not a pure
      // silhouette one -- the "can be layered onto any other silhouette
      // in the catalog" framing is kept in the description, spec table,
      // and FAQ (owner note: don't drop it as filler). Reachable by URL
      // and a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed on
      // your sample."). `images` are alt-only placeholders: real product
      // photography is needed before this can go live. CTA is Request a
      // Sample only. `pdpSpecHighlights` drops the "(plus waist-inch
      // sizing)" qualifier the men's SKUs use -- women's-only, same as
      // SKU 8 to 10.
      pdpTitle: "Zip-Pocket",
      sku: "CAP-SHO-11",
      pdpHeading: "Custom Zip-Pocket Shorts Manufacturer",
      pdpDescription:
        "Women's mid-rise, fitted short with a discreet zip pocket, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, short inseam, made to your brand in Sialkot, Pakistan. The zip pocket detail can also be layered onto any other silhouette in the catalog on request.",
      images: [
        { alt: "Zip-pocket shorts, front view" },
        { alt: "Zip-pocket shorts, zip pocket detail" },
        { alt: "Zip-pocket shorts, side profile" },
        { alt: "Zip-pocket shorts, fabric close-up" },
        { alt: "Zip-pocket shorts, worn on model" },
        { alt: "Zip-pocket shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Zip-Pocket Shorts Manufacturer",
      pdpMetaDescription:
        "Custom zip-pocket shorts manufacturer, OEM, ODM and private label, fitted, discreet zip pocket, mid-rise, short inseam, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the zip-pocket short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, in the composition range typical of comparable fitted compression shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "Can I get this zip pocket on a different style, not this exact short?",
          a: "Yes. The zip-pocket construction is not tied to this one silhouette. We can build it into the waistband or outer thigh of any other short in the catalog, high-rise or mid-rise, biker or mini, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Biker Shorts", slug: "high-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Biker Shorts", slug: "mid-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "High-Rise Mini Shorts", slug: "high-rise-mini", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Mini Shorts", slug: "mid-rise-mini", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's mid-rise, fitted short, short inseam, with a discreet zip pocket (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Fitted, compression fit, not relaxed, not loose. A close-to-body silhouette built to hold through movement.",
        },
        {
          label: "Pocket",
          value:
            "Discreet zip pocket, positioned at the outer thigh or waistband, confirmed on your sample. The same zip-pocket construction can be added to any other silhouette in the catalog.",
        },
        { label: "Waistband", value: "Mid-rise elastic waistband, rise confirmed on your sample" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Zip-pocket shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Compression fit checked for consistent recovery across the size run",
        "Zip pocket checked for secure anchoring and smooth action through movement",
        "Waistband checked for hold and no roll-down under movement",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "mid-rise-relaxed",
      cardTitle: "Custom Mid-Rise Relaxed Shorts",
      cardSubline: "Roomy, relaxed mid-rise cut",
      gender: "Women",
      image: "",
      imageAlt: "Custom mid-rise relaxed shorts manufacturer",
      href: "/capriowear/activewear/shorts/mid-rise-relaxed",
      // Full PDP content for SKU 12 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 11. No inseam number invented anywhere on this
      // page (owner note): the Specifications table's Inseam row stays
      // "Not fixed at this SKU level" rather than a number, matching how
      // this relaxed group is built across the reference brands.
      // Reachable by URL and a clickable PLP card via the sitewide
      // draft-PDP rule (`isDraftPdpReachable()`): still noindex/nofollow,
      // out of the sitemap, no Product/FAQPage JSON-LD. Do not flip
      // `status` to "published". No GSM sourced (Weight stays "Pending,
      // confirmed on your sample."). `images` are alt-only placeholders:
      // real product photography is needed before this can go live. CTA
      // is Request a Sample only. `pdpSpecHighlights` drops the "(plus
      // waist-inch sizing)" qualifier the men's SKUs use -- women's-only,
      // same as SKU 8 to 11.
      pdpTitle: "Mid-Rise Relaxed",
      sku: "CAP-SHO-12",
      pdpHeading: "Custom Mid-Rise Relaxed Shorts Manufacturer",
      pdpDescription:
        "Women's mid-rise, relaxed and loose fit short, custom and private label, in a Polyester/Spandex, Nylon/Spandex, or cotton fleece cut-and-sew woven or lightweight fleece, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Mid-rise relaxed shorts, front view" },
        { alt: "Mid-rise relaxed shorts, waistband detail" },
        { alt: "Mid-rise relaxed shorts, side profile" },
        { alt: "Mid-rise relaxed shorts, fabric close-up" },
        { alt: "Mid-rise relaxed shorts, worn on model" },
        { alt: "Mid-rise relaxed shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Mid-Rise Relaxed Shorts Manufacturer",
      pdpMetaDescription:
        "Custom mid-rise relaxed shorts manufacturer, OEM, ODM and private label, roomy loose fit, mid-rise waistband, Polyester/Spandex, Nylon/Spandex or cotton fleece, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the mid-rise relaxed short made from?",
          a: "A Polyester/Spandex, Nylon/Spandex, or cotton fleece cut-and-sew woven or lightweight fleece, in the composition range typical of comparable relaxed shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "What inseam length does this short come in?",
          a: "Inseam is not fixed at the catalog level for this style, it is set to your brief and confirmed on your sample, matching how this relaxed group is built across the reference brands.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Biker Shorts", slug: "high-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Biker Shorts", slug: "mid-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Mini Shorts", slug: "mid-rise-mini", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Sweat Shorts", slug: "relaxed-short", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's mid-rise, relaxed and loose fit short (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew woven or lightweight fleece, Polyester/Spandex, Nylon/Spandex, or cotton fleece, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Relaxed, loose fit, not fitted, not compression. A roomy cut through the seat and thighs.",
        },
        { label: "Inseam", value: "Not fixed at this SKU level, confirmed on your sample or set to your brief." },
        { label: "Waistband", value: "Mid-rise elastic waistband" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Mid-rise relaxed shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Relaxed fit checked for consistent drape across the size run",
        "Mid-rise waistband checked for hold and no roll-down under movement",
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
            body: "Polyester/Spandex, Nylon/Spandex, or cotton fleece, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "mid-rise-mini",
      cardTitle: "Custom Mid-Rise Mini Shorts",
      cardSubline: "Short, fitted mid-rise cut, 4 inch or under",
      gender: "Women",
      image: "",
      imageAlt: "Custom mid-rise mini shorts manufacturer",
      href: "/capriowear/activewear/shorts/mid-rise-mini",
      // Full PDP content for SKU 13 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 12. Card title and slug already used "Mini,"
      // matching SKU 10's own naming convention, never "Short Shorts"
      // (see the earlier 2026-09-22 rename entry). Reachable by URL and
      // a clickable PLP card via the sitewide draft-PDP rule
      // (`isDraftPdpReachable()`): still noindex/nofollow, out of the
      // sitemap, no Product/FAQPage JSON-LD. Do not flip `status` to
      // "published". No GSM sourced (Weight stays "Pending, confirmed
      // on your sample."). `images` are alt-only placeholders: real
      // product photography is needed before this can go live. CTA is
      // Request a Sample only. `pdpSpecHighlights` drops the "(plus
      // waist-inch sizing)" qualifier the men's SKUs use -- women's-only,
      // same as SKU 8 to 12.
      pdpTitle: "Mid-Rise Mini",
      sku: "CAP-SHO-13",
      pdpHeading: "Custom Mid-Rise Mini Shorts Manufacturer",
      pdpDescription:
        "Women's mid-rise, fitted short, custom and private label, in a Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, 4 inch or under inseam, no-front-seam construction, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Mid-rise mini shorts, front view" },
        { alt: "Mid-rise mini shorts, no-front-seam detail" },
        { alt: "Mid-rise mini shorts, side profile" },
        { alt: "Mid-rise mini shorts, fabric close-up" },
        { alt: "Mid-rise mini shorts, worn on model" },
        { alt: "Mid-rise mini shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Mid-Rise Mini Shorts Manufacturer",
      pdpMetaDescription:
        "Custom mid-rise mini shorts manufacturer, OEM, ODM and private label, fitted, 4 inch or under inseam, no front seam, Polyester/Spandex or Nylon/Spandex, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester", "Cotton fleece"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the mid-rise mini short made from?",
          a: "A Polyester/Spandex or Nylon/Spandex cut-and-sew jersey knit or lightweight woven, in the composition range typical of comparable fitted compression shorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your High-Rise Mini short?",
          a: "Same 4 inch or under inseam and fitted, compression cut. This uses a mid-rise waistband instead of the taller high-rise waistband on our High-Rise Mini short.",
        },
      ],
      relatedStyleTags: [
        { label: "High-Rise Biker Shorts", slug: "high-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Biker Shorts", slug: "mid-rise-biker", href: "/capriowear/activewear/shorts" },
        { label: "High-Rise Mini Shorts", slug: "high-rise-mini", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Sweat Shorts", slug: "relaxed-short", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's mid-rise, fitted short, 4 inch or under inseam (base type)",
        },
        {
          label: "Fabric",
          value:
            "Cut-and-sew jersey knit or lightweight woven, Polyester/Spandex or Nylon/Spandex, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Fitted, compression fit, not relaxed, not loose. A close-to-body silhouette at the shortest inseam length in the catalog.",
        },
        { label: "Seam", value: "No-front-seam construction." },
        { label: "Waistband", value: "Mid-rise elastic waistband" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Mid-rise mini shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Compression fit checked for consistent recovery across the size run",
        "No-front-seam construction checked for chafe-free wear",
        "Mid-rise waistband checked for hold and no roll-down under movement",
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
            body: "Polyester/Spandex or Nylon/Spandex, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
    {
      status: "draft",
      slug: "relaxed-short",
      cardTitle: "Custom Mid-Rise Sweat Shorts",
      cardSubline: "Relaxed sweatshort, short inseam",
      gender: "Women",
      image: "",
      imageAlt: "Custom mid-rise sweat shorts manufacturer",
      href: "/capriowear/activewear/shorts/relaxed-short",
      // Full PDP content for SKU 14 (owner spec, 2026-09-22), draft, same
      // shape as SKU 1 to 13, the last of the 14-SKU Shorts catalog.
      // Reachable by URL and a clickable PLP card via the sitewide
      // draft-PDP rule (`isDraftPdpReachable()`): still noindex/nofollow,
      // out of the sitemap, no Product/FAQPage JSON-LD. Do not flip
      // `status` to "published". No GSM sourced (Weight stays "Pending,
      // confirmed on your sample."). `images` are alt-only placeholders:
      // real product photography is needed before this can go live. CTA
      // is Request a Sample only. `pdpSpecHighlights` drops the "(plus
      // waist-inch sizing)" qualifier the men's SKUs use -- women's-only,
      // same as SKU 8 to 13.
      pdpTitle: "Mid-Rise Sweat",
      sku: "CAP-SHO-14",
      pdpHeading: "Custom Mid-Rise Sweat Shorts Manufacturer",
      pdpDescription:
        "Women's mid-rise, relaxed fleece sweatshort, custom and private label, in a cotton fleece or cotton/poly blend brushed knit, short inseam, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Mid-rise sweat shorts, front view" },
        { alt: "Mid-rise sweat shorts, waistband and drawcord detail" },
        { alt: "Mid-rise sweat shorts, side profile" },
        { alt: "Mid-rise sweat shorts, fabric close-up" },
        { alt: "Mid-rise sweat shorts, worn on model" },
        { alt: "Mid-rise sweat shorts, flat lay" },
      ],
      pdpMetaTitle: "Custom Mid-Rise Sweat Shorts Manufacturer",
      pdpMetaDescription:
        "Custom mid-rise sweat shorts manufacturer, OEM, ODM and private label, relaxed fleece short, short inseam, cotton fleece or cotton/poly blend, from 50 pieces, any fabric and color, DDP worldwide.",
      pdpFabricPills: ["Cotton fleece", "Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester"],
      pdpSpecHighlights: [
        { icon: "package", text: "MOQ from 50 pieces" },
        { icon: "calendarDays", text: "Samples in 10 to 14 days" },
        { icon: "arrowDownAZ", text: "XS to 5XL sizes" },
        { icon: "ship", text: "DDP to 20+ countries" },
      ],
      faqs: [
        {
          q: "What fabric is the mid-rise sweat short made from?",
          a: "A cotton fleece or cotton/poly blend with a brushed finish, in the composition range typical of comparable sweatshorts. We confirm the exact blend and weight on your sample, matched to your reference if you have one.",
        },
        {
          q: "How is this different from your Mid-Rise Relaxed short?",
          a: "This is a fleece sweatshort at a short inseam, built for comfort and off-duty wear. Our Mid-Rise Relaxed short uses a woven fabric instead of fleece, at an unfixed, brief-set inseam.",
        },
      ],
      relatedStyleTags: [
        { label: "Mid-Rise Relaxed Shorts", slug: "mid-rise-relaxed", href: "/capriowear/activewear/shorts" },
        { label: "Mid-Rise Mini Shorts", slug: "mid-rise-mini", href: "/capriowear/activewear/shorts" },
        { label: "High-Rise Mini Shorts", slug: "high-rise-mini", href: "/capriowear/activewear/shorts" },
        { label: "Relaxed Long Shorts", slug: "relaxed-long", href: "/capriowear/activewear/shorts" },
        { label: "See All", href: "/capriowear/activewear/shorts" },
      ],
      specifications: [
        {
          label: "Style",
          value: "Women's mid-rise, relaxed fleece sweatshort, short inseam (base type)",
        },
        {
          label: "Fabric",
          value: "Cotton fleece or cotton/poly blend, brushed finish, confirmed on your sample.",
        },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        {
          label: "Stretch and support",
          value: "Relaxed, loose fleece fit, not fitted, not compression.",
        },
        { label: "Waistband", value: "Mid-rise elastic waistband, drawcord closure" },
        { label: "Construction", value: "Cut-and-sew, not knit-to-shape, flatlock finishing available" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Mid-rise sweat shorts, construction detail" },
      pdpQualityPoints: [
        "Seams reinforced and stress-tested",
        "Fleece checked for consistent hand feel and brushed finish across the run",
        "Drawcord and waistband checked for secure hold",
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
            body: "Cotton fleece or cotton/poly blend, any weight, sourced or matched to your reference",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric" },
          },
          { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Trims and finish" } },
          { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Packaging" } },
        ],
      },
    },
  ],
  relatedLinks: [
    { label: "Leggings", href: "/capriowear/activewear/leggings" },
    { label: "Joggers & Track Pants", href: "/capriowear/activewear/joggers" },
    { label: "Compression & Base Layers", href: "/capriowear/activewear/compression-base-layers" },
  ],
};
