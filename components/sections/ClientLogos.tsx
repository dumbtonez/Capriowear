// components/sections/ClientLogos.tsx
// Homepage section 4. Figma: desktop node 341:1732, mobile node 343:1840.
//
// Genuinely different treatments per breakpoint, not one responsive layout:
//   - Desktop: a horizontal Marquee, 72px gaps, no separator glyph, no
//     divider, full colour (not greyscale), each logo at its own exact Figma
//     size -- not scaled to a shared height.
//   - Mobile: a title, then a scrolling Marquee of the logos (owner call,
//     2026-08-26 -- replaces the static 2-column grid Figma originally
//     showed; the grid is kept as ClientLogosMobileGrid, styleguide-only,
//     for comparison, not deleted). LogoRow isn't used here either: it's a
//     flowing, wrap-as-needed row, a different shape than a ticker.
//
// No label above the logos at either breakpoint -- confirmed against Figma,
// correcting an earlier wireframe-era guess ("PRODUCING FOR BRANDS
// WORLDWIDE") that had no real design behind it.
//
// Real logo artwork, permission confirmed 2026-08-24: each file was exported
// directly off its own Figma node (node IDs recorded next to each entry in
// content/home.ts's brandLogos.registry), not sourced from the open web, so
// the exact mark and crop matches the design.
//
// Takes its logo content as a prop (not a direct content/home.ts import), so
// any page can render this section with its own brand list -- see
// app/page.tsx for the homepage's values.
import Image from "next/image";

import { Marquee } from "@/components/Marquee";
import { cx } from "@/components/ui/cx";
import { clientLogos } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type ClientLogosProps = {
  brandLogos: typeof home.brandLogos;
};

function Logo({
  name,
  registry,
  mobile = false,
}: {
  name: string;
  registry: typeof home.brandLogos.registry;
  mobile?: boolean;
}) {
  const entry = registry[name as keyof typeof registry];
  // WOLFpak only: desktop's node is icon-only, but the mobile grid's actual
  // Figma fill for that cell is icon-plus-wordmark, a genuinely different
  // asset for the same brand, not the same image reused smaller.
  const override = mobile && "mobileOverride" in entry ? entry.mobileOverride : null;

  const src = override?.src ?? entry.src;
  // Mobile shows every logo at its own distinct Figma size, not the desktop
  // size reused smaller -- see mobileWidth/mobileHeight in the registry.
  const width = mobile ? (override?.mobileWidth ?? entry.mobileWidth) : entry.width;
  const height = mobile ? (override?.mobileHeight ?? entry.mobileHeight) : entry.height;

  return <Image src={src} alt={name} width={width} height={height} />;
}

// Mobile title + scrolling Marquee -- the live mobile treatment as of
// 2026-08-26. `wrapClassName` lets the real section keep its `xl:hidden`
// responsive visibility while the styleguide comparison instance below uses
// a version without it, so it renders regardless of the reviewer's actual
// browser width.
function MobileMarquee({ brandLogos, wrapClassName }: ClientLogosProps & { wrapClassName: string }) {
  return (
    <div className={wrapClassName}>
      <h2 className={clientLogos.mobileTitle}>{brandLogos.title}</h2>
      <Marquee
        items={brandLogos.itemsMobile.map((name) => (
          <Logo key={name} name={name} registry={brandLogos.registry} mobile />
        ))}
        separator="none"
        gap="default"
        divider={false}
        pauseOnHover={false}
        edgeFade
        // No internal padding -- the wrapper already supplies the exact
        // 32px title-to-marquee gap and 40px bottom inset on its own; the
        // default padding would stack on top of both (found and fixed
        // 2026-08-26 -- an earlier attempt cancelled it with a negative
        // margin instead, which painted this component's own opaque
        // background over the title's descenders; see Marquee's `padded`
        // prop for the full explanation).
        padded={false}
      />
    </div>
  );
}

// The former mobile static 2-column grid, factored out so the exact same
// markup backs the styleguide-only comparison instance (ClientLogosMobileGrid)
// below -- kept for comparison after the marquee replaced it as the live
// mobile treatment (2026-08-26), not deleted.
function MobileGrid({ brandLogos, wrapClassName }: ClientLogosProps & { wrapClassName: string }) {
  return (
    <div className={wrapClassName}>
      <h2 className={clientLogos.mobileTitle}>{brandLogos.title}</h2>
      {/* Each logo in its own bordered box, rounded 4px corners on the grid
          as a whole. Grid and spacing are split across two elements (see
          mobileWrapGrid vs. mobileGrid in components/ui/styles.ts) so the
          section's own vertical padding doesn't push the grid's own border
          away from the cells. Only internal dividers are drawn per cell
          (never the outer edges, which belong to mobileGrid's own single
          border) -- see the note on clientLogos.mobileGrid for why. */}
      <div className={clientLogos.mobileGrid}>
        {brandLogos.itemsMobile.map((name, index) => {
          const isLeftColumn = index % 2 === 0;
          const isLastRow = index >= brandLogos.itemsMobile.length - 2;
          return (
            <div
              key={name}
              className={cx(
                clientLogos.mobileItem,
                isLeftColumn && clientLogos.mobileItemDividerRight,
                !isLastRow && clientLogos.mobileItemDividerBottom,
              )}
            >
              <Logo name={name} registry={brandLogos.registry} mobile />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ClientLogos({ brandLogos }: ClientLogosProps) {
  return (
    <section>
      {/* Desktop: title beside the ticker, side by side -- not in the
          original Figma frame, added 2026-08-26 referencing tedy.app's
          "Trusted by 500+ businesses" treatment (see Marquee's `title`
          labelVariant). */}
      <div className={clientLogos.desktopWrap}>
        <Marquee
          items={brandLogos.itemsDesktop.map((name) => (
            <Logo key={name} name={name} registry={brandLogos.registry} />
          ))}
          label={brandLogos.title}
          labelVariant="title"
          layout="inline"
          separator="none"
          gap="loose"
          divider={false}
          pauseOnHover={false}
          edgeFade
        />
      </div>

      {/* Mobile: title + scrolling Marquee -- see MobileMarquee above. */}
      <MobileMarquee brandLogos={brandLogos} wrapClassName={clientLogos.mobileWrap} />
    </section>
  );
}

// Styleguide-only comparison instance, no longer wired into the real page
// (2026-08-26 -- this became the live mobile treatment, so ClientLogos
// itself now renders MobileMarquee directly, above). Kept here, rendered
// without `xl:hidden`, so /styleguide can still show it for comparison
// regardless of the reviewer's actual browser width.
export function ClientLogosMobileMarquee({ brandLogos }: ClientLogosProps) {
  return <MobileMarquee brandLogos={brandLogos} wrapClassName={clientLogos.mobileWrapDemo} />;
}

// The former live grid's own markup, now styleguide-only (2026-08-26) --
// kept for comparison after the marquee replaced it as the real mobile
// treatment. Rendered without `xl:hidden` for the same reason as above.
export function ClientLogosMobileGrid({ brandLogos }: ClientLogosProps) {
  return <MobileGrid brandLogos={brandLogos} wrapClassName={clientLogos.mobileWrapGrid} />;
}
