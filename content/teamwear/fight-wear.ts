// content/teamwear/fight-wear.ts
// Tenth and final Teamwear category, same `Category` shape as every prior
// Teamwear category (content/teamwear/*.ts) and every Activewear category
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
// Cut-and-sew scope (owner standing rule, set on Cricket) -- closures and
// grip bands (hook-and-loop, drawcord, elastic waistband, silicone grip
// liner) are sourced trims sewn into a shell we cut and sew in-house, not
// standalone products, so none is a style card here. Muay Thai/board-style
// shorts are also excluded (owner spec: a genuine research gap on fabric
// and construction -- offered on request only, never a spec'd PDP until
// confirmed and sampled). A no-gi grappling top is a naming variant of the
// rash guard, not a separate build, so it isn't a second card either.
//
// Uses `structuredBlock` (type "decoration"), the same field/shape every
// prior Teamwear category uses -- no component or type change needed here.
//
// No GSM figure is ever stated as a hard number (owner spec) -- the rash
// guard knit is given as a blend range (roughly 82/18 to 85/15), never a
// weight, and every fabric-weight reference is worded as "tuned to the
// discipline/confirmed on your sample."
//
// Brand-name-in-metadata rule (owner spec, this session): every
// metaDescription/pdpMetaDescription here ends "Capriowear." or "DDP
// worldwide.", never a bare "Caprio Sports." sign-off -- "Caprio Sports"
// appears only inside the full identity line, which lives in
// content/site.ts's companyIdentity and is appended verbatim by
// categoryEntityFaq() (content/activewear/pdpShared.ts), not retyped here.
//
// Punctuation rule (owner spec, site-wide sweep): headings, eyebrows, labels
// and short fact/chip lines carry no trailing period; periods stay only on
// real sentences (leads, FAQ answers, descriptions, the fabric footnote, the
// Specifications subtitle, the final-CTA subline). Written period-clean from
// the start here, not swept after the fact.
//
// Highlight rule (owner spec, standing since Cricket/Basketball): the
// decoration structured block's own note and the main fabric table's own
// footnote each bold exactly one short, genuinely important phrase
// (`NoteSegment[]`, not a plain string) -- not the whole sentence.
//
// American spelling, no en/em dashes, "spandex" never "elastane"/"Lycra",
// never "seamless" -- confirmed throughout, same standing sitewide rules
// every category follows. Naming uses gym and athlete NAME fields, never a
// squad number (owner spec, fight-wear-specific: this discipline is named
// by gym and athlete, not roster numbers).
import type { Category } from "../activewear/types";

