// content/activewear/compression-base-layers.ts
// Rebuilt to the owner's 6-SKU catalog and copy (owner spec, 2026-09-25,
// batch 1), replacing the 6 card-only test cards (none had a PDP route).
// Unisex category, same pattern as Jackets: no All/Women/Men toggle, no
// `gender` on any card, every style name carries "Custom".
//
// Positioned on Spandex content, stretch and recovery, fit-testing and
// post-wash checks. Every mmHg/pressure claim is gone, including the old
// mmHg compression-levels table (`weightTiers` + `weightTiersHeaders`),
// which this category no longer sets. The one medical mention left is FAQ
// 6, which says plainly that we do not make medical compression.
//
// PDP batch 1: SKUs 1 to 3 (CAP-CBL-01 to 03) carry full draft PDP
// content, so their cards link (the sitewide `isDraftPdpReachable()` rule)
// and their pages render noindexed, with no sitemap entry and no
// Product/FAQPage JSON-LD. SKUs 4 to 6 stay card-only until batch 2.
// Key facts, spec subtitle and the operational FAQs are the shared PDP
// defaults (./pdpShared.ts); "How we customize" is set once below.
import type { Category, StyleCard } from "./types";
import { faqGetStarted } from "./pdpShared";

const CUSTOMIZATION_PILLS = ["Custom fabric", "Custom color & print", "Your fit", "Your branding", "Custom labels", "Custom packaging"];
const PLP = "/capriowear/activewear/compression-base-layers";
const FABRIC_PILLS = ["Nylon/Spandex", "Polyester/Spandex", "Recycled Polyester/Spandex"];
const SPEC_FABRIC = "Nylon/Spandex or Polyester/Spandex compression knit, blend confirmed on your sample.";
const SPEC_WEIGHT = "Pending, confirmed on your sample.";
const SPEC_FIT = "Unisex second-skin fit, graded XS to 5XL, men's and women's cuts to spec";
const SPEC_BRANDING = "Sublimation, screen, heat transfer, silicone logos, reflective prints, custom labels and packaging";
const QUALITY_SUBLINE = "We confirm it all on your sample before a single bulk piece is cut.";

// Alt-only gallery (no photography yet): 6 frames, alt = the card name.
function gallery(alt: string) {
  return Array.from({ length: 6 }, () => ({ alt }));
}

// Card-only draft (batch 2 adds the PDP content, then the card links).
function cardOnly(sku: string, slug: string, cardTitle: string, cardSubline: string): StyleCard {
  return { status: "draft", slug, cardTitle, cardSubline, image: "", imageAlt: cardTitle, href: `${PLP}/${slug}`, sku };
}

