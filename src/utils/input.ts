import inquirer from "inquirer";
import { Move, Monster, MonsterType } from "../types";

export const input = {
  async selectMove(monster: Monster): Promise<Move> {
    const { moveChoice } = await inquirer.prompt([
      {
        type: "list",
        name: "moveChoice",
        message: "Choose your move:",
        choices: monster.moves.map((move) => ({
          name: `${move.name} (${move.type}) - Power: ${move.damage}, Accuracy: ${move.accuracy}%`,
          value: move,
        })),
      },
    ]);
    return moveChoice;
  },

  async getMonsterName(): Promise<string> {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Name your monster:",
        validate: (input: string) => {
          if (input.length < 1) return "Name cannot be empty!";
          if (input.length > 20) return "Name must be 20 characters or less!";
          return true;
        },
      },
    ]);
    return name;
  },

  async selectMonsterType(): Promise<MonsterType> {
    const { type } = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select monster type:",
        choices: [
          { name: "🔥 Fire - High attack, low defense", value: "Fire" },
          { name: "💧 Water - Balanced stats", value: "Water" },
          { name: "🗿 Earth - High defense, low speed", value: "Earth" },
          { name: "💨 Air - High speed, low defense", value: "Air" }
        ],
      },
    ]);
    return type;
  },

  async selectAction(monster: Monster): Promise<'battle' | 'heal' | 'save' | 'stats' | 'quit'> {
    const healthPercentage = (monster.health / monster.maxHealth) * 100;
    const healChoice = monster.healingPotions > 0
      ? `💊 Heal (${monster.healingPotions} potions left)`
      : "💊 Heal (No potions left)";

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          { name: "⚔️  Battle", value: "battle" },
          { 
            name: healChoice, 
            value: "heal",
            disabled: monster.healingPotions <= 0 || healthPercentage === 100
          },
          { name: "📊 View Stats", value: "stats" },
          { name: "💾 Save Game", value: "save" },
          { name: "🚪 Quit", value: "quit" }
        ],
      },
    ]);
    return action;
  },

  async confirmAction(message: string): Promise<boolean> {
    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message,
        default: true,
      },
    ]);
    return confirm;
  }
};
