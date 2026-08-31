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
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { trustSignals } from "@/components/ui/styles";
import type { home } from "@/content/home";

type BodySegment = string | { bold: string };

export type TrustSignalsProps = {
  items: typeof home.trustStrip;
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

export function TrustSignals({ items }: TrustSignalsProps) {
  const [column1, column2] = [items.slice(0, 2), items.slice(2, 4)];

  return (
    <section>
      {/* Desktop: media left, two text sub-columns right */}
      <div className={trustSignals.desktopWrap}>
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
        <MediaPlaceholder label="Trust signals artwork" ratio="16:11" radius="none" />
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
