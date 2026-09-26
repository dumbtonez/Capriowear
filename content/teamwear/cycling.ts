// content/teamwear/cycling.ts
// Ninth Teamwear category, same `Category` shape as every prior Teamwear
// category (content/teamwear/*.ts) and every Activewear category
// (content/activewear/types.ts) -- a pure content/data drop: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts.
//
// PDP publish state (owner spec): every style ships "draft". Under the
// Teamwear draft-PDP rule (isDraftPdpReachable(), pdpShared.ts), all 7
// styles carry PDP content (batches 1 to 3, 2026-09-26) and render as
// noindexed draft PDPs (BreadcrumbList only, out of the sitemap and the
// CollectionPage/ItemList) with linking cards. Publishing needs the roster confirmed, the style sampled and real
// photos (getPublishReadiness()).
//
// "Aero" is never used (owner spec, 2026-09-26: an unbacked claim).
//
// Cut-and-sew scope (owner standing rule, set on Cricket) -- arm/leg warmers
// and socks are knitted goods, gloves are padded specialized goods, and the
// cap is specialized headwear, all sourced, so none is a style card here.
// The chamois pad itself is a sourced specialized foam/foam-gel component,
// not a standalone product -- it is the insert sewn into the cut-and-sew
// bib short/bib tight/skinsuit shells we make in-house, so those garments
// stay on the PLP.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape every
// prior Teamwear category uses -- no component or type change needed here.
//
// No cycling GSM or chamois mmHg figure is ever stated (owner spec) --
// every fabric-weight or pad reference is worded as "tuned to your
// riding"/"confirmed on your sample," never a made-up figure.
//
// Punctuation rule (owner spec, site-wide sweep): headings, eyebrows, labels
// and short fact/chip lines carry no trailing period; periods stay only on
// real sentences (leads, FAQ answers, descriptions, the fabric footnote, the
// Specifications subtitle, the final-CTA subline). Written period-clean from
// the start here, not swept after the fact.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows.
import type { Category } from "../activewear/types";
import { faqGetStarted } from "../getStarted";

const PLP = "/capriowear/teamwear/cycling";

const QUALITY_HEADING = "Built for the long ride";
const AQL_POINT = "Every run inspected to AQL 2.5, third-party inspection welcome";
const PENDING_WEIGHT = "Pending, confirmed on your sample.";
const JERSEY_BRANDING = "Team and sponsor logos, manufacturer mark, woven and care labels, packaging";

const CHAMOIS_SPEC = "Sourced foam or foam-gel pad, density and thickness to your ride length";
const PAD_SHAPE_SPEC = "Men's, women's or unisex shape, sewn in with flatlock seams";
const BIB_STRAPS_SPEC = "Mesh over-the-shoulder straps, no waistband, cut for the riding position";
const CHAMOIS_POINT = "Chamois placement and comfort confirmed on your sample";
const OPACITY_POINT = "Opacity checked at full stretch";
const GRAPHICS_POINT = "Graphics dyed into the fiber, so they will not crack or peel";

type Step = [title: string, body: string];
const TRIMS_STEP: Step = ["Trims and finish", "Woven labels, printed care labels, hangtags"];
const PACKAGING_STEP: Step = ["Packaging", "Polybags, boxes, retail-ready to your spec"];
const CHAMOIS_STEP: Step = ["Chamois", "Foam or foam-gel pad, density and thickness to your ride length"];
const PAD_SHAPE_STEP: Step = ["Pad shape", "Men's, women's or unisex shape, sewn in with flatlock seams"];
const TRIMS_BRAND_STEP: Step = ["Trims and finish", "Printed care labels, woven brand labels, hangtags"];

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

