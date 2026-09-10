"use client";

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
// Instagram's own icon colour is tone-adaptive (owner, 2026-09-11: "make
// it a bit dark on white and should go white on blck bacground, is it not
// too much right?" -- after an interim fixed-grey "balance" compromise
// hadn't been quite what was wanted). Reuses `getSurfaceToneAt`
// (lib/surfaceTone.ts, extracted from Header.tsx the same turn, where it
// already drives that fixed header's own adaptive text colour) rather
// than a second implementation. Samples a point just to the LEFT of this
// stack, not literally on top of either button -- `elementFromPoint`
// returns the topmost element at a pixel, and since this stack is a
// `position: fixed` sibling of the page content (not a descendant of any
// section), walking up ITS OWN ancestor chain from a point on itself would
// never reach the real section actually behind it. Re-samples on scroll
// (rAF-throttled, same pattern Header's own hide/reveal listener uses)
// and on resize, since the corner position and what's behind it both
// change. WhatsApp's own icon stays plain white throughout -- brand green
// is bright enough to read against both a white and a dark section as-is,
// unlike the much fainter frosted Instagram circle.
//
// Both are plain `<a>` tags, not click handlers -- `wa.me` is WhatsApp's
// own universal link, already correct on both desktop (opens
// web.whatsapp.com) and mobile (opens the app) with no platform detection
// needed, same as the existing mobile CTA; Instagram is a plain profile
// URL. Number/message and the Instagram URL both live in content/site.ts
// (`WHATSAPP_LINK`, `ORGANIZATION.sameAs`), not hand-typed here.
import { useEffect, useRef, useState } from "react";

import { InstagramIcon } from "@/components/icons/SocialIcons";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { cx } from "@/components/ui/cx";
import { whatsappFloating } from "@/components/ui/styles";
import { ORGANIZATION, WHATSAPP_LINK } from "@/content/site";
import { getSurfaceToneAt } from "@/lib/surfaceTone";

const INSTAGRAM_URL = ORGANIZATION.sameAs.find((url) => url.includes("instagram.com"));

// Clear of both circles (56px each) and the gap between them -- lands on
// real page content beside the stack, not on the stack itself.
const SAMPLE_OFFSET_X = 90;

export function FloatingSocialButtons() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tone, setTone] = useState<"dark" | "light">("light");

  useEffect(() => {
    let ticking = false;
    const sample = () => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (rect) {
        const x = Math.max(rect.left - SAMPLE_OFFSET_X, 1);
        const y = rect.top + rect.height / 2;
        setTone(getSurfaceToneAt(x, y));
      }
      ticking = false;
    };
    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(sample);
      }
    };
    sample();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <div ref={wrapRef} className={whatsappFloating.wrap}>
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
          <InstagramIcon
            className={cx(
              whatsappFloating.instagramIcon,
              tone === "light" ? whatsappFloating.instagramIconLight : whatsappFloating.instagramIconDark,
            )}
          />
        </a>
      ) : null}
    </div>
  );
}
