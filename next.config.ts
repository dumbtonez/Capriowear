import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback (owner spec, 2026-09-02, PLP card hover
    // swap: "modern formats (WebP/AVIF)") -- Next's own default is
    // `["image/webp"]` only; AVIF is a real, meaningfully smaller format
    // next/image already knows how to serve automatically (content
    // negotiation via the request's own Accept header, no per-image code),
    // it just isn't opted into unless listed here. Ahead of the first
    // real photo landing on the PLP grid (images[0]/images[1] hover swap,
    // components/ProductCardMedia.tsx) so every real `next/image` sitewide
    // benefits, not just the PLP card.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
