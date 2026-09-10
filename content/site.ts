// content/site.ts
// Single source of truth for site-wide SEO/AEO facts: the production URL,
// organization identity, and default metadata. Every canonical URL, every
// piece of structured data, and the default page title/description reads
// from here -- never hand-typed a second time elsewhere. See docs/06-seo.md.
//
// SITE_URL is the real public URL, not this app's own internal routing root.
// This Next app is mounted at /capriowear on www.capriosports.com (the
// parent domain splits into "capriogear", the existing WordPress site, and
// "capriowear", this app) -- so every canonical/OG/sitemap URL must read
// https://www.capriosports.com/capriowear..., even though every route inside
// this app itself still starts at "/". Confirmed by the owner, 2026-08-25.
//
// Reads from NEXT_PUBLIC_SITE_URL (SEO/metadata audit, 2026-09-06) so a
// Vercel preview/staging deploy can point this at its own URL without
// editing code, while an unset env var (every environment today) falls back
// to this exact literal -- canonical/sitemap/OG URLs never silently break
// to localhost or a *.vercel.app preview URL just because the env var
// wasn't configured yet.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.capriosports.com/capriowear";

export const SITE_NAME = "Capriowear";

// The single site-wide indexing switch (SEO/metadata audit, 2026-09-06):
// this site is currently staging on Vercel, ahead of the real launch on
// capriosports.com/capriowear, and must NOT be indexed by Google until that
// launch. Defaults to OFF (not indexable) whenever NEXT_PUBLIC_ALLOW_INDEXING
// is unset -- the safe default for every environment (local dev, every
// Vercel preview, and production) until someone explicitly flips it. Set
// NEXT_PUBLIC_ALLOW_INDEXING=true in Vercel's production environment
// variables at real launch to flip the whole site indexable with this one
// var -- no code change needed at that point. Read by app/layout.tsx (the
// sitewide `<meta name="robots">` via the Metadata API's own `robots`
// field) and app/robots.ts (whether /robots.txt disallows everything or
// allows crawling and references the sitemap) -- both read this one
// constant, never a second, independently-set flag.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

// The entity intro, stored once at four lengths (owner spec, 2026-09-01:
// "Set up the Capriowear entity intro so it is consistent across the WHOLE
// website, from a single stored source"). Exact owner text, never reworded
// here -- every other file that needs one of these imports it from here,
// never retypes it. Three anchor facts must never change in any of the
// four ("activewear and teamwear division of Caprio Sports", "cut-and-sew
// manufacturer", "Sialkot, Pakistan").
//
// - companyIdentity: the one-liner. Goes on the footer (every page) and
//   anywhere a single identity sentence prints inline.
// - companyIntroShort: the 2-sentence primary "who we are" text. Goes in
//   Organization schema's `description` (lib/schema.ts, the field Google
//   reads for the knowledge panel/AI answers), the homepage's own visible
//   intro line (app/page.tsx, between Hero and ClientLogos), and the About/
//   Our Story page's intro paragraph once that page exists (it doesn't
//   yet -- no route under app/ for it as of this entry).
// - companyIntroMeta: ~150 chars, built to fit inside Google's ~155-160
//   char truncation point. Goes in the homepage meta description (via
//   DEFAULT_DESCRIPTION below, which doubles as the root layout's sitewide
//   fallback for any page with no more specific description of its own --
//   exactly the hub-page case this variant is for) and any hub page's own
//   meta description (Activewear index, Capabilities, Our Factory) once
//   those pages exist -- none do yet, only the dynamic
//   app/activewear/[category]/page.tsx and .../[style]/page.tsx, both of
//   which already generate their own, more specific metadata per category/
//   style and so don't fall back to this. Never paste companyIntroShort
//   into a meta tag -- it's roughly double the safe length and will
//   truncate mid-sentence.
//
// The full 3-sentence category intro (the PLP/PDP entity FAQ answer,
// "What does Capriowear manufacture?") is deliberately NOT a fourth stored
// constant here -- it's built per category from that category's own real
// content (menuLabel + example styles), ending with companyIdentity
// imported and appended unchanged. See categoryEntityFaq() in
// content/activewear/pdpShared.ts.
export const companyIdentity =
  "Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.";

export const companyIntroShort =
  "Capriowear is a custom activewear and teamwear manufacturer for brands and teamwear suppliers worldwide, private label from fabric to packaging, with low minimums and full customization. Capriowear is the activewear and teamwear division of Caprio Sports, a cut-and-sew manufacturer in Sialkot, Pakistan.";

export const companyIntroMeta =
  "Capriowear is a custom activewear and teamwear manufacturer, private label from fabric to packaging, with low minimums and full customization.";

// Owner-supplied exact copy (2026-08-26) -- title tag.
export const DEFAULT_TITLE = "Custom Activewear & Teamwear Manufacturer in Pakistan | Capriowear";

// The homepage's own meta description, and the root layout's sitewide
// fallback for any page without one of its own -- companyIntroMeta is
// correct for both (2026-09-01 entity-intro spec, rule 3). Was a
// differently-worded, hand-typed sentence before this change.
export const DEFAULT_DESCRIPTION = companyIntroMeta;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

// Organization identity, feeding schema.org Organization/LocalBusiness
// structured data (lib/schema.ts) -- the same facts that render as visible
// copy elsewhere on the site (e.g. content/home.ts's "BASED IN SIALKOT,
// PAKISTAN" eyebrow), not a second, independently-maintained copy of them.
export const ORGANIZATION = {
  name: "Capriowear",
  legalName: "Caprio Sports",
  // Organization schema's `description` is companyIntroShort specifically
  // (2026-09-01 entity-intro spec, rule 2) -- the field Google reads for
  // the knowledge panel/AI answers, so it gets the fuller 2-sentence
  // variant, not the one-liner. Was a hand-typed sentence close to
  // companyIdentity's own length before this change.
  description: companyIntroShort,
  // Real founding year, 2009 -- added 2026-09-08 alongside a sitewide fact
  // correction (the site had drifted to "Since 2000"/"25+ years" in a few
  // places, both wrong; see docs/04-product.md's now-resolved open
  // question 2). schema.org's Organization type supports `foundingDate`
  // directly (ISO 8601, a bare year is valid) -- fed into the schema the
  // same way every other Organization field already is, not a second,
  // independently-maintained fact.
  foundingDate: "2009",
  url: SITE_URL,
  logo: `${SITE_URL}/opengraph-image`,
  address: {
    addressLocality: "Sialkot",
    addressCountry: "PK",
  },
  // Only real, live profiles go here. Facebook will be added the moment the
  // owner has it -- never a placeholder URL. LinkedIn added 2026-08-26.
  sameAs: ["https://www.instagram.com/capriowear", "https://www.linkedin.com/company/capriowear"],
};

// WhatsApp CTA (owner, 2026-09-10, added alongside the "Request a Sample"
// sticky bar sitewide): "+923348034434 -- Can I change it later, I am using
// my personal number for now" -- a real, working number, but explicitly a
// stand-in for the eventual business line. Swap this one value when the
// real number is ready; every `wa.me` link sitewide reads from here, never
// hand-typed a second time. `WHATSAPP_NUMBER` keeps the human-readable "+"
// form for display; `wa.me` itself needs the digits-only form (no "+", no
// spaces), built from it once here rather than re-stripped at each usage.
export const WHATSAPP_NUMBER = "+923348034434";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`;
