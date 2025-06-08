import { NgForOf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ListComponent } from "../common/list.component";

import { AssignmentService } from "../services/assignment.service"
import { PlayerIteratorService } from "../services/player-iterator.service";

import { Character } from "../base/characters/character";
import { Player } from "../base/players/player";

@Component({
  selector: "app-assign-character-to-player2",
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
export class AssignCharacterToPlayerComponent2 implements OnInit {
  currentPlayer: Player | null = null;
  assignedCharacters: Character[] = [];
  unassignedCharacters: Character[] = [];

  hasNext: boolean = true;
  hasPrevious: boolean = false;

  selectedCharacterID: string = "";

  /* Constructor *********************************************************** */
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignmentService: AssignmentService,
    private playerIteratorService: PlayerIteratorService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const playerID = params["playerID"];
      if (playerID) {
        this.playerIteratorService.goToPlayer(playerID);
      } else {
        this.playerIteratorService.newIteration();
      }

      this.currentPlayer = this.playerIteratorService.current();
      this.updateAssignedCharacters();
      this.updateUnassignedCharacters();
      this.updateGameButtons();
    });
  }

  /* Game Buttons ********************************************************** */
  next(): void {
    const nextPlayer = this.playerIteratorService.next();

    if (nextPlayer) {
      this.router.navigate([
        "/assignment",
        "character-to-player",
        nextPlayer.getId(),
      ]);
    } else {
      this.router.navigate(["/main"]);
    }
  }

  previous(): void {
    const previousPlayer = this.playerIteratorService.previous();

    if (previousPlayer) {
      this.router.navigate([
        "/assignment",
        "character-to-player",
        previousPlayer.getId(),
      ]);
    } else {
      this.router.navigate(["/assignment"]);
    }
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
    this.hasNext = this.playerIteratorService.hasNext();
    this.hasPrevious = this.playerIteratorService.hasPrevious();
  }
}
