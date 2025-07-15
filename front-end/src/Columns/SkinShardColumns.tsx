import type { SkinShardHasSkin } from "@/types/skinShard";
import type { ColumnDef } from "@tanstack/react-table";

export const SkinShardColumns: ColumnDef<SkinShardHasSkin>[] = [
  { header: "Skin name", accessorKey: "name" },
  { header: "Champion", accessorKey: "champion" },
  { header: "Rarity", accessorKey: "rarity" },
  { header: "Is legacy", accessorKey: "legacy" },
  { header: "Disenchant price", accessorKey: "disenchantPrice" },
  { header: "Price", accessorKey: "price" },
  { header: "Champion has skin", accessorKey: "hasSkin" },
  { header: "Best skin rarity", accessorKey: "bestSkinRarity" },
];
