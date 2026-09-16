// components/sections/ComparisonTable.tsx
// The PLP's optional comparison table (owner spec, 2026-09-16, Wraps,
// Straps & Sleeves: "Three jobs, ten styles" -- Wraps vs. Straps and hooks
// vs. Sleeves). Sits directly under the style listing, between the two
// page-level section dividers (owner spec, 2026-09-16: moved here from
// directly under the hero, "should come under the product tiles") -- see
// app/lifting-gears/[category]/page.tsx's own placement comment.
//
// Reuses FabricOptions.tsx's own recipe keys as-is rather than adding new
// styles.ts tokens (design-system rule: styling only through existing
// tokens/recipes) -- the headingBlock/heading, the `weightTiers*` desktop-
// table cell classes (already column-count-agnostic utility strings, not
// literally tied to "Tier/GSM/Best for" semantics), and the `accordion*`
// mobile pattern FabricOptions' own secondary table already uses for a
// "real table at xl+, one-open accordion below it" split with no
// horizontal scroll. Genuinely new here is only the arbitrary-column-count
// row rendering (`ComparisonTableContent.headers`/`.rows` isn't a fixed
// 3-column shape like `FabricOption`), which is why this is its own
// component rather than a `FabricOptions` prop.
//
// Outer shell strips `fabricOptions.section`'s own `pt`/`pb` (owner spec,
// 2026-09-16: "every section should have same space as 120px from the
// top") -- this section now sits directly between the page's own two
// hairline dividers, each already supplying `xl:mb-[120px]` on its own
// side; keeping `fabricOptions.section`'s baked-in `xl:pt-[80px]`/
// `xl:pb-[120px]` on top of that would double-count the gap (measured
// live before this fix: 200px, not 120px). Same "the divider is the sole
// source of this gap, the section itself carries none" pattern
// `whatWeCover.section` already established for the identical reason (see
// that recipe's own comment, components/ui/styles.ts).
"use client";

import { useId, useState } from "react";

import { Eyebrow } from "@/components/Eyebrow";
import { FilterChevronIcon } from "@/components/icons/FilterChevronIcon";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { fabricOptions } from "@/components/ui/styles";
import type { ComparisonTableContent } from "@/content/activewear/types";

export function ComparisonTable({ content }: { content: ComparisonTableContent }) {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();
  const [, ...columnHeaders] = content.headers;

  return (
    <section className={fabricOptions.sectionFlushBottom}>
      <div className={fabricOptions.headingBlock}>
        <Eyebrow tone="light">
          <TextReveal text={content.eyebrow} />
        </Eyebrow>
        <h2 className={fabricOptions.heading}>
          <TextReveal as="span" text={content.heading} />
        </h2>
      </div>

      {/* Desktop, real <table> -- see FabricOptions.tsx's own comment on
          why these are real HTML tables, not styled divs (AEO/GEO: answer
          engines can lift them directly). */}
      <div className={fabricOptions.weightTiersWrapWide}>
        <table className={fabricOptions.weightTiersTable}>
          <thead>
            <tr className={fabricOptions.weightTiersHeaderRow}>
              {content.headers.map((header, index) => (
                <th key={index} scope="col" className={fabricOptions.weightTiersHeaderCell}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.rows.map((row) => (
              <tr key={row.label} className={fabricOptions.weightTiersRow}>
                <td className={fabricOptions.weightTiersTierCell}>{row.label}</td>
                {row.values.map((value, index) => (
                  <td
                    key={index}
                    className={index === row.values.length - 1 ? fabricOptions.weightTiersBestForCell : fabricOptions.weightTiersGsmCell}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile accordion, same mechanic as FabricOptions' own secondary
          table (single open row, grid-rows 0fr<->1fr, no horizontal
          scroll). */}
      <div className={fabricOptions.accordionStack}>
        {content.rows.map((row, index) => {
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
                    {row.values.map((value, index) => (
                      <div key={index} className={fabricOptions.accordionField}>
                        <p className={fabricOptions.accordionLabel}>{columnHeaders[index]}</p>
                        <p className={fabricOptions.accordionValue}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
