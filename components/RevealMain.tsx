"use client";

// components/RevealMain.tsx
// Replaces the older `position: sticky; bottom: 0` trick that used to live
// directly on Footer.tsx's own root (see that file's former header comment,
// and the "reveal" note on the `footer` recipe in components/ui/styles.ts).
//
// That approach permanently clipped the top of the footer -- the 56px gap
// above the logo, and often the logo itself -- on any real viewport shorter
// than the footer's own full rendered height (826px on desktop). `position:
// sticky` pins an element to a viewport edge for its *entire* "stuck"
// duration; a sticky-bottom element taller than the viewport can only ever
// show its own bottom-aligned slice, so the top portion is permanently
// unreachable by scrolling, not just visually tight. Found live (owner
// report, 2026-09-06: "the footer still has not space from the top of the
// logo... logo is being cut") at realistic laptop browser heights
// (1280x720, 1366x768, and even 1440x900 once real browser chrome is
// subtracted) -- every height shorter than the footer's own 826px, which
// covers most real desktop windows, not an edge case.
//
// Fix: pull the footer up underneath `<main>` with a real, live-measured
// negative `margin-bottom` on `<main>` itself, instead of making the footer
// sticky at all. `<main>` still needs its own `position: relative` + higher
// `z-index` + opaque background (unchanged, passed in via `className` by
// every page) so it visually covers the footer during the overlap; the
// footer itself needs no special positioning any more -- it renders in
// completely ordinary document flow, so it can be any height, on any page,
// at any viewport, and is always fully scrollable/visible during the scroll
// itself, not permanently frozen showing only one slice. (On the single
// shortest target viewport, 1280x720, the footer's own real content -- 826px
// -- is still taller than the window, so at the exact final scrolled-to-the-
// end resting position, only the bottom ~720px of it is in frame -- the same
// way any website's footer taller than the browser window behaves. That is
// ordinary end-of-page scrolling, not the bug: verified live that the logo
// scrolls smoothly and fully into view throughout the scroll range on every
// other of the 15 target viewports in tests/screenshots.spec.ts, including
// the next-shortest, 1366x768.)
//
// The negative margin is measured live off the real rendered `<footer>`
// element, not a hardcoded, per-breakpoint pixel guess -- a hardcoded value
// would silently desync (re-introducing either a gap or a clip) the moment
// footer content, its responsive height, or a future breakpoint's own wrap
// behavior ever changes. Every page on the site renders the exact same
// `<Footer>` component immediately after this wrapper, so
// `document.querySelector("footer")` unambiguously finds it.
//
// Applied via a direct ref mutation, not React state -- this is a case of
// syncing one already-rendered DOM node's own measured size onto another DOM
// node's style, nothing here is actually part of this component's own
// visible React output, so routing it through `useState`/a re-render would
// be pure overhead (and trips the `react-hooks/set-state-in-effect` lint
// rule, which exists for exactly this "you didn't need an effect-driven
// state update here" case). ResizeObserver's own initial callback isn't
// relied on for the first value either -- it's supposed to fire per spec,
// but doesn't reliably in every environment (confirmed: silent, no callback
// at all, in this project's own automated browser test tooling); a
// synchronous `getBoundingClientRect().height` read in the same
// `useLayoutEffect`, before the observer is even attached, can never
// silently no-op the same way. The observer still handles every
// *subsequent* change (window resize, orientation change, footer content
// changing height) so the pulled-up amount never desyncs after first paint.
//
// `applyPullUp` skips the negative margin entirely once the footer's own
// height reaches the viewport's (owner, 2026-09-09: "on mobile footer is
// not showing" -- a real bug, root-caused live, not guessed at). The pull-
// up-by-the-footer's-own-full-height trick can only ever uncover the
// footer if that overlap region is SHORTER than the viewport -- otherwise
// the entire visible viewport at max scroll still falls inside the region
// `<main>`'s own opaque, higher-z-index background covers, so the footer
// can never surface no matter how far the page scrolls. Confirmed live:
// desktop's own footer was deliberately trimmed to ~700px specifically to
// stay under realistic laptop viewport heights (see `desktopRow3`'s own
// comment, components/ui/styles.ts) -- no equivalent trim was ever done
// for mobile, and the real mobile footer (866px) is taller than every
// target mobile viewport (812-932px), worse still once real browser
// chrome is subtracted. Rather than chase that height relationship with
// an ever-shrinking content trim, `<main>`/`<footer>` simply fall back to
// plain, ordinary document flow (`margin-bottom: 0`) whenever the pull-up
// can't safely reveal the whole footer -- unconditionally correct
// regardless of either box's height, just without the reveal animation
// (already the real, working behavior on any page whose footer already
// happens to fit, e.g. this same mechanism resolves to a no-op there).
import { useLayoutEffect, useRef } from "react";

export type RevealMainProps = {
  className: string;
  children: React.ReactNode;
};

export function RevealMain({ className, children }: RevealMainProps) {
  const mainRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const main = mainRef.current;
    const footer = document.querySelector<HTMLElement>("footer");
    if (!main || !footer) return;

    function applyPullUp(height: number) {
      const canReveal = height < window.innerHeight;
      main!.style.marginBottom = canReveal ? `-${Math.round(height)}px` : "0px";
    }

    applyPullUp(footer.getBoundingClientRect().height);

    const observer = new ResizeObserver(([entry]) => {
      applyPullUp(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
    });
    observer.observe(footer);

    // Viewport-height changes (orientation change, browser chrome showing/
    // hiding, window resize) can flip the `canReveal` threshold on their
    // own even when the footer's own size hasn't changed -- the
    // ResizeObserver above only watches the footer element itself.
    const onResize = () => applyPullUp(footer.getBoundingClientRect().height);
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <main ref={mainRef} className={className}>
      {children}
    </main>
  );
}
