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
//
// Optional `weightTiers` table (owner spec, 2026-09-02, T-Shirts
// category): a second, smaller real <table> (Tier / GSM / Best for by
// default) between the main table/accordion and `note` -- rendered only
// when the prop is actually passed, so a category with no tiered-by-weight
// fabric range (Leggings, Sports Bras, Shorts) renders nothing extra at
// all, confirmed unchanged.
//
// Mobile no longer scrolls horizontally for this secondary table, or for
// the "decoration" structuredBlock variant below (owner spec, 2026-09-06:
// "I dont like to use horizontal scroll for this section, let's use the
// same structure as fabric options... wherever this horizontal scroll
// comes"). `SecondaryTable` below renders the exact same desktop-table /
// mobile-accordion split the main fabric table already uses (hidden below
// xl / xl:hidden), reusing the same `accordionStack`/`accordionItem`/etc.
// recipe keys as one shared local component instead of copy-pasting the
// accordion markup a third time -- fixed once here, so it's fixed on every
// page that renders either variant (weightTiers or decoration), not just
// Cricket/Basketball.
//
// Configurable column headers (owner spec, 2026-09-02, Compression & Base
// Layers category): `weightTiersHeaders` swaps the 3 `<th>` labels only
// (default "Tier"/"GSM"/"Best for") -- the underlying `WeightTier` data
// shape (`{tier, gsm, bestFor}`) is unchanged and reused as-is for
// Compression & Base Layers' own "Level"/"mmHg"/"Used for" table (its
// `tier` field holds "Light"/"Medium"/"Firm", `gsm` holds the mmHg range
// -- same 3 generic columns, just relabeled and re-purposed for a
// genuinely different kind of tiered data, not a new table type). Every
// prior category that already uses `weightTiers` (Hoodies, Sweatshirts,
// Long-Sleeve Tops, Joggers & Track Pants) omits this prop, so their own
// "Tier"/"GSM"/"Best for" headers render exactly as before -- confirmed
// unchanged.
"use client";

import { useId, useState } from "react";

import { FilterChevronIcon } from "@/components/icons/FilterChevronIcon";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { fabricOptions } from "@/components/ui/styles";
import type { FabricOption, NoteSegment, StructuredBlock, WeightTier, WeightTiersHeaders } from "@/content/activewear/types";

const DEFAULT_WEIGHT_TIERS_HEADERS: WeightTiersHeaders = { tier: "Tier", value: "GSM", bestFor: "Best for" };

type SecondaryTableRow = { key: string; title: string; col2: string; col3: string };

/**
 * The secondary table both `weightTiers` and `structuredBlock`'s
 * "decoration" variant render through -- a real `<table>` at `xl`+, a
 * single-open accordion (same recipe keys as the main fabric table's own
 * mobile accordion above) below it, never a horizontally-scrolling table
 * (owner spec, 2026-09-06). Not exported -- purely local to this file, the
 * one place either variant renders.
 */
