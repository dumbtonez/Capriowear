// components/sections/Hero.tsx
// Homepage section 2. Three layers, per the real Figma design (desktop node
// 322:1522, mobile node 323:1648), not the wireframe:
//   1. Banner: eyebrow, H1, CTAs.
//   2. Video placeholder with a centred play control.
//   3. The "Fully Custom Offerings" ticker.
//
// This is a section, not a reusable atom -- it composes Button, Eyebrow and
// MediaPlaceholder with page-specific layout, so it lives in
// components/sections rather than next to those in /components. It takes
// its content as props (not a direct content/home.ts import) so any page can
// render it with its own copy -- see app/page.tsx for the homepage's values.
//
// Real, confirmed differences between mobile and desktop (not narrower
// variants of one layout):
//   - The secondary "Download Catalog" button is desktop-only, from xl up.
//     Not on mobile at all (owner correction, 2026-08-23).
//   - The video placeholder is edge-to-edge on mobile, inset like every other
//     section from xl up.
//   - The ticker is not a marquee on mobile. It is a vertical list, no icons
//     -- structurally a different thing, so it is its own markup below, not
//     a mode of Marquee. It does scroll-highlight though: the line nearest
//     the viewport's centre brightens to white as you scroll, one line in
//     focus at a time -- ScrollSpotlightList, shared with Final CTA's mobile
//     compliance list (2026-08-25), not a one-off.
//   - The mobile eyebrow is smaller than the shared Overline token -- see
//     `hero.eyebrowSize` in components/ui/styles.ts.
//   - The desktop ticker never pauses on hover (`pauseOnHover={false}`,
//     owner call 2026-08-26) -- decorative, not something to read, so it
//     shouldn't stop moving just because the cursor passes over it.
import { Play } from "lucide-react";

import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Marquee } from "@/components/Marquee";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { RevealBox } from "@/components/RevealBox";
import { ScrollSpotlightList } from "@/components/ScrollSpotlightList";
import { TextReveal } from "@/components/TextReveal";
import { hero } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type HeroProps = {
  hero: typeof home.hero;
  customOfferings: typeof home.customOfferings;
};

export function Hero({ hero: content, customOfferings }: HeroProps) {
  return (
    <section className={hero.section}>
      {/* Layer 1: Banner */}
      <div className={hero.bannerInner}>
        <div className={hero.textBlock}>
          <Eyebrow tone="dark" size={hero.eyebrowSize}>
            {content.eyebrow}
          </Eyebrow>
          <TextReveal as="h1" text={content.h1} className={`${hero.heading} text-display`} />
        </div>

        <div className={hero.buttons}>
          <Button href={content.ctaPrimary.href} className={hero.ctaPrimary}>
            {content.ctaPrimary.label}
          </Button>
          {/* Desktop only -- not on the real mobile design at all. The
              wrapper carries the hidden/xl:contents toggle so it doesn't
              fight Button's own unconditional inline-flex base class -- see
              hero.ctaSecondaryWrap in components/ui/styles.ts. */}
          <div className={hero.ctaSecondaryWrap}>
            <Button variant="secondary" href={content.ctaSecondary.href}>
              {content.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Layer 2: Video placeholder */}
      <div className={hero.videoWrap}>
        <RevealBox>
          <MediaPlaceholder
            label={content.media.label}
            tone="dark"
            showLabel={false}
            radius="none"
            className={hero.video}
            overlay={
              <div className={hero.playWrap}>
                <span className={hero.playCircle}>
                  <Play className={hero.playIcon} aria-hidden="true" fill="currentColor" />
                </span>
                <span className={hero.playLabel}>Play Video</span>
              </div>
            }
          />
        </RevealBox>
      </div>

      {/* Layer 3: Ticker. Desktop scrolls; mobile is a plain stacked list --
          real, different designs, not one component in two modes. */}
      <div className="hidden xl:block">
        <Marquee
          label={customOfferings.label}
          labelVariant="bold"
          separator="sparkle"
          tone="dark"
          items={customOfferings.items}
          pauseOnHover={false}
        />
      </div>
      <div className={hero.tickerMobile}>
        <span className={hero.tickerMobileLabel}>{customOfferings.label}</span>
        <ScrollSpotlightList
          items={customOfferings.items}
          listClassName={hero.tickerMobileList}
          itemClassName={hero.tickerMobileItem}
        />
      </div>
    </section>
  );
}
