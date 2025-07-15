import { SkinShardColumns } from "@/Columns/SkinShardColumns";
import DataTable from "./DataTable";
import { useQuery } from "@tanstack/react-query";
import type { SkinShardHasSkin } from "@/types/skinShard";
import axios from "axios";
import { BASE_URL } from "@/constants";

export function SkinShardTable() {
  const { data } = useQuery({
    queryKey: ["skinShards"],
    queryFn: (): Promise<SkinShardHasSkin[]> =>
      axios.get(BASE_URL + "/skin-shards").then((res) => res.data),
  });
  return (
    <DataTable title="Skin shards" columns={SkinShardColumns} data={data} />
  );
}
