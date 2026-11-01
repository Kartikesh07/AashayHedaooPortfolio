import { Geist, Instrument_Serif } from "next/font/google";

// Applied only to the hero and navigation, preserving the rest of the portfolio.
export const editorialSans = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const editorialSerif = Instrument_Serif({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  display: "swap",
});
