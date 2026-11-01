"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Check, Mail, Linkedin, FileDown, ArrowUp } from "lucide-react";
import { PROFILE } from "@/data/profile";

export function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-[#17231F] text-[#F7F4EC] pt-24 pb-12 border-t border-[#2F453E] relative overflow-hidden bg-grid-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Callout Header */}
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#233530] border border-[#2F453E] text-xs font-mono text-[#C8F17A]">
            <span className="w-2 h-2 rounded-full bg-[#C8F17A] animate-pulse" />
            <span>AVAILABLE FOR SENIOR GAME & LEVEL DESIGN ROLES</span>
          </div>

          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.95] tracking-tight uppercase text-[#F7F4EC]">
            LET&apos;S MAKE <br />
            SOMETHING PLAYERS <br />
            <span className="text-[#C8F17A] underline decoration-[#F36B45] decoration-2 underline-offset-8">
              REMEMBER.
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-[#EDE9DD]/80 max-w-2xl font-sans leading-relaxed pt-2">
            Looking for a Senior Level Designer or Game Systems Architect who combines quantitative
            retention telemetry with genuine player empathy and hands-on mechanic craftsmanship? Let&apos;s connect.
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${PROFILE.email}`}
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xs bg-[#F36B45] hover:bg-[#DE552F] text-white font-mono font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-sm hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email Message</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xs bg-[#233530] hover:bg-[#2F453E] text-[#F7F4EC] border border-[#2F453E] font-mono text-xs font-medium tracking-wider uppercase transition-colors duration-200"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#C8F17A]" />
                <span className="text-[#C8F17A]">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#8E9B92]" />
                <span>Copy {PROFILE.email}</span>
              </>
            )}
          </button>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-xs bg-[#233530] hover:bg-[#2F453E] text-[#F7F4EC] border border-[#2F453E] font-mono text-xs font-medium tracking-wider uppercase transition-colors duration-200"
          >
            <Linkedin className="w-4 h-4 text-[#C8F17A]" />
            <span>LinkedIn Profile</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Downloadable Documents Section */}
        <div className="mt-16 p-6 sm:p-8 rounded-xs bg-[#1E2E29] border border-[#2F453E] space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-[#C8F17A] font-semibold">
              Design Documentation Downloads
            </span>
            <span className="font-mono text-xs text-[#8E9B92]">
              Verified GDD & LDD Files
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <a
              href="/documents/wobble-bomber-game-design.docx"
              download
              className="p-4 rounded-xs bg-[#233530] hover:bg-[#2F453E] border border-[#2F453E] flex items-center justify-between text-xs font-mono transition-colors group"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-[#F7F4EC] group-hover:text-[#C8F17A] transition-colors">
                  Wobble Bomber GDD
                </div>
                <div className="text-[10px] text-[#8E9B92]">
                  5v5 Ragdoll Elimination .docx
                </div>
              </div>
              <FileDown className="w-4 h-4 text-[#8E9B92] group-hover:text-[#C8F17A] transition-colors" />
            </a>

            <a
              href="/documents/wobble-bomber-level-design.docx"
              download
              className="p-4 rounded-xs bg-[#233530] hover:bg-[#2F453E] border border-[#2F453E] flex items-center justify-between text-xs font-mono transition-colors group"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-[#F7F4EC] group-hover:text-[#C8F17A] transition-colors">
                  Wobble Bomber LDD
                </div>
                <div className="text-[10px] text-[#8E9B92]">
                  Arena Sightlines & Nodes .docx
                </div>
              </div>
              <FileDown className="w-4 h-4 text-[#8E9B92] group-hover:text-[#C8F17A] transition-colors" />
            </a>

            <a
              href="/documents/dreamlink-game-design.docx"
              download
              className="p-4 rounded-xs bg-[#233530] hover:bg-[#2F453E] border border-[#2F453E] flex items-center justify-between text-xs font-mono transition-colors group"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-[#F7F4EC] group-hover:text-[#C8F17A] transition-colors">
                  DreamLink GDD
                </div>
                <div className="text-[10px] text-[#8E9B92]">
                  Dual-Reality Co-op .docx
                </div>
              </div>
              <FileDown className="w-4 h-4 text-[#8E9B92] group-hover:text-[#C8F17A] transition-colors" />
            </a>
          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div className="mt-16 pt-8 border-t border-[#2F453E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#8E9B92]">
          <div className="flex items-center gap-3">
            <span>&copy; {new Date().getFullYear()} Aashay Hedaoo. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Built with Next.js & Tailwind</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#F7F4EC] hover:text-[#C8F17A] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

