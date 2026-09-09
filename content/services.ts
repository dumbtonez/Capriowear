// content/services.ts
// The /services page, built section by section from Figma (owner brief,
// 2026-09-07). Each section's content lives here, typed, same pattern as
// content/home.ts -- a page is content plus components, other pages reuse
// the same components with different data.
//
// metaTitle/metaDescription are a first draft, not owner-confirmed copy --
// no meta title/description has been given yet for this page. Follows the
// sitewide "Custom [Product] Manufacturer" keyword form (docs/06-seo.md)
// and the same bare-string-plus-root-template shape every other page's
// title already uses (SITE_NAME's own "%s | Capriowear" template, see
// app/layout.tsx) -- flagged here so it's swapped for real copy once given,
// not silently treated as final.
//
// `NoteSegment` (from content/activewear/types.ts) is reused for
// `intro.paragraph` below -- same "typed segment array instead of bold
// markup embedded in a plain string" shape FabricOptions' own closing note
// already uses, not a second bespoke type for an identical shape.
import type { NoteSegment } from "@/content/activewear/types";

// Declared outside the `as const` object below so it can carry its own
// `NoteSegment[]` annotation -- `as const` on the object as a whole would
// otherwise narrow each segment to its own literal shape and drop the
// optional `bold` field off segments that omit it.
//
// Back to a single paragraph, 2026-09-10 -- the section itself was rebuilt
// to match a new Figma frame (node 886:181, owner: "a factory you can buil
// section change it to this style"), which reads as one paragraph, not the
// 2026-09-07 split above's two ("the subline of this section divide into 2
// parts"). The new frame also moves "17+ years of experience"/"our own
// 75,000 sq ft facility" out of the paragraph entirely, into a proper 2-stat
// row (see `intro.stats` below) -- 75,000 sq ft itself is dropped, since the
// new frame's second stat is "100,000+ Monthly capacity" instead (Stats'
// own confirmed figures, not a third number invented for this section).
// See ServicesIntro.tsx for the new dark, stats-row layout.
const introParagraph: NoteSegment[] = [
  {
    text: "Capriowear is a custom activewear and teamwear manufacturer offering OEM, ODM and private label production, custom from fabric to packaging, with ",
  },
  { text: "low minimums and worldwide delivery", bold: true },
  { text: ". We are the activewear and teamwear division of Caprio Sports, a " },
  { text: "cut-and-sew manufacturer in Sialkot, Pakistan.", bold: true },
];

// Section 3's own closing note (Figma node 750:821) -- same NoteSegment
// shape as introParagraph above, reused for the same reason.
const howWeWorkNote: NoteSegment[] = [
  { text: "Many programs " },
  { text: "combine them", bold: true },
  { text: ", for example " },
  { text: "we develop the design (ODM) and produce it as your private label", bold: true },
  { text: ". Tell us what you have and we map the fastest, cleanest route." },
];

