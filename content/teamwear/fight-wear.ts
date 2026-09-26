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
import { faqGetStarted } from "../getStarted";

export const fightWear: Category = {
  slug: "fight-wear",
  group: "Teamwear",
  menuLabel: "Rash Guards & Fight Wear",
  // "and", not "&" (owner spec, 2026-09-06): this feeds the auto-built
  // entity-FAQ sentence's lowercase inline noun ("a custom rash guard and
  // fight wear manufacturer"), where an ampersand read oddly verbatim in
  // prose. `h1`/`menuLabel` below are separate, explicit fields -- neither
  // derives from this one -- so they keep the "&" form ("Rash Guards &
  // Fight Wear" / "Custom Rash Guard & Fight Wear Manufacturer")
  // unaffected by this change.
  manufacturerNoun: "Rash Guard and Fight Wear",
  productNounPlural: "rash guards and fight wear",
  entityExampleStyles: "rash guards, fight shorts, grappling spats, and compression tops",
  entityFabrics: "sublimated poly-spandex knits",
  // Combat-sports-specific audience (owner spec, 2026-09-06) -- this
  // category's real buyers are combat-sports brands and academies, not the
  // generic activewear/teamwear-brand audience `categoryEntityFaq()`'s own
  // default clause names. See that function's own comment
  // (content/activewear/pdpShared.ts) and `Category.audienceClause`'s own
  // comment (content/activewear/types.ts).
  audienceClause: "for combat-sports brands, academies and teamwear suppliers worldwide",
  // H1 and metaTitle are deliberately different strings here (owner spec):
  // the on-page H1 is the broader category name, the title tag leads with
  // the higher-search-volume "BJJ" term to avoid a generic "uniform/kit"
  // collision, with "MMA" carried in the meta as the secondary term.
  h1: "Custom Rash Guard & Fight Wear Manufacturer",
  metaTitle: "Custom BJJ Rash Guard Manufacturer",
  metaDescription:
    "Custom BJJ and MMA rash guard manufacturer: sublimated rash guards, fight shorts and spats built to your competition's rules, MOQ 50, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
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
      q: "How long do samples and bulk take?",
      a: "A digital mockup in a few business days, a physical sample in 10 to 14 days; bulk depends on quantity and customization, confirmed on your quote.",
    },
    faqGetStarted,
  ],
  ctaReferenceNoun: "rash guard",
  // All 5 styles ship "draft" and are card-only for now: no PDP entry, so no
  // route, and each card renders as a non-link. The two legacy draft PDPs
  // (unaudited copy) were removed on 2026-09-26 when the Teamwear draft-PDP
  // rule became the default; this sport's rebuild adds real PDP content per
  // style, and each card links as soon as its PDP entry exists.
  styleCards: [
    {
      status: "draft",
      slug: "long-sleeve-rash-guard",
      cardTitle: "Custom Long-Sleeve Rash Guard",
      cardSubline: "Sublimated flatlock rash guard, silicone grip hem",
      image: "",
      imageAlt: "Custom Long-Sleeve Rash Guard",
      href: "/capriowear/teamwear/fight-wear/long-sleeve-rash-guard",
      sku: "CAP-FGT-01",
    },
    {
      status: "draft",
      slug: "fight-shorts",
      cardTitle: "Custom MMA Fight Shorts",
      cardSubline: "Woven shell, concealed closure, gusset for full range",
      image: "",
      imageAlt: "Custom MMA fight shorts, woven shell, concealed closure, gusset for full range",
      href: "/capriowear/teamwear/fight-wear/fight-shorts",
      sku: "CAP-FGT-02",
    },
    {
      status: "draft",
      slug: "short-sleeve-rash-guard",
      cardTitle: "Custom Short-Sleeve Rash Guard",
      cardSubline: "Same build, shorter sleeve",
      image: "",
      imageAlt: "Custom short-sleeve rash guard, same build, shorter sleeve",
      href: "/capriowear/teamwear/fight-wear/short-sleeve-rash-guard",
    },
    {
      status: "draft",
      slug: "spats",
      cardTitle: "Custom Grappling Spats",
      cardSubline: "Full-leg sublimated compression, flatlock seams",
      image: "",
      imageAlt: "Custom grappling spats, full-leg sublimated compression, flatlock seams",
      href: "/capriowear/teamwear/fight-wear/spats",
    },
    {
      status: "draft",
      slug: "compression-top",
      cardTitle: "Custom Compression Top",
      cardSubline: "No-gi base-layer top, same knit as the rash guard",
      image: "",
      imageAlt: "Custom compression top, no-gi base-layer top, same knit as the rash guard",
      href: "/capriowear/teamwear/fight-wear/compression-top",
    },
  ],
  // "You may also be interested in" (owner rule, 2026-09-23): max 5, Teamwear sports only,
  // closest sports first.
  relatedLinks: [
    { label: "Rugby", href: "/capriowear/teamwear/rugby" },
    { label: "Cycling", href: "/capriowear/teamwear/cycling" },
    { label: "Football", href: "/capriowear/teamwear/football" },
    { label: "Ice Hockey", href: "/capriowear/teamwear/ice-hockey" },
    { label: "Volleyball", href: "/capriowear/teamwear/volleyball" },
  ],
};
