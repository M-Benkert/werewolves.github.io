import {CharacterType} from "./type";

import {Character} from "./character";
import {Villager} from "./villager";
import {Werewolf} from "./werewolf";

export function createCharacter(name: string, type: CharacterType, id?: string): Character {
  switch (type) {
    case CharacterType.VILLAGER:
      return new Villager(name, id);
    case CharacterType.WEREWOLF:
      return new Werewolf(name, id);
    default:
      throw new Error("Unknown character type!");
  }
}
