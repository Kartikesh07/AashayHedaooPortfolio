"use client";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

export function MagneticLink({
  children,
  href,
  className,
  label,
  cursor,
}: {
  children: React.ReactNode;
  href: string;
  className: string;
  label?: string;
  cursor?: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 22 });
  const sy = useSpring(y, { stiffness: 220, damping: 22 });
  return (
    <motion.a
      href={href}
      className={className}
      aria-label={label}
      data-cursor={cursor}
      style={{ x: sx, y: sy }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left - bounds.width / 2) * 0.12);
        y.set((event.clientY - bounds.top - bounds.height / 2) * 0.12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onBlur={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={
        reduce
          ? {}
          : className === "about-intro"
            ? { clipPath: ["inset(0 15% 0 0)", "inset(0 0% 0 0)"] }
            : className === "offscreen"
              ? { x: [-12, 0] }
              : {}
      }
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
