"use client";

// components/ShortClipMedia.tsx
// "Play once on scroll-into-view, freeze on the last frame, small replay
// icon" -- owner brief, 2026-09-13, referencing Google Store's own
// short-clip treatment, first used by Our Factory Process's 7 station
// clips (components/sections/OurFactoryProcess.tsx). Deliberately NOT
// `TeaserVideo` (Hero's teaser-loop -> full-video-on-click swap): there is
// no "full" version and no `loop` here at all -- one pass, then a frozen
// frame, with a small icon-only control to watch it again. Shares its
// autoplay-gating half with `TeaserVideo` via the same exported
// `useInViewAutoplay` hook (components/TeaserVideo.tsx) -- one
// IntersectionObserver + reduced-motion/save-data gate, not two.
//
// Never the native `autoplay` attribute (same reasoning as `TeaserVideo`):
// playback is always started from this component's own effect once
// `inView` is true, confirmed live on store.google.com's own product
// videos, all of which ship `autoplay={false}` in the DOM too.
//
// `preload="none"` plus never calling `.play()` until genuinely in view is
// what actually keeps an off-screen clip's bytes at zero -- there is no
// separate "don't render the video tag" gate needed on top of that; the
// tag existing in the DOM costs nothing over the network on its own.
// Scrolling back OUT of view before the clip has ended pauses it (not a
// reset) so a quick scroll-past doesn't leave it silently buffering in the
// background; scrolling back in resumes from wherever it paused. Once it
// has genuinely ended, in/out of view no longer matters -- it stays frozen
// on its last frame until the replay button is used.
//
// Independent per instance, on purpose: each `ShortClipMedia` owns its own
// `<video>`, its own IntersectionObserver (via its own `wrapRef`), and its
// own ended/replay state. Nothing here reaches across instances -- seven of
// these on one page are seven fully separate players, never synced.
import { RotateCcw, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { MediaRadius, MediaRatio } from "./MediaPlaceholder";
import { useInViewAutoplay } from "./TeaserVideo";
import { cx } from "./ui/cx";
import { media, shortClipMedia } from "./ui/styles";

export type ShortClipMediaProps = {
  /** Accessible label for the video itself, e.g. "Fabric sourcing, Capriowear factory". */
  label: string;
  videoSrc: string;
  /**
   * Poster/first-frame image, carrying this card's LCP exactly like Hero's
   * own video does -- shown before playback ever starts (native `poster`
   * attribute once the `<video>` is mounted) and, when autoplay is gated
   * out entirely, as a real `next/image` behind a click-to-play button, so
   * that state never depends on the video element loading anything at all.
   */
  posterSrc: string;
  /**
   * Same contract as `MediaPlaceholder`/`ParallaxMedia`: the aspect-ratio
   * class actually lives on this component's own root (`media.ratio[...]`),
   * not something the caller's `className` is expected to supply -- a
   * bare `overflow-hidden` box with no intrinsic size otherwise collapses
   * to 0 height, same reason those two components take this prop instead
   * of leaving sizing entirely to the caller.
   */
  ratio?: MediaRatio;
  radius?: MediaRadius;
  className?: string;
};

export function ShortClipMedia({ label, videoSrc, posterSrc, ratio = "16:9", radius = "none", className }: ShortClipMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { autoplayAllowed, inView } = useInViewAutoplay(wrapRef);
  // `started` only matters for the reduced-motion/save-data path below
  // (autoplay is gated out entirely, so it's the ONLY thing that ever
  // flips this from "poster only" to "render the video") -- set from that
  // button's own click handler, never from an effect body (the
  // `react-hooks/set-state-in-effect` lint rule this codebase already
  // enforces elsewhere, e.g. `TeaserVideo`'s own file header, flags a
  // synchronous `setState` inside an effect as exactly the anti-pattern to
  // avoid). `ended` is "has it played through to the end" (the only thing
  // that puts the replay button up).
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);

  // Starts the clip the moment it's genuinely in view (autoplay path), and
  // pauses/resumes it as it leaves/re-enters view thereafter -- never
  // touches `currentTime`, so a resume continues from wherever it paused,
  // not a restart. `video.pause()` on an already-paused/not-yet-started
  // element is a harmless no-op, so this needs no separate "has it even
  // started yet" check of its own. Once `ended`, this effect has nothing
  // left to do: the frozen last frame doesn't care about `inView` any more.
  useEffect(() => {
    if (!autoplayAllowed || ended) return;
    const video = videoRef.current;
    if (!video) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView, autoplayAllowed, ended]);

  const handleEnded = () => setEnded(true);

  const replay = () => {
    const video = videoRef.current;
    setEnded(false);
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  // The reduced-motion/save-data path's own click-to-play -- the ONLY way
  // that state ever starts the clip (not a secondary action the way replay
  // is once a clip has already played), so it mounts the video and plays
  // it immediately on click rather than waiting on `inView` at all.
  const clickToPlay = () => {
    setStarted(true);
    // `requestAnimationFrame` so the `<video>` (only rendered once
    // `showPosterOnly` flips false, on the next render) has mounted before
    // `.play()` is called on it.
    requestAnimationFrame(() => videoRef.current?.play().catch(() => {}));
  };

  const showPosterOnly = !autoplayAllowed && !started;

  return (
    <div ref={wrapRef} className={cx(media.shell, media.ratio[ratio], media.radius[radius], className)}>
      {showPosterOnly ? (
        <>
          <Image src={posterSrc} alt={label} fill sizes="50vw" className={shortClipMedia.posterImage} />
          <button type="button" onClick={clickToPlay} aria-label={`Play video: ${label}`} className={shortClipMedia.posterPlayButton}>
            <span className="inline-flex size-14 items-center justify-center rounded-pill bg-accent text-accent-ink">
              <Play className="size-5" aria-hidden="true" fill="currentColor" />
            </span>
          </button>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            className={shortClipMedia.video}
            poster={posterSrc}
            muted
            playsInline
            loop={false}
            preload="none"
            onEnded={handleEnded}
            aria-label={label}
          >
            {/* Always rendered, never gated on `started` -- a `<source>`
                added to an already-parsed `<video>` needs an explicit
                `.load()` call to be picked up in every browser, which is
                extra state this doesn't need. `preload="none"` above is
                what actually keeps this at zero fetched bytes until
                `.play()` is called; the source being present in markup the
                whole time is exactly `TeaserVideo`'s own already-verified
                pattern, not a gap. */}
            <source src={videoSrc} type="video/mp4" />
          </video>
          {ended ? (
            <button type="button" onClick={replay} aria-label="Replay video" className={shortClipMedia.replayButton}>
              <RotateCcw className={shortClipMedia.replayIcon} aria-hidden="true" />
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
