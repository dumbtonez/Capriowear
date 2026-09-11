// app/teamwear/page.tsx
// The Teamwear Landing Hub -- a light browse/directory page one level above
// the 10 real sport PLPs (content/teamwear/sports.ts), not another PLP
// itself. Built from Mohsin's own spec doc, 2026-09-11, then revised the
// same day per desktop review feedback (see inline notes below and the
// decision log). Every sport card links only to a live, already-indexed
// PLP -- every PDP under every sport is still DRAFT, so nothing here links
// to one, and this page owns no products/routes of its own.
//
// Nav dependency, already resolved: `content/home.ts`'s `home.nav.links`/
// `mobileLinks` already carry `{ label: "Teamwear & Uniforms", href:
// "/teamwear", megaMenu: teamwearMegaMenu }` -- the label itself was already
// a real link before this page existed, it just 404'd. No nav change needed
// here; this route landing is what fixes the 404.
//
// Section order: CategoryBanner (breadcrumb, H1, fact strip -- the exact
// same shared component every sport PLP's own hero already uses, at the
// exact same height/spacing, unmodified -- owner feedback: "remove this
// [subline+CTA] from banner, use the same banner style height spacing that
// we have for plp"), two `CategoryLinkGrid`s (UNIFORMS/OTHERS, matching
// `teamwearMegaMenu`'s own grouping -- the same shared component the
// Activewear hub renders its own 5 groups through), an Overview section
// built from `SectionHeading` + `CapabilityCard` (owner feedback: "use
// existing design component for this section"), TrustPoints (reused,
// `sidePadding="hub"`), Faq (reused verbatim, heading forced to 2 lines to
// match the design system's own FAQ heading convention), FinalCta (reused,
// no cross-links -- owner feedback: "remove activewear, services, etc
// links from the cta"), Footer.
//
// Schema: BreadcrumbList (Home > Teamwear), CollectionPage/ItemList of the
// 10 sport PLPs (never Product-level, since every PDP underneath is still
// draft -- per the doc's own explicit instruction), FAQPage from the same 8
// visible FAQ items the Faq accordion renders. Organization/WebSite are
// already sitewide via the root layout, not duplicated here.
import type { Metadata } from "next";
import { Fragment } from "react";

import { CapabilityCard } from "@/components/Card";
import { CategoryBanner } from "@/components/sections/CategoryBanner";
import { CategoryLinkGrid } from "@/components/sections/CategoryLinkGrid";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { categoryGroupsSection, header, teamwearOverview } from "@/components/ui/styles";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { sportGroups, teamwearHub, TEAMWEAR_HUB_CANONICAL } from "@/content/teamwear/hub";
import { breadcrumbSchema, collectionOfPagesSchema, faqSchema } from "@/lib/schema";

// Every sport card from every group, flattened -- used to build the
// CollectionPage/ItemList schema below (one WebPage entity per card, same
// source the visible groups render, so the schema can never drift from
// what the page actually shows).
const allSportCards = sportGroups.flatMap((group) => group.categories);

export const metadata: Metadata = {
  title: teamwearHub.metaTitle,
  description: teamwearHub.metaDescription,
  alternates: {
    canonical: TEAMWEAR_HUB_CANONICAL,
  },
  openGraph: {
    title: `${teamwearHub.metaTitle} | ${SITE_NAME}`,
    description: teamwearHub.metaDescription,
    url: TEAMWEAR_HUB_CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${teamwearHub.metaTitle} | ${SITE_NAME}`,
    description: teamwearHub.metaDescription,
  },
};

export default function TeamwearHubPage() {
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

      <main className="relative z-10 bg-paper">
        <CategoryBanner
          breadcrumbItems={teamwearHub.hero.breadcrumbItems}
          h1={teamwearHub.hero.h1}
          trustBullets={teamwearHub.hero.trustBullets}
        />

        <section className={categoryGroupsSection.section}>
          {sportGroups.map((group) => (
            <CategoryLinkGrid key={group.eyebrow} group={group} division="teamwear" />
          ))}
        </section>

        <section className={teamwearOverview.section}>
          <div className={teamwearOverview.textGroup}>
            <SectionHeading
              eyebrow={<TextReveal text={teamwearHub.overview.eyebrow} />}
              heading={<TextReveal as="span" text={teamwearHub.overview.h2} />}
              eyebrowTone="light"
              eyebrowSize={teamwearOverview.eyebrowSize}
              gap={teamwearOverview.headingGap}
            />
            <p className={teamwearOverview.lead}>
              {teamwearHub.overview.lead.map((segment, index) =>
                typeof segment === "string" ? (
                  <Fragment key={index}>{segment}</Fragment>
                ) : (
                  <span key={index} className={teamwearOverview.leadBold}>
                    {segment.bold}
                  </span>
                ),
              )}
            </p>
          </div>
          <div className={teamwearOverview.grid}>
            {teamwearHub.overview.differentiators.map((item) => (
              <CapabilityCard
                key={item.title}
                title={item.title}
                body={item.body}
                mediaRadius="none"
                // Same image ratio Our Services' own CapabilityCard grid
                // uses (owner mobile-review correction, 2026-09-11: "this
                // section image height should match our other images
                // height similar to these sections") -- was the
                // component's own default `aspect-video` (16:9).
                mediaAspectClassName="aspect-[7/5] xl:aspect-[8/5]"
                rootClassName={teamwearOverview.cardRoot}
                bodyClassName={teamwearOverview.cardBody}
                titleClassName={teamwearOverview.cardTitle}
              />
            ))}
          </div>
        </section>

        <TrustPoints
          heading={teamwearHub.trust.heading}
          subline={teamwearHub.trust.subline}
          points={teamwearHub.trust.points}
          // "hub" (80px side padding, matching the Overview section above
          // it -- owner, 2026-09-11: "should also have the same space from
          // the left as the above section") with its own 96px desktop top
          // gap (owner, same day: "make it 96px on both pages").
          sidePadding="hub"
        />

        <Faq content={{ h2: teamwearHub.faq.h2, items: teamwearHub.faq.items }} />

        <FinalCta
          content={teamwearHub.finalCta}
          ticker={{ title: "Standard on every order", items: teamwearHub.finalCta.complianceBar }}
          // Faq's own mobile section already supplies a 72px bottom gap
          // (Faq.tsx: "this frame's own top/bottom padding really is
          // 72/72"); without compactMobileTop the ticker's own default
          // pt-[72px] stacks on top of it into 144px -- same fix every
          // other FinalCta-after-Faq usage sitewide already applies
          // (app/activewear/[category]/page.tsx, app/our-factory/page.tsx,
          // etc.). Owner mobile-review correction, 2026-09-11: "'standard
          // on every [order]' should have the same gap from top as on
          // other pages."
          compactMobileTop
        />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Teamwear", url: TEAMWEAR_HUB_CANONICAL },
        ])}
      />
      <JsonLd
        data={collectionOfPagesSchema(
          teamwearHub.metaTitle,
          TEAMWEAR_HUB_CANONICAL,
          teamwearHub.metaDescription,
          allSportCards.map((card) => ({ name: card.label, url: `${SITE_URL}${card.href}` })),
        )}
      />
      <JsonLd data={faqSchema(teamwearHub.faq.items)} />
    </>
  );
}
