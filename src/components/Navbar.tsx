"use client";

import { useEffect, useRef } from "react";
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
  const menuRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const dismissOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.open = false;
        menuRef.current.querySelector("summary")?.focus();
      }
    };
    const dismissOutside = (event: PointerEvent) => {
      if (menuRef.current && event.target instanceof Node && !menuRef.current.contains(event.target)) {
        menuRef.current.open = false;
      }
    };
    document.addEventListener("keydown", dismissOnEscape);
    document.addEventListener("pointerdown", dismissOutside);
    return () => {
      document.removeEventListener("keydown", dismissOnEscape);
      document.removeEventListener("pointerdown", dismissOutside);
    };
  }, []);

  function closeMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  return (
    <header className={`${styles.header} ${editorialSans.className}`}>
      <nav className={styles.navigation} aria-label="Main navigation">
        <Link href="/" className={styles.brand} aria-label="Aashay Hedaoo — home" onClick={closeMenu}>
          aashay<span>.</span>
        </Link>
        <div className={styles.links}>
          <div className={styles.primaryLinks}>
            {primaryLinks.map((link) => (
              <Link key={link.href} href={link.href} className={styles.link} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </div>
          <details className={styles.menu} ref={menuRef} onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();
          }}>
            <summary className={styles.menuToggle} aria-controls="additional-navigation">
              <span className={styles.desktopLabel}>More</span>
              <span className={styles.mobileLabel}>Menu</span>
              <span className={styles.menuSign} aria-hidden="true" />
            </summary>
            <div id="additional-navigation" className={styles.menuPanel}>
              <div className={styles.mobilePrimary}>
                {primaryLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeMenu}>{link.label}</Link>
                ))}
              </div>
              {secondaryLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu}>{link.label}</Link>
              ))}
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
