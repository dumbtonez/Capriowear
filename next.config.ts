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
//
// Tightened 2026-09-26 (audit 2026-09, C-17): `img-src` names its hosts
// instead of allowing any `https:` origin (placehold.co is the only
// external image live today, on the parent homepage; cdn.sanity.io is for
// the incoming product photography), and `object-src`/`frame-src`/
// `worker-src`/`manifest-src`/`media-src` are explicit. Still static with
// `'unsafe-inline'` scripts, deliberately: a nonce would force every one of
// the ~300 prerendered pages to render per request (Next's own CSP guide).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://placehold.co",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'self' https://cdn.sanity.io",
  "object-src 'none'",
  "frame-src 'none'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
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
//
// 2026-09-26 (audit 2026-09, C-17): additions only cover what the Studio
// needs after login (realtime `wss:`, the bare api.sanity.io host that
// `*.api.sanity.io` does not match, blob: image previews, avatar hosts),
// plus `object-src 'none'`. `img-src` stays `https:` here: editors paste
// and preview images from arbitrary sources inside the Studio.
const STUDIO_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://design-system-static.sanity.io",
  "connect-src 'self' https://api.sanity.io https://*.api.sanity.io wss://*.api.sanity.io https://*.apicdn.sanity.io https://core.sanity-cdn.com",
  "worker-src 'self' blob:",
  "frame-src 'self' https://*.sanity.io",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.sanity.io",
].join("; ");

// Read directly from the env (not content/site.ts's ALLOW_INDEXING) so this
// config file stays free of app imports; same variable, same default: off
// unless explicitly "true".
const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
const NOINDEX = { key: "X-Robots-Tag", value: "noindex, nofollow" };

const nextConfig: NextConfig = {
  // No `X-Powered-By: Next.js` fingerprint on any response (audit 2026-09,
  // C-18: it was still present on /studio).
  poweredByHeader: false,
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
  // No error-tracking service consumes source maps in this project, and the
  // production server maps alone were ~173 MB of a ~252 MB .next/server
  // (deployment size). Turbopack (the default builder here) emits them via
  // `turbopackSourceMaps` (defaults to true); `serverSourceMaps` is the
  // webpack-side equivalent. Browser production maps are already off by
  // default (`productionBrowserSourceMaps`), left unset.
  experimental: {
    turbopackSourceMaps: false,
    serverSourceMaps: false,
  },
  async headers() {
    const commonHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      // DENY, not SAMEORIGIN -- nothing on this site is meant to be
      // framed by anyone, including itself; revisit only if a real
      // embed use case shows up.
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      // Camera/mic/geolocation/payment/USB/Topics are all genuinely unused
      // sitewide -- disabled outright rather than left at the browser
      // default.
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
      // 2 years + subdomains + preload -- the long-lived, "submit to
      // the browser preload list" HSTS config, appropriate once a site
      // is committed to HTTPS-only (Vercel serves this site over HTTPS
      // by default; this header is what tells browsers to never even
      // try plain HTTP again, for every subdomain too).
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      // Other sites can't embed this site's own files (audit 2026-09,
      // C-19); the OG image entry below re-opens that for share images.
      { key: "Cross-Origin-Resource-Policy", value: "same-site" },
    ];

    // Header entries are applied in order, and a later entry that sets the
    // same key wins -- so the specific entries below (Studio, OG images,
    // noindex) override the common ones for their own paths.
    return [
      // Common headers on every path, /studio included. Split from the CSP
      // entries so a path neither CSP pattern matches (e.g. /studiox, which
      // the old single pattern left with no headers at all) still gets
      // them (audit 2026-09, C-16).
      { source: "/:path*", headers: commonHeaders },
      {
        // Every route except /studio and /studio/* -- but /studiox or
        // /studio-notes still match. See STUDIO_CSP above for why this
        // must never also match /studio: two CSP headers on one response
        // intersect rather than override.
        source: "/:path((?!studio(?:/|$)).*)*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
      {
        // Studio: its own CSP, never indexed (even after launch), and a
        // COOP that still lets a sign-in popup talk back to the Studio.
        source: "/studio/:path*",
        headers: [
          { key: "Content-Security-Policy", value: STUDIO_CSP },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          NOINDEX,
        ],
      },
      // Share images must stay fetchable when a social platform or chat app
      // embeds them from its own origin.
      { source: "/opengraph-image", headers: [{ key: "Cross-Origin-Resource-Policy", value: "cross-origin" }] },
      { source: "/:path*/opengraph-image", headers: [{ key: "Cross-Origin-Resource-Policy", value: "cross-origin" }] },
      { source: "/og/:path*", headers: [{ key: "Cross-Origin-Resource-Policy", value: "cross-origin" }] },
      // Never indexed, before or after launch: internal QA page and the form
      // endpoints.
      { source: "/styleguide", headers: [NOINDEX] },
      { source: "/api/:path*", headers: [NOINDEX] },
      // Any *.vercel.app host (the capriowear.vercel.app production alias,
      // previews) stays out of search even after launch, so it can never
      // compete with www as a duplicate (audit 2026-09, B-07).
      { source: "/:path*", has: [{ type: "host", value: ".*\\.vercel\\.app" }], headers: [NOINDEX] },
      // Pre-launch lock, header form: the meta robots tag only reaches HTML,
      // and robots.txt's Disallow stops crawlers from ever seeing it. This
      // covers every response (images, PDFs, OG PNGs) until
      // NEXT_PUBLIC_ALLOW_INDEXING=true, then drops out on its own.
      ...(ALLOW_INDEXING ? [] : [{ source: "/:path*", headers: [NOINDEX] }]),
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
      // Legacy Wide-Leg Woven Jogger draft PDP, removed with the Joggers
      // rebuild (owner spec, 2026-09-26): its old style code CAP-JOG-01 now
      // belongs to Men's Cuffed Fleece Jogger, so the URL lands on the PLP.
      // Listed before the generic /activewear rule so the old pre-/capriowear
      // path redirects in one hop.
      { source: "/capriowear/activewear/joggers/wide-leg-woven-jogger", destination: "/capriowear/activewear/joggers", permanent: true },
      { source: "/activewear/joggers/wide-leg-woven-jogger", destination: "/capriowear/activewear/joggers", permanent: true },
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
