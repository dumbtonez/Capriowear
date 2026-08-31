"use client";

// components/ScrollReset.tsx
// Rendered once, in the root layout (present on every route). Real bug,
// found live 2026-08-30: navigating to a new page via <Link> (e.g. home ->
// /activewear/leggings, or the reverse) left the scroll position wherever
// it was on the PREVIOUS page, clamped to the new page's own shorter
// height -- landing the reader on the new page's footer instead of its top
// ("stuck on the footer"). Confirmed this is specific to navigating
// between the root "/" route and any other route: Next's own built-in
// scroll-to-top-on-navigation only fires reliably when the two routes
// share a common nested layout segment (e.g. /activewear/leggings ->
// /activewear/shorts, both under the same [category]/page.tsx parent,
// resets correctly on its own) -- crossing the top-level boundary between
// "/" and any other route segment does not reset scroll on this app,
// independent of this project's own code (confirmed with no custom
// scroll/transition code present in the app at all).
//
// Scrolls to top on every PUSH navigation (a real link click), but not on
// browser back/forward (POP) -- those should keep the browser's own native
// scroll-restoration behaviour, which already works correctly and
// shouldn't be overridden by this fix.
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

export function ScrollReset() {
  const pathname = usePathname();
  const isPop = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const onPopState = () => {
      isPop.current = true;
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // useLayoutEffect, not useEffect: this needs to run synchronously right
  // after the new page's DOM commits, before the browser paints it --
  // useEffect's own deferred timing left a window where the old scroll
  // offset was still visible against the new (usually shorter) page,
  // clamped to whatever that page's own max scroll allowed. Explicit
  // `behavior: "instant"` overrides this site's own global
  // `scroll-behavior: smooth` (app/globals.css) -- without it, a plain
  // `scrollTo(0, 0)` here would animate instead of snapping, which is not
  // what a route change should do.
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isPop.current) {
      isPop.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
