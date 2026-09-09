// components/sections/ServicesIntro.tsx
// /services page, section 2. Rebuilt 2026-09-10 to a new Figma frame,
// desktop node 886:181 (owner: "a factory you can buil section change it to
// this style") -- supersedes the original 733:529 build (light section,
// image beside the text). New shape: dark section (`bg-ink`, matches this
// frame's own `#121317`), a statement heading, one rich-text paragraph, and
// a 2-stat row, each stat topped with a short accent gradient rule -- no
// media at all. Structurally the same "heading + paragraph + gradient-
// divided stat row" shape `OurFactoryIntro.tsx` already uses (see that
// file's own comment), just its own dark colours here instead of that
// section's light ones -- not a reuse of that component directly (this
// section is its own bespoke composition, `services.intro`'s own content
// shape), since duplicating one small recipe is simpler than threading a
// tone prop through a component that has never needed one before.
//
// The paragraph is rendered from a segmented array (`{ text, bold? }[]`),
// not a plain string -- same pattern FabricOptions' own closing note
// already uses for inline bold phrases, reused here rather than building a
// second bespoke rich-text renderer.
//
// Heading reveals word-by-word on scroll (`TextReveal`), the same pattern
// every other section heading sitewide already uses -- the original build
// had missed it (a plain `<h2>`), corrected here as part of this rebuild
// rather than left as a second gap alongside `OurFactoryIntro`'s own
// (already fixed separately, see that file's own comment).
//
// Desktop-only for now, per the owner's own brief -- see `servicesIntro` in
// components/ui/styles.ts for the exact spacing notes and the mobile
// fallback caveat.
//
// The heading needs two DIFFERENT forced breaks, not one shared string
// (owner, 2026-09-10: "'build your' text can be in 1st line" for tablet/
// desktop, then "on mobile, the title should be in 2 line"). Real mobile
// already wraps `content.heading`'s own plain string to exactly 2 lines
// naturally at real mobile width ("A factory you / can build your / brand
// on" would be 3 -- confirmed live it's actually "A factory you can /
// build your brand on" with no forced break at all), so it renders
// unmodified there. Tablet/desktop's own required split ("A factory you
// can build your" / "brand on") can't come from width alone either (past a
// point, once "your" fits, so does the rest of the sentence on the same
// line) -- so it's a second, hardcoded `"\n"` string, `TextReveal`
// splitting on it first (same mechanism FabricOptions' own 2-line heading
// uses). Same "two real breakpoint-specific instances, not one repositioned
// via CSS" shape `HowItWorks.tsx`'s own mobile-vs-tablet heading already
// uses for an identical two-different-forced-breaks problem.
import { TextReveal } from "@/components/TextReveal";
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
          <h2 className={servicesIntro.heading}>
            <span className="md:hidden">
              <TextReveal as="span" text={content.heading} />
            </span>
            <span className="hidden md:inline">
              <TextReveal as="span" text={"A factory you can build your\nbrand on"} />
            </span>
          </h2>
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

        <div className={servicesIntro.statsRow}>
          {content.stats.map((stat) => (
            <div key={stat.caption} className={servicesIntro.statCol}>
              <div className={servicesIntro.statDivider} />
              <div className={servicesIntro.stat}>
                <p className={servicesIntro.statValue}>{stat.value}</p>
                <p className={servicesIntro.statCaption}>{stat.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
