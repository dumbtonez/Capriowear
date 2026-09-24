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
import { ComparisonTable } from "@/components/sections/ComparisonTable";
import { FabricOptions } from "@/components/sections/FabricOptions";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { FINAL_CTA_MARKER_ID, ProductCtasMobileBar } from "@/components/sections/ProductCtas";
import { SpecTables } from "@/components/sections/SpecTables";
import { RelatedCategories } from "@/components/sections/RelatedCategories";
import { TrustPoints } from "@/components/sections/TrustPoints";
import { WhatWeCover } from "@/components/sections/WhatWeCover";
import { footer, header } from "@/components/ui/styles";
import { buildCtaSubline, categoryEntityFaq } from "@/content/activewear/pdpShared";
import { capriosportsHome } from "@/content/capriosports/home";
import { home, liftingGearsMegaMenu } from "@/content/home";
import { CAPRIOSPORTS_ORGANIZATION } from "@/content/capriosports/organization";
import { GEAR_DEFAULT_OG_IMAGE, ORGANIZATION, SITE_URL, siteNameForGroup } from "@/content/site";
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
  const siteName = siteNameForGroup(data.group);
  const fullTitle = `${data.metaTitle} | ${siteName}`;
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
              menuGroups={liftingGearsMegaMenu}
              basePath="/lifting-gears"
              ariaLabel="Lifting Gears categories"
            />
            <ProductGrid key={data.slug} cards={data.styleCards} />
          </div>
        </div>

        {/* Section divider under the product grid/pagination (owner spec,
            2026-09-16, Wraps, Straps & Sleeves: "follow same in
            capriowear") -- same hairline + xl:mb-[120px] pattern
            app/capriowear/activewear/[category]/page.tsx's own divider
            already uses under its own product grid, same #e8ecf1 colour,
            same 1440px-wide wrapper. Every category renders this divider
            regardless of `comparisonTable` -- it's the listing's own
            boundary, not specific to that field. This is the ONLY divider
            for a category with no `comparisonTable` (e.g. Weight Lifting
            Belts) -- it sits directly above WhatWeCover exactly as it did
            before `comparisonTable` existed, confirmed unchanged live. */}
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="h-px bg-[#e8ecf1] xl:mb-[120px]" />
        </div>

        {/* Optional comparison table (owner spec, 2026-09-16, Wraps, Straps
            & Sleeves; moved below the style listing 2026-09-16 -- "should
            come under the product tiles," was originally directly under the
            hero). Every other category leaves `comparisonTable` unset and
            renders nothing extra here.
            No closing divider below (owner spec, 2026-09-16: "section end
            should not have a separator... 0 space under this section") --
            a divider was tried here first, then removed on explicit
            instruction; `ComparisonTable`'s own section shell already
            carries no bottom padding and `WhatWeCover` below carries no top
            padding of its own (see that recipe's own comment), so removing
            the divider (rather than just hiding it) is what actually
            yields a real, flush 0px gap between the two, not a hidden
            element still reserving space. */}
        {data.comparisonTable ? <ComparisonTable content={data.comparisonTable} /> : null}

        {/* Order: Fabric options -> Customization -> Trust/proof (owner
            spec, 2026-09-22, site-wide PLP reorder -- see the Activewear
            category route's own comment on this same change). Safe to
            move ahead of WhatWeCover unconditionally: no lifting-gears
            category sets both `comparisonTable` and `fabricOptions` (the
            two categories with `comparisonTable` -- Gloves & Grips,
            Wraps/Straps/Sleeves -- both leave `fabricOptions` unset, so
            this block still renders nothing for them and the flush
            ComparisonTable->WhatWeCover gap above is unaffected; only
            Weight Lifting Belts, which has no `comparisonTable`, actually
            gains a real FabricOptions section here). Optional -- a
            category with no fabric-options table (e.g. Wraps, Straps &
            Sleeves, which uses `specTables` below instead) omits
            `fabricOptions` entirely and renders nothing here. */}
        {data.fabricOptions ? (
          <FabricOptions
            eyebrow={data.fabricEyebrow!}
            heading={data.fabricHeading!}
            options={data.fabricOptions}
            optionsHeaders={data.fabricOptionsHeaders}
            weightTiers={data.weightTiers}
            weightTiersHeaders={data.weightTiersHeaders}
            structuredBlock={data.structuredBlock}
            note={data.fabricNote!}
          />
        ) : null}
        {/* `leading` when `fabricOptions` is unset: the block above then
            renders nothing, so this section is effectively first here too
            (same as running-wear), and needs that role's own padding
            (WhatWeCover.tsx's own comment) instead of assuming a real
            Fabric section precedes it -- otherwise the flush Comparison
            Table->WhatWeCover gap above breaks for Gloves & Grips and
            Wraps/Straps/Sleeves specifically. */}
        <WhatWeCover
          eyebrow={data.coverageEyebrow}
          heading={data.coverageHeading}
          items={data.coverageItems}
          leading={!data.fabricOptions}
        />
        <TrustPoints heading={data.qualityHeading} subline={data.qualitySubline} points={data.qualityPoints} />
        {/* Optional array of standalone spec tables (owner spec, 2026-09-16,
            Wraps, Straps & Sleeves) -- every other category leaves
            `specTables` unset and renders nothing extra here. */}
        {data.specTables && data.specTables.length > 0 ? (
          <SpecTables tables={data.specTables} note={data.specTablesNote} />
        ) : null}

        {/* Cross-category internal links (owner, 2026-09-23), last before
            the dark FAQ -- see RelatedCategories.tsx. Renders nothing for
            an empty `relatedLinks`. */}
        <RelatedCategories links={data.relatedLinks} afterFlushSection={Boolean(data.specTables?.length)} />
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
