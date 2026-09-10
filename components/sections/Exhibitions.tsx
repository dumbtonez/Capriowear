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

import { useEffect, useRef, useState } from "react";

import { DesktopChevron, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { cardCarousel, exhibitions } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type ExhibitionsProps = {
  content: typeof home.exhibitions;
};

// Mobile 300px, tablet 469px -- same values/reasoning as InsideFactory.tsx's
// own identical constants (owner, 2026-09-09: tablet swipes with dots now,
// keeping its own already-defined wider card size).
const CARD_WIDTH_MOBILE = 300;
const CARD_WIDTH_TABLET = 469;
const ACTIVE_HEIGHT_MOBILE = 340;
const INACTIVE_HEIGHT_MOBILE = 248;
const ACTIVE_HEIGHT_TABLET = 532;
const INACTIVE_HEIGHT_TABLET = 388;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// Desktop gallery card pitch -- must match exhibitions.desktopCard's width
// and exhibitions.desktopRow's gap-6. `xl:` (1280px+) only now, same as
// InsideFactory.tsx's own gallery -- tablet moved to the swipe+dots
// carousel below.
const DESKTOP_CARD_WIDTH = 469;
const DESKTOP_CARD_GAP = 24;

function DesktopScroller({ shots }: { shots: typeof home.exhibitions.media }) {
  const { wrapRef, trackRef, chevronRef, dotRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
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
      <DesktopChevron chevronRef={chevronRef} dotRef={dotRef} direction={direction} />
    </div>
  );
}

function MobileCarousel({ shots }: { shots: typeof home.exhibitions.media }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Dot pagination (owner, 2026-09-09: "under inside the factory and
  // exhibition images, add dots for showing it has multiple images") --
  // same shared `cardCarousel` dot recipe/mechanism as Inside the
  // Factory's own identical carousel, see that file's own comment.
  const [activeIndex, setActiveIndex] = useState(0);
  // This carousel now also covers tablet width (owner, 2026-09-09: swap
  // the tablet chevron for swipe+dots) -- same `matchMedia` pattern
  // InsideFactory.tsx's own identical carousel uses, see that file's own
  // comment.
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setIsTablet(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const cardWidth = isTablet ? CARD_WIDTH_TABLET : CARD_WIDTH_MOBILE;
  const activeHeight = isTablet ? ACTIVE_HEIGHT_TABLET : ACTIVE_HEIGHT_MOBILE;
  const inactiveHeight = isTablet ? INACTIVE_HEIGHT_TABLET : INACTIVE_HEIGHT_MOBILE;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const update = () => {
      const scrollLeft = track.scrollLeft;
      let nearest = 0;
      let nearestDistance = Infinity;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const distance = Math.min(Math.abs(scrollLeft - index * cardWidth) / cardWidth, 1);
        card.style.height = `${lerp(activeHeight, inactiveHeight, distance)}px`;
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
    // No `items-center` -- same real overflow bug as InsideFactory.tsx's
    // own identical wrapper (see that file's own comment): `exhibitions.
    // mobileTrack` has no explicit width class, relying on default
    // block-fill behavior; `items-center`'s non-`stretch` alignment sized
    // it to its own un-clipped content width instead. Default
    // `align-items: stretch` keeps the track's old, correct sizing; the
    // dots row centres itself instead (`mx-auto`).
    // No `gap-*` -- the track-to-dots spacing now lives on the shared
    // `cardCarousel.dotsRow` itself (`mt-[28px]`), owner: "dots are too
    // close make 12px gap from the top, apply it to all".
    <div className="flex w-full flex-col">
      <div ref={trackRef} className={exhibitions.mobileTrack}>
        {shots.map((shot, index) => (
          <div
            key={shot.label}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={exhibitions.mobileCard}
            style={{ height: index === 0 ? activeHeight : inactiveHeight }}
          >
            <MediaPlaceholder label={shot.label} radius="none" tone="dark" className="h-full" />
          </div>
        ))}
      </div>
      <div className={cx(cardCarousel.dotsRow, "mx-auto")}>
        {shots.map((shot, index) => (
          <span
            key={shot.label}
            className={cx(cardCarousel.dot, index === activeIndex ? cardCarousel.dotActive : cardCarousel.dotInactive)}
          />
        ))}
      </div>
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
            heading={<TextReveal as="span" text={content.h2} />}
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
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="dark"
            align="center"
            // Tablet 2-line wrap, 2026-09-10 (owner: "tablet, exhibition
            // title should be in 2 lines like other titles") -- this
            // block's own wrapper spans real mobile AND tablet (`xl:hidden`,
            // see `exhibitions.mobileSection`'s own comment), and had no
            // width constraint at either tier, so tablet's wider container
            // let the heading sit on one line. Reuses the same
            // `desktopHeadingWidth` (812px) the desktop block above already
            // uses for this identical string -- `text-h1`'s own fluid clamp
            // means the narrower tablet font size still wraps to 2 lines
            // (or fewer) under the same cap, not more; real mobile's own
            // much narrower viewport is unaffected by an 812px cap.
            headingClassName={exhibitions.desktopHeadingWidth}
          />
        </div>
        <div className={exhibitions.mobileGalleryGap}>
          <MobileCarousel shots={content.media} />
        </div>
      </div>
    </section>
  );
}
