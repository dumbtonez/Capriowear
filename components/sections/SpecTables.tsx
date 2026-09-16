// components/sections/SpecTables.tsx
// The PLP's optional array of standalone "Spec / Options" tables (owner
// spec, 2026-09-16, Wraps, Straps & Sleeves) -- that category needs 4
// independent tables (wraps, straps and hooks, lifting hook, sleeves), each
// with its own eyebrow + H2, rather than the single main/secondary table
// pair FabricOptions.tsx's `fabricOptions`/`weightTiers` support. Rendered
// after the trust block, before the FAQ -- see
// app/lifting-gears/[category]/page.tsx's own placement.
//
// Reuses FabricOptions.tsx's own recipe keys as-is (see ComparisonTable.tsx's
// own comment for the same reasoning) -- one `section` wrapper for the
// whole run of tables, each table its own `headingBlock`/`heading` pair
// followed by the same 2-column desktop-table/mobile-accordion split, and a
// single shared closing `note` after the last table.
"use client";

import { useId, useState } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { FilterChevronIcon } from "@/components/icons/FilterChevronIcon";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { fabricOptions } from "@/components/ui/styles";
import type { NoteSegment, SpecTable } from "@/content/activewear/types";

function NoteParagraph({ segments }: { segments: NoteSegment[] }) {
  return (
    <p className={fabricOptions.note}>
      {segments.map((segment, index) =>
        segment.bold ? (
          <strong key={index} className={fabricOptions.noteBold}>
            {segment.text}
          </strong>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

function OneSpecTable({ table, spacingClassName }: { table: SpecTable; spacingClassName: string }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <div className={spacingClassName}>
      {/* md:max-w-[780px] override (owner spec, 2026-09-16) -- wider than
          `fabricOptions.headingBlock`'s own shared 750px: at 750px the
          Sleeve Specs heading ("Thickness, stated in millimeters, not a
          size letter alone") wrapped to 3 lines, not 2. 780px is the
          narrowest width that fits it on 2 lines (measured live), and
          keeps every other spec-table heading's own wrap at 2 lines too --
          local to this component's own headings only, `fabricOptions.
          headingBlock` itself (reused by `FabricOptions`/`ComparisonTable`
          elsewhere) is unaffected. */}
      <div className={cx(fabricOptions.headingBlock, "md:max-w-[780px]")}>
        <Eyebrow tone="light">
          <TextReveal text={table.eyebrow} />
        </Eyebrow>
        <h2 className={fabricOptions.heading}>
          <TextReveal as="span" text={table.heading} />
        </h2>
      </div>

      <div className={fabricOptions.weightTiersWrapWide}>
        <table className={fabricOptions.weightTiersTable}>
          <thead>
            <tr className={fabricOptions.weightTiersHeaderRow}>
              <th scope="col" className={fabricOptions.weightTiersHeaderCell}>
                Spec
              </th>
              <th scope="col" className={fabricOptions.weightTiersHeaderCell}>
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {/* "border-b border-[#e8ecf1]" only, not `fabricOptions.
                weightTiersRow` (owner spec, 2026-09-16: "add separator
                under [the last row of each spec table]") -- that shared
                recipe's own `last:border-b-0` strips the divider from the
                last row, correct for FabricOptions' own secondary table
                (immediately followed by its own closing note, no visual
                gap to bridge) but wrong here: each spec table's own last
                row (Closure, Padding, Attachment, Sizing) sits right above
                the next table's heading, so it needs its own closing
                divider like every row above it, not a bare edge. */}
            {table.rows.map((row) => (
              <tr key={row.label} className="border-b border-[#e8ecf1]">
                <td className={fabricOptions.weightTiersTierCell}>{row.label}</td>
                <td className={fabricOptions.weightTiersBestForCell}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={fabricOptions.accordionStack}>
        {table.rows.map((row, index) => {
          const isOpen = index === openIndex;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <div
              key={row.label}
              className={cx(fabricOptions.accordionItem, isOpen ? fabricOptions.accordionItemOpen : fabricOptions.accordionItemClosed)}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={fabricOptions.accordionHeader}
              >
                <span className={isOpen ? undefined : fabricOptions.accordionCollapsedTitle}>{row.label}</span>
                <FilterChevronIcon className={cx(fabricOptions.accordionChevron, isOpen && fabricOptions.accordionChevronOpen)} />
              </button>
              <div
                id={panelId}
                inert={!isOpen}
                className={isOpen ? fabricOptions.accordionDetailGridOpen : fabricOptions.accordionDetailGrid}
              >
                <div className={fabricOptions.accordionDetailClip}>
                  <div className={fabricOptions.accordionDetail}>
                    <div className={fabricOptions.accordionField}>
                      <p className={fabricOptions.accordionLabel}>Options</p>
                      <p className={fabricOptions.accordionValue}>{row.value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SpecTables({ tables, note }: { tables: SpecTable[]; note?: NoteSegment[] }) {
  return (
    <section className={fabricOptions.section}>
      {tables.map((table, index) => (
        // First table sits directly under TrustPoints with the section's
        // own top padding (0 below `xl`, matched by TrustPoints' own
        // `pb-[72px]` -- a real, deliberate 72px gap, same standard used
        // everywhere else on this page). Every table after that gets the
        // same flat 72px below `xl` (owner spec, 2026-09-16: "make 72px
        // each section, keep it consistent" -- an earlier pass set this to
        // `mt-[97px]`, matching a text-to-text measurement that turned out
        // to include a text node's own line-height/descender space on top
        // of the real 72px box-to-box gap, not a genuine second value).
        // `xl:mt-[120px]` unchanged -- still the explicitly requested
        // desktop-only value.
        <OneSpecTable key={table.heading} table={table} spacingClassName={index === 0 ? "" : "mt-[72px] xl:mt-[120px]"} />
      ))}
      {note ? <NoteParagraph segments={note} /> : null}
    </section>
  );
}
