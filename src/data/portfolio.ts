import original from "./source.json";
import assetData from "./assets.json";
export const source = original;
export type Asset = {
  id: string;
  src: string;
  width: number;
  height: number;
  original: string;
  poster?: string;
};
export const assets: Record<string, Asset> = assetData;
export const email = "aashayhedaoo96148@gmail.com";
export const linkedin = "https://www.linkedin.com/in/aashay-hedaoo";
export const biography = source[1].texts[0];
export const intro = source[0].texts[1];
export type Project = {
  slug: string;
  title: string;
  category: string;
  sections: number[];
  cover?: string;
  color: string;
  number: string;
  overview: string;
};
const definitions = [
  {
    slug: "krishna-stories",
    title: "Krishna stories",
    category: "Mobile",
    sections: [6, 7],
    cover: "MAHRCRhwd4Q",
    color: "#dce6bf",
  },
  {
    slug: "detective-iq-3",
    title: "Detective IQ 3",
    category: "Mobile",
    sections: [8],
    cover: "MAHRC1dK9uE",
    color: "#c9d4ed",
  },
  {
    slug: "detective-iq-2",
    title: "Detetive IQ 2",
    category: "Mobile",
    sections: [9, 10, 11, 12, 13],
    cover: "VAG2aDeQqm4",
    color: "#e4d8ec",
  },
  {
    slug: "detective-iq",
    title: "Detective IQ",
    category: "Mobile",
    sections: [14, 15, 16, 17],
    cover: "VAG3e04kpq4",
    color: "#d5e2da",
  },
  {
    slug: "pizza-iq",
    title: "Pizza IQ",
    category: "Mobile",
    sections: [18, 19],
    cover: "VAG2azvU0lc",
    color: "#f3d0b0",
  },
  {
    slug: "wobble-bomber",
    title: "Wobble Bomber",
    category: "Personal",
    sections: [22],
    color: "#bdf45a",
  },
  {
    slug: "dreamlink",
    title: "DreamLink: The Fractured Timeline",
    category: "Personal",
    sections: [23],
    color: "#5855f7",
  },
];
export const projects: Project[] = definitions.map((p, i) => ({
  ...p,
  number: String(i + 1).padStart(2, "0"),
  overview: source[p.sections[0]].texts.find((t) => t.length > 200) || "",
}));
export const mediaFor = (section: number) =>
  source[section].refs
    .map((id) => assets[id])
    .filter((a) => a && !["MAG2OmrpU-U", "MAG2Op69u90"].includes(a.id));
