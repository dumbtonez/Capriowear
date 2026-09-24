// content/activewear/jumpsuits.ts
// Rewritten to the owner's final, locked 6-SKU catalog and copy (owner
// spec, 2026-09-24), replacing the 2026-09-03 test version, including its
// two test PDPs (full-length-unitard, cropped-unitard), removed so both
// routes 404. Their style codes CAP-JMP-01/02 are reused below.
// Women's-only category, same as Leggings, Sports Bras and Bodysuits: no
// gender toggle, no `gender` field on any card.
//
// Every card is a card-only "draft" (name, spec line, no PDP content), so
// each renders non-clickable, gets no route, and stays out of the sitemap
// and CollectionPage/ItemList. A card becomes a link automatically the
// moment its PDP content (`pdpHeading` + `specifications`) is added, via
// the sitewide `isDraftPdpReachable()` rule, same as Hoodies and Bodysuits.
// Grid order is SKU-number order, 1 to 6.
//
// PDP batch 1 (owner spec, 2026-09-24): SKUs 1 to 3 carry full draft PDP
// content, so their cards link and their pages render noindexed, with no
// sitemap entry and no Product/FAQPage JSON-LD. Key facts, customization
// chips, spec subtitle and the operational FAQs are the shared PDP
// defaults (./pdpShared.ts); "How we customize" is set once below for the
// whole category. Related-style pills carry a `slug`, so a pill for an
// unbuilt SKU falls back to the PLP and switches to its PDP by itself.
//
// PDP batch 2 (owner spec, 2026-09-24): SKUs 4 to 6 added the same way, so
// all 6 cards link and every related-style pill resolves to a real PDP. Second and final category under
// the "ONE-PIECES" mega-menu group (content/home.ts), after Bodysuits.
//
// No `weightTiers` block (owner spec): jumpsuits are not weight-tier driven.
import type { Category } from "./types";
import { faqGetStarted } from "./pdpShared";

