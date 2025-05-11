import { CharacterType } from "./type";


export interface CharacterMetadata {
  name: string;
  description: string;
  type: CharacterType;
  labels: string[];
  isUnique: boolean;
}

export const characterMetadata = new Map<CharacterType, CharacterMetadata>([
  [
    CharacterType.VILLAGER,
    {
      name: "Dorfbewohner",
      description: "Kann nichts.",
      type: CharacterType.VILLAGER,
      labels: ["Stark", "Tapfer", "Robust"],
      isUnique: false,
    },
  ],
  [
    CharacterType.WEREWOLF,
    {
      name: "Werwolf",
      description: "Tötet jede Runde zusammen mit den anderen Werwölfen ein Opfer.",
      type: CharacterType.WEREWOLF,
      labels: ["Listig", "Schnell", "Heimlich"],
      isUnique: false,
    },
  ],
])

export const FALLBACK_CHARACTER_METADATA: CharacterMetadata = {
  name: "Unknown",
  description: "No description available.",
  type: CharacterType.BASE,
  labels: [],
  isUnique: false,
};
