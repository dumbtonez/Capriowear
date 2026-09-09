// components/sections/OurFactoryTeam.tsx
// /our-factory page, section 10, "Skilled hands behind every stitch" --
// Figma desktop node 917:231 ("Content"), owner brief 2026-09-09.
//
// Centred heading + subline (no eyebrow -- confirmed against the node, and
// this page's only other eyebrow is `OurFactoryProcess`'s own "WHAT WE
// MAKE"), a full-bleed hero photo, then a gallery of 4 staggered-height
// photos. Genuinely different mechanisms per breakpoint, not one
// responsive layout: a chevron-driven scroller at true desktop (`xl:`+,
// same `useDesktopChevronScroller` mechanism `OurFactoryProcess`/
// `InsideFactory`/`Exhibitions` already use), a native CSS scroll-snap
// slider with dot pagination at mobile and tablet (owner, 2026-09-09: "on
// tablet ... the images below should have slider with the [chevron] and
// add dots under it" / "on mobile ... treat the below section proper
// slider" -- the gallery had no responsive handling at all before this,
// so on an actual touch device it couldn't scroll at all: the chevron
// hook only responds to mouse events, per its own header comment). Same
// "two genuinely different mechanisms, not one trying to cover every
// input type" split InsideFactory/Exhibitions already use for their own
// galleries.
//
// No mobile/tablet Figma frame exists for this node -- every mobile/
// tablet spacing value below is a judgement call (documented inline in
// components/ui/styles.ts), not a confirmed measurement, same caveat
// `OurFactoryProcess`/`OurFactoryDetails` above already carry for their
// own responsive fallbacks.
//
// Images use `ParallaxMedia` (owner, 2026-09-09: "these section images
// should have the same parallax effect we added to what we make section")
// -- the same one-time zoom-and-settle reveal `OurFactoryProcess`'s own
// gallery already uses, both the hero photo and every gallery item, not a
// second animated-media component.
//
// Client component: `useDesktopChevronScroller` (cursor-tracking rAF loop)
// and the slider's own scroll-position tracking both need DOM/browser
// APIs, same as every other caller of this hook (InsideFactory,
// Exhibitions, ProductCustomizeSteps).
"use client";

import { useEffect, useRef, useState } from "react";

import { DesktopChevron, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { ParallaxMedia } from "@/components/ParallaxMedia";
import { TextReveal } from "@/components/TextReveal";
import { cardCarousel, ourFactoryTeam } from "@/components/ui/styles";
import { cx } from "@/components/ui/cx";
import type { NoteSegment } from "@/content/activewear/types";
import type { ourFactory } from "@/content/our-factory";

export type OurFactoryTeamProps = {
  content: typeof ourFactory.teamGallery;
};

const ITEM_WIDTH = 500;
const ITEM_GAP = 40;

function Subline({ segments }: { segments: NoteSegment[] }) {
  return (
    <p className={ourFactoryTeam.subline}>
      {segments.map((segment, index) =>
        segment.bold ? (
          <span key={index} className={ourFactoryTeam.sublineBold}>
            {segment.text}
          </span>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

function DesktopScroller({ media }: { media: typeof ourFactory.teamGallery.media }) {
  const { wrapRef, trackRef, chevronRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
    useDesktopChevronScroller(ITEM_WIDTH + ITEM_GAP);

  return (
    <div
      ref={wrapRef}
      className={ourFactoryTeam.galleryWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={trackRef} className={ourFactoryTeam.galleryRow}>
        {media.map((item) => (
          <div key={item.label} className={cx(ourFactoryTeam.item, ourFactoryTeam.itemHeight[item.size])}>
            <ParallaxMedia label={item.label} radius="none" showLabel={false} className="h-full" />
          </div>
        ))}
      </div>
      <DesktopChevron chevronRef={chevronRef} direction={direction} />
    </div>
  );
}

function Slider({ media }: { media: typeof ourFactory.teamGallery.media }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Nearest-item detection via each item's own real DOM offset, not a
    // pitch-math formula (`width + gap`) -- found live, that formula
    // drifted a full index off because it didn't account for the track's
    // own leading `px-5`/`md:px-8` scroll-snap padding, which shifts every
    // item's real snap position by that same amount. Same "compare each
    // item's own centre to the track's centre" technique CardCarousel.tsx
    // already uses for its own dot pagination, not a new one -- robust to
    // padding/gap/breakpoint changes since it reads real layout instead of
    // assuming a formula.
    let ticking = false;
    const update = () => {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let nearestDistance = Infinity;
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const distance = Math.abs(itemCenter - trackCenter);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });
      setActiveIndex(nearest);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [media.length]);

  return (
    <div className={ourFactoryTeam.sliderWrap}>
      <div ref={trackRef} className={ourFactoryTeam.sliderTrack}>
        {media.map((mediaItem, index) => (
          <div
            key={mediaItem.label}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={cx(ourFactoryTeam.sliderItem, ourFactoryTeam.sliderItemHeight[mediaItem.size])}
          >
            <ParallaxMedia label={mediaItem.label} radius="none" showLabel={false} className="h-full" />
          </div>
        ))}
      </div>
      <div className={ourFactoryTeam.sliderDotsRow}>
        {media.map((mediaItem, index) => (
          <span
            key={mediaItem.label}
            className={cx(cardCarousel.dot, index === activeIndex ? cardCarousel.dotActive : cardCarousel.dotInactive)}
          />
        ))}
      </div>
    </div>
  );
}

export function OurFactoryTeam({ content }: OurFactoryTeamProps) {
  return (
    <section className={ourFactoryTeam.section}>
      <div className={ourFactoryTeam.inner}>
        <div className={ourFactoryTeam.headingCol}>
          <TextReveal as="h2" text={content.heading} className={ourFactoryTeam.heading} />
          <Subline segments={content.subline} />
        </div>

        <div className={ourFactoryTeam.heroWrap}>
          <ParallaxMedia
            label={content.hero.label}
            ratio="8:5"
            radius="none"
            showLabel={false}
            className={ourFactoryTeam.heroRatioOverride}
          />
        </div>

        <DesktopScroller media={content.media} />
        <Slider media={content.media} />
      </div>
    </section>
  );
}
