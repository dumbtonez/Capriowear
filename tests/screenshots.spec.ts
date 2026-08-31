// tests/screenshots.spec.ts
// Pixel-perfect QA loop for Capriowear.
// Run the dev server first (npm run dev), then: npx playwright test tests/screenshots.spec.ts
// Screenshots are written to /screenshots/<page>-<w>x<h>.png for review against the wireframe.

import { test } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

// Pages to capture. Add category, PDP, contact, etc. as they are built.
const pages = [
  { name: "styleguide", path: "/styleguide" },
  // Homepage: nav only so far. More sections land as Phase 2 continues.
  { name: "home", path: "/" },
  // Activewear PLP template: NOT in this permanent suite. Added briefly
  // 2026-08-28, reverted the same week (2026-08-30) -- several of this
  // page's sections (FabricOptions, TrustPoints, WhatWeCover) are real,
  // explicitly-scoped "desktop only for now, no mobile Figma frame exists
  // yet" builds, each with its own fixed, non-shrinking desktop width. That
  // makes "no horizontal overflow at all 15 target viewports" genuinely
  // untrue for this route today, not a bug in any one section -- keeping
  // it in this always-must-pass suite would either block every unrelated
  // future task on pre-existing, known, accepted gaps, or train reviewers
  // to ignore red runs. Verify this route with a scoped, ad-hoc Playwright
  // check (mobile/tablet/desktop) as each section ships instead, same
  // pattern already used throughout Phase 3's PLP work. Re-add here once
  // the page's desktop-only sections have real mobile coverage.
];

// Exact target viewports from CLAUDE.md section 3.
const viewports = [
  // Mobile
  { w: 360, h: 800 },
  { w: 375, h: 812 },
  { w: 390, h: 844 },
  { w: 393, h: 873 },
  { w: 412, h: 915 },
  { w: 430, h: 932 },
  // Tablet
  { w: 768, h: 1024 },
  { w: 810, h: 1080 },
  { w: 820, h: 1180 },
  { w: 834, h: 1194 },
  { w: 1024, h: 1366 },
  // Desktop
  { w: 1280, h: 720 },
  { w: 1366, h: 768 },
  { w: 1440, h: 900 },
  { w: 1920, h: 1080 },
];

for (const p of pages) {
  for (const v of viewports) {
    test(`${p.name} at ${v.w}x${v.h}`, async ({ page }) => {
      await page.setViewportSize({ width: v.w, height: v.h });
      await page.goto(`${BASE_URL}${p.path}`, { waitUntil: "networkidle" });

      // Fail if the page scrolls horizontally at this viewport.
      const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientW = await page.evaluate(() => document.documentElement.clientWidth);
      if (scrollW > clientW + 1) {
        throw new Error(`Horizontal overflow at ${v.w}x${v.h}: scrollWidth ${scrollW} > clientWidth ${clientW}`);
      }

      await page.screenshot({
        path: `screenshots/${p.name}-${v.w}x${v.h}.png`,
        fullPage: true,
      });
    });
  }
}
