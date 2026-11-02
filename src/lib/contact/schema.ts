import { z } from "zod";

// Les messages d'erreur sont des clés sous ContactForm.errors (messages/*.json), jamais du texte.
export const contactSchema = z.object({
  name: z.string().trim().min(1, { error: "nameRequired" }).max(100, { error: "nameTooLong" }),
  email: z.string().trim().pipe(z.email({ error: "emailInvalid" })),
  company: z.string().trim().max(150, { error: "companyTooLong" }).optional().default(""),
  message: z
    .string()
    .trim()
    .min(20, { error: "messageTooShort" })
    .max(5000, { error: "messageTooLong" }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactErrorKey =
  | "nameRequired"
  | "nameTooLong"
  | "emailInvalid"
  | "companyTooLong"
  | "messageTooShort"
  | "messageTooLong";

export type ContactState = {
  status: "idle" | "success" | "invalid" | "rate_limited" | "error";
  fieldErrors: Partial<Record<ContactField, ContactErrorKey>>;
  /** Valeurs renvoyées pour regarnir le formulaire après une erreur. */
  values: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = { status: "idle", fieldErrors: {}, values: {} };
