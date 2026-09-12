"use client";

// components/TeaserVideo.tsx
// Hero's own "loop teaser -> full video" pattern (owner brief, 2026-09-12):
// autoplay a short, muted teaser loop once the video scrolls into view, with
// a persistent "Watch full video" button overlaid on it; clicking swaps to
// the real, longer video, unmuted, from 0:00, with controls. Skips the
// teaser loop entirely (falls back to the existing poster + big centred
// Play button, `hero.playWrap`/`playCircle`/`playIcon`/`playLabel`) when
// `prefers-reduced-motion: reduce` is set, or the connection reports
// `saveData`/a 2G-class `effectiveType` -- clicking that fallback button
// goes straight to the full video too, so there's exactly one way to reach
// it regardless of which state the user arrived from.
//
// `useInViewAutoplay` is the reusable half of this (item 7 of the brief):
// just "is autoplay allowed, and is this element in view", with no opinion
// on teaser/full swapping at all -- a future factory-page short clip that
// just wants "autoplay this when visible, no expand step" can import this
// hook alone and skip `TeaserVideo` entirely.
//
// Never the native `autoplay` HTML attribute (owner spec, explicit) --
// playback is always started from this hook's own effect once in view,
// exactly the technique confirmed live on store.google.com's own product
// videos (every one of theirs also ships `autoplay={false}` in the DOM,
// muted/playsInline/preload="none", started by their own JS instead).
//
// Only ONE piece of this is real React state (`optedIntoFull`, flipped by a
// single user click) -- whether the teaser is actually showing is a plain
// DERIVED value (`autoplayAllowed && inView && !optedIntoFull`), not a
// separate state field kept in sync via its own effect. That derived-value
// approach is deliberate, not a style choice: an effect whose only job is
// "call setState synchronously once some other state/props are true" is
// exactly the anti-pattern `react-hooks/set-state-in-effect` flags (real
// lint error, found live wiring this up) -- computing it during render
// removes the extra render pass and the lint violation at once. It's also
// hydration-safe on its own: `inView` only ever becomes `true` from the
// IntersectionObserver's own callback, which cannot run before the client
// mounts, so the server and the client's first paint always agree ("poster"),
// with no separate SSR-guard effect required for that part either.
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { hero, teaserVideo } from "@/components/ui/styles";

const IN_VIEW_THRESHOLD = 0.4; // 40% visible, within the brief's own "~30-50%" range

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isSlowConnection() {
  // `navigator.connection` (NetworkInformation) isn't in every browser's own
  // TypeScript lib, and isn't defined at all during SSR -- read it
  // defensively rather than widening a global type just for this one
  // optional check.
  if (typeof navigator === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (!connection) return false;
  return Boolean(connection.saveData) || connection.effectiveType === "2g" || connection.effectiveType === "slow-2g";
}

/**
 * Reusable half of the teaser pattern: whether autoplay is allowed at all
 * (`prefers-reduced-motion`/save-data/2G gate, read once via a lazy initial
 * state -- SSR-safe, see file header), and whether `ref`'s element is
 * currently far enough into the viewport to actually start. A future short
 * always-visible clip elsewhere on the site can use this alone -- no
 * teaser/full swap required.
 */
export function useInViewAutoplay(ref: React.RefObject<Element | null>) {
  const [autoplayAllowed] = useState(() => !prefersReducedMotion() && !isSlowConnection());
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !autoplayAllowed) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: IN_VIEW_THRESHOLD,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, autoplayAllowed]);

  return { autoplayAllowed, inView };
}

export type TeaserVideoProps = {
  /** Accessible label for the video itself (e.g. "Hero video, factory and product"). */
  label: string;
  teaserSrc: string;
  fullSrc: string;
  poster?: string;
  className?: string;
};

export function TeaserVideo({ label, teaserSrc, fullSrc, poster, className }: TeaserVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { autoplayAllowed, inView } = useInViewAutoplay(wrapRef);
  // The one real state transition: a deliberate user click. Never set from
  // an effect -- see file header.
  const [optedIntoFull, setOptedIntoFull] = useState(false);
  // Set only from the teaser `<video>`'s own `onError`/blocked-autoplay
  // path below (a real DOM event callback, not a synchronous effect body --
  // the exception `react-hooks/set-state-in-effect` itself calls out:
  // "calling setState in a callback function when external state changes").
  const [teaserBlocked, setTeaserBlocked] = useState(false);

  const mode: "poster" | "teaser" | "full" = optedIntoFull
    ? "full"
    : autoplayAllowed && inView && !teaserBlocked
      ? "teaser"
      : "poster";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (mode === "teaser") {
      video.muted = true;
      video.play().catch(() => setTeaserBlocked(true));
    } else if (mode === "full") {
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(() => {
        // A blocked unmuted play needs a real user gesture, which a click
        // handler already satisfies in every browser -- this catch only
        // guards the rare case of the element not being ready yet.
      });
    }
  }, [mode]);

  const playFull = () => setOptedIntoFull(true);

  return (
    <div ref={wrapRef} className={className}>
      {mode === "poster" ? (
        <div className="relative size-full">
          {poster ? <Image src={poster} alt={label} fill sizes="100vw" className="object-cover" /> : null}
          <button
            type="button"
            onClick={playFull}
            aria-label={`Play video: ${label}`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className={hero.playWrap}>
              <span className={hero.playCircle}>
                <Play className={hero.playIcon} aria-hidden="true" fill="currentColor" />
              </span>
              <span className={hero.playLabel}>Play Video</span>
            </span>
          </button>
        </div>
      ) : (
        <div className="relative size-full">
          <video
            ref={videoRef}
            className="size-full object-cover"
            poster={poster}
            muted={mode === "teaser"}
            loop={mode === "teaser"}
            playsInline
            preload="none"
            controls={mode === "full"}
            aria-label={label}
          >
            <source src={mode === "teaser" ? teaserSrc : fullSrc} type="video/mp4" />
          </video>
          {mode === "teaser" ? (
            <button type="button" onClick={playFull} className={teaserVideo.overlayButton}>
              <Play className={teaserVideo.overlayIcon} aria-hidden="true" fill="currentColor" />
              <span className={teaserVideo.overlayLabel}>Watch full video</span>
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
