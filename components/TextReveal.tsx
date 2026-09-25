// components/TextReveal.tsx
// Word-by-word entrance reveal: each word sits in its own overflow-hidden
// mask and slides up into place, staggered per word -- referenced from
// afternow.co/services (2026-08-27). Applied to Hero's H1 and, since
// 2026-08-27, several below-the-fold sections' eyebrow + title.
//
// The reference site measures which words land on the same rendered LINE
// (JS, re-run on resize) and masks per line. This masks per WORD instead:
// same visual language (words rising out of a clipping box, staggered), no
// resize-recalculation edge case.
//
// Client component, triggered by IntersectionObserver -- NOT a play-on-mount
// CSS animation (the first version of this component, 2026-08-27). A
// below-the-fold section mounts the instant the page loads, same as Hero,
// so a mount-triggered animation had already finished by the time a reader
// scrolled down to it -- confirmed live (owner report: "still only shows on
// the top banner text"). Gating the animation on actually scrolling into
// view is the fix; Hero itself is already in view at mount, so it still
// animates immediately, same as before. The one-shot trigger (`observer.
// disconnect()` on first intersection) mirrors this project's existing
// scroll-driven components (e.g. ScrollSpotlightList) in spirit, though this
// only needs a single boolean flip, not a continuous per-frame read.
//
// Accessibility: the text exists once in the DOM (Jackets audit #10,
// 2026-09-25). On a heading (h2 to h6) the tag carries the full sentence as
// aria-label and each per-word span is aria-hidden, so nothing is read twice
// or split word-by-word by a screen reader. On any other tag the words stay
// readable and there is no second, visually-hidden copy, so a heading that
// wraps this as a span gets its name from the words themselves.
//
// An h1 is always above the fold (every H1 on the site sits in a hero), so
// it renders as static text with no reveal: it paints on first render
// instead of waiting for the word animation (Jackets audit #4, LCP).
"use client";

import type { ElementType, RefObject } from "react";
import { Fragment, useEffect, useRef, useState } from "react";

import { cx } from "./ui/cx";
import { textReveal } from "./ui/styles";

/** One run of a segmented reveal paragraph -- same shape as content/activewear/types.ts's `NoteSegment`, not re-imported directly so this component has no dependency on a specific content file's types. */
export type TextRevealSegment = { text: string; bold?: boolean };

export type TextRevealProps = {
  /** Plain text mode (the original, still the common case) -- mutually exclusive with `segments`. */
  text?: string;
  /**
   * Segmented mode: renders the same word-by-word reveal, but preserves
   * each segment's own `bold` flag per word (Services "How we work with
   * you"'s closing note, 2026-09-07 -- the note already needed real inline
   * `<strong>` phrases, same as ServicesIntro/FabricOptions' own
   * NoteSegment paragraphs, so this extends the one existing reveal
   * primitive rather than hand-rolling a second word-reveal engine just
   * for rich text). Word boundaries are re-derived from the flattened
   * segment text, not kept per-segment, so normal single-space spacing
   * between segments is automatic regardless of where a segment happens
   * to start/end mid-sentence.
   */
  segments?: TextRevealSegment[];
  /** Applied to each bold word's own inner span when using `segments`. */
  boldClassName?: string;
  /** Tag to render, e.g. "h1" for Hero's headline. Defaults to a plain span. */
  as?: ElementType;
  className?: string;
};

/**
 * Fires once, the first time the returned `ref` is ≥`threshold` in view, then
 * disconnects -- shared by TextReveal and RevealBox (components/RevealBox.tsx),
 * so both "reveal once it's in view" behaviours share one implementation
 * rather than each inlining their own IntersectionObserver. Co-located here
 * since this is the component that first needed it, then exported for reuse
 * -- the same pattern useDesktopChevronScroller already established
 * (components/DesktopChevronScroller.tsx).
 *
 * `root` (default `null` -- the browser viewport, `IntersectionObserver`'s
 * own default): real bug, found live, owner 2026-09-13: "exhibition and how
 * it works last images are not the same aspect ratio as others" -- the box
 * itself was always the correct, identical aspect ratio (confirmed live via
 * `getComputedStyle`); the LATER cards in a horizontally click/drag-paged
 * reel (`ParallaxMedia`'s own zoom-and-settle usage in Exhibitions/How It
 * Works/Inside the Factory) sit far outside the page's own viewport bounds
 * on first paint (only moved into view later by the reel's own `transform:
 * translateX`, never a real page scroll) -- against the default full-page
 * viewport root, those cards' real geometry never intersects at all until
 * dragged into view, so they were stuck at their PRE-reveal state
 * (`scale-[1.12]`, zoomed in and cropped tighter than a settled card) any
 * time a user reached them before ever triggering a real page scroll past
 * that point -- reading as "wrong aspect ratio" (a different, more zoomed-
 * in crop of the same box), not a CSS sizing bug. Passing the reel's own
 * clipping ancestor (`trackRef.current`) as `root` scopes the intersection
 * check to that container instead of the whole page, so a card sliding
 * into the track's own visible bounds via the drag/chevron transform
 * reveals correctly, exactly like scrolling a normal page section into
 * view already does for every other `useRevealOnView` caller.
 *
 * `rootRef` (not a resolved element -- reading a ref's `.current` during
 * render, rather than inside this hook's own effect, is itself a real
 * React footgun: the DOM node it points to may not be mounted yet on the
 * very first render, and doing it in the caller's render body trips the
 * `react-hooks/refs` rule) is read inside the effect below, once refs are
 * guaranteed attached.
 */
