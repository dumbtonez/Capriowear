// app/privacy-policy/page.tsx
// Pillar 7 on the launch punchlist, and a hard dependency for the consent
// lines on both Request a Sample and Download Catalog, which already link
// here. Replaces the earlier placeholder stub (2026-09-10) with the real
// page -- content/design direction both come from Mohsin's own spec doc,
// read directly. See content/privacy-policy.ts for the full copy and the
// jurisdiction/legal caveats.
//
// Deliberately the one light-throughout page on the site with no hero
// banner, no dark section, no fact strip, no CTA, no accordion, and no
// animation -- this is dense legal body text meant to be read carefully
// and searched (Cmd+F), not a conversion moment (doc: "treat it like a
// document"). Plain server component -- no form, no client-side
// interactivity beyond native anchor-link jumps, so no "use client"
// anywhere on this page.
//
// Centred reading column at a literal `max-w-[760px]` (doc: "roughly 720
// to 800px") -- no existing named width token fits a long-form body-text
// column (checked styles.ts/globals.css: every existing `max-w-[...]` is
// a short heading/subline constraint), so this follows the same
// established convention of a literal one-off value the rest of this
// file's own recipes already use elsewhere, rather than inventing a new
// `@theme` token for a single page.
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { Footer } from "@/components/sections/Footer";
import { header } from "@/components/ui/styles";
import { home } from "@/content/home";
import { privacyPolicy } from "@/content/privacy-policy";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";

const CANONICAL = `${SITE_URL}/privacy-policy`;

export const metadata: Metadata = {
  title: privacyPolicy.metaTitle,
  description: privacyPolicy.metaDescription,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: `${privacyPolicy.metaTitle} | ${SITE_NAME}`,
    description: privacyPolicy.metaDescription,
    url: CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${privacyPolicy.metaTitle} | ${SITE_NAME}`,
    description: privacyPolicy.metaDescription,
  },
  // Indexable now (doc: "legitimate page visitors and reviewers will want
  // to find" this page) -- the earlier stub had `robots: { index: false }`
  // since it carried no real content yet; that override is gone.
};

export default function PrivacyPolicyPage() {
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

      <main className="relative z-10 bg-paper">
        {/* Not `container-p` + `max-w-[760px]` composed on one element --
            found live, 2026-09-10 (owner: "currently taking the whole page
            width"): `container-p`'s own `max-width: var(--container-page)`
            (1440px) and this narrower override both target `max-width` on
            the same element, and the compiled stylesheet's own cascade
            order lets `container-p`'s win, silently overriding the
            760px cap -- the identical specificity bug already documented
            on `ourFactoryIntro.inner`/`servicesIntro.inner` (see either's
            own comment in components/ui/styles.ts). Fixed the same way:
            drop `container-p` entirely and hand-build its own mobile/
            tablet padding fallback (`px-5`/`md:px-8`) directly, since this
            page wants a genuinely narrower cap than `container-p`'s own
            1440px, not a composed override of it. */}
        <div className="mx-auto w-full max-w-[760px] px-5 pt-[120px] pb-24 md:px-8">
          <Breadcrumb items={[...privacyPolicy.hero.breadcrumb]} className="hidden md:block" />

          <div className="mt-8 flex flex-col gap-2">
            <h1 className="text-h2 text-text">{privacyPolicy.hero.h1}</h1>
            <p className="text-body text-muted">Last updated {privacyPolicy.hero.lastUpdated}</p>
          </div>

          <nav aria-label={privacyPolicy.tocLabel} className="mt-10 flex flex-col gap-2 rounded-lg border border-line p-6">
            <p className="text-button-sm text-text">{privacyPolicy.tocLabel}</p>
            <ul className="flex flex-col gap-1.5">
              {privacyPolicy.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-body text-muted underline decoration-solid underline-offset-2 hover:text-text">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 flex flex-col gap-10">
            {privacyPolicy.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-h5 text-text">{section.heading}</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {section.body.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-body text-muted">
                      {paragraph}
                    </p>
                  ))}
                  {section.body.list ? (
                    <ul className="flex flex-col gap-2 pl-5">
                      {section.body.list.map((item, index) => (
                        <li key={index} className="list-disc text-body text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.body.closingParagraphs?.map((paragraph, index) => (
                    <p key={index} className="text-body text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Privacy Policy", url: CANONICAL },
        ])}
      />
    </>
  );
}
