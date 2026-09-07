// components/Marquee.tsx
// Scrolling ticker. Two uses in the wireframe: the "Fully Custom Offerings"
// strip under the hero and the compliance strip under Inside the Factory, both
// a label followed by a running list of short items.
//
// The animation itself lives in app/globals.css (.marquee-track), because it
// needs @keyframes, which cannot be expressed as a utility class. The track
// renders the item list twice and travels exactly -50%, so the loop is seamless
// at any content width without measuring anything in JS: this stays a server
// component with zero client JS. Pause on hover and on focus-within (so a
// keyboard user tabbing through can read a moving item) are CSS too.
//
// Accessibility: the visible track is aria-hidden and the same items are
// exposed once, statically, to assistive tech. Otherwise a screen reader reads
// the duplicated list twice.
import { Sparkle } from "lucide-react";
import type { ReactNode } from "react";

import { Eyebrow } from "./Eyebrow";
import { cx } from "./ui/cx";
import { marquee } from "./ui/styles";

export type MarqueeProps = {
  items: readonly ReactNode[];
  /** Static label shown before the ticker, e.g. "Fully Custom Offerings". */
  label?: ReactNode;
  /**
   * `eyebrow` (default): the muted, uppercase Overline treatment. `bold`: bold,
   * sentence-case Body -- Figma's real "Fully Custom Offerings" ticker uses
   * this, not an eyebrow. Confirmed against that one ticker; other tickers
   * default to `eyebrow` until their own real design says otherwise.
   * `title`: a real `<h2>`, Heading 5 -- Client Logos' desktop "Trusted by
   * top brands worldwide" (2026-08-26, referencing tedy.app's side-by-side
   * "Trusted by 500+ businesses" treatment, not a Figma-confirmed label).
   */
  labelVariant?: "eyebrow" | "bold" | "title";
  /**
   * `slash` (default), `sparkle` -- the offerings ticker -- or `none` -- the
   * client logos ticker, which has no glyph between items at all, just space.
   */
  separator?: "slash" | "sparkle" | "none";
  /**
   * `stacked` (default): label on its own row, ticker below, 32px gap --
   * Figma's real offerings ticker. `inline`: label beside the track, the
   * original guess, kept for a future ticker that turns out to want it.
   */
  layout?: "stacked" | "inline";
  /**
   * `default` (40px, the offerings ticker) or `loose` (72px, the client logos
   * ticker) -- both confirmed against their own real Figma spacing, not
   * interchangeable defaults.
   */
  gap?: "default" | "loose";
  /**
   * Default true: a bottom border marking the end of the ticker band (the
   * offerings ticker). The client logos ticker has none in its real design --
   * set false there rather than leaving a divider Figma doesn't show.
   */
  divider?: boolean;
  /** Seconds for one full pass. Longer lists need longer to keep pace even. */
  durationSeconds?: number;
  /** Ink band treatment, as used for the compliance ticker. */
  tone?: "light" | "dark";
  /**
   * `body` (default, 18px): the offerings ticker's own confirmed size.
   * `lg` (20px, `#F2F2F7`): the compliance ticker's own confirmed size and
   * colour (2026-08-24) -- a real, different value, not `body` reused.
   */
  itemSize?: "body" | "lg";
  /**
   * Default true: the track pauses on hover/focus-within, so a mouse user
   * can stop to read an item. Client Logos' desktop ticker sets this false
   * (owner call, 2026-08-26) -- it's decorative brand logos, not something
   * to read, so the movement itself is the point and shouldn't stop.
   */
  pauseOnHover?: boolean;
  /**
   * Default false. Fades the track's own left/right edges to transparent
   * (a `mask-image` gradient, works over any background) so items entering
   * or leaving the visible strip fade out rather than getting hard-clipped
   * -- Client Logos' desktop ticker only (2026-08-26, referencing
   * tedy.app's own edge-fade treatment).
   */
  edgeFade?: boolean;
  /**
   * Default true: the standard 40px-top/32px-bottom internal padding
   * (`marquee.basePaddingDefault`). Set false when a caller's own wrapper
   * already controls that vertical rhythm and would otherwise double up
   * with this padding -- Client Logos' mobile marquee (2026-08-26), whose
   * wrapper supplies its own exact top/bottom spacing. Removing the padding
   * at its source, rather than cancelling it with a negative margin on the
   * caller's side, matters here: a negative margin shifts this component's
   * own box (padding included) without moving where it sits in the flex
   * layout, so its opaque `toneLight`/`toneDark` background can end up
   * painted over a neighbouring sibling instead of just visually "removing"
   * space (found and fixed 2026-08-26, see `basePaddingNone` in styles.ts).
   */
  padded?: boolean;
  className?: string;
};

export function Marquee({
  items,
  label,
  labelVariant = "eyebrow",
  separator = "slash",
  layout = "stacked",
  gap = "default",
  divider = true,
  durationSeconds = 40,
  tone = "light",
  itemSize = "body",
  pauseOnHover = true,
  edgeFade = false,
  padded = true,
  className,
}: MarqueeProps) {
  // Two identical passes: the -50% translate lands the second pass exactly
  // where the first began. Keys are index-based because the same content is
  // deliberately repeated.
  const passes = [0, 1];

  const labelEl = label ? (
    labelVariant === "bold" ? (
      <span className={marquee.labelBold}>{label}</span>
    ) : labelVariant === "title" ? (
      <h2 className={marquee.labelTitleWrap}>
        <span className={marquee.labelTitle}>{label}</span>
      </h2>
    ) : (
      <Eyebrow tone="muted" as="span" className={marquee.label}>
        {label}
      </Eyebrow>
    )
  ) : null;

  const separatorIcon =
    separator === "none" ? null : separator === "sparkle" ? (
      <Sparkle aria-hidden="true" className={marquee.separatorSparkle} fill="currentColor" />
    ) : (
      <span aria-hidden="true" className={marquee.separator}>
        /
      </span>
    );

  const track = (
    <div className={cx(marquee.viewport, edgeFade && "marquee-edge-fade")}>
      <div
        className={marquee.track}
        style={{ ["--marquee-duration" as string]: `${durationSeconds}s` }}
        aria-hidden="true"
      >
        {passes.map((pass) => (
          <ul key={pass} className={gap === "loose" ? marquee.passLoose : marquee.pass}>
            {/* Every item gets a leading icon, including each pass's first --
                Figma's static screenshot shows the very first item with none,
                but the two passes must be byte-for-byte identical for the
                -50% loop transform to land exactly on the seam. Omitting the
                icon from just one pass's first item (matching the static
                screenshot literally) made that pass narrower than the other,
                breaking the loop math itself, not just the visible gap.
                Uniform icons everywhere is barely noticeable on first paint
                and the only way to keep the loop mathematically seamless. */}
            {items.map((item, i) => (
              <li key={i} className={marquee.item}>
                {separatorIcon}
                <span className={itemSize === "lg" ? marquee.itemTextLg : marquee.itemText}>{item}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className={cx(
        marquee.base,
        padded ? marquee.basePaddingDefault : marquee.basePaddingNone,
        divider && marquee.divider,
        tone === "dark" ? marquee.toneDark : marquee.toneLight,
        !pauseOnHover && "marquee-no-pause",
        className,
      )}
    >
      <div className={layout === "stacked" ? marquee.innerStacked : marquee.innerInline}>
        {labelEl}
        {track}
      </div>

      {/* The same items, once, for assistive tech and for no-CSS fallback. */}
      <ul className="sr-only">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
