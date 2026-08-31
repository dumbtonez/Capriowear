// components/sections/FabricOptions.tsx
// The PLP's fabric comparison table (Figma node 579:5632, "Content",
// 2026-08-29): eyebrow + H2, a 3-column table (Fabric / Best For /
// Performance), and a closing note. Header labels sit above row 1 only
// (get_metadata: they share row 1's own group, one 48px internal gap per
// column) with a single divider after that combined block -- not a header
// repeated per row. Every row after that (2 onward) is a plain data row
// with its own top padding and its own trailing divider, including the
// last row (matches the real Figma layer structure exactly, not a guessed
// "no divider after the last row" convention).
//
// Mobile (Figma node 590:1488, "Content", 2026-08-30): the same 4 rows
// rendered as an accordion instead -- first item open by default, one open
// at a time, the rest collapsed to a title + chevron. `"use client"` and a
// single `openIndex` state (not a Set like CategoryFilters' own
// independently-toggleable groups -- this design shows exactly one open
// row) drive it. Desktop's <table> renders unchanged above xl; the
// accordion below xl.
"use client";

import { useState } from "react";

import { FilterChevronIcon } from "@/components/icons/FilterChevronIcon";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { fabricOptions } from "@/components/ui/styles";
import type { FabricOption, NoteSegment } from "@/content/activewear/types";

export type FabricOptionsProps = {
  eyebrow: string;
  heading: string;
  options: FabricOption[];
  note: NoteSegment[];
};

export function FabricOptions({ eyebrow, heading, options, note }: FabricOptionsProps) {
  const [firstRow, ...restRows] = options;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={fabricOptions.section}>
      <div className={fabricOptions.headingBlock}>
        <p className={fabricOptions.eyebrow}>
          <TextReveal text={eyebrow} />
        </p>
        <h2 className={fabricOptions.heading}>
          <TextReveal as="span" text={heading} />
        </h2>
      </div>

      {/* Real <table> markup, not styled divs (SEO/AEO/GEO finalization
          pass, 2026-08-30: "render the fabric table... as real HTML
          tables... so answer engines can lift them"). Column headers
          ("Fabric"/"Best for"/"Performance") stay grouped with row 1's own
          values inside the same <th> (scope="col"), matching this design's
          real, deliberate structure exactly (get_metadata: header labels
          share row 1's own layout group, not a separate header row) --
          `scope="col"` still tells a screen reader or crawler these are
          column headers for every value below them, same as if they were
          empty header cells. Each row's own trailing divider is now a
          border-bottom on that row's own <tr> (fabricOptions.headerRow/
          dataRow), not a separate <td colSpan={3}> element -- a bare
          <tr>/<td> pair with no other content resolved to a genuinely
          zero-width table-cell in every engine tested (a real, reproducible
          quirk: with the table's own display forced to flex, an isolated
          <tr>/<td> falls back to an ambiguous partial table-layout with
          nothing left to size it), where a border on an already-explicitly-
          sized flex <tr> has no such ambiguity. Desktop-only (hidden below
          xl) -- the mobile accordion below covers narrow viewports. */}
      <table className={fabricOptions.table}>
        <thead>
          <tr className={fabricOptions.headerRow}>
            <th scope="col" className={fabricOptions.colFabric}>
              <p className={fabricOptions.colHeader}>Fabric</p>
              <p className={fabricOptions.fabricCell}>{firstRow.fabric}</p>
            </th>
            <th scope="col" className={fabricOptions.col}>
              <p className={fabricOptions.colHeader}>Best for</p>
              <p className={fabricOptions.bodyCell}>{firstRow.bestFor}</p>
            </th>
            <th scope="col" className={fabricOptions.col}>
              <p className={fabricOptions.colHeader}>Performance</p>
              <p className={fabricOptions.bodyCell}>{firstRow.performance}</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {restRows.map((option, index) => (
            // key={index}: a static, presentational list -- never reordered
            // or edited by the user -- same reasoning as CategoryBanner's
            // own trust-bullet list.
            <tr key={index} className={fabricOptions.dataRow}>
              <td className={fabricOptions.fabricCellCol}>{option.fabric}</td>
              <td className={fabricOptions.bodyCellCol}>{option.bestFor}</td>
              <td className={fabricOptions.bodyCellCol}>{option.performance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile accordion (xl:hidden via accordionStack). Same `options`
          data as the desktop table above -- no separate content. Every row
          mounts the SAME structure (header + detail block) regardless of
          open state -- only the grid track (0fr/1fr) and the wrapper's own
          colour classes toggle -- so the collapse/expand transition has a
          real starting frame to animate from/to, and the border's constant
          width keeps the title from shifting position on toggle (see the
          recipe's own comment in components/ui/styles.ts). */}
      <div className={fabricOptions.accordionStack}>
        {options.map((option, index) => {
          const isOpen = index === openIndex;

          return (
            <div
              key={option.fabric}
              className={cx(fabricOptions.accordionItem, isOpen ? fabricOptions.accordionItemOpen : fabricOptions.accordionItemClosed)}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                className={fabricOptions.accordionHeader}
              >
                <span className={isOpen ? undefined : fabricOptions.accordionCollapsedTitle}>{option.fabric}</span>
                <FilterChevronIcon className={cx(fabricOptions.accordionChevron, isOpen && fabricOptions.accordionChevronOpen)} />
              </button>
              <div className={isOpen ? fabricOptions.accordionDetailGridOpen : fabricOptions.accordionDetailGrid}>
                <div className={fabricOptions.accordionDetailClip}>
                  <div className={fabricOptions.accordionDetail}>
                    <div className={fabricOptions.accordionField}>
                      <p className={fabricOptions.accordionLabel}>Best for</p>
                      <p className={fabricOptions.accordionValue}>{option.bestFor}</p>
                    </div>
                    <div className={fabricOptions.accordionField}>
                      <p className={fabricOptions.accordionLabel}>Performance</p>
                      <p className={fabricOptions.accordionValue}>{option.performance}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className={fabricOptions.note}>
        {note.map((segment, index) =>
          segment.bold ? (
            <strong key={index} className={fabricOptions.noteBold}>
              {segment.text}
            </strong>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </p>
    </section>
  );
}
