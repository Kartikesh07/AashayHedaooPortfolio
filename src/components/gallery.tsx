"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Expand, Minus, Plus, RotateCcw, X } from "lucide-react";
import type { Asset } from "@/data/portfolio";

export function ArtifactViewer({ items, initialIndex, title, onClose, onSelect }: {
  items: Asset[]; initialIndex: number; title: string; onClose: () => void; onSelect?: (index: number) => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const dialog = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    node?.showModal();
    document.body.style.overflow = "hidden";
    return () => { node?.close(); document.body.style.overflow = previousOverflow; previousFocus?.focus({ preventScroll: true }); };
  }, []);
  function shift(delta: number) {
    const next = (index + delta + items.length) % items.length;
    setIndex(next); onSelect?.(next); setZoom(1);
    viewport.current?.scrollTo(0, 0);
  }
  const asset = items[index];
  if (!asset) return null;
  return <dialog ref={dialog} className="artifact-dialog" aria-label={`${title}, expanded inspection`}
    onCancel={(event) => { event.preventDefault(); onClose(); }}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    onKeyDown={(event) => {
      if (event.key === "ArrowRight") { event.preventDefault(); shift(1); }
      if (event.key === "ArrowLeft") { event.preventDefault(); shift(-1); }
      if (event.key === "+" || event.key === "=") { event.preventDefault(); setZoom((v) => Math.min(3, v + .5)); }
      if (event.key === "-") { event.preventDefault(); setZoom((v) => Math.max(1, v - .5)); }
    }}>
    <div className="inspection-top"><div><span className="annotation">ORIGINAL MATERIAL / {String(index + 1).padStart(2, "0")}</span><p>{title}</p></div><button autoFocus className="square-control" onClick={onClose} aria-label="Close expanded inspection"><X size={20} /></button></div>
    <div className="inspection-viewport" ref={viewport} tabIndex={0} aria-label="Artwork viewport; scroll to pan when zoomed">
      <div className="inspection-canvas" style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%` }}><Image src={asset.src} alt={`${title}, original material ${index + 1}`} width={asset.width} height={asset.height} sizes="95vw" /></div>
    </div>
    <div className="inspection-toolbar"><div><button className="square-control" onClick={() => shift(-1)} aria-label="Previous material" disabled={items.length < 2}><ArrowLeft size={19} /></button><span className="annotation" aria-live="polite">{index + 1} / {items.length}</span><button className="square-control" onClick={() => shift(1)} aria-label="Next material" disabled={items.length < 2}><ArrowRight size={19} /></button></div><div><button className="square-control" onClick={() => setZoom((v) => Math.max(1, v - .5))} disabled={zoom === 1} aria-label="Zoom out"><Minus size={18} /></button><span className="annotation">{Math.round(zoom * 100)}%</span><button className="square-control" onClick={() => setZoom((v) => Math.min(3, v + .5))} disabled={zoom === 3} aria-label="Zoom in"><Plus size={18} /></button><button className="square-control" onClick={() => { setZoom(1); viewport.current?.scrollTo(0, 0); }} aria-label="Reset zoom"><RotateCcw size={18} /></button></div></div>
  </dialog>;
}

export function ProjectVideo({ asset, label }: { asset: Asset; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) node.pause(); }, { threshold: .15 });
    observer.observe(node);
    const pauseHidden = () => { if (document.hidden) node.pause(); };
    document.addEventListener("visibilitychange", pauseHidden);
    return () => { observer.disconnect(); node.pause(); document.removeEventListener("visibilitychange", pauseHidden); };
  }, []);
  return <video ref={ref} controls playsInline preload="none" poster={asset.poster} width={asset.width} height={asset.height} aria-label={label}
    onPlay={(event) => document.querySelectorAll("video").forEach((video) => { if (video !== event.currentTarget) video.pause(); })}>
    <source src={asset.src} type="video/mp4" /><a href={asset.src}>Download original gameplay video</a>
  </video>;
}

export function Gallery({ items, title }: { items: Asset[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const images = items.filter((asset) => !asset.src.endsWith(".mp4"));
  return <>
    <div className="source-media">{items.map((asset, i) => <figure key={asset.id}>
      {asset.src.endsWith(".mp4") ? <ProjectVideo asset={asset} label={`${title}, original gameplay ${i + 1}`} /> : <button className="source-image" onClick={() => setActive(images.findIndex((image) => image.id === asset.id))} aria-label={`Inspect ${title}, image ${i + 1}`}><Image src={asset.src} alt={`${title}, original image ${i + 1}`} width={asset.width} height={asset.height} sizes="(max-width: 700px) 90vw, 50vw" /><Expand size={18} /></button>}
      <figcaption className="annotation">{title} / {String(i + 1).padStart(2, "0")}</figcaption>
    </figure>)}</div>
    {active !== null && <ArtifactViewer items={images} initialIndex={active} title={title} onClose={() => setActive(null)} />}
  </>;
}
