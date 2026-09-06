// components/sections/Footer.tsx
// Homepage section 15, the site footer. Figma: desktop node 461:2650
// (1440x720), mobile node 461:2715 (360x776).
//
// Genuinely different layouts per breakpoint, not one responsive reflow --
// see the header comment on `footer` in components/ui/styles.ts for the
// exact structural difference (desktop's multi-row grid vs. mobile's flat
// stacked column).
//
// The "reveal" scroll transition (owner reference, 2026-08-26:
// https://afternow.co/services/) no longer uses `position: sticky` on this
// section's own root -- removed 2026-09-06, see the `footer` recipe's own
// header comment (components/ui/styles.ts) and components/RevealMain.tsx
// for why (a sticky-bottom box taller than the viewport permanently clips
// its own top content, which this footer's real height hits on most real
// laptop windows). The reveal now comes from `RevealMain` (wrapping every
// page's own `<main>`) pulling this footer up underneath `<main>` via a
// real, live-measured negative margin, with `<main>`'s own `relative z-10`
// + opaque background still doing the actual covering during that overlap
// -- this component itself needs no special positioning any more, just
// `relative z-0` for stacking order.
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
import Link from "next/link";

import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { Logo } from "@/components/Logo";
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
  return (
    <footer className={footer.root}>
      {/* Desktop: multi-row grid -- see the styles.ts header comment. */}
      <div className={footer.desktopOuter}>
        <div className={footer.desktopInner}>
          <div className={footer.desktopRow1}>
            <div className={footer.desktopBrandGroup}>
              <Logo stacked className={footer.desktopBrandLogo} />
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
