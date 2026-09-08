// content/our-factory.ts
// The /our-factory page, built section by section from Figma (owner brief,
// 2026-09-08), same pattern as content/home.ts and content/services.ts --
// content lives here, typed; components take it as props.
//
// Section 1: Hero/Banner, Figma desktop node 854:1421. Copy is the design's
// own text layers verbatim (eyebrow "BASED IN SIALKOT, PAKISTAN", H1, both
// button labels) -- no separate copy doc was given for this section yet, so
// the Figma layer text is the copy source of truth here. CTA hrefs reuse the
// site's existing routes for the same two actions (services.hero.ctaPrimary/
// ctaSecondary use the same pair) rather than inventing new ones.
//
// Section 3: Intro, Figma desktop node 857:1906 ("Content") -- heading,
// a single rich-text paragraph (two semibold inline phrases), and a
// 2-stat row. Same NoteSegment shape as services.ts's intro paragraphs,
// reused rather than a second bespoke rich-text type. Copy is the design's
// own text layers verbatim, same "no separate copy doc yet" note as
// section 1 above.
//
// metaTitle/metaDescription follow the brief's own exact title
// ("Our Factory in Sialkot, Pakistan | Capriowear") -- description is a
// first-draft placeholder pending real SEO copy, flagged the same way
// services.metaDescription already is.
import type { NoteSegment } from "@/content/activewear/types";

const introParagraph: NoteSegment[] = [
  {
    text: "Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew apparel manufacturer in Sialkot, Pakistan. Every order is produced in-house, ",
  },
  { text: "from fabric to finished, retail-ready packaging", bold: true },
  { text: ". You " },
  { text: "work directly with the factory", bold: true },
  { text: " that makes your product, not a trading agent placing it elsewhere." },
];

export const ourFactory = {
  metaTitle: "Our Factory in Sialkot, Pakistan | Capriowear",
  metaDescription:
    "Inside Capriowear's own 75,000 sq ft cut-and-sew factory in Sialkot, Pakistan: fabric to packaging under one roof, not a middleman.",

  hero: {
    eyebrow: "BASED IN SIALKOT, PAKISTAN",
    h1: "A cut-and-sew factory, not a middleman, your brand made under one roof",
    ctaPrimary: { label: "Request a Sample", href: "/request-a-sample" },
    ctaSecondary: { label: "Download Catalog", href: "/catalog" },
    // Layer 2, Figma node 854:1402 ("Youtube Video") -- same video placeholder
    // block as the homepage Hero's own Layer 2 (home.hero.media), continuing
    // the same bg-ink box straight from the banner above (get_metadata: this
    // frame starts at y=647, exactly where the Banner frame ends at 69+578).
    // Label follows the same "descriptive alt text even for placeholders"
    // house rule home.hero.media.label already sets, specific to this page's
    // own subject (the factory itself, not a generic hero video).
    media: { type: "video" as const, label: "Factory tour video, Capriowear's Sialkot cut-and-sew facility" },
  },

  intro: {
    heading: "The factory behind Capriowear",
    paragraph: introParagraph,
    stats: [
      { value: "75,000 sq ft", caption: "Production facility" },
      { value: "100,000+", caption: "Monthly capacity" },
    ],
  },
};
