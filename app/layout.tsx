import type { Metadata } from "next";
import { Figtree } from "next/font/google";

import { AppEntryMarker } from "@/components/AppEntryMarker";
import { FloatingSocialButtons } from "@/components/FloatingSocialButtons";
import { JsonLd } from "@/components/JsonLd";
import { ScrollReset } from "@/components/ScrollReset";
import { ALLOW_INDEXING, DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";
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
  // Sitewide noindex switch (SEO/metadata audit, 2026-09-06) -- see
  // ALLOW_INDEXING's own comment (content/site.ts). `false` here renders
  // <meta name="robots" content="noindex, nofollow"> via Next's own
  // Metadata API; `undefined` (once ALLOW_INDEXING is true) omits the
  // `robots` key entirely, so no meta tag renders and normal indexing
  // applies. No per-page override anywhere reintroduces indexing while this
  // is off -- every page inherits this root layout value untouched.
  ...(ALLOW_INDEXING ? {} : { robots: { index: false, follow: false } }),
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
      <body className="min-h-full bg-paper font-sans text-body text-text">
        {/* Present on every route, renders nothing -- records which path
            this browser tab's JS actually booted on, so IntroLoader (the
            homepage's own entrance animation) can tell a genuine fresh
            entry to "/" apart from a client-side navigation that happens
            to land there. See lib/pageEntry.ts. */}
        <AppEntryMarker />
        <ScrollReset />
        {children}
        <FloatingSocialButtons />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
      </body>
    </html>
  );
}
