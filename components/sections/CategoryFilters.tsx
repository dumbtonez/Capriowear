// components/sections/CategoryFilters.tsx
// The Activewear PLP's left-panel category accordion (Figma node 406:3085,
// "Filters", 2026-08-28; style revised 2026-08-29, node 573:5457). Reads
// content/home.ts's own activewearMegaMenu directly rather than taking
// group data as a prop -- the exact same 5 groups/categories the desktop
// mega menu and mobile drawer already render, so this can never drift into
// a second, hand-typed copy of the category list. Only the active category
// varies per page. The trailing "Teamwear & Uniforms ->" cross-link (and
// its `teamwearHref` prop) was removed 2026-08-28 (owner call) -- this
// panel is Activewear-only content, and the link isn't in the latest
// Figma revision either.
//
// Sticky mechanic checked directly against gymshark.com/collections/
// leggings/womens (owner reference, 2026-08-29) and confirmed already
// matching: plain `position: sticky` + a fixed `top` offset, locking with
// zero drift once stuck. See the `list` recipe's own comment in
// components/ui/styles.ts for the full comparison. Desktop (xl+) only --
// see the mobile FAB/drawer below for how this same list is reached below
// that breakpoint.
//
// Mobile filter access (2026-08-30, owner: reference screenshots of a
// Babyshop-style "Filter" FAB and a bottom-sheet filter panel) -- below xl
// this panel is no longer part of the page flow at all. Instead a fixed
// "Filter" pill opens the exact same category groups (still plain nav
// links, no checkboxes -- there's no togglable filter *state* here, only
// navigation to a different category page) in a rounded bottom sheet over a
// dimmed backdrop, on tap only; picking a sub-category navigates straight
// to that page's own results, which unmounts this one along with it. The
// sheet reuses MobileNav.tsx's own proven overlay mechanic (portal to
// document.body so it escapes Header's `sticky z-40` stacking context, a
// hand-rolled focus trap, Escape-to-close, background scroll lock, and a
// rendered/revealed two-state dance so the closing slide-down transition
// finishes before unmount) rather than a new one -- see
// CLOSE_TRANSITION_MS below, matched to the sheet's own transition
// duration. It's a separate component from MobileNav rather than a variant
// of it: different trigger (a bottom FAB, not the header's "Menu" pill),
// different content (this category list, not the nav's
// links/mega-menu/contact/social), different shape (a light bg-paper
// bottom sheet with a visible backdrop, not the nav's dark, backdrop-less
// full-screen takeover).
"use client";

import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { FilterChevronIcon } from "@/components/icons/FilterChevronIcon";
import { cx } from "@/components/ui/cx";
import { categoryFilters } from "@/components/ui/styles";
import { activewearMegaMenu } from "@/content/home";

export type CategoryFiltersProps = {
  /** Category.slug of the current page, e.g. "leggings". */
  activeSlug: string;
};

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

// Matches `drawerPanel`'s own `duration-300` exactly -- see MobileNav's own
// identical constant (there matched to a 900ms transition) for why this has
// to match the CSS transition length: the component stays mounted this long
// after `open` goes false, so the closing slide-down transition has time to
// actually play before the portal unmounts.
const CLOSE_TRANSITION_MS = 300;

