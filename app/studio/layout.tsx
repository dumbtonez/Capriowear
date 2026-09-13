// app/studio/layout.tsx
// Server-side wrapper for the Studio route: metadata and route config can't
// live in the client component that renders NextStudio (see page.tsx),
// since NextStudio's dependency graph pulls in browser-only libraries that
// break when bundled into a Server Component.
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Studio",
  // Always noindex, regardless of NEXT_PUBLIC_ALLOW_INDEXING -- this route
  // is an internal editing tool, never a page for search engines or AI
  // crawlers.
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
