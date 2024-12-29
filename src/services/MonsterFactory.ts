import { nanoid } from "nanoid";
import { Monster, MonsterType, BattleRewards } from "../types";
import { GAME_CONFIG } from "../config/gameConfig";
import { movesList } from "../data/moves";
import { colorize } from "../utils/colorize";

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
      wins: 0,
      totalBattles: 0,
      healingPotions: 3, // Start with 3 healing potions
      consecutiveWins: 0
    };
  }

  static levelUp(monster: Monster): Monster {
    if (monster.level >= GAME_CONFIG.maxLevel) return monster;

    const updatedMonster = { ...monster };
    updatedMonster.level += 1;
    updatedMonster.maxHealth += Math.floor(monster.maxHealth * 0.1);
    updatedMonster.health = updatedMonster.maxHealth; // Full heal on level up
    updatedMonster.attack += Math.floor(monster.attack * 0.1);
    updatedMonster.defense += Math.floor(monster.defense * 0.1);
    updatedMonster.speed += Math.floor(monster.speed * 0.1);
    updatedMonster.experience = 0;

    console.log(colorize.heal(`\n ${monster.name} reached level ${updatedMonster.level}!`));
    console.log(colorize.heal(` All stats increased and HP restored to full!`));

    // Learn new move if available
    const availableMoves = movesList.filter(move => 
      move.type === monster.type && 
      !monster.moves.some(m => m.name === move.name)
    );
    
    if (availableMoves.length > 0 && monster.moves.length < 4) {
      const newMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      updatedMonster.moves.push(newMove);
      console.log(colorize.heal(`\n ${monster.name} learned ${newMove.name}!\n`));
    }

    return updatedMonster;
  }

  static gainExperience(monster: Monster, amount: number): Monster {
    const updatedMonster = { ...monster };
    updatedMonster.experience += amount;

    if (updatedMonster.experience >= GAME_CONFIG.experienceToLevel) {
      return this.levelUp(updatedMonster);
    }

    return updatedMonster;
  }

  static heal(monster: Monster): Monster {
    if (monster.healingPotions <= 0) {
      console.log(colorize.damage("\n No healing potions left!\n"));
      return monster;
    }

    const updatedMonster = { ...monster };
    const healAmount = Math.floor(monster.maxHealth * 0.5); // Heal 50% of max health
    updatedMonster.health = Math.min(monster.maxHealth, monster.health + healAmount);
    updatedMonster.healingPotions--;

    console.log(colorize.heal(`\n Used a healing potion! Restored ${healAmount} HP!`));
    console.log(colorize.heal(` ${updatedMonster.healingPotions} potions remaining\n`));

    return updatedMonster;
  }

  static calculateBattleRewards(monster: Monster, opponentLevel: number): BattleRewards {
    const baseExperience = 30;
    const levelDifference = opponentLevel - monster.level;
    const experienceMultiplier = 1 + Math.max(0, levelDifference * 0.1);
    
    monster.consecutiveWins++;
    
    const rewards: BattleRewards = {
      experience: Math.floor(baseExperience * experienceMultiplier),
      healingPotions: 1
    };

    // Bonus rewards for consecutive wins
    if (monster.consecutiveWins >= 3) {
      rewards.experience += 20;
      rewards.healingPotions++;
      rewards.bonusReward = " Win Streak Bonus!";
    }

    return rewards;
  }
}
