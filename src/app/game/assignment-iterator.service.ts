import { Injectable } from "@angular/core";

import { AssignmentService } from "./assignment.service";

import { Player } from "./base/players/player";

@Injectable({
  providedIn: "root"
})
export class AssignmentIteratorService {
  /* Properties ************************************************************ */
  private playerIterator: IterableIterator<Player> | null = null;
  private currentPlayer: Player | null = null;

  /* Constructor *********************************************************** */
  constructor(private assignmentService: AssignmentService) { }

  /* New Game ************************************************************** */
  newAssignmentCharacterToPlayer(): void {
    this.playerIterator = this.assignmentService.getPlayerIterator();
  }

  /* Next Player *********************************************************** */
  nextPlayer(): void {
    if (this.playerIterator) {
      const next = this.playerIterator.next();
      if (!next.done) {
        this.currentPlayer = next.value;
      } else {
        this.currentPlayer = null;
      }
    }
  }

  /* Get Current Player **************************************************** */
  getCurrentPlayer(): Player | null {
    return this.currentPlayer;
  }
}
