// app/our-people/page.tsx
// Capriosports parent-site stub -- Phase 1 scaffolding only, see
// app/page.tsx's own header comment for the full reasoning. No colliding
// Capriowear redirect at this path.
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ourPeopleStub } from "@/content/capriosports/stubPages";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

const CANONICAL = `${SITE_URL}/our-people`;

export const metadata: Metadata = {
  title: ourPeopleStub.metaTitle,
  description: ourPeopleStub.metaDescription,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: `${ourPeopleStub.metaTitle} | ${SITE_NAME}`,
    description: ourPeopleStub.metaDescription,
    url: CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${ourPeopleStub.metaTitle} | ${SITE_NAME}`,
    description: ourPeopleStub.metaDescription,
  },
};

export default function OurPeoplePage() {
  return (
    <>
      {/* Bare, unstyled placeholder nav -- Phase 1 scaffolding only, see
          app/page.tsx's own comment for the full reasoning. */}
      <nav className="p-4 text-sm">
        <Link href="/">Capriosports</Link> | <Link href="/capriowear">Capriowear</Link>
      </nav>

      <main className="relative z-10 bg-paper">
        <h1>{ourPeopleStub.h1}</h1>
        <p>{ourPeopleStub.body}</p>
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Our People", url: CANONICAL },
        ])}
      />
    </>
  );
}
