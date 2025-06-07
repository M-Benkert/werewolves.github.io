import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

import { Character } from "../game/base/characters/character";
import { Player } from "../game/base/players/player";

import { CharacterService } from "../game/character.service";
import { PlayerService} from "../game/player.service";

@Component({
  selector: 'app-new-game',
  imports: [RouterLink],
  template: `
    <h2>Neues Spiel</h2>
    <button class="game-button action-item" routerLink="/new_game/players">Spieler</button>
    <button class="game-button action-item" routerLink="/new_game/characters">Charaktere</button>
    <p>Anzahl Spieler: {{ players.length }}</p>
    <p>Anzahl Charaktere: {{ characters.length }}</p>

    <button class="game-button action-add" routerLink="/new_game/characters/card">Spiel Starten</button>
  `,
  styles: ``
})
export class NewGameComponent {
  characters: Character[] = [];
  players: Player[] = [];

  constructor(private characterService: CharacterService, private playerService: PlayerService) {
    this.characters = this.characterService.getCharacters();
    this.players = this.playerService.getPlayers();
  }
}
