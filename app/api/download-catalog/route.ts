// app/api/download-catalog/route.ts
// DISABLED (owner decision, 2026-09-26; audit 2026-09, C-03/C-09). The
// catalog isn't connected yet, and the previous handler emailed the PDF to
// any address it was given, with submitter-written text in the body: an
// open email relay on the company's own sending identity. Every request now
// gets 410 Gone, with the same JSON shape the form already reads.
//
// The full previous implementation (Resend send with the PDF attached,
// lead appended to the shared Sheet) is in git history at commit dfaf812.
// Re-enable only together with the C-03 protections: Cloudflare Turnstile
// verified server-side, a durable per-IP and per-recipient rate limit
// (lib/rateLimit.ts), a short first-name cap that rejects URLs, and ideally
// emailing a link rather than attaching the file.

const GONE = { ok: false, error: "The catalog download is not available yet." };

export function POST() {
  return Response.json(GONE, { status: 410 });
}
