import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

import { ListComponent } from "../../common/list.component";

import { Player } from "../../base/players/player";
import { PlayerService } from "../../services/player.service";

@Component({
  selector: "app-new_game-01_players",
  imports: [FormsModule, ReactiveFormsModule, RouterLink, ListComponent],
   template: `
    <h2>Spieler</h2>
    <app-list
      [listItems]="players"
      (removeEvent)="removePlayer($event)"
    ></app-list>
    <input
      type="text"
      class="text-input"
      placeholder="Hinzufügen"
      [(ngModel)]="newPlayerName"
    />
    <button (click)="add()" class="game-button action-add">
      Hinzufügen
    </button>
    <button routerLink="/new_game/characters" class="game-button action-next">
      Weiter
    </button>
  `
})
export class PlayersComponent {
  players: Player[] = [];
  newPlayerName: string = "";

  constructor(private playersService: PlayerService) {
    this.updatePlayerList();
  }

  add(): void {
    const name: string = this.newPlayerName.trim();

    if (name === "") {
      alert("Bitte gib einen Namen ein!");
      return ;
    }

    if (!this.playersService.canAddPlayer(name)) {
      alert(`Spieler '${name}' existiert bereits!`);
      return ;
    }

    this.addPlayer(this.newPlayerName);
    this.newPlayerName = "";
  }

  addPlayer(name: string): void {
    this.playersService.addPlayer(name);
    this.updatePlayerList();
  }

  removePlayer(id: string) {
    this.playersService.removePlayer(id);
    this.updatePlayerList();
  }

  private updatePlayerList(): void {
    this.players = this.playersService.getPlayers();
  }
}
