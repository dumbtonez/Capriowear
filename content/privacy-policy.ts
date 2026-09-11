// content/privacy-policy.ts
// The /privacy-policy page -- Pillar 7 on the launch punchlist, and a hard
// dependency for the consent lines on both Request a Sample and Download
// Catalog, which already link here. Mohsin's own spec doc (2026-09-10)
// carries the full copy and design direction, read directly rather than
// paraphrased.
//
// Jurisdiction (Claude's own recommendation, not a legal opinion, per the
// doc's own flag): written as governed by Pakistan law, where Caprio
// Sports is based, while voluntarily offering GDPR-style rights to any
// visitor regardless of location. Have an actual lawyer review before
// launch -- see Open items below, unchanged from the doc.
//
// `body` per section is typed content (paragraphs + optional bullet
// list), not raw HTML -- app/privacy-policy/page.tsx renders it directly,
// no dangerouslySetInnerHTML anywhere on this page.
type SectionBody = {
  paragraphs: readonly string[];
  list?: readonly string[];
  // A closing paragraph after the list, e.g. section 8's "To make any of
  // these requests..." line, which reads as prose after the bullets, not
  // another bullet itself.
  closingParagraphs?: readonly string[];
};

export type PrivacyPolicySection = {
  id: string;
  heading: string;
  body: SectionBody;
};

