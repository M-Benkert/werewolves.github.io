import {Injectable} from "@angular/core";

import {Character, CharacterData} from "../base/characters/character";
import {createCharacter} from "../base/characters/utils";


@Injectable({
  providedIn: "root"
})
export class CharacterService2 {
  private characters: Map<string, Character> = new Map();

  /* Constructor *********************************************************** */
  constructor() {
    this.load();
  }

  /* New Game ************************************************************** */
  newGame(characters: Character[]): void {
    this.characters.clear();

    characters.forEach(character => {
      this.characters.set(character.getId(), character);
    });

    this.save();
  }

  /* Storage *************************************************************** */
  private storageKey = "characters";

  private save(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        characters: Array.from(this.characters.values()).map(character => character.toJSON()),
      }),
    );
  }

  private load(): void {
    const data = localStorage.getItem(this.storageKey);

    if (data) {
      const parsedData = JSON.parse(data);
      this.characters = new Map(parsedData.characters.map(
        (characterData: CharacterData) => [
          characterData.id,
          createCharacter(
            characterData.name,
            characterData.type,
            characterData.id,
          )
        ]
      ));
    }
  }

  /* Checks **************************************************************** */
  checkCharacterExists(characterID: string): void {
    if (!this.characters.has(characterID)) {
      throw new Error(`Character '${characterID}' does not exist.`);
    }
  }

  /* Getters *************************************************************** */
  getCharacters(): Character[] {
    return Array.from(this.characters.values());
  }

  getCharacterById(characterID: string): Character | undefined {
    this.checkCharacterExists(characterID);
    return this.characters.get(characterID);
  }
}
