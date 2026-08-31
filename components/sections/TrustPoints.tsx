// components/sections/TrustPoints.tsx
// The PLP's quality/QC trust list (Figma node 579:5493 desktop / 590:1283
// mobile, 2026-08-30): H2 + subline (no eyebrow -- this design's own
// pattern, same as CategoryBanner's h1+subline, not the sitewide
// SectionHeading eyebrow+H2 rule), a mobile-only artwork block, then a
// bordered list of 5 rows, each a diamond glyph plus one line of copy.
import { Sparkle } from "lucide-react";

import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { trustPoints } from "@/components/ui/styles";

export type TrustPointsProps = {
  heading: string;
  subline: string;
  points: string[];
};

export function TrustPoints({ heading, subline, points }: TrustPointsProps) {
  return (
    <section className={trustPoints.section}>
      <div className={trustPoints.headingBlock}>
        <h2 className={trustPoints.heading}>{heading}</h2>
        <p className={trustPoints.subline}>{subline}</p>
      </div>

      {/* Mobile-only artwork block (Figma node 590:1258, "Artwork") -- no
          equivalent frame exists on the desktop design (579:5493 has
          none), same "hidden at xl, not a scaled asset" treatment as
          WhatWeCover's own artwork. `heading` doubles as the alt text --
          there's no separate copy field for it. */}
      <div className={trustPoints.artworkWrap}>
        <MediaPlaceholder label={heading} ratio="16:11" radius="none" className={trustPoints.artwork} />
      </div>

      <ul className={trustPoints.list}>
        {points.map((point) => (
          // key={point}: a static, presentational list -- never reordered
          // or edited by the user -- same reasoning as CategoryBanner's
          // own trust-bullet list.
          <li key={point} className={trustPoints.row}>
            {/* Same 4-point glyph this project already reuses for
                CategoryBanner's trust bullets, Marquee's separator, and
                Header's mega-menu promo bullets -- one shared shape, not a
                new icon file. */}
            <Sparkle className={trustPoints.icon} aria-hidden="true" fill="currentColor" />
            <span className={trustPoints.pointText}>{point}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
