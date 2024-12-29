import { input } from "./utils/input";
import { MonsterFactory } from "./services/MonsterFactory";
import { BattleSystem } from "./services/BattleSystem";
import { colorize } from "./utils/colorize";
import { MonsterType } from "./types";

async function main() {
  console.log(colorize.name("\nWelcome to Monster Battler!\n"));

  // Create player's monster
  const playerName = await input.getMonsterName();
  const playerType = await input.selectMonsterType();
  const playerMonster = MonsterFactory.create(playerName, playerType);

  // Create opponent
  const monsterTypes: MonsterType[] = ["Fire", "Water", "Earth", "Air"];
  const randomType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
  const opponentMonster = MonsterFactory.create("Wild Monster", randomType);

  // Initialize battle
  const battle = new BattleSystem(playerMonster, opponentMonster);
  battle.displayState();

  // Battle loop
  while (!battle.isGameOver()) {
    if (battle.state.isPlayerTurn) {
      const move = await input.selectMove(playerMonster);
      await battle.executeTurn(move);
    } else {
      await battle.executeTurn(opponentMonster.moves[0]);
    }
    battle.displayState();
  }

  // Game over
  const winner = battle.getWinner();
  if (winner) {
    console.log(colorize.name(`\n${winner.name} wins the battle!\n`));
  }
}

main().catch(console.error);
