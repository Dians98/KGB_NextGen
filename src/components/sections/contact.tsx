import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ChatIcon, PhoneIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/config/site";

export function Contact() {
  const t = useTranslations("Contact");
  const common = useTranslations("Common");
  const whatsappDigits = site.whatsapp?.replace(/\D/g, "");

  return (
    <Section id="contact" labelledBy="contact-titre" className="border-t border-line">
      <div className="grid gap-block lg:grid-cols-12 lg:gap-x-16">
        <Reveal className="lg:col-span-5 lg:self-start lg:sticky lg:top-anchor">
          <SectionHeading id="contact-titre" title={t("title")} description={t("intro")} />
          {/* Téléphone et WhatsApp juste sous l'accroche : le contact direct reste à portée sans le formulaire. */}
          {site.phone || whatsappDigits || site.companyLinkedin ? (
            <ul className="mt-8 flex flex-col gap-3">
              {site.phone ? (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    aria-label={t("call", { number: site.phone })}
                    className="group inline-flex min-h-11 items-center gap-3 rounded-control text-lead font-semibold text-fg transition-colors duration-(--duration-base) hover:text-cyan"
                  >
                    <span className="flex size-10 items-center justify-center rounded-control border border-line-strong bg-surface text-cyan transition-colors duration-(--duration-base) group-hover:border-cyan">
                      <PhoneIcon width={18} height={18} />
                    </span>
                    {site.phone}
                  </a>
                </li>
              ) : null}
              {whatsappDigits ? (
                <li>
                  <a
                    href={`https://wa.me/${whatsappDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("whatsappLabel", { number: site.whatsapp ?? "" })} ${common("opensInNewTab")}`}
                    className="group inline-flex min-h-11 items-center gap-3 rounded-control text-body font-medium text-muted transition-colors duration-(--duration-base) hover:text-fg"
                  >
                    <span className="flex size-10 items-center justify-center rounded-control border border-line-strong bg-surface text-cyan transition-colors duration-(--duration-base) group-hover:border-cyan">
                      <ChatIcon width={18} height={18} />
                    </span>
                    {t("whatsapp")}
                  </a>
                </li>
              ) : null}
              {site.companyLinkedin ? (
                <li>
                  <Button href={site.companyLinkedin} external variant="link" size="md">
                    {t("linkedin")}
                  </Button>
                </li>
              ) : null}
            </ul>
          ) : null}
        </Reveal>

        <Reveal className="lg:col-span-7">
          <div className="rounded-card border border-line bg-surface p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
