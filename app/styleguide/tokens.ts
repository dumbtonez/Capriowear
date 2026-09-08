// app/styleguide/tokens.ts
// Typed mirror of the design tokens for display purposes only.
// The real tokens live in the `@theme` block of app/globals.css. Nothing here is
// used to style the site, it exists so /styleguide can label what it renders.

export type ColorToken = {
  name: string;
  value: string;
  use: string;
  /** Tailwind utility that applies it as a background. */
  utility: string;
  /** Render the swatch on a dark plate (for hairlines and paper tones). */
  onDark?: boolean;
  /** Hairlines are borders, not fills, so they preview differently. */
  kind?: "fill" | "hairline";
};

export const colorTokens: ColorToken[] = [
  {
    name: "ink",
    value: "#0E0E12",
    use: "Near-black. Dark sections and primary text.",
    utility: "bg-ink / text-ink",
  },
  {
    name: "ink-2",
    value: "#17171D",
    use: "Secondary dark surface, cards inside dark sections.",
    utility: "bg-ink-2",
  },
  {
    name: "paper",
    value: "#FFFFFF",
    use: "Default page background. Text on dark sections.",
    utility: "bg-paper / text-paper",
  },
  {
    name: "paper-2",
    value: "#F5F4F1",
    use: "Alternating light section background.",
    utility: "bg-paper-2",
  },
  {
    name: "muted",
    value: "#6B6B74",
    use: "Secondary text, captions, supporting copy.",
    utility: "text-muted",
  },
  {
    name: "accent",
    value: "#FF791B",
    use: "Brand orange. Primary CTAs and highlights.",
    utility: "bg-accent / text-accent",
  },
  {
    name: "accent-ink",
    value: "#FFFFFF",
    use: "Text and icons sitting on accent.",
    utility: "text-accent-ink",
  },
  {
    name: "line",
    value: "rgba(0,0,0,0.10)",
    use: "Hairline border on light backgrounds.",
    utility: "border-line",
    kind: "hairline",
  },
  {
    name: "line-dark",
    value: "rgba(255,255,255,0.12)",
    use: "Hairline border on dark sections.",
    utility: "border-line-dark",
    kind: "hairline",
    onDark: true,
  },
];

export type TypeToken = {
  name: string;
  /** The style's name in the Figma file, so the two can be checked line by line. */
  figmaName: string;
  utility: string;
  size: string;
  leading: string;
  tracking: string;
  weight: string;
  use: string;
  sample: string;
  /** Extra classes the specimen needs beyond the size utility. */
  sampleClass?: string;
};

/**
 * The thirteen Figma text styles, in scale order. Read from the Figma file
 * "Caprio Website" node 284:333, where they are registered as local text styles.
 * `figmaName` is the name as it appears in Figma, so this table can be checked
 * against the design file line by line.
 */
export const typeTokens: TypeToken[] = [
  {
    name: "Display",
    figmaName: "Display",
    utility: "text-display",
    size: "64px at 1440 and above, 32px at 360",
    leading: "70px (1.094)",
    tracking: "0",
    weight: "400 Regular",
    use: "Hero headline. One per page.",
    sample: "Custom activewear, built in Sialkot",
  },
  {
    name: "Heading 1",
    figmaName: "Heading 1",
    utility: "text-h1",
    size: "54px at 1440 and above, 30px at 360",
    leading: "64px (1.185)",
    tracking: "0",
    weight: "500 Medium",
    use: "Section headings and stat numbers. A type style, not a heading level: SectionHeading still renders an <h2>.",
    sample: "What we make",
  },
  {
    name: "Heading 2",
    figmaName: "Heading 2",
    utility: "text-h2",
    size: "36px at 1440 and above, 24px at 360",
    leading: "1.2",
    tracking: "0",
    weight: "500 Medium",
    use: "Sub-headings inside a section.",
    sample: "End to end manufacturing",
  },
  {
    name: "Heading 3",
    figmaName: "Heading 3",
    utility: "text-h3",
    size: "30px at 1440 and above, 22px at 360",
    leading: "1.2",
    tracking: "0",
    weight: "500 Medium",
    use: "Card titles, per Figma's Feature Card.",
    sample: "Product development",
  },
  {
    name: "Heading 4",
    figmaName: "Heading 4",
    utility: "text-h4",
    size: "28px at 1440 and above, 21px at 360",
    leading: "1.2",
    tracking: "0",
    weight: "500 Medium",
    use: "Defined in the scale. No component uses it yet.",
    sample: "Fabrics and materials",
  },
  {
    name: "Heading 5",
    figmaName: "Heading 5",
    utility: "text-h5",
    size: "24px, fixed",
    leading: "1.2",
    tracking: "0",
    weight: "500 Medium",
    use: "FAQ questions, category tile labels, drawer links.",
    sample: "What is your minimum order quantity?",
  },
  {
    name: "Overline",
    figmaName: "Overline",
    utility: "text-overline uppercase",
    size: "20px, fixed",
    leading: "1.2",
    tracking: "0",
    weight: "600 SemiBold",
    use: "The label above a section heading. Rendered by the Eyebrow component.",
    sample: "Made in Sialkot, Pakistan",
    sampleClass: "uppercase",
  },
  {
    name: "Body Large",
    figmaName: "Body Large",
    utility: "text-body-lg",
    size: "20px, fixed",
    leading: "1.2",
    tracking: "0",
    weight: "400 Regular",
    use: "Section descriptions, lead paragraphs, card body copy, stat captions.",
    sample:
      "We refine ideas through sampling, pattern development and technical packs, so your design reaches production ready.",
  },
  {
    name: "Body",
    figmaName: "Body",
    utility: "text-body",
    size: "18px, fixed",
    leading: "22px (1.222)",
    tracking: "0",
    weight: "400 Regular",
    use: "Default paragraph copy. FAQ answers, mega menu links.",
    sample:
      "Low minimums, full customisation and in-house control across cutting, printing, embroidery and finishing.",
  },
  {
    name: "Button",
    figmaName: "Button",
    utility: "text-button uppercase",
    size: "18px, fixed",
    leading: "24px (1.333)",
    tracking: "0",
    weight: "700 Bold",
    use: "Button labels.",
    sample: "Request a sample",
    sampleClass: "uppercase",
  },
  {
    name: "Button Small",
    figmaName: "Button Small",
    utility: "text-button-sm",
    size: "16px, fixed",
    leading: "24px (1.5)",
    tracking: "0",
    weight: "700 Bold",
    use: "Compact controls: nav links, chips, ticker items, placeholder labels. The smallest style in the system.",
    sample: "Download catalog",
  },
  {
    name: "Stat Number",
    figmaName: "Stat Number",
    utility: "text-stat-number",
    size: "60px at 1440 and above, 32px at 360",
    leading: "1.2",
    tracking: "0",
    weight: "600 SemiBold",
    use: "Big numerals. Used by the How It Works step number.",
    sample: "100,000+",
  },
  {
    name: "Stat Label",
    figmaName: "Stat Label",
    utility: "text-stat-label",
    size: "50px at 1440 and above, 28px at 360",
    leading: "1.2",
    tracking: "0",
    weight: "600 SemiBold",
    use: "Defined in the scale. No component uses it: Figma's own Stat Card uses Heading 1.",
    sample: "50,000",
  },
];

