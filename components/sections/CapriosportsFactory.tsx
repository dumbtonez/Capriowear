// components/sections/CapriosportsFactory.tsx
// Capriosports homepage section 5, "One Factory" -- 2026-09-15 rebuild.
// Replaces the earlier CapabilityCard/TextReveal placeholder-box layout
// (content/capriosports/home.ts's own former `overview` field, now
// `factory`) with a composition of three already-real, already-tested
// components rather than a new mechanism:
//   1. This section's own heading/lead/supporting-block text block (small,
//      new -- no existing component combines heading+lead+two plain text
//      tiles in this exact shape).
//   2. `ScrollGrowVideo` -- the same narrow-to-full-viewport video block
//      Capriowear's own Hero.tsx uses, as this section's lead visual.
//   3. `InsideFactory` -- reused directly (not forked) for the real
//      factory-shots slider, `showHeading`/`showCta` both false since this
//      section supplies its own heading and has no separate CTA here.
//
// A true "sticky text pinned beside a taller scrolling column" composition
// (OurServices' own mechanism) does not actually fit here: OurServices
// pins text against a column of vertically STACKED cards taller than the
// viewport, while InsideFactory's gallery is a horizontally chevron-paged
// carousel with no extra vertical height to pin against -- the two
// mechanisms have nothing to compose against each other. This stacked
// layout is the honest fit for what these two real components can
// actually do together.
import { Fragment } from "react";

import { ScrollGrowVideo } from "@/components/ScrollGrowVideo";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { capriosportsFactory } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";

import { InsideFactory } from "./InsideFactory";

export type CapriosportsFactoryProps = {
  content: typeof capriosportsHome.factory;
};

type BodySegment = string | { bold: string };

export function CapriosportsFactory({ content }: CapriosportsFactoryProps) {
  return (
    <section className={capriosportsFactory.section}>
      <div className={capriosportsFactory.textBlock}>
        <SectionHeading
          eyebrow={<TextReveal text={content.eyebrow} />}
          heading={<TextReveal as="span" text={content.h2} />}
          eyebrowTone="light"
          align="center"
        />
        <p className={capriosportsFactory.lead}>
          {(content.lead as BodySegment[]).map((segment, index) =>
            typeof segment === "string" ? (
              <Fragment key={index}>{segment}</Fragment>
            ) : (
              <span key={index} className={capriosportsFactory.leadBold}>
                {segment.bold}
              </span>
            ),
          )}
        </p>
      </div>

      <div className={capriosportsFactory.videoWrap}>
        <ScrollGrowVideo
          label={content.video.label}
          wrapClassName={capriosportsFactory.videoInnerWrap}
          image={content.video.image}
          video={content.video.video}
        />
      </div>

      <div className={capriosportsFactory.supportingGrid}>
        {content.supportingBlocks.map((block) => (
          <div key={block.title} className={capriosportsFactory.supportingCard}>
            <h3 className={capriosportsFactory.supportingTitle}>{block.title}</h3>
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
