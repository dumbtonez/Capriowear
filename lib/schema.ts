// lib/schema.ts
// Pure functions returning schema.org JSON-LD objects. Every field is fed
// from content/site.ts (or, per-page, from whatever content that page
// already renders as visible copy) -- never hand-typed a second time here.
// See docs/06-seo.md. Render the result via components/JsonLd.tsx.
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";

export type ProductSchemaInput = {
  name: string;
  description: string;
  /** Absolute URL. Omitted from the schema entirely when there's no real photo yet -- same "no placeholder image" rule as `CollectionPageItem.image`. */
  image?: string;
  /** Short spec line, e.g. "Nylon or polyamide + elastane, 4-way stretch" -- StyleCard.material. */
  material?: string;
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    description: ORGANIZATION.description,
    foundingDate: ORGANIZATION.foundingDate,
    parentOrganization: {
      "@type": "Organization",
      name: ORGANIZATION.legalName,
    },
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    address: {
      "@type": "PostalAddress",
      ...ORGANIZATION.address,
    },
    sameAs: ORGANIZATION.sameAs,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
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

// The PDP's own Product entity (app/activewear/[category]/[style]/page.tsx)
// -- fed by the exact same fields the page renders (heading, description,
// gallery, material). Deliberately no `offers`/`priceSpecification`: this
// is a made-to-order B2B product with no public price, so this stays a
// valid Product without an Offer rather than publishing invented pricing
// -- same "no price data" precedent collectionPageSchema() already sets
// for the PLP's own lightweight Product entities.
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
