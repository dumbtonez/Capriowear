// app/privacy-policy/page.tsx
// Pillar 7 on the launch punchlist, and a hard dependency for the consent
// lines on both Request a Sample and Download Catalog, which already link
// here. Content/design direction both come from Mohsin's own spec doc,
// read directly. See content/privacy-policy.ts for the full copy and the
// jurisdiction/legal caveats.
//
// Dark throughout (owner, 2026-09-10: "let's tey one black version of
// this page" -> "let's keep this and remove the white one") -- overrides
// the source spec doc's own original light-background reasoning ("dense
// legal body text meant to be read carefully... light background with
// dark text reads better for long-form legal content than the site's
// dark sections"), a deliberate choice, not an oversight. Was built and
// compared as a `/privacy-policy-v2` draft first (same pattern
// `/request-a-sample-v2` used), now promoted to the real route; that
// draft is deleted.
//
// Otherwise still the one document-style page on the site with no hero
// banner, no fact strip, no CTA, no accordion, and no animation -- this
// is dense legal body text meant to be read carefully and searched
// (Cmd+F), not a conversion moment (doc: "treat it like a document").
// Plain server component -- no form, no client-side interactivity beyond
// native anchor-link jumps, so no "use client" anywhere on this page.
//
// No visible `<Breadcrumb>` (owner: "remove the breadcrums, keep it in
// the backend for crawling only" -- same UI-vs-schema split already made
// on Request a Sample/Download Catalog). `breadcrumbSchema()`'s JsonLd
// below still renders unconditionally, so the real BreadcrumbList
// structured data is unaffected.
//
// Centred reading column at a literal `max-w-[760px]` (doc: "roughly 720
// to 800px") -- no existing named width token fits a long-form body-text
// column (checked styles.ts/globals.css: every existing `max-w-[...]` is
// a short heading/subline constraint), so this follows the same
// established convention of a literal one-off value the rest of this
// file's own recipes already use elsewhere, rather than inventing a new
// `@theme` token for a single page. Not composed with `container-p` (a
// real bug, found live, 2026-09-10: `container-p`'s own 1440px
// `max-width` silently won over a composed narrower override in the
// compiled stylesheet's cascade order, the same specificity bug already
// documented on `ourFactoryIntro.inner`/`servicesIntro.inner`) -- built
// by hand instead, `px-5`/`md:px-8`, matching `container-p`'s own mobile/
// tablet padding fallback without composing with it.
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
  // Indexable (doc: "legitimate page visitors and reviewers will want to
  // find" this page).
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

      <main className="relative z-10 bg-ink">
        <div className="mx-auto w-full max-w-[760px] px-5 pt-[120px] pb-24 md:px-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-h2 text-paper">{privacyPolicy.hero.h1}</h1>
            <p className="text-body text-[#838D97]">Last updated {privacyPolicy.hero.lastUpdated}</p>
          </div>

          {/* rounded-[4px], not rounded-lg/16px (owner: "make the radious
              4px round only for the outline container") -- same literal
              one-off radius convention already used on Request a
              Sample's own field styling (no named 4px radius token
              exists). */}
          <nav aria-label={privacyPolicy.tocLabel} className="mt-10 flex flex-col gap-2 rounded-[4px] border border-line-dark p-6">
            <p className="text-button-sm text-paper">{privacyPolicy.tocLabel}</p>
            <ul className="flex flex-col gap-1.5">
              {privacyPolicy.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-body text-[#838D97] underline decoration-solid underline-offset-2 hover:text-paper">
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-12 flex flex-col gap-10">
            {privacyPolicy.sections.map((section) => (
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

        {/* Edge-to-edge separator before the footer (owner: "add a
            separator at the end of the section so footer and it has some
            separation," then "should be edge to edge") -- a direct
            sibling of the centred `max-w-[760px]` column above, not
            nested inside it, so it spans this section's own full width
            instead of being capped to the reading column. */}
        <hr className="mt-16 border-t border-line-dark" />
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
