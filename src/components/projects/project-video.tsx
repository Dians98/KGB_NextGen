"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";
import type { ProjectVideo as ProjectVideoData } from "@/content/projects";

type ProjectVideoProps = {
  video: ProjectVideoData;
  /** Description de ce que montre la vidéo (elle est muette et sans texte ajouté). */
  description: string;
  playLabel: string;
  pauseLabel: string;
};

// Lecture muette en boucle tant que la vidéo est à l'écran. Avec « réduire les animations »,
// rien ne démarre seul : l'affiche reste visible et le bouton lance la lecture.
export function ProjectVideo({ video, description, playLabel, pauseLabel }: ProjectVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  // Un choix explicite du visiteur l'emporte sur la lecture automatique.
  const userChoice = useRef<"play" | "pause" | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (userChoice.current !== "pause") element.play().catch(() => {});
        } else {
          element.pause();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion]);

  function toggle() {
    const element = ref.current;
    if (!element) return;
    if (element.paused) {
      userChoice.current = "play";
      element.play().catch(() => {});
    } else {
      userChoice.current = "pause";
      element.pause();
    }
  }

  const descriptionId = `${video.id}-description`;

  return (
    <div className="group/video relative overflow-hidden rounded-card border border-line bg-surface shadow-card">
      <video
        ref={ref}
        width={video.width}
        height={video.height}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-describedby={descriptionId}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block aspect-video h-auto w-full bg-bg"
      >
        {video.webm ? <source src={video.webm} type="video/webm" /> : null}
        <source src={video.mp4} type="video/mp4" />
      </video>
      <p id={descriptionId} className="sr-only">
        {description}
      </p>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        className="absolute right-3 bottom-3 inline-flex size-11 items-center justify-center rounded-pill border border-line-strong bg-bg/80 text-fg shadow-card backdrop-blur-sm transition-[background-color,border-color] duration-(--duration-base) ease-out-expo hover:border-cyan hover:bg-bg"
      >
        {playing ? <PauseIcon width={18} height={18} /> : <PlayIcon width={18} height={18} />}
      </button>
    </div>
  );
}
