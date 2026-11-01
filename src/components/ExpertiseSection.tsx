import { Gamepad2, BarChart3, Palette, Layers, Table, FileText, CheckCircle } from "lucide-react";
import { PROFILE } from "@/data/profile";

const TOOL_ICONS: Record<string, typeof Gamepad2> = {
  Gamepad2,
  BarChart3,
  Palette,
  Layers,
  Table,
  FileText
};

export function ExpertiseSection() {
  return (
    <section id="expertise" className="py-20 md:py-28 border-b border-[#D8D2C2] bg-[#EDE9DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D8D2C2]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#F36B45] rounded-xs" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#667169] font-medium">
                Capabilities & Tooling
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#17231F] tracking-tight uppercase">
              Skills & Systems Expertise
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#667169] max-w-md font-sans">
            Technical and creative proficiencies developed across 4+ years of shipping commercial
            free-to-play mobile games and live-service operations.
          </p>
        </div>

        {/* 4 Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {PROFILE.skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xs bg-[#F7F4EC] border border-[#D8D2C2] space-y-4 hover:border-[#17231F] transition-colors"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#D8D2C2]">
                <span className="font-mono text-xs font-bold text-[#F36B45]">
                  0{idx + 1}
                </span>
                <span className="font-mono text-[10px] text-[#667169] uppercase tracking-wider">
                  Domain
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-[#17231F]">
                {cat.title}
              </h3>

              <ul className="space-y-2 pt-1">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center gap-2 text-xs font-mono text-[#17231F]/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#17231F]/40" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tools & Workflow Stack */}
        <div className="mt-12 p-8 rounded-xs bg-[#17231F] text-[#F7F4EC] border border-[#2F453E]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#2F453E]">
            <div className="space-y-1">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C8F17A] font-semibold">
                Daily Software Stack
              </span>
              <h3 className="font-display font-bold text-2xl text-[#F7F4EC]">
                Production & Telemetry Tools
              </h3>
            </div>
            <span className="font-mono text-xs text-[#8E9B92]">
              Engine • Telemetry • 2D • Documentation
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
            {PROFILE.tools.map((tool, tIdx) => {
              const IconComponent = TOOL_ICONS[tool.iconName] || Gamepad2;
              return (
                <div
                  key={tIdx}
                  className="p-4 rounded-xs bg-[#1E2E29] border border-[#2F453E] hover:border-[#C8F17A] transition-colors flex flex-col items-center text-center space-y-2"
                >
                  <IconComponent className="w-6 h-6 text-[#C8F17A]" />
                  <div className="font-display font-bold text-sm text-[#F7F4EC]">
                    {tool.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#8E9B92]">
                    {tool.category}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

