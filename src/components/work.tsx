"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, FileText, Play, Plus, X } from "lucide-react";
import { mediaFor, projects, source, type Asset, type Project } from "@/data/portfolio";
import { chapterHeadings, documents, originalLinkLabel } from "@/data/atlas";
import { Gallery, ProjectVideo } from "./gallery";
import { Retention } from "./retention";

function ChapterMedia({ asset, title, onExplore, index }: { asset: Asset; title: string; onExplore: () => void; index: number }) {
  const [playing, setPlaying] = useState(false);
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) setPlaying(false); }, { threshold: .1 });
    if (element.current) observer.observe(element.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={element} className={`chapter-media chapter-media-${index} ${asset.width > asset.height ? "landscape-media" : "portrait-media"}`}>
    {playing ? <div className="chapter-player"><ProjectVideo asset={asset} label={`${title}, original gameplay`} /><button className="media-back" onClick={() => setPlaying(false)}><X size={14} />Return to artwork</button></div> : <button className="media-entry" onClick={() => asset.src.endsWith(".mp4") ? setPlaying(true) : onExplore()} aria-label={`${asset.src.endsWith(".mp4") ? "Open gameplay video for" : "Explore"} ${title}`}>
      <Image src={asset.poster || asset.src} alt={`${title}, original ${asset.poster ? "gameplay frame" : "game artwork"}`} width={asset.width} height={asset.height} sizes="(max-width: 700px) 85vw, 40vw" />
      <span className="media-entry-label">{asset.src.endsWith(".mp4") ? <><Play size={16} />Watch gameplay</> : <>Explore the work<ArrowUpRight size={16} /></>}</span>
    </button>}
  </div>;
}

