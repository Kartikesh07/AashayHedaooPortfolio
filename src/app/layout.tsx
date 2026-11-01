import type { Metadata } from "next";
import { Unbounded, IBM_Plex_Sans, Space_Mono } from "next/font/google";
import { Shell } from "@/components/shell";
import "./globals.css";
const display = Unbounded({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "The Play Atlas — Aashay Hedaoo",
    template: "%s — Aashay Hedaoo",
  },
  description:
    "I don't just build worlds; I craft experiences that challenge, delight, and captivate players.",
  openGraph: {
    title: "The Play Atlas — Aashay Hedaoo",
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
