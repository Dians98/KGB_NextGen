import type { SVGProps } from "react";
import type { Locale } from "@/i18n/routing";

type FlagProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox">;

function FlagFrame({ className, children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 14"
      width="20"
      height="14"
      aria-hidden="true"
      focusable="false"
      className={["shrink-0 rounded-sm", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </svg>
  );
}

export function FranceFlag(props: FlagProps) {
  return (
    <FlagFrame {...props}>
      <rect width="7" height="14" className="fill-flag-blue" />
      <rect x="7" width="6" height="14" className="fill-flag-white" />
      <rect x="13" width="7" height="14" className="fill-flag-red" />
    </FlagFrame>
  );
}

// Union Jack simplifié : diagonales rouges centrées, lisibles à 20 px.
export function UnitedKingdomFlag(props: FlagProps) {
  return (
    <FlagFrame {...props}>
      <rect width="20" height="14" className="fill-flag-blue" />
      <path d="M0 0 20 14M20 0 0 14" strokeWidth="2.8" className="stroke-flag-white" />
      <path d="M0 0 20 14M20 0 0 14" strokeWidth="1" className="stroke-flag-red" />
      <path d="M10 0v14M0 7h20" strokeWidth="4.6" className="stroke-flag-white" />
      <path d="M10 0v14M0 7h20" strokeWidth="2.4" className="stroke-flag-red" />
    </FlagFrame>
  );
}

export function LocaleFlag({ locale, ...props }: FlagProps & { locale: Locale }) {
  return locale === "fr" ? <FranceFlag {...props} /> : <UnitedKingdomFlag {...props} />;
}