// activewearMegaMenu's group labels are stored upper-case ("TOPS", "SETS &
// ONE PIECES") for the mega menu's own small-caps display -- this sidebar's
// Figma design shows the same groups in plain title case ("Tops", "Sets &
// One Pieces") instead, so each word is re-cased here rather than adding a
// second, differently-cased copy of the same label to the shared data.
function toTitleCase(label: string) {
  return label
    .toLowerCase()
    .split(" ")
    .map((word) => (word === "&" ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
}

// The accordion body shared by the desktop sidebar and the mobile drawer
// below -- extracted so both render identical open/close behaviour from one
// place instead of two copies. Each caller gets its own independent
// `openLabels` state (a plain useState inside this component, re-created
// per mount): the two are never visible at the same time, so there's no
// need to lift/share that state between them.
function FilterGroupList({ activeHref, onNavigate }: { activeHref: string; onNavigate?: () => void }) {
  // All groups start open (owner call, 2026-08-28: "by default open all the
  // sub-categories") -- a Set, not a single active label, since more than
  // one group can be open at once now. Seeded from every group's own label
  // rather than a fixed list, so a future 6th category group opens by
  // default too, with no second place to remember to update.
  const [openLabels, setOpenLabels] = useState(
    () => new Set(activewearMegaMenu.map((group) => group.label)),
  );

  function toggleGroup(label: string) {
    setOpenLabels((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  }

  return (
    <>
      {activewearMegaMenu.map((group) => {
        const isOpen = openLabels.has(group.label);

        return (
          <div key={group.label} className={isOpen ? categoryFilters.groupWrapExpanded : undefined}>
            <button
              type="button"
              onClick={() => toggleGroup(group.label)}
              aria-expanded={isOpen}
              className={isOpen ? categoryFilters.groupHeaderExpanded : categoryFilters.groupHeaderCollapsed}
            >
              {toTitleCase(group.label)}
              <FilterChevronIcon className={cx(categoryFilters.chevron, isOpen && categoryFilters.chevronOpen)} />
            </button>
            {/* grid-template-rows 0fr<->1fr, not a conditional unmount --
                animates height:auto smoothly with zero JS measurement, same
                technique this project already uses for zero-JS motion
                (Marquee/TextReveal's own CSS-only animations). A plain
                mount/unmount (the earlier build) had nothing to transition,
                so the panel snapped open/closed instantly. */}
            <div className={isOpen ? categoryFilters.itemListGridOpen : categoryFilters.itemListGrid}>
              <div className={categoryFilters.itemListClip}>
                <ul className={categoryFilters.itemList}>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onNavigate}
                        className={item.href === activeHref ? categoryFilters.itemActive : categoryFilters.item}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

// The mobile-only FAB + bottom sheet -- see this file's own header comment
// for why this mirrors MobileNav.tsx's mechanic rather than reusing it
// directly.
//
// Scoped to the listing area only (internal review, 2026-08-30, ahead of
// locking this page as the master PLP template): the FAB was plain
// `position: fixed` with no visibility scoping at all, so it stayed pinned
// to the viewport for the ENTIRE page, not just the filters+grid area --
// found live, scrolling the full mobile page: it floated over WhatWeCover's
// body copy, TrustPoints, FabricOptions, the FAQ answers, and the Footer's
// own social links, obscuring real content and one real tap target on
// every one of them. An IntersectionObserver on `#plp-listing` (the
// filters+grid row itself, see app/activewear/[category]/page.tsx) shows
// the FAB only while that row is actually in the viewport -- visible from
// page load (the row starts near the top) through the end of the product
// grid, gone the moment the user scrolls into unrelated sections below.
function FilterFabAndDrawer({ activeHref }: { activeHref: string }) {
  const fabRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [inListingArea, setInListingArea] = useState(false);

  useEffect(() => {
    const target = document.getElementById("plp-listing");
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setInListingArea(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Stays mounted slightly longer than `open` so the closing slide-down
  // transition has something to animate, same reasoning as MobileNav's own
  // `rendered`/`revealed` pair.
  const [rendered, setRendered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  if (open && !rendered) setRendered(true);
  if (!open && revealed) setRevealed(false);

  useEffect(() => {
    if (!open) {
      const timeout = setTimeout(() => setRendered(false), CLOSE_TRANSITION_MS);
      return () => clearTimeout(timeout);
    }
    const raf = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(raf);
  }, [open]);

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus in on open, return it to the FAB on close.
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
    } else {
      fabRef.current?.focus();
    }
  }, [open]);

  // Escape closes; Tab cycles inside the panel.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {/* inListingArea: see this component's own header comment -- the FAB
          only renders while the filters+grid row is actually in view, not
          for the rest of the page's scroll range. */}
      {inListingArea ? (
        <button ref={fabRef} type="button" onClick={() => setOpen(true)} className={categoryFilters.fab}>
          <SlidersHorizontal className={categoryFilters.fabIcon} aria-hidden="true" />
          <span className={categoryFilters.fabLabel}>Filter</span>
        </button>
      ) : null}

      {/* Nothing rendered while fully closed, same reasoning as MobileNav --
          no server/client mismatch, and document.body is guaranteed to
          exist by the time the portal mounts. */}
      {rendered
        ? createPortal(
            <>
              {/* Dimmed but not opaque (owner reference, 2026-08-30) -- the
                  page stays visible behind the sheet, unlike MobileNav's own
                  full-screen takeover which has no backdrop at all. Tapping
                  it is a second way to dismiss, alongside Escape/the close
                  button. */}
              <div
                aria-hidden="true"
                onClick={() => setOpen(false)}
                className={cx(categoryFilters.drawerBackdrop, revealed ? categoryFilters.drawerBackdropOpen : categoryFilters.drawerBackdropClosed)}
              />
              <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label="Filters"
                className={cx(categoryFilters.drawerPanel, revealed ? categoryFilters.drawerRevealOpen : categoryFilters.drawerRevealClosed)}
              >
                <div className={categoryFilters.drawerHandle} />
                <div className={categoryFilters.drawerHead}>
                  <p className={categoryFilters.drawerHeading}>Filters</p>
                  <button ref={closeRef} type="button" onClick={() => setOpen(false)} className={categoryFilters.drawerClose}>
                    <X className={categoryFilters.drawerCloseIcon} aria-hidden="true" />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
                <div className={categoryFilters.drawerBody}>
                  <FilterGroupList activeHref={activeHref} onNavigate={() => setOpen(false)} />
                </div>
              </div>
            </>,
            document.body,
          )
        : null}
    </>
  );
}

export function CategoryFilters({ activeSlug }: CategoryFiltersProps) {
  const activeHref = `/activewear/${activeSlug}`;

  return (
    <>
      <nav aria-label="Activewear categories" className={categoryFilters.list}>
        <p className={categoryFilters.header}>Filters</p>
        <FilterGroupList activeHref={activeHref} />
      </nav>
      <FilterFabAndDrawer activeHref={activeHref} />
    </>
  );
}
