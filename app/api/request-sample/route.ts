// app/api/request-sample/route.ts
// Backend for the /request-a-sample form (components/sections/
// RequestSampleForm.tsx). Parses the incoming multipart FormData, validates
// required fields server-side (client-side validation is never trusted
// alone), then sends the lead to hello@capriosports.com via Resend --
// that inbox does not exist yet as of this build (Mohsin is configuring
// it), and RESEND_API_KEY is not yet set in this environment, so sends
// will fail until both are in place. See docs/05-plan.md's open items.
//
// The optional file upload travels as a real email attachment (Resend's
// `attachments` field takes the raw bytes directly, not a second upload
// step) -- doc: "attached files should travel as real email attachments,
// not just links."
//
// Uploads (audit 2026-09, C-06/C-07; owner decision 2026-09-26: "change
// the promised limit to 4 MB now and fail gracefully, keep the lead, ask
// for a link"): Vercel rejects any function request body over 4.5 MB
// before this code runs, so the real ceiling is 4 MB. A file that is too
// large, or isn't really a PDF/JPG/PNG (checked by its first bytes, not
// just its name), never fails the submission: the lead is still sent,
// without the file, and the email tells the team to ask the buyer for a
// link. The form does the same on its side (it drops a >4 MB file before
// sending, or retries without it after a 413) and passes the dropped
// file's name and size as `fileNotAttached`.
//
// Also appends this lead to the shared Google Sheet leads store
// (lib/leadsSheet.ts, 2026-09-10, added for /download-catalog and
// retrofitted here so both forms write one consistent row shape). The
// Sheet append is best-effort and never blocks or fails this response --
// this page's own visible promise is "we'll email you," so a Sheet outage
// shouldn't turn a successful request into a visible error; see
// lib/leadsSheet.ts's own header comment for the full reasoning.
import { Resend } from "resend";

import { buildLeadEnrichment } from "@/lib/leadEnrichment";
import { appendLead } from "@/lib/leadsSheet";
import { isHoneypotFilled } from "@/lib/honeypot";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const MAX_FILE_BYTES = 4 * 1024 * 1024; // Vercel's own request cap is 4.5 MB, multipart overhead included
const MAX_TEXT_LENGTH = 5000; // bounds email size/log spam -- no legitimate field here needs more
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const TO_ADDRESS = "hello@capriosports.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: string) {
  // Strips CR/LF defensively before this ever reaches an email header field
  // (`replyTo` below) -- `EMAIL_PATTERN` already rejects whitespace in a
  // valid email, so this isn't reachable via `email` today, but every
  // other field funnels into the HTML body via `escapeHtml` regardless;
  // this is belt-and-braces against a future header use, not a fix for a
  // live gap.
  return value.replace(/[\r\n]/g, " ").slice(0, MAX_TEXT_LENGTH);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Allowed attachment types, checked by extension AND by the file's first
// bytes, so a renamed executable can't ride along to the team's inbox.
const FILE_SIGNATURES: { extensions: string[]; magic: number[] }[] = [
  { extensions: ["pdf"], magic: [0x25, 0x50, 0x44, 0x46] }, // %PDF
  { extensions: ["jpg", "jpeg"], magic: [0xff, 0xd8, 0xff] },
  { extensions: ["png"], magic: [0x89, 0x50, 0x4e, 0x47] },
];

function isAllowedFile(filename: string, bytes: Uint8Array): boolean {
  const extension = filename.split(".").pop()?.toLowerCase() ?? "";
  const signature = FILE_SIGNATURES.find((entry) => entry.extensions.includes(extension));
  return Boolean(signature && signature.magic.every((byte, index) => bytes[index] === byte));
}

function safeFilename(filename: string): string {
  const cleaned = filename.replace(/[^A-Za-z0-9._ -]/g, "_").replace(/^\.+/, "").slice(-100);
  return cleaned || "attachment";
}

