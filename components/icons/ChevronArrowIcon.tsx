// components/icons/ChevronArrowIcon.tsx
// The mobile menu's row-expand glyph (Figma node 465:2886/465:2886's "Icon
// Shape", "Caprio Website" file) -- a solid filled arrow, not lucide's
// stroke-based ChevronDown/ChevronRight. Reproduced from the real exported
// asset (same reasoning as MenuIcon.tsx): this shape has no stroke at all,
// so a lucide substitute would read as visibly different weight/style.
// currentColor, same pattern as Logo.tsx/icons/SocialIcons.tsx.
//
// Unrotated, the glyph points left. Callers rotate it per state -- see
// drawer.chevron/chevronOpen in components/ui/styles.ts.
import type { SVGProps } from "react";

export function ChevronArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.06953 14C9.60123 14 10 13.6857 10 13.2666C10 13.0651 9.89775 12.8797 9.73415 12.7427L2.29039 7.00403L9.73415 1.2654C9.89775 1.12838 10 0.934945 10 0.741508C10 0.322395 9.60123 0 9.06953 0C8.80368 0 8.57873 0.0805987 8.40491 0.217617L0.306748 6.46402C0.112474 6.59298 0 6.79447 0 7.00403C0 7.20553 0.102249 7.3909 0.296523 7.54404L8.40491 13.7824C8.57873 13.9194 8.80368 14 9.06953 14Z"
        fill="currentColor"
      />
    </svg>
  );
}
