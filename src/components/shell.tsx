"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "motion/react";
import { ArrowDownRight, ArrowUpRight, List, X } from "lucide-react";
import { projects } from "@/data/portfolio";

const destinations = [
  ["home", "The Atlas"], ["work", "Project Worlds"],
  ["process", "Design Lab"], ["about", "The Designer"],
  ["contact", "Final Destination"],
];

export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-destination]"));
    const visible = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      const current = nodes.filter((node) => visible.has(node.id)).at(-1);
      if (current) setActive(current.id);
    }, { rootMargin: "-12% 0px -55% 0px", threshold: 0 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const node = dialog.current;
    node?.showModal();
    document.body.style.overflow = "hidden";
    return () => { node?.close(); document.body.style.overflow = previous; };
  }, [open]);

  function close(id?: string) {
    dialog.current?.close();
    setOpen(false);
    requestAnimationFrame(() => {
      if (id) document.getElementById(id)?.focus({ preventScroll: true });
      else toggle.current?.focus();
    });
  }
  const currentProject = projects.find((p) => `project-${p.slug}` === active);
  const currentLabel = currentProject?.title || destinations.find(([id]) => id === active)?.[1] || "The Atlas";

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="atlas-identity"><a href="#home" aria-label="Aashay Hedaoo, return to the atlas"><strong>AASHAY HEDAOO</strong><span>GAME &amp; LEVEL DESIGNER</span></a></header>
      <nav className="index-controls" aria-label="Quick navigation">
        <a href="#work">Work</a><a href="#contact">Contact</a>
        <button ref={toggle} onClick={() => setOpen(true)} aria-expanded={open} aria-controls="destination-index" aria-haspopup="dialog"><List size={18} strokeWidth={1.5} /><span>Index</span></button>
      </nav>
      <dialog ref={dialog} id="destination-index" className="destination-index" aria-labelledby="index-title"
        onCancel={(event) => { event.preventDefault(); close(); }} onClose={() => setOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
        <div className="index-sheet">
          <div className="index-top"><span className="annotation">AASHAY HEDAOO / PORTFOLIO</span><button autoFocus className="square-control" onClick={() => close()} aria-label="Close destination index"><X size={20} /></button></div>
          <h2 id="index-title">Choose a<br />destination.</h2>
          <nav aria-label="Destination index">{destinations.map(([id, label], i) => <a key={id} href={`#${id}`} onClick={() => close(id)} aria-current={active === id || (id === "work" && currentProject) ? "location" : undefined}><span className="annotation">0{i + 1}</span><span>{label}</span><ArrowUpRight size={22} /></a>)}</nav>
          <div className="index-projects">{projects.map((p) => <a href={`#project-${p.slug}`} key={p.slug} onClick={() => close(`project-${p.slug}`)}><span className="annotation">{p.number}</span>{p.title}</a>)}</div>
        </div>
      </dialog>
      <main id="main" tabIndex={-1}>{children}</main>
      <nav className="journey-progress" aria-label="Journey progress">
        <span className="progress-caption"><ArrowDownRight size={14} />{currentLabel}</span>
        <div>{destinations.map(([id, label], i) => <a href={`#${id}`} key={id} aria-label={`${label}, destination ${i + 1}`} aria-current={active === id || (id === "work" && currentProject) ? "location" : undefined}><span /></a>)}</div>
        {currentProject && <span className="annotation">{currentProject.number} / 07</span>}
      </nav>
    </MotionConfig>
  );
}
