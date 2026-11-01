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
    interests: "I am deeply drawn to strategy-driven games that push players to rethink assumptions. I enjoy analyzing game mechanics, player behavior and creative problem-solving.",
    hobbies: "I enjoy outdoor games, adventure and long bike rides. Exploring new places helps me recharge and find inspiration for level layouts and challenges."
  },
  achievements: [
    {
      stat: "4+ Years",
      label: "Professional Game Design",
      description: "Delivering game design across mobile platforms."
    },
    {
      stat: "10M+",
      label: "Total Player Downloads",
      description: "Contributed to Krishna Stories, Detective IQ 1, Detective IQ 2, and Detective IQ 3."
    },
    {
      stat: "1,500+",
      label: "Levels Designed",
      description: "Including 400+ shooter levels, 190+ puzzle/draw levels, 100+ animated puzzle levels and 100+ parking levels."
    },
    {
      stat: "0.5%",
      label: "Level 400 Retention",
      description: "Reported user retention at Mr. Bullet level 400 in the original portfolio."
    },
    {
      stat: "20+",
      label: "Published Games",
      description: "Games available on Google Play Store and Apple App Store."
    },
    {
      stat: "Data-Driven",
      label: "Gameplay & Retention",
      description: "Used GameAnalytics to improve gameplay and retention."
    }
  ] as Achievement[],
  experiences: [
    {
      company: "Game Wise",
      role: "Senior Level Designer / Game Designer",
      period: "June 2026 – Present",
      location: "Jodhpur, Rajasthan",
      responsibilities: [
        "Leading game design direction and creating new mechanics.",
        "Designing complete gameplay systems and balancing difficulty.",
        "Designing levels from concept to release and rapidly prototyping ideas.",
        "Progression balancing, mission design and data-driven improvements using analytics.",
        "Writing feature documentation."
      ]
    },
    {
      company: "MindYourLogic Studios",
      role: "Level Designer / Game Designer",
      period: "July 2022 – May 2026",
      location: "Nagpur, Maharashtra",
      responsibilities: [
        "Designed levels from concept to release across puzzle and logic games.",
        "Designed complete gameplay systems and new game mechanics.",
        "Worked on mission design, event design, difficulty and progression balancing.",
        "Used analytics for data-driven gameplay improvements and retention.",
        "Created feature documentation and rapid prototypes."
      ]
    }
  ] as Experience[],
  skillCategories: [
    {
      title: "Core Design",
      skills: ["Game Design", "Gameplay Design", "Level Design", "Systems Design", "Puzzle Design"]
    },
    {
      title: "Player Experience",
      skills: ["Quest Design", "Event Design", "Player Motivation", "Game Economy", "Difficulty Balancing"]
    },
    {
      title: "Specializations",
      skills: ["Feature Design", "Mechanic Design", "Progression Design", "LiveOps", "Mission Design"]
    },
    {
      title: "Technical & Analytics",
      skills: ["Player Retention", "Analytics", "Content Design", "Rapid Prototyping", "Unity"]
    }
  ] as SkillCategory[],
  tools: [
    { name: "Unity", category: "Engine & Prototyping", iconName: "Gamepad2" },
    { name: "GameAnalytics", category: "Gameplay Analytics", iconName: "BarChart3" },
    { name: "Photoshop", category: "2D Art & Level Mockups", iconName: "Palette" },
    { name: "Illustrator", category: "Vector & UI Asset Design", iconName: "Layers" },
    { name: "MS Excel", category: "Spreadsheets", iconName: "Table" },
    { name: "Notion", category: "Game Design Documentation", iconName: "FileText" }
  ] as ToolItem[]
};

