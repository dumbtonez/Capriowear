// app/boxing-and-mma/page.tsx
// The Boxing & MMA Landing Hub -- see app/lifting-gears/page.tsx's own
// header comment for the full reasoning (same pattern, sibling division).
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { CategoryLinkGrid } from "@/components/sections/CategoryLinkGrid";
import { CategoryBanner } from "@/components/sections/CategoryBanner";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { categoryGroupsSection, header } from "@/components/ui/styles";
import { capriosportsHome } from "@/content/capriosports/home";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { boxingMmaGroups, boxingMmaHub, BOXING_MMA_HUB_CANONICAL } from "@/content/gear/boxing-and-mma/hub";
import { breadcrumbSchema, collectionOfPagesSchema, faqSchema } from "@/lib/schema";

const allCategoryCards = boxingMmaGroups.flatMap((group) => group.categories);

export const metadata: Metadata = {
  title: boxingMmaHub.metaTitle,
  description: boxingMmaHub.metaDescription,
  alternates: { canonical: BOXING_MMA_HUB_CANONICAL },
  openGraph: {
    title: `${boxingMmaHub.metaTitle} | ${SITE_NAME}`,
    description: boxingMmaHub.metaDescription,
    url: BOXING_MMA_HUB_CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${boxingMmaHub.metaTitle} | ${SITE_NAME}`,
    description: boxingMmaHub.metaDescription,
  },
};

export default function BoxingMmaHubPage() {
  return (
    <>
      {/* Real sitewide Header, Capriosports' own nav content -- see
          app/lifting-gears/page.tsx's own comment for the full reasoning. */}
      <Header
        brand={capriosportsHome.nav.brand}
        logo={<Logo caprioOnly className={header.brandLogoCapriosports} />}
        desktopLogo={<Logo caprioOnly className={header.brandLogoDesktopCapriosports} />}
        links={capriosportsHome.nav.links}
        mobileLinks={capriosportsHome.nav.mobileLinks}
        contact={capriosportsHome.nav.contact}
        social={ORGANIZATION.sameAs}
        cta={capriosportsHome.nav.cta}
      />

      <main className="relative z-10 bg-paper">
        <CategoryBanner
          breadcrumbItems={boxingMmaHub.hero.breadcrumbItems}
          h1={boxingMmaHub.hero.h1}
          trustBullets={boxingMmaHub.hero.trustBullets}
        />

        <section className={categoryGroupsSection.section}>
          {boxingMmaGroups.map((group) => (
            <CategoryLinkGrid key={group.eyebrow} group={group} division="boxing-and-mma" />
          ))}
        </section>

        <Faq content={{ h2: boxingMmaHub.faq.h2, items: boxingMmaHub.faq.items }} />

        <FinalCta
          content={boxingMmaHub.finalCta}
          ticker={{ title: "Standard on every order", items: boxingMmaHub.finalCta.complianceBar }}
          compactMobileTop
        />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Boxing & MMA", url: BOXING_MMA_HUB_CANONICAL },
        ])}
      />
      <JsonLd
        data={collectionOfPagesSchema(
          boxingMmaHub.metaTitle,
          BOXING_MMA_HUB_CANONICAL,
          boxingMmaHub.metaDescription,
          allCategoryCards.map((card) => ({ name: card.label, url: `${SITE_URL}${card.href}` })),
        )}
      />
      <JsonLd data={faqSchema(boxingMmaHub.faq.items)} />
    </>
  );
}
