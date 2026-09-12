"use client";

// components/sections/ServicesHowWeWork.tsx
// /services page, section 3. Figma desktop node 750:770 (owner brief,
// 2026-09-07): a centred intro, 3 "path" cards explaining OEM/ODM/Private
// Label, and a closing note pointing out the three paths can combine.
//
// Cards became collapsible on 2026-09-07 (owner: "oem production odm
// production can we make them collapsable, first one open and other two
// collapsed", then: "can we build this something similar to fabric
// options on PLP?", then "remove the image placeholders from this
// section") -- one open at a time, index 0 open by default, built on the
// PLP `FabricOptions` mobile accordion's own real recipe
// (`fabricOptions.accordionItem`/`accordionHeader`/`accordionChevron`/
// `accordionDetailGrid`/`accordionField`/`accordionLabel`/`accordionValue`,
// reused directly rather than a second near-identical copy of the same
// bordered-box/chevron-rotate/dimmed-collapsed-title pattern).
//
// Corrected the next day (owner, 2026-09-08: "how we work on desktop
// should remain as it was before, the collapsable design is for mobile
// only" -- confirmed against the real Figma frame, node 729:76 /
// 750:770) -- that whole redesign (collapsible, no image, FabricOptions
// styling) had been applied at every width, when it was only ever meant
// for mobile/tablet. Desktop is the section's own original design
// restored verbatim: image, title/subtitle, both detail fields, always
// expanded. Mobile/tablet keeps the accordion. (Originally built as one
// dual-render `pathCard` per item, exactly one half visible per
// breakpoint via CSS -- replaced 2026-09-09 by two real top-level blocks,
// `DesktopScroller` below and a plain mobile stack, once the desktop half
// needed its own scroll mechanism -- see this file's own later header
// comment.)
//
// New, bespoke section, not a reuse of an existing homepage component --
// CapabilityCard (Our Services/How It Works) only carries a single title +
// body per card, not this card's real shape (title + subtitle, then two
// separately-labeled "What it means"/"Best for" blocks), so forcing this
// content into it would mean bolting on unused props rather than a clean
// fit. What IS reused: AsteriskIcon (a real icon component, not an inlined
// one-off <svg>) and content/activewear/types.ts's NoteSegment for the
// closing note's bold-phrase paragraph -- the exact same segmented-note
// pattern ServicesIntro's own paragraph already uses.
//
// The closing note animates in word-by-word (owner, 2026-09-07: "it should
// apply the text animation") via `TextReveal`'s new `segments` mode -- see
// that component's own comment. This is the first real usage of segments
// mode; every other `TextReveal` caller (Hero's H1, etc.) still passes
// plain `text` and is unaffected.
//
// The heading itself now reveals the same way (owner, 2026-09-07: "should
// have the same animation as we applied on some titles on homepage") --
// plain `text` mode, same as every homepage section heading (WhatWeMake,
// CertifiedCompliant, HowItWorks, etc: `<TextReveal as="span" text={h2} />`
// inside the `<h2>`), not a new variant.
//
// Desktop cards briefly moved off the 3-column grid onto a horizontally-
// scrollable chevron-paged row, 2026-09-09 (owner: "how we work still does
// not follow the image size as our services" -- grown to Our Services' own
// 480px card width, which meant 3 cards no longer fit the 1280px content
// area, hence the scroll/chevron). Reverted the next day (owner,
// 2026-09-10: "how we work with you section should not have a chevron, it
// should fit in the 1440 viewport as in design") -- cards restored to the
// section's own original, Figma-confirmed 397px width (see
// `servicesHowWeWork.desktopCard`'s own comment in components/ui/
// styles.ts), which fits all 3 in the 1280px content area with no scroll
// mechanism needed at all. `DesktopRow` (a plain flex row, no refs/mouse
// handlers/chevron) replaces the old `DesktopScroller`, still its own
// top-level block separate from the mobile/tablet accordion below (not
// re-merged into one dual-render `pathCard`) since the two now have
// genuinely different layouts (row vs. accordion), not just different
// visibility.
//
// Mobile/tablet-only, per the owner's own brief -- see `servicesHowWeWork`
// in components/ui/styles.ts for the exact spacing notes.
import { useId, useState } from "react";

import { FilterChevronIcon } from "@/components/icons/FilterChevronIcon";
import { AsteriskIcon } from "@/components/icons/AsteriskIcon";
import { ParallaxMedia } from "@/components/ParallaxMedia";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { fabricOptions, servicesHowWeWork } from "@/components/ui/styles";
import type { services } from "@/content/services";

export type ServicesHowWeWorkProps = {
  content: typeof services.howWeWork;
};

