// components/sections/TrustSignals.tsx
// Homepage section 5. Figma: desktop node 348:1862 (superseded, see below),
// mobile node 348:1880.
//
// Desktop redesigned 2026-09-09 (Figma nodes 890:253/890:279, owner: "on
// the home, desktop only, change product development, Low MOQ section to
// this... there are 4 cards... 80px gap from the left of the page. For
// full content, use this" -- confirmed to apply to /services too, the
// page's own other real usage of this section). The old "media block left,
// two side-by-side text sub-columns right" desktop layout is gone,
// replaced by 4 independent image+title+body cards in a horizontally-
// scrollable row (`DesktopScroller` below) -- the cards' own total width
// (4x500 + 3x40px gaps = 2120px) is wider than the 1440px page frame, the
// same "more cards than fit" shape already built three times elsewhere
// (How It Works, Inside the Factory, Exhibitions), so this reuses the
// exact same shared `useDesktopChevronScroller` mechanism rather than
// inventing a fourth version of it. See `trustSignals.desktopScrollerWrap`
// (components/ui/styles.ts) for the full reasoning.
//
// Mobile is unchanged: artwork on top, then all four items stacked as one
// divided list (border between each pair, none after the last) -- still
// reads `items` directly, just now in this redesign's own corrected order
// (see content/home.ts's own `trustStrip` comment).
//
// `showLabel={false}` on every `MediaPlaceholder` here (owner, 2026-09-09:
// "remove image placeholder text labels from truesignals") -- `label`
// still supplies the accessible name (`role="img"`/`aria-label`, the
// established pattern every `showLabel={false}` caller already relies on),
// this only hides the visible caption text inside the empty box.
//
// This replaces docs/03-component-library.md's earlier "CapabilityCard x4"
// entry, which was a wireframe-era guess with no real design behind it.
//
// Takes its item list as a prop (not a direct content/home.ts import), so
// any page can render this section with its own text -- see app/page.tsx
// for the homepage's values.
//
// Reused on /services (owner, 2026-09-07: "this is already built on
// homepage, use same as is. only the spacing needs to adjust, from the top
// its 160px bottom 80px") -- same section, same copy (home.trustStrip),
// only the outer desktop top/bottom spacing changes per page (Figma node
// 729:208 on Services: 160px/80px vs homepage's own symmetric 120px/120px),
// via `pageVariant`, same pattern `OurServices` already established for
// its own Services-page reuse -- the 2026-09-09 card redesign above applies
// to both `pageVariant`s identically, only this outer spacing differs. No
// mobile Figma spacing exists for this placement either, so mobile stays
// on the one shared `mobileWrap` -- already the project's own standing
// 72px inter-section rule, not a guess specific to homepage.
"use client";

import { DesktopChevron, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { trustSignals } from "@/components/ui/styles";
import type { home } from "@/content/home";

type BodySegment = string | { bold: string };

export type TrustSignalsProps = {
  items: typeof home.trustStrip;
  pageVariant?: "home" | "services";
};

function Body({ segments }: { segments: BodySegment[] }) {
  return (
    <p className={trustSignals.body}>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <span key={index} className={trustSignals.bold}>
            {segment.bold}
          </span>
        ),
      )}
    </p>
  );
}

function MobileBody({ segments }: { segments: BodySegment[] }) {
  return (
    <p className={trustSignals.mobileBody}>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <span key={index} className={trustSignals.bold}>
            {segment.bold}
          </span>
        ),
      )}
    </p>
  );
}

const CARD_WIDTH = 500;
const CARD_GAP = 40;

function DesktopScroller({ items }: { items: typeof home.trustStrip }) {
  const { wrapRef, trackRef, chevronRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
    useDesktopChevronScroller(CARD_WIDTH + CARD_GAP);

  return (
    <div
      ref={wrapRef}
      className={trustSignals.desktopScrollerWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div ref={trackRef} className={trustSignals.desktopRow}>
        {items.map((entry, index) => (
          <div key={entry.title} className={trustSignals.desktopCard}>
            <MediaPlaceholder
              label={`${entry.title} artwork`}
              ratio={index % 2 === 0 ? "5:6" : "25:21"}
              radius="none"
              showLabel={false}
            />
            <div className={trustSignals.desktopCardText}>
              <h3 className={trustSignals.title}>{entry.title}</h3>
              <Body segments={entry.body} />
            </div>
          </div>
        ))}
      </div>
      <DesktopChevron chevronRef={chevronRef} direction={direction} />
    </div>
  );
}

export function TrustSignals({ items, pageVariant = "home" }: TrustSignalsProps) {
  const desktopWrap = pageVariant === "services" ? trustSignals.desktopWrapServices : trustSignals.desktopWrap;

  return (
    <section>
      {/* Desktop: 4-card horizontally-scrollable row */}
      <div className={desktopWrap}>
        <DesktopScroller items={items} />
      </div>

      {/* Mobile: artwork on top, one divided list below */}
      <div className={trustSignals.mobileWrap}>
        <MediaPlaceholder
          label="Trust signals artwork"
          ratio="16:11"
          radius="none"
          className={trustSignals.mobileMedia}
          showLabel={false}
        />
        <div className={trustSignals.mobileList}>
          {items.map((entry, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;
            const itemClassName = isFirst
              ? trustSignals.mobileItemFirst
              : isLast
                ? trustSignals.mobileItemLast
                : trustSignals.mobileItemMiddle;

            return (
              <div key={entry.title} className={itemClassName}>
                <h3 className={trustSignals.mobileTitle}>{entry.title}</h3>
                <MobileBody segments={entry.body} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
