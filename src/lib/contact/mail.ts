import { Resend } from "resend";
import type { ContactInput } from "./schema";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function sendContactEmail(input: ContactInput, locale: string): Promise<void> {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  if (!process.env.RESEND_API_KEY || !to) {
    throw new Error("Formulaire non configuré : RESEND_API_KEY ou CONTACT_TO_EMAIL manquant");
  }

  // Instancié à l'appel : sans clé, le build passe et seul l'envoi échoue.
  const resend = new Resend(process.env.RESEND_API_KEY);
  const who = input.company ? `${input.name} (${input.company})` : input.name;
  const subject = `[KGB NextGen] Nouveau projet : ${who}`.replace(/[\r\n]+/g, " ");

  const { error } = await resend.emails.send({
    from: `KGB NextGen <${from}>`,
    to,
    replyTo: input.email,
    subject,
    text: [
      `Nom : ${input.name}`,
      `Email : ${input.email}`,
      input.company ? `Entreprise : ${input.company}` : null,
      `Langue du site : ${locale}`,
      "",
      input.message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
    html: `
      <h2>Nouvelle demande depuis le site KGB NextGen</h2>
      <p><strong>Nom :</strong> ${escapeHtml(input.name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(input.email)}</p>
      ${input.company ? `<p><strong>Entreprise :</strong> ${escapeHtml(input.company)}</p>` : ""}
      <p><strong>Langue du site :</strong> ${escapeHtml(locale)}</p>
      <p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>
    `,
  });

  // Le message de Resend dit pourquoi l'envoi est refusé (destinataire non autorisé, domaine non vérifié…).
  if (error) throw new Error(`Resend : ${error.name} — ${error.message}`);
}
