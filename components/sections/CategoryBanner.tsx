// components/sections/CategoryBanner.tsx
// The PLP banner (Figma node 502:3310, revised 2026-08-28 -- back to an
// ink/white-text band, this time with the breadcrumb built into its own
// top and a row of muted trust bullets, sparkle glyph). Reuses the shared
// Breadcrumb component (tone="dark", not a second copy of breadcrumb
// markup) and lucide's Sparkle (already used by Marquee/Header's own
// promo bullets for the same 4-point glyph -- Figma's own asset is the
// same shape, confirmed by comparing paths). H1 uses TextReveal (owner
// request, 2026-08-29) for the same word-by-word entrance already on
// Hero's H1 -- this banner is always above the fold, so it animates
// immediately on mount, same as Hero.
import { Sparkle } from "lucide-react";

import { Breadcrumb, type BreadcrumbItem } from "@/components/Breadcrumb";
import { TextReveal } from "@/components/TextReveal";
import { categoryBanner } from "@/components/ui/styles";

export type CategoryBannerProps = {
  breadcrumbItems: BreadcrumbItem[];
  h1: string;
  trustBullets: string[];
};

export function CategoryBanner({ breadcrumbItems, h1, trustBullets }: CategoryBannerProps) {
  return (
    <section className={categoryBanner.section}>
      <div className={categoryBanner.breadcrumbWrap}>
        <Breadcrumb items={breadcrumbItems} tone="dark" />
      </div>
      <div className={categoryBanner.contentWrap}>
        <div className={categoryBanner.content}>
          <TextReveal as="h1" text={h1} className={categoryBanner.h1} />
          <ul className={categoryBanner.trustBullets}>
            {trustBullets.map((bullet, index) => (
              // key={index}: a static, presentational list -- never
              // reordered, filtered, or edited by the user -- so index is
              // safe here and avoids collisions if two bullets ever share
              // the same text (keying by the string itself did not).
              <li key={index} className={categoryBanner.trustBullet}>
                <Sparkle className={categoryBanner.trustBulletIcon} aria-hidden="true" fill="currentColor" />
                <span className={categoryBanner.trustBulletText}>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