export const services = {
  // metaTitle renders as "%s | Capriowear" via the layout title template
  // (app/layout.tsx). Keyword-form title (activewear + teamwear +
  // manufacturing services); location + factory-direct sit in the meta
  // description. Confirmed copy (owner, 2026-09-08), was a placeholder.
  metaTitle: "Custom Activewear & Teamwear Manufacturing Services",
  metaDescription:
    "OEM, ODM and private label activewear and teamwear manufacturing services, from fabric sourcing to retail-ready packaging, factory-direct from Sialkot, Pakistan.",

  // Section 1: Hero. Figma desktop node 729:139. Copy is the design's own
  // real headline (not a placeholder) -- no separate copy doc entry exists
  // for this page yet, so this is read directly off the Figma text layer.
  hero: {
    h1: "Custom activewear and teamwear, from fabric to packaging",
    ctaPrimary: { label: "Request a Sample", href: "/request-a-sample" },
    ctaSecondary: { label: "Download Catalog", href: "/catalog" },
    // Mobile-only ticker copy (owner, 2026-09-07): the same 9 items
    // `home.customOfferings.items` lists individually (Design, Fabric, Fit,
    // Color, Print & Embroidery, Branding, Trims, Labels, Packaging),
    // paired down to 5 lines for this page's own mobile list -- desktop
    // still renders the shared `home.customOfferings.items` marquee
    // unchanged (see ServicesHero.tsx). Not a home.ts change since the
    // homepage's own mobile list keeps the original 9 individual items.
    mobileTickerItems: [
      "Design & Color",
      "Fabric & Fit",
      "Print & Embroidery",
      "Branding & Trims",
      "Labels & Packaging",
    ],
  },

  // Section 2: Intro statement. Rebuilt 2026-09-10 to a new Figma frame,
  // desktop node 886:181 (owner: "a factory you can buil section change it
  // to this style") -- supersedes the original 733:529 build. Dark section
  // now (was light+image), heading + one rich-text paragraph + a 2-stat row
  // with a gradient divider above each number, no media at all. Copy
  // (heading + paragraph + both stats) is the new frame's own real text
  // layer, read directly. Paragraph is segmented, not a single string, so
  // the semibold phrases Figma marks inline ("low minimums and worldwide
  // delivery", "cut-and-sew manufacturer in Sialkot, Pakistan.") render as
  // real inline emphasis -- same segmented-note pattern FabricOptions' own
  // closing note already uses (see ServicesIntro.tsx), not a second bespoke
  // rich-text renderer. "17+ years of experience" already carried its
  // 2026-09-08 correction (was "25+," overstated the company's real age,
  // founded 2009 per `docs/04-product.md`'s now-resolved open question 2) --
  // unchanged here, just moved out of the paragraph into its own stat.
  intro: {
    // Plain string -- real mobile (owner: "on mobile, the title should be
    // in 2 line") already wraps this to exactly 2 lines naturally at real
    // mobile width, no forced break needed there. Tablet/desktop's own
    // different forced break ("'build your' text can be in 1st line") is
    // its own separate hardcoded string in ServicesIntro.tsx, not this
    // field -- see that file's own comment for why one plain string can't
    // serve both breakpoints' different required breaks.
    heading: "A factory you can build your brand on",
    paragraph: introParagraph,
    stats: [
      { value: "17+", caption: "Years of experience" },
      { value: "100,000+", caption: "Monthly capacity" },
    ],
  },

  // Section 3: How we work with you. Figma desktop node 750:770. Copy (all
  // headings, subtitles and body text) is the design's own real text
  // layer, read directly, same as every prior section.
  howWeWork: {
    heading: "How we work with you",
    subheading:
      "We manufacture three ways, depending on how much of the design you bring and how much you want us to develop.",
    paths: [
      {
        title: "OEM Production",
        subtitle: "Fully make to your brand spec",
        whatItMeans: "You bring the design, tech pack or samples, we manufacture exactly to them",
        bestFor: "Brands with their own designs ready to produce",
      },
      {
        title: "ODM Development",
        subtitle: "Design & develop in-house",
        whatItMeans: "We design and develop from your brief or our proven blocks, you brand it",
        bestFor: "Brands that want design and development support, or a faster route to market",
      },
      {
        title: "Private Label",
        subtitle: "Our make, your brand",
        whatItMeans: "Our production, finished entirely under your brand, labels, tags and packaging",
        bestFor: "Brands, retailers and teamwear suppliers wanting a ready path to shelf",
      },
    ],
    note: howWeWorkNote,
  },

  // Section 5: Product Range. Figma desktop node 758:823. Copy (eyebrow,
  // heading, both card descriptions and link labels) is the design's own
  // real text layer, read directly, same as every prior section. The H2
  // happens to match home.ts's `whatWeMake.h2` verbatim, but this is a
  // different, simpler two-card "Explore" layout, not a reuse of that
  // section -- see ProductRange.tsx's own header comment.
  productRange: {
    eyebrow: "PRODUCT RANGE",
    h2: "End-to-end activewear and teamwear manufacturing",
    categories: [
      {
        title: "Activewear",
        body: "Leggings, bras, shorts, tops, fleece, compression, sets and more",
        exploreLabel: "Explore Activewear",
        href: "/activewear",
      },
      {
        title: "Teamwear & Uniforms",
        body: "Sublimated team uniforms and kits for basketball, rugby, baseball and more",
        exploreLabel: "Explore Teamwear",
        href: "/teamwear",
      },
    ],
  },

  // Section 6: Responsible Make. Figma desktop node 811:1156, directly
  // under CertifiedCompliant (owner, 2026-09-07, spacing: "104px" top and
  // bottom). Reuses the PLP/PDP's own `TrustPoints` component verbatim
  // ("its a same component that we used on PLP and PDP, just changed the
  // content") -- heading + subline + a bordered list, this page's own 4
  // rows instead of the PLP's 5. Copy is the design's own real text layer,
  // read directly via Figma MCP (get_metadata + screenshot confirmed,
  // node 811:1156), same as every prior section on this page.
  responsibleMake: {
    heading: "Responsible make",
    subline:
      "We offer recycled polyester and OEKO-TEX certified fabrics for brands that want them, and we source to a sustainability spec you set. ",
    // Rendered semi bold (owner, 2026-09-08) -- split out of `subline`
    // above via `TrustPoints`' own new `sublineBold` prop, not a
    // hand-typed `<strong>` in this content file.
    sublineBold: "We name what is genuinely certified rather than making broad green claims.",
    points: [
      "Recycled polyester (rPET) across many knit and woven bases",
      "OEKO-TEX certified fabrics on request",
      "BSCI and IMAC audited social and ethical compliance",
      "Sourcing and matching to your own sustainability requirements",
    ],
  },

  // FAQ. Same component/styling as the homepage's own FAQ (`Faq.tsx`,
  // `home.faq`) -- `Faq` is already content-agnostic (see its own header
  // comment), so this section just feeds it this page's own question set,
  // no fork. Copy is owner-supplied verbatim (2026-09-07), not paraphrased
  // -- house rules for this set: American spelling, no en/em dashes,
  // "spandex" (never elastane/Lycra), no prices. Same
  // "content feeds both the visible accordion and the FAQPage schema"
  // pattern `home.faq` already established, so this page's own
  // `faqSchema(services.faq.items)` call in `app/services/page.tsx` can
  // never drift from what's actually shown.
  faq: {
    h2: "Top questions from B2B buyers",
    items: [
      {
        q: "What services do you offer?",
        a: "Capriowear is a custom activewear and teamwear manufacturer offering OEM, ODM and private label production, custom from fabric to packaging. We produce leggings, sports bras, tops, fleece, compression, sets and sublimated team kits, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
      },
      {
        q: "What is the difference between OEM, ODM and private label?",
        a: "OEM means we manufacture to your design or tech pack. ODM means we design and develop the product from your brief or our blocks, and you brand it. Private label means the product is finished entirely under your brand, labels and packaging. We do all three, and often combine them.",
      },
      {
        q: "What is your minimum order quantity (MOQ)?",
        a: "From 50 pieces per style, and you can mix sizes freely within a colorway. It scales to full bulk from there.",
      },
      {
        q: "Are you a factory or a middleman?",
        a: "We are a factory. Capriowear is the in-house activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan, with our own 75,000 sq ft facility. You work directly with the factory, not a trading agent.",
      },
      {
        q: "Do you work with startups and small brands?",
        a: "Yes. Low minimums and full design and development support make us a fit for first collections and growing brands, not only large orders.",
      },
      {
        q: "Can you make a product from my tech pack or a reference garment?",
        a: "Yes. Send a tech pack, sketch or a reference and we develop or match it, then confirm everything on your sample before bulk.",
      },
      {
        q: "How long do samples and bulk production take?",
        a: "A sample in 10 to 14 days, and a digital mockup first for sublimated teamwear. Bulk lead time depends on quantity and customization, confirmed on your quote.",
      },
      {
        q: "What can I customize?",
        a: "Everything from fabric to packaging: fabric and weight, fit and construction, decoration and branding, color, labels, hangtags and packaging.",
      },
      {
        q: "What decoration and printing methods do you offer?",
        a: "Full-dye sublimation, screen, DTG and DTF print, embroidery, tackle twill, patches, puff and heat transfer, with Pantone color matching, all in-house.",
      },
      {
        q: "Do you offer sustainable or recycled fabrics?",
        a: "Yes, recycled polyester and OEKO-TEX certified fabrics are available, and we can source to your own sustainability spec.",
      },
      {
        q: "What certifications do you hold?",
        a: "ISO 9001, OEKO-TEX, BSCI, IMAC and SGS, covering quality, materials, social compliance and testing. Every run is also inspected to AQL 2.5.",
      },
      {
        q: "Will my designs stay protected?",
        a: "Yes. We sign an NDA before any tech pack, and everything is produced under your brand.",
      },
      {
        q: "Do you ship to my country?",
        a: "Yes, 20+ countries. DDP to the US, UK, EU, Canada and Australia, with GSP+ 0% EU duty.",
      },
      {
        q: "How do I get started?",
        a: "Send your tech pack, sketch or a reference by email or WhatsApp. We come back within 24 hours with next steps.",
      },
    ],
  },

  // Final CTA, the page's closing section, reusing the homepage's own
  // `FinalCta` component and compliance-bar pattern verbatim (owner,
  // 2026-09-07: "reuse the homepage final CTA + compliance bar
  // component") -- distinct from the earlier `<FinalCta content={home.
  // finalCta} ticker={home.complianceTicker} />` usage under How It Works
  // (Section 8 above): that one reuses homepage content as-is, this one is
  // its own copy (a genuinely different subline from `home.finalCta`'s),
  // its own secondary button, and its own 5-item compliance bar -- the
  // same two-FinalCta-usages-per-page pattern the homepage itself already
  // established (`home.finalCta` then `home.closingCta`).
  finalCta: {
    h2: "Let's build your custom collection",
    subline: "Share your tech pack, sketch or a reference. We'll come back within 24 hours with next steps.",
    cta: { label: "Request a Sample", href: "/request-a-sample" },
    secondaryCta: { label: "Download Catalog", href: "/catalog" },
  },

  // The 5 items are owner-specified verbatim, a shorter list than home.ts's
  // full 8-item `complianceTicker` -- not a typo/omission, an intentional
  // trim for this page's own closing band. `title` reuses the same
  // "STANDARD ON EVERY ORDER" label `home.complianceTicker` already
  // established for this identical pattern (a labelled compliance-claims
  // strip), since no new title was given for this shorter set.
  complianceBar: {
    title: "STANDARD ON EVERY ORDER",
    items: [
      "NDA before tech pack",
      "Pre-shipment inspection",
      "GSP+ Form A per container",
      "AQL 2.5 inspection",
      "ISO 9001 certified",
    ],
  },
} as const;
