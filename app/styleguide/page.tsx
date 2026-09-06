// app/styleguide/page.tsx
// The design system on one page. Every colour, type size, spacing step and
// radius from CLAUDE.md section 2, plus a slot for every component and
// homepage section from CLAUDE.md section 4: empty until built, live once it
// is (Button is the first, see components/Button.tsx).
//
// Raw values appear here only where the page's job is to *display* the token
// (swatch fills, spacing bar widths). Everything else uses token utilities.

import { Play } from "lucide-react";
import type { Metadata } from "next";

import { Accordion } from "@/components/Accordion";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { CapabilityCard, Card } from "@/components/Card";
import { CategoryFilters } from "@/components/sections/CategoryFilters";
import { CategoryMetaStrip } from "@/components/sections/CategoryMetaStrip";
import { ClientLogosMobileGrid, ClientLogosMobileMarquee } from "@/components/sections/ClientLogos";
import { Chip } from "@/components/Chip";
import { Eyebrow } from "@/components/Eyebrow";
import { Header } from "@/components/Header";
import { HeaderOverlayNav } from "@/components/HeaderOverlayNav";
import { LogoRow } from "@/components/LogoRow";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { RevealBox } from "@/components/RevealBox";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { RelatedCategories } from "@/components/sections/RelatedCategories";
import { WhatWeCover } from "@/components/sections/WhatWeCover";
import { SectionHeading } from "@/components/SectionHeading";
import { StatBlock } from "@/components/StatBlock";
import { TextReveal } from "@/components/TextReveal";
import { header as headerStyles } from "@/components/ui/styles";
import { leggings } from "@/content/activewear/leggings";
import { home } from "@/content/home";
import { ORGANIZATION } from "@/content/site";

import { BuiltSlot, Slot, SgSection, Spec, StatePreview, TokenName } from "./_parts";
import { IntroLoaderReplayButton } from "./IntroLoaderDemo";
import {
  colorTokens,
  componentSlots,
  radiusTokens,
  sectionSlots,
  spaceTokens,
  typeTokens,
} from "./tokens";

export const metadata: Metadata = {
  title: "Styleguide",
  description: "Capriowear design tokens and component slots.",
};

/**
 * Literal utility classes per colour token, so the swatches prove the Tailwind
 * utilities resolve rather than just painting the hex by hand.
 */
const swatchClass: Record<string, string> = {
  ink: "bg-ink",
  "ink-2": "bg-ink-2",
  paper: "bg-paper",
  "paper-2": "bg-paper-2",
  muted: "bg-muted",
  accent: "bg-accent",
  "accent-ink": "bg-accent-ink",
};

const navItems = [
  { href: "#colour", label: "Colour" },
  { href: "#type", label: "Type" },
  { href: "#spacing", label: "Spacing" },
  { href: "#radii", label: "Radii" },
  { href: "#elevation", label: "Elevation" },
  { href: "#layout", label: "Layout" },
  { href: "#components", label: "Components" },
  { href: "#sections", label: "Sections" },
];

/**
 * Fixture only: the real nav (home.nav.links) has no mega menu, per the real
 * Figma design. This keeps Header's mega-menu path exercised in isolation so
 * the capability stays visibly tested even though nothing real uses it yet.
 */
const megaMenuDemoLinks = [
  home.nav.links[0],
  home.nav.links[1],
  {
    label: "Capabilities",
    href: "/capabilities",
    megaMenu: [
      {
        label: "SERVICES",
        items: [
          { label: "Custom & Private-Label Manufacturing (OEM/ODM)", href: "/capabilities/custom-manufacturing" },
          { label: "Fabrics & Materials", href: "/capabilities/fabrics-materials" },
          { label: "Printing & Branding", href: "/capabilities/printing-branding" },
        ],
      },
      {
        label: "STANDARDS",
        items: [
          { label: "Quality & Compliance", href: "/capabilities/quality-compliance" },
          { label: "Sustainability", href: "/capabilities/sustainability" },
        ],
      },
    ],
  },
  home.nav.links[3],
];

const containerPadding = [
  { at: "Mobile, up to 767", value: "20px" },
  { at: "Tablet, 768 and up", value: "32px" },
  { at: "Desktop, 1280 and up", value: "48px" },
];

const breakpoints = [
  { name: "sm", value: "640px" },
  { name: "md", value: "768px" },
  { name: "lg", value: "1024px" },
  { name: "xl", value: "1280px" },
  { name: "2xl", value: "1536px" },
];

