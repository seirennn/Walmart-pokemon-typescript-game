import { Monster, Move, BattleState } from "../types";
import { GAME_CONFIG } from "../config/gameConfig";
import { colorize } from "../utils/colorize";
import { displayBattleState } from "../utils/ascii-art";

export class BattleSystem {
  public readonly state: BattleState;

  constructor(playerMonster: Monster, opponentMonster: Monster) {
    this.state = {
      playerMonster,
      opponentMonster,
      turn: 1,
      isPlayerTurn: playerMonster.speed >= opponentMonster.speed,
      log: [],
    };
  }

  private calculateDamage(
    attacker: Monster,
    defender: Monster,
    move: Move,
  ): number {
    const effectiveness =
      GAME_CONFIG.typeEffectiveness[move.type][defender.type];
    const accuracy = Math.random() * 100 <= move.accuracy;
    if (!accuracy) return 0;

    const baseDamage = move.damage * (attacker.attack / defender.defense);
    return Math.floor(baseDamage * effectiveness);
  }

  private async executeMove(
    attacker: Monster,
    defender: Monster,
    move: Move,
  ): Promise<void> {
    const damage = this.calculateDamage(attacker, defender, move);

    if (damage === 0) {
      this.state.log.push(`${attacker.name}'s ${move.name} missed!`);
      return;
    }

    const effectiveness = GAME_CONFIG.typeEffectiveness[move.type][defender.type];
    let effectivenessMessage = "";
    if (effectiveness > 1) {
      effectivenessMessage = "It's super effective!";
    } else if (effectiveness < 1) {
      effectivenessMessage = "It's not very effective...";
    }

    defender.health = Math.max(0, defender.health - damage);
    this.state.log.push(
      `${attacker.name} used ${move.name}!`,
      effectivenessMessage,
      `Dealt ${colorize.damage(damage.toString())} damage!`,
    );

    if (defender.health <= 0) {
      this.state.log.push(`${defender.name} fainted!`);
    }
  }

  public async executeTurn(move: Move): Promise<BattleState> {
    const { playerMonster, opponentMonster } = this.state;

    if (this.state.isPlayerTurn) {
      await this.executeMove(playerMonster, opponentMonster, move);
    } else {
      const opponentMove =
        opponentMonster.moves[
          Math.floor(Math.random() * opponentMonster.moves.length)
        ];
      await this.executeMove(opponentMonster, playerMonster, opponentMove);
    }

    this.state.isPlayerTurn = !this.state.isPlayerTurn;
    this.state.turn++;

    return this.state;
  }

  public displayState(): void {
    displayBattleState(this.state);
    this.state.log.forEach((message) => console.log(message));
    this.state.log = [];
  }

  public isGameOver(): boolean {
    return (
      this.state.playerMonster.health <= 0 ||
      this.state.opponentMonster.health <= 0
    );
  }

  public getWinner(): Monster | null {
    if (!this.isGameOver()) return null;
    return this.state.playerMonster.health <= 0
      ? this.state.opponentMonster
      : this.state.playerMonster;
  }
}
