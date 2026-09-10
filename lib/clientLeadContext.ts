// lib/clientLeadContext.ts
// Client-side half of passive lead enrichment (see lib/leadEnrichment.ts
// for the server-side half). Referrer and UTM params only ever exist on
// the browser's own `document`/`location` at the moment a form is
// submitted -- the server's own view of "referrer" by the time the POST
// request arrives is just this same page, not wherever the visitor
// actually came from, possibly on an earlier visit. Reused by both
// RequestSampleForm.tsx and DownloadCatalogForm.tsx right before their
// existing `fetch` calls, so neither form has to duplicate this.
export function appendLeadContext(formData: FormData) {
  if (typeof window === "undefined") return;

  formData.set("referrer", document.referrer || "");

  const params = new URLSearchParams(window.location.search);
  formData.set("utm_source", params.get("utm_source") || "");
  formData.set("utm_medium", params.get("utm_medium") || "");
  formData.set("utm_campaign", params.get("utm_campaign") || "");
}
