"use client";

import { useEffect, type PointerEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { editorialSerif } from "./editorialFonts";
import styles from "./Hero.module.css";

const spring = { stiffness: 180, damping: 28, mass: 0.55 };

function HeadlineLines() {
  return (
    <>
      <span className={styles.headlineRow}>
        <span className={styles.playLine}>PLAY,</span>
      </span>
      <span className={`${styles.headlineRow} ${styles.designRow} ${editorialSerif.className}`}>
        <span className={styles.designLine}>BY DESIGN.</span>
      </span>
    </>
  );
}

export function KineticHeadline() {
  const reducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const targetRadius = useMotionValue(0);
  const x = useSpring(pointerX, spring);
  const y = useSpring(pointerY, spring);
  const radius = useSpring(targetRadius, spring);
  const clipPath = useMotionTemplate`circle(${radius}px at ${x}px ${y}px)`;

  useEffect(() => {
    if (reducedMotion) {
      targetRadius.jump(0);
      radius.jump(0);
    }
  }, [reducedMotion, targetRadius, radius]);

  function revealAtPointer(event: PointerEvent<HTMLHeadingElement>) {
    if (reducedMotion !== false || event.pointerType === "touch" ||
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const entering = targetRadius.get() === 0;
    pointerX.set(Math.max(0, Math.min(bounds.width, event.clientX - bounds.left)));
    pointerY.set(Math.max(0, Math.min(bounds.height, event.clientY - bounds.top)));
    if (entering) { x.jump(pointerX.get()); y.jump(pointerY.get()); }
    targetRadius.set(Math.min(88, bounds.width * 0.12));
  }

  function restore() {
    targetRadius.set(0);
  }

  return (
    <h1
      id="hero-headline"
      className={styles.headline}
      aria-label="Play, by design."
      onPointerEnter={revealAtPointer}
      onPointerMove={revealAtPointer}
      onPointerLeave={restore}
      onPointerCancel={restore}
    >
      <span className={styles.headlineText} aria-hidden="true"><HeadlineLines /></span>
      <motion.span
        className={styles.kineticLayer}
        aria-hidden="true"
        style={reducedMotion === false ? { clipPath } : { clipPath: "circle(0px)" }}
      >
        <HeadlineLines />
      </motion.span>
    </h1>
  );
}
