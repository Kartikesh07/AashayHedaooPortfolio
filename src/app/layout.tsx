import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const ibmMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aashayhedaoo.com"),
  title: "Aashay Hedaoo — Senior Game & Level Designer | THE PLAYBOOK",
  description:
    "Portfolio of Aashay Hedaoo, Mobile Game Designer & Senior Level Designer with 1,500+ levels designed and 10M+ downloads. Specializing in high-retention mechanics, progressive puzzle difficulty curves, and systemic player psychology.",
  keywords: [
    "Game Designer",
    "Level Designer",
    "Aashay Hedaoo",
    "Game Design Portfolio",
    "Mobile Game Designer",
    "Puzzle Design",
    "Physics Mechanics",
    "Retention Architecture",
    "Detective IQ",
    "Krishna Stories Game"
  ],
  authors: [{ name: "Aashay Hedaoo" }],
  creator: "Aashay Hedaoo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aashayhedaoo.com",
    title: "Aashay Hedaoo — Senior Game & Level Designer",
    description: "I DESIGN WHAT PLAYERS FEEL. 1,500+ crafted levels, 10M+ player downloads, 20+ published games.",
    siteName: "Aashay Hedaoo Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aashay Hedaoo — Senior Game & Level Designer",
    description: "I DESIGN WHAT PLAYERS FEEL. 1,500+ crafted levels, 10M+ player downloads, 20+ published games.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable} ${ibmMono.variable} scroll-smooth`}>
      <body className="bg-ivory text-forest antialiased min-h-screen flex flex-col font-sans selection:bg-lime selection:text-forest">
        {children}
      </body>
    </html>
  );
}
