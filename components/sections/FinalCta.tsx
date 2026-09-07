// components/sections/FinalCta.tsx
// Homepage section 10, the page's closing section. Figma: desktop node
// 409:5309 ("Desktop CTA"), mobile node 409:5342 ("Mobile CTA").
//
// Genuinely different layouts per breakpoint, not one responsive shape:
//   - Desktop: CTA block (heading, subline, button) then the compliance
//     ticker below it, as one continuous bg-ink band, reusing Marquee --
//     the same component already built for Hero's "Fully Custom Offerings"
//     strip, whose own header comment anticipated this exact section.
//   - Mobile: the ticker comes FIRST, as its own labelled vertical list
//     (not a marquee -- a plain stack, same "mobile ticker is a list, not
//     a scroller" pattern already established on Hero), then the CTA block
//     below it.
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
// bottom padding (`desktopSection` itself has none) -- without it the CTA
// button sat flush against whatever follows with zero gap, a real bug
// found live once the second, ticker-less CTA shipped. `desktopSectionNoTicker`
// adds that padding back only when there's no ticker to supply it. Same
// shape of bug on mobile: `mobileCtaBlock`'s own 72px top padding assumes a
// ticker block precedes it in the same black box; without one it stacks on
// top of the previous section's standard bottom gap instead, reading as an
// oversized space above the heading (also found live, 2026-08-27) --
// `mobileCtaBlockNoTicker` resets it to the standard pt-0.
//
// `secondaryCta` (added 2026-09-07, Services page's own closing CTA) is a
// second, outline `Button` rendered alongside the primary one -- optional,
// so every existing homepage/PLP usage (a single button) is unaffected.
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
   *  mobile 72px gap (e.g. Faq's own `mobileSection` pb-[72px] on the
   *  Activewear PLP) -- drops this ticker block's own pt-[72px] so the two
   *  don't stack into 144px. See `mobileTickerBlockTight`'s own comment in
   *  components/ui/styles.ts. */
  compactMobileTop?: boolean;
};

export function FinalCta({ content, ticker, secondaryCta, compactMobileTop }: FinalCtaProps) {
  return (
    <section>
      {/* Desktop: CTA block, then the ticker, one continuous band */}
      <div className={finalCta.desktopOuter}>
        <div className={cx(finalCta.desktopSection, !ticker && finalCta.desktopSectionNoTicker)}>
          <div className={finalCta.desktopCtaBlock}>
            <div className={finalCta.desktopHeadingWrap}>
              <TextReveal as="h2" text={content.h2} className={finalCta.desktopHeading} />
              <p className={finalCta.desktopSubline}>{content.subline}</p>
            </div>
            {secondaryCta ? (
              <div className={finalCta.desktopButtonRow}>
                <Button href={content.cta.href} className={finalCta.desktopButton}>
                  {content.cta.label}
                </Button>
                <Button variant="secondary" href={secondaryCta.href} className={finalCta.desktopButton}>
                  {secondaryCta.label}
                </Button>
              </div>
            ) : (
              <Button href={content.cta.href} className={finalCta.desktopButton}>
                {content.cta.label}
              </Button>
            )}
          </div>
          {ticker ? (
            <Marquee
              items={ticker.items}
              separator="sparkle"
              itemSize="lg"
              tone="dark"
              divider={false}
              className={cx("mt-[110px]", finalCta.desktopTickerTablet)}
            />
          ) : null}
        </div>
      </div>

      {/* Mobile: ticker list first, CTA block below -- a different order
          than desktop, not the same layout reflowed */}
      <div className={finalCta.mobileOuter}>
        {ticker ? (
          <div className={cx(finalCta.mobileTickerBlock, compactMobileTop && finalCta.mobileTickerBlockTight)}>
            <span className={finalCta.mobileTickerLabel}>{ticker.title}</span>
            <ScrollSpotlightList
              items={ticker.items}
              listClassName={finalCta.mobileTickerList}
              itemClassName={finalCta.mobileTickerItem}
            />
          </div>
        ) : null}
        <div className={cx(finalCta.mobileCtaBlock, !ticker && finalCta.mobileCtaBlockNoTicker)}>
          <div className={finalCta.mobileHeadingWrap}>
            <TextReveal as="h2" text={content.h2} className={finalCta.mobileHeading} />
            <p className={finalCta.mobileSubline}>{content.subline}</p>
          </div>
          {secondaryCta ? (
            <div className={finalCta.mobileButtonRow}>
              <Button href={content.cta.href} className={finalCta.mobileButton}>
                {content.cta.label}
              </Button>
              <Button variant="secondary" href={secondaryCta.href} className={finalCta.mobileButton}>
                {secondaryCta.label}
              </Button>
            </div>
          ) : (
            <Button href={content.cta.href} className={finalCta.mobileButton}>
              {content.cta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
