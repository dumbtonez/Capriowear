// components/sections/ProductCustomizeSteps.tsx
// The PDP's "How We Customize" carousel (Figma node 634:5153 desktop /
// 643:2714 mobile, 2026-09-01) -- eyebrow + heading over a horizontally
// scrollable row of 5 capability steps (Print and artwork, Branding,
// Fabric, Trims and finish, Packaging). Owner: "already built the same
// component on homepage... Use homepage component size, overall" -- this
// reuses the homepage's `HowItWorks` own mechanism AND sizing verbatim
// (`CapabilityCard` + `useDesktopChevronScroller`/`DesktopChevron` from
// xl up, a snap-scrolling swipe track with pill dots below xl, 469px cards
// at xl, no title/body class overrides), not a new carousel and not this section's
// own literal-but-different Figma card width (a same-day earlier pass had
// used 335px, deliberately not matched to How It Works -- corrected).
//
// ONE tree at every width (Bodysuits audit #13, 2026-09-24). This section
// used to render a desktop copy (chevron scroller) and a separate mobile
// copy (CardCarousel), duplicating its H2 and every card H3 in the server
// HTML. Now one heading and one list of cards serve both: below xl the
// track is a native snap-scrolling swipe row with the pill indicator
// (CardCarousel's own behavior, reproduced here on the shared nodes); from
// xl the same nodes become the chevron scroller, whose mouse handlers are
// gated to xl so a tap on mobile never moves the reel.
"use client";

import { useEffect, useRef, useState } from "react";

import { CapabilityCard } from "@/components/Card";
import { DesktopChevron, DesktopPillIndicator, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { SectionHeading } from "@/components/SectionHeading";
import { productCustomizeSteps } from "@/components/ui/styles";
import type { pdpCustomizationSteps } from "@/content/activewear/pdpShared";

export type ProductCustomizeStepsProps = {
  content: typeof pdpCustomizationSteps;
  /**
   * Title/eyebrow alignment. Defaults to `"center"` (this section's own
   * confirmed Figma layout), which is what every PDP uses: the 2026-09-04
   * single-page `"left"` trial was ended and its hardcoded call site removed.
   */
  align?: "left" | "center";
};

const CARD_WIDTH = 469;
const CARD_GAP = 24; // matches productCustomizeSteps.reel's xl:gap-6 -- see that recipe's own comment
const DESKTOP_QUERY = "(min-width: 1280px)"; // Tailwind's `xl`, where the chevron scroller takes over

export function ProductCustomizeSteps({ content, align = "center" }: ProductCustomizeStepsProps) {
  const { wrapRef, trackRef, reelRef, chevronRef, dotRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
    useDesktopChevronScroller(CARD_WIDTH + CARD_GAP);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Track the xl breakpoint. Crossing it clears the reel's inline
  // translateX (a desktop-only offset) so the swipe row starts clean, and
  // restores it on the way back up.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    let savedTransform = "";
    const update = () => {
      const reel = reelRef.current;
      if (reel) {
        if (query.matches) {
          reel.style.transform = savedTransform;
        } else {
          savedTransform = reel.style.transform;
          reel.style.transform = "";
        }
      }
      setIsDesktop(query.matches);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reelRef]);

  // Below xl: the pill indicator follows whichever card sits nearest the
  // track's center as it scrolls (same rule CardCarousel uses).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const update = () => {
      const trackRect = track.getBoundingClientRect();
      const trackCenter = trackRect.left + trackRect.width / 2;
      let nearest = 0;
      let nearestDistance = Infinity;
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.left + rect.width / 2 - trackCenter);
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
  }, [trackRef]);

  return (
    <section className={productCustomizeSteps.section}>
      <div className={productCustomizeSteps.headingWrap}>
        <SectionHeading
          eyebrow={content.eyebrow}
          heading={content.heading}
          eyebrowTone="light"
          eyebrowSize={productCustomizeSteps.eyebrowSize}
          align={align}
          headingClassName={productCustomizeSteps.headingWidth}
        />
      </div>
      <div className={productCustomizeSteps.scrollerCap}>
        <div
          ref={wrapRef}
          className={productCustomizeSteps.scrollerWrap}
          onMouseMove={isDesktop ? handleMouseMove : undefined}
          onMouseEnter={isDesktop ? handleMouseEnter : undefined}
          onMouseLeave={isDesktop ? handleMouseLeave : undefined}
          onClick={isDesktop ? handleClick : undefined}
        >
          <div
            ref={trackRef}
            className={productCustomizeSteps.track}
            tabIndex={0}
            role="region"
            aria-label="Customization steps"
          >
            <div ref={reelRef} className={productCustomizeSteps.reel}>
              {content.steps.map((step, index) => (
                <div
                  key={step.title}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={productCustomizeSteps.card}
                >
                  <CapabilityCard
                    title={step.title}
                    body={step.body}
                    image={step.image}
                    mediaAspectClassName={productCustomizeSteps.cardMediaRatio}
                    mediaRadius="none"
                    parallax
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Not positioned itself, so the chevron still positions against
              the wrap; hidden below xl, where there is no cursor to follow. */}
          <div className={productCustomizeSteps.chevronOnly}>
            <DesktopChevron chevronRef={chevronRef} dotRef={dotRef} direction={direction} />
          </div>
        </div>
        <div className={productCustomizeSteps.dotsOnly}>
          <DesktopPillIndicator count={content.steps.length} activeIndex={activeIndex} tone="light" gap="tight" />
        </div>
      </div>
    </section>
  );
}
