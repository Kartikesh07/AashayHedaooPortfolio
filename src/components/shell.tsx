"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ArrowUpRight, ArrowUp, Menu, X, Asterisk } from "lucide-react";
import { email, linkedin } from "@/data/portfolio";
const routes = [
  ["Home", "/"],
  ["Projects", "/projects"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuRef.current?.focus();
      }
      if (open && e.key === "Tab") {
        const nodes = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".mobile-menu a, .menu-button",
          ),
        );
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={scrolled ? "header scrolled" : "header"}>
        <Link
          href="/"
          className="wordmark"
          aria-label="Aashay Hedaoo home"
          onClick={() => setOpen(false)}
        >
          aashay<span className="brand-star">✳</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {routes.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                (href === "/" ? path === "/" : path.startsWith(href))
                  ? "page"
                  : undefined
              }
            >
              {name}
              {(href === "/" ? path === "/" : path.startsWith(href)) && (
                <motion.span layoutId="nav-dot" className="nav-dot" />
              )}
            </Link>
          ))}
        </nav>
        <Link className="button small header-cta" href="/contact">
          Let’s talk <ArrowUpRight size={17} />
        </Link>
        <button
          ref={menuRef}
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {routes.map(([name, href], i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link href={href} onClick={() => setOpen(false)}>
                  <span className="mono">0{i + 1}</span>
                  {name}
                  <ArrowUpRight />
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      <main id="main" key={path} inert={open}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
      <footer inert={open}>
        <div className="footer-top">
          <span className="eyebrow">
            <span className="lime-dot" /> CONTACT
          </span>
          <span className="mono">YOUR NEXT DESIGNER.</span>
        </div>
        <Link className="footer-title" href="/contact">
          Designed to play.
          <br />
          <span>Let’s connect.</span>
          <ArrowUpRight aria-hidden="true" />
        </Link>
        <div className="footer-links">
          <a href={`mailto:${email}`}>
            {email}
            <ArrowUpRight size={18} />
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <Link href="/" className="wordmark">
            aashay
            <Asterisk size={24} />
          </Link>
          <span>© {new Date().getFullYear()} Aashay Hedaoo</span>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            Back to top <ArrowUp size={16} />
          </button>
        </div>
      </footer>
      <Cursor />
    </MotionConfig>
  );
}
function Cursor() {
  const x = useMotionValue(-100),
    y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 32 }),
    sy = useSpring(y, { stiffness: 350, damping: 32 });
  const [label, setLabel] = useState("");
  useEffect(() => {
    if (
      !window.matchMedia(
        "(pointer:fine) and (prefers-reduced-motion:no-preference)",
      ).matches
    )
      return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setLabel(
        (e.target as HTMLElement).closest("[data-project]")
          ? "View project"
          : (e.target as HTMLElement).closest("a,button")
            ? "↗"
            : "",
      );
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);
  return (
    <motion.div
      aria-hidden
      className={`cursor ${label === "View project" ? "cursor-project" : label ? "cursor-active" : ""}`}
      style={{ x: sx, y: sy }}
    >
      {label}
    </motion.div>
  );
}
