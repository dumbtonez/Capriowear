// app/who-we-are/page.tsx
// Capriosports parent-site stub -- Phase 1 scaffolding only, see
// app/page.tsx's own header comment for the full reasoning. No colliding
// Capriowear redirect at this path.
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { whoWeAreStub } from "@/content/capriosports/stubPages";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

const CANONICAL = `${SITE_URL}/who-we-are`;

export const metadata: Metadata = {
  title: whoWeAreStub.metaTitle,
  description: whoWeAreStub.metaDescription,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `${whoWeAreStub.metaTitle} | ${SITE_NAME}`,
    description: whoWeAreStub.metaDescription,
    url: CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${whoWeAreStub.metaTitle} | ${SITE_NAME}`,
    description: whoWeAreStub.metaDescription,
  },
};

export default function WhoWeArePage() {
  return (
    <>
      {/* Bare, unstyled placeholder nav -- Phase 1 scaffolding only, see
          app/page.tsx's own comment for the full reasoning. */}
      <nav className="p-4 text-sm">
        <Link href="/">Capriosports</Link> | <Link href="/capriowear">Capriowear</Link>
      </nav>

      <main className="relative z-10 bg-paper">
        <h1>{whoWeAreStub.h1}</h1>
        <p>{whoWeAreStub.body}</p>
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Who We Are", url: CANONICAL },
        ])}
      />
    </>
  );
}
