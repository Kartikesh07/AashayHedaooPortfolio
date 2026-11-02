"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { sectionEntrance } from "@/lib/motion";
import { PROFILE } from "@/data/profile";
import { editorialSans } from "./editorialFonts";
import styles from "./ContactFooter.module.css";

export function ContactFooter() {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copying" | "copied" | "failed">("idle");
  const reducedMotion = useReducedMotion();
  const year = new Date().toLocaleDateString("en", { year: "numeric", timeZone: "Asia/Kolkata" });

  async function copyEmail() {
    setCopyStatus("copying");
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  function backToTop() {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    const homeLink = document.querySelector<HTMLAnchorElement>('header nav a[href="/"]');
    homeLink?.focus({ preventScroll: true });
  }

  return (
    <footer id="contact" aria-labelledby="contact-heading" className={`${styles.footer} ${editorialSans.className}`}>
      <div className={styles.container}>
        <motion.div {...sectionEntrance(reducedMotion, 16)}
          data-contact-reveal>
          <p className={styles.identifier}>08 / Contact</p>
          <h2 id="contact-heading" className={styles.headline}>
            <span>Let&apos;s make</span>{" "}<span>something</span>{" "}<span>memorable.</span>
          </h2>
          <div className={styles.contactDetails}>
            <p className={styles.statement}>Great player experiences start with a conversation.</p>
            <div className={styles.emailRow}>
              <a href={`mailto:${PROFILE.email}`} className={styles.email}>{PROFILE.email}</a>
              <button type="button" className={styles.copy} onClick={copyEmail} disabled={copyStatus === "copying"}>
                {copyStatus === "copied" ? "Copied ✓" : copyStatus === "copying" ? "Copying…" : "Copy email"}
              </button>
            </div>
            <p role="status" aria-live="polite" aria-atomic="true" className={styles.copyFeedback}>
              {copyStatus === "copied" ? "Email copied to clipboard." : copyStatus === "failed" ? "Couldn’t copy. Select the email address to copy it, or use the email link." : "\u00a0"}
            </p>
          </div>
        </motion.div>
        <div className={styles.bottomStrip}>
          <p>© {year} {PROFILE.name}</p>
          <div className={styles.bottomLinks}>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">LinkedIn <span aria-hidden="true">↗</span></a>
            <button type="button" onClick={backToTop}>Back to top <span aria-hidden="true">↑</span></button>
          </div>
        </div>
      </div>
    </footer>
  );
}
