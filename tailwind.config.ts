// tailwind.config.ts
// -----------------------------------------------------------------------------
// Tailwind v4 keeps the design theme in CSS, so every Capriowear token (colour,
// type scale, spacing, radii, shadows, container) lives in the `@theme` block at
// the top of `app/globals.css`. That block is the single source of truth: it
// emits the CSS custom properties AND generates the Tailwind utilities, so the
// two can never drift.
//
// This file stays as the source-glob config, loaded from globals.css via
// `@config`. Do not re-declare tokens here, or the theme forks in two places.
// -----------------------------------------------------------------------------
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
} satisfies Config;
