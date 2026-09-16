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
// synonyms. `hero.h1`/`metaTitle` are LOCKED -- do not edit without
// explicit owner sign-off; everything else here was rebuilt this pass.
//
// `metaDescription` was ALSO locked at this pass, but replaced 2026-09-16
// (owner-supplied canonical entity-intro spec, superseding that lock): the
// prior string ran 208 characters, over Google's ~155 char truncation
// point and getting cut off in search results. Now
// CAPRIOSPORTS_ORGANIZATION.metaIntro (organization.ts), the locked
// 152-char "meta-length intro" variant -- imported, not retyped, same
// "one stored source" rule every other entity-intro variant follows.
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
  metaDescription: CAPRIOSPORTS_ORGANIZATION.metaIntro,

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
    // "Fully Custom Offerings" -> "What We Build On" (owner, 2026-09-16).
    label: "What We Build On",
    // Replaced wholesale (owner, 2026-09-16) -- was the 7 spec-attribute
    // words ("Material", "Weight/Oz", etc.); now 6 capability words. Same
    // object feeds Hero's own mobile ticker (`showTickerMobile`) and this
    // desktop/tablet Marquee strip below, so one edit covers every
    // breakpoint (owner: "same apply on mobile and tablet").
    items: ["Precision", "Durability", "Craftsmanship", "Consistency", "Scale", "Compliance"],
    // One word per line on mobile, not paired (owner, 2026-09-16: "on
    // mobile, make them 1 by 1, don't combine") -- was paired into 3
    // "X & Y" groups; now the same 6 words as `items` above, unchanged.
    mobileItems: ["Precision", "Durability", "Craftsmanship", "Consistency", "Scale", "Compliance"],
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
        // `stack` variant only (2026-09-16, owner: "use the new text that I
        // have in figma" for the trial hover-fan style, Figma node
        // 1021:145) -- a shorter, single-line rewrite, not a replacement
        // for `descriptor` above: the `flat`/`scrim`/`merge`/`box` variants
        // keep their own existing 3-line-tuned copy untouched (see
        // `descriptor`'s own comment on why that exact wording hits 3
        // lines on those variants).
        descriptorShort: "Custom lifting gear, private label and wholesale",
        // `stack` variant only -- dummy placeholder photos (owner: "Add
        // some dummy fitness products in the placeholders"), NOT real
        // product photography (none exists for Gear yet, per this
        // section's own "no images sitewide" history above) -- a
        // generated placehold.co tile per panel, swap for real photos
        // once shot.
        stackImages: [
          { src: "https://placehold.co/205x205/2a2e35/f5f5f5?text=Weight+Belt", alt: "Placeholder photo of a weight lifting belt" },
          { src: "https://placehold.co/205x205/23262c/f5f5f5?text=Training+Gloves", alt: "Placeholder photo of training gloves" },
          { src: "https://placehold.co/205x205/33373f/f5f5f5?text=Wraps", alt: "Placeholder photo of lifting wraps" },
        ],
        href: "/lifting-gears",
        // Explicit `image` (via CategoryLinkGrid's own new optional field,
        // 2026-09-15) -- these 3 cards don't share one real division
        // folder for `hubThumbnail`'s usual slug-lookup convention, so a
        // direct image avoids that plumbing. Real photos, not blank
        // placeholders (visual-review fix).
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
        // See Lifting Gear's own comment above -- Figma node 1021:161,
        // used verbatim even though it reads generically (matches
        // Capriowear's own `descriptorShort` below word-for-word in the
        // Figma file, not a copy/paste mistake on this end).
        descriptorShort: "Custom activewear and teamwear, sample to bulk",
        // `stack` variant only -- see Lifting Gear's own `stackImages` comment above.
        stackImages: [
          { src: "https://placehold.co/205x205/2a2e35/f5f5f5?text=Boxing+Gloves", alt: "Placeholder photo of boxing gloves" },
          { src: "https://placehold.co/205x205/23262c/f5f5f5?text=Hand+Wraps", alt: "Placeholder photo of hand wraps" },
          { src: "https://placehold.co/205x205/33373f/f5f5f5?text=Headgear", alt: "Placeholder photo of MMA headgear" },
        ],
        href: "/boxing-and-mma",
        linkLabel: "Explore Boxing",
      },
      {
        label: "Capriowear",
        descriptor: "Custom, private-label activewear and teamwear, made to your brand's spec, from sample to bulk.",
        // Figma node 1021:164 -- see Lifting Gear's own comment above.
        descriptorShort: "Custom activewear and teamwear, sample to bulk",
        // `stack` variant only -- see Lifting Gear's own `stackImages` comment above.
        stackImages: [
          { src: "https://placehold.co/205x205/2a2e35/f5f5f5?text=Leggings", alt: "Placeholder photo of leggings" },
          { src: "https://placehold.co/205x205/23262c/f5f5f5?text=Hoodie", alt: "Placeholder photo of a hoodie" },
          { src: "https://placehold.co/205x205/33373f/f5f5f5?text=T-Shirt", alt: "Placeholder photo of a t-shirt" },
        ],
        href: "/capriowear",
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
    // h2/lead/supportingBlocks re-built to match the real Figma frame
    // exactly, node 985:133 (owner, 2026-09-15: "under that build this
    // section. use the same spacings") -- see `CapriosportsFactory.tsx`
    // and `capriosportsFactory` (components/ui/styles.ts) for the matching
    // layout/spacing rebuild. `lead` dropped its own bold span and em dash
    // (this project's own "no en/em dashes" content rule, docs/02-design-
    // system.md) to match the frame's plain sentence exactly -- "Caprio"
    // in the frame's own text widened to "Capriosports", this project's
    // established full name everywhere else. Third supporting block ("Your
    // design, always protected") is new -- the frame shows 3 cards, the
    // previous pass only built 2.
    h2: "One factory, lifting gear and boxing and MMA equipment",
    lead: "Capriosports has manufactured lifting gear and boxing and MMA equipment in Sialkot, Pakistan, since 2009.",
    supportingBlocks: [
      {
        // "\n" -- the real frame breaks this title across 2 lines
        // ("Fabric to finished packaging" / "one factory"), read by
        // `capriosportsFactory.supportingTitle`'s own `whitespace-pre-line`.
        title: "Fabric to finished packaging\none factory",
        body: "Made in-house, start to finish, every step under one roof, always. No trading agent placing your order elsewhere.",
      },
      {
        title: "The same factory behind Capriowear",
        body: "Same facility and same quality system already trusted for Capriowear's activewear and teamwear.",
      },
      {
        title: "Your design, always protected",
        body: "NDA signed before any tech pack changes hands, so your product stays yours from first sketch to final shipment.",
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
      },
      {
        label: "Stitching and reinforcement",
      },
      {
        label: "Padding and construction",
      },
      {
        label: "Quality inspection",
      },
      {
        label: "Packed and shipped",
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
      label: "Factory video coming soon, Capriosports lifting gear and boxing and MMA manufacturing, Sialkot, Pakistan",
    },
  },

  // TRUST STRIP -- 4 tiles, TrustSignals' own item shape (title/body/image).
  // Images reused from the same factory-test set, matched by meaning to
  // Capriowear's own existing usage of these files (e.g. inside-factory-4
  // already reads "Worldwide Shipping" there too).
  // Copy replaced 2026-09-15 (owner-supplied text, verbatim, matching
  // Capriowear's own homepage trust strip word for word -- see
  // content/home.ts's own trustStrip and its comment for the same
  // update) -- was gear-specific wording ("Low MOQ, Sample to Bulk",
  // "Private Label, OEM & ODM", "Trusted Since 2009"); the owner's given
  // text applies to both divisions as a shared service description, not
  // product-specific, so it's used here verbatim rather than re-adapted.
  trustStrip: [
    {
      title: "Product Development",
      body: ["We refine ideas through sampling, pattern development, and technical adjustments to meet your needs."],
    },
    {
      title: "Private Label",
      body: ["Your designs, materials, labels and packaging. ", { bold: "Factory-direct, no middleman." }],
    },
    {
      title: "Low MOQ",
      body: ["Start from just 50 pieces per style. ", { bold: "From first samples to full bulk order." }],
    },
    {
      title: "Worldwide Shipping",
      body: ["DDP worldwide, from Sialkot, Pakistan. Export paperwork handled in house."],
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

  // WHAT WE MAKE / "PRODUCT RANGE" -- reuses Capriowear's OWN real
  // `WhatWeMake` component (components/sections/WhatWeMake.tsx) directly,
  // same `Card` category tiles/grid Capriowear's own homepage uses for
  // Activewear/Teamwear sub-categories -- not the bordered ul/li box
  // pattern the previous pass built (`WhatWeMakeRange.tsx`, removed).
  // Rendered directly under Trust Strip on the homepage (owner, 2026-09-15:
  // "under trust strip add categories section same like wear activewear
  // and teamwear section"), not in its earlier position near the bottom --
  // see app/page.tsx's own section order comment.
  // 7 tiles per category (owner-supplied list, replacing the previous
  // pass's shorter 4-tile lists) -- `WhatWeMake`'s own desktop grid fills
  // exactly 2 rows (8 cells: 7 tiles + 1 CTA), the same "CTA completes the
  // last row" rule Activewear's own 7-tile list already exercises on
  // Capriowear's homepage. CTA copy is "See the Full Range" (owner-given,
  // not the component's own default "View All {title}" wording) via
  // `WhatWeMake`'s new `ctaText` prop, passed once in app/page.tsx for
  // both categories.
  // Only `weight-lifting-belts` and `boxing-gloves` have real PLP pages
  // today (content/gear/*/categories.ts) -- every other tile links to its
  // parent division hub page via a unique `#slug` anchor instead of a 404,
  // per this project's own "protect real, already-indexed content over a
  // placeholder with no page yet" rule (docs/05-plan.md, 2026-09-14) --
  // `WhatWeMake`'s own `Card`/tile list keys by `href`, so each anchor must
  // be unique, not a bare repeated hub URL (a real React "same key" bug
  // the previous pass already hit once, see git history).
  // Images are explicit per tile (this content shape carries them
  // directly, same as `content/home.ts`'s own
  // `whatWeMake.categories[].tiles[].image`) -- cycled through the same 5
  // factory-test photos every other Capriosports section already reuses,
  // no per-tile photography yet.
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
          },
          {
            label: "Weightlifting Gloves",
            href: "/lifting-gears#weightlifting-gloves",
          },
          {
            label: "Wrist Wraps",
            href: "/lifting-gears#wrist-wraps",
          },
          {
            label: "Lifting Straps",
            href: "/lifting-gears#lifting-straps",
          },
          {
            label: "Knee Sleeves",
            href: "/lifting-gears#knee-sleeves",
          },
          {
            label: "Resistance Bands",
            href: "/lifting-gears#resistance-bands",
          },
          {
            label: "Gym Accessories",
            href: "/lifting-gears#gym-accessories",
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
          },
          {
            label: "MMA Gloves",
            href: "/boxing-and-mma#mma-gloves",
          },
          {
            label: "Coaching Mitts & Pads",
            href: "/boxing-and-mma#coaching-mitts-and-pads",
          },
          {
            label: "Kick Shields",
            href: "/boxing-and-mma#kick-shields",
          },
          {
            label: "Head Guards",
            href: "/boxing-and-mma#head-guards",
          },
          {
            label: "Shin Guards",
            href: "/boxing-and-mma#shin-guards",
          },
          {
            label: "Hand Wraps",
            href: "/boxing-and-mma#hand-wraps",
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
  // Eyebrow corrected "FULL CUSTOMIZATION" -> "OUR SERVICES" and
  // Materials and Construction's body reworded (owner, 2026-09-15,
  // explicit content update) -- matches Capriowear's own `home.services`
  // eyebrow exactly now too, not a gear-specific label.
  services: {
    eyebrow: "OUR SERVICES",
    h2: "From raw material to retail-ready packaging",
    // `lead` removed (owner, 2026-09-16: "remove the subline under the
    // services title") -- was "Every order is private label and fully
    // customized, start to finish." `OurServices.tsx`'s `lead` prop stays
    // optional, so omitting it here is a no-op for the component itself.
    items: [
      {
        title: "Custom Manufacturing",
        body: "Private label lifting gear and boxing and MMA equipment, OEM and ODM, made to your spec.",
      },
      {
        title: "Materials and Construction",
        body: "Cowhide leather and synthetic PU for boxing and MMA, nylon and neoprene for lifting gear, with multi-layer foam padding and reinforced stitching throughout.",
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

  // OUR STORY -- 11-milestone company timeline (OurStory.tsx), sticky-year
  // scroll mechanic, black surface. Placed after Our Services on the page
  // (owner, 2026-09-16: "add it after services section") -- the brief's
  // originally-stated order ("Trust strip -> Our Story -> Trusted by")
  // didn't match this page's actual live order (Trusted By already renders
  // before Trust Strip), so the owner picked this placement instead rather
  // than reordering the unrelated existing pair. `current: true` on the
  // last ("Today") item is a static designation, not scroll-computed -- no
  // JS tracks which milestone is "active", only CSS `position: sticky` for
  // the year-pin mechanic itself. No `image` set on any item yet (no
  // milestone-specific photography confidently on hand -- `public/
  // factory-test/*` is unlabeled test imagery, not verifiably tied to a
  // specific year) -- OurStory.tsx renders a clearly-styled placeholder
  // when `image` is absent; swap in real photos per milestone later.
  //
  // Copy replaced wholesale 2026-09-16 (owner-supplied full rewrite) --
  // gained an 11th milestone (2013, Capriowear's own origin as a side
  // experiment alongside the lifting gear line, distinct from the existing
  // 2013-14 "rented hall" entry) and every title/body rewritten in a more
  // narrative voice. Verbatim, not paraphrased.
  //
  // Revised again same day: the standalone "2019-2024 -- Trust,
  // compounding" card (a separate milestone between 2019 and 2020) was
  // dropped -- it overlapped the 2020 and 2024 cards that followed it,
  // breaking the sequential read of the timeline. Its idea folded into the
  // 2024 card instead ("Past 500, and staying"). Back down to 10 items.
  ourStory: {
    eyebrow: "OUR STORY",
    h2: "From a single room to a 75,000 sq ft factory floor",
    items: [
      {
        year: "2009",
        title: "Ground zero",
        body: "Caprio starts in Sialkot with one focus: lifting gear, made right. No shortcuts on stitching, no shortcuts on leather.",
      },
      {
        year: "2012",
        title: "Working out of one room",
        body: "The first production wasn't a factory, it was a room. Every belt cut and stitched by hand, order by order, before there was a floor to call our own.",
      },
      {
        year: "2013",
        title: "A second idea takes shape",
        body: "Watching activewear and teamwear demand grow, we start experimenting alongside the lifting gear line, small runs, no factory of its own yet, just a bet worth testing. That bet becomes Capriowear.",
      },
      {
        year: "2013-14",
        title: "Into a real hall",
        body: "The room becomes a rented production hall, bigger, but still building the footing for what a real bulk order would demand.",
      },
      {
        year: "2014",
        title: "The order that changed the math",
        body: "A breakthrough order lands from the United States, proof the model could hold up at export scale, not just survive it.",
      },
      {
        year: "2018",
        title: "Stepping into the ring",
        body: "Caprio moves beyond lifting gear into boxing and MMA equipment, becoming a two-line manufacturer built on the same cut-and-sew discipline.",
      },
      {
        year: "2019",
        title: "Room to grow",
        body: "Year over year, the floor, the machines and the team outgrow the hall. Caprio moves into a 75,000 sq ft facility built for real volume.",
      },
      {
        year: "2020",
        title: "Capriowear goes global",
        body: "What started as a side experiment in 2013 earns its own scale: large orders start arriving from America, Europe and Australia, putting Capriowear on the map alongside Caprio's gear business.",
      },
      {
        year: "2024",
        title: "Past 500, and staying",
        body: "The workforce crosses 500, more than double what it was a decade earlier. And the brands that started with small private-label test runs are still here, turned into long-term partnerships across the US and Europe.",
      },
      {
        year: "Today",
        title: "One factory, every line",
        body: "700+ people, 100,000+ units of monthly capacity, lifting gear, boxing and MMA equipment, and activewear shipped to 20+ countries, one factory, start to finish.",
        current: true,
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
    // 2026-09-16 owner spec: tagline + description no longer both state
    // "established" (that fact was repeated across the two lines) --
    // tagline now names the parent/division relationship, description
    // carries the one-liner (frontend register, "Caprio" -- visible copy
    // a visitor reads, not the schema-register "Capriosports" name).
    tagline: "Caprio, parent company of Capriowear",
    description: CAPRIOSPORTS_ORGANIZATION.identityLine.gearFrontend,
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
