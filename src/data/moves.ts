import { Move } from "../types";

export const movesList: Move[] = [
  // Fire moves
  {
    name: "Fireball",
    type: "Fire",
    damage: 40,
    accuracy: 90,
    description: "Launches a powerful ball of fire"
  },
  {
    name: "Flame Burst",
    type: "Fire",
    damage: 30,
    accuracy: 95,
    description: "Creates an explosive burst of flames"
  },
  {
    name: "Inferno",
    type: "Fire",
    damage: 60,
    accuracy: 75,
    description: "Unleashes a devastating inferno"
  },

  // Water moves
  {
    name: "Aqua Jet",
    type: "Water",
    damage: 35,
    accuracy: 95,
    description: "Quick burst of pressurized water"
  },
  {
    name: "Tidal Wave",
    type: "Water",
    damage: 50,
    accuracy: 85,
    description: "Summons a massive wave"
  },
  {
    name: "Whirlpool",
    type: "Water",
    damage: 45,
    accuracy: 90,
    description: "Creates a swirling vortex of water"
  },

  // Earth moves
  {
    name: "Rock Slide",
    type: "Earth",
    damage: 45,
    accuracy: 90,
    description: "Triggers a cascade of falling rocks"
  },
  {
    name: "Earthquake",
    type: "Earth",
    damage: 55,
    accuracy: 85,
    description: "Shakes the ground violently"
  },
  {
    name: "Boulder Crush",
    type: "Earth",
    damage: 40,
    accuracy: 95,
    description: "Hurls a massive boulder"
  },

  // Air moves
  {
    name: "Tornado",
    type: "Air",
    damage: 45,
    accuracy: 90,
    description: "Summons a powerful whirlwind"
  },
  {
    name: "Air Slash",
    type: "Air",
    damage: 40,
    accuracy: 95,
    description: "Launches sharp blades of air"
  },
  {
    name: "Hurricane",
    type: "Air",
    damage: 60,
    accuracy: 80,
    description: "Creates a devastating storm"
  }
];
