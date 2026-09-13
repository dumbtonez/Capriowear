// app/studio/[[...tool]]/page.tsx
// Embeds Sanity Studio so it deploys with the app on Vercel. Must be a
// client component: sanity.config.ts pulls in browser-only dependencies
// (e.g. swr's client entry) that break when Next bundles them into the
// Server Component graph. Route metadata lives in the sibling layout.tsx
// instead, since a client component can't export it.
"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