export default function StyleguidePage() {
  return (
    <>
      {/* Sticky wayfinding. Horizontally scrollable on mobile, never the page. */}
      <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
        <div className="container-p flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-button-sm uppercase">Capriowear</span>
            <span className="text-button-sm uppercase text-muted">Styleguide</span>
          </div>
          <nav aria-label="Styleguide sections" className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <ul className="flex w-max items-center gap-1 md:w-auto">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-pill px-3 text-button-sm text-muted transition-colors hover:bg-paper-2 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="container-p pb-24">
        {/* Page intro */}
        <div className="flex flex-col gap-4 py-16 md:py-20">
          <p className="text-overline uppercase text-accent">Phase 1, foundations</p>
          <h1 className="max-w-[18ch] text-display">Design system</h1>
          <p className="max-w-[60ch] text-body-lg text-muted">
            Every token the site is allowed to use, rendered from the theme itself. Tokens live in the
            <TokenName>@theme</TokenName> block of <TokenName>app/globals.css</TokenName>. If a value is not on
            this page, it does not exist in the design system yet.
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="colour"
          index="01"
          title="Colour"
          intro="Eight tokens, plus a dark hairline for use on ink sections. Dark sections run ink for background and paper for text."
        >
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {colorTokens
              .filter((t) => t.kind !== "hairline")
              .map((token) => (
                <li key={token.name} className="overflow-hidden rounded-lg border border-line">
                  <div className={`h-28 w-full ${swatchClass[token.name]}`} aria-hidden="true" />
                  <div className="flex flex-col gap-2 border-t border-line px-4 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <TokenName>{token.name}</TokenName>
                      <Spec>{token.value}</Spec>
                    </div>
                    <p className="text-button-sm text-muted">{token.use}</p>
                    <Spec>{token.utility}</Spec>
                  </div>
                </li>
              ))}
          </ul>

          {/* Hairlines are borders, not fills, so they get their own preview. */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {colorTokens
              .filter((t) => t.kind === "hairline")
              .map((token) => (
                <div
                  key={token.name}
                  className={`rounded-lg border px-4 py-6 ${
                    token.onDark ? "border-line-dark bg-ink" : "border-line bg-paper"
                  }`}
                >
                  <div
                    className={`mb-4 border-t ${token.onDark ? "border-line-dark" : "border-line"}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`rounded-sm px-2 py-1 text-button-sm ${
                        token.onDark ? "bg-ink-2 text-paper" : "bg-paper-2 text-ink"
                      }`}
                    >
                      {token.name}
                    </span>
                    <span
                      className={`text-button-sm ${
                        token.onDark ? "text-paper/60" : "text-muted"
                      }`}
                    >
                      {token.value}
                    </span>
                  </div>
                  <p className={`mt-2 text-button-sm ${token.onDark ? "text-paper/70" : "text-muted"}`}>
                    {token.use}
                  </p>
                </div>
              ))}
          </div>

          {/* Combination check: how the tokens sit together on a dark band. */}
          <div className="mt-4 rounded-lg border border-line-dark bg-ink px-6 py-10">
            <p className="text-overline uppercase text-accent">Dark section check</p>
            <p className="mt-3 max-w-[46ch] text-h2 text-paper">Ink background, paper text, accent label.</p>
            <div className="mt-6 border-t border-line-dark pt-6">
              <span className="inline-flex min-h-11 items-center rounded-pill bg-accent px-6 text-body font-medium text-accent-ink">
                Accent on ink
              </span>
            </div>
          </div>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="type"
          index="02"
          title="Typography"
          intro="The thirteen text styles from the Figma design system, read straight from the file. Sizes, weights and line heights are Figma's exactly, and letter spacing is zero on every style. The large styles scale down below 1440px; everything 24px and under is fixed, so it matches Figma at every width."
        >
          <ul className="flex flex-col">
            {typeTokens.map((token) => (
              <li
                key={token.name}
                className="grid grid-cols-1 gap-4 border-b border-line py-8 first:pt-0 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-8"
              >
                <p className={`${token.utility} ${token.sampleClass ?? ""} min-w-0`}>{token.sample}</p>
                <div className="flex flex-col gap-1 lg:pt-2">
                  <TokenName>{token.utility.split(" ")[0]}</TokenName>
                  <Spec>Figma: {token.figmaName}</Spec>
                  <Spec>size {token.size}</Spec>
                  <Spec>line {token.leading}</Spec>
                  <Spec>tracking {token.tracking}</Spec>
                  <Spec>weight {token.weight}</Spec>
                  <p className="mt-1 text-button-sm text-muted">{token.use}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { w: "font-normal", n: "400 Regular" },
              { w: "font-medium", n: "500 Medium" },
              { w: "font-semibold", n: "600 Semibold" },
              { w: "font-bold", n: "700 Bold" },
            ].map((item) => (
              <div key={item.w} className="rounded-lg border border-line px-4 py-3">
                <p className={`${item.w} text-h3`}>Capriowear</p>
                <Spec>{item.n}</Spec>
              </div>
            ))}
          </div>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="spacing"
          index="03"
          title="Spacing"
          intro="A 4px base scale. Section vertical rhythm is 64 mobile, 96 tablet, 120 desktop, available as one fluid step."
        >
          <ul className="flex flex-col gap-3">
            {spaceTokens.map((token) => (
              <li
                key={token.px}
                className="flex flex-col gap-2 border-b border-line pb-3 sm:flex-row sm:items-center sm:gap-4"
              >
                {/* Labels share a row with the bar from sm up, stack below it on mobile
                    so the 160px step still renders at full length at 360w. */}
                <span className="flex items-center gap-3 sm:contents">
                  <span className="w-14 shrink-0 text-button-sm tabular-nums text-ink">{token.px}px</span>
                  <span className="w-24 shrink-0">
                    <TokenName>p-{token.utility}</TokenName>
                  </span>
                </span>
                {/* Fixed 160px track keeps every bar measured from the same zero,
                    and keeps the use labels in one column. Square ends, so the
                    4px step still reads as a length rather than a dot. */}
                <span className="w-full shrink-0 sm:w-40">
                  {/* Raw px here is the point: the bar *is* the token. */}
                  <span
                    className="block h-4 max-w-full bg-accent"
                    style={{ width: `${token.px}px` }}
                    aria-hidden="true"
                  />
                </span>
                {token.use ? <span className="hidden text-button-sm text-muted sm:inline">{token.use}</span> : null}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg border border-line bg-paper-2 p-6">
            <TokenName>py-section</TokenName>
            <p className="mt-3 text-button-sm text-muted">
              clamp(64px, 8vw, 120px). One utility for the section rhythm at every breakpoint. The band below
              renders it live, so it grows as you widen the window.
            </p>
            <div className="mt-4 rounded-md border border-line bg-paper py-section text-center">
              <Spec>section padding, top and bottom</Spec>
            </div>
          </div>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="radii"
          index="04"
          title="Radii"
          intro="Buttons are pill, cards are lg, media is lg to xl. Nothing else."
        >
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {radiusTokens.map((token) => (
              <li key={token.name} className="flex flex-col gap-3">
                <div
                  className={`flex h-28 items-center justify-center border border-line bg-paper-2 ${token.utility}`}
                  aria-hidden="true"
                >
                  <span className="text-button-sm uppercase text-muted">{token.name}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <TokenName>{token.utility}</TokenName>
                  <Spec>{token.value}</Spec>
                  <p className="text-button-sm text-muted">{token.use}</p>
                </div>
              </li>
            ))}
          </ul>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="elevation"
          index="05"
          title="Elevation"
          intro="Minimal and premium. A card lift on hover, nothing heavier. Flat is the default state."
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-paper p-6">
              <p className="text-h3">Rest</p>
              <Spec>no shadow, hairline border only</Spec>
            </div>
            <div className="rounded-lg border border-line bg-paper p-6 shadow-card transition-shadow">
              <p className="text-h3">Hover</p>
              <Spec>shadow-card</Spec>
            </div>
          </div>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="layout"
          index="06"
          title="Layout"
          intro="Content caps at 1440 and centres. Full-bleed backgrounds still run edge to edge. Twelve columns for layout maths."
        >
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-lg border border-line p-6">
              <p className="text-h3">Container</p>
              <p className="mt-2 text-button-sm text-muted">
                <TokenName>.container-p</TokenName> centres, caps at{" "}
                <TokenName>max-w-page</TokenName> and applies the responsive inline padding below.
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {containerPadding.map((row) => (
                  <li key={row.at} className="flex justify-between border-b border-line pb-2">
                    <span className="text-button-sm text-muted">{row.at}</span>
                    <Spec>{row.value}</Spec>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-line p-6">
              <p className="text-h3">Breakpoints</p>
              <p className="mt-2 text-button-sm text-muted">Mobile first. Verified at the exact viewports in CLAUDE.md section 3.</p>
              <ul className="mt-4 flex flex-col gap-2">
                {breakpoints.map((bp) => (
                  <li key={bp.name} className="flex justify-between border-b border-line pb-2">
                    <TokenName>{bp.name}</TokenName>
                    <Spec>{bp.value}</Spec>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 rounded-lg border border-line p-6">
            <p className="text-h3">12 column grid</p>
            <p className="mt-2 text-button-sm text-muted">Gaps: 16 mobile, 24 tablet, 32 desktop.</p>
            <div className="mt-4 grid grid-cols-12 gap-4 md:gap-6 xl:gap-8">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="flex h-16 items-center justify-center rounded-sm bg-paper-2 text-button-sm tabular-nums text-muted"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="components"
          index="07"
          title="Components"
          intro="Every atom and molecule from CLAUDE.md section 4. Button, SectionHeading, Card and StatBlock are built and live below; the rest are empty slots Phase 2 fills in place, so this page doubles as the isolated QA surface."
        >
          {/* Button, live. Two variants (primary solid accent, secondary outline)
              across default, hover, focus and disabled. Hover and focus are
              rendered as static previews of the same underlying utility classes,
              since a true :hover/:focus-visible state cannot be frozen for a
              screenshot; try the real buttons with a mouse or Tab key to confirm
              the live states match. */}
          <BuiltSlot
            name="Button"
            note="Primary is bg-accent / text-accent-ink. Secondary is border-current / text-current, so it inherits ambient text colour and needs no separate dark-section variant. Every state keeps the min-h-11 (44px) tap target from CLAUDE.md section 3."
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {(
                [
                  { variant: "primary" as const, label: home.hero.ctaPrimary.label },
                  { variant: "secondary" as const, label: home.hero.ctaSecondary.label },
                ]
              ).map(({ variant, label }) => (
                <div key={variant} className="flex flex-col gap-4">
                  <p className="text-button-sm uppercase text-muted">{variant}</p>
                  <div className="flex flex-col gap-4 rounded-md border border-line bg-paper-2 p-4">
                    <StatePreview label="Default">
                      <Button variant={variant} href="#components">
                        {label}
                      </Button>
                    </StatePreview>
                    <StatePreview label="Hover">
                      <Button
                        variant={variant}
                        href="#components"
                        className={variant === "primary" ? "opacity-90" : "bg-current/10"}
                      >
                        {label}
                      </Button>
                    </StatePreview>
                    <StatePreview label="Focus">
                      <Button
                        variant={variant}
                        href="#components"
                        className="outline-2 outline-accent outline-offset-2"
                      >
                        {label}
                      </Button>
                    </StatePreview>
                    <StatePreview label="Disabled">
                      <Button variant={variant} disabled>
                        {label}
                      </Button>
                    </StatePreview>
                  </div>
                </div>
              ))}
            </div>

            {/* Same secondary button, on an ink section, with no extra prop:
                border-current and text-current pick up text-paper from the
                ambient dark-section text colour automatically. */}
            <div className="rounded-md bg-ink p-6">
              <p className="mb-4 text-button-sm uppercase text-paper/60">On a dark section, no extra prop</p>
              <div className="flex flex-wrap gap-4 text-paper">
                <Button variant="primary" href="#components">
                  {home.hero.ctaPrimary.label}
                </Button>
                <Button variant="secondary" href="#components">
                  {home.hero.ctaSecondary.label}
                </Button>
              </div>
            </div>
          </BuiltSlot>

          {/* SectionHeading, live. Eyebrow plus H2, no intro line: the copy rule
              for this component is exactly those two inputs. The heading sets no
              text colour of its own, so the dark-section example below proves it
              inherits text-paper with no extra prop, the same pattern as
              Button's secondary variant above. The eyebrow's colour is a
              required eyebrowTone prop instead: #ABB5C0 on dark, #17191E on
              light, a standing sitewide rule (owner call, 2026-08-24), so
              there's no default to silently get wrong. */}
          <BuiltSlot
            name="SectionHeading"
            note="eyebrowTone is required: 'light' (#17191E) or 'dark' (#ABB5C0). The H2 has no colour of its own, so it inherits ambient text colour, text-ink by default or text-paper inside a dark section."
          >
            <SectionHeading
              eyebrow={home.whatWeMake.eyebrow}
              heading={home.whatWeMake.h2}
              eyebrowTone="light"
            />

            <div className="rounded-md bg-ink p-6 text-paper">
              <p className="mb-4 text-button-sm uppercase text-paper/60">
                On a dark section, eyebrowTone=&quot;dark&quot;
              </p>
              <SectionHeading
                eyebrow={home.insideFactory.eyebrow}
                heading={home.insideFactory.h2}
                eyebrowTone="dark"
              />
            </div>
          </BuiltSlot>

          {/* Card, live. Both variants share CardMedia (see components/Card.tsx):
              with no image prop it renders a fixed-size grey placeholder box,
              the same size across every instance regardless of which content
              feeds it. Passing an image later swaps it in with no rebuild. */}
          <BuiltSlot
            name="Card"
            note="Category is image plus label, a link, aspect-square. Capability is image, title, body, not a link, aspect-video (measured from the Our Services wireframe). Neither has a real image yet, so CardMedia renders the grey placeholder; passing image swaps it in automatically."
          >
            <div className="flex flex-col gap-3">
              <p className="text-button-sm uppercase text-muted">Category</p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {home.whatWeMake.categories[0].tiles.slice(0, 4).map((tile) => (
                  <Card key={tile.href} label={tile.label} href={tile.href} />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-button-sm uppercase text-muted">Capability</p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {home.services.items.slice(0, 4).map((item) => (
                  <CapabilityCard key={item.title} title={item.title} body={item.body} />
                ))}
              </div>
              {/* Same component and same fixed size, fed by a second, unrelated
                  content source, to prove it is genuinely reusable. Was fed by
                  trustStrip until that content grew a rich-text body shape for
                  the real Trust Signals section -- see
                  components/sections/TrustSignals.tsx. */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {home.howItWorks.steps.slice(0, 4).map((step) => (
                  <CapabilityCard key={step.title} title={step.title} body={step.body} />
                ))}
              </div>
            </div>
          </BuiltSlot>

          {/* StatBlock, live. Hardcodes text-paper since CLAUDE.md documents
              its only use as the dark Stats band, so the demo is shown on an
              ink strip to match how it will actually render. */}
          <BuiltSlot
            name="StatBlock"
            note="Value is text-h2 at text-paper, caption is text-paper at 70% opacity. Built for the dark Stats band only, so it does not adapt to light sections."
          >
            <div className="grid grid-cols-1 gap-8 rounded-md bg-ink p-6 sm:grid-cols-3">
              {home.stats.map((stat) => (
                <StatBlock key={stat.value} value={stat.value} caption={stat.caption} />
              ))}
            </div>
          </BuiltSlot>

          {/* Eyebrow, live. SectionHeading already renders one internally; this
              is for the standalone labels (logo row, ticker labels), plus the
              dark/light tone demo -- tone is required, not defaulted, since
              #ABB5C0/#17191E is a standing sitewide rule (owner call,
              2026-08-24) with no fallback to guess from. */}
          <BuiltSlot
            name="Eyebrow"
            note="0.72rem, uppercase, 0.16em tracking. tone is required: 'light' (#17191E) or 'dark' (#ABB5C0) for a label paired with a heading, 'muted' (currentColor at 60%) for a standalone label."
          >
            <div className="flex flex-col gap-4">
              <Eyebrow tone="light">{home.whatWeMake.eyebrow}</Eyebrow>
              <Eyebrow tone="muted">A standalone label, e.g. above a logo row</Eyebrow>
            </div>

            <div className="flex flex-col gap-4 rounded-md bg-ink p-6 text-paper">
              <p className="text-button-sm uppercase text-paper/60">On a dark section, tone=&quot;dark&quot;</p>
              <Eyebrow tone="dark">{home.certified.eyebrow}</Eyebrow>
              <Eyebrow tone="muted">{home.complianceTicker.title}</Eyebrow>
            </div>
          </BuiltSlot>

          {/* Chip, live. Static label, link and button forms; the interactive
              forms carry the 44px tap target, the static label does not. */}
          <BuiltSlot
            name="Chip / Tag"
            note="Pill radius per the radii table. Outline styles use currentColor, so the same chip reads on light and dark with no on-dark prop. Active is filled accent."
          >
            <div className="flex flex-col gap-3">
              <p className="text-button-sm uppercase text-muted">Default and active</p>
              <ul className="flex flex-wrap gap-2">
                {home.whatWeMake.categories[0].tiles.slice(0, 5).map((tile, i) => (
                  <li key={tile.href}>
                    <Chip href={tile.href} active={i === 0}>
                      {tile.label}
                    </Chip>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-button-sm uppercase text-muted">Static label, no tap target</p>
              <ul className="flex flex-wrap gap-2">
                {home.customOfferings.items.slice(0, 5).map((item) => (
                  <li key={item}>
                    <Chip>{item}</Chip>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 rounded-md bg-ink p-6 text-paper">
              {home.customOfferings.items.slice(0, 4).map((item, i) => (
                <Chip key={item} href="#components" active={i === 0}>
                  {item}
                </Chip>
              ))}
            </div>
          </BuiltSlot>

          {/* MediaPlaceholder, live. The shared media primitive: pass an image
              later and the same box renders next/image in place. */}
          <BuiltSlot
            name="MediaPlaceholder"
            note="Three ratios, matching the wireframe: 16:9 hero video and service tiles, 4:5 portrait product shots, 1:1 category tiles. Radius lg or xl per the radii table. The dark tone is for ink sections."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <MediaPlaceholder label="16:9" ratio="16:9" />
              <MediaPlaceholder label="4:5" ratio="4:5" />
              <MediaPlaceholder label="1:1" ratio="1:1" />
            </div>

            <div className="rounded-md bg-ink p-6">
              <p className="mb-4 text-button-sm uppercase text-paper/60">Dark tone, xl radius, with overlay</p>
              <MediaPlaceholder
                label={home.hero.media.label}
                ratio="16:9"
                radius="xl"
                tone="dark"
                overlay={
                  <span className="inline-flex size-16 items-center justify-center rounded-pill bg-accent text-accent-ink">
                    <Play className="size-6" aria-hidden="true" />
                  </span>
                }
              />
            </div>
          </BuiltSlot>

          {/* LogoRow, live. No logo files yet, so each item falls back to a
              labelled outline box of the same size. */}
          <BuiltSlot
            name="LogoRow"
            note="Wraps and centres at every width. Brand logos render greyscale and come to colour on hover; certification badges are meaningful marks, so greyscale is off for them."
          >
            <LogoRow
              label="Producing for brands worldwide"
              logos={home.brandLogos.itemsDesktop.slice(0, 5).map((name) => ({ name }))}
            />

            <LogoRow
              greyscale={false}
              logos={home.certified.logos.map((logo) => ({ name: logo.name }))}
            />
          </BuiltSlot>

          {/* Marquee, live. Server component, no client JS: the track holds the
              item list twice and travels exactly -50%, so the loop is seamless
              at any content width. Pause on hover and focus is CSS. */}
          <BuiltSlot
            name="Marquee"
            note="Pauses on hover and on focus-within, so a keyboard user can read a moving item. Under prefers-reduced-motion it stops at its start frame and becomes a normal scrollable strip. The visible track is aria-hidden and the items are exposed once to assistive tech."
          >
            {/* Negative inset cancels the slot padding, so the ticker is shown
                edge to edge the way it renders on the page. */}
            <div className="-mx-4">
              <Marquee label={home.customOfferings.label} items={home.customOfferings.items} />
            </div>
            <div className="-mx-4">
              <Marquee
                tone="dark"
                label={home.complianceTicker.title}
                items={home.complianceTicker.items}
                durationSeconds={55}
              />
            </div>
          </BuiltSlot>

          {/* Accordion, live. Real buttons inside h3, so Tab, Enter and Space
              work with no key handling of our own. */}
          <BuiltSlot
            name="Accordion"
            note="One open at a time, aria-expanded on the trigger, aria-controls to the panel. Panels stay mounted and use the hidden attribute, so find-on-page does not match text inside a collapsed answer."
          >
            <Accordion items={home.faq.items.map((f) => ({ question: f.q, answer: f.a }))} defaultOpen={0} />

            <div className="rounded-md bg-ink p-6 text-paper">
              <p className="mb-4 text-button-sm uppercase text-paper/60">On a dark section, no extra prop</p>
              <Accordion items={home.faq.items.slice(0, 3).map((f) => ({ question: f.q, answer: f.a }))} />
            </div>
          </BuiltSlot>

          {/* Header and MobileNav, live. The preview box clips the header's
              sticky positioning so it does not fight the styleguide's own
              sticky header; on a real page it sticks to the viewport. The box
              is tall enough to show an open mega menu, since the same clipping
              would otherwise cut the panel off. The drawer is portalled to
              document.body, so it is not clipped by this box at all: open it
              with the menu button below 1024. */}
          <BuiltSlot
            name="Header + MobileNav"
            note="Real usage (Figma node 316:1331): the CAPRIO logo, four plain links, no mega menu. Below it, the same component with mega-menu content, to keep that capability exercised even though nothing in the real nav currently uses it. The drawer traps focus, closes on Escape and returns focus to the menu button."
          >
            <div className="flex flex-col gap-3">
              <p className="text-button-sm uppercase text-muted">Real usage: logo, plain links</p>
              <div className="relative overflow-hidden rounded-md border border-line">
                <Header
                  brand={home.nav.brand}
                  logo={<Logo stacked className={headerStyles.brandLogo} />}
                  desktopLogo={<Logo stacked className={headerStyles.brandLogoDesktop} />}
                  links={home.nav.links}
                  mobileLinks={home.nav.mobileLinks}
                  megaMenuPromo={home.nav.megaMenuPromo}
                  contact={home.nav.contact}
                  social={ORGANIZATION.sameAs}
                  cta={home.nav.cta}
                  secondaryCta={home.nav.secondaryCta}
                />
                <div className="h-80 bg-paper-2" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-button-sm uppercase text-muted">
                Text-brand fallback, with mega-menu links (unused by real content, still built and tested)
              </p>
              <div className="relative overflow-hidden rounded-md border border-line">
                <Header
                  brand={home.nav.brand}
                  brandParent={home.nav.brandParent}
                  links={megaMenuDemoLinks}
                  mobileLinks={home.nav.mobileLinks}
                  megaMenuPromo={home.nav.megaMenuPromo}
                  contact={home.nav.contact}
                  social={ORGANIZATION.sameAs}
                  cta={home.nav.cta}
                  secondaryCta={home.nav.secondaryCta}
                />
                <div className="h-80 bg-paper-2" />
              </div>
            </div>
          </BuiltSlot>

          {/* Dense flow lets the narrow slots backfill around the full-width ones,
              so no row is left half empty. */}
          <div className="mt-4 grid grid-flow-row-dense grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {componentSlots.map((slot) => (
              <div key={slot.name} className={slot.span === "full" ? "md:col-span-2 xl:col-span-3" : undefined}>
                <Slot
                  name={slot.name}
                  note={slot.note}
                  variants={slot.variants}
                  minHeight={slot.span === "full" ? "min-h-32" : "min-h-40"}
                />
              </div>
            ))}
          </div>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="sections"
          index="08"
          title="Homepage sections"
          intro="The fifteen homepage sections in wireframe order, each an empty slot. Composed from the components above, never one-off markup."
        >
          <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectionSlots.map((section, i) => (
              <li
                key={section.name}
                className="flex min-h-28 flex-col justify-between gap-3 rounded-lg border border-dashed border-line bg-paper-2 px-4 py-4"
              >
                <div className="flex items-start gap-3">
                  <span className="text-button-sm tabular-nums text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-h3">{section.name}</span>
                </div>
                <Spec>{section.note}</Spec>
              </li>
            ))}
          </ol>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="client-logos-mobile-alt"
          index="09"
          title="Client Logos — mobile alternative"
          intro="Title + scrolling Marquee is the live homepage mobile treatment as of 2026-08-26, replacing the earlier static grid. The grid is kept here, styleguide-only, for reference/comparison -- it no longer renders on the real page. Logo sizing is identical in both -- only the layout differs. Both forced to a fixed mobile width here so the comparison holds regardless of your browser's actual width."
        >
          <div className="flex flex-col gap-8 xl:flex-row">
            <div className="flex flex-col gap-3">
              <p className="text-button-sm uppercase text-muted">Live: title + marquee</p>
              <div className="mx-auto w-[390px] max-w-full overflow-hidden rounded-md border border-line bg-paper">
                <ClientLogosMobileMarquee brandLogos={home.brandLogos} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-button-sm uppercase text-muted">Archived: static grid</p>
              <div className="mx-auto w-[390px] max-w-full overflow-hidden rounded-md border border-line bg-paper">
                <ClientLogosMobileGrid brandLogos={home.brandLogos} />
              </div>
            </div>
          </div>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="header-overlay-nav"
          index="10"
          title="Header — full-screen overlay nav (exploratory)"
          intro="Owner reference, 2026-08-27: afternow.co/services/ -- a small always-visible toggle opens a full-screen nav panel, instead of Header's own mega-menu/drawer split. No Figma design exists for this; it isn't wired into the real page, Header.tsx is untouched. Real nav content and real social links, this project's own type scale and colours throughout. Click the menu icon below to try it -- Escape or the icon again closes it."
        >
          <div className="relative overflow-hidden rounded-md border border-line">
            <HeaderOverlayNav
              brand={home.nav.brand}
              logo={<Logo stacked className={headerStyles.brandLogo} />}
              links={home.nav.links}
              cta={home.nav.cta}
              secondaryCta={home.nav.secondaryCta}
              social={ORGANIZATION.sameAs}
            />
            <div className="h-80 bg-paper-2" />
          </div>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="text-reveal"
          index="11"
          title="TextReveal — word-by-word entrance"
          intro="Owner reference, 2026-08-27: afternow.co/services/ -- each word slides up from behind an overflow-hidden mask, staggered, the first time it scrolls into view (corrected 2026-08-27 from an earlier play-on-mount version, which finished invisibly for anything below the fold before a reader ever scrolled to it). Masked per WORD here, not per rendered line like the reference (which needs JS to re-measure line breaks on resize) -- same visual language, no resize edge case. This example is already in view, so reload the page to see it trigger. Used live on Hero's H1 and five other sections' eyebrow + title."
        >
          <TextReveal as="p" text="Custom OEM & ODM activewear & teamwear manufacturer" className="text-h2" />
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="reveal-box"
          index="12"
          title="RevealBox — media entrance"
          intro="Owner reference, 2026-08-27: cuberto.com's own hero video reveal -- a box animates in from a smaller, inward clip-path inset (not a plain fade) to its full size, the first time it scrolls into view. Shares its trigger with TextReveal via the same useRevealOnView hook. Used live on Hero's video block. This is a one-shot reveal; reload the page to see it trigger again."
        >
          <RevealBox className="mx-auto max-w-md">
            <MediaPlaceholder label="Reveal demo" ratio="16:9" radius="none" />
          </RevealBox>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="intro-loader"
          index="14"
          title="IntroLoader — homepage entrance"
          intro="Owner request, 2026-08-27: a one-time wordmark wipe-in on first landing on the homepage, never on a reload or an internal page-to-page navigation. Gated on two independent signals (not sessionStorage alone -- see lib/pageEntry.ts), so it can't be faked from inside this page: the button below clears the session flag and does a real browser navigation to '/', the same as typing the URL fresh."
        >
          <IntroLoaderReplayButton />
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="breadcrumb"
          index="15"
          title="Breadcrumb — page trail"
          intro="Figma node 406:3078, 2026-08-27. Foundational component built ahead of the inner pages that will use it -- category/product pages aren't built yet. The visible counterpart to lib/schema.ts's breadcrumbSchema(), same {label, href} shape. Every item but the last is a real link, muted grey, hover to full contrast; the last is the current page, bold and dark, not a link."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Activewear", href: "/activewear" },
              { label: "Leggings", href: "/activewear/leggings" },
            ]}
          />
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="category-filters"
          index="16"
          title="CategoryFilters — PLP category accordion"
          intro="Figma node 406:3085, 2026-08-28. Reads content/home.ts's own activewearMegaMenu directly -- the exact same 5 groups the mega menu already renders, never a second copy of the category list. The group containing activeSlug starts expanded (its item in accent orange); every other group is a collapsed, clickable row. Live on /activewear/leggings, below CategoryBanner."
        >
          <CategoryFilters activeSlug="leggings" />
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="category-meta-strip"
          index="17"
          title="CategoryMetaStrip — PLP title and gender filter chips"
          intro="Figma node 557:3422, 2026-08-28, split out of ProductGrid 2026-08-29 -- Figma has this row as a full-width sibling above the filters+grid row, not scoped to the grid's own column. Filter chips (All/Women/Men) are static for now, no real product data to filter by yet."
        >
          <CategoryMetaStrip
            categoryLabel={leggings.menuLabel}
            categorySubline={leggings.gridSubline}
            categorySublineMobile={leggings.gridSublineMobile}
          />
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="product-grid"
          index="18"
          title="ProductGrid — PLP tiles and pagination"
          intro="Figma node 406:3137, 2026-08-28. Real pagination over the category's own real styleCards (9 today, 3 per page) -- not Figma's own placeholder '1 2 3 ... 39'."
        >
          <ProductGrid cards={leggings.styleCards} />
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="what-we-cover"
          index="19"
          title="WhatWeCover — PLP coverage grid"
          intro="Figma node 579:5580, 2026-08-29. Centred eyebrow + H1-style heading over a 6-item grid (Fabric, Color and print, Style and fit, Branding, Labels, Packaging), each its own title + one-line body with a bottom border. Same bespoke 1164px column as its sibling section FabricOptions, built the same session. Desktop only for now, no mobile Figma frame exists yet -- wrapped in its own horizontal scroller here so this demo's fixed 1440px minimum width can't push the styleguide page itself into overflow at a narrow viewport, the standing rule for any wide, non-responsive content on this page."
        >
          <div className="overflow-x-auto">
            <WhatWeCover
              eyebrow={leggings.coverageEyebrow}
              heading={leggings.coverageHeading}
              items={leggings.coverageItems}
            />
          </div>
        </SgSection>

        {/* ------------------------------------------------------------------ */}
        <SgSection
          id="related-categories"
          index="20"
          title="RelatedCategories — PLP internal linking row"
          intro="No Figma frame -- SEO/AEO rule 6 (docs/06-seo.md): links to sibling Activewear sub-categories from real body copy, not just the nav. Built plain, from existing tokens/Button rather than an invented visual design."
        >
          <RelatedCategories links={leggings.relatedLinks} />
        </SgSection>
      </main>
    </>
  );
}
