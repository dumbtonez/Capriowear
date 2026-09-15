// components/sections/CapriosportsFactory.tsx
// Capriosports homepage section 5, "One Factory" -- 2026-09-15 rebuild,
// revised same day after visual review. Composition of real, already-
// shipping components:
//   1. This section's own heading+lead text block (small, new -- no
//      existing component combines heading+lead in exactly this shape).
//   2. `ScrollGrowVideo` -- the same block Capriowear's own Hero.tsx uses,
//      as this section's lead visual. No `video` pair is passed (visual
//      review: the previous pass's placeholder video was an unrelated
//      stock clip of a park, which read as broken) -- omitting `video`
//      makes it fall back to its own plain labelled placeholder + Play
//      button over a real factory photo, which reads as intentional.
//   3. `CapabilityCard` -- the same title+body+image card Our Services/How
//      It Works use sitewide, for the two supporting blocks (previously
//      bare stacked text under a thin divider, floating with no real
//      transition into the photo slider below).
//   4. `InsideFactory` -- reused directly (not forked) for the real
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

import { CapabilityCard } from "@/components/Card";
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
        <ScrollGrowVideo label={content.video.label} wrapClassName={capriosportsFactory.videoInnerWrap} />
      </div>

      {/* Real CapabilityCard treatment (image + title + body), not bare
          stacked text under a divider (2026-09-15 visual-review fix) --
          same card component/spacing Our Services and How It Works
          already use sitewide, so this reads as a real transition into
          the photo slider below, not a disconnected floating block. */}
      <div className={capriosportsFactory.supportingGrid}>
        {content.supportingBlocks.map((block) => (
          <CapabilityCard key={block.title} title={block.title} body={block.body} mediaAspectClassName="aspect-[8/5]" />
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
