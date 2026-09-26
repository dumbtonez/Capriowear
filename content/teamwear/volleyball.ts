// content/teamwear/volleyball.ts
// Teamwear category, same `Category` shape as Cricket, Basketball and
// Rugby (content/teamwear/*.ts) and every Activewear category
// (content/activewear/types.ts) -- a pure content/data drop: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts.
//
// Batch 1 (owner spec, 2026-09-26): PLP fixes (meta, 7 cards in SKU order,
// fabric table and note, customization Fabric item, trust bullet 3, 8 FAQs)
// and draft PDPs for CAP-VOL-01 to 03. The two legacy drafts at
// indoor-jersey and fitted-shorts are replaced in full by SKUs 01 and 02
// (same slugs). Batches 2 and 3 (owner spec, 2026-09-26) add PDP content
// for CAP-VOL-04 to 07 the same way, so all 7 cards link and every style
// pill resolves to a real PDP.
//
// Every style is "draft": noindexed, out of the sitemap and the
// CollectionPage/ItemList, BreadcrumbList only. Under the Teamwear draft-PDP
// rule, drafts with PDP content render and their cards link. No gender toggle: the Teamwear PLP
// template never renders it.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape Cricket
// introduced -- no component or type change needed for this category.
//
// No fabric-weight, ounce or inseam figure is ever stated (owner spec) --
// every weight reference is worded as "tuned to your program/confirmed on
// your sample", and competition rules are referenced, never quoted.
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/volleyball";

const QUALITY_HEADING = "Court-legal, matched across the roster";
const NAMES_NUMBERS_POINT = "Names and numbers dyed into the fiber, so they will not crack or peel";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";

const PENDING_WEIGHT = "Pending, confirmed on your sample.";
const SEAMS_LABEL = "Flatlock seams, tagless printed care label";

type Step = [title: string, body: string];
const PACKAGING_STEP: Step = ["Packaging", "Polybags, boxes, retail-ready to your spec"];

// Per-style "How we customize" carousel. Images are the shared factory
// test shots (same stand-ins every PDP carousel uses), cycled in order.
function customizeSteps(steps: Step[]) {
  return {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    steps: steps.map(([title, body], i) => ({
      title,
      body,
      image: { src: `/factory-test/inside-factory-${(i % 5) + 1}.jpg`, alt: title },
    })),
  };
}

// Alt-only gallery (no photography yet): 6 frames, alt = the card name.
function gallery(alt: string) {
  return Array.from({ length: 6 }, () => ({ alt }));
}

