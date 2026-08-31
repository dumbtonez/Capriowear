// components/icons/BreadcrumbArrowIcon.tsx
// Breadcrumb's separator glyph (Figma node 406:3080, "Breadcrumb Arrow",
// "Caprio Website" file) -- a small solid right-pointing chevron, reproduced
// from the exported asset. currentColor, same pattern as ChevronArrowIcon.tsx.
import type { SVGProps } from "react";

export function BreadcrumbArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M2 0.666667V7.33333L6 4L2 0.666667Z" fill="currentColor" />
    </svg>
  );
}
