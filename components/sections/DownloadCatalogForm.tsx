"use client";

// components/sections/DownloadCatalogForm.tsx
// /download-catalog page. The lowest-friction form on the site (doc,
// 2026-09-10) -- gates a free document, not a sample request, so it asks
// for exactly 2 required fields plus 1 optional one; every other lead
// signal is captured passively, server-side (lib/leadEnrichment.ts), never
// as a form field. Same shape, styling, and success-animation approach as
// RequestSampleForm.tsx -- reuses that page's own `requestSampleForm`
// recipe directly (already generic dark-field styling, no page-specific
// naming inside it) rather than a second near-identical recipe.
//
// Submits as a plain fetch with FormData (no file field on this form, so
// no multipart-specific reason for FormData beyond consistency with the
// sibling form) to app/api/download-catalog/route.ts, which sends the
// catalog PDF by email and appends the lead to the shared Sheet. Success/
// error render inline in place of the form, no redirect -- same reasoning
// as Request a Sample: keeps the confirmation readable, no page-level
// bounce right after someone hands over their email.
import type { FormEvent } from "react";
import { useId, useRef, useState } from "react";

import { cx } from "@/components/ui/cx";
import { requestSampleForm as darkForm } from "@/components/ui/styles";
import type { downloadCatalog } from "@/content/download-catalog";
import { appendLeadContext } from "@/lib/clientLeadContext";

export type DownloadCatalogFormProps = {
  content: typeof downloadCatalog.form;
};

type FieldKey = "firstName" | "email";
type FieldErrors = Partial<Record<FieldKey, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FIELD_ORDER: FieldKey[] = ["firstName", "email"];

export function DownloadCatalogForm({ content }: DownloadCatalogFormProps) {
  const baseId = useId();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const fieldRefs = useRef<Partial<Record<FieldKey, HTMLDivElement | null>>>({});

  // Same "scroll to and shake the first missing field" behaviour
  // RequestSampleForm.tsx established -- see that file's own comment for
  // why the shake is a direct classList mutation, not a React className.
  function focusFirstError(fieldErrors: FieldErrors) {
    const firstKey = FIELD_ORDER.find((key) => fieldErrors[key]);
    if (!firstKey) return;
    const el = fieldRefs.current[firstKey];
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.remove("field-shake");
    void el.offsetWidth;
    el.classList.add("field-shake");
    el.querySelector<HTMLElement>("input")?.focus({ preventScroll: true });
  }

  function validate(formData: FormData): FieldErrors {
    const next: FieldErrors = {};
    const firstName = String(formData.get("firstName") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (!firstName) next.firstName = "First name is required.";
    if (!email) next.email = "Email is required.";
    else if (!EMAIL_PATTERN.test(email)) next.email = "Enter a valid email address.";

    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    appendLeadContext(formData);

    const fieldErrors = validate(formData);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      focusFirstError(fieldErrors);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/download-catalog", { method: "POST", body: formData });
      if (!response.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className={darkForm.section}>
        <div className={darkForm.inner}>
          <div className={darkForm.successWrap}>
            <div className={darkForm.successIconWrap}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden="true">
                <path className={darkForm.successCheck} d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <p className={darkForm.successMessage}>{content.successMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={darkForm.section}>
      <div className={darkForm.inner}>
        <form className={darkForm.form} onSubmit={handleSubmit} noValidate>
          <div ref={(el) => { fieldRefs.current.firstName = el; }} className={darkForm.field}>
            <label htmlFor={`${baseId}-firstName`} className={darkForm.label}>
              {content.fields.firstName.label} <span className={darkForm.required}>*</span>
            </label>
            <input
              id={`${baseId}-firstName`}
              name="firstName"
              type="text"
              placeholder={content.fields.firstName.placeholder}
              className={cx(darkForm.input, errors.firstName && darkForm.inputError)}
              aria-invalid={Boolean(errors.firstName)}
            />
            {errors.firstName ? <p className={darkForm.errorText}>{errors.firstName}</p> : null}
          </div>

          <div ref={(el) => { fieldRefs.current.email = el; }} className={darkForm.field}>
            <label htmlFor={`${baseId}-email`} className={darkForm.label}>
              {content.fields.email.label} <span className={darkForm.required}>*</span>
            </label>
            <input
              id={`${baseId}-email`}
              name="email"
              type="email"
              placeholder={content.fields.email.placeholder}
              className={cx(darkForm.input, errors.email && darkForm.inputError)}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className={darkForm.errorText}>{errors.email}</p> : null}
          </div>

          <div className={darkForm.field}>
            <label htmlFor={`${baseId}-company`} className={darkForm.label}>
              {content.fields.company.label}
            </label>
            <input
              id={`${baseId}-company`}
              name="company"
              type="text"
              placeholder={content.fields.company.placeholder}
              className={darkForm.input}
            />
          </div>

          <div className={darkForm.submitRow}>
            <div className={darkForm.consentRow}>
              <p className={darkForm.consentText}>
                {content.consentPrefix}
                <a href="/privacy-policy" className={darkForm.consentLink}>
                  {content.consentLinkText}
                </a>
                {content.consentSuffix}
              </p>
            </div>

            {status === "error" ? <p className={darkForm.formError}>{content.errorMessage}</p> : null}

            <button type="submit" className={darkForm.submitButton} disabled={status === "submitting"}>
              {status === "submitting" ? content.submittingLabel : content.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
