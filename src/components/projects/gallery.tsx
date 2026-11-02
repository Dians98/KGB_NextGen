import Image from "next/image";
import { Curtain } from "@/components/motion/curtain";
import type { Shot } from "@/content/projects";

export type GallerySection = {
  id: string;
  /** Titre h3 ; omis quand la galerie n'a qu'un seul groupe. */
  title?: string;
  /** Légende visible du groupe, par exemple « Données fictives ». */
  caption: string;
  shots: Shot[];
};

type GalleryProps = {
  sections: GallerySection[];
  /** Traduit l'alt d'une capture à partir de sa clé. */
  altFor: (key: string) => string;
};

const DESKTOP_SIZES = "(min-width: 1280px) 38rem, (min-width: 768px) 46vw, 100vw";
const PHONE_SIZES = "18rem";

// Colonnes CSS : les captures ont des hauteurs très différentes, on ne les rogne pas.
export function Gallery({ sections, altFor }: GalleryProps) {
  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={section.title ? `galerie-${section.id}` : undefined}>
          {section.title ? (
            <h3 id={`galerie-${section.id}`} className="font-display text-heading font-semibold text-fg">
              {section.title}
            </h3>
          ) : null}
          <figure className={section.title ? "mt-4" : undefined}>
            <figcaption className="font-mono text-caption text-muted">{section.caption}</figcaption>
            <div className="mt-6 columns-1 gap-6 md:columns-2">
              {section.shots.map((shot) => (
                <Curtain key={shot.key} className="mb-6 break-inside-avoid">
                  {shot.group === "mobile" ? (
                    <div className="mx-auto w-full max-w-72 rounded-device border border-line-strong bg-surface p-2 shadow-card">
                      <Image
                        src={shot.src}
                        alt={altFor(shot.key)}
                        width={shot.width}
                        height={shot.height}
                        sizes={PHONE_SIZES}
                        className="h-auto w-full rounded-3xl"
                      />
                    </div>
                  ) : (
                    <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
                      <Image
                        src={shot.src}
                        alt={altFor(shot.key)}
                        width={shot.width}
                        height={shot.height}
                        sizes={DESKTOP_SIZES}
                        className="h-auto w-full"
                      />
                    </div>
                  )}
                </Curtain>
              ))}
            </div>
          </figure>
        </section>
      ))}
    </div>
  );
}
