import { ArrowUpRight, BookOpen, Compass, Bike, Brain } from "lucide-react";
import { PROFILE } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 border-b border-[#D8D2C2] bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D8D2C2]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#F36B45] rounded-xs" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#667169] font-medium">
                Designer Profile & Mindset
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#17231F] tracking-tight uppercase">
              About Aashay Hedaoo
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#667169] max-w-md font-sans">
            Game and level designer interested in how players think,
            experiment, and find flow state in mobile gaming.
          </p>
        </div>

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">
          
          {/* Left Column: Biography & Professional Narrative (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-4">
              <span className="font-mono text-xs text-[#F36B45] font-semibold uppercase tracking-wider">
                Personal Philosophy
              </span>
              <p className="font-display font-bold text-2xl sm:text-3xl text-[#17231F] leading-snug">
                &ldquo;{PROFILE.about.lead}&rdquo;
              </p>
            </div>

            <div className="space-y-4 text-base text-[#17231F]/80 leading-relaxed font-sans">
              {PROFILE.about.narrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Core Values Strip */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-1">
                <div className="font-mono text-xs font-bold text-[#F36B45] uppercase">
                  Design Core Value
                </div>
                <div className="text-sm text-[#17231F] font-medium">
                  High-retention content finely tuned for player engagement without tutorials.
                </div>
              </div>

              <div className="p-4 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-1">
                <div className="font-mono text-xs font-bold text-[#17231F] uppercase">
                  Telemetry Discipline
                </div>
                <div className="text-sm text-[#17231F] font-medium">
                  Using GameAnalytics to improve gameplay and retention.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Passions, Interests & Life Beyond Editor (Cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Passion: Psychology */}
            <div className="p-6 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-3">
              <div className="flex items-center gap-2.5 text-[#F36B45]">
                <Brain className="w-5 h-5" />
                <span className="font-mono text-xs uppercase font-bold tracking-wider">
                  Passion // Human Psychology
                </span>
              </div>
              <p className="text-sm text-[#17231F]/80 leading-relaxed font-sans">
                {PROFILE.about.passion}
              </p>
            </div>

            {/* Interests: Strategy & Behavioral Analysis */}
            <div className="p-6 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-3">
              <div className="flex items-center gap-2.5 text-[#17231F]">
                <Compass className="w-5 h-5" />
                <span className="font-mono text-xs uppercase font-bold tracking-wider">
                  Interests // Strategy & Mechanics
                </span>
              </div>
              <p className="text-sm text-[#17231F]/80 leading-relaxed font-sans">
                {PROFILE.about.interests}
              </p>
            </div>

            {/* Hobbies: Outdoor Adventure & Motorcycles */}
            <div className="p-6 rounded-xs bg-[#17231F] text-[#F7F4EC] border border-[#2F453E] space-y-3">
              <div className="flex items-center gap-2.5 text-[#C8F17A]">
                <Bike className="w-5 h-5" />
                <span className="font-mono text-xs uppercase font-bold tracking-wider">
                  Hobbies // Outdoor Exploration
                </span>
              </div>
              <p className="text-sm text-[#EDE9DD] leading-relaxed font-sans">
                {PROFILE.about.hobbies}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

