// components/sections/InsideFactory.tsx
// Homepage section 9. Figma: desktop node 402:904, mobile node 402:914.
//
// The third dark section (Hero, Stats, now this). Genuinely different
// treatments per breakpoint, not one responsive layout:
//   - Desktop: a chevron-driven, snap-centred carousel through all 5 real
//     shots (owner request, 2026-08-26 -- replaces an earlier static 3-tile
//     narrow-wide-narrow row, which only ever showed the first 3). The
//     chevron mechanism itself is the shared `useDesktopChevronScroller`
//     hook (components/DesktopChevronScroller.tsx), not a local copy -- see
//     that file for the current requestAnimationFrame-smoothed
//     implementation, also used by How It Works and Exhibitions.
//   - Mobile: a finger-swipeable carousel via native CSS scroll-snap, no
//     auto-rotation. Confirmed from the owner's own animation reference
//     (a Shopify marketing page, reference/): they were swiping it by hand,
//     not watching it auto-advance -- the recording just didn't show the
//     finger. The centred (active) card renders taller than its neighbours
//     -- a real overlap effect confirmed via get_metadata (300x340 active
//     vs 300x248 inactive), not a uniform flat filmstrip. Since every card
//     becomes "active" as the user swipes through in turn, this needs a
//     small amount of client state (which card is nearest the track's
//     centre), tracked from the track's own scroll position.
//
// Heading is SectionHeading (align="center", eyebrowTone="dark") at both
// breakpoints -- the sitewide eyebrow-colour rule (2026-08-24) means this
// section needs no custom colour override, so the earlier reason for
// bespoke markup (avoiding a colour-class conflict) no longer applies.
//
// `showMediaLabel` (default true, every existing usage unaffected): false
// drops the visible caption `MediaPlaceholder`'s no-`image` placeholder
// fill renders by default -- /our-factory's own mobile-only correction
// (owner, 2026-09-09: "factory shots, remove the label from the images").
//

