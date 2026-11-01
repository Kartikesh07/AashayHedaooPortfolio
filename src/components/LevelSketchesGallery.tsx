"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";

import { SKETCHES, type SketchItem } from "@/data/sketches";

export function LevelSketchesGallery() {
  const [selectedSketch, setSelectedSketch] = useState<SketchItem | null>(null);

  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!selectedSketch) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    return () => previousFocus?.focus();
  }, [selectedSketch]);

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
            Rough puzzle layouts and personal character drawings from the original portfolio,
            presented separately from game concept documentation.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {SKETCHES.map((sketch) => (
            <button
              type="button"
              key={sketch.id}
              onClick={() => setSelectedSketch(sketch)}
              className="group text-left cursor-pointer bg-[#F7F4EC] rounded-xs border border-[#D8D2C2] overflow-hidden hover:border-[#17231F] transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <span className="block relative aspect-4/3 bg-black overflow-hidden">
                <Image
                  src={sketch.image}
                  alt={sketch.title}
                  width={500}
                  height={375}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <span className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#F7F4EC] text-[#17231F] font-mono text-xs font-semibold shadow-xs">
                    <ZoomIn className="w-3.5 h-3.5" />
                    Inspect Blueprint
                  </span>
                </span>
                <span className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded-xs bg-[#17231F]/90 font-mono text-[10px] text-[#C8F17A]">
                    {sketch.category}
                  </span>
                </span>
              </span>

              <span className="block p-4 space-y-1.5">
                <span className="block font-display font-bold text-sm text-[#17231F] line-clamp-1 group-hover:text-[#F36B45] transition-colors">
                  {sketch.title}
                </span>
                <span className="block text-xs text-[#667169] line-clamp-2 font-sans">
                  {sketch.note}
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedSketch && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
            role="dialog" aria-modal="true" aria-labelledby="sketch-dialog-title"
            onKeyDown={(event) => {
              if (event.key === "Escape") { event.stopPropagation(); setSelectedSketch(null); }
              if (event.key === "Tab") { event.preventDefault(); closeRef.current?.focus(); }
            }}
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
                  <div id="sketch-dialog-title" className="font-display font-bold text-lg text-[#F7F4EC]">
                    {selectedSketch.title}
                  </div>
                </div>
                <button
                  ref={closeRef} type="button"
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