export const compressionBaseLayers: Category = {
  slug: "compression-base-layers",
  group: "Activewear",
  menuLabel: "Compression & Base Layers",
  // Verbatim override pair (owner spec, 2026-09-25): bypasses
  // categoryEntityFaq()'s templated sentence, on the PLP and every PDP.
  entityQuestion: "What does Capriowear manufacture?",
  entityAnswer:
    "Capriowear is a custom compression wear manufacturer for activewear brands and teamwear suppliers worldwide. We produce private label compression and base layers from fabric to packaging, including compression tops, tanks, tights, shorts and thermal base layers in Nylon/Spandex and Polyester/Spandex knits, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.",
  h1: "Custom Compression Wear Manufacturer",
  metaTitle: "Custom Compression Wear Manufacturer",
  metaDescription:
    "Custom compression wear manufacturer: private label compression tops, tanks, tights, shorts and thermal base layers, MOQ 50, DDP to 20+ countries.",
  trustBullets: ["MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM & Private Label", "DDP to 20+ countries"],
  gridSubline: "Every style, made to your brand spec",
  gridSublineMobile: "Every style is available in custom fabrics & colors",
  // Unisex category: the All/Women/Men chip row does not render.
  showGenderFilter: false,
  fabricEyebrow: "FABRIC OPTIONS",
  fabricHeading: "Second-skin fabrics, built to recover",
  fabricOptions: [
    {
      fabric: "Nylon/Spandex compression knit",
      bestFor: "Compression tops, tights and shorts",
      performance: "Smooth, durable second-skin knit, higher Spandex content for a firmer fit and stronger recovery",
    },
    {
      fabric: "Polyester/Spandex performance jersey",
      bestFor: "Warm-weather tops and tanks",
      performance: "Lightweight, moisture-wicking and quick-dry",
    },
    {
      fabric: "Brushed Polyester/Spandex knit",
      bestFor: "Cold-weather tops and tights",
      performance: "Brushed interior for warmth, smooth face for layering",
    },
    {
      fabric: "Grid-back Polyester/Spandex fleece",
      bestFor: "Cold-weather base layers",
      performance: "Grid backing traps heat with less bulk, 4-way stretch",
    },
    {
      fabric: "Polyester/Spandex mesh",
      bestFor: "Ventilation panels",
      performance: "Airflow at high-heat zones such as the back and underarm",
    },
    {
      fabric: "Recycled Polyester/Spandex",
      bestFor: "Sustainable base-layer lines",
      performance: "Stretch and recovery comparable to virgin polyester",
    },
  ],
  // Same bold runs as every category's own fabricNote (Leggings' pattern).
  fabricNote: [
    {
      text: "Fit firmness is set by Spandex content, knit tension and the pattern, not by fabric alone, and is agreed on your sample. Cut-and-sew lets us combine fabrics, mesh zones and panel shapes in one garment. Fabric weight is ",
    },
    { text: "confirmed on your sample", bold: true },
    { text: ". Swatches before every bulk run, and we can source or match a " },
    { text: "specific fabric", bold: true },
    { text: " or a reference garment." },
  ],
  // Short labels for the fabrics above, the PDP fallback when a style sets
  // no `pdpFabricPills` of its own.
  fabricPills: ["Nylon/Spandex", "Polyester/Spandex", "Brushed Polyester/Spandex", "Grid-back fleece", "Polyester/Spandex mesh", "Recycled Polyester/Spandex"],
  qualityHeading: "The fit you approve, wash after wash",
  qualitySubline: "We confirm stretch, recovery, seams and fit on your sample before a single bulk piece is cut",
  qualityPoints: [
    "Spandex content confirmed against your approved fabric",
    "Stretch and recovery checked after repeated wear and wash, no bagging or loss of hold",
    "Fit tested at multiple sizes across the run",
    "Flatlock seams checked through movement, panels matched in stretch so no seam digs in",
    "Opacity checked at full stretch",
    "Every run inspected to AQL 2.5, third-party inspection welcome",
  ],
  coverageEyebrow: "CUSTOMIZATION",
  coverageHeading: "From custom fabric to packaging design",
  coverageItems: [
    { title: "Fabric", body: "Nylon/Spandex and Polyester/Spandex knits, brushed and grid-back thermal knits, mesh panels" },
    { title: "Fit and firmness", body: "Second-skin fit, firmness set by Spandex content and knit tension" },
    { title: "Build and paneling", body: "Flatlock seams, mesh ventilation zones, gussets, crew or mock neck, thumbholes" },
    {
      title: "Length and cut",
      body: "Short-sleeve, long-sleeve or sleeveless tops, shorts or full-length tights, men's and women's cuts to spec",
    },
    { title: "Color and print", body: "Custom colors with Pantone matching, sublimation, screen, heat transfer, reflective prints" },
    { title: "Labels and packaging", body: "Woven or tear-away labels, hangtags, retail-ready packaging" },
  ],
  faqHeading: "Top questions from B2B buyers",
  // Entity question is prepended at render time from entityQuestion/
  // entityAnswer above.
  faqs: [
    {
      q: "What is your MOQ for custom compression wear?",
      a: "From 50 pieces per style, and you can mix sizes freely within a colorway. Scales to full bulk.",
    },
    {
      q: "What compression and base layers can you make?",
      a: "Short-sleeve, long-sleeve and sleeveless compression tops, full-length compression tights, compression shorts, and brushed thermal compression tops for cold weather, all custom to your brand. Crew or mock necks and thumbholes are available on tops.",
    },
    {
      q: "What is the difference between compression wear and a fitted performance top or legging?",
      a: "Compression wear is cut close to the body in a higher-Spandex knit for a second-skin fit with strong stretch and recovery, worn as a base layer. A fitted performance top or legging has a close cut but a softer hold. We make both, and our Long-Sleeve Tops and Leggings ranges cover the fitted styles.",
    },
    {
      q: "How do you set how firm the fit is?",
      a: "Firmness comes from Spandex content, knit tension and the pattern. We agree the feel with you on the sample, then hold the same fabric and pattern through bulk.",
    },
    {
      q: "Do you make medical compression garments?",
      a: "No. Our compression wear is athletic apparel for training, sport and layering. We do not make medical or graduated compression garments, and we make no medical claims.",
    },
    {
      q: "Do you make seamless compression?",
      a: "No. We are cut-and-sew, which lets us combine different fabrics, mesh zones and panel shapes in one garment. Seamless circular-knit compression is outside our scope.",
    },
    {
      q: "Which fabrics do you use for warm and cold weather?",
      a: "Lightweight Polyester/Spandex jersey and mesh panels for warm-weather tops and tanks, and brushed or grid-back Polyester/Spandex knits for cold-weather tops and tights, each confirmed on your sample.",
    },
    {
      q: "Can you match a reference compression garment?",
      a: "Yes. Send a swatch, reference garment or tech pack and we source or develop the fabric and pattern to match, then confirm stretch, recovery and fit on your sample before bulk.",
    },
    {
      q: "Does the fit hold after washing?",
      a: "We check stretch and recovery after repeated wear and wash on your sample, not only when it is new, so the fit you approve is the fit that lasts.",
    },
    {
      q: "What can I customize?",
      a: "Everything from fabric to packaging: fabric and warmth, fit firmness, paneling and mesh zones, seam type, sleeve and leg length, neckline, thumbholes, color and print with Pantone matching, your logos, labels, hangtags, and packaging.",
    },
    {
      q: "Do you offer OEM, ODM, and private label compression wear?",
      a: "Yes, all three. As a private label compression wear manufacturer, we make every style under your brand, with your labels and packaging.",
    },
    {
      q: "How is compression wear sized?",
      a: "Alpha XS to 5XL on a unisex block, with separate men's and women's cuts to your spec. Fit matters more here than in any other category, so we fit-test at multiple sizes across the run.",
    },
    {
      q: "How long do samples and bulk take?",
      a: "Samples in 10 to 14 days. Bulk lead time depends on quantity and customization, confirmed on your quote.",
    },
    {
      q: "Do you ship to my country?",
      a: "Yes, DDP to 20+ countries, including the US, UK, EU, Canada, and Australia, with GSP+ 0% EU duty.",
    },
    {
      q: "Will my designs stay protected?",
      a: "Yes. We sign an NDA before any tech pack.",
    },
    faqGetStarted,
  ],
  // Final CTA: "Share your tech pack, sketch or a reference garment. ..."
  // via buildCtaSubline() (./pdpShared.ts), PLP and every PDP.
  ctaReferenceNoun: "garment",
  // "How we customize" for every Compression PDP (owner spec, 2026-09-25):
  // 6 tiles, overriding the shared 5-step default. Same temporary factory
  // photography as the shared default.
  pdpCustomizationSteps: {
    eyebrow: "HOW WE CUSTOMIZE",
    heading: "Your brand, applied\nin-house, no outsourcing",
    steps: [
      { title: "Print and artwork", body: "Sublimation, screen, heat transfer", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Print and artwork" } },
      { title: "Branding", body: "Silicone and heat-transfer logos, reflective prints, embroidery where the fabric allows", image: { src: "/factory-test/inside-factory-2.jpg", alt: "Branding" } },
      { title: "Fabric and fit", body: "Spandex content and knit, sourced or matched to your reference", image: { src: "/factory-test/inside-factory-3.jpg", alt: "Fabric and fit" } },
      { title: "Build", body: "Paneling, mesh zones, neckline, sleeve and cuff to your spec", image: { src: "/factory-test/inside-factory-4.jpg", alt: "Build" } },
      { title: "Color", body: "Pantone matched colors, color-blocking and contrast panels", image: { src: "/factory-test/inside-factory-5.jpg", alt: "Color" } },
      { title: "Trims and packaging", body: "Woven or tear-away labels, hangtags, retail-ready packaging", image: { src: "/factory-test/inside-factory-1.jpg", alt: "Trims and packaging" } },
    ],
  },
  // 6 drafts, SKU order (CAP-CBL-01 to 06). Card and image alt text is the
  // card name exactly. 1 to 3 carry PDP content (batch 1); 4 to 6 are
  // card-only until batch 2.
  styleCards: [
    {
      status: "draft",
      slug: "compression-top",
      cardTitle: "Custom Short-Sleeve Compression Top",
      cardSubline: "Second-skin fit, short sleeve, flatlock seams",
      image: "",
      imageAlt: "Custom Short-Sleeve Compression Top",
      href: `${PLP}/compression-top`,
      sku: "CAP-CBL-01",
      pdpHeading: "Custom Short-Sleeve Compression Top Manufacturer",
      pdpDescription:
        "Short-sleeve compression top with a second-skin fit and flatlock seams, custom and private label, in a Nylon/Spandex or Polyester/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Short-Sleeve Compression Top Manufacturer",
      pdpMetaDescription:
        "Custom short-sleeve compression top manufacturer, private label, Nylon/Spandex or Polyester/Spandex knit, flatlock seams, MOQ 50, DDP to 20+ countries.",
      images: gallery("Custom Short-Sleeve Compression Top"),
      material: "Nylon/Spandex or Polyester/Spandex compression knit",
      pdpFabricPills: FABRIC_PILLS,
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the short-sleeve compression top made from?",
          a: "The short-sleeve compression top is built in a Nylon/Spandex or Polyester/Spandex compression knit. The exact blend and weight are confirmed on your sample, and recycled Polyester/Spandex is an option.",
        },
        {
          q: "Can I choose a crew or mock neck on the short-sleeve compression top?",
          a: "Yes. The short-sleeve compression top is made with a crew neck as standard, and a mock neck can be cut to your spec for a higher, base-layer look.",
        },
        {
          q: "Can you add mesh ventilation to the short-sleeve compression top?",
          a: "Yes. Mesh panels can be set at the back and underarm of the short-sleeve compression top for airflow, placed to your tech pack.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Long-Sleeve Compression Top", slug: "compression-top-long-sleeve", href: PLP },
        { label: "Custom Compression Tank", slug: "compression-tank", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Short-sleeve compression top" },
        { label: "Fabric", value: SPEC_FABRIC },
        { label: "Weight", value: SPEC_WEIGHT },
        { label: "Fit", value: SPEC_FIT },
        { label: "Neckline", value: "Crew neck, mock neck to your spec" },
        { label: "Seams", value: "Flatlock, low-profile and chafe-free" },
        { label: "Ventilation", value: "Mesh panels at the back and underarm, optional" },
        { label: "Construction", value: "Cut-and-sew, paneled to your spec" },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Short-Sleeve Compression Top" },
      pdpQualityHeading: "Close fit, clean seams",
      pdpQualitySubline: QUALITY_SUBLINE,
      pdpQualityPoints: [
        "Stretch and recovery checked after repeated wear and wash",
        "Spandex content confirmed against your approved fabric",
        "Fit tested at multiple sizes across the run",
        "Flatlock seams checked through movement",
        "Opacity checked at full stretch",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "compression-top-long-sleeve",
      cardTitle: "Custom Long-Sleeve Compression Top",
      cardSubline: "Second-skin fit, thumbhole cuffs",
      image: "",
      imageAlt: "Custom Long-Sleeve Compression Top",
      href: `${PLP}/compression-top-long-sleeve`,
      sku: "CAP-CBL-02",
      pdpHeading: "Custom Long-Sleeve Compression Top Manufacturer",
      pdpDescription:
        "Long-sleeve compression top with thumbhole cuffs, a second-skin fit and flatlock seams, custom and private label, in a Nylon/Spandex or Polyester/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Long-Sleeve Compression Top Manufacturer",
      pdpMetaDescription:
        "Custom long-sleeve compression top manufacturer, private label, Nylon/Spandex or Polyester/Spandex knit, thumbhole cuffs, MOQ 50, DDP to 20+ countries.",
      images: gallery("Custom Long-Sleeve Compression Top"),
      material: "Nylon/Spandex or Polyester/Spandex compression knit",
      pdpFabricPills: FABRIC_PILLS,
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the long-sleeve compression top made from?",
          a: "The long-sleeve compression top is built in a Nylon/Spandex or Polyester/Spandex compression knit. The exact blend and weight are confirmed on your sample, and recycled Polyester/Spandex is an option.",
        },
        {
          q: "Do the thumbholes come standard on the long-sleeve compression top?",
          a: "Yes. Thumbhole cuffs are standard on the long-sleeve compression top, not a special order, and a plain cuff can be cut to your spec.",
        },
        {
          q: "How is the long-sleeve compression top different from your fitted long-sleeve tops?",
          a: "The long-sleeve compression top is cut closer in a higher-Spandex knit for a second-skin fit, worn as a base layer. Our Long-Sleeve Tops range covers fitted and relaxed training tops with a softer hold.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Short-Sleeve Compression Top", slug: "compression-top", href: PLP },
        { label: "Custom Compression Tank", slug: "compression-tank", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Long-sleeve compression top" },
        { label: "Fabric", value: SPEC_FABRIC },
        { label: "Weight", value: SPEC_WEIGHT },
        { label: "Fit", value: SPEC_FIT },
        { label: "Neckline", value: "Crew neck, mock neck to your spec" },
        { label: "Cuffs", value: "Thumbhole cuffs, standard on this style" },
        { label: "Seams", value: "Flatlock, low-profile and chafe-free" },
        { label: "Ventilation", value: "Mesh panels at the back and underarm, optional" },
        { label: "Construction", value: "Cut-and-sew, paneled to your spec" },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Long-Sleeve Compression Top" },
      pdpQualityHeading: "Sleeve to cuff, a fit that holds",
      pdpQualitySubline: QUALITY_SUBLINE,
      pdpQualityPoints: [
        "Thumbhole placement checked at every size",
        "Stretch and recovery checked after repeated wear and wash",
        "Spandex content confirmed against your approved fabric",
        "Flatlock seams checked through movement",
        "Opacity checked at full stretch",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    {
      status: "draft",
      slug: "compression-tank",
      cardTitle: "Custom Compression Tank",
      cardSubline: "Second-skin fit, sleeveless",
      image: "",
      imageAlt: "Custom Compression Tank",
      href: `${PLP}/compression-tank`,
      sku: "CAP-CBL-03",
      pdpHeading: "Custom Compression Tank Manufacturer",
      pdpDescription:
        "Sleeveless compression tank with a second-skin fit and flatlock armholes, custom and private label, in a Nylon/Spandex or Polyester/Spandex knit, made to your brand in Sialkot, Pakistan.",
      pdpMetaTitle: "Custom Compression Tank Manufacturer",
      pdpMetaDescription:
        "Custom compression tank manufacturer, private label, sleeveless Nylon/Spandex or Polyester/Spandex knit, flatlock seams, MOQ 50, DDP to 20+ countries.",
      images: gallery("Custom Compression Tank"),
      material: "Nylon/Spandex or Polyester/Spandex compression knit",
      pdpFabricPills: FABRIC_PILLS,
      pdpCustomizationPills: CUSTOMIZATION_PILLS,
      faqs: [
        {
          q: "What is the compression tank made from?",
          a: "The compression tank is built in a Nylon/Spandex or Polyester/Spandex compression knit. The exact blend and weight are confirmed on your sample, and recycled Polyester/Spandex is an option.",
        },
        {
          q: "How is the compression tank different from a regular tank top?",
          a: "The compression tank is cut close in a higher-Spandex knit for a second-skin fit with strong recovery. Our Tank Tops range covers relaxed, fitted and racerback tanks with a softer hold.",
        },
        {
          q: "Can the compression tank be worn under a team jersey?",
          a: "Yes. The compression tank sits close with flat armhole seams, so it layers smoothly under a jersey or training top as a base layer.",
        },
      ],
      relatedStyleTags: [
        { label: "Custom Short-Sleeve Compression Top", slug: "compression-top", href: PLP },
        { label: "Custom Long-Sleeve Compression Top", slug: "compression-top-long-sleeve", href: PLP },
        { label: "See All", href: PLP },
      ],
      specifications: [
        { label: "Style", value: "Sleeveless compression top" },
        { label: "Fabric", value: SPEC_FABRIC },
        { label: "Weight", value: SPEC_WEIGHT },
        { label: "Fit", value: SPEC_FIT },
        { label: "Neckline", value: "Crew neck" },
        { label: "Armholes", value: "Flatlock-finished, cut for full shoulder movement" },
        { label: "Ventilation", value: "Mesh back panel, optional" },
        { label: "Construction", value: "Cut-and-sew, paneled to your spec" },
        { label: "Branding", value: SPEC_BRANDING },
      ],
      specificationsImage: { alt: "Custom Compression Tank" },
      pdpQualityHeading: "Sleeveless, second-skin, built to move",
      pdpQualitySubline: QUALITY_SUBLINE,
      pdpQualityPoints: [
        "Armhole finish checked for a flat, chafe-free edge",
        "Stretch and recovery checked after repeated wear and wash",
        "Spandex content confirmed against your approved fabric",
        "Fit tested at multiple sizes across the run",
        "Opacity checked at full stretch",
        "Every run inspected to AQL 2.5, third-party inspection welcome",
      ],
    },
    cardOnly("CAP-CBL-04", "compression-tights", "Custom Compression Tights", "Full-length, second-skin base-layer fit"),
    cardOnly("CAP-CBL-05", "compression-shorts", "Custom Compression Shorts", "Mid-thigh length, second-skin fit"),
    cardOnly("CAP-CBL-06", "thermal-compression-top", "Custom Brushed Thermal Compression Top", "Brushed interior, long sleeve, cold-weather"),
  ],
  // "You may also be interested in" (owner spec, 2026-09-25): 5 links, this order.
  relatedLinks: [
    { label: "Leggings", href: "/capriowear/activewear/leggings" },
    { label: "Long-Sleeve Tops", href: "/capriowear/activewear/long-sleeve-tops" },
    { label: "Shorts", href: "/capriowear/activewear/shorts" },
    { label: "Sports Bras", href: "/capriowear/activewear/sports-bras" },
    { label: "Running Wear", href: "/capriowear/activewear/running-wear" },
  ],
};
