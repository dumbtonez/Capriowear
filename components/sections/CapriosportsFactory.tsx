// components/sections/CapriosportsFactory.tsx
// Capriosports homepage section, "One Factory" -- rebuilt 2026-09-15 to
// match the real Figma frame exactly (node 985:133, owner: "under that
// build this section. use the same spacings"). Composition:
//   1. Plain centred heading+lead (no eyebrow, no SectionHeading -- the
//      real frame has neither; see `capriosportsFactory` in
//      components/ui/styles.ts for the exact type/spacing values).
//   2. A plain full-width `MediaPlaceholder` video block, fixed 620px tall
//      at desktop (the frame's own static box, not Hero's scroll-grow
//      mechanic -- that effect belongs to a narrow-box-grows-on-scroll
//      moment neither this frame nor its copy describe).
//   3. 3 plain title+body cards (no images), 3-up at desktop per the
//      frame's own `gap-[63px]` row; no mobile frame exists for this
//      section, so mobile/tablet stack like any other 3-item text list.
//   4. `InsideFactory` -- reused directly (not forked) for the real
//      factory-shots slider, `showHeading`/`showCta` both false. Not part
//      of this Figma frame (which ends after the 3 cards), kept as-is
//      immediately after it -- the real design's own next section.
import { Play } from "lucide-react";

import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { TextReveal } from "@/components/TextReveal";
import { capriosportsFactory, hero } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";

import { InsideFactory } from "./InsideFactory";

export type CapriosportsFactoryProps = {
  content: typeof capriosportsHome.factory;
};

export function CapriosportsFactory({ content }: CapriosportsFactoryProps) {
  return (
    <section className={capriosportsFactory.section}>
      <div className={capriosportsFactory.contentGroup}>
        <div className={capriosportsFactory.textBlock}>
          <TextReveal as="h2" text={content.h2} className={capriosportsFactory.heading} />
          <p className={capriosportsFactory.lead}>{content.lead}</p>
        </div>

        <div className={capriosportsFactory.videoWrap}>
          <MediaPlaceholder
            label={content.video.label}
            tone="dark"
            showLabel={false}
            radius="none"
            imageSizes="100vw"
            className={capriosportsFactory.videoInnerWrap}
            overlay={
              <div className={hero.playWrap}>
                <span className={hero.playCircle}>
                  <Play className={hero.playIcon} fill="currentColor" aria-hidden="true" />
                </span>
                <span className={hero.playLabel}>Play Video</span>
              </div>
            }
          />
        </div>
      </div>

      <div className={capriosportsFactory.supportingGrid}>
        {content.supportingBlocks.map((block) => (
          <div key={block.title} className={capriosportsFactory.supportingCard}>
            <p className={capriosportsFactory.supportingTitle}>{block.title}</p>
            <p className={capriosportsFactory.supportingBody}>{block.body}</p>
          </div>
        ))}
      </div>

      <InsideFactory
        content={{ eyebrow: content.eyebrow, h2: content.h2, media: content.media, cta: content.cta }}
        tone="dark"
        showHeading={false}
        showCta={false}
      />
    </section>
  );
}
