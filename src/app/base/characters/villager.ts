import {Character} from "./character";
import {CharacterType} from "./type";

export class Villager extends Character {
  constructor(name: string, id?: string) {
    super(name, id);
  }

  override getType(): CharacterType {
    return CharacterType.VILLAGER;
  }
}
