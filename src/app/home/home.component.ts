import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";


@Component({
  selector: "app-home",
  imports: [RouterLink],
  template: `
    <a routerLink="/new_game/players">Players</a>
    <a routerLink="/new_game/characters">Characters</a>
    <a routerLink="/new_game/characters/card">Character Card</a>
  `,
  styles: ``
})
export class HomeComponent {

}
