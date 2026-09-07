// app/services/page.tsx
// The real /services page, built section by section from Figma (owner
// brief, 2026-09-07), same pattern as app/page.tsx: content lives in
// content/services.ts, this file composes sections in Figma order so more
// can be added without disturbing what's already here.
//
// Section 1: ServicesHero, Figma desktop node 729:139 -- see
// components/sections/ServicesHero.tsx for the section's own build notes.
// Section 2: ServicesIntro, Figma desktop node 733:529 -- see
// components/sections/ServicesIntro.tsx for the section's own build notes.
// Section 3 (this step): the homepage's own TrustSignals section, reused
// as-is (owner, 2026-09-07: "this is already built on homepage, use same
// as is. only the spacing needs to adjust, from the top its 160px bottom
// 80px") -- same 4-item strip (Product Development / Low MOQ / Private
// Label / Worldwide Shipping), same copy (home.trustStrip), Figma node
// 729:208 ("Trust Signals" -- confirmed via get_metadata, the node the
// owner's link actually points at, not the visually-similar-sounding "Our
// Services" section below) only changes the outer desktop spacing, via
// `pageVariant="services"` -- see TrustSignals.tsx and the
// `trustSignals.desktopWrapServices` recipe in components/ui/styles.ts.
// Section 4: ServicesHowWeWork, Figma desktop node 750:770 -- see
// components/sections/ServicesHowWeWork.tsx for the section's own build
// notes.
// Section 5: the homepage's own OurServices section, reused as-is (owner,
// 2026-09-07: "we already have it on homepage, use as is") -- same cards,
// same copy (home.services), Figma node 729:363 on this page only changes
// the outer spacing (160px from the section above, 140px below -- corrected
// the same day from an initial, wrong 80px that had been copied from Trust
// Signals' own node by mistake, see `ourServices.desktopSectionServices`'s
// own comment), via `pageVariant="services"` -- see OurServices.tsx.
// Section 6: ProductRange, Figma desktop node 758:823 -- see
// components/sections/ProductRange.tsx for the section's own build notes.
//
// Confirmed via get_metadata on every section's own real Figma y-position
// (Intro 833-1413, Trust Signals 1413-1949, How We Work 1949-3279, Our
// Services 3279+) that this is the real page order -- both Trust Signals
// and How We Work were built after Our Services had already been wired in
// as an earlier "section", so this comment block and the JSX order below
// have been corrected more than once to match Figma, not left as
// whichever order sections happened to be built in.
//
// Every later section listed in the owner's brief (certification logos,
// How It Works, FAQ, closing CTA) is not built yet -- added incrementally,
// one Figma link at a time.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { OurServices } from "@/components/sections/OurServices";
import { ProductRange } from "@/components/sections/ProductRange";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesHowWeWork } from "@/components/sections/ServicesHowWeWork";
import { ServicesIntro } from "@/components/sections/ServicesIntro";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { header } from "@/components/ui/styles";
import { home } from "@/content/home";
import { services } from "@/content/services";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

const CANONICAL = `${SITE_URL}/services`;

export const metadata: Metadata = {
  title: services.metaTitle,
  description: services.metaDescription,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: `${services.metaTitle} | ${SITE_NAME}`,
    description: services.metaDescription,
    url: CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${services.metaTitle} | ${SITE_NAME}`,
    description: services.metaDescription,
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header
        brand={home.nav.brand}
        logo={<Logo stacked className={header.brandLogo} />}
        desktopLogo={<Logo stacked className={header.brandLogoDesktop} />}
        links={home.nav.links}
        mobileLinks={home.nav.mobileLinks}
        megaMenuPromo={home.nav.megaMenuPromo}
        contact={home.nav.contact}
        social={ORGANIZATION.sameAs}
        cta={home.nav.cta}
        secondaryCta={home.nav.secondaryCta}
      />

      {/* relative z-10 bg-paper: same requirement Footer's own sticky
          "reveal" trick imposes on every other page's `<main>` (see
          Footer.tsx's header comment) -- added ahead of Footer actually
          being composed onto this page, so that step needs no `<main>`
          change when it happens. */}
      <main className="relative z-10 bg-paper">
        <ServicesHero hero={services.hero} customOfferings={home.customOfferings} />
        <ServicesIntro content={services.intro} />
        <TrustSignals items={home.trustStrip} pageVariant="services" />
        <ServicesHowWeWork content={services.howWeWork} />
        <OurServices content={home.services} pageVariant="services" />
        <ProductRange content={services.productRange} />
      </main>

      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Services", url: CANONICAL }])} />
    </>
  );
}
