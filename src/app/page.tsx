import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Process, About, Contact } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Process />
      <About />
      <Contact />
    </>
  );
}
