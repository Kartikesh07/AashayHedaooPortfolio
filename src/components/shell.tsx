"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const routes = ["Home", "Work", "Process", "About", "Contact"];

function Cursor() {
  const x = useMotionValue(-100),
    y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 450, damping: 35 });
  const sy = useSpring(y, { stiffness: 450, damping: 35 });
  const [label, setLabel] = useState("");
  const reduce = useReducedMotion();
  useEffect(() => {
    if (
      reduce ||
      !window.matchMedia("(hover:hover) and (pointer:fine)").matches
    )
      return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setLabel(
        (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]")?.dataset
          .cursor || "",
      );
    };
    const leave = () => {
      x.set(-100);
      y.set(-100);
    };
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduce, x, y]);
  return (
    <motion.div
      aria-hidden
      className={`cursor ${label ? "cursor-active" : ""}`}
      style={{ x: sx, y: sy }}
    >
      {label && (
        <>
          <ArrowUpRight size={19} />
          {label}
        </>
      )}
    </motion.div>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    routes.forEach((r) => {
      const el = document.getElementById(r.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const links = [
          toggle.current,
          ...Array.from(
            menu.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter((el): el is HTMLButtonElement | HTMLAnchorElement => !!el);
        if (e.shiftKey && document.activeElement === links[0]) {
          e.preventDefault();
          links.at(-1)?.focus();
        } else if (!e.shiftKey && document.activeElement === links.at(-1)) {
          e.preventDefault();
          links[0]?.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", key);
    };
  }, [open]);
  function navigate(id: string) {
    setOpen(false);
    setActive(id);
    requestAnimationFrame(() =>
      document.getElementById(id)?.focus({ preventScroll: true }),
    );
  }
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <div className="header-inner wrap">
          <a
            href="#home"
            className="identity"
            aria-label="Aashay Hedaoo, home"
            onClick={() => navigate("home")}
          >
            <span className="identity-word">
              AASHAY<span>®</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {routes.map((r) => (
              <a
                key={r}
                href={`#${r.toLowerCase()}`}
                aria-current={
                  active === r.toLowerCase() ? "location" : undefined
                }
                onClick={() => navigate(r.toLowerCase())}
              >
                {r}
                <span />
              </a>
            ))}
          </nav>
          <a
            className="header-contact"
            href="#contact"
            onClick={() => navigate("contact")}
          >
            Game & level designer
          </a>
          <button
            className="menu-button icon-button"
            ref={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <motion.nav
            ref={menu}
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {routes.map((r, i) => (
              <a
                href={`#${r.toLowerCase()}`}
                key={r}
                aria-current={
                  active === r.toLowerCase() ? "location" : undefined
                }
                onClick={() => navigate(r.toLowerCase())}
              >
                <span className="mono">0{i + 1}</span>
                {r}
                <ArrowUpRight />
              </a>
            ))}
          </motion.nav>
        )}
      </header>
      <main id="main" tabIndex={-1} inert={open}>
        {children}
      </main>
      <Cursor />
    </MotionConfig>
  );
}
