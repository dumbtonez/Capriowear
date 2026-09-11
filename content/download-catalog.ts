// content/download-catalog.ts
// The /download-catalog page -- Pillar 5's other lead-gen path alongside
// Request a Sample, lighter-touch and top-of-funnel (someone comparing
// manufacturers, not ready to send a tech pack yet). Mohsin's own spec
// doc (2026-09-10) carries content and design direction, read directly.
//
// Confirmed facts (do not change without Mohsin): established 2009, MOQ
// from 50 pieces per style, samples in 10 to 14 days, NDA signed before
// any tech pack, ISO 9001/ISO 45001/ISO 14001/BSCI/IMAC/SGS/OEKO-TEX
// certified, WFSGI member, 20+ export countries.
//
// Background, dark throughout: Request a Sample shipped fully dark top to
// bottom, not the alternating dark-hero/light-form split this page's own
// doc originally called for -- this page matches that built precedent
// instead (doc: "match that here... no light section on this page").
export const downloadCatalog = {
  metaTitle: "Download the Catalog | Capriowear Custom Manufacturing",
  metaDescription:
    "Download the Capriowear catalog, every custom activewear and teamwear category we manufacture in Sialkot, Pakistan, sent free to your inbox.",

  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Download Catalog", href: "/download-catalog" },
    ],
    h1: "Download the Catalog",
    subline: "Every category we manufacture, in one PDF, sent straight to your inbox.",
    facts: ["Every category, one PDF", "Sent automatically", "Usually arrives within minutes", "No sales call required"],
  },

  form: {
    fields: {
      firstName: { label: "First name", placeholder: "Jordan" },
      email: { label: "Email", placeholder: "jordan@yourbrand.com" },
      company: { label: "Company name (optional)", placeholder: "Your Brand Co." },
    },
    // Same split-around-the-link-text shape content/request-a-sample.ts's
    // own consent copy already uses, for the same reason -- a real inline
    // <a>, not a string.replace() hack.
    consentPrefix: "By submitting, you agree to our ",
    consentLinkText: "Privacy Policy",
    consentSuffix: " and allow Capriowear to contact you about your request.",
    submitLabel: "Send Me the Catalog",
    submittingLabel: "Sending...",
    successMessage: "Sent. Check your inbox, your catalog usually arrives within a few minutes. Not there yet? Check your spam folder.",
    errorMessage: "Something went wrong on our end. Please try again, or request the catalog by reaching us directly.",
  },

  // The automated delivery email sent to the customer on submission --
  // real, sent content, not just an internal notification. `{{firstName}}`
  // is substituted with exactly what the person typed, no capitalization
  // correction or trimming beyond basic whitespace (doc: "test with a
  // lowercase or oddly-cased name to confirm it reads naturally either
  // way") -- see app/api/download-catalog/route.ts for the substitution.
  email: {
    subject: "Your Capriowear Catalog",
    greeting: "Hi {{firstName}},",
    bodyParagraphs: [
      "Thanks for your interest in Capriowear. Your catalog is attached, covering every activewear and teamwear category we manufacture, from fabric options to construction details.",
      "If anything catches your eye, request a sample and we will start developing it around your brand.",
    ],
    ctaLabel: "Request a Sample",
    ctaHref: "/request-a-sample",
    signOff: "Capriowear, the activewear and teamwear division of Caprio Sports, Sialkot, Pakistan.",
  },

  faq: {
    h2: "Top questions from B2B buyers",
    items: [
      {
        q: "What is in the catalog?",
        a: "Every activewear and teamwear category we manufacture, with fabric options, construction details, and customization ranges for each.",
      },
      {
        q: "Will I be charged anything?",
        a: "No. The catalog is free, and downloading it does not commit you to an order.",
      },
      {
        q: "How long until I receive it?",
        a: "The email sends automatically and usually arrives within a few minutes. Check your spam folder if it does not show up.",
      },
      {
        q: "Can I request a sample without downloading the catalog first?",
        a: "Yes. Go straight to Request a Sample if you already know what you are looking for.",
      },
    ],
  },
} as const;
