// app/terms-of-service/page.tsx
// Built 2026-09-13 (owner: "Build a Terms of Service page... reuse the
// exact same structure, layout, and design direction as /privacy-policy").
// Byte-for-byte the same page shape as app/privacy-policy/page.tsx --
// same dark background, same centred `max-w-[760px]` reading column, same
// table-of-contents block, same section rendering, same footer separator,
// same BreadcrumbList-only (no visible breadcrumb) pattern. Only the
// content source (content/terms-of-service.ts) and canonical URL differ.
//
// The task brief that requested this page described /privacy-policy as
// "light background" -- that was true of an early draft, but the real,
// current /privacy-policy is dark throughout (owner, 2026-09-10: "let's
// keep this and remove the white one," overriding the original spec
// doc's own light-background reasoning). "Reuse the exact same... design
// direction as /privacy-policy" is the actual instruction this page
// follows -- matching the live page, not the brief's own now-stale
// description of it.
//
// IMPORTANT: content/terms-of-service.ts is a solid working draft written
// by Claude, not a real spec doc the way /privacy-policy's copy was, and
// not a legal opinion -- flagged there and repeated here. Needs a real
// lawyer review before launch, same as /privacy-policy's own jurisdiction
// caveat.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/sections/Footer";
import { header } from "@/components/ui/styles";
import { home } from "@/content/home";
import { termsOfService } from "@/content/terms-of-service";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

const CANONICAL = `${SITE_URL}/terms-of-service`;

export const metadata: Metadata = {
  title: termsOfService.metaTitle,
  description: termsOfService.metaDescription,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: `${termsOfService.metaTitle} | ${SITE_NAME}`,
    description: termsOfService.metaDescription,
    url: CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${termsOfService.metaTitle} | ${SITE_NAME}`,
    description: termsOfService.metaDescription,
  },
  // Indexable, same reasoning as /privacy-policy: legitimate visitors and
  // reviewers will want to find this page.
};

export default function TermsOfServicePage() {
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
        <div className="mx-auto w-full max-w-[760px] px-5 pt-[120px] pb-24 md:px-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 text-paper">{termsOfService.hero.h1}</h1>
            <p className="text-body text-[#838D97]">Last updated {termsOfService.hero.lastUpdated}</p>
          </div>

          <nav aria-label={termsOfService.tocLabel} className="mt-10 flex flex-col gap-2 rounded-[4px] border border-line-dark p-6">
            <p className="text-button-sm text-paper">{termsOfService.tocLabel}</p>
            <ul className="flex flex-col gap-1.5">
              {termsOfService.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-body text-[#838D97] underline decoration-solid underline-offset-2 hover:text-paper">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 flex flex-col gap-10">
            {termsOfService.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-h5 text-paper">{section.heading}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.body.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-body text-[#838D97]">
                      {paragraph}
                    </p>
                  ))}
                  {section.body.list ? (
                    <ul className="flex flex-col gap-2 pl-5">
                      {section.body.list.map((item, index) => (
                        <li key={index} className="list-disc text-body text-[#838D97]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.body.closingParagraphs?.map((paragraph, index) => (
                    <p key={index} className="text-body text-[#838D97]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <hr className="mt-16 border-t border-line-dark" />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Terms of Service", url: CANONICAL },
        ])}
      />
    </>
  );
}
