"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import { editorialSans } from "./editorialFonts";
import { InlineCaseStudy } from "./InlineCaseStudy";
import styles from "./SelectedWork.module.css";

const CATEGORIES = [...new Set(PROJECTS.map((project) => project.category))];
const FEATURED_SLUG = "detective-iq-3";

export function SelectedWork() {
  const [filter, setFilter] = useState<Project["category"] | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>());
  const reducedMotion = useReducedMotion();
  const projects = filter ? PROJECTS.filter((project) => project.category === filter) : PROJECTS;
  const selectedProject = PROJECTS.find((project) => project.slug === selectedSlug);
  const selectedIndex = projects.findIndex((project) => project.slug === selectedSlug);
  const gridStart = projects[0]?.slug === FEATURED_SLUG ? 1 : 0;
  // Insert the full-width detail after its desktop row, without moving tiles
  // into new component trees. On mobile it is at most one tile below its trigger.
  const panelIndex = selectedIndex < gridStart ? selectedIndex :
    Math.min(projects.length - 1, gridStart + Math.floor((selectedIndex - gridStart) / 2) * 2 + 1);

  useEffect(() => {
    const syncFragment = () => {
      const project = PROJECTS.find((item) => `#project-${item.slug}` === window.location.hash);
      setPreview(null);
      setSelectedSlug(project?.slug ?? null);
      if (project) setFilter((current) => current && current !== project.category ? project.category : current);
    };
    syncFragment();
    window.addEventListener("hashchange", syncFragment);
    window.addEventListener("popstate", syncFragment);
    return () => {
      window.removeEventListener("hashchange", syncFragment);
      window.removeEventListener("popstate", syncFragment);
    };
  }, []);

  useEffect(() => {
    if (!selectedSlug) return;
    const frame = requestAnimationFrame(() => {
      const heading = document.getElementById(`project-${selectedSlug}`);
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: "start", behavior: reducedMotion ? "instant" : "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedSlug, reducedMotion]);

  const closeCaseStudy = () => {
    const slug = selectedSlug;
    setPreview(null);
    setSelectedSlug(null);
    window.history.pushState(null, "", "#work");
    requestAnimationFrame(() => {
      const trigger = slug ? triggerRefs.current.get(slug) : undefined;
      trigger?.focus({ preventScroll: true });
      trigger?.scrollIntoView({ block: "center", behavior: reducedMotion ? "instant" : "smooth" });
    });
  };

  const selectProject = (project: Project) => {
    if (selectedSlug === project.slug) { closeCaseStudy(); return; }
    setPreview(null);
    setSelectedSlug(project.slug);
    window.history.pushState(null, "", `#project-${project.slug}`);
  };

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
              aria-controls="work-gallery" onClick={() => {
                setPreview(null);
                setFilter(category);
                if (selectedProject && category && selectedProject.category !== category) {
                  setSelectedSlug(null);
                  window.history.replaceState(null, "", "#work");
                }
              }}>
              {category ?? "All Work"}
            </button>
          ))}
        </nav>
        <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">
          {projects.length} projects shown. {filter ?? "All Work"}.
        </p>
        <div id="work-gallery" className={styles.gallery}>
          {projects.map((project, index) => (
            <Fragment key={project.slug}>
            <motion.article key={project.slug} layout={reducedMotion ? false : "position"} initial={false}
              className={project.slug === FEATURED_SLUG ? styles.featured : styles.tile}
              transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}>
              <motion.div initial={reducedMotion ? false : { opacity: 0.7, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: reducedMotion ? 0 : 0.4 }}>
                <h3 className={styles.tileHeading}>
                <button type="button" className={styles.projectLink}
                  ref={(node) => { if (node) triggerRefs.current.set(project.slug, node); else triggerRefs.current.delete(project.slug); }}
                  aria-expanded={selectedSlug === project.slug} aria-controls="work-case-study"
                  onClick={() => selectProject(project)}
                  aria-labelledby={`work-title-${project.slug} work-action-${project.slug}`}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine)").matches) setPreview(project.slug);
                  }}
                  onPointerLeave={() => setPreview(null)}
                  onFocus={(event) => { if (event.currentTarget.matches(":focus-visible")) setPreview(project.slug); }}
                  onBlur={() => setPreview(null)}>
                  <ProjectMedia project={project} active={!selectedSlug && preview === project.slug} />
                  <span className={styles.caption}>
                    <span className={styles.projectInfo}>
                      <span className={styles.projectTitle} id={`work-title-${project.slug}`}>{project.title}</span>
                      <span className={styles.projectRole}>{project.role} · {project.category}</span>
                    </span>
                    <span id={`work-action-${project.slug}`} className={styles.action}>
                      <span>{selectedSlug === project.slug ? "Close Case Study" : "Explore Project"}</span><ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </span>
                </button>
                </h3>
              </motion.div>
            </motion.article>
            {selectedProject && index === panelIndex && (
              <InlineCaseStudy key={selectedProject.slug} project={selectedProject} onClose={closeCaseStudy} />
            )}
            </Fragment>
          ))}
          {!selectedProject && <div id="work-case-study" hidden />}
        </div>
      </div>
    </section>
  );
}

function ProjectMedia({ project, active }: { project: Project; active: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const cover = project.media.cover;
  const previewVideo = project.media.gameplayVideos[0];
  const poster = cover?.src;
  const concept = project.category === "Original Concepts";

  useEffect(() => {
    const video = videoRef.current;
    const stage = stageRef.current;
    if (!active || !video || !stage || !previewVideo) return;
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
        video.src = previewVideo.src;
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
  }, [active, previewVideo]);

  return (
    <span ref={stageRef} className={`${styles.media} ${concept ? styles.conceptMedia : ""}`} aria-hidden="true">
      {poster && !imageFailed ? (
        <Image src={poster} alt="" fill
          sizes={project.slug === FEATURED_SLUG ? "(max-width: 767px) 80vw, 380px" : "(max-width: 767px) 85vw, 550px"}
          className={styles.poster} onError={() => setImageFailed(true)} />
      ) : (
        <span className={styles.fallback}>
          <span>{project.status}</span>
          <strong>{project.title}</strong><span>{project.role}</span>
        </span>
      )}
      {previewVideo && (
        <video ref={videoRef} className={`${styles.video} ${playing ? styles.playing : ""}`}
          preload="none" muted playsInline disablePictureInPicture tabIndex={-1}
          onPlaying={() => setPlaying(true)} onEnded={() => setPlaying(false)} onError={() => setPlaying(false)} />
      )}
    </span>
  );
}
