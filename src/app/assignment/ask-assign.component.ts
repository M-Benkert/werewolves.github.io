import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-ask-assign",
  imports: [RouterLink],
  template: `
    <h2>Zuordnung</h2>
    <p>Möchtest du gleich zu Beginn alle Charaktere den Spielern zuordnen?</p>
    <button
      class="game-button action-add"
      [routerLink]="['/assignment/character-to-player']"
      [queryParams]="{ navigate: true }"
    >Zuordnen</button>
    <button
      class="game-button action-next"
      routerLink="/main"
    >Überspringen</button>
  `,
  styles: ``
})
export class AskAssignComponent {
}
