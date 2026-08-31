// components/ui/cx.ts
// Joins class names, dropping anything falsy. Replaces the
// `[a, b, className].filter(Boolean).join(" ")` pattern that was copy-pasted
// into eight components.
//
//   cx(button.base, button[variant], isOpen && button.open, className)
//
// No dependency: this is the whole implementation. If conditional-class needs
// ever outgrow it, `clsx` is the drop-in replacement with the same signature.
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