export function useRevealOnView<T extends HTMLElement>(
  threshold = 0.3,
  rootRef?: RefObject<Element | Document | null>,
) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold, root: rootRef?.current ?? null },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootRef]);

  return { ref, active };
}

export function TextReveal({ text, segments, boldClassName, as: Tag = "span", className }: TextRevealProps) {
  const { ref, active } = useRevealOnView<HTMLElement>();
  let globalIndex = 0;

  // Accessible name (Hoodies audit follow-up, 2026-09-24; revised Jackets
  // audit #10, 2026-09-25). A heading (h1 to h6) has a real role, so
  // `aria-label` on it is valid ARIA and its per-word spans stay
  // aria-hidden. Any other element (span, p) has no role, so `aria-label`
  // is prohibited (Lighthouse "aria-prohibited-attr"); its words are left
  // readable instead of adding a second, sr-only copy, so the text is in
  // the DOM exactly once either way.
  const isHeading = typeof Tag === "string" && /^h[1-6]$/.test(Tag);
  const accessibleText = segments ? segments.map((s) => s.text).join("") : (text ?? "").replace(/\n/g, " ");
  const labelProps = isHeading ? { "aria-label": accessibleText } : {};
  // Words are hidden from assistive tech only where the heading's own
  // aria-label already names it; elsewhere they are the accessible text.
  const wordAriaHidden = isHeading ? true : undefined;

  // Above-the-fold H1: static text, no reveal, so it paints on first render.
  if (Tag === "h1") {
    const staticLines = segments ? [accessibleText] : (text ?? "").split("\n");
    return (
      <Tag className={className}>
        {staticLines.map((line, li) => (
          <Fragment key={li}>
            {li > 0 && (
              <>
                {" "}
                <br />
              </>
            )}
            {line}
          </Fragment>
        ))}
      </Tag>
    );
  }

  // Segmented mode: word boundaries are re-derived from the flattened
  // segment text (not kept per-segment) -- see the `segments` prop's own
  // comment. No line-break support here (nothing segmented needs it yet);
  // that stays a `text`-mode-only feature, below.
  //
  // `--reveal-index` is capped at MAX_STAGGER_INDEX, not left to grow with
  // every word -- every other TextReveal caller only ever reveals a short
  // heading/eyebrow (a handful of words), so app/globals.css's per-word
  // stagger (45ms) was tuned for that, finishing in ~1s. This component's
  // first real long-paragraph usage (Services "How we work with you"'s
  // 32-word closing note) hit the SAME uncapped formula and took ~2.2s to
  // finish -- mechanically the same animation, but owner report the same
  // day: "apply the same text animation... this one is different," i.e.
  // it read as a different, sluggish effect purely because of word count,
  // not a real design change. Capping the index lets trailing words share
  // the last few staggered slots instead of marching on indefinitely,
  // keeping this instance's total duration in the same ~1.25s ballpark as
  // every short heading elsewhere, regardless of how many words it has.
  if (segments) {
    const words = segments.flatMap((segment) =>
      segment.text
        .split(" ")
        .filter(Boolean)
        .map((word) => ({ word, bold: !!segment.bold })),
    );
    const MAX_STAGGER_INDEX = 10;

    return (
      <Tag ref={ref} className={cx(className, active && "reveal-active")} {...labelProps}>
        {words.map(({ word, bold }, wi) => {
          const i = Math.min(globalIndex++, MAX_STAGGER_INDEX);
          return (
            <Fragment key={wi}>
              {wi > 0 && " "}
              <span className={textReveal.mask} aria-hidden={wordAriaHidden}>
                <span
                  className={cx(textReveal.word, bold && boldClassName)}
                  style={{ ["--reveal-index" as string]: i }}
                >
                  {word}
                </span>
              </span>
            </Fragment>
          );
        })}
      </Tag>
    );
  }

  // Split on explicit line breaks FIRST, then words within each line --
  // not a flat `text.split(" ")` (the original, single-line-only version).
  // A "\n" inside `text` (e.g. FabricOptions' own 2-line heading, "The
  // fabrics behind the\nbig brands") used to survive as plain text INSIDE
  // one word's own overflow-hidden animated mask, since a bare space-split
  // treats "the\nbig" as a single "word" token -- found live, 2026-08-30:
  // this didn't just fail to break the line, it visually scrambled word
  // order across the break ("The fabrics behind the brands" / "big").
  // Splitting on "\n" first and rendering a real `<br />` between lines
  // keeps every word's own mask a plain single word, no embedded newline.
  // A plain space precedes each <br /> so the visible words' text reads
  // "the big", not "thebig" (2026-09-24); it collapses at the line end, so
  // the break itself is unchanged.
  const lines = (text ?? "").split("\n");

  return (
    <Tag
      ref={ref}
      className={cx(className, active && "reveal-active")}
      {...labelProps}
    >
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && (
            <>
              {" "}
              <br />
            </>
          )}
          {line.split(" ").map((word, wi) => {
            const i = globalIndex++;
            return (
              <Fragment key={wi}>
                {wi > 0 && " "}
                {/* Plain space text nodes between masks, not inside them --
                    avoids sizing a non-breaking space inside an animated box. */}
                <span className={textReveal.mask} aria-hidden={wordAriaHidden}>
                  <span className={textReveal.word} style={{ ["--reveal-index" as string]: i }}>
                    {word}
                  </span>
                </span>
              </Fragment>
            );
          })}
        </Fragment>
      ))}
    </Tag>
  );
}
