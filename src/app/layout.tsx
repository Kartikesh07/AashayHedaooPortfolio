import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import { Shell } from "@/components/shell";
import "./globals.css";
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Aashay Hedaoo — Game Designer",
    template: "%s — Aashay Hedaoo",
  },
  description:
    "I don't just build worlds; I craft experiences that challenge, delight, and captivate players.",
  openGraph: {
    title: "Aashay Hedaoo — Game Designer",
    description: "Game Design · Level Design · Systems Design",
    images: ["/images/MAHRC1dK9uE.png"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable} ${mono.variable}`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
