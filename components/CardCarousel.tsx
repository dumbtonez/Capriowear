// components/CardCarousel.tsx
// Swipeable mobile card carousel: a native CSS scroll-snap track of
// CapabilityCards plus a dot-per-card pagination row that tracks the
// nearest-centred card live. First built for Our Services (2026-08-25),
// extracted here once How It Works needed the exact same pattern -- "build
// once, reuse everywhere," same reasoning as ScrollSpotlightList.
//
// Client component: tracking which card is nearest the track's centre is a
// scroll-position-driven visual state with no static-CSS equivalent, same
// category as InsideFactory's carousel and ScrollSpotlightList.
"use client";

import { useEffect, useRef, useState } from "react";

import { CapabilityCard, type CardImage } from "./Card";
import { cardCarousel } from "./ui/styles";
import { cx } from "./ui/cx";

export type CardCarouselItem = {
  title: string;
  body: string;
  image?: CardImage;
};

export type CardCarouselProps = {
  items: CardCarouselItem[];
  /** This section's own confirmed media aspect ratio (mobile/desktop classes). */
  cardMediaRatio: string;
  /**
   * `"light"` (default) or `"dark"` -- forwarded straight through to each
   * `CapabilityCard`'s own `tone` (How It Works' dark variant, 2026-09-07).
   * The dot pagination below is unaffected -- both its colours already read
   * fine on either background.
   */
  tone?: "light" | "dark";
  /**
   * Forwarded straight through to each `CapabilityCard`'s own
   * `rootClassName`/`bodyClassName` (Our Services' dark variant,
   * 2026-09-09, so its mobile carousel gets the same 32px/16px card gaps
   * as its desktop list) -- same default-through-to-the-component-default
   * shape `CapabilityCard` itself already uses. `undefined` for every
   * existing caller (light Our Services, How It Works), so neither
   * changes.
   */
  rootClassName?: string;
  bodyClassName?: string;
  /**
   * Overrides each card's own width/snap classes -- default `undefined`
   * falls through to `cardCarousel.card` (`w-[280px] shrink-0 snap-start`),
   * unaffected for every existing caller (Our Services, How It Works'
   * mobile-only usage). How It Works' now-also-tablet usage (owner,
   * 2026-09-09: swap the tablet chevron for swipe+dots, keeping tablet's
   * own already-defined wider ~469px card) passes a `md:w-[469px]` variant
   * -- the track's own `activeIndex` tracking already reads each card's
   * real rendered `offsetLeft`/`offsetWidth`, not a hardcoded pixel
   * constant, so a wider card needs no other change here.
   */
  cardClassName?: string;
  /** Forwarded straight through to each `CapabilityCard`'s own `parallax`
   *  (2026-09-12, mobile half of the same zoom-and-settle rollout its
   *  desktop callers opted into -- see `CapabilityCard`'s own comment).
   *  Default false: unchanged for any caller that hasn't opted in yet. */
  parallax?: boolean;
};

export function CardCarousel({
  items,
  cardMediaRatio,
  tone = "light",
  rootClassName,
  bodyClassName,
  cardClassName = cardCarousel.card,
  parallax = false,
}: CardCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const update = () => {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let nearestDistance = Infinity;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - trackCenter);
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
  }, []);

  return (
    <>
      <div ref={trackRef} className={cardCarousel.track}>
        {items.map((item, index) => (
          <div
            key={item.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={cardClassName}
          >
            <CapabilityCard
              title={item.title}
              body={item.body}
              image={item.image}
              mediaAspectClassName={cardMediaRatio}
              mediaRadius="none"
              tone={tone}
              rootClassName={rootClassName}
              bodyClassName={bodyClassName}
              parallax={parallax}
            />
          </div>
        ))}
      </div>
      <div className={cardCarousel.dotsRowTight}>
        {items.map((item, index) => (
          <span
            key={item.title}
            className={cx(cardCarousel.dot, index === activeIndex ? cardCarousel.dotActive : cardCarousel.dotInactive)}
          />
        ))}
      </div>
    </>
  );
}
