"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { ProjectVideo as ProjectVideoData } from "@/content/projects";

type ProjectVideoProps = {
  video: ProjectVideoData;
  /** Description de ce que montre la vidéo (elle est muette et sans texte ajouté). */
  description: string;
};

// Commandes natives du navigateur (lecture, progression, plein écran). Lecture muette en boucle
// tant que la vidéo est à l'écran ; avec « réduire les animations », rien ne démarre seul.
export function ProjectVideo({ video, description }: ProjectVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  // Une pause faite par le visiteur l'emporte sur la reprise automatique.
  const userPaused = useRef(false);
  // Le script ne met en pause qu'une vidéo sortie de l'écran : une pause à l'écran vient du visiteur.
  const visible = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!userPaused.current) element.play().catch(() => {});
        } else {
          element.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const descriptionId = `${video.id}-description`;

  return (
    <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <video
        ref={ref}
        width={video.width}
        height={video.height}
        poster={video.poster}
        controls
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        controlsList="nodownload noremoteplayback"
        aria-describedby={descriptionId}
        onPlay={() => {
          userPaused.current = false;
        }}
        onPause={() => {
          if (visible.current) userPaused.current = true;
        }}
        className="block aspect-video h-auto w-full bg-bg"
      >
        {video.webm ? <source src={video.webm} type="video/webm" /> : null}
        <source src={video.mp4} type="video/mp4" />
      </video>
      <p id={descriptionId} className="sr-only">
        {description}
      </p>
    </div>
  );
}
