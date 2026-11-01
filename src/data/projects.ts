export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: "LiveOps & Systems" | "Physics & Logic" | "Original Concepts";
  role: string;
  studio: string;
  timeline: string;
  platforms: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  heroVideo?: string;
  heroPoster?: string;
  heroImage?: string;
  galleryImages: string[];
  sketches?: string[];
  summary: string;
  challenge: string;
  playerExperience: string;
  coreMechanics: {
    title: string;
    description: string;
  }[];
  designProcess: string[];
  telemetryAndBalancing: string;
  keyLearnings: string[];
  links: {
    playStore?: string;
    appStore?: string;
    gddDocument?: string;
    lddDocument?: string;
  };
  lensBreakdown: {
    playerExperience: string;
    gameSystems: string;
    designIteration: string;
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "detective-iq-3",
    title: "Detective IQ 3",
    tagline: "End-to-End Mechanics & Puzzle-Driven Mini-Game Architecture",
    category: "LiveOps & Systems",
    role: "Senior Game & Level Designer",
    studio: "MindYourLogic Studios",
    timeline: "2024 – 2026",
    platforms: ["Google Play Store", "Apple App Store"],
    metrics: [
      { label: "Franchise Downloads", value: "10M+" },
      { label: "New Mini-Games", value: "Multiple End-to-End" },
      { label: "Animation & UI Assets", value: "Complete 2D Suite" }
    ],
    heroVideo: "/videos/VAG2aDeQqm4.mp4",
    heroPoster: "/images/MAHRC1dK9uE.png",
    heroImage: "/images/MAHRC1dK9uE.png",
    galleryImages: ["/images/MAHRC1dK9uE.png"],
    summary:
      "Designed and executed multiple new flagship mini-games for Detective IQ 3, owning the full pipeline from whitebox mechanics and puzzle-driven level design to 2D animation integration and UI asset creation. The project prioritized tactile feedback loops and continuous progression balancing.",
    challenge:
      "Balancing the cognitive load for diverse casual player cohorts while introducing increasingly intricate detective logic puzzles. Players needed to feel clever without becoming frustrated by obscure lateral-thinking leaps.",
    playerExperience:
      "Every case was designed as a miniature emotional narrative arc: initial curiosity, observation of deceptive visual clues, a sudden 'aha!' realization, and immediate gratifying payoff.",
    coreMechanics: [
      {
        title: "Forensic Evidence Deduction",
        description:
          "Multi-stage interaction loops requiring players to synthesize circumstantial visual details, witness contradictions, and hidden objects."
      },
      {
        title: "Micro-Puzzle Interleaving",
        description:
          "Alternating between fast visual puzzles and deeper spatial reasoning stages to prevent mental fatigue across 30+ minute play sessions."
      },
      {
        title: "Dynamic Hint Escalation",
        description:
          "Tiered hint system providing contextual nudges without spoiling the core deduction, keeping player pride intact."
      }
    ],
    designProcess: [
      "Deconstructed player drop-off telemetry from Detective IQ 1 & 2 to isolate high-friction clue formats.",
      "Rapidly prototyped 30+ candidate mechanics on paper before selecting the top 8 highest-delight puzzle loops.",
      "Created complete 2D character poses and clue visual assets to ensure visual clarity was mechanically unambiguous.",
      "Iterated through 5 rounds of closed cohort playtesting, tuning clue discovery thresholds and confirmation animations."
    ],
    telemetryAndBalancing:
      "Integrated GameAnalytics event funnels on each clue click. Levels with more than 3 invalid tap attempts before first clue discovery were redesigned to offer clearer affordance cues, improving day-7 franchise retention by 14%.",
    keyLearnings: [
      "Visual hierarchy is gameplay: if a clue blends into background decorative noise, players perceive it as unfair rather than challenging.",
      "Reward cadence must match cognitive investment: difficult deductions demand longer celebratory micro-animations."
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.mindyourlogic.brain.test.logic.puzzle.detective.iq3&hl=en",
      appStore: "https://apps.apple.com/in/app/detective-iq3/id6754641677"
    },
    lensBreakdown: {
      playerExperience:
        "The cognitive loop is tuned for the 'detective triumph' emotion—giving players subtle visual breadcrumbs that make deductions feel earned rather than spoon-fed.",
      gameSystems:
        "Modular puzzle state machine where clue interactions trigger multi-variable logic checks, linking dialogue states, asset states, and progression gates.",
      designIteration:
        "Heatmap telemetry showed players tapping randomly when stuck; we introduced micro-reaction animations to incorrect taps to gently steer focus back to clues."
    }
  },
  {
    slug: "krishna-stories",
    title: "Krishna Stories Game",
    tagline: "Multi-Map Systems, Narrative Integration & High-Retention Mini-Games",
    category: "LiveOps & Systems",
    role: "Lead Gameplay & Level Designer",
    studio: "MindYourLogic Studios",
    timeline: "2023 – 2025",
    platforms: ["Google Play Store", "Apple App Store"],
    metrics: [
      { label: "Total Downloads", value: "1M+" },
      { label: "Core Mini-Games", value: "Shoot, Cut & Save, Draw" },
      { label: "Integrated Maps", value: "Multi-Hub World" }
    ],
    heroVideo: "/videos/VAHRCS4mmpM.mp4",
    heroPoster: "/images/MAHRCRhwd4Q.png",
    heroImage: "/images/MAHRCRhwd4Q.png",
    galleryImages: ["/images/MAHRCRhwd4Q.png"],
    summary:
      "Designed and structured the core gameplay loop for Krishna Stories, integrating three distinct mini-game modes (Shoot, Cut & Save, and Draw) into an expansive multi-map narrative universe. Owned mechanics, pacing, difficulty curves, and reward economies.",
    challenge:
      "Seamlessly intertwining traditional cultural storytelling with varied mechanical puzzle loops (physics ricochet, rope tension cutting, and freeform line drawing) without breaking narrative immersion.",
    playerExperience:
      "Players traverse vibrant mythological landscapes, alternating between lighthearted narrative vignettes and skill-testing mini-games that embody Krishna's legendary wit, heroism, and playful trickster persona.",
    coreMechanics: [
      {
        title: "Shoot & Ricochet Archery",
        description:
          "Physics-based projectile targeting utilizing reflective surfaces, breakable earthen pots, and environmental triggers to overcome demon obstacles."
      },
      {
        title: "Cut & Save Physics",
        description:
          "Multi-rope tension manipulation where cutting sequence dictates gravity, momentum, and civilian rescue pathing."
      },
      {
        title: "Protective Draw Barrier",
        description:
          "Freeform touch vector rendering that simulates structural mass to shield characters from falling stones and enemy projectiles."
      }
    ],
    designProcess: [
      "Mapped the overarching multi-map campaign progression, balancing difficulty spikes across alternating mini-game genres.",
      "Built parametric physics sandboxes in Unity to calibrate rope elasticity, arrow bounce velocity, and ink stroke consumption.",
      "Designed contextual reward loops (temple restorations, sacred feathers) that tie directly into player retention metrics.",
      "Polished camera framing and dynamic zoom cues to celebrate spectacular physics chain reactions."
    ],
    telemetryAndBalancing:
      "Paced mini-game rotation so high-precision shooting puzzles were consistently followed by creative, low-stress drawing challenges. This rhythm smoothed player burnout and achieved over 1M+ downloads with industry-leading session lengths.",
    keyLearnings: [
      "Genre-switching refreshes dopamine: players who hit a wall in precision aiming recover focus when switching to creative drawing.",
      "Cultural reverence enhances player attachment: authentic thematic assets elevated casual puzzle mechanics into memorable narrative beats."
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.mindyourlogic.krishnastories&hl=en",
      appStore: "https://apps.apple.com/us/app/krishna-stories-game/id6779624620"
    },
    lensBreakdown: {
      playerExperience:
        "The rhythm oscillates between heroic action (archery precision) and compassionate protection (shield drawing), creating a rich emotional spectrum.",
      gameSystems:
        "Inter-connected economy connecting currency earned across 3 mini-games into a persistent map unlocking system with escalating chapter requirements.",
      designIteration:
        "Early rope physics caused civilian ragdolls to snag unpredictably; adjusted bounding box dampening and added guide arcs to ensure fair fail-states."
    }
  },
  {
    slug: "detective-iq-2",
    title: "Detective IQ 2: The Eraser's Pursuit",
    tagline: "500-Level Progressive Difficulty Architecture & Non-Verbal Mastery",
    category: "Physics & Logic",
    role: "Senior Level & Systems Designer",
    studio: "MindYourLogic Studios",
    timeline: "2023 – 2024",
    platforms: ["Google Play Store", "Apple App Store"],
    metrics: [
      { label: "Levels Designed", value: "500 Unique Stages" },
      { label: "Level 500 Retention", value: "0.2% Sustained" },
      { label: "Boss Level Cadence", value: "Every 5 Stages" }
    ],
    heroVideo: "/videos/VAG2ad23V64.mp4",
    heroPoster: "/images/VAG2ad23V64-poster.jpg",
    heroImage: "/images/VAG2ad23V64-poster.jpg",
    galleryImages: ["/images/VAG2ad23V64-poster.jpg", "/images/VAG2aKsJHMk-poster.jpg", "/images/VAG2aX3RkiM-poster.jpg"],
    summary:
      "Crafted an expansive 500-level suite for Detective IQ 2 centered around the Eraser mechanic and Cut Rope physics. Meticulously designed the non-verbal learning curve to teach advanced cognitive strategies purely through puzzle topology, achieving 0.2% retention at Level 500.",
    challenge:
      "Keeping players engaged through 500 consecutive levels without repetitive monotony, while teaching increasingly abstract eraser logic without a single tutorial dialogue box.",
    playerExperience:
      "Pure discovery. Players test hypotheses with their fingertip, watching layers of reality peel away to reveal subversive truths. Every fifth level introduces a high-stakes boss challenge that tests mastery under elevated cognitive pressure.",
    coreMechanics: [
      {
        title: "Subtractive Eraser Layering",
        description:
          "Targeted touch erasure that strips disguise layers, uncovers hidden culprits, and disrupts structural supports in physics puzzles."
      },
      {
        title: "Organic Non-Verbal Onboarding",
        description:
          "Puzzle layouts that visually constrain invalid options in early stages, naturally channeling player intuition toward breakthrough mechanics."
      },
      {
        title: "5-Stage Boss Cadence",
        description:
          "A structured pacing rhythm: 4 developmental puzzle variations culminating in a complex composite boss stage rewarding strategic synthesis."
      }
    ],
    designProcess: [
      "Structured a comprehensive 500-level roadmap dividing mechanics into 10 thematic worlds of 50 levels each.",
      "Built spreadsheet difficulty curves factoring clue count, false affordances, and cognitive distraction elements.",
      "Authored the complete Cut Rope Game Design Document (GDD) detailing rope tension, blade interactions, and momentum transfer.",
      "Iterated through 200+ playtester recording sessions to track first-tap heatmaps and eradicate deceptive ambiguity."
    ],
    telemetryAndBalancing:
      "Maintained a strictly controlled fail-rate window of 18–25% on standard levels and 35–45% on boss stages. This preserved the elusive 'flow zone', sustaining an unprecedented 0.2% retention rate all the way to level 500.",
    keyLearnings: [
      "Players love feeling smart through subtraction: removing elements to solve a problem triggers deeper cognitive satisfaction than adding elements.",
      "A predictable boss cadence creates powerful micro-goals, pulling players through 'just one more level' sessions."
    ],
    links: {
      playStore: "https://play.google.com/store/search?q=detective%20iq%202&c=apps&hl=en_IN",
      appStore: "https://apps.apple.com/om/app/detective-iq-2-catch-thieves/id6736873794",
      gddDocument: "https://1drv.ms/w/c/ae1b7f9ffb0852ff/EVQyeK8HqdFEhia_YfZL4jwBtkWphVpklK_j6ljDa82PRQ?e=BbdKw1"
    },
    lensBreakdown: {
      playerExperience:
        "The feeling of outsmarting the level creator: uncovering an unexpected layer behind the villain's façade delivers instant emotional delight.",
      gameSystems:
        "Dual-canvas rendering where the erase mask texture coordinates compute overlap ratios against target collision zones in real time.",
      designIteration:
        "Monitored level 120-150 telemetry drops; split complex multi-eraser puzzles into sequential single-stroke puzzles to restore confidence before introducing combined mechanics."
    }
  },
  {
    slug: "detective-iq-1",
    title: "Detective IQ 1: Ricochet Shooter & Draw to Save",
    tagline: "400+ Shooter Levels, 0.5% Level-400 Retention & 20 Distinct Mini-Games",
    category: "Physics & Logic",
    role: "Core Content & Systems Designer",
    studio: "MindYourLogic Studios",
    timeline: "2022 – 2023",
    platforms: ["Google Play Store", "Apple App Store"],
    metrics: [
      { label: "Shooter Levels", value: "400+ Levels" },
      { label: "Level 400 Retention", value: "0.5% Verified" },
      { label: "Draw to Save Levels", value: "200+ Levels" },
      { label: "Mini-Games Designed", value: "20 Unique Modes" }
    ],
    heroVideo: "/videos/VAG3e9kp7K0.mp4",
    heroPoster: "/images/VAG3e04kpq4-poster.jpg",
    heroImage: "/images/VAG3e04kpq4-poster.jpg",
    galleryImages: ["/images/VAG3e04kpq4-poster.jpg", "/images/VAG3e4kIUBU-poster.jpg", "/images/VAG3e_Kg1SI-poster.jpg"],
    summary:
      "As core content designer, created and balanced high-volume content across 20 distinct mini-games. Spearheaded the 400-level physics ricochet shooter (Mr. Bullet loop) achieving an exceptional 0.5% retention at level 400, alongside 200+ Draw to Save creative physics puzzles and 50+ Detective Cases.",
    challenge:
      "Creating 400 distinct single-bullet trajectory puzzles that constantly introduce fresh spatial interactions (explosive barrels, rotating mirrors, movable counterweights) without feeling repetitive.",
    playerExperience:
      "Tactile, mechanical satisfaction. Players calculate bank shots like billiards masters, releasing the bullet to watch a glorious domino effect of physics destruction unfold across the level.",
    coreMechanics: [
      {
        title: "Calculated Ricochet Vectoring",
        description:
          "Specular bullet reflections off steel surfaces, testing player angle calculation and anticipation of bouncing trajectories."
      },
      {
        title: "Environmental Kinetic Triggers",
        description:
          "Physics props: swinging chandeliers, TNT barrels, rolling boulders, and counter-weighted elevators activated by bullet impact."
      },
      {
        title: "Draw to Save Structural Inking",
        description:
          "Rigid body generation from player finger gestures, testing center-of-mass balance against relentless bee swarms and falling spikes."
      },
      {
        title: "Time-Rewind Flashback Cases",
        description:
          "Observation puzzles with scrubbing timeline controls to catch fleeting micro-details obscured during real-time movement."
      }
    ],
    designProcess: [
      "Formulated a rigorous mathematical grid for bullet ricochet angles to guarantee single-solution deterministic consistency.",
      "Authored the complete Bullet Shooter Game Design Document (GDD) specifying kinetic energy, surface friction, and ricochet dissipation.",
      "Developed 200+ Draw to Save stages, testing structural integrity under diverse physics loads and simulated player drawing styles.",
      "Conducted weekly cohort data reviews in GameAnalytics to trim outlier stages with abnormal retry spikes."
    ],
    telemetryAndBalancing:
      "Achieved a verified 0.5% retention at level 400 through razor-sharp difficulty pacing. Every 25 levels introduced a new interactive prop type, resetting player curiosity before increasing geometric complexity.",
    keyLearnings: [
      "Physics is the ultimate content multiplier: when level elements follow consistent physical laws, player failure is accepted as fair experimentation.",
      "Ink economy in drawing puzzles forces player elegance: limiting draw length turns simple obstacle blocking into an engineering art form."
    ],
    links: {
      playStore: "https://play.google.com/store/search?q=detective+iq&c=apps&hl=en_IN",
      appStore: "https://apps.apple.com/in/app/detective-iq-brain-games/id6443900014",
      gddDocument: "https://1drv.ms/w/c/ae1b7f9ffb0852ff/ERtf2dikh7ZCjoDQ3t9AqyoBw3X_LWHARejmmklvHqm5mQ?e=ksyQL0"
    },
    lensBreakdown: {
      playerExperience:
        "The suspense between releasing the bullet and observing its final bounce creates an irresistible dopamine loop of anticipation and relief.",
      gameSystems:
        "Deterministic 2D Raycast and RigidBody2D simulation tuned with custom angular thresholds to prevent chaotic infinite bounces.",
      designIteration:
        "Analyzed level 180 drop-off where TNT barrels were triggered too easily; increased barrel activation velocity threshold to mandate intentional bank shots."
    }
  },
  {
    slug: "pizza-iq",
    title: "Pizza IQ: Brain Game",
    tagline: "180+ High-Retention Thematic Logic Puzzles & Spatial Constraints",
    category: "Physics & Logic",
    role: "Lead Puzzle & Level Designer",
    studio: "MindYourLogic Studios",
    timeline: "2023",
    platforms: ["Google Play Store", "Apple App Store"],
    metrics: [
      { label: "Thematic Levels", value: "180+ Unique Puzzles" },
      { label: "Theme Constraint", value: "100% Pizza Themed" },
      { label: "Cognitive Mechanics", value: "Spatial & Deduction" }
    ],
    heroVideo: "/videos/VAG2azvU0lc.mp4",
    heroPoster: "/images/VAG2azvU0lc-poster.jpg",
    heroImage: "/images/VAG2azvU0lc-poster.jpg",
    galleryImages: [
      "/images/MAG3i0nkRIg.jpg",
      "/images/MAG3i26IaKU.jpg",
      "/images/MAG3i3CIHoo.jpg",
      "/images/MAG3i3LAI1I.jpg"
    ],
    sketches: [
      "/images/MAG3ixvN7LA.png",
      "/images/MAG3i4rsDnI.png",
      "/images/MAG3i2rJoXM.png",
      "/images/MAG3iwVOsag.png"
    ],
    summary:
      "Solely responsible for designing and implementing 180+ unique puzzle levels for Pizza IQ: Brain Game. The core creative challenge was strictly adhering to a culinary pizza theme while continuously requiring fresh logical deduction, spatial reasoning, and out-of-the-box thinking.",
    challenge:
      "Creating nearly two hundred diverse logic puzzles using limited, thematically constrained culinary assets (dough, toppings, pizza cutters, ovens, delivery boxes) without repeating mechanics.",
    playerExperience:
      "Humorous, brain-bending culinary whimsy. Players encounter bizarre logic dilemmas—cutting pizza into impossible fractions, baiting mischievous pizza thieves, and balancing toppings under wacky physical constraints.",
    coreMechanics: [
      {
        title: "Topological Pizza Slicing",
        description:
          "Geometric puzzle mechanics requiring players to bisect complex topping distributions with a limited number of straight cuts."
      },
      {
        title: "Culinary Lateral Thinking",
        description:
          "Subverting expectations where standard physics rules are playfully overturned by contextual cooking interactions."
      },
      {
        title: "Spatial Delivery Packing",
        description:
          "Constrained grid fitting requiring players to pack irregular pizza slices into geometric delivery boxes under strict spatial rules."
      }
    ],
    designProcess: [
      "Began every level as an authentic hand-drawn rough level design sketch to establish spatial layout and focal points.",
      "Categorized puzzles into 5 cognitive pillars: Spatial Reasoning, Sequencing, Visual Misdirection, Physics, and Logic.",
      "Tuned the progressive difficulty curve so casual foodies and hardcore puzzle solvers found continuous satisfaction.",
      "Engineered bespoke level fail states that featured witty culinary animations to make losing enjoyable."
    ],
    telemetryAndBalancing:
      "Grouped 180 levels into 12 themed 'menus'. Players who completed Menu 3 showed a 78% completion rate through the rest of the game, proving that the early onboarding established high brand affinity.",
    keyLearnings: [
      "Thematic constraints breed creative mechanical variety: confining the universe to pizza forced deep exploration of cutting, heating, stacking, and delivery tropes.",
      "Whimsical fail-states reduce rage-quits: when failure results in a funny animation, retries become part of the entertainment."
    ],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.mindyourlogic.unbox.pizza.brain.teaser.logic.puzzle&hl=en_IN",
      appStore: "https://apps.apple.com/us/app/pizza-iq-brain-games/id1660575117"
    },
    lensBreakdown: {
      playerExperience:
        "A constant mix of appetizing culinary art and intellectual surprise that keeps players smiling even when stumped.",
      gameSystems:
        "Bespoke slice intersection algorithms and topping coordinate matrices calculating validity upon stroke completion.",
      designIteration:
        "Paper sketches directly identified over-cluttered levels; simplified background toppings by 40% to keep puzzle goals crisp."
    }
  },
  {
    slug: "wobble-bomber",
    title: "Wobble Bomber",
    tagline: "5v5 Ragdoll Physics Elimination Game — Tactical Spatial Design & GDD",
    category: "Original Concepts",
    role: "Sole Game & Level Designer",
    studio: "Personal Original IP",
    timeline: "2024",
    platforms: ["PC / Console Concept"],
    metrics: [
      { label: "Team Format", value: "5v5 Multiplayer" },
      { label: "Match Structure", value: "Best of 5 Rounds" },
      { label: "Core Spawns", value: "7 Dynamic Bombs" },
      { label: "Health System", value: "3-Hit Elimination" }
    ],
    galleryImages: [
      "/images/MAG3jBbZmJY.jpg",
      "/images/MAG3jDQYblU.jpg",
      "/images/MAG3jETFoh0.jpg",
      "/images/MAG3jGirsP0.jpg"
    ],
    sketches: [
      "/images/MAG3jIw_yWA.jpg",
      "/images/MAG3jLBNgYw.jpg",
      "/images/MAG3jM5rt-c.jpg",
      "/images/MAG3jMkrn_8.jpg",
      "/images/MAG3jO2qfBw.jpg",
      "/images/MAG6MevHi5U.jpg"
    ],
    summary:
      "Complete original IP featuring a 5v5 ragdoll physics elimination arena. Authored comprehensive Game Design Documents (GDD) and Level Design Documents (LDD). Players position covertly before seven bombs spawn, utilizing 5-second detonation fuses, 'Flail' knockbacks, and stealth bushes in a shrinking Poison Cloud arena.",
    challenge:
      "Balancing the chaotic hilarity of unpredictable ragdoll physics with the competitive depth and tactical flanking required for high-stakes 5v5 team play.",
    playerExperience:
      "Heart-pounding comedic tension. Grabbing a ticking bomb ignites a frantic 5-second scramble to hurl it at an enemy or perform a sacrifice play, all while managing ragdoll clumsiness and creeping poison gas.",
    coreMechanics: [
      {
        title: "5-Second Detonation Hot Potato",
        description:
          "Once grabbed, a bomb triggers a relentless 5-second audio-visual fuse. The carrier must throw it, pass it, or self-detonate amidst enemy clusters."
      },
      {
        title: "Flail Knockback & Environmental Hazards",
        description:
          "Ragdoll melee shove mechanic that sends opponents stumbling into blast radiuses, lethal pits, or advancing gas clouds."
      },
      {
        title: "Stealth Bushes & Symmetrical Tactical Flanking",
        description:
          "Line-of-sight concealment bushes paired with symmetrical teleporters and blast-resistant walls for coordinated team ambushes."
      },
      {
        title: "Dynamic Poison Cloud Ring",
        description:
          "Gradually constricts the combat zone toward a central climax point, preventing stalling and forcing final chaotic showdowns."
      }
    ],
    designProcess: [
      "Engineered the complete Game Design Document outlining round economy, 3-hit health rules, and player spawn algorithms.",
      "Drafted comprehensive Level Design Documents featuring architectural cross-sections, cover density, and sightline cones.",
      "Hand-sketched detailed topological arena maps with teleporter nodes and poison ring timelines.",
      "Simulated player movement speeds vs bomb fuse durations to calibrate throw trajectory arcs and evade timings."
    ],
    telemetryAndBalancing:
      "Tuned bomb spawn frequency parametrically based on surviving player counts (7 bombs for 10 players down to 2 bombs in 1v1 overtime). This prevents early round stalemates while maintaining climax intensity.",
    keyLearnings: [
      "Ragdoll unpredictability requires symmetrical map predictability: competitive players accept physics chaos when the arena layout is undeniably fair.",
      "Time pressure creates comedy: a ticking 5-second countdown turns even simple button presses into uproarious panic."
    ],
    links: {
      gddDocument: "https://docs.google.com/document/d/18b6GLLlcJfKBhtljKRkm-l9eGvs9jmvvp1byGZw2zyc/edit?usp=sharing",
      lddDocument: "https://docs.google.com/document/d/1Kuct91PB13DVtfMnNlYT3wPE550TKDFG8sTuviBwUxc/edit?usp=sharing"
    },
    lensBreakdown: {
      playerExperience:
        "The adrenaline rush of running with live explosives, punctuated by hysterical ragdoll physics knockdowns when plans go catastrophically wrong.",
      gameSystems:
        "State synchronization balancing physics tick-rates with server latency, ensuring explosion knockback impulses register identically across all clients.",
      designIteration:
        "Playtest sketches revealed players camping behind gray walls; introduced the shrinking Poison Cloud ring to relentlessly flush campers out."
    }
  },
  {
    slug: "dreamlink",
    title: "DreamLink: The Fractured Timeline",
    tagline: "Two-Player Co-operative Asymmetric Reality Synchronization",
    category: "Original Concepts",
    role: "Game & Narrative Systems Designer",
    studio: "Personal Original IP",
    timeline: "2024",
    platforms: ["Co-op PC / Console"],
    metrics: [
      { label: "Player Count", value: "2 Players Co-op" },
      { label: "Dual Dimensions", value: "Reality (R) & Dream (D)" },
      { label: "Core System", value: "Inter-Dimensional Sync" }
    ],
    galleryImages: [
      "/images/MAG3jDQYblU.jpg",
      "/images/MAG3jGirsP0.jpg"
    ],
    sketches: [
      "/images/MAG3jLBNgYw.jpg",
      "/images/MAG3jIw_yWA.jpg"
    ],
    summary:
      "Authored the complete Game Design Document for DreamLink, a two-player co-op puzzle experience where players inhabit the fractured consciousness of one mind divided between logical Reality (R) and surreal Dream (D) realms. Puzzles require real-time inter-dimensional synchronization.",
    challenge:
      "Designing asymmetric puzzle mechanics where neither player feels like a passive assistant, ensuring both players possess equal agency and indispensable roles in every stage.",
    playerExperience:
      "Deep symbiotic communication. Players cannot see each other's realms directly; they must describe what they observe, verbalizing surreal anomalies and mechanical levers to reconstruct timeline fragments together.",
    coreMechanics: [
      {
        title: "Inter-Dimensional Synchronization",
        description:
          "Actions in Reality (R) trigger surreal counterpart manifestations in Dream (D): pulling a standard breaker in R manifests a floating crystalline bridge in D."
      },
      {
        title: "Temporal Echoes & State Transfer",
        description:
          "Physical objects passed through rift nodes transform between practical mechanical tools and metaphysical dream artifacts."
      },
      {
        title: "Asymmetric Information Puzzles",
        description:
          "Neither screen shows the whole picture; players must verbally communicate environmental clues to solve dual-key locks and spatial barriers."
      }
    ],
    designProcess: [
      "Wrote the complete 30-page Game Design Document detailing timeline lore, psychic fracture mechanics, and level progression.",
      "Designed twin-grid spatial puzzles ensuring every interaction required balanced participation from both players.",
      "Mapped emotional narrative milestones that unlock as players successfully harmonize fragmented memories.",
      "Developed communication protocols to guide player dialogue naturally without artificial prompt popups."
    ],
    telemetryAndBalancing:
      "Engineered puzzle complexity around verbal communication time: stage difficulty scales not by execution reflex speed, but by the conceptual translation required to describe abstract dream symbols to the logical realm partner.",
    keyLearnings: [
      "Asymmetric co-op is built on trust and language: the most satisfying puzzles occur when one player describes a mystery and the other recognizes the solution in their world.",
      "Dual-reality mechanics require distinct visual grammar: Reality must feel grounded and tactile, while Dream must feel ethereal and fluid."
    ],
    links: {
      gddDocument: "https://docs.google.com/document/d/1Rq5JieXbq9ktkofQcw-qDMG0HO2AKVlGPZ-GtF3ivaw/edit?usp=sharing"
    },
    lensBreakdown: {
      playerExperience:
        "The intimate thrill of joint epiphany—when two players in completely different worlds communicate a solution that merges their realities.",
      gameSystems:
        "Event-broker architecture broadcasting cross-realm state mutations (R_Switch_01_Activated -> D_Bridge_01_Materialize) with deterministic state syncing.",
      designIteration:
        "Early drafts had the Reality player doing 70% of the mechanical actions; re-engineered Dream world physics to allow Dream manipulation to alter gravity in Reality."
    }
  }
];

