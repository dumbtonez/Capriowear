// components/sections/ProductGrid.tsx
// The Activewear PLP's product grid (Figma node 406:3137, "Product
// Container", 2026-08-28; mobile grid from node 590:1173, 2026-08-30) --
// the grid itself and pagination. The title + subline + gender filter
// chips this used to render inline moved out to CategoryMetaStrip.tsx
// (2026-08-28): Figma has that row as a full-width sibling above the
// filters+grid row, not scoped to this grid's own column, so it can't stay
// part of this component without indenting it.
//
// Page size differs by breakpoint (owner report, 2026-08-29 for desktop,
// 2026-08-30 for mobile: "same rule apply to pagination if more 8 or less
// than 8 items are there don't show the pagination, if more than 8 then
// show pagination" -- 8 is node 590:1173's own real mobile grid, a 2x4
// tile count, distinct from desktop's confirmed 3x3/9): a real 2-column
// mobile grid and a real 3-column desktop grid can't share one PAGE_SIZE
// without one of them getting a wrong-looking partial last row or an
// unnecessary page 2 -- so `pageSize` tracks the same `xl` (1280px)
// breakpoint every other responsive split on this page already uses, via
// `matchMedia` (mirrors Header.tsx's own window-listener pattern for
// scroll state). `totalPages > 1` below is *all* the auto show/hide logic
// needs -- it already means "don't render Pagination at or under a full
// page", so it holds at both page sizes with no extra branching.
"use client";

import { useEffect, useState } from "react";

import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { productGrid } from "@/components/ui/styles";
import type { StyleCard } from "@/content/activewear/types";

export type ProductGridProps = {
  cards: StyleCard[];
};

const MOBILE_PAGE_SIZE = 8;
const DESKTOP_PAGE_SIZE = 9;

export function ProductGrid({ cards }: ProductGridProps) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DESKTOP_PAGE_SIZE);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const update = () => setPageSize(query.matches ? DESKTOP_PAGE_SIZE : MOBILE_PAGE_SIZE);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const totalPages = Math.max(1, Math.ceil(cards.length / pageSize));
  // Adjusted during render (React's own pattern for state that must track a
  // prop the instant it changes, same as MobileNav's own `rendered`/
  // `revealed` state) rather than in an effect -- clamps `page` back into
  // range the same render a breakpoint crossing shrinks `totalPages` below
  // the current page, instead of one render later.
  if (page > totalPages) setPage(totalPages);
  const pageCards = cards.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={productGrid.root}>
      <div className={productGrid.grid}>
        {pageCards.map((card) => (
          <ProductCard key={card.slug} {...card} />
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
    </div>
  );
}
