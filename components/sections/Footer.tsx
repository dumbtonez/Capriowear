// components/sections/Footer.tsx
// Homepage section 15, the site footer. Figma: desktop node 461:2650
// (1440x720), mobile node 461:2715 (360x776).
//
// Genuinely different layouts per breakpoint, not one responsive reflow --
// see the header comment on `footer` in components/ui/styles.ts for the
// exact structural difference (desktop's multi-row grid vs. mobile's flat
// stacked column).
//
// The "reveal" scroll transition has gone through several mechanisms, all
// on 2026-09-10 except the first:
//   1. `position: sticky` directly on this section's own root (removed
//      2026-09-06 -- permanently clipped the footer's top content on any
//      viewport shorter than its own height).
//   2. `components/RevealMain.tsx`, pulling this footer up underneath
//      `<main>` via a JS-measured negative `margin-bottom`. Checked out
//      correct in every layout-level automated test (computed styles,
//      two from-scratch production builds, a freshly restarted dev
//      server) but never actually appeared in the owner's real desktop
//      Chrome. Deleted after no root cause was found.
//   3. Restored at the owner's request, plus a defensive re-measurement
//      after `window.load`/`document.fonts.ready`, after concluding the
//      likely cause was this session's own unusually long, heavily hot-
//      reloaded dev server rather than a real defect.
//   4. Deleted again the same day: further isolated testing, this time
//      with the test browser tab genuinely fronted (not backgrounded) and
//      a real desktop-height viewport, reproduced the exact same
//      "computed layout is correct, nothing actually paints" signature
//      the owner had described -- ruling out the "just a stale dev
//      session" theory. This points at a real paint/compositing bug with
//      applying a negative margin via direct JS style mutation after
//      initial paint (the layout engine updates correctly; some
//      rendering paths appear not to correctly repaint the newly-
//      uncovered region), not a layout bug -- which is exactly why every
//      layout-level check (computed styles, `getBoundingClientRect`)
//      kept reporting the mechanism as correct while it visually wasn't.
//
// Current (and, going forward, preferred) mechanism: a self-contained CSS
// reveal directly on this component -- `useRevealOnView` (the same
// `IntersectionObserver` hook `TextReveal`/`RevealBox` already use
// sitewide) toggles a `.footer-reveal-active` class, driving a plain
// opacity + upward-translate transition (`.footer-reveal`,
// app/globals.css). No document-flow trick at all: this footer always
// renders at its own real height, in completely ordinary position,
// immediately after `<main>` -- only opacity/transform are ever animated,
// so nothing here can structurally hide it, and there is no negative-
// margin-style paint risk to repeat. See `docs/05-plan.md`'s 2026-09-10
// entries for the full back-and-forth if this ever needs revisiting.
//
// Social links read from content/site.ts's ORGANIZATION.sameAs (the same
// array already feeding organizationSchema()), not a second copy -- matched
// to an icon by URL substring, not array position, so the order in sameAs
// never has to match the order these render in. Facebook is a real 3rd icon
// in Figma but has no real page yet (owner, 2026-08-26) -- it renders as a
// plain <span>, not an <a>, since content/site.ts's own rule is "only real,
// live profiles get a URL, never a placeholder href". Swap FacebookIcon's
// <span> for a real <a href> the moment ORGANIZATION.sameAs gains a
// Facebook URL.
//
// Link rule (owner, 2026-08-27, ahead of adding `basePath: "/capriowear"`
// at launch): every internal route -- `content.nav.columnOne`/`columnTwo`,
// the brand logo's home link -- uses next/link with its plain root-relative
// href, so basePath rewrites it automatically once added. A genuinely
// external destination (the parent capriosports.com site, or CaprioGear)
// would need a plain absolute `<a href="https://...">` instead, the same
// way the social links and mailto: already are here -- root-relative
// would wrongly resolve as /capriowear/... under this app's own basePath.
// No such external link exists in this component today; this is the rule
// to follow if/when one is added.
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { Logo } from "@/components/Logo";
import { useRevealOnView } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { footer } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type FooterProps = {
  content: typeof home.footer;
  social: readonly string[];
};

const SOCIAL_ICON = [
  { match: "instagram.com", Icon: InstagramIcon, size: "socialIconSm" as const },
  { match: "linkedin.com", Icon: LinkedinIcon, size: "socialIconLg" as const },
];

function SocialLinks({ social }: { social: readonly string[] }) {
  return (
    <>
      {social.map((url) => {
        const entry = SOCIAL_ICON.find((s) => url.includes(s.match));
        if (!entry) return null;
        const { Icon, size } = entry;
        return (
          <a key={url} href={url} target="_blank" rel="noopener noreferrer" className={footer.socialButton}>
            <Icon className={footer[size]} />
          </a>
        );
      })}
      {/* No real Facebook page yet -- see the header comment above. */}
      <span className={footer.socialButton} aria-label="Facebook (coming soon)">
        <FacebookIcon className={footer.socialIconFb} />
      </span>
    </>
  );
}