export const fightWear: Category = {
  slug: "fight-wear",
  group: "Teamwear",
  menuLabel: "Rash Guards & Fight Wear",
  manufacturerNoun: "Rash Guard & Fight Wear",
  productNounPlural: "rash guards and fight wear",
  entityExampleStyles: "rash guards, fight shorts, grappling spats, and compression tops",
  entityFabrics: "sublimated poly-spandex knits",
  // H1 and metaTitle are deliberately different strings here (owner spec):
  // the on-page H1 is the broader category name, the title tag leads with
  // the higher-search-volume "BJJ" term to avoid a generic "uniform/kit"
  // collision, with "MMA" carried in the meta as the secondary term.
  h1: "Custom Rash Guard & Fight Wear Manufacturer",
  metaTitle: "Custom BJJ Rash Guard Manufacturer",
  metaDescription:
    "Custom BJJ and MMA rash guard manufacturer, private label. IBJJF-legal rash guards, fight shorts and grappling spats, sublimated, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private label", "DDP to 40+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Sublimated poly-spandex rash guard knit",
      bestFor: "Rash guards, no-gi tops",
      performance: "Stretch, holds a full-color print, confirmed weight on your sample",
    },
    {
      fabric: "Sublimated compression knit",
      bestFor: "Grappling spats, compression tops",
      performance: "Close compression fit, full range of motion",
    },
    {
      fabric: "Woven poly-spandex shell",
      bestFor: "MMA fight shorts",
      performance: "Light, durable, prints cleanly, cut for kicks and ground work",
    },
    {
      fabric: "Poly-satin shell",
      bestFor: "Muay Thai shorts, on request",
      performance: "Flared high-cut leg, side slit for kick range",
    },
  ],
  fabricNote: [
    { text: "Poly and spandex based, and every knit and shell takes full-color sublimation. Weights are tuned to the discipline and " },
    { text: "confirmed on your sample", bold: true },
    { text: ". Closures and grip bands are trims we source and sew into a shell we cut and sew in-house. Swatches before every bulk run." },
  ],
  fabricPills: ["Rash guard knit", "Compression knit", "Woven shell", "Poly-satin shell"],
  structuredBlock: {
    type: "decoration",
    eyebrow: "DECORATION",
    heading: "The right method for each part of the kit",
    rows: [
      {
        method: "Full-dye sublimation",
        bestFor: "Whole-garment graphics, gradients, rank and division colors, gym and athlete names",
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
        bestFor: "Athlete names over a printed design",
        notes: "Applied per athlete without re-printing the whole design",
      },
    ],
    note: [
      { text: "Fight wear uses full sublimation the most, because " },
      { text: "rank and division colors have to be built accurately into the print", bold: true },
      { text: " and carried across a matched rash guard and short set." },
    ],
  },
  qualityHeading: "Built to hold up on the mat",
  qualitySubline: "We confirm the seams, the fit and the grip on your sample before the full order is produced.",
  qualityPoints: [
    "Flatlock seams pull-tested for grip and mat-abrasion stress",
    "Full-dye graphics dyed into the fabric, they will not crack, peel or fade with mat contact",
    "Shell cut and sewn in-house, closures and grip bands sourced and set to hold through a full range of motion",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Sublimated poly-spandex rash guard and compression knits, woven poly-spandex short shells",
    },
    {
      title: "Print",
      body: "Full-dye sublimation, unlimited colors and gradients, Pantone matching, rank and division colors built into the print",
    },
    {
      title: "Naming and fit",
      body: "Gym and athlete name built into the design, men's, women's or unisex pattern blocks, silicone grip hems",
    },
    {
      title: "Finishing",
      body: "Concealed short closures, your woven and care labels, hangtags, retail-ready packaging",
    },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom rash guards and fight wear?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Are your rash guards IBJJF-legal for no-gi competition?",
      a: "Yes, we build to the IBJJF rules. A no-gi rash guard must carry at least 10 percent of the athlete's rank color or be fully that color, cover the torso to the shorts waistband, and stay within the black, white, or black-and-white division colors. We build rank and division colors accurately into the sublimation print and confirm them on your proof.",
    },
    {
      q: "How does personalization work here, names or numbers?",
      a: "Gym and athlete name, not numbers. Fight wear is named by gym and athlete, so we build gym branding and athlete-name fields into the design rather than a squad number.",
    },
    {
      q: "Are your fight shorts compliant with amateur MMA rules?",
      a: "Yes. Amateur MMA rules bar exposed hook-and-loop, pockets and zippers, so we build the shorts with a concealed closure and no exposed hardware, and keep the hem above the knee.",
    },
    {
      q: "What makes the seams durable enough for daily mat use?",
      a: "Flatlock seams. They sit flat to resist chafing and mat abrasion where the garment is gripped and dragged, and we pull-test them on your sample before bulk.",
    },
    {
      q: "Which fabrics do you use, and are they sublimation-ready?",
      a: "A sublimated poly-spandex knit for rash guards and compression tops, a sublimated compression knit for spats, and a woven poly-spandex shell for fight shorts. All take full-color sublimation; weights are confirmed on your sample.",
    },
    {
      q: "How long do samples and bulk take, and how do I start?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days; bulk depends on quantity and customization, confirmed on your quote. To start, send your tech pack, sketch or a reference rash guard by email or WhatsApp and we reply within 24 hours.",
    },
  ],
  ctaReferenceNoun: "rash guard",
  // All 5 styles ship "draft" (owner spec): zero published at launch, so no
  // PDP routes generate, nothing enters the sitemap, and ItemList/
  // CollectionPage is omitted from the PLP entirely (see
  // app/teamwear/[sport]/page.tsx's own `publishedStyleCards` gate) -- same
  // pattern every prior Teamwear category ships with today. Full PDP content
  // is kept for the two hero styles (Long-Sleeve Rash Guard, MMA Fight
  // Shorts) so either can flip to "published" on its own once confirmed and
  // sampled.
  styleCards: [
    {
      status: "draft",
      slug: "long-sleeve-rash-guard",
      cardTitle: "Custom Long-Sleeve Rash Guard",
      cardSubline: "Sublimated flatlock rash guard, IBJJF-legal build, silicone grip hem",
      image: "",
      imageAlt: "Custom long-sleeve rash guard, sublimated flatlock, IBJJF-legal build, silicone grip hem",
      href: "/teamwear/fight-wear/long-sleeve-rash-guard",
      pdpTitle: "Long-Sleeve Rash Guard",
      sku: "CAP-FGT-01",
      pdpHeading: "Custom Long-Sleeve Rash Guard Manufacturer",
      pdpDescription:
        "Long-sleeve rash guard, custom and private label, a skin-tight full-dye sublimated poly-spandex knit with flatlock seams and a silicone grip hem, built to the IBJJF no-gi rules, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Long-sleeve rash guard, front view" },
        { alt: "Long-sleeve rash guard, back view" },
        { alt: "Long-sleeve rash guard, silicone grip hem detail" },
        { alt: "Long-sleeve rash guard, flatlock seam detail" },
        { alt: "Long-sleeve rash guard, sponsor and gym logo placement" },
        { alt: "Long-sleeve rash guard, fabric close-up" },
      ],
      pdpMetaTitle: "Custom BJJ Rash Guard Manufacturer",
      pdpMetaDescription:
        "Custom BJJ and MMA rash guard manufacturer, IBJJF-legal build, full-dye sublimated, flatlock seams, silicone grip hem, low MOQ. DDP worldwide.",
      material: "Sublimated poly-spandex knit, roughly 82/18 to 85/15",
      faqs: [
        {
          q: "Is this rash guard IBJJF-legal for no-gi?",
          a: "Yes. We build it skin-tight, long enough to reach the shorts waistband, with at least 10 percent of the rank color or fully the rank color, and within the black, white, or black-and-white division colors. We confirm the colors on your proof.",
        },
        {
          q: "How does the rank-color rule work in a custom design?",
          a: "We build the required rank or division color into the sublimation print as part of the artwork, so the compliance color is dyed into the fabric rather than added on. You approve it on the digital proof.",
        },
        {
          q: "Why long sleeve over short sleeve?",
          a: "Long sleeve adds arm coverage for no-gi grip reduction and mat protection; short sleeve is the same build for warmer training. We make both.",
        },
      ],
      relatedStyleTags: [
        { label: "Fight Shorts", href: "/teamwear/fight-wear/fight-shorts" },
        { label: "Short-Sleeve Rash Guard", href: "/teamwear/fight-wear" },
        { label: "Grappling Spats", href: "/teamwear/fight-wear" },
        { label: "See All", href: "/teamwear/fight-wear" },
      ],
      specifications: [
        { label: "Style", value: "Long-sleeve rash guard (base type)" },
        { label: "Fabric", value: "Sublimated poly-spandex knit, roughly 82/18 to 85/15" },
        { label: "Weight", value: "Tuned to the discipline and confirmed on your sample; a lighter knit for airflow, a firmer knit for a more locked-in fit" },
        { label: "Fit", value: "Skin-tight compression, IBJJF-legal cut, long enough to cover the torso to the shorts waistband" },
        { label: "Seams", value: "Flatlock, sits flat to resist chafing and mat abrasion" },
        { label: "Hem", value: "Silicone grip band to stop ride-up during grappling" },
        { label: "Colors", value: "Full-dye sublimation, rank and division colors built into the print" },
        { label: "Sleeve", value: "Long, or the same build in short sleeve" },
        { label: "Sizing", value: "Graded XS to 4XL men's, XS to XXL women's, distinct women's block" },
        { label: "Branding", value: "Gym and athlete name, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "Long-sleeve rash guard, construction detail" },
    },
    {
      status: "draft",
      slug: "fight-shorts",
      cardTitle: "Custom MMA Fight Shorts",
      cardSubline: "Woven shell, concealed closure, gusset for full range",
      image: "",
      imageAlt: "Custom MMA fight shorts, woven shell, concealed closure, gusset for full range",
      href: "/teamwear/fight-wear/fight-shorts",
      pdpTitle: "MMA Fight Shorts",
      sku: "CAP-FGT-02",
      pdpHeading: "Custom MMA Fight Shorts Manufacturer",
      pdpDescription:
        "MMA fight shorts, custom and private label, a woven poly-spandex shell with a concealed closure, a diamond crotch gusset and an open-slit side seam for kicks and ground work, sublimated and made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "MMA fight shorts, front view" },
        { alt: "MMA fight shorts, back view" },
        { alt: "MMA fight shorts, gusset detail" },
        { alt: "MMA fight shorts, waistband and closure detail" },
        { alt: "MMA fight shorts, fabric close-up" },
      ],
      pdpMetaTitle: "Custom MMA Fight Shorts Manufacturer",
      pdpMetaDescription:
        "Custom MMA fight shorts manufacturer, woven poly-spandex shell, concealed closure, gusset for full range, sublimated, low MOQ. DDP worldwide.",
      material: "Woven poly-spandex shell",
      faqs: [
        {
          q: "Are these shorts legal for sanctioned amateur MMA?",
          a: "Yes. We build them with a concealed closure and no exposed hook-and-loop, pockets or zippers, and keep the hem above the knee, to the amateur MMA rule. We confirm the build on your sample.",
        },
        {
          q: "What is the gusset and side slit for?",
          a: "A diamond crotch gusset and an open-slit side seam let the leg move freely for kicks, takedowns and ground work, without the seam binding or tearing.",
        },
        {
          q: "Is the closure hardware made in-house or sourced?",
          a: "The shell is cut and sewn in-house. The hook-and-loop, drawcord and any grip band are trims we source and sew into the shell, set to hold through a full range of motion.",
        },
      ],
      relatedStyleTags: [
        { label: "Long-Sleeve Rash Guard", href: "/teamwear/fight-wear/long-sleeve-rash-guard" },
        { label: "Grappling Spats", href: "/teamwear/fight-wear" },
        { label: "Compression Top", href: "/teamwear/fight-wear" },
        { label: "See All", href: "/teamwear/fight-wear" },
      ],
      specifications: [
        { label: "Style", value: "MMA fight shorts (base type)" },
        { label: "Fabric", value: "Woven poly-spandex shell, weight confirmed on your sample" },
        { label: "Closure", value: "Hook-and-loop fly with an internal drawcord, concealed with no exposed hardware for sanctioned play" },
        { label: "Gusset", value: "Diamond or triangle crotch gusset for full-range kicks and ground work" },
        { label: "Side", value: "Open-slit or hook-and-loop side seam for leg range of motion" },
        { label: "Waistband", value: "Elastic waistband, optional silicone grip liner to stop ride-up" },
        { label: "Hem", value: "Above the knee, to the amateur MMA rule" },
        { label: "Decoration", value: "Full-dye sublimation, matched to the rash guard" },
        { label: "Sizing", value: "Alpha S to 2XL with a waist-inch and length per size" },
        { label: "Branding", value: "Gym and athlete name, sponsor logos, manufacturer mark, woven and care labels, packaging" },
      ],
      specificationsImage: { alt: "MMA fight shorts, construction detail" },
    },
    {
      status: "draft",
      slug: "short-sleeve-rash-guard",
      cardTitle: "Custom Short-Sleeve Rash Guard",
      cardSubline: "Same build, shorter sleeve",
      image: "",
      imageAlt: "Custom short-sleeve rash guard, same build, shorter sleeve",
      href: "/teamwear/fight-wear/short-sleeve-rash-guard",
    },
    {
      status: "draft",
      slug: "spats",
      cardTitle: "Custom Grappling Spats",
      cardSubline: "Full-leg sublimated compression, flatlock seams",
      image: "",
      imageAlt: "Custom grappling spats, full-leg sublimated compression, flatlock seams",
      href: "/teamwear/fight-wear/spats",
    },
    {
      status: "draft",
      slug: "compression-top",
      cardTitle: "Custom Compression Top",
      cardSubline: "No-gi base-layer top, same knit as the rash guard",
      image: "",
      imageAlt: "Custom compression top, no-gi base-layer top, same knit as the rash guard",
      href: "/teamwear/fight-wear/compression-top",
    },
  ],
  // Only live pages (owner spec: "Never link an unbuilt PLP or unpublished
  // PDP") -- every already-built sibling Teamwear PLP and one real
  // Activewear PLP.
  relatedLinks: [
    { label: "Cricket", href: "/teamwear/cricket" },
    { label: "Basketball", href: "/teamwear/basketball" },
    { label: "Rugby", href: "/teamwear/rugby" },
    { label: "Baseball", href: "/teamwear/baseball" },
    { label: "Volleyball", href: "/teamwear/volleyball" },
    { label: "Soccer", href: "/teamwear/soccer" },
    { label: "Football", href: "/teamwear/football" },
    { label: "Ice Hockey", href: "/teamwear/ice-hockey" },
    { label: "Cycling", href: "/teamwear/cycling" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
  ],
};
