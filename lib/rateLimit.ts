// lib/rateLimit.ts
// Per-IP fixed-window rate limit for the public form endpoint(s)
// (app/api/request-sample/; app/api/download-catalog/ is disabled).
//
// Durable across Vercel instances (audit 2026-09, C-04, owner brief
// 2026-09-26: "rate limiting that holds on Vercel"). The earlier version
// kept counters in a Map in one serverless instance's memory, which resets
// on every cold start and isn't shared between concurrent instances, so it
// never really held. Counters now live in Upstash Redis, reached over its
// REST API with plain `fetch` (no SDK, nothing added to the bundle).
//
// Env vars, whichever pair the Vercel Marketplace Upstash integration
// injects: UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, or the older
// KV_REST_API_URL + KV_REST_API_TOKEN names. Until one pair is set, this
// falls back to the in-memory counter below (same behaviour as before,
// logged once so the gap is visible in Vercel logs).
//
// Fails open: if Redis errors or times out, the request is allowed. A
// blocked real buyer costs more than a few extra spam submissions, and the
// honeypot and server-side validation still run either way.

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const REDIS_TIMEOUT_MS = 1500;

export function getClientIp(request: Request): string {
  // Vercel's edge network sets these to the real client IP before this
  // function runs (a client-sent x-forwarded-for is overwritten by the
  // proxy). Falls back to one shared key locally, where there is no proxy.
  return (
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

// ── In-memory fallback (only when Redis isn't configured) ────────────────
type Bucket = { count: number; windowStart: number };
const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 5000;
let warnedNoRedis = false;

function checkInMemory(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > MAX_TRACKED_KEYS) {
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

// ── Redis (durable) ──────────────────────────────────────────────────────
async function checkRedis(key: string, max: number, windowMs: number): Promise<boolean> {
  // One round trip: create the window's counter with its expiry only if it
  // doesn't exist yet (SET ... NX), so the window runs from the first
  // request, then INCR it (INCR keeps the existing expiry).
  const redisKey = `ratelimit:${key}`;
  const response = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["SET", redisKey, "0", "PX", String(windowMs), "NX"],
      ["INCR", redisKey],
    ]),
    signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Upstash responded ${response.status}`);
  const [, incr] = (await response.json()) as [unknown, { result?: number; error?: string }];
  if (typeof incr?.result !== "number") throw new Error(incr?.error || "Unexpected Upstash response");
  return incr.result <= max;
}

/**
 * Returns true if `key` (namespaced by the caller, e.g.
 * `request-sample:1.2.3.4`) is still within `max` requests per `windowMs`.
 * Counts this request as a side effect.
 */
export async function checkRateLimit(key: string, max: number, windowMs: number): Promise<boolean> {
  if (!REDIS_URL || !REDIS_TOKEN) {
    if (!warnedNoRedis) {
      warnedNoRedis = true;
      console.warn("[rate-limit] Upstash Redis is not configured; using the per-instance in-memory fallback.");
    }
    return checkInMemory(key, max, windowMs);
  }
  try {
    return await checkRedis(key, max, windowMs);
  } catch (error) {
    console.error("[rate-limit] Upstash check failed; allowing the request.", error instanceof Error ? error.message : error);
    return true;
  }
}
