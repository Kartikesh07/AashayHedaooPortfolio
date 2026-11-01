"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { assets, intro, projects } from "@/data/portfolio";

const points = [
  { x: 12, y: 42, path: "M55 310C70 310 90 252 144 252" },
  { x: 31, y: 20, path: "M144 252C245 252 230 120 372 120" },
  { x: 48, y: 49, path: "M372 120C510 120 458 294 576 294" },
  { x: 69, y: 22, path: "M576 294C700 294 690 132 828 132" },
  { x: 85, y: 50, path: "M828 132C980 132 902 300 1020 300" },
  { x: 64, y: 80, path: "M1020 300C1110 485 875 480 768 480" },
  { x: 28, y: 79, path: "M768 480C610 480 480 474 336 474" },
];

export function Hero() {
  const [active, setActive] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const markers = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  function travel(index: number) {
    setSelected(index);
    const id = `project-${projects[index].slug}`;
    window.history.pushState(null, "", `#${id}`);
    const destination = document.getElementById(id);
    destination?.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
    destination?.focus({ preventScroll: true });
  }
  return (
    <section id="home" tabIndex={-1} data-destination className="atlas-opening" aria-labelledby="atlas-title">
      <div className="atlas-title-block"><span className="annotation">AN INDEPENDENT COLLECTION OF PLAY</span><h1 id="atlas-title">The Play Atlas<span className="title-point">.</span></h1><p>Seven worlds. A designer’s perspective.</p></div>
      <div className={`atlas-map ${active !== null ? "has-active" : ""}`} onPointerLeave={() => { setActive(null); setOffset({ x: 0, y: 0 }); }}>
        <svg className="route-drawing" viewBox="0 0 1200 600" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <g className="contour-lines"><path d="M-80 70C130-70 180 110 300 40S520-20 650 70 920 40 1270-20M-70 90C130-45 180 135 305 65S530 5 655 95 940 65 1280 0M-60 110C135-20 180 160 310 90S540 30 660 120 960 90 1290 20" /><path d="M-50 450C100 360 220 610 420 560S640 600 750 570 1000 550 1300 630M-50 475C100 385 220 635 420 585S640 625 750 595 1000 575 1300 655M-50 500C100 410 220 660 420 610S640 650 750 620 1000 600 1300 680" /><path d="M950-50C780 80 1040 130 1100 80S1280 120 1300 280M975-50C805 80 1065 155 1125 105S1305 145 1325 305M1000-50C830 80 1090 180 1150 130S1330 170 1350 330" /></g>
          <g className="map-registration"><path d="M40 35h16m-8-8v16M1150 550h16m-8-8v16M570 62h16m-8-8v16" /></g>
          {points.map((point, i) => <g key={i}><motion.path d={point.path} className="map-path" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : i * .07 }} /><path d={point.path} className={`map-path-highlight ${active === i || selected === i ? "is-active" : ""} ${selected === i ? "is-selected" : ""}`} /></g>)}
          <text x="40" y="580" className="map-svg-label">FIELD NOTES / A.H.</text><text x="1090" y="60" className="map-svg-label">N ↑</text>
        </svg>
        {projects.map((project, i) => {
          const image = project.cover ? assets[project.cover] : null;
          return <button key={project.slug} ref={(node) => { markers.current[i] = node; }}
            className={`destination-node ${active === i ? "is-active" : ""} ${selected === i ? "is-selected" : ""}`}
            style={{ "--node-x": `${points[i].x}%`, "--node-y": `${points[i].y}%` } as CSSProperties}
            aria-label={`Explore project ${project.number}: ${project.title}`}
            onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}
            onPointerMove={(event) => { if (reduced || event.pointerType !== "mouse") return; const rect = event.currentTarget.getBoundingClientRect(); setOffset({ x: (event.clientX - rect.left - rect.width / 2) * .045, y: (event.clientY - rect.top - rect.height / 2) * .045 }); }}
            onClick={() => travel(i)} onKeyDown={(event) => {
              const delta = ["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : ["ArrowLeft", "ArrowUp"].includes(event.key) ? -1 : 0;
              if (delta) { event.preventDefault(); markers.current[(i + delta + projects.length) % projects.length]?.focus(); }
            }}>
            <span className="node-coordinate annotation">{project.number} / {String(points[i].x).padStart(3, "0")}.{points[i].y}</span>
            <span className="node-marker"><span /></span><span className="node-label">{project.title}<ArrowUpRight size={13} /></span>
            <span className="node-preview" aria-hidden="true" style={{ transform: `translate(${active === i ? offset.x : 0}px, ${active === i ? offset.y : 0}px)` }}>
              {image ? <Image src={image.poster || image.src} alt="" width={image.width} height={image.height} sizes="145px" /> : <span className="node-document"><FileText size={26} strokeWidth={1} /><span>Original design<br />document</span></span>}<span className="annotation">DESTINATION {project.number} ↗</span>
            </span>
          </button>;
        })}
      </div>
      <nav className="mobile-route" aria-label="Project destinations">{projects.map((project) => {
        const image = project.cover ? assets[project.cover] : null;
        return <a key={project.slug} href={`#project-${project.slug}`}><span className="mobile-route-stop annotation">{project.number}</span>{image ? <Image src={image.poster || image.src} alt="" width={60} height={70} sizes="60px" /> : <span className="mobile-document"><FileText size={25} strokeWidth={1} /></span>}<span><small className="annotation">{project.category === "Mobile" ? "MOBILE GAME" : "DESIGN DOCUMENT"}</small><strong>{project.title}</strong></span><ArrowUpRight size={18} /></a>;
      })}</nav>
      <div className="atlas-bottom"><p>{intro}</p><span className="annotation atlas-instruction">SELECT A DESTINATION<br />OR FOLLOW THE ROUTE</span><a className="route-link" href="#work">Explore work<ArrowDown size={22} strokeWidth={1.5} /></a></div>
    </section>
  );
}
