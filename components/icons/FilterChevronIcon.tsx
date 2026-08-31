// components/icons/FilterChevronIcon.tsx
// CategoryFilters' expand/collapse glyph (Figma node 406:3085, "Filters"
// group, "Caprio Website" file) -- a small solid chevron-down, reproduced
// from the exported asset. currentColor, same pattern as
// BreadcrumbArrowIcon.tsx/ChevronArrowIcon.tsx. Figma's two states
// ("Icon"/"Icon1") export the exact same path, differing only in fill
// colour (muted grey collapsed, black expanded) -- one glyph here, colour
// and rotation (180deg when expanded) both driven by the caller.
import type { SVGProps } from "react";

export function FilterChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 3.55828C11 3.23926 10.7755 3 10.4761 3C10.3322 3 10.1998 3.06135 10.1019 3.15951L6.00288 7.62577L1.90386 3.15951C1.80599 3.06135 1.66782 3 1.52965 3C1.23028 3 1 3.23926 1 3.55828C1 3.71779 1.05757 3.85276 1.15544 3.95706L5.61716 8.81595C5.70927 8.93252 5.8532 9 6.00288 9C6.1468 9 6.27922 8.93865 6.3886 8.82209L10.8446 3.95706C10.9424 3.85276 11 3.71779 11 3.55828Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
      />
    </svg>
  );
}
