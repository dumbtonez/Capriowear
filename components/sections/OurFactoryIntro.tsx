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
import { TextReveal } from "@/components/TextReveal";
import { ourFactoryIntro } from "@/components/ui/styles";
import type { ourFactory } from "@/content/our-factory";

export type OurFactoryIntroProps = {
  content: typeof ourFactory.intro;
};

function Paragraph({ segments }: { segments: NoteSegment[] }) {
  return (
    <p className={ourFactoryIntro.paragraph}>
      {segments.map((segment, index) =>
        segment.bold ? (
          <strong key={index} className={ourFactoryIntro.paragraphBold}>
            {segment.text}
          </strong>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

export function OurFactoryIntro({ content }: OurFactoryIntroProps) {
  return (
    <section className={ourFactoryIntro.section}>
      <div className={ourFactoryIntro.inner}>
        <div className={ourFactoryIntro.textCol}>
          <TextReveal as="h2" text={content.heading} className={ourFactoryIntro.heading} />
          <Paragraph segments={content.paragraph} />
        </div>

        <div className={ourFactoryIntro.statsRow}>
          {content.stats.map((stat) => (
            <div key={stat.caption} className={ourFactoryIntro.statCol}>
              <div className={ourFactoryIntro.statDivider} />
              <div className={ourFactoryIntro.stat}>
                <p className={ourFactoryIntro.statValue}>{stat.value}</p>
                <p className={ourFactoryIntro.statCaption}>{stat.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
