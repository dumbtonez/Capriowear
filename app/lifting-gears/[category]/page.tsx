// app/lifting-gears/[category]/page.tsx
// The Lifting Gears category PLP -- the exact same reusable template as
// app/teamwear/[sport]/page.tsx, pointed at
// content/gear/lifting-gears/categories.ts and the /lifting-gears base path
// instead. See that file's own header comment for the full reasoning --
// nothing here is a copy of the shared logic, only the group label
// ("Gear"/"Lifting Gears"), base path and registry differ.
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { CategoryBanner } from "@/components/sections/CategoryBanner";
import { CategoryFilters } from "@/components/sections/CategoryFilters";
import { CategoryMetaStrip } from "@/components/sections/CategoryMetaStrip";
import { FabricOptions } from "@/components/sections/FabricOptions";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FINAL_CTA_MARKER_ID, ProductCtasMobileBar } from "@/components/sections/ProductCtas";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { WhatWeCover } from "@/components/sections/WhatWeCover";
import { header } from "@/components/ui/styles";
import { buildCtaSubline, categoryEntityFaq } from "@/content/activewear/pdpShared";
import { capriosportsHome } from "@/content/capriosports/home";
import { home, liftingGearsMegaMenu } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { liftingGearsCategories } from "@/content/gear/lifting-gears/categories";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return Object.keys(liftingGearsCategories).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/lifting-gears/[category]">): Promise<Metadata> {
  const { category } = await params;
  const data = liftingGearsCategories[category];
  if (!data) return {};

  const canonical = `${SITE_URL}/lifting-gears/${data.slug}`;
  const fullTitle = `${data.metaTitle} | ${SITE_NAME}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical },
    // Category-level draft gate (owner spec, 2026-09-15) -- independent of
    // the sitewide ALLOW_INDEXING switch in the root layout, see
    // `Category.status`'s own comment.
    ...(data.status === "draft" ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description: data.metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: data.metaDescription,
    },
  };
}

export default async function LiftingGearsCategoryPage({ params }: PageProps<"/lifting-gears/[category]">) {
  const { category } = await params;
  const data = liftingGearsCategories[category];
  if (!data) notFound();

  const faqItems = [categoryEntityFaq(data), ...data.faqs];
  const publishedStyleCards = data.styleCards.filter((card) => card.status === "published");

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
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Lifting Gears", href: "/lifting-gears" },
            { label: data.menuLabel, href: `/lifting-gears/${data.slug}` },
          ]}
          h1={data.h1}
          trustBullets={data.trustBullets}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Lifting Gears", url: `${SITE_URL}/lifting-gears` },
            { name: data.menuLabel, url: `${SITE_URL}/lifting-gears/${data.slug}` },
          ])}
        />
        {data.status !== "draft" && publishedStyleCards.length > 0 ? (
          <JsonLd
            data={collectionPageSchema(
              data.menuLabel,
              `${SITE_URL}/lifting-gears/${data.slug}`,
              `${data.menuLabel} from ${ORGANIZATION.description}`,
              publishedStyleCards.map((card) => ({
                name: card.cardTitle,
                url: `${SITE_URL}${card.href}`,
                ...(card.image ? { image: `${SITE_URL}${card.image}` } : {}),
              })),
            )}
          />
        ) : null}
        <div className="container-p">
          <CategoryMetaStrip
            categoryLabel={data.menuLabel}
            categorySubline={data.gridSubline}
            categorySublineMobile={data.gridSublineMobile}
            showGenderFilter={data.showGenderFilter}
            defaultChip={data.defaultGenderFilter}
          />
          <div id="plp-listing" className="flex flex-col gap-8 max-xl:pb-6 xl:pb-14 xl:flex-row xl:gap-12">
            <CategoryFilters
              activeSlug={data.slug}
              menuGroups={liftingGearsMegaMenu}
              basePath="/lifting-gears"
              ariaLabel="Lifting Gears categories"
            />
            <ProductGrid key={data.slug} cards={data.styleCards} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1440px]">
          <div className="h-px bg-[#e8ecf1] xl:mb-[120px]" />
        </div>

        <WhatWeCover eyebrow={data.coverageEyebrow} heading={data.coverageHeading} items={data.coverageItems} />
        <TrustPoints heading={data.qualityHeading} subline={data.qualitySubline} points={data.qualityPoints} />
        <FabricOptions
          eyebrow={data.fabricEyebrow}
          heading={data.fabricHeading}
          options={data.fabricOptions}
          optionsHeaders={data.fabricOptionsHeaders}
          weightTiers={data.weightTiers}
          weightTiersHeaders={data.weightTiersHeaders}
          structuredBlock={data.structuredBlock}
          note={data.fabricNote}
        />

        <Faq content={{ h2: data.faqHeading, items: faqItems }} />
        {data.status !== "draft" ? <JsonLd data={faqSchema(faqItems)} /> : null}

        <div id={FINAL_CTA_MARKER_ID} aria-hidden="true" />
        <FinalCta
          content={{
            h2: home.finalCta.h2,
            subline: buildCtaSubline(data.ctaReferenceNoun),
            cta: home.finalCta.cta,
          }}
          ticker={home.complianceTicker}
          compactMobileTop
          secondaryCta={home.closingCta.secondaryCta}
        />

        <ProductCtasMobileBar primaryCta={home.nav.cta} />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />
    </>
  );
}
