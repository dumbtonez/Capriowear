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
import { insideFactory } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type InsideFactoryProps = {
  content: typeof home.insideFactory;
};

const CARD_WIDTH = 300;
const ACTIVE_HEIGHT = 340;
const INACTIVE_HEIGHT = 248;

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

// Desktop gallery card pitch -- must match insideFactory.desktopCard's width
// and insideFactory.desktopRow's gap-12, xl: (1280px+) only.
const DESKTOP_CARD_WIDTH = 950;
const DESKTOP_CARD_GAP = 48;
// Tablet-only (768-1279px) pitch -- owner, 2026-09-03: "Inside the factory
// should also use desktop version" (this gallery previously only showed at
// xl:, same as the rest of the homepage's tablet-width review). Two real
// problems with reusing the desktop card/layout verbatim, both owner-
// confirmed live: (1) the desktop card's own 950px width doesn't fit --
// `desktopRow`'s centering padding, `calc(50% - 475px)`, goes negative
// below a 950px viewport and is silently clamped to 0px (padding can't be
// negative), so the first card rendered flush against the left edge, no
// centering/peek at all; (2) even a smaller *centered* card is wrong here
// regardless of width -- owner: "image placeholder should have same gap
// from the left as other sections have as default state ... 2nd image
// peak should be visible so customer knows its scrollable." Centering
// puts equal padding on both sides (matching nothing else on the page)
// and, depending on width, can leave no second-card peek at rest at all.
// Tablet now uses a real left-aligned layout instead of the desktop
// card's centered-snap technique: starts flush at the section's own
// standard `container-p` inset, snapping to each card's start (not
// centre) -- guarantees a visible second-card peek at rest at every width
// in this range, and the same left inset every other section already
// uses. `TABLET_CARD_WIDTH` went 600 ("too wide") -> 520 -> 560, before
// settling on Exhibitions' own confirmed `469px` card (owner, 2026-09-03:
// "i like the exhibition image size and it has gap from the left, use
// the same for factory" -- after Exhibitions got this exact same tablet
// treatment, see that section's own comments in styles.ts) -- matching
// value across both sections rather than each carrying its own separate
// number. `TABLET_CARD_GAP` (24) already matched Exhibitions' own `gap-6`.
// Must match `insideFactory.desktopCard`'s own `md:` width and
// `desktopRow`'s own `md:gap` below.
const TABLET_CARD_WIDTH = 469;
const TABLET_CARD_GAP = 24;

function DesktopGallery({ shots }: { shots: typeof home.insideFactory.media }) {
  // Same `matchMedia` pattern ProductGrid.tsx already uses for its own
  // breakpoint-dependent page size -- the chevron's click-to-scroll amount
  // (`cardPitch`) must match whichever card size is actually rendered at
  // the current width, or a click scrolls the wrong distance and misses
  // the next card's snap point.
  const [cardPitch, setCardPitch] = useState(DESKTOP_CARD_WIDTH + DESKTOP_CARD_GAP);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    const update = () =>
      setCardPitch(query.matches ? DESKTOP_CARD_WIDTH + DESKTOP_CARD_GAP : TABLET_CARD_WIDTH + TABLET_CARD_GAP);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const { wrapRef, trackRef, chevronRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
    useDesktopChevronScroller(cardPitch);

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
              ratio="19:11"
              radius="none"
              tone="dark"
              className={insideFactory.desktopCardMedia}
            />
          </div>
        ))}
      </div>
      <DesktopChevron chevronRef={chevronRef} direction={direction} />
    </div>
  );
}

function MobileCarousel({ shots }: { shots: typeof home.insideFactory.media }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <div ref={trackRef} className={insideFactory.mobileTrack}>
      {shots.map((shot, index) => (
        <div
          key={shot.label}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className={insideFactory.mobileCard}
          style={{ height: index === 0 ? ACTIVE_HEIGHT : INACTIVE_HEIGHT }}
        >
          <MediaPlaceholder label={shot.label} radius="none" tone="dark" className="h-full" />
        </div>
      ))}
    </div>
  );
}

export function InsideFactory({ content }: InsideFactoryProps) {
  return (
    <section>
      {/* Desktop: chevron-driven carousel through all 5 shots. The gallery
          is a full-bleed sibling of the (container-p-padded) heading, not
          nested inside it -- Figma's real gallery spans the frame's full
          width, unlike the heading. */}
      <div className={insideFactory.desktopOuter}>
        <div className={insideFactory.desktopSection}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="dark"
            eyebrowSize={insideFactory.desktopEyebrowSize}
            headingClassName={insideFactory.desktopHeadingNarrow}
            align="center"
          />
        </div>
        <div className={insideFactory.desktopGalleryWrap}>
          <DesktopGallery shots={content.media} />
          <div className={insideFactory.desktopCtaWrap}>
            <Button href={content.cta.href}>{content.cta.label}</Button>
          </div>
        </div>
      </div>

      {/* Mobile: finger-swipeable carousel, no auto-rotation */}
      <div className={insideFactory.mobileSection}>
        <div className={insideFactory.mobileHeadingWrap}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="dark"
            eyebrowSize={insideFactory.mobileEyebrowSize}
            align="center"
          />
        </div>
        <div className={insideFactory.mobileGalleryGap}>
          <MobileCarousel shots={content.media} />
        </div>
        <div className={insideFactory.mobileCtaWrap}>
          <Button href={content.cta.href}>{content.cta.label}</Button>
        </div>
      </div>
    </section>
  );
}
