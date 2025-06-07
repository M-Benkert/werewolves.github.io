import {CharacterType} from "./type";
import {getRandomValue} from "../utils/random";

export interface CharacterData {
  id: string;
  name: string;
  type: CharacterType;
}

export class Character {
  private readonly id: string;
  private readonly name: string;

  constructor(name: string, id?: string) {
    this.id = id ?? `c${getRandomValue()}`;
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

  toJSON(): CharacterData {
    return {
      id: this.id,
      name: this.name,
      type: this.getType()
    };
  }
}
