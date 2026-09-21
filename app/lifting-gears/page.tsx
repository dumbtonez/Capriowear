// app/lifting-gears/page.tsx
// The Lifting Gears Landing Hub -- the exact same reusable template as
// app/teamwear/page.tsx, pointed at content/gear/lifting-gears/hub.ts
// instead. Phase 1 scaffolding: placeholder copy, proves the routing/schema
// wiring only. See that file's own header comment for the full reasoning on
// section order and schema choices (identical here).
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { CategoryLinkGrid } from "@/components/sections/CategoryLinkGrid";
import { CategoryBanner } from "@/components/sections/CategoryBanner";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { categoryGroupsSection, footer, header } from "@/components/ui/styles";
import { capriosportsHome } from "@/content/capriosports/home";
import { GEAR_DEFAULT_OG_IMAGE, ORGANIZATION, SITE_URL, siteNameForGroup } from "@/content/site";
import { liftingGearsGroups, liftingGearsHub, LIFTING_GEARS_HUB_CANONICAL } from "@/content/gear/lifting-gears/hub";
import { breadcrumbSchema, collectionOfPagesSchema, faqSchema } from "@/lib/schema";

const allCategoryCards = liftingGearsGroups.flatMap((group) => group.categories);

// Gear division hub: Capriosports in link-preview metadata (see siteNameForGroup).
const GEAR_SITE_NAME = siteNameForGroup("Gear");

export const metadata: Metadata = {
  title: liftingGearsHub.metaTitle,
  description: liftingGearsHub.metaDescription,
  alternates: { canonical: LIFTING_GEARS_HUB_CANONICAL },
  openGraph: {
    title: `${liftingGearsHub.metaTitle} | ${GEAR_SITE_NAME}`,
    description: liftingGearsHub.metaDescription,
    url: LIFTING_GEARS_HUB_CANONICAL,
    siteName: GEAR_SITE_NAME,
    type: "website",
    images: [GEAR_DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${liftingGearsHub.metaTitle} | ${GEAR_SITE_NAME}`,
    description: liftingGearsHub.metaDescription,
    images: [GEAR_DEFAULT_OG_IMAGE],
  },
};

export default function LiftingGearsHubPage() {
  return (
    <>
      {/* Real sitewide Header, Capriosports' own nav content (owner spec,
          2026-09-16) -- replaces the Phase 1 placeholder <nav>, same exact
          Header call the Capriosports homepage (app/page.tsx) already uses.
          Still no persistent division switcher (active-division
          highlighting across Lifting Gears/Boxing & MMA/Capriowear stays
          Phase 3) -- just the same component every Capriowear page already
          uses, fed Capriosports' own plain-links content instead. */}
      <Header
        brand={capriosportsHome.nav.brand}
        brandHref="/"
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
          breadcrumbItems={liftingGearsHub.hero.breadcrumbItems}
          h1={liftingGearsHub.hero.h1}
          trustBullets={liftingGearsHub.hero.trustBullets}
        />

        <section className={categoryGroupsSection.section}>
          {liftingGearsGroups.map((group) => (
            <CategoryLinkGrid key={group.eyebrow} group={group} division="lifting-gears" />
          ))}
        </section>

        <Faq content={{ h2: liftingGearsHub.faq.h2, items: liftingGearsHub.faq.items }} />

        <FinalCta
          content={liftingGearsHub.finalCta}
          ticker={{ title: "Standard on every order", items: liftingGearsHub.finalCta.complianceBar }}
          compactMobileTop
        />
      </main>

      <Footer
        content={capriosportsHome.footer}
        social={ORGANIZATION.sameAs}
        brandMark={{
          desktop: <Logo caprioOnly className={footer.capriosportsDesktopBrandLogo} />,
          mobile: <Logo caprioOnly className={footer.capriosportsMobileBrandLogo} />,
        }}
      />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Lifting Gears", url: LIFTING_GEARS_HUB_CANONICAL },
        ])}
      />
      <JsonLd
        data={collectionOfPagesSchema(
          liftingGearsHub.metaTitle,
          LIFTING_GEARS_HUB_CANONICAL,
          liftingGearsHub.metaDescription,
          allCategoryCards.map((card) => ({ name: card.label, url: `${SITE_URL}${card.href}` })),
        )}
      />
      <JsonLd data={faqSchema(liftingGearsHub.faq.items)} />
    </>
  );
}
