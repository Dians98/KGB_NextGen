"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Curtain } from "@/components/motion/curtain";
import { ArrowRightIcon, CloseIcon, ExpandIcon } from "@/components/ui/icons";
import type { Shot } from "@/content/projects";

export type GalleryShot = Shot & { alt: string };

export type GallerySection = {
  id: string;
  /** Titre h3 ; omis quand la galerie n'a qu'un seul groupe. */
  title?: string;
  /** Légende visible du groupe, par exemple « Données fictives ». */
  caption: string;
  shots: GalleryShot[];
  /** Vidéo affichée avant les captures (la visite d'une page d'accueil, par exemple). */
  video?: ReactNode;
};

export type GalleryLabels = {
  open: string;
  close: string;
  previous: string;
  next: string;
  /** Compteur traduit, avec les marques {current} et {total} à remplacer. */
  counter: string;
};

type GalleryProps = {
  sections: GallerySection[];
  labels: GalleryLabels;
};

const DESKTOP_SIZES = "(min-width: 1280px) 38rem, (min-width: 768px) 46vw, 100vw";
const PHONE_SIZES = "18rem";

// Colonnes CSS : les captures ont des hauteurs très différentes, on ne les rogne pas.
// Chaque capture s'ouvre en grand dans une fenêtre modale native (<dialog>).
export function Gallery({ sections, labels }: GalleryProps) {
  const all = sections.flatMap((section) => section.shots);
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const open = useCallback((i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  }, []);
  const close = useCallback(() => dialog.current?.close(), []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + all.length) % all.length)),
    [all.length],
  );

  // La page derrière ne défile pas tant que la visionneuse est ouverte.
  useEffect(() => {
    if (index === null) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [index]);

  const current = index === null ? null : all[index];
  const many = all.length > 1;

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
            {section.video ? <Curtain className="mt-6">{section.video}</Curtain> : null}
            {section.shots.length ? (
              <div className="mt-6 columns-1 gap-6 md:columns-2">
                {section.shots.map((shot) => {
                  const i = all.indexOf(shot);
                  const phone = shot.group === "mobile";
                  return (
                    <Curtain key={shot.key} className="mb-6 break-inside-avoid">
                      <button
                        type="button"
                        onClick={() => open(i)}
                        aria-label={`${labels.open} : ${shot.alt}`}
                        aria-haspopup="dialog"
                        className={[
                          "group/shot relative block w-full cursor-zoom-in overflow-hidden border bg-surface shadow-card transition-[border-color,box-shadow] duration-(--duration-base) ease-out-expo hover:border-line-strong hover:shadow-card-hover",
                          phone ? "mx-auto max-w-72 rounded-device border-line-strong p-2" : "rounded-card border-line",
                        ].join(" ")}
                      >
                        <Image
                          src={shot.src}
                          alt=""
                          width={shot.width}
                          height={shot.height}
                          sizes={phone ? PHONE_SIZES : DESKTOP_SIZES}
                          className={[
                            "h-auto w-full transition-transform duration-1200 ease-out-expo motion-safe:group-hover/shot:scale-102",
                            phone ? "rounded-3xl" : "",
                          ].join(" ")}
                        />
                        <span
                          aria-hidden="true"
                          className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center rounded-pill border border-line-strong bg-bg/80 text-fg opacity-0 shadow-card backdrop-blur-sm transition-opacity duration-(--duration-base) ease-out-expo group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100"
                        >
                          <ExpandIcon width={18} height={18} />
                        </span>
                      </button>
                    </Curtain>
                  );
                })}
              </div>
            ) : null}
          </figure>
        </section>
      ))}

      <dialog
        ref={dialog}
        aria-label={current?.alt}
        onClose={() => setIndex(null)}
        onClick={(event) => {
          // Un clic sur le fond (hors image et hors boutons) ferme la visionneuse.
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (!many) return;
          if (event.key === "ArrowRight") step(1);
          else if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-fg backdrop:bg-bg/92 backdrop:backdrop-blur-sm open:flex open:flex-col motion-safe:open:animate-menu-in"
      >
        {current ? (
          <>
            <div className="flex items-center justify-between gap-4 px-4 pt-4 sm:px-6">
              <p className="font-mono text-caption text-muted" aria-live="polite">
                {many
                  ? labels.counter
                      .replace("{current}", String((index ?? 0) + 1))
                      .replace("{total}", String(all.length))
                  : null}
              </p>
              <button
                type="button"
                onClick={close}
                aria-label={labels.close}
                autoFocus
                className="inline-flex size-11 items-center justify-center rounded-pill border border-line-strong bg-surface text-fg transition-colors duration-(--duration-base) ease-out-expo hover:border-cyan"
              >
                <CloseIcon width={20} height={20} />
              </button>
            </div>

            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-4 sm:px-20"
              onClick={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <Image
                key={current.key}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                className={[
                  "h-auto max-h-full w-auto max-w-full border border-line-strong object-contain shadow-card",
                  current.group === "mobile" ? "rounded-device" : "rounded-card",
                ].join(" ")}
              />
              {many ? (
                <>
                  <NavButton label={labels.previous} onClick={() => step(-1)} side="start" />
                  <NavButton label={labels.next} onClick={() => step(1)} side="end" />
                </>
              ) : null}
            </div>

            <p className="mx-auto max-w-prose px-4 pb-6 text-center text-small text-muted">{current.alt}</p>
          </>
        ) : null}
      </dialog>
    </div>
  );
}

function NavButton({ label, onClick, side }: { label: string; onClick: () => void; side: "start" | "end" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={[
        "absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-pill border border-line-strong bg-bg/80 text-fg shadow-card backdrop-blur-sm transition-colors duration-(--duration-base) ease-out-expo hover:border-cyan",
        side === "start" ? "left-2 sm:left-5" : "right-2 sm:right-5",
      ].join(" ")}
    >
      <ArrowRightIcon width={20} height={20} className={side === "start" ? "rotate-180" : undefined} />
    </button>
  );
}
