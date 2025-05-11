import { Injectable } from "@angular/core";

import { Player } from "./base/players/player";


@Injectable({
  providedIn: "root"
})
export class PlayerService {
  players: Player[] = [];

  addPlayer(name: string): void {
    if (!this.canAddPlayer(name)) {
      throw new Error(`Spieler '${name}' existiert bereits!`);
    }

    this.players.push(new Player(name));
  }

  removePlayer(id: string): void {
    this.players = this.players.filter(
      player => player.getId() !== id
    );
  }

  canAddPlayer(name: string): boolean {
    return this.players.every(
      player => player.getName() !== name
    );
  }

  getPlayers(): Player[] {
    return this.players;
  }
}
