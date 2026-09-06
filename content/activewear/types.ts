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
  /**
   * "published": has a real PDP, gets a generated route
   * (`app/activewear/[category]/[style]/page.tsx`'s own `generateStaticParams`
   * filters to this), is listed in `app/sitemap.ts`, and appears in the
   * PLP's own `CollectionPage`/`ItemList` schema. "draft": still shows as a
   * card on the PLP grid (`ProductGrid`/`ProductCard`), but non-clickable,
   * with a "Coming soon" label instead of "View style" -- no route is
   * generated for it at all (a direct hit on its URL 404s, rather than
   * rendering a thin/placeholder page), so it's never a dead link, never
   * indexable, and never in the sitemap. Required, no default: every card
   * must state its own status explicitly, the same "no silent default"
   * pattern `Eyebrow`'s `tone` prop already uses. Flip a style from
   * "draft" to "published" only once its real PDP content (description,
   * FAQs, specifications, gallery) actually exists -- see the decision log
   * entry, 2026-09-02, "Parked, not fixed" in docs/05-plan.md.
   */
  status: "published" | "draft";
  /** Matches the PDP's own slug, e.g. "high-waisted-compression". Treat a draft card's slug as not-yet-final -- it becomes the real, permanent URL only once its status flips to "published"; renaming it after that needs a real 301, not a silent edit. */
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
  /** Root-relative, e.g. "/activewear/leggings/high-waisted-compression". */
  href: string;
  /**
   * The PDP's own product name, e.g. "High-Waisted Compression" (Figma node
   * 634:4952, breadcrumb) -- a real design confirmed this differs from
   * `cardTitle` (the grid's own shorter label, "High Waist Leggings"), so
   * it's a separate field, not a rename. Optional: falls back to
   * `cardTitle` in the PDP wherever it's read, so cards without a real PDP
   * frame yet don't need placeholder text for a page that doesn't exist.
   */
  pdpTitle?: string;
  /**
   * The PDP's own SKU/style code, e.g. "CAP-LEG-01" (Figma node 634:4988
   * desktop / 638:2541 mobile, "Brand & Rating", 2026-08-31) -- optional,
   * same "only the first real Figma frame gets real copy" pattern as
   * `pdpTitle`; the PDP omits this row entirely for a card without one
   * rather than showing a placeholder.
   */
  sku?: string;
  /**
   * The PDP's own on-page H1, e.g. "Custom High-Waisted Compression
   * Leggings Manufacturer" -- a different, longer string than `pdpTitle`
   * (that one is the breadcrumb's own short trailing crumb, a separate
   * Figma node). Falls back to `pdpTitle` then `cardTitle` in the PDP.
   */
  pdpHeading?: string;
  /** The PDP's own descriptive paragraph under the H1. Falls back to `cardSubline` in the PDP. */
  pdpDescription?: string;
  /**
   * The PDP's own image gallery (Figma node 634:4961 desktop / 638:860
   * mobile, 2026-08-31) -- optional, same "only the first real Figma frame
   * gets real copy" pattern as `pdpTitle`/`sku`/`pdpHeading` above; a card
   * without one simply doesn't render `ProductGallery`. Real photo paths
   * once available, placeholder empty-state renders until then, same
   * convention as `image` above. More than 5 entries is what exercises the
   * desktop rail's "show more" chevron. `src` optional for the same reason
   * -- an entry can exist (reserving a gallery slot/alt text) before its
   * real photo file does; the PDP's own generateMetadata falls through to
   * the site's default OG image whenever no entry has a real `src` yet.
   *
   * Also the PLP grid's own image source (owner spec, 2026-09-02,
   * `ProductCardMedia.tsx`): the tile always shows `images[0]`, and
   * cross-fades to `images[1]` on desktop hover if it exists -- never any
   * further entry in this array, which stays the PDP gallery's own full
   * set. A card with no `images` array at all falls back to the older flat
   * `image`/`imageAlt` fields below as its own `images[0]` equivalent.
   */
  images?: { alt: string; src?: string }[];
  /**
   * The PDP's own <title>/meta description (owner spec, 2026-09-01: "Custom
   * [Style] Manufacturer | Capriowear" form). No " | Capriowear" suffix
   * here -- same reasoning as `Category.metaTitle`'s own comment, this
   * route is a nested child segment of the root layout, whose own
   * `title.template` applies automatically. Optional: falls back to
   * `` `Custom ${pdpTitle ?? cardTitle} Manufacturer` `` in the PDP, so a
   * card without one yet still gets a real, non-empty title.
   */
  pdpMetaTitle?: string;
  /** Unique, fact-dense meta description. Falls back to `pdpDescription` then `cardSubline` in the PDP. */
  pdpMetaDescription?: string;
  /**
   * Short spec line for the PDP's own Product schema (`lib/schema.ts`'s
   * `productSchema()`), e.g. "Nylon or polyamide + elastane, 4-way
   * stretch". Independent of the future visual spec-datasheet section
   * rather than a fragile guess at which datasheet row means "the
   * material" once that section exists -- optional, simply omitted from
   * the schema for a card without one yet.
   */
  material?: string;
  /**
   * This style's own 2 to 3 FAQ questions (owner spec, 2026-09-01) --
   * merged with the shared entity/operational questions
   * (`content/activewear/pdpShared.ts`) on the PDP itself, entity question
   * first, then these, then the shared operational block last. The PLP's
   * own FAQ answers category/range questions; these answer this-style
   * questions, and are never the same copy.
   */
  faqs?: FaqEntry[];
  /**
   * The PDP's own "Related styles" pill/tag row (Figma node 634:5070
   * desktop / 643:2660 mobile, "Browse More", 2026-09-01), sitting under
   * `ProductCtas` in the same text column -- browsing suggestions by
   * attribute (e.g. "Flare & Wide-Leg"), not a second list of sibling PDP
   * links (that's the separate, plain "Related styles" block further down
   * the page, which links to actual sibling PDPs and satisfies SEO rule
   * 6's crawl-loop requirement on its own). Each tag carries its own real
   * `href`: wherever this category's `styleCards` has a genuine matching
   * sibling PDP, the tag links straight to it; a tag describing a fit/cut
   * with no matching card yet (and the trailing "See All") links to the
   * parent category PLP instead -- always a real, working page, never an
   * invented per-attribute filter URL nothing serves. Optional, same "only
   * the first real Figma frame gets real copy" pattern as
   * `sku`/`pdpHeading` above.
   */
  relatedStyleTags?: { label: string; href: string }[];
  /**
   * The PDP's own "Specifications" datasheet (Figma node 634:5092 desktop /
   * same node mobile, 2026-09-02) -- a label/value fact row per real build
   * detail (Style, Fabric, Weight, Stretch and support, Waistband,
   * Construction, Branding). Per-style, not shared: two styles in the same
   * category can genuinely differ on weight/waistband/construction, unlike
   * `pdpSpecHighlights` (content/activewear/pdpShared.ts), which is the same
   * 4 standing facts on every PDP. Optional, same "only the first real
   * Figma frame gets real copy" pattern as `images`/`sku`/`pdpHeading`
   * above -- `ProductSpecifications` simply doesn't render for a style
   * without one yet.
   */
  specifications?: SpecFact[];
  /**
   * Mobile-only image above the specifications list (Figma node 634:5092,
   * mobile frame only -- desktop has no image in this section). Optional,
   * alt-only placeholder until real photography exists, same convention as
   * `images` above.
   */
  specificationsImage?: { alt: string; src?: string };
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

