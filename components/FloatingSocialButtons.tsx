// components/FloatingSocialButtons.tsx
// Sitewide, desktop-only floating button stack (owner, 2026-09-10: "on
// mobile we added whatsapp, on desktop sitewide i want to add too on the
// right cornor of the site as floating with the same number integrated to
// it") -- mounted once in app/layout.tsx so every route gets it
// automatically, unlike ProductCtasMobileBar's own mobile bar, which is
// added per-page (see that component's own header comment for why this
// project already has a mobile WhatsApp CTA and this isn't a duplicate of
// it: no desktop bottom bar exists to extend, and a single sitewide mount
// here can't be forgotten on a future page the way a per-page one could
// be).
//
// Instagram added below WhatsApp the same day (owner: "I also want to
// highlight our insta page, should we add the icon above the whatsapp
// icon?" -- recommended against a second bright/competing CTA in the same
// spot; owner then: "maybe keep it under the whatsapp icon but not bright
// actual insta color but nutral color"). WhatsApp stays the one visually
// "loud" (brand-green) action -- the real conversion CTA -- while
// Instagram sits below it in a neutral frosted-glass treatment (see
// `whatsappFloating.instagramButton`'s own comment in components/ui/
// styles.ts for that tuning history), reachable without competing for
// attention. File renamed from WhatsAppFloatingButton.tsx to match (was a
// single-button component, same name would now undersell/mislabel the
// second icon).
//
// Instagram's own icon colour is a fixed brand colour (owner, 2026-09-11:
// "for insta sticky icon on desktop, use the brand color for the icon
// only") -- `--color-instagram` (app/globals.css), icon-only, the button's
// own frosted-glass background is unchanged. Previously tone-adaptive via
// `getSurfaceToneAt` (lib/surfaceTone.ts, still used by Header.tsx for its
// own adaptive text colour); no longer sampled here.
//
// Both are plain `<a>` tags, not click handlers -- `wa.me` is WhatsApp's
// own universal link, already correct on both desktop (opens
// web.whatsapp.com) and mobile (opens the app) with no platform detection
// needed, same as the existing mobile CTA; Instagram is a plain profile
// URL. Number/message and the Instagram URL both live in content/site.ts
// (`WHATSAPP_LINK`, `ORGANIZATION.sameAs`), not hand-typed here.
import { InstagramIcon } from "@/components/icons/SocialIcons";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappFloating } from "@/components/ui/styles";
import { ORGANIZATION, WHATSAPP_LINK } from "@/content/site";

const INSTAGRAM_URL = ORGANIZATION.sameAs.find((url) => url.includes("instagram.com"));

export function FloatingSocialButtons() {
  return (
    <div className={whatsappFloating.wrap}>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={whatsappFloating.button}
      >
        <WhatsAppIcon className={whatsappFloating.icon} />
      </a>
      {INSTAGRAM_URL ? (
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow us on Instagram"
          className={whatsappFloating.instagramButton}
        >
          <InstagramIcon className={whatsappFloating.instagramIcon} />
        </a>
      ) : null}
    </div>
  );
}
