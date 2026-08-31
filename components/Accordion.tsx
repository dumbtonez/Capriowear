"use client";

// components/Accordion.tsx
// FAQ accordion: keyboard operable, one open at a time, aria-expanded on the
// trigger.
//
// Built on real <button> triggers rather than <details>, because "one open at a
// time" needs shared state and because <details> gives no control over the
// animated open state. Each trigger is a button inside an h3, the standard
// disclosure pattern: buttons are keyboard operable natively (Enter, Space,
// Tab), so no key handling of our own is needed, and the global :focus-visible
// rule gives the visible focus ring.
//
// The panel always stays mounted (never `display:none`) so its open/close
// can animate via a grid-rows transition (0fr/1fr) instead of an instant
// snap -- `aria-hidden` is what keeps a collapsed answer out of screen
// readers, since `hidden` can't coexist with a CSS transition.
import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";

import { cx } from "./ui/cx";
import { accordion } from "./ui/styles";

export type AccordionItem = {
  question: string;
  answer: string;
};

export type AccordionProps = {
  items: AccordionItem[];
  /** Index open on first render. Omit to start fully collapsed. */
  defaultOpen?: number;
  className?: string;
};

export function Accordion({ items, defaultOpen, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);
  const baseId = useId();

  return (
    <div className={cx(accordion.root, className)}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={item.question} className={accordion.item}>
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={accordion.trigger}
              >
                <span className={accordion.question}>{item.question}</span>
                {isOpen ? (
                  <Minus className={accordion.icon} aria-hidden="true" />
                ) : (
                  <Plus className={accordion.icon} aria-hidden="true" />
                )}
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={cx(accordion.panel, isOpen ? accordion.panelOpen : accordion.panelClosed)}
            >
              <div className={accordion.panelInner}>
                <p className={accordion.answer}>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
