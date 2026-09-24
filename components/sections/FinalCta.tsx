// components/sections/FinalCta.tsx
// Homepage section 10, the page's closing section. Figma: desktop node
// 409:5309 ("Desktop CTA"), mobile node 409:5342 ("Mobile CTA").
//
// One CTA block (heading, subline, buttons) at every width, laid out by
// responsive classes (Bodysuits audit #13, 2026-09-24: it used to render a
// desktop copy and a mobile copy, duplicating the H2). Only the ticker
// differs by breakpoint, because the two are genuinely different widgets:
//   - Tablet up: the CTA block, then the compliance ticker below it as a
//     Marquee band, one continuous bg-ink section.
//   - Mobile: the ticker comes FIRST, as its own labelled vertical list
//     (not a marquee, same pattern as Hero), then the CTA block.
//
// Mobile interaction: as the user scrolls, the list item nearest the
// viewport's vertical centre brightens to white, fading smoothly as it
// scrolls past -- one line in focus at a time, not a group dim. Shared with
// Hero's mobile "Fully Custom Offerings" list via ScrollSpotlightList (see
// that file for the mechanics); this stays a server component itself.
//
// `ticker` is optional (owner call, 2026-08-27): this component is now
// rendered twice on the homepage (the original CTA, and a second closing
// CTA after FAQ), and repeating the same compliance ticker a second time
// read as an unwanted extra section, especially on mobile where it renders
// as its own large labelled block ABOVE the CTA, not a subtle strip below
// it like desktop's marquee. Omitting `ticker` drops that whole block on
// both breakpoints -- just the heading/subline/button remain. On desktop
// specifically, the ticker's own Marquee also supplied this section's only
// bottom padding (`band` itself has none) -- without it the CTA button sat
// flush against whatever follows with zero gap, a real bug found live once
// the second, ticker-less CTA shipped. `bandNoTicker` adds that padding
// back only when there's no ticker to supply it. Same shape of bug on
// mobile: `ctaBlock`'s own 72px top padding assumes a ticker list precedes
// it in the same black box; without one it stacks on top of the previous
// section's standard bottom gap instead (also found live, 2026-08-27) --
// `ctaBlockNoTicker` resets it.
//
// `secondaryCta` (added 2026-09-07, Services page's own closing CTA) is a
// second, outline `Button` rendered alongside the primary one -- optional,
// so every existing homepage/PLP usage (a single button) is unaffected.
import Link from "next/link";
import { Fragment } from "react";

import { Button } from "@/components/Button";
import { Marquee } from "@/components/Marquee";
import { ScrollSpotlightList } from "@/components/ScrollSpotlightList";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { finalCta } from "@/components/ui/styles";

// Plain (non-`typeof home.finalCta`/`typeof home.complianceTicker`) shapes,
// `readonly`-compatible -- same reasoning as `Faq.tsx`'s own `FaqProps`
// widening: `content/services.ts` is an `as const` file (unlike `content/
// home.ts`), so `services.finalCta`/`services.complianceBar` are readonly,
// and this component is reused verbatim by both.
type FinalCtaContent = { h2: string; subline: string; cta: { label: string; href: string } };
type ComplianceTicker = { title: string; items: readonly string[] };

