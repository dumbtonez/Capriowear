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
  light: "border-line bg-paper text-ink",
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
  base: "inline-flex min-h-[54px] items-center justify-center rounded-pill px-8 py-2 text-button uppercase transition-colors disabled:pointer-events-none disabled:opacity-40",
  primary: "bg-accent text-accent-ink hover:opacity-90",
  // currentColor, so the same outline reads on light and dark sections without
  // a separate inverse variant.
  secondary: "border border-current bg-transparent text-current hover:bg-current/10",
};

/* --- Eyebrow ------------------------------------------------------------- */

// Figma calls this style "Overline": 20px, 600, no letter spacing. Size is
// split out from the transform so a real per-instance size override (e.g. the
// Hero eyebrow, smaller on its real mobile design) can replace just the size,
// not fight it -- see the `size` prop on Eyebrow.tsx.
export const eyebrow = {
  base: "uppercase",
  size: "text-overline",
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
  // 16px mobile, 24px desktop -- was a flat, unconfirmed gap-3 (12px).
  root: "flex flex-col gap-4 xl:gap-6",
  // Figma "Section Header" pairs Overline with the Heading 1 style, not
  // Heading 2. That is a type style, not a heading level: the element stays an
  // <h2> so the document outline is still correct.
  // Desktop matches text-h1 exactly (54px/500/64px leading). Mobile does not:
  // text-h1's fluid low anchor gets the *size* right (30px) but not the
  // weight or line-height -- Figma's real mobile instance is 460/34px, not
  // the token's 500/~35.6px. Scoped here rather than changing the shared
  // --text-h1 token, since there's no confirmation yet that other text-h1
  // headings share this same mobile discrepancy (worth re-checking if one
  // does). No colour: inherits text-ink or text-paper from the section
  // around it.
  // max-xl:/xl: are mutually exclusive media conditions, not two utilities
  // racing at the same specificity for the same property (the Button/hidden
  // cascade-order bug already burned this project once) -- without max-xl:
  // here, the unprefixed mobile weight/line-height would keep winning at
  // desktop widths too, since xl:text-h1 doesn't automatically "cancel" an
  // unscoped sibling utility touching the same property.
  heading: "max-xl:text-[1.875rem] max-xl:font-[460] max-xl:leading-[34px] xl:text-h1",
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
  body: "flex flex-col gap-2",
  // Figma "Feature Card": Heading 3 title -- confirmed, unchanged.
  title: "text-h3",
  // Corrected 2026-08-25 (Our Services, this component's first real usage):
  // plain near-black text, not `text-muted` -- the real design has no
  // dimming here. 18px/24px leading mobile, 20px/28px leading desktop; the
  // desktop size matches `text-body-lg` but its leading (1.2) doesn't match
  // Figma's real 28px (1.4), so this is explicit values, not the token.
  text: "max-xl:text-[1.125rem] max-xl:leading-[24px] xl:text-[1.25rem] xl:leading-[28px] font-normal",

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
    // Stats' desktop media box, 660x620 (node 387:499) -- close to square but
    // not quite, kept as its own exact reduced fraction rather than rounded
    // to 1:1.
    "33:31": "aspect-[33/31]",
    // Inside the Factory's desktop gallery: two narrow side tiles (195x550,
    // Inside the Factory's desktop gallery card (950x550, node 402:911) --
    // now the uniform size every card in that chevron-driven carousel uses
    // (2026-08-26), after the section moved off its original narrow-wide-
    // narrow static row (which had its own "39:110" side-tile ratio,
    // removed here once nothing referenced it any more).
    "19:11": "aspect-[19/11]",
    // Exhibitions' desktop gallery card, 469x320 (node 455:2381) -- not close
    // to any ratio above, kept as its own exact fraction rather than rounded.
    "469:320": "aspect-[469/320]",
    // ProductCard's tile, 316x400 (node 406:3137) -- reduced to its lowest
    // terms (79:100); close to but not exactly 4:5 (0.8 vs 0.79), kept
    // exact per this table's own established precedent.
    "79:100": "aspect-[79/100]",
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
  toneLight: "border-line bg-paper text-ink",
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
  labelBold: "shrink-0 whitespace-nowrap text-[1.375rem] font-normal leading-[1.2]",
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
  desktopOuter: "hidden bg-ink text-paper xl:block",
  desktopInner: "container-p flex items-start gap-[124px] pt-[120px] pb-[120px]",
  // min-[1920px]: same fix as Our Services' desktopHeadingWidth -- text-h1
  // grows to 65px at 1920+, so the 474px column that wraps to exactly 2
  // lines at 1440 wraps to 3 with no width change. Measured minimum for 2
  // lines at 1920's real font size is 484px; rounded up for a safety margin.
  desktopHeading: "max-w-[474px] min-[1920px]:max-w-[500px] shrink-0 text-h1",
  desktopAccordion: "flex-1",
  // Figma node 438:2192: this frame's own top/bottom padding really is
  // 72/72 (unlike the general pt-0/pb-72 pattern elsewhere on the page).
  mobileSection: "flex flex-col items-center gap-8 bg-ink pt-[72px] pb-[72px] text-paper xl:hidden",
  mobileHeading: "text-center text-[1.875rem] font-[460] leading-[34px]",
  mobileAccordion: "w-full",
};

/* --- Header -------------------------------------------------------------- */

