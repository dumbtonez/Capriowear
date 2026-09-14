// content/capriosports/organization.ts
// Capriosports' own Organization identity -- the parent company, sitewide
// root entity for structured data (lib/schema.ts's organizationSchema()),
// distinct from content/site.ts's existing `ORGANIZATION` (Capriowear's own
// identity, now represented as a subOrganization of this one). SITE_URL/
// ALLOW_INDEXING stay shared from content/site.ts, not duplicated here.
import { DEFAULT_OG_IMAGE, SITE_URL } from "../site";

export const CAPRIOSPORTS_ORGANIZATION = {
  name: "Capriosports",
  legalName: "Capriosports",
  url: SITE_URL,
  foundingDate: "2009",
  // No separate Capriosports logo asset exists yet -- reuses the sitewide
  // default OG image, same fallback every page without its own image
  // already uses.
  logo: DEFAULT_OG_IMAGE,
  // Same real, already-confirmed facility content/site.ts's own Capriowear
  // ORGANIZATION.address uses -- one company, one factory, not a second,
  // independently-guessed address.
  address: {
    addressLocality: "Sialkot",
    addressCountry: "PK",
  },
  // Real, already-established contact address (content/home.ts's own
  // `nav.contact.email`) -- not a new guess. No distinct company phone
  // number exists anywhere in the repo (only the WhatsApp number,
  // content/site.ts's own WHATSAPP_NUMBER, already flagged provisional
  // there as "a stand-in for the eventual business line") -- omitted here
  // rather than repeating an already-flagged provisional value under a
  // different field.
  contactEmail: "hello@capriosports.com",
  divisions: [
    { key: "gear" as const, displayName: "Caprio Sports", url: SITE_URL },
    { key: "wear" as const, displayName: "Capriowear", url: `${SITE_URL}/capriowear` },
  ],
  // Only the "gear" variant exists today -- this site's own identity line.
  // Capriowear keeps its own separate companyIdentity (content/site.ts),
  // not a second copy here.
  identityLine: {
    gear: "Capriosports is a lifting gear and boxing and MMA equipment manufacturer in Sialkot, Pakistan, established in 2009.",
  },
  workforceCount: "700+",
  machineCount: "600+",
  exportCountries: "20+",
  monthlyCapacity: "100,000+",
  facilitySqFt: "75,000",
  // No confirmed, live Capriosports-specific social profiles exist yet --
  // omitted rather than guessed, same "only real, live profiles" rule
  // content/site.ts's own ORGANIZATION.sameAs comment states.
  sameAs: [] as string[],
};

// Same set of confirmed sitewide certifications/membership Capriowear's own
// CERTIFICATIONS/MEMBERSHIPS (content/site.ts) represent -- one real
// factory, one real set of audits, not a second, independently-maintained
// list. Kept as Capriosports' own consts (not re-exported from site.ts)
// since organizationSchema() now builds its root entity from these, while
// content/site.ts's own CERTIFICATIONS/MEMBERSHIPS stay Capriowear's own
// data for anything that still reads them directly (visible trust-strip/FAQ
// copy sitewide).
export const CAPRIOSPORTS_CERTIFICATIONS = ["ISO 9001", "ISO 45001", "ISO 14001", "BSCI", "IMAC", "SGS"] as const;
export const CAPRIOSPORTS_MEMBERSHIPS = ["WFSGI"] as const;
