// app/activewear/page.tsx
// The Activewear Landing Hub -- a light browse/directory page one level
// above the 18 real Activewear category PLPs (17 in the
// content/activewear/categories.ts registry, plus the standalone
// app/activewear/running-wear/page.tsx). Built from Mohsin's own spec
// doc, 2026-09-11, immediately following the same pattern and lessons
// already learned building the Teamwear hub (app/teamwear/page.tsx) --
// see docs/05-plan.md's decision log for the full list of corrections
// that build went through; those are applied here from the start rather
// than redone via a second feedback round.
//
// Nav dependency, already resolved: `content/home.ts`'s `home.nav.links`/
// `mobileLinks` already carry `{ label: "Activewear", href: "/activewear",
// megaMenu: activewearMegaMenu }` -- the label was already a real link, it
// just 404'd with no route behind it. No nav change needed here; this
// route landing is what fixes the 404.
//
// Section order: CategoryBanner (breadcrumb, H1, fact strip -- alone, no
// extra subline/CTA band, matching every category PLP's own hero exactly
// -- lesson carried over from Teamwear's own desktop-review correction),
// five `CategoryLinkGrid`s (one per mega-menu group, each its own
// eyebrow+H2+card grid -- new, lightweight, text-only link cards,
// deliberately distinct from `ProductCard`'s image-forward PLP tile per
// the source doc), an Overview section (SectionHeading + lead paragraph +
// a plain 2-item differentiator list), TrustPoints (`sidePadding="services"`
// to match this page's own container-p side padding), Faq (reused
// verbatim), FinalCta (reused, with `crossLinks` to /teamwear,
// /our-factory, /services per the source doc's own spec -- unlike
// Teamwear's hub, whose own cross-links were added then removed by a
// later owner correction; kept here since this doc explicitly asks for
// them and the two pages aren't required to match on this point), Footer.
//
// Schema: BreadcrumbList (Home > Activewear), CollectionPage/ItemList of
// the 18 category PLPs via `collectionOfPagesSchema` (WebPage entities,
// not Product -- this hub page itself houses no products, same reasoning
// the Teamwear hub already established, even though every PDP under these
// categories is real/published unlike Teamwear's own draft PDPs).
// FAQPage from the same 7 visible FAQ items the Faq accordion renders.
// Organization/WebSite are already sitewide via the root layout, not
// duplicated here.
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
import { activewearOverview, categoryGroupsSection, header } from "@/components/ui/styles";
import { categories } from "@/content/activewear/categories";
import { ACTIVEWEAR_HUB_CANONICAL, activewearHub, categoryGroups } from "@/content/activewear/hub";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema, collectionOfPagesSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: activewearHub.metaTitle,
  description: activewearHub.metaDescription,
  alternates: {
    canonical: ACTIVEWEAR_HUB_CANONICAL,
  },
  openGraph: {
    title: `${activewearHub.metaTitle} | ${SITE_NAME}`,
    description: activewearHub.metaDescription,
    url: ACTIVEWEAR_HUB_CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${activewearHub.metaTitle} | ${SITE_NAME}`,
    description: activewearHub.metaDescription,
  },
};

// Every category card from every group, flattened -- used to build the
// CollectionPage/ItemList schema below (one WebPage entity per card, same
// source the visible grid renders, so the schema can never drift from
// what the page actually shows).
const allCategoryCards = categoryGroups.flatMap((group) => group.categories);

export default function ActivewearHubPage() {
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
          breadcrumbItems={activewearHub.hero.breadcrumbItems}
          h1={activewearHub.hero.h1}
          trustBullets={activewearHub.hero.trustBullets}
        />

        <section className={categoryGroupsSection.section}>
          {categoryGroups.map((group) => (
            <CategoryLinkGrid key={group.eyebrow} group={group} division="activewear" />
          ))}
        </section>

        <section className={activewearOverview.section}>
          <div className={activewearOverview.textGroup}>
            <SectionHeading
              eyebrow={<TextReveal text={activewearHub.overview.eyebrow} />}
              heading={<TextReveal as="span" text={activewearHub.overview.h2} />}
              eyebrowTone="light"
              eyebrowSize={activewearOverview.eyebrowSize}
              gap={activewearOverview.headingGap}
            />
            <p className={activewearOverview.lead}>
              {activewearHub.overview.lead.map((segment, index) =>
                typeof segment === "string" ? (
                  <Fragment key={index}>{segment}</Fragment>
                ) : (
                  <span key={index} className={activewearOverview.leadBold}>
                    {segment.bold}
                  </span>
                ),
              )}
            </p>
          </div>
          <div className={activewearOverview.grid}>
            {activewearHub.overview.differentiators.map((item) => (
              <CapabilityCard
                key={item.title}
                title={item.title}
                body={item.body}
                mediaRadius="none"
                mediaAspectClassName="aspect-[7/5] xl:aspect-[8/5]"
                rootClassName={activewearOverview.cardRoot}
                bodyClassName={activewearOverview.cardBody}
                titleClassName={activewearOverview.cardTitle}
              />
            ))}
          </div>
        </section>

        <TrustPoints
          heading={activewearHub.trust.heading}
          subline={activewearHub.trust.subline}
          points={activewearHub.trust.points}
          // "hub" (80px side padding, 96px desktop top gap -- owner,
          // 2026-09-11: "make it 96px on both pages") -- see TrustPoints.tsx
          // for the full variant comment.
          sidePadding="hub"
        />

        <Faq content={{ h2: activewearHub.faq.h2, items: activewearHub.faq.items }} />

        <FinalCta
          content={activewearHub.finalCta}
          ticker={{ title: "Standard on every order", items: activewearHub.finalCta.complianceBar }}
          crossLinks={activewearHub.finalCta.crossLinks}
          compactMobileTop
        />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Activewear", url: ACTIVEWEAR_HUB_CANONICAL },
        ])}
      />
      <JsonLd
        data={collectionOfPagesSchema(
          activewearHub.metaTitle,
          ACTIVEWEAR_HUB_CANONICAL,
          activewearHub.metaDescription,
          allCategoryCards.map((card) => ({ name: card.label, url: `${SITE_URL}${card.href}` })),
        )}
      />
      <JsonLd data={faqSchema(activewearHub.faq.items)} />
    </>
  );
}

// Compile-time cross-check: every category card href above resolves to
// either a real registry entry (content/activewear/categories.ts) or the
// standalone running-wear page -- if a slug is ever renamed in one place
// and not the other, this throws at build time instead of silently
// linking to a 404.
const REGISTRY_SLUGS = new Set(Object.values(categories).map((category) => category.slug));
for (const card of allCategoryCards) {
  const slug = card.href.replace("/activewear/", "");
  if (slug !== "running-wear" && !REGISTRY_SLUGS.has(slug)) {
    throw new Error(`Activewear hub links to unknown category slug: ${slug}`);
  }
}
