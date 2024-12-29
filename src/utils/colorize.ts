import chalk from "chalk";
import { MonsterType } from "../types";

export const colorize = {
  type: (type: MonsterType): string => {
    const colors = {
      Fire: chalk.red,
      Water: chalk.blue,
      Earth: chalk.green,
      Air: chalk.cyan,
    };
    return colors[type](type);
  },
  health: (current: number, max: number): string => {
    const percentage = (current / max) * 100;
    if (percentage > 50) return chalk.green(`${current}/${max}`);
    if (percentage > 25) return chalk.yellow(`${current}/${max}`);
    return chalk.red(`${current}/${max}`);
  },
  name: chalk.bold,
  damage: chalk.red,
  heal: chalk.green,
  experience: chalk.blue,
};
