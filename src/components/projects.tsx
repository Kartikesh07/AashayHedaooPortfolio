"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { assets, projects, type Project } from "@/data/portfolio";

export function ProjectCard({
  project: p,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const image = p.cover ? assets[p.cover] : null;
  return (
    <motion.article
      layout
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className={`project-card ${featured ? "featured-project" : ""}`}
    >
      <Link href={`/projects/${p.slug}`} className="project-card-link">
        <div className={`project-image ${!image ? "document-cover" : ""}`}>
          {image ? (
            <Image
              src={image.poster || image.src}
              alt={`${p.title} original game artwork`}
              fill
              sizes={
                featured
                  ? "(max-width: 760px) 90vw, 45vw"
                  : "(max-width: 640px) 90vw, 45vw"
              }
            />
          ) : (
            <>
              <FileText size={38} strokeWidth={1.3} />
              <span>{p.title}</span>
              <span className="mono">Game design document</span>
            </>
          )}
          <span className="project-image-action">
            <ArrowUpRight size={19} />
          </span>
        </div>
        <div className="project-caption">
          <div className="project-meta">
            <span>
              {p.category === "Personal" ? "Personal project" : "Mobile game"}
            </span>
            <span className="mono">{p.number}</span>
          </div>
          <h3>{p.title}</h3>
          <p>
            {featured
              ? p.overview
              : p.overview.split("\n\n").pop()?.split(". ")[0] + "."}
          </p>
          <span className="project-read">
            View project <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export function ProjectGrid({ all = false }: { all?: boolean }) {
  const [filter, setFilter] = useState("All");
  const visible = (all ? projects : projects.slice(0, 5)).filter(
    (p) => filter === "All" || p.category === filter,
  );
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
              {f === "Mobile"
                ? "Mobile games"
                : f === "Personal"
                  ? "Personal projects"
                  : "All work"}
              <span>
                {f === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === f).length}
              </span>
            </button>
          ))}
        </div>
      )}
      <motion.div layout className="project-grid full-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
      {!visible.length && (
        <p className="empty-state">No projects in this category.</p>
      )}
    </>
  );
}
