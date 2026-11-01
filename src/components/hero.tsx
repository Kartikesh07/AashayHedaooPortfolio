"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Play, Eye, Cpu, RefreshCw, Sparkles, ShieldCheck } from "lucide-react";

type LensMode = "player" | "systems" | "iteration";

interface LensData {
  title: string;
  badge: string;
  accentColor: string;
  quote: string;
  annotations: {
    label: string;
    detail: string;
    metric?: string;
  }[];
  telemetry: {
    frictionRate: string;
    flowScore: string;
    retentionTarget: string;
  };
}

const LENS_MODES: Record<LensMode, LensData> = {
  player: {
    title: "Player Experience Lens",
    badge: "Cognitive Flow & Emotion",
    accentColor: "#F36B45",
    quote: "Designing the emotional wave: from initial curiosity to deceptive tension to the dopamine rush of non-verbal discovery.",
    annotations: [
      {
        label: "Visual Breadcrumbs",
        detail: "Organic focal points subtly guiding eyes away from red herrings.",
        metric: "94% First-Gaze Accuracy"
      },
      {
        label: "Fail-State Delight",
        detail: "Humorous micro-animations that turn failure into comedy rather than rage.",
        metric: "-38% Rage-Quit Drop"
      },
      {
        label: "Non-Verbal Onboarding",
        detail: "Zero text tutorials. Mechanic mastery learned purely through spatial feedback.",
        metric: "100% Organic Learning"
      }
    ],
    telemetry: {
      frictionRate: "18% Target Friction",
      flowScore: "9.2/10 Pacing Index",
      retentionTarget: "0.5% @ Lvl 400"
    }
  },
  systems: {
    title: "Game Systems Lens",
    badge: "Mechanic Loops & Vectors",
    accentColor: "#C8F17A",
    quote: "Mathematical consistency: raycast ricochet reflection vectors, rigid body mass friction, and deterministic obstacle logic.",
    annotations: [
      {
        label: "Specular Ricochet Physics",
        detail: "2D reflection algorithms with energy dissipation dampening per collision bounce.",
        metric: "5 Bounce Max Vector"
      },
      {
        label: "Kinetic Domino Nodes",
        detail: "Swinging weights and explosive props creating deterministic multi-kill chain reactions.",
        metric: "3-Step State Cascade"
      },
      {
        label: "Boss Interval Tuning",
        detail: "High-stakes multi-mechanic boss challenges precisely scheduled every 5 levels.",
        metric: "1:5 Cadence Ratio"
      }
    ],
    telemetry: {
      frictionRate: "35% Boss Difficulty",
      flowScore: "60 FPS RigidBody2D",
      retentionTarget: "10M+ Global Players"
    }
  },
  iteration: {
    title: "Design Iteration Lens",
    badge: "Telemetry & Cohort Balancing",
    accentColor: "#667169",
    quote: "Quantitative balancing: using GameAnalytics telemetry cohorts to surgically eliminate drop-off spikes across 1,500+ levels.",
    annotations: [
      {
        label: "Drop-Off Diagnostics",
        detail: "Pinpointing level choke points where invalid tap counts exceed baseline thresholds.",
        metric: "14% Retention Uplift"
      },
      {
        label: "Paper-to-Engine Pipeline",
        detail: "Iterating spatial layouts on physical paper blueprints before whitebox Unity authoring.",
        metric: "1,500+ Shipped Stages"
      },
      {
        label: "Cohort Funnel Telemetry",
        detail: "Monitoring day-1, day-7, and day-30 retention curves across 20 commercial releases.",
        metric: "20+ Published Titles"
      }
    ],
    telemetry: {
      frictionRate: "0.2% @ Lvl 500",
      flowScore: "2.1 Retries/Level",
      retentionTarget: "1,500+ Validated Stages"
    }
  }
};

