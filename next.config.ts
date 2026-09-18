import type { NextConfig } from "next";

// Sitewide security headers (owner brief, 2026-09-13: pre-launch hardening
// pass -- "form abuse, missing security headers, dependency hygiene" for a
// B2B lead-gen site with no logins/payments, not DDoS mitigation, which
// Vercel's edge network already handles). Applied via `headers()` to every
// route rather than per-page, so a new page never ships unprotected by
// accident.
//
// CSP starts deliberately permissive, not maximally locked down -- this app
// loads no third-party script today (checked app/layout.tsx: no GA/GTM/
// Figma embed tags), so `script-src`/`style-src` only need to cover Next's
// own inline hydration script and Tailwind's inline styles. `'unsafe-inline'`
// is a known trade-off (a nonce-based CSP would be tighter) -- fine for a
// first pass with no user-generated content or third-party scripts to
// isolate from; revisit with nonces if/when an analytics or embed script is
// added. `font-src`/`img-src` cover next/font's self-hosted Figtree files
// and next/image's own optimized output plus any real `https:` photography.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

// /studio (Sanity Studio, embedded 2026-09-13) needs a looser CSP than the
// rest of the site: 'unsafe-eval' and a blob: worker-src for its bundled
// editor. Scoped to this one route only via its own `headers()` entry below
// (matched with a negative-lookahead source so the two entries never both
// match the same path -- two separate Content-Security-Policy header
// values on one response do not override each other, browsers intersect
// them, which would silently break the Studio instead of loosening it).
// Every other directive mirrors the sitewide CSP unchanged.
//
// core.sanity-cdn.com (the Studio's own cross-origin "bridge" script) and
// design-system-static.sanity.io (its self-hosted Inter font files) were
// added 2026-09-13 after wiring up a real project -- both were blocked
// outright until then, confirmed via the browser console against the real
// Studio login screen, not guessed ahead of time.
const STUDIO_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://design-system-static.sanity.io",
  "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io https://core.sanity-cdn.com",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

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
  async headers() {
    const commonHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      // DENY, not SAMEORIGIN -- nothing on this site is meant to be
      // framed by anyone, including itself; revisit only if a real
      // embed use case shows up.
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Camera/mic/geolocation are all genuinely unused sitewide --
      // disabled outright rather than left at the browser default.
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      // 2 years + subdomains + preload -- the long-lived, "submit to
      // the browser preload list" HSTS config, appropriate once a site
      // is committed to HTTPS-only (Vercel serves this site over HTTPS
      // by default; this header is what tells browsers to never even
      // try plain HTTP again, for every subdomain too).
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    ];

    return [
      {
        // Every real route except /studio -- see STUDIO_CSP above for why
        // this must not also match /studio.
        source: "/:path((?!studio).*)*",
        headers: [{ key: "Content-Security-Policy", value: CSP }, ...commonHeaders],
      },
      {
        source: "/studio/:path*",
        headers: [{ key: "Content-Security-Policy", value: STUDIO_CSP }, ...commonHeaders],
      },
    ];
  },
  // Capriowear's routes moved from the repo root to /capriowear (2026-09-14
  // Capriosports parent-site routing task) -- this site is live with real
  // indexed search traffic, so every old URL 301s (the doc term; Next's
  // `permanent: true` actually issues a 308, which preserves the original
  // HTTP method across the redirect and is the framework's own stated
  // reason it doesn't offer a literal 301/302 here -- functionally
  // equivalent for SEO). `:path*` matches zero or more segments in one
  // rule, so both the bare old path and every sub-path redirect together
  // (confirmed against Next's own redirects() docs, which give this exact
  // shape as the way to cover a whole moved section in one entry).
  //
  // No rule for "/" itself -- that URL now serves the new Capriosports
  // parent-site homepage (app/page.tsx), not a redirect to Capriowear.
  // Gear (/lifting-gears, /boxing-and-mma) and every other root-level
  // route (/styleguide, /studio, /api/*) are unaffected by this move and
  // have no redirect here.
  async redirects() {
    return [
      // "Joggers & Track Pants" renamed to "Joggers" and track pants removed
      // as a product line (owner spec, 2026-09-18) -- these two rules must
      // come before the generic /activewear/:path* rule below, since Next
      // matches redirects in array order and the wildcard would otherwise
      // catch these first and forward to the old, now-gone slug. `:path*`
      // covers both the bare old category URL and any old PDP sub-path
      // (including the track-pant style, which never had a live page) in
      // one rule, all landing on the category page.
      { source: "/activewear/joggers-track-pants/:path*", destination: "/capriowear/activewear/joggers", permanent: true },
      { source: "/capriowear/activewear/joggers-track-pants/:path*", destination: "/capriowear/activewear/joggers", permanent: true },
      { source: "/activewear/:path*", destination: "/capriowear/activewear/:path*", permanent: true },
      { source: "/teamwear/:path*", destination: "/capriowear/teamwear/:path*", permanent: true },
      { source: "/services", destination: "/capriowear/services", permanent: true },
      { source: "/our-factory", destination: "/capriowear/our-factory", permanent: true },
      { source: "/download-catalog", destination: "/capriowear/download-catalog", permanent: true },
      { source: "/request-a-sample", destination: "/capriowear/request-a-sample", permanent: true },
      { source: "/privacy-policy", destination: "/capriowear/privacy-policy", permanent: true },
      { source: "/terms-of-service", destination: "/capriowear/terms-of-service", permanent: true },
    ];
  },
};

export default nextConfig;
