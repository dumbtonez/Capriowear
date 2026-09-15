// components/sections/WhatWeMakeRange.tsx
// Capriosports homepage section 7, "What We Make" -- 2026-09-15 rebuild.
// Two range-card boxes (lead + real ul/li highlights + CTA) -- no existing
// component combines all three in one box (ProductRange has image+body+CTA
// but no bullets; WhatWeCover has ul/li bullets but no CTA/card/lead), so
// this is a new, small composition of the same section-heading/button
// primitives every other section already uses. Highlights render as real
// `<ul>/<li>` markup (SEO/AEO/GEO discipline, same rule WhatWeCover already
// follows), and the same array feeds this section's visible copy and its
// ItemList JSON-LD (lib/schema.ts's `productRangeItemListSchema()`) -- never
// a second, hand-typed list.
import Link from "next/link";

import { Button } from "@/components/Button";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { whatWeMakeRange } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";

export type WhatWeMakeRangeProps = {
  content: typeof capriosportsHome.whatWeMake;
};

export function WhatWeMakeRange({ content }: WhatWeMakeRangeProps) {
  return (
    <section className={whatWeMakeRange.section}>
      <div className={whatWeMakeRange.headingBlock}>
        <SectionHeading
          eyebrow={<TextReveal text={content.eyebrow} />}
          heading={<TextReveal as="span" text={content.h2} />}
          eyebrowTone="light"
          align="center"
        />
        <p className={whatWeMakeRange.lead}>{content.lead}</p>
      </div>

      <div className={whatWeMakeRange.grid}>
        {content.boxes.map((box) => (
          <article key={box.title} className={whatWeMakeRange.box}>
            <Link href={box.href} className={whatWeMakeRange.boxTitle}>
              <TextReveal as="h3" text={box.title} />
            </Link>
            <p className={whatWeMakeRange.boxLead}>{box.lead}</p>
            <ul className={whatWeMakeRange.list}>
              {box.highlights.map((highlight) => (
                <li key={highlight.title} className={whatWeMakeRange.item}>
                  <p className={whatWeMakeRange.itemTitle}>{highlight.title}</p>
                  <p className={whatWeMakeRange.itemBody}>{highlight.body}</p>
                </li>
              ))}
            </ul>
            <Button href={box.cta.href} className={whatWeMakeRange.cta}>
              {box.cta.label}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
