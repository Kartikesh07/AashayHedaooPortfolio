"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F7F4EC]/90 backdrop-blur-md border-b border-[#D8D2C2] py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-xs bg-[#17231F] text-[#C8F17A] flex items-center justify-center font-display font-bold text-sm tracking-tighter group-hover:bg-[#F36B45] group-hover:text-white transition-colors duration-200">
            AH
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-[#17231F] text-base leading-tight tracking-tight">
              Aashay Hedaoo
            </span>
            <span className="font-mono text-[11px] text-[#667169] tracking-wider uppercase">
              Game & Level Designer
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/#work"
            className="text-sm font-medium text-[#17231F] hover:text-[#F36B45] transition-colors"
          >
            Selected Work
          </Link>
          <Link
            href="/#process"
            className="text-sm font-medium text-[#17231F] hover:text-[#F36B45] transition-colors"
          >
            Design Process
          </Link>
          <Link
            href="/#about"
            className="text-sm font-medium text-[#17231F] hover:text-[#F36B45] transition-colors"
          >
            About
          </Link>
          <Link
            href="/#experience"
            className="text-sm font-medium text-[#17231F] hover:text-[#F36B45] transition-colors"
          >
            Experience
          </Link>
          <Link
            href="/#sketches"
            className="text-sm font-medium text-[#17231F] hover:text-[#F36B45] transition-colors"
          >
            Blueprints
          </Link>
        </nav>

        {/* Right CTA & Availability */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17231F]/5 border border-[#17231F]/10 text-xs font-mono text-[#17231F]">
            <span className="w-2 h-2 rounded-full bg-[#C8F17A] border border-[#17231F] animate-pulse" />
            <span>Open for Opportunities</span>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-[#17231F] hover:bg-[#F36B45] text-[#F7F4EC] text-xs font-mono font-medium tracking-wide uppercase transition-colors duration-200"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#17231F] hover:text-[#F36B45] transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F7F4EC] border-b border-[#D8D2C2] px-6 py-6 space-y-4">
          <Link
            href="/#work"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-display font-medium text-[#17231F]"
          >
            Selected Work
          </Link>
          <Link
            href="/#process"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-display font-medium text-[#17231F]"
          >
            Design Process
          </Link>
          <Link
            href="/#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-display font-medium text-[#17231F]"
          >
            About & Philosophy
          </Link>
          <Link
            href="/#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-display font-medium text-[#17231F]"
          >
            Experience & Achievements
          </Link>
          <Link
            href="/#sketches"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-lg font-display font-medium text-[#17231F]"
          >
            Rough Sketches & Blueprints
          </Link>
          <div className="pt-4 border-t border-[#D8D2C2] flex flex-col gap-3">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex justify-center items-center gap-2 w-full py-3 bg-[#17231F] text-[#F7F4EC] font-mono text-xs uppercase tracking-wider rounded-xs"
            >
              Get In Touch
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

