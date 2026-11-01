import { source } from "./portfolio";

export const chapterHeadings: Record<number, string> = {
  6: "Krishna stories", 7: "Mini Games", 8: "Detective IQ 3",
  9: "Detetive IQ 2", 10: "Erase Level Gameplay", 11: "Cut Rope Gameplay",
  12: "Bullet Gameplay", 13: "Retention Graphs", 14: "Detective IQ",
  15: "Cases and Flashback", 16: "Bullet gameplay (DIQ1)", 17: "Draw to save",
  18: "Pizza IQ", 19: "Rough Level Design", 22: "Wobble Bomber",
  23: "DreamLink: The Fractured Timeline",
};

export const documents: Record<number, { href: string; label: string }[]> = {
  22: [
    { href: "/documents/wobble-bomber-game-design.docx", label: "Game design document" },
    { href: "/documents/wobble-bomber-level-design.docx", label: "Level Design Document" },
  ],
  23: [{ href: "/documents/dreamlink-game-design.docx", label: "Game design document for Dreamlink" }],
};

export function originalLinkLabel(href: string, section: number, index: number) {
  if (href.includes("play.google")) return "Google Play";
  if (href.includes("apps.apple")) return "App Store";
  if (href.includes("spotify")) return "Original media link";
  return source[section].texts.filter((text) => text.length < 100 &&
    ![chapterHeadings[section], "Projects", "Persnol Project"].includes(text))[index] || "Original project document";
}
