import { Injectable } from "@angular/core";

import { AssignmentService } from "./assignment.service";

import { Player } from "./base/players/player";

@Injectable({
  providedIn: "root"
})
export class AssignmentIteratorService {
  /* Properties ************************************************************ */
  private iterate: boolean = true;
  private iteratorIndex: number = -1;
  private currentPlayer: Player | null = null;

  /* Constructor *********************************************************** */
  constructor(private assignmentService: AssignmentService) { }

  /* New Game ************************************************************** */
  newAssignmentCharacterToPlayer(): void {
    this.iterate = true;
    this.iteratorIndex = -1;
  }

  /* Iteration ************************************************************* */
  hasNext(): boolean {
    if (!this.iterate) {
      return false;
    }
    const players = this.getPlayers();
    return this.iteratorIndex + 1 < players.length;
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

  getPlayers(): Player[] {
    return this.assignmentService.getPlayers();
  }

  /* Get Current Player **************************************************** */
  getCurrentPlayer(): Player | null {
    return this.currentPlayer;
  }
}
