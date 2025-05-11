import { getRandomValue} from "../utils/random";

export class Player {
  private readonly id: string;
  private readonly name: string;

  constructor(name: string) {
    this.id = `p${getRandomValue()}`;
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
