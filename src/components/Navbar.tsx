"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { editorialSans } from "./editorialFonts";
import styles from "./Navbar.module.css";

const primaryLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

const secondaryLinks = [
  { href: "/#process", label: "Design Process" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#experience", label: "Experience" },
  { href: "/#sketches", label: "Blueprints" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const ids = ["work", "process", "about", "expertise", "experience", "sketches", "contact"];
    const visible = new Set<string>();
    let observer: IntersectionObserver;
    function observeSections() {
      observer?.disconnect();
      visible.clear();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        setActiveSection([...ids].reverse().find((id) => visible.has(id)) ?? "");
      }, { rootMargin: `-80px 0px -${Math.max(0, window.innerHeight - 180)}px 0px`, threshold: 0 });
      ids.forEach((id) => {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
      });
    }
    observeSections();
    window.addEventListener("resize", observeSections, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observeSections);
    };
  }, []);

  useEffect(() => {
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    const dismissOutside = (event: PointerEvent) => {
      if (menuRef.current && event.target instanceof Node && !menuRef.current.contains(event.target)) {
        const focusedInside = menuRef.current.contains(document.activeElement);
        menuRef.current.open = false;
        if (focusedInside) menuRef.current.querySelector("summary")?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", dismissOnEscape);
    document.addEventListener("pointerdown", dismissOutside);
    return () => {
      document.removeEventListener("keydown", dismissOnEscape);
      document.removeEventListener("pointerdown", dismissOutside);
    };
  }, []);

  function closeMenu(event?: MouseEvent<HTMLAnchorElement>) {
    if (event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
    if (menuRef.current?.open && menuRef.current.contains(document.activeElement)) {
      menuRef.current.querySelector("summary")?.focus({ preventScroll: true });
    }
    if (menuRef.current) menuRef.current.open = false;
    if (event) {
      const id = event.currentTarget.hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    }
  }

  const current = (href: string) => activeSection === href.split("#")[1] ? "location" as const : undefined;

  return (
    <header className={`${styles.header} ${editorialSans.className}`}>
      <nav className={styles.navigation} aria-label="Main navigation">
        <Link href="/" className={styles.brand} aria-label="Aashay Hedaoo — home" onClick={closeMenu}>
          aashay<span>.</span>
        </Link>
        <div className={styles.links}>
          <div className={styles.primaryLinks}>
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link} aria-current={current(link.href)} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </div>
          <details className={styles.menu} ref={menuRef} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
          }}>
            <summary className={styles.menuToggle} data-section-active={Boolean(activeSection) || undefined} data-active={secondaryLinks.some((link) => current(link.href)) || undefined} aria-controls="additional-navigation">
              <span className={styles.desktopLabel}>More</span>
              <span className={styles.mobileLabel}>Menu</span>
              <span className={styles.menuSign} aria-hidden="true" />
            </summary>
            <div id="additional-navigation" className={styles.menuPanel}>
              <div className={styles.mobilePrimary}>
                {primaryLinks.map((link) => (
                  <Link key={link.href} href={link.href} aria-current={current(link.href)} onClick={closeMenu}>{link.label}</Link>
                ))}
              </div>
              {secondaryLinks.map((link) => (
                <Link key={link.href} href={link.href} aria-current={current(link.href)} onClick={closeMenu}>{link.label}</Link>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
