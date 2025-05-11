import { Character } from "./character";
import { CharacterType } from "./type";

export class Villager extends Character {
  constructor(name: string) {
    super(name);
  }

  override getType(): CharacterType {
    return CharacterType.VILLAGER;
  }
}
