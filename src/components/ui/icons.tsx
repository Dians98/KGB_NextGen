import type { SVGProps } from "react";

type IconProps = Omit<SVGProps<SVGSVGElement>, "children">;

// Icônes décoratives : le nom accessible vient toujours du bouton ou du lien qui les contient.
function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M14 5h5v5" />
      <path d="M19 5 10 14" />
      <path d="M18 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </Icon>
  );
}

export function CodeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </Icon>
  );
}

export function SmartphoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="7" y="3" width="10" height="18" rx="2" />
      <path d="M11 18h2" />
    </Icon>
  );
}

export function WorkflowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="6" height="6" rx="1.5" />
      <rect x="15" y="14" width="6" height="6" rx="1.5" />
      <path d="M9 7h3a3 3 0 0 1 3 3v4" />
    </Icon>
  );
}

export function ModulesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <path d="M14 17.5h7" />
      <path d="M17.5 14v7" />
    </Icon>
  );
}

// Logo officiel de WhatsApp (glyphe plein, Simple Icons, CC0) : la marque doit rester reconnaissable.
export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4v11" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 20h14" />
    </Icon>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5.5v13a.5.5 0 0 0 .77.42l10-6.5a.5.5 0 0 0 0-.84l-10-6.5A.5.5 0 0 0 8 5.5Z" />
    </Icon>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M8 5v14" />
      <path d="M16 5v14" />
    </Icon>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 4h5v5" />
      <path d="M9 20H4v-5" />
      <path d="m20 4-6 6" />
      <path d="m4 20 6-6" />
    </Icon>
  );
}
