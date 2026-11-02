"use client";

import { type MouseEvent } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { PROJECTS, type Project } from "@/data/projects";
import { motionEase, motionTiming } from "@/lib/motion";
import styles from "./SelectedWork.module.css";

export const WORK_FILTERS = ["All Projects", "Published Games", "Original Concepts"] as const;
export type WorkFilter = (typeof WORK_FILTERS)[number];

export function ProjectGallery({ filter, onFilter, onOpen }: {
  filter: WorkFilter; onFilter: (filter: WorkFilter) => void;
  onOpen: (event: MouseEvent<HTMLAnchorElement>, slug: string) => void;
}) {
  const reducedMotion = useReducedMotion();
  const visible = PROJECTS.filter((project) => filter === "All Projects"
    || (filter === "Published Games" ? project.status === "Published mobile game" : project.status === "Original design concept"));
  return <>
    <div className={styles.galleryToolbar}>
      <div className={styles.filters} role="group" aria-label="Filter projects">
        {WORK_FILTERS.map((item) => <button key={item} type="button" onClick={() => onFilter(item)}
          aria-pressed={filter === item} aria-controls="project-gallery">{item}</button>)}
      </div>
      <p className={styles.projectCount} role="status" aria-live="polite" aria-atomic="true">{String(visible.length).padStart(2, "0")} projects <span className={styles.srOnly}>in {filter}</span></p>
    </div>
    <motion.ul id="project-gallery" key={filter} className={styles.gallery} initial={false}
      animate={reducedMotion === false ? { opacity: [0.8, 1] } : { opacity: 1 }}
      transition={{ duration: reducedMotion === false ? motionTiming.content : 0, ease: motionEase.ui }}>
      {visible.map((project) => <GalleryItem key={project.slug} project={project} onOpen={onOpen} />)}
    </motion.ul>
  </>;
}

function GalleryItem({ project, onOpen }: { project: Project; onOpen: (event: MouseEvent<HTMLAnchorElement>, slug: string) => void }) {
  const featured = project.slug === "detective-iq-3";
  const image = project.media.cover ?? project.media.designDiagrams[0] ?? project.media.screenshots[0];
  return <li className={`${styles.galleryItem} ${featured ? styles.featured : ""}`}>
    <a id={`gallery-${project.slug}`} href={`#project-${project.slug}`} className={styles.projectLink}
      onClick={(event) => onOpen(event, project.slug)} aria-labelledby={`gallery-title-${project.slug}`} aria-describedby={`gallery-meta-${project.slug} gallery-role-${project.slug}`}>
      <div className={`${styles.galleryMedia} ${!project.media.cover ? styles.conceptMedia : ""}`}>
        {image ? <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
          sizes={featured ? "(max-width: 640px) 80vw, (max-width: 1000px) 45vw, 36vw" : "(max-width: 640px) 80vw, 40vw"}
          className={styles.galleryImage} />
          : <div className={styles.editorialVisual} aria-hidden="true">
            <span>Reality / Dream</span><strong>DreamLink<span>The Fractured Timeline</span></strong><span>Two players. One fractured timeline.</span>
          </div>}
        {!project.media.cover && <span className={styles.visualCaption}>{image ? "Original design documentation" : "Editorial treatment / Design concept"}</span>}
      </div>
      <div className={styles.galleryCaption}>
        <div id={`gallery-meta-${project.slug}`} className={styles.cardMeta}><span>{featured ? "Featured project" : project.category}</span><span>{project.status}</span></div>
        <div className={styles.cardTitleRow}><h3 id={`gallery-title-${project.slug}`}>{project.title}</h3><ArrowUpRight aria-hidden="true" size={24} /></div>
        <p id={`gallery-role-${project.slug}`} className={styles.cardRole}>{project.role}</p>
        {featured && <p className={styles.featuredCategory}>{project.category}</p>}
        <span className={styles.explore}>Explore project <span aria-hidden="true">↗</span></span>
      </div>
    </a>
  </li>;
}
