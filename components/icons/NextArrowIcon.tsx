// components/icons/NextArrowIcon.tsx
// "Explore X" link arrow (Figma "Primary Navigation / Next", node 758:856,
// file dTtJQ9rtKewCqpt2YImiJb) -- a small solid chevron, not lucide's
// stroke-based ChevronRight. Reproduced from the real exported asset (same
// reasoning as ChevronArrowIcon.tsx): this shape has no stroke at all, so a
// lucide substitute would read as visibly different weight/style.
// currentColor (Figma's own export bakes in the orange fill, dropped here so
// callers set colour via their own text colour class, same pattern as every
// other icon component).
// viewBox cropped to the path's own real bounds, "0 4 7 11.6667" -- not
// Figma's literal export box, "0 0 7 16.6667" (owner, 2026-09-07: "the
// chevron is not 100% center aligned to the text cta label, make it fully
// centre aligned"). The path's y-coordinates only span 4 to 15.6667 within
// that taller box (confirmed by parsing every point in `d`), an asymmetric
// ~4px top / ~1px bottom margin baked into Figma's own export frame around
// the glyph -- so a flex `items-center` was already correctly centering
// this SVG's own bounding BOX against the text, but the visible ink inside
// that box sat visibly low. Cropping the viewBox to the path's real bounds
// (no `d` changes -- same shape, same rendered ink size, since callers'
// `h-*` shrinks by the identical proportion the viewBox does) makes the box
// and the ink the same thing, so `items-center` now centers what's
// actually visible. See `productRange.exploreIcon`'s own updated height.
import type { SVGProps } from "react";

export function NextArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 4 7 11.6667" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.651329 15.6667C0.279141 15.6667 0 15.4047 0 15.0555C0 14.8875 0.0715746 14.7331 0.186094 14.6189L5.39673 9.83669L0.186094 5.0545C0.0715746 4.94032 0 4.77912 0 4.61792C0 4.26866 0.279141 4 0.651329 4C0.837424 4 0.994887 4.06717 1.11656 4.18135L6.78528 9.38668C6.92127 9.49415 7 9.66206 7 9.83669C7 10.0046 6.92843 10.1591 6.79243 10.2867L1.11656 15.4853C0.994887 15.5995 0.837424 15.6667 0.651329 15.6667Z"
        fill="currentColor"
      />
    </svg>
  );
}
