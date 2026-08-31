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

export type TextRevealProps = {
  text: string;
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

export function TextReveal({ text, as: Tag = "span", className }: TextRevealProps) {
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
  const lines = text.split("\n");
  const { ref, active } = useRevealOnView<HTMLElement>();
  let globalIndex = 0;

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
