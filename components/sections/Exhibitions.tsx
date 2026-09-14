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

import { DesktopChevron, DesktopPillIndicator, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { ParallaxMedia } from "@/components/ParallaxMedia";
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
const DESKTOP_CARD_GAP = 24; // owner, 2026-09-12: reverted to 24 the same day ("make it 24px") -- Exhibitions keeps its own value, unlike the other four chevron galleries (matching exhibitions.desktopReel)

// Real click-and-drag/swipe with velocity-based momentum, plus a segmented
// pill progress indicator below the row -- owner, 2026-09-13: "apply this
// same transition with the counter on the bottom that we built for [Inside
// the Factory]" (to this section, How It Works, and Trust Signals). `loop:
// true` matches Inside the Factory's own carousel-loop behaviour rather than
// the plain clamp this section used before. `tone="dark"` fixed, not a prop
// -- this section has no light-section usage anywhere (`exhibitions.
// desktopOuter`'s own `bg-ink`), unlike How It Works.
//
// Pill segment count is `slideCount` (the hook's own real, measured stop
// count), NOT `shots.length` -- real bug, found live, owner: "the counter
// should be based on the number of scrolls/slides needed... it should be
// dynamic" -- unlike Inside the Factory's wide cards (one item really is
// one page there), this row's narrower 469px cards fit more than one per
// view, so the number of real clicks/flicks needed to reach the end is
// fewer than the item count -- and needs to stay correct automatically if
// a future content update ships more/fewer real images.
function DesktopScroller({ shots }: { shots: typeof home.exhibitions.media }) {
  const {
    wrapRef,
    trackRef,
    reelRef,
    chevronRef,
    dotRef,
    direction,
    activeIndex,
    slideCount,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handlePointerDown,
    handlePointerMoveDrag,
    handlePointerUp,
    handlePointerCancel,
  } = useDesktopChevronScroller(DESKTOP_CARD_WIDTH + DESKTOP_CARD_GAP, true, { enabled: true });

  return (
    <>
      <div
        ref={wrapRef}
        className={exhibitions.desktopScrollerWrap}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={(event) => {
          // `PointerEvent` covers `MouseEvent`'s own shape (clientX/Y,
          // timeStamp), so the same event feeds both: the chevron's cursor
          // tracking (unaffected by dragging) and the drag/momentum logic.
          handleMouseMove(event);
          handlePointerMoveDrag(event);
        }}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <div ref={trackRef} className={exhibitions.desktopRow}>
          <div ref={reelRef} className={exhibitions.desktopReel}>
            {shots.map((shot) => (
              <div key={shot.label} className={exhibitions.desktopCard}>
                <ParallaxMedia label={shot.label} image={shot.image} ratio="469:320" radius="none" showLabel={false} revealRootRef={trackRef} eager />
              </div>
            ))}
          </div>
        </div>
        <DesktopChevron chevronRef={chevronRef} dotRef={dotRef} direction={direction} />
      </div>
      <DesktopPillIndicator count={slideCount} activeIndex={activeIndex} tone="dark" gap="loose" />
    </>
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

  // Loop back to the first slide once a swipe pushes past the real last one
  // (owner, 2026-09-13: "make the exhibition section start from the
  // beginning if users slides after the images are finished") -- matches
  // the desktop chevron/drag reel's own already-correct `loop: true` wrap
  // (`useDesktopChevronScroller`), which this native-scroll mobile/tablet
  // carousel has no equivalent of on its own. Native scroll just clamps
  // `scrollLeft` at the end with no event marking "the user tried to keep
  // going" -- detected here instead via a real touch gesture: a forward
  // swipe (finger moves left, `deltaX` negative) that both STARTS and ENDS
  // already at the true max scroll position is a swipe attempted past the
  // last card, not just a swipe that happened to land on it. A swipe that
  // only reaches the end DURING the gesture (starts short of it) is a
  // normal "arrive at the last card" swipe and must not loop.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let touchStartX = 0;
    let scrollAtTouchStart = 0;
    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      scrollAtTouchStart = track.scrollLeft;
    };
    const onTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;
      const deltaX = touch.clientX - touchStartX;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (deltaX < -20 && scrollAtTouchStart >= maxScroll - 2 && track.scrollLeft >= maxScroll - 2) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        track.scrollTo({ left: 0, behavior: reduceMotion ? "auto" : "smooth" });
      }
    };
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

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
            <MediaPlaceholder label={shot.label} image={shot.image} radius="none" tone="dark" showLabel={false} className="h-full" eager />
          </div>
        ))}
      </div>
      <div className={cx(cardCarousel.dotsRow, "justify-center")}>
        <span className={cardCarousel.counter} aria-hidden="true">
          {activeIndex + 1} / {shots.length}
        </span>
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
