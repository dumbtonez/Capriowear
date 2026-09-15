// components/sections/WhyCapriosports.tsx
// Capriosports homepage section 9, "Why Capriosports" -- 2026-09-15
// rebuild. A numbered 01-05 list, replacing the earlier 2-column
// CapabilityCard block that used to live under this same "WHY CAPRIOSPORTS"
// eyebrow (that copy now lives in the One Factory section instead, see
// content/capriosports/home.ts's own `factory.supportingBlocks` comment).
//
// `FeatureNumbered`, a literal numbered-list component, existed once and
// was deliberately deleted 2026-08-25 ("its only anticipated usage never
// matched the real design") -- rather than resurrecting an abandoned
// component, this reuses TrustPoints' own real, currently-shipping
// bordered-row list language (`trustPoints.list`/`row` shape) with a
// number column swapped in for that component's Sparkle glyph, since the
// content shape here (title + body per row, not one flat sentence) doesn't
// fit TrustPoints' own `points: string[]` prop as-is.
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { whyCapriosports } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";

export type WhyCapriosportsProps = {
  content: typeof capriosportsHome.why;
};

export function WhyCapriosports({ content }: WhyCapriosportsProps) {
  return (
    <section className={whyCapriosports.section}>
      <div className={whyCapriosports.headingBlock}>
        <SectionHeading
          eyebrow={<TextReveal text={content.eyebrow} />}
          heading={<TextReveal as="span" text={content.h2} />}
          eyebrowTone="light"
          align="center"
        />
        <p className={whyCapriosports.subline}>{content.subline}</p>
      </div>

      <ul className={whyCapriosports.list}>
        {content.items.map((item) => (
          <li key={item.number} className={whyCapriosports.row}>
            <span className={whyCapriosports.number} aria-hidden="true">
              {item.number}
            </span>
            <div className={whyCapriosports.rowText}>
              <p className={whyCapriosports.rowTitle}>{item.title}</p>
              <p className={whyCapriosports.rowBody}>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