/**
 * One row of FabricOptions' own optional "weight tiers" table (owner
 * spec, 2026-09-02, T-Shirts category) -- e.g. `{tier: "Midweight", gsm:
 * "150 to 190 GSM", bestFor: "Retail basics and brand merch, most screen
 * and DTG work"}`. A real, liftable structure alongside the main fabric
 * table, not folded into `fabricNote`'s own prose -- see
 * `Category.weightTiers`'s own comment for why.
 */
export type WeightTier = {
  tier: string;
  gsm: string;
  bestFor: string;
};

/**
 * Column-header override for `Category.weightTiers`' own table (owner
 * spec, 2026-09-02, Compression & Base Layers category) -- defaults to
 * "Tier"/"GSM"/"Best for" (FabricOptions.tsx's own
 * `DEFAULT_WEIGHT_TIERS_HEADERS`) when omitted, so every prior category
 * that already uses `weightTiers` (Hoodies, Sweatshirts, Long-Sleeve
 * Tops, Joggers & Track Pants) renders unchanged. The underlying
 * `WeightTier` data shape itself is reused as-is, not extended -- e.g.
 * Compression & Base Layers' own table sets this to `{tier: "Level",
 * value: "mmHg", bestFor: "Used for"}` and stores "Light"/"Medium"/"Firm"
 * in each row's own `tier` field, the mmHg range in `gsm`.
 */
