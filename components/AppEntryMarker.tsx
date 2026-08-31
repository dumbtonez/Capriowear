"use client";

// components/AppEntryMarker.tsx
// Rendered once, in the root layout (present on every route). Its only job
// is calling `captureInitialPath` with the current pathname -- see
// lib/pageEntry.ts for why this, not sessionStorage alone, is what lets
// IntroLoader tell a genuine fresh entry to the homepage apart from an
// internal client-side navigation that happens to land there.
import { usePathname } from "next/navigation";
import { useState } from "react";

import { captureInitialPath } from "@/lib/pageEntry";

export function AppEntryMarker() {
  const pathname = usePathname();
  // Lazy initializer, not a bare call in the render body: this is the
  // accepted way to run a one-time, render-phase side effect in React (it
  // still executes synchronously before paint, same timing this needs, but
  // doesn't run on every re-render the way an unguarded call would appear
  // to invite).
  useState(() => captureInitialPath(pathname));
  return null;
}
