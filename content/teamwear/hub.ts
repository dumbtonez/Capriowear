// content/teamwear/hub.ts
// Copy for the Teamwear Landing Hub (/teamwear), Mohsin's own spec doc,
// 2026-09-11: a light browse/directory page one level above the 10 real
// sport PLPs (content/teamwear/sports.ts), not another PLP itself. Every
// sport card below links to a live, already-indexed PLP only -- every PDP
// under every sport is still DRAFT, so this content never links to one.
// American spelling, no en/em dashes, no prices, per house copy rules.
import type { CategoryGroup } from "../hubTypes";
import { SITE_URL } from "../site";

export type { CategoryGroup, CategoryLink } from "../hubTypes";

/** Same `string | { bold: string }` segment shape `content/home.ts`'s own `trustStrip[].body` uses for an inline bold span. */
export type BodySegment = string | { bold: string };

// Grouped into UNIFORMS/OTHERS, matching `teamwearMegaMenu`'s own grouping
// exactly (owner, 2026-09-11: "teamwear should have 2 categories uniforms
// and others as we used in mega menu") -- same order within each group as
// the mega menu too. Reuses the shared `CategoryGroup` shape
// (content/hubTypes.ts), the same one `content/activewear/hub.ts`'s own
// `categoryGroups` uses, so both hubs render through the identical
// `CategoryLinkGrid` component. hrefs match the real slugs already live in
// content/teamwear/sports.ts and `teamwearMegaMenu`.
export const sportGroups: CategoryGroup[] = [
  {
    eyebrow: "UNIFORMS",
    h2: "Match and training uniforms, sport by sport",
    categories: [
      { label: "Cricket", descriptor: "Traditional whites and full-color match kits", href: "/teamwear/cricket" },
      {
        label: "Basketball",
        descriptor: "Sublimated jerseys, reversible practice kits",
        href: "/teamwear/basketball",
      },
      { label: "Rugby", descriptor: "Built for contact, grab-resistant construction", href: "/teamwear/rugby" },
      { label: "Baseball", descriptor: "Button-front jerseys, double-knit pants", href: "/teamwear/baseball" },
      { label: "Volleyball", descriptor: "Indoor jerseys, libero contrast kits", href: "/teamwear/volleyball" },
      { label: "Soccer", descriptor: "Match jerseys, goalkeeper kits, home and away", href: "/teamwear/soccer" },
      { label: "Football", descriptor: "Pro-cut jerseys built to fit over pads", href: "/teamwear/football" },
      { label: "Ice Hockey", descriptor: "Cut roomy for pads, reinforced elbows", href: "/teamwear/ice-hockey" },
    ],
  },
  {
    eyebrow: "OTHERS",
    h2: "Cycling kits and fight sport apparel",
    categories: [
      {
        label: "Cycling",
        descriptor: "Aero jerseys, bib shorts with a fitted chamois",
        href: "/teamwear/cycling",
      },
      {
        label: "Rash Guards & Fight Wear",
        descriptor: "IBJJF-legal rash guards and fight shorts",
        href: "/teamwear/fight-wear",
      },
    ],
  },
];

