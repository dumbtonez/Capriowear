// app/boxing-and-mma/[category]/[style]/page.tsx
// The Boxing & MMA PDP -- see app/lifting-gears/[category]/[style]/page.tsx's
// own header comment for the full reasoning (same pattern, sibling
// division). Breadcrumb trail: Home > Boxing & MMA > [Category] > [Style].
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
import { ProductCategoryLinks } from "@/components/sections/ProductCategoryLinks";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { ProductInfo } from "@/components/sections/ProductInfo";
import { ProductCustomizeSteps } from "@/components/sections/ProductCustomizeSteps";
import { ProductOptions } from "@/components/sections/ProductOptions";
import { ProductRelatedStyles } from "@/components/sections/ProductRelatedStyles";
import { ProductSpecifications } from "@/components/sections/ProductSpecifications";
import { TrustPoints } from "@/components/sections/TrustPoints";
import {
  buildCtaSubline,
  categoryEntityFaq,
  pdpCustomizationPills,
  pdpCustomizationSteps,
  pdpFaqOperational,
  pdpSpecHighlights,
  pdpSpecificationsCopy,
} from "@/content/activewear/pdpShared";
import { footer, header } from "@/components/ui/styles";
import { capriosportsHome } from "@/content/capriosports/home";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { boxingMmaCategories } from "@/content/gear/boxing-and-mma/categories";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

export function generateStaticParams() {
  return Object.values(boxingMmaCategories).flatMap((category) =>
    category.styleCards
      .filter((card) => card.status === "published")
      .map((card) => ({ category: category.slug, style: card.slug })),
  );
}

export const dynamicParams = false;

function getData(categorySlug: string, styleSlug: string) {
  const category = boxingMmaCategories[categorySlug];
  if (!category) return null;
  const product = category.styleCards.find((card) => card.slug === styleSlug);
  if (!product) return null;
  return { category, product };
}

export async function generateMetadata({
  params,
}: PageProps<"/boxing-and-mma/[category]/[style]">): Promise<Metadata> {
  const { category, style } = await params;
  const data = getData(category, style);
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

export default async function BoxingMmaStylePage({
  params,
}: PageProps<"/boxing-and-mma/[category]/[style]">) {
  const { category, style } = await params;
  const data = getData(category, style);
  if (!data || data.product.status !== "published") notFound();

  const productTitle = data.product.pdpTitle ?? data.product.cardTitle;
  const heading = data.product.pdpHeading ?? productTitle;
  const description = data.product.pdpDescription ?? data.product.cardSubline;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Boxing & MMA", href: "/boxing-and-mma" },
    { label: data.category.menuLabel, href: `/boxing-and-mma/${data.category.slug}` },
    { label: productTitle, href: data.product.href },
  ];

  const faqItems = [
    categoryEntityFaq(data.category),
    ...(data.product.faqs ?? []),
    ...(data.product.pdpFaqOperational ?? data.category.pdpFaqOperational ?? pdpFaqOperational),
  ];

  const productImage = data.product.images?.[0]?.src ? `${SITE_URL}${data.product.images[0].src}` : undefined;

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
        <Breadcrumb items={breadcrumbItems} className="mt-[68px] hidden md:block" />
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
                { heading: "Material options", items: data.category.fabricPills! },
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

        <ProductCustomizeSteps
          content={data.product.pdpCustomizationSteps ?? data.category.pdpCustomizationSteps ?? pdpCustomizationSteps}
        />

        <TrustPoints
          heading={data.product.pdpQualityHeading ?? data.category.qualityHeading}
          subline={data.product.pdpQualitySubline ?? data.category.qualitySubline}
          points={data.product.pdpQualityPoints ?? data.category.qualityPoints}
          sidePadding="pdp"
        />

        {data.product.relatedStyleTags ? (
          <div className="container-p block xl:hidden">
            <ProductRelatedStyles tags={data.product.relatedStyleTags} topRule="none" />
          </div>
        ) : null}

        <Faq content={{ h2: "Top questions from B2B buyers", items: faqItems }} />
        <JsonLd data={faqSchema(faqItems)} />

        <ProductCategoryLinks
          categoryLabel={data.category.menuLabel}
          categoryHref={`/boxing-and-mma/${data.category.slug}`}
          siblings={data.category.styleCards
            .filter((card) => card.status === "published" && card.slug !== data.product.slug)
            .map((card) => ({ label: card.cardTitle, href: card.href }))}
        />

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
