import { Character } from "./character";
import { CharacterType } from "./type";

export class Werewolf extends Character {
  constructor(name: string, id?: string) {
    super(name, id);
  }

  override getType(): CharacterType {
    return CharacterType.WEREWOLF;
  }
}
