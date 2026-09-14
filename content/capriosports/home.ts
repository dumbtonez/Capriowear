// content/capriosports/home.ts
// Copy for the Capriosports parent-site homepage (/), replacing the earlier
// placeholder stub (content/capriosports/stubPages.ts's own
// capriosportsHomeStub, removed alongside this file). Same shape/role as
// content/activewear/hub.ts -- one content object per hub-style page,
// composed by app/page.tsx. Identity facts (workforce/founding/etc.) live
// in content/capriosports/organization.ts and are read from there, never
// retyped here -- same "one stored source" discipline content/site.ts's own
// companyIdentity already enforces for Capriowear.
import { CAPRIOSPORTS_ORGANIZATION } from "./organization";

export const capriosportsHome = {
  metaTitle: "Custom Sportswear Manufacturer in Pakistan | Capriosports",
  metaDescription:
    "Capriosports manufactures custom lifting gear and boxing and MMA equipment, private label and wholesale, from Sialkot, Pakistan, since 2009.",

  hero: {
    eyebrow: "BASED IN SIALKOT, PAKISTAN",
    h1: "Custom sportswear manufacturer in Sialkot, Pakistan",
    cta: { label: "Request a Sample", href: "/capriowear/request-a-sample" },
  },

  // Division-switcher band -- three cards, one per real division landing
  // page (owner correction, 2026-09-14: Lifting Gear and Boxing & MMA stay
  // separate cards, not merged into one -- merging would drop Boxing/MMA
  // off the homepage with no entry point). Same CategoryGroup/CategoryLink
  // shape content/hubTypes.ts already defines for the Activewear/Teamwear
  // hub grids.
  divisions: {
    eyebrow: "OUR DIVISIONS",
    h2: "Two product lines, one factory",
    categories: [
      {
        label: "Lifting Gear",
        descriptor: "Custom weight lifting belts, gloves, wraps, straps and bands, private label and wholesale.",
        href: "/lifting-gears",
      },
      {
        label: "Boxing & MMA",
        descriptor: "Custom boxing and MMA gloves, coaching gear and protective gear, private label and wholesale.",
        href: "/boxing-and-mma",
      },
      {
        label: "Capriowear",
        descriptor: "Custom, private-label activewear and teamwear, made to your brand's spec, from sample to bulk.",
        href: "/capriowear",
      },
    ],
  },

  overview: {
    eyebrow: "WHY CAPRIOSPORTS",
    h2: "One factory, lifting gear and boxing and MMA equipment",
    lead: [
      "Capriosports manufactures custom lifting gear and boxing and MMA equipment, private label and wholesale, from raw material to finished packaging, in our own cut-and-sew facility in ",
      { bold: "Sialkot, Pakistan" },
      ".",
    ],
    differentiators: [
      {
        title: "Fabric to finished packaging, one factory",
        body: "One factory, from raw material to finished packaging, not a trading agent placing your order elsewhere.",
      },
      {
        title: "The same factory behind Capriowear",
        body: "The same facility, certifications and quality system already trusted for Capriowear's own activewear and teamwear.",
      },
    ],
  },

  stats: [
    { value: "Since 2009", caption: "Manufacturing lifting gear and boxing and MMA equipment for brands worldwide." },
    { value: `${CAPRIOSPORTS_ORGANIZATION.facilitySqFt} sq ft`, caption: "A fully in-house production facility to take on your bulk order." },
    { value: CAPRIOSPORTS_ORGANIZATION.monthlyCapacity, caption: "Monthly capacity that scales with your brand, from first sample to bulk order." },
  ],

  trust: {
    heading: "Certified and inspected",
    subline: "The same certifications and inspection standard behind every order.",
    points: [
      "ISO 9001, ISO 45001, ISO 14001, BSCI, IMAC and SGS certified",
      "Every run inspected to AQL 2.5, in-line and pre-shipment",
      "NDA signed before any tech pack changes hands",
    ],
  },

  faq: {
    h2: "Top questions from B2B buyers",
    items: [
      {
        q: "What does Capriosports manufacture?",
        a: "Lifting gear, including weight lifting belts, gloves, wraps, straps and bands, plus boxing and MMA equipment, including gloves, coaching gear and protective gear. Private label and wholesale, from raw material to finished packaging.",
      },
      {
        q: "Are you a manufacturer or a trader?",
        a: "Capriosports is the manufacturer. Production is done in-house in our own facility in Sialkot, Pakistan, the same factory that produces Capriowear's activewear and teamwear.",
      },
      {
        q: "Where is Capriosports located?",
        a: `Sialkot, Pakistan, in a ${CAPRIOSPORTS_ORGANIZATION.facilitySqFt} sq ft facility shared with Capriowear, our activewear and teamwear division.`,
      },
      {
        q: "What certifications do you hold?",
        a: "ISO 9001, ISO 45001, ISO 14001, BSCI, IMAC and SGS certified, and a WFSGI member.",
      },
      {
        q: "Is Capriosports related to Capriowear?",
        a: "Yes. Capriosports is the parent company; Capriowear is its activewear and teamwear division. One company, one factory, two product lines.",
      },
      {
        q: "Can I order lifting gear or boxing and MMA equipment as private label?",
        a: "Yes, private label and wholesale, with full customization, from raw material to finished, retail-ready packaging.",
      },
    ],
  },

  finalCta: {
    h2: "Let's build your custom collection",
    subline: "Share your tech pack, sketch or a reference. We'll come back within 24 hours with next steps.",
    cta: { label: "Request a Sample", href: "/capriowear/request-a-sample" },
  },
};
