// content/activewear/types.ts
// Shared shape for every Activewear category PLP (product listing page).
// One Category object per category file (e.g. content/activewear/leggings.ts)
// feeds app/activewear/[category]/page.tsx -- the page itself has no
// category-specific copy typed into it anywhere; everything renders from
// this data. Adding a new category is adding a new file of this shape to
// content/activewear/categories.ts's registry, not touching the page.
//
// Fields beyond h1/quickAnswer aren't wired into the page yet (built
// section by section, banner first, 2026-08-28) -- typed and filled with
// placeholder content now anyway, so later sections are additive, not a
// second pass through every category file to backfill a shape change.

export type StyleCard = {
  /** Matches the future PDP's own slug, e.g. "high-waist-leggings". */
  slug: string;
  cardTitle: string;
  /**
   * One-line supporting text under the title, e.g. "Available in custom
   * fabrics & colors" -- desktop only (owner request, 2026-08-30: "Remove
   * ... from the product tile only in mobile"); `ProductCard.tsx` no
   * longer renders this at all below `xl`, folded instead into
   * `Category.gridSublineMobile` once, above the whole grid.
   */
  cardSubline: string;
  /** Real photo path once available; placeholder empty-state renders until then. */
  image: string;
  /**
   * Descriptive, keyword-aware alt text for `image`, e.g. "Custom
   * high-waisted compression leggings" -- written now even though `image`
   * is still empty for every card, so real photography can drop in with no
   * separate alt-text pass. Kept apart from `cardTitle` (the short on-card
   * label, e.g. "High Waist Leggings") since an alt needs to stand alone
   * for a screen reader or image search with no card context around it.
   */
  imageAlt: string;
  /** Root-relative, e.g. "/activewear/leggings/high-waist-leggings". */
  href: string;
};

// 3 fields, matching the real design (Figma node 579:5632) exactly -- every
// row is 3 plain text cells, fabric name+composition combined into one
// descriptive string (e.g. "Nylon or polyamide + elastane (70 to 85% / 15
// to 30%)"), not a separate composition sub-field nothing renders.
export type FabricOption = {
  fabric: string;
  bestFor: string;
  performance: string;
};

/** One run of FabricOptions' closing note paragraph -- a typed segment array instead of embedding bold markup in a plain string. */
export type NoteSegment = {
  text: string;
  bold?: boolean;
};

/** One cell of WhatWeCover's 6-item grid (Figma node 579:5580). */
export type CoverageItem = {
  title: string;
  body: string;
};

export type SpecFact = {
  label: string;
  value: string;
};

export type FaqEntry = {
  /** Question text. */
  q: string;
  /** Answer-first and self-contained -- quotable as a single Q&A with no need to read the rest of the page. */
  a: string;
};

export type RelatedLink = {
  label: string;
  href: string;
};