export const teamwearHub = {
  // Renders as "%s | Capriowear" via the root layout's title template
  // (same convention as content/services.ts/every content/teamwear/*.ts
  // metaTitle) -- the doc's own exact tag ("Custom Teamwear Manufacturer |
  // Capriowear", 52 chars) is this string plus that template's own suffix,
  // not stored with the suffix baked in (which would double it).
  metaTitle: "Custom Teamwear Manufacturer",
  metaDescription:
    "Custom teamwear manufacturer in Sialkot, Pakistan. Sublimated uniforms and kits across 10 sports, low MOQ, samples in 10 to 14 days.",

  // Owner feedback, 2026-09-11 (desktop review): "remove this from banner,
  // use the same banner style height spacing that we have for plp" -- the
  // hero is `CategoryBanner` alone (breadcrumb, H1, fact strip), the exact
  // same shape/height every sport PLP's own hero already uses. No subline,
  // no CTA row in the banner.
  hero: {
    breadcrumbItems: [
      { label: "Home", href: "/" },
      { label: "Teamwear", href: "/teamwear" },
    ],
    h1: "Custom Teamwear Manufacturer",
    trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "10 sports", "DDP to 20+ countries"],
  },

  overview: {
    eyebrow: "WHY CAPRIOWEAR",
    // A literal "\n" forces a real 2-line heading (owner feedback,
    // 2026-09-11: "make it in 2 lines") -- rendered via a small local
    // helper in app/teamwear/page.tsx, same forced-break convention
    // `Faq.tsx`/`FinalCta.tsx` already use elsewhere on this page.
    h2: "One factory, every sport\nyour team or club needs",
    // Segment array, not a plain string (owner request, 2026-09-11:
    // "highlight any important info") -- same `string | { bold: string }`
    // pattern `content/home.ts`'s own `trustStrip[].body` already uses for
    // an inline bold span, rendered by a small local helper in
    // app/teamwear/page.tsx.
    lead: [
      "Capriowear manufactures custom uniforms and kits across ",
      { bold: "10 sports" },
      " for teams, clubs, and teamwear suppliers worldwide, all from ",
      { bold: "one factory in Sialkot, Pakistan" },
      ". Whether you need a single team's kit or a full league program, the same factory builds it, so ",
      { bold: "quality and lead times stay consistent from sport to sport" },
      ".",
    ],
    differentiators: [
      {
        title: "Full-dye sublimation, names and numbers included",
        body: "Names, numbers, and sponsor logos are built into the print itself, not added on top, so they cost nothing extra and add no weight to the fabric.",
      },
      {
        title: "One factory, not a trading agent",
        body: "Fabric, cutting, sewing, printing, and packaging all happen under one roof, so there is no middleman marking up the order or adding another handoff.",
      },
    ],
  },

  trust: {
    eyebrow: "AUDITED, NOT JUST PROMISED",
    heading: "Certified and inspected, sport after sport",
    subline: "Every certification below applies across all 10 sports.",
    points: [
      "ISO 9001, ISO 45001, ISO 14001, BSCI, IMAC and SGS certified, WFSGI members",
      "Every run inspected to AQL 2.5, in-line and pre-shipment",
      // Same phrase already used sitewide (e.g. content/home.ts's
      // "Quality Control" trust point, every content/activewear/*.ts
      // qualityPoints entry) -- owner request, 2026-09-11: "3rd party
      // inspection is welcome, something we used on other pages."
      "Third-party inspection welcome",
      "NDA signed before any tech pack changes hands",
    ],
  },

  faq: {
    eyebrow: "GOOD TO KNOW",
    // A literal "\n" forces the design system's own real-2-line FAQ
    // heading treatment (owner feedback, 2026-09-11: "use the title in 2
    // lines, as we have in design system") -- same mechanism `Faq.tsx`
    // already uses for every other page's own "...B2B\nbuyers" heading,
    // generalized (see that component's own comment) rather than only
    // ever matching the literal word "B2B". `faq.desktopHeading`'s own
    // `max-w-[8.85em]` box is tuned to the width "Top questions from"
    // needs (its own comment in components/ui/styles.ts): live-measured
    // via canvas `measureText` at the real rendered font, "Teamwear
    // questions," (511.6px) is wider than that box (477.9px at 1440px
    // viewport) and would wrap a third time -- "Teamwear FAQs," (408.7px)
    // fits comfortably, so that's the real first line, not the doc's own
    // literal phrasing.
    h2: "Teamwear FAQs,\nanswered",
    items: [
      {
        q: "What sports does Capriowear make teamwear for?",
        a: "Capriowear manufactures custom teamwear for 10 sports: soccer, basketball, American football, baseball, volleyball, ice hockey, rugby, cricket, cycling, and rash guards and fight wear.",
      },
      {
        q: "What is the minimum order quantity for teamwear?",
        a: "The minimum order quantity starts from 50 pieces per style. Per-team minimums are never lower than this, regardless of sport.",
      },
      {
        q: "How are names and numbers applied to jerseys?",
        a: "Names and numbers are built into the sublimation print itself, not heat-pressed or embroidered on top, so they cost nothing extra and add no weight or stiffness to the fabric.",
      },
      {
        q: "Can Capriowear match our exact team colors?",
        a: "Yes. Sublimation prints any color or gradient directly into the fabric, so team colors are matched to a Pantone reference or an existing kit rather than approximated from a limited palette.",
      },
      {
        q: "Can we order home, away, and third kits together?",
        a: "Yes. Home, away, and third kits are produced in the same run using the same tech pack, keeping fit and fabric consistent across all three.",
      },
      {
        q: "Can Capriowear follow our league's numbering and lettering rules?",
        a: "Yes. League-specific numbering, lettering, and sponsor placement rules are followed exactly once confirmed in the tech pack, before production starts.",
      },
      {
        q: "How is our team's design kept confidential?",
        a: "An NDA is signed before any tech pack, sketch, or reference design is shared with the factory, keeping new designs confidential ahead of a season launch.",
      },
      {
        q: "How do we get started with a custom teamwear order?",
        a: "Start by requesting a sample or downloading the catalog. From there, a tech pack and NDA are exchanged before a sample run begins, typically arriving in 10 to 14 days.",
      },
    ],
  },

  finalCta: {
    h2: "Let's build your custom collection",
    subline: "Share your team's colors, sizing, and timeline, and get a sample in 10 to 14 days.",
    cta: { label: "Request a Sample", href: "/request-a-sample" },
    // Cross-links to /activewear, /our-factory, /services removed (owner
    // feedback, 2026-09-11: "remove activewear, services, etc links from
    // the cta") -- `FinalCta`'s own `crossLinks` prop stays available for
    // a future page that wants it, just not passed here any more.
    complianceBar: [
      "NDA before tech pack",
      "Pre-shipment inspection",
      "GSP+ Form A per container",
      "AQL 2.5 inspection",
      "ISO 9001 certified",
    ],
  },
};

export const TEAMWEAR_HUB_CANONICAL = `${SITE_URL}/teamwear`;
