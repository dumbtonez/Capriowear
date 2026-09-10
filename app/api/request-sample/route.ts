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
// not just links." Capped at 10MB server-side, matching the form's own
// stated limit; a larger file is rejected with a clear error rather than
// silently dropped or blocking the rest of the submission.
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

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const TO_ADDRESS = "hello@capriosports.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const interest = String(formData.get("interest") || "").trim();
  const project = String(formData.get("project") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const file = formData.get("file");

  if (!name || !email || !company || !interest || !project) {
    return Response.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return Response.json({ ok: false, error: "File exceeds the 10MB limit." }, { status: 400 });
    }
    attachments.push({ filename: file.name, content: Buffer.from(await file.arrayBuffer()) });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set; request-a-sample submission was not sent.", { name, email, company });
    return Response.json({ ok: false, error: "Email service is not configured." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const html = `
    <p><strong>Full name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Work email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Interested in:</strong> ${escapeHtml(interest)}</p>
    <p><strong>Project:</strong><br />${escapeHtml(project).replace(/\n/g, "<br />")}</p>
    ${phone ? `<p><strong>WhatsApp/phone:</strong> ${escapeHtml(phone)}</p>` : ""}
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
    console.error("Resend send failed", error);
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
