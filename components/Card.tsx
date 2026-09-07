// components/Card.tsx
// The two Card variants: category (image plus label, the whole card a link,
// matches the "What We Make" tiles) and capability (image, title, body, no
// link, matches the "Our Services" tiles, aspect ratio measured from that
// wireframe at roughly 16:9).
//
// Both variants share CardMedia for the image area. With no `image` prop it
// renders a plain placeholder box, since real photography is not available yet.
// Passing `image` later swaps in a real next/image in its place with no other
// code changes, so photography can land without a rebuild.
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { cx } from "./ui/cx";
import { capabilityCard, card, cardMedia } from "./ui/styles";

export type CardImage = {
  src: string | StaticImageData;
  alt: string;
};

type CardMediaProps = {
  image?: CardImage;
  imageSizes?: string;
  aspectClassName: string;
  /**
   * `lg` (default) or `none`. A mutually-exclusive swap, never a second
   * `rounded-*` class appended alongside the default -- two competing
   * radius utilities in the same string aren't guaranteed to cascade in
   * class-list order (the exact bug already found and fixed elsewhere in
   * this project), so `cardMedia.base` carries no radius of its own; each
   * caller states which one it wants.
   */
  radius?: "lg" | "none";
  className?: string;
};

function CardMedia({
  image,
  imageSizes = "100vw",
  aspectClassName,
  radius = "lg",
  className,
}: CardMediaProps) {
  const classes = cx(aspectClassName, cardMedia.base, cardMedia.radius[radius], className);

  if (image) {
    return (
      <div className={cx(cardMedia.image, classes)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={imageSizes}
          className={cardMedia.imageFill}
        />
      </div>
    );
  }

  return <div className={cx(cardMedia.placeholder, classes)} aria-hidden="true" />;
}

export type CardProps = {
  label: string;
  href: string;
  image?: CardImage;
  imageSizes?: string;
  /** `lg` (default, rounded) or `none` -- What We Make's product tiles' own confirmed 0px radius, 2026-08-26. */
  mediaRadius?: "lg" | "none";
  /**
   * Overrides the media area's aspect ratio, default `aspect-square` --
   * same override pattern as `CapabilityCard`'s own `mediaAspectClassName`
   * above. What We Make's own desktop grid tiles (owner request,
   * 2026-09-07: "300 by 320... height more than the width") are the first
   * caller to actually pass one; every other caller (styleguide) keeps the
   * square default unchanged.
   */
  mediaAspectClassName?: string;
};

export function Card({
  label,
  href,
  image,
  imageSizes,
  mediaRadius = "lg",
  mediaAspectClassName = "aspect-square",
}: CardProps) {
  return (
    <Link href={href} className={card.root}>
      <CardMedia
        image={image}
        imageSizes={imageSizes}
        aspectClassName={mediaAspectClassName}
        radius={mediaRadius}
        className={card.mediaHover}
      />
      <span className={card.label}>{label}</span>
    </Link>
  );
}

export type CapabilityCardProps = {
  title: string;
  body: string;
  image?: CardImage;
  imageSizes?: string;
  /**
   * Overrides the media area's aspect ratio. Default `aspect-video` (16:9)
   * is a placeholder guess from before any real section used this
   * component; Our Services' own confirmed ratio (7:5 mobile, 8:5 desktop,
   * 2026-08-25) is passed in by that section rather than becoming the new
   * shared default, in case a future caller needs 16:9 for real.
   */
  mediaAspectClassName?: string;
  /** `lg` (default, rounded) or `none` -- Our Services' own confirmed 0px radius, 2026-08-25. */
  mediaRadius?: "lg" | "none";
  /**
   * Full replacements, not appended classes, for the root/body-wrapper gap
   * and the title size -- each defaults to Our Services' own confirmed
   * values (this component's first real usage), so that section is
   * unaffected. How It Works (2026-08-25, this component's second real
   * usage) needs different gaps and a smaller title, which is why these
   * exist: a second `gap-*`/`text-*` class appended alongside the default
   * isn't guaranteed to win the cascade (same risk already fixed on
   * `CardMedia`'s radius), so callers replace the whole class string
   * instead of layering onto it.
   */
  rootClassName?: string;
  bodyClassName?: string;
  titleClassName?: string;
};

export function CapabilityCard({
  title,
  body,
  image,
  imageSizes,
  mediaAspectClassName = "aspect-video",
  mediaRadius = "lg",
  rootClassName = capabilityCard.root,
  bodyClassName = capabilityCard.body,
  titleClassName = capabilityCard.title,
}: CapabilityCardProps) {
  return (
    <article className={rootClassName}>
      <CardMedia
        image={image}
        imageSizes={imageSizes}
        aspectClassName={mediaAspectClassName}
        radius={mediaRadius}
      />
      <div className={bodyClassName}>
        <h3 className={titleClassName}>{title}</h3>
        <p className={capabilityCard.text}>{body}</p>
      </div>
    </article>
  );
}
