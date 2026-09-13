// app/api/download-catalog/route.ts
// Backend for the /download-catalog form (components/sections/
// DownloadCatalogForm.tsx). Two things happen on a valid submission, both
// required (doc, 2026-09-10): (1) an automated email to the submitter
// with the catalog PDF attached, and (2) the lead saved to the shared
// Google Sheet (lib/leadsSheet.ts). This route's own visible promise to
// the customer is "you'll get an email," so only the email send gates the
// response -- a Sheet outage is logged loudly but never turns a
// successful send into a visible error (see lib/leadsSheet.ts's own
// header comment).
//
// Reuses Resend, the same email-sending service app/api/request-sample/
// route.ts already uses, rather than standing up a second one -- doc:
// "both pages need working transactional email, no reason to solve it
// twice." RESEND_API_KEY is not yet set in this environment (same
// standing gap as Request a Sample), so sends fail until it is.
//
// The catalog PDF is a placeholder for now (Mohsin confirmed, 2026-09-10)
// -- generated once via scripts/generate-placeholder-pdf.mjs, read fresh
// off disk on every request rather than cached in memory, so swapping the
// real file into public/catalog/ later needs no code change.
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { Resend } from "resend";

import { downloadCatalog } from "@/content/download-catalog";
import { SITE_URL } from "@/content/site";
import { isHoneypotFilled } from "@/lib/honeypot";
import { buildLeadEnrichment } from "@/lib/leadEnrichment";
import { appendLead } from "@/lib/leadsSheet";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CATALOG_PDF_PATH = join(process.cwd(), "public", "catalog", "capriowear-catalog-placeholder.pdf");
const MAX_TEXT_LENGTH = 5000;
// This route emails whatever address it's given (`to: email` below), so a
// rate limit here isn't just anti-spam noise reduction -- without it,
// this endpoint is a free "send an email from our domain to any address
// repeatedly" primitive (reputation damage, or straightforward harassment
// of a third party's inbox), not merely a nuisance to us.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

function clean(value: string) {
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

export async function POST(request: Request) {
  const formData = await request.formData();

  if (isHoneypotFilled(formData)) {
    return Response.json({ ok: true });
  }

  const ip = getClientIp(request);
  if (!checkRateLimit(`download-catalog:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return Response.json({ ok: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  // "No capitalization correction or trimming beyond basic whitespace"
  // (doc) -- `.trim()` only, the name is used exactly as typed in the
  // email greeting below. `clean()` still caps length/strips CR-LF, same
  // as request-sample's own route.
  const firstName = clean(String(formData.get("firstName") || "").trim());
  const email = clean(String(formData.get("email") || "").trim());
  const company = clean(String(formData.get("company") || "").trim());

  if (!firstName || !email) {
    return Response.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; download-catalog submission was not sent.", { firstName, email });
    return Response.json({ ok: false, error: "Email service is not configured." }, { status: 500 });
  }

  let catalogPdf: Buffer;
  try {
    catalogPdf = await readFile(CATALOG_PDF_PATH);
  } catch (error) {
    console.error("Catalog PDF not found on disk", error);
    return Response.json({ ok: false, error: "Catalog file is missing." }, { status: 500 });
  }

  const ctaUrl = `${SITE_URL}${downloadCatalog.email.ctaHref}`;
  const html = `
    <p>${escapeHtml(downloadCatalog.email.greeting.replace("{{firstName}}", firstName))}</p>
    ${downloadCatalog.email.bodyParagraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n")}
    <p><a href="${ctaUrl}">${escapeHtml(downloadCatalog.email.ctaLabel)}</a></p>
    <p>${escapeHtml(downloadCatalog.email.signOff)}</p>
  `;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Capriowear <onboarding@resend.dev>",
    to: email,
    subject: downloadCatalog.email.subject,
    html,
    attachments: [{ filename: "capriowear-catalog.pdf", content: catalogPdf }],
  });

  if (error) {
    console.error("Resend send failed", error);
    return Response.json({ ok: false, error: "Failed to send." }, { status: 502 });
  }

  // Best-effort, never blocks the response -- see this file's own header
  // comment and lib/leadsSheet.ts.
  void appendLead({
    firstName,
    email,
    company,
    sourcePage: "Download Catalog",
    ...buildLeadEnrichment(request, formData),
  });

  return Response.json({ ok: true });
}
