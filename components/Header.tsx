"use client";

// components/Header.tsx
// Site header: desktop nav with mega menu, plus the drawer for narrow viewports
// (components/MobileNav.tsx). Sticky with a hairline bottom border, on the ink
// surface, matching the wireframe header.
//
// Nav data is passed in (from content/home.ts), never hardcoded, so other pages
// reuse the same header. A link with `megaMenu` renders as a mega-menu trigger;
// one without renders as a plain link.
//
// Mega menu behaviour: the trigger is a real <button> with aria-expanded and
// aria-controls, so it is operable by keyboard as well as by pointer. It opens
// on hover for pointer users and on click/Enter for everyone; Escape closes and
// returns focus to the trigger; moving focus or the pointer out of the group
// closes it. A wrapper around the trigger row *and* the panel (not any one
// <li>) owns the shared focus-within/mouse-leave zone, since the panel is a
// single full-width element rendered once, not nested inside each trigger's
// own <li> -- see the note on `header.megaPanel` in components/ui/styles.ts.
//
// The desktop nav appears at xl (1280px, see the `nav` and `actions` recipes
// in components/ui/styles.ts). Below that, MobileNav's drawer takes over.
//
// Hide-on-scroll (owner request, 2026-08-26; reworked 2026-09-08 to follow
// scroll continuously -- see `headerOffsetRef`'s own comment below): the
// header slides off-screen upward by an amount proportional to how far
// down you've actually scrolled, and slides back by the same on scroll up
// -- a standard pattern (used sitewide by e.g. most editorial/marketing
// sites) for reclaiming vertical space on long pages without removing the
// nav outright, since it's still one upward scroll away. Never hides while
// a mega menu or the mobile drawer is open -- both are things the user is
// actively interacting with inside the header itself, so yanking it
// off-screen mid-interaction would be a real usability regression, not a
// subtlety worth trading away for the scroll effect.
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { Button } from "./Button";
import { MenuIcon } from "./icons/MenuIcon";
import { MobileNav, type MobileNavLink } from "./MobileNav";
import { cx } from "./ui/cx";
import { header } from "./ui/styles";

// Matches `header.megaPanel`'s own `duration-500` exactly -- how long the
// panel stays mounted after its trigger closes, so the closing clip-path
// sweep has time to actually play before the content unmounts.
const MEGA_TRANSITION_MS = 500;

// Adaptive header tone (owner reference, 2026-09-07: labs.google's own
// nav swaps its text colour to always contrast whatever section is
// currently scrolled behind it). Rather than tagging every section on
// every page with its own light/dark identity (this site has 15+ section
// components across home/services/every PLP/PDP, and it would need
// re-auditing on every new page), this derives tone from what's actually
// rendered: every real section here already expresses its own tone as a
// real `background-color` (`bg-ink`, or nothing, falling through to
// `<main>`'s own `bg-paper`) -- confirmed no gradient/image CSS
// backgrounds exist anywhere in components/ui/styles.ts. So this walks up
// from the point directly under the header to the first ancestor with a
// real (non-fully-transparent) background and classifies it by perceptual
// luminance, instead of reading a hand-maintained tag that could drift out
// of sync with what's actually on screen.
//
// Known accepted limitation, not a bug: a future full-bleed image/video
// section with no explicit `bg-*` of its own reads as whichever ancestor's
// tone it inherits, not a sampled pixel colour -- the same thing the
// reference site's own per-section tagging would do anyway.
function getSurfaceToneAt(x: number, y: number): "dark" | "light" {
  let el = document.elementFromPoint(x, y) as Element | null;
  while (el && el !== document.documentElement) {
    const bg = getComputedStyle(el).backgroundColor;
    const match = bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    if (match) {
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      // > 0, not "must be fully opaque" -- no genuinely translucent section
      // background exists today, but a future one should still count as
      // "the thing visibly there" rather than being skipped past.
      if (alpha > 0) {
        const [r, g, b] = [Number(match[1]), Number(match[2]), Number(match[3])];
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance < 128 ? "dark" : "light";
      }
    }
    el = el.parentElement;
  }
  // <main> and <footer> both set their own bg-paper directly (see every
  // page's own <main className="... bg-paper"> and Footer.tsx's
  // `footer.root`), so this is rarely actually reached.
  return "light";
}

export type NavMegaMenuGroup = {
  label: string;
  items: { label: string; href: string }[];
};

