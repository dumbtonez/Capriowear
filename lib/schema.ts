// lib/schema.ts
// Pure functions returning schema.org JSON-LD objects. Every field is fed
// from content/site.ts (or, per-page, from whatever content that page
// already renders as visible copy) -- never hand-typed a second time here.
// See docs/06-seo.md. Render the result via components/JsonLd.tsx.
import { CAPRIOSPORTS_CERTIFICATIONS, CAPRIOSPORTS_MEMBERSHIPS, CAPRIOSPORTS_ORGANIZATION } from "@/content/capriosports/organization";
import { ORGANIZATION, SITE_URL } from "@/content/site";

export type ProductSchemaInput = {
  name: string;
  description: string;
  /** Absolute URL. Omitted from the schema entirely when there's no real photo yet -- same "no placeholder image" rule as `CollectionPageItem.image`. */
  image?: string;
  /** Short spec line, e.g. "Nylon or polyamide + elastane, 4-way stretch" -- StyleCard.material. */
  material?: string;
};

// Sitewide root Organization entity -- Capriosports, the parent company
// (content/capriosports/organization.ts), not Capriowear (2026-09-14
// Capriosports homepage task; before this, the root entity was Capriowear
// itself with Capriosports/Caprio Sports only as its `parentOrganization`
// name string, no real node of its own). Called argument-less from the root
// layout (app/layout.tsx), so every page sitewide -- Capriowear included --
// renders the same single, correct entity graph, never a per-page variant.
// Capriowear is represented as a `subOrganization` node, its own real name
// and URL (content/site.ts's existing ORGANIZATION, untouched otherwise).
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: CAPRIOSPORTS_ORGANIZATION.name,
    legalName: CAPRIOSPORTS_ORGANIZATION.legalName,
    description: CAPRIOSPORTS_ORGANIZATION.identityLine.gear,
    foundingDate: CAPRIOSPORTS_ORGANIZATION.foundingDate,
    url: CAPRIOSPORTS_ORGANIZATION.url,
    logo: CAPRIOSPORTS_ORGANIZATION.logo,
    email: CAPRIOSPORTS_ORGANIZATION.contactEmail,
    address: {
      "@type": "PostalAddress",
      ...CAPRIOSPORTS_ORGANIZATION.address,
    },
    // Omitted entirely while empty (no confirmed Capriosports-specific
    // profiles exist yet) rather than emitting an empty array -- see
    // CAPRIOSPORTS_ORGANIZATION.sameAs's own comment.
    ...(CAPRIOSPORTS_ORGANIZATION.sameAs.length > 0 ? { sameAs: CAPRIOSPORTS_ORGANIZATION.sameAs } : {}),
    subOrganization: [
      {
        "@type": "Organization",
        name: ORGANIZATION.name,
        url: ORGANIZATION.url,
      },
    ],
    // The confirmed, sitewide certification list
    // (content/capriosports/organization.ts's CAPRIOSPORTS_CERTIFICATIONS --
    // the same real facts content/site.ts's own CERTIFICATIONS represents
    // for Capriowear, one factory, one set of audits) as schema.org
    // credentials, added 2026-09-11 (site audit finding: this field didn't
    // exist, so the Organization schema made no certification claim at
    // all). Each entry is a minimal, valid EducationalOccupationalCredential:
    // just a name and the org that recognizes it -- no invented issuing
    // body, issue date, or credential ID, since none of that is a confirmed
    // fact.
    hasCredential: CAPRIOSPORTS_CERTIFICATIONS.map((name) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certification",
      name,
    })),
    // Industry-body membership(s), added 2026-09-11 alongside a correction
    // to the certification list above: belonging to WFSGI is a membership,
    // not a third-party audit of the factory, so it gets schema.org's own
    // `memberOf` shape (an Organization entity) rather than being folded
    // into `hasCredential`.
    memberOf: CAPRIOSPORTS_MEMBERSHIPS.map((name) => ({
      "@type": "Organization",
      name,
    })),
  };
}

// Sitewide root WebSite entity -- Capriosports (the bare domain), not
// Capriowear (2026-09-15 Capriosports homepage task, same rationale as
// organizationSchema()'s own restructure and the root layout's
// title.template fix: called argument-less from the root layout, so this
// was leaking "Capriowear" as the WebSite name onto every page, Gear and
// the new parent-site pages included).
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: CAPRIOSPORTS_ORGANIZATION.name,
    url: CAPRIOSPORTS_ORGANIZATION.url,
  };
}

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export type NavLinkItem = {
  label: string;
  href: string;
};