export const jumpsuits: Category = {
  slug: "jumpsuits",
  group: "Activewear",
  menuLabel: "Jumpsuits",
  // Verbatim override pair (owner spec, 2026-09-24), same as Bodysuits:
  // bypasses categoryEntityFaq()'s templated sentence entirely.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom jumpsuit manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label athletic jumpsuits and unitards from fabric to packaging, including fitted full-length styles with straight or flared legs, deep V, corset-detail and molded-cup builds, and a relaxed wide-leg style, in Nylon/Spandex, Polyester/Spandex and scuba knits, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  // "Athletic" qualifier stays in the H1 and title (the bare term draws
  // fashion intent). No "| Capriowear" suffix: the root layout's title
  // template adds it.
  h1: "Custom Athletic Jumpsuit Manufacturer",
  metaTitle: "Custom Athletic Jumpsuit Manufacturer",
  metaDescription:
    "Custom athletic jumpsuit manufacturer: private label unitards and flared or wide-leg jumpsuits in stretch and scuba knits, MOQ 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Women's-only category: the All/Women/Men chip row does not render.
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon/Spandex",
      bestFor: "Smooth second-skin and sculpting jumpsuits",
      performance: "Soft hand, 4-way stretch, strong recovery",
    },
    {
      fabric: "Polyester/Spandex (68 to 78% / 22 to 32%)",
      bestFor: "Training and print-ready jumpsuits",
      performance: "Moisture-wicking, quick-dry, holds sublimation",
    },
    {
      fabric: "Modal-blend jersey (Modal/Nylon/Spandex)",
      bestFor: "Relaxed, wide-leg jumpsuits",
      performance: "Soft drape, light stretch, easy movement",
    },
    {
      fabric: "Scuba knit",
      bestFor: "Structured, sculpted jumpsuit silhouettes",
      performance: "Double-knit body holds its shape, strong recovery, more structure than a soft legging knit",
    },
    {
      fabric: "Interlock knit",
      bestFor: "A firmer, more stable alternative",
      performance: "Denser double-knit, holds a defined line across a long panel",
    },
  ],
  fabricNote: [
    {
      text: "Scuba knit, a smooth structured double-knit commonly 90 to 95% Polyester with 5 to 10% Spandex at 180 to 380 GSM, gives a more sculptural silhouette and is a different fabric from true neoprene, lighter and more breathable. Fabric weight and composition are confirmed on your sample, and matte or shine finish is chosen at swatch stage. Seamless and circular-knit jumpsuits sit outside our cut-and-sew scope. Swatches before every bulk run, and we can source or match a specific fabric or reference garment.",
    },
  ],
  fabricPills: ["Nylon/Spandex", "Polyester/Spandex", "Modal-blend jersey", "Scuba knit", "Interlock"],
  qualityHeading: "Built as one piece, tested to move",
  qualitySubline: "We test the entry, the gusset and the length on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Torso and leg length graded and checked across every size, not just the sample",
    "Entry method chosen for the use case, and any zip checked so it does not restrict squatting, reaching or lunging",
    "Gusset seam tested under stretch, so no single seam bears the full load",
    "Opacity confirmed under real stretch across the full leg, not only at rest",
    "Fit and recovery hold after repeated wear and wash",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Nylon/Spandex, Polyester/Spandex, Modal-blend jersey, scuba or interlock for structure, matte or shine finish",
    },
    { title: "Leg length and shape", body: "Full-length or cropped, straight, flared, or wide with a drop crotch" },
    { title: "Fit and neckline", body: "Fitted or relaxed, scoop, square, halter, V or plunge neckline" },
    { title: "Entry", body: "Step-in pull-on, back zip, or side zip, chosen for your use case" },
    {
      title: "Closure and support",
      body: "Snap-button or sewn gusset, built-in shelf bra, molded cups, or removable pads",
    },
    { title: "Back and sleeve", body: "Closed, open, or cross-back, sleeveless, short, or long sleeve" },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Entity question is NOT stored here -- see entityQuestion/entityAnswer
  // above; the route prepends it at render time. The remaining 16 below.
  faqs: [
    {
      q: "What is your MOQ for custom jumpsuits?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a bodysuit and a jumpsuit?",
      a: "A bodysuit ends at the hip, or at a short bike-short-length leg a few inches down the thigh. A jumpsuit or unitard continues into full or cropped leg coverage. Capriowear makes both.",
    },
    {
      q: "What entry methods do you offer on jumpsuits, and which is best?",
      a: "Step-in pull-on, back zip, or side zip. A step-in keeps full stretch everywhere, which suits high-movement training. A back zip is easier to get into, but the zip line does not stretch, so we check it on your sample for squatting, reaching and lunging. We help you choose by use case.",
    },
    {
      q: "Can you add a snap gusset to a jumpsuit?",
      a: "Yes. A snap-button gusset can be built in for access, independent of the entry method, or the gusset can be fully sewn. Either way the gusset spreads movement strain so the center-back and inner-leg seams do not carry the full load.",
    },
    {
      q: "Which fabrics do you use for jumpsuits?",
      a: "Nylon/Spandex and Polyester/Spandex knits for fitted jumpsuits, a Modal-blend jersey for relaxed styles, and scuba or interlock knits for a more structured, sculpted silhouette, in a matte or shine finish confirmed on your sample.",
    },
    {
      q: "What leg lengths and shapes can you make on a jumpsuit?",
      a: "Full-length or cropped legs, cut straight, flared, or wide with a drop crotch, to your spec. One-pieces with a short bike-short leg are built as bodysuits.",
    },
    {
      q: "How do you check opacity on a jumpsuit?",
      a: "We check jumpsuit opacity on your sample under real stretch across the full leg, not only at rest, and move to a heavier knit or a lined panel where a color needs it, lighter colors especially.",
    },
    {
      q: "How do you get the fit right on a one-piece jumpsuit?",
      a: "We grade and test torso length and leg length together across the full size range, not just the sample size. A waist-seam construction grades more reliably than a torso panel cut in one piece from shoulder to leg, so we recommend it where fit across a wide size run matters most.",
    },
    {
      q: "Can you match a specific fabric or a reference jumpsuit?",
      a: "Yes. Send a swatch, reference garment, or tech pack and we source or develop to match, then share swatches and confirm on your sample before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric and finish, leg length and shape, fit, neckline, back, sleeve, entry method, gusset closure, built-in support, color, print, your logos, labels, hangtags, and packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM, and private label jumpsuits?",
      a: "Yes, all three. As a private label jumpsuit manufacturer, we make every style under your brand, with your labels and packaging.",
    },
    {
      q: "How are jumpsuits sized?",
      a: "Alpha XS to 5XL. Torso length and leg length are graded and checked together across every size, because a one-piece jumpsuit has no waistband to absorb a difference in either.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, DDP to 20+ countries, including the US, UK, EU, Canada, and Australia, with GSP+ 0% EU duty.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "jumpsuit",
  // "How we customize" for every Jumpsuits PDP (owner spec, 2026-09-24):
  // 6 steps incl. Build, overriding the shared 5-step default. Same
  // temporary factory photography as the shared default.
  pdpCustomizationSteps: {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    mobileHeading: "Your brand, applied in-\nhouse, no outsourcing",
    steps: [
      { title: "Fabric and material", body: "Any blend and weight, sourced or matched to your reference", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Fabric and material" } },
      { title: "Print and artwork", body: "Sublimation, screen, DTF, DTG", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Print and artwork" } },
      { title: "Branding", body: "Silicone, heat transfer, embroidery", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Branding" } },
      { title: "Build", body: "Leg shape, neckline, back, entry, gusset, and support to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Build" } },
      { title: "Trims and finish", body: "Woven labels, size and care labels, hangtags", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Trims and finish" } },
      { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Packaging" } },
    ],
  },
  // 6 drafts, all with PDP content, SKU-number order (see header comment). Alt text is
  // the card name exactly.
  styleCards: [
    {
      status: "draft",
      slug: "scoop-neck-straight-leg",
      cardTitle: "Custom Scoop-Neck Straight-Leg Jumpsuit",
      cardSubline: "Scoop neck, fitted straight leg, full length",
      image: "",
      imageAlt: "Custom Scoop-Neck Straight-Leg Jumpsuit",
      href: "/capriowear/activewear/jumpsuits/scoop-neck-straight-leg",
      sku: "CAP-JMP-01",
      pdpHeading: "Custom Scoop-Neck Straight-Leg Jumpsuit Manufacturer",
      pdpDescription:
        "Fitted sleeveless jumpsuit with a scoop neck and a straight, full-length leg, custom and private label, in a soft 4-way stretch Nylon/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Scoop-Neck Straight-Leg Jumpsuit Manufacturer",
      pdpMetaDescription:
        "Custom scoop-neck straight-leg jumpsuit manufacturer, private label, fitted sleeveless unitard, soft Nylon/Spandex knit, MOQ from 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Scoop-Neck Straight-Leg Jumpsuit" },
        { alt: "Custom Scoop-Neck Straight-Leg Jumpsuit" },
        { alt: "Custom Scoop-Neck Straight-Leg Jumpsuit" },
        { alt: "Custom Scoop-Neck Straight-Leg Jumpsuit" },
        { alt: "Custom Scoop-Neck Straight-Leg Jumpsuit" },
        { alt: "Custom Scoop-Neck Straight-Leg Jumpsuit" },
      ],
      material: "Nylon/Spandex 4-way stretch knit, blend confirmed on your sample.",
      pdpFabricPills: ["Nylon/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What leg length does the scoop-neck straight-leg jumpsuit come in?",
          a: "The scoop-neck straight-leg jumpsuit is built full length as standard, or at 7/8 length ending just above the ankle, to your spec. The inseam is graded across the size run and confirmed on your sample.",
        },
        {
          q: "How does the scoop-neck straight-leg jumpsuit go on?",
          a: "The scoop-neck straight-leg jumpsuit is a step-in, pull-on build as standard. The 4-way stretch body lets it go on over the shoulders with no zip, keeping full stretch everywhere. A back or side zip can be added on request.",
        },
        {
          q: "What fabric do you build the scoop-neck straight-leg jumpsuit in?",
          a: "A soft 4-way stretch Nylon/Spandex knit with a smooth, second-skin hand, or Polyester/Spandex for a quick-drying training build. The exact blend and weight of the scoop-neck straight-leg jumpsuit are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Flared-Leg Jumpsuit", slug: "flared-leg", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Deep V-Neck Jumpsuit", slug: "deep-v-neck", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Molded-Cup V-Panel Jumpsuit", slug: "molded-cup-v-panel", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Corset-Detail Square-Neck Jumpsuit", slug: "corset-square-neck", href: "/capriowear/activewear/jumpsuits" },
        { label: "See All", href: "/capriowear/activewear/jumpsuits" },
      ],
      specifications: [
        { label: "Style", value: "Sleeveless fitted jumpsuit, scoop neck, straight leg" },
        { label: "Fabric", value: "Nylon/Spandex 4-way stretch knit, blend confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, second-skin through the torso and leg" },
        { label: "Leg", value: "Straight, full length or 7/8, to your spec" },
        { label: "Neckline and straps", value: "Scoop neck, wide tank straps" },
        { label: "Entry", value: "Step-in, pull-on (base), back or side zip on request" },
        { label: "Gusset", value: "Sewn gusset (base), snap-button gusset on request" },
        { label: "Support", value: "Plain, or built-in shelf bra with removable pads" },
        { label: "Construction", value: "Cut-and-sew, waist seam or one-piece torso panel, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Scoop-Neck Straight-Leg Jumpsuit" },
      pdpQualityHeading: "One piece, fitted from shoulder to ankle",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Torso and leg length graded and checked across every size",
        "Opacity confirmed under squat-depth stretch across the full leg",
        "Gusset seam stress-tested under stretch",
        "Straps and neckline hold their shape without rolling",
        "Ease of entry checked across the size run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "flared-leg",
      cardTitle: "Custom Flared-Leg Jumpsuit",
      cardSubline: "Halter deep V, leg flares to the hem",
      image: "",
      imageAlt: "Custom Flared-Leg Jumpsuit",
      href: "/capriowear/activewear/jumpsuits/flared-leg",
      sku: "CAP-JMP-02",
      pdpHeading: "Custom Flared-Leg Jumpsuit Manufacturer",
      pdpDescription:
        "Fitted sleeveless jumpsuit with a halter deep-V neck and a leg that flares to the hem, custom and private label, in a 215 GSM Polyester/Spandex knit with flatlock seams, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Flared-Leg Jumpsuit Manufacturer",
      pdpMetaDescription:
        "Custom flared-leg jumpsuit manufacturer, private label, halter deep-V neck, 215 GSM Polyester/Spandex knit, flatlock seams, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Flared-Leg Jumpsuit" },
        { alt: "Custom Flared-Leg Jumpsuit" },
        { alt: "Custom Flared-Leg Jumpsuit" },
        { alt: "Custom Flared-Leg Jumpsuit" },
        { alt: "Custom Flared-Leg Jumpsuit" },
        { alt: "Custom Flared-Leg Jumpsuit" },
      ],
      material: "Polyester/Spandex 4-way stretch knit, commonly around 78% / 22%, confirmed on your sample.",
      pdpFabricPills: ["Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "Where does the leg start to flare on the flared-leg jumpsuit?",
          a: "The flared-leg jumpsuit stays fitted through the hip and thigh and flares below the knee to a wider hem. The flare point and hem width are set to your spec and graded across the size run, confirmed on your sample.",
        },
        {
          q: "What fabric weight is the flared-leg jumpsuit built in?",
          a: "The flared-leg jumpsuit's standard build is a 215 GSM Polyester/Spandex 4-way stretch knit, commonly around 78% Polyester and 22% Spandex, heavy enough for opacity and light enough for a flare that moves. The final blend and weight are confirmed on your sample.",
        },
        {
          q: "Why use flatlock seams on the flared-leg jumpsuit?",
          a: "Flatlock seams lie flat against the skin, so the flared-leg jumpsuit stays smooth under movement, with no raised seam to rub at the inner leg or shoulder. We check the seam finish on your sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Scoop-Neck Straight-Leg Jumpsuit", slug: "scoop-neck-straight-leg", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Wide-Leg Drop-Crotch Jumpsuit", slug: "wide-leg-drop-crotch", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Deep V-Neck Jumpsuit", slug: "deep-v-neck", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Corset-Detail Square-Neck Jumpsuit", slug: "corset-square-neck", href: "/capriowear/activewear/jumpsuits" },
        { label: "See All", href: "/capriowear/activewear/jumpsuits" },
      ],
      specifications: [
        { label: "Style", value: "Sleeveless fitted jumpsuit, halter deep-V neck, flared leg" },
        { label: "Fabric", value: "Polyester/Spandex 4-way stretch knit, commonly around 78% / 22%, confirmed on your sample." },
        { label: "Weight", value: "215 GSM. Final weight confirmed on your sample." },
        { label: "Fit", value: "Fitted through the torso, hip and thigh" },
        { label: "Leg", value: "Flares below the knee to a wider hem, full length, flare point to your spec" },
        { label: "Neckline and straps", value: "Halter neck, deep V front" },
        { label: "Entry", value: "Step-in, pull-on (base), back or side zip on request" },
        { label: "Gusset", value: "Sewn gusset (base), snap-button gusset on request" },
        { label: "Support", value: "Plain, or built-in shelf bra with removable pads" },
        { label: "Construction", value: "Cut-and-sew, flatlock seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Flared-Leg Jumpsuit" },
      pdpQualityHeading: "Fitted up top, a flare that holds its line",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Flare width and hem length held consistent at every size",
        "Hem checked so the flare hangs even, without twisting",
        "Opacity confirmed under squat-depth stretch across the full leg",
        "Halter strap tested for hold under stretch",
        "Flatlock seams checked for a flat, chafe-free finish",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "deep-v-neck",
      cardTitle: "Custom Deep V-Neck Jumpsuit",
      cardSubline: "Deep V, low back, removable padding",
      image: "",
      imageAlt: "Custom Deep V-Neck Jumpsuit",
      href: "/capriowear/activewear/jumpsuits/deep-v-neck",
      sku: "CAP-JMP-03",
      pdpHeading: "Custom Deep V-Neck Jumpsuit Manufacturer",
      pdpDescription:
        "Fitted sleeveless jumpsuit with a deep V neckline, a low-cut back and removable padding, custom and private label, in a lightly brushed Polyester/Spandex knit with a full-length legging leg, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Deep V-Neck Jumpsuit Manufacturer",
      pdpMetaDescription:
        "Custom deep V-neck jumpsuit manufacturer, private label, low back, removable padding, brushed Polyester/Spandex knit, MOQ from 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Deep V-Neck Jumpsuit" },
        { alt: "Custom Deep V-Neck Jumpsuit" },
        { alt: "Custom Deep V-Neck Jumpsuit" },
        { alt: "Custom Deep V-Neck Jumpsuit" },
        { alt: "Custom Deep V-Neck Jumpsuit" },
        { alt: "Custom Deep V-Neck Jumpsuit" },
      ],
      material: "Lightly brushed Polyester/Spandex 4-way stretch knit, commonly around 68% / 32%, confirmed on your sample.",
      pdpFabricPills: ["Brushed Polyester/Spandex", "Nylon/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "Can the padding be removed from the deep V-neck jumpsuit?",
          a: "Yes. The deep V-neck jumpsuit has removable pads that sit in internal pockets, so they can come out for washing or for wearing without them. Pad shape and thickness are set to your spec and confirmed on your sample.",
        },
        {
          q: "How do you keep a deep V neckline secure on a jumpsuit?",
          a: "On the deep V-neck jumpsuit, adjustable straps and a graded torso length hold the neckline in place, and the low back balances the fit. We check coverage and hold under movement on your sample, and the V depth is set to your spec.",
        },
        {
          q: "What fabric do you build the deep V-neck jumpsuit in?",
          a: "A lightly brushed Polyester/Spandex 4-way stretch knit, commonly around 68% Polyester and 32% Spandex, for a soft hand and firm compression. The exact blend and weight of the deep V-neck jumpsuit are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Molded-Cup V-Panel Jumpsuit", slug: "molded-cup-v-panel", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Scoop-Neck Straight-Leg Jumpsuit", slug: "scoop-neck-straight-leg", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Flared-Leg Jumpsuit", slug: "flared-leg", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Corset-Detail Square-Neck Jumpsuit", slug: "corset-square-neck", href: "/capriowear/activewear/jumpsuits" },
        { label: "See All", href: "/capriowear/activewear/jumpsuits" },
      ],
      specifications: [
        { label: "Style", value: "Sleeveless fitted jumpsuit, deep V neck, low back" },
        { label: "Fabric", value: "Lightly brushed Polyester/Spandex 4-way stretch knit, commonly around 68% / 32%, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, compressive through the torso and leg" },
        { label: "Leg", value: "Straight legging leg, full length" },
        { label: "Neckline and straps", value: "Deep V front, low-cut back, adjustable straps" },
        { label: "Support", value: "Removable pads in internal pockets" },
        { label: "Entry", value: "Step-in, pull-on (base), back or side zip on request" },
        { label: "Gusset", value: "Sewn gusset (base), snap-button gusset on request" },
        { label: "Construction", value: "Cut-and-sew, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Deep V-Neck Jumpsuit" },
      pdpQualityHeading: "Support that stays in place, rep after rep",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Pad pockets hold the pads in place through wear and wash",
        "Deep V and low back checked for coverage and hold under movement",
        "Adjustable straps tested for slip and recovery",
        "Torso length graded across every size, so the neckline sits right",
        "Opacity confirmed under squat-depth stretch across the full leg",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "corset-square-neck",
      cardTitle: "Custom Corset-Detail Square-Neck Jumpsuit",
      cardSubline: "Square neck, boned corset waist",
      image: "",
      imageAlt: "Custom Corset-Detail Square-Neck Jumpsuit",
      href: "/capriowear/activewear/jumpsuits/corset-square-neck",
      sku: "CAP-JMP-04",
      pdpHeading: "Custom Corset-Detail Square-Neck Jumpsuit Manufacturer",
      pdpDescription:
        "Fitted sleeveless jumpsuit with a square neckline and a corset-style boned waist, custom and private label, in a matte Nylon/Spandex sculpting knit with a straight, full-length leg, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Corset-Detail Square-Neck Jumpsuit Manufacturer",
      pdpMetaDescription:
        "Custom corset-detail square-neck jumpsuit manufacturer, private label, boned waist, matte Nylon/Spandex sculpting knit, MOQ from 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Corset-Detail Square-Neck Jumpsuit" },
        { alt: "Custom Corset-Detail Square-Neck Jumpsuit" },
        { alt: "Custom Corset-Detail Square-Neck Jumpsuit" },
        { alt: "Custom Corset-Detail Square-Neck Jumpsuit" },
        { alt: "Custom Corset-Detail Square-Neck Jumpsuit" },
        { alt: "Custom Corset-Detail Square-Neck Jumpsuit" },
      ],
      material: "Matte Nylon/Spandex sculpting knit, blend confirmed on your sample.",
      pdpFabricPills: ["Matte Nylon/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "What does the corset detail do on the corset-detail square-neck jumpsuit?",
          a: "The corset-detail square-neck jumpsuit has flexible boning in stitched channels at the waist, which gives the waist a sculpted, structured line while the rest of the jumpsuit keeps full 4-way stretch. Boning placement and count are set to your spec and confirmed on your sample.",
        },
        {
          q: "Does the boning stay in place through washing on a corset-detail jumpsuit?",
          a: "Yes. On the corset-detail square-neck jumpsuit, each bone sits in its own stitched channel with finished ends, so it stays flat and does not work through the fabric. We check the boning after wash on your sample before bulk.",
        },
        {
          q: "What fabric do you build the corset-detail square-neck jumpsuit in?",
          a: "A matte Nylon/Spandex sculpting knit with a smooth, low-shine finish and firm compression, or Polyester/Spandex for a training build. The exact blend and weight of the corset-detail square-neck jumpsuit are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Scoop-Neck Straight-Leg Jumpsuit", slug: "scoop-neck-straight-leg", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Molded-Cup V-Panel Jumpsuit", slug: "molded-cup-v-panel", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Deep V-Neck Jumpsuit", slug: "deep-v-neck", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Wide-Leg Drop-Crotch Jumpsuit", slug: "wide-leg-drop-crotch", href: "/capriowear/activewear/jumpsuits" },
        { label: "See All", href: "/capriowear/activewear/jumpsuits" },
      ],
      specifications: [
        { label: "Style", value: "Sleeveless fitted jumpsuit, square neck, corset-detail waist" },
        { label: "Fabric", value: "Matte Nylon/Spandex sculpting knit, blend confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted and sculpting through the torso and leg" },
        { label: "Waist", value: "Flexible boning in stitched channels at the waist, corset seaming to your spec" },
        { label: "Leg", value: "Straight, full length" },
        { label: "Neckline and straps", value: "Square neck, wide straps" },
        { label: "Entry", value: "Step-in, pull-on (base), back or side zip on request" },
        { label: "Gusset", value: "Sewn gusset (base), snap-button gusset on request" },
        { label: "Support", value: "Plain, or built-in shelf bra with removable pads" },
        { label: "Construction", value: "Cut-and-sew, boning channels stitched into the waist panels, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Corset-Detail Square-Neck Jumpsuit" },
      pdpQualityHeading: "Structure at the waist, stretch everywhere else",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Boning channels hold their shape and stay flat through wear and wash",
        "Boning ends finished so nothing presses through the fabric",
        "Square neckline holds its line without gaping",
        "Torso length graded across every size, so the corset waist sits at the natural waist",
        "Opacity confirmed under squat-depth stretch across the full leg",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "wide-leg-drop-crotch",
      cardTitle: "Custom Wide-Leg Drop-Crotch Jumpsuit",
      cardSubline: "Relaxed drape, wide leg, drop crotch",
      image: "",
      imageAlt: "Custom Wide-Leg Drop-Crotch Jumpsuit",
      href: "/capriowear/activewear/jumpsuits/wide-leg-drop-crotch",
      sku: "CAP-JMP-05",
      pdpHeading: "Custom Wide-Leg Drop-Crotch Jumpsuit Manufacturer",
      pdpDescription:
        "Relaxed sleeveless jumpsuit with a scoop neck, a dropped crotch and a wide, full-length leg, custom and private label, in a soft Modal/Nylon/Spandex jersey that drapes rather than compresses, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Wide-Leg Drop-Crotch Jumpsuit Manufacturer",
      pdpMetaDescription:
        "Custom wide-leg drop-crotch jumpsuit manufacturer, private label, relaxed fit, soft Modal/Nylon/Spandex jersey, scoop neck, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Wide-Leg Drop-Crotch Jumpsuit" },
        { alt: "Custom Wide-Leg Drop-Crotch Jumpsuit" },
        { alt: "Custom Wide-Leg Drop-Crotch Jumpsuit" },
        { alt: "Custom Wide-Leg Drop-Crotch Jumpsuit" },
        { alt: "Custom Wide-Leg Drop-Crotch Jumpsuit" },
        { alt: "Custom Wide-Leg Drop-Crotch Jumpsuit" },
      ],
      material: "Modal/Nylon/Spandex single jersey, commonly around 71% / 18% / 11%, confirmed on your sample.",
      pdpFabricPills: ["Modal/Nylon/Spandex Jersey", "Polyester/Spandex Jersey", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "How does the wide-leg drop-crotch jumpsuit differ from a fitted jumpsuit?",
          a: "The wide-leg drop-crotch jumpsuit is cut relaxed, with a lowered crotch and a wide leg that drape away from the body, while a fitted jumpsuit compresses from shoulder to ankle. The relaxed style suits studio, travel, and rest-day wear rather than high-compression training.",
        },
        {
          q: "How low is the crotch on the wide-leg drop-crotch jumpsuit?",
          a: "The wide-leg drop-crotch jumpsuit sits the crotch lower than a fitted style for a loose, easy drape. Crotch depth and leg width are set to your spec and graded across the size run, confirmed on your sample.",
        },
        {
          q: "What fabric do you build the wide-leg drop-crotch jumpsuit in?",
          a: "A soft Modal/Nylon/Spandex single jersey, commonly around 71% Modal, 18% Nylon and 11% Spandex, which drapes and breathes rather than compresses. The exact blend and weight of the wide-leg drop-crotch jumpsuit are confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Flared-Leg Jumpsuit", slug: "flared-leg", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Scoop-Neck Straight-Leg Jumpsuit", slug: "scoop-neck-straight-leg", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Corset-Detail Square-Neck Jumpsuit", slug: "corset-square-neck", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Molded-Cup V-Panel Jumpsuit", slug: "molded-cup-v-panel", href: "/capriowear/activewear/jumpsuits" },
        { label: "See All", href: "/capriowear/activewear/jumpsuits" },
      ],
      specifications: [
        { label: "Style", value: "Relaxed sleeveless jumpsuit, scoop neck, wide leg" },
        { label: "Fabric", value: "Modal/Nylon/Spandex single jersey, commonly around 71% / 18% / 11%, confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Relaxed, drapes away from the body" },
        { label: "Crotch", value: "Dropped crotch for a loose, easy drape" },
        { label: "Leg", value: "Wide, full length" },
        { label: "Neckline and straps", value: "Scoop neck, wide straps" },
        { label: "Entry", value: "Step-in, pull-on (base), back or side zip on request" },
        { label: "Gusset", value: "Sewn gusset (base), snap-button gusset on request" },
        { label: "Support", value: "Plain, or built-in shelf bra with removable pads" },
        { label: "Construction", value: "Cut-and-sew, overlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Wide-Leg Drop-Crotch Jumpsuit" },
      pdpQualityHeading: "A relaxed drape that keeps its shape",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Leg width and drape held consistent at every size",
        "Crotch depth graded across the size run",
        "Jersey checked for pilling and shrinkage after wash, shrinkage targeted under 5%",
        "Straps and neckline hold their shape without stretching out",
        "Seams stress-tested at the crotch and underarm",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "molded-cup-v-panel",
      cardTitle: "Custom Molded-Cup V-Panel Jumpsuit",
      cardSubline: "Molded cups, double-layer V-panel front",
      image: "",
      imageAlt: "Custom Molded-Cup V-Panel Jumpsuit",
      href: "/capriowear/activewear/jumpsuits/molded-cup-v-panel",
      sku: "CAP-JMP-06",
      pdpHeading: "Custom Molded-Cup V-Panel Jumpsuit Manufacturer",
      pdpDescription:
        "Fitted sleeveless jumpsuit with built-in molded cups and a double-layer V-panel front, custom and private label, in a 4-way stretch Nylon/Spandex knit with a straight, full-length leg, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Molded-Cup V-Panel Jumpsuit Manufacturer",
      pdpMetaDescription:
        "Custom molded-cup V-panel jumpsuit manufacturer, private label, built-in molded cups, double-layer V-panel, Nylon/Spandex knit, MOQ 50, DDP to 20+ countries.",
      images: [
        { alt: "Custom Molded-Cup V-Panel Jumpsuit" },
        { alt: "Custom Molded-Cup V-Panel Jumpsuit" },
        { alt: "Custom Molded-Cup V-Panel Jumpsuit" },
        { alt: "Custom Molded-Cup V-Panel Jumpsuit" },
        { alt: "Custom Molded-Cup V-Panel Jumpsuit" },
        { alt: "Custom Molded-Cup V-Panel Jumpsuit" },
      ],
      material: "Nylon/Spandex 4-way stretch knit, blend confirmed on your sample.",
      pdpFabricPills: ["Nylon/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"],
      faqs: [
        {
          q: "Does the molded-cup V-panel jumpsuit need a separate bra?",
          a: "No. The molded-cup V-panel jumpsuit has molded cups with foam inserts built between the fabric layers, so it gives support on its own. Cup shape, size, and support level are set to your spec and confirmed on your sample.",
        },
        {
          q: "What does the double-layer V-panel do on the molded-cup V-panel jumpsuit?",
          a: "The double-layer V-panel on the front of the molded-cup V-panel jumpsuit adds shaping and extra coverage through the torso and frames the built-in cups. The panel shape and depth are set to your spec.",
        },
        {
          q: "How do you size molded cups across a full size run?",
          a: "On the molded-cup V-panel jumpsuit, cup size and placement are graded with torso length across the full size run, not just scaled from the sample, so the support sits in the right place at every size. We confirm the cup fit on your sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Deep V-Neck Jumpsuit", slug: "deep-v-neck", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Scoop-Neck Straight-Leg Jumpsuit", slug: "scoop-neck-straight-leg", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Corset-Detail Square-Neck Jumpsuit", slug: "corset-square-neck", href: "/capriowear/activewear/jumpsuits" },
        { label: "Custom Wide-Leg Drop-Crotch Jumpsuit", slug: "wide-leg-drop-crotch", href: "/capriowear/activewear/jumpsuits" },
        { label: "See All", href: "/capriowear/activewear/jumpsuits" },
      ],
      specifications: [
        { label: "Style", value: "Sleeveless fitted jumpsuit, scoop neck, molded-cup support" },
        { label: "Fabric", value: "Nylon/Spandex 4-way stretch knit, blend confirmed on your sample." },
        { label: "Weight", value: "Pending, confirmed on your sample." },
        { label: "Fit", value: "Fitted, second-skin through the torso and leg" },
        { label: "Support", value: "Built-in molded cups with foam inserts, no separate bra needed" },
        { label: "Front panel", value: "Double-layer V-panel for shaping and coverage" },
        { label: "Leg", value: "Straight, full length" },
        { label: "Neckline and straps", value: "Scoop neck, tank straps" },
        { label: "Entry", value: "Step-in, pull-on (base), back or side zip on request" },
        { label: "Gusset", value: "Sewn gusset (base), snap-button gusset on request" },
        { label: "Construction", value: "Cut-and-sew, cups set between fabric layers, flatlock or coverstitch seams" },
        { label: "Branding", value: "Sublimation, screen, DTF, silicone, heat transfer, embroidery, labels and packaging" },
      ],
      specificationsImage: { alt: "Custom Molded-Cup V-Panel Jumpsuit" },
      pdpQualityHeading: "Built-in support that holds its shape",
      pdpQualitySubline: "We confirm it all on your sample before a single bulk piece is cut.",
      pdpQualityPoints: [
        "Molded cups hold their shape through wear and wash, with no folding or shifting",
        "Cup placement graded across every size, so support sits right at each torso length",
        "Double-layer front panel lies flat with no bubbling",
        "Opacity confirmed under squat-depth stretch across the full leg",
        "Ease of entry checked across the size run",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, same L1 group first
  // (One-Pieces, per activewearMegaMenu), then the closest pairings from other groups.
  relatedLinks: [
    { label: "Bodysuits", href: "/capriowear/activewear/bodysuits" },
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
    { label: "Leggings", href: "/capriowear/activewear/leggings" },
    { label: "Shorts", href: "/capriowear/activewear/shorts" },
    { label: "Compression & Base Layers", href: "/capriowear/activewear/compression-base-layers" },
  ],
};
