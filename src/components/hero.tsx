"use client";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { intro, source } from "@/data/portfolio";
import { MagneticLink } from "./reveal";

export function Hero() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 24 });
  const sy = useSpring(y, { stiffness: 90, damping: 24 });
  const reverseX = useTransform(sx, (v) => v * -0.65);
  const reverseY = useTransform(sy, (v) => v * -0.65);
  const tilt = useTransform(sx, [-18, 18], [-2, 2]);
  return (
    <section
      id="home"
      tabIndex={-1}
      className="hero"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.025);
        y.set((e.clientY - r.top - r.height / 2) * 0.025);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="poster-meta">
        <span>Aashay Hedaoo / Game designer</span>
        <span>An independent collection of play</span>
        <span>Portfolio — Vol. 01</span>
      </div>
      <div className="poster">
        <h1 aria-label="PLAY/FORM — Game design by Aashay Hedaoo">
          {["PLAY", "FORM"].map((word, i) => (
            <span className={`poster-line poster-line-${i}`} key={word}>
              <motion.span
                initial={{ y: reduce ? 0 : "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
                {i === 0 && <span className="poster-slash">/</span>}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.a
          className="poster-image poster-krishna"
          href="#project-krishna-stories"
          aria-label="Explore Krishna stories"
          data-cursor="Explore"
          style={{ x: sx, y: sy, rotate: tilt }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Image
            src="/images/MAHRCRhwd4Q.png"
            alt="Krishna Stories original game artwork"
            fill
            sizes="(max-width:700px) 35vw, 17vw"
            loading="eager"
            fetchPriority="high"
          />
        </motion.a>
        <motion.a
          className="poster-image poster-detective"
          href="#project-detective-iq-3"
          aria-label="Explore Detective IQ 3"
          data-cursor="Explore"
          style={{ x: reverseX, y: reverseY }}
          initial={{ opacity: 0, rotate: 12 }}
          animate={{ opacity: 1, rotate: -8 }}
          transition={{ duration: 0.8, delay: 0.55 }}
        >
          <Image
            src="/images/MAHRC1dK9uE.png"
            alt="Detective IQ 3 original game artwork"
            fill
            sizes="(max-width:700px) 27vw, 12vw"
            loading="eager"
            fetchPriority="high"
          />
        </motion.a>
        <span className="poster-side">Logic meets a little mischief.</span>
        <a
          href="#work"
          className="poster-seal"
          aria-label="Explore all seven projects"
        >
          Made
          <br />
          to play
          <ArrowDownRight size={28} />
        </a>
      </div>
      <div className="hero-bottom">
        <div>
          <p className="hello">{source[0].texts[0]}</p>
          <p className="hero-description">{intro}</p>
        </div>
        <p className="hero-discipline">
          Game design.
          <br />
          Level design.
          <br />A different way to think.
        </p>
        <MagneticLink href="#work" className="poster-cta" cursor="Explore">
          Get into the work <ArrowUpRight size={28} />
        </MagneticLink>
      </div>
      <div className="edition-strip">
        <span>Good games begin with a good question.</span>
        <span>Scroll to turn the page ↓</span>
      </div>
    </section>
  );
}
