import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { CharacterCardComponent } from "./character-card.component";

import { characterMetadata } from "../../game/base/characters/metadata";

@Component({
  selector: "app-new_game-new_character_select",
  imports: [
    CharacterCardComponent,
    RouterLink,
  ],
  template: `
    <h2>Charakter Auswählen</h2>
    <div>
      @for (key of metadataKeys; track key) {
        <app-new-game-character-card
          [characterType]="key"
          [routerLink]="[key]"
        ></app-new-game-character-card>
      }
    </div>
  `,
  styles: ``
})
export class NewCharacterSelectComponent {
  metadataKeys = Array.from(characterMetadata.keys());
}