export type SpaceToken = { px: number; utility: string; use?: string };

/** 4px base scale from CLAUDE.md, mapped onto Tailwind's numeric spacing scale. */
export const spaceTokens: SpaceToken[] = [
  { px: 4, utility: "1", use: "Icon nudges" },
  { px: 8, utility: "2", use: "Chip padding" },
  { px: 12, utility: "3" },
  { px: 16, utility: "4", use: "Grid gap, mobile" },
  { px: 20, utility: "5", use: "Container padding, mobile" },
  { px: 24, utility: "6", use: "Grid gap, tablet" },
  { px: 32, utility: "8", use: "Container padding, tablet. Grid gap, desktop" },
  { px: 40, utility: "10" },
  { px: 48, utility: "12", use: "Container padding, desktop" },
  { px: 64, utility: "16", use: "Section padding, mobile" },
  { px: 80, utility: "20" },
  { px: 96, utility: "24", use: "Section padding, tablet" },
  { px: 120, utility: "30", use: "Section padding, desktop" },
  { px: 160, utility: "40", use: "Largest rhythm step" },
];

export type RadiusToken = { name: string; value: string; utility: string; use: string };

export const radiusTokens: RadiusToken[] = [
  { name: "sm", value: "8px", utility: "rounded-sm", use: "Small chips, inputs" },
  { name: "md", value: "12px", utility: "rounded-md", use: "Inner blocks, badges" },
  { name: "lg", value: "16px", utility: "rounded-lg", use: "Cards" },
  { name: "xl", value: "24px", utility: "rounded-xl", use: "Media and video blocks" },
  { name: "pill", value: "9999px", utility: "rounded-pill", use: "Buttons, tags" },
];

export type ComponentSlotSpec = {
  name: string;
  note: string;
  /** Variants or states the built component must cover. */
  variants?: string[];
  /** Widest useful preview, so slots do not all look identical. */
  span?: "half" | "full";
};

/**
 * Atoms and molecules from CLAUDE.md section 4 that are still unbuilt.
 * Everything else (Button, Eyebrow, Chip, SectionHeading, Card, StatBlock,
 * MediaPlaceholder, LogoRow, Marquee, Accordion, Header, MobileNav) is built
 * in /components and rendered live above this grid.
 */
export const componentSlots: ComponentSlotSpec[] = [
  { name: "Footer", note: "Build last. Parked for now, per CLAUDE.md.", span: "full" },
];

/** Homepage sections from CLAUDE.md section 4, in wireframe order. */
export const sectionSlots: { name: string; note: string }[] = [
  { name: "Header / Nav", note: "Sticky, hairline bottom border" },
  { name: "Hero", note: "Video block, eyebrow, H1, two CTAs" },
  { name: "Fully Custom Offerings ticker", note: "Marquee" },
  { name: "Brand logos row", note: "LogoRow" },
  { name: "Trust strip", note: "4 tiles" },
  { name: "What We Make", note: "Activewear and Teamwear featured grids" },
  { name: "Certified & Compliant", note: "Heading plus certification badge grid" },
  { name: "Stats", note: "Dark band, 3 to 4 big numbers" },
  { name: "Inside the Factory", note: "Dark, factory media, line, CTA" },
  { name: "Compliance ticker", note: "Marquee" },
  { name: "Our Services / Capabilities", note: "5 items" },
  { name: "How It Works", note: "5 steps" },
  { name: "FAQ", note: "Accordion" },
  { name: "Final CTA band", note: "Accent or dark band" },
  { name: "Footer", note: "Later" },
];
