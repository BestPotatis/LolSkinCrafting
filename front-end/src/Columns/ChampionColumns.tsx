import type { Champion } from "@/types/champion";
import type { ColumnDef } from "@tanstack/react-table";

export const ChampionColumns: ColumnDef<Champion>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Number of skins",
  },
  {
    header: "Best rarity",
  },
  {
    header: "Best skin",
  },
];
