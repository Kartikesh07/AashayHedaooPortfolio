import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { CaseStudyDetail } from "@/components/CaseStudyDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Aashay Hedaoo",
    };
  }

  return {
    title: `${project.title} — Case Study | Aashay Hedaoo`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Game Design Case Study`,
      description: project.summary,
      images: project.heroImage ? [{ url: project.heroImage }] : [],
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <CaseStudyDetail project={project} />;
}

