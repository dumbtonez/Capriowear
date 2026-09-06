// content/activewear/jackets.ts
// Twelfth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every category
// before it (owner spec, 2026-09-03): no edits to app/activewear/
// [category]/[style]/page.tsx, app/sitemap.ts, or lib/schema.ts, only this
// file plus one line in ./categories.ts. First category under the
// "OUTWEAR & SUITS" mega-menu group (content/home.ts).
//
// Water performance, not GSM weight tiers -- reuses the same `weightTiers`
// table (`WeightTier`'s own generic `{tier, gsm, bestFor}` shape, first
// relabeled for Compression & Base Layers' own mmHg table) with its own
// `weightTiersHeaders` override: `{tier: "Level", value: "How it's built",
// bestFor: "Rating / use"}`. `tier` holds "Water-repellent"/"Waterproof"/
// "Windproof", `gsm` holds the construction method. No component change
// needed -- the configurable-header prop already exists.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave ("Share
// your tech pack, sketch or a reference jacket, we'll develop it with
// you.") -- standing rule, owner spec, 2026-09-02 (see every category
// since Sweatshirts' own header comment and the decision log entries of
// that date): every category file uses Leggings' own ctaSubline verbatim,
// regardless of what a category's own brief supplies here.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const jackets: Category = {
  slug: "jackets",
  group: "Activewear",
  menuLabel: "Jackets",
  // Entity FAQ overrides (owner's exact given values, 2026-09-03).
  manufacturerNoun: "Jacket",
  productNounPlural: "jackets",
  entityExampleStyles: "windbreaker, softshell, puffer, and coaches jacket styles",
  entityFabrics: "ripstop and taffeta woven shells",
  h1: "Custom Jacket Manufacturer",
  metaTitle: "Custom Windbreaker Manufacturer",
  // metaTitle leads with "Windbreaker" (SEO/AEO refresh, owner spec:
  // primary head keyword "custom windbreaker manufacturer") -- H1 stays
  // the broader "Jacket" (not in this pass's H1-change list), same
  // deliberate H1/title split as Long-Sleeve Tops' own metaTitle.
  metaDescription:
    "Custom windbreaker manufacturer, puffer and softshell jackets, waterproof taped-seam shells, hydrostatic head rated, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 40+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Ripstop nylon or polyester (grid weave)",
      bestFor: "Windbreakers, packable jackets, rain shells",
      performance: "Tear-resistant grid weave; ultralight 10 to 20 denier up to 200 to 300 denier for heavier shells",
    },
    {
      fabric: "Taffeta (nylon or polyester)",
      bestFor: "Ultralight packable shells, down-proof shells and linings",
      performance: "Softer hand than ripstop, better at containing fill, 10 to 15 denier ultralight",
    },
    {
      fabric: "Softshell (bonded stretch woven)",
      bestFor: "Structured jackets, wind and light water",
      performance: "Poly-spandex face with a membrane or fleece back, DWR-treated, more structure than a windbreaker",
    },
    {
      fabric: "Coated or laminated shell",
      bestFor: "Genuinely waterproof jackets and rain shells",
      performance: "A PU coating or membrane makes the shell waterproof (needs taped seams for a true claim)",
    },
    {
      fabric: "Insulated shell (ripstop or taffeta)",
      bestFor: "Puffer and quilted jackets",
      performance: "Wind-resistant, water-repellent, smooth for quilting, 80 to 300 GSM",
    },
    {
      fabric: "Mesh or taffeta lining",
      bestFor: "Interior lining",
      performance: "Mesh for ventilation, taffeta for a smooth slip-on feel",
    },
  ],
  // Water performance, not weight tiers -- Level / How it's built /
  // Rating-use, via weightTiersHeaders below (same reusable block
  // Compression & Base Layers' own mmHg table uses).
  weightTiers: [
    {
      tier: "Water-repellent",
      gsm: "DWR surface finish",
      bestFor: "Beads off light rain and wind, not sustained rain (most windbreakers)",
    },
    {
      tier: "Waterproof",
      gsm: "Coated or laminated shell plus taped seams",
      bestFor: "Hydrostatic head around 10,000mm moderate, 20,000mm+ heavy sustained rain",
    },
    {
      tier: "Windproof",
      gsm: "A tightly woven shell",
      bestFor: "Blocks wind by weave density, independent of water resistance",
    },
  ],
  weightTiersHeaders: { tier: "Level", value: "How it's built", bestFor: "Rating / use" },
  fabricNote: [
    {
      text: "Ripstop is a tear-resistance weave, not a waterproofing method; water performance is always added separately (see the water performance table). Softshell uses spandex for stretch; plain windbreaker and rain shells are typically non-stretch wovens. Swatches before every bulk run, and we can source or match a specific fabric or a target ",
    },
    { text: "rating", bold: true },
    { text: " from your reference." },
  ],
  fabricPills: ["Ripstop nylon", "Taffeta", "Softshell", "Coated/laminated shell", "Insulated shell", "Mesh/taffeta lining"],
  qualityHeading: "Water performance we can prove",
  qualitySubline: "We confirm the water rating, seams and hardware on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Water-resistant and waterproof claims backed by a hydrostatic head rating, not just a label",
    "Taped or sealed seams where a true waterproof claim is made, leak-tested",
    "Zippers and hardware function-tested for durability",
    "Insulated jackets: down-proof shell, no fill leakage, insulation stays put after wash",
    "Consistent sizing across a structured, multi-panel garment",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Shell fabric",
      body: "Ripstop or taffeta nylon and polyester, softshell, coated or laminated shells, by weight and denier",
    },
    {
      title: "Water performance",
      body: "DWR water-repellent, or coated/laminated waterproof with taped seams",
    },
    {
      title: "Insulation",
      body: "Down (fill power) or synthetic (gram weight), stitch-through or baffle quilting",
    },
    {
      title: "Hardware and build",
      body: "Zipper type and finish, hood (fixed, detachable, adjustable), cuffs, hem drawcord, pockets, collar",
    },
    {
      title: "Color and print",
      body: "Custom colors with Pantone matching, paneling and color-blocking, embroidery, patches, heat transfer",
    },
    { title: "Labels and packaging", body: "Woven or tear-away labels, hangtags, retail-ready packaging" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom jackets?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What is the difference between water-resistant and waterproof?",
      a: "Water-resistant (a DWR finish) makes water bead off and handles light rain, but wets through under sustained rain. Waterproof needs a coated or laminated shell plus taped seams, and is rated by hydrostatic head, around 10,000mm for moderate rain and 20,000mm+ for heavy rain. We build both and we are precise about which is which.",
    },
    {
      q: "What is a hydrostatic head rating, and can you build to one?",
      a: "Yes. A genuine waterproof jacket needs a coated or laminated shell and taped or sealed seams, since stitching creates needle holes. We add taped seams as a deliberate construction step and can match a target hydrostatic head rating.",
    },
    {
      q: "What fabrics and weights do you use?",
      a: "Ripstop and taffeta nylon and polyester shells from ultralight 10 to 20 denier up to 200 to 300 denier, softshell stretch wovens, coated or laminated waterproof shells, and insulated shells at 80 to 300 GSM.",
    },
    {
      q: "What fill power do your puffer jackets use?",
      a: "Down (rated by fill power, commonly 500 to 800+) or synthetic fill (rated by gram weight), held by stitch-through or baffle quilting, in a down-proof shell so fill does not leak.",
    },
    {
      q: "What hardware and construction can you add?",
      a: "Coil, reverse-coil or water-resistant zippers, a zipper garage or chin guard, fixed, detachable or adjustable hoods, elastic, ribbed or Velcro cuffs, hem drawcords, and zip or internal pockets.",
    },
    {
      q: "Can you match a specific rating or a reference jacket?",
      a: "Yes. Send a target hydrostatic head, an insulation spec or a reference and we develop the fabric and construction to match, then confirm on your sample.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: shell fabric, water performance, insulation, zipper and hardware, hood, cuffs, pockets, collar, paneling, color, print and embroidery, your logos, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label jackets?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are jackets sized?",
      a: "Alpha XS to 5XL. Structured and insulated jackets are graded to allow for layering and fill bulk, so fit is confirmed at multiple sizes across the run.",
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
      a: "Send your tech pack, sketch or a reference jacket by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // Standing CTA subline, same as every category (owner spec, 2026-09-02) --
  // see this file's own header comment for why this differs from the
  // brief's own given per-category line.
  ctaReferenceNoun: "jacket",
  // Every style is "draft" (owner spec) -- a real name and one-line spec,
  // no PDP content yet. cardTitle form is "Custom [Style] Jacket", matching
  // the owner's own given titles exactly.
  styleCards: [
    {
      status: "draft",
      slug: "windbreaker",
      cardTitle: "Custom Windbreaker Jacket",
      cardSubline: "Lightweight woven shell, DWR, packable",
      image: "",
      imageAlt: "Custom windbreaker jacket, lightweight woven shell, DWR, packable",
      href: "/activewear/jackets/windbreaker",
    },
    {
      status: "draft",
      slug: "puffer",
      cardTitle: "Custom Puffer Jacket",
      cardSubline: "Down or synthetic fill, quilted",
      image: "",
      imageAlt: "Custom puffer jacket, down or synthetic fill, quilted",
      href: "/activewear/jackets/puffer",
    },
    {
      status: "draft",
      slug: "softshell",
      cardTitle: "Custom Softshell Jacket",
      cardSubline: "Bonded stretch woven, wind and water",
      image: "",
      imageAlt: "Custom softshell jacket, bonded stretch woven, wind and water",
      href: "/activewear/jackets/softshell",
    },
    {
      status: "draft",
      slug: "packable",
      cardTitle: "Custom Packable Anorak",
      cardSubline: "Ultralight, stuffs into its pocket",
      image: "",
      imageAlt: "Custom packable anorak, ultralight, stuffs into its pocket",
      href: "/activewear/jackets/packable",
    },
    {
      status: "draft",
      slug: "coaches",
      cardTitle: "Custom Coaches Jacket",
      cardSubline: "Snap or zip front, teamwear staple",
      image: "",
      imageAlt: "Custom coaches jacket, snap or zip front, teamwear staple",
      href: "/activewear/jackets/coaches",
    },
    {
      status: "draft",
      slug: "rain-shell",
      cardTitle: "Custom Rain Shell",
      cardSubline: "Waterproof shell, taped seams",
      image: "",
      imageAlt: "Custom rain shell jacket, waterproof shell, taped seams",
      href: "/activewear/jackets/rain-shell",
    },
    {
      status: "draft",
      slug: "vest",
      cardTitle: "Custom Vest / Gilet",
      cardSubline: "Sleeveless shell or insulated",
      image: "",
      imageAlt: "Custom vest or gilet, sleeveless shell or insulated",
      href: "/activewear/jackets/vest",
    },
  ],
  // Sibling Outwear & Suits-group categories from content/home.ts's own
  // activewearMegaMenu -- Track Jackets & Zip-Ups, Tracksuits, Sweatsuits
  // and Running Wear don't have their own content files yet, so linking
  // to real, built categories instead (same "only real hrefs, no invented
  // placeholder pages" rule every prior category's own relatedLinks
  // already follows).
  relatedLinks: [
    { label: "Hoodies", href: "/activewear/hoodies" },
    { label: "Sweatshirts", href: "/activewear/sweatshirts" },
    { label: "Compression & Base Layers", href: "/activewear/compression-base-layers" },
    { label: "Joggers & Track Pants", href: "/activewear/joggers-track-pants" },
  ],
};
