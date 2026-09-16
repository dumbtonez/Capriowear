// app/page.tsx
// The real Capriosports parent-site homepage -- 2026-09-15 full content +
// structure rebuild, revised same day after visual review. Every section
// below reuses a real, already-shipping Capriowear component wherever an
// exact match exists; only `CapriosportsFactory` and `WhyCapriosports`
// stay as small new compositions where nothing sitewide actually combines
// the needed shape (see docs/03-component-library.md for the full
// section-by-section reuse map, including what changed in this visual-
// review pass: real `Header` swapped in for the Phase 1 placeholder
// <nav>, `WhatWeMakeRange`/`FullCustomization` deleted in favour of
// Capriowear's own real `WhatWeMake`/`OurServices` sections, `Stats`
// reused as its own section again instead of a custom stat-card row).
//
// Hero (2026-09-15, real Figma hero confirmed via screenshot -- see
// content/capriosports/home.ts's own `hero` field comment): reuses
// Capriowear's own real `Hero.tsx` directly now, `showTicker={false}`
// since this page already renders its own equivalent "Fully Custom
// Offerings" ticker as a separate section (2 below) rather than Hero's
// own bundled Layer 3. Replaces the earlier CategoryBanner-composition
// fallback, which was a stand-in built before the real hero design (with
// its 2-CTA/video-block shape) had been confirmed.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { CapriosportsFactory } from "@/components/sections/CapriosportsFactory";
import { CertifiedCompliant } from "@/components/sections/CertifiedCompliant";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { DivisionCards } from "@/components/sections/DivisionCards";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { OurServices } from "@/components/sections/OurServices";
import { OurStory } from "@/components/sections/OurStory";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { WhatWeMake } from "@/components/sections/WhatWeMake";
import { WhyCapriosports } from "@/components/sections/WhyCapriosports";
import { JsonLd } from "@/components/JsonLd";
import { footer, header } from "@/components/ui/styles";
import { capriosportsHome } from "@/content/capriosports/home";
import { home } from "@/content/home";
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

