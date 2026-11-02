interface SkillPresentation {
  emphasis?: "display" | "large";
  description: string;
}

// Presentation only: PROFILE.skillCategories remains the authoritative skill list.
// Descriptions explain disciplines, without asserting achievements or proficiency.
export const SKILL_PRESENTATION: Record<string, SkillPresentation> = {
  "Game Design": {
    emphasis: "large",
    description: "Connecting rules, goals and feedback into a coherent experience that gives players meaningful choices.",
  },
  "Gameplay Design": {
    description: "Shaping the actions, interactions and feedback that make moment-to-moment play engaging and understandable.",
  },
  "Level Design": {
    emphasis: "display",
    description: "Structuring challenges, environments and progression to guide how players learn and interact.",
  },
  "Systems Design": {
    emphasis: "large",
    description: "Defining how mechanics, rules and resources work together to support a consistent gameplay experience.",
  },
  "Puzzle Design": {
    emphasis: "large",
    description: "Creating problems that invite observation, experimentation and the satisfaction of discovering a solution.",
  },
  "Quest Design": {
    description: "Organizing objectives and rewards into purposeful sequences that give players direction and motivation.",
  },
  "Event Design": {
    description: "Shaping focused gameplay activities around clear goals, pacing and rewards.",
  },
  "Player Motivation": {
    emphasis: "large",
    description: "Understanding what encourages players to explore, overcome challenges and keep working toward their goals.",
  },
  "Game Economy": {
    description: "Balancing resources, costs and rewards so player decisions and progression remain meaningful.",
  },
  "Difficulty Balancing": {
    emphasis: "large",
    description: "Tuning challenge to the player’s developing understanding, with room to learn, practice and master new ideas.",
  },
  "Feature Design": {
    description: "Turning a gameplay idea into clear rules, interactions and requirements that fit the wider game.",
  },
  "Mechanic Design": {
    emphasis: "large",
    description: "Defining the rules and interactions behind what players can do, and how those actions create interesting choices.",
  },
  "Progression Design": {
    emphasis: "display",
    description: "Sequencing mechanics, challenges and rewards so players build understanding and discover new possibilities over time.",
  },
  "LiveOps": {
    description: "Planning ongoing content and events that keep a live game’s experience varied and relevant.",
  },
  "Mission Design": {
    description: "Building clear objectives and connected challenges that give each play session a sense of purpose.",
  },
  "Player Retention": {
    description: "Considering how pacing, motivation and continued discovery support a player’s interest in returning.",
  },
  "Analytics": {
    emphasis: "large",
    description: "Interpreting gameplay data to understand player behavior and inform design decisions.",
  },
  "Content Design": {
    description: "Developing and organizing playable content so individual challenges contribute to a coherent experience.",
  },
  "Rapid Prototyping": {
    emphasis: "large",
    description: "Making ideas playable early to explore mechanics, test assumptions and guide the next design iteration.",
  },
  "Unity": {
    description: "A game engine for building playable prototypes, implementing levels and exploring gameplay interactions.",
  },
};
