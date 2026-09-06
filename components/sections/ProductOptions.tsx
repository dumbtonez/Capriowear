// components/sections/ProductOptions.tsx
// The PDP's pill-tag groups (Figma node 634:5034 desktop / 645:2905 mobile,
// "Content", 2026-09-01): a heading + a wrapped row of pills, repeated for
// however many groups the page passes in ("Fabric options", "Customization"
// today). Identical copy and layout at both breakpoints -- pills simply
// reflow via `flex flex-wrap`, no responsive split needed. Generic over
// `groups` rather than two hard-coded props (`fabricPills`/
// `customizationPills`) so a future third group (if Figma ever adds one)
// is a data change, not a component change.
import { productOptions } from "@/components/ui/styles";

export type ProductOptionGroup = {
  heading: string;
  items: string[];
};

export type ProductOptionsProps = {
  groups: ProductOptionGroup[];
};

export function ProductOptions({ groups }: ProductOptionsProps) {
  return (
    <div className={productOptions.root}>
      {groups.map((group) => (
        <div key={group.heading} className={productOptions.group}>
          <p className={productOptions.heading}>{group.heading}</p>
          <ul className={productOptions.pillRow}>
            {group.items.map((item) => (
              <li key={item} className={productOptions.pill}>
                <span className={productOptions.pillText}>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
