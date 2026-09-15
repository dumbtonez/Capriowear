// content/capriosports/home.ts
// Copy for the Capriosports parent-site homepage (/), replacing the earlier
// Phase-1 placeholder pass. Same shape/role as content/activewear/hub.ts --
// one content object per hub-style page, composed by app/page.tsx. Identity
// facts (workforce/founding/etc.) live in content/capriosports/organization.ts
// and are read from there, never retyped here -- same "one stored source"
// discipline content/site.ts's own companyIdentity already enforces for
// Capriowear.
//
// 2026-09-15 full content + structure rebuild (owner's consolidated
// prompt): every field below now carries real, gear/boxing-MMA-specific
// copy using validated entity phrasing ("Capriosports", "lifting gear and
// boxing and MMA equipment", "Sialkot, Pakistan") repeated verbatim rather
// than paraphrased, per the AEO/GEO discipline the brief spelled out --
// answer engines and agents match on exact repeated entity phrasing, not
// synonyms. `hero.h1`/`metaTitle`/`metaDescription` are LOCKED -- do not
// edit those three fields without explicit owner sign-off; everything else
// here was rebuilt this pass.
//
// Certification logos are NOT retyped here -- `certified.logos` reads
// straight from `content/home.ts`'s own `certified.logos` (the real,
// already-sourced cert artwork), since Capriosports and Capriowear share
// one real factory and one real set of audits, not two independently
// maintained logo lists.
import { home } from "../home";
import { CAPRIOSPORTS_ORGANIZATION } from "./organization";

