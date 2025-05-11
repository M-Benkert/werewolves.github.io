import { Character } from "./character";
import { CharacterType } from "./type";

export class Werewolf extends Character {
  constructor(name: string) {
    super(name);
  }

  override getType(): CharacterType {
    return CharacterType.WEREWOLF;
  }
}
