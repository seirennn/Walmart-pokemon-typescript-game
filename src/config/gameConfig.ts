export const GAME_CONFIG = {
  baseStats: {
    health: 100,
    attack: 20,
    defense: 15,
    speed: 10,
  },
  experienceToLevel: 100,
  maxLevel: 100,
  typeEffectiveness: {
    Fire: { Water: 0.5, Earth: 2, Air: 1, Fire: 1 },
    Water: { Fire: 2, Earth: 1, Air: 0.5, Water: 1 },
    Earth: { Fire: 0.5, Water: 2, Air: 1, Earth: 1 },
    Air: { Fire: 1, Water: 1, Earth: 2, Air: 1 },
  },
  battleRewards: {
    baseExperience: 30,
    winStreakBonus: 20,
    winStreakThreshold: 3,
  }
};
