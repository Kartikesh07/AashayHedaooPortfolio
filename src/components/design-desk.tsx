"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RotateCcw, Move } from "lucide-react";
import { mediaFor } from "@/data/portfolio";
import { Gallery } from "./gallery";

export function DesignDesk() {
  const [canDrag, setCanDrag] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 701px) and (pointer: fine)");
    const update = () => setCanDrag(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const bounds = useRef<HTMLDivElement>(null);
  const [version, setVersion] = useState(0);
  const [front, setFront] = useState(0);
  const reduce = useReducedMotion();
  return (
    <>
      <div className="desk-toolbar">
        <p>
          <Move size={17} /> Drag a study. Open it. Look closer.
        </p>
        <button
          onClick={() => {
            setVersion((v) => v + 1);
            setFront(0);
          }}
        >
          <RotateCcw size={16} /> Reset desk
        </button>
      </div>
      <div className="design-desk" ref={bounds} key={version}>
        {mediaFor(19)
          .slice(0, 3)
          .map((a, i) => (
            <motion.article
              className={`desk-paper desk-paper-${i}`}
              key={a.id}
              drag={canDrag && !reduce}
              dragConstraints={bounds}
              dragElastic={0.08}
              dragMomentum={!reduce}
              onPointerDown={() => setFront(i)}
              onFocus={() => setFront(i)}
              style={{ zIndex: front === i ? 4 : i + 1 }}
              whileDrag={{ scale: 1.035, rotate: 0 }}
            >
              <div
                className="paper-handle"
                tabIndex={0}
                role="group"
                aria-label={`Move level study ${i + 1} with arrow keys`}
                onKeyDown={(e) => {
                  if (!e.key.startsWith("Arrow")) return;
                  e.preventDefault();
                  const paper = e.currentTarget.parentElement;
                  if (paper) {
                    const dx =
                      Number(paper.dataset.dx || 0) +
                      (e.key === "ArrowRight"
                        ? 15
                        : e.key === "ArrowLeft"
                          ? -15
                          : 0);
                    const dy =
                      Number(paper.dataset.dy || 0) +
                      (e.key === "ArrowDown"
                        ? 15
                        : e.key === "ArrowUp"
                          ? -15
                          : 0);
                    paper.dataset.dx = String(Math.max(-50, Math.min(50, dx)));
                    paper.dataset.dy = String(Math.max(-50, Math.min(50, dy)));
                    paper.style.translate = `${paper.dataset.dx}px ${paper.dataset.dy}px`;
                  }
                }}
              >
                Rough level design{" "}
                <span>{String(i + 1).padStart(2, "0")} ↗</span>
              </div>
              <Gallery items={[a]} title={`Level study ${i + 1}`} />
              <p>Original working sketch / Aashay Hedaoo</p>
            </motion.article>
          ))}
      </div>
    </>
  );
}