// No chevron/scroll any more (owner, 2026-09-10: "how we work with you
// section should not have a chevron, it should fit in the 1440 viewport
// as in design") -- see `servicesHowWeWork.desktopScrollerWrap`'s own
// comment in components/ui/styles.ts for the full reasoning. Plain row,
// not a scroller: no wrap refs, no mouse handlers, no chevron element.
function DesktopRow({ paths }: { paths: typeof services.howWeWork.paths }) {
  return (
    <div className={servicesHowWeWork.desktopScrollerWrap}>
      <div className={servicesHowWeWork.desktopRow}>
        {paths.map((path) => (
          <article key={path.title} className={servicesHowWeWork.desktopCard}>
            <ParallaxMedia
              label={path.title}
              image={path.image}
              ratio="397:234"
              radius="none"
              showLabel={false}
              className={servicesHowWeWork.pathMedia}
            />
            <div className={servicesHowWeWork.pathTextCol}>
              <div className={servicesHowWeWork.pathTitleGroup}>
                <h3 className={servicesHowWeWork.pathTitle}>{path.title}</h3>
                <p className={servicesHowWeWork.pathSubtitleDesktop}>{path.subtitle}</p>
              </div>
              <div className={servicesHowWeWork.pathDetailGroup}>
                <div className={servicesHowWeWork.pathDetailItem}>
                  <p className={servicesHowWeWork.pathDetailLabel}>What it means</p>
                  <p className={servicesHowWeWork.pathDetailBody}>{path.whatItMeans}</p>
                </div>
                <div className={servicesHowWeWork.pathDetailItem}>
                  <p className={servicesHowWeWork.pathDetailLabel}>Best for</p>
                  <p className={servicesHowWeWork.pathDetailBody}>{path.bestFor}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ServicesHowWeWork({ content }: ServicesHowWeWorkProps) {
  // Index 0 open by default (owner: "first one open and other two
  // collapsed") -- same as `FabricOptions`' own accordion default.
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <section className={servicesHowWeWork.section}>
      <div className={servicesHowWeWork.inner}>
        <div className={servicesHowWeWork.introWrap}>
          <TextReveal as="h2" text={content.heading} className={servicesHowWeWork.heading} />
          <p className={servicesHowWeWork.subheading}>{content.subheading}</p>
        </div>

        {/* Desktop (xl+): plain row, all 3 cards fit the 1440px frame with
            no scroll/chevron -- see this file's own header comment. */}
        <div className={servicesHowWeWork.desktopWrap}>
          <DesktopRow paths={content.paths} />
        </div>

        {/* Mobile/tablet (below xl): collapsible, FabricOptions-styled,
            no image -- unchanged from before, just its own explicit
            wrapper now instead of living inside the same per-card element
            as the desktop half above. */}
        <div className={servicesHowWeWork.mobileList}>
          {content.paths.map((path, index) => {
            const isOpen = index === openIndex;
            const panelId = `${baseId}-panel-${index}`;

            return (
              <div
                key={path.title}
                className={cx(
                  fabricOptions.accordionItem,
                  isOpen ? fabricOptions.accordionItemOpen : fabricOptions.accordionItemClosed,
                )}
              >
                {/* Accessibility fix, 2026-09-08: same treatment as
                    FabricOptions' own mobile accordion (see that file's
                    header comment on its accordion) -- `aria-controls` on
                    the toggle points at the panel's real `id`, and the
                    collapsed panel is `inert` rather than hidden, so it
                    drops out of the accessibility tree and tab order
                    without touching the grid-rows collapse animation or
                    removing it from the DOM. */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className={fabricOptions.accordionHeader}
                >
                  <div className={servicesHowWeWork.pathTitleGroup}>
                    <h3
                      className={cx(servicesHowWeWork.pathTitle, !isOpen && fabricOptions.accordionCollapsedTitle)}
                    >
                      {path.title}
                    </h3>
                    {isOpen ? <p className={servicesHowWeWork.pathSubtitle}>{path.subtitle}</p> : null}
                  </div>
                  <FilterChevronIcon
                    className={cx(fabricOptions.accordionChevron, isOpen && fabricOptions.accordionChevronOpen)}
                  />
                </button>
                <div
                  id={panelId}
                  inert={!isOpen}
                  className={isOpen ? fabricOptions.accordionDetailGridOpen : fabricOptions.accordionDetailGrid}
                >
                  <div className={fabricOptions.accordionDetailClip}>
                    <div className={fabricOptions.accordionDetail}>
                      <div className={fabricOptions.accordionField}>
                        <p className={fabricOptions.accordionLabel}>What it means</p>
                        <p className={fabricOptions.accordionValue}>{path.whatItMeans}</p>
                      </div>
                      <div className={fabricOptions.accordionField}>
                        <p className={fabricOptions.accordionLabel}>Best for</p>
                        <p className={fabricOptions.accordionValue}>{path.bestFor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className={servicesHowWeWork.noteWrap}>
          <span className={servicesHowWeWork.noteIconWrap}>
            <AsteriskIcon className={servicesHowWeWork.noteIcon} />
          </span>
          <TextReveal
            as="p"
            segments={content.note}
            boldClassName={servicesHowWeWork.noteParagraphBold}
            className={servicesHowWeWork.noteParagraph}
          />
        </div>
      </div>
    </section>
  );
}
