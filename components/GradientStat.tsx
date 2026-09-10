// components/GradientStat.tsx
// Shared "value + orange gradient divider + caption" stat block -- used by
// both OurFactoryIntro (section 3 "The factory behind Capriowear" / section
// 7 "Audited, not just promised") and ServicesIntro ("A factory you can
// build your brand on"). Both sections had each built the identical
// divider+value+caption markup from scratch (owner, 2026-09-10: "these
// stats with the orange separator should be one component and used
// wherever this comes"). See `gradientStat` in components/ui/styles.ts for
// the shared recipe.
import { cx } from "@/components/ui/cx";
import { gradientStat } from "@/components/ui/styles";

export type GradientStatProps = {
  value: string;
  caption: string;
  /** Column max-width, the one real per-placement difference (e.g. OurFactoryIntro's two placements) -- appended after the shared `gradientStat.col`. */
  className?: string;
};

export function GradientStat({ value, caption, className }: GradientStatProps) {
  return (
    <div className={cx(gradientStat.col, className)}>
      <div className={gradientStat.divider} />
      <div className={gradientStat.stat}>
        <p className={gradientStat.value}>{value}</p>
        <p className={gradientStat.caption}>{caption}</p>
      </div>
    </div>
  );
}
