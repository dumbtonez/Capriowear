// content/activewear/tracksuits.ts
// Fourteenth real category built on the Category shape (content/activewear/
// types.ts) -- a pure content/data drop, same pattern as every category
// before it (owner spec, 2026-09-03): no edits to app/activewear/
// [category]/[style]/page.tsx, app/sitemap.ts, or lib/schema.ts, only this
// file plus one line in ./categories.ts. Third category under the
// "OUTWEAR & SUITS" mega-menu group (content/home.ts), after Jackets and
// Track Jackets & Zip-Ups.
//
// No `weightTiers` block (owner spec, 2026-09-03) -- a tracksuit is a
// matched two-piece set, not weight- or weather-driven the way Jackets'
// own water performance table or T-Shirts'/Hoodies' own GSM tiers are;
// the field is simply omitted, same as Leggings/Sports Bras/Shorts/Tank
// Tops/Yoga Sets/Track Jackets & Zip-Ups.
// Explicit category boundary, carried into the fabric note and one FAQ
// answer below: a tracksuit is the tricot/woven warm-up set (lightweight,
// breathable); the fleece hoodie-and-sweatpant set is Sweatsuits, a
// separate category, not this one.
//
// ctaSubline is the standing sitewide line, Leggings' own original
// wording, NOT the per-category line this brief's own copy gave ("Share
// your tech pack, sketch or a reference tracksuit, we'll develop it with
// you.") -- standing rule, owner spec, 2026-09-02 (see every category
// since Sweatshirts' own header comment and the decision log entries of
// that date): every category file uses Leggings' own ctaSubline verbatim,
// regardless of what a category's own brief supplies here. Confirmed with
// the owner (2026-09-03): every PLP already matches this rule, no drift.
//
// The PLP itself goes live; every style is "draft" for now (owner spec):
// each card shows on the grid, non-clickable, no PDP route generated
// (app/activewear/[category]/[style]/page.tsx's own generateStaticParams
// filters to "published" only, plus dynamicParams = false), excluded from
// app/sitemap.ts and this category's own CollectionPage/ItemList schema.
// Flip a style to "published" only once its real PDP content exists, same
// rule every prior category's own styleCards already follow.
import type { Category } from "./types";