export const header = {
  // transition-transform: the hide/show below is a translateY toggle, not a
  // visibility/display change, so the header keeps its sticky positioning
  // and layout box the whole time -- only its rendered offset moves.
  base: "sticky top-0 z-40 border-b border-line-dark bg-ink text-paper transition-transform duration-300 ease-in-out",
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
  baseStatic: "relative z-40 border-b border-line-dark bg-ink text-paper",
  // Slides the header fully off-screen upward. Applied by Header.tsx while
  // scrolling down past its own measured height (owner request, 2026-08-26:
  // hide on scroll down, reveal on scroll up -- a standard pattern for
  // reclaiming vertical space on long pages without removing the nav
  // entirely). Never applied while a mega menu or the mobile drawer is
  // open, so an open menu can't be yanked off-screen mid-interaction.
  hidden: "-translate-y-full",
  // Mobile-only vertical padding tuned to a 72px total header height
  // (owner call, 2026-08-27, revised up from an earlier 62px) -- the new
  // "Menu" pill (51px tall, its own padding taken verbatim from Figma) is
  // taller than the old icon-only button (44px), so the previously-correct
  // py-4 (32px) started overshooting once the pill replaced it. Desktop
  // keeps py-4: only the mobile trigger changed, so only mobile's total
  // height needed correcting. 72 - 51 (pill) - 1 (border-b) = 20, 10px a
  // side (py-2.5).
  inner: "container-p flex items-center justify-between gap-4 max-xl:py-2.5 xl:py-4",
  // Wraps brand + nav so the 40px gap between them is fixed, not whatever
  // `justify-between` happens to leave free -- with brand/nav/actions as three
  // siblings, `justify-between` distributes the container's leftover space
  // into every gap, so the logo-to-nav space grows with the viewport instead
  // of staying 40px. Grouping them means `justify-between` on `inner` only
  // ever sees two items (this group and `actions`), so it spreads space
  // between those two, leaving the 40px inside the group untouched.
  brandNavGroup: "flex items-center gap-10",
  brand: "flex shrink-0 flex-col gap-0.5",
  // Sized to match the logo's real proportions (137x26). Colour comes from the
  // ambient text-paper on the header, which the SVG's fill="currentColor" picks
  // up -- no separate colour prop on Logo itself.
  brandLogo: "h-6 w-auto",
  // Text fallback, for a page with no logo asset passed. Not used by the real
  // header content, which always passes `logo`.
  brandName: "text-h3 uppercase",
  brandParent: "text-button-sm uppercase text-paper/50",
  // The real nav's intrinsic width (logo + 4 plain links + actions, no mega
  // menu) is ~1117px, which fits inside the standard xl (1280px) breakpoint
  // with room to spare -- see docs/03-component-library.md for the measured
  // numbers. This is the built-in Tailwind breakpoint, not a custom value.
  nav: "hidden xl:block",
  navList: "flex items-center gap-0",
  // Figma's real nav links (node 316:1331): Body style, not bold, not
  // uppercase -- confirmed against the link geometry (48px row, 16px inline
  // padding, 22px line height matches Body's line height exactly).
  // Hover colour corrected 2026-08-27 (owner call): a flat #838d97 text
  // colour, not an opacity fade -- the same literal grey already used
  // elsewhere on dark surfaces (mega panel labels, MobileNav's contact
  // label), so hovering a nav item reads as "the same muted tone", not a
  // dimmed version of white.
  navLink: "inline-flex min-h-11 items-center whitespace-nowrap rounded-pill px-4 text-body text-paper transition-colors hover:text-[#838d97]",
  navTrigger:
    "relative inline-flex min-h-11 items-center gap-1 whitespace-nowrap rounded-pill px-4 text-body text-paper transition-colors hover:text-[#838d97]",
  // Active state (Figma node 493:3140, 2026-08-27) -- semibold text plus a
  // 2px white underline, this request's own explicit spec.
  navTriggerActive: "font-semibold",
  // The label itself is a 2-layer grid stack, not plain text (owner report,
  // 2026-08-27: the trigger visibly shifted position when it turned
  // semibold -- bold glyphs are wider than regular ones at the same size,
  // so the button's own intrinsic width grew and pushed every trigger after
  // it sideways). Both layers occupy the same grid cell; the invisible one
  // is always semibold, so the cell is always sized to the widest (bold)
  // version of the label -- only the *visible* layer's weight actually
  // toggles with `isOpen`, and toggling a weight inside an already-fixed-
  // width cell never reflows anything around it.
  navTriggerLabelStack: "relative isolate inline-grid",
  navTriggerLabelGhost: "invisible col-start-1 row-start-1 font-semibold",
  navTriggerLabelVisible: "col-start-1 row-start-1",
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
  // Sits at the very bottom of the nav row, flush with the header's own
  // bottom border (owner correction, 2026-08-27: an earlier pass put this
  // directly under the trigger text, which read as detached from "the nav")
  // -- `-bottom-[22px]` reaches past the trigger's own small content box
  // down to the header's real bottom edge, live-measured flush with
  // `header.base`'s own border-bottom (a plain `-bottom-4`/16px undershot
  // by 6px against the real 87px header height).
  navUnderline: "absolute inset-x-4 -bottom-[22px] h-[2px] bg-white",
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
  // Own top border + 24px above and below the heading (owner call,
  // 2026-08-27, revised down from an initial 48px/40px pass that still read
  // as "tight against the categories" from the other direction -- too much
  // space above, not enough of a deliberate rhythm) -- `mt-12` still clears
  // the categories themselves before the divider (an addition on top of the
  // real design, see below); `pt-6` (24px) opens the promo up from that
  // line. `gap-3` (12px, corrected 2026-08-27 from an earlier 24px guess),
  // not `gap-6` -- the owner asked for the heading-to-content gap to match
  // Figma's own real value, and node 493:3140's promo content wraps both in
  // one `gap-[12px]` flex column. The divider itself and the 24px above it
  // aren't in that real design at all (an explicit owner addition, "a line
  // where the menu ends" / separating the promo from the categories), so
  // that spacing stays a deliberate one-off, not something to match against
  // Figma.
  // `border-line-dark` again, matching the panel's own top/bottom borders
  // and the header's, so the whole panel reads as one consistently-bordered
  // surface.
  megaPromo: "mt-16 flex flex-col gap-3 border-t border-line-dark pt-10",
  megaPromoHeading: "text-[1.375rem] font-medium text-paper",
  megaPromoRow: "flex items-center gap-10",
  megaPromoText: "text-body-lg text-[#838d97]",
  megaPromoBullet: "flex items-center gap-3 text-body-lg text-[#838d97]",
  megaPromoIcon: "size-3.5 shrink-0",
  // gap-6 -> gap-5 (owner call, 2026-08-28): "Our Factory" -> "Factory
  // Tour" made the nav's longest label one character wider, which pushed
  // this row 4px past the header's own tight 1280px budget (a real
  // overflow, caught live -- same class of bug as the earlier mega-menu
  // chevron overflow, fixed the same way: shave a few px from a low-impact
  // value rather than touch a Figma-confirmed one like navLink's padding).
  actions: "hidden shrink-0 items-center gap-5 xl:flex",
  actionLink: "inline-flex min-h-11 items-center whitespace-nowrap text-button-sm uppercase transition-opacity hover:opacity-70",
  actionButton: "whitespace-nowrap px-6 text-button-sm",
  // Mobile drawer trigger, corrected to Figma's real pill button (node
  // 465:2862/465:2871, "Caprio Website" file, 2026-08-27) -- previously a
  // plain circular icon button (guessed, pre-real-design). border-current so
  // it always matches the header's own ambient colour, not a hardcoded white.
  menuButton:
    "xl:hidden inline-flex items-center gap-[9px] rounded-pill border-[1.5px] border-current px-6 py-3 text-paper",
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
// elsewhere; text-ink, not the literal #000 Figma shows).
export const breadcrumb = {
  // pt-8 (32px, corrected 2026-08-28 from an earlier pt-6/24px) -- the
  // real value confirmed once this component's own real usage context
  // (inside CategoryBanner, Figma node 502:3310) supplied get_metadata.
  nav: "container-p pb-2 pt-8",
  list: "flex flex-wrap items-center gap-2",
  item: "flex items-center gap-2",
  link: "text-[1rem] leading-[18px] text-[#838d97] transition-colors hover:text-ink",
  // hover:text-paper here, not hover:text-ink -- this is the tone="dark"
  // variant (CategoryBanner's own ink background, node 502:3310, revised
  // 2026-08-28): text-ink is near-black, invisible against that surface.
  linkDark: "text-[1rem] leading-[18px] text-[#838d97] transition-colors hover:text-paper",
  current: "text-[1rem] leading-[18px] font-medium text-ink",
  // #abb5c0 -- Figma's own real value for the current-page item on a dark
  // banner (node 502:3310); tone="light"'s text-ink would be invisible on
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
  // by side in the track's own un-widened parent.
  screen: "flex w-1/2 shrink-0 flex-col",
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
  bottomWrap: "mt-[132px] flex flex-col gap-8 pb-10",
  contactGroup: "flex flex-col gap-1",
  contactLabel: "text-[1.125rem] leading-[26px] text-[#838d97]",
  contactEmail: "text-h5 font-medium text-paper underline decoration-solid underline-offset-2",
  // Left-aligned to match the contact block above it, not centred.
  socialRow: "flex items-center justify-start gap-3",
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
  bannerInner: "container-p flex flex-col gap-8 pt-12 pb-12 xl:gap-12 xl:pt-[140px] xl:pb-20",
  // 12px gap mobile, 24px desktop, between the eyebrow and the H1.
  textBlock: "flex flex-col gap-3 xl:gap-6",
  // 832px measured H1 wrap width in Figma is exactly 52rem; unconstrained the
  // H1 would run wider and wrap to fewer lines than the design at xl and up.
  heading: "max-w-[52rem]",
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
  video: "h-[390px] xl:h-[650px]",
  playWrap: "flex flex-col items-center gap-4",
  // 100px in Figma; 96px (size-24) is the nearest token, a 4px rounding.
  // Mobile's 64px lands on the scale exactly.
  playCircle: "inline-flex size-16 items-center justify-center rounded-pill bg-accent text-accent-ink xl:size-24",
  playIcon: "size-6 xl:size-8",
  playLabel: "text-body-lg text-paper",
  // Mobile eyebrow is smaller than the Overline token on its real design --
  // measured at ~16px (19px line box / 1.2 ratio), not Overline's fixed 20px.
  // Overridden here rather than in the shared token, since no other section's
  // mobile eyebrow has been confirmed against Figma yet.
  // max-xl:/xl: are mutually exclusive media conditions -- corrected
  // 2026-08-23 from an unprefixed text-[1rem]/leading-[1.2] plus xl:text-overline.
  // That version had two real bugs, not one: the unprefixed classes could
  // still win the cascade at desktop widths (What We Make's own copy of this
  // exact shape proved it, see whatWeMake below), and it never set
  // font-weight for mobile at all -- text-overline's semibold weight is part
  // of that one token, so overriding just the size silently dropped weight
  // to the browser default (400) on every mobile Hero render, undetected
  // until this fix. font-semibold added explicitly for mobile now.
  eyebrowSize: "max-xl:text-[1rem] max-xl:font-semibold max-xl:leading-[1.2] xl:text-overline",
  // Mobile ticker fallback (Marquee is desktop-only, xl and up -- see Hero.tsx).
  // 48px top and bottom (owner call, 2026-08-24): content inside a coloured,
  // full-bleed background (Hero's bg-ink) always keeps this 48px inset from
  // the box's own edges -- a fixed rule, not the section-to-section gap.
  // The standard 72px gap to whatever comes next lives OUTSIDE this dark
  // box entirely, as a margin on `hero.section`, not as extra padding here
  // (padding here would just make the black box itself taller, not create a
  // real gap -- that was the actual bug, corrected 2026-08-24).
  tickerMobile: "container-p flex flex-col gap-8 pt-12 pb-12 xl:hidden",
  // 20px, 500 medium -- an explicit one-off (not a token; the size doesn't
  // match Body Large's 400 weight or Overline's 600), given directly by the
  // owner 2026-08-24.
  tickerMobileLabel: "text-[1.25rem] font-medium leading-[1.2]",
  tickerMobileList: "flex flex-col gap-3",
  // 30px, 500 medium. The 30/500 pairing matches Heading 3 exactly, but h3 is
  // a *fluid* token (scales with viewport, only reaching 30px at 1440px) --
  // this block only ever renders below xl (1280px), so text-h3 here would
  // actually render ~22px, not the fixed 30px asked for. A raw fixed value,
  // not the token, is correct precisely because this usage needs a flat size
  // a fluid token can't give it. Weight is 400 regular, not 500 medium --
  // corrected 2026-08-24, a second correction on this same line (previously
  // 24px/500 as a box-height guess, then wrongly given as 500 alongside the
  // real 30px size).
  // Colour corrected 2026-08-24 (owner call): #838D97 flat, not text-paper/70
  // (an opacity-based grey that shifts with whatever's behind it). No
  // existing colour token matches this hex, so it's a one-off arbitrary
  // value scoped to this line, not a new sitewide token.
  tickerMobileItem: "text-[1.875rem] font-normal leading-[1.2] text-[#838D97]",
};

/* --- ClientLogos (homepage section 4) -------------------------------------- */
// Figma: desktop node 341:1732, mobile node 343:1840. Genuinely different
// treatments, not one responsive layout: desktop is a horizontal Marquee (72px
// gaps, full colour, no label); mobile is a static 2-column, 4-row grid (also
// full colour, also no label). Light section (paper background) -- the only
// homepage section built so far that isn't on ink.
export const clientLogos = {
  // 120px top / 0px bottom on desktop, 40px both on mobile -- both given
  // directly by the owner (2026-08-24) after the desktop Figma frame had been
  // resized to show off-screen logos, which made its own height untrustworthy
  // for padding purposes even though its width (used for the logo positions
  // and gaps) still was reliable.
  //
  // No container-p here: Marquee's own `innerStacked` already applies it to
  // the label/track, same as the offerings ticker. Adding it again on this
  // wrapper double-padded the ticker to 160px on each side instead of the
  // real 80px -- corrected 2026-08-24.
  desktopWrap: "hidden pt-[120px] pb-0 xl:block",
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
  mobileWrap: "container-p flex flex-col items-center gap-8 pt-[40px] pb-[40px] xl:hidden",
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
  // (standard rhythm), 84px media-to-text gap -- confirmed off-scale via
  // get_design_context, kept as its own exact value rather than rounded to
  // an existing spacing token.
  desktopWrap: "container-p hidden py-[120px] xl:flex xl:items-center xl:gap-[84px]",
  // Fixed 400px box, not a proportional half -- Figma's real desktop layout
  // keeps the media box a constant width while the text side grows to fill
  // whatever space is left (confirmed via get_metadata: media 400px, text
  // 796px, inside a 1280px content area).
  desktopMedia: "xl:w-[400px] xl:shrink-0",
  // Two side-by-side sub-columns (Product Development + Low MOQ on the left,
  // Private Label + Worldwide Shipping on the right) -- confirmed via
  // metadata, not a single 4-item grid, so the DOM keeps that same
  // column-major structure rather than a grid relying on a reordering trick.
  desktopText: "flex flex-1 gap-20",
  desktopColumn: "flex flex-1 flex-col gap-10",
  // 8px title-to-body gap, shared with the mobile item shapes below.
  item: "flex flex-col gap-2",
  title: "text-h3",
  // 20px/400/28px line-height -- a one-off, not the Body Large token (which
  // is 20px/400 but a 24px line-height). Confirmed via get_design_context.
  body: "text-[1.25rem] font-normal leading-[1.4]",
  // font-semibold next to the body's own 400 weight is deliberate emphasis
  // within the style (see the note at the top of this file), matching two of
  // the four items' real Figma bold spans (Low MOQ, Private Label).
  bold: "font-semibold",

  // Mobile only, hidden at and above xl. 0px top (owner call, 2026-08-23):
  // the artwork sits flush against whatever comes before it -- this turned
  // out to be the first instance of what's now the standard mobile
  // section-to-section pattern (0 top, gap contributed entirely by bottom
  // padding). Bottom corrected 2026-08-24 from pb-section (64px) to the
  // standard 72px. 24px gap between the artwork and the item list.
  mobileWrap: "container-p flex flex-col gap-6 pt-0 pb-[72px] xl:hidden",
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
  // 22px line-height). Confirmed via get_design_context.
  mobileBody: "text-[1.125rem] font-normal leading-[1.3333]",
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
  // 16px mobile / 20px desktop -- the same one-off already established for
  // Hero's own mobile eyebrow (hero.eyebrowSize), confirmed here too rather
  // than assumed: this is the first other section to actually use
  // SectionHeading with a real mobile Figma frame behind it. max-xl:/xl: are
  // mutually exclusive media conditions, not two same-specificity utilities
  // racing for the same property -- see the note on sectionHeading.heading.
  // font-semibold set explicitly for mobile: overriding text-overline's size
  // alone silently drops its paired 600 weight too (caught here and fixed
  // retroactively in hero.eyebrowSize, which had carried the same bug
  // unnoticed since Hero shipped).
  eyebrowSize: "max-xl:text-[1rem] max-xl:font-semibold max-xl:leading-[1.2] xl:text-overline",
  // SectionHeading to the groups list.
  root: "flex flex-col gap-12 xl:gap-[90px]",
  // Gap *between* category groups (owner call, 2026-08-23, revised down the
  // same day from an initial 100px/180px correction): 64px mobile, 120px
  // desktop. Only applies when there's more than one group -- see
  // WhatWeMake.tsx.
  groupsGap: "flex flex-col gap-16 xl:gap-[120px]",
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
  groupTitle: "max-xl:text-[1.875rem] max-xl:leading-normal font-medium xl:text-[2.25rem] xl:leading-normal",
  // 20px/400/28px-leading desktop -- the same one-off already established for
  // Trust Signals' desktop body (trustSignals.body). 18px/400/24px-leading
  // mobile -- the same one-off already established for Trust Signals' mobile
  // body (trustSignals.mobileBody). Kept as its own copy here rather than
  // cross-importing, matching how each section recipe stays self-contained.
  // xl:max-w-[620px]: Figma's real desktop body column is 620px wide, not the
  // full group-header width -- without this it was unconstrained and wrapped
  // to fewer lines than the design (owner correction, 2026-08-23: should
  // wrap to 2 lines, matching Figma's own 620px-wide, 2-line text box).
  groupBody: "max-xl:text-[1.125rem] max-xl:leading-[1.3333] font-normal xl:text-[1.25rem] xl:leading-[1.4] xl:max-w-[620px]",
  // font-semibold next to the body's own 400 weight is deliberate emphasis
  // within the style, the same convention as Trust Signals and the offerings
  // ticker label.
  bold: "font-semibold",
  // Desktop: 4-column grid, 16px column gap, 48px row gap -- reuses Card
  // (components/Card.tsx) directly, since the real spec is an exact match
  // for Card's category variant once its own gap was corrected (see `card`
  // above).
  desktopGrid: "grid grid-cols-4 gap-x-4 gap-y-12",
  // Mobile: a single stacked column, not a grid -- each tile is a landscape
  // (16:11) image, unlike desktop's square, and the label is left-aligned,
  // not centred (confirmed via get_design_context: desktop's tile label
  // explicitly carries text-center, mobile's does not) -- different enough
  // from Card's contract that mobile uses its own bespoke markup instead of
  // reusing Card, the same reasoning Trust Signals and Client Logos already
  // used for their own mobile treatments.
  mobileList: "flex flex-col gap-10",
  mobileTile: "flex flex-col gap-4",
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
  desktopSection: "container-p hidden pt-[120px] pb-[120px] xl:block",
  // Mobile top/bottom corrected 2026-08-24 to the standard mobile
  // section-to-section pattern: 0 top, 72px bottom -- supersedes the 80px
  // top set earlier the same day, now that a sitewide standard exists (see
  // clientLogos.mobileWrap for the full reasoning).
  mobileSection: "container-p pt-0 pb-[72px] xl:hidden",
  // 72px gap from the heading down to the logo row on desktop -- off-scale,
  // kept exact. Mobile is a genuinely different, smaller gap (32px, owner
  // call, 2026-08-24) -- not the same value reused, so this is two separate
  // classes rather than one shared root with a responsive gap override.
  root: "flex flex-col items-center gap-[72px]",
  rootMobile: "flex flex-col items-center gap-8",
  // 812px -- this section's real desktop heading column width (node
  // 369:267), confirmed to wrap the real copy to exactly 2 lines (height
  // 128px = 2 x the 64px line-height). Unconstrained, it ran the full
  // container width and wrapped to 1 line instead. Passed to
  // SectionHeading's `headingClassName`, desktop instance only -- mobile's
  // own w-full column already wraps correctly without it.
  headingNarrow: "max-w-[812px]",
  // 16px mobile eyebrow, the same one-off value already confirmed for Hero
  // and What We Make. No max-xl:/xl: split needed here (unlike those two):
  // this section renders two fully separate SectionHeading instances, one
  // per breakpoint wrapper, not one shared instance spanning both, so this
  // value is only ever active inside the mobile-only wrapper already.
  eyebrowSizeMobile: "text-[1rem] font-semibold leading-[1.2]",
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
  // 120px top/bottom, confirmed from the frame's own geometry (unlike the
  // unreliable frame-crop reading that bit What We Make and Certified &
  // Compliant -- here the image height plus symmetric 120px margins account
  // for the whole frame height exactly).
  desktopSection: "container-p pt-[120px] pb-[120px]",
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
  // mx-auto + w-fit: the whole media+text group (1090px) is centred within
  // the standard 1280px content area, not flush against its left edge with
  // the text column stretching to fill whatever's left -- confirmed via
  // get_metadata (95px margin on both sides beyond container-p's own 80px
  // padding, symmetric). 130px gap between media and text -- corrected
  // 2026-08-24 from an incorrect 84px (this section's own confirmed value,
  // not Trust Signals' unrelated 84px gap it had been mistakenly copied
  // from).
  desktopInner: "mx-auto flex w-fit items-center gap-[130px]",
  desktopMedia: "w-[660px] shrink-0",
  // 300px fixed, not flex-1 -- corrected 2026-08-24: Figma's real text
  // column is a fixed 300px width (confirmed via get_metadata), not
  // however much space happens to be left after the media block, which had
  // been stretching the caption text far wider than the real design.
  // 48px gap between stats, no divider -- confirmed via get_design_context
  // (no border classes on any desktop stat node).
  desktopList: "flex w-[300px] shrink-0 flex-col gap-12",
  // 8px value-to-caption gap, shared with mobile.
  item: "flex flex-col gap-2",
  // 54px/400 (regular)/64px leading -- the size matches text-h1 exactly but
  // the weight doesn't (h1 is 500), so this is its own one-off, not a reused
  // token.
  value: "text-[3.375rem] font-normal leading-[64px]",
  // 20px/400/28px leading, #838d97 -- the same muted-on-dark colour already
  // confirmed independently for Hero's mobile ticker items, now a second
  // real confirmation of the same hex, not a coincidence.
  caption: "text-[1.25rem] font-normal leading-[28px] text-[#838D97]",
  mobileMedia: "w-full",
  mobileList: "flex flex-col",
  // Divided list: every item but the last gets a bottom border + 24px
  // vertical padding; the last item gets top padding only, no border --
  // same pattern already established in trustSignals/whatWeMake's own
  // divided lists. #2a2e33 is close to border-line-dark but not identical,
  // so it's kept as its own confirmed value rather than reused.
  mobileItem: "flex flex-col gap-2 border-b border-[#2a2e33] py-6",
  mobileItemLast: "flex flex-col gap-2 pt-6",
  // 30px/500 (medium)/normal leading -- owner call, 2026-08-24, sized up
  // from the Figma-confirmed 24px (text-h5 exact match). Kept the medium
  // weight and normal leading from that match, size only.
  mobileValue: "text-[1.875rem] font-medium leading-normal",
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
  desktopOuter: "hidden bg-ink text-paper xl:block",
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
  desktopScrollerWrap: "relative w-full cursor-none overflow-hidden",
  // snap-center (not How It Works' snap-start) -- the point here is the
  // active card centers in the viewport, not aligns to an edge. Padding is
  // calculated (half the card width, 475px) so the first/last card can
  // still reach true center regardless of viewport width; scroll-pl/pr
  // mirror it so scroll-snap's own snap-point maths treats that padding as
  // safe space (the same class of bug already fixed once on How It Works).
  desktopRow:
    "no-scrollbar flex w-full snap-x snap-mandatory items-center gap-12 overflow-x-auto scroll-smooth px-[calc(50%-475px)] scroll-pl-[calc(50%-475px)] scroll-pr-[calc(50%-475px)]",
  desktopCard: "w-[950px] shrink-0 snap-center",
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
  mobileSection: "bg-ink text-paper pt-12 pb-12 xl:hidden",
  // container-p only on the heading, not the gallery below -- the gallery
  // is full-bleed edge to edge (confirmed via get_metadata: no side inset
  // at all), unlike every other section's mobile content. Eyebrow is now
  // centred (owner correction, 2026-08-24) via SectionHeading's align
  // prop, and 16px/600 leading matches this section's confirmed mobile
  // size.
  mobileHeadingWrap: "container-p",
  mobileEyebrowSize: "text-[1rem] font-semibold leading-[1.2]",
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
  // Fixed height at the active card's own size (340px) -- without this the
  // track's height is intrinsic (sized to its tallest child), so every
  // scroll-frame height write to a card also changes the track's own box,
  // which reflows the whole section and reads as the entire background
  // shifting while the user swipes. Pinning it here means cards only ever
  // grow/shrink inside a box that itself never moves.
  mobileTrack:
    "no-scrollbar flex h-[340px] items-center snap-x snap-mandatory overflow-x-auto px-[min(40px,calc((100%-300px)/2))]",
  mobileCard: "w-[300px] shrink-0 snap-center",
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
  desktopOuter: "hidden bg-ink text-paper xl:block",
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
  desktopSection: "pt-[60px]",
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
  desktopCtaBlock: "container-p flex flex-col items-center gap-12",
  // Fixed min-width (owner call, 2026-08-27) so the button reads the same
  // size regardless of label length -- "Request a Sample" (this section's
  // original label) measures ~237px; "Let's Talk" (the second, closing CTA's
  // own label) would otherwise render notably narrower and read as
  // inconsistent between the two CTA bands on the same page.
  desktopButton: "min-w-[240px] justify-center",
  desktopHeadingWrap: "flex flex-col items-center gap-4 text-center",
  desktopHeading: "text-h1",
  // 18px (owner correction 2026-08-30: "cta subline font size should be
  // 18px as other places") -- leading-6 (24px) matches the pairing this
  // exact size already uses everywhere else on the site (WhatWeCover/
  // TrustPoints' own mobile subline and itemBody, etc.), not a new ratio.
  desktopSubline: "max-w-[623px] text-[1.125rem] font-normal leading-6 text-[#838D97]",

  // Inside the Factory (also dark) precedes it directly, so still no
  // margin here (that would show as a page-background seam between two
  // black boxes) -- but the owner asked for real breathing room between
  // the two sections' content specifically at this boundary (2026-08-25),
  // overriding Figma's own raw pt-0 read. 72px padding-top keeps both
  // sections' boxes flush black while giving the content itself the
  // standard mobile section-to-section rhythm.
  mobileOuter: "bg-ink text-paper xl:hidden",
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
  mobileHeadingWrap: "flex flex-col items-center gap-3 text-center",
  mobileHeading: "text-[2.25rem] font-medium leading-[2.5rem]",
  // 18px (owner correction 2026-08-30: "cta subline font size should be
  // 18px as other places") -- back to the same size/leading-6 pairing this
  // subline used before the 2026-08-28 bump to 24px, and the same pairing
  // this size already uses everywhere else on the site.
  mobileSubline: "text-[1.125rem] font-normal leading-6 text-[#838D97]",
  mobileButton: "w-[320px] max-w-full justify-center",
};

/* --- OurServices (homepage section 11) -------------------------------- */
// Figma: desktop node 415:5449, mobile node 415:5484. A light section --
// no bg-ink split needed, the page's own default background already works.
export const ourServices = {
  desktopSection: "container-p hidden gap-[221px] pt-[120px] pb-[120px] xl:flex xl:items-start",
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
  desktopList: "flex flex-1 flex-col gap-[60px]",
  desktopCardWidth: "w-[480px]",
  // 8:5 desktop (480x300), 7:5 mobile (280x200) -- neither matches
  // CapabilityCard's own aspect-video (16:9) default, confirmed via
  // get_design_context, not a guess.
  cardMediaRatio: "aspect-[7/5] xl:aspect-[8/5]",

  mobileSection: "container-p flex flex-col items-center gap-8 pt-12 pb-12 xl:hidden",
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
  dotsRow: "flex items-center gap-1.5",
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
    "pointer-events-none absolute top-0 left-0 z-10 flex size-20 items-center justify-center rounded-full bg-paper text-ink opacity-0 shadow-card transition-opacity duration-200 ease-out",
  icon: "size-10",
};

/* --- HowItWorks (homepage section 12) --------------------------------- */
// Figma: desktop node 430:1929, mobile node 430:1961. Mobile is treated the
// same as Our Services (owner call, 2026-08-25): the shared `CardCarousel`,
// not a bespoke layout.
export const howItWorks = {
  desktopOuter: "hidden xl:flex xl:flex-col xl:items-center xl:gap-[72px] pt-[60px] pb-[120px]",
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
  desktopScrollerWrap: "relative w-full cursor-none overflow-hidden",
  // scroll-pl/pr match the visual px-[80px] inset -- without them,
  // scroll-snap's own snap-point maths (each card's snap-start) doesn't
  // know the padding is "safe" space, so the browser auto-corrects the
  // rest scroll position to consume it, collapsing the intended 80px gap
  // before the first card to 0 (a real bug, found and fixed 2026-08-25).
  desktopRow:
    "no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[80px] scroll-pl-[80px] scroll-pr-[80px]",
  // Widened from the Figma-confirmed 335px to match Exhibitions' own
  // desktop card width exactly (owner call, 2026-08-27: both sections'
  // media containers, and the space between them, should read as the same
  // size) -- a deliberate departure from the literal Figma frame's own
  // number, not a correction to it. Card gap (24px, `desktopRow`'s
  // `gap-6`) already matched Exhibitions before this change.
  desktopCard: "w-[469px] shrink-0 snap-start",
  // 469:320 desktop -- Exhibitions' own confirmed ratio, matched here for
  // the same reason as the width above (was 67:44/335x220). Mobile stays
  // 7:5 (280x200): mobile cards go through the shared CardCarousel at its
  // own fixed 280px width, unrelated to this section-specific widening.
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
  mobileSection: "container-p flex flex-col items-center gap-8 pt-12 pb-12 xl:hidden",
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
  desktopScrollerWrap: "relative w-full cursor-none overflow-hidden",
  desktopRow:
    "no-scrollbar flex w-full snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[80px] scroll-pl-[80px] scroll-pr-[80px]",
  desktopCard: "w-[469px] shrink-0 snap-start",
  // The floating chevron is the shared `chevronScroller` recipe -- see the
  // note on `howItWorks` above.

  // Mobile: bg-ink lives directly on this element (no separate outer/inner
  // split needed -- nothing here is full-bleed the way the desktop gallery
  // is, container-p covers both the heading and the carousel's own centring
  // padding).
  mobileSection: "bg-ink text-paper pt-12 pb-12 xl:hidden",
  mobileHeadingWrap: "container-p",
  mobileEyebrowSize: "text-[1rem] font-semibold leading-[1.2]",
  mobileGalleryGap: "mt-8",
  // Inside the Factory's exact carousel numbers, reused verbatim per the
  // owner's explicit instruction -- see components/sections/Exhibitions.tsx.
  mobileTrack:
    "no-scrollbar flex h-[340px] items-center snap-x snap-mandatory overflow-x-auto px-[min(40px,calc((100%-300px)/2))]",
  mobileCard: "w-[300px] shrink-0 snap-center",
};

/* --- Footer (homepage section 15) ----------------------------------------- */
// Figma desktop node 461:2650 (1440x720), mobile node 461:2715 (360x776).
// Genuinely different layouts per breakpoint, not one responsive reflow --
// desktop is a multi-row grid (brand/social, description/nav columns,
// contact/address), mobile is one flat vertical stack (every block, gap-24,
// in reading order) with 3 explicit dividers instead of desktop's single
// one. `root` carries the whole "reveal" transition: `sticky bottom-0` on
// the footer's own root -- confirmed in isolation (2026-08-26) that this
// keeps the box pinned to the viewport's bottom edge for the WHOLE scroll
// range, not just near the page's end (the mistaken assumption this was
// first built under, since that's how afternow.co/services/ reads
// visually). The actual "reveal" comes entirely from stacking order, not
// scroll timing: `z-0` here loses to `<main>`'s own `relative z-10` (set
// in app/page.tsx) wherever they overlap on screen, so every section's own
// opaque background keeps covering this box during normal scrolling --
// it only becomes visible once main's real content has scrolled past that
// screen position. Applies at both breakpoints (the mechanism itself isn't
// breakpoint-specific).
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
  root: "sticky bottom-0 z-0 bg-paper text-ink",

  /* Desktop */
  desktopOuter: "hidden xl:block",
  desktopInner: "container-p pb-8 pt-14",
  // Row 1: brand + tagline (left), social icons (right) -- vertically
  // centred as a row (confirmed via get_metadata: the 60px social buttons
  // sit 15px down inside the row's own 90px height, i.e. dead centre, not
  // top-aligned).
  desktopRow1: "flex items-center justify-between",
  desktopBrandGroup: "flex flex-col items-start gap-3",
  desktopBrandLogo: "h-[55px] w-auto",
  desktopTagline: "text-[1.25rem] font-normal text-ink",
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
  // Nav's column 1 is a fixed 182px (Figma's own real value -- it's what
  // pushes column 2 to its confirmed x-offset, not a gap utility), column
  // 2 is auto-width and nowrap.
  desktopRow2: "mt-[72px] flex items-start gap-[78px]",
  desktopDescription: "max-w-[307px] text-[1.25rem] leading-[1.4] text-ink",
  desktopNavGroup: "flex items-start",
  desktopNavColumnOne: "flex w-[182px] flex-col",
  desktopNavColumnTwo: "flex flex-col whitespace-nowrap",
  desktopNavLink: "text-[1.25rem] leading-[36px] text-ink transition-opacity hover:opacity-70",
  // Row 3: contact CTA (left) + address/copyright (right), bottom-aligned --
  // confirmed via get_metadata: both blocks share the same bottom edge
  // despite starting at different top offsets, so this is items-end, not
  // items-start like row2. Still a full-width `justify-between` split
  // (contact flush left at container's own left edge, address flush right
  // at container's own right edge -- 940 + 420 = 1360, the container's
  // real right edge), unlike row2 above. 296px is Figma's own real gap
  // between row2's lowest content (the 3-line nav column) and this row's
  // top, updated 2026-08-27 alongside the owner's content-arrangement pass
  // (was 194px) -- kept as the exact one-off value rather than a rounded
  // token, the same way other sections keep an odd confirmed Figma number
  // (e.g. Final CTA's 110px marquee margin).
  desktopRow3: "mt-[296px] flex items-end justify-between",
  desktopContactGroup: "flex flex-col items-start gap-[5px]",
  // #17191e is Figma's own confirmed literal for this line, updated
  // 2026-08-27 from the original build's #3c3c43 (a genuine colour change,
  // not a correction) -- distinct from the project's --color-ink token
  // (#0e0e12), kept as-is per the "typography/colour values copied exactly
  // where Figma gives a real one" rule, not swapped for the nearest
  // existing token.
  // 22px (owner request, 2026-08-30: "make the fint 22px get in touch") --
  // was 30px, matching the email line below it; the "Get in touch" label
  // is now deliberately smaller than its own email.
  desktopContactLabel: "text-[1.375rem] font-normal text-[#17191e]",
  desktopContactEmail: "text-[1.875rem] font-medium text-ink transition-opacity hover:opacity-70",
  // Was a vertical stack (flex-col); changed to side-by-side columns
  // 2026-08-27 alongside the owner's content-arrangement pass -- Figma's
  // real gap between the two 194px-wide lines is 32px.
  desktopAddressGroup: "flex items-start gap-8",
  desktopAddressLine: "w-[194px] text-[1.25rem] leading-[1.4] text-ink",
  // Owner narrowed just this second line's own container (194px -> 174px,
  // 2026-08-27) -- the row itself still ends flush at the container's real
  // right edge (960 + 400 = 1360), so this is a width-only change, not a
  // position one.
  desktopAddressLineNarrow: "w-[174px] text-[1.25rem] leading-[1.4] text-ink",

  /* Mobile: one flat column, gap-24 between every block, matching
     container-p's own 20px mobile side inset exactly (confirmed via
     get_metadata: the frame's own real inset is 20px, not a coincidence). */
  mobileOuter: "container-p flex flex-col items-start gap-6 pb-6 pt-10 xl:hidden",
  mobileBrandGroup: "flex flex-col items-start gap-3",
  mobileBrandLogo: "h-[37px] w-auto",
  mobileTagline: "text-[1.125rem] font-normal text-ink",
  mobileEmail: "text-[1.5rem] font-medium text-ink",
  mobileDivider: "w-full border-t border-line",
  mobileDescription: "text-[1.125rem] leading-[1.33] text-ink",
  mobileNavList: "flex flex-col",
  mobileNavLink: "text-[1.125rem] leading-10 text-ink transition-opacity hover:opacity-70",
  mobileAddressGroup: "flex flex-col items-start gap-4",
  mobileAddressLine: "text-[1.125rem] leading-[1.33] text-ink",
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
    "flex size-[60px] items-center justify-center rounded-[14px] bg-[#f1f1f1] text-ink transition-colors hover:bg-accent hover:text-accent-ink",
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
  section: "relative bg-ink max-xl:h-auto max-xl:pb-10 max-xl:pt-2 xl:h-[340px]",
  breadcrumbWrap: "max-xl:static xl:absolute xl:inset-x-0 xl:top-0",
  contentWrap:
    "max-xl:static xl:absolute xl:inset-x-0 xl:top-[calc(50%+68px)] xl:-translate-y-1/2",
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
  // max-xl:text-[1.875rem]/leading-[34px] (30px/34px, mobile Figma frame
  // 587:6985): no responsive scale existed before this section had a mobile
  // frame to read -- the 54px/64px xl size was rendering unconditionally,
  // real overflow risk on a 360px viewport. xl keeps the original size.
  h1: "text-[1.875rem] leading-[34px] font-normal text-paper xl:text-[3.375rem] xl:leading-[64px] xl:whitespace-nowrap",
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
  header: "flex items-center justify-start border-b border-[#e8ecf1] pb-6 pl-4 text-[1.375rem] font-medium leading-[26px] text-ink",
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
  groupHeaderExpanded: "flex w-full items-center justify-between px-4 pt-6 text-left text-[1.125rem] leading-5 font-semibold text-ink",
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
  fab: "fixed inset-x-0 bottom-6 z-40 mx-auto flex w-fit items-center gap-2 rounded-full border border-[#e8ecf1] bg-paper px-6 py-3 text-ink shadow-card xl:hidden",
  fabIcon: "size-4 shrink-0",
  fabLabel: "text-[1rem] leading-5 font-medium",
  // Bottom sheet, not MobileNav's full-screen takeover (owner reference,
  // 2026-08-30: a partial-height sheet with a drag handle and a dimmed but
  // still-visible backdrop, not an opaque full-screen swap) -- portalled to
  // document.body, same reasoning as MobileNav's own `drawer.panel`.
  // bg-paper/text-ink here instead of that component's bg-ink, since this
  // panel shows the same light-theme filter list the desktop sidebar
  // already does, not the site nav.
  drawerBackdrop: "fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 ease-in-out",
  drawerBackdropOpen: "opacity-100",
  drawerBackdropClosed: "pointer-events-none opacity-0",
  // Square top corners (owner correction, 2026-08-30: was `rounded-t-2xl`)
  // -- no rounding on this sheet at all now, matching the rest of this
  // component's own `rounded-none` sitewide convention.
  drawerPanel: "fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col overflow-hidden bg-paper text-ink transition-transform duration-300 ease-in-out",
  drawerRevealOpen: "translate-y-0",
  drawerRevealClosed: "translate-y-full",
  // Decorative drag-handle bar (Babyshop reference) -- purely visual, no
  // drag gesture wired to it; tap-outside/Escape/the close button are the
  // real ways to dismiss, same as this project's other overlays.
  drawerHandle: "mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-[#e8ecf1]",
  drawerHead: "container-p flex shrink-0 items-center justify-between border-b border-[#e8ecf1] py-6",
  drawerHeading: "text-[1.375rem] font-medium leading-[26px] text-ink",
  drawerClose: "flex items-center gap-2 text-ink",
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
  title: "max-xl:text-[1.5rem] max-xl:leading-[28px] xl:text-[1.875rem] font-medium text-ink",
  // Colour corrected to text-ink (owner call, 2026-08-28, "layout changes
  // to the heading"): the updated Figma frame renders this line in the
  // same near-black as the title, not the muted #3c3c43 grey the first
  // build guessed.
  // 18px/24px-line-height at mobile (node 590:1173: text-[18px] leading-
  // [24px]) -- was the desktop 20px size unconditionally; xl keeps that
  // confirmed desktop value.
  subline: "max-xl:text-[1.125rem] max-xl:leading-6 xl:text-[1.25rem] font-normal text-ink",
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
  text: "flex flex-col gap-2",
  // 1 line, not the 2-line height reservation tried earlier the same day
  // (owner: "keep the product title to 1 line" -- reverses the `min-h`
  // reservation added for "title should have 2 lines as in the mobile
  // design"; the owner's follow-up correction wins). `truncate` caps a
  // longer future title to one line with an ellipsis instead of wrapping.
  // Font size/weight (14px/medium) already matched Figma exactly.
  title: "max-xl:truncate max-xl:text-[0.875rem] xl:text-[1.125rem] font-medium text-[#21272a]",
  subline: "truncate max-xl:text-[0.75rem] xl:text-[1rem] text-[#727272]",
  // 220px fixed image height at mobile (node 590:1173: 156x220 tiles) --
  // passed as an extra className on MediaPlaceholder alongside its own
  // `ratio="79:100"` aspect class: an explicit height wins over
  // aspect-ratio wherever both are set (aspect-ratio only fills in a
  // dimension left otherwise undefined), so this overrides cleanly below
  // xl and leaves the existing 79:100 desktop ratio untouched at xl,
  // where no height override applies.
  image: "max-xl:h-[220px]",
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
  cell: "flex max-xl:size-[40px] xl:size-[48px] items-center justify-center rounded-none bg-[#fafafa] text-[0.875rem] font-medium text-ink",
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
    "flex max-xl:h-[40px] xl:h-[48px] items-center gap-1.5 max-xl:w-fit whitespace-nowrap rounded-none bg-[#fafafa] px-5 text-[0.875rem] text-[#838d97] disabled:cursor-not-allowed disabled:opacity-60",
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
  // "make [WhatWeCover] 1st and [this] as 3rd"). xl:pt-[52px] (new, pairs
  // with TrustPoints' own pb-[52px] above it -- 52+52=104, the same gap
  // value every boundary between these 3 sections nets) and xl:pb-[120px]
  // (was 52px when this was the middle section -- now this is page-end
  // spacing, same role WhatWeCover's own pb used to carry when it was last).
  section: "mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-8 xl:px-[138px] xl:pt-[52px] xl:pb-[120px]",
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
  headingBlock: "mx-auto flex w-full max-w-[579px] flex-col items-center gap-4 text-center xl:max-w-[750px] xl:gap-6",
  // max-xl:text-base (16px, mobile Figma, matching whatWeCover.eyebrow's
  // exact pattern). xl keeps the original 20px.
  eyebrow: "text-base font-semibold text-ink xl:text-[1.25rem]",
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
  heading: "text-[1.875rem] leading-[34px] font-normal text-ink xl:text-[3.375rem] xl:leading-[64px] xl:font-medium",
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
  colHeader: "text-[1.875rem] font-medium text-ink",
  // font-semibold (owner request, 2026-08-30: "make the fabric coloum
  // content semibold") -- was font-medium.
  fabricCell: "text-[1.375rem] font-semibold leading-7 text-ink",
  // font-normal, explicit (owner request, 2026-08-30: "make these regular
  // font" -- Gym/yoga/etc "Best For" and "Soft hand/etc" Performance cells)
  // -- was already regular by omission, written out now so it can't be
  // mistaken for an oversight.
  bodyCell: "text-[1.375rem] font-normal leading-7 text-ink",
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
  fabricCellCol: "w-full text-[1.375rem] font-semibold leading-7 text-ink xl:w-[302px]",
  bodyCellCol: "w-full text-[1.375rem] font-normal leading-7 text-ink xl:w-[293px]",
  // max-xl:mt-8/max-w-[320px] (mobile Figma node 590:1488: 32px gap under
  // the accordion stack, 320px note width). xl keeps the original 48px
  // gap/570px width.
  // text-[1.125rem]/leading-6 (18px) mobile -> xl:text-[1.25rem]/xl:leading-7
  // (20px) desktop -- same responsive split already established for this
  // page's other body copy (e.g. whatWeCover.itemBody), not a size unique
  // to this note (owner report, 2026-08-30: "font for this should be
  // 18px... follow the same as in other sections" -- was a flat 20px at
  // every breakpoint before this).
  note: "mt-8 w-full max-w-[320px] text-[1.125rem] leading-6 text-ink xl:mt-12 xl:max-w-[570px] xl:text-[1.25rem] xl:leading-7",
  noteBold: "font-semibold",

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
  accordionHeader: "flex w-full items-center justify-between gap-4 text-left text-[1.125rem] font-medium leading-6 text-ink",
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
  accordionValue: "text-[1.125rem] font-normal leading-6 text-ink",
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
  // divider's own comment in app/activewear/[category]/page.tsx). pb is
  // 52px (was 120px when this was the last section) -- pairs with
  // TrustPoints' own pt-[52px] below it, netting the real 104px gap.
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
    "mx-auto flex w-full max-w-[1440px] flex-col items-center px-0 py-[72px] xl:gap-[72px] xl:px-[138px] xl:py-0 xl:pb-[52px]",
  // max-xl:gap-4 (16px, mobile Title frame's own gap)/px-5 (20px, mobile's
  // own inset -- the section itself carries none below xl)/mb-8 (32px, the
  // gap down to the artwork below -- see the section comment above for why
  // this is a margin, not a shared gap). xl keeps the original centred
  // 579px column untouched.
  headingBlock: "mx-auto flex w-full max-w-[579px] flex-col items-center gap-4 px-5 text-center max-xl:mb-8 xl:gap-6 xl:px-0 xl:mb-0",
  // max-xl:text-base (16px, mobile Figma). xl keeps the original 20px.
  eyebrow: "text-base font-semibold text-ink xl:text-[1.25rem]",
  // max-xl:text-[1.875rem]/leading-[34px] (30px/34px, mobile Figma) --
  // font-normal there too (Figma's own mobile export: "Regular", weight
  // 460, not Medium). xl keeps the original 54px/64px/font-medium.
  heading: "text-[1.875rem] leading-[34px] font-normal text-ink xl:text-[3.375rem] xl:leading-[64px] xl:font-medium",
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
  artworkWrap: "w-full px-5 max-xl:mb-6 xl:hidden",
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
  // 30px (owner correction, 2026-08-30, down from 32px) -- same size on
  // mobile (Figma's own mobile export uses the identical 30px/medium).
  itemTitle: "text-[1.875rem] font-medium text-ink",
  // max-xl:text-[1.125rem]/leading-6 (18px/24px, mobile Figma). xl keeps
  // the original 20px/28px.
  itemBody: "text-[1.125rem] leading-6 font-normal text-ink xl:text-[1.25rem] xl:leading-7",
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
  // pt-[52px]/pb-[52px] (was 120px each, then 40px each, then 51px each,
  // owner correction 2026-08-30: "make it 104px not 102px") -- pt pairs
  // with FabricOptions' own pb-[52px] above (52+52=104 between them), pb
  // pairs with WhatWeCover's own pt-[52px] below, same reasoning.
  // max-xl: mobile Figma frame (node 590:1283, 360px), read 2026-08-30 --
  // no top padding of its own (WhatWeCover's own mobile pb-[72px] above
  // already supplies that gap), pb-[72px]. No `gap` here (unlike
  // WhatWeCover's section, which uses one uniform gap throughout): the
  // owner wants a different gap above the artwork (32px) than below it
  // (30px, owner correction 2026-08-30: "content under the media image
  // should have 30px space"), which a single flex `gap` can't express --
  // headingBlock/artworkWrap each carry their own margin-bottom instead.
  // xl keeps the original desktop pairing (pt/pb-[52px]) and its own
  // gap-[72px] untouched.
  section: "mx-auto flex w-full max-w-[1440px] flex-col items-start px-0 pb-[72px] xl:gap-[72px] xl:px-[138px] xl:pt-[52px] xl:pb-[52px]",
  // max-xl:gap-2 (8px, mobile Title frame's own gap)/px-5 (20px, mobile's
  // own inset -- the section itself carries none below xl)/w-full (fills
  // the padded row instead of shrinking to content, unlike desktop's
  // intrinsic 650px cap)/mb-8 (32px, the gap down to the artwork below --
  // see the section comment above for why this is a margin, not a shared
  // gap). xl keeps the original values untouched.
  headingBlock: "flex max-w-[650px] flex-col gap-2 px-5 w-full max-xl:mb-8 xl:gap-4 xl:px-0 xl:w-auto xl:mb-0",
  // max-xl:text-[1.875rem]/leading-[34px] (30px/34px, mobile Figma; same
  // Medium weight both sizes). xl keeps the original 54px/64px.
  heading: "text-[1.875rem] leading-[34px] font-medium text-ink xl:text-[3.375rem] xl:leading-[64px]",
  // max-xl:text-[1.125rem]/leading-6 (18px/24px, mobile Figma). xl keeps
  // the original 22px/32px-line-height regular -- Figma's own real value
  // for this subline, a size this project's own type scale has no match
  // for (same "one-off literal value straight from Figma" precedent as
  // every other bespoke PLP section).
  subline: "text-[1.125rem] leading-6 font-normal text-ink xl:text-[1.375rem] xl:leading-8",
  // Mobile-only (Figma node 590:1258, "Artwork", 320x220 -- same 16:11
  // ratio and wrapper-padding pattern as WhatWeCover's own artwork; see
  // that component's comment for why the inset can't live on
  // MediaPlaceholder's own root). xl:hidden: no equivalent frame exists on
  // the desktop design at all, not a scaled version of one. No margin of
  // its own -- the owner's "30px space under the media image" (2026-08-30)
  // is produced entirely by the row list's own first-item padding below,
  // not stacked on top of it (an earlier pass had both, doubling the real
  // gap to 62px -- the "white space" the owner then reported, 2026-08-30).
  artworkWrap: "w-full px-5 xl:hidden",
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
  row: "flex items-center gap-3 border-b border-[#e8ecf1] px-2.5 py-8 max-xl:gap-2 max-xl:border-[#f2f2f7] max-xl:px-0 max-xl:py-6 max-xl:first:pt-[30px]",
  // 24px (owner correction 2026-08-30, down from 30px -- Figma's own most
  // common value across these 5 rows, see the row comment above for why
  // that one shared size was picked over the file's inconsistent
  // per-row overrides in the first place) on desktop.
  // max-xl:text-[1.125rem]/leading-6 (18px/24px, mobile Figma).
  pointText: "text-[1.5rem] leading-tight font-normal text-ink max-xl:text-[1.125rem] max-xl:leading-6",
  // 18x18px (owner correction 2026-08-30, down from the sitewide size-5
  // token/20px) on desktop. max-xl:size-4 (16px, mobile Figma).
  icon: "size-[18px] shrink-0 text-accent max-xl:size-4",
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
