"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "motion/react";
import { motionEase, motionTiming } from "@/lib/motion";
import { PROJECTS } from "@/data/projects";
import { editorialSans } from "./editorialFonts";
import { ProjectScene } from "./ProjectScene";
import { InlineCaseStudy } from "./InlineCaseStudy";
import styles from "./SelectedWork.module.css";

const CATEGORIES = [...new Set(PROJECTS.map((project) => project.category))];
export function SelectedWork() {
  const [filter, setFilter] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [settledSlug, setSettledSlug] = useState<string | null>(null);
  const [navigation, setNavigation] = useState(0);
  const pending = useRef<{ slug: string; caseStudy: boolean } | null>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const reducedMotion = useReducedMotion();
  const visible = PROJECTS.filter((project) => !filter || project.category === filter);

  useEffect(() => {
    function sync() {
      const hash = window.location.hash;
      const project = PROJECTS.find((item) => ["project", "scene", "lab"].some((prefix) => hash === `#${prefix}-${item.slug}`));
      if (!project) { pending.current = null; setOpenSlug(null); setSettledSlug(null); return; }
      const caseStudy = hash.startsWith("#project-");
      if (!caseStudy) setSettledSlug(null);
      pending.current = { slug: project.slug, caseStudy };
      setFilter((current) => current && current !== project.category ? "" : current);
      setOpenSlug(caseStudy ? project.slug : null);
      setNavigation((value) => value + 1);
    }
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => { window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, []);

  useEffect(() => {
    if (!pending.current) return;
    if (pending.current.caseStudy && reducedMotion === false && settledSlug !== pending.current.slug) return;
    const frame = requestAnimationFrame(() => {
      const destination = pending.current;
      if (!destination) return;
      pending.current = null;
      const target = destination.caseStudy ? document.getElementById(`project-${destination.slug}`) : buttons.current.get(destination.slug);
      target?.focus({ preventScroll: true });
      const scrollTarget = destination.caseStudy ? target : document.getElementById(`scene-${destination.slug}`);
      scrollTarget?.scrollIntoView({ block: "start", behavior: reducedMotion !== false ? "instant" : "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [openSlug, filter, reducedMotion, navigation, settledSlug]);

  function toggleCase(slug: string) {
    const caseStudy = openSlug !== slug;
    pending.current = { slug, caseStudy };
    if (!caseStudy) buttons.current.get(slug)?.focus({ preventScroll: true });
    setSettledSlug(null);
    setOpenSlug(caseStudy ? slug : null);
    window.history.pushState(null, "", `#${caseStudy ? "project" : "scene"}-${slug}`);
  }

  return (
    <section id="work" aria-labelledby="work-heading" className={`${styles.section} ${editorialSans.className}`}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>The work, unframed.</p><h2 id="work-heading">Selected work.</h2></div>
        <p>Games, systems, and worlds<br />shaped through design.</p>
      </header>
      <nav className={styles.navigation} aria-label="Explore selected work">
        <label>View<select value={filter} onChange={(event) => {
          pending.current = null; setFilter(event.target.value); setOpenSlug(null);
          window.history.replaceState(null, "", "#work");
        }} aria-controls="work-scenes">
          <option value="">All work</option>{CATEGORIES.map((category) => <option key={category}>{category}</option>)}
        </select></label>
        <label>Jump to<select value="" onChange={(event) => {
          const slug = event.target.value;
          pending.current = { slug, caseStudy: false };
          window.history.pushState(null, "", `#scene-${slug}`);
          setOpenSlug(null);
          setNavigation((value) => value + 1);
        }}>
          <option value="" disabled>Choose a project</option>
          {visible.map((project) => <option key={project.slug} value={project.slug}>{project.title}</option>)}
        </select></label>
        <span className={styles.projectCount}>{String(visible.length).padStart(2, "0")} projects</span>
      </nav>
      <p className={styles.srOnly} role="status">{visible.length} projects shown in {filter || "All work"}.</p>
      <div id="work-scenes">
        {visible.map((project, index) => <div key={project.slug}>
          <ProjectScene project={project} index={index} total={visible.length} expanded={openSlug === project.slug}
            buttonRef={(node) => { if (node) buttons.current.set(project.slug, node); else buttons.current.delete(project.slug); }}
            onDiscover={() => toggleCase(project.slug)} />
          <div id={`case-${project.slug}`}>
            <AnimatePresence initial={false} onExitComplete={() => {
              // Re-align after a panel above the destination has finished collapsing.
              if (window.location.hash.startsWith("#scene-")) {
                const slug = window.location.hash.slice(7);
                pending.current = { slug, caseStudy: false };
                setNavigation((value) => value + 1);
              }
            }}>
              {openSlug === project.slug && <CaseTransition key={project.slug} reducedMotion={reducedMotion}
                onEntered={() => setSettledSlug(project.slug)}>
                <InlineCaseStudy project={project} onClose={() => toggleCase(project.slug)} />
              </CaseTransition>}
            </AnimatePresence>
          </div>
        </div>)}
      </div>
    </section>
  );
}

function CaseTransition({ children, reducedMotion, onEntered }: {
  children: React.ReactNode; reducedMotion: boolean | null; onEntered: () => void;
}) {
  const present = useIsPresent();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!present) ref.current?.querySelectorAll("video").forEach((video) => video.pause());
  }, [present]);
  return <motion.div ref={ref} className={styles.caseTransition} inert={!present} aria-hidden={!present}
    initial={reducedMotion !== false ? false : { height: 0, opacity: 0.6 }}
    animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
    transition={{ duration: reducedMotion !== false ? 0 : motionTiming.expand, ease: motionEase.ui }}
    onAnimationComplete={() => { if (present) onEntered(); }}>
    {children}
  </motion.div>;
}
