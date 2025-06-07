import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";


@Component({
  selector: "app-home",
  imports: [RouterLink],
  template: `
    <h2>Hauptmenü</h2>
    <button class="game-button action-item" routerLink="/new_game">Neues Spiel</button>
    <a routerLink="/new_game/players">Players</a>
    <a routerLink="/new_game/characters">Characters</a>
    <a routerLink="/new_game/characters/card">Character Card</a>
  `,
  styles: ``
})
export class HomeComponent {

}
