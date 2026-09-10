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
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
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

// Mobile/tablet slider constants, identical to `Exhibitions.tsx`'s own
// (owner, 2026-09-10: "for them use the same component we used for
// homepage exhibition section images style") -- see `ourFactoryTeam.
// sliderTrack`'s own comment in components/ui/styles.ts.
const SLIDER_WIDTH_MOBILE = 300;
const SLIDER_WIDTH_TABLET = 469;
const SLIDER_ACTIVE_HEIGHT_MOBILE = 340;
const SLIDER_INACTIVE_HEIGHT_MOBILE = 248;
const SLIDER_ACTIVE_HEIGHT_TABLET = 532;
const SLIDER_INACTIVE_HEIGHT_TABLET = 388;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

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

// Mirrors `Exhibitions.tsx`'s own `MobileCarousel` component-for-component
// (owner, 2026-09-10: "for them use the same component we used for
// homepage exhibition section images style") -- the nearest-to-centre card
// grows to the active height, its neighbours shrink to the inactive
// height, animated continuously via each frame's real `scrollLeft`, using
// `MediaPlaceholder` (not this page's usual `ParallaxMedia`, which the
// hero photo above keeps unchanged) to match Exhibitions' own image
// treatment exactly.
function Slider({ media }: { media: typeof ourFactory.teamGallery.media }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsTablet(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const cardWidth = isTablet ? SLIDER_WIDTH_TABLET : SLIDER_WIDTH_MOBILE;
  const activeHeight = isTablet ? SLIDER_ACTIVE_HEIGHT_TABLET : SLIDER_ACTIVE_HEIGHT_MOBILE;
  const inactiveHeight = isTablet ? SLIDER_INACTIVE_HEIGHT_TABLET : SLIDER_INACTIVE_HEIGHT_MOBILE;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const update = () => {
      const scrollLeft = track.scrollLeft;
      let nearest = 0;
      let nearestDistance = Infinity;
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const distance = Math.min(Math.abs(scrollLeft - index * cardWidth) / cardWidth, 1);
        item.style.height = `${lerp(activeHeight, inactiveHeight, distance)}px`;
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
  }, [cardWidth, activeHeight, inactiveHeight]);

  return (
    <div className={ourFactoryTeam.sliderWrap}>
      <div ref={trackRef} className={ourFactoryTeam.sliderTrack}>
        {media.map((mediaItem, index) => (
          <div
            key={mediaItem.label}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={ourFactoryTeam.sliderItem}
            style={{ height: index === 0 ? activeHeight : inactiveHeight }}
          >
            <MediaPlaceholder label={mediaItem.label} radius="none" showLabel={false} className="h-full" />
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
