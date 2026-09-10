// content/home.ts
// Single source of truth for all Capriowear homepage copy.
// Edit copy here only. Verify every string against the Figma design file; where the
// wireframe was hard to read it is marked with // VERIFY. No en dashes or em dashes.
import { companyIdentity } from "./site";

// What We Make's own tile shape (owner, 2026-09-07: "add a dummy product
// image ... see how it would look across home, PLP, PDP") -- `image` is
// optional and typed explicitly here (via `satisfies` on each `tiles`
// array below) rather than left to bare literal inference, so adding it to
// one tile doesn't create an inconsistent union across the array. `Card`
// (components/Card.tsx) already accepts this exact shape as its own
// `image` prop; `WhatWeMake.tsx` passes it straight through.
type WhatWeMakeTile = { label: string; href: string; image?: { src: string; alt: string } };

// Activewear's category breakdown -- shared verbatim between the desktop
// mega menu (Header.tsx, Figma node 493:3140) and the mobile drawer's own
// mega menu (MobileNav.tsx, Figma node 473:2919, built earlier the same
// day): one real design, read twice at two breakpoints, so this is one
// source instead of two copies that could quietly drift apart. hrefs follow
// the site's existing `/activewear/[slug]` convention, reusing the exact
// slugs already used by whatWeMake's own Activewear tiles for the same real
// products (Sports Bras, Hoodies, Leggings, Shorts, Joggers & Track Pants,
// Tracksuits, the Base Layers entry).
export const activewearMegaMenu = [
  {
    label: "TOPS",
    items: [
      { label: "Sports Bras", href: "/activewear/sports-bras" },
      { label: "Tank Tops", href: "/activewear/tank-tops" },
      { label: "T-Shirts", href: "/activewear/t-shirts" },
      { label: "Long-Sleeve Tops", href: "/activewear/long-sleeve-tops" },
      { label: "Hoodies", href: "/activewear/hoodies" },
      { label: "Sweatshirts", href: "/activewear/sweatshirts" },
    ],
  },
  {
    label: "BOTTOMS",
    items: [
      { label: "Leggings", href: "/activewear/leggings" },
      { label: "Shorts", href: "/activewear/shorts" },
      { label: "Joggers & Track Pants", href: "/activewear/joggers-track-pants" },
    ],
  },
  {
    label: "SETS & ONE PIECES",
    items: [
      { label: "Yoga Sets", href: "/activewear/yoga-sets" },
      { label: "Bodysuits", href: "/activewear/bodysuits" },
      { label: "Jumpsuits", href: "/activewear/jumpsuits" },
    ],
  },
  {
    label: "OUTWEAR & SUITS",
    items: [
      { label: "Jackets", href: "/activewear/jackets" },
      { label: "Track Jackets & Zip-Ups", href: "/activewear/track-jackets" },
      { label: "Tracksuits", href: "/activewear/tracksuits" },
      { label: "Sweatsuits", href: "/activewear/sweatsuits" },
      { label: "Running Wear", href: "/activewear/running-wear" },
    ],
  },
  {
    label: "BASE LAYERS",
    items: [{ label: "Base Layers & Compression", href: "/activewear/compression-base-layers" }],
  },
];

