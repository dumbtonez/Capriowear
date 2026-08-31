// components/sections/Faq.tsx
// Homepage section 13. Figma desktop node 438:2150 / mobile node 438:2192.
// No eyebrow -- one large heading, then the answer accordion. Same content
// feeds the visible Accordion here and the FAQPage schema rendered in
// app/page.tsx, so the two never drift apart.
import { Accordion } from "@/components/Accordion";
import { faq } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type FaqProps = { content: typeof home.faq };

export function Faq({ content }: FaqProps) {
  const items = content.items.map((item) => ({ question: item.q, answer: item.a }));

  return (
    <>
      <section className={faq.desktopOuter}>
        <div className={faq.desktopInner}>
          <h2 className={faq.desktopHeading}>{content.h2}</h2>
          <Accordion items={items} defaultOpen={1} className={faq.desktopAccordion} />
        </div>
      </section>

      <section className={faq.mobileSection}>
        <h2 className={faq.mobileHeading}>{content.h2}</h2>
        <Accordion items={items} defaultOpen={1} className={faq.mobileAccordion} />
      </section>
    </>
  );
}
