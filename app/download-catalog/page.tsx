// app/download-catalog/page.tsx
// Pillar 5's other lead-gen path -- lighter-touch than Request a Sample,
// top-of-funnel (doc, 2026-09-10). No Figma exists; content and design
// direction both come from Mohsin's own spec doc, explicitly reusing
// Request a Sample's own built patterns rather than a second style -- see
// content/download-catalog.ts for the full source comment.
//
// Section 1: a plain heading block, same shape as Request a Sample's own
// hero (no `CategoryBanner`, this design has no PLP-style banner). No
// visible subline and no visible `<Breadcrumb>` (owner, 2026-09-10:
// "remove the subline under the title and the breadcrums, keep the
// breadcrums in the backend, meta, scema, wherever you need for
// crawling" -- matching the same UI-vs-schema split already made on
// Request a Sample). `breadcrumbSchema()`'s JsonLd below still renders
// unconditionally, so the real BreadcrumbList structured data is
// unaffected; only the on-page elements are gone.
// Section 2: DownloadCatalogForm -- 2 required fields, 1 optional, the
// lowest-friction form on the site.
// Section 3: FAQ, the sitewide `Faq` component, same pattern as every
// other page's FAQ.
// Footer: sitewide, reused verbatim. Dark throughout, top to bottom, no
// light section anywhere -- matching Request a Sample's actual built
// page, not this doc's own original alternating-section idea (doc:
// "Request a Sample shipped fully dark throughout... match that here").
import { Sparkle } from "lucide-react";
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { DownloadCatalogForm } from "@/components/sections/DownloadCatalogForm";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { TextReveal } from "@/components/TextReveal";
import { header } from "@/components/ui/styles";
import { downloadCatalog } from "@/content/download-catalog";
import { home } from "@/content/home";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const CANONICAL = `${SITE_URL}/download-catalog`;

export const metadata: Metadata = {
  title: downloadCatalog.metaTitle,
  description: downloadCatalog.metaDescription,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: `${downloadCatalog.metaTitle} | ${SITE_NAME}`,
    description: downloadCatalog.metaDescription,
    url: CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${downloadCatalog.metaTitle} | ${SITE_NAME}`,
    description: downloadCatalog.metaDescription,
  },
};

export default function DownloadCatalogPage() {
  return (
    <>
      <Header
        brand={home.nav.brand}
        logo={<Logo stacked className={header.brandLogo} />}
        desktopLogo={<Logo stacked className={header.brandLogoDesktop} />}
        links={home.nav.links}
        mobileLinks={home.nav.mobileLinks}
        contact={home.nav.contact}
        social={ORGANIZATION.sameAs}
        cta={home.nav.cta}
        secondaryCta={home.nav.secondaryCta}
      />

      <main className="relative z-10 bg-ink">
        <section className="bg-ink pt-[116px] pb-8 md:pt-[136px] xl:pt-[176px]">
          <div className="container-p mx-auto flex w-full max-w-[640px] flex-col items-start gap-8 text-left md:items-center md:text-center">
            <TextReveal as="h1" text={downloadCatalog.hero.h1} className="text-display text-paper" />
            <ul className="flex flex-wrap items-center justify-start gap-x-6 gap-y-3 md:justify-center">
              {downloadCatalog.hero.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2 text-[#abb5c0]">
                  <Sparkle className="size-4 shrink-0" aria-hidden="true" fill="currentColor" />
                  <span className="text-body-lg">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <DownloadCatalogForm content={downloadCatalog.form} />
        <Faq content={downloadCatalog.faq} />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Download Catalog", url: CANONICAL },
        ])}
      />
      <JsonLd data={faqSchema(downloadCatalog.faq.items)} />
    </>
  );
}
