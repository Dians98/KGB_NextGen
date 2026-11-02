"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { sendContactEmail } from "./mail";
import { isRateLimited } from "./rate-limit";
import {
  contactSchema,
  type ContactErrorKey,
  type ContactField,
  type ContactState,
} from "./schema";

const text = (data: FormData, key: string) => {
  const value = data.get(key);
  return typeof value === "string" ? value : "";
};

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    company: text(formData, "company"),
    message: text(formData, "message"),
  };
  const locale = text(formData, "locale") === "en" ? "en" : "fr";

  // Champ piège rempli : un robot. Faux succès, aucun envoi.
  if (text(formData, "website")) {
    return { status: "success", fieldErrors: {}, values: {} };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "inconnue";
  if (isRateLimited(ip)) {
    return { status: "rate_limited", fieldErrors: {}, values };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const [field, errors] of Object.entries(z.flattenError(parsed.error).fieldErrors)) {
      const first = (errors as string[] | undefined)?.[0];
      if (first) fieldErrors[field as ContactField] = first as ContactErrorKey;
    }
    return { status: "invalid", fieldErrors, values };
  }

  try {
    await sendContactEmail(parsed.data, locale);
    return { status: "success", fieldErrors: {}, values: {} };
  } catch (err) {
    console.error("[contact]", err instanceof Error ? err.message : "erreur inconnue");
    return { status: "error", fieldErrors: {}, values };
  }
}
