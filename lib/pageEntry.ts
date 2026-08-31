// lib/pageEntry.ts
// Answers one question for IntroLoader: "was the CURRENT page the very route
// the browser actually navigated to, or did the user arrive here via an
// internal Next.js client-side transition from some other already-loaded
// page?" (owner requirement, 2026-08-27: the intro must never replay when
// moving from one page to another, only on a genuine fresh entry.)
//
// Module-level state, not React state or sessionStorage: a real full page
// load re-evaluates every JS module from scratch (this file's `captured`
// resets to false), while an internal route change re-uses the already-
// running JS -- module-level variables survive across those transitions
// untouched, which is exactly the "did the app already boot once this load"
// signal a full reload vs. a client-side nav needs. `AppEntryMarker`
// (rendered once, in the root layout, present on every route) calls
// `captureInitialPath` on its very first render each page load; `IntroLoader`
// (only ever present on the homepage) reads it back.
let captured = false;
let capturedPath: string | null = null;

export function captureInitialPath(pathname: string) {
  if (captured) return;
  captured = true;
  capturedPath = pathname;
}

export function getInitialPath() {
  return capturedPath;
}
