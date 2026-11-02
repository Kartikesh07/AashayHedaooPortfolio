"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { sectionEntrance } from "@/lib/motion";
import { PROFILE } from "@/data/profile";
import { editorialSans } from "./editorialFonts";
import { SKILL_PRESENTATION } from "./expertisePresentation";
import styles from "./ExpertiseSection.module.css";

const CATEGORIES = PROFILE.skillCategories.map((category, index) => ({
  ...category,
  id: `expertise-category-${index + 1}`,
  skills: category.skills.map((name, skillIndex) => ({
    name,
    category: category.title,
    id: `expertise-skill-${index + 1}-${skillIndex + 1}`,
    ...SKILL_PRESENTATION[name],
  })),
}));
const SKILLS = CATEGORIES.flatMap((category) => category.skills);
const DEFAULT_SKILL = SKILLS.find((skill) => skill.name === "Level Design") ?? SKILLS[0];
export function ExpertiseSection() {
  const [selectedId, setSelectedId] = useState(DEFAULT_SKILL?.id);
  const reducedMotion = useReducedMotion();
  const entrance = sectionEntrance(reducedMotion);

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className={`${styles.section} ${editorialSans.className}`}
    >
      <div className={styles.container}>
        <motion.div className={styles.identifiers} {...entrance} data-expertise-reveal>
          <p>05 / Expertise</p>
          <p>Design capabilities &amp; tools</p>
        </motion.div>

        <motion.header className={styles.intro} {...entrance} data-expertise-reveal>
          <h2 id="expertise-heading" className={styles.headline}>The craft.</h2>
          <p className={styles.subtitle}>
            Different disciplines.<br />{" "}One connected design practice.
          </p>
        </motion.header>

        <motion.div className={styles.wall} {...entrance} data-expertise-reveal>
          {CATEGORIES.map((category) => (
            <div key={category.id} className={styles.discipline}>
              <h3 id={category.id} className={styles.categoryHeading}>{category.title}</h3>
              <ul className={styles.terms} aria-labelledby={category.id}>
                {category.skills.map((skill) => (
                  <li key={skill.id}>
                    <button
                      type="button"
                      className={styles.skill}
                      data-emphasis={skill.emphasis ?? "support"}
                      aria-pressed={selectedId === skill.id}
                      aria-controls={`${skill.id}-focus`}
                      onClick={() => setSelectedId(skill.id)}
                    >
                      {skill.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className={styles.hint}>Select a discipline to explore its role in the practice.</p>
        </motion.div>

        <motion.div className={styles.focus} {...entrance} data-expertise-reveal>
          <p className={styles.focusLabel}>In focus</p>
          <div className={styles.focusContent} role="region" aria-label="Selected discipline" aria-live="polite" aria-atomic="true">
            {SKILLS.map((skill) => (
              <div
                key={skill.id}
                id={`${skill.id}-focus`}
                className={styles.focusEntry}
                data-selected={selectedId === skill.id}
                aria-hidden={selectedId !== skill.id}
                inert={selectedId !== skill.id}
              >
                <div className={styles.focusIdentity}>
                  <p className={styles.focusCategory}>{skill.category}</p>
                  <h3 className={styles.focusTitle}>{skill.name}</h3>
                </div>
                <p className={styles.focusDescription}>
                  {skill.description ?? `Exploring ${skill.name.toLowerCase()} as part of a connected game design practice.`}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className={styles.toolkit} {...entrance} data-expertise-reveal>
          <div className={styles.toolkitIntro}>
            <h3 className={styles.toolkitHeading}>Production toolkit</h3>
            <p>Tools used across design, production, analytics, and documentation.</p>
          </div>
          <dl className={styles.toolIndex}>
            {PROFILE.tools.map((tool) => (
              <div key={tool.name} className={styles.tool}>
                <dt>{tool.name}</dt>
                <dd>{tool.category}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
