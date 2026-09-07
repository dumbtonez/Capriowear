// app/teamwear/[sport]/page.tsx
// The Teamwear sport PLP -- the exact same reusable template as
// app/activewear/[category]/page.tsx, pointed at content/teamwear/sports.ts
// and the /teamwear base path instead. Every component, schema builder and
// piece of shared PDP/PLP content (FabricOptions, categoryEntityFaq,
// buildCtaSubline, collectionPageSchema, breadcrumbSchema, faqSchema, etc.)
// is imported and reused verbatim -- nothing here is a copy of that logic,
// only the group label ("Teamwear"), base path ("/teamwear") and registry
// (sports, not categories) differ. Adding a sport is adding its own content
// file to content/teamwear/sports.ts's registry, same as Activewear.
import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { RevealMain } from "@/components/RevealMain";
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
import { home, teamwearMegaMenu } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { sports } from "@/content/teamwear/sports";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return Object.keys(sports).map((sport) => ({ sport }));
}

export async function generateMetadata({
  params,
}: PageProps<"/teamwear/[sport]">): Promise<Metadata> {
  const { sport } = await params;
  const data = sports[sport];
  if (!data) return {};

  const canonical = `${SITE_URL}/teamwear/${data.slug}`;
  const fullTitle = `${data.metaTitle} | ${SITE_NAME}`;
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical },
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

export default async function SportPage({ params }: PageProps<"/teamwear/[sport]">) {
  const { sport } = await params;
  const data = sports[sport];
  if (!data) return null;

  const faqItems = [categoryEntityFaq(data), ...data.faqs];
  const publishedStyleCards = data.styleCards.filter((card) => card.status === "published");

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

      <RevealMain className="relative z-10 bg-paper">
        <CategoryBanner
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Teamwear", href: "/teamwear" },
            { label: data.menuLabel, href: `/teamwear/${data.slug}` },
          ]}
          h1={data.h1}
          trustBullets={data.trustBullets}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Teamwear", url: `${SITE_URL}/teamwear` },
            { name: data.menuLabel, url: `${SITE_URL}/teamwear/${data.slug}` },
          ])}
        />
        {/* CollectionPage/ItemList omitted entirely while zero styles are
            published (owner spec, 2026-09-05, Cricket: every style set back
            to "draft" pending team confirmation) -- schema must never
            describe a PDP that doesn't actually exist, same rule this
            block already followed for a draft card; with nothing real to
            list, the whole entity is dropped rather than emitted with an
            empty itemListElement. The PLP itself stays live/indexed --
            only this one schema block is conditional, not the page. */}
        {publishedStyleCards.length > 0 ? (
          <JsonLd
            data={collectionPageSchema(
              data.menuLabel,
              `${SITE_URL}/teamwear/${data.slug}`,
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
            <CategoryFilters activeSlug={data.slug} menuGroups={teamwearMegaMenu} basePath="/teamwear" ariaLabel="Teamwear categories" />
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
          weightTiers={data.weightTiers}
          weightTiersHeaders={data.weightTiersHeaders}
          structuredBlock={data.structuredBlock}
          note={data.fabricNote}
        />

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
      </RevealMain>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />
    </>
  );
}
