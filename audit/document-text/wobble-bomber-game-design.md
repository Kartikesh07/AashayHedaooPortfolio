# **Game Design Document:** 

# **Wobble Bomb**

## **A. Concept / Gameplay Story**

### **Theme-**A goofy physics laboratory where “Wobblers” — clumsy, floppy, ragdoll-like test subjects — are part of an experiment gone wrong. Everything inside the lab is unstable: the walls, the teleporters, and especially the bombs.

### **Narrative-**A containment failure has locked two rival teams of Wobblers in undefined area. Their only way out: **defeat the other test team using bombs.**Because every character moves like a drunk noodle, the drama of competitive elimination constantly clashes with slapstick humor — players slip, bounce, fall over walls, trip into teleporters, and accidentally blow themselves up.

### **Map Look & Feel**

* Bright, colorful, toy-like arena

* Soft primary colors (blue, orange, green, yellow)

* Rounded edges, simple low-poly shapes

* Clean floor tiles to emphasize movement

* Obstacles resemble wall, bushes, foam wedges

The world is intentionally silly and “over-safe,” making every mistake look funny.

#### **Environmental Style**

* Low-poly

* Highly physics-reactive

* Exaggerated ragdoll motion

* Teleporters resemble big, bouncy funnels that “splort” players out with a wobble

* Every collision looks like it came straight from a cartoon physics engine

## **B. Mode Objective & Core Systems**

### Mode Name**\-**Wobble Bomb

### **Core Gameplay Loop**Acquire → Prime → Throw → Push/Flail → Survive

![][image1]

Players rush toward bombs, panic as the fuse counts down, try to aim while wobbling, and use the Flail ability to shove enemies into danger zones or mess up their throws.

**Team Goal-**Eliminate all 5 enemies or survive longer than them within the 90-second round timer.

### **Win Condition**\-A round ends when: One team is fully eliminated

###


### **Respawn Rules-**No respawns during the round.Eliminated players become an adorable floppy ragdoll pile until the next round begins(can rome anywhere in ghost mode but can’t be seen by alive players) 

### **Key Gameplay Systems**

**Bomb Health System**

* Players have **3 total hit points**

* Standard bomb hit \= **1 damage**

* Charged bomb hit \= **2 damage**

 **Bomb Rules**

* Picking up any bomb starts a **5-second fuse**

* Player *must* throw it — holding too long \= self-detonation

* Bombs explode on impact with walls, floor, or players

* Small AoE radius allows multi-hits and chaos

**The Push Ability**

* 12-second cooldown

* Short-range, high-impact knockback

* Great for:

  * Pushing bomb carriers

  * Knocking players into blast zones

  * Interrupting throws

  * Creating last-second saves

Using the push briefly throws the player into an uncontrollable wobble.

**Teleporters (Funnel Pads)**

* Instantly transport players between two paired locations

* On exit, players stumble and wobble for 0.5 seconds

* Useful for repositioning, ambushing, escaping

 **Poison Cloud Shrink**

* After **60 seconds**, the arena begins to shrink

* Encourages final fights

* Prevents long stalling or corner camping

### 

### **Dynamic Bomb Tier System**

| Player Count | Active Bomb Limit | Description |
| ----- | ----- | ----- |
| 9–10 players | 7 bombs | High chaos, encourages early action |
| 6–8 players | 5 bombs | Balanced mid-game pressure |
| 4–5 players | 4 bombs | Smaller skirmishes, more tactical |
| 2–3 players | 3 bombs | Final duel; controlled chaos |

## **C. Player Roles & Team Dynamics**

Overall Behavior

The gameplay leans into *coordinated chaos*. Teams attempt to stay organized, but physics constantly sabotages them.  
Good plans fall apart instantly when someone slips, bumps a teammate, or teleports in the wrong direction.

**Role Fluidity**

There are no locked roles. Players shift between:

* Attacker (holding a bomb, trying to approach)

* Defender (protecting bomb carrier, pushing enemies)

* Disruptor (using Flail to ruin enemy timing)

* Evader (dodging explosions, creating distance)

## **Expected Team Strategies**

### **1\. Flail Denial**

Use the Flail at the perfect moment:

* To stop an enemy from grabbing a bomb

* To push an enemy into an explosion

* To make a bomb carrier stumble and mis-throw

### **2\. Bomb Pass Combo**

A risky but high-skill tactic:

* Teammates pass the bomb around repeatedly

* Reduce the fuse from 5s → 1s

* Final player throws a nearly-dead bomb for a near-unavoidable hit

### **3\. Teleporter Ambush**

A player teleports behind the enemy team,  
 → exits in a wobble,  
 → instantly Flails enemies into the path of an incoming throw.

Funny, flashy, effective.

## **D. Fun & Balancing Explanation**

### **Why It’s Fun**

**Contrast:**  
High-stakes elimination \+ characters that move like wet noodles.

Even beginners create funny moments:

* Tripping into a bomb

* Throwing wildly sideways

* Flailing teammates by accident

* Misusing teleporters

**But** skilled players can use movement, timing, spacing, and push mechanics to dominate.

This creates:

* Low skill floor (fun instantly)

* High skill ceiling (competitive depth)

### **Fair & Balanced Map**

* Symmetrical layout \= equal start

* Randomized bomb circles

* Bomb tiers \= consistent pressure

* Poison Cloud \= forced action, controlled match pacing

Every system ensures:

* No stalling

* Constant movement

* Constant decision-making

### **Map**

![][image2]