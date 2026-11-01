"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Play, ExternalLink, Gamepad2, FileText, ChevronRight } from "lucide-react";
import { PROJECTS, Project } from "@/data/projects";

type CategoryFilter = "All" | "LiveOps & Systems" | "Physics & Logic" | "Original Concepts";

export function SelectedWork() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="work" className="py-20 md:py-28 border-b border-[#D8D2C2] bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D8D2C2]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#F36B45] rounded-xs" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#667169] font-medium">
                Signature Portfolio
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#17231F] tracking-tight">
              Selected Work & Case Studies
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#667169] max-w-md font-sans">
            Commercially shipped mobile games with 10M+ downloads, high-retention level architectures,
            and complete original IP game design documents.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="py-8 flex flex-wrap items-center gap-2 sm:gap-3">
          {(["All", "LiveOps & Systems", "Physics & Logic", "Original Concepts"] as CategoryFilter[]).map(
            (category) => {
              const count =
                category === "All"
                  ? PROJECTS.length
                  : PROJECTS.filter((p) => p.category === category).length;
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xs font-mono text-xs tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? "bg-[#17231F] text-[#F7F4EC] font-semibold shadow-xs"
                      : "bg-[#EDE9DD] text-[#17231F] hover:bg-[#E2DDD0]"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-xs ${
                      isActive ? "bg-[#C8F17A] text-[#17231F] font-bold" : "bg-[#D8D2C2] text-[#667169]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            }
          )}
        </div>

        {/* Curated Editorial Project Grid */}
        <div className="space-y-12">
          {filteredProjects.map((project, index) => {
            const isFeatured = index < 2; // Top 2 get hero editorial treatment
            return isFeatured ? (
              <FeaturedProjectCard key={project.slug} project={project} index={index} />
            ) : (
              <StandardProjectCard key={project.slug} project={project} index={index} />
            );
          })}
        </div>

      </div>
    </section>
  );
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="group bg-[#EDE9DD] rounded-xs border border-[#D8D2C2] overflow-hidden hover:border-[#17231F] transition-all duration-300 shadow-xs hover:shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Media Side (Left/Top) */}
        <div className="lg:col-span-7 relative bg-black aspect-video lg:aspect-auto overflow-hidden flex items-center justify-center">
          {project.heroVideo ? (
            <video
              src={project.heroVideo}
              poster={project.heroPoster}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          ) : project.heroImage ? (
            <Image
              src={project.heroImage}
              alt={project.title}
              width={800}
              height={500}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          ) : (
            <div className="p-8 text-center font-mono text-sm text-[#8E9B92]">
              Level Blueprint & GDD Showcase
            </div>
          )}

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-xs bg-[#17231F]/90 backdrop-blur-xs text-[#C8F17A] font-mono text-[11px] font-semibold border border-[#C8F17A]/30">
              FEATURED CASE STUDY
            </span>
            <span className="px-2.5 py-1 rounded-xs bg-[#17231F]/90 backdrop-blur-xs text-[#F7F4EC] font-mono text-[11px]">
              {project.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4">
            <span className="px-2.5 py-1 rounded-xs bg-black/70 backdrop-blur-xs text-[#EDE9DD] font-mono text-[10px]">
              {project.studio} • {project.timeline}
            </span>
          </div>
        </div>

        {/* Narrative & Details Side (Right) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Index & Role */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#F36B45] font-semibold uppercase tracking-wider">
                0{index + 1} // {project.role}
              </span>
              <span className="font-mono text-xs text-[#667169]">
                {project.platforms.join(" / ")}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#17231F] leading-tight">
              {project.title}
            </h3>

            {/* Tagline */}
            <p className="font-mono text-xs text-[#667169] leading-relaxed">
              {project.tagline}
            </p>

            {/* Summary */}
            <p className="text-sm text-[#17231F]/80 leading-relaxed font-sans">
              {project.summary}
            </p>

            {/* Metrics Chips */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              {project.metrics.map((m, mIdx) => (
                <div key={mIdx} className="p-2.5 rounded-xs bg-[#E5E0D2] border border-[#D8D2C2]">
                  <div className="font-display font-bold text-base text-[#17231F]">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] text-[#667169] uppercase tracking-wider">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#D8D2C2] flex items-center justify-between gap-4">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#17231F] hover:bg-[#F36B45] text-[#F7F4EC] font-mono text-xs font-semibold tracking-wider uppercase rounded-xs transition-colors duration-200"
            >
              <span>Explore Case Study</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              {project.links.playStore && (
                <a
                  href={project.links.playStore}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Google Play Store Link"
                  className="p-2 rounded-xs bg-[#E5E0D2] hover:bg-[#D8D2C2] text-[#17231F] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {project.links.gddDocument && (
                <a
                  href={project.links.gddDocument}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GDD Document Link"
                  className="p-2 rounded-xs bg-[#E5E0D2] hover:bg-[#D8D2C2] text-[#17231F] transition-colors"
                >
                  <FileText className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

        </div>

      </div>
    </article>
  );
}

function StandardProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group bg-[#EDE9DD] rounded-xs border border-[#D8D2C2] overflow-hidden hover:border-[#17231F] transition-all duration-300 shadow-xs hover:shadow-md p-6 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Metadata & Narrative (Cols 1-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#F36B45] font-semibold">
              0{index + 1}
            </span>
            <span className="font-mono text-xs text-[#667169] uppercase tracking-wider">
              {project.category} • {project.role}
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#17231F]">
            {project.title}
          </h3>

          <p className="font-mono text-xs text-[#667169]">
            {project.tagline}
          </p>

          <p className="text-sm text-[#17231F]/80 leading-relaxed font-sans line-clamp-3">
            {project.summary}
          </p>

          {/* Metrics */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.metrics.map((m, mIdx) => (
              <span
                key={mIdx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#E5E0D2] border border-[#D8D2C2] font-mono text-[11px] text-[#17231F]"
              >
                <span className="font-bold text-[#F36B45]">{m.value}</span>
                <span className="text-[#667169]">{m.label}</span>
              </span>
            ))}
          </div>

          <div className="pt-4 flex items-center gap-4">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#17231F] hover:text-[#F36B45] transition-colors"
            >
              <span>View Case Study</span>
              <ChevronRight className="w-4 h-4" />
            </Link>

            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#667169] hover:text-[#17231F] transition-colors"
              >
                <span>Store</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {project.links.gddDocument && (
              <a
                href={project.links.gddDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-[#667169] hover:text-[#17231F] transition-colors"
              >
                <span>GDD Spec</span>
                <FileText className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Right: Media / Sketch Preview (Cols 8-12) */}
        <div className="lg:col-span-5 relative bg-black aspect-video rounded-xs overflow-hidden border border-[#D8D2C2] group-hover:border-[#17231F] transition-colors">
          {project.heroVideo ? (
            <video
              src={project.heroVideo}
              poster={project.heroPoster}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-90 group-hover:opacity-100"
            />
          ) : project.heroPoster ? (
            <Image
              src={project.heroPoster}
              alt={project.title}
              width={600}
              height={340}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
          ) : project.galleryImages.length > 0 ? (
            <Image
              src={project.galleryImages[0]}
              alt={project.title}
              width={600}
              height={340}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6 text-center font-mono text-xs text-[#8E9B92]">
              Level Architecture & System Blueprint
            </div>
          )}

          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-xs bg-[#17231F]/90 font-mono text-[10px] text-[#C8F17A]">
            {project.timeline}
          </div>
        </div>

      </div>
    </article>
  );
}

