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
// Section 3 (this step): ServicesHowWeWork, Figma desktop node 750:770 --
// see components/sections/ServicesHowWeWork.tsx for the section's own
// build notes.
// Section 4: the homepage's own OurServices section, reused as-is (owner,
// 2026-09-07: "we already have it on homepage, use as is") -- same cards,
// same copy (home.services), Figma node 729:363 on this page only changes
// the outer spacing (160px from the section above, 80px below), via
// `pageVariant="services"` -- see OurServices.tsx and the
// `ourServices.desktopSectionServices`/`mobileSectionServices` recipes in
// components/ui/styles.ts. Confirmed via get_metadata this section's real
// Figma y-position (3279) sits directly after ServicesHowWeWork's own
// (1949-3279) -- ServicesHowWeWork was built after OurServices had already
// been wired in as "section 3" here, so this comment block and the JSX
// order below were both corrected to the real Figma order, not left as an
// out-of-order page.
//
// Every later section listed in the owner's brief (certification logos,
// How It Works, FAQ, closing CTA) is not built yet -- added incrementally,
// one Figma link at a time.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { OurServices } from "@/components/sections/OurServices";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesHowWeWork } from "@/components/sections/ServicesHowWeWork";
import { ServicesIntro } from "@/components/sections/ServicesIntro";
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
        <ServicesHowWeWork content={services.howWeWork} />
        <OurServices content={home.services} pageVariant="services" />
      </main>

      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Services", url: CANONICAL }])} />
    </>
  );
}
