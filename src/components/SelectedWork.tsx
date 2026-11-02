"use client";

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PROJECTS } from "@/data/projects";
import { motionEase, motionTiming } from "@/lib/motion";
import { editorialSans } from "./editorialFonts";
import { ProjectGallery, WORK_FILTERS, type WorkFilter } from "./ProjectGallery";
import { InlineCaseStudy } from "./InlineCaseStudy";
import styles from "./SelectedWork.module.css";

type GalleryPosition = { filter: WorkFilter; offset: number; slug: string | null };
type Destination = { kind: "detail"; slug: string } | { kind: "gallery"; position: GalleryPosition; legacy?: boolean };

function readPosition(): GalleryPosition | null {
  const value = window.history.state?.workGallery;
  return value && WORK_FILTERS.includes(value.filter) && Number.isFinite(value.offset)
    && (value.slug === null || PROJECTS.some((project) => project.slug === value.slug))
    ? value as GalleryPosition : null;
}

function writeHistory(position: GalleryPosition, hash: string, push = false) {
  // Preserve Next's existing history fields.
  const state = { ...window.history.state, workGallery: position };
  if (push) window.history.pushState(state, "", hash);
  else window.history.replaceState(state, "", hash);
}

export function SelectedWork() {
  const [filter, setFilter] = useState<WorkFilter>("All Projects");
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [navigation, setNavigation] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const galleryPosition = useRef<GalleryPosition>({ filter: "All Projects", offset: -96, slug: null });
  const selectedRef = useRef<string | null>(null);
  const pending = useRef<Destination | null>(null);
  const lastSynced = useRef("");
  const reducedMotion = useReducedMotion();
  const selected = PROJECTS.find((project) => project.slug === selectedSlug);

  useEffect(() => {
    function sync(event?: Event) {
      // A history traversal can dispatch both events for the same location.
      if (event?.type === "hashchange" && lastSynced.current === window.location.href) return;
      lastSynced.current = window.location.href;
      const hash = window.location.hash;
      const project = PROJECTS.find((item) => ["project", "case", "scene", "lab"].some((prefix) => hash === `#${prefix}-${item.slug}`));
      const position = readPosition() ?? galleryPosition.current;
      galleryPosition.current = position;
      setFilter(position.filter);
      const wasDetail = selectedRef.current !== null;
      const detail = project && (hash.startsWith("#project-") || hash.startsWith("#case-"));
      selectedRef.current = detail ? project.slug : null;
      setSelectedSlug(selectedRef.current);
      if (detail) pending.current = { kind: "detail", slug: project.slug };
      else if (project) {
        // Legacy scene/lab links now identify the matching gallery item.
        const legacyPosition = { ...position, filter: "All Projects" as const, slug: project.slug };
        galleryPosition.current = legacyPosition;
        setFilter(legacyPosition.filter);
        pending.current = { kind: "gallery", position: legacyPosition, legacy: true };
      } else if (wasDetail && (hash === "#work" || !hash)) pending.current = { kind: "gallery", position };
      else pending.current = null;
      setNavigation((value) => value + 1);
    }
    function onWorkLink(event: globalThis.MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest("a") : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank") return;
      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || url.hash !== "#work") return;
      // Next's same-page links may push history without a native hashchange.
      // Let the existing link handle scrolling and focus while we show the gallery.
      pending.current = null;
      selectedRef.current = null;
      setSelectedSlug(null);
    }
    sync();
    document.addEventListener("click", onWorkLink, true);
    window.addEventListener("popstate", sync);
    window.addEventListener("hashchange", sync);
    return () => {
      document.removeEventListener("click", onWorkLink, true);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  useLayoutEffect(() => {
    const destination = pending.current;
    if (!destination) return;
    pending.current = null;
    if (destination.kind === "detail") {
      const heading = document.getElementById(`project-${destination.slug}`);
      heading?.focus({ preventScroll: true });
      heading?.scrollIntoView({ block: "start", behavior: reducedMotion === false ? "smooth" : "instant" });
    } else {
      const card = document.getElementById(`gallery-${destination.position.slug}`);
      (card ?? document.getElementById("work-heading"))?.focus({ preventScroll: true });
      if (destination.legacy) card?.scrollIntoView({ block: "center", behavior: reducedMotion === false ? "smooth" : "instant" });
      else if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: Math.max(0, sectionTop + destination.position.offset), behavior: "instant" });
        const bounds = card?.getBoundingClientRect();
        // A changed breakpoint can move the originating item away from its saved offset.
        if (bounds && (bounds.bottom < 80 || bounds.top > window.innerHeight)) {
          card?.scrollIntoView({ block: "center", behavior: "instant" });
        }
      }
    }
  }, [selectedSlug, navigation, reducedMotion]);

  function openProject(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const sectionTop = (sectionRef.current?.getBoundingClientRect().top ?? 0) + window.scrollY;
    const position = { filter, offset: window.scrollY - sectionTop, slug };
    galleryPosition.current = position;
    writeHistory(position, "#work");
    writeHistory(position, `#project-${slug}`, true);
    pending.current = { kind: "detail", slug };
    selectedRef.current = slug;
    setSelectedSlug(slug);
    setNavigation((value) => value + 1);
  }

  function backToGallery() {
    const position = galleryPosition.current;
    writeHistory(position, "#work", true);
    pending.current = { kind: "gallery", position };
    selectedRef.current = null;
    setSelectedSlug(null);
    setFilter(position.filter);
    setNavigation((value) => value + 1);
  }

  function changeFilter(next: WorkFilter) {
    setFilter(next);
    galleryPosition.current = { filter: next, offset: galleryPosition.current.offset, slug: null };
    writeHistory(galleryPosition.current, "#work");
  }

  return (
    <section ref={sectionRef} id="work" aria-labelledby="work-heading" className={`${styles.section} ${editorialSans.className}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>02 / Selected Work</p>
            <h2 id="work-heading" tabIndex={-1}>Selected work.</h2>
          </div>
          <p>An exploration of games, systems, puzzles, and original concepts.</p>
        </header>
        <motion.div key={selected?.slug ?? "gallery"} initial={false}
          animate={reducedMotion === false ? { opacity: [0.75, 1], y: [8, 0] } : { opacity: 1, y: 0 }}
          transition={{ duration: reducedMotion === false ? motionTiming.content : 0, ease: motionEase.ui }}>
          {selected
            ? <InlineCaseStudy key={selected.slug} project={selected} onClose={backToGallery} />
            : <ProjectGallery filter={filter} onFilter={changeFilter} onOpen={openProject} />}
        </motion.div>
      </div>
    </section>
  );
}
