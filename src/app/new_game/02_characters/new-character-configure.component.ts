import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { CharacterType } from "../../base/characters/type";
import {
  CharacterMetadata,
  characterMetadata,
  FALLBACK_CHARACTER_METADATA,
} from "../../base/characters/metadata";

import { CharacterService } from "../../services/character.service";

@Component({
  selector: "app-new-game-new-character-configure",
  imports: [FormsModule],
  template: `
    <h2>Character Anpassen</h2>
    <p>
      {{ metadata.description }}
    </p>
    <label for="characterName">Name:</label>
    <input id="characterName" class="text-input" type="text" [(ngModel)]="characterName" />
    <button class="game-button action-remove" (click)="cancel()">Abbrechen</button>
    <button class="game-button action-add" (click)="confirm()">Bestätigen</button>
  `,
  styles: ``
})
export class NewCharacterConfigureComponent implements OnInit {
  characterName!: string;
  characterType!: CharacterType;
  metadata!: CharacterMetadata;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private charactersService: CharacterService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.characterType = parseInt(params["characterType"]) as CharacterType;
      this.metadata = characterMetadata.get(this.characterType) || FALLBACK_CHARACTER_METADATA;
      this.characterName = this.metadata.name;
    });
  }

  cancel(): void {
    this.router.navigate(["new_game", "characters"]);
  }

  confirm(): void {
    const name: string = this.characterName.trim();
    const type: CharacterType = this.characterType;

    if (name === "") {
      alert("Bitte gib einen Namen ein!");
      return ;
    }

    if (!this.charactersService.canAddCharacter(name, type)) {
      alert(`Die Namen der Charaktere müssen eindeutig sein und ${name} existiert bereits!`);
      return ;
    }

    this.charactersService.addCharacter(name, type);
    this.router.navigate(["new_game", "characters"]);
  }
}
