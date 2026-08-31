import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { AppEntryMarker } from "@/components/AppEntryMarker";
import { JsonLd } from "@/components/JsonLd";
import { ScrollReset } from "@/components/ScrollReset";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

// Figtree is the only typeface on the site. Weights 400, 500, 600, 700.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// metadataBase anchors every relative URL used in generated metadata (e.g.
// app/opengraph-image.tsx's file-convention-detected route) to the real
// public URL -- see content/site.ts for why that isn't this app's own
// internal routing root. No manual `openGraph.images`/`twitter.images` here:
// Next auto-detects app/opengraph-image.tsx and generates that metadata
// itself, which takes priority over (and would just conflict with) a
// manually duplicated entry in the same segment.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} h-full`}>
      {/* Not `flex flex-col`: a flex item's `position: sticky` (Footer's
          "reveal" transition) computed the wrong sticky bounds as a direct
          flex child of body, engaging pinned-at-bottom from the very top of
          the page instead of only once scrolled near the real end -- found
          2026-08-26 testing the live Footer. Plain block flow doesn't have
          that failure mode, and nothing here relies on the flex context
          (checked: no child uses `flex-1` expecting to grow inside it). */}
      <body className="min-h-full bg-paper font-sans text-body text-ink">
        {/* Present on every route, renders nothing -- records which path
            this browser tab's JS actually booted on, so IntroLoader (the
            homepage's own entrance animation) can tell a genuine fresh
            entry to "/" apart from a client-side navigation that happens
            to land there. See lib/pageEntry.ts. */}
        <AppEntryMarker />
        <ScrollReset />
        {children}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
