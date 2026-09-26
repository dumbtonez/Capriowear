// lib/leadsSheet.ts
// The shared leads store: one Google Sheet, appended to via the Sheets
// API, reused by both /request-a-sample and /download-catalog (owner,
// 2026-09-10: "Reuse the exact same Sheet for Request a Sample
// submissions too, one place to check leads, not two" -- Mohsin isn't
// maintaining this codebase day to day, so a Sheet he can already open
// and read beats a database with its own admin panel).
//
// One column schema for both forms, since both write to one Sheet now --
// see LEAD_COLUMNS below. Each route builds its own `LeadRow` from
// whatever fields it actually has (Request a Sample has no "source page"
// distinction to make, Download Catalog has no "interest"/"project"
// fields) and this file only cares about the shared columns.
//
// Needs three env vars this environment doesn't have yet (Mohsin hasn't
// shared Sheets credentials -- open item, same shape as the standing
// RESEND_API_KEY gap): GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY,
// GOOGLE_SHEETS_LEADS_ID. `appendLead` no-ops with a loud console.error
// when they're missing, and deliberately never throws -- a failed Sheet
// append should never be the reason a customer who already got their
// email/sample confirmation sees an error page (see the API routes' own
// comments for why the two are decoupled).
import { google } from "googleapis";

import type { LeadEnrichment } from "@/lib/leadEnrichment";

export type LeadRow = {
  firstName: string;
  email: string;
  company: string;
  sourcePage: "Request a Sample" | "Download Catalog";
} & LeadEnrichment;

// Fixed column order -- must match the header row in the real Sheet
// exactly. Kept as an exported constant so the Sheet can be set up (or
// checked) against a single source of truth rather than reverse-
// engineering it from the values array below.
export const LEAD_COLUMNS = [
  "First name",
  "Email",
  "Company",
  "Source page",
  "Country",
  "Region",
  "City",
  "Device type",
  "OS",
  "Browser",
  "Referrer",
  "UTM source",
  "UTM medium",
  "UTM campaign",
  "Timestamp",
] as const;

// Every cell is capped (audit 2026-09, C-08): a single oversized cell
// (an uncapped referrer or UTM string) makes the whole append fail, which
// would silently lose the lead.
const MAX_CELL_LENGTH = 500;

function rowToValues(row: LeadRow): string[] {
  return [
    row.firstName,
    row.email,
    row.company,
    row.sourcePage,
    row.country,
    row.region,
    row.city,
    row.deviceType,
    row.os,
    row.browser,
    row.referrer,
    row.utmSource,
    row.utmMedium,
    row.utmCampaign,
    row.timestamp,
  ].map((value) => String(value ?? "").slice(0, MAX_CELL_LENGTH));
}

export async function appendLead(row: LeadRow): Promise<void> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_LEADS_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    // No lead details in logs (audit 2026-09, C-10).
    console.error(`[leads-sheet] Google Sheets credentials are not set; a ${row.sourcePage} lead was not saved to the Sheet.`);
    return;
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      // Env vars can't hold real newlines -- the key is stored with
      // literal "\n" sequences and unescaped here.
      key: privateKey.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "A:A",
      // RAW, not USER_ENTERED (audit 2026-09, C-08): a submitted value such
      // as `=IMPORTXML(...)` or `=HYPERLINK(...)` must land as plain text,
      // never run as a formula in the team's own Sheet.
      valueInputOption: "RAW",
      requestBody: { values: [rowToValues(row)] },
    });
  } catch (error) {
    // Never throw -- see this file's own header comment for why a Sheet
    // failure must not fail the customer-facing request.
    console.error("[leads-sheet] Failed to append lead:", error instanceof Error ? error.message : "unknown");
  }
}
