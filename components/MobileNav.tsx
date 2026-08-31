"use client";

// components/MobileNav.tsx
// The drawer behind Header's "Menu" trigger, below the desktop breakpoint
// (xl, 1280px -- see Header's `nav` recipe). Rendered and controlled by
// Header.
//
// Nothing is rendered while the drawer is closed, so no link inside it is
// reachable by Tab or by find-on-page, and the closed state costs no DOM.
//
// The drawer renders through a portal on document.body rather than in place.
// Header is `sticky z-40`, which makes it a stacking context: a z-50 drawer
// nested inside it would still be trapped beneath anything else on the page at
// z-50 or above. The portal takes the drawer out of that context entirely, so
// its own z-index is the one that counts.
//
// The trap is deliberately small and self-contained rather than a dependency:
// focus moves to the close button on open, Tab and Shift+Tab cycle within the
// panel, Escape closes, and focus returns to whatever opened it. Background
// scroll is locked while open so the page behind does not move under the
// drawer.
//
// Full-screen takeover, corrected against the real open-state design (Figma
// node 465:2817, 2026-08-27) -- see the header comment on the `drawer`
// recipe in components/ui/styles.ts for what changed from the pre-design
// guess this replaced.
import { X } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { ChevronArrowIcon } from "./icons/ChevronArrowIcon";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./icons/SocialIcons";
import type { NavMegaMenuGroup } from "./Header";
import { cx } from "./ui/cx";
import { drawer, header } from "./ui/styles";

// Re-exported so existing callers/imports of this name keep working --
// this is now the same shape Header.tsx's own `NavLink.megaMenu` uses
// (`NavMegaMenuGroup`), not a separate duplicate type, since both surfaces
// read the exact same `content/home.ts` category data.
export type MobileNavMegaMenuGroup = NavMegaMenuGroup;

export type MobileNavLink = {
  label: string;
  href: string;
  /** Decorative only where `megaMenu` is absent (Figma shows no expanded
   *  state for those rows) -- see home.nav.mobileLinks. Where `megaMenu` is
   *  present, this row is a real trigger: it pushes a second in-drawer
   *  screen instead of navigating (see MobileNav's own `activeMegaMenuHref`
   *  state, Figma node 473:2919). */
  chevron: boolean;
  megaMenu?: NavMegaMenuGroup[];
};

export type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  brand: string;
  logo?: ReactNode;
  links: MobileNavLink[];
  contact: { label: string; email: string };
  social: readonly string[];
  /** Focus returns here on close, i.e. the button that opened the drawer. */
  returnFocusTo?: React.RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Matches `drawer.navReveal`'s `duration-[900ms]` exactly -- this is how long
// the component stays mounted after `open` goes false, so the closing
// clip-path transition has time to actually play before the portal unmounts.
const CLOSE_TRANSITION_MS = 900;

// Same LinkedIn-then-Instagram-then-Facebook order as the real Figma design
// -- independent of ORGANIZATION.sameAs's own array order (Instagram first),
// which Footer's own social row follows for its own, separately-confirmed
// Figma order. Facebook has no `match`: it always renders, unlinked, unless
// a real URL shows up in `social` -- same standing rule Footer follows.
const SOCIAL_ICONS = [
  { match: "linkedin.com", Icon: LinkedinIcon, size: drawer.socialIconLg },
  { match: "instagram.com", Icon: InstagramIcon, size: drawer.socialIconSm },
];

function SocialLinks({ social }: { social: readonly string[] }) {
  return (
    <>
      {SOCIAL_ICONS.map(({ match, Icon, size }) => {
        const url = social.find((href) => href.includes(match));
        if (!url) return null;
        return (
          <a key={match} href={url} target="_blank" rel="noopener noreferrer" className={drawer.socialButton}>
            <Icon className={size} />
          </a>
        );
      })}
      <span className={drawer.socialButton} aria-label="Facebook (coming soon)">
        <FacebookIcon className={drawer.socialIconFb} />
      </span>
    </>
  );
}