export type NavLink = {
  label: string;
  href: string;
  /**
   * Present on links that open the full-width mega menu (Figma node
   * 493:3140) -- e.g. Activewear. A link without this is a plain link, no
   * dropdown at all (e.g. Teamwear & Uniforms, until its own real category
   * content exists -- see content/home.ts's own scope note).
   */
  megaMenu?: NavMegaMenuGroup[];
};

export type HeaderProps = {
  /** Always required, even with `logo` set: it becomes the home link's accessible name. */
  brand: string;
  /**
   * The real mark, e.g. <Logo />. When given, it replaces the text brand
   * block below it entirely — `brandParent` goes unused, since the logo
   * carries the brand on its own (Figma node 316:1331 has no text brand at
   * all, logo only). Omit to fall back to the text brand, still useful for a
   * page that has no logo asset yet. Rendered below `xl:` (mobile bar and
   * drawer) — see `desktopLogo` for the `xl:`+ mark.
   */
  logo?: ReactNode;
  /**
   * The `xl:`+ mark, e.g. <Logo stacked className={header.brandLogoDesktop} />.
   * Owner, 2026-09-06: "update the caprio logo in the nav bar, not in the
   * footer. Only for desktop" -- a separate prop (not a responsive variant
   * of `logo` alone) so the mobile bar/drawer mark stays exactly what it
   * was. Falls back to `logo` if omitted, so this prop is optional for any
   * caller that hasn't been updated yet -- but note that `logo`'s own
   * recipe (`header.brandLogo`) is `xl:hidden`, so omitting `desktopLogo`
   * on a real page currently means no logo shows at all at `xl:`+; every
   * page in this codebase passes both.
   */
  desktopLogo?: ReactNode;
  brandParent?: string;
  links: NavLink[];
  /** The mobile drawer's own link set -- see MobileNav's own props. */
  mobileLinks: MobileNavLink[];
  contact: { label: string; email: string };
  /** Same shape as Footer's own `social` prop -- content/site.ts's `ORGANIZATION.sameAs`. */
  social: readonly string[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
  /**
   * Default true (every existing page). Set false to render a plain,
   * non-sticky header that scrolls away with the page -- a trial for the
   * Activewear PLP (owner request, 2026-08-29: "let's try one time
   * gymshark approach and see how it looks", comparing against
   * gymshark.com's own non-sticky header). Also disables the hide-on-
   * scroll-down/reveal-on-scroll-up behavior entirely, since it has
   * nothing to mean for a header that isn't pinned to the viewport.
   */
  sticky?: boolean;
};

export function Header({
  brand,
  logo,
  desktopLogo,
  brandParent,
  links,
  mobileLinks,
  contact,
  social,
  cta,
  secondaryCta,
  className,
  sticky = true,
}: HeaderProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // Default "dark" matches app/globals.css's own `header { --header-fg: ... }`
  // default exactly (both represent "before the effect below has run") --
  // keep them in sync, or the header flashes the wrong colour on first paint.
  const [tone, setTone] = useState<"dark" | "light">("dark");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  // Set right before the drawer trigger's own `onClick` below opens it --
  // read once by MobileNav's focus-restoration effect. See
  // `focusQuietly`'s own header comment in MobileNav.tsx.
  const menuOpenedByKeyboardRef = useRef(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);
  // Continuous hide/reveal offset (0 = fully visible, -headerHeight = fully
  // hidden) -- NOT React state (owner report, 2026-09-08: "the nav
  // disappear... not immediately scroll... the transition to appear and
  // disappear is very soft but ours is not"). Confirmed live against the
  // reference: its own pinned nav does NOT flip a binary open/closed class
  // -- scrolling it a small amount produces a small, exact-to-the-pixel
  // `translateY` (e.g. -4.4198px for one real scroll gesture), continuously
  // proportional to how far you've actually scrolled, animated toward each
  // new target by the same `transform 0.3s ease-in-out` this codebase
  // already had. A boolean flipped past a fixed threshold can only ever
  // produce two states (open/closed) snapped between by a transition that
  // restarts from scratch on every direction change -- reads as sudden no
  // matter how the transition itself is tuned, and explains both parts of
  // the report at once (looks "immediate" because there's no partial
  // state, and never "soft" because it's not actually following the
  // scroll). Written straight to the DOM via `headerRef` on every rAF
  // tick, same "bypass React state for a continuous scroll-driven value"
  // pattern `ScrollSpotlightList.tsx` already established elsewhere in
  // this codebase -- updating this via `useState` at scroll-tick frequency
  // would re-render on nearly every tick instead of the rare few times the
  // old boolean actually changed value.
  const headerOffsetRef = useRef(0);
  // Throttles `getSurfaceToneAt` separately from the rest of `update()`
  // below (owner report, 2026-09-08: "the transition when the nav
  // disappears or appears... is jerky") -- `getSurfaceToneAt` calls
  // `getComputedStyle` while walking up several ancestors, which forces a
  // synchronous style/layout recalculation; running that on every single
  // rAF tick during a scroll competed with the browser's own compositing
  // of the hide/reveal `transform` transition for main-thread time, which
  // is what actually read as "jerky" (confirmed against the reference:
  // its own hide/reveal nav uses the identical `transform 0.3s ease-in-out`
  // CSS transition ours already had -- the transition rule itself was
  // never the problem). A colour swap has no perceptible deadline the way
  // a slide transform does, so it only needs to be checked a few times a
  // second, not every frame.
  const lastToneCheckRef = useRef(0);

  const closeMenu = useCallback(() => setOpenMenu(null), []);

  const openLink = links.find((link) => link.label === openMenu && link.megaMenu?.length);
  const megaPanelId = "desktop-mega-menu";

  // Mirrors `MobileNav`'s own mount-lifetime pattern so the mega panel's
  // closing `clip-path` sweep has something to animate: unmounting the
  // instant `openLink` disappears would just cut the content away, since an
  // element that's not in the DOM can't play a CSS transition. `content`
  // tracks whichever link's data should currently render -- it updates the
  // moment a real `openLink` exists (including switching straight from one
  // open trigger to another) but keeps the last real value during the
  // close animation, when `openLink` itself has already gone back to
  // `undefined`.
  //
  // Declared here, above the scroll effect below, rather than after it (as
  // it originally was) -- `megaRendered` has to be in scope for that
  // effect's own guard condition to reference (see that effect's own
  // comment for why: the panel stays mounted for `MEGA_TRANSITION_MS`
  // after closing, and a tone recompute that runs during that window would
  // sample the still-visible panel instead of the real page behind it).
  const [megaRendered, setMegaRendered] = useState(false);
  const [megaRevealed, setMegaRevealed] = useState(false);
  const [megaContent, setMegaContent] = useState(openLink);
  if (openLink && openLink !== megaContent) setMegaContent(openLink);
  if (openLink && !megaRendered) setMegaRendered(true);
  if (!openLink && megaRevealed) setMegaRevealed(false);

  useEffect(() => {
    if (!openLink) {
      const timeout = setTimeout(() => setMegaRendered(false), MEGA_TRANSITION_MS);
      return () => clearTimeout(timeout);
    }
    const raf = requestAnimationFrame(() => setMegaRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, [openLink]);

  // Escape closes an open mega menu wherever focus currently sits.
  useEffect(() => {
    if (!openMenu) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu, closeMenu]);

  // Writes `headerOffsetRef`'s current value straight to the header's own
  // inline `transform` -- the CSS `transition-transform` already on
  // `header.base` animates each new value smoothly, matching the
  // reference's own approach exactly (see `headerOffsetRef`'s own comment
  // above). `""` rather than `translateY(0px)` at rest so this never fights
  // any other transform this element might need in the future.
  const applyHeaderOffset = useCallback((offset: number) => {
    headerOffsetRef.current = offset;
    if (headerRef.current) {
      headerRef.current.style.transform = offset === 0 ? "" : `translateY(${offset}px)`;
    }
  }, []);

  // Hide on scroll down, reveal on scroll up, by a continuous amount
  // proportional to actual scroll distance -- see `headerOffsetRef`'s own
  // comment for why this isn't a threshold-triggered boolean any more.
  // Also computes the adaptive tone (see `getSurfaceToneAt` above) in the
  // same pass, so no second scroll listener is added just for that.
  // rAF-throttled so this never runs more than once per rendered frame no
  // matter how fast `scroll` fires.
  //
  // useLayoutEffect, not useEffect -- same "compute real state before
  // paint" pattern already used elsewhere in this codebase (IntroLoader.tsx,
  // ScrollReset.tsx): `update()` is also called once synchronously below,
  // right after it's defined, so the header's tone (and hide/reveal state)
  // is correct for wherever the page actually mounted -- a restored scroll
  // position or a #anchor deep link, not just scroll position 0 -- before
  // the first paint, not after a flash of the wrong state.
  useLayoutEffect(() => {
    // Nothing to hide/reveal for a non-sticky header -- see the `sticky`
    // prop's own doc comment.
    if (!sticky) return;

    lastScrollYRef.current = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      // `megaRendered`, not just `openMenu` (real bug, found live,
      // 2026-09-08: "hover on the nav content and move out the cursor...
      // the logo turn white... it stays white") -- the mega panel stays
      // mounted and visually present for `MEGA_TRANSITION_MS` (500ms)
      // after `openMenu` already goes back to `null` on mouse-leave (its
      // own closing `clip-path` sweep needs something to animate, see
      // `megaRendered`'s own comment above). Every `openMenu` change
      // re-runs this whole effect, including one synchronous `update()`
      // call -- gating on `openMenu` alone meant that call fired the
      // instant the trigger closed, while the still-mounted, fully opaque
      // `bg-ink` panel (`absolute top-full`, i.e. starting exactly at the
      // probe point below) was still sitting exactly where
      // `getSurfaceToneAt` samples, misreading "dark" no matter what
      // section was actually behind the header -- and nothing ever
      // recomputed it again afterward, since only a real scroll (or
      // another `openMenu` change) triggers a fresh check.
      if (openMenu || drawerOpen || megaRendered) {
        applyHeaderOffset(0);
        lastScrollYRef.current = window.scrollY;
        return;
      }
      const currentY = window.scrollY;
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      // Mobile/tablet only (this codebase's own `xl` desktop threshold,
      // e.g. `header.nav`'s own breakpoint) -- desktop's taller header and
      // larger footer top-gap already leave enough clearance, confirmed
      // live not to overlap there.
      //
      // Owner report, 2026-09-07: on mobile/tablet, scrolling up even a
      // little while at the footer reveals the sticky header back over the
      // footer's own logo -- the header's `z-40` sits above the footer's
      // own `z-0`, so whenever both are visible in the same viewport
      // region they physically overlap; confirmed live, not a footer
      // sizing/clipping bug. NOT an IntersectionObserver on the footer
      // element -- this site's own footer "reveal" trick (see Footer.tsx's
      // own header comment) keeps the footer geometrically `sticky
      // bottom-0`-pinned to the viewport's bottom edge for the page's
      // ENTIRE scroll range, only visually uncovered once `<main>`'s own
      // opaque content has scrolled past that screen position -- so a
      // geometric-intersection check reports "in view" almost everywhere
      // on the page, not just near the real bottom (confirmed live: still
      // "intersecting" at scrollY 2000 on a 12000px+ page). What actually
      // matters here is whether the footer is currently the thing showing
      // through, i.e. whether we've scrolled within the footer's own
      // height of the true document end -- computed directly from scroll
      // position instead, the same real condition the reveal trick itself
      // uses. `document.querySelector("footer")` (exactly one per page,
      // `components/sections/Footer.tsx`) read fresh on every scroll tick,
      // not cached, since its own height can change with viewport width.
      const footerHeight = document.querySelector("footer")?.scrollHeight ?? 0;
      const documentHeight = document.documentElement.scrollHeight;
      const footerRevealed = currentY + window.innerHeight >= documentHeight - footerHeight;
      if (footerRevealed && window.innerWidth < 1280) {
        applyHeaderOffset(-headerHeight);
        lastScrollYRef.current = currentY;
        return;
      }
      // Accumulates real scroll delta into the offset instead of snapping
      // between two fixed states -- a small scroll only partially hides
      // the header (exactly what the reference itself does), and it takes
      // a real, sustained scroll to fully disappear rather than any single
      // pixel of downward movement. Clamped to [-headerHeight, 0]; forced
      // to exactly 0 at the very top of the page as a safety net against
      // any accumulated rounding drift, not because the clamp alone
      // wouldn't already keep it there on a normal round trip.
      const delta = currentY - lastScrollYRef.current;
      const nextOffset = Math.min(0, Math.max(-headerHeight, headerOffsetRef.current - delta));
      applyHeaderOffset(currentY <= 0 ? 0 : nextOffset);
      // Probes 1px below the header's own real rendered bottom edge --
      // `elementFromPoint` is viewport-relative, and the sticky header
      // always occupies 0..headerHeight of the viewport regardless of
      // scroll position, so this always lands on whatever's actually
      // visible directly under it right now. Time-throttled to ~8/sec
      // (not every rAF tick) -- see `lastToneCheckRef`'s own comment above
      // for why.
      const now = performance.now();
      if (now - lastToneCheckRef.current > 120) {
        lastToneCheckRef.current = now;
        setTone(getSurfaceToneAt(window.innerWidth / 2, headerHeight + 1));
      }
      lastScrollYRef.current = currentY;
    };

    update();

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMenu, drawerOpen, megaRendered, sticky, applyHeaderOffset]);

  return (
    <header
      ref={headerRef}
      data-tone={tone}
      className={cx(sticky ? header.base : header.baseStatic, className)}
    >
      {/* Progressive frosted-glass blur (owner reference, 2026-09-07:
          labs.google's own nav) -- 5 stacked layers, each blurring more
          than the last, masked to its own band so the blur intensifies
          toward the header's outer/top edge. Blur amount is a Tailwind
          `backdrop-blur-[Npx]` utility class here, not part of the
          `.header-blur-N` CSS classes in app/globals.css -- a hand-written
          `backdrop-filter` there was silently dropped by the build's CSS
          pipeline (real bug, found live); Tailwind's own generated
          `backdrop-blur-*` utilities survive that same pipeline fine (see
          `.header-blur-1`'s own comment in app/globals.css for the full
          story), so the blur itself goes through that proven path and only
          the mask (no Tailwind utility exists for a gradient mask) stays
          hand-written CSS. See `header.blurLayer`'s own comment in
          components/ui/styles.ts for why `-z-10` matters here. */}
      <span aria-hidden="true" className={cx(header.blurLayer, "header-blur-1 backdrop-blur-[4px]")} />
      <span aria-hidden="true" className={cx(header.blurLayer, "header-blur-2 backdrop-blur-[6px]")} />
      <span aria-hidden="true" className={cx(header.blurLayer, "header-blur-3 backdrop-blur-[10px]")} />
      <span aria-hidden="true" className={cx(header.blurLayer, "header-blur-4 backdrop-blur-[18px]")} />
      <span aria-hidden="true" className={cx(header.blurLayer, "header-blur-5 backdrop-blur-[34px]")} />

      {/* Wraps the trigger row and the mega panel under one shared
          mouse-leave/blur zone -- required now that the panel is a single
          full-width element rendered once (below), not nested inside each
          trigger's own <li>: moving the pointer from a trigger down into
          the panel must not close it, and the whole group only closes once
          the pointer/focus leaves BOTH pieces together. */}
      <div
        onMouseLeave={closeMenu}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) closeMenu();
        }}
      >
        <div className={header.inner}>
          {/* `brand` is always the link's accessible name, so screen readers
              get "Capriowear, home" whether the logo image or the text
              fallback is what's actually on screen. First grid column of
              `header.inner` at `xl:` -- see that token's own comment for why
              the nav needs its own column (rather than being grouped with
              this link) to center inside. */}
          <Link href="/" className={header.brand} aria-label={`${brand}, home`}>
            {logo ?? (
              <>
                <span className={header.brandName}>{brand}</span>
                {brandParent ? <span className={header.brandParent}>{brandParent}</span> : null}
              </>
            )}
            {desktopLogo ?? logo}
          </Link>

          {/* Desktop nav -- middle grid column at `xl:`, centered within it
              via `header.nav`'s own `xl:justify-center`. */}
          <nav aria-label="Main" className={header.nav}>
            <ul className={header.navList}>
              {links.map((link) => {
                const hasMenu = Boolean(link.megaMenu?.length);
                const isOpen = openMenu === link.label;
                // Stays underlined for the whole time the user is on that
                // section, not just while the trigger is open/hovered --
                // owner request, 2026-09-07: "once user is on services page,
                // that underline should be visible until the page is
                // changed", same for factory tour, matching how Activewear
                // is meant to behave. `startsWith` (not exact match) so any
                // page under that section counts, e.g. a Leggings PDP still
                // reads as "on Activewear".
                const isRouteActive =
                  pathname === link.href || pathname?.startsWith(`${link.href}/`);
                // Semibold is gated on `isRouteActive` ALONE now, not
                // `isOpen`/hover (owner, 2026-09-08: "on hover the text
                // should only change the color not the font weight, after
                // selection it can change the font weight") -- hovering a
                // mega-menu trigger (or a plain link, via CSS `:hover`/
                // `group-hover`) now only changes colour; landing on that
                // page is the only thing that still bolds it. The
                // underline that used to render alongside this (
                // `navUnderline`, also gated on `isRouteActive` only) was
                // removed entirely (owner, 2026-09-08: "remove the selected
                // page underline") -- weight/colour alone now carries the
                // "you're on this page" signal.

                if (!hasMenu) {
                  return (
                    <li key={link.href}>
                      <Link href={link.href} className={header.navLink}>
                        {/* Same grid-stacked label as a mega-menu trigger
                            (see `navLinkLabelStack` in
                            components/ui/styles.ts) -- reserves the
                            semibold width up front so landing on this page
                            (`isRouteActive`) never shifts a later nav item. */}
                        <span className={header.navLinkLabelStack}>
                          <span className={header.navLinkLabelGhost} aria-hidden="true">
                            {link.label}
                          </span>
                          <span className={cx(header.navLinkLabelVisible, isRouteActive && header.navTriggerActive)}>
                            {link.label}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.href} onMouseEnter={() => setOpenMenu(link.label)}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={megaPanelId}
                      onClick={() => setOpenMenu(isOpen ? null : link.label)}
                      className={header.navTrigger}
                    >
                      {/* Grid-stacked label, not plain text -- see the
                          comment on `navTriggerLabelStack` in
                          components/ui/styles.ts for why: reserves the
                          semibold width at all times so toggling weight on
                          open never shifts this or any later trigger. */}
                      <span className={header.navTriggerLabelStack}>
                        <span className={header.navTriggerLabelGhost} aria-hidden="true">
                          {link.label}
                        </span>
                        <span className={cx(header.navTriggerLabelVisible, isRouteActive && header.navTriggerActive)}>
                          {link.label}
                        </span>
                      </span>
                      <ChevronDown
                        className={cx(header.navTriggerChevron, isOpen && header.navTriggerChevronOpen)}
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop actions -- third grid column at `xl:`. */}
          <div className={header.actions}>
            {secondaryCta ? (
              <Link href={secondaryCta.href} className={header.actionLink}>
                {secondaryCta.label}
              </Link>
            ) : null}
            <Button href={cta.href} className={header.actionButton}>
              {cta.label}
            </Button>
          </div>

          {/* Drawer trigger -- Figma node 465:2871: a bordered pill with the
              icon and a visible "Menu" label, not an icon-only circle. The
              visible label is the accessible name, so no aria-label needed. */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={(event) => {
              // `detail === 0` is the standard signal for a keyboard-activated
              // click (Enter/Space on a focused button) vs. a real pointer
              // click -- see MobileNav.tsx's own `focusQuietly` comment.
              menuOpenedByKeyboardRef.current = event.detail === 0;
              setDrawerOpen(true);
            }}
            aria-expanded={drawerOpen}
            className={header.menuButton}
          >
            <span className={header.menuIconWrap}>
              <MenuIcon className={header.menuIcon} />
            </span>
            <span className={header.menuLabel}>Menu</span>
          </button>
        </div>

        {/* Full-width mega menu (Figma node 493:3140), corrected on first
            real use from the earlier guessed `w-80` dropdown card -- a
            single panel showing whichever link is open, not one per
            trigger, since a `w-80`-era per-<li> element could never span
            past its own inline position. Stays mounted through its own
            closing transition (`megaRendered`), the same pattern
            `MobileNav` already uses for its own open/close sweep. */}
        {megaRendered && megaContent?.megaMenu ? (
          <div
            id={megaPanelId}
            className={cx(header.megaPanel, megaRevealed ? header.megaPanelOpen : header.megaPanelClosed)}
          >
            <div className={header.megaPanelInner}>
              <div className={header.megaGroups}>
                {/* Each column fades/rises in on its own delay -- see the
                    comment on `megaGroupReveal` in components/ui/styles.ts
                    for why this is per-column, not one shared fade on the
                    whole block. */}
                {megaContent.megaMenu.map((group, index) => (
                  <div
                    key={group.label}
                    className={cx(
                      header.megaGroup,
                      header.megaGroupReveal,
                      megaRevealed ? header.megaGroupRevealOpen : header.megaGroupRevealClosed,
                    )}
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <p className={header.megaGroupLabel}>{group.label}</p>
                    <ul className={header.megaGroupList}>
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} onClick={closeMenu} className={header.megaItem}>
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <MobileNav
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        brand={brand}
        logo={logo}
        links={mobileLinks}
        contact={contact}
        social={social}
        returnFocusTo={menuButtonRef}
        openedByKeyboardRef={menuOpenedByKeyboardRef}
      />
    </header>
  );
}
