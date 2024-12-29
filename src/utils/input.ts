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
        choices: ["Fire", "Water", "Earth", "Air"],
      },
    ]);
    return type;
  },
};
