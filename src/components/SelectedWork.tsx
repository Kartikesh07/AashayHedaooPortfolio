"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { PROJECTS } from "@/data/projects";
import { editorialSans } from "./editorialFonts";
import { ProjectScene } from "./ProjectScene";
import { InlineCaseStudy } from "./InlineCaseStudy";
import styles from "./SelectedWork.module.css";

const CATEGORIES = [...new Set(PROJECTS.map((project) => project.category))];
export function SelectedWork() {
  const [filter, setFilter] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [navigation, setNavigation] = useState(0);
  const pending = useRef<{ slug: string; caseStudy: boolean } | null>(null);
  const buttons = useRef(new Map<string, HTMLButtonElement>());
  const reducedMotion = useReducedMotion();
  const visible = PROJECTS.filter((project) => !filter || project.category === filter);

  useEffect(() => {
    function sync() {
      const hash = window.location.hash;
      const project = PROJECTS.find((item) => ["project", "scene", "lab"].some((prefix) => hash === `#${prefix}-${item.slug}`));
      if (!project) { setOpenSlug(null); return; }
      const caseStudy = hash.startsWith("#project-");
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
    const frame = requestAnimationFrame(() => {
      const destination = pending.current;
      if (!destination) return;
      pending.current = null;
      const target = destination.caseStudy ? document.getElementById(`project-${destination.slug}`) : buttons.current.get(destination.slug);
      target?.focus({ preventScroll: true });
      const scrollTarget = destination.caseStudy ? target : document.getElementById(`scene-${destination.slug}`);
      scrollTarget?.scrollIntoView({ block: "start", behavior: reducedMotion ? "instant" : "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [openSlug, filter, reducedMotion, navigation]);

  function toggleCase(slug: string) {
    const caseStudy = openSlug !== slug;
    pending.current = { slug, caseStudy };
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
          const target = document.getElementById(`scene-${event.target.value}`);
          window.history.pushState(null, "", `#scene-${event.target.value}`);
          setOpenSlug(null);
          target?.focus({ preventScroll: true });
          requestAnimationFrame(() => target?.scrollIntoView({ block: "start", behavior: reducedMotion ? "instant" : "smooth" }));
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
          {openSlug === project.slug ? <InlineCaseStudy project={project} onClose={() => toggleCase(project.slug)} /> : <div id={`case-${project.slug}`} hidden />}
        </div>)}
      </div>
    </section>
  );
}
