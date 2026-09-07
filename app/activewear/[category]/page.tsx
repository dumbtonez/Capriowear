// app/activewear/[category]/page.tsx
// The reusable Activewear category PLP (product listing page) template.
// One dynamic route renders any category from content/activewear -- no
// category copy is ever typed into this file. Built section by section
// (owner, 2026-08-28): banner first, reusing the exact same Header/nav as
// the homepage. Metadata is generated from the same Category object the
// page renders, per this project's standing SEO/AEO rule -- never a second,
// hand-typed copy of the title/description.
import type { Metadata } from "next";

import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
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
import { categories } from "@/content/activewear/categories";
import { buildCtaSubline, categoryEntityFaq } from "@/content/activewear/pdpShared";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema, collectionPageSchema, faqSchema } from "@/lib/schema";

export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: PageProps<"/activewear/[category]">): Promise<Metadata> {
  const { category } = await params;
  const data = categories[category];
  if (!data) return {};

  const canonical = `${SITE_URL}/activewear/${data.slug}`;
  const fullTitle = `${data.metaTitle} | ${SITE_NAME}`;
  return {
    // A bare string here goes through the root layout's own title.template
    // ("%s | Capriowear") automatically, since this route is a nested child
    // segment of it -- data.metaTitle carries no suffix of its own, see the
    // comment on that field. og:title/twitter:title aren't templated, so
    // they're built with the suffix explicitly here instead (fullTitle).
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      // Explicit absolute string, same reasoning as every other page's own
      // canonical -- this app's internal route ("/activewear/...") isn't
      // the real public path ("/capriowear/activewear/..."), see
      // content/site.ts.
      canonical,
    },
    // No manual openGraph.images/twitter.images here, same rule as every
    // other page (docs/06-seo.md) -- app/opengraph-image.tsx's file
    // convention supplies the site's default share image automatically;
    // this page has no photography of its own that earns a custom one yet.
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

export default async function CategoryPage({ params }: PageProps<"/activewear/[category]">) {
  const { category } = await params;
  const data = categories[category];
  if (!data) return null;

  // Entity question first, then this category's own questions -- see
  // categoryEntityFaq()'s own comment (content/activewear/pdpShared.ts) for
  // why it's built here rather than stored as part of `data.faqs`.
  const faqItems = [categoryEntityFaq(data), ...data.faqs];
  // Published styles only, and OMITTED entirely when there are none (SEO
  // audit, 2026-09-07) -- same rule and same conditional wrapper as
  // app/teamwear/[sport]/page.tsx's own `publishedStyleCards` gate. Most
  // Activewear categories currently ship 100% draft (no team has confirmed
  // a style yet), so this page's own CollectionPage/ItemList block was
  // previously rendering unconditionally with an EMPTY itemListElement on
  // every one of them -- schema must never describe a PDP that doesn't
  // exist, and an empty ItemList is exactly that: a listing schema for a
  // list of nothing. The PLP itself stays live/indexed regardless; only
  // this one schema block is conditional.
  const publishedStyleCards = data.styleCards.filter((card) => card.status === "published");

  return (
    <>
      {/* Sitewide sticky header (default `sticky=true`, same as the
          homepage) -- the "gymshark approach" non-sticky trial
          (owner, 2026-08-29) was reverted (owner, 2026-08-30: "apply the
          same nav top behavior as applied on the home... to every new
          page"). CategoryFilters' own sticky top offset was reverted to
          match (see its own comment). */}
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

      {/* relative z-10 bg-paper: required for Footer's own sticky "reveal"
          trick to work (see Footer.tsx's header comment) -- Footer is
          `sticky bottom-0 z-0`, and without an opaque, higher-stacked
          `<main>` covering it, it just pins to the viewport's bottom edge
          for the entire scroll range instead of only appearing once real
          content has scrolled past it. This page's own `<main>` was
          missing both, so the footer showed through immediately at the
          top of the page instead of staying hidden until the real end --
          matches the same classes app/page.tsx's own `<main>` already
          uses for the identical reason.
          `pt-[72px] xl:pt-[87px]` (owner, 2026-09-07: Header is now
          `position: fixed`, a true overlay, no longer reserving its own
          space in flow -- see header.base's own comment) -- compensates
          so CategoryBanner starts exactly where it used to visually,
          without touching its own fragile fixed-height/absolute-position
          math (see CategoryBanner's own header comment for that history).
          Unlike Hero/ServicesHero, this page's first section does NOT get
          the true background-extends-under-the-header overlay treatment;
          every section after it still gets the real blur/tone-swap once
          scrolled, same as everywhere else.
          */}
      <main className="relative z-10 bg-paper pt-[72px] xl:pt-[87px]">
        <CategoryBanner
          breadcrumbItems={[
            { label: "Home", href: "/" },
            { label: "Activewear", href: "/activewear" },
            { label: data.menuLabel, href: `/activewear/${data.slug}` },
          ]}
          h1={data.h1}
          trustBullets={data.trustBullets}
        />
        {/* Structured data (SEO/AEO/GEO finalization pass, 2026-08-30):
            generated from the exact same values the page above already
            renders (the same breadcrumb items CategoryBanner shows, the
            same styleCards ProductGrid renders), never a second,
            hand-typed copy -- see docs/06-seo.md rule 1. faqSchema() for
            the FAQ section below follows the same rule. */}
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Activewear", url: `${SITE_URL}/activewear` },
            { name: data.menuLabel, url: `${SITE_URL}/activewear/${data.slug}` },
          ])}
        />
        {/* Omitted entirely when zero styles are published (SEO audit,
            2026-09-07) -- see `publishedStyleCards`' own comment above. */}
        {publishedStyleCards.length > 0 ? (
          <JsonLd
            data={collectionPageSchema(
              data.menuLabel,
              `${SITE_URL}/activewear/${data.slug}`,
              `${data.menuLabel} from ${ORGANIZATION.description}`,
              // Published styles only (owner spec, 2026-09-02, Leggings PLP
              // pilot: "ItemList should include only PUBLISHED styles; do not
              // list draft PDPs as if they exist") -- `ProductGrid` below
              // still renders every card, draft included (that's the whole
              // point of showing a draft style as "Coming soon"), but this
              // schema must never describe a PDP that doesn't actually exist
              // yet, same "schema matches what's really there" rule this
              // file's own header comment already states for the visible
              // grid.
              publishedStyleCards.map((card) => ({
                name: card.cardTitle,
                url: `${SITE_URL}${card.href}`,
                ...(card.image ? { image: `${SITE_URL}${card.image}` } : {}),
              })),
            )}
          />
        ) : null}
        {/* container-p wrapper here, not inside CategoryMetaStrip/
            CategoryFilters/ProductGrid themselves -- all three are reusable
            pieces sharing this one page margin, not each carrying their
            own. CategoryMetaStrip renders full-width for layout purposes
            (its chip row is flush with the page's own right margin, same
            edge as the grid's own right edge), but its own text block is
            indented past the sidebar at xl -- Figma (node 406:3075,
            re-checked 2026-08-29) positions this row's text starting at
            the SAME x as the product grid (x=380, i.e. 252px sidebar +
            48px gap past the container's own left edge), with nothing
            above the "Categories" panel. See CategoryMetaStrip's own
            header comment. */}
        <div className="container-p">
          <CategoryMetaStrip
            categoryLabel={data.menuLabel}
            categorySubline={data.gridSubline}
            categorySublineMobile={data.gridSublineMobile}
            showGenderFilter={data.showGenderFilter}
            defaultChip={data.defaultGenderFilter}
          />
          {/* flex-col below xl, flex-row at xl -- no mobile Figma frame
              exists for this row yet (CategoryFilters' own fixed 252px width
              plus ProductGrid's 3-column grid has no graceful shrink the way
              CategoryBanner's wrapping text does), so this is a safe
              structural fallback, not an invented mobile design: stacking
              the sidebar above the grid, rather than beside it, is what
              keeps every real value (252px sidebar, product card ratios)
              exactly as Figma specifies instead of guessing at responsive
              sizes nothing has confirmed yet. gap-8 (32px) below xl (stacked,
              vertical spacing, no Figma frame to check against); xl:gap-12
              (48px) at desktop -- Figma's own gap between the Filters and
              Products List frames (node 561:4684), corrected from a
              previously-unchecked 32px.
              Bottom padding down to the section divider below is 24px on
              mobile (owner report, 2026-08-30: "the separator under the
              pagination should have 24px gap only"), was pb-14 (56px) at
              every breakpoint -- xl keeps that confirmed desktop value.
              id="plp-listing" (internal review, 2026-08-30): the mobile
              Filter FAB (CategoryFilters.tsx) watches this element via
              IntersectionObserver to know when it should show itself --
              see that file's own comment for the bug this fixes (the FAB
              was `position: fixed` with no scoping at all, so it floated
              over every section on the page, including the Footer's own
              social links, not just this listing area). */}
          <div id="plp-listing" className="flex flex-col gap-8 max-xl:pb-6 xl:pb-14 xl:flex-row xl:gap-12">
            <CategoryFilters activeSlug={data.slug} />
            {/* key={data.slug}: ProductGrid holds its own page-number
                client state -- keying by category forces a full remount
                on navigation instead of reusing a stale page index
                against a different category's (possibly shorter)
                card list. */}
            <ProductGrid key={data.slug} cards={data.styleCards} />
          </div>
        </div>

        {/* Section divider (owner request, 2026-08-30): 56px gap above
            from the product grid -- an explicit owner number, independent
            of whatever section follows (this divider and its gaps are the
            page's own concern, same as every other inter-section gap on
            this page). Same #e8ecf1 hairline colour as CategoryFilters/
            ProductGrid's own borders, not a new colour. The 56px gap
            comes from the filters+grid row's own pb-14 above (was
            pb-16/64px -- corrected to 56px here, since that padding sits
            directly against this divider with nothing else between them)
            -- not a second, stacked margin on the divider itself, which
            would have doubled it (found live: measured 120px, not 56px,
            before this fix).
            1440px wide (owner correction, 2026-08-30: "the divider under
            products is 1440px in width") -- corrects an earlier pass
            that matched this to FabricOptions' own 1164px column
            instead; this divider is its own, wider element, edge to edge
            of the site's real page cap (max-w-[1440px], px-0), not
            inset to any one section's content width.
            Bottom margin corrected to xl:mb-[120px] with none below xl
            (owner, 2026-08-31: "from top of the customization section make
            it 120px") -- was xl:mb-[72px] (owner report, 2026-08-30: "what
            we cover should have 72px gap from the top of heading to the
            top section, there is extra space"), itself a correction of an
            earlier flat mb-[120px] at every breakpoint that was stale from
            before WhatWeCover was reordered to be this page's first
            section (5as). Reusing the literal 120px value again here is a
            deliberate re-confirmation, not a revert of that 2026-08-30 fix
            -- that correction addressed a real double-counted gap (mobile
            already supplies its own top padding via a confirmed Figma
            frame, see whatWeCover's own `section` recipe); this later
            request is a fresh, explicit number for desktop specifically,
            where WhatWeCover still has NO top padding of its own and
            relies entirely on this margin. */}
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="h-px bg-[#e8ecf1] xl:mb-[120px]" />
        </div>

        {/* Order swapped 2026-08-30 (owner: "make the 3rd section...
            1st and [FabricOptions] as 3rd") -- WhatWeCover first,
            FabricOptions last, TrustPoints unchanged in the middle. Each
            section's own top/bottom padding was reassigned to match:
            WhatWeCover (now first) has no top padding of its own -- the
            divider above already supplies that gap -- and its own
            bottom padding is the 52px half of the 104px gap to
            TrustPoints, not page-end spacing anymore. FabricOptions (now
            last) gained a 52px top padding to pair with TrustPoints'
            own 52px above it, and its own bottom padding became the
            page-end spacing (120px) WhatWeCover used to carry. See each
            recipe's own `section` key for the exact values. */}
        <WhatWeCover
          eyebrow={data.coverageEyebrow}
          heading={data.coverageHeading}
          items={data.coverageItems}
        />
        <TrustPoints heading={data.qualityHeading} subline={data.qualitySubline} points={data.qualityPoints} />
        <FabricOptions
          eyebrow={data.fabricEyebrow}
          heading={data.fabricHeading}
          options={data.fabricOptions}
          weightTiers={data.weightTiers}
          weightTiersHeaders={data.weightTiersHeaders}
          note={data.fabricNote}
        />

        {/* FAQ (Figma node 579:5660 layout, node 579:5753 full Q&A copy,
            2026-08-30) -- owner request: "Use the same component used on
            home." Reuses Faq/Accordion verbatim, same as FinalCta below
            reuses that component. Entity question built per category, not
            stored (entity-intro spec, 2026-09-01) -- categoryEntityFaq()
            reads this category's own menuLabel/styleCards and ends with
            companyIdentity verbatim, replacing what used to be a hand-typed
            FaqEntry duplicated (with slightly different wording) in every
            category's own `faqs` array. faqSchema() runs on the exact same
            merged list the accordion renders, so the two can never drift
            apart -- same standing rule as the homepage's own FAQ (see
            app/page.tsx's own comment) and the PDP's own FAQ. */}
        <Faq content={{ h2: data.faqHeading, items: faqItems }} />
        <JsonLd data={faqSchema(faqItems)} />

        {/* Closing CTA (Figma node 579:5710, "CTA Bottom", 2026-08-30) --
            the exact same FinalCta component/heading/button/ticker the
            homepage already uses twice (content/home.ts's own
            finalCta.h2/cta and complianceTicker), reused verbatim rather
            than a second, near-identical component -- only the subline
            is category-specific (buildCtaSubline(data.ctaReferenceNoun)). Sits directly after
            the FAQ section above, matching Figma's own frame order.
            compactMobileTop (2026-08-30, owner: "Standard on every order"
            should have a 72px gap from the section above it): unlike the
            homepage's own ticker'd usage (which follows Exhibitions), this
            one follows Faq, whose own mobileSection already supplies the
            standard pb-[72px] -- see FinalCta's own prop comment. */}
        {/* Invisible marker, watched by ProductCtasMobileBar's own
            IntersectionObserver (owner spec, 2026-09-02, applied here to
            match the PDP: "when it gets to the cta section, remove the
            fixed cta automatically") -- placed immediately before FinalCta
            so the bar slides away as this section is approached, not only
            once the whole page (Footer) is reached. */}
        <div id={FINAL_CTA_MARKER_ID} aria-hidden="true" />
        <FinalCta
          content={{
            h2: home.finalCta.h2,
            subline: buildCtaSubline(data.ctaReferenceNoun),
            cta: home.finalCta.cta,
          }}
          ticker={home.complianceTicker}
          compactMobileTop
        />

        {/* No separate spacer here (owner report, 2026-09-01: "the cta
            bottom still has a lot of gap not 60px") -- a previous version
            of this added its own extra `h-[60px]` reserve on top of
            FinalCta's own `mobileCtaBlock` bottom padding (already 60px,
            with a ticker present), doubling the real gap to 120px. That
            padding alone is the "60px gap from the bottom" the owner
            asked for -- nothing extra needed between it and the bar. */}

        {/* ProductCtasMobileBar, the literal last child of `<main>` (owner,
            2026-09-02: "let's use a sticky CTA same as PDP" / "it should be
            applied to both plp and pdp") -- the exact same component the
            PDP uses (components/sections/ProductCtas.tsx), not a second,
            hand-duplicated copy of its markup: `position: sticky bottom-0`
            so it releases cleanly at the Footer boundary (no overlap with
            Footer's own social icons), plus the same IntersectionObserver-
            driven auto-hide as it approaches FinalCta (the marker right
            above), reused verbatim rather than reimplemented per page. This
            page has no desktop row of its own to render (the PLP's own
            desktop CTAs are the header and the closing FinalCta above), so
            only `ProductCtasMobileBar` (not `ProductCtas`) is used here. */}
        <ProductCtasMobileBar primaryCta={home.nav.cta} />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />
    </>
  );
}
