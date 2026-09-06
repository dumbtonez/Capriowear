// content/activewear/jumpsuits.ts
// Seventeenth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every category
// before it (owner spec, 2026-09-03): no edits to app/activewear/
// [category]/[style]/page.tsx, app/sitemap.ts, or lib/schema.ts, only this
// file plus one line in ./categories.ts. Second and final category under
// the "SETS & ONE PIECES" mega-menu group (content/home.ts), after
// Bodysuits -- that group's own mega-menu href for Jumpsuits already
// points to /activewear/jumpsuits (confirmed before writing this file,
// same check every category since the Track Jackets & Zip-Ups mega-menu
// mismatch, 2026-09-03).
//
// No `weightTiers` block (owner spec, 2026-09-03: "does NOT use the
// reusable weight-tiers / mmHg / water block") -- field simply omitted,
// same as Bodysuits/Leggings/Sports Bras/Shorts/Tank Tops/Yoga Sets/Track
// Jackets & Zip-Ups.
//
// Two published styles at launch (owner spec: "publish full-length +
// cropped unitard first"), same Leggings-pilot/Bodysuits pattern -- no
// template change needed, StyleCard already supports any number of
// "published" entries. `defaultGenderFilter: "Women"` reuses the same
// field Bodysuits' own file introduced (Category.defaultGenderFilter,
// content/activewear/types.ts) -- no further component change needed.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave ("Share
// your tech pack, sketch or a reference jumpsuit. We'll come back within
// 24 hours with next steps.") -- standing rule, owner spec, 2026-09-02
// (see every category since Sweatshirts' own header comment and the
// decision log entries of that date): every category file uses Leggings'
// own ctaSubline verbatim, regardless of what a category's own brief
// supplies here.
//
// American spelling and no en/em dashes confirmed throughout, per this
// brief's own explicit rule -- audited out at write time, same standing
// sitewide rule every category follows.
import type { Category } from "./types";

