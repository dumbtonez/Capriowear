"use client";

// components/IntroLoader.tsx
// A brief, one-time entrance animation: the CAPRIO wordmark wipes into view,
// then fades away to reveal the homepage underneath -- owner request,
// 2026-08-27. Homepage-only (rendered from app/page.tsx), and only on a
// genuine fresh entry to "/": never on a reload once already seen this
// session, and never when navigating here client-side from another page
// (owner requirement) -- see lib/pageEntry.ts for how that second condition
// is told apart from the first.
//
// A pure visual overlay, not a gate on the real content: the homepage's own
// HTML renders immediately underneath regardless of this component, so
// nothing here can affect SEO, Core Web Vitals, or a crawler's view of the
// page -- only what a real browser visually shows for well under a second.
//
// Reveal mechanism is a `clip-path` wipe (not SVG stroke-dasharray): the
// wordmark's paths are filled shapes with real counters (holes in the "A",
// "P", "R"), so a literal stroke-draw would need per-path stroke lengths
// worked out across a fairly complex multi-path SVG for no real visual gain
// over a wipe. The same clip-path-transition technique already proven twice
// this session (MobileNav's drawer reveal, the desktop mega menu's own open
// animation) -- same confidence it renders smoothly, nothing new to debug.
import { useEffect, useLayoutEffect, useState } from "react";

import { Logo } from "./Logo";
import { cx } from "./ui/cx";
import { introLoader } from "./ui/styles";
import { getInitialPath } from "@/lib/pageEntry";

const SESSION_KEY = "cw-intro-seen";
// Kept in sync with introLoader.wordmarkClip / .overlay's own duration
// classes in components/ui/styles.ts -- these drive the JS timers that
// sequence wipe -> hold -> fade, the Tailwind classes drive the actual CSS
// transitions. Slowed and re-eased 2026-08-27 (owner: too fast, jerky
// handoff to the homepage) -- see those classes' own comments for why.
const WIPE_MS = 1000;
const HOLD_MS = 250;
const FADE_MS = 700;

// Memoized at module scope, not read fresh inside the effect every time it
// runs: React's Strict Mode (on by default in Next.js dev) deliberately
// double-invokes effects on mount, and this effect's own first invocation
// already writes `SESSION_KEY` to sessionStorage -- reading it again on the
// phantom second invocation would see that just-written value and wrongly
// conclude "already seen", cancelling a genuinely fresh entry. Deciding
// exactly once here (module state survives the double-invoke, since it
// isn't reset between the two calls the way a fresh read would be) makes
// the outcome immune to how many times the surrounding effect happens to
// run.
let decided = false;
let shouldShowIntro = false;

function decideOnce(): boolean {
  if (decided) return shouldShowIntro;
  decided = true;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alreadySeenThisSession = sessionStorage.getItem(SESSION_KEY) === "1";
  // getInitialPath() is null only if this render somehow ran before
  // AppEntryMarker's (shouldn't happen -- the marker sits above {children}
  // in the root layout) -- treated as "not a fresh entry" to fail safe
  // toward never showing rather than showing incorrectly.
  const isFreshEntryToHome = getInitialPath() === "/";
  sessionStorage.setItem(SESSION_KEY, "1");
  shouldShowIntro = !reducedMotion && !alreadySeenThisSession && isFreshEntryToHome;
  return shouldShowIntro;
}

export function IntroLoader() {
  // Always starts "visible" on both server and client's first render (so
  // there's no hydration mismatch) -- the `useLayoutEffect` below corrects
  // this synchronously, before paint, for every case that shouldn't
  // actually show the animation, so repeat/ineligible visits never flash it.
  const [visible, setVisible] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [fading, setFading] = useState(false);

  useLayoutEffect(() => {
    if (!decideOnce()) {
      // Deciding whether to show at all is fundamentally a read of
      // browser-only state (matchMedia/sessionStorage) that doesn't exist
      // during server render -- there's no render-phase equivalent of this
      // check the way a plain prop/state condition would have one, so this
      // has to be a real effect, not a lint workaround.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Wipe finishes -> brief hold -> start the fade-out.
  useEffect(() => {
    if (!revealed || fading) return;
    const timeout = setTimeout(() => setFading(true), WIPE_MS + HOLD_MS);
    return () => clearTimeout(timeout);
  }, [revealed, fading]);

  // Fade-out finishes -> unmount.
  useEffect(() => {
    if (!fading) return;
    const timeout = setTimeout(() => setVisible(false), FADE_MS);
    return () => clearTimeout(timeout);
  }, [fading]);

  // Lock background scroll while the intro is up, same one-line pattern
  // already used by MobileNav/HeaderOverlayNav.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  // Any keypress skips straight to the fade-out (a click is handled inline
  // on the overlay itself, below).
  useEffect(() => {
    if (!visible || fading) return;
    function skip() {
      setRevealed(true);
      setFading(true);
    }
    document.addEventListener("keydown", skip);
    return () => document.removeEventListener("keydown", skip);
  }, [visible, fading]);

  if (!visible) return null;

  return (
    <div
      className={cx(introLoader.overlay, fading ? introLoader.overlayHidden : introLoader.overlayVisible)}
      onClick={() => {
        setRevealed(true);
        setFading(true);
      }}
      role="presentation"
      aria-hidden="true"
    >
      <div
        className={cx(
          introLoader.wordmarkClip,
          revealed ? introLoader.wordmarkClipVisible : introLoader.wordmarkClipHidden,
        )}
      >
        <Logo className={introLoader.wordmark} />
      </div>
    </div>
  );
}
