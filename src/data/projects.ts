// Content audited against the original Canva portfolio on 2026-11-01.
// Source sections, exact video matches and unresolved items: portfolio-audit.md.
export const PORTFOLIO_SOURCE = "https://aashayhedaooportfolio.my.canva.site/";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface GameplayVideo {
  src: string;
  poster: string;
  title: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  category: "LiveOps & Systems" | "Physics & Logic" | "Original Concepts";
  status: "Published mobile game" | "Original design concept";
  role: string;
  summary: string;
  contributions: string[];
  coreMechanics: { title: string; description: string }[];
  designProcess: string[];
  challenge?: string;
  playerExperience?: string;
  results?: string[];
  media: {
    cover?: ProjectImage;
    gameplayVideos: GameplayVideo[];
    screenshots: ProjectImage[];
    conceptArt: ProjectImage[];
    levelSketches: ProjectImage[];
    designDiagrams: ProjectImage[];
  };
  links: { label: string; href: string }[];
  sourceSections: string[];
}

const clip = (id: string, title: string, width = 406, height = 720): GameplayVideo => ({
  src: `/videos/${id}.mp4`, poster: `/images/${id}-poster.jpg`, title, width, height,
});
const image = (id: string, alt: string, width: number, height: number): ProjectImage => ({ src: `/images/${id}`, alt, width, height });
const emptyMedia = { gameplayVideos: [], screenshots: [], conceptArt: [], levelSketches: [], designDiagrams: [] };

