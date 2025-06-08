import {Injectable} from "@angular/core";

import {Player, PlayerData} from "../base/players/player";


@Injectable({
  providedIn: "root"
})
export class PlayerService2 {
  private players: Map<string, Player> = new Map();

  /* Constructor *********************************************************** */
  constructor() {
    this.load();
  }

  /* New Game ************************************************************** */
  newGame(players: Player[]): void {
    this.players.clear();

    players.forEach(player => {
      this.players.set(player.getId(), player);
    });

    this.save();
  }

  /* Storage *************************************************************** */
  private storageKey = "players";

  private save(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        players: Array.from(this.players.values()).map(player => player.toJSON()),
      }),
    );
  }

  private load(): void {
    const data = localStorage.getItem(this.storageKey);

    if (data) {
      const parsedData = JSON.parse(data);
      this.players = new Map(parsedData.players.map(
        (playerData: PlayerData) => [
          playerData.id,
          new Player(
            playerData.name,
            playerData.id,
          ),
        ]
      ));
    }
  }

  /* Checks **************************************************************** */
  checkPlayerExists(playerID: string): void {
    if (!this.players.has(playerID)) {
      throw new Error(`Player '${playerID}' does not exist.`);
    }
  }

  /* Getters *************************************************************** */
  getPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  getPlayerById(playerID: string): Player | undefined {
    this.checkPlayerExists(playerID);
    return this.players.get(playerID);
  }
}
