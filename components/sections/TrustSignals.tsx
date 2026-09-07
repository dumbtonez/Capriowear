// components/sections/TrustSignals.tsx
// Homepage section 5. Figma: desktop node 348:1862, mobile node 348:1880.
//
// Genuinely different treatments per breakpoint, not one responsive layout:
//   - Desktop: media block on the left, two side-by-side text sub-columns on
//     the right (left column: Product Development, Low MOQ; right column:
//     Private Label, Worldwide Shipping) -- confirmed via metadata, not a
//     single 4-item grid.
//   - Mobile: artwork on top, then all four items stacked as one divided
//     list (border between each pair, none after the last).
//
// This replaces docs/03-component-library.md's earlier "CapabilityCard x4"
// entry, which was a wireframe-era guess with no real design behind it.
//
// Takes its item list as a prop (not a direct content/home.ts import), so
// any page can render this section with its own text -- see app/page.tsx
// for the homepage's values.
//
// Reused on /services (owner, 2026-09-07: "this is already built on
// homepage, use same as is. only the spacing needs to adjust, from the top
// its 160px bottom 80px") -- same section, same copy (home.trustStrip),
// only the outer desktop top/bottom spacing changes per page (Figma node
// 729:208 on Services: 160px/80px vs homepage's own symmetric 120px/120px),
// via `pageVariant`, same pattern `OurServices` already established for
// its own Services-page reuse. No mobile Figma spacing exists for this
// placement either, so mobile stays on the one shared `mobileWrap` --
// already the project's own standing 72px inter-section rule, not a guess
// specific to homepage.
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { trustSignals } from "@/components/ui/styles";
import type { home } from "@/content/home";

type BodySegment = string | { bold: string };

export type TrustSignalsProps = {
  items: typeof home.trustStrip;
  pageVariant?: "home" | "services";
};

function Body({ segments }: { segments: BodySegment[] }) {
  return (
    <p className={trustSignals.body}>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <span key={index} className={trustSignals.bold}>
            {segment.bold}
          </span>
        ),
      )}
    </p>
  );
}

function MobileBody({ segments }: { segments: BodySegment[] }) {
  return (
    <p className={trustSignals.mobileBody}>
      {segments.map((segment, index) =>
        typeof segment === "string" ? (
          segment
        ) : (
          <span key={index} className={trustSignals.bold}>
            {segment.bold}
          </span>
        ),
      )}
    </p>
  );
}

export function TrustSignals({ items, pageVariant = "home" }: TrustSignalsProps) {
  const [column1, column2] = [items.slice(0, 2), items.slice(2, 4)];
  const desktopWrap = pageVariant === "services" ? trustSignals.desktopWrapServices : trustSignals.desktopWrap;

  return (
    <section>
      {/* Desktop: media left, two text sub-columns right */}
      <div className={desktopWrap}>
        <div className={trustSignals.desktopMedia}>
          <MediaPlaceholder label="Trust signals artwork" ratio="50:37" radius="none" />
        </div>
        <div className={trustSignals.desktopText}>
          {[column1, column2].map((column, columnIndex) => (
            <div key={columnIndex} className={trustSignals.desktopColumn}>
              {column.map((entry) => (
                <div key={entry.title} className={trustSignals.item}>
                  <h3 className={trustSignals.title}>{entry.title}</h3>
                  <Body segments={entry.body} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: artwork on top, one divided list below */}
      <div className={trustSignals.mobileWrap}>
        <MediaPlaceholder
          label="Trust signals artwork"
          ratio="16:11"
          radius="none"
          className={trustSignals.mobileMedia}
        />
        <div className={trustSignals.mobileList}>
          {items.map((entry, index) => {
            const isFirst = index === 0;
            const isLast = index === items.length - 1;
            const itemClassName = isFirst
              ? trustSignals.mobileItemFirst
              : isLast
                ? trustSignals.mobileItemLast
                : trustSignals.mobileItemMiddle;

            return (
              <div key={entry.title} className={itemClassName}>
                <h3 className={trustSignals.mobileTitle}>{entry.title}</h3>
                <MobileBody segments={entry.body} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
