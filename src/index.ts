import { input } from "./utils/input";
import { MonsterFactory } from "./services/MonsterFactory";
import { BattleSystem } from "./services/BattleSystem";
import { SaveGameService } from "./services/SaveGameService";
import { colorize } from "./utils/colorize";
import { Monster, MonsterType } from "./types";
import { GAME_CONFIG } from "./config/gameConfig";

async function createOrLoadMonster(): Promise<Monster> {
  if (SaveGameService.hasSaveGame()) {
    const loadGame = await input.confirmAction('Save game found! Would you like to load it?');
    if (loadGame) {
      const saveData = SaveGameService.loadGame();
      if (saveData) {
        return saveData.playerMonster;
      }
    }
  }

  const playerName = await input.getMonsterName();
  const playerType = await input.selectMonsterType();
  return MonsterFactory.create(playerName, playerType);
}

async function displayStats(monster: Monster): Promise<void> {
  console.clear();
  console.log("\n📊 Monster Stats 📊");
  console.log("===================");
  console.log(`Name: ${colorize.name(monster.name)}`);
  console.log(`Type: ${colorize.type(monster.type)}`);
  console.log(`Level: ${monster.level}`);
  console.log(`Experience: ${monster.experience}/${GAME_CONFIG.experienceToLevel}`);
  console.log(`Health: ${colorize.health(monster.health, monster.maxHealth)}`);
  console.log(`Attack: ${monster.attack}`);
  console.log(`Defense: ${monster.defense}`);
  console.log(`Speed: ${monster.speed}`);
  console.log(`Healing Potions: ${monster.healingPotions}`);
  console.log("\n🏆 Battle Record 🏆");
  console.log("===================");
  console.log(`Wins: ${monster.wins}`);
  console.log(`Total Battles: ${monster.totalBattles}`);
  console.log(`Win Rate: ${((monster.wins / Math.max(1, monster.totalBattles)) * 100).toFixed(1)}%`);
  console.log(`Current Win Streak: ${monster.consecutiveWins}`);
  console.log("\nPress Enter to continue...");
  
  await new Promise<void>(resolve => {
    process.stdin.once('data', () => resolve());
  });
}

async function main() {
  console.log(colorize.name("\n🎮 Welcome to Monster Battler!\n"));

  let playerMonster = await createOrLoadMonster();
  let keepPlaying = true;

  while (keepPlaying) {
    const action = await input.selectAction(playerMonster);

    switch (action) {
      case 'battle': {
        // Create opponent
        const monsterTypes: MonsterType[] = ["Fire", "Water", "Earth", "Air"];
        const randomType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
        const opponentLevel = Math.max(1, playerMonster.level + Math.floor(Math.random() * 3) - 1);
        const opponentMonster = MonsterFactory.create(`Wild ${randomType} Monster`, randomType);
        
        // Level up opponent to match player
        for (let i = 1; i < opponentLevel; i++) {
          MonsterFactory.levelUp(opponentMonster);
        }

        // Initialize battle
        const battle = new BattleSystem(playerMonster, opponentMonster);
        battle.displayState();

        // Battle loop
        while (!battle.isGameOver()) {
          if (battle.state.isPlayerTurn) {
            const move = await input.selectMove(playerMonster);
            await battle.executeTurn(move);
          } else {
            await battle.executeTurn(opponentMonster.moves[Math.floor(Math.random() * opponentMonster.moves.length)]);
          }
          battle.displayState();
        }

        // Update stats and rewards
        playerMonster.totalBattles++;
        const winner = battle.getWinner();
        if (winner && winner.id === playerMonster.id) {
          playerMonster.wins++;
          const rewards = MonsterFactory.calculateBattleRewards(playerMonster, opponentLevel);
          
          console.log(colorize.experience('\n🎉 Battle Rewards:'));
          console.log(colorize.experience(`✨ ${rewards.experience} experience points`));
          console.log(colorize.heal(`💊 ${rewards.healingPotions} healing potion(s)`));
          if (rewards.bonusReward) {
            console.log(colorize.experience(rewards.bonusReward));
          }
          
          playerMonster = MonsterFactory.gainExperience(playerMonster, rewards.experience);
          playerMonster.healingPotions += rewards.healingPotions;
        } else {
          playerMonster.consecutiveWins = 0;
          console.log(colorize.damage("\n😢 Better luck next time!\n"));
        }
        break;
      }

      case 'heal':
        playerMonster = MonsterFactory.heal(playerMonster);
        break;

      case 'stats':
        await displayStats(playerMonster);
        break;

      case 'save':
        SaveGameService.saveGame(playerMonster);
        break;

      case 'quit':
        const saveBeforeQuit = await input.confirmAction('Would you like to save before quitting?');
        if (saveBeforeQuit) {
          SaveGameService.saveGame(playerMonster);
        }
        keepPlaying = false;
        break;
    }
  }

  console.log(colorize.name("\nThanks for playing Monster Battler! 👋\n"));
}

main().catch(console.error);
