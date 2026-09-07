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
// Hide-on-scroll (owner request, 2026-08-26): the header slides off-screen
// upward once the page has scrolled down past the header's own height, and
// slides back in on any upward scroll -- a standard pattern (used sitewide
// by e.g. most editorial/marketing sites) for reclaiming vertical space on
// long pages without removing the nav outright, since it's still one
// upward scroll away. The "past its own height" threshold, not an
// arbitrary pixel count, means the header never hides before the user has
// actually scrolled past where it would sit anyway, at any breakpoint's
// real header height. Never hides while a mega menu or the mobile drawer
// is open -- both are things the user is actively interacting with inside
// the header itself, so yanking it off-screen mid-interaction would be a
// real usability regression, not a subtlety worth trading away for the
// scroll effect.
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "./Button";
import { MenuIcon } from "./icons/MenuIcon";
import { MobileNav, type MobileNavLink } from "./MobileNav";
import { cx } from "./ui/cx";
import { header } from "./ui/styles";

// Matches `header.megaPanel`'s own `duration-500` exactly -- how long the
// panel stays mounted after its trigger closes, so the closing clip-path
// sweep has time to actually play before the content unmounts.
const MEGA_TRANSITION_MS = 500;

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
  const [navHidden, setNavHidden] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);

  const closeMenu = useCallback(() => setOpenMenu(null), []);

  // Escape closes an open mega menu wherever focus currently sits.
  useEffect(() => {
    if (!openMenu) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openMenu, closeMenu]);

  // Hide on scroll down past the header's own height, reveal on scroll up --
  // see the file header comment for why. rAF-throttled so this never runs
  // more than once per rendered frame no matter how fast `scroll` fires.
  useEffect(() => {
    // Nothing to hide/reveal for a non-sticky header -- see the `sticky`
    // prop's own doc comment.
    if (!sticky) return;

    lastScrollYRef.current = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      if (openMenu || drawerOpen) {
        setNavHidden(false);
        lastScrollYRef.current = window.scrollY;
        return;
      }
      const currentY = window.scrollY;
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
        setNavHidden(true);
        lastScrollYRef.current = currentY;
        return;
      }
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const scrollingDown = currentY > lastScrollYRef.current;
      if (scrollingDown && currentY > headerHeight) {
        setNavHidden(true);
      } else if (!scrollingDown) {
        setNavHidden(false);
      }
      lastScrollYRef.current = currentY;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openMenu, drawerOpen, sticky]);

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

  return (
    <header
      ref={headerRef}
      className={cx(sticky ? header.base : header.baseStatic, sticky && navHidden && header.hidden, className)}
    >
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
                // `isActive` still drives the semibold/colour treatment on
                // both open (hovering a mega-menu trigger) and route-active
                // states -- only the underline itself is route-only now
                // (owner, same day: "don't show the underline highlighter
                // [on hover], just change the color of the text and increase
                // the font weight ... It only appears when some page is
                // selected"). Each `isRouteActive ? <navUnderline /> : null`
                // below is the actual gate; `isActive` is never read for the
                // underline anymore, only for weight/colour.
                const isActive = isOpen || isRouteActive;

                if (!hasMenu) {
                  return (
                    <li key={link.href}>
                      <Link href={link.href} className={header.navLink}>
                        {/* Same grid-stacked label as a mega-menu trigger
                            (see `navLinkLabelStack` in
                            components/ui/styles.ts) -- reserves the
                            semibold width up front so hovering (CSS
                            `group-hover`) or landing on this page
                            (`isActive`) never shifts a later nav item. */}
                        <span className={header.navLinkLabelStack}>
                          <span className={header.navLinkLabelGhost} aria-hidden="true">
                            {link.label}
                          </span>
                          <span className={cx(header.navLinkLabelVisible, isActive && header.navTriggerActive)}>
                            {link.label}
                          </span>
                        </span>
                        {isRouteActive ? <span className={header.navUnderline} aria-hidden="true" /> : null}
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
                        <span className={cx(header.navTriggerLabelVisible, isActive && header.navTriggerActive)}>
                          {link.label}
                        </span>
                      </span>
                      <ChevronDown
                        className={cx(header.navTriggerChevron, isOpen && header.navTriggerChevronOpen)}
                        aria-hidden="true"
                      />
                      {isRouteActive ? <span className={header.navUnderline} aria-hidden="true" /> : null}
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
            onClick={() => setDrawerOpen(true)}
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
      />
    </header>
  );
}
