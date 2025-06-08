import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgForOf } from "@angular/common";

import { ListComponent } from "../../common/list.component";

import { AssignmentService } from "../../game/assignment.service";
import { AssignmentIteratorService } from "../../game/assignment-iterator.service";

import { Character } from "../../game/base/characters/character";
import { Player } from "../../game/base/players/player";

@Component({
  selector: "app-assign-character-to-player",
  imports: [FormsModule, ListComponent, NgForOf],
  template: `
    <h2>Charaktere Zuordnen</h2>
    <h3>{{ currentPlayer?.getName() ?? "" }}</h3>
    <app-list
      [listItems]="assignedCharacters"
      (removeEvent)="unassign($event)"
    ></app-list>
    <select
      id="select-input"
      class="select-input"
      [(ngModel)]="selectedCharacterID"
      (ngModelChange)="assign()"
    >
      <option *ngFor="let character of unassignedCharacters" [value]="character.getId()">
        {{ character.getName() }}
      </option>
    </select>
    <button class="game-button action-back" (click)="previous()">
      Zurück
    </button>
    <button class="game-button action-next" (click)="next()">
      Weiter
    </button>
  `,
  styles: ``
})
export class AssignCharacterToPlayerComponent {
  currentPlayer: Player | null = null;
  assignedCharacters: Character[] = [];
  unassignedCharacters: Character[] = [];

  hasNext: boolean = true;
  hasPrevious: boolean = false;

  selectedCharacterID: string = "";

  /* Constructor *********************************************************** */
  constructor(
    private assignmentService: AssignmentService,
    private assignmentIteratorService: AssignmentIteratorService
  ) {
    this.next();
  }

  next(): void {
    this.currentPlayer = this.assignmentIteratorService.next();

    this.updateAssignedCharacters();
    this.updateUnassignedCharacters();
    this.updateGameButtons();
  }

  previous(): void {
    this.currentPlayer = this.assignmentIteratorService.previous();

    this.updateAssignedCharacters();
    this.updateUnassignedCharacters();
    this.updateGameButtons();
  }

  /* Assign and Unassign *************************************************** */
  assign(): void {
    if (!this.currentPlayer) {
      return ;
    }

    if (!this.selectedCharacterID) {
      alert("Bitte wähle einen Charakter aus!");
      return ;
    }

    this.assignCharacterToPlayer(this.selectedCharacterID, this.currentPlayer.getId());
    this.selectedCharacterID = "";
  }

  unassign(characterID: string): void {
    if (!this.currentPlayer) {
      return ;
    }

    const playerID = this.currentPlayer.getId();
    this.unassignCharacterFromPlayer(characterID, playerID);
    this.selectedCharacterID = "";
  }

  assignCharacterToPlayer(characterID: string, playerID: string): void {
    this.assignmentService.assignCharacterToPlayer(characterID, playerID);
    this.updateAssignedCharacters();
    this.updateUnassignedCharacters();
  }

  unassignCharacterFromPlayer(characterID: string, playerID: string): void {
    this.assignmentService.unassignCharacterFromPlayer(characterID, playerID);
    this.updateAssignedCharacters();
    this.updateUnassignedCharacters();
  }

  /* Visualize ************************************************************* */
  private updateAssignedCharacters(): void {
    if (!this.currentPlayer) {
      this.assignedCharacters = [];
      return ;
    }

    this.assignedCharacters = this.assignmentService.getCharactersAssignedToPlayer(this.currentPlayer.getId());
  }

  private updateUnassignedCharacters(): void {
    this.unassignedCharacters = this.assignmentService.getUnassignedCharacters();
  }

  private updateGameButtons(): void {
    this.hasNext = this.assignmentIteratorService.hasNext();
    this.hasPrevious = this.assignmentIteratorService.hasPrevious();
  }
}
