// sanity/env.ts
// Read once, from env only -- never hardcoded. The rest of the site must
// still build with these unset; only the Studio route itself needs them.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const apiVersion = "2025-01-01";

export function assertProjectId(): string {
  if (!projectId) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Set it in .env.local (see .env.local.example) before opening /studio.",
    );
  }
  return projectId;
}
