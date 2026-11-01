"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { PORTFOLIO_SOURCE, type Project, type ProjectImage, type GameplayVideo } from "@/data/projects";
import styles from "./SelectedWork.module.css";

export function InlineCaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const media = project.media;
  const collections: { title: string; images: ProjectImage[] }[] = [
    { title: "Gameplay screenshots", images: media.screenshots },
    { title: "Concept artwork", images: media.conceptArt },
    { title: "Level sketches", images: media.levelSketches },
    { title: "Design diagrams", images: media.designDiagrams },
  ];

  useEffect(() => {
    const element = root.current;
    return () => {
      element?.querySelectorAll("video").forEach((video) => {
        video.pause();
        video.removeAttribute("src");
        video.load();
      });
    };
  }, []);

  return (
    <motion.section id="work-case-study" ref={root} className={styles.caseStudy}
      aria-labelledby={`project-${project.slug}`} initial={reducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
      <header className={styles.caseHeader}>
        <div>
          <p className={styles.caseStatus}>{project.status}</p>
          <h3 id={`project-${project.slug}`} tabIndex={-1}>{project.title}</h3>
        </div>
        <button type="button" onClick={onClose} className={styles.closeCase}>
          Close <X size={18} aria-hidden="true" />
        </button>
      </header>
      <div className={styles.overview}>
        <h4>Project overview</h4>
        <p>{project.summary}</p>
      </div>
      <details className={styles.disclosure} open>
        <summary>Role &amp; contributions</summary>
        <p className={styles.discipline}>{project.role}</p>
        <ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
      </details>
      {project.coreMechanics.length > 0 && (
        <details className={styles.disclosure}>
          <summary>Core gameplay mechanics</summary>
          <dl className={styles.mechanics}>
            {project.coreMechanics.map((mechanic) => (
              <div key={mechanic.title}><dt>{mechanic.title}</dt><dd>{mechanic.description}</dd></div>
            ))}
          </dl>
        </details>
      )}
      {project.designProcess.length > 0 && (
        <details className={styles.disclosure}>
          <summary>Design process &amp; player experience</summary>
          <ul>{project.designProcess.map((item) => <li key={item}>{item}</li>)}</ul>
          {project.challenge && <><h4>Design challenge</h4><p>{project.challenge}</p></>}
          {project.playerExperience && <><h4>Player experience</h4><p>{project.playerExperience}</p></>}
        </details>
      )}
      {media.gameplayVideos.length > 0 && (
        <details className={styles.disclosure} onToggle={(event) => {
          if (!event.currentTarget.open) event.currentTarget.querySelectorAll("video").forEach((video) => {
            video.pause(); video.currentTime = 0;
          });
        }}>
          <summary>Gameplay footage</summary>
          <div className={styles.caseMediaGrid}>
            {media.gameplayVideos.map((video) => <GameplayPlayer key={video.src} video={video} />)}
          </div>
        </details>
      )}
      {collections.filter((collection) => collection.images.length > 0).map((collection) => (
        <details key={collection.title} className={styles.disclosure}>
          <summary>{collection.title}</summary>
          <div className={styles.caseMediaGrid}>
            {collection.images.map((item) => (
              <figure key={item.src}>
                <Image src={item.src} alt={item.alt} width={item.width} height={item.height}
                  sizes="(max-width: 767px) 90vw, 520px" />
                <figcaption>{item.alt}</figcaption>
              </figure>
            ))}
          </div>
        </details>
      ))}
      {project.results?.length ? (
        <details className={styles.disclosure}>
          <summary>Reported results</summary>
          <ul>{project.results.map((item) => <li key={item}>{item}</li>)}</ul>
        </details>
      ) : null}
      <div className={styles.caseLinks}>
        <h4>Links &amp; documentation</h4>
        <div>
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}<ArrowUpRight size={15} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span>
            </a>
          ))}
          <a href={`${PORTFOLIO_SOURCE}#${project.sourceSections[0]}`} target="_blank" rel="noopener noreferrer">
            Original portfolio<ArrowUpRight size={15} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span>
          </a>
        </div>
      </div>
      <button type="button" className={styles.closeCase} onClick={onClose}>Back to project gallery <X size={16} aria-hidden="true" /></button>
    </motion.section>
  );
}

function GameplayPlayer({ video }: { video: GameplayVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) element.pause();
    });
    const hide = () => { if (document.hidden) element.pause(); };
    observer.observe(element);
    document.addEventListener("visibilitychange", hide);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", hide); element.pause(); };
  }, []);
  return (
    <figure>
      <video ref={ref} src={video.src} poster={video.poster} width={video.width} height={video.height}
        controls playsInline preload="none" aria-label={video.title}
        onPlay={(event) => {
          const current = event.currentTarget;
          current.closest("#work-case-study")?.querySelectorAll("video").forEach((other) => {
            if (other !== current) other.pause();
          });
        }} />
      <figcaption>{video.title}</figcaption>
    </figure>
  );
}