export default function CapriosportsHomePage() {
  return (
    <>
      {/* Real sitewide Header. Real Capriosports mark now wired in (Figma
          nodes 973:695 desktop / 977:1163 mobile, `<Logo caprioOnly />`) --
          replaces the earlier plain-text brand fallback. No `megaMenu` on
          any link -- the persistent division switcher stays correctly
          deferred to Phase 3. */}
      <Header
        brand={capriosportsHome.nav.brand}
        brandHref="/"
        logo={<Logo caprioOnly className={header.brandLogoCapriosports} />}
        desktopLogo={<Logo caprioOnly className={header.brandLogoDesktopCapriosports} />}
        links={capriosportsHome.nav.links}
        mobileLinks={capriosportsHome.nav.mobileLinks}
        contact={capriosportsHome.nav.contact}
        social={ORGANIZATION.sameAs}
        cta={capriosportsHome.nav.cta}
      />

      <main className="relative z-10 bg-paper">
        {/* 1. HERO -- locked H1/title/meta; real Hero.tsx reuse. Desktop's
            own Layer 3 ticker stays off (this page's desktop offerings
            strip lives separately, under the division cards, section 2/3
            below); mobile's Layer 3 ticker stays ON (owner, 2026-09-15:
            "fully custom offering put it under video... same like we did
            on mobile wear") -- same real mechanism as Capriowear's own
            Hero, not a second copy of it. */}
        <Hero
          hero={capriosportsHome.hero}
          customOfferings={capriosportsHome.customOfferings}
          showTickerDesktop={false}
          showTickerMobile
        />

        {/* 2/3. DIVISION CARDS + FULLY CUSTOM OFFERING STRIP -- one
            continuous dark surface (real design, confirmed via screenshot,
            Figma node 981:1208): 3 full-bleed division cards, then the
            offerings strip right below with no section break. `md:block`
            (tablet gets the same Marquee treatment as Capriowear's own
            homepage, not the mobile list -- owner, 2026-09-15: "fully
            custom should follow the same as wear on tablet", reverting an
            earlier same-day pass that had extended Hero's own mobile list
            ticker through tablet instead; `tickerMobileUntilTablet` stays
            on `Hero` as a real, working prop, just unused by this page
            now). */}
        <div className="bg-ink text-paper">
          {/* `stack` variant on trial (owner, 2026-09-16: "I want to try
              this new style for division cards on the hero banner") --
              `flat` (the previous live variant) is untouched in
              DivisionCards.tsx/styles.ts, just not the active choice here
              right now; swap this literal back to revert. */}
          <DivisionCards categories={capriosportsHome.divisions.categories} variant="stack" />
          {/* xl:pt-4 (16px) tops up Marquee's own built-in 40px (`padded`
              default true, `marquee.basePaddingDefault`, shared sitewide --
              not overridden at its source) to a real 80px from the division
              cards row at desktop specifically (owner, 2026-09-15: "make
              fully custom offerings desktop space from top 80px") -- only
              applies from `xl:` up, so tablet's own spacing still matches
              Capriowear's unmodified Marquee exactly. */}
          <div className="hidden md:block xl:pt-4">
            <Marquee
              items={capriosportsHome.customOfferings.items}
              label={capriosportsHome.customOfferings.label}
              labelVariant="bold"
              separator="sparkle"
              tone="dark"
              pauseOnHover={false}
            />
          </div>
        </div>

        {/* Trusted clients -- same real component/content as Capriowear's
            own homepage (owner: "add trusted clients marquee as we have
            on wear"). Reuses `home.brandLogos` directly (same real logo
            registry, same "Trusted by top brands worldwide" title) rather
            than a second copy -- one company, one real client list. */}
        <ClientLogos brandLogos={home.brandLogos} />

        {/* 4. TRUST STRIP */}
        <TrustSignals items={capriosportsHome.trustStrip} />

        {/* 4b. PRODUCT RANGE -- Capriowear's OWN real WhatWeMake component
            (Card category tiles), not a bespoke ul/li box. Moved here,
            directly under Trust Strip (owner, 2026-09-15: "under trust
            strip add categories section same like wear activewear and
            teamwear section") -- was further down, between Stats and Full
            Customization; see content/capriosports/home.ts's own
            `whatWeMake` comment for the 7-tiles-per-category content and
            the `ctaText` override ("See the Full Range", not the
            component's own default "View All {title}" wording).
            `mobileGridVariant` added 2026-09-16 (owner: "product category
            will follow the same 2 items in one row as applied in wear")
            -- matches `app/capriowear/page.tsx`'s own call exactly
            (2-column mobile tile grid, `whatWeMake.mobileListGrid`,
            instead of the single-column `mobileList` default). */}
        <WhatWeMake
          content={capriosportsHome.whatWeMake}
          ctaText="See the Full Range"
          hideCtaIcon
          mobileGridVariant
        />

        {/* 4c. CERTIFIED & COMPLIANT -- moved here, directly under Product
            Range (owner, 2026-09-15: "under categories section add
            certified section as is from wear") -- was further down
            (section 6), and used Capriosports' own gear-adapted content
            (`capriosportsHome.certified`, WFSGI filtered out, its own
            membership-note wording). Now reads Capriowear's own
            `home.certified` verbatim instead -- full logo set (WFSGI
            included), Capriowear's own eyebrow/h2, no membership note --
            "as is from wear", not the adapted version. */}
        <CertifiedCompliant content={home.certified} />

        {/* OUR STORY -- 10-milestone company timeline, sticky-year scroll
            mechanic. Originally placed after Our Services (owner,
            2026-09-16: "add it after services section" -- the brief's own
            stated order, "Trust strip -> Our Story -> Trusted by," doesn't
            match this page's actual live order, Trusted By/`ClientLogos`
            already rendering before Trust Strip/`TrustSignals` above, so
            that placement was the owner's own call instead of reordering
            that unrelated existing pair). Moved again, same day, above
            Our Services instead (owner: "put the story section above
            services"). Same dark surface as Our Services directly below
            it, so the three sections (Our Story, Our Services, One
            Factory) still read as one continuous dark run -- Stats
            (previously between Our Services and One Factory, light
            content on the same dark surface) was removed entirely (owner,
            2026-09-16: "remove the stats section"). */}
        <OurStory content={capriosportsHome.ourStory} />

        {/* FULL CUSTOMIZATION -- Capriowear's OWN real OurServices section
            ("From raw fabric to retail-ready packaging"), gear-adapted
            copy, dark `tone` (owner, 2026-09-15: "under the certified
            section add services section in black same as built on wear
            home") -- same placement/variant Capriowear's own homepage
            uses directly after its own Certified & Compliant. Moved here
            from further down the page (was section 8, light tone) rather
            than duplicated: same content, one instance. */}
        <OurServices content={capriosportsHome.services} tone="dark" />

        {/* 5. ONE FACTORY -- text/video/CapabilityCard-supporting-blocks/
            photo-slider composition. */}
        <CapriosportsFactory content={capriosportsHome.factory} />

        {/* 9. WHY CAPRIOSPORTS -- numbered 01-05 list. */}
        <WhyCapriosports content={capriosportsHome.why} />

        {/* 10. FAQ -- unchanged. */}
        <Faq content={{ h2: capriosportsHome.faq.h2, items: capriosportsHome.faq.items }} />

        {/* 11. FINAL CTA -- unchanged. */}
        <FinalCta content={capriosportsHome.finalCta} compactMobileTop />
      </main>

      {/* Real Capriosports footer content. */}
      <Footer
        content={capriosportsHome.footer}
        social={ORGANIZATION.sameAs}
        brandMark={{
          desktop: <Logo caprioOnly className={footer.capriosportsDesktopBrandLogo} />,
          mobile: <Logo caprioOnly className={footer.capriosportsMobileBrandLogo} />,
        }}
      />

      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }])} />
      <JsonLd data={faqSchema(capriosportsHome.faq.items)} />
      <JsonLd data={productRangeItemListSchema(SITE_URL, capriosportsHome.whatWeMake.categories)} />
    </>
  );
}
