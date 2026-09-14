// app/page.tsx
// The real Capriosports parent-site homepage (2026-09-15, Capriosports
// homepage task) -- replaces the earlier placeholder stub. Every section
// reuses an existing, locked component exactly as Capriowear's own
// Activewear/Teamwear hub pages already use it; nothing here is a new or
// forked section component. See docs/03-component-library.md for the full
// component-reuse map and docs/05-plan.md for the two flagged gaps (the
// Hero->CategoryBanner fallback composition below, and each individual
// Gear/other-stub page's own openGraph.title string still reading
// "| Capriowear," left unaddressed per owner instruction).
//
// Hero fallback: components/sections/Hero.tsx has no text-only variant --
// it unconditionally renders a video layer plus a "Fully Custom Offerings"
// ticker layer this page doesn't want at all. Falling back to
// CategoryBanner (the same component every PLP/hub banner already uses)
// instead, composed with the plain Eyebrow and Button atoms Hero itself
// uses internally -- not a new section component, a page-level composition
// of existing atoms, exactly as instructed when this ambiguity was flagged
// and approved.
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment } from "react";

import { Button } from "@/components/Button";
import { CapabilityCard } from "@/components/Card";
import { Eyebrow } from "@/components/Eyebrow";
import { CategoryBanner } from "@/components/sections/CategoryBanner";
import { CategoryLinkGrid } from "@/components/sections/CategoryLinkGrid";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { Stats } from "@/components/sections/Stats";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { activewearOverview, categoryGroupsSection } from "@/components/ui/styles";
import { capriosportsHome } from "@/content/capriosports/home";
import { home } from "@/content/home";
import { ORGANIZATION, PARENT_SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: capriosportsHome.metaTitle,
  description: capriosportsHome.metaDescription,
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${capriosportsHome.metaTitle} | ${PARENT_SITE_NAME}`,
    description: capriosportsHome.metaDescription,
    url: SITE_URL,
    siteName: PARENT_SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${capriosportsHome.metaTitle} | ${PARENT_SITE_NAME}`,
    description: capriosportsHome.metaDescription,
  },
};

const divisionGroup = {
  eyebrow: capriosportsHome.divisions.eyebrow,
  h2: capriosportsHome.divisions.h2,
  categories: capriosportsHome.divisions.categories,
};

export default function CapriosportsHomePage() {
  return (
    <>
      {/* Bare, unstyled placeholder nav -- Phase 1 scaffolding only, same
          pattern as the Gear division's own placeholder nav
          (app/lifting-gears/page.tsx). NOT the real division switcher/
          parent-site header -- that's Phase 3 work. */}
      <nav className="p-4 text-sm">
        <Link href="/capriowear">Capriowear</Link> | <Link href="/lifting-gears">Lifting Gears</Link> |{" "}
        <Link href="/boxing-and-mma">Boxing & MMA</Link> | <Link href="/contact">Contact</Link>
      </nav>

      <main className="relative z-10 bg-paper">
        <div className="bg-ink">
          <Eyebrow tone="dark" className="container-p pt-8">
            {capriosportsHome.hero.eyebrow}
          </Eyebrow>
          <CategoryBanner breadcrumbItems={[{ label: "Home", href: "/" }]} h1={capriosportsHome.hero.h1} trustBullets={[]} />
          <div className="container-p pb-10">
            <Button href={capriosportsHome.hero.cta.href}>{capriosportsHome.hero.cta.label}</Button>
          </div>
        </div>

        <section className={categoryGroupsSection.section}>
          <CategoryLinkGrid group={divisionGroup} division="lifting-gears" />
        </section>

        <section className={activewearOverview.section}>
          <div className={activewearOverview.textGroup}>
            <SectionHeading
              eyebrow={<TextReveal text={capriosportsHome.overview.eyebrow} />}
              heading={<TextReveal as="span" text={capriosportsHome.overview.h2} />}
              eyebrowTone="light"
              eyebrowSize={activewearOverview.eyebrowSize}
              gap={activewearOverview.headingGap}
            />
            <p className={activewearOverview.lead}>
              {capriosportsHome.overview.lead.map((segment, index) =>
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
            {capriosportsHome.overview.differentiators.map((item) => (
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

        <Stats items={capriosportsHome.stats} />

        <TrustPoints
          heading={capriosportsHome.trust.heading}
          subline={capriosportsHome.trust.subline}
          points={capriosportsHome.trust.points}
          sidePadding="hub"
        />

        <Faq content={{ h2: capriosportsHome.faq.h2, items: capriosportsHome.faq.items }} />

        <FinalCta content={capriosportsHome.finalCta} compactMobileTop />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }])} />
      <JsonLd data={faqSchema(capriosportsHome.faq.items)} />
    </>
  );
}
