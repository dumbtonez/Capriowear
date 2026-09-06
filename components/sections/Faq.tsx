// components/sections/Faq.tsx
// Homepage section 13. Figma desktop node 438:2150 / mobile node 438:2192.
// No eyebrow -- one large heading, then the answer accordion. Same content
// feeds the visible Accordion here and the FAQPage schema rendered in
// app/page.tsx, so the two never drift apart.
import { Accordion } from "@/components/Accordion";
import { faq } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type FaqProps = { content: typeof home.faq };

// Owner, 2026-09-04: "FAQ title, keep the word B2B in 2nd line all pages" --
// this exact heading, "Top questions from B2B buyers," is repeated as a
// literal string across every category's own content file (home.ts and
// every content/activewear/*.ts, content/teamwear/*.ts, ~30 files), not one
// shared constant, so a forced line break can't live in content without
// editing all of them. Handled once here instead, in the one shared
// component every page renders: a real <br/> inserted right before "B2B"
// (not CSS text-wrap, which can't target a specific word), so "B2B buyers"
// always starts its own line regardless of viewport width. Falls through
// to the plain string unchanged if a future heading doesn't contain "B2B"
// at all.
function renderHeadingWithB2BBreak(heading: string) {
  const index = heading.indexOf("B2B");
  if (index === -1) return heading;
  return (
    <>
      {heading.slice(0, index).trimEnd()}
      <br />
      {heading.slice(index)}
    </>
  );
}

export function Faq({ content }: FaqProps) {
  const items = content.items.map((item) => ({ question: item.q, answer: item.a }));
  const heading = renderHeadingWithB2BBreak(content.h2);

  return (
    <>
      <section className={faq.desktopOuter}>
        <div className={faq.desktopInner}>
          <h2 className={faq.desktopHeading}>{heading}</h2>
          <Accordion items={items} className={faq.desktopAccordion} />
        </div>
      </section>

      <section className={faq.mobileSection}>
        <h2 className={faq.mobileHeading}>{heading}</h2>
        <Accordion items={items} className={faq.mobileAccordion} />
      </section>
    </>
  );
}
