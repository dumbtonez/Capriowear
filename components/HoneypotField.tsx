// components/HoneypotField.tsx
// Shared hidden field for both public forms -- see lib/honeypot.ts for the
// field name and the server-side check. `sr-only` (this project's existing
// visually-hidden-but-accessible utility, components/ui/styles.ts), not
// `type="hidden"` or `display:none` -- a real user, sighted or on a screen
// reader, must never be able to fill this in (hence `tabIndex={-1}` +
// `aria-hidden`, removing it from both the tab order and the accessibility
// tree), but plenty of basic scrapers specifically skip inputs that are
// `display:none`/`type="hidden"` while still filling anything else they
// find in the DOM -- `sr-only`'s clip-based technique looks like an
// ordinary field to that kind of check.
import { HONEYPOT_FIELD_NAME } from "@/lib/honeypot";

export function HoneypotField() {
  return (
    <div className="sr-only" aria-hidden="true">
      <label htmlFor={HONEYPOT_FIELD_NAME}>Company website</label>
      <input id={HONEYPOT_FIELD_NAME} name={HONEYPOT_FIELD_NAME} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
