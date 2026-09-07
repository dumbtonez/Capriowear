// app/page.tsx
// The real homepage. Phase 2, built section by section from /content/home.ts.
// All 15 sections are now built: nav through Footer, plus Exhibitions -- a
// section not in the original wireframe numbering, placed directly after
// Inside the Factory (owner call, 2026-08-26). Footer is desktop + mobile
// but sitewide sticky-reveal behaviour and mobile-frame details live in its
// own file/recipe, not here -- see components/sections/Footer.tsx.
//
// Every real section renders inside one <main> landmark (SEO/AEO rule 3,
// CLAUDE.md) -- Header stays a sibling, not nested inside it. Exactly one
// <h1> exists on this page (Hero's).
//
// FAQ (section 13) renders faqSchema() fed by the exact same home.faq.items
// array the visible Accordion reads -- SEO/AEO rule 1, first real use of
// faqSchema() now that a page actually renders an FAQ.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { CertifiedCompliant } from "@/components/sections/CertifiedCompliant";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { Exhibitions } from "@/components/sections/Exhibitions";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { InsideFactory } from "@/components/sections/InsideFactory";
import { OurServices } from "@/components/sections/OurServices";
import { Stats } from "@/components/sections/Stats";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { WhatWeMake } from "@/components/sections/WhatWeMake";
import { header } from "@/components/ui/styles";
import { home } from "@/content/home";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, ORGANIZATION, SITE_URL } from "@/content/site";
import { breadcrumbSchema, faqSchema, megaMenuSchema, navigationSchema } from "@/lib/schema";

// Homepage's own Open Graph copy -- deliberately worded differently from
// the title tag/meta description above (brand-first, share-context phrasing
// rather than search-result phrasing), owner-supplied 2026-08-26.
const OG_TITLE = "Capriowear | Custom Activewear & Teamwear Manufacturer in Pakistan";
const OG_DESCRIPTION =
  "OEM, ODM and private label activewear and teamwear, factory-direct from Sialkot, Pakistan. Low MOQ from 50 pieces, custom from fabric to packaging, DDP worldwide.";

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: {
    // Explicit absolute string, not a relative path left to Next's own
    // resolution against metadataBase -- this app's internal route ("/")
    // isn't the real public path ("/capriowear"), see content/site.ts.
    canonical: SITE_URL,
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
  },
};

export default function Home() {
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

      {/* `relative z-10`: required so this stacking context paints above
          Footer's `sticky bottom-0` (z-0) -- a plain `position: sticky`
          element is always "positioned" and, with no explicit z-index of
          its own to beat, defaults into the same stacking tier as any
          other z-index:auto positioned box, painting ABOVE ordinary
          in-flow content regardless of DOM order. Confirmed in isolation
          (2026-08-26): without this, Footer's sticky box is genuinely
          pinned to the viewport's bottom edge for the ENTIRE scroll range
          (not just near the page's end, the mistaken assumption Footer was
          first built under) and, unbeaten in stacking, permanently covers
          whatever's underneath it.
          `bg-paper` is just as required as the z-index: winning the
          stacking order only re-orders PAINT layers, it doesn't make a
          transparent one opaque. `<main>` and most of its light sections
          (anything not `bg-ink`) have no background of their own -- they
          were relying on `<body>`'s own `bg-paper`, which sits UNDER both
          `<main>` (z-10) and Footer (z-0) in the paint stack, not between
          them. Without `<main>` supplying its own solid colour, Footer's
          content showed straight through every transparent light section
          the whole time it was scrolled past (found via the owner's own
          screen recording, 2026-08-26 -- ghosted footer nav/address text
          visible over Trust Signals and Certified & Compliant, both light
          sections). Dark sections were never affected: `bg-ink` already
          gave them their own opaque covering.

          `shadow-[...]`: a soft shadow cast DOWN from main's own bottom
          edge, not in Figma -- added 2026-08-27 (owner call) after real
          scrolling showed the actual problem with a same-colour reveal:
          Footer and main are both `bg-paper`, so the covering edge that
          sweeps up during the reveal was itself invisible, and whatever
          Footer content sits right at its own top (the logo, its own
          confirmed top padding) appeared to pop in already clipped for the
          few frames while main's edge was still crossing it. A shadow
          tried on Footer's own root first didn't work, for the same reason
          the content itself didn't show: Footer is the covered (z-0)
          layer, so a shadow painted as part of ITS box is exactly as
          hidden by main's opaque covering as the logo was, until the same
          instant everything else becomes visible. The fix has to live on
          main instead, since main is the layer actually doing the
          covering -- its shadow moves with its own bottom edge as it
          scrolls, so it's visible at whatever point the reveal currently
          sits, giving the transition a deliberate "the page above is
          lifting away" depth cue regardless of scroll position, instead of
          relying on a colour boundary that was never actually visible. */}
      <main className="relative z-10 bg-paper shadow-[0_16px_24px_-12px_rgba(14,14,18,0.18)]">
        <Hero hero={home.hero} customOfferings={home.customOfferings} />
        <ClientLogos brandLogos={home.brandLogos} />
        <TrustSignals items={home.trustStrip} />
        <WhatWeMake content={home.whatWeMake} />
        <CertifiedCompliant content={home.certified} />
        <Stats items={home.stats} />
        <InsideFactory content={home.insideFactory} />
        <Exhibitions content={home.exhibitions} />
        <FinalCta content={home.finalCta} ticker={home.complianceTicker} />
        <OurServices content={home.services} />
        <HowItWorks content={home.howItWorks} />
        <Faq content={home.faq} />
        <FinalCta content={home.closingCta} secondaryCta={home.closingCta.secondaryCta} />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }])} />
      <JsonLd data={faqSchema(home.faq.items)} />
      <JsonLd data={navigationSchema(home.nav.links)} />
      {home.nav.links.map((link) =>
        link.megaMenu ? (
          <JsonLd key={link.href} data={megaMenuSchema(link.label, link.href, link.megaMenu)} />
        ) : null,
      )}
    </>
  );
}