export function Hero() {
  const [activeLens, setActiveLens] = useState<LensMode>("player");
  const lens = LENS_MODES[activeLens];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-[#D8D2C2] bg-grid-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Identifier bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#D8D2C2]/60">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 bg-[#F36B45] rounded-xs" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#17231F] font-semibold">
              THE PLAYBOOK // SENIOR GAME & LEVEL DESIGNER
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-[#667169]">
            <span>1,500+ LEVELS DESIGNED</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">10M+ DOWNLOADS</span>
            <span className="hidden sm:inline">•</span>
            <span>20+ PUBLISHED GAMES</span>
          </div>
        </div>

        {/* Asymmetric 12-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Typography & Intent (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#17231F] text-[#F7F4EC] text-xs font-mono tracking-wider">
                <span className="text-[#C8F17A]">●</span>
                <span>GAMEPLAY ARCHITECTURE & RETENTION</span>
              </div>

              {/* Expressive Headline */}
              <h1 className="font-display font-extrabold text-[#17231F] text-5xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.95] tracking-tight uppercase">
                I DESIGN <br />
                WHAT PLAYERS <br />
                <span className="text-[#F36B45] underline decoration-[#C8F17A] decoration-wavy decoration-2 underline-offset-8">
                  FEEL.
                </span>
              </h1>

              {/* Concise Pitch */}
              <p className="text-lg sm:text-xl text-[#17231F]/80 max-w-2xl font-normal leading-relaxed">
                Mobile Game Designer crafting high-retention mechanics, progressive puzzle difficulty curves,
                and systemic player psychology. Over 4+ years of shipping commercial mobile experiences across physics,
                logic, and narrative mini-games.
              </p>

              {/* CTA Row */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#F36B45] hover:bg-[#DE552F] text-white font-mono font-semibold text-xs tracking-wider uppercase rounded-xs transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <span>Explore Selected Work</span>
                  <ArrowDown className="w-4 h-4" />
                </Link>

                <Link
                  href="/#process"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-[#17231F]/5 text-[#17231F] border border-[#17231F]/30 font-mono font-medium text-xs tracking-wider uppercase rounded-xs transition-colors duration-200"
                >
                  <span>Design Philosophy</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Metric Highlights Strip */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#D8D2C2]">
                <div className="space-y-1">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-[#17231F]">
                    10M+
                  </div>
                  <div className="font-mono text-[11px] text-[#667169] uppercase tracking-wider">
                    Total Downloads
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-[#17231F]">
                    1,500+
                  </div>
                  <div className="font-mono text-[11px] text-[#667169] uppercase tracking-wider">
                    Levels Shipped
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-[#F36B45]">
                    0.5%
                  </div>
                  <div className="font-mono text-[11px] text-[#667169] uppercase tracking-wider">
                    Ret. @ Lvl 400
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-[#17231F]">
                    20+
                  </div>
                  <div className="font-mono text-[11px] text-[#667169] uppercase tracking-wider">
                    Published Games
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Signature Interactive Design Lens (Cols 8-12) */}
          <div className="lg:col-span-5">
            <div className="bg-[#17231F] text-[#F7F4EC] rounded-xs border border-[#2F453E] p-5 sm:p-6 shadow-xl relative overflow-hidden">
              
              {/* Header of the interactive widget */}
              <div className="flex items-center justify-between pb-4 border-b border-[#2F453E]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8F17A]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F7F4EC] font-semibold">
                    Interactive Design Lens
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#2F453E] text-[#C8F17A]">
                  Active Telemetry
                </span>
              </div>

              {/* Mode Selector Tabs */}
              <div className="mt-4 grid grid-cols-3 gap-1.5 p-1 bg-[#1E2E29] rounded-xs border border-[#2F453E]">
                <button
                  onClick={() => setActiveLens("player")}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xs font-mono text-[11px] font-medium transition-all duration-200 ${
                    activeLens === "player"
                      ? "bg-[#F36B45] text-white shadow-xs font-semibold"
                      : "text-[#8E9B92] hover:text-[#F7F4EC]"
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span className="truncate">Player Exp</span>
                </button>

                <button
                  onClick={() => setActiveLens("systems")}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xs font-mono text-[11px] font-medium transition-all duration-200 ${
                    activeLens === "systems"
                      ? "bg-[#C8F17A] text-[#17231F] shadow-xs font-bold"
                      : "text-[#8E9B92] hover:text-[#F7F4EC]"
                  }`}
                >
                  <Cpu className="w-3 h-3" />
                  <span className="truncate">Systems</span>
                </button>

                <button
                  onClick={() => setActiveLens("iteration")}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xs font-mono text-[11px] font-medium transition-all duration-200 ${
                    activeLens === "iteration"
                      ? "bg-[#F7F4EC] text-[#17231F] shadow-xs font-bold"
                      : "text-[#8E9B92] hover:text-[#F7F4EC]"
                  }`}
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="truncate">Iteration</span>
                </button>
              </div>

              {/* Media Preview Box with Real Gameplay Footage */}
              <div className="mt-4 relative rounded-xs overflow-hidden border border-[#2F453E] bg-black aspect-video group">
                <video
                  src="/videos/VAG2ad23V64.mp4"
                  poster="/images/VAG2ad23V64-poster.jpg"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                />

                {/* Overlaid Live Telemetry Coordinates */}
                <div className="absolute top-2 left-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-xs bg-[#17231F]/80 backdrop-blur-xs font-mono text-[10px] text-[#C8F17A] border border-[#C8F17A]/30">
                    DIQ2 // LVL 142 • RETENTION TEST
                  </span>
                </div>

                <div className="absolute bottom-2 right-2">
                  <span className="px-2 py-0.5 rounded-xs bg-[#17231F]/80 backdrop-blur-xs font-mono text-[10px] text-[#F36B45] border border-[#F36B45]/30">
                    FLOW STATE LOCKED
                  </span>
                </div>

                {/* Lens-specific dynamic indicator overlay */}
                <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <div className="font-mono text-xs text-[#C8F17A] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8F17A] animate-ping" />
                    <span>Mode: {lens.badge}</span>
                  </div>
                </div>
              </div>

              {/* Lens Narrative Quote */}
              <div className="mt-4 p-3 rounded-xs bg-[#1E2E29] border border-[#2F453E]">
                <p className="text-xs text-[#EDE9DD] italic font-sans leading-relaxed">
                  &ldquo;{lens.quote}&rdquo;
                </p>
              </div>

              {/* Annotation Breakdown List */}
              <div className="mt-4 space-y-2.5">
                {lens.annotations.map((ann, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xs bg-[#233530]/60 border border-[#2F453E] flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-mono font-medium text-[#F7F4EC]">
                        {ann.label}
                      </div>
                      <div className="text-[11px] text-[#8E9B92]">
                        {ann.detail}
                      </div>
                    </div>
                    {ann.metric && (
                      <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-xs bg-[#C8F17A]/15 text-[#C8F17A] whitespace-nowrap">
                        {ann.metric}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Telemetry Bar */}
              <div className="mt-4 pt-3 border-t border-[#2F453E] flex items-center justify-between text-[10px] font-mono text-[#8E9B92]">
                <span>{lens.telemetry.frictionRate}</span>
                <span>•</span>
                <span>{lens.telemetry.flowScore}</span>
                <span>•</span>
                <span className="text-[#C8F17A]">{lens.telemetry.retentionTarget}</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

