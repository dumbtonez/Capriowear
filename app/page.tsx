// app/page.tsx
// The real Capriosports parent-site homepage -- 2026-09-15 full content +
// structure rebuild (owner's consolidated prompt). Every section below
// reuses a real, already-shipping Capriowear/Our Factory component
// wherever an exact match exists; a small number of new section components
// were built only where nothing in the codebase combines the needed shape
// (WhatWeMakeRange, FullCustomization, WhyCapriosports, CapriosportsFactory)
// -- see docs/03-component-library.md for the full reuse map and
// docs/05-plan.md's 2026-09-15 entries for the research findings that
// shaped each decision.
//
// Hero fallback (unchanged from the earlier pass): components/sections/
// Hero.tsx has no text-only variant -- it unconditionally renders a video
// layer plus a "Fully Custom Offerings" ticker layer with its own specific
// shape. Falling back to CategoryBanner (the same component every PLP/hub
// banner already uses), composed with the plain Eyebrow/Button/Marquee
// atoms Hero itself uses internally, is a page-level composition of
// existing atoms, not a new section component.
//
// Footer bug fix: this page previously rendered Capriowear's OWN footer
// content verbatim (`home.footer` from content/home.ts) -- Capriowear
// logo, "Activewear/Teamwear" nav, "division of Caprio Sports" tagline,
// Capriowear's copyright. It now renders `capriosportsHome.footer`, a real
// Capriosports content object, with a plain text `CapriosportsWordmark`
// brand mark (no dedicated Capriosports logo asset exists yet).
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/Button";
import { CapriosportsWordmark } from "@/components/CapriosportsWordmark";
import { Eyebrow } from "@/components/Eyebrow";
import { Marquee } from "@/components/Marquee";
import { CapriosportsFactory } from "@/components/sections/CapriosportsFactory";
import { CategoryBanner } from "@/components/sections/CategoryBanner";
import { CategoryLinkGrid } from "@/components/sections/CategoryLinkGrid";
import { CertifiedCompliant } from "@/components/sections/CertifiedCompliant";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { FullCustomization } from "@/components/sections/FullCustomization";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { WhatWeMakeRange } from "@/components/sections/WhatWeMakeRange";
import { WhyCapriosports } from "@/components/sections/WhyCapriosports";
import { JsonLd } from "@/components/JsonLd";
import { categoryGroupsSection } from "@/components/ui/styles";
import { capriosportsHome } from "@/content/capriosports/home";
import { ORGANIZATION, PARENT_SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema, faqSchema, productRangeItemListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  // LOCKED -- do not edit title/description without explicit owner sign-off.
  title: capriosportsHome.metaTitle,
  description: capriosportsHome.metaDescription,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${capriosportsHome.metaTitle} | ${PARENT_SITE_NAME}`,
    description: capriosportsHome.metaDescription,
    url: SITE_URL,
    siteName: PARENT_SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${capriosportsHome.metaTitle} | ${PARENT_SITE_NAME}`,
    description: capriosportsHome.metaDescription,
  },
};

const divisionGroup = {
  eyebrow: capriosportsHome.divisions.eyebrow,
  h2: capriosportsHome.divisions.h2,
  categories: capriosportsHome.divisions.categories,
};

export default function CapriosportsHomePage() {
  return (
    <>
      {/* Bare, unstyled placeholder nav -- Phase 1 scaffolding only, same
          pattern as the Gear division's own placeholder nav
          (app/lifting-gears/page.tsx). NOT the real division switcher/
          parent-site header -- that's Phase 3 work. */}
      <nav className="p-4 text-sm">
        <Link href="/capriowear">Capriowear</Link> | <Link href="/lifting-gears">Lifting Gears</Link> |{" "}
        <Link href="/boxing-and-mma">Boxing & MMA</Link> | <Link href="/contact">Contact</Link>
      </nav>

      <main className="relative z-10 bg-paper">
        {/* 1. HERO -- locked H1/title/meta; new eyebrow + attribute ticker. */}
        <div className="bg-ink">
          <Eyebrow tone="dark" className="container-p pt-8">
            {capriosportsHome.hero.eyebrow}
          </Eyebrow>
          <CategoryBanner breadcrumbItems={[{ label: "Home", href: "/" }]} h1={capriosportsHome.hero.h1} trustBullets={[]} />
          <div className="container-p flex flex-col gap-10 pb-10">
            <Button href={capriosportsHome.hero.cta.href}>{capriosportsHome.hero.cta.label}</Button>
            <Marquee
              items={capriosportsHome.hero.attributeTicker}
              labelVariant="bold"
              separator="sparkle"
              tone="dark"
              pauseOnHover={false}
            />
          </div>
        </div>

        {/* 2. FULLY CUSTOM OFFERING STRIP -- same Marquee mechanism as
            Capriowear's Hero.tsx ticker, gear-specific chips. */}
        <Marquee
          items={capriosportsHome.customOfferings.items}
          label={capriosportsHome.customOfferings.label}
          labelVariant="bold"
          separator="sparkle"
          pauseOnHover={false}
        />

        {/* 3. DIVISION BAND -- unchanged. */}
        <section className={categoryGroupsSection.section}>
          <CategoryLinkGrid group={divisionGroup} division="lifting-gears" />
        </section>

        {/* 4. TRUST STRIP */}
        <TrustSignals items={capriosportsHome.trustStrip} />

        {/* 5. ONE FACTORY -- sticky-text/video/photo-slider composition,
            replacing the earlier CapabilityCard placeholder-box layout. */}
        <CapriosportsFactory content={capriosportsHome.factory} />

        {/* 6. CERTIFIED & COMPLIANT -- merged logos + stats, one section. */}
        <CertifiedCompliant content={capriosportsHome.certified} stats={capriosportsHome.stats} />

        {/* 7. WHAT WE MAKE -- 2-box range cards, real ul/li highlights + CTA. */}
        <WhatWeMakeRange content={capriosportsHome.whatWeMake} />

        {/* 8. FULL CUSTOMIZATION -- 5-item icon grid, between What We Make
            and Why Capriosports. */}
        <FullCustomization content={capriosportsHome.fullCustomization} />

        {/* 9. WHY CAPRIOSPORTS -- numbered 01-05 list. */}
        <WhyCapriosports content={capriosportsHome.why} />

        {/* 10. FAQ -- unchanged. */}
        <Faq content={{ h2: capriosportsHome.faq.h2, items: capriosportsHome.faq.items }} />

        {/* 11. FINAL CTA -- unchanged. */}
        <FinalCta content={capriosportsHome.finalCta} compactMobileTop />
      </main>

      {/* Real Capriosports footer content -- see this file's own header
          comment for the bug this fixes. */}
      <Footer
        content={capriosportsHome.footer}
        social={ORGANIZATION.sameAs}
        brandMark={{
          desktop: <CapriosportsWordmark className="text-h5" />,
          mobile: <CapriosportsWordmark className="text-body-lg" />,
        }}
      />

      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }])} />
      <JsonLd data={faqSchema(capriosportsHome.faq.items)} />
      <JsonLd data={productRangeItemListSchema(SITE_URL, capriosportsHome.whatWeMake.boxes)} />
    </>
  );
}
