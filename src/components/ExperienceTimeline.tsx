"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { sectionEntrance } from "@/lib/motion";
import { PROFILE } from "@/data/profile";
import styles from "./ExperienceTimeline.module.css";
import { editorialSans } from "./editorialFonts";

// Presentation labels only; every figure is read from the verified profile.
const FEATURED_LABELS = [
  { source: "Levels Designed", label: "Levels Designed" },
  { source: "Published Games", label: "Published Games" },
  { source: "Total Player Downloads", label: "Downloads Across Credited Games" },
];
const FEATURED = FEATURED_LABELS.flatMap((presentation) => {
  const achievement = PROFILE.achievements.find((item) => item.label === presentation.source);
  return achievement ? [{ ...achievement, displayLabel: presentation.label }] : [];
});
// The source's level-reach/retention figure has no cohort or benchmark context.
// Keep it in profile.ts, without presenting it as an isolated success metric here.
const SUPPORTING = PROFILE.achievements.filter((item) =>
  !FEATURED_LABELS.some((featured) => featured.source === item.label) &&
  item.label !== "Level 400 Retention"
);
const CREDIT_SUMMARIES: Record<string, string> = {
  "Game Wise": "Leading game design direction, from new mechanics and rapid prototypes to complete gameplay systems and progression.",
  "MindYourLogic Studios": "Designed puzzle and logic gameplay from concept to release, spanning mechanics, progression, missions and events.",
};
const CREDITS = PROFILE.experiences.map((experience) => ({
  ...experience,
  id: `credit-${experience.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
}));
const YEARS = CREDITS.flatMap((credit) => credit.period.match(/\b\d{4}\b/g) ?? []).map(Number);
const CAREER_RANGE = YEARS.length
  ? `${Math.min(...YEARS)} — ${CREDITS.some((credit) => /present/i.test(credit.period)) ? "Present" : Math.max(...YEARS)}`
  : "Professional history";

export function ExperienceTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  // Content is visible in the server output; viewport animation adds a brief reveal.
  const entrance = sectionEntrance(reducedMotion);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className={`${styles.section} ${editorialSans.className}`}
    >
      <div className={styles.container}>
        <motion.header {...entrance} data-credits-reveal>
          <div className={styles.metadata}>
            <p>06 / Experience</p>
            <p>{CAREER_RANGE}</p>
          </div>
          <p className={styles.eyebrow}>The credits</p>
          <h2 id="experience-heading" className={styles.headline}>
            <span>The work</span>{" "}
            <span>behind the work.</span>
          </h2>
          <p className={styles.subtitle}>
            Professional experience, shipped games, and the numbers behind the journey.
          </p>
        </motion.header>

        <div className={styles.achievements}>
          <dl className={styles.figures} aria-label="Selected portfolio achievements">
            {FEATURED.map((achievement) => (
              <motion.div key={achievement.label} {...entrance} className={styles.figure} data-credits-reveal>
                <dt
                  className={styles.figureLabel}
                >
                  {achievement.displayLabel}
                </dt>
                <dd className={styles.figureValue}>{achievement.stat}</dd>
                <dd className={styles.figureContext}>{achievement.description}</dd>
              </motion.div>
            ))}
          </dl>
          <div className={styles.supporting}>
            {SUPPORTING.map((achievement) => (
              <p key={achievement.label}>
                <span className={styles.supportingTitle}>{achievement.stat} / {achievement.label}</span>
                <span>{achievement.description}</span>
              </p>
            ))}
          </div>
        </div>

        <motion.div {...entrance} className={styles.credits} data-credits-reveal>
          <div className={styles.creditsHeading}>
            <h3>Professional credits</h3>
            <p>Studios, roles &amp; contributions</p>
          </div>
          {CREDITS.map((credit) => {
            const expanded = expandedId === credit.id;
            return (
              <article key={credit.company} className={styles.credit} data-expanded={expanded}>
                <header className={styles.creditHeader}>
                  <div className={styles.identity}>
                    <h4 className={styles.studioHeading}>
                      <button
                        id={`${credit.id}-button`}
                        type="button"
                        className={styles.studioButton}
                        aria-expanded={expanded}
                        aria-controls={`${credit.id}-notes`}
                        onClick={() => setExpandedId((current) => current === credit.id ? null : credit.id)}
                      >
                        <span>{credit.company}</span>
                        <span className={styles.indicator} aria-hidden="true">↗</span>
                      </button>
                    </h4>
                    <p className={styles.role}>{credit.role}</p>
                  </div>
                  <div className={styles.creditMetadata}>
                    <p className={styles.period}>{credit.period}</p>
                    <p>{credit.location}</p>
                  </div>
                </header>
                <div className={styles.creditBody}>
                  <p className={styles.summary}>
                    {CREDIT_SUMMARIES[credit.company] ?? credit.responsibilities[0]}
                  </p>
                  <p className={styles.actionHint} aria-hidden="true">
                    {expanded ? "Select studio to close notes" : "Select studio for production notes"}
                  </p>
                </div>
                <div
                  id={`${credit.id}-notes`}
                  role="region"
                  aria-labelledby={`${credit.id}-button`}
                  aria-hidden={!expanded}
                  inert={!expanded}
                  className={styles.reveal}
                >
                  <div className={styles.revealClip}>
                    <div className={styles.productionNotes}>
                      <p className={styles.notesLabel}>Production notes</p>
                      <ul className={styles.responsibilities}>
                        {credit.responsibilities.map((responsibility) => (
                          <li key={responsibility}>{responsibility}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </motion.div>

        <p className={styles.closing}>
          From designing individual challenges to shaping complete player experiences.
        </p>
      </div>
    </section>
  );
}
