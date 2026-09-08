// content/teamwear/cricket.ts
// First Teamwear category, on the exact same `Category` shape every
// Activewear category already uses (content/activewear/types.ts) -- a pure
// content/data drop, same pattern this project already follows: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts. `group: "Teamwear"` is the
// only thing that marks this as a Teamwear category rather than an
// Activewear one -- the shared route templates and every component they
// render are identical either way.
//
// Uses the new `structuredBlock` (type "decoration") field instead of
// `weightTiers`/`weightTiersHeaders` -- Cricket's own reusable block under
// the fabric table is a decoration/print-method breakdown, not a GSM or
// mmHg weight tier table. See StructuredBlock's own comment
// (content/activewear/types.ts).
//
// Two published PDPs (Colored Match Jersey Short Sleeve, Whites Shirt), the
// remaining 8 styles "draft" -- same Leggings-pilot pattern every category
// since has followed: a draft card shows on the grid, non-clickable, no PDP
// route generated, excluded from the sitemap and this category's own
// CollectionPage/ItemList schema.
//
// No cricket GSM number is ever stated (owner spec) -- every fabric-weight
// reference here is deliberately worded as "tuned to your format/climate
// and confirmed on your sample," never a made-up figure.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows.
import type { Category } from "../activewear/types";