export type WeightTiersHeaders = {
  tier: string;
  value: string;
  bestFor: string;
};

/**
 * One row of the reusable structured block's "decoration method" variant
 * (owner spec, 2026-09-05, Teamwear/Cricket) -- e.g. `{method: "Full-dye
 * sublimation", bestFor: "Whole-jersey graphics, names, numbers, sponsor
 * logos", notes: "Dyed into the fiber, will not crack, peel or fade..."}`.
 * Sibling shape to `WeightTier`, not a reuse of it -- the two variants
 * describe genuinely different things (a weight/GSM tier vs. a
 * decoration/print method), so forcing them into one shape would just mean
 * relabeling fields that don't actually mean the same thing.
 */
export type DecorationRow = {
  method: string;
  bestFor: string;
  notes: string;
};

/**
 * The reusable block FabricOptions.tsx renders under its own main fabric
 * table (owner spec, 2026-09-05, Teamwear/Cricket) -- a discriminated union
 * so a category picks exactly one variant:
 * - "weightTiers": the existing GSM/mmHg-style tiers table (`Category.weightTiers`/
 *   `weightTiersHeaders` below) -- every Activewear category already using
 *   those two fields directly keeps doing so unchanged; this variant exists
 *   for shape parity, not because any category needs to migrate to it.
 * - "decoration": a 3-column Method / Best for / Notes table with its own
 *   eyebrow + H3, for a category whose "extra" table is a decoration/print
 *   method breakdown rather than a fabric-weight one (Teamwear/Cricket).
 * - "none": renders nothing extra -- same as omitting the field entirely,
 *   kept for a category that wants to be explicit about having no second
 *   table rather than just leaving the field unset.
 */
export type StructuredBlock =
  | { type: "weightTiers"; tiers: WeightTier[]; headers?: WeightTiersHeaders }
  /**
   * `note`, when set, is a `NoteSegment[]` (same segment-run shape as
   * `Category.fabricNote`), not a plain string (owner spec, 2026-09-06:
   * "highlight small important things... with semibold font") -- lets a
   * short, genuinely important phrase in this note render `font-semibold`
   * (`fabricOptions.noteBold`) the same way the main fabric table's own
   * closing note already can, rather than adding a second, parallel
   * rich-text mechanism.
   */
  | { type: "decoration"; eyebrow: string; heading: string; rows: DecorationRow[]; note?: NoteSegment[] }
  | { type: "none" };

/**
 * One row of the PDP's icon spec-highlights list (Figma node 634:5393
 * desktop / 638:2547 mobile, "Content", 2026-09-01) -- e.g. `{icon:
 * "package", text: "MOQ from 50 pieces"}`. `icon` is a fixed key, not a
 * component reference -- content stays plain data; `ProductHighlights.tsx`
 * maps the key to the real lucide icon. Shared, standing PDP content (see
 * `content/activewear/pdpShared.ts`'s own `pdpSpecHighlights`), not
 * per-style data -- every PDP shows the same 4 facts.
 */
