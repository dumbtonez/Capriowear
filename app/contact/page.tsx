// app/contact/page.tsx
// Capriosports parent-site stub -- Phase 1 scaffolding only, see
// app/page.tsx's own header comment for the full reasoning. No colliding
// Capriowear redirect at this path.
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { contactStub } from "@/content/capriosports/stubPages";
import { home } from "@/content/home";
import { ORGANIZATION, PARENT_SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

const CANONICAL = `${SITE_URL}/contact`;

export const metadata: Metadata = {
  title: contactStub.metaTitle,
  description: contactStub.metaDescription,
  alternates: { canonical: CANONICAL },
  // Placeholder page: noindexed and out of sitemap.ts until real content
  // ships (independent of the sitewide ALLOW_INDEXING switch).
  robots: { index: false, follow: false },
  openGraph: {
    title: `${contactStub.metaTitle} | ${PARENT_SITE_NAME}`,
    description: contactStub.metaDescription,
    url: CANONICAL,
    siteName: PARENT_SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${contactStub.metaTitle} | ${PARENT_SITE_NAME}`,
    description: contactStub.metaDescription,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Bare, unstyled placeholder nav -- Phase 1 scaffolding only, see
          app/page.tsx's own comment for the full reasoning. */}
      <nav className="p-4 text-sm">
        <Link href="/">Capriosports</Link> | <Link href="/capriowear">Capriowear</Link>
      </nav>

      <main className="relative z-10 bg-paper">
        <h1>{contactStub.h1}</h1>
        <p>{contactStub.body}</p>
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Contact", url: CANONICAL },
        ])}
      />
    </>
  );
}
