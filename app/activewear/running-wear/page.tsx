// app/activewear/running-wear/page.tsx
// A curated collection page (owner spec, 2026-09-03) -- a static sibling
// route to app/activewear/[category]/page.tsx, not a variant of it: this
// page renders content/activewear/running-wear.ts's own CuratedCollection
// shape, not a Category, and deliberately skips everything that assumes
// this page owns real products of its own. See CuratedCollection's own
// comment in content/activewear/types.ts for the full reasoning.
//
// Differences from the shared [category] PLP template, all deliberate:
// - No FabricOptions section (this brief's own content has no fabric
//   table -- the page has no fabric of its own, only an edit across other
//   categories' fabrics).
// - No CollectionPage/ItemList/Product schema (nothing of its own to
//   list; BreadcrumbList + FAQPage only, same as every category PLP's
//   own, but no collectionPageSchema() call).
// - `runningWear.cards` are real, "published" cross-links straight to
//   OTHER categories' own PLPs (`ProductGrid`/`ProductCard` render them
//   with zero code changes, see CuratedCollection's own comment), not
//   same-category child routes -- this file has no `generateStaticParams`
//   at all, since there is no `[style]` segment under this route for it
//   to enumerate.
// - Not registered in content/activewear/categories.ts, so it's invisible
//   to that registry's own consumers (the [category]/[style] PDP route
//   generator, that PLP template's own CollectionPage schema, and
//   app/sitemap.ts's category/PDP loops) -- this page's own sitemap entry
//   is added by hand in app/sitemap.ts instead, right beside the
//   homepage's.
import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Logo } from "@/components/Logo";
import { CategoryBanner } from "@/components/sections/CategoryBanner";
import { CategoryFilters } from "@/components/sections/CategoryFilters";
import { CategoryMetaStrip } from "@/components/sections/CategoryMetaStrip";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FINAL_CTA_MARKER_ID, ProductCtasMobileBar } from "@/components/sections/ProductCtas";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { WhatWeCover } from "@/components/sections/WhatWeCover";
import { header } from "@/components/ui/styles";
import { buildCtaSubline, categoryEntityFaq } from "@/content/activewear/pdpShared";
import { runningWear as data } from "@/content/activewear/running-wear";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  const canonical = `${SITE_URL}/activewear/${data.slug}`;
  const fullTitle = `${data.metaTitle} | ${SITE_NAME}`;
  return {
    // Same "bare string, root layout's title.template supplies the
    // suffix" rule as every category PLP's own generateMetadata -- see
    // that file's own comment.
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical,
    },
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

export default function RunningWearPage() {
  // Entity question first, then this page's own questions -- same merge
  // order as every category PLP (see app/activewear/[category]/page.tsx's
  // own comment). categoryEntityFaq() wants a `styleCards` fallback
  // source (for a category that omits `entityExampleStyles`) -- this page
  // always sets that field explicitly, so `data.cards` is passed through
  // only to satisfy the shape; its fallback branch never actually runs.
  const faqItems = [categoryEntityFaq({ ...data, styleCards: data.cards }), ...data.faqs];

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
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Activewear", href: "/activewear" },
            { label: data.menuLabel, href: `/activewear/${data.slug}` },
          ]}
          h1={data.h1}
          trustBullets={data.trustBullets}
        />
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Activewear", url: `${SITE_URL}/activewear` },
            { name: data.menuLabel, url: `${SITE_URL}/activewear/${data.slug}` },
          ])}
        />
        {/* No collectionPageSchema()/JsonLd here (deliberate) -- this page
            owns no products, so there is no ItemList of its own Product
            entities to describe. Its cards are real crawlable links to
            OTHER categories' own PLPs, which each already carry their own
            CollectionPage/ItemList schema on their own page. */}

        <div className="container-p">
          <CategoryMetaStrip
            categoryLabel={data.menuLabel}
            categorySubline={data.gridSubline}
            categorySublineMobile={data.gridSublineMobile}
            showGenderFilter={data.showGenderFilter}
          />
          <div id="plp-listing" className="flex flex-col gap-8 max-xl:pb-6 xl:pb-14 xl:flex-row xl:gap-12">
            <CategoryFilters activeSlug={data.slug} />
            <ProductGrid key={data.slug} cards={data.cards} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1440px]">
          <div className="h-px bg-[#e8ecf1] xl:mb-[120px]" />
        </div>

        {/* No FabricOptions section (deliberate) -- see this file's own
            header comment. WhatWeCover/TrustPoints order matches every
            category PLP's own (see that file's own comment for why). */}
        <WhatWeCover
          eyebrow={data.coverageEyebrow}
          heading={data.coverageHeading}
          items={data.coverageItems}
        />
        <TrustPoints heading={data.qualityHeading} subline={data.qualitySubline} points={data.qualityPoints} />

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

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />
    </>
  );
}
