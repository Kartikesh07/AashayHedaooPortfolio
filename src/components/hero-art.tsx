"use client";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
export function HeroArt() {
  const x = useMotionValue(0),
    y = useMotionValue(0),
    sx = useSpring(x),
    sy = useSpring(y);
  const reduced = useReducedMotion();
  return (
    <div
      className="hero-art"
      onPointerMove={(e) => {
        if (reduced || e.pointerType === "touch") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.025);
        y.set((e.clientY - r.top - r.height / 2) * 0.025);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="art-grid" />
      <motion.div className="hero-stack" style={{ x: sx, y: sy }}>
        <div className="back-frame">
          <Image
            src="/images/MAHRCRhwd4Q.png"
            alt="Krishna Stories original game artwork"
            fill
            priority
            sizes="280px"
          />
        </div>
        <Link
          href="/projects/detective-iq-3"
          className="front-frame"
          data-project="true"
        >
          <div className="frame-bar">
            <span className="mono">SELECTED WORK / 02</span>
            <ArrowUpRight size={16} />
          </div>
          <div className="frame-image">
            <Image
              src="/images/MAHRC1dK9uE.png"
              alt="Detective IQ 3 original game artwork"
              fill
              priority
              sizes="340px"
            />
          </div>
          <div className="frame-caption">
            Detective IQ 3 <span>↗</span>
          </div>
        </Link>
        <span className="art-sticker">
          DESIGNED
          <br />
          TO PLAY <MoveUpRight size={25} />
        </span>
        <div className="floating-label">
          <span className="lime-dot" /> Game Design
        </div>
        <div className="art-cross" aria-hidden>
          ✳
        </div>
      </motion.div>
      <span className="art-coordinate mono">IDEA → MECHANIC → EXPERIENCE</span>
    </div>
  );
}
