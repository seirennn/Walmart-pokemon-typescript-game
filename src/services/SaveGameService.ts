import fs from 'fs';
import path from 'path';
import { Monster, SaveGame } from '../types';
import { colorize } from '../utils/colorize';

export class SaveGameService {
  private static readonly SAVE_DIR = path.join(process.cwd(), 'saves');
  private static readonly SAVE_FILE = 'savegame.json';

  private static ensureSaveDirectory(): void {
    if (!fs.existsSync(this.SAVE_DIR)) {
      fs.mkdirSync(this.SAVE_DIR, { recursive: true });
    }
  }

  private static getSavePath(): string {
    return path.join(this.SAVE_DIR, this.SAVE_FILE);
  }

  static saveGame(monster: Monster): void {
    this.ensureSaveDirectory();
    
    const saveData: SaveGame = {
      playerMonster: monster,
      lastSaved: new Date().toISOString(),
      totalWins: monster.wins,
      totalBattles: monster.totalBattles
    };

    try {
      fs.writeFileSync(this.getSavePath(), JSON.stringify(saveData, null, 2));
      console.log(colorize.heal('\nGame saved successfully! 💾\n'));
    } catch (error) {
      console.error(colorize.damage('\nFailed to save game! 😢\n'));
    }
  }

  static loadGame(): SaveGame | null {
    try {
      if (fs.existsSync(this.getSavePath())) {
        const saveData = JSON.parse(fs.readFileSync(this.getSavePath(), 'utf-8'));
        console.log(colorize.heal('\nGame loaded successfully! 📂\n'));
        return saveData;
      }
    } catch (error) {
      console.error(colorize.damage('\nFailed to load save game! 😢\n'));
    }
    return null;
  }

  static hasSaveGame(): boolean {
    return fs.existsSync(this.getSavePath());
  }

  static deleteSaveGame(): void {
    try {
      if (fs.existsSync(this.getSavePath())) {
        fs.unlinkSync(this.getSavePath());
        console.log(colorize.damage('\nSave game deleted! 🗑️\n'));
      }
    } catch (error) {
      console.error(colorize.damage('\nFailed to delete save game! 😢\n'));
    }
  }
}
