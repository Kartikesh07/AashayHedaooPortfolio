// Seconds for Motion; matching CSS tokens live in globals.css.
export const motionTiming = { feedback: 0.16, response: 0.2, content: 0.28, expand: 0.36, entrance: 0.55, scene: 0.7 } as const;
export const motionEase = { ui: [0.2, 0.7, 0.2, 1], editorial: [0.22, 1, 0.36, 1], feedback: [0.25, 0.8, 0.25, 1] } as const;

// Server output stays visible; movement is progressive enhancement on first entry.
export function sectionEntrance(reducedMotion: boolean | null, distance = 12) {
  return {
    initial: false as const,
    whileInView: reducedMotion !== false
      ? { opacity: 1, y: 0 }
      : { opacity: [0.75, 1], y: [distance, 0] },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reducedMotion !== false ? 0 : motionTiming.entrance, ease: motionEase.editorial },
  };
}
