// app/our-factory/page.tsx
// The real /our-factory page, built section by section from Figma (owner
// brief, 2026-09-08), same pattern as app/services/page.tsx: content lives
// in content/our-factory.ts, this file composes sections in Figma order so
// more can be added without disturbing what's already here. This route
// didn't exist before this page -- nav, footer, Services, and various CTAs
// already link to /our-factory, so this resolves those dead links.
//
// Section 1: OurFactoryHero, Figma desktop node 854:1421 ("Banner") + node
// 854:1402 ("Youtube Video") -- see components/sections/OurFactoryHero.tsx
// for the section's own build notes.
// Section 3: OurFactoryIntro, Figma desktop node 857:1906 ("Content") --
// see components/sections/OurFactoryIntro.tsx for the section's own build
// notes. (Section 2 is the video layer, already inside OurFactoryHero
// above -- no standalone "section 2" component exists.)
// Section 4: the homepage's own InsideFactory section, reused with its new
// `tone="light"`/`showHeading={false}` variant (owner, 2026-09-08: "add the
// inside the factory section we use on homepage, it will be on white
// background, not eyebrow and title") -- same component, same content
// (home.insideFactory's 5 factory shots), only the surface and heading
// visibility differ. `showCta={false}` (this step, same day: "remove the
// factory cta for this page, not from the homepage component") -- this
// page IS the factory-tour destination that CTA links to, so it has no
// reason to link to itself here; the homepage's own usage is untouched.
// See InsideFactory.tsx's own prop comments for the full reasoning.
// Section 5 (this step): OurFactoryProcess, Figma desktop node 857:2090
// ("Content"), "What We Make" -- see components/sections/
// OurFactoryProcess.tsx for the section's own build notes, including the
// new ParallaxMedia primitive (components/ParallaxMedia.tsx) its images use.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/sections/Footer";
import { InsideFactory } from "@/components/sections/InsideFactory";
import { OurFactoryHero } from "@/components/sections/OurFactoryHero";
import { OurFactoryIntro } from "@/components/sections/OurFactoryIntro";
import { OurFactoryProcess } from "@/components/sections/OurFactoryProcess";
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
        <OurFactoryIntro content={ourFactory.intro} />
        <InsideFactory content={home.insideFactory} tone="light" showHeading={false} showCta={false} />
        <OurFactoryProcess content={ourFactory.process} />
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
