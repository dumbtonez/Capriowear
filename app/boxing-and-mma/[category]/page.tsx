// app/boxing-and-mma/[category]/page.tsx
// The Boxing & MMA category PLP -- see app/lifting-gears/[category]/page.tsx's
// own header comment for the full reasoning (same pattern, sibling
// division).
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
import { RelatedCategories } from "@/components/sections/RelatedCategories";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { WhatWeCover } from "@/components/sections/WhatWeCover";
import { footer, header } from "@/components/ui/styles";
import { buildCtaSubline, categoryEntityFaq, isPublished } from "@/content/activewear/pdpShared";
import { capriosportsHome } from "@/content/capriosports/home";
import { home, boxingMmaMegaMenu } from "@/content/home";
import { CAPRIOSPORTS_ORGANIZATION } from "@/content/capriosports/organization";
import { GEAR_DEFAULT_OG_IMAGE, ORGANIZATION, SITE_URL, siteNameForGroup } from "@/content/site";
import { boxingMmaCategories } from "@/content/gear/boxing-and-mma/categories";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return Object.keys(boxingMmaCategories).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/boxing-and-mma/[category]">): Promise<Metadata> {
  const { category } = await params;
  const data = boxingMmaCategories[category];
  if (!data) return {};

  const canonical = `${SITE_URL}/boxing-and-mma/${data.slug}`;
  const siteName = siteNameForGroup(data.group);
  const fullTitle = `${data.metaTitle} | ${siteName}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical },
    // Category-level draft gate, same as app/lifting-gears/[category]/page.tsx.
    ...(data.status === "draft" ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: fullTitle,
      description: data.metaDescription,
      url: canonical,
      siteName,
      type: "website",
      images: [GEAR_DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: data.metaDescription,
      images: [GEAR_DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BoxingMmaCategoryPage({ params }: PageProps<"/boxing-and-mma/[category]">) {
  const { category } = await params;
  const data = boxingMmaCategories[category];
  if (!data) notFound();

  const faqItems = [categoryEntityFaq(data), ...data.faqs];
  const publishedStyleCards = data.styleCards.filter(isPublished);

  return (
    <>
      {/* Real sitewide Header, Capriosports' own nav content -- see
          app/lifting-gears/page.tsx's own comment for the full reasoning. */}
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
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Boxing & MMA", href: "/boxing-and-mma" },
            { label: data.menuLabel, href: `/boxing-and-mma/${data.slug}` },
          ]}
          h1={data.h1}
          trustBullets={data.trustBullets}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Boxing & MMA", url: `${SITE_URL}/boxing-and-mma` },
            { name: data.menuLabel, url: `${SITE_URL}/boxing-and-mma/${data.slug}` },
          ])}
        />
        {publishedStyleCards.length > 0 ? (
          <JsonLd
            data={collectionPageSchema(
              data.menuLabel,
              `${SITE_URL}/boxing-and-mma/${data.slug}`,
              // Gear is Capriosports' own line, not Capriowear: the locked schema
              // one-liner, never Capriowear's intro (Hoodies audit follow-up, 2026-09-24).
              `${data.menuLabel} by Capriosports. ${CAPRIOSPORTS_ORGANIZATION.identityLine.gear}`,
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
              menuGroups={boxingMmaMegaMenu}
              basePath="/boxing-and-mma"
              ariaLabel="Boxing & MMA categories"
            />
            <ProductGrid key={data.slug} cards={data.styleCards} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1440px]">
          <div className="h-px bg-[#e8ecf1] xl:mb-[120px]" />
        </div>

        {/* Order: Fabric options -> Customization -> Trust/proof (owner
            spec, 2026-09-22, site-wide PLP reorder -- see the Activewear
            category route's own comment on this same change). */}
        <FabricOptions
          eyebrow={data.fabricEyebrow!}
          heading={data.fabricHeading!}
          options={data.fabricOptions!}
          weightTiers={data.weightTiers}
          weightTiersHeaders={data.weightTiersHeaders}
          structuredBlock={data.structuredBlock}
          note={data.fabricNote!}
        />
        <WhatWeCover eyebrow={data.coverageEyebrow} heading={data.coverageHeading} items={data.coverageItems} />
        <TrustPoints heading={data.qualityHeading} subline={data.qualitySubline} points={data.qualityPoints} />

        {/* Cross-category internal links (owner, 2026-09-23), last before
            the dark FAQ -- see RelatedCategories.tsx. Renders nothing for
            an empty `relatedLinks`. */}
        <RelatedCategories links={data.relatedLinks} />
        <Faq content={{ h2: data.faqHeading, items: faqItems }} />
        <JsonLd data={faqSchema(faqItems)} />

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

      <Footer
        content={capriosportsHome.footer}
        social={ORGANIZATION.sameAs}
        brandMark={{
          desktop: <Logo caprioOnly className={footer.capriosportsDesktopBrandLogo} />,
          mobile: <Logo caprioOnly className={footer.capriosportsMobileBrandLogo} />,
        }}
      />
    </>
  );
}
