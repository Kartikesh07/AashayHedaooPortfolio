import Link from "next/link";
import { ArrowDown, ArrowUpRight, Asterisk } from "lucide-react";
import { intro, source } from "@/data/portfolio";
import { HeroArt } from "@/components/hero-art";
import { ProjectGrid } from "@/components/projects";
import { Reveal } from "@/components/ui";
export default function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <Reveal>
            <div className="eyebrow">
              <span className="status-dot" /> AASHAY HEDAOO — MOBILE GAME
              DESIGNER
            </div>
            <h1>
              Hello, I am
              <br />
              <span>Aashay!</span>
              <span className="heading-spark" aria-hidden>
                ✳
              </span>
            </h1>
            <p className="hero-description">{intro}</p>
            <div className="hero-actions">
              <Link href="/projects" className="button">
                Explore My Work <ArrowUpRight size={20} />
              </Link>
              <Link href="/about" className="text-link">
                About me <ArrowUpRight size={18} />
              </Link>
            </div>
            <span className="hero-note mono">{source[0].texts[2]}</span>
          </Reveal>
        </div>
        <HeroArt />
        <div className="hero-bottom mono">
          <span>GAME DESIGN / LEVEL DESIGN / SYSTEMS DESIGN</span>
          <a href="#selected">
            SCROLL TO EXPLORE <ArrowDown size={15} />
          </a>
        </div>
      </section>
      <div className="discipline-strip" aria-label="Design disciplines">
        <span>Game Design</span>
        <Asterisk />
        <span>Level Design</span>
        <Asterisk />
        <span>Systems Design</span>
        <Asterisk />
        <span>Player Experience</span>
        <Asterisk />
      </div>
      <section className="wrap section" id="selected">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">01 / THE WORK</span>
            <h2>
              Selected projects<span className="lime-period">.</span>
            </h2>
          </div>
          <Link href="/projects" className="text-link">
            All projects <span className="count">07</span>
            <ArrowUpRight size={20} />
          </Link>
        </Reveal>
        <ProjectGrid />
        <Link href="/projects" className="button outline all-work">
          Explore all projects <ArrowUpRight size={20} />
        </Link>
      </section>
      <section className="about-preview">
        <div className="wrap about-preview-grid">
          <Reveal>
            <span className="eyebrow">02 / THE DESIGNER</span>
            <h2>
              Your next
              <br />
              <span>designer.</span>
            </h2>
            <Link className="button" href="/about">
              More about me <ArrowUpRight size={20} />
            </Link>
          </Reveal>
          <Reveal>
            <p className="about-lead">{source[1].texts[0].split("\n")[0]}</p>
            <div className="mini-stats">
              <div>
                <strong>1,500+</strong>
                <span>Levels Designed</span>
              </div>
              <div>
                <strong>4+</strong>
                <span>Years Professional Experience</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="wrap section">
        <Reveal className="section-heading">
          <div>
            <span className="eyebrow">03 / BEYOND THE BUILD</span>
            <h2>
              Ideas on paper<span className="lime-period">.</span>
            </h2>
          </div>
        </Reveal>
        <div className="concept-links">
          <Link href="/projects/wobble-bomber">
            <span className="mono">06 / PERSONAL PROJECT</span>
            <h3>Wobble Bomber</h3>
            <ArrowUpRight />
          </Link>
          <Link href="/projects/dreamlink">
            <span className="mono">07 / PERSONAL PROJECT</span>
            <h3>DreamLink: The Fractured Timeline</h3>
            <ArrowUpRight />
          </Link>
        </div>
      </section>
    </>
  );
}