// Declared outside the exported `as const` object, with an explicit type
// annotation, for the same reason content/services.ts's own
// `introParagraph` is -- `as const` on the object as a whole would narrow
// each section's `body` to only the keys its own literal happens to
// include, dropping the optional `list`/`closingParagraphs` fields off
// every section that omits them, instead of the real `SectionBody` shape
// the page component expects on all of them.
const sections: PrivacyPolicySection[] = [
    {
      id: "introduction",
      heading: "1. Introduction",
      body: {
        paragraphs: [
          'Caprio Sports ("Capriowear," "we," "us," or "our") respects your privacy. This policy explains what information we collect when you visit this website or submit one of our forms, how we use it, who we share it with, and the choices you have. It applies to capriowear.com and every page on it.',
          "By using this site, you agree to the collection and use of information as described here. If you do not agree, please do not use this site or submit any forms on it.",
        ],
      },
    },
    {
      id: "information-we-collect",
      heading: "2. Information we collect",
      body: {
        paragraphs: [
          "We collect information in three ways: what you type into a form, what your device and browser automatically reveal when you visit, and what our analytics tools record about how you use the site.",
        ],
      },
    },
    {
      id: "information-you-provide",
      heading: "2.1 Information you provide directly",
      body: {
        paragraphs: [],
        list: [
          "Request a Sample form: full name, work email, company name, what you're interested in, your project details, an optional file attachment, and an optional WhatsApp or phone number.",
          "Download Catalog form: first name, email, and an optional company name.",
          "Any information you send us directly by email or WhatsApp.",
        ],
      },
    },
    {
      id: "information-collected-automatically",
      heading: "2.2 Information collected automatically",
      body: {
        paragraphs: [
          "When you submit the Request a Sample or Download Catalog form, our server automatically captures, without you typing anything extra: your approximate country, region, and city (based on your IP address), your device type, operating system, and browser, and the page or link that referred you to the site, including any campaign tags in the URL (for example utm_source or utm_medium). This location and device data is approximate, not precise, and can be inaccurate if you're using a VPN or a shared network. We use it to understand where our leads come from, not to identify or locate you personally.",
        ],
      },
    },
    {
      id: "information-from-analytics",
      heading: "2.3 Information collected by analytics tools",
      body: {
        paragraphs: [
          "We use Google Analytics and Microsoft Clarity to understand how visitors use this site, which pages get visited, how people navigate, and where they drop off. These tools use cookies and similar technology to collect information such as your IP address, device and browser type, pages visited, time spent on the site, and general navigation behavior. Microsoft Clarity may also record anonymized session behavior (like scrolling and clicks) to help us understand usability issues. Both tools are configured to mask or exclude anything you type into form fields.",
        ],
      },
    },
    {
      id: "how-we-use-your-information",
      heading: "3. How we use your information",
      body: {
        paragraphs: ["We use the information we collect to:"],
        list: [
          "Respond to your sample or quote request, and send you the catalog you asked for.",
          "Send transactional emails you've requested, such as the automated catalog delivery email.",
          "Understand where our website visitors and leads come from, so we know which marketing efforts are working.",
          "Improve the site itself, based on how visitors actually use it.",
          "Keep a record of leads for our own sales follow-up, stored in a private, access-controlled spreadsheet.",
        ],
        closingParagraphs: ["We do not sell your personal information to anyone, and we do not use it for advertising or retargeting."],
      },
    },
    {
      id: "who-we-share-information-with",
      heading: "4. Who we share information with",
      body: {
        paragraphs: ["We share information only with the service providers who help us run this site and respond to your requests, not with any other third party:"],
        list: [
          "Google (Google Analytics, and Google Sheets for our internal lead records).",
          "Microsoft (Microsoft Clarity).",
          // Open item (doc): name the specific email-sending service once
          // confirmed -- Resend, per this build's own backend, pending
          // Mohsin's final confirmation.
          "Our email-sending service, used to deliver the catalog and respond to sample requests.",
        ],
        closingParagraphs: [
          "Each of these providers processes information under their own privacy terms; we only share what's needed for them to perform their function for us. We do not sell, rent, or trade your information to marketers or data brokers.",
        ],
      },
    },
    {
      id: "cookies",
      heading: "5. Cookies",
      body: {
        paragraphs: [
          "This site uses cookies and similar technologies through Google Analytics and Microsoft Clarity to understand site usage, as described above. You can control or delete cookies through your browser settings; note that disabling cookies may affect how parts of the site function. We do not currently use advertising or retargeting cookies.",
        ],
      },
    },
    {
      id: "data-retention",
      heading: "6. Data retention",
      body: {
        paragraphs: [
          "We keep form submissions and the associated lead information for as long as reasonably needed to respond to your request and for our own business record-keeping, unless you ask us to delete it sooner. Analytics data is retained according to Google Analytics' and Microsoft Clarity's own standard retention settings.",
        ],
      },
    },
    {
      id: "your-rights",
      heading: "7. Your rights",
      body: {
        paragraphs: ["Regardless of where you're located, you can ask us to:"],
        list: [
          "Tell you what personal information we hold about you.",
          "Correct any information that's inaccurate.",
          "Delete your information from our records.",
          "Stop using your information for a specific purpose.",
        ],
        closingParagraphs: ["To make any of these requests, email us at hello@capriosports.com. We'll respond within a reasonable time."],
      },
    },
    {
      id: "data-security",
      heading: "8. Data security",
      body: {
        paragraphs: [
          "We take reasonable technical and organizational measures to protect the information you share with us. No method of transmission or storage over the internet is completely secure, so while we work to protect your information, we cannot guarantee absolute security.",
        ],
      },
    },
    {
      id: "international-visitors",
      heading: "9. International visitors",
      body: {
        paragraphs: [
          "Capriowear is based in Sialkot, Pakistan, and this website is available to visitors and business partners worldwide. By using this site, you understand that your information may be processed in Pakistan and in the countries where our service providers (Google, Microsoft, and our email-sending service) operate their servers, which may have different data protection laws than your own country.",
        ],
      },
    },
    {
      id: "childrens-privacy",
      heading: "10. Children's privacy",
      body: {
        paragraphs: [
          "This site is intended for business use by adults sourcing custom apparel manufacturing, not for children. We do not knowingly collect information from anyone under 18.",
        ],
      },
    },
    {
      id: "changes-to-this-policy",
      heading: "11. Changes to this policy",
      body: {
        paragraphs: [
          'We may update this policy from time to time, for example as we add new features or forms to the site. We\'ll update the "last updated" date at the top of this page when we do. Continued use of the site after a change means you accept the updated policy.',
        ],
      },
    },
    {
      id: "contact-us",
      heading: "12. Contact us",
      body: {
        paragraphs: ["Questions about this policy or how we handle your information: hello@capriosports.com"],
      },
    },
];

export const privacyPolicy = {
  // No " | Capriowear" suffix -- the root layout's title.template applies
  // it automatically. Fixed 2026-09-11: this field previously baked the
  // suffix in itself, doubling it live ("... | Capriowear | Capriowear").
  metaTitle: "Privacy Policy",
  metaDescription: "How Capriowear collects, uses, and protects information from website visitors and B2B form submissions.",

  hero: {
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Privacy Policy", href: "/privacy-policy" },
    ],
    h1: "Privacy Policy",
    // Open item (doc): insert the real date at launch.
    lastUpdated: "[Insert date at launch]",
  },

  tocLabel: "On this page",

  sections,
} as const;
