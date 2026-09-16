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
  // The entity intro, locked by the owner 2026-09-16 across four lengths and
  // two naming registers (same "one stored source, several variants"
  // discipline content/site.ts's own companyIdentity/companyIntroShort/
  // companyIntroMeta already enforce for Capriowear). Naming rule: schema
  // register uses "Capriosports" (schema/metadata contexts only --
  // <title>, <meta name="description">, JSON-LD Organization legalName/
  // description); frontend register uses "Caprio" alone (all visible
  // frontend copy a visitor actually reads). Exact owner text, never
  // reworded -- every file that needs one of these imports it from here.
  //
  // - identityLine.gear / .gearFrontend: the one-liner (~115/109 chars),
  //   pure identity, no Capriowear mention. Schema variant feeds
  //   organizationSchema()'s `description` (lib/schema.ts); frontend
  //   variant goes on the Capriosports/Gear footer and anywhere a single
  //   identity sentence prints inline for a visitor.
  // - introShort.schema / .frontend: the 3-sentence "who we are" text,
  //   including the Capriowear division mention as standard. Used where
  //   there's no hard character cap (About-style sections, social "about"
  //   fields).
  // - metaIntro: 152 chars, built to fit inside Google's ~155 char
  //   truncation point without running over -- schema register only. Feeds
  //   the homepage's own <meta name="description"> (content/capriosports/
  //   home.ts's metaDescription). Never paste introShort into a meta tag,
  //   it will truncate mid-sentence.
  //
  // The full 4-sentence category-entity-FAQ template ("What does Caprio
  // manufacture?") is deliberately NOT a fourth stored constant here --
  // same reasoning as Capriowear's own categoryEntityFaq(): built per
  // category from that category's own real content, ending with
  // identityLine.gearFrontend + the standard Capriowear-division closing
  // sentence, appended unchanged. See categoryEntityFaq() in
  // content/activewear/pdpShared.ts (the `group === "Gear"` branch).
  identityLine: {
    gear: "Capriosports is a lifting gear and boxing and MMA equipment manufacturer in Sialkot, Pakistan, established in 2009.",
    gearFrontend: "Caprio is a lifting gear and boxing and MMA equipment manufacturer in Sialkot, Pakistan, established in 2009.",
  },
  introShort: {
    schema:
      "Capriosports is a lifting gear and boxing and MMA equipment manufacturer in Sialkot, Pakistan, established in 2009. We manufacture private label lifting gear and boxing and MMA equipment for gyms, retailers, and private label brands worldwide, from raw material to finished, retail-ready packaging. Capriowear, our activewear and teamwear division, is built in the same facility.",
    frontend:
      "Caprio is a lifting gear and boxing and MMA equipment manufacturer in Sialkot, Pakistan, established in 2009. We manufacture private label lifting gear and boxing and MMA equipment for gyms, retailers, and private label brands worldwide, from raw material to finished, retail-ready packaging. Capriowear, our activewear and teamwear division, is built in the same facility.",
  },
  // Meta-length intro (152 chars) -- always schema register, the ONLY
  // variant sized to fit inside the actual <meta name="description"> tag
  // without truncation.
  metaIntro:
    "Capriosports manufactures custom lifting gear and boxing and MMA equipment, private label, in Sialkot, Pakistan. Parent of Capriowear, apparel division.",
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
