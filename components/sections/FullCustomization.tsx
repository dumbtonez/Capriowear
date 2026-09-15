// components/sections/FullCustomization.tsx
// Capriosports homepage section 8, "Full Customization" -- 2026-09-15
// rebuild. A 5-item icon grid ("raw material to retail-ready packaging"
// pattern). This does not actually exist as a built section on the
// Services page today -- that phrase is only `content/services.ts`'s own
// metaDescription string, never a rendered section -- so this adapts
// WhatWeCover's real `ul/li` grid shape (SEO/AEO/GEO discipline: real list
// markup, not styled divs) with an icon slot added, rather than reusing a
// section that was never actually built.
import { Factory, Layers, ShieldCheck, Tag, Truck } from "lucide-react";
import type { ComponentType } from "react";

import { SectionHeading } from "@/components/SectionHeading";
import { TextReveal } from "@/components/TextReveal";
import { fullCustomization } from "@/components/ui/styles";
import type { capriosportsHome } from "@/content/capriosports/home";

export type FullCustomizationProps = {
  content: typeof capriosportsHome.fullCustomization;
};

// Matched by position, not by a content field -- `content/capriosports/
// home.ts`'s items are copy-only (title/body), same "copy file has no
// opinion on iconography" split every other icon usage on this site
// follows (e.g. Marquee's separator glyph, Sparkle on TrustPoints).
const ICONS: ComponentType<{ className?: string; "aria-hidden"?: boolean }>[] = [
  Factory,
  Layers,
  Tag,
  ShieldCheck,
  Truck,
];

export function FullCustomization({ content }: FullCustomizationProps) {
  return (
    <section className={fullCustomization.section}>
      <div className={fullCustomization.headingBlock}>
        <SectionHeading
          eyebrow={<TextReveal text={content.eyebrow} />}
          heading={<TextReveal as="span" text={content.h2} />}
          eyebrowTone="light"
          align="center"
        />
        <p className={fullCustomization.lead}>{content.lead}</p>
      </div>

      <ul className={fullCustomization.grid}>
        {content.items.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <li key={item.title} className={fullCustomization.item}>
              <span className={fullCustomization.iconWrap}>
                <Icon className={fullCustomization.icon} aria-hidden />
              </span>
              <p className={fullCustomization.itemTitle}>{item.title}</p>
              <p className={fullCustomization.itemBody}>{item.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
