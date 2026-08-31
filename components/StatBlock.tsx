// components/StatBlock.tsx
// Big number plus caption. Its only documented use is the dark "Stats" band, so
// unlike SectionHeading the recipe hardcodes paper rather than inheriting
// ambient colour: there is no light-section use case to stay generic for.
// Sizes and the 70% caption dimming match the numbers in the desktop wireframe.
import type { ReactNode } from "react";

import { stat } from "./ui/styles";

export type StatBlockProps = {
  value: ReactNode;
  caption: ReactNode;
};

export function StatBlock({ value, caption }: StatBlockProps) {
  return (
    <div className={stat.root}>
      <p className={stat.value}>{value}</p>
      <p className={stat.caption}>{caption}</p>
    </div>
  );
}
