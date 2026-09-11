// components/sections/WhatWeMake.tsx
// Homepage section 6. Figma: desktop node 366:129, mobile node 366:161
// ("Activewear Categories" -- only that category group's spacing is
// Figma-confirmed). Maps over every group in the content passed in, so a
// second group (e.g. Teamwear & Uniforms) structurally works the same way,
// reusing the same confirmed pattern -- but its own exact numbers haven't
// been checked against a Figma frame yet.
//
// Genuinely different tile treatments per breakpoint, not one responsive
// layout: desktop reuses Card (image, centred label, 4-column grid);
// mobile is a single stacked column with a left-aligned label -- confirmed
// via get_design_context that Figma's real desktop tile label carries
// text-center and its mobile counterpart does not, so mobile isn't just a
// narrower version of the desktop grid. Image ratios (owner, 2026-09-07):
// mobile square (1:1), tablet and desktop 300:320 (15:16, taller than
// wide) -- see `whatWeMake.desktopTileMedia`/`mobileTileMedia`'s own
// comments in components/ui/styles.ts for the full history.
//
// Takes its heading and category groups as props (not a direct
// content/home.ts import), so any page can render this section with its own
// content -- see app/page.tsx for the homepage's values.
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { NextArrowIcon } from "@/components/icons/NextArrowIcon";
import { ParallaxMedia } from "@/components/ParallaxMedia";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { whatWeMake } from "@/components/ui/styles";
import type { home } from "@/content/home";

// Mobile AND tablet (owner, 2026-09-07: "on the mobile homepage, add a cta
// after 4 products ... Show the first 2 sub-cat only" -- clarified via
// follow-up to 4, not 2; then "tablet will also follow mobile cta
// behavior" -- tablet was originally left showing every tile with no CTA,
// a deliberate scope line at the time, reversed here) -- caps each
// group's tile list to its first 4 before the "View All" CTA below it, at
// every width under `xl:`. Not applied to the desktop grid (`desktopGrid`,
// `xl:` and up), which has its own separate "CTA fills the last row cell"
// treatment instead (see that block's own comment).
const MOBILE_TILE_LIMIT = 4;
// 2-col grid variant's own limit (owner, 2026-09-11: "now since we have 2
// columns should we add 6 items for each or you think 4 is enough" --
// recommended 6: 4 tiles in 2 columns is only 2 rows, noticeably sparser
// than the original 1-col/4-row version, undersells the category range;
// 6 (3 rows) keeps the same compact grid feel while showing more of
// what's actually available). Scoped to `mobileGridVariant` only -- the
// original 1-col layout's own 4-tile cap is unaffected.
const MOBILE_TILE_LIMIT_GRID = 6;

// "Teamwear & Uniforms" shortens to just "Teamwear" for CTA labels only
// (owner, 2026-09-07: "for teamwear just use view all teamwear") -- every
// group heading (`<h3>`) keeps its own full title, unaffected. Shared by
// both the mobile CTA and the desktop grid CTA below, rather than each
// duplicating the same ternary.
function ctaLabel(category: (typeof home.whatWeMake)["categories"][number]) {
  return category.title === "Teamwear & Uniforms" ? "Teamwear" : category.title;
}

type BodySegment = string | { bold: string };

export type WhatWeMakeProps = {
  content: typeof home.whatWeMake;
  /**
   * Trial variant (owner, 2026-09-11: "Homepage activewear and teamwear
   * categories on mobile are shown ony by one, let's try a variant where
   * we use 2 in a row same width and height of the image as used on the
   * plp. Let's try and decide which one to finalize, one vs 2"). Default
   * `false`: unchanged 1-col real-mobile / 2-col tablet-up behaviour.
   * `true`: 2 columns at every width below `xl:` (real mobile included),
   * PLP-matching grid gaps and image ratio (`79:100`, `MediaPlaceholder`'s
   * own PLP-card ratio) instead of this section's own square/`15:16`
   * tiles. A real prop, not a hand-edited swap, so both stay one flag
   * away from each other for a real side-by-side comparison.
   */
  mobileGridVariant?: boolean;
};