// Takes its heading and media list as props (not a direct content/home.ts
// import), so any page can render this section with its own shots -- see
// app/page.tsx for the homepage's values.
"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/Button";
import { DesktopChevron, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { cardCarousel, insideFactory } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type InsideFactoryProps = {
  content: typeof home.insideFactory;
  /**
   * Defaults to "dark" -- the homepage's own confirmed design (bg-ink,
   * paper text/cards). "light" is /our-factory's reuse (owner, 2026-09-08:
   * "the inside the factory section we use on homepage ... on white
   * background") -- bg-paper/text-text, placeholders switch to their own
   * light tone.
   */
  tone?: "light" | "dark";
  /**
   * Defaults to true (the homepage's own eyebrow + H2). false drops both
   * entirely (owner, 2026-09-08, same /our-factory brief: "not eyebrow and
   * title") -- the gallery's own top inset (`desktopGalleryWrap`'s
   * `pt-[72px]`) still applies with no heading above it, which happens to
   * land on this site's own standard 72px section-to-section gap, so no
   * separate no-heading token is needed there. Mobile's heading-to-gallery
   * `mt-12` is skipped instead, since `mobileSection`'s own `pt-12` already
   * supplies the top inset once there's no heading to gap from.
   */
  showHeading?: boolean;
  /**
   * Defaults to true (the homepage's own "Take Factory Tour" CTA under the
   * gallery). false drops it (owner, 2026-09-08: "remove the factory cta
   * for this page, not from the homepage component") -- /our-factory IS
   * the factory tour destination that CTA links to, so it has no reason to
   * link to itself there; the homepage keeps the CTA via this prop's
   * default, unchanged.
   */
  showCta?: boolean;
  /**
   * Defaults to true (every existing usage, including the homepage's own
   * mobile carousel, is unaffected). false drops the visible caption
   * `MediaPlaceholder` renders by default on the no-`image` placeholder
   * fill -- /our-factory's own mobile-only correction (owner, 2026-09-09:
   * "factory shots, remove the label from the images"). `label` still
   * supplies the alt text either way (`MediaPlaceholder`'s own contract).
   * Desktop is untouched either way -- `DesktopGallery` already sets its
   * own `showLabel={false}` plus a separate real `<p>` caption, unrelated
   * to this prop.
   */
  showMediaLabel?: boolean;
};

// Mobile 300px, tablet 469px (owner, 2026-09-09: "on tablet... show dots
// under like mobile" -- tablet now swipes natively with dots, the same
// `MobileCarousel` mechanism, just at its own already-defined wider card
// size instead of shrinking back to the 300px mobile card). 469px is the
// same value this file's own desktop chevron gallery already used for its
// own former tablet tier (see `DESKTOP_CARD_WIDTH`'s own comment below) --
// reused, not re-derived. Active/inactive heights scale by the same
// 469/300 ratio so the active-card-taller proportions stay identical at
// the wider size, not a new arbitrary design value.
const CARD_WIDTH_MOBILE = 300;
const CARD_WIDTH_TABLET = 469;
const ACTIVE_HEIGHT_MOBILE = 340;
const INACTIVE_HEIGHT_MOBILE = 248;
const ACTIVE_HEIGHT_TABLET = 532;
const INACTIVE_HEIGHT_TABLET = 388;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// Desktop gallery card pitch -- must match insideFactory.desktopCard's width
// (1200px) and insideFactory.desktopRow's gap-12 (48px). `xl:` (1280px+)
// only now (owner, 2026-09-09: tablet moved to the swipe+dots carousel
// below instead of this chevron gallery -- see that carousel's own
// `CARD_WIDTH_TABLET` comment) -- no more `matchMedia`/tablet branch
// needed here, since this component never renders below `xl:` any more.
const DESKTOP_CARD_WIDTH = 1200;
const DESKTOP_CARD_GAP = 48;

function DesktopGallery({
  shots,
  tone,
}: {
  shots: typeof home.insideFactory.media;
  tone: "light" | "dark";
}) {
  const { wrapRef, trackRef, chevronRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
    useDesktopChevronScroller(DESKTOP_CARD_WIDTH + DESKTOP_CARD_GAP);

  return (
    <div
      ref={wrapRef}
      className={insideFactory.desktopScrollerWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={trackRef} className={insideFactory.desktopRow}>
        {shots.map((shot) => (
          <div key={shot.label} className={insideFactory.desktopCard}>
            <MediaPlaceholder
              label={shot.label}
              ratio="15:8"
              radius="none"
              tone={tone}
              showLabel={false}
              className={insideFactory.desktopCardMedia}
            />
            <p className={tone === "light" ? insideFactory.desktopCardLabelLight : insideFactory.desktopCardLabel}>
              {shot.label}
            </p>
          </div>
        ))}
      </div>
      <DesktopChevron chevronRef={chevronRef} direction={direction} />
    </div>
  );
}

function MobileCarousel({
  shots,
  tone,
  showLabel = true,
}: {
  shots: typeof home.insideFactory.media;
  tone: "light" | "dark";
  showLabel?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Dot pagination (owner, 2026-09-09: "under inside the factory and
  // exhibition images, add dots for showing it has multiple images") --
  // same `cardCarousel` dot recipe `CardCarousel.tsx` already uses for Our
  // Services/How It Works' own mobile carousels, reused here rather than
  // a new one-off, even though this carousel's own height-interpolation
  // mechanism is bespoke (see the `update()` comment below). React state,
  // not a direct DOM write like the height loop below -- a dot's active/
  // inactive swap only needs to happen once per settled card, not every
  // scroll frame, so it doesn't carry the same per-frame re-render cost
  // the height write was written to avoid.
  const [activeIndex, setActiveIndex] = useState(0);
  // This carousel now also covers tablet width (owner, 2026-09-09: swap
  // the tablet chevron for swipe+dots, same mechanism as mobile, just at
  // tablet's own wider already-defined card size) -- same `matchMedia`
  // pattern `DesktopGallery` above used for its own former tablet branch,
  // now moved here since this is the component that needs it.
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

    // Continuous, not a two-state swap: each card's height is interpolated
    // by its own live distance from the track's centre every scroll frame,
    // so it grows/shrinks in exact lockstep with the finger instead of
    // popping between two fixed sizes at a rounded threshold -- confirmed
    // as the actual source of the jerkiness the owner flagged (2026-08-24).
    // Writes go straight to each card's DOM style, not React state, so a
    // 60fps drag never waits on a re-render.
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
    // No `items-center` on this wrapper (real bug, found live via the
    // Playwright overflow sweep): `insideFactory.mobileTrack` has no
    // explicit width class of its own -- it always relied on simply being
    // an ordinary block-level child, which fills its container's width by
    // default. Once it became a flex item here, `items-center` (a
    // non-`stretch` cross-axis alignment) made the browser size it to its
    // own un-clipped CONTENT width (1575px, all 5 cards) instead of
    // stretching to the column's width, forcing real page-level
    // horizontal scroll. Default `align-items: stretch` (omitting the
    // class entirely) keeps the track's old, correct full-width sizing;
    // the dots row is centred on its own instead (`mx-auto`), via
    // `cardCarousel.dotsRow`'s own intrinsic/content width.
    <div className="flex w-full flex-col gap-4">
      <div ref={trackRef} className={insideFactory.mobileTrack}>
        {shots.map((shot, index) => (
          <div
            key={shot.label}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={insideFactory.mobileCard}
            style={{ height: index === 0 ? activeHeight : inactiveHeight }}
          >
            <MediaPlaceholder label={shot.label} radius="none" tone={tone} showLabel={showLabel} className="h-full" />
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

export function InsideFactory({
  content,
  tone = "dark",
  showHeading = true,
  showCta = true,
  showMediaLabel = true,
}: InsideFactoryProps) {
  return (
    <section>
      {/* Desktop: chevron-driven carousel through all 5 shots. The gallery
          is a full-bleed sibling of the (container-p-padded) heading, not
          nested inside it -- Figma's real gallery spans the frame's full
          width, unlike the heading. */}
      <div className={tone === "light" ? insideFactory.desktopOuterLight : insideFactory.desktopOuter}>
        {showHeading ? (
          <div className={insideFactory.desktopSection}>
            <SectionHeading
              eyebrow={<TextReveal text={content.eyebrow} />}
              heading={<TextReveal as="span" text={content.h2} />}
              eyebrowTone={tone}
              eyebrowSize={insideFactory.desktopEyebrowSize}
              headingClassName={insideFactory.desktopHeadingNarrow}
              align="center"
            />
          </div>
        ) : null}
        <div className={insideFactory.desktopGalleryWrap}>
          <DesktopGallery shots={content.media} tone={tone} />
          {showCta ? (
            <div className={insideFactory.desktopCtaWrap}>
              <Button href={content.cta.href}>{content.cta.label}</Button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile: finger-swipeable carousel, no auto-rotation */}
      <div className={cx(tone === "light" ? insideFactory.mobileSectionLight : insideFactory.mobileSection)}>
        {showHeading ? (
          <div className={insideFactory.mobileHeadingWrap}>
            <SectionHeading
              eyebrow={<TextReveal text={content.eyebrow} />}
              heading={<TextReveal as="span" text={content.h2} />}
              eyebrowTone={tone}
              eyebrowSize={insideFactory.mobileEyebrowSize}
              align="center"
            />
          </div>
        ) : null}
        <div className={showHeading ? insideFactory.mobileGalleryGap : undefined}>
          <MobileCarousel shots={content.media} tone={tone} showLabel={showMediaLabel} />
        </div>
        {showCta ? (
          <div className={insideFactory.mobileCtaWrap}>
            <Button href={content.cta.href}>{content.cta.label}</Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
