// lib/motionPreference.ts
// The single, centralized `prefers-reduced-motion` check -- every autoplay/
// animation gate on the site (TeaserVideo/useInViewAutoplay, ShortClipMedia,
// DesktopChevronScroller's drag/momentum, IntroLoader, OurFactoryDetails'
// image-crossfade premium pass) reads it from here, not its own inline
// `window.matchMedia(...)` call. One implementation, not six copies -- and
// the one place a future feature needs to wire in to inherit the override
// below for free.
//
// Diagnostic override, 2026-09-13: `?reduceMotion=1` / `?reduceMotion=0` in
// the URL forces this to true/false, bypassing the real OS-level media
// query entirely. Added because neither manual testing nor this project's
// remote browser QA tooling can toggle the OS's own "reduce motion"
// setting, so every reduced-motion fallback was unverifiable in live
// testing -- hit twice already (Hero's teaser video, then Our Factory
// Process's short clips), both times only checkable by code review.
//
// URL-only, on purpose: no UI control anywhere, nothing a normal visitor
// could stumble into or that shows up in any settings surface. With no
// `reduceMotion` param present, this behaves exactly as it always has --
// the real `matchMedia` result, completely untouched.
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  const override = new URLSearchParams(window.location.search).get("reduceMotion");
  if (override === "1") return true;
  if (override === "0") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Whether the diagnostic override above is active for this page load (either
 * value) -- lets a caller that also wants to *listen* for live OS-level
 * changes (via `matchMedia(...).addEventListener("change", ...)`) skip
 * attaching that listener when a test is deliberately pinning the value via
 * the URL, so a real OS toggle during that test can't silently overwrite it.
 */
export function hasReducedMotionOverride(): boolean {
  if (typeof window === "undefined") return false;
  const override = new URLSearchParams(window.location.search).get("reduceMotion");
  return override === "1" || override === "0";
}