export function Footer({ content, social }: FooterProps) {
  const { ref, active } = useRevealOnView<HTMLElement>(0.05);
  // Bounded safety net: `useRevealOnView`'s `IntersectionObserver` is the
  // same one every other reveal on this site already relies on, but if it
  // somehow never fires, `active` would stay false forever and this footer
  // would sit at `opacity: 0` permanently -- exactly as bad as the footer
  // actually being missing. Deliberately NOT a flat timer from mount: this
  // element mounts with the rest of the page, well before most visitors
  // scroll anywhere near it, so a mount-based timeout would just make the
  // footer fade in on its own a second or two after page load regardless
  // of scroll position. Instead this plain `scroll` listener does the same
  // "is it roughly in view" check using nothing but
  // `getBoundingClientRect` -- no observer API at all, so it can't share
  // whatever, if anything, keeps that one from firing.
  const [forceVisible, setForceVisible] = useState(false);
  useEffect(() => {
    if (forceVisible) return;

    function checkProximity() {
      const el = ref.current;
      if (!el) return;
      if (el.getBoundingClientRect().top < window.innerHeight + 200) {
        setForceVisible(true);
      }
    }

    checkProximity();
    window.addEventListener("scroll", checkProximity, { passive: true });
    window.addEventListener("resize", checkProximity);
    return () => {
      window.removeEventListener("scroll", checkProximity);
      window.removeEventListener("resize", checkProximity);
    };
  }, [ref, forceVisible]);

  return (
    <footer
      ref={ref}
      className={cx(footer.root, "footer-reveal", (active || forceVisible) && "footer-reveal-active")}
    >
      {/* Desktop: multi-row grid -- see the styles.ts header comment. */}
      <div className={footer.desktopOuter}>
        <div className={footer.desktopInner}>
          <div className={footer.desktopRow1}>
            <div className={footer.desktopBrandGroup}>
              <Logo footer className={footer.desktopBrandLogo} />
            </div>
            <div className={footer.desktopSocialGroup}>
              <SocialLinks social={social} />
            </div>
          </div>

          <div className={footer.desktopDivider} />

          <div className={footer.desktopRow2}>
            <div className={footer.desktopNavGroup}>
              <div className={footer.desktopNavColumnOne}>
                {content.nav.columnOne.map((link) => (
                  <Link key={link.href} href={link.href} className={footer.desktopNavLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className={footer.desktopNavColumnTwo}>
                {content.nav.columnTwo.map((link) => (
                  <Link key={link.href} href={link.href} className={footer.desktopNavLink}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className={footer.desktopDescriptionGroup}>
              <p className={footer.desktopTagline}>{content.tagline}</p>
              <p className={footer.desktopDescription}>{content.description}</p>
            </div>
          </div>

          <div className={footer.desktopRow3}>
            <div className={footer.desktopContactGroup}>
              <p className={footer.desktopContactLabel}>{content.contact.label}</p>
              <a href={`mailto:${content.contact.email}`} className={footer.desktopContactEmail}>
                {content.contact.email}
              </a>
            </div>
            <div className={footer.desktopAddressGroup}>
              <p className={footer.desktopAddressLine}>{content.address}</p>
              <p className={footer.desktopAddressLineNarrow}>{content.copyright}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: one flat stacked column -- see the styles.ts header comment.
          No separate "Let's explore..." contact label here: Figma's mobile
          frame goes straight from the divider to the bare email link. */}
      <div className={footer.mobileOuter}>
        <div className={footer.mobileBrandGroup}>
          <Logo stacked className={footer.mobileBrandLogo} />
        </div>
        <a href={`mailto:${content.contact.email}`} className={footer.mobileEmail}>
          {content.contact.email}
        </a>

        <div className={footer.mobileDivider} />

        <div className={footer.mobileDescriptionGroup}>
          <p className={footer.mobileTagline}>{content.tagline}</p>
          <p className={footer.mobileDescription}>{content.description}</p>
        </div>
        <div className={footer.mobileNavList}>
          {[...content.nav.columnOne, ...content.nav.columnTwo].map((link) => (
            <Link key={link.href} href={link.href} className={footer.mobileNavLink}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={footer.mobileDivider} />

        <div className={footer.mobileAddressGroup}>
          <p className={footer.mobileAddressLine}>{content.address}</p>
          <p className={footer.mobileAddressLine}>{content.copyright}</p>
        </div>

        <div className={footer.mobileDivider} />

        <div className={footer.mobileSocialGroup}>
          <SocialLinks social={social} />
        </div>
      </div>
    </footer>
  );
}
