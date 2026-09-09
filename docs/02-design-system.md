# 02 · Design system

The single source of truth for how Capriowear looks. If a value is not here, it does not exist in the design system yet.

Everything on this page is rendered live at **`/styleguide`**. That page is generated from the theme itself, so it cannot drift from what the site actually uses.

---

## The three layers

| Layer | Where | Holds | Rule |
|---|---|---|---|
| 1. Tokens | `@theme` block in `app/globals.css` | Raw values: colours, type scale, spacing, radii, shadows | Tailwind v4 keeps the theme in CSS. Every token here emits a CSS variable **and** generates the matching utility, so the two can never drift. `tailwind.config.ts` holds only the source globs. |
| 2. Recipes | `components/ui/styles.ts` | Token utilities combined into named looks: `button.primary`, `chip.active`, `header.megaPanel` | Every class string that describes *how something looks*. Restyling all buttons is one edit here. |
| 3. Components | `components/*.tsx` | Structure, behaviour, accessibility | No appearance decisions. Classes come from layer 2. |

**Where does this class belong?** If it describes how something *looks* — colour, type, spacing rhythm, radius, border, shadow, a hover or open state — it goes in the recipe file. If it describes where things sit in exactly one place and nowhere else — a specific grid for a specific page section — it may stay in the component. When in doubt, put it in the recipe file.

**Never** put a raw hex or pixel value in a component. If a design needs a value the tokens do not have, stop and ask before adding a token.

### Using it

```tsx
import { cx } from "./ui/cx";
import { button } from "./ui/styles";

<button className={cx(button.base, button[variant], className)} />
```

`cx()` joins class names and drops anything falsy, so conditional states read as `cx(icon, isOpen && icon.open)`.

---

## Colour

| Token | Value | Use |
|---|---|---|
| `ink` | `#121317` | Near-black. Dark section backgrounds only |
| `ink-2` | `#17191E` | Secondary dark surface, e.g. a menu panel or a container (media placeholder, exhibition card, etc.) on an ink band |
| `text` | `#1D1D1F` | Primary text colour on a white/paper section (headings, body copy) |
| `paper` | `#FFFFFF` | Default page background |
| `paper-2` | `#F5F4F1` | Alternating light section |
| `line` | `rgba(0,0,0,0.10)` | Hairline border on light |
| `line-dark` | `rgba(255,255,255,0.12)` | Hairline border on dark |
| `muted` | `#6B6B74` | Secondary text |
| `accent` | `#FF791B` | Brand orange. CTAs and highlights |
| `accent-ink` | `#FFFFFF` | Text and icons on accent |
| `subline` | `#17191E` | Subline text directly under a title, light/white sections only |

**Dark sections** run `ink` background, `paper` text, `line-dark` hairlines. Use `surface.dark` from the recipe file rather than assembling it by hand.

**`ink` and `text` are two separate tokens, not one dual-purpose colour** (split 2026-09-08, owner: "change all the text color to 1D1D1F ... only for those which are on the white background, don't change anything on the black/dark background"). Before this, `--color-ink` doubled as both "dark section background" and "primary text on a light section" — the two roles happened to share one near-black value. `text-ink` (the old utility, sitewide) is now `text-text`; `bg-ink` is untouched. Text that sits on a dark section still reads `text-paper` (white) or a muted-on-dark literal (`#838D97`), never `text`/`ink`.

**The `currentColor` pattern.** Components that appear on both light and dark sections use `border-current` / `text-current/60` rather than a fixed colour, so they inherit whatever the section sets. This is why `Button` secondary, `Chip`, `Eyebrow` muted and `Accordion` need no "on dark" prop. Prefer this over adding an inverse variant.

**Eyebrow-above-a-heading colour is a standing sitewide rule, not `currentColor` (owner call, 2026-08-24): always `#ABB5C0` on a dark/black section, always `#17191E` on a light/white section, no exceptions.** This replaced an earlier `accent` (brand orange) default that had never actually been confirmed against Figma for most sections using it — Hero's own eyebrow included, changed from accent orange to `#ABB5C0` when this rule was applied. `Eyebrow`'s `tone` prop has no default specifically so this can't be silently inherited wrong: every caller states `"dark"` or `"light"`. `SectionHeading` mirrors this with a required `eyebrowTone` prop. This rule is unrelated to `Eyebrow`'s separate `muted` tone, which is still `currentColor`-based and used only for a standalone label not paired with a heading (Marquee's ticker label, LogoRow's label).

