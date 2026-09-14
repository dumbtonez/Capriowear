// app/page.tsx
// The Capriosports parent-site homepage -- Phase 1 scaffolding only
// (2026-09-14 routing restructure). Capriowear's own real homepage used to
// live at this exact URL; it moved to /capriowear (see
// app/capriowear/page.tsx) to free this root path for the parent site.
// Placeholder content only, proving routing/metadata wiring -- same
// discipline as content/gear/**'s own stub pages. Real copy, design, and
// the actual division switcher/parent-site header are later phases.
import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { capriosportsHomeStub } from "@/content/capriosports/stubPages";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: capriosportsHomeStub.metaTitle,
  description: capriosportsHomeStub.metaDescription,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${capriosportsHomeStub.metaTitle} | ${SITE_NAME}`,
    description: capriosportsHomeStub.metaDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${capriosportsHomeStub.metaTitle} | ${SITE_NAME}`,
    description: capriosportsHomeStub.metaDescription,
  },
};

export default function CapriosportsHomePage() {
  return (
    <>
      {/* Bare, unstyled placeholder nav -- Phase 1 scaffolding only, same
          pattern as the Gear division's own placeholder nav
          (app/lifting-gears/page.tsx). NOT the real division switcher/
          parent-site header -- that's Phase 3 work (owner, 2026-09-14). */}
      <nav className="p-4 text-sm">
        <Link href="/capriowear">Capriowear</Link> | <Link href="/lifting-gears">Lifting Gears</Link> |{" "}
        <Link href="/boxing-and-mma">Boxing & MMA</Link> | <Link href="/contact">Contact</Link>
      </nav>

      <main className="relative z-10 bg-paper">
        <h1>{capriosportsHomeStub.h1}</h1>
        <p>{capriosportsHomeStub.body}</p>
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd data={breadcrumbSchema([{ name: "Home", url: SITE_URL }])} />
    </>
  );
}
