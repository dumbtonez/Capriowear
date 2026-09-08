// components/sections/OurFactoryDetails.tsx
// /our-factory page, section 6 (after the "Journey" gallery, section 5).
// Figma desktop node 857:2088 ("Content"), "The details you would check on
// a sample" -- owner brief, 2026-09-08. A dark eyebrow+H2+lead-paragraph
// header, then one large rounded card holding a left accordion (one item
// open at a time, a vertical prev/next stepper) and a right image panel
// that crossfades to match the active item -- the same visual language as
// Apple's macbook-pro "Take a closer look" section per the brief, but a
// left-accordion synced to an image, not pinned scroll markers.
//
// Height animation reuses the exact mechanism FabricOptions.tsx/
// ServicesHowWeWork.tsx already established: CSS grid-template-rows
// (0fr -> 1fr) on the panel plus an overflow-hidden clip, so it animates a
// real layout height without ever measuring a pixel value in JS. This
// section layers two things on top of that same technique (owner spec:
// "animations have to be smooth and fluid"), not a different mechanism:
// asymmetric open/close timing (340ms opening, 260ms collapsing) and the
// inner text's own delayed fade-and-rise so the reveal feels like an
// unfold rather than the height and the text snapping open in lockstep.
// Both directions use `cubic-bezier(0.22,1,0.36,1)` (owner, 2026-09-09:
// "chips animation is very jerky" -- see `ourFactoryDetails.detailGrid`'s
// own comment for the full fix, which also removes a real flex-direction
// snap on `ourFactoryDetails.item` that the named `ease-out`/`ease-in`
// curves alone couldn't have fixed).
//
// Accessibility: every item's toggle is a real <button> with
// `aria-expanded`/`aria-controls` pointing at its own panel id (same
// pattern as FabricOptions' own 2026-09-08 accessibility fix). A collapsed
// panel gets `inert` (out of the tab order and the accessibility tree)
// but stays mounted, so all 7 descriptions are real, crawlable DOM text on
// load, not lazily rendered. The stepper's two buttons are real buttons
// with their own `aria-label`s, disabled at the first/last item; the same
// ArrowUp/ArrowDown keys move the open item when focus is inside the list,
// mirroring the stepper's own step direction.
"use client";

import { Plus } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { FilterChevronIcon } from "@/components/icons/FilterChevronIcon";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { ourFactoryDetails } from "@/components/ui/styles";
import type { ourFactory } from "@/content/our-factory";

export type OurFactoryDetailsProps = {
  content: typeof ourFactory.sampleDetails;
};

