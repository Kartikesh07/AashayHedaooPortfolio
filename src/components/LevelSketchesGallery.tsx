"use client";

import { useState } from "react";
import Image from "next/image";
import { PenTool, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface SketchItem {
  id: string;
  image: string;
  title: string;
  category: string;
  note: string;
}

const SKETCHES: SketchItem[] = [
  {
    id: "s1",
    image: "/images/MAG3jDQYblU.jpg",
    title: "Wobble Bomber // Arena Sightlines & Teleporters",
    category: "Level Blueprint",
    note: "Tactical cover density, gray wall choke points, and symmetrical teleporter nodes for 5v5 balance."
  },
  {
    id: "s2",
    image: "/images/MAG3jBbZmJY.jpg",
    title: "Wobble Bomber // Poison Cloud Constriction Zone",
    category: "Spatial Mechanics",
    note: "Centripetal gas cloud timeline forcing final combat confrontations into central arena."
  },
  {
    id: "s3",
    image: "/images/MAG3jETFoh0.jpg",
    title: "Wobble Bomber // Cover & Stealth Bush Geometry",
    category: "Sightline Design",
    note: "Calibrating 5-second bomb throw distance vs bush concealment radii."
  },
  {
    id: "s4",
    image: "/images/MAG3jGirsP0.jpg",
    title: "DreamLink // Dual-Reality Spatial Overlay",
    category: "Asymmetric Co-op",
    note: "Mapping Reality (R) breaker switches to Dream (D) crystal bridge manifestations."
  },
  {
    id: "s5",
    image: "/images/MAG3i0nkRIg.jpg",
    title: "Pizza IQ // Geometric Slice Puzzle #42",
    category: "Rough Level Design",
    note: "Testing 3-cut topological solutions under strict topping distribution rules."
  },
  {
    id: "s6",
    image: "/images/MAG3i26IaKU.jpg",
    title: "Pizza IQ // Delivery Box Grid Packing #78",
    category: "Rough Level Design",
    note: "Spatial constraint puzzle drafting irregular polygon slice fitment into square containers."
  },
  {
    id: "s7",
    image: "/images/MAG3i3CIHoo.jpg",
    title: "Pizza IQ // Wacky Physics & Oven Balance #112",
    category: "Rough Level Design",
    note: "Balancing pizza paddle weight distribution and momentum transfer."
  },
  {
    id: "s8",
    image: "/images/MAG3i3LAI1I.jpg",
    title: "Pizza IQ // Culinary Misdirection #156",
    category: "Rough Level Design",
    note: "Visual disguise layer placement hiding key ingredients from immediate observation."
  }
];

export function LevelSketchesGallery() {
  const [selectedSketch, setSelectedSketch] = useState<SketchItem | null>(null);

  return (
    <section id="sketches" className="py-20 md:py-28 border-b border-[#D8D2C2] bg-[#EDE9DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#D8D2C2]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#F36B45] rounded-xs" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#667169] font-medium">
                Design Blueprints & Paper Prototyping
              </span>
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[#17231F] tracking-tight uppercase">
              Rough Sketches & Spatial Blueprints
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#667169] max-w-md font-sans">
            Authentic drafting artifacts showing how levels, sightlines, and puzzle topologies
            are conceived on paper before being implemented in the engine.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {SKETCHES.map((sketch) => (
            <div
              key={sketch.id}
              onClick={() => setSelectedSketch(sketch)}
              className="group cursor-pointer bg-[#F7F4EC] rounded-xs border border-[#D8D2C2] overflow-hidden hover:border-[#17231F] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 bg-black overflow-hidden">
                <Image
                  src={sketch.image}
                  alt={sketch.title}
                  width={500}
                  height={375}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#F7F4EC] text-[#17231F] font-mono text-xs font-semibold shadow-xs">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Inspect Blueprint
                  </span>
                </div>
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-xs bg-[#17231F]/90 font-mono text-[10px] text-[#C8F17A]">
                    {sketch.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="font-display font-bold text-sm text-[#17231F] line-clamp-1 group-hover:text-[#F36B45] transition-colors">
                  {sketch.title}
                </h3>
                <p className="text-xs text-[#667169] line-clamp-2 font-sans">
                  {sketch.note}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedSketch && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
            onClick={() => setSelectedSketch(null)}
          >
            <div
              className="bg-[#17231F] text-[#F7F4EC] max-w-4xl w-full rounded-xs border border-[#2F453E] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-[#2F453E]">
                <div className="space-y-0.5">
                  <div className="font-mono text-xs text-[#C8F17A]">
                    {selectedSketch.category}
                  </div>
                  <div className="font-display font-bold text-lg text-[#F7F4EC]">
                    {selectedSketch.title}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSketch(null)}
                  className="p-2 rounded-xs bg-[#233530] hover:bg-[#F36B45] text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative max-h-[70vh] bg-black flex items-center justify-center p-2">
                <Image
                  src={selectedSketch.image}
                  alt={selectedSketch.title}
                  width={1200}
                  height={800}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              <div className="p-4 bg-[#1E2E29] border-t border-[#2F453E]">
                <p className="text-xs sm:text-sm text-[#EDE9DD] font-sans">
                  {selectedSketch.note}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