export type Category = {
  /** URL segment: matches the mega-menu href and app/activewear/[category]. */
  slug: string;
  /** Parent group this category belongs to, e.g. "Activewear". */
  group: string;
  /** Label as it appears in the left-panel category nav / mega menu. */
  menuLabel: string;
  /** Page H1. Form: "Custom [Product] Manufacturer". */
  h1: string;
  /**
   * No " | Capriowear" suffix -- the route this feeds
   * (app/activewear/[category]/page.tsx) is a nested child segment of the
   * root layout, so its own `title.template` ("%s | Capriowear") applies
   * automatically. Adding the suffix here doubles it in the rendered
   * `<title>` tag (confirmed live, 2026-08-28). The homepage is the one
   * exception that needs its own full suffix (app/page.tsx sits at the
   * same segment as the layout that owns the template, so the template
   * never applies to it) -- don't copy that pattern here.
   */
  metaTitle: string;
  metaDescription: string;
  /** CategoryBanner's own checkmark row (Figma node 502:3310), e.g. ["MOQ from 50 pieces", "Samples in 10 to 14 days"]. Exactly 4 in the real design. */
  trustBullets: string[];
  /** ProductGrid's own meta-strip subline, e.g. "Every style, made to your brand spec." (Figma node 406:3137). Different copy from trustBullets -- this sits next to menuLabel above the grid, not in the banner. */
  gridSubline: string;
  /**
   * Mobile-only variant of `gridSubline` (owner request, 2026-08-30: "Change
   * the subline under leggings heading to 'Every style is available in
   * custom fabrics & colors. Only for mobile"). Separate field, not a CSS
   * truncation of `gridSubline` -- the two say different things (this one
   * folds in the "in custom fabrics & colors" detail the mobile product
   * tiles no longer show their own subline for, see `StyleCard.cardSubline`
   * comment). Desktop keeps `gridSubline` unchanged.
   */
  gridSublineMobile: string;
  /**
   * Whether CategoryMetaStrip's own gender filter chip row (All/Women/Men)
   * renders for this category (owner note, 2026-08-30: "this chips may
   * come on some of the categories but not applicable for all. Keep it in
   * your system with a flag use or not to use when asked" -- e.g. a
   * unisex-only category with no Women/Men split at all). Optional,
   * defaults to `true` in CategoryMetaStrip itself -- every category built
   * so far (Leggings) uses the chips, so leaving it unset on an existing
   * category file changes nothing; only a category that explicitly wants
   * them hidden needs `showGenderFilter: false`.
   */
  showGenderFilter?: boolean;
  /**
   * Optional (internal review, 2026-08-30, ahead of locking this as the
   * master PLP template): unwired -- nothing on the page renders this yet.
   * Made optional rather than left required so a future category file
   * doesn't have to fill in copy for a section that doesn't exist. Fill it
   * in and wire it up once a real overview/intro section is actually
   * built; until then, omit it.
   */
  overview?: string;
  /** FabricOptions' own eyebrow, e.g. "FABRIC OPTIONS" (Figma node 579:5632). */
  fabricEyebrow: string;
  /** FabricOptions' own H2, e.g. "The fabrics behind the big brands". */
  fabricHeading: string;
  fabricOptions: FabricOption[];
  /** FabricOptions' own closing note, e.g. "Weights from **300 to 500 GSM**...". */
  fabricNote: NoteSegment[];
  /** TrustPoints' own H2, e.g. "Built to pass the squat test" (Figma node 579:5493). */
  qualityHeading: string;
  /** TrustPoints' own subline, e.g. "We confirm it all on your sample before a single bulk piece is cut." */
  qualitySubline: string;
  /** TrustPoints' own bordered row list, e.g. "Opacity tested, squat-proof". Exactly 5 in the real design. */
  qualityPoints: string[];
  /** WhatWeCover's own eyebrow, e.g. "CUSTOMIZATION" (Figma node 579:5580). */
  coverageEyebrow: string;
  /** WhatWeCover's own H2, e.g. "From custom fabric to packaging design". */
  coverageHeading: string;
  /** Exactly 6 in the real design: Fabric, Color and print, Style and fit, Branding, Labels, Packaging. */
  coverageItems: CoverageItem[];
  /**
   * Optional (internal review, 2026-08-30, ahead of locking this as the
   * master PLP template): unwired -- nothing on the page renders this yet.
   * Same reasoning as `overview` above -- omit until a real spec-facts
   * section is built and this is actually wired up.
   */
  specQuickFacts?: SpecFact[];
  /** Faq's own H2, e.g. "Top questions from B2B buyers" (Figma node 579:5660). Same field name Faq.tsx expects (`content.h2`), so `<Faq content={{ h2: faqHeading, items: faqs }} />` needs no adapter. */
  faqHeading: string;
  faqs: FaqEntry[];
  /** Closing CTA's own subline, e.g. "Share your tech pack, sketch or a reference legging. We'll come back within 24 hours with next steps." (Figma node 579:5710). Reuses home.ts's own FinalCta component/heading/button/ticker verbatim -- only this line is category-specific copy. */
  ctaSubline: string;
  styleCards: StyleCard[];
  relatedLinks: RelatedLink[];
};