export const jumpsuits: Category = {
  slug: "jumpsuits",
  group: "Activewear",
  menuLabel: "Jumpsuits",
  // Entity FAQ overrides (owner's exact given values, 2026-09-03).
  manufacturerNoun: "Jumpsuit",
  productNounPlural: "jumpsuits",
  entityExampleStyles: "full-length and cropped unitards, and biker-length rompers",
  entityFabrics: "nylon spandex and scuba knits",
  // H1/title lead with "Unitard" (SEO/AEO refresh, owner spec: "'jumpsuit'
  // alone ranks fashion/womenswear") -- "jumpsuit" kept as a secondary term
  // in the meta only, not in the H1/title.
  h1: "Custom Athletic Unitard Manufacturer",
  metaTitle: "Custom Athletic Unitard Manufacturer",
  metaDescription:
    "Custom athletic unitard manufacturer, private label jumpsuits, rompers and biketards, back zip or step-in, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 40+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  // Women's-led category (owner spec, 2026-09-03) -- see
  // Category.defaultGenderFilter's own comment.
  defaultGenderFilter: "Women",
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon or poly spandex knit",
      bestFor: "Soft, second-skin unitards and rompers",
      performance: "Four-way stretch, strong recovery, smooth opaque hand",
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
    {
      fabric: "Ribbed knit",
      bestFor: "Textured body or contrast panels",
      performance: "Structured stretch, holds shape",
    },
  ],
  fabricNote: [
    {
      text: "Body panels run nylon or poly spandex for a soft fitted one-piece, commonly 70 to 85% face fiber with 15 to 30% spandex. Scuba knit (a smooth structured double-knit, commonly 90 to 95% polyester with 5 to 10% spandex, 180 to 380 GSM) gives a more sculptural silhouette and is a distinct fabric from true neoprene, lighter and more breathable. Seamless and circular-knit jumpsuits exist in the market but sit outside our cut-and-sew scope. Swatches before every bulk run, and we can source or match a specific knit, structure or reference garment, confirmed on your sample.",
    },
  ],
  fabricPills: ["Nylon spandex", "Scuba knit", "Interlock", "Ribbed knit"],
  qualityHeading: "Built as one piece, tested to move",
  qualitySubline: "We test the entry, the gusset and the length on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Torso and leg length graded and checked across every size, not just the sample",
    "Entry method chosen for the use case, and a back zip checked so it does not restrict squatting, reaching or lunging",
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
      body: "Nylon or poly spandex knits, scuba or interlock for structure, ribbed knit, matte or shine finish",
    },
    { title: "Leg length and shape", body: "Full-length, cropped or biker-length, flared, tapered or boot-cut" },
    { title: "Fit and neckline", body: "Fitted or relaxed, scoop, high, halter, plunge or square neckline" },
    { title: "Entry", body: "Back zip, side zip, or step-in pull-on, chosen for your use case" },
    { title: "Closure", body: "Snap-button gusset for access, or sewn gusset" },
    { title: "Back and sleeve", body: "Closed, open or cross-back, sleeveless, short or long sleeve" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom jumpsuits?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between a unitard and a bodysuit?",
      a: "A jumpsuit or unitard continues from the torso into full, cropped or biker-length leg coverage. A bodysuit ends at the hip with a crotch closure. We make both.",
    },
    {
      q: "What entry methods do you offer, and which is best?",
      a: "Back zip, side zip, or a step-in pull-on. A back zip is easy to get into but the zip line does not stretch, so for high-movement athletic use a step-in preserves full stretch everywhere. We help you choose by use case.",
    },
    {
      q: "Is there a snap gusset for bathroom access?",
      a: "Yes, a snap-button gusset can be built for access regardless of the entry method, or the gusset can be fully sewn on simpler styles.",
    },
    {
      q: "Which fabrics do you use for jumpsuits?",
      a: "Nylon or poly spandex for a soft fitted one-piece, or scuba and interlock knits for a more structured, sculpted silhouette, in a matte or shine finish.",
    },
    {
      q: "What leg lengths and shapes can you make?",
      a: "Full-length, cropped, or biker-length, with flared, tapered or boot-cut legs, to your spec.",
    },
    {
      q: "Will the fabric show through when stretched?",
      a: "We confirm opacity under real stretch across the full leg on your sample before bulk, and can move to a higher weight or a lined panel where a color or fabric needs it.",
    },
    {
      q: "How do you get the fit right on a one-piece?",
      a: "We grade and test torso length and leg length together across the full size range, and can build a waist-seam construction where that grades more reliably than a seamless-torso panel.",
    },
    {
      q: "Can you match a specific fabric or a reference garment?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match, then confirm on your sample.",
    },
    {
      q: "What can I customize?",
      a: "Fabric and structure, leg length and shape, fit, neckline, back, sleeve, entry method, gusset closure, color and print, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label jumpsuits?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are jumpsuits sized?",
      a: "Alpha XS to 5XL, women's-led, with men's and unisex cuts by fit block. Torso and leg length are graded and checked across the full size range.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, 40+ countries. DDP to the US, UK, EU, Canada and Australia, with GSP+ 0% EU duty.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch or a reference jumpsuit by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // Standing CTA subline, same as every category (owner spec, 2026-09-02) --
  // see this file's own header comment for why this differs from the
  // brief's own given per-category line.
  ctaReferenceNoun: "jumpsuit",
  // Full-Length Unitard and Cropped Unitard published first (owner spec,
  // 2026-09-03), same Leggings-pilot/Bodysuits pattern (one or more real
  // PDPs, the rest "draft" -- a real name and one-line spec, no PDP
  // content yet, no generated route, excluded from sitemap/ItemList).
  // cardTitle form is "Custom [Style]", matching the owner's own given
  // titles exactly.
  styleCards: [
    {
      status: "published",
      slug: "full-length-unitard",
      cardTitle: "Custom Full-Length Unitard",
      cardSubline: "Full-length one-piece, fitted",
      image: "",
      imageAlt: "Custom full-length unitard, full-length one-piece, fitted",
      href: "/activewear/jumpsuits/full-length-unitard",
      pdpTitle: "Full-Length Unitard",
      sku: "CAP-JMP-01",
      pdpHeading: "Custom Full-Length Unitard Manufacturer",
      pdpDescription:
        "Fitted full-length one-piece from torso through the ankle, custom and private label, in nylon spandex or structured scuba knit, with a snap gusset and your choice of entry, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Full-length unitard, front view" },
        { alt: "Full-length unitard, back view" },
        { alt: "Full-length unitard, side profile" },
        { alt: "Full-length unitard, entry zip detail" },
        { alt: "Full-length unitard, gusset closure detail" },
        { alt: "Full-length unitard, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Full-Length Unitard Manufacturer",
      pdpMetaDescription:
        "Custom full-length unitard manufacturer, nylon spandex or scuba knit, back zip or step-in, snap gusset, low MOQ, full customization. DDP worldwide.",
      material: "Nylon or poly spandex knit, or scuba knit, 90 to 95% polyester, 5 to 10% spandex",
      faqs: [
        {
          q: "Should I choose a back zip or a step-in?",
          a: "A back zip is easy to get into, but the zip line does not stretch, so for high-movement training a step-in pull-on keeps full stretch everywhere. We help you pick by use case, and can also place the zip at the side.",
        },
        {
          q: "Is there a snap gusset?",
          a: "Yes, a snap-button gusset gives bathroom access regardless of the entry method, or it can be fully sewn.",
        },
        {
          q: "Will it show through when stretched?",
          a: "We confirm opacity under real stretch across the full leg on your sample, and can move to a higher weight, a scuba knit or a lined panel where a color needs it.",
        },
      ],
      relatedStyleTags: [
        { label: "Cropped Unitard", href: "/activewear/jumpsuits/cropped-unitard" },
        { label: "Biketard", href: "/activewear/jumpsuits" },
        { label: "Flared", href: "/activewear/jumpsuits" },
        { label: "Sleeveless", href: "/activewear/jumpsuits" },
        { label: "Open-Back", href: "/activewear/jumpsuits" },
        { label: "See All", href: "/activewear/jumpsuits" },
      ],
      specifications: [
        { label: "Composition", value: "One-piece unitard, torso through full-length leg (base type)" },
        { label: "Fabric", value: "Nylon or poly spandex knit, or scuba knit, 90 to 95% polyester, 5 to 10% spandex" },
        { label: "Finish", value: "Matte or shine" },
        { label: "Entry", value: "Back zip (base), side zip or step-in pull-on on request" },
        { label: "Gusset", value: "Snap-button gusset for access (standard), or sewn" },
        { label: "Waist", value: "Waist-seam or seamless-torso panel, waist-seam grades more reliably" },
        { label: "Neckline and back", value: "Scoop (base), high, halter, plunge or square, closed or open/cross-back" },
        { label: "Leg", value: "Full-length (base), cropped or biker-length, tapered, flared or boot-cut" },
        { label: "Branding", value: "Sublimation, screen, heat transfer, embroidery, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Full-length unitard, construction detail" },
    },
    {
      status: "published",
      slug: "cropped-unitard",
      cardTitle: "Custom Cropped Unitard",
      cardSubline: "Capri to mid-calf leg",
      image: "",
      imageAlt: "Custom cropped unitard, capri to mid-calf leg",
      href: "/activewear/jumpsuits/cropped-unitard",
      pdpTitle: "Cropped Unitard",
      sku: "CAP-JMP-02",
      pdpHeading: "Custom Cropped Unitard Manufacturer",
      pdpDescription:
        "Fitted one-piece cropped between capri and mid-calf length, custom and private label, in nylon spandex or structured scuba knit, with a snap gusset and your choice of entry, made to your brand in Sialkot, Pakistan.",
      images: [
        { alt: "Cropped unitard, front view" },
        { alt: "Cropped unitard, back view" },
        { alt: "Cropped unitard, side profile" },
        { alt: "Cropped unitard, hem detail" },
        { alt: "Cropped unitard, gusset closure detail" },
        { alt: "Cropped unitard, fabric close-up" },
      ],
      pdpMetaTitle: "Custom Cropped Unitard Manufacturer",
      pdpMetaDescription:
        "Custom cropped unitard manufacturer, nylon spandex or scuba knit, back zip or step-in, snap gusset, low MOQ, full customization. DDP worldwide.",
      material: "Nylon or poly spandex knit, or scuba knit, 90 to 95% polyester, 5 to 10% spandex",
      faqs: [
        {
          q: "What leg length does the cropped unitard come in?",
          a: "Capri to mid-calf length as the base build, with the exact crop point set to your spec sheet or a reference garment.",
        },
        {
          q: "Should I choose a back zip or a step-in?",
          a: "A back zip is easy to get into, but the zip line does not stretch, so for high-movement training a step-in pull-on keeps full stretch everywhere. We help you pick by use case.",
        },
        {
          q: "Is there a snap gusset?",
          a: "Yes, a snap-button gusset gives bathroom access regardless of the entry method, or it can be fully sewn.",
        },
      ],
      relatedStyleTags: [
        { label: "Full-Length Unitard", href: "/activewear/jumpsuits/full-length-unitard" },
        { label: "Biketard", href: "/activewear/jumpsuits" },
        { label: "Flared", href: "/activewear/jumpsuits" },
        { label: "Long-Sleeve", href: "/activewear/jumpsuits" },
        { label: "Relaxed", href: "/activewear/jumpsuits" },
        { label: "See All", href: "/activewear/jumpsuits" },
      ],
      specifications: [
        { label: "Composition", value: "One-piece unitard, torso through cropped leg (base type)" },
        { label: "Fabric", value: "Nylon or poly spandex knit, or scuba knit, 90 to 95% polyester, 5 to 10% spandex" },
        { label: "Finish", value: "Matte or shine" },
        { label: "Entry", value: "Back zip (base), side zip or step-in pull-on on request" },
        { label: "Gusset", value: "Snap-button gusset for access (standard), or sewn" },
        { label: "Waist", value: "Waist-seam or seamless-torso panel, waist-seam grades more reliably" },
        { label: "Neckline and back", value: "Scoop (base), high, halter, plunge or square, closed or open/cross-back" },
        { label: "Leg", value: "Cropped, capri to mid-calf (base), tapered, flared or boot-cut" },
        { label: "Branding", value: "Sublimation, screen, heat transfer, embroidery, custom labels and packaging" },
      ],
      specificationsImage: { alt: "Cropped unitard, construction detail" },
    },
    {
      status: "draft",
      slug: "biketard",
      cardTitle: "Custom Biker-Length Romper",
      cardSubline: "Biker-short leg, one-piece",
      image: "",
      imageAlt: "Custom biker-length romper, biker-short leg, one-piece",
      href: "/activewear/jumpsuits/biketard",
    },
    {
      status: "draft",
      slug: "flared",
      cardTitle: "Custom Flared-Leg Jumpsuit",
      cardSubline: "Leg flares from the knee",
      image: "",
      imageAlt: "Custom flared-leg jumpsuit, leg flares from the knee",
      href: "/activewear/jumpsuits/flared",
    },
    {
      status: "draft",
      slug: "sleeveless",
      cardTitle: "Custom Sleeveless Jumpsuit",
      cardSubline: "Tank top half, full or cropped leg",
      image: "",
      imageAlt: "Custom sleeveless jumpsuit, tank top half, full or cropped leg",
      href: "/activewear/jumpsuits/sleeveless",
    },
    {
      status: "draft",
      slug: "long-sleeve",
      cardTitle: "Custom Long-Sleeve Jumpsuit",
      cardSubline: "Full sleeve, layering-ready",
      image: "",
      imageAlt: "Custom long-sleeve jumpsuit, full sleeve, layering-ready",
      href: "/activewear/jumpsuits/long-sleeve",
    },
    {
      status: "draft",
      slug: "open-back",
      cardTitle: "Custom Open-Back Jumpsuit",
      cardSubline: "Cutout or cross-back detailing",
      image: "",
      imageAlt: "Custom open-back jumpsuit, cutout or cross-back detailing",
      href: "/activewear/jumpsuits/open-back",
    },
    {
      status: "draft",
      slug: "relaxed",
      cardTitle: "Custom Relaxed-Fit Jumpsuit",
      cardSubline: "Looser athleisure cut",
      image: "",
      imageAlt: "Custom relaxed-fit jumpsuit, looser athleisure cut",
      href: "/activewear/jumpsuits/relaxed",
    },
  ],
  // Owner's exact given related set, 2026-09-03.
  relatedLinks: [
    { label: "Leggings", href: "/activewear/leggings" },
    { label: "Bodysuits", href: "/activewear/bodysuits" },
    { label: "Sports Bras", href: "/activewear/sports-bras" },
    { label: "Yoga Sets", href: "/activewear/yoga-sets" },
  ],
};
