// components/sections/ServicesIntro.tsx
// /services page, section 2. Figma desktop node 733:529 (owner brief,
// 2026-09-07): a statement heading, a supporting paragraph with three
// inline semibold phrases, and a plain image placeholder alongside it.
//
// Each paragraph is rendered from its own segmented array (`{ text, bold?
// }[]`), not a single string -- same pattern FabricOptions' own closing
// note already uses for inline bold phrases, reused here rather than
// building a second bespoke rich-text renderer.
//
// Split into two paragraphs the same day (owner: "the subline of this
// section divide into 2 parts. break it from we are the activewear with
// 24px gap from the top paragraph") -- `content.paragraphs` (plural),
// mapped to one `<p>` each inside `servicesIntro.paragraphStack`'s own
// `gap-6` (24px) wrapper, not a change to `textCol`'s own heading-to-body
// gap (which stays whatever that token already sets per breakpoint).
//
// Desktop-only for now, per the owner's own brief -- see `servicesIntro`
// in components/ui/styles.ts for the exact spacing notes and the mobile
// fallback caveat.
//
// `showLabel={false}` on the placeholder: Figma shows a bare `#f2f2f7` box,
// no caption text -- matches the "just an image placeholder container, no
// label" convention already established for the PLP grid (ProductCardMedia,
// 2026-09-02).
//
// Media renders before the text column below (owner, 2026-09-07: "image
// placeholder should come first then the text") -- real DOM order for
// mobile/tablet; `servicesIntro.textCol`/`.media`'s own `xl:order-2`/
// `xl:order-1` pair restores the desktop frame's own text-left/image-right
// order (733:529), unchanged.
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { servicesIntro } from "@/components/ui/styles";
import type { services } from "@/content/services";

export type ServicesIntroProps = {
  content: typeof services.intro;
};

export function ServicesIntro({ content }: ServicesIntroProps) {
  return (
    <section className={servicesIntro.section}>
      <div className={servicesIntro.inner}>
        <MediaPlaceholder
          label="Factory and production floor"
          ratio="50:37"
          radius="none"
          showLabel={false}
          className={servicesIntro.media}
        />

        <div className={servicesIntro.textCol}>
          <h2 className={servicesIntro.heading}>{content.heading}</h2>
          <div className={servicesIntro.paragraphStack}>
            {content.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex} className={servicesIntro.paragraph}>
                {paragraph.map((segment, index) =>
                  segment.bold ? (
                    <strong key={index} className={servicesIntro.paragraphBold}>
                      {segment.text}
                    </strong>
                  ) : (
                    <span key={index}>{segment.text}</span>
                  ),
                )}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