export function MobileNav({ open, onClose, brand, logo, links, contact, social, returnFocusTo }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Which link's megaMenu (if any) is pushed on screen -- keyed by href
  // since that's already guaranteed unique across `links`. null means the
  // main list is showing.
  const [activeMegaMenuHref, setActiveMegaMenuHref] = useState<string | null>(null);
  const activeLink = links.find((link) => link.href === activeMegaMenuHref);

  // Stays mounted slightly longer than `open` so the closing clip-path
  // transition (drawer.navReveal) has something to animate -- unmounting
  // immediately on `open: false` would just make the content vanish, since
  // an element that's not in the DOM can't play a CSS transition.
  const [rendered, setRendered] = useState(open);
  // The class that actually drives the clip-path -- flipped one frame after
  // `rendered` turns true on open (in the effect below, via `requestAnimationFrame`),
  // so the browser paints the closed state first and has something to
  // transition *from*. Flipped back to closed immediately on `open: false`,
  // adjusted during render (React's own pattern for state that must track a
  // prop the instant it changes) rather than in an effect, so the closing
  // transition starts on the very same frame `open` does.
  const [revealed, setRevealed] = useState(false);
  if (open && !rendered) setRendered(true);
  if (!open && revealed) setRevealed(false);

  useEffect(() => {
    if (!open) {
      // Also resets the megaMenu screen here, not immediately on `open`
      // going false -- doing it immediately would snap the still-visible
      // (still-closing) drawer back to the main list mid-animation. Waiting
      // for the same timeout that unmounts the panel means a reopened
      // drawer always starts fresh at the main screen, invisibly.
      const timeout = setTimeout(() => {
        setRendered(false);
        setActiveMegaMenuHref(null);
      }, CLOSE_TRANSITION_MS);
      return () => clearTimeout(timeout);
    }
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus in on open, return it on close.
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else {
      returnFocusTo?.current?.focus();
    }
    // returnFocusTo is a ref object and stable; only `open` should retrigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape closes; Tab cycles inside the panel.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  // Nothing is rendered while fully closed, so there is no server/client
  // mismatch (`open` and `rendered` are both false on first render) and
  // document.body is guaranteed to exist by the time the portal is created.
  // `rendered` (not `open`) gates this, so the closing transition gets to
  // play before the portal actually unmounts -- see `CLOSE_TRANSITION_MS`.
  if (!rendered) return null;

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      className={drawer.panel}
    >
      {/* Same row layout as the real closed header (`header.inner`), so this
          bar lines up exactly with the one it's covering. */}
      {/* `open`, not `revealed`: this row must render fully opaque on the
          very first frame it mounts (no fade-in, matching the reference's
          instant pill swap) -- keyed to `revealed` instead would render one
          frame at opacity-0 before the reveal rAF fires, animating an
          unwanted fade-in. Only the *closing* edge needs to animate (the
          "Close" pill fading out to hand off to the real header's own
          "Menu" pill instead of a hard cut), and that already works: `open`
          flips to false in the same render the element is still mounted at
          opacity-100, so the class change has something to transition from. */}
      <div className={cx(header.inner, drawer.head, open ? drawer.headRevealed : drawer.headHidden)}>
        <Link href="/" className={header.brand} aria-label={`${brand}, home`}>
          {logo}
        </Link>
        <button ref={closeRef} type="button" onClick={onClose} className={header.menuButton}>
          <span className={header.closeIconWrap}>
            <X className={header.closeIcon} aria-hidden="true" />
          </span>
          <span className={header.menuLabel}>Close</span>
        </button>
      </div>

      <nav
        aria-label="Main"
        className={cx(drawer.nav, drawer.navReveal, revealed ? drawer.navRevealOpen : drawer.navRevealClosed)}
      >
        {/* Two screens side by side, translated between them -- a soft
            "push" navigation nested inside the outer 900ms open/close
            reveal above, not a replacement for it. See the `screensClip`/
            `screens`/`screen` recipe -- the clip wrapper matters: clipping
            on `nav` itself (which carries container-p's own padding)
            let a sliver of the "off-screen" half's own right-aligned
            glyph bleed into that padding zone and show as a stray
            chevron. */}
        <div className={drawer.screensClip}>
          <div
            className={drawer.screens}
            style={{ transform: activeMegaMenuHref ? "translateX(-50%)" : undefined }}
          >
              <div className={drawer.screen}>
                <ul className={drawer.list}>
                  {links.map((link) =>
                    link.megaMenu ? (
                      <li key={link.href}>
                        <button
                          type="button"
                          onClick={() => setActiveMegaMenuHref(link.href)}
                          className={cx(drawer.link, "w-full text-left")}
                        >
                          {link.label}
                          <ChevronArrowIcon className={cx(drawer.chevronArrow, "rotate-180")} />
                        </button>
                      </li>
                    ) : (
                      <li key={link.href}>
                        <Link href={link.href} onClick={onClose} className={drawer.link}>
                          {link.label}
                          {link.chevron ? (
                            <ChevronArrowIcon className={cx(drawer.chevronArrow, "rotate-180")} />
                          ) : null}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>

                <div className={drawer.bottomWrap}>
                  <div className={drawer.contactGroup}>
                    <p className={drawer.contactLabel}>{contact.label}</p>
                    <a href={`mailto:${contact.email}`} className={drawer.contactEmail}>
                      {contact.email}
                    </a>
                  </div>
                  <div className={drawer.socialRow}>
                    <SocialLinks social={social} />
                  </div>
                </div>
              </div>

              {/* Category breakdown for whichever link is active (Figma
                  node 473:2919) -- always rendered (even when no link is
                  active) so the slide-out has real content to show
                  mid-transition, not a blank pane; `activeLink` only ever
                  actually shows once a trigger sets it. */}
              <div className={drawer.screen}>
                <button type="button" onClick={() => setActiveMegaMenuHref(null)} className={drawer.backRow}>
                  <ChevronArrowIcon className={drawer.backIcon} aria-hidden="true" />
                  <span className={drawer.backLabel}>Back</span>
                </button>

                <div className={drawer.megaMenuGroupList}>
                  {activeLink?.megaMenu?.map((group) => (
                    <div key={group.label} className={drawer.megaMenuGroup}>
                      <p className={drawer.megaMenuGroupLabel}>{group.label}</p>
                      {group.items.map((item) => (
                        <Link key={item.href} href={item.href} onClick={onClose} className={drawer.megaMenuItem}>
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </nav>
    </div>,
    document.body,
  );
}
