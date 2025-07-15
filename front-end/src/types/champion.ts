export type Rarity = 
  "Ultimate"|
  "Mythic"|
  "Legendary"|
  "Epic"|
  "None";

interface Skin {
id: number;
name: string;
rarity: Rarity;
}

export interface ChampionWithSkin {
  id: number;
  name: string; 
  numberOfSkins: number;
  bestSkin?: Skin;
}
export type Champion = {
  id: number;
  name: string;
};

export interface CreateSkin {
  championId: number;
  name: string;
  rarity: number;
  legacy: boolean;
}

export type CreateChampion = {
  name: string;
}