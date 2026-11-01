import Image from "next/image";
import { ArrowDownRight, ArrowUp, ArrowUpRight, FileText } from "lucide-react";
import { biography, email, linkedin, mediaFor, source } from "@/data/portfolio";
import { DesignDesk } from "./design-desk";
import { Gallery } from "./gallery";
import { Reveal, MagneticLink } from "./reveal";

export function Process() {
  return (
    <section id="process" tabIndex={-1} className="process-section section-pad">
      <div className="wrap">
        <div className="process-heading">
          <h2>
            Loose ideas.
            <br />
            Playful possibilities.
          </h2>
          <p>
            The design desk
            <br />
            Original sketches, rough levels
            <br />
            and the thinking behind the play.
          </p>
        </div>
        <DesignDesk />
        <details className="archive-details">
          <summary>
            Explore all original level sketches <PlusSign />
          </summary>
          <Gallery
            items={mediaFor(19).slice(3)}
            title="Rough Level Design archive"
          />
        </details>
        <div className="document-strip">
          <FileText size={28} strokeWidth={1.3} />
          <div>
            <span className="eyebrow">THE THINKING, DOCUMENTED</span>
            <h3>Go beyond the finished game.</h3>
          </div>
          <a className="text-link" href="#project-wobble-bomber">
            Design documents live in each project <ArrowDownRight size={19} />
          </a>
        </div>
      </div>
    </section>
  );
}

function PlusSign() {
  return (
    <span aria-hidden className="plus-sign">
      +
    </span>
  );
}

export function About() {
  return (
    <section id="about" tabIndex={-1} className="about-section section-pad">
      <div className="wrap">
        <Reveal className="about-intro">
          <div>
            <span className="eyebrow">Meet the mind behind the mechanics</span>
            <h2>
              A little logic.
              <br />
              <span className="blue">A lot of curiosity.</span>
            </h2>
            <span className="about-signature">
              Aashay Hedaoo<span>Game &amp; Level Designer</span>
            </span>
          </div>
          <div className="bio-copy">
            <span className="eyebrow">{source[1].texts[1]}</span>
            <p className="original-copy">{biography}</p>
            <a
              className="text-link"
              href={linkedin}
              target="_blank"
              rel="noreferrer"
            >
              More on LinkedIn <ArrowUpRight size={18} />
            </a>
          </div>
        </Reveal>
        <div className="achievement-heading">
          <span className="eyebrow">{source[5].texts[0]}</span>
          <span className="mono">THE IMPACT OF PLAY</span>
        </div>
        <div className="achievements">
          {source[5].texts.slice(1).map((t, i) => (
            <Reveal key={t} className="achievement">
              <span className="mono achievement-index">0{i + 1} /</span>
              <h3>{t.split("\n")[0]}</h3>
              <p>{t.split("\n").slice(1).join("\n")}</p>
            </Reveal>
          ))}
        </div>
        <div className="experience-layout">
          <div>
            <span className="eyebrow">THE JOURNEY SO FAR</span>
            <h3 className="subheading">Work Experience</h3>
            <p>
              From individual levels
              <br />
              to complete gameplay systems.
            </p>
          </div>
          <div className="timeline">
            {[3, 4].map((s) => (
              <article className="timeline-item" key={s}>
                <div className="timeline-top">
                  <span className="mono">{source[s].texts[1]}</span>
                  <span className="mono">{source[s].texts[2]}</span>
                </div>
                <h4>{source[s].texts[0]}</h4>
                <p className="role">{source[s].texts[3]}</p>
                <details>
                  <summary>
                    Responsibilities <PlusSign />
                  </summary>
                  <div className="responsibilities">
                    {source[s].texts
                      .slice(4)
                      .filter((t) => t !== "Work Experience")
                      .map((t, i) => (
                        <p key={i} className="original-copy">
                          {t}
                        </p>
                      ))}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </div>
        <div className="skills-layout">
          <div>
            <span className="eyebrow">THE TOOLKIT</span>
            <h3 className="subheading">{source[20].texts[0]}</h3>
            <details className="skill-index">
              <summary>
                {source[2].texts[0]} index <PlusSign />
              </summary>
              <p>{source[2].texts.slice(1).join(" · ")}</p>
            </details>
          </div>
          <div className="skill-groups">
            {[4, 1, 2, 3].map((label, i) => (
              <div key={label}>
                <h4>{source[20].texts[label]}</h4>
                <ul>
                  {source[20].texts[5 + i].split("\n").map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="tools">
          <span className="eyebrow">{source[21].texts[6]}</span>
          {source[21].texts.slice(0, 6).map((t, i) => (
            <span className="tool" key={t}>
              <Image
                src={mediaFor(21)[i].src}
                alt=""
                width={mediaFor(21)[i].width}
                height={mediaFor(21)[i].height}
                sizes="44px"
              />
              {t}
            </span>
          ))}
        </div>
        <Reveal className="offscreen">
          <div className="offscreen-copy">
            <span className="eyebrow">WHEN THE SCREEN IS OFF</span>
            <h3>
              Still making.
              <br />
              Still exploring.
            </h3>
            <details>
              <summary>
                {source[24].texts[0]} <PlusSign />
              </summary>
              {source[24].texts.slice(1).map((t) => (
                <p className="original-copy" key={t}>
                  {t}
                </p>
              ))}
            </details>
          </div>
          <div className="artwork-preview">
            <Gallery items={mediaFor(25).slice(0, 2)} title="Sketches" />
            <span className="mono">
              {source[25].texts[0]} / FROM MY PERSONAL SKETCHBOOK
            </span>
          </div>
        </Reveal>
        <details className="archive-details art-archive">
          <summary>
            Open the complete sketchbook <PlusSign />
          </summary>
          <Gallery
            items={[...mediaFor(25).slice(2), ...mediaFor(26)]}
            title="Personal artwork"
          />
        </details>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <footer id="contact" tabIndex={-1} className="contact-section dark-section">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Have something in mind?</span>
          <div className="contact-heading">
            <h2>
              Let’s make
              <br />
              some play.
            </h2>
            <p className="contact-original">{source[0].texts[2]}</p>
            <MagneticLink
              className="contact-arrow magnetic"
              cursor="Say hello"
              href={`mailto:${email}`}
              label="Email Aashay Hedaoo"
            >
              <ArrowUpRight strokeWidth={1.2} />
            </MagneticLink>
          </div>
          <div className="contact-details">
            <a className="contact-email" href={`mailto:${email}`}>
              {email}
              <ArrowUpRight size={25} />
            </a>
            <div>
              <a href={linkedin} target="_blank" rel="noreferrer">
                LinkedIn
                <ArrowUpRight size={17} />
              </a>
              <a href={`tel:+91${source[27].texts[2]}`}>
                {source[27].texts[2]}
                <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </Reveal>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {source[27].texts[3]}
          </span>
          <span className="mono">{source[27].texts[0]} FOR PLAYING ALONG.</span>
          <a href="#home">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
