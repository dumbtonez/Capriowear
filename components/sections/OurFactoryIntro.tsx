// components/sections/OurFactoryIntro.tsx
// /our-factory page, section 3. Figma desktop node 857:1906 ("Content").
//
// Heading, a single rich-text paragraph (NoteSegment[], same shape
// content/services.ts's own intro paragraphs use -- reused, not a second
// bespoke renderer), and a 2-stat row, each stat topped with a short accent
// gradient rule. No media in this section, unlike ServicesIntro -- a
// genuinely different composition, so it gets its own component rather than
// forcing this page's stats onto that one's image-plus-text layout.
//
// Desktop-only for now (owner: desktop design is ready, mobile handled
// separately, keep it responsive-safe) -- see `ourFactoryIntro` in
// components/ui/styles.ts for the exact spacing notes and the mobile
// fallback caveat.
//
// Heading gained a reveal animation, 2026-09-10 (owner: "the factory behind
// caprio should have title animation") -- was a plain `<h2>`, the one
// section heading on this page that had been missed; every other section
// heading sitewide already wraps in `TextReveal` on plain `text` mode
// (WhatWeMake, CertifiedCompliant, HowItWorks, ServicesHowWeWork, etc.), so
// this just applies that same existing pattern rather than inventing a new
// one.
import type { NoteSegment } from "@/content/activewear/types";
import { GradientStat } from "@/components/GradientStat";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { ourFactoryIntro } from "@/components/ui/styles";
import type { ourFactory } from "@/content/our-factory";

export type OurFactoryIntroProps = {
  content: typeof ourFactory.intro;
  /**
   * "afterHero" (default): this component's original placement, section 3,
   * directly under the page's own Hero. "stacked": placed directly after
   * another section instead (section 7, "Audited, not just promised", under
   * OurFactoryDetails) -- a much smaller top gap and a slightly different
   * desktop inset, both Figma's own real measurements for that node. See
   * `ourFactoryIntro.innerAfterHero`/`innerStacked` in components/ui/styles.ts.
   */
  placement?: "afterHero" | "stacked";
};

function Paragraph({ segments }: { segments: NoteSegment[] }) {
  return (
    <p className={ourFactoryIntro.paragraph}>
      {segments.map((segment, index) =>
        segment.bold ? (
          <span key={index} className={ourFactoryIntro.paragraphBold}>
            {segment.text}
          </span>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

export function OurFactoryIntro({ content, placement = "afterHero" }: OurFactoryIntroProps) {
  const isStacked = placement === "stacked";

  return (
    <section className={ourFactoryIntro.section}>
      <div className={cx(ourFactoryIntro.inner, isStacked ? ourFactoryIntro.innerStacked : ourFactoryIntro.innerAfterHero)}>
        <div className={ourFactoryIntro.textCol}>
          <TextReveal as="h2" text={content.heading} className={ourFactoryIntro.heading} />
          <Paragraph segments={content.paragraph} />
        </div>

        <div className={ourFactoryIntro.statsRow}>
          {content.stats.map((stat) => (
            <GradientStat
              key={stat.caption}
              value={stat.value}
              caption={stat.caption}
              className={isStacked ? ourFactoryIntro.statColStacked : ourFactoryIntro.statColAfterHero}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