export const tracksuits: Category = {
  slug: "tracksuits",
  group: "Activewear",
  menuLabel: "Tracksuits",
  // Entity FAQ overrides (owner's exact given values, 2026-09-03).
  manufacturerNoun: "Tracksuit",
  productNounPlural: "tracksuits",
  entityExampleStyles: "classic tricot, retro striped, funnel-neck, and warm-up set styles",
  entityFabrics: "brushed polyester tricot and woven poly",
  h1: "Custom Tracksuit Manufacturer",
  metaTitle: "Custom Tracksuit Manufacturer",
  // Owner's exact given copy, 156 chars -- within Google's own ~155-160
  // char truncation point.
  metaDescription:
    "Custom tracksuit manufacturer, matching tricot warm-up suit, retro striped, jacket and pant dyed together, low MOQ. Capriowear.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  showGenderFilter: true,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "The fabrics behind the\nbig brands",
  fabricOptions: [
    {
      fabric: "Brushed polyester tricot",
      bestFor: "The classic tracksuit, warm-ups and athleisure",
      performance: "Breathable, moisture-wicking, quick-dry, soft brushed interior",
    },
    {
      fabric: "Polyester-spandex",
      bestFor: "Competitive and performance tracksuits",
      performance: "Added stretch and recovery for demanding movement",
    },
    {
      fabric: "Satin-finish nylon",
      bestFor: "Varsity-style tracksuit jackets",
      performance: "Smooth, shinier surface, a heritage aesthetic",
    },
    {
      fabric: "Quilted, mesh or taffeta lining",
      bestFor: "Jacket lining",
      performance: "Light warmth and comfort without moving to a fleece set",
    },
  ],
  fabricNote: [
    {
      text: "The jacket and pant share the same fabric, weight and finish so the set truly matches. Tracksuits are the tricot/woven warm-up set; for the fleece hoodie-and-sweatpant set see our ",
    },
    { text: "Sweatsuits", bold: true },
    { text: " range. Swatches before every bulk run, and we can source or match a specific fabric or a " },
    { text: "Pantone color", bold: true },
    { text: " from your reference." },
  ],
  fabricPills: ["Brushed tricot", "Polyester-spandex", "Satin-finish nylon", "Quilted/mesh/taffeta lining"],
  qualityHeading: "Matched top to bottom, across the roster",
  qualitySubline: "We cut and dye the jacket and pant together and confirm the match on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Jacket and pant cut and dyed from the same lot, no mismatched shades",
    "Pantone color matched to your brand or team color",
    "Stripes, piping and trims aligned between the two pieces",
    "Sizing consistent across a full size run, so every jacket-and-pant pairing matches",
    "Zippers and hardware function-tested",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    {
      title: "Fabric",
      body: "Brushed polyester tricot, poly-spandex, or satin-finish nylon, with quilted, mesh or taffeta lining",
    },
    {
      title: "Matching",
      body: "Cut and dyed together, Pantone color match, coordinated stripes, piping and color-blocks",
    },
    {
      title: "Jacket",
      body: "Cadet or funnel collar, full-zip, quarter-zip or snap-button, raglan sleeves, zip pockets",
    },
    {
      title: "Pant",
      body: "Tapered leg, elastic waistband and drawcord, cuff, open hem or ankle zip, zip pockets",
    },
    {
      title: "Branding",
      body: "Sublimation, embroidery, tackle twill names and numbers, matched placement across both pieces",
    },
    { title: "Labels and packaging", body: "Woven or tear-away labels, hangtags, set or separates packaging" },
  ],
  faqHeading: "Top questions from B2B buyers",
  faqs: [
    {
      q: "What is your MOQ for custom tracksuits?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk, with team programs available.",
    },
    {
      q: "What is the difference between a tracksuit and a sweatsuit?",
      a: "A tracksuit is a tricot or woven warm-up set, lightweight, breathable and athletic. A sweatsuit is a fleece set, a hoodie or crewneck with a sweatpant, relaxed and built for warmth, see our Sweatsuits range. We make both.",
    },
    {
      q: "Are the jacket and pant dyed together for an exact color match?",
      a: "We cut and dye the jacket and pant together from the same production lot, and Pantone-match to your brand or team color, so the set is one true color, not two close shades.",
    },
    {
      q: "Can pieces be sized separately?",
      a: "Yes. Within a set, a jacket size and a pant size are chosen independently, since bodies do not scale the same top and bottom. The fabric, color and detailing stay consistent.",
    },
    {
      q: "What is tricot fabric, and why is it used for tracksuits?",
      a: "Brushed polyester tricot for the classic tracksuit, poly-spandex for a competitive stretch set, and satin-finish nylon for a varsity-style jacket, with quilted or mesh lining options.",
    },
    {
      q: "Can you color-match retro stripes and piping exactly?",
      a: "Yes. Coordinated side stripes, piping and contrast panels are core to a tracksuit, aligned across the jacket and pant to your artwork.",
    },
    {
      q: "Can you add player names and numbers?",
      a: "Yes. Names and numbers by tackle twill or sublimation, a standard teamwear service across both pieces.",
    },
    {
      q: "Can I approve a mockup before production?",
      a: "Yes. We share a digital mockup or rendering for your approval before we cut a single piece.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric, color and Pantone match, stripes and piping, collar, jacket closure, pant taper and hem, lining, names and numbers, branding across both pieces, labels, hangtags and packaging.",
    },
    {
      q: "Do you offer OEM, ODM and private label tracksuits?",
      a: "Yes, all three, made under your brand.",
    },
    {
      q: "How are tracksuits sized?",
      a: "Alpha XS to 5XL, with mix-and-match jacket and pant sizing, and youth, men's and women's sizing for team roster orders.",
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
      a: "Send your tech pack, sketch or a reference tracksuit by email or WhatsApp. We come back within 24 hours with next steps.",
    },
  ],
  // Standing CTA subline, same as every category (owner spec, 2026-09-02) --
  // see this file's own header comment for why this differs from the
  // brief's own given per-category line.
  ctaReferenceNoun: "tracksuit",
  // Every style is "draft" (owner spec) -- a real name and one-line spec,
  // no PDP content yet. cardTitle form is "Custom [Style] Tracksuit",
  // matching the owner's own given titles exactly.
  styleCards: [
    {
      status: "draft",
      slug: "classic",
      cardTitle: "Custom Classic Tricot Tracksuit",
      cardSubline: "Brushed tricot jacket and pant, full zip",
      image: "",
      imageAlt: "Custom classic tricot tracksuit, brushed tricot jacket and pant, full zip",
      href: "/activewear/tracksuits/classic",
    },
    {
      status: "draft",
      slug: "retro-striped",
      cardTitle: "Custom Retro Striped Tracksuit",
      cardSubline: "Contrast stripes and piping",
      image: "",
      imageAlt: "Custom retro striped tracksuit, contrast stripes and piping",
      href: "/activewear/tracksuits/retro-striped",
    },
    {
      status: "draft",
      slug: "slim",
      cardTitle: "Custom Slim Tapered Tracksuit",
      cardSubline: "Closer-cut jacket and pant",
      image: "",
      imageAlt: "Custom slim tapered tracksuit, closer-cut jacket and pant",
      href: "/activewear/tracksuits/slim",
    },
    {
      status: "draft",
      slug: "oversized",
      cardTitle: "Custom Oversized Tracksuit",
      cardSubline: "Streetwear fit",
      image: "",
      imageAlt: "Custom oversized tracksuit, streetwear fit",
      href: "/activewear/tracksuits/oversized",
    },
    {
      status: "draft",
      slug: "funnel-neck",
      cardTitle: "Custom Funnel-Neck Tracksuit",
      cardSubline: "Funnel-collar jacket, tapered pant",
      image: "",
      imageAlt: "Custom funnel-neck tracksuit, funnel-collar jacket, tapered pant",
      href: "/activewear/tracksuits/funnel-neck",
    },
    {
      status: "draft",
      slug: "warm-up",
      cardTitle: "Custom Warm-Up Tracksuit",
      cardSubline: "Flexible pieces, team roster",
      image: "",
      imageAlt: "Custom warm-up tracksuit, flexible pieces, team roster",
      href: "/activewear/tracksuits/warm-up",
    },
    {
      status: "draft",
      slug: "satin",
      cardTitle: "Custom Satin Tracksuit",
      cardSubline: "Satin nylon, varsity-style jacket",
      image: "",
      imageAlt: "Custom satin tracksuit, satin nylon, varsity-style jacket",
      href: "/activewear/tracksuits/satin",
    },
  ],
  // Sibling Outwear & Suits-group categories from content/home.ts's own
  // activewearMegaMenu -- Sweatsuits and Running Wear don't have their own
  // content files yet, so linking to real, built categories instead (same
  // "only real hrefs, no invented placeholder pages" rule every prior
  // category's own relatedLinks already follows).
  relatedLinks: [
    { label: "Jackets", href: "/activewear/jackets" },
    { label: "Track Jackets & Zip-Ups", href: "/activewear/track-jackets" },
    { label: "Hoodies", href: "/activewear/hoodies" },
    { label: "Joggers & Track Pants", href: "/activewear/joggers-track-pants" },
  ],
};
