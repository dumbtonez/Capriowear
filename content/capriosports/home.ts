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

  // Real sitewide Header, replacing the Phase 1 placeholder <nav> (2026-09-15
  // visual-review fix) -- no persistent division switcher yet (still
  // correctly deferred to Phase 3, per the owner's own plan), just the same
  // Header component every other page already uses, with plain links (no
  // `megaMenu`) and no `logo`/`desktopLogo` (falls back to Header's own
  // plain-text brand, since no dedicated Capriosports logo asset exists).
  nav: {
    brand: "Capriosports",
    links: [
      { label: "Lifting Gear", href: "/lifting-gears" },
      { label: "Boxing & MMA", href: "/boxing-and-mma" },
      { label: "Capriowear", href: "/capriowear" },
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Contact", href: "/contact" },
    ],
    mobileLinks: [
      { label: "Lifting Gear", href: "/lifting-gears", chevron: false },
      { label: "Boxing & MMA", href: "/boxing-and-mma", chevron: false },
      { label: "Capriowear", href: "/capriowear", chevron: false },
      { label: "Who We Are", href: "/who-we-are", chevron: false },
      { label: "Contact", href: "/contact", chevron: false },
    ],
    contact: { label: "Get in touch", email: CAPRIOSPORTS_ORGANIZATION.contactEmail },
    cta: { label: "Request a Sample", href: "/capriowear/request-a-sample" },
  },

  // Real Figma hero (desktop node 973:297, mobile node 981:1207, confirmed
  // via screenshot 2026-09-15 once the Dev Mode MCP connection couldn't be
  // reached) -- this page now reuses Capriowear's own real `Hero.tsx`
  // directly (`showTicker={false}`, since this page already renders its
  // own equivalent "Fully Custom Offerings" ticker as a separate section
  // further down, not Hero's own bundled Layer 3), rather than the
  // earlier CategoryBanner-composition fallback. Eyebrow simplified back
  // to the real design's own short form (was a longer, invented SEO-eyebrow
  // string with no Figma backing). `ctaSecondary`/`media` match Hero's own
  // real `typeof home.hero` shape exactly. `media` carries no `image`/
  // `video` yet (owner, 2026-09-15: "we will always have video there...
  // even we don't have the footage for now" -- same real functionality as
  // Capriowear's own hero, just no footage plugged in yet either; swap in
  // a real image/video pair here the moment it exists, no code change).
  hero: {
    eyebrow: "BASED IN SIALKOT, PAKISTAN",
    // LOCKED -- do not edit without explicit owner sign-off.
    h1: "Custom OEM & ODM lifting gear & boxing and MMA manufacturer",
    ctaPrimary: { label: "Request a Sample", href: "/capriowear/request-a-sample" },
    // No root-level Capriosports "Download Catalog" page exists yet (only
    // Capriowear's own /capriowear/download-catalog) -- linking there
    // rather than to a 404, same rule this file's own footer nav follows.
    ctaSecondary: { label: "Download Catalog", href: "/capriowear/download-catalog" },
    media: {
      type: "video" as const,
      label: "Capriosports factory and product video, Sialkot, Pakistan",
    },
  },

  // "Fully Custom Offerings"-pattern chip strip, gear-specific chips.
  // Renders via the same Marquee component Hero.tsx's own offerings ticker
  // uses -- content/home.ts's customOfferings field is the direct
  // precedent for this shape.
  customOfferings: {
    label: "Fully Custom Offerings",
    items: ["Material", "Weight/Oz", "Padding", "Closure", "Color", "Branding", "Packaging"],
    // Mobile-only paired regrouping of the same 7 words above (owner,
    // 2026-09-15: "put it under video with text like this, same like we
    // did on mobile wear" -- same real pattern `content/home.ts`'s own
    // `customOfferings.mobileItems` already uses: the desktop Marquee's
    // flat word list regrouped into pairs for Hero's own mobile
    // ScrollSpotlightList ticker, not new copy). 7 words don't pair
    // evenly -- "Packaging" stays alone, same shape as any odd-count
    // pairing.
    mobileItems: ["Material & Weight/Oz", "Padding & Closure", "Color & Branding", "Packaging"],
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
        // +"training" (owner, 2026-09-15: "add one more word... make it 3
        // lines too") -- matches the Capriowear card's own naturally
        // 3-line descriptor height (that card's extra CTA line pushes it
        // to 3 lines already); live-tested against this card's real
        // rendered width to confirm the 1-word addition actually crosses
        // into a 3rd line, not just a guess.
        descriptor: "Custom weight lifting belts, training gloves, wraps, straps and bands, private label and wholesale.",
        href: "/lifting-gears",
        // Explicit `image` (via CategoryLinkGrid's own new optional field,
        // 2026-09-15) -- these 3 cards don't share one real division
        // folder for `hubThumbnail`'s usual slug-lookup convention, so a
        // direct image avoids that plumbing. Real photos, not blank
        // placeholders (visual-review fix).
        image: {
          src: "/factory-test/inside-factory-1.jpg",
          alt: "Capriosports lifting gear manufacturing in Sialkot, Pakistan",
        },
        // All 3 cards get a visible CTA now (owner, 2026-09-15) -- short,
        // and doesn't have to match Capriowear's own "Visit X" wording.
        // Static white arrow (not animated) -- only Capriowear's own link
        // keeps the continuous "always pointing" animation.
        linkLabel: "Explore Gear",
      },
      {
        label: "Boxing & MMA",
        // "gear" restored after "coaching" (owner, 2026-09-15: briefly
        // removed, then "bring gear word back after coaching in mma") --
        // this card is 3 lines again as a result, matching Lifting Gear
        // and Capriowear's own real 3-line descriptor height (owner
        // separately asked for that same 3-line consistency on Lifting
        // Gear), so the earlier 2-line trim is no longer needed either.
        descriptor: "Custom boxing and MMA gloves, coaching gear and protective gear, private label and wholesale.",
        href: "/boxing-and-mma",
        image: {
          src: "/factory-test/inside-factory-2.jpg",
          alt: "Capriosports boxing and MMA equipment manufacturing in Sialkot, Pakistan",
        },
        linkLabel: "Explore Boxing",
      },
      {
        label: "Capriowear",
        descriptor: "Custom, private-label activewear and teamwear, made to your brand's spec, from sample to bulk.",
        href: "/capriowear",
        image: {
          src: "/factory-test/inside-factory-3.jpg",
          alt: "Capriowear activewear and teamwear manufacturing, Capriosports' Sialkot, Pakistan factory",
        },
        linkLabel: "Visit Capriowear",
        // Only this card's arrow keeps the continuous "always pointing"
        // animation (owner: "make the wear arrow white too but pointing") --
        // the other two get the same white arrow, static.
        linkAnimated: true,
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
        image: {
          src: "/factory-test/inside-factory-1.jpg",
          alt: "Capriosports factory floor, raw material to finished packaging, Sialkot, Pakistan",
        },
      },
      {
        title: "The same factory behind Capriowear",
        body: "The same facility, certifications and quality system already trusted for Capriowear's own activewear and teamwear.",
        image: {
          src: "/factory-test/inside-factory-2.jpg",
          alt: "Capriosports and Capriowear shared factory facility, Sialkot, Pakistan",
        },
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
    // Required by InsideFactory's own `content` shape (reused directly for
    // this section's photo slider) even though `showCta={false}` hides it
    // here -- Request a Sample is still the right destination if this CTA
    // is ever turned back on.
    cta: { label: "Request a Sample", href: "/capriowear/request-a-sample" },
    // Static placeholder, not a video (visual-review fix, 2026-09-15): the
    // previous pass's placeholder video/poster pair was an unrelated CC0
    // stock clip of a park/trees, which read as a broken/mismatched video
    // rather than an intentional placeholder. No `video` field here at
    // all -- `ScrollGrowVideo` (components/ScrollGrowVideo.tsx) falls back
    // to its plain labelled placeholder + Play button whenever `video` is
    // omitted, same as `/our-factory`'s own hero already does, using the
    // photo slider's own first real poster frame below rather than a
    // generic empty box. Swap in a real `video` pair (teaserSrc/fullSrc)
    // the moment real factory footage exists -- same component, no code
    // change needed.
    video: {
      label: "Factory video coming soon — Capriosports lifting gear and boxing and MMA manufacturing, Sialkot, Pakistan",
      image: {
        src: "/factory-test/inside-factory-1.jpg",
        alt: "Capriosports factory floor producing lifting gear and boxing and MMA equipment in Sialkot, Pakistan — factory video coming soon",
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

  // CERTIFIED & COMPLIANT -- logos only (real Stats component reused as
  // its own separate section again, see `stats` below -- 2026-09-15
  // visual-review fix reverted the earlier merged stat-card row). `logos`
  // reads straight from Capriowear's own `home.certified.logos` (same real
  // factory, same real audits, one stored source, not a second copy) --
  // WFSGI filtered OUT of that array here: it's a real membership, not a
  // certification, represented instead by `membershipNote` below. Passing
  // WFSGI through as a 7th logo also overflowed this section's logo row on
  // desktop (visual-review fix).
  certified: {
    eyebrow: "CERTIFIED & COMPLIANT",
    h2: "Certified and inspected",
    membershipNote: "Plus a WFSGI member",
    logos: home.certified.logos.filter((logo) => logo.name !== "WFSGI"),
  },

  // 4 stats now (added "20+ Countries" per the brief) -- rendered via the
  // real `Stats` component (components/sections/Stats.tsx), same
  // markup/visual style as Capriowear's own homepage, not a custom
  // stat-card row bolted onto `CertifiedCompliant`.
  stats: [
    { value: "Since 2009", caption: "Manufacturing lifting gear and boxing and MMA equipment for brands worldwide." },
    { value: `${CAPRIOSPORTS_ORGANIZATION.facilitySqFt} sq ft`, caption: "A fully in-house production facility to take on your bulk order." },
    { value: CAPRIOSPORTS_ORGANIZATION.monthlyCapacity, caption: "Monthly capacity that scales with your brand, from first sample to bulk order." },
    { value: CAPRIOSPORTS_ORGANIZATION.exportCountries, caption: "Countries Capriosports already ships lifting gear and boxing and MMA equipment to." },
  ],

  // WHAT WE MAKE -- reuses Capriowear's OWN real `WhatWeMake` component
  // (components/sections/WhatWeMake.tsx) directly, same `Card` category
  // tiles/grid Capriowear's own homepage uses for Activewear/Teamwear
  // sub-categories -- not the bordered ul/li box pattern the previous pass
  // built (`WhatWeMakeRange.tsx`, removed). Only `weight-lifting-belts` and
  // `boxing-gloves` have real PLP pages today (content/gear/*/categories.ts) --
  // every other tile links to its parent division hub page instead of a
  // 404, per this project's own "protect real, already-indexed content
  // over a placeholder with no page yet" rule (docs/05-plan.md, 2026-09-14).
  // Images are explicit per tile (this content shape carries them directly,
  // same as `content/home.ts`'s own `whatWeMake.categories[].tiles[].image`
  // -- no `hubThumbnail` lookup involved here).
  whatWeMake: {
    eyebrow: "PRODUCT RANGE",
    h2: "Custom lifting gear and boxing and MMA equipment, one factory.",
    categories: [
      {
        title: "Lifting Gear",
        body: ["Custom weight lifting belts, gloves, wraps and bands, in leather, nylon and neoprene."],
        href: "/lifting-gears",
        tiles: [
          {
            label: "Weight Lifting Belts",
            href: "/lifting-gears/weight-lifting-belts",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Capriosports weight lifting belts, Sialkot, Pakistan" },
          },
          {
            // No real PLP yet -- links to the parent hub page, same rule
            // as `weight-lifting-belts`' siblings below. `href` carries a
            // unique `#slug` anchor (not just the bare hub URL, shared by
            // 3 of these 4 tiles) since `WhatWeMake`'s own `Card` keys its
            // list by `href` -- three identical keys in one array is a
            // real React bug (found live, console "same key" warning), not
            // just cosmetic.
            label: "Weightlifting Gloves and Grips",
            href: "/lifting-gears#weightlifting-gloves-and-grips",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Capriosports weightlifting gloves and grips, Sialkot, Pakistan" },
          },
          {
            label: "Wraps and Straps",
            href: "/lifting-gears#wraps-and-straps",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Capriosports wraps and straps, Sialkot, Pakistan" },
          },
          {
            label: "Bands and Accessories",
            href: "/lifting-gears#bands-and-accessories",
            image: { src: "/factory-test/inside-factory-4.jpg", alt: "Capriosports bands and accessories, Sialkot, Pakistan" },
          },
        ],
      },
      {
        title: "Boxing & MMA",
        body: ["Custom boxing gloves and MMA equipment, cowhide leather and synthetic PU, 8oz to 16oz."],
        href: "/boxing-and-mma",
        tiles: [
          {
            label: "Boxing Gloves",
            href: "/boxing-and-mma/boxing-gloves",
            image: { src: "/factory-test/inside-factory-5.jpg", alt: "Capriosports boxing gloves, Sialkot, Pakistan" },
          },
          {
            // See the Lifting Gear group's own "Weightlifting Gloves and
            // Grips" comment above -- same reasoning, unique `#slug` anchor.
            label: "MMA Gloves and Apparel",
            href: "/boxing-and-mma#mma-gloves-and-apparel",
            image: { src: "/factory-test/inside-factory-1.jpg", alt: "Capriosports MMA gloves and apparel, Sialkot, Pakistan" },
          },
          {
            label: "Coaching Gears",
            href: "/boxing-and-mma#coaching-gears",
            image: { src: "/factory-test/inside-factory-2.jpg", alt: "Capriosports coaching gears, Sialkot, Pakistan" },
          },
          {
            label: "Protective Gears",
            href: "/boxing-and-mma#protective-gears",
            image: { src: "/factory-test/inside-factory-3.jpg", alt: "Capriosports protective gears, Sialkot, Pakistan" },
          },
        ],
      },
    ],
  },

  // FULL CUSTOMIZATION -- reuses Capriowear's OWN real "Our Services"
  // homepage section (components/sections/OurServices.tsx, fed by
  // content/home.ts's own `services` field, h2 "From raw fabric to
  // retail-ready packaging") directly, gear-adapted copy -- not the new
  // icon-grid component the previous pass built (`FullCustomization.tsx`,
  // removed): that section was never actually built on the Services page,
  // this IS the real, already-shipping 5-item section it was meant to be.
  services: {
    eyebrow: "FULL CUSTOMIZATION",
    h2: "From raw material to retail-ready packaging",
    items: [
      {
        title: "Custom Manufacturing",
        body: "Private label lifting gear and boxing and MMA equipment, OEM and ODM, made to your spec.",
        image: { src: "/factory-test/inside-factory-1.jpg", alt: "Capriosports custom manufacturing, Sialkot, Pakistan" },
      },
      {
        title: "Materials and Construction",
        body: "Cowhide leather, synthetic PU, nylon and neoprene, with multi-layer foam padding and reinforced stitching.",
        image: { src: "/factory-test/inside-factory-2.jpg", alt: "Capriosports materials and construction, Sialkot, Pakistan" },
      },
      {
        title: "Branding and Customization",
        body: "Logo, colorway, labels and packaging, all under your brand.",
        image: {
          src: "/factory-test/inside-factory-3.jpg",
          alt: "Capriosports branding and customization, Sialkot, Pakistan",
        },
      },
      {
        title: "Quality and Compliance",
        body: "AQL 2.5 inspection on every run. ISO 9001, ISO 45001, ISO 14001, BSCI, IMAC and SGS certified.",
        image: { src: "/factory-test/inside-factory-4.jpg", alt: "Capriosports quality and compliance, Sialkot, Pakistan" },
      },
      {
        title: "Logistics and Fulfillment",
        body: "Worldwide shipping, DDP, from Sialkot, Pakistan.",
        image: { src: "/factory-test/inside-factory-5.jpg", alt: "Capriosports logistics and fulfillment, Sialkot, Pakistan" },
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
