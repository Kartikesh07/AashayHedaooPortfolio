"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { editorialSans } from "./editorialFonts";
import styles from "./DesignPhilosophy.module.css";

// Editorial summaries of the audited methodology, projects.ts and profile.ts.
const PRINCIPLES = [
  {
    id: "discover", stage: "Discover",
    statement: "Find the interesting problem.",
    description: "Understand the player, the theme, and the possibilities.",
    methodology: "Start with player motivation and the constraints of the theme. Explore how available assets can create varied puzzles through logical deduction and unexpected solutions.",
    project: "Pizza IQ",
    example: "Created and implemented pizza-themed logic puzzles, finding inventive uses for a limited collection of assets.",
  },
  {
    id: "prototype", stage: "Prototype",
    statement: "Make the idea playable.",
    description: "Translate mechanics into levels and meaningful interactions.",
    methodology: "Explore mechanics through rapid prototypes and rough level layouts. Structure environmental interactions so each new challenge builds on what the player has learned.",
    project: "Mr. Bullet / Detective IQ",
    example: "Designed and implemented progressively structured levels using ricochets, bombs and breakable planks to build mechanical understanding.",
  },
  {
    id: "playtest", stage: "Playtest",
    statement: "Listen to what players do.",
    description: "Test assumptions and refine the experience through iteration.",
    methodology: "Test mechanics and features against the player experience. Balance progression through continuous iteration, using analytics to inform gameplay improvements.",
    project: "Detective IQ 3",
    example: "Balanced progression, tested and iterated on new mini-games as part of end-to-end mechanics and puzzle-driven level design.",
  },
  {
    id: "refine", stage: "Refine",
    statement: "Make every challenge count.",
    description: "Shape difficulty, progression, and the learning experience.",
    methodology: "Introduce mechanics gradually and let the levels teach advanced strategies. Shape the difficulty curve around the player’s developing skill, keeping challenge and discovery in balance.",
    project: "Detective IQ 2 / Eraser",
    example: "Structured the Eraser progression around gradual mechanic introductions and a smooth difficulty curve, helping players learn through play.",
  },
] as const;

export function DesignPhilosophy() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const entrance = {
    initial: { opacity: 0, y: reducedMotion ? 0 : 14 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
  };

  return (
    <section id="process" aria-labelledby="philosophy-heading" className={`${styles.section} ${editorialSans.className}`}>
      <div className={styles.container}>
        <motion.header {...entrance} data-philosophy-reveal transition={{ duration: reducedMotion ? 0 : 0.55 }} className={styles.intro}>
          <p className={styles.identifier}>03 / Design Philosophy</p>
          <p className={styles.kicker}>The thinking behind play</p>
          <h2 id="philosophy-heading" className={styles.headline}>
            <span>Good games don&apos;t</span>{" "}
            <span>happen by accident.</span>
          </h2>
          <motion.p {...entrance} data-philosophy-reveal transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : 0.12 }} className={styles.description}>
            Every engaging experience begins with an intentional design decision.
          </motion.p>
        </motion.header>

        <div className={styles.principles}>
          {PRINCIPLES.map((principle, index) => {
            const expanded = expandedId === principle.id;
            const headingId = `philosophy-${principle.id}-heading`;
            const panelId = `philosophy-${principle.id}-details`;

            return (
              <motion.article key={principle.id} {...entrance} data-philosophy-reveal
                transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.04 }}
                className={styles.principle} data-expanded={expanded}>
                <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div className={styles.principleBody}>
                  <h3 className={styles.principleHeading}>
                    <button type="button" id={headingId} aria-expanded={expanded} aria-controls={panelId}
                      className={styles.trigger}
                      onClick={() => setExpandedId((current) => current === principle.id ? null : principle.id)}>
                      <span className={styles.stage}>{principle.stage}</span>
                      <span className={styles.statement}>{principle.statement}</span>
                      <span className={styles.indicator} aria-hidden="true" />
                    </button>
                  </h3>
                  <p className={styles.support}>{principle.description}</p>
                  <div id={panelId} role="region" aria-labelledby={headingId} aria-hidden={!expanded} inert={!expanded} className={styles.reveal}>
                    <div className={styles.revealClip}>
                      <div className={styles.details}>
                        <p>{principle.methodology}</p>
                        <div>
                          <p className={styles.exampleLabel}>Applied in — {principle.project}</p>
                          <p>{principle.example}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className={styles.closing}>
        <motion.div {...entrance} data-philosophy-reveal transition={{ duration: reducedMotion ? 0 : 0.6 }} className={styles.closingInner}>
          <p className={styles.closingLabel}>The thinking behind play</p>
          <p className={styles.closingStatement}>
            <span>Design the feeling.</span>{" "}
            <span>Then design the system.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
