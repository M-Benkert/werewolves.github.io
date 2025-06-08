import { Component } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

import { Character } from "../game/base/characters/character";
import { Player } from "../game/base/players/player";

import { AssignmentService } from "../game/assignment.service";
import { CharacterService } from "../game/character.service";
import { PlayerService} from "../game/player.service";

@Component({
  selector: "app-new-game",
  imports: [RouterLink],
  template: `
    <h2>Neues Spiel</h2>
    <button class="game-button action-item" routerLink="/new_game/players">Spieler</button>
    <button class="game-button action-item" routerLink="/new_game/characters">Charaktere</button>
    <p>Anzahl Spieler: {{ players.length }}</p>
    <p>Anzahl Charaktere: {{ characters.length }}</p>

    <button class="game-button action-add" (click)="newGame()">Spiel Starten</button>
  `,
  styles: ``
})
export class NewGameComponent {
  characters: Character[] = [];
  players: Player[] = [];

  constructor(
    private router: Router,
    private assignmentService: AssignmentService,
    private characterService: CharacterService,
    private playerService: PlayerService,
  ) {
    this.characters = this.characterService.getCharacters();
    this.players = this.playerService.getPlayers();
  }

  newGame() {
    this.assignmentService.newGame(
      this.characterService.getCharacters(),
      this.playerService.getPlayers()
    )

    this.router.navigate(["/new_game/assign"]);
  }
}
