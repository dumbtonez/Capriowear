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
import { Card } from "@/components/Card";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { whatWeMake } from "@/components/ui/styles";
import type { home } from "@/content/home";

type BodySegment = string | { bold: string };

export type WhatWeMakeProps = {
  content: typeof home.whatWeMake;
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

export function WhatWeMake({ content }: WhatWeMakeProps) {
  return (
    <section>
      <div className={whatWeMake.desktopSection}>
        <div className={whatWeMake.root}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="light"
            eyebrowSize={whatWeMake.eyebrowSize}
          />
          <div className={whatWeMake.groupsGap}>
            {content.categories.map((category) => (
              <div key={category.title} className={whatWeMake.group}>
                <div className={whatWeMake.groupHeader}>
                  <h3 className={whatWeMake.groupTitle}>{category.title}</h3>
                  <Body segments={category.body} className={whatWeMake.groupBody} />
                </div>
                <div className={whatWeMake.desktopGrid}>
                  {category.tiles.map((tile) => (
                    <Card
                      key={tile.href}
                      label={tile.label}
                      href={tile.href}
                      mediaRadius="none"
                      mediaAspectClassName={whatWeMake.desktopTileMedia}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={whatWeMake.mobileSection}>
        <div className={whatWeMake.root}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="light"
            eyebrowSize={whatWeMake.eyebrowSize}
          />
          <div className={whatWeMake.groupsGap}>
            {content.categories.map((category) => (
              <div key={category.title} className={whatWeMake.group}>
                <div className={whatWeMake.groupHeader}>
                  <h3 className={whatWeMake.groupTitle}>{category.title}</h3>
                  <Body segments={category.body} className={whatWeMake.groupBody} />
                </div>
                <div className={whatWeMake.mobileList}>
                  {category.tiles.map((tile) => (
                    <a key={tile.href} href={tile.href} className={whatWeMake.mobileTile}>
                      <MediaPlaceholder
                        label={tile.label}
                        ratio="1:1"
                        radius="none"
                        className={whatWeMake.mobileTileMedia}
                      />
                      <span className={whatWeMake.mobileTileLabel}>{tile.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
