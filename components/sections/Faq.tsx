// components/sections/Faq.tsx
// Homepage section 13. Figma desktop node 438:2150 / mobile node 438:2192.
// No eyebrow -- one large heading, then the answer accordion. Same content
// feeds the visible Accordion here and the FAQPage schema rendered in
// app/page.tsx, so the two never drift apart. Reused verbatim (no fork, no
// restyle) by the Services page's own FAQ section (2026-09-07, owner:
// "same pattern as the homepage ... reuse it") -- `FaqProps` is deliberately
// a plain shape rather than `typeof home.faq`, so any page's own content
// object (mutable or `as const`) can feed it.
import { Fragment } from "react";

import { Accordion } from "@/components/Accordion";
import { faq } from "@/components/ui/styles";

// A plain (non-`typeof home.faq`) shape, `readonly`-compatible -- this
// component is reused verbatim by other pages with their own content
// (e.g. `content/services.ts`'s `services.faq`, an `as const` object, so
// its own `items` is a readonly tuple unlike `home.faq`'s mutable array).
export type FaqProps = { content: { h2: string; items: readonly { q: string; a: string }[] } };

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
//
// Generalized, 2026-09-11 (Teamwear hub, owner feedback: "use the title in
// 2 lines, as we have in design system") -- a heading with no "B2B" in it
// still needs the same real-2-line treatment, so a literal "\n" in the
// content string (same forced-break convention `FinalCta.tsx`'s own
// `DesktopSubline` already uses) is checked first and takes priority; the
// B2B-specific rule below stays as the fallback for every existing page's
// heading, unchanged.
function renderHeadingWithB2BBreak(heading: string) {
  if (heading.includes("\n")) {
    const lines = heading.split("\n");
    return (
      <>
        {lines.map((line, index) => (
          <Fragment key={index}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </>
    );
  }

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
