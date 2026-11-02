"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SKETCHES, type SketchItem } from "@/data/sketches";
import { editorialSans } from "./editorialFonts";
import styles from "./LevelSketchesGallery.module.css";

const COLLECTIONS = [...new Set(SKETCHES.map((sketch) => sketch.category))].map((category) => ({
  category,
  label: category === "Personal Sketch" ? "Personal Sketches" : category,
  items: SKETCHES.filter((sketch) => sketch.category === category),
}));
const DOCUMENTS = [
  { title: "Wobble Bomber GDD", description: "5v5 Ragdoll Elimination", type: "GDD / DOCX", href: "/documents/wobble-bomber-game-design.docx" },
  { title: "Wobble Bomber LDD", description: "Arena Sightlines & Nodes", type: "LDD / DOCX", href: "/documents/wobble-bomber-level-design.docx" },
  { title: "DreamLink GDD", description: "Dual-Reality Co-op", type: "GDD / DOCX", href: "/documents/dreamlink-game-design.docx" },
];

interface InspectionProps {
  sketch: SketchItem;
  counter: string;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
}

function SketchInspection({ sketch, counter, onPrevious, onNext, onClose }: InspectionProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    // Native modal dialogs provide focus containment and make the background inert.
    dialogRef.current?.showModal();
    closeRef.current?.focus();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.body.style.overflow = previousBodyOverflow;
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${editorialSans.className}`}
      aria-modal="true"
      aria-labelledby="sketch-inspection-title"
      aria-describedby="sketch-inspection-note"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          event.stopPropagation();
          if (event.key === "ArrowLeft") onPrevious(); else onNext();
        }
      }}
    >
      <header className={styles.dialogHeader}>
        <div aria-live="polite" aria-atomic="true">
          <p>{sketch.category} / {counter}</p>
          <h3 id="sketch-inspection-title">{sketch.title}</h3>
        </div>
        <button ref={closeRef} type="button" onClick={onClose} className={styles.textControl}>Close <span aria-hidden="true">×</span></button>
      </header>
      <div className={styles.dialogImage}>
        <Image key={sketch.id} src={sketch.image} alt={sketch.title} fill sizes="100vw" className={styles.originalImage} />
      </div>
      <div className={styles.dialogFooter}>
        <p id="sketch-inspection-note">{sketch.note}</p>
        <div className={styles.navigation}>
          <button type="button" onClick={onPrevious} className={styles.textControl} aria-label="Previous sketch">← Previous</button>
          <button type="button" onClick={onNext} className={styles.textControl} aria-label="Next sketch">Next →</button>
        </div>
      </div>
    </dialog>
  );
}

export function LevelSketchesGallery() {
  const [selection, setSelection] = useState({ category: COLLECTIONS[0].category, index: 0 });
  const [inspectionOpen, setInspectionOpen] = useState(false);
  const thumbnailRefs = useRef(new Map<string, HTMLButtonElement>());
  const reducedMotion = useReducedMotion();
  const collection = COLLECTIONS.find((item) => item.category === selection.category) ?? COLLECTIONS[0];
  const sketch = collection.items[selection.index];
  const counter = `${String(selection.index + 1).padStart(2, "0")} / ${String(collection.items.length).padStart(2, "0")}`;

  function move(direction: number) {
    setSelection((current) => {
      const items = COLLECTIONS.find((item) => item.category === current.category)!.items;
      return { ...current, index: (current.index + direction + items.length) % items.length };
    });
  }

  // Keep the current thumbnail discoverable without scrolling the page vertically.
  useEffect(() => {
    const thumbnail = thumbnailRefs.current.get(sketch.id);
    const strip = thumbnail?.parentElement;
    if (!thumbnail || !strip) return;
    const left = thumbnail.offsetLeft;
    const right = left + thumbnail.offsetWidth;
    if (left < strip.scrollLeft) strip.scrollLeft = left;
    else if (right > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = right - strip.clientWidth;
  }, [sketch.id]);

  function handleViewerKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    }
  }

  const entrance = {
    initial: false as const,
    whileInView: reducedMotion ? { opacity: 1, y: 0 } : { opacity: [0.7, 1], y: [10, 0] },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reducedMotion ? 0 : 0.4 },
  };

  return (
    <section id="sketches" aria-labelledby="sketchbook-heading" className={`${styles.section} ${editorialSans.className}`}>
      <div className={styles.container}>
        <motion.header {...entrance} data-archive-reveal>
          <p className={styles.identifier}>07 / The archive</p>
          <h2 id="sketchbook-heading" className={styles.headline}><span>Inside the</span>{" "}<span>sketchbook.</span></h2>
          <p className={styles.subtitle}>Where rough ideas take their first shape.</p>
        </motion.header>

        <div className={styles.categories} role="group" aria-label="Sketch collections">
          {COLLECTIONS.map((item) => (
            <button key={item.category} type="button" aria-pressed={selection.category === item.category}
              aria-controls="sketchbook-viewer" onClick={() => setSelection({ category: item.category, index: 0 })}>
              {item.label}<span>{String(item.items.length).padStart(2, "0")}</span>
            </button>
          ))}
        </div>

        <motion.div {...entrance} data-archive-reveal>
          <div id="sketchbook-viewer" className={styles.viewer} role="region" aria-label="Sketch viewer; use left and right arrow keys to navigate" tabIndex={0} onKeyDown={handleViewerKeys}>
            <div className={styles.imageStage}>
              <Image key={sketch.id} src={sketch.image} alt={sketch.title} fill
                sizes="(max-width: 800px) 90vw, 70vw" className={`${styles.originalImage} ${styles.imageEntrance}`} />
            </div>
            <div className={styles.caption}>
              <div className={styles.captionText} aria-live="polite" aria-atomic="true">
                {collection.items.map((item, index) => (
                  <div key={item.id} className={styles.captionEntry} data-active={item.id === sketch.id} aria-hidden={item.id !== sketch.id} inert={item.id !== sketch.id}>
                    <p className={styles.counter}>{String(index + 1).padStart(2, "0")} / {String(collection.items.length).padStart(2, "0")}</p>
                    <p className={styles.category}>{item.category}</p>
                    <h3>{item.title}</h3>
                    <p className={styles.note}>{item.note}</p>
                  </div>
                ))}
              </div>
              <button type="button" className={styles.inspect} onClick={() => setInspectionOpen(true)} aria-haspopup="dialog">
                Inspect full size <span aria-hidden="true">↗</span>
              </button>
              <div className={styles.navigation}>
                <button type="button" className={styles.textControl} onClick={() => move(-1)} aria-label="Previous sketch">← Previous</button>
                <button type="button" className={styles.textControl} onClick={() => move(1)} aria-label="Next sketch">Next →</button>
              </div>
            </div>
          </div>
          <div className={styles.thumbnailStrip} role="group" aria-label={`${collection.label} image index`}>
            {collection.items.map((item, index) => (
              <button key={item.id} type="button" ref={(node) => { if (node) thumbnailRefs.current.set(item.id, node); else thumbnailRefs.current.delete(item.id); }}
                onClick={() => setSelection((current) => ({ ...current, index }))}
                aria-label={`${index + 1} of ${collection.items.length}: ${item.title}`}
                aria-pressed={sketch.id === item.id} aria-controls="sketchbook-viewer" className={styles.thumbnail}>
                <Image src={item.image} alt="" fill sizes="72px" loading="lazy" className={styles.originalImage} />
              </button>
            ))}
          </div>
        </motion.div>

        <div className={styles.documents}>
          <header className={styles.documentsHeader}>
            <h3>Design documentation</h3>
            <p>Project concepts and design documents. A separate collection from the drawings above.</p>
          </header>
          <div>
            {DOCUMENTS.map((document) => (
              <a key={document.href} href={document.href} download className={styles.document}>
                <span className={styles.documentName}>{document.title}<span>{document.description}</span></span>
                <span className={styles.documentType}>{document.type}</span>
                <span className={styles.download}>Download <span aria-hidden="true">↓</span></span>
              </a>
            ))}
          </div>
        </div>
      </div>
      {inspectionOpen ? <SketchInspection sketch={sketch} counter={counter} onPrevious={() => move(-1)} onNext={() => move(1)} onClose={() => setInspectionOpen(false)} /> : null}
    </section>
  );
}
