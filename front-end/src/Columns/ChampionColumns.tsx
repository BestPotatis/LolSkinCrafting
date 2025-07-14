import type { Champion, ChampionWithSkin } from "@/types/champion";
import type { ColumnDef } from "@tanstack/react-table";

export const ChampionColumns: ColumnDef<ChampionWithSkin>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Number of skins",
    accessorKey: "numberOfSkins",
  },
  {
    header: "Best rarity",
    accessorFn: (row) => row.bestSkin?.rarity,
  },
  {
    header: "Best skin",
    accessorFn: (row) => row.bestSkin?.name,
  },
];
