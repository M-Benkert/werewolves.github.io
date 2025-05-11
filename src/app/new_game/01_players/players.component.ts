import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";

import { ListComponent } from "../../common/list.component";

import { Player } from "../../game/base/players/player";
import { PlayerService } from "../../game/player.service";

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
    this.addPlayer(this.newPlayerName);
    this.newPlayerName = "";
  }

  addPlayer(name: string): void {
    try {
      this.playersService.addPlayer(name.trim());
      this.updatePlayerList();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  removePlayer(id: string) {
    this.playersService.removePlayer(id);
    this.updatePlayerList();
  }

  private updatePlayerList(): void {
    this.players = this.playersService.getPlayers();
  }
}
