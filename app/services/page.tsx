// app/services/page.tsx
// The real /services page, built section by section from Figma (owner
// brief, 2026-09-07), same pattern as app/page.tsx: content lives in
// content/services.ts, this file composes sections in Figma order so more
// can be added without disturbing what's already here.
//
// Section 1 (this step): ServicesHero, Figma desktop node 729:139 -- see
// components/sections/ServicesHero.tsx for the section's own build notes.
// Every later section listed in the owner's brief (Fully Custom Offerings
// chip strip is already this section's own ticker; the 4-up services strip,
// the "raw fabric to retail-ready packaging" section, certification logos,
// How It Works, FAQ, closing CTA) is not built yet -- added incrementally,
// one Figma link at a time.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { ServicesHero } from "@/components/sections/ServicesHero";
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
      </main>

      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Services", url: CANONICAL }])} />
    </>
  );
}
