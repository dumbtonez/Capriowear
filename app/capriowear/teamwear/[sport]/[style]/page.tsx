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
import { ProductCategoryLinks } from "@/components/sections/ProductCategoryLinks";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ProductHighlights } from "@/components/sections/ProductHighlights";
import { ProductInfo } from "@/components/sections/ProductInfo";
import { ProductCustomizeSteps } from "@/components/sections/ProductCustomizeSteps";
import { ProductOptions } from "@/components/sections/ProductOptions";
import { ProductRelatedStyles } from "@/components/sections/ProductRelatedStyles";
import { ProductSpecifications } from "@/components/sections/ProductSpecifications";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { header, productTopRow } from "@/components/ui/styles";
import {
  buildCtaSubline,
  categoryEntityFaq,
  isDraftPdpReachable,
  isPublished,
  pdpCustomizationPills,
  pdpCustomizationSteps,
  pdpFaqOperational,
  pdpSpecHighlights,
  pdpSpecificationsCopy,
  resolveRelatedStyleTags,
} from "@/content/activewear/pdpShared";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { sports } from "@/content/teamwear/sports";
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

// Published styles, plus drafts with PDP content for a sport that has
// opted into the Activewear draft-PDP rule (`Category.draftPdpsReachable`,
// TEMPORARY -- see its comment in content/activewear/types.ts; once every
// sport is rebuilt, drop the flag and make this the default). A reachable
// draft renders noindexed, out of the sitemap, with BreadcrumbList only
// (Product/FAQPage withheld, gated on isPublished() below). A card-only
// draft, or any draft on a sport without the flag, still 404s.
function isReachable(
  sport: { draftPdpsReachable?: boolean },
  card: { status: "published" | "draft"; pdpHeading?: string; specifications?: unknown[] },
) {
  return card.status === "published" || (sport.draftPdpsReachable === true && isDraftPdpReachable(card));
}

export function generateStaticParams() {
  return Object.values(sports).flatMap((sport) =>
    sport.styleCards
      .filter((card) => isReachable(sport, card))
      .map((card) => ({ sport: sport.slug, style: card.slug })),
  );
}

// Same reasoning as the Activewear PDP -- an unreachable style's URL 404s
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
}: PageProps<"/capriowear/teamwear/[sport]/[style]">): Promise<Metadata> {
  const { sport, style } = await params;
  const data = getData(sport, style);
  if (!data || !isReachable(data.category, data.product)) return {};

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
    // A "published" style that fails getPublishReadiness() renders like a
    // draft: noindexed, schema-less, out of the sitemap (Jumpsuits audit #13).
    ...(!isPublished(data.product) ? { robots: { index: false, follow: false } } : {}),
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

export default async function TeamwearStylePage({ params }: PageProps<"/capriowear/teamwear/[sport]/[style]">) {
  const { sport, style } = await params;
  const data = getData(sport, style);
  if (!data || !isReachable(data.category, data.product)) notFound();

  const productTitle = data.product.pdpTitle ?? data.product.cardTitle;
  const heading = data.product.pdpHeading ?? productTitle;
  const description = data.product.pdpDescription ?? data.product.cardSubline;

  const breadcrumbItems = [
    { label: "Home", href: "/capriowear" },
    { label: "Teamwear", href: "/capriowear/teamwear" },
    { label: data.category.menuLabel, href: `/capriowear/teamwear/${data.category.slug}` },
    { label: productTitle, href: data.product.href },
  ];

  // Chip resolution only for an opted-in sport; otherwise the tags render
  // exactly as authored (the old Teamwear behavior).
  const relatedStyleTags =
    data.product.relatedStyleTags && data.category.draftPdpsReachable
      ? resolveRelatedStyleTags(data.product.relatedStyleTags, data.category.styleCards)
      : data.product.relatedStyleTags;

  const faqItems = [categoryEntityFaq(data.category), ...(data.product.faqs ?? []), ...pdpFaqOperational];

  // Absolute URL for Product schema's own `image` -- same fix as
  // app/activewear/[category]/[style]/page.tsx's own `productImage`, see
  // that file's comment.
  const productImage = data.product.images?.[0]?.src ? `${SITE_URL}${data.product.images[0].src}` : undefined;

  return (
    <>
      {/* ProductCategoryLinks: crawlable "Back to all [Category]" link plus
          published sibling-PDP links, visually hidden (owner, 2026-09-08).
          First in the DOM, before Header, so it works as a skip link
          (Jumpsuits audit #24, 2026-09-25): the first Tab reveals "Back to
          all [Category]" pinned under the header, the next Tab hides it
          again. See productCategoryLinks' recipe comment. */}
      <ProductCategoryLinks
        categoryLabel={data.category.menuLabel}
        categoryHref={`/capriowear/teamwear/${data.category.slug}`}
        siblings={data.category.styleCards
          .filter((card) => isPublished(card) && card.slug !== data.product.slug)
          .map((card) => ({ label: card.cardTitle, href: card.href }))}
      />
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
        {/* `mt-[68px]` clears the fixed header (components/ui/styles.ts's
            `header.base` is `position: fixed`, out of document flow) --
            same fix and reasoning as the activewear PDP's own Breadcrumb,
            see that file's own comment. */}
        <Breadcrumb items={breadcrumbItems} className="mt-[68px] hidden md:block" />
        <JsonLd
          data={breadcrumbSchema(
            breadcrumbItems.map((item) => ({
              name: item.label,
              url: item.href === "/" ? SITE_URL : `${SITE_URL}${item.href}`,
            })),
          )}
        />
        {isPublished(data.product) ? (
          <JsonLd
            data={productSchema({
              name: data.product.cardTitle,
              url: `${SITE_URL}${data.product.href}`,
              category: data.category.menuLabel,
              description,
              image: productImage,
              material: data.product.material,
              schemaMaterial: data.product.schemaMaterial,
              sku: data.product.sku,
              group: data.category.group,
            })}
          />
        ) : null}

        <div className={productTopRow.root}>
          {data.product.images ? <ProductGallery images={data.product.images} productTitle={productTitle} /> : null}
          <div className={productTopRow.infoColumn}>
            <ProductInfo sku={data.product.sku} heading={heading} description={description} />
            <ProductHighlights items={data.product.pdpSpecHighlights ?? pdpSpecHighlights} />
            <ProductOptions
              groups={[
                { heading: "Fabric options", items: data.product.pdpFabricPills ?? data.category.fabricPills ?? [] },
                { heading: "Customization", items: data.product.pdpCustomizationPills ?? pdpCustomizationPills },
              ]}
            />
            <ProductCtas primaryCta={home.nav.cta} secondaryCta={home.nav.secondaryCta} />
            {relatedStyleTags ? (
              <ProductRelatedStyles tags={relatedStyleTags} categoryLabel={data.category.menuLabel} className="hidden xl:flex" />
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

        {relatedStyleTags ? (
          <div className="container-p block xl:hidden">
            <ProductRelatedStyles tags={relatedStyleTags} categoryLabel={data.category.menuLabel} topRule="none" />
          </div>
        ) : null}

        <Faq content={{ h2: "Top questions from B2B buyers", items: faqItems }} />
        {isPublished(data.product) ? <JsonLd data={faqSchema(faqItems)} /> : null}

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
