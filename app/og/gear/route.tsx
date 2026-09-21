// app/og/gear/route.tsx
// Default Open Graph / Twitter share image (1200x630) for every Gear
// division page (Lifting Gears, Boxing & MMA -- hubs, PLPs, PDPs) that has
// no real product photography yet, generated via next/og from the same
// design tokens as app/opengraph-image.tsx (which is Capriowear-branded and
// only reaches the routes whose own metadata doesn't set `openGraph`, so it
// never reached a Gear page). Wired in explicitly per Gear route through
// content/site.ts's GEAR_DEFAULT_OG_IMAGE, and only used when a page has no
// image of its own. "Capriosports" here is link-preview metadata, so the
// schema/metadata naming register applies.
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121317",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
          CAPRIO<span style={{ color: "#ff791b" }}>SPORTS</span>
        </div>
        <div style={{ display: "flex", fontSize: 32, fontWeight: 400, marginTop: 24, color: "#abb5c0" }}>
          Custom Lifting Gear &amp; Boxing/MMA Manufacturer
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
