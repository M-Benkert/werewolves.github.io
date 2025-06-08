import { Injectable } from "@angular/core";

import { Character, CharacterData } from "./base/characters/character";
import { createCharacter } from "./base/characters/utils";

import { Player, PlayerData } from "./base/players/player";


@Injectable({
  providedIn: "root"
})
export class AssignmentService {
  private characters: Map<string, Character> = new Map();
  private players: Map<string, Player> = new Map();

  private characterPlayerMapping: Map<string, string> = new Map();
  private playerCharacterMapping: Map<string, string[]> = new Map();

  /* Constructor *********************************************************** */
  constructor() {
    this.load();
  }

  /* New Game ************************************************************** */
  newGame(characters: Character[], players: Player[]): void {
    this.characters.clear();
    this.players.clear();
    this.characterPlayerMapping.clear();
    this.playerCharacterMapping.clear();

    characters.forEach(character => {
      this.characters.set(character.getId(), character);
    });

    players.forEach(player => {
      this.players.set(player.getId(), player);
    });

    // this.save();
  }

  /* Storage *************************************************************** */
  private storageKey = "assignments";

  private save(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify({
        characters: Array.from(this.characters.values()).map(character => character.toJSON()),
        players: Array.from(this.players.values()).map(player => player.toJSON()),
        characterPlayerMapping: Array.from(this.characterPlayerMapping.entries()),
        playerCharacterMapping: Array.from(this.playerCharacterMapping.entries())
      })
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
      this.players = new Map(parsedData.players.map(
        (playerData: PlayerData) => [
          playerData.id,
          new Player(
            playerData.name,
            playerData.id,
          ),
        ]
      ));
      this.characterPlayerMapping = new Map(parsedData.characterPlayerMapping);
      this.playerCharacterMapping = new Map(parsedData.playerCharacterMapping);
    }
  }

  /* Checks **************************************************************** */
  private checkCharacterExists(characterID: string): void {
    if (!this.characters.has(characterID)) {
      throw new Error(`Character '${characterID}' does not exist.`);
    }
  }

  private checkPlayerExists(playerID: string): void {
    if (!this.players.has(playerID)) {
      throw new Error(`Player '${playerID}' does not exist.`);
    }
  }

  /* Assign **************************************************************** */
  assignCharacterToPlayer(characterID: string, playerID: string): void {
    console.log(`Assign character ${characterID} to player ${playerID}`);

    this.checkCharacterExists(characterID);
    this.checkPlayerExists(playerID);

    this.updateCharacterPlayerMapping(characterID, playerID);
    this.updatePlayerCharacterMapping(characterID, playerID);

    // this.save();
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

    this.checkCharacterExists(characterID);
    this.checkPlayerExists(playerID);

    this.characterPlayerMapping.delete(characterID);
    const mapping = this.playerCharacterMapping.get(playerID) || [];
    this.playerCharacterMapping.set(playerID, mapping.filter(id => id !== characterID));

    // this.save();
  }

  /* Getters *************************************************************** */
  getCharacters(): Character[] {
    return Array.from(this.characters.values());
  }

  getPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  getCharacterById(characterID: string): Character | undefined {
    this.checkCharacterExists(characterID);
    return this.characters.get(characterID);
  }

  getPlayerById(playerID: string): Player | undefined {
    this.checkPlayerExists(playerID);
    return this.players.get(playerID);
  }

  getCharactersAssignedToPlayer(playerID: string): Character[] {
    this.checkPlayerExists(playerID);
    const characterIDs = this.playerCharacterMapping.get(playerID) || [];
    return characterIDs.map(id => this.characters.get(id)).filter(Boolean) as Character[];
  }

  getUnassignedCharacters(): Character[] {
    return Array.from(this.characters.values()).filter(
      character => !this.characterPlayerMapping.has(character.getId())
    );
  }

  /* Iterators ************************************************************* */
  getCharacterIterator(): IterableIterator<Character> {
    return this.characters.values();
  }

  getPlayerIterator(): IterableIterator<Player> {
    return this.players.values();
  }
}
