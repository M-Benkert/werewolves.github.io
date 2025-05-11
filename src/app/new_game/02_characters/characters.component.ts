import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { ListComponent } from "../../common/list.component";

import { Character } from "../../game/base/characters/character";
import { CharacterService } from "../../game/character.service";

@Component({
  selector: "app-new_game-02_characters",
  imports: [ListComponent, RouterLink],
  template: `
    <h2>Charaktere</h2>
    <app-list
      [listItems]="characters"
      (removeEvent)="removeCharacter($event)"
    ></app-list>
    <button routerLink="new" class="game-button action-add">
      Hinzufügen
    </button>
    <button routerLink="/new_game" class="game-button action-next">
      Weiter
    </button>
  `,
  styles: ``
})
export class CharactersComponent {
  characters: Character[] = [];

  constructor(private charactersService: CharacterService) {
    this.updateCharacterList();
  }

  removeCharacter(id: string) {
    this.charactersService.removeCharacter(id);
    this.updateCharacterList();
  }

  private updateCharacterList(): void {
    this.characters = this.charactersService.getCharacters();
  }
}
