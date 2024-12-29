export type MonsterType = "Fire" | "Water" | "Earth" | "Air";

export interface Monster {
  id: string;
  name: string;
  type: MonsterType;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  speed: number;
  level: number;
  experience: number;
  moves: Move[];
  wins: number;
  totalBattles: number;
  healingPotions: number;
  consecutiveWins: number;
}

export interface Move {
  name: string;
  damage: number;
  type: MonsterType;
  description: string;
  accuracy: number;
}

export interface BattleState {
  playerMonster: Monster;
  opponentMonster: Monster;
  turn: number;
  isPlayerTurn: boolean;
  log: string[];
}

export interface SaveGame {
  playerMonster: Monster;
  lastSaved: string;
  totalWins: number;
  totalBattles: number;
}

export interface BattleRewards {
  experience: number;
  healingPotions: number;
  bonusReward?: string;
}
