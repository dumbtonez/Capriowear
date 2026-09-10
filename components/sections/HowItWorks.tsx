// components/sections/HowItWorks.tsx
// Homepage section 12. Figma: desktop node 430:1929, mobile node 430:1961.
//
// Desktop: centred heading (forced to Figma's real 2 lines via the same
// 812px-wide wrapper already confirmed for Certified & Compliant and Inside
// the Factory) then a row of 5 CapabilityCards, horizontally scrollable --
// get_metadata on the real frame shows the 5th card entirely off-canvas
// (even the 4th hangs slightly over) at Figma's own original 335px width,
// so this is a scroll carousel, not 5 cards shrunk to fit (this section's
// first, wrong build). Card width was later widened to 469px, matching
// Exhibitions' own desktop card exactly (owner call, 2026-08-27: both
// sections' media containers and the gap between them should read as the
// same size) -- a deliberate departure from the literal Figma number, not a
// correction to it. Title/body text now use CapabilityCard's plain
// defaults (Our Services' own sizes) instead of a smaller How-It-Works-
// specific override, since the card is now close enough to Our Services'
// own 480px width that the smaller text no longer read proportionally.
// Not in the Figma frame itself (no such layer exists there): a single
// floating chevron, in a white circle, tracks the cursor's position (X and
// Y) and flips direction at the row's horizontal midpoint; clicking pages
// by exactly one card with a smooth scroll (owner request, 2026-08-25,
// iterated three times -- first two small corner buttons, then static
// left/right click-halves, landing on this cursor-tracking version). The
// mechanism itself is the shared `useDesktopChevronScroller` hook
// (components/DesktopChevronScroller.tsx, extracted 2026-08-26), not a
// local copy -- also used by Inside the Factory and Exhibitions. The
// native cursor is hidden over the row (`cursor-none`) since the chevron
// itself is the pointer affordance here, not a second one alongside it.
// `scroll-pl-[80px]`/`scroll-pr-[80px]` on the track matter: without them,
// CSS scroll-snap's own snap-point math doesn't know the row's px-[80px]
// inset is safe space, and silently corrects the rest scroll position to
// consume it, collapsing the intended 80px gap before the first card to 0
// (a real bug, found and fixed).
//
// Mobile: treated the same as Our Services (owner call, 2026-08-25) -- the
// shared CardCarousel (components/CardCarousel.tsx), not a bespoke layout.
//
// Neither Figma frame shows a step number anywhere, despite content/home.ts's
// `howItWorks.steps` originally carrying an `n` field for one -- these are
// plain CapabilityCards, not FeatureNumbered (removed, its only anticipated
// usage never matched the real design).
"use client";

