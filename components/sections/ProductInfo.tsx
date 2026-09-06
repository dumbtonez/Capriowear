// components/sections/ProductInfo.tsx
// The PDP's product info text block (Figma node 634:4988 desktop / 638:2541
// mobile, "Content", 2026-08-31): SKU row, then H1 + description. Identical
// copy and internal spacing at both breakpoints -- the page-level margin
// around this block (the mobile frame's own 20px inset) is the caller's
// `container-p` wrapper, not this component's own concern (see
// app/activewear/[category]/[product]/page.tsx). This is the text half
// only; the image gallery it sits next to on desktop isn't built yet.
import { productInfo } from "@/components/ui/styles";

export type ProductInfoProps = {
  sku?: string;
  heading: string;
  description: string;
};

export function ProductInfo({ sku, heading, description }: ProductInfoProps) {
  return (
    <div className={productInfo.root}>
      {sku ? (
        <div className={productInfo.skuRow}>
          <p className={productInfo.sku}>{sku}</p>
        </div>
      ) : null}
      <div className={productInfo.content}>
        <h1 className={productInfo.heading}>{heading}</h1>
        <p className={productInfo.description}>{description}</p>
      </div>
    </div>
  );
}
