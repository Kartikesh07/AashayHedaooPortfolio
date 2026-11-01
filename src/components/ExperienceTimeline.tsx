import { Calendar, MapPin, CheckCircle2, Award } from "lucide-react";
import { PROFILE } from "@/data/profile";

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 md:py-28 border-b border-[#D8D2C2] bg-[#F7F4EC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D8D2C2]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#F36B45] rounded-xs" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#667169] font-medium">
                Track Record & Commercial Roles
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#17231F] tracking-tight uppercase">
              Experience & Achievements
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#667169] max-w-md font-sans">
            Proven commercial track record designing high-retention mobile puzzle titles
            at leading regional game studios.
          </p>
        </div>

        {/* 6 Achievements Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-12">
          {PROFILE.achievements.map((ach, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-2 hover:border-[#F36B45] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-black text-3xl sm:text-4xl text-[#F36B45]">
                  {ach.stat}
                </span>
                <Award className="w-5 h-5 text-[#667169]" />
              </div>
              <div className="font-display font-bold text-base text-[#17231F]">
                {ach.label}
              </div>
              <p className="text-xs text-[#667169] font-sans leading-relaxed">
                {ach.description}
              </p>
            </div>
          ))}
        </div>

        {/* Work Roles Editorial Timeline */}
        <div className="mt-16 space-y-8">
          <div className="font-mono text-xs uppercase tracking-widest text-[#17231F] font-bold pb-2 border-b border-[#D8D2C2]">
            Professional Timeline
          </div>

          <div className="space-y-8">
            {PROFILE.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-xs bg-[#EDE9DD] border border-[#D8D2C2] space-y-6 hover:border-[#17231F] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D2C2]">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-[#17231F]">
                      {exp.role}
                    </h3>
                    <div className="font-mono text-sm text-[#F36B45] font-semibold mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#667169]">
                    <span className="flex items-center gap-1.5 bg-[#F7F4EC] px-3 py-1 rounded-xs border border-[#D8D2C2]">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[#F7F4EC] px-3 py-1 rounded-xs border border-[#D8D2C2]">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="font-mono text-xs font-semibold text-[#17231F] uppercase tracking-wider">
                    Core Design Responsibilities & Contributions
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#F36B45] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#17231F]/80 font-sans leading-relaxed">
                          {resp}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

