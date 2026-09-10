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
//
// WhatsApp button (owner, 2026-09-10: "along with the cta, we want to add
// Whatsapp icon too, upon tap it will open up the what's app for the
// customer" -- added alongside making this same mobile bar sitewide, not
// just PLP/PDP, see app/page.tsx, app/services/page.tsx, app/our-factory/
// page.tsx). A plain `<a href="https://wa.me/...">`, not a click handler --
// `wa.me` is WhatsApp's own universal link, already the right behaviour on
// both mobile (opens the app) and desktop (opens web.whatsapp.com) with no
// platform detection needed. Number lives in `content/site.ts`
// (`WHATSAPP_LINK`), not hand-typed here -- see that constant's own
// comment (currently the owner's personal number, a deliberate stand-in
// until the real business line is ready).
//
// Two more behaviours, same day, scoped to the marketing pages this bar
// was just extended to (home/services/our-factory) -- PLP/PDP's own
// existing behaviour below is untouched, both new props default to off:
//
// 1. `hideInFirstFold` (owner: "CTA should not appear in the first fold...
// after scrolling 1, 2 sections... it should be shown") -- a plain
// scroll-position check (`window.scrollY` past ~80% of one viewport
// height), not a page marker: every page's hero is a different height, so
// a fixed pixel/section-count threshold would need per-page tuning either
// way, and a fraction of the viewport itself already approximates "a
// section or so down" at any device size without that tuning.
//
// 2. `hideWithinIds` (owner: "when page gets to 'let's build your custom
// collection' it should disappear... when [you] pass the section, it
// should appear again") -- genuinely different from `FINAL_CTA_MARKER_ID`'s
// own "hide forever, nothing meaningful follows" semantics below: this is
// for a CTA section with real content AFTER it, so the bar must come back.
// Takes ids of the section's own wrapping element (real height), not a
// thin single-point marker -- a real element's own `entry.isIntersecting`
// already toggles correctly both ways (true while any part is near the
// viewport, false again once fully passed OR not yet reached) with no
// `top < 0` special-casing needed, unlike a thin marker (see this file's
// own "two real bugs" note above, which was solving a different problem:
// a single crossing point, not a real element with extent).
"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cx } from "@/components/ui/cx";
import { productCtas } from "@/components/ui/styles";
import { WHATSAPP_LINK } from "@/content/site";

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
  /**
   * Ids of thin markers rendered right before a page's own closing CTA (a
   * section with nothing meaningful after it but Footer) -- default
   * `[FINAL_CTA_MARKER_ID]`, the PDP's own original single marker,
   * unchanged. Hides "forever" once reached (see this file's own header
   * comment, "two real bugs"), since nothing later would need to un-hide
   * it. Not for a mid-page CTA with real content after it -- see
   * `hideWithinIds` instead.
   */
  hideNearIds?: string[];
  /**
   * Ids of a mid-page CTA section's own wrapping element -- hides while
   * that section is anywhere near the viewport, reappears once fully
   * scrolled past (owner, 2026-09-10, see this file's own header comment).
   * Default `[]` (no such zones) -- PLP/PDP's own single closing CTA
   * doesn't need this.
   */
  hideWithinIds?: string[];
  /**
   * Owner, 2026-09-10: "CTA should not appear in the first fold... after
   * scrolling 1, 2 sections... it should be shown." Default false (PLP/
   * PDP's own existing "visible from page load" behaviour, unchanged --
   * that bar sits beside real product-decision content from the top, not
   * under a marketing hero). See this file's own header comment for why
   * this is a scroll-position check, not a page marker.
   */
  hideInFirstFold?: boolean;
};

/** Id of the invisible marker rendered right before a page's own closing CTA. */
export const FINAL_CTA_MARKER_ID = "pdp-final-cta-marker";

const FIRST_FOLD_REVEAL_FRACTION = 0.8;

export function ProductCtasMobileBar({
  primaryCta,
  hideNearIds = [FINAL_CTA_MARKER_ID],
  hideWithinIds = [],
  hideInFirstFold = false,
}: ProductCtasMobileBarProps) {
  const [nearFinalCta, setNearFinalCta] = useState(false);
  const [withinMidPageCta, setWithinMidPageCta] = useState(false);
  const [pastFirstFold, setPastFirstFold] = useState(!hideInFirstFold);

  useEffect(() => {
    const markers = hideNearIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (markers.length === 0) return;
    // `entry.isIntersecting || entry.boundingClientRect.top < 0`, not
    // `entry.boundingClientRect.top < window.innerHeight` alone -- see this
    // file's own header comment (bug #2): IntersectionObserver only fires
    // at threshold CROSSINGS, so a raw `top` comparison read at the wrong
    // crossing evaluates false and doesn't get another chance to correct
    // itself until the NEXT crossing, far later. `isIntersecting` is
    // already correct for the "approaching" crossing (accounts for
    // `rootMargin` itself); `top < 0` covers the "already scrolled past,
    // marker now above the viewport" case once `isIntersecting` reverts to
    // false on its own crossing. Each marker's own flag, once true, is
    // never written back to false (`||` against its previous value) --
    // "stays hidden for every scroll position at or beyond that" -- and
    // the bar hides if ANY marker (usually just one) is hit.
    const nearFlags = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const hit = entry.isIntersecting || entry.boundingClientRect.top < 0;
          nearFlags.set(entry.target, hit || (nearFlags.get(entry.target) ?? false));
        }
        setNearFinalCta([...nearFlags.values()].some(Boolean));
      },
      // Triggers a little before each marker's own top edge, matching
      // "when I am close or coming to" the CTA heading -- fires as soon as
      // the marker is within 20% of the viewport height of coming on
      // screen.
      { rootMargin: "0px 0px 20% 0px" },
    );
    markers.forEach((marker) => observer.observe(marker));
    return () => observer.disconnect();
    // hideNearIds is a small, effectively-static prop (a literal array at
    // each call site); re-subscribing on every render would just churn
    // identical observers.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hideWithinIds.length === 0) return;
    const targets = hideWithinIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;
    // Plain `entry.isIntersecting`, no `top < 0` special-casing -- unlike
    // `hideNearIds`'s thin single-point markers, these ids are the CTA
    // section's own real wrapping element (real height), so a natural
    // `IntersectionObserver` already reports true for the whole time any
    // part of it is near the viewport and false again once it's fully
    // passed OR not yet reached -- exactly "disappear approaching it,
    // reappear once past it," both directions, no extra logic needed.
    const withinFlags = new Map<Element, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) withinFlags.set(entry.target, entry.isIntersecting);
        setWithinMidPageCta([...withinFlags.values()].some(Boolean));
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!hideInFirstFold) return;
    let ticking = false;
    const update = () => {
      setPastFirstFold(window.scrollY > window.innerHeight * FIRST_FOLD_REVEAL_FRACTION);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hideInFirstFold]);

  const hidden = nearFinalCta || withinMidPageCta || !pastFirstFold;

  return (
    <div className={cx(productCtas.mobileBar, hidden && productCtas.mobileBarHidden)}>
      <div className={productCtas.mobileBarRow}>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className={productCtas.whatsappButton}
        >
          <WhatsAppIcon className={productCtas.whatsappIcon} />
        </a>
        <Button href={primaryCta.href} variant="primary" className={productCtas.mobileButton}>
          {primaryCta.label}
        </Button>
      </div>
    </div>
  );
}
