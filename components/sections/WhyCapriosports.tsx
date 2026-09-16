// components/sections/WhyCapriosports.tsx
// "Why Caprio," the numbered 01-05 list between Our Story and Our Services
// on the Capriosports homepage (`content/capriosports/home.ts`'s
// `whyCaprio`) -- reinstated 2026-09-16 on a black surface, replacing the
// deleted `FeatureNumbered` component (removed 2026-08-25, "its only
// anticipated usage never matched the real design," unrecoverable from
// git history) with TrustPoints' own real, currently-shipping bordered-row
// list language (`trustPoints.list`/`row` shape), a number column swapped
// in for that component's Sparkle glyph, since the content shape here
// (title + body per row, not one flat sentence) doesn't fit TrustPoints'
// own `points: string[]` prop as-is.
//
// A second, light-tone instance ("Why Capriosports," further down the
// page) existed briefly alongside this one; the owner asked to remove it
// entirely, 2026-09-17 ("remove white Why Capriosports section... and
// delete from your memory") -- its own content (`capriosportsHome.why`)
// and every light-tone recipe this file used to support (`tone` prop,
// `section`/`subline`/`list`/`row`/`number`/`rowText`/`rowTitle`/
// `rowBody` in `whyCapriosports`, components/ui/styles.ts) were deleted
// outright along with it, not left unused -- this is dark-tone only now.
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { whyCapriosports } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";

export type WhyCapriosportsProps = {
  content: typeof capriosportsHome.whyCaprio;
  /** Extra classes for the <h2> itself, e.g. `whitespace-pre-line` for a manual line break. */
  headingClassName?: string;
};

export function WhyCapriosports({ content, headingClassName }: WhyCapriosportsProps) {
  return (
    // Full-width outer wrapper for the fill colour (owner: "give full
    // width to background") -- `sectionDark` itself keeps `container-p`'s
    // own 1440px cap/centring for the content, so the two need separate
    // elements.
    <div className={whyCapriosports.sectionDarkBg}>
      <section className={whyCapriosports.sectionDark}>
        <div className={whyCapriosports.headingBlock}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="dark"
            align="center"
            headingClassName={headingClassName}
          />
        </div>

        <ul className={whyCapriosports.listDark}>
          {content.items.map((item) => (
            <li key={item.number} className={whyCapriosports.rowDark}>
              <span className={whyCapriosports.numberDark} aria-hidden="true">
                {item.number}
              </span>
              <p className={whyCapriosports.rowTitleDark}>{item.title}</p>
              <p className={whyCapriosports.rowBodyDark}>{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