function ProjectChapter({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [inView, setInView] = useState(false);
  const detail = useRef<HTMLDetailsElement>(null);
  const chapter = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const media = project.sections.flatMap(mediaFor).filter((asset, i, all) => all.findIndex((entry) => entry.id === asset.id) === i);
  const stageMedia = index === 3 ? [media.find((a) => a.width > a.height), media[0]].filter((a): a is Asset => !!a) : index === 4 ? [media[0], media[1]].filter(Boolean) : media.slice(0, index === 1 ? 1 : 3);
  function explore() {
    if (detail.current) detail.current.open = true;
    setExpanded(true);
    requestAnimationFrame(() => {
      detail.current?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
      detail.current?.querySelector("summary")?.focus({ preventScroll: true });
    });
  }
  function close() {
    if (detail.current) detail.current.open = false;
    setExpanded(false);
    chapter.current?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    detail.current?.querySelector("summary")?.focus({ preventScroll: true });
  }
  const documentBased = project.category === "Personal";
  return <motion.article ref={chapter} id={`project-${project.slug}`} tabIndex={-1} data-destination
    className={`world-chapter world-${project.slug} ${inView ? "world-in-view" : ""}`}
    onViewportEnter={() => setInView(true)} onViewportLeave={() => setInView(false)} viewport={{ amount: .08 }}>
    <div className="chapter-boundary"><span className="annotation">DESTINATION {project.number}</span><span className="chapter-boundary-line" /><span className="annotation">{documentBased ? "PERSONAL PROJECT / DESIGN DOCUMENTATION" : "MOBILE / GAME & LEVEL DESIGN"}</span></div>
    <div className="world-heading"><span className="world-number annotation">{project.number} / 07</span><h3>{project.title}</h3><a href={index < projects.length - 1 ? `#project-${projects[index + 1].slug}` : "#process"} className="square-control" aria-label="Continue to next destination"><ArrowDown size={20} /></a></div>
    {stageMedia.length ? <motion.div className="world-media" initial={false} animate={{ opacity: inView ? 1 : .75 }} transition={{ duration: reduced ? 0 : .6 }}>
      <span className="media-field-note annotation">{project.number} / ORIGINAL GAME MEDIA</span>
      {stageMedia.map((asset, i) => <ChapterMedia key={asset.id} asset={asset} title={project.title} onExplore={explore} index={i} />)}
    </motion.div> : <div className="document-landscape">
      <div className="document-spine"><FileText size={24} strokeWidth={1} /><span className="annotation">ORIGINAL DESIGN DOCUMENT</span><span className="document-edition annotation">{project.number} / A.H.</span></div>
      <div className="document-extract"><span className="annotation">{index === 5 ? "GAME DESIGN / LEVEL DESIGN" : "CO-OPERATIVE PUZZLE / NARRATIVE DESIGN"}</span><p>{project.overview.split("\n\n").at(-1)}</p><button className="route-link" onClick={explore}>Open the design<ArrowUpRight size={21} /></button></div>
      <div className="document-fold" aria-hidden="true"><span>{project.number}</span><span className="annotation">CONCEPT<br />&amp; MECHANICS</span></div>
    </div>}
    <div className="world-caption"><span className="annotation">{documentBased ? "DESIGN SYNOPSIS" : "DESIGN CONTRIBUTION"}</span><p>{documentBased ? project.title : project.overview}</p><button className="route-link" onClick={explore}>Explore project<Plus size={20} strokeWidth={1.5} /></button></div>
    <details ref={detail} className="world-case" onToggle={(event) => {
      const isOpen = event.currentTarget.open;
      setExpanded(isOpen);
      if (!isOpen) event.currentTarget.querySelectorAll("video").forEach((video) => video.pause());
    }} onKeyDown={(event) => { if (event.key === "Escape" && !document.querySelector("dialog[open]")) { event.preventDefault(); close(); } }}>
      <summary><span className="annotation">FIELD NOTES {project.number}</span><span>Inside {project.title}</span><span className="case-state">{expanded ? "Close" : "Read case study"}</span><Plus size={20} /></summary>
      {expanded && <div className="case-reading">
        <p className="annotation case-preface">THE ORIGINAL WORK / CONTRIBUTIONS, MECHANICS &amp; MATERIALS</p>
        {project.sections.map((section, i) => <section key={section} className="case-entry" aria-labelledby={`${project.slug}-note-${section}`}>
          <div className="case-entry-heading"><span className="annotation">{project.number}.{String(i + 1).padStart(2, "0")}</span><h4 id={`${project.slug}-note-${section}`}>{chapterHeadings[section]}</h4></div>
          <div className="source-copy">{source[section].texts.filter((text) => text.length > 180).map((text, n) => <p key={n}>{text}</p>)}</div>
          {source[section].texts.some((text) => text.length <= 180) && <div className="source-annotations">{source[section].texts.filter((text) => text.length <= 180 && ![chapterHeadings[section], "Projects", "Persnol Project"].includes(text)).map((text, n) => <span key={n}>{text}</span>)}</div>}
          {source[section].links.length > 0 && <div className="case-links">{source[section].links.map((href, n) => <a key={`${href}-${n}`} href={href} target="_blank" rel="noreferrer">{originalLinkLabel(href, section, n)}<ArrowUpRight size={17} /></a>)}</div>}
          {documents[section] && <div className="case-links document-downloads">{documents[section].map((document) => <a href={document.href} key={document.href} download><FileText size={17} />Download {document.label}<ArrowDown size={16} /></a>)}</div>}
          {mediaFor(section).length > 0 && <Gallery items={mediaFor(section)} title={chapterHeadings[section]} />}
          {section === 13 && <Retention />}
        </section>)}
        <button className="route-link close-case" onClick={close}>Close project &amp; return<X size={18} /></button>
      </div>}
    </details>
    <div className="chapter-exit"><span className="annotation">CONTINUE THE EXPLORATION</span><a href={index < projects.length - 1 ? `#project-${projects[index + 1].slug}` : "#process"}>{index < projects.length - 1 ? projects[index + 1].title : "The Design Lab"}<ArrowDown size={18} /></a></div>
  </motion.article>;
}

export function Work() {
  return <section id="work" tabIndex={-1} data-destination className="project-worlds" aria-labelledby="worlds-title">
    <div className="worlds-introduction atlas-container"><span className="annotation">01 / THE COLLECTION</span><div><h2 id="worlds-title">Project<br />Worlds.</h2><p>Explore the mechanics, the levels, and the decisions behind seven original projects.</p></div><nav className="worlds-directory" aria-label="Jump to a project">{projects.map((project) => <a href={`#project-${project.slug}`} key={project.slug}><span className="annotation">{project.number}</span>{project.title}<ArrowDown size={15} /></a>)}</nav></div>
    {projects.map((project, index) => <ProjectChapter key={project.slug} project={project} index={index} />)}
  </section>;
}
