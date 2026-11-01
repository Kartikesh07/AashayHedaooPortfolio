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

// Editorial grouping of responsibilities and examples verified in the source.
const STAGES: ProcessStage[] = [
  {
    "id": "discover",
    "step": "01",
    "title": "Discover",
    "subtitle": "Theme & Player Experience",
    "icon": Compass,
    "accent": "#F36B45",
    "coreQuestion": "How can the theme create varied and engaging puzzles?",
    "methodology": [
      "Work within the project’s theme and available assets.",
      "Combine logical deduction with unexpected solutions.",
      "Consider player motivation alongside difficulty and progression."
    ],
    "caseStudyExample": {
      "game": "Pizza IQ",
      "action": "Created and implemented pizza-themed logic puzzles using limited assets in inventive ways.",
      "metric": "180+ puzzle levels"
    },
    "quote": "Design emphasis: varied challenges within a consistent theme."
  },
  {
    "id": "prototype",
    "step": "02",
    "title": "Prototype",
    "subtitle": "Mechanics & Level Structure",
    "icon": Hammer,
    "accent": "#C8F17A",
    "coreQuestion": "How can the layout teach a mechanic through play?",
    "methodology": [
      "Create new game mechanics and rapid prototypes.",
      "Explore platform, rope and obstacle arrangements through rough level designs.",
      "Structure levels around environmental interactions."
    ],
    "caseStudyExample": {
      "game": "Mr. Bullet · Detective IQ",
      "action": "Designed and implemented progressively structured levels using ricochets, bombs and breakable planks.",
      "metric": "400+ levels"
    },
    "quote": "Design emphasis: build mechanical understanding through level progression."
  },
  {
    "id": "playtest",
    "step": "03",
    "title": "Playtest",
    "subtitle": "Testing & Iteration",
    "icon": Users,
    "accent": "#F36B45",
    "coreQuestion": "How can testing and iteration improve the player experience?",
    "methodology": [
      "Test new mini-games and features.",
      "Balance progression and refine gameplay through iteration.",
      "Use analytics to inform gameplay and retention improvements."
    ],
    "caseStudyExample": {
      "game": "Detective IQ 3",
      "action": "Combined progression balancing, testing and continuous iteration with mini-game design, animations and UI assets.",
      "metric": "End-to-end mini-game design"
    },
    "quote": "Design emphasis: testing and iteration support a polished experience."
  },
  {
    "id": "refine",
    "step": "04",
    "title": "Refine",
    "subtitle": "Difficulty & Learning Through Play",
    "icon": Sliders,
    "accent": "#17231F",
    "coreQuestion": "How can new mechanics arrive at a pace that supports player learning?",
    "methodology": [
      "Introduce mechanics gradually through a smooth difficulty curve.",
      "Teach advanced strategies without explicit instruction.",
      "Use milestone challenges to sustain motivation."
    ],
    "caseStudyExample": {
      "game": "Detective IQ 2 · Eraser",
      "action": "Structured a 500-level progression around gradual mechanic introductions and learning through play.",
      "metric": "500-level progression"
    },
    "quote": "Design emphasis: balance challenge with the player’s developing skill."
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
            Explore the design responsibilities behind the work: mechanics,
            rough layouts, testing, progression and player experience.
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
                  <span className="font-mono text-[11px] text-[#8E9B92]">Portfolio evidence:</span>
                  <span className="font-mono text-xs font-bold text-[#C8F17A] bg-[#2F453E] px-2 py-0.5 rounded-xs">
                    {activeStage.caseStudyExample.metric}
                  </span>
                </div>
              </div>

              {/* Philosophy Quote */}
              <div className="p-5 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] text-xs font-sans italic text-[#667169] leading-relaxed">
                {activeStage.quote}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