export const capriosportsHome = {
  // LOCKED -- do not edit without explicit owner sign-off.
  metaTitle: "Custom Lifting Gear & Boxing/MMA Manufacturer | Capriosports",
  metaDescription:
    "Capriosports manufactures custom lifting gear and boxing and MMA equipment, private label and wholesale, from Sialkot, Pakistan, since 2009. Parent company of Capriowear, our activewear and teamwear division.",

  hero: {
    eyebrow: "CUSTOM LIFTING GEAR & BOXING AND MMA MANUFACTURER IN SIALKOT, PAKISTAN",
    // LOCKED -- do not edit without explicit owner sign-off.
    h1: "Custom OEM & ODM lifting gear & boxing and MMA manufacturer",
    cta: { label: "Request a Sample", href: "/capriowear/request-a-sample" },
    // Reuses Hero.tsx's own Marquee ticker mechanism (rendered directly in
    // app/page.tsx, since this page's hero is a CategoryBanner fallback,
    // not Hero.tsx itself -- see that file's own header comment).
    attributeTicker: ["Precision", "Durability", "Consistency", "Scale"],
  },

  // "Fully Custom Offerings"-pattern chip strip, gear-specific chips.
  // Renders via the same Marquee component Hero.tsx's own offerings ticker
  // uses -- content/home.ts's customOfferings field is the direct
  // precedent for this shape.
  customOfferings: {
    label: "Fully Custom Offerings",
    items: ["Material", "Weight/Oz", "Padding", "Closure", "Color", "Branding", "Packaging"],
  },

  // Division-switcher band -- three cards, one per real division landing
  // page (owner correction, 2026-09-14: Lifting Gear and Boxing & MMA stay
  // separate cards, not merged into one -- merging would drop Boxing/MMA
  // off the homepage with no entry point). Unchanged this pass.
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

  // ONE FACTORY -- section 5. `eyebrow`/`h2`/`lead`/`supportingBlocks`
  // (formerly `overview`/`differentiators`) are the already-locked,
  // credibility-first copy -- unchanged text, component swap only
  // (CapriosportsFactory.tsx: sticky text + InsideFactory-style photo
  // slider + a short looping factory-floor video, replacing the earlier
  // CapabilityCard placeholder-box layout).
  factory: {
    // Eyebrow relabelled "ONE FACTORY" this pass (was "WHY CAPRIOSPORTS") --
    // that phrase now belongs to the new numbered `why` section below,
    // which is the section actually named "Why Capriosports" in the brief.
    // `h2`/`lead`/`supportingBlocks` are the exact locked copy, unchanged.
    eyebrow: "ONE FACTORY",
    h2: "One factory, lifting gear and boxing and MMA equipment",
    lead: [
      "Capriosports has manufactured from ",
      { bold: "Sialkot, Pakistan" },
      " since 2009 — one company, one factory. Today that means custom lifting gear and boxing and MMA equipment, private label and wholesale, from raw material to finished packaging.",
    ],
    supportingBlocks: [
      {
        title: "Fabric to finished packaging, one factory",
        body: "One factory, from raw material to finished packaging, not a trading agent placing your order elsewhere.",
      },
      {
        title: "The same factory behind Capriowear",
        body: "The same facility, certifications and quality system already trusted for Capriowear's own activewear and teamwear.",
      },
    ],
    // Photo slider -- same 5 factory-floor shots InsideFactory already uses
    // for Capriowear, with their own Capriosports-specific alt text (gear/
    // boxing-MMA subject, not activewear) per the AEO discipline: every
    // image in this section names the subject, "Capriosports", and
    // "Sialkot, Pakistan" explicitly.
    media: [
      {
        label: "Leather cutting",
        image: {
          src: "/factory-test/inside-factory-1.jpg",
          alt: "Capriosports factory worker cutting leather for lifting gear in Sialkot, Pakistan",
        },
      },
      {
        label: "Stitching and reinforcement",
        image: {
          src: "/factory-test/inside-factory-2.jpg",
          alt: "Capriosports factory worker reinforcing stitching on boxing and MMA equipment in Sialkot, Pakistan",
        },
      },
      {
        label: "Padding and construction",
        image: {
          src: "/factory-test/inside-factory-3.jpg",
          alt: "Capriosports factory worker fitting multi-layer foam padding into boxing gloves in Sialkot, Pakistan",
        },
      },
      {
        label: "Quality inspection",
        image: {
          src: "/factory-test/inside-factory-4.jpg",
          alt: "Capriosports quality inspector checking lifting gear and boxing and MMA equipment in Sialkot, Pakistan",
        },
      },
      {
        label: "Packed and shipped",
        image: {
          src: "/factory-test/inside-factory-5.jpg",
          alt: "Capriosports lifting gear and boxing and MMA equipment packed for shipping from Sialkot, Pakistan",
        },
      },
    ],
    // Placeholder loop, same ScrollGrowVideo+TeaserVideo mechanism Capriowear's
    // own Hero.tsx uses (muted, playsinline, autoplay only in view, loop,
    // poster as LCP, pauses offscreen, prefers-reduced-motion falls back to
    // the static poster) -- reuses an existing test clip/poster pair
    // already in public/factory-test/ rather than sourcing a new binary
    // asset for a placeholder. Swap `video`/`image` for real Capriosports
        // factory footage once it exists -- same component, no code change.
    // Required by InsideFactory's own `content` shape (reused directly for
    // this section's photo slider) even though `showCta={false}` hides it
    // here -- Request a Sample is still the right destination if this CTA
    // is ever turned back on.
    cta: { label: "Request a Sample", href: "/capriowear/request-a-sample" },
    video: {
      label: "Capriosports factory floor, Sialkot, Pakistan",
      image: {
        src: "/factory-test/whatwemake-01-fabric-test-poster.jpg",
        alt: "Capriosports factory floor producing lifting gear and boxing and MMA equipment in Sialkot, Pakistan",
      },
      video: {
        teaserSrc: "/factory-test/whatwemake-01-fabric-test.mp4",
        fullSrc: "/factory-test/whatwemake-01-fabric-test.mp4",
      },
    },
  },

  // TRUST STRIP -- 4 tiles, TrustSignals' own item shape (title/body/image).
  // Images reused from the same factory-test set, matched by meaning to
  // Capriowear's own existing usage of these files (e.g. inside-factory-4
  // already reads "Worldwide Shipping" there too).
  trustStrip: [
    {
      title: "Low MOQ, Sample to Bulk",
      body: ["Start from just 50 units per style, then scale to full bulk, all made to your spec."],
      image: {
        src: "/factory-test/inside-factory-3.jpg",
        alt: "Capriosports sample lifting gear ready for low-MOQ bulk production in Sialkot, Pakistan",
      },
    },
    {
      title: "Private Label, OEM & ODM",
      body: ["Custom lifting gear and boxing and MMA equipment, factory-direct. ", { bold: "No middlemen." }],
      image: {
        src: "/factory-test/inside-factory-2.jpg",
        alt: "Capriosports private label boxing and MMA equipment produced factory-direct in Sialkot, Pakistan",
      },
    },
    {
      title: "Trusted Since 2009",
      body: ["Export quality, 20+ countries."],
      image: {
        src: "/factory-test/inside-factory-1.jpg",
        alt: "Capriosports lifting gear and boxing and MMA equipment manufactured since 2009 in Sialkot, Pakistan",
      },
    },
    {
      title: "Worldwide Shipping",
      body: ["DDP worldwide, from Sialkot, Pakistan."],
      image: {
        src: "/factory-test/inside-factory-4.jpg",
        alt: "Capriosports lifting gear and boxing and MMA equipment shipped DDP worldwide from Sialkot, Pakistan",
      },
    },
  ],

  // CERTIFIED & COMPLIANT -- one merged section (logos + stats), not two
  // disconnected black sections. `logos` reads straight from Capriowear's
  // own `home.certified.logos` (same real factory, same real audits, one
  // stored source, not a second copy).
  certified: {
    eyebrow: "CERTIFIED & COMPLIANT",
    h2: "Certified and inspected",
    membershipNote: "Plus a WFSGI member",
    logos: home.certified.logos,
  },

  // 4 stats now (added "20+ Countries" per the brief) -- `CertifiedCompliant`
  // renders these as its own stat-card row once `stats` is passed in.
  stats: [
    { value: "Since 2009", caption: "Manufacturing lifting gear and boxing and MMA equipment for brands worldwide." },
    { value: `${CAPRIOSPORTS_ORGANIZATION.facilitySqFt} sq ft`, caption: "A fully in-house production facility to take on your bulk order." },
    { value: CAPRIOSPORTS_ORGANIZATION.monthlyCapacity, caption: "Monthly capacity that scales with your brand, from first sample to bulk order." },
    { value: CAPRIOSPORTS_ORGANIZATION.exportCountries, caption: "Countries Capriosports already ships lifting gear and boxing and MMA equipment to." },
  ],

  // WHAT WE MAKE -- new range-card section (WhatWeMakeRange.tsx), 2 boxes,
  // each with a lead + real ul/li highlights + "Request a Sample" CTA.
  // Same content array feeds this section's visible copy and its ItemList
  // JSON-LD (lib/schema.ts's productRangeItemListSchema()) -- never a
  // second, hand-typed list.
  whatWeMake: {
    eyebrow: "PRODUCT RANGE",
    h2: "Custom lifting gear and boxing and MMA equipment, one factory.",
    lead: "Private label and wholesale, from raw material to finished packaging.",
    boxes: [
      {
        title: "Lifting Gear",
        href: "/lifting-gears",
        lead: "Custom weight lifting belts, gloves, wraps and bands, in leather, nylon and neoprene.",
        highlights: [
          { title: "Weight Lifting Belts", body: "Leather, nylon and neoprene, lever and prong buckle" },
          { title: "Weightlifting Gloves and Grips", body: "Training gloves, private label grips" },
          { title: "Wraps and Straps", body: "Wrist wraps, lifting straps, knee sleeves" },
          { title: "Bands and Accessories", body: "Resistance bands, gym bags, barbell pads" },
        ],
        cta: { label: "Request a Sample", href: "/capriowear/request-a-sample" },
      },
      {
        title: "Boxing & MMA",
        href: "/boxing-and-mma",
        lead: "Custom boxing gloves and MMA equipment, cowhide leather and synthetic PU, 8oz to 16oz.",
        highlights: [
          { title: "Boxing Gloves", body: "Bag, sparring, training and competition lace-up styles" },
          { title: "MMA Gloves and Apparel", body: "Training gloves, MMA shorts" },
          { title: "Coaching Gears", body: "Focus mitts, Thai pads, kick shields" },
          { title: "Protective Gears", body: "Head guards, shin guards, hand wraps, mouth guards" },
        ],
        cta: { label: "Request a Sample", href: "/capriowear/request-a-sample" },
      },
    ],
  },

  // FULL CUSTOMIZATION -- new 5-item icon grid (FullCustomization.tsx),
  // placed between What We Make and Why Capriosports.
  fullCustomization: {
    eyebrow: "FULL CUSTOMIZATION",
    h2: "From raw material to retail-ready packaging",
    lead: "Every order is private label and fully customized, start to finish.",
    items: [
      {
        title: "Custom Manufacturing",
        body: "Private label lifting gear and boxing and MMA equipment, OEM and ODM, made to your spec.",
      },
      {
        title: "Materials and Construction",
        body: "Cowhide leather, synthetic PU, nylon and neoprene, with multi-layer foam padding and reinforced stitching.",
      },
      {
        title: "Branding and Customization",
        body: "Logo, colorway, labels and packaging, all under your brand.",
      },
      {
        title: "Quality and Compliance",
        body: "AQL 2.5 inspection on every run. ISO 9001, ISO 45001, ISO 14001, BSCI, IMAC and SGS certified.",
      },
      {
        title: "Logistics and Fulfillment",
        body: "Worldwide shipping, DDP, from Sialkot, Pakistan.",
      },
    ],
  },

  // WHY CAPRIOSPORTS -- numbered 01-05 list (WhyCapriosports.tsx), replacing
  // the earlier 2-column CapabilityCard block (that copy now lives in
  // `factory.supportingBlocks` above, inside the One Factory section).
  // `subline` reuses the organization's own already-locked identity line
  // verbatim (same sentence content/capriosports/home.ts's footer
  // description also uses) rather than inventing new heading copy.
  why: {
    eyebrow: "WHY CAPRIOSPORTS",
    h2: "Why Capriosports",
    subline: CAPRIOSPORTS_ORGANIZATION.identityLine.gear,
    items: [
      {
        number: "01",
        title: "Material and construction behind competition-grade gear",
        body: "Cowhide leather, precision stitching and reinforced construction, on every run.",
      },
      {
        number: "02",
        title: "In-house, cut to carton",
        body: "75,000 sq ft, 100,000+ units a month, under one roof.",
      },
      {
        number: "03",
        title: "Quality you can put your name on",
        body: "AQL 2.5 on every run. ISO 9001 certified.",
      },
      {
        number: "04",
        title: "On time, one team on your account",
        body: "A dedicated manager, inquiry to shipment.",
      },
      {
        number: "05",
        title: "One house for gear and apparel",
        body: "Apparel, lifting gear and fight gear from one Caprio Sports factory.",
      },
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

  // FOOTER -- real Capriosports footer content, fixing the bug where this
  // page previously rendered Capriowear's own footer content verbatim
  // (Capriowear logo, "Activewear/Teamwear" nav, "division of Caprio
  // Sports" tagline, Capriowear's copyright). `Footer.tsx`'s content shape
  // only supports two flat nav columns with no group headings, so the
  // brief's "Company" group is flattened into column two rather than
  // labelled -- same real component, same real capability, no new markup.
  // "Capriowear ↗" is a genuinely external destination from this app's own
  // basePath (per Footer.tsx's own documented external-link rule), so it
  // carries the real absolute URL, not a root-relative Next Link href.
  footer: {
    tagline: "Caprio Sports, established 2009",
    description: CAPRIOSPORTS_ORGANIZATION.identityLine.gear,
    nav: {
      columnOne: [
        { label: "Lifting Gear", href: "/lifting-gears" },
        { label: "Boxing & MMA", href: "/boxing-and-mma" },
      ],
      columnTwo: [
        { label: "Who We Are", href: "/who-we-are" },
        { label: "Our People", href: "/our-people" },
        { label: "Responsible Manufacturing", href: "/responsible-manufacturing" },
        // No root-level Capriosports "Our Factory"/"Services" page exists
        // yet (only Capriowear's own /capriowear/our-factory, /capriowear/
        // services) -- linking there rather than to a 404, per the same
        // "protect real, already-indexed content over a placeholder with
        // no page yet" call docs/05-plan.md's 2026-09-14 entry already made
        // for /services, /our-factory et al.
        { label: "Our Factory", href: "/capriowear/our-factory" },
        { label: "Services", href: "/capriowear/services" },
        { label: "Contact", href: "/contact" },
      ],
    },
    externalLink: { label: "Capriowear ↗", href: `${CAPRIOSPORTS_ORGANIZATION.url}/capriowear` },
    contact: { label: "Get in touch", email: CAPRIOSPORTS_ORGANIZATION.contactEmail },
    address: "10 KM from Daska road, Sialkot, Pakistan",
    copyright: "Capriosports 2009-2026. All Rights Reserved",
  },
};
