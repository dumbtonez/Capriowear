// tests/typography.spec.ts
// Asserts that the coded type scale is IDENTICAL to the Figma design system.
//
// Source: Figma file "Caprio Website", node 284:333, where all thirteen styles
// are registered as local text styles. The expected values below are read from
// that file. If a value here disagrees with Figma, Figma is right: change the
// token in app/globals.css, not this table.
//
// Line heights: several Figma styles report AUTO, which renders at exactly 1.2x
// for Figtree (confirmed against the rendered frame geometry, e.g. Heading 2 is
// 36px type in a 43px box). Those are expected as 1.2 x size here.
//
// The main check runs at 1440px, the width of the Figma frame -- that is where
// the design specifies a size, and where "identical" is therefore defined.
// Headline styles (Display, Heading 1-4, Stat Number, Stat Label) also keep
// scaling past 1440 up to a new max at 1920 (app/globals.css); that part of
// the contract is Claude's own, not Figma's, and is checked separately below.
//
//   npx playwright test tests/typography.spec.ts
import { expect, test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

/** Every style in the Figma type scale, with the values Figma states. */
const FIGMA_TYPE_SCALE = [
  { utility: "text-display", figmaName: "Display", px: 64, weight: 400, lineHeightPx: 70 },
  { utility: "text-h1", figmaName: "Heading 1", px: 54, weight: 500, lineHeightPx: 64 },
  { utility: "text-h2", figmaName: "Heading 2", px: 36, weight: 500, lineHeightPx: 36 * 1.2 },
  { utility: "text-h3", figmaName: "Heading 3", px: 30, weight: 500, lineHeightPx: 30 * 1.2 },
  { utility: "text-h4", figmaName: "Heading 4", px: 28, weight: 500, lineHeightPx: 28 * 1.2 },
  { utility: "text-h5", figmaName: "Heading 5", px: 24, weight: 500, lineHeightPx: 24 * 1.2 },
  { utility: "text-overline", figmaName: "Overline", px: 20, weight: 600, lineHeightPx: 20 * 1.2 },
  { utility: "text-body-lg", figmaName: "Body Large", px: 20, weight: 400, lineHeightPx: 20 * 1.2 },
  { utility: "text-body", figmaName: "Body", px: 18, weight: 400, lineHeightPx: 22 },
  { utility: "text-button", figmaName: "Button", px: 18, weight: 700, lineHeightPx: 24 },
  { utility: "text-button-sm", figmaName: "Button Small", px: 16, weight: 700, lineHeightPx: 24 },
  { utility: "text-stat-number", figmaName: "Stat Number", px: 60, weight: 600, lineHeightPx: 60 * 1.2 },
  { utility: "text-stat-label", figmaName: "Stat Label", px: 50, weight: 600, lineHeightPx: 50 * 1.2 },
];

/**
 * Styles 24px and under do not scale, so they are identical to Figma at every
 * width. The larger ones scale below 1440 and are only checked at 1440+.
 */
const FIXED_AT_EVERY_WIDTH = FIGMA_TYPE_SCALE.filter((t) => t.px <= 24);

/**
 * Headline styles keep scaling past Figma's 1440px frame, up to a new max
 * reached at 1920px (app/globals.css, added 2026-08-22 -- holding these flat
 * at their 1440 size read as small against a 1920 canvas). `px1920` is
 * max + (max - min) * 4/9, the same rate the 360-to-1440 span was fit to.
 */
const HEADLINE_1920_SCALE = [
  { utility: "text-display", figmaName: "Display", px1920: 78.222 },
  { utility: "text-h1", figmaName: "Heading 1", px1920: 64.667 },
  { utility: "text-h2", figmaName: "Heading 2", px1920: 41.333 },
  { utility: "text-h3", figmaName: "Heading 3", px1920: 33.556 },
  { utility: "text-h4", figmaName: "Heading 4", px1920: 31.111 },
  { utility: "text-stat-number", figmaName: "Stat Number", px1920: 72.444 },
  { utility: "text-stat-label", figmaName: "Stat Label", px1920: 59.778 },
];

/**
 * Reads the computed type of a probe element carrying the given utility class.
 * The probe is injected into the real page so it inherits the real font and
 * cascade rather than a synthetic one.
 */
async function measure(page: import("@playwright/test").Page, utility: string) {
  return page.evaluate((cls) => {
    const el = document.createElement("p");
    el.className = cls;
    el.textContent = "Hamburgefonstiv";
    document.body.appendChild(el);
    const s = getComputedStyle(el);
    const out = {
      fontSize: parseFloat(s.fontSize),
      fontWeight: parseInt(s.fontWeight, 10),
      lineHeight: s.lineHeight === "normal" ? "normal" : parseFloat(s.lineHeight),
      letterSpacing: s.letterSpacing,
      fontFamily: s.fontFamily,
    };
    el.remove();
    return out;
  }, utility);
}

test.describe("type scale matches Figma at 1440px", () => {
  for (const style of FIGMA_TYPE_SCALE) {
    test(`${style.figmaName} (${style.utility})`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE_URL}/styleguide`, { waitUntil: "networkidle" });

      const got = await measure(page, style.utility);

      // Sub-pixel tolerance only: clamp() arithmetic and rem rounding can land a
      // hair off an exact integer, but anything beyond half a pixel is a real
      // mismatch with the design.
      expect(got.fontSize, `${style.figmaName} font size`).toBeCloseTo(style.px, 1);
      expect(got.fontWeight, `${style.figmaName} font weight`).toBe(style.weight);
      expect(got.lineHeight, `${style.figmaName} line height`).toBeCloseTo(style.lineHeightPx, 0);
      // Figma sets letter spacing to 0 on every style in this system.
      expect(got.letterSpacing, `${style.figmaName} letter spacing`).toBe("normal");
      expect(got.fontFamily, `${style.figmaName} family`).toContain("Figtree");
    });
  }
});

test("styles 24px and under are identical to Figma on mobile too", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(`${BASE_URL}/styleguide`, { waitUntil: "networkidle" });

  for (const style of FIXED_AT_EVERY_WIDTH) {
    const got = await measure(page, style.utility);
    expect(got.fontSize, `${style.figmaName} at 360px`).toBeCloseTo(style.px, 1);
  }
});

test("no reading text falls below the 14px floor on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(`${BASE_URL}/styleguide`, { waitUntil: "networkidle" });

  for (const style of FIGMA_TYPE_SCALE) {
    const got = await measure(page, style.utility);
    expect(got.fontSize, `${style.figmaName} at 360px`).toBeGreaterThanOrEqual(14);
  }
});

test.describe("headline styles keep growing past 1440, up to a new max at 1920", () => {
  for (const style of HEADLINE_1920_SCALE) {
    test(`${style.figmaName} (${style.utility}) reaches its 1920 max`, async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(`${BASE_URL}/styleguide`, { waitUntil: "networkidle" });

      const got = await measure(page, style.utility);
      expect(got.fontSize, `${style.figmaName} at 1920px`).toBeCloseTo(style.px1920, 0);
    });
  }
});

test("headline styles hold flat above 1920, they don't keep growing forever", async ({ page }) => {
  await page.setViewportSize({ width: 2560, height: 1440 });
  await page.goto(`${BASE_URL}/styleguide`, { waitUntil: "networkidle" });

  for (const style of HEADLINE_1920_SCALE) {
    const got = await measure(page, style.utility);
    expect(got.fontSize, `${style.figmaName} at 2560px`).toBeCloseTo(style.px1920, 0);
  }
});
