"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Plus,
} from "lucide-react";
import { mediaFor, projects, source, type Project } from "@/data/portfolio";
import { Gallery } from "./gallery";
import { Retention } from "./retention";

const accents = [
  "#FFE27A",
  "#A4E9D3",
  "#FF704A",
  "#D7CCFF",
  "#FFE27A",
  "#A4E9D3",
  "#D7CCFF",
];
const headings: Record<number, string> = {
  6: "Krishna stories",
  7: "Mini Games",
  8: "Detective IQ 3",
  9: "Detetive IQ 2",
  10: "Erase Level Gameplay",
  11: "Cut Rope Gameplay",
  12: "Bullet Gameplay",
  13: "Retention Graphs",
  14: "Detective IQ",
  15: "Cases and Flashback",
  16: "Bullet gameplay (DIQ1)",
  17: "Draw to save",
  18: "Pizza IQ",
  19: "Rough Level Design",
  22: "Wobble Bomber",
  23: "DreamLink: The Fractured Timeline",
};
const documents: Record<number, [string, string][]> = {
  22: [
    ["/documents/wobble-bomber-game-design.docx", "Game design document"],
    ["/documents/wobble-bomber-level-design.docx", "Level Design Document"],
  ],
  23: [
    [
      "/documents/dreamlink-game-design.docx",
      "Game design document for Dreamlink",
    ],
  ],
};

function LinkLabel({
  href,
  index,
  section,
}: {
  href: string;
  index: number;
  section: number;
}) {
  let label =
    source[section].texts.filter(
      (t) =>
        t.length < 100 &&
        ![headings[section], "Projects", "Persnol Project"].includes(t),
    )[index] || "Original project link";
  if (href.includes("play.google")) label = "Google Play";
  if (href.includes("apps.apple")) label = "App Store";
  if (href.includes("spotify")) label = "Original media link";
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {label}
      <ArrowUpRight size={17} />
    </a>
  );
}

function CaseStudy({
  project,
  detailsRef,
}: {
  project: Project;
  detailsRef: (el: HTMLDetailsElement | null) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <details
      className="case-study"
      id={`project-${project.slug}`}
      ref={detailsRef}
      onToggle={(e) => {
        if (e.currentTarget.open) setLoaded(true);
        else
          e.currentTarget.querySelectorAll("video").forEach((v) => v.pause());
      }}
    >
      <summary>
        <span className="mono">{project.number}</span>
        <span>
          {project.title}
          <small>
            {project.category === "Personal"
              ? "Personal concept · Design documentation"
              : "Mobile · Game & level design"}
          </small>
        </span>
        <span className="case-open-label mono">EXPLORE PROJECT</span>
        <Plus className="case-plus" size={23} />
      </summary>
      <div className="case-body">
        <div className="case-intro mono">
          PROJECT {project.number} / OVERVIEW &amp; CONTRIBUTIONS
        </div>
        {project.sections.map((s) => (
          <section key={s} className="case-chapter" aria-label={headings[s]}>
            <div className="chapter-heading">
              <span className="mono">
                {String(project.sections.indexOf(s) + 1).padStart(2, "0")} /
              </span>
              <h4>{headings[s]}</h4>
            </div>
            <div className="chapter-content">
              {source[s].texts.map((t, i) => (
                <p
                  className={
                    t.length > 180 ? "original-copy" : "source-label mono"
                  }
                  key={i}
                >
                  {t}
                </p>
              ))}
              {source[s].links.length > 0 && (
                <div className="project-links">
                  {source[s].links.map((href, i) => (
                    <LinkLabel
                      key={`${href}-${i}`}
                      href={href}
                      index={i}
                      section={s}
                    />
                  ))}
                </div>
              )}
              {documents[s] && (
                <div className="project-links">
                  {documents[s].map(([href, label]) => (
                    <a key={href} href={href} download>
                      <FileText size={18} />
                      Download {label}
                      <ArrowDownRight size={17} />
                    </a>
                  ))}
                </div>
              )}
              {loaded && mediaFor(s).length > 0 && (
                <Gallery items={mediaFor(s)} title={headings[s]} />
              )}
              {s === 13 && loaded && <Retention />}
            </div>
          </section>
        ))}
        <button
          className="text-link case-close"
          onClick={(e) => {
            const detail = e.currentTarget.closest("details");
            if (detail) {
              detail.open = false;
              detail.querySelector("summary")?.focus();
            }
          }}
        >
          Close project <ArrowUpRight size={18} />
        </button>
      </div>
    </details>
  );
}

