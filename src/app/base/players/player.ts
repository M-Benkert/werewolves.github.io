import {getRandomValue} from "../utils/random";

export interface PlayerData {
  id: string;
  name: string;
}

export class Player {
  private readonly id: string;
  private readonly name: string;

  constructor(name: string, id?: string) {
    this.id = id ?? `p${getRandomValue()}`;
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  toJSON(): PlayerData {
    return {
      id: this.id,
      name: this.name
    };
  }

  static fromJSON(data: PlayerData): Player {
    return new Player(data.name, data.id);
  }
}
