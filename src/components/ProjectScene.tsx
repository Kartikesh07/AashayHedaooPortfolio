"use client";

import { useEffect, useRef, type CSSProperties, type RefCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { Project, ProjectImage } from "@/data/projects";
import { SCENE_DIRECTIONS } from "./projectScenes.config";
import styles from "./SelectedWork.module.css";

function Artwork({ image, secondary = false }: { image: ProjectImage; secondary?: boolean }) {
  return <Image className={secondary ? styles.secondaryImage : styles.primaryImage} src={image.src} alt={image.alt}
    width={image.width} height={image.height} sizes={secondary ? "(max-width: 700px) 35vw, 24vw" : "(max-width: 700px) 85vw, 50vw"} />;
}

export function ProjectScene({ project, index, total, expanded, buttonRef, onDiscover }: {
  project: Project; index: number; total: number; expanded: boolean;
  buttonRef: RefCallback<HTMLButtonElement>; onDiscover: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const direction = SCENE_DIRECTIONS[project.slug] ?? {
    treatment: "detective", title: [project.title], statement: project.summary, accent: "#b5b7ff", surface: "#181a30",
  };
  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || !window.IntersectionObserver) return;
    const animations: Animation[] = [];
    // Visible at rest and without JS; animate only once, as each scene enters.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.querySelectorAll<HTMLElement>("[data-reveal]").forEach((node, order) => {
        const media = node.tagName === "FIGURE";
        animations.push(node.animate([{ transform: media ? "translateY(14px) scale(.985)" : `translateY(${order ? 14 : 26}px)`, opacity: 0.65 }, { transform: "translateY(0) scale(1)", opacity: 1 }],
          { duration: order ? 650 : 900, delay: order * 60, easing: "cubic-bezier(.2,.7,.2,1)" }));
      });
      observer.disconnect();
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => { observer.disconnect(); animations.forEach((animation) => animation.cancel()); };
  }, [reducedMotion]);
  const cover = project.media.cover ?? project.media.designDiagrams[0];
  const secondaryVideo = project.media.gameplayVideos.find((video) => video.width > video.height && video.poster !== cover?.src)
    ?? project.media.gameplayVideos.find((video) => video.poster !== cover?.src);
  const secondary = secondaryVideo ? { src: secondaryVideo.poster, alt: `${project.title} — ${secondaryVideo.title} gameplay still`, width: secondaryVideo.width, height: secondaryVideo.height } : undefined;

  return <article ref={ref} id={`scene-${project.slug}`} tabIndex={-1} aria-labelledby={`title-${project.slug}`}
    className={`${styles.scene} ${styles[direction.treatment]}`}
    style={{ "--scene-accent": direction.accent, "--scene-surface": direction.surface } as CSSProperties}>
    <div className={styles.sceneMeta}><span>{project.status}</span><span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span></div>
    <div className={styles.composition}>
      <h3 id={`title-${project.slug}`} className={styles.sceneTitle} data-reveal aria-label={project.title}>
        {direction.title.map((line) => <span key={line} aria-hidden="true">{line}</span>)}
      </h3>
      <figure className={styles.sceneMedia} data-reveal>
        {project.slug === "dreamlink" ? <>
          <div className={styles.duality} aria-hidden="true"><span>Reality<span>Shared information</span></span><span>Dream<span>Coordinated actions</span></span><b>↔</b></div>
          <figcaption>Reality / Dream — editorial interpretation of the documented concept. No production artwork.</figcaption>
        </> : cover ? <>
          <Artwork image={cover} />{secondary && <Artwork image={secondary} secondary />}
          <figcaption>{project.slug === "wobble-bomber" ? "Arena map · Original game design document" : project.media.cover?.src.endsWith(".png") ? "Original game artwork" : "Original gameplay stills"}</figcaption>
        </> : <figcaption>Design documentation · Original concept</figcaption>}
      </figure>
      {project.slug === "wobble-bomber" && <p className={styles.arenaNote}>5v5 elimination<br />Five-second fuse<br />Symmetrical arena</p>}
      {project.slug === "dreamlink" && <p className={styles.dreamSubtitle}>The Fractured Timeline</p>}
    </div>
    <div className={styles.sceneFooter} data-reveal>
      <div><p className={styles.role}>{project.role}</p><p className={styles.statement}>{direction.statement}</p></div>
      <button type="button" ref={buttonRef} onClick={onDiscover} className={styles.discover}
        aria-expanded={expanded} aria-controls={`case-${project.slug}`} aria-label={`${expanded ? "Close" : "Discover"} project: ${project.title}`}>
        {expanded ? "Close Project" : "Discover Project"}<ArrowUpRight size={21} aria-hidden="true" />
      </button>
    </div>
  </article>;
}
