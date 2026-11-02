"use client";

import { useActionState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/lib/contact/action";
import { initialContactState, type ContactField } from "@/lib/contact/schema";

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "message"];

const controlClasses =
  "block w-full rounded-control border bg-bg px-4 py-3 text-body text-fg transition-colors duration-(--duration-fast) hover:border-cyan";

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const successRef = useRef<HTMLDivElement>(null);

  // Le premier champ en erreur reçoit le focus ; après un succès, le message pour que le lecteur d'écran le lise.
  useEffect(() => {
    if (state.status === "invalid") {
      const first = FIELD_ORDER.find((field) => state.fieldErrors[field]);
      if (first) document.getElementById(`contact-${first}`)?.focus();
    } else if (state.status === "success") {
      successRef.current?.focus();
    }
  }, [state]);

  const errorFor = (field: ContactField) => {
    const key = state.fieldErrors[field];
    return key ? t(`errors.${key}`) : null;
  };

  const fieldProps = (field: ContactField, hintId?: string) => {
    const error = errorFor(field);
    const describedBy = [hintId, error ? `contact-${field}-erreur` : null].filter(Boolean).join(" ");
    return {
      id: `contact-${field}`,
      name: field,
      defaultValue: state.values[field] ?? "",
      "aria-invalid": error ? (true as const) : undefined,
      "aria-describedby": describedBy || undefined,
      className: `${controlClasses} ${error ? "border-danger" : "border-line-strong"}`,
    };
  };

  const fieldError = (field: ContactField) => {
    const error = errorFor(field);
    return error ? (
      <p id={`contact-${field}-erreur`} className="mt-2 text-small text-danger">
        {error}
      </p>
    ) : null;
  };

  const alertMessage =
    state.status === "invalid"
      ? t("invalid")
      : state.status === "error"
        ? t("error")
        : state.status === "rate_limited"
          ? t("rateLimited")
          : null;

  return (
    <div>
      <div role="status" aria-live="polite">
        {state.status === "success" ? (
          <div
            ref={successRef}
            tabIndex={-1}
            className="rounded-control border border-line-strong bg-bg p-5 text-body text-fg outline-none"
          >
            {t("success")}
          </div>
        ) : null}
      </div>

      {state.status === "success" ? null : (
        <form action={formAction} noValidate className="flex flex-col gap-6">
          <input type="hidden" name="locale" value={locale} />

          <div className="sr-only" aria-hidden="true">
            <label htmlFor="contact-website">{t("honeypot")}</label>
            <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div>
            <label htmlFor="contact-name" className="mb-2 block text-small font-semibold text-fg">
              {t("name")}
            </label>
            <input {...fieldProps("name")} type="text" autoComplete="name" aria-required="true" />
            {fieldError("name")}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-2 block text-small font-semibold text-fg">
              {t("email")}
            </label>
            <input
              {...fieldProps("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              aria-required="true"
            />
            {fieldError("email")}
          </div>

          <div>
            <label htmlFor="contact-company" className="mb-2 block text-small font-semibold text-fg">
              {t("company")}
            </label>
            <input {...fieldProps("company")} type="text" autoComplete="organization" />
            {fieldError("company")}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-2 block text-small font-semibold text-fg">
              {t("message")}
            </label>
            <textarea {...fieldProps("message", "contact-message-aide")} rows={6} aria-required="true" />
            <p id="contact-message-aide" className="mt-2 text-small text-muted">
              {t("messageHint")}
            </p>
            {fieldError("message")}
          </div>

          <div role="alert" className="empty:-mt-6">
            {alertMessage ? (
              <p className="rounded-control border border-danger px-4 py-3 text-small text-danger">
                {alertMessage}
              </p>
            ) : null}
          </div>

          <div>
            <Button type="submit" size="lg" disabled={pending}>
              {pending ? t("sending") : t("submit")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
