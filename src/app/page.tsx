import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SelectedWork } from "@/components/SelectedWork";
import { DesignPhilosophy } from "@/components/DesignPhilosophy";
import { AboutSection } from "@/components/AboutSection";
import { ExpertiseSection } from "@/components/ExpertiseSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { LevelSketchesGallery } from "@/components/LevelSketchesGallery";
import { ContactFooter } from "@/components/ContactFooter";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <SelectedWork />
        <DesignPhilosophy />
        <AboutSection />
        <ExpertiseSection />
        <ExperienceTimeline />
        <LevelSketchesGallery />
      </main>
      <ContactFooter />
    </>
  );
}

