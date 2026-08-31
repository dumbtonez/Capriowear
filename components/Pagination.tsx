// components/Pagination.tsx
// PLP page-number strip (Figma node 406:3137's own desktop pagination row;
// mobile cell/pill shape and copy from node 590:1173, 2026-08-30). Real,
// clickable pagination over whatever cards ProductGrid actually has --
// currentPage/totalPages/onPageChange, not Figma's own placeholder
// "1 2 3 ... 39". Cell/pill styling matches Figma's states for what exists
// today: an active page, a disabled edge. "Previous"/"Next" (no "Page"
// suffix) matches node 590:1173's own real copy at both breakpoints --
// corrects this component's earlier, unconfirmed "Previous Page"/"Next
// Page" wording.
import { ChevronArrowIcon } from "@/components/icons/ChevronArrowIcon";
import { pagination } from "@/components/ui/styles";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav aria-label="Pagination" className={pagination.row}>
      <button
        type="button"
        disabled={!hasPrevious}
        onClick={() => onPageChange(currentPage - 1)}
        className={pagination.edgeCell}
        aria-disabled={!hasPrevious}
      >
        {/* Real icon, not the "‹" text glyph this used before (owner
            report, 2026-08-30: "Pagination previous button icon should be
            left to the previous text") -- a discrete element placed before
            the text in a flex row with `gap-1.5` (already on `edgeCell`)
            guarantees the left position regardless of font rendering,
            unlike a glyph baked into the same text node. ChevronArrowIcon
            (MobileNav's own reusable left-pointing chevron) points left
            unrotated already, matching "Previous" directly. */}
        <ChevronArrowIcon className={pagination.edgeIcon} aria-hidden="true" />
        Previous
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={page === currentPage ? pagination.cellActive : pagination.cell}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
        className={pagination.edgeCell}
        aria-disabled={!hasNext}
      >
        Next ›
      </button>
    </nav>
  );
}
