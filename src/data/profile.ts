export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  responsibilities: string[];
}

export interface Achievement {
  stat: string;
  label: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ToolItem {
  name: string;
  category: string;
  iconName: string;
}

export const PROFILE = {
  name: "Aashay Hedaoo",
  title: "Senior Level Designer & Mobile Game Designer",
  email: "aashayhedaoo96148@gmail.com",
  linkedin: "https://www.linkedin.com/in/aashay-hedaoo",
  headline: "I DESIGN WHAT PLAYERS FEEL.",
  subheadline:
    "Mobile Game Designer specializing in high-retention mechanics, progressive puzzle difficulty curves, and systemic player psychology across 1,500+ crafted levels and 10M+ player downloads.",
  about: {
    lead: "I don't just build worlds; I craft experiences that challenge, delight, and captivate players.",
    narrative: [
      "I am a highly effective Mobile Game Designer specializing in delivering high-retention content across diverse puzzle and logic mechanics. Over the past 4+ years, I have designed and implemented over 1,500 unique levels, focusing on meticulously crafted difficulty curves and mechanical depth that drive long-term player engagement.",
      "My expertise spans multiple genres, including physics-based bullet puzzles, creative construction challenges, logic puzzles, observation games, and detective mysteries. I have designed 400+ levels of progressive ricochet puzzles, 200+ creative drawing levels, and 300+ IQ-testing logic puzzles.",
      "My core value is the ability to generate high-quality, high-retention content that is finely tuned for player engagement and satisfaction without requiring heavy-handed hand-holding or verbose tutorials."
    ],
    passion: "I love reading psychology books to understand human decision-making, cognitive bias, and emotional feedback loops. My passion lies in crafting gameplay that seamlessly connects pure logic, emotional satisfaction, and player creativity.",
    interests: "I am deeply drawn to strategy-driven games that push players to rethink assumptions. I obsessively analyze game mechanics, drop-off curves, player telemetry, and spatial ergonomics in level architecture.",
    hobbies: "Outside the editor, I recharge through competitive outdoor sports, wilderness adventures, and long-distance motorcycling. Navigating unpredictable terrain directly inspires my dynamic spatial layouts and environmental obstacle pacing."
  },
  achievements: [
    {
      stat: "4+ Years",
      label: "Professional Game Design",
      description: "Delivering high-retention mobile experiences across top-charting titles."
    },
    {
      stat: "10M+",
      label: "Total Player Downloads",
      description: "Contributed to Krishna Stories, Detective IQ 1, Detective IQ 2, and Detective IQ 3."
    },
    {
      stat: "1,500+",
      label: "Levels Shipped",
      description: "400+ shooter levels, 190+ puzzle/draw levels, 100+ animated levels, and 100+ parking puzzles."
    },
    {
      stat: "0.5%",
      label: "Level 400 Retention",
      description: "Sustaining high mechanical engagement in Mr. Bullet through organic non-verbal teaching."
    },
    {
      stat: "20+",
      label: "Published Games",
      description: "Live commercial releases distributed globally across Google Play Store & Apple App Store."
    },
    {
      stat: "Data-Driven",
      label: "Telemetry & LiveOps",
      description: "Leveraging GameAnalytics telemetry cohorts to continuously balance friction vs reward."
    }
  ] as Achievement[],
  experiences: [
    {
      company: "Game Wise",
      role: "Senior Level Designer / Game Designer",
      period: "June 2026 – Present",
      location: "Jodhpur, Rajasthan",
      responsibilities: [
        "Leading end-to-end game design direction and mechanics creation for high-retention mobile titles.",
        "Architecting complete gameplay systems, reward loops, and progressive difficulty balancing.",
        "Directing level design workflows from rapid whitebox prototyping through global commercial release.",
        "Balancing progression economies and mission structures using quantitative analytics.",
        "Authoring comprehensive Game Design Documents (GDD) and Feature Technical Specifications."
      ]
    },
    {
      company: "MindYourLogic Studios",
      role: "Level Designer / Game Designer",
      period: "July 2022 – May 2026",
      location: "Nagpur, Maharashtra",
      responsibilities: [
        "Designed and implemented 1,000+ commercial puzzle levels across flagship detective and logic franchises.",
        "Engineered core gameplay loops, physics interactions, and non-verbal tutorial systems.",
        "Designed live events, retention hooks, and progression balancing across Google Play and App Store releases.",
        "Iterated rapidly on player telemetry using GameAnalytics to eliminate drop-off choke points.",
        "Collaborated closely with 2D animators, programmers, and sound designers to ensure tactile game feel."
      ]
    }
  ] as Experience[],
  skillCategories: [
    {
      title: "Core Design",
      skills: ["Game Design", "Gameplay Systems", "Level Architecture", "Puzzle Design", "Core Loop Modeling"]
    },
    {
      title: "Player Experience",
      skills: ["Difficulty Balancing", "Pacing & Flow", "Player Motivation", "Game Economy", "Event Design", "Quest Architecture"]
    },
    {
      title: "Specializations",
      skills: ["Physics-Based Mechanics", "Progression Modeling", "Non-Verbal Onboarding", "LiveOps Design", "Mission Structures"]
    },
    {
      title: "Technical & Analytics",
      skills: ["GameAnalytics Cohorts", "Player Retention Modeling", "Rapid Unity Prototyping", "GDD & LDD Authoring", "Balancing Spreadsheets"]
    }
  ] as SkillCategory[],
  tools: [
    { name: "Unity", category: "Engine & Prototyping", iconName: "Gamepad2" },
    { name: "GameAnalytics", category: "Telemetry & Cohorts", iconName: "BarChart3" },
    { name: "Photoshop", category: "2D Art & Level Mockups", iconName: "Palette" },
    { name: "Illustrator", category: "Vector & UI Asset Design", iconName: "Layers" },
    { name: "MS Excel", category: "Economy & Balancing Models", iconName: "Table" },
    { name: "Notion", category: "Game Design Documentation", iconName: "FileText" }
  ] as ToolItem[]
};

