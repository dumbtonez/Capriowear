// content/request-a-sample.ts
// The /request-a-sample page (Pillar 5 of the launch punchlist, the
// conversion point every CTA on the site points to). No Figma exists for
// this page -- Mohsin's own spec doc (2026-09-10) carries both the content
// and the design direction, read directly rather than paraphrased. Renamed
// from an earlier "Request a Quote" draft the same day: "Request a Sample"
// is the sitewide CTA already (services.hero.ctaPrimary, services.finalCta.
// cta), so this page's own headline, slug and metadata now match every
// button that sends a visitor here.
//
// Confirmed facts (do not change without Mohsin): established 2009, MOQ
// from 50 pieces per style, samples in 10 to 14 days, reply within 24
// hours, NDA signed before any tech pack, ISO 9001/OEKO-TEX/BSCI/IMAC/SGS
// certified, 20+ export countries.
//
// SEO strategy stays the sitewide light-touch formula (metadata, FAQ
// prose, alt text, schema) -- this page itself stays short and
// form-focused, keyword weight lives in the meta description and FAQ
// answers only, never in the hero or form labels.
export const requestASample = {
  metaTitle: "Request a Sample | Custom Apparel Manufacturer",
  metaDescription:
    "Request a sample from Capriowear, a cut-and-sew activewear and teamwear manufacturer in Sialkot, Pakistan. Low MOQ from 50 pieces, reply within 24 hours.",

  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Request a Sample", href: "/request-a-sample" },
    ],
    h1: "Request a Sample",
    facts: ["Reply within 24 hours", "MOQ from 50 pieces", "NDA before tech pack", "ISO 9001 certified"],
  },

  form: {
    fields: {
      name: { label: "Full name", placeholder: "Jordan Lee" },
      email: { label: "Work email", placeholder: "jordan@yourbrand.com" },
      company: { label: "Company name", placeholder: "Your Brand Co." },
      interest: {
        label: "What are you interested in?",
        options: ["Activewear", "Teamwear", "Not sure yet"],
      },
      project: {
        label: "Tell us about your project",
        helpText: "Product type, estimated quantity, timeline, or anything else we should know.",
      },
      file: {
        label: "Attach a file (optional)",
        helpText: "Tech pack, sketch, or reference image. PDF, JPG or PNG, up to 10MB.",
      },
      phone: {
        label: "WhatsApp or phone number (optional)",
        placeholder: "+1 (555) 123-4567",
      },
    },
    // "Privacy Policy" links to /privacy-policy -- planned, Mohsin
    // confirmed it will be built, route can exist ahead of its content.
    // Split around the link text (rather than one plain string) so the
    // component can render a real inline <a>, not a string.replace() hack.
    consentPrefix: "By submitting, you agree to our ",
    consentLinkText: "Privacy Policy",
    consentSuffix: " and allow Capriowear to contact you about your request.",
    submitLabel: "Send Request",
    submittingLabel: "Sending...",
    successMessage: "Thanks. Your request is in, we will reply within 24 hours.",
    errorMessage:
      "Something went wrong on our end. Please try again, or reach us directly and we will pick it up from there.",
  },

  // h2 matches the same "Top questions from B2B buyers" heading every
  // other page's FAQ uses (home.faq, services.faq) -- owner, 2026-09-10:
  // "use the same global structure that we have in the design system, just
  // change the content." Rendered via the shared `Faq` component
  // (components/sections/Faq.tsx), not a bespoke wrapper.
  faq: {
    h2: "Top questions from B2B buyers",
    items: [
      {
        q: "What do I get when I request a sample?",
        a: "A physical sample of your product, developed from your tech pack, sketch, or reference, so you can confirm fit, fabric, and construction before committing to bulk.",
      },
      {
        q: "What should I include if I don't have a tech pack yet?",
        a: "A sketch, a reference garment, or even a rough description is enough to start. Send what you have and we will help develop the spec from there.",
      },
      {
        q: "How is pricing determined?",
        a: "Pricing depends on fabric, construction, quantity and customization, so we do not publish fixed prices. Every quote is confirmed alongside your sample.",
      },
      {
        q: "What is the minimum order quantity?",
        a: "From 50 pieces per style, scaling to full bulk.",
      },
      {
        q: "How long until I hear back?",
        a: "We reply to every request within 24 hours.",
      },
      {
        q: "Will my designs stay confidential?",
        a: "Yes. We sign an NDA before any tech pack is shared.",
      },
      {
        q: "Can I request a sample for both activewear and teamwear?",
        a: "Yes. Both are made in the same factory, so one request covers either or both.",
      },
    ],
  },
} as const;
