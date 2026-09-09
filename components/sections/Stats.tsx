// components/sections/Stats.tsx
// Homepage section 8. Figma: desktop node 387:498, mobile node 387:511.
//
// The first dark section since Hero. Not StatBlock (3 stats side by side,
// already built) -- the real layout is media plus a stacked text list,
// structurally like Trust Signals, and this section's own typography
// doesn't match StatBlock's Stat Number/Stat Label tokens either.
//
// Redesigned 2026-09-09 (Figma node 819:329): media widened to 864x620,
// each stat now ends in a gradient divider line except the last, and
// both breakpoints share the same spacing/divider structure -- the
// owner's numbers (16px value-to-caption, 32px text-to-divider, 40px
// between stats) carry no breakpoint split, and mobile's own former
// bordered divided list is gone, replaced by the same `item`/`itemText`/
// `divider` shape desktop uses. See `stats` (components/ui/styles.ts)
// for the full reasoning.
//
// Mobile section padding follows the standing rule for every dark
// full-bleed section (2026-08-24, first applied to Hero): content keeps a
// fixed 48px inset from the box's own top/bottom edges, and the standard
// 72px section-to-section gap is a margin on the section itself, not
// padding inside it -- padding would just make the dark box taller, not
// create a visible gap.
//
// Takes its stat list as a prop (not a direct content/home.ts import), so
// any page can render this section with its own numbers -- see
// app/page.tsx for the homepage's values.
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { stats } from "@/components/ui/styles";
import type { home } from "@/content/home";

export type StatsProps = {
  items: typeof home.stats;
};

export function Stats({ items }: StatsProps) {
  return (
    <section>
      {/* Desktop: media left, stat list right. bg-ink lives on the outer,
          unconstrained wrapper so it fills edge to edge at any viewport
          width -- container-p (on the inner wrapper) only constrains the
          content, never the background. */}
      <div className={stats.desktopOuter}>
        <div className={stats.desktopSection}>
          <div className={stats.desktopInner}>
            <div className={stats.desktopMedia}>
              <MediaPlaceholder label="Stats artwork" ratio="216:155" radius="none" tone="dark" />
            </div>
            <div className={stats.desktopList}>
              {items.map((stat, index) => (
                <div key={stat.value} className={stats.item}>
                  <div className={stats.itemText}>
                    <p className={stats.value}>{stat.value}</p>
                    <p className={stats.caption}>{stat.caption}</p>
                  </div>
                  {index < items.length - 1 ? <div className={stats.divider} /> : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: media on top, divided stat list below */}
      <div className={stats.mobileSection}>
        <div className={stats.mobileMedia}>
          <MediaPlaceholder label="Stats artwork" ratio="16:11" radius="none" tone="dark" />
        </div>
        <div className={stats.mobileList}>
          {items.map((stat, index) => (
            <div key={stat.value} className={stats.item}>
              <div className={stats.mobileItemText}>
                <p className={stats.mobileValue}>{stat.value}</p>
                <p className={stats.mobileCaption}>{stat.caption}</p>
              </div>
              {index < items.length - 1 ? <div className={stats.divider} /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
