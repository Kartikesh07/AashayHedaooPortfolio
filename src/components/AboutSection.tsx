"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { sectionEntrance } from "@/lib/motion";
import { editorialSans } from "./editorialFonts";
import styles from "./AboutSection.module.css";

// Faithful editorial summaries of PROFILE.about.passion, interests and hobbies.
const NOTES = [
  {
    id: "psychology",
    reference: "01",
    phrase: "psychology",
    category: "Human psychology",
    title: "Understanding people.",
    text: "I enjoy reading psychology books to understand decision-making, cognitive biases and emotional responses — and how these connect with the way people play.",
  },
  {
    id: "strategy",
    reference: "02",
    phrase: "strategy",
    category: "Strategy & games",
    title: "Questioning assumptions.",
    text: "I’m drawn to strategy-driven games that push players to rethink their assumptions. I enjoy analyzing player behavior and exploring creative ways to solve problems.",
  },
  {
    id: "exploration",
    reference: "03",
    phrase: "exploration",
    category: "Beyond the screen",
    title: "Exploring the real world.",
    text: "Outdoor games, adventure and long bike rides help me recharge. Exploring new places brings fresh inspiration for level layouts and challenges.",
  },
] as const;

type NoteId = (typeof NOTES)[number]["id"];

export function AboutSection() {
  const [activeNote, setActiveNote] = useState<NoteId>("psychology");
  const reducedMotion = useReducedMotion();
  const entrance = sectionEntrance(reducedMotion);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={`${styles.section} ${editorialSans.className}`}
    >
      <div className={styles.composition}>
        <motion.p
          className={styles.identifier}
          {...entrance}
          data-about-reveal
        >
          04 / About
        </motion.p>

        <motion.header {...entrance} data-about-reveal>
          <h2 id="about-heading" className={styles.headline}>
            <span>Off the clock.</span>{" "}
            <span>Still curious.</span>
          </h2>
          <p className={styles.subtitle}>
            More than mechanics, metrics, and level layouts.
          </p>
        </motion.header>

        <motion.div
          className={styles.editorial}
          {...entrance}
          data-about-reveal
        >
          <p className={styles.introduction}>
            I&apos;m Aashay. I&apos;m fascinated by what makes people think,
            experiment, and discover something new.
          </p>
          <p className={styles.narrative}>
            My curiosity reaches beyond game design — into{" "}
            {NOTES.map((note, index) => (
              <span key={note.id}>
                {index === 2 ? "and " : null}
                <button
                  type="button"
                  className={styles.annotation}
                  aria-label={`Read note ${note.reference}: ${note.phrase}`}
                  aria-pressed={activeNote === note.id}
                  aria-controls={`about-note-${note.id}`}
                  onClick={() => setActiveNote(note.id)}
                >
                  {note.phrase}
                  <sup aria-hidden="true">{note.reference}</sup>
                </button>
                {index < NOTES.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
          <p className={styles.instruction}>
            Select an underlined word to read a personal note.
          </p>

          <div
            className={styles.footnotes}
            role="region"
            aria-label="Personal notes"
            aria-live="polite"
            aria-atomic="true"
          >
            {NOTES.map((note) => (
              <article
                key={note.id}
                id={`about-note-${note.id}`}
                aria-labelledby={`about-note-${note.id}-title`}
                aria-hidden={activeNote !== note.id}
                inert={activeNote !== note.id}
                data-active={activeNote === note.id}
                className={styles.note}
              >
                <span className={styles.reference} aria-hidden="true">
                  {note.reference}
                </span>
                <div className={styles.noteContent}>
                  <p className={styles.category}>{note.category}</p>
                  <h3 id={`about-note-${note.id}-title`} className={styles.noteTitle}>
                    {note.title}
                  </h3>
                  <p className={styles.noteText}>{note.text}</p>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.p
          className={styles.signature}
          {...entrance}
          data-about-reveal
        >
          Curiosity doesn&apos;t clock out.
        </motion.p>
      </div>
    </section>
  );
}
