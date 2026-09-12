// lib/hubThumbnails.ts
// Resolves a hub category/sport card's own thumbnail image by a fixed file
// path convention, checked at build time (this only ever runs in server
// components) rather than trusted blindly -- a card with no real file
// dropped in yet renders its placeholder box exactly the same way every
// other "no photography yet" element on this site already does, and
// automatically picks up the real photo the moment the file lands, with no
// further code change. Shared by both hub pages (`app/activewear/page.tsx`
// via `CategoryLinkGrid.tsx`, `app/teamwear/page.tsx` via `SportGrid.tsx`)
// so the two conventions can never drift apart.
//
// Convention: public/images/hub-thumbnails/<division>/<slug>.jpg, matching
// the exact slug already used in that card's own route
// (/activewear/<slug>, /teamwear/<slug>). Pre-cropped, purpose-shot square
// images for this exact use -- deliberately not the same photography
// `styleCards`/PDP galleries use.
//
// TEMPORARY per-breakpoint test path (owner, 2026-09-12, "sports bras"
// only, activewear): also checks for a `<slug>-mobile.*`/`<slug>-desktop.*`
// pair before falling back to the single-file convention above, so two
// exactly-sized test crops (48px/64px) can be compared directly at their
// real render size instead of one file scaled by CSS. Remove this pair
// once real photography replaces the single-file convention everywhere --
// `CategoryCard`'s own `mobileSrc` branch should come out with it.
import fs from "node:fs";
import path from "node:path";

export type HubThumbnail = { src: string; alt: string; mobileSrc?: string };

const EXTENSIONS = ["jpg", "png"];

function findFile(division: string, filename: string): string | undefined {
  for (const ext of EXTENSIONS) {
    const publicPath = `/images/hub-thumbnails/${division}/${filename}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", publicPath))) return publicPath;
  }
  return undefined;
}

export function hubThumbnail(division: "activewear" | "teamwear", slug: string, alt: string): HubThumbnail | undefined {
  const desktopTest = findFile(division, `${slug}-desktop`);
  const mobileTest = findFile(division, `${slug}-mobile`);
  if (desktopTest && mobileTest) return { src: desktopTest, mobileSrc: mobileTest, alt };

  const publicPath = findFile(division, slug);
  return publicPath ? { src: publicPath, alt } : undefined;
}