import { CapabilityCard } from "@/components/Card";
import { CardCarousel } from "@/components/CardCarousel";
import { DesktopChevron, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { howItWorks } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type HowItWorksProps = {
  content: typeof home.howItWorks;
  /**
   * `"light"` (default, the homepage's own original white-background
   * build) or `"dark"` -- How It Works' dark variant (owner, 2026-09-07,
   * Figma node 767:868, reused on /services under Product Range). Drives
   * the section's own background/ambient text colour plus the eyebrow's
   * standing dark-section colour; forwarded to every `CapabilityCard`
   * (desktop + mobile) for the body copy and empty-state placeholder
   * colour. See this file's own git history / docs/03-component-library.md
   * for the full reasoning.
   */
  tone?: "light" | "dark";
};

// Mobile heading is forced to Figma's own real 3-line break points (owner
// call, 2026-08-25: "keep it 3 lines but follow the same characters as in
// Figma", confirmed via get_screenshot on node 430:1961) -- our own natural
// wrap at this viewport landed on 3 lines too, but at different word
// breaks, so this splits content.h2 at Figma's exact points rather than
// hardcoding a second copy of the string, keeping content/home.ts as the
// single source for the copy.
const MOBILE_HEADING_BREAKS = ["to ", "five "];

function renderMobileHeading(h2: string) {
  let rest = h2;
  const lines: string[] = [];
  for (const marker of MOBILE_HEADING_BREAKS) {
    const breakAt = rest.indexOf(marker) + marker.length;
    lines.push(rest.slice(0, breakAt).trim());
    rest = rest.slice(breakAt);
  }
  lines.push(rest.trim());
  return lines.map((line, i) => (
    <span key={line}>
      {i > 0 && <br />}
      <TextReveal as="span" text={line} />
      {/* A plain trailing space text node, not part of TextReveal's own
          aria-label: each line's TextReveal sets its own aria-label on its
          rendered span, which fully replaces that subtree's accessible
          name -- <br/> alone doesn't reliably contribute a space between
          two aria-labelled siblings, so without this the lines' accessible
          names ran together ("to" + "shipped" -> "toshipped", found live). */}
      {i < lines.length - 1 && " "}
    </span>
  ));
}

const CARD_WIDTH = 469;
const CARD_GAP = 24;

function DesktopScroller({
  steps,
  tone,
}: {
  steps: typeof home.howItWorks.steps;
  tone: "light" | "dark";
}) {
  const { wrapRef, trackRef, chevronRef, dotRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
    useDesktopChevronScroller(CARD_WIDTH + CARD_GAP);

  return (
    <div
      ref={wrapRef}
      className={howItWorks.desktopScrollerWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={trackRef} className={howItWorks.desktopRow}>
        {steps.map((step) => (
          <div key={step.title} className={howItWorks.desktopCard}>
            <CapabilityCard
              title={step.title}
              body={step.body}
              mediaAspectClassName={howItWorks.cardMediaRatio}
              mediaRadius="none"
              tone={tone}
            />
          </div>
        ))}
      </div>
      <DesktopChevron chevronRef={chevronRef} dotRef={dotRef} direction={direction} />
    </div>
  );
}

export function HowItWorks({ content, tone = "light" }: HowItWorksProps) {
  return (
    <section>
      {/* Desktop: centred heading, scrollable card row */}
      <div
        className={cx(
          howItWorks.desktopOuter,
          tone === "dark" ? cx(howItWorks.darkSurface, howItWorks.desktopOuterDark) : howItWorks.desktopOuterLight,
        )}
      >
        <div className={howItWorks.desktopHeadingWrap}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone={tone}
            eyebrowSize={howItWorks.eyebrowSize}
            align="center"
            headingClassName={howItWorks.desktopHeadingWidth}
          />
        </div>
        <DesktopScroller steps={content.steps} tone={tone} />
      </div>

      {/* Mobile + tablet: centred heading, swipeable card slider. Heading
          itself still splits by real breakpoint (owner, 2026-09-09: "how it
          works title should be in 2 lines" on tablet) even though this
          whole block's own visibility no longer does (tablet moved in here
          alongside real mobile when the chevron became xl:-only, see
          `howItWorks.mobileSection`'s own comment) -- real mobile keeps its
          own Figma-matched 3-line forced break (`renderMobileHeading`,
          real `<br/>`s, can't be undone by width alone); tablet/desktop
          both get the natural 2-line wrap instead, via the exact same
          `desktopHeadingWidth` constraint the desktop block above already
          uses for this identical string -- `text-h1`'s own fluid clamp
          means a narrower tablet viewport also renders a smaller font, so
          the same 812px cap holds 2 lines (or fewer) there too, not more. */}
      <div className={cx(howItWorks.mobileSection, tone === "dark" && howItWorks.darkSurface)}>
        <SectionHeading
          eyebrow={<TextReveal text={content.eyebrow} />}
          heading={
            <>
              <span className="md:hidden">{renderMobileHeading(content.h2)}</span>
              <span className="hidden md:inline">
                <TextReveal as="span" text={content.h2} />
              </span>
            </>
          }
          eyebrowTone={tone}
          eyebrowSize={howItWorks.eyebrowSize}
          align="center"
          headingClassName={howItWorks.desktopHeadingWidth}
        />
        <CardCarousel
          items={content.steps}
          cardMediaRatio={howItWorks.cardMediaRatio}
          tone={tone}
          cardClassName={howItWorks.mobileCardWidth}
        />
      </div>
    </section>
  );
}
