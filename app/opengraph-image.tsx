// app/opengraph-image.tsx
// Branded default Open Graph share image (1200x630), generated at request
// time via next/og -- no real photography exists yet, so this is built from
// the same design tokens as the rest of the site (app/globals.css's @theme
// block) rather than shipping a missing/placeholder asset. Also used as the
// default Twitter card image (content/site.ts's DEFAULT_OG_IMAGE).
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          CAPRIO<span style={{ color: "#ff791b" }}>WEAR</span>
        </div>
        <div style={{ display: "flex", fontSize: 32, fontWeight: 400, marginTop: 24, color: "#abb5c0" }}>
          Custom Activewear &amp; Teamwear Manufacturer
        </div>
      </div>
    ),
    { ...size },
  );
}
