"use client";

import { useState } from "react";
import { Compass, Hammer, Users, Sliders, CheckCircle2, ArrowRight } from "lucide-react";

interface ProcessStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  icon: typeof Compass;
  accent: string;
  coreQuestion: string;
  methodology: string[];
  caseStudyExample: {
    game: string;
    action: string;
    metric: string;
  };
  quote: string;
}

const STAGES: ProcessStage[] = [
  {
    id: "discover",
    step: "01",
    title: "Discover",
    subtitle: "Player Cognitive Mapping & Friction Analysis",
    icon: Compass,
    accent: "#F36B45",
    coreQuestion: "What cognitive reward does the player crave, and where does mental fatigue set in?",
    methodology: [
      "Deconstruct player mental models and target demographic reaction reflexes.",
      "Analyze competitor drop-off funnels and identify under-served emotional states.",
      "Map player emotion curves across the first 30 seconds, 3 minutes, and 30 minutes of gameplay.",
      "Establish non-negotiable mechanic constraints (e.g. 100% pizza theme, single bullet bounce limit)."
    ],
    caseStudyExample: {
      game: "Pizza IQ: Brain Game",
      action: "Identified that players felt cheated by abstract math puzzles, so all 180+ levels were reframed into humorous physical pizza-cutting dilemmas.",
      metric: "78% completion through Menu 3"
    },
    quote: "A game doesn't begin in the engine; it begins in the player's mind before they even touch the screen."
  },
  {
    id: "prototype",
    step: "02",
    title: "Prototype",
    subtitle: "Paper Blueprints & Rapid Physics Sandbox",
    icon: Hammer,
    accent: "#C8F17A",
    coreQuestion: "Can this mechanic generate 50+ surprising variations without adding bloated rules?",
    methodology: [
      "Sketch rough level blueprints by hand on gridded paper to test spatial sightlines and focal hierarchy.",
      "Build isolated Unity sandboxes to calibrate rigid body masses, rope elasticity, and angular thresholds.",
      "Verify that the core mechanic is intrinsically fun in graybox mode with zero audio or visual polish.",
      "Establish deterministic physics parameters so player failure is always perceived as fair."
    ],
    caseStudyExample: {
      game: "Mr. Bullet (Detective IQ 1)",
      action: "Built mathematical ricochet reflection matrices to ensure single-bullet trajectories were 100% deterministic and free of chaotic infinite loops.",
      metric: "400+ progressive stages authored"
    },
    quote: "If a level isn't compelling as white boxes and simple geometry, no amount of particle effects will save it."
  },
  {
    id: "playtest",
    step: "03",
    title: "Playtest",
    subtitle: "Blind Observation & GameAnalytics Cohorts",
    icon: Users,
    accent: "#F36B45",
    coreQuestion: "Where do players look first, what false clues mislead them, and why do they quit?",
    methodology: [
      "Conduct silent blind playtesting sessions without providing any verbal explanations or guidance.",
      "Track first-tap heatmaps to detect misleading background visual noise and false affordances.",
      "Monitor retry rates: calibrate standard stages to 18–25% retry windows and boss stages to 35–45%.",
      "Observe body language and facial expressions during fail-states to ensure failure evokes amusement, not anger."
    ],
    caseStudyExample: {
      game: "Detective IQ 2 (Eraser Loop)",
      action: "Observed players tapping frantically when stuck on disguise puzzles; introduced micro-jiggle animations to incorrect taps to redirect attention.",
      metric: "-26% rage-quit drop on Level 80-120"
    },
    quote: "Players are never wrong. If a player misinterprets an obstacle, the level designer failed to communicate the rule."
  },
  {
    id: "refine",
    step: "04",
    title: "Refine",
    subtitle: "Micro-Tolerances & Retention Architecture",
    icon: Sliders,
    accent: "#17231F",
    coreQuestion: "How do we stretch mechanical depth to keep players engaged across hundreds of levels?",
    methodology: [
      "Schedule new mechanic introductions precisely every 20–25 levels to reset dopamine and combat fatigue.",
      "Tune non-verbal tutorial pacing so advanced techniques are discovered organically without text prompts.",
      "Balance boss level intervals (1 boss per 5 stages) to create predictable milestone achievements.",
      "Polish celebratory micro-interactions, particle timings, and tactile audio-haptic feedback."
    ],
    caseStudyExample: {
      game: "Detective IQ 1 & 2 High-Volume Loops",
      action: "Surgically tuned level difficulty curves across 500 levels, structuring mechanic hand-offs so players naturally learned advanced momentum transfer.",
      metric: "0.5% retention at Level 400 (Top 1% benchmark)"
    },
    quote: "True retention is crafted through respect for the player's intelligence and continuous incremental mastery."
  }
];

