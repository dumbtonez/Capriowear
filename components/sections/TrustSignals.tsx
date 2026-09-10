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
// Tablet moved onto the SAME card layout as desktop, 2026-09-10 (owner: "on
// home, tablet, use the same section as desktop for product development,
// low moq etc, but don't add the chevron like desktop instead use the dots
// under it. image size can be the same as desktop") -- previously tablet
// fell through to the mobile stacked-list block (`mobileWrap` was
// `xl:hidden`, covering every width below desktop). Tablet now gets its own
// `TabletCarousel`: the exact same 500px cards (image, title, body) as
// `DesktopScroller`, just swiped natively with CSS scroll-snap and a dot
// row instead of the chevron -- the same "keep the desktop card, swap the
// chevron for swipe+dots" shape already used by How It Works/Inside the
// Factory/Exhibitions' own tablet carousels, not a new pattern. `mobileWrap`
// is now `md:hidden` (mobile only); the new `tabletWrap` is `hidden md:block
// xl:hidden`.
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

import { useEffect, useRef, useState } from "react";

import { DesktopChevron, useDesktopChevronScroller } from "@/components/DesktopChevronScroller";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { cardCarousel, trustSignals } from "@/components/ui/styles";
import { cx } from "@/components/ui/cx";
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

// 380px (owner, 2026-09-10: "make the card size as per this reference,
// current one is too big" -- was 500px, matching styles.ts's own
// `trustSignals.desktopCard`/`tabletCard`). Used for the chevron's
// scroll-by-one-card math, must stay equal to that class's real width.
const CARD_WIDTH = 380;
// 24px (owner, 2026-09-10: "make it 32" then "make it 24" -- was 40px,
// matching styles.ts's own `trustSignals.desktopRow`/`tabletRow`).
const CARD_GAP = 24;

function DesktopScroller({ items }: { items: typeof home.trustStrip }) {
  const { wrapRef, trackRef, chevronRef, dotRef, direction, handleMouseMove, handleMouseEnter, handleMouseLeave, handleClick } =
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
      <DesktopChevron chevronRef={chevronRef} dotRef={dotRef} direction={direction} />
    </div>
  );
}

// Same card markup and 500px width as `DesktopScroller` above -- only the
// scroll mechanism differs (native swipe + dots, not the chevron). Tracks
// the nearest-centred card via each card's own real `offsetLeft`/
// `offsetWidth`, the same pattern `CardCarousel.tsx`'s own activeIndex
// tracking already uses, not a new one-off.
function TabletCarousel({ items }: { items: typeof home.trustStrip }) {
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
    <div className="flex w-full flex-col gap-4">
      <div ref={trackRef} className={trustSignals.tabletRow}>
        {items.map((entry, index) => (
          <div
            key={entry.title}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={trustSignals.tabletCard}
          >
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
      <div className={cx(cardCarousel.dotsRow, "mx-auto")}>
        {items.map((entry, index) => (
          <span
            key={entry.title}
            className={cx(cardCarousel.dot, index === activeIndex ? cardCarousel.dotActive : cardCarousel.dotInactive)}
          />
        ))}
      </div>
    </div>
  );
}

export function TrustSignals({ items, pageVariant = "home" }: TrustSignalsProps) {
  const desktopWrap = pageVariant === "services" ? trustSignals.desktopWrapServices : trustSignals.desktopWrap;
  const mobileWrap = pageVariant === "services" ? trustSignals.mobileWrapServices : trustSignals.mobileWrap;

  return (
    <section>
      {/* Desktop: 4-card horizontally-scrollable row, chevron-paged */}
      <div className={desktopWrap}>
        <DesktopScroller items={items} />
      </div>

      {/* Tablet: same 4-card row and image size as desktop, swiped
          natively with dots instead of the chevron */}
      <div className={trustSignals.tabletWrap}>
        <TabletCarousel items={items} />
      </div>

      {/* Mobile: artwork on top, one divided list below */}
      <div className={mobileWrap}>
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
