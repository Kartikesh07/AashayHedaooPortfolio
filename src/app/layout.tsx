import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Shell } from "@/components/shell";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://aashay-designed-to-play.mobilepiano1.chatgpt.site",
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
    <html lang="en">
      <body className={`${inter.variable} ${space.variable} ${mono.variable}`}>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