export function DesignPhilosophy() {
  const [activeStageId, setActiveStageId] = useState("discover");
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  return (
    <section id="process" className="py-20 md:py-28 border-b border-[#D8D2C2] bg-[#EDE9DD] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D8D2C2]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#C8F17A] rounded-xs border border-[#17231F]" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#667169] font-medium">
                Design Philosophy & Methodology
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#17231F] tracking-tight uppercase">
              From Idea to Player Experience
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#667169] max-w-md font-sans">
            A disciplined, data-informed 4-stage pipeline that bridges player psychology,
            paper prototyping, telemetry cohort analytics, and mechanical retention.
          </p>
        </div>

        {/* 4-Stage Horizontal Selector Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-8">
          {STAGES.map((stage) => {
            const isSelected = stage.id === activeStageId;
            const Icon = stage.icon;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`p-5 rounded-xs border text-left transition-all duration-200 flex flex-col justify-between space-y-4 ${
                  isSelected
                    ? "bg-[#17231F] text-[#F7F4EC] border-[#17231F] shadow-md -translate-y-1"
                    : "bg-[#F7F4EC] text-[#17231F] border-[#D8D2C2] hover:border-[#17231F]/50 hover:bg-[#FAF8F3]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono text-xs font-bold tracking-widest ${
                      isSelected ? "text-[#C8F17A]" : "text-[#F36B45]"
                    }`}
                  >
                    PHASE {stage.step}
                  </span>
                  <Icon
                    className={`w-5 h-5 ${
                      isSelected ? "text-[#C8F17A]" : "text-[#667169]"
                    }`}
                  />
                </div>
                <div>
                  <div className="font-display font-bold text-xl leading-tight">
                    {stage.title}
                  </div>
                  <div
                    className={`text-xs font-mono line-clamp-1 mt-1 ${
                      isSelected ? "text-[#8E9B92]" : "text-[#667169]"
                    }`}
                  >
                    {stage.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Active Stage Showcase */}
        <div className="bg-[#F7F4EC] rounded-xs border border-[#D8D2C2] p-6 sm:p-10 shadow-sm mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Narrative & Principles (Cols 1-7) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#F36B45] font-semibold">
                    PHASE {activeStage.step} // PRINCIPLE
                  </span>
                </div>
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#17231F]">
                  {activeStage.title}: {activeStage.subtitle}
                </h3>
              </div>

              {/* Core Question Callout */}
              <div className="p-4 rounded-xs bg-[#EDE9DD] border-l-4 border-[#F36B45]">
                <div className="font-mono text-[11px] text-[#667169] uppercase tracking-wider mb-1">
                  Core Guiding Question
                </div>
                <p className="text-sm sm:text-base font-medium text-[#17231F] font-sans">
                  &ldquo;{activeStage.coreQuestion}&rdquo;
                </p>
              </div>

              {/* Methodology Checklist */}
              <div className="space-y-3 pt-2">
                <div className="font-mono text-xs text-[#17231F] uppercase tracking-wider font-semibold">
                  Execution Methodology
                </div>
                <div className="space-y-2.5">
                  {activeStage.methodology.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-[#F36B45] shrink-0 mt-0.5" />
                      <p className="text-sm text-[#17231F]/80 font-sans leading-relaxed">
                        {m}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Case Study Evidence (Cols 8-12) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Authentic Game Example Card */}
              <div className="p-6 rounded-xs bg-[#17231F] text-[#F7F4EC] border border-[#2F453E] space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#2F453E]">
                  <span className="font-mono text-xs text-[#C8F17A] uppercase tracking-wider font-semibold">
                    Applied In Production
                  </span>
                  <span className="font-mono text-[11px] text-[#8E9B92]">
                    Verified Case
                  </span>
                </div>

                <div className="font-display font-bold text-xl text-[#F7F4EC]">
                  {activeStage.caseStudyExample.game}
                </div>

                <p className="text-xs text-[#EDE9DD] leading-relaxed font-sans">
                  {activeStage.caseStudyExample.action}
                </p>

                <div className="pt-3 border-t border-[#2F453E] flex items-center justify-between">
                  <span className="font-mono text-[11px] text-[#8E9B92]">Telemetry Impact:</span>
                  <span className="font-mono text-xs font-bold text-[#C8F17A] bg-[#2F453E] px-2 py-0.5 rounded-xs">
                    {activeStage.caseStudyExample.metric}
                  </span>
                </div>
              </div>

              {/* Philosophy Quote */}
              <div className="p-5 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] text-xs font-sans italic text-[#667169] leading-relaxed">
                &ldquo;{activeStage.quote}&rdquo;
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

