import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/config/site";

export function Contact() {
  const t = useTranslations("Contact");
  const whatsappDigits = site.whatsapp?.replace(/\D/g, "");

  return (
    <Section id="contact" labelledBy="contact-titre" className="border-t border-line">
      <div className="grid gap-block lg:grid-cols-12 lg:gap-x-16">
        <Reveal className="lg:col-span-5 lg:self-start lg:sticky lg:top-anchor">
          <SectionHeading id="contact-titre" title={t("title")} description={t("intro")} />
          {whatsappDigits || site.companyLinkedin ? (
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
              {whatsappDigits ? (
                <Button href={`https://wa.me/${whatsappDigits}`} external variant="link" size="md">
                  {t("whatsapp")}
                </Button>
              ) : null}
              {site.companyLinkedin ? (
                <Button href={site.companyLinkedin} external variant="link" size="md">
                  {t("linkedin")}
                </Button>
              ) : null}
            </div>
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
