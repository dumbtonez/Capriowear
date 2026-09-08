// components/sections/OurFactoryProcess.tsx
// /our-factory page, section 5. Figma desktop node 857:2090 ("Content"),
// "What We Make" -- 7 process steps (Cutting, Fabric, Sewing, Printing &
// Sublimation, Finishing, Packed & Shipped, Quality Control) in a
// staggered, alternating-width grid.
//
// Images use ParallaxMedia (components/ParallaxMedia.tsx), the page's own
// scroll-linked drift effect (owner brief: "parallax animation ... as
// shown" on wmf-coffeemachines.com's "For full taste, in a fast pace"
// gallery) -- built once there and reused for every card here rather than
// each card wiring its own Framer Motion scroll hook. Heading uses
// TextReveal, same fade/rise-on-enter treatment this page's other headings
// already use (Hero's H1, OurFactoryIntro's own heading does not, since
// that one has no established TextReveal precedent yet -- flagged for a
// consistency pass if the owner wants it added there too).
//
// Desktop-only for now (owner: desktop ready, mobile handled separately,
// keep it responsive-safe) -- see `ourFactoryProcess` in
// components/ui/styles.ts for the exact spacing notes and the mobile
// fallback (single stacked column, each item's fixed width dropping to
// `w-full`).
import { Eyebrow } from "@/components/Eyebrow";
import { ParallaxMedia } from "@/components/ParallaxMedia";
import { TextReveal } from "@/components/TextReveal";
import { ourFactoryProcess } from "@/components/ui/styles";
import type { ourFactory } from "@/content/our-factory";

export type OurFactoryProcessProps = {
  content: typeof ourFactory.process;
};

export function OurFactoryProcess({ content }: OurFactoryProcessProps) {
  return (
    <section className={ourFactoryProcess.section}>
      <div className={ourFactoryProcess.inner}>
        <div className={ourFactoryProcess.headingGroup}>
          <Eyebrow tone="light">{content.eyebrow}</Eyebrow>
          <TextReveal as="h2" text={content.heading} className={`${ourFactoryProcess.heading} text-h1 text-ink`} />
        </div>

        {content.rows.map((row, rowIndex) => (
          <div key={rowIndex} className={ourFactoryProcess.row}>
            {row.items.map((item) => (
              <div key={item.label} className={`${ourFactoryProcess.item} ${ourFactoryProcess.itemWidth[item.width]}`}>
                <ParallaxMedia label={item.imageAlt} ratio={item.ratio} />
                <div className={ourFactoryProcess.textCol}>
                  <div className={ourFactoryProcess.labelGroup}>
                    <p className={ourFactoryProcess.label}>{item.label}</p>
                    <p className={ourFactoryProcess.title}>{item.title}</p>
                  </div>
                  <p className={ourFactoryProcess.body}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
