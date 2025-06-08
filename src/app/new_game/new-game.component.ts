import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

import { Character } from "../base/characters/character";
import { Player } from "../base/players/player";

import { AssignmentService } from "../services/assignment.service";
import { CharacterService } from "../services/character.service";
import { CharacterService2 } from "../services/character.service2";
import { PlayerService} from "../services/player.service";
import { PlayerService2 } from "../services/player.service2";

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
export class NewGameComponent implements OnInit {
  characters: Character[] = [];
  players: Player[] = [];

  constructor(
    private router: Router,
    private characterService: CharacterService,
    private playerService: PlayerService,
    private characterService2: CharacterService2,
    private playerService2: PlayerService2,
    private assignmentService: AssignmentService,
  ) {}

  ngOnInit() {
    this.characters = this.characterService.getCharacters();
    this.players = this.playerService.getPlayers();
  }

  newGame() {
    this.characterService2.newGame(
      this.characterService.getCharacters(),
    )
    this.playerService2.newGame(
      this.playerService.getPlayers(),
      );
    this.assignmentService.newGame();

    this.router.navigate(["/assignment"]);
  }
}
