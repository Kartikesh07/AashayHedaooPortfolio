// Editorial art direction only. Facts and asset provenance remain in data/projects.ts.
export interface SceneDirection {
  treatment: string;
  title: string[];
  statement: string;
  accent: string;
  surface: string;
}
export const SCENE_DIRECTIONS: Record<string, SceneDirection> = {
  "detective-iq-3": { treatment: "detective", title: ["Detective", "IQ 3"], statement: "A new puzzle. A new way to think.", accent: "#b5b7ff", surface: "#181a30" },
  "krishna-stories": { treatment: "krishna", title: ["Krishna", "Stories"], statement: "Many ways to play. One connected journey.", accent: "#efca8b", surface: "#30231c" },
  "detective-iq-2": { treatment: "eraser", title: ["Detective", "IQ 2"], statement: "Discovery, one layer at a time.", accent: "#b5d7cf", surface: "#192b2a" },
  "detective-iq-1": { treatment: "original", title: ["Detective IQ"], statement: "Observe. Experiment. Find another way.", accent: "#b4c9ec", surface: "#1c2534" },
  "pizza-iq": { treatment: "pizza", title: ["Pizza", "IQ"], statement: "A familiar theme. Unexpected solutions.", accent: "#f0b39b", surface: "#33221f" },
  "wobble-bomber": { treatment: "blueprint", title: ["Wobble", "Bomber"], statement: "Team tactics meet coordinated chaos.", accent: "#ffb09b", surface: "#22262c" },
  dreamlink: { treatment: "dream", title: ["DreamLink"], statement: "Two perspectives. One fractured timeline.", accent: "#d2c3f0", surface: "#241e36" },
};
