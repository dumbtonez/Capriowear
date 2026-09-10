// app/teamwear/[sport]/[style]/page.tsx
// The Teamwear PDP -- the exact same reusable template as
// app/activewear/[category]/[style]/page.tsx, pointed at
// content/teamwear/sports.ts and the /teamwear base path instead. Every
// component and shared PDP content import (ProductGallery, ProductInfo,
// ProductSpecifications, categoryEntityFaq, buildCtaSubline,
// pdpFaqOperational, productSchema, breadcrumbSchema, faqSchema, etc.) is
// reused verbatim from the same places the Activewear PDP already imports
// them from -- nothing here is a second copy of that logic, only the group
// label ("Teamwear"), base path and registry (sports, not categories)
// differ. Breadcrumb trail: Home > Teamwear > [Sport] > [Style].
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { FINAL_CTA_MARKER_ID, ProductCtas, ProductCtasMobileBar } from "@/components/sections/ProductCtas";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { ProductInfo } from "@/components/sections/ProductInfo";
import { ProductCustomizeSteps } from "@/components/sections/ProductCustomizeSteps";
import { ProductOptions } from "@/components/sections/ProductOptions";
import { ProductRelatedStyles } from "@/components/sections/ProductRelatedStyles";
import { ProductSpecifications } from "@/components/sections/ProductSpecifications";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { header } from "@/components/ui/styles";
import {
  buildCtaSubline,
  categoryEntityFaq,
  pdpCustomizationPills,
  pdpCustomizationSteps,
  pdpFaqOperational,
  pdpSpecHighlights,
  pdpSpecificationsCopy,
} from "@/content/activewear/pdpShared";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { sports } from "@/content/teamwear/sports";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

// Published styles only -- same rule as the Activewear PDP's own
// generateStaticParams.
export function generateStaticParams() {
  return Object.values(sports).flatMap((sport) =>
    sport.styleCards
      .filter((card) => card.status === "published")
      .map((card) => ({ sport: sport.slug, style: card.slug })),
  );
}

// Same reasoning as the Activewear PDP -- a draft style's URL 404s
// immediately rather than falling through to a thin on-demand render.
export const dynamicParams = false;

function getData(sportSlug: string, styleSlug: string) {
  const sport = sports[sportSlug];
  if (!sport) return null;
  const product = sport.styleCards.find((card) => card.slug === styleSlug);
  if (!product) return null;
  return { category: sport, product };
}

export async function generateMetadata({
  params,
}: PageProps<"/teamwear/[sport]/[style]">): Promise<Metadata> {
  const { sport, style } = await params;
  const data = getData(sport, style);
  if (!data || data.product.status !== "published") return {};

  const shortTitle = data.product.pdpTitle ?? data.product.cardTitle;
  const title = data.product.pdpMetaTitle ?? `Custom ${shortTitle} Manufacturer`;
  const description = data.product.pdpMetaDescription ?? data.product.pdpDescription ?? data.product.cardSubline;
  const canonical = `${SITE_URL}${data.product.href}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const image = data.product.images?.[0]?.src;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export default async function TeamwearStylePage({ params }: PageProps<"/teamwear/[sport]/[style]">) {
  const { sport, style } = await params;
  const data = getData(sport, style);
  if (!data || data.product.status !== "published") notFound();

  const productTitle = data.product.pdpTitle ?? data.product.cardTitle;
  const heading = data.product.pdpHeading ?? productTitle;
  const description = data.product.pdpDescription ?? data.product.cardSubline;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Teamwear", href: "/teamwear" },
    { label: data.category.menuLabel, href: `/teamwear/${data.category.slug}` },
    { label: productTitle, href: data.product.href },
  ];

  const faqItems = [categoryEntityFaq(data.category), ...(data.product.faqs ?? []), ...pdpFaqOperational];

  // Absolute URL for Product schema's own `image` -- same fix as
  // app/activewear/[category]/[style]/page.tsx's own `productImage`, see
  // that file's comment.
  const productImage = data.product.images?.[0]?.src ? `${SITE_URL}${data.product.images[0].src}` : undefined;

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
        <Breadcrumb items={breadcrumbItems} className="hidden md:block" />
        <JsonLd
          data={breadcrumbSchema(
            breadcrumbItems.map((item) => ({
              name: item.label,
              url: item.href === "/" ? SITE_URL : `${SITE_URL}${item.href}`,
            })),
          )}
        />
        <JsonLd
          data={productSchema({
            name: heading,
            description,
            image: productImage,
            material: data.product.material,
          })}
        />

        <div className="container-p flex flex-col gap-6 pt-0 md:pt-6 xl:flex-row xl:items-start xl:gap-[66px] xl:pt-6">
          {data.product.images ? <ProductGallery images={data.product.images} productTitle={productTitle} /> : null}
          <div className="flex w-full min-w-0 flex-col gap-8 xl:w-[514px] xl:flex-none">
            <ProductInfo sku={data.product.sku} heading={heading} description={description} />
            <ProductHighlights items={pdpSpecHighlights} />
            <ProductOptions
              groups={[
                { heading: "Fabric options", items: data.category.fabricPills },
                { heading: "Customization", items: pdpCustomizationPills },
              ]}
            />
            <ProductCtas primaryCta={home.nav.cta} secondaryCta={home.nav.secondaryCta} />
            {data.product.relatedStyleTags ? (
              <ProductRelatedStyles tags={data.product.relatedStyleTags} className="hidden xl:flex" />
            ) : null}
          </div>
        </div>

        {data.product.specifications ? (
          <ProductSpecifications
            heading={pdpSpecificationsCopy.heading}
            subline={pdpSpecificationsCopy.subline}
            rows={data.product.specifications}
            image={data.product.specificationsImage}
          />
        ) : null}

        <ProductCustomizeSteps content={pdpCustomizationSteps} />

        <TrustPoints
          heading={data.category.qualityHeading}
          subline={data.category.qualitySubline}
          points={data.category.qualityPoints}
          sidePadding="pdp"
        />

        {data.product.relatedStyleTags ? (
          <div className="container-p block xl:hidden">
            <ProductRelatedStyles tags={data.product.relatedStyleTags} topRule="none" />
          </div>
        ) : null}

        <Faq content={{ h2: "Top questions from B2B buyers", items: faqItems }} />
        <JsonLd data={faqSchema(faqItems)} />

        <div id={FINAL_CTA_MARKER_ID} aria-hidden="true" />
        <FinalCta
          content={{
            h2: home.finalCta.h2,
            subline: buildCtaSubline(data.category.ctaReferenceNoun),
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
