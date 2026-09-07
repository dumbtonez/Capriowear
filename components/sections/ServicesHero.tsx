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
// Desktop-only for now, per the owner's own brief -- mobile is being
// handled separately; the mobile/tablet values here are a responsive-safe
// fallback (container-p + stacked layout), not a confirmed mobile design.
import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { TextReveal } from "@/components/TextReveal";
import { servicesHero } from "@/components/ui/styles";
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
          <Button variant="secondary" href={content.ctaSecondary.href}>
            {content.ctaSecondary.label}
          </Button>
        </div>
      </div>

      <Marquee
        label={customOfferings.label}
        labelVariant="bold"
        separator="sparkle"
        tone="dark"
        items={customOfferings.items}
        pauseOnHover={false}
        divider={false}
      />
    </section>
  );
}
