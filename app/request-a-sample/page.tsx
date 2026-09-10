// app/request-a-sample/page.tsx
// Pillar 5 of the launch punchlist -- the conversion point every CTA on
// the site points to (services.hero.ctaPrimary, services.finalCta.cta,
// both already say "Request a Sample" and link here). No Figma exists for
// this page; content comes from Mohsin's own spec doc (2026-09-10) -- see
// content/request-a-sample.ts for the full source comment.
//
// Design direction: full-black (owner, 2026-09-10: "V2 black design is
// the final" -- this page originally shipped light, with a
// `CategoryBanner`-style hero; a full-black comparison draft was built
// separately at /request-a-sample-v2, iterated on through several rounds
// of feedback, then chosen outright. That draft route and its own
// `RequestSampleFormDark`/light-variant machinery are retired now -- this
// is the one real page, `RequestSampleForm`'s own recipe (`requestSampleForm`
// in components/ui/styles.ts) is the dark look directly, no tone prop).
//
// Section 1: a plain heading block, not `CategoryBanner` -- this design
// has no PLP-style banner at all (owner: "no banner... maybe if we use
// the entire page black"). No visible `<Breadcrumb>` (owner, 2026-09-10:
// "remove the breadcrumb for this page from the interface but keep it in
// the backend... wherever its required for crawling") -- the
// `breadcrumbSchema()` JsonLd below still renders unconditionally, so
// crawlers/AI answer engines still get the real BreadcrumbList structured
// data; only the on-page `<Breadcrumb>` component is gone. H1 uses
// `TextReveal`, matching every other page's own heading animation. Trust
// signals render as a sparkle-bullet row under the
// title, in place of a plain subline (owner: "change the subline under
// the title to trustsignals") -- left-aligned on mobile, centred from
// `md:` up (owner: "On the mobile, request a sample and trustsignals
// should be left align").
// Section 2: RequestSampleForm -- the page's entire payoff.
// Section 3: FAQ, the sitewide `Faq` component (owner: "use the same
// global structure that we have in the design system, just change the
// content").
// Footer: sitewide, reused verbatim, same as every other page. Plain
// `<main>` -- the footer's own scroll-reveal (Footer.tsx) is fully self-
// contained; see that component's own header comment and docs/05-plan.md's
// decision log for the full back-and-forth this went through on
// 2026-09-10 before landing there.
import { Sparkle } from "lucide-react";
import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { Logo } from "@/components/Logo";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";
import { RequestSampleForm } from "@/components/sections/RequestSampleForm";
import { TextReveal } from "@/components/TextReveal";
import { header } from "@/components/ui/styles";
import { home } from "@/content/home";
import { requestASample } from "@/content/request-a-sample";
import { ORGANIZATION, SITE_NAME, SITE_URL } from "@/content/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const CANONICAL = `${SITE_URL}/request-a-sample`;

export const metadata: Metadata = {
  title: requestASample.metaTitle,
  description: requestASample.metaDescription,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: `${requestASample.metaTitle} | ${SITE_NAME}`,
    description: requestASample.metaDescription,
    url: CANONICAL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${requestASample.metaTitle} | ${SITE_NAME}`,
    description: requestASample.metaDescription,
  },
};

export default function RequestASamplePage() {
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
            <TextReveal as="h1" text={requestASample.hero.h1} className="text-display text-paper" />
            <ul className="flex flex-wrap items-center justify-start gap-x-6 gap-y-3 md:justify-center">
              {requestASample.hero.facts.map((fact) => (
                <li key={fact} className="flex items-center gap-2 text-[#abb5c0]">
                  <Sparkle className="size-4 shrink-0" aria-hidden="true" fill="currentColor" />
                  <span className="text-body-lg">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <RequestSampleForm content={requestASample.form} />
        <Faq content={requestASample.faq} />
      </main>

      <Footer content={home.footer} social={ORGANIZATION.sameAs} />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: SITE_URL },
          { name: "Request a Sample", url: CANONICAL },
        ])}
      />
      <JsonLd data={faqSchema(requestASample.faq.items)} />
    </>
  );
}
