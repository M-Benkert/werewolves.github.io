import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

import {
  CharacterMetadata,
  characterMetadata,
  FALLBACK_CHARACTER_METADATA,
} from "../../game/base/characters/metadata";
import { CharacterType } from "../../game/base/characters/type";

@Component({
  selector: "app-new-game-character-card",
  imports: [],
  template: `
    <div class="character-card">
      <img alt="{{ metadata.name }}">
      <div class="character-details">
        <div class="character-name">{{ metadata.name }}</div>
        <div class="character-description">{{ metadata.description }}</div>
        <div class="character-labels">{{ metadata.labels.join(", ") }}</div>
      </div>
    </div>
  `,
  styles: ``
})
export class CharacterCardComponent implements OnChanges {
  @Input() characterType!: CharacterType;

  metadata!: CharacterMetadata;

  constructor() {
    this.metadata = FALLBACK_CHARACTER_METADATA;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["characterType"]) {
      this.metadata = characterMetadata.get(this.characterType) || FALLBACK_CHARACTER_METADATA;
    }
  }
}
