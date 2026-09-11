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
import fs from "node:fs";
import path from "node:path";

export type HubThumbnail = { src: string; alt: string };

export function hubThumbnail(division: "activewear" | "teamwear", slug: string, alt: string): HubThumbnail | undefined {
  const publicPath = `/images/hub-thumbnails/${division}/${slug}.jpg`;
  const absolutePath = path.join(process.cwd(), "public", publicPath);
  return fs.existsSync(absolutePath) ? { src: publicPath, alt } : undefined;
}
