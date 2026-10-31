import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Asterisk } from "lucide-react";
import { source, biography, mediaFor, linkedin } from "@/data/portfolio";
import { Reveal } from "@/components/ui";
import { Gallery } from "@/components/gallery";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (
    <>
      <section className="wrap page-section">
        <Reveal>
          <span className="eyebrow">ABOUT / AASHAY HEDAOO</span>
          <h1 className="page-title">
            Your next
            <br />
            <span className="cobalt">designer.</span>
          </h1>
        </Reveal>
        <div className="bio-grid">
          <div className="bio-symbol" aria-hidden>
            <Asterisk strokeWidth={0.75} />
            <span className="mono">LOGIC / EMOTION / CREATIVITY</span>
          </div>
          <Reveal>
            <h2>About</h2>
            {biography.split("\n").map((p, i) => (
              <p className="original-copy" key={i}>
                {p}
              </p>
            ))}
            <a
              className="text-link"
              href={linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <ArrowUpRight size={18} />
            </a>
          </Reveal>
        </div>
      </section>
      <section className="achievement-section">
        <div className="wrap section">
          <Reveal>
            <span className="eyebrow">THE IMPACT</span>
            <h2>
              Achievements<span className="lime-period">.</span>
            </h2>
          </Reveal>
          <div className="achievements">
            {source[5].texts.slice(1).map((t, i) => (
              <Reveal key={t}>
                <span className="mono">0{i + 1}</span>
                <h3>{t.split("\n")[0]}</h3>
                <p>{t.split("\n").slice(1).join("\n")}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section">
        <Reveal>
          <span className="eyebrow">EXPERIENCE</span>
          <h2>
            Work Experience<span className="lime-period">.</span>
          </h2>
        </Reveal>
        <div className="timeline">
          {[3, 4].map((s) => (
            <Reveal key={s} className="timeline-item">
              <div>
                <span className="mono">{source[s].texts[1]}</span>
                <h3>{source[s].texts[0]}</h3>
                <p>{source[s].texts[2]}</p>
              </div>
              <div>
                <h4>{source[s].texts[3]}</h4>
                <span className="eyebrow">{source[s].texts[4]}</span>
                <ul>
                  {source[s].texts
                    .slice(5)
                    .filter((t) => t !== "Work Experience")
                    .map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="wrap section skills-section">
        <Reveal>
          <span className="eyebrow">THE TOOLKIT</span>
          <h2>
            Skills &amp; Expertise<span className="lime-period">.</span>
          </h2>
        </Reveal>
        <div className="skill-groups">
          {[4, 1, 2, 3].map((label, i) => (
            <div key={label}>
              <h3>{source[20].texts[label]}</h3>
              <div className="chips">
                {source[20].texts[5 + i].split("\n").map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="skill-secondary">
          <h3>Skill</h3>
          <div className="chips">
            {source[2].texts.slice(1).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
        <div className="tools">
          <h3>Tools</h3>
          {source[21].texts.slice(0, -1).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>
      <section className="passion-section">
        <div className="wrap section">
          <Reveal>
            <span className="eyebrow">BEYOND THE SCREEN</span>
            <h2>
              {source[24].texts[0]}
              <span className="lime-period">.</span>
            </h2>
          </Reveal>
          <div className="passions">
            {source[24].texts.slice(1).map((t) => (
              <div key={t}>
                <h3>{t.split("\n")[0]}</h3>
                <p>{t.split("\n").slice(1).join("\n")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="wrap section">
        <Reveal>
          <span className="eyebrow">THE SKETCHBOOK</span>
          <h2>
            Sketches<span className="lime-period">.</span>
          </h2>
        </Reveal>
        <Gallery items={[...mediaFor(25), ...mediaFor(26)]} title="Sketches" />
        <Link className="button outline" href="/projects">
          Explore My Work <ArrowUpRight size={20} />
        </Link>
      </section>
    </>
  );
}