export type PdpSpecHighlight = {
  icon: "package" | "calendarDays" | "arrowDownAZ" | "ship";
  text: string;
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
  /**
   * Four optional overrides for `pdpShared.ts`'s `categoryEntityFaq()`
   * (owner spec, 2026-09-02, Sports Bras category), all falling back to
   * `menuLabel`/`styleCards` when omitted so an existing category (e.g.
   * Leggings) renders byte-identical output without setting any of them:
   *
   * - `manufacturerNoun`: the noun in "a custom [X] manufacturer" (also
   *   feeds `h1`/`metaTitle`'s own "Custom [X] Manufacturer" form, though
   *   those are still typed out directly on this object, not derived from
   *   this field). Lowercased at interpolation regardless of how it's
   *   cased here, so it can be stored readably (e.g. "Sports Bra") without
   *   producing a mid-sentence capital. Falls back to
   *   `menuLabel.toLowerCase()`.
   * - `productNounPlural`: the noun in "private label [X]" -- a genuinely
   *   different word from `manufacturerNoun` for a category whose singular
   *   and plural forms diverge ("a custom sports bra manufacturer" /
   *   "private label sports bras" -- the old single shared noun couldn't
   *   say both correctly). Falls back to `menuLabel.toLowerCase()`, same
   *   as `manufacturerNoun`'s own fallback -- correct for a category like
   *   Leggings, where the singular and plural forms are the same word.
   * - `entityExampleStyles`: the styles clause after "including" -- falls
   *   back to `styles like ${first 4 styleCards[].cardTitle, joined}`
   *   (Leggings' own prior behavior, unchanged).
   * - `entityFabrics`: the fabrics clause after "in" -- no fallback text;
   *   when omitted, the " in [fabrics]" clause is dropped from the
   *   sentence entirely (Leggings' own prior sentence shape had no such
   *   clause at all, so adding an empty one would be a silent regression).
   */
  manufacturerNoun?: string;
  productNounPlural?: string;
  entityExampleStyles?: string;
  entityFabrics?: string;
  /** Page H1. Form: "Custom [Product] Manufacturer". */
  h1: string;
  /**
   * Form: "Custom [Style/Category] Manufacturer" -- single segment, NO
   * "| Capriowear" suffix (the route this feeds,
   * app/activewear/[category]/page.tsx, is a nested child segment of the
   * root layout, so its own `title.template` ("%s | Capriowear") appends
   * that automatically; adding it here doubles it in the rendered
   * `<title>` tag, confirmed live). The homepage is the one exception that
   * needs its own full suffix (app/page.tsx sits at the same segment as
   * the layout that owns the template, so the template never applies to
   * it) -- don't copy that pattern here.
   *
   * Google display-limit rule (owner, 2026-08-30, docs/06-seo.md): keep
   * this field itself short enough that the FULL rendered title (this
   * value + " | Capriowear") lands around 50-60 chars, never past ~65
   * where the keyword itself would get cut. Don't append extra qualifiers
   * here ("| Private Label and OEM", etc.) even if true -- that belongs in
   * `metaDescription`, which has far more room.
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
   * Which chip in CategoryMetaStrip's own All/Women/Men row starts active
   * (owner spec, 2026-09-03, Bodysuits: "default Women, women's-led
   * category") -- optional, defaults to "All" in CategoryMetaStrip itself,
   * same backward-compatible pattern as `weightTiersHeaders`' own default:
   * every category built so far leaves this unset and renders exactly as
   * before ("All" active on load); only a genuinely women's-led (or, in
   * principle, men's-led) category sets it explicitly. Purely the chip
   * row's own initial visual state -- these chips don't filter
   * `styleCards` (no per-style gender field exists), so this has no
   * effect on which cards render.
   */
  defaultGenderFilter?: "All" | "Women" | "Men";
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
  /**
   * FabricOptions' own optional secondary table (owner spec, 2026-09-02,
   * T-Shirts category) -- a compact Tier/GSM/Best-for breakdown rendered
   * between the main fabric table and `fabricNote` below, only when a
   * category actually has real weight tiers to show (T-Shirts genuinely
   * spans 100 to 280+ GSM across its own fabric range; Leggings/Sports
   * Bras/Shorts don't have this same tiered-by-weight structure, so they
   * simply omit the field and this element renders nothing -- see
   * FabricOptions.tsx's own comment for the backward-compatibility
   * contract). A real `<table>`, not folded into `fabricNote`'s own prose
   * -- kept a genuinely liftable structure for AEO/GEO, matching this
   * project's own "fabric and spec tables stay real, liftable tables"
   * rule.
   */
  weightTiers?: WeightTier[];
  /** Optional column-header override for `weightTiers` above -- see `WeightTiersHeaders`' own comment. Omit to keep the default "Tier"/"GSM"/"Best for" labels. */
  weightTiersHeaders?: WeightTiersHeaders;
  /**
   * The reusable block under the fabric table, as a discriminated variant
   * (owner spec, 2026-09-05, Teamwear/Cricket) -- see `StructuredBlock`'s
   * own comment. Optional and independent of `weightTiers`/`weightTiersHeaders`
   * above: every existing Activewear category keeps using those two fields
   * directly and leaves this unset, rendering exactly as before. Only a
   * category using the "decoration" variant (or a future variant) sets
   * this instead.
   */
  structuredBlock?: StructuredBlock;
  /** FabricOptions' own closing note, e.g. "Weights from **300 to 500 GSM**...". */
  fabricNote: NoteSegment[];
  /**
   * Short pill labels for the PDP's own "Fabric options" tag group (Figma
   * node 634:5034 desktop / 645:2905 mobile, "Content", 2026-09-01) --
   * e.g. `["Nylon spandex", "Recycled polyester spandex", ...]`. A
   * shortened, PDP-facing name for the same fabrics `fabricOptions` above
   * describes in full on the PLP (e.g. `fabricOptions[0].fabric` is
   * "Nylon or polyamide + elastane (70 to 85% / 15 to 30%)" -- this is
   * that same fabric's short pill label, "Nylon spandex") -- a separate
   * field, not derived from `fabricOptions` at render time, since the two
   * strings don't share a mechanical transformation (PDP pills are marketing
   * shorthand, not a truncation). Category-level, not per-style: every PDP
   * in a category offers the same fabric range.
   */
  fabricPills: string[];
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
  /**
   * The one word (or short phrase) that fills "a reference [X]" in the
   * closing CTA's own subline (Figma node 579:5710, base copy "Share your
   * tech pack, sketch or a reference legging. We'll come back within 24
   * hours with next steps.") -- owner spec, 2026-09-04: every category now
   * swaps its own noun here ("sports bra", "pair of shorts", "hoodie",
   * etc.) rather than every page rendering the same literal "legging"
   * verbatim (that was itself a deliberate standing rule, 2026-09-02,
   * later superseded by this one -- see the decision log). Built into the
   * full sentence by `buildCtaSubline()` (./pdpShared.ts), read by both
   * app/activewear/[category]/page.tsx and app/activewear/[category]/
   * [style]/page.tsx (a PDP always uses its own category's noun, never
   * the individual style name -- owner spec, same date). Optional only
   * for shape parity with `CuratedCollection`'s own copy of this field
   * (Running Wear has no single noun); every real `Category` sets it.
   */
  ctaReferenceNoun?: string;
  styleCards: StyleCard[];
  relatedLinks: RelatedLink[];
};

