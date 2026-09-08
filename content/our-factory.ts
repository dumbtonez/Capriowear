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
import type { MediaRatio } from "@/components/MediaPlaceholder";
import type { NoteSegment } from "@/content/activewear/types";

// The "Journey" gallery (section 5, `process` below): a station has real
// copy (a headline + body, both crawlable, real DOM text) and its own
// image; a breather is image-only, no copy, no heading -- structurally
// different, so `rows` is a union of the two rather than forcing a
// breather to carry empty title/body fields.
type ProcessStation = {
  kind: "station";
  /** "01".."07" -- the eyebrow reads "<number> <name>", never a heading (see OurFactoryProcess.tsx). */
  number: string;
  name: string;
  /** Rendered as a real <h3> -- see OurFactoryProcess.tsx's own heading-level notes. */
  title: string;
  body: string;
  imageAlt: string;
  image?: { src: string };
  ratio: MediaRatio;
  width: "lg" | "md" | "sm" | "full";
};

type ProcessBreather = {
  kind: "breather";
  imageAlt: string;
  image?: { src: string };
};

type ProcessRow = { items: (ProcessStation | ProcessBreather)[] };

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

  // Section 5, "Journey" -- Figma desktop node 857:2090 ("Content") gave
  // the original 7-station layout and copy; the owner's follow-up SEO/AEO/
  // GEO pass (2026-09-08) added numbered eyebrows ("01 Fabric" etc, not
  // headings -- the station title is), a reordered reading sequence
  // (Fabric before Cutting, Quality Control before Packed & Shipped), an
  // 8th "breather" image (the wide sewing floor, no copy), and the exact
  // alt text below for all 8 images.
  //
  // Row pairing matches Figma's real layout exactly (owner correction,
  // 2026-09-08: "keep the 1st row as is ... but for the rest follow the
  // design" -- a first pass had split Sewing and Printing & Sublimation
  // into their own solo rows to make room for the breather, which broke
  // the real Figma pairing): row 1 is Fabric+Cutting (kept, per the
  // numbered reorder above); row 2 is Sewing+Printing & Sublimation
  // together, the real Figma pair; the breather is its own full-width row
  // placed right after that pair (a full-width image can't sit inside a
  // 2-up flex row, so it can't literally sit "between" them the way the
  // copy brief describes -- this is the closest real position;) row 3 is
  // Finishing, unchanged, full-width; row 4 is Quality Control+Packed &
  // Shipped together (the real Figma pair, order reversed to match the
  // numbered sequence, same as row 1).
  process: {
    eyebrow: "WHAT WE MAKE",
    heading: "From fabric to shipped, in one building",
    rows: [
      {
        items: [
          {
            kind: "station",
            number: "01",
            name: "Fabric",
            title: "It starts with the right cloth",
            body: "Knits, fleece, tricot, woven shells and sublimation polyester, sourced or matched to your reference, at the weight you approve on your sample.",
            imageAlt:
              "Rolls of knit, fleece and sublimation polyester fabric at Capriowear's cut-and-sew factory in Sialkot, Pakistan",
            ratio: "520:480",
            width: "sm",
          },
          {
            kind: "station",
            number: "02",
            name: "Cutting",
            title: "Cut and sewn, seam by seam",
            body: "Cut to your pattern, graded to your sizes. Every panel cut to spec, graded XS to 5XL across men's, women's, unisex and youth blocks.",
            imageAlt: "Fabric panels cut to pattern at Capriowear's apparel factory in Sialkot, Pakistan",
            // Temporary: the owner's own reference photo (public/Product
            // images/Referne Image.png), dropped in 2026-09-08 purely so the
            // parallax effect on ParallaxMedia has something visible to
            // scroll-test against -- not real Capriowear factory content,
            // swap for the real cutting-floor photo once it exists.
            image: { src: "/Product%20images/Referne%20Image.png" },
            ratio: "1:1",
            width: "lg",
          },
        ],
      },
      {
        items: [
          {
            kind: "station",
            number: "03",
            name: "Sewing",
            title: "Cut and sewn, seam by seam",
            body: "Skilled machinists assemble the garment with flatlock and reinforced seams built to hold, run after run.",
            imageAlt:
              "Machinist sewing a garment with flatlock seams at Capriowear's cut-and-sew factory in Sialkot, Pakistan",
            ratio: "600:640",
            width: "md",
          },
          {
            kind: "station",
            number: "04",
            name: "Printing & Sublimation",
            title: "Your design, dyed into the fabric",
            body: "Full-dye sublimation, screen, DTG and DTF, plus embroidery and tackle twill, all color-matched and done in-house.",
            imageAlt: "Full-dye sublimation printing at Capriowear's factory in Sialkot, Pakistan",
            ratio: "600:640",
            width: "md",
          },
        ],
      },
      {
        items: [
          {
            kind: "breather",
            imageAlt: "The sewing floor at Capriowear's activewear and teamwear factory in Sialkot, Pakistan",
          },
        ],
      },
      {
        items: [
          {
            kind: "station",
            number: "05",
            name: "Finishing",
            title: "Labels, tags and the last details",
            body: "Woven labels, size and care labels, hangtags and trims, applied so the garment arrives finished, not half-made.",
            imageAlt: "Woven labels and hangtags applied at Capriowear's apparel factory in Sialkot, Pakistan",
            ratio: "1280:640",
            width: "full",
          },
        ],
      },
      {
        items: [
          {
            kind: "station",
            number: "06",
            name: "Quality Control",
            title: "Checked while it can still be fixed",
            body: "In-line inspection during production and a full check to AQL 2.5 before anything ships. Third-party inspection welcome.",
            imageAlt: "Quality control inspection of finished garments at Capriowear's factory in Sialkot, Pakistan",
            ratio: "520:480",
            width: "sm",
          },
          {
            kind: "station",
            number: "07",
            name: "Packed & Shipped",
            title: "Retail-ready, delivered to your door",
            body: "Polybagged and boxed to your spec, then shipped DDP to 40+ countries, with GSP+ 0% duty into the EU.",
            imageAlt:
              "Retail-ready garments polybagged and boxed for shipping at Capriowear's factory in Sialkot, Pakistan",
            ratio: "1:1",
            width: "lg",
          },
        ],
      },
    ] as ProcessRow[],
  },
};
