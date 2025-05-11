import {Injectable} from "@angular/core";

import {Character} from "./base/characters/character";
import {characterMetadata} from "./base/characters/metadata";
import {CharacterType} from "./base/characters/type";
import {createCharacter} from "./base/characters/utils";


@Injectable({
  providedIn: "root"
})
export class CharacterService {
  characters: Character[] = [];
  newCharacterType: CharacterType = CharacterType.BASE;

  selectCharacterType(type: CharacterType): void {
    this.newCharacterType = type;
  }

  addCharacter(name: string, type: CharacterType): void {
    if (!this.canAddCharacter(name, type)) {
      throw new Error("Die Namen der Charaktere müssen eindeutig sein!");
    }

    this.characters.push(createCharacter(name, type));
  }

  removeCharacter(id: string): void {
    this.characters = this.characters.filter(
      character => character.getId() !== id
    );
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

  getCharacters(): Character[] {
    return this.characters;
  }
}
