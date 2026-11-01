"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  FileText,
  CheckCircle2,
  Sliders,
  Cpu,
  Eye,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX
} from "lucide-react";
import { Project, PROJECTS } from "@/data/projects";

export function CaseStudyDetail({ project }: { project: Project }) {
  const [activeLens, setActiveLens] = useState<"player" | "systems" | "iteration">("player");
  
  // Interactive mechanic simulator state
  const [simulatorValue, setSimulatorValue] = useState(50);
  const [coopDimension, setCoopDimension] = useState<"reality" | "dream">("reality");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Find next project
  const currentIndex = PROJECTS.findIndex((p) => p.slug === project.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <article className="min-h-screen bg-[#F7F4EC] text-[#17231F] pb-24">
      
      {/* Top Breadcrumb & Nav */}
      <div className="bg-[#EDE9DD] border-b border-[#D8D2C2] py-4 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#17231F] hover:text-[#F36B45] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Selected Work</span>
          </Link>

          <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-[#667169]">
            <span>{project.category}</span>
            <span>•</span>
            <span className="text-[#17231F] font-semibold">{project.title}</span>
          </div>

          <div className="flex items-center gap-2">
            {project.links.playStore && (
              <a
                href={project.links.playStore}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#17231F] hover:bg-[#F36B45] text-white font-mono text-[11px] uppercase transition-colors"
              >
                <span>Store</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.links.gddDocument && (
              <a
                href={project.links.gddDocument}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#233530] hover:bg-[#17231F] text-[#C8F17A] font-mono text-[11px] uppercase transition-colors"
              >
                <span>GDD</span>
                <FileText className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Cinematic Project Header */}
      <header className="py-16 md:py-24 border-b border-[#D8D2C2] bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="space-y-4 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 rounded-xs bg-[#17231F] text-[#C8F17A] font-mono text-xs font-semibold">
                CASE STUDY
              </span>
              <span className="px-2.5 py-1 rounded-xs bg-[#EDE9DD] text-[#667169] border border-[#D8D2C2] font-mono text-xs">
                {project.category}
              </span>
              <span className="font-mono text-xs text-[#667169]">
                {project.studio} • {project.timeline}
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-[#17231F] leading-[1.0] tracking-tight">
              {project.title}
            </h1>

            <p className="font-mono text-base sm:text-lg text-[#F36B45] font-medium">
              {project.tagline}
            </p>

            <p className="text-base sm:text-xl text-[#17231F]/80 font-sans leading-relaxed pt-2">
              {project.summary}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#D8D2C2]">
            <div className="p-4 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-1">
              <div className="font-mono text-[11px] text-[#667169] uppercase tracking-wider">
                My Role
              </div>
              <div className="font-display font-bold text-base text-[#17231F]">
                {project.role}
              </div>
            </div>

            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-1">
                <div className="font-mono text-[11px] text-[#667169] uppercase tracking-wider">
                  {m.label}
                </div>
                <div className="font-display font-bold text-xl text-[#17231F]">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Media Presentation: Gameplay Video Showcase */}
        {project.heroVideo && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F36B45]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#667169] font-medium">
                  Recorded In-Game Footage
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#667169]">
                Continuous Playback Preview
              </span>
            </div>

            <div className="relative rounded-xs overflow-hidden bg-black aspect-video border border-[#D8D2C2] shadow-lg group">
              <video
                src={project.heroVideo}
                poster={project.heroPoster}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xs bg-black/70 backdrop-blur-xs text-white hover:bg-[#F36B45] transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Section 1: Challenge & Player Experience */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#F36B45] font-semibold">
                01 // DESIGN PROBLEM
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#17231F]">
              The Core Challenge
            </h2>
            <p className="text-base text-[#17231F]/85 font-sans leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4 p-8 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#17231F] font-semibold">
                02 // EMOTION & COGNITION
              </span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#17231F]">
              Intended Player Experience
            </h2>
            <p className="text-base text-[#17231F]/85 font-sans leading-relaxed">
              {project.playerExperience}
            </p>
          </div>
        </section>

        {/* Section 2: Core Gameplay Mechanics Breakdown */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#D8D2C2]">
            <div>
              <span className="font-mono text-xs text-[#F36B45] font-semibold uppercase tracking-wider">
                03 // SYSTEMS ARCHITECTURE
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#17231F] mt-1">
                Core Gameplay Mechanics
              </h2>
            </div>
            <p className="text-xs font-mono text-[#667169]">
              Mechanic loops & feedback states
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.coreMechanics.map((mech, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="font-mono text-xs font-bold text-[#F36B45]">
                    MECHANIC 0{idx + 1}
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#17231F]">
                    {mech.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#17231F]/80 leading-relaxed font-sans">
                    {mech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Interactive Mechanic Simulator / Inspector */}
        <section className="p-8 sm:p-10 rounded-xs bg-[#17231F] text-[#F7F4EC] border border-[#2F453E] space-y-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2F453E]">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C8F17A] font-semibold">
                Interactive Mechanic Inspector
              </span>
              <h3 className="font-display font-bold text-2xl text-[#F7F4EC]">
                Simulate & Inspect Level Variables
              </h3>
            </div>
            <span className="font-mono text-xs text-[#8E9B92]">
              Physics & Cognitive Tolerance Controls
            </span>
          </div>

          {/* Dynamic Simulator based on project theme */}
          {project.slug === "dreamlink" ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCoopDimension("reality")}
                  className={`px-4 py-2 rounded-xs font-mono text-xs uppercase tracking-wider transition-colors ${
                    coopDimension === "reality"
                      ? "bg-[#F36B45] text-white font-bold"
                      : "bg-[#233530] text-[#8E9B92]"
                  }`}
                >
                  Reality Realm (R)
                </button>
                <button
                  onClick={() => setCoopDimension("dream")}
                  className={`px-4 py-2 rounded-xs font-mono text-xs uppercase tracking-wider transition-colors ${
                    coopDimension === "dream"
                      ? "bg-[#C8F17A] text-[#17231F] font-bold"
                      : "bg-[#233530] text-[#8E9B92]"
                  }`}
                >
                  Dream Realm (D)
                </button>
              </div>

              <div className="p-6 rounded-xs bg-[#1E2E29] border border-[#2F453E] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <div className="font-mono text-xs text-[#C8F17A]">
                    Active Perspective: {coopDimension.toUpperCase()}
                  </div>
                  <div className="font-display font-bold text-xl text-[#F7F4EC]">
                    {coopDimension === "reality"
                      ? "Logical Mechanical Breaker Room"
                      : "Surreal Crystalline Gravity Rift"}
                  </div>
                  <p className="text-xs text-[#EDE9DD] font-sans leading-relaxed">
                    {coopDimension === "reality"
                      ? "Player 1 interacts with electrical switches, physical hydraulic valves, and architectural floorplates governed by strict Newtonian physics."
                      : "Player 2 walks on inverted gravity planes and bends light beams through floating prismatic crystals to bridge spatial chasms."}
                  </p>
                </div>
                <div className="p-4 rounded-xs bg-[#233530] font-mono text-xs space-y-2 border border-[#2F453E]">
                  <div className="text-[#8E9B92]">// Cross-Dimension Event Bus:</div>
                  <div className="text-[#C8F17A]">
                    &gt; R_Switch_Activated = true
                  </div>
                  <div className="text-[#F36B45]">
                    &gt; D_Crystal_Bridge = INSTANTIATED
                  </div>
                  <div className="text-[#EDE9DD]">
                    &gt; State_Synchronization = 100% Deterministic
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#C8F17A]">
                    Difficulty Balancing / Tolerance Slider:
                  </span>
                  <span className="font-bold text-[#F36B45]">{simulatorValue}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={simulatorValue}
                  onChange={(e) => setSimulatorValue(Number(e.target.value))}
                  className="w-full accent-[#F36B45] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xs bg-[#1E2E29] border border-[#2F453E] space-y-1">
                  <div className="font-mono text-[10px] text-[#8E9B92] uppercase">
                    Computed Retry Rate
                  </div>
                  <div className="font-display font-bold text-lg text-[#F7F4EC]">
                    {(15 + simulatorValue * 0.35).toFixed(1)}% Retry Probability
                  </div>
                  <div className="text-[11px] text-[#8E9B92]">
                    Optimal flow: 18–25% window
                  </div>
                </div>

                <div className="p-4 rounded-xs bg-[#1E2E29] border border-[#2F453E] space-y-1">
                  <div className="font-mono text-[10px] text-[#8E9B92] uppercase">
                    Non-Verbal Cognitive Load
                  </div>
                  <div className="font-display font-bold text-lg text-[#C8F17A]">
                    {(simulatorValue * 0.9).toFixed(0)} / 100 Index
                  </div>
                  <div className="text-[11px] text-[#8E9B92]">
                    Prevents tutorial text fatigue
                  </div>
                </div>

                <div className="p-4 rounded-xs bg-[#1E2E29] border border-[#2F453E] space-y-1">
                  <div className="font-mono text-[10px] text-[#8E9B92] uppercase">
                    Projected Day-7 Retention
                  </div>
                  <div className="font-display font-bold text-lg text-[#F36B45]">
                    {Math.max(0.2, (0.75 - (simulatorValue - 50) * 0.005)).toFixed(2)}% Retention
                  </div>
                  <div className="text-[11px] text-[#8E9B92]">
                    High-volume player engagement
                  </div>
                </div>
              </div>
            </div>
          )}

        </section>

        {/* Section 4: Deep Dive Design Lens */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#D8D2C2]">
            <div>
              <span className="font-mono text-xs text-[#F36B45] font-semibold uppercase tracking-wider">
                04 // METHODOLOGY BREAKDOWN
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#17231F] mt-1">
                The Designer&apos;s Lens
              </h2>
            </div>

            {/* Lens Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-[#EDE9DD] rounded-xs border border-[#D8D2C2]">
              <button
                onClick={() => setActiveLens("player")}
                className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors ${
                  activeLens === "player"
                    ? "bg-[#17231F] text-white font-semibold"
                    : "text-[#667169] hover:text-[#17231F]"
                }`}
              >
                Player Exp
              </button>
              <button
                onClick={() => setActiveLens("systems")}
                className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors ${
                  activeLens === "systems"
                    ? "bg-[#17231F] text-white font-semibold"
                    : "text-[#667169] hover:text-[#17231F]"
                }`}
              >
                Systems
              </button>
              <button
                onClick={() => setActiveLens("iteration")}
                className={`px-3 py-1.5 rounded-xs font-mono text-xs transition-colors ${
                  activeLens === "iteration"
                    ? "bg-[#17231F] text-white font-semibold"
                    : "text-[#667169] hover:text-[#17231F]"
                }`}
              >
                Iteration
              </button>
            </div>
          </div>

          <div className="p-8 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-4">
            <div className="font-mono text-xs font-bold text-[#F36B45] uppercase">
              {activeLens === "player"
                ? "Cognitive Wave & Player Emotion"
                : activeLens === "systems"
                ? "Underlying Systems Logic & Constraints"
                : "Quantitative Balancing & Playtest Iteration"}
            </div>
            <p className="text-base sm:text-lg text-[#17231F] leading-relaxed font-sans">
              {project.lensBreakdown[
                activeLens === "player"
                  ? "playerExperience"
                  : activeLens === "systems"
                  ? "gameSystems"
                  : "designIteration"
              ]}
            </p>
          </div>
        </section>

        {/* Section 5: Design Process Steps */}
        <section className="space-y-6">
          <div className="pb-4 border-b border-[#D8D2C2]">
            <span className="font-mono text-xs text-[#F36B45] font-semibold uppercase tracking-wider">
              05 // STEP-BY-STEP EXECUTION
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#17231F] mt-1">
              Design Process & Production Pipeline
            </h2>
          </div>

          <div className="space-y-4">
            {project.designProcess.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] flex items-start gap-4"
              >
                <span className="w-7 h-7 rounded-xs bg-[#17231F] text-[#C8F17A] flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <p className="text-sm sm:text-base text-[#17231F]/85 font-sans leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Telemetry & Balancing */}
        <section className="p-8 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#F36B45] font-semibold uppercase tracking-wider">
              06 // TELEMETRY & BALANCING
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#17231F]">
            Data-Driven Retention Tuning
          </h2>
          <p className="text-base text-[#17231F]/85 font-sans leading-relaxed">
            {project.telemetryAndBalancing}
          </p>
        </section>

        {/* Section 7: Sketches / Visual Assets Gallery (if available) */}
        {((project.sketches && project.sketches.length > 0) || project.galleryImages.length > 0) && (
          <section className="space-y-6">
            <div className="pb-4 border-b border-[#D8D2C2]">
              <span className="font-mono text-xs text-[#F36B45] font-semibold uppercase tracking-wider">
                07 // DESIGN ARTIFACTS
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#17231F] mt-1">
                Blueprints & Design Artifacts
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(project.sketches || project.galleryImages).map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-xs overflow-hidden bg-black border border-[#D8D2C2] aspect-4/3 relative"
                >
                  <Image
                    src={img}
                    alt={`${project.title} design artifact ${idx + 1}`}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 8: Key Learnings */}
        <section className="space-y-6">
          <div className="pb-4 border-b border-[#D8D2C2]">
            <span className="font-mono text-xs text-[#F36B45] font-semibold uppercase tracking-wider">
              08 // KEY TAKEAWAYS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#17231F] mt-1">
              Design Learnings & Reflections
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.keyLearnings.map((learning, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-2"
              >
                <div className="font-mono text-xs text-[#F36B45] font-semibold">
                  TAKEAWAY 0{idx + 1}
                </div>
                <p className="text-sm text-[#17231F]/85 font-sans leading-relaxed">
                  {learning}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 9: Next Project Navigation */}
        <nav className="pt-12 border-t border-[#D8D2C2] flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#667169] hover:text-[#17231F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Selected Work</span>
          </Link>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group p-6 rounded-xs bg-[#17231F] text-[#F7F4EC] hover:bg-[#F36B45] transition-colors flex items-center justify-between gap-8 w-full sm:w-auto"
          >
            <div className="space-y-1 text-left">
              <span className="font-mono text-[10px] text-[#C8F17A] uppercase tracking-widest group-hover:text-white transition-colors">
                Next Case Study
              </span>
              <div className="font-display font-bold text-xl text-[#F7F4EC]">
                {nextProject.title}
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#C8F17A] group-hover:text-white transition-colors" />
          </Link>
        </nav>

      </div>
    </article>
  );
}

