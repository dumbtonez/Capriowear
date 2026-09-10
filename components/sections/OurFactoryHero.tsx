// components/sections/OurFactoryHero.tsx
// /our-factory page, sections 1-2: Banner (Figma node 854:1421) + Youtube
// Video (854:1402), one continuous bg-ink box (get_metadata: the video
// frame starts at y=647, exactly where the banner frame ends at 69+578) --
// same as the homepage Hero's own Banner+Video layers, so this composes
// them the same way in one component, not two.
//
// Layer 1 (banner): eyebrow, H1, CTAs. get_metadata confirms this frame's
// 578px height, content starting at y=140, buttons ending at y=498 (leaving
// exactly 80px bottom padding) is byte-identical to Hero's own
// pt-[140px]/pb-20 banner inset, so this reuses `hero`'s tokens directly
// (section, bannerInner, textBlock, heading, buttons, ctaPrimary,
// ctaSecondaryWrap, eyebrowSize) rather than forking new ones.
//
// Layer 2 (video): owner brief, "same as homepage reuse it" -- the exact
// same MediaPlaceholder + RevealBox + play-control markup Hero.tsx's own
// Layer 2 renders, same `hero.videoWrap`/`video`/`playWrap`/`playCircle`/
// `playIcon`/`playLabel` tokens (Figma's 650px height / 79px inset match
// Hero's own desktop video block exactly). No ticker layer on this page.
//
// Secondary CTA is desktop-only via the same `hero.ctaSecondaryWrap` (xl and
// up) -- no mobile Figma frame exists yet for this page (owner is handling
// mobile separately), so this follows the one confirmed sitewide pattern
// rather than guessing.
import { Play } from "lucide-react";

import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { RevealBox } from "@/components/RevealBox";
import { TextReveal } from "@/components/TextReveal";
import { hero, ourFactoryHero } from "@/components/ui/styles";
import type { ourFactory } from "@/content/our-factory";

export type OurFactoryHeroProps = {
  hero: typeof ourFactory.hero;
};

export function OurFactoryHero({ hero: content }: OurFactoryHeroProps) {
  return (
    <section className={hero.section}>
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
          <div className={hero.ctaSecondaryWrap}>
            <Button variant="secondary" href={content.ctaSecondary.href}>
              {content.ctaSecondary.label}
            </Button>
          </div>
        </div>
      </div>

      <div className={ourFactoryHero.videoWrap}>
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
    </section>
  );
}
