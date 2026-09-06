// components/sections/TrustPoints.tsx
// The PLP's quality/QC trust list (Figma node 579:5493 desktop / 590:1283
// mobile, 2026-08-30): H2 + subline (no eyebrow -- this design's own
// pattern, same as CategoryBanner's h1+subline, not the sitewide
// SectionHeading eyebrow+H2 rule), a mobile-only artwork block, then a
// bordered list of 5 rows, each a diamond glyph plus one line of copy.
import { Sparkle } from "lucide-react";

import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { cx } from "@/components/ui/cx";
import { trustPoints } from "@/components/ui/styles";

export type TrustPointsProps = {
  heading: string;
  subline: string;
  points: string[];
  /**
   * Desktop side padding + title max-width, paired per page: the PLP's own
   * 138px padding with a 650px title cap (Figma node 579:5493, the
   * default), vs. the PDP's 80px padding with no title cap (node 634:5189,
   * owner, 2026-09-01: "80px gap from right and left" -- the title was
   * inheriting the PLP's 650px cap and wrapping mid-sentence instead of
   * using the wider row's full width). A variant token rather than an
   * arbitrary className override, since two conflicting `px-*`/`max-w-*`
   * utilities can't reliably override each other by class order.
   */
  sidePadding?: "plp" | "pdp";
};

export function TrustPoints({ heading, subline, points, sidePadding = "plp" }: TrustPointsProps) {
  return (
    <section
      className={cx(
        trustPoints.section,
        sidePadding === "pdp" ? trustPoints.sidePaddingPdp : trustPoints.sidePaddingPlp,
      )}
    >
      <div
        className={cx(
          trustPoints.headingBlock,
          sidePadding === "pdp" ? trustPoints.headingMaxWidthPdp : trustPoints.headingMaxWidthPlp,
        )}
      >
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
