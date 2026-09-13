// lib/honeypot.ts
// Shared honeypot field name/check for both public forms (Request a Sample,
// Download Catalog) -- owner brief, 2026-09-13 security hardening pass. One
// hidden field real users never fill in; a route that finds it filled
// treats the submission as a bot and returns the same success response
// without doing any actual work (never a visible error -- telling a bot
// "rejected" just teaches it to try again differently).
//
// Named like a real field ("company_website"), not literally "honeypot" --
// a scraper's own field-name heuristics are more likely to skip filling
// something that reads as an actual optional field than something that
// announces what it is.
export const HONEYPOT_FIELD_NAME = "company_website";

export function isHoneypotFilled(formData: FormData): boolean {
  return String(formData.get(HONEYPOT_FIELD_NAME) || "").trim().length > 0;
}
