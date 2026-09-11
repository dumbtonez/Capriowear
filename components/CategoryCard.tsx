// components/CategoryCard.tsx
// The shared hub-directory link card: a small square thumbnail to the
// left of a name + one-line descriptor, used identically by both the
// Activewear hub and the Teamwear hub through the shared
// `CategoryLinkGrid.tsx` (both hubs render their own grouped sections
// through it -- Activewear's 5 mega-menu groups, Teamwear's 2) so the two
// stay visually consistent with each other -- one component, not two
// near-duplicates. Deliberately not
// `ProductCard`/`Card`: distinct from a PLP's image-forward style card so
// buyers don't mistake a hub card for a product listing (the Activewear
// hub's own source doc's explicit instruction, applied to both hubs for
// consistency, 2026-09-11).
//
// Thumbnail: 48px mobile, 64px desktop (owner spec) -- rendered from a
// real file at roughly 2x that (120-130px), `object-cover`, no crop
// guarding needed (owner: "I'm supplying them already framed correctly").
// No image yet (`image` undefined, e.g. a slug with no file dropped in)
// renders a plain placeholder box, same empty-state convention every
// other image slot on this site already uses -- picks up the real photo
// automatically once `lib/hubThumbnails.ts` finds the file, no further
// code change.
import Image from "next/image";
import Link from "next/link";

import { NextArrowIcon } from "@/components/icons/NextArrowIcon";
import { categoryCard } from "@/components/ui/styles";
import type { HubThumbnail } from "@/lib/hubThumbnails";

export type CategoryCardProps = {
  label: string;
  descriptor: string;
  href: string;
  image?: HubThumbnail;
};

export function CategoryCard({ label, descriptor, href, image }: CategoryCardProps) {
  return (
    <Link href={href} className={categoryCard.root}>
      <div className={categoryCard.thumb}>
        {image ? (
          <Image src={image.src} alt={image.alt} fill sizes="64px" className={categoryCard.thumbImage} />
        ) : (
          <div className={categoryCard.thumbPlaceholder} aria-hidden="true" />
        )}
      </div>
      <div className={categoryCard.text}>
        <span className={categoryCard.label}>{label}</span>
        <span className={categoryCard.descriptor}>{descriptor}</span>
      </div>
      <NextArrowIcon className={categoryCard.icon} aria-hidden="true" />
    </Link>
  );
}
