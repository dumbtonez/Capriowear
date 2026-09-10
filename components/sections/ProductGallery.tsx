// components/sections/ProductGallery.tsx
// The PDP's hero image gallery (Figma node 634:4961 desktop / 638:860
// mobile, 2026-08-31). Sits beside ProductInfo on desktop, above it on
// mobile -- see that component's own header comment and the page's own
// wrapper (app/activewear/[category]/[style]/page.tsx). No placeholder
// caption text in any box here (owner request) -- every MediaPlaceholder
// below is `showLabel={false}`; `label` still supplies the alt text.
//
// Each image also passes MediaPlaceholder its own `image={{ src, alt }}`
// whenever `src` is set (SEO audit, 2026-09-02: this used to be dropped
// entirely, so a real photo would never have rendered as an actual
// `<Image>`/`alt` attribute) -- with no `src` yet, `image` is left
// `undefined` and the captionless placeholder box renders instead, same
// as before.
//
// Genuinely different layouts per breakpoint, not one responsive shape:
//   - Desktop: a fixed-height, scrollable thumbnail rail on the left (5
//     visible at a time; a circular chevron overlaying the last visible
//     thumbnail scrolls one more into view per click, staying put through
//     every click until the rail reaches its own end -- not a one-shot
//     reveal). A second, mirrored chevron appears at the rail's own top
//     edge as soon as the user has scrolled down at all, to scroll back up
//     the same way, one step at a time. A large main image on the right
//     with its own prev/next chevrons. Hovering, focusing, or clicking a
//     thumbnail swaps the main image -- hover is the owner's literal
//     request, click/focus are added alongside it so the swap also works
//     for keyboard and touch input, not hover-only.
//   - Mobile: one image with a swipeable thumbnail strip pinned over its
//     own bottom edge; tapping a thumbnail swaps the main image. No
//     separate prev/next chevrons on mobile -- swipe/tap is the only
//     control Figma shows there.
//
// Both breakpoints share the same `activeIndex` state and thumbnail click
// handler -- only the surrounding layout/JSX differs per breakpoint, same
// pattern Exhibitions.tsx already uses for its own desktop/mobile split.
"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { cx } from "@/components/ui/cx";
import { productGallery } from "@/components/ui/styles";

// A thin stroke-based chevron (owner correction, 2026-09-01: "the chevron
// little thin, its too thick") -- swapped for FilterChevronIcon, a solid
// filled shape that read too bold for this circular-button context.
// `strokeWidth` isn't a Tailwind class (no utility controls SVG stroke
// width), so it's passed as a direct prop rather than through `className`.
function ThinChevron({ className }: { className?: string }) {
  return <ChevronDown className={className} strokeWidth={1.5} aria-hidden="true" />;
}

// `src` added (SEO audit, 2026-09-02): this type used to drop `src`
// entirely even though `StyleCard.images[]` (content/activewear/types.ts)
// already carries an optional one -- so a real gallery photo would have
// silently never rendered as an actual `<Image>`/`alt` attribute once
// photography existed, only ever the captionless placeholder box below.
// Threaded through to `MediaPlaceholder`'s own `image` prop now, so
// nothing needs re-wiring here when real photos are added.
export type ProductGalleryImage = { alt: string; src?: string };

export type ProductGalleryProps = {
  images: ProductGalleryImage[];
  productTitle: string;
};

