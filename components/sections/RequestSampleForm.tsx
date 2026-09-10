"use client";

// components/sections/RequestSampleForm.tsx
// /request-a-sample page, section 2. The page's entire payoff (doc,
// 2026-09-10) -- everything else on this page supports this form, nothing
// competes with it. No form component precedent exists anywhere on this
// site yet, so every field here is plain, built-fresh markup styled via
// `requestSampleForm` (components/ui/styles.ts) rather than a copy of a
// component that doesn't exist.
//
// Submits as multipart FormData (not JSON) to app/api/request-sample/
// route.ts, so the optional file attachment travels as a real upload in
// the same request, not a second call. Client-side validation covers
// required fields + email format for immediate feedback; the API route
// re-validates server-side too, since client validation is never trusted
// alone.
//
// Success/error render inline in place of the form (doc: no redirect,
// deliberately not a page-level redirect either -- owner, 2026-09-10:
// keeps the confirmation readable and the hero/FAQ still browsable, the
// standard pattern for a B2B lead-gen form). The success state's entrance
// animation is plain CSS (.form-success-icon/.form-success-check/
// .form-success-message in app/globals.css), not Framer Motion -- that
// library isn't installed anywhere on this site, and the project's own
// established entrance-animation mechanism (TextReveal/RevealBox, both CSS-
// driven) already achieves the same effect with zero new dependencies: the
// circle pops in with a deliberate overshoot, the checkmark draws itself
// in via a real inline SVG path (not lucide's icon component, which
// doesn't expose its path for a stroke-dasharray animation), then the
// message follows. Respects prefers-reduced-motion via the same sitewide
// global rule those two components already rely on (app/globals.css), no
// component-level check needed.
import { Paperclip, X } from "lucide-react";
import type { FormEvent, MouseEvent } from "react";
import { useId, useRef, useState } from "react";

import { cx } from "@/components/ui/cx";
import { requestSampleForm as requestSample } from "@/components/ui/styles";
import type { requestASample } from "@/content/request-a-sample";
import { appendLeadContext } from "@/lib/clientLeadContext";

export type RequestSampleFormProps = {
  content: typeof requestASample.form;
};

