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
// `showMediaLabel={false}` (2026-09-09, mobile-only review: "factory
// shots, remove the label from the images") -- a new opt-in prop, the
// homepage's own mobile carousel is unaffected at its default. The dots
// pagination and tablet-swipes-not-chevron behaviour this page originally
// asked for as its own opt-in are now InsideFactory's own sitewide default
// (a separate, later same-day owner decision covering every gallery on the
// site, not just this page) -- no extra props needed for either any more.
// Section 5: OurFactoryProcess, Figma desktop node 857:2090 ("Content"),
// "What We Make" -- see components/sections/OurFactoryProcess.tsx for the
// section's own build notes, including the new ParallaxMedia primitive
// (components/ParallaxMedia.tsx) its images use.
// Section 6: OurFactoryDetails, Figma desktop node 857:2088 ("Content"),
// "The details you would check on a sample" -- see
// components/sections/OurFactoryDetails.tsx for the section's own build
// notes (the dark accordion + synced-image panel, and its animation).
// Section 7: OurFactoryIntro again, Figma desktop node 873:123 ("Content"),
// "Audited, not just promised" -- owner: "same style you already built
// above [section 3], just change the content." Reuses the same component
// with `placement="stacked"` rather than a second component, since it's
// the identical heading+paragraph+stat-row pattern, just following
// OurFactoryDetails directly instead of the Hero -- see OurFactoryIntro.tsx's
// own `placement` prop comment.
// Section 8: TrustPoints, Figma desktop node 883:156 ("Content"), "Audited
// for safety, environment and ethics" -- owner: "already built section just
// content been change." The PLP/PDP/Services page's own bordered-points-list
// component, reused via a new `sidePadding="ourFactory"` variant (138px
// sides, 160px top) -- same reuse story as Services' own `responsibleMake`
// section, one day earlier. Its own bottom gap was later zeroed (see
// Section 9's own comment below).
// Section 9 (this step): the homepage's own CertifiedCompliant section --
// owner, 2026-09-09: "already built use this without title, only logo,
// right under audited safety section, audited safety will not have any
// space from the bottom and logos will have 72px gap from top and 0 from
// bottom", pointing at Figma node 917:170 ("All Logos"). That node turned
// out to be the exact same 6 certification-body marks this component
// already renders (ISO 9001/45001/14001, BSCI, IMAC, WFSGI -- confirmed via
// get_design_context against home.certified.logos), not the homepage's
// brand-logo ClientLogos strip an earlier pass here had wrongly reused --
// corrected the same day once flagged ("you added clients, i asked to add
// certifications"). Same content, `home.certified` (no new copy), via two
// new opt-in props: `showHeading={false}` (that Figma node has no eyebrow/
// h2 above the row, unlike every other real usage) and
// `pageVariant="ourFactory"` (72px top / 0 bottom at every breakpoint,
// `certified.desktopSectionOurFactory`/`tabletSectionOurFactory`/
// `mobileSectionOurFactory`). `TrustPoints`' own `sidePaddingOurFactory`
// lost its `xl:pb-[104px]` (now `pb-0` at every breakpoint) so the two
// sections don't double up on the gap between them -- this section's own
// top padding is the only source of that space.
// Section 10 (this step): OurFactoryTeam, Figma desktop node 917:231
// ("Content"), "Skilled hands behind every stitch" -- owner, 2026-09-09:
// "0 gap from top icons to this section, this section will have 160px gap
// from the top." A new component (a genuinely different pattern from
// every other section on this page: centred heading/subline, a full-bleed
// hero photo, then a staggered-height horizontal scroller) built from
// shared primitives (`useDesktopChevronScroller`, `MediaPlaceholder`,
// `TextReveal`) rather than a wholly bespoke build -- see
// components/sections/OurFactoryTeam.tsx for the section's own build
// notes. `ourFactoryTeam.inner`'s own `pt-[160px]` is the sole source of
// the gap from section 9 above (already `pb-0`, see that section's own
// comment), matching this same "one section owns the gap" pattern used
// throughout this page.
// Section 11: FAQ, owner brief 2026-09-09 (6 Q&As supplied directly, no
// Figma frame). Reuses the sitewide `Faq` component verbatim, same
// `{h2, items: {q,a}[]}` content shape `home.faq`/`services.faq` already
// use -- `Faq` has no variant props at all, see its own header comment.
// `ourFactory.faq.items` also feeds `faqSchema()` below, same "content
// feeds structured data, never hand-typed twice" rule every other page's
// FAQ already follows.
// Section 12: a closing `FinalCta`, reusing `home.finalCta`/`home.
// complianceTicker` verbatim (no page-specific CTA copy was given) -- the
// same "reuse the homepage's own CTA as-is" precedent /services' own
// FIRST FinalCta usage already establishes. `compactMobileTop`/
// `hideTickerMobile`: the same pair, same reasoning, as /services' own
// FinalCta-after-Faq usage (see FinalCta.tsx's own `compactMobileTop`
// comment).
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { CertifiedCompliant } from "@/components/sections/CertifiedCompliant";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { InsideFactory } from "@/components/sections/InsideFactory";
import { OurFactoryDetails } from "@/components/sections/OurFactoryDetails";
import { OurFactoryHero } from "@/components/sections/OurFactoryHero";
import { OurFactoryIntro } from "@/components/sections/OurFactoryIntro";
import { OurFactoryProcess } from "@/components/sections/OurFactoryProcess";
import { OurFactoryTeam } from "@/components/sections/OurFactoryTeam";
import { FINAL_CTA_MARKER_ID, ProductCtasMobileBar } from "@/components/sections/ProductCtas";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { header } from "@/components/ui/styles";
import { home } from "@/content/home";
import { ourFactory } from "@/content/our-factory";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

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
        <InsideFactory
          content={home.insideFactory}
          tone="light"
          showHeading={false}
          showCta={false}
          showMediaLabel={false}
          showDesktopImages={false}
        />
        <OurFactoryProcess content={ourFactory.process} />
        <OurFactoryDetails content={ourFactory.sampleDetails} />
        <OurFactoryIntro content={ourFactory.compliance} placement="stacked" />
        <TrustPoints
          heading={ourFactory.certifications.heading}
          subline={ourFactory.certifications.subline}
          sublineBold={ourFactory.certifications.sublineBold}
          points={ourFactory.certifications.points}
          sidePadding="ourFactory"
        />
        <CertifiedCompliant content={home.certified} showHeading={false} pageVariant="ourFactory" />
        <OurFactoryTeam content={ourFactory.teamGallery} />
        <Faq content={ourFactory.faq} />
        {/* `compactMobileTop`/`hideTickerMobile`: same pair, same reasoning
            as /services' own FinalCta-after-Faq usage (see FinalCta.tsx's
            own `compactMobileTop` comment) -- Faq's `mobileSection` already
            supplies the standard 72px bottom gap, so the ticker block's own
            top padding would double it without `compactMobileTop`, and
            `hideTickerMobile` drops the mobile-only ticker list, keeping
            just the CTA there. Reuses `home.finalCta`/`home.complianceTicker`
            verbatim (no page-specific copy given for this section) -- the
            same "reuse the homepage's own CTA as-is" precedent /services'
            own FIRST FinalCta usage already establishes. */}
        {/* Invisible marker, watched by ProductCtasMobileBar's own
            IntersectionObserver -- see that component's own header comment.
            Placed immediately before this page's own closing FinalCta so
            the bar slides away as this section is approached. */}
        <div id={FINAL_CTA_MARKER_ID} aria-hidden="true" />
        <FinalCta
          content={home.finalCta}
          ticker={home.complianceTicker}
          secondaryCta={home.finalCta.secondaryCta}
          compactMobileTop
          hideTickerMobile
        />
        {/* ProductCtasMobileBar, the literal last child of `<main>` (owner,
            2026-09-10: "let's add the fixed request a sample cta... make it
            across home, services, and our factory pages") -- the exact
            same component PLP/PDP already use, reused verbatim.
            `hideInFirstFold` (same owner turn: "CTA should not appear in
            the first fold") is an opt-in prop PLP/PDP don't pass,
            unaffected. This page's own single FinalCta above already has
            nothing after it but Footer, so its existing
            `FINAL_CTA_MARKER_ID` marker (hide forever once reached) is
            correct as-is -- no `hideWithinIds` needed here. */}
        <ProductCtasMobileBar primaryCta={home.nav.cta} hideInFirstFold />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Our Factory", url: CANONICAL },
        ])}
      />
      <JsonLd data={faqSchema(ourFactory.faq.items)} />
    </>
  );
}
