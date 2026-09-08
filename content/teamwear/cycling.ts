// content/teamwear/cycling.ts
// Ninth Teamwear category, same `Category` shape as every prior Teamwear
// category (content/teamwear/*.ts) and every Activewear category
// (content/activewear/types.ts) -- a pure content/data drop: no edits to
// app/teamwear/[sport]/page.tsx or app/teamwear/[sport]/[style]/page.tsx,
// only this file plus one line in ./sports.ts.
//
// PDP publish state (owner spec): every style ships "draft". Zero published
// styles at launch means the PLP stays live/indexed, every card renders
// non-clickable, no PDP routes generate, nothing is in the sitemap, and
// CollectionPage/ItemList is omitted from the PLP entirely
// (app/teamwear/[sport]/page.tsx already conditions that block on
// `publishedStyleCards.length > 0`, no page code change needed here).
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

export const cycling: Category = {
  slug: "cycling",
  group: "Teamwear",
  menuLabel: "Cycling",
  manufacturerNoun: "Cycling Kit",
  productNounPlural: "cycling kits",
  entityExampleStyles: "jerseys, bib shorts, bib tights, and skinsuits",
  entityFabrics: "lightweight aero polyester and compression knits",
  h1: "Custom Cycling Kit Manufacturer",
  metaTitle: "Custom Cycling Kit Manufacturer",
  metaDescription:
    "Custom cycling kit manufacturer. Race-fit jerseys with a drop-tail hem, bib shorts with a chamois pad, sublimated, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Lightweight aero polyester with mesh",
      bestFor: "Race and club jerseys",
      performance: "Light, breathable, prints cleanly",
    },
    {
      fabric: "High-spandex compression knit",
      bestFor: "Bib shorts, waist shorts, bib tights",
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
    { text: "Polyester and spandex based, and jerseys take full-color sublimation. Weights are tuned to your riding and " },
    { text: "confirmed on your sample", bold: true },
    { text: ". The chamois pad is a specialized foam or foam-gel component we source from dedicated pad makers and sew into the short. Swatches before every bulk run." },
  ],
  fabricPills: ["Aero polyester", "Compression knit", "Brushed thermal", "Windproof shell"],
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
    "Full-dye graphics dyed into the fabric, they will not crack, peel or fade",
    "Bib short shell sewn in-house, the chamois pad sourced and set with flatlock seams",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Lightweight aero polyester jerseys, high-spandex compression bib and short knits, brushed thermal and windproof shells",
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
      a: "Bibs replace the waistband with mesh shoulder straps, so nothing digs in or restricts breathing on a long ride, the pad stays in place, and less heat is trapped. We make both, and bibs are the standard for longer rides.",
    },
    {
      q: "Why is a cycling jersey cut longer in the back?",
      a: "It's a drop-tail hem: the rear panel runs longer than the front, so it stays covering your lower back when you're leaned forward in the riding position, rather than riding up.",
    },
    {
      q: "How do we choose chamois density and thickness?",
      a: "By ride length. Lighter, thinner pads suit short rides; higher-density, thicker multi-density pads suit long endurance rides. We fit the pad you choose and confirm it on your sample.",
    },
    {
      q: "Are men's and women's pads actually different?",
      a: "Yes, they are genuinely different shapes, not the same pad resized. Women's pads are wider at the rear with anti-chafe wings, men's are narrower with forward-focused padding, and a unisex shape sits in between.",
    },
    {
      q: "Which fabrics do you use, and how is the kit matched?",
      a: "Lightweight aero polyester for jerseys, high-spandex compression knit for bibs and shorts, brushed thermal for winter, and a windproof shell for gilets and jackets. Weights are confirmed on your sample and the whole kit is color-matched.",
    },
    {
      q: "How long do samples and bulk take, and how do I start?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days; bulk depends on quantity and customization, confirmed on your quote. To start, send your tech pack, sketch or a reference kit by email or WhatsApp and we reply within 24 hours.",
    },
  ],
  ctaReferenceNoun: "kit",
  // All 7 styles ship "draft" (owner spec): zero published at launch, so no
  // PDP routes generate, nothing enters the sitemap, and ItemList/
  // CollectionPage is omitted from the PLP entirely (see
  // app/teamwear/[sport]/page.tsx's own `publishedStyleCards` gate) -- same
  // pattern every prior Teamwear category ships with today. Full PDP content
  // is kept for the two hero styles (Cycling Jersey, Bib Shorts) so either
  // can flip to "published" on its own once confirmed and sampled.
  styleCards: [
    {
      status: "draft",
      slug: "jersey",
      cardTitle: "Custom Cycling Jersey, Short Sleeve",
      cardSubline: "Sublimated aero fit, drop-tail hem, rear pockets",
      image: "",
      imageAlt: "Custom cycling jersey, short sleeve, sublimated aero fit, drop-tail hem, rear pockets",
      href: "/teamwear/cycling/jersey",
      pdpTitle: "Cycling Jersey",
      sku: "CAP-CYC-01",
      pdpHeading: "Custom Cycling Jersey Manufacturer",
      pdpDescription:
        "Cycling jersey, custom and private label, a lightweight full-dye sublimated aero jersey with a drop-tail hem and three rear pockets, in a race or club fit, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Cycling jersey, front view" },
        { alt: "Cycling jersey, back view with rear pockets" },
        { alt: "Cycling jersey, drop-tail hem detail" },
        { alt: "Cycling jersey, sleeve and gripper cuff detail" },
        { alt: "Cycling jersey, sponsor logo placement" },
        { alt: "Cycling jersey, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Cycling Jersey Manufacturer",
      pdpMetaDescription:
        "Custom cycling jersey manufacturer, full-dye sublimated race fit, drop-tail aero hem, three rear pockets, low MOQ. DDP worldwide.",
      material: "Lightweight aero polyester with mesh ventilation panels",
      faqs: [
        {
          q: "What is the difference between a race fit and a club fit?",
          a: "A race or aero fit is close and second-skin for less drag; a club or endurance fit runs a little more relaxed and longer for all-day comfort. We build either to your spec.",
        },
        {
          q: "What is a drop-tail hem?",
          a: "The rear panel is cut longer than the front so the lower back stays covered when you are leaned forward on the bike, rather than riding up.",
        },
        {
          q: "What are the rear pockets for?",
          a: "The standard three rear pockets carry food, tools and a phone. We reinforce the openings with elastic so they hold weight without sagging.",
        },
      ],
      relatedStyleTags: [
        { label: "Bib Shorts", href: "/teamwear/cycling/bib-shorts" },
        { label: "Long-Sleeve Jersey", href: "/teamwear/cycling" },
        { label: "Skinsuit", href: "/teamwear/cycling" },
        { label: "See All", href: "/teamwear/cycling" },
      ],
      specifications: [
        { label: "Style", value: "Cycling jersey, short sleeve (base type)" },
        { label: "Fabric", value: "Lightweight aero polyester with mesh ventilation panels" },
        { label: "Weight", value: "Tuned to your riding, confirmed on your sample; lighter for airflow, a little heavier for a firmer race fit" },
        { label: "Fit", value: "Race and aero, or a more relaxed club and endurance cut" },
        { label: "Hem", value: "Drop-tail, the rear runs longer than the front to cover the lower back in the riding position" },
        { label: "Sleeves", value: "Close-fitting, silicone gripper cuff optional" },
        { label: "Zip", value: "Full-length or partial front zip" },
        { label: "Pockets", value: "Three rear pockets, elastic-reinforced openings" },
        { label: "Decoration", value: "Full-dye sublimation, gradients, names and sponsor logos" },
        { label: "Sizing", value: "Graded XS to 5XL, men's and women's blocks" },
        { label: "Branding", value: "Team and sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Cycling jersey, construction detail" },
    },
    {
      status: "draft",
      slug: "bib-shorts",
      cardTitle: "Custom Cycling Bib Shorts",
      cardSubline: "Compression shell, sourced chamois pad, mesh bib straps",
      image: "",
      imageAlt: "Custom cycling bib shorts, compression shell, sourced chamois pad, mesh bib straps",
      href: "/teamwear/cycling/bib-shorts",
      pdpTitle: "Bib Shorts",
      sku: "CAP-CYC-02",
      pdpHeading: "Custom Cycling Bib Shorts Manufacturer",
      pdpDescription:
        "Cycling bib shorts, custom and private label, a high-spandex compression short with over-the-shoulder mesh bib straps and a chamois pad fitted to your ride, sewn in with flatlock seams, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Cycling bib shorts, front view" },
        { alt: "Cycling bib shorts, back view" },
        { alt: "Cycling bib shorts, mesh bib strap detail" },
        { alt: "Cycling bib shorts, chamois pad detail" },
        { alt: "Cycling bib shorts, leg gripper detail" },
      ],
      pdpMetaTitle: "Custom Cycling Bib Shorts Manufacturer",
      pdpMetaDescription:
        "Custom cycling bib shorts manufacturer, compression shell with a sourced chamois pad, flatlock seams, leg grippers, low MOQ. DDP worldwide.",
      material: "High-spandex compression knit",
      faqs: [
        {
          q: "Is the chamois pad made in-house or sourced?",
          a: "The pad is a specialized foam or foam-gel component from dedicated pad makers. We source it to your spec and sew it into a short shell we make in-house, with flatlock seams so nothing rubs.",
        },
        {
          q: "How do we pick the pad for our riders?",
          a: "By ride length and rider. Thinner, lighter pads for short rides; higher-density, thicker multi-density pads for long endurance rides; and a men's, women's or unisex shape. We confirm it on your sample.",
        },
        {
          q: "Can we get the same short as a waist short instead of a bib?",
          a: "Yes. The same short is built as a bib with mesh straps or as a waist short, whichever you prefer.",
        },
      ],
      relatedStyleTags: [
        { label: "Cycling Jersey", href: "/teamwear/cycling/jersey" },
        { label: "Bib Tights", href: "/teamwear/cycling" },
        { label: "Skinsuit", href: "/teamwear/cycling" },
        { label: "See All", href: "/teamwear/cycling" },
      ],
      specifications: [
        { label: "Style", value: "Cycling bib shorts (base type)" },
        { label: "Fabric", value: "High-spandex compression knit body" },
        { label: "Fit", value: "Race compression, close to the leg, confirmed on your sample" },
        { label: "Bib", value: "Over-the-shoulder mesh straps, no waistband, cut for the forward riding position" },
        { label: "Chamois", value: "A sourced foam or foam-gel pad; density and thickness to your ride length; men's, women's or unisex shape; sewn in with flatlock seams" },
        { label: "Leg hem", value: "Silicone gripper band to hold the leg in place" },
        { label: "Decoration", value: "Full-dye sublimation, matched to the jersey" },
        { label: "Color", value: "Full sublimation color range, Pantone matched" },
        { label: "Sizing", value: "Graded XS to 5XL, men's and women's blocks" },
        { label: "Branding", value: "Team and sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Cycling bib shorts, construction detail" },
    },
    {
      status: "draft",
      slug: "long-sleeve-jersey",
      cardTitle: "Custom Cycling Jersey, Long Sleeve",
      cardSubline: "Cooler-weather aero jersey",
      image: "",
      imageAlt: "Custom cycling jersey, long sleeve, cooler-weather aero jersey",
      href: "/teamwear/cycling/long-sleeve-jersey",
    },
    {
      status: "draft",
      slug: "bib-tights",
      cardTitle: "Custom Cycling Bib Tights",
      cardSubline: "Thermal full-leg, sourced chamois pad",
      image: "",
      imageAlt: "Custom cycling bib tights, thermal full-leg, sourced chamois pad",
      href: "/teamwear/cycling/bib-tights",
    },
    {
      status: "draft",
      slug: "skinsuit",
      cardTitle: "Custom Cycling Skinsuit",
      cardSubline: "One-piece aero race suit, sourced chamois pad",
      image: "",
      imageAlt: "Custom cycling skinsuit, one-piece aero race suit, sourced chamois pad",
      href: "/teamwear/cycling/skinsuit",
    },
    {
      status: "draft",
      slug: "gilet",
      cardTitle: "Custom Cycling Gilet",
      cardSubline: "Windproof sleeveless vest, packable",
      image: "",
      imageAlt: "Custom cycling gilet, windproof sleeveless vest, packable",
      href: "/teamwear/cycling/gilet",
    },
    {
      status: "draft",
      slug: "thermal-jacket",
      cardTitle: "Custom Cycling Thermal Jacket",
      cardSubline: "Wind and water-resistant winter jacket",
      image: "",
      imageAlt: "Custom cycling thermal jacket, wind and water-resistant winter jacket",
      href: "/teamwear/cycling/thermal-jacket",
    },
  ],
  // Only live pages (owner spec: "Never link an unbuilt PLP or unpublished
  // PDP") -- the live sibling Teamwear PLPs and real Activewear PLPs.
  relatedLinks: [
    { label: "Cricket", href: "/teamwear/cricket" },
    { label: "Basketball", href: "/teamwear/basketball" },
    { label: "Rugby", href: "/teamwear/rugby" },
    { label: "Baseball", href: "/teamwear/baseball" },
    { label: "Volleyball", href: "/teamwear/volleyball" },
    { label: "Soccer", href: "/teamwear/soccer" },
    { label: "Football", href: "/teamwear/football" },
    { label: "Ice Hockey", href: "/teamwear/ice-hockey" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
    { label: "Jackets", href: "/activewear/jackets" },
  ],
};
