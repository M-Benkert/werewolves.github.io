import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CharacterType } from "../../game/base/characters/type";
import {
  CharacterMetadata,
  characterMetadata,
  FALLBACK_CHARACTER_METADATA,
} from "../../game/base/characters/metadata";

@Component({
  selector: "app-new-game-new-character-configure",
  imports: [],
  template: `
    <p>
      new-character-configure works!
      {{ metadata.name }}
    </p>
  `,
  styles: ``
})
export class NewCharacterConfigureComponent implements OnInit {
  characterType!: CharacterType;
  metadata!: CharacterMetadata;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.characterType = parseInt(params["characterType"]) as CharacterType;
      this.metadata = characterMetadata.get(this.characterType) || FALLBACK_CHARACTER_METADATA;
    });
  }
}
