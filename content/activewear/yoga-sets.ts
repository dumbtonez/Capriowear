// content/activewear/yoga-sets.ts
// Eleventh real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same as every category before it
// (owner spec, 2026-09-02): no edits to app/activewear/[category]/
// page.tsx, app/activewear/[category]/[style]/page.tsx, app/sitemap.ts,
// or lib/schema.ts, only this file plus one line in ./categories.ts.
// First category under the "SETS & ONE PIECES" mega-menu group
// (content/home.ts) -- its own mega-menu link (`/activewear/yoga-sets`)
// existed before this file did and 404'd until now.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
//
// No GSM/weight-tiers block (owner spec, 2026-09-02) -- a matching set
// spans multiple garment types (bra, legging, short) each with its own
// fabric weight, not one tiered range the way T-Shirts/Hoodies/
// Sweatshirts/Long-Sleeve Tops/Joggers do -- `weightTiers` simply omitted,
// same as Leggings/Sports Bras/Shorts/Tank Tops.
import type { Category } from "./types";

export const yogaSets: Category = {
  slug: "yoga-sets",
  group: "Activewear",
  menuLabel: "Yoga Sets",
  // Entity FAQ overrides (owner's exact given values, 2026-09-02).
  manufacturerNoun: "Yoga Set",
  productNounPlural: "yoga sets",
  entityExampleStyles: "bra and leggings, bra and short, and three-piece matching set styles",
  entityFabrics: "nylon and polyester spandex knits",
  h1: "Custom Yoga Set Manufacturer",
  metaTitle: "Custom Yoga Set Manufacturer",
  metaDescription:
    "Custom yoga set manufacturer, matching bra and legging sets dyed to the same lot for a true color match, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Nylon or polyamide + spandex (70 to 85% / 15 to 30%)",
      bestFor: "Everyday sets, bra and legging matching",
      performance: "Soft hand, 4-way stretch, strong recovery, holds shape",
    },
    {
      fabric: "Polyester + spandex (72 to 89% / 11 to 28%)",
      bestFor: "High-sweat, studio and hot-yoga sets",
      performance: "Durable, quick-dry, moisture-wicking, firmer hold",
    },
    {
      fabric: "Recycled polyester + spandex",
      bestFor: "Sustainable set lines",
      performance: "Same performance as virgin polyester, eco-positioning",
    },
    {
      fabric: "Ribbed nylon spandex",
      bestFor: "Textured, low-shine set pieces",
      performance: "Firmer compression, contours without rolling",
    },
    {
      fabric: "Power-mesh (polyester or nylon open-knit)",
      bestFor: "Ventilation panels across the set",
      performance: "Breathable, adds structure without bulk",
    },
  ],
  fabricNote: [
    { text: "Main synthetic knits run " },
    { text: "180 to 320 GSM", bold: true },
    { text: " depending on the piece. Every fabric is matched across the set for a consistent hand and color, confirmed on swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " from your reference." },
  ],
  fabricPills: ["Nylon spandex", "Polyester spandex", "Recycled polyester spandex", "Ribbed nylon spandex", "Power-mesh"],
  qualityHeading: "Sets that match, seam to seam",
  qualitySubline: "We confirm color, hand and stretch match across every piece in the set before a single bulk run is cut",
  qualityPoints: [
    "Color-matched across every piece in the set, confirmed on lab dips",
    "Opacity tested, squat-proof on legging and short pieces",
    "Bands and waistbands hold their recovery after wear and wash, no dig, no roll",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Nylon, poly, recycled and ribbed knits, 180 to 320 GSM, power-mesh panels" },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, DTF" },
    {
      title: "Set configuration",
      body: "Bra and legging, bra and short, or three-piece matching sets, graded XS to 5XL",
    },
    { title: "Branding", body: "Your logos by print, silicone, heat transfer or embroidery" },
    { title: "Labels", body: "Woven, size and care labels, hangtags" },
    { title: "Packaging", body: "Polybags, boxes, retail-ready to your spec" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom yoga sets?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "Which fabrics do you use for yoga sets?",
      a: "Nylon or polyamide with spandex and polyester with spandex, the blends used by leading brands, plus recycled polyester, ribbed nylon spandex and power-mesh panels, in weights from 180 to 320 GSM depending on the piece.",
    },
    {
      q: "What set configurations can you make?",
      a: "Bra and leggings, bra and short, and three-piece matching sets, built to your own spec sheet or a reference set.",
    },
    {
      q: "How do you get a true color match between the bra and legging?",
      a: "We lab-dip and swatch every piece against the same dye lot standard before bulk, so the bra, legging and short in a set match in color, hand and finish.",
    },
    {
      q: "What is a dye lot, and why does it matter for a matching set?",
      a: "A dye lot is a single dyed batch of fabric. Two fabrics dyed to the same Pantone reference can still read as slightly different colors if they come from separate dye lots, so we lab-dip and confirm each piece of a set against the same standard before bulk.",
    },
    {
      q: "What styles and features can you add?",
      a: "Racerback, scoop or crossback bras, high-waisted or scrunch-seam leggings, biker or bike-short bottoms, removable cups, side or waistband pockets, and power-mesh panels.",
    },
    {
      q: "Can you match a specific fabric or a reference set?",
      a: "Yes. Send a swatch, reference or tech pack and we source or develop to match, then share swatches before bulk.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, color, print, set configuration, fit and construction, your logos, woven and care labels, hangtags and retail packaging, with Pantone color matching.",
    },
    {
      q: "Do you offer OEM, ODM and private label yoga sets?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, 20+ countries. DDP to the US, UK, EU, Canada and Australia, with GSP+ 0% EU duty.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    {
      q: "How do I get started?",
      a: "Send your tech pack, sketch or a reference set by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // Standing CTA subline, same as every category (owner spec, 2026-09-02).
  ctaReferenceNoun: "yoga set",
  // Every style is "draft" (owner spec) -- a real name and one-line spec,
  // no PDP content yet.
  styleCards: [
    {
      status: "draft",
      slug: "bra-and-legging-set",
      cardTitle: "Custom Bra & Legging Yoga Set",
      cardSubline: "Matching bra and full-length legging",
      image: "",
      imageAlt: "Custom bra and legging yoga set manufacturer",
      href: "/activewear/yoga-sets/bra-and-legging-set",
    },
    {
      status: "draft",
      slug: "bra-and-short-set",
      cardTitle: "Custom Bra & Short Yoga Set",
      cardSubline: "Matching bra and biker short",
      image: "",
      imageAlt: "Custom bra and short yoga set manufacturer",
      href: "/activewear/yoga-sets/bra-and-short-set",
    },
    {
      status: "draft",
      slug: "three-piece-set",
      cardTitle: "Custom Three-Piece Yoga Set",
      cardSubline: "Bra, legging and layering piece",
      image: "",
      imageAlt: "Custom three-piece yoga set manufacturer",
      href: "/activewear/yoga-sets/three-piece-set",
    },
    {
      status: "draft",
      slug: "high-waisted-set",
      cardTitle: "Custom High-Waisted Legging Set",
      cardSubline: "High-waisted legging, matching bra",
      image: "",
      imageAlt: "Custom high-waisted legging yoga set manufacturer",
      href: "/activewear/yoga-sets/high-waisted-set",
    },
    {
      status: "draft",
      slug: "scrunch-seam-set",
      cardTitle: "Custom Scrunch-Seam Yoga Set",
      cardSubline: "Scrunch-seam legging, matching bra",
      image: "",
      imageAlt: "Custom scrunch-seam yoga set manufacturer",
      href: "/activewear/yoga-sets/scrunch-seam-set",
    },
    {
      status: "draft",
      slug: "ribbed-set",
      cardTitle: "Custom Ribbed Yoga Set",
      cardSubline: "Ribbed knit bra and legging",
      image: "",
      imageAlt: "Custom ribbed yoga set manufacturer",
      href: "/activewear/yoga-sets/ribbed-set",
    },
    {
      status: "draft",
      slug: "cropped-layering-set",
      cardTitle: "Custom Cropped Layering Yoga Set",
      cardSubline: "Cropped jacket, bra and legging",
      image: "",
      imageAlt: "Custom cropped layering yoga set manufacturer",
      href: "/activewear/yoga-sets/cropped-layering-set",
    },
    {
      status: "draft",
      slug: "bike-short-set",
      cardTitle: "Custom Bike Short Yoga Set",
      cardSubline: "Matching bra and bike short",
      image: "",
      imageAlt: "Custom bike short yoga set manufacturer",
      href: "/activewear/yoga-sets/bike-short-set",
    },
  ],
  // Bodysuits and Jumpsuits, this category's own mega-menu siblings under
  // "SETS & ONE PIECES" (content/home.ts), don't have their own content
  // files yet -- linking to real, built categories instead (Leggings,
  // Sports Bras), same "only real hrefs, no invented placeholder pages"
  // rule every prior category's own relatedLinks already follows.
  relatedLinks: [
    { label: "Leggings", href: "/activewear/leggings" },
    { label: "Sports Bras", href: "/activewear/sports-bras" },
    { label: "Tank Tops", href: "/activewear/tank-tops" },
    { label: "Shorts", href: "/activewear/shorts" },
  ],
};
