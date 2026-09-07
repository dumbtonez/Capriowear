// components/sections/ProductRange.tsx
// /services page, section 5. Figma desktop node 758:823, file
// dTtJQ9rtKewCqpt2YImiJb: a dark, centred "Product Range" intro, then two
// cards (Activewear, Teamwear & Uniforms) -- image, description, and an
// "Explore X" orange link.
//
// New, bespoke section, not a reuse of WhatWeMake (homepage): the two
// sections' H2 copy happens to match verbatim ("End-to-end activewear and
// teamwear manufacturing"), but the real layouts are genuinely different --
// WhatWeMake is a light section with a 4-tile category grid per group,
// this is a dark section with exactly one image and one "Explore" link per
// category, no tile grid at all. Forcing this into WhatWeMake would mean
// bolting an unused tile-grid shape onto content that has none.
//
// Desktop-only for now, same caveat as ServicesHowWeWork -- see
// `productRange` in components/ui/styles.ts for the spacing notes and the
// responsive-safe (not confirmed-mobile) caveat.
import Link from "next/link";

import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { NextArrowIcon } from "@/components/icons/NextArrowIcon";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { productRange } from "@/components/ui/styles";
import type { services } from "@/content/services";

export type ProductRangeProps = {
  content: typeof services.productRange;
};

export function ProductRange({ content }: ProductRangeProps) {
  return (
    <section className={productRange.section}>
      <div className={productRange.inner}>
        <SectionHeading
          eyebrow={<TextReveal text={content.eyebrow} />}
          heading={<TextReveal as="span" text={content.h2} />}
          eyebrowTone="dark"
          eyebrowSize={productRange.eyebrowSize}
          align="center"
          className={productRange.headingWrap}
        />

        <div className={productRange.cardsRow}>
          {content.categories.map((category) => (
            <article key={category.href} className={productRange.card}>
              <MediaPlaceholder
                label={category.title}
                tone="dark"
                radius="none"
                style={{ aspectRatio: "381 / 440" }}
                className={productRange.cardMedia}
              />
              <div className={productRange.cardTextCol}>
                <p className={productRange.cardBody}>{category.body}</p>
                <Link href={category.href} className={productRange.exploreLink}>
                  {category.exploreLabel}
                  <NextArrowIcon className={productRange.exploreIcon} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
