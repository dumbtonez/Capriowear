// components/sections/ServicesIntro.tsx
// /services page, section 2. Figma desktop node 733:529 (owner brief,
// 2026-09-07): a statement heading, a supporting paragraph with three
// inline semibold phrases, and a plain image placeholder alongside it.
//
// Paragraph is rendered from `content.paragraph`'s own segmented array
// (`{ text, bold? }[]`), not a single string -- same pattern
// FabricOptions' own closing note already uses for inline bold phrases,
// reused here rather than building a second bespoke rich-text renderer.
//
// Desktop-only for now, per the owner's own brief -- see `servicesIntro`
// in components/ui/styles.ts for the exact spacing notes and the mobile
// fallback caveat.
//
// `showLabel={false}` on the placeholder: Figma shows a bare `#f2f2f7` box,
// no caption text -- matches the "just an image placeholder container, no
// label" convention already established for the PLP grid (ProductCardMedia,
// 2026-09-02).
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
        <div className={servicesIntro.textCol}>
          <h2 className={servicesIntro.heading}>{content.heading}</h2>
          <p className={servicesIntro.paragraph}>
            {content.paragraph.map((segment, index) =>
              segment.bold ? (
                <strong key={index} className={servicesIntro.paragraphBold}>
                  {segment.text}
                </strong>
              ) : (
                <span key={index}>{segment.text}</span>
              ),
            )}
          </p>
        </div>

        <MediaPlaceholder
          label="Factory and production floor"
          ratio="50:37"
          radius="none"
          showLabel={false}
          className={servicesIntro.media}
        />
      </div>
    </section>
  );
}
