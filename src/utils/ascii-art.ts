import { BattleState } from "../types";
import { colorize } from "./colorize";

const monsterArt = {
  Fire: `
   /\\   /\\
  (  °w° )
   )    (
  (______)`,
  Water: `
   ,---.
  (*~o~*)
  (     )
   \\_^_/`,
  Earth: `
   _____
  (o-_-o)
  |     |
  /_____\\`,
  Air: `
    ^v^
   (°×°)
  <     >
   \\___/`,
};

export function displayBattleState(state: BattleState): void {
  const { playerMonster, opponentMonster } = state;
  
  console.clear();
  console.log("\n=== MONSTER BATTLE ===\n");
  
  // Display opponent
  console.log(`${colorize.name(opponentMonster.name)} [${colorize.type(opponentMonster.type)}]`);
  console.log(`HP: ${colorize.health(opponentMonster.health, opponentMonster.maxHealth)}`);
  console.log(monsterArt[opponentMonster.type]);
  
  console.log("\n   VS\n");
  
  // Display player
  console.log(monsterArt[playerMonster.type]);
  console.log(`${colorize.name(playerMonster.name)} [${colorize.type(playerMonster.type)}]`);
  console.log(`HP: ${colorize.health(playerMonster.health, playerMonster.maxHealth)}`);
  
  console.log("\n===================\n");
}
