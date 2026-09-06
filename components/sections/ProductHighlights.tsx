// components/sections/ProductHighlights.tsx
// The PDP's icon spec-highlights list (Figma node 634:5393 desktop /
// 638:2547 mobile, "Content", 2026-09-01): MOQ, sample lead time, sizing
// range, DDP -- each its own icon + one line, bordered rows. Identical copy
// and layout at both breakpoints (no responsive split needed, unlike most
// of this project's other PDP/PLP sections). Content is shared, standing
// PDP data (content/activewear/pdpShared.ts's own `pdpSpecHighlights`), not
// per-style -- every PDP renders the same 4 facts.
//
// <ul>/<li>, not styled divs -- same SEO/AEO/GEO pattern already used for
// WhatWeCover's coverage grid and the PLP's quality-points list: a real
// fact list renders as a real HTML list, not a div grid dressed up to look
// like one.
import { ArrowDownAZ, CalendarDays, Package, Ship } from "lucide-react";

import { productHighlights } from "@/components/ui/styles";
import type { PdpSpecHighlight } from "@/content/activewear/types";

// Icon KEY, not a component reference, lives in content (see
// PdpSpecHighlight's own comment) -- this map is the one place a content
// key resolves to the real glyph, so content stays plain data.
const ICONS = {
  package: Package,
  calendarDays: CalendarDays,
  arrowDownAZ: ArrowDownAZ,
  ship: Ship,
};

export type ProductHighlightsProps = {
  items: PdpSpecHighlight[];
};

export function ProductHighlights({ items }: ProductHighlightsProps) {
  return (
    <ul className={productHighlights.root}>
      {items.map((item) => {
        const Icon = ICONS[item.icon];
        return (
          <li key={item.text} className={productHighlights.row}>
            <Icon className={productHighlights.icon} aria-hidden="true" />
            <span className={productHighlights.text}>{item.text}</span>
          </li>
        );
      })}
    </ul>
  );
}
