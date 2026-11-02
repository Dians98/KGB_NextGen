import Image from "next/image";

type LogoProps = {
  className?: string;
  /** À activer pour le logo de l'en-tête (au-dessus de la ligne de flottaison). */
  priority?: boolean;
};

// Logo détouré ; alt vide car le lien ou le bloc voisin porte le nom accessible (texte sr-only).
export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src="/brand/kgb-embleme.webp"
      alt=""
      width={969}
      height={441}
      priority={priority}
      className={["h-9 w-auto shrink-0 md:h-10", className].filter(Boolean).join(" ")}
    />
  );
}
