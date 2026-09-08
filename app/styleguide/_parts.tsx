// app/styleguide/_parts.tsx
// Presentational helpers used only by /styleguide. These are QA scaffolding, not
// site components. Real site components live in /components and are imported
// here for isolated QA, per CLAUDE.md section 4.

import type { ReactNode } from "react";

/** One documented block of the styleguide. */
export function SgSection({
  id,
  index,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line py-16 md:py-20">
      <div className="mb-10 flex flex-col gap-3 md:mb-12">
        <p className="text-overline uppercase text-accent">
          <span className="text-muted">{index}</span> {title}
        </p>
        <h2 id={`${id}-title`} className="text-h2">
          {title}
        </h2>
        {intro ? <p className="max-w-[60ch] text-body-lg text-muted">{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}

/** Small monospace-feel spec line. Figtree only, so tracking does the work. */
export function Spec({ children }: { children: ReactNode }) {
  return <span className="text-button-sm tabular-nums text-muted">{children}</span>;
}

/** The token name, shown the way you would type it in a class. */
export function TokenName({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm bg-paper-2 px-2 py-1 text-button-sm text-text">
      {children}
    </span>
  );
}

/**
 * An empty, labelled placeholder for a component that has not been built yet.
 * Phase 1 ships the slots. Phase 2 fills them.
 */
export function Slot({
  name,
  note,
  variants,
  minHeight = "min-h-40",
}: {
  name: string;
  note: string;
  variants?: string[];
  minHeight?: string;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <h3 className="text-h3">{name}</h3>
        <span className="rounded-pill border border-line px-3 py-1 text-button-sm uppercase text-muted">
          Not built
        </span>
      </div>

      {/* The empty slot itself. This is where the component will render. */}
      <div
        className={`flex flex-1 items-center justify-center bg-paper-2 px-4 py-8 ${minHeight}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent 0 10px, rgba(18,19,23,0.035) 10px 11px)",
        }}
      >
        <span className="text-button-sm uppercase text-muted">{name} slot</span>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4">
        <p className="text-button-sm text-muted">{note}</p>
        {variants?.length ? (
          <ul className="flex flex-wrap gap-2">
            {variants.map((v) => (
              <li
                key={v}
                className="rounded-pill border border-line px-3 py-1 text-button-sm text-muted"
              >
                {v}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}

/**
 * Same header/footer shell as `Slot`, but for a component that has been built.
 * The body renders the real, live component instead of a placeholder.
 */
export function BuiltSlot({
  name,
  note,
  children,
}: {
  name: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <h3 className="text-h3">{name}</h3>
        <span className="rounded-pill bg-accent px-3 py-1 text-button-sm uppercase text-accent-ink">
          Built
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-4 py-6">{children}</div>

      <div className="border-t border-line px-4 py-4">
        <p className="text-button-sm text-muted">{note}</p>
      </div>
    </article>
  );
}

/** One labelled state preview inside a BuiltSlot, e.g. "Default", "Disabled". */
export function StatePreview({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <span className="w-28 shrink-0 text-button-sm text-muted">{label}</span>
      {children}
    </div>
  );
}
