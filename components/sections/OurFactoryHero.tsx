// components/sections/OurFactoryHero.tsx
// /our-factory page, section 1. Figma desktop node 854:1421 ("Banner").
//
// Just the homepage Hero's own banner layer (components/sections/Hero.tsx),
// with no video and no ticker below it -- get_metadata on the Figma frame
// confirms it: 578px frame height, content starts at y=140, buttons end at
// y=498, leaving exactly 80px of bottom padding. That's Hero's own
// pt-[140px]/pb-20 banner inset byte-for-byte, so this reuses `hero`'s
// tokens directly (section, bannerInner, textBlock, heading, buttons,
// ctaPrimary, ctaSecondaryWrap, eyebrowSize) rather than forking new ones --
// there is no real difference to justify a second copy. Built as its own
// component (not Hero itself) since this page's Hero never gets a video or
// ticker layer, matching the "genuinely different composition gets its own
// component, reuse the tokens" rule ServicesHero already established.
//
// Secondary CTA is desktop-only via the same `hero.ctaSecondaryWrap` (xl and
// up) -- no mobile Figma frame exists yet for this page (owner is handling
// mobile separately), so this follows the one confirmed sitewide pattern
// rather than guessing.
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { TextReveal } from "@/components/TextReveal";
import { hero } from "@/components/ui/styles";
import type { ourFactory } from "@/content/our-factory";

export type OurFactoryHeroProps = {
  hero: typeof ourFactory.hero;
};

export function OurFactoryHero({ hero: content }: OurFactoryHeroProps) {
  return (
    <section className={hero.section}>
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
          <div className={hero.ctaSecondaryWrap}>
            <Button variant="secondary" href={content.ctaSecondary.href}>
              {content.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
