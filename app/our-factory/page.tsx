// app/our-factory/page.tsx
// The real /our-factory page, built section by section from Figma (owner
// brief, 2026-09-08), same pattern as app/services/page.tsx: content lives
// in content/our-factory.ts, this file composes sections in Figma order so
// more can be added without disturbing what's already here. This route
// didn't exist before this page -- nav, footer, Services, and various CTAs
// already link to /our-factory, so this resolves those dead links.
//
// Section 1 (this step): OurFactoryHero, Figma desktop node 854:1421
// ("Banner") -- see components/sections/OurFactoryHero.tsx for the
// section's own build notes.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/sections/Footer";
import { OurFactoryHero } from "@/components/sections/OurFactoryHero";
import { header } from "@/components/ui/styles";
import { home } from "@/content/home";
import { ourFactory } from "@/content/our-factory";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

const CANONICAL = `${SITE_URL}/our-factory`;

export const metadata: Metadata = {
  title: ourFactory.metaTitle,
  description: ourFactory.metaDescription,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: ourFactory.metaTitle,
    description: ourFactory.metaDescription,
    url: CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: ourFactory.metaTitle,
    description: ourFactory.metaDescription,
  },
};

export default function OurFactoryPage() {
  return (
    <>
      <Header
        brand={home.nav.brand}
        logo={<Logo stacked className={header.brandLogo} />}
        desktopLogo={<Logo stacked className={header.brandLogoDesktop} />}
        links={home.nav.links}
        mobileLinks={home.nav.mobileLinks}
        contact={home.nav.contact}
        social={ORGANIZATION.sameAs}
        cta={home.nav.cta}
        secondaryCta={home.nav.secondaryCta}
      />

      {/* relative z-10 bg-paper: same requirement Footer's own sticky
          "reveal" trick imposes on every other page's <main> (see
          Footer.tsx's header comment). */}
      <main className="relative z-10 bg-paper">
        <OurFactoryHero hero={ourFactory.hero} />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Our Factory", url: CANONICAL },
        ])}
      />
    </>
  );
}