export const PROJECTS: Project[] = [
  {
    slug: "detective-iq-3", title: "Detective IQ 3", category: "LiveOps & Systems",
    status: "Published mobile game", role: "Game & Level Design · Animation & UI",
    summary: "Designed and executed new mini-games for Detective IQ 3, from mechanics and puzzle-driven level design to feature implementation, animation and UI assets.",
    contributions: ["End-to-end mechanics, puzzle-driven level design and feature implementation.", "Character-design support, 2D character and gameplay animations, UI assets and core visual elements.", "Progression balancing, testing and continuous iteration."],
    coreMechanics: [],
    designProcess: ["Develop new mini-game mechanics and puzzle levels.", "Support implementation with character animation and UI assets.", "Balance progression, test and iterate on the player experience."],
    media: { ...emptyMedia, cover: image("MAHRC1dK9uE.png", "Detective IQ 3 cover artwork", 340, 592) },
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.mindyourlogic.brain.test.logic.puzzle.detective.iq3&hl=en" },
      { label: "App Store", href: "https://apps.apple.com/in/app/detective-iq3/id6754641677" },
    ], sourceSections: ["PBmzmQnWstDlz0X1"],
  },
  {
    slug: "krishna-stories", title: "Krishna Stories Game", category: "LiveOps & Systems",
    status: "Published mobile game", role: "Game & Level Design",
    summary: "Designed and structured Krishna’s core gameplay experiences, with diverse mini-games integrated across multiple maps. Owned the gameplay loop, content pacing, difficulty balancing and level progression.",
    contributions: ["Defined mechanics and the complete gameplay loop.", "Structured mini-game content across multiple maps.", "Combined narrative integration, targeted rewards and retention-focused design."],
    coreMechanics: [
      { title: "Shoot", description: "Archery mini-game shown in the original gameplay footage." },
      { title: "Cut Save", description: "Rope-cutting rescue mini-game shown in the original gameplay footage." },
      { title: "Draw", description: "Drawing mini-game shown in the original gameplay footage." },
    ],
    designProcess: ["Define mechanics and content pacing for each mini-game.", "Balance difficulty and progression across the maps.", "Connect narrative and rewards to sustain player motivation."],
    playerExperience: "A varied mini-game experience with a balanced gameplay flow and continued motivation to progress.",
    media: { ...emptyMedia, cover: image("MAHRCRhwd4Q.png", "Krishna Stories Game cover artwork", 340, 592), gameplayVideos: [clip("VAHRCS4mmpM", "Shoot", 576, 1280), clip("VAHRCa9RWbk", "Cut Save", 576, 1280), clip("VAHRCfVtcWA", "Draw", 576, 1280)] },
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.mindyourlogic.krishnastories&hl=en" },
      { label: "App Store", href: "https://apps.apple.com/us/app/krishna-stories-game/id6779624620" },
    ], sourceSections: ["PBc48HWV6DDS7TyT", "PB4Y7hd0vdQrkshY"],
  },
  {
    slug: "detective-iq-2", title: "Detective IQ 2", category: "Physics & Logic",
    status: "Published mobile game", role: "Game & Level Design",
    summary: "Designed levels for the Eraser puzzle loop in The Eraser’s Pursuit, structuring progression around a smooth difficulty curve and learning through play. The portfolio also presents Cut Rope and Bullet gameplay alongside this work.",
    contributions: ["Structured the 500-level Eraser progression to introduce mechanics gradually.", "Designed rope-cutting puzzles around momentum, environmental physics and chain reactions.", "Presented a mobile ricochet shooter with 200+ levels, environmental bombs, switches and movable planks."],
    coreMechanics: [
      { title: "Eraser puzzles", description: "Gradual mechanic introductions teach players without explicit instruction." },
      { title: "Cut Rope", description: "Cut ropes to guide a civilian to safety. A boss level follows every five puzzles." },
      { title: "Bullet", description: "Eliminate enemies with a ricocheting bullet and environmental chain reactions." },
    ],
    designProcess: ["Build a seamless difficulty curve across the Eraser levels.", "Introduce advanced strategies through the progression itself.", "Use periodic boss puzzles as milestones in Cut Rope."],
    playerExperience: "A steady flow of challenge and discovery, with new strategies learned naturally through play.",
    results: ["The original portfolio reports approximately 0.2% of users reaching Eraser level 500. This is a level-reach figure, not a day-based retention improvement."],
    media: { ...emptyMedia,
      cover: image("VAG2aDeQqm4-poster.jpg", "Detective IQ 2 gameplay still", 406, 720),
      gameplayVideos: [clip("VAG2aDeQqm4", "Detective IQ 2 overview"), clip("VAG2ad23V64", "Eraser level gameplay"), clip("VAG2aKsJHMk", "Cut Rope gameplay"), clip("VAG2aX3RkiM", "Bullet gameplay", 324, 720)],
    },
    links: [
      { label: "Google Play", href: "https://play.google.com/store/search?q=detective%20iq%202&c=apps&hl=en_IN" },
      { label: "App Store", href: "https://apps.apple.com/om/app/detective-iq-2-catch-thieves/id6736873794" },
      { label: "Cut Rope design document", href: "https://1drv.ms/w/c/ae1b7f9ffb0852ff/EVQyeK8HqdFEhia_YfZL4jwBtkWphVpklK_j6ljDa82PRQ?e=BbdKw1" },
      { label: "Bullet design document", href: "https://1drv.ms/w/c/ae1b7f9ffb0852ff/ERtf2dikh7ZCjoDQ3t9AqyoBw3X_LWHARejmmklvHqm5mQ?e=ksyQL0" },
    ], sourceSections: ["PBXdzcB5QlpXSP9j", "PBVbBJN3dLlhTNN2", "PB5CQkGDgDnkzHsy", "PBxc7bBk6KnS2db4"],
  },
  {
    slug: "detective-iq-1", title: "Detective IQ", category: "Physics & Logic",
    status: "Published mobile game", role: "Core Content & Level Design",
    summary: "Created and implemented content across 20 mini-games in Detective IQ 1, including Mr. Bullet, Draw to Save, detective cases and Flashback observation puzzles.",
    contributions: ["Designed and implemented 400+ Mr. Bullet levels and 200+ Draw to Save levels.", "Designed 50–60 detective-case levels involving hidden clues and evidence deduction.", "Developed 30–40 Flashback levels using rewind and fast-forward to reveal visual evidence.", "Created 50–60 logical gameplay levels for individual mini-games, as described in the original portfolio."],
    coreMechanics: [
      { title: "Mr. Bullet", description: "Use a calculated bullet and environmental interactions, including bombs and breakable planks, to eliminate enemies." },
      { title: "Draw to Save", description: "Draw structures that protect a civilian from environmental hazards." },
      { title: "Detective cases & Flashback", description: "Find hidden clues, synthesize evidence and control time to inspect fleeting details." },
    ],
    designProcess: ["Structure content progressively for mechanical mastery.", "Teach environmental interactions through increasingly complex levels.", "Vary hazards to encourage creative drawing and spatial reasoning."],
    playerExperience: "Varied puzzle content that builds player skill through discovery, observation and creative problem-solving.",
    results: ["The original portfolio reports 0.5% user retention at Mr. Bullet level 400. It does not supply a day-based cohort definition or a benchmark comparison."],
    media: { ...emptyMedia,
      cover: image("VAG3e04kpq4-poster.jpg", "Detective IQ cases and Flashback gameplay still", 406, 720),
      gameplayVideos: [clip("VAG3e04kpq4", "Detective cases"), clip("VAG3e_Kg1SI", "Flashback"), clip("VAG3e9kp7K0", "Mr. Bullet gameplay", 1280, 720), clip("VAG3e4kIUBU", "Draw to Save gameplay")],
    },
    links: [
      { label: "Google Play", href: "https://play.google.com/store/search?q=detective+iq&c=apps&hl=en_IN" },
      { label: "App Store", href: "https://apps.apple.com/in/app/detective-iq-brain-games/id6443900014" },
    ], sourceSections: ["PBGHZd8sMtKPYxT3", "PBCgH06ZNX1yss3R", "PBT2yS9wDVSK13qk", "PBKq0dzyy6tzH8Sm"],
  },
  {
    slug: "pizza-iq", title: "Pizza IQ", category: "Physics & Logic",
    status: "Published mobile game", role: "Puzzle & Level Design",
    summary: "Created and implemented 180+ unique puzzle levels for Pizza IQ: Brain Game, combining logical deduction and out-of-the-box thinking within a pizza-centric theme.",
    contributions: ["Designed and implemented 180+ puzzle levels.", "Structured progressive difficulty to test IQ and spatial reasoning.", "Used limited pizza-themed assets in inventive ways."],
    coreMechanics: [{ title: "Themed logic puzzles", description: "Solve pizza-themed challenges through logical deduction, spatial reasoning and unexpected solutions." }],
    designProcess: ["Keep puzzles within the pizza theme.", "Find varied uses for the available assets.", "Structure the content for progressive difficulty."],
    challenge: "Demand inventive solutions while working with a limited, consistently pizza-themed set of assets.",
    results: ["180+ unique puzzle levels designed and implemented, as stated in the original portfolio."],
    media: { ...emptyMedia, cover: image("VAG2azvU0lc-poster.jpg", "Pizza IQ gameplay still", 406, 720), gameplayVideos: [clip("VAG2azvU0lc", "Pizza IQ gameplay")] },
    links: [
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.mindyourlogic.unbox.pizza.brain.teaser.logic.puzzle&hl=en_IN" },
      { label: "App Store", href: "https://apps.apple.com/us/app/pizza-iq-brain-games/id1660575117" },
    ], sourceSections: ["PBt3M8LcVVwcmzQM"],
  },
  {
    slug: "wobble-bomber", title: "Wobble Bomber", category: "Original Concepts",
    status: "Original design concept", role: "Game & Level Design Documentation",
    summary: "A personal 5v5 ragdoll-physics elimination concept. Teams position themselves before seven bombs spawn, then acquire, throw and avoid bombs while using knockback, stealth and teleporters.",
    contributions: ["Authored game-design and level-design documents for the concept.", "Defined the bomb, health, knockback, stealth and arena systems.", "Documented a symmetrical arena and its player routes."],
    coreMechanics: [
      { title: "Five-second fuse", description: "Picking up a bomb starts a five-second fuse. Throw it before it self-detonates." },
      { title: "Flail, stealth & teleporters", description: "Push enemies into blasts, hide in green bushes and use paired teleporters to flank." },
      { title: "Dynamic arena pressure", description: "Bomb frequency changes with player count. A shrinking Poison Cloud forces final combat." },
      { title: "Elimination rounds", description: "Manage a three-hit health system across five rounds." },
    ],
    designProcess: ["Define the acquire → prime → throw → push/flail → survive loop in the GDD.", "Document barriers, stealth areas, spawn locations and teleporter routes in the LDD.", "Use the arena diagram and gameplay-flow diagram to explain the proposed design."],
    challenge: "Balance tactical team play with unpredictable ragdoll movement and increasing arena pressure.",
    playerExperience: "Coordinated chaos: competitive elimination with slapstick movement, sudden ambushes and risky bomb throws.",
    media: { ...emptyMedia, designDiagrams: [image("wobble-bomber-document-1.png", "Wobble Bomber arena map extracted from the existing GDD", 665, 646), image("wobble-bomber-document-2.png", "Wobble Bomber gameplay flow extracted from the existing GDD", 1260, 685)] },
    links: [
      { label: "Game design document", href: "https://docs.google.com/document/d/18b6GLLlcJfKBhtljKRkm-l9eGvs9jmvvp1byGZw2zyc/edit?usp=sharing" },
      { label: "Level design document", href: "https://docs.google.com/document/d/1Kuct91PB13DVtfMnNlYT3wPE550TKDFG8sTuviBwUxc/edit?usp=sharing" },
      { label: "Download GDD (.docx)", href: "/documents/wobble-bomber-game-design.docx" },
      { label: "Download LDD (.docx)", href: "/documents/wobble-bomber-level-design.docx" },
    ], sourceSections: ["PBQNk17QqPy6g8CN"],
  },
  {
    slug: "dreamlink", title: "DreamLink: The Fractured Timeline", category: "Original Concepts",
    status: "Original design concept", role: "Game & Narrative Design Documentation",
    summary: "A two-player cooperative puzzle concept in which players inhabit one fractured consciousness: one in logical Reality and the other in rule-bending Dream. Communication and coordinated actions connect their worlds as they try to merge a broken timeline.",
    contributions: ["Developed the concept and game-design document.", "Documented cross-realm cooperation and narrative progression.", "Outlined levels including The Awakening, The Mark of Echoes and The Cart Ride in the existing GDD."],
    coreMechanics: [
      { title: "Inter-dimensional synchronization", description: "An action in one world affects the other: a Reality switch can create a bridge in Dream." },
      { title: "Shared information & timing", description: "Players communicate observations and coordinate actions to solve puzzles." },
      { title: "Narrative discovery", description: "Merging the timeline reveals the failed temporal experiment behind the split consciousness." },
    ],
    designProcess: ["Introduce simultaneous switches and shared door feedback in The Awakening.", "Give one player movable blocks and the other the target arrangement in The Mark of Echoes.", "Extend coordinated input to track switching, jumping and ducking in The Cart Ride."],
    playerExperience: "Cooperation through communication, shared discoveries and the gradual reconstruction of a fractured identity.",
    media: { ...emptyMedia },
    links: [
      { label: "Game design document", href: "https://docs.google.com/document/d/1Rq5JieXbq9ktkofQcw-qDMG0HO2AKVlGPZ-GtF3ivaw/edit?usp=sharing" },
      { label: "Download GDD (.docx)", href: "/documents/dreamlink-game-design.docx" },
    ], sourceSections: ["PBYdmQwgYKXJ3CHC"],
  },
];
