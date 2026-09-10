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
// Desktop cards moved off the 3-column grid onto a real horizontally-
// scrollable row, 2026-09-09 (owner: "how we work still does not follow
// the image size as our services" -- matching Our Services' own media
// RATIO, already done above, isn't the same as matching its real SIZE;
// the grid divided the 1280px content area into 397px columns, not Our
// Services' actual 480px width, and 3 cards at a literal 480px can't all
// fit in 1280px regardless of gap. Confirmed via `AskUserQuestion`: keep
// all 3 cards at the real 480px width and let the row overflow, the last
// card peeking at the edge -- the same "more cards than fit, partial edge
// peek" shape already used by How It Works/Inside the Factory/
// Exhibitions/Trust Signals' own scrollable rows (`useDesktopChevronScroller`,
// components/DesktopChevronScroller.tsx), reused verbatim here rather than
// invented a second time. This split the single dual-render `pathCard`
// (desktop half + mobile accordion half, only one ever visible per
// breakpoint) into two real top-level blocks instead, matching those same
// sections' own "separate DesktopScroller/MobileCarousel functions"
// convention -- the mobile/tablet accordion itself is unchanged, just
// moved into its own explicit wrapper rather than living inside the same
// per-card element as the now-scrollable desktop half.
//
// Mobile/tablet-only, per the owner's own brief -- see `servicesHowWeWork`
// in components/ui/styles.ts for the exact spacing notes.
import { useId, useState } from "react";

import { DesktopChevron, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { FilterChevronIcon } from "@/components/icons/FilterChevronIcon";
import { AsteriskIcon } from "@/components/icons/AsteriskIcon";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { fabricOptions, servicesHowWeWork } from "@/components/ui/styles";
import type { services } from "@/content/services";

export type ServicesHowWeWorkProps = {
  content: typeof services.howWeWork;
};

// 480px, Our Services' own real (unshrunk) card width -- see this file's
// own header comment. 44px gap is this section's own existing confirmed
// desktop column gap (`xl:gap-x-11`, from the retired 3-column grid),
// reused rather than picking a new number.
const CARD_WIDTH = 480;
const CARD_GAP = 44;

function DesktopScroller({ paths }: { paths: typeof services.howWeWork.paths }) {
  const { wrapRef, trackRef, chevronRef, dotRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
    useDesktopChevronScroller(CARD_WIDTH + CARD_GAP);

  return (
    <div
      ref={wrapRef}
      className={servicesHowWeWork.desktopScrollerWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={trackRef} className={servicesHowWeWork.desktopRow}>
        {paths.map((path) => (
          <article key={path.title} className={servicesHowWeWork.desktopCard}>
            <MediaPlaceholder
              label={path.title}
              ratio="8:5"
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
      <DesktopChevron chevronRef={chevronRef} dotRef={dotRef} direction={direction} />
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

        {/* Desktop (xl+): real Our Services card width, horizontally
            scrollable, chevron-paged -- see this file's own header
            comment. */}
        <div className={servicesHowWeWork.desktopWrap}>
          <DesktopScroller paths={content.paths} />
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
