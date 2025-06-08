import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AssignmentIteratorService } from "../../game/assignment-iterator.service";

@Component({
  selector: "app-ask-assign",
  imports: [],
  template: `
    <h2>Zuordnung</h2>
    <p>Möchtest du gleich zu Beginn alle Charaktere den Spielern zuordnen?</p>
    <button class="game-button action-add" (click)="assignCharacters()">Zuordnen</button>
    <button class="game-button action-next" (click)="skipAssignCharacters()">Überspringen</button>
  `,
  styles: ``
})
export class AskAssignComponent {
  constructor(
    private router: Router,
    private assigmentIteratorService: AssignmentIteratorService,
  ) {}

  assignCharacters() {
    this.assigmentIteratorService.newAssignmentCharacterToPlayer();
    this.router.navigate(["/main/assign-character-to-player"]);
  }

  skipAssignCharacters() {
    this.router.navigate(["/main"]);
  }
}