// Teamwear & Uniforms' own category breakdown (Figma node 485:2992,
// 2026-08-27, mobile frame) -- shared verbatim between the mobile drawer's
// megaMenu and desktop's own mega menu panel, same reasoning as
// `activewearMegaMenu` above: one real design, read once, not two copies
// that could drift. Only 2 groups here (UNIFORMS, OTHERS), unlike
// Activewear's 5 -- Figma's own real content, not a trimmed-down guess.
// hrefs follow the same `/teamwear/[slug]` convention, reusing the exact
// slugs already used by whatWeMake's own Teamwear tiles for the same real
// products (Soccer/Basketball/Football Uniforms, the Fighting Wear entry).
// Cricket, then Basketball, then Rugby, then Baseball, then Volleyball,
// moved first with their own hrefs corrected to their real slugs
// ("/teamwear/cricket", "/teamwear/basketball", "/teamwear/rugby",
// "/teamwear/baseball", "/teamwear/volleyball" -- owner spec: all five are
// Teamwear's real, built categories now, content/teamwear/{cricket,
// basketball,rugby,baseball,volleyball}.ts) -- same "confirm the mega-menu
// href matches the real slug" check every category has followed since the
// Track Jackets & Zip-Ups mega-menu mismatch, 2026-08-31. Every other item
// in this group has no content file yet and 404s if clicked, same as before
// this change -- unrelated to this task, left as-is.
export const teamwearMegaMenu = [
  {
    label: "UNIFORMS",
    items: [
      { label: "Cricket Uniforms", href: "/teamwear/cricket" },
      { label: "Basketball Uniforms", href: "/teamwear/basketball" },
      { label: "Rugby Uniforms", href: "/teamwear/rugby" },
      { label: "Baseball Uniforms", href: "/teamwear/baseball" },
      { label: "Volleyball Uniforms", href: "/teamwear/volleyball" },
      { label: "Soccer Uniforms", href: "/teamwear/soccer" },
      { label: "Football Uniforms", href: "/teamwear/football" },
      { label: "Ice Hockey Jerseys", href: "/teamwear/ice-hockey" },
    ],
  },
  {
    label: "OTHERS",
    items: [
      { label: "Cycling Kits", href: "/teamwear/cycling" },
      { label: "Rash Guards & Fight Wear", href: "/teamwear/fight-wear" },
    ],
  },
];

