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
import { ParallaxMedia } from "@/components/ParallaxMedia";
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
  /**
   * Mobile/tablet swipe carousel card proportions. Defaults to `"wide"`
   * (owner, 2026-09-10, real-photography test: "wider looks better, let's
   * use it" -- a ~4:3 landscape active card, replacing the original
   * near-square one so wide factory-floor/machine-row shots have room to
   * show their coverage). `"compact"` is that original ratio, kept as a
   * real selectable variant rather than deleted ("don't descard the other
   * one, keep it in the design system we might need it again") -- pick it
   * for a future gallery whose photography wants a tighter, more-portrait
   * crop instead. See `insideFactory.mobileTrackWide`/`mobileCardWide` vs.
   * `mobileTrackCompact`/`mobileCardCompact` in components/ui/styles.ts.
   */
  cardSize?: "wide" | "compact";
  /**
   * Defaults to true. false keeps the desktop gallery's own structure
   * (cards, chevron, captions) but blanks each card's real `image`.
   * Briefly set on both real callers 2026-09-11 (owner: "remove the images
   * testing from desktop, not mobile") while desktop had no real
   * photography worth showing yet -- reversed 2026-09-12 once the same 5
   * real (if still "test") factory photos proved the zoom-and-settle
   * `ParallaxMedia` treatment was worth locking in for this gallery (owner:
   * "keep them there as testing images, we will replace them with actual
   * when ready"), so neither real caller passes `false` any more. Left in
   * place, not deleted, as a real opt-out for a future gallery that needs
   * it. Mobile/tablet is unaffected by this prop either way. `content.media`
   * itself is never mutated -- only the array `DesktopGallery` renders from
   * here has each shot's `image` stripped when this is false.
   */
  showDesktopImages?: boolean;
};

// Two real, both-kept card size/height sets -- see `cardSize`'s own prop
// comment above for why both exist. `Wide`'s tablet values scale by the
// same width/height ratios `Compact`'s original mobile/tablet pair already
// used (340/255 active, 340/186 inactive), not re-derived independently.
const CARD_SIZE_WIDE = {
  mobileWidth: 340,
  tabletWidth: 530,
  activeHeightMobile: 255,
  inactiveHeightMobile: 186,
  activeHeightTablet: 398,
  inactiveHeightTablet: 290,
};
const CARD_SIZE_COMPACT = {
  mobileWidth: 300,
  tabletWidth: 469,
  activeHeightMobile: 340,
  inactiveHeightMobile: 248,
  activeHeightTablet: 532,
  inactiveHeightTablet: 388,
};

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// Desktop gallery card pitch -- must match insideFactory.desktopCard's width
// (1200px) and insideFactory.desktopRow's gap-12 (48px). `xl:` (1280px+)
// only now (owner, 2026-09-09: tablet moved to the swipe+dots carousel
// below instead of this chevron gallery -- see that carousel's own
// `CARD_SIZE_WIDE`/`CARD_SIZE_COMPACT` comment) -- no more `matchMedia`/
// tablet branch needed here, since this component never renders below
// `xl:` any more.
const DESKTOP_CARD_WIDTH = 1200;
const DESKTOP_CARD_GAP = 40; // owner, 2026-09-12: "make it 40px across the site" (was 48, matching insideFactory.desktopReel)

function DesktopGallery({
  shots,
  tone,
}: {
  shots: typeof home.insideFactory.media;
  tone: "light" | "dark";
}) {
  const { wrapRef, trackRef, reelRef, chevronRef, dotRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
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
        <div ref={reelRef} className={insideFactory.desktopReel}>
          {shots.map((shot) => (
            <div key={shot.label} className={insideFactory.desktopCard}>
              {/* Scroll-reveal zoom-and-settle, same `ParallaxMedia`
                  treatment as What We Make/Our Factory Process/Our Factory
                  Team -- locked in 2026-09-12 after a 2-card side-by-side
                  comparison against plain `MediaPlaceholder` (owner: "this
                  looks good, let's lock this style"). Plays once, the first
                  time each card scrolls into view; it does not replay on
                  chevron click/slide (`ParallaxMedia`'s own trigger is a
                  one-shot IntersectionObserver, not keyed to this row's
                  active card). */}
              <ParallaxMedia
                label={shot.label}
                ratio="15:8"
                radius="none"
                showLabel={false}
                image={shot.image}
                className={insideFactory.desktopCardMedia}
              />
              <p className={tone === "light" ? insideFactory.desktopCardLabelLight : insideFactory.desktopCardLabel}>
                {shot.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <DesktopChevron chevronRef={chevronRef} dotRef={dotRef} direction={direction} />
    </div>
  );
}

function MobileCarousel({
  shots,
  tone,
  showLabel = true,
  cardSize = "wide",
}: {
  shots: typeof home.insideFactory.media;
  tone: "light" | "dark";
  showLabel?: boolean;
  cardSize?: "wide" | "compact";
}) {
  const size = cardSize === "compact" ? CARD_SIZE_COMPACT : CARD_SIZE_WIDE;
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
  const cardWidth = isTablet ? size.tabletWidth : size.mobileWidth;
  const activeHeight = isTablet ? size.activeHeightTablet : size.activeHeightMobile;
  const inactiveHeight = isTablet ? size.inactiveHeightTablet : size.inactiveHeightMobile;

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
    // See `insideFactory.mobileCarouselWrap`'s own comment for why this
    // wrapper has no `items-center` (a real bug, found live).
    <div className={insideFactory.mobileCarouselWrap}>
      <div ref={trackRef} className={cardSize === "compact" ? insideFactory.mobileTrackCompact : insideFactory.mobileTrackWide}>
        {shots.map((shot, index) => (
          <div
            key={shot.label}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={cx(
              cardSize === "compact" ? insideFactory.mobileCardCompact : insideFactory.mobileCardWide,
              index === activeIndex &&
                (tone === "light" ? insideFactory.mobileCardActiveShadowLight : insideFactory.mobileCardActiveShadow),
            )}
            style={{ height: index === 0 ? activeHeight : inactiveHeight }}
          >
            <MediaPlaceholder
              label={shot.label}
              radius="none"
              tone={tone}
              showLabel={showLabel}
              image={shot.image}
              className="h-full"
            />
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
  cardSize = "wide",
  showDesktopImages = true,
}: InsideFactoryProps) {
  // Only the array DesktopGallery renders from -- `content.media` itself
  // (the homepage's own dark gallery, and this component's own mobile
  // carousel below, both read the real one) is untouched. See
  // `showDesktopImages`'s own prop comment above.
  const desktopShots = showDesktopImages ? content.media : content.media.map((shot) => ({ ...shot, image: undefined }));

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
        <div className={tone === "light" ? insideFactory.desktopGalleryWrapLight : insideFactory.desktopGalleryWrap}>
          <DesktopGallery shots={desktopShots} tone={tone} />
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
              align="center"
            />
          </div>
        ) : null}
        <div className={showHeading ? insideFactory.mobileGalleryGap : undefined}>
          <MobileCarousel shots={content.media} tone={tone} showLabel={showMediaLabel} cardSize={cardSize} />
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
