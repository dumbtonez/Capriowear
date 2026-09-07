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
// for mobile/tablet. Each card now renders BOTH blocks, exactly one
// visible per breakpoint (`pathCardDesktop`, `hidden xl:flex` /
// `pathCardMobile`, `xl:hidden`) -- the same "two real per-breakpoint
// renders, not one CSS-juggled hybrid" pattern `FabricOptions` itself
// already uses (a real `<table>` plus a separate accordion), not a new
// convention. Desktop is the section's own original design restored
// verbatim: image, title/subtitle, both detail fields, always expanded.
// Mobile/tablet keeps the accordion.
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
// Desktop-only for now, per the owner's own brief -- see `servicesHowWeWork`
// in components/ui/styles.ts for the exact spacing notes and the
// responsive-safe (not confirmed-mobile) caveat on the cards grid.
import { useState } from "react";

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

export function ServicesHowWeWork({ content }: ServicesHowWeWorkProps) {
  // Index 0 open by default (owner: "first one open and other two
  // collapsed") -- same as `FabricOptions`' own accordion default.
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={servicesHowWeWork.section}>
      <div className={servicesHowWeWork.inner}>
        <div className={servicesHowWeWork.introWrap}>
          <TextReveal as="h2" text={content.heading} className={servicesHowWeWork.heading} />
          <p className={servicesHowWeWork.subheading}>{content.subheading}</p>
        </div>

        <div className={servicesHowWeWork.pathsGrid}>
          {content.paths.map((path, index) => {
            const isOpen = index === openIndex;

            return (
              <article key={path.title} className={servicesHowWeWork.pathCard}>
                {/* Desktop (xl+): the section's own original design --
                    image, title/subtitle, both detail fields, always
                    expanded, no accordion. */}
                <div className={servicesHowWeWork.pathCardDesktop}>
                  <MediaPlaceholder
                    label={path.title}
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
                </div>

                {/* Mobile/tablet (below xl): collapsible, FabricOptions-styled,
                    no image. */}
                <div
                  className={cx(
                    servicesHowWeWork.pathCardMobile,
                    fabricOptions.accordionItem,
                    isOpen ? fabricOptions.accordionItemOpen : fabricOptions.accordionItemClosed,
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
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
                  <div className={isOpen ? fabricOptions.accordionDetailGridOpen : fabricOptions.accordionDetailGrid}>
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
              </article>
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
