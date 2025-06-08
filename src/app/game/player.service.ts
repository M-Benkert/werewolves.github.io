import { Injectable } from "@angular/core";

import { Player, PlayerData } from "./base/players/player";


@Injectable({
  providedIn: "root"
})
export class PlayerService {
  players: Player[] = [];

  /* Constructor *********************************************************** */
  constructor() {
    this.load();
  }

  /* Storage *************************************************************** */
  private storageKey = "new-game-players";

  private save(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(
        this.players.map(player => player.toJSON())
      ),
    )
  }

  private load(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.players = JSON.parse(data).map(
        (playerData: PlayerData) => Player.fromJSON(playerData)
      );
    }
  }

  /* Add and remove ******************************************************** */
  addPlayer(name: string): void {
    if (!this.canAddPlayer(name)) {
      throw new Error(`Can't add player '${name}': Name must be unique.`);
    }

    this.players.push(new Player(name));
    this.save();
  }

  removePlayer(id: string): void {
    this.players = this.players.filter(
      player => player.getId() !== id
    );
    this.save();
  }

  canAddPlayer(name: string): boolean {
    return this.players.every(
      player => player.getName() !== name
    );
  }

  /* Getters *************************************************************** */
  getPlayers(): Player[] {
    return this.players;
  }
}