function formatBytes(bytes: number): string {
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Cross-site browser POSTs are refused (audit 2026-09, C-22). Browsers
// always send Sec-Fetch-Site (and Origin) on a fetch; a non-browser
// client can send anything, so this only closes the drive-by, form-from-
// another-site case, which is its whole purpose.
function isCrossSite(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite) return fetchSite === "cross-site";
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export async function POST(request: Request) {
  if (isCrossSite(request)) {
    return Response.json({ ok: false, error: "Invalid form submission." }, { status: 403 });
  }

  // `request.formData()` throws (not returns) on a malformed/empty
  // multipart body -- confirmed live, real bug: a bare POST with no body,
  // or one missing its multipart boundary, threw here uncaught, which
  // Next.js turns into a raw framework 500 HTML page instead of this
  // route's own JSON error contract. This is exactly the "empty/invalid
  // input" case the rest of this route already handles gracefully below
  // (missing fields, bad email, oversized file) -- parsing the body at all
  // is really the same class of "invalid input," just one step earlier, so
  // it gets the same clean 400 treatment, not a different failure mode.
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "Invalid form submission." }, { status: 400 });
  }

  // Bot check first, before any real work -- same success response either
  // way (see lib/honeypot.ts's own comment on why this never surfaces as
  // an error).
  if (isHoneypotFilled(formData)) {
    return Response.json({ ok: true });
  }

  const ip = getClientIp(request);
  if (!(await checkRateLimit(`request-sample:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS))) {
    return Response.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const name = clean(String(formData.get("name") || "").trim());
  const email = clean(String(formData.get("email") || "").trim());
  const company = clean(String(formData.get("company") || "").trim());
  const interest = clean(String(formData.get("interest") || "").trim());
  const project = clean(String(formData.get("project") || "").trim());
  const phone = clean(String(formData.get("phone") || "").trim());
  const file = formData.get("file");
  // Set by the form when it dropped an oversized file before sending (see
  // this file's header comment).
  const fileNotAttached = clean(String(formData.get("fileNotAttached") || "").trim()).slice(0, 200);

  if (!name || !email || !company || !interest || !project) {
    return Response.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  // Never fail the lead over the attachment: keep the file only when it is
  // within the limit and really a PDF/JPG/PNG, otherwise send the lead
  // without it and say why in the email.
  const attachments: { filename: string; content: Buffer }[] = [];
  let attachmentNote = fileNotAttached
    ? `The buyer's file (${fileNotAttached}) was over 4 MB, so it was not attached. Ask them for a link.`
    : "";
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      attachmentNote = `The buyer's file (${safeFilename(file.name)}, ${formatBytes(file.size)}) was over 4 MB, so it was not attached. Ask them for a link.`;
    } else {
      const content = Buffer.from(await file.arrayBuffer());
      if (isAllowedFile(file.name, content)) {
        attachments.push({ filename: safeFilename(file.name), content });
      } else {
        attachmentNote = `The buyer's file (${safeFilename(file.name)}) was not a PDF, JPG or PNG, so it was not attached. Ask them for a link.`;
      }
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No lead details in logs (audit 2026-09, C-10): Vercel logs are
    // readable by the whole team and kept outside the privacy policy.
    console.error("[request-sample] RESEND_API_KEY is not set; submission was not sent.");
    return Response.json({ ok: false, error: "Failed to send." }, { status: 500 });
  }

  // Everything past this point is genuine send-time work (reading the
  // upload's bytes, calling out to Resend), not input validation -- any
  // failure here is a real "we couldn't get this to you" case, not a bad
  // submission, so it earns the frontend's own generic server-error
  // message. Wrapped so an unexpected throw (Resend's client can throw on
  // a network failure, not just return `{ error }` -- confirmed in its own
  // docs) still comes back as this route's own clean JSON 500, not a raw
  // framework error page.
  try {
    const resend = new Resend(apiKey);
    const html = `
      <p><strong>Full name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Work email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Interested in:</strong> ${escapeHtml(interest)}</p>
      <p><strong>Project:</strong><br />${escapeHtml(project).replace(/\n/g, "<br />")}</p>
      ${phone ? `<p><strong>WhatsApp/phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${attachmentNote ? `<p><strong>Attachment:</strong> ${escapeHtml(attachmentNote)}</p>` : ""}
    `;

    const { error } = await resend.emails.send({
      from: "Capriowear Website <onboarding@resend.dev>",
      to: TO_ADDRESS,
      replyTo: email,
      subject: `New sample request: ${company}`,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (error) {
      console.error("[request-sample] Resend send failed:", error.name, error.message);
      return Response.json({ ok: false, error: "Failed to send." }, { status: 502 });
    }
  } catch (sendError) {
    console.error("[request-sample] Unexpected send error:", sendError instanceof Error ? sendError.message : "unknown");
    return Response.json({ ok: false, error: "Failed to send." }, { status: 502 });
  }

  // Best-effort, never blocks the response -- see this file's own header
  // comment and lib/leadsSheet.ts. "First name" holds the full name here
  // (this form asks for one combined field, not first/last separately),
  // which is still the most useful single value for that shared column.
  void appendLead({
    firstName: name,
    email,
    company,
    sourcePage: "Request a Sample",
    ...buildLeadEnrichment(request, formData),
  });

  return Response.json({ ok: true });
}
