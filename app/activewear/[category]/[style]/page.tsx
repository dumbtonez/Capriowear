// app/activewear/[category]/[style]/page.tsx
// The Activewear PDP (product detail page) template -- built section by
// section (owner, 2026-08-31 onward), starting with the breadcrumb. One
// dynamic route renders any real style from any real category's own
// `styleCards`, matching the PLP's own "one template, all copy from data"
// pattern (see app/activewear/[category]/page.tsx). Segment renamed
// `[product]` -> `[style]` (owner spec, 2026-08-31: "app/activewear/
// [category]/[style]/page.tsx") -- no behavior change, the route already
// worked this way, just the URL param's own name.
//
// Adding a new style PDP is adding one entry to a category's own
// `styleCards` array (content/activewear/<category>.ts) -- no new route,
// no new schema code, no new metadata code. Adding a whole new category is
// adding its own content file to content/activewear/categories.ts's
// registry, same as the PLP already works.
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/Breadcrumb";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { ProductCategoryLinks } from "@/components/sections/ProductCategoryLinks";
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
import { categories } from "@/content/activewear/categories";
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
import { breadcrumbSchema, faqSchema, productSchema } from "@/lib/schema";

// Published styles only (owner spec, 2026-09-02, Leggings PLP pilot:
// "Only PUBLISHED styles get a PDP route generated, appear in the
// sitemap, and are indexable") -- a draft style still shows as a
// (non-clickable) card on the PLP, but has no real PDP content yet, so it
// gets no route at all here.
export function generateStaticParams() {
  return Object.values(categories).flatMap((category) =>
    category.styleCards
      .filter((card) => card.status === "published")
      .map((card) => ({ category: category.slug, style: card.slug })),
  );
}

// A slug not returned by `generateStaticParams` above (every draft style,
// plus anything that doesn't exist at all) 404s immediately instead of
// falling through to an on-demand dynamic render -- `getData` below would
// happily find a draft style by slug (it's still a real entry in
// `styleCards`), so without this a direct hit on a draft style's URL
// would render a thin, half-empty page instead of a clean 404. Combined
// with the `notFound()` calls below (kept as defense in depth, not dead
// code -- `dynamicParams` only governs the App Router's own fallback
// behavior, not a guarantee no other code path could reach this
// component with a draft slug).
export const dynamicParams = false;

function getData(categorySlug: string, styleSlug: string) {
  const category = categories[categorySlug];
  if (!category) return null;
  const product = category.styleCards.find((card) => card.slug === styleSlug);
  if (!product) return null;
  return { category, product };
}