**Subline-under-a-title colour is the same standing rule, extended (owner, 2026-09-01): always `#17191E` (the `subline` token) on a light/white section, sitewide, component-level.** Same colour the eyebrow rule above already uses on light sections, now applied to the sibling pattern — a title with a supporting line directly under it, on white/paper, regardless of whether that field is literally named `subline`, `body`, or `description` in the recipe. Applied to every confirmed instance (owner: "apply it to all the pages, where you see the same pattern, title and subline, both mobile and desktop"):
- `trustPoints.subline` (PLP + PDP, `TrustPoints`)
- `categoryMetaStrip.subline` (PLP)
- `capabilityCard.text` (shared by `OurServices` + `HowItWorks` on the homepage, and `ProductCustomizeSteps` on the PDP)
- `trustSignals.body` / `trustSignals.mobileBody` (homepage)
- `whatWeMake.groupBody` (homepage)
- `productInfo.description` (PDP, the H1's own supporting paragraph)
- `whatWeCover.itemBody` (PLP, the "What We Cover" fact grid — Fabric, Color and print, Style and fit, Branding, Labels, Packaging)

All were `text-ink` (or no colour class, inheriting it) before. Does **not** apply to `FinalCta`'s subline (dark `bg-ink` band) or `ProductCard`'s subline (a product-tile caption, not this title+subline header pattern) — both audited and deliberately excluded. A future section's title+subline pair on a white/paper background should use `text-subline` from the start, not `text-ink`.

**The dark-section mirror of that same rule (owner, 2026-09-09, confirming Our Services' dark variant): subline-under-a-title colour is always `#838D97` on a dark/black section, sitewide, component-level — no exceptions, same standing status as the light-section rule above.** Not a new CSS token — `#838D97` was already this project's fully established muted-on-dark literal before this rule was written down (Hero's mobile ticker, Stats' caption, mega-menu labels, footer contact label, Inside the Factory's caption, `capabilityCard.textDark`, 15+ confirmed instances), this just makes it explicit and binding for the same title+subline pattern the light-section rule covers, rather than a per-section judgement call. Titles pair with this via inheritance, not a colour class of their own: the section sets `text-paper` (white) once at its ambient/wrapper level, and every colourless title (`capabilityCard.title`, `sectionHeading.heading` under `eyebrowTone="dark"`, etc.) picks it up for free.

**Text selection (`::selection`) is a neutral translucent gray, not the brand accent (owner, 2026-09-07: "make it neutral color, not brand color")** — was `background: var(--color-accent); color: var(--color-accent-ink)` (the brand orange, white text), one sitewide rule in `app/globals.css`. Now `background: color-mix(in srgb, var(--color-muted) 40%, transparent); color: inherit` — `--color-muted` (`#6B6B74`, the existing secondary-text gray) works as a translucent overlay on both light and dark sections without a second per-section rule, and `color: inherit` keeps whichever text colour was already there rather than forcing one that would fight one of the two contexts.

## Typography

**SOURCE OF TRUTH: Figma**, file "Caprio Website", node `284:333` ("Design System"), where all thirteen styles below are registered as local text styles. This is the one deliberate exception to the "Figma is layout only" rule elsewhere in this document — for type, Figma's sizes, weights and line heights are copied exactly, because the owner asked for it directly. Do not adjust a value here to taste; change it in Figma and re-read it.

**One typeface for the whole site: Figtree**, loaded via `next/font`. Letter spacing is **0 on every style** — no wide-tracked eyebrow, no tightened headings. Figma has no style below 16px, so there is no equivalent of a 14px "small" size; the smallest style, Button Small, is used for chips, nav links and captions instead.

| Style | Token | Size at 1440px (= Figma) | Size at 1920px | Weight | Line height |
|---|---|---|---|---|---|
| Display | `text-display` | 64px | 78.2px | 400 Regular | 70px (1.094) |
| Heading 1 | `text-h1` | 54px | 64.7px | 500 Medium | 64px (1.185) |
| Heading 2 | `text-h2` | 36px | 41.3px | 500 Medium | 1.2 |
| Heading 3 | `text-h3` | 30px | 33.6px | 500 Medium | 1.2 |
| Heading 4 | `text-h4` | 28px | 31.1px | 500 Medium | 1.2 |
| Heading 5 | `text-h5` | 24px, fixed | 24px, fixed | 500 Medium | 1.2 |
| Overline | `text-overline` | 20px, fixed | 20px, fixed | 600 SemiBold | 1.2 |
| Body Large | `text-body-lg` | 20px, fixed | 20px, fixed | 400 Regular | 1.2 |
| Body | `text-body` | 18px, fixed | 18px, fixed | 400 Regular | 22px (1.222) |
| Button | `text-button` | 18px, fixed | 18px, fixed | 700 Bold | 24px (1.333) |
| Button Small | `text-button-sm` | 16px, fixed | 16px, fixed | 700 Bold | 24px (1.5) |
| Stat Number | `text-stat-number` | 60px | 72.4px | 600 SemiBold | 1.2 |
| Stat Label | `text-stat-label` | 50px | 59.8px | 600 SemiBold | 1.2 |

**Responsive behaviour.** Figma specifies one size on a 1440px frame, and has no opinion on anything wider. Two groups:

- Every style **24px and under is fixed** (Heading 5, Overline, Body, Body Large, Button, Button Small) — same size at every width, mobile included. These are reading and UI sizes; growing them on a bigger monitor doesn't aid readability the way a bigger headline does.
- **A confirmed real-mobile eyebrow exception (16px, several sections — see below) is real-mobile-only. Tablet is not mobile: from `md:` up, an eyebrow is always the standard 20px/24px Overline, sitewide, no exceptions (owner, 2026-09-10: "on tablet, eyebrow heading across pages should be 20px by 24px, on some sections in different pages we are using 16px. make it consistent across pages... in the design system so future pages also follow the same").** The bug this rule closes: a component whose mobile-tier `SectionHeading` instance is shared across mobile *and* tablet in one wrapper (`xl:hidden`, not `md:hidden` — e.g. Inside the Factory, Exhibitions) needs its own `eyebrowSize` override to explicitly step back up to Overline at `md:`, the same `max-md:text-[1rem] max-md:font-semibold max-md:leading-[1.2] md:text-overline` shape every already-correct override uses (Hero, What We Make, Our Services' services variant, How It Works' dark variant). A bare, unconditional 16px override (no `md:` split) is always wrong unless the component it's on renders in a genuinely mobile-only (`md:hidden`) wrapper. When adding a new confirmed-mobile-only eyebrow size, always write the full responsive pair, never a flat one-off, even if the section only has one `SectionHeading` instance today.
- **Exception, owner call 2026-08-26: every mobile *title* rendered at Heading 5's 24px is sized up to 30px on mobile only** — desktop keeps the real, Figma-confirmed 24px unchanged. This is a per-component override (`max-xl:text-[1.875rem] ... xl:text-h5`, or a flat 30px where the component is already mobile-only), not a change to the `text-h5` token itself, since Heading 5 still legitimately renders at 24px in plenty of desktop contexts. Applied so far to: `Card`'s tile label, `Accordion`'s question, `TrustSignals`' mobile item titles (e.g. "Low MOQ"), `WhatWeMake`'s mobile category group titles ("Activewear," "Teamwear & Uniforms"), `MobileNav`'s link text, and `HowItWorks`'s card titles (30px there already, from an earlier correction — see [03-component-library.md](03-component-library.md)). Apply the same treatment to any future mobile title that reads from `text-h5`.
- **Headline styles** (Display, Heading 1 to 4, Stat Number, Stat Label) scale from a 360px mobile anchor through the exact Figma value at 1440px, at one constant rate, then **keep scaling at that same rate up to a new max reached at 1920px**, then hold flat above that. **At exactly 1440px the rendered size still matches Figma to the pixel.** Above 1440, size deliberately exceeds Figma's number — added 2026-08-22, because holding these flat at their 1440 size read as small against a 1920 canvas, since the container still caps at 1440 regardless of viewport. `new-max = max + (max - min) × 4⁄9`, the exact same rate the 360-to-1440 span was fit to, so it's one continuous line, not a second guess.

Do not hand-edit a clamp coefficient; recompute the anchors (see the formula in `app/globals.css`). Locked in by `tests/typography.spec.ts`, which checks both the 1440px Figma match and the 1920px headline ceiling.

**Component mapping is Figma's, not a guess**, wherever Figma defines the pairing: SectionHeading uses Overline + Heading 1 (Figma's "Section Header"; the element stays `<h2>`, since Heading 1 is a type style, not a document heading level), CapabilityCard uses Heading 3 + Body Large ("Feature Card"), StatBlock uses Heading 1 + Body Large ("Stat Card" — not the Stat Number/Stat Label styles, which exist in the scale but have no component reading them), Accordion uses Heading 5 + Body ("FAQ Item"), Button uses the Button style. Everything without a Figma component (chips, nav links, ticker items, placeholder labels) is mapped by role to Button Small, the smallest defined style, and is a judgement call rather than a Figma fact — see [03-component-library.md](03-component-library.md).

**Permanent check:** `tests/typography.spec.ts` asserts every token against the Figma table above at 1440px, plus that the fixed styles hold below 1440 and nothing drops under the 14px floor. Run it after touching any type token.

## Spacing

4px base. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160 — all reachable on Tailwind's numeric scale (`p-1` = 4px … `p-40` = 160px).

Section vertical padding: **64 mobile / 96 tablet / 120 desktop**, available as one fluid utility, `py-section`.

## Radii

| Token | Value | Use |
|---|---|---|
| `sm` | 8px | Small chips, inputs |
| `md` | 12px | Inner blocks, badges |
| `lg` | 16px | Cards |
| `xl` | 24px | Media and video blocks |
| `pill` | 9999px | Buttons, tags |

**Applying radius to a placeholder or media box.** The radius and `overflow-hidden` go on the outer shell, but any absolutely-positioned child that fills it (the placeholder fill, the overlay, the real `<Image>`) needs `rounded-[inherit]` too — `overflow-hidden` only clips a child's content that overflows the shell, it does not round a child's own square corners that already fit within it. Without `rounded-[inherit]`, a "rounded" box quietly renders square-cornered borders and images inside it. Fixed in `MediaPlaceholder` 2026-08-23; apply the same pattern to any future component with an absolutely-positioned fill.

## Shadows

Minimal and premium. `shadow-card` on card hover only. No heavy drop shadows, no shadow at rest.

## Grid and container

- Max content width **1440px**, centred, sitewide, no exceptions. Above 1440 the container caps; full-bleed backgrounds still run edge to edge.
- **Hero's own 1680px wide-screen pilot (`.hero-wide-pilot`) was removed 2026-08-26** — added 2026-08-23 after the owner reported content reading small on very large screens, piloted on Hero alone (tried sitewide first, reverted the same day: it read well on Hero's big video block and short heading, but spread grid/text sections like Client Logos and Trust Signals too thin). On a real 1920px screen, though, Hero reading visibly wider than every other section — all pinned to the standard 1440px — read as an inconsistency rather than a deliberate wide moment (owner correction). Hero now uses plain `container-p` like every other section; `.hero-wide-pilot` is gone from `app/globals.css` and `components/ui/styles.ts` entirely, not just unused.
- Container padding: **20px mobile / 32px tablet / 80px desktop**, applied by the `.container-p` class. Desktop was 48px until 2026-08-22, corrected to match Figma's real measured content margin (confirmed on both the nav and Hero frames).
- 12-column grid for layout maths. Gaps: 16 mobile / 24 tablet / 32 desktop.
- **Mobile section-to-section gap is a standard 72px** (owner call, 2026-08-24). Every mobile section wrapper uses `pt-0`, contributing the whole gap via its own `pb-[72px]` — not two independently-tuned top/bottom values that happen to sum right. A new section's mobile wrapper should follow this pattern by default; only deviate with a specific, confirmed reason (matching how Trust Signals' original `pt-0` — set for its own reasons before this was a sitewide rule — turned out to already fit the pattern).
  - **Exception: a section with its own full-bleed background colour** (e.g. Hero's `bg-ink`) cannot contribute the 72px as `padding`, since padding sits inside that element's own background box and would just render as more of that colour, not a visible gap (a real bug, found and fixed on Hero 2026-08-24). Content inside such a box keeps a fixed **48px** inset from the box's own top and bottom edges instead, and the 72px is added as a `margin` on the section itself, so that space shows the page's own background rather than the section's colour.
  - **A full-bleed background colour also always lives on its own unconstrained wrapper, never on the same element as `.container-p`** (confirmed as a real bug on Stats' desktop background, 2026-08-24, after Hero had already established the correct pattern) — `.container-p` caps at `max-width: 1440px`, so a background on that same element stops at 1440px too, showing the page's default background outside it on any wider viewport instead of true edge-to-edge colour. Structure: an outer `<section>` (or wrapper) carries the background with no width constraint; `.container-p` goes on an inner wrapper that only constrains the *content*.
  - **A full-bleed horizontal scroller (a chevron-driven card carousel: Inside the Factory, Exhibitions, How It Works, Product Customize Steps) needs the same 1440px cap as `.container-p`, on its own wrapper, or its flat pixel padding silently drifts from every other section above 1440px** (real bug, found live, 2026-09-08, across all three homepage carousels — Our Factory's own Inside the Factory reuse is where the owner first spotted it). The pattern: the scroller's own `desktopRow` uses a flat `xl:px-[80px]` for its first-card inset — a plain number, not `.container-p`, since the row's cards need to scroll edge-to-edge rather than live inside a padded box. That flat 80px only equals `.container-p`'s real inset up to 1440px; above it, `.container-p` keeps centring (its inset effectively grows past 80px), while a flat number never moves — the gallery's left edge drifts further from the heading above it the wider the screen gets (measured: 80px vs 320px apart at 1920px). Fix: give the scroller's outer wrap (`desktopScrollerWrap`, or a dedicated `desktopScrollerCap` wrapper around it) `mx-auto w-full max-w-[1440px]` — the same width:100%+max-width+auto-margins technique `.container-p` itself uses, not a `vw`-based `calc()` (which is exposed to viewport-scrollbar-gutter measurement quirks a fixed max-width isn't). The row's own existing `px-[80px]` then behaves exactly like `.container-p` at every width, for free. A new full-bleed scroller should get this cap by default; PDP's `productCustomizeSteps` already had it (added 2026-09-02, first confirmed instance) via a separate `desktopScrollerCap` wrapper class, before the same bug was found on the three homepage carousels above.

## Breakpoints and target viewports

Mobile-first. Design fluid with `clamp` so it holds at every width in between, then verify at these exact sizes.

Tailwind breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`

- **Mobile:** 360×800, 375×812, 390×844, 393×873, 412×915, 430×932
- **Tablet:** 768×1024, 810×1080, 820×1180, 834×1194, 1024×1366
- **Desktop:** 1280×720, 1366×768, 1440×900, 1920×1080

All fifteen are checked automatically by `npx playwright test tests/screenshots.spec.ts`.

## Hard rules

- Nothing may scroll horizontally at any viewport.
- Tap targets ≥ 44px. Reading text never below 14px on mobile — small uppercase labels are exempt, so the eyebrow stays at 0.72rem.
- Semantic HTML: `header, nav, main, section, article, footer, h1..h3, ul, button`.
- One `h1` per page, the hero. Sections use `h2`.
- Colour contrast AA. Focus states always visible. Alt text on every image.
- `prefers-reduced-motion` disables reveals. Components with their own animation handle it explicitly — see the marquee override in `app/globals.css`, which stops the ticker at its start frame instead of letting the global rule snap it to the end.
- Optimise images with `next/image`, lazy-load below the fold, keep JS minimal.

## Content rule

**No en dashes or em dashes (– —) anywhere in copy.** Use commas, colons, periods, or "to" for ranges.

## Reading Figma

The tokens on this page are the source of truth for **colour, spacing and radius**. When reading a frame for those: **map every Figma value onto an existing token. Never create a new token value and never hard-code a raw hex or px in a component.** If a Figma value has no matching token, flag it and ask. Use Figma for layout and structure, not for styling values.

**Typography is the one documented exception.** The type scale above is copied from Figma exactly, by explicit owner request (2026-08-22), including its sizes, weights, letter-spacing and the component-to-style pairings Figma's own components specify. This does not extend to colour, spacing or radius — Figma's neutrals and radius scale still differ from ours and are deliberately not adopted; see the decision log in [05-plan.md](05-plan.md).

**Not every text layer in the Figma file uses one of the 13 tokens above.** A specific instance can carry its own local size/weight that doesn't match any named style — the Hero's "Fully Custom Offerings" ticker label (22px/20px, semibold/medium) and its item text (30px medium on mobile) are both like this. When a value is confirmed off-scale:

- **Do not round it to the nearest existing token.** 22px is not "close enough to Body Large (20px)" — it is its own value, and rendering it as 20 is simply wrong, not an acceptable approximation.
- **Do not estimate a size from a box height and a guessed line-height ratio.** Figma auto-layout adds padding that has nothing to do with font metrics; box-height math produced a wrong value (24px) for the same ticker item text that turned out to be 30px. Get the real number — ask the owner directly, or read it via Figma's design-context output — rather than back-solving it.
- **Check whether the token you're about to reach for is fluid before reusing its value at one specific width.** Heading 3 happens to equal 30px/500 at 1440px, but H3 is a fluid token that only reaches 30px there — reusing `text-h3` for a fixed-30px mobile-only requirement rendered ~22px, because H3's mobile anchor is smaller. A confirmed fixed value needs a fixed class, not a fluid token that merely passes through the right number at one width.
- **Record the confirmed value as its own named entry in the recipe file** (`components/ui/styles.ts`), with a comment stating where the number came from and why it doesn't match a token. This keeps every one-off value in the one place standard tokens already live in, instead of scattered inline arbitrary classes.
