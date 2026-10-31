import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { assets, projects, source, mediaFor } from "@/data/portfolio";
import { Gallery } from "@/components/gallery";
import { Retention } from "@/components/retention";
import { Reveal } from "@/components/ui";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return { title: p?.title, description: p?.overview };
}
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
export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index + projects.length - 1) % projects.length];
  const cover = p.cover ? assets[p.cover] : null;
  return (
    <>
      <section className="wrap detail-header">
        <Link href="/projects" className="text-link">
          <ArrowLeft size={17} /> All projects
        </Link>
        <div className="detail-title">
          <div>
            <span className="eyebrow">
              PROJECT {p.number} / {p.category.toUpperCase()}
            </span>
            <h1>
              {p.title}
              <span className="lime-period">.</span>
            </h1>
          </div>
          <span className="detail-category mono">
            {p.category === "Personal"
              ? "GAME DESIGN DOCUMENT"
              : "GAME DESIGN / LEVEL DESIGN"}
          </span>
        </div>
        {cover && (
          <div
            className={`detail-cover ${p.slug}`}
            style={{ background: p.color }}
          >
            <Image
              src={cover.poster || cover.src}
              alt={`${p.title} original game artwork`}
              fill
              loading="eager"
              sizes="95vw"
            />
            <span className="mono">{p.title}</span>
          </div>
        )}
      </section>
      <div className="wrap case-layout">
        <aside className="case-nav">
          <span className="eyebrow">IN THIS PROJECT</span>
          {p.sections.map((s, i) => (
            <a href={`#section-${s}`} key={s}>
              <span className="mono">0{i + 1}</span>
              {headings[s]}
            </a>
          ))}
        </aside>
        <div className="case-content">
          {p.sections.map((s) => (
            <Reveal key={s}>
              <section id={`section-${s}`} className="case-section">
                <span className="eyebrow">
                  {String(p.sections.indexOf(s) + 1).padStart(2, "0")} /{" "}
                  {s === 13
                    ? "ANALYTICS"
                    : s === 19
                      ? "DESIGN EXPLORATION"
                      : "PROJECT DETAILS"}
                </span>
                <h2>{headings[s]}</h2>
                {s === 22 && <p className="mono">{source[s].texts[0]}</p>}
                {source[s].texts
                  .filter(
                    (t) =>
                      t !== headings[s] &&
                      t !== "Projects" &&
                      t !== "Persnol Project",
                  )
                  .map((t, i) =>
                    t.length > 180 ? (
                      <p className="original-copy" key={i}>
                        {t}
                      </p>
                    ) : (
                      <p key={i} className="mono">
                        {t}
                      </p>
                    ),
                  )}
                {mediaFor(s).length > 0 && (
                  <Gallery items={mediaFor(s)} title={headings[s]} />
                )}
                {s === 13 && <Retention />}
                {source[s].links.length > 0 && (
                  <div className="project-links">
                    {source[s].links.map((href, i) => {
                      const labels = source[s].texts.filter(
                        (t) =>
                          t.length < 100 &&
                          t !== headings[s] &&
                          t !== "Projects" &&
                          t !== "Persnol Project",
                      );
                      let label = labels[i] || "Original project link";
                      if (href.includes("play.google")) label = "Google Play";
                      if (href.includes("apps.apple")) label = "App Store";
                      if (href.includes("spotify"))
                        label = "Original media link";
                      return (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {label}
                          <ArrowUpRight size={19} />
                        </a>
                      );
                    })}
                  </div>
                )}
                {s === 22 && (
                  <div className="project-links">
                    <a
                      href="/documents/wobble-bomber-game-design.docx"
                      download
                    >
                      Download Game design document <ArrowUpRight size={19} />
                    </a>
                    <a
                      href="/documents/wobble-bomber-level-design.docx"
                      download
                    >
                      Download Level Design Document <ArrowUpRight size={19} />
                    </a>
                  </div>
                )}
                {s === 23 && (
                  <div className="project-links">
                    <a href="/documents/dreamlink-game-design.docx" download>
                      Download Game design document for Dreamlink{" "}
                      <ArrowUpRight size={19} />
                    </a>
                  </div>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </div>
      <nav className="wrap project-pagination" aria-label="Project navigation">
        <Link href={`/projects/${previous.slug}`}>
          <span className="mono">PREVIOUS PROJECT</span>
          <span>
            <ArrowLeft size={20} />
            {previous.title}
          </span>
        </Link>
        <Link href={`/projects/${next.slug}`}>
          <span className="mono">NEXT PROJECT / {next.number}</span>
          <span>
            {next.title}
            <ArrowRight size={25} />
          </span>
        </Link>
      </nav>
    </>
  );
}
