// app/capriowear/layout.tsx
// Re-scopes the sitewide title/OG defaults back to "Capriowear" for every
// route under this segment (2026-09-14, Capriosports homepage task) -- the
// root layout (app/layout.tsx) now defaults to "Capriosports" sitewide,
// since the repo root is the Capriosports parent site, not Capriowear.
// Renders no wrapper UI of its own; every visible section (Header, Footer,
// etc.) is still composed per-page exactly as before this file existed.
import type { Metadata } from "next";

import { SITE_NAME } from "@/content/site";

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  openGraph: {
    siteName: SITE_NAME,
  },
};

export default function CapriowearLayout({ children }: LayoutProps<"/capriowear">) {
  return children;
}
