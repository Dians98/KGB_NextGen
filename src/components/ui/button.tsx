import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRightIcon, ExternalIcon } from "./icons";

export type ButtonVariant = "primary" | "secondary" | "link";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Flèche à droite du libellé (actions de navigation). */
  arrow?: boolean;
  /** Icône à gauche du libellé (téléchargement). */
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className"> & {
    href: string;
    /** Lien hors du site : nouvel onglet, icône et mention pour les lecteurs d'écran. */
    external?: boolean;
  };

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: undefined;
    external?: undefined;
  };

export type ButtonProps = LinkProps | NativeButtonProps;

const base =
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 font-sans font-semibold " +
  "transition-[background-color,border-color,color,box-shadow,translate] duration-(--duration-base) ease-out-expo " +
  "disabled:pointer-events-none disabled:opacity-50 active:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-control bg-royal text-on-royal motion-safe:hover:-translate-y-0.5 shadow-button hover:bg-royal-strong hover:shadow-button-hover",
  secondary:
    "rounded-control border border-line-strong text-fg motion-safe:hover:-translate-y-0.5 hover:border-cyan hover:bg-surface",
  link: "rounded-control text-cyan underline decoration-from-font underline-offset-4 hover:text-fg",
};

const sizes: Record<ButtonVariant, Record<ButtonSize, string>> = {
  primary: { sm: "min-h-10 px-4 text-small", md: "min-h-11 px-5 text-body", lg: "min-h-12 px-6 text-body" },
  secondary: { sm: "min-h-10 px-4 text-small", md: "min-h-11 px-5 text-body", lg: "min-h-12 px-6 text-body" },
  link: { sm: "min-h-6 text-small", md: "min-h-11 text-body", lg: "min-h-11 text-body" },
};

export function buttonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return [base, variants[variant], sizes[variant][size], className].filter(Boolean).join(" ");
}

export function Button(props: ButtonProps) {
  const t = useTranslations("Common");
  const { variant = "primary", size = "md", arrow = false, icon, className, children, ...rest } = props;
  const classes = buttonClasses(variant, size, className);

  const content = (
    <>
      {icon}
      {children}
      {arrow ? (
        <ArrowRightIcon
          width={18}
          height={18}
          className="transition-transform duration-(--duration-base) ease-out-expo motion-safe:group-hover/btn:translate-x-0.75"
        />
      ) : null}
    </>
  );

  if (rest.href !== undefined) {
    const { href, external, download, ...anchor } = rest;
    if (download !== undefined && download !== false) {
      // Fichier statique : un <a> simple, car le Link de next-intl ajouterait le préfixe de langue.
      return (
        <a href={href} download={download} className={classes} {...anchor}>
          {content}
        </a>
      );
    }
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...anchor}>
          {content}
          <ExternalIcon width={16} height={16} />
          <span className="sr-only">{t("opensInNewTab")}</span>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchor}>
        {content}
      </Link>
    );
  }

  const { type, ...native } = rest;
  return (
    <button type={type ?? "button"} className={classes} {...native}>
      {content}
    </button>
  );
}
