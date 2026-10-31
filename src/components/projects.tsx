"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, FileText } from "lucide-react";
import { assets, projects, type Project } from "@/data/portfolio";
export function ProjectCard({
  project: p,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const a = p.cover ? assets[p.cover] : null;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className={`project-card ${featured ? "featured" : ""}`}
    >
      <Link href={`/projects/${p.slug}`} data-project="true">
        <div
          className={`project-image ${a ? "" : "concept-image"} ${p.slug}`}
          style={{ backgroundColor: p.color }}
        >
          {a ? (
            <>
              <span className="art-number" aria-hidden>
                {p.number}
              </span>
              <Image
                className="project-art"
                src={a.poster || a.src}
                alt={`${p.title} original game artwork`}
                fill
                sizes={
                  featured
                    ? "(max-width: 640px) 90vw, 65vw"
                    : "(max-width: 640px) 90vw, 45vw"
                }
              />
            </>
          ) : (
            <>
              <FileText size={40} strokeWidth={1} />
              <span className="concept-title">{p.title}</span>
              <span className="mono">GAME DESIGN DOCUMENT</span>
            </>
          )}
          <span className="image-cta">
            <ArrowUpRight size={24} />
          </span>
          <span className="image-tag mono">
            {p.category === "Personal"
              ? "PERSONAL PROJECT"
              : "GAME DESIGN · LEVEL DESIGN"}
          </span>
        </div>
        <div className="project-caption">
          <div>
            <span className="mono project-index">
              /{p.number} — {p.category.toUpperCase()}
            </span>
            <h3>{p.title}</h3>
          </div>
          <ArrowUpRight />
        </div>
      </Link>
    </motion.article>
  );
}
export function ProjectGrid({ all = false }: { all?: boolean }) {
  const [filter, setFilter] = useState("All");
  return (
    <>
      {all && (
        <div className="filters" role="group" aria-label="Filter projects">
          {["All", "Mobile", "Personal"].map((f) => (
            <button
              key={f}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f}
              <span>
                {f === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <motion.div
        layout
        className={
          all ? "project-grid full-grid" : "project-grid editorial-grid"
        }
      >
        <AnimatePresence mode="popLayout">
          {(all ? projects : projects.slice(0, 4))
            .filter((p) => filter === "All" || p.category === filter)
            .map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                featured={!all && i === 0}
              />
            ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
