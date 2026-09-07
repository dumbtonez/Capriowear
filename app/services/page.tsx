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
// Section 7: the homepage's own HowItWorks section, reused with its new
// `tone="dark"` variant (owner, 2026-09-07: "this is the same setion we
// have on homepage, I just changed the background to black and subline
// text color to 838D97... put this section under product range section" --
// Figma node 767:868) -- same component, same copy (home.howItWorks), only
// the colour path differs. See HowItWorks.tsx's own header comment and its
// `tone` prop for the full reasoning (why the eyebrow keeps the standing
// dark-eyebrow colour rather than Figma's literal one-off hex, and why
// this reuses the homepage's own spacing rather than a new variant).
// Section 8: the homepage's own FinalCta section, reused as-is (owner,
// 2026-09-07: "Add this cta setion, already built, use as is, put it
// under how it works section" -- Figma node 770:895) -- same component,
// same content (home.finalCta + home.complianceTicker) as the homepage's
// own first FinalCta usage (heading "Let's build your custom collection",
// button "Request a Sample", the same 8-item compliance ticker). Figma's
// own subline on this node ("Share your tech pack, sketch or a reference
// legging...") is `pdpShared.ts`'s `buildCtaSubline` wording -- a leggings
// PDP-specific string, clearly a copy-paste leftover on this frame (a
// generic Services page has no reason to reference leggings specifically)
// -- so this uses `home.finalCta`'s own real subline instead, the same
// "trust a clean reference over a locally miscopied one" call already
// made elsewhere on this site (see ProductCustomizeSteps' own entry in
// docs/03-component-library.md for the precedent).
// Section 9: the homepage's own CertifiedCompliant section, reused as-is
// (owner, 2026-09-07: "Add this section under how it works, same as we
// use on homepage" -- Figma node 729:276, "Certifications") -- same
// component, same content (home.certified: eyebrow, heading and all 6
// logos match verbatim), no spacing variant needed since this frame's own
// 120px top / 120px bottom already match `certified.desktopSection`'s
// existing values exactly. Placed after FinalCta, not directly after
// HowItWorks: get_metadata confirms the real Figma stacking is HowItWorks
// (6911-7785) -> FinalCta (7785-8265) -> Certifications (8265-8887), i.e.
// this section is genuinely the last of the three, "under How It Works"
// in the sense of "further down the page," not literally the very next
// sibling -- the same "trust get_metadata's real y-order over a literal
// reading of the request" call made throughout this file already.
//
// Confirmed via get_metadata on every section's own real Figma y-position
// (Intro 833-1413, Trust Signals 1413-1949, How We Work 1949-3279, Our
// Services 3279+) that this is the real page order -- both Trust Signals
// and How We Work were built after Our Services had already been wired in
// as an earlier "section", so this comment block and the JSX order below
// have been corrected more than once to match Figma, not left as
// whichever order sections happened to be built in.
//
// Section 10: Responsible Make, Figma desktop node 811:1156 (owner,
// 2026-09-07: "Built under the certified section, its a same component
// that we used on PLP and PDP, just changed the content. spacing from top
// and bottom is 104px") -- reuses the PLP/PDP's own `TrustPoints`
// component verbatim, its own new `sidePadding="services"` variant (see
// that component's own prop comment). get_metadata confirms this frame
// starts at y=8887, exactly where Certifications (8265-8887) ends -- a
// genuine next sibling, not just "further down the page" the way
// Certifications was to HowItWorks. Content is `services.responsibleMake`
// (4 rows: recycled polyester, OEKO-TEX, BSCI/IMAC, sustainability
// sourcing), confirmed against the design's own real text layer via
// get_screenshot.
// Section 11: FAQ, reusing the homepage's own `Faq` component and styling
// verbatim (owner, 2026-09-07: "same pattern as the homepage 'Top
// questions from B2B buyers' FAQ ... do NOT fork or restyle it") -- `Faq`
// was already content-agnostic (see its own header comment), so this is
// just `services.faq`, this page's own 14-question set, fed through the
// same accordion. Placed after Responsible Make, matching the owner's own
// brief order (last section) since no other placement was specified.
// `services.faq.items` also feeds `faqSchema()` below (same "content feeds
// both the visible accordion and the schema" pattern `home.faq`/
// `app/page.tsx` already use) so the two can never drift apart.
// Section 12: a second, closing `FinalCta` (owner, 2026-09-07: "reuse the
// homepage final CTA + compliance bar component"), distinct from Section
// 8's own earlier usage under How It Works -- same component, this page's
// own content (`services.finalCta`, `services.complianceBar`), not
// `home.finalCta`/`home.complianceTicker`. Adds a real primary+secondary
// button pair (`FinalCta`'s new `secondaryCta` prop, added the same day)
// and a shorter, owner-specified 5-item compliance bar (`home.
// complianceTicker`'s full list has 8) -- the same "two FinalCta usages on
// one page" pattern the homepage itself already established (`home.
// finalCta` then `home.closingCta`).
// Footer (final, owner: "add the footer"): reuses the sitewide `Footer`
// verbatim, `home.footer`/`ORGANIZATION.sameAs` -- same content/component
// every other page renders, no Services-specific footer copy exists.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { CertifiedCompliant } from "@/components/sections/CertifiedCompliant";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { OurServices } from "@/components/sections/OurServices";
import { ProductRange } from "@/components/sections/ProductRange";
import { ServicesHero } from "@/components/sections/ServicesHero";
import { ServicesHowWeWork } from "@/components/sections/ServicesHowWeWork";
import { ServicesIntro } from "@/components/sections/ServicesIntro";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { header } from "@/components/ui/styles";
import { home } from "@/content/home";
import { services } from "@/content/services";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

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
        contact={home.nav.contact}
        social={ORGANIZATION.sameAs}
        cta={home.nav.cta}
        secondaryCta={home.nav.secondaryCta}
      />

      {/* relative z-10 bg-paper: same requirement Footer's own sticky
          "reveal" trick imposes on every other page's `<main>` (see
          Footer.tsx's header comment). Footer itself (below) reuses
          `home.footer`/`ORGANIZATION.sameAs` verbatim, same as every other
          page -- no Services-specific footer content exists. */}
      <main className="relative z-10 bg-paper">
        <ServicesHero hero={services.hero} customOfferings={home.customOfferings} />
        <ServicesIntro content={services.intro} />
        <TrustSignals items={home.trustStrip} pageVariant="services" />
        <ServicesHowWeWork content={services.howWeWork} />
        <OurServices content={home.services} pageVariant="services" />
        <ProductRange content={services.productRange} />
        <HowItWorks content={home.howItWorks} tone="dark" />
        <FinalCta content={home.finalCta} ticker={home.complianceTicker} />
        <CertifiedCompliant content={home.certified} />
        <TrustPoints
          heading={services.responsibleMake.heading}
          subline={services.responsibleMake.subline}
          points={services.responsibleMake.points}
          sidePadding="services"
        />
        <Faq content={services.faq} />
        <FinalCta content={services.finalCta} ticker={services.complianceBar} secondaryCta={services.finalCta.secondaryCta} />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }, { name: "Services", url: CANONICAL }])} />
      <JsonLd data={faqSchema(services.faq.items)} />
    </>
  );
}
