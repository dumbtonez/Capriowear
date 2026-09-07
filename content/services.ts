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
const introParagraph: NoteSegment[] = [
  {
    text: "Capriowear is a custom activewear and teamwear manufacturer offering OEM, ODM and private label production, custom from fabric to packaging, with ",
  },
  { text: "low minimums and worldwide delivery", bold: true },
  { text: ". We are the activewear and teamwear division of Caprio Sports, a " },
  { text: "cut-and-sew manufacturer in Sialkot, Pakistan", bold: true },
  { text: ", with " },
  { text: "25+ years of experience", bold: true },
  { text: " and our own 75,000 sq ft facility." },
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
  // TODO(owner copy): metaTitle/metaDescription are placeholders -- confirm
  // real SEO copy for this page.
  metaTitle: "Custom Manufacturing Services",
  metaDescription:
    "OEM, ODM and private label activewear and teamwear manufacturing services, from fabric sourcing to retail-ready packaging, factory-direct from Sialkot, Pakistan.",

  // Section 1: Hero. Figma desktop node 729:139. Copy is the design's own
  // real headline (not a placeholder) -- no separate copy doc entry exists
  // for this page yet, so this is read directly off the Figma text layer.
  hero: {
    h1: "Custom activewear and teamwear, from fabric to packaging",
    ctaPrimary: { label: "Request a Sample", href: "/request-a-sample" },
    ctaSecondary: { label: "Download Catalog", href: "/catalog" },
  },

  // Section 2: Intro statement. Figma desktop node 733:529. Copy (heading +
  // paragraph) is the design's own real text layer, read directly, same as
  // hero.h1 above. `paragraph` is segmented, not a single string, so the
  // three semibold phrases Figma marks inline ("low minimums and worldwide
  // delivery", "cut-and-sew manufacturer in Sialkot, Pakistan", "25+ years
  // of experience") render as real inline emphasis -- same segmented-note
  // pattern FabricOptions' own closing note already uses (see
  // ServicesIntro.tsx), not a second bespoke rich-text renderer.
  intro: {
    heading: "A factory you can build your brand on",
    paragraph: introParagraph,
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
} as const;
