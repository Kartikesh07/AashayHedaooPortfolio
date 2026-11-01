"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import { editorialSans } from "./editorialFonts";
import styles from "./SelectedWork.module.css";

const CATEGORIES = [...new Set(PROJECTS.map((project) => project.category))];
const FEATURED_SLUG = "detective-iq-3";
// Match the existing local clip posters, including the landscape Ricochet clip.
const VIDEO_POSTERS: Record<string, string> = {
  "detective-iq-3": "/images/VAG2aDeQqm4-poster.jpg",
  "krishna-stories": "/images/VAHRCS4mmpM-poster.jpg",
  "detective-iq-1": "/images/VAG3e9kp7K0-poster.jpg",
};

export function SelectedWork() {
  const [filter, setFilter] = useState<Project["category"] | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const projects = filter ? PROJECTS.filter((project) => project.category === filter) : PROJECTS;

  return (
    <section id="work" aria-labelledby="work-heading" className={`${styles.section} ${editorialSans.className}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="work-heading">Selected Work.</h2>
          <p>Games, systems &amp; design explorations.</p>
        </header>
        <nav className={styles.filters} aria-label="Filter selected work">
          {[null, ...CATEGORIES].map((category) => (
            <button type="button" key={category ?? "all"} aria-pressed={filter === category}
              aria-controls="work-gallery" onClick={() => { setPreview(null); setFilter(category); }}>
              {category ?? "All Work"}
            </button>
          ))}
        </nav>
        <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">
          {projects.length} projects shown. {filter ?? "All Work"}.
        </p>
        <div id="work-gallery" className={styles.gallery}>
          {projects.map((project) => (
            <motion.article key={project.slug} layout={reducedMotion ? false : "position"} initial={false}
              className={project.slug === FEATURED_SLUG ? styles.featured : styles.tile}
              transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div initial={reducedMotion ? false : { opacity: 0.7, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: reducedMotion ? 0 : 0.4 }}>
                <Link href={`/work/${project.slug}`} className={styles.projectLink}
                  aria-labelledby={`work-title-${project.slug} work-action-${project.slug}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) setPreview(project.slug);
                  }}
                  onPointerLeave={() => setPreview(null)}
                  onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setPreview(project.slug); }}
                  onBlur={() => setPreview(null)}>
                  <ProjectMedia project={project} active={preview === project.slug} />
                  <div className={styles.caption}>
                    <div className={styles.projectInfo}>
                      <h3 id={`work-title-${project.slug}`}>{project.title}</h3>
                      <p>{project.category === "Original Concepts" ? `Original concept · ${project.role}` : project.role}</p>
                    </div>
                    <span id={`work-action-${project.slug}`} className={styles.action}>
                      <span>View Case Study</span><ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectMedia({ project, active }: { project: Project; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const poster = VIDEO_POSTERS[project.slug] ?? project.heroPoster ?? project.heroImage ?? project.galleryImages[0] ?? project.sketches?.[0];
  const concept = project.category === "Original Concepts";

  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!active || !video || !stage || !project.heroVideo) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dataPreference = window.matchMedia("(prefers-reduced-data: reduce)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean; effectiveType?: string };
    }).connection;
    let disposed = false;
    let started = false;
    let deadline: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;
    const stop = () => {
      disposed = true;
      clearTimeout(deadline);
      video.pause();
      video.removeAttribute("src");
      video.load();
      setPlaying(false);
    };
    const allowed = () => !motionPreference.matches && !dataPreference.matches &&
      !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    const onPreferenceChange = () => { if (!allowed()) stop(); };
    const onVisibilityChange = () => { if (document.hidden) stop(); };
    // Idle tiles have no video source. Intent starts one short preview;
    // leaving, filtering, hiding the tab or scrolling away releases it.
    const intent = setTimeout(() => {
      if (!allowed() || document.hidden || disposed) return;
      observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio < 0.15) { stop(); return; }
        if (started || disposed) return;
        started = true;
        video.src = project.heroVideo!;
        void video.play().catch(() => { if (!disposed) stop(); });
        deadline = setTimeout(stop, 4500);
      }, { threshold: 0.15 });
      observer.observe(stage);
    }, 250);
    document.addEventListener("visibilitychange", onVisibilityChange);
    motionPreference.addEventListener("change", onPreferenceChange);
    dataPreference.addEventListener("change", onPreferenceChange);
    connection?.addEventListener("change", onPreferenceChange);
    return () => {
      clearTimeout(intent);
      observer?.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      motionPreference.removeEventListener("change", onPreferenceChange);
      dataPreference.removeEventListener("change", onPreferenceChange);
      connection?.removeEventListener("change", onPreferenceChange);
      stop();
    };
  }, [active, project.heroVideo]);

  return (
    <div ref={stageRef} className={`${styles.media} ${concept ? styles.conceptMedia : ""}`} aria-hidden="true">
      {poster && !imageFailed ? (
        <Image src={poster} alt="" fill
          sizes={project.slug === FEATURED_SLUG ? "(max-width: 767px) 80vw, 380px" : "(max-width: 767px) 85vw, 550px"}
          className={styles.poster} onError={() => setImageFailed(true)} />
      ) : (
        <div className={styles.fallback}>
          <span>{concept ? "From the design document" : project.category}</span>
          <strong>{project.coreMechanics[0]?.title ?? project.title}</strong><p>{project.tagline}</p>
        </div>
      )}
      {project.heroVideo && (
        <video ref={videoRef} className={`${styles.video} ${playing ? styles.playing : ""}`}
          preload="none" muted playsInline disablePictureInPicture tabIndex={-1}
          onPlaying={() => setPlaying(true)} onEnded={() => setPlaying(false)} onError={() => setPlaying(false)} />
      )}
    </div>
  );
}
