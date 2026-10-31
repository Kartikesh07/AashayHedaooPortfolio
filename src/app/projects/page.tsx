import type { Metadata } from "next";
import { ProjectGrid } from "@/components/projects";
import { Reveal } from "@/components/ui";
export const metadata: Metadata = { title: "Projects" };
export default function Projects() {
  return (
    <section className="wrap page-section">
      <Reveal>
        <span className="eyebrow">THE WORK / 01—07</span>
        <h1 className="page-title">
          Projects<span className="lime-period">.</span>
        </h1>
      </Reveal>
      <ProjectGrid all />
    </section>
  );
}
