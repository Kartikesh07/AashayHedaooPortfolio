import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { email, linkedin } from "@/data/portfolio";
import { Reveal } from "@/components/ui";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
  return (
    <section className="wrap page-section contact-page">
      <Reveal>
        <span className="eyebrow">
          <span className="status-dot" /> CONTACT / AASHAY HEDAOO
        </span>
        <h1 className="page-title">
          Your next
          <br />
          <span className="cobalt">designer.</span>
        </h1>
        <p className="contact-thanks">Thankyou</p>
        <div className="contact-rows">
          <a href={`mailto:${email}`}>
            <span className="mono">EMAIL</span>
            <span>{email}</span>
            <ArrowUpRight />
          </a>
          <a href="tel:+918007010898">
            <span className="mono">PHONE</span>
            <span>8007010898</span>
            <ArrowUpRight />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer">
            <span className="mono">SOCIAL</span>
            <span>LinkedIn</span>
            <ArrowUpRight />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
