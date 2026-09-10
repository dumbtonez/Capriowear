// components/WhatsAppFloatingButton.tsx
// Sitewide, desktop-only floating WhatsApp button (owner, 2026-09-10: "on
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
// A plain `<a href="https://wa.me/...">`, not a click handler -- `wa.me` is
// WhatsApp's own universal link, already correct on both desktop (opens
// web.whatsapp.com) and mobile (opens the app) with no platform detection
// needed, same as the existing mobile CTA. Number and the pre-filled
// opening message both live in content/site.ts (`WHATSAPP_LINK`, which
// already bundles `WHATSAPP_NUMBER` + `WHATSAPP_MESSAGE`), not hand-typed
// here -- see those constants' own comments.
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { whatsappFloating } from "@/components/ui/styles";
import { WHATSAPP_LINK } from "@/content/site";

export function WhatsAppFloatingButton() {
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
    </div>
  );
}
