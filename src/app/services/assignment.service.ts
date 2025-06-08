import {Injectable} from "@angular/core";

import {CharacterService2} from "./character.service2";
import {PlayerService2} from "./player.service2";

import {Character} from "../base/characters/character";


@Injectable({
  providedIn: "root"
})
export class AssignmentService {
  private characterPlayerMapping: Map<string, string> = new Map();
  private playerCharacterMapping: Map<string, string[]> = new Map();

  /* Constructor *********************************************************** */
  constructor(
    private characterService: CharacterService2,
    private playerService: PlayerService2
  ) {
    this.load();
  }

  /* New Game ************************************************************** */
  newGame(): void {
    this.characterPlayerMapping.clear();
    this.playerCharacterMapping.clear();

    this.save();
  }

  /* Storage *************************************************************** */
  private storageKey = "assignments";

  save(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        characterPlayerMapping: Array.from(this.characterPlayerMapping.entries()),
        playerCharacterMapping: Array.from(this.playerCharacterMapping.entries())
      })
    );
  }

  private load(): void {
    const data = localStorage.getItem(this.storageKey);

    if (data) {
      const parsedData = JSON.parse(data);
      this.characterPlayerMapping = new Map(parsedData.characterPlayerMapping);
      this.playerCharacterMapping = new Map(parsedData.playerCharacterMapping);
    }
  }

  /* Assign **************************************************************** */
  assignCharacterToPlayer(characterID: string, playerID: string): void {
    console.log(`Assign character ${characterID} to player ${playerID}`);

    this.characterService.checkCharacterExists(characterID);
    this.playerService.checkPlayerExists(playerID);

    this.updateCharacterPlayerMapping(characterID, playerID);
    this.updatePlayerCharacterMapping(characterID, playerID);

    this.save();
  }

  private updateCharacterPlayerMapping(characterID: string, playerID: string): void {
    this.characterPlayerMapping.set(characterID, playerID);
  }

  private updatePlayerCharacterMapping(characterID: string, playerID: string): void {
    const mapping = this.playerCharacterMapping.get(playerID) || [];
    if (!mapping.includes(characterID)) {
      mapping.push(characterID);
    }
    this.playerCharacterMapping.set(playerID, mapping);
  }

  /* Unassign ************************************************************** */
  unassignCharacterFromPlayer(characterID: string, playerID: string): void {
    console.log(`Unassign character ${characterID} from player ${playerID}`);

    this.characterService.checkCharacterExists(characterID);
    this.playerService.checkPlayerExists(playerID);

    this.characterPlayerMapping.delete(characterID);
    const mapping = this.playerCharacterMapping.get(playerID) || [];
    this.playerCharacterMapping.set(playerID, mapping.filter(id => id !== characterID));

    this.save();
  }

  /* Getters *************************************************************** */
  getCharactersAssignedToPlayer(playerID: string): Character[] {
    this.playerService.checkPlayerExists(playerID);
    const characterIDs = this.playerCharacterMapping.get(playerID) || [];
    return characterIDs.map(id => this.characterService.getCharacterById(id)).filter(Boolean) as Character[];
  }

  getUnassignedCharacters(): Character[] {
    return Array.from(this.characterService.getCharacters()).filter(
      character => !this.characterPlayerMapping.has(character.getId())
    );
  }
}