/**
 * A curated collection page (owner spec, 2026-09-03, Running Wear) --
 * genuinely different from `Category` above, not a variant of it: this
 * page owns no products of its own. Its cards cross-link to OTHER real
 * category PLPs (or, later, to specific published PDPs once a
 * running-specific style exists), so it generates no PDP routes under its
 * own slug, carries no `CollectionPage`/`ItemList`/`Product` schema (there
 * is nothing of its own to list), and has no fabric options table (no
 * fabric of its own either -- it's an edit across other categories'
 * fabrics). Rendered by its own static route,
 * `app/activewear/running-wear/page.tsx`, not the shared `[category]`
 * dynamic route or its own `categories` registry -- adding a second
 * curated page later means a second sibling static route, not a shape
 * change here or a new "type" discriminant threaded through the shared
 * template.
 *
 * `cards` reuses `StyleCard` as-is (not a second, parallel card type) so
 * `ProductGrid`/`ProductCard` render it with zero code changes: every card
 * is given `status: "published"` (real, clickable, live cards -- there's
 * no draft state here, no PDP being "not built yet" since the target is
 * always an existing, already-published category page) and an `href`
 * pointing at that other category's PLP (e.g. `/activewear/shorts`), not
 * a same-category child route. `slug` on each card only has to be unique
 * for React's own `key` -- it plays no routing role here, since
 * `generateStaticParams` never reads this array.
 */
export type CuratedCollection = {
  /** URL segment: e.g. "running-wear". */
  slug: string;
  /** Label as it appears in the left-panel category nav / mega menu. */
  menuLabel: string;
  /** Same four entity-FAQ fields as `Category`'s own -- see that type's own comment. No fallback to `styleCards` here (this page's own `cards` are cross-links, not real products to summarize), so `entityExampleStyles` is effectively required in practice even though the field itself stays optional for shape parity. */
  manufacturerNoun?: string;
  productNounPlural?: string;
  entityExampleStyles?: string;
  entityFabrics?: string;
  /** Page H1. */
  h1: string;
  /** Same "no ' | Capriowear' suffix" rule as `Category.metaTitle` -- see that field's own comment. */
  metaTitle: string;
  metaDescription: string;
  trustBullets: string[];
  gridSubline: string;
  gridSublineMobile: string;
  showGenderFilter?: boolean;
  coverageEyebrow: string;
  coverageHeading: string;
  coverageItems: CoverageItem[];
  qualityHeading: string;
  qualitySubline: string;
  qualityPoints: string[];
  faqHeading: string;
  faqs: FaqEntry[];
  /**
   * Same field as `Category.ctaReferenceNoun` -- see that field's own
   * comment. Left unset for Running Wear (owner spec, 2026-09-04: "NO
   * noun, render 'Share your tech pack, sketch or a reference. We'll
   * come back within 24 hours with next steps.'") -- `buildCtaSubline()`
   * (./pdpShared.ts) drops the "[X]" clause entirely when this is
   * undefined, not a fallback string.
   */
  ctaReferenceNoun?: string;
  cards: StyleCard[];
};
