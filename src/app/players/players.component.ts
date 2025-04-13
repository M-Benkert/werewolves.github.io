import { Component } from "@angular/core";
import { ListComponent } from "../common/list.component";
import { TextFieldComponent} from "../common/text-field.component";

@Component({
  selector: "app-players",
  imports: [ListComponent, TextFieldComponent],
   template: `
    <div class="view">
      <h2>Spieler</h2>
      <app-list [listItems]="players" (removeEvent)="removePlayer($event)"></app-list>
      <app-text-field (addEvent)="addPlayer($event)"></app-text-field>
      <button class="game-button action-next">
        Weiter
      </button>
    </div>
  `
})
export class PlayersComponent {
  players = [
    { id: "1", name: "Player 1" },
    { id: "2", name: "Player 2" },
    { id: "3", name: "Player 3" },
  ];

  addPlayer(name: string) {
    const newPlayer = {
      id: (this.players.length + 1).toString(),
      name: name
    };
    this.players.push(newPlayer);
  }

  removePlayer(id: string) {
    this.players = this.players.filter(player => player.id !== id);
  }
}