export const cycling: Category = {
  slug: "cycling",
  group: "Teamwear",
  menuLabel: "Cycling",
  // Entity FAQ (PLP FAQ 1 and FAQ 1 on every PDP) is built by
  // categoryEntityFaq() from these four fields.
  manufacturerNoun: "Cycling Jersey",
  productNounPlural: "cycling jerseys and kits",
  entityExampleStyles: "jerseys, bib shorts, bib tights and skinsuits",
  entityFabrics: "lightweight polyester and compression knits",
  h1: "Custom Cycling Jersey Manufacturer",
  metaTitle: "Custom Cycling Jersey Manufacturer",
  metaDescription:
    "Custom cycling jersey manufacturer: sublimated race-cut jerseys, bib shorts with a sourced chamois pad, full club kit, MOQ 50 pieces, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Lightweight polyester with mesh panels",
      bestFor: "Race and club jerseys",
      performance: "Light, breathable, prints cleanly",
    },
    {
      fabric: "High-spandex compression knit",
      bestFor: "Bib shorts, bib tights and skinsuits",
      performance: "Close compression fit, holds the pad in place",
    },
    {
      fabric: "Brushed thermal knit",
      bestFor: "Winter jerseys, thermal bib tights, jacket lining",
      performance: "Fleece-backed warmth for cold rides",
    },
    {
      fabric: "Windproof water-resistant shell",
      bestFor: "Gilet and thermal jacket",
      performance: "Blocks wind, sheds light rain",
    },
  ],
  fabricNote: [
    { text: "Polyester and Spandex based, and jerseys take full-color sublimation. Weights are tuned to your riding and " },
    { text: "confirmed on your sample", bold: true },
    { text: ". The chamois pad is a specialized foam or foam-gel component we source from dedicated pad makers and sew into the short. Swatches before every bulk run." },
  ],
  fabricPills: ["Lightweight polyester", "Compression knit", "Brushed thermal", "Windproof shell"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Whole-kit graphics, gradients, names, sponsor logos",
        notes: "Dyed into the fiber, will not crack or peel, unlimited colors at one cost",
      },
      {
        method: "Sublimation twill patch",
        bestFor: "Crests and name bars",
        notes: "Raised, full-color",
      },
      {
        method: "Embroidery",
        bestFor: "Small crests and sponsor marks",
        notes: "Raised, premium texture",
      },
      {
        method: "Heat-transfer vinyl",
        bestFor: "Rider names and numbers over a printed design",
        notes: "Applied per rider without re-printing the whole design",
      },
    ],
    note: [
      { text: "Cycling kit uses " },
      { text: "full sublimation the most", bold: true },
      { text: ", for gradients and complex team graphics carried across the jersey, bibs and skinsuit as one look." },
    ],
  },
  qualityHeading: "Built for the long ride",
  qualitySubline:
    "We confirm the chamois placement, the fit and the seams on your sample before the full order is produced.",
  qualityPoints: [
    "Chamois pad placement and comfort confirmed on your sample before bulk",
    "Full-dye graphics dyed into the fabric, so they will not crack or peel",
    "Bib short shell sewn in-house, the chamois pad sourced and set with flatlock seams",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Lightweight polyester jerseys, high-spandex compression bib knits, brushed thermal and windproof shells",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, unlimited colors and gradients, Pantone matching, matched across the whole kit",
    },
    {
      title: "Chamois and fit",
      body: "Sourced chamois pad to your ride length, men's, women's or unisex shape, silicone leg and sleeve grippers",
    },
    {
      title: "Finishing",
      body: "Rear jersey pockets, your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  // 7 questions plus the auto-built entity question first (categoryEntityFaq(),
  // from the entity fields above), 8 total (owner spec, 2026-09-26).
  faqs: [
    {
      q: "What is your MOQ for custom cycling kit?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Is the chamois pad made in-house or sourced?",
      a: "The chamois pad is a specialized foam or foam-gel component made by dedicated pad makers. We source the pad to your spec, foam density and thickness to your ride length and a men's, women's or unisex shape, and sew it into a cut-and-sew short shell we make in-house with flatlock seams.",
    },
    {
      q: "What is the difference between bib and waist shorts?",
      a: "Bibs replace the waistband with mesh shoulder straps, so nothing digs in or restricts breathing on a long ride, the pad stays in place, and less heat is trapped. Bibs are our standard build, and the same short can be made as a waist short on request.",
    },
    {
      q: "How do we choose the chamois pad, and are men's and women's pads different?",
      a: "By ride length and rider. Thinner, lighter pads suit short rides; higher-density, thicker multi-density pads suit long endurance rides. Men's and women's pads are different shapes, not the same pad resized: women's pads are wider at the rear with anti-chafe wings, men's are narrower with forward-focused padding, and a unisex shape sits in between. We confirm the pad on your sample.",
    },
    {
      q: "Why is a cycling jersey cut longer at the back?",
      a: "It has a drop-tail hem: the back panel runs longer than the front, so the lower back stays covered in the riding position instead of riding up.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "kit",
  // 7 drafts, SKU order (CAP-CYC-01 to 07), owner spec 2026-09-26. Card
  // title = H1 minus " Manufacturer" = title-tag name = breadcrumb = alt =
  // every pill label that targets it, no commas in names. All 7 carry PDP content
  // (batches 1 to 3; 01 and 02 reuse the slugs of the removed legacy drafts).
  styleCards: [
    {
      status: "draft",
      slug: "jersey",
      cardTitle: "Custom Short-Sleeve Cycling Jersey",
      cardSubline: "Sublimated race-cut fit, drop-tail hem, rear pockets",
      image: "",
      imageAlt: "Custom Short-Sleeve Cycling Jersey",
      href: `${PLP}/jersey`,
      sku: "CAP-CYC-01",
      pdpHeading: "Custom Short-Sleeve Cycling Jersey Manufacturer",
      pdpMetaTitle: "Custom Short-Sleeve Cycling Jersey Manufacturer",
      pdpDescription:
        "Short-sleeve cycling jersey, custom and private label, a lightweight full-dye sublimated polyester jersey in a race or club cut, with a drop-tail hem and three rear pockets, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Short-Sleeve Cycling Jersey"),
      pdpMetaDescription:
        "Custom short-sleeve cycling jersey manufacturer: sublimated race or club cut, drop-tail hem, three rear pockets, gripper hem, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight polyester or Polyester/Spandex knit with mesh ventilation panels",
      pdpFabricPills: ["Lightweight polyester", "Polyester/Spandex knit", "Mesh side panels", "Recycled polyester"],
      pdpCustomizationPills: ["Race or club cut", "Full-dye sublimation", "Rear pockets", "Custom labels"],
      faqs: [
        {
          q: "What is the difference between a race cut and a club cut on the short-sleeve cycling jersey?",
          a: "The race cut on the short-sleeve cycling jersey is close through the body and sleeves, while the club cut runs a little more relaxed for all-day riding. We build either to your spec and confirm it on your sample.",
        },
        {
          q: "Why is the short-sleeve cycling jersey cut longer at the back?",
          a: "The short-sleeve cycling jersey has a drop-tail hem: the back panel is cut longer than the front, so the lower back stays covered in the riding position instead of riding up.",
        },
        {
          q: "What are the rear pockets on the short-sleeve cycling jersey for?",
          a: "The short-sleeve cycling jersey has three rear pockets for food, tools and a phone, with elastic-reinforced openings so they hold weight without sagging. A zipped security pocket can be added.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Cycling Bib Shorts", slug: "bib-shorts", href: PLP },
        { label: "Custom Long-Sleeve Cycling Jersey", slug: "long-sleeve-jersey", href: PLP },
        { label: "Custom Cycling Skinsuit", slug: "skinsuit", href: PLP },
        { label: "Custom Cycling Gilet", slug: "gilet", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Short-sleeve cycling jersey (base type)" },
        { label: "Fabric", value: "Lightweight polyester or Polyester/Spandex knit, with mesh ventilation panels" },
        { label: "Weight", value: PENDING_WEIGHT },
        {
          label: "Fit",
          value: "Race cut, close through the body with close-fitting sleeves, or a more relaxed club cut",
        },
        {
          label: "Hem",
          value:
            "Drop-tail, the back cut longer than the front so the lower back stays covered in the riding position, finished with a gripper band",
        },
        { label: "Zip", value: "Full-length or partial front zip, with a zip garage at the collar" },
        {
          label: "Pockets",
          value: "Three rear pockets with elastic-reinforced openings, zipped security pocket optional",
        },
        {
          label: "Decoration and color",
          value: "Full-dye sublimation, Pantone matched, with gradients, names and sponsor logos",
        },
        { label: "Sizing", value: "Graded XS to 5XL, men's and women's blocks" },
        {
          label: "Branding",
          value: "Team and sponsor logos, manufacturer mark, woven and care labels, hangtags, packaging",
        },
      ],
      specificationsImage: { alt: "Custom Short-Sleeve Cycling Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation, unlimited colors and gradients in one file, Pantone matched"],
        ["Fit", "Race cut or club cut, to your spec"],
        ["Hem and cuffs", "Drop-tail hem with a gripper band, gripper or plain sleeve cuffs"],
        ["Pockets", "Three rear pockets, zipped security pocket optional"],
        ["Fabric", "Lightweight polyester or Polyester/Spandex with mesh panels, sourced or matched to your reference"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: "We confirm the fit, the hem and the pockets on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Race or club fit checked on your sample",
        "Drop-tail hem cut to cover the lower back in the riding position",
        "Rear pockets reinforced to carry weight without sagging",
        GRAPHICS_POINT,
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "bib-shorts",
      cardTitle: "Custom Cycling Bib Shorts",
      cardSubline: "Compression shell, sourced chamois pad, mesh bib straps",
      image: "",
      imageAlt: "Custom Cycling Bib Shorts",
      href: `${PLP}/bib-shorts`,
      sku: "CAP-CYC-02",
      pdpHeading: "Custom Cycling Bib Shorts Manufacturer",
      pdpMetaTitle: "Custom Cycling Bib Shorts Manufacturer",
      pdpDescription:
        "Cycling bib shorts, custom and private label, a high-spandex compression short with mesh bib straps and a sourced chamois pad chosen for your ride length, sewn in with flatlock seams, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cycling Bib Shorts"),
      pdpMetaDescription:
        "Custom cycling bib shorts manufacturer: compression shell, mesh bib straps, sourced chamois pad to your ride length, leg grippers, MOQ 50, DDP to 20+ countries.",
      material: "High-spandex compression knit with a sourced foam or foam-gel chamois pad",
      pdpFabricPills: ["Compression knit", "Mesh bib straps", "Sourced chamois pad", "Silicone leg grippers"],
      pdpCustomizationPills: ["Pad density & shape", "Men's, women's or unisex", "Bib or waist short", "Custom labels"],
      faqs: [
        {
          q: "Is the chamois pad in the cycling bib shorts made in-house or sourced?",
          a: "The chamois pad in the cycling bib shorts is a specialized foam or foam-gel component from dedicated pad makers. We source it to your spec and sew it into a short shell we make in-house, with flatlock seams.",
        },
        {
          q: "How do we choose the pad for the cycling bib shorts?",
          a: "The pad in the cycling bib shorts is chosen by ride length and rider: thinner, lighter pads for shorter rides and higher-density multi-density pads for long rides, in a men's, women's or unisex shape, confirmed on your sample.",
        },
        {
          q: "Can the cycling bib shorts be made as waist shorts?",
          a: "Yes. The cycling bib shorts can be built as a waist short on the same shell and pad, for riders or programs that prefer no straps.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Short-Sleeve Cycling Jersey", slug: "jersey", href: PLP },
        { label: "Custom Cycling Bib Tights", slug: "bib-tights", href: PLP },
        { label: "Custom Cycling Skinsuit", slug: "skinsuit", href: PLP },
        { label: "Custom Long-Sleeve Cycling Jersey", slug: "long-sleeve-jersey", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Cycling bib shorts (base type)" },
        { label: "Fabric", value: "High-spandex compression knit body" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Bib straps", value: BIB_STRAPS_SPEC },
        { label: "Chamois", value: CHAMOIS_SPEC },
        { label: "Pad shape", value: PAD_SHAPE_SPEC },
        { label: "Leg hem", value: "Silicone gripper band that holds the leg in place" },
        { label: "Fit", value: "Close compression fit, graded XS to 5XL, men's and women's blocks" },
        {
          label: "Decoration and color",
          value: "Full-dye sublimation or a solid color, Pantone matched to your jersey",
        },
        { label: "Branding", value: "Team and sponsor logos, manufacturer mark, printed care label, packaging" },
      ],
      specificationsImage: { alt: "Custom Cycling Bib Shorts" },
      pdpCustomizationSteps: customizeSteps([
        CHAMOIS_STEP,
        PAD_SHAPE_STEP,
        ["Bib or waist", "Bib straps as standard, or the same short built as a waist short"],
        ["Print and artwork", "Full-dye sublimation or a solid color, matched to your jersey"],
        ["Fabric", "High-spandex compression knit, sourced or matched to your reference"],
        ["Trims and finish", "Silicone leg grippers, printed care labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the chamois placement, the fit and the seams on your sample before the full order is produced.",
      pdpQualityPoints: [
        CHAMOIS_POINT,
        "Short shell sewn in-house, the sourced pad set with flatlock seams",
        "Leg grippers and straps checked so nothing digs in or rides up",
        OPACITY_POINT,
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "long-sleeve-jersey",
      cardTitle: "Custom Long-Sleeve Cycling Jersey",
      cardSubline: "Cooler-weather race-cut jersey",
      image: "",
      imageAlt: "Custom Long-Sleeve Cycling Jersey",
      href: `${PLP}/long-sleeve-jersey`,
      sku: "CAP-CYC-03",
      pdpHeading: "Custom Long-Sleeve Cycling Jersey Manufacturer",
      pdpMetaTitle: "Custom Long-Sleeve Cycling Jersey Manufacturer",
      pdpDescription:
        "Long-sleeve cycling jersey, custom and private label, the same race or club cut as the short-sleeve jersey with full-length sleeves, in lightweight polyester or a brushed thermal knit, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Long-Sleeve Cycling Jersey"),
      pdpMetaDescription:
        "Custom long-sleeve cycling jersey manufacturer: race or club cut, lightweight or thermal knit, drop-tail hem, three rear pockets, MOQ 50, DDP to 20+ countries.",
      material: "Lightweight polyester or brushed thermal knit",
      pdpFabricPills: ["Lightweight polyester", "Brushed thermal knit", "Mesh side panels", "Recycled polyester"],
      pdpCustomizationPills: ["Race or club cut", "Light or thermal", "Rear pockets", "Custom labels"],
      faqs: [
        {
          q: "Is the long-sleeve cycling jersey the same build as the short-sleeve jersey?",
          a: "Yes. The long-sleeve cycling jersey uses the same race or club cut, drop-tail hem and rear pockets as the short-sleeve jersey, with full-length sleeves, so the whole kit matches.",
        },
        {
          q: "Can the long-sleeve cycling jersey be made in a thermal fabric?",
          a: "Yes. The long-sleeve cycling jersey can be made in lightweight polyester for mild days or a brushed thermal knit for cold rides, and the print result on the thermal knit is confirmed on your sample.",
        },
        {
          q: "Can the long-sleeve cycling jersey match our short-sleeve jerseys and bibs?",
          a: "Yes. The long-sleeve cycling jersey is Pantone matched to your short-sleeve jerseys and bib shorts, and all of them can be produced in the same order.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Short-Sleeve Cycling Jersey", slug: "jersey", href: PLP },
        { label: "Custom Cycling Bib Tights", slug: "bib-tights", href: PLP },
        { label: "Custom Cycling Thermal Jacket", slug: "thermal-jacket", href: PLP },
        { label: "Custom Cycling Gilet", slug: "gilet", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Long-sleeve cycling jersey (base type)" },
        { label: "Fabric", value: "Lightweight polyester for mild days, or a brushed thermal knit for cold rides" },
        { label: "Weight", value: PENDING_WEIGHT },
        {
          label: "Fit",
          value: "Race or club cut, matched to the short-sleeve jersey, graded XS to 5XL, men's and women's blocks",
        },
        { label: "Sleeves", value: "Full-length close-fitting sleeves with a gripper or elastic cuff" },
        {
          label: "Hem",
          value: "Drop-tail with a gripper band, so the lower back stays covered in the riding position",
        },
        { label: "Zip", value: "Full-length front zip with a zip garage at the collar" },
        { label: "Pockets", value: "Three rear pockets with elastic-reinforced openings" },
        {
          label: "Decoration and color",
          value:
            "Full-dye sublimation, Pantone matched to the rest of the kit; print on the thermal knit confirmed on your sample",
        },
        { label: "Branding", value: JERSEY_BRANDING },
      ],
      specificationsImage: { alt: "Custom Long-Sleeve Cycling Jersey" },
      pdpCustomizationSteps: customizeSteps([
        ["Fabric weight", "Lightweight polyester or brushed thermal knit, sourced or matched to your reference"],
        ["Fit", "Race or club cut, matched to the short-sleeve jersey"],
        ["Sleeves and cuffs", "Full-length sleeves, gripper or elastic cuffs"],
        ["Pockets", "Three rear pockets, zipped security pocket optional"],
        ["Print and artwork", "Full-dye sublimation, Pantone matched across the kit"],
        TRIMS_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the fit, the sleeves and the fabric weight on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Fit matched to your short-sleeve jersey on the sample",
        "Sleeve length and cuffs checked in the riding position",
        "Colors matched across the whole kit",
        "Print and color on the thermal knit confirmed on your sample",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "bib-tights",
      cardTitle: "Custom Cycling Bib Tights",
      cardSubline: "Thermal full-leg, sourced chamois pad",
      image: "",
      imageAlt: "Custom Cycling Bib Tights",
      href: `${PLP}/bib-tights`,
      sku: "CAP-CYC-04",
      pdpHeading: "Custom Cycling Bib Tights Manufacturer",
      pdpMetaTitle: "Custom Cycling Bib Tights Manufacturer",
      pdpDescription:
        "Cycling bib tights, custom and private label, a full-leg brushed thermal bib with mesh straps and a sourced chamois pad chosen for your ride length, sewn in with flatlock seams, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cycling Bib Tights"),
      pdpMetaDescription:
        "Custom cycling bib tights manufacturer: brushed thermal full-leg bib, mesh straps, sourced chamois pad, ankle zips optional, MOQ 50, DDP to 20+ countries.",
      material: "Brushed thermal or high-spandex compression knit with a sourced foam or foam-gel chamois pad",
      pdpFabricPills: ["Brushed thermal knit", "Compression knit", "Mesh bib straps", "Sourced chamois pad"],
      pdpCustomizationPills: ["Pad density & shape", "Ankle finish", "Matched to your bibs", "Custom labels"],
      faqs: [
        {
          q: "Do the cycling bib tights use the same chamois as the bib shorts?",
          a: "Yes. The cycling bib tights take the same sourced chamois pad options as the bib shorts, chosen by ride length and rider and sewn in with flatlock seams, so a team can run one pad across both.",
        },
        {
          q: "What fabric are the cycling bib tights made in?",
          a: "The cycling bib tights are made in a brushed thermal knit for cold rides, or a high-spandex compression knit for milder days. Weight is confirmed on your sample.",
        },
        {
          q: "Can the cycling bib tights have ankle zips?",
          a: "Yes. The cycling bib tights can be finished with a gripper or elastic ankle band, with ankle zips added where riders want them, confirmed on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Cycling Bib Shorts", slug: "bib-shorts", href: PLP },
        { label: "Custom Long-Sleeve Cycling Jersey", slug: "long-sleeve-jersey", href: PLP },
        { label: "Custom Cycling Thermal Jacket", slug: "thermal-jacket", href: PLP },
        { label: "Custom Cycling Gilet", slug: "gilet", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Cycling bib tights, full leg (base type)" },
        { label: "Fabric", value: "Brushed thermal knit, or a high-spandex compression knit for milder days" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Bib straps", value: BIB_STRAPS_SPEC },
        { label: "Chamois", value: CHAMOIS_SPEC },
        { label: "Pad shape", value: PAD_SHAPE_SPEC },
        { label: "Ankle", value: "Close ankle finish with a gripper or elastic band, ankle zips optional" },
        { label: "Fit", value: "Close compression fit, graded XS to 5XL, men's and women's blocks" },
        {
          label: "Decoration and color",
          value:
            "Solid color or print, Pantone matched to your bib shorts and jerseys; print on the thermal knit confirmed on your sample",
        },
        { label: "Branding", value: "Team and sponsor logos, manufacturer mark, printed care label, packaging" },
      ],
      specificationsImage: { alt: "Custom Cycling Bib Tights" },
      pdpCustomizationSteps: customizeSteps([
        CHAMOIS_STEP,
        PAD_SHAPE_STEP,
        ["Fabric", "Brushed thermal or compression knit, sourced or matched to your reference"],
        ["Ankle finish", "Gripper or elastic band, ankle zips optional"],
        ["Color and print", "Pantone matched to your bibs and jerseys, print confirmed on your sample"],
        TRIMS_BRAND_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the chamois placement, the fit and the thermal fabric on your sample before the full order is produced.",
      pdpQualityPoints: [
        CHAMOIS_POINT,
        "Tights shell sewn in-house, the sourced pad set with flatlock seams",
        "Straps and ankle finish checked so nothing digs in or rides up",
        OPACITY_POINT,
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "skinsuit",
      cardTitle: "Custom Cycling Skinsuit",
      cardSubline: "One-piece race-cut suit, sourced chamois pad",
      image: "",
      imageAlt: "Custom Cycling Skinsuit",
      href: `${PLP}/skinsuit`,
      sku: "CAP-CYC-05",
      pdpHeading: "Custom Cycling Skinsuit Manufacturer",
      pdpMetaTitle: "Custom Cycling Skinsuit Manufacturer",
      pdpDescription:
        "Cycling skinsuit, custom and private label, a one-piece race-cut suit joining jersey and short, full-dye sublimated with a sourced chamois pad, in short or long sleeve, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cycling Skinsuit"),
      pdpMetaDescription:
        "Custom cycling skinsuit manufacturer: one-piece race-cut suit, full-dye sublimated, short or long sleeve, sourced chamois pad, MOQ 50, DDP to 20+ countries.",
      material: "Polyester/Spandex knit upper and high-spandex compression knit lower with a sourced chamois pad",
      pdpFabricPills: ["Polyester/Spandex knit", "Compression knit", "Mesh panels", "Sourced chamois pad"],
      pdpCustomizationPills: ["Short or long sleeve", "Rear pockets optional", "Full-dye sublimation", "Custom labels"],
      faqs: [
        {
          q: "What is the difference between a cycling skinsuit and a jersey with bib shorts?",
          a: "The cycling skinsuit joins the jersey and short into one piece, so there is no overlap or loose fabric at the waist, while a jersey with bib shorts is two garments. Skinsuits are used mainly for time trials and racing.",
        },
        {
          q: "Does the cycling skinsuit have a chamois pad?",
          a: "Yes. The cycling skinsuit has a sourced foam or foam-gel chamois pad in a men's, women's or unisex shape, sewn in with flatlock seams and confirmed on your sample.",
        },
        {
          q: "Can the cycling skinsuit have rear pockets?",
          a: "Yes. The cycling skinsuit can be made with rear pockets for road races or without them for time trials, to your spec.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Short-Sleeve Cycling Jersey", slug: "jersey", href: PLP },
        { label: "Custom Cycling Bib Shorts", slug: "bib-shorts", href: PLP },
        { label: "Custom Long-Sleeve Cycling Jersey", slug: "long-sleeve-jersey", href: PLP },
        { label: "Custom Cycling Bib Tights", slug: "bib-tights", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Cycling skinsuit, one piece (base type)" },
        {
          label: "Fabric",
          value: "Polyester/Spandex knit upper with mesh panels, high-spandex compression knit lower",
        },
        { label: "Weight", value: PENDING_WEIGHT },
        {
          label: "Fit",
          value: "Race cut, close through the body, sleeves and legs, with silicone leg grippers",
        },
        { label: "Sleeve", value: "Short or long sleeve, close-fitting, gripper or clean-cut cuffs" },
        { label: "Zip", value: "Full-length or partial front zip" },
        { label: "Pockets", value: "Rear pockets or none, to your spec" },
        {
          label: "Chamois",
          value:
            "Sourced foam or foam-gel pad in a men's, women's or unisex shape, sewn in with flatlock seams",
        },
        {
          label: "Decoration and branding",
          value: "Full-dye sublimation across the whole suit, Pantone matched, with team and sponsor logos",
        },
        { label: "Sizing", value: "Graded XS to 5XL, men's and women's blocks" },
      ],
      specificationsImage: { alt: "Custom Cycling Skinsuit" },
      pdpCustomizationSteps: customizeSteps([
        ["Print and artwork", "Full-dye sublimation across the whole suit, Pantone matched"],
        ["Sleeve", "Short or long sleeve, gripper or clean-cut cuffs"],
        ["Chamois", "Foam or foam-gel pad, men's, women's or unisex shape"],
        ["Pockets", "Rear pockets or none, to your spec"],
        ["Fabric", "Polyester/Spandex upper and compression lower, sourced or matched to your reference"],
        TRIMS_BRAND_STEP,
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: "Built for race day",
      pdpQualitySubline:
        "We confirm the fit, the chamois and the seam between the upper and lower on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Race fit checked on your sample",
        "Upper-to-lower seam join set and confirmed on your sample",
        CHAMOIS_POINT,
        GRAPHICS_POINT,
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "gilet",
      cardTitle: "Custom Cycling Gilet",
      cardSubline: "Windproof sleeveless vest, packable",
      image: "",
      imageAlt: "Custom Cycling Gilet",
      href: `${PLP}/gilet`,
      sku: "CAP-CYC-06",
      pdpHeading: "Custom Cycling Gilet Manufacturer",
      pdpMetaTitle: "Custom Cycling Gilet Manufacturer",
      pdpDescription:
        "Cycling gilet, custom and private label, a windproof sleeveless vest that packs into a jersey pocket, with a breathable mesh back panel option, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cycling Gilet"),
      pdpMetaDescription:
        "Custom cycling gilet manufacturer: windproof, packable sleeveless vest with a mesh back option, full-zip, rear pockets, MOQ 50 pieces, DDP to 20+ countries.",
      material: "Windproof, water-resistant polyester shell with a mesh or knit back option",
      pdpFabricPills: ["Windproof polyester shell", "Mesh back panel", "Recycled polyester"],
      pdpCustomizationPills: ["Packable", "Mesh or shell back", "Printed logos", "Custom labels"],
      faqs: [
        {
          q: "What is the difference between a cycling gilet and a cycling vest?",
          a: "A cycling gilet and a cycling vest are the same garment: gilet is the common name in the UK and Europe, vest in the US. Ours is a windproof sleeveless layer that packs into a jersey pocket.",
        },
        {
          q: "Can the cycling gilet have a mesh back?",
          a: "Yes. The cycling gilet can pair a windproof front with a breathable mesh or knit back for warmer days, or a full shell back for cold descents, to your spec.",
        },
        {
          q: "Does the cycling gilet pack into a jersey pocket?",
          a: "Yes. The cycling gilet is cut from a light windproof shell that packs into a jersey pocket, and the packed size is checked on your sample.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Cycling Thermal Jacket", slug: "thermal-jacket", href: PLP },
        { label: "Custom Short-Sleeve Cycling Jersey", slug: "jersey", href: PLP },
        { label: "Custom Long-Sleeve Cycling Jersey", slug: "long-sleeve-jersey", href: PLP },
        { label: "Custom Cycling Bib Shorts", slug: "bib-shorts", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Cycling gilet, sleeveless vest (base type)" },
        { label: "Fabric", value: "Windproof, water-resistant polyester shell front" },
        { label: "Weight", value: PENDING_WEIGHT },
        { label: "Back panel", value: "Breathable mesh or knit back, or a full shell back, to your spec" },
        {
          label: "Fit",
          value:
            "Close cut that does not flap in the wind, with a dropped back hem, graded XS to 5XL, men's and women's blocks",
        },
        { label: "Collar", value: "Stand collar" },
        { label: "Zip", value: "Full-length front zip with a zip garage at the collar" },
        {
          label: "Pockets",
          value: "Rear pockets or pass-through openings to the jersey pockets underneath, to your spec",
        },
        { label: "Packability", value: "Packs into a jersey pocket" },
        {
          label: "Decoration and branding",
          value: "Printed team and sponsor logos, Pantone matched, print method confirmed on your sample",
        },
      ],
      specificationsImage: { alt: "Custom Cycling Gilet" },
      pdpCustomizationSteps: customizeSteps([
        ["Back panel", "Mesh, knit or full shell back"],
        ["Fabric", "Windproof water-resistant polyester, sourced or matched to your reference"],
        ["Fit", "Close race cut with a dropped back hem"],
        ["Pockets", "Rear pockets or pass-through openings"],
        ["Logos and color", "Printed team and sponsor logos, Pantone matched"],
        ["Trims and finish", "Zip pullers, printed care labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline:
        "We confirm the shell fabric, the fit and the packed size on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Shell fabric and back panel approved on your sample",
        "Fit checked so the gilet does not flap in the wind",
        "Packed size checked so it fits a jersey pocket",
        "Zips function-tested before bulk",
        AQL_POINT,
      ],
    },
    {
      status: "draft",
      slug: "thermal-jacket",
      cardTitle: "Custom Cycling Thermal Jacket",
      cardSubline: "Windproof winter jacket, water-resistant shell",
      image: "",
      imageAlt: "Custom Cycling Thermal Jacket",
      href: `${PLP}/thermal-jacket`,
      sku: "CAP-CYC-07",
      pdpHeading: "Custom Cycling Thermal Jacket Manufacturer",
      pdpMetaTitle: "Custom Cycling Thermal Jacket Manufacturer",
      pdpDescription:
        "Cycling thermal jacket, custom and private label, a winter riding jacket with a windproof, water-resistant front and a brushed thermal lining, cut longer at the back for the riding position, made to your brand in Sialkot, Pakistan.",
      images: gallery("Custom Cycling Thermal Jacket"),
      pdpMetaDescription:
        "Custom cycling thermal jacket manufacturer: windproof, water-resistant shell, brushed thermal lining, drop-tail hem, rear pockets, MOQ 50, DDP to 20+ countries.",
      material: "Windproof, water-resistant polyester shell with a brushed thermal knit lining",
      pdpFabricPills: ["Windproof polyester shell", "Brushed thermal lining", "Stretch woven panels", "Recycled polyester"],
      pdpCustomizationPills: ["Race or club cut", "Rear pockets", "Printed logos", "Custom labels"],
      faqs: [
        {
          q: "How does the cycling thermal jacket handle wind and rain?",
          a: "The cycling thermal jacket has a windproof front and a water-resistant shell that sheds light rain, with a brushed thermal lining for warmth. The shell fabric is confirmed on your sample.",
        },
        {
          q: "What is the difference between the cycling thermal jacket and the gilet?",
          a: "The cycling thermal jacket has sleeves and a brushed thermal lining for cold rides, while the gilet is a light sleeveless windproof layer that packs into a jersey pocket. Both can be made in the same order.",
        },
        {
          q: "Can the cycling thermal jacket match our jerseys?",
          a: "Yes. The cycling thermal jacket is Pantone matched to your jerseys and bibs, with printed team and sponsor logos, and all of them can be produced in the same order.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Cycling Gilet", slug: "gilet", href: PLP },
        { label: "Custom Long-Sleeve Cycling Jersey", slug: "long-sleeve-jersey", href: PLP },
        { label: "Custom Cycling Bib Tights", slug: "bib-tights", href: PLP },
        { label: "Custom Short-Sleeve Cycling Jersey", slug: "jersey", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Cycling thermal jacket, full zip (base type)" },
        {
          label: "Fabric",
          value: "Windproof, water-resistant polyester shell front with a brushed thermal knit lining or back",
        },
        { label: "Weight", value: PENDING_WEIGHT },
        {
          label: "Fit",
          value: "Race or club cut over a jersey or base layer, graded XS to 5XL, men's and women's blocks",
        },
        {
          label: "Hem",
          value: "Drop-tail with a gripper band, so the lower back stays covered in the riding position",
        },
        { label: "Collar", value: "Stand collar with a zip garage" },
        { label: "Zip", value: "Full-length front zip, two-way zip optional" },
        { label: "Cuffs", value: "Close elasticated cuffs, gripper finish optional" },
        { label: "Pockets", value: "Three rear pockets, zipped security pocket optional" },
        {
          label: "Decoration and branding",
          value: "Printed team and sponsor logos, Pantone matched, print method confirmed on your sample",
        },
      ],
      specificationsImage: { alt: "Custom Cycling Thermal Jacket" },
      pdpCustomizationSteps: customizeSteps([
        [
          "Fabric",
          "Windproof water-resistant shell and brushed thermal lining, sourced or matched to your reference",
        ],
        ["Fit", "Race or club cut with a drop-tail hem"],
        ["Zip and collar", "Full-length or two-way zip, stand collar with a zip garage"],
        ["Pockets", "Three rear pockets, zipped security pocket optional"],
        ["Logos and color", "Printed team and sponsor logos, Pantone matched to your kit"],
        ["Trims and finish", "Zip pullers, printed care labels, hangtags"],
        PACKAGING_STEP,
      ]),
      pdpQualityHeading: QUALITY_HEADING,
      pdpQualitySubline: "We confirm the shell, the lining and the fit on your sample before the full order is produced.",
      pdpQualityPoints: [
        "Shell and lining approved on your sample",
        "Fit checked in the riding position, with the lower back covered",
        "Zips function-tested before bulk",
        "Color matched to the rest of your kit",
        AQL_POINT,
      ],
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, Teamwear sports only,
  // closest sports first.
  relatedLinks: [
    { label: "Volleyball", href: "/capriowear/teamwear/volleyball" },
    { label: "Soccer", href: "/capriowear/teamwear/soccer" },
    { label: "Rash Guards & Fight Wear", href: "/capriowear/teamwear/fight-wear" },
    { label: "Basketball", href: "/capriowear/teamwear/basketball" },
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
  ],
};
