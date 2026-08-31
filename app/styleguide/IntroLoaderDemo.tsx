"use client";

// app/styleguide/IntroLoaderDemo.tsx
// IntroLoader is gated on a genuine fresh browser entry to "/" (see
// lib/pageEntry.ts) -- a demo-only bypass prop on the real component would
// mean testing a path real visitors never take. Instead this replays the
// real thing for real: clear the session flag, then a full (non-Next-Link)
// navigation to "/" so AppEntryMarker captures a true fresh entry, same as
// typing the URL in a new tab.
import { Button } from "@/components/Button";

const SESSION_KEY = "cw-intro-seen";

export function IntroLoaderReplayButton() {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        sessionStorage.removeItem(SESSION_KEY);
        // A real full navigation, not router.push(): a client-side
        // transition is exactly the case IntroLoader must NOT replay for
        // (lib/pageEntry.ts), so router.push() here would demo a no-op.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- see above
        window.location.href = "/";
      }}
    >
      Replay on homepage
    </Button>
  );
}