function Body({ segments, className }: { segments: BodySegment[]; className: string }) {
  return (
    <p className={className}>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <span key={index} className={whatWeMake.bold}>
            {segment.bold}
          </span>
        ),
      )}
    </p>
  );
}

export function WhatWeMake({ content, mobileGridVariant = false }: WhatWeMakeProps) {
  return (
    <section>
      <div className={whatWeMake.desktopSection}>
        <div className={whatWeMake.root}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="light"
          />
          <div className={whatWeMake.groupsGap}>
            {content.categories.map((category) => {
              // Same number of rows the tiles already need, with the
              // last cell of the final row reserved for the "View All"
              // CTA (owner, 2026-09-07: "for activewear, shall we use the
              // last 8th box space and put a cta there?", then "the
              // pattern should be consistent for both" -- Teamwear &
              // Uniforms only has 4 tiles/1 full row, so it trims to its
              // first 3 here so the CTA completes that one row the same
              // way Activewear's CTA completes its second row; mobile and
              // tablet read `category.tiles` directly, unaffected).
              const rows = Math.ceil(category.tiles.length / 4);
              const desktopTiles = category.tiles.slice(0, rows * 4 - 1);
              return (
                <div key={category.title} className={whatWeMake.group}>
                  <div className={whatWeMake.groupHeader}>
                    <h3 className={whatWeMake.groupTitle}>{category.title}</h3>
                    <Body segments={category.body} className={whatWeMake.groupBody} />
                  </div>
                  <div className={whatWeMake.desktopGrid}>
                    {desktopTiles.map((tile) => (
                      <Card
                        key={tile.href}
                        label={tile.label}
                        href={tile.href}
                        image={tile.image}
                        mediaRadius="none"
                        mediaAspectClassName={whatWeMake.desktopTileMedia}
                        parallax
                      />
                    ))}
                    <Link href={category.href} className={whatWeMake.desktopGridCta}>
                      View All {ctaLabel(category)}
                      <NextArrowIcon className={whatWeMake.desktopCtaIcon} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={whatWeMake.mobileSection}>
        <div className={whatWeMake.root}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="light"
          />
          <div className={whatWeMake.groupsGap}>
            {content.categories.map((category) => {
              return (
                <div key={category.title} className={whatWeMake.group}>
                  <div className={whatWeMake.groupHeader}>
                    <h3 className={whatWeMake.groupTitle}>{category.title}</h3>
                    <Body segments={category.body} className={whatWeMake.groupBody} />
                  </div>
                  {/* Mobile and tablet (below xl) -- capped to the first 4
                      tiles, plus the "View All" CTA, at every width in this
                      range. Desktop's own separate grid (xl:) covers every
                      tile via its own "CTA fills the last row cell" rule. */}
                  <div className={mobileGridVariant ? whatWeMake.mobileListGrid : whatWeMake.mobileList}>
                    {category.tiles.slice(0, mobileGridVariant ? MOBILE_TILE_LIMIT_GRID : MOBILE_TILE_LIMIT).map((tile) => (
                      <a key={tile.href} href={tile.href} className={whatWeMake.mobileTile}>
                        <ParallaxMedia
                          label={tile.label}
                          image={tile.image}
                          ratio={mobileGridVariant ? "79:100" : "1:1"}
                          radius="none"
                          className={mobileGridVariant ? undefined : whatWeMake.mobileTileMedia}
                        />
                        <span className={mobileGridVariant ? whatWeMake.mobileTileLabelGrid : whatWeMake.mobileTileLabel}>
                          {tile.label}
                        </span>
                      </a>
                    ))}
                  </div>
                  <Button href={category.href} variant="secondary" className={whatWeMake.mobileGroupCta}>
                    View All {ctaLabel(category)}
                    <ChevronRight className={whatWeMake.ctaIcon} aria-hidden="true" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
