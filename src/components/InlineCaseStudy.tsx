"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowLeft, ArrowUp } from "lucide-react";
import { PORTFOLIO_SOURCE, type Project, type ProjectImage, type GameplayVideo } from "@/data/projects";
import styles from "./SelectedWork.module.css";

export function InlineCaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const [videoIndex, setVideoIndex] = useState(0);
  const media = project.media;
  const leadImage = media.cover ?? media.designDiagrams[0];
  const collections: { title: string; images: ProjectImage[] }[] = [
    { title: "Gameplay screenshots", images: media.screenshots },
    { title: "Concept artwork", images: media.conceptArt },
    { title: "Level sketches", images: media.levelSketches },
    { title: "Design diagrams", images: media.cover ? media.designDiagrams : media.designDiagrams.slice(1) },
  ];
  const hasMedia = media.gameplayVideos.length > 0 || collections.some((item) => item.images.length > 0);

  return (
    <section className={styles.caseStudy} aria-labelledby={`project-${project.slug}`}
      onKeyDown={(event) => { if (event.key === "Escape") { event.stopPropagation(); onClose(); } }}>
      <button type="button" onClick={onClose} className={styles.closeCase}><ArrowLeft size={18} aria-hidden="true" />Back to Gallery</button>
      <header className={styles.caseHeader}>
        <p className={styles.caseStatus}><span>{project.category}</span><span>{project.status}</span></p>
        <h3 id={`project-${project.slug}`} tabIndex={-1}>{project.title}</h3>
        <p className={styles.caseRole}>{project.role}</p>
      </header>
      <div className={styles.caseOverview}><p>{project.summary}</p></div>
      {leadImage && <figure className={styles.leadMedia}>
        <Image src={leadImage.src} alt={leadImage.alt} width={leadImage.width} height={leadImage.height}
          sizes="(max-width: 640px) 85vw, 65vw" />
        <figcaption>{leadImage.alt}</figcaption>
      </figure>}
      <section className={styles.caseChapter} aria-labelledby={`design-${project.slug}`}>
        <div className={styles.chapterHeading}><span aria-hidden="true">01</span><h4 id={`design-${project.slug}`}>The design</h4></div>
        <div className={styles.chapterContent}>
          <h5>Role &amp; contributions</h5>
          <ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
          {project.coreMechanics.length > 0 && <><h5>Core gameplay mechanics</h5>
            <dl className={styles.mechanics}>{project.coreMechanics.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl></>}
          {project.designProcess.length > 0 && <><h5>Game &amp; level design process</h5>
            <ol className={styles.designProcess}>{project.designProcess.map((item) => <li key={item}>{item}</li>)}</ol></>}
          {(project.challenge || project.playerExperience) && <div className={styles.designDecisions}>
            {project.challenge && <div><h5>Challenges &amp; decisions</h5><p>{project.challenge}</p></div>}
            {project.playerExperience && <div><h5>Player experience</h5><p>{project.playerExperience}</p></div>}
          </div>}
          {project.results?.length ? <><h5>Reported results</h5><ul>{project.results.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
        </div>
      </section>
      {hasMedia && <section className={styles.caseChapter} aria-labelledby={`media-${project.slug}`}>
        <div className={styles.chapterHeading}><span aria-hidden="true">02</span><h4 id={`media-${project.slug}`}>In detail</h4></div>
        <div className={styles.chapterContent}>
          {media.gameplayVideos.length > 0 && <>
            <h5>Original gameplay footage</h5>
            {media.gameplayVideos.length > 1 && <div className={styles.videoIndex} aria-label="Choose gameplay footage" role="group">
              {media.gameplayVideos.map((video, index) => <button key={video.src} type="button" aria-pressed={videoIndex === index}
                onClick={() => setVideoIndex(index)}>{video.title}</button>)}
            </div>}
            <GameplayPlayer key={media.gameplayVideos[videoIndex].src} video={media.gameplayVideos[videoIndex]} />
          </>}
          {collections.filter((item) => item.images.length > 0).map((collection) => <div key={collection.title} className={styles.mediaCollection}>
            <h5>{collection.title}</h5><div className={styles.caseMediaGrid}>{collection.images.map((item) => <figure key={item.src}>
              <Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 767px) 85vw, 65vw" />
              <figcaption>{item.alt}</figcaption>
            </figure>)}</div>
          </div>)}
        </div>
      </section>}
      <section className={`${styles.caseChapter} ${styles.caseLinks}`} aria-labelledby={`sources-${project.slug}`}>
        <div className={styles.chapterHeading}><span aria-hidden="true">{hasMedia ? "03" : "02"}</span><h4 id={`sources-${project.slug}`}>Go further</h4></div>
        <div className={styles.chapterContent}><p>Project destinations and design documentation.</p>
          <ul>{project.links.map((link) => <li key={link.href}>
            <a href={link.href} download={link.href.startsWith("/documents/") || undefined}
              target={link.href.startsWith("/") ? undefined : "_blank"}
              rel={link.href.startsWith("/") ? undefined : "noopener noreferrer"}>
              {link.label}<ArrowUpRight size={18} aria-hidden="true" />
              {!link.href.startsWith("/") && <span className={styles.srOnly}> (opens in a new tab)</span>}</a>
          </li>)}<li><a href={`${PORTFOLIO_SOURCE}#${project.sourceSections[0]}`} target="_blank" rel="noopener noreferrer">
            Original portfolio<ArrowUpRight size={18} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span>
          </a></li></ul>
        </div>
      </section>
      <footer className={styles.caseFooter}><span>{project.title}</span>
        <button type="button" className={styles.closeCase} onClick={onClose}>Back to Gallery<ArrowUp size={16} aria-hidden="true" /></button>
      </footer>
    </section>
  );
}

function GameplayPlayer({ video }: { video: GameplayVideo }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = window.IntersectionObserver ? new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) element.pause(); }) : null;
    const hide = () => { if (document.hidden) element.pause(); };
    observer?.observe(element);
    document.addEventListener("visibilitychange", hide);
    return () => { observer?.disconnect(); document.removeEventListener("visibilitychange", hide); element.pause(); element.removeAttribute("src"); element.load(); };
  }, []);
  return <figure className={styles.gameplayFigure}>
    <video ref={ref} src={video.src} poster={video.poster} width={video.width} height={video.height}
      controls playsInline preload="none" aria-label={video.title} />
    <figcaption>{video.title}</figcaption>
  </figure>;
}
