// lib/leadEnrichment.ts
// Passive lead enrichment (owner spec, 2026-09-10, added for
// /download-catalog then retrofitted onto /request-a-sample so both
// forms write one consistent row shape to the shared leads Sheet -- see
// lib/leadsSheet.ts). None of this is asked in either form; all of it
// comes from the request itself, on the server, at submission time.
//
// Country/region/city: Vercel's edge network attaches geo headers to
// every incoming request automatically (`x-vercel-ip-country` etc.) --
// reading those instead of calling a third-party geolocation service,
// since it's free and already there. IP-based city-level geolocation is
// approximate and sometimes wrong (VPNs, corporate networks) -- a
// helpful signal for Mohsin, never presented to the customer as a
// verified fact.
//
// Device/OS/browser: a small manual User-Agent parse, not a dependency --
// good enough for "iPhone / iOS / Safari"-level detail, which is all this
// is for (a lead signal, not analytics-grade device detection).
//
// Referrer/UTM: captured client-side at submit time
// (lib/clientLeadContext.ts) and passed through as ordinary form fields,
// since by the time this route runs, the only referrer the server can see
// on its own is the immediate POST request's own page -- not the
// external site the visitor actually arrived from, possibly days
// earlier.
export type LeadEnrichment = {
  country: string;
  region: string;
  city: string;
  deviceType: string;
  os: string;
  browser: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  timestamp: string;
};

function parseUserAgent(ua: string): { deviceType: string; os: string; browser: string } {
  const deviceType = /Mobi|Android/i.test(ua) ? (/iPad|Tablet/i.test(ua) ? "Tablet" : "Mobile") : "Desktop";

  let os = "Unknown";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "Unknown";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = "Chrome";
  else if (/Safari\//i.test(ua) && !/Chrome/i.test(ua)) browser = "Safari";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";

  return { deviceType, os, browser };
}

export function buildLeadEnrichment(request: Request, formData: FormData): LeadEnrichment {
  const headers = request.headers;
  const { deviceType, os, browser } = parseUserAgent(headers.get("user-agent") || "");

  return {
    country: headers.get("x-vercel-ip-country") || "",
    region: headers.get("x-vercel-ip-country-region") || "",
    city: headers.get("x-vercel-ip-city") || "",
    deviceType,
    os,
    browser,
    referrer: String(formData.get("referrer") || ""),
    utmSource: String(formData.get("utm_source") || ""),
    utmMedium: String(formData.get("utm_medium") || ""),
    utmCampaign: String(formData.get("utm_campaign") || ""),
    timestamp: new Date().toISOString(),
  };
}
