import { nanoid } from "nanoid";
import { Monster, MonsterType } from "../types";
import { GAME_CONFIG } from "../config/gameConfig";
import { movesList } from "../data/moves";

export class MonsterFactory {
  static create(name: string, type: MonsterType): Monster {
    const moves = movesList
      .filter((move) => move.type === type || Math.random() < 0.3)
      .slice(0, 3);

    return {
      id: nanoid(),
      name,
      type,
      health: GAME_CONFIG.baseStats.health,
      maxHealth: GAME_CONFIG.baseStats.health,
      attack: GAME_CONFIG.baseStats.attack,
      defense: GAME_CONFIG.baseStats.defense,
      speed: GAME_CONFIG.baseStats.speed,
      level: 1,
      experience: 0,
      moves,
    };
  }

  static levelUp(monster: Monster): Monster {
    if (monster.level >= GAME_CONFIG.maxLevel) return monster;

    const updatedMonster = { ...monster };
    updatedMonster.level += 1;
    updatedMonster.maxHealth += Math.floor(monster.maxHealth * 0.1);
    updatedMonster.health = updatedMonster.maxHealth;
    updatedMonster.attack += Math.floor(monster.attack * 0.1);
    updatedMonster.defense += Math.floor(monster.defense * 0.1);
    updatedMonster.speed += Math.floor(monster.speed * 0.1);

    return updatedMonster;
  }
}