export type FinalCtaProps = {
  content: FinalCtaContent;
  ticker?: ComplianceTicker;
  /** Renders a second, outline `Button` alongside the primary one (owner,
   *  2026-09-07, Services page's own closing CTA: "Secondary CTA button:
   *  Download Catalog"). Optional -- every existing homepage/PLP usage
   *  omits it and keeps rendering just the one primary button, unchanged. */
  secondaryCta?: { label: string; href: string };
  /** The section directly above this one already supplies the standard
   *  mobile 72px gap (e.g. Faq's own mobile `max-md:py-[72px]` on the
   *  Activewear PLP) -- drops this ticker block's own pt-[72px] so the two
   *  don't stack into 144px. See `mobileTickerBlockTight`'s own comment in
   *  components/ui/styles.ts. */
  compactMobileTop?: boolean;
  /** Drops the mobile ticker list even when `ticker` is passed (owner,
   *  2026-09-08, Services page's own FAQ-adjacent closing CTA: "on services
   *  mobile, remove 'standard on every order' under the faq cta, only keep
   *  the cta") -- desktop keeps its own Marquee unaffected, since only the
   *  mobile block was flagged. Mobile then falls back to
   *  `ctaBlockNoTicker`'s own spacing, the same as a real `!ticker`
   *  usage, since there's no ticker block above it any more on this
   *  breakpoint either. */
  hideTickerMobile?: boolean;
  /** A short row of plain text links under the CTA button(s) (added
   *  2026-09-11, Teamwear hub's closing CTA: cross-links to /activewear,
   *  /our-factory, /services). Optional -- every existing usage omits it
   *  and renders unaffected. Shared markup for both breakpoints, since the
   *  row is short enough not to need its own mobile stack. */
  crossLinks?: { label: string; href: string }[];
};

// A literal "\n" in `content.subline` forces a line break from tablet up
// only (owner, 2026-09-09, `home.finalCta.subline`: "make with next steps
// in 2nd line"). One node for both layouts: each break is a space (so
// mobile's natural wrap reads "steps. We'll" as before) followed by a
// `<br>` hidden below `md`. A trailing space before a line break collapses,
// so tablet up is unchanged. A subline with no "\n" renders as plain text.
function Subline({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <p className={finalCta.subline}>
      {lines.map((line, index) => (
        <Fragment key={index}>
          {index > 0 && (
            <>
              {" "}
              <br className="max-md:hidden" />
            </>
          )}
          {line}
        </Fragment>
      ))}
    </p>
  );
}

function CrossLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className={finalCta.crossLinksList}>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={finalCta.crossLinksItem}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FinalCta({
  content,
  ticker,
  secondaryCta,
  compactMobileTop,
  hideTickerMobile,
  crossLinks,
}: FinalCtaProps) {
  const showMobileTicker = ticker && !hideTickerMobile;
  return (
    <section className={finalCta.section}>
      <div className={cx(finalCta.band, !ticker && finalCta.bandNoTicker)}>
        {/* Mobile only: ticker list first, CTA block below. */}
        {showMobileTicker ? (
          <div className={cx(finalCta.mobileTickerBlock, compactMobileTop && finalCta.mobileTickerBlockTight)}>
            <span className={finalCta.mobileTickerLabel}>{ticker.title}</span>
            <ScrollSpotlightList
              items={ticker.items}
              listClassName={finalCta.mobileTickerList}
              itemClassName={finalCta.mobileTickerItem}
            />
          </div>
        ) : null}

        {/* The CTA block: one tree, both layouts. */}
        <div className={cx(finalCta.ctaBlock, !showMobileTicker && finalCta.ctaBlockNoTicker)}>
          <div className={finalCta.headingWrap}>
            <TextReveal as="h2" text={content.h2} className={finalCta.heading} />
            <Subline text={content.subline} />
          </div>
          {secondaryCta ? (
            <div className={finalCta.buttonRow}>
              <Button href={content.cta.href} className={finalCta.button}>
                {content.cta.label}
              </Button>
              <Button variant="secondary" href={secondaryCta.href} className={finalCta.button} gradientBorder>
                {secondaryCta.label}
              </Button>
            </div>
          ) : (
            <Button href={content.cta.href} className={finalCta.button}>
              {content.cta.label}
            </Button>
          )}
          {crossLinks ? <CrossLinks links={crossLinks} /> : null}
        </div>

        {/* Tablet up only: the Marquee band below the CTA. */}
        {ticker ? (
          <Marquee
            items={ticker.items}
            separator="sparkle"
            itemSize="lg"
            tone="dark"
            divider={false}
            className={finalCta.tickerBand}
          />
        ) : null}
      </div>
    </section>
  );
}
