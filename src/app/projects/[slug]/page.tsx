import { redirect } from "next/navigation";
import { projects } from "@/data/portfolio";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export default async function ProjectRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(
    projects.some((p) => p.slug === slug) ? `/#project-${slug}` : "/#work",
  );
}
