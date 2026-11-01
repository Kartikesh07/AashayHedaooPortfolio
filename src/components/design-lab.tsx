"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, Minus, Plus, RotateCcw } from "lucide-react";
import { mediaFor } from "@/data/portfolio";
import { documents } from "@/data/atlas";
import { ArtifactViewer } from "./gallery";

const studies = mediaFor(19);

export function DesignLab() {
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const viewport = useRef<HTMLDivElement>(null);
  function select(index: number) { setSelected((index + studies.length) % studies.length); setZoom(1); viewport.current?.scrollTo(0, 0); }
  const asset = studies[selected];
  return <div className="light-table" onKeyDown={(event) => {
    if (expanded) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); select(selected - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); select(selected + 1); }
  }}>
    <div className="light-table-bar"><span className="annotation">ROUGH LEVEL DESIGN / ORIGINAL WORKING MATERIAL</span><span className="annotation" aria-live="polite">STUDY {String(selected + 1).padStart(2, "0")} / {String(studies.length).padStart(2, "0")}</span></div>
    <div className="lab-stage" ref={viewport} tabIndex={0} aria-label="Level sketch inspection stage; use arrow keys to change study">
      <div className="inspection-canvas" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}><Image key={asset.id} src={asset.src} alt={`Rough Level Design, original working sketch ${selected + 1}`} width={asset.width} height={asset.height} sizes="(max-width: 700px) 90vw, 80vw" /></div>
    </div>
    <div className="lab-toolbar"><div><button className="square-control" onClick={() => select(selected - 1)} aria-label="Previous sketch"><ArrowLeft size={19} /></button><button className="square-control" onClick={() => select(selected + 1)} aria-label="Next sketch"><ArrowRight size={19} /></button><span className="annotation">{selected + 1} / {studies.length}</span></div><div><button className="square-control" onClick={() => setZoom((v) => Math.max(1, v - .5))} disabled={zoom === 1} aria-label="Zoom sketch out"><Minus size={18} /></button><span className="annotation">{zoom * 100}%</span><button className="square-control" onClick={() => setZoom((v) => Math.min(3, v + .5))} disabled={zoom === 3} aria-label="Zoom sketch in"><Plus size={18} /></button><button className="square-control" onClick={() => { setZoom(1); viewport.current?.scrollTo(0, 0); }} aria-label="Reset sketch zoom"><RotateCcw size={18} /></button><button className="square-control" onClick={() => setExpanded(true)} aria-label="Expand sketch inspection"><Expand size={18} /></button></div></div>
    <div className="study-strip" role="group" aria-label="Choose an original level sketch">{studies.map((study, i) => <button key={study.id} aria-pressed={selected === i} aria-label={`Inspect level study ${i + 1}`} onClick={() => select(i)}><Image src={study.src} alt="" width={study.width} height={study.height} sizes="120px" /><span className="annotation">{String(i + 1).padStart(2, "0")}</span></button>)}</div>
    <div className="lab-documents"><span className="annotation">FURTHER READING</span>{[22, 23].map((section) => <div key={section}><span>{section === 22 ? "Wobble Bomber" : "DreamLink"}</span>{documents[section].map((doc) => <a key={doc.href} href={doc.href} download>{doc.label} ↗</a>)}</div>)}</div>
    {expanded && <ArtifactViewer items={studies} initialIndex={selected} title="Rough Level Design" onSelect={select} onClose={() => setExpanded(false)} />}
  </div>;
}
