// content/terms-of-service.ts
// The /terms-of-service page -- built 2026-09-13 alongside the request-a-
// sample validation fix (owner: "Build a Terms of Service page... reuse the
// exact same structure, layout, and design direction as /privacy-policy").
// Not sourced from a real spec doc the way /privacy-policy was -- this is
// Claude's own drafted copy, covering the standard sections a B2B site
// collecting form submissions needs. Flagged here and in the page's own
// header comment, same as /privacy-policy already flags its own
// jurisdiction call: this is a solid working draft, not a legal opinion,
// and needs a real lawyer review before launch.
//
// Jurisdiction: written as governed by Pakistan law, matching
// /privacy-policy's own choice (Caprio Sports is based in Sialkot,
// Pakistan) -- one consistent governing-law answer across both documents,
// not two different guesses.
//
// Intellectual property section references the NDA-before-tech-pack
// process already stated as standing policy across the site (Our Factory,
// Services, Request a Sample, Download Catalog FAQs, and the compliance
// ticker's own "NDA before tech pack" fact) -- restated here in Terms
// language ("you retain ownership... we do not reuse, resell, or share
// them"), not re-litigated as a new promise.
//
// `body` shape mirrors privacy-policy.ts's own `SectionBody` exactly
// (paragraphs + optional list + optional closingParagraphs) -- same page
// component contract, no new rendering shape needed.
type SectionBody = {
  paragraphs: readonly string[];
  list?: readonly string[];
  closingParagraphs?: readonly string[];
};

export type TermsOfServiceSection = {
  id: string;
  heading: string;
  body: SectionBody;
};

// Declared outside the exported `as const` object with an explicit type
// annotation, same reasoning as privacy-policy.ts's own `sections` --
// `as const` on the whole object would narrow each section's `body` to
// only the keys its own literal happens to include.
const sections: TermsOfServiceSection[] = [
  {
    id: "acceptance-of-terms",
    heading: "1. Acceptance of terms",
    body: {
      paragraphs: [
        'These Terms of Service ("Terms") govern your use of capriowear.com and every page on it, operated by Caprio Sports ("Capriowear," "we," "us," or "our"). By visiting this site or submitting any form on it (including Request a Sample, Download Catalog, or any inquiry form), you agree to these Terms.',
        "If you do not agree to these Terms, please do not use this site or submit any forms on it.",
      ],
    },
  },
  {
    id: "use-of-the-site",
    heading: "2. Use of the site",
    body: {
      paragraphs: [
        "This site is provided for legitimate business purposes: researching our manufacturing capabilities, requesting samples or quotes, downloading our catalog, and contacting us about a potential order. You agree to use it only for these purposes, and not to:",
      ],
      list: [
        "Submit false, misleading, or fraudulent information through any form on this site",
        "Attempt to gain unauthorized access to this site, its underlying systems, or any account or data connected to it",
        "Use automated means (bots, scrapers) to access or extract content from this site, other than standard search engine indexing",
        "Interfere with or disrupt this site's normal operation, including its servers or networks",
        "Use this site to transmit any virus, malware, or other harmful code",
      ],
    },
  },
  {
    id: "intellectual-property",
    heading: "3. Intellectual property",
    body: {
      paragraphs: [
        "All content on this site — text, graphics, logos, photography, and the Capriowear/Caprio Sports names and marks — is our property or used with permission, and is protected by applicable intellectual property law. You may view and print pages of this site for your own personal or internal business reference, but may not reproduce, distribute, or otherwise use this content for any commercial purpose without our written permission.",
        "Tech packs, designs, patterns, samples, and other materials you share with us through this site's forms (or afterward, once we're in direct contact) remain your intellectual property at all times. We sign a non-disclosure agreement (NDA) before any tech pack changes hands, as standard practice on every inquiry. We do not reuse, resell, or share your designs with any other party.",
      ],
    },
  },
  {
    id: "no-warranty",
    heading: "4. No warranty on site content",
    body: {
      paragraphs: [
        'This site and its content are provided "as is," without warranty of any kind, express or implied. While we make reasonable efforts to keep information on this site (capabilities, certifications, timelines, pricing indications) accurate and current, we do not warrant that it is complete, error-free, or uninterrupted. Specific terms for any actual order — pricing, minimum order quantity, lead time, specifications — are confirmed directly with you in writing before production, and those confirmed terms, not this website, govern that order.',
      ],
    },
  },
  {
    id: "limitation-of-liability",
    heading: "5. Limitation of liability",
    body: {
      paragraphs: [
        "To the fullest extent permitted by law, Caprio Sports and its officers, employees, and agents will not be liable for any indirect, incidental, special, or consequential damages arising from your use of this site, including but not limited to loss of profits, data, or business opportunity, even if we have been advised of the possibility of such damages.",
        "Nothing in these Terms limits or excludes any liability that cannot lawfully be limited or excluded, including liability for fraud or for death or personal injury caused by our negligence.",
      ],
    },
  },
  {
    id: "governing-law",
    heading: "6. Governing law",
    body: {
      paragraphs: [
        "These Terms are governed by the laws of Pakistan, without regard to conflict-of-law principles. Caprio Sports is based in Sialkot, Pakistan, and this website is available to visitors and business partners worldwide — by using this site, you agree that any dispute arising from these Terms or your use of this site will be subject to the exclusive jurisdiction of the courts of Pakistan.",
      ],
    },
  },
  {
    id: "changes-to-these-terms",
    heading: "7. Changes to these terms",
    body: {
      paragraphs: [
        'We may update these Terms from time to time, for example as we add new features or forms to the site. We\'ll update the "last updated" date at the top of this page when we do. Continued use of the site after a change means you accept the updated Terms.',
      ],
    },
  },
  {
    id: "contact-us",
    heading: "8. Contact us",
    body: {
      paragraphs: ["Questions about these Terms: hello@capriosports.com"],
    },
  },
];

export const termsOfService = {
  // No " | Capriowear" suffix -- the root layout's title.template applies
  // it automatically, same reasoning as privacyPolicy.metaTitle.
  metaTitle: "Terms of Service",
  metaDescription: "The terms governing your use of the Capriowear website and any forms submitted on it.",

  hero: {
    breadcrumb: [
      { label: "Home", href: "/capriowear" },
      { label: "Terms of Service", href: "/capriowear/terms-of-service" },
    ],
    h1: "Terms of Service",
    // Open item, same as privacyPolicy.hero.lastUpdated: insert the real
    // date at launch, once a lawyer has reviewed this draft.
    lastUpdated: "[Insert date at launch]",
  },

  tocLabel: "On this page",

  sections,
} as const;
