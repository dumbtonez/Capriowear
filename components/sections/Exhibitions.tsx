// components/sections/Exhibitions.tsx
// New homepage section, not in the original wireframe numbering, rendered
// directly after Inside the Factory (owner call, 2026-08-26, corrected from
// an initial placement after How It Works). Figma: desktop node 455:2375,
// mobile node 455:2387.
//
// Owner instruction (2026-08-26): desktop behaves exactly like How It
// Works' chevron-driven scroller, mobile exactly like Inside the Factory's
// swipeable carousel. Confirmed as a real structural match, not just a
// vibe: the mobile card is 300x340/248, identical to Inside the Factory's
// own constants, and the desktop row's three 469px cards overflow the
// 1440px frame (third card's right edge lands at 1535px) exactly the way
// How It Works' 5-card row does -- both are genuinely scrollable rows, not
// fully-visible static layouts, so this reuses those two proven patterns
// directly rather than inventing a third variant. The chevron mechanism
// itself is the shared `useDesktopChevronScroller` hook
// (components/DesktopChevronScroller.tsx), not a local copy.
//
// No CTA in either Figma frame, unlike Inside the Factory -- this section
// ends with the gallery.
"use client";

import { useEffect, useRef } from "react";

import { DesktopChevron, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { exhibitions } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type ExhibitionsProps = {
  content: typeof home.exhibitions;
};

const CARD_WIDTH = 300;
const ACTIVE_HEIGHT = 340;
const INACTIVE_HEIGHT = 248;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// Desktop gallery card pitch -- must match exhibitions.desktopCard's width
// and exhibitions.desktopRow's gap-6.
const DESKTOP_CARD_WIDTH = 469;
const DESKTOP_CARD_GAP = 24;

function DesktopScroller({ shots }: { shots: typeof home.exhibitions.media }) {
  const { wrapRef, trackRef, chevronRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
    useDesktopChevronScroller(DESKTOP_CARD_WIDTH + DESKTOP_CARD_GAP);

  return (
    <div
      ref={wrapRef}
      className={exhibitions.desktopScrollerWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={trackRef} className={exhibitions.desktopRow}>
        {shots.map((shot) => (
          <div key={shot.label} className={exhibitions.desktopCard}>
            <MediaPlaceholder label={shot.label} ratio="469:320" radius="none" tone="dark" />
          </div>
        ))}
      </div>
      <DesktopChevron chevronRef={chevronRef} direction={direction} />
    </div>
  );
}

function MobileCarousel({ shots }: { shots: typeof home.exhibitions.media }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const update = () => {
      const scrollLeft = track.scrollLeft;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = Math.min(Math.abs(scrollLeft - index * CARD_WIDTH) / CARD_WIDTH, 1);
        card.style.height = `${lerp(ACTIVE_HEIGHT, INACTIVE_HEIGHT, distance)}px`;
      });
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
  }, []);

  return (
    <div ref={trackRef} className={exhibitions.mobileTrack}>
      {shots.map((shot, index) => (
        <div
          key={shot.label}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className={exhibitions.mobileCard}
          style={{ height: index === 0 ? ACTIVE_HEIGHT : INACTIVE_HEIGHT }}
        >
          <MediaPlaceholder label={shot.label} radius="none" tone="dark" className="h-full" />
        </div>
      ))}
    </div>
  );
}

export function Exhibitions({ content }: ExhibitionsProps) {
  return (
    <section>
      {/* Desktop: static-looking but scrollable row, chevron-paged -- same
          mechanism as How It Works, this section's own card size/gap. */}
      <div className={exhibitions.desktopOuter}>
        <div className={exhibitions.desktopHeadingWrap}>
          <SectionHeading
            eyebrow={content.eyebrow}
            heading={content.h2}
            eyebrowTone="dark"
            headingClassName={exhibitions.desktopHeadingWidth}
            align="center"
          />
        </div>
        <div className={exhibitions.desktopGalleryWrap}>
          <DesktopScroller shots={content.media} />
        </div>
      </div>

      {/* Mobile: finger-swipeable carousel, same mechanism as Inside the
          Factory (active card taller than its peeking neighbours). */}
      <div className={exhibitions.mobileSection}>
        <div className={exhibitions.mobileHeadingWrap}>
          <SectionHeading
            eyebrow={content.eyebrow}
            heading={content.h2}
            eyebrowTone="dark"
            eyebrowSize={exhibitions.mobileEyebrowSize}
            align="center"
          />
        </div>
        <div className={exhibitions.mobileGalleryGap}>
          <MobileCarousel shots={content.media} />
        </div>
      </div>
    </section>
  );
}