export function Work() {
  const [active, setActive] = useState(0);
  const details = useRef<(HTMLDetailsElement | null)[]>([]);
  const reduce = useReducedMotion();
  const [preview, setPreview] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) video.current?.pause();
      },
      { threshold: 0.15 },
    );
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  function select(index: number) {
    setActive(index);
    setPreview(false);
  }
  useEffect(() => {
    const openHash = () => {
      const index = projects.findIndex(
        (project) => `#project-${project.slug}` === window.location.hash,
      );
      if (index < 0) return;
      const el = details.current[index];
      if (el) {
        el.open = true;
        el.scrollIntoView({ block: "start", behavior: "instant" });
        el.querySelector("summary")?.focus({ preventScroll: true });
      }
    };
    const escape = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || document.querySelector("dialog[open]")) return;
      const el = details.current.find(
        (d) => d?.open && d.contains(document.activeElement),
      );
      if (el) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    const clickHash = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#project-"]',
      );
      if (link && link.hash === window.location.hash)
        requestAnimationFrame(openHash);
    };
    document.addEventListener("click", clickHash);
    openHash();
    window.addEventListener("hashchange", openHash);
    return () => {
      window.removeEventListener("hashchange", openHash);
      window.removeEventListener("keydown", escape);
      document.removeEventListener("click", clickHash);
    };
  }, []);
  const p = projects[active];
  const media = p.sections
    .flatMap(mediaFor)
    .filter((a, i, all) => all.findIndex((b) => b.id === a.id) === i)
    .slice(0, 3);
  function explore() {
    const el = details.current[active];
    if (!el) return;
    el.open = true;
    el.scrollIntoView({
      behavior: reduce ? "instant" : "smooth",
      block: "start",
    });
    el.querySelector("summary")?.focus({ preventScroll: true });
  }
  const footage = p.sections
    .flatMap(mediaFor)
    .find((a) => a.src.endsWith(".mp4"));
  return (
    <section id="work" tabIndex={-1} className="work-section">
      <div className="exhibition-heading">
        <h2>
          Work,
          <br />
          <span>at play.</span>
        </h2>
        <p>
          Seven projects. Many ways to play.
          <br />
          Explore the mechanics, the worlds,
          <br />
          and the choices behind them.
        </p>
        <span className="exhibition-count">(07)</span>
      </div>
      <div className="exhibition" ref={stage}>
        <motion.div
          className="project-stage"
          animate={{ backgroundColor: accents[active] }}
          transition={{ duration: 0.45 }}
        >
          <div className="stage-top">
            <span>
              {p.category === "Personal"
                ? "Independent design concept"
                : "Game & level design / Mobile"}
            </span>
            <span>{p.number} / 07</span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.slug}
              className="stage-visual"
              initial={{
                clipPath: reduce ? undefined : "inset(0 100% 0 0)",
                opacity: 0,
              }}
              animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {media.length ? (
                <>
                  {preview && footage ? (
                    <video
                      ref={video}
                      key={footage.src}
                      src={footage.src}
                      poster={footage.poster}
                      controls
                      playsInline
                      preload="none"
                      aria-label={p.title + " gameplay preview"}
                    />
                  ) : (
                    <button
                      className="stage-art"
                      onClick={explore}
                      data-cursor="Explore"
                      aria-label={"Explore " + p.title}
                    >
                      <span className="stage-word" aria-hidden>
                        {p.title.split(" ")[0]}
                      </span>
                      <Image
                        src={media[0].poster || media[0].src}
                        alt={p.title + " original game artwork"}
                        fill
                        sizes="(max-width:700px) 90vw, 55vw"
                      />
                    </button>
                  )}
                </>
              ) : (
                <button className="document-art" onClick={explore}>
                  <FileText size={38} />
                  <span>From the original design document</span>
                  <strong>{p.title}</strong>
                  <p>{p.overview.split("\n\n").at(-1)}</p>
                  <span>
                    Read the concept <ArrowUpRight />
                  </span>
                </button>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="stage-bottom">
            <button className="text-link" onClick={explore}>
              Explore project <ArrowUpRight size={23} />
            </button>
            {footage && (
              <button
                className="preview-button"
                aria-pressed={preview}
                onClick={() => {
                  video.current?.pause();
                  setPreview(!preview);
                }}
              >
                {preview ? "Back to artwork" : "▷ Preview gameplay"}
              </button>
            )}
            <span aria-live="polite" className="stage-current">
              {p.title}
            </span>
          </div>
        </motion.div>
        <div className="project-rail">
          <p>
            The collection <ArrowDownRight size={19} />
          </p>
          <div role="group" aria-label="Choose a project">
            {projects.map((project, i) => (
              <button
                key={project.slug}
                className={"project-select " + (active === i ? "selected" : "")}
                aria-pressed={active === i}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") select(i);
                }}
                onFocus={() => select(i)}
                onClick={() => select(i)}
                onKeyDown={(e) => {
                  if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key))
                    return;
                  e.preventDefault();
                  const n =
                    e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? 6
                        : (i + (e.key === "ArrowDown" ? 1 : 6)) % 7;
                  const buttons =
                    e.currentTarget.parentElement?.querySelectorAll("button");
                  buttons?.[n]?.focus();
                }}
              >
                <span>{project.number}</span>
                <strong>{project.title}</strong>
                <ArrowUpRight size={20} />
              </button>
            ))}
          </div>
          <div className="rail-copy">
            <span>
              {p.category === "Personal"
                ? "Personal project"
                : "Published mobile game"}
            </span>
            <p>{p.overview}</p>
          </div>
          <div className="stage-controls">
            <button
              className="icon-button"
              aria-label="Previous project"
              onClick={() => select((active + 6) % 7)}
            >
              <ArrowLeft />
            </button>
            <span>{p.number} / 07</span>
            <button
              className="icon-button"
              aria-label="Next project"
              onClick={() => select((active + 1) % 7)}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="mobile-projects">
        {projects.map((project, i) => {
          const a = project.sections.flatMap(mediaFor)[0];
          return (
            <a
              key={project.slug}
              href={"#project-" + project.slug}
              className="mobile-project"
              style={{ background: accents[i] }}
            >
              <span>
                {project.number} / {project.category}
              </span>
              <h3>{project.title}</h3>
              {a ? (
                <Image
                  src={a.poster || a.src}
                  alt={project.title + " original artwork"}
                  width={a.width}
                  height={a.height}
                  sizes="90vw"
                />
              ) : (
                <FileText size={60} />
              )}
              <span>
                Explore project <ArrowUpRight />
              </span>
            </a>
          );
        })}
      </div>
      <div className="case-studies">
        <div className="case-list-heading">
          <h3>Inside the work</h3>
          <span>Full stories, original gameplay & documentation</span>
        </div>
        {projects.map((project, i) => (
          <CaseStudy
            project={project}
            key={project.slug}
            detailsRef={(el) => {
              details.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
