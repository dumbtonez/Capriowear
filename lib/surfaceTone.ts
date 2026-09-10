// lib/surfaceTone.ts
// Extracted from Header.tsx (owner, 2026-09-07: labs.google's own nav swaps
// its text colour to always contrast whatever section is currently
// scrolled behind it) so a second caller (FloatingSocialButtons, 2026-09-11:
// "make it a bit dark on white and should go white on blck bacground")
// could reuse the exact same detection instead of a second implementation.
//
// Rather than tagging every section on every page with its own light/dark
// identity (this site has 15+ section components across home/services/every
// PLP/PDP, and it would need re-auditing on every new page), this derives
// tone from what's actually rendered: every real section here already
// expresses its own tone as a real `background-color` (`bg-ink`, or nothing,
// falling through to `<main>`'s own `bg-paper`) -- confirmed no
// gradient/image CSS backgrounds exist anywhere in components/ui/styles.ts.
// So this walks up from a given point to the first ancestor with a real
// (non-fully-transparent) background and classifies it by perceptual
// luminance, instead of reading a hand-maintained tag that could drift out
// of sync with what's actually on screen.
//
// Known accepted limitation, not a bug: a future full-bleed image/video
// section with no explicit `bg-*` of its own reads as whichever ancestor's
// tone it inherits, not a sampled pixel colour -- the same thing the
// reference site's own per-section tagging would do anyway.
//
// Callers sampling a point that a fixed/floating element of their own sits
// on top of (e.g. FloatingSocialButtons sampling near its own corner) must
// pick a point NOT covered by that element itself -- `elementFromPoint`
// returns the topmost element at that pixel, and since a `position: fixed`
// element is typically a sibling of the page content in the DOM (not an
// ancestor), walking up ITS OWN ancestor chain would never reach the real
// section behind it. Header.tsx works around this by sampling just below
// its own bottom edge, not literally underneath itself; other callers need
// their own equivalent offset.
export function getSurfaceToneAt(x: number, y: number): "dark" | "light" {
  let el = document.elementFromPoint(x, y) as Element | null;
  while (el && el !== document.documentElement) {
    const bg = getComputedStyle(el).backgroundColor;
    const match = bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      // > 0, not "must be fully opaque" -- no genuinely translucent section
      // background exists today, but a future one should still count as
      // "the thing visibly there" rather than being skipped past.
      if (alpha > 0) {
        const [r, g, b] = [Number(match[1]), Number(match[2]), Number(match[3])];
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance < 128 ? "dark" : "light";
      }
    }
    el = el.parentElement;
  }
  // <main> and <footer> both set their own bg-paper directly (see every
  // page's own <main className="... bg-paper"> and Footer.tsx's
  // `footer.root`), so this is rarely actually reached.
  return "light";
}
