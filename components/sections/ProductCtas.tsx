// components/sections/ProductCtas.tsx
// The PDP's request/download CTAs (Figma node 634:5065 desktop / 638:1645
// mobile, 2026-09-01). Two different, deliberate treatments per breakpoint,
// not one layout reflowing:
// - Desktop: an inline primary+secondary button pair in normal flow, 32px
//   below ProductOptions.
// - Mobile: the secondary button drops entirely; the primary button becomes
//   a bottom bar, "always visible" (owner spec) while scrolling the page's
//   own content.
// Reuses the existing Button component verbatim -- same primary/secondary
// pill already used for Header's own cta/secondaryCta.
//
// Split into two components (owner bug report, 2026-09-02: "the fixed cta
// [is] overlapping the social icons on the footer, it should not do that")
// -- `ProductCtas` (this file's desktop row) still renders inline in the
// gallery/info row's own text column; the mobile bar is now
// `ProductCtasMobileBar`, rendered separately as the literal last child of
// `<main>` (see app/activewear/[category]/[style]/page.tsx). The bar itself
// changed from `position: fixed` (pinned to the viewport, so it kept
// floating on top of Footer forever once scrolled that far -- Footer's own
// `sticky bottom-0` reveal trick, Footer.tsx's own comment, means `<main>`'s
// higher stacking always painted over Footer, and this bar was a descendant
// of `<main>`) to `position: sticky bottom-0`, matching Footer's own trick
// but in reverse: placed as `<main>`'s last child, it sticks to the
// viewport bottom throughout the page's own scroll range, then releases
// itself the instant `<main>`'s own box ends -- exactly where Footer
// begins, so the two can never overlap.
//
// Owner follow-up, same day: "when it gets to the cta section, remove the
// fixed cta automatically" -- FinalCta already offers its own big CTA
// button, so once that section is reached this bar is redundant clutter,
// and sticky/DOM-position alone only releases it right at the very end of
// `<main>` (the Footer boundary), which is AFTER FinalCta, too late.
// `ProductCtasMobileBar` is now a client component: it watches an
// invisible marker (`FINAL_CTA_MARKER_ID`) placed immediately before
// `<FinalCta>` in the page, via `IntersectionObserver`, and collapses
// itself out of view (`mobileBarHidden`, animating `max-height` to 0, not
// `hidden`/`display:none` -- see that recipe key's own comment for why a
// plain instant hide isn't used either) the instant that marker enters the
// viewport, i.e. the moment the CTA section is reached.
//
// Two real bugs, found live same day, in getting this condition right:
// 1. Using `entry.isIntersecting` alone made the bar reappear once the
//    marker scrolled back OUT of the viewport above (i.e. once the user
//    had scrolled well past FinalCta, under the FAQ CTA) -- exactly
//    backwards, since it should stay gone for the rest of the page once
//    reached.
// 2. A same-day first fix (comparing `entry.boundingClientRect.top <
//    window.innerHeight` directly) looked right in theory but IS WRONG in
//    practice: IntersectionObserver only invokes its callback at threshold
//    CROSSINGS (with `rootMargin` expanding the bottom edge, the first
//    crossing fires while `top` is still comfortably above `innerHeight`,
//    e.g. ~927 while the viewport is 812), so comparing the stale `top`
//    value from that one firing against `innerHeight` evaluated false and
//    never got another chance to re-check until the NEXT crossing (far
//    later, well past the CTA section) -- the bar stayed visible the
//    entire time in between, on screen while scrolling under the FAQ CTA.
// Fixed by keying off `entry.isIntersecting` (already correctly reflects
// the rootMargin-expanded "approaching" zone) OR `top < 0` (already past,
// scrolled above the viewport entirely) -- true from the moment the
// section is approached, and stays true for every scroll position at or
// beyond that (no further crossing ever fires to flip it back while
// continuing to scroll down), only reverting if the user scrolls back up
// far enough to re-enter that same zone from below.
"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { cx } from "@/components/ui/cx";
import { productCtas } from "@/components/ui/styles";

export type ProductCtasProps = {
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export function ProductCtas({ primaryCta, secondaryCta }: ProductCtasProps) {
  return (
    <div className={productCtas.desktopRow}>
      <Button href={primaryCta.href} variant="primary">
        {primaryCta.label}
      </Button>
      <Button href={secondaryCta.href} variant="secondary" className={productCtas.secondaryDesktop}>
        {secondaryCta.label}
      </Button>
    </div>
  );
}

export type ProductCtasMobileBarProps = {
  primaryCta: { label: string; href: string };
};

/** Id of the invisible marker rendered right before `<FinalCta>` on the PDP. */
export const FINAL_CTA_MARKER_ID = "pdp-final-cta-marker";

export function ProductCtasMobileBar({ primaryCta }: ProductCtasMobileBarProps) {
  const [nearFinalCta, setNearFinalCta] = useState(false);

  useEffect(() => {
    const marker = document.getElementById(FINAL_CTA_MARKER_ID);
    if (!marker) return;
    // `entry.isIntersecting || entry.boundingClientRect.top < 0`, not
    // `entry.boundingClientRect.top < window.innerHeight` alone -- see this
    // file's own header comment (bug #2): IntersectionObserver only fires
    // at threshold crossings, so a raw `top` comparison read at the wrong
    // crossing evaluates false and doesn't get another chance to correct
    // itself until the NEXT crossing, far later. `isIntersecting` is
    // already correct for the "approaching" crossing (accounts for
    // `rootMargin` itself); `top < 0` covers the "already scrolled past,
    // marker now above the viewport" case once `isIntersecting` reverts to
    // false on its own crossing.
    const observer = new IntersectionObserver(
      ([entry]) => setNearFinalCta(entry.isIntersecting || entry.boundingClientRect.top < 0),
      // Triggers a little before the marker's own top edge, matching "when
      // I am close or coming to" the CTA heading -- fires as soon as the
      // marker is within 20% of the viewport height of coming on screen.
      { rootMargin: "0px 0px 20% 0px" },
    );
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={cx(productCtas.mobileBar, nearFinalCta && productCtas.mobileBarHidden)}>
      <Button href={primaryCta.href} variant="primary" className={productCtas.mobileButton}>
        {primaryCta.label}
      </Button>
    </div>
  );
}
