// components/icons/AsteriskIcon.tsx
// The three-stroke asterisk glyph above Services' "How we work with you"
// closing note (Figma node 750:819, "asterisk-02"). currentColor, same
// pattern as every other icon in this folder -- the accent-orange circle
// behind it is the caller's own wrapper (`servicesHowWeWork.noteIconWrap`,
// bg-accent/10 rounded-full), not baked into this SVG, so this stays a
// plain glyph a caller can recolor/resize like any other icon.
import type { SVGProps } from "react";

export function AsteriskIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...props}>
      <path
        d="M27.0002 14V40M38 20.5L16.0004 33.5M37.9995 33.5L16 20.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
