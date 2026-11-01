import { ArrowDownRight, ArrowUp, ArrowUpRight } from "lucide-react";
import { biography, email, linkedin, mediaFor, source } from "@/data/portfolio";
import { DesignLab } from "./design-lab";
import { Gallery } from "./gallery";

export function Process() {
  return <section id="process" tabIndex={-1} data-destination className="design-lab paper-surface" aria-labelledby="lab-title"><div className="atlas-container">
    <div className="section-entry"><span className="annotation">02 / THE DESIGN LAB</span><span className="annotation">FROM IDEA TO INTERACTION</span></div>
    <div className="lab-heading"><h2 id="lab-title">Thinking<br />in play.</h2><p>A closer look at the process.<br />Original sketches, rough level designs, and the documentation behind the work.</p></div>
    <DesignLab />
    <a href="#about" className="section-onward">Meet the designer behind the work<ArrowDownRight size={21} /></a>
  </div></section>;
}

export function About() {
  return <section id="about" tabIndex={-1} data-destination className="designer-section paper-surface" aria-labelledby="designer-title"><div className="atlas-container exhibition-layout">
    <aside className="exhibition-margin"><span className="annotation">03</span><span className="annotation">THE DESIGNER</span><span className="margin-route" aria-hidden="true" /></aside>
    <div className="designer-content">
      <div className="designer-heading"><span className="annotation">{source[0].texts[0]}</span><h2 id="designer-title">Aashay<br />Hedaoo.</h2><p>Game &amp; Level Designer</p></div>
      <div className="biography"><span className="annotation">PROFILE / {source[1].texts[1]}</span><div>{biography.split("\n").map((text, i) => <p key={i}>{text}</p>)}<a className="route-link" href={linkedin} target="_blank" rel="noreferrer">Connect on LinkedIn<ArrowUpRight size={18} /></a></div></div>
      <section className="designer-record" aria-labelledby="experience-title"><div className="record-heading"><span className="annotation">THE PROFESSIONAL JOURNEY</span><h3 id="experience-title">Work Experience</h3></div>
        <div className="experience-timeline">{[3, 4].map((section) => <article key={section} className="experience-entry"><span className="timeline-stop" aria-hidden="true" /><div className="experience-dates"><span>{source[section].texts[1]}</span><span>{source[section].texts[2]}</span></div><h4>{source[section].texts[0]}</h4><p className="experience-role">{source[section].texts[3]}</p><details><summary>Responsibilities<PlusMark /></summary><div className="responsibility-copy">{source[section].texts.slice(4).filter((text) => text !== "Work Experience").map((text, i) => <p key={i}>{text}</p>)}</div></details></article>)}</div>
      </section>
      <section className="designer-record" aria-labelledby="achievements-title"><div className="record-heading"><span className="annotation">CONTRIBUTIONS &amp; MILESTONES</span><h3 id="achievements-title">{source[5].texts[0]}</h3></div><div className="achievement-register">{source[5].texts.slice(1).map((text, i) => <article key={i}><span className="annotation">{String(i + 1).padStart(2, "0")}</span><div><h4>{text.split("\n")[0]}</h4><p>{text.split("\n").slice(1).join("\n")}</p></div></article>)}</div></section>
      <section className="designer-record" aria-labelledby="skills-title"><div className="record-heading"><span className="annotation">DESIGN PRACTICE</span><h3 id="skills-title">{source[20].texts[0]}</h3></div><div className="expertise-columns">{[4, 1, 2, 3].map((label, i) => <div key={label}><h4>{source[20].texts[label]}</h4><ul>{source[20].texts[5 + i].split("\n").map((text) => <li key={text}>{text}</li>)}</ul></div>)}</div><div className="text-register"><h4>{source[21].texts[6]}</h4><p>{source[21].texts.slice(0, 6).join(" / ")}</p></div><details className="skill-register"><summary>{source[2].texts[0]} index<PlusMark /></summary><p>{source[2].texts.slice(1).join(" · ")}</p></details></section>
      <section className="designer-record" aria-labelledby="interests-title"><div className="record-heading"><span className="annotation">BEYOND THE LEVEL</span><h3 id="interests-title">{source[24].texts[0]}</h3></div><div className="interests-copy">{source[24].texts.slice(1).map((text, i) => <p key={i}>{text}</p>)}</div><details className="sketchbook"><summary>{source[25].texts[0]} / The personal sketchbook<PlusMark /></summary><Gallery items={[...mediaFor(25), ...mediaFor(26)]} title="Personal artwork" /></details></section>
    </div>
  </div></section>;
}

function PlusMark() { return <span className="plus-mark" aria-hidden="true">+</span>; }

export function Contact() {
  return <footer id="contact" tabIndex={-1} data-destination className="final-destination" aria-labelledby="contact-title"><div className="atlas-container">
    <div className="section-entry"><span className="annotation">04 / FINAL DESTINATION</span><span className="annotation">THE NEXT CHAPTER STARTS HERE</span></div>
    <svg className="final-route" viewBox="0 0 1000 160" fill="none" aria-hidden="true"><path d="M0 25H140C260 25 210 120 340 120H420C480 120 460 60 500 60" /><path d="M500 48l12 12-12 12-12-12z" /><circle cx="500" cy="60" r="3" /><path d="M515 60H1000" className="final-route-fade" /></svg>
    <div className="contact-center"><span className="annotation">{source[0].texts[2]}</span><h2 id="contact-title">Let’s make the<br />next connection.</h2><a className="contact-address" href={`mailto:${email}`}><span>{email}</span><ArrowUpRight size={30} strokeWidth={1.3} /></a><div className="contact-coordinates"><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={16} /></a><span aria-hidden="true">/</span><a href={`tel:+91${source[27].texts[2]}`}>+91 {source[27].texts[2]}<ArrowUpRight size={16} /></a></div></div>
    <div className="atlas-footer"><span>© {new Date().getFullYear()} {source[27].texts[3]}</span><span className="annotation">THE PLAY ATLAS / {source[27].texts[0]}</span><a href="#home">Return to the atlas<ArrowUp size={17} /></a></div>
  </div></footer>;
}
