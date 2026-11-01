import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE } from "@/data/profile";
import { PROJECTS } from "@/data/projects";
import { editorialSans, editorialSerif } from "./editorialFonts";
import styles from "./Hero.module.css";

export function Hero() {
  const featuredProject = PROJECTS.find((project) => project.slug === "detective-iq-3");
  const nameLines = PROFILE.name.split(" ");

  return (
    <section className={`${styles.hero} ${editorialSans.className}`} aria-labelledby="hero-name">
      <div className={styles.cover}>
        <p className={styles.identifier}>Game &amp; Level Designer</p>

        <h1 id="hero-name" className={styles.name} aria-label={PROFILE.name}>
          {nameLines.map((name, index) => (
            <span key={name} className={styles.nameMask} aria-hidden="true">
              <span className={styles.nameLine} style={{ animationDelay: `${index * 90}ms` }}>
                {name}{index === nameLines.length - 1 && <span className={styles.period}>.</span>}
              </span>
            </span>
          ))}
        </h1>

        <div className={styles.support}>
          <p className={`${styles.statement} ${editorialSerif.className}`}>
            Designing experiences<br className={styles.desktopBreak} /> worth playing again.
          </p>
          <div className={styles.introduction}>
            <p>
              Game and level designer crafting engaging mechanics, thoughtful
              progression, and memorable player experiences.
            </p>
            <div className={styles.actions}>
              <Link href="/#work" className={styles.primaryAction}>
                Explore Work <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/#about" className={styles.textLink}>About Me</Link>
            </div>
          </div>
        </div>

        {featuredProject?.heroPoster && (
          <div className={styles.feature}>
            <p className={styles.featureLabel}>A closer look at the work</p>
            <Link href={`/work/${featuredProject.slug}`} className={styles.projectLink}>
              <figure className={styles.projectFigure}>
                <div className={styles.media}>
                  <Image
                    src={featuredProject.heroPoster}
                    alt={`${featuredProject.title} — a preview of the game's puzzle design`}
                    width={340}
                    height={592}
                    sizes="(max-width: 599px) 76vw, (max-width: 899px) 280px, 340px"
                    preload
                    className={styles.projectImage}
                  />
                </div>
                <figcaption className={styles.caption}>
                  <span className={styles.projectTitle}>{featuredProject.title}</span>
                  <span className={styles.projectAction}>
                    View Project <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.projectRole}>{featuredProject.role}</span>
                </figcaption>
              </figure>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

