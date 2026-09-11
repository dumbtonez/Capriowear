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
//     compliance list (2026-08-25), not a one-off. Its styling reads
//     `servicesHero.tickerMobile*` (components/ui/styles.ts), not a
//     `hero`-namespaced token of its own (owner, 2026-09-10: "I have
//     created a different similar variant on services page, let's use
//     that here" -- ServicesHero.tsx's own mobile ticker, left-aligned on
//     both pages per the same request) -- same cross-reuse precedent this
//     file already follows the other way for `hero.ctaSecondaryWrap`
//     (ServicesHero.tsx imports that one from here). Mobile list content
//     is now `customOfferings.mobileItems` too (owner follow-up, same
//     turn: "I asked you to use the fully custom section from the
//     services page" -- not just that section's typography, its own
//     5-paired-item list too) -- the same 9 words the desktop Marquee
//     still uses via `customOfferings.items`, just regrouped into pairs,
//     matching `services.hero.mobileTickerItems`'s exact wording
//     (content/services.ts) rather than a second, differently-worded list.
//   - The mobile eyebrow is smaller than the shared Overline token -- see
//     `hero.eyebrowSize` in components/ui/styles.ts.
//   - The desktop ticker never pauses on hover (`pauseOnHover={false}`,
//     owner call 2026-08-26) -- decorative, not something to read, so it
//     shouldn't stop moving just because the cursor passes over it.
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Marquee } from "@/components/Marquee";
import { ScrollGrowVideo } from "@/components/ScrollGrowVideo";
import { ScrollSpotlightList } from "@/components/ScrollSpotlightList";
import { TextReveal } from "@/components/TextReveal";
import { hero, servicesHero } from "@/components/ui/styles";
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
          <Eyebrow tone="dark">
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
            <Button variant="secondary" href={content.ctaSecondary.href} gradientBorder>
              {content.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Layer 2: Video placeholder -- extracted to ScrollGrowVideo.tsx
          (2026-09-11, once OurFactoryHero needed the identical narrow-to-
          full-viewport scroll grow: "apply it on other pages where it
          exist"), see that file's own header comment for the full
          mechanism. */}
      <ScrollGrowVideo label={content.media.label} wrapClassName={hero.videoWrap} image={content.media.image} />

      {/* Layer 3: Ticker. Desktop scrolls; mobile is a plain stacked list --
          real, different designs, not one component in two modes. Split at
          `md:` (768px), not `xl:` (owner, 2026-09-03: "fully custom
          offerings, that should be as shown in desktop, not mobile for
          768-1279px") -- the scrolling Marquee reads fine at tablet width,
          so real mobile only (<768px) gets the plain stacked-list fallback
          now, not every width below 1280px. */}
      <div className="hidden md:block">
        <Marquee
          label={customOfferings.label}
          labelVariant="bold"
          separator="sparkle"
          tone="dark"
          items={customOfferings.items}
          pauseOnHover={false}
        />
      </div>
      <div className={servicesHero.tickerMobile}>
        <span className={servicesHero.tickerMobileLabel}>{customOfferings.label}</span>
        <ScrollSpotlightList
          items={customOfferings.mobileItems}
          listClassName={servicesHero.tickerMobileList}
          itemClassName={servicesHero.tickerMobileItem}
        />
      </div>
    </section>
  );
}
