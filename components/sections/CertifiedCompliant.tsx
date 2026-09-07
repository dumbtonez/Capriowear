// components/sections/CertifiedCompliant.tsx
// Homepage section 7. Figma: desktop node 369:266, mobile node 375:435.
//
// Genuinely different treatments per breakpoint, not one responsive layout:
//   - Desktop: a single static row, no ticker, no border/box -- bare marks,
//     each at its own exact size (confirmed via get_design_context: none of
//     the 6 logo frames carry a background or border).
//   - Mobile: the same bordered grid Client Logos already established, now
//     with rounded 4px corners on both (Client Logos' own grid was square
//     until 2026-08-24). See `certified.mobileGrid` in components/ui/styles.ts
//     for the corner-radius technique and the jagged-corner bug it replaced.
//
// Real certification logos, exported per-node from Figma (node IDs recorded
// next to each entry in content/home.ts's certified.logos). `priority` on
// every logo: this section sits far enough down the page that the browser's
// default lazy-load IntersectionObserver did not reliably fire even once
// scrolled into view (confirmed: naturalWidth stayed 0 after an explicit
// scroll-and-wait), unlike every other real image on the page so far, none
// of which sit this far down. Six small logos are cheap enough that loading
// them eagerly is a reasonable trade for deterministic rendering in the
// Playwright screenshot QA gate.
//
// Mobile renders logo.mobileSrc, a genuinely separate export (node 375:435's
// own per-cell image nodes), not the desktop file reused at mobile's tile
// size: BSCI and IMAC crop to a real, different aspect ratio on mobile than
// on desktop (e.g. BSCI is 156:134 on desktop but 119:43 on mobile), so
// displaying the desktop file at the mobile box's dimensions stretched the
// artwork -- confirmed live and corrected 2026-08-23.
//
// Mobile logos also carry an explicit inline `style` width/height, not just
// the width/height props: Tailwind's preflight sets `img { height: auto }`,
// which overrides next/image's HTML height attribute whenever the rendered
// box's aspect ratio differs from the image file's own intrinsic ratio.
// Kept even after switching to per-breakpoint exports, as a safety net --
// inline style always wins over any stylesheet rule, so it costs nothing to
// leave in place.
//
// Takes its content as a prop (not a direct content/home.ts import), so any
// page can render this section with its own certs -- see app/page.tsx for
// the homepage's values.
import Image from "next/image";

import { Marquee } from "@/components/Marquee";
import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { cx } from "@/components/ui/cx";
import { certified } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type CertifiedCompliantProps = {
  content: typeof home.certified;
  /** `"services"` gives mobile its own 72px top gap (`certified.
   *  mobileSectionServices`) instead of the homepage's `pt-0` -- see that
   *  token's own comment for why the two pages need different values here.
   *  Default `"default"` (homepage) is byte-for-byte unchanged. */
  pageVariant?: "default" | "services";
};

export function CertifiedCompliant({ content, pageVariant = "default" }: CertifiedCompliantProps) {
  return (
    <section>
      <div className={certified.desktopSection}>
        <div className={certified.root}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="light"
            headingClassName={certified.headingNarrow}
            align="center"
          />
          <div className={certified.desktopRow}>
            {content.logos.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                priority
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tablet only (768-1279px): the static row's own flex-wrap genuinely
          wraps to 2+ lines at this width (6 logos + 5x69px gaps need more
          room than a 768-1279px container has) -- owner, 2026-09-03:
          "certificates, make them in one line and add marquie just for
          these viewports." Reuses Client Logos' own desktop technique
          (Marquee, separator="none", logos as items) rather than a new
          mechanism. */}
      <div className={certified.tabletSection}>
        <div className={certified.root}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="light"
            headingClassName={certified.headingNarrow}
            align="center"
          />
          <Marquee
            items={content.logos.map((logo) => (
              <Image key={logo.name} src={logo.src} alt={logo.name} width={logo.width} height={logo.height} />
            ))}
            separator="none"
            gap="loose"
            divider={false}
            pauseOnHover={false}
            edgeFade
          />
        </div>
      </div>

      <div className={pageVariant === "services" ? certified.mobileSectionServices : certified.mobileSection}>
        <div className={certified.rootMobile}>
          <SectionHeading
            eyebrow={<TextReveal text={content.eyebrow} />}
            heading={<TextReveal as="span" text={content.h2} />}
            eyebrowTone="light"
            eyebrowSize={certified.eyebrowSizeMobile}
            align="center"
          />
          <div className={certified.mobileGridWrap}>
            <div className={certified.mobileGrid}>
              {content.logos.map((logo, index) => {
                const isLeftColumn = index % 2 === 0;
                const isLastRow = index >= content.logos.length - 2;
                return (
                  <div
                    key={logo.name}
                    className={cx(
                      certified.mobileItem,
                      isLeftColumn && certified.mobileItemDividerRight,
                      !isLastRow && certified.mobileItemDividerBottom,
                    )}
                  >
                    <Image
                      src={logo.mobileSrc}
                      alt={logo.name}
                      width={logo.mobileWidth}
                      height={logo.mobileHeight}
                      style={{ width: logo.mobileWidth, height: logo.mobileHeight }}
                      priority
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
