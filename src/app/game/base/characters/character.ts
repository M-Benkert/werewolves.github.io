import {CharacterType} from "./type";
import {getRandomValue} from "../utils/random";

export class Character {
  private readonly id: string;
  private readonly name: string;

  constructor(name: string) {
    this.id = `c${getRandomValue()}`;
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getType(): CharacterType {
    return CharacterType.BASE;
  }
}
