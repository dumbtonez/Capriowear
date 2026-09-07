// components/sections/ServicesHowWeWork.tsx
// /services page, section 3. Figma desktop node 750:770 (owner brief,
// 2026-09-07): a centred intro, 3 "path" cards explaining OEM/ODM/Private
// Label, and a closing note pointing out the three paths can combine.
//
// New, bespoke section, not a reuse of an existing homepage component --
// CapabilityCard (Our Services/How It Works) only carries a single title +
// body per card, not this card's real shape (title + subtitle, then two
// separately-labeled "What it means"/"Best for" blocks), so forcing this
// content into it would mean bolting on unused props rather than a clean
// fit. What IS reused: MediaPlaceholder for each card's plain image box
// (same shared primitive every other section's placeholder imagery uses),
// AsteriskIcon (a real icon component, not an inlined one-off <svg>), and
// content/activewear/types.ts's NoteSegment for the closing note's
// bold-phrase paragraph -- the exact same segmented-note pattern
// ServicesIntro's own paragraph already uses.
//
// Desktop-only for now, per the owner's own brief -- see `servicesHowWeWork`
// in components/ui/styles.ts for the exact spacing notes and the
// responsive-safe (not confirmed-mobile) caveat on the cards grid.
import { AsteriskIcon } from "@/components/icons/AsteriskIcon";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { servicesHowWeWork } from "@/components/ui/styles";
import type { services } from "@/content/services";

export type ServicesHowWeWorkProps = {
  content: typeof services.howWeWork;
};

export function ServicesHowWeWork({ content }: ServicesHowWeWorkProps) {
  return (
    <section className={servicesHowWeWork.section}>
      <div className={servicesHowWeWork.inner}>
        <div className={servicesHowWeWork.introWrap}>
          <h2 className={servicesHowWeWork.heading}>{content.heading}</h2>
          <p className={servicesHowWeWork.subheading}>{content.subheading}</p>
        </div>

        <div className={servicesHowWeWork.pathsGrid}>
          {content.paths.map((path) => (
            <article key={path.title} className={servicesHowWeWork.pathCard}>
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
                  <p className={servicesHowWeWork.pathSubtitle}>{path.subtitle}</p>
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

        <div className={servicesHowWeWork.noteWrap}>
          <span className={servicesHowWeWork.noteIconWrap}>
            <AsteriskIcon className={servicesHowWeWork.noteIcon} />
          </span>
          <p className={servicesHowWeWork.noteParagraph}>
            {content.note.map((segment, index) =>
              segment.bold ? (
                <strong key={index} className={servicesHowWeWork.noteParagraphBold}>
                  {segment.text}
                </strong>
              ) : (
                <span key={index}>{segment.text}</span>
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