// The site's real top-level nav (content/home.ts's home.nav.links) as
// schema.org SiteNavigationElement -- not a Google rich-result trigger
// (Google doesn't process this type for SERP features), but valid,
// standard markup that gives AI crawlers/answer engines an explicit,
// structured read of the site's real navigation, separate from having to
// infer it from the rendered <nav> markup alone. Fed by the exact same
// array Header.tsx renders, so this can never drift from what a visitor
// actually sees.
export function navigationSchema(links: NavLinkItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: links.map((link, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SiteNavigationElement",
        name: link.label,
        url: `${SITE_URL}${link.href}`,
      },
    })),
  };
}

export type MegaMenuGroup = {
  label: string;
  items: { label: string; href: string }[];
};

// The real category breakdown behind a mega-menu trigger (Activewear,
// Teamwear & Uniforms) -- a nested ItemList (groups, each holding its own
// items) rather than a flat list, so the actual TOPS/BOTTOMS/etc structure
// a visitor sees is preserved, not flattened into one undifferentiated
// list. Only ever fed the exact same `megaMenu` data Header.tsx/
// MobileNav.tsx already render (conditionally shown, not conditionally
// present -- the same "schema for content behind an interaction, matching
// what's really there once opened" precedent this file's own `faqSchema`
// already sets for the collapsed Accordion). Never call this for a
// trigger with no real design/content behind it yet (e.g. Services, Our
// Factory currently have none).
export function megaMenuSchema(name: string, href: string, groups: MegaMenuGroup[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${name} categories`,
    url: `${SITE_URL}${href}`,
    itemListElement: groups.map((group, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "ItemList",
        name: group.label,
        itemListElement: group.items.map((item, itemIndex) => ({
          "@type": "ListItem",
          position: itemIndex + 1,
          item: {
            "@type": "Thing",
            name: item.label,
            url: `${SITE_URL}${item.href}`,
          },
        })),
      },
    })),
  };
}

export type CollectionPageItem = {
  name: string;
  url: string;
  /** Absolute URL. Omitted from the Product entity entirely when empty --
   * a Product.image expects a real URL, not a placeholder empty string. */
  image?: string;
};

// A category listing page's own products, as a CollectionPage wrapping an
// ItemList of lightweight Product entities -- for the Activewear PLP
// template (app/activewear/[category]/page.tsx), fed by the exact same
// styleCards array ProductGrid/ProductCard already render, so this can
// never describe a product the page doesn't actually show. No price/offer
// data: these are custom-manufactured styles with no fixed retail price,
// so Product stays name/url/image only -- still schema.org-valid without
// an Offer, just not eligible for a price-carrying rich result.
export function collectionPageSchema(name: string, url: string, description: string, items: CollectionPageItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: item.name,
          url: item.url,
          ...(item.image ? { image: item.image } : {}),
        },
      })),
    },
  };
}

// A directory/hub page's own list of OTHER PAGES (not products) -- for the
// Teamwear hub (app/teamwear/page.tsx), whose 10 cards each link to a sport
// PLP, not a product. Deliberately `WebPage` entities, not `Product` --
// unlike `collectionPageSchema` above, every PDP under every one of these
// PLPs is still draft (no route, not indexed), so describing these list
// items as Product would claim products that don't have a real page yet.
// Same CollectionPage/ItemList wrapper shape as `collectionPageSchema`,
// just a different, non-Product leaf entity.
export function collectionOfPagesSchema(name: string, url: string, description: string, items: CollectionPageItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    description,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "WebPage",
          name: item.name,
          url: item.url,
          ...(item.image ? { image: item.image } : {}),
        },
      })),
    },
  };
}

// The PDP's own Product entity (app/activewear/[category]/[style]/page.tsx)
// -- fed by the exact same fields the page renders (heading, description,
// gallery, material). Deliberately no `offers`/`priceSpecification`: this
// is a made-to-order B2B product with no public price, so this stays a
// valid Product without an Offer rather than publishing invented pricing
// -- same "no price data" precedent collectionPageSchema() already sets
// for the PLP's own lightweight Product entities.
//
// Re-confirmed 2026-09-11 (cleanup pass, after the sitewide certifications
// correction): the two are unrelated facts -- certifications describe the
// factory's own compliance, an Offer describes a price for this specific
// product -- so fixing the former has no bearing on this decision. This is
// a deliberate, signed-off choice, not a gap the audit should keep
// re-flagging: Capriowear has no fixed public per-unit price to publish
// (quote-based, made-to-order), so omitting `offers` is the only schema.org
// -valid option here, not an incomplete implementation.
export function productSchema({ name, description, image, material }: ProductSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    brand: { "@type": "Brand", name: ORGANIZATION.name },
    manufacturer: { "@type": "Organization", name: ORGANIZATION.legalName },
    ...(image ? { image } : {}),
    ...(material ? { material } : {}),
  };
}

export type FaqItem = {
  q: string;
  a: string;
};

// Only call this on a page that actually renders the FAQ items visibly --
// schema must never describe content the page doesn't show.
export function faqSchema(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
