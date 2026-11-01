import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { KineticHeadline } from "./KineticHeadline";
import { editorialSans } from "./editorialFonts";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={`${styles.hero} ${editorialSans.className}`} aria-labelledby="hero-headline">
      <div className={styles.composition}>
        <div className={styles.content}>
          <p className={styles.identifier}>
            <span>{PROFILE.name}</span>
            <span aria-hidden="true">/</span>
            <span>Game &amp; Level Designer</span>
          </p>
          <KineticHeadline />
          <p className={styles.description}>
            Crafting mechanics, challenges, and experiences that make every
            moment of play meaningful.
          </p>
          <Link href="/#work" className={styles.primaryAction}>
            Explore My Work <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <Link href="/#work" className={styles.scrollLink}>
          <span>Scroll to explore</span>
          <ArrowDown size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