export async function generateMetadata({
  params,
}: PageProps<"/activewear/[category]/[style]">): Promise<Metadata> {
  const { category, style } = await params;
  const data = getData(category, style);
  if (!data || data.product.status !== "published") return {};

  const shortTitle = data.product.pdpTitle ?? data.product.cardTitle;
  // No " | Capriowear" suffix here -- same reasoning as Category.metaTitle's
  // own comment: this route is a nested child segment of the root layout,
  // whose own title.template ("%s | Capriowear") applies automatically.
  const title = data.product.pdpMetaTitle ?? `Custom ${shortTitle} Manufacturer`;
  const description = data.product.pdpMetaDescription ?? data.product.pdpDescription ?? data.product.cardSubline;
  const canonical = `${SITE_URL}${data.product.href}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  // First real gallery image, once `images` carries real `src` paths --
  // today that field is alt-only (placeholder empty state), so `image` is
  // `undefined` and `openGraph.images` is omitted entirely below, same as
  // every other page (docs/06-seo.md: "never also set openGraph.images...
  // manually -- the file-convention one wins and a manual entry just goes
  // stale"). This previously hardcoded a `DEFAULT_OG_IMAGE` fallback here,
  // duplicating what `app/opengraph-image.tsx`'s own file convention
  // already supplies automatically -- found live during the pre-ship SEO
  // audit, 2026-09-02.
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

export default async function StylePage({ params }: PageProps<"/activewear/[category]/[style]">) {
  const { category, style } = await params;
  const data = getData(category, style);
  if (!data || data.product.status !== "published") notFound();

  const productTitle = data.product.pdpTitle ?? data.product.cardTitle;
  const heading = data.product.pdpHeading ?? productTitle;
  const description = data.product.pdpDescription ?? data.product.cardSubline;

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Activewear", href: "/activewear" },
    { label: data.category.menuLabel, href: `/activewear/${data.category.slug}` },
    { label: productTitle, href: data.product.href },
  ];

  // Entity question first, then this style's own 2-3 questions, then the
  // shared operational block last (owner spec) -- one merged array feeds
  // both the visible Faq render below and faqSchema(), so they can never
  // drift apart. Rendered/schema'd together as one FAQ, not the two
  // separate arrays they're authored as.
  const faqItems = [categoryEntityFaq(data.category), ...(data.product.faqs ?? []), ...pdpFaqOperational];

  // Sibling PDP links (SEO audit, 2026-09-02, rule 6) -- published styles
  // only, excluding this one (a draft sibling has no PDP route, so linking
  // to one would be a dead link). See ProductCategoryLinks.tsx's own
  // header comment.
  const siblingStyles = data.category.styleCards
    .filter((card) => card.status === "published" && card.slug !== data.product.slug)
    .map((card) => ({ label: card.pdpTitle ?? card.cardTitle, href: card.href }));

  // Absolute URL for Product schema's own `image` (SEO audit, 2026-09-07):
  // `images[0].src` is root-relative (e.g. "/products/x.jpg"), same as
  // every other internal `href` on this site, but `lib/schema.ts`'s own
  // `ProductSchemaInput.image` comment requires a real absolute URL --
  // schema.org's Product.image isn't resolved against `metadataBase` the
  // way `openGraph.images` is, so a root-relative value would ship into
  // the JSON-LD unresolved. Undefined today (no real photo yet on any
  // style), so this was previously masked; fixed ahead of the first real
  // photo landing, not after.
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

      {/* relative z-10 bg-paper: required for Footer's own sticky "reveal"
          trick to work (see Footer.tsx's header comment, and the identical
          fix already documented on the PLP -- app/activewear/[category]/
          page.tsx's own header comment) -- without it Footer's `sticky
          bottom-0 z-0` shows through immediately at the top of the page
          instead of staying hidden until real content has scrolled past
          it. Found live while verifying ProductGallery below (2026-08-31),
          pre-existing on this page since its own first build.
          `pt-[72px] xl:pt-[87px]`: compensates for Header now being
          `position: fixed` (owner, 2026-09-07) -- see
          app/activewear/[category]/page.tsx's own `<main>` comment for the
          full reasoning, identical here. */}
      <main className="relative z-10 bg-paper pt-[72px] xl:pt-[87px]">
        {/* Visible strip hidden on mobile only, CSS-only (owner request,
            2026-08-31: "hide the breadcrumb visually on mobile only...
            Never conditionally render it out of the DOM"). `hidden
            md:block` keeps the exact same markup mounted at every
            viewport -- only its display toggles. The schema below is
            deliberately NOT inside this hidden wrapper, and doesn't read
            from it either (it's built straight from breadcrumbItems, the
            same data feeding the visible trail) -- hiding the strip can
            never touch it. */}
        <Breadcrumb items={breadcrumbItems} className="hidden md:block" />
        <JsonLd
          data={breadcrumbSchema(
            breadcrumbItems.map((item) => ({
              name: item.label,
              url: item.href === "/" ? SITE_URL : `${SITE_URL}${item.href}`,
            })),
          )}
        />
        {/* Product schema (owner spec, 2026-08-31/09-01): name/description/
            brand/manufacturer/material/image, generated from the exact
            same fields the page renders above and below -- never a second,
            hand-typed copy. No `offers`/`priceSpecification` anywhere:
            this is a made-to-order B2B product with no public price, so
            Product stays schema-valid without an Offer rather than
            publishing invented pricing (same "no price data" precedent
            already set by the PLP's own CollectionPage/Product entities,
            lib/schema.ts's collectionPageSchema()). */}
        <JsonLd
          data={productSchema({
            name: heading,
            description,
            image: productImage,
            material: data.product.material,
          })}
        />

        {/* ProductGallery (Figma node 634:4961 desktop / 638:860 mobile,
            2026-08-31) + ProductInfo (node 634:4988/638:2541) -- gallery
            beside the text block on desktop, gallery above it on mobile
            (ProductInfo's own header comment).
            Desktop top gap is `xl:pt-6` (24px, owner correction, 2026-09-01:
            "Desktop breadcrumbs spacing from top of image is 24px") --
            supersedes the earlier `xl:pt-0` read off the raw Figma frame
            metadata (634:4926: breadcrumb's own "Levels Container" ending
            at the same y as this row's own Content frame, 634:4960):
            trusting the owner's direct, currently-visible design over that
            metadata reading. Real mobile is `pt-0` (owner, 2026-09-01: "no
            gap from the nav and the image") -- the breadcrumb is hidden
            below `md` (`Breadcrumb`'s own `hidden md:block`), so this row
            sits directly under Header there; ProductGallery's own mobile
            image is the first thing in it, so zero top padding here means
            zero gap from the header to the image (ProductInfo below still
            gets its own breathing room from `ProductGallery.mobileRoot`'s
            own height + this row's `gap-8`, unaffected). `md:pt-6` (owner,
            2026-09-07: "breadcrumbs on the tablet pdp should have the same
            gap to the image as it has from the top") matches `xl:pt-6` --
            `breadcrumb.nav`'s own `pt-8`/`pb-2` give a flat 32px above the
            breadcrumb at every width it's visible; below `md:pt-6` this
            row's `pb-2` (8px) + `pt-6` (24px) also totalled 32px, matching.
            The row itself is 700px gallery + a real 66px gap
            + a real 514px text column (766 - 700), not gallery + flex-1 --
            `xl:gap-[66px]` on this row, `xl:w-[514px]` fixed on the text
            column below, replacing the earlier `xl:gap-12`/flex-1
            placeholders. Gallery only renders for a product with real
            gallery data (`images`) -- same "only the first real Figma
            frame gets real copy" pattern as `sku`/`pdpHeading` below.
            Plain `container-p` at both breakpoints for the row itself
            (ProductGallery's own mobile markup breaks back out of it --
            see `productGallery.mobileRoot`'s own comment) --
            `xl:container-p` is NOT valid here: `container-p` is a
            hand-written CSS class (app/globals.css), not a Tailwind
            utility, so Tailwind can't generate a responsive variant of it
            the way it can for a real utility class. */}
        {/* gap-6 (24px, owner correction, 2026-09-01: "the gap between
            CAP-LEG and the top should be 24px") -- was gap-8/32px; below
            `xl` this row is stacked (flex-col), so this is the vertical
            gap from the gallery image's own bottom edge to the SKU text.
            `xl:gap-[66px]` overrides it in the horizontal direction at
            desktop, unaffected. */}
        <div className="container-p flex flex-col gap-6 pt-0 md:pt-6 xl:flex-row xl:items-start xl:gap-[66px] xl:pt-6">
          {data.product.images ? (
            <ProductGallery images={data.product.images} productTitle={productTitle} />
          ) : null}
          {/* ProductInfo + ProductHighlights (node 634:5393/638:2547,
              2026-09-01) share one column so this row's own `gap-8` (32px)
              also supplies the gap BETWEEN them -- Figma measures that same
              32px at both breakpoints (ProductInfo's own frame height vs.
              this list's own y-offset), so no extra margin is needed here.
              `xl:w-[514px]` (not flex-1, see above) with `min-w-0` kept for
              safety even though the width is now fixed -- matches
              productGallery.mainWrap's own reasoning for why a column
              beside a fixed-width sibling still allows shrinking below its
              content's intrinsic width. */}
          <div className="flex w-full min-w-0 flex-col gap-8 xl:w-[514px] xl:flex-none">
            <ProductInfo sku={data.product.sku} heading={heading} description={description} />
            <ProductHighlights items={pdpSpecHighlights} />
            {/* ProductOptions (node 634:5034/645:2905, 2026-09-01) --
                "Fabric options" (category-level, `data.category.fabricPills`)
                + "Customization" (shared across every PDP,
                `pdpCustomizationPills`) pill groups. Same column, same
                shared `gap-8` reasoning as ProductHighlights above. */}
            <ProductOptions
              groups={[
                { heading: "Fabric options", items: data.category.fabricPills },
                { heading: "Customization", items: pdpCustomizationPills },
              ]}
            />
            {/* ProductCtas (node 634:5065 desktop / 638:1645 mobile,
                2026-09-01) -- desktop's button pair sits in this same
                column, so the column's own `gap-8` supplies the requested
                32px gap above it. This renders the desktop row only --
                the mobile bar is a separate component, `ProductCtasMobileBar`
                (owner bug report, 2026-09-02: it was overlapping Footer's
                social icons), rendered as the literal last child of `<main>`
                instead so it can `position: sticky` and release cleanly at
                the Footer boundary (see ProductCtas.tsx's own header
                comment, and the render further down this file). */}
            <ProductCtas primaryCta={home.nav.cta} secondaryCta={home.nav.secondaryCta} />
            {/* ProductRelatedStyles (node 634:5070 desktop / 643:2660
                mobile, 2026-09-01) -- under ProductCtas in this same
                column; the column's own shared `gap-8` supplies the gap
                above it, same as every other child here. Only renders for
                a style with real tag copy (`relatedStyleTags`), same
                "only the first real Figma frame gets real copy" pattern
                already used by images/sku/pdpHeading above.
                `hidden xl:flex` (owner correction, 2026-09-02: reposition
                this on mobile to sit under TrustPoints instead) -- desktop
                keeps this position unchanged; mobile renders a second,
                CSS-hidden-elsewhere instance further down the page instead
                (see the one right after `TrustPoints` below), same "two
                real breakpoint-specific instances, not one repositioned
                via CSS alone" pattern already used by ProductGallery/
                ProductCustomizeSteps for a layout that genuinely differs
                by breakpoint.
                `xl:flex`, NOT `xl:block` (real bug, found live, owner
                report: "related style title and chips space is missing"):
                `productRelatedStyles.root` is itself `flex flex-col gap-4`
                -- the `gap` utility only has any effect on a flex/grid
                container. `hidden xl:block` clobbered that at `xl` (same
                specificity, `block` happened to win the cascade over the
                recipe's own `flex`, the identical class of bug already
                documented elsewhere in this project for `hidden
                xl:inline-flex`), so this instance silently rendered as a
                block box with a computed `gap: 16px` that did nothing --
                confirmed live: heading/list sat flush with a real 0px
                gap despite `getComputedStyle` reporting 16px. `xl:flex`
                fixes visibility AND display in one utility, so there's
                nothing left to clobber it.
                Moved `md:flex` -> `xl:flex` (owner, 2026-09-07: "make it
                72px only on both mobile and tablet"). `md:flex` was itself
                a deliberate 2026-09-04 change (see `ProductInfo`'s own
                entry in docs/03-component-library.md, "Tablet width" note)
                that coupled this instance's visibility to the gallery/text
                column's own `md:`-width two-column switch, so it would
                appear inside that column as soon as the column split did.
                Today's request reverses just this one piece: the 72px/
                no-divider instance below (not this bordered one) should be
                what shows through tablet, so this instance now waits for
                `xl` again -- the column split itself (`md:flex-row`, etc.)
                is untouched. */}
            {data.product.relatedStyleTags ? (
              <ProductRelatedStyles tags={data.product.relatedStyleTags} className="hidden xl:flex" />
            ) : null}
          </div>
        </div>

        {/* ProductSpecifications (Figma node 634:5092, "Content",
            2026-09-02) -- standalone, full-width datasheet sitting between
            the top gallery/info row above and ProductCustomizeSteps below,
            per node ID order (634:5070 ProductRelatedStyles pill row inside
            the text column, 634:5092 this section, 634:5153
            ProductCustomizeSteps). Heading/subline are shared PDP copy
            (pdpShared.ts); rows are this style's own real spec facts --
            only renders for a style that supplies them, same "only the
            first real Figma frame gets real copy" pattern used throughout
            this page. */}
        {data.product.specifications ? (
          <ProductSpecifications
            heading={pdpSpecificationsCopy.heading}
            subline={pdpSpecificationsCopy.subline}
            rows={data.product.specifications}
            image={data.product.specificationsImage}
          />
        ) : null}

        {/* ProductCustomizeSteps (Figma node 634:5153 desktop / 643:2714
            mobile, "How We Customize", 2026-09-01) -- owner: "already built
            the same component on homepage," i.e. `HowItWorks`'s own
            CapabilityCard row + chevron-scroller (desktop) / CardCarousel
            (mobile) mechanism, reused verbatim with this section's own
            content and sizing (see productCustomizeSteps' own recipe
            comment for how its card width/type sizes differ from
            HowItWorks'). Shared across every PDP, not category- or
            style-specific -- content lives in pdpShared.ts. Node ID order
            (634:5070 ProductRelatedStyles above, 634:5153 this section,
            634:5189 TrustPoints below) places it here, between the two. */}
        {/* align="left" trial (owner, 2026-09-04: "the title and eyebrow
            might can align on the left, let's try it on one page and lock
            if all good") -- scoped to this one published style only
            (`high-waisted-compression`), not sitewide, until confirmed;
            every other PDP keeps the component's own default `"center"`. */}
        <ProductCustomizeSteps
          content={pdpCustomizationSteps}
          align={data.product.slug === "high-waisted-compression" ? "left" : "center"}
        />

        {/* TrustPoints (Figma node 634:5189, 2026-09-01) -- the exact same
            "Built to pass the squat test" section the PLP already renders
            (app/activewear/[category]/page.tsx), same component, same
            category copy (qualityHeading/qualitySubline/qualityPoints),
            placed right under the "How We Customize" section above
            (ProductCustomizeSteps), per owner spec. Not a PDP-specific copy
            of this section -- only the desktop side padding differs (owner,
            2026-09-01: "80px gap from right and left" here, vs. the PLP's
            own 138px default), via the `sidePadding` variant. */}
        <TrustPoints
          heading={data.category.qualityHeading}
          subline={data.category.qualitySubline}
          points={data.category.qualityPoints}
          sidePadding="pdp"
        />

        {/* ProductRelatedStyles, mobile/tablet instance (owner correction,
            2026-09-02: "reposition it on mobile to under the built to pass
            section") -- the desktop instance above (inside the gallery/info
            row's own text column) stays where it was; this is a second,
            `block xl:hidden` copy of the same component/data placed here
            instead, not the same DOM node repositioned via CSS (the two
            breakpoints genuinely sit in different places in the page flow,
            not just visually offset). `container-p` supplies the page-level
            side inset the text column's own wrapper gave it before.
            Was `block md:hidden` until 2026-09-07 (owner: "make it 72px
            only on both mobile and tablet") -- `md:hidden` was itself a
            deliberate 2026-09-04 change, paired with the sibling instance
            above, to match this section's visibility to the gallery/text
            column's own tablet-width two-column switch. Moved to
            `xl:hidden` so this 72px/no-divider treatment now covers
            tablet too, not just phone widths -- see the sibling instance's
            own comment above for the full reasoning. */}
        {data.product.relatedStyleTags ? (
          <div className="container-p block xl:hidden">
            <ProductRelatedStyles tags={data.product.relatedStyleTags} topRule="none" />
          </div>
        ) : null}

        {/* FAQ (owner spec, 2026-08-31): reuses the same Faq/Accordion
            component the PLP already renders verbatim -- not a PDP-specific
            copy of that markup. Deliberately NOT the PLP's own FAQ content:
            the PLP answers category/range questions, this answers
            this-style questions (entity + this style's own + the shared
            operational block, see `faqItems` above). Heading reuses the
            PLP's own copy verbatim (owner, 2026-09-01: change the title to
            "Top questions from B2B buyers") -- was a PDP-specific
            "Questions about this style". */}
        <Faq content={{ h2: "Top questions from B2B buyers", items: faqItems }} />
        <JsonLd data={faqSchema(faqItems)} />

        {/* Closing CTA (owner spec, 2026-09-01: "put the same cta from
            PLP") -- the exact same FinalCta component/heading/button/ticker
            the PLP renders after its own FAQ (app/activewear/[category]/
            page.tsx), reused verbatim rather than a second, near-identical
            component. Subline is built from this category's own
            `ctaReferenceNoun`, the PDP always using its own category's
            noun rather than the individual style name (owner spec,
            2026-09-04) -- not PDP-specific copy. compactMobileTop:
            same reasoning as the PLP's own usage -- this follows Faq, whose
            mobileSection already supplies the standard pb-[72px] gap. */}
        {/* Invisible marker, watched by ProductCtasMobileBar's own
            IntersectionObserver (owner spec, 2026-09-02: "when it gets to
            the cta section, remove the fixed cta automatically") -- placed
            immediately before FinalCta so the bar slides away the instant
            this section is reached, not only once the whole page (Footer)
            is reached. */}
        {/* ProductCategoryLinks (SEO audit, 2026-09-02, rule 6) -- a real
            "Back to all [Category]" link plus any other published sibling
            styles, so every PDP has at least one crawlable upward link at
            every breakpoint (the breadcrumb's own upward link is
            CSS-hidden below `md`, see Breadcrumb's own usage above). Plain,
            undesigned markup -- no Figma frame for this block. */}
        <ProductCategoryLinks
          categoryLabel={data.category.menuLabel}
          categoryHref={`/activewear/${data.category.slug}`}
          siblings={siblingStyles}
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
        />

        {/* ProductCtasMobileBar -- the literal last child of `<main>` (owner
            bug report, 2026-09-02: "the fixed cta, overlapping the social
            icons on the footer, it should not do that"). `position: sticky
            bottom-0` (ProductCtas.tsx's own header comment, and the
            `productCtas.mobileBar` recipe's own comment) means it occupies
            its own real 60px of space here in normal flow -- no separate
            reserved-space spacer needed any more (previously a plain
            `bg-ink` div doing that job for the old `position: fixed` bar,
            which had none of its own) -- and it sticks to the viewport
            bottom throughout the page's own scroll range, releasing the
            instant this `<main>` box ends, exactly at the Footer boundary,
            so the two can never overlap.

            It also slides itself away earlier than that, the instant
            FinalCta is reached (owner follow-up, same day: "when it gets to
            the cta section, remove the fixed cta automatically") -- see
            `FINAL_CTA_MARKER_ID`'s own marker div above and
            ProductCtasMobileBar's own IntersectionObserver. Hidden at `xl`,
            where this bar doesn't render at all. */}
        <ProductCtasMobileBar primaryCta={home.nav.cta} />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />
    </>
  );
}
