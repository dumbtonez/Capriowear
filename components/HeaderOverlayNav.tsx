"use client";

// components/HeaderOverlayNav.tsx
// Exploratory alternate to Header.tsx/MobileNav.tsx (owner reference,
// 2026-08-27: https://afternow.co/services/), NOT wired into the live page
// -- see app/styleguide/page.tsx for where it's actually rendered, and
// docs/03-component-library.md for the full writeup. Header.tsx itself is
// untouched.
//
// Reference behaviour (confirmed live, DOM/computed-style inspection, not
// guessed): a sticky top bar (logo, plain inline links, CTA, and a small
// toggle button) stays visible at every breakpoint -- there is no separate
// desktop/mobile treatment the way this site's real Header has. Clicking
// the toggle fades out the inline links/CTA and opens a full-screen panel
// directly below the still-visible top bar; the toggle's own icon swaps to
// a close state. Two deliberate simplifications from the literal reference
// (no design exists for this, so these are judgement calls, not measured
// values): the reference's 4-dot-to-X GSAP morph is replaced with this
// project's own Menu/X icon swap (lucide-react, the same pair Header.tsx's
// drawer trigger already uses); the reference's promotional/case-study
// content inside the panel is agency-specific and isn't reproduced -- the
// reusable structural idea (large-type link list + socials in a full-
// screen takeover) is what's built here, with real Capriowear content.
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "./Button";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./icons/SocialIcons";
import { cx } from "./ui/cx";
import { footer, header, headerOverlay, iconButton } from "./ui/styles";
import type { NavLink } from "./Header";

export type HeaderOverlayNavProps = {
  brand: string;
  logo?: React.ReactNode;
  links: NavLink[];
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  social: readonly string[];
};

const SOCIAL_ICON = [
  { match: "instagram.com", Icon: InstagramIcon, size: "socialIconSm" as const },
  { match: "linkedin.com", Icon: LinkedinIcon, size: "socialIconLg" as const },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function HeaderOverlayNav({ brand, logo, links, cta, secondaryCta, social }: HeaderOverlayNavProps) {
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Panel starts exactly below the top bar's own real height, whatever that
  // is at the current breakpoint -- same "measure, don't guess" reasoning
  // as Header.tsx's hide-on-scroll threshold.
  useEffect(() => {
    const measure = () => setHeaderHeight(headerRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
    } else {
      toggleRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
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
  }, [open]);

  return (
    <header ref={headerRef} className={header.base}>
      <div className={header.inner}>
        <div className={header.brandNavGroup}>
          <Link href="/" className={header.brand} aria-label={`${brand}, home`}>
            {logo ?? <span className={header.brandName}>{brand}</span>}
          </Link>

          <nav aria-label="Main" className={cx(header.nav, headerOverlay.fadeGroup, open && headerOverlay.fadeHidden)}>
            <ul className={header.navList}>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={header.navLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className={cx(header.actions, headerOverlay.fadeGroup, open && headerOverlay.fadeHidden)}>
          {secondaryCta ? (
            <Link href={secondaryCta.href} className={header.actionLink}>
              {secondaryCta.label}
            </Link>
          ) : null}
          <Button href={cta.href} className={header.actionButton}>
            {cta.label}
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="header-overlay-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          className={cx(iconButton, headerOverlay.toggle)}
        >
          {open ? (
            <X className={headerOverlay.toggleIcon} aria-hidden="true" />
          ) : (
            <Menu className={headerOverlay.toggleIcon} aria-hidden="true" />
          )}
        </button>
      </div>

      {open
        ? createPortal(
            <div
              id="header-overlay-nav-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              style={{ top: headerHeight }}
              className={headerOverlay.panel}
            >
              <div className={headerOverlay.inner}>
                <nav aria-label="Main" className={headerOverlay.navList}>
                  {links.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      ref={index === 0 ? firstLinkRef : undefined}
                      onClick={() => setOpen(false)}
                      className={headerOverlay.navLink}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className={headerOverlay.bottomRow}>
                  <div className={headerOverlay.ctaGroup}>
                    <Button href={cta.href} onClick={() => setOpen(false)}>
                      {cta.label}
                    </Button>
                    {secondaryCta ? (
                      <Button variant="secondary" href={secondaryCta.href} onClick={() => setOpen(false)}>
                        {secondaryCta.label}
                      </Button>
                    ) : null}
                  </div>

                  <div className={headerOverlay.socialGroup}>
                    {social.map((url) => {
                      const entry = SOCIAL_ICON.find((s) => url.includes(s.match));
                      if (!entry) return null;
                      const { Icon, size } = entry;
                      return (
                        <a
                          key={url}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={footer.socialButton}
                        >
                          <Icon className={footer[size]} />
                        </a>
                      );
                    })}
                    <span className={footer.socialButton} aria-label="Facebook (coming soon)">
                      <FacebookIcon className={footer.socialIconFb} />
                    </span>
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
