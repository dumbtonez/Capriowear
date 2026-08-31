// components/LogoRow.tsx
// Brand logo row. Two uses in the wireframe: the "Producing for brands
// worldwide" row under the hero and the certification badge grid in Certified &
// Compliant.
//
// No real logo files exist yet, so each item falls back to a labelled outline
// box of the same size, matching the placeholder approach used elsewhere.
// Passing `src` swaps in the real mark with no other change.
//
// Brand logos render greyscale at rest and come to full colour on hover, the
// standard treatment for a client row; certification badges are meaningful
// marks rather than decoration, so `greyscale={false}` shows them as-is.
import Image, { type StaticImageData } from "next/image";

import { Eyebrow } from "./Eyebrow";
import { cx } from "./ui/cx";
import { logoRow } from "./ui/styles";

export type LogoItem = {
  /** Brand or certification name. Used as alt text and as placeholder label. */
  name: string;
  src?: string | StaticImageData;
};

export type LogoRowProps = {
  logos: LogoItem[];
  /** Optional label above the row, e.g. "PRODUCING FOR BRANDS WORLDWIDE". */
  label?: string;
  greyscale?: boolean;
  className?: string;
};

export function LogoRow({ logos, label, greyscale = true, className }: LogoRowProps) {
  return (
    <div className={cx(logoRow.root, className)}>
      {label ? <Eyebrow tone="muted">{label}</Eyebrow> : null}

      <ul className={logoRow.list}>
        {logos.map((logo) => (
          <li key={logo.name} className={logoRow.item}>
            {logo.src ? (
              <Image
                src={logo.src}
                alt={logo.name}
                height={40}
                width={140}
                className={cx(logoRow.logo, greyscale && logoRow.greyscale)}
              />
            ) : (
              <span className={logoRow.placeholder}>{logo.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