// Matches `rail`'s own h-[609px] comment: one thumbnail (109px) + its
// leading gap (16px), the amount the rail scrolls per "show more" click.
const RAIL_STEP_PX = 125;

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const [railAtTop, setRailAtTop] = useState(true);
  const [railAtBottom, setRailAtBottom] = useState(false);
  // Main-image scroll-snap tracks (owner report, 2026-09-07: "blinky,
  // jerky" -- the old key={activeIndex}+CSS-fade swap unmounted the whole
  // image on every change, and mobile swipe was a bare touchstart/touchend
  // threshold with no touchmove tracking at all, so the image never
  // actually followed the finger). Two real tracks, one per breakpoint
  // (same "genuinely different layouts" split as the rest of this file),
  // both permanently mounted -- native `overflow-x-auto`/`snap-x` scrolling
  // now supplies all the motion (real finger-tracking, GPU-composited,
  // nothing ever unmounts so there's nothing to blink), the same technique
  // `CardCarousel.tsx` already established for finger-swipeable content
  // elsewhere on this site.
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  // Imperatively scrolls both tracks to `index`'s slide -- called on every
  // activeIndex change (click/hover/chevron) and by the resize effect
  // below. Scrolling the currently-`hidden` breakpoint's track is a
  // harmless no-op visually, but keeps it correctly positioned for the
  // moment it becomes visible (see the resize effect's own comment).
  // Set for the duration of a programmatic smooth scroll (goTo/stepMainImage),
  // cleared once it settles -- owner report, 2026-09-11: "the image counter
  // number have weird animation, moves from 1 to 2, to 3 very jerky." The
  // scroll-sync effect below (`Math.round(scrollLeft / width)`) fires on
  // every scroll frame, including the ones this component's OWN smooth
  // scroll produces -- jumping more than one slide (a thumbnail two images
  // away, or the wrap-around case) meant the animated scroll transited
  // every slide in between, and this effect dutifully set `activeIndex` to
  // each one it passed, so the counter counted up/down through every
  // intermediate number instead of jumping straight to the target (`goTo`'s
  // own `setActiveIndex(index)` already sets the correct final value
  // immediately; the scroll-sync effect was just re-overwriting it many
  // times per second while the scroll animation played out).
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function scrollTracksTo(index: number, behavior: ScrollBehavior) {
    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimeoutRef.current !== null) clearTimeout(programmaticScrollTimeoutRef.current);
    // `scrollend` is the real signal (fires once the browser's own smooth
    // scroll finishes), but isn't universally supported yet -- a timeout
    // matching `behavior: "smooth"`'s own typical settle time is a safety
    // net, not the primary mechanism, so it's generous rather than tight.
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 600);
    for (const ref of [desktopTrackRef, mobileTrackRef]) {
      const track = ref.current;
      if (!track) continue;
      track.scrollTo({ left: index * track.clientWidth, behavior });
      if (behavior === "smooth") {
        track.addEventListener(
          "scrollend",
          () => {
            isProgrammaticScrollRef.current = false;
          },
          { once: true },
        );
      }
    }
  }

  function goTo(index: number, options?: { scrollRail?: boolean; behavior?: ScrollBehavior }) {
    setActiveIndex(index);
    scrollTracksTo(index, options?.behavior ?? "smooth");
    if (options?.scrollRail !== false) {
      railRef.current
        ?.querySelector<HTMLElement>(`[data-index="${index}"]`)
        ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }

  function stepMainImage(direction: 1 | -1) {
    // Wraps at both ends -- Figma shows no disabled-edge state to match
    // here, unlike Pagination's explicit prev/next disabling, so continuous
    // wrap is the reasonable default for a fixed pair of always-enabled
    // circles. Wrapping jump (last -> first / first -> last) scrolls
    // instantly ("auto"), not smoothly -- a smooth scroll here would fly
    // across every intermediate slide, which reads as broken for a gallery
    // with more than a couple of images. Every other step still slides.
    const raw = activeIndex + direction;
    const isWrap = raw < 0 || raw >= images.length;
    const next = (raw + images.length) % images.length;
    goTo(next, { behavior: isWrap ? "auto" : "smooth" });
  }

  // Detects which slide is nearest the track's own scroll position and
  // syncs `activeIndex` -- the counterpart to `goTo`'s own imperative
  // scroll, needed for the reverse direction: the user swiping the track
  // directly (not via a button), which never calls `goTo` at all. Every
  // slide is exactly the track's own width, so "nearest" is just the
  // rounded scroll-position ratio -- simpler than CardCarousel's own
  // per-card distance loop, which exists there because its cards aren't
  // full-track-width.
  useEffect(() => {
    const tracks = [desktopTrackRef.current, mobileTrackRef.current].filter((el) => el !== null);
    let ticking = false;

    function update(track: HTMLDivElement) {
      // Skip while our own `scrollTracksTo` smooth-scroll is still in
      // flight -- see `isProgrammaticScrollRef`'s own comment above. Real
      // user-driven swipe/drag scrolling (the only case this effect exists
      // for) never sets this flag.
      if (isProgrammaticScrollRef.current) return;
      const width = track.clientWidth;
      if (width === 0) return;
      const nearest = Math.round(track.scrollLeft / width);
      setActiveIndex((current) => (nearest === current ? current : nearest));
    }

    const listeners = tracks.map((track) => {
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          update(track);
          ticking = false;
        });
      };
      track.addEventListener("scroll", onScroll, { passive: true });
      return { track, onScroll };
    });

    return () => {
      for (const { track, onScroll } of listeners) track.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Stop a stray timeout if the component unmounts mid-scroll.
  useEffect(
    () => () => {
      if (programmaticScrollTimeoutRef.current !== null) clearTimeout(programmaticScrollTimeoutRef.current);
    },
    [],
  );

  // Resize safety net: desktop and mobile are two permanently-mounted,
  // breakpoint-hidden tracks (`hidden xl:flex` / `xl:hidden`, below). A
  // `goTo` call while a track is `display:none` multiplies by that track's
  // own `clientWidth`, which is 0 while hidden, so `scrollTracksTo`
  // silently zeroes out the HIDDEN breakpoint's target position on every
  // single interaction -- so the hidden one needs re-syncing the moment it
  // becomes visible. `matchMedia` on this project's own `xl` breakpoint
  // (1280px, Tailwind's default -- confirmed no custom `screens` override
  // in `tailwind.config.ts`), not a generic `window` "resize" listener or
  // `ResizeObserver`: both were tried live and neither reliably fired in
  // testing (a `resize` event doesn't necessarily fire for every viewport
  // change, and `ResizeObserver`'s callback -- despite the spec guaranteeing
  // an initial notification -- never fired at all here); `matchMedia`'s own
  // `change` event is the well-supported, direct signal for "the query this
  // component actually cares about just flipped," not a proxy for it.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1280px)");
    function resync() {
      setActiveIndex((current) => {
        scrollTracksTo(current, "auto");
        return current;
      });
    }
    resync(); // also covers the initial mount (real mobile vs. real desktop load)
    query.addEventListener("change", resync);
    return () => query.removeEventListener("change", resync);
  }, []);

  function revealMore() {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ top: RAIL_STEP_PX, behavior: "smooth" });
  }

  function revealPrevious() {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ top: -RAIL_STEP_PX, behavior: "smooth" });
  }

  function handleRailScroll() {
    const rail = railRef.current;
    if (!rail) return;
    setRailAtTop(rail.scrollTop <= 1);
    setRailAtBottom(rail.scrollTop + rail.clientHeight >= rail.scrollHeight - 1);
  }

  const railScrollable = images.length > 5;
  const showMoreButton = railScrollable && !railAtBottom;
  const showLessButton = railScrollable && !railAtTop;

  return (
    <>
      {/* Desktop */}
      <div className={productGallery.desktopRoot}>
        <div ref={railRef} onScroll={handleRailScroll} className={productGallery.rail}>
          {showLessButton ? (
            <button
              type="button"
              onClick={revealPrevious}
              aria-label="Show previous images"
              className={productGallery.lessButton}
            >
              <ThinChevron className={cx(productGallery.moreIcon, "rotate-180")} />
            </button>
          ) : null}
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              data-index={index}
              onMouseEnter={() => goTo(index, { scrollRail: false })}
              onFocus={() => goTo(index, { scrollRail: false })}
              onClick={() => goTo(index, { scrollRail: false })}
              aria-current={index === activeIndex}
              aria-label={`Show image ${index + 1} of ${images.length}`}
              className={productGallery.thumb}
              // Inline style, not a class (owner report, 2026-09-01: the
              // active border wasn't showing after a chevron change) --
              // confirmed live that the `!border-accent`/`border-transparent`
              // pair (both real, correctly-`!important` CSS, verified in the
              // served stylesheet) still rendered inverted in this dev
              // session for reasons that didn't reproduce as a normal
              // cascade-order or transition-timing issue. An inline style
              // can't lose to any class-based rule, ever, so it sidesteps
              // the question entirely rather than chasing it further.
              style={{ borderColor: index === activeIndex ? "var(--color-accent)" : "transparent" }}
            >
              <MediaPlaceholder
                label={image.alt}
                image={image.src ? { src: image.src, alt: image.alt } : undefined}
                ratio="1:1"
                radius="none"
                showLabel={false}
              />
            </button>
          ))}
          {showMoreButton ? (
            <button
              type="button"
              onClick={revealMore}
              aria-label="Show more images"
              className={productGallery.moreButton}
            >
              <ThinChevron className={productGallery.moreIcon} />
            </button>
          ) : null}
        </div>

        <div className={productGallery.mainWrap}>
          <div ref={desktopTrackRef} className={productGallery.mainTrack}>
            {images.map((image, index) => (
              <div key={index} className={productGallery.mainSlide} aria-hidden={index !== activeIndex}>
                <MediaPlaceholder
                  label={image.alt ?? productTitle}
                  image={image.src ? { src: image.src, alt: image.alt ?? productTitle } : undefined}
                  ratio="575:612"
                  radius="none"
                  showLabel={false}
                />
              </div>
            ))}
          </div>
          {images.length > 1 ? (
            <>
              {/* Image count (owner request, 2026-09-01: "so when I change
                  them I know they are changing from chevron") -- the prev/
                  next chevrons swap the main image with no other visible
                  change (same box, same size), so a plain "2 / 6" counter
                  is the confirmation that a click actually did something. */}
              <span className={productGallery.counter} aria-hidden="true">
                {activeIndex + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => stepMainImage(-1)}
                aria-label="Previous image"
                className={cx(productGallery.navButton, productGallery.navButtonPrev)}
              >
                <ThinChevron className={cx(productGallery.navIcon, "rotate-90")} />
              </button>
              <button
                type="button"
                onClick={() => stepMainImage(1)}
                aria-label="Next image"
                className={cx(productGallery.navButton, productGallery.navButtonNext)}
              >
                <ThinChevron className={cx(productGallery.navIcon, "-rotate-90")} />
              </button>
            </>
          ) : null}
        </div>
      </div>

      {/* Mobile */}
      <div className={productGallery.mobileRoot}>
        <div className={productGallery.mobileImageWrap}>
          <div ref={mobileTrackRef} className={productGallery.mobileTrack}>
            {images.map((image, index) => (
              <div key={index} className={productGallery.mobileSlide} aria-hidden={index !== activeIndex}>
                <MediaPlaceholder
                  label={image.alt ?? productTitle}
                  image={image.src ? { src: image.src, alt: image.alt ?? productTitle } : undefined}
                  radius="none"
                  showLabel={false}
                  className={productGallery.mobileImage}
                />
              </div>
            ))}
          </div>
        </div>
        {images.length > 1 ? (
          <>
            {/* Image count, top-left (owner request, 2026-09-01: tapping a
                thumbnail "should show the image on the top and I should
                know its changed") -- mirrors the desktop counter, top
                instead of bottom since the thumbnail strip below already
                owns this box's own bottom edge. */}
            <span className={productGallery.mobileCounter} aria-hidden="true">
              {activeIndex + 1} / {images.length}
            </span>
            <div className={productGallery.mobileStrip}>
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={index === activeIndex}
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  className={productGallery.mobileThumb}
                  style={{ borderColor: index === activeIndex ? "var(--color-accent)" : "#e8ecf1" }}
                >
                  <MediaPlaceholder
                    label={image.alt}
                    image={image.src ? { src: image.src, alt: image.alt } : undefined}
                    ratio="1:1"
                    radius="none"
                    showLabel={false}
                  />
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