export function OurFactoryDetails({ content }: OurFactoryDetailsProps) {
  const { items } = content;
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  // Real measured pixel width per item's own closed shape, not a CSS
  // keyword -- `ourFactoryDetails.item`'s own comment covers why (two
  // CSS-only attempts, both confirmed broken via real frame sampling).
  // Measured from a HIDDEN clone (`visibility:hidden`, not `display:none`
  // -- the latter has zero layout size and can't be measured), one per
  // item, always rendered in its own closed shape regardless of which
  // item is actually open in the visible list -- so every width is
  // available immediately, not just the one the user happens to have
  // toggled. `useLayoutEffect`, not `useEffect`: fires before the browser
  // paints, so applying the measured width the same frame it's read
  // leaves no visible flash on a client-rendered page.
  const measureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [chipWidths, setChipWidths] = useState<number[]>([]);
  useLayoutEffect(() => {
    setChipWidths(measureRefs.current.map((el) => el?.offsetWidth ?? 0));
  }, [items]);

  const isFirst = openIndex === 0;
  const isLast = openIndex === items.length - 1;
  const goPrev = () => setOpenIndex((index) => Math.max(0, index - 1));
  const goNext = () => setOpenIndex((index) => Math.min(items.length - 1, index + 1));

  // ArrowUp/ArrowDown move the open item the same way the stepper buttons
  // do, whenever focus is anywhere inside the list (a focused item toggle
  // button, most often) -- `preventDefault` stops the browser's own
  // page-scroll response to these keys, since they have a real meaning
  // here instead.
  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      goNext();
    }
  };

  return (
    <section className={ourFactoryDetails.section}>
      <div className={ourFactoryDetails.inner}>
        <div className={ourFactoryDetails.headingRow}>
          <div className={ourFactoryDetails.headingCol}>
            <TextReveal as="h2" text={content.heading} className={ourFactoryDetails.heading} />
          </div>
          <p className={ourFactoryDetails.lead}>
            {content.leadParagraph.map((segment, index) =>
              segment.bold ? (
                <span key={index} className={ourFactoryDetails.leadBold}>
                  {segment.text}
                </span>
              ) : (
                <span key={index}>{segment.text}</span>
              ),
            )}
          </p>
        </div>

        <div className={ourFactoryDetails.card}>
          {/* Mobile-only (owner spec: "image panel on top, accordion list
              full-width below") -- rendered first in DOM so it lands above
              the list at every width below `xl`, where the stepper and
              desktop image column below are both hidden. Just the
              currently-open item's own image, no crossfade stack -- a
              tap on any pill is enough to drive it at this width, so the
              instant preloaded-swap the desktop crossfade needs doesn't
              apply here. */}
          <div className={ourFactoryDetails.mobileImageWrap}>
            <MediaPlaceholder
              label={items[openIndex].imageAlt}
              image={items[openIndex].image}
              ratio="730:644"
              radius="none"
              tone="dark"
              placeholderClassName={ourFactoryDetails.imagePlaceholderFill}
              showLabel={false}
            />
          </div>

          <div className={ourFactoryDetails.stepperCol}>
            <button
              type="button"
              onClick={goPrev}
              disabled={isFirst}
              aria-label="Previous detail"
              className={ourFactoryDetails.stepperButton}
            >
              <FilterChevronIcon className={cx(ourFactoryDetails.stepperIcon, ourFactoryDetails.stepperIconUp)} />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={isLast}
              aria-label="Next detail"
              className={ourFactoryDetails.stepperButton}
            >
              <FilterChevronIcon className={ourFactoryDetails.stepperIcon} />
            </button>
          </div>

          {/* Hidden width-measurement clones -- see the `chipWidths` state
              comment above. Each renders the exact closed-shape markup
              (icon + label, same padding) so its own `offsetWidth` matches
              the real closed pill precisely; `invisible` (not `hidden`)
              keeps it participating in layout while unpainted, and
              `aria-hidden`/`pointer-events-none` keep it out of the
              accessibility tree and out of the way of real clicks.
              `w-full overflow-hidden` (real bug, found live: a real
              horizontal page overflow at the 360px min mobile viewport) --
              `visibility:hidden` content still counts toward the page's
              own `scrollWidth` even though nothing paints, so on a
              narrow viewport the widest label's own natural width (e.g.
              "Gusseted construction") could exceed the visible viewport
              and silently force real horizontal scroll. Capping this
              wrapper's own width to its positioned ancestor (effectively
              the viewport, since nothing between here and it is
              `position: relative`) and clipping anything past that
              removes it from the page's scroll size entirely, regardless
              of how wide any one label's own measurement box gets. */}
          <div
            aria-hidden="true"
            className="pointer-events-none invisible absolute left-0 top-0 flex w-full flex-col items-start overflow-hidden"
          >
            {items.map((item, index) => (
              <div
                key={item.label}
                ref={(el) => {
                  measureRefs.current[index] = el;
                }}
                className={cx(ourFactoryDetails.item, ourFactoryDetails.itemClosed)}
              >
                <div className={cx(ourFactoryDetails.itemButton, ourFactoryDetails.itemButtonClosed)}>
                  <span className={cx(ourFactoryDetails.itemIconWrap, ourFactoryDetails.itemIconWrapClosed)}>
                    <Plus className={ourFactoryDetails.itemIcon} />
                  </span>
                  <span className={ourFactoryDetails.itemLabel}>{item.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className={ourFactoryDetails.listCol} onKeyDown={handleListKeyDown}>
            {items.map((item, index) => {
              const isOpen = index === openIndex;
              const panelId = `${baseId}-panel-${index}`;

              return (
                <div
                  key={item.label}
                  className={cx(ourFactoryDetails.item, isOpen ? ourFactoryDetails.itemOpen : ourFactoryDetails.itemClosed)}
                  style={isOpen ? undefined : { width: chipWidths[index] || undefined }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={cx(
                      ourFactoryDetails.itemButton,
                      isOpen ? ourFactoryDetails.itemButtonOpen : ourFactoryDetails.itemButtonClosed,
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        ourFactoryDetails.itemIconWrap,
                        isOpen ? ourFactoryDetails.itemIconWrapOpen : ourFactoryDetails.itemIconWrapClosed,
                      )}
                    >
                      <Plus className={ourFactoryDetails.itemIcon} />
                    </span>
                    <span className={cx(ourFactoryDetails.itemLabel, isOpen && ourFactoryDetails.itemLabelOpen)}>
                      {item.label}
                    </span>
                  </button>
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={isOpen ? ourFactoryDetails.detailGridOpen : ourFactoryDetails.detailGrid}
                  >
                    <div className={ourFactoryDetails.detailClip}>
                      <div className={isOpen ? ourFactoryDetails.detailInnerOpen : ourFactoryDetails.detailInner}>
                        <p className={ourFactoryDetails.itemDescription}>{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={ourFactoryDetails.imageCol}>
            {items.map((item, index) => (
              <div
                key={item.label}
                className={cx(
                  ourFactoryDetails.imageLayer,
                  index === openIndex ? ourFactoryDetails.imageLayerActive : ourFactoryDetails.imageLayerInactive,
                )}
              >
                <MediaPlaceholder
                  label={item.imageAlt}
                  image={item.image}
                  ratio="730:644"
                  radius="none"
                  tone="dark"
                  placeholderClassName={ourFactoryDetails.imagePlaceholderFill}
                  showLabel={false}
                  className="size-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
