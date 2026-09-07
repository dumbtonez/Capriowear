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
// Accessibility: the rendered tag carries the full sentence as aria-label;
// each per-word span is aria-hidden, so nothing is read twice or split
// word-by-word by a screen reader -- the same pattern the reference itself
// uses.
"use client";

import type { ElementType } from "react";
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
 */
export function useRevealOnView<T extends HTMLElement>(threshold = 0.3) {
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
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, active };
}

export function TextReveal({ text, segments, boldClassName, as: Tag = "span", className }: TextRevealProps) {
  const { ref, active } = useRevealOnView<HTMLElement>();
  let globalIndex = 0;

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
    const fullText = segments.map((s) => s.text).join("");
    const words = segments.flatMap((segment) =>
      segment.text
        .split(" ")
        .filter(Boolean)
        .map((word) => ({ word, bold: !!segment.bold })),
    );
    const MAX_STAGGER_INDEX = 10;

    return (
      <Tag ref={ref} className={cx(className, active && "reveal-active")} aria-label={fullText}>
        {words.map(({ word, bold }, wi) => {
          const i = Math.min(globalIndex++, MAX_STAGGER_INDEX);
          return (
            <Fragment key={wi}>
              {wi > 0 && " "}
              <span className={textReveal.mask} aria-hidden="true">
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
  const lines = (text ?? "").split("\n");

  return (
    <Tag
      ref={ref}
      className={cx(className, active && "reveal-active")}
      aria-label={text}
    >
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {line.split(" ").map((word, wi) => {
            const i = globalIndex++;
            return (
              <Fragment key={wi}>
                {wi > 0 && " "}
                {/* Plain space text nodes between masks, not inside them --
                    avoids sizing a non-breaking space inside an animated box. */}
                <span className={textReveal.mask} aria-hidden="true">
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
