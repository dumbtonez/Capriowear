// components/sections/ServicesHero.tsx
// /services page, section 1. Figma desktop node 729:139 (owner brief,
// 2026-09-07: "same design that we have for home, same marquee at the
// bottom of the banner").
//
// A simpler variant of the homepage Hero (components/sections/Hero.tsx):
// no eyebrow, no video placeholder block -- just the H1, buttons, then the
// same "Fully Custom Offerings" ticker. Built as its own component (not a
// mode of Hero) since the layout genuinely differs, but every reusable
// piece is the real shared one: Button, TextReveal, and Marquee itself
// (same component, same props Hero.tsx already uses -- label, "bold"
// variant, "sparkle" separator, dark tone, no pause-on-hover), not a
// second copy of any of them. See `servicesHero` in components/ui/styles.ts
// for the exact spacing/token notes.
//
// Mobile (owner, 2026-09-07, three requests together): "Remove the
// download catalog cta [on mobile] ... make the banner height the same as
// the homepage hero banner ... fully custom offering make it same as used
// on the homepage" -- all three land as "mobile mirrors Hero.tsx's own
// mobile treatment exactly, not a second bespoke one":
//   - Secondary button ("Download Catalog") is desktop-only now, same
//     `hidden xl:contents` wrapper Hero.tsx's own secondary CTA uses (see
//     `hero.ctaSecondaryWrap`, reused directly rather than a second
//     identical token) -- both buttons still render at every width from
//     xl up, matching this page's own Figma frame (729:139), which shows
//     both (no mobile frame exists to say otherwise).
//   - `bannerInner`'s mobile padding (`pt-12 pb-12 gap-8`) was already
//     byte-identical to `hero.bannerInner`'s own mobile value before this
//     change -- removing the second button is what actually closes the
//     height gap (a stacked two-button column reads taller than Hero's own
//     single-button mobile block), not a padding change here.
//   - Ticker: mobile now gets Hero's own real mobile treatment, a plain
//     `ScrollSpotlightList` label+list (not a scrolling Marquee) below
//     `md:` -- originally `hero.tickerMobile*` reused directly (same 48px
//     inset, same label size/weight), then forked into this page's own
//     `servicesHero.tickerMobile*` tokens the same day for an experimental
//     tweak ("make the fully custom font to 24px auto and make the entire
//     content center-aligned and see how it looks"). That fork is now the
//     SHARED version instead (owner, 2026-09-10: "I have created a
//     different similar variant on services page, let's use that here" --
//     Hero.tsx reads these same `servicesHero.tickerMobile*` tokens now,
//     `hero.tickerMobile*` removed as the redundant original), left-
//     aligned on both pages (same turn: "make it left align on home and
//     services both", overriding the center-align experiment) -- see
//     those tokens' own comment in components/ui/styles.ts for the full
//     reasoning. Desktop Marquee (`md:` and up) is unchanged, still fed
//     `customOfferings.items` (the shared 9 individual items) on the
//     homepage; this page's own mobile list content stays its own
//     5-paired-item version, see below.
//   - Mobile list content, same day: the owner's own 5-line paired version
//     ("Design & Color" / "Fabric & Fit" / "Print & Embroidery" /
//     "Branding & Trims" / "Labels & Packaging") -- `services.hero.
//     mobileTickerItems` (content/services.ts), not a change to the shared
//     `home.customOfferings.items` the desktop marquee above still uses.
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { ScrollSpotlightList } from "@/components/ScrollSpotlightList";
import { TextReveal } from "@/components/TextReveal";
import { hero, servicesHero } from "@/components/ui/styles";
import type { home } from "@/content/home";
import type { services } from "@/content/services";

export type ServicesHeroProps = {
  hero: typeof services.hero;
  customOfferings: typeof home.customOfferings;
};

export function ServicesHero({ hero: content, customOfferings }: ServicesHeroProps) {
  return (
    <section className={servicesHero.section}>
      <div className={servicesHero.bannerInner}>
        <TextReveal as="h1" text={content.h1} className={`${servicesHero.heading} text-display`} />

        <div className={servicesHero.buttons}>
          <Button href={content.ctaPrimary.href} className={servicesHero.ctaPrimary}>
            {content.ctaPrimary.label}
          </Button>
          <div className={hero.ctaSecondaryWrap}>
            <Button variant="secondary" href={content.ctaSecondary.href}>
              {content.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <Marquee
          label={customOfferings.label}
          labelVariant="bold"
          separator="sparkle"
          tone="dark"
          items={customOfferings.items}
          pauseOnHover={false}
          divider={false}
        />
      </div>
      <div className={servicesHero.tickerMobile}>
        <span className={servicesHero.tickerMobileLabel}>{customOfferings.label}</span>
        <ScrollSpotlightList
          items={content.mobileTickerItems}
          listClassName={servicesHero.tickerMobileList}
          itemClassName={servicesHero.tickerMobileItem}
        />
      </div>
    </section>
  );
}
