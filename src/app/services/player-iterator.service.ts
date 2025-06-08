import { Injectable } from "@angular/core";

import { Player } from "../base/players/player";
import { PlayerService2 } from "./player.service2";

@Injectable({
  providedIn: "root"
})
export class PlayerIteratorService {
  /* Properties ************************************************************ */
  private iteratorIndex: number = -1;
  private currentPlayer: Player | null = null;

  /* Constructor *********************************************************** */
  constructor(private playerService: PlayerService2) { }

  newIteration(): void {
    this.iteratorIndex = -1;
    this.currentPlayer = null;
  }

  goToPlayer(playerID: string): void {
    if (this.currentPlayer?.getId() === playerID) {
      return ;
    }

    const players = this.getPlayers();
    const index = players.findIndex(player => player.getId() === playerID);

    if (index !== -1) {
      this.iteratorIndex = index;
      this.currentPlayer = players[index];
    } else {
      throw new Error("Player not found in the collection.");
    }
  }

  /* Reference ************************************************************* */
  private getPlayers(): Player[] {
    return this.playerService.getPlayers();
  }

  /* Iteration ************************************************************* */
  hasNext(): boolean {
    return this.iteratorIndex + 1 < this.getPlayers().length;
  }

  hasPrevious(): boolean {
    return this.iteratorIndex > 0;
  }

  next(): Player | null {
    if (this.hasNext()) {
      this.iteratorIndex++;
      this.currentPlayer = this.getPlayers()[this.iteratorIndex];
      return this.currentPlayer;
    }
    return null;
  }

  previous(): Player | null {
    if (this.hasPrevious()) {
      this.iteratorIndex--;
      this.currentPlayer = this.getPlayers()[this.iteratorIndex];
      return this.currentPlayer;
    }
    return null;
  }

  current(): Player | null {
    return this.currentPlayer;
  }
}
