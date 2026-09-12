// components/sections/ProductCustomizeSteps.tsx
// The PDP's "How We Customize" carousel (Figma node 634:5153 desktop /
// 643:2714 mobile, 2026-09-01) -- eyebrow + heading over a horizontally
// scrollable row of 5 capability steps (Print and artwork, Branding,
// Fabric, Trims and finish, Packaging). Owner: "already built the same
// component on homepage... Use homepage component size, overall" -- this
// reuses the homepage's `HowItWorks` own mechanism AND sizing verbatim
// (`CapabilityCard` + `useDesktopChevronScroller`/`DesktopChevron` for
// desktop, `CardCarousel` for mobile, 469px cards, no title/body class
// overrides), not a new carousel implementation and not this section's
// own literal-but-different Figma card width (a same-day earlier pass had
// used 335px, deliberately not matched to How It Works -- corrected).
"use client";

import { CapabilityCard } from "@/components/Card";
import { CardCarousel } from "@/components/CardCarousel";
import { DesktopChevron, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { SectionHeading } from "@/components/SectionHeading";
import { productCustomizeSteps } from "@/components/ui/styles";
import type { pdpCustomizationSteps } from "@/content/activewear/pdpShared";

export type ProductCustomizeStepsProps = {
  content: typeof pdpCustomizationSteps;
  /**
   * Owner trial, 2026-09-04: "For Customization the title and eyebrow
   * might can align on the left, let's try it on one page and lock if all
   * good." Defaults to `"center"` (this section's own confirmed Figma
   * layout, unchanged everywhere else) -- only the one PDP the owner is
   * trialling this on passes `"left"`. Roll out sitewide (drop this prop
   * back to a plain `align="center"` call, or flip the default) once
   * confirmed.
   */
  align?: "left" | "center";
};

const CARD_WIDTH = 469;
const CARD_GAP = 24;

function DesktopScroller({ steps }: { steps: typeof pdpCustomizationSteps.steps }) {
  const { wrapRef, trackRef, reelRef, chevronRef, dotRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
    useDesktopChevronScroller(CARD_WIDTH + CARD_GAP);

  return (
    <div
      ref={wrapRef}
      className={productCustomizeSteps.desktopScrollerWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={trackRef} className={productCustomizeSteps.desktopRow}>
        <div ref={reelRef} className={productCustomizeSteps.desktopReel}>
          {steps.map((step) => (
            <div key={step.title} className={productCustomizeSteps.desktopCard}>
              <CapabilityCard
                title={step.title}
                body={step.body}
                mediaAspectClassName={productCustomizeSteps.cardMediaRatio}
                mediaRadius="none"
              />
            </div>
          ))}
        </div>
      </div>
      <DesktopChevron chevronRef={chevronRef} dotRef={dotRef} direction={direction} />
    </div>
  );
}

export function ProductCustomizeSteps({ content, align = "center" }: ProductCustomizeStepsProps) {
  return (
    <section>
      {/* Desktop: centred heading (or left, on trial), scrollable card row */}
      <div className={productCustomizeSteps.desktopOuter}>
        <div className={productCustomizeSteps.desktopHeadingWrap}>
          <SectionHeading
            eyebrow={content.eyebrow}
            heading={content.heading}
            eyebrowTone="light"
            align={align}
            headingClassName={productCustomizeSteps.desktopHeadingWidth}
          />
        </div>
        <div className={productCustomizeSteps.desktopScrollerCap}>
          <DesktopScroller steps={content.steps} />
        </div>
      </div>

      {/* Mobile: centred heading, swipeable card slider -- left-align trial
          is desktop-only, not part of the owner's request. */}
      <div className={productCustomizeSteps.mobileSection}>
        <SectionHeading
          eyebrow={content.eyebrow}
          heading={content.mobileHeading}
          eyebrowTone="light"
          eyebrowSize={productCustomizeSteps.mobileEyebrowSize}
          align="center"
          headingClassName={productCustomizeSteps.mobileHeadingWidth}
        />
        <CardCarousel items={content.steps} cardMediaRatio={productCustomizeSteps.cardMediaRatio} />
      </div>
    </section>
  );
}
