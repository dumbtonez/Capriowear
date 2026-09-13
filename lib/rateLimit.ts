// lib/rateLimit.ts
// Per-IP sliding-window rate limit for the two public form endpoints
// (app/api/request-sample/, app/api/download-catalog/) -- owner brief,
// 2026-09-13 security hardening pass: "basic rate limiting per IP... an
// in-memory sliding window if traffic is low."
//
// Deliberately in-memory, not Upstash/Vercel KV: this site has no real
// traffic yet, and a shared external store is a real added dependency
// (account, env vars, a network round-trip on every submission) that
// buys nothing until volume justifies it. The honest trade-off, stated
// plainly rather than glossed over: this Map lives in ONE serverless
// function instance's memory, so it resets on a cold start and isn't
// shared across concurrent instances under real concurrent load -- a
// determined attacker spreading requests across many cold instances
// could exceed the nominal limit. It still stops the actual realistic
// threat here (a single script hammering the same warm instance) and
// costs nothing to run. Swap this module's own two functions for an
// Upstash-backed version (same call shape) if abuse actually shows up
// post-launch -- no call-site changes needed elsewhere.
type Bucket = { count: number; windowStart: number };

const buckets = new Map<string, Bucket>();

// Unbounded growth guard: a plain Map keyed by IP would otherwise grow
// forever under sustained traffic from many distinct IPs, since nothing
// else ever deletes an old entry. Swept opportunistically (see `check`
// below), not on a timer -- no background work needed on a
// low-traffic site, and this only ever runs on the rare request that
// lands after a bucket's own window has expired anyway.
const MAX_TRACKED_IPS = 5000;

export function getClientIp(request: Request): string {
  // Vercel's own edge network sets this to the real client IP -- the only
  // header worth trusting here (a raw `x-forwarded-for` from an arbitrary
  // client is trivially spoofable, but Vercel's proxy overwrites it before
  // this function ever runs). Falls back to a constant bucket key locally
  // (no Vercel proxy in `next dev`) -- rate limiting still exercises the
  // same code path there, just as one shared "ip".
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/**
 * Returns true if `key` (an IP, namespaced by the caller e.g.
 * `request-sample:1.2.3.4`) is still within `max` requests per
 * `windowMs`. Mutates internal state as a side effect -- this is a
 * counter, not a pure check.
 */
export function checkRateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();

  if (buckets.size > MAX_TRACKED_IPS) {
    for (const [k, bucket] of buckets) {
      if (now - bucket.windowStart > windowMs) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStart > windowMs) {
    buckets.set(key, { count: 1, windowStart: now });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= max;
}
