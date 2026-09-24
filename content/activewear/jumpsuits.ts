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
// Grid order is SKU-number order, 1 to 6. Second and final category under
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
  // 6 card-only drafts, SKU-number order (see header comment). Alt text is
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