export const cricket: Category = {
  slug: "cricket",
  group: "Teamwear",
  menuLabel: "Cricket",
  manufacturerNoun: "Cricket Uniform",
  productNounPlural: "cricket uniforms and kits",
  // "Trousers", not "sleeveless sweaters" (owner spec, 2026-09-05,
  // cut-and-sew scope filter): a knitted sweater/slipover is a typically-
  // sourced item, not something this entity sentence should claim as
  // manufactured. "Training tees" added (owner spec, 2026-09-06, PLP
  // content trim) to match the trimmed entity-FAQ answer's own given copy.
  entityExampleStyles: "colored match jerseys, traditional whites, trousers, and training tees",
  entityFabrics: "polyester interlock, pique, and micro-mesh knits",
  h1: "Custom Cricket Uniform Manufacturer",
  metaTitle: "Custom Cricket Uniform Manufacturer",
  metaDescription:
    "Custom cricket uniform and kit manufacturer, Pakistan. Sublimated colored match kit and traditional whites, low MOQ, for clubs and academies.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  // Trimmed to 4 rows (owner spec, 2026-09-06, "leaner for mobile and a
  // buyer skim") -- was 6. PDP-level fabric detail (specifications, chips)
  // is unchanged; only this PLP-level table is shorter.
  fabricOptions: [
    {
      fabric: "Polyester interlock or pique",
      bestFor: "Match jerseys, whites, trousers",
      performance: "Smooth, even print, durable",
    },
    {
      fabric: "Micro-mesh or bird's-eye",
      bestFor: "Ventilation and training",
      performance: "Breathable, prints cleanly",
    },
    {
      fabric: "Ultra-light mesh",
      bestFor: "Hot-weather match kit",
      performance: "Lightest hand, highest airflow",
    },
    {
      fabric: "Poly-spandex",
      bestFor: "Collars and fitted trims",
      performance: "Stretch, holds a flat collar",
    },
  ],
  // Split into a segment run (owner spec, 2026-09-06: highlight one small,
  // important phrase, semibold, not the whole note) -- was one plain
  // segment.
  fabricNote: [
    { text: "Polyester-based for full-color sublimation. Weight tuned to your format and climate and " },
    { text: "confirmed on your sample", bold: true },
    { text: ". Recycled polyester available. Swatches before every bulk run." },
  ],
  fabricPills: ["Polyester interlock", "Pique", "Micro-mesh", "Ultra-light mesh", "Poly-spandex panels", "Recycled polyester"],
  // Decoration structured block (owner spec, 2026-09-05) -- see
  // StructuredBlock's own comment. Replaces the weightTiers table this
  // reusable block otherwise renders for a GSM/mmHg-driven category.
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    // Trimmed to 4 rows (owner spec, 2026-09-06) -- was 5.
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Graphics, names, numbers, sponsor logos",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn numbers and lettering",
        notes: "Raised, classic look, a premium option",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and name or number bars",
        notes: "Raised, full-color",
      },
      {
        method: "Embroidery",
        bestFor: "Crests, badges, sponsor marks",
        notes: "Raised, premium texture",
      },
    ],
    // Segment array, not a plain string (owner spec, 2026-09-06: highlight
    // one small, important phrase, semibold, not the whole sentence).
    note: [
      { text: "Methods combine on one kit: a sublimated body with an embroidered crest and sublimated names and numbers is " },
      { text: "a common premium build", bold: true },
      { text: "." },
    ],
  },
  qualityHeading: "The color you approve, on every kit",
  qualitySubline:
    "We confirm the color, the print, and the fit on your digital proof and your sample before the full roster is produced.",
  // Trimmed to 4 bullets (owner spec, 2026-09-06) -- was 5.
  qualityPoints: [
    "Digital proof and Pantone match approved before we cut",
    "Names and numbers sublimated into the fiber, they will not crack, peel or fade",
    "The full roster produced in one run, same fabric roll and print batch, so every kit matches",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  // Trimmed to 4 bullets (owner spec, 2026-09-06) -- was 6.
  coverageItems: [
    {
      title: "Fabric",
      body: "Polyester interlock, pique and micro-mesh, poly-spandex collars",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, names and numbers in the print, Pantone color matching, home and away kits",
    },
    {
      title: "Decoration",
      body: "Tackle twill, sublimation twill patches, embroidered crests",
    },
    {
      title: "Finishing",
      body: "Your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Trimmed to 7 questions (owner spec, 2026-09-06, "leaner for mobile and
  // a buyer skim") -- was 15. Plus the auto-built entity question
  // (categoryEntityFaq(), from entityExampleStyles above), 8 total, matching
  // the owner's own numbered list exactly.
  faqs: [
    {
      q: "What is your MOQ for custom cricket kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between cricket whites and colored match kit?",
      a: "Both, on the same sublimation-capable polyester platform. Whites use white or near-white bodies with contrast trim; colored kit uses the full sublimation color range for T20 and ODI-format designs.",
    },
    {
      q: "How are names and numbers applied?",
      a: "They are built into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Tackle twill and sublimation twill are available for a raised look.",
    },
    {
      q: "Which fabrics do you use, and how is weight decided?",
      a: "Polyester interlock and pique for the body, micro-mesh for ventilation, ultra-light mesh for hot-weather kit, poly-spandex for collars, with a recycled option. Weight is tuned to your format and climate and confirmed on the sample.",
    },
    {
      q: "Can a club or academy order both whites and colored kit together?",
      a: "Yes. Send Pantone, CMYK, RGB or hex values and we match production dye to them, and whites and colored kit are planned into one order so a club or academy gets both in the same run.",
    },
    {
      q: "Does the whites shirt have a polo collar and button placket?",
      a: "Yes. The whites shirt is built with a traditional polo collar and button placket, plus contrast trim and an embroidered crest, the classic cricket whites build.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch or a reference kit by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  ctaReferenceNoun: "kit",
  styleCards: [
    {
      // Draft (owner spec, 2026-09-05): "none of the cricket products are
      // team-confirmed yet, so nothing publishes until we confirm each
      // one" -- the full worked PDP content below stays exactly as built
      // (do not delete), only this flag flips back to "published" once the
      // team confirms this style and it's sampled.
      status: "draft",
      slug: "colored-match-jersey-short-sleeve",
      cardTitle: "Custom Colored Match Jersey, Short Sleeve",
      cardSubline: "Full-dye sublimated, names and numbers in the print",
      image: "",
      imageAlt: "Custom colored cricket match jersey, short sleeve, full-dye sublimated",
      href: "/teamwear/cricket/colored-match-jersey-short-sleeve",
      pdpTitle: "Colored Match Jersey",
      sku: "CAP-CRK-01",
      pdpHeading: "Custom Cricket Match Jersey Manufacturer",
      pdpDescription:
        "Colored cricket match jersey, custom and private label, full-dye sublimated with names, numbers and sponsor logos built into the print, in a polyester interlock or micro-mesh knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Colored cricket match jersey, front view" },
        { alt: "Colored cricket match jersey, back view with name and number" },
        { alt: "Colored cricket match jersey, side profile" },
        { alt: "Colored cricket match jersey, collar detail" },
        { alt: "Colored cricket match jersey, sponsor logo placement" },
        { alt: "Colored cricket match jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Cricket Jersey Manufacturer",
      pdpMetaDescription:
        "Custom colored cricket jersey manufacturer, full-dye sublimated, names and numbers in the print, Pantone color match, low MOQ. DDP worldwide.",
      material: "Polyester interlock or pique, micro-mesh or ultra-light mesh ventilation",
      faqs: [
        {
          q: "How are the names and numbers applied to a sublimated jersey?",
          a: "They are composited into the same print file as the rest of the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Tackle twill or sublimation twill is available where you want a raised, sewn look.",
        },
        {
          q: "Can you produce a home and an away kit together?",
          a: "Yes. Both colorways are planned into one order and share the same print files, sizing and roster, so they match as a set.",
        },
        {
          q: "Can you match our exact team and sponsor colors?",
          a: "Yes. Send Pantone, CMYK, RGB or hex values with your artwork and we match production dye to them, confirmed on your digital proof and sample before bulk.",
        },
      ],
      relatedStyleTags: [
        { label: "Colored Match Jersey Long Sleeve", href: "/teamwear/cricket" },
        { label: "Colored Trousers", href: "/teamwear/cricket" },
        { label: "Whites Shirt", href: "/teamwear/cricket/whites-shirt" },
        { label: "Training Tee", href: "/teamwear/cricket" },
        { label: "See All", href: "/teamwear/cricket" },
      ],
      specifications: [
        { label: "Style", value: "Colored cricket match jersey, short sleeve (base type)" },
        {
          label: "Fabric",
          value: "Polyester interlock or pique body, micro-mesh or ultra-light mesh ventilation, poly-spandex collar and cuffs",
        },
        {
          label: "Weight",
          value:
            "Tuned to your format and climate, confirmed on your sample; lighter mesh for hot-weather match kit, heavier interlock for structure",
        },
        { label: "Collar", value: "Crew or polo, your choice; flat, non-curling finish" },
        { label: "Sleeve", value: "Short sleeve; long sleeve available in the same construction" },
        {
          label: "Decoration",
          value: "Full-dye sublimation, names, numbers and sponsor logos in the print; tackle twill or sublimation twill optional",
        },
        { label: "Color", value: "Full sublimation color range, Pantone matched, home and away colorways" },
        { label: "Fit", value: "Team cut or fitted, graded XS to 5XL, men's, women's and unisex blocks" },
        { label: "Construction", value: "Flatlock and overlock seams, side and underarm mesh panels optional" },
        { label: "Branding", value: "Club crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Colored cricket match jersey, construction detail" },
    },
    {
      // Draft (owner spec, 2026-09-05) -- see the identical comment on the
      // Colored Match Jersey card above.
      status: "draft",
      slug: "whites-shirt",
      cardTitle: "Custom Cricket Whites Shirt",
      cardSubline: "Polo collar, contrast trim, short or long sleeve",
      image: "",
      imageAlt: "Custom cricket whites shirt, polo collar, contrast trim",
      href: "/teamwear/cricket/whites-shirt",
      pdpTitle: "Whites Shirt",
      sku: "CAP-CRK-02",
      pdpHeading: "Custom Cricket Whites Shirt Manufacturer",
      pdpDescription:
        "Traditional cricket whites shirt, custom and private label, polo collar with a buttoned placket and contrast trim, in a breathable polyester interlock or pique knit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Cricket whites shirt, front view" },
        { alt: "Cricket whites shirt, back view" },
        { alt: "Cricket whites shirt, collar and placket detail" },
        { alt: "Cricket whites shirt, contrast trim detail" },
        { alt: "Cricket whites shirt, embroidered crest detail" },
        { alt: "Cricket whites shirt, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Cricket Whites Manufacturer",
      pdpMetaDescription:
        "Custom cricket whites manufacturer, private label. Match and club whites in polyester interlock, polo collar, contrast trim, embroidered crest, low MOQ.",
      material: "Polyester interlock or pique, micro-mesh ventilation panels optional",
      faqs: [
        {
          q: "What collar options are there on cricket whites?",
          a: "A polo collar with a two or three button placket is the traditional standard, and we also build a crew-neck version. The collar is finished flat so it will not curl.",
        },
        {
          q: "Can we add contrast trim and a club crest to whites?",
          a: "Yes. Contrast collar, placket and tipping in your team color, with an embroidered or sublimated crest and sponsor marks, all matched to your reference.",
        },
        {
          q: "Do you make matching whites trousers?",
          a: "Yes, as part of the same kit, produced together so the whites match across pieces.",
        },
      ],
      relatedStyleTags: [
        { label: "Whites Trousers", href: "/teamwear/cricket" },
        { label: "Colored Match Jersey", href: "/teamwear/cricket/colored-match-jersey-short-sleeve" },
        { label: "Training Tee", href: "/teamwear/cricket" },
        { label: "See All", href: "/teamwear/cricket" },
      ],
      specifications: [
        { label: "Style", value: "Traditional cricket whites shirt (base type)" },
        { label: "Fabric", value: "Polyester interlock or pique body, micro-mesh ventilation panels optional" },
        { label: "Weight", value: "Tuned to climate, confirmed on your sample; breathable for match-day heat" },
        { label: "Collar", value: "Polo collar with a two or three button placket; crew-neck alternative" },
        { label: "Sleeve", value: "Short sleeve or long sleeve, same construction" },
        { label: "Color", value: "White or near-white body, contrast collar, placket and trim in your team color, Pantone matched" },
        { label: "Decoration", value: "Embroidered or sublimated crest and sponsor marks; contrast tipping and piping" },
        { label: "Fit", value: "Team cut or fitted, graded XS to 5XL, men's, women's and unisex blocks" },
        { label: "Construction", value: "Flatlock and overlock seams, side vents optional, flat non-curling collar" },
        { label: "Branding", value: "Club crest, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Cricket whites shirt, construction detail" },
    },
    {
      status: "draft",
      slug: "colored-match-jersey-long-sleeve",
      cardTitle: "Custom Colored Match Jersey, Long Sleeve",
      cardSubline: "Long-sleeve sublimated match shirt",
      image: "",
      imageAlt: "Custom colored cricket match jersey, long sleeve, sublimated",
      href: "/teamwear/cricket/colored-match-jersey-long-sleeve",
    },
    {
      status: "draft",
      slug: "colored-trousers",
      cardTitle: "Custom Colored Cricket Trousers",
      cardSubline: "Sublimated or solid, elastic drawcord waist",
      image: "",
      imageAlt: "Custom colored cricket trousers, sublimated or solid",
      href: "/teamwear/cricket/colored-trousers",
    },
    {
      status: "draft",
      slug: "whites-trousers",
      cardTitle: "Custom Cricket Whites Trousers",
      cardSubline: "Traditional whites, elastic drawcord waist",
      image: "",
      imageAlt: "Custom cricket whites trousers, elastic drawcord waist",
      href: "/teamwear/cricket/whites-trousers",
    },
    {
      status: "draft",
      slug: "training-tee",
      cardTitle: "Custom Cricket Training Tee",
      cardSubline: "Lightweight practice shirt",
      image: "",
      imageAlt: "Custom cricket training tee, lightweight practice shirt",
      href: "/teamwear/cricket/training-tee",
    },
    // Removed (owner spec, 2026-09-05, "cut-and-sew scope filter", a new
    // standing rule for the whole Teamwear group): Cricket Cap, Wide-Brim
    // Sun Hat (headwear -- a different, typically-sourced manufacturing
    // process, not cut-and-sew), Sleeveless Cricket Sweater, Long-Sleeve
    // Cricket Sweater (a true cable-knit sweater/slipover is a knitted
    // garment, also typically sourced, not cut-and-sew). Pulled entirely,
    // not left as draft cards -- no slug, no route, no sitemap/ItemList
    // entry. A cut-and-sew fleece or interlock vest version may come back
    // later as a new style entry under a different name, per the owner.
  ],
  // Cricket is the first Teamwear page at launch -- no sibling sport PLPs
  // exist yet, so linking only to LIVE Activewear pages (owner spec: "do
  // NOT link to Soccer, Rugby, Volleyball, Polo Shirts or Training Tees,
  // they do not exist yet and would 404"). Swap these for sibling sport
  // PLPs as more Teamwear categories publish.
  relatedLinks: [
    { label: "Tracksuits", href: "/activewear/tracksuits" },
    { label: "Track Jackets & Zip-Ups", href: "/activewear/track-jackets" },
    { label: "T-Shirts", href: "/activewear/t-shirts" },
  ],
};
