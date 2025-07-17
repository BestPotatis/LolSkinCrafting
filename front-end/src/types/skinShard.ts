import type { Rarity } from "./champion";

export interface SkinShardHasSkin {
    id: number;
    name: string;
    champion: string;
    championId: number;
    rarity: Rarity;
    legacy: boolean;
    disenchantPrice: number;
    price: number;
    hasSkin: boolean;
    bestSkinRarity: Rarity;
}

export interface CreateSkinShard {
    name: string;
    championId: number;
    rarity: number;
    legacy: boolean;
    disenchantPrice: number;
    price: number;
}