function SecondaryTable({ headers, rows }: { headers: [string, string, string]; rows: SecondaryTableRow[] }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [h1, h2, h3] = headers;
  // Unique per component instance (this section can render more than one
  // SecondaryTable -- weightTiers and the "decoration" block -- so a plain
  // index-based id would collide between them), stable across re-renders.
  const baseId = useId();

  return (
    <>
      <div className={fabricOptions.weightTiersWrap}>
        <table className={fabricOptions.weightTiersTable}>
          <thead>
            <tr className={fabricOptions.weightTiersHeaderRow}>
              <th scope="col" className={fabricOptions.weightTiersHeaderCell}>
                {h1}
              </th>
              <th scope="col" className={fabricOptions.weightTiersHeaderCell}>
                {h2}
              </th>
              <th scope="col" className={fabricOptions.weightTiersHeaderCell}>
                {h3}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className={fabricOptions.weightTiersRow}>
                <td className={fabricOptions.weightTiersTierCell}>{row.title}</td>
                <td className={fabricOptions.weightTiersGsmCell}>{row.col2}</td>
                <td className={fabricOptions.weightTiersBestForCell}>{row.col3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={fabricOptions.accordionStack}>
        {rows.map((row, index) => {
          const isOpen = index === openIndex;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <div
              key={row.key}
              className={cx(fabricOptions.accordionItem, isOpen ? fabricOptions.accordionItemOpen : fabricOptions.accordionItemClosed)}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={fabricOptions.accordionHeader}
              >
                <span className={isOpen ? undefined : fabricOptions.accordionCollapsedTitle}>{row.title}</span>
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
                      <p className={fabricOptions.accordionLabel}>{h2}</p>
                      <p className={fabricOptions.accordionValue}>{row.col2}</p>
                    </div>
                    <div className={fabricOptions.accordionField}>
                      <p className={fabricOptions.accordionLabel}>{h3}</p>
                      <p className={fabricOptions.accordionValue}>{row.col3}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

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

export type FabricOptionsProps = {
  eyebrow: string;
  heading: string;
  options: FabricOption[];
  /** Optional secondary Tier/GSM/Best-for table -- omit for a category with no tiered-by-weight (or by-level) fabric range. Prefer `structuredBlock` (type "weightTiers") for a NEW category; this pair stays as the direct path every existing category already uses, unchanged. */
  weightTiers?: WeightTier[];
  /** Optional column-header override for `weightTiers` above (e.g. Compression & Base Layers' "Level"/"mmHg"/"Used for") -- defaults to "Tier"/"GSM"/"Best for". */
  weightTiersHeaders?: WeightTiersHeaders;
  /** The reusable block's own discriminated-variant form (owner spec, 2026-09-05, Teamwear/Cricket) -- see `StructuredBlock`'s own comment. Only the "decoration" variant renders anything here; `weightTiers`/`weightTiersHeaders` above stay the direct path for that variant, so passing both is harmless (only one of the two ever actually renders for a given category). */
  structuredBlock?: StructuredBlock;
  note: NoteSegment[];
};

export function FabricOptions({
  eyebrow,
  heading,
  options,
  weightTiers,
  weightTiersHeaders = DEFAULT_WEIGHT_TIERS_HEADERS,
  structuredBlock,
  note,
}: FabricOptionsProps) {
  const [firstRow, ...restRows] = options;
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

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
          recipe's own comment in components/ui/styles.ts).

          Accessibility fix, 2026-09-08: the toggle button now points
          `aria-controls` at its own panel's real `id` (paired with the
          existing `aria-expanded`), and a collapsed panel gets `inert`
          instead of `hidden`/`display:none` -- `inert` removes it from the
          accessibility tree AND the tab order (a screen reader or keyboard
          user could otherwise reach a collapsed panel's focusable content,
          or read text that isn't visibly open) while leaving its `display`
          alone, so the `accordionDetailGrid`/`accordionDetailGridOpen`
          grid-rows collapse animation still plays and the content stays in
          the DOM for crawlers. `ServicesHowWeWork.tsx`'s own mobile
          accordion copies this same recipe's classes into its own JSX (not
          a shared component), so it got the identical `aria-controls`/
          `inert` treatment applied directly there too -- see that file. */}
      <div className={fabricOptions.accordionStack}>
        {options.map((option, index) => {
          const isOpen = index === openIndex;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <div
              key={option.fabric}
              className={cx(fabricOptions.accordionItem, isOpen ? fabricOptions.accordionItemOpen : fabricOptions.accordionItemClosed)}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={fabricOptions.accordionHeader}
              >
                <span className={isOpen ? undefined : fabricOptions.accordionCollapsedTitle}>{option.fabric}</span>
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

      {weightTiers && weightTiers.length > 0 ? (
        <SecondaryTable
          headers={[weightTiersHeaders.tier, weightTiersHeaders.value, weightTiersHeaders.bestFor]}
          rows={weightTiers.map((row) => ({ key: row.tier, title: row.tier, col2: row.gsm, col3: row.bestFor }))}
        />
      ) : null}

      {/* Decoration-method variant of the same reusable block (owner spec,
          2026-09-05, Teamwear/Cricket) -- its own eyebrow + H3 (24px gap,
          owner spec, 2026-09-06 -- `decorationHeading`'s own `mt-6`) above a
          3-column Method / Best for / Notes table, rendered through the same
          `SecondaryTable` the `weightTiers` block above uses. */}
      {structuredBlock && structuredBlock.type === "decoration" ? (
        <div className={fabricOptions.decorationWrap}>
          <p className={fabricOptions.decorationEyebrow}>{structuredBlock.eyebrow}</p>
          <h3 className={fabricOptions.decorationHeading}>{structuredBlock.heading}</h3>
          <SecondaryTable
            headers={["Method", "Best for", "Notes"]}
            rows={structuredBlock.rows.map((row) => ({ key: row.method, title: row.method, col2: row.bestFor, col3: row.notes }))}
          />
          {structuredBlock.note ? <NoteParagraph segments={structuredBlock.note} /> : null}
        </div>
      ) : null}

      <NoteParagraph segments={note} />
    </section>
  );
}
