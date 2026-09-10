// components/ui/styles.ts
// -----------------------------------------------------------------------------
// THE STYLE LIBRARY. Every class string that describes how something *looks*
// lives here, and nowhere else.
//
// Three layers, and the rule for each (see docs/02-design-system.md):
//   1. Tokens   -> the @theme block in app/globals.css. Raw values only.
//   2. Recipes  -> this file. Token utilities combined into named looks.
//   3. Components -> /components/*.tsx. Structure, behaviour, accessibility.
//                    No appearance decisions.
//
// Why this exists: restyling every button on the site should be one edit in one
// place, not thirteen edits across thirteen files that can silently drift apart.
//
// Rules for editing this file:
//   - Token utilities only. No raw hex, no raw px. If a design needs a value the
//     tokens do not have, stop and ask before inventing one (CLAUDE.md).
//   - Type tokens come from Figma (node 284:333) and carry their own weight, so
//     a recipe must NOT add font-bold / font-medium next to a text-* class. The
//     one exception is deliberate emphasis within the same style, which is
//     marked inline where it happens.
//   - One-off *layout* (a grid that exists in exactly one section) may stay in
//     the component. Anything about colour, type, spacing rhythm, radius,
//     border, shadow or state belongs here.
//   - Group per component, in the same order as the component list in
//     docs/03-component-library.md, so the two stay easy to read side by side.
//
// Conventions used below:
//   base        the classes every instance gets
//   <variant>   classes added for one variant, e.g. primary / secondary
//   on*         a state, e.g. onDark
// -----------------------------------------------------------------------------

/* --- Shared -------------------------------------------------------------- */

/** Surfaces that flip a whole block between the light and dark section styles. */
export const surface = {
  light: "border-line bg-paper text-text",
  dark: "border-line-dark bg-ink text-paper",
  /** Secondary dark surface, e.g. a menu panel sitting on top of an ink band. */
  darkRaised: "border-line-dark bg-ink-2 text-paper",
};

/** A 44px round icon-only hit area, used by the drawer and menu buttons. */
export const iconButton = "inline-flex size-11 items-center justify-center rounded-pill hover:bg-paper/10";

/* --- Button -------------------------------------------------------------- */

export const button = {
  // Figma "Button/Primary" uses the Button style: 18px, 700, 24px line, and
  // measures 54px tall (Hero banner buttons, node 322:1528/1529/1531) -- the
  // sitewide 44px (min-h-11) is the accessibility floor everywhere else, but
  // the real button design exceeds it. Corrected 2026-08-24 from min-h-11.
  // `transition-[color,background-color,border-color,filter]`, not the
  // plain `transition-colors` utility (owner, 2026-09-07: "hover on the
  // primary cta should have the same hover color ... use on the main ctas
  // wherever it is" -- referring to Product Range's "Explore Activewear"
  // link, `productRange.exploreLink`'s `hover:brightness-125`) -- an
  // explicit color-property list that also covers `filter`, so `primary`'s
  // new brightness hover below actually animates instead of snapping.
  base: "inline-flex min-h-[54px] items-center justify-center rounded-pill px-8 py-2 text-button uppercase transition-[color,background-color,border-color,filter] disabled:pointer-events-none disabled:opacity-40",
  // Hover no longer lightens the fill (owner, 2026-09-08: "rather making
  // it light on hover remove the effect and change the cta color label"
  // -- supersedes the 2026-09-07 `hover:brightness-125` pass below,
  // reverted sitewide since it's the one shared `button.primary` recipe
  // every `<Button>` instance uses). The label/icon colour switches to a
  // literal dark brown instead, `#5E240F` (corrected same day from an
  // initial `#471605`) -- a one-off hex per the project's own "ask before
  // inventing a token" rule (styling only through tokens/recipes, colour
  // excepted from the typography-only exception), not yet a named token
  // since only this one hover state uses it.
  // `cta-primary-shimmer` (globals.css): default state is plain solid
  // `bg-accent` at every breakpoint, unchanged -- the gradient only exists
  // on hover. Went through a few passes the same day (2026-09-10): first a
  // gradient fill shown at rest ("apply orange some nice looking gradiant
  // in the primary cta... works both on black and white background"), then
  // a hover-only pan ("the gradiant should move a little that user can
  // feel," "while hovering, default state should be plain only"), then
  // finally moving the gradient itself to be hover-only too ("primarily cta
  // default state should be our primary orange color, do not change it but
  // when hover, then it should animate a grandiant inside the button") --
  // so `bg-accent` alone covers rest/mobile/tablet, and `cta-primary-
  // shimmer`'s own `:hover` rule (desktop-only, `xl:`-gated) is where the
  // gradient + pan animation both live now, not here in the class string.
  // `hover:text-[#5E240F]` (2026-09-08's dark-brown hover label) stays
  // removed (owner, same 2026-09-10 turn: "keep the text white in the
  // primary cta") -- the gradient's own hover motion is the feedback now,
  // text stays plain `text-accent-ink` white at every state.
  primary: "bg-accent cta-primary-shimmer text-accent-ink",
  // currentColor, so the same outline reads on light and dark sections without
  // a separate inverse variant.
  // `hover:bg-accent/10` was tried 2026-09-08 (owner: "make it same hover
  // color as used on the pdp download catalog") to match the PDP's own
  // `productCtas.secondaryDesktop` accent-tinted hover -- reverted the same
  // day (owner: "revert back, it does not look nice"). Back to the
  // original whitish `current/10` overlay.
  secondary: "border border-current bg-transparent text-current hover:bg-current/10",
};

/* --- Eyebrow ------------------------------------------------------------- */

// Figma calls this style "Overline": 20px, 600, no letter spacing. Size is
// split out from the transform so a real per-instance size override (e.g. the
// Hero eyebrow, smaller on its real mobile design) can replace just the size,
// not fight it -- see the `size` prop on Eyebrow.tsx.
//
// Mobile default is 16px/600/1.2, not the raw `text-overline` 20px (owner,
// 2026-09-10, mobile-only review: "the eyebrow heading on all the sections
// should be 16px font size semibold, some are big or small. make them
// consistent") -- an Explore audit of every real eyebrow usage sitewide
// found this exact 16px/600 value already the de facto standard almost
// everywhere (each section pairing its own local `eyebrowSize` override with
// this same string), with one real gap (HowItWorks' light-tone/homepage
// usage, still on the bare 20px default) and one earlier fix (OurServices'
// `pageVariant="home"` usage, same bug). Moving the value here, into the
// component's own default, makes it the sitewide rule instead of a value
// every section has to individually remember to override -- any future
// section gets it for free with no `eyebrowSize` prop needed. Desktop is
// unaffected (`md:text-overline`, the real 20px/600 Figma Overline style).
export const eyebrow = {
  base: "uppercase",
  size: "max-md:text-[1rem] max-md:font-semibold max-md:leading-[1.2] md:text-overline",
  // Standing rule (owner call, 2026-08-24, applies everywhere, no
  // exceptions): an eyebrow paired with a heading is always #ABB5C0 on a
  // dark/black section, always #17191E on a light/white one. Replaces an
  // earlier accent-orange default that had never actually been confirmed
  // against Figma for most sections using it -- Hero's own eyebrow included.
  dark: "text-[#ABB5C0]",
  light: "text-[#17191E]",
  // currentColor at 60%, so it dims against whatever the section already
  // sets -- for a standalone label, not paired with a heading (e.g. above a
  // logo row or a ticker). Unrelated to the dark/light rule above.
  muted: "text-current/60",
};

/* --- Chip ---------------------------------------------------------------- */

export const chip = {
  // No Figma component defines a chip. Button Small is the only compact style
  // in the scale, so that is the role match.
  base: "inline-flex items-center justify-center rounded-pill px-4 text-button-sm transition-colors",
  /** Link and button forms carry the 44px tap target. */
  interactive: "min-h-11 py-2",
  /** A static label is not a tap target, so it does not get the 44px floor. */
  static: "py-2",
  active: "bg-accent text-accent-ink border border-accent",
  inactive: "border border-current/20 text-current hover:border-current/40 hover:bg-current/5",
};

/* --- SectionHeading ------------------------------------------------------ */

// Confirmed against real Figma 2026-08-23 (What We Make, node 366:130/366:162),
// correcting two unverified guesses this component shipped with before any
// real section used it.
export const sectionHeading = {
  // Reverted to 24px at every breakpoint (owner, 2026-09-01: "I did not ask
  // to change the eyebrow and section title, let's bring it back to 24px
  // everywhere... on both desktop, mobile" -- the earlier same-day 8px
  // change here was a misread of a request that actually meant the
  // CapabilityCard title/body pairing inside ProductCustomizeSteps, not
  // this eyebrow-to-heading gap; see `productCustomizeSteps.desktopCardBody`
  // for the correctly-scoped 8px fix). Uniform 24px, not the original
  // gap-4/xl:gap-6 (16px/24px) split, per this explicit correction.
  root: "flex flex-col gap-6",
  // Owner correction, 2026-09-01: "the new color I suggested for subheading
  // will only apply to white background section not black. use this color
  // 17191E" -- text-subline is the shared token for this exact "title on a
  // white/paper background" case (app/globals.css's --color-subline), not
  // a hardcoded hex, so this stays in sync with any future token change.
  // The heading's own default is to inherit the section's colour (text-text
  // or text-paper, see this component's own header comment); this is a
  // light-background-only override, applied conditionally in
  // SectionHeading.tsx (eyebrowTone === "light"), never on a dark section.
  headingLight: "text-subline",
  // Figma "Section Header" pairs Overline with the Heading 1 style, not
  // Heading 2. That is a type style, not a heading level: the element stays an
  // <h2> so the document outline is still correct.
  // Desktop matches text-h1 exactly (54px/500/64px leading). Mobile does not:
  // text-h1's fluid low anchor gets the *size* right (30px) but not the
  // weight or line-height -- Figma's real mobile instance is 460/34px, not
  // the token's 500/~35.6px. Scoped here rather than changing the shared
  // --text-h1 token, since there's no confirmation yet that other text-h1
  // headings share this same mobile discrepancy (worth re-checking if one
  // does). No colour: inherits text-text or text-paper from the section
  // around it.
  // max-md:/md: are mutually exclusive media conditions, not two utilities
  // racing at the same specificity for the same property (the Button/hidden
  // cascade-order bug already burned this project once) -- without max-md:
  // here, the unprefixed mobile weight/line-height would keep winning at
  // desktop widths too, since md:text-h1 doesn't automatically "cancel" an
  // unscoped sibling utility touching the same property.
  // Threshold moved from xl:(1280px)/max-xl: to md:(768px)/max-md: (owner,
  // 2026-09-04: "should we use the font sizes used on the desktop [at
  // tablet]... increase the font sizes as per best practices for tablet")
  // -- text-h1's fluid clamp() already evaluates well above the 30px
  // mobile value at 768px (~39px, confirmed via its own formula in
  // app/globals.css, growing continuously to 54px at 1440px), so this is
  // a pure threshold change, not a new value: real mobile (<768px) is
  // completely unaffected, tablet now gets the real (fluid, growing)
  // desktop heading instead of a flat 30px the whole way to 1280px.
  heading: "max-md:text-[1.875rem] max-md:font-[460] max-md:leading-[34px] md:text-h1",
  // Centred variant, confirmed against real Figma 2026-08-23 (Certified &
  // Compliant, node 369:267/375:436): both the eyebrow and heading are
  // centre-aligned text, and the whole block is centred within its section
  // (not just left-aligned text stretched full-width). Left (the default)
  // stays the base -- Trust Signals and What We Make are both genuinely
  // left-aligned, so this is an added variant, not a replacement.
  alignCenter: "items-center text-center",
};

/* --- Card ---------------------------------------------------------------- */

export const card = {
  // 24px image-to-label gap -- confirmed against real Figma 2026-08-23 (What
  // We Make, node 366:139), correcting an unverified gap-3 (12px) guess from
  // before any real section used this component.
  root: "group flex flex-col gap-6",
  // Heading 5, centred -- confirmed an exact match to the real Figma category
  // tile label (24px/500/normal, centred) 2026-08-23. Mobile sized up to
  // 30px (owner call, 2026-08-26, sitewide: every mobile 24px title becomes
  // 30px) -- desktop keeps the real Figma-confirmed 24px (text-h5).
  label: "text-center max-xl:text-[1.875rem] max-xl:font-medium max-xl:leading-normal xl:text-h5",
  /** Card lift on hover only, per the elevation rule. */
  mediaHover: "transition-shadow group-hover:shadow-card",
};

export const capabilityCard = {
  // 16px mobile, 24px desktop gap between the media and the text block --
  // corrected 2026-08-25, first real confirmation against Our Services
  // (node 415:5449/415:5484), this component's own real design. The flat
  // 16px was a pre-Figma guess.
  root: "flex flex-col max-xl:gap-4 xl:gap-6",
  // 12px (owner correction, 2026-09-01: "make the title and subline 8px to
  // 12px everywhere") -- was gap-2 (8px). Sitewide: every CapabilityCard
  // user (Our Services, How It Works, ProductCustomizeSteps) gets this for
  // free from one shared default, at both breakpoints.
  body: "flex flex-col gap-3",
  // Figma "Feature Card": Heading 3 title -- confirmed, unchanged.
  title: "text-h3",
  // Corrected 2026-08-25 (Our Services, this component's first real usage):
  // plain near-black text, not `text-muted` -- the real design has no
  // dimming here. 18px/24px leading mobile, 20px/28px leading desktop; the
  // desktop size matches `text-body-lg` but its leading (1.2) doesn't match
  // Figma's real 28px (1.4), so this is explicit values, not the token.
  // text-subline (#17191e, owner, 2026-09-01: sitewide title+subline colour
  // on white/paper backgrounds) -- was plain near-black with no colour
  // class (inherited text-text). Every caller of this shared component
  // (Our Services, How It Works, ProductCustomizeSteps on the PDP) picks
  // this up automatically, all on white/paper sections.
  // Threshold moved xl:/max-xl: -> md:/max-md: (owner, 2026-09-04: use
  // desktop sizes at tablet width) -- both fixed values, desktop always
  // larger, pure threshold change. Shared by Our Services and How It
  // Works (and ProductCustomizeSteps, PDP -- out of scope for this pass).
  text: "max-md:text-[1.125rem] max-md:leading-[24px] md:text-[1.25rem] md:leading-[28px] font-normal text-subline",
  // Dark-section counterpart of `text` above (How It Works' own dark
  // variant, 2026-09-07, /services page) -- identical size/leading, colour
  // swapped from `text-subline` (near-black, unreadable on a dark section)
  // to the owner's own explicit `#838D97`, already this project's
  // extremely well-established "muted text on dark" colour (mega-menu
  // labels, footer contact label, Hero's mobile ticker, Stats' caption,
  // Inside the Factory's subline, etc.) -- not a new one-off value.
  textDark: "max-md:text-[1.125rem] max-md:leading-[24px] md:text-[1.25rem] md:leading-[28px] font-normal text-[#838D97]",

};

/** Shared by both Card variants for their image area. */
export const cardMedia = {
  // No radius baked in here -- each caller states `radius` explicitly (see
  // CardMedia's own prop) so only ever one `rounded-*` class is ever in
  // play at a time, never two competing ones in the same string.
  base: "w-full",
  radius: {
    lg: "rounded-lg",
    none: "rounded-none",
  },
  image: "relative overflow-hidden",
  // No border (owner call, 2026-08-24, sitewide -- see the same note on
  // MediaPlaceholder's placeholderLight in the media recipe above). This is
  // Card's own separate placeholder implementation, missed at the time since
  // no real section used Card yet; brought in line now that What We Make is
  // the first one that does.
  placeholder: "bg-paper-2",
  // Dark-section counterpart (How It Works' own dark variant, 2026-09-07,
  // /services page) -- reuses the exact `bg-ink-2` token `media.
  // placeholderDark` already uses for this identical "no photo yet, on a
  // dark section" case, not a new dark-surface colour.
  placeholderDark: "bg-ink-2",
  imageFill: "object-cover",
};

/* --- StatBlock ----------------------------------------------------------- */

export const stat = {
  root: "flex flex-col gap-2",
  // Built for the dark Stats band only, so paper is hardcoded rather than
  // inherited: there is no light-section use case to stay generic for.
  // Figma "Stat Card" uses Heading 1 and Body Large, not the Stat Number and
  // Stat Label styles. Those two are defined as tokens but no component uses them.
  value: "text-h1 text-paper",
  caption: "text-body-lg text-paper/70",
};

/* --- MediaPlaceholder ---------------------------------------------------- */

export const media = {
  shell: "relative w-full overflow-hidden",
  ratio: {
    "16:9": "aspect-video",
    "4:5": "aspect-[4/5]",
    // Our Services' own card ratio (`ourServices.cardMediaRatio`, a raw
    // class string passed directly to `CapabilityCard`, not through this
    // table) -- added here as real `MediaRatio` entries so a plain
    // `MediaPlaceholder` caller can match it exactly (How We Work,
    // 2026-09-09: "container size... should follow the services", desktop
    // only -- that section's own mobile/tablet accordion has no image at
    // all). `8:5` is the one this caller uses; `7:5` (Our Services' own
    // mobile tier) is added alongside it for the same reason -- kept
    // together as one real pair, not a single value with its sibling
    // omitted.
    "7:5": "aspect-[7/5]",
    "8:5": "aspect-[8/5]",
    "1:1": "aspect-square",
    // Trust Signals' desktop media box is a fixed 400x296 box (confirmed via
    // get_metadata, node 348:1864) -- landscape, not close to any ratio
    // above, and 4:5 would be flatly wrong (that one is portrait). Kept as
    // its exact reduced fraction rather than rounded to an existing ratio.
    "50:37": "aspect-[50/37]",
    // Trust Signals' mobile artwork box, 320x220 (node 348:1881) -- a
    // genuinely different crop from the desktop box, not the same image
    // scaled down, so it gets its own exact ratio too.
    "16:11": "aspect-[16/11]",
    // Stats' desktop media box, widened to 864x620 (owner, 2026-09-09, Figma
    // node 819:329 revision -- was 660x620/"33:31") -- exact reduced
    // fraction (864:620 / 4), not rounded.
    "216:155": "aspect-[216/155]",
    // Inside the Factory's desktop gallery: two narrow side tiles (195x550,
    // Inside the Factory's desktop gallery card (950x550, node 402:911) --
    // now the uniform size every card in that chevron-driven carousel uses
    // (2026-08-26), after the section moved off its original narrow-wide-
    // narrow static row (which had its own "39:110" side-tile ratio,
    // removed here once nothing referenced it any more).
    "19:11": "aspect-[19/11]",
    // Inside the Factory's desktop gallery card, bumped to 1200x640 (owner,
    // 2026-09-08: "increase the size to 1200px width by 640") -- 1200/640
    // reduces to 15/8, its own exact fraction, not a rounding of "19:11".
    "15:8": "aspect-[15/8]",
    // Exhibitions' desktop gallery card, 469x320 (node 455:2381) -- not close
    // to any ratio above, kept as its own exact fraction rather than rounded.
    "469:320": "aspect-[469/320]",
    // ProductCard's tile, 316x400 (node 406:3137) -- reduced to its lowest
    // terms (79:100); close to but not exactly 4:5 (0.8 vs 0.79), kept
    // exact per this table's own established precedent.
    "79:100": "aspect-[79/100]",
    // ProductGallery's main image, 575x612 (Figma node 634:4961, PDP hero
    // gallery, 2026-08-31) -- already its own lowest-terms fraction (no
    // common factor between 575 and 612), kept exact per this table's own
    // established precedent rather than rounded to an existing ratio.
    "575:612": "aspect-[575/612]",
    // /services "How we work with you" path cards, 397x234 (Figma node
    // 750:777, 2026-09-07) -- 397 is prime, so this fraction is already in
    // its lowest terms; kept exact per this table's own established
    // precedent rather than rounded to an existing ratio.
    "397:234": "aspect-[397/234]",
    // /our-factory "What We Make" process gallery (Figma node 857:2090,
    // 2026-09-08): 3 real image sizes confirmed via get_metadata, each kept
    // as its own exact fraction per this table's established precedent.
    // 520x480 (Fabric/Quality Control).
    "520:480": "aspect-[520/480]",
    // 600x640 (Sewing/Printing & Sublimation).
    "600:640": "aspect-[600/640]",
    // 1280x640 (Finishing, full-width) -- exactly 2:1, but kept as the
    // literal Figma pixel pair rather than renamed "2:1", matching this
    // table's own naming convention for every other entry.
    "1280:640": "aspect-[1280/640]",
    // /our-factory "The details you would check on a sample" (Figma node
    // 857:2088, section 6, 2026-09-08): the right image panel, 730x644
    // (get_metadata) -- no common factor between 730 and 644 beyond 2, so
    // this is already close to its lowest terms; kept as the literal Figma
    // pixel pair per this table's established precedent, matching
    // "1280:640" above rather than reducing to a renamed ratio.
    "730:644": "aspect-[730/644]",
    // Trust Signals' desktop cards, redesigned 2026-09-09 (Figma nodes
    // 890:253/890:279): alternating 500x600/500x420 per card, reduced to
    // their exact lowest terms rather than kept as the raw pixel pair --
    // both share the same 500px width, so unlike "730:644" above there's a
    // real common factor (100 and 20) worth simplifying.
    "5:6": "aspect-[5/6]",
    "25:21": "aspect-[25/21]",
  },
  radius: {
    lg: "rounded-lg",
    xl: "rounded-xl",
    // The Hero video is square-cornered at both breakpoints, confirmed by the
    // owner 2026-08-24 -- correcting an unverified assumption of "lg" (the
    // default) made when the section was first built.
    none: "rounded-none",
  },
  imageFill: "object-cover rounded-[inherit]",
  // rounded-[inherit]: the shell carries the real radius class (rounded-lg /
  // rounded-xl); overflow-hidden on the shell clips this layer's fill to that
  // shape either way, but its own border box stays square unless it inherits
  // the same radius too -- without it, the border drawn on this element shows
  // square corners inside a shell that reads as rounded, a visible mismatch.
  placeholder: "absolute inset-0 flex justify-center rounded-[inherit]",
  placeholderCentred: "items-center",
  /** With an overlay on top, the label drops to the bottom so they never collide. */
  placeholderWithOverlay: "items-end pb-4",
  // No border on either tone (owner call, 2026-08-23, sitewide -- corrects an
  // earlier pass that had light placeholders keep one for definition on a
  // white/paper-2 background; this never applies going forward, on any
  // section). Kept as two separate keys, not merged into one, in case the two
  // tones' background/text pairing ever needs to diverge again.
  placeholderLight: "bg-paper-2 text-muted",
  placeholderDark: "bg-ink-2 text-paper/50",
  label: "px-4 text-center text-button-sm uppercase",
  overlay: "absolute inset-0 flex items-center justify-center rounded-[inherit]",
};

/* --- LogoRow ------------------------------------------------------------- */

export const logoRow = {
  root: "flex flex-col items-center gap-8",
  list: "flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-16",
  item: "flex items-center justify-center",
  logo: "h-10 w-auto object-contain",
  /** Client logos rest greyscale and come to colour on hover. */
  greyscale: "opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0",
  placeholder: "flex h-10 min-w-32 items-center justify-center rounded-sm border border-line px-4 text-button-sm uppercase text-muted",
};

/* --- Marquee ------------------------------------------------------------- */
// The animation itself is in app/globals.css (.marquee-track): it needs
// @keyframes, which cannot be expressed as a utility class.

export const marquee = {
  // 40px above the content, 32px below -- the real offerings ticker measures
  // 40px from the section above it (the Hero video) down to the label, and
  // 32px from the item row down to this band's own bottom edge (corrected
  // from 16px, 2026-08-24). Bottom border only: a top one sat flush against
  // the video's own bottom edge with no gap, reading as if it belonged to the
  // video box itself rather than marking this section -- removed 2026-08-23.
  // Sizing/border split from `base` since the client logos ticker needs
  // neither the border nor this exact vertical rhythm -- see the `divider`
  // prop on Marquee.tsx. Padding itself lives in basePadding below, as a
  // mutually exclusive variant, not part of this fixed string.
  base: "marquee w-full overflow-hidden",
  // Mutually exclusive padding variants (Marquee's `padded` prop), not a
  // class appended/cancelled via a negative margin on the caller's side.
  // A negative margin was tried first for the mobile Client Logos marquee
  // (owner call, 2026-08-26, to reclaim this 40/32px of built-in space) and
  // caused a real, visible bug: `toneLight`'s own opaque `bg-paper` moved
  // with the margin-shifted box, so the box's top edge slid 8px above where
  // the flex gap had placed it and visually painted over the title's own
  // descenders (later in DOM paints on top of earlier siblings at the same
  // stacking level) -- not a rendering glitch, an actual box painted where
  // it shouldn't be. `padded={false}` removes the padding at its source
  // instead, so the box's own edges never move relative to its flex
  // position and there's nothing to paint over its neighbour.
  basePaddingDefault: "pt-10 pb-8",
  basePaddingNone: "pt-0 pb-0",
  divider: "border-b",
  // A dedicated tone map, not the shared `surface` tokens: the divider here
  // needs to read clearly between two similarly dark regions (the Hero video
  // above it and this ticker's own ink background), which needs a stronger
  // border than `surface.dark`'s standard 12% hairline (right for things like
  // the header's bottom border, too faint here). Kept separate so that
  // shared token isn't changed for every other dark surface that uses it.
  toneDark: "border-paper/20 bg-ink text-paper",
  toneLight: "border-line bg-paper text-text",
  // Stacked: label on its own row, the scrolling row below it, 32px gap --
  // Figma's real offerings ticker (desktop and mobile both measure this same
  // 32px label-to-items gap). This is the only ticker read from Figma so far,
  // so it is the default; `innerInline` is kept for a ticker that turns out to
  // want the label beside the track instead, once one is confirmed.
  innerStacked: "container-p flex flex-col gap-8",
  innerInline: "container-p flex items-center gap-6",
  label: "shrink-0 whitespace-nowrap",
  // Figma's "Fully Custom Offerings" ticker label is bold and sentence-case,
  // not the uppercase Overline/eyebrow treatment the default label variant
  // uses. font-semibold next to text-body is deliberate emphasis within the
  // Body style (see the note at the top of this file), not a weight override.
  // 22px, 600 semibold -- an explicit one-off, not one of the 13 Figma type
  // tokens (18/20/24 are the nearest, none match). Given directly by the
  // owner 2026-08-24, not re-derived from a box-height estimate.
  // Regular weight (owner call, 2026-08-26), not font-semibold -- this is
  // Hero's desktop "Fully Custom Offerings" label only usage, so changing
  // the weight here doesn't affect any other ticker.
  // `text-[#838D97]` (owner, 2026-09-09: "make fully custom offering text
  // on hero banner the same dark background subline color") -- was
  // colourless (inherited `text-paper`/white from `toneDark`). The sitewide
  // muted-on-dark literal (docs/02-design-system.md's standing rule), same
  // colour Hero's own MOBILE ticker label already used -- this brings
  // desktop in line with it. `labelVariant="bold"` is exclusively this
  // ticker (Hero + ServicesHero, both desktop-only Marquee usages), so no
  // other ticker is affected.
  labelBold: "shrink-0 whitespace-nowrap text-[1.375rem] font-normal leading-[1.2] text-[#838D97]",
  // Client Logos' desktop title (2026-08-26, referencing tedy.app, not
  // Figma) -- a real heading, not a ticker label, so no whitespace-nowrap:
  // it should wrap within its own column like the reference's fixed-width
  // heading does, not force the row wider.
  // A deliberately tight, chosen max-width (200px), not an attempt at
  // "auto-shrink to content" (corrected 2026-08-26, two CSS tricks tried
  // first and both failed): neither `w-fit` nor `display: table` actually
  // shrinks a wrapped block down to its widest *rendered* line once the
  // text no longer fits on one line -- both simply resolve to the full
  // available/max width instead (confirmed live and in isolation: a bare
  // `display:table; max-width:320px` div still measured a full 320px even
  // though its real longest wrapped line was only ~192px). Since the real
  // text ("Trusted by top brands worldwide") still wraps to 2 lines all
  // the way down to a ~200px cap, picking 200px directly gets a genuinely
  // tight box with no CSS trick needed -- this was the "negative white
  // space" the owner flagged.
  labelTitleWrap: "shrink-0",
  // inline-block, not a bare span -- max-width has no effect at all on a
  // plain inline element (caught live: without it, the span ignored the
  // cap entirely and rendered as one unwrapped 356px line).
  labelTitle: "inline-block max-w-[200px] text-h5",
  viewport: "marquee-viewport min-w-0 flex-1 overflow-hidden",
  track: "marquee-track flex w-max items-center",
  // 40px between items, matching the real offerings ticker (measured
  // consistently across every item pair in the Figma frame).
  // pr-10 is a trailing spacer, not decoration: the track holds two of these
  // <ul>s side by side with no gap between them (see Marquee.tsx), so without
  // this, the last item of one pass sits flush against the first item of the
  // next -- no gap at the seam where the loop repeats, unlike every other
  // item pair. Every pass carries the same 40px trailing space, which also
  // keeps the -50% loop math exact: each pass's rendered width becomes
  // content + 40, so the doubled track is a clean multiple of that, and the
  // translate lands precisely on the next repeat instead of 20px into a gap.
  // "Loose" is a second, wider spacing for a different ticker (the client
  // logos row, 72px between logos, confirmed against Figma -- not on our
  // spacing scale, a genuine one-off, not rounded to 64 or 80). Same
  // trailing-spacer requirement as the default: the gap has to be carried on
  // every pass, not just placed between items, or the seam breaks the same
  // way the 40px one did.
  pass: "flex shrink-0 items-center gap-10 pr-10",
  passLoose: "flex shrink-0 items-center gap-[72px] pr-[72px]",
  // Figma's real pattern is icon-then-text, not text-then-icon, applied
  // uniformly to every item including each pass's first (see Marquee.tsx for
  // why). 12px between an item's own icon and its text.
  item: "flex items-center gap-3",
  // Figma's item weight is regular Body (18px, 400), not the bold caption
  // style first guessed -- confirmed against the real ticker screenshot.
  itemText: "whitespace-nowrap text-body",
  // 20px, #F2F2F7 -- the compliance ticker's own confirmed size/colour
  // (2026-08-24), not the offerings ticker's 18px text-body reused smaller.
  // Kept as a second explicit variant rather than changing the shared
  // default, since Hero's ticker really is 18px.
  itemTextLg: "whitespace-nowrap text-[1.25rem] font-normal leading-normal text-[#F2F2F7]",
  separator: "text-current/30",
  // Figma's offerings ticker uses a small sparkle glyph between items instead
  // of a slash. Only confirmed for that one ticker so far -- the compliance
  // ticker (homepage section 10) hasn't been read from Figma yet, so this is
  // a variant, not a replacement, until that section's real design is known.
  separatorSparkle: "size-3.5 shrink-0 text-current/40",
};

/* --- TextReveal ------------------------------------------------------------ */
// Word-by-word entrance animation (app/globals.css's `.reveal-word` +
// `@keyframes reveal-word-in`), referenced from afternow.co/services
// (2026-08-27) -- applied to Hero's H1. No hidden/translated state as a
// static class here: the animation's own 0% keyframe plus
// `animation-fill-mode: both` covers the pre-animation frame, so the word
// still renders normally if CSS animations are ever unavailable.

export const textReveal = {
  // overflow-hidden's auto height comes from the word's own normal layout
  // box -- `transform` never affects layout size, so this mask never
  // grows/shrinks or clips the word's own resting glyphs/descenders (the
  // exact clipping bug already hit and fixed on Client Logos' marquee
  // title -- this shape avoids repeating it).
  mask: "inline-block overflow-hidden align-top",
  word: "reveal-word inline-block",
};

/* --- IntroLoader (homepage entrance, owner request 2026-08-27) ----------- */
// One-time CAPRIO wordmark wipe-reveal, shown once per session on a genuine
// fresh entry to the homepage -- see components/IntroLoader.tsx for the
// full mechanism (clip-path wipe, session + fresh-entry gating, reduced-
// motion, skip-on-interaction). No Figma frame for this; sizes below are a
// deliberate composition, same "flagged, not guessed silently" precedent as
// Client Logos' owner-added title or the desktop mega menu's chevrons.
export const introLoader = {
  // A slight scale (1 -> 1.03) was tried here to give the fade a direction
  // to follow instead of a flat opacity cut, but a scaled `fixed` element's
  // visual bounds get counted into the document's scrollWidth in some
  // engines -- caused a real 16px horizontal-overflow regression at desktop
  // widths (caught by tests/screenshots.spec.ts). Opacity alone, slowed down
  // and re-eased, gets most of the same softness with none of that risk.
  overlay:
    "fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
  overlayVisible: "opacity-100",
  // pointer-events-none while fading: without it, the overlay (still
  // technically on top for the fade's duration) would keep intercepting the
  // first click/tap a real visitor makes on the page underneath.
  overlayHidden: "pointer-events-none opacity-0",
  // ease matches an "ease-out-expo" curve: fast start, long soft settle --
  // reads noticeably calmer than the plain `ease-out` this replaced, which
  // finished the wipe abruptly.
  wordmarkClip: "transition-[clip-path] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
  wordmarkClipHidden: "[clip-path:inset(0_100%_0_0)]",
  wordmarkClipVisible: "[clip-path:inset(0_0_0_0)]",
  // h-10/h-14, not the header's h-6 -- a real splash moment reads bigger,
  // capped so it never feels oversized on a small phone screen.
  wordmark: "h-10 w-auto text-paper md:h-14",
};

/* --- Accordion ----------------------------------------------------------- */

export const accordion = {
  root: "flex flex-col",
  // Corrected on first real use (FAQ section, 2026-08-26, Figma node
  // 438:2150 desktop / 438:2192 mobile). Padding wraps the whole item
  // (question row + answer), not just the trigger, so open/close never
  // shifts the border position. Same #2A2E33 border colour on both
  // breakpoints (owner correction, 2026-08-26 -- shipped with two distinct
  // guessed colours per breakpoint, neither of which was this confirmed
  // value). Border below every item, including the last (Figma shows a
  // trailing rule); none above the first.
  // No gap here (was gap-4/xl:gap-6, moved to `answer`'s own margin-top --
  // owner report, 2026-08-30, reproduced on both the homepage and the PLP:
  // "it looks uneven there too, from the top it looks lesser than the
  // bottom of the question. When the question is expanded then it looks
  // fine"). Root cause: the panel stays mounted at zero height when
  // collapsed (`grid-rows-[0fr]`, see `panel` below), but a flex `gap`
  // between the trigger and that always-present panel div still reserved
  // its full 24px even at zero height -- collapsed items measured 32px
  // above the question (padding-top only) but 57px below it (padding-
  // bottom + the flex gap the invisible panel still claimed). Moving that
  // spacing onto `answer`'s own margin-top instead means it lives INSIDE
  // the `panelInner` `overflow-hidden` wrapper -- at zero height it's
  // genuinely clipped to nothing, and at full height it renders exactly
  // as before, so open items are unaffected (confirmed: this is the state
  // that already looked fine).
  item: "flex flex-col border-b border-[#2A2E33] py-6 max-xl:px-5 xl:px-0 xl:py-8",
  // Hover colour is the same muted `#838d97` used on the mobile answer text,
  // not the brand accent orange (owner correction, 2026-08-26) -- a hover
  // state on a disclosure trigger reads as "muted, not a link/CTA."
  trigger: "flex w-full items-center justify-between gap-4 text-left transition-colors hover:text-[#838D97]",
  // 22px on mobile, 30px on desktop -- neither is the guessed 24px this text
  // never actually was, so the sitewide mobile-title 24-to-30px bump doesn't
  // apply here. Regular weight (400, owner correction 2026-08-26 -- shipped
  // as font-medium/500, matching Figma's export literally, but the owner
  // wants it visually lighter than that). `flex-1` so the text uses the full
  // width left by the icon before wrapping (owner correction, 2026-08-26 --
  // without it the span shrinks to its own preferred width, wrapping a line
  // early instead of filling the row, most visible on mobile's narrower
  // column).
  // `text-wrap` (plain "wrap") cancels the sitewide `h1,h2,h3 { text-wrap:
  // balance }` rule this inherits from its parent `<h3>` -- balance evens
  // out line lengths, which is right for a heading but wrong here: several
  // real questions ("How long do samples & bulk production take?") were
  // wrapping a full word early even with ~68px of unused width on line 1,
  // because balance chose the split that minimizes the *difference*
  // between line lengths, not the one that fits the most per line (owner
  // report, 2026-08-27). Plain wrap restores normal greedy fill.
  question: "flex-1 text-wrap text-[1.375rem] font-normal leading-normal xl:text-[1.875rem]",
  icon: "size-5 shrink-0 text-current",
  // Real plus/minus glyphs (Figma), not a rotated plus -- see Accordion.tsx.
  // Same muted `#838d97` on both breakpoints (owner correction, 2026-08-26 --
  // shipped with full white on desktop, matching Figma's own literal export,
  // but the owner wants the mobile tone used everywhere).
  // mt-4/xl:mt-6 (was `item`'s own flex gap-4/xl:gap-6, moved here 2026-08-30
  // -- see `item`'s own comment for the collapsed-state bug this fixes).
  // Lives inside `panelInner`'s `overflow-hidden`, so it's genuinely clipped
  // to zero when the panel is collapsed, not just visually hidden.
  answer: "mt-4 max-w-[70ch] text-[1.125rem] leading-6 text-[#838d97] xl:mt-6 xl:text-body-lg xl:leading-7",
  // Grid-rows open/close animation (owner correction, 2026-08-26 -- the
  // `hidden`-attribute toggle it shipped with was an instant snap, not a
  // transition). `grid-template-rows` animates between 0fr/1fr; the inner
  // `overflow-hidden` wrapper clips the row during the transition. Panel
  // stays mounted either way (never `display:none`), so this doesn't
  // reintroduce the find-on-page problem `hidden` was chosen to avoid --
  // `aria-hidden` on the panel is what keeps screen readers out while closed.
  panel: "grid transition-[grid-template-rows] duration-300 ease-in-out",
  panelOpen: "grid-rows-[1fr]",
  panelClosed: "grid-rows-[0fr]",
  panelInner: "overflow-hidden",
};

/* --- FAQ (homepage section 13) -------------------------------------------- */

export const faq = {
  // Figma node 438:2150. bg-ink lives on its own unconstrained outer wrapper,
  // container-p only on the inner flex row -- the same split already used by
  // every other full-bleed dark section (Hero, Stats, Inside the Factory),
  // corrected here 2026-08-26 after shipping with container-p and bg-ink on
  // the same element, which caps the fill at container-p's own 1440px
  // max-width instead of true edge-to-edge at 1920px+.
  // Threshold moved xl: -> md: (owner, 2026-09-04: apply the same
  // tablet-width treatment used on the homepage to PLP/PDP -- Faq is
  // shared by all three, so this fixes the homepage's own Faq section too,
  // which hadn't been touched in the earlier homepage-only pass).
  desktopOuter: "hidden bg-ink text-paper md:block",
  // `md:gap-10` (40px, `xl:gap-[124px]` restores the original confirmed
  // desktop value) frees up room for the accordion at tablet width.
  desktopInner: "container-p flex items-start gap-10 pt-[120px] pb-[120px] xl:gap-[124px]",
  // Owner, 2026-09-06, after two rounds of "still in 3 lines": a fixed px
  // cap per breakpoint (320px at md:, 474px at xl:, 500px at 1920+) can't
  // keep this 2-line forced break (see Faq.tsx's renderHeadingWithB2BBreak)
  // correct across the whole range, because text-h1's font-size is a
  // continuous fluid clamp, not a stepped one -- e.g. at 1279px (top of
  // `md:`, just before `xl:` kicks in) the font is already ~50px, needing
  // ~440px to stay at 2 lines, not the 320-360px that worked lower in the
  // `md:` range. A single `em`-based max-width fixes every viewport at
  // once instead of chasing more breakpoints: live-measured, the minimum
  // width needed for "Top questions from" to hold one line is a near-
  // constant ~8.73-8.75x the heading's own font-size at every width
  // checked (342px/39.07px at 768, 440px/50.42px at 1279, 472px/54px at
  // 1440, 564px/64.67px at 1920) -- expected, since it's the same string
  // and width scales with font-size. `em` units are relative to the
  // element's own font-size, so `8.85em` (a small buffer above the
  // measured ratio) tracks text-h1's clamp automatically at any width,
  // replacing all three previous fixed-px breakpoint values.
  desktopHeading: "max-w-[8.85em] shrink-0 text-h1",
  desktopAccordion: "flex-1",
  // Figma node 438:2192: this frame's own top/bottom padding really is
  // 72/72 (unlike the general pt-0/pb-72 pattern elsewhere on the page).
  // items-start/left-aligned heading (owner, 2026-09-04: mobile FAQ title
  // doesn't match Figma -- the frame is left-aligned, not centred). This
  // was the one outlier: every other mobile section heading on the site
  // (SectionHeading's own `max-md:` styles, e.g. line ~148) is already
  // left-aligned by default; Faq had its own one-off `items-center` +
  // `text-center` instead of following that shared convention. No
  // `container-p` here -- `mobileAccordion` spans the section edge to edge
  // on purpose (each `accordion.item`'s own `max-xl:px-5` gives every
  // question row its 20px inset), so `container-p` on the section would
  // double that up. The heading gets that same 20px directly instead.
  mobileSection: "flex flex-col items-start gap-8 bg-ink pt-[72px] pb-[72px] text-paper md:hidden",
  mobileHeading: "px-5 text-[1.875rem] font-[460] leading-[34px]",
  mobileAccordion: "w-full",
};

/* --- Header -------------------------------------------------------------- */

export const header = {
  // Adaptive frosted OVERLAY header (owner reference, 2026-09-07: labs.google's
  // own nav) -- was a flat opaque `bg-ink`; now transparent (the 5
  // `blurLayer` spans below supply the frosted background) with
  // `text-[var(--header-fg)]` reading off the CSS custom property
  // `app/globals.css` sets on `header`/`header[data-tone="light"]`, driven
  // by Header.tsx's own scroll-position tone detection (`data-tone`
  // attribute). `color` added to the transition list alongside the
  // pre-existing `transform` (the hide/show toggle below), so a tone flip
  // animates too, not just hide/reveal. No bottom border any more (owner,
  // 2026-09-07: "remove the line under the nav") -- a frosted overlay nav
  // reads as floating over the content rather than a bar sitting flush
  // above it, so a hard divider line no longer fits the look; the blur
  // itself is what separates it from the content now.
  //
  // `fixed`, not `sticky` (owner correction, 2026-09-07: "we need that at
  // rest position... exactly the same [as the reference]") -- `sticky`
  // still reserves its own box in normal document flow at rest (scroll 0),
  // so `<main>` started right after it, never actually behind/under it;
  // there was nothing for the blur to blur until the user had already
  // scrolled. `fixed` removes the header from flow entirely, so real page
  // content now starts at true y=0 underneath it from the very first
  // frame, matching the reference (confirmed live via its own
  // `position: absolute` on inspection). `inset-x-0` is required here in a
  // way it wasn't for `sticky`: a fixed block element with no `left`/
  // `right` set shrink-wraps to its own content's width instead of
  // stretching to the viewport. Removing the header from flow means every
  // page's own first section needs compensating top clearance -- see
  // `hero.bannerInner`/`servicesHero.bannerInner`'s own comments (true
  // overlay, background extends to y=0) and the `pt-[72px] xl:pt-[87px]`
  // added to `<main>` on the PLP/PDP pages (simpler compensation, that
  // first section's own internal layout stays untouched here since
  // CategoryBanner in particular has a documented history of fragile
  // fixed-height/absolute-position math -- see that component's own
  // header comment).
  base: "fixed inset-x-0 top-0 z-40 bg-transparent text-[var(--header-fg)] transition-[color,transform] duration-300 ease-in-out",
  // Plain, non-sticky variant (owner trial, 2026-08-29: "let's try one time
  // gymshark approach and see how it looks") -- gymshark.com's own header is
  // `position: static`, scrolling away with the page entirely, which is why
  // their sticky filter panel locks flush at the bare viewport top instead
  // of docking below a persistent nav. Same colours/border as `base`, just
  // no positioning or hide/reveal transform -- selected via Header's own
  // `sticky` prop.
  //
  // `relative z-40` (real bug, found live 2026-08-30, owner: "fix the nav" --
  // this turned out not to be CategoryBanner at all): a plain `position:
  // static` element paints in an EARLIER stacking bucket than any positioned
  // one, regardless of z-index -- so this header was painting BEHIND
  // Footer's own `sticky bottom-0 z-0` reveal trick (Footer.tsx), which
  // computes as pinned near the viewport top at scroll position 0 on every
  // page (confirmed live: getBoundingClientRect shows Footer at
  // top:0 on both this page and the homepage). The homepage's own header
  // (`base`, `sticky z-40`) was never affected, since a positive z-index
  // positioned element always paints after Footer's z-0 one -- only this
  // page's plain-`static` variant was exposed. `relative` (not `sticky`)
  // keeps this variant's own layout/scroll-away behaviour completely
  // unchanged -- it only opts the element into normal stacking-context
  // ordering so its own `z-40` (matching `base`'s own value, for the exact
  // same reason) can do its job.
  baseStatic:
    "relative z-40 bg-transparent text-[var(--header-fg)] transition-colors duration-300 ease-in-out",
  // The 5 progressive-blur spans (`.header-blur-1`..`-5`, app/globals.css)
  // rendered as this header's first children (owner reference, 2026-09-07:
  // labs.google's own nav). `-z-10`, not the default `z-index: auto` a bare
  // `absolute` span would get -- these are `position: absolute` with no
  // z-index of their own, which paints ON TOP of the header's plain
  // in-flow nav content (logo, links, buttons), burying it; `-z-10` fixes
  // that without touching `header.inner`'s own stacking or `megaPanel`'s
  // `z-30` (`-z-10 < auto (nav content) < 30 (megaPanel) < 40 (header)` is
  // already the correct order). `inset-0`, no explicit height -- sizes to
  // the header's own real box at any breakpoint, not the reference's
  // hardcoded 104px (see the `.header-blur-*` comment in app/globals.css).
  blurLayer: "pointer-events-none absolute inset-0 -z-10",
  // Mobile-only vertical padding tuned to a 72px total header height
  // (owner call, 2026-08-27, revised up from an earlier 62px) -- the new
  // "Menu" pill (51px tall, its own padding taken verbatim from Figma) is
  // taller than the old icon-only button (44px), so the previously-correct
  // py-4 (32px) started overshooting once the pill replaced it. Desktop
  // keeps py-4: only the mobile trigger changed, so only mobile's total
  // height needed correcting. 72 - 51 (pill) - 1 (border-b) = 20, 10px a
  // side (py-2.5).
  // `xl:grid xl:grid-cols-[auto_1fr_auto]` (owner, 2026-09-06: "in the
  // middle of the page from logo to download catalog") -- three real grid
  // columns (logo / nav / actions) instead of the earlier two-item
  // `justify-between` (brand+nav grouped vs. actions), because centering the
  // nav needs a column of its own to center *within*: with only two flex
  // siblings, any space `justify-between` frees goes between those two
  // items, never inside one of them. The middle `1fr` column absorbs all the
  // row's leftover width and `header.nav`'s own `xl:justify-center` centers
  // the link list inside it, landing it at the true midpoint between the
  // logo and the actions column regardless of viewport width. Below `xl:`,
  // `flex justify-between` is unchanged (mobile only ever shows brand +
  // the "Menu" trigger).
  // max-xl:py-2 / xl:py-3 (owner, 2026-09-08: "make the nav bar height
  // lesser, make it compact" -- was py-2.5/py-4). Desktop's own real
  // measured height also drops because of the CTA height reduction below
  // (`actionButton`'s own `!min-h-11`, was the tallest child at 54px) --
  // see the header-height literal constants this change also updates:
  // `hero.bannerInner`/`servicesHero.bannerInner`/`servicesHero.section`,
  // `categoryBanner.section`/`.breadcrumbWrap`/`.contentWrap` (recomputed
  // against the new, live-measured heights, not by hand).
  inner: "container-p flex items-center justify-between gap-4 max-xl:py-2 xl:grid xl:grid-cols-[auto_1fr_auto] xl:items-center xl:py-3",
  // Restored (build fix, 2026-09-08): dropped from this object during the
  // `inner` grid refactor above (2026-09-06) because Header.tsx itself no
  // longer needs it -- that component now renders `brand` and `nav` as two
  // separate direct children of `inner`, one per grid column, so grouping
  // them was no longer this file's job. Nobody updated the one other real
  // consumer, `components/HeaderOverlayNav.tsx` (a separate, still-rendered
  // exploratory header, see its own header comment -- shown on
  // app/styleguide/page.tsx, not swapped into the live site), which still
  // wraps its own `brand` + `nav` pair in a single `brandNavGroup` div
  // (its own layout hugs the logo against the nav in one row, unlike
  // Header.tsx's current centered-nav column, so it still genuinely needs
  // a grouping wrapper, not a share of `inner`'s 3 grid columns) -- left
  // that file with a dangling reference to a key that no longer existed,
  // breaking `npx tsc --noEmit`/`next build`. No prior value for this
  // exact key survives in git history or docs to restore verbatim (see
  // docs/05-plan.md's own entries flagging this break as pre-existing and
  // out of scope, twice, without recording one) -- `flex items-center
  // gap-8` is a plain, conservative flex grouping consistent with this
  // recipe's own other inline groupings (e.g. `brand`'s own `gap-0.5`,
  // `inner`'s own `gap-4`), not a rediscovered original.
  brandNavGroup: "flex items-center gap-8",
  brand: "flex shrink-0 flex-col gap-0.5",
  // h-5, w-auto: fixed height, width follows the SVG's own viewBox ratio
  // (217.2x22.76, the CAPRIO + WEAR combined mark -- Figma node 680:394,
  // 2026-09-02, replacing the earlier CAPRIO-only 137x26 mark). The new
  // mark is much wider per unit height (~9.5:1 vs ~5.3:1, since it carries
  // the "WEAR" word too) -- kept at the old `h-6` (24px) it pushed the
  // header's own fixed-width row past its available space at both ends of
  // the responsive range (found live via the Playwright overflow gate,
  // 2026-09-02): the mobile "Menu" toggle clipped off-screen at 375px, and
  // the desktop action buttons clipped off-screen at exactly `xl`'s own
  // 1280px floor. `h-5` (20px) is the smallest step down Tailwind's
  // spacing scale that clears both measured overflows with real margin,
  // confirmed live (no more overflow at 360/375/1280 or any wider
  // viewport) rather than computed from the ratio alone. Colour comes from
  // the ambient text-paper on the header, which the SVG's
  // fill="currentColor" picks up -- no separate colour prop on Logo itself.
  // `xl:hidden` added 2026-09-06: this mark now renders only below `xl:`
  // (drawer/mobile bar) -- see `brandLogoDesktop` below for the desktop
  // replacement. `h-[28px]` and the caller's own `<Logo stacked />` (not
  // just this recipe) are a later same-day extension -- see Logo.tsx's own
  // file header for the full history; every real page now passes `stacked`
  // here too, so this mobile/drawer mark is NOT pixel-identical to the
  // original 2026-09-02 mark any more, by deliberate owner request.
  //
  // Enlarged 28px -> 31px (owner, 2026-09-07, Figma node 587:6968:
  // "Inlarged the mobile header logo, update it on both tablet and
  // mobile") -- `get_metadata` on that node's own "Logo" frame measured
  // 114.99..x30.99.., i.e. Figma's real height is 31px (rounded), not a
  // guessed bump. Covers both mobile and tablet in one change: this key
  // already renders everywhere below `xl` (mobile bar and the drawer), no
  // separate tablet variant exists or is needed. At 31px tall the mark
  // renders ~115px wide (same ~3.7:1 stacked-mark ratio as `h-[28px]`
  // did), still comfortably inside the header row's own available width
  // before the "Menu" trigger (confirmed against this same frame's own
  // Menu icon offset, x=195 of a 320px content width) -- no repeat of the
  // overflow this mark's own sizing history (see above) already guards
  // against.
  brandLogo: "h-[31px] w-auto xl:hidden",
  // Real Figma geometry (`<Logo stacked />`, node 680:394) rendered at its
  // own native size -- `h-[37px]` is the mark's real Figma height, not a
  // fitted-to-fit-overflow value like `brandLogo`'s own sizing: at 37px
  // tall the mark renders ~137px wide (its real aspect ratio, WEAR stacked
  // below CAPRIO), narrower than `brandLogo`'s own ~190px-wide rendered
  // width at 20px tall, so it fits the same row with room to spare. 37px
  // is also shorter than the desktop nav's own 48px-tall trigger pills, so
  // the header's row height (set by its tallest child) is unaffected -- no
  // overflow, no layout shift. Owner, 2026-09-06: "update the caprio logo
  // in the nav bar, not in the footer. Only for desktop" -- originally
  // scoped to `xl:block` only, with the mobile/drawer mark meant to stay
  // on the old geometry; the owner later confirmed extending `stacked` to
  // the mobile mark too was intentional (see `brandLogo` above), so this
  // recipe's own desktop-only scoping is now just about SIZE (37px native
  // vs. `brandLogo`'s fitted 28px), not about which geometry renders.
  // (Footer's own `footer.desktopBrandLogo` separately also passes
  // `stacked`, per a later owner request -- Figma node 587:5755 -- so it
  // automatically picked up this same corrected geometry too; its own
  // fixed `h-[55px]` sizing is untouched. Footer's mobile mark is the one
  // remaining default-geometry usage on the site.)
  // Re-measured 2026-09-06 (owner: "updated the desktop nav logo, update
  // it again") -- Figma's own node had shrunk slightly since the first
  // pull (38px -> 37px); height corrected to match.
  brandLogoDesktop: "hidden h-[37px] w-auto xl:block",
  // Text fallback, for a page with no logo asset passed. Not used by the real
  // header content, which always passes `logo`.
  brandName: "text-h3 uppercase",
  // text-current, not text-paper (2026-09-07, adaptive header) -- inherits
  // the header's own tone-driven colour instead of a hardcoded white.
  brandParent: "text-button-sm uppercase text-current/50",
  // The real nav's intrinsic width (logo + 4 plain links + actions, no mega
  // menu) is ~1117px, which fits inside the standard xl (1280px) breakpoint
  // with room to spare -- see docs/03-component-library.md for the measured
  // numbers. This is the built-in Tailwind breakpoint, not a custom value.
  // `xl:flex xl:justify-center` (paired with `inner`'s own `1fr` middle
  // column, above) -- centers the link list inside that column, rather than
  // hugging the logo the way `xl:block` (no width of its own beyond its
  // content) used to when it was grouped with the logo in `brandNavGroup`.
  nav: "hidden xl:flex xl:justify-center",
  navList: "flex items-center gap-0",
  // Figma's real nav links (node 316:1331): Body style, not bold, not
  // uppercase -- confirmed against the link geometry (48px row, 16px inline
  // padding, 22px line height matches Body's line height exactly).
  // Hover colour corrected 2026-08-27 (owner call): a flat #838d97 text
  // colour, not an opacity fade -- the same literal grey already used
  // elsewhere on dark surfaces (mega panel labels, MobileNav's contact
  // label), so hovering a nav item reads as "the same muted tone", not a
  // dimmed version of white.
  // Back to 18px (owner, 2026-09-06: "make them 18px not 16") -- reverses
  // the 2026-09-02 16px override above. `text-body` is the sitewide token
  // for exactly this size/line-height (1.125rem/1.2222), so this now reuses
  // it directly instead of carrying its own arbitrary-value override.
  // `group` (not a bare hoverable label span) -- the pill's own padding
  // (`px-4`, min-h-11) is wider than the label text it wraps, so the
  // bold-on-hover below has to key off this whole element's `:hover`, not
  // the inner label's own tighter box, or moving the pointer into the
  // pill's padding (not directly over a glyph) wouldn't trigger it. See
  // `navLinkLabelVisible` below for why the weight toggle itself lives on
  // the label's inner visible layer, not here.
  // text-current + hover:text-[var(--header-hover)], not the old hardcoded
  // text-paper/#838d97 (2026-09-07, adaptive header) -- inherits the
  // header's own tone-driven colours. `--header-hover` itself swaps
  // between #838d97 (this codebase's documented dark-surface muted grey)
  // and `--color-muted` (the light-surface equivalent) in app/globals.css
  // -- the old flat #838d97 measured only ~2.9:1 against a light/paper
  // surface, a real contrast regression this avoids.
  // text-[1.0625rem] leading-[21px], not text-body (owner, 2026-09-08:
  // "make the activewear font sizes 17px" -- was 18px/text-body). Explicit
  // line-height, not just the size alone: text-body bundles its own
  // 1.2222 line-height ratio via its @theme compound token, which an
  // arbitrary-value size override doesn't carry over automatically (same
  // "re-set whatever a compound token bundles, not just the size" rule
  // already applied elsewhere in this codebase, e.g. Overline/Hero's own
  // eyebrow) -- 21px keeps the same ~1.222 ratio at the new size. Weight
  // needs no explicit re-set: text-body's own bundled weight is 400, the
  // browser default already in effect regardless.
  navLink:
    "group relative inline-flex min-h-11 items-center whitespace-nowrap rounded-pill px-4 text-[1.0625rem] leading-[21px] text-current transition-colors hover:text-[var(--header-hover)]",
  navTrigger:
    "relative inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-pill px-4 text-[1.0625rem] leading-[21px] text-current transition-colors hover:text-[var(--header-hover)]",
  // Selected-page state, tone-dependent (owner, 2026-09-10: "when selected
  // it is orange but it does not look very visible on the white
  // background" -- the header is a fixed overlay that reads over both
  // dark (`ink`) and light (`paper`) sections as the page scrolls
  // underneath it, via the same `data-tone` mechanism `--header-fg`
  // already uses; this reuses that, rather than a separate mechanism).
  // Over dark sections the plain accent orange (`navTriggerActiveDark`)
  // reads clearly, as before. Over light sections that same orange sits
  // too close to white to read as clearly "selected" -- swapped for the
  // near-black `--color-text` (already this state's own base colour via
  // `--header-fg` on `[data-tone="light"]`) plus semibold, so weight
  // alone carries the signal there instead of a low-contrast colour.
  // Header.tsx picks between the two using its own live `tone` state
  // (the same value driving `data-tone`), not a second scroll listener.
  navTriggerActiveDark: "text-accent",
  navTriggerActiveLight: "text-text font-semibold",
  // The label itself is a 2-layer grid stack, not plain text (owner report,
  // 2026-08-27: the trigger visibly shifted position when it turned
  // semibold -- bold glyphs are wider than regular ones at the same size,
  // so the button's own intrinsic width grew and pushed every trigger after
  // it sideways). Both layers occupy the same grid cell; the invisible one
  // is always semibold, so the cell is always sized to the widest (bold)
  // version of the label -- only the *visible* layer's weight actually
  // toggles with `isRouteActive`, and toggling a weight inside an already-fixed-
  // width cell never reflows anything around it.
  navTriggerLabelStack: "relative isolate inline-grid",
  navTriggerLabelGhost: "invisible col-start-1 row-start-1 font-semibold",
  navTriggerLabelVisible: "col-start-1 row-start-1",
  // Plain nav links (Services, Factory Tour): same 2-layer grid-stack
  // technique as the trigger's own label (see above) so the route-active
  // bold (`navTriggerActiveDark`/`navTriggerActiveLight`, applied via
  // `isRouteActive` in Header.tsx)
  // never shifts whatever nav item sits after it -- the ghost always
  // reserves the widest (bold) width regardless of whether the visible
  // layer is currently bold. No `group-hover:font-semibold` any more
  // (owner, 2026-09-08: "on hover the text should only change the color
  // not the font weight" -- was added 2026-09-07 to match Teamwear's own
  // hover treatment, reversed the next day): hovering now only changes
  // colour, via `navLink`'s own plain CSS `hover:text-[var(--header-hover)]`,
  // same as every other nav item.
  navLinkLabelStack: "relative isolate inline-grid",
  navLinkLabelGhost: "invisible col-start-1 row-start-1 font-semibold",
  navLinkLabelVisible: "col-start-1 row-start-1",
  // Chevron, added 2026-08-27 (owner call) for every mega-menu trigger
  // (Activewear, Teamwear & Uniforms) -- not in the Figma frame itself, but
  // requested as a standard "this opens something" affordance. Rotates to
  // point up while open, same `ChevronDown` + `rotate-180` pattern already
  // used elsewhere on this site (e.g. the old MobileNav sub-menu chevron).
  // size-3.5, not size-4 (corrected 2026-08-27): a full size-4 on both
  // mega-menu triggers pushed the real nav's own intrinsic width just past
  // 1280px, the narrowest required desktop viewport -- caught by the
  // Playwright overflow check (`scrollWidth 1283 > clientWidth 1280`), not
  // a purely visual call.
  navTriggerChevron: "size-3.5 shrink-0 transition-transform",
  navTriggerChevronOpen: "rotate-180",
  // Corrected on first real use (Figma node 493:3140, 2026-08-27) -- the
  // guessed `w-80 rounded-lg` dropdown card predates any real design and is
  // replaced entirely by a full-bleed panel matching the real one: 5
  // category columns plus a shared promo strip, not a flat link list with
  // an "All <section>" lead link (no such thing in the real design).
  // `top-full` continues to resolve against `header.base`'s own `sticky`
  // positioning context, now via the new wrapping div in Header.tsx rather
  // than a per-trigger `<li>` -- required for a true full-width panel, since
  // an element positioned relative to one `<li>` can never paint past that
  // `<li>`'s own inline position. `border-b`, not just `border-t`, closes
  // the panel off from whatever page content sits beneath it once open
  // (owner request, 2026-08-27: "a line where the menu ends") -- same
  // `border-line-dark` hairline as the header's own bottom border, so both
  // read as one consistent divider colour, not two different greys.
  //
  // Opens/closes with a smooth clip-path sweep (owner reference,
  // 2026-08-27: reference/Mega Menu.mov, watched frame by frame like
  // reference/Nav.mov before it) rather than an instant show/hide --
  // top-anchored, growing downward (`inset(0 0 100% 0)` closed ->
  // `inset(0 0 0 0)` open), the mirror of the mobile drawer's own
  // bottom-anchored sweep, since this panel drops *from* the header rather
  // than filling the whole screen. `overflow-hidden` isn't needed here the
  // way it is on `nav`'s own clip: `clip-path` never paints outside its own
  // element regardless.
  // duration-300, not 500 (owner report, 2026-08-27: the text itself never
  // visibly animated) -- the panel's own clip-path was masking the item
  // fade below it: both ran the same 500ms, so by the time the clip
  // advanced past a row and let it paint at all, that row's own opacity had
  // already climbed most of the way to 1 in parallel, reading as an
  // instant appearance. Making the panel reveal itself quick and letting
  // the *items* (see `megaGroupReveal` below) run their own longer, staggered
  // fade means the text is still visibly animating well after the panel
  // has fully opened, not hidden behind it.
  // An "Apple-type glass" (translucent + blurred) background was explored
  // here 2026-08-27 and rejected on sight (owner: "overall i don't like
  // it") -- back to a plain opaque `bg-ink`, the real Figma design (node
  // 493:3140), no variant prop on `Header` anymore.
  megaPanel:
    "absolute inset-x-0 top-full z-30 border-t border-line-dark bg-ink text-paper transition-[clip-path] duration-300 ease-in-out",
  megaPanelOpen: "[clip-path:inset(0_0_0_0)]",
  megaPanelClosed: "[clip-path:inset(0_0_100%_0)]",
  // `pb-10` (40px, owner request 2026-09-07: "finish the mega menu 40px
  // from the bottom of the content") -- the promo block that used to sit
  // below the category columns (and its own divider line, "a line where
  // the menu ends") was removed the same day, so `megaGroups` is now the
  // last thing in the panel and this padding is the real gap to its edge.
  megaPanelInner: "container-p flex flex-col pt-12 pb-10",
  // 56px between columns (Figma's own confirmed gap).
  megaGroups: "flex gap-14",
  // Per-column fade + slight rise, staggered (owner reference, 2026-08-27:
  // reference/Mega Menu.mov shows the text itself transitioning in, not
  // just the panel). Each column gets its own `transitionDelay` (set inline
  // in Header.tsx, `index * 60ms`) so columns visibly cascade left to right
  // rather than all changing in lockstep -- a flat single fade on the whole
  // block reads as "nothing happening" the moment it's this quick, since
  // there's no visible stagger to track.
  megaGroupReveal: "transition-[opacity,transform] duration-500 ease-out",
  megaGroupRevealOpen: "translate-y-0 opacity-100",
  megaGroupRevealClosed: "translate-y-2 opacity-0",
  // `min-w-[206px]`, not a fixed `w-[206px]` (owner report, 2026-08-27):
  // Teamwear & Uniforms' own real content -- not in the frame that first
  // confirmed 206px for Activewear -- includes "Rash Guards & Fight Wear",
  // which measures ~232px and was wrapping to 2 lines at a fixed 206.
  // `min-w` keeps 206px as the floor (Activewear's own 5 columns still fit
  // the panel's real width at that size) while letting a column with a
  // genuinely longer item grow to fit it on one line -- a fixed wider value
  // for every column would have overflowed Activewear's 5-column row
  // instead (5 × 240px + 4 × 56px gap = 1424px, wider than the 1280px
  // content area at 1440 viewport).
  megaGroup: "flex min-w-[206px] shrink-0 flex-col gap-4",
  // #838d97, not the generic `text-muted` token (#6b6b74) -- that token is
  // tuned for light sections; this panel is dark, and the project's own
  // established dark-surface muted colour (already used verbatim by
  // MobileNav's contact label and Accordion's mobile answer text) is this
  // literal Figma value, not a lighter one meant for a different surface.
  megaGroupLabel: "text-button-sm font-medium uppercase text-[#838d97]",
  megaGroupList: "flex flex-col",
  // whitespace-nowrap (added alongside the 240px column width above): a
  // wrapped 2-line item breaks the shared `h-11` row rhythm every other
  // item relies on for even vertical spacing between rows.
  megaItem: "flex h-11 items-center whitespace-nowrap text-body-lg text-paper transition-colors hover:text-[#838d97]",
  // gap-6 -> gap-5 (owner call, 2026-08-28): "Our Factory" -> "Factory
  // Tour" made the nav's longest label one character wider, which pushed
  // this row 4px past the header's own tight 1280px budget (a real
  // overflow, caught live -- same class of bug as the earlier mega-menu
  // chevron overflow, fixed the same way: shave a few px from a low-impact
  // value rather than touch a Figma-confirmed one like navLink's padding).
  actions: "hidden shrink-0 items-center gap-5 xl:flex",
  // Colour fade, not opacity (owner correction, 2026-09-07: "download
  // catalog hover color should be the same as others") -- matches
  // `navLink`/`navTrigger`'s own hover treatment (`hover:text-[#838d97]`)
  // instead of the generic opacity-70 fade every other `hover:opacity-70`
  // link on this site uses, so the whole nav row reads as one consistent
  // hover language.
  // text-current + hover:text-[var(--header-hover)] (2026-09-07, adaptive
  // header) -- same tone-driven swap as navLink/navTrigger above, so this
  // stays consistent with them on every surface, not just the dark one.
  // text-[0.9375rem] leading-[22px] font-bold, not text-button-sm (owner,
  // 2026-09-08: "cta font size, download catalog and request a sample to
  // 15px" -- was 16px/text-button-sm). Explicit weight this time (unlike
  // navLink's own 17px change above): text-button-sm's bundled weight is
  // 700 (bold), not the browser default, so dropping the compound token
  // for an arbitrary size needs `font-bold` re-added explicitly or the
  // label would silently render regular-weight -- same "re-set whatever
  // the token bundles" rule, this time it actually bites if skipped.
  // 22px line-height keeps text-button-sm's own 1.5 ratio at the new size.
  actionLink:
    "inline-flex min-h-11 items-center whitespace-nowrap text-[0.9375rem] leading-[22px] font-bold uppercase text-current transition-colors hover:text-[var(--header-hover)]",
  // `!px-6` (real bug, found live, 2026-09-02): without `!`, this lost to
  // Button's own base `px-8` in Tailwind's generated stylesheet order (same
  // same-specificity-utility-conflict class of bug already hit and fixed
  // this way on the gallery's active-thumbnail border and the PDP mobile
  // CTA bar's own button height/font-size overrides) -- computed padding
  // stayed 32px instead of the intended 24px even though `text-button-sm`'s
  // own font-size override (no conflicting property) took effect fine.
  // `!min-h-11` (44px, owner, 2026-09-08: "you can make the cta height
  // less" -- was Button's own shared `min-h-[54px]`) -- `!` for the same
  // same-specificity-conflict reason `!px-6` already needed it; scoped to
  // just this header usage via `className`, not a change to `button.base`
  // itself (every OTHER Button instance sitewide keeps its real 54px).
  // Same `text-[0.9375rem] leading-[22px] font-bold` treatment as
  // `actionLink` above, for the same reason and the same 15px request.
  actionButton: "whitespace-nowrap !px-6 !min-h-11 text-[0.9375rem] leading-[22px] font-bold",
  // Mobile drawer trigger, corrected to Figma's real pill button (node
  // 465:2862/465:2871, "Caprio Website" file, 2026-08-27) -- previously a
  // plain circular icon button (guessed, pre-real-design). border-current so
  // it always matches the header's own ambient colour -- text-current now
  // too (2026-09-07, adaptive header): the hardcoded text-paper next to an
  // already-adaptive border-current was the one piece not actually
  // following its own stated reasoning, harmless while the header was
  // always dark, a real bug now that it isn't.
  // `focus-visible:outline-offset-0` (owner-facing bug, 2026-09-10: "weird
  // orange outline around the menu action"): the sitewide `:focus-visible`
  // rule (app/globals.css) is a real accessibility feature, not something to
  // strip -- but its default `outline-offset: 2px` floats a second, detached
  // ring outside this button's own 1.5px pill border, reading as a stray
  // double-ring rather than a highlighted control. Flush against the pill's
  // own border instead (0 offset) keeps the same visible focus indicator for
  // keyboard/touch users, just anchored to the shape instead of floating
  // past it. `MobileNav.tsx`'s Close state reuses this exact same token
  // (its own `closeRef.current?.focus()` on open triggers the identical
  // ring), so this one fix covers both.
  //
  // `data-[quiet-focus=true]:focus-visible:outline-none` (same owner report,
  // follow-up: the ring "still shows"/"comes back" -- turned out the offset
  // fix above wasn't the whole bug). This trap always moves focus
  // programmatically (into the Close button on open, back to this trigger on
  // close, `MobileNav.tsx`'s own focus-restoration effect) -- confirmed live
  // that Chromium's `:focus-visible` heuristic treats ANY script-called
  // `.focus()` as keyboard-equivalent, unconditionally, so the ring showed
  // after every plain tap/click too, not just real keyboard use. `MobileNav.
  // tsx`'s own `focusQuietly` sets `data-quiet-focus="true"` only when the
  // transition that triggered the move was itself pointer-driven (checked
  // via `event.detail === 0` at the click that opened/closed the drawer),
  // clearing it again on the element's own next blur -- real keyboard users
  // (Tab, Escape) still get the full ring, unaffected.
  menuButton:
    "xl:hidden inline-flex items-center gap-[9px] rounded-pill border-[1.5px] border-current px-6 py-3 text-current focus-visible:outline-offset-0 data-[quiet-focus=true]:focus-visible:outline-none",
  menuIconWrap: "flex size-[22px] items-center justify-center",
  menuIcon: "h-[19px] w-[22px]",
  // Same pill reused for the open drawer's "Close" state (MobileNav.tsx) --
  // that state's own icon is a real 24px box in Figma (465:2829), not this
  // 22px hamburger wrap, so it gets its own size rather than forcing one
  // shared wrap to fit both glyphs.
  closeIconWrap: "flex size-6 items-center justify-center",
  closeIcon: "size-6",
  // 500/medium (owner call, 2026-08-27), not the 700/bold `text-button-sm`
  // compound token bundles -- re-set size/leading explicitly alongside the
  // weight rather than layering `font-medium` after `text-button-sm`,
  // since overriding only one piece of a compound token's cascade is not
  // guaranteed to win (see the 2026-08-23 decision on this same class of
  // bug in the decision log).
  menuLabel: "text-[1rem] leading-[1.5] font-medium whitespace-nowrap",
};

/* --- Breadcrumb ----------------------------------------------------------- */

// Figma node 406:3078 ("Caprio Website" file). The 16px/18px-line-height
// type has no match in the existing scale -- written as a literal Tailwind
// value straight from Figma, same as megaPromoHeading and other one-off
// promo/mega-menu text, per the project's documented typography exception.
// Figma's own literal colours (a muted grey link, near-black current page)
// are mapped onto existing tokens (#838d97, the same muted grey used
// elsewhere; text-text, not the literal #000 Figma shows).
export const breadcrumb = {
  // pt-8 (32px, corrected 2026-08-28 from an earlier pt-6/24px) -- the
  // real value confirmed once this component's own real usage context
  // (inside CategoryBanner, Figma node 502:3310) supplied get_metadata.
  // This default stays CategoryBanner's own calibrated value; the PDP's
  // own standalone breadcrumb row (below) overrides it via `className`,
  // it doesn't change this shared default.
  nav: "container-p pb-2 pt-8",
  list: "flex flex-wrap items-center gap-2",
  item: "flex items-center gap-2",
  // Corrected on first real use of tone="light" (PDP breadcrumb, Figma
  // node 634:4952, 2026-08-31) -- built before any light-background design
  // existed to check it against, so the original #838d97/text-text guess is
  // replaced with this frame's own real values.
  link: "text-[1rem] leading-[18px] text-[#727272] transition-colors hover:text-text",
  // hover:text-paper here, not hover:text-text -- this is the tone="dark"
  // variant (CategoryBanner's own ink background, node 502:3310, revised
  // 2026-08-28): text-text is near-black, invisible against that surface.
  linkDark: "text-[1rem] leading-[18px] text-[#838d97] transition-colors hover:text-paper",
  // #21272a font-semibold -- same correction as `link` above, node 634:4952.
  current: "text-[1rem] leading-[18px] font-semibold text-[#21272a]",
  // #abb5c0 -- Figma's own real value for the current-page item on a dark
  // banner (node 502:3310); tone="light"'s text-text would be invisible on
  // an ink background.
  currentDark: "text-[1rem] leading-[18px] font-medium text-[#abb5c0]",
  arrow: "size-2 shrink-0 text-[#838d97]",
};

/* --- MobileNav (drawer) -------------------------------------------------- */

// Corrected on first real use (Figma node 465:2817, "Caprio Website" file,
// 2026-08-27) -- built before any open-state design existed, so the earlier
// shape (a right-sliding max-w-96 panel with a scrim, dividers, a plain
// "Menu"/X head, and CTA buttons in a footer) was a reasonable pre-design
// guess, not what the real design turned out to be: a full-screen takeover
// with no scrim, no dividers, a "Get in touch" contact block, and a social
// row -- no CTA buttons at all.
export const drawer = {
  // Matches the header's own custom breakpoint above -- the drawer and the
  // desktop nav must switch over at the same width, or both or neither would
  // show at once.
  root: "xl:hidden",
  // Full-screen, not a partial right-side panel -- there is no "outside" to
  // click, so the earlier translucent scrim is gone too; Escape and the
  // Close button are the only ways out (unchanged). No bg here (corrected
  // 2026-08-27, see the note on `navReveal` below): the black fill lives on
  // `head`/`nav` individually so it can animate away with the content,
  // instead of covering the whole screen solid for the full transition and
  // hard-cutting to the real page at the very end.
  panel: "fixed inset-0 z-50 flex flex-col overflow-y-auto text-paper",
  // Reuses `header.inner` for the actual row layout (see MobileNav.tsx) --
  // this is only the extra bit that layout doesn't already cover: no bottom
  // border here, unlike the real closed header (Figma shows none). Own
  // bg-ink (not the panel's) -- see the note above.
  //
  // Fades out on close (owner report, 2026-08-27): this row sits on top of
  // the real header's own "Menu" pill the whole time MobileNav is mounted
  // (z-50 vs z-40) -- unmounting was swapping "Close" straight to "Menu"
  // in a single frame, on top of everything else finishing its own
  // animation, which read as a jerky snap. `transition-opacity` on the same
  // 900ms as `navReveal` so the handoff between the two pills blends
  // instead of cutting.
  head: "shrink-0 bg-ink transition-opacity duration-[900ms] ease-in-out",
  headRevealed: "opacity-100",
  headHidden: "opacity-0",
  // Open/close transition, matched against the owner's reference recording
  // (reference/Nav.mov, 2026-08-27), watched frame by frame (`swift`
  // AVFoundation extraction, no ffmpeg on this machine): the header row
  // itself never animates, it's a flat swap. Only the content below it
  // reveals/hides, and it does so bottom-up: opening, the bottom rows
  // (Contact, the social row) appear first and the top row (Activewear)
  // appears last; closing is the exact mirror -- Activewear disappears
  // first, Contact/social linger longest. That's a `clip-path` inset
  // animated from the TOP edge (100% clipped -> 0% clipped opening, the
  // reverse closing), not a per-item stagger -- a single clip sweeping up
  // the box produces exactly this bottom-first reveal with no extra
  // per-item timing to keep in sync. Applied to `nav` itself so the
  // already-verified internal layout (92px gap, 24px row gap, `mt-auto`
  // contact/social block) needs no changes -- clip-path only affects what
  // paints, never layout. The reference's own edge reads a little soft
  // (likely the screen recording's own compression, not a deliberate
  // gradient) -- reproduced as a plain hard clip rather than guessing at a
  // moving mask, which real browsers don't cheaply support animating.
  // 900ms (owner report, 2026-08-27: the first pass at 500ms read as too
  // fast/not smooth) -- closer to the reference's own measured span
  // (roughly 900ms-1000ms opening, sampled frame by frame from
  // reference/Nav.mov) than the original guess.
  //
  // `nav` itself carries `bg-ink` (corrected 2026-08-27, owner report: the
  // homepage "landed" abruptly/jerkily once the drawer finished closing).
  // The panel's own bg had been living on the *outer* fixed box, which
  // covers the full screen at all times regardless of `nav`'s clip-path --
  // so the black fill never actually went anywhere as the content
  // disappeared: the screen just stayed solid black for the full 900ms,
  // then hard-cut to the real page the instant the component unmounted.
  // Moving the fill onto `nav` means the black area clips away together
  // with the content it belongs to, so the real page underneath reveals
  // itself progressively as the animation runs, the same way the reference
  // recording's own page does.
  navReveal: "bg-ink transition-[clip-path] duration-[900ms] ease-in-out",
  navRevealOpen: "[clip-path:inset(0%_0_0_0)]",
  navRevealClosed: "[clip-path:inset(100%_0_0_0)]",
  nav: "container-p flex flex-1 flex-col",
  // `overflow-x-hidden` lives here, NOT on `nav` -- found live, 2026-08-27:
  // `nav` carries `container-p`'s own side padding, so clipping at nav's
  // own box clips at the PADDING edge, not the content edge. `screens`
  // below is sized relative to nav's content box (100% = one screen), so
  // each screen's far edge lands exactly at that content edge -- with the
  // clip on `nav` itself, a ~20px sliver of the "off-screen" half (holding
  // whichever right-aligned glyph sits at that edge: the Back icon at
  // rest, or both list chevrons once the megaMenu is active) fell inside
  // the still-visible padding zone and peeked through as a stray chevron.
  // This wrapper is a plain, unpadded block child of `nav`, so its own box
  // exactly matches `screens`' content edges -- clipping here has no
  // padding zone left for anything to bleed into.
  screensClip: "overflow-hidden",
  // Two screens (main list, megaMenu) side by side, 200% of the clip
  // wrapper's own width, translated between `translateX(0)`/
  // `translateX(-50%)` inline in MobileNav.tsx (a per-instance value, not
  // a class). 350ms is deliberately quicker than the outer 900ms open/
  // close reveal (`navReveal` above) -- this is a lighter "push between two
  // already-open screens" motion, not the same kind of transition, so it
  // shouldn't share the same duration.
  screens: "flex w-[200%] transition-transform duration-[350ms] ease-in-out",
  // Each screen is exactly half the (200%-wide) track, i.e. one real
  // viewport width. `shrink-0` stops flex from squeezing them to fit side
  // by side in the track's own un-widened parent. `pb-[260px]` reserves
  // real space at the bottom of BOTH screens (main list and the mega-menu
  // sub-screen) for the fixed footer below (`drawer.ctaWrap`, now taller
  // since it also carries "Get in touch" + the social row, not just the
  // CTA button -- owner, 2026-09-10: those need to be always visible, not
  // scrollable list content competing with the footer for the same
  // viewport height) so neither screen's own last real content sits
  // underneath it.
  screen: "flex w-1/2 shrink-0 flex-col pb-[260px]",
  // 92px from the header row's own bottom edge to the first link's top
  // (owner-measured, 2026-08-27) -- not Figma's own frame gap (which read
  // closer to 100px against the frame edge, not the header row itself).
  list: "flex flex-col gap-6 pt-[92px]",
  // 28px/regular (Figma, not the guessed 30px/medium from the sitewide
  // mobile-title-bump rule -- that rule predates this real design and
  // doesn't apply here, this text was never a 24px title). No divider: the
  // old `item`/`border-b` is gone, Figma shows a flat list. No min-h-11: it
  // was inflating the visual gap between rows past the requested 24px
  // (gap-6) by padding each row out to a 44px tap target taller than the
  // 28px text itself -- the whole row is already a large `<Link>`, so
  // dropping the forced min-height doesn't cost a real tap target.
  link: "flex items-center justify-between gap-2 text-[1.75rem] font-normal leading-normal",
  // Decorative only where a row has no `megaMenu` -- see the note on
  // `home.nav.mobileLinks`. Unrotated the glyph points left; rotate-180
  // points it right (the "push deeper" direction, used both for these
  // decorative rows and for Activewear's real megaMenu trigger).
  chevronArrow: "size-[10px] shrink-0",

  /* --- MegaMenu screen (Figma node 473:2919, Activewear only) ----------- */
  // 32px below the header row (Figma-confirmed), reusing the same row
  // shape as a nav link (gap-3 icon-to-label) but at a smaller, secondary
  // scale -- this is a "step up" affordance, not a destination link.
  backRow: "mt-8 flex items-center gap-3",
  // 9x12 (Figma's own real export size for this glyph, distinct from
  // `chevronArrow`'s 10x10 -- a different instance of the same shape, not
  // interchangeable pixel-for-pixel).
  backIcon: "h-[12px] w-[9px] shrink-0",
  backLabel: "text-[1.125rem] leading-normal text-paper",
  // 48px below the Back row (Figma-confirmed: the row's own bottom edge to
  // the group list's top).
  megaMenuGroupList: "mt-12 flex flex-col gap-10 pb-10",
  megaMenuGroup: "flex flex-col gap-3",
  megaMenuGroupLabel: "text-[1rem] font-medium uppercase text-[#838d97]",
  // 20px/36px line-height (owner correction, 2026-08-30, re-checked against
  // Figma node 473:2919 -- was 24px/44px, a misread on first build; line
  // height iterated 44px -> 40px -> 38px -> 36px same day).
  // Applies to both mega-menu groups pushed from this list (Activewear and
  // Teamwear & Uniforms) -- one shared class, not two, so there's no second
  // place this could drift out of sync. Figma's own layers tag these
  // `Inter`, but every other layer in this same frame -- and everywhere
  // else on the site -- is Figtree (the project's only loaded typeface, per
  // CLAUDE.md); treated as a Figma authoring oversight, not a deliberate
  // second font, so this stays unset (inherits the page's real Figtree).
  megaMenuItem: "block text-[1.25rem] leading-[36px] text-paper transition-opacity hover:opacity-70",
  // `mt-auto` (flex auto-margin) doesn't hold up at every real device
  // height the way the note here used to claim -- found live, 2026-08-27:
  // on a viewport short enough (or with a visible mobile browser chrome
  // bar shrinking the effective height) that the list + header + this
  // block already fill the screen with no leftover space, `mt-auto`
  // collapses to 0 and "Our Story" touches "Get in touch" directly. Fixed
  // gap instead, Figma's own real, confirmed value (`get_metadata`: "Our
  // Story"'s own bottom edge to this block's top is 131.5px) -- always
  // correct regardless of viewport height, and harmless on a tall one
  // since `panel` already scrolls.
  // Owner, 2026-09-10, twice: "social icons does not appear above the
  // fold, only shows when you scroll" then, even after tightening this
  // gap, "on the large phone i have zfold 7 which is large phone i still
  // have to scroll to see the social icons." Any fixed top-margin here is
  // fundamentally the wrong fix -- it trades one device's fold line for
  // another's, since "Get in touch"/social still lived in the *scrollable*
  // list column, competing for the same finite viewport height as the
  // fixed CTA bar below it. Real fix: contact + social moved out of this
  // scrollable column entirely, into `ctaWrap` alongside the CTA button
  // (see below) -- a `position: fixed` block is visible in full on every
  // device by construction, not just ones tall enough to fit everything
  // above an increasingly short fold. This token (and the JSX wrapper
  // that used it) is retired; kept only as a comment pointer in case a
  // future design genuinely wants a scrollable trailing block again.
  //
  // Owner, 2026-09-10: "in the mobile menu at bottom of the page add
  // request a sample cta" -- the same primary CTA the desktop header
  // renders, full-width to match this column's own width rather than the
  // header's auto-width pill.
  cta: "w-full",
  // Truly `fixed`, not `position: sticky` (real bug, found live, owner:
  // "cta in mobile menu is not fixed at the bottom" -- sticky only keeps
  // an element from scrolling PAST its own natural resting spot once
  // scrolling has gotten that far; it does nothing on open, before any
  // scrolling happens, which is exactly when a taller link list pushes
  // the CTA off-screen). Rendered as a sibling of `nav` in MobileNav.tsx
  // (outside the scrollable flow entirely, not nested in `screen`), so
  // `inset-x-0 bottom-0` is relative to the real viewport via `panel`'s
  // own `fixed inset-0` -- always visible the instant the drawer opens,
  // regardless of scroll position or which of the two `screen`s is
  // showing. `container-p` reproduces the same horizontal inset every
  // other row in the drawer already has (this element sits outside
  // `nav`'s own `container-p`, so it needs its own). Solid `bg-ink`
  // backing so scrolled list content never shows through underneath it;
  // `screen`'s own `pb-*` reserves real space so this bar never covers
  // the real last item in either screen.
  //
  // Now also carries "Get in touch" + the social row (owner, 2026-09-10,
  // see the retired `bottomWrap` comment above): stacked in one flex
  // column with the button, so the whole group is always fully visible
  // together, on any device height, with no scroll dependency at all.
  // No flex `gap` here (was a uniform `gap-5`): the social-row-to-button
  // spacing needed its own value distinct from the contact-to-social
  // spacing (owner, 2026-09-10: "social icons are too close to the cta
  // make more 24px gap from the bottom of the icons") -- `contactGroup`'s
  // `mb-5` (kept at the old 20px) and `socialRow`'s `mb-6` (24px) each
  // carry their own gap below instead of a flex gap that would apply the
  // same value to both.
  ctaWrap: "fixed inset-x-0 bottom-0 z-10 container-p bg-ink pt-6 pb-6 flex flex-col",
  contactGroup: "flex flex-col gap-1 mb-5",
  contactLabel: "text-[1.125rem] leading-[26px] text-[#838d97]",
  contactEmail: "text-h5 font-medium text-paper underline decoration-solid underline-offset-2",
  // Left-aligned to match the contact block above it, not centred. `mb-6`
  // (24px) to the CTA button below -- see `ctaWrap`'s own comment.
  socialRow: "flex items-center justify-start gap-3 mb-6",
  // Distinct from Footer's own `footer.social*` keys: 50px/dark-bg here vs.
  // Footer's 60px/light-bg -- two different confirmed Figma treatments of
  // the same three icons, not one shared recipe forced to cover both.
  socialButton: "flex size-[50px] items-center justify-center rounded-[12.284px] bg-[#292929] text-paper",
  socialIconLg: "size-[22px]",
  socialIconSm: "size-6",
  socialIconFb: "h-6 w-auto",
};

/* --- Hero (homepage section 2) -------------------------------------------- */
// Figma: desktop node 322:1522, mobile node 323:1648. The `xl` (1280px) split
// matches the container-padding and nav breakpoints elsewhere, and is the only
// breakpoint Figma gave two real references for (360 and 1440) -- there is no
// tablet-specific Figma frame, so tablet holds at the mobile treatment until xl.
export const hero = {
  // mb-[72px]: the standard mobile section-to-section gap (2026-08-24), but
  // as a MARGIN outside this section's own bg-ink box, not padding inside
  // it -- Hero is the only section with a real full-bleed background colour
  // of its own, so its 72px gap to whatever comes next must render as the
  // page's own background (paper/white), not more black. Padding would have
  // made the dark box itself 72px taller instead, which is a real bug this
  // corrects: it was rendering as extra black space, not a genuine gap.
  // Mobile: no margin of its own -- Client Logos (the only section that
  // follows Hero) already contributes its own explicit 40px top padding
  // (clientLogos.mobileWrap, owner call, 2026-08-26), and stacking Hero's
  // own gap on top of that gave 112px total, not the requested 40px (a real
  // bug, found 2026-08-26). If a future section other than Client Logos
  // ever follows Hero on mobile and needs the standard 72px gap instead,
  // that section supplies it itself (the `pt-0`/`pb-[72px]` pattern), the
  // same way every other section-to-section gap already works -- Hero
  // should not assume what a specific neighbour needs.
  section: "bg-ink text-paper xl:mb-0 max-xl:mb-0",
  // Figma's banner insets: 48px top/bottom on mobile (symmetric), 140px top /
  // 80px bottom on desktop (deliberately asymmetric, not a rounding). 140 has
  // no matching spacing token, hence the one arbitrary value; 80 already is one
  // (space-20 / pb-20).
  // The 32px (mobile) / 48px (desktop) gap between the text block and the
  // buttons is this container's own gap, since both are direct children of it.
  // hero-wide-pilot (the >=1920px 1440-to-1680 width cap, globals.css) was
  // piloted here alone from 2026-08-23 -- removed 2026-08-26 (owner report:
  // at a real 1920px viewport, Hero reading visibly wider than every other
  // section, which all stay at container-p's standard 1440px cap, looked
  // like an inconsistency, not a deliberate wide moment). Hero now uses
  // plain container-p like the rest of the page.
  //
  // Top values additionally carry the header's own real height now that
  // it's `position: fixed` (owner, 2026-09-07: true overlay from rest --
  // see `header.base`'s own comment), so the heading's own visual position
  // stays pixel-identical to before (only Hero's own background now
  // extends up underneath the header instead of starting below it):
  // `pt-[115px]` = 67px (header's live-measured mobile/tablet height,
  // 2026-09-08's "make the nav bar compact" pass, was 72px) + 48px (the
  // original design value); `xl:pt-[208px]` = 68px (header's live desktop
  // height, was 87px) + 140px. Both header-height figures are read live
  // (`offsetHeight`), not hand-derived, each time the header's own size
  // changes -- see `header.inner`'s own comment for the current values.
  bannerInner: "container-p flex flex-col gap-8 pt-[115px] pb-12 xl:gap-12 xl:pt-[208px] xl:pb-20",
  // 12px gap mobile, 24px desktop, between the eyebrow and the H1.
  textBlock: "flex flex-col gap-3 xl:gap-6",
  // 13em, not a fixed 832px/52rem (owner, 2026-09-09: on very wide screens
  // the H1 wraps to 4 lines, not the intended 3 across all viewports).
  // `--text-display` (globals.css) is a `clamp()` that keeps growing with
  // viewport width up to ~1920px (64px at the 1440px reference, 78.2px at
  // its own max) -- a fixed-px/rem cap stays locked at the 1440px-tuned
  // 832px while the font keeps growing past it, so the same box holds
  // fewer, no-longer-Figma-matching characters per line the wider the
  // viewport gets, which is exactly what forced the extra 4th line. `em`
  // is relative to the H1's OWN font-size, so the box scales in lockstep
  // with `text-display` at every width (832px at the 64px/1440px
  // reference, same as before; wider automatically past that, matching
  // the font's own growth instead of racing against it) -- the same class
  // of fixed-max-w-vs-fluid-type mismatch already fixed twice on
  // /our-factory (see `ourFactoryDetails.heading`'s own comment).
  heading: "max-w-[13em]",
  // Secondary CTA is desktop-only (owner correction, 2026-08-23): shown from
  // xl up, absent on mobile -- not narrower, genuinely not there below xl.
  buttons: "flex flex-col gap-4 xl:flex-row",
  ctaPrimary: "w-full xl:w-auto",
  // Hides the whole wrapper, not the Button itself: Button's own base class
  // already includes an unconditional "inline-flex" (same specificity as
  // "hidden", same breakpoint), so passing "hidden xl:inline-flex" straight to
  // Button raced against its own base class in the compiled stylesheet and
  // sometimes lost, showing the button on mobile. `contents` at xl removes
  // this wrapper from layout so the Button becomes a direct flex child of
  // `buttons` again, same gap as before. Fixed 2026-08-24.
  ctaSecondaryWrap: "hidden xl:contents",
  // The video is edge-to-edge on mobile (Figma's mobile video frame is the
  // full 360px viewport width, no inset) and inset like every other section
  // from xl up. .container-p can't express "no padding, then padding" since
  // it's a hand-written class, not Tailwind utilities, so this re-implements
  // its max-width and centring with responsive padding instead, confined to
  // this one section.
  videoWrap: "mx-auto w-full max-w-[var(--container-page)] px-0 xl:px-20",
  // Figma's video block is a fixed height per breakpoint (390 mobile, 650
  // desktop), not a single aspect ratio -- the two references are too
  // different in shape (portrait-ish mobile, wide desktop) for one ratio to
  // fit both, which MediaPlaceholder's explicit height override is for.
  // 390px was `max-xl:` (real mobile through 1279px tablet) -- owner,
  // 2026-09-03, tablet-width review: "hero banner height should be fixed
  // next ... this looks small at the moment" -- 390px, tuned against a
  // ~375-430px phone frame, stayed pinned while the box's own width grew
  // to the full tablet container (edge-to-edge below `xl:`, same as
  // mobile), reading thin/small rather than a real banner. No tablet
  // Figma frame exists to read an exact value from, so `md:h-[520px]` is a
  // judgment call, not a confirmed number: roughly the midpoint between
  // 390 and 650, scaling with the wider box instead of staying fixed at
  // the phone height.
  video: "max-md:h-[390px] md:h-[520px] xl:h-[650px]",
  playWrap: "flex flex-col items-center gap-4",
  // 100px in Figma; 96px (size-24) is the nearest token, a 4px rounding.
  // Mobile's 64px lands on the scale exactly.
  playCircle: "inline-flex size-16 items-center justify-center rounded-pill bg-accent text-accent-ink xl:size-24",
  playIcon: "size-6 xl:size-8",
  playLabel: "text-body-lg text-paper",
  // No `eyebrowSize` override any more (2026-09-10 cleanup): this exact
  // 16px/600/1.2 mobile value, once a one-off confirmed here first, is now
  // `eyebrow.size`'s own sitewide default -- see that token's own comment.
  // `<Eyebrow>` picks it up automatically with no `size` prop needed.
  // No more `tickerMobile*` tokens here (2026-09-10 cleanup): the mobile
  // "Fully Custom Offerings" ticker now reads `servicesHero.tickerMobile*`
  // directly (owner: "I have created a different similar variant on
  // services page, let's use that here") -- see that recipe's own comment
  // for the shared, left-aligned treatment both Hero.tsx and
  // ServicesHero.tsx use.
};

/* --- OurFactoryHero (/our-factory sections 1-2) ----------------------------- */
// Figma desktop node 854:1402 ("Youtube Video"): unlike the homepage Hero,
// this video layer is the last thing in the dark box (no ticker follows it),
// and its own Figma frame carries an explicit pb-[80px] the homepage's
// `hero.videoWrap` doesn't need (Hero's own box keeps going into the ticker
// layer instead). Composes `hero.videoWrap` verbatim plus that bottom inset,
// reusing the same pb-12/pb-20 pair `hero.bannerInner` already uses for an
// identical top/bottom mobile-vs-desktop split, rather than a new value.
export const ourFactoryHero = {
  videoWrap: `${hero.videoWrap} pb-12 xl:pb-20`,
};

/* --- OurFactoryIntro (/our-factory section 3) ------------------------------- */
// Figma desktop node 857:1906 ("Content"): heading, one rich-text paragraph,
// a 2-stat row. get_metadata confirms real desktop insets of pl-260/pr-118
// (genuinely asymmetric, not container-p's own uniform 80px -- no other
// section on this page has needed a value like it) and pt-160/pb-120.
// Built by hand rather than composing `container-p` (which sets
// `padding-inline`, a single shorthand `pl`/`pr` utilities at `xl:` can't
// reliably out-specificity in the compiled stylesheet -- the same real bug
// `hero.ctaSecondaryWrap`'s own comment already documents for a similar
// case) -- mobile/tablet below xl fall back to container-p's own literal
// 20px/32px insets instead, since no mobile Figma frame exists yet.
//
// Heading reuses `text-h1`/`text-text` (54px/64px/500, matches exactly, same
// pairing `servicesIntro.heading` already uses). Paragraph's 26px/36px has
// no matching type-scale step, so it's a scoped arbitrary value (flagged),
// layered with `text-subline` -- Figma's own #17191e literal for this text.
// Stat numbers reuse `text-h1`/`text-text` again (also 54px/64px/500 in
// Figma); stat captions are `text-body-lg` (20px, matches) with `leading-7`
// overriding its own shorter default line-height to Figma's real 28px,
// same "token size, arbitrary leading override" pattern `servicesIntro.
// paragraph` already establishes.
/* --- GradientStat (shared "value + orange gradient divider + caption" stat) -
// Used by both OurFactoryIntro (below) and ServicesIntro -- see
// components/GradientStat.tsx. Extracted 2026-09-10 (owner: "these stats
// with the orange separator should be one component and used wherever this
// comes") -- both files had built the identical divider+value+caption
// block from scratch, each with its own statCol/statDivider/stat/
// statValue/statCaption set that were pixel-for-pixel the same recipe,
// only nominally duplicated. Only each placement's own column max-width
// stays per-caller (passed as `className`, e.g. OurFactoryIntro's two
// placements), since that's the one real per-node difference.
// `max-md:text-[2.5rem] max-md:font-medium max-md:leading-normal` (40px,
// owner, mobile-only review: "make 17+ and 100000 same font size 40px" --
// matches the homepage Stats section's own `mobileValue`) overrides the
// shared `md:text-h1` fluid clamp below md only -- both call sites'
// existing desktop-and-up size (`text-h1`) is unaffected, only mobile was
// asked for. Weight/leading are re-set alongside the size, not left to
// `text-h1`'s own bundled values -- the same established gotcha this
// project already documents elsewhere (overriding a compound token's size
// alone silently drops to the browser default).
// `stat: "flex flex-col gap-1"` (4px, was `gap-2`/8px on both original
// recipes) -- owner, same review: "the subline gap between 4px same as we
// did on the homepage", matching `stats.mobileItemText`'s own 2026-09-10
// value. Applied at every breakpoint via this one shared token (not a
// mobile-only override) since neither original recipe had ever split this
// particular gap by breakpoint. */
export const gradientStat = {
  col: "flex w-full flex-col gap-6 md:gap-8",
  divider: "h-px w-full bg-[linear-gradient(to_right,var(--color-accent)_36%,transparent)]",
  stat: "flex flex-col gap-1",
  value:
    "max-md:text-[2.5rem] max-md:font-medium max-md:leading-normal md:text-h1 text-paper whitespace-nowrap",
  caption: "text-body-lg leading-7 text-[#838D97]",
};

export const ourFactoryIntro = {
  // `bg-ink` (owner, 2026-09-09: "make this section dark", node 857:1906) --
  // was `bg-paper`. Figma's own reference for this node has always been
  // dark (`#121317`, white heading, `#838D97` subline) -- the light
  // background was a genuine mismatch from the initial build, not a design
  // change. Flows straight out of `OurFactoryHero` above it, which is
  // already dark (`hero.section`'s own `bg-ink`), so this reads as one
  // continuous dark canvas rather than two sections that happen to match.
  section: "bg-ink",
  // Shared base -- gap/padding-block/mobile-tablet insets, and now the
  // desktop left/right inset too, are identical at both placements; only
  // the desktop top inset still differs (below). `xl:pl-[300px]` (owner,
  // 2026-09-09: "make it 300px gap from the left... on wider screens can
  // stay in the middle as you already have built it" -- confirming this
  // block's own `mx-auto max-w-[1440px]` centring, unchanged, is still the
  // right way to handle anything past the 1440px reference) -- was 260px
  // (section 3) / 280px (section 7); both sections now share one value
  // instead of each carrying its own near-identical Figma measurement.
  // `gap-10` (40px, back to this token's original bare value): owner,
  // 2026-09-09, mobile-only review, tuned three times in sequence: 40px
  // ("75,000 stats should have the same space from top and bottom") ->
  // 48px (`max-md:gap-12`, to match `pb`) -> 24px (`max-md:gap-6`, "75000
  // should have 24px gap from top and separator") -> back to 40px, this
  // time named precisely: "75000 top separator and subline above should
  // have 40px gap" -- since that's this token's own original value, no
  // `max-md:`/`md:` split is needed any more (both tiers now agree). This
  // is the paragraph-to-statsRow gap specifically (the space between the
  // subline and stat 1's own divider) -- distinct from `statsRow`/
  // `statCol`'s own 24px gaps (between stacked columns, and divider-to-
  // value within each), which this message didn't touch and which stay at
  // their own last-confirmed 24px. xl: still overrides to 80px below.
  // max-md:pt-8/md:pt-12 (owner, same session: "make it 32px heading not
  // 48px") -- the section's own top gap (Hero down to this heading) drops
  // to 32px below md, unrelated to the stats-block gap above (a different
  // "top", the whole section's own, not the stats row's).
  // max-md:pb-10/md:pb-12 (owner, same message as this gap's own 40px
  // value: "100000 monthly capacity should have 40px gap from the
  // bottom") -- was 24px, now 40px below md, matching this gap's own new
  // value again (both named explicitly this time, not inferred from a
  // standing "match the top" rule).
  inner: "mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 max-md:pb-10 md:pb-12 max-md:pt-8 md:pt-12 md:px-8 xl:gap-20 xl:pb-[120px] xl:pl-[300px] xl:pr-[118px]",
  // Default placement: this component's first use (section 3, right after
  // the Hero) -- unchanged from before the `placement` prop existed.
  innerAfterHero: "xl:pt-[160px]",
  // Second placement (section 7, "Audited, not just promised", Figma node
  // 873:123): stacked directly after another dark section (OurFactoryDetails)
  // instead of the Hero, so it needs a smaller top gap than section 3's.
  // `xl:pt-[104px]` (owner, 2026-09-09, in sequence: "top title space
  // should be 64px", then "make top gap 104px") -- both corrections
  // supersede Figma's own raw 40px measurement for this node; the owner's
  // latest instruction wins, same precedent as the stat-row's own shared
  // 72px gap above. `max-md:pt-[72px]` (owner, 2026-09-10: "audited, not
  // just promised should have the same space from top as the details you
  // would [check on a sample] section") -- was the shared `inner`'s own
  // `max-md:pt-8` (32px), meant for section 3's own "right after the
  // Hero" placement; section 7 instead follows `OurFactoryDetails`
  // directly, whose own mobile top gap is `ourFactoryDetails.inner`'s
  // `pt-[72px]` -- matched here explicitly rather than left on the
  // shared 32px value, same "each placement gets its own top inset"
  // pattern `innerAfterHero`/`innerStacked` already establish at `xl:`.
  innerStacked: "max-md:pt-[72px] xl:pt-[104px]",
  // max-md:gap-6/md:gap-8 (owner, 2026-09-09, mobile-only review: "make the
  // paragraph gap 24px") -- heading-to-paragraph gap drops to 24px below
  // md (was the shared 32px `gap-8` at every breakpoint); md:/xl: unchanged.
  textCol: "flex flex-col max-md:gap-6 md:gap-8 xl:max-w-[52.5625rem]",
  // max-md overrides (owner, 2026-09-08: "the title should be in 1 line"):
  // below md, text-h1's own fluid mobile anchor (30px) is still too wide
  // for "The factory behind Capriowear" to fit one line down to the 360px
  // min mobile viewport (confirmed: wraps below ~600px). 1.375rem (22px,
  // already this project's established literal for a fitted mobile
  // headline-adjacent size -- see e.g. `desktopNav`'s own `labelBold`)
  // measured against the real rendered text width leaves a safe margin at
  // 360px. Weight and line-height re-set alongside the size, not left to
  // the h1 token's own bundled values (established gotcha, see
  // `docs/05-plan.md`'s decision log, 2026-08-23: overriding a compound
  // token's size alone without its paired weight/line-height silently
  // drops to the browser default).
  // md:whitespace-nowrap (real bug, found live, 2026-09-08: on wide
  // screens the title wraps to 2 lines): textCol's own 841px `xl:max-w`
  // is a fixed pixel value, but the heading reads from `text-h1`, which
  // keeps scaling up past 1440px to a new max at 1920px -- the grown
  // text (measured 902px wide at 1920px) no longer fits the fixed 841px
  // box. `nowrap` alone (not a wider max-w) is the fix, same reasoning as
  // `ourFactoryProcess`'s own heading fix above: `textCol`'s max-w still
  // usefully wraps the paragraph beneath it (a fixed 26px reading-copy
  // size, not fluid, so it isn't affected), and there's ample slack
  // (measured ~358px) between the box's right edge and the section's own
  // right inset for the heading to safely bleed into without any real
  // page-level overflow risk.
  heading:
    "max-md:text-[1.375rem] max-md:font-medium max-md:leading-[1.1852] max-md:whitespace-nowrap md:text-h1 md:whitespace-nowrap text-paper",
  // `text-[#838D97]` (was the light-section `text-subline` token) -- this
  // project's established muted-on-dark literal, now a binding sitewide
  // rule for subline-under-a-title on any dark section (docs/02-design-
  // system.md, 2026-09-09).
  // max-md:text-[1.5rem]/leading-8 (owner, 2026-09-09, mobile-only review:
  // "the factory behind caprio subline make font 24 by 32") -- 24px/32px
  // below md; md:/xl: keep the original 26px/36px (`text-[1.625rem]
  // leading-9`) unchanged, this fix is mobile-only.
  // md:max-w-[clamp(560px,65vw,780px)]/xl:max-w-none (owner, 2026-09-09,
  // tablet review: "the factory behind caprio subline should have less
  // width its too long for a read") -- `textCol`'s own width cap (`xl:
  // max-w-[52.5625rem]`) only starts at `xl:` (1280px), so between
  // 768-1279px this paragraph had no cap of its own at all, stretching up
  // to ~960px wide at common tablet widths (confirmed live at 1024px) --
  // far past a comfortable reading measure for 26px/36px body copy. Went
  // through two fixed-px passes first (560px, matching `ourFactoryDetails.
  // lead`'s own cap, then 680px, owner: "subline caprio behind can be a
  // little more width, make it look balanced") before landing on a fluid
  // `clamp()` (owner: "should these subline width scale if it goes to big
  // viewport, balanced approach that works for all tablet sizes" -- a
  // single fixed px value reads a different PROPORTION of the available
  // width at 768px vs 1279px, so "balanced" at one tablet width looked
  // off at another). Widened once more the same day, sitewide, once the
  // 480/720 pair was applied to other pages too (owner: "it should not be
  // too less width... currently on services page the paragraphs looks
  // less widthy" -- 480px/720px read too narrow once seen across several
  // sections, not just this one) -- 560px floor keeps it from ever reading
  // too cramped at the narrow end; 780px ceiling keeps it from
  // re-approaching the original unreadable width at the wide end; 65vw
  // scales it smoothly between the two. `xl:max-w-none` restores the
  // original uncapped behaviour at true desktop, where `textCol`'s own
  // 841px cap already keeps this readable and this pass is tablet-only.
  // `max-md:leading-7` (28px, owner, 2026-09-10, mobile-only review:
  // "make it 28" -- was `leading-8`/32px) -- shared by both placements
  // (section 3 "The factory behind Capriowear" and section 7 "Audited,
  // not just promised," "Quality management, material safety..."), so
  // this one token change covers both sublines at once. md:/xl: leading-9
  // unchanged.
  paragraph:
    "max-md:text-[1.5rem] max-md:leading-7 md:max-w-[clamp(560px,65vw,780px)] md:text-[1.625rem] md:leading-9 xl:max-w-none text-[#838D97]",
  // `text-paper`, no weight utility (was `font-semibold`) -- Figma's own
  // reference for this paragraph doesn't bold these spans at all, it
  // switches them to white at the same regular weight as the rest of the
  // sentence. Matches `ourFactoryDetails.leadBold`'s identical "regular
  // weight, colour carries the emphasis" fix from the day before.
  paragraphBold: "text-paper",
  // max-md:gap-6 (24px, owner, 2026-09-09, mobile-only review: "75000
  // should have 24px gap from top and separator, 10,0000 should also" --
  // this is stat 2's own "gap from top", i.e. the space down from stat 1)
  // -- supersedes the previous mobile value (48px, `gap-12`, owner,
  // 2026-09-08: "the space between 2 numbers should be 48px", itself
  // superseded here). md:gap-[72px] (owner, 2026-09-08, wide-screen
  // follow-up: "make it 72px") -- the side-by-side desktop gap between the
  // two stat columns, untouched, this pass is mobile-only.
  statsRow: "flex flex-col max-md:gap-6 md:flex-row md:items-start md:gap-[72px]",
  // The gradient line (Figma "Line 329"): a real two-stop linear gradient
  // asset (accent orange solid to ~36% of the line, fading to transparent),
  // not a plain divider -- reproduced as CSS rather than an image so it
  // scales with the column's own width, using the existing accent token
  // rather than a new hardcoded hex.
  // Column max-width only, passed as `GradientStat`'s own `className` --
  // the rest of the stat block (gap, divider, value, caption) now lives in
  // the shared `gradientStat` recipe above. Two placement-specific values,
  // same reasoning as `innerAfterHero`/`innerStacked` above: the first
  // section's 2 stats are each 342px in Figma, the second's 3 stats are
  // each 280px (narrower, so three columns plus the shared 72px gaps still
  // read as a single deliberate row rather than a cramped one) -- both
  // real per-node measurements, not a shared guess.
  statColAfterHero: "md:max-w-[342px]",
  statColStacked: "md:max-w-[280px]",
};

/* --- OurFactoryProcess (/our-factory section 5) ----------------------------- */
// Figma desktop node 857:2090 ("Content"), "What We Make": heading, then 7
// process steps in a staggered, alternating-width grid -- get_metadata's
// real nesting is heading+row1 sharing a 72px gap, then every further row
// (row1's own group, row2, row3, row4) 104px apart; `inner`/`headingRow`
// below reproduce that two-tier gap directly rather than flattening it to
// one uniform value. No mobile Figma frame exists yet (owner: desktop is
// ready, mobile handled separately) -- rows stack to one column below `xl`,
// each item's own fixed desktop width dropping to `w-full`.
export const ourFactoryProcess = {
  section: "bg-paper",
  // xl:pt-[160px]: this section's own real top inset (owner correction,
  // 2026-09-08: "top should have 160px gap" -- get_metadata's own frame
  // read no top padding at all, since the previous section, InsideFactory,
  // already happened to close with a matching 120px bottom pad; that
  // coincidence read as "close enough" but wasn't the real confirmed
  // number, so this section now states its own 160px explicitly rather
  // than depending on whatever the previous section's own padding happens
  // to be).
  // Back to `container-p` (owner, 2026-09-08, reversing the previous
  // correction: a flat edge-anchored 80px inset was tried, but at large
  // screens it left content pinned to the left with a growing dead zone
  // on the right -- "it looks odd ... lot of empty space on the right".
  // `container-p`'s own centered 1440px cap is what every other section
  // on this page already uses (Hero, Intro, InsideFactory), and still
  // gives exactly 80px from the left at the page's own 1440px reference
  // width -- only diverges from a flat 80px past that width, which reads
  // as balanced instead of lopsided.
  inner: "container-p flex flex-col gap-12 pt-12 pb-16 xl:gap-[104px] xl:pb-[120px] xl:pt-[160px]",
  // Heading block (eyebrow + H2) plus the first row, 72px apart -- the
  // real Figma nesting (get_metadata: node 857:1986 wraps the heading
  // block and row 1 together with its own 72px gap, separate from the
  // 104px gap between THIS group and every row after it).
  headingRowGroup: "flex flex-col gap-8 xl:gap-[72px]",
  // Eyebrow to H2, 24px (owner correction, 2026-09-08: "eyebrow and title
  // should have 24px gap" -- was wrongly sharing `headingRowGroup`'s own
  // 72px gap above, a real bug: that 72px was always meant for heading-to-
  // row, not eyebrow-to-heading, collapsed into one wrapper by mistake).
  // max-md:gap-3 (owner, 2026-09-09, mobile-only review: "what we make
  // eyebrow and title should have 12px") -- 12px below md; md:/xl: keep
  // the original 24px unchanged. `max-md:gap-[10px]` (owner, 2026-09-10,
  // mobile-only review: "reduce 2px more space from the title and the
  // subline for what we make section") -- was 12px, -2px here specifically.
  headingGroup: "flex flex-col max-md:gap-[10px] md:gap-6",
  // No `eyebrowSize` override any more (2026-09-10 cleanup): this section's
  // 16px/600/1.2 mobile fix (owner, 2026-09-09) is now `eyebrow.size`'s own
  // sitewide default, so `<Eyebrow>` in OurFactoryProcess.tsx picks it up
  // with no `size` prop needed.
  // No `heading` max-w token (owner correction, 2026-09-08: "still in 3
  // lines" -- a first pass used a 565px max-w to force this heading's real
  // 2-line Figma break, but `text-h1` is a fluid clamp that keeps growing
  // past 1440px while a fixed px max-w doesn't, so the same box that
  // wrapped correctly at 1440px re-wrapped to 3 lines at wider viewports).
  // The 2-line break is now a real "\n" in the content string itself
  // (content/our-factory.ts, TextReveal already renders "\n" as a real
  // <br />), which holds at every width -- no max-w needed at all.
  //
  // Row layout switches at a custom `min-[1420px]:`, not `xl:` (1280px) --
  // real bug, found live, 2026-09-08: the widest row (700+520px items,
  // 40px gap = 1260px) needs 1260px of content width, but `xl:`'s own
  // `container-p` padding (80px each side) only leaves 1120px of content
  // width at exactly 1280px -- a 140px shortfall that forced the whole
  // page to horizontally scroll for any viewport between 1280 and 1419px.
  // 1420px is the exact width where 1260px of content first fits (1420 -
  // 160 = 1260, no margin needed, computed not guessed) -- already an
  // established custom breakpoint in this codebase for the same class of
  // "xl's own 1280px is too early" problem (see the desktop nav's own
  // former use of a custom 1420px, `docs/05-plan.md`'s decision log,
  // 2026-08-22). Below 1420px, items keep stacking to one column (already
  // the established `xl:`-and-under fallback) rather than overflowing.
  row: "flex flex-col gap-10 min-[1420px]:flex-row min-[1420px]:items-start",
  // max-md:gap-6/md:gap-8 (owner, 2026-09-09, mobile-only review: "space
  // from top eyebrow fabric, cutting, etc should be 24px") -- this gap is
  // the image-to-textCol space, whose first child is the "01 Fabric"-style
  // label, so it's the real "image top to eyebrow" distance the request
  // names. 24px below md (was the shared 32px `gap-8` at every
  // breakpoint); md:/min-[1420px]: unchanged.
  item: "flex w-full flex-col max-md:gap-6 md:gap-8",
  // Mobile ratio override, `max-md:` only (owner, 2026-09-09: "Image
  // placeholder height should 320 by 220 confirm it if we are using this
  // for other pages images, not the product images") -- confirmed: 320x220
  // reduces to the exact same `16:11` fraction already in `media.ratio`
  // (Trust Signals' own mobile artwork box, node 348:1881, a non-product
  // page image, same request's own "not the product images" carve-out).
  // A same-day tablet pass first widened this same `16:11` value through
  // the tablet range too, then was corrected (owner: "you have used the
  // same image size as mobile, that's wrong, should use the same size
  // before but just the behavior keep it as is you did now") -- "the
  // behavior" being extending this fix through the full tablet range at
  // all (kept, `md:max-[1419px]:` below), but with tablet's OWN already-
  // established ratio instead of reusing mobile's: `469:320`, Inside the
  // Factory/Exhibitions' own real tablet gallery-card ratio (`insideFactory
  // .desktopCardMedia`'s `md:aspect-[469/320]`), the actual "other page"
  // precedent for THIS breakpoint, not the mobile one. At tablet width,
  // `item` is still the single-column `w-full` fallback (fixed desktop
  // pixel widths only start at this section's own real desktop breakpoint,
  // `min-[1420px]`, see `itemWidth` below), so each item's own per-item
  // desktop ratio (520:480/600:640/etc, meant for a narrow 520-700px
  // column) was being stretched across a ~900-1200px-wide box -- confirmed
  // live at 1024px: up to 960x1024, portrait, genuinely "too big" before
  // either fix. `md:max-[1419px]:` scopes the 469:320 override to exactly
  // the tablet range (768-1419px) -- true desktop (`min-[1420px]`+) keeps
  // each item's own real per-item ratio, untouched, since neither override
  // matches there. Passed as `ParallaxMedia`'s own `className` alongside
  // its per-item desktop `ratio` prop (an unprefixed `aspect-*` class);
  // same "unprefixed base ratio + breakpoint-scoped override in className"
  // technique `insideFactory.desktopCardMedia` already uses successfully
  // for its own tablet-vs-desktop ratio split, not a new pattern.
  itemMediaMobile: "max-md:aspect-[16/11] md:max-[1419px]:aspect-[469/320]",
  // Desktop-only fixed widths per item, matching each row's own real Figma
  // pixel pair (700+520, 600+600, one full-width, 700+520 again). Gated to
  // the same `min-[1420px]:` as `row` above, not `xl:` -- see its comment.
  itemWidth: {
    lg: "min-[1420px]:w-[700px] min-[1420px]:shrink-0",
    md: "min-[1420px]:w-[600px] min-[1420px]:shrink-0",
    sm: "min-[1420px]:w-[520px] min-[1420px]:shrink-0",
    full: "min-[1420px]:w-full",
  },
  // max-w-[36rem] (576px, was max-w-[30rem]/480px, owner, 2026-09-09:
  // "what we make titles some are in 2 lines whereas it can use the
  // available space on the right side, fix it") -- this 480px cap had no
  // real Figma justification recorded (a bare literal, unlike this file's
  // other confirmed measurements), and live testing across every width a
  // title can still wrap at (0-1279px -- `title`'s own `xl:whitespace-
  // nowrap` prevents wrapping outright from 1280px up) found the longest
  // title's own natural one-line width peaking at 476px, just under the
  // old 480px cap -- so on some devices/font-rendering environments a few
  // px of drift is enough to force an unnecessary wrap despite the item's
  // real container having far more room (up to 1280px on the full-width
  // row item). 576px gives real headroom above that measured peak while
  // still capping the widest ("full"-width) row item's own body-copy line
  // length to a comfortable reading width, not left unconstrained at the
  // row's own full ~1280px+.
  // `gap-2` (8px, was `gap-3`/12px, itself down from `gap-4`/16px) -- owner,
  // 2026-09-10, mobile-only review, in sequence: "'it starts with the right
  // cloth' to subline make the space 4px less for all titles for this
  // section," then "make it 8px" -- title-to-body gap, one shared token
  // every station's own title already reads (`Item`'s own markup has no
  // per-station override), so this fixes every title in the section at
  // once, not just the one named as an example. Now matches `labelGroup`'s
  // own eyebrow-to-title gap below, also 8px.
  textCol: "flex max-w-[36rem] flex-col gap-2",
  labelGroup: "flex flex-col gap-2",
  // 16px, Figma's own #3c3c43 -- already this project's established literal
  // for this exact muted-label grey (see e.g. `desktopNav.item`/`chip` in
  // this same file), not a new one-off hex.
  label: "text-base font-medium text-[#3c3c43]",
  // 30px/36px/500 -- text-h3 matches exactly at this page's own 1440px
  // reference width (fluid token, see its own definition in globals.css).
  // whitespace-nowrap gated to `xl:` only (real bug, found live,
  // 2026-09-08: applying it unconditionally forced true page-level
  // horizontal scroll at the 360px min mobile viewport -- "Retail-ready,
  // delivered to your door" cannot fit this item's mobile width, which is
  // this section's own responsive `w-full`, not the fixed desktop
  // itemWidth values nowrap was original written for). At `xl:` and up,
  // every station title's own Figma text layer is a single 36px line
  // height, none double (owner, 2026-09-08: "make it in one line",
  // flagged on this same title) -- that intent only ever applied to the
  // desktop layout's fixed item widths, so it stays desktop-only too.
  title: "text-h3 text-subline xl:whitespace-nowrap",
  // max-md:text-[1.125rem]/leading-6 (owner, 2026-09-09, mobile-only
  // review: "subline text under the titles should be 18px by 24px") --
  // 18px/24px below md; md:/xl: keep the original `text-body-lg leading-7`
  // (20px/28px) unchanged.
  body: "max-md:text-[1.125rem] max-md:leading-6 md:text-body-lg md:leading-7 text-subline",
};

/* --- OurFactoryDetails (/our-factory section 6) ----------------------------- */
// Figma desktop node 857:2088 ("Content"), "The details you would check on a
// sample" (owner brief, 2026-09-08). A dark accordion + synced-image panel,
// the same visual language as Apple's macbook-pro "Take a closer look"
// section per the brief, but a left-accordion layout, not pinned scroll
// markers -- see OurFactoryDetails.tsx for the interaction build notes.
//
// Colour: `surface.dark`/`surface.darkRaised` (bg-ink/bg-ink-2) for the
// section and card -- both now exact hex matches for this Figma frame's own
// #121317/#17191e (owner updated the tokens to these exact values the same
// day this section was built), not just "close enough". The item pill/open-
// card surface, #1f2126, has no existing token (a third, lighter dark tier
// this project hasn't needed before) -- kept as its own one-off literal,
// this file's established convention for a confirmed Figma colour with no
// token match.
export const ourFactoryDetails = {
  section: "bg-ink text-paper",
  // xl:pt-[96px] (owner, 2026-09-09: "add 16px on top of the heading" --
  // was xl:py-[80px] on both sides; split so only the top gap grows to
  // 96px, bottom stays the 80px the owner set the same day).
  // `pb-0` below `xl:` (was the shared `py-[72px]`, i.e. `pb-[72px]` at
  // every breakpoint) -- real bug, found live, 2026-09-10: this bottom
  // padding used to give space before `card` (this section's own
  // accordion), but `card` is now `hidden` below `xl:` (see its own
  // comment), so that space is empty and dead. The new mobile media block
  // (`mobileWrap`, a sibling of `inner`, below) supplies its OWN top gap
  // (`mt-12`, 48px, owner: "image and the top subline text gap should be
  // 48px") -- with `inner`'s own `pb-[72px]` still active, the two were
  // stacking into a real 120px gap instead of the intended 48px.
  // `xl:pb-[80px]` restores the confirmed desktop value explicitly.
  inner: "container-p flex flex-col gap-12 pt-[72px] pb-0 xl:gap-[72px] xl:pb-[80px] xl:pt-[96px]",
  // Header row: H2 left, lead paragraph right (Figma: 539px/181px gap/560px
  // at the 1440px reference width) -- `max-w`, not a fixed `w`, on both
  // sides, and `justify-between` doing the gap instead of a flat 181px:
  // 539+181+560 sums to exactly 1280px (this section's own 1440px frame
  // minus its 80px side padding), so a literal gap only ever fits at that
  // one reference width -- the same class of bug already fixed twice on
  // this page today (OurFactoryProcess's heading max-w, then its row
  // breakpoint). `max-w` lets both blocks shrink/wrap at any narrower
  // `xl:` width instead of forcing an overflow.
  headingRow: "flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-12",
  // No `max-w` (real bug, found live, owner: "make the title in 2 lines"):
  // a fixed 539px cap combined with the real "\n" break in the content
  // string (see `content/our-factory.ts`) re-wrapped that already-broken
  // first line to a 3rd line, the exact same class of bug already fixed
  // on `ourFactoryProcess.heading` -- a fixed max-w and a fluid `text-h1`
  // (which keeps growing past 1440px) don't stay in sync, so a box that
  // fit the "\n"-broken lines at 1440px could re-wrap wider than that.
  // `headingRow`'s own `xl:justify-between` (this section's inner) keeps
  // this column from colliding with the lead paragraph without needing a
  // second, competing width constraint here.
  headingCol: "flex flex-col gap-6",
  heading: "text-h1 text-paper",
  // 26px/36px leading -- the same literal `ourFactoryIntro.paragraph`
  // already uses for this exact Figma size, reused rather than a second
  // one-off of the identical value. max-md:text-[1.5rem]/leading-8 (owner,
  // 2026-09-09, mobile-only review: "the details you would check on
  // sample subline should be 24 by 32px as we used on top") -- 24px/32px
  // below md, the exact same mobile override `ourFactoryIntro.paragraph`
  // just got ("as we used on top"), reused rather than re-derived; md:/xl:
  // keep the original 26px/36px unchanged. `md:max-w-[clamp(560px,65vw,
  // 780px)]` (owner, same tablet review, "apply the same to subline to
  // the details you would check", then "should these subline width scale
  // if it goes to big viewport, balanced approach that works for all
  // tablet sizes" -- the exact same fluid cap `ourFactoryIntro.paragraph`
  // landed on, for the same reason a fixed px value read a different
  // proportion of the available width at different tablet sizes).
  // `xl:max-w-[560px]` is this section's own pre-existing desktop value
  // (unrelated, `headingRow`'s own `xl:justify-between` layout need) and
  // naturally wins back over the new tablet value at `xl:`, unchanged.
  // `max-md:leading-7` (28px, owner, 2026-09-10, mobile-only review:
  // "make it 28") -- was `leading-8`/32px. md:/xl: leading-9 unchanged.
  lead: "max-md:text-[1.5rem] max-md:leading-7 md:max-w-[clamp(560px,65vw,780px)] md:text-[1.625rem] md:leading-9 text-[#838D97] xl:max-w-[560px]",
  // Regular weight (owner, 2026-09-09: "explore a pair text highlighted
  // should be regular weight") -- white/`text-paper` only, no
  // `font-semibold`. Figma's own reference layer agreed with this all
  // along (its "Explore a pair..." span carries no bold class either); an
  // earlier pass added weight that was never actually asked for or in the
  // source.
  leadBold: "text-paper",
  // The big rounded card. Height is intrinsic (content-driven), not
  // Figma's own fixed 708px -- a fixed height risks clipping the open
  // item's description at a length Figma's own placeholder copy didn't
  // need to account for, and this project's own "no magic pixel heights"
  // rule for exactly this class of component (see OurFactoryDetails.tsx's
  // own animation notes) extends naturally to the card's outer height too.
  // `rounded-none` (owner, 2026-09-09: "the main container and the image
  // container should have 0 radius") -- was `rounded-xl`, corrected
  // alongside `imageCol` below.
  // `hidden xl:flex` (was bare `flex ... xl:flex-row`) -- desktop-only,
  // 2026-09-10 (owner: rebuild the mobile presentation entirely, Apple's
  // "Take a closer look" pills-over-image pattern, not this accordion).
  // This card's own children (`stepperCol`, `listCol`, `imageCol`) were
  // already effectively desktop-only in spirit but never actually hidden
  // below `xl:` -- `listCol` in particular rendered the exact same
  // full-row-expanding accordion at every width, which WAS the broken
  // mobile behaviour. Rather than touch any of that shared machinery
  // (still used verbatim at `xl:+`, unchanged), this card is now hidden
  // outright below `xl:` and a wholly separate mobile-only block (below,
  // `mobileWrap`) renders instead. `hidden`/`xl:flex` on the same
  // unprefixed-display property, not `flex` plus a competing override --
  // the same "two same-specificity utilities racing" bug class this
  // project avoids everywhere else (e.g. `howItWorks.desktopOuterLight`/
  // `desktopOuterDark`).
  card: "hidden flex-col gap-8 rounded-none bg-ink-2 p-6 xl:flex xl:flex-row xl:items-center xl:gap-10 xl:p-10",
  // Real flex column, not Figma's absolute `top-1/2 -translate-y-1/2` --
  // `self-center` against the row's own cross-axis (stretched to the
  // tallest sibling, the image panel) gives the same vertical-centred
  // read without a magic-number position that would need re-tuning any
  // time the list's own total height changes (e.g. a longer description).
  stepperCol: "hidden shrink-0 flex-col items-center gap-6 xl:flex xl:self-center",
  // `cursor-pointer` (owner, 2026-09-09: "chevron should also have hand
  // icon on hover") -- same preflight `cursor: default` reset as
  // `itemButton` above; `disabled:cursor-default` keeps the first/last
  // disabled state honest, since a disabled stepper button isn't
  // actually clickable.
  stepperButton:
    "flex size-8 cursor-pointer items-center justify-center rounded-pill text-paper transition-colors duration-200 hover:bg-paper/10 disabled:pointer-events-none disabled:cursor-default disabled:opacity-30",
  stepperIcon: "size-4",
  stepperIconUp: "-rotate-180",
  listCol: "flex w-full flex-col gap-4 xl:w-[320px] xl:shrink-0",
  // Dynamic per-item width (owner, 2026-09-09: "the chips width should be
  // dynamic based on the text label, follow the design", and separately:
  // "it does not open to the bottom, it opens on the right side" --
  // Figma's own real per-item widths independently confirm this too --
  // get_metadata measured each collapsed pill sized to its own content
  // (238px/169px/154px/168px/200px, not a shared column width), which an
  // earlier flat `w-full` on every item silently ignored).
  //
  // `width` here is a REAL, measured pixel value when closed (see
  // `OurFactoryDetails.tsx`'s own hidden-measurement-clone comment), not a
  // CSS keyword -- two CSS-only approaches were tried and both failed,
  // confirmed by real frame-by-frame sampling, not assumption: a bare
  // `width: auto` (via `align-self: flex-start`) never animated at all,
  // it snapped in ~5ms, because CSS transitions require a definite
  // starting length and `auto` isn't one; a follow-up attempt using this
  // codebase's own established `grid-template-columns` 0fr/1fr-style
  // technique (the same mechanism that DOES smoothly animate height,
  // `detailGrid`/`detailGridOpen` below) also just snapped -- interpolating
  // between an intrinsic keyword (`max-content`) and `1fr` isn't the same
  // supported case as interpolating between two `fr` values, and browsers
  // evidently don't smoothly animate it either. It also briefly introduced
  // a worse bug: mid-transition, the still-transitioning grid track's own
  // width recalculation let the closed panel's unwrapped description text
  // flash the chip out to 900px+ before settling. A real measured pixel
  // width is the standard, well-established pattern for exactly this
  // "expand a chip from its own content-width to full-width" case, and
  // being an ordinary definite length, it's unambiguously animatable by a
  // plain `transition: width` -- no grid trick needed at all. Falls back
  // to no inline width (natural full-width flow) for the one frame before
  // the measurement effect runs; that effect is `useLayoutEffect`, which
  // fires before the browser paints, so there's no visible flash on a
  // client-rendered page.
  //
  // `flex-col` (button above the panel, never a row) applies
  // unconditionally across both states -- `flex-direction` cannot be
  // transitioned by CSS at all (confirmed the hard way, 2026-09-08:
  // flipping it between states made the whole chip instantly snap from a
  // horizontal pill to a vertical stack in the same frame the height was
  // trying to animate smoothly). Only the shape (radius/background/width,
  // all real CSS transitions) actually changes on open.
  //
  // No padding on this element any more (real bug, found live, owner:
  // "the whole chip should be clickable not just plus"): `px-6 py-4` used
  // to live on a plain non-interactive wrapper `<div>`, while the actual
  // `<button>` inside had no padding of its own -- clicking the pill's own
  // visible padding (the bulk of its clickable-looking area) did nothing,
  // only the tight icon+label box responded. The padding now lives
  // directly on `itemButton` below, so the button's own hit target is the
  // full visible chip, not just its text.
  //
  // Base chip surface -- no hover here any more (owner, 2026-09-09: "the
  // open chip should not have a hover effect"). Hover now lives on
  // `itemClosed` only, so it drops away the instant a chip opens instead
  // of continuing to react to the pointer while it's the active,
  // already-obvious-it's-interactive panel.
  //
  // `ease-[cubic-bezier(0.33,1,0.68,1)]` (owner, 2026-09-09: "why the chip
  // when opens at the end have a jerk effect... apple has very smooth
  // towards the right it goes") -- was the same `cubic-bezier(0.22,1,0.36,1)`
  // `detailGrid`'s height animation still uses. Root cause, confirmed by
  // evaluating that curve as a function of elapsed time (not a guess): it
  // reaches 96% of its total travel by 50% of the duration and 99.8% by
  // 80%, so for this chip's real ~166px closed->open width range, the last
  // 40% of the 340ms transition (its final ~136ms) only ever moves ~2-3px
  // total -- sub-pixel-per-frame deltas that the browser rounds to whole
  // device pixels, so most of those frames render byte-identical and the
  // remaining couple of pixels appear to snap in one frame instead of
  // gliding, right when the motion should read as settling. `(0.33,1,0.68,1)`
  // ("easeOutCubic") is still a fast-start/slow-finish curve -- same
  // character, not a different animation -- but keeps ~11px of real,
  // still-visible travel at the same 60%-elapsed mark instead of ~3px, so
  // the last third of the grow reads as a continuous glide rather than a
  // pause-then-snap. `detailGrid`/`detailInner` (the height/text-fade,
  // already tuned and not what was reported jerky) keep their own existing
  // curve -- this is scoped to `item`'s own width/radius/background only.
  item: "relative flex flex-col bg-[#1f2126] text-left transition-[width,border-radius,background-color] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none",
  itemOpen: "w-full gap-2 rounded-xl duration-[340ms]",
  // `hover:bg-[#25272d]` (owner, 2026-09-09: chip hover should be "a
  // little lighter than the actual color not dark" -- reverses this same
  // day's earlier "a bit dark" ask). ~18% lighter than the base
  // `#1f2126`, the same multiplicative step the darker version used, just
  // inverted -- both one-off literals for the same reason, no existing
  // token is this specific dark-surface tier. CSS `:hover` matches an
  // ancestor whenever any descendant is hovered, so this alone (not also
  // needed on `itemButton`) already covers the whole chip once
  // `itemButton` fills it -- see that element's own "whole chip
  // clickable" fix, the same shape of coverage. Closed-only, per the
  // "open chip should not have a hover effect" ask above.
  itemClosed: "rounded-pill duration-[260ms] hover:bg-[#25272d]",
  // No `pb-*` on the shared base -- split into `itemButtonClosed`/`Open`
  // below (real bug, found live, owner: "the gap between the chip title
  // and subline should be 8px"): a flat `py-4` gave the button its own
  // 16px bottom padding UNCONDITIONALLY, which then stacked with
  // `itemOpen`'s own `gap-2` (8px) between button and panel -- 24px
  // total, not the intended 8. Closed keeps the full `pb-4` (a standalone
  // pill needs even top/bottom padding); open drops to `pb-0`, so
  // `itemOpen`'s `gap-2` becomes the ENTIRE visible gap between the label
  // and the description below it. `padding` joins the transition list so
  // this collapses/expands smoothly alongside the chip's own width/radius
  // change, same easing -- and, like `item`'s own duration split (see its
  // comment on the last-frame jerk fix), `duration` moves into
  // `itemButtonClosed`/`Open` too, matching `detailGrid`/`detailGridOpen`
  // exactly, so this element's own vertical-space change also finishes in
  // lockstep with the panel's height animation, not a beat later.
  // `cursor-pointer` (owner, 2026-09-09: "on hover the mouseover should
  // turn hand icon so it tells its clikable") -- Tailwind's own preflight
  // resets `<button>` to `cursor: default`, so the browser's native
  // pointer-on-button behaviour doesn't apply here without it.
  itemButton:
    "flex w-full items-center px-6 pt-4 transition-[padding] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none cursor-pointer",
  itemButtonClosed: "pb-4 duration-[260ms]",
  itemButtonOpen: "pb-0 duration-[340ms]",
  // Plus icon persists in the DOM at both states (opacity/rotate driven by
  // `isOpen`, not conditionally rendered) so it can transition out rather
  // than pop -- see the component's own comment on why a truly `hidden`
  // icon can't animate. `itemButton`'s own `gap-2.5` moved onto this
  // element as a `mr-2.5` (closed only) specifically so the reserved space
  // is something `width`/`margin` transitions can actually collapse to 0
  // -- a flex `gap` cannot animate away, it stays constant regardless of a
  // shrinking sibling.
  //
  // `itemIconWrapClosed`/`itemIconWrapOpen` are fully mutually exclusive
  // (real bug, found live, owner: "selected chip... should be left align
  // with the text" -- persisted after a first fix attempt): `width`/
  // `margin`/`opacity` all used to live partly on the shared base
  // (`w-6`/`mr-2.5`/implicit opacity-100) and partly as an `isOpen`-only
  // override (`w-0`/`mr-0`/`opacity-0`) -- both values for the same
  // property landed in the class list at once when open, the identical
  // class of Tailwind-generation-order collision as `imageLayer`'s own bug
  // above, just on different properties. The base (`itemIconWrap`) now
  // only carries what never differs between states (height, layout,
  // transition config); every property that actually changes lives
  // entirely in one or the other variant, never both.
  itemIconWrap:
    "flex h-6 shrink-0 items-center justify-center overflow-hidden transition-[opacity,transform,width,margin] duration-200 ease-out motion-reduce:transition-none",
  itemIconWrapClosed: "w-6 mr-2.5 rotate-0 opacity-100",
  itemIconWrapOpen: "pointer-events-none w-0 mr-0 rotate-45 opacity-0",
  itemIcon: "size-6 shrink-0 text-paper",
  // text-body-lg (20px, fixed -- matches Figma's own confirmed size at
  // both label and description, `text-overline`'s sibling body-copy size)
  // for both the label and the description -- weight/colour are the only
  // real difference (semibold+white label, regular+muted description),
  // not a font-size change between them. Weight is the only real
  // difference Figma shows between the two states (both text-paper/white,
  // 20px) -- collapsed is regular, open is semibold. No trailing colon any
  // more (owner, 2026-09-09: "it should not have ':' apply to all chips")
  // -- the component used to append one on the open label only.
  // `whitespace-nowrap` matches every collapsed pill sizing to its own
  // label's content width, same as Figma's own fixed-to-content pill
  // shapes.
  itemLabel: "text-body-lg whitespace-nowrap text-paper",
  itemLabelOpen: "font-semibold",
  // Asymmetric expand/collapse timing (owner spec, 2026-09-08: "make
  // expand/collapse feel smooth and generous... this is the important
  // part") -- 340ms opening (a touch slower, so it reads as "unfolding"),
  // 260ms collapsing (snappier, so it doesn't feel sluggish to dismiss).
  // Easing corrected 2026-09-09 (owner: "chips animation is very jerky") --
  // was the named `ease-out`/`ease-in` curves, which start or end quite
  // abruptly; both directions now use `cubic-bezier(0.22,1,0.36,1)`, the
  // exact smooth-deceleration curve this project's own `.reveal-box`
  // scroll-reveal already established sitewide (`app/globals.css`) for
  // "premium" motion, not a new one invented for this component. Paired
  // with the flex-direction fix on `item` above (the other real source
  // of jerkiness -- see its own comment), this removes both causes rather
  // than just retuning numbers. Same core `grid-rows-[0fr]`/`[1fr]` +
  // `overflow-hidden` + `inert` mechanism this codebase already
  // established on FabricOptions/ServicesHowWeWork -- animates real layout
  // height without ever measuring a pixel value. `motion-reduce:` gated to
  // instant (no height/opacity/transform transitions at all) per the same
  // spec.
  // `absolute` on the closed state only (real bug, found live, discovered
  // while building the dynamic-width chips above): this panel's own
  // description `<p>` has no wrap constraint, so its own max-content width
  // is its full UNWRAPPED single line (900px+ for the longer
  // descriptions) -- as an ordinary normal-flow sibling of the button,
  // that intrinsic width was feeding straight into `item`'s own
  // shrink-to-fit calculation even while the panel was visually collapsed
  // to 0 height, forcing every closed pill to whatever the widest hidden
  // description needed instead of its own short label (this was actually
  // the FIRST real bug found in this whole area, before `item`'s own
  // width became a real measured pixel value -- kept, since it's still
  // good hygiene even now that width no longer depends on it). `position:
  // absolute` on close removes it from the flow `item`'s own layout
  // considers at all; back to plain flow (no `absolute`) on open, when
  // the panel's real width should match the now-full-width card. `item`
  // carries `relative` as the positioning context for this.
  //
  // `w-full` (100% of `item`), not a hardcoded pixel value -- this WAS
  // briefly a literal `w-[320px]` (matching `listCol`'s own fixed
  // `xl:w-[320px]`), from when `item`'s own width was still driven by an
  // in-progress CSS grid-track experiment whose OWN size was influenced by
  // its children (a real, confirmed circular-dependency bug: a percentage
  // width here read that still-settling, content-dependent value every
  // frame, letting the panel's own still-unwrapped description text
  // briefly inflate the chip past 900px mid-transition). `item`'s width is
  // now a real, externally-measured pixel value (see its own comment) or
  // a plain `w-full`, never influenced by ITS OWN children's content --
  // that circular dependency no longer exists, so `w-full` is safe again,
  // and it has to be `w-full` rather than a hardcoded 320px regardless:
  // this list also renders on mobile (not desktop-only), where `item`'s
  // own real width is narrower than 320px -- a flat 320px here forced
  // real horizontal page overflow at the 360px min mobile viewport
  // (found live, confirmed via a real Playwright overflow sweep).
  detailGrid:
    "absolute grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-[260ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
  detailGridOpen:
    "grid w-full grid-rows-[1fr] transition-[grid-template-rows] duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
  detailClip: "overflow-hidden",
  // Inner fade-and-rise, delayed ~100ms after the grid track starts
  // growing (owner spec: "slightly delayed... so it feels like it
  // unfolds rather than snapping") -- opening only; collapsing has no
  // delay so the text doesn't linger visible while its own row is already
  // shrinking away underneath it. Same `cubic-bezier(0.22,1,0.36,1)` curve
  // as the height transition above, not a different one, so the height and
  // the text read as one coordinated motion rather than two competing
  // ones. `motion-reduce:` collapses both to an instant, undelayed swap.
  //
  // `px-6 pb-4` (matching `itemButton`'s own padding, now that `item`
  // itself carries none -- see its own comment) keeps the description
  // aligned under the label and gives the open card real bottom breathing
  // room. No `pt-2` any more (owner, 2026-09-09: "the gap between the chip
  // title and subline should be 8px") -- it used to stack on top of
  // `itemOpen`'s own `gap-2` (8px), so label-to-description read as 16px,
  // not the intended 8. `gap-2` alone on `itemOpen` now supplies the
  // entire gap.
  // `delay-100 duration-[240ms]` (real bug, found live, owner: "when it's
  // open and gets to the final frame, it jerks at the last moment" --
  // measured: the box itself (height, via `detailGridOpen`) finished
  // growing at ~267ms into its own 340ms transition (its own easing curve
  // visually settles a bit before the transition technically ends), but
  // this fade was still running until 100+300=400ms -- a ~130ms tail
  // where the box sat fully still while only the text kept fading in,
  // the ONE thing still visibly moving in an otherwise-settled card. Was
  // `duration-300` (400ms finish); now `delay-100 duration-[240ms]`
  // finishes at exactly 340ms, matching `detailGridOpen`'s own duration
  // precisely, so the box and the text always finish in the same frame.
  detailInner:
    "px-6 pb-4 opacity-0 translate-y-3 transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:translate-y-0",
  detailInnerOpen:
    "px-6 pb-4 opacity-100 translate-y-0 transition-[opacity,transform] delay-100 duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:delay-0",
  // md:max-w-[clamp(560px,65vw,780px)]/xl:max-w-none (owner, 2026-09-09:
  // "the subline width that we define on this page, apply it to all
  // paragraphs across pages, same way") -- this description sits in
  // `listCol` (`w-full` below `xl:`, only capped to 320px at `xl:`), so it
  // had no width constraint at all through the full 768-1279px tablet
  // range. Same fluid clamp `ourFactoryIntro.paragraph`/`ourFactoryDetails
  // .lead` already use, reused rather than a new one-off value.
  // `xl:max-w-none` restores the original uncapped behaviour at `xl:`,
  // where `listCol`'s own 320px cap already constrains it.
  itemDescription: "md:max-w-[clamp(560px,65vw,780px)] xl:max-w-none text-body-lg leading-7 text-[#838D97]",
  // Image panel: its own rounded box inside the card (Figma: 730x644, not
  // full-bleed) -- `730:644` added to MediaPlaceholder's own ratio table.
  // `hidden xl:block`: desktop-first (owner brief: "mobile I'll refine
  // separately... image panel on top" instead), so this exact box isn't
  // reused below `xl` -- OurFactoryDetails.tsx renders a plain stacked
  // mobile image instead of this crossfade stack.
  // `aspect-[730/644]` directly on this column (real bug, found live: the
  // column had no intrinsic sizing of its own, only `xl:flex-1` for width
  // -- once the 7 stacked children below are correctly `absolute` (see
  // `imageLayer`'s own comment), an absolutely-positioned child con-
  // tributes nothing to its parent's height, so without this the whole
  // column, and the section under it, collapsed. Giving the column itself
  // the same 730:644 ratio fixes that independent of the children).
  // No border any more (owner, 2026-09-09: "remove the outline"). An
  // earlier pass added `border-line-dark` because `tone="dark"` filled
  // with `bg-ink-2`, the exact same colour as this card
  // (`surface.darkRaised`) -- invisible without a border. The owner's
  // follow-up fix is a colour change instead: `imagePlaceholderFill`
  // below gives the placeholder `bg-ink` (`#121317`, the section's own
  // background, darker than the `bg-ink-2` card it sits inside) via
  // `MediaPlaceholder`'s new `placeholderClassName` override -- a real
  // colour difference is now what makes the box legible, not a hairline.
  // `rounded-none` (owner, 2026-09-09: "the main container and the image
  // container should have 0 radius") -- was `rounded-xl`, matching `card`
  // above.
  // `h-[620px]` (owner, 2026-09-09: "make the image placeholder height
  // 620px") -- was `aspect-[730/644]` (Figma's own pixel ratio). An
  // explicit height takes priority over `aspect-ratio` once both
  // dimensions are otherwise determined (this column's own width still
  // comes from `xl:flex-1`), so the two were never meant to combine --
  // this replaces the ratio outright, it doesn't add to it.
  imageCol: "relative hidden w-full overflow-hidden rounded-none h-[620px] xl:block xl:flex-1",
  // `bg-ink` (`#121317`) for the no-image placeholder fill, replacing
  // `tone="dark"`'s own `bg-ink-2` -- see `imageCol`'s own comment.
  // `MediaPlaceholder` has no built-in tone for this exact colour, so this
  // is passed via its `placeholderClassName` override prop rather than
  // inventing a third `tone` value for what is, so far, a single caller.
  imagePlaceholderFill: "bg-ink",
  // Real bug, found live: `imageLayer` used to be passed straight into
  // `MediaPlaceholder`'s own `className` prop, appending `absolute inset-0`
  // alongside `MediaPlaceholder`'s own root `position: relative` (from its
  // `media.shell` recipe) -- both position utilities landed on the exact
  // same element, and Tailwind's generated stylesheet order (not the class
  // attribute's source order) silently let `relative` win. All 7 images
  // rendered in normal document flow instead of stacked, each its own real
  // 730:644-tall box -- 7x that height, which is exactly where the whole
  // section's absurd extra height came from. Fix: `imageLayer` is now a
  // dedicated WRAPPER `<div>` around each `MediaPlaceholder`, never merged
  // into `MediaPlaceholder`'s own className -- the wrapper owns
  // `position: absolute` (nothing else claims it), `MediaPlaceholder`
  // keeps its own untouched `relative`, no collision.
  //
  // All 7 stacked in the same box, every one mounted from first render
  // (owner spec: "preload all 7 detail images so the swap is instant") --
  // only `opacity` transitions, no slide, no remount, so the active image
  // is always the one already-decoded image simply becoming visible.
  // No opacity on the shared base -- `imageLayerActive`/`imageLayerInactive`
  // below are mutually exclusive, never combined in the same class string
  // (the same class of bug as the position collision above: two opposite
  // opacity utilities present at once would again leave the stylesheet's
  // own generation order to silently decide the winner).
  imageLayer: "absolute inset-0 transition-opacity duration-[250ms] ease-in-out motion-reduce:transition-none",
  // Mobile-only variant (owner, 2026-09-10: "tha paralax animation is not
  // working on the chip changing some jerky effect") -- the mobile crossfade
  // stack layers `mobileImageZoom`'s own 1400ms zoom-settle transform
  // UNDER this opacity fade; at the shared 250ms duration, a newly-active
  // image reached full opacity while still ~82% through its own zoom,
  // reading as a fully-visible photo that kept visibly drifting/settling
  // for another second -- two motions finishing at different times instead
  // of one coordinated one. `duration-[1400ms] ease-out` matches
  // `mobileImageZoom` exactly, not the shared desktop `imageLayer` above
  // (unaffected, its own crossfade has no zoom to coordinate with).
  mobileImageLayer: "absolute inset-0 transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none",
  imageLayerActive: "opacity-100",
  imageLayerInactive: "opacity-0",

  // ---------------------------------------------------------------------
  // Mobile/tablet only (below `xl:`), 2026-09-10 rebuild -- Apple's "Take a
  // closer look" mobile pattern (owner-supplied reference, apple.com/
  // apple-watch-series-12, "Take a closer look"), not the accordion `card`
  // above (now `hidden` below `xl:`, see its own comment). A full-bleed,
  // FIXED-SIZE image (`mobileMediaWrap`'s own aspect ratio never changes),
  // a horizontally-scrollable row of pill tabs floating over its bottom
  // edge, and a short caption below -- switching items only ever
  // crossfades the image and swaps the caption text, it never changes
  // this block's own height. Reuses `imageLayer`/`imageLayerActive`/
  // `imageLayerInactive` above verbatim for the crossfade (those three
  // tokens carry no breakpoint restriction of their own) and `itemIconWrap`/
  // `itemIconWrapOpen`/`itemIconWrapClosed`/`itemIcon`/`itemLabel`/
  // `itemLabelOpen` above verbatim for each pill's own "+ icon when
  // closed, bold label only when open" treatment -- the owner's own
  // clarification was to reuse that existing behaviour, not invent a new
  // "swatch" icon.
  //
  // Sibling of `inner` (outside its own `container-p`), not nested inside
  // it -- the same "background/media lives on an unconstrained outer
  // wrapper, text content gets its own padded wrapper" split this page
  // already uses for `OurFactoryTeam`'s hero photo and `InsideFactory`'s
  // gallery, needed here so the image can bleed truly edge-to-edge rather
  // than only to `inner`'s own container-p inset.
  // `mt-12` (48px, owner, 2026-09-10: "the space from the image to top
  // subline should be 48px") -- was `mt-8`/32px, an initial judgement call
  // (no Figma frame exists for this new mobile-only pattern).
  mobileWrap: "xl:hidden mt-12",
  // Fixed aspect ratio (judgement call, same caveat as above) -- this is
  // the one thing that must never change size as `openIndex` changes, so
  // it's a plain CSS ratio, not content-driven.
  mobileMediaWrap: "relative w-full overflow-hidden aspect-[4/5]",
  // Bottom-anchored gradient purely for pill/caption legibility over
  // arbitrary photography -- the same reasoning the Apple reference itself
  // uses (its own caption + pill row sit on a matching scrim).
  // `pointer-events-none` so it never intercepts a tap meant for the
  // overlay/image underneath.
  mobileScrim: "pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent",
  // The caption + pill row, stacked in reading order (caption ABOVE the
  // pills -- owner, 2026-09-10: "the selected chip should open the text
  // above not below") -- one bottom-anchored column inside the fixed-ratio
  // media box, replacing the caption's earlier position as a separate <p>
  // below the whole image block.
  mobileOverlay: "absolute inset-x-0 bottom-0 flex flex-col gap-3 px-5 pb-5",
  // `no-scrollbar` -- the same sitewide utility every other horizontal
  // scroller on this page already uses. `items-center` (cross-axis) so
  // pills of different heights (open vs. closed, before the icon-collapse
  // transition finishes) stay vertically aligned. No longer `absolute`
  // itself (moved onto the shared `mobileOverlay` wrapper above, alongside
  // the caption) or its own `px-5 pb-5` (same reason).
  mobilePillRow: "no-scrollbar flex items-center gap-2 overflow-x-auto",
  // `shrink-0` (never compresses in the scroll row) `whitespace-nowrap`
  // (never wraps, matching `itemLabel`'s own established rule for a
  // collapsed pill). Semi-opaque dark backing so the pill reads against
  // any photo, not just a specific one -- `bg-[#1f2126]/90`, the same base
  // dark-surface literal `item`'s own closed state already uses (see that
  // token's own comment), now with opacity since this sits over a photo
  // rather than the card's own solid background.
  // Same easing AND same animated properties as desktop's own `item`
  // open/close transition (owner, 2026-09-10, twice: "use the same
  // animation for the expanded chip that we used on the desktop" / "this
  // chip animation is different... please use the same") --
  // `cubic-bezier(0.33,1,0.68,1)`, the curve that replaced a jerkier one
  // specifically because it keeps more real travel late in the transition
  // (see `item`'s own comment for the full reasoning). `width` now joins
  // `background-color` in the transition list -- without it, this pill had
  // no definite width to animate at all (`width: auto` can't be
  // transitioned by CSS, the exact limitation `item`'s own comment already
  // documents), so only the colour was ever really morphing, not the
  // shape, unlike desktop's chip. `OurFactoryDetails.tsx` now measures
  // both the open and closed pixel width per item (the same hidden-clone
  // technique `chipWidths` already uses for desktop) and applies it as an
  // inline `style`, giving this transition two real values to animate
  // between. Duration itself is asymmetric, also matching desktop: 340ms
  // opening (`mobilePillOpen`), 260ms collapsing (`mobilePillClosed`).
  // `min-w-0` -- real bug, found live, 2026-09-10 ("when expand the last
  // chip, it shows some weird spacing from the right"): flex items get an
  // implicit `min-width: auto` by default, which floors a shrinking item
  // at its own CONTENT's natural (unwrapped, `whitespace-nowrap`) width,
  // no matter what explicit `width` is requested. The open-state label
  // (no icon) still measured a genuinely narrower natural width than the
  // closed state for several items, but without `min-w-0` the browser
  // silently clamped the pill back UP to its label's own intrinsic
  // minimum instead of honouring the measured, narrower open width --
  // confirmed live via `getBoundingClientRect()` reporting a wider box
  // than the inline `style.width` it was actually given. The extra,
  // un-shrunk width on the LAST pill is exactly what pushed the
  // scrollable row's own content past where the closed measurement
  // expected it to end, reading as stray space at the row's right edge.
  mobilePill:
    "flex min-w-0 shrink-0 items-center whitespace-nowrap rounded-pill px-4 py-3 transition-[width,background-color] ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none",
  // Open: a lighter backing (same "lighter, not darker" emphasis direction
  // `item`'s own closed-hover state already established) so the active
  // pill visibly stands out from its neighbours without needing a second
  // colour system.
  mobilePillOpen: "bg-[#2a2d33] duration-[340ms]",
  mobilePillClosed: "bg-[#1f2126]/90 duration-[260ms]",
  mobilePillLabel: "text-sm text-paper",
  mobilePillLabelOpen: "font-semibold",
  // Now a real background chip, not plain body copy (owner, same message:
  // "that should have a background as shown in the reference") -- same
  // semi-opaque dark backing as a closed pill (`bg-[#1f2126]/90`), white
  // `text-paper` (was the page's own muted `#838D97`, illegible-adjacent
  // against a dark photo backing and inconsistent with the reference's
  // own white caption text). `line-clamp-3` caps a long description from
  // growing the box; the paired `min-h-[60px]` (3 lines at this text
  // size's own `leading-5`/20px line-height) guarantees a SHORT
  // description doesn't leave a shorter chip than a long one -- together
  // these two are what make switching the active item never change this
  // block's own height, without a JS measurement effect (unlike `card`'s
  // own chip-width machinery, deliberately not needed here).
  mobileCaption: "min-h-[60px] rounded-2xl bg-[#1f2126]/90 px-4 py-3 text-sm leading-5 text-paper line-clamp-3",
  // Same zoom-and-settle transform/timing as `ParallaxMedia` (owner,
  // 2026-09-10: "add the same animation that we have on top factory
  // images, when the chip changes that animation applies") -- not that
  // component directly, since its own `useRevealOnView` trigger is a
  // one-shot IntersectionObserver (plays once when the box first scrolls
  // into view, then never again), not something that replays every time a
  // different chip becomes active. Keyed on `isOpen` in
  // `OurFactoryDetails.tsx` instead: starts zoomed in, settles to rest
  // whenever this layer becomes the active one, resets when it isn't, so
  // it replays on every tap. `prefers-reduced-motion` is handled by the
  // sitewide rule in `globals.css` (collapses `transition-duration`), same
  // as `ParallaxMedia` itself relies on -- no separate check needed here.
  mobileImageZoom: "absolute inset-0 scale-[1.12] translate-y-[3%] transition-transform duration-[1400ms] ease-out",
  mobileImageZoomActive: "scale-100 translate-y-0",
};

/* --- OurFactoryTeam (/our-factory section 10) ------------------------------ */
// Figma desktop node 917:231 ("Content"), "Skilled hands behind every
// stitch" -- centred heading + subline, a full-bleed hero photo, then a
// gallery of 4 staggered-height photos: a chevron-driven scroller at true
// desktop (`xl:`+), a native swipeable slider with dot pagination at mobile
// and tablet (owner, 2026-09-09: "on tablet ... the images below should
// have slider with the [chevron] and add dots under it", "on mobile ...
// treat the below section proper slider" -- the gallery had no responsive
// handling at all before this, so on an actual touch device it couldn't
// scroll: `useDesktopChevronScroller`'s own click-driven mechanism only
// responds to mouse events, per its own header comment, "user can only
// scroll by clicking" -- the same reason InsideFactory/Exhibitions already
// split into two genuinely different mechanisms per breakpoint instead of
// one that's supposed to cover every input type).
export const ourFactoryTeam = {
  section: "bg-paper",
  // 160px top (owner, 2026-09-09: "this section will have 160px gap from
  // the top") -- the section directly above (`certified.mobileSectionOurFactory`
  // /`desktopSectionOurFactory`) already carries `pb-0` at every breakpoint
  // (owner, same session: "audited safety will not have any space from the
  // bottom" -- originally about the section above THAT one, but the
  // compliance-logo row inherited the same `pb-0` treatment), so this
  // section's own top padding is the sole source of the gap between them,
  // not two paddings summing past the intended 160px.
  // No `max-w-[1440px]`/`mx-auto` cap here any more (owner, same day: "make
  // the image bleed image edge to edge") -- this container used to cap and
  // centre `heroWrap` along with everything else, so the hero photo only
  // ever filled the 1440px reference width and showed the page's own
  // background on either side above that, not a genuine edge-to-edge
  // bleed. `heroWrap`/`galleryWrap` are now real full-width siblings of
  // this (now uncapped) flex column; `headingCol`/`galleryWrap` each carry
  // their own centring/cap instead (see their own comments), the same
  // "background vs. content" split every other full-bleed section on this
  // site already uses. No shared `gap` any more either -- headingCol-to-
  // hero (72px) and hero-to-gallery (40px, see `galleryWrap`'s own
  // comment) are two different values now, not one gap reused for both.
  // `max-md:pt-0` (owner, 2026-09-10, mobile-only review: "remove the space
  // from the bottom of certified section") -- the confirmed 160px top gap
  // was applying at every breakpoint, including real mobile, where no
  // Figma frame for this section exists yet to confirm a smaller number
  // against; zeroed rather than guessed at a different mobile value, since
  // the section above (`certified.mobileSectionOurFactory`) already reads
  // flush against whatever comes before it. `md:pt-[160px]` restores the
  // confirmed desktop/tablet value explicitly. Real mobile gained its own
  // real value the same day, same review, in a follow-up correction:
  // `max-md:pt-[72px]` (owner: "skilled hands title should have 72px space
  // from the top") -- 0px had removed the gap entirely instead of matching
  // this project's own standing mobile section-to-section rhythm.
  // `max-md:pb-[48px]` (owner, 2026-09-10, same review, pointing at the
  // boundary with the dark Faq section right after: "skilled hands bottom
  // to faq top ... make it 48px") -- the confirmed 160px bottom gap was
  // also applying at every breakpoint below `md:pt-[160px]`'s own real
  // mobile/tablet split above; `md:pb-[160px]` restores the confirmed
  // desktop/tablet value explicitly.
  inner: "flex w-full flex-col items-center max-md:pt-[72px] md:pt-[160px] max-md:pb-[48px] md:pb-[160px]",
  headingCol: "flex flex-col items-center gap-4 text-center max-w-[812px]",
  heading: "text-h1 text-text",
  // 22px/32px (Figma's own real size for this subline, not this project's
  // `text-body-lg` token, which is 20px/28px) -- a one-off literal per this
  // table's established "confirmed Figma value with no scale match" rule.
  // `#17191e` matches this project's own sitewide light-section subline
  // colour (`text-subline` token's own hex). No colour split between the
  // bold and regular spans (unlike the dark-section "colour carries the
  // emphasis" rule several other /our-factory paragraphs follow) -- this
  // node's own two spans are the same colour, only the FIRST is semibold;
  // confirmed via `get_design_context`, not assumed from the dark-section
  // precedent.
  // max-md:text-[1.125rem]/leading-6 (owner, 2026-09-09, mobile-only
  // review: "700+ team text should be 18px 24") -- 18px/24px below md;
  // md:/xl: keep the original 22px/32px unchanged. max-md:px-5 (owner,
  // 2026-09-10, mobile-only review: "700+ team subline should have 20px
  // gap from both right and left") -- this section's own `inner`/
  // `headingCol` carry no side padding at all (deliberately, for the hero
  // photo's edge-to-edge bleed below), so this text was touching the
  // viewport edges directly on real mobile; scoped to the subline itself
  // (not `headingCol`, which would also widen the heading's own already-
  // comfortable 2-line wrap unnecessarily).
  subline:
    "max-md:px-5 max-md:text-[1.125rem] max-md:leading-6 md:max-w-[750px] md:text-[1.375rem] md:leading-8 text-[#17191e]",
  sublineBold: "font-semibold",
  // Full-bleed hero photo -- a sibling of the (centred, capped) heading
  // column, not nested inside it, since Figma's own frame spans the full
  // 1440px width unlike the heading/subline above it. `mt-[72px]` is the
  // heading-to-hero gap (this node's own real Figma value), now a margin
  // of its own since `inner` no longer supplies a shared `gap` (see that
  // token's own comment). Genuinely uncapped `w-full` -- unlike
  // `galleryWrap` below, this really does bleed to the true viewport edge
  // on screens wider than 1440px (owner: "make the image bleed image edge
  // to edge"), since `inner`'s own cap was removed in the same change.
  // `max-md:mt-8` (owner, 2026-09-09, mobile-only review: "700+ to image
  // gap should be 32px") -- was the shared 72px at every breakpoint;
  // md:/xl: keep 72px unchanged.
  heroWrap: "max-md:mt-8 md:mt-[72px] w-full",
  // Hero ratio, mobile/tablet overrides only -- the base `ratio="8:5"` prop
  // (an unprefixed `aspect-*` class, already 1440:900's own exact reduced
  // fraction -- reused rather than a redundant duplicate ratio entry)
  // already covers true desktop (`xl:`+) untouched. `max-md:aspect-[13/17]`
  // (owner, 2026-09-09: "on mobile, increase the bleed image height" -- no
  // exact figure given, a
  // judgement call: 4:3 (0.75 ratio, previous mobile value); then, same
  // day: "the main image should have large height maybe 150px more what
  // it has now" -- computed at this page's own 390px mobile reference
  // width, already used throughout this session's mobile work: 4:3 gives
  // 293px there, this ratio gives ~443px, +150px). `md:max-xl:aspect-
  // [1024/740]` (owner, same day: "on tablet ... increase the image
  // height upto 100px" -- computed at this page's own 1024px tablet
  // reference width: base height there is 640px, this ratio gives 740px,
  // +100px). `md:max-xl:`, not a bare `md:`, so it doesn't also win at
  // `xl:`+ where the unprefixed base should -- same bounded-range
  // technique `ourFactoryProcess.itemMediaMobile` already uses for its
  // own tablet-only ratio override.
  heroRatioOverride: "max-md:aspect-[390/443] md:max-xl:aspect-[1024/740]",
  // Desktop-only (`xl:`+) chevron-driven scroller -- same
  // `useDesktopChevronScroller` mechanism `ourFactoryProcess`/
  // `insideFactory`/`exhibitions` already use for their own overflowing
  // galleries, not a new one. `pt-[40px]` (owner, 2026-09-09, confirming
  // this node's own real Figma gap: "the gap from bleed image to under
  // images should be 40px from the top") is this element's own margin
  // from the hero photo above it, not a shared `gap`. `pl-[80px]`/
  // `gap-[40px]` (on `galleryRow` below) are this node's own other real
  // measurements (first card insets 80px from the left, 40px between
  // cards). `mx-auto max-w-[1440px]`, unlike `heroWrap` above -- this
  // row's own left inset must stay pinned to the site's real 1440px
  // reference width (the same "full-bleed horizontal scroller" rule this
  // project already applies to `insideFactory`/`exhibitions`/`howItWorks`'
  // own scrollers, docs/02-design-system.md) or its 80px inset drifts
  // further from every other section's on screens wider than 1440px --
  // deliberately NOT bled edge-to-edge the way `heroWrap` is, since only
  // the hero photo was asked for that treatment. `hidden xl:block`: this
  // mechanism is desktop-only now (see `sliderWrap` below for the mobile/
  // tablet replacement).
  galleryWrap: "relative mx-auto hidden w-full max-w-[1440px] cursor-none overflow-hidden pt-[40px] xl:block",
  galleryRow: "no-scrollbar flex items-start gap-[40px] overflow-x-hidden scroll-smooth pl-[80px]",
  // 500px wide, fixed per-item height (600px "tall" / 420px "short",
  // alternating per this node's own real per-item measurements) -- not a
  // MediaRatio: the ratio itself differs per item at one shared width, so
  // an aspect-ratio class can't express it, and a literal pixel height is
  // simpler than inventing a 4th one-off ratio token for a single stagger.
  item: "shrink-0 w-[500px]",
  itemHeight: {
    tall: "h-[600px]",
    short: "h-[420px]",
  },
  // Mobile/tablet gallery, rebuilt 2026-09-10 to match the homepage
  // Exhibitions section's own mobile carousel style exactly (owner: "for
  // them use the same component we used for homepage exhibition section
  // images style") -- was a native scroll-snap track with static
  // per-item tall/short heights (owner, 2026-09-09), replaced with
  // Exhibitions' own centred-active-card mechanism: the nearest-to-centre
  // card grows to `ACTIVE_HEIGHT`, its neighbours shrink to
  // `INACTIVE_HEIGHT`, animated continuously as the reader swipes
  // (`OurFactoryTeam.tsx`'s own `Slider`, mirroring `Exhibitions.tsx`'s
  // `MobileCarousel` component-for-component, including its own
  // `MediaPlaceholder` instead of this page's usual `ParallaxMedia` -- the
  // hero photo above keeps `ParallaxMedia` unchanged, only these 4 gallery
  // images below it changed). `sliderWrap` (outer spacing, owner-tuned
  // separately) is unaffected.
  sliderWrap: "w-full pt-6 xl:hidden",
  // Same centred-snap track as `exhibitions.mobileTrack`: `items-center`
  // (not `items-start`) plus a calculated `px-[min(40px,calc((100%-card)/2))]`
  // inset centres the active card with its neighbours peeking on both
  // sides, instead of the previous left-aligned `px-5` track. `h-[340px]`/
  // `md:h-[532px]` cap the track to the active card's own height at each
  // tier (`ACTIVE_HEIGHT_MOBILE`/`ACTIVE_HEIGHT_TABLET` in
  // `OurFactoryTeam.tsx`, kept in sync since both come from the same
  // Exhibitions-derived values).
  sliderTrack:
    "no-scrollbar flex h-[340px] items-center snap-x snap-mandatory overflow-x-auto px-[min(40px,calc((100%-300px)/2))] md:h-[532px] md:px-[min(40px,calc((100%-469px)/2))]",
  // 300px mobile / 469px tablet -- Exhibitions' own exact card widths, not
  // this section's previous 300/420px scaled-from-desktop guess. Height is
  // no longer a Tailwind class at all (unlike the old `tall`/`short`
  // tokens below): `Slider`'s own scroll handler sets it directly per
  // frame via inline style, animating between `ACTIVE_HEIGHT`/
  // `INACTIVE_HEIGHT`, the same technique `Exhibitions.tsx`'s own
  // `MobileCarousel` uses.
  sliderItem: "w-[300px] shrink-0 snap-center md:w-[469px]",
  // Reuses `cardCarousel.dot`/`dotActive`/`dotInactive` directly for the
  // dots themselves (same one-dot-per-real-item pattern already
  // established there) -- only this row-layout wrapper is new.
  sliderDotsRow: "mt-8 flex items-center justify-center gap-1.5",
};

/* --- ServicesHero (/services section 1) ------------------------------------ */
// Figma desktop node 729:139 (owner brief, 2026-09-07: "same design that we
// have for home, same marquee at the bottom"). A simpler variant of the
// homepage `hero` recipe above, not a copy of it -- no eyebrow, no video
// block, so it gets its own recipe rather than forcing unused props onto
// `hero`'s own shape. Desktop-only for now (owner: "desktop design is
// ready, I'm handling mobile separately, build desktop to the design and
// keep it responsive-safe") -- mobile/tablet values below are a reasonable,
// non-breaking fallback (same container-p + stacked-buttons pattern every
// other section uses), not read from a real mobile Figma frame yet.
export const servicesHero = {
  // get_metadata's literal Figma number for the bottom gap is 126px (578px
  // Banner frame - 140px top - 312px of content), which was used verbatim
  // at first. Owner, 2026-09-07: still reading as cut off above the fold on
  // a real laptop viewport even after the divider-line bug (below) was
  // fixed. Two fixed-padding passes followed (126->80px bottom, then
  // 140/80/48 -> 96/48/32px top/bottom/gap), each tuned against one
  // specific viewport height and each still wrong on a different one --
  // any fixed-padding number is fighting a moving target, since "above the
  // fold" is the full viewport height minus the 87px sticky header, which
  // varies by the visitor's own browser chrome. Owner, 2026-09-07 (second
  // report): the trimmed version now falls short of the fold instead,
  // leaving visible white space above the next section. Fixed by making
  // the section genuinely viewport-sized (`xl:min-h-[calc(100vh-87px)]`,
  // 87px being this site's own fixed header height, same literal already
  // used elsewhere for this -- see e.g. `stickyGallery`'s own top-offset
  // note) with `xl:justify-between` distributing `bannerInner` and the
  // Marquee to the section's own top and bottom edges -- so the section
  // always exactly fills the fold and the two content blocks never need
  // their own tuned insets again. `bannerInner`'s own top/bottom padding
  // stays only as the minimum breathing room against the header/marquee,
  // not as what determines the section's total height any more.
  //
  // `min-h-[100vh]`, not `calc(100vh-87px)` (owner, 2026-09-07: true
  // overlay from rest -- see `header.base`'s own comment): the header is
  // now `position: fixed`, so it no longer reserves 87px of the viewport
  // for this section to subtract -- this section's own box already starts
  // at true y=0 and should fill the genuine full viewport height, with the
  // header floating on top of it rather than pushing it down.
  // `bannerInner`'s own top padding gets the same header-height-plus-
  // original-value treatment as `hero.bannerInner` above, read live off
  // the header's own `offsetHeight` (see that recipe's own comment for
  // the current figures): `pt-[115px]` = 67px + 48px,
  // `xl:pt-[132px]` = 68px + 64px.
  section: "bg-ink text-paper xl:flex xl:min-h-[100vh] xl:flex-col xl:justify-between",
  // gap-12 (48px, owner, 2026-09-08: "title and ctas should have 48px
  // gap" -- was gap-8/32px) -- also Figma's own real value for this node
  // (729:139's Content div is `gap-[48px]`, confirmed via
  // get_design_context), so this corrects a gap that had drifted from the
  // design's own real spec, not just a taste change.
  bannerInner: "container-p flex flex-col gap-12 pt-[115px] pb-12 xl:gap-12 xl:pt-[132px] xl:pb-8",
  // 832px H1 wrap width in Figma is exactly 52rem -- identical value to
  // `hero.heading`, reused directly rather than redefined.
  // No line-height override any more (real bug, found live, 2026-09-08:
  // "the packaging word is still being cut") -- a previous pass (owner,
  // 2026-09-07: "hero banner title line height should be the same as
  // other plp hero banner titles") had borrowed CategoryBanner's own h1
  // line-height LITERALLY (`leading-[38px] md:leading-[64px]`), but that
  // pairing was tuned for CategoryBanner's own, SMALLER font-size at each
  // breakpoint (`categoryBanner.h1` is `text-[1.875rem]`/30px mobile,
  // `md:text-[3.375rem]`/54px desktop -- NOT `text-display`'s 32px/64px).
  // Reused as a bare number rather than re-derived for this heading's own
  // actual (larger) font-size, `md:leading-[64px]` on a 64px font is a
  // 1.0 ratio -- far too tight for Figtree's real ascender/descender
  // metrics at that size, so `overflow-hidden` word-reveal masks (sized to
  // each word's own tight layout box, see `textReveal.mask`'s own comment)
  // clipped the descenders on any word with a "g"/"p"/"y" -- "packaging"
  // (three: p, g, g) most visibly. Removing the override entirely restores
  // `text-display`'s own bundled 1.09375 ratio (ServicesHero.tsx appends
  // `text-display` alongside this token) -- which is ALSO Figma's own real
  // spec for this exact node (729:139: 64px text, 70px line-height,
  // 70/64 = 1.09375, confirmed via get_design_context), not a coincidence:
  // `text-display`'s ratio was itself derived from this same design system's
  // Figma source. Scales correctly at every breakpoint (mobile through
  // 1920+) instead of two borrowed fixed pixel values that only ever
  // matched CategoryBanner's own different font-sizes.
  heading: "max-w-[52rem]",
  // Figma's real desktop design shows both buttons (stacked full-width on
  // mobile, side by side from xl, same shape as `hero.buttons`) -- mobile
  // itself now hides the secondary one the same way homepage's does (owner,
  // 2026-09-07: "Remove the download catalog cta" on mobile), via the
  // shared `hero.ctaSecondaryWrap` wrapper in `ServicesHero.tsx` rather than
  // a change to this token.
  buttons: "flex flex-col gap-4 xl:flex-row xl:items-center",
  ctaPrimary: "w-full xl:w-auto",
  // Ticker: the exact same "Fully Custom Offerings" Marquee as homepage
  // Hero (reused component, not rebuilt). Figma's own literal top gap here
  // measured 72px (get_metadata), not homepage's 40px (Marquee's own
  // `basePaddingDefault`) -- first built as a `padded={false}` Marquee
  // inside this custom 72/32px wrapper. Reverted the same day (owner,
  // 2026-09-07: still cutting off above the fold on a real laptop viewport)
  // -- that extra 32px on top of `bannerInner`'s own trimmed bottom padding
  // (see that key's own comment) was still too tall. `Marquee` now renders
  // with its own plain defaults (`padded` unset, i.e. true) exactly like
  // homepage Hero's own usage -- no wrapper, no override -- which is the
  // real "standard" ticker spacing already established elsewhere in this
  // codebase, not a second bespoke number tuned to one specific Figma
  // frame's real-estate.
  // `divider={false}` (real bug, found live, owner report: "there is some
  // line coming under the marquee text remove it") -- Marquee's default
  // `divider: true` bottom border is correct for homepage Hero's own
  // ticker (Figma shows one there), but this Figma frame (729:139) has no
  // divider at all under this ticker; confirmed via computed style before
  // the fix (`border-bottom-width: 1px` on `.marquee`) that this was a real
  // rendered line, not a misreading.
  //
  // Mobile ticker fallback (owner, 2026-09-07: "fully custom offering make
  // it same as used on the homepage" -- Hero's own `ScrollSpotlightList`
  // treatment, see ServicesHero.tsx), then an experimental tweak the same
  // day ("make the fully custom font to 24px auto and make the entire
  // content center-aligned and see how it looks") -- originally a
  // services-page-only fork of `hero.tickerMobile*`. Now the shared
  // version instead (owner, 2026-09-10: "I have created a different
  // similar variant on services page, let's use that here" -- Hero.tsx
  // now reads these same tokens directly, `hero.tickerMobile*` removed as
  // the now-redundant original it forked from) -- `items-center`/
  // `text-center` dropped from both the block and the list (same owner
  // turn: "make it left align on home and services both", overriding the
  // center-align experiment above) so this is left-aligned on both pages
  // it renders on. 24px on the label (`text-[1.5rem]`) with
  // `leading-normal` ("auto" -- CSS has no literal auto line-height
  // keyword, `normal` is its real equivalent) unchanged from that
  // experiment; only the alignment reverted.
  // pb-[60px] (owner, 2026-09-08: "12px more space from the bottom of the
  // content ... on mobile only" -- was pb-12/48px; desktop Marquee's own
  // spacing is untouched). Applies to both pages now too.
  tickerMobile: "container-p flex flex-col gap-8 pt-12 pb-[60px] md:hidden",
  tickerMobileLabel: "text-[1.5rem] font-medium leading-normal",
  // 28px (owner, 2026-09-08: "16px more" then "reduce 8px" -- net +8px on
  // the gap-5/20px, 2026-09-07 baseline).
  tickerMobileList: "flex flex-col gap-7",
  // Owner, 2026-09-08: item list ("Design & Color" and the remaining
  // paired items) sized up to 30px/34px -- label above it stays 24px/auto,
  // this is the list only.
  tickerMobileItem: "text-[1.875rem] font-normal leading-[34px] text-[#838D97]",
};

/* --- ServicesIntro (/services page, section 2) ---------------------------- */
// Figma desktop node 733:529: a light section, two columns at `xl:` --
// heading + paragraph (620px) on the left, a plain image placeholder
// (400x296, "50:37" ratio -- see MediaPlaceholder) on the right, `gap-
// [170px]` between them. get_metadata confirmed section padding
// `pt-[160px] pb-[60px] px-[80px]` (px-[80px] is `container-p`'s own
// desktop inset, reused, not redeclared) and a `gap-[40px]` between the
// heading and paragraph.
//
// Desktop-only for now, same as `servicesHero` above -- no mobile Figma
// frame exists yet for this page. Mobile/tablet values are a
// responsive-safe fallback (stacked column, `container-p`'s own padding,
// image below the text) rather than a confirmed design.
// Rebuilt 2026-09-10 to a new Figma frame, desktop node 886:181 (owner: "a
// factory you can buil section change it to this style"). `get_design_context`
// confirmed real desktop insets of pl-[300px]/pr-[118px] (genuinely
// asymmetric, not `container-p`'s own uniform 80px -- the same kind of
// value `ourFactoryIntro.inner`'s own pl-260/pr-118 already established for
// this page's near-identical layout shape) and pt-[160px]/pb-[120px], an
// 80px gap between the text block and the stats row, a 32px heading-to-
// paragraph gap, and an 841px text column. No mobile Figma frame exists for
// this new design either (same "desktop-only for now" status the previous
// build already had) -- mobile/tablet below `xl` fall back to
// `container-p`'s own literal insets, same pattern `ourFactoryIntro.inner`
// uses for its own identical gap.
//
// Heading reuses `text-h1`/`text-paper` (54px/64px/500, matches exactly,
// the dark-section mirror of `ourFactoryIntro.heading`'s own `text-h1`/
// `text-text` pairing on light). Paragraph's 26px/36px has no matching
// type-scale step, so it's a scoped arbitrary value (flagged), layered with
// this project's own dark-section subline colour (`#838D97`, standing rule,
// see docs/02-design-system.md) -- the literal dark-section mirror of
// `ourFactoryIntro.paragraph`'s own light-section `text-subline`. Stat
// numbers reuse `text-h1`/`text-paper` again (also 54px/64px/500 in Figma);
// stat captions are `text-body-lg` (20px, matches) with `leading-7`
// overriding its own shorter default line-height to Figma's real 28px --
// the same "token size, arbitrary leading override" pattern
// `ourFactoryIntro.statCaption` already establishes, on dark instead of light.
export const servicesIntro = {
  section: "bg-ink",
  // Built by hand rather than composing `container-p` (a single shorthand
  // `pl`/`pr` utilities at `xl:` can't reliably out-specificity in the
  // compiled stylesheet -- the same real bug `ourFactoryIntro.inner`'s own
  // comment already documents for this identical asymmetric-inset shape).
  // `px-5`/`md:px-8` reproduce `container-p`'s own literal mobile/tablet
  // insets directly instead. `md:pt-[88px]` (owner, 2026-09-10: "on
  // tablet, add 40px more space from the title" -- was the same flat
  // `py-12`/48px real mobile uses, +40) and `md:gap-16` (owner, same
  // message: "add 24px more gap from the top of the separator" -- the
  // text-block-to-stats-row gap, `gap-10`/40px at every other tier, +24 on
  // tablet only) are both tablet-only tiers; real mobile and desktop
  // (`xl:gap-20`/`xl:pt-[160px]`) are unaffected. `xl:pl-[320px]` (owner,
  // 2026-09-10: "make it 320 from left" -- was 300px).
  inner:
    "mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-5 py-12 md:gap-16 md:px-8 md:pt-[88px] xl:gap-20 xl:pb-[120px] xl:pl-[320px] xl:pr-[118px] xl:pt-[160px]",
  textCol: "flex flex-col gap-6 xl:w-[841px] xl:gap-8",
  heading: "text-h1 text-paper",
  // 24px/32px on real mobile (owner, 2026-09-10: "subline font size should
  // be 24 by 32") -- `text-2xl`/`leading-8` match exactly; tablet/desktop
  // keep the original 26px/36px (`md:text-[1.625rem] md:leading-9`).
  // `md:max-w-[clamp(560px,65vw,780px)]`/`xl:max-w-none` (owner,
  // 2026-09-09: "the subline width that we define on this page, apply it
  // to all paragraphs across pages, same way") -- `textCol` is only capped
  // at `xl:` (841px there), so this paragraph had no width constraint
  // through the full 768-1279px tablet range. Same fluid clamp
  // `ourFactoryIntro.paragraph` already uses.
  paragraph:
    "text-2xl leading-8 md:max-w-[clamp(560px,65vw,780px)] md:text-[1.625rem] md:leading-9 xl:max-w-none text-[#838D97]",
  // Regular weight, not bold (owner, 2026-09-10: "highlight 'low minimums
  // and worldwide delivery' with regular font" / "make it regular font
  // too 'cut-and-sew manufacturer in Sialkot, Pakistan'") -- was
  // `font-semibold` with no colour override (Figma's own literal spec, see
  // this section's header comment), which was the phrase's only visual
  // distinction from the surrounding grey paragraph. Now the emphasis is
  // colour, not weight: `text-paper` (white) against the paragraph's own
  // `#838D97`, same weight as the rest of the sentence.
  paragraphBold: "font-normal text-paper",
  // Stacks below `md:`, side by side from `md:` up -- the same breakpoint
  // `ourFactoryIntro.statsRow` already uses for its own identical 2-stat
  // shape. `gap-6` (24px) on real mobile only -- owner, 2026-09-10: "17+
  // and 100,000 should have 24px from top and bottom of the separator,"
  // where "top" is this stacking gap (between the two stat columns) and
  // "bottom" is `statCol`'s own divider-to-value gap below. `md:gap-12`
  // (48px, Figma's own confirmed desktop row gap) restores the original
  // flat value once the row switches to side-by-side, unaffected.
  statsRow: "flex flex-col gap-6 md:flex-row md:items-center md:gap-12",
  // Column max-width only, passed as `GradientStat`'s own `className` --
  // the rest of the stat block (gap, divider, value, caption) now lives in
  // the shared `gradientStat` recipe (components/ui/styles.ts, above
  // `ourFactoryIntro`) rather than duplicated here (owner, 2026-09-10:
  // "these stats with the orange separator should be one component and
  // used wherever this comes").
  statCol: "md:max-w-[342px]",
};

/* --- ServicesHowWeWork (/services page, section 3) ------------------------- */
// Figma desktop node 750:770: a centred intro (heading + subheading), 3
// "path" cards (OEM Production / ODM Development / Private Label), and a
// closing note with an accent-orange asterisk icon. get_metadata confirmed
// section padding `pt-[160px] pb-[80px] px-[80px]` (px-[80px] is
// `container-p`'s own desktop inset, reused not redeclared), a `gap-
// [72px]` between the intro block and the cards row, `gap-[140px]` between
// the cards row and the closing note, and each card's own image-to-text
// `gap-[32px]`.
//
// Desktop-only for now, same as `servicesHero`/`servicesIntro` above -- no
// mobile Figma frame exists yet. Cards use a real CSS grid (1 column below
// `xl`, 3 from `xl`) rather than Figma's fixed 397px card widths, so the
// row reflows instead of overflowing at narrower widths -- the same
// "responsive-safe, not read from a confirmed mobile design" caveat as
// every other section on this page.
export const servicesHowWeWork = {
  section: "bg-paper",
  // No `gap` here any more -- a uniform flex `gap` on this wrapper doesn't
  // let its two real gaps differ (72px above the cards row, 140px above
  // the closing note), so it was wrongly applying 72px to both (real bug,
  // owner report 2026-09-07: "should have the 140px gap from the top
  // content"). Each of `pathsGrid`/`noteWrap` now owns its own top margin
  // instead -- see those keys' own comments.
  // `pt-0` (owner, 2026-09-07: "how we work top gap should be 72px" --
  // first set as this section's own `pt-[72px]`, then corrected the same
  // day, "looks more than 72px maybe the top section has bottom gap ...
  // remove it" -- confirmed live: TrustSignals' shared `mobileWrap` already
  // supplies its own `pb-[72px]` before this section, so the two stacked
  // to a real 144px, not 72px. Zeroed here instead of touching
  // `trustSignals.mobileWrap` (shared with the homepage's own usage) --
  // same "one side owns the gap" pattern this file already uses elsewhere
  // (see `hero.section`'s own comment). Desktop `xl:pt-[160px]` is
  // unchanged (TrustSignals' desktop variant, `desktopWrapServices`, has
  // its own distinct 80px bottom padding, already correct).
  // Mobile-only now (owner, 2026-09-08: "check all the sections for desktop
  // services page ... match figma design" -- confirmed against Figma node
  // 750:770 via get_metadata that every one of the tweaks below, made
  // during the "how we work" mobile-accordion redesign, had drifted
  // desktop away from the real frame too, the same "collapsible design is
  // for mobile only" scoping mistake already caught and fixed on the cards
  // themselves). `xl:items-center`/`xl:pt-[160px]` restore the frame's own
  // real top gap and centred alignment (mobile keeps `items-start`/`pt-6`,
  // its own tuned values, unchanged).
  inner: "container-p flex flex-col items-start pt-6 pb-12 xl:items-center xl:pt-[160px] xl:pb-20",
  // 624px intro column in Figma -- kept as a max-width (not a fixed width)
  // so it can shrink below its own value on a narrow mobile viewport
  // instead of forcing horizontal overflow.
  // `xl:items-center xl:gap-4 xl:text-center` restore the frame's own real
  // centred alignment and 16px heading-to-subheading gap (get_metadata:
  // heading 0-64, subheading starts at 80) -- mobile keeps `items-start
  // gap-2` (left-aligned, 8px), its own tuned values, unchanged.
  introWrap: "flex max-w-[624px] flex-col items-start gap-2 xl:items-center xl:gap-4 xl:text-center",
  heading: "text-h1 text-text",
  // Mobile-only 18px/24px now; `xl:text-body-lg xl:leading-8` restores the
  // frame's own real 20px/32px-leading subheading (get_metadata: 64px text
  // box height at 624px width = 2 lines at 32px leading, not 24px).
  subheading: "text-[1.125rem] leading-6 text-[#17191e] xl:text-body-lg xl:leading-8",
  // Desktop cards moved off this 3-column grid onto a real scrollable row,
  // 2026-09-09 -- see `desktopWrap`/`desktopScrollerWrap`/`desktopRow`/
  // `desktopCard` below and this section's own header comment
  // (ServicesHowWeWork.tsx) for the full reasoning. `pathsGrid` itself is
  // retired; mobile/tablet's own stack moved to `mobileList` below,
  // keeping its exact former values (`mt-6`, `gap-3`) unchanged.
  //
  // Desktop (xl+): `hidden xl:block` -- the mirror of every other
  // scrollable row's own wrap-visibility split (How It Works/Inside the
  // Factory/Exhibitions/Trust Signals). `xl:mt-[72px]` (owner, 2026-09-10:
  // "how we work with you subline and images gap should be 72px on
  // services page" -- reverts the `xl:mt-[112px]` a same-day-earlier
  // follow-up had set, back to the retired `pathsGrid`'s own original
  // Figma-confirmed intro-to-cards gap).
  desktopWrap: "hidden xl:block xl:mt-[72px]",
  // No chevron/scroll any more (owner, 2026-09-10: "how we work with you
  // section should not have a chevron, it should fit in the 1440 viewport
  // as in design" -- reverses the 2026-09-09 move onto a horizontally-
  // scrollable row, which had grown each card to Our Services' own 480px
  // width; 3 cards at 480px + 2×44px gaps (1528px) can't fit the 1280px
  // content area at 1440px regardless of scroll mechanism, which is what
  // forced the chevron in the first place). Plain centred row, `mx-auto
  // max-w-[1440px]` kept for the same reason every other section here
  // centres past 1440px.
  desktopScrollerWrap: "relative mx-auto w-full max-w-[1440px]",
  // `px-[80px]` matches `container-p`'s own `xl:` inset. No `overflow`/
  // `scroll-smooth`/`no-scrollbar` any more -- nothing here scrolls.
  desktopRow: "flex w-full justify-center gap-[44px] px-[80px]",
  // 397px -- the section's own original, Figma-confirmed 3-column-grid
  // card width (get_metadata, node 750:770; also why `MediaPlaceholder`'s
  // `"397:234"` ratio option exists at all) restored (owner, 2026-09-10,
  // see `desktopScrollerWrap`'s own comment) after a same-day-earlier pass
  // had grown it to Our Services' own 480px -- 3×397px + 2×44px gaps
  // (1279px) fits the 1280px content area at 1440px with room to spare,
  // no scroll/chevron required. `shrink-0` kept even though nothing
  // scrolls any more: harmless, and cheaper than re-verifying flex-basis
  // math holds without it.
  desktopCard: "flex w-[397px] shrink-0 flex-col items-start gap-8",
  pathMedia: "w-full",
  pathTextCol: "flex w-full flex-col gap-8",
  pathTitleGroup: "flex flex-col gap-2",
  // text-h3 hits exactly 30px/500 at this project's own 1440px reference
  // width (its fluid clamp's own confirmed value) -- matches Figma's flat
  // 30px/500 "OEM Production"-style title exactly at that width, same
  // reuse-the-token-at-its-matching-breakpoint approach `servicesIntro`
  // above takes with `text-h1`. Already the same token `capabilityCard.
  // title` (Our Services) uses -- no change needed for the "follow Our
  // Services" pass below.
  pathTitle: "text-h3 text-text",
  // Body-role text sized to match Our Services' own scale (owner,
  // 2026-09-09: "container size, text all should follow the services...
  // don't change anything else except the image container and text" --
  // structure/grid/accordion/light-mode untouched, only sizing) -- was its
  // own one-off 20px/28px/0.5px-tracking. Now `capabilityCard.text`'s
  // exact desktop tier (20px/400/28px leading, `text-subline`), this
  // block's own desktop-only wrapper (`pathCardDesktop`, `hidden xl:flex`)
  // already gates it, so no responsive prefix is needed here the way
  // `capabilityCard.text` itself carries one (that token also covers a
  // mobile tier this desktop-only block never renders at).
  pathSubtitleDesktop: "text-[1.25rem] font-normal leading-[28px] text-subline",
  pathDetailGroup: "flex flex-col gap-6",
  pathDetailItem: "flex flex-col gap-2",
  // Resized to the same new body scale as `pathSubtitleDesktop`/
  // `pathDetailBody` (2026-09-09, see that key's own comment) -- was
  // 22px/1px-tracking. `font-medium`/letter-spacing kept: Our Services has
  // no "field label" of its own to match against, and dropping the
  // label's own weight/spacing distinction from its value below would
  // remove this card's own real label-vs-value hierarchy, not something
  // "text sizing" was asked to change.
  pathDetailLabel: "text-[1.25rem] font-medium tracking-[1px] text-text",
  // Matches `capabilityCard.text`'s own desktop tier exactly (2026-09-09,
  // see `pathSubtitleDesktop`'s own comment) -- was `text-[#17191e]`, the
  // same colour as `text-subline` but the raw literal instead of the
  // token; switched to the token to match Our Services' own recipe
  // precisely, not just its computed value.
  pathDetailBody: "text-[1.25rem] font-normal leading-[28px] text-subline",
  // Mobile/tablet only (owner, 2026-09-07: "oem production odm production
  // can we make them collapsable", then "build this something similar to
  // fabric options on PLP", then 2026-09-08: "the collapsable design is for
  // mobile only") -- the bordered box/chevron/dimmed-collapsed-title
  // wrapper is `fabricOptions.accordionItem`/`accordionHeader`/
  // `accordionChevron`/`accordionCollapsedTitle`/`accordionDetailGrid`/
  // `accordionField`/`accordionLabel`/`accordionValue` (reused directly
  // from the PLP's own `FabricOptions` component -- see
  // ServicesHowWeWork.tsx's own header comment), not a second near-copy of
  // that same recipe under this section's own keys.
  // Mobile/tablet stack, moved out of the old per-card dual-render wrapper
  // into its own explicit block, 2026-09-09 (see this file's own header
  // comment) -- same values as the retired `pathsGrid`'s own mobile tier
  // (`mt-6 flex flex-col gap-3`), unchanged.
  mobileList: "mt-6 flex w-full flex-col gap-3 xl:hidden",
  // 18px/24px (owner, 2026-09-07: "ODm, OEM< private label subline should
  // be 18px by 24 line") -- mobile-only now; `pathSubtitleDesktop` above
  // carries the section's own original desktop value.
  pathSubtitle: "text-[1.125rem] font-normal leading-6 tracking-[0.5px] text-[#17191e]",
  // mt-12 (48px) mobile fallback, xl:mt-[140px] -- Figma's own confirmed
  // gap from the cards row above (not the same 72px the row above uses --
  // see `inner`'s own comment on why this needs its own margin rather than
  // a shared flex `gap`).
  // `self-center` added when `inner` moved to `items-start` on mobile
  // (2026-09-08, left-aligning `introWrap` above) -- harmless at `xl:` too,
  // since `inner` centres there anyway.
  // `mt-16` (owner, 2026-09-08: "many program combine top should have 16px
  // more gap from top" -- was `mt-12`/48px, +16px) is mobile-only now;
  // `xl:mt-[140px]` restores the frame's own real gap (get_metadata: cards
  // row bottom at 950, note starts at 1090, 1090-950=140) -- that request
  // turned out to be part of the same mobile-only redesign pass.
  noteWrap: "mt-16 flex max-w-[656px] flex-col items-center gap-4 self-center xl:mt-[140px]",
  noteIconWrap: "flex size-[54px] items-center justify-center rounded-full bg-accent/10 text-accent",
  noteIcon: "size-[54px]",
  // Mobile-only 18px/24px now (owner, 2026-09-07: "many prgrams text make
  // it 18px by 24 line height"); `xl:text-body-lg xl:leading-[30px]`
  // restores the frame's own real 20px/30px-leading value (owner,
  // 2026-09-08, "fint sie for manyprograms combine same as design" --
  // get_metadata: 90px text box height at 30px leading = 3 lines, matching
  // this note's real length) -- same mobile-only-drift correction as
  // `subheading`/`inner`/`introWrap`/`pathsGrid`/`noteWrap` above.
  noteParagraph: "text-[1.125rem] leading-6 text-center text-text xl:text-body-lg xl:leading-[30px]",
  noteParagraphBold: "font-semibold",
};

/* --- ProductRange (/services page, section 5) ------------------------------ */
// Figma desktop node 758:823, file dTtJQ9rtKewCqpt2YImiJb. Desktop-only for
// now, same caveat as `servicesHowWeWork` above -- no mobile frame has been
// checked against this node yet.
//
// The first dark section on this page -- `bg-ink text-paper`, the same token
// pair every other dark full-bleed section uses (Hero, Stats). No extra top
// margin: OurServices (the section directly above this one) already supplies
// the standard 72px mobile section-to-section gap via its own bottom
// padding, the same "the section above owns the gap" pattern Stats itself
// follows after Certified & Compliant.
export const productRange = {
  section: "bg-ink text-paper",
  // Mobile: 72px top (owner, 2026-09-07, up from the standing 48px
  // dark-section fallback), 48px bottom (unchanged, standing rule).
  // Desktop: 120px top / 80px bottom, Figma's own confirmed values (an
  // intentionally asymmetric pair, not a rounding -- same shape as Hero's
  // own 140/80 split).
  inner: "container-p flex flex-col items-center gap-12 pt-[72px] pb-12 xl:gap-[72px] xl:pt-[120px] xl:pb-20",
  // 812px, Figma's own confirmed text-box width (get_metadata, node
  // 758:829) -- the exact width that forces Figma's real 2-line break
  // ("End-to-end activewear and" / "teamwear manufacturing"), not a guess.
  headingWrap: "max-w-[812px]",
  // 16px/auto on mobile/tablet only (owner, 2026-09-08: "product range,
  // how it works all eyebrows should be 16px by auto line height", then
  // corrected the same day: "Eyebrow size you changed too on desktop it
  // should be 20px as on home. All the above chages were for mobile
  // only") -- `md:text-[1.25rem] md:leading-[1.2]` restores the original
  // 20px/500 explore-link size (matching the homepage's own default
  // `--text-overline`) from `md:` up; only `max-md:` gets the smaller size.
  eyebrowSize: "max-md:text-[1rem] max-md:leading-normal font-semibold md:text-[1.25rem] md:leading-[1.2]",
  // `md:flex-row` (owner, 2026-09-09: "product range image either be a
  // little small so they can come side by side not top bottom as now")
  // -- was stacked (`flex-col`) at every width below `xl:`, this
  // section's own "desktop-only for now, responsive-safe not confirmed-
  // mobile" caveat (see this file's own header comment) meaning tablet
  // had never actually been checked/tuned. `md:gap-6` (24px, down from
  // desktop's 40px) keeps both cards comfortably inside `container-p`'s
  // own narrower `md:` content width (704px at the 768px minimum) once
  // paired with `card`'s own smaller `md:` width below.
  cardsRow: "flex w-full flex-col items-center gap-10 md:w-fit md:flex-row md:gap-6 xl:gap-10",
  // `md:max-w-[320px]` (owner, same request) -- a real size reduction, not
  // just a tighter row gap: two cards at the full 381px Figma width plus
  // any real gap exceed `container-p`'s own 704px `md:` content width at
  // 768px, the narrowest tablet target. 320px×2 + 24px gap = 664px,
  // comfortably inside it at every width from 768px up; `xl:max-w-[381px]`
  // restores Figma's own real desktop size, unchanged.
  card: "flex w-full max-w-[381px] md:max-w-[320px] xl:max-w-[381px] flex-col items-start gap-6",
  // Owner request: the image itself should also link through, not just the
  // "Explore" text -- a plain wrapping `<Link>`, block so it doesn't add
  // any inline-level gap/baseline quirk around the media box.
  cardMediaLink: "block w-full",
  cardMedia: "w-full",
  // gap-6 (24px), not gap-4 (16px) -- owner, 2026-09-07: "add 24px gap from
  // cta to top not 16px" (the gap from the card body text down to the
  // "Explore" CTA link).
  cardTextCol: "flex w-full flex-col items-start gap-6",
  // Figma's own flat 20px/28px body copy -- no existing token carries this
  // exact leading (text-body-lg's is 24px), so this is its own explicit
  // value, same reasoning as `servicesHowWeWork.pathSubtitle`.
  cardBody: "text-[1.25rem] leading-7 font-normal text-paper",
  // hover:opacity-* (the sitewide default hover treatment) dims a colour
  // toward the PAGE background -- lighter on every other hover link, all of
  // which sit on light/paper backgrounds, but this link sits on `bg-ink`
  // (near-black), so dimming it mixes toward black and reads as a DARKER
  // orange, backwards from the owner's ask ("light orange not dark").
  // `hover:brightness-125` lightens the actual orange instead, no new
  // colour token needed.
  // `group` so the chevron below can react to hover on the whole link, not
  // just itself.
  // text-button uppercase (18px/700/24px line-height) -- owner, 2026-09-07:
  // "use the upper case cta style for explore activewear and teamwear cta
  // on product range section", matching the same primary-CTA typography
  // (`button.base`'s own `text-button uppercase`) already applied to
  // WhatWeMake's "View All" CTAs and FinalCta's button. Was
  // `text-[1.25rem] leading-7 font-normal` (20px/1.4/regular, no
  // uppercase) -- a plain size/weight guess predating this standing rule.
  exploreLink:
    "group inline-flex items-center gap-2 text-button uppercase text-accent transition-[filter] hover:brightness-125",
  // Same nudge-right-on-hover as PDP's Related Styles chip chevron
  // (`productRelatedStyles.chipIcon`, `group-hover:translate-x-0.5`) --
  // owner request, reusing that exact established hover treatment rather
  // than a new one-off.
  // `h-[11.667px]`, not `h-[16.667px]` (owner, 2026-09-07: "the chveron is
  // not 100% center aligned to the text cta label, make it fully centre
  // aligned") -- `NextArrowIcon`'s own viewBox is now cropped to the
  // glyph's real bounds (see that component's own header comment), so this
  // box shrinks by the identical proportion; the glyph's rendered pixel
  // size on screen is unchanged, only the asymmetric transparent padding
  // around it (which was defeating `items-center`'s own correct box-level
  // centering) is gone.
  exploreIcon: "h-[11.667px] w-[7px] shrink-0 transition-transform group-hover:translate-x-0.5",
};

/* --- ClientLogos (homepage section 4) -------------------------------------- */
// Figma: desktop node 341:1732, mobile node 343:1840. Genuinely different
// treatments, not one responsive layout: desktop is a horizontal Marquee (72px
// gaps, full colour, no label); mobile is a static 2-column, 4-row grid (also
// full colour, also no label). Light section (paper background) -- the only
// homepage section built so far that isn't on ink.
export const clientLogos = {
  // Top 120px -> 80px, 2026-09-10 (owner: originally set on /services --
  // "add clients logo marquee above product development section on
  // desktop only" then "make it 80px" -- then "apply this to homepage
  // too"). Bottom (0px) and mobile (40px) unaffected, not part of this
  // request. `desktopWrapServices` below is now numerically identical to
  // this default; kept as its own separate token anyway (not collapsed
  // back into reusing this one directly) since `ClientLogos`' own
  // `pageVariant` prop already exists and a future page-specific value is
  // one line to add there, not a new prop to thread through again.
  desktopWrap: "hidden pt-[80px] pb-0 xl:block",
  // /services' own usage -- see `desktopWrap`'s own comment above for the
  // full history; both are 80px now.
  desktopWrapServices: "hidden pt-[80px] pb-0 xl:block",
  // Figma's mobile grid is exactly 2 columns; LogoRow's flex-wrap wouldn't
  // guarantee that at every width, so this section uses its own grid rather
  // than reusing LogoRow, which is built for a flowing, wrap-as-needed row.
  // Section-level vertical rhythm only -- no grid or border here. Border and
  // padding on the same element would push the border out from the grid's
  // padding-box, leaving a 40px gap between the line and the actual cells
  // instead of hugging them, so that lives separately on `mobileGrid` below.
  // Top/bottom corrected 2026-08-24 to the standard mobile section-to-section
  // gap (owner call): pt-0, pb-[72px] -- supersedes the earlier 40px/40px
  // (given directly by the owner at the time, before a sitewide standard
  // existed). Every mobile section now gets 0 top padding and contributes
  // the full 72px gap via its own bottom padding, so the gap to whatever
  // comes next is always the same number, not two independent values that
  // happen to sum correctly.
  // flex/gap added 2026-08-26 for the new title above the marquee (was a
  // single-child wrapper before, no layout needed). pt-[40px]/pb-[40px] is
  // an explicit owner override (2026-08-26) of the standard mobile
  // pt-0/pb-[72px] pattern every other section uses -- this section's own
  // top/bottom spacing is deliberately smaller, not a missed correction.
  // gap-8 (32px) is the title-to-marquee gap; the actual visible gap is 32px
  // only because Marquee's own instance here also cancels its internal
  // pt-10 via `-mt-10` -- see ClientLogosMobileMarquee. This is the LIVE
  // mobile treatment as of 2026-08-26 (owner call: swap the marquee in for
  // the static grid, keep the grid in the styleguide only) -- see
  // mobileWrapGrid below for the now-demo-only grid's own wrapper.
  // Tablet top gained its own +40px tier, 2026-09-10 (owner: "home, tablet,
  // top brand title should have 40px more gap from top") -- was the same
  // flat 40px as real mobile (this wrapper spans both, `xl:hidden`); bottom
  // is unaffected, not asked for.
  mobileWrap: "container-p flex flex-col items-center gap-8 pt-[40px] pb-[40px] md:pt-[80px] xl:hidden",
  // Same as mobileWrap, minus `xl:hidden` -- for the styleguide-only
  // ClientLogosMobileMarquee comparison instance (2026-08-26), which never
  // mounts on the real page and should render regardless of the reviewer's
  // actual browser width.
  mobileWrapDemo: "container-p flex flex-col items-center gap-8 pt-[40px] pb-[40px]",
  // The former live grid's own wrapper (gap-6/24px, its own original
  // spacing), now styleguide-only -- ClientLogosMobileGrid, kept for
  // comparison after the marquee replaced it as the real mobile treatment
  // (2026-08-26). No `xl:hidden`: same reasoning as mobileWrapDemo above.
  mobileWrapGrid: "container-p flex flex-col items-center gap-6 pt-[40px] pb-[40px]",
  // 24px/400 regular (owner call, 2026-08-26) -- an explicit exception to
  // the sitewide "mobile title is 30px" rule from 3x, matching the size of
  // Hero's own "Fully Custom Offerings" ticker label instead, not that
  // rule's default.
  mobileTitle: "text-center text-[1.5rem] font-normal leading-normal",
  // The outer rectangle is ONE border on the grid itself (all 4 sides), not
  // split across the grid and its cells -- corrected 2026-08-24, replacing
  // an earlier edge-ownership split (grid owned top+left, each cell owned
  // right+bottom) that solved doubled lines but broke the 4px corner radius:
  // clipping a square-cornered border with a rounded `overflow-hidden` mask
  // doesn't round the border itself, it just cuts it off at an angle, which
  // showed as a visibly jagged, stair-stepped corner rather than a smooth
  // curve (only a border and its radius living on the SAME element render a
  // native, smooth curve). Cells now only draw the INTERNAL dividers between
  // them (`mobileItemDividerRight`/`mobileItemDividerBottom`, applied
  // conditionally per cell position in the section component) -- never the
  // outer edges, so there's nothing left for the outer radius to clip
  // awkwardly. This also means every section using this pattern can have
  // properly rounded corners, not just square ones.
  mobileGrid: "grid grid-cols-2 rounded-[4px] border border-line overflow-hidden",
  // Fixed 67px height, matching Figma's own per-cell box exactly -- border-line
  // is already close to Figma's own #F2F2F7 on white, so no new colour token
  // is needed. No border of its own -- see mobileGrid above; dividers are
  // added conditionally per cell via mobileItemDividerRight/Bottom.
  mobileItem: "flex h-[67px] items-center justify-center overflow-hidden bg-paper p-3",
  mobileItemDividerRight: "border-r border-line",
  mobileItemDividerBottom: "border-b border-line",
};

/* --- TrustSignals --------------------------------------------------------- */
// Homepage section 5. Figma: desktop node 348:1862, mobile node 348:1880.
// Genuinely different structures per breakpoint, not one responsive layout:
// desktop is media-left + two side-by-side text sub-columns, mobile is
// media-top + a single divided list. Light section (paper background).
export const trustSignals = {
  // Desktop only, hidden below xl. 120px top/bottom section padding
  // (standard rhythm) -- unchanged by the 2026-09-09 redesign below, which
  // only replaces the horizontal content structure, not this outer
  // vertical rhythm. No `items-center`/`gap` any more -- both were the old
  // media+text layout's own, meaningless now that this wraps a full-bleed
  // scroller instead (see `desktopScrollerWrap` below).
  // No `container-p` any more (real bug, found live: doubled the left
  // inset to 160px) -- the new scroller below supplies its own `px-8
  // xl:px-[80px]` insets on `desktopRow` directly, the same shape every
  // other scroller here uses (its wrap has no `container-p` either);
  // stacking this element's own `container-p` (80px) on top of that
  // doubled up instead of matching it.
  // Top 120px -> 80px, 2026-09-10 (owner: "make the trust gap from top
  // 80px too" on /services, then "apply this to homepage too" -- top
  // only, matching the same `clientLogos.desktopWrap` change above;
  // bottom (120px) unaffected, not part of this request).
  desktopWrap: "hidden pt-[80px] pb-[120px] xl:block",
  // Services page reuse (owner, 2026-09-07: "this is already built on
  // homepage, use same as is. only the spacing needs to adjust, from the
  // top its 160px bottom 80px") -- Figma node 729:208 (this component's
  // real node, confirmed via get_metadata: content starts 160px from the
  // frame's own top, 536 - 160 - 296 = 80px remains below it), not
  // homepage's symmetric 120/120. Everything else (the new scroller
  // structure below) is shared as-is, same `pageVariant` pattern
  // `OurServices` already uses.
  //
  // Top corrected 160px -> 120px -> 80px (owner, 2026-09-10, in sequence:
  // "the trust section gap from the top of the logos should be same as
  // homepage" -- once `ClientLogos` was added directly above this section
  // on desktop only, the original 160px was still measuring from
  // ServicesIntro, not the marquee that now actually precedes it; matched
  // to 120px, homepage's own gap at the time -- then "make the trust gap
  // from top 80px too", then "apply this to homepage too," which also
  // dropped the homepage default's own top to 80px above, so this value
  // is no longer a services-only deviation -- kept as its own token
  // anyway per this section's established `pageVariant` pattern).
  desktopWrapServices: "hidden pt-[80px] pb-[80px] xl:block",
  // Redesigned 2026-09-09 (Figma nodes 890:253/890:279, owner: "change
  // product development, Low MOQ section to this... there are 4 cards"):
  // the old media-block-plus-two-text-columns layout becomes 4 independent
  // image+title+body cards, each 500px wide -- 4x500 + 3x40px gaps =
  // 2120px, wider than the 1440px page frame, so this is a
  // horizontally-scrollable row, the same class of section already built
  // three times (How It Works, Inside the Factory, Exhibitions) via the
  // shared `useDesktopChevronScroller` hook -- no chevron layer exists in
  // any of those three Figma frames either (see e.g. HowItWorks.tsx's own
  // header comment), it's this project's own standing solution for "more
  // cards than fit," reused verbatim here rather than re-derived.
  // `mx-auto max-w-[1440px]`: the same real bug/fix already applied to
  // every other scroller of this kind (see e.g. `insideFactory.
  // desktopScrollerWrap`'s own comment) -- a flat `px-[80px]` inset alone
  // only matches `container-p`'s own centring inset up to 1440px, drifting
  // wider apart above it.
  desktopScrollerWrap: "relative mx-auto w-full max-w-[1440px] cursor-none overflow-hidden",
  // `overflow-x-hidden`, not `-auto` (matching every other scroller here,
  // see `DesktopChevronScroller.tsx`'s own header comment: "user can only
  // scroll by clicking"). `px-8 xl:px-[80px]`/`scroll-pl`/`scroll-pr`:
  // `container-p`'s own breakpoint insets -- this section's own explicit
  // "80px gap from the left of the page" ask is the `xl:` value; matched
  // on the right too so the last card doesn't sit flush against the
  // viewport edge, the same as every other scrollable row here.
  // `items-start` (real bug, found live: flex's own default `stretch`
  // forced every card to the tallest card's height, 768px, hiding the
  // 600/420px alternating image heights and the cards' own real,
  // different total heights entirely) -- Figma's own cards are top-
  // aligned, each its own natural height.
  // 24px card gap (owner, 2026-09-10: "make it 32" then "make it 24" --
  // was 40px).
  desktopRow:
    "no-scrollbar flex items-start gap-[24px] overflow-x-hidden scroll-smooth px-8 xl:px-[80px] scroll-pl-8 xl:scroll-pl-[80px] scroll-pr-8 xl:scroll-pr-[80px]",
  // 380px fixed width (owner, 2026-09-10, referencing a Google Health/Pixel
  // marketing layout: "make the card size as per this reference, current
  // one is too big, no cornor radious though" -- was 500px; radius was
  // already `none` on every `MediaPlaceholder` here, so only the width
  // needed to shrink). Keep `TrustSignals.tsx`'s own `CARD_WIDTH` JS
  // constant (used for the chevron's scroll-by-one-card math) equal to
  // this value.
  // Image-to-text gap 32px -> 24px (owner, same day: "make the product
  // developemnt low moq also 24px") -- matches How It Works' own desktop
  // media-to-text gap (`capabilityCard.root`'s `xl:gap-6`), deliberately
  // brought in line rather than left at this section's own former
  // Figma-sourced 32px.
  desktopCard: "flex w-[380px] shrink-0 flex-col gap-[24px]",
  // 12px title-to-body gap (owner, 2026-09-10: "make it 12" -- was 16px,
  // itself a change from an original 8px; overrides the redesign's own
  // Figma-confirmed 16px, deliberate owner value).
  desktopCardText: "flex flex-col gap-[12px]",
  // Shared by both the old mobile list (unchanged) and the new desktop
  // cards above -- already matches this redesign's own type (text-h3 =
  // 30px/500/1.2 at the 1440 reference).
  title: "text-h3",
  // 20px/400/28px line-height -- a one-off, not the Body Large token (which
  // is 20px/400 but a 24px line-height). Confirmed via get_design_context.
  // text-subline (#17191e, owner, 2026-09-01: sitewide title+subline colour
  // on white/paper backgrounds) -- was no colour class (inherited text-text).
  body: "text-[1.25rem] font-normal leading-[1.4] text-subline",
  // font-semibold next to the body's own 400 weight is deliberate emphasis
  // within the style (see the note at the top of this file), matching two of
  // the four items' real Figma bold spans (Low MOQ, Private Label).
  bold: "font-semibold",

  // Mobile only, hidden at and above md (tablet now gets its own
  // `tabletWrap`/`TabletCarousel` below, 2026-09-10 -- was `xl:hidden`,
  // which used to cover tablet too). 0px top (owner call, 2026-08-23): the
  // artwork sits flush against whatever comes before it -- this turned out
  // to be the first instance of what's now the standard mobile
  // section-to-section pattern (0 top, gap contributed entirely by bottom
  // padding). Bottom corrected 2026-08-24 from pb-section (64px) to the
  // standard 72px. 24px gap between the artwork and the item list.
  mobileWrap: "container-p flex flex-col gap-6 pt-0 pb-[72px] md:hidden",
  // /services' own mobile instance (owner, 2026-09-10, mobile-only review:
  // "add 40px gap from the top of the production development section
  // image placeholder") -- unlike the homepage's own usage, this page's
  // preceding section (Intro statement) doesn't read as flush-against
  // artwork, so `mobileWrap`'s standing "0px top, artwork sits flush"
  // rule doesn't apply here. A separate variant rather than changing the
  // shared `mobileWrap` directly, since the homepage's own usage wasn't
  // part of this request.
  mobileWrapServices: "container-p flex flex-col gap-6 pt-[40px] pb-[72px] md:hidden",
  // Tablet only (owner, 2026-09-10: "on home, tablet, use the same section
  // as desktop for product development, low moq etc, but don't add the
  // chevron like desktop instead use the dots under it. image size can be
  // the same as desktop"). Top 72px, bottom 104px (owner: "space from top
  // and bottom of the section should be 72px," then "from the bottom make
  // 104px") -- a real, explicit tablet value, not the old shared
  // `mobileWrap`'s 0-top/72-bottom rhythm (that pattern relies on the
  // artwork above it sitting flush against the previous section, which this
  // card row doesn't have).
  tabletWrap: "hidden pt-[72px] pb-[104px] md:block xl:hidden",
  // `overflow-x-auto`/`snap-x snap-mandatory`, unlike `desktopRow`'s
  // `overflow-x-hidden` -- this track is meant to respond to a real finger
  // swipe (native scroll), not just the chevron's `scrollBy`, so it keeps
  // the browser's own scroll handling instead of disabling it. `px-8`/
  // `scroll-pl-8`/`scroll-pr-8`: `container-p`'s own tablet inset (32px),
  // matching every other tablet-width scrollable row's own left/right
  // insets.
  // 24px card gap alongside `desktopRow` (2026-09-10) to keep that parity
  // intact.
  tabletRow: "no-scrollbar flex snap-x snap-mandatory gap-[24px] overflow-x-auto px-8 scroll-pl-8 scroll-pr-8",
  // Same width and image-to-text gap as `desktopCard` (owner: "image size
  // can be the same as desktop") -- only `snap-start` is added, for the
  // native scroll-snap this track uses instead of the chevron. Shrunk to
  // 380px/24px alongside `desktopCard` (2026-09-10) to keep that parity
  // intact, not a separate tablet-only change.
  tabletCard: "flex w-[380px] shrink-0 snap-start flex-col gap-[24px]",
  // First fix (owner report, 2026-09-03: "the image container looks big")
  // capped this box's width to phone size (`md:max-w-[420px] md:mx-auto`,
  // matching TrustPoints/WhatWeCover/WhatWeMake's own fix) -- owner
  // correction, same day: "you make it very small, keep it as it was
  // before maybe a little height can be shrink, not too small." Reverted
  // the width cap entirely -- full tablet container width, as before --
  // and widened the ratio instead: `md:aspect-[16/9]` (1.78:1) in place of
  // the base `16:11` (1.45:1) only at `md:`, a real but modest reduction
  // (~18% shorter at a given width) rather than the width-capped version's
  // ~45% cut. A later `aspect-*` utility with a responsive prefix wins
  // over the base one at that breakpoint by generation order (same
  // mechanism `hero.video`'s own `xl:h-[650px]` override relies on), no
  // `!` needed.
  mobileMedia: "md:aspect-[16/9]",
  mobileList: "flex flex-col",
  // A divided list, not a grid: item 1 gets bottom padding + a bottom
  // border, the middle items get vertical padding + a bottom border, the
  // last item gets only top padding and no border -- giving a uniform 48px
  // gap between every pair of items with a single 1px divider sitting at
  // each gap's midpoint. Confirmed via get_design_context on three separate
  // mobile item nodes, not guessed from a repeating flex+gap pattern.
  mobileItemFirst: "flex flex-col gap-2 border-b border-line pb-6",
  mobileItemMiddle: "flex flex-col gap-2 border-b border-line py-6",
  mobileItemLast: "flex flex-col gap-2 pt-6",
  // 30px, not text-h5's 24px (owner call, 2026-08-26, sitewide: every
  // mobile 24px title becomes 30px, e.g. "Low MOQ") -- this key is only
  // ever used in the mobile-only block above, so no responsive split
  // needed here.
  mobileTitle: "text-[1.875rem] font-medium leading-normal",
  // 18px/400/24px line-height -- a one-off, not the Body token (18px/400 but
  // 22px line-height). Confirmed via get_design_context. text-subline
  // (#17191e, owner, 2026-09-01: sitewide title+subline colour on white/
  // paper backgrounds) -- was no colour class (inherited text-text).
  // md:max-w-[clamp(560px,65vw,780px)] (owner, 2026-09-09: "the subline
  // width that we define on this page, apply it to all paragraphs across
  // pages, same way") -- `mobileWrap` is `xl:hidden` (renders through the
  // full tablet range) with no max-w anywhere in its own `container-p`
  // column, so these item descriptions had no width constraint at tablet.
  // No `xl:max-w-none` needed here -- this whole block is `xl:hidden`, so
  // there's no wider breakpoint for the clamp to need cancelling at.
  mobileBody: "md:max-w-[clamp(560px,65vw,780px)] text-[1.125rem] font-normal leading-[1.3333] text-subline",
};

/* --- WhatWeMake ------------------------------------------------------------ */
// Homepage section 6. Figma: desktop node 366:129, mobile node 366:161
// ("Activewear Categories" -- only that category group's spacing is
// Figma-confirmed; a second group, e.g. Teamwear & Uniforms, reuses the same
// pattern by inference, see WhatWeMake.tsx). Light section (paper background).
export const whatWeMake = {
  // Desktop: 120px top/bottom (owner call, 2026-08-23, revised down from an
  // initial 180px/100px correction the same day). Mobile top/bottom
  // corrected 2026-08-24 to the standard mobile section-to-section pattern:
  // 0 top, 72px bottom -- supersedes the earlier 64px top/100px bottom, now
  // that a sitewide standard exists (see clientLogos.mobileWrap for the full
  // reasoning).
  mobileSection: "container-p pt-0 pb-[72px] xl:hidden",
  desktopSection: "container-p hidden pt-[120px] pb-[120px] xl:block",
  // 90px gap from the SectionHeading down to the first category group --
  // off-scale, kept exact. Mobile's equivalent gap (heading block to first
  // category group) is 48px, and 24px more down to the tile list -- both
  // handled directly in the section's own markup since they sit between
  // different components, not one recipe class. This is distinct from
  // `groupsGap` below (the gap *between* category groups, e.g. Activewear to
  // Teamwear & Uniforms) -- two different spacings, not one value reused.
  // No `eyebrowSize` override any more (2026-09-10 cleanup): this section's
  // 16px/600 mobile eyebrow is now `eyebrow.size`'s own sitewide default,
  // so both `<SectionHeading>` calls below pick it up automatically.
  // SectionHeading to the groups list.
  root: "flex flex-col gap-12 xl:gap-[90px]",
  // Gap *between* category groups (owner call, 2026-08-23, revised down the
  // same day from an initial 100px/180px correction): 64px mobile, 120px
  // desktop. Tablet given its own explicit 80px tier 2026-09-10 (owner:
  // "make it 80px from the top tablet") -- was falling through to mobile's
  // 64px. Only applies when there's more than one group -- see
  // WhatWeMake.tsx.
  groupsGap: "flex flex-col gap-16 md:gap-20 xl:gap-[120px]",
  // 24px mobile / 40px desktop, group header (title+body) to its tile list --
  // a different gap than `root`'s heading-to-group spacing above, so it's its
  // own value, not a shared one reused at two different sizes.
  group: "flex flex-col gap-6 xl:gap-10",
  // 8px title-to-body gap, shared between mobile and desktop.
  groupHeader: "flex flex-col gap-2",
  // 36px/500/normal desktop -- an exact one-off, not a token (no existing
  // size is 36px). Mobile was 24px/500/28px-leading (Figma's real, exact
  // match for H5's size/weight, but a flat 28px line-height rather than the
  // token's 1.2 ratio) -- sized up to 30px (owner call, 2026-08-26,
  // sitewide: every mobile 24px title, e.g. this "Activewear"/"Teamwear &
  // Uniforms" heading, becomes 30px), leading-normal to match.
  // Threshold moved xl:/max-xl: -> md:/max-md: (owner, 2026-09-04: use
  // desktop sizes at tablet width) -- both values are fixed (30px/36px),
  // desktop is always the larger one, so this is a pure threshold change.
  groupTitle: "max-md:text-[1.875rem] max-md:leading-normal font-medium md:text-[2.25rem] md:leading-normal",
  // 20px/400/28px-leading desktop -- the same one-off already established for
  // Trust Signals' desktop body (trustSignals.body). 18px/400/24px-leading
  // mobile -- the same one-off already established for Trust Signals' mobile
  // body (trustSignals.mobileBody). Kept as its own copy here rather than
  // cross-importing, matching how each section recipe stays self-contained.
  // xl:max-w-[620px]: Figma's real desktop body column is 620px wide, not the
  // full group-header width -- without this it was unconstrained and wrapped
  // to fewer lines than the design (owner correction, 2026-08-23: should
  // wrap to 2 lines, matching Figma's own 620px-wide, 2-line text box).
  // text-subline (#17191e, owner, 2026-09-01: sitewide title+subline colour
  // on white/paper backgrounds) -- was no colour class (inherited text-text).
  // Threshold moved xl:/max-xl: -> md:/max-md: (2026-09-04, same review) --
  // the `md:max-w-[620px]` wrap constraint moves with it, so the wider
  // tablet text still wraps to 2 lines instead of running unconstrained.
  groupBody:
    "max-md:text-[1.125rem] max-md:leading-[1.3333] font-normal md:text-[1.25rem] md:leading-[1.4] md:max-w-[620px] text-subline",
  // font-semibold next to the body's own 400 weight is deliberate emphasis
  // within the style, the same convention as Trust Signals and the offerings
  // ticker label.
  bold: "font-semibold",
  // Desktop: 4-column grid, 16px column gap, 48px row gap -- reuses Card
  // (components/Card.tsx) directly, since the real spec is an exact match
  // for Card's category variant once its own gap was corrected (see `card`
  // above).
  desktopGrid: "grid grid-cols-4 gap-x-4 gap-y-12",
  // Owner request, 2026-09-07: "the image placeholder is 300 by 300, I
  // want to make it 300 by 320" -- 300:320 reduces to 15:16, passed to
  // Card's own `mediaAspectClassName` override (default `aspect-square`),
  // replacing that default for this section only -- every other `<Card>`
  // caller (styleguide) is unaffected.
  desktopTileMedia: "aspect-[15/16]",
  // CTA tile filling the last grid cell of each group's own row set (owner,
  // 2026-09-07: "for activewear, shall we use the last 8th box space and
  // put a cta there?", then "the pattern should be consistent for both...
  // use the same cta labels as mobile"). Not `Card` (expects an image +
  // label pair, wrong shape for a CTA) or `Button` (a pill sized to its
  // own text, not a grid cell) -- a plain `Link` styled to fill the exact
  // same footprint as a photo tile instead. `aspect-[15/16]` matches
  // `desktopTileMedia` above exactly, so this cell is the same size as
  // every `Card` beside it (no separate image+label split needed, since
  // the bordered box IS the whole cell). `border-accent`/`text-accent` for
  // the orange outline+text requested; `hover:bg-accent/5` is a lighter
  // fill than `button.secondary`'s own `hover:bg-current/10` -- accent
  // orange at 10% reads much stronger than a neutral ink tint would at
  // the same opacity.
  // Label size corrected to a literal 20px (owner: "make the view all
  // activewear and teamwear 20px") -- was `text-h5` (24px, matching
  // `card.label`'s own desktop size); `text-[1.25rem]` is the same literal
  // value `sectionHeading`/`trustPoints.subline` etc. already use for a
  // plain 20px size elsewhere, `leading-[1.2]`/`font-medium` kept from
  // `text-h5`'s own values so only the size itself changed. Superseded the
  // same day (owner: "the cta label should be upper case as we use in our
  // primary cta, 18px and 24 line height") -- `text-button uppercase` is
  // `button.base`'s own real primary-CTA typography (`app/globals.css`:
  // 18px/700/1.3333 line-height = 24px), reused verbatim rather than a
  // third custom size for this one CTA.
  // `group gap-2`: pairs with `desktopCtaIcon` below (owner, same day:
  // "put a chvron next to the cta label," then "on the hover chvron
  // should have the same animation we applied on pdp, related styles" --
  // confirmed good, then "chvron icon should be a little big, text to
  // icon gap should be 8px" -- gap confirmed already correct here,
  // unchanged, then "desktop chevron is very small make it same size as
  // servies product range 'explore activewear' cta") -- `group`+
  // trailing-icon+`gap-2` is unchanged; the icon itself switched from
  // lucide's `ChevronRight` to `NextArrowIcon` (see `desktopCtaIcon`'s
  // own comment) once a same-size comparison against Product Range's
  // "Explore" link showed the real gap was shape/weight, not just a
  // number.
  // `cta-gradient-border` (globals.css): same moving-orange-comet-within-
  // the-outline hover animation as the Download Catalog CTA (owner,
  // 2026-09-10: "make the same outline animation to view all activewear
  // and teamwhere cta in what we make section"). `hover:bg-accent/5` (the
  // tint that used to be this tile's only hover feedback) is removed in
  // the same turn ("without the inner hover color remove it") -- same
  // reasoning as the Download Catalog fix: a background wash behind the
  // ring dulls it, and the ring itself is now the hover feedback.
  // `cta-tile` (globals.css) added same day (owner: "view all activewear
  // cta does not look good while hover, should we treat it separately?" ->
  // "fix it") -- this is a large square grid cell flush against its
  // sibling tiles, not an isolated pill button, so the lift-off-the-page
  // scale/shadow bloom `cta-gradient-border` also carries (tuned for a
  // small button) reads wrong here: scaling it up visually creeps toward
  // the neighbouring tiles instead of "lifting." `cta-tile` overrides just
  // that part back to a plain border/background hover, proportional to a
  // grid tile, while keeping the ring.
  desktopGridCta:
    "group flex aspect-[15/16] items-center justify-center gap-2 border border-accent text-center text-button uppercase text-accent transition-colors cta-gradient-border cta-tile",
  // Mobile: a single stacked column, not a grid -- each tile is a landscape
  // (16:11) image, unlike desktop's square, and the label is left-aligned,
  // not centred (confirmed via get_design_context: desktop's tile label
  // explicitly carries text-center, mobile's does not) -- different enough
  // from Card's contract that mobile uses its own bespoke markup instead of
  // reusing Card, the same reasoning Trust Signals and Client Logos already
  // used for their own mobile treatments.
  // A width-capped single column (`md:max-w-[420px] md:mx-auto` on each
  // tile) was tried here first, matching WhatWeCover/TrustPoints' own
  // artworkWrap fix -- reverted (owner report, 2026-09-03, reviewing the
  // Activewear/Teamwear PLP grids, which reuse this same `Card`/tile
  // pattern: "images are totally broken, use 2 product tiles in each row
  // adjust them to the page width"). A single column of narrow, centred
  // tiles read as broken/empty either way -- lots of unused width either
  // side of a small floating tile, a long, mostly-blank scroll. A real
  // `md:grid md:grid-cols-2` fills the actual tablet width properly
  // instead of shrinking the tile down to phone size within it -- each
  // tile's own fixed `16:11` image ratio then sizes correctly on its own,
  // no extra height/width override needed. Real mobile (`<md:`) keeps the
  // single stacked column.
  //
  // Split into two real instances 2026-09-07 (owner: "on the mobile
  // homepage, add a cta after 4 products ... Show the first 2 sub-cat
  // only" -- clarified to 4, not 2): real mobile capped to the first 4
  // tiles plus a "View All" CTA; tablet kept showing every tile with no
  // CTA. Merged back into this one instance the same day (owner: "tablet
  // will also follow mobile cta behavior") -- tablet's own layout
  // (`md:grid md:grid-cols-2`) is untouched, but it now shares mobile's
  // same tile CAP and CTA instead of being a separate uncapped instance.
  // `xl:hidden` (was `md:hidden` on the old mobile-only version) --
  // visible through the whole sub-`xl` range now, `WhatWeMake.tsx`'s
  // `.slice(0, MOBILE_TILE_LIMIT)` applies at every width this renders.
  mobileList: "flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-x-6 md:gap-y-10 xl:hidden",
  // Full-width outline pill, real-mobile-only (owner, 2026-09-07, same
  // request as above: "cta ... it will take customers to their respective
  // landing pages" -- `category.href`, already on the content shape,
  // unused until now). `variant="secondary"` (outline, not solid accent)
  // so this doesn't compete visually with the page's real primary CTAs
  // ("Request a Sample") -- a "see more" link reads as secondary intent.
  // 32px total gap above this button (owner: first "sta[rt] space from
  // the top should be 40px", corrected same day to "space from the top
  // cta make 32px"). `group`'s own `gap-6` (24px) already applies between
  // every child in this flex column, this button included -- a margin on
  // a flex child ADDS to that shared gap, it doesn't replace it (the same
  // mechanism already documented on `productCtas.desktopRow`'s own
  // `xl:mt-2`, see that recipe's own comment: "32 + 8 = a real 40px").
  // `mt-2` (8px) + the existing 24px gap = 32px, not `mt-8` (which would
  // stack to a wrong 56px total -- confirmed live, then corrected).
  // `xl:hidden` (was `md:hidden` -- owner, same day: "tablet will also
  // follow mobile cta behavior"; see `mobileList`'s own comment above for
  // the matching change on the tile list this sits below).
  //
  // Accent-coloured outline, not the default `button.secondary`
  // currentColor one (owner, same day: first "make the outline and text
  // orange as primary color" for Teamwear only, then "make view all
  // activewear also orange outline with text" -- both CTAs share this
  // now). `button.secondary` is `border-current`/`text-current`, so
  // `border-accent`/`text-accent` needs `!` to actually win -- same
  // same-specificity-utility-order risk already found and fixed once on
  // `productCtas.secondaryDesktop` (see that recipe's own comment); reuses
  // its exact hover tint (`#FFF6F3`) rather than inventing a second one.
  // `group gap-2`: same trailing-chevron pairing as `desktopGridCta`
  // above, see that key's own comment.
  //
  // No font-size override here at all, deliberately (owner: first "make
  // the view all activewear and teamwear 20px" -- added `!text-[1.25rem]`
  // -- then, same day: "the cta label should be upper case as we use in
  // our primary cta, 18px and 24 line height"). `Button`'s own `base`
  // already carries exactly that spec (`text-button uppercase`,
  // 18px/700/24px line-height) by default -- the `!text-[1.25rem]`
  // override was actively fighting the correct value down to 20px and
  // dropping the line-height pairing; removed rather than replaced with a
  // new override, since the desired result IS the untouched default.
  // `md:mt-6` (owner, 2026-09-07: "on the tablet, add extra 16px space
  // from top of the ctas") -- tablet-only extra: `group`'s own `gap-6`
  // (24px, unprefixed, applies to both mobile and tablet) plus this
  // button's own margin gives 32px total at real mobile (`mt-2`, 8px) and
  // now 48px at tablet (`md:mt-6`, 24px) -- 16px more than mobile, not a
  // second value replacing it.
  mobileGroupCta:
    "mt-2 md:mt-6 w-full justify-center gap-2 xl:hidden !border-accent !text-accent hover:!bg-[#FFF6F3]",
  // Trailing chevron, mobile CTA only now (desktop's own moved to
  // `desktopCtaIcon` below, a different icon component -- see that key's
  // own comment for why). Owner: "put a chvron next to the cta label ...
  // on hover the chvron should have the same animation we applied on pdp,
  // related styles" -- confirmed good, then "chvron icon should be a
  // little big, text to icon gap should be 8px", then a size correction:
  // "chevron size make 7by16 px". Hover-nudge mechanism
  // (`transition-transform`/`group-hover:translate-x-0.5`) reuses
  // `productRelatedStyles.chipIcon` verbatim; the 7×16px size is this
  // CTA's own literal (lucide's `ChevronRight` is a square glyph by
  // default -- `w-[7px] h-4` renders it as a taller, narrower mark
  // instead, not a token this project has elsewhere).
  ctaIcon: "w-[7px] h-4 shrink-0 transition-transform group-hover:translate-x-0.5",
  // Desktop CTA's own icon (owner: "desktop chevron is very small make it
  // same size as servies product range 'explore activewear' cta") --
  // matching the numeric size alone wasn't the real fix, since lucide's
  // `ChevronRight` (thin, stroke-based, 24×24 native viewBox) reads much
  // lighter than `NextArrowIcon` (a small SOLID chevron, no stroke at
  // all, purpose-built at this exact `7x16.6667` viewBox -- see that
  // component's own header comment: "a lucide substitute would read as
  // visibly different weight/style"). Switched the desktop CTA to
  // `NextArrowIcon` and copied `productRange.exploreIcon`'s exact values
  // verbatim, so this genuinely IS the same size as the Services page's
  // own "Explore Activewear" link, not just a close approximation. Mobile
  // keeps `ctaIcon`/`ChevronRight` above, unchanged -- only "desktop" was
  // reported small.
  // Was `-translate-y-[1.5px]` (a compensating nudge for the exact same
  // "not 100% center aligned" report, applied here first) -- superseded
  // 2026-09-07 once the real cause was fixed at its source instead:
  // `NextArrowIcon`'s own viewBox is now cropped to the glyph's real
  // bounds (was `0 0 7 16.6667` with the path only spanning y 4-15.6667,
  // an asymmetric built-in offset toward the bottom baked into Figma's
  // export frame), so the icon's own box and its visible ink are now the
  // same thing -- a manual translate on top of that would just introduce
  // a new, opposite offset. Height corrected to `h-[11.667px]` to match
  // (same proportional shrink as `productRange.exploreIcon`, see that
  // token's own comment) -- the glyph's own rendered pixel size is
  // unchanged, only the transparent padding around it is gone.
  desktopCtaIcon: "h-[11.667px] w-[7px] shrink-0 transition-transform group-hover:translate-x-0.5",
  mobileTile: "flex flex-col gap-4",
  // Owner, 2026-09-03: originally a `4:3` mid-point between mobile's old
  // flat `16:11` landscape and desktop's old square tile. Superseded
  // 2026-09-07 (owner: "most of the images would be taller so better we
  // have height more than the width," given alongside making mobile
  // square and desktop 300:320) -- both endpoints this was bridging are
  // now themselves square-or-taller (`1:1` mobile, `15:16` desktop, see
  // `desktopTileMedia` above), so a flatter `4:3` mid-point no longer fits
  // between them. Matches desktop's own `15:16` instead of inventing a
  // third one-off ratio.
  mobileTileMedia: "md:aspect-[15/16]",
  // 22px/500/normal, left-aligned -- a one-off, not H5 (24px): the real
  // mobile tile label is one size down from desktop's, confirmed via
  // get_design_context, not the same size reused smaller.
  mobileTileLabel: "text-[1.375rem] font-medium leading-normal",
};

/* --- CertifiedCompliant ---------------------------------------------------- */
// Homepage section 7. Figma: desktop node 369:266, mobile node 375:435. Light
// section (paper background). Heading is SectionHeading's centred variant
// (align="center") -- confirmed real, not left-aligned like Trust Signals or
// What We Make.
export const certified = {
  // Provisional, same caveat as What We Make: neither Figma frame's own top/
  // bottom edges reliably reflect the section's real page padding (that
  // frame-crop trap already cost What We Make two rounds of correction), so
  // this starts at the same latest confirmed sitewide rhythm rather than
  // trusting this frame's raw edges -- easy to adjust once seen rendered.
  // True desktop static row -- `xl:` only. A same-day first pass moved
  // this straight to `md:block` (owner: "certified, use desktop style"),
  // but the static row's own `flex-wrap` then genuinely wrapped to 2+
  // lines at tablet width -- 6 logos at their real desktop size plus 5x
  // 69px gaps need more room than a 768-1279px container has. Owner
  // correction, same day: "certificates, make them in one line and add
  // marquie just for these viewports" -- tablet gets its own third block
  // instead (`tabletSection` below, a scrolling `Marquee`), not the
  // static row reused verbatim.
  desktopSection: "container-p hidden pt-[120px] pb-[120px] xl:block",
  // Services page variant -- briefly zeroed (owner, 2026-09-08: "certified
  // section should not have gap at the bottom should be 0"), then reverted
  // the same day ("certified should have 120px frm the bottom") -- back to
  // the homepage's own 120px value, so this token is now byte-identical to
  // `desktopSection` above; kept as its own named key anyway (rather than
  // collapsed back into a single shared token) since `CertifiedCompliant.tsx`
  // already branches on `pageVariant` for this section and may need its own
  // desktop value again.
  desktopSectionServices: "container-p hidden pt-[120px] pb-[120px] xl:block",
  // /our-factory's own instance (Figma node 917:170, "All Logos", 2026-09-09)
  // -- owner: "logos will have 72px gap from top and 0 from bottom." No
  // separate tablet/mobile Figma frame exists for this node, so the same
  // 72px-top/0-bottom figure is applied at every breakpoint below too
  // (`tabletSectionOurFactory`/`mobileSectionOurFactory`), rather than
  // inheriting the homepage's own unrelated 120/80/0 rhythm.
  desktopSectionOurFactory: "container-p hidden pt-[72px] pb-0 xl:block",
  // Tablet-only (768-1279px): a scrolling Marquee of the same logos,
  // reusing Client Logos' own desktop technique (`Marquee` with
  // `separator="none"`, images as items) rather than the bare static row,
  // which doesn't fit on one line at this width. `pt`/`pb` trimmed from
  // the static row's own 120px (owner, 2026-09-03: "reduce the space from
  // top and bottom of the section, extra space atm") to 80px, a judgment
  // call, not a confirmed Figma value -- no tablet frame exists to read a
  // real number from; 80px is this project's own established secondary
  // rhythm value (the desktop container side-inset), a reasonable middle
  // point between the static row's 120px and mobile's 72px. `pb` trimmed
  // again the same review (owner, 2026-09-04: "reduce 24px from the
  // bottom of the logos") -- 80px -> 56px; `pt` untouched, not flagged.
  tabletSection: "container-p hidden pt-[80px] pb-[56px] md:block xl:hidden",
  // Services page variant -- same revert as `desktopSectionServices` above.
  tabletSectionServices: "container-p hidden pt-[80px] pb-[56px] md:block xl:hidden",
  // /our-factory's own instance -- see desktopSectionOurFactory above.
  tabletSectionOurFactory: "container-p hidden pt-[72px] pb-0 md:block xl:hidden",
  // Mobile top/bottom corrected 2026-08-24 to the standard mobile
  // section-to-section pattern: 0 top, 72px bottom -- supersedes the 80px
  // top set earlier the same day, now that a sitewide standard exists (see
  // clientLogos.mobileWrap for the full reasoning). Correct on the
  // homepage, where the preceding section (`WhatWeMake`) already owns its
  // own 72px bottom -- `pt-0` here avoids doubling that gap.
  mobileSection: "container-p pt-0 pb-[72px] md:hidden",
  // Services page variant (owner, 2026-09-08: "certified should have 72px
  // gap from the top") -- on `/services` this section instead follows the
  // mid-page `FinalCta` usage, whose own ticker'd mobile block owns just
  // 60px of bottom padding (`finalCta.mobileCtaBlock`'s `pb-[60px]`), not
  // 72px, so the shared `pt-0` above landed a real 60px gap there instead
  // of the standard 72px. A real top value of its own, rather than
  // touching `finalCta`'s unrelated 60px (which is correct for its own
  // context, a ticker'd CTA block, not a plain section boundary).
  // `pb-0` (was `pb-[72px]`) -- briefly zeroed once before (owner,
  // 2026-09-08: "certified section should not have gap at the bottom
  // should be 0"), then reverted the same day back to the standard 72px
  // alongside `desktopSectionServices`/`tabletSectionServices` ("certified
  // should have 120px frm the bottom" -- desktop's own value; mobile's own
  // standard 72px restored to match, correct at the time). `Responsible
  // Make` (`trustPoints.sidePaddingServices`) has since gained its own
  // `pt-[72px]` (2026-09-09), so the two together were stacking into a
  // real 144px gap, not the intended 72px -- re-zeroed here (owner,
  // 2026-09-10, mobile-only review: "remove the gap under the certified
  // section") so `Responsible Make`'s own top padding is the sole source
  // of the gap between them, the same "one section owns the gap"
  // convention already used elsewhere on this site.
  mobileSectionServices: "container-p pt-[72px] pb-0 md:hidden",
  // /our-factory's own instance -- see desktopSectionOurFactory above.
  // `pt-[48px]` (owner, 2026-09-09, mobile-only review: "certification
  // logo, make 24px less space from the top") -- was `pt-[72px]`; mobile
  // only, desktop/tablet (`desktopSectionOurFactory`/`tabletSectionOurFactory`)
  // untouched.
  mobileSectionOurFactory: "container-p pt-[48px] pb-0 md:hidden",
  // 72px gap from the heading down to the logo row on desktop -- off-scale,
  // kept exact. Mobile is a genuinely different, smaller gap (32px, owner
  // call, 2026-08-24) -- not the same value reused, so this is two separate
  // classes rather than one shared root with a responsive gap override.
  // `md:gap-6` (owner, 2026-09-04: "certified section title and logo space
  // reduce space to 24px") -- this token is shared by both the `xl:`-only
  // static row and the `md:`-only tablet Marquee block (two separate,
  // mutually-exclusive-by-visibility DOM instances), so the `md:` value
  // only ever takes effect on the tablet block; `xl:gap-[72px]` keeps the
  // real desktop value explicit and unchanged.
  root: "flex flex-col items-center md:gap-6 xl:gap-[72px]",
  rootMobile: "flex flex-col items-center gap-8",
  // 812px -- this section's real desktop heading column width (node
  // 369:267), confirmed to wrap the real copy to exactly 2 lines (height
  // 128px = 2 x the 64px line-height). Unconstrained, it ran the full
  // container width and wrapped to 1 line instead. Passed to
  // SectionHeading's `headingClassName`, desktop instance only -- mobile's
  // own w-full column already wraps correctly without it.
  headingNarrow: "max-w-[812px]",
  // No `eyebrowSizeMobile` override any more (2026-09-10 cleanup): this
  // 16px/600 value is now `eyebrow.size`'s own sitewide default.
  // Desktop: one static row, no ticker, no border/box -- confirmed via
  // get_design_context (bare logo marks, no bg/border on any of the 6
  // frames). Centred within the standard content width, 69px gap between
  // logos -- confirmed consistently across all 5 gaps via get_metadata
  // coordinates, an off-scale exact value, not rounded to 64/72.
  desktopRow: "flex flex-wrap items-center justify-center gap-[69px]",
  // Mobile: the same border-collapse grid technique Client Logos already
  // established, now with a real corner radius on both -- see
  // clientLogos.mobileGrid/mobileItem for the full reasoning, including the
  // 2026-08-24 fix from a clipped, jagged corner (border split across the
  // grid and its cells, rounded only by clipping) to a native, smooth one
  // (the whole outer rectangle is one border on the grid itself; cells only
  // draw the internal dividers between them). Figma confirms the 4px radius
  // on all 4 true corners -- Client Logos' own grid is square, 0 radius.
  // w-full: without it, this shrinks to its own content width under root's
  // items-center (a flex-column child doesn't stretch to fill by default),
  // leaving it centred with more than the intended 20px inset from the
  // section's own container-p edges -- confirmed live (43px measured
  // instead of 20px) and fixed here.
  mobileGridWrap: "w-full",
  mobileGrid: "grid grid-cols-2 rounded-[4px] border border-line overflow-hidden",
  mobileItem: "flex h-[93px] items-center justify-center overflow-hidden bg-paper p-3",
  mobileItemDividerRight: "border-r border-line",
  mobileItemDividerBottom: "border-b border-line",
};

/* --- Stats ------------------------------------------------------------- */
// Homepage section 8. Figma: desktop node 387:498, mobile node 387:511. The
// first dark section since Hero -- confirmed #131314 fill, matching our
// ink-2 token. Not StatBlock (3 stats side by side, already built): the
// real layout is media + a stacked text list, structurally like Trust
// Signals, and this section's own typography doesn't match StatBlock's
// Stat Number/Stat Label tokens either (see below), so it's its own bespoke
// section.
export const stats = {
  // bg-ink lives on `desktopOuter`, a full-bleed wrapper with no width
  // constraint of its own, not on the padded/centred content wrapper --
  // corrected 2026-08-24: putting the background on the same element as
  // `container-p` (which caps at max-width: 1440px) meant the black fill
  // itself stopped at 1440px on any wider viewport, showing the page's
  // default background outside it instead of true edge-to-edge black. Hero
  // already used this split (bg on the outer <section>, container-p on an
  // inner wrapper); Stats just hadn't followed it.
  desktopOuter: "hidden bg-ink text-paper xl:block",
  // pt-[160px] (was 120px, owner, 2026-09-09, Figma node 819:329 revision)
  // -- confirmed from the frame's own geometry, now 900px tall: 160
  // (top) + 620 (media height) + 120 (bottom, unchanged) = 900.
  desktopSection: "container-p pt-[160px] pb-[120px]",
  // Standing rule (2026-08-24, applies to every dark full-bleed section):
  // content keeps a fixed 48px inset from the box's own top/bottom edges,
  // and the standard 72px section-to-section gap lives OUTSIDE the box as a
  // margin, not as extra padding inside it -- padding here would just make
  // the dark box taller, not create a visible gap (the exact bug found and
  // fixed on Hero). xl:mb-0 since desktop's gap is unrelated, handled by
  // the next section's own desktop top padding.
  // No mobile margin either (corrected 2026-08-24): unlike Hero, whose next
  // section is light, Stats is immediately followed by another dark section
  // (Inside the Factory) on the homepage, so a margin here would show as a
  // page-background-coloured gap splitting two black boxes that should read
  // as one continuous band. The two sections' own 48px internal insets
  // already give the content real breathing room without a colour seam.
  // flex flex-col gap-6: 24px between the artwork and the stat list,
  // confirmed via get_metadata.
  mobileSection:
    "container-p flex flex-col gap-6 bg-ink text-paper pt-12 pb-12 xl:hidden",
  // No more `mx-auto`/`w-fit` centring (owner, 2026-09-09, Figma node
  // 819:329 revision) -- the old 660+130+300=1090px group was narrower
  // than the 1280px content area, so it sat centred with extra margin
  // beyond `container-p`'s own 80px inset instead of meeting it. `w-full`
  // fills the content area, flush with the 80px inset on both sides -- no
  // new padding needed, `container-p` already supplies it.
  // Gap 130px -> 116px (the frame's own confirmed value) -> 92px (owner,
  // same day follow-up: "since 2009 text section make 24px less gap from
  // the image placeholder"). No longer sums to exactly 1280 (864+92+300=
  // 1256) -- the text column now sits 24px short of the right edge
  // instead of meeting it, an explicit, asked-for tradeoff.
  desktopInner: "flex w-full items-center gap-[92px]",
  // No `shrink-0` (real bug, found live: true horizontal overflow at
  // 1280/1366px) -- 864 (media) + 116 (gap) + 300 (list, its own
  // `shrink-0`) = 1280px of fixed-width content, which only fits inside
  // `container-p`'s available width at exactly 1440px and up (1440 -
  // 2*80px padding = 1280). Below that, `shrink-0` here forced the row
  // past the viewport instead of letting anything give -- the same class
  // of "genuinely fixed pixel widths don't fit at 1280/1366px" bug
  // already fixed elsewhere (Our Services' sticky column, ourFactoryProcess's
  // row). Only the media shrinks (aspect-ratio keeps its height in sync,
  // no distortion) -- the text column stays the real, fixed 300px Figma
  // width at every viewport, unlike the image, which has no such single
  // confirmed narrower-viewport size to fall back to.
  desktopMedia: "w-[864px]",
  // 300px fixed, not flex-1 -- corrected 2026-08-24: Figma's real text
  // column is a fixed 300px width (confirmed via get_metadata), not
  // however much space happens to be left after the media block, which had
  // been stretching the caption text far wider than the real design.
  // 40px gap between stats (was 48px, owner, 2026-09-09 revision, along
  // with the new divider line below -- see `item`'s own comment). `pb-
  // [40px]` (owner, same day, later follow-up: "100000 monthly capacity
  // should have 40px gap from the bottom") -- the last stat (no divider
  // of its own) otherwise sat flush with this list's own bottom edge,
  // confirmed live (0px gap) before this was added.
  desktopList: "flex w-[300px] shrink-0 flex-col gap-[40px] pb-[40px]",
  // Each stat: text block + a gradient divider line (except the last
  // stat, which has none -- confirmed via get_metadata, node 894:331 has
  // no "Line" child) -- 32px between them (owner, 2026-09-09 revision,
  // Figma node 819:329). Shared by both breakpoints: the owner's spacing
  // numbers carry no breakpoint split, and this replaces mobile's own
  // former border-based divided list entirely (see `divider`'s own
  // comment) -- `Stats.tsx` renders `divider` conditionally per item.
  item: "flex flex-col gap-[32px]",
  // Value + caption, 16px apart (was 8px -- owner, 2026-09-09 revision).
  // Desktop only now -- see `mobileItemText` below for mobile's own,
  // narrower value.
  itemText: "flex flex-col gap-[16px]",
  // Mobile-only value-to-caption gap, 4px (owner, 2026-09-10, mobile-only
  // review: "make that 8px gap to 4px from title to subline for since 2009
  // and others" -- was 8px, itself a 2026-09-09 revision down from
  // desktop's 16px). Diverges from desktop's 16px, so `Stats.tsx`'s mobile
  // item map uses this instead of the shared `itemText` above.
  mobileItemText: "flex flex-col gap-1",
  // The stat divider: a plain 2-stop linear gradient, not an image asset
  // -- Figma's own line asset (node 894:321 etc.) is an SVG whose
  // gradient stops are `#FF791B` -> `#121317`, an exact match for this
  // project's own `accent`/`ink` tokens, so it's reproduced with Tailwind
  // v4's gradient utility instead of committing and loading a static SVG
  // for a two-colour straight line.
  divider: "h-px w-full bg-linear-to-r from-accent to-ink",
  // 54px/400 (regular)/64px leading -- the size matches text-h1 exactly but
  // the weight doesn't (h1 is 500), so this is its own one-off, not a reused
  // token.
  value: "text-[3.375rem] font-normal leading-[64px]",
  // 20px/400/28px leading, #838d97 -- the same muted-on-dark colour already
  // confirmed independently for Hero's mobile ticker items, now a second
  // real confirmation of the same hex, not a coincidence. Also this
  // project's own now-formalized standing "subline on a dark section"
  // rule (docs/02-design-system.md) -- already correct, unchanged here.
  caption: "text-[1.25rem] font-normal leading-[28px] text-[#838D97]",
  mobileMedia: "w-full",
  // Was a plain `flex flex-col` relying on `mobileItem`/`mobileItemLast`'s
  // own border+padding for spacing -- then the same `gap-[40px]` shared
  // shape as `desktopList` above (see `item`'s own comment), now its own
  // 32px value (owner, 2026-09-09, same-day follow-up: "from separator to
  // next title gap should be 32px") -- diverges from desktop's 40px.
  // `pb-[40px]` added, same day, same reasoning as `desktopList`'s own
  // (owner: "100000 monthly capacity should have 40px gap from the
  // bottom") -- the last stat otherwise sat flush with this list's own
  // bottom edge, same 0px-gap issue confirmed on desktop.
  mobileList: "flex flex-col gap-[32px] pb-[40px]",
  // 40px (owner, 2026-09-10, mobile-only review: "since 2009, 75,000 and
  // remaining make these fonts 40px" -- was 30px, itself sized up
  // 2026-08-24 from the Figma-confirmed 24px/text-h5 match). Weight/leading
  // unchanged (medium/normal), only the size moved.
  mobileValue: "text-[2.5rem] font-medium leading-normal",
  // 18px/400/24px leading, #838d97 -- same colour as desktop, confirmed
  // separately on the mobile frame.
  mobileCaption: "text-[1.125rem] font-normal leading-[24px] text-[#838D97]",
};

/* --- InsideFactory ---------------------------------------------------- */
// Homepage section 9. Figma: desktop node 402:904, mobile node 402:914. The
// third dark section (Hero, Stats, now this) -- same background-bleed split
// as those two: bg-ink lives on an unconstrained outer wrapper, container-p
// only on an inner content wrapper, so the fill is edge-to-edge at any
// viewport width, never capped at 1440px.
export const insideFactory = {
  // xl: -> md: (owner, 2026-09-03, tablet-width review: "Inside the
  // factory should also use desktop version") -- then back to xl: (owner,
  // 2026-09-09: tablet should swipe with dots, not use the chevron -- see
  // `mobileSection`'s own comment below). True desktop (1280px+) only
  // again, matching Hero's ticker and Certified & Compliant's own desktop
  // row before this section briefly diverged from them.
  desktopOuter: "hidden bg-ink text-paper xl:block",
  // /our-factory's own reuse (owner, 2026-09-08: "same section we use on
  // homepage, it will be on white background, not eyebrow and title") --
  // `tone="light"` on InsideFactory.tsx swaps to this instead of the
  // homepage's bg-ink/text-paper pairing above. No separate no-heading
  // variant needed: `showHeading={false}` just skips rendering the heading
  // block entirely (see InsideFactory.tsx's own prop comments).
  desktopOuterLight: "hidden bg-paper text-text xl:block",
  // Heading only -- container-p's own 80px side inset. Provisional 120px
  // top, same caveat as What We Make/Certified & Compliant: this frame's
  // own top edge reads 60px, the same unreliable frame-crop pattern that
  // bit those two, so this defaults to the established rhythm instead of
  // trusting it directly. No bottom padding here: the gallery below is a
  // separate, full-bleed sibling (see desktopGalleryWrap), not a padded
  // child of this element.
  desktopSection: "container-p pt-[120px]",
  // Full-bleed, no side inset at all -- confirmed via get_metadata: the
  // real gallery spans x=0 to the frame's own full 1440px width, unlike the
  // heading above it, which does use the standard container-p inset. 72px
  // top (the heading-to-gallery gap, off-scale, kept exact) and 120px
  // bottom (this section's own bottom padding) both live here directly,
  // since this element has no horizontal padding to also carry them.
  desktopGalleryWrap: "pt-[72px] pb-[120px]",
  // Heading is SectionHeading (align="center", eyebrowTone="dark") -- now
  // that the sitewide eyebrow-colour rule exists (2026-08-24: #ABB5C0 on
  // dark, #17191E on light, no exceptions), this section's eyebrow needs no
  // custom colour override at all, so the earlier cascade-order concern that
  // led to bespoke markup no longer applies. 20px/500 desktop (matches this
  // section's own confirmed weight, not text-overline's 600).
  desktopEyebrowSize: "text-[1.25rem] font-medium leading-normal",
  // 812px real heading column (node 402:906), wrapping the copy to exactly
  // 2 lines -- unconstrained, it ran the full container width and wrapped
  // to 1. Same value already confirmed for Certified & Compliant.
  desktopHeadingNarrow: "max-w-[812px]",
  // Chevron-driven carousel (owner request, 2026-08-26, porting How It
  // Works' floating cursor-tracking chevron here) -- replaces the earlier
  // static 3-tile narrow-wide-narrow row, which only ever showed 3 of the 5
  // real factory shots. Cards are now uniform (950x550, same size as the
  // old centre tile) rather than narrow/wide, since a chevron-paged,
  // snap-centered carousel needs one consistent card pitch to page by --
  // the same reason How It Works' cards are all one size. Relative +
  // cursor-none for the same reason as How It Works: the floating chevron
  // IS the cursor here.
  //
  // `mx-auto max-w-[1440px]` added (real bug, found live, 2026-09-08): this
  // wrap has no width cap at all, so `desktopRow`'s own flat `xl:px-[80px]`
  // only matches `container-p`'s real inset up to 1440px -- above it,
  // `container-p` grows past 80px (it centers within its own 1440px cap),
  // but this flat 80px never moves, so the gallery's left edge drifted
  // further and further from every other section's on any screen wider
  // than 1440px (measured: 80px vs 320px at 1920px). Capping this wrap at
  // 1440px and centering it makes `desktopRow`'s existing 80px padding
  // behave exactly like `container-p` at every width, the same technique
  // `container-p` itself uses (width:100% + max-width + auto margins, not
  // a vw-based calc, so it isn't exposed to viewport-scrollbar-gutter
  // quirks a calc/vw approach would be) -- and matches this project's own
  // stated rule, "Max content width 1440px, centred, sitewide, no
  // exceptions" (`docs/02-design-system.md`). The section's own background
  // (`desktopOuter`/`desktopOuterLight`) stays a separate, unconstrained
  // full-bleed wrapper, untouched -- only the scrollable content is capped,
  // the same "background vs. content" split already established sitewide.
  desktopScrollerWrap: "relative mx-auto w-full max-w-[1440px] cursor-none overflow-hidden",
  // snap-center at `xl:` (not How It Works' snap-start) -- the point there
  // is the active card centers in the viewport, not aligns to an edge.
  // Padding is calculated (half the card width, 475px) so the first/last
  // card can still reach true center regardless of viewport width;
  // scroll-pl/pr mirror it so scroll-snap's own snap-point maths treats
  // that padding as safe space (the same class of bug already fixed once
  // on How It Works).
  // `md:` tier is a genuinely different layout, not the desktop centered-
  // snap technique scaled down (owner, 2026-09-03, two corrections on
  // this section's own tablet debut -- see `TABLET_CARD_WIDTH`'s own
  // comment in InsideFactory.tsx for the full history): flush-left,
  // starting at `container-p`'s own standard inset (`md:px-8`, 32px,
  // matching every other section's left edge, not a centering calc) with
  // `snap-start` (aligns to the card's own left edge, not centre) --
  // guarantees a real second-card peek at rest, and never needs the `xl:`
  // padding's negative-value clamping bug since there's no centering math
  // to go negative in the first place. `md:gap-6` (24px) matches
  // `TABLET_CARD_GAP`.
  // xl: centering padding recalculated to half of the new 1200px card
  // width (owner, 2026-09-08: card bumped to 1200x640, see `desktopCard`'s
  // own comment) -- was `calc(50%-475px)` (half of the old 950px card).
  // `overflow-x-hidden`, not `-auto` (owner, 2026-09-08: "user can only
  // scroll by clicking" -- see the header comment on `useDesktopChevronScroller`
  // in DesktopChevronScroller.tsx for the full history/reasoning). Still a
  // real scroll container -- `handleClick`'s own `scrollBy` keeps working --
  // it just no longer responds to wheel/trackpad/drag input, only to this
  // component's own JS-driven scroll calls.
  // `snap-x`/`snap-mandatory` (and the `scroll-pl`/`scroll-pr` padding that
  // only existed to keep its snap-point maths correct) dropped in the same
  // pass (owner, 2026-09-08: "still requires 2 times scroll to go up or
  // down, further make it smooth") -- CSS scroll-snap on an `overflow-
  // hidden` container is still a real snap container per spec, and in
  // practice (confirmed live) that combination makes some browsers treat
  // the very first wheel tick over it as a snap-settling attempt rather
  // than immediately chaining the scroll up to the page, reading as an
  // extra "dead" scroll before the page actually moves. Snapping only ever
  // mattered for wheel/drag-driven scrolling landing exactly on a card
  // boundary -- now that the ONLY way to move this track is `handleClick`'s
  // own exact `cardPitch`-sized `scrollBy` jump, there's no free-scroll
  // position left that snapping would ever need to correct.
  // `xl:px-[80px]`, not the old `calc(50%-600px)` centering formula (real
  // bug, found live, owner report, 2026-09-08: "should have 80px from the
  // left of the page, currently it has more") -- that formula only ever
  // equals 80px at one specific viewport width; centering math scales with
  // the viewport, so on any wider real screen the first card sat further
  // than 80px from the edge. It was a leftover from this row's original
  // wheel/drag-driven center-snap carousel (`xl:snap-center`, since
  // removed above) -- now that this track only ever moves via a precise
  // click-driven jump, there's no reason left for it to differ from every
  // other full-bleed gallery on the site (`exhibitions.desktopRow`/
  // `howItWorks.desktopRow`/`productCustomizeSteps.desktopRow`), which all
  // already use this exact flat 80px, matching `container-p`'s own real
  // `xl:` inset (app/globals.css).
  // `md:` tier removed, 2026-09-09 -- this whole gallery only renders at
  // `xl:` now (see `desktopOuter`'s own comment), so the base/`md:`-tier
  // values that used to serve the tablet range are unreachable dead code.
  // Real, no-longer-conditional desktop-only values now.
  desktopRow: "no-scrollbar flex w-full items-center gap-12 overflow-x-hidden scroll-smooth px-[80px]",
  // 1200px (owner, 2026-09-08: "increase the size to 1200px width by
  // 640") -- must match `DESKTOP_CARD_WIDTH` in InsideFactory.tsx and
  // `desktopRow`'s own gap above. The `md:`/tablet-tier 469px width is
  // gone, 2026-09-09 -- see `desktopRow`'s own comment.
  desktopCard: "w-[1200px] shrink-0",
  // "15:8" (1200x640, owner, 2026-09-08: "increase the size to 1200px
  // width by 640") -- see that ratio's own comment in `media.ratio`. The
  // `md:`/tablet-tier "469:320" ratio is gone, 2026-09-09, along with the
  // rest of this gallery's own former tablet tier -- see `desktopRow`'s
  // own comment.
  desktopCardMedia: "aspect-[15/8]",
  // Caption under each image (owner, 2026-09-08: "under each image there
  // will be text label ... 24 by 28 line height ... space from image to
  // title is 32px", then "text will be left align to image, make it
  // regular weight") -- a new, separate element below the media box, not
  // the placeholder's own internal centred label (`media.label`), which
  // stays for use elsewhere. `mt-8` is the 32px gap; left-aligned to the
  // image (this card's own text-left default), font-normal not font-medium.
  // Colour changed text-paper -> #838d97 (owner, 2026-09-08: "text under
  // the inside the factory image change the color to #838D97") -- this
  // project's own established muted-on-dark literal (Stats' caption,
  // mega-menu labels, etc.), not a new one-off value.
  desktopCardLabel: "mt-8 text-[1.5rem] font-normal leading-[28px] text-[#838d97]",
  // /our-factory's `tone="light"` reuse: same size/weight/gap, `text-text`
  // instead of `text-paper` now that the card sits on a white section.
  desktopCardLabelLight: "mt-8 text-[1.5rem] font-normal leading-[28px] text-text",
  // The floating chevron is the shared `chevronScroller` recipe -- see the
  // note on `howItWorks` above.
  // CTA to Our Factory, added 2026-08-26 (owner request), sitting under the
  // gallery inside the same full-bleed wrap. 56px top gap from the gallery
  // (owner call, 2026-08-26, overriding the initial 48px default).
  desktopCtaWrap: "flex justify-center pt-14",

  // Standing rule for every dark full-bleed section (established on Hero,
  // 2026-08-24): content keeps a fixed 48px inset from the box's own top/
  // bottom edges; the standard 72px section gap is a margin on the section
  // itself, not padding inside it. This frame's own raw edges happen to
  // already read 48px/48px, matching the rule for once.
  // No mobile margin (corrected 2026-08-24, same reasoning as Stats): the
  // next section (Final CTA) is also dark, so a margin here would show as a
  // page-background seam between two black boxes that should read as one
  // continuous band.
  // `md:hidden` -> `xl:hidden` (owner, 2026-09-09: swap the tablet chevron
  // for swipe+dots) -- this carousel now covers real mobile and tablet
  // alike, the desktop chevron gallery above moved to `xl:` to match.
  mobileSection: "bg-ink text-paper pt-12 pb-12 xl:hidden",
  // /our-factory's `tone="light"` reuse -- bg-paper/text-text instead of
  // the homepage's bg-ink/text-paper. `pt-[40px]` (owner, 2026-09-09,
  // mobile-only review: "factory shots ... top space should be 40px" --
  // this instance always renders with `showHeading={false}`, so this is
  // the gallery's own top gap, not a heading-to-gallery one) -- was pt-12
  // (48px), matching the homepage's own `mobileSection` above; exclusively
  // used by /our-factory (confirmed: `mobileSection` above is the only
  // token the homepage's own dark instance uses), so safe to change here
  // without touching the homepage's unrelated 48px. `pb-12` unchanged --
  // bottom wasn't part of this request. `xl:hidden`, matching `mobileSection`
  // above -- this carousel now covers tablet too (no separate "Xl" variant
  // needed any more; both tone variants share the same breakpoint).
  mobileSectionLight: "bg-paper text-text pt-[40px] pb-12 xl:hidden",
  // container-p only on the heading, not the gallery below -- the gallery
  // is full-bleed edge to edge (confirmed via get_metadata: no side inset
  // at all), unlike every other section's mobile content. Eyebrow is now
  // centred (owner correction, 2026-08-24) via SectionHeading's align
  // prop, and 16px/600 leading matches this section's confirmed mobile
  // size.
  mobileHeadingWrap: "container-p",
  // No `mobileEyebrowSize` override any more (2026-09-10 cleanup): this
  // exact `max-md:.../md:text-overline` split is now `eyebrow.size`'s own
  // sitewide default.
  // 48px gap from the heading down to the gallery (owner call, 2026-08-25,
  // overriding Figma's raw 32px read).
  mobileGalleryGap: "mt-12",
  // CTA to Our Factory, added 2026-08-26 (owner request). Same 48px gap
  // below the gallery as mobileGalleryGap uses above it, kept inside
  // container-p since the gallery itself is full-bleed but the button
  // should not span edge to edge.
  mobileCtaWrap: "container-p flex justify-center mt-12",
  // Swipeable carousel via native CSS scroll-snap, not custom drag-tracking
  // JS for the SCROLLING itself -- gives smooth finger-drag-following
  // behaviour and automatic snap-to-centre for free, and works correctly at
  // every mobile viewport width, not just Figma's exact 360px reference.
  // Confirmed NOT an auto-rotating carousel: the owner was swiping it by
  // hand in the reference video (finger not visible in the recording), so
  // there is no timer here at all, manual scroll only.
  // padding-inline centres the FIRST and LAST cards too -- without it, the
  // first card's left edge would be flush against the viewport edge and
  // could never scroll into a centred position. Cards touch with zero gap
  // between them (confirmed via get_metadata: consecutive card edges are
  // flush, e.g. the "peek" sliver's right edge exactly equals the centre
  // card's left edge).
  // Padding is capped at 40px (min(...)), not left as a pure percentage
  // formula (corrected 2026-08-25: reported broken on a large mobile
  // viewport, e.g. Samsung Fold-class devices). This carousel is `xl:hidden`,
  // so it also renders at tablet-range widths (700-1024px) where the pure
  // `(100% - 300px) / 2` formula produces a huge side inset (e.g. 250px at
  // 800px wide) -- wide enough that a second full card becomes visible next
  // to the first, breaking the intended one-active-card-with-peeking-
  // neighbours illusion into what reads as a broken 2-up grid. Capping the
  // padding at the design's own confirmed ~40px peek keeps the carousel
  // reading correctly at any width from a narrow phone up through tablet-
  // range "mobile" viewports; it still expands down to true centring below
  // ~380px wide, where the formula's own value is smaller than 40px anyway.
  // Two real, both-kept card sizes (owner, 2026-09-10: tried a wider
  // landscape card against real photography -- "wider looks better, let's
  // use it but don't descard the other one, keep it in the design system
  // we might need it again") -- `Wide` is now the default every existing
  // page gets (`InsideFactory.tsx`'s own `cardSize` prop, default
  // `"wide"`); `Compact` is the original near-square 300x340 active ratio,
  // kept as a real, selectable variant (not deleted, not just a comment)
  // for whichever future gallery turns out to want tighter/more-portrait
  // crops instead of this one's wide factory-floor coverage. Without a
  // fixed height here the track's height is intrinsic (sized to its
  // tallest child), so every scroll-frame height write to a card also
  // changes the track's own box, which reflows the whole section and
  // reads as the entire background shifting while the user swipes.
  // Pinning it here means cards only ever grow/shrink inside a box that
  // itself never moves. `md:` padding tier matches the wider tablet card
  // the same way the base tier matches the mobile one (safe centring
  // space for the first/last card).
  // `gap-3` (12px, same owner request, real-photography test: "images
  // should not collapse with one another... have some shadow or some
  // treatement under the focus image so it does not touch or collapse with
  // the behind ones") -- cards used to sit flush edge to edge, invisible
  // with the grey placeholder fill but reading as genuinely merged once
  // real photography has hard edges. A small breathing gap plus the active
  // card's own shadow below (`mobileCardActiveShadow`) are the two pieces
  // of that fix, and apply to both sizes -- this one is real space, not
  // implied by the shadow alone.
  mobileTrackWide:
    "no-scrollbar flex h-[255px] items-center gap-3 snap-x snap-mandatory overflow-x-auto px-[min(40px,calc((100%-340px)/2))] md:h-[398px] md:px-[min(40px,calc((100%-530px)/2))]",
  mobileCardWide: "w-[340px] shrink-0 snap-center md:w-[530px]",
  // The original 300px mobile/469px tablet, 300x340 active ratio -- see
  // `mobileTrackWide`'s own comment above for why this is kept, not
  // dropped, now that `Wide` is the default.
  mobileTrackCompact:
    "no-scrollbar flex h-[340px] items-center gap-3 snap-x snap-mandatory overflow-x-auto px-[min(40px,calc((100%-300px)/2))] md:h-[532px] md:px-[min(40px,calc((100%-469px)/2))]",
  mobileCardCompact: "w-[300px] shrink-0 snap-center md:w-[469px]",
  // Track-to-dots gap: 28px (owner, 2026-09-10: "give 12px more space to
  // the dots from the top" -- was `gap-4`/16px). No `items-center` here
  // (real bug, found live via the Playwright overflow sweep): the track
  // has no explicit width class of its own -- it always relied on simply
  // being an ordinary block-level child, which fills its container's
  // width by default. Once it became a flex item here, `items-center` (a
  // non-`stretch` cross-axis alignment) made the browser size it to its
  // own un-clipped CONTENT width (all cards) instead of stretching to the
  // column's width, forcing real page-level horizontal scroll. Default
  // `align-items: stretch` (omitting the class entirely) keeps the
  // track's own correct full-width sizing; the dots row is centred on its
  // own instead (`mx-auto`), via `cardCarousel.dotsRow`'s own
  // intrinsic/content width.
  // No `gap-*` any more (was `gap-7`/28px) -- that track-to-dots spacing
  // now lives on the shared `cardCarousel.dotsRow` itself (`mt-[28px]`,
  // see its own comment), the single source for this gap sitewide, not a
  // per-caller wrapper value.
  mobileCarouselWrap: "flex w-full flex-col",
  // Active-card lift (same 2026-09-10 request as `mobileTrack`'s own `gap-3`
  // above): a real drop shadow, not the theme's own `shadow-card` (tuned
  // for a light/paper card and its ~8% black would vanish against this
  // section's own near-black `bg-ink`) -- strong enough to read against the
  // homepage's own dark `bg-ink`. Applied only to the currently-centred
  // card in InsideFactory.tsx (`index === activeIndex`), so the "this one
  // is in focus" read comes from depth, not just its own height.
  //
  // `/our-factory`'s own `tone="light"` reuse (`bg-paper`) needs a separate,
  // much lighter shadow -- this dark one, on a white background, read as a
  // literal black smudge behind the image (owner, 2026-09-10: "why there is
  // black shadow behind the factory images on factory page ... fix it").
  // `mobileCardActiveShadowLight` reuses the sitewide `shadow-card` token
  // (the same subtle light-surface shadow every other card on a paper
  // background already uses), picked in InsideFactory.tsx by `tone`.
  mobileCardActiveShadow: "shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)]",
  mobileCardActiveShadowLight: "shadow-card",
  // Active/inactive card ratios (MediaRatio values, not classNames -- see
  // InsideFactory.tsx) are defined there directly, not here: the active
  // (centred) card renders taller than its neighbours -- a real overlap
  // effect confirmed via get_metadata (300x340 active vs 300x248 inactive,
  // both vertically centred in the row), not a uniform flat filmstrip.
  // Since every card becomes "active" as the user swipes through in turn,
  // this can't be pre-baked into static CSS -- the component tracks the
  // nearest-centred card via the track's own scroll position (a simple
  // index = round(scrollLeft / cardWidth), exact here since cards have
  // zero gap) and swaps each card's MediaPlaceholder ratio, which resizes
  // it via aspect-ratio with no layout-shifting height set on the wrapper.
};

/* --- FinalCta -------------------------------------------------------- */
// Homepage section 10, the page's closing CTA. Figma: desktop node
// 409:5309 ("Desktop CTA"), mobile node 409:5342 ("Mobile CTA"). A single
// bg-ink section on both breakpoints (unlike Hero/Stats/InsideFactory,
// this one has no lighter counterpart before or after within the section
// itself, and it's the last section on the page, so there's no full-bleed
// vs. container-p split to worry about beyond the standard one).
export const finalCta = {
  // 60px top / 24px bottom -- this frame's own confirmed padding, trusted
  // directly (not the usual 120/120 py-section rhythm): came straight from
  // get_design_context's real values, not an inferred/cropped screenshot
  // reading, so there's no reason to default to the established rhythm
  // instead the way What We Make/Certified & Compliant/Inside the Factory's
  // *top* edges did.
  // xl: -> md: (owner, 2026-09-04, homepage tablet-width review: "Use the
  // same cta as desktop") -- same split already applied to Hero's ticker,
  // Certified & Compliant, and Inside the Factory/Exhibitions: the CTA
  // block + Marquee ticker (one continuous band) reads fine at real
  // tablet width, so the mobile ticker-list-then-CTA layout is real-
  // mobile-only now.
  desktopOuter: "hidden bg-ink text-paper md:block",
  // container-p lives here, on the CTA block only -- Marquee supplies its
  // OWN container-p internally (see marquee.innerStacked), so it renders as
  // a sibling of this wrapper, never nested inside it, or the side padding
  // doubles (the exact bug already found and fixed on the offerings
  // ticker). Marquee also carries its own pt-10/pb-8 vertical padding; the
  // 110px margin-top on the Marquee instance below makes up the rest of
  // Figma's confirmed 150px gap (150 - Marquee's own 40px top pad), and its
  // own 32px bottom padding is accepted as this section's bottom breathing
  // room in place of Figma's 24px -- a deliberate reuse decision, not a
  // missed value.
  // md:pt-[28px] (owner, 2026-09-04: "reduce 32px space from the top of
  // the title let's build") -- 32px off the confirmed 60px desktop value,
  // only at `md:` (768-1279px); `xl:pt-[60px]` restores the original
  // explicitly, same reasoning as `desktopTickerTablet` above (`md:` stays
  // active at `xl:` too unless overridden there). Applies to both of this
  // component's homepage usages (this token is shared, not per-instance),
  // consistent with every other shared `finalCta` token.
  desktopSection: "md:pt-[28px] xl:pt-[60px]",
  // Only applied when this instance has no ticker (FinalCta.tsx) -- the
  // ticker's own Marquee normally supplies this section's entire bottom
  // padding (its `pb-8`, accepted as this section's own breathing room, see
  // the comment above), so a ticker-less usage needs its own, or the CTA
  // button sits flush against whatever follows with zero gap (a real bug,
  // found live on the second, closing-CTA usage, 2026-08-27). 60px mirrors
  // the section's own pt-[60px] for a symmetric top/bottom rhythm.
  // pb-[84px] (was 60px, owner call 2026-08-30: "add 24px more at the
  // bottom of the black background") -- this section is the last on the
  // page, so its own bottom padding is the very last thing before the
  // page ends.
  desktopSectionNoTicker: "pb-[84px]",
  // Services page's own no-ticker usage (owner, 2026-09-08: "let's build
  // cta title should have 72px from top gap" -- was the shared
  // `desktopSection`'s own `xl:pt-[60px]"). `xl:!pt-[72px]` overrides just
  // that value for this one instance, same reasoning
  // `mobileCtaBlockNoTickerServices` documents for its own mobile
  // counterpart -- the homepage's own no-ticker usage keeps the shared 60px.
  desktopSectionNoTickerServices: "pb-[84px] xl:!pt-[72px]",
  desktopCtaBlock: "container-p flex flex-col items-center gap-12",
  // Fixed min-width (owner call, 2026-08-27) so the button reads the same
  // size regardless of label length -- "Request a Sample" (this section's
  // original label) measures ~237px; "Let's Talk" (the second, closing CTA's
  // own label) would otherwise render notably narrower and read as
  // inconsistent between the two CTA bands on the same page.
  desktopButton: "min-w-[240px] justify-center",
  // Opt-in row for a second, outline button (`secondaryCta`, added
  // 2026-09-07 for the Services page's own closing CTA: primary "Request a
  // Sample" plus secondary "Download Catalog") -- same `gap-4` row already
  // used by `servicesHero.buttons`' desktop pairing, not a new value.
  desktopButtonRow: "flex items-center gap-4",
  // Stacked full-width, same `gap-4` as the desktop row above -- matches
  // `servicesHero.buttons`' own mobile stack.
  mobileButtonRow: "flex w-full flex-col gap-4",
  // Tablet-only trim (owner, 2026-09-04: "reduce the space from top and
  // bottom of compliance section. reduce 32px from both sides") --
  // `Marquee`'s own shared `basePaddingDefault` (`pt-10 pb-8`, every
  // Marquee instance sitewide) supplies the ticker band's top/bottom
  // space; this override applies only to THIS instance (passed as
  // `className` on FinalCta.tsx's own `<Marquee>`, not a recipe-wide
  // change) and only at `md:` (768-1279px, where this whole desktop block
  // first became visible -- see this file's own `desktopOuter` comment),
  // cutting exactly 32px off the top: `pt-10` (40px) -> `md:pt-2` (8px).
  // `xl:pt-10` restores the original desktop value explicitly -- `md:` is
  // a min-width breakpoint and stays active at `xl:` too unless overridden
  // there, the exact bug already caught once on Inside the Factory's own
  // tablet image ratio.
  //
  // Bottom was cut the same way (`md:pb-0`) but corrected the same day
  // (owner: "cta bottom AQL inspection ticker does not have right space
  // from the bottom. use same as desktop") -- reverted entirely; bottom
  // padding now stays the shared `pb-8` (32px) at every width, matching
  // desktop, no `md:` override at all for it.
  desktopTickerTablet: "md:pt-2 xl:pt-10",
  desktopHeadingWrap: "flex flex-col items-center gap-4 text-center",
  desktopHeading: "text-h1",
  // 20px/32px-line-height (owner correction, 2026-09-01: "On desktop, CTA
  // subline font size should be 20px and line height 32, its a global
  // component, should be applied to all the pages") -- supersedes a
  // 2026-08-30 pass that set this to 18px/leading-6 (24px); this
  // component is shared verbatim by the homepage and every PLP/PDP's
  // closing CTA, so the change applies everywhere with this one edit.
  // Mobile's own subline is untouched (owner scoped this to desktop only).
  desktopSubline: "max-w-[623px] text-[1.25rem] font-normal leading-8 text-[#838D97]",

  // Inside the Factory (also dark) precedes it directly, so still no
  // margin here (that would show as a page-background seam between two
  // black boxes) -- but the owner asked for real breathing room between
  // the two sections' content specifically at this boundary (2026-08-25),
  // overriding Figma's own raw pt-0 read. 72px padding-top keeps both
  // sections' boxes flush black while giving the content itself the
  // standard mobile section-to-section rhythm.
  mobileOuter: "bg-ink text-paper md:hidden",
  // No bottom padding here -- the gap down to the CTA block below is
  // entirely `mobileCtaBlock`'s own 72px top padding (owner call,
  // 2026-08-25: a combined 172px, Figma's raw 100px plus the CTA block's
  // 72px, read as too much once both were on screen together; one side
  // owning the whole confirmed 72px reads correctly and matches this
  // project's own established pattern for a gap between two stacked
  // blocks, one pt-0 + one pb/pt carrying the full value).
  mobileTickerBlock: "container-p flex flex-col items-center gap-8 pt-[72px] pb-0",
  // Opt-in for the OTHER ticker'd usage of this component (the Activewear
  // PLP, app/activewear/[category]/page.tsx, 2026-08-30 -- owner: "Standard
  // on every order" should have a 72px gap from the section above it).
  // There, this ticker block follows Faq directly, and Faq's own
  // mobileSection already supplies a standard pb-[72px] -- stacking this
  // block's own pt-[72px] on top doubled the real gap to 144px. The
  // homepage's ticker'd usage (after Exhibitions, whose own mobileSection is
  // only pb-12/48px) still needs the full pt-[72px] above, so this is a
  // second, opt-in class -- same "one side owns the gap" reasoning as
  // `mobileCtaBlockNoTicker` above, not a change to the shared default.
  mobileTickerBlockTight: "!pt-0",
  mobileTickerLabel: "text-[1rem] font-normal leading-[1.2] text-center",
  mobileTickerList: "flex flex-col items-center gap-6",
  // Rest colour #838D97 (owner call, 2026-08-25, replacing the initial
  // #ABB5C0 guess) -- same muted grey already used for Stats' caption and
  // this section's own subline, not the sitewide eyebrow hex (this is body
  // copy, not an eyebrow, so it isn't driven by that token). Colour is
  // overwritten per-item by the scroll listener in FinalCta.tsx (white when
  // centred), this is just the base.
  mobileTickerItem: "text-[1.5rem] font-normal leading-[1.2] text-[#838D97] transition-none",
  // 72px top (owner call, 2026-08-25, real breathing room from the ticker
  // block above -- both still the same black box, no seam), 60px bottom.
  mobileCtaBlock: "container-p flex flex-col items-center gap-8 pt-[72px] pb-[60px]",
  // Ticker-less usage only (the second, closing CTA -- FinalCta.tsx): the
  // 72px above exists to separate this block from a ticker block sharing
  // the SAME black box; with no ticker, this block is the section's only
  // content, so that top padding stacks on top of the previous section's
  // own standard pb-[72px] instead, reading as an oversized gap (real bug,
  // found live 2026-08-27). `!pt-0` (not a bare `pt-0`) puts this section
  // back on the sitewide mobile section-to-section rhythm -- confirmed live
  // that a bare `pt-0` was NOT enough: same-specificity plain-utility
  // pairs are settled by Tailwind's own generated-stylesheet order, not by
  // position in the class string, and `pt-[72px]` happened to win. Same
  // class of bug already documented for `hidden xl:inline-flex` on Button
  // and the `min-[1920px]:` heading override -- `!important` is the fix
  // every time, not reordering the class list.
  // !pb-[84px] added (was the shared 60px from mobileCtaBlock, owner call
  // 2026-08-30: "add 24px more at the bottom of the black background") --
  // same reasoning as desktopSectionNoTicker's own bump; scoped to this
  // no-ticker override so the FIRST FinalCta usage (with a ticker, after
  // Exhibitions) keeps its own unrelated 60px.
  mobileCtaBlockNoTicker: "!pt-0 !pb-[84px]",
  // Services page's own no-ticker usage, directly under `HowItWorks`
  // (owner, 2026-09-08: "let's build cta title should have 72px from top
  // gap") -- that section's own mobile `pb-12` (48px) is its real,
  // standing value (shared with the homepage's own light-tone usage, not
  // itself a bug), so `!pt-0` here landed only 48px total, not the
  // standard 72px. `!pt-6` (24px) makes up the missing 24px on this one
  // instance -- scoped separately from `mobileCtaBlockNoTicker` above so
  // the homepage's own no-ticker usage (`app/page.tsx`'s `home.closingCta`,
  // which follows Faq's own different bottom padding) is unaffected.
  mobileCtaBlockNoTickerServices: "!pt-6 !pb-[84px]",
  mobileHeadingWrap: "flex flex-col items-center gap-3 text-center",
  mobileHeading: "text-[2.25rem] font-medium leading-[2.5rem]",
  // 18px (owner correction 2026-08-30: "cta subline font size should be
  // 18px as other places") -- back to the same size/leading-6 pairing this
  // subline used before the 2026-08-28 bump to 24px, and the same pairing
  // this size already uses everywhere else on the site.
  mobileSubline: "text-[1.125rem] font-normal leading-6 text-[#838D97]",
  // Owner, 2026-09-08: "on large mobile viewport [button] does not scale
  // edge to edge, on 360 it is fine but on large view it's not scaling" --
  // the fixed `w-[320px]` matched a 360px viewport (container-p's own side
  // padding leaves ~320px of content) but stayed pinned to that width on
  // any wider mobile viewport instead of growing with the container. `w-full`
  // lets it fill `mobileCtaBlock`/`mobileButtonRow`'s own container-p
  // width at every mobile size, same pattern already used elsewhere on the
  // site (e.g. `servicesHero.ctaPrimary`'s own `w-full`).
  mobileButton: "w-full justify-center",
};

/* --- OurServices (homepage section 11) -------------------------------- */
// Figma: desktop node 415:5449, mobile node 415:5484. A light section --
// no bg-ink split needed, the page's own default background already works.
export const ourServices = {
  // Dark `tone` variant (owner, 2026-09-09: "bring services section under
  // certified section... create a variance of services section in dark
  // mode, use the same black background color we are using") -- same
  // shape as `howItWorks.darkSurface` (`bg-ink`/`text-paper`), kept as its
  // own literal rather than importing that token: every section here owns
  // its own recipe, the established sitewide convention even for
  // identical two-class strings. `text-paper` sets the ambient colour
  // once so the eyebrow/heading/card titles below (all colourless on
  // their own) inherit pure white for free -- no separate white override
  // needed anywhere.
  //
  // Applied to its own unconstrained wrapper around BOTH the desktop and
  // mobile blocks (owner follow-up, same day: "make the black background
  // edge to edge") -- not on `desktopSection`/`mobileSection` themselves,
  // which both carry `container-p` (capped at 1440px). A background on
  // that same capped element stops at 1440px too, showing the page's own
  // background outside it on any wider viewport instead of true
  // edge-to-edge black -- the exact bug this project's other full-bleed
  // dark sections (Hero, Stats, Inside the Factory, FAQ) already avoid by
  // splitting background (outer, unconstrained) from `container-p`
  // (inner). Real bug here too, not just a class-order guess: initially
  // landed on `desktopSection`/`mobileSection` directly, confirmed
  // clipping at 1920px+.
  darkSurface: "bg-ink text-paper",
  // 32px image-to-title-block gap (owner spec, this dark placement only)
  // -- replaces `capabilityCard.root`'s own default (16/24px) via its
  // `rootClassName` override, the mechanism that prop exists for; the
  // shared default stays untouched for every other `CapabilityCard`
  // caller (light Our Services, How It Works, ProductCustomizeSteps).
  cardRootDark: "flex flex-col gap-8",
  // 12px title-to-subline gap (owner, 2026-09-09, same day: corrected
  // from an initial 16px -- "make it 12px") -- same reasoning as
  // `cardRootDark` above, via `bodyClassName`. Subline colour itself
  // needs no new token: `capabilityCard.textDark` already resolves to the
  // sitewide `#838D97` muted-on-dark literal once `tone` is forwarded.
  cardBodyDark: "flex flex-col gap-3",
  desktopSection: "container-p hidden gap-[221px] pt-[120px] pb-[120px] xl:flex xl:items-start",
  // Dark-tone desktop variant, homepage only (owner, same day: "next
  // section gap should be 160px") -- a complete, self-contained string
  // like `desktopSectionServices` below, not `desktopSection` plus a
  // second `pb-*` utility layered on top: two same-specificity utilities
  // touching the same property is this project's own established
  // "doesn't reliably resolve by class-list order" bug class (see e.g.
  // `howItWorks.desktopOuterLight`/`desktopOuterDark`'s own split for the
  // same reasoning). Only the bottom gap changes (120px -> 160px, the
  // space down to `Stats`, this section's new next-door neighbour); the
  // top gap down from Certified & Compliant is unchanged at 120px, not
  // asked for. No background here any more -- see `darkSurface` above.
  desktopSectionDark: "container-p hidden gap-[221px] pt-[120px] pb-[160px] xl:flex xl:items-start",
  // Services page reuse (owner, 2026-09-07: "use as is, just check the
  // spacing from the top in this page and use it") -- same section, same
  // cards, only the outer top/bottom breathing room changes to match this
  // page's own Figma frame (node 729:363, "Our Services": content starts
  // 160px from the frame's own top, and 2660 - 160 - 2360 = 140px remains
  // below the tallest card column, both get_metadata-confirmed), not
  // homepage's 120/120. Everything else in this recipe (gap, sticky
  // offset, card sizing) is shared as-is.
  //
  // Corrected 2026-09-07 from an initial `pb-[80px]` -- a real bug, not a
  // deliberate value: that number was copied from a DIFFERENT Figma node
  // (729:208), which turned out to be a separate, not-yet-built section
  // ("Trust Signals", the 4-up strip) that sits earlier on this same page,
  // not this section's own real bottom padding. Found while building that
  // actual Trust Signals reuse and re-checking this section's own node
  // directly instead of trusting the earlier citation.
  desktopSectionServices: "container-p hidden gap-[221px] pt-[160px] pb-[140px] xl:flex xl:items-start",
  // Services page's own eyebrow size (owner, 2026-09-08: "our services
  // eyebrow should also be same as others 16px", then corrected the same
  // day: "on desktop it should be 20px as on home. All the above chages
  // were for mobile only") -- 16px only below `md:`; `md:text-[1.25rem]
  // md:leading-[1.2]` restores the shared default Eyebrow size (matching
  // the homepage's own `--text-overline`) from `md:` up. Scoped to
  // `pageVariant === "services"`, not the shared default, since the
  // homepage's own usage wasn't part of this request either way.
  eyebrowSize: "max-md:text-[1rem] max-md:leading-normal font-semibold md:text-[1.25rem] md:leading-[1.2]",
  // Sticky sidebar via plain CSS, no scroll listener: the right column's
  // own stacked height is what makes the page taller than the viewport, so
  // pinning this column at top-[56px] with self-start naturally keeps it in
  // place until the right column's bottom edge passes, then it scrolls
  // away with the page -- exactly the "fixed at 56px while the right side
  // scrolls" behaviour asked for (owner call, 2026-08-25), no JS needed.
  // No shrink-0 -- the same overflow bug already found once on Inside the
  // Factory's fixed-width row: at 1280/1366px, 579 (heading cap) + 221
  // (gap) + 480 (card) doesn't fit the available width, so this column
  // must be allowed to shrink narrower (the heading just wraps to more
  // lines; its own min-content is far smaller than 579px).
  desktopSticky: "sticky top-[56px] min-w-0 self-start",
  // This column's actual rendered width isn't governed by max-w-[579px] at
  // all -- confirmed by measurement (raising the max-width to 2000px live
  // didn't move it) -- it's set by flex-shrink math: container-p's content
  // width (1280 at any viewport, since container-p itself stays capped at
  // 1440 including its own padding) minus the 221px gap minus the card
  // column's fixed 480px, leaving exactly 579px for this column at every
  // desktop width, 1280 through 1920+. max-w-[579px] on the heading just
  // documents that number, it doesn't produce it.
  //
  // That means text-h1's own further growth at 1920+ (54px at 1440 -> 65px
  // at 1920, its own clamp token) is the actual bug: the same 579px column
  // wraps to 2 lines at 54px (matching every other confirmed viewport) but
  // 3 lines at 65px, with no width change possible to compensate without
  // either shrinking the Figma-confirmed 480px card or the 221px gap.
  // min-[1920px] freezes this one heading's size at its 1440 value (54px =
  // 3.375rem) instead -- the least invasive fix, since it changes nothing
  // about this section's actual confirmed geometry, only stops one
  // already-cramped heading from trying to grow into room that isn't there.
  // `!` (important) is required, not optional here: `sectionHeading.heading`
  // (shared, applied first via cx) sets `xl:text-h1`, which is also a real
  // match at 1920px -- two same-specificity utilities for the same property
  // don't reliably resolve by class-list order (the exact bug this
  // project's cascade-safety rule exists for), confirmed live: without `!`
  // this override compiled correctly but still lost to `xl:text-h1` at a
  // real 1920px viewport.
  desktopHeadingWidth: "max-w-[579px] min-[1920px]:!text-[3.375rem]",
  // Owner, 2026-09-04: "our services should also be in title in 2 lines as
  // others" -- the mobile-block heading (rendered at tablet width too,
  // since this section's desktop sticky-sidebar layout is still xl:-only)
  // had no width constraint at all, unlike every other homepage section's
  // centred heading (Certified & Compliant, Inside the Factory,
  // Exhibitions, How It Works all force their real Figma 2-line wrap via
  // the same `max-w-[812px]`) -- it just ran the full container width and
  // wrapped wherever it happened to, not necessarily 2 lines. No effect at
  // real phone width (already narrower than 812px); forces the same
  // confirmed 2-line wrap once the tablet container exceeds it.
  mobileHeadingWidth: "max-w-[812px]",
  desktopList: "flex flex-1 flex-col gap-[60px]",
  desktopCardWidth: "w-[480px]",
  // 8:5 desktop (480x300), 7:5 mobile (280x200) -- neither matches
  // CapabilityCard's own aspect-video (16:9) default, confirmed via
  // get_design_context, not a guess.
  cardMediaRatio: "aspect-[7/5] xl:aspect-[8/5]",

  // md:pt-[88px] (owner, 2026-09-04, tablet-width review: "Our services
  // eyebrow section should have 40px more space from the top") -- this
  // block is `xl:hidden` (real mobile through 1279px tablet, desktop's own
  // sticky-sidebar layout is `xl:`-only and not yet extended to `md:`), so
  // no `xl:` reset is needed the way other tablet-tier overrides this
  // session required -- the block never renders at `xl:` regardless.
  // +40px on top of the confirmed mobile top gap, tablet-only.
  // `pt-16` (64px, owner, 2026-09-10, mobile-only review: "make it 64px" --
  // was `pt-12`/48px) -- real mobile's own top gap; `md:pt-[88px]` is a
  // separate, already-confirmed tablet value, unaffected.
  mobileSection: "container-p flex flex-col items-center gap-8 pt-16 md:pt-[88px] pb-12 xl:hidden",
  // Services page reuse, mobile: no Figma mobile spacing was given for this
  // placement, so this follows the project's standing 72px inter-section
  // gap rule instead of homepage's own pt-12/md:pt-[88px] figures.
  // `pb-[60px]` (owner, 2026-09-10, mobile-only review: "our services
  // section ends reduce 12px space from the bottom") -- was the standing
  // 72px, -12px here specifically; top gap and every other value unaffected.
  mobileSectionServices: "container-p flex flex-col items-center gap-8 pt-[72px] pb-[60px] xl:hidden",
};

// Shared by every mobile card carousel (Our Services first, How It Works
// second) -- extracted into components/CardCarousel.tsx once a second
// section needed the exact same swipeable-track-plus-dots pattern, same
// "build once, reuse everywhere" reasoning as ScrollSpotlightList.
export const cardCarousel = {
  track: "no-scrollbar flex w-full gap-4 overflow-x-auto px-[20px] snap-x snap-mandatory",
  card: "w-[280px] shrink-0 snap-start",
  // One dot per real card, not necessarily whatever count Figma's own
  // static dot-graphic export shows -- that asset is a flat image, not
  // aware of the section's real item count (Our Services' own export was a
  // mismatched 4 dots for 5 real cards; reproduced from the item list
  // instead of the asset every time, not just that once).
  // `mt-[28px]` (owner, 2026-09-10: "dots are too close make 12px gap from
  // the top, apply it to all") -- was 16px (via each caller's own wrapper
  // `gap-4`), +12px = 28px, matching `insideFactory.mobileCarouselWrap`'s
  // own already-correct 2026-09-10 value. Used directly by Exhibitions,
  // InsideFactory, and TrustSignals' tablet carousel -- their own cards
  // read correctly at 28px. `CardCarousel.tsx` (Our Services/How It Works/
  // Product Customize Steps) does NOT use this token any more -- same-day
  // follow-up (owner: "how it works and our services dots are too far,
  // reduce 12px space from top") found 28px too much for those three's own
  // shorter cards; see `dotsRowTight` below instead.
  dotsRow: "mt-[28px] flex items-center gap-1.5",
  // `CardCarousel.tsx`'s own dots gap -- 12px (owner, 2026-09-10, in
  // sequence: briefly unified to the 28px `dotsRow` above, reverted to
  // 16px once it read as too far for these three sections' own shorter
  // cards, then corrected once more to 12px: "make it 12px").
  dotsRowTight: "mt-3 flex items-center gap-1.5",
  dot: "size-[6px] rounded-full transition-colors",
  dotActive: "bg-accent",
  dotInactive: "bg-[#D1D1D6]",
};

/* --- Chevron scroller (shared) -------------------------------------------- */

// The floating cursor-tracking chevron used by How It Works, Inside the
// Factory and Exhibitions' desktop galleries -- extracted 2026-08-26 once
// all three had copy-pasted the same classes (and JS) verbatim, so the one
// remaining smoothness complaint gets fixed once here instead of three
// times. See components/DesktopChevronScroller.tsx for the mechanism: a
// requestAnimationFrame loop now does the smoothing (frame-rate-independent
// exponential easing toward the cursor's last known position), not a CSS
// transition on `transform` -- a CSS transition re-eases from scratch every
// time `mousemove` retargets it, which reads as a stutter on quick or
// reversing motion since `mousemove` itself fires at an uneven, bursty
// rate. `transition-opacity` only now (not `transition-all`): the JS loop
// writes `transform` every animation frame, so a CSS transition on that
// same property would just fight the JS writes, never settling.
export const chevronScroller = {
  circle:
    "pointer-events-none absolute top-0 left-0 z-10 flex size-20 items-center justify-center rounded-full bg-paper text-text opacity-0 shadow-card transition-opacity duration-200 ease-out",
  icon: "size-10",
  // Instant-follow dot, no lerp lag at all (owner, 2026-09-10, still not
  // satisfied with the ring's own smoothness after several tuning passes:
  // "can you find it yourself?" -> researched 14islands' own custom-cursor
  // technique -- their real recommendation is a two-layer cursor, a small
  // dot that snaps to the exact pointer position every frame plus a larger
  // ring that lags behind it, not a single lagging element on its own).
  // The dot removes any sense of "delay" (there's always something exactly
  // under the real cursor), while the ring above still supplies the soft
  // glide -- together they read as smooth+responsive rather than either
  // snappy-but-plain or smooth-but-laggy on their own. z-20, above the
  // ring's own z-10.
  // White, not orange (owner, 2026-09-10: "can we make it invisible maybe
  // white that does not show in interface?") -- matches `circle`'s own
  // `bg-paper`, so it blends into the ring rather than standing out as its
  // own visible mark; still does real work (the instant-follow position
  // fix), just no longer reads as a separate design element.
  dot: "pointer-events-none absolute top-0 left-0 z-20 size-1.5 rounded-full bg-paper opacity-0 transition-opacity duration-200 ease-out",
};

/* --- HowItWorks (homepage section 12) --------------------------------- */
// Figma: desktop node 430:1929, mobile node 430:1961. Mobile is treated the
// same as Our Services (owner call, 2026-08-25): the shared `CardCarousel`,
// not a bespoke layout.
export const howItWorks = {
  // xl: -> md: (owner, 2026-09-04, tablet-width review: "from tech pack to
  // title should also be treated like other titles") -- same split
  // already applied to Hero's ticker, Certified & Compliant, Inside the
  // Factory/Exhibitions, and Final CTA. This section's own flush-left
  // `snap-start` scroller is already Exhibitions' exact same shape (card
  // size/ratio/gap were widened to match Exhibitions verbatim, 2026-08-27
  // -- see `desktopCard`'s own comment), so extending it to `md:` needed
  // only this breakpoint change plus `desktopRow`'s own padding (below),
  // same as Exhibitions' own tablet-width fix. -- Reverted back to `xl:`,
  // 2026-09-09 (owner: tablet should swipe with dots, not use the chevron
  // -- see `mobileSection`'s own comment below), the interaction-only
  // half of that 2026-09-04 change undone; the card sizing it also
  // brought in (`desktopCard`'s 469px) lives on in the mobile carousel's
  // own new `md:` tier instead (`mobileCardWidth`, `HowItWorks.tsx`).
  desktopOuter: "hidden xl:flex xl:flex-col xl:items-center xl:gap-[72px] pb-[120px]",
  // `pt-*` split out of `desktopOuter` above into these two tone-specific
  // tokens (2026-09-07) rather than living there as a shared default --
  // `desktopOuterLight` (the homepage's own original 60px) and
  // `darkSurface` (below) both set `pt-*`, and having one on the shared
  // base plus a second on a conditionally-appended token would be two
  // same-specificity utilities racing for the same property, the exact
  // "two conflicting utilities" bug class this project's own comments
  // already flag elsewhere -- so each tone gets its own single, complete
  // `pt-*`, never two in the same class list at once.
  // 160px (owner, 2026-09-09: "how it works, make 160px gap from the
  // top") -- was the homepage's own original 60px.
  desktopOuterLight: "pt-[160px]",
  // Dark variant, colour only (owner, 2026-09-07, Figma node 767:868,
  // /services page: "same section... changed the background to black") --
  // appended via `cx()` on BOTH `desktopOuter` and `mobileSection` when the
  // new `tone="dark"` prop is set. `bg-ink`, not Figma's literal pure black
  // -- colour isn't copied exactly from Figma sitewide (CLAUDE.md rule 4);
  // `text-paper` sets the ambient colour once so the heading and card
  // titles below (both colourless, `text-h1`/`text-h3` only) inherit white
  // for free, no separate override needed on either. No `pt-*` here
  // deliberately -- see `desktopOuterDark` below for why the desktop top
  // gap is a separate token; mobile keeps `mobileSection`'s own existing
  // `pt-12`, unrequested and unchanged, so this token alone is safe to
  // reuse on both.
  darkSurface: "bg-ink text-paper",
  // Desktop-only top-gap override for the dark variant (owner, same day,
  // follow-up: "how it works should have 200px gap from the top section" --
  // `pt-[120px]`, not a literal 200px: `ProductRange.inner` (the section
  // immediately above on /services) already carries its own `xl:pb-20`
  // (80px), a value scoped to that one section/page only (not reused
  // elsewhere) and presumably Figma-sourced, so 120 + 80 = the requested
  // 200px total without zeroing out Product Range's own existing bottom
  // gap. Owner's own explicit follow-up ("remove any space from the
  // bottom of product range section or add 80px under product range and
  // 120px top how it works... whatever approach you think is right") --
  // kept Product Range's 80px rather than removing it, since that value
  // already exists and this is the less structurally invasive of the two
  // options for reaching the same total. This section's own /services-
  // specific gap down from Product Range, replacing `desktopOuterLight`'s
  // 60px for this variant only. Kept separate from `darkSurface` above
  // (not folded into one token) because this is a desktop-scale number --
  // applying it to `mobileSection` too would roughly triple that
  // breakpoint's own standing gap rhythm (40-72px sitewide) for a value
  // the owner never asked for there.
  desktopOuterDark: "pt-[120px]",
  // Services page's own eyebrow size (owner, 2026-09-08: "product range,
  // how it works all eyebrows should be 16px by auto line height", then
  // corrected the same day: "on desktop it should be 20px as on home. All
  // the above chages were for mobile only") -- 16px only below `md:`;
  // `md:text-[1.25rem] md:leading-[1.2]` restores the shared default
  // Eyebrow size from `md:` up, matching the homepage's own
  // `--text-overline`. Originally scoped to `tone === "dark"` only
  // (Services' own usage at the time), leaving the homepage's own
  // `tone="light"` usage on the bare 20px/600 `Eyebrow` default -- widened
  // to apply regardless of `tone`, 2026-09-10 (owner: "the eyebrow heading
  // on all the sections should be 16px font size semibold, some are big
  // or small, make them consistent" -- a sitewide mobile audit found this
  // was the one real gap: every other section's own eyebrow already had
  // its own mobile override, this one only got it for one of its two real
  // usages). Renamed from `eyebrowSizeDark` since it's no longer
  // tone-specific.
  eyebrowSize: "max-md:text-[1rem] max-md:leading-normal font-semibold md:text-[1.25rem] md:leading-[1.2]",
  // container-p only on the heading -- the card row below is a full-bleed
  // sibling, not nested inside it (same pattern as Inside the Factory's
  // gallery): get_metadata on the real frame shows the 5th card sitting at
  // x=1516 in a 1440-wide frame, entirely off-canvas, and even the 4th
  // hangs slightly over -- this is a genuinely fixed-width, horizontally
  // scrollable row (owner correction, 2026-08-25), not 5 cards shrunk to
  // fit, which was this section's first, wrong build.
  desktopHeadingWrap: "container-p",
  // 812px forces Figma's real 2-line wrap -- the same value already
  // confirmed for Certified & Compliant and Inside the Factory's centred
  // headings, not a new one-off.
  desktopHeadingWidth: "max-w-[812px]",
  // Relative: the single floating chevron below is absolutely positioned
  // and follows the cursor's x position within this wrapper (corrected
  // 2026-08-25 twice: first from small corner buttons to static left/right
  // click-halves, then from static halves to this -- one icon that tracks
  // the mouse and flips direction at the midpoint, per owner request).
  // cursor-none: the floating chevron IS the cursor here -- the native
  // pointer/hand icon showing alongside it read as a duplicate affordance
  // (owner call, 2026-08-25).
  //
  // `mx-auto max-w-[1440px]` added (real bug, found live, 2026-09-08, same
  // class of bug as `insideFactory`/`exhibitions`' own `desktopScrollerWrap`
  // -- see `insideFactory`'s own comment for the full reasoning): this wrap
  // had no width cap, so `desktopRow`'s flat `xl:px-[80px]` only matched
  // `container-p`'s real inset up to 1440px, drifting further from every
  // other section's own left edge above it. Capping this wrap at 1440px
  // makes the existing 80px padding behave exactly like `container-p` at
  // every width.
  desktopScrollerWrap: "relative mx-auto w-full max-w-[1440px] cursor-none overflow-hidden",
  // scroll-pl/pr match the visual px inset -- without them, scroll-snap's
  // own snap-point maths (each card's snap-start) doesn't know the
  // padding is "safe" space, so the browser auto-corrects the rest scroll
  // position to consume it, collapsing the intended gap before the first
  // card to 0 (a real bug, found and fixed 2026-08-25). `md:px-8`/`xl:px-
  // [80px]` split (2026-09-04, tablet-width review) -- same fix as
  // Exhibitions' own desktopRow: a flat 80px was correct only at `xl:`
  // (matching container-p's own xl: inset), below that it needs `md:`'s
  // own smaller inset (32px) instead of reusing the desktop number.
  // `overflow-x-hidden`, not `-auto` (owner, 2026-09-08: "user can only
  // scroll by clicking" -- see `useDesktopChevronScroller`'s own header
  // comment in DesktopChevronScroller.tsx for the full reasoning).
  // `snap-x`/`snap-mandatory`/`scroll-pl`/`scroll-pr` dropped in the same
  // pass (owner, 2026-09-08: "still requires 2 times scroll to go up or
  // down, further make it smooth") -- see `insideFactory.desktopRow`'s own
  // comment for the full reasoning (CSS scroll-snap on an `overflow-hidden`
  // container still eats the first wheel tick in some browsers instead of
  // chaining it to the page; snapping is meaningless now that this track
  // only ever moves via `handleClick`'s own exact `cardPitch` jump).
  // `xl:` tier only now (`md:` base tier removed, 2026-09-09) -- this
  // row only renders at `xl:` any more (see `desktopOuter`'s own comment),
  // so the base tier that used to serve the tablet range is unreachable
  // dead code.
  desktopRow: "no-scrollbar flex w-full gap-6 overflow-x-hidden scroll-smooth px-[80px]",
  // Widened from the Figma-confirmed 335px to match Exhibitions' own
  // desktop card width exactly (owner call, 2026-08-27: both sections'
  // media containers, and the space between them, should read as the same
  // size) -- a deliberate departure from the literal Figma frame's own
  // number, not a correction to it. Card gap (24px, `desktopRow`'s
  // `gap-6`) already matched Exhibitions before this change.
  // `snap-start` dropped along with `desktopRow`'s own `snap-x` above.
  desktopCard: "w-[469px] shrink-0",
  // `md:aspect-[469/320]` tablet tier moved to `xl:`, 2026-09-09 (owner:
  // "how it works on services should follow the same image container size
  // as our services section... same fix we did for home") -- Our
  // Services' own mobile `CardCarousel` (which also covers tablet,
  // `xl:hidden`) never overrides its own base ratio below `xl:`, so its
  // tablet-tier image is just the shared `7:5`. This card's own tablet
  // tier (now rendered by this same mobile `CardCarousel`, since the
  // chevron gallery moved to `xl:`-only -- see `desktopOuter`'s own
  // comment) falls through to that identical base `7:5` value instead of
  // its former one-off `469:320` tablet ratio -- an exact match, not just
  // a close one. True desktop (the chevron gallery, `xl:`+) keeps its own
  // real `469:320` ratio, just re-scoped from `md:` to `xl:` since that's
  // the only tier this class list needs to differ from the shared base at
  // any more.
  cardMediaRatio: "aspect-[7/5] xl:aspect-[469/320]",
  // The floating chevron: both its position (translate, tracking the
  // cursor on X *and* Y) and visibility are written directly to this
  // element's inline `style` from a mousemove/mouseenter/mouseleave
  // handler, not driven by CSS :hover or a Tailwind translate utility --
  // same "direct DOM write, no re-render" pattern already used for
  // InsideFactory's carousel and ScrollSpotlightList. No translate-* class
  // here: the JS write sets the full `transform` in one go, so a
  // class-based translate would just be dead weight, never applied.
  // The floating chevron itself is now the shared `chevronScroller` recipe
  // below, rendered via `components/DesktopChevronScroller.tsx`'s
  // `DesktopChevron` -- extracted 2026-08-26 once How It Works, Inside the
  // Factory and Exhibitions had all copy-pasted the same circle/icon
  // classes and position/opacity logic verbatim. See that file and the
  // `chevronScroller` recipe for the current (rAF-smoothed) mechanism.

  // 32px gap from the heading down to the carousel, same as Our Services.
  // xl:hidden -> md:hidden (2026-09-04, tablet-width review) -- real
  // mobile only now, matching `desktopOuter`'s own new `md:` cutoff above.
  // `md:hidden` -> `xl:hidden` (owner, 2026-09-09: swap the tablet chevron
  // for swipe+dots) -- this carousel now covers real mobile and tablet
  // alike, the desktop chevron row above moved to `xl:` to match.
  mobileSection: "container-p flex flex-col items-center gap-8 pt-12 pb-12 xl:hidden",
  // 469px at `md:`, matching this section's own `desktopCard` width
  // exactly -- passed as `CardCarousel`'s new `cardClassName` override
  // (owner, 2026-09-09: tablet keeps its own already-defined wider card,
  // just swipes with dots instead of using the chevron). Base tier
  // (`w-[280px] shrink-0 snap-start`) matches `cardCarousel.card`'s own
  // default exactly, real mobile only.
  mobileCardWidth: "w-[280px] shrink-0 snap-start md:w-[469px]",
};

/* --- Exhibitions ---------------------------------------------------------- */

// Figma desktop node 455:2375, mobile node 455:2387. Owner instruction
// (2026-08-26): desktop behaves exactly like How It Works' chevron scroller,
// mobile exactly like Inside the Factory's swipeable carousel -- confirmed
// as a real structural match, not just a vibe: the mobile card is 300x340/
// 248, identical to Inside the Factory's own constants, and the desktop
// row's three 469px cards overflow the 1440px frame (third card's right
// edge lands at 1535px) exactly the way How It Works' 5-card row does, so
// both are genuinely scrollable rows, not fully-visible static layouts.
export const exhibitions = {
  // bg-ink lives on its own unconstrained outer wrapper (this section is
  // dark, unlike How It Works, which is a light section) -- the same split
  // every other full-bleed dark section uses.
  // xl: -> md: (owner, 2026-09-03: "apply the same structure to
  // exhibition" -- Inside the Factory's own tablet-width fix, see that
  // section's own comments for the full history) -- then back to xl:
  // (owner, 2026-09-09: tablet swipes with dots now, not the chevron --
  // see `mobileSection`'s own comment below).
  desktopOuter: "hidden bg-ink text-paper xl:block",
  // 60px top (this section's own confirmed top padding -- genuinely
  // different from the usual 120px, not a frame-crop misread like What We
  // Make/Certified & Compliant/Inside the Factory's first passes had).
  desktopHeadingWrap: "container-p pt-[60px]",
  // 812px forces Figma's real 2-line wrap -- the same value already
  // confirmed four times over (Certified & Compliant, Inside the Factory,
  // How It Works, now this).
  desktopHeadingWidth: "max-w-[812px]",
  // 72px heading-to-gallery gap, 120px section bottom -- both live here
  // directly since the gallery is a full-bleed sibling of the heading, not
  // its padded child (same shape as Inside the Factory's desktopGalleryWrap).
  desktopGalleryWrap: "pt-[72px] pb-[120px]",
  // Snap-start scroller, copied verbatim from How It Works (not Inside the
  // Factory's own now-center-snap variant) -- the owner explicitly asked
  // for How It Works' exact behaviour here. gap-6 (24px) matches this
  // section's own confirmed gap, which happens to equal How It Works' too.
  // This flush-left/snap-start shape is exactly Inside the Factory's own
  // tablet-width fix already, so extending this section to `md:` (below)
  // needed no structural change, only the left padding scaled to match
  // `container-p`'s own `md:` inset (32px) instead of `xl:`'s 80px, which
  // this row's own fixed padding had previously assumed unconditionally.
  //
  // `mx-auto max-w-[1440px]` added (real bug, found live, 2026-09-08, same
  // class of bug as `insideFactory.desktopScrollerWrap` -- see its own
  // comment for the full reasoning): this wrap had no width cap, so
  // `desktopRow`'s flat `xl:px-[80px]` only matched `container-p`'s real
  // inset up to 1440px -- above it the first card stayed pinned at a flat
  // 80px (measured, unchanged from 1440px through 2560px) while every
  // other section's own left edge kept growing with `container-p`'s
  // centring. Capping this wrap at 1440px makes the existing 80px padding
  // behave exactly like `container-p` at every width, matching this
  // project's own stated rule ("Max content width 1440px, centred,
  // sitewide, no exceptions", `docs/02-design-system.md`).
  desktopScrollerWrap: "relative mx-auto w-full max-w-[1440px] cursor-none overflow-hidden",
  // `overflow-x-hidden`, not `-auto` (owner, 2026-09-08: "user can only
  // scroll by clicking" -- see `useDesktopChevronScroller`'s own header
  // comment in DesktopChevronScroller.tsx for the full reasoning).
  // `snap-x`/`snap-mandatory`/`scroll-pl`/`scroll-pr` dropped in the same
  // pass (owner, 2026-09-08: "still requires 2 times scroll to go up or
  // down, further make it smooth") -- see `insideFactory.desktopRow`'s own
  // comment for the full reasoning.
  // `xl:` tier only now (`md:` tier removed, 2026-09-09) -- this row only
  // renders at `xl:` any more (see `desktopOuter`'s own comment), so the
  // base tier that used to serve the tablet range is unreachable dead code.
  desktopRow: "no-scrollbar flex w-full gap-6 overflow-x-hidden scroll-smooth px-[80px]",
  desktopCard: "w-[469px] shrink-0",
  // The floating chevron is the shared `chevronScroller` recipe -- see the
  // note on `howItWorks` above.

  // Mobile: bg-ink lives directly on this element (no separate outer/inner
  // split needed -- nothing here is full-bleed the way the desktop gallery
  // is, container-p covers both the heading and the carousel's own centring
  // padding).
  // `md:hidden` -> `xl:hidden` (owner, 2026-09-09: swap the tablet chevron
  // for swipe+dots) -- this carousel now covers real mobile and tablet
  // alike, the desktop chevron gallery above moved to `xl:` to match.
  mobileSection: "bg-ink text-paper pt-12 pb-12 xl:hidden",
  mobileHeadingWrap: "container-p",
  // No `mobileEyebrowSize` override any more (2026-09-10 cleanup): this
  // exact `max-md:.../md:text-overline` split is now `eyebrow.size`'s own
  // sitewide default.
  mobileGalleryGap: "mt-8",
  // Inside the Factory's exact carousel numbers, reused verbatim per the
  // owner's explicit instruction -- see components/sections/Exhibitions.tsx.
  // `md:` tiers (532px height, 469px-card centring padding, both matching
  // InsideFactory.tsx's own identical tablet values) added 2026-09-09 for
  // the same tablet swipe+dots swap.
  mobileTrack:
    "no-scrollbar flex h-[340px] items-center snap-x snap-mandatory overflow-x-auto px-[min(40px,calc((100%-300px)/2))] md:h-[532px] md:px-[min(40px,calc((100%-469px)/2))]",
  mobileCard: "w-[300px] shrink-0 snap-center md:w-[469px]",
};

/* --- Footer (homepage section 15) ----------------------------------------- */
// Figma desktop node 461:2650 (1440x720), mobile node 461:2715 (360x776).
// Genuinely different layouts per breakpoint, not one responsive reflow --
// desktop is a multi-row grid (brand/social, description/nav columns,
// contact/address), mobile is one flat vertical stack (every block, gap-24,
// in reading order) with 3 explicit dividers instead of desktop's single
// one.
//
// `root` used to carry the "reveal" transition itself via `sticky bottom-0`
// -- removed 2026-09-06 (owner report: "the footer still has not space from
// the top of the logo... logo is being cut"). `position: sticky` pins an
// element to a viewport edge for its *entire* "stuck" duration; since this
// footer's own real desktop height (826px) is taller than most real laptop
// browser windows (1280x720, 1366x768, even 1440x900 once real browser
// chrome is subtracted -- all *shorter* target viewports in
// tests/screenshots.spec.ts's own list), the sticky-bottom trick could only
// ever show the footer's own bottom-aligned slice: the top 56px gap and the
// logo above it were permanently unreachable by scrolling, not just tight,
// for the entire time the footer was "stuck" (confirmed live at 1440x650:
// the logo's own top measured -118px, fully above the visible viewport).
// `root` is now plain, ordinary document flow -- `relative z-0` only for
// the stacking order `<main>` still needs during its own overlap (below),
// not for any positioning trick of its own -- so the footer can be any
// height, on any page, at any real viewport, and is always fully
// scrollable/visible, never clipped.
//
// The "reveal" itself lives on `root` directly now, not on `<main>` -- a
// plain CSS fade + translate transition (`.footer-reveal`,
// app/globals.css), triggered by the same `useRevealOnView` hook every
// other scroll-reveal on this site already uses. `root` stays plain
// ordinary document flow either way -- only this transition's
// opacity/transform changes on scroll-into-view. This is the last of
// several mechanisms tried on 2026-09-10, after a JS-measured negative-
// margin `<main>`-pull-up approach (`components/RevealMain.tsx`, deleted)
// repeatedly failed to actually reveal the footer in the owner's real
// desktop Chrome -- layout-level checks (computed styles, from-scratch
// production builds) kept reporting it correct while it visually wasn't,
// pointing at a real paint/compositing bug with mutating a negative
// margin via JS after initial paint, not a layout bug. See Footer.tsx's
// own header comment for the full back-and-forth.
//
// A visible seam shadow was tried on `root` itself first (a box-shadow cast
// upward from Footer's own top edge) and reverted the same session -- it
// doesn't work, for the identical reason the reveal itself was confusing:
// Footer is the *covered* layer (`z-0`), so any shadow painted as part of
// its own box is just as hidden by `<main>`'s opaque `z-10` covering as the
// logo underneath it was, until the exact same instant the rest of Footer
// becomes visible -- it would "pop in" exactly as abruptly as the content
// it was meant to soften, not before it. The real fix has to live on
// `<main>` instead (`app/page.tsx`'s own `mainShadow`): `<main>` is the
// layer actually doing the covering, so a shadow cast from *its* bottom
// edge moves naturally with the visible seam as it scrolls, staying
// visible at whatever point the reveal currently sits -- not tied to
// Footer's own fixed content position the way a shadow on `root` would be.
export const footer = {
  root: "relative z-0 bg-paper text-text",

  /* Desktop */
  desktopOuter: "hidden xl:block",
  // pt-14 (56px) -- matches Figma node 587:5755's own measured value
  // exactly (confirmed via get_metadata). Owner tried pt-20 (80px,
  // 2026-09-07) then reverted back to this same session -- the on-screen
  // difference the owner saw wasn't a real code issue (their laptop
  // viewport vs. a 1920px+ screen), so leave this at Figma's real number
  // unless a genuine spacing change is requested again.
  desktopInner: "container-p pb-8 pt-14",
  // Row 1: brand + tagline (left), social icons (right) -- vertically
  // centred as a row (confirmed via get_metadata: the 60px social buttons
  // sit 15px down inside the row's own 90px height, i.e. dead centre, not
  // top-aligned).
  desktopRow1: "flex items-center justify-between",
  // Owner, 2026-09-06: "add space of 56px on top of the logo" -- confirmed
  // via get_metadata against Figma node 587:5755 that this 56px is
  // `desktopInner`'s own existing `pt-14`, measured from the footer
  // section's own top edge to the logo (Figma's "Content" frame sits at
  // y=56 inside the "Desktop Footer" frame) -- NOT an extra margin on top
  // of that padding. An earlier pass added `mt-14` here too, doubling it to
  // 112px; removed.
  desktopBrandGroup: "flex flex-col items-start gap-3",
  // 57.69px (owner, 2026-09-07: "updated the footer caprio logo. Update
  // it") -- `Logo`'s new `footer` geometry's own real Figma height
  // (`get_metadata` on node `787:1073`: 224x57.69169...), not the old
  // `stacked` mark's 55px (a value fitted to the previous, now-superseded
  // asset). Renders ~224px wide at this height, comfortably inside row 1's
  // own 60px-tall Content frame.
  desktopBrandLogo: "h-[57.69px] w-auto",
  // Was rendered right next to the logo in row 1's brand group; owner,
  // 2026-09-06: move it to sit above row 2's description paragraph instead
  // -- see `desktopDescriptionGroup` below. Style itself (1.25rem/normal)
  // is unchanged, just relocated. No divider between it and the paragraph
  // (owner, 2026-09-06: "don't add separator under division line") -- just
  // the 12px gap.
  desktopTagline: "text-[1.25rem] font-normal text-text",
  desktopSocialGroup: "flex items-center gap-3",
  // 40px gap below row 1 (146 -> 186).
  desktopDivider: "mt-10 border-t border-line",
  // Row 2: nav columns (left) + description (right), top-aligned, 72px
  // below the divider -- order swapped from the original layout (owner
  // content-arrangement update, 2026-08-27: nav moved to the left,
  // description to the right). Not a full-width `justify-between` split
  // any more: confirmed via get_metadata the two blocks now sit close
  // together (nav's own right edge to description's left edge is 78px),
  // with real empty space left over to the right of description -- kept
  // as the exact `gap-[78px]` rather than assuming a full-width split.
  // Nav's column 1 was a fixed 182px (Figma's own real value -- what
  // pushed column 2 to its confirmed x-offset, not a gap utility) until
  // "Activewear"/"Teamwear & Uniforms" were added on top of column 1's
  // original 3 short items (owner, 2026-09-07) -- "Teamwear & Uniforms"
  // (~232px natural width) wrapped to 2 lines inside that fixed 182px box
  // (owner: "make teamwear & uniforms in one line"), the same wrap defect
  // already fixed once in the header's own mega menu for this identical
  // string (see that recipe's own comment, `megaGroup`/`megaItem`). Same
  // fix here: `desktopNavColumnOne` dropped its fixed width for
  // `whitespace-nowrap` (matching column 2's own existing auto-width/
  // nowrap approach), and `desktopNavGroup` gained an explicit `gap-12`
  // (48px) between the two columns -- the fixed 182px box used to supply
  // that visual separation as unused space beside the (all shorter) 3
  // original links; an auto-width column needs a real gap now that
  // nothing pushes column 2 over automatically. Column 2 is unaffected
  // (still auto-width/nowrap, unchanged).
  desktopRow2: "mt-[72px] flex items-start gap-[78px]",
  // Tagline (relocated from row 1, see `desktopTagline` above) + the
  // description paragraph, stacked with a 12px gap, no divider between them
  // (owner, 2026-09-06). max-w-[307px] wrapped the tagline ("Capriowear,
  // a division of Caprio Sports", ~347.6px natural width at this size) to
  // 2 lines -- owner, 2026-09-07: "make sports in one line too and adjust
  // the under paragraph with the same width." Widened to `max-w-[350px]`
  // (a few px of buffer over the measured natural width, avoiding a
  // sub-pixel wrap edge case) -- both children share this one container,
  // so the description paragraph picks up the new width for free, exactly
  // the "same width" the owner asked for, not a second value to keep in
  // sync. Real mobile's own tagline was already single-line at every real
  // width (`mobileDescriptionGroup` has no max-width of its own), unaffected.
  desktopDescriptionGroup: "flex max-w-[350px] flex-col gap-3",
  desktopDescription: "text-[1.25rem] leading-[1.4] text-text",
  // 78px (owner, 2026-09-07: "the space between 3 columns ... should be
  // the same" -- matches `desktopRow2`'s own gap-[78px] between the nav
  // group as a whole and the description paragraph, so all 3 visual
  // columns in this row are evenly spaced). Was `gap-12` (48px).
  desktopNavGroup: "flex items-start gap-[78px]",
  desktopNavColumnOne: "flex flex-col whitespace-nowrap",
  desktopNavColumnTwo: "flex flex-col whitespace-nowrap",
  desktopNavLink: "text-[1.25rem] leading-[36px] text-text transition-opacity hover:opacity-70",
  // Row 3: contact CTA (left) + address/copyright (right), bottom-aligned --
  // confirmed via get_metadata: both blocks share the same bottom edge
  // despite starting at different top offsets, so this is items-end, not
  // items-start like row2. Still a full-width `justify-between` split
  // (contact flush left at container's own left edge, address flush right
  // at container's own right edge -- 940 + 420 = 1360, the container's
  // real right edge), unlike row2 above.
  //
  // mt-[170px], trimmed from Figma's own 296px (owner, 2026-09-07): the
  // footer's `sticky bottom-0` reveal trick (see the `footer` header
  // comment above) can only ever show as much of itself as fits inside the
  // current viewport height -- at the old ~826px total footer height, any
  // browser window shorter than that (common on 13-14" laptops, ~700-850px
  // of actual usable viewport after browser chrome) had its own TOP edge
  // (the 56px gap + logo) scrolled past/clipped before the reveal ever
  // caught up, which read as "the logo doesn't have its 56px" even though
  // the value itself was correct -- confirmed live via getBoundingClientRect
  // (footer height 826px > a tested 816px laptop-sized viewport). This is
  // this row's own margin specifically because it was the single largest
  // contributor to the footer's total height; trimming it (rather than the
  // reveal effect itself, or the confirmed-correct logo spacing) brings the
  // footer to ~700px, comfortably under that whole laptop range again.
  desktopRow3: "mt-[170px] flex items-end justify-between",
  desktopContactGroup: "flex flex-col items-start gap-[5px]",
  // #17191e is Figma's own confirmed literal for this line, updated
  // 2026-08-27 from the original build's #3c3c43 (a genuine colour change,
  // not a correction) -- kept as-is per the "typography/colour values
  // copied exactly where Figma gives a real one" rule, not swapped for a
  // token, even now that --color-ink-2 was updated to this same hex
  // 2026-09-08 (a coincidence of the two values matching, not a reason to
  // couple this text colour to a background surface token going forward).
  // 22px (owner request, 2026-08-30: "make the fint 22px get in touch") --
  // was 30px, matching the email line below it; the "Get in touch" label
  // is now deliberately smaller than its own email.
  desktopContactLabel: "text-[1.375rem] font-normal text-[#17191e]",
  desktopContactEmail: "text-[1.875rem] font-medium text-text transition-opacity hover:opacity-70",
  // Was a vertical stack (flex-col); changed to side-by-side columns
  // 2026-08-27 alongside the owner's content-arrangement pass -- Figma's
  // real gap between the two 194px-wide lines is 32px.
  desktopAddressGroup: "flex items-start gap-8",
  desktopAddressLine: "w-[194px] text-[1.25rem] leading-[1.4] text-text",
  // Owner narrowed just this second line's own container (194px -> 174px,
  // 2026-08-27) -- the row itself still ends flush at the container's real
  // right edge (960 + 400 = 1360), so this is a width-only change, not a
  // position one.
  desktopAddressLineNarrow: "w-[174px] text-[1.25rem] leading-[1.4] text-text",

  /* Mobile: one flat column, gap-24 between every block, matching
     container-p's own 20px mobile side inset exactly (confirmed via
     get_metadata: the frame's own real inset is 20px, not a coincidence). */
  // pt-14 (56px, owner: "add space of 56px on top of the logo" -- same
  // request as desktop's own `desktopInner`'s `pt-14`). Was `pt-10` (40px,
  // this container's own pre-existing base padding, unrelated to the
  // request) with a separate `mt-14` added on `mobileBrandGroup` below --
  // the two stacked to a real 96px instead of replacing each other, the
  // same doubling bug desktop's own `desktopInner` comment already
  // documents being caught and fixed there; never mirrored here until now.
  // Single value on the outer container, same pattern as desktop, not an
  // extra margin on the brand group.
  // pt-10 (40px, owner, 2026-09-08: "make it 40px" -- matches Figma node
  // 590:1421's own measured value exactly, get_metadata: "Contnet" frame
  // sits at y=40 inside the "Mobile Footer" frame). Was pt-14/56px, mirrored
  // from desktop's own value; this mobile frame's real spec is smaller.
  mobileOuter: "container-p flex flex-col items-start gap-6 pb-6 pt-10 xl:hidden",
  // No longer holds the tagline (owner, 2026-09-06: moved above the
  // description paragraph, same as desktop -- see `mobileDescriptionGroup`
  // below), so this is just the logo now, not a real "group" any more.
  mobileBrandGroup: "flex flex-col items-start gap-3",
  // `stacked` geometry (WEAR below CAPRIO, Figma node 680:394), not the old
  // side-by-side mark this used to render -- owner-shared mobile footer
  // frame (node 590:1421, 2026-09-06) shows the same stacked mark already
  // used everywhere else the logo appears (header, desktop footer). `h-[51px]`
  // is that frame's own measured logo block height (`get_metadata` on its
  // "Logo" node: 190.99x50.91), not a fitted-to-overflow guess -- at the
  // stacked mark's ~3.7:1 aspect ratio this renders ~189px wide, comfortably
  // inside the 320px column available at the narrowest (360px) target
  // viewport, so no repeat of the old wide-mark overflow this token used to
  // guard against.
  // 44.51px (owner, 2026-09-08: "reduce the logo size" -- Figma node
  // 590:1421's own "Logo" frame measured height, get_metadata: 167x44.51,
  // not the old 51px this had been carrying over from before). Renders
  // ~167px wide at this height, matching Figma's own frame width.
  mobileBrandLogo: "h-[44.51px] w-auto",
  mobileTagline: "text-[1.125rem] font-normal text-text",
  mobileDivider: "w-full border-t border-line",
  // Tagline + the description paragraph, 12px gap, no divider between them
  // -- same relocation as desktop's `desktopDescriptionGroup` above.
  // `mt-2` (owner, 2026-09-10: "remove the email and separator, add 32px
  // gap between logo and capriowear text" -- the email link and its own
  // divider, right above this group, are both gone now; `mobileOuter`'s
  // shared `gap-6`/24px between every child still applies here too, so
  // +8px on top of that is this pair's own 32px, not a second value
  // fighting the shared gap).
  mobileDescriptionGroup: "mt-2 flex flex-col gap-3",
  mobileDescription: "text-[1.125rem] leading-[1.33] text-text",
  mobileNavList: "flex flex-col",
  mobileNavLink: "text-[1.125rem] leading-10 text-text transition-opacity hover:opacity-70",
  mobileAddressGroup: "flex flex-col items-start gap-4",
  mobileAddressLine: "text-[1.125rem] leading-[1.33] text-text",
  mobileSocialGroup: "flex items-center gap-3",

  // Shared by both breakpoints (identical Figma values at both sizes).
  // #f1f1f1 is this frame's own confirmed fill, not a project token -- no
  // matching neutral-100-ish token exists yet (same "one-off literal until
  // asked to add a token" rule already applied elsewhere, e.g. FAQ's
  // #2A2E33 border).
  // Hover: fills with the brand accent orange and the icon (currentColor)
  // turns white -- both existing tokens, owner call 2026-08-27, replacing
  // the earlier plain opacity fade.
  socialButton:
    "flex size-[60px] items-center justify-center rounded-[14px] bg-[#f1f1f1] text-text transition-colors hover:bg-accent hover:text-accent-ink",
  socialIconLg: "size-[22px]",
  socialIconSm: "size-6",
  // Facebook's exported glyph isn't square (it's cropped tight to the "f"
  // mark's own ~13:27 aspect, unlike the other two icons) -- fixed height,
  // auto width, so it isn't stretched into a square the way `size-*` would.
  socialIconFb: "h-6 w-auto",
};

/* --- HeaderOverlayNav (exploratory, styleguide only) ---------------------- */
// Owner reference, 2026-08-27: https://afternow.co/services/ -- a small
// always-visible toggle opens a full-screen nav panel, instead of this
// site's own separate mega-menu-on-hover (desktop) / drawer (mobile)
// treatment. No Figma design exists for this; it's an explicit exploration,
// not wired into the live page (see components/HeaderOverlayNav.tsx). Every
// value here reuses an existing token/size, per the owner's own "keep my
// visual language" instruction -- nothing new was invented.
//
// The top bar reuses `header`'s own `base`/`inner`/`brand*`/`action*` keys
// directly (not copied) so this reads as the same site, not a redesign;
// only the keys below are genuinely new to this component.
export const headerOverlay = {
  // Reference: the inline links + CTA fade out while the panel is open, but
  // the top bar itself (logo, toggle) stays. `pointer-events-none` while
  // hidden keeps a focus-trapped, invisible link from still being tabbable.
  fadeGroup: "transition-opacity duration-200",
  fadeHidden: "pointer-events-none opacity-0",
  toggle: "shrink-0",
  toggleIcon: "size-6",
  // Portaled onto document.body, same reasoning as MobileNav's own panel --
  // Header's `sticky z-40` is a stacking context a nested panel would be
  // trapped under. No enter/exit transition, matching MobileNav's own
  // established precedent (its drawer also mounts/unmounts abruptly, no
  // animation) -- nothing rendered while closed keeps the closed state
  // costing no DOM and no tab stops, same reasoning as that component.
  // Its own `top` is set inline from the real header's measured height
  // (Header.tsx has no fixed height to hardcode against), so the panel
  // starts exactly below the top bar at any breakpoint rather than
  // guessing a pixel value.
  panel: "fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-y-auto bg-ink text-paper",
  inner: "container-p flex flex-1 flex-col justify-between gap-16 py-12",
  navList: "flex flex-col",
  // text-h1 -- an existing token, not a new size, per the owner's "keep
  // font sizes same" instruction. Each row gets its own bottom hairline,
  // the same divided-list pattern already used elsewhere (e.g. FAQ's
  // accordion items), so a long link list still reads as one structured
  // group, not a loose stack.
  navLink: "border-b border-line-dark py-4 text-h1 transition-opacity hover:opacity-70",
  ctaGroup: "flex flex-wrap items-center gap-4",
  bottomRow: "flex flex-wrap items-center justify-between gap-6",
  socialGroup: "flex items-center gap-3",
};

/* --- Category PLP banner (activewear category pages) ---------------------- */
// Figma desktop node 541:3304 (1440x400), 2026-08-28. Shared across every
// category PLP built from content/activewear's Category data -- not
// leggings-specific. Desktop only for now (owner: no mobile frame ready
// yet). h1/quickAnswer are fixed px values here, NOT the sitewide fluid
// `text-h1` clamp token: this design's own 48px/400-weight H1 is a
// genuinely different size/weight than the sitewide H1 scale (54px/500 at
// 1440), confirmed via get_design_context, not a rounding of it. A real
// fluid clamp (per this project's own "anchor at 360 and 1440, extend to a
// 1920 max" formula, see app/globals.css) needs two confirmed data points
// -- only 1440 exists so far. Revisit once a mobile frame lands: these
// become clamp() tokens the same way every other heading size did, not
// held as flat values forever.
// Rewritten again 2026-08-28 for a second real Figma revision (still node
// 502:3310) -- back to an ink/white-text band (was briefly white/black),
// with the breadcrumb built into its own top (Breadcrumb renders itself,
// tone="dark", first child of `section`, not part of this recipe), and a
// row of MUTED trust bullets with a small sparkle glyph, not orange
// checkmarks. `contentWrap`/`content` vertically centre the H1+bullets
// group within the banner's remaining height below the breadcrumb --
// Figma's own export absolutely centres this block (top-1/2,
// -translate-y-1/2), reproduced here with flex centring instead of a
// fixed pt/pb split, since the exact split depends on the breadcrumb's
// own real height, not a constant.
// breadcrumbWrap/contentWrap: Figma's own export absolutely overlays the
// breadcrumb at the banner's top (top:0) and separately centres the
// content block on the FULL banner height (get_metadata: content's own
// vertical midpoint sits exactly at 400/2, using the whole box, not the
// leftover space below the breadcrumb) -- the breadcrumb never actually
// participates in that centring math. A first attempt used flex-1 after
// the breadcrumb in normal flow, which centres in the *remaining* space
// instead and measured 109px live against Figma's real 80px gap; fixed by
// reproducing Figma's own two-absolute-layers construction exactly.
export const categoryBanner = {
  // h-[340px] (owner's own Figma edit, 2026-08-29: "banner size, content
  // placement on the banner from bottom 40px gap" -- was 400px). No longer
  // pure-centred: get_metadata on the revised frame shows the content
  // block positioned at `top: calc(50% + 68px)` with a `-translate-y-1/2`,
  // not `items-center` -- its own vertical midpoint sits 68px below the
  // banner's true centre, which measures out to a real 40px gap between
  // the last trust bullet and the banner's bottom edge (confirmed: content
  // block height ~124px, so its span is 176px-300px within the 340px
  // banner). contentWrap reproduces that exact offset instead of centring.
  // max-xl: below xl this banner was still the unconditional fixed
  // h-[340px] + absolute-positioned content described below -- real bug,
  // found live 2026-08-30 (owner: "fix the nav") at 375px: absolute
  // positioning removes contentWrap from the flow the section's own fixed
  // height would need to grow for, so the wrapped 4-bullet trust row +
  // breadcrumb simply overflowed past the box's bottom edge, bleeding
  // visually into the white ProductGrid section below. No mobile Figma
  // frame exists for this component yet (desktop-only scope, see h1/
  // trustBullets comments below, unchanged here) -- this isn't a new
  // design, just letting the box grow with real static-flow content
  // instead of a fixed height paired with position:absolute, so nothing
  // can spill past it regardless of viewport width. xl keeps the exact
  // original fixed-height/absolute-centred desktop layout untouched.
  // max-xl pt-2 (8px, owner correction 2026-08-30 -- was pt-6/24px, matching
  // the mobile Figma frame's own top padding)/pb-10 (40px, still matches the
  // mobile Figma frame). Was pt-16 (64px) originally, a guess made before
  // the mobile frame existed.
  //
  // Header is now `position: fixed`, a true overlay with no reserved space
  // of its own (owner, 2026-09-07) -- this section's own top clearance and
  // total height both grow by the header's real, live-measured height
  // (read via `offsetHeight`, not hand-derived -- see `header.inner`'s own
  // comment for the current figures) so its real `bg-ink` background is
  // genuinely what's behind the header at rest, not a gap. `<main>`'s own
  // top padding was tried first and reverted: it only pushed this section
  // down, leaving `<main>`'s own `bg-paper` (not this section's `bg-ink`)
  // painting the gap behind the header -- the same invisible-white-nav-
  // on-white bug, just relocated (found live, 2026-09-07). `max-xl:pt-2`
  // -> `pt-[75px]` (8+67) keeps this a simple padding bump since mobile/
  // tablet is `h-auto` (grows with content); `xl:h-[340px]` ->
  // `xl:h-[408px]` (340+68) grows the desktop fixed box itself, since
  // `breadcrumbWrap`/`contentWrap` below are absolutely positioned within
  // it and need the taller box to have real room for the added height at
  // the top. Both figures were re-derived again 2026-09-08 when the
  // header's own height dropped further (72/87 -> 67/68) during the
  // "make the nav bar compact" pass.
  section: "relative bg-ink max-xl:h-auto max-xl:pb-10 max-xl:pt-[75px] xl:h-[408px]",
  // hidden md:block (owner request, 2026-08-30: "hide the breadcrumb
  // visually on mobile only... shows from tablet up"): CSS-only, not a
  // conditional unmount -- the same <Breadcrumb> markup still renders on
  // every viewport (CategoryBanner.tsx is unchanged), just not painted
  // below the 768px `md` breakpoint. Deliberately `md`, not this page's
  // usual `xl` mobile/desktop split -- the owner's own "tablet" cutoff for
  // this one element, not a reclassification of the site's breakpoints.
  // Doesn't touch the page's BreadcrumbList JSON-LD (JsonLd/breadcrumbSchema
  // in app/activewear/[category]/page.tsx), which is built from
  // `data.menuLabel`/`data.slug` directly, not from this visible strip.
  //
  // `xl:top-0` -> `xl:top-[68px]` (2026-09-07, header overlay, re-derived
  // 2026-09-08 for the header's own new compact height -- see `section`'s
  // own comment above): the breadcrumb strip itself sits exactly where it
  // used to relative to the section's real content, now offset by the
  // header's own height instead of the section's literal top edge.
  breadcrumbWrap: "hidden md:block max-xl:static xl:absolute xl:inset-x-0 xl:top-[68px]",
  // `xl:top-[calc(50%+68px)]` -> `xl:top-[306px]` (2026-09-07, header
  // overlay, re-derived 2026-09-08): a literal px value, not a `50%+X`
  // calc, now that the section's own height is a fixed, known 408px (not
  // derived) -- recomputed to keep the content block's own vertical
  // CENTRE the exact same 102px from the section's bottom edge as the
  // original 340px-tall box gave it (340 - (50%*340+68) = 102), so the
  // confirmed 40px gap
  // between the last trust bullet and the section's bottom edge is
  // unchanged: 408 - 102 = 306.
  contentWrap: "max-xl:static xl:absolute xl:inset-x-0 xl:top-[306px] xl:-translate-y-1/2",
  // max-xl:pt-10 (40px): the gap between the breadcrumb and the title block
  // on mobile (Figma's outer "Hero" frame gap-[40px]) -- was pt-8 (32px), a
  // guess that predated the mobile frame; gap-8 (32px) below is correct
  // (matches the mobile frame's own inner "Content" gap-[32px] exactly).
  content: "container-p flex flex-col gap-8 max-xl:pt-10",
  // 54px/64px-line-height, same size/line-height as this project's own
  // text-h1 token, kept as a literal value rather than switching to it:
  // Figma's own export specifies Regular (400) weight, not text-h1's
  // Medium (500) -- a size/line-height coincidence, not the same style.
  // whitespace-nowrap gated to xl (owner request: "the title should be in
  // 1 line") -- this section has no responsive scaling yet (desktop only),
  // and an unshrinkable nowrap line caused real mobile overflow when tried
  // unconditionally (found live: 578px rendered width against a 390px
  // viewport, when the H1 still sat in a fixed-width centred column).
  // max-xl:text-[1.875rem]/leading-[38px] (30px/38px, mobile Figma frame
  // 587:6985, owner correction 2026-09-03: "make the line height of hero
  // plp banner title to 34 to 38px" -- was leading-[34px]). Shared
  // CategoryBanner, so this applies to every PLP built so far. xl keeps
  // the original 54px/64px size, no real overflow risk on a 360px
  // viewport, unchanged here.
  // Threshold moved xl:/1280px -> md:/768px (owner, 2026-09-04: apply the
  // same tablet-width font-size treatment used on the homepage to
  // PLP/PDP) -- both fixed values, desktop always larger, pure threshold
  // change, no new size invented.
  h1: "text-[1.875rem] leading-[38px] font-normal text-paper md:text-[3.375rem] md:leading-[64px] md:whitespace-nowrap",
  // max-xl: a single column, gap-4 (16px) -- mobile Figma stacks the 4 trust
  // bullets vertically (gap-[16px]), not the desktop's wrapped row. xl
  // keeps the original wrapped-row layout untouched.
  trustBullets: "flex flex-col items-start gap-4 xl:flex-row xl:flex-wrap xl:items-center xl:gap-6",
  trustBullet: "flex items-center gap-2",
  // #abb5c0 (owner correction 2026-08-30: "make the banner text under the
  // title and the star icon... this color") -- was #838d97. Applies to
  // both the sparkle icon and all four bullet texts equally, one shared
  // colour, not per-item.
  trustBulletIcon: "size-4 shrink-0 text-[#abb5c0]",
  // text-[1.25rem] (20px, owner edit 2026-08-29: "reduced the font size to
  // 20 for moq 50 all texts") -- was 1.375rem (22px). Applies to all four
  // bullets ("MOQ from 50 pieces", "Samples in 10 to 14 days", "OEM, ODM &
  // Private Label", "DDP to 40+ countries"), one shared style, not per-item.
  trustBulletText: "text-[1.25rem] leading-[28px] font-normal text-[#abb5c0]",
};

/* --- CategoryFilters -------------------------------------------------- */

// Figma node 406:3085 ("Filters"), the Activewear PLP's left-panel category
// accordion -- desktop only for now, matching categoryBanner's own current
// scope (no mobile frame read yet). Literal one-off values straight from
// Figma, same established pattern as every other recipe here: #e8ecf1/
// #f2f4f8 borders, 18px/16px text with Figma's own line-heights -- none of
// these need a named token. Every row owns only its own bottom border
// (edge-ownership, same technique as the grid-cell borders elsewhere in
// this file) so adjacent rows' borders never double up.
export const categoryFilters = {
  // sticky top-[111px] (87px header + 24px gap) -- reverted, 2026-08-30
  // ("apply the same nav top behavior as applied on the home... to every
  // new page"), back from a one-time top-[24px] trial (owner, 2026-08-29:
  // "let's try one time gymshark approach and see how it looks", comparing
  // against gymshark.com/collections/leggings/womens, whose own header is
  // non-sticky). This page's own Header is sitewide-sticky again (its
  // `sticky={false}` override removed, see app/activewear/[category]/
  // page.tsx), so this panel again needs to clear its persistent height,
  // not lock flush at the bare viewport top. self-start keeps it from
  // stretching to a flex sibling's height, which would break "sticky" into
  // "always full-height".
  // border colour corrected to #e8ecf1 (owner call, 2026-08-28, "use the
  // new color") -- every other border in this list (header, group rows,
  // the trailing edge) already used this exact hex; only this outer box
  // had drifted to a slightly different, unconfirmed #f2f4f8.
  // max-h-[calc(100vh-135px)] (111px top offset + 24px bottom gap,
  // reverted alongside `top` above) + overflow-y-auto (owner report,
  // 2026-08-29: "the left panel should be fixed, not move while scrolling
  // the products") -- every group in this list starts expanded (see the
  // component's own comment), which makes the panel taller than most
  // viewports. Sticky positioning was already correct, but a sticky
  // element taller than the viewport still has to let its own overflow
  // scroll past, which reads as "the panel is moving." Capping its height
  // to the viewport (matching its own `top` offset, plus a matching 24px
  // at the bottom) and scrolling its own overflow internally keeps the
  // panel itself visually pinned in place, same fix as a fixed sidebar
  // with a scrollable body.
  // No top offset (`xl:mt-20` removed, owner report 2026-08-29: "the left
  // panel should be top aligned with the product grid") -- that 80px push
  // was only ever correct while CategoryMetaStrip's title+chip row lived
  // INSIDE ProductGrid's own column (5s), sitting above the grid within
  // the same flex item and pushing this sidebar down to match. Since 5v
  // moved that row out to a full-width sibling above both columns, the
  // grid's own top now starts at the same y as this sidebar's with no
  // extra offset needed -- keeping the old mt-20 misaligned the two by
  // exactly that 80px.
  // No outer border-x/border-t anymore (owner style revision, 2026-08-29,
  // Figma node 573:5457) -- the panel no longer sits inside a bordered
  // box; only the horizontal dividers between rows remain (each row still
  // owns just its own bottom edge, same technique as before).
  //
  // Sticky mechanic confirmed against the owner's own reference
  // (gymshark.com/collections/leggings/womens, 2026-08-29: "follow the
  // website reference for filters fixed behavior") -- inspected their
  // filter column live: plain `position: sticky` with a fixed `top`
  // offset (90px there), locking in place with zero drift once stuck
  // (`getBoundingClientRect().top` reads identically at every scroll depth
  // past the lock point). That's exactly this mechanic already. Their
  // panel also caps its own height and clips overflow (`overflow-y:
  // hidden`, not `auto`) rather than scrolling internally -- not copied
  // here on purpose: their filter groups are mostly collapsed by default,
  // so that rarely triggers, but this project's own groups all start OPEN
  // (see CategoryFilters.tsx's own comment), so clipping would hide real
  // categories entirely. Keeping `overflow-y-auto` (added for this exact
  // reason, see above) instead of matching their `hidden` literally is a
  // deliberate deviation, not an oversight.
  // hidden below xl (2026-08-30, owner: mobile filters move to a FAB +
  // drawer instead of living in the page flow -- see CategoryFilters.tsx's
  // own header comment) -- `hidden` means an unmounted-looking box with no
  // sticky/overflow interaction to reason about below xl; `xl:block`
  // re-enables the sticky sidebar exactly as before at desktop.
  list: "hidden xl:sticky xl:top-[111px] xl:block xl:max-h-[calc(100vh-135px)] w-[252px] shrink-0 self-start xl:overflow-y-auto bg-paper",
  // "Filters" heading row (Figma node 406:3087, relabelled from
  // "Categories" and enlarged, 2026-08-29 style revision) -- left-aligned
  // now (was centred), 22px/medium/26px line-height (was 18px), more
  // bottom padding (pb-6/24px, was py-3/12px all around). Still owns the
  // one divider below it (mb-[-1px] in Figma's export is the same "each
  // row owns only its own edge" technique already used throughout this
  // list, not a new pattern).
  header: "flex items-center justify-start border-b border-[#e8ecf1] pb-6 pl-4 text-[1.375rem] font-medium leading-[26px] text-text",
  // py-6 (24px, was py-5/20px) -- same 2026-08-29 style revision.
  // Text colour #727272 (owner correction, 2026-08-30, was #838d97).
  groupHeaderCollapsed:
    "flex w-full items-center justify-between border-b border-[#e8ecf1] px-4 py-6 text-left text-[1.125rem] leading-5 font-medium text-[#727272]",
  // No border-b here (unlike the collapsed row) -- an expanded group is one
  // seamless bordered box in Figma (header + its item list share a single
  // outer border, node 510:3326's own "Container"), not two separately
  // bordered pieces. A border here would read as a stray underline right
  // beneath the open category's own label; groupWrapExpanded below owns
  // the one real border around the whole open group instead.
  // pt-6 (24px, was pt-5/20px) -- same 2026-08-29 style revision.
  groupHeaderExpanded: "flex w-full items-center justify-between px-4 pt-6 text-left text-[1.125rem] leading-5 font-semibold text-text",
  groupWrapExpanded: "border-b border-[#e8ecf1]",
  chevron: "size-3 shrink-0 text-current transition-transform duration-300 ease-in-out",
  chevronOpen: "rotate-180",
  // grid-template-rows 0fr<->1fr animates height:auto smoothly with no JS
  // measurement (the standard CSS-only accordion technique) -- overflow-
  // hidden on the single grid child (itemList below) gives it an automatic
  // minimum size of 0, so it can actually shrink to the 0fr track instead
  // of forcing the track to its own content height.
  itemListGrid: "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out",
  itemListGridOpen: "grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out",
  // overflow-hidden lives on THIS wrapper, one level above the padded <ul>
  // -- not on the padded element itself. Padding is never part of a box's
  // shrinkable content, so a 0fr track can force this height to 0 only if
  // the overflow-hidden element has no padding of its own to floor it;
  // nesting the padding one level deeper lets it get clipped away with
  // everything else instead of setting a hard 36px minimum (found live:
  // the very first build of this collapsed to exactly padding-top +
  // padding-bottom, never fully closing).
  itemListClip: "overflow-hidden",
  // pb-6 (24px, was pb-5/20px) -- same 2026-08-29 style revision.
  itemList: "flex flex-col gap-4 px-4 pb-6 pt-4",
  item: "text-[1rem] leading-5 font-medium text-[#3c3c43] transition-colors hover:text-accent",
  itemActive: "text-[1rem] leading-5 font-semibold text-accent",
  // Mobile filter access (2026-08-30, owner: reference screenshot of a
  // Babyshop-style filter FAB) -- below xl the sidebar above is `hidden`
  // entirely; this pill + the drawer below are how filters are reached
  // instead. `shadow-card` is the same elevation token mediaHover/the
  // FabricOptions "back to top" button already use, not a new one.
  // bottom-[72px] (owner, 2026-09-02: "filters should be above the cta,
  // have a gap of 12px") -- the FAB is `fixed`, always anchored to the
  // viewport bottom, while `productCtas.mobileBar` below it is a 60px-tall
  // `sticky bottom-0` bar that's part of the same page's flow; the two can
  // be on screen together on a short page. 72px = that bar's own 60px
  // height + 12px, so the FAB sits with a clean 12px gap above the bar
  // instead of overlapping it (was bottom-6/24px, which sat inside the
  // bar's own height).
  fab: "fixed inset-x-0 bottom-[72px] z-40 mx-auto flex w-fit items-center gap-2 rounded-full border border-[#e8ecf1] bg-paper px-6 py-3 text-text shadow-card xl:hidden",
  fabIcon: "size-4 shrink-0",
  fabLabel: "text-[1rem] leading-5 font-medium",
  // Bottom sheet, not MobileNav's full-screen takeover (owner reference,
  // 2026-08-30: a partial-height sheet with a drag handle and a dimmed but
  // still-visible backdrop, not an opaque full-screen swap) -- portalled to
  // document.body, same reasoning as MobileNav's own `drawer.panel`.
  // bg-paper/text-text here instead of that component's bg-ink, since this
  // panel shows the same light-theme filter list the desktop sidebar
  // already does, not the site nav.
  drawerBackdrop: "fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 ease-in-out",
  drawerBackdropOpen: "opacity-100",
  drawerBackdropClosed: "pointer-events-none opacity-0",
  // Square top corners (owner correction, 2026-08-30: was `rounded-t-2xl`)
  // -- no rounding on this sheet at all now, matching the rest of this
  // component's own `rounded-none` sitewide convention.
  drawerPanel: "fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col overflow-hidden bg-paper text-text transition-transform duration-300 ease-in-out",
  drawerRevealOpen: "translate-y-0",
  drawerRevealClosed: "translate-y-full",
  // Decorative drag-handle bar (Babyshop reference) -- purely visual, no
  // drag gesture wired to it; tap-outside/Escape/the close button are the
  // real ways to dismiss, same as this project's other overlays.
  drawerHandle: "mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-[#e8ecf1]",
  drawerHead: "container-p flex shrink-0 items-center justify-between border-b border-[#e8ecf1] py-6",
  drawerHeading: "text-[1.375rem] font-medium leading-[26px] text-text",
  drawerClose: "flex items-center gap-2 text-text",
  drawerCloseIcon: "size-5",
  drawerBody: "flex-1 overflow-y-auto",
};

/* --- CategoryMetaStrip ---------------------------------------------------- */

// Figma node 557:3422 ("Content"), the PLP's title + gender filter chip
// row -- a full-width sibling ABOVE the filters+grid row (node 557:3423),
// not part of ProductGrid's own column (split out 2026-08-29, owner
// report: "Legging title should go to the left align" -- the row was
// previously rendered inside ProductGrid, so it inherited that column's
// indent instead of starting flush with the page margin/left panel).
export const categoryMetaStrip = {
  // flex-wrap: no mobile Figma frame exists for this row yet (same
  // situation as the sidebar/grid row below it) -- the title+subline
  // group and the chip row can't both shrink-to-fit on a narrow viewport,
  // so wrapping the chip row onto its own line is the safe structural
  // fallback rather than an invented mobile layout.
  // pt-14 (56px, owner report 2026-08-29: "follow the same gap from the
  // top of the legging heading as in design") -- measured from the real
  // Figma frame (banner bottom edge to this row's own top, node 406:3075
  // vs the isolated banner node 502:3310): 526px - 470px = 56px. Replaces
  // the previous pt-5 (20px), which was never checked against Figma.
  // pb-8 (32px) -- was pb-6 (24px), then briefly pb-10 (40px, an owner
  // estimate: "the gap from chips men, women and the product tiles is
  // 40px"). Owner has since revised the Figma frame itself (banner size,
  // bottom spacing, 2026-08-29); re-measured against the current file
  // (`get_design_context` on node 406:3075): the title+chip row and the
  // filters+grid row are two children of one `flex-col gap-[32px]`
  // container, a real 32px, not 40 -- corrected to match the file now
  // that it's the source of truth rather than an eyeballed estimate.
  // Mobile order REVERTED (owner correction, 2026-08-30: "let's put it
  // under the title not on the top without the separator") -- a same-day
  // earlier pass had flipped the chip row above the title with its own
  // separator underneath (see the removed `order-1`/`order-2`/border-b
  // history below); the owner has now reversed that call. No `order`
  // classes needed any more: this row's own plain DOM order (text first,
  // chipRow second in CategoryMetaStrip.tsx) already puts chips under the
  // title once flex-wrap stacks them below `xl`, so removing the order
  // override is enough on its own.
  // Mobile top/bottom stay 24px (owner, 2026-08-30: "gap from title
  // subline to product image should be 24px"); `max-xl:gap-6` (24px) is
  // now the ONE gap between the title/subline block and the chip row --
  // there's no separator underneath any more (chipRow's own border-b/pb-6
  // removed, see its own comment), so this single value isn't doing the
  // "double duty" the previous revision needed.
  root: "flex flex-wrap items-center justify-between max-xl:gap-6 xl:gap-4 max-xl:pt-6 xl:pt-14 max-xl:pb-6 xl:pb-8",
  // items-baseline (corrected 2026-08-29, owner report: "leggings heading
  // should meet the design in figma"). A 2026-08-28 pass had this as
  // items-center against a since-superseded design revision; re-checked
  // against the current file (`get_design_context`/`get_screenshot` on
  // node 406:3075/571:5329), "Leggings" and "Every style, made to your
  // brand spec." are one inline text run sharing a single text baseline,
  // not two blocks centred to each other's own box -- items-center sat
  // the smaller subline noticeably higher than Figma's real baseline.
  // items-baseline reproduces that shared-baseline look while keeping
  // title/subline as two separate elements (not reverting to inline
  // <span>s in one <p>), so each still takes its own colour/weight prop.
  // xl:ml-[300px] (owner report, 2026-08-29: "Leggings heading should be
  // on top of product grid, not above the filters") -- 252px sidebar +
  // 48px gap (categoryFilters.list's own width + the row's xl:gap-12),
  // matching Figma's own x=380 start for this text block (node 406:3075).
  // The chip row alongside it needs no matching offset: both this row's
  // own width (980px, matching the grid) and the old full-container width
  // (1280px) share the exact same right edge, so `chipRow` was already
  // correctly positioned either way.
  // Mobile (max-xl:) is its own stacked column -- node 590:1173's "Title/
  // Pills" frame has the subline directly below the title, not sharing its
  // baseline (that row layout is xl-only, see the `title`/`subline`
  // comment below for why it stays there). No `order` here any more (see
  // `root`'s own comment) -- plain DOM order already puts this above
  // `chipRow` below `xl`.
  text: "flex max-xl:flex-col max-xl:items-start max-xl:gap-2 xl:flex-row xl:flex-wrap xl:items-baseline xl:gap-3 xl:ml-[300px]",
  // 24px/28px-line-height at mobile (node 590:1173: text-[24px] leading-
  // [28px]) -- was the desktop 30px size unconditionally; xl keeps that
  // confirmed desktop value.
  // Threshold moved xl:/max-xl: -> md:/max-md: (owner, 2026-09-04: same
  // tablet-width font-size treatment as the homepage, applied to
  // PLP/PDP) -- fixed values, desktop larger, pure threshold change. Note:
  // this section's own `text` wrapper above keeps its `xl:flex-row`
  // layout switch unchanged (coupled to the sidebar's 252px width, itself
  // deliberately left `xl:`-gated -- see docs/05-plan.md's PLP/PDP tablet
  // pass entry).
  title: "max-md:text-[1.5rem] max-md:leading-[28px] md:text-[1.875rem] font-medium text-text",
  // Colour corrected to text-text (owner call, 2026-08-28, "layout changes
  // to the heading"): the updated Figma frame renders this line in the
  // same near-black as the title, not the muted #3c3c43 grey the first
  // build guessed.
  // 18px/24px-line-height at mobile (node 590:1173: text-[18px] leading-
  // [24px]) -- was the desktop 20px size unconditionally; xl keeps that
  // confirmed desktop value.
  // text-subline (#17191e, owner, 2026-09-01: sitewide title+subline color
  // on white/paper backgrounds) -- was text-text.
  subline: "max-md:text-[1.125rem] max-md:leading-6 md:text-[1.25rem] font-normal text-subline",
  // Separator REMOVED (owner correction, 2026-08-30: "let's put it under
  // the title not on the top without the separator") -- a same-day earlier
  // pass added a full-bleed `border-b` under the chip row (when it sat
  // above the title); now that the row sits under the title instead, the
  // owner no longer wants that line at all. No `order`/`-mx-5`/breakout/
  // `border`/`pb-6` left here -- `root`'s own `max-xl:gap-6` is the only
  // gap now, between the title/subline block above and this row.
  chipRow: "flex shrink-0 items-center gap-2",
  // Women/Men made genuinely clickable (owner request, 2026-08-28) --
  // cursor-pointer plus a real hover state (border/text to accent), not
  // just a static span with no interaction affordance.
  // Text colour corrected to #727272 (owner request, 2026-08-29) -- was
  // #838d97 (this project's usual muted grey elsewhere, but not this
  // chip's own real value).
  chip: "cursor-pointer rounded-[4px] border border-[#e8ecf1] px-3 py-2 text-[1rem] leading-5 text-[#727272] transition-colors hover:border-accent hover:text-accent",
  chipActive: "cursor-pointer rounded-[4px] border border-accent px-3 py-2 text-[1rem] leading-5 font-semibold text-accent",
};

/* --- ProductGrid / ProductCard / Pagination ------------------------------ */

// Figma node 406:3137 ("Product Container"). Literal one-off Figma values,
// same established pattern as every other recipe here.
export const productGrid = {
  // Plain block, NOT sticky (owner correction, 2026-08-29: "you made the
  // whole legging title area fixed too. Dont do that, only make the left
  // panel fixed"). A same-day pass briefly made this sticky too, matching
  // `categoryFilters.list`, to stop the grid drifting away from the
  // sidebar once the sidebar locked -- but that pinned the whole
  // filters+grid row (CategoryMetaStrip's title/chip row sits directly
  // above it) in place, which is not what was asked for: only the left
  // panel is fixed, everything else -- including this grid and its own
  // heading row -- scrolls with the page like normal content.
  root: "min-w-0 flex-1",
  // 2 cols below xl, 3 at the true desktop width (Figma mobile node
  // 590:1173, 2026-08-30: a real 2-column mobile grid, not the 1-col
  // "safe fallback" this used before that frame existed).
  // gap-y-10 (40px, owner request 2026-08-29: "spacing between the product
  // card from one row to another should be 40px gap") -- matches Figma's
  // own row-to-row spacing exactly (node 406:3137: each subsequent
  // "Products List" row carries its own `pt-[40px]`). gap-x-4 (16px)
  // within a row is unchanged, matching that same file's `gap-[16px]` on
  // each row's own tile spacing -- only the row-to-row gap was ever 40px,
  // not the gap between cards in the same row. Both gated to xl now --
  // node 590:1173 has its own real mobile gaps (8px between columns, 24px
  // between rows), a different value, not the same 16px/40px shrunk down.
  grid: "grid grid-cols-2 max-xl:gap-x-2 max-xl:gap-y-6 xl:grid-cols-3 xl:gap-x-4 xl:gap-y-10",
};

// Mobile values (max-xl: gap-3/text sizes) from Figma node 590:1173,
// 2026-08-30 -- the first real mobile frame for this tile; xl values are
// this component's own pre-existing, already-confirmed desktop sizes,
// unchanged.
export const productCard = {
  root: "flex flex-col max-xl:gap-3 xl:gap-4",
  // Draft cards (owner spec, 2026-09-02: "PDP whose status is DRAFT still
  // shows on the PLP, but does NOT link anywhere yet... optionally with a
  // small Coming soon label") render this same root as a plain `<div>`
  // instead of a `Link` (see `ProductCard.tsx`) -- `cursor-default` plus a
  // faded image (`draftImage` below) is the only visual difference from a
  // published card, so the grid still reads as "the same 8 styles," not
  // two visually distinct card types.
  rootDraft: "cursor-default",
  draftImage: "opacity-60",
  text: "flex flex-col gap-2",
  // No footer row at all any more (owner spec, 2026-09-02, Leggings PLP
  // card format rewrite + same-day follow-up: no MOQ line, no "View style"
  // affordance, and no "Coming soon" label either -- "Remove coming soon
  // on both platforms, only from the front end and keep it in the
  // backend"). `rootDraft`/`draftImage` above still carry the visual
  // (non-clickable cursor, faded image) and semantic (`aria-disabled`)
  // signal that a card is a draft; the `status` field itself and every
  // route/sitemap/schema filter reading it are unchanged -- only the
  // rendered label and its own recipe token are gone.
  // Wraps normally on mobile, no truncation at all (owner correction,
  // 2026-09-02, after the card format rewrite lengthened every title to
  // "Custom [Style] Leggings": "current titles are truncated, make them in
  // 2 lines if they go beyond 1 line do not truncate them" -- explicitly
  // NOT `line-clamp-2` either, since that still truncates with an ellipsis
  // past 2 lines; a plain wrap (no `truncate` class at all) reflows to
  // however many lines a given title genuinely needs, 2 for every title
  // this format produces today, more only if a future one runs long.
  // Reverses the earlier `max-xl:truncate` (itself a same-day-earlier
  // reversal of a 2-line `min-h` reservation, back when titles were still
  // short enough to rarely wrap). Desktop keeps `truncate` -- not part of
  // this request, and its own single-column-width titles were never
  // reported as clipped.
  // Font-size threshold moved max-xl:/xl: -> max-md:/md: (owner,
  // 2026-09-04: same tablet-width treatment as the homepage). `xl:truncate`
  // stays xl:-gated, not moved to md: -- the grid itself stays 2-column
  // through tablet width (ProductGrid's own 3-column switch is still
  // xl:-only, deliberately deferred alongside CategoryFilters' sidebar,
  // see docs/05-plan.md), so a still-narrow tablet card truncating to one
  // line the same way a wide desktop column does would read wrong; this
  // keeps the "wrap, don't truncate" mobile behavior through the full
  // 2-column range and only grows the text size.
  // Mobile bumped to 15px/13px (owner, 2026-09-10: "make mobile 15 and 13
  // subline"), a deliberate override of the Figma-literal 14px/12px this
  // recipe otherwise runs on -- explicit owner value, not re-derived from
  // any node.
  title: "xl:truncate max-md:text-[0.9375rem] md:text-[1.125rem] font-medium text-[#21272a]",
  subline: "truncate max-md:text-[0.8125rem] md:text-[1rem] text-[#727272]",
  // 220px fixed image height at real mobile (node 590:1173: 156x220
  // tiles) -- passed as an extra className on MediaPlaceholder alongside
  // its own `ratio="79:100"` aspect class: an explicit height wins over
  // aspect-ratio wherever both are set (aspect-ratio only fills in a
  // dimension left otherwise undefined). Scoped to `max-md:` (owner
  // report, 2026-09-03: PLP card images "should not be too rectangular...
  // match desktop container ratio" at tablet width) -- this fixed 220px
  // used to apply all the way through `max-xl:` (768-1279px included), so
  // as the 2-column grid's own column got wider toward 1280px the image
  // stayed pinned to the same 220px height, reading increasingly
  // squashed/wide instead of proportional. From `md:` (768px) up through
  // `xl:`, no height override applies, so the box falls through to its
  // own `aspect-[79/100]` ratio -- proportional at every tablet width,
  // same ratio the desktop card already uses.
  // Bumped to 260px (owner, 2026-09-10, confirmed after a live before/after
  // comparison: taller mobile tiles read less cramped) -- was 220px,
  // Figma node 590:1173's own literal 156x220 mobile tile. Deliberate
  // override, permanent.
  image: "max-md:h-[260px]",
};

// rounded-none on every cell at every breakpoint (owner request,
// 2026-08-28: "pagination boxes with 0 radius"; re-confirmed 2026-08-30
// after a brief mobile-only `rounded-[12px]` pass matched against node
// 590:1173's own screenshot -- owner corrected that back to 0 radius
// everywhere: "the pagination should not have radius, 0px only"). Mobile
// still gets its own real cell size from that node (40px, vs desktop's
// 48px) -- only the corner radius was ever wrong to differ by breakpoint.
// Mobile top/bottom gap corrected (owner, 2026-08-30: "gap of pagination
// from the top of the product should be 40px" / "gap from pagination and
// the below separator should be 24px"). `row`'s own `py-12` (48px both
// sides) had been the ONLY source of both gaps, at every breakpoint --
// mobile now gets its own real values: `pt-10` (40px) above, and no
// bottom padding of its own at all (`pb-0`), since the page wrapper below
// this component already supplies its own confirmed `24px` bottom gap
// down to the section divider (`app/activewear/[category]/page.tsx`'s
// `max-xl:pb-6`) -- `row` having its own bottom padding too would have
// doubled that 24px into 48+24. Desktop keeps `py-12` unchanged.
export const pagination = {
  row: "flex flex-wrap items-center justify-center gap-2 max-xl:pt-10 max-xl:pb-0 xl:py-12",
  // Hover color matches ProductOptions' own "Download Catalog" secondary CTA
  // hover (owner spec there, `secondaryDesktop`: `hover:!bg-[#FFF6F3]`) --
  // owner request, 2026-09-03: page-number cells should hover the same
  // color. `cellActive` (the current page) is excluded, same as that CTA
  // never needing a hover state while already in its "on" look.
  cell: "flex max-xl:size-[40px] xl:size-[48px] items-center justify-center rounded-none bg-[#fafafa] text-[0.875rem] font-medium text-text hover:bg-[#FFF6F3]",
  cellActive:
    "flex max-xl:size-[40px] xl:size-[48px] items-center justify-center rounded-none bg-accent text-[0.875rem] font-bold text-paper",
  // No fixed mobile width any more (real bug, found live 2026-08-30, owner:
  // "previous box is touching the other box" -- a screenshot showed
  // "Previous"'s own icon+text genuinely needs more room than the fixed
  // `w-[80px]` box gave it once real padding/gap/font metrics are counted
  // (20px padding each side + 6px icon gap leaves only 40px for an 8-
  // character word, which a 14px font can't fit); flex items default to
  // `min-width: auto`, so the button rendered WIDER than its own declared
  // 80px to fit that content, overflowing straight into the gap meant for
  // the next cell. `w-fit` sizes the box to its real content instead --
  // it can never overflow itself, so the row's own `gap-2` between cells
  // is guaranteed, at any font/rendering. `whitespace-nowrap` keeps the
  // icon and "Previous"/"Next" on one line at any width.
  edgeCell:
    "flex max-xl:h-[40px] xl:h-[48px] items-center gap-1.5 max-xl:w-fit whitespace-nowrap rounded-none bg-[#fafafa] px-5 text-[0.875rem] text-[#838d97] enabled:hover:bg-[#FFF6F3] disabled:cursor-not-allowed disabled:opacity-60",
  edgeIcon: "size-2 shrink-0 text-current",
};

/* --- FabricOptions --------------------------------------------------- */

// Figma node 579:5632, 2026-08-29. Its own bespoke 1164px centred column
// (x=138 on a 1440 frame) -- not container-p's own cap/side-padding, same
// "section gets its own custom width" precedent as categoryBanner's 685px
// column. #e8ecf1 divider colour is the same real value already used for
// CategoryFilters'/ProductGrid's own borders elsewhere on this page, not a
// second, coincidentally-identical hex. Header labels sit above row 1 only
// (see FabricOptions.tsx's own header comment) -- fabricCell/bodyCell
// style row 1 specifically (grouped with its own header text, gap-12 =
// 48px between them within one column); fabricCellCol/bodyCellCol style
// every row after that (plain data, no header pairing). Desktop only for
// now, no mobile Figma frame exists yet.
// Responsive fallback below xl (owner's own reference has no mobile frame
// for this section either): fixed 302/293px columns side by side would
// overflow any viewport under ~1000px outright (found live: 1290px
// scrollWidth against an 820px tablet viewport) -- same "stack instead of
// side-by-side below xl" fallback already used twice on this same page
// (CategoryFilters+ProductGrid). Columns go full-width and stack
// vertically below xl, sit at their real fixed widths side by side at xl,
// matching every other real value (widths, gaps, type sizes) exactly as
// Figma specifies at the one breakpoint that's actually confirmed.
export const fabricOptions = {
  // max-w-[1440px] at every breakpoint, not xl:max-w-[1164px] -- Tailwind's
  // border-box sizing means max-width caps the OUTER box including
  // padding, so capping at 1164 with 138px padding on each side actually
  // shrinks the content box to 888px (1164 - 138*2), not the real 1164px
  // content width Figma specifies. 1440 is the site's own real page cap
  // (matches container-page); 138px padding on a 1440-wide box is what
  // correctly nets out to 1164px of content (found live, owner report:
  // "separator width is 1164px" -- measured 888px before this fix).
  // Now the LAST of the 3 sections (order swapped 2026-08-30, owner:
  // "make [WhatWeCover] 1st and [this] as 3rd"). xl:pt-[80px] (owner,
  // 2026-09-01: "change its gap from 100px to 80px from top on desktop" --
  // was `pt-[100px]`, itself a correction of `pt-[120px]` the same day)
  // and xl:pb-[120px] (unchanged -- this is page-end spacing, a separate
  // concern from the inter-section gap above it).
  section: "mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-8 xl:px-[138px] xl:pt-[80px] xl:pb-[120px]",
  // max-xl:gap-4/px-0 (mobile Figma node 590:1488's own Title frame: 16px
  // gap, no side inset of its own -- headingBlock's parent `section`
  // already carries px-5).
  // xl:max-w-[750px] (owner report, 2026-08-30: "fabric section title
  // should be in 2 lines") -- desktop widened from the mobile-confirmed
  // 579px, which was too narrow for the heading's own explicit line break
  // (`fabricHeading`'s "\n" between "the" and "big brands", added 5at): at
  // 579px, even the FIRST line ("The fabrics behind the") itself wrapped a
  // second time, rendering 3 lines total instead of 2 (measured live:
  // 192px height / 64px line-height = 3). 750px is the minimum width
  // "The fabrics behind the" fits on one line at this heading's own 54px
  // size (measured directly: 700px still wraps to 3 lines, 750px is
  // exactly 2). Mobile keeps the original 579px, unaffected -- only this
  // desktop-specific 3-line bug was reported.
  // md:max-w-[750px] (moved from xl:, 2026-09-04, alongside `heading`'s own
  // threshold move below) -- load-bearing together: the 750px width is
  // specifically what lets the heading's own forced line-1 text fit on one
  // line at its 54px desktop size (see `heading`'s own comment above,
  // "3-line bug"); widening the box without also growing the heading size
  // at the same breakpoint (or vice versa) reintroduces that exact bug at
  // tablet width.
  headingBlock: "mx-auto flex w-full max-w-[579px] flex-col items-center gap-4 text-center md:max-w-[750px] md:gap-6",
  // No local `eyebrow` token any more (2026-09-10 cleanup): this rendered
  // as a bare `<p>` instead of the shared `<Eyebrow>` component, so it sat
  // outside the sitewide eyebrow system entirely -- any future design-system
  // eyebrow change (colour rule, weight, letter-spacing) would have quietly
  // missed this page. Its values already matched `eyebrow.size`'s own
  // default exactly (16px/600 mobile, 20px/600 desktop at the same `md:`
  // threshold), so switching FabricOptions.tsx to `<Eyebrow tone="light">`
  // with no size override is a like-for-like swap, not a value change.
  // max-xl:text-[1.875rem]/leading-[34px]/font-normal (30px/34px, mobile
  // Figma, matching whatWeCover.heading's exact pattern). xl keeps the
  // original 54px/64px/font-medium.
  //
  // The line break between "the" and "big brands" (owner request,
  // 2026-08-30: "fabric section title should be in 2 lines") is a real
  // `<br />`, not CSS: `Category.fabricHeading` carries a literal "\n",
  // and `TextReveal` (this heading renders through it, see FabricOptions.tsx)
  // now splits on "\n" before splitting into words, rendering a real
  // `<br />` between lines -- see TextReveal.tsx's own comment. No
  // `whitespace-pre-line`/`text-wrap` override needed here: those were a
  // real but wrong fix tried first, when the "\n" was still a literal text
  // character sitting inside one word's own animated reveal mask, which
  // scrambled the rendered word order across the break entirely (not just
  // failing to break) -- fixing the real cause in `TextReveal` itself
  // means any other heading that ever needs a forced line break through
  // this same component works correctly too, not just this one string.
  // Threshold moved xl:/max-xl: -> md:/max-md: (2026-09-04, same review) --
  // paired with `headingBlock`'s own `md:max-w-[750px]` above so the
  // "3-line bug" fix travels with it, not just the size.
  heading: "text-[1.875rem] leading-[34px] font-normal text-text md:text-[3.375rem] md:leading-[64px] md:font-medium",
  // gap-0 (was gap-12/48px) -- get_metadata shows zero gap between one
  // row's own box and the next; the 32px around every divider comes from
  // each row's own mb-8 (below its content) and pt-8 (above the next
  // row's content), not a separate flex gap stacked on top of those
  // (found live, owner report: "gaps under the content and in between"
  // measured wrong -- the flex gap was doubling the real 32px to 80px).
  // w-full added when this became a real <table> element (SEO/AEO
  // finalization pass, 2026-08-30): a <table>'s own UA-default sizing
  // shrinks to fit its content instead of filling its container the way a
  // plain <div> with the same `flex flex-col` classes did -- confirmed
  // live (computed width: 0 before this fix, since none of its
  // block-computed thead/tbody children had any intrinsic width to size
  // from either).
  // hidden xl:flex (was `flex`, 2026-08-30 mobile pass) -- mobile now has
  // its own accordion rendering below (accordionStack etc.), so this
  // <table> is desktop-only.
  table: "mt-12 hidden w-full flex-col xl:mt-[88px] xl:flex",
  // border-b (SEO/AEO finalization pass, 2026-08-30) replaces what used to
  // be a separate `divider` sibling element -- once these rows became
  // real <tr>s, a standalone divider needed its own <td colSpan={3}>,
  // which computed a genuinely ambiguous, zero-width table-cell display
  // (confirmed live: a bare <tr>/<td> nested inside a <tbody> that's
  // itself forced to block, with no active table layout algorithm to size
  // it, resolves to 0 width -- a real, reproducible browser quirk, not a
  // one-off glitch). A border directly on each already-flex <tr> has a
  // well-defined width by construction, since these rows are already
  // explicitly sized via their own flex classes.
  // text-left added to headerRow itself (real bug, found live 2026-08-30,
  // owner: "fix fabric options text alignment"): row 1's cells are real
  // <th scope="col">s (SEO/AEO finalization pass), which the browser's own
  // UA stylesheet centre-aligns by default -- every other row uses plain
  // <td>s, left-aligned by default. With no explicit alignment anywhere in
  // this recipe, that meant row 1 alone rendered centred while every row
  // below it rendered left, a real visible mismatch, not a design choice.
  // One override on the shared row class covers all three header cells at
  // once, matching the data rows' own (already-correct) default.
  headerRow: "flex flex-col gap-8 border-b border-[#e8ecf1] pb-8 text-left xl:flex-row xl:items-center xl:gap-[132px]",
  colFabric: "flex w-full flex-col gap-6 xl:w-[302px] xl:gap-12",
  col: "flex w-full flex-col gap-6 xl:w-[293px] xl:gap-12",
  colHeader: "text-[1.875rem] font-medium text-text",
  // font-semibold (owner request, 2026-08-30: "make the fabric coloum
  // content semibold") -- was font-medium.
  fabricCell: "text-[1.375rem] font-semibold leading-7 text-text",
  // font-normal, explicit (owner request, 2026-08-30: "make these regular
  // font" -- Gym/yoga/etc "Best For" and "Soft hand/etc" Performance cells)
  // -- was already regular by omission, written out now so it can't be
  // mistaken for an oversight.
  bodyCell: "text-[1.375rem] font-normal leading-7 text-text",
  dataRow: "flex flex-col gap-6 border-b border-[#e8ecf1] pt-8 pb-8 xl:flex-row xl:items-center xl:gap-[132px]",
  // No xl:shrink-0 (fix, 2026-08-30): the header row's own equivalent
  // cells (colFabric/col above) never had shrink-0 and already shrink
  // correctly at 1280-1365px; these data-row cells did, which blocked
  // them from narrowing to match and caused a real 10px overflow at
  // exactly 1280x720 (302+293+293+132+132 = 1152px needed, only 1004px
  // available at that viewport). Same standing rule already documented in
  // this project's own decision log: "a fixed-width flex row that must
  // fit multiple desktop viewports never uses shrink-0 on its children"
  // -- default flex-shrink:1 lets all three columns narrow together,
  // proportionally, so the row always fits without losing its ratio.
  // Same semibold/regular correction as fabricCell/bodyCell above, applied
  // to every row after the first.
  fabricCellCol: "w-full text-[1.375rem] font-semibold leading-7 text-text xl:w-[302px]",
  bodyCellCol: "w-full text-[1.375rem] font-normal leading-7 text-text xl:w-[293px]",
  // max-xl:mt-8/max-w-[320px] (mobile Figma node 590:1488: 32px gap under
  // the accordion stack, 320px note width). xl keeps the original 48px
  // gap/570px width.
  // text-[1.125rem]/leading-6 (18px) mobile -> xl:text-[1.25rem]/xl:leading-7
  // (20px) desktop -- same responsive split already established for this
  // page's other body copy (e.g. whatWeCover.itemBody), not a size unique
  // to this note (owner report, 2026-08-30: "font for this should be
  // 18px... follow the same as in other sections" -- was a flat 20px at
  // every breakpoint before this).
  // Threshold moved xl:/1280px -> md:/768px (2026-09-04, same review) --
  // margin/width/size all move together, desktop values always larger.
  note: "mt-8 w-full max-w-[320px] text-[1.125rem] leading-6 text-text md:mt-12 md:max-w-[570px] md:text-[1.25rem] md:leading-7",
  noteBold: "font-semibold",

  /* --- Weight tiers (owner spec, 2026-09-02, T-Shirts category) ---------
     Optional secondary table between the main fabric table/accordion and
     `note` above -- only renders when `Category.weightTiers` is set (see
     that field's own comment). A real <table>, not a second accordion:
     `overflow-x-auto` on its own wrapper keeps it responsive without
     duplicating the main table's own heavier mobile-accordion mechanism
     for what's deliberately a lighter, secondary element -- 3 short
     columns never needs more than a horizontal scroll at narrow widths,
     confirmed live at 360px (no page-level overflow). Sits inside the
     same `mx-auto` content column as the main table/heading, so it lines
     up with them rather than running edge to edge. */
  // mt-[44px]/xl:mt-[60px] -- 12px more than the original mt-8/xl:mt-12
  // (owner, 2026-09-02: "add 12px more space from the top").
  // hidden xl:block (owner spec, 2026-09-06: no horizontal scroll on
  // mobile for this table) -- was `overflow-x-auto` at every breakpoint;
  // the mobile accordion below (reusing the main table's own
  // `accordionStack` recipe) now covers narrow viewports instead, same
  // "real table at xl+, accordion below it" split the main fabric table
  // already uses. `w-full` (no more `min-w-[520px]`) since this element no
  // longer needs to force its own scroll container at any width.
  weightTiersWrap: "mt-[44px] hidden w-full xl:mt-[60px] xl:block",
  weightTiersTable: "w-full border-collapse text-left",
  weightTiersHeaderRow: "border-b border-[#e8ecf1]",
  // text-[1.5rem] (24px), font-medium (owner, 2026-09-02: "make these
  // Tier GSM Best for 24 medium") -- was text-[1rem] (16px), font-medium
  // unchanged.
  // pr-16 (64px, owner spec, 2026-09-06: "Method, best for and notes can
  // still have some breathing space in between" -- was pr-10/40px, itself
  // an earlier bump from pr-6/24px that still read tight). On this cell
  // and the two below. Applies to every category using this table
  // (weightTiers or decoration), not just Cricket/Basketball.
  weightTiersHeaderCell: "pb-4 pr-16 text-[1.5rem] font-medium text-text last:pr-0",
  weightTiersRow: "border-b border-[#e8ecf1] last:border-b-0",
  weightTiersTierCell: "py-4 pr-16 text-[1.125rem] font-semibold leading-6 text-text whitespace-nowrap",
  // No `whitespace-nowrap` (real bug, found live, 2026-09-06): this cell is
  // "GSM" for the `weightTiers` variant (always short) but "Best for" for
  // the "decoration" variant (StructuredBlock, Cricket/Basketball) -- a
  // genuinely long sentence there, which `nowrap` forced onto one line,
  // stretching the table wider than its own column and eating into the
  // generous gap this same fix adds. Wrapping is safe for the short
  // `weightTiers` values too (nothing here is short enough to need forcing
  // onto one line).
  weightTiersGsmCell: "py-4 pr-16 text-[1.125rem] font-normal leading-6 text-text",
  weightTiersBestForCell: "py-4 pr-0 text-[1.125rem] font-normal leading-6 text-text",
  /* --- Decoration method (owner spec, 2026-09-05, Teamwear/Cricket) -----
     Alternate variant of the same reusable block above -- own eyebrow + H3
     ahead of a 3-column table, which reuses the weightTiers* table recipe
     keys above as-is (same 3-short-column shape, same no-horizontal-scroll
     mobile accordion). `decorationWrap` mirrors `weightTiersWrap`'s own top
     margin so this block sits the same distance under the main table as
     weightTiers does for a category that uses that variant instead. */
  // mt-[64px]/xl:mt-[80px] (owner spec, 2026-09-06: "Decoration from top, on
  // mobile, make it 64 and 80 on desktop" -- was mt-[44px]/xl:mt-[60px]).
  decorationWrap: "mt-[64px] w-full xl:mt-[80px]",
  // Now routed through the shared `<Eyebrow>` component (2026-09-10
  // cleanup, same reasoning as `eyebrow` above) instead of a bare `<p>`.
  // Kept as its own explicit `size` override, not dropped to the sitewide
  // default, since this block's own tablet breakpoint is `xl:` (matching
  // `decorationWrap`'s own `xl:mt-[80px]`), not the sitewide default's
  // `md:` -- real mobile value is identical either way (16px/600), so this
  // preserves the existing, unreviewed-today tablet behaviour rather than
  // silently changing it while only mobile is in scope.
  decorationEyebrowSize: "text-base font-semibold xl:text-[1.25rem]",
  // mt-4/xl:mt-6 (16px mobile / 24px desktop, owner spec, 2026-09-06: "on
  // mobile eyebrow to title 16px is gap, follow the same for decoration" --
  // matches this same section's own headingBlock gap-4/xl:gap-6 pattern.
  // Was a flat mt-6/24px at every breakpoint.
  decorationHeading: "mt-4 text-[1.875rem] font-medium text-text xl:mt-6",

  /* --- Mobile accordion (Figma node 590:1488, "Content", 2026-08-30) ----
     Below xl only -- the desktop <table> above covers xl+. First item
     opens by default (Figma), one open at a time (a single `openIndex`
     in the component, not a Set like CategoryFilters' independently-
     toggleable groups). Reuses CategoryFilters' own grid-template-rows
     0fr<->1fr zero-JS expand/collapse technique (accordionDetailGrid/
     accordionDetailGridOpen/accordionDetailClip below) and FilterChevronIcon
     (its 12x12 currentColor chevron-down already matches this design's own
     two icon exports, which differ only in colour/rotation, not shape).

     Real bug, found live (owner report, 2026-08-30: "the transition...
     should be very smooth. Also, when I expand the content, the title
     moves a little"): the FIRST build branched to two entirely different
     markup shapes per row (an open <div> with its detail block always
     mounted at grid-rows-[1fr] vs. a closed <button> with no detail block
     in the DOM at all) -- a CSS transition can't animate a value that's
     never NOT been its target, so a freshly-mounted grid-rows-[1fr] block
     just snaps open with no animation, same on unmount when closing. Fixed
     by mounting the SAME structure (header + detail) for every row always,
     same as CategoryFilters' own groups, toggling only the grid track
     (accordionDetailGrid <-> accordionDetailGridOpen) -- now there's an
     actual 0fr starting frame for the transition to animate away from.
     The "title moves" part was a separate, real border-box bug: the
     closed row had `border border-[#e8ecf1]` (1px) and the open row had
     no border at all -- with border-box sizing, adding/removing a border
     shifts the interior content box by the border's own width, nudging
     the title text by 1px on open/close. Fixed by keeping the border
     PRESENT at both states (accordionItem's own `border`) and only ever
     toggling its colour (accordionItemOpen's `border-transparent` vs
     accordionItemClosed's `border-[#e8ecf1]`) -- same box geometry either
     way, so the title never moves. */
  // No px-5 of its own -- `section` above already applies px-5 below xl;
  // adding a second one here double-padded the mobile column to 40px each
  // side (found live, owner report: "Container width is 320px" -- was
  // rendering ~295px of real content instead of the Figma frame's exact
  // 320px, since 375 (real device width) - 20*2 (section) - 20*2 (this,
  // duplicated) = 295, not 375 - 20*2 = 335, and definitely not Figma's
  // own 360-frame math of 360 - 20*2 = 320). mt-8 (32px, new) matches
  // Figma's Content root -- gap-[32px] between Title and Accordions
  // Stack -- previously missing entirely (0px gap).
  accordionStack: "mt-8 flex flex-col gap-3 xl:hidden",
  // Base wrapper for EVERY row, open or closed -- border is always
  // present (1px) so toggling its colour (below) never changes the box's
  // own geometry. transition-colors smooths the bg/border swap itself,
  // not just the height, matching the owner's "very smooth" request.
  accordionItem: "flex flex-col border transition-colors duration-300",
  accordionItemOpen: "gap-4 border-transparent bg-[#f2f2f7] px-4 pt-4 pb-5",
  accordionItemClosed: "border-[#e8ecf1] p-4",
  accordionHeader: "flex w-full items-center justify-between gap-4 text-left text-[1.125rem] font-medium leading-6 text-text",
  // grid-template-rows 0fr<->1fr, same mechanism as categoryFilters.
  // itemListGrid/itemListGridOpen -- overflow-hidden lives one level
  // deeper (accordionDetailClip), not on this padded track, since padding
  // never shrinks to 0 under a 0fr track on its own. Mounted on EVERY
  // row now (not just the open one) so the transition has a real 0fr
  // starting frame to animate from/to.
  accordionDetailGrid: "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out",
  accordionDetailGridOpen: "grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out",
  accordionDetailClip: "overflow-hidden",
  accordionDetail: "flex flex-col gap-4 pt-4",
  // Each Best For / Performance block's own label-to-value gap (4px) --
  // separate from accordionDetail's own 16px gap between the two blocks.
  accordionField: "flex flex-col gap-1",
  // No explicit leading override -- Figma specifies leading-[normal] here
  // (not a tight leading-none), same as the eyebrow above.
  accordionLabel: "text-sm font-semibold uppercase text-[#727272]",
  accordionValue: "text-[1.125rem] font-normal leading-6 text-text",
  accordionCollapsedTitle: "overflow-hidden text-ellipsis whitespace-nowrap",
  accordionChevron: "size-3 shrink-0 text-current transition-transform duration-300 ease-in-out",
  accordionChevronOpen: "rotate-180",
};

/* --- WhatWeCover ------------------------------------------------------- */

// Figma node 579:5580, 2026-08-30. Same bespoke 1164px column (x=138 on a
// 1440 frame) as its sibling section FabricOptions, built the same
// session -- see that recipe's own header comment for why this isn't
// container-p. Flat px-[138px] (not the responsive container-p-style
// fallback FabricOptions/TrustPoints use below xl) -- owner correction,
// 2026-08-30: "exactly follow the design," this section's own left/right
// gap is 138px, full stop. Kept overflow-safe on the styleguide's own
// always-must-pass 15-viewport suite by wrapping that one demo in its own
// `overflow-x-auto` (app/styleguide/page.tsx) instead of making the
// component itself responsive -- the real PLP route this section actually
// lives on isn't in that permanent suite while its sibling sections stay
// desktop-first (see tests/screenshots.spec.ts's own comment), so there's
// no real page this fallback was protecting. #e8ecf1 divider colour is the
// same real value already used throughout this page (CategoryFilters,
// ProductGrid, FabricOptions), not a coincidentally-identical hex.
export const whatWeCover = {
  // max-w-[1440px], not 1164 -- 1164 is this section's real CONTENT width
  // (after the 138px side padding), not its outer box. Capping the outer
  // box at 1164 makes the 138px padding eat into that already-1164 box,
  // netting only 888px of real content width -- the exact same bug found
  // and fixed on TrustPoints the same day (owner report there: "sparator
  // width is 1164px"), caught here by re-measuring this section too rather
  // than assuming it was fine because it built without error.
  // Now the FIRST of the 3 sections (order swapped 2026-08-30, owner:
  // "make [this] 1st"). No top padding of its own -- the section divider
  // above (built for the product-grid boundary) already supplies that
  // gap, so an extra pt here would stack a second gap on top of it, same
  // mistake already made and fixed once on this page (see the page-level
  // divider's own comment in app/activewear/[category]/page.tsx). No `pb`
  // here either now (owner, 2026-09-01: "built to pass and fabric section
  // has no space from the top, make both 120px") -- was `pb-1.5`/6px,
  // pairing with TrustPoints' own `pt-1.5` to net a 12px gap; that gap is
  // now entirely TrustPoints' own `pt-[120px]` below it, one side owning
  // the full value rather than two 6px halves.
  // max-xl: mobile Figma frame (node 590:1217, 360px), read 2026-08-30 --
  // its own py-[72px] wrapper and no side padding of its own
  // (headingBlock/artwork/grid each carry their own px-5 instead, matching
  // Figma's own nested-inset structure -- see each one's own comment
  // below). No `gap` here: the owner wants a different gap above the
  // artwork (32px) than below it (24px, owner correction 2026-08-30: "the
  // gap between media image and the fabric title... should be 24px"),
  // which a single flex `gap` can't express -- headingBlock/artworkWrap
  // each carry their own margin-bottom instead. xl keeps the original
  // desktop values (including its own gap-[72px]) untouched.
  section:
    "mx-auto flex w-full max-w-[1440px] flex-col items-center px-0 py-[72px] xl:gap-[72px] xl:px-[138px] xl:py-0",
  // max-xl:gap-4 (16px, mobile Title frame's own gap)/px-5 (20px, mobile's
  // own inset -- the section itself carries none below xl)/mb-8 (32px, the
  // gap down to the artwork below -- see the section comment above for why
  // this is a margin, not a shared gap). xl keeps the original centred
  // 579px column untouched.
  headingBlock: "mx-auto flex w-full max-w-[579px] flex-col items-center gap-4 px-5 text-center max-xl:mb-8 xl:gap-6 xl:px-0 xl:mb-0",
  // Threshold moved xl:/768px -> md: (2026-09-04, same PLP/PDP tablet
  // pass as FabricOptions). Fixed values, desktop larger.
  eyebrow: "text-base font-semibold text-text md:text-[1.25rem]",
  // max-xl:text-[1.875rem]/leading-[34px] (30px/34px, mobile Figma) --
  // font-normal there too (Figma's own mobile export: "Regular", weight
  // 460, not Medium). xl keeps the original 54px/64px/font-medium.
  // Threshold moved xl: -> md: (2026-09-04, same review). headingBlock's
  // own column stays a fixed 579px at every breakpoint here (unlike
  // FabricOptions' own heading, which needed a paired width change too --
  // this heading has no forced line break to protect), so no coupled
  // width change is needed.
  heading: "text-[1.875rem] leading-[34px] font-normal text-text md:text-[3.375rem] md:leading-[64px] md:font-medium",
  // Mobile-only (Figma node 590:1220, "Artwork", 320x220 -- exactly the
  // 16:11 ratio already in MediaPlaceholder's own set). xl:hidden on the
  // wrapper: no equivalent frame exists on the desktop design at all, not a
  // scaled version of one. px-5 (on the wrapper, not MediaPlaceholder's own
  // root) matches Figma's own 20px inset -- the artwork sits inside the
  // same implicit margin as the heading block and item list, not
  // full-bleed. See WhatWeCover.tsx's own comment for why the inset can't
  // live on MediaPlaceholder's root directly. mb-6 (24px, owner correction
  // 2026-08-30: "the gap between media image and the fabric title...
  // should be 24px") -- the gap down to the item list below; see the
  // section's own comment for why this is a margin, not a shared gap.
  // The grid's own first item carries no top padding of its own (see
  // `item`'s own comment) so this margin is the ONLY source of that gap,
  // not doubled with anything.
  // md:max-w-[420px]/mx-auto (owner report, 2026-09-03: this section's
  // placeholder image is "too much heighted" at tablet width) -- this
  // Mobile-only (no desktop frame exists for it at all). Was capped at
  // `md:max-w-[420px] md:mx-auto` (2026-09-03) to stop it stretching
  // disproportionately tall at tablet width -- corrected 2026-09-04
  // (owner: this image "does not need an image placeholder... follow the
  // website style" at tablet -- desktop has none, so tablet should match
  // desktop and show none either, not a resized version of the mobile
  // one). `xl:hidden` -> `md:hidden`; the width cap is gone, redundant
  // now that the box never renders past real mobile width anyway.
  artworkWrap: "w-full px-5 max-xl:mb-6 md:hidden",
  artwork: "w-full",
  // 2 columns x 570px + 24px gap = 1164px, matching the section's own
  // width exactly (get_metadata, not guessed). gap-y-0, not a spaced grid
  // -- owner correction, 2026-08-30: "the spacing within the content is
  // 32px top and bottom," i.e. every cell's own `item` padding (`py-8`)
  // is what supplies the rhythm between rows, exactly matching Figma's own
  // per-cell structure (get_metadata: even the cells with no visible top
  // gap in the export still carry their own top-padding-bearing parent,
  // not a shared inter-row gap) -- a second, stacked `gap-y` here would
  // double that spacing to 64px.
  // max-xl: a single column (mobile Figma stacks all 6 items, not a
  // 2-column grid) with its own px-5 inset. xl switches to the original
  // 2-column grid with no side padding of its own (the section's own
  // px-[138px] supplies that instead).
  grid: "flex w-full flex-col px-5 xl:grid xl:grid-cols-2 xl:gap-x-6 xl:px-0",
  // max-xl:border-[#f2f2f7]/py-6 (24px): mobile Figma uses a slightly
  // different divider colour and a tighter 24px rhythm than desktop's
  // #e8ecf1/32px -- both read directly off the mobile frame, not a guess.
  // max-xl:last:border-b-0/pb-0: the mobile frame's last item (Packaging)
  // has no trailing divider or bottom padding -- nothing renders below it,
  // so the desktop convention of bordering every item (see this recipe's
  // own top-of-file comment) doesn't apply once there's no sibling item
  // beside it to pair with. Desktop's own last item is untouched (this only
  // fires below xl).
  // max-xl:first:pt-0 -- the mobile frame's first item (Fabric) has no top
  // padding of its own (get_metadata: pb-[24px] only), unlike every other
  // item's symmetric py; the gap above it comes entirely from
  // artworkWrap's own margin. Without this override the two stacked
  // (doubling the intended gap to 48px, seen live as extra white space
  // between the artwork and "Fabric").
  item: "flex flex-col gap-2 border-b border-[#e8ecf1] py-8 max-xl:border-[#f2f2f7] max-xl:py-6 max-xl:first:pt-0 max-xl:last:border-b-0 max-xl:last:pb-0",
  // 24px, auto line-height (owner correction, 2026-09-03: "customization
  // section currently titles are 30px, make them 24px auto line height" --
  // was text-[1.875rem]/30px). Same size at both breakpoints, as before.
  itemTitle: "text-[1.5rem] font-medium text-text",
  // max-xl:text-[1.125rem]/leading-6 (18px/24px, mobile Figma). xl keeps
  // the original 20px/28px. text-subline (#17191e, owner, 2026-09-01:
  // sitewide title+subline colour on white/paper backgrounds) -- was
  // text-text; missed in the first pass over this pattern, caught when the
  // owner pointed at this exact grid ("Fabric"/"Color and print"/etc.).
  // Threshold moved xl: -> md: (2026-09-04, same review). Fixed values,
  // desktop larger.
  itemBody: "text-[1.125rem] leading-6 font-normal text-subline md:text-[1.25rem] md:leading-7",
};

/* --- TrustPoints --------------------------------------------------------- */

// Figma node 579:5493, 2026-08-29. Same bespoke 1164px column (x=138 on a
// 1440 frame) as its siblings FabricOptions/WhatWeCover -- see
// FabricOptions' own recipe comment for why this isn't container-p.
// Left-aligned, NOT the centred headingBlock those two siblings use --
// Figma's own export has this heading block at a fixed 650px width
// starting flush with the section's own left edge, the same left-aligned
// convention as CategoryBanner/CategoryMetaStrip, not a centred one.
// #e8ecf1 divider colour is the same real value already used throughout
// this page. Desktop only for now, no mobile Figma frame exists yet.
// Flat px-[138px] (owner request, 2026-08-30: "The section should follow
// th gaps from right and left 138px") -- a same-day earlier pass added a
// responsive fallback below `xl` (`max-w-[1440px] px-5 md:px-8`) since a
// flat 138px overflows real horizontal space below a 1440px viewport
// (`1164 + 2*138 = 1440`, nothing left to shrink). Reverted on explicit
// instruction to match Figma's own literal value exactly rather than
// invent a responsive fallback the design doesn't specify -- same
// "desktop only for now" tradeoff already accepted sitewide for this
// route (see tests/screenshots.spec.ts's own comment on why the PLP is
// out of the permanent overflow-checked suite).
// max-w-[1440px], NOT max-w-[1164px] -- 1164 is the CONTENT width (owner
// report, 2026-08-30: "sparator width is 1164px", i.e. each row's own
// border should span 1164px, not less). max-w-[1164px] caps the section's
// own OUTER box (padding included) at 1164, so the earlier px-[138px]
// padding was eating INTO that already-1164 box, leaving only 888px of
// real content (1164 - 2*138) -- confirmed live, every row's own width
// measured 888px, not 1164. The outer box needs to cap at 1440 (this
// section's real total width, matching every other full-bleed section on
// this page) so the 138px padding nets out to exactly 1164px of content,
// same arithmetic FabricOptions/WhatWeCover both already get right.
export const trustPoints = {
  // No shared `pt`/`pb` here any more -- top gap is now owned entirely by
  // whichever page renders this section, via `sidePaddingPlp`/
  // `sidePaddingPdp` below (owner, 2026-09-01: "in PLP... built to pass...
  // has no space from the top, make it 120px" -- was `pt-1.5`/6px, paired
  // with WhatWeCover's own `pb-1.5` to net 12px; PDP wasn't part of that
  // request at the time, so its own gap stayed whatever
  // `ProductCustomizeSteps` above it supplied -- `sidePaddingPdp` gained
  // its own `md:pt-[120px]` tablet-only top gap 2026-09-07, see that
  // token's own comment; desktop still relies on `ProductCustomizeSteps`,
  // unchanged). `pb` is similarly gone from here --
  // FabricOptions (PLP-only) now owns its own full top gap the same way.
  // max-xl: mobile Figma frame (node 590:1283, 360px), read 2026-08-30 --
  // no top padding of its own (WhatWeCover's own mobile pb-[72px] above
  // already supplies that gap), pb-[72px]. No `gap` here (unlike
  // WhatWeCover's section, which uses one uniform gap throughout): the
  // owner wants a different gap above the artwork (32px) than below it
  // (30px, owner correction 2026-08-30: "content under the media image
  // should have 30px space"), which a single flex `gap` can't express --
  // headingBlock/artworkWrap each carry their own margin-bottom instead.
  // xl keeps its own `gap-[72px]` untouched. No xl:px-* here anymore --
  // that's the call site's job via `sidePadding` below (PDP, 2026-09-01:
  // "80px gap from right and left" vs. the PLP's own 138px) -- a shared
  // `px-0` base plus one of two variant tokens, not two conflicting
  // arbitrary-value utilities stacked via className (Tailwind doesn't
  // guarantee override order between classes appended by a prop and
  // classes already in the recipe string). `pb-*` moved out to
  // `sidePaddingPlp`/`sidePaddingPdp` below too, 2026-09-07 (owner: "make it
  // 48px for mobile" -- PDP's own mobile bottom gap needed to differ from
  // PLP's, and a bare, unprefixed `pb-*` here would have been a second
  // same-specificity mobile utility fighting `sidePaddingPdp`'s own new
  // mobile override, the identical "two conflicting utilities" problem this
  // file already avoids for `px-*`/`pt-*` here -- so `pb-*` gets the same
  // one-token-per-variant treatment instead of living in both places.
  section: "mx-auto flex w-full max-w-[1440px] flex-col items-start px-0 xl:gap-[72px]",
  // Default/PLP desktop side padding (app/activewear/[category]/page.tsx) --
  // the original 138px value. xl:pt-[120px] (owner, 2026-09-01, see the
  // section comment above) is the PLP's own full top gap now, not half of
  // a 12px pair with WhatWeCover. `pb-[72px]` (unprefixed, so it's this
  // page's bottom gap at every breakpoint including desktop) is the value
  // that used to live directly on `section` above -- moved here unchanged
  // when `sidePaddingPdp` needed its own different mobile value (see that
  // token's own comment).
  sidePaddingPlp: "pb-[72px] xl:px-[138px] xl:pt-[120px]",
  // PDP desktop side padding (app/activewear/[category]/[style]/page.tsx,
  // owner, 2026-09-01) -- the site's own standard 80px content margin
  // (same value as `.container-p`'s desktop inset, app/globals.css), not a
  // one-off literal. No top gap of its own at desktop (`xl:pt-0` -- see
  // below) -- `ProductCustomizeSteps` still supplies this section's own
  // top spacing there (its own `xl:pb-[200px]`), unchanged. xl:pb-[120px]
  // (owner, 2026-09-02: "make it 120px from the bottom" -- was
  // `pb-[100px]`) is this page's own desktop bottom gap.
  // `pb-12` (48px, owner, 2026-09-07: "make it 48px for mobile" -- was
  // `pb-[72px]`, inherited unprefixed from `sidePaddingPlp`'s own value
  // before `pb-*` moved out of the shared `section` string) is this page's
  // own mobile bottom gap.
  // `md:pt-[120px]`/`md:pb-0` (owner, 2026-09-07: "follow 120px from top
  // of each section, 0px from the bottom" for this section, Specifications,
  // and HOW WE CUSTOMIZE) -- was `md:pb-[72px]`, no top of its own (fixed
  // the same day as the mobile/tablet split above, before this request).
  // This section now owns a real top gap of its own at tablet, instead of
  // borrowing `ProductCustomizeSteps`' bottom padding -- `xl:pt-0` cancels
  // the `md:pt-[120px]` cascade at desktop explicitly, since desktop was
  // never asked to change and still relies on `ProductCustomizeSteps`'
  // own `xl:pb-[200px]` for its gap, exactly as before. This is a single
  // shared recipe used identically by `TrustPoints.tsx` -- every PDP route
  // (`app/activewear/[category]/[style]/page.tsx` is itself one shared
  // template for every category) picks this up automatically, not a
  // per-category override.
  sidePaddingPdp: "pb-12 md:pb-0 md:pt-[120px] xl:pt-0 xl:px-[80px] xl:pb-[120px]",
  // Services page's own "Responsible make" instance (Figma node 811:1156,
  // owner, 2026-09-07: "spacing from top and bottom is 104px") -- same
  // 80px side padding as `sidePaddingPdp` (this site's own standard
  // `.container-p` desktop inset), but this page's own top/bottom gap
  // rather than relying on the section above the way the PDP's `xl:pt-0`
  // does (this section here isn't following `ProductCustomizeSteps`).
  // Mobile own gap corrected 2026-09-08 (owner: "responsible make should
  // have 72px gap from top and bottom") -- was falling back to the same
  // 104px as desktop (no mobile Figma frame exists for this page's own
  // instance to confirm a different number against, so it had inherited
  // desktop's value as a placeholder); 72px is this project's own standing
  // mobile section-to-section gap instead. `xl:pt-[104px]`/`xl:pb-[104px]`
  // restore the Figma-confirmed desktop value explicitly, since the base
  // `pt-*`/`pb-*` are now the mobile-only 72px. `pb-[56px]` (owner,
  // 2026-09-10, mobile-only review: "reduce 16px from responsible make
  // section from the bottom") -- was the standing 72px, -16px here
  // specifically; top gap and desktop's own 104px unaffected.
  sidePaddingServices: "pt-[72px] pb-[56px] xl:px-[80px] xl:pt-[104px] xl:pb-[104px]",
  // /our-factory's own instance, section 8 (Figma node 883:156) -- side
  // padding matches the PLP's own 138px (this node's real measurement too,
  // not a coincidence), but its own top/bottom gap: `xl:pt-[160px]` (owner,
  // 2026-09-09: "from top 160px gap"). `pb-0`/`xl:pb-0` (owner, same day:
  // "audited safety will not have any space from the bottom" -- this
  // section is now directly followed by ClientLogos' own `ourFactory`
  // instance, which owns the 72px gap between them on its own top edge
  // instead; supersedes the earlier `xl:pb-[104px]` Figma measurement, at
  // both breakpoints since no mobile-only figure was given). Mobile side
  // padding still falls back to this project's standing 72px section gap
  // for its top, same reasoning as `sidePaddingServices`'s own mobile
  // correction above (no mobile frame exists for this node either).
  sidePaddingOurFactory: "pt-[72px] pb-0 xl:px-[138px] xl:pt-[160px] xl:pb-0",
  // max-xl:gap-2 (8px, mobile Title frame's own gap)/px-5 (20px, mobile's
  // own inset -- the section itself carries none below xl)/w-full (fills
  // the padded row instead of shrinking to content, unlike desktop's
  // intrinsic 650px cap)/mb-8 (32px, the gap down to the artwork below --
  // see the section comment above for why this is a margin, not a shared
  // gap). xl keeps the original values untouched. No xl:max-w-* here --
  // that's the call site's job via `sidePaddingPlp`/`sidePaddingPdp`
  // (headingMaxWidthPlp/headingMaxWidthPdp) below, same split as the
  // section's own side padding and for the same reason (owner, 2026-09-01:
  // the PDP's title was wrapping mid-sentence instead of using the wider
  // 80px-padded row's full available width -- it had inherited the PLP's
  // own 650px Figma cap, which the PDP's own frame, 634:5189, doesn't have).
  headingBlock: "flex flex-col gap-2 px-5 w-full max-xl:mb-8 xl:gap-4 xl:px-0 xl:mb-0",
  // PLP desktop title cap (Figma node 579:5493) -- the original 650px value.
  // `md:max-w-[clamp(560px,65vw,780px)]` (owner, 2026-09-09: "the subline
  // width that we define on this page, apply it to all paragraphs across
  // pages, same way") -- this token also caps the SUBLINE (both heading
  // and subline share `headingBlock`, `w-full` below `xl:`), which had no
  // width constraint at all through the tablet range -- the exact same
  // bug already fixed for /our-factory's own `headingMaxWidthOurFactory`.
  // Used by the `"plp"`/`"services"` variants (`TrustPoints.tsx`'s own
  // `sidePaddingHeadingWidth` map) -- real impact confirmed on Services'
  // own "Responsible make" subline, a genuine 2-sentence paragraph that
  // ran full-width at tablet.
  headingMaxWidthPlp: "md:max-w-[clamp(560px,65vw,780px)] xl:w-auto xl:max-w-[650px]",
  // PDP desktop title (Figma node 634:5189) -- no cap of its own; fills the
  // row's full width (section already supplies the 80px side padding).
  headingMaxWidthPdp: "xl:w-full xl:max-w-none",
  // /our-factory's own instance ("Audited for safety, environment and
  // ethics") -- like `headingMaxWidthPlp`, plus a tablet-only fluid cap
  // (owner, 2026-09-09: "audit for safety title and subline, should
  // follow the same style") -- the same `clamp(560px,65vw,780px)`
  // readability fix `ourFactoryIntro.paragraph`/`ourFactoryDetails.lead`
  // just got, for the same reason (no cap existed between 768-1279px, so
  // both the title and subline -- both children of `headingBlock`, so one
  // shared cap covers both -- stretched to this block's full available
  // width at tablet). A dedicated token, not a change to the shared
  // `headingMaxWidthPlp` above, since PLP/Services also use that one and
  // weren't part of this request.
  headingMaxWidthOurFactory: "md:max-w-[clamp(560px,65vw,780px)] xl:w-auto xl:max-w-[650px]",
  // max-xl:text-[1.875rem]/leading-[34px] (30px/34px, mobile Figma; same
  // Medium weight both sizes). xl keeps the original 54px/64px.
  // Tailwind's `text-wrap` utility (-> `text-wrap: wrap`) overrides the
  // sitewide h1/h2/h3 `text-wrap: balance` default (app/globals.css) --
  // owner, 2026-09-01: on mobile, "Built to pass the" / "squat test" was
  // leaving visible room on line 1 that "squat" would fit in; balance
  // deliberately picks that even split over greedy-filling each line,
  // which reads as wasted space on this particular short heading. A
  // one-heading override, not a global change -- `balance` stays the
  // sitewide default everywhere else. NOT `[text-wrap:normal]` -- "normal"
  // isn't a valid `text-wrap` value (wrap/nowrap/balance/pretty/stable
  // are), so the browser silently drops that whole declaration as invalid
  // and `balance` keeps winning; confirmed live before landing on this.
  // Threshold moved xl: -> md: (owner, 2026-09-04: same tablet-width
  // treatment as the homepage, PLP/PDP). Fixed values, desktop larger.
  heading:
    "text-[1.875rem] leading-[34px] font-medium text-text text-wrap md:text-[3.375rem] md:leading-[64px]",
  // /our-factory's own instance ("Audited for safety, environment and
  // ethics") -- owner, 2026-09-09: "Audited for safety environment font
  // size should be 45 as other titles on tablet." A standalone token, not
  // a `className`-merged override of `heading` above: PLP/PDP/Services
  // deliberately use a FIXED 54px at `md:` (see that token's own comment,
  // "Fixed values, desktop larger"), but every other /our-factory title
  // (`ourFactoryIntro.heading`, `ourFactoryProcess`'s own `TextReveal
  // as="h2" className="text-h1..."`) uses the sitewide fluid `text-h1`
  // clamp instead -- confirmed live, `text-h1` resolves to ~45px at a
  // 1024px tablet viewport, exactly this section's own target, and this
  // was the one /our-factory title still on the fixed PLP-style pattern.
  // Two `md:` font-size utilities merged via `cx()` onto the same base
  // string would race for the same reason this codebase avoids that
  // elsewhere (unpredictable generation order between two same-specificity
  // rules) -- a fully separate string sidesteps it instead of risking it.
  // `max-md:leading-[34px]`, not a bare unprefixed `leading-[34px]` --
  // real bug, found live: an unprefixed `leading-*` utility did NOT lose
  // to `md:text-h1`'s own bundled line-height at `md:` the way `text-
  // [1.875rem]`'s font-size correctly did (font-size and line-height
  // apparently don't share the same override-order guarantee in this
  // codebase's Tailwind build) -- confirmed live, computed line-height
  // stayed the mobile 34px at 1024px instead of tracking `text-h1`'s own
  // ~53px. Scoping the mobile value to `max-md:` removes the unprefixed
  // rule entirely, so nothing competes with `text-h1`'s own line-height
  // at `md:` and up.
  headingOurFactory: "text-[1.875rem] max-md:leading-[34px] font-medium text-text text-wrap md:text-h1",
  // max-xl:text-[1.125rem]/leading-6 (18px/24px, mobile Figma). xl keeps
  // the original 22px/32px-line-height regular -- Figma's own real value
  // for this subline, a size this project's own type scale has no match
  // for (same "one-off literal value straight from Figma" precedent as
  // every other bespoke PLP section). text-subline (#17191e, owner,
  // 2026-09-01: sitewide title+subline color on white/paper backgrounds)
  // -- was text-text. Threshold moved xl: -> md: (2026-09-04, same review).
  subline: "text-[1.125rem] leading-6 font-normal text-subline md:text-[1.375rem] md:leading-8",
  // Services page's own "Responsible make" instance (owner, 2026-09-08:
  // make "We name what is genuinely certified rather than making broad
  // green claims" semi bold) -- `font-semibold`, same weight token every
  // other inline-bold phrase on this site uses (ServicesIntro's own
  // `paragraphBold`, etc.), inherits `subline`'s own size/colour.
  sublineBold: "font-semibold",
  // Mobile-only (Figma node 590:1258, "Artwork", 320x220 -- same 16:11
  // ratio and wrapper-padding pattern as WhatWeCover's own artwork; see
  // that component's comment for why the inset can't live on
  // MediaPlaceholder's own root). xl:hidden: no equivalent frame exists on
  // the desktop design at all, not a scaled version of one. No margin of
  // its own -- the owner's "30px space under the media image" (2026-08-30)
  // is produced entirely by the row list's own first-item padding below,
  // not stacked on top of it (an earlier pass had both, doubling the real
  // gap to 62px -- the "white space" the owner then reported, 2026-08-30).
  // Was capped at `md:max-w-[420px] md:mx-auto` (2026-09-03); corrected
  // 2026-09-04 to hide entirely at tablet width instead -- same fix as
  // WhatWeCover's own artworkWrap above, see that token's own comment.
  artworkWrap: "w-full px-5 md:hidden",
  artwork: "w-full",
  // max-xl:px-5 (20px, mobile's own inset). xl keeps the original full-
  // bleed list (the section's own px-[138px] supplies that padding there).
  list: "flex w-full flex-col px-5 xl:px-0",
  // Every row owns only its own bottom border -- same edge-ownership
  // technique used throughout this page (CategoryFilters, FabricOptions).
  // py-8 (32px, owner correction 2026-08-30, up from 24px) on desktop.
  // max-xl:border-[#f2f2f7]/gap-2 (8px)/px-0/py-6 (24px): mobile Figma
  // uses a slightly different divider colour, a tighter icon-to-text gap
  // and row rhythm, and no horizontal row padding of its own (the list's
  // own px-5 supplies that instead). max-xl:first:pt-[30px]: this row is
  // the ONLY source of the gap above the whole list (artworkWrap carries
  // no margin of its own, see its comment above) -- set directly to the
  // owner's requested 30px total rather than Figma's own literal pt-32,
  // which the owner explicitly corrected down.
  // items-start, not items-center (owner spec, 2026-09-06: "if it goes to
  // 2, 3 lines keep the icon top align with the text") -- a row whose point
  // text wraps to 2-3 lines used to centre the icon against the whole
  // multi-line block, so it drifted down between the lines instead of
  // sitting with the first one. `icon`'s own small top offset below (not
  // added here) nudges it back down from a bare 0px top-align to the
  // visual centre of that first line specifically.
  row: "flex items-start gap-3 border-b border-[#e8ecf1] px-2.5 py-8 max-xl:gap-2 max-xl:border-[#f2f2f7] max-xl:px-0 max-xl:py-6 max-xl:first:pt-[30px]",
  // 24px (owner correction 2026-08-30, down from 30px -- Figma's own most
  // common value across these 5 rows, see the row comment above for why
  // that one shared size was picked over the file's inconsistent
  // per-row overrides in the first place) on desktop.
  // max-xl:text-[1.125rem]/leading-6 (18px/24px, mobile Figma).
  // Threshold moved max-xl: -> max-md: (2026-09-04, same review). Base
  // (unprefixed) is the desktop 24px value; the mobile override now only
  // applies below 768px.
  pointText: "text-[1.5rem] leading-tight font-normal text-text max-md:text-[1.125rem] max-md:leading-6",
  // 18x18px (owner correction 2026-08-30, down from the sitewide size-5
  // token/20px) on desktop, max-md:size-4 (16px, mobile Figma) -- paired
  // with `row`'s own `items-start` above (owner spec, 2026-09-06): centres
  // the icon against the point text's own FIRST line specifically (half of
  // `pointText`'s line-height minus the icon's own height), not the top of
  // the whole multi-line block.
  // Tablet-range values added 2026-09-09 (owner, on /our-factory's own
  // instance: "icons and text does not still look centre aligned for
  // audited for safety environment section", confirmed "just for tablet";
  // then, once confirmed the same bug hit every page: "fix this component
  // across pages for tablet if not already") -- real bug, found live:
  // `pointText`'s own text size only shrinks below `max-md:` (768px) -- at
  // tablet (768-1279px) it's still the desktop 24px/`leading-tight` (30px
  // line-height) -- but this icon used to shrink to 16px/`mt-1` at the
  // WIDER `max-xl:` threshold (below 1280px), so every page's tablet range
  // was rendering the mobile-sized icon (needs (30-16)/2=7px margin to
  // centre against this 30px line-height) with the mobile MARGIN (4px,
  // tuned for mobile's own smaller `pointText` size) -- a 3px-too-high
  // mismatch, confirmed on both /our-factory and the PLP before this fix.
  // Every value here is fully scoped to a disjoint range (no bare
  // unprefixed rule at all, unlike the original two-tier `max-xl:`
  // version) -- found live, in this same investigation, that an
  // unprefixed rule doesn't reliably lose to a compound-scoped one in this
  // codebase's Tailwind build (see `headingOurFactory`'s own line-height
  // fix, same session), so `md:max-xl:mt-[7px]` alone would have raced an
  // unprefixed desktop default instead of cleanly overriding it.
  icon: "shrink-0 text-accent max-md:mt-1 max-md:size-4 md:max-xl:mt-[7px] md:max-xl:size-4 xl:mt-1.5 xl:size-[18px]",
};

/* --- RelatedCategories -------------------------------------------------- */

// No Figma frame for this row -- plain, minimal, built entirely from
// existing tokens/Button rather than an invented visual design (SEO/AEO
// rule 6: internal links in real body copy, not just the nav).
export const relatedCategories = {
  section: "container-p flex flex-col items-start gap-6 py-16",
  heading: "text-h3",
  list: "flex flex-wrap gap-4",
};

/* --- ProductGallery (PDP) -------------------------------------------------- */

// Figma node 634:4961 (desktop, 700x612) / 638:860 (mobile, thumbnail strip
// only, 2026-08-31). Sits beside ProductInfo on desktop, above it on mobile
// -- see ProductInfo.tsx's own header comment and the page's own wrapper
// (app/activewear/[category]/[style]/page.tsx). A fixed-width column on
// desktop (`xl:w-[700px] xl:shrink-0`), not `flex-1` -- confirmed against
// the full assembled PDP frame (node 634:4926, 2026-09-01): the row is a
// real 700px gallery + a real 66px gap + a real 514px text column, not
// gallery + flex-1, so a fixed column matching this frame's own real width
// exactly is correct, not just a safe fallback (see the page's own wrapper
// comment for the gap/text-column numbers).
export const productGallery = {
  // Sticky on desktop (owner reference, 2026-09-02: nike.ae's own PDP --
  // confirmed live via that site's own computed style, `position: sticky`
  // on the images column) -- the gallery stays fixed in the viewport while
  // ProductInfo/ProductHighlights/etc. beside it scroll normally.
  //
  // `xl:top-[24px]`, corrected from an initial `top-[111px]` (real bug,
  // found live, owner report: "gap on top of the image ... adds more gap"
  // as scrolling continued). `111px` assumed the sitewide `Header` stays
  // visible and 87px tall the whole time, the same assumption
  // CategoryFilters' own sidebar made before ITS OWN header stopped being
  // reliably present (see that recipe's own comment) -- but this page's
  // `Header` isn't just sticky, it also hides itself on scroll-down past
  // its own height (Header.tsx's own translate-away behavior). Once it
  // hides, the 87px it used to occupy is gone, but the gallery's own `top`
  // offset stayed fixed at 111px regardless -- the empty space where the
  // header used to be read as a growing gap the further down the page you
  // scrolled. A flat `24px` breathing gap is correct whether the header is
  // currently visible or hidden, since sticky only actually engages well
  // after the header has already scrolled past its own 87px hide
  // threshold on a normal downward scroll -- no overlap in practice.
  // `self-start` keeps the column from stretching to match its sibling's
  // height, which would break sticky (nothing left to stick against) --
  // same reasoning CategoryFilters' own sticky sidebar documents. Not
  // sticky below `xl`: at that breakpoint this column isn't even rendered
  // (`hidden`, mobile has its own separate `mobileRoot` markup below).
  // xl: -> md: -> xl: (owner, 2026-09-04: apply the homepage's tablet-width
  // treatment to the PDP; reverted 2026-09-07, owner: "the PDP top section,
  // above the specifications should follow the mobile layout, not desktop
  // as the main product image size is very small"). The 2026-09-04 version
  // squeezed the desktop column into a judgment-call `md:w-[320px]` at
  // tablet width (no tablet Figma frame exists for this page) -- the rail
  // (109px) + its own 16px gap left only ~195px for the main image, which
  // read as too small live. Reverted to the original single `xl:` tier:
  // this column only renders from 1280px up again, `mobileRoot` below
  // covers the full 768-1279px tablet range with its own full-width image.
  desktopRoot: "hidden xl:sticky xl:top-[24px] xl:flex xl:w-[700px] xl:shrink-0 xl:gap-4 xl:self-start",
  // h-[609px] = 5 x 109px thumbnail + 4 x 16px gap (owner, 2026-09-01:
  // "make it 16px" -- was 12px, itself a same-day correction down from an
  // original 16px, now reverted back) -- the exact height of a 5-visible
  // window at this gap. Capped and scrollable (not left to grow as more
  // thumbnails reveal) so the main image beside it, `self-stretch`, never
  // changes height as the rail scrolls -- only the rail's own content
  // moves.
  rail: "relative flex h-[609px] w-[109px] shrink-0 flex-col gap-4 overflow-y-auto no-scrollbar",
  // border-2, no colour utility here (owner report, 2026-09-01:
  // chevron-driven changes weren't highlighting the active thumbnail) --
  // the border's own colour is set as an inline style in
  // ProductGallery.tsx instead (see that file's own comment on why: a
  // `border-accent`/`border-transparent` class pair, both real,
  // `!important`-correct CSS confirmed in the served stylesheet, still
  // rendered inverted live for reasons that didn't reproduce as a normal
  // cascade-order or transition-timing issue). Kept here for the width
  // only, so the border still reserves its own 2px space at every state
  // ("reserve the border's own space" technique already used for
  // FabricOptions' mobile accordion items) and never shifts the
  // thumbnail's own size/position.
  thumb: "block w-full shrink-0 overflow-hidden border-2 transition-colors",
  // 8px above the rail's true bottom edge (612 - 604, Figma's own measured
  // gap) -- overlays the last visible thumbnail rather than sitting flush
  // at the column's edge. Stays visible through every "show more" click
  // until the rail is fully scrolled to its end (owner, 2026-09-01: "the
  // chevron stays there until user go through all the images"), not just
  // for one click -- `ProductGallery.tsx`'s own `railAtBottom` state drives
  // that, this is only the chrome.
  moreButton: "absolute inset-x-0 bottom-2 z-10 mx-auto flex size-[45px] items-center justify-center rounded-full bg-paper text-text shadow-card",
  // Mirrors `moreButton` at the rail's own top edge (owner, 2026-09-01:
  // once the user has scrolled down at all, "the chevron should appear too
  // when user goes one image down... so now user should have an option to
  // scroll back") -- same chrome, `top-2` instead of `bottom-2`, hidden
  // until the rail has scrolled past its own start.
  lessButton: "absolute inset-x-0 top-2 z-10 mx-auto flex size-[45px] items-center justify-center rounded-full bg-paper text-text shadow-card",
  moreIcon: "size-[22px]",
  mainWrap: "relative min-w-0 flex-1 self-stretch",
  // Native scroll-snap track (owner report, 2026-09-07: "blinky, jerky" --
  // replaces the old `key={activeIndex}`+`gallery-fade-in` remount, which
  // unmounted the whole image on every change and gave zero visual
  // feedback during a mobile swipe). `no-scrollbar` is the same utility
  // `rail`/`ProductGallery.tsx`'s own mobile strip already use. Every
  // slide (`mainSlide`, below) is exactly this track's own width, so
  // scrolling one slide-width is a full "page" to the next image -- real
  // finger-tracking on touch, and `ProductGallery.tsx`'s own imperative
  // `scrollTo` for thumbnail/chevron-driven changes, both riding the same
  // native mechanism rather than two different transition systems.
  mainTrack: "flex h-full w-full snap-x snap-mandatory overflow-x-auto no-scrollbar",
  // `ratio="575:612"` lives on the `MediaPlaceholder` inside each slide
  // (unchanged from before), not here -- this wrapper only needs to be
  // exactly the track's own width so the aspect-ratio box behind it
  // renders at the identical size the old single-image version did.
  mainSlide: "w-full shrink-0 snap-center",
  // Mobile counterpart of `mainTrack`/`mainSlide` -- same mechanism, sized
  // against `mobileImageWrap`'s existing fixed `h-[450px]` instead of an
  // aspect-ratio box (each slide's own `MediaPlaceholder` already gets
  // `h-full` via `mobileImage`, unchanged from before).
  mobileTrack: "flex h-full w-full snap-x snap-mandatory overflow-x-auto no-scrollbar",
  mobileSlide: "h-full w-full shrink-0 snap-center",
  // bottom-6/right-6 (24px, Figma's own measured inset) for the next
  // button; prev sits 81px from the right edge (next's own 24px inset +
  // its 45px width + the pair's 12px gap) -- both circles, matching
  // `moreButton`'s own bg-paper/shadow-card chrome.
  navButton: "absolute bottom-6 z-10 flex size-[45px] items-center justify-center rounded-full bg-paper text-text shadow-card",
  navButtonPrev: "right-[81px]",
  navButtonNext: "right-6",
  navIcon: "size-[22px]",
  // Bottom-left, mirroring the nav pair's own bottom-right inset (owner
  // request, 2026-09-01: a visible confirmation that the prev/next chevrons
  // actually changed the image) -- same bg-paper/shadow-card chrome as the
  // circular buttons beside it, not a new pill style.
  counter: "absolute bottom-6 left-6 z-10 rounded-full bg-paper px-3 py-1.5 text-[0.875rem] font-medium text-text shadow-card",
  // Mobile: thumbnail strip pinned over the bottom of the main image
  // (Figma's own `Thumbnail Slider`, 638:2525) -- xl:hidden, the mirror of
  // desktopRoot above. Full-bleed edge to edge (owner, 2026-09-01: "product
  // image should take full width 360... no gap from the nav and the
  // image") -- this sits inside the page's own `container-p` wrapper
  // (shared with ProductInfo below it, which does still want that side
  // inset), so `-mx-5 md:-mx-8` breaks this element back out to the full
  // viewport width, cancelling `container-p`'s own 20px/32px side padding
  // (the 32px tier starts at `md`/768px, matching `container-p`'s own
  // breakpoint in app/globals.css, not Tailwind's `sm`/640px) at every
  // width below `xl` (the only range this renders in) -- matches Figma's
  // own mobile gallery frame, which is edge-to-edge with its OWN internal
  // padding (the thumbnail strip's `px-4` below), not inset by an outer
  // page margin.
  // xl:hidden -> md:hidden -> xl:hidden (2026-09-04, then reverted
  // 2026-09-07, pairs with desktopRoot's own threshold above).
  mobileRoot: "relative -mx-5 xl:-mx-8 xl:hidden",
  // Was a fixed 450px (owner correction, 2026-09-01: "the main image
  // height is 450px", replacing the earlier `ratio="4:5"` aspect-driven
  // height, which computed ~469px at a 375px viewport). Split into a
  // wrapper + fill pair 2026-09-07 (swipe-to-change): `MediaPlaceholder`
  // doesn't forward arbitrary DOM props, so the swipe
  // `onTouchStart`/`onTouchEnd` handlers need a plain wrapping `<div>` of
  // their own -- this wrapper carries the sizing and the `relative`
  // positioning the counter/strip siblings already assumed came from
  // `mobileRoot` (still true, unaffected -- this wrapper is a new,
  // separate box, not a replacement for `mobileRoot`'s own `relative`).
  //
  // Fixed height replaced with an aspect ratio (owner report, 2026-09-07:
  // on tablet, this box spans the full container width while staying
  // pinned at a flat 450px tall, so a portrait photo's `object-cover` had
  // to zoom in hard to fill the now-landscape-shaped box, cropping away
  // most of the garment vertically -- confirmed live on a real photo). An
  // aspect ratio makes the box's height scale WITH its width at any size
  // in the mobile/tablet range instead of staying flat, so the crop stays
  // sensible throughout, not just at exactly 375px. `360:450` (4:5) is
  // this frame's own confirmed ratio (Figma node 814:98, "Hero Image"),
  // replacing an earlier stand-in that borrowed desktop's own main-image
  // ratio before a mobile-specific frame existed to source one from.
  mobileImageWrap: "relative aspect-[360/450]",
  mobileImage: "h-full",
  // Top-left, mirroring the desktop counter's own bg-paper/shadow-card
  // chrome (owner, 2026-09-01: tapping a thumbnail "should show the image
  // on the top and I should know its changed") -- top, not bottom, since
  // the thumbnail strip already owns the bottom edge here.
  mobileCounter: "absolute left-4 top-4 z-10 rounded-full bg-paper px-3 py-1.5 text-[0.875rem] font-medium text-text shadow-card",
  // Moved out from an absolute overlay on the main image into normal flow
  // below it (owner report, 2026-09-07: with a real photo wired in, the
  // overlay treatment "does not look good... over the image" -- now that
  // Figma's own mobile-specific frame exists (node 814:98), this strip
  // matches its "Thumbnail Slider" band: a plain block sitting directly
  // after the image, no `absolute`/`z-10`/`bg-paper` needed since it's not
  // competing with the photo underneath it anymore).
  // px-4 (was pl-4-only while it hung off the image's own left edge) --
  // a normal-flow block can take symmetric side padding like the rest of
  // the page content instead of a one-sided inset.
  // `scroll-pl-4` (real bug, found live 2026-09-01, same root cause
  // already solved once on this site's own carousels -- e.g.
  // HowItWorks/Exhibitions' `scroll-pl-[80px]` matching their own
  // `px-[80px]`): a `padding-left` (or a margin on the first child, tried
  // both) on a `snap-x` container isn't enough on its own -- the browser
  // computes `scroll-snap-align: start`'s resting position from the
  // CONTENT edge of the first snapped child, not the scrollport's own
  // edge, so it auto-scrolls PAST any leading padding/margin to align
  // them, cancelling the visual inset at `scrollLeft: 0` (confirmed live:
  // `strip.scrollLeft` initialized to exactly the padding's own px value,
  // not 0). `scroll-padding-left` tells the snap algorithm the scrollport
  // itself starts inset by that amount, so `scrollLeft: 0` becomes the
  // correct, stable resting alignment for the first item -- the real
  // visual gap still comes from `px-4` itself, this just keeps the browser
  // from auto-scrolling past it. No matching trailing scroll-padding -- the
  // last thumbnail is allowed to sit flush/scroll-clipped at the right edge
  // on purpose (owner, 2026-09-01: "when horizontally scrolls then it can
  // cut from the canvas as a natural scroll behavior"; Figma's own frame
  // shows the same partially-cropped final thumbnail).
  // gap-2 (8px, owner correction, 2026-09-01: "not for mobile, make mobile
  // 8px, desktop 12px" -- matches Figma node 814:98's own 8px gap too).
  mobileStrip: "no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 py-2 scroll-pl-4",
  // size-12 (48px, Figma's own thumbnail size) -- same border-reserve
  // technique as `thumb` above, snap-start for the swipeable strip.
  // `[&>div>div]:bg-ink/10` (owner, 2026-09-01: "change the mobile
  // thumbnail image a bit darker so its visible as a placeholder") --
  // once `mobileStrip` lost its own background above, these thumbnails'
  // placeholder fill (`media.placeholderLight`'s `bg-paper-2`, the same
  // near-white shade the empty main image behind them already uses) was
  // nearly invisible against it. Targets MediaPlaceholder's own inner
  // placeholder div (button > shell div > placeholder div) directly with
  // an existing token (`ink` at 10% opacity) rather than adding a new
  // MediaPlaceholder tone/prop for one caller -- scoped to this mobile
  // strip only, the shared `placeholderLight` default is untouched
  // everywhere else on the site.
  // No border colour utility here -- set as an inline style in
  // ProductGallery.tsx instead, same reasoning as desktop's `thumb` above.
  // size-14 (56px, owner request 2026-09-07, up from size-12/48px) --
  // covers both mobile and tablet, since this whole block only renders
  // below `xl` (`mobileRoot`'s own `xl:hidden`).
  mobileThumb: "block size-14 shrink-0 snap-start overflow-hidden border-2 [&>div>div]:bg-ink/10",
};

/* --- ProductInfo (PDP) --------------------------------------------------- */

// Figma node 634:4988 desktop / 638:2541 mobile, 2026-08-31 -- identical
// copy, type sizes and internal spacing at both breakpoints (both frames
// use the same gap-[20px] outer / gap-[8px] inner). The mobile frame's own
// 20px inset is handled by the page's own `container-p` wrapper, not here
// (see ProductInfo.tsx's own usage) -- this recipe only owns the internal
// layout, not the page-level margin around it.
export const productInfo = {
  // gap-3 (12px) below xl, gap-5 (20px) at xl (owner, 2026-09-01: first
  // "cap-leg to the title 12px" -- was gap-5/20px -- then "on desktop
  // increase 8px gap between CAP-LEG and the title" specifically, so
  // desktop goes back to 20px while mobile stays at the newer 12px; this
  // row's own gap between the SKU and the heading+description block).
  root: "flex w-full flex-col gap-3 xl:gap-5",
  skuRow: "flex w-full items-end",
  sku: "text-base font-semibold text-text",
  // gap-2 (8px), matching Figma's own gap between the H1 and description.
  content: "flex w-full flex-col gap-2",
  // 20px/28px below xl (owner correction, 2026-09-01: "product title 20px
  // and 28 line height... should scale when it goes to large viewport" --
  // mobile Figma node 638:2541 measures 22px/28px, a 2px discrepancy from
  // the owner's own stated number, kept as instructed rather than silently
  // substituted), scaling up to the desktop frame's own confirmed 24px/
  // 30px (node 634:4988) at `xl` -- was one flat `text-2xl` at every
  // width, which is why this never grew any roomier above the mobile
  // breakpoint even as the column itself widened.
  //
  // tracking-[-0.02em] below xl (owner, 2026-09-01: "title should also be
  // wraped to 2 lines on 360px or wherever it is possible") -- at a flat
  // 20px/normal tracking, a real product title ("Custom High-Waisted
  // Compression Leggings Manufacturer") still wraps to 3 lines at a 360px
  // viewport (320px content width below `md`); tested live that neither a
  // smaller size nor plain letter-spacing alone was needed on its own --
  // a slightly tighter tracking at the SAME confirmed 20px/28px gets this
  // string to 2 lines without contradicting that size. `xl:tracking-normal`
  // resets it at desktop, where the wider fixed 514px column already fits
  // 2 lines at the normal 24px size with no adjustment.
  // Threshold moved xl: -> md: (owner, 2026-09-04: same tablet-width
  // treatment as the homepage). Safe regardless of ProductGallery's own
  // still-`xl:`-gated column split (deliberately deferred, see
  // docs/05-plan.md): this heading renders in the mobile-stacked
  // full-width column at every width below `xl:` today, which is wider
  // than the 514px desktop column the `xl:tracking-normal` reset was
  // tuned for -- more room, not less, so no new wrap risk.
  // Mobile bumped to 22px (owner, 2026-09-10: "make title 22px"), overriding
  // the earlier 20px Figma-literal value (node 638:2541) -- explicit owner
  // value. Line-height kept at 28px (leading-7); tracking/wrap behavior
  // below `md` unchanged, re-check the 2-line wrap at 360px this was
  // originally tuned for if the title copy ever runs longer.
  heading: "w-full text-[1.375rem] leading-7 tracking-[-0.02em] md:text-2xl md:leading-[30px] md:tracking-normal font-semibold text-text",
  // 18px/28px-line-height regular -- text-lg/leading-7 match Figma's
  // literal values exactly, same reasoning as `heading` above. text-subline
  // (#17191e, owner, 2026-09-01: sitewide title+subline colour on white/
  // paper backgrounds) -- was text-text.
  // md:max-w-[clamp(560px,65vw,780px)]/xl:max-w-none (owner, 2026-09-09:
  // "the subline width that we define on this page, apply it to all
  // paragraphs across pages, same way") -- the gallery/info row is still
  // `flex-col` below `xl:` (only becomes a fixed-width column at `xl:`),
  // so this description had no width constraint through the tablet range.
  description: "w-full md:max-w-[clamp(560px,65vw,780px)] xl:max-w-none text-lg font-normal leading-7 text-subline",
};

/* --- ProductHighlights (PDP) --------------------------------------------- */

// Figma node 634:5393 desktop / 638:2547 mobile, "Content", 2026-09-01 --
// the PDP's 4-row icon spec list (MOQ/samples/sizing/DDP), sitting directly
// below ProductInfo in the same text column (32px gap between them, same
// value at both breakpoints -- supplied by the shared column wrapper's own
// `gap-8` in app/activewear/[category]/[style]/page.tsx, not a margin here).
// #e8ecf1 border (not Figma's mobile export's own slightly different
// #dde1e6) -- same real hairline colour already used everywhere else on
// this site (FabricOptions/CategoryFilters/ProductGrid), not a second,
// near-duplicate grey for what reads as the identical line.
export const productHighlights = {
  root: "flex w-full flex-col",
  // first:pt-0 -- Figma's own first row has no top padding (flush with
  // whatever sits above it); every row, including the last, still gets its
  // own border-b (same "every row owns its own trailing divider, no
  // special-cased last row" convention already used by FabricOptions'
  // table rows).
  row: "flex items-center gap-3 border-b border-[#e8ecf1] py-4 first:pt-0",
  icon: "size-6 shrink-0 text-accent",
  // 18px/28px-line-height medium -- text-lg/leading-7 (same literal values
  // as productInfo.description) but font-medium, not font-normal -- Figma's
  // own export ("Figtree:Medium") for this list, a real weight difference
  // from the description text next to it, not an inconsistency to fix.
  text: "text-lg font-medium leading-7 text-text",
};

/* --- ProductOptions (PDP) ------------------------------------------------ */

// Figma node 634:5034 desktop / 645:2905 mobile, "Content", 2026-09-01 --
// two pill-tag groups ("Fabric options", "Customization") directly below
// ProductHighlights in the PDP's same text column (32px gap, supplied by
// that column's own shared `gap-8`, same as ProductHighlights' own
// reasoning). Pills use plain `flex flex-wrap` at both breakpoints, not a
// hand-coded per-row grouping -- Figma's own "rows" are just where a
// flex-wrap row happens to break at each frame's own width (456px desktop,
// ~263-271px mobile), not a fixed layout; letting the real content reflow
// naturally reproduces both screenshots without hardcoding either one.
export const productOptions = {
  root: "flex w-full flex-col gap-8",
  group: "flex w-full flex-col gap-4",
  // 20px/32px-line-height medium -- text-xl/leading-[32px] match Figma's
  // literal values exactly.
  heading: "w-full text-xl font-medium leading-[32px] text-text",
  pillRow: "flex w-full flex-wrap items-center gap-3",
  // rounded-[6px], not this project's other pill/chip radius
  // (categoryMetaStrip.chip's own rounded-[4px] border pill) -- a
  // genuinely different Figma component, solid `#f2f2f7` fill with no
  // border rather than an outlined chip, not a value to reconcile with it.
  pill: "flex shrink-0 items-center justify-center rounded-[6px] bg-[#f2f2f7] px-6 py-2",
  pillText: "whitespace-nowrap text-[1.0625rem] font-medium text-[#3c3c43]",
};

/* --- ProductCtas (PDP) ---------------------------------------------------- */

// Figma node 634:5065 desktop ("Buttons") / 638:1645 mobile ("Sticky With
// Social Proofing"), 2026-09-01 -- two different, deliberate treatments,
// not one component reflowing: desktop is an inline button pair sitting in
// normal flow under ProductOptions; mobile drops the secondary button
// entirely and turns the primary one into a `position: fixed` bar pinned
// to the viewport's bottom edge, "always visible" (owner spec) regardless
// of scroll position -- not `sticky` (which would only pin once its own
// flow position reached the bottom, same distinction already documented
// for Footer's own sticky-reveal trick). Reuses the existing `Button`
// component (`components/Button.tsx`) verbatim -- same primary/secondary
// pill already used for Header's own cta/secondaryCta, not a new button
// style for this one spot.
export const productCtas = {
  // hidden xl:flex -- desktop only, mobile gets the fixed bar instead.
  // xl:mt-2 (owner, 2026-09-01, first "32px" -- already the shared column
  // gap-8 every sibling here uses, no change needed -- then "make it
  // 40px" specifically for this row): adds 8px on TOP of that shared
  // gap-8 (32px) rather than changing the shared gap itself, which would
  // have also widened every OTHER gap in this column (ProductInfo to
  // ProductHighlights, etc.) that was never asked to change. A margin on
  // a flex child adds to its own `gap`, it doesn't collapse into it, so
  // 32 + 8 = a real 40px above this row specifically.
  // Threshold moved xl: -> md: -> xl: (owner, 2026-09-04: apply the
  // homepage's tablet-width treatment to PLP/PDP; reverted 2026-09-07
  // alongside ProductGallery's own revert, so this row switches in step
  // with the gallery beside it rather than a breakpoint earlier on its own).
  desktopRow: "hidden w-full items-center gap-3 xl:flex xl:mt-2",
  // Sticky bar, not fixed (real bug, found live, owner report, 2026-09-02:
  // "the fixed cta, overlapping the social icons on the footer" -- a
  // `position: fixed` bar pinned to the viewport painted over Footer
  // forever, since it was a descendant of `<main>`, whose own higher
  // stacking always outranks Footer's `sticky bottom-0` reveal, see
  // Footer.tsx's own comment). `sticky bottom-0`, rendered as the literal
  // last child of `<main>` (ProductCtas.tsx's own header comment), sticks
  // to the viewport bottom throughout the page's own scroll range and
  // releases the instant `<main>`'s own box ends, exactly at the Footer
  // boundary -- no z-index games needed, no overlap possible. z-10 kept so
  // it still paints above ordinary page content scrolling underneath it
  // while stuck (nothing else in this flow uses a competing stacking
  // value). xl:hidden below xl. Softened (owner, 2026-09-01: "make
  // the shadow subtle, looks hard") -- was Figma's own literal 3-layer
  // upward shadow at up to 8% opacity with tight blur, which read as a
  // hard edge rather than a soft lift; now a single, wider, lower-opacity
  // pass using the same ink colour (`#121317`, `--color-ink`) and general
  // softness `shadow-card` already uses sitewide, just cast upward (a
  // shadow above a bar pinned to the BOTTOM of the screen naturally casts
  // up, not down, so `shadow-card` itself doesn't apply directly) -- still
  // an inline arbitrary value, since no other component in this project
  // casts a shadow in this direction.
  // max-h-[60px], not a fixed `h-[60px]` (owner, 2026-09-01: "make the
  // overall fixed background 60px") -- `max-height` is what `mobileBarHidden`
  // below animates down to 0, collapsing this bar's own reserved space
  // entirely once hidden (see that key's own comment for why a fixed height
  // can't do that); `items-center` centers the (shorter, 44px) button
  // vertically within it regardless.
  // Background material (owner, trying options, 2026-09-01: went bg-paper
  // -> bg-paper/80 + blur-md ("looks too bad") -> bg-paper/95 + blur-sm ->
  // this (no background tint, blur only) -> an "Apple glass" 10%-tint/
  // blur-xl recipe ("no i mean revert to the one you blurred the
  // background before going to apply glass style") -- back to this: no
  // colour tint at all, just `backdrop-blur-sm` so whatever scrolls
  // underneath the fixed bar is legible but softened, with no visible
  // bar "chrome" of its own.
  // `overflow-hidden` + `transition-[max-height,opacity]`: base state,
  // always present so `mobileBarHidden` below animates smoothly rather
  // than snapping, and so the button doesn't spill out while its own box
  // is shrinking toward 0.
  // xl:hidden -> md:hidden -> xl:hidden (2026-09-04, same review; reverted
  // 2026-09-07) -- pairs with desktopRow's own threshold above.
  mobileBar:
    "sticky inset-x-0 bottom-0 z-10 flex max-h-[60px] w-full items-center justify-center overflow-hidden backdrop-blur-sm px-5 py-2 shadow-[0px_-4px_16px_rgba(18,19,23,0.06)] transition-[max-height,opacity] duration-300 ease-out xl:hidden",
  // Row holding the new WhatsApp button beside the existing CTA button
  // (owner, 2026-09-10: "along with the cta, we want to add Whatsapp icon
  // too" -- net new, no Figma frame for this pairing). `w-full` at real
  // mobile (matches `mobileButton`'s own former full-bleed width), capped
  // at a fixed max-width and centred by the bar's own `justify-center`
  // from `md:` up -- the same "stop stretching into an ugly full-bleed
  // stripe past phone width" fix `mobileButton` used to apply to itself
  // alone, now applied to the pair as a unit.
  mobileBarRow: "flex w-full items-center gap-3 md:max-w-[360px]",
  // WhatsApp button: a fixed 44px circle, matching the CTA button's own
  // 44px height (`mobileButton`'s `!min-h-[44px]`) so the pair reads as
  // one row, not two mismatched controls. `shrink-0` so the CTA button
  // beside it (now `flex-1`) never squeezes this one narrower. Brand green
  // (`#25D366`, WhatsApp's own mark colour) -- not a sitewide token, this
  // is the one place the brand's own colour is the point, same reasoning
  // `icons/SocialIcons.tsx`'s glyphs already lean on brand recognition.
  whatsappButton:
    "flex size-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-paper transition-opacity hover:opacity-90",
  whatsappIcon: "size-6",
  // Owner spec, 2026-09-02: "when it gets to the cta section, remove the
  // fixed cta automatically" -- collapses `max-height` to 0 (not `hidden`/
  // `display:none`, so it still animates) the instant the marker fires.
  //
  // A previous version of this used `translate-y-full` instead, keeping the
  // bar's own 60px reserved in flow while it slid out of view, then
  // collapsed that reserved space via a SEPARATE ~300ms-delayed state once
  // the slide had visually finished (reasoning: by then the bar was
  // off-screen below the viewport, so the collapse itself would never be
  // seen). That reasoning broke on a fast scroll (owner report, 2026-09-01:
  // "the footer does not show up completely...its cut out when you finish
  // the page") -- a user who reaches the true bottom of the page faster
  // than that 300ms delay is already looking at Footer when the delayed
  // collapse fires, so the sudden 60px height loss shifts the whole page up
  // underneath a scroll position the browser then re-clamps, cutting the
  // top of Footer (its logo) off above the viewport. Collapsing `max-height`
  // immediately, in the same class toggle as hiding, removes the delay (and
  // the separate `collapsed` state it required) entirely -- the shrink now
  // always happens the moment the marker fires, well above FinalCta, never
  // anywhere near the true bottom of the page. `!py-0` and `opacity-0`
  // collapse the button's own padding/paint in step with the height so
  // nothing visibly overflows the shrinking box mid-transition.
  mobileBarHidden: "!max-h-0 !py-0 opacity-0 pointer-events-none",
  // w-full, not Figma's own fixed 320px -- 320px is that specific 360px
  // mobile frame's own math (360 - 20px*2 inset), not a deliberate fixed
  // button width; w-full inside the bar's own px-5 reproduces the same
  // visual inset at every real mobile/tablet width instead of clipping or
  // under-filling at any width other than exactly 360px.
  // `!min-h-[44px] !text-[1rem]` (owner, 2026-09-01: "cta height 44px from
  // 54px[,] CTA font size 16 pixel") -- overrides `Button`'s own shared
  // `base` recipe (`min-h-[54px] text-button`/18px), which every other
  // button on the site still uses unchanged; `!` is required since
  // `min-h-[54px]`/`min-h-[44px]` and `text-button`/`text-[1rem]` are
  // same-specificity Tailwind utilities touching the same properties --
  // without it, Tailwind's own generated stylesheet order (not this
  // className's position) decides which wins, the exact bug already found
  // and fixed once on this gallery's own active-thumbnail border.
  // `flex-1`, not its own `w-full`/`md:w-auto md:min-w-[280px]` any more
  // (2026-09-10, alongside the new WhatsApp button beside it) -- the "stop
  // stretching past phone width" job moved to the shared row wrapper
  // (`mobileBarRow`'s own `md:max-w-[360px]`) now that this button isn't
  // the bar's only child; `flex-1` just fills whatever the row leaves
  // after the WhatsApp button's own fixed 44px, at every breakpoint alike.
  mobileButton: "flex-1 !min-h-[44px] !text-[1rem]",
  // Desktop-only override for the secondary ("Download Catalog") button
  // (owner, 2026-09-01: "should have primary orange text and outline, on
  // hover should have this color FFF6F3") -- `Button`'s shared `secondary`
  // variant is deliberately `currentColor`-based (border/text follow
  // whatever text colour the surrounding section already uses, e.g.
  // inverting cleanly on a dark section) and its hover is a generic
  // `bg-current/10` tint; this PDP wants a specific, hardcoded brand-orange
  // treatment instead, not "whatever colour is ambient here" -- a real
  // difference in kind, not just this button living somewhere `currentColor`
  // happens to resolve to orange already (it doesn't; the ambient text
  // colour on this row is `text-text`). `!` on every one of these: the same
  // same-specificity-utility-order risk already found and fixed on
  // `ProductGallery`'s own active-thumbnail border (see that component's
  // comment) applies here too (`border-current`/`text-current` vs.
  // `border-accent`/`text-accent`, one Tailwind-generated stylesheet
  // deciding which wins otherwise) -- `!important` makes the override
  // unconditional rather than order-dependent. `#FFF6F3` is a literal,
  // owner-specified hex for this one hover state, not a design-system
  // token -- kept exact rather than substituted for an existing colour.
  secondaryDesktop: "!border-accent !text-accent hover:!bg-[#FFF6F3]",
};

/* --- WhatsAppFloatingButton (sitewide, desktop only) ---------------------- */
// Owner, 2026-09-10: "on mobile we added whatsapp, on desktop sitewide i
// want to add too on the right cornor of the site as floating with the
// same number integrated to it" -- the mobile-only WhatsApp CTA already
// lives inside `productCtas.mobileBar` (`xl:hidden`, and itself only
// rendered on the handful of pages that mount `ProductCtasMobileBar`).
// This is a separate, always-on floating button instead of extending that
// bar to desktop: desktop has no equivalent bottom bar at all to extend,
// and mounting this once in `app/layout.tsx` (rather than per-page, the
// way the mobile bar is) is what makes it genuinely sitewide with no risk
// of a future page forgetting to add it.
export const whatsappFloating = {
  // `hidden xl:flex`: the mirror of `productCtas.mobileBar`'s own
  // `xl:hidden` -- the two are mutually exclusive by breakpoint, never
  // both on screen at once. `fixed bottom-6 right-6` (24px inset, this
  // project's own standard spacing unit) `z-40` matches the fixed
  // Header's own stacking level (`header.base`'s `z-40`) -- high enough to
  // float over every section's content, not fighting Footer's own
  // higher-still `z-50` drawer/portal layers (nothing here ever coexists
  // with the mobile drawer, which is `xl:hidden` itself).
  wrap: "fixed bottom-6 right-6 z-40 hidden xl:flex",
  // Same 56px size / brand-green / white-icon treatment as the mobile
  // bar's own `productCtas.whatsappButton`, scaled up slightly (44px ->
  // 56px) since this button stands alone on desktop rather than sitting
  // beside a second, same-height CTA button it needs to visually match.
  // `shadow-lg` -- floating over arbitrary page content (light and dark
  // sections alike) needs its own depth cue the mobile bar's blurred
  // backing bar already supplied for free.
  button:
    "flex size-14 items-center justify-center rounded-full bg-[#25D366] text-paper shadow-lg transition-transform hover:scale-105",
  icon: "size-7",
};

/* --- ProductCustomizeSteps (PDP) ----------------------------------------- */

// Figma node 634:5153 desktop / 643:2714 mobile, "How We Customize",
// 2026-09-01 -- same mechanism as the homepage's `howItWorks` recipe above
// (CapabilityCard row + useDesktopChevronScroller for desktop,
// CardCarousel for mobile), not a new carousel implementation. Card width
// stays Figma's own literal 335px here (unlike `howItWorks.desktopCard`,
// which was deliberately widened to 469px to match Exhibitions -- a
// homepage-specific choice with no equivalent sibling section on the PDP).
export const productCustomizeSteps = {
  // pt-[120px]: no sibling section context confirmed yet for this brand
  // new PDP section (Figma's own frame only specifies its own pt-[120px]).
  // Unprefixed, so it already applies at both tablet and desktop (this
  // div only ever renders from `md:` up) -- owner, 2026-09-07: "follow
  // 120px from top of each section" for this section, Specifications, and
  // TrustPoints specifically, already satisfied here, no change needed.
  // pb-[200px] used to be unprefixed too (owner, 2026-09-02: "make it
  // 200px from the top" -- this section's own bottom padding doubled as
  // TrustPoints' entire top gap on the PDP at every width, see
  // trustPoints' own comment) -- was pb-[120px] (originally set to mirror
  // pt as a plain symmetric default before TrustPoints' real gap was ever
  // specified). Split 2026-09-07 (owner: "...0px from the bottom of the
  // section" for this section too): `pb-0` is now the tablet value,
  // `xl:pb-[200px]` restores the original desktop-only value explicitly --
  // TrustPoints now owns its own top gap at tablet instead (see that
  // recipe's own comment), so this section no longer needs to supply it.
  // xl: -> md: (owner, 2026-09-04: apply the homepage's tablet-width
  // treatment to PDP -- this carousel is the same shape as Inside the
  // Factory/Exhibitions/How It Works, already fixed there; see
  // `desktopRow`/`desktopCard`/`cardMediaRatio` below for the matching
  // padding/width changes).
  desktopOuter: "hidden md:flex md:flex-col md:items-center md:gap-[72px] pt-[120px] pb-0 xl:pb-[200px]",
  desktopHeadingWrap: "container-p",
  // Reverted to Eyebrow's own default Overline size (20px/600), 2026-09-01
  // (owner: "make the eyebrow heading back to 20px wherever you changed")
  // -- a same-day earlier pass had overridden this to 16px semibold; no
  // `eyebrowSize` override is passed at either call site below anymore.
  // 812px forces Figma's real 2-line wrap -- same confirmed value already
  // used by How It Works/Certified & Compliant/Inside the Factory's own
  // centred headings. whitespace-pre-line (owner, 2026-09-01: "make in-
  // [house] the 2nd line") -- renders the content's own explicit "\n"
  // (see pdpCustomizationSteps.heading's own comment) as a real line
  // break instead of collapsing it to a space, same technique already
  // used for FabricOptions' own heading.
  desktopHeadingWidth: "max-w-[812px] whitespace-pre-line",
  // Same break, mobile (owner, 2026-09-01: "make it for mobile too") --
  // no width constraint needed here (mobile's own column is already
  // narrow enough that the explicit "\n" is the only thing controlling
  // where the break falls).
  mobileHeadingWidth: "whitespace-pre-line",
  // Mobile-only eyebrow override (owner correction, 2026-09-02: "eyebrow
  // size is 16px and auto height" -- was inheriting Eyebrow's own default
  // Overline size, 20px/1.2 line-height). `leading-normal` renders as the
  // browser's own font-metric-based "auto" line height rather than a fixed
  // multiple, matching "auto height" literally. `font-semibold` (owner
  // correction, same day: "font weight is semi bold") -- swapping to
  // `text-base` dropped `text-overline`'s own bundled 600 weight along with
  // its size/line-height, so it's restated explicitly here. Desktop's own
  // eyebrow (`desktopHeadingWrap`'s `SectionHeading` call) keeps the
  // default Overline size/weight, unaffected -- not part of this request.
  mobileEyebrowSize: "text-base leading-normal font-semibold",
  // Caps the carousel at the same 1440px/centred box `container-p` uses
  // (owner, 2026-09-02: "How We Customize should match [the rest] only on
  // the PDPs, not homepage" -- TrustPoints/Specifications/FAQ on this page
  // all sit inside `container-p`, so their content starts 80px in from
  // whatever margin centres that 1440px box). Without this cap, the
  // scroller wrap below is a genuine full-bleed sibling of the heading's
  // own `container-p` -- its own `px-[80px]` is measured from the TRUE
  // viewport edge, not from container-p's centred boundary, so on any
  // viewport wider than 1440px the two visibly diverge (confirmed live via
  // an owner screenshot: cards start well left of the heading/TrustPoints
  // text on a wide screen).
  //
  // At the time this was written, the homepage's own `howItWorks` (and
  // `exhibitions`/`insideFactory`) used the same uncapped shape
  // deliberately, "for its own wide-gallery feel" -- that was superseded
  // 2026-09-08 (owner: the drift read as a real bug, not a wide-gallery
  // effect, once shown live on Our Factory's own gallery/process sections)
  // -- every `desktopScrollerWrap` sitewide now gets this same 1440px cap.
  // See `docs/02-design-system.md`'s own "full-bleed scroller" note for
  // the general rule this recipe follows.
  desktopScrollerCap: "mx-auto w-full max-w-[1440px]",
  desktopScrollerWrap: "relative w-full cursor-none overflow-hidden",
  // scroll-pl/pr match the visual px-[80px] inset -- same reasoning as
  // `howItWorks.desktopRow`'s own comment (without them, scroll-snap's own
  // snap-point maths collapses the intended 80px gap before the first
  // card to 0).
  // md:px-8 (32px, container-p's own md: inset) / xl:px-[80px] (the
  // original, container-p's xl: inset) -- same tablet-width fix as
  // How It Works' own desktopRow.
  // `overflow-x-hidden`, not `-auto` (owner, 2026-09-08: "user can only
  // scroll by clicking" -- see `useDesktopChevronScroller`'s own header
  // comment in DesktopChevronScroller.tsx for the full reasoning).
  // `snap-x`/`snap-mandatory`/`scroll-pl`/`scroll-pr` dropped in the same
  // pass (owner, 2026-09-08: "still requires 2 times scroll to go up or
  // down, further make it smooth") -- see `insideFactory.desktopRow`'s own
  // comment for the full reasoning.
  desktopRow: "no-scrollbar flex w-full gap-6 overflow-x-hidden scroll-smooth px-8 xl:px-[80px]",
  // 469px -- owner correction, 2026-09-01: "you did not use the same
  // component how [it] works from the homepage. Use homepage component
  // size, overall." Was a section-specific 335px (Figma's own literal
  // value, deliberately NOT matched to How It Works) -- now matches
  // `howItWorks.desktopCard` exactly, same reasoning How It Works itself
  // used to widen off its own literal Figma value (reads as the same size
  // as its sibling carousel sections).
  desktopCard: "w-[469px] shrink-0",
  // 469:320 desktop, matching `howItWorks.cardMediaRatio` exactly (see
  // `desktopCard`'s own comment for why). Mobile stays the shared 7:5
  // CardCarousel default, same as How It Works' own mobile cards.
  // xl: -> md: (2026-09-04) -- identical ratio at both tiers, so no
  // separate xl: value needed, same as How It Works' own fix.
  cardMediaRatio: "aspect-[7/5] md:aspect-[469/320]",
  // No title/body overrides here anymore (owner: "use homepage component
  // size") -- both breakpoints now render through CapabilityCard's own
  // plain defaults (`capabilityCard.title`/`capabilityCard.text`), exactly
  // like How It Works. The title/body gap itself (`capabilityCard.body`)
  // is a shared, sitewide value -- see its own comment for the 12px
  // correction.
  // 32px gap from the heading down to the carousel, same as How It Works'
  // own mobile section. pb-[72px] (owner, 2026-09-01: gap down to
  // TrustPoints below should be 72px, was pb-12/48px) -- TrustPoints
  // itself has no top padding of its own on mobile, so this bottom
  // padding is the entire gap between the two sections. pt-[72px] (owner
  // correction, 2026-09-02: "How We Customize from the top space is 72px
  // mobile" -- was pt-12/48px) -- ProductSpecifications above has no
  // bottom padding of its own on mobile, so this top padding is the entire
  // gap from its last row's own divider up to this section's heading,
  // confirmed via getBoundingClientRect() (was 48px before this fix).
  // xl:hidden -> md:hidden (2026-09-04, same review).
  mobileSection: "container-p flex flex-col items-center gap-8 pt-[72px] pb-[72px] md:hidden",
};

/* --- ProductRelatedStyles (PDP) ------------------------------------------ */

// Figma node 634:5070 desktop / 643:2660 mobile, "Browse More", 2026-09-01
// -- identical copy/spacing at both breakpoints; the PDP page itself wraps
// this in `container-p` at both breakpoints for the page-level margin (same
// pattern as ProductInfo), not a class in this recipe.
export const productRelatedStyles = {
  root: "flex w-full flex-col gap-4",
  // border-t + py-8 (32px, owner: "32 px space from the top") is this
  // section's OWN top inset, measured from its own border line down to the
  // heading -- not the gap from the previous sibling (ProductCtas), which
  // the column's own shared `gap-8` already supplies (same "no extra pt of
  // its own" pattern already used by ProductHighlights/ProductOptions/
  // ProductCtas in that same column). Used by the desktop instance (inside
  // the gallery/info row's own text column).
  topRuleDefault: "border-t border-[#e8ecf1] py-8",
  // No divider (owner correction, 2026-09-02: "remove the top separator")
  // -- used by the mobile/tablet instance (below `xl`) placed directly
  // after TrustPoints, which needs a plain section gap, not a divider
  // borrowed from its old position inside the text column.
  //
  // Real mobile: `pt-0` (real bug, found live, owner report: "lot of white
  // space from the top" -- `trustPoints.sidePaddingPdp`'s own `pb-12`
  // already carries TrustPoints' entire bottom gap at real mobile width,
  // so stacking a top padding here on top of it would double up) + `pb-12`
  // (48px, owner, 2026-09-07: "make it 48px from bottom too" -- was the
  // original flat `pb-[72px]`, "72px from the bottom of the section for
  // related styles"). Net real-mobile gap above this instance: TrustPoints'
  // own `pb-12` (48px) + this instance's own `pt-0` = 48px, unchanged by
  // this comment's own history.
  //
  // Tablet (`md:`): this instance now owns a real top gap of its own,
  // `md:pt-12` (48px) -- previously `pt-0` here too, borrowing whatever
  // TrustPoints' own tablet bottom padding happened to be (`md:pb-[72px]`
  // at the time). Owner, 2026-09-07 (a follow-up once TrustPoints' own
  // tablet bottom was set to 0 as part of "follow 120px from top of each
  // section, 0px from the bottom" for Specifications/HOW WE
  // CUSTOMIZE/TrustPoints, which would otherwise have collapsed this gap
  // to 0px): "add 48px top gap for related style and remove any other
  // gaps it has it must be 48px from the top and bottom only" -- so the
  // old `md:pb-[72px]` tablet-only bottom override is dropped entirely;
  // with it gone, the unprefixed `pb-12` (48px, mobile-first) already
  // covers tablet too, giving a clean, self-owned 48px top / 48px bottom
  // at tablet, matching the request exactly rather than keeping the old
  // asymmetric 48px-top/72px-bottom split. This instance's own visibility
  // gate (`xl:hidden`, see `app/activewear/[category]/[style]/page.tsx`'s
  // own comments on both `ProductRelatedStyles` instances) is what makes
  // it the one shown below `xl` at all -- desktop's own sibling instance
  // (`topRuleDefault` above) is untouched by any of this.
  topRuleNone: "pt-0 md:pt-12 pb-12",
  // 20px/24px-line-height medium -- Figma's own real values for this
  // heading, kept as a literal (Tailwind's own `text-xl` default leading
  // is 28px, not this design's 24px).
  heading: "text-xl font-medium leading-6 text-[#21272a]",
  list: "flex w-full flex-wrap gap-3",
  // Pill chip: rounded-full, #f2f4f8 border, white fill, the exact drop
  // shadow Figma specifies (a one-off arbitrary value -- no other chip in
  // this project casts a shadow, so there's no existing token to reuse).
  // hover:text-text (owner, 2026-09-01: "on hover the chips, the font and
  // chevron should get the black primary color") -- text-text is this
  // project's own near-black token; the icon has no colour of its own
  // (see chipIcon) so it inherits this on hover too, no separate rule
  // needed. hover:bg-[#fafafb] (owner, 2026-09-01: "the background white
  // should also slightly change the color, very subtle" -- reverted back
  // to this from a same-day #fff6f3 trial, owner: "change the FFF6F3 back
  // to the one you had before") -- one step off pure white, barely
  // perceptible, not the sitewide #f2f4f8/#f2f2f7 divider greys (those
  // read as a visible fill change, not "very subtle").
  // `group` -- so chipIcon's own `group-hover:translate-x-0.5` (the
  // chevron nudge) can react to hovering this chip.
  chip: "group inline-flex shrink-0 items-center gap-1 rounded-full border border-[#f2f4f8] bg-paper px-5 py-3 text-base leading-5 text-[#3c3c43] shadow-[0px_2px_2px_rgba(39,39,39,0.1)] transition-colors hover:bg-[#fafafb] hover:text-text",
  // No colour of its own -- inherits `currentColor` from `chip`, so it
  // goes black on hover for free along with the label text. `group-hover:
  // translate-x-0.5` (owner, 2026-09-01: "on hover can you move the
  // chevron icon like subtle animation") -- a small 2px nudge in the
  // direction the chevron already points, reading as "forward" rather
  // than a generic wiggle; `chip` carries the `group` class for this.
  chipIcon: "size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5",
};

/* --- Product specifications ----------------------------------------------- */

// The PDP's "Specifications" datasheet (Figma node 634:5092, "Content",
// 2026-09-02) -- standalone, full-width section sitting between
// ProductRelatedStyles (the pill row inside the text column above) and
// ProductCustomizeSteps below, matching the node ID order. Heading + subline
// use the same "H2 section heading, no eyebrow" type scale already
// established sitewide (sectionHeading.heading/trustPoints.subline's own
// literal values) rather than a new size guessed off the screenshot alone --
// no exact Figma metadata was available for this section (Dev Mode MCP
// unreachable this session), so this reuses an existing token instead of
// inventing one, per the sitewide "styling only through tokens/recipes"
// rule. `<dl>` real markup (SEO/AEO pattern already used for FabricOptions'
// own fact table) -- each row is a real label/value pair, not styled divs.
export const productSpecifications = {
  // No section-level `gap` any more (owner correction, 2026-09-02: the
  // mobile image-to-first-row gap needs to be exactly 24px, which the
  // first row's own `py-6` top padding already supplies on its own -- a
  // uniform flex `gap` here would stack an extra gap on top of that,
  // overshooting 24px). `headingBlock`/`image` each carry their own
  // `mb-*` instead, so every sibling pair can have its own real value.
  // pt-[72px] (owner correction, 2026-09-02: "specifications should have
  // 72px gap from the top... we are using 72px gap on mobile after every
  // section" -- this project's standing mobile inter-section gap, same
  // value already used by ProductCustomizeSteps.mobileSection's own pt/pb)
  // -- was pt-8/32px. md:pt-[120px] (owner, 2026-09-07: "follow 120px from
  // top of each section, 0px from the bottom" for this section, HOW WE
  // CUSTOMIZE, and TrustPoints specifically) -- was `xl:pt-[120px]` only
  // (owner, 2026-09-02: desktop top gap to 120px, was xl:pt-[80px]); `md:`
  // already cascades up through `xl:` at the same 120px value, so this is
  // a pure tablet addition, not a desktop change -- the old `xl:` tier is
  // dropped as now-redundant rather than kept alongside an equal `md:` one.
  // Bottom stays 0 at tablet (only `xl:pb-[40px]` adds one, at desktop).
  section: "container-p flex w-full flex-col pt-[72px] md:pt-[120px] xl:pb-[40px]",
  // mb-8 (32px) to whatever comes next (image on mobile, the list on
  // desktop where there's no image) -- unchanged mobile value. xl:mb-12
  // (48px, owner correction, 2026-09-02: "space from the subline ... to
  // style content starts ... should be 72px") -- was xl:gap-12/48px on the
  // old section-level gap, moved here unchanged in value: 48px margin +
  // the first row's own 24px top padding (`row`'s `py-6`) = 72px,
  // confirmed via getBoundingClientRect().
  headingBlock: "flex flex-col gap-3 mb-8 xl:gap-4 xl:mb-12",
  // Reuses sectionHeading's own H2 scale (54px/500 desktop, 30px/460
  // mobile) -- see this recipe's own header comment for why. Threshold
  // moved xl: -> md: (owner, 2026-09-04: same tablet-width treatment as
  // the homepage) -- `text-h1`'s fluid clamp already evaluates well above
  // the 30px mobile value at 768px (confirmed on the homepage pass), safe
  // here too.
  heading: "max-md:text-[1.875rem] max-md:font-[460] max-md:leading-[34px] md:text-h1 text-text",
  // Reuses trustPoints.subline's own literal values verbatim -- same
  // "heading + gray subline sentence" pairing already used directly below
  // this section (TrustPoints). Threshold moved xl: -> md: (2026-09-04).
  subline: "text-[1.125rem] leading-6 font-normal text-subline md:text-[1.375rem] md:leading-8",
  // Mobile only -- the desktop frame has no image in this section. No
  // margin-bottom of its own (owner correction, 2026-09-02: "from top of
  // style and box is 24px" -- the gap from this image's own bottom edge to
  // the first row's "Style" label) -- the first row's own `py-6` top
  // padding (24px) already supplies that gap on its own; an added margin
  // here would double it.
  // xl:hidden -> md:hidden (owner, 2026-09-04: this mobile-only image
  // "does not need an image placeholder... follow the website style" at
  // tablet width -- desktop has no image in this section at all, so
  // tablet should match desktop and show none either, not a resized
  // version of the mobile one).
  image: "block md:hidden mb-0",
  list: "flex w-full flex-col",
  // Every row owns its own trailing divider, including the last (same
  // convention already used by FabricOptions' table rows and
  // ProductHighlights' list -- no special-cased "no border on the last
  // row"). Stacked label-over-value below xl, side-by-side at xl. gap-1.5
  // (6px, owner correction, 2026-09-02: "the space between style and
  // '...(base type)' is 6px, follow it for all") -- was gap-6/24px, a
  // same-day-earlier misread of a different measurement (that 24px turned
  // out to belong to the row's own bottom padding, see py-6 below, not
  // this label-to-value gap). py-6 (24px, owner: "the gap from
  // '...(base type)' to separator is 24px" -- this row's own bottom
  // padding, text to the next divider) was already correct; unchanged.
  row: "flex flex-col gap-1.5 border-b border-[#e8ecf1] py-6 xl:flex-row xl:items-start xl:gap-[42px] xl:py-6",
  // xl:w-[302px]: same literal width already used for this exact "first
  // column, bold label" role in FabricOptions' own table (fabricCellCol),
  // the closest existing analog for a left-hand label column on this page.
  //
  // 24px, auto line-height (owner correction, 2026-09-03: "specification
  // section title are 22px, make them also 24px medium font weight" --
  // was text-[1.375rem]/22px with an explicit leading-[30px]/leading-7).
  // Same size/weight at both breakpoints now, no fixed line-height override.
  label: "text-[1.5rem] font-medium text-text shrink-0 xl:w-[302px]",
  // Desktop 22px/28px, same as label above (owner: same sentence covers
  // both "style, fabric" font size). Mobile 18px/24px (owner: "'High-waisted
  // compression legging (base type)' is 18px by 24" -- text-lg/leading-6) --
  // a real, deliberate size step down from the mobile label's 22px, not a
  // copy-paste of it.
  // Threshold moved max-xl:/xl: -> max-md:/md: (2026-09-04, same review).
  value: "max-md:text-lg max-md:leading-6 md:text-[1.375rem] md:leading-7 font-normal text-text",
};

/* --- ProductCategoryLinks (PDP) ------------------------------------------ */

// Plain crawl-loop links at the foot of every PDP (SEO audit, 2026-09-02,
// rule 6: "at least one crawlable upward link" plus sibling-PDP links) --
// no Figma frame for this, so deliberately plain/undesigned markup using
// only existing tokens, same "lean, undesigned placeholder" approach
// already used for the homepage's own visible intro line. Not a second
// copy of ProductRelatedStyles' own Figma-designed pill row above (see
// that component's own header comment) -- this is a functional crawl link
// list, not a browse-by-attribute design.
export const productCategoryLinks = {
  // `hidden`, every breakpoint (owner, 2026-09-08: "back to all leggings
  // still shows on the frontend, we decided to keep it only on the
  // backend for crawling remove it") -- supersedes the 2026-09-07 pass
  // that hid this on mobile/tablet but still showed it at `xl:` desktop.
  // The link/data still renders into the DOM at every breakpoint (still
  // crawlable, still satisfies this component's own SEO rule-6 purpose
  // above), it just never becomes visible now, at any width.
  root: "container-p hidden flex-col gap-4 border-t border-line py-8",
  backLink: "text-base font-medium text-text underline decoration-solid underline-offset-2 hover:opacity-70",
  siblingsHeading: "text-sm font-medium text-muted",
  siblingsList: "flex flex-wrap gap-x-4 gap-y-2",
  siblingLink: "text-base text-text underline decoration-solid underline-offset-2 hover:opacity-70",
};

/* --- RequestSampleForm (/request-a-sample) --------------------------------- */

// Dark section (bg-ink), the site's chosen direction (owner, 2026-09-10:
// "V2 black design is the final" -- this recipe was the "dark variant"
// built alongside the original light one for a side-by-side comparison at
// /request-a-sample-v2; the light recipe and that draft route are both
// deleted now that a direction is picked, this is the one real page). No
// form component precedent existed anywhere on this site before this
// build (2026-09-10 audit) -- every value below is built fresh from
// existing tokens, not a copy of a component that doesn't exist.
// Filled-input style (static label above the field, not floating):
// simplest to build correctly and accessibly with no existing precedent to
// match. Reference layout: filled light-grey inputs with no visible
// border, a full-width accent-orange pill submit button, outline pill
// chips.
export const requestSampleForm = {
  // Top padding only, -32px total now (owner: "full name field 16px less
  // space from top", then "make it more 16px less" -- was a flat `py-16
  // md:py-20 xl:py-24`, split into pt/pb so only the space above "Full
  // name" shrinks; the bottom padding is unchanged).
  section: "bg-ink pt-8 pb-16 md:pt-12 md:pb-20 xl:pt-16 xl:pb-24",
  inner: "container-p mx-auto flex w-full max-w-[640px] flex-col gap-8",
  form: "flex flex-col items-center gap-8",
  field: "flex w-full max-w-[500px] flex-col items-start gap-2",
  label: "text-lg font-medium text-paper",
  required: "text-[color:var(--color-error)]",
  helpText: "text-sm text-[#838D97]",
  // Filled, borderless (the reference's own light-grey fields on black) --
  // `--color-paper-2` (#f5f4f1, this site's existing light alternating-
  // section tone) doubles as the filled-field colour here rather than a
  // new one invented for this draft.
  input:
    "h-[54px] w-full rounded-[4px] border-0 bg-paper-2 px-4 text-base text-text placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent",
  inputError: "outline outline-2 outline-[color:var(--color-error)]",
  textarea:
    "w-full min-h-32 resize-y rounded-[4px] border-0 bg-paper-2 px-4 py-3 text-base text-text placeholder:text-muted focus-visible:outline-2 focus-visible:outline-accent",
  segmented: "mt-3 flex w-full max-w-[500px] flex-wrap gap-2",
  // border-2 + a stronger literal white (owner, 2026-09-10: "make the
  // chips outline a little prominent" -- was a 1px `border-line-dark`,
  // 12% white, close to invisible against `bg-ink`).
  segmentedOption: "h-[54px] rounded-pill border-2 border-[rgba(255,255,255,0.3)] px-5 text-base font-medium transition-colors",
  segmentedOptionActive: "border-accent bg-accent text-accent-ink",
  segmentedOptionInactive: "text-paper",
  // Same border-2/stronger-white prominence as the chips above ("same for
  // attachment outline"), plus a wider dash pattern -- `border-dashed`'s
  // own dash length/gap scales with border width, so the heavier 2px
  // border alone reads as more spaciously dashed than the old 1px line,
  // without needing a hand-built background-image dash pattern.
  fileDropzone:
    "flex h-32 w-full max-w-[500px] cursor-pointer flex-col items-center justify-center gap-2 rounded-[4px] border-2 border-dashed border-[rgba(255,255,255,0.3)] bg-transparent px-4 text-center text-sm text-[#838D97] transition-colors hover:border-accent",
  fileDropzoneIcon: "size-5 text-[#838D97]",
  fileInputHidden: "sr-only",
  // Attached-file preview (owner, 2026-09-10: "once something is attached,
  // there should be an option to remove that, maybe show a preview of
  // that attached item with a cross icon") -- replaces the dashed
  // dropzone once a file is chosen, matching the site's own other filled-
  // field look (bg-paper-2, no border) rather than staying dashed, which
  // reads as "empty, waiting for a drop" everywhere else this pattern
  // exists. A plain `<div>`, not a `<label>` -- the remove button needs
  // its own independent click target, not one nested inside (and
  // therefore re-triggering) a label wired to reopen the file picker.
  // Round 2 (owner: "attached file design looks very bad... give it a
  // grey background or position it better way") -- the first pass kept
  // the dropzone's own flat 128px height, which left a single line of
  // text floating in a mostly-empty box (the actual bug: "grey
  // background" was already there, `bg-paper-2`, the height/proportions
  // were what read as broken). Now a compact row (natural height, `py-3`)
  // with a real border for definition and an accent-tinted icon badge
  // instead of a bare icon, closer to a standard "attached file" chip.
  filePreview:
    "flex w-full max-w-[500px] items-center justify-between gap-3 rounded-[4px] border border-line bg-paper-2 px-4 py-3",
  filePreviewInfo: "flex min-w-0 items-center gap-3",
  // Accent-tinted badge (10% accent fill, full accent icon) rather than a
  // bare grey paperclip -- reads as "successfully attached," not just a
  // repeated version of the empty dropzone's own icon.
  filePreviewIconWrap: "flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-accent/10 text-accent",
  filePreviewIcon: "size-5",
  filePreviewText: "flex min-w-0 flex-col items-start gap-0.5 text-left",
  filePreviewName: "w-full truncate text-sm font-medium text-text",
  filePreviewSize: "text-xs text-muted",
  // Round hit target well past the visible icon (owner spec: 44px tap
  // target floor applies here too, this being the only way to undo an
  // attachment). This button sits inside `filePreview`, a light
  // `bg-paper-2` box -- a *dark*-tinted hover (this site's existing
  // `border-line` black hairline token), not a white one, which would be
  // invisible against that light fill despite the section itself being
  // dark.
  fileRemoveButton:
    "flex size-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-line hover:text-text",
  errorText: "text-sm text-[color:var(--color-error)]",
  consentRow: "mt-4 flex items-start gap-3",
  consentText: "text-sm text-[#838D97]",
  consentLink: "text-paper underline decoration-solid underline-offset-2 hover:opacity-70",
  submitRow: "flex w-full max-w-[500px] flex-col gap-4",
  // Accent orange (owner correction, 2026-09-10: "make the cta orange" --
  // supersedes the reference's own inverted white-pill button). Same
  // colours/hover as `Button`'s own `primary` variant (`button.primary`),
  // reproduced directly rather than reused through that component -- see
  // this recipe's own file-level comment for why the dark variant renders
  // a plain `<button>` here instead of `<Button>`.
  submitButton:
    "inline-flex h-[54px] w-full items-center justify-center rounded-pill bg-accent px-8 text-button uppercase text-accent-ink transition-[color,background-color,filter] hover:text-[#5E240F] disabled:pointer-events-none disabled:opacity-40",
  formError: "text-sm text-[color:var(--color-error)]",
  // Green circle (owner: "use green instead of orange" -- a real success
  // state reads more clearly in the universal green than the brand's own
  // accent orange, which is otherwise this page's CTA colour), 18px
  // message text (owner: "font size looks bigger," was text-h5/24px).
  // Entrance animation classes (.form-success-icon/.form-success-check/
  // .form-success-message) live in app/globals.css, same "named class the
  // component toggles, keyframes defined once in the stylesheet" pattern
  // .reveal-box/.reveal-word already use.
  successWrap: "flex flex-col items-center gap-4 py-12 text-center",
  successIconWrap: "flex size-16 items-center justify-center rounded-full bg-[#16A34A] text-paper form-success-icon",
  successCheck: "form-success-check",
  successMessage: "text-lg font-medium text-paper form-success-message",
};
