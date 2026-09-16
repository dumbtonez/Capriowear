// components/sections/OurStory.tsx
// Homepage "Our Story" section -- a 10-milestone company timeline (2009 ->
// Today) on a dedicated black surface, sitting directly above Our Services
// (see app/page.tsx's own placement comment for the owner's ordering call,
// 2026-09-16).
//
// Sticky year mechanic is plain CSS `position: sticky` (`ourStory.yearCol`,
// `top-[88px]`) -- no scroll-listener JS, same pattern already established
// by `OurServices.tsx`'s own sticky sidebar. The current ("Today") milestone
// is a static content flag (`item.current === true`), not scroll-computed:
// only one row is ever marked current, so there's nothing to track.
//
// Desktop (`md:` up): two-column grid per row, sticky year column pinning
// while the image/title/body column scrolls past. Mobile: single column,
// the year sits as a small inline label directly above its own image, in
// normal document flow (no sticky -- no second column to pin against).
import Image from "next/image";

import { SectionHeading } from "@/components/SectionHeading";
import { ourStory } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";

export type OurStoryProps = {
  content: typeof capriosportsHome.ourStory;
};

export function OurStory({ content }: OurStoryProps) {
  return (
    <section>
      <div className={ourStory.darkSurface}>
        <div className={ourStory.section}>
          <SectionHeading
            eyebrow={content.eyebrow}
            heading={content.h2}
            eyebrowTone="dark"
            headingClassName={ourStory.heading}
          />

          <div className={ourStory.rows}>
            {content.items.map((item) => {
              const isCurrent = item.current === true;
              return (
                <div key={item.year + item.title} data-current={isCurrent ? "true" : undefined}>
                  {/* Desktop row: sticky year + image/title/body */}
                  <div className={ourStory.row}>
                    <div className={ourStory.yearCol}>
                      <span className={isCurrent ? ourStory.yearNumCurrent : ourStory.yearNum}>
                        {item.year}
                        {isCurrent ? <span className={`ml-2 ${ourStory.pulseDot}`} aria-hidden="true" /> : null}
                      </span>
                      {/* "Today" isn't a year -- the "Year" tag under it
                          doesn't make sense (owner, 2026-09-16: "Today,
                          remove the year from it"). Pulse dot moves inline
                          next to the number instead of living in this tag. */}
                      {!isCurrent ? <span className={ourStory.yearTag}>Year</span> : null}
                    </div>
                    <div className={ourStory.body}>
                      <MilestoneImage item={item} className={ourStory.image} />
                      <p className={`${ourStory.title} ${ourStory.titleSpacing}`}>{item.title}</p>
                      <p className={`${ourStory.desc} ${ourStory.descSpacing}`}>{item.body}</p>
                    </div>
                  </div>

                  {/* Mobile row: inline year label, static, above the image */}
                  <div className={ourStory.mobileRow}>
                    <div className={ourStory.mobileYear}>
                      <span className={isCurrent ? ourStory.mobileYearNumCurrent : ourStory.mobileYearNum}>
                        {item.year}
                        {isCurrent ? <span className={`ml-2 ${ourStory.pulseDot}`} aria-hidden="true" /> : null}
                      </span>
                      {!isCurrent ? <span className={ourStory.mobileYearTag}>Year</span> : null}
                    </div>
                    <MilestoneImage
                      item={item}
                      className={`${ourStory.mobileImage} ${ourStory.mobileImageSpacing}`}
                    />
                    <p className={`${ourStory.title} ${ourStory.mobileTitleSpacing}`}>{item.title}</p>
                    <p className={`${ourStory.desc} ${ourStory.descSpacing}`}>{item.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// Plain empty box when no `image` is assigned yet -- no label, no border,
// no radius, at either breakpoint (owner, 2026-09-16: apply the same
// treatment on mobile as desktop). Real photography swaps in via `Image`
// once a specific photo is assigned per milestone.
function MilestoneImage({
  item,
  className,
}: {
  item: { title: string; image?: { src: string; alt: string } };
  className: string;
}) {
  if (item.image) {
    return (
      <div className={className}>
        <Image src={item.image.src} alt={item.image.alt} fill className="object-cover" />
      </div>
    );
  }
  return <div className={className} />;
}