export const volleyball: Category = {
  slug: "volleyball",
  group: "Teamwear",
  menuLabel: "Volleyball",
  // Entity FAQ (PLP FAQ 1 and FAQ 1 on every PDP) is built by
  // categoryEntityFaq() from these four fields.
  manufacturerNoun: "Volleyball Uniform",
  productNounPlural: "volleyball uniforms and kits",
  entityExampleStyles: "indoor and libero jerseys, fitted shorts, beach uniforms and warm-ups",
  entityFabrics: "polyester mesh and Polyester/Spandex knits",
  h1: "Custom Volleyball Uniform Manufacturer",
  metaTitle: "Custom Volleyball Uniform Manufacturer",
  metaDescription:
    "Custom volleyball uniform manufacturer: indoor and libero jerseys, fitted women's and men's shorts, beach uniforms, MOQ 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Teamwear has no gender split (owner spec, 2026-09-25).
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Polyester mesh or microfiber",
      bestFor: "Indoor and libero jerseys",
      performance: "Lightweight, breathable, prints cleanly",
    },
    {
      fabric: "Polyester/Spandex",
      bestFor: "Women's fitted shorts",
      performance: "Four-way stretch, close fit",
    },
    {
      fabric: "Cationic-dyeable polyester",
      bestFor: "Deep or saturated piece-dyed base colors",
      performance: "Takes richer color in piece-dyed fabric",
    },
    {
      fabric: "Recycled polyester",
      bestFor: "Sustainability-positioned programs",
      performance: "Print result confirmed on your sample",
    },
  ],
  fabricNote: [
    {
      text: "Polyester-based for full-color sublimation. Jersey and short weights are tuned to your program and confirmed on your sample. Cationic-dyeable polyester is offered for deep or saturated piece-dyed base colors; sublimated prints are color-matched and confirmed on your sample. Swatches before every bulk run.",
    },
  ],
  fabricPills: ["Polyester mesh", "Microfiber", "Polyester/Spandex", "Cationic-dyeable polyester", "Recycled option"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Jersey and short graphics, names, numbers, logos",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and name or number bars",
        notes: "Raised, full-color",
      },
      {
        method: "Tackle twill",
        bestFor: "Traditional sewn numbers on jerseys",
        notes: "Raised, classic look",
      },
      {
        method: "Embroidery",
        bestFor: "Crests, badges, sponsor marks",
        notes: "Raised, premium texture",
      },
    ],
    note: [
      { text: "Numbers stay " },
      { text: "a solid contrasting color", bold: true },
      { text: " for legibility, even over a busy sublimated design." },
    ],
  },
  qualityHeading: QUALITY_HEADING,
  qualitySubline:
    "We confirm the libero contrast, the numbering, the color and the fit on your proof and sample before the full roster is produced.",
  qualityPoints: [
    "Libero jersey checked for legal contrast and confirmed before we cut",
    "Numbering size and placement set to your governing body's rules",
    "Names and numbers sublimated into the fiber, so they will not crack or peel",
    AQL_POINT,
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Lightweight polyester jersey knits, fitted Polyester/Spandex shorts, cationic-dyeable polyester for piece-dyed deep colors",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, names and numbers in the print, Pantone color matching, home and away kits",
    },
    {
      title: "Decoration",
      body: "Sublimation, embroidered crests, sublimated numbers kept legible on busy designs",
    },
    {
      title: "Finishing",
      body: "Your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // 8 FAQs (owner spec, 2026-09-26): the entity question is prepended at
  // render time by categoryEntityFaq(), then these 7.
  faqs: [
    {
      q: "What is your MOQ for custom volleyball kit?",
      a: "From 50 pieces per style, and you can mix sizes, names and numbers freely within a colorway. Scales to full bulk.",
    },
    {
      q: "How is the libero jersey made, and what colors count as contrasting?",
      a: "The libero jersey is the same jersey in a required contrasting color, produced in the same roster order and run, not a separate build. It must clearly contrast with the team's predominant color, and two darks or two lights can read as too similar, so we help you choose a compliant pairing and confirm it against your governing body's rules before bulk.",
    },
    {
      q: "How are names and numbers applied?",
      a: "Names and numbers are built into the same print file as the design and dyed into the fabric in one pass, so there is no added cost or weight and nothing to peel. Numbers stay a solid contrasting color so they read clearly even over a busy design.",
    },
    {
      q: "Can indoor and beach volleyball uniforms come from the same order?",
      a: "Yes. Indoor jerseys, libero jerseys and beach volleyball uniforms are built on the same cut-and-sew platform, so they can be planned into one program and ship together.",
    },
    {
      q: "What numbering and uniform rules apply?",
      a: "Numbering and uniform rules vary by governing body, including number size and placement, libero contrast and jersey length. Tell us your competition and we build to its current rules, confirmed on your proof.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // 7 drafts, SKU order (CAP-VOL-01 to 07). Card title = H1 minus
  // " Manufacturer" = title-tag name = breadcrumb = alt = every pill label
  // that targets it. Pills carry a `slug`, so a pill for a card-only SKU
  // falls back to the PLP and switches to its PDP by itself.
  styleCards: [
    {
      status: "draft",
      slug: "indoor-jersey",
      cardTitle: "Custom Volleyball Jersey",
      cardSubline: "Tailored fit, short or long sleeve, fully sublimated",
      image: "",
      imageAlt: "Custom Volleyball Jersey",
      href: `${PLP}/indoor-jersey`,
      sku: "CAP-VOL-01",
      pdpHeading: "Custom Volleyball Jersey Manufacturer",
      pdpMetaTitle: "Custom Volleyball Jersey Manufacturer",
      pdpDescription:
        "Indoor volleyball jersey, custom and private label, a tailored-fit polyester mesh jersey with flatlock seams, full-dye sublimated with names and numbers in the print, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Volleyball Jersey"),
      pdpMetaDescription:
        "Custom volleyball jersey manufacturer: tailored-fit sublimated jerseys, short sleeve, long sleeve or sleeveless, flatlock seams, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight polyester mesh or microfiber",
      pdpFabricPills: ["Polyester mesh", "Microfiber", "Cationic-dyeable polyester", "Recycled polyester"],
      pdpCustomizationPills: ["Sublimated names & numbers", "Sleeve options", "Home & away kits", "Custom labels"],
      faqs: [
        {
          q: "Which sleeve options are available on the volleyball jersey?",
          a: "The volleyball jersey is made short sleeve, long sleeve or sleeveless on the same construction, and different sleeve options can be mixed across a roster in one run.",
        },
        {
          q: "How long is the volleyball jersey cut?",
          a: "The volleyball jersey is cut long enough to stay tucked or sit past the waistband, with the length set to your competition's rules and confirmed on your sample.",
        },
        {
          q: "Can the volleyball jersey be ordered with a libero colorway?",
          a: "Yes. The libero colorway is the same volleyball jersey in a legal contrasting color, produced in the same order and run as the rest of the roster.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Women's Volleyball Shorts", slug: "fitted-shorts", href: PLP },
        { label: "Custom Volleyball Libero Jersey", slug: "libero-jersey", href: PLP },
        { label: "Custom Men's Volleyball Shorts", slug: "mens-shorts", href: PLP },
        { label: "Custom Beach Volleyball Uniform", slug: "beach-uniform", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Indoor volleyball jersey (base type)" },
        { label: "Fabric", value: "Lightweight polyester mesh or microfiber, with mesh side panels optional" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Tailored close fit for unrestricted hitting and blocking, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Sleeve", value: "Short sleeve, long sleeve or sleeveless, same construction" },
        { label: "Neckline", value: "Crew or V-neck" },
        { label: "Length", value: "Cut to stay tucked or sit past the waistband, set to your competition's rules" },
        { label: "Seams and label", value: SEAMS_LABEL },
        { label: "Decoration and color", value: "Full-dye sublimation, Pantone matched, with names and numbers in the print and numbers kept a solid contrasting color" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven brand labels, hangtags, packaging" },
      ],
      specificationsImage: { alt: "Custom Volleyball Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation, unlimited colors in one file at one cost"],
        ["Names and numbers", "Built into the print file, kept a solid contrasting color for legibility"],
        ["Libero colorway", "The same jersey in a legal contrasting colorway, in the same run"],
        ["Fabric", "Polyester mesh or microfiber, or cationic-dyeable polyester for piece-dyed solid colors, sourced or matched to your reference"],
        ["Color", "Pantone, CMYK, RGB or hex matched, confirmed on your digital proof"],
        ["Trims and finish", "Tagless printed care labels, woven brand labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the numbering, the color and the fit on your proof and sample before the full roster is produced.",
      pdpQualityPoints: [
        "Numbering size and placement set to your governing body's rules",
        NAMES_NUMBERS_POINT,
        "Flatlock seams and tagless labels checked for a flat, chafe-free finish",
        "The full roster produced in one run, same fabric roll and print batch, so every kit matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "fitted-shorts",
      cardTitle: "Custom Women's Volleyball Shorts",
      cardSubline: "Fitted Polyester/Spandex, four-way stretch",
      image: "",
      imageAlt: "Custom Women's Volleyball Shorts",
      href: `${PLP}/fitted-shorts`,
      sku: "CAP-VOL-02",
      pdpHeading: "Custom Women's Volleyball Shorts Manufacturer",
      pdpMetaTitle: "Custom Women's Volleyball Shorts Manufacturer",
      pdpDescription:
        "Women's volleyball shorts, custom and private label, a fitted four-way stretch Polyester/Spandex short with a wide stretch waistband and rise and length set to your spec, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Women's Volleyball Shorts"),
      pdpMetaDescription:
        "Custom women's volleyball shorts manufacturer: fitted four-way stretch Polyester/Spandex, wide waistband, custom rise and length, MOQ 50, DDP to 20+ countries.",
      material: "Polyester/Spandex, four-way stretch",
      pdpFabricPills: ["Polyester/Spandex", "Four-way stretch knit", "Recycled Polyester/Spandex"],
      pdpCustomizationPills: ["Rise and length", "Wide waistband", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "What rise and length options are there on the women's volleyball shorts?",
          a: "The women's volleyball shorts are made in a range of rises and inseams, from a short brief-style cut to a longer fitted short, set to your spec and confirmed on your sample.",
        },
        {
          q: "Can the women's volleyball shorts be ordered in more than one length for a team?",
          a: "Yes. Different lengths of the women's volleyball shorts can be mixed across one team order in the same team color, and your competition's rules on bottoms are confirmed on your proof.",
        },
        {
          q: "Do the women's volleyball shorts pass an opacity check?",
          a: "Yes. The women's volleyball shorts are checked for opacity at full stretch on your sample, and we move to a denser knit where it needs more coverage.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Volleyball Jersey", slug: "indoor-jersey", href: PLP },
        { label: "Custom Volleyball Libero Jersey", slug: "libero-jersey", href: PLP },
        { label: "Custom Men's Volleyball Shorts", slug: "mens-shorts", href: PLP },
        { label: "Custom Volleyball Warm-Up Pants", slug: "warm-up-pants", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Women's fitted volleyball short (base type)" },
        { label: "Fabric", value: "Polyester/Spandex, four-way stretch" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Rise and length", value: "Rise and inseam set to your spec, from a short brief-style cut to a longer fitted short" },
        { label: "Waistband", value: "Wide stretch waistband, finished flat" },
        { label: "Construction", value: "Four-panel or two-panel body with flatlock seams" },
        { label: "Gusset", value: "Crotch gusset for freedom of movement" },
        { label: "Decoration and color", value: "Full-dye sublimation or a solid team color, Pantone matched, with side detail or logos" },
        { label: "Fit", value: "Women's fitted block, graded XS to 5XL" },
        { label: "Branding", value: "Team logo, manufacturer mark, tagless printed care label, packaging" },
      ],
      specificationsImage: { alt: "Custom Women's Volleyball Shorts" },
      pdpCustomizationSteps: customizeSteps([
        ["Fit", "Rise and inseam to your spec, wide stretch waistband"],
        ["Print and artwork", "Full-dye sublimation, team colors and side detail"],
        ["Fabric", "Four-way stretch Polyester/Spandex, sourced or matched to your reference"],
        ["Color", "Pantone, CMYK, RGB or hex matched, confirmed on your digital proof"],
        ["Branding", "Team logo and manufacturer mark"],
        ["Trims and finish", "Tagless printed care labels, woven brand labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fit, the waistband and the color on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Rise, length and waistband confirmed on your sample",
        "Opacity checked at full stretch",
        "One short color held across the whole team",
        "The full roster produced in one run, same fabric roll, so every short matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "libero-jersey",
      cardTitle: "Custom Volleyball Libero Jersey",
      cardSubline: "Legal contrast colorway of the team jersey",
      image: "",
      imageAlt: "Custom Volleyball Libero Jersey",
      href: `${PLP}/libero-jersey`,
      sku: "CAP-VOL-03",
      pdpHeading: "Custom Volleyball Libero Jersey Manufacturer",
      pdpMetaTitle: "Custom Volleyball Libero Jersey Manufacturer",
      pdpDescription:
        "Volleyball libero jersey, custom and private label, the same tailored polyester jersey as your team kit in a legal contrasting colorway, produced in the same run as the roster, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Volleyball Libero Jersey"),
      pdpMetaDescription:
        "Custom volleyball libero jersey manufacturer: the team jersey in a legal contrasting colorway, same run as your roster, MOQ 50 pieces, DDP to 20+ countries.",
      material: "Lightweight polyester mesh or microfiber",
      pdpFabricPills: ["Polyester mesh", "Microfiber", "Cationic-dyeable polyester", "Recycled polyester"],
      pdpCustomizationPills: ["Contrasting colorway", "Matched numbering", "Sleeve options", "Custom labels"],
      faqs: [
        {
          q: "Is the volleyball libero jersey a different construction from the team jersey?",
          a: "No. The volleyball libero jersey is the same jersey construction in a contrasting color, produced in the same order and run as the team jerseys, so fabric, fit and numbering match.",
        },
        {
          q: "What colors count as contrasting for a volleyball libero jersey?",
          a: "A volleyball libero jersey must clearly contrast with the team's predominant jersey color. Two dark colors or two light colors can read as too similar, so we help you choose a compliant pairing and confirm it against your governing body's rules before bulk.",
        },
        {
          q: "Can a team with two liberos get two different libero jerseys?",
          a: "Yes. Where your rules call for it, each volleyball libero jersey can be made in its own contrasting color, all produced in the same run as the team jerseys.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Volleyball Jersey", slug: "indoor-jersey", href: PLP },
        { label: "Custom Women's Volleyball Shorts", slug: "fitted-shorts", href: PLP },
        { label: "Custom Men's Volleyball Shorts", slug: "mens-shorts", href: PLP },
        { label: "Custom Beach Volleyball Uniform", slug: "beach-uniform", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Volleyball libero jersey, a contrasting colorway of the team jersey (base type)" },
        { label: "Fabric", value: "Lightweight polyester mesh or microfiber, the same as the team jersey" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Color", value: "A color that clearly contrasts with the team's predominant jersey color, confirmed against your governing body's rules" },
        { label: "Numbering", value: "Numbers in the same style, size and placement as the team jersey" },
        { label: "Sleeve", value: "Short sleeve, long sleeve or sleeveless, matched to the team jersey" },
        { label: "Fit", value: "Tailored close fit, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Seams and label", value: SEAMS_LABEL },
        { label: "Decoration", value: "Full-dye sublimation, with names and numbers in the print" },
        { label: "Branding", value: "Team crest, sponsor logos, manufacturer mark, woven brand labels, hangtags, packaging" },
      ],
      specificationsImage: { alt: "Custom Volleyball Libero Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Colorway", "A contrasting color chosen with you and checked against your rules"],
        ["Multiple liberos", "A separate contrasting color for each libero where your rules call for it"],
        ["Print and artwork", "Full-dye sublimation matched to the team jersey design"],
        ["Numbering", "Same number style, size and placement as the team jersey"],
        ["Fabric", "The same polyester mesh or microfiber as the team jersey, sourced or matched to your reference"],
        ["Trims and finish", "Tagless printed care labels, woven brand labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the libero contrast, the numbering and the fit on your proof and sample before the full roster is produced.",
      pdpQualityPoints: [
        "Libero color checked for legal contrast against the team jersey before we cut",
        "Numbering matched to the team jersey in style, size and placement",
        NAMES_NUMBERS_POINT,
        "Produced in the same run as the team jerseys, so fabric and fit match",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "mens-shorts",
      cardTitle: "Custom Men's Volleyball Shorts",
      cardSubline: "Looser athletic cut",
      image: "",
      imageAlt: "Custom Men's Volleyball Shorts",
      href: `${PLP}/mens-shorts`,
      sku: "CAP-VOL-04",
      pdpHeading: "Custom Men's Volleyball Shorts Manufacturer",
      pdpMetaTitle: "Custom Men's Volleyball Shorts Manufacturer",
      pdpDescription:
        "Men's volleyball shorts, custom and private label, a looser athletic cut in a lightweight polyester knit or stretch woven with an elastic drawcord waist, sublimated in your team colors, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Men's Volleyball Shorts"),
      pdpMetaDescription:
        "Custom men's volleyball shorts manufacturer: looser athletic-cut sublimated shorts, stretch knit or woven, drawcord waist, MOQ 50 pieces, DDP to 20+ countries.",
      material: "Lightweight polyester knit, or a stretch woven polyester or Polyester/Spandex",
      pdpFabricPills: ["Polyester knit", "Stretch woven polyester", "Polyester/Spandex", "Recycled polyester"],
      pdpCustomizationPills: ["Inseam to length", "Drawcord waist", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "How are the men's volleyball shorts different from the women's volleyball shorts?",
          a: "The men's volleyball shorts are a looser athletic cut with a drawcord waist and a longer inseam, while the women's volleyball shorts are a fitted four-way stretch short. Both are made in the same team colors for one program.",
        },
        {
          q: "What inseam do the men's volleyball shorts have?",
          a: "The men's volleyball shorts are cut to the inseam you specify, graded across the size run and confirmed on your sample.",
        },
        {
          q: "Can the men's volleyball shorts carry numbers?",
          a: "Yes. Player numbers, the team logo and sponsor marks are sublimated into the men's volleyball shorts, placed to your spec and your competition's rules.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Volleyball Jersey", slug: "indoor-jersey", href: PLP },
        { label: "Custom Women's Volleyball Shorts", slug: "fitted-shorts", href: PLP },
        { label: "Custom Beach Volleyball Uniform", slug: "beach-uniform", href: PLP },
        { label: "Custom Volleyball Warm-Up Pants", slug: "warm-up-pants", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Men's volleyball short, looser athletic cut (base type)" },
        { label: "Fabric", value: "Lightweight polyester knit, or a stretch woven polyester or Polyester/Spandex" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Fit", value: "Looser athletic cut, graded XS to 5XL" },
        { label: "Inseam", value: "Set to your spec and graded across the size run" },
        { label: "Waistband", value: "Elastic waistband with an internal drawcord" },
        { label: "Side detail", value: "Side vents or side panels, to your spec" },
        { label: "Decoration and color", value: "Full-dye sublimation or a solid team color, Pantone matched to your jersey" },
        { label: "Seams and label", value: "Flatlock or overlock seams, tagless printed care label" },
        { label: "Branding", value: "Team logo, player numbers, manufacturer mark, packaging" },
      ],
      specificationsImage: { alt: "Custom Men's Volleyball Shorts" },
      pdpCustomizationSteps: customizeSteps([
        ["Fit and inseam", "Looser athletic cut, inseam to your spec"],
        ["Fabric", "Polyester knit or stretch woven, sourced or matched to your reference"],
        ["Color and print", "Full-dye sublimation or solid team colors, Pantone matched to your jersey"],
        ["Waist", "Elastic waistband with an internal drawcord"],
        ["Branding", "Team logo, player numbers and sponsor marks"],
        ["Trims and finish", "Tagless printed care labels, woven brand labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fit, the waistband and the color on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Shorts color matched to your jersey and approved on the proof before we cut",
        "Inseam graded and checked across the full size run",
        "Waistband and drawcord checked for a flat, secure finish",
        "The full roster produced in one run, same fabric roll and print batch, so every pair matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "beach-uniform",
      cardTitle: "Custom Beach Volleyball Uniform",
      cardSubline: "Tank or jersey top with fitted bottoms",
      image: "",
      imageAlt: "Custom Beach Volleyball Uniform",
      href: `${PLP}/beach-uniform`,
      sku: "CAP-VOL-05",
      pdpHeading: "Custom Beach Volleyball Uniform Manufacturer",
      pdpMetaTitle: "Custom Beach Volleyball Uniform Manufacturer",
      pdpDescription:
        "Beach volleyball uniform, custom and private label, a tank or jersey top with fitted Polyester/Spandex bottoms, full-dye sublimated in your team colors and built to your competition's rules, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Beach Volleyball Uniform"),
      pdpMetaDescription:
        "Custom beach volleyball uniform manufacturer: tank or jersey tops with fitted Polyester/Spandex bottoms, sublimated, MOQ 50 pieces, DDP to 20+ countries.",
      material: "Four-way stretch Polyester/Spandex, with polyester mesh for tops",
      pdpFabricPills: ["Polyester/Spandex", "Polyester mesh", "Four-way stretch knit", "Recycled polyester"],
      pdpCustomizationPills: ["Top and bottom options", "Numbers to your rules", "Team colors", "Custom labels"],
      faqs: [
        {
          q: "Can players on one team choose different beach volleyball uniform tops or bottoms?",
          a: "Yes. Tops and bottoms of the beach volleyball uniform can be chosen per player within your competition's rules, all in the same team colors and produced in one run.",
        },
        {
          q: "What top and bottom options are there on the beach volleyball uniform?",
          a: "The beach volleyball uniform comes with a tank, sleeveless or short-sleeve jersey top and fitted shorts or brief-style bottoms, in women's and men's blocks, confirmed on your sample.",
        },
        {
          q: "Can the beach volleyball uniform match our indoor kit?",
          a: "Yes. The beach volleyball uniform is sublimated from the same Pantone values as your indoor kit, so a club or brand can run indoor and beach programs in matching colors.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Volleyball Jersey", slug: "indoor-jersey", href: PLP },
        { label: "Custom Women's Volleyball Shorts", slug: "fitted-shorts", href: PLP },
        { label: "Custom Men's Volleyball Shorts", slug: "mens-shorts", href: PLP },
        { label: "Custom Volleyball Warm-Up Jacket", slug: "warm-up-jacket", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Beach volleyball uniform, top with fitted bottoms (base type)" },
        { label: "Fabric", value: "Four-way stretch Polyester/Spandex, with polyester mesh for tops" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Top", value: "Tank, sleeveless or short-sleeve jersey top" },
        { label: "Bottoms", value: "Fitted shorts or brief-style bottoms, rise and length to your spec" },
        { label: "Fit", value: "Women's and men's blocks, graded XS to 5XL" },
        { label: "Numbering", value: "Numbers sized and placed to your competition's rules" },
        { label: "Decoration and color", value: "Full-dye sublimation, Pantone matched" },
        { label: "Seams and label", value: SEAMS_LABEL },
        { label: "Branding", value: "Team or event marks, sponsor logos, manufacturer mark, packaging" },
      ],
      specificationsImage: { alt: "Custom Beach Volleyball Uniform" },
      pdpCustomizationSteps: customizeSteps([
        ["Tops", "Tank, sleeveless or short-sleeve jersey top"],
        ["Bottoms", "Fitted shorts or brief-style bottoms, rise and length to your spec"],
        ["Fabric", "Four-way stretch Polyester/Spandex or polyester mesh, sourced or matched to your reference"],
        ["Print and artwork", "Full-dye sublimation, unlimited colors in one file at one cost"],
        ["Numbering", "Sized and placed to your competition's rules"],
        ["Trims and finish", "Tagless printed care labels, woven brand labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fit, the numbering and the color on your proof and sample before the full roster is produced.",
      pdpQualityPoints: [
        "Top and bottom colors matched and approved on the proof before we cut",
        "Fit, rise and length confirmed on your sample",
        "Opacity checked at full stretch",
        "Numbering set to your competition's rules and confirmed on your proof",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "warm-up-jacket",
      cardTitle: "Custom Volleyball Warm-Up Jacket",
      cardSubline: "Zip warm-up, tricot or fleece",
      image: "",
      imageAlt: "Custom Volleyball Warm-Up Jacket",
      href: `${PLP}/warm-up-jacket`,
      sku: "CAP-VOL-06",
      pdpHeading: "Custom Volleyball Warm-Up Jacket Manufacturer",
      pdpMetaTitle: "Custom Volleyball Warm-Up Jacket Manufacturer",
      pdpDescription:
        "Volleyball warm-up jacket, custom and private label, a full-zip warm-up in polyester tricot or brushed fleece, with a stand collar or hood, team colors and an embroidered or printed crest, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Volleyball Warm-Up Jacket"),
      pdpMetaDescription:
        "Custom volleyball warm-up jacket manufacturer: full-zip tricot or fleece warm-ups in team colors, crest and player details, MOQ 50, DDP to 20+ countries.",
      material: "Polyester tricot or brushed-back polyester fleece",
      pdpFabricPills: ["Polyester tricot", "Brushed polyester fleece", "Polyester interlock", "Recycled polyester"],
      pdpCustomizationPills: ["Stand collar or hood", "Team colors & panels", "Embroidered crest", "Custom labels"],
      faqs: [
        {
          q: "Can the volleyball warm-up jacket be ordered with matching warm-up pants?",
          a: "Yes. The volleyball warm-up jacket is cut from the same fabric and Pantone values as the volleyball warm-up pants, so the two can be ordered together as a matched warm-up set.",
        },
        {
          q: "Which fabrics is the volleyball warm-up jacket made in?",
          a: "The volleyball warm-up jacket is made in polyester tricot for a smooth, classic warm-up face, or in brushed polyester fleece for more warmth, with recycled polyester available. Weight is confirmed on your sample.",
        },
        {
          q: "Can player names and numbers go on the volleyball warm-up jacket?",
          a: "Yes. Player names, numbers and sponsor marks can be embroidered or printed on the volleyball warm-up jacket, placed on the chest, sleeve or back to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Volleyball Warm-Up Pants", slug: "warm-up-pants", href: PLP },
        { label: "Custom Volleyball Jersey", slug: "indoor-jersey", href: PLP },
        { label: "Custom Women's Volleyball Shorts", slug: "fitted-shorts", href: PLP },
        { label: "Custom Men's Volleyball Shorts", slug: "mens-shorts", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Volleyball warm-up jacket, full zip (base type)" },
        { label: "Fabric", value: "Polyester tricot or brushed-back polyester fleece, recycled polyester available" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Zip and collar", value: "Full-length front zip with a stand collar or a hood, and a zip garage at the chin" },
        { label: "Sleeve", value: "Set-in or raglan sleeve with rib or self-fabric cuffs" },
        { label: "Pockets", value: "Zip side pockets, to your spec" },
        { label: "Color and decoration", value: "Team colors with contrast panels or piping, Pantone matched to your kit, with an embroidered or printed crest and player details" },
        { label: "Fit", value: "Team cut, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Construction", value: "Flatlock and overlock seams, rib-knit or self-fabric hem" },
        { label: "Branding", value: "Team crest, player names or numbers, sponsor logos, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Volleyball Warm-Up Jacket" },
      pdpCustomizationSteps: customizeSteps([
        ["Collar and build", "Stand collar or hood, set-in or raglan sleeve, zip pockets"],
        ["Fabric", "Polyester tricot or brushed fleece, sourced or matched to your reference"],
        ["Color", "Team colors, contrast panels and piping, Pantone matched to your kit"],
        ["Decoration", "Embroidered or printed crest, player names, numbers and sponsor marks"],
        ["Fit", "Team cut, graded across the full size run"],
        ["Trims and finish", "Woven labels, size and care labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fabric, the zips, the color and the fit on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Jacket color Pantone matched to your kit and approved on the sample before we cut",
        "Zips cycled and function-tested before bulk",
        "Contrast panels and piping aligned across seams at every size",
        "The full roster produced in one run, same fabric lot, so every jacket matches",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "warm-up-pants",
      cardTitle: "Custom Volleyball Warm-Up Pants",
      cardSubline: "Straight or tapered, tricot or fleece",
      image: "",
      imageAlt: "Custom Volleyball Warm-Up Pants",
      href: `${PLP}/warm-up-pants`,
      sku: "CAP-VOL-07",
      pdpHeading: "Custom Volleyball Warm-Up Pants Manufacturer",
      pdpMetaTitle: "Custom Volleyball Warm-Up Pants Manufacturer",
      pdpDescription:
        "Volleyball warm-up pants, custom and private label, in polyester tricot or brushed fleece with an elastic drawcord waist and a straight or tapered leg, matched to your warm-up jacket, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Volleyball Warm-Up Pants"),
      pdpMetaDescription:
        "Custom volleyball warm-up pants manufacturer: tricot or fleece warm-up pants, straight or tapered leg, ankle zips optional, MOQ 50, DDP to 20+ countries.",
      material: "Polyester tricot or brushed-back polyester fleece",
      pdpFabricPills: ["Polyester tricot", "Brushed polyester fleece", "Polyester interlock", "Recycled polyester"],
      pdpCustomizationPills: ["Straight or tapered", "Ankle zips optional", "Matched to your jacket", "Custom labels"],
      faqs: [
        {
          q: "Can the volleyball warm-up pants match our warm-up jacket?",
          a: "Yes. The volleyball warm-up pants are cut from the same fabric and Pantone values as your volleyball warm-up jacket, and both are confirmed together on your sample before bulk.",
        },
        {
          q: "What leg and hem options are there on the volleyball warm-up pants?",
          a: "The volleyball warm-up pants come in a straight or tapered leg, finished with an open hem, a rib cuff or ankle zips so they come off over court shoes, chosen per program and confirmed on your sample.",
        },
        {
          q: "Which fabrics are the volleyball warm-up pants made in?",
          a: "The volleyball warm-up pants are made in polyester tricot or brushed polyester fleece, with recycled polyester available. Weight is confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Volleyball Warm-Up Jacket", slug: "warm-up-jacket", href: PLP },
        { label: "Custom Men's Volleyball Shorts", slug: "mens-shorts", href: PLP },
        { label: "Custom Women's Volleyball Shorts", slug: "fitted-shorts", href: PLP },
        { label: "Custom Volleyball Jersey", slug: "indoor-jersey", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Volleyball warm-up pants (base type)" },
        { label: "Fabric", value: "Polyester tricot or brushed-back polyester fleece, recycled polyester available" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Waist", value: "Elastic waistband with an internal drawcord, finished flat" },
        { label: "Leg", value: "Straight or tapered leg, full length" },
        { label: "Hem", value: "Open hem, rib cuff, or ankle zips so the pants come off over court shoes, to your spec" },
        { label: "Pockets", value: "Zip or open side pockets, to your spec" },
        { label: "Color and decoration", value: "Team colors with side stripes or contrast panels, Pantone matched to your warm-up jacket, with an embroidered or printed mark" },
        { label: "Fit", value: "Team cut, graded XS to 5XL, men's, women's and youth blocks" },
        { label: "Branding", value: "Team crest or mark, sponsor logos, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Custom Volleyball Warm-Up Pants" },
      pdpCustomizationSteps: customizeSteps([
        ["Leg and hem", "Straight or tapered leg, open hem, rib cuff or ankle zips"],
        ["Fabric", "Polyester tricot or brushed fleece, sourced or matched to your reference"],
        ["Color", "Team colors, side stripes and contrast panels, Pantone matched to your warm-up jacket"],
        ["Decoration", "Embroidered or printed crest and sponsor marks"],
        ["Waist and fit", "Elastic drawcord waist, team cut, graded across the full size run"],
        ["Trims and finish", "Woven labels, size and care labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fabric, the zips, the color and the fit on your sample before the full roster is produced.",
      pdpQualityPoints: [
        "Pants color matched to your warm-up jacket and approved on the sample before we cut",
        "Inseam and hem graded and checked across the full size run",
        "Ankle and pocket zips function-tested before bulk",
        "The full roster produced in one run, same fabric lot, so every pair matches",
        AQL_POINT,
      ],
    },
  ],
  relatedLinks: [
    { label: "Basketball", href: "/capriowear/teamwear/basketball" },
    { label: "Soccer", href: "/capriowear/teamwear/soccer" },
    { label: "Cycling", href: "/capriowear/teamwear/cycling" },
    { label: "Baseball", href: "/capriowear/teamwear/baseball" },
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
  ],
};