type FieldKey = "name" | "email" | "company" | "interest" | "project" | "file";
type FieldErrors = Partial<Record<FieldKey, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 10 * 1024 * 1024;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Top-to-bottom field order, so "jump to the first missing field" (owner,
// 2026-09-10: "you should slide them up to the field that is missing")
// always lands on whichever one the visitor would reach first while
// reading down the form, not just whichever key happens to be first in
// the errors object.
const FIELD_ORDER: FieldKey[] = ["name", "email", "company", "interest", "project", "file"];

export function RequestSampleForm({ content }: RequestSampleFormProps) {
  const baseId = useId();
  const [interest, setInterest] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: number } | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Owner, 2026-09-10: "once something is attached, there should be an
  // option to remove that, maybe show a preview." Clears both the input's
  // own native file list (`.value = ""`, otherwise the browser still
  // remembers the old selection and re-submits it even though the preview
  // is gone) and the component's own display state.
  function handleRemoveFile(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setAttachedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  // One ref per field's own wrapper div, so a failed submit can scroll to
  // and briefly flash whichever field is actually missing -- a plain
  // object ref (not one `useRef` per field) since the set of fields is
  // fixed and known upfront.
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLDivElement | null>>>({});

  // Smooth-scrolls to the first invalid field (in reading order) and
  // gives it a brief shake, then focuses its first real control. Direct
  // DOM manipulation for the shake, not a React class prop, so it can
  // replay on every failed submit attempt, not just the first -- React
  // re-renders `errors` into the same className string on a second
  // consecutive failure (still missing the same field), which wouldn't
  // otherwise re-trigger a CSS animation the class-name-based reveals
  // elsewhere on this site rely on (their animations only ever need to
  // play once, on mount, so that gap never came up before).
  function focusFirstError(fieldErrors: FieldErrors) {
    const firstKey = FIELD_ORDER.find((key) => fieldErrors[key]);
    if (!firstKey) return;
    const el = fieldRefs.current[firstKey];
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("field-shake");
    void el.offsetWidth; // force reflow so removing+re-adding the class replays the animation
    el.classList.add("field-shake");

    const focusable = el.querySelector<HTMLElement>("input, textarea, [role='radio']");
    // preventScroll: scrollIntoView above already handles positioning;
    // a second, competing scroll-into-view from focus() would fight it.
    focusable?.focus({ preventScroll: true });
  }

  function validate(formData: FormData): FieldErrors {
    const next: FieldErrors = {};
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const file = formData.get("file");

    if (!name) next.name = "Full name is required.";
    if (!email) next.email = "Work email is required.";
    else if (!EMAIL_PATTERN.test(email)) next.email = "Enter a valid email address.";
    if (!company) next.company = "Company name is required.";
    if (!interest) next.interest = "Select one option.";
    if (!project) next.project = "Tell us a bit about your project.";
    if (file instanceof File && file.size > 0 && file.size > MAX_FILE_BYTES) {
      next.file = "File is larger than 10MB. Please attach a smaller file, or leave this blank and mention it in your message.";
    }

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (interest) formData.set("interest", interest);
    appendLeadContext(formData);

    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      focusFirstError(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/request-sample", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className={requestSample.section}>
        <div className={requestSample.inner}>
          <div className={requestSample.successWrap}>
            <div className={requestSample.successIconWrap}>
              {/* A real inline SVG, not lucide's <Check>, so the stroke
                  itself can be animated (stroke-dasharray/dashoffset,
                  .form-success-check in app/globals.css) -- lucide's own
                  icon component doesn't expose its path for that. */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
                <path className={requestSample.successCheck} d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <p className={requestSample.successMessage}>{content.successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={requestSample.section}>
      <div className={requestSample.inner}>
        <form className={requestSample.form} onSubmit={handleSubmit} noValidate>
          <div ref={(el) => { fieldRefs.current.name = el; }} className={requestSample.field}>
            <label htmlFor={`${baseId}-name`} className={requestSample.label}>
              {content.fields.name.label} <span className={requestSample.required}>*</span>
            </label>
            <input
              id={`${baseId}-name`}
              name="name"
              type="text"
              placeholder={content.fields.name.placeholder}
              className={cx(requestSample.input, errors.name && requestSample.inputError)}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <p className={requestSample.errorText}>{errors.name}</p> : null}
          </div>

          <div ref={(el) => { fieldRefs.current.email = el; }} className={requestSample.field}>
            <label htmlFor={`${baseId}-email`} className={requestSample.label}>
              {content.fields.email.label} <span className={requestSample.required}>*</span>
            </label>
            <input
              id={`${baseId}-email`}
              name="email"
              type="email"
              placeholder={content.fields.email.placeholder}
              className={cx(requestSample.input, errors.email && requestSample.inputError)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className={requestSample.errorText}>{errors.email}</p> : null}
          </div>

          <div ref={(el) => { fieldRefs.current.company = el; }} className={requestSample.field}>
            <label htmlFor={`${baseId}-company`} className={requestSample.label}>
              {content.fields.company.label} <span className={requestSample.required}>*</span>
            </label>
            <input
              id={`${baseId}-company`}
              name="company"
              type="text"
              placeholder={content.fields.company.placeholder}
              className={cx(requestSample.input, errors.company && requestSample.inputError)}
              aria-invalid={Boolean(errors.company)}
            />
            {errors.company ? <p className={requestSample.errorText}>{errors.company}</p> : null}
          </div>

          <div ref={(el) => { fieldRefs.current.interest = el; }} className={requestSample.field}>
            <span className={requestSample.label}>
              {content.fields.interest.label} <span className={requestSample.required}>*</span>
            </span>
            <div className={requestSample.segmented} role="radiogroup" aria-label={content.fields.interest.label}>
              {content.fields.interest.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={interest === option}
                  onClick={() => setInterest(option)}
                  className={cx(
                    requestSample.segmentedOption,
                    interest === option ? requestSample.segmentedOptionActive : requestSample.segmentedOptionInactive,
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.interest ? <p className={requestSample.errorText}>{errors.interest}</p> : null}
          </div>

          <div ref={(el) => { fieldRefs.current.project = el; }} className={requestSample.field}>
            <label htmlFor={`${baseId}-project`} className={requestSample.label}>
              {content.fields.project.label} <span className={requestSample.required}>*</span>
            </label>
            <textarea
              id={`${baseId}-project`}
              name="project"
              className={cx(requestSample.textarea, errors.project && requestSample.inputError)}
              aria-invalid={Boolean(errors.project)}
            />
            <p className={requestSample.helpText}>{content.fields.project.helpText}</p>
            {errors.project ? <p className={requestSample.errorText}>{errors.project}</p> : null}
          </div>

          <div ref={(el) => { fieldRefs.current.file = el; }} className={requestSample.field}>
            {attachedFile ? (
              // A plain `<div>`, not a `<label>`, once a file is attached
              // -- the remove button below needs its own independent
              // click target, not one nested inside a label wired to
              // reopen the file picker (clicking anywhere inside a label
              // activates its associated control by default).
              <div className={requestSample.filePreview}>
                <div className={requestSample.filePreviewInfo}>
                  <div className={requestSample.filePreviewIconWrap}>
                    <Paperclip className={requestSample.filePreviewIcon} aria-hidden="true" />
                  </div>
                  <div className={requestSample.filePreviewText}>
                    <span className={requestSample.filePreviewName}>{attachedFile.name}</span>
                    <span className={requestSample.filePreviewSize}>{formatFileSize(attachedFile.size)}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className={requestSample.fileRemoveButton}
                  aria-label={`Remove ${attachedFile.name}`}
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <label htmlFor={`${baseId}-file`} className={requestSample.fileDropzone}>
                <Paperclip className={requestSample.fileDropzoneIcon} aria-hidden="true" />
                <span>{content.fields.file.label}</span>
              </label>
            )}
            <input
              ref={fileInputRef}
              id={`${baseId}-file`}
              name="file"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setAttachedFile(file ? { name: file.name, size: file.size } : null);
              }}
              className={requestSample.fileInputHidden}
            />
            <p className={requestSample.helpText}>{content.fields.file.helpText}</p>
            {errors.file ? <p className={requestSample.errorText}>{errors.file}</p> : null}
          </div>

          <div className={requestSample.field}>
            <label htmlFor={`${baseId}-phone`} className={requestSample.label}>
              {content.fields.phone.label}
            </label>
            <input
              id={`${baseId}-phone`}
              name="phone"
              type="tel"
              placeholder={content.fields.phone.placeholder}
              className={requestSample.input}
            />
          </div>

          <div className={requestSample.submitRow}>
            <div className={requestSample.consentRow}>
              <p className={requestSample.consentText}>
                {content.consentPrefix}
                <a href="/privacy-policy" className={requestSample.consentLink}>
                  {content.consentLinkText}
                </a>
                {content.consentSuffix}
              </p>
            </div>

            {status === "error" ? <p className={requestSample.formError}>{content.errorMessage}</p> : null}

            {/* Plain native button, not the shared `Button` component --
                `Button` always applies its own `base`/`primary` classes
                (which happen to look close to this recipe's own
                `submitButton`, but combining the two would still race on
                the same background/text-colour properties the exact way
                the segmented control's own chips once did). */}
            <button type="submit" className={requestSample.submitButton} disabled={status === "submitting"}>
              {status === "submitting" ? content.submittingLabel : content.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
