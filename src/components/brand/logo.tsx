import Image from "next/image";

type LogoProps = {
  className?: string;
  /** À activer pour le logo de l'en-tête (au-dessus de la ligne de flottaison). */
  priority?: boolean;
  /** Vide par défaut : le lien ou le bloc voisin porte le nom accessible. */
  alt?: string;
  sizes?: string;
};

export function Logo({ className = "h-9 w-auto shrink-0 md:h-10", priority = false, alt = "", sizes }: LogoProps) {
  return (
    <Image
      src="/brand/kgb-embleme.webp"
      alt={alt}
      width={969}
      height={441}
      priority={priority}
      sizes={sizes}
      className={className}
    />
  );
}