export const home = {
  nav: {
    // The logo mark reads "CAPRIO" (Caprio Sports' own mark), but this stays
    // the site's real name: it is the header's accessible name (aria-label on
    // the home link), not visible text, so it should name the actual site.
    brand: "CAPRIOWEAR",
    // No longer rendered: the real header (Figma node 316:1331) uses the logo
    // alone, no text subline. Kept for the text-brand fallback in /styleguide
    // and any future page built without a logo asset.
    brandParent: "by Caprio Sports",
    // The real nav, read from Figma node 316:1331: four plain links. Both
    // Activewear and Teamwear & Uniforms now have a real mega menu (Figma
    // nodes 493:3140 and 485:2992, both 2026-08-27) -- Services and Factory
    // Tour stay plain links until their own real category content exists.
    // "Our Factory" -> "Factory Tour" (owner call, 2026-08-28), href
    // unchanged -- still /our-factory.
    links: [
      { label: "Activewear", href: "/activewear", megaMenu: activewearMegaMenu },
      { label: "Teamwear & Uniforms", href: "/teamwear", megaMenu: teamwearMegaMenu },
      { label: "Services", href: "/services" },
      { label: "Factory Tour", href: "/our-factory" },
    ],
    // The mobile drawer's own real design (Figma node 465:2817, 2026-08-27)
    // is a flat list, not derived from `links` above: it adds a 5th item
    // ("Our Story", not on desktop) and a `chevron` flag Figma shows on
    // exactly two rows (Activewear, Teamwear & Uniforms), both of which now
    // push a second in-drawer screen instead of navigating (see
    // MobileNav.tsx). Kept as its own dataset rather than reusing `links` +
    // desktop's `megaMenu` field directly so a future desktop-only nav
    // change can't accidentally affect the drawer's shape.
    mobileLinks: [
      {
        label: "Activewear",
        href: "/activewear",
        chevron: true,
        megaMenu: activewearMegaMenu,
      },
      {
        label: "Teamwear & Uniforms",
        href: "/teamwear",
        chevron: true,
        megaMenu: teamwearMegaMenu,
      },
      { label: "Services", href: "/services", chevron: false },
      { label: "Factory Tour", href: "/our-factory", chevron: false },
      { label: "Our Story", href: "/our-story", chevron: false },
    ],
    // "Get in touch" block at the foot of the mobile drawer -- same email
    // Footer already uses (content/home.ts's own footer.contact.email).
    contact: { label: "Get in touch", email: "hello@capriosports.com" },
    cta: { label: "Request a Sample", href: "/request-a-sample" },
    secondaryCta: { label: "Download Catalog", href: "/catalog" },
  },

  hero: {
    eyebrow: "BASED IN SIALKOT, PAKISTAN", // matches the wireframe; the content doc says "MADE IN". VERIFY
    h1: "Custom OEM & ODM activewear & teamwear manufacturer", // VERIFY exact H1
    ctaPrimary: { label: "Request a Sample", href: "/request-a-sample" },
    ctaSecondary: { label: "Download Catalog", href: "/catalog" },
    media: { type: "video", label: "Hero video, factory and product" },
  },

  customOfferings: {
    label: "Fully Custom Offerings",
    // Desktop Marquee's own 9 individual items, confirmed against Figma --
    // unaffected by `mobileItems` below.
    items: ["Design", "Fabric", "Fit", "Color", "Print & Embroidery", "Branding", "Trims", "Labels", "Packaging"],
    // Owner, 2026-09-10: "I asked you to use the fully custom section from
    // the services page" -- not just that section's typography/alignment
    // (already applied via `servicesHero.tickerMobile*`, see Hero.tsx) but
    // its own 5-paired-item mobile list too, same wording as `services.
    // hero.mobileTickerItems` (content/services.ts) verbatim -- these are
    // the exact same 9 words above, just regrouped into pairs, not new
    // copy. Mobile-only: desktop Marquee keeps the 9-item `items` list
    // above, unaffected.
    mobileItems: ["Design & Color", "Fabric & Fit", "Print & Embroidery", "Branding & Trims", "Labels & Packaging"],
  },

  // Real Figma design (desktop node 341:1732, mobile node 343:1840) has no
  // eyebrow/label above the logos at all -- the earlier "PRODUCING FOR BRANDS
  // WORLDWIDE" label was a wireframe-era guess with no real design behind it.
  // Permission confirmed 2026-08-24: real logo artwork, exported directly off
  // each brand's own Figma node (not a generic web search) so the exact mark
  // and crop matches the design.
  //
  // `width`/`height` are each file's exact Figma DISPLAY size (the node's own
  // export dimensions), not just the source file's intrinsic size -- rendered
  // with no size-overriding class on desktop, so every logo shows at exactly
  // the size it has in Figma, not scaled to a shared height.
  //
  // WOLFpak is icon-only on desktop (its own node has no wordmark) but the
  // mobile grid's actual fill for that cell is icon-plus-wordmark together --
  // two different real assets for the same brand, not one reused, so
  // `mobileOverride` carries the second one. Confirmed by exporting both
  // nodes directly after a first read misjudged the desktop crop's tiny
  // export as ambiguous between "WOLFpak" and "OLFpak".
  //
  // Desktop and mobile show the same 8 logos in a genuinely different order
  // (a left-to-right ticker vs. a 2-column, row-major grid), so both real
  // orders are kept as references into one registry rather than duplicating
  // the image data twice.
  // `mobileWidth`/`mobileHeight`: Figma's mobile grid shows each logo at its
  // own distinct size, not the desktop ticker's size reused smaller -- both
  // read directly from the mobile frame's per-cell fill dimensions (node
  // 343:1841's children), not derived or guessed from the desktop numbers.
  // Title added 2026-08-26 (owner call, referencing tedy.app's "Trusted by
  // 500+ businesses" treatment) -- not in the original Figma frame, a
  // deliberate addition on top of it. Desktop sits it beside the ticker;
  // mobile stacks it above the grid.
  brandLogos: {
    title: "Trusted by top brands worldwide",
    registry: {
      MyProtein: {
        src: "/logos/myprotein.png",
        width: 226,
        height: 29,
        mobileWidth: 135,
        mobileHeight: 17,
      },
      Gymreapers: {
        src: "/logos/gymreapers.png",
        width: 219,
        height: 44,
        mobileWidth: 136,
        mobileHeight: 27,
      },
      Youngla: {
        src: "/logos/youngla.png",
        width: 216,
        height: 22,
        mobileWidth: 136,
        mobileHeight: 14,
      },
      GymBeam: {
        src: "/logos/gymbeam.png",
        width: 155,
        height: 34,
        mobileWidth: 107,
        mobileHeight: 23,
      },
      "Evolution Athletics": {
        src: "/logos/evolution-athletics.png",
        width: 72,
        height: 72,
        mobileWidth: 57,
        mobileHeight: 57,
      },
      RISE: {
        src: "/logos/rise.png",
        width: 103,
        height: 31,
        mobileWidth: 76,
        mobileHeight: 23,
      },
      WOLFpak: {
        src: "/logos/wolfpak.png",
        width: 58,
        height: 57,
        // Never actually read at runtime -- mobile always uses mobileOverride
        // below for this brand -- kept only so every registry entry has the
        // same shape.
        mobileWidth: 58,
        mobileHeight: 57,
        // Icon-only on desktop; the mobile grid's real fill for this cell is
        // icon-plus-wordmark, a different asset, not the same mark reused
        // smaller -- see the note above the registry.
        mobileOverride: { src: "/logos/wolfpak-mobile.png", mobileWidth: 50, mobileHeight: 57 },
      },
      Capo: {
        src: "/logos/capo.png",
        width: 112,
        height: 30,
        mobileWidth: 75,
        mobileHeight: 20,
      },
    },
    itemsDesktop: ["MyProtein", "Gymreapers", "Youngla", "GymBeam", "Evolution Athletics", "RISE", "WOLFpak", "Capo"],
    itemsMobile: ["MyProtein", "GymBeam", "Gymreapers", "RISE", "Youngla", "Capo", "Evolution Athletics", "WOLFpak"],
  },

  // Order and copy re-confirmed against the section's own redesigned Figma
  // frame (owner, 2026-09-09, nodes 890:253/890:279 -- "for full content,
  // use this"): Product Development, Private Label, Low MOQ, Worldwide
  // Shipping, matching that frame's real left-to-right card order (was
  // Product Development, Low MOQ, Private Label, Worldwide Shipping, the
  // old media+2-column layout's own column-major reading order). Both
  // former `// VERIFY` flags (Low MOQ, Worldwide Shipping) are resolved --
  // this frame confirms both titles exactly. body is a segment array so
  // the two items with a real Figma bold span (Low MOQ, Private Label) can
  // mark it without a full rich-text system; a plain segment is just a
  // string.
  trustStrip: [
    {
      title: "Product Development",
      body: ["We refine ideas through sampling, pattern development, and technical adjustments to meet your needs."],
    },
    {
      title: "Private Label",
      body: ["Your designs, fabrics, labels and packaging. ", { bold: "Factory-direct, no middleman." }],
    },
    {
      title: "Low MOQ",
      // Bold span corrected to match this frame's real emphasis -- the
      // previous copy (still sourced from the earlier frame) bolded "50
      // pieces per style" instead.
      body: ["Start from just 50 pieces per style. ", { bold: "From first samples to full bulk order." }],
    },
    {
      title: "Worldwide Shipping",
      body: ["DDP to the USA, UK, Europe, Canada and Australia. GSP+ 0% EU import duty."],
    },
  ],

  // body is a segment array (see trustStrip's own note above for why) --
  // Activewear's real Figma copy carries one bold span ("from sample to
  // bulk"). Teamwear & Uniforms had no confirmed Figma frame; its real copy
  // was given directly by the owner 2026-08-23, no bold span in it.
  whatWeMake: {
    eyebrow: "WHAT WE MAKE",
    h2: "End-to-end activewear and teamwear manufacturing",
    categories: [
      {
        title: "Activewear",
        body: [
          "Custom, private-label gym, yoga, running and athleisure apparel, made to your brand's spec, ",
          { bold: "from sample to bulk" },
          ".",
        ],
        href: "/activewear",
        tiles: [
          // Placeholder/QA photo (owner, 2026-09-07) -- the same one real
          // photo used on the Leggings PLP card/PDP gallery
          // (content/activewear/leggings.ts's own high-waisted-compression
          // style), referenced once and reused, not a second copy of the
          // same fact. Every other tile below has no photo, so stays a
          // placeholder box exactly as before.
          {
            label: "Leggings",
            href: "/activewear/leggings",
            image: {
              src: "/product-images/leggings-high-waisted-compression.png",
              alt: "Custom high-waisted compression leggings",
            },
          },
          { label: "Sports Bras", href: "/activewear/sports-bras" },
          { label: "Shorts", href: "/activewear/shorts" },
          { label: "Hoodies", href: "/activewear/hoodies" },
          { label: "Joggers & Track Pants", href: "/activewear/joggers-track-pants" },
          { label: "Tracksuits", href: "/activewear/tracksuits" },
          { label: "Base Layers", href: "/activewear/compression-base-layers" },
        ] satisfies WhatWeMakeTile[],
      },
      {
        title: "Teamwear & Uniforms",
        body: [
          "Fully sublimated custom uniforms and kits for clubs, schools and teamwear brands, low ",
          { bold: "MOQ to bulk" },
          ".",
        ],
        href: "/teamwear",
        tiles: [
          { label: "Soccer Uniforms", href: "/teamwear/soccer" },
          { label: "Basketball Uniforms", href: "/teamwear/basketball-uniforms" },
          { label: "Football Uniforms", href: "/teamwear/football" },
          { label: "Fighting Wear", href: "/teamwear/fight-wear" },
        ] satisfies WhatWeMakeTile[],
      },
    ],
  },

  // Logo files exported per-node from Figma (node 369:266's 6 "Logo" frames),
  // matching the same per-node-export convention brandLogos established --
  // the composited export already includes each mark's own padding/inset, so
  // it's used at its own exact size, not cropped or re-padded.
  //
  // mobileSrc is a SEPARATE export (node 375:435's own per-cell image nodes),
  // not the desktop file reused at mobile's tile size -- BSCI and IMAC in
  // particular crop to a genuinely different aspect ratio on mobile than on
  // desktop (e.g. BSCI is 156:134 on desktop but 119:43 on mobile), so
  // displaying the desktop file at the mobile box's dimensions stretched the
  // artwork. Every logo gets its own mobile export for consistency, even
  // where the two ratios happen to be close.
  certified: {
    eyebrow: "CERTIFIED & COMPLIANT",
    h2: "Audited for quality, safety, environment, and ethics",
    logos: [
      {
        name: "ISO 9001",
        src: "/logos/cert-iso9001.png",
        width: 135,
        height: 135,
        mobileSrc: "/logos/cert-iso9001-mobile.png",
        mobileWidth: 77,
        mobileHeight: 76,
      },
      {
        name: "ISO 45001",
        src: "/logos/cert-iso45001.png",
        width: 135,
        height: 135,
        mobileSrc: "/logos/cert-iso45001-mobile.png",
        mobileWidth: 73,
        mobileHeight: 77,
      },
      {
        name: "ISO 14001",
        src: "/logos/cert-iso14001.png",
        width: 135,
        height: 135,
        mobileSrc: "/logos/cert-iso14001-mobile.png",
        mobileWidth: 82,
        mobileHeight: 74,
      },
      {
        name: "BSCI",
        src: "/logos/cert-bsci.png",
        width: 156,
        height: 134,
        mobileSrc: "/logos/cert-bsci-mobile.png",
        mobileWidth: 119,
        mobileHeight: 43,
      },
      {
        name: "IMAC (No Child Labor)",
        src: "/logos/cert-imac.png",
        width: 135,
        height: 135,
        mobileSrc: "/logos/cert-imac-mobile.png",
        mobileWidth: 97,
        mobileHeight: 47,
      },
      {
        name: "WFSGI",
        src: "/logos/cert-wfsgi.png",
        mobileSrc: "/logos/cert-wfsgi-mobile.png",
        width: 135,
        height: 135,
        mobileWidth: 76,
        mobileHeight: 76,
      },
    ],
  },

  // Real Figma copy (node 387:498 desktop, 387:511 mobile), replacing the
  // earlier wireframe-era placeholder captions. Figma's own two frames
  // disagreed on the second stat (desktop "75,000 sq ft", mobile "50,000 sq
  // ft") -- owner resolved 2026-08-24: follow desktop on both breakpoints.
  stats: [
    {
      value: "Since 2009",
      caption: "Delivering to 80+ brands in 20+ countries worldwide.",
    },
    {
      value: "75,000 sq ft",
      caption: "A fully in-house production facility to take on your bulk order.",
    },
    {
      value: "100,000+",
      caption: "Monthly capacity that scales with your brand, from first sample to bulk order.",
    },
  ],

  // Real Figma frame (node 402:904 desktop, 402:914 mobile) is a centred
  // heading plus an image gallery only -- no body copy or CTA button
  // anywhere in it. The earlier body/cta were a wireframe-era guess with no
  // real design behind them, the same story as Trust Signals' first pass.
  insideFactory: {
    eyebrow: "INSIDE THE FACTORY",
    h2: "Cutting, stitching, printing and QC under one roof",
    // Real photography on the first 4 shots only (owner, 2026-09-10: "let's
    // add 4 images... to test how it will work with images"), 5th stays a
    // placeholder -- a deliberate mixed state for this test, not a mistake.
    // Not real factory floor photography (stand-in product/model shots the
    // owner had on hand) -- swap for the real thing later, same `image`
    // contract `content/our-factory.ts`'s own `image: { src }` shape uses.
    media: [
      { label: "Factory shot 1", image: { src: "/factory-test/factory-test-1.png" } },
      { label: "Factory shot 2", image: { src: "/factory-test/factory-test-2.png" } },
      { label: "Factory shot 3", image: { src: "/factory-test/factory-test-3.png" } },
      { label: "Factory shot 4", image: { src: "/factory-test/factory-test-4.png" } },
      { label: "Factory shot 5" },
    ],
    // "Explore Our Factory" -> "Take Factory Tour" (owner call, 2026-08-28,
    // matching the nav's own "Our Factory" -> "Factory Tour" rename), href
    // unchanged -- still /our-factory.
    cta: { label: "Take Factory Tour", href: "/our-factory" },
  },

  // 8 items, confirmed via get_design_context against both the desktop
  // (409:5309) and mobile (409:5342) frames -- a 9th, "Safe, audited
  // workplace", was trimmed 2026-08-24 to match: no real design has it.
  complianceTicker: {
    title: "STANDARD ON EVERY ORDER",
    items: [
      "NDA before tech pack",
      "Pre-shipment inspection",
      "GSP+ Form A per container",
      "AQL 2.5 inspection",
      "ISO 9001 certified",
      "BSCI ethical audit",
      "No child labor",
      "OEKO-TEX materials",
    ],
  },

  // Body copy matches Figma's own "Our Services" frame exactly (owner call,
  // 2026-08-25 -- replaced this file's earlier, differently-worded guess).
  services: {
    eyebrow: "OUR SERVICES",
    h2: "From raw fabric to retail-ready packaging",
    items: [
      { title: "Custom Manufacturing", body: "Bring a tech pack or a sketch. We handle patterns, grading fit and development, from sample to bulk." },
      { title: "Fabrics & Materials", body: "Sourcing premium raw fabrics and materials from textile mills that supply to leading global brands." },
      { title: "Printing & Branding", body: "Sublimation, silicone, screen, DTG, DTF, embroidery and tackle twill, plus labels, hangtags & packaging." },
      { title: "Quality & Compliance", body: "End-to-end handling of packaging, freight and delivery. We ensure your order arrives on schedule." },
      { title: "Logistics & Fulfilment", body: "Inline and final inspections done by independent audits, shipments leave with proper documentation." },
    ],
  },

  // Body copy is shared across both breakpoints (owner call, 2026-08-25);
  // Figma's own two frames disagreed slightly (desktop's step 1 said "24
  // hours", mobile said "24 to 48"); step 1 was corrected back to desktop's
  // "24 hours" (owner call, 2026-08-25), every other step keeps mobile's
  // fuller wording. No `n`/step-number field -- neither real Figma frame
  // shows one (that was a pre-Figma guess FeatureNumbered was built around;
  // both are now dropped, see components/Card.tsx's CapabilityCard instead).
  howItWorks: {
    eyebrow: "HOW IT WORKS",
    h2: "From tech pack to shipped order in five easy steps",
    steps: [
      { title: "Inquiry & Quote", body: "Send your tech pack or sketch. Clear quote, MOQs, bulk pricing and timeline in 24 hours." },
      { title: "Sampling", body: "We develop your sample in 10 to 14 days. Refine the fit, fabric and finish with us until you're satisfied." },
      { title: "Bulk Production", body: "Bulk runs factory-direct through our in-house line: cut, stitched, printed, finished." },
      { title: "Quality Control", body: "Checked at multiple stages to AQL 2.5, third-party inspection is also welcome at our facility." },
      { title: "Packaging & Shipping", body: "Packed to your spec and shipped: FOB, CIF or DDP, all the paperwork is managed in-house." },
    ],
  },

  // Real Figma design (desktop node 438:2150, mobile node 438:2192) has no
  // eyebrow above the heading, just one large heading -- the earlier eyebrow
  // was a wireframe-era guess. Copy is sourced from the dedicated copy node
  // 438:2262 on both breakpoints (not the slightly different MOQ-answer
  // wording that happens to appear inline in the two layout frames), so
  // there is one accurate answer per question, matching what the FAQPage
  // schema (lib/schema.ts) mirrors verbatim.
  faq: {
    h2: "Top questions from B2B buyers",
    items: [
      {
        q: "What services do you offer?",
        // companyIdentity (content/site.ts) interpolated, not retyped, so
        // this can never drift out of sync with the same sentence used
        // everywhere else (entity-intro spec, 2026-09-01) -- the rest of
        // this answer is bespoke, not one of the four stored variants.
        a: `${companyIdentity} We offer OEM, ODM and private label production. From your tech pack, sketch or idea, we handle fabric sourcing, patterns and grading, fit and sampling, bulk production, printing and branding, quality control and packaging. One factory, start to finish.`,
      },
      {
        q: "What's your minimum order quantity (MOQ)?",
        a: "Our MOQ starts at 50 pieces per style. Low enough to launch or test a line, with the capacity to scale to full bulk.",
      },
      {
        q: "Are you a factory or a middleman?",
        a: "We are a direct factory, our own 75,000 sq ft facility in Sialkot, Pakistan. Every quote comes from our own floor, with no agents or middlemen, so you get factory-direct pricing and full control of your product.",
      },
      {
        q: "Do you offer OEM, ODM and private label?",
        a: "Yes, all three. Build from your own tech pack (OEM), develop a product with our team (ODM), or apply your brand to our proven styles (private label). Everything is made under your label and stays 100% yours.",
      },
      {
        q: "How long do samples & bulk production take?",
        a: "Samples take 10 to 14 days. Bulk production starts once you approve the sample, with the timeline confirmed on your quote and updates throughout. Bulk lead time depends on quantity and customization.",
      },
      {
        q: "Do you ship to my country?",
        a: "Yes. We export to 20+ countries, with DDP delivery to the US, UK, EU, Canada and Australia. EU orders benefit from GSP+ 0% import duty, and all export paperwork is handled in house.",
      },
      {
        q: "What certifications do you hold?",
        a: "We hold ISO 9001, ISO 45001 and ISO 14001, plus CE and BSCI, with no child labor monitoring (IMAC). We are members of PSGMEA, PRGMEA and WFSGI, and we welcome third-party inspection.",
      },
      {
        q: "Will my designs stay protected?",
        a: "Yes. We sign an NDA before you share any tech pack, and your designs, patterns and samples stay your intellectual property. We never resell or reuse your styles.",
      },
      {
        q: "How do I get started?",
        a: "Send your tech pack, sketch or idea by email or WhatsApp. We'll come back within 24 hours with next steps.",
      },
    ],
  },

  // Figma desktop node 455:2375, mobile node 455:2387 -- heading plus an
  // image gallery only, no CTA (unlike Inside the Factory). The real Figma
  // frame shows 3 "Step" cards; 5 placeholders are kept here for now (owner
  // call, 2026-08-26) so the section has real content to page through
  // before final exhibition photography is confirmed -- swap or trim this
  // list freely later, the section itself doesn't assume a fixed count.
  // Desktop reuses How It Works' scroll-snap-start chevron carousel and
  // mobile reuses Inside the Factory's swipeable carousel verbatim (owner
  // instruction, 2026-08-26) -- see components/sections/Exhibitions.tsx.
  exhibitions: {
    eyebrow: "CAPRIOWEAR AT EXHIBITIONS",
    h2: "Global exhibitions, meet the factory in person",
    media: [
      { label: "Exhibition shot 1" },
      { label: "Exhibition shot 2" },
      { label: "Exhibition shot 3" },
      { label: "Exhibition shot 4" },
      { label: "Exhibition shot 5" },
    ],
  },

  finalCta: {
    h2: "Let's build your custom collection",
    // Owner update, 2026-08-30. "\n" (owner, 2026-09-09: "make with next
    // steps in 2nd line," desktop only) forces "with next steps." onto its
    // own line on desktop -- `FinalCta.tsx`'s desktop subline renders a
    // real `<br/>` at this marker; mobile strips it back to a plain space,
    // keeping its own natural wrap unaffected (not asked for there). Also
    // reused verbatim on /services (its own first `FinalCta`, `home.
    // finalCta`), so this break applies there too, same content object.
    subline: "Tell us what you're making. We'll come back within 24 hours\nwith next steps.",
    cta: { label: "Request a Sample", href: "/request-a-sample" },
    // Secondary "Download Catalog" button (owner, 2026-09-08: "on home,
    // under exhibition cta section add download catalog cta too") -- same
    // `FinalCta` prop already added everywhere else (`closingCta` above,
    // every PLP/PDP, Services).
    secondaryCta: { label: "Download Catalog", href: "/catalog" },
  },

  // A second CTA band, same component and styling as `finalCta` above
  // (`<FinalCta>`, reused a second time), placed after FAQ as the page's
  // real closing prompt -- own copy, not a duplicate of finalCta's text
  // (owner request, 2026-08-27: "same CTA section as below Exhibitions,"
  // new copy since repeating identical text twice on one page reads oddly).
  // Shares `complianceTicker` with `finalCta` -- no second ticker dataset
  // exists, and repeating the same compliance claims as a closing
  // reinforcement is consistent with how the rest of the page already
  // reuses components with different content rather than forking them.
  closingCta: {
    // "Let's talk." dropped from the heading (owner call, 2026-08-27) --
    // the subline and the "Let's Talk" button now carry that framing
    // instead of the heading repeating it.
    h2: "Still have questions?",
    // Owner update, 2026-08-30.
    subline: "Ask us anything, from MOQs to fabrics to lead times. Our team will get back to you within 24 hours.",
    // Owner call, 2026-08-27: "Let's Talk" over "Request a Sample" (the
    // sitewide default) -- still links to the same request-a-sample form as
    // every other CTA, not a new destination.
    cta: { label: "Let's Talk", href: "/request-a-sample" },
    // Secondary "Download Catalog" button (owner, 2026-09-08: "wherever we
    // use cta in the middle of the page, add download catalog as you did
    // for services under faq section ... all plp, pdp, homepage, services")
    // -- same `FinalCta` prop already added for the Services page's own
    // FAQ-adjacent closing CTA (2026-09-07), now applied to every other
    // page's FAQ-adjacent CTA too (this one on the homepage, `app/page.tsx`).
    secondaryCta: { label: "Download Catalog", href: "/catalog" },
  },

  // Homepage section 15, the site footer. Figma desktop node 461:2650
  // (1440x720) -- desktop only for now, no mobile frame shared yet (owner
  // call, 2026-08-26). Social links themselves live in content/site.ts's
  // ORGANIZATION.sameAs (single source of truth, already feeding
  // organizationSchema()), not duplicated here.
  //
  // hrefs reuse the same real routes as home.nav/home.insideFactory.cta
  // where they overlap. "Our Story" is the one genuinely new link here --
  // no page exists at /our-story yet, same "link ahead of the page" pattern
  // already accepted elsewhere on this site (e.g. Header's own nav links
  // before their pages existed).
  footer: {
    tagline: "Capriowear, a division of Caprio Sports",
    description:
      "Custom activewear and teamwear manufacturer, private label from fabric to packaging. Cut-and-sew, factory-direct from Sialkot, Pakistan.",
    nav: {
      // Activewear/Teamwear & Uniforms added ahead of Services (owner,
      // 2026-09-07: "in the footer, all platforms, we are missing
      // activewear and teamwear & uniforms, add them on top of services")
      // -- same label/href pair already used by the header nav
      // (home.nav.links above), not a new route.
      columnOne: [
        { label: "Activewear", href: "/activewear" },
        { label: "Teamwear & Uniforms", href: "/teamwear" },
        { label: "Services", href: "/services" },
        { label: "Our Factory", href: "/our-factory" },
        { label: "Our Story", href: "/our-story" },
      ],
      // Request a Sample before Download Catalog (owner, 2026-09-10: "Make
      // request a sample first then download catalog" -- was the reverse
      // order). Privacy Policy appended the same turn ("add privacy policy
      // page link") -- no route built for it yet, same "nav link exists
      // ahead of its page" precedent Our Story/Download Catalog/Request a
      // Sample already established below and elsewhere on this site.
      columnTwo: [
        { label: "Request a Sample", href: "/request-a-sample" },
        { label: "Download Catalog", href: "/catalog" },
        { label: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
    contact: { label: "Get in touch", email: "hello@capriosports.com" },
    address: "10 KM from Daska road, Sialkot, Pakistan",
    copyright: "Caprio 2009-2026. All Rights Reserved",
  },
};
