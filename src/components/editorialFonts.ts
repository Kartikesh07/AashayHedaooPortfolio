import { Geist, Instrument_Serif } from "next/font/google";

// Applied only by the hero and navigation; existing section fonts stay intact.
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
