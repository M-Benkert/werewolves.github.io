import { Injectable } from "@angular/core";

import { Character, CharacterData } from "./base/characters/character";
import { characterMetadata } from "./base/characters/metadata";
import { CharacterType } from "./base/characters/type";
import { createCharacter } from "./base/characters/utils";


@Injectable({
  providedIn: "root"
})
export class CharacterService {
  characters: Character[] = [];

  /* Constructor *********************************************************** */
  constructor() {
    this.load()
  }

  /* Storage *************************************************************** */
  private storageKey = "new-game-characters";

  private save(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(
        this.characters.map(character => character.toJSON())
      ),
    );
  }

  private load(): void {
    const data = localStorage.getItem(this.storageKey);
    if (data) {
      this.characters = JSON.parse(data).map(
        (characterData: CharacterData) => createCharacter(
          characterData.name,
          characterData.type,
          characterData.id,
        )
      );
    }
  }

  /* Add and remove ******************************************************** */
  addCharacter(name: string, type: CharacterType): void {
    if (!this.canAddCharacter(name, type)) {
      throw new Error(
        `Can't add character '${name}' of type '${CharacterType[type]}':`
        + ` Name must be unique or type must allow duplicates.`
      );
    }

    this.characters.push(createCharacter(name, type));
    this.save();
  }

  removeCharacter(id: string): void {
    this.characters = this.characters.filter(
      character => character.getId() !== id
    );
    this.save();
  }

  canAddCharacter(name: string, type: CharacterType): boolean {
    const isUniqueType = characterMetadata.get(type)?.isUnique ?? true;

    return this.characters.every(
      character => (
        character.getName() !== name
        || ( character.getType() === type && !isUniqueType)
      )
    );
  }

  /* Getters *************************************************************** */
  getCharacters(): Character[] {
    return this.characters;
  }
}
