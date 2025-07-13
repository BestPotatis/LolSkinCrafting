import { useQuery } from "@tanstack/react-query";
import DataTable from "./DataTable";
import axios from "axios";
import { BASE_URL } from "@/constants";
import { ChampionColumns } from "@/Columns/ChampionColumns";
import type { Champion } from "@/types/champion";

export function ChampionTable() {
  const columns = ChampionColumns;
  const { data } = useQuery({
    queryKey: ["champions"],
    queryFn: (): Promise<Champion[]> =>
      axios.get(BASE_URL + "/champions").then((res) => res.data),
  });

  return data && <DataTable data={data} columns={columns} />;
}
