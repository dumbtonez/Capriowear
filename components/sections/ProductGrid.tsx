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

// The category title block (CategoryMetaStrip.tsx's own root, "Sports Bras"
// etc.) -- see this component's pagination-scroll comment below for why
// this, not the grid, is the real target.
const PLP_TITLE_ID = "plp-title";

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

  // Owner report, 2026-09-03: clicking a page number left the scroll
  // position where it was (mid-page, wherever Pagination itself sits),
  // instead of returning to the top of the product list. Two earlier
  // attempts both scrolled the GRID's own container (not the section root,
  // which would include CategoryMetaStrip's title/filters above it) into
  // view -- confirmed live, twice, to still "land in the middle" (owner,
  // 2026-09-03, both directions) no matter the timing (synchronous, one
  // `requestAnimationFrame`, a double `requestAnimationFrame`) or scroll
  // mode (animated "smooth", instant). The actual bug was never the timing
  // -- it was the TARGET: the owner's own words, "it should land me ...
  // on top of the title where it says sports bras", name the category
  // title block (CategoryMetaStrip.tsx's own root, rendered by the page
  // ABOVE this grid, not inside it) -- scrolling the grid's own top into
  // view instead left that title scrolled out of view above the fold,
  // which reads as "landing in the middle" regardless of how precisely
  // the grid itself was aligned. Fixed by targeting `#plp-title` (that
  // root's own id) via `getElementById`, since it lives in a sibling
  // component this one has no ref to. Double `requestAnimationFrame` is
  // kept regardless -- a real, independent fix for the grid's own
  // count/height changing under the click (measure after the browser has
  // actually painted the new page, not before).
  //
  // `behavior: "instant"` was a deliberate step while the target was still
  // wrong -- a "moving target" theory turned out not to be the real bug
  // (see above), so with the target now fixed (`#plp-title`'s own position
  // never changes with the page), owner request, 2026-09-03: bring back an
  // animated transition into the new page. `"smooth"` is safe again now
  // that there's nothing shifting underneath it to race against.
  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(PLP_TITLE_ID)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  };

  return (
    <div className={productGrid.root}>
      <div className={productGrid.grid}>
        {pageCards.map((card) => (
          <ProductCard key={card.slug} {...card} />
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />}
    </div>
  );
}